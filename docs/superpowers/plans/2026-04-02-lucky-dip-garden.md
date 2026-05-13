# Lucky Dip & My Garden — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a gamified seed discovery tool (Lucky Dip) with collectible varieties and a persistent virtual garden, driving engagement and affiliate revenue for whattosow.co.uk.

**Architecture:** Client-side React app within the existing Next.js site. Variety data is static (build-time). Garden state persists in localStorage via a `useGarden()` hook. Weather bonuses use the existing Open-Meteo API. No database, no auth — email capture uses the existing `/api/subscribe` endpoint. Illustrations are placeholder-ready (Kate generates them later with Nano Banana).

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, CSS keyframe animations, localStorage, Open-Meteo API (existing).

**Spec:** `docs/superpowers/specs/2026-04-02-seed-roulette-design.md` (V4)

---

## File Map

### New files to create

| File | Responsibility |
|------|---------------|
| `src/data/varieties.ts` | All variety data: names, rarities, personalities, recipes, affiliate links |
| `src/lib/sowable.ts` | Extracted `isSowableNow` logic — shared between Lucky Dip, CropIndex, still-time |
| `src/lib/garden-storage.ts` | localStorage read/write for garden data, type guards, migration |
| `src/hooks/useGarden.ts` | React hook wrapping garden-storage — provides collection, garden, and settings state |
| `src/lib/lucky-dip-selection.ts` | Selection algorithm: rarity weights, weather bonuses, seasonal scarcity, dedup |
| `src/lib/weather-bonus.ts` | Fetch current weather, determine active bonus, cache with TTL |
| `src/components/GrowingReveal.tsx` | The CSS animation: seed → sprout → bloom with rarity-dependent effects |
| `src/components/GrowingReveal.css` | CSS keyframes for the growing animation (all tiers) |
| `src/components/VarietyCard.tsx` | Result card: variety info, rarity border, personality |
| `src/components/RecipeSection.tsx` | "What you'll be eating" recipe display |
| `src/components/AffiliateButtons.tsx` | "Get the seeds" CTA buttons with Umami tracking |
| `src/components/CollectionGrid.tsx` | Card collection view: grouped by crop, silhouettes, progress |
| `src/components/CardDetail.tsx` | Full card detail overlay: variety, recipes, affiliate, plant button |
| `src/components/GardenGrid.tsx` | Top-down allotment grid: slots, growth stages, harvest |
| `src/components/GardenSlot.tsx` | Individual garden slot: illustration, CSS growth stage, tap interaction |
| `src/components/HarvestLog.tsx` | Harvested crops list with "grow again" affiliate links |
| `src/app/lucky-dip/page.tsx` | Lucky Dip page: hero, animation, result card, selection |
| `src/app/my-garden/page.tsx` | My Garden page: tabs for collection and garden grid |

### Existing files to modify

| File | Change |
|------|--------|
| `src/components/CropIndex.tsx` | Replace inline `isSowableNow` with import from `src/lib/sowable.ts` |
| `src/components/StillTimePage.tsx` | Same — use shared `isSowableNow` |
| `src/components/Header.tsx` | Add "Lucky Dip" and "My Garden" nav links |
| `src/app/page.tsx` | Add Lucky Dip cross-link in guides section |
| `src/app/sitemap.ts` | Add `/lucky-dip` and `/my-garden` entries |

---

## Task 1: Variety Data

**Files:**
- Create: `src/data/varieties.ts`

This is the content backbone. Every variety needs: id, crop link, name, rarity, personality, recipes, affiliate links. Starting with the crops that already have varieties in `src/data/crops.ts` and expanding.

- [ ] **Step 1: Create the variety data file with types and initial data**

```ts
// src/data/varieties.ts

export interface CropRecipe {
  name: string;
  description: string;
}

export interface SeedSupplier {
  name: string;
  url: string;
}

export type Rarity = "common" | "uncommon" | "rare" | "legendary";

export interface Variety {
  id: string;
  cropSlug: string;
  name: string;
  rarity: Rarity;
  personality: string;
  recipes: CropRecipe[];
  seedSuppliers: SeedSupplier[];
}

export const varieties: Variety[] = [
  // === TOMATOES ===
  {
    id: "tomatoes-gardeners-delight",
    cropSlug: "tomatoes",
    name: "Gardener's Delight",
    rarity: "uncommon",
    personality: "The cherry tomato that started a million allotment obsessions. Sweet, reliable, and impossible to stop picking.",
    recipes: [
      {
        name: "Tomato bruschetta",
        description: "Halve a handful, toss with olive oil, torn basil, a pinch of flaky salt. Pile onto toasted sourdough while the tomatoes are still warm from the vine. Lunch sorted.",
      },
      {
        name: "Simple pasta sauce",
        description: "Halve a punnet, slow-roast at 160°C with garlic and thyme until they collapse into a sticky mess. Toss through spaghetti with parmesan. Tastes like you tried harder than you did.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=gardeners+delight+tomato" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=gardeners+delight+tomato" },
    ],
  },
  {
    id: "tomatoes-sungold",
    cropSlug: "tomatoes",
    name: "Sungold",
    rarity: "rare",
    personality: "The one that ruined supermarket tomatoes for everyone. Absurdly sweet, thin-skinned, and you'll eat half of them before they make it indoors.",
    recipes: [
      {
        name: "Sungold pasta",
        description: "Burst a punnet in a hot pan with olive oil and garlic until they pop and release their juice. Toss through linguine with a handful of rocket and a grating of parmesan. Ten minutes, no effort, extraordinary.",
      },
      {
        name: "Straight from the vine",
        description: "No recipe needed. Pick them warm from the plant on a summer evening and eat them standing in the garden. This is why you grow things.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=sungold+tomato" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=sungold+tomato" },
    ],
  },
  // ... (FULL VARIETY DATA WILL BE WRITTEN IN THIS TASK — all 48 crops × 2-4 varieties each)
];

/** Get all varieties for a given crop slug */
export function getVarietiesForCrop(cropSlug: string): Variety[] {
  return varieties.filter((v) => v.cropSlug === cropSlug);
}

/** Get a variety by its ID */
export function getVarietyById(id: string): Variety | undefined {
  return varieties.find((v) => v.id === id);
}

/** Get all unique crop slugs that have varieties */
export function getCropSlugsWithVarieties(): string[] {
  return [...new Set(varieties.map((v) => v.cropSlug))];
}
```

