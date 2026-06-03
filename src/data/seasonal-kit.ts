/**
 * "Kit for the jobs ahead" — a small, honest seasonal edit of tools from the
 * central kit catalogue (kit.ts), keyed to the month's real jobs. Drives the
 * higher-value Amazon links (where the commission actually is) and gives the
 * Sow page + homepage a shoppable, magazine-style moment.
 *
 * Each entry references kit ids that already exist in kit.ts — no new products,
 * just a seasonal selection. Months are 0-indexed (0 = January).
 */

export interface SeasonalKitEntry {
  /** Short label, e.g. "June" — the month this edit is for. */
  month: string;
  /** Editorial intro in voice — what the weather's doing, what the jobs are. */
  intro: string;
  /** kit.ts ids, in the order they should appear. */
  kitIds: string[];
  /** Seasonal photo for the homepage teaser. */
  image?: string;
  imageAlt?: string;
}

const MONTHS: Record<number, SeasonalKitEntry> = {
  // May
  4: {
    month: "May",
    intro:
      "May is all hope and hardening off. The frosts are mostly behind us, the beans and courgettes are itching to go out, and the slugs are waiting for them. A week of moving plants from windowsill to soil, of staking and tying and tucking in — the kit that saves your knees and gives the climbers something to hold earns its keep now.",
    kitIds: ["kneeler", "pea-sticks", "plant-ties", "slug-killer"],
  },
  // June
  5: {
    month: "June",
    intro:
      "June is the month it all comes good. The soil is warm, the days are long, and everything you sow now simply wants to grow. A few small jobs make the difference between a patch that copes and one that thrives — keeping the water on as it warms, giving the peas and beans something to climb, and tying in the tomatoes before they topple. Here's the kit I find myself reaching for, week in, week out.",
    kitIds: ["watering-lance", "pea-netting", "plant-ties", "slug-killer"],
    image: "/photos/blog/watering-marigolds-nasturtiums.webp",
    imageAlt: "Watering marigolds and nasturtiums on the allotment with a long lance in the golden evening light",
  },
  // July
  6: {
    month: "July",
    intro:
      "July is watering season. The heat builds, the beds dry out by teatime, and the trick is getting water down to the roots rather than the leaves. It's also the month of the daily tie-in and the evening harvest — a length of twine and a good lance go a long way now.",
    kitIds: ["watering-lance", "twine", "plant-ties", "gloves"],
  },
};

/** Sensible year-round fallback — the things you always want to hand. */
const FALLBACK: SeasonalKitEntry = {
  month: "this season",
  intro:
    "A handful of things I'd not want to garden without — the quiet, useful kit that earns its place in the shed whatever the weather is doing.",
  kitIds: ["gloves", "kneeler", "twine", "labels"],
};

export function kitForMonth(month: number): SeasonalKitEntry {
  return MONTHS[month] ?? FALLBACK;
}
