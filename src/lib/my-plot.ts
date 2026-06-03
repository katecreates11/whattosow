import { crops, type Crop } from "@/data/crops";

/**
 * "My plot" — the grower's own plantings, held in localStorage. They tell us a
 * crop, the date it went in, and how (direct sow / indoors / plant out); we work
 * out when it'll be ready. No account, no server — just this device.
 */

export type PlantMethod = "direct sow" | "sow indoors" | "plant out";

export interface Planting {
  id: string;
  cropSlug: string;
  sownOn: string; // yyyy-mm-dd
  method: PlantMethod;
  /** Optional actual plant-out date — refines the harvest estimate if it differs from predicted. */
  plantedOutOn?: string; // yyyy-mm-dd
}

/** Days from sowing to the predicted plant-out, for crops started under cover. */
export function sowToPlantOutDays(crop: Crop): number | null {
  if (crop.plantOutWeeks == null || crop.sowIndoorsWeeks == null) return null;
  return (crop.plantOutWeeks - crop.sowIndoorsWeeks) * 7;
}

const KEY = "whattosow:plot";
const EVENT = "whattosow:plot-updated";
const MS_DAY = 86400000;

const cropBySlug = new Map(crops.map((c) => [c.slug, c]));

export function loadPlot(): Planting[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((p) => p && p.cropSlug && p.sownOn) : [];
  } catch {
    return [];
  }
}

function save(list: Planting[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVENT));
}

export function addPlanting(p: Omit<Planting, "id">): Planting {
  const planting: Planting = { ...p, id: `${p.cropSlug}-${Date.now()}` };
  save([...loadPlot(), planting]);
  return planting;
}

export function removePlanting(id: string) {
  save(loadPlot().filter((p) => p.id !== id));
}

export function updatePlanting(id: string, patch: Partial<Omit<Planting, "id">>) {
  save(loadPlot().map((p) => (p.id === id ? { ...p, ...patch } : p)));
}

/** The most recent planting of a given crop, if any. */
export function trackedCrop(cropSlug: string): Planting | undefined {
  return loadPlot()
    .filter((p) => p.cropSlug === cropSlug)
    .sort((a, b) => (a.sownOn < b.sownOn ? 1 : -1))[0];
}

export const PLOT_EVENT = EVENT;

// ---- derived status ----

export type Stage = "sown" | "growing" | "ready";

export interface PlantingStatus {
  planting: Planting;
  crop: Crop;
  harvestDate: Date;
  daysToHarvest: number;
  stage: Stage;
  label: string;
}

function fmt(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

export function plantingStatus(p: Planting, now: Date = new Date()): PlantingStatus | null {
  const crop = cropBySlug.get(p.cropSlug);
  if (!crop) return null;
  const sown = new Date(p.sownOn + "T00:00:00");
  // If the grower recorded an actual plant-out date, shift the harvest by how far
  // it differs from the predicted plant-out (a late plant-out → a later harvest).
  let plantOutDeltaDays = 0;
  const gap = sowToPlantOutDays(crop);
  if (p.plantedOutOn && gap != null) {
    const predictedPlantOut = sown.getTime() + gap * MS_DAY;
    const actualPlantOut = new Date(p.plantedOutOn + "T00:00:00").getTime();
    plantOutDeltaDays = Math.round((actualPlantOut - predictedPlantOut) / MS_DAY);
  }
  const harvestDate = new Date(sown.getTime() + (crop.harvestWeeks * 7 + plantOutDeltaDays) * MS_DAY);
  const daysToHarvest = Math.ceil((harvestDate.getTime() - now.getTime()) / MS_DAY);
  const daysSinceSown = Math.floor((now.getTime() - sown.getTime()) / MS_DAY);

  let stage: Stage;
  let label: string;
  if (daysToHarvest <= 0) {
    stage = "ready";
    label = "Ready to harvest now";
  } else if (daysSinceSown < 14) {
    stage = "sown";
    label = `Just in — ready around ${fmt(harvestDate)}`;
  } else {
    stage = "growing";
    label = `Growing — ready around ${fmt(harvestDate)} (${daysToHarvest} days)`;
  }
  return { planting: p, crop, harvestDate, daysToHarvest, stage, label };
}

export function plotStatuses(now: Date = new Date()): PlantingStatus[] {
  return loadPlot()
    .map((p) => plantingStatus(p, now))
    .filter((s): s is PlantingStatus => s !== null)
    .sort((a, b) => a.daysToHarvest - b.daysToHarvest);
}
