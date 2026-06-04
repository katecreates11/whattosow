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
];

export function getCompanionTopic(slug: string): CompanionTopic | undefined {
  return companionTopics.find((t) => t.slug === slug);
}