This step involves writing ALL the variety data — personalities, recipes, rarity assignments, affiliate links for every variety across all 48 crops. This is the largest single content task. Target: ~140-160 varieties total.

Rarity targets:
- Common (~50%): ~70-80 varieties
- Uncommon (~30%): ~42-48 varieties
- Rare (~15%): ~21-24 varieties
- Legendary (~5%): ~7-8 varieties (at least one per major crop type)

- [ ] **Step 2: Verify the data compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/data/varieties.ts
git commit -m "feat: add variety data — 140+ varieties with rarity, personality, recipes, affiliate links"
```

---

## Task 2: Extract Shared Sowable Logic

**Files:**
- Create: `src/lib/sowable.ts`
- Modify: `src/components/CropIndex.tsx`
- Modify: `src/components/StillTimePage.tsx`

Extract `isSowableNow` from CropIndex so it can be shared with the Lucky Dip selection logic.

- [ ] **Step 1: Create the shared utility**

```ts
// src/lib/sowable.ts

import { type Crop } from "@/data/crops";

/**
 * Check if a crop is currently sowable based on UK average last frost date (~April 15).
 * Used by: Lucky Dip selection, CropIndex "in season" filter, StillTimePage.
 */
export function isSowableNow(crop: Crop): boolean {
  const now = new Date();
  const year = now.getFullYear();
  const avgLastFrost = new Date(year, 3, 15); // April 15
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksToFrost = (avgLastFrost.getTime() - now.getTime()) / msPerWeek;
  const weeksAfterFrost = -weeksToFrost;
  const window = 3;

  if (crop.sowIndoorsWeeks !== null) {
    const target = -crop.sowIndoorsWeeks;
    const diff = weeksToFrost - target;
    if (diff >= -window && diff <= window) return true;
  }
  if (crop.directSowWeeks !== null) {
    const target = -crop.directSowWeeks;
    const diff = weeksToFrost - target;
    if (diff >= -window && diff <= window) return true;
  }
  if (crop.plantOutWeeks !== null) {
    const diff = weeksAfterFrost - crop.plantOutWeeks;
    if (diff >= -window && diff <= window) return true;
  }
  return false;
}

/**
 * Get the number of days remaining in a crop's sowing window.
 * Returns null if not currently sowable. Used for seasonal scarcity countdown.
 */
export function daysLeftToSow(crop: Crop): number | null {
  const now = new Date();
  const year = now.getFullYear();
  const avgLastFrost = new Date(year, 3, 15);
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const msPerDay = 24 * 60 * 60 * 1000;
  const weeksToFrost = (avgLastFrost.getTime() - now.getTime()) / msPerWeek;
  const weeksAfterFrost = -weeksToFrost;
  const window = 3;

  let minDaysLeft = Infinity;

  if (crop.sowIndoorsWeeks !== null) {
    const target = -crop.sowIndoorsWeeks;
    const diff = weeksToFrost - target;
    if (diff >= -window && diff <= window) {
      const endDate = new Date(avgLastFrost.getTime() - (target - window) * msPerWeek);
      const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / msPerDay);
      if (daysLeft > 0 && daysLeft < minDaysLeft) minDaysLeft = daysLeft;
    }
  }
  if (crop.directSowWeeks !== null) {
    const target = -crop.directSowWeeks;
    const diff = weeksToFrost - target;
    if (diff >= -window && diff <= window) {
      const endDate = new Date(avgLastFrost.getTime() - (target - window) * msPerWeek);
      const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / msPerDay);
      if (daysLeft > 0 && daysLeft < minDaysLeft) minDaysLeft = daysLeft;
    }
  }
  if (crop.plantOutWeeks !== null) {
    const diff = weeksAfterFrost - crop.plantOutWeeks;
    if (diff >= -window && diff <= window) {
      const endDate = new Date(avgLastFrost.getTime() + (crop.plantOutWeeks + window) * msPerWeek);
      const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / msPerDay);
      if (daysLeft > 0 && daysLeft < minDaysLeft) minDaysLeft = daysLeft;
    }
  }

  return minDaysLeft === Infinity ? null : minDaysLeft;
}
```

- [ ] **Step 2: Update CropIndex to use shared utility**

In `src/components/CropIndex.tsx`, remove the inline `isSowableNow` function (lines 8-32) and replace with:

```ts
import { isSowableNow } from "@/lib/sowable";
```

Remove the old function definition. All references to `isSowableNow` in the file remain unchanged.

- [ ] **Step 3: Verify dev server runs and CropIndex still works**

Run: `npm run dev`
Check: `localhost:3000` — the "In season now" filter on the crop index should work identically.

- [ ] **Step 4: Commit**

```bash
git add src/lib/sowable.ts src/components/CropIndex.tsx
git commit -m "refactor: extract isSowableNow to shared utility for reuse"
```

---

## Task 3: Garden Storage Layer

**Files:**
- Create: `src/lib/garden-storage.ts`
- Create: `src/hooks/useGarden.ts`

The persistence layer. Handles localStorage read/write with validation, migration support, and error handling.

- [ ] **Step 1: Create garden-storage.ts**

```ts
// src/lib/garden-storage.ts

