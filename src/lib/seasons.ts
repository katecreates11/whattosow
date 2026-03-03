/**
 * UK Micro-Seasons — inspired by the Japanese 72 kō
 *
 * 72 five-day periods, each named after an observable moment
 * in the UK allotment year. The homepage hero badge rotates
 * through these automatically.
 */

export interface MicroSeason {
  name: string;
  startMonth: number; // 0-indexed (0 = Jan)
  startDay: number;
  endMonth: number;
  endDay: number;
}

// prettier-ignore
const MICRO_SEASONS: MicroSeason[] = [
  // ── January ──────────────────────────────────────────────
  { name: "The ground rests under frost",        startMonth: 0, startDay: 1,  endMonth: 0, endDay: 5 },
  { name: "Seed catalogues land on the doormat", startMonth: 0, startDay: 6,  endMonth: 0, endDay: 10 },
  { name: "Starlings murmur at dusk",            startMonth: 0, startDay: 11, endMonth: 0, endDay: 15 },
  { name: "The shortest days are behind us",     startMonth: 0, startDay: 16, endMonth: 0, endDay: 20 },
  { name: "Bare branches frame the sky",         startMonth: 0, startDay: 21, endMonth: 0, endDay: 25 },
  { name: "The light returns after tea",          startMonth: 0, startDay: 26, endMonth: 0, endDay: 31 },

  // ── February ─────────────────────────────────────────────
  { name: "First snowdrops push through",         startMonth: 1, startDay: 1,  endMonth: 1, endDay: 5 },
  { name: "Robin claims the spade handle",        startMonth: 1, startDay: 6,  endMonth: 1, endDay: 10 },
  { name: "Hellebores bloom in the cold garden",  startMonth: 1, startDay: 11, endMonth: 1, endDay: 15 },
  { name: "Rhubarb crowns push through mulch",    startMonth: 1, startDay: 16, endMonth: 1, endDay: 20 },
  { name: "Hazel catkins dust the hedgerow",      startMonth: 1, startDay: 21, endMonth: 1, endDay: 25 },
  { name: "The soil softens after rain",          startMonth: 1, startDay: 26, endMonth: 1, endDay: 28 },

  // ── March ────────────────────────────────────────────────
  { name: "Daffodils open on south-facing banks", startMonth: 2, startDay: 1,  endMonth: 2, endDay: 5 },
  { name: "Frogs spawn in still water",           startMonth: 2, startDay: 6,  endMonth: 2, endDay: 10 },
  { name: "Broad beans break the surface",        startMonth: 2, startDay: 11, endMonth: 2, endDay: 15 },
  { name: "Blackbirds stake their territories",   startMonth: 2, startDay: 16, endMonth: 2, endDay: 20 },
  { name: "The clocks spring forward",            startMonth: 2, startDay: 21, endMonth: 2, endDay: 25 },
  { name: "The evenings stretch past teatime",    startMonth: 2, startDay: 26, endMonth: 2, endDay: 31 },

  // ── April ────────────────────────────────────────────────
  { name: "Bumblebees find the first blossom",    startMonth: 3, startDay: 1,  endMonth: 3, endDay: 5 },
  { name: "Garlic shoots stand like green soldiers", startMonth: 3, startDay: 6,  endMonth: 3, endDay: 10 },
  { name: "The last frost passes (most years)",   startMonth: 3, startDay: 11, endMonth: 3, endDay: 15 },
  { name: "Cherry blossom lines the path",        startMonth: 3, startDay: 16, endMonth: 3, endDay: 20 },
  { name: "Swallows arrive from the south",       startMonth: 3, startDay: 21, endMonth: 3, endDay: 25 },
  { name: "Seedlings crowd the windowsill",       startMonth: 3, startDay: 26, endMonth: 3, endDay: 30 },

  // ── May ──────────────────────────────────────────────────
  { name: "Apple blossom opens overnight",        startMonth: 4, startDay: 1,  endMonth: 4, endDay: 5 },
  { name: "Bluebells carpet the woodland floor",  startMonth: 4, startDay: 6,  endMonth: 4, endDay: 10 },
  { name: "The grass needs its first cut",        startMonth: 4, startDay: 11, endMonth: 4, endDay: 15 },
  { name: "Tender seedlings harden off outside",  startMonth: 4, startDay: 16, endMonth: 4, endDay: 20 },
  { name: "Cow parsley froths along the lane",    startMonth: 4, startDay: 21, endMonth: 4, endDay: 25 },
  { name: "Elderflower scents the hedgerow",      startMonth: 4, startDay: 26, endMonth: 4, endDay: 31 },

  // ── June ─────────────────────────────────────────────────
  { name: "Strawberries ripen in the sun",        startMonth: 5, startDay: 1,  endMonth: 5, endDay: 5 },
  { name: "Roses climb the shed wall",            startMonth: 5, startDay: 6,  endMonth: 5, endDay: 10 },
  { name: "The allotment stays light past nine",  startMonth: 5, startDay: 11, endMonth: 5, endDay: 15 },
  { name: "Peas fatten in their pods",            startMonth: 5, startDay: 16, endMonth: 5, endDay: 20 },
  { name: "The longest day barely gets dark",     startMonth: 5, startDay: 21, endMonth: 5, endDay: 25 },
  { name: "Lavender hums with bees",              startMonth: 5, startDay: 26, endMonth: 5, endDay: 30 },

  // ── July ─────────────────────────────────────────────────
  { name: "Courgettes appear faster than you can pick them", startMonth: 6, startDay: 1,  endMonth: 6, endDay: 5 },
  { name: "The first tomatoes blush on the vine", startMonth: 6, startDay: 6,  endMonth: 6, endDay: 10 },
  { name: "Blackbirds raid the currant bushes",   startMonth: 6, startDay: 11, endMonth: 6, endDay: 15 },
  { name: "Swifts scream above the rooftops",     startMonth: 6, startDay: 16, endMonth: 6, endDay: 20 },
  { name: "Runner beans reach the top of the canes", startMonth: 6, startDay: 21, endMonth: 6, endDay: 25 },
  { name: "The evening air smells of cut grass",  startMonth: 6, startDay: 26, endMonth: 6, endDay: 31 },

  // ── August ───────────────────────────────────────────────
  { name: "The evenings start to shorten",        startMonth: 7, startDay: 1,  endMonth: 7, endDay: 5 },
  { name: "Apples begin to swell on the branch",  startMonth: 7, startDay: 6,  endMonth: 7, endDay: 10 },
  { name: "Harvest gluts fill the kitchen table",  startMonth: 7, startDay: 11, endMonth: 7, endDay: 15 },
  { name: "Sunflowers turn to face the south",    startMonth: 7, startDay: 16, endMonth: 7, endDay: 20 },
  { name: "Sweetcorn tassels dry in the heat",    startMonth: 7, startDay: 21, endMonth: 7, endDay: 25 },
  { name: "The first blackberries darken",        startMonth: 7, startDay: 26, endMonth: 7, endDay: 31 },

  // ── September ────────────────────────────────────────────
  { name: "The first mist settles on the plot",   startMonth: 8, startDay: 1,  endMonth: 8, endDay: 5 },
  { name: "Spiders web the bean frame at dawn",   startMonth: 8, startDay: 6,  endMonth: 8, endDay: 10 },
  { name: "Pumpkins turn from green to gold",     startMonth: 8, startDay: 11, endMonth: 8, endDay: 15 },
  { name: "Swallows line up on the wire",         startMonth: 8, startDay: 16, endMonth: 8, endDay: 20 },
  { name: "The dahlias have their last blaze",    startMonth: 8, startDay: 21, endMonth: 8, endDay: 25 },
  { name: "Dew soaks your boots before breakfast", startMonth: 8, startDay: 26, endMonth: 8, endDay: 30 },

  // ── October ──────────────────────────────────────────────
  { name: "Leaves turn on the allotment birch",   startMonth: 9, startDay: 1,  endMonth: 9, endDay: 5 },
  { name: "Onions hang to cure in the shed",      startMonth: 9, startDay: 6,  endMonth: 9, endDay: 10 },
  { name: "The robin returns to the bare earth",  startMonth: 9, startDay: 11, endMonth: 9, endDay: 15 },
  { name: "Green tomatoes line the windowsill",   startMonth: 9, startDay: 16, endMonth: 9, endDay: 20 },
  { name: "Squash cures on the greenhouse bench", startMonth: 9, startDay: 21, endMonth: 9, endDay: 25 },
  { name: "The clocks go back and the plot goes dark", startMonth: 9, startDay: 26, endMonth: 9, endDay: 31 },

  // ── November ─────────────────────────────────────────────
  { name: "The first proper frost silvers the kale", startMonth: 10, startDay: 1,  endMonth: 10, endDay: 5 },
  { name: "Bonfire smoke drifts across the path", startMonth: 10, startDay: 6,  endMonth: 10, endDay: 10 },
  { name: "Fallen leaves mulch the empty beds",   startMonth: 10, startDay: 11, endMonth: 10, endDay: 15 },
  { name: "Garlic cloves go in before the cold",  startMonth: 10, startDay: 16, endMonth: 10, endDay: 20 },
  { name: "Bare soil waits under the grey sky",   startMonth: 10, startDay: 21, endMonth: 10, endDay: 25 },
  { name: "The last leeks stand firm in the frost", startMonth: 10, startDay: 26, endMonth: 10, endDay: 30 },

  // ── December ─────────────────────────────────────────────
  { name: "The plot sleeps under a dark sky",     startMonth: 11, startDay: 1,  endMonth: 11, endDay: 5 },
  { name: "Holly berries brighten the hedgerow",  startMonth: 11, startDay: 6,  endMonth: 11, endDay: 10 },
  { name: "Parsnips sweeten after the first hard frost", startMonth: 11, startDay: 11, endMonth: 11, endDay: 15 },
  { name: "The shed door freezes shut",           startMonth: 11, startDay: 16, endMonth: 11, endDay: 20 },
  { name: "The shortest day arrives",             startMonth: 11, startDay: 21, endMonth: 11, endDay: 25 },
  { name: "Next year's plot takes shape in the mind", startMonth: 11, startDay: 26, endMonth: 11, endDay: 31 },
];

