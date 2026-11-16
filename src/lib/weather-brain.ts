/**
 * The weather brain — one reading of the sky per place, shared by everything.
 *
 * Before this file each component asked Open-Meteo its own question (seven
 * differently-shaped requests, five of them on the homepage) and each kept its
 * own idea of what "frost risk" or "a dry spell" meant. Now there is ONE
 * request per place, cached for half an hour, and ONE definition of each
 * judgement. Components read the same snapshot through small adapters, so two
 * parts of a page can no longer disagree about tonight.
 *
 * Rules for anyone extending this:
 *  - Need a new weather field? Add it to the single request here. Never add a
 *    second fetch in a component.
 *  - Need a new judgement (too windy to plant out, soil warm enough)? Add a
 *    pure function here with a test. Never re-derive it inline.
 *  - This module must stay safe on the server (no window/localStorage at
 *    import time) — /guides reads it during rendering.
 */

import { ukNow } from "@/lib/seasonal-time";

// ─── The snapshot ───────────────────────────────────────────────────────────

type Series = (number | null)[];

export interface LocalWeather {
  /** Cache key the snapshot was fetched for (rounded lat,lng). */
  key: string;
  latitude: number;
  longitude: number;
  /** Metres above sea level for the forecast point, when the API reports it. */
  elevation: number | null;
  fetchedAt: number;
  current: {
    /** UK wall-clock time of the reading, e.g. "2026-11-16T11:15". */
    time: string | null;
    temp: number | null;
    humidity: number | null;
    precipitation: number | null;
    rain: number | null;
    weatherCode: number | null;
    cloudCover: number | null;
    windSpeed: number | null;
    windDirection: number | null;
    soilTemp0cm: number | null;
  };
  /** Hourly, UK wall-clock, covering PAST_DAYS back and FORECAST_DAYS ahead. */
  hourly: {
    time: string[];
    temp: Series;
    humidity: Series;
    precipitation: Series;
    soilTemp6cm: Series;
    soilMoisture: Series;
  };
  /** Daily, same span. */
  daily: {
    time: string[];
    tempMin: Series;
    tempMax: Series;
    precipitation: Series;
    precipProbability: Series;
    et0: Series;
    windMax: Series;
    gustsMax: Series;
    sunshineSeconds: Series;
    weatherCode: Series;
  };
}

export const PAST_DAYS = 7;
export const FORECAST_DAYS = 7;
const CACHE_TTL_MS = 30 * 60 * 1000;
const FAILURE_BACKOFF_MS = 60 * 1000;
const STORAGE_KEY = "whattosow:brain:weather";

/** Where we read the sky from when nobody has given us a postcode: Birmingham. */
export const UK_MIDDLE = { latitude: 52.48, longitude: -1.89 } as const;

// ─── The single definitions ─────────────────────────────────────────────────

/**
 * Frost risk: a forecast air minimum of 2°C or below. Air temperature is
 * measured at head height; on a still, clear night the ground runs a few
 * degrees colder, so 2°C in the forecast is a frost on the lettuces.
 */
export const FROST_RISK_MAX_C = 2;
export function isFrostRisk(minTempC: number | null | undefined): boolean {
  return typeof minTempC === "number" && minTempC <= FROST_RISK_MAX_C;
}

/** A day counts as "wet" for dry-spell purposes once it has had 2mm. */
export const WET_DAY_MM = 2;

export function isRainingCode(code: number | null | undefined): boolean {
  return code != null && code >= 51 && code <= 82;
}