export interface CollectedVariety {
  varietyId: string;
  collectedAt: string;
  source: "lucky-dip" | "manual";
}

export interface GardenPlot {
  slotIndex: number;
  varietyId: string;
  sowDate: string | null;
  plantOutDate: string | null;
  expectedHarvest: string;
  harvested: boolean;
  harvestedAt: string | null;
  notes: string;
}

export interface GardenSettings {
  email: string | null;
  gardenName: string;
  totalSlots: number;
}

export interface GardenData {
  version: 1;
  postcode: string | null;
  latitude: number | null;
  longitude: number | null;
  collection: CollectedVariety[];
  plots: GardenPlot[];
  lastVarietyId: string | null;
  settings: GardenSettings;
}

const STORAGE_KEY = "whattosow:garden";

export function createEmptyGarden(): GardenData {
  return {
    version: 1,
    postcode: null,
    latitude: null,
    longitude: null,
    collection: [],
    plots: [],
    lastVarietyId: null,
    settings: {
      email: null,
      gardenName: "My Allotment",
      totalSlots: 12,
    },
  };
}

function isValidGarden(data: unknown): data is GardenData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    d.version === 1 &&
    Array.isArray(d.collection) &&
    Array.isArray(d.plots) &&
    typeof d.settings === "object" &&
    d.settings !== null
  );
}

export function loadGarden(): GardenData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyGarden();
    const parsed = JSON.parse(raw);
    if (!isValidGarden(parsed)) return createEmptyGarden();
    return parsed;
  } catch {
    return createEmptyGarden();
  }
}

export function saveGarden(data: GardenData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable — fail silently
  }
}
```

- [ ] **Step 2: Create useGarden hook**

```ts
// src/hooks/useGarden.ts
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  type GardenData,
  type CollectedVariety,
  type GardenPlot,
  loadGarden,
  saveGarden,
  createEmptyGarden,
} from "@/lib/garden-storage";
import { getVarietyById } from "@/data/varieties";
import { crops } from "@/data/crops";

export function useGarden() {
  const [garden, setGarden] = useState<GardenData>(createEmptyGarden);
  const [loaded, setLoaded] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    setGarden(loadGarden());
    setLoaded(true);
  }, []);

  // Debounced save — 2 seconds after last change
  useEffect(() => {
    if (!loaded) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => saveGarden(garden), 2000);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [garden, loaded]);

  // Save immediately on page blur
  useEffect(() => {
    if (!loaded) return;
    const handleBlur = () => saveGarden(garden);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBlur);
    };
  }, [garden, loaded]);

  const collect = useCallback((varietyId: string, source: "lucky-dip" | "manual" = "lucky-dip") => {
    setGarden((prev) => {
      if (prev.collection.some((c) => c.varietyId === varietyId)) return prev;
      return {
        ...prev,
        collection: [
          ...prev.collection,
          { varietyId, collectedAt: new Date().toISOString(), source },
        ],
        lastVarietyId: varietyId,
      };
    });
  }, []);

  const plant = useCallback((varietyId: string) => {
    setGarden((prev) => {
      const usedSlots = new Set(prev.plots.filter((p) => !p.harvested).map((p) => p.slotIndex));
      let nextSlot = -1;
      for (let i = 0; i < prev.settings.totalSlots; i++) {
        if (!usedSlots.has(i)) { nextSlot = i; break; }
      }
      if (nextSlot === -1) return prev; // Garden full

      const variety = getVarietyById(varietyId);
      if (!variety) return prev;
      const crop = crops.find((c) => c.slug === variety.cropSlug);
      if (!crop) return prev;

      const sowDate = new Date();
      const harvestDate = new Date(sowDate.getTime() + crop.harvestWeeks * 7 * 24 * 60 * 60 * 1000);

      return {
        ...prev,
        plots: [
          ...prev.plots,
          {
            slotIndex: nextSlot,
            varietyId,
            sowDate: sowDate.toISOString(),
            plantOutDate: null,
            expectedHarvest: harvestDate.toISOString(),
            harvested: false,
            harvestedAt: null,
            notes: "",
          },
        ],
      };
    });
  }, []);

  const harvest = useCallback((slotIndex: number) => {
    setGarden((prev) => ({
      ...prev,
      plots: prev.plots.map((p) =>
        p.slotIndex === slotIndex
          ? { ...p, harvested: true, harvestedAt: new Date().toISOString() }
          : p
      ),
    }));
  }, []);

  const unlockSlots = useCallback((count: number) => {
    setGarden((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        totalSlots: Math.min(prev.settings.totalSlots + count, 24),
      },
    }));
  }, []);

  const setEmail = useCallback((email: string) => {
    setGarden((prev) => ({
      ...prev,
      settings: { ...prev.settings, email },
    }));
  }, []);

  const isCollected = useCallback(
    (varietyId: string) => garden.collection.some((c) => c.varietyId === varietyId),
    [garden.collection]
  );

  const isPlanted = useCallback(
    (varietyId: string) => garden.plots.some((p) => p.varietyId === varietyId && !p.harvested),
    [garden.plots]
  );

  const activePlots = garden.plots.filter((p) => !p.harvested);
  const harvestedPlots = garden.plots.filter((p) => p.harvested);
  const gardenFull = activePlots.length >= garden.settings.totalSlots;

  return {
    garden,
    loaded,
    collect,
    plant,
    harvest,
    unlockSlots,
    setEmail,
    isCollected,
    isPlanted,
    activePlots,
    harvestedPlots,
    gardenFull,
  };
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/garden-storage.ts src/hooks/useGarden.ts
git commit -m "feat: add garden storage layer and useGarden hook"
```

---

## Task 4: Selection Logic & Weather Bonuses

**Files:**
- Create: `src/lib/lucky-dip-selection.ts`
- Create: `src/lib/weather-bonus.ts`

The brain of the Lucky Dip — picks a variety based on what's sowable, rarity weights, weather, and dedup.

- [ ] **Step 1: Create weather bonus utility**

```ts
// src/lib/weather-bonus.ts

