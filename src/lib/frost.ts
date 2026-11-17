import { getStoredFrostRecord, type FrostRecord } from "@/lib/frost-record";
import { getLocalWeather, nightLows, soilTempNow, ukDay, ukHour, type LocalWeather } from "@/lib/weather-brain";

export interface LocationData {
  postcode: string;
  latitude: number;
  longitude: number;
  region: string;
  adminDistrict: string;
}

export interface FrostData {
  location: LocationData;
  lastFrostDate: Date;
  firstAutumnFrostDate: Date;
  growingSeasonDays: number;
  daysUntilSafe: number;
  isSafe: boolean;
}

export interface FrostForecast {
  tonight: { min: number; frostRisk: boolean };
  tomorrow: { min: number; frostRisk: boolean };
  nextThreeDays: { date: string; min: number; frostRisk: boolean }[];
  /** The coming week of nights (up to 7), for holding plant-outs back. */
  nightsAhead?: { date: string; min: number; frostRisk: boolean }[];
  soilTemp?: number; // current soil temperature at surface (°C)
  soilTemp6cm?: number; // seed-depth soil temp (°C)
  soilMoisture?: number; // volumetric moisture 0-7cm (m³/m³)
  evapotranspiration?: number; // daily ET₀ in mm
  windMax?: number; // max wind km/h
  windGustsMax?: number; // max gusts km/h
  precipProbability?: number; // max precip probability %
  sunshineDuration?: number; // sunshine hours today
  tempMax?: number; // today's high °C
  rainfall3Days?: number; // total precipitation over next 3 days (mm)
}

export type LookupError = "invalid" | "network";

/**
 * Look up a UK postcode using the free postcodes.io API.
 * Returns LocationData on success, or a LookupError string on failure.
 */
