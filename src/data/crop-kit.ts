/**
 * Crop-specific kit recommendations for affiliate links.
 * Maps crop slugs to the 2-4 items a beginner won't realise they need.
 *
 * Amazon tag: whattosow21-21
 * To update a link: replace the search URL with a specific product ASIN link.
 */

export interface KitItem {
  name: string;
  why: string; // one-liner in brand voice
  amazonUrl: string;
  /** Guide page to link for more info */
  guideLink?: string;
}

export interface WorthBuyingAdviceItem {
  kind: "worth-buying";
  name: string;
  why: string;
  href: string;
  product: string;
  cta: string;
}

export interface SkipBuyingAdviceItem {
  kind: "skip-this";
  name: string;
  why: string;
  instead: string;
}

export type CropBuyingAdviceItem = WorthBuyingAdviceItem | SkipBuyingAdviceItem;

export interface CropBuyingAdvice {
  intro: string;
  items: CropBuyingAdviceItem[];
}

const TAG = "whattosow21-21";
const az = (q: string) => `https://www.amazon.co.uk/s?tag=${TAG}&k=${encodeURIComponent(q)}`;
/** Direct product link by ASIN — better conversion than search links */
const asin = (id: string) => `https://www.amazon.co.uk/dp/${id}?tag=${TAG}`;

// ─── Shared items (referenced by multiple crops) ──────────────────────────────

const FLEECE: KitItem = {
  name: "Horticultural fleece",
  why: "Protects from late frost and gives seedlings a head start. Keep a roll in the shed — you'll use it constantly.",
  amazonUrl: az("horticultural fleece 17g"),
  guideLink: "/guides/allotment-essentials",
};

const BAMBOO_CANES_6FT: KitItem = {
  name: "Bamboo canes (6ft)",
  why: "For support, staking, and building frames. The most versatile length for the plot.",
  amazonUrl: az("bamboo canes 6ft garden"),
  guideLink: "/guides/allotment-essentials",
};

const BAMBOO_CANES_8FT: KitItem = {
  name: "Bamboo canes (8ft)",
  why: "Standard canes are too short for climbers. You need 8ft minimum — they reach 2-3m and you'll bury 15cm in the soil.",
  amazonUrl: az("bamboo canes 8ft"),
};

const JUTE_TWINE: KitItem = {
  name: "Jute twine",
  why: "For tying plants to canes and a hundred other jobs. Biodegradable, won't cut into stems.",
  amazonUrl: az("jute garden twine"),
};

const TOMORITE: KitItem = {
  name: "Tomato feed (Tomorite)",
  why: "High-potash liquid feed. Once the first fruits form, feed weekly — it makes a real difference to yield.",
  amazonUrl: asin("B09RK3HPH5"),
};

const SLUG_PELLETS: KitItem = {
  name: "Organic slug pellets",
  why: "Ferric phosphate — pet-safe and organic-approved. Young plants are slug magnets. One night can finish them.",
  amazonUrl: az("organic slug pellets ferric phosphate"),
};

const BUTTERFLY_NETTING: KitItem = {
  name: "Butterfly netting (fine mesh)",
  why: "Without this, cabbage white caterpillars will strip your plants to skeletons. Cover from planting day — not after you spot damage.",
  amazonUrl: az("butterfly netting vegetable garden"),
};

const NETTING_HOOPS: KitItem = {
  name: "Netting hoops",
  why: "Hold netting above the leaves. Draped directly on plants, butterflies lay eggs through the mesh where it touches.",
  amazonUrl: az("garden netting hoops"),
};

const MODULE_TRAYS: KitItem = {
  name: "Module trays (24-cell)",
  why: "Each seedling gets its own root space. Less root disturbance when planting out means faster establishment.",
  amazonUrl: asin("B00844031K"),
  guideLink: "/guides/seed-starting-kit",
};