export type WeatherBonus = {
  type: "rain" | "sun" | "frost" | "monthly" | null;
  label: string | null;
  /** Crop slugs that get a 2x weight boost */
  boostedSlugs: string[];
};

const CACHE_KEY = "whattosow:weather-bonus";
const CACHE_TTL = 3 * 60 * 60 * 1000; // 3 hours

const RAIN_CROPS = ["peas", "broad-beans", "lettuce", "spinach", "kale", "cabbage", "broccoli", "cauliflower", "brussels-sprouts"];
const SUN_CROPS = ["tomatoes", "peppers", "chillies", "sweetcorn", "courgettes", "aubergine", "cucumbers", "basil"];
const FROST_CROPS = ["broad-beans", "peas", "garlic", "rhubarb", "gooseberries", "blackcurrants", "redcurrants"];

interface CachedWeather {
  bonus: WeatherBonus;
  fetchedAt: number;
}

export async function getWeatherBonus(lat: number | null, lng: number | null): Promise<WeatherBonus> {
  const noBonus: WeatherBonus = { type: null, label: null, boostedSlugs: [] };

  // Check monthly special first (no weather needed)
  const now = new Date();
  if (now.getDate() === 1) {
    return { type: "monthly", label: "Monthly special — today only!", boostedSlugs: [] };
  }

  if (!lat || !lng) return noBonus;

  // Check cache
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CachedWeather = JSON.parse(cached);
      if (Date.now() - parsed.fetchedAt < CACHE_TTL) return parsed.bonus;
    }
  } catch { /* ignore */ }

  // Fetch current weather
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,rain,weathercode`
    );
    if (!res.ok) return noBonus;
    const data = await res.json();
    const temp = data.current?.temperature_2m ?? 10;
    const rain = data.current?.rain ?? 0;

    let bonus: WeatherBonus;
    if (temp < 5) {
      bonus = { type: "frost", label: "Frost special! Hardy legends unlocked", boostedSlugs: FROST_CROPS };
    } else if (rain > 0.5) {
      bonus = { type: "rain", label: "Rain bonus! Moisture-lovers are more likely", boostedSlugs: RAIN_CROPS };
    } else if (temp > 18) {
      bonus = { type: "sun", label: "Sun bonus! Tender crops are feeling lucky", boostedSlugs: SUN_CROPS };
    } else {
      bonus = noBonus;
    }

    // Cache
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ bonus, fetchedAt: Date.now() }));
    } catch { /* ignore */ }

    return bonus;
  } catch {
    return noBonus;
  }
}
```

- [ ] **Step 2: Create selection logic**

```ts
// src/lib/lucky-dip-selection.ts

import { crops, type Crop } from "@/data/crops";
import { varieties, type Variety } from "@/data/varieties";
import { isSowableNow, daysLeftToSow } from "@/lib/sowable";
import { getCropPhoto } from "@/lib/crop-photos";
import type { WeatherBonus } from "@/lib/weather-bonus";

export interface SelectedVariety {
  variety: Variety;
  crop: Crop;
  /** Effective rarity after seasonal modifiers */
  displayRarity: Variety["rarity"];
  /** Seasonal badge text, if any */
  seasonalBadge: string | null;
  /** Days left in sowing window, if within last 14 days */
  daysLeft: number | null;
}

const RARITY_WEIGHTS: Record<Variety["rarity"], number> = {
  common: 50,
  uncommon: 30,
  rare: 15,
  legendary: 5,
};

const RARITY_ORDER: Variety["rarity"][] = ["common", "uncommon", "rare", "legendary"];

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

  // First discovery: filter to uncommon or better
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
    if (getCropPhoto(v.cropSlug)) {
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

  // Determine seasonal badges
  const crop = crops.find((c) => c.slug === picked.cropSlug)!;
  const days = daysLeftToSow(crop);
  let seasonalBadge: string | null = null;
  let displayRarity = picked.rarity;

  if (days !== null && days <= 14) {
    seasonalBadge = `Last chance — ${days} days left to sow`;
    displayRarity = bumpRarity(picked.rarity);
  } else if (days !== null && days >= (crop.harvestWeeks * 7 - 14)) {
    // In the first ~2 weeks of being sowable
    seasonalBadge = "Just arrived!";
  }

  return {
    variety: picked,
    crop,
    displayRarity,
    seasonalBadge,
    daysLeft: days,
  };
}
```

