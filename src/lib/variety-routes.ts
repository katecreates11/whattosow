import { varieties, type Variety } from "@/data/varieties";
import { crops, type Crop } from "@/data/crops";

/**
 * Routing helpers for per-variety pages at /crops/[slug]/[variety]
 * (e.g. /crops/tomatoes/sungold). The variety slug is the variety id with the
 * crop-slug prefix removed (ids are already URL-safe and unique).
 */

const cropBySlug = new Map(crops.map((c) => [c.slug, c]));

export function varietySlug(v: Variety): string {
  return v.id.startsWith(v.cropSlug + "-") ? v.id.slice(v.cropSlug.length + 1) : v.id;
}

export function allVarietyParams(): { slug: string; variety: string }[] {
  return varieties.map((v) => ({ slug: v.cropSlug, variety: varietySlug(v) }));
}

export function getVarietyByRoute(cropSlug: string, vSlug: string): { variety: Variety; crop: Crop } | null {
  const variety = varieties.find((v) => v.cropSlug === cropSlug && varietySlug(v) === vSlug);
  if (!variety) return null;
  const crop = cropBySlug.get(cropSlug);
  if (!crop) return null;
  return { variety, crop };
}

export function varietiesForCrop(cropSlug: string): Variety[] {
  return varieties.filter((v) => v.cropSlug === cropSlug);
}
