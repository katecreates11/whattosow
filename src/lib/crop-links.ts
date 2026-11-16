import { crops, type Crop } from "@/data/crops";

/**
 * Everyday names people write for a crop, mapped to the slug its page lives at.
 * A link to /crops/potatoes is a 404; the page is /crops/maincrop-potatoes.
 */
const CROP_ALIASES: Record<string, string> = {
  potato: "maincrop-potatoes",
  potatoes: "maincrop-potatoes",
  onion: "onion-sets",
  onions: "onion-sets",
  aubergines: "aubergine",
  courgette: "courgettes",
  tomato: "tomatoes",
  carrot: "carrots",
  leek: "leeks",
  pea: "peas",
};

const bySlug = new Map(crops.map((crop) => [crop.slug, crop]));

/** The crop a slug or everyday name refers to, or null if we have no page for it. */
export function resolveCrop(slugOrName: string): Crop | null {
  const key = slugOrName.trim().toLowerCase();
  return bySlug.get(key) ?? bySlug.get(CROP_ALIASES[key] ?? "") ?? null;
}
