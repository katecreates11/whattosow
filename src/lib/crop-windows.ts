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

export function addWeeks(date: Date, weeks: number): Date {
  return new Date(date.getTime() + weeks * MS_WEEK);
}

export function daysBetween(from: Date, to: Date): number {
  return Math.ceil((to.getTime() - from.getTime()) / MS_DAY);
}

export function sowingCloseAt(crop: Crop, openAt: Date, frostDate: Date): Date {
  const autumnFrost = new Date(frostDate.getFullYear(), 9, 25);
  const latestByHarvest = new Date(autumnFrost.getTime() - crop.harvestWeeks * MS_WEEK);
  const normalClose = crop.successionWeeks != null
    ? latestByHarvest
    : addWeeks(openAt, crop.sowWindowWeeks ?? DEFAULT_SOW_WINDOW_WEEKS);

  return new Date(Math.min(normalClose.getTime(), latestByHarvest.getTime()));
}

export function windowsForCropYear(crop: Crop, frostDate: Date): CropWindow[] {
  const windows: CropWindow[] = [];

  if (crop.sowIndoorsWeeks !== null) {
    const openAt = addWeeks(frostDate, crop.sowIndoorsWeeks);
    windows.push({
      crop,
      action: "sow indoors",
      openAt,
      closeAt: sowingCloseAt(crop, openAt, frostDate),
      isSowing: true,
    });
  }

  if (crop.directSowWeeks !== null) {
    const openAt = addWeeks(frostDate, crop.directSowWeeks);
    windows.push({
      crop,
      action: "direct sow",
      openAt,
      closeAt: sowingCloseAt(crop, openAt, frostDate),
      isSowing: true,
    });
  }

  if (crop.plantOutWeeks !== null) {
    const idealPlantOut = addWeeks(frostDate, crop.plantOutWeeks);
    windows.push({
      crop,
      action: "plant out",
      openAt: addWeeks(idealPlantOut, -PLANT_OUT_LEAD_WEEKS),
      closeAt: addWeeks(idealPlantOut, LATE_PLANT_OUT_TAIL_WEEKS),
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
