// src/data/varieties.ts (minimal stub — will be replaced with full data later)
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

export const varieties: Variety[] = [];

export function getVarietiesForCrop(cropSlug: string): Variety[] {
  return varieties.filter((v) => v.cropSlug === cropSlug);
}

export function getVarietyById(id: string): Variety | undefined {
  return varieties.find((v) => v.id === id);
}

export function getCropSlugsWithVarieties(): string[] {
  return [...new Set(varieties.map((v) => v.cropSlug))];
}
