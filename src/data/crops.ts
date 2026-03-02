export type CropCategory = "hardy" | "half-hardy" | "tender";

export type SowingMethod = "direct" | "indoors" | "both";

export interface Crop {
  name: string;
  slug: string;
  category: CropCategory;
  /** Weeks before (-) or after (+) last frost to sow indoors. null = don't sow indoors */
  sowIndoorsWeeks: number | null;
  /** Weeks before (-) or after (+) last frost to direct sow outdoors. null = don't direct sow */
  directSowWeeks: number | null;
  /** Weeks after last frost to plant out (transplant outdoors). null = direct sow only */
  plantOutWeeks: number | null;
  /** Weeks from sowing/planting to harvest */
  harvestWeeks: number;
  /** Quick growing tip */
  tip: string;
  /** What the crop needs in simple terms */
  needs: string;
  /** Spacing in cm */
  spacingCm: number;
  /** Crops that grow well alongside this one */
  companionPlants?: string[];
  /** Crops to keep apart from this one */
  avoidPlants?: string[];
}

export const crops: Crop[] = [
  // === HARDY (can go out before last frost) ===
  {
    name: "Broad beans",
    slug: "broad-beans",
    category: "hardy",
    sowIndoorsWeeks: -10,
    directSowWeeks: -8,
    plantOutWeeks: -4,
    harvestWeeks: 14,
    tip: "Pinch out the growing tips once the first pods form to discourage blackfly.",
    needs: "Sun or partial shade. Supports for taller varieties.",
    spacingCm: 23,
    companionPlants: ["Lettuce", "Spinach", "Carrots"],
    avoidPlants: ["Onion sets", "Garlic"],
  },
  {
    name: "Peas",
    slug: "peas",
    category: "hardy",
    sowIndoorsWeeks: -8,
    directSowWeeks: -6,
    plantOutWeeks: -3,
    harvestWeeks: 12,
    tip: "Sow every 3 weeks for a continuous harvest. Pick regularly to keep them producing.",
    needs: "Sun. Something to climb — sticks, netting, or a trellis.",
    spacingCm: 8,
    companionPlants: ["Carrots", "Radishes", "Turnips", "Sweetcorn"],
    avoidPlants: ["Onion sets", "Garlic"],
  },
  {
    name: "Lettuce",
    slug: "lettuce",
    category: "hardy",
    sowIndoorsWeeks: -6,
    directSowWeeks: -4,
    plantOutWeeks: -2,
    harvestWeeks: 8,
    tip: "Sow a short row every 2 weeks for continuous salad. Pick outer leaves to keep it going.",
    needs: "Partial shade in summer. Regular water.",
    spacingCm: 25,
    companionPlants: ["Radishes", "Carrots", "Spring onions", "Strawberries"],
  },
  {
    name: "Spinach",
    slug: "spinach",
    category: "hardy",
    sowIndoorsWeeks: null,
    directSowWeeks: -6,
    plantOutWeeks: null,
    harvestWeeks: 7,
    tip: "Bolts quickly in hot weather. Best in spring and autumn. Pick little and often.",
    needs: "Partial shade. Moist, rich soil.",
    spacingCm: 15,
    companionPlants: ["Broad beans", "Peas", "Strawberries"],
  },
  {
    name: "Radishes",
    slug: "radishes",
    category: "hardy",
    sowIndoorsWeeks: null,
    directSowWeeks: -4,
    plantOutWeeks: null,
    harvestWeeks: 4,
    tip: "The quickest crop you can grow. Sow between slower crops to use the space.",
    needs: "Sun or partial shade. Light soil.",
    spacingCm: 3,
    companionPlants: ["Lettuce", "Peas", "Carrots"],
  },
  {
    name: "Carrots",
    slug: "carrots",
    category: "hardy",
    sowIndoorsWeeks: null,
    directSowWeeks: -3,
    plantOutWeeks: null,
    harvestWeeks: 14,
    tip: "Sow thinly to avoid thinning (which attracts carrot fly). Cover with fleece.",
    needs: "Sun. Light, stone-free soil. No fresh manure.",
    spacingCm: 8,
    companionPlants: ["Onion sets", "Spring onions", "Leeks", "Lettuce"],
    avoidPlants: ["Dill"],
  },
  {
    name: "Beetroot",
    slug: "beetroot",
    category: "hardy",
    sowIndoorsWeeks: -4,
    directSowWeeks: -2,
    plantOutWeeks: 0,
    harvestWeeks: 9,
    tip: "Each seed cluster produces several seedlings — thin to the strongest. Leaves are edible too.",
    needs: "Sun or light shade. Any reasonable soil.",
    spacingCm: 10,
    companionPlants: ["Lettuce", "Onion sets"],
  },
  {
    name: "Onion sets",
    slug: "onion-sets",
    category: "hardy",
    sowIndoorsWeeks: null,
    directSowWeeks: -5,
    plantOutWeeks: null,
    harvestWeeks: 20,
    tip: "Push sets into the soil with the tip just showing. Easiest way to grow onions.",
    needs: "Full sun. Well-drained soil.",
    spacingCm: 10,
    companionPlants: ["Carrots", "Beetroot", "Lettuce"],
    avoidPlants: ["Peas", "Broad beans"],
  },
  {
    name: "Potatoes (early)",
    slug: "early-potatoes",
    category: "hardy",
    sowIndoorsWeeks: null,
    directSowWeeks: -5,
    plantOutWeeks: null,
    harvestWeeks: 11,
    tip: "Chit (sprout) seed potatoes on a windowsill before planting. Earth up as they grow.",
    needs: "Sun. Rich soil. Regular watering once flowers appear.",
    spacingCm: 30,
  },
  {
    name: "Kale",
    slug: "kale",
    category: "hardy",
    sowIndoorsWeeks: -6,
    directSowWeeks: -4,
    plantOutWeeks: -1,
    harvestWeeks: 10,
    tip: "Gets sweeter after a frost. One of the hardiest crops — can harvest all winter.",
    needs: "Sun or partial shade. Firm, fertile soil. Net against pigeons.",
    spacingCm: 45,
    companionPlants: ["Beetroot", "Onion sets"],
  },
  {
    name: "Parsnips",
    slug: "parsnips",
    category: "hardy",
    sowIndoorsWeeks: null,
    directSowWeeks: -4,
    plantOutWeeks: null,
    harvestWeeks: 18,
    tip: "Very slow to germinate (2-4 weeks). Use fresh seed every year. Sow radishes alongside to mark the row.",
    needs: "Sun. Deep, stone-free soil. Patience.",
    spacingCm: 15,
  },
  {
    name: "Spring onions",
    slug: "spring-onions",
    category: "hardy",
    sowIndoorsWeeks: null,
    directSowWeeks: -4,
    plantOutWeeks: null,
    harvestWeeks: 10,
    tip: "Sow little and often, every few weeks, for a continuous supply.",
    needs: "Sun or partial shade. Any soil.",
    spacingCm: 2,
  },
  {
    name: "Swiss chard",
    slug: "swiss-chard",
    category: "hardy",
    sowIndoorsWeeks: -4,
    directSowWeeks: -2,
    plantOutWeeks: 1,
    harvestWeeks: 9,
    tip: "Beautiful and productive. Pick outer leaves and it keeps going for months. Rainbow chard looks stunning.",
    needs: "Sun or partial shade. Moist soil.",
    spacingCm: 30,
  },
  {
    name: "Turnips",
    slug: "turnips",
    category: "hardy",
    sowIndoorsWeeks: null,
    directSowWeeks: -4,
    plantOutWeeks: null,
    harvestWeeks: 8,
    tip: "Harvest when golf-ball sized for the sweetest flavour. Quick-growing gap filler.",
    needs: "Sun or partial shade. Moist soil.",
    spacingCm: 15,
  },
  {
    name: "Leeks",
    slug: "leeks",
    category: "hardy",
    sowIndoorsWeeks: -12,
    directSowWeeks: null,
    plantOutWeeks: 2,
    harvestWeeks: 20,
    tip: "Drop seedlings into deep holes and just water in — no need to fill the hole. They'll fatten up.",
    needs: "Sun or partial shade. Rich, well-drained soil.",
    spacingCm: 15,
    companionPlants: ["Carrots", "Celery"],
  },
  {
    name: "Broccoli",
    slug: "broccoli",
    category: "hardy",
    sowIndoorsWeeks: -6,
    directSowWeeks: -4,
    plantOutWeeks: 0,
    harvestWeeks: 12,
    tip: "Calabrese types give a main head plus side shoots for weeks. Cut the main head first to encourage more.",
    needs: "Sun. Firm, fertile soil. Net against pigeons and cabbage white butterflies.",
    spacingCm: 45,
    companionPlants: ["Beetroot", "Onion sets", "Celery"],
    avoidPlants: ["Tomatoes", "Runner beans"],
  },
  {
    name: "Cabbage",
    slug: "cabbage",
    category: "hardy",
    sowIndoorsWeeks: -8,
    directSowWeeks: null,
    plantOutWeeks: -2,
    harvestWeeks: 16,
    tip: "Different varieties for each season — spring, summer, autumn, and winter types. Red cabbage is less bothered by caterpillars.",
    needs: "Sun. Firm, well-manured soil. Net against pigeons and butterflies.",
    spacingCm: 45,
    companionPlants: ["Onion sets", "Celery", "Beetroot"],
    avoidPlants: ["Tomatoes", "Runner beans"],
  },
  {
    name: "Cauliflower",
    slug: "cauliflower",
    category: "hardy",
    sowIndoorsWeeks: -8,
    directSowWeeks: null,
    plantOutWeeks: -1,
    harvestWeeks: 16,
    tip: "Fold outer leaves over the curd to keep it white. Cauliflower leaves are delicious too — don't throw them away.",
    needs: "Sun. Rich, firm soil. Consistent watering. The fussiest brassica.",
    spacingCm: 60,
    companionPlants: ["Celery", "Onion sets"],
    avoidPlants: ["Tomatoes"],
  },
  {
    name: "Brussels sprouts",
    slug: "brussels-sprouts",
    category: "hardy",
    sowIndoorsWeeks: -10,
    directSowWeeks: null,
    plantOutWeeks: -2,
    harvestWeeks: 24,
    tip: "Grow through summer, harvest from autumn through winter. Flavour improves after frost. Start early — they're slow.",
    needs: "Sun. Very firm, fertile soil. Stake tall plants against wind.",
    spacingCm: 60,
    companionPlants: ["Onion sets", "Beetroot"],
    avoidPlants: ["Tomatoes", "Runner beans"],
  },
  {
    name: "Garlic",
    slug: "garlic",
    category: "hardy",
    sowIndoorsWeeks: null,
    directSowWeeks: -26,
    plantOutWeeks: null,
    harvestWeeks: 36,
    tip: "Plant individual cloves Oct-Nov, pointed end up, 2.5cm deep. Garlic needs a cold period to form bulbs. Harvest when lower leaves yellow.",
    needs: "Full sun. Well-drained soil. No fresh manure. Very low maintenance.",
    spacingCm: 15,
    companionPlants: ["Carrots", "Beetroot", "Tomatoes"],
    avoidPlants: ["Peas", "Broad beans"],
  },
  {
    name: "Parsley",
    slug: "parsley",
    category: "hardy",
    sowIndoorsWeeks: -8,
    directSowWeeks: -4,
    plantOutWeeks: null,
    harvestWeeks: 10,
    tip: "Slow to germinate (3-4 weeks). Soak seeds overnight in warm water to speed things up. Flat-leaf has stronger flavour.",
    needs: "Sun or partial shade. Moist, rich soil. Grows well in pots.",
    spacingCm: 20,
    companionPlants: ["Tomatoes", "Carrots", "Broad beans"],
  },

  // === HALF-HARDY (need some protection) ===
  {
    name: "Sweetcorn",
    slug: "sweetcorn",
    category: "half-hardy",
    sowIndoorsWeeks: -5,
    directSowWeeks: 1,
    plantOutWeeks: 2,
    harvestWeeks: 14,
    tip: "Plant in a block (not a row) for wind pollination. Each plant gives you 1-2 cobs.",
    needs: "Full sun. Sheltered spot. Rich soil.",
    spacingCm: 45,
    companionPlants: ["Squash", "French beans", "Pumpkins"],
  },
  {
    name: "Courgettes",
    slug: "courgettes",
    category: "half-hardy",
    sowIndoorsWeeks: -4,
    directSowWeeks: 1,
    plantOutWeeks: 2,
    harvestWeeks: 8,
    tip: "You only need 2-3 plants. Seriously. Pick them small (15cm) or they turn into marrows overnight.",
    needs: "Full sun. Rich soil. Lots of water.",
    spacingCm: 90,
    companionPlants: ["Sweetcorn", "French beans"],
  },
  {
    name: "French beans",
    slug: "french-beans",
    category: "half-hardy",
    sowIndoorsWeeks: -3,
    directSowWeeks: 1,
    plantOutWeeks: 2,
    harvestWeeks: 9,
    tip: "Dwarf varieties need no support. Pick every few days to keep them cropping.",
    needs: "Sun. Sheltered spot. Decent soil.",
    spacingCm: 15,
    companionPlants: ["Sweetcorn", "Squash", "Carrots"],
  },
  {
    name: "Squash",
    slug: "squash",
    category: "half-hardy",
    sowIndoorsWeeks: -4,
    directSowWeeks: null,
    plantOutWeeks: 2,
    harvestWeeks: 16,
    tip: "Big hungry plants. Give them space and feed them. Leave to cure in the sun before storing.",
    needs: "Full sun. Rich soil. Space — they spread.",
    spacingCm: 90,
    companionPlants: ["Sweetcorn", "French beans"],
  },
  {
    name: "Pumpkins",
    slug: "pumpkins",
    category: "half-hardy",
    sowIndoorsWeeks: -4,
    directSowWeeks: null,
    plantOutWeeks: 2,
    harvestWeeks: 18,
    tip: "Limit each plant to 2-3 fruits for bigger pumpkins. Sit them on a tile to stop rot.",
    needs: "Full sun. Very rich soil. Lots of water.",
    spacingCm: 120,
    companionPlants: ["Sweetcorn", "French beans"],
  },
  {
    name: "Coriander",
    slug: "coriander",
    category: "half-hardy",
    sowIndoorsWeeks: -4,
    directSowWeeks: 0,
    plantOutWeeks: null,
    harvestWeeks: 6,
    tip: "Sow every 3-4 weeks for a continuous supply. Pick frequently to delay bolting. Choose slow-bolt varieties for leaf production.",
    needs: "Partial shade in summer. Moist soil. Grows well in pots.",
    spacingCm: 15,
    companionPlants: ["Tomatoes", "Spinach"],
  },
  {
    name: "Rocket",
    slug: "rocket",
    category: "half-hardy",
    sowIndoorsWeeks: -4,
    directSowWeeks: -2,
    plantOutWeeks: null,
    harvestWeeks: 4,
    tip: "Very easy and fast. Sow regularly Feb-Oct. Gets spicier in hot weather. Pick leaves small for salads.",
    needs: "Partial shade in summer to slow bolting. Any reasonable soil.",
    spacingCm: 15,
    companionPlants: ["Lettuce", "Spinach"],
  },
  {
    name: "Pak choi",
    slug: "pak-choi",
    category: "half-hardy",
    sowIndoorsWeeks: -4,
    directSowWeeks: 1,
    plantOutWeeks: 0,
    harvestWeeks: 6,
    tip: "Best sown in early spring or after midsummer — bolts quickly in heat. Fast-growing and very rewarding.",
    needs: "Partial shade. Moist soil. Protection from slugs.",
    spacingCm: 25,
    companionPlants: ["Onion sets", "Garlic"],
  },
  {
    name: "Fennel",
    slug: "fennel",
    category: "half-hardy",
    sowIndoorsWeeks: -4,
    directSowWeeks: 1,
    plantOutWeeks: 2,
    harvestWeeks: 14,
    tip: "Sow after midsummer for best bulbs — earlier sowings often bolt. Don't transplant bare-root, it hates root disturbance.",
    needs: "Full sun. Well-drained, fertile soil. Regular water.",
    spacingCm: 30,
    avoidPlants: ["Tomatoes", "Carrots"],
  },
  {
    name: "Celery",
    slug: "celery",
    category: "half-hardy",
    sowIndoorsWeeks: -10,
    directSowWeeks: null,
    plantOutWeeks: 2,
    harvestWeeks: 18,
    tip: "Sow seeds on the surface — they need light to germinate. Start early in a propagator. Cutting celery is easier than trench celery.",
    needs: "Sun or partial shade. Rich, moist soil. Regular watering and feeding.",
    spacingCm: 25,
    companionPlants: ["Leeks", "Cabbage", "Cauliflower"],
  },
  {
    name: "Dill",
    slug: "dill",
    category: "half-hardy",
    sowIndoorsWeeks: null,
    directSowWeeks: 1,
    plantOutWeeks: null,
    harvestWeeks: 8,
    tip: "Sow direct — dill hates transplanting. Sow short rows every few weeks for continuous supply. Grows to 90cm tall.",
    needs: "Full sun. Sheltered spot. Well-drained soil.",
    spacingCm: 25,
    companionPlants: ["Lettuce", "Cucumbers"],
    avoidPlants: ["Carrots"],
  },

  // === TENDER (need warmth, start indoors) ===
  {
    name: "Tomatoes",
    slug: "tomatoes",
    category: "tender",
    sowIndoorsWeeks: -8,
    directSowWeeks: null,
    plantOutWeeks: 2,
    harvestWeeks: 12,
    tip: "Pinch out side shoots on cordon types. Feed weekly once fruits form. Don't overwater.",
    needs: "Full sun. Sheltered. Rich soil. Regular feeding.",
    spacingCm: 45,
    companionPlants: ["Basil", "Parsley", "Carrots", "Garlic"],
    avoidPlants: ["Broccoli", "Cabbage", "Cauliflower", "Fennel"],
  },
  {
    name: "Peppers",
    slug: "peppers",
    category: "tender",
    sowIndoorsWeeks: -10,
    directSowWeeks: null,
    plantOutWeeks: 3,
    harvestWeeks: 14,
    tip: "Start early — they're slow. Pinch out the first flower to encourage bushier growth.",
    needs: "Full sun. Warmth. Sheltered spot or greenhouse.",
    spacingCm: 45,
    companionPlants: ["Basil", "Tomatoes", "Carrots"],
  },
  {
    name: "Chillies",
    slug: "chillies",
    category: "tender",
    sowIndoorsWeeks: -10,
    directSowWeeks: null,
    plantOutWeeks: 3,
    harvestWeeks: 16,
    tip: "Need heat to germinate — use a propagator or warm windowsill. The more sun, the hotter the chilli.",
    needs: "Full sun. Warmth. Sheltered or under cover.",
    spacingCm: 40,
  },
  {
    name: "Cucumbers",
    slug: "cucumbers",
    category: "tender",
    sowIndoorsWeeks: -5,
    directSowWeeks: null,
    plantOutWeeks: 3,
    harvestWeeks: 10,
    tip: "Outdoor varieties are tougher than greenhouse ones. Keep picking to keep them producing.",
    needs: "Sun. Shelter. Rich moist soil.",
    spacingCm: 45,
    companionPlants: ["Dill", "Lettuce", "Peas"],
  },
  {
    name: "Runner beans",
    slug: "runner-beans",
    category: "tender",
    sowIndoorsWeeks: -4,
    directSowWeeks: 1,
    plantOutWeeks: 2,
    harvestWeeks: 11,
    tip: "Build a strong frame — they get heavy. Pick every 2-3 days or they go stringy.",
    needs: "Sun. Deep rich soil. A tall support frame.",
    spacingCm: 15,
    companionPlants: ["Sweetcorn", "Squash"],
    avoidPlants: ["Broccoli", "Cabbage"],
  },
  {
    name: "Aubergine",
    slug: "aubergine",
    category: "tender",
    sowIndoorsWeeks: -10,
    directSowWeeks: null,
    plantOutWeeks: 3,
    harvestWeeks: 18,
    tip: "Start very early. Limit to 5-6 fruits per plant for decent-sized aubergines.",
    needs: "Full sun. Warmth. Best under cover in most of the UK.",
    spacingCm: 60,
    companionPlants: ["Peppers", "Tomatoes"],
  },
  {
    name: "Basil",
    slug: "basil",
    category: "tender",
    sowIndoorsWeeks: -6,
    directSowWeeks: 2,
    plantOutWeeks: 2,
    harvestWeeks: 8,
    tip: "Pinch out flower buds to keep leaves coming. Harvest from the top to encourage bushy growth. Loves heat.",
    needs: "Full sun. Warmth. Sheltered spot. Rich, moist soil. Perfect for pots.",
    spacingCm: 20,
    companionPlants: ["Tomatoes", "Peppers"],
  },
];

