import { crops, type Crop } from "@/data/crops";

export type SowingAction = "sowIndoors" | "directSow" | "plantOut" | "harvest";

export const MONTH_SLUGS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
] as const;

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export function monthSlugToIndex(slug: string): number | null {
  const i = MONTH_SLUGS.indexOf(slug as (typeof MONTH_SLUGS)[number]);
  return i >= 0 ? i : null;
}

/** Convert frost-relative weeks to a 0-indexed month */
export function frostWeekToMonth(frostWeek: number, frostDate: Date): number {
  const ms = frostDate.getTime() + frostWeek * 7 * 24 * 60 * 60 * 1000;
  return new Date(ms).getMonth();
}

/** Get the action months for a crop relative to a frost date */
export function getCropActionMonths(
  crop: Crop,
  frostDate: Date,
  windowWeeks: number = 3
): { action: SowingAction; months: number[] }[] {
  const results: { action: SowingAction; months: number[] }[] = [];

  const actions: { key: SowingAction; weeks: number | null }[] = [
    { key: "sowIndoors", weeks: crop.sowIndoorsWeeks },
    { key: "directSow", weeks: crop.directSowWeeks },
    { key: "plantOut", weeks: crop.plantOutWeeks },
  ];

  for (const { key, weeks } of actions) {
    if (weeks === null) continue;
    const months = new Set<number>();
    for (let w = weeks; w <= weeks + windowWeeks; w++) {
      months.add(frostWeekToMonth(w, frostDate));
    }
    results.push({ action: key, months: Array.from(months) });
  }

  // Harvest: starts at the earliest sowing action + harvestWeeks
  const sowWeeks = [crop.sowIndoorsWeeks, crop.directSowWeeks, crop.plantOutWeeks]
    .filter((w): w is number => w !== null);
  if (sowWeeks.length > 0) {
    const earliestSow = Math.min(...sowWeeks);
    const harvestStart = earliestSow + crop.harvestWeeks;
    const harvestMonths = new Set<number>();
    for (let w = harvestStart; w <= harvestStart + windowWeeks; w++) {
      harvestMonths.add(frostWeekToMonth(w, frostDate));
    }
    results.push({ action: "harvest", months: Array.from(harvestMonths) });
  }

  return results;
}

/** Get all crops active in a given month, grouped by action */
export function getCropsForMonth(
  month: number,
  frostDate: Date
): {
  sowIndoors: Crop[];
  directSow: Crop[];
  plantOut: Crop[];
} {
  const sowIndoors: Crop[] = [];
  const directSow: Crop[] = [];
  const plantOut: Crop[] = [];

  for (const crop of crops) {
    const actions = getCropActionMonths(crop, frostDate);
    for (const { action, months } of actions) {
      if (!months.includes(month)) continue;
      switch (action) {
        case "sowIndoors": sowIndoors.push(crop); break;
        case "directSow": directSow.push(crop); break;
        case "plantOut": plantOut.push(crop); break;
      }
    }
  }

  return { sowIndoors, directSow, plantOut };
}

/** UK average frost date — April 15 */
export function getAvgFrostDate(year?: number): Date {
  return new Date(year ?? new Date().getFullYear(), 3, 15);
}