// ─── Time helpers (everything is UK wall-clock, like the API response) ───────

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** "2026-11-16" for the UK calendar day containing `now`. */
export function ukDay(now: Date = new Date(), offsetDays = 0): string {
  const uk = ukNow(now);
  const d = new Date(Date.UTC(uk.getUTCFullYear(), uk.getUTCMonth(), uk.getUTCDate() + offsetDays));
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

/** "2026-11-16T11" — the UK hour containing `now`, matching hourly.time prefixes. */
export function ukHour(now: Date = new Date()): string {
  const uk = ukNow(now);
  return `${ukDay(now)}T${pad(uk.getUTCHours())}`;
}

function hourIndex(w: LocalWeather, now: Date): number {
  const target = ukHour(now);
  return w.hourly.time.findIndex((t) => t.slice(0, 13) === target);
}

function dayIndex(w: LocalWeather, now: Date, offsetDays = 0): number {
  return w.daily.time.indexOf(ukDay(now, offsetDays));
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function sum(series: Series, from: number, to: number): number {
  let total = 0;
  for (let i = Math.max(0, from); i <= to && i < series.length; i++) total += series[i] ?? 0;
  return total;
}

function latest(series: Series, uptoIndex: number): number | null {
  for (let i = Math.min(uptoIndex, series.length - 1); i >= 0; i--) {
    const v = series[i];
    if (typeof v === "number") return v;
  }
  return null;
}

// ─── Judgements ─────────────────────────────────────────────────────────────

/** Rain that has actually fallen in the 24 hours up to now (mm). */
export function rainLast24h(w: LocalWeather, now: Date = new Date()): number | null {
  const i = hourIndex(w, now);
  if (i < 0) return null;
  return round1(sum(w.hourly.precipitation, i - 23, i));
}

/** Rain forecast for the coming `hours` (mm). */
export function rainNextHours(w: LocalWeather, hours: number, now: Date = new Date()): number | null {
  const i = hourIndex(w, now);
  if (i < 0) return null;
  return round1(sum(w.hourly.precipitation, i + 1, i + hours));
}

/**
 * How many days in a row, counting back from yesterday, had less than 2mm.
 * Zero if it has rained properly in the last 24 hours. Capped by the week of
 * history we hold.
 */
export function drySpellDays(w: LocalWeather, now: Date = new Date()): number {
  if ((rainLast24h(w, now) ?? 0) >= WET_DAY_MM) return 0;
  const today = dayIndex(w, now);
  if (today < 0) return 0;
  let days = 0;
  for (let i = today - 1; i >= 0; i--) {
    if ((w.daily.precipitation[i] ?? 0) >= WET_DAY_MM) break;
    days++;
  }
  return days;
}

export interface NightLow {
  /** The date the night begins (its evening), YYYY-MM-DD. */
  date: string;
  min: number;
  frostRisk: boolean;
}

/**
 * The lows of the coming nights — properly "tonight", not "today's minimum".
 *
 * A daily minimum is mostly set around dawn, so after breakfast "today's min"
 * is already behind you, and the number a gardener needs before leaving the
 * plot — how cold will it get TONIGHT — lives in tomorrow's row. So we read
 * nights from the hourly series: 6pm to 9am, labelled by their evening. Before
 * 9am the night still in progress comes first.
 */
export function nightLows(w: LocalWeather, count = 3, now: Date = new Date()): NightLow[] {
  const nowHour = ukHour(now);
  const startOffset = ukNow(now).getUTCHours() < 9 ? -1 : 0;
  const nights: NightLow[] = [];

  for (let n = startOffset; nights.length < count && n < FORECAST_DAYS; n++) {
    const from = `${ukDay(now, n)}T18`;
    const to = `${ukDay(now, n + 1)}T09`;
    let min: number | null = null;
    let hours = 0;
    for (let i = 0; i < w.hourly.time.length; i++) {
      const t = w.hourly.time[i].slice(0, 13);
      if (t < from || t > to || t < nowHour) continue;
      const v = w.hourly.temp[i];
      if (typeof v !== "number") continue;
      hours++;
      if (min === null || v < min) min = v;
    }
    // A night in progress may only have an hour or two left; a future night
    // needs most of its hours present to be trusted.
    if (min === null || (n >= 0 && hours < 10)) continue;
    nights.push({ date: ukDay(now, n), min: round1(min), frostRisk: isFrostRisk(min) });
  }

  if (nights.length > 0) return nights;

  // Hourly missing: fall back to daily minimums from today.
  const today = dayIndex(w, now);
  if (today < 0) return [];
  for (let i = today; i < w.daily.time.length && nights.length < count; i++) {
    const v = w.daily.tempMin[i];
    if (typeof v === "number") nights.push({ date: w.daily.time[i], min: round1(v), frostRisk: isFrostRisk(v) });
  }
  return nights;
}

/** Soil temperature at seed depth (6cm), falling back to the surface reading. */
export function soilTempNow(w: LocalWeather, now: Date = new Date()): { seedDepth: number | null; surface: number | null } {
  const i = hourIndex(w, now);
  const seed = i >= 0 ? latest(w.hourly.soilTemp6cm, i) : null;
  return {
    seedDepth: seed === null ? null : round1(seed),
    surface: w.current.soilTemp0cm === null ? null : round1(w.current.soilTemp0cm),
  };
}

/** The hourly slice the Hutton blight assessment has always looked at: 2 days back, 5 ahead. */
export function huttonWindow(w: LocalWeather, now: Date = new Date()): { time: string[]; temp: Series; humidity: Series } {
  const from = ukDay(now, -2);
  const to = ukDay(now, 4);
  const time: string[] = [];
  const temp: Series = [];
  const humidity: Series = [];
  for (let i = 0; i < w.hourly.time.length; i++) {
    const day = w.hourly.time[i].slice(0, 10);
    if (day < from || day > to) continue;
    time.push(w.hourly.time[i]);
    temp.push(w.hourly.temp[i] ?? null);
    humidity.push(w.hourly.humidity[i] ?? null);
  }
  return { time, temp, humidity };
}

// ─── Fetching ───────────────────────────────────────────────────────────────

export function weatherKey(lat: number, lng: number): string {
  return `${lat.toFixed(2)},${lng.toFixed(2)}`;
}

export function buildForecastUrl(lat: number, lng: number): string {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current: [
      "temperature_2m", "relative_humidity_2m", "precipitation", "rain", "weather_code",
      "cloud_cover", "wind_speed_10m", "wind_direction_10m", "soil_temperature_0cm",
    ].join(","),
    hourly: [
      "temperature_2m", "relative_humidity_2m", "precipitation",
      "soil_temperature_6cm", "soil_moisture_0_to_7cm",
    ].join(","),
    daily: [
      "temperature_2m_min", "temperature_2m_max", "precipitation_sum",
      "precipitation_probability_max", "et0_fao_evapotranspiration",
      "wind_speed_10m_max", "wind_gusts_10m_max", "sunshine_duration", "weather_code",
    ].join(","),
    past_days: String(PAST_DAYS),
    forecast_days: String(FORECAST_DAYS),
    timezone: "Europe/London",
  });
  return `https://api.open-meteo.com/v1/forecast?${params}`;
}

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function series(value: unknown, length: number): Series {
  if (!Array.isArray(value)) return new Array(length).fill(null);
  return value.map(num);
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

/** Turn a raw Open-Meteo response into a snapshot. Returns null if it isn't usable. */
export function parseForecast(raw: unknown, lat: number, lng: number, fetchedAt: number = Date.now()): LocalWeather | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (r.error) return null;
  const c = (r.current ?? {}) as Record<string, unknown>;
  const h = (r.hourly ?? {}) as Record<string, unknown>;
  const d = (r.daily ?? {}) as Record<string, unknown>;

  const hourTimes = strings(h.time);
  const dayTimes = strings(d.time);
  if (hourTimes.length === 0 && dayTimes.length === 0 && num(c.temperature_2m) === null) return null;

  return {
    key: weatherKey(lat, lng),
    latitude: lat,
    longitude: lng,
    elevation: num(r.elevation),
    fetchedAt,
    current: {
      time: typeof c.time === "string" ? c.time : null,
      temp: num(c.temperature_2m),
      humidity: num(c.relative_humidity_2m),
      precipitation: num(c.precipitation),
      rain: num(c.rain),
      weatherCode: num(c.weather_code),
      cloudCover: num(c.cloud_cover),
      windSpeed: num(c.wind_speed_10m),
      windDirection: num(c.wind_direction_10m),
      soilTemp0cm: num(c.soil_temperature_0cm),
    },
    hourly: {
      time: hourTimes,
      temp: series(h.temperature_2m, hourTimes.length),
      humidity: series(h.relative_humidity_2m, hourTimes.length),
      precipitation: series(h.precipitation, hourTimes.length),
      soilTemp6cm: series(h.soil_temperature_6cm, hourTimes.length),
      soilMoisture: series(h.soil_moisture_0_to_7cm, hourTimes.length),
    },
    daily: {
      time: dayTimes,
      tempMin: series(d.temperature_2m_min, dayTimes.length),
      tempMax: series(d.temperature_2m_max, dayTimes.length),
      precipitation: series(d.precipitation_sum, dayTimes.length),
      precipProbability: series(d.precipitation_probability_max, dayTimes.length),
      et0: series(d.et0_fao_evapotranspiration, dayTimes.length),
      windMax: series(d.wind_speed_10m_max, dayTimes.length),
      gustsMax: series(d.wind_gusts_10m_max, dayTimes.length),
      sunshineSeconds: series(d.sunshine_duration, dayTimes.length),
      weatherCode: series(d.weather_code, dayTimes.length),
    },
  };
}

