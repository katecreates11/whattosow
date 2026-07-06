/**
 * The Week's List — a year of editorial copy for the homepage seasonal section
 * (see docs/plans/seasonal-answer-redesign-2026-07.md). One entry per month:
 * a standfirst in voice, "the pick" (the editor's one crop, human-written —
 * this line IS the charm), and micro-notes for a FEW crops only (three notes
 * is editing, ten is a database).
 *
 * Written July 2026 so the section stays warm all year. Months are 0-indexed.
 */

export interface WeeklyPick {
  /** Crop slug for the link; the pick renders even if the engine disagrees. */
  slug: string;
  name: string;
  /** The one sentence of conviction. */
  line: string;
}

export interface WeeklyListEntry {
  /** 1–2 sentences, weather-adjacent, never evergreen-neutral. */
  standfirst: string;
  pick: WeeklyPick;
  /** Optional per-crop micro-notes, keyed by crop slug. Keep to 2–3. */
  notes?: Record<string, string>;
}

const MONTHS: Record<number, WeeklyListEntry> = {
  0: {
    standfirst:
      "January sowing is mostly patience with a packet in your hand — but not entirely. A heated windowsill is already spring for the slow starters, and the seed order you make this month decides the whole year.",
    pick: {
      slug: "chillies",
      name: "Chillies",
      line: "If you sow one thing this month: chillies — they need every week of run-up they can get, and a January sowing on a warm windowsill is what August's full plants are made of.",
    },
    notes: {
      chillies: "somewhere properly warm — an airing cupboard works until they're up",
      "broad-beans": "in pots under cover if the mice have found your November row",
    },
  },
  1: {
    standfirst:
      "February is the tease — one kind afternoon and every gardener in the country starts pacing. Hold your nerve: the light is coming back faster now, and the few things worth sowing this month genuinely want the head start.",
    pick: {
      slug: "broad-beans",
      name: "Broad beans",
      line: "If you sow one thing this month: broad beans — tough as old boots, up in a fortnight, and the first proper crop of the year while everything else is still thinking about it.",
    },
    notes: {
      tomatoes: "late Feb at the earliest — light, not warmth, is what they're short of",
      "onion-sets": "heel them into modules under cover and they're away before the beds are ready",
    },
  },
  2: {
    standfirst:
      "March is when the year properly starts — the soil smells different, the windowsills fill up, and everything you sow now arrives at the table before you've quite forgiven February. Little and often beats one heroic weekend.",
    pick: {
      slug: "tomatoes",
      name: "Tomatoes",
      line: "If you sow one thing this month: tomatoes — a March sowing on a bright windowsill catches up with every fancier setup by June, and the whole summer hangs off it.",
    },
    notes: {
      carrots: "the first row under fleece if your soil's workable — a gamble worth a metre",
      lettuce: "start the succession habit now: a short row every fortnight from here on",
    },
  },
  3: {
    standfirst:
      "April is all acceleration — soil warming, light stretching, and half the seed box suddenly in play at once. Sow in short rows, label everything, and keep a sheet of fleece handy for the nights that forget it's spring.",
    pick: {
      slug: "carrots",
      name: "Carrots",
      line: "If you sow one thing this month: carrots — April's fine, warming soil is exactly what they want, and a row sown now is sweet and finger-thick by July.",
    },
    notes: {
      beetroot: "soak the seed an hour first and it comes up days earlier",
      courgettes: "indoors, one seed to a pot — and fewer pots than you think",
    },
  },
  4: {
    standfirst:
      "May is hope and hardening off — the frosts are nearly done, the cold frame is full, and the tender things are queuing at the door. Watch your local frost date, not the calendar; one cold night undoes a windowsill's worth of care.",
    pick: {
      slug: "french-beans",
      name: "French beans",
      line: "If you sow one thing this month: French beans — push them into warm soil after the last frost and they repay a minute's work with a month of picking.",
    },
    notes: {
      sweetcorn: "in a block, never a row — it pollinates on the wind",
      "runner-beans": "build the frame before the beans need it, not after",
    },
  },
  5: {
    standfirst:
      "June is the month the whole year leans towards — warm soil, long light, and everything sown now simply gets on with it. The trick this month is succession: keep the short rows coming, because July's table is sown in June.",
    pick: {
      slug: "courgettes",
      name: "Courgettes",
      line: "If you sow one thing this month: a courgette, straight into warm soil — June-sown plants romp away and crop within weeks of their pampered April cousins.",
    },
    notes: {
      beetroot: "a June row gives tender roots through autumn — the best sowing of the lot",
      lettuce: "sow somewhere shadier now; full June sun bolts it",
    },
  },
  6: {
    standfirst:
      "Midsummer sowing is a race you can still win — quick roots, fast salads and one last go at the beans. Everything below, sown this week, makes the table before the cold.",
    pick: {
      slug: "french-beans",
      name: "Dwarf French beans",
      line: "If you sow one thing this week: dwarf French beans — two minutes poking seeds into warm soil now, three weeks of picking come September.",
    },
    notes: {
      carrots: "a quick early sort like Nantes — after mid-July the maths stops working",
      "spring-onions": "sown now they stand through winter and open next year's salad season",
    },
  },
  7: {
    standfirst:
      "August sowing is a quiet act of faith — the plot is loud with harvest, but the gaps the garlic and potatoes left behind are next spring's opportunity. Everything sown now is a present for the hungrier months.",
    pick: {
      slug: "spinach",
      name: "Winter spinach",
      line: "If you sow one thing this month: winter spinach — sown into August's warm soil it establishes fast, stands through the cold, and feeds you when the plot has little else to say.",
    },
    notes: {
      lettuce: "switch to the hardy winter sorts now — they earn their keep till spring",
      "spring-onions": "one more row before the month's out",
    },
  },
  8: {
    standfirst:
      "September's sowings are small and stubborn — the light is leaving, but a handful of hardy things sown now will sit tight through winter and be first out of the blocks in spring. The rest of the month belongs to the harvest.",
    pick: {
      slug: "lettuce",
      name: "Winter lettuce",
      line: "If you sow one thing this month: winter lettuce — a row under a cloche now picks as leaves right through the dark months, when a fresh salad feels like a small miracle.",
    },
    notes: {
      spinach: "still time in the south, first week or two",
    },
  },
  9: {
    standfirst:
      "October is planting weather more than sowing weather — cool, damp, and perfect for the things that want winter under their belts. The soil still holds summer's warmth; the garlic knows it.",
    pick: {
      slug: "garlic",
      name: "Garlic",
      line: "If you plant one thing this month: garlic — break a bulb, push the cloves in pointy-end up, and forget about them; the cold does the clever part, and July hands you back ten bulbs for one.",
    },
    notes: {
      "onion-sets": "overwintering sets in now, before the beds go properly cold",
    },
  },
  10: {
    standfirst:
      "November asks very little, which is its charm — one hardy sowing, some tidying, and permission to plan. Anything you get in the ground this month is quietly winning while you're indoors.",
    pick: {
      slug: "broad-beans",
      name: "Broad beans",
      line: "If you sow one thing this month: broad beans — an Aquadulce row sown now stands the winter like a guardsman and crops weeks before any spring sowing.",
    },
    notes: {
      garlic: "still fine to plant — it wants a good spell of cold and there's plenty coming",
    },
  },
  11: {
    standfirst:
      "December's sowing list is one line long, and that's as it should be — the plot is asleep, the seed catalogues are out, and the most productive thing on the bench is a cup of tea and next year's plan.",
    pick: {
      slug: "onion-sets",
      name: "Onions",
      line: "If you sow one thing this month: onions from seed on Boxing Day — the old exhibition growers' tradition, and a lovely excuse to slip out to the potting shed while the house sleeps off lunch.",
    },
  },
};

export function weeklyListForMonth(month: number): WeeklyListEntry {
  return MONTHS[month] ?? MONTHS[6];
}