- [ ] **Step 3: Verify compilation**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add src/lib/lucky-dip-selection.ts src/lib/weather-bonus.ts
git commit -m "feat: add Lucky Dip selection logic with rarity weights and weather bonuses"
```

---

## Task 5: Growing Reveal Animation

**Files:**
- Create: `src/components/GrowingReveal.tsx`
- Create: `src/components/GrowingReveal.css`

The centrepiece. Pure CSS animation: seed → sprout → bloom, with rarity-dependent intensity.

- [ ] **Step 1: Create the CSS keyframes**

```css
/* src/components/GrowingReveal.css */

.growing-reveal {
  position: relative;
  width: 200px;
  height: 280px;
  margin: 0 auto;
}

/* Soil base */
.growing-reveal__soil {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to bottom, #8B7355, #6B5B45);
  border-radius: 0 0 8px 8px;
}

/* Seed */
.growing-reveal__seed {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) scale(0);
  width: 16px;
  height: 20px;
  background: #8B6914;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: seed-drop 0.5s ease-out forwards;
}

@keyframes seed-drop {
  0% { transform: translateX(-50%) translateY(-120px) scale(1); opacity: 1; }
  70% { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; }
  100% { transform: translateX(-50%) translateY(10px) scale(0.5); opacity: 0; }
}

/* Stem */
.growing-reveal__stem {
  position: absolute;
  bottom: 55px;
  left: 50%;
  width: 4px;
  height: 0;
  background: #5A8A4A;
  transform: translateX(-50%);
  transform-origin: bottom center;
  animation: stem-grow 1s ease-out 0.5s forwards;
}

@keyframes stem-grow {
  0% { height: 0; }
  100% { height: 140px; }
}

/* Bloom — the crop icon container */
.growing-reveal__bloom {
  position: absolute;
  bottom: 195px;
  left: 50%;
  transform: translateX(-50%) scale(0);
  animation: bloom-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 1.5s forwards;
}

@keyframes bloom-pop {
  0% { transform: translateX(-50%) scale(0); opacity: 0; }
  50% { transform: translateX(-50%) scale(1.15); opacity: 1; }
  100% { transform: translateX(-50%) scale(1); opacity: 1; }
}

/* Leaves */
.growing-reveal__leaf-left,
.growing-reveal__leaf-right {
  position: absolute;
  width: 20px;
  height: 12px;
  background: #6B9B5A;
  border-radius: 0 50% 50% 0;
  bottom: 120px;
  opacity: 0;
  animation: leaf-appear 0.3s ease-out 1.2s forwards;
}

.growing-reveal__leaf-left {
  right: 50%;
  margin-right: 2px;
  transform: rotate(-30deg) scaleX(-1);
}

.growing-reveal__leaf-right {
  left: 50%;
  margin-left: 2px;
  transform: rotate(-30deg);
}

@keyframes leaf-appear {
  0% { opacity: 0; transform: rotate(0deg) scale(0.5); }
  100% { opacity: 1; transform: rotate(-30deg) scale(1); }
}

/* === RARITY EFFECTS === */

/* Uncommon — sparkle at bloom */
.growing-reveal--uncommon .growing-reveal__bloom::after {
  content: "";
  position: absolute;
  inset: -8px;
  background: radial-gradient(circle, rgba(123, 179, 105, 0.4) 0%, transparent 70%);
  animation: sparkle-pulse 0.6s ease-out 1.5s forwards;
  opacity: 0;
}

@keyframes sparkle-pulse {
  0% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(1.5); }
}