const ENVIROMESH: KitItem = {
  name: "Enviromesh (insect mesh)",
  why: "Stops carrot fly, which flies low and finds carrots by smell. Cover from sowing day and leave it on all season.",
  amazonUrl: az("enviromesh insect netting"),
};

const HEATED_PROPAGATOR: KitItem = {
  name: "Heated propagator (Garland)",
  why: "These crops need 24-30°C to germinate — a cold windowsill won't cut it. The difference between success and failure in the UK.",
  amazonUrl: asin("B015WFRWUI"),
  guideLink: "/guides/seed-starting-kit",
};

// ─── Trust-led buying advice ─────────────────────────────────────────────────

const cropBuyingAdviceMap: Record<string, CropBuyingAdvice> = {
  tomatoes: {
    intro: "Tomatoes do not need many gadgets. A little support, steady feeding once fruit sets, and regular attention do most of the work.",
    items: [
      {
        kind: "worth-buying",
        name: "Tomato feed",
        why: "Once the first truss has set, a weekly high-potash feed helps the plant put its energy into fruit rather than more leafy growth.",
        href: TOMORITE.amazonUrl,
        product: "tomato feed",
        cta: "Find tomato feed",
      },
      {
        kind: "worth-buying",
        name: "Soft plant ties or clips",
        why: "Cordon tomatoes need tying in as they grow. Soft ties hold the stem without cutting into it on a windy day.",
        href: az("soft plant ties tomato clips"),
        product: "soft plant ties",
        cta: "Find soft ties",
      },
      {
        kind: "skip-this",
        name: "Gimmicky growbag frames",
        why: "They promise a neat shortcut, but a sturdy cane, string line or simple pot support usually does the same job.",
        instead: "Put the money into good compost, a deep pot if you are container growing, and a feed you will actually remember to use.",
      },
    ],
  },
  carrots: {
    intro: "Carrots are simple until carrot fly arrives. Spend money on protection only if carrot fly is a real problem where you grow.",
    items: [
      {
        kind: "worth-buying",
        name: "Fine insect mesh",
        why: "Carrot fly finds bruised carrot foliage by scent and flies low. A fine mesh cover from sowing day is the calmest defence.",
        href: ENVIROMESH.amazonUrl,
        product: "fine insect mesh",
        cta: "Find insect mesh",
      },
      {
        kind: "skip-this",
        name: "Seed tapes",
        why: "They are tidy, but often much dearer for fewer seeds, and the spacing is not magic.",
        instead: "Sow thinly into fine soil, cover the row after sowing, and thin only if you must, preferably on a still evening.",
      },
    ],
  },
  courgettes: {
    intro: "Courgettes want rich soil, water and picking — almost nothing in a catalogue changes that. Two things earn their place.",
    items: [
      {
        kind: "worth-buying",
        name: "Organic slug pellets",
        why: "The first fortnight after planting out is the dangerous one — a damp night's slugs can end a young courgette plant. Ferric phosphate pellets are organic-approved and get them through it.",
        href: az("organic slug pellets ferric phosphate"),
        product: "organic slug pellets",
        cta: "Find slug pellets",
      },
      {
        kind: "worth-buying",
        name: "High-potash feed",
        why: "Only really needed in pots, where the compost runs out of steam — a fortnightly tomato feed keeps a container courgette producing all summer.",
        href: asin("B09RK3HPH5"),
        product: "tomato feed",
        cta: "Find tomato feed",
      },
      {
        kind: "skip-this",
        name: "More than three plants' worth of seed",
        why: "One healthy plant makes a courgette every day or two in high summer. Six plants is not a plan, it is a glut with a fortnight's warning.",
        instead: "Sow three, plant the best two, and spend what you saved on good compost for the planting holes.",
      },
    ],
  },
  "maincrop-potatoes": {
    intro: "Potatoes are the least gadget-hungry crop on the plot. Good seed potatoes, rich soil and a fork cover almost all of it.",
    items: [
      {
        kind: "worth-buying",
        name: "Horticultural fleece",
        why: "A late frost blackens young shoots just as they emerge. A night or two under fleece in a cold April snap protects weeks of growth.",
        href: az("horticultural fleece plant frost protection"),
        product: "horticultural fleece",
        cta: "Find fleece",
      },
      {
        kind: "worth-buying",
        name: "Hessian or paper storage sacks",
        why: "The harvest is only half the job — stored dark and cool in breathable sacks, a good maincrop lift feeds you into the new year. Plastic bags sweat and spoil them.",
        href: az("hessian potato storage sacks"),
        product: "potato storage sacks",
        cta: "Find storage sacks",
      },
      {
        kind: "skip-this",
        name: "Chitting trays and gadgets",
        why: "Egg boxes on a cool, bright windowsill do exactly the same job for nothing.",
        instead: "Spend the money on certified seed potatoes instead — that is the purchase that actually decides the harvest.",
      },
    ],
  },
  "runner-beans": {
    intro: "One good frame and steady water grow the whole crop. The kit list is short and mostly rope and sticks.",
    items: [
      {
        kind: "worth-buying",
        name: "8ft bamboo canes",
        why: "Runners climb seven feet and a full row in August carries real weight and real wind. Tall, sturdy canes, crossed and braced, are the crop's one piece of engineering.",
        href: az("bamboo canes 8ft garden"),
        product: "8ft bamboo canes",
        cta: "Find 8ft canes",
      },
      {
        kind: "worth-buying",
        name: "Jute twine",
        why: "For lashing the frame and the hundred small tying jobs a bean row invents. Biodegradable, so the autumn clear-up goes straight on the compost, strings and all.",
        href: az("jute garden twine"),
        product: "jute twine",
        cta: "Find jute twine",
      },
      {
        kind: "skip-this",
        name: "Bean feed and flower-set sprays",
        why: "Dropped flowers are a watering problem, not a nutrition one — no spray fixes dry roots.",
        instead: "A compost-rich planting trench, a thick mulch, and a deep soak at the base every few dry days once flowers show. That is the whole secret.",
      },
    ],
  },
};

