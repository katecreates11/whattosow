/**
 * Central kit catalogue — every product Kate has actually bought and used, in one
 * place. Reused across blog posts ("What I used") and, later, the guides.
 * Descriptions are honest and in voice; prices are approximate (Amazon varies),
 * and omitted where uncertain. All links carry the whattosow21-21 tag.
 */

const TAG = "whattosow21-21";

export function amazonLink(asin: string): string {
  return `https://www.amazon.co.uk/dp/${asin}?tag=${TAG}`;
}

export type KitBadge = "our-pick" | "budget" | "upgrade" | "essential";

export interface KitProduct {
  id: string;
  name: string;
  asin: string;
  description: string;
  badge?: KitBadge;
  tip?: string;
  price?: string;
}

export const kit: Record<string, KitProduct> = {
  broadfork: {
    id: "broadfork",
    name: "Terradix 5x300 broadfork",
    asin: "B09J4QWJLW",
    price: "~£129",
    badge: "upgrade",
    description:
      "A wide, beautifully made broadfork that breaks up heavy clay with your weight rather than your back. Not cheap, but a real pleasure — it's changed how I feel about digging.",
    tip: "The width is the joy — you cover far more with every lift.",
  },
  gloves: {
    id: "gloves",
    name: "Showa 370 gardening gloves",
    asin: "B0017HEJC0",
    price: "~£5",
    badge: "essential",
    description:
      "My favourites — light, close-fitting and grippy, so you can still feel what you're doing. Cheap enough to own a few pairs.",
    tip: "Buy two pairs — one's always drying.",
  },
  kneeler: {
    id: "kneeler",
    name: "Thistlewood memory-foam kneeler",
    asin: "B099FDNQR3",
    price: "~£20",
    badge: "our-pick",
    description:
      "A thick memory-foam kneeler that saves your knees through a long planting or weeding session. The pretty cover is a bonus.",
  },
  "bulb-planter": {
    id: "bulb-planter",
    name: "Kent & Stowe stainless bulb planter",
    asin: "B09GVYL32D",
    badge: "our-pick",
    description:
      "A sturdy stainless bulb planter with depth marks down the side — brilliant for popping in potatoes and bulbs at an even depth, even when the soil is firm.",
    tip: "The depth scale takes the guesswork out of spacing.",
  },
  "weed-puller": {
    id: "weed-puller",
    name: "Hand weed puller",
    asin: "B08CTVKW8K",
    badge: "budget",
    description:
      "A little hand puller that grips and lifts weeds — roots and all — without you bending double. Handy for the worst of the bindweed.",
  },
  "root-trainer": {
    id: "root-trainer",
    name: "Muddy Hands deep root-trainer tray (28 cells)",
    asin: "B0CV5Z9Y7H",
    badge: "our-pick",
    description:
      "Deep cells that give beans, peas and sweet peas the long root run they like, then pop out cleanly when it's time to plant.",
  },
  "plant-ties": {
    id: "plant-ties",
    name: "KINGLAKE soft plant-tie tape",
    asin: "B0D5L7F2S3",
    badge: "budget",
    description:
      "Soft hook-and-loop tape you tear to length to tie in tomatoes and beans — gentle on the stems, and reusable year to year.",
  },
  dibber: {
    id: "dibber",
    name: "Spear & Jackson carbon dibber",
    asin: "B002W5V62C",
    badge: "our-pick",
    description:
      "A proper carbon-steel dibber for making neat, even holes for seedlings and seeds. Solid in the hand and lovely to use.",
  },
  labels: {
    id: "labels",
    name: "Wooden plant labels (100)",
    asin: "B0DQ5WVTQJ",
    price: "~£5",
    badge: "budget",
    description:
      "Biodegradable wooden labels — write the variety in pencil and you'll actually remember what's what come spring.",
  },
  "watering-lance": {
    id: "watering-lance",
    name: "Gardena premium watering lance",
    asin: "B01MQDGXMO",
    badge: "our-pick",
    description:
      "A long watering lance that reaches the back of the bed and under the leaves, where the roots actually want it.",
  },
  "pea-netting": {
    id: "pea-netting",
    name: "Jute pea & bean netting",
    asin: "B0DMFPNXHL",
    badge: "our-pick",
    description:
      "Biodegradable jute netting for peas and beans to climb — and you can compost the whole lot at the end of the season.",
  },
  "pea-sticks": {
    id: "pea-sticks",
    name: "Willow pea & bean support sticks",
    asin: "B01G91STQA",
    badge: "budget",
    description:
      "Natural willow sticks for peas and beans to scramble up — they look lovely in the bed and go on the compost when they're done.",
  },
  "ground-pegs": {
    id: "ground-pegs",
    name: "Galvanised ground pegs (50)",
    asin: "B08WJRK7Q5",
    badge: "essential",
    description:
      "Galvanised pegs for pinning down weed membrane and netting so the wind doesn't take it. You always need more than you think.",
  },
  "tent-pegs": {
    id: "tent-pegs",
    name: "Galvanised pegs (20)",
    asin: "B0C94Q85JV",
    badge: "budget",
    description:
      "Handy galvanised pegs for holding down cloches, fleece and netting through a blustery week.",
  },
  twine: {
    id: "twine",
    name: "Draper 100m jute garden twine",
    asin: "B000PJCDZG",
    price: "~£10",
    badge: "essential",
    description:
      "A big roll of jute twine — for tying in, marking out rows, and the hundred other jobs a length of string is for.",
  },
  "slug-killer": {
    id: "slug-killer",
    name: "Slug & snail pellets (800g)",
    asin: "B0B1VWK2V2",
    badge: "budget",
    description:
      "For the worst slug nights, when seedlings need a fighting chance. Use sparingly and only where you must.",
  },
  "terracotta-pots": {
    id: "terracotta-pots",
    name: "Small terracotta pots (16)",
    asin: "B08NC6J8VL",
    badge: "budget",
    description:
      "Little terracotta pots for pricking out seedlings — and far nicer on the windowsill than plastic.",
  },
  "solar-fountain": {
    id: "solar-fountain",
    name: "Solar bird-bath fountain",
    asin: "B0BMVTB9LQ",
    badge: "our-pick",
    description:
      "A solar bird-bath fountain — no wiring, just sun. The birds love it, and they pay you back by eating the pests.",
  },
};

/** Resolve a list of kit ids to products (skips any unknown ids). */
export function getKit(ids: string[]): KitProduct[] {
  return ids.map((id) => kit[id]).filter(Boolean);
}
