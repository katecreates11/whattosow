/**
 * The crop dataset the Bed Planner reasons over. Each entry carries everything
 * the generator needs to lay a plant out well: which glyph draws it, its plant
 * family (for rotation + companion logic), how tall it grows (for shading),
 * real spacing, sun need, and its UK sow/harvest window.
 *
 * Curated to the crops we have authentic glyphs for. Add a crop = add a row.
 */
import type { Habit } from "@/components/BedPlate";

export type Family =
  | "legume"
  | "brassica"
  | "allium"
  | "solanaceae"
  | "root"
  | "chenopod"
  | "cucurbit"
  | "salad"
  | "flower";

export type Height = "climber" | "medium" | "sprawl" | "low";

export interface PlannerCrop {
  slug: string;
  name: string;
  habit: Habit;
  color: string;
  fruitColor?: string;
  family: Family;
  height: Height;
  spacingCm: number;
  sun: "full" | "part";
  sow: number[]; // months, 0 = Jan
  harvest: number[];
  flower?: boolean;
}

const FAM = {
  legume: "#2D5F3E",
  brassica: "#3E8E7E",
  allium: "#6E9A52",
  solanaceae: "#C9543E",
  root: "#E0852E",
  chenopod: "#2F6B3A",
  cucurbit: "#4A9A5B",
  salad: "#6FA84F",
};

