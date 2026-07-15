/**
 * Companion-planting cluster — satellite pages that hang off the main
 * /guides/companion-planting hub (the site's #1 page). Each one targets a
 * specific long-tail search, funnels link-equity back to the hub, and carries
 * its own seed / flower affiliate links. One data file, one template
 * (src/app/guides/companion-planting/[topic]/page.tsx), many pages.
 */

export interface CompanionItem {
  name: string;
  why: string;
}

export interface CompanionBuyerLink {
  label: string;
  url: string;
  product: string;
  type: "seed" | "gear";
  merchant: "thompson-morgan" | "amazon-uk";
}

export interface CompanionBuyerNote {
  title: string;
  buy: string;
  skip: string;
  links: CompanionBuyerLink[];
}

export interface CompanionTopic {
  slug: string;
  /** <title> — keyword front-loaded */
  metaTitle: string;
  /** on-page H1 */
  title: string;
  description: string;
  keywords: string[];
  heroImage: string;
  heroAlt: string;
  intro: string;
  /** Free written sections (the readable, rankable body) */
  sections: { heading?: string; paragraphs: string[] }[];
  /** "Grow these alongside" — the good companions, with the reason why */
  goodCompanions?: CompanionItem[];
  /** "Keep these apart" — bad neighbours, with the reason */
  avoid?: CompanionItem[];
  /** Flowers worth tucking in (each becomes a tracked seed link) */
  flowers?: CompanionItem[];
  /** Curated seed buy-points — label + a real merchant URL (wrapped by awinLink) */
  seedLinks?: { label: string; url: string }[];
  /** One trust-led buyer note. Replaces the simple seed strip when present. */
  buyerNote?: CompanionBuyerNote;
  faqs: { q: string; a: string }[];
  /** Related crop slugs to link through to crop pages */
  relatedCrops?: string[];
}

// Thompson & Morgan search → earns via Awin (active merchant). One helper here
// keeps the URLs tidy; the template wraps them with awinLink().
const tm = (q: string) => `https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`;

