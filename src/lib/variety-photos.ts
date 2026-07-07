/**
 * Verified, variety-SPECIFIC photography for the "Featured this week" slot.
 *
 * Keyed by variety id (see src/data/varieties.ts). Only add an entry here when
 * the photo is genuinely of THAT variety and you'd stand behind it — this is a
 * trust surface, not a stock-photo slot. Anything not listed here falls back to
 * the crop-level allotment photo in crop-photos.ts, and if there's no photo at
 * all the variety simply isn't eligible to be featured.
 *
 * As this map grows, the Featured slot automatically tightens from "our real
 * crop photo" towards "a real photo of this exact variety".
 */

export interface VarietyPhoto {
  src: string;
  alt: string;
}

const varietyPhotos: Record<string, VarietyPhoto> = {
  // e.g. "tomatoes-sungold": {
  //   src: "/photos/varieties/tomatoes-sungold.webp",
  //   alt: "A truss of ripe orange Sungold cherry tomatoes on the vine",
  // },
};

export function getVarietyPhoto(id: string): VarietyPhoto | null {
  return varietyPhotos[id] ?? null;
}
