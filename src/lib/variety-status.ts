import { crops, type Crop } from "@/data/crops";
import { varieties, type Variety, type Rarity } from "@/data/varieties";

/**
 * Variety-level, (optionally) location-aware sowing status.
 * Joins each variety to its crop (crops.ts) and computes whether its sowing
 * window is open now, closing soon, or out of season — based on a last-frost date.
 * Defaults to the UK average last frost (~15 April) when no location is known,
 * which keeps the homepage useful server-side / without JS.
 */

const cropBySlug = new Map(crops.map((c) => [c.slug, c]));

export type SowState = "now" | "closing" | "off";

export interface VarietyStatus {
  state: SowState;
  /** short editorial line, e.g. "sow indoors now · 11 days left" / "closing · 4 days left" */
  label: string;
  /** days until the window shuts, when known */
  daysLeft: number | null;
  /** sow indoors / direct sow / plant out */
  method: string | null;
}

const MS_WEEK = 7 * 24 * 60 * 60 * 1000;
const MS_DAY = 24 * 60 * 60 * 1000;
/** how many days left counts as "closing soon" */
const CLOSING_DAYS = 12;

export function ukAverageFrost(now: Date = new Date()): Date {
  return new Date(now.getFullYear(), 3, 15); // 15 April
}

export function getCropStatus(crop: Crop, lastFrost: Date, now: Date = new Date()): VarietyStatus {
  // A sowing is "in season" if its window has opened AND there is still enough
  // time to reach harvest before the autumn frost. This keeps fast/succession
  // crops sowable right through summer (June is peak), and closes slow or tender
  // crops as it gets too late.
  const year = lastFrost.getFullYear();
  const autumnFrost = new Date(year, 9, 25); // ~25 Oct — average UK first autumn frost

  type Win = { method: string; daysLeft: number };
  const open: Win[] = [];

  // Crops you sow once (no successionWeeks) get a short window around their start.
  // Succession crops (lettuce, beans, carrots…) stay sowable through summer, as
  // long as there's time to harvest before autumn.
  const hasSuccession = crop.successionWeeks != null;

  const addSow = (weeks: number, method: string) => {
    const openDate = lastFrost.getTime() + weeks * MS_WEEK;
    const latestByHarvest = autumnFrost.getTime() - crop.harvestWeeks * MS_WEEK;
    const closeDate = hasSuccession ? latestByHarvest : Math.min(openDate + 4 * MS_WEEK, latestByHarvest);
    if (now.getTime() >= openDate && now.getTime() <= closeDate) {
      open.push({ method, daysLeft: Math.ceil((closeDate - now.getTime()) / MS_DAY) });
    }
  };

  // transplant window: time-sensitive, ±3 weeks around the plant-out point.
  const addPlantOut = (weeks: number) => {
    const center = lastFrost.getTime() + weeks * MS_WEEK;
    const start = center - 3 * MS_WEEK;
    const end = center + 3 * MS_WEEK;
    if (now.getTime() >= start && now.getTime() <= end) {
      open.push({ method: "plant out", daysLeft: Math.ceil((end - now.getTime()) / MS_DAY) });
    }
  };

  // direct sow first so it wins ties over indoors in high summer
  if (crop.directSowWeeks !== null) addSow(crop.directSowWeeks, "direct sow");
  if (crop.sowIndoorsWeeks !== null) addSow(crop.sowIndoorsWeeks, "sow indoors");
  if (crop.plantOutWeeks !== null) addPlantOut(crop.plantOutWeeks);

  if (open.length === 0) {
    return { state: "off", label: "out of season", daysLeft: null, method: null };
  }

  // the window with the most room left is the most current / flexible
  const best = open.reduce((a, b) => (b.daysLeft > a.daysLeft ? b : a));
  const d = best.daysLeft;

  if (d <= CLOSING_DAYS) {
    return { state: "closing", label: `closing · ${d} day${d === 1 ? "" : "s"} left`, daysLeft: d, method: best.method };
  }
  if (d <= 30) {
    return { state: "now", label: `${best.method} now · ${d} days left`, daysLeft: d, method: best.method };
  }
  return { state: "now", label: `${best.method} now`, daysLeft: d, method: best.method };
}

export function getVarietyStatus(v: Variety, lastFrost?: Date, now: Date = new Date()): VarietyStatus {
  const crop = cropBySlug.get(v.cropSlug);
  if (!crop) return { state: "off", label: "out of season", daysLeft: null, method: null };
  return getCropStatus(crop, lastFrost ?? ukAverageFrost(now), now);
}

export interface VarietyEntry {
  variety: Variety;
  crop: Crop;
  status: VarietyStatus;
  /** stable 1-based catalogue number */
  no: number;
}

