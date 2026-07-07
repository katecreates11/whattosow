import { crops, type Crop } from "@/data/crops";
import { varieties, type Variety, type Rarity, type SeedSupplier } from "@/data/varieties";
import { getCropStatus, ukAverageFrost, type VarietyStatus } from "@/lib/season-core";
import { getVarietyPhoto, type VarietyPhoto } from "@/lib/variety-photos";
import { getCropPhoto } from "@/lib/crop-photos";

// Crop-level engine (light, client-safe) lives in season-core. Re-exported here
// so existing server imports keep working.
export * from "@/lib/season-core";

// ---- Variety-level (needs the full varieties.ts — server only) ----

const cropBySlug = new Map(crops.map((c) => [c.slug, c]));

export function getVarietyStatus(v: Variety, lastFrost?: Date, now: Date = new Date()): VarietyStatus {
  const crop = cropBySlug.get(v.cropSlug);
  if (!crop) return { state: "off", label: "waiting for its next sowing window", daysLeft: null, method: null };
  return getCropStatus(crop, lastFrost ?? ukAverageFrost(now), now);
}

/**
 * A supplier link is "direct" when it lands on an actual product page rather
 * than dumping the visitor on a search-results page. We treat anything with a
 * `?q=`/`&q=` query or a `/search` path as a search link — those are the ones
 * that erode trust, so they never qualify a variety to be featured.
 */
export function isDirectSeedLink(url: string): boolean {
  if (!url) return false;
  if (/[?&]q=/.test(url)) return false;
  if (/\/search(\/|\?|$)/.test(url)) return false;
  return true;
}

/** The first supplier we can link directly to the seeds of, or null. */
export function directSupplier(v: Variety): SeedSupplier | null {
  return v.seedSuppliers?.find((s) => isDirectSeedLink(s.url)) ?? null;
}

/**
 * A real, verified photo for the variety: a variety-specific shot if we hold
 * one, otherwise the crop-level allotment photo. Never a stock/Unsplash image.
 */
export function resolveVarietyPhoto(v: Variety): VarietyPhoto | null {
  const own = getVarietyPhoto(v.id);
  if (own) return own;
  const cropPhoto = getCropPhoto(v.cropSlug);
  if (cropPhoto) return { src: cropPhoto.hero, alt: cropPhoto.alt };
  return null;
}

export interface VarietyEntry {
  variety: Variety;
  crop: Crop;
  status: VarietyStatus;
  no: number;
  /** First direct-to-product supplier, or null if we can only search for it. */
  supplier: SeedSupplier | null;
  /** Verified real photo (variety-specific, else crop-level), or null. */
  photo: VarietyPhoto | null;
}

export function allEntries(lastFrost?: Date, now: Date = new Date()): VarietyEntry[] {
  const frost = lastFrost ?? ukAverageFrost(now);
  return varieties.map((variety, i) => ({
    variety,
    crop: cropBySlug.get(variety.cropSlug)!,
    status: getVarietyStatus(variety, frost, now),
    no: i + 1,
    supplier: directSupplier(variety),
    photo: resolveVarietyPhoto(variety),
  }));
}

const rarityRank: Record<Rarity, number> = { legendary: 0, rare: 1, uncommon: 2, common: 3 };

export function inSeasonEntries(lastFrost?: Date, now: Date = new Date()): VarietyEntry[] {
  return allEntries(lastFrost, now)
    .filter((e) => e.status.state !== "off")
    .sort((a, b) => {
      const ca = a.status.state === "closing" ? 0 : 1;
      const cb = b.status.state === "closing" ? 0 : 1;
      if (ca !== cb) return ca - cb;
      const r = rarityRank[a.variety.rarity] - rarityRank[b.variety.rarity];
      if (r !== 0) return r;
      return (a.status.daysLeft ?? 9999) - (b.status.daysLeft ?? 9999);
    });
}

/** ISO-8601 week number (1–53). Used to rotate the weekly feature. */
function isoWeek(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (date.getUTCDay() + 6) % 7; // Mon=0 … Sun=6
  date.setUTCDate(date.getUTCDate() - dayNum + 3); // nearest Thursday
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  const firstDayNum = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNum + 3);
  return 1 + Math.round((date.getTime() - firstThursday.getTime()) / (7 * 24 * 3600 * 1000));
}

/** True only when we can both link directly to the seeds and show a real photo. */
export function isFeaturable(e: VarietyEntry): boolean {
  return e.supplier != null && e.photo != null;
}

export function featuredEntry(lastFrost?: Date, now: Date = new Date()): VarietyEntry | null {
  const season = inSeasonEntries(lastFrost, now).filter(isFeaturable);
  if (!season.length) return null;
  // Rotate weekly: a different in-season variety leads each week (stable within
  // the week, same for every visitor). inSeasonEntries is already ranked by
  // urgency/rarity, so week 0 still surfaces the soonest-closing pick.
  return season[isoWeek(now) % season.length];
}
