import type { Crop } from "@/data/crops";

/**
 * Resolve a square-ish image for a crop:
 *   1. our own allotment photography where we have it
 *   2. the crop's Unsplash photo
 *   3. null → caller shows the herbarium specimen label instead
 */
const OUR_PHOTOS: Record<string, string> = {
  peas: "/photos/crops/peas-on-vine.webp",
  lettuce: "/photos/crops/lettuce-with-marigolds.webp",
  carrots: "/photos/crops/carrots-fresh-harvest.webp",
  courgettes: "/photos/crops/courgette-with-flowers.webp",
  "runner-beans": "/photos/crops/runner-beans-climbing.webp",
  sweetcorn: "/photos/crops/sweetcorn-glass-gem.webp",
  pumpkins: "/photos/crops/pumpkin-patch-orange.webp",
  strawberries: "/photos/crops/strawberry-harvest-punnet.webp",
  tomatoes: "/photos/crops/tomatoes-cherry-on-vine.webp",
  borage: "/photos/crops/borage-flowers-bee.webp",
  sunflowers: "/photos/crops/sunflower-blue-sky.webp",
};

export function cropImage(crop: Crop): { src: string; ours: boolean } | null {
  if (OUR_PHOTOS[crop.slug]) return { src: OUR_PHOTOS[crop.slug], ours: true };
  if (crop.unsplashId)
    return {
      src: `https://images.unsplash.com/photo-${crop.unsplashId}?w=600&h=760&fit=crop&auto=format&q=75`,
      ours: false,
    };
  return null;
}