export function allEntries(lastFrost?: Date, now: Date = new Date()): VarietyEntry[] {
  const frost = lastFrost ?? ukAverageFrost(now);
  return varieties.map((variety, i) => ({
    variety,
    crop: cropBySlug.get(variety.cropSlug)!,
    status: getVarietyStatus(variety, frost, now),
    no: i + 1,
  }));
}

const rarityRank: Record<Rarity, number> = { legendary: 0, rare: 1, uncommon: 2, common: 3 };

export function inSeasonEntries(lastFrost?: Date, now: Date = new Date()): VarietyEntry[] {
  return allEntries(lastFrost, now)
    .filter((e) => e.status.state === "now" || e.status.state === "closing")
    .sort((a, b) => {
      const closeA = a.status.state === "closing" ? 0 : 1;
      const closeB = b.status.state === "closing" ? 0 : 1;
      if (closeA !== closeB) return closeA - closeB;
      const r = rarityRank[a.variety.rarity] - rarityRank[b.variety.rarity];
      if (r !== 0) return r;
      return (a.status.daysLeft ?? 9999) - (b.status.daysLeft ?? 9999);
    });
}

export function featuredEntry(lastFrost?: Date, now: Date = new Date()): VarietyEntry | null {
  const season = inSeasonEntries(lastFrost, now);
  return season.length ? season[0] : null;
}

export function seasonCounts(lastFrost?: Date, now: Date = new Date()) {
  const all = allEntries(lastFrost, now);
  return {
    total: all.length,
    inSeason: all.filter((e) => e.status.state !== "off").length,
    closing: all.filter((e) => e.status.state === "closing").length,
  };
}

// ---- Crop-level ("what type of veg to sow now") --------------------------

const varietyCountByCrop = (() => {
  const m = new Map<string, number>();
  for (const v of varieties) m.set(v.cropSlug, (m.get(v.cropSlug) ?? 0) + 1);
  return m;
})();

export interface CropEntry {
  crop: Crop;
  status: VarietyStatus;
  varietyCount: number;
  no: number;
}

/** Crops whose plant-out window is open now (for the Grow page). */
export function plantOutCrops(lastFrost?: Date, now: Date = new Date()): CropEntry[] {
  const frost = lastFrost ?? ukAverageFrost(now);
  const out: CropEntry[] = [];
  crops.forEach((crop, i) => {
    if (crop.plantOutWeeks == null) return;
    const center = frost.getTime() + crop.plantOutWeeks * MS_WEEK;
    const start = center - 3 * MS_WEEK;
    const end = center + 3 * MS_WEEK;
    if (now.getTime() >= start && now.getTime() <= end) {
      const daysLeft = Math.ceil((end - now.getTime()) / MS_DAY);
      const state: SowState = daysLeft <= CLOSING_DAYS ? "closing" : "now";
      out.push({
        crop,
        varietyCount: varietyCountByCrop.get(crop.slug) ?? 0,
        no: i + 1,
        status: {
          state,
          label: state === "closing" ? `last chance · ${daysLeft}d` : "ready to plant out",
          daysLeft,
          method: "plant out",
        },
      });
    }
  });
  return out.sort((a, b) => (a.status.daysLeft ?? 9999) - (b.status.daysLeft ?? 9999));
}

/**
 * Crops likely ready to harvest now (for the Harvest page) — estimated from a
 * typical earliest sowing plus the crop's grow time. Approximate by nature;
 * a grower's own logged plants (in /my-plot) give the exact date.
 */
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
      out.push({
        crop,
        varietyCount: varietyCountByCrop.get(crop.slug) ?? 0,
        no: i + 1,
        status: { state: "now", label: "ready to harvest", daysLeft: null, method: "harvest" },
      });
    }
  });
  return out.sort((a, b) => a.crop.name.localeCompare(b.crop.name));
}

/** Crops you can sow/plant right now, soonest-to-close first. One entry per veg. */
export function inSeasonCrops(lastFrost?: Date, now: Date = new Date()): CropEntry[] {
  const frost = lastFrost ?? ukAverageFrost(now);
  return crops
    .map((crop, i) => ({
      crop,
      status: getCropStatus(crop, frost, now),
      varietyCount: varietyCountByCrop.get(crop.slug) ?? 0,
      no: i + 1,
    }))
    .filter((e) => e.status.state !== "off")
    .sort((a, b) => {
      const closeA = a.status.state === "closing" ? 0 : 1;
      const closeB = b.status.state === "closing" ? 0 : 1;
      if (closeA !== closeB) return closeA - closeB;
      return (a.status.daysLeft ?? 9999) - (b.status.daysLeft ?? 9999);
    });
}
