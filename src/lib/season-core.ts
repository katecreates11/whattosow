import { crops, type Crop } from "@/data/crops";
import { varietyCounts } from "@/data/variety-counts";

/**
 * Crop-level seasonal status — the heart of "what can I sow / grow / harvest
 * here, now". Deliberately light (crops + a tiny count map, no variety copy) so
 * it can run in the browser and recompute for the visitor's own frost date.
 *
 * Pass a last-frost date (from the visitor's postcode) to personalise; defaults
 * to the UK average (~15 April) for server render / no-JS / unknown location.
 */

export type SowState = "now" | "closing" | "off";

export interface VarietyStatus {
  state: SowState;
  label: string;
  daysLeft: number | null;
  method: string | null;
}

export interface CropEntry {
  crop: Crop;
  status: VarietyStatus;
  varietyCount: number;
  no: number;
}

const MS_WEEK = 7 * 24 * 60 * 60 * 1000;
const MS_DAY = 24 * 60 * 60 * 1000;
const CLOSING_DAYS = 12;

export function ukAverageFrost(now: Date = new Date()): Date {
  return new Date(now.getFullYear(), 3, 15);
}

export function getCropStatus(crop: Crop, lastFrost: Date, now: Date = new Date()): VarietyStatus {
  const year = lastFrost.getFullYear();
  const autumnFrost = new Date(year, 9, 25);
  const hasSuccession = crop.successionWeeks != null;

  type Win = { method: string; daysLeft: number };
  const open: Win[] = [];

  const addSow = (weeks: number, method: string) => {
    const openDate = lastFrost.getTime() + weeks * MS_WEEK;
    const latestByHarvest = autumnFrost.getTime() - crop.harvestWeeks * MS_WEEK;
    const closeDate = hasSuccession ? latestByHarvest : Math.min(openDate + 4 * MS_WEEK, latestByHarvest);
    if (now.getTime() >= openDate && now.getTime() <= closeDate) {
      open.push({ method, daysLeft: Math.ceil((closeDate - now.getTime()) / MS_DAY) });
    }
  };

  if (crop.directSowWeeks !== null) addSow(crop.directSowWeeks, "direct sow");
  if (crop.sowIndoorsWeeks !== null) addSow(crop.sowIndoorsWeeks, "sow indoors");

  if (crop.plantOutWeeks !== null) {
    const center = lastFrost.getTime() + crop.plantOutWeeks * MS_WEEK;
    if (now.getTime() >= center - 3 * MS_WEEK && now.getTime() <= center + 3 * MS_WEEK) {
      open.push({ method: "plant out", daysLeft: Math.ceil((center + 3 * MS_WEEK - now.getTime()) / MS_DAY) });
    }
  }

  if (open.length === 0) return { state: "off", label: "out of season", daysLeft: null, method: null };

  const best = open.reduce((a, b) => (b.daysLeft > a.daysLeft ? b : a));
  const d = best.daysLeft;
  if (d <= CLOSING_DAYS)
    return { state: "closing", label: `closing · ${d} day${d === 1 ? "" : "s"} left`, daysLeft: d, method: best.method };
  if (d <= 30) return { state: "now", label: `${best.method} now · ${d} days left`, daysLeft: d, method: best.method };
  return { state: "now", label: `${best.method} now`, daysLeft: d, method: best.method };
}

function entry(crop: Crop, status: VarietyStatus, i: number): CropEntry {
  return { crop, status, varietyCount: varietyCounts[crop.slug] ?? 0, no: i + 1 };
}

/** Crops you can sow now (direct/indoors), soonest-to-close first. */
export function inSeasonCrops(lastFrost?: Date, now: Date = new Date()): CropEntry[] {
  const frost = lastFrost ?? ukAverageFrost(now);
  return crops
    .map((c, i) => entry(c, getCropStatus(c, frost, now), i))
    .filter((e) => e.status.state !== "off")
    .sort((a, b) => {
      const ca = a.status.state === "closing" ? 0 : 1;
      const cb = b.status.state === "closing" ? 0 : 1;
      if (ca !== cb) return ca - cb;
      return (a.status.daysLeft ?? 9999) - (b.status.daysLeft ?? 9999);
    });
}

/** Crops whose plant-out window is open now. */
export function plantOutCrops(lastFrost?: Date, now: Date = new Date()): CropEntry[] {
  const frost = lastFrost ?? ukAverageFrost(now);
  const out: CropEntry[] = [];
  crops.forEach((crop, i) => {
    if (crop.plantOutWeeks == null) return;
    const center = frost.getTime() + crop.plantOutWeeks * MS_WEEK;
    if (now.getTime() >= center - 3 * MS_WEEK && now.getTime() <= center + 3 * MS_WEEK) {
      const daysLeft = Math.ceil((center + 3 * MS_WEEK - now.getTime()) / MS_DAY);
      const state: SowState = daysLeft <= CLOSING_DAYS ? "closing" : "now";
      out.push(
        entry(
          crop,
          {
            state,
            label: state === "closing" ? `last chance · ${daysLeft}d` : "ready to plant out",
            daysLeft,
            method: "plant out",
          },
          i
        )
      );
    }
  });
  return out.sort((a, b) => (a.status.daysLeft ?? 9999) - (b.status.daysLeft ?? 9999));
}

/** Crops likely ready to harvest now — estimated from typical earliest sow + grow time. */
export function harvestCrops(lastFrost?: Date, now: Date = new Date()): CropEntry[] {
  const frost = lastFrost ?? ukAverageFrost(now);
  const out: CropEntry[] = [];
  crops.forEach((crop, i) => {
    const sowWeeks = [crop.directSowWeeks, crop.sowIndoorsWeeks].filter((w): w is number => w != null);
    if (sowWeeks.length === 0) return;
    const typicalSow = frost.getTime() + Math.min(...sowWeeks) * MS_WEEK;
    const harvestStart = typicalSow + crop.harvestWeeks * MS_WEEK;
    const harvestEnd = harvestStart + (crop.successionWeeks != null ? 10 : 6) * MS_WEEK;
    if (now.getTime() >= harvestStart && now.getTime() <= harvestEnd) {
      out.push(entry(crop, { state: "now", label: "ready to harvest", daysLeft: null, method: "harvest" }, i));
    }
  });
  return out.sort((a, b) => a.crop.name.localeCompare(b.crop.name));
}

export function seasonCounts(lastFrost?: Date, now: Date = new Date()) {
  const all = crops.map((c) => getCropStatus(c, lastFrost ?? ukAverageFrost(now), now));
  return {
    total: 181,
    inSeason: all.filter((s) => s.state !== "off").length,
    closing: all.filter((s) => s.state === "closing").length,
  };
}
