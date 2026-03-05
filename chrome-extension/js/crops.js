/**
 * Crop data and recommendation engine — ported from src/data/crops.ts
 * Includes inline SVG icon strings for ~21 crops.
 */

// Shared SVG attributes for icons
const S = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';

/**
 * Inline SVG strings for crop icons, keyed by slug.
 * Returns an SVG string or null.
 */
export const cropIcons = {
  tomatoes: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12,5 C10,2 11,1 13,1" stroke="#3D7A52" stroke-width="2"/><ellipse cx="12" cy="13" rx="8" ry="7.5" stroke="#C9543E" stroke-width="2"/></svg>`,
  carrots: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12,7 L9,22 L15,22 Z" stroke="#D4943A" stroke-width="2"/><path d="M12,7 C9,2 7,3 9,6" stroke="#7BB369" stroke-width="2"/><path d="M12,7 C15,2 17,3 15,6" stroke="#7BB369" stroke-width="2"/></svg>`,
  peas: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M4,12 Q12,4 20,12 Q12,20 4,12" stroke="#7BB369" stroke-width="2"/><circle cx="9" cy="12" r="2.5" stroke="#3D7A52" stroke-width="1.5"/><circle cx="15" cy="12" r="2.5" stroke="#3D7A52" stroke-width="1.5"/></svg>`,
  lettuce: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12,20 C6,20 3,16 4,12 C2,10 3,6 6,5 C7,2 11,1 12,3 C13,1 17,2 18,5 C21,6 22,10 20,12 C21,16 18,20 12,20Z" stroke="#7BB369" stroke-width="2"/><path d="M12,20 L12,10" stroke="#3D7A52" stroke-width="1.5"/></svg>`,
  "broad-beans": `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M9,3 Q4,12 9,21 Q12,23 15,21 Q20,12 15,3 Q12,1 9,3" stroke="#7BB369" stroke-width="2"/><ellipse cx="12" cy="10" rx="2.5" ry="3" stroke="#3D7A52" stroke-width="1.5"/></svg>`,
  "runner-beans": `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M8,2 Q5,12 8,22" stroke="#3D7A52" stroke-width="2"/><path d="M8,8 C12,6 16,8 14,12" stroke="#7BB369" stroke-width="2"/><path d="M8,14 C12,12 16,14 14,18" stroke="#7BB369" stroke-width="2"/></svg>`,
  courgettes: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><ellipse cx="12" cy="13" rx="5" ry="9" stroke="#3D7A52" stroke-width="2"/><path d="M12,4 C10,2 11,0 13,1" stroke="#7BB369" stroke-width="2"/></svg>`,
  "early-potatoes": `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><ellipse cx="12" cy="13" rx="9" ry="7" stroke="#D4943A" stroke-width="2"/><circle cx="9" cy="11" r="1" stroke="#9A8D85" stroke-width="1.5"/><circle cx="14" cy="10" r="1" stroke="#9A8D85" stroke-width="1.5"/><circle cx="11" cy="15" r="1" stroke="#9A8D85" stroke-width="1.5"/></svg>`,
  broccoli: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12,22 L12,12" stroke="#3D7A52" stroke-width="2"/><circle cx="12" cy="8" r="5" stroke="#3D7A52" stroke-width="2"/><circle cx="8" cy="9" r="3" stroke="#7BB369" stroke-width="1.5"/><circle cx="16" cy="9" r="3" stroke="#7BB369" stroke-width="1.5"/><circle cx="12" cy="5" r="3" stroke="#7BB369" stroke-width="1.5"/></svg>`,
  cabbage: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><circle cx="12" cy="13" r="8" stroke="#7BB369" stroke-width="2"/><path d="M8,11 Q12,7 16,11" stroke="#3D7A52" stroke-width="1.5"/><path d="M9,14 Q12,10 15,14" stroke="#3D7A52" stroke-width="1.5"/></svg>`,
  cauliflower: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M6,16 Q4,12 6,10 Q7,6 12,5 Q17,6 18,10 Q20,12 18,16" stroke="#7BB369" stroke-width="2"/><circle cx="10" cy="10" r="2.5" stroke="#F5EFE0" stroke-width="1.5"/><circle cx="14" cy="10" r="2.5" stroke="#F5EFE0" stroke-width="1.5"/><circle cx="12" cy="13" r="2.5" stroke="#F5EFE0" stroke-width="1.5"/></svg>`,
  "brussels-sprouts": `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12,3 L12,21" stroke="#3D7A52" stroke-width="2"/><circle cx="10" cy="8" r="2.5" stroke="#7BB369" stroke-width="1.5"/><circle cx="14" cy="12" r="2.5" stroke="#7BB369" stroke-width="1.5"/><circle cx="10" cy="16" r="2.5" stroke="#7BB369" stroke-width="1.5"/><path d="M12,3 C10,1 8,2 9,4" stroke="#7BB369" stroke-width="1.5"/><path d="M12,3 C14,1 16,2 15,4" stroke="#7BB369" stroke-width="1.5"/></svg>`,
  garlic: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12,3 L12,7" stroke="#7BB369" stroke-width="2"/><path d="M8,10 Q8,7 12,7 Q16,7 16,10 Q16,20 12,22 Q8,20 8,10" stroke="#D4943A" stroke-width="2"/><path d="M12,7 L12,16" stroke="#D4943A" stroke-width="1.5"/></svg>`,
  parsley: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12,22 L12,10" stroke="#3D7A52" stroke-width="2"/><path d="M12,10 C8,6 4,6 5,2 C9,3 10,6 12,10" stroke="#7BB369" stroke-width="2"/><path d="M12,10 C16,6 20,6 19,2 C15,3 14,6 12,10" stroke="#7BB369" stroke-width="2"/></svg>`,
  coriander: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12,22 L12,8" stroke="#3D7A52" stroke-width="2"/><path d="M12,8 C8,4 6,2 8,1" stroke="#7BB369" stroke-width="1.5"/><path d="M12,8 C12,3 11,1 12,0" stroke="#7BB369" stroke-width="1.5"/><path d="M12,8 C16,4 18,2 16,1" stroke="#7BB369" stroke-width="1.5"/></svg>`,
  rocket: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12,22 L12,6" stroke="#3D7A52" stroke-width="2"/><path d="M12,6 C8,4 5,6 6,10 L12,8 L18,10 C19,6 16,4 12,6" stroke="#7BB369" stroke-width="2"/></svg>`,
  "pak-choi": `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M8,22 Q6,14 8,10 Q10,6 12,4 Q14,6 16,10 Q18,14 16,22" stroke="#7BB369" stroke-width="2"/><path d="M10,22 Q10,14 12,8 Q14,14 14,22" stroke="#F5EFE0" stroke-width="2"/></svg>`,
  fennel: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><ellipse cx="12" cy="18" rx="6" ry="4" stroke="#7BB369" stroke-width="2"/><path d="M12,14 L12,4" stroke="#3D7A52" stroke-width="2"/><path d="M12,6 C8,2 6,1 7,0" stroke="#7BB369" stroke-width="1.5"/><path d="M12,6 C16,2 18,1 17,0" stroke="#7BB369" stroke-width="1.5"/></svg>`,
  celery: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M9,22 L9,8 C9,4 10,2 11,1" stroke="#7BB369" stroke-width="2"/><path d="M12,22 L12,6 C12,3 12,1 12,0" stroke="#3D7A52" stroke-width="2"/><path d="M15,22 L15,8 C15,4 14,2 13,1" stroke="#7BB369" stroke-width="2"/></svg>`,
  basil: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12,22 L12,10" stroke="#3D7A52" stroke-width="2"/><path d="M12,10 C8,8 6,4 8,2 C10,3 11,6 12,10" stroke="#7BB369" stroke-width="2"/><path d="M12,10 C16,8 18,4 16,2 C14,3 13,6 12,10" stroke="#7BB369" stroke-width="2"/></svg>`,
  dill: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12,22 L12,4" stroke="#3D7A52" stroke-width="2"/><path d="M12,4 C9,2 8,1 9,0" stroke="#7BB369" stroke-width="1.5"/><path d="M12,4 C15,2 16,1 15,0" stroke="#7BB369" stroke-width="1.5"/><path d="M12,4 L12,1" stroke="#7BB369" stroke-width="1.5"/></svg>`,
};