export async function lookupPostcode(
  postcode: string
): Promise<LocationData | LookupError> {
  const cleaned = postcode.replace(/\s/g, "").toUpperCase();

  try {
    const res = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(cleaned)}`
    );
    if (!res.ok) return "invalid";

    const data = await res.json();
    if (data.status !== 200 || !data.result) return "invalid";

    const r = data.result;
    if (typeof r.latitude !== "number" || typeof r.longitude !== "number") {
      return "invalid";
    }
    return {
      postcode: r.postcode,
      latitude: r.latitude,
      longitude: r.longitude,
      region: r.region || r.country || "Unknown",
      adminDistrict: r.admin_district || "Unknown",
    };
  } catch {
    return "network";
  }
}

/**
 * The latitude model for the last spring frost, as a day of the year.
 *
 * Calibrated against Met Office HadUK-Grid frost date data:
 * - Base: ~April 10 (day 100) at latitude 50°N
 * - Rate: +6 days per degree north
 * - Gulf Stream adjustment: western locations are milder
 *
 * It tracks the typical (median) last night at or below 2°C well for inland,
 * low-lying places. It cannot see altitude or the coast — the frost record
 * (frost-record.ts) corrects for those where we have one.
 */
export function modelLastFrostDay(lat: number, long: number): number {
  let dayOfYear = 100 + (lat - 50) * 6;

  // Longitude/coastal adjustment (Gulf Stream effect)
  if (long < -4.5) {
    dayOfYear -= 5; // Far west (Cornwall tip, W Wales coast, W Highlands)
  } else if (long < -3) {
    dayOfYear -= 3; // West
  } else if (long < -1) {
    dayOfYear -= 1; // West-central
  } else if (long > 0.5) {
    dayOfYear += 2; // East coast (continental influence)
  }

  // Clamp to reasonable UK range (late March to mid June)
  return Math.max(85, Math.min(168, Math.round(dayOfYear)));
}

/**
 * The latitude model for the first autumn frost, as a day of the year.
 * Base ~October 25 (day 298) at 50°N, about 5 days earlier per degree north.
 * Deliberately cautious: against ten years of archive nights it sits close to
 * the EARLIEST first frost of the decade, not the typical one.
 */
export function modelFirstAutumnFrostDay(lat: number, long: number): number {
  let dayOfYear = 298 - (lat - 50) * 5;

  // Coastal adjustment (inverse of spring)
  if (long < -4.5) {
    dayOfYear += 4;
  } else if (long < -3) {
    dayOfYear += 2;
  } else if (long > 0.5) {
    dayOfYear -= 2;
  }

  return Math.max(245, Math.min(310, Math.round(dayOfYear)));
}

/**
 * How far a place's own frost record may move its dates away from the model.
 *
 * Frost isn't the whole season: in a mild coastal garden the frosts may stop
 * in early March, but the light and the soil are still March's, and seed sown
 * five weeks "early" just sits there. So the record may pull spring dates at
 * most two weeks earlier. Moving LATER is the safety-critical direction — a
 * hill garden really does frost into May — so that gets four weeks. Autumn
 * mirrors it: up to four weeks earlier (shorter season), two weeks later.
 */
export const FROST_RECORD_LIMITS = {
  springEarlier: 14,
  springLater: 28,
  autumnEarlier: 28,
  autumnLater: 14,
} as const;

function clampDay(day: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(day)));
}

/** Last-spring-frost day for a place: its own record where we hold one, else the model. */
export function lastFrostDay(lat: number, long: number, record: FrostRecord | null = getStoredFrostRecord(lat, long)): number {
  const model = modelLastFrostDay(lat, long);
  if (!record) return model;
  return clampDay(
    record.spring.typicalDay,
    model - FROST_RECORD_LIMITS.springEarlier,
    model + FROST_RECORD_LIMITS.springLater
  );
}

/**
 * First-autumn-frost day for a place. The model behaves like "the earliest it
 * has come in a decade", so the record supplies the same cautious figure: the
 * earliest first frost in its ten years.
 */
export function firstAutumnFrostDay(lat: number, long: number, record: FrostRecord | null = getStoredFrostRecord(lat, long)): number {
  const model = modelFirstAutumnFrostDay(lat, long);
  if (!record) return model;
  return clampDay(
    record.autumn.earliestDay ?? model + FROST_RECORD_LIMITS.autumnLater,
    model - FROST_RECORD_LIMITS.autumnEarlier,
    model + FROST_RECORD_LIMITS.autumnLater
  );
}

function dateFromDay(dayOfYear: number, year: number = new Date().getFullYear()): Date {
  const date = new Date(year, 0); // Jan 1
  date.setDate(dayOfYear);
  return date;
}

/**
 * The last spring frost date for a UK location, this year.
 *
 * Every sowing date on the site hangs off this one function, so it is also the
 * one place personalisation enters: if the gardener's own ten-year frost
 * record is held for exactly these coordinates, the date comes from it (within
 * FROST_RECORD_LIMITS); otherwise from the latitude model. On the server, and
 * for any coordinates that aren't the gardener's saved spot, it is always the
 * model — so city pages and UK-average pages render identically for everyone.
 */
export function calculateLastFrostDate(lat: number, long: number): Date {
  return dateFromDay(lastFrostDay(lat, long));
}

/**
 * The first autumn frost date for a UK location, this year (see above).
 */
export function calculateFirstAutumnFrostDate(
  lat: number,
  long: number
): Date {
  return dateFromDay(firstAutumnFrostDay(lat, long));
}

export interface LocalFrostStory {
  /** Whether the dates come from this place's own record or the latitude model. */
  source: "record" | "model";
  /** How many days the record moved the spring date from the model (+ = later). */
  springShiftDays: number;
  autumnShiftDays: number;
  years: number;
  elevation: number | null;
  /** The spread of real last frosts in the record, this year's calendar. */
  earliestLastFrost: Date | null;
  latestLastFrost: Date | null;
  earliestFirstFrost: Date | null;
}

/** What we actually know about this place's frosts — for sentences, not tiles. */
export function describeLocalFrost(lat: number, long: number): LocalFrostStory {
  const record = getStoredFrostRecord(lat, long);
  if (!record) {
    return {
      source: "model",
      springShiftDays: 0,
      autumnShiftDays: 0,
      years: 0,
      elevation: null,
      earliestLastFrost: null,
      latestLastFrost: null,
      earliestFirstFrost: null,
    };
  }
  const day = (d: number | null) => (d === null ? null : dateFromDay(d));
  return {
    source: "record",
    springShiftDays: lastFrostDay(lat, long, record) - modelLastFrostDay(lat, long),
    autumnShiftDays: firstAutumnFrostDay(lat, long, record) - modelFirstAutumnFrostDay(lat, long),
    years: record.years,
    elevation: record.elevation,
    earliestLastFrost: day(record.spring.earliestDay),
    latestLastFrost: day(record.spring.latestDay),
    earliestFirstFrost: day(record.autumn.earliestDay),
  };
}

/**
 * Frost forecast and plot conditions, read from the shared weather brain
 * (one request per place — see src/lib/weather-brain.ts).
 */
export function frostForecastFrom(w: LocalWeather, now: Date = new Date()): FrostForecast | null {
  const nights = nightLows(w, 3, now);
  if (nights.length < 2) return null;

  const today = w.daily.time.indexOf(ukDay(now));
  const at = (series: (number | null)[]): number | undefined => {
    const v = today >= 0 ? series[today] : null;
    return typeof v === "number" ? v : undefined;
  };
  const round1 = (v: number | undefined) => (v === undefined ? undefined : Math.round(v * 10) / 10);
  const round0 = (v: number | undefined) => (v === undefined ? undefined : Math.round(v));

  const soil = soilTempNow(w, now);
  const hour = w.hourly.time.findIndex((t) => t.slice(0, 13) === ukHour(now));
  let soilMoisture: number | undefined;
  for (let i = hour; i >= 0; i--) {
    const v = w.hourly.soilMoisture[i];
    if (typeof v === "number") {
      soilMoisture = Math.round(v * 10) / 10;
      break;
    }
  }

  let rainfall3Days: number | undefined;
  if (today >= 0) {
    const next = w.daily.precipitation.slice(today, today + 3);
    if (next.length > 0) rainfall3Days = Math.round(next.reduce((a: number, b) => a + (b ?? 0), 0) * 10) / 10;
  }

  const sunshine = at(w.daily.sunshineSeconds);

  return {
    tonight: nights[0],
    tomorrow: nights[1],
    nextThreeDays: nights,
    nightsAhead: nightLows(w, 7, now),
    soilTemp: soil.surface ?? undefined,
    soilTemp6cm: soil.seedDepth ?? undefined,
    soilMoisture,
    evapotranspiration: round1(at(w.daily.et0)),
    windMax: round0(at(w.daily.windMax)),
    windGustsMax: round0(at(w.daily.gustsMax)),
    precipProbability: at(w.daily.precipProbability),
    sunshineDuration: sunshine === undefined ? undefined : Math.round((sunshine / 3600) * 10) / 10,
    tempMax: round1(at(w.daily.tempMax)),
    rainfall3Days,
  };
}

export async function getFrostForecast(
  lat: number,
  long: number
): Promise<FrostForecast | null> {
  const weather = await getLocalWeather(lat, long);
  return weather ? frostForecastFrom(weather) : null;
}

/**
 * Calculate full frost data for a location.
 * If we're past this year's autumn frost date, show next spring's frost date
 * so the countdown is always forward-looking.
 */
export function calculateFrostData(location: LocationData): FrostData {
  const now = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;

  let lastFrost = calculateLastFrostDate(
    location.latitude,
    location.longitude
  );
  const firstAutumn = calculateFirstAutumnFrostDate(
    location.latitude,
    location.longitude
  );

  // If we're past the autumn frost date, show next year's spring frost
  if (now > firstAutumn) {
    const nextYear = new Date(lastFrost);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    lastFrost = nextYear;
  }

  const daysUntilSafe = Math.ceil(
    (lastFrost.getTime() - now.getTime()) / msPerDay
  );

  const growingSeasonDays = Math.round(
    (firstAutumn.getTime() -
      (now > firstAutumn
        ? calculateLastFrostDate(location.latitude, location.longitude)
        : lastFrost
      ).getTime()) / msPerDay
  );

  return {
    location,
    lastFrostDate: lastFrost,
    firstAutumnFrostDate: firstAutumn,
    growingSeasonDays,
    daysUntilSafe,
    isSafe: daysUntilSafe <= 0,
  };
}

/**
 * Format a date nicely for UK display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/**
 * Format a short date
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
