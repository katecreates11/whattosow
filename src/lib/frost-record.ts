/**
 * Your frost, actually — ten years of real nights for one place.
 *
 * The latitude model in frost.ts is a good first guess, but it cannot see a
 * hill, a coast or a frost pocket: two gardens on the same latitude get the
 * same date. This module asks the Open-Meteo archive for a decade of overnight
 * lows at the gardener's own coordinates (elevation-corrected) and reads off
 * when frost has really stopped in spring and started in autumn.
 *
 * "Frost" here means what it means everywhere on the site: an air minimum of
 * 2°C or below (see FROST_RISK_MAX_C in weather-brain.ts).
 *
 * This file only derives, fetches and stores the record. How far the record is
 * allowed to move the sowing calendar is decided in frost.ts, next to the
 * model it adjusts.
 */

import { FROST_RISK_MAX_C } from "@/lib/weather-brain";

export interface FrostRecord {
  /** Exact coordinates the record was fetched for (the saved location's). */
  latitude: number;
  longitude: number;
  /** Metres above sea level of the point, as the archive models it. */
  elevation: number | null;
  /** Complete calendar years analysed, e.g. 2016–2025 → 10. */
  years: number;
  firstYear: number;
  lastYear: number;
  spring: {
    /** Median day-of-year of the last spring frost (frost-free years count as 1 Jan). */
    typicalDay: number;
    /** Earliest and latest last-frost in the record, from years that had one. */
    earliestDay: number | null;
    latestDay: number | null;
    /** Years with no frost at all between January and June. */
    frostFreeYears: number;
  };
  autumn: {
    /** Median day-of-year of the first autumn frost (frost-free years count as 31 Dec). */
    typicalDay: number;
    earliestDay: number | null;
    latestDay: number | null;
    frostFreeYears: number;
  };
  fetchedAt: number;
}

export const FROST_RECORD_YEARS = 10;
/** Bump when the derivation changes so old stored records are refetched. */
const RECORD_VERSION = 1;
const STORAGE_KEY = "whattosow:brain:frost";
/** Spring frosts are looked for up to 30 June; autumn frosts from 1 August. */
const SPRING_END_DAY = 181;
const AUTUMN_START_DAY = 213;
const MIN_YEARS = 5;
const MIN_DAYS_PER_YEAR = 350;

function dayOfYear(iso: string): number {
  const y = Number(iso.slice(0, 4));
  const m = Number(iso.slice(5, 7));
  const d = Number(iso.slice(8, 10));
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 0)) / 86400000);
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length / 2;
  return sorted.length % 2 === 0
    ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
    : sorted[Math.floor(mid)];
}

/**
 * Read a frost record out of a run of daily minimum temperatures.
 * Pure — give it the archive's `daily.time` and `daily.temperature_2m_min`.
 * Returns null if there aren't at least five complete years to judge from.
 */
export function deriveFrostRecord(
  times: string[],
  mins: (number | null)[],
  meta: { latitude: number; longitude: number; elevation?: number | null; fetchedAt?: number }
): FrostRecord | null {
  const byYear = new Map<number, { days: number; lastSpring: number | null; firstAutumn: number | null }>();

  for (let i = 0; i < times.length; i++) {
    const min = mins[i];
    if (typeof min !== "number") continue;
    const year = Number(times[i].slice(0, 4));
    const day = dayOfYear(times[i]);
    let entry = byYear.get(year);
    if (!entry) {
      entry = { days: 0, lastSpring: null, firstAutumn: null };
      byYear.set(year, entry);
    }
    entry.days++;
    if (min > FROST_RISK_MAX_C) continue;
    if (day <= SPRING_END_DAY) {
      if (entry.lastSpring === null || day > entry.lastSpring) entry.lastSpring = day;
    } else if (day >= AUTUMN_START_DAY) {
      if (entry.firstAutumn === null || day < entry.firstAutumn) entry.firstAutumn = day;
    }
  }

  const complete = [...byYear.entries()]
    .filter(([, v]) => v.days >= MIN_DAYS_PER_YEAR)
    .sort(([a], [b]) => a - b);
  if (complete.length < MIN_YEARS) return null;

  const springs = complete.map(([, v]) => v.lastSpring);
  const autumns = complete.map(([, v]) => v.firstAutumn);
  const realSprings = springs.filter((d): d is number => d !== null);
  const realAutumns = autumns.filter((d): d is number => d !== null);

  return {
    latitude: meta.latitude,
    longitude: meta.longitude,
    elevation: typeof meta.elevation === "number" ? Math.round(meta.elevation) : null,
    years: complete.length,
    firstYear: complete[0][0],
    lastYear: complete[complete.length - 1][0],
    spring: {
      typicalDay: median(springs.map((d) => d ?? 1)),
      earliestDay: realSprings.length ? Math.min(...realSprings) : null,
      latestDay: realSprings.length ? Math.max(...realSprings) : null,
      frostFreeYears: springs.length - realSprings.length,
    },
    autumn: {
      typicalDay: median(autumns.map((d) => d ?? 365)),
      earliestDay: realAutumns.length ? Math.min(...realAutumns) : null,
      latestDay: realAutumns.length ? Math.max(...realAutumns) : null,
      frostFreeYears: autumns.length - realAutumns.length,
    },
    fetchedAt: meta.fetchedAt ?? Date.now(),
  };
}

