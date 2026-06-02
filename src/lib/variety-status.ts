import { crops, type Crop } from "@/data/crops";
import { varieties, type Variety, type Rarity } from "@/data/varieties";
import { getCropStatus, ukAverageFrost, type VarietyStatus } from "@/lib/season-core";

// Crop-level engine (light, client-safe) lives in season-core. Re-exported here
// so existing server imports keep working.
export * from "@/lib/season-core";

// ---- Variety-level (needs the full varieties.ts — server only) ----

const cropBySlug = new Map(crops.map((c) => [c.slug, c]));

export function getVarietyStatus(v: Variety, lastFrost?: Date, now: Date = new Date()): VarietyStatus {
  const crop = cropBySlug.get(v.cropSlug);
  if (!crop) return { state: "off", label: "out of season", daysLeft: null, method: null };
  return getCropStatus(crop, lastFrost ?? ukAverageFrost(now), now);
}

export interface VarietyEntry {
  variety: Variety;
  crop: Crop;
  status: VarietyStatus;
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

export function featuredEntry(lastFrost?: Date, now: Date = new Date()): VarietyEntry | null {
  const season = inSeasonEntries(lastFrost, now);
  return season.length ? season[0] : null;
}
