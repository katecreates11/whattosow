import { crops, type Crop } from "@/data/crops";
import { varietyCounts } from "@/data/variety-counts";
import {
  cropWindows,
  daysBetween,
  hasActiveSowingWindow,
  MS_WEEK,
  ukAverageFrost,
} from "@/lib/crop-windows";

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

const CLOSING_DAYS = 12;

export { ukAverageFrost } from "@/lib/crop-windows";

export function getCropStatus(crop: Crop, lastFrost: Date, now: Date = new Date()): VarietyStatus {
  const open = cropWindows(crop, now, lastFrost)
    .filter((window) => now >= window.openAt && now <= window.closeAt)
    .map((window) => ({
      method: window.action,
      daysLeft: daysBetween(now, window.closeAt),
    }));

  if (open.length === 0) return { state: "off", label: "waiting for its next sowing window", daysLeft: null, method: null };

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

/** Crops whose shared plant-out window is open now. */
export function plantOutCrops(lastFrost?: Date, now: Date = new Date()): CropEntry[] {
  const frost = lastFrost ?? ukAverageFrost(now);
  const out: CropEntry[] = [];
  crops.forEach((crop, i) => {
    const window = cropWindows(crop, now, frost).find(
      (entry) => entry.action === "plant out" && now >= entry.openAt && now <= entry.closeAt
    );
    if (!window) return;
    const daysLeft = daysBetween(now, window.closeAt);
    const state: SowState = daysLeft <= CLOSING_DAYS ? "closing" : "now";
    const activelySowable = hasActiveSowingWindow(crop, now, frost);
    const label = crop.slug === "pumpkins" && window.plantOutPhase === "late"
      ? "a gamble now"
      : window.plantOutPhase === "late" && !activelySowable
        ? "late plant out"
        : activelySowable
          ? "plant out now"
          : "ready to plant out";
    out.push(
      entry(
        crop,
        {
          state,
          label: state === "closing" ? `last chance · ${daysLeft}d` : label,
          daysLeft,
          method: "plant out",
        },
        i
      )
    );
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