export function buildArchiveUrl(lat: number, lng: number, now: Date = new Date()): string {
  const lastYear = now.getFullYear() - 1;
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    start_date: `${lastYear - FROST_RECORD_YEARS + 1}-01-01`,
    end_date: `${lastYear}-12-31`,
    daily: "temperature_2m_min",
    timezone: "Europe/London",
  });
  return `https://archive-api.open-meteo.com/v1/archive?${params}`;
}

// ─── Storage: one record, for the saved location ────────────────────────────

interface StoredRecord {
  v: number;
  record: FrostRecord;
}

let held: FrostRecord | null = null;
let hydrated = false;

function sameSpot(record: FrostRecord, lat: number, lng: number): boolean {
  return Math.abs(record.latitude - lat) < 1e-6 && Math.abs(record.longitude - lng) < 1e-6;
}

function isRecord(value: unknown): value is FrostRecord {
  const r = value as FrostRecord | null;
  return (
    !!r &&
    typeof r.latitude === "number" &&
    typeof r.longitude === "number" &&
    typeof r.years === "number" &&
    typeof r.lastYear === "number" &&
    typeof r.spring?.typicalDay === "number" &&
    typeof r.autumn?.typicalDay === "number"
  );
}

function hydrate(): void {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as StoredRecord;
    if (parsed?.v === RECORD_VERSION && isRecord(parsed.record)) held = parsed.record;
  } catch {
    /* unreadable — behave as if there is no record */
  }
}

/**
 * The frost record for exactly this spot, if we already hold one. Synchronous,
 * and always null on the server — so server-rendered pages and city pages keep
 * using the model, and only the gardener's own saved place becomes personal.
 */
export function getStoredFrostRecord(lat: number, lng: number): FrostRecord | null {
  hydrate();
  return held && sameSpot(held, lat, lng) ? held : null;
}

function save(record: FrostRecord): void {
  held = record;
  hydrated = true;
  if (typeof window === "undefined") return;
  try {
    const stored: StoredRecord = { v: RECORD_VERSION, record };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    /* storage unavailable — the in-memory record still serves this page */
  }
}

const RECHECK_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * A record is current while it still ends at the last complete calendar year.
 * If the archive hasn't caught up with the new year yet, don't ask again for a
 * week — one 60KB download per visitor per year is the budget, not one per page.
 */
function isCurrent(record: FrostRecord, now: Date): boolean {
  if (record.lastYear >= now.getFullYear() - 1) return true;
  return now.getTime() - record.fetchedAt < RECHECK_AFTER_MS;
}

const inFlight = new Map<string, Promise<FrostRecord | null>>();
const failed = new Set<string>();

/**
 * Make sure we hold a current frost record for this spot, fetching it once if
 * not. Resolves to the record, or null if the archive isn't answering (in
 * which case the model carries on, and we don't ask again this page view).
 * Announces a newly learned record with `whattosow:location-updated`, the
 * event every personalised component already listens for.
 */
export function ensureFrostRecord(lat: number, lng: number, now: Date = new Date()): Promise<FrostRecord | null> {
  const existing = getStoredFrostRecord(lat, lng);
  if (existing && isCurrent(existing, now)) return Promise.resolve(existing);

  const key = `${lat},${lng}`;
  if (failed.has(key)) return Promise.resolve(existing);
  const pending = inFlight.get(key);
  if (pending) return pending;

  const request = (async () => {
    try {
      const res = await fetch(buildArchiveUrl(lat, lng, now));
      if (!res.ok) throw new Error(`archive ${res.status}`);
      const data = await res.json();
      const record = deriveFrostRecord(data?.daily?.time ?? [], data?.daily?.temperature_2m_min ?? [], {
        latitude: lat,
        longitude: lng,
        elevation: data?.elevation,
        fetchedAt: now.getTime(),
      });
      if (!record) throw new Error("archive too thin");
      save(record);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("whattosow:location-updated"));
      }
      return record;
    } catch {
      failed.add(key);
      return existing;
    } finally {
      inFlight.delete(key);
    }
  })();
  inFlight.set(key, request);
  return request;
}

/** Test seam. */
export function resetFrostRecords(record: FrostRecord | null = null): void {
  held = record;
  hydrated = record !== null;
  inFlight.clear();
  failed.clear();
}
