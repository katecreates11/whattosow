import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { assessHutton } from "@/lib/blight";
import { frostForecastFrom } from "@/lib/frost";
import { wateringWeatherFrom } from "@/lib/watering";
import { weatherStateFrom } from "@/lib/weather-intelligence";
import {
  FORECAST_DAYS,
  PAST_DAYS,
  buildForecastUrl,
  drySpellDays,
  getLocalWeather,
  huttonWindow,
  isFrostRisk,
  nightLows,
  parseForecast,
  rainLast24h,
  rainNextHours,
  resetWeatherBrain,
  soilTempNow,
  ukDay,
  ukHour,
} from "@/lib/weather-brain";
import { forecastFixture, ukTime } from "@/lib/__tests__/weather-fixture";

const TODAY = "2026-11-16";
const noon = ukTime(TODAY, 12);

function snapshot(options: Partial<Parameters<typeof forecastFixture>[0]> = {}) {
  const weather = parseForecast(forecastFixture({ today: TODAY, ...options }), 51.64, -0.17, noon.getTime());
  if (!weather) throw new Error("fixture did not parse");
  return weather;
}

describe("weather brain — one request, shared", () => {
  beforeEach(() => resetWeatherBrain());
  afterEach(() => vi.unstubAllGlobals());

  it("asks for everything the site uses in a single URL", () => {
    const url = new URL(buildForecastUrl(51.64, -0.17));
    expect(url.host).toBe("api.open-meteo.com");
    expect(url.searchParams.get("timezone")).toBe("Europe/London");
    expect(url.searchParams.get("past_days")).toBe(String(PAST_DAYS));
    expect(url.searchParams.get("forecast_days")).toBe(String(FORECAST_DAYS));
    for (const field of ["temperature_2m", "relative_humidity_2m", "precipitation"]) {
      expect(url.searchParams.get("hourly")).toContain(field);
    }
    expect(url.searchParams.get("daily")).toContain("et0_fao_evapotranspiration");
    expect(url.searchParams.get("current")).toContain("soil_temperature_0cm");
  });

  it("makes ONE network call however many parts of the page ask at once", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, json: async () => forecastFixture({ today: TODAY }) }));
    vi.stubGlobal("fetch", fetchMock);

    const results = await Promise.all([
      getLocalWeather(51.64, -0.17),
      getLocalWeather(51.64, -0.17),
      getLocalWeather(51.6401, -0.1702), // same garden, a few metres away
      getLocalWeather(51.64, -0.17),
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(results.every((r) => r !== null)).toBe(true);
    expect(results[0]).toBe(results[3]);

    await getLocalWeather(57.15, -2.11); // a different place is a different reading
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("resolves to null rather than throwing when the weather isn't answering, and pauses before retrying", async () => {
    const fetchMock = vi.fn(async () => {
      throw new Error("offline");
    });
    vi.stubGlobal("fetch", fetchMock);

    expect(await getLocalWeather(51.64, -0.17)).toBeNull();
    expect(await getLocalWeather(51.64, -0.17)).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("treats Open-Meteo's error payload (e.g. rate limit) as no weather", () => {
    expect(parseForecast({ error: true, reason: "Daily API request limit exceeded." }, 51, 0)).toBeNull();
    expect(parseForecast(null, 51, 0)).toBeNull();
  });
});

describe("weather brain — UK clock", () => {
  it("reads the UK day and hour correctly in GMT and BST, whatever the server timezone", () => {
    expect(ukHour(ukTime("2026-11-16", 9))).toBe("2026-11-16T09");
    expect(ukHour(ukTime("2026-07-06", 9, true))).toBe("2026-07-06T09");
    // 23:30 UTC on a summer evening is already tomorrow in the UK
    expect(ukDay(new Date("2026-07-06T23:30:00Z"))).toBe("2026-07-07");
    expect(ukDay(noon, -2)).toBe("2026-11-14");
  });
});

describe("weather brain — judgements", () => {
  it("has one frost-risk threshold: 2°C or below", () => {
    expect(isFrostRisk(2)).toBe(true);
    expect(isFrostRisk(2.1)).toBe(false);
    expect(isFrostRisk(-3)).toBe(true);
    expect(isFrostRisk(null)).toBe(false);
  });

  it("reports TONIGHT's low, not this morning's", () => {
    // A cold dawn this morning (−2°), a mild night to come (6°).
    const weather = snapshot({
      temp: (day, hour) => (day === 0 && hour < 8 ? -2 : 6),
    });
    const nights = nightLows(weather, 3, noon);
    expect(nights).toHaveLength(3);
    expect(nights[0]).toEqual({ date: TODAY, min: 6, frostRisk: false });
    // ...whereas today's daily minimum, which the site used to call "tonight", is the frost that's already over
    expect(weather.daily.tempMin[weather.daily.time.indexOf(TODAY)]).toBe(-2);
  });

  it("catches a frost that arrives after midnight tonight", () => {
    const weather = snapshot({
      temp: (day, hour) => (day === 1 && hour >= 3 && hour <= 6 ? -1.4 : 7),
    });
    const [tonight, tomorrowNight] = nightLows(weather, 3, noon);
    expect(tonight).toEqual({ date: TODAY, min: -1.4, frostRisk: true });
    expect(tomorrowNight.frostRisk).toBe(false);
  });

  it("before 9am, starts with the night still in progress", () => {
    const weather = snapshot({
      temp: (day, hour) => (day === 0 && hour >= 5 && hour <= 7 ? 0.5 : 8),
    });
    const nights = nightLows(weather, 3, ukTime(TODAY, 4));
    expect(nights[0]).toEqual({ date: "2026-11-15", min: 0.5, frostRisk: true });
    expect(nights[1].date).toBe(TODAY);
  });

  it("measures rain that has fallen and rain that is coming from the same hourly series", () => {
    const weather = snapshot({
      rain: (day, hour) => (day === 0 && hour >= 6 && hour <= 8 ? 2 : day === 0 && hour === 20 ? 4 : 0),
    });
    expect(rainLast24h(weather, noon)).toBe(6);
    expect(rainNextHours(weather, 12, noon)).toBe(4);
    expect(rainNextHours(weather, 6, noon)).toBe(0);
  });

  it("counts a dry spell back from yesterday, and resets it when it rains properly", () => {
    const dry = snapshot({ rain: (day, hour) => (day === -4 && hour === 10 ? 6 : 0) });
    expect(drySpellDays(dry, noon)).toBe(3);

    const wetThisMorning = snapshot({ rain: (day, hour) => (day === 0 && hour === 9 ? 5 : 0) });
    expect(drySpellDays(wetThisMorning, noon)).toBe(0);

    const dryAllWeek = snapshot();
    expect(drySpellDays(dryAllWeek, noon)).toBe(PAST_DAYS);
  });

  it("reads soil temperature at seed depth for the current hour", () => {
    const weather = snapshot({ soil6cm: (day, hour) => (day === 0 && hour === 12 ? 6.24 : 11) });
    expect(soilTempNow(weather, noon)).toEqual({ seedDepth: 6.2, surface: 8 });
  });

  it("hands the blight assessment the same window it has always used: 2 days back, 5 ahead", () => {
    const weather = snapshot();
    const window = huttonWindow(weather, noon);
    expect(window.time[0]).toBe("2026-11-14T00:00");
    expect(window.time[window.time.length - 1]).toBe("2026-11-20T23:00");
    expect(window.time).toHaveLength(7 * 24);
  });
});

describe("weather brain — every surface reads the same sky", () => {
  it("frost badge, watering note and garden dashboard agree about a frosty, rainy night", () => {
    const weather = snapshot({
      temp: (day, hour) => (day === 1 && hour <= 6 ? -0.5 : 9),
      rain: (day, hour) => (day === 0 && hour >= 14 && hour <= 16 ? 3 : 0),
    });

    const frost = frostForecastFrom(weather, noon)!;
    const watering = wateringWeatherFrom(weather, noon);
    const state = weatherStateFrom(weather, noon);

    expect(frost.tonight.frostRisk).toBe(true);
    expect(state.frostRisk).toBe(true);
    expect(state.temperatureMin).toBe(frost.tonight.min);

    expect(watering.rainNext12h).toBe(9);
    expect(state.rainForecast).toBe(9);
    expect(frost.rainfall3Days).toBe(9);
    expect(watering.rainfall3Days).toBe(9);
    expect(frost.evapotranspiration).toBe(watering.evapotranspiration);
  });

  it("uses TODAY's maximum for the watering note, not yesterday's", () => {
    const weather = snapshot({ temp: (day) => (day === -1 ? 30 : 17) });
    expect(wateringWeatherFrom(weather, noon).tempMaxToday).toBe(17);
  });

  it("calls blight by the Hutton Criteria everywhere", () => {
    const summerDay = "2026-07-06";
    const at = ukTime(summerDay, 12, true);
    const muggy = parseForecast(
      forecastFixture({
        today: summerDay,
        temp: () => 16,
        humidity: (day) => (day === -1 || day === 0 ? 95 : 60),
        current: { time: `${summerDay}T12:00` },
      }),
      51.64,
      -0.17,
      at.getTime()
    )!;
    const window = huttonWindow(muggy, at);
    expect(assessHutton(window.time, window.temp, window.humidity, at).level).toBe("high");
    expect(weatherStateFrom(muggy, at).blightRisk).toBe(true);

    // Warm and a bit humid, but no Hutton Period: the old ">20°C and >75%" rule would have cried blight.
    const warm = parseForecast(
      forecastFixture({ today: summerDay, temp: () => 24, humidity: () => 78 }),
      51.64,
      -0.17,
      at.getTime()
    )!;
    expect(weatherStateFrom(warm, at).blightRisk).toBe(false);
  });
});

describe("weather brain — nobody else fetches the forecast", () => {
  // The multi-location blight map samples many points in one request; it is the
  // one sanctioned exception. Everything else must go through getLocalWeather().
  const ALLOWED = new Set(["src/lib/weather-brain.ts", "src/app/api/blight-map/route.ts"]);

  function sourceFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) return sourceFiles(path);
      return /\.(ts|tsx)$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
    });
  }

  it("keeps api.open-meteo.com/v1/forecast in the brain alone", () => {
    const offenders = sourceFiles("src").filter(
      (path) => !ALLOWED.has(path) && readFileSync(path, "utf8").includes("api.open-meteo.com/v1/forecast")
    );
    expect(offenders).toEqual([]);
  });
});