/* Rare — golden glow */
.growing-reveal--rare .growing-reveal__stem {
  background: linear-gradient(to top, #5A8A4A, #B8960C);
}

.growing-reveal--rare .growing-reveal__bloom::after {
  content: "";
  position: absolute;
  inset: -12px;
  background: radial-gradient(circle, rgba(212, 148, 58, 0.5) 0%, transparent 70%);
  animation: golden-glow 0.8s ease-out 1.5s forwards;
  opacity: 0;
}

@keyframes golden-glow {
  0% { opacity: 0; transform: scale(0.5); }
  60% { opacity: 1; transform: scale(1.3); }
  100% { opacity: 0.3; transform: scale(1.5); }
}

/* Legendary — slow grow, golden burst, shimmer */
.growing-reveal--legendary .growing-reveal__stem {
  background: linear-gradient(to top, #5A8A4A, #D4A43A);
  animation: stem-grow 1.8s ease-out 0.5s forwards; /* slower */
}

.growing-reveal--legendary .growing-reveal__bloom {
  animation: bloom-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 2.3s forwards; /* delayed */
}

.growing-reveal--legendary .growing-reveal__leaf-left,
.growing-reveal--legendary .growing-reveal__leaf-right {
  animation-delay: 2s;
}

.growing-reveal--legendary .growing-reveal__bloom::before {
  content: "";
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(212, 168, 58, 0.6) 0%, transparent 60%);
  animation: legendary-burst 1s ease-out 2.3s forwards;
  opacity: 0;
}

@keyframes legendary-burst {
  0% { opacity: 0; transform: scale(0.3); }
  40% { opacity: 1; transform: scale(1.5); }
  100% { opacity: 0; transform: scale(2.5); }
}

/* Rarity label */
.growing-reveal__label {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0;
  animation: label-fade 0.5s ease-out 2s forwards;
}

.growing-reveal--legendary .growing-reveal__label {
  animation-delay: 2.8s;
  color: #B8960C;
}

.growing-reveal--rare .growing-reveal__label {
  color: #D4943A;
}

.growing-reveal--uncommon .growing-reveal__label {
  color: #5A8A4A;
}

@keyframes label-fade {
  0% { opacity: 0; transform: translateX(-50%) translateY(8px); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .growing-reveal * {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  .growing-reveal__stem { height: 140px !important; }
  .growing-reveal__bloom { transform: translateX(-50%) scale(1) !important; opacity: 1 !important; }
  .growing-reveal__seed { display: none; }
}
```

- [ ] **Step 2: Create the React component**

```tsx
// src/components/GrowingReveal.tsx
"use client";

import { useState, useEffect } from "react";
import type { Rarity } from "@/data/varieties";
import "./GrowingReveal.css";

const RARITY_LABELS: Record<Rarity, string> = {
  common: "A good pick.",
  uncommon: "Nice find!",
  rare: "Rare find!",
  legendary: "Legendary!",
};

const ANIMATION_DURATION: Record<Rarity, number> = {
  common: 2000,
  uncommon: 2000,
  rare: 2200,
  legendary: 3200,
};

interface GrowingRevealProps {
  rarity: Rarity;
  /** Crop illustration src, shown in the bloom */
  illustrationSrc?: string;
  illustrationAlt?: string;
  /** Called when animation completes (or is skipped) */
  onComplete: () => void;
}

export default function GrowingReveal({
  rarity,
  illustrationSrc,
  illustrationAlt,
  onComplete,
}: GrowingRevealProps) {
  const [skipped, setSkipped] = useState(false);

  // Auto-complete after animation duration
  useEffect(() => {
    if (skipped) return;
    const timer = setTimeout(onComplete, ANIMATION_DURATION[rarity]);
    return () => clearTimeout(timer);
  }, [rarity, onComplete, skipped]);

  // Check reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSkipped(true);
      onComplete();
    }
  }, [onComplete]);

  const handleSkip = () => {
    if (!skipped) {
      setSkipped(true);
      onComplete();
      // Track skip
      if (typeof window !== "undefined" && (window as any).umami) {
        (window as any).umami.track("lucky-dip-animation-skip");
      }
    }
  };

  if (skipped) {
    return null; // Parent shows the result card
  }

  return (
    <div
      className={`growing-reveal growing-reveal--${rarity}`}
      onClick={handleSkip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleSkip()}
      aria-label="Growing animation — tap to skip"
    >
      {/* Soil */}
      <div className="growing-reveal__soil" />

      {/* Seed drops in */}
      <div className="growing-reveal__seed" />

      {/* Stem grows */}
      <div className="growing-reveal__stem" />

      {/* Leaves appear */}
      <div className="growing-reveal__leaf-left" />
      <div className="growing-reveal__leaf-right" />

      {/* Bloom reveals the crop */}
      <div className="growing-reveal__bloom">
        {illustrationSrc ? (
          <img
            src={illustrationSrc}
            alt={illustrationAlt || ""}
            width={80}
            height={80}
            className="object-contain"
          />
        ) : (
          <div className="w-20 h-20 bg-leaf/20 rounded-full" />
        )}
      </div>

      {/* Rarity label */}
      {rarity !== "common" && (
        <div className="growing-reveal__label">
          {RARITY_LABELS[rarity]}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify compilation**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add src/components/GrowingReveal.tsx src/components/GrowingReveal.css
git commit -m "feat: add growing reveal animation with rarity-dependent effects"
```

---

## Task 6: Lucky Dip Page

**Files:**
- Create: `src/app/lucky-dip/page.tsx`
- Create: `src/components/VarietyCard.tsx`
- Create: `src/components/RecipeSection.tsx`
- Create: `src/components/AffiliateButtons.tsx`

The main page — hero state, animation trigger, result card with all sections.

- [ ] **Step 1: Create AffiliateButtons component**

```tsx
// src/components/AffiliateButtons.tsx
"use client";

import type { SeedSupplier } from "@/data/varieties";

interface AffiliateButtonsProps {
  suppliers: SeedSupplier[];
  variety: string;
  rarity: string;
  eventPrefix?: string;
}

export default function AffiliateButtons({ suppliers, variety, rarity, eventPrefix = "lucky-dip" }: AffiliateButtonsProps) {
  const trackClick = (supplier: string) => {
    if (typeof window !== "undefined" && (window as any).umami) {
      (window as any).umami.track(`${eventPrefix}-affiliate-click`, { variety, rarity, supplier });
    }
  };

  if (suppliers.length === 0) return null;

  return (
    <div className="my-8">
      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-rust block mb-3">
        Get the seeds
      </span>
      <div className="flex flex-col sm:flex-row gap-3">
        {suppliers.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick(s.name)}
            className="flex-1 text-center text-sm font-semibold text-white bg-allotment hover:bg-allotment-dark transition-colors px-5 py-3"
          >
            {s.name} &rarr;
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create RecipeSection component**

```tsx
// src/components/RecipeSection.tsx
import type { CropRecipe } from "@/data/varieties";

export default function RecipeSection({ recipes }: { recipes: CropRecipe[] }) {
  if (recipes.length === 0) return null;

  return (
    <div className="my-10">
      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-earth-lighter block mb-4">
        What you&apos;ll be eating
      </span>
      <div className="space-y-6">
        {recipes.map((recipe) => (
          <div key={recipe.name} className="border-t border-earth/8 pt-4">
            <h3 className="font-serif text-lg text-earth mb-2">{recipe.name}</h3>
            <p className="text-[15px] text-earth-light leading-relaxed">{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create VarietyCard component**

```tsx
// src/components/VarietyCard.tsx
import type { Variety, Rarity } from "@/data/varieties";
import { getCropPhoto } from "@/lib/crop-photos";

const RARITY_BORDER: Record<Rarity, string> = {
  common: "border-earth/20",
  uncommon: "border-leaf ring-1 ring-leaf/20",
  rare: "border-amber ring-1 ring-amber/30",
  legendary: "border-amber ring-2 ring-amber/40 shimmer-border",
};

const RARITY_BADGE_STYLE: Record<Rarity, string> = {
  common: "bg-earth/10 text-earth-lighter",
  uncommon: "bg-leaf/15 text-allotment",
  rare: "bg-amber/15 text-amber",
  legendary: "bg-amber/20 text-amber",
};

interface VarietyCardProps {
  variety: Variety;
  displayRarity: Rarity;
  seasonalBadge: string | null;
  cropName: string;
  categoryLabel: string;
}

export default function VarietyCard({
  variety,
  displayRarity,
  seasonalBadge,
  cropName,
  categoryLabel,
}: VarietyCardProps) {
  const photo = getCropPhoto(variety.cropSlug);

  return (
    <div className={`border-2 ${RARITY_BORDER[displayRarity]} bg-cream p-6 sm:p-8`}>
      {/* Photo */}
      {photo && (
        <div className="aspect-[3/2] overflow-hidden bg-earth/5 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6">
          <img
            src={photo.hero}
            alt={photo.alt}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 ${RARITY_BADGE_STYLE[displayRarity]}`}>
          {displayRarity}
        </span>
        <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 bg-sage/40 text-allotment">
          {categoryLabel}
        </span>
        {seasonalBadge && (
          <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 bg-tomato/15 text-tomato">
            {seasonalBadge}
          </span>
        )}
      </div>

      {/* Name */}
      <h2 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight leading-tight mb-1">
        {variety.name}
      </h2>
      <p className="text-sm text-earth-lighter mb-4">{cropName}</p>

      {/* Personality */}
      <p className="text-[15px] text-earth-light leading-relaxed font-serif italic">
        {variety.personality}
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Create the Lucky Dip page**

```tsx
// src/app/lucky-dip/page.tsx
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LuckyDipClient from "./LuckyDipClient";

export const metadata: Metadata = {
  title: "Lucky Dip — Not Sure What to Grow? | What To Sow",
  description:
    "Plant a mystery seed and discover what to grow. A fun way to find your next crop — personalised to what's sowable right now in the UK.",
  keywords: [
    "what to grow now UK",
    "what should I plant",
    "random vegetable to grow",
    "seed lucky dip",
    "garden lucky dip",
    "what to grow on an allotment",
  ],
  openGraph: {
    title: "Lucky Dip — Not Sure What to Grow?",
    description:
      "Plant a mystery seed and discover what to grow next. Personalised to what's in season right now.",
    type: "website",
    url: "https://whattosow.co.uk/lucky-dip",
  },
  alternates: {
    canonical: "/lucky-dip",
  },
};

export default function LuckyDipPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content">
        <LuckyDipClient />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 5: Create the client component (LuckyDipClient)**

This is the main interactive component. Create at `src/app/lucky-dip/LuckyDipClient.tsx`. This file orchestrates: hero state → animation → result card → discover again loop. It uses `useGarden`, `selectVariety`, `getWeatherBonus`, `GrowingReveal`, `VarietyCard`, `RecipeSection`, `AffiliateButtons`.

Full implementation — hero state with mystery button, weather badge, collection progress counter. On tap: selects a variety, plays the growing reveal, then renders the full result card with all sections (variety card → why now → affiliate buttons → stats → recipes → plant in garden → guide link → email capture → discover another). Handles first-time experience (beginner's luck + welcome message). Tracks all Umami events.

- [ ] **Step 6: Test in browser**

Run: `npm run dev`
Check: `localhost:3000/lucky-dip`
- Hero state renders with button
- Tapping button plays animation
- Result card appears with all sections
- Affiliate links have correct hrefs
- "Plant another mystery seed" works for second discovery
- First discovery is uncommon or better

- [ ] **Step 7: Commit**

```bash
git add src/app/lucky-dip/ src/components/VarietyCard.tsx src/components/RecipeSection.tsx src/components/AffiliateButtons.tsx
git commit -m "feat: add Lucky Dip page with growing reveal, result card, and affiliate links"
```

---

## Task 7: Collection View

**Files:**
- Create: `src/components/CollectionGrid.tsx`
- Create: `src/components/CardDetail.tsx`

The Pokémon-style collection grouped by crop type.

- [ ] **Step 1: Create CollectionGrid**

Renders all varieties grouped by crop type. Collected ones show as mini cards with illustration + rarity border. Undiscovered ones show as dark silhouettes with "?". Each crop group has a progress header: "Tomatoes (3 of 6)". Overall progress bar at top.

Uses `useGarden().isCollected` to determine state. Tapping a collected card opens `CardDetail`.

- [ ] **Step 2: Create CardDetail**

Full card overlay/modal: variety illustration, name, personality, rarity border, recipes, affiliate links (second-chance conversion), "Plant in garden" button, growing guide link, date collected. Uses `AffiliateButtons` and `RecipeSection` components. Tracks `card-detail-view` and `card-detail-affiliate-click` Umami events.

- [ ] **Step 3: Test in browser**

Check: collection shows correct discovered/undiscovered state. Silhouettes are visually distinct. Card detail opens and shows all sections. Progress counter is accurate.

- [ ] **Step 4: Commit**

```bash
git add src/components/CollectionGrid.tsx src/components/CardDetail.tsx
git commit -m "feat: add card collection view with crop grouping and detail overlay"
```

---

## Task 8: Garden Grid

**Files:**
- Create: `src/components/GardenGrid.tsx`
- Create: `src/components/GardenSlot.tsx`
- Create: `src/components/HarvestLog.tsx`

The visual allotment plot with growth stages and harvest mechanic.

- [ ] **Step 1: Create GardenSlot**

Individual slot component. Shows one of three states based on calculated growth progress:
- **Empty:** soil texture, dashed border
- **Seed** (0-33% through growth): crop illustration at 30% scale, sepia filter, low opacity
- **Growing** (33-99%): 70% scale, slightly desaturated
- **Ready** (100%+): full scale, full colour, subtle pulse animation
- **Harvest button** appears on ready crops

Growth percentage calculated from: `(now - sowDate) / (expectedHarvest - sowDate)`.

CSS transitions between states. Tap opens variety detail.

- [ ] **Step 2: Create GardenGrid**

Renders the grid of `GardenSlot` components. Only shows earned slots (not locked ones). 3 columns on mobile, 4 on tablet/desktop. Shows "expand your allotment" prompt when garden is full (not "you're locked out"). Unlock via email signup (calls `useGarden().unlockSlots(4)` + `useGarden().setEmail()`).

- [ ] **Step 3: Create HarvestLog**

Simple list of harvested varieties: name, date planted, date harvested, days grown. "Grow again?" button with affiliate link per variety. Running total: "You've harvested N crops this season." Link back to Lucky Dip: "Discover something new."

- [ ] **Step 4: Test in browser**

Check: garden renders with correct slot count. Planting from Lucky Dip result adds to garden. Growth stages calculate correctly. Harvest button appears on ready crops. Harvest animation works. Harvested crops move to log.

- [ ] **Step 5: Commit**

```bash
git add src/components/GardenGrid.tsx src/components/GardenSlot.tsx src/components/HarvestLog.tsx
git commit -m "feat: add garden grid with growth stages and harvest mechanic"
```

---

## Task 9: My Garden Page

**Files:**
- Create: `src/app/my-garden/page.tsx`

The container page with tabs for Collection and Garden views.

- [ ] **Step 1: Create the page**

Server component wrapper with metadata. Client component inside with two tabs: "Collection" (renders `CollectionGrid`) and "Garden" (renders `GardenGrid` + `HarvestLog`). Tab state stored in URL hash (`#collection` / `#garden`) for direct linking.

Metadata targets: "allotment planner", "garden planner UK", "virtual garden".

- [ ] **Step 2: Test in browser**

Check: both tabs work. Tab state persists in URL. Collection shows discovered varieties. Garden shows planted crops. Navigation between tabs is smooth.

- [ ] **Step 3: Commit**

```bash
git add src/app/my-garden/
git commit -m "feat: add My Garden page with collection and garden tabs"
```

---

## Task 10: Navigation, Sitemap & Cross-Links

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/page.tsx`

Wire everything into the site.

- [ ] **Step 1: Add nav links to Header**

Add "Lucky Dip" and "My Garden" to the site navigation in `src/components/Header.tsx`. Follow the existing nav pattern.

- [ ] **Step 2: Add sitemap entries**

In `src/app/sitemap.ts`, add:
```ts
{ url: `${baseUrl}/lucky-dip`, lastModified: new Date("2026-04-02"), changeFrequency: "daily", priority: 0.8 },
{ url: `${baseUrl}/my-garden`, lastModified: new Date("2026-04-02"), changeFrequency: "daily", priority: 0.7 },
```

- [ ] **Step 3: Add cross-link on homepage**

In the guides section of `src/app/page.tsx`, add a Lucky Dip card:
```tsx
<a href="/lucky-dip" className="group bg-sage p-5 transition-colors">
  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-allotment/60 mb-1 block">Discover</span>
  <span className="font-semibold text-earth group-hover:text-allotment transition-colors">Lucky Dip &rarr;</span>
</a>
```

- [ ] **Step 4: Build and test**

Run: `npm run build`
Expected: builds successfully with new pages in the output

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/app/sitemap.ts src/app/page.tsx
git commit -m "feat: add Lucky Dip and My Garden to navigation, sitemap, and homepage"
```

---

## Build Order Summary

| Task | What | Dependencies |
|------|------|-------------|
| 1 | Variety data (content) | None |
| 2 | Shared sowable utility | None |
| 3 | Garden storage + hook | None |
| 4 | Selection logic + weather | Tasks 1, 2 |
| 5 | Growing reveal animation | None |
| 6 | Lucky Dip page | Tasks 1-5 |
| 7 | Collection view | Tasks 1, 3 |
| 8 | Garden grid | Tasks 1, 3 |
| 9 | My Garden page | Tasks 7, 8 |
| 10 | Navigation + sitemap | Tasks 6, 9 |

Tasks 1, 2, 3, and 5 can be built in parallel. Tasks 4 depends on 1+2. Task 6 depends on everything. Tasks 7+8 can be parallel after 1+3. Task 10 is the final wiring.
