// The living guides index: score every guide by how much the plot needs it
// RIGHT NOW — this month, in this weather. Month data is deterministic (works
// with no API); live weather (frost, dry spells, blight pressure) sharpens it.
// Kit-carrying guides get a whisker of a nudge on ties: relevance first,
// revenue close behind.

import type { WeatherState } from "@/lib/weather-intelligence";

export interface NowConditions {
  month: number; // 0-indexed, Europe/London
  hotDry: boolean;
  frost: boolean;
  wet: boolean;
  blight: boolean;
  drySpellDays: number;
  desc: string; // short, for the section dateline
}

export function londonMonth(): number {
  return Number(new Intl.DateTimeFormat("en-GB", { month: "numeric", timeZone: "Europe/London" }).format(new Date())) - 1;
}

const SEASON_FALLBACK_DESC = [
  "midwinter", "late winter", "early spring", "spring", "late spring", "early summer",
  "high summer", "late summer", "early autumn", "autumn", "late autumn", "early winter",
];

/** Derive simple flags from live weather; graceful month-only fallback when the API is down. */
export function conditionsFrom(w: WeatherState | null): NowConditions {
  const month = londonMonth();
  if (!w) {
    return { month, hotDry: false, frost: false, wet: false, blight: false, drySpellDays: 0, desc: SEASON_FALLBACK_DESC[month] };
  }
  const hotDry = w.drySpell >= 3 || (w.temperatureMax >= 24 && w.rainForecast < 2);
  return {
    month,
    hotDry,
    frost: w.frostRisk,
    wet: w.recentRain && w.rainForecast >= 4,
    blight: w.blightRisk,
    drySpellDays: w.drySpell,
    desc: w.description.toLowerCase(),
  };
}

interface GuideMeta {
  months: number[]; // when this guide matters most (0-indexed)
  hotDry?: number;
  frost?: number;
  wet?: number;
  blight?: number;
  kit?: boolean; // carries affiliate-linked kit — breaks ties toward revenue
}

const META: Record<string, GuideMeta> = {
  "/guides/beginners": { months: [0, 1, 2, 3, 8] },
  "/guides/seed-starting": { months: [0, 1, 2, 3], kit: true },
  "/guides/soil": { months: [0, 1, 2, 10, 11] },
  "/guides/seed-starting-kit": { months: [0, 1, 2], kit: true },
  "/guides/allotment-essentials": { months: [0, 1, 2, 3, 4], kit: true },
  "/guides/composting": { months: [0, 8, 9, 10], kit: true },
  "/guides/growing-fruit": { months: [2, 5, 6, 7] },
  "/guides/companion-planting": { months: [3, 4, 5, 6] },
  "/guides/crop-rotation": { months: [0, 1, 10, 11] },
  "/guides/green-manures": { months: [7, 8, 9] },
  "/guides/sun-mapping": { months: [0, 1, 11] },
  "/guides/watering": { months: [4, 5, 6, 7], hotDry: 5, kit: true },
  "/guides/pests": { months: [4, 5, 6, 7], wet: 2 },
  "/guides/tomato-blight": { months: [6, 7, 8], blight: 6 },
  "/guides/spring-vegetables": { months: [1, 2, 3, 4] },
  "/guides/autumn-winter-vegetables": { months: [6, 7, 8, 9] },
  "/guides/what-to-sow-in-summer-uk": { months: [5, 6, 7] },
  "/guides/succession-sowing": { months: [3, 4, 5, 6, 7] },
  "/guides/growing-brassicas": { months: [4, 5, 6, 7] },
  "/guides/growing-tomatoes-outdoors-vs-greenhouse": { months: [3, 4, 5, 6, 7] },
  "/guides/growing-onions-garlic-leeks": { months: [2, 8, 9] },
  "/guides/growing-winter-salad-leaves": { months: [7, 8, 9] },
  "/guides/preparing-your-plot-for-winter": { months: [9, 10, 11] },
  "/guides/protecting-vegetables-from-frost": { months: [0, 1, 2, 9, 10, 11], frost: 6, kit: true },
  "/guides/overwintering-broad-beans-and-peas": { months: [9, 10] },
  "/guides/growing-root-vegetables": { months: [3, 4, 5, 8, 9] },
  "/guides/growing-squash-pumpkins-courgettes": { months: [4, 5, 8, 9] },
  "/guides/growing-veg-in-containers": { months: [3, 4, 5], hotDry: 1, kit: true },
  "/guides/companion-planting-chart": { months: [3, 4, 5] },
  "/guides/watering-while-away": { months: [6, 7], hotDry: 4, kit: true },
  "/guides/dealing-with-the-glut": { months: [7, 8] },
};

/** Higher = the plot needs this guide more right now. */
export function guideScore(href: string, c: NowConditions): number {
  const m = META[href];
  if (!m) return 0;
  let s = 0;
  if (m.months.includes(c.month)) s += 3;
  else if (m.months.includes((c.month + 1) % 12) || m.months.includes((c.month + 11) % 12)) s += 1;
  if (c.hotDry && m.hotDry) s += m.hotDry;
  if (c.frost && m.frost) s += m.frost;
  if (c.wet && m.wet) s += m.wet;
  if (c.blight && m.blight) s += m.blight;
  if (m.kit) s += 0.4; // relevance first; revenue breaks the tie
  return s;
}

/** The short honest reason a guide is being surfaced — shown as a chip. */
export function whyNow(href: string, c: NowConditions): string {
  const m = META[href];
  if (m?.blight && c.blight) return "Blight weather";
  if (m?.frost && c.frost) return "Frost forecast";
  if (m?.hotDry && c.hotDry) return c.drySpellDays >= 3 ? `Day ${c.drySpellDays} of a dry spell` : "Hot and dry";
  if (m?.wet && c.wet) return "Wet spell";
  if (m?.months.includes(c.month)) return "In season now";
  return "Coming into season";
}