/** Generic seedling SVG for crops without a dedicated icon */
export const seedlingIcon = `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12,22 L12,12" stroke="#3D7A52" stroke-width="2"/><path d="M12,14 C8,10 7,6 10,4 C12,6 12,10 12,14" stroke="#7BB369" stroke-width="2"/><path d="M12,12 C16,8 17,4 14,2 C12,4 12,8 12,12" stroke="#A8D49A" stroke-width="2"/></svg>`;

/**
 * Get the SVG icon string for a crop slug.
 */
export function getCropIconSvg(slug) {
  return cropIcons[slug] || seedlingIcon;
}

/**
 * All 39 crops.
 */
export const crops = [
  // === HARDY ===
  {
    name: "Broad beans", slug: "broad-beans", category: "hardy",
    sowIndoorsWeeks: -10, directSowWeeks: -8, plantOutWeeks: -4,
    harvestWeeks: 14, tip: "Pinch out the growing tips once the first pods form to discourage blackfly.",
    needs: "Sun or partial shade. Supports for taller varieties.", spacingCm: 23,
  },
  {
    name: "Peas", slug: "peas", category: "hardy",
    sowIndoorsWeeks: -8, directSowWeeks: -6, plantOutWeeks: -3,
    harvestWeeks: 12, tip: "Sow every 3 weeks for a continuous harvest. Pick regularly to keep them producing.",
    needs: "Sun. Something to climb \u2014 sticks, netting, or a trellis.", spacingCm: 8,
  },
  {
    name: "Lettuce", slug: "lettuce", category: "hardy",
    sowIndoorsWeeks: -6, directSowWeeks: -4, plantOutWeeks: -2,
    harvestWeeks: 8, tip: "Sow a short row every 2 weeks for continuous salad. Pick outer leaves to keep it going.",
    needs: "Partial shade in summer. Regular water.", spacingCm: 25,
  },
  {
    name: "Spinach", slug: "spinach", category: "hardy",
    sowIndoorsWeeks: null, directSowWeeks: -6, plantOutWeeks: null,
    harvestWeeks: 7, tip: "Bolts quickly in hot weather. Best in spring and autumn. Pick little and often.",
    needs: "Partial shade. Moist, rich soil.", spacingCm: 15,
  },
  {
    name: "Radishes", slug: "radishes", category: "hardy",
    sowIndoorsWeeks: null, directSowWeeks: -4, plantOutWeeks: null,
    harvestWeeks: 4, tip: "The quickest crop you can grow. Sow between slower crops to use the space.",
    needs: "Sun or partial shade. Light soil.", spacingCm: 3,
  },
  {
    name: "Carrots", slug: "carrots", category: "hardy",
    sowIndoorsWeeks: null, directSowWeeks: -3, plantOutWeeks: null,
    harvestWeeks: 14, tip: "Sow thinly to avoid thinning (which attracts carrot fly). Cover with fleece.",
    needs: "Sun. Light, stone-free soil. No fresh manure.", spacingCm: 8,
  },
  {
    name: "Beetroot", slug: "beetroot", category: "hardy",
    sowIndoorsWeeks: -4, directSowWeeks: -2, plantOutWeeks: 0,
    harvestWeeks: 9, tip: "Each seed cluster produces several seedlings \u2014 thin to the strongest. Leaves are edible too.",
    needs: "Sun or light shade. Any reasonable soil.", spacingCm: 10,
  },
  {
    name: "Onion sets", slug: "onion-sets", category: "hardy",
    sowIndoorsWeeks: null, directSowWeeks: -5, plantOutWeeks: null,
    harvestWeeks: 20, tip: "Push sets into the soil with the tip just showing. Easiest way to grow onions.",
    needs: "Full sun. Well-drained soil.", spacingCm: 10,
  },
  {
    name: "Potatoes (early)", slug: "early-potatoes", category: "hardy",
    sowIndoorsWeeks: null, directSowWeeks: -5, plantOutWeeks: null,
    harvestWeeks: 11, tip: "Chit (sprout) seed potatoes on a windowsill before planting. Earth up as they grow.",
    needs: "Sun. Rich soil. Regular watering once flowers appear.", spacingCm: 30,
  },
  {
    name: "Kale", slug: "kale", category: "hardy",
    sowIndoorsWeeks: -6, directSowWeeks: -4, plantOutWeeks: -1,
    harvestWeeks: 10, tip: "Gets sweeter after a frost. One of the hardiest crops \u2014 can harvest all winter.",
    needs: "Sun or partial shade. Firm, fertile soil. Net against pigeons.", spacingCm: 45,
  },
  {
    name: "Parsnips", slug: "parsnips", category: "hardy",
    sowIndoorsWeeks: null, directSowWeeks: -4, plantOutWeeks: null,
    harvestWeeks: 18, tip: "Very slow to germinate (2-4 weeks). Use fresh seed every year. Sow radishes alongside to mark the row.",
    needs: "Sun. Deep, stone-free soil. Patience.", spacingCm: 15,
  },
  {
    name: "Spring onions", slug: "spring-onions", category: "hardy",
    sowIndoorsWeeks: null, directSowWeeks: -4, plantOutWeeks: null,
    harvestWeeks: 10, tip: "Sow little and often, every few weeks, for a continuous supply.",
    needs: "Sun or partial shade. Any soil.", spacingCm: 2,
  },
  {
    name: "Swiss chard", slug: "swiss-chard", category: "hardy",
    sowIndoorsWeeks: -4, directSowWeeks: -2, plantOutWeeks: 1,
    harvestWeeks: 9, tip: "Beautiful and productive. Pick outer leaves and it keeps going for months. Rainbow chard looks stunning.",
    needs: "Sun or partial shade. Moist soil.", spacingCm: 30,
  },
  {
    name: "Turnips", slug: "turnips", category: "hardy",
    sowIndoorsWeeks: null, directSowWeeks: -4, plantOutWeeks: null,
    harvestWeeks: 8, tip: "Harvest when golf-ball sized for the sweetest flavour. Quick-growing gap filler.",
    needs: "Sun or partial shade. Moist soil.", spacingCm: 15,
  },
  {
    name: "Leeks", slug: "leeks", category: "hardy",
    sowIndoorsWeeks: -12, directSowWeeks: null, plantOutWeeks: 2,
    harvestWeeks: 20, tip: "Drop seedlings into deep holes and just water in \u2014 no need to fill the hole. They'll fatten up.",
    needs: "Sun or partial shade. Rich, well-drained soil.", spacingCm: 15,
  },
  {
    name: "Broccoli", slug: "broccoli", category: "hardy",
    sowIndoorsWeeks: -6, directSowWeeks: -4, plantOutWeeks: 0,
    harvestWeeks: 12, tip: "Calabrese types give a main head plus side shoots for weeks. Cut the main head first to encourage more.",
    needs: "Sun. Firm, fertile soil. Net against pigeons and cabbage white butterflies.", spacingCm: 45,
  },
  {
    name: "Cabbage", slug: "cabbage", category: "hardy",
    sowIndoorsWeeks: -8, directSowWeeks: null, plantOutWeeks: -2,
    harvestWeeks: 16, tip: "Different varieties for each season \u2014 spring, summer, autumn, and winter types. Red cabbage is less bothered by caterpillars.",
    needs: "Sun. Firm, well-manured soil. Net against pigeons and butterflies.", spacingCm: 45,
  },
  {
    name: "Cauliflower", slug: "cauliflower", category: "hardy",
    sowIndoorsWeeks: -8, directSowWeeks: null, plantOutWeeks: -1,
    harvestWeeks: 16, tip: "Fold outer leaves over the curd to keep it white. Cauliflower leaves are delicious too \u2014 don't throw them away.",
    needs: "Sun. Rich, firm soil. Consistent watering. The fussiest brassica.", spacingCm: 60,
  },
  {
    name: "Brussels sprouts", slug: "brussels-sprouts", category: "hardy",
    sowIndoorsWeeks: -10, directSowWeeks: null, plantOutWeeks: -2,
    harvestWeeks: 24, tip: "Grow through summer, harvest from autumn through winter. Flavour improves after frost. Start early \u2014 they're slow.",
    needs: "Sun. Very firm, fertile soil. Stake tall plants against wind.", spacingCm: 60,
  },
  {
    name: "Garlic", slug: "garlic", category: "hardy",
    sowIndoorsWeeks: null, directSowWeeks: -26, plantOutWeeks: null,
    harvestWeeks: 36, tip: "Plant individual cloves Oct-Nov, pointed end up, 2.5cm deep. Garlic needs a cold period to form bulbs. Harvest when lower leaves yellow.",
    needs: "Full sun. Well-drained soil. No fresh manure. Very low maintenance.", spacingCm: 15,
  },
  {
    name: "Parsley", slug: "parsley", category: "hardy",
    sowIndoorsWeeks: -8, directSowWeeks: -4, plantOutWeeks: null,
    harvestWeeks: 10, tip: "Slow to germinate (3-4 weeks). Soak seeds overnight in warm water to speed things up. Flat-leaf has stronger flavour.",
    needs: "Sun or partial shade. Moist, rich soil. Grows well in pots.", spacingCm: 20,
  },

  // === HALF-HARDY ===
  {
    name: "Sweetcorn", slug: "sweetcorn", category: "half-hardy",
    sowIndoorsWeeks: -5, directSowWeeks: 1, plantOutWeeks: 2,
    harvestWeeks: 14, tip: "Plant in a block (not a row) for wind pollination. Each plant gives you 1-2 cobs.",
    needs: "Full sun. Sheltered spot. Rich soil.", spacingCm: 45,
  },
  {
    name: "Courgettes", slug: "courgettes", category: "half-hardy",
    sowIndoorsWeeks: -4, directSowWeeks: 1, plantOutWeeks: 2,
    harvestWeeks: 8, tip: "You only need 2-3 plants. Seriously. Pick them small (15cm) or they turn into marrows overnight.",
    needs: "Full sun. Rich soil. Lots of water.", spacingCm: 90,
  },
  {
    name: "French beans", slug: "french-beans", category: "half-hardy",
    sowIndoorsWeeks: -3, directSowWeeks: 1, plantOutWeeks: 2,
    harvestWeeks: 9, tip: "Dwarf varieties need no support. Pick every few days to keep them cropping.",
    needs: "Sun. Sheltered spot. Decent soil.", spacingCm: 15,
  },
  {
    name: "Squash", slug: "squash", category: "half-hardy",
    sowIndoorsWeeks: -4, directSowWeeks: null, plantOutWeeks: 2,
    harvestWeeks: 16, tip: "Big hungry plants. Give them space and feed them. Leave to cure in the sun before storing.",
    needs: "Full sun. Rich soil. Space \u2014 they spread.", spacingCm: 90,
  },
  {
    name: "Pumpkins", slug: "pumpkins", category: "half-hardy",
    sowIndoorsWeeks: -4, directSowWeeks: null, plantOutWeeks: 2,
    harvestWeeks: 18, tip: "Limit each plant to 2-3 fruits for bigger pumpkins. Sit them on a tile to stop rot.",
    needs: "Full sun. Very rich soil. Lots of water.", spacingCm: 120,
  },
  {
    name: "Coriander", slug: "coriander", category: "half-hardy",
    sowIndoorsWeeks: -4, directSowWeeks: 0, plantOutWeeks: null,
    harvestWeeks: 6, tip: "Sow every 3-4 weeks for a continuous supply. Pick frequently to delay bolting. Choose slow-bolt varieties for leaf production.",
    needs: "Partial shade in summer. Moist soil. Grows well in pots.", spacingCm: 15,
  },
  {
    name: "Rocket", slug: "rocket", category: "half-hardy",
    sowIndoorsWeeks: -4, directSowWeeks: -2, plantOutWeeks: null,
    harvestWeeks: 4, tip: "Very easy and fast. Sow regularly Feb-Oct. Gets spicier in hot weather. Pick leaves small for salads.",
    needs: "Partial shade in summer to slow bolting. Any reasonable soil.", spacingCm: 15,
  },
  {
    name: "Pak choi", slug: "pak-choi", category: "half-hardy",
    sowIndoorsWeeks: -4, directSowWeeks: 1, plantOutWeeks: 0,
    harvestWeeks: 6, tip: "Best sown in early spring or after midsummer \u2014 bolts quickly in heat. Fast-growing and very rewarding.",
    needs: "Partial shade. Moist soil. Protection from slugs.", spacingCm: 25,
  },
  {
    name: "Fennel", slug: "fennel", category: "half-hardy",
    sowIndoorsWeeks: -4, directSowWeeks: 1, plantOutWeeks: 2,
    harvestWeeks: 14, tip: "Sow after midsummer for best bulbs \u2014 earlier sowings often bolt. Don't transplant bare-root, it hates root disturbance.",
    needs: "Full sun. Well-drained, fertile soil. Regular water.", spacingCm: 30,
  },
  {
    name: "Celery", slug: "celery", category: "half-hardy",
    sowIndoorsWeeks: -10, directSowWeeks: null, plantOutWeeks: 2,
    harvestWeeks: 18, tip: "Sow seeds on the surface \u2014 they need light to germinate. Start early in a propagator. Cutting celery is easier than trench celery.",
    needs: "Sun or partial shade. Rich, moist soil. Regular watering and feeding.", spacingCm: 25,
  },
  {
    name: "Dill", slug: "dill", category: "half-hardy",
    sowIndoorsWeeks: null, directSowWeeks: 1, plantOutWeeks: null,
    harvestWeeks: 8, tip: "Sow direct \u2014 dill hates transplanting. Sow short rows every few weeks for continuous supply. Grows to 90cm tall.",
    needs: "Full sun. Sheltered spot. Well-drained soil.", spacingCm: 25,
  },

  // === TENDER ===
  {
    name: "Tomatoes", slug: "tomatoes", category: "tender",
    sowIndoorsWeeks: -8, directSowWeeks: null, plantOutWeeks: 2,
    harvestWeeks: 12, tip: "Pinch out side shoots on cordon types. Feed weekly once fruits form. Don't overwater.",
    needs: "Full sun. Sheltered. Rich soil. Regular feeding.", spacingCm: 45,
  },
  {
    name: "Peppers", slug: "peppers", category: "tender",
    sowIndoorsWeeks: -10, directSowWeeks: null, plantOutWeeks: 3,
    harvestWeeks: 14, tip: "Start early \u2014 they're slow. Pinch out the first flower to encourage bushier growth.",
    needs: "Full sun. Warmth. Sheltered spot or greenhouse.", spacingCm: 45,
  },
  {
    name: "Chillies", slug: "chillies", category: "tender",
    sowIndoorsWeeks: -10, directSowWeeks: null, plantOutWeeks: 3,
    harvestWeeks: 16, tip: "Need heat to germinate \u2014 use a propagator or warm windowsill. The more sun, the hotter the chilli.",
    needs: "Full sun. Warmth. Sheltered or under cover.", spacingCm: 40,
  },
  {
    name: "Cucumbers", slug: "cucumbers", category: "tender",
    sowIndoorsWeeks: -5, directSowWeeks: null, plantOutWeeks: 3,
    harvestWeeks: 10, tip: "Outdoor varieties are tougher than greenhouse ones. Keep picking to keep them producing.",
    needs: "Sun. Shelter. Rich moist soil.", spacingCm: 45,
  },
  {
    name: "Runner beans", slug: "runner-beans", category: "tender",
    sowIndoorsWeeks: -4, directSowWeeks: 1, plantOutWeeks: 2,
    harvestWeeks: 11, tip: "Build a strong frame \u2014 they get heavy. Pick every 2-3 days or they go stringy.",
    needs: "Sun. Deep rich soil. A tall support frame.", spacingCm: 15,
  },
  {
    name: "Aubergine", slug: "aubergine", category: "tender",
    sowIndoorsWeeks: -10, directSowWeeks: null, plantOutWeeks: 3,
    harvestWeeks: 18, tip: "Start very early. Limit to 5-6 fruits per plant for decent-sized aubergines.",
    needs: "Full sun. Warmth. Best under cover in most of the UK.", spacingCm: 60,
  },
  {
    name: "Basil", slug: "basil", category: "tender",
    sowIndoorsWeeks: -6, directSowWeeks: 2, plantOutWeeks: 2,
    harvestWeeks: 8, tip: "Pinch out flower buds to keep leaves coming. Harvest from the top to encourage bushy growth. Loves heat.",
    needs: "Full sun. Warmth. Sheltered spot. Rich, moist soil. Perfect for pots.", spacingCm: 20,
  },
];

/**
 * Get crops grouped by what action to take now.
 * Ported from getCropsByAction in crops.ts — logic is identical.
 */
export function getCropsByAction(cropList, currentDate, lastFrostDate) {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksToFrost = (lastFrostDate.getTime() - currentDate.getTime()) / msPerWeek;
  const weeksAfterFrost = -weeksToFrost;

  const sowIndoorsNow = [];
  const directSowNow = [];
  const plantOutNow = [];
  const comingSoon = [];
  const tooLate = [];

  const windowWeeks = 3;

  for (const crop of cropList) {
    let addedToNow = false;

    // Check sow indoors
    if (crop.sowIndoorsWeeks !== null) {
      const targetWeek = -crop.sowIndoorsWeeks;
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

    // Check if we've passed all windows
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

  // Deduplicate (keep earliest action per crop)
  const seen = new Set();
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
