/**
 * Almanac whispers — small dated lines for the masthead dateline
 * (docs/plans/homepage-charm-watering-2026-07.md, "small touches").
 * At most ONE shows at a time, only on (or around) its day. Lowercase,
 * mono register, in voice — a murmur, never a banner.
 */

export interface AlmanacEntry {
  /** 1-indexed month. */
  month: number;
  day: number;
  /** How many days the whisper lingers after its date (default 0 = that day only). */
  lingerDays?: number;
  text: string;
}

export const ALMANAC: AlmanacEntry[] = [
  { month: 1, day: 1, lingerDays: 5, text: "new year — the seed catalogues are the best fiction of the season" },
  { month: 1, day: 25, text: "deep midwinter, but the light's coming back a hand-width a week" },
  { month: 2, day: 2, lingerDays: 2, text: "candlemas — snowdrops out, half the winter's cold still to come, says the old rhyme" },
  { month: 3, day: 1, lingerDays: 1, text: "st david's day — daffodils, and permission to believe in spring" },
  { month: 3, day: 20, lingerDays: 1, text: "the spring equinox — day and night level, and it's all uphill light from here" },
  { month: 4, day: 1, text: "april — trust no forecast and keep the fleece handy" },
  { month: 5, day: 1, lingerDays: 1, text: "may day — the old markers say the soil is waking properly now" },
  { month: 5, day: 20, lingerDays: 6, text: "chelsea week — time for the chelsea chop, if your perennials are getting ideas" },
  { month: 6, day: 21, lingerDays: 2, text: "the longest day — sunlight to spare; spend it outside" },
  { month: 7, day: 15, lingerDays: 1, text: "st swithin's day — watch the sky; forty days of it, the story goes" },
  { month: 8, day: 1, lingerDays: 1, text: "lammas — the old festival of first harvest, and the plot agrees" },
  { month: 9, day: 22, lingerDays: 1, text: "the autumn equinox — the light and the garden both begin to fold away" },
  { month: 9, day: 29, text: "michaelmas — the traditional end of the harvest, daisies included" },
  { month: 10, day: 31, text: "the pumpkins' one big night of the year" },
  { month: 11, day: 5, text: "bonfire night — a good frost often follows a clear one; check the tender things" },
  { month: 12, day: 21, lingerDays: 2, text: "the shortest day — from tomorrow, the garden starts leaning back towards the sun" },
  { month: 12, day: 25, text: "christmas day — the parsnips waited all year for this" },
  { month: 12, day: 26, text: "boxing day — the old growers sow their exhibition onions today" },
];

/** The whisper for a date, if any — first match wins, one at a time. */
export function almanacWhisper(date: Date): string | null {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  for (const e of ALMANAC) {
    const linger = e.lingerDays ?? 0;
    if (m === e.month && d >= e.day && d <= e.day + linger) return e.text;
  }
  return null;
}
