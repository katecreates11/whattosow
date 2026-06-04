/**
 * The Bed Planner engine. Pure, deterministic (seeded) logic: given the beds a
 * grower has and the crops they want, it lays out a sensible plan —
 *   • crops grouped by family so the whole bed can be rotated next year
 *   • antagonists (e.g. onions + beans) kept apart where possible
 *   • each bed arranged tall-to-north so nothing shades its neighbours
 *   • real spacing → real plant counts, with a legible drawn grid
 *   • a flower tucked into every bed for pests & pollinators
 * Returns everything the UI needs to draw plates, data strips and a kit list.
 */
import type { Drift, Dir } from "@/components/BedPlate";
import { plannerCropBySlug, familiesClash, FAMILY_LABEL, type PlannerCrop, type Family } from "@/data/planner-crops";

export type SizeKey = "standard" | "small" | "long";
export const BED_SIZES: Record<SizeKey, { w: number; l: number; label: string }> = {
  standard: { w: 120, l: 240, label: "Standard · 1.2m × 2.4m" },
  small: { w: 120, l: 120, label: "Small · 1.2m × 1.2m" },
  long: { w: 120, l: 360, label: "Long · 1.2m × 3.6m" },
};

export interface PlanCropRow {
  name: string;
  color: string;
  spacingCm: number;
  realCount: number;
  sow: number[];
  harvest: number[];
  sun: "full" | "part";
}
export interface PlanBed {
  label: string;
  north: Dir;
  widthLabel: string;
  lengthLabel: string;
  drifts: Drift[];
  rows: PlanCropRow[];
  notes: string[];
}
export interface KitItem { name: string; query: string; why: string }
export interface Plan { beds: PlanBed[]; warnings: string[]; kit: KitItem[] }