// ─── Crop-to-kit mapping ──────────────────────────────────────────────────────

const cropKitMap: Record<string, KitItem[]> = {
  // ── HARDY ──
  "broad-beans": [
    BAMBOO_CANES_6FT,
    JUTE_TWINE,
    {
      name: "Bird netting",
      why: "Pigeons and jays love young bean shoots. Cover with netting until plants are 15cm tall.",
      amazonUrl: az("bird netting garden"),
    },
  ],
  peas: [
    {
      name: "Pea netting",
      why: "Even dwarf peas need support. Without it they sprawl, pods sit in mud, and slugs have a field day.",
      amazonUrl: az("pea and bean netting"),
    },
    {
      name: "Pea sticks (hazel)",
      why: "Traditional and brilliant — the twiggy texture gives tendrils something to grip. Free if you have access to hedgerow prunings.",
      amazonUrl: az("pea sticks hazel"),
    },
  ],
  lettuce: [
    MODULE_TRAYS,
    {
      name: "Shade cloth (40%)",
      why: "Lettuce bolts in hot sun. A bit of shade extends the harvest by weeks in summer. Most beginners plant in full sun and wonder why it all goes to seed in July.",
      amazonUrl: az("shade netting 40% garden"),
    },
    SLUG_PELLETS,
  ],
  spinach: [
    MODULE_TRAYS,
    {
      name: "Shade cloth (40%)",
      why: "Like lettuce, spinach bolts fast in heat. Shade and moisture are the key to keeping leaves coming.",
      amazonUrl: az("shade netting 40% garden"),
    },
  ],
  radishes: [
    FLEECE,
  ],
  carrots: [
    ENVIROMESH,
    {
      name: "Carrot fly barrier (60cm)",
      why: "Carrot fly is low-flying — a 60cm vertical barrier around the bed is an alternative to covering. Cheap to make from fleece and canes.",
      amazonUrl: az("carrot fly barrier 60cm"),
    },
  ],
  beetroot: [
    FLEECE,
    MODULE_TRAYS,
  ],
  "onion-sets": [
    {
      name: "Bird netting",
      why: "Birds pull freshly planted sets straight out of the ground. Cover for the first 3-4 weeks until they've rooted properly.",
      amazonUrl: az("bird netting garden 20mm"),
    },
    {
      name: "Onion drying rack",
      why: "Onions need 2 weeks of curing in air and sun after harvest. A wire rack lets air circulate underneath. An old oven shelf works too.",
      amazonUrl: az("onion drying rack"),
    },
  ],
  "maincrop-potatoes": [
    {
      name: "Chitting trays",
      why: "Start chitting 6 weeks before planting. Egg boxes work, but proper trays are a few quid and stack neatly.",
      amazonUrl: az("seed potato chitting tray"),
    },
    {
      name: "Potato grow bags",
      why: "If space is tight or your soil has blight history. Fabric bags with an access flap let you harvest without tipping the whole thing out.",
      amazonUrl: az("potato grow bags 10 gallon"),
    },
    {
      name: "Hessian storage sacks",
      why: "Never store potatoes in plastic — they sweat and rot. Hessian breathes and keeps them dark.",
      amazonUrl: az("hessian potato sacks"),
    },
  ],
  "early-potatoes": [
    {
      name: "Chitting trays",
      why: "Early varieties especially need a good chit. Start them in a bright, frost-free spot 6 weeks before planting.",
      amazonUrl: az("seed potato chitting tray"),
    },
    FLEECE,
  ],
  kale: [
    BUTTERFLY_NETTING,
    NETTING_HOOPS,
  ],
  parsnips: [
    ENVIROMESH,
  ],
  "spring-onions": [
    MODULE_TRAYS,
  ],
  "swiss-chard": [
    FLEECE,
  ],
  turnips: [
    FLEECE,
    ENVIROMESH,
  ],
  leeks: [
    MODULE_TRAYS,
    {
      name: "Dibber or thick dowel",
      why: "Make deep holes, drop the leek in, water — don't backfill. The traditional method and it works perfectly.",
      amazonUrl: az("garden dibber wooden"),
    },
  ],
  broccoli: [
    BUTTERFLY_NETTING,
    NETTING_HOOPS,
    {
      name: "Brassica collars",
      why: "Flat discs around the stem at soil level to stop cabbage root fly laying eggs at the base. Cheap, reusable, and often forgotten.",
      amazonUrl: az("cabbage root fly collars"),
    },
  ],
  cabbage: [
    BUTTERFLY_NETTING,
    NETTING_HOOPS,
    {
      name: "Brassica collars",
      why: "Stop cabbage root fly at the base. Pop them on when you plant out — prevention is much easier than cure.",
      amazonUrl: az("cabbage root fly collars"),
    },
  ],
  cauliflower: [
    BUTTERFLY_NETTING,
    NETTING_HOOPS,
    {
      name: "Brassica collars",
      why: "Cauliflower is the fussiest brassica. Give it every advantage — collars, netting, and consistent watering.",
      amazonUrl: az("cabbage root fly collars"),
    },
  ],
  "brussels-sprouts": [
    BUTTERFLY_NETTING,
    NETTING_HOOPS,
    BAMBOO_CANES_6FT,
  ],
  garlic: [
    {
      name: "Bird netting",
      why: "Birds pull freshly planted cloves straight out. Cover until green shoots are established — 3-4 weeks.",
      amazonUrl: az("bird netting garden 20mm"),
    },
    {
      name: "Onion drying rack",
      why: "Garlic needs proper curing — 2-3 weeks in a dry, airy spot after harvest. Good curing means months of storage.",
      amazonUrl: az("onion drying rack"),
    },
  ],

  // ── HALF-HARDY ──
  sweetcorn: [
    MODULE_TRAYS,
    FLEECE,
    SLUG_PELLETS,
  ],
  courgettes: [
    SLUG_PELLETS,
    {
      name: "Straw mulch",
      why: "Keeps fruit off wet soil (prevents rot), suppresses weeds, retains moisture. Courgettes are thirsty and hate sitting in mud.",
      amazonUrl: az("barley straw garden mulch"),
    },
    FLEECE,
  ],
  "french-beans": [
    BAMBOO_CANES_6FT,
    JUTE_TWINE,
  ],
  squash: [
    SLUG_PELLETS,
    {
      name: "Straw mulch",
      why: "Squash sprawl on the ground. Straw under the fruit stops rot and keeps weeds down. Your back will thank you too.",
      amazonUrl: az("barley straw garden mulch"),
    },
  ],
  pumpkins: [
    SLUG_PELLETS,
    {
      name: "Straw mulch",
      why: "Keep developing pumpkins off wet soil. Straw prevents rot and keeps the base dry.",
      amazonUrl: az("barley straw garden mulch"),
    },
  ],
  cucumbers: [
    BAMBOO_CANES_6FT,
    JUTE_TWINE,
    TOMORITE,
  ],
  "runner-beans": [
    BAMBOO_CANES_8FT,
    JUTE_TWINE,
    {
      name: "Cane toppers",
      why: "Safety first — prevent eye injuries when bending over the plot. They also grip canes together at the wigwam top.",
      amazonUrl: az("bamboo cane toppers"),
    },
    {
      name: "Pea and bean netting",
      why: "Alternative to a full cane wigwam. Drape over an A-frame — large mesh (12cm+) so you can pick through it.",
      amazonUrl: az("pea and bean netting"),
    },
  ],

  // ── TENDER ──
  tomatoes: [
    {
      name: "Spiral tomato supports",
      why: "Reusable, no tying needed — just wind the stem as it grows. Much easier than canes and string once you've tried them.",
      amazonUrl: az("tomato spiral support"),
    },
    TOMORITE,
    {
      name: "Soft plant ties",
      why: "If using canes instead of spirals. Beginners use string that cuts into stems — soft ties or figure-8 clips are kinder.",
      amazonUrl: az("tomato plant clips"),
    },
  ],
  peppers: [
    HEATED_PROPAGATOR,
    TOMORITE,
    {
      name: "Short support canes (3ft)",
      why: "Pepper plants get top-heavy with fruit and snap. A short cane and soft tie prevents heartbreak.",
      amazonUrl: az("plant support canes 3ft"),
    },
  ],
  chillies: [
    HEATED_PROPAGATOR,
    TOMORITE,
  ],
  aubergine: [
    HEATED_PROPAGATOR,
    TOMORITE,
    {
      name: "Short support canes (3ft)",
      why: "Aubergine fruit is heavy. Without support the whole plant leans over and stems crack.",
      amazonUrl: az("plant support canes 3ft"),
    },
  ],
  basil: [
    {
      name: "Small pots (9cm)",
      why: "Basil hates cold wet soil. Keep it in pots on a sunny windowsill or greenhouse — it does better than in the ground in the UK.",
      amazonUrl: az("9cm square plant pots"),
      guideLink: "/guides/seed-starting-kit",
    },
  ],
};

// Herbs that don't need specific kit — intentionally excluded:
// parsley, coriander, rocket, pak-choi, fennel, celery, dill

export function getCropKit(slug: string): KitItem[] {
  return cropKitMap[slug] ?? [];
}

export function getCropBuyingAdvice(slug: string): CropBuyingAdvice | null {
  return cropBuyingAdviceMap[slug] ?? null;
}

export function hasCropBuyingAdvice(slug: string): boolean {
  return slug in cropBuyingAdviceMap;
}
