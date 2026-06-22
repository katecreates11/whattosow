import { getSunTimes, type SunTimesData } from "@/lib/astronomy";

/**
 * Midsummer / the longest day.
 *
 * The summer solstice falls on 20–22 June depending on the year, but the UK's
 * longest *calendar* day — the one a grower notices — is reliably ~21 June, so
 * that's what we anchor the "longest day" moment to. Everything personalises by
 * latitude, because the far north gets hours more midsummer light than the
 * south-west, and that contrast is half the charm.
 */

/** This year's longest day (local time). */
export function summerSolstice(year: number = new Date().getFullYear()): Date {
  return new Date(year, 5, 21); // 21 June
}

/**
 * True in the week around the solstice — when the homepage band appears. Kept a
 * touch generous (17–25 June) so the moment lands either side of the day itself.
 */
export function isMidsummerWindow(now: Date = new Date()): boolean {
  const y = now.getFullYear();
  const start = new Date(y, 5, 15, 0, 0, 0); // 15 Jun — the run-up
  const end = new Date(y, 5, 26, 0, 0, 0); // through 25 Jun
  return now >= start && now < end;
}

/** This year's shortest day (winter solstice, ~21 December). */
export function winterSolstice(year: number = new Date().getFullYear()): Date {
  return new Date(year, 11, 21);
}

/** Sun times on the longest day at a location. */
export function solsticeSunTimes(lat: number, lng: number, year?: number): SunTimesData {
  return getSunTimes(summerSolstice(year), lat, lng);
}

/** Longest-day daylight length, in minutes, at a location. */
export function longestDayMinutes(lat: number, lng: number, year?: number): number {
  return solsticeSunTimes(lat, lng, year).daylightMinutes;
}

/** Shortest-day daylight length, in minutes, at a location. */
export function shortestDayMinutes(lat: number, lng: number, year?: number): number {
  return getSunTimes(winterSolstice(year), lat, lng).daylightMinutes;
}