function readStored(key: string): LocalWeather | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LocalWeather;
    if (parsed?.key !== key || typeof parsed.fetchedAt !== "number") return null;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    if (!parsed.hourly?.time || !parsed.daily?.time || !parsed.current) return null;
    return parsed;
  } catch {
    return null;
  }
}

function store(weather: LocalWeather): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(weather));
  } catch {
    /* storage full or unavailable — the in-memory copy still serves this page */
  }
}

interface MemoryEntry {
  at: number;
  ok: boolean;
  promise: Promise<LocalWeather | null>;
}
const memory = new Map<string, MemoryEntry>();

/**
 * The one way to get weather. Every caller for the same place within half an
 * hour shares a single request — including callers that ask at the same moment.
 * Resolves to null (never throws) when the weather isn't answering.
 */
export function getLocalWeather(lat: number, lng: number): Promise<LocalWeather | null> {
  const key = weatherKey(lat, lng);
  const now = Date.now();

  const held = memory.get(key);
  if (held && now - held.at < (held.ok ? CACHE_TTL_MS : FAILURE_BACKOFF_MS)) return held.promise;

  const stored = readStored(key);
  if (stored) {
    const promise = Promise.resolve(stored);
    memory.set(key, { at: stored.fetchedAt, ok: true, promise });
    return promise;
  }

  const entry: MemoryEntry = { at: now, ok: true, promise: Promise.resolve(null) };
  entry.promise = (async () => {
    try {
      const res = await fetch(buildForecastUrl(lat, lng));
      if (!res.ok) throw new Error(`weather ${res.status}`);
      const weather = parseForecast(await res.json(), lat, lng);
      if (!weather) throw new Error("weather unreadable");
      store(weather);
      return weather;
    } catch {
      entry.ok = false; // retry after a short pause rather than half an hour
      return null;
    }
  })();
  memory.set(key, entry);
  return entry.promise;
}

/** Test seam: forget everything held in memory. */
export function resetWeatherBrain(): void {
  memory.clear();
}
