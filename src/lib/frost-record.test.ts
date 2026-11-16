import { afterEach, describe, expect, it, vi } from "vitest";
import {
  FROST_RECORD_LIMITS,
  calculateFirstAutumnFrostDate,
  calculateLastFrostDate,
  describeLocalFrost,
  firstAutumnFrostDay,
  lastFrostDay,
  modelFirstAutumnFrostDay,
  modelLastFrostDay,
} from "@/lib/frost";
import {
  buildArchiveUrl,
  deriveFrostRecord,
  ensureFrostRecord,
  getStoredFrostRecord,
  resetFrostRecords,
  type FrostRecord,
} from "@/lib/frost-record";

/**
 * Real frosts. For each place: the day-of-year of the last spring night at or
 * below 2°C, and of the first autumn one, for 2016–2025 — read from the
 * Open-Meteo archive on 16 Nov 2026. null = no such night that year.
 */
const PLACES = {
  barnet: {
    lat: 51.634445, lng: -0.16366577, elevation: 123,
    spring: [122, 117, 89, 104, 106, 126, 100, 115, 117, 78],
    autumn: [307, 310, 302, 311, 309, 309, 325, 328, 285, 321],
  },
  buxton: {
    lat: 53.251316, lng: -1.87854, elevation: 294,
    spring: [125, 129, 121, 125, 135, 128, 119, 116, 119, 126],
    autumn: [307, 303, 280, 276, 324, 308, 333, 288, 284, 299],
  },
  penzance: {
    lat: 50.15817, lng: -5.516632, elevation: 45,
    spring: [60, 43, 79, 32, 21, 103, 93, 62, 19, 63],
    autumn: [null, null, 303, 336, null, null, 341, 335, 326, null],
  },
  york: {
    lat: 53.954304, lng: -1.0444946, elevation: 19,
    spring: [122, 117, 121, 130, 135, 127, 100, 116, 118, 126],
    autumn: [307, 309, 280, 301, 324, 309, 325, 314, 318, 321],
  },
} as const;

type Place = (typeof PLACES)[keyof typeof PLACES];

/** Rebuild a decade of daily minimums that frosts on exactly the recorded days. */
function archiveFor(place: Place, firstYear = 2016) {
  const time: string[] = [];
  const mins: number[] = [];
  place.spring.forEach((lastSpring, i) => {
    const year = firstYear + i;
    const firstAutumn = place.autumn[i];
    const days = (Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)) / 86400000;
    for (let day = 1; day <= days; day++) {
      const date = new Date(Date.UTC(year, 0, day)).toISOString().slice(0, 10);
      const frosty = day <= lastSpring || (firstAutumn !== null && day >= firstAutumn);
      time.push(date);
      mins.push(frosty ? (day === lastSpring || day === firstAutumn ? 1.5 : -1) : 8);
    }
  });
  return { time, mins };
}

function recordFor(place: Place): FrostRecord {
  const { time, mins } = archiveFor(place);
  const record = deriveFrostRecord(time, mins, { latitude: place.lat, longitude: place.lng, elevation: place.elevation });
  if (!record) throw new Error("no record derived");
  return record;
}

afterEach(() => {
  resetFrostRecords();
  vi.unstubAllGlobals();
});