export const companionTopics: CompanionTopic[] = [
  // ── 1. Tomatoes ───────────────────────────────────────────────────────────
  {
    slug: "companion-plants-for-tomatoes",
    metaTitle: "Companion Plants for Tomatoes (UK) — What to Grow & Avoid",
    title: "Companion plants for tomatoes",
    description:
      "The best companion plants for tomatoes in the UK — basil, marigolds and the flowers that pull pests away — plus what to keep well apart. The pairings that actually earn their place.",
    keywords: [
      "companion plants for tomatoes",
      "what to plant with tomatoes",
      "tomato companion planting UK",
      "basil and tomatoes",
      "marigolds with tomatoes",
    ],
    heroImage: "/photos/blog/tomatoes-cherry-truss-box.webp",
    heroAlt: "A truss of ripening cherry tomatoes on the vine",
    intro:
      "Tomatoes are the crop everyone wants to get right, and a few good neighbours genuinely help — pulling pests away, bringing in pollinators, and earning their own keep on the plate.",
    sections: [
      {
        paragraphs: [
          "Tomatoes are hungry, thirsty and a magnet for whitefly and aphids, so the best companions for them do one of three jobs: lure pests away, bring in the hoverflies and bees that keep aphids down and fruit setting, or simply make good use of the space at their feet while they stretch up.",
          "The classic pairing — tomatoes and basil — is a real one. Basil grows happily in their dappled shade, the two are made for each other in the kitchen, and many growers swear the basil helps keep whitefly off. Tuck marigolds in around the edge and you've got the holy trinity of the summer bed.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Basil", why: "Thrives in the tomatoes' shade, may deter whitefly, and they're perfect together on the plate." },
      { name: "Marigolds (French)", why: "Pull whitefly and bring in hoverflies whose larvae eat aphids — the single best flower for a tomato bed." },
      { name: "Nasturtiums", why: "A 'sacrificial' magnet that draws blackfly and aphids onto themselves, away from your tomatoes." },
      { name: "Chives & spring onions", why: "Their scent confuses aphids, and they use the ground space without competing for height." },
      { name: "Lettuce", why: "Happily grows in the cool shade beneath the plants and is cropped before the tomatoes get huge." },
      { name: "Borage", why: "A bee magnet that boosts pollination and fruit set — and the flowers are pretty in a Pimm's." },
    ],
    avoid: [
      { name: "Potatoes", why: "Same family, same diseases — keep them apart so blight can't hop straight across." },
      { name: "Brassicas (cabbage, kale, broccoli)", why: "Heavy feeders that compete hard for the same nutrients, and they like different conditions." },
      { name: "Fennel", why: "Releases substances that can stunt nearby plants — best grown in a bed of its own." },
    ],
    flowers: [
      { name: "Marigolds", why: "The workhorse — whitefly off, hoverflies in." },
      { name: "Nasturtiums", why: "Sacrificial aphid trap, edible flowers." },
      { name: "Borage", why: "Bees and pollination, all summer long." },
    ],
    faqs: [
      {
        q: "Do marigolds really keep pests off tomatoes?",
        a: "French marigolds genuinely help with whitefly and bring in the hoverflies and ladybirds that eat aphids — that part is well supported. They don't repel every pest, so treat them as one useful part of the picture alongside good airflow and even watering, not a magic forcefield.",
      },
      {
        q: "Can I plant basil and tomatoes in the same pot?",
        a: "Yes — it's a lovely combination in a big pot or growbag. Just keep them well fed and watered, because both are hungry, and give the basil a little light by not letting the tomato foliage smother it completely.",
      },
      {
        q: "What should you never plant near tomatoes?",
        a: "Keep tomatoes away from potatoes (they share blight), brassicas (they compete heavily), and fennel (which can inhibit nearby growth).",
      },
    ],
    seedLinks: [
      { label: "Tomato seeds", url: tm("Tomato") },
      { label: "Basil seeds", url: tm("Basil") },
    ],
    buyerNote: {
      title: "Worth buying for tomatoes and basil",
      buy:
        "Buy basil seed if your tomatoes are in pots, growbags or a greenhouse border. A few basil plants earn their keep at picking time, and French marigolds are useful if whitefly or aphids visit every summer.",
      skip:
        "Skip vague companion mixes. A packet of basil plus one hard-working flower is clearer, cheaper and easier to fit around real tomato plants.",
      links: [
        { label: "Basil seeds", url: tm("Basil"), product: "basil seeds", type: "seed", merchant: "thompson-morgan" },
        { label: "French marigold seeds", url: tm("French Marigold"), product: "French marigold seeds", type: "seed", merchant: "thompson-morgan" },
      ],
    },
    relatedCrops: ["tomatoes", "basil", "lettuce", "spring-onions"],
  },

  // ── 2. Carrots ────────────────────────────────────────────────────────────
  {
    slug: "companion-plants-for-carrots",
    metaTitle: "Companion Plants for Carrots (UK) — Beat Carrot Fly Naturally",
    title: "Companion plants for carrots",
    description:
      "The best companion plants for carrots in the UK — onions, leeks and the aromatic neighbours that mask their scent and confuse carrot fly — plus what to avoid. Honest, plot-tested pairings.",
    keywords: [
      "companion plants for carrots",
      "what to plant with carrots",
      "carrot fly companion planting",
      "carrots and onions",
      "carrot companion planting UK",
    ],
    heroImage: "/photos/blog/carrot-harvest-crate.webp",
    heroAlt: "A crate of freshly pulled carrots on a UK allotment",
    intro:
      "Carrots have one great enemy — carrot fly — and companion planting is one of the gentlest ways to outwit it. The trick is scent: surround your carrots with smells that throw the fly off.",
    sections: [
      {
        paragraphs: [
          "Carrot fly finds your carrots by smell, drifting low across the ground until it picks up that unmistakable carroty scent. The cleverest companions for carrots are strong-smelling alliums — onions, spring onions, leeks, garlic — whose pungency masks the carrots and muddles the fly. Grow them in alternating rows and each crop helps hide the other (onion fly is fooled the same way).",
          "It's worth being honest, though: scent-masking helps, but the most reliable defence is a physical barrier. Carrot fly flies low, so a 60cm wall of fine insect mesh or fleece around the bed keeps the vast majority out. Companion planting and a barrier together is the belt-and-braces approach.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Onions & spring onions", why: "Their scent masks the carrots and confuses carrot fly — the classic alternating-row pairing." },
      { name: "Leeks", why: "Another pungent allium that throws carrot fly off; the two grow happily side by side." },
      { name: "Garlic", why: "Strong-smelling and space-efficient — a good edge planting around a carrot bed." },
      { name: "Lettuce & radishes", why: "Quick, low crops that fill the gaps between slow carrot rows before the carrots need the room." },
      { name: "Chives", why: "Aromatic enough to help mask the bed, and pretty in flower for the bees." },
    ],
    avoid: [
      { name: "Dill & other umbellifers (when flowering)", why: "Close relatives that can cross-attract the same pests and may cross with carrots if left to seed." },
      { name: "Parsnips", why: "Same family, prone to the same pests and diseases — don't grow them cheek by jowl." },
    ],
    flowers: [
      { name: "Marigolds", why: "Bring in hoverflies and brighten the edge of the bed." },
      { name: "Calendula", why: "Cheerful, edible, and a favourite of beneficial insects." },
    ],
    faqs: [
      {
        q: "Do onions really stop carrot fly?",
        a: "They help. Strong-smelling onions and other alliums mask the carrots' scent and make it harder for carrot fly to home in. It's a genuine effect but not total — pair it with a fine mesh or fleece barrier for the most reliable results.",
      },
      {
        q: "How do you plant carrots and onions together?",
        a: "Sow each in its own dense row and alternate them down the bed — a row of carrots, a row of onions, and so on. Each row's scent helps hide the other, confusing both carrot fly and onion fly.",
      },
      {
        q: "What should not be planted near carrots?",
        a: "Avoid parsnips and other close relatives that share pests and diseases, and don't let dill flower right beside them.",
      },
    ],
    seedLinks: [
      { label: "Carrot seeds", url: tm("Carrot") },
      { label: "Onion sets", url: tm("Onion%20Sets") },
    ],
    buyerNote: {
      title: "Worth buying for carrots",
      buy:
        "Buy fine insect mesh if carrot fly has spoiled your rows before. Onions and spring onions help, but mesh is the reliable bit.",
      skip:
        "Skip carrot seed tapes unless you really need the spacing help. Careful thin sowing is usually better value.",
      links: [
        {
          label: "Fine mesh for carrot fly",
          url: "https://www.amazon.co.uk/s?k=fine+mesh+carrot+fly",
          product: "fine mesh for carrot fly",
          type: "gear",
          merchant: "amazon-uk",
        },
      ],
    },
    relatedCrops: ["carrots", "onion-sets", "spring-onions", "leeks"],
  },

  // ── 3. Beans ──────────────────────────────────────────────────────────────
  {
    slug: "companion-plants-for-beans",
    metaTitle: "Companion Plants for Beans (UK) — Runner & French Beans",
    title: "Companion plants for beans",
    description:
      "The best companion plants for runner and French beans in the UK — sweetcorn, squash, summer savory and the flowers that lure blackfly away — plus what to keep apart. Plot-tested pairings.",
    keywords: [
      "companion plants for beans",
      "what to plant with runner beans",
      "french bean companion planting",
      "beans and sweetcorn",
      "bean companion planting UK",
    ],
    heroImage: "/photos/blog/first-summer-peas.webp",
    heroAlt: "Beans and peas climbing their supports on a UK allotment",
    intro:
      "Beans are generous neighbours — they fix nitrogen in the soil, feeding what grows around them — so they pair well with a lot. The main job of their companions is to keep blackfly at bay and the pollinators coming.",
    sections: [
      {
        paragraphs: [
          "Beans (and peas) have a quiet superpower: with the help of bacteria on their roots they pull nitrogen out of the air and bank it in the soil, leaving the ground richer for whatever follows. That makes them excellent companions for leafy, nitrogen-hungry crops nearby.",
          "Their main pest is blackfly, which clusters on the soft growing tips — so a sacrificial nasturtium to draw it away, and flowers to bring in ladybirds and hoverflies, are the most useful neighbours. Runner beans in particular need pollinators to set pods well, so anything that brings bees to the wigwam is earning its place.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Sweetcorn", why: "Beans climb the corn and feed it nitrogen — the heart of the Three Sisters." },
      { name: "Squash & courgettes", why: "Sprawl beneath the beans, shading the soil and keeping weeds and moisture in check." },
      { name: "Summer savory", why: "The traditional 'bean herb' — said to deter blackfly and lovely with the beans in the pot." },
      { name: "Lettuce & spinach", why: "Leafy crops that lap up the nitrogen the beans leave behind." },
      { name: "Carrots", why: "Use the cool ground at the base of the climbers without competing for height." },
    ],
    avoid: [
      { name: "Onions, garlic & other alliums", why: "Their root secretions can check the growth of beans and peas — keep them in a separate bed." },
      { name: "Fennel", why: "Inhibits nearby plants generally; give it its own corner." },
    ],
    flowers: [
      { name: "Nasturtiums", why: "Sacrificial blackfly magnet — draws the aphids onto themselves." },
      { name: "Marigolds", why: "Hoverflies and ladybirds in, aphids down." },
      { name: "Sweet peas", why: "Climb alongside, bring in bees, and scent the whole plot." },
    ],
    faqs: [
      {
        q: "What grows well with runner beans?",
        a: "Sweetcorn and squash (the Three Sisters), leafy crops like lettuce and spinach that enjoy the nitrogen beans leave behind, and flowers such as nasturtiums and sweet peas to lure blackfly away and bring in the bees runner beans need for good pods.",
      },
      {
        q: "Can you plant beans and onions together?",
        a: "Best not to. Alliums (onions, garlic, leeks, chives) can inhibit the growth of beans and peas, so keep them in separate beds.",
      },
      {
        q: "Do beans really improve the soil?",
        a: "Yes — beans and peas fix nitrogen from the air into nodules on their roots. Cut the plants off at ground level at the end of the season and leave the roots in, and that nitrogen stays to feed next year's leafy crops.",
      },
    ],
    seedLinks: [
      { label: "Runner bean seeds", url: tm("Runner%20Bean") },
      { label: "Climbing French bean seeds", url: tm("Climbing%20French%20Bean") },
    ],
    buyerNote: {
      title: "Worth buying for beans",
      buy:
        "Buy nasturtium seed if blackfly usually finds your beans. It gives the aphids somewhere else to gather and still brings colour to the poles.",
      skip:
        "Skip bean inoculant for ordinary UK allotment soil unless you are starting on very poor, new ground.",
      links: [
        { label: "Nasturtium seeds", url: tm("Nasturtium"), product: "nasturtium seeds", type: "seed", merchant: "thompson-morgan" },
        { label: "Sweet pea seeds", url: tm("Sweet Pea"), product: "sweet pea seeds", type: "seed", merchant: "thompson-morgan" },
      ],
    },
    relatedCrops: ["runner-beans", "french-beans", "sweetcorn", "pumpkins"],
  },

  // ── 4. Brassicas ──────────────────────────────────────────────────────────
  {
    slug: "companion-plants-for-brassicas",
    metaTitle: "Companion Plants for Brassicas (UK) — Cabbage, Kale & Broccoli",
    title: "Companion plants for brassicas",
    description:
      "The best companion plants for brassicas in the UK — cabbage, kale, broccoli and sprouts — using aromatic herbs and sacrificial flowers to outwit cabbage white butterflies and aphids. Plus what to avoid.",
    keywords: [
      "companion plants for brassicas",
      "what to plant with cabbage",
      "kale companion planting",
      "cabbage white butterfly deterrent",
      "brassica companion planting UK",
    ],
    heroImage: "/photos/blog/allotment-netting-cloches-2024.webp",
    heroAlt: "Brassicas growing under protective netting on a UK allotment",
    intro:
      "Brassicas — cabbage, kale, broccoli, sprouts, cauliflower — are a buffet for cabbage white butterflies, aphids and flea beetle. Good companions confuse the pests; good netting finishes the job.",
    sections: [
      {
        paragraphs: [
          "The cabbage family feeds the whole hungry gap and right through winter, but everything wants to eat it first. The most useful companions are strongly aromatic plants that mask the brassica scent the cabbage white butterfly hunts by, and sacrificial or attractant flowers that pull aphids and bring in their predators.",
          "Be honest with yourself, though: against cabbage whites, nothing beats a physical barrier. Fine butterfly netting held off the leaves stops them laying their eggs in the first place. Think of companion planting as the supporting act and the netting as the headliner.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Aromatic herbs (dill, mint, rosemary, sage, thyme)", why: "Their strong scents mask the cabbagey smell that draws the cabbage white butterfly." },
      { name: "Onions & garlic", why: "Pungent alliums help confuse pests hunting by smell." },
      { name: "Nasturtiums", why: "A sacrificial trap — caterpillars and aphids often go for these instead of your cabbages." },
      { name: "Beetroot & chard", why: "Easy-going neighbours that don't compete for the same things." },
      { name: "Celery", why: "Said to help deter the cabbage white, and happy in the same rich, moist soil." },
    ],
    avoid: [
      { name: "Strawberries", why: "Traditional poor partners that seem to check each other and share some pests." },
      { name: "Tomatoes & other heavy feeders", why: "Compete hard for nutrients — brassicas are greedy enough on their own." },
      { name: "Climbing beans (right alongside)", why: "Can shade and crowd brassicas; better in a neighbouring bed." },
    ],
    flowers: [
      { name: "Nasturtiums", why: "Sacrificial trap for caterpillars and aphids." },
      { name: "Marigolds", why: "Bring in hoverflies and ladybirds to clear aphids." },
      { name: "Calendula", why: "Attracts beneficial insects and brightens the bed." },
    ],
    faqs: [
      {
        q: "How do I stop cabbage white butterflies without netting?",
        a: "Aromatic companions like dill, mint, sage and onions help mask the scent the butterflies hunt by, and a ring of nasturtiums can lure caterpillars away. But for reliable protection, fine butterfly netting held off the leaves is far and away the most effective method — use the companions to support it, not replace it.",
      },
      {
        q: "What can I plant with kale?",
        a: "Kale enjoys the same companions as the rest of the brassica family: aromatic herbs, onions and garlic to confuse pests, nasturtiums and marigolds as flower helpers, and easy neighbours like beetroot and chard.",
      },
      {
        q: "What should not be grown near cabbages?",
        a: "Keep brassicas away from strawberries, and don't crowd them with other heavy feeders like tomatoes that compete for the same nutrients.",
      },
    ],
    seedLinks: [
      { label: "Kale seeds", url: tm("Kale") },
      { label: "Cabbage seeds", url: tm("Cabbage") },
    ],
    buyerNote: {
      title: "Worth buying for brassicas",
      buy:
        "Buy fine butterfly netting if you are growing cabbage, kale or broccoli. Herbs and flowers help, but netting is what stops the eggs being laid.",
      skip:
        "Skip butterfly decoys and miracle sprays. Keep the mesh lifted off the leaves and spend the money there first.",
      links: [
        {
          label: "Fine butterfly netting",
          url: "https://www.amazon.co.uk/s?k=brassica+butterfly+netting+fine+mesh",
          product: "fine butterfly netting",
          type: "gear",
          merchant: "amazon-uk",
        },
      ],
    },
    relatedCrops: ["kale", "cabbage", "broccoli", "brussels-sprouts"],
  },

  // ── 5. Courgettes & squash ────────────────────────────────────────────────
  {
    slug: "companion-plants-for-courgettes",
    metaTitle: "Companion Plants for Courgettes & Squash (UK Guide)",
    title: "Companion plants for courgettes & squash",
    description:
      "The best companion plants for courgettes, squash and pumpkins in the UK — flowers for pollination, nasturtiums and beans alongside — plus what to avoid. The pairings that lift your harvest.",
    keywords: [
      "companion plants for courgettes",
      "what to plant with squash",
      "pumpkin companion planting",
      "courgette pollination flowers",
      "courgette companion planting UK",
    ],
    heroImage: "/photos/blog/courgette-marigold-bed-june.webp",
    heroAlt: "Courgettes growing alongside marigolds in a June allotment bed",
    intro:
      "Courgettes, squash and pumpkins are greedy, sprawling and entirely dependent on pollinators to set fruit. Their best companions bring in the bees and make use of the space above their broad leaves.",
    sections: [
      {
        paragraphs: [
          "The squash family produces separate male and female flowers, and a bee has to carry pollen from one to the other for a fruit to swell — so the single most valuable thing you can do is plant flowers that pull pollinators in. A bed full of bees is a bed full of courgettes.",
          "They also cast dense shade with those big leaves, which is a gift: it keeps the soil moist and smothers weeds. That makes them the 'squash' of the Three Sisters, sprawling at the feet of sweetcorn and beans. Just give everything plenty of room and plenty of muck — these plants are hungry.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Borage", why: "A relentless bee magnet — the best single flower for pollinating squash, and edible too." },
      { name: "Nasturtiums", why: "Lure aphids away and bring in pollinators; they ramble happily among the squash." },
      { name: "Sweetcorn & beans", why: "The Three Sisters — corn for height, beans for nitrogen, squash to cover the ground." },
      { name: "Marigolds & calendula", why: "Bring in hoverflies and bees and keep the soil edges cheerful." },
      { name: "Dill", why: "Attracts pollinators and predatory insects when allowed to flower." },
    ],
    avoid: [
      { name: "Potatoes", why: "Greedy for the same nutrients and water, and awkward to harvest under sprawling squash." },
      { name: "Other heavy feeders crowded in close", why: "Squash need elbow room and plenty of food — don't make them fight for it." },
    ],
    flowers: [
      { name: "Borage", why: "The number-one pollinator plant for squash." },
      { name: "Nasturtiums", why: "Aphid trap and pollinator draw in one." },
      { name: "Calendula", why: "Beneficial insects and an edible, cheerful edge." },
    ],
    faqs: [
      {
        q: "How do I get more courgettes to set fruit?",
        a: "Most 'failed' courgettes are simply un-pollinated. Plant pollinator flowers like borage and nasturtiums nearby to bring the bees in, and in cool or quiet weather you can hand-pollinate: pick a male flower (the one on a thin stalk), strip the petals, and dab its pollen into the centre of the female flowers (the ones with a tiny fruit behind them).",
      },
      {
        q: "What grows well with pumpkins and squash?",
        a: "Sweetcorn and beans (the Three Sisters), and pollinator flowers such as borage, nasturtiums and calendula. Give them all space — squash sprawl further than you expect.",
      },
      {
        q: "What should not be planted with courgettes?",
        a: "Keep them away from potatoes, which compete for the same food and water and make harvesting a tangle, and don't crowd them with other greedy feeders.",
      },
    ],
    seedLinks: [
      { label: "Courgette seeds", url: tm("Courgette") },
      { label: "Squash & pumpkin seeds", url: tm("Squash") },
    ],
    relatedCrops: ["courgettes", "pumpkins", "sweetcorn", "borage"],
  },

  // ── 6. What NOT to plant together ─────────────────────────────────────────
  {
    slug: "what-not-to-plant-together",
    metaTitle: "What NOT to Plant Together — Vegetable Companion Mistakes (UK)",
    title: "What not to plant together",
    description:
      "The vegetable combinations to keep apart in the UK — the bad neighbours that compete, share diseases or stunt each other. A clear, honest list of companion-planting mistakes to avoid.",
    keywords: [
      "what not to plant together",
      "bad companion plants",
      "vegetables not to grow together",
      "companion planting mistakes",
      "plants that don't grow well together",
    ],
    heroImage: "/photos/guides/companion-planting-full-plot.webp",
    heroAlt: "A well-planned allotment plot with mixed companion planting",
    intro:
      "Companion planting is mostly about good matches — but a few pairings genuinely work against you. Here are the combinations worth keeping apart, and the honest reasons why.",
    sections: [
      {
        paragraphs: [
          "Most 'bad neighbour' rules come down to three real problems: plants in the same family share the same pests and diseases (so trouble spreads fast), some plants are simply too greedy to share a bed, and a handful release substances that genuinely check what grows beside them. The folklore around this is thick, so below are the ones that actually hold up.",
        ],
      },
    ],
    avoid: [
      { name: "Tomatoes + potatoes", why: "Same family — both get blight, and grown together it sweeps through both. The most important pair to separate." },
      { name: "Onions/garlic + beans & peas", why: "Allium root secretions can stunt the growth of legumes. Keep them in different beds." },
      { name: "Brassicas + strawberries", why: "Long-standing poor partners that seem to check each other and share pests." },
      { name: "Fennel + almost everything", why: "Fennel releases compounds that inhibit many neighbours — give it a bed of its own." },
      { name: "Carrots + parsnips (and dill in flower)", why: "Close relatives that share carrot fly and other umbellifer pests." },
      { name: "Courgettes/squash + potatoes", why: "Two greedy crops competing for the same food and water, and a nightmare to harvest together." },
      { name: "Mint (planted free in a bed)", why: "Not a bad companion so much as a bully — it runs everywhere. Always grow it in a sunken pot." },
    ],
    faqs: [
      {
        q: "Why can't tomatoes and potatoes grow together?",
        a: "They're in the same family (the nightshades) and share the same diseases — most importantly blight. Grown side by side, an outbreak can wipe out both at once, so keep them in separate parts of the plot.",
      },
      {
        q: "Is companion planting 'don't' folklore actually true?",
        a: "Some of it is, some isn't. The reliable rules have real reasons behind them — shared family diseases, heavy competition, or genuine growth inhibition (as with fennel). Vaguer claims with no mechanism are best taken with a pinch of salt. This list sticks to the ones that hold up.",
      },
      {
        q: "What's the single most important thing to keep apart?",
        a: "Tomatoes and potatoes, because of blight. If you remember only one rule, make it that one.",
      },
    ],
    relatedCrops: ["tomatoes", "maincrop-potatoes", "onion-sets"],
  },

  // ── 7. Small gardens & raised beds ────────────────────────────────────────
  {
    slug: "companion-planting-small-gardens",
    metaTitle: "Companion Planting in Small Gardens & Raised Beds (UK)",
    title: "Companion planting for small gardens & raised beds",
    description:
      "How to companion plant in a small garden, raised bed or container in the UK — making every inch work with good pairings, the square-foot method, and pots that grow more in less space.",
    keywords: [
      "companion planting small garden",
      "raised bed companion planting",
      "container companion planting",
      "square foot gardening companions",
      "small space vegetable planting UK",
    ],
    heroImage: "/photos/blog/square-growing-bed.webp",
    heroAlt: "A raised bed gridded into squares, each with a different crop — square-foot growing",
    intro:
      "In a small garden or a raised bed, companion planting isn't a nicety — it's how you fit more in. Grow plants that share a space happily and you'll harvest far more from a tiny plot.",
    sections: [
      {
        paragraphs: [
          "When space is tight, the goal is to stack crops that want different things from the same patch of soil: something tall and something low, a fast crop and a slow one, a leaf and a root. Good companions, by definition, are plants that don't fight over the same light, water and nutrients — so companion planting and small-space growing are really the same skill.",
          "The square-foot method is the natural home for this. Grid a raised bed into squares and give each one a crop spaced to suit it: a square of lettuce in the cool shade of a taller neighbour, carrots beside onions, radishes filling a gap that'll be empty again in a month. A tall raised bed brings it all up to a comfortable height, too — kinder on the back, and easier to keep tucked and tidy.",
        ],
      },
      {
        heading: "Pairings that earn their inch",
        paragraphs: [
          "Grow climbers up and leaves below: beans or a cordon tomato going skywards, with lettuce or herbs at their feet. Pair a quick crop with a slow one — radishes between carrot rows are pulled long before the carrots need the space. And tuck a few flowers into the corners (marigolds, nasturtiums) to pull pests off such closely-packed plants.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Lettuce under taller crops", why: "Uses the cool shade of tomatoes or beans without needing its own patch of sun." },
      { name: "Radishes between slow rows", why: "Up and harvested in a month — perfect gap-fillers between carrots or parsnips." },
      { name: "Carrots + onions in a bed", why: "Alternating rows mask each other's scent and pack two crops into one space." },
      { name: "Herbs at the edges", why: "Chives, parsley and basil tuck into corners and earn their keep in the kitchen." },
      { name: "Climbing beans up a wigwam", why: "Grow vertically for a big harvest from a tiny footprint, with room beneath for leaves." },
    ],
    flowers: [
      { name: "Marigolds", why: "Compact pest-control that fits any corner." },
      { name: "Nasturtiums", why: "Trail over the edge of a raised bed or pot, luring aphids away." },
    ],
    faqs: [
      {
        q: "Can you companion plant in containers and pots?",
        a: "Absolutely — just keep partners that like the same watering and feeding together, and don't overcrowd. A big pot of tomatoes with basil and a trailing nasturtium over the edge is a classic small-space combination that works beautifully.",
      },
      {
        q: "How do I fit more into a small raised bed?",
        a: "Grow upwards as well as along (climbing beans, cordon tomatoes), pair quick crops with slow ones so nothing sits idle, and use the square-foot method to give each crop just the space it needs. Companion planting is what makes this dense growing work without the plants fighting.",
      },
    ],
    seedLinks: [
      { label: "Lettuce seeds", url: tm("Lettuce") },
      { label: "Radish seeds", url: tm("Radish") },
    ],
    relatedCrops: ["lettuce", "radishes", "carrots", "spring-onions"],
  },

  // ── 8. Flowers for the veg patch ──────────────────────────────────────────
  {
    slug: "flowers-for-the-veg-patch",
    metaTitle: "Best Flowers for the Vegetable Garden (UK Companion Flowers)",
    title: "Flowers for the veg patch",
    description:
      "The best flowers to grow with vegetables in the UK — marigolds, nasturtiums, borage, calendula and sweet peas — and exactly what each one does for your crops. Beauty that earns its keep.",
    keywords: [
      "best flowers for vegetable garden",
      "companion flowers vegetables",
      "marigolds nasturtiums borage",
      "flowers to deter pests",
      "pollinator flowers vegetable garden UK",
    ],
    heroImage: "/photos/blog/marigold-lettuce-midsummer-2025.webp",
    heroAlt: "Marigolds flowering alongside lettuce in a midsummer allotment bed",
    intro:
      "Flowers aren't just for show on the veg patch — the right ones pull pests away, bring in pollinators and predators, and quietly lift your whole harvest. These are the ones that genuinely earn their place.",
    sections: [
      {
        paragraphs: [
          "A vegetable bed with flowers in it isn't decoration — it's pest control and pollination working for free. Some flowers act as decoys, drawing aphids and blackfly onto themselves; some bring in the hoverflies, ladybirds and lacewings whose larvae devour aphids; and some are simply irresistible to bees, which means more fruit set on everything from courgettes to beans. A few do all three.",
          "They're also the thing that makes a plot somewhere you actually want to be — and a flower-filled bed is exactly the sort of thing people stop and photograph. Here's what each of the workhorses does.",
        ],
      },
    ],
    flowers: [
      { name: "French marigolds", why: "The all-rounder — pull whitefly off tomatoes and bring in hoverflies that eat aphids. The first flower to add to any veg bed." },
      { name: "Nasturtiums", why: "Sacrificial trap crop: blackfly and aphids swarm these instead of your beans and brassicas. Edible flowers and leaves too." },
      { name: "Borage", why: "A relentless bee magnet — superb for pollinating courgettes, squash and beans. Self-seeds happily and the flowers are edible." },
      { name: "Calendula (pot marigold)", why: "Brings in beneficial insects all season, copes with poor soil, and the petals are edible. Endlessly cheerful." },
      { name: "Sweet peas", why: "Climb alongside beans, bring in pollinators, and scent the whole plot — the most fragrant way to feed the bees." },
      { name: "Poached egg plant (Limnanthes)", why: "A low carpet of hoverfly-pulling flowers — superb aphid control, and it self-seeds to come back each year." },
    ],
    faqs: [
      {
        q: "What flowers should I plant in my vegetable garden?",
        a: "Start with French marigolds (pest control and hoverflies), nasturtiums (a sacrificial aphid trap), and borage (the best bee magnet for pollination). Add calendula, sweet peas and poached egg plant and you've covered decoys, predators and pollinators all at once.",
      },
      {
        q: "Which flowers attract pollinators to vegetables?",
        a: "Borage is the standout for bees, with sweet peas, calendula and poached egg plant close behind. More bees means better fruit set on courgettes, squash, beans and tomatoes.",
      },
      {
        q: "Are these flowers edible?",
        a: "Several are — nasturtium flowers and leaves are peppery in a salad, borage flowers are lovely in a drink, and calendula petals brighten a plate. Marigolds and sweet peas are best left for the insects (sweet peas in particular are not for eating).",
      },
    ],
    seedLinks: [
      { label: "Marigold seeds", url: tm("Marigold") },
      { label: "Nasturtium seeds", url: tm("Nasturtium") },
      { label: "Borage seeds", url: tm("Borage") },
      { label: "Sweet pea seeds", url: tm("Sweet%20Pea") },
    ],
    relatedCrops: ["marigolds", "nasturtium", "borage", "sweet-peas"],
  },

  // ── 9. Strawberries ───────────────────────────────────────────────────────
  {
    slug: "companion-plants-for-strawberries",
    metaTitle: "Companion Plants for Strawberries (UK) — What to Grow & Avoid",
    title: "Companion plants for strawberries",
    description:
      "The best companion plants for strawberries in the UK — borage, chives and the flowers that bring in pollinators and keep pests off — plus what to keep well apart. Plot-tested pairings for sweeter berries.",
    keywords: [
      "companion plants for strawberries",
      "what to plant with strawberries",
      "strawberry companion planting UK",
      "borage and strawberries",
      "strawberry bed planting",
    ],
    heroImage: "/photos/blog/strawberry-plants-flowering.webp",
    heroAlt: "Strawberry plants in flower on a UK allotment",
    intro:
      "Strawberries are the first sweet thing off the plot each summer, and a few good neighbours genuinely earn their keep — bringing in the bees that set every berry and quietly keeping the worst of the pests at bay.",
    sections: [
      {
        paragraphs: [
          "Every strawberry begins as a flower that a bee has to visit — and a poorly pollinated flower gives you a small, lopsided berry rather than a plump one. So the most useful companions for strawberries are the ones that pull pollinators in, with borage at the top of the list. Old hands have grown borage among their strawberries for generations, and it really does seem to bring sweeter, better-set fruit.",
          "The other job for a strawberry bed's companions is gentle pest control: aromatic alliums like chives and garlic to confuse the pests hunting by smell, and a few flowers to bring in the hoverflies and ladybirds that deal with aphids. Keep the bed open and airy, mulch under the fruit so it stays clean, and the right neighbours do the rest.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Borage", why: "The classic strawberry partner — a relentless bee magnet that lifts pollination and, by repute, the flavour of the fruit. Edible flowers too." },
      { name: "Chives & garlic", why: "Pungent alliums that help confuse pests and are said to keep grey mould off the bed; tuck them around the edges." },
      { name: "Lettuce & spinach", why: "Low, quick leaves that fill the gaps between young plants and are cropped before the strawberries spread." },
      { name: "Thyme & sage", why: "Low aromatic herbs that cover the soil, deter some pests and bring in beneficial insects." },
      { name: "Marigolds", why: "Bring in hoverflies whose larvae clear aphids, and brighten the edge of the bed." },
    ],
    avoid: [
      { name: "Brassicas (cabbage, kale, broccoli)", why: "Long-standing poor partners — they seem to check strawberries and compete hard as heavy feeders." },
      { name: "Potatoes, tomatoes & other nightshades", why: "Share some soil diseases (including verticillium wilt) that strawberries are prone to — keep them well apart." },
      { name: "Fennel", why: "Inhibits many neighbours generally; give it a bed of its own." },
    ],
    flowers: [
      { name: "Borage", why: "Number-one pollinator plant for strawberries." },
      { name: "Marigolds", why: "Hoverflies in, aphids down." },
      { name: "Calendula", why: "Beneficial insects and a cheerful, edible edge." },
    ],
    faqs: [
      {
        q: "What grows well with strawberries?",
        a: "Borage above all — it brings in the bees that pollinate every flower and is said to sweeten the fruit. Add chives or garlic to help keep pests and mould off, low herbs like thyme and sage to cover the soil, and a few marigolds for the hoverflies that eat aphids.",
      },
      {
        q: "Why plant borage with strawberries?",
        a: "Borage is one of the best bee magnets you can grow, and strawberries need plenty of pollinator visits for plump, well-shaped berries. Many growers also swear it improves the flavour. It self-seeds happily, so once you have it you tend to keep it — and the flowers are pretty in a summer drink.",
      },
      {
        q: "What should not be planted near strawberries?",
        a: "Keep strawberries away from brassicas (traditional poor partners) and from potatoes, tomatoes and other nightshades, which share soil diseases like verticillium wilt that strawberries catch easily.",
      },
      {
        q: "Can I plant strawberries in a bed with other crops?",
        a: "Yes — strawberries are happy sharing space with low, quick crops like lettuce and spinach while they establish, and with aromatic herbs and pollinator flowers around the edges. Just give them room to send out runners and keep the fruit mulched off the soil.",
      },
    ],
    seedLinks: [
      { label: "Strawberry plants", url: tm("Strawberry") },
      { label: "Borage seeds", url: tm("Borage") },
    ],
    relatedCrops: ["strawberries", "lettuce", "spinach", "spring-onions"],
  },

  // ── 10. Potatoes ──────────────────────────────────────────────────────────
  {
    slug: "companion-plants-for-potatoes",
    metaTitle: "Companion Plants for Potatoes (UK) — What to Grow & Avoid",
    title: "Companion plants for potatoes",
    description:
      "The best companion plants for potatoes in the UK — beans, sweetcorn and the flowers that deter pests — plus the crops to keep well away. Honest, plot-tested pairings for a healthier crop.",
    keywords: [
      "companion plants for potatoes",
      "what to plant with potatoes",
      "potato companion planting UK",
      "beans and potatoes",
      "what not to plant with potatoes",
    ],
    heroImage: "/photos/blog/potato-rows-growing.webp",
    heroAlt: "Rows of potatoes growing on a UK allotment",
    intro:
      "Potatoes take up a good chunk of the plot and ask for little, but a few thoughtful neighbours help — feeding the soil they're grown in, drawing pests away, and making the most of the ground before the haulm fills out.",
    sections: [
      {
        paragraphs: [
          "Potatoes are greedy, leafy and grown for what's underground, so their best companions either feed them or use the space around them without getting in the way of earthing up and digging. Beans and peas are the stars: they fix nitrogen into the soil, which the hungry potato foliage laps up, and they grow up rather than out.",
          "The pests to watch are aphids and, in some plots, the soil-borne troubles that build up if you grow potatoes in the same spot too often — so good companions plus sensible crop rotation matter more here than almost anywhere. The one rule to never break: keep potatoes and tomatoes apart, because they share blight and an outbreak will sweep through both.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Beans & peas", why: "Fix nitrogen the hungry potato foliage feeds on, and grow upward without crowding the rows." },
      { name: "Sweetcorn", why: "Tall and undemanding at ground level — happy to share a bed without competing for the same space." },
      { name: "Brassicas (cabbage, kale)", why: "Different feeding habits and a useful rotation partner; they don't fight the potatoes for the same things." },
      { name: "Horseradish", why: "Traditionally grown at the corners of a potato patch — said to improve the crop's health and resistance." },
      { name: "Marigolds & nasturtiums", why: "Pull aphids away and bring in hoverflies; nasturtiums can act as a sacrificial trap." },
    ],
    avoid: [
      { name: "Tomatoes", why: "Same family, same blight — the single most important pair to keep apart on the whole plot." },
      { name: "Courgettes, squash & pumpkins", why: "Two greedy crops competing for the same food and water, and a tangle to harvest together." },
      { name: "Sunflowers", why: "Can stunt nearby potatoes and compete heavily for light and moisture." },
      { name: "Carrots & other roots", why: "Earthing up and digging potatoes disturbs neighbouring root crops — keep them in their own bed." },
    ],
    flowers: [
      { name: "Marigolds", why: "Hoverflies in, aphids down." },
      { name: "Nasturtiums", why: "Sacrificial aphid trap that rambles happily between rows." },
      { name: "Calendula", why: "Brings in beneficial insects and copes with rough ground." },
    ],
    faqs: [
      {
        q: "What can I plant with potatoes?",
        a: "Beans and peas are the best partners — they feed nitrogen into the soil the potatoes are hungry for. Sweetcorn shares the space well, brassicas make a good rotation neighbour, and marigolds or nasturtiums keep aphids in check. Horseradish at the corners is a traditional health booster.",
      },
      {
        q: "Why can't you plant potatoes and tomatoes together?",
        a: "They're both nightshades and share the same diseases — most importantly blight. Grown side by side, an outbreak can wipe out both crops at once. If you remember only one companion-planting rule, make it this one.",
      },
      {
        q: "What should not be planted near potatoes?",
        a: "Keep potatoes away from tomatoes (shared blight), from courgettes, squash and pumpkins (greedy competitors that make harvesting a nightmare), and from carrots and other roots that get disturbed when you earth up and dig.",
      },
      {
        q: "Do marigolds help potatoes?",
        a: "They help indirectly — marigolds bring in the hoverflies and ladybirds whose larvae eat aphids, and a ring of them brightens the patch. They're a useful supporting act alongside good rotation and healthy seed potatoes, not a cure-all.",
      },
    ],
    seedLinks: [
      { label: "Seed potatoes", url: tm("Seed%20Potatoes") },
      { label: "Runner bean seeds", url: tm("Runner%20Bean") },
    ],
    relatedCrops: ["maincrop-potatoes", "early-potatoes", "runner-beans", "sweetcorn"],
  },

  // ── 11. Onions & garlic ───────────────────────────────────────────────────
  {
    slug: "companion-plants-for-onions-garlic",
    metaTitle: "Companion Plants for Onions & Garlic (UK) — What to Grow",
    title: "Companion plants for onions & garlic",
    description:
      "The best companion plants for onions, garlic, shallots and leeks in the UK — carrots, beetroot and the crops their scent protects — plus what to keep apart. Plot-tested allium pairings.",
    keywords: [
      "companion plants for onions",
      "companion plants for garlic",
      "what to plant with onions",
      "carrots and onions companion planting",
      "allium companion planting UK",
    ],
    heroImage: "/photos/blog/sowing-drills-allotment-spring.webp",
    heroAlt: "Freshly drawn drills ready for sowing on a spring allotment",
    intro:
      "Onions, garlic and their allium cousins are some of the most generous companions on the plot — their pungent scent quietly protects the crops around them. The trick is knowing the few things they'd rather not sit beside.",
    sections: [
      {
        paragraphs: [
          "Alliums — onions, garlic, shallots, leeks, chives — earn their place as companions through sheer smell. That oniony pungency masks the scent of nearby crops and muddles the pests hunting by nose, which is exactly why the carrot-and-onion pairing is the most famous in the whole of companion planting: each one's scent helps hide the other from its particular fly.",
          "They're also wonderfully space-efficient, growing slim and upright with little canopy, so they slot in around almost anything. The one group to keep them away from is the legumes — beans and peas — whose growth allium root secretions can genuinely check. Other than that, alliums are easy, willing neighbours all over the plot.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Carrots", why: "The classic pairing — onion scent confuses carrot fly and carrot scent confuses onion fly. Grow in alternating rows." },
      { name: "Beetroot & chard", why: "Easy-going neighbours that don't compete with the slim, upright alliums for space." },
      { name: "Lettuce & other salad", why: "Quick low leaves that fill the ground between allium rows before the bulbs swell." },
      { name: "Brassicas (cabbage, kale)", why: "Pungent alliums help confuse the pests hunting brassicas by smell." },
      { name: "Strawberries", why: "Chives and garlic tucked around a strawberry bed are said to help keep mould and pests off the fruit." },
    ],
    avoid: [
      { name: "Beans & peas", why: "Allium root secretions can stunt the growth of legumes — the one pairing to always keep in separate beds." },
      { name: "Asparagus", why: "A long-lived crop that resents the competition; give alliums their own ground." },
      { name: "Sage", why: "Traditionally said to clash with onions — easy enough to keep apart." },
    ],
    flowers: [
      { name: "Chamomile", why: "An old companion said to improve the growth and flavour of onions nearby." },
      { name: "Marigolds", why: "Bring in hoverflies and brighten the edge of the bed." },
    ],
    faqs: [
      {
        q: "What grows well with onions and garlic?",
        a: "Carrots are the classic partner — the two scents confuse each other's flies. Beetroot, chard, lettuce and brassicas all make easy neighbours, and a ring of chives or garlic around strawberries is said to keep pests and mould off the fruit.",
      },
      {
        q: "Why plant carrots and onions together?",
        a: "Carrot fly and onion fly both hunt by smell. Grown in alternating rows, the onion scent masks the carrots and the carrot scent masks the onions, so each crop helps hide the other. Pair it with a fine mesh barrier for the most reliable protection.",
      },
      {
        q: "What should not be planted near onions or garlic?",
        a: "Keep alliums away from beans and peas — their root secretions can genuinely stunt legumes. It's also worth keeping them clear of asparagus and, by tradition, sage.",
      },
      {
        q: "Can I plant garlic with other vegetables?",
        a: "Yes — garlic is one of the best companions there is. Its scent helps protect carrots, brassicas and strawberries from pests, and it takes up so little room you can tuck cloves in around the edges of almost any bed except where beans and peas are growing.",
      },
    ],
    seedLinks: [
      { label: "Onion sets", url: tm("Onion%20Sets") },
      { label: "Garlic bulbs", url: tm("Garlic") },
    ],
    relatedCrops: ["onion-sets", "garlic", "leeks", "carrots"],
  },

  // ── 12. Cucumbers ─────────────────────────────────────────────────────────
  {
    slug: "companion-plants-for-cucumbers",
    metaTitle: "Companion Plants for Cucumbers (UK) — What to Grow & Avoid",
    title: "Companion plants for cucumbers",
    description:
      "The best companion plants for cucumbers in the UK — beans, dill and the flowers that bring in pollinators — plus what to keep apart. Plot-tested pairings for a heavier, healthier cucumber crop.",
    keywords: [
      "companion plants for cucumbers",
      "what to plant with cucumbers",
      "cucumber companion planting UK",
      "dill and cucumbers",
      "cucumber pollination flowers",
    ],
    heroImage: "/photos/guides/allotment-wide-summer.webp",
    heroAlt: "A summer allotment in full growth",
    intro:
      "Cucumbers are thirsty, hungry climbers that crop generously once they get going — and the right neighbours help them along, bringing in pollinators and using the ground at their feet while they scramble upward.",
    sections: [
      {
        paragraphs: [
          "Cucumbers, like their squash relatives, lean on pollinators to set fruit (outdoor and ridge types especially), so flowers that pull bees in are among their best companions. Beans and peas make excellent partners too, fixing nitrogen into the soil that the hungry cucumber vines feed on, and they climb companionably rather than sprawling into the same space.",
          "Down at ground level, low salad crops make good use of the cool, shaded soil beneath the foliage, and aromatic dill is a long-standing cucumber friend — said to bring in beneficial insects and lovely with cucumber in the kitchen. Keep the one classic clash in mind: strongly aromatic herbs like sage can check cucumbers, so keep those apart.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Beans & peas", why: "Fix nitrogen the hungry cucumbers feed on, and climb alongside without competing for the same ground." },
      { name: "Dill", why: "The traditional cucumber herb — brings in beneficial insects and pairs with cucumber on the plate." },
      { name: "Lettuce & radishes", why: "Quick, low crops that use the cool shade beneath the vines and are cropped before the cucumbers take over." },
      { name: "Sweetcorn", why: "Tall and undemanding — cucumbers can even be trained up it, sharing space like a loose Three Sisters." },
      { name: "Nasturtiums", why: "Lure aphids and cucumber beetles away and bring in pollinators; they ramble happily nearby." },
    ],
    avoid: [
      { name: "Sage & other strong aromatic herbs", why: "Said to check the growth of cucumbers — keep the pungent herbs in a separate bed." },
      { name: "Potatoes", why: "Greedy for the same food and water, and harvesting them disturbs the cucumbers' roots." },
      { name: "Melons & other cucurbits crowded close", why: "Same family, same pests and diseases — give them room so trouble can't spread fast." },
    ],
    flowers: [
      { name: "Nasturtiums", why: "Aphid and beetle trap, plus a pollinator draw." },
      { name: "Borage", why: "A bee magnet that lifts pollination and fruit set." },
      { name: "Marigolds", why: "Hoverflies in, aphids down." },
    ],
    faqs: [
      {
        q: "What grows well with cucumbers?",
        a: "Beans and peas (they feed nitrogen into the soil), dill (the classic cucumber herb), low salad crops like lettuce and radishes for the shaded ground beneath, and pollinator flowers such as nasturtiums and borage to bring the bees in for good fruit set.",
      },
      {
        q: "Can you plant cucumbers and tomatoes together?",
        a: "You can, but it's not ideal — both are hungry, thirsty and want plenty of room and airflow, so together they compete and can crowd each other into disease. If you do grow them side by side (in a greenhouse, say), feed and water generously and keep good space between them.",
      },
      {
        q: "What should not be planted near cucumbers?",
        a: "Keep cucumbers away from strongly aromatic herbs like sage that can check their growth, from potatoes that compete for food and water, and from other cucurbits crowded in close, which share the same pests and diseases.",
      },
      {
        q: "Do cucumbers need flowers nearby for pollination?",
        a: "Outdoor and ridge cucumbers set better fruit with plenty of bee visits, so pollinator flowers like borage and nasturtiums genuinely help. (Many modern greenhouse varieties are all-female and self-set without pollination — check your seed packet.)",
      },
    ],
    seedLinks: [
      { label: "Cucumber seeds", url: tm("Cucumber") },
      { label: "Dill seeds", url: tm("Dill") },
    ],
    relatedCrops: ["cucumbers", "dill", "lettuce", "runner-beans"],
  },

  // ── 13. Peppers & chillies ────────────────────────────────────────────────
  {
    slug: "companion-plants-for-peppers-chillies",
    metaTitle: "Companion Plants for Peppers & Chillies (UK) — What to Grow",
    title: "Companion plants for peppers & chillies",
    description:
      "The best companion plants for peppers and chillies in the UK — basil, marigolds and the flowers that bring in pollinators and keep pests off — plus what to keep apart. Plot-tested pairings for a heavier crop.",
    keywords: [
      "companion plants for peppers",
      "companion plants for chillies",
      "what to plant with peppers",
      "basil and peppers",
      "pepper companion planting UK",
    ],
    heroImage: "/photos/crops/pepper-tomato-seedlings-tray.webp",
    heroAlt: "Young pepper and tomato seedlings in a tray, ready to grow on",
    intro:
      "Peppers and chillies are sun-lovers that crop best with a little help — a few good neighbours to bring in the pollinators, draw pests away, and make warm, sheltered use of the space around them.",
    sections: [
      {
        paragraphs: [
          "Peppers and chillies are close cousins of the tomato, and they like the same things: warmth, shelter, steady water and plenty of food. Their most useful companions do the familiar jobs — herbs and flowers to bring in pollinators for a better fruit set, and decoy or aromatic plants to keep aphids off the soft new growth they love.",
          "Basil is the classic partner, just as it is with tomatoes: it enjoys the same warm, sheltered spot, may help keep aphids and whitefly down, and the two are made for each other in the kitchen. Tuck marigolds around the edge and a nasturtium or two nearby, and you've given your peppers the best possible company.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Basil", why: "Loves the same warmth, may deter aphids and whitefly, and a perfect kitchen partner." },
      { name: "Marigolds (French)", why: "Bring in hoverflies that clear aphids and brighten a warm, sheltered bed." },
      { name: "Nasturtiums", why: "A sacrificial trap that lures aphids onto themselves, away from the peppers." },
      { name: "Chives & spring onions", why: "Aromatic alliums that help confuse pests hunting by scent, without crowding." },
      { name: "Carrots & lettuce", why: "Low crops that make use of the ground at the base of the plants without competing for height." },
      { name: "Borage", why: "A bee magnet that boosts pollination and fruit set in the warmth." },
    ],
    avoid: [
      { name: "Fennel", why: "Releases compounds that can check nearby plants — best in a bed of its own." },
      { name: "Brassicas (cabbage, kale)", why: "Heavy feeders that compete hard for the same food and prefer cooler, different conditions." },
      { name: "Potatoes (right alongside)", why: "Same family, sharing some soil diseases — keep a little distance between them." },
    ],
    flowers: [
      { name: "Marigolds", why: "Hoverflies in, aphids down." },
      { name: "Nasturtiums", why: "Sacrificial aphid trap, edible flowers." },
      { name: "Borage", why: "Bees and better fruit set all summer." },
    ],
    faqs: [
      {
        q: "What can I plant with peppers and chillies?",
        a: "Basil is the standout — same warm conditions, possible aphid deterrence, and lovely together in the kitchen. Add marigolds and nasturtiums to manage aphids and bring in hoverflies, chives or spring onions to confuse pests, and borage for the bees that improve fruit set.",
      },
      {
        q: "Can you grow peppers and tomatoes together?",
        a: "Yes — they're close relatives that want exactly the same warmth, feeding and watering, so they make easy neighbours in a greenhouse or sunny bed. Just give each plant room for air to move around it, and feed both well, as they're hungry.",
      },
      {
        q: "What should not be planted near peppers?",
        a: "Keep peppers away from fennel (which inhibits many plants), from heavy-feeding brassicas that compete for nutrients, and don't crowd them right up against potatoes, with which they share some soil diseases.",
      },
    ],
    seedLinks: [
      { label: "Pepper seeds", url: tm("Pepper") },
      { label: "Chilli seeds", url: tm("Chilli") },
    ],
    relatedCrops: ["peppers", "chillies", "basil", "tomatoes"],
  },

  // ── 14. Lettuce & salad ───────────────────────────────────────────────────
  {
    slug: "companion-plants-for-lettuce",
    metaTitle: "Companion Plants for Lettuce (UK) — What to Grow With Salad",
    title: "Companion plants for lettuce",
    description:
      "The best companion plants for lettuce in the UK — the tall crops that shade it, the quick neighbours that share its space, and the flowers that keep pests off. An easy-going crop that gets on with almost everything.",
    keywords: [
      "companion plants for lettuce",
      "what to plant with lettuce",
      "lettuce companion planting UK",
      "salad companion planting",
      "what grows well with lettuce",
    ],
    heroImage: "/photos/crops/lettuce-with-marigolds.webp",
    heroAlt: "Lettuce growing alongside marigolds in a UK veg bed",
    intro:
      "Lettuce is the great team player of the veg patch — low, quick and undemanding, it tucks in almost anywhere and asks little of its neighbours. The trick is using it to fill space and shade rather than fight for it.",
    sections: [
      {
        paragraphs: [
          "Lettuce gets on with almost everything, which makes it the perfect crop for slotting into gaps. Because it's shallow-rooted, quick and happy in a little shade, the cleverest way to companion-plant it is underneath or beside taller crops — at the feet of tomatoes, beans or sweetcorn, where it enjoys the cool and is cropped before the big plants need the room.",
          "It also pairs beautifully with slow crops as a gap-filler: a row of lettuce between carrots or parsnips is up and eaten long before they need the space. The main thing lettuce wants from its companions is help against its real enemies — slugs and aphids — so a few pest-confusing alliums and decoy flowers earn their place.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Tall crops (tomatoes, beans, sweetcorn)", why: "Lettuce grows happily in their cool shade, especially through summer, without competing for height." },
      { name: "Carrots & radishes", why: "Quick, low neighbours — lettuce fills the gaps between slow rows and is cropped before they need the room." },
      { name: "Chives & spring onions", why: "Aromatic alliums whose scent helps confuse the aphids that find lettuce." },
      { name: "Beetroot", why: "An easy-going neighbour that doesn't compete for the same things." },
      { name: "Strawberries", why: "Low and shallow-rooted like lettuce — happy sharing a bed while each gets established." },
    ],
    avoid: [
      { name: "Brassicas right alongside", why: "Hungry, leafy and broad — they can shade out and out-compete a low lettuce crowded too close." },
      { name: "Parsley (left to flower)", why: "Can grow large and shade lettuce; fine if kept picked, but give it room." },
    ],
    flowers: [
      { name: "Marigolds", why: "Bring in hoverflies whose larvae eat aphids." },
      { name: "Nasturtiums", why: "Draw aphids away onto themselves." },
      { name: "Calendula", why: "Attracts beneficial insects and edges the bed cheerfully." },
    ],
    faqs: [
      {
        q: "What grows well with lettuce?",
        a: "Almost everything, but it shines beneath tall crops like tomatoes, beans and sweetcorn (it loves the summer shade), between slow rows of carrots or parsnips as a gap-filler, and alongside radishes, beetroot, chives and strawberries. Add marigolds and nasturtiums to keep aphids in check.",
      },
      {
        q: "What should not be planted with lettuce?",
        a: "There's very little it dislikes. Just avoid crowding it right up against big, hungry brassicas, which can shade and out-compete a low salad crop, and give large herbs like flowering parsley room so they don't swamp it.",
      },
      {
        q: "Can lettuce grow in the shade of other plants?",
        a: "Yes — and in summer it prefers it. A little shade from taller neighbours keeps lettuce cool, slows bolting and keeps the leaves sweet, which is exactly why growing it beneath tomatoes or beans works so well.",
      },
    ],
    seedLinks: [
      { label: "Lettuce seeds", url: tm("Lettuce") },
      { label: "Salad leaf seeds", url: tm("Salad%20Leaves") },
    ],
    relatedCrops: ["lettuce", "carrots", "radishes", "spring-onions"],
  },

  // ── 15. Peas ──────────────────────────────────────────────────────────────
  {
    slug: "companion-plants-for-peas",
    metaTitle: "Companion Plants for Peas (UK) — What to Grow & Avoid",
    title: "Companion plants for peas",
    description:
      "The best companion plants for peas in the UK — carrots, beans and the crops that thrive on the nitrogen peas leave behind — plus the alliums to keep well apart. Plot-tested pairings for a sweeter harvest.",
    keywords: [
      "companion plants for peas",
      "what to plant with peas",
      "pea companion planting UK",
      "peas and carrots",
      "what not to plant with peas",
    ],
    heroImage: "/photos/crops/peas-on-vine.webp",
    heroAlt: "Pea pods ripening on the vine in a UK veg bed",
    intro:
      "Peas are quietly generous neighbours — like beans, they gather nitrogen from the air and bank it in the soil, feeding what grows around and after them. Their companions mostly need to climb companionably and bring in the bees.",
    sections: [
      {
        paragraphs: [
          "Peas (and beans) have a lovely trick: with the help of bacteria on their roots, they pull nitrogen out of the air and store it in little nodules, leaving the ground richer for whatever follows. That makes them excellent partners for leafy, nitrogen-hungry crops nearby, and the ideal thing to grow before brassicas in the rotation.",
          "Above ground, they climb rather than spread, so they share space generously — carrots and quick salads sit happily at their feet, and flowers tucked in among them bring the bees that help the pods set. The one group to keep them away from is the alliums, whose roots can check the growth of peas and beans alike.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Carrots", why: "Use the cool ground at the base of the climbing peas without competing for height." },
      { name: "Radishes & lettuce", why: "Quick, low crops that fill the space at the foot of the row before the peas are done." },
      { name: "Beans", why: "Fellow nitrogen-fixers with the same likes — happy growing side by side up their supports." },
      { name: "Sweetcorn", why: "Tall and sturdy; peas and beans can even climb it in a loose Three Sisters." },
      { name: "Leafy greens (spinach, chard)", why: "Lap up the nitrogen the peas leave behind — grow them after, or alongside." },
    ],
    avoid: [
      { name: "Onions, garlic & other alliums", why: "Their root secretions can stunt the growth of peas and beans — keep them in a separate bed." },
      { name: "Fennel", why: "Inhibits many neighbours generally; give it its own corner." },
    ],
    flowers: [
      { name: "Sweet peas", why: "Climb alongside, scent the plot and pull in the bees that help pods set." },
      { name: "Marigolds", why: "Bring in hoverflies and ladybirds to keep aphids down." },
      { name: "Nasturtiums", why: "A sacrificial trap for the blackfly that troubles young pea tips." },
    ],
    faqs: [
      {
        q: "What grows well with peas?",
        a: "Carrots, radishes and lettuce at their feet (peas climb rather than spread), beans as fellow nitrogen-fixers, sweetcorn as a natural support, and leafy greens like spinach and chard that thrive on the nitrogen peas leave behind. Sweet peas and marigolds nearby bring in the bees and keep aphids down.",
      },
      {
        q: "Can you plant peas and beans together?",
        a: "Yes — they're close relatives that like the same things and both fix nitrogen, so they make easy neighbours growing up adjacent supports. Just don't follow one straight after the other in the same bed; rotate so the soil gets a change.",
      },
      {
        q: "What should not be planted near peas?",
        a: "Keep peas away from onions, garlic and other alliums, whose root secretions can genuinely check the growth of peas and beans. It's also worth keeping fennel well clear.",
      },
    ],
    seedLinks: [
      { label: "Pea seeds", url: tm("Pea") },
      { label: "Sweet pea seeds", url: tm("Sweet%20Pea") },
    ],
    relatedCrops: ["peas", "carrots", "radishes", "sweetcorn"],
  },

  // ── 16. Sweetcorn ─────────────────────────────────────────────────────────
  {
    slug: "companion-plants-for-sweetcorn",
    metaTitle: "Companion Plants for Sweetcorn (UK) — The Three Sisters & More",
    title: "Companion plants for sweetcorn",
    description:
      "The best companion plants for sweetcorn in the UK — beans, squash and the Three Sisters method — plus how to plant in blocks for pollination and what to keep apart. Plot-tested pairings for full, even cobs.",
    keywords: [
      "companion plants for sweetcorn",
      "what to plant with sweetcorn",
      "three sisters planting UK",
      "sweetcorn beans squash",
      "sweetcorn companion planting",
    ],
    heroImage: "/photos/crops/sweetcorn-harvest.webp",
    heroAlt: "Freshly harvested sweetcorn cobs on a UK allotment",
    intro:
      "Sweetcorn is the tall, easy-going heart of the famous Three Sisters — a crop that gives height for beans to climb and shelter for squash to sprawl beneath. Its companions practically grow themselves once you've set them out together.",
    sections: [
      {
        paragraphs: [
          "Sweetcorn is the classic centrepiece of the Three Sisters, the Native American planting that pairs three crops which each help the others: corn for the beans to climb, beans to fix nitrogen for the hungry corn, and squash to sprawl across the ground, shading out weeds and keeping moisture in. Grown together they make wonderful use of a single patch.",
          "The one thing to know before anything else: sweetcorn is wind-pollinated, so it must be grown in a block, not a long single row. Pollen falls from the tassels at the top onto the silks of the cobs below, and a square block lets the wind do that job evenly — a thin row gives gappy, half-filled cobs no matter how good your companions are.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Climbing beans", why: "Scramble up the sturdy stems for support and fix nitrogen the hungry corn feeds on — sister number two." },
      { name: "Squash, courgettes & pumpkins", why: "Sprawl beneath, shading the soil, smothering weeds and keeping moisture in — sister number three." },
      { name: "Cucumbers", why: "Can be trained up the corn like beans, in a looser version of the same idea." },
      { name: "Lettuce", why: "Uses the cool, shaded ground between the stems early in the season." },
      { name: "Nasturtiums", why: "Ramble through the block, luring aphids away and bringing in pollinators." },
    ],
    avoid: [
      { name: "Tomatoes", why: "Share pests (corn earworm / tomato fruitworm) and both are greedy — keep them in separate beds." },
      { name: "Fennel", why: "Inhibits many plants generally; give it its own spot." },
    ],
    flowers: [
      { name: "Nasturtiums", why: "Sacrificial aphid trap that rambles happily through the block." },
      { name: "Borage", why: "Pulls in bees and pollinators to the whole patch." },
      { name: "Marigolds", why: "Bring in hoverflies and ladybirds to clear aphids." },
    ],
    faqs: [
      {
        q: "What are the Three Sisters?",
        a: "A traditional planting of three crops that help one another: sweetcorn for height, climbing beans that scramble up the corn and fix nitrogen for it, and squash that sprawls across the ground to shade out weeds and hold in moisture. Grown together in one bed, they support each other and make brilliant use of the space.",
      },
      {
        q: "Why should sweetcorn be planted in a block?",
        a: "Sweetcorn is pollinated by the wind, which carries pollen from the tassels at the top of the plants down onto the silks of the cobs. Planting in a square block rather than a single row lets that happen evenly, so the cobs fill out fully — a thin row pollinates poorly and gives gappy cobs.",
      },
      {
        q: "What should not be planted near sweetcorn?",
        a: "Keep sweetcorn away from tomatoes, with which it shares pests like corn earworm and competes for nutrients, and from fennel, which inhibits many neighbours.",
      },
    ],
    seedLinks: [
      { label: "Sweetcorn seeds", url: tm("Sweetcorn") },
      { label: "Climbing bean seeds", url: tm("Climbing%20French%20Bean") },
    ],
    relatedCrops: ["sweetcorn", "runner-beans", "squash", "pumpkins"],
  },

  // ── 17. Pak choi & oriental greens ────────────────────────────────────────
  {
    slug: "companion-plants-for-pak-choi",
    metaTitle: "Companion Plants for Pak Choi (UK) — What to Grow & Avoid",
    title: "Companion plants for pak choi",
    description:
      "The best companion plants for pak choi and oriental greens in the UK — aromatic alliums and herbs to outwit flea beetle, plus what to keep apart. Plot-tested pairings for clean, unholey leaves.",
    keywords: [
      "pak choi companion plants",
      "companion planting pak choi",
      "what to plant with pak choi",
      "oriental greens companion planting",
      "pak choi flea beetle",
    ],
    heroImage: "/photos/blog/square-growing-salad.webp",
    heroAlt: "Oriental salad leaves growing in a raised bed",
    intro:
      "Pak choi is one of the quickest, most rewarding leaves you can grow — and a few good neighbours help it crop clean and unbothered, masking its scent from the flea beetles that love to pepper its leaves.",
    sections: [
      {
        paragraphs: [
          "Pak choi is a brassica, a cousin of cabbage and kale, so it keeps the same company. Its best companions are aromatic alliums and herbs whose scent confuses the pests that hunt brassicas by smell, and easy-going neighbours that don't compete with its fast, leafy growth. Grow it quickly, in cool, moist conditions, and the right company keeps it sweet.",
          "Its great tormentor is flea beetle — the tiny black beetles that riddle young leaves with shot-holes, especially in warm, dry spells. Strong-smelling onions, garlic and aromatic herbs nearby help throw them off the scent, but be honest: in the worst of it, a layer of fine mesh or fleece over the crop is the surest protection. Companions help; a barrier seals the deal.",
        ],
      },
    ],
    goodCompanions: [
      { name: "Onions, garlic & spring onions", why: "Pungent alliums whose scent helps confuse flea beetle and other brassica pests." },
      { name: "Beetroot & chard", why: "Easy-going neighbours that don't compete with pak choi's quick, leafy growth." },
      { name: "Lettuce & other salad", why: "Quick, low crops that share the same cool, moist conditions and crop in the same window." },
      { name: "Aromatic herbs (dill, coriander, mint)", why: "Their strong scents help mask the brassica smell pests home in on, and bring in beneficial insects." },
      { name: "Peas & beans", why: "Fix nitrogen that fuels pak choi's hungry, leafy growth — grow it after them, or alongside." },
    ],
    avoid: [
      { name: "Strawberries", why: "A traditional poor partner for brassicas — they seem to check each other and share some pests." },
      { name: "Tomatoes & other heavy feeders", why: "Compete hard for the same nutrients; pak choi grows best without that fight." },
      { name: "Other brassicas crowded close", why: "Cabbage, kale and the like share every pest and disease — give them space so trouble can't spread." },
    ],
    flowers: [
      { name: "Nasturtiums", why: "A sacrificial trap that lures flea beetle and caterpillars away from the leaves." },
      { name: "Marigolds", why: "Bring in hoverflies and ladybirds to clear aphids." },
      { name: "Calendula", why: "Attracts beneficial insects and edges the bed cheerfully." },
    ],
    faqs: [
      {
        q: "What can I plant with pak choi?",
        a: "Pak choi keeps the same company as other brassicas: aromatic alliums (onions, garlic, spring onions) and herbs like dill and coriander to confuse the pests that hunt by smell, easy neighbours like beetroot, chard and lettuce, and peas or beans whose nitrogen fuels its leafy growth. Add nasturtiums and marigolds as flower helpers.",
      },
      {
        q: "How do I stop flea beetle on pak choi?",
        a: "Flea beetle is pak choi's main pest, peppering the leaves with tiny holes in warm, dry weather. Strong-smelling alliums and herbs nearby help mask the scent, and a sacrificial ring of nasturtiums draws beetles away — but the most reliable defence is a layer of fine insect mesh or fleece over the crop. Keeping the soil moist and growing pak choi fast also helps it shrug off the damage.",
      },
      {
        q: "What should not be planted near pak choi?",
        a: "Keep pak choi away from strawberries (traditional poor partners for brassicas), from heavy feeders like tomatoes that compete for nutrients, and don't crowd it among other brassicas, which share all the same pests and diseases.",
      },
    ],
    seedLinks: [
      { label: "Pak choi seeds", url: tm("Pak%20Choi") },
      { label: "Oriental leaf seeds", url: tm("Oriental%20Leaves") },
    ],
    relatedCrops: ["pak-choi", "lettuce", "spring-onions", "kale"],
  },
];

export function getCompanionTopic(slug: string): CompanionTopic | undefined {
  return companionTopics.find((t) => t.slug === slug);
}