export const plannerCrops: PlannerCrop[] = [
  // legumes
  { slug: "peas", name: "Peas", habit: "climber", color: FAM.legume, family: "legume", height: "climber", spacingCm: 8, sun: "full", sow: [2, 3, 4, 5], harvest: [5, 6, 7, 8] },
  { slug: "broad-beans", name: "Broad beans", habit: "climber", color: FAM.legume, family: "legume", height: "medium", spacingCm: 20, sun: "full", sow: [1, 2, 3, 9, 10], harvest: [5, 6, 7] },
  { slug: "runner-beans", name: "Runner beans", habit: "climber", color: FAM.legume, family: "legume", height: "climber", spacingCm: 20, sun: "full", sow: [4, 5], harvest: [7, 8, 9] },
  { slug: "french-beans", name: "French beans", habit: "climber", color: FAM.legume, family: "legume", height: "climber", spacingCm: 15, sun: "full", sow: [4, 5], harvest: [7, 8, 9] },
  // brassicas
  { slug: "kale", name: "Kale", habit: "rosette", color: FAM.brassica, family: "brassica", height: "medium", spacingCm: 45, sun: "full", sow: [3, 4, 5], harvest: [8, 9, 10, 11, 0, 1] },
  { slug: "cabbage", name: "Cabbage", habit: "rosette", color: FAM.brassica, family: "brassica", height: "medium", spacingCm: 40, sun: "full", sow: [2, 3, 4, 5], harvest: [6, 7, 8, 9, 10] },
  { slug: "broccoli", name: "Broccoli", habit: "rosette", color: FAM.brassica, family: "brassica", height: "medium", spacingCm: 45, sun: "full", sow: [3, 4, 5], harvest: [7, 8, 9, 10] },
  { slug: "cauliflower", name: "Cauliflower", habit: "rosette", color: FAM.brassica, family: "brassica", height: "medium", spacingCm: 50, sun: "full", sow: [3, 4], harvest: [7, 8, 9] },
  { slug: "pak-choi", name: "Pak choi", habit: "rosette", color: FAM.brassica, family: "brassica", height: "low", spacingCm: 20, sun: "part", sow: [6, 7, 8], harvest: [8, 9, 10] },
  { slug: "rocket", name: "Rocket", habit: "rosette", color: FAM.brassica, family: "brassica", height: "low", spacingCm: 12, sun: "part", sow: [3, 4, 5, 8, 9], harvest: [4, 5, 6, 9, 10] },
  { slug: "radishes", name: "Radishes", habit: "root", color: "#C9543E", family: "brassica", height: "low", spacingCm: 4, sun: "part", sow: [2, 3, 4, 5, 6, 7, 8], harvest: [3, 4, 5, 6, 7, 8, 9] },
  { slug: "turnips", name: "Turnips", habit: "root", color: "#D9A66A", family: "brassica", height: "low", spacingCm: 15, sun: "full", sow: [3, 4, 5, 6, 7], harvest: [6, 7, 8, 9, 10] },
  // alliums
  { slug: "onion-sets", name: "Onions", habit: "allium", color: FAM.allium, family: "allium", height: "low", spacingCm: 10, sun: "full", sow: [2, 3], harvest: [7, 8] },
  { slug: "garlic", name: "Garlic", habit: "allium", color: FAM.allium, family: "allium", height: "low", spacingCm: 15, sun: "full", sow: [9, 10], harvest: [6, 7] },
  { slug: "leeks", name: "Leeks", habit: "allium", color: FAM.allium, family: "allium", height: "medium", spacingCm: 15, sun: "full", sow: [2, 3, 4], harvest: [9, 10, 11, 0, 1] },
  { slug: "spring-onions", name: "Spring onions", habit: "allium", color: FAM.allium, family: "allium", height: "low", spacingCm: 3, sun: "part", sow: [2, 3, 4, 5, 6, 7], harvest: [5, 6, 7, 8, 9, 10] },
  // solanaceae (fruiting)
  { slug: "tomatoes", name: "Tomatoes", habit: "fruit", color: "#4A9A5B", fruitColor: "#C9543E", family: "solanaceae", height: "medium", spacingCm: 45, sun: "full", sow: [2, 3], harvest: [7, 8, 9] },
  { slug: "peppers", name: "Peppers", habit: "fruit", color: "#4A9A5B", fruitColor: "#D9542E", family: "solanaceae", height: "medium", spacingCm: 45, sun: "full", sow: [1, 2, 3], harvest: [8, 9, 10] },
  { slug: "chillies", name: "Chillies", habit: "fruit", color: "#4A9A5B", fruitColor: "#C9302E", family: "solanaceae", height: "medium", spacingCm: 40, sun: "full", sow: [1, 2, 3], harvest: [8, 9, 10] },
  { slug: "aubergine", name: "Aubergine", habit: "fruit", color: "#4A9A5B", fruitColor: "#6E4A8E", family: "solanaceae", height: "medium", spacingCm: 50, sun: "full", sow: [1, 2, 3], harvest: [8, 9] },
  // roots / umbellifers
  { slug: "carrots", name: "Carrots", habit: "root", color: FAM.root, family: "root", height: "low", spacingCm: 5, sun: "full", sow: [2, 3, 4, 5, 6], harvest: [6, 7, 8, 9, 10] },
  { slug: "parsnips", name: "Parsnips", habit: "root", color: "#E8D5A8", family: "root", height: "low", spacingCm: 12, sun: "full", sow: [2, 3, 4], harvest: [9, 10, 11, 0, 1] },
  // chenopods
  { slug: "beetroot", name: "Beetroot", habit: "beet", color: "#9A3F6A", family: "chenopod", height: "low", spacingCm: 10, sun: "part", sow: [2, 3, 4, 5, 6], harvest: [6, 7, 8, 9, 10] },
  { slug: "swiss-chard", name: "Swiss chard", habit: "rosette", color: FAM.chenopod, family: "chenopod", height: "medium", spacingCm: 25, sun: "part", sow: [3, 4, 5, 6, 7], harvest: [6, 7, 8, 9, 10, 11] },
  { slug: "spinach", name: "Spinach", habit: "rosette", color: FAM.chenopod, family: "chenopod", height: "low", spacingCm: 15, sun: "part", sow: [2, 3, 4, 8, 9], harvest: [4, 5, 6, 10, 11] },
  // cucurbits
  { slug: "courgettes", name: "Courgettes", habit: "fruit", color: FAM.cucurbit, fruitColor: "#E8C33A", family: "cucurbit", height: "sprawl", spacingCm: 90, sun: "full", sow: [3, 4, 5], harvest: [7, 8, 9] },
  { slug: "pumpkins", name: "Pumpkins", habit: "fruit", color: FAM.cucurbit, fruitColor: "#E08A2E", family: "cucurbit", height: "sprawl", spacingCm: 120, sun: "full", sow: [3, 4, 5], harvest: [9, 10] },
  { slug: "squash", name: "Squash", habit: "fruit", color: FAM.cucurbit, fruitColor: "#E8B33A", family: "cucurbit", height: "sprawl", spacingCm: 100, sun: "full", sow: [3, 4, 5], harvest: [9, 10] },
  { slug: "cucumbers", name: "Cucumbers", habit: "fruit", color: FAM.cucurbit, fruitColor: "#5E9942", family: "cucurbit", height: "sprawl", spacingCm: 45, sun: "full", sow: [3, 4, 5], harvest: [7, 8, 9] },
  // salads
  { slug: "lettuce", name: "Lettuce", habit: "rosette", color: FAM.salad, family: "salad", height: "low", spacingCm: 25, sun: "part", sow: [2, 3, 4, 5, 6, 7], harvest: [5, 6, 7, 8, 9] },
  // flowers (companions)
  { slug: "marigolds", name: "Marigolds", habit: "marigold", color: "#E8B33A", family: "flower", height: "low", spacingCm: 20, sun: "full", sow: [3, 4], harvest: [], flower: true },
  { slug: "nasturtium", name: "Nasturtiums", habit: "nasturtium", color: "#E0701E", family: "flower", height: "low", spacingCm: 30, sun: "full", sow: [3, 4, 5], harvest: [], flower: true },
  { slug: "borage", name: "Borage", habit: "borage", color: "#4F7FC4", family: "flower", height: "medium", spacingCm: 30, sun: "full", sow: [3, 4, 5], harvest: [], flower: true },
  { slug: "calendula", name: "Calendula", habit: "calendula", color: "#E8A52E", family: "flower", height: "low", spacingCm: 25, sun: "full", sow: [3, 4], harvest: [], flower: true },
];

export const plannerCropBySlug: Record<string, PlannerCrop> = Object.fromEntries(plannerCrops.map((c) => [c.slug, c]));

export const FAMILY_LABEL: Record<Family, string> = {
  legume: "Legumes (peas & beans)",
  brassica: "Brassicas (cabbage family)",
  allium: "Onion family",
  solanaceae: "Tomato family",
  root: "Roots",
  chenopod: "Beet & chard family",
  cucurbit: "Squash family",
  salad: "Salad leaves",
  flower: "Flowers",
};

// Families that genuinely dislike sharing a bed (kept simple & evidence-based).
export const BAD_FAMILY_PAIRS: [Family, Family][] = [
  ["legume", "allium"], // alliums check legume growth
];

export function familiesClash(a: Family, b: Family): boolean {
  return BAD_FAMILY_PAIRS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}
