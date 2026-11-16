import type { Crop } from "@/data/crops";

export const MS_WEEK = 7 * 24 * 60 * 60 * 1000;
export const MS_DAY = 24 * 60 * 60 * 1000;

export type CropWindowAction = "sow indoors" | "direct sow" | "plant out";
export type PlantOutPhase = "main" | "late";

export interface CropWindow {
  crop: Crop;
  action: CropWindowAction;
  openAt: Date;
  closeAt: Date;
  isSowing: boolean;
  plantOutPhase?: PlantOutPhase;
}

export const PLANT_OUT_LEAD_WEEKS = 3;
export const MAIN_PLANT_OUT_TAIL_WEEKS = 6;
export const LATE_PLANT_OUT_TAIL_WEEKS = 12;
const DEFAULT_SOW_WINDOW_WEEKS = 4;

export function ukAverageFrost(now: Date = new Date()): Date {
  return new Date(now.getFullYear(), 3, 15);
}

/**
 * Move a date by whole calendar days, keeping its wall-clock time.
 *
 * Adding milliseconds instead slips an hour whenever the span crosses a clock
 * change, and an hour before midnight is the day before: the server (UTC) said
 * "sow carrots from 25 March" and a UK browser said "24 March" for the same
 * window, so the page changed its mind as it loaded.
 */
export function addDays(date: Date, days: number): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + Math.round(days),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
}

export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

export function daysBetween(from: Date, to: Date): number {
  return Math.ceil((to.getTime() - from.getTime()) / MS_DAY);
}

/** The UK-average garden: last frost 15 April, first autumn frost from 25 October. */
const UK_AVERAGE_AUTUMN = { month: 9, day: 25 } as const;
/** Days from 25 October back round to the following 15 April's frost, less the leap day. */
const AUTUMN_TO_NEXT_SPRING_DAYS = 172;
/** However short the season, a frost-tender sowing keeps at least this much of its window. */
const MIN_SOW_WINDOW_WEEKS = 2;
/** ...and a frost-tender plant-out stays open at least this long past its ideal date. */
const MIN_PLANT_OUT_TAIL_WEEKS = 3;
/** A sowing more than this many weeks before the last frost happens the autumn before. */
const AUTUMN_SOWN_BEFORE_WEEKS = -20;

/**
 * When the first autumn frost can come, for a garden with this last spring
 * frost date.
 *
 * The UK-average garden keeps the long-standing 25 October. Everywhere else
 * moves with its spring: the frost model's two slopes (spring +6 days per
 * degree north, autumn -5) mean a garden whose spring frost runs six days late
 * loses about five days of autumn as well. That holds for a hill as much as a
 * latitude, so once a gardener's own frost record has moved their spring date,
 * their autumn follows.
 */
export function autumnFrostFor(frostDate: Date): Date {
  const year = frostDate.getFullYear();
  const daysLaterThanAverage = Math.round(
    (frostDate.getTime() - new Date(year, 3, 15).getTime()) / MS_DAY
  );
  return new Date(
    year,
    UK_AVERAGE_AUTUMN.month,
    UK_AVERAGE_AUTUMN.day - Math.round((daysLaterThanAverage * 5) / 6),
    frostDate.getHours()
  );
}

/** A sowing offset as weeks from the frost date once any autumn anchoring is applied (may be fractional). */
export function effectiveSowWeeks(offsetWeeks: number, frostDate: Date): number {
  if (!isAutumnSown(offsetWeeks)) return offsetWeeks;
  return (sowingOpenAt(offsetWeeks, frostDate).getTime() - frostDate.getTime()) / MS_WEEK;
}

/** True for a sowing that goes in the autumn before the frost date it is measured from (garlic). */
export function isAutumnSown(offsetWeeks: number): boolean {
  return offsetWeeks <= AUTUMN_SOWN_BEFORE_WEEKS;
}

/**
 * The date a sowing opens.
 *
 * Spring and summer sowings are counted from the last spring frost, as ever.
 * A sowing made the autumn BEFORE is different: counted from the spring frost
 * it runs backwards — a cold garden with a late spring was told to plant
 * garlic later than Cornwall, when it needs to go in sooner, ahead of the
 * cold. So autumn sowings are counted from the autumn frost that precedes
 * them. For the UK-average garden the date comes out the same as before.
 */
export function sowingOpenAt(offsetWeeks: number, frostDate: Date): Date {
  if (!isAutumnSown(offsetWeeks)) return addWeeks(frostDate, offsetWeeks);
  const springBefore = new Date(frostDate.getFullYear() - 1, frostDate.getMonth(), frostDate.getDate());
  const autumn = autumnFrostFor(springBefore);
  const days = offsetWeeks * 7 + AUTUMN_TO_NEXT_SPRING_DAYS;
  return new Date(autumn.getFullYear(), autumn.getMonth(), autumn.getDate() + days);
}

/**
 * The frost a late sowing has to beat. Hardy crops shrug off the first frosts
 * and stand into winter, so they keep the UK-wide 25 October as their marker —
 * tying peas and beetroot to a cold garden's own first frost emptied
 * Aberdeen's June list, which is wrong. Tender and half-hardy crops are
 * finished by frost, so they answer to the garden's own.
 */
export function frostToBeat(crop: Crop, frostDate: Date): Date {
  return crop.category === "hardy"
    ? new Date(frostDate.getFullYear(), UK_AVERAGE_AUTUMN.month, UK_AVERAGE_AUTUMN.day)
    : autumnFrostFor(frostDate);
}

