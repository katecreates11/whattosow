/**
 * Mapping of crop slugs to local allotment photography.
 * Photos are in /public/photos/crops/ — optimised WebP, 1200px wide.
 */

interface CropPhoto {
  /** Primary hero photo for the crop page */
  hero: string;
  /** Alt text for SEO */
  alt: string;
}

const cropPhotos: Record<string, CropPhoto> = {
  tomatoes: {
    hero: "/photos/crops/tomatoes-cherry-on-vine.webp",
    alt: "Cherry tomatoes ripening on the vine at a UK allotment, surrounded by rosemary",
  },
  strawberries: {
    hero: "/photos/crops/strawberry-ripe-close-up.webp",
    alt: "A single ripe strawberry held up at an allotment, with marigolds in the background",
  },
  peas: {
    hero: "/photos/crops/peas-in-pods-flat-lay.webp",
    alt: "Freshly picked peas in open pods, showing plump green peas inside",
  },
  courgettes: {
    hero: "/photos/crops/courgette-with-flowers.webp",
    alt: "A courgette growing with bright yellow flowers on a UK allotment",
  },
  carrots: {
    hero: "/photos/crops/carrots-fresh-harvest.webp",
    alt: "Three freshly harvested carrots with green tops, cleaned and laid on cloth",
  },
  sweetcorn: {
    hero: "/photos/crops/sweetcorn-harvest.webp",
    alt: "A freshly picked sweetcorn cob held up against a backdrop of sunflowers",
  },
  basil: {
    hero: "/photos/crops/purple-basil-seedling.webp",
    alt: "A young purple basil seedling in dark soil at a UK allotment",
  },
  pumpkins: {
    hero: "/photos/crops/pumpkin-patch-orange.webp",
    alt: "A ripening orange pumpkin nestled among its leaves in the pumpkin patch at a UK allotment",
  },
  "runner-beans": {
    hero: "/photos/crops/runner-beans-climbing.webp",
    alt: "Runner beans climbing their canes, covered in scarlet flowers against a bright blue sky",
  },
  lettuce: {
    hero: "/photos/crops/lettuce-with-marigolds.webp",
    alt: "Rows of lettuce growing alongside bright orange marigolds in a raised bed",
  },
  squash: {
    hero: "/photos/crops/courgette-with-flowers.webp",
    alt: "Squash growing with yellow flowers on a UK allotment",
  },
};

export function getCropPhoto(slug: string): CropPhoto | null {
  return cropPhotos[slug] ?? null;
}