describe("frost record — reading a decade of nights", () => {
  it("finds the typical, earliest and latest last-spring-frost", () => {
    const record = recordFor(PLACES.barnet);
    expect(record.years).toBe(10);
    expect(record.firstYear).toBe(2016);
    expect(record.lastYear).toBe(2025);
    expect(record.elevation).toBe(123);
    expect(record.spring).toEqual({ typicalDay: 111, earliestDay: 78, latestDay: 126, frostFreeYears: 0 });
    expect(record.autumn.earliestDay).toBe(285);
    expect(record.autumn.latestDay).toBe(328);
  });

  it("counts a 2°C night as a frost and a 2.1°C night as not one", () => {
    const time = [];
    const mins = [];
    for (let year = 2016; year <= 2021; year++) {
      const days = (Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)) / 86400000;
      for (let day = 1; day <= days; day++) {
        time.push(new Date(Date.UTC(year, 0, day)).toISOString().slice(0, 10));
        mins.push(day === 100 ? 2 : day === 120 ? 2.1 : 9);
      }
    }
    const record = deriveFrostRecord(time, mins, { latitude: 52, longitude: -1 })!;
    expect(record.spring.typicalDay).toBe(100);
    expect(record.spring.latestDay).toBe(100);
  });

  it("copes with years that never frost (the far south-west)", () => {
    const record = recordFor(PLACES.penzance);
    expect(record.autumn.frostFreeYears).toBe(5);
    expect(record.autumn.earliestDay).toBe(303);
    expect(record.spring.frostFreeYears).toBe(0);
  });

  it("refuses to judge from fewer than five complete years", () => {
    const { time, mins } = archiveFor(PLACES.york);
    const fourYears = time.findIndex((t) => t.startsWith("2020"));
    expect(deriveFrostRecord(time.slice(0, fourYears), mins.slice(0, fourYears), { latitude: 53.95, longitude: -1.04 })).toBeNull();
    // gaps (nulls) make a year incomplete rather than quietly wrong
    const holed = mins.map((m, i) => (time[i].startsWith("2018") && i % 3 === 0 ? null : m));
    expect(deriveFrostRecord(time, holed, { latitude: 53.95, longitude: -1.04 })!.years).toBe(9);
  });

  it("asks the archive for the last ten complete calendar years", () => {
    const url = new URL(buildArchiveUrl(51.64, -0.17, new Date("2026-11-16T12:00:00Z")));
    expect(url.host).toBe("archive-api.open-meteo.com");
    expect(url.searchParams.get("start_date")).toBe("2016-01-01");
    expect(url.searchParams.get("end_date")).toBe("2025-12-31");
    expect(url.searchParams.get("daily")).toBe("temperature_2m_min");
  });
});

describe("frost record — how far it may move the calendar", () => {
  it("agrees with the model where the model was already right (inland, low-lying)", () => {
    for (const place of [PLACES.barnet, PLACES.york]) {
      const shift = lastFrostDay(place.lat, place.lng, recordFor(place)) - modelLastFrostDay(place.lat, place.lng);
      expect(Math.abs(shift)).toBeLessThanOrEqual(2);
    }
  });

  it("moves a hill garden later — Buxton at 294 m frosts about a week past its latitude", () => {
    const place = PLACES.buxton;
    const shift = lastFrostDay(place.lat, place.lng, recordFor(place)) - modelLastFrostDay(place.lat, place.lng);
    expect(shift).toBeGreaterThanOrEqual(5);
    expect(shift).toBeLessThanOrEqual(8);
  });

  it("moves a mild coast earlier, but never more than two weeks — frost isn't the whole season", () => {
    const place = PLACES.penzance;
    const record = recordFor(place);
    const model = modelLastFrostDay(place.lat, place.lng);
    expect(record.spring.typicalDay).toBeLessThan(model - 30); // the raw record says five weeks earlier
    expect(lastFrostDay(place.lat, place.lng, record)).toBe(model - FROST_RECORD_LIMITS.springEarlier);
  });

  it("never lets a record push dates outside its limits in either direction, spring or autumn", () => {
    const place = PLACES.york;
    const base = recordFor(place);
    const springModel = modelLastFrostDay(place.lat, place.lng);
    const autumnModel = modelFirstAutumnFrostDay(place.lat, place.lng);

    for (const typicalDay of [1, 40, 90, 120, 150, 181]) {
      const day = lastFrostDay(place.lat, place.lng, { ...base, spring: { ...base.spring, typicalDay } });
      expect(day).toBeGreaterThanOrEqual(springModel - FROST_RECORD_LIMITS.springEarlier);
      expect(day).toBeLessThanOrEqual(springModel + FROST_RECORD_LIMITS.springLater);
    }
    for (const earliestDay of [213, 250, 280, 310, 365, null]) {
      const day = firstAutumnFrostDay(place.lat, place.lng, { ...base, autumn: { ...base.autumn, earliestDay } });
      expect(day).toBeGreaterThanOrEqual(autumnModel - FROST_RECORD_LIMITS.autumnEarlier);
      expect(day).toBeLessThanOrEqual(autumnModel + FROST_RECORD_LIMITS.autumnLater);
    }
  });

  it("uses the earliest autumn frost of the decade — the cautious end, like the model", () => {
    for (const place of [PLACES.barnet, PLACES.buxton, PLACES.york]) {
      const personal = firstAutumnFrostDay(place.lat, place.lng, recordFor(place));
      expect(Math.abs(personal - modelFirstAutumnFrostDay(place.lat, place.lng))).toBeLessThanOrEqual(7);
      expect(personal).toBe(Math.min(...(place.autumn as readonly number[])));
    }
  });
});

