/**
 * Hand-written editorial blog posts with original photography.
 * These sit alongside the auto-generated monthly sowing guides.
 */

export interface EditorialSection {
  type: "text" | "image" | "tip" | "heading";
  content: string;
  /** For images: src path */
  src?: string;
  /** For images: alt text */
  alt?: string;
  /** For images: optional caption */
  caption?: string;
}

export interface EditorialPost {
  slug: string;
  title: string;
  description: string;
  publishDate: Date;
  keywords: string[];
  heroImage: string;
  heroAlt: string;
  /** Intro paragraph shown in hero area */
  intro: string;
  /** Tags shown as badges */
  tags: string[];
  /** Full article content as structured sections */
  sections: EditorialSection[];
  /** Related crop slugs for cross-linking */
  relatedCrops: string[];
}

export const editorialPosts: EditorialPost[] = [
  {
    slug: "growing-tomatoes-uk-allotment",
    title: "Growing tomatoes on a UK allotment: from windowsill to harvest",
    description:
      "A real season of growing tomatoes on a UK allotment — starting seeds on the windowsill, planting out after the last frost, and harvesting buckets of cherry tomatoes by August. With photos from every stage.",
    publishDate: new Date("2026-03-28"),
    keywords: [
      "growing tomatoes UK",
      "allotment tomatoes",
      "cherry tomatoes UK",
      "when to plant tomatoes UK",
      "tomato growing tips UK allotment",
      "growing tomatoes outdoors UK",
    ],
    heroImage: "/photos/crops/tomatoes-cherry-on-vine.webp",
    heroAlt:
      "Cherry tomatoes ripening on the vine at a UK allotment, surrounded by rosemary",
    intro:
      "Tomatoes are the crop that gets most people excited about growing their own. Here is what a real season looks like on a UK allotment — the windowsill seedlings, the anxious wait for the last frost, and the moment the first truss turns orange.",
    tags: ["tomatoes", "allotment diary", "from seed"],
    sections: [
      {
        type: "heading",
        content: "Starting seeds on the windowsill",
      },
      {
        type: "text",
        content:
          "I sowed my tomato seeds in early March, in small pots on the windowsill with a label stuck in each one. Nothing fancy — seed compost, a light watering, and a clear plastic bag over the top to hold in the warmth. Within a week, little green loops were pushing through the surface.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/guides/seed-starting-windowsill.webp",
        alt: "Tomato and courgette seedlings in labelled pots on a sunny windowsill",
        caption:
          "Early March — seedlings on the windowsill. Labels are essential when everything looks the same at this stage.",
      },
      {
        type: "text",
        content:
          "The key at this stage is light. Windowsill seedlings get leggy fast if they are not getting enough, and mine were no exception. I rotated the pots every couple of days and moved them to the sunniest window I had. By April, they were sturdy little plants with their first true leaves.",
      },
      {
        type: "tip",
        content:
          "Sow tomato seeds 6-8 weeks before your last frost date. In most of the UK, that means early to mid-March. Use our postcode tool to find your exact date.",
      },
      {
        type: "heading",
        content: "Planting out after the last frost",
      },
      {
        type: "text",
        content:
          "I planted out in late May, once the risk of frost had properly passed. The plants went into a raised bed with plenty of compost worked in, alongside marigolds for companion planting. Each one got a bamboo cane for support — tomatoes flop without something to lean on.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/tomatoes-green-beefsteak.webp",
        alt: "Green beefsteak tomatoes growing on the vine next to bright yellow marigolds",
        caption:
          "June — green fruit forming on the beefsteak plants. The marigolds are doing their job keeping aphids at bay.",
      },
      {
        type: "text",
        content:
          "Watering is the single most important thing once tomatoes are in the ground. Inconsistent watering causes blossom end rot — those annoying black patches on the bottom of the fruit. I watered at the base every morning during dry spells, and mulched around the plants to keep moisture in.",
      },
      {
        type: "heading",
        content: "The harvest",
      },
      {
        type: "text",
        content:
          "By late July, the cherry tomatoes were ripening faster than I could pick them. The orange and yellow varieties were the first to come — Sungold lived up to its reputation as the sweetest cherry tomato you can grow. The bigger varieties took longer, but by mid-August I was harvesting boxes of them.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/harvest-tomatoes-courgettes.webp",
        alt: "A harvest of cherry tomatoes in red, orange and yellow, alongside green courgettes and a yellow courgette",
        caption:
          "Late July — the first proper harvest. Cherry tomatoes, courgettes, and a surprise yellow courgette.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/tomatoes-cherry-truss-box.webp",
        alt: "A cardboard box overflowing with orange and yellow cherry tomatoes still on the vine",
        caption:
          "August — cherry tomato trusses harvested whole. There were far too many for one person.",
      },
      {
        type: "text",
        content:
          "The best part about growing tomatoes is the sheer abundance. One plant produces kilos of fruit over the season. I gave boxes away to neighbours, took them to work, and still had more than I could eat. If you are thinking about growing your own, tomatoes are where to start.",
      },
      {
        type: "heading",
        content: "What I would do differently",
      },
      {
        type: "text",
        content:
          "I grew too many beefsteak varieties and not enough cherry tomatoes. The cherry types ripen faster, produce more reliably in a UK summer, and taste better straight off the vine. Next year I will grow mostly Sungold and Gardener's Delight, with maybe one or two beefsteak plants for the novelty.\n\nI would also start feeding with tomato fertiliser earlier — once the first truss sets, not after. And I would prune side shoots more aggressively. The bushier plants produced less fruit because the energy was going into leaves.",
      },
    ],
    relatedCrops: ["tomatoes", "courgettes", "basil"],
  },
  {
    slug: "companion-planting-marigolds-allotment",
    title: "Companion planting with marigolds: what actually worked",
    description:
      "I planted marigolds around every raised bed on my allotment last year. Here is what they actually did for pest control, pollination, and making the plot look incredible — with photos throughout the season.",
    publishDate: new Date("2026-03-30"),
    keywords: [
      "companion planting marigolds",
      "marigolds allotment",
      "marigolds pest control",
      "companion planting UK allotment",
      "marigolds and tomatoes",
      "marigolds and lettuce",
      "French marigolds vegetable garden",
    ],
    heroImage: "/photos/crops/lettuce-with-marigolds.webp",
    heroAlt:
      "Rows of lettuce growing alongside bright orange marigolds in a raised allotment bed",
    intro:
      "Every gardening book says to plant marigolds with your vegetables. But does it actually make a difference? I lined every raised bed with French marigolds last season and paid close attention. Here is what I found.",
    tags: ["companion planting", "marigolds", "pest control"],
    sections: [
      {
        type: "heading",
        content: "Why marigolds?",
      },
      {
        type: "text",
        content:
          "French marigolds (Tagetes patula) are the most commonly recommended companion plant for vegetable gardens. The theory is that their strong scent deters aphids, whitefly, and other pests, while their bright flowers attract pollinators. Some gardeners say they repel nematodes in the soil too.\n\nI wanted to test this properly, so I bought several trays of mixed French marigolds and planted them as borders around every raised bed on my allotment.",
      },
      {
        type: "heading",
        content: "Marigolds with lettuce",
      },
      {
        type: "text",
        content:
          "This was the combination that looked the best. The bright orange marigold border framing rows of green butterhead lettuce was genuinely beautiful — like something from a magazine. But did it help the lettuce?",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/raised-bed-marigold-border.webp",
        alt: "A raised allotment bed with lettuce and brassicas bordered by orange and yellow marigolds",
        caption:
          "The lettuce bed in full swing — marigolds on every side. The slugs still found a way in, but the aphids were noticeably absent.",
      },
      {
        type: "text",
        content:
          "Honestly — the slugs still got through. Marigolds do not stop slugs. But I noticed significantly fewer aphids on the lettuce compared to previous years. Whether that was the marigolds or just a good year for ladybirds, I cannot say for certain. But the bed looked so good that I will do it again regardless.",
      },
      {
        type: "heading",
        content: "Marigolds with tomatoes",
      },
      {
        type: "text",
        content:
          "This is the classic combination, and it genuinely seemed to work. My tomato plants had very few whitefly problems, and the marigold scent was strong enough that I could smell it every time I went to water. The bright flowers also brought in hoverflies, whose larvae eat aphids.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/watering-marigolds-nasturtiums.webp",
        alt: "Watering nasturtiums and marigolds growing around raised beds on a sunny allotment",
        caption:
          "Marigolds and nasturtiums together — the nasturtiums acted as a sacrificial trap crop for blackfly.",
      },
      {
        type: "heading",
        content: "The full plot in summer",
      },
      {
        type: "text",
        content:
          "By midsummer, the marigolds had transformed the look of the entire allotment. Every bed had a bright orange border, the bees were everywhere, and the plot went from functional to genuinely beautiful. Other allotment holders kept stopping to comment on it.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/marigolds-close-up.webp",
        alt: "Close-up of orange and yellow French marigold flowers in full bloom",
        caption:
          "French marigolds in full bloom — they flower continuously from June right through to the first frost.",
      },
      {
        type: "heading",
        content: "The verdict",
      },
      {
        type: "text",
        content:
          "Did marigolds solve all my pest problems? No. Slugs still ate my lettuce seedlings. The cabbage white butterflies still found the brassicas. But the aphid pressure was noticeably lower, the pollinators were abundant, and the plot looked absolutely stunning.\n\nFor the cost of a few trays of plug plants (under a fiver), marigolds are the best investment you can make on an allotment. I will plant them every year from now on. The pest control benefits are real but modest — the beauty and the pollinators are the main reasons to grow them.",
      },
      {
        type: "tip",
        content:
          "Sow French marigold seeds indoors in April, or buy plug plants in May. Plant them 20-25cm apart around the edges of raised beds. Deadhead regularly to keep them flowering all season.",
      },
    ],
    relatedCrops: ["lettuce", "tomatoes", "courgettes"],
  },
  {
    slug: "first-allotment-harvest-what-i-grew",
    title: "What I actually harvested from my allotment this year",
    description:
      "A full breakdown of everything I grew and harvested from a UK allotment in one season — from the first strawberries in June to the last pumpkins in October. Real numbers, real photos, honest assessment.",
    publishDate: new Date("2026-04-02"),
    keywords: [
      "allotment harvest UK",
      "what to grow on an allotment",
      "allotment first year",
      "allotment harvest photos",
      "UK allotment what I grew",
      "vegetable garden harvest",
      "allotment results",
    ],
    heroImage: "/photos/blog/harvest-trug-full.webp",
    heroAlt:
      "A green trug filled with a mixed harvest of yellow and red tomatoes, cherry tomatoes, and sweetcorn from a UK allotment",
    intro:
      "Everyone shows their best allotment photos on Instagram. Here is the full honest picture — what grew well, what flopped, and how much food actually came off one UK allotment plot in a single season.",
    tags: ["harvest", "allotment diary", "first year"],
    sections: [
      {
        type: "heading",
        content: "The superstars: tomatoes",
      },
      {
        type: "text",
        content:
          "Tomatoes were by far the most productive crop on the plot. I grew cherry varieties (Sungold, Gardener's Delight) and a few beefsteak types. The cherry tomatoes were relentless — from late July through September, I was harvesting handfuls every other day. By the end of the season I had given away more than I kept.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/harvest-tomatoes-courgettes.webp",
        alt: "Buckets of red and orange cherry tomatoes alongside green and yellow courgettes on a garden table",
        caption:
          "A typical late-July haul. The yellow cherry tomatoes were the sweetest.",
      },
      {
        type: "heading",
        content: "Strawberries: earlier than expected",
      },
      {
        type: "text",
        content:
          "I planted strawberry runners in a raised bed in spring, not expecting much the first year. But by June they were flowering, and by late June I was picking a punnet every few days. The flavour of a sun-warmed strawberry straight from the plant is genuinely nothing like a supermarket strawberry.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/strawberry-colander-harvest.webp",
        alt: "A colander full of fresh strawberries sitting on woodchip mulch at an allotment",
        caption:
          "Mid-season strawberry harvest — enough for a couple of punnets, picked in ten minutes.",
      },
      {
        type: "heading",
        content: "Peas: the best thing I grew",
      },
      {
        type: "text",
        content:
          "If I could only grow one thing, it would be peas. Nothing from a shop compares to eating fresh peas straight from the pod while standing on the allotment. I grew both standard green peas and a purple-podded variety that looked incredible on the plant.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/crops/peas-in-pods-flat-lay.webp",
        alt: "Freshly picked pea pods opened to show plump green peas inside, on a yellow patterned cloth",
        caption:
          "The flat lay says it all. These lasted about five minutes before being eaten raw.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/purple-peas-on-vine.webp",
        alt: "Purple pea pods growing on vines supported by netting at an allotment",
        caption:
          "The purple-podded variety — stunning on the plant and the peas inside are still green.",
      },
      {
        type: "heading",
        content: "Courgettes: the glut was real",
      },
      {
        type: "text",
        content:
          "Two courgette plants. That is all you need. I grew three and spent August desperately trying to give courgettes away. They go from small and perfect to marrow-sized in about three days if you are not paying attention. Check them every other day and pick them small.",
      },
      {
        type: "heading",
        content: "Sweetcorn: worth the space",
      },
      {
        type: "text",
        content:
          "Sweetcorn takes up a lot of room and only gives you one or two cobs per plant. But the taste of freshly picked sweetcorn, boiled within an hour of harvest, is so far above anything from a shop that it justifies the space. I also grew some glass gem corn for decoration — it was beautiful but not for eating.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/crops/sweetcorn-harvest.webp",
        alt: "A freshly picked sweetcorn cob held up with sunflowers in the background at an allotment",
        caption:
          "Sweetcorn harvest day. The sunflowers behind were planted as a windbreak — and they worked.",
      },
      {
        type: "heading",
        content: "Carrots: patience rewarded",
      },
      {
        type: "text",
        content:
          "Carrots take forever. I sowed them in April and was not pulling proper carrots until September. But when they finally came up — in all their muddy, wonky, forked glory — the flavour was incredible. Nothing like the uniform orange sticks from Tesco.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/carrot-harvest-crate.webp",
        alt: "A crate overflowing with freshly pulled carrots with green tops still attached",
        caption:
          "The carrot harvest. Wonky, muddy, and absolutely delicious.",
      },
      {
        type: "heading",
        content: "Pumpkins: the grand finale",
      },
      {
        type: "text",
        content:
          "I grew two pumpkin plants through weed membrane and let them sprawl. By October I had three decent-sized pumpkins. One went on the doorstep for Halloween, one became soup, and one I gave to a neighbour. They are not the most practical crop but growing a pumpkin from seed is incredibly satisfying.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/pumpkin-on-membrane.webp",
        alt: "A large orange pumpkin growing on weed membrane at a UK allotment",
        caption:
          "The biggest pumpkin, still growing in late September. Weed membrane kept everything clean underneath.",
      },
      {
        type: "heading",
        content: "What flopped",
      },
      {
        type: "text",
        content:
          "Not everything went well. The cauliflower bolted before forming proper heads. The coriander went to seed within what felt like minutes. And the slugs decimated my first sowing of lettuce seedlings — I had to resow twice before they got established.\n\nBut that is part of allotment growing. You learn what works on your specific plot, in your specific conditions, and you adjust next year. The crops that did well more than made up for the failures.",
      },
      {
        type: "heading",
        content: "Was it worth it?",
      },
      {
        type: "text",
        content:
          "Absolutely. In terms of pure monetary value, I probably grew a couple of hundred pounds worth of vegetables and fruit. But the real value is not financial. It is standing on your plot on a summer evening, picking tomatoes that are still warm from the sun, eating peas straight from the pod, and knowing that you grew all of it from a tiny seed.\n\nIf you are on an allotment waiting list or thinking about getting a plot, do it. The first year is messy and overwhelming and wonderful. Start with the easy wins — tomatoes, courgettes, peas, strawberries — and build from there.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/harvest-table-spread.webp",
        alt: "A table spread with boxes of cherry tomatoes, blackberries, and fresh vegetables from an allotment harvest",
        caption:
          "One of the last big harvests of the season. Tomatoes, berries, and more tomatoes.",
      },
    ],
    relatedCrops: [
      "tomatoes",
      "strawberries",
      "peas",
      "courgettes",
      "sweetcorn",
      "carrots",
      "pumpkins",
    ],
  },
  {
    slug: "easiest-fruit-to-grow-uk-allotment",
    title: "The easiest fruit to grow on a UK allotment",
    description:
      "You do not need an orchard to grow fruit. Strawberries, raspberries, and rhubarb are some of the easiest and most rewarding things you can grow on a UK allotment — here is how to get started with your first fruit crops.",
    publishDate: new Date("2026-04-02"),
    keywords: [
      "easiest fruit to grow UK",
      "growing fruit allotment",
      "best fruit for allotment",
      "growing strawberries allotment",
      "allotment fruit for beginners",
      "soft fruit UK allotment",
      "fruit garden beginners UK",
    ],
    heroImage: "/photos/blog/strawberry-colander-harvest.webp",
    heroAlt:
      "A colander full of fresh strawberries sitting on woodchip mulch at a UK allotment",
    intro:
      "Most new allotment holders focus entirely on vegetables and forget about fruit. That is a mistake. Fruit is lower effort, higher reward, and once established it comes back year after year without you having to sow anything.",
    tags: ["fruit", "beginners", "allotment diary"],
    sections: [
      {
        type: "heading",
        content: "Start with strawberries",
      },
      {
        type: "text",
        content:
          "If you only grow one fruit, make it strawberries. Plant runners in spring and you will be eating your own strawberries by June. The flavour of a sun-warmed strawberry picked straight from the plant is genuinely life-changing if you have only ever eaten supermarket ones.\n\nI planted mine in a raised bed with straw mulch underneath to keep the fruit clean. Within three months I was picking a punnet every few days. By midsummer I was giving them away.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/strawberry-plants-flowering.webp",
        alt: "Strawberry plants flowering in a wooden raised bed on a UK allotment",
        caption:
          "Strawberry plants in flower — every one of these blooms becomes a berry.",
      },
      {
        type: "text",
        content:
          "The key things to get right: full sun, decent soil with compost worked in, regular watering when the fruit is forming, and netting. The netting is non-negotiable — birds will eat every ripe berry before you get to them.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/strawberries-ripening.webp",
        alt: "Strawberries ripening on the plant next to a wooden raised bed edge",
        caption:
          "Strawberries ripening in late June. Pick them when they are fully red all the way round.",
      },
      {
        type: "tip",
        content:
          "Grow an everbearing variety like Flamenco alongside your standard June bearers. You get strawberries from June right through to October instead of a three-week glut.",
      },
      {
        type: "heading",
        content: "Raspberries: the best value fruit",
      },
      {
        type: "text",
        content:
          "Ten raspberry canes cost about fifteen pounds bare-root and will produce ten to fifteen kilograms of raspberries every year for a decade. That is an extraordinary return.\n\nThe trick is understanding the difference between summer and autumn varieties. Summer raspberries (like Glen Ample) fruit on last year's canes — you tie them in and cut out the fruited ones after harvest. Autumn raspberries (like Autumn Bliss) fruit on this year's growth — you just cut everything to the ground in February. Autumn varieties are much easier for beginners.\n\nThe taste of a freshly picked raspberry is extraordinary. Soft, fragrant, almost floral — nothing like the firm, slightly sour things in supermarket punnets.",
      },
      {
        type: "heading",
        content: "Rhubarb: plant it and forget it",
      },
      {
        type: "text",
        content:
          "Rhubarb is the most forgiving thing on any allotment. Plant a crown in winter, resist the urge to harvest in the first year, and from year two onwards you will have more rhubarb than you know what to do with. It comes back every spring without any help from you.\n\nOne crown takes up about a square metre and produces enough stalks for crumbles, fools, jam, and cordial. It will last for decades. The only maintenance is a mulch of manure in autumn and pulling (never cutting) the stalks between April and June.",
      },
      {
        type: "heading",
        content: "Blackcurrants and gooseberries",
      },
      {
        type: "text",
        content:
          "These are the unsung heroes of the allotment fruit garden. A single blackcurrant bush produces four to five kilograms of berries — enough for cordial, jam, and crumbles all year. Gooseberries are criminally underrated — pick them green for cooking or leave them to ripen into sweet, golden dessert berries.\n\nBoth are tough, long-lived (twenty years or more), and suited to the UK climate. They are bare-root plants, which means you buy them as dormant sticks between November and March for a few pounds each. By year three they are producing full crops.",
      },
      {
        type: "heading",
        content: "Where to start",
      },
      {
        type: "text",
        content:
          "If you are starting from scratch, here is what I would plant this year:\n\n1. Twenty strawberry runners in a raised bed — fruiting by June\n2. Ten autumn raspberry canes along a fence with wire supports — fruiting by August\n3. One rhubarb crown in a corner — fruiting from year two\n\nTotal cost: about thirty to forty pounds. Total effort after planting: minimal. Total reward: kilos of fruit every year for the foreseeable future.\n\nFruit is the best long-term investment on any allotment. Start small, get a few things established, and add more each winter when bare-root plants are available and cheap.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/strawberry-colander-harvest.webp",
        alt: "A colander full of freshly picked allotment strawberries on woodchip",
        caption:
          "This is what forty minutes of picking looks like. Worth every penny of the original runners.",
      },
    ],
    relatedCrops: [
      "strawberries",
      "raspberries",
      "blackcurrants",
      "gooseberries",
      "rhubarb",
    ],
  },
  {
    slug: "potting-on-tomato-seedlings",
    title: "Potting on tomato seedlings: when to do it and how",
    description:
      "Tomato seedlings look fine and then suddenly look desperate. Here is when to move them on, how deep to bury the stem, and how to get them ready for life outside.",
    publishDate: new Date("2026-05-07"),
    keywords: [
      "potting on tomato seedlings",
      "when to pot on tomatoes UK",
      "potting on seedlings",
      "hardening off tomatoes UK",
      "tomato seedlings leggy",
      "when to plant out tomatoes UK",
      "growing tomatoes from seed UK",
    ],
    heroImage: "/photos/blog/tomato-seedlings-pots.webp",
    heroAlt:
      "Tomato seedlings in terracotta pots sitting in a clear plastic tray, ready for potting on",
    intro:
      "Tomato seedlings look fine and then suddenly look desperate. By April, if you sowed in March, most of them will need moving.",
    tags: ["tomatoes", "seedlings", "from seed"],
    sections: [
      {
        type: "heading",
        content: "When to pot on",
      },
      {
        type: "text",
        content:
          "When the first true leaves are properly open and the pot is starting to feel cramped, it is time. Roots appearing from the drainage holes means you have already left it a little long — the seedlings will not be ruined, but they will be glad to move.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/crops/tomato-seedlings-tray.webp",
        alt: "Overhead view of tomato seedlings in various pots arranged in a green tray, showing different sizes and growth stages",
        caption:
          "A tray of seedlings in April — the ones in smaller pots already pushing against the edges.",
      },
      {
        type: "heading",
        content: "Burying the stem",
      },
      {
        type: "text",
        content:
          "Move into something a size up — 9 or 10cm pots, ordinary multipurpose compost — but bury the stem deeper than it sat before. Tomatoes root all along any buried stem, so a deeper planting makes a stronger plant. A leggy seedling that has been stretching for light can be buried right up to its lowest leaves and will usually recover well. It is one of the more forgiving things about growing tomatoes.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/tomato-seedlings-pots.webp",
        alt: "Tomato seedlings potted on into terracotta pots in a clear tray, sitting outside in the sun",
        caption:
          "After potting on — buried deeper, out in the sun for the first time.",
      },
      {
        type: "tip",
        content:
          "Bury tomato stems deep at every potting on. The buried length sprouts roots and the plant ends up sturdier for it.",
      },
      {
        type: "heading",
        content: "Potting on again",
      },
      {
        type: "text",
        content:
          "Some varieties will need moving on twice before they go outside — from smaller pots into litre pots, then into the ground or final containers once frost is no longer a risk. Roots at the drainage holes means it is time to move them on.",
      },
      {
        type: "heading",
        content: "Hardening off",
      },
      {
        type: "text",
        content:
          "Plants from a windowsill have never dealt with wind, direct sun, or cold nights. Moving them straight outside will set them back, sometimes badly. The fix is gradual — an hour or two outside in a sheltered spot to begin with, building up over a couple of weeks until they can manage a full day and night out. Bring them in if frost is forecast. After two weeks of this they are ready.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/crops/pepper-tomato-seedlings-tray.webp",
        alt: "Tomato seedlings in pots sitting outside on paving in the sun, hardening off before planting out",
        caption: "Outside in the sun — the start of hardening off.",
      },
      {
        type: "tip",
        content:
          "Enter your postcode into the What To Sow tool to find your exact last frost date.",
      },
    ],
    relatedCrops: ["tomatoes", "peppers", "aubergines"],
  },
  {
    slug: "preparing-allotment-beds-spring",
    title: "How to prepare allotment beds for planting",
    description:
      "The work that happens before anything goes in the ground — clearing, digging, raking down to a seed bed, and keeping weeds off beds that are not ready to plant yet.",
    publishDate: new Date("2026-05-07"),
    keywords: [
      "how to prepare allotment bed",
      "preparing raised bed spring UK",
      "how to rake a seed bed",
      "weed membrane raised bed allotment",
      "allotment bed preparation",
      "digging allotment beds",
      "preparing soil for planting UK",
    ],
    heroImage: "/photos/blog/sowing-drills-allotment-spring.webp",
    heroAlt:
      "Freshly raked allotment bed with sowing drills marked out, greenhouse visible in the background under a blue spring sky",
    intro:
      "Most of April at the allotment was ground work. Clearing beds, digging them over, raking them down. Satisfying while you are doing it, and worth getting right before anything goes in.",
    tags: ["allotment", "soil prep", "spring"],
    sections: [
      {
        type: "heading",
        content: "Clearing first",
      },
      {
        type: "text",
        content:
          "Before anything else, get the weeds out. Pull up everything that is growing and get the roots if you can. Annual weeds go on the compost. Perennial weeds — dock, couch grass, bindweed — need more care; even a small fragment of root will come back. This is the part nobody photographs, but it matters most.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/guides/freshly-prepared-allotment-bed.webp",
        alt: "A freshly dug and cleared allotment bed ready for raking, with other prepared beds visible in the background",
        caption: "Cleared and ready for digging.",
      },
      {
        type: "heading",
        content: "Digging over",
      },
      {
        type: "text",
        content:
          "I use a fork rather than a spade — it loosens the soil without inverting it and bringing the subsoil up. Work from one end, push the fork in to its full depth, lever forward. If you have compost or manure, work it in as you go. The soil should end up dark and crumbly. If it is still coming up in heavy wet clods, wait a few days — working wet soil does more harm than good.",
      },
      {
        type: "tip",
        content:
          "If it sticks to your boots in clumps, wait. Wet soil worked into clods is hard to recover.",
      },
      {
        type: "heading",
        content: "Raking a seed bed",
      },
      {
        type: "text",
        content:
          "For anything that is going to be direct sown — carrots, beetroot, radishes, salad — the surface needs to be fine. Rake back and forth until the clods are gone. To make a drill, press the corner of the rake or a bamboo cane into the surface in a straight line. Shallow for small seeds, deeper for peas and beans.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/sowing-drills-allotment-spring.webp",
        alt: "Neatly raked allotment soil with parallel sowing drills marked out ready for seeds, greenhouse in the background",
        caption: "Raked and drilled, ready to sow.",
      },
      {
        type: "heading",
        content: "Covering what is not ready",
      },
      {
        type: "text",
        content:
          "An uncovered bed in spring fills with weeds fast. If a bed is prepared but not going in for a few weeks, cover it — weed membrane, cardboard, anything that keeps the light off. I weight the edges down with bricks. When the time comes, a cross-cut in the membrane and you plant straight through it. It then keeps the weeds down for the whole season.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/raised-bed-membrane-spring.webp",
        alt: "A wooden raised bed covered with black weed membrane weighted down with bricks, with an arch and greenhouse visible behind it",
        caption: "Covered and waiting.",
      },
      {
        type: "text",
        content:
          "I use heavy-duty woven membrane held down at the edges with bricks. It also warms the soil slightly and holds moisture in — both useful in a UK spring that can turn cold without much warning.",
      },
      {
        type: "tip",
        content:
          "Planting through membrane works well for big transplants — tomatoes, courgettes, squash. Cut an X, fold back the triangles, plant through.",
      },
    ],
    relatedCrops: ["tomatoes", "courgettes", "carrots", "beetroot", "peas"],
  },
  {
    slug: "may-allotment-diary",
    title: "May on the allotment: what I am doing right now",
    description:
      "May is mostly labels in the ground and faith. The beds are prepared, things are sown, the tomatoes are hardening off on the path. Here is where the plot is at.",
    publishDate: new Date("2026-05-07"),
    keywords: [
      "what to do on allotment in May",
      "May allotment tasks UK",
      "what to plant May UK allotment",
      "allotment diary May",
      "May gardening jobs UK",
      "allotment May UK",
      "what to sow in May UK",
    ],
    heroImage: "/photos/hero/allotment-plot-spring-arch.webp",
    heroAlt:
      "A UK allotment in early May — prepared beds, a metal arch, and a greenhouse visible across the plot under a blue sky",
    intro:
      "May on the allotment is mostly labels in the ground. Things are there, you just cannot see them yet.",
    tags: ["allotment diary", "May", "seasonal"],
    sections: [
      {
        type: "heading",
        content: "The beds",
      },
      {
        type: "text",
        content:
          "The last few weeks have been ground work — clearing, digging, raking down, getting things in drills or under membrane. The plot looks bare. A lot of dark soil with small markers in it. This is what May looks like and I know it, but it still feels like not much.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/hero/allotment-plot-spring-arch.webp",
        alt: "Allotment plot in early May showing prepared beds and a metal arch, with other plots visible in the background",
        caption: "Early May. It will look completely different by June.",
      },
      {
        type: "heading",
        content: "Tomatoes and peppers",
      },
      {
        type: "text",
        content:
          "Sown in March, potted on twice since. They are in litre pots now, spending the days outside on the path. The tomatoes are stocky and dark green — potting them on deep paid off. The peppers are slower, as they always are in the UK. Both come in at night until I am confident there is no frost coming.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/tomato-seedlings-pots.webp",
        alt: "Tomato seedlings in terracotta pots sitting outside in a clear tray, hardening off in the spring sun",
        caption:
          "Tomatoes out for the day. Peppers somewhere behind them, slightly less impressive.",
      },
      {
        type: "heading",
        content: "What is in the ground",
      },
      {
        type: "text",
        content:
          "Carrots, beetroot, peas, radishes, spinach — all direct sown this month. Squash, French beans, and courgettes are still under cover; they go out in June at the earliest. Too soft to risk it yet.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/seedling-planted-out.webp",
        alt: "A small seedling just planted into allotment soil, with freshly prepared earth around it",
        caption: "One of the first things in the ground.",
      },
      {
        type: "heading",
        content: "What is actually looking good",
      },
      {
        type: "text",
        content:
          "The vegetables are all too small to be interesting. But the Tumbling Ted in the tall wooden planter has been going for weeks — a cascade of pink that you can see from the other end of the plot. I planted it as bare roots last April because I wanted something that would tumble over the front of the planter and not need much watering. Year two is quite something.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/spring-flowers-raised-planter.webp",
        alt: "Tumbling Ted cascading over the sides of a wooden planter in full pink flower at an allotment",
        caption:
          "Tumbling Ted. This time last year it had a few flowers. Now it is the best thing on the plot.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/raised-bed-membrane-spring.webp",
        alt: "A raised wooden bed covered with black weed membrane held down with bricks, with an arch visible behind",
        caption: "One bed still covered while the transplants finish hardening off.",
      },
      {
        type: "tip",
        content:
          "Not sure what to sow this week? Enter your postcode into the What To Sow tool for a personalised list.",
      },
    ],
    relatedCrops: ["tomatoes", "peppers", "courgettes", "carrots", "peas"],
  },
  {
    slug: "tumbling-ted-allotment-planter",
    title: "Tumbling Ted: from bare roots to full bloom in two seasons",
    description:
      "I planted Tumbling Ted in April last year — bare roots from Farmer Gracy — because I wanted something that would tumble over the front of the new planter and not need much watering. Here is what the two seasons looked like.",
    publishDate: new Date("2026-05-11"),
    keywords: [
      "Tumbling Ted plant",
      "Saponaria ocymoides",
      "trailing alpine plants UK",
      "allotment flowers",
      "Farmer Gracy bare root plants",
      "bare root alpines UK",
      "allotment planter ideas",
      "low maintenance allotment flowers",
    ],
    heroImage: "/photos/hero/allotment-planter-flowers-dusk.webp",
    heroAlt:
      "Tumbling Ted alpine plant in full pink flower cascading over a wooden planter at a UK allotment, photographed at dusk",
    intro:
      "I planted Tumbling Ted in April last year because I wanted something that would tumble over the front of the new wooden planter and not need much watering. It took two seasons to do what I had in mind.",
    tags: ["flowers", "allotment", "alpines"],
    sections: [
      {
        type: "heading",
        content: "What is Tumbling Ted?",
      },
      {
        type: "text",
        content:
          "Tumbling Ted — Saponaria ocymoides — is a trailing alpine. Small bright pink flowers in late spring, dense enough to hide the leaves underneath. The sort of plant you see spilling over old stone walls. Drought-tolerant once established, which was what I was after.",
      },
      {
        type: "heading",
        content: "April 2025: planting day",
      },
      {
        type: "text",
        content:
          "The Farmer Gracy order arrived in paper bags, each one feeling almost empty when you picked it up — a tangle of dry roots, a printed label. I laid them out on the patio table before planting, not for any particular reason, just working out what went where before committing.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/tumbling-ted-order-arrived.webp",
        alt: "Multiple Farmer Gracy bare root plant packages laid out on a patio table ready to be planted",
        caption: "The Farmer Gracy order, April 2025.",
      },
      {
        type: "text",
        content:
          "The planter had just been filled with compost. I spaced the roots along the front edge, watered them in, and that was it.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/tumbling-ted-planter-empty.webp",
        alt: "A large tall wooden planter freshly filled with dark compost, empty and ready for planting, allotment visible behind",
        caption: "The planter ready. Fresh compost, nothing in it yet.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/tumbling-ted-bare-roots-planting.webp",
        alt: "Farmer Gracy bare root packages laid inside a wooden planter ready to be unwrapped and planted",
        caption: "Packages laid in position before opening.",
      },
      {
        type: "heading",
        content: "Ten days later",
      },
      {
        type: "text",
        content:
          "There were small shoots coming through the compost. Not many, but enough to know something was happening.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/tumbling-ted-first-shoots.webp",
        alt: "The wooden planter with tiny early shoots just emerging from the compost, ten days after planting bare roots",
        caption: "Ten days in.",
      },
      {
        type: "heading",
        content: "June 2025",
      },
      {
        type: "text",
        content:
          "By June there were trailing stems and a few flowers. Modest. I thought about pulling it out and putting something showier in. I am glad I did not.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/tumbling-ted-june-first-year.webp",
        alt: "The wooden planter in June 2025 showing modest first-year growth of Tumbling Ted along the planter edge",
        caption: "June 2025. A few flowers, some trailing stems.",
      },
      {
        type: "heading",
        content: "May 2026",
      },
      {
        type: "text",
        content:
          "This spring it came back completely different. The planter was already covered in pink before I had got started on much else — dense curtains of it spilling down the sides, hundreds of flowers, visible from the gate. On a clear evening when the light is low it looks extraordinary.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/guides/spring-flowers-planter-allotment.webp",
        alt: "Tumbling Ted in full pink flower cascading over the sides of a large wooden planter at a UK allotment, raised beds visible behind",
        caption: "May 2026. The same planter, one year on.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/spring-flowers-raised-planter.webp",
        alt: "Close view of Tumbling Ted in full flower along the top of a wooden raised planter, flowers so dense the leaves are barely visible",
        caption: "The flowers are dense enough that you cannot see the foliage.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/hero/allotment-planter-flowers-dusk.webp",
        alt: "Tumbling Ted cascading over a wooden planter at dusk, pink flowers glowing in the evening light with the allotment behind",
        caption:
          "At dusk the pink catches the evening light in a way nothing else on the plot does.",
      },
      {
        type: "heading",
        content: "How to grow it",
      },
      {
        type: "text",
        content:
          "Full sun if you can give it. Any well-drained compost or soil — mine has some grit mixed in. Water in after planting and then more or less leave it alone; once the roots are established it handles dry spells well. After flowering, cut back by about a third. It tends to produce another flush later in summer, and the cut keeps it from going woody.",
      },
      {
        type: "tip",
        content:
          "Buy bare-root alpines in autumn — Farmer Gracy, Avon Bulbs, and Hayloft all carry them from September. It will look like nothing in year one. Plant it anyway.",
      },
      {
        type: "heading",
        content: "Why it earns its space",
      },
      {
        type: "text",
        content:
          "I grow most things for a reason — marigolds for the aphids, borage for the bees, nasturtiums to lure blackfly off the beans. Tumbling Ted has no practical use at all. In May, when everything else is still mostly underground, it is the thing that makes the plot feel like somewhere worth coming to.",
      },
    ],
    relatedCrops: ["borage", "marigolds"],
  },
];

export function getEditorialPost(slug: string): EditorialPost | undefined {
  return editorialPosts.find((p) => p.slug === slug);
}

export function getPublishedEditorialPosts(): EditorialPost[] {
  const now = new Date();
  return editorialPosts
    .filter((p) => p.publishDate <= now)
    .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
}