export function getCropsByAction(
  crops: Crop[],
  currentDate: Date,
  lastFrostDate: Date
): {
  sowIndoorsNow: Crop[];
  directSowNow: Crop[];
  plantOutNow: Crop[];
  comingSoon: { crop: Crop; action: string; inWeeks: number }[];
  tooLate: Crop[];
} {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksToFrost = (lastFrostDate.getTime() - currentDate.getTime()) / msPerWeek;
  const weeksAfterFrost = -weeksToFrost;

  const sowIndoorsNow: Crop[] = [];
  const directSowNow: Crop[] = [];
  const plantOutNow: Crop[] = [];
  const comingSoon: { crop: Crop; action: string; inWeeks: number }[] = [];
  const tooLate: Crop[] = [];

  const windowWeeks = 3; // "now" = within a 3-week window

  for (const crop of crops) {
    let addedToNow = false;

    // Check sow indoors
    if (crop.sowIndoorsWeeks !== null) {
      const targetWeek = -crop.sowIndoorsWeeks; // weeks before frost as positive
      const currentWeeksBefore = weeksToFrost;
      const diff = currentWeeksBefore - targetWeek;

      if (diff >= -windowWeeks && diff <= windowWeeks) {
        sowIndoorsNow.push(crop);
        addedToNow = true;
      } else if (diff < -windowWeeks && diff > -(windowWeeks + 6)) {
        comingSoon.push({
          crop,
          action: "Sow indoors",
          inWeeks: Math.round(Math.abs(diff) - windowWeeks),
        });
      }
    }

    // Check direct sow
    if (crop.directSowWeeks !== null) {
      const targetWeeksBeforeFrost = -crop.directSowWeeks;
      const diff = weeksToFrost - targetWeeksBeforeFrost;

      if (diff >= -windowWeeks && diff <= windowWeeks) {
        if (!addedToNow) directSowNow.push(crop);
        addedToNow = true;
      } else if (diff < -windowWeeks && diff > -(windowWeeks + 6)) {
        comingSoon.push({
          crop,
          action: "Direct sow",
          inWeeks: Math.round(Math.abs(diff) - windowWeeks),
        });
      }
    }

    // Check plant out
    if (crop.plantOutWeeks !== null) {
      const diff = weeksAfterFrost - crop.plantOutWeeks;

      if (diff >= -windowWeeks && diff <= windowWeeks) {
        plantOutNow.push(crop);
        addedToNow = true;
      } else if (diff < -windowWeeks && diff > -(windowWeeks + 6)) {
        comingSoon.push({
          crop,
          action: "Plant out",
          inWeeks: Math.round(Math.abs(diff) - windowWeeks),
        });
      }
    }

    // Check if we've passed all windows for this crop
    if (!addedToNow) {
      const latestWindow = Math.max(
        crop.sowIndoorsWeeks !== null ? crop.sowIndoorsWeeks + windowWeeks : -999,
        crop.directSowWeeks !== null ? crop.directSowWeeks + windowWeeks : -999,
        crop.plantOutWeeks !== null ? crop.plantOutWeeks + windowWeeks : -999
      );
      if (weeksAfterFrost > latestWindow + 6) {
        tooLate.push(crop);
      }
    }
  }

  // Sort coming soon by soonest first
  comingSoon.sort((a, b) => a.inWeeks - b.inWeeks);

  // Deduplicate coming soon (keep earliest action per crop)
  const seen = new Set<string>();
  const dedupedComingSoon = comingSoon.filter((item) => {
    if (seen.has(item.crop.slug)) return false;
    seen.add(item.crop.slug);
    return true;
  });

  return {
    sowIndoorsNow,
    directSowNow,
    plantOutNow,
    comingSoon: dedupedComingSoon.slice(0, 8),
    tooLate,
  };
}