describe("frost record — entering the site through one door", () => {
  it("leaves every date on the model until a record is held (server pages, city pages, first paint)", () => {
    const { lat, lng } = PLACES.buxton;
    expect(getStoredFrostRecord(lat, lng)).toBeNull();
    expect(lastFrostDay(lat, lng)).toBe(modelLastFrostDay(lat, lng));
    expect(describeLocalFrost(lat, lng).source).toBe("model");
  });

  it("personalises calculateLastFrostDate for exactly the saved spot, and nowhere else", () => {
    const place = PLACES.buxton;
    const record = recordFor(place);
    resetFrostRecords(record);

    const year = new Date().getFullYear();
    const dayOf = (date: Date) => Math.round((date.getTime() - new Date(year, 0, 0).getTime()) / 86400000);

    expect(dayOf(calculateLastFrostDate(place.lat, place.lng))).toBe(lastFrostDay(place.lat, place.lng, record));
    expect(dayOf(calculateFirstAutumnFrostDate(place.lat, place.lng))).toBe(firstAutumnFrostDay(place.lat, place.lng, record));

    // A neighbouring town's page is untouched by this gardener's record.
    expect(dayOf(calculateLastFrostDate(53.26, -1.91))).toBe(modelLastFrostDay(53.26, -1.91));

    const story = describeLocalFrost(place.lat, place.lng);
    expect(story.source).toBe("record");
    expect(story.years).toBe(10);
    expect(story.elevation).toBe(294);
    expect(story.springShiftDays).toBeGreaterThan(0);
    expect(story.latestLastFrost?.getMonth()).toBe(4); // May
  });

  it("fetches a place's record once, and keeps the model when the archive isn't answering", async () => {
    const place = PLACES.york;
    const { time, mins } = archiveFor(place);
    const fetchMock = vi.fn(async () => ({
      ok: true,
      json: async () => ({ elevation: 19, daily: { time, temperature_2m_min: mins } }),
    }));
    vi.stubGlobal("fetch", fetchMock);

    const now = new Date("2026-11-16T12:00:00Z");
    const [a, b] = await Promise.all([
      ensureFrostRecord(place.lat, place.lng, now),
      ensureFrostRecord(place.lat, place.lng, now),
    ]);
    expect(a?.years).toBe(10);
    expect(b).toBe(a);
    await ensureFrostRecord(place.lat, place.lng, now);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // A year on (and more than a week since we last asked) it is refreshed —
    // once: the archive in this test still ends at 2025, and we don't nag it.
    const nextYear = new Date(Date.now() + 80 * 24 * 60 * 60 * 1000);
    nextYear.setFullYear(Math.max(nextYear.getFullYear(), 2027));
    await ensureFrostRecord(place.lat, place.lng, nextYear);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await ensureFrostRecord(place.lat, place.lng, nextYear);
    expect(fetchMock).toHaveBeenCalledTimes(2);

    resetFrostRecords();
    const failing = vi.fn(async () => ({ ok: false, json: async () => ({}) }));
    vi.stubGlobal("fetch", failing);
    expect(await ensureFrostRecord(place.lat, place.lng, now)).toBeNull();
    expect(await ensureFrostRecord(place.lat, place.lng, now)).toBeNull();
    expect(failing).toHaveBeenCalledTimes(1);
    expect(lastFrostDay(place.lat, place.lng)).toBe(modelLastFrostDay(place.lat, place.lng));
  });
});