const PLATE_W = 386; // inner soil px (matches BedPlate)
const PLATE_H = 266;
const RANK: Record<PlannerCrop["height"], number> = { climber: 4, medium: 3, sprawl: 2, low: 1 };
const WEIGHT: Record<PlannerCrop["height"], number> = { sprawl: 1.7, climber: 1.25, medium: 1.2, low: 1 };

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export function generatePlan(opts: { numBeds: number; sizeKey: SizeKey; north: Dir; cropSlugs: string[]; seed: number }): Plan {
  const { numBeds, sizeKey, north, cropSlugs, seed } = opts;
  const rand = mulberry32(seed || 1);
  const size = BED_SIZES[sizeKey];

  const chosen = cropSlugs.map((s) => plannerCropBySlug[s]).filter(Boolean) as PlannerCrop[];
  const veg = chosen.filter((c) => !c.flower);
  const flowers = chosen.filter((c) => c.flower);

  // group veg by family
  const famMap = new Map<Family, PlannerCrop[]>();
  for (const c of veg) famMap.set(c.family, [...(famMap.get(c.family) ?? []), c]);

  // beds
  const beds: { crops: PlannerCrop[]; fams: Set<Family> }[] = Array.from({ length: numBeds }, () => ({ crops: [], fams: new Set<Family>() }));

  // assign family groups (largest first; seed jitters ties) into the least-full,
  // non-clashing bed
  const groups = [...famMap.entries()].sort((a, b) => b[1].length - a[1].length || rand() - 0.5);
  for (const [fam, members] of groups) {
    const ranked = beds
      .map((b, i) => ({ b, i, clash: [...b.fams].some((f) => familiesClash(f, fam)), load: b.crops.length + rand() * 0.3 }))
      .sort((x, y) => Number(x.clash) - Number(y.clash) || x.load - y.load);
    const target = ranked[0].b;
    target.crops.push(...members);
    target.fams.add(fam);
  }

  // a flower in every bed (cycle through chosen flowers)
  if (flowers.length) {
    beds.forEach((b, i) => b.crops.push(flowers[i % flowers.length]));
  }

  const northWord = "north";
  const usedBeds = beds.filter((b) => b.crops.length > 0);

  const planBeds: PlanBed[] = usedBeds.map((bed, bi) => {
    const fl = bed.crops.filter((c) => c.flower);
    let veg = bed.crops.filter((c) => !c.flower).sort((a, b) => RANK[b.height] - RANK[a.height]);
    if (north === "bottom") veg = veg.slice().reverse(); // tall ends up at the bottom = north

    const mainTop = 4;
    const mainBottom = fl.length ? 83 : 96;
    const totalW = veg.reduce((s, c) => s + WEIGHT[c.height], 0) || 1;

    const drifts: Drift[] = [];
    const rows: PlanCropRow[] = [];
    let y = mainTop;
    for (const crop of veg) {
      const bandH = (mainBottom - mainTop) * (WEIGHT[crop.height] / totalW);
      const region: [number, number, number, number] = [4, y, 96, y + bandH];
      const bandLcm = size.l * 0.92;
      const bandWcm = size.w * (bandH / 100);
      const colsReal = Math.max(1, Math.floor(bandLcm / crop.spacingCm));
      const rowsReal = Math.max(1, Math.floor(bandWcm / crop.spacingCm));
      const realCount = colsReal * rowsReal;
      // drawn grid: capped for legibility, and rows limited so they fit the band height (no vertical overlap)
      const bandHpx = (bandH / 100) * PLATE_H;
      const maxRowsFit = Math.max(1, Math.floor(bandHpx / 15));
      const drawnCols = clamp(colsReal, 1, 13);
      const drawnRows = clamp(Math.min(rowsReal, maxRowsFit), 1, 5);
      const count = drawnCols * drawnRows;
      const cellW = (0.92 * PLATE_W) / drawnCols;
      const cellH = ((bandH / 100) * PLATE_H) / drawnRows;
      const glyphScale = clamp(Math.round(Math.min(cellW, cellH) * 0.34), 6, 18);
      drifts.push({ name: crop.name, habit: crop.habit, color: crop.color, fruitColor: crop.fruitColor, region, count, cols: drawnCols, glyphScale, spacing: `${crop.spacingCm}cm` });
      rows.push({ name: crop.name, color: crop.color, spacingCm: crop.spacingCm, realCount, sow: crop.sow, harvest: crop.harvest, sun: crop.sun });
      y += bandH;
    }

    // flowers along the south edge
    for (const f of fl) {
      const colsReal = clamp(Math.floor((size.l * 0.92) / f.spacingCm), 3, 11);
      drifts.push({ name: f.name, habit: f.habit, color: f.color, region: [4, 85, 96, 98], count: colsReal, cols: colsReal, glyphScale: 9, spacing: `${f.spacingCm}cm` });
      rows.push({ name: f.name, color: f.color, spacingCm: f.spacingCm, realCount: colsReal, sow: f.sow, harvest: f.harvest, sun: f.sun });
    }

    // notes
    const notes: string[] = [];
    const tallest = veg[0];
    if (tallest && RANK[tallest.height] >= 3) notes.push(`Put the ${tallest.name.toLowerCase()} on the ${northWord} side so it doesn't shade the shorter crops.`);
    const famsHere = [...bed.fams];
    if (famsHere.includes("legume") && famsHere.includes("allium")) notes.push("Onions and beans are sharing this bed — keep them to opposite ends; alliums can check legume growth.");
    if (fl.length) notes.push(`${fl.map((f) => f.name).join(" & ")} tucked in to pull pests away and bring in the bees.`);
    else notes.push("No flowers here — a few marigolds or nasturtiums would earn their place.");
    if (famsHere.length) notes.push(`Next year, shift this bed's ${famsHere.map((f) => FAMILY_LABEL[f].toLowerCase()).join(" & ")} to another bed to keep the soil healthy.`);

    return {
      label: `Bed ${bi + 1}`,
      north,
      widthLabel: `${(size.w / 100).toFixed(1)}m`,
      lengthLabel: `${(size.l / 100).toFixed(1)}m`,
      drifts,
      rows,
      notes,
    };
  });

  // global warnings
  const warnings: string[] = [];
  if (!flowers.length) warnings.push("Tip: add a flower (marigolds, nasturtiums, borage or calendula) — they pull pests off your crops and bring in pollinators for a bigger harvest.");
  if (veg.length === 0) warnings.push("Pick a few vegetables to grow and we'll lay them out for you.");

  // tailored kit
  const slugs = new Set(chosen.map((c) => c.slug));
  const has = (...s: string[]) => s.some((x) => slugs.has(x));
  const kit: KitItem[] = [
    { name: "Raised bed kit", query: "wooden raised bed kit vegetables", why: "Warmer soil, better drainage and a tidy edge for every bed in this plan." },
    { name: "Seeding Square", query: "seeding square seed spacer", why: "Spaces seeds at exactly the distances above — press, sow, move on." },
  ];
  if (has("carrots", "kale", "cabbage", "broccoli", "cauliflower", "turnips", "radishes")) kit.push({ name: "Fine insect mesh / fleece", query: "enviromesh fine insect mesh netting", why: "Keeps carrot fly off the roots and cabbage whites off the brassicas." });
  if (has("peas", "runner-beans", "french-beans")) kit.push({ name: "Bean & pea netting / canes", query: "garden bean netting canes support", why: "Something for the climbers to scramble up." });
  if (has("tomatoes", "courgettes", "cucumbers", "pumpkins", "squash", "peppers", "chillies")) kit.push({ name: "Watering lance", query: "gardena watering lance", why: "Thirsty fruiting crops want water at the roots, under the leaves." });
  kit.push({ name: "Wooden plant labels", query: "wooden plant labels", why: "So you remember what's in every row come spring." });

  return { beds: planBeds, warnings, kit };
}
