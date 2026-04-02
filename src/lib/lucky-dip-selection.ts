import { crops, type Crop } from "@/data/crops";
import { varieties, type Variety } from "@/data/varieties";
import { isSowableNow, daysLeftToSow } from "@/lib/sowable";
import type { WeatherBonus } from "@/lib/weather-bonus";

export interface SelectedVariety {
  variety: Variety;
  crop: Crop;
  displayRarity: Variety["rarity"];
  seasonalBadge: string | null;
  daysLeft: number | null;
}

const RARITY_WEIGHTS: Record<Variety["rarity"], number> = {
  common: 50,
  uncommon: 30,
  rare: 15,
  legendary: 5,
};

const RARITY_ORDER: Variety["rarity"][] = ["common", "uncommon", "rare", "legendary"];

// Crops that have a hero photo available (client-safe, no fs access)
const CROPS_WITH_PHOTOS = new Set([
  "tomatoes", "strawberries", "peas", "courgettes", "carrots",
  "sweetcorn", "pumpkins", "lettuce", "runner-beans", "squash",
]);

function bumpRarity(rarity: Variety["rarity"]): Variety["rarity"] {
  const idx = RARITY_ORDER.indexOf(rarity);
  return idx < RARITY_ORDER.length - 1 ? RARITY_ORDER[idx + 1] : rarity;
}

export function selectVariety(
  lastVarietyId: string | null,
  weatherBonus: WeatherBonus,
  isFirstDiscovery: boolean
): SelectedVariety | null {
  // Find all sowable crops
  const sowableSlugs = new Set(crops.filter(isSowableNow).map((c) => c.slug));
  if (sowableSlugs.size === 0) return null;

  // Filter varieties to sowable ones
  let pool = varieties.filter((v) => sowableSlugs.has(v.cropSlug));
  if (pool.length === 0) return null;

  // Remove last picked (no repeats)
  if (lastVarietyId) {
    const filtered = pool.filter((v) => v.id !== lastVarietyId);
    if (filtered.length > 0) pool = filtered;
  }

  // First discovery: filter to uncommon or better (beginner's luck)
  if (isFirstDiscovery) {
    const betterPool = pool.filter((v) => v.rarity !== "common");
    if (betterPool.length > 0) pool = betterPool;
  }

  // Build weighted selection
  const weighted: { variety: Variety; weight: number }[] = pool.map((v) => {
    let weight = RARITY_WEIGHTS[v.rarity];

    // Weather bonus: 2x for matching crop slugs
    if (weatherBonus.boostedSlugs.includes(v.cropSlug)) {
      weight *= 2;
    }

    // Photo boost: 2x if crop has a hero photo
    if (CROPS_WITH_PHOTOS.has(v.cropSlug)) {
      weight *= 2;
    }

    return { variety: v, weight };
  });

  // Weighted random pick
  const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
  let random = Math.random() * totalWeight;
  let picked = weighted[0].variety;
  for (const w of weighted) {
    random -= w.weight;
    if (random <= 0) {
      picked = w.variety;
      break;
    }
  }

  // Determine seasonal badges and display rarity
  const crop = crops.find((c) => c.slug === picked.cropSlug)!;
  const days = daysLeftToSow(crop);
  let seasonalBadge: string | null = null;
  let displayRarity = picked.rarity;

  if (days !== null && days <= 14) {
    seasonalBadge = `Last chance — ${days} days left to sow`;
    displayRarity = bumpRarity(picked.rarity);
  }

  return {
    variety: picked,
    crop,
    displayRarity,
    seasonalBadge,
    daysLeft: days,
  };
}
