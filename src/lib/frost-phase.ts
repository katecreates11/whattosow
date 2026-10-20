/**
 * Where we are in the frost year, so copy can face the right frost.
 *
 * - spring: the last frost is still to come (January until it passes)
 * - summer: frost-free and the autumn frost is more than six weeks off
 * - autumn: the first autumn frost is within six weeks
 * - winter: the first autumn frost has been and gone (until New Year)
 *
 * Works from the visitor's own frost dates, or the UK average when we
 * don't know where they are. Self-adjusts every year — no hardcoded dates.
 */
export type FrostPhase = "spring" | "summer" | "autumn" | "winter";

const MS_DAY = 24 * 60 * 60 * 1000;
export const AUTUMN_LEAD_DAYS = 42;

export function frostPhase(lastFrost: Date, firstAutumnFrost: Date, now: Date = new Date()): FrostPhase {
  // Checked first: once the autumn frost has passed, calculateFrostData rolls
  // lastFrost on to next spring, so "before the last frost" would misfire.
  if (now > firstAutumnFrost) return "winter";
  if (now < lastFrost) return "spring";
  const daysToAutumnFrost = (firstAutumnFrost.getTime() - now.getTime()) / MS_DAY;
  return daysToAutumnFrost <= AUTUMN_LEAD_DAYS ? "autumn" : "summer";
}

/** UK-average first autumn frost: ~25 October, the baseline used across the site. */
export function ukAverageAutumnFrost(now: Date = new Date()): Date {
  return new Date(now.getFullYear(), 9, 25);
}

/** UK-average phase for server render / no postcode. Last frost ~15 April. */
export function ukAverageFrostPhase(now: Date = new Date()): FrostPhase {
  return frostPhase(new Date(now.getFullYear(), 3, 15), ukAverageAutumnFrost(now), now);
}