export function sowingCloseAt(crop: Crop, openAt: Date, frostDate: Date): Date {
  const autumnFrost = frostToBeat(crop, frostDate);
  const latestByHarvest = addWeeks(autumnFrost, -crop.harvestWeeks);
  const normalClose = crop.successionWeeks != null
    ? latestByHarvest
    : addWeeks(openAt, crop.sowWindowWeeks ?? DEFAULT_SOW_WINDOW_WEEKS);

  const close = Math.min(normalClose.getTime(), latestByHarvest.getTime());
  if (crop.category === "hardy") return new Date(close);

  // A short season squeezes a long crop, but it must never squeeze it out: in
  // a cold garden pumpkins are still sown at the usual moment, just with no
  // slack. Keep at least a fortnight of the normal window open.
  const floor = Math.min(normalClose.getTime(), addWeeks(openAt, MIN_SOW_WINDOW_WEEKS).getTime());
  return new Date(Math.max(close, floor));
}

/**
 * When the plant-out window shuts. It runs twelve weeks past the ideal date —
 * and for the UK-average garden that is all there is to it. But a frost-tender
 * plant needs a run at the season, and a cold garden's season ends sooner. So
 * every garden gets the same run-up to its own first frost that the average
 * garden gets at the end of those twelve weeks, and no less. (This is what
 * stops "plant out peppers" appearing in Aberdeen on the last day of August,
 * three weeks before its first frost.) Always at least three weeks
 * past the ideal date; hardy crops are untouched.
 */
export function plantOutCloseAt(crop: Crop, idealPlantOut: Date, frostDate: Date): Date {
  const tail = addWeeks(idealPlantOut, LATE_PLANT_OUT_TAIL_WEEKS);
  if (crop.category === "hardy" || crop.plantOutWeeks === null) return tail;

  const year = frostDate.getFullYear();
  const averageTail = addWeeks(new Date(year, 3, 15), crop.plantOutWeeks + LATE_PLANT_OUT_TAIL_WEEKS);
  const averageRunUpDays = Math.round(
    (new Date(year, UK_AVERAGE_AUTUMN.month, UK_AVERAGE_AUTUMN.day).getTime() - averageTail.getTime()) / MS_DAY
  );
  const lastUseful = addDays(autumnFrostFor(frostDate), -averageRunUpDays).getTime();
  const floor = addWeeks(idealPlantOut, MIN_PLANT_OUT_TAIL_WEEKS).getTime();
  return new Date(Math.max(floor, Math.min(tail.getTime(), lastUseful)));
}

export function windowsForCropYear(crop: Crop, frostDate: Date): CropWindow[] {
  const windows: CropWindow[] = [];

  if (crop.sowIndoorsWeeks !== null) {
    const openAt = sowingOpenAt(crop.sowIndoorsWeeks, frostDate);
    windows.push({
      crop,
      action: "sow indoors",
      openAt,
      closeAt: sowingCloseAt(crop, openAt, frostDate),
      isSowing: true,
    });
  }

  if (crop.directSowWeeks !== null) {
    const openAt = sowingOpenAt(crop.directSowWeeks, frostDate);
    windows.push({
      crop,
      action: "direct sow",
      openAt,
      closeAt: sowingCloseAt(crop, openAt, frostDate),
      isSowing: true,
    });
  }

  if (crop.autumnSow) {
    // A second, overwintering sowing (broad beans in October–November).
    const openAt = sowingOpenAt(crop.autumnSow.weeks, frostDate);
    windows.push({
      crop,
      action: "direct sow",
      openAt,
      closeAt: addWeeks(openAt, crop.autumnSow.windowWeeks),
      isSowing: true,
    });
  }

  if (crop.plantOutWeeks !== null) {
    const idealPlantOut = addWeeks(frostDate, crop.plantOutWeeks);
    windows.push({
      crop,
      action: "plant out",
      openAt: addWeeks(idealPlantOut, -PLANT_OUT_LEAD_WEEKS),
      closeAt: plantOutCloseAt(crop, idealPlantOut, frostDate),
      isSowing: false,
      plantOutPhase: "late",
    });
  }

  return windows.sort((a, b) => a.openAt.getTime() - b.openAt.getTime());
}

export function cropWindows(crop: Crop, now: Date = new Date(), frostDate = ukAverageFrost(now)): CropWindow[] {
  const nextYearFrost = new Date(frostDate.getFullYear() + 1, frostDate.getMonth(), frostDate.getDate());
  return [...windowsForCropYear(crop, frostDate), ...windowsForCropYear(crop, nextYearFrost)]
    .map((window) => {
      if (window.action !== "plant out") return window;
      const mainCloseAt = addWeeks(addWeeks(new Date(window.openAt.getTime()), PLANT_OUT_LEAD_WEEKS), MAIN_PLANT_OUT_TAIL_WEEKS);
      return {
        ...window,
        plantOutPhase: now > mainCloseAt ? "late" as PlantOutPhase : "main" as PlantOutPhase,
      };
    })
    .sort((a, b) => a.openAt.getTime() - b.openAt.getTime());
}

export function hasActiveSowingWindow(crop: Crop, now: Date = new Date(), frostDate = ukAverageFrost(now)): boolean {
  return cropWindows(crop, now, frostDate).some(
    (window) => window.isSowing && now >= window.openAt && now <= window.closeAt
  );
}