/**
 * Find the current micro-season for a given date.
 * Falls back to the last entry if somehow no match (shouldn't happen).
 */
export function getCurrentMicroSeason(date?: Date): MicroSeason {
  const d = date ?? new Date();
  const month = d.getMonth();
  const day = d.getDate();

  for (const season of MICRO_SEASONS) {
    if (season.startMonth === season.endMonth) {
      if (month === season.startMonth && day >= season.startDay && day <= season.endDay) {
        return season;
      }
    } else {
      // Cross-month period (shouldn't occur in our data, but handle it)
      if (
        (month === season.startMonth && day >= season.startDay) ||
        (month === season.endMonth && day <= season.endDay)
      ) {
        return season;
      }
    }
  }

  // Fallback — return last entry
  return MICRO_SEASONS[MICRO_SEASONS.length - 1];
}

/**
 * Broad season name for a given date.
 * More granular than just "spring" — uses early/mid/late.
 */
export function getSeasonName(date?: Date): string {
  const d = date ?? new Date();
  const month = d.getMonth();
  const day = d.getDate();

  // Early = 1st–10th, mid = 11th–20th, late = 21st–end
  const phase = day <= 10 ? "early" : day <= 20 ? "mid" : "late";

  if (month === 11 || month === 0 || month === 1) {
    if (month === 11 && phase === "early") return "early winter";
    if (month === 1 && phase === "late") return "late winter";
    return "midwinter";
  }
  if (month >= 2 && month <= 4) {
    if (month === 2 && day <= 15) return "early spring";
    if (month === 4 && day >= 16) return "late spring";
    return "spring";
  }
  if (month >= 5 && month <= 7) {
    if (month === 5 && day <= 15) return "early summer";
    if (month === 7 && day >= 16) return "late summer";
    return "midsummer";
  }
  // month 8-10
  if (month === 8 && day <= 15) return "early autumn";
  if (month === 10 && day >= 16) return "late autumn";
  return "autumn";
}

/**
 * Seasonal accent colour for month pages.
 * Consolidated from sow/[month]/page.tsx.
 */
export function getSeasonalAccent(monthIdx: number): { text: string; label: string } {
  if (monthIdx >= 2 && monthIdx <= 4) return { text: "text-allotment", label: "Spring" };
  if (monthIdx >= 5 && monthIdx <= 7) return { text: "text-amber", label: "Summer" };
  if (monthIdx >= 8 && monthIdx <= 10) return { text: "text-tomato", label: "Autumn" };
  return { text: "text-frost", label: "Winter" };
}
