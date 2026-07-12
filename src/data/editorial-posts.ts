/**
 * Hand-written editorial blog posts with original photography.
 * These sit alongside the auto-generated monthly sowing guides.
 */

export interface EditorialSection {
  type: "text" | "image" | "tip" | "heading" | "product" | "quote" | "pair" | "gallery" | "table" | "ownedSince" | "video";
  content: string;
  /** For images: src path */
  src?: string;
  /** For images: alt text */
  alt?: string;
  /** For images: optional caption (also used as the product tip) */
  caption?: string;
  /** Single image: opt in to an edge-to-edge showstopper (default is contained) */
  fullBleed?: boolean;
  /** For "pair": the second image shown side by side */
  src2?: string;
  alt2?: string;
  caption2?: string;
  /** For "gallery": a considered group of 2–4 photos (progress, change, details).
   *  Each photo can be cropped square (default), portrait or wide, as suits it. */
  images?: { src: string; alt?: string; caption?: string; aspect?: "square" | "portrait" | "wide" }[];
  /** Gallery layout: "row" (equal columns, default) or "feature" (one lead + the rest) */
  layout?: "row" | "feature";
  /** For product cards: an honest affiliate recommendation */
  productName?: string;
  productPrice?: string;
  productUrl?: string;
  productBadge?: "our-pick" | "budget" | "upgrade" | "essential";
  /** For "ownedSince": the wear-and-tear proof unit — year of purchase + photos across seasons */
  since?: string;
  note?: string;
  /** For "table": a scannable comparison, one buy link per row */
  rows?: { name: string; use: string; price?: string; url: string }[];
  /** For "video": a short, silent allotment clip (3-8s web loop from scripts/video-web.sh).
   *  src = /videos/blog/<name>.mp4, poster = its first-frame webp. alt + caption as for images.
   *  Portrait clips render at a modest centred width; set wide for landscape clips. */
  poster?: string;
  wide?: boolean;
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
  /** "What I used" — kit catalogue ids (see src/data/kit.ts) shown as a shoppable strip */
  kit?: string[];
  /** Single-product reviews: drives an above-the-fold Amazon CTA + Review schema (stars in Google) */
  primaryProduct?: { name: string; url: string; price?: string; ctaLabel?: string };
  /** Kate's honest rating out of 5 for the primaryProduct (for Review structured data) */
  rating?: number;
}

export const editorialPosts: EditorialPost[] = [
  {
    slug: "best-allotment-tools-compared",
    title: "The allotment tools I actually use, compared",
    description:
      "A quick, honest comparison of the tools that earn their place on my plot — what each is for, roughly what it costs, and where to get it. No guff, just the kit I reach for.",
    publishDate: new Date("2026-06-03"),
    keywords: [
      "best allotment tools",
      "best allotment tools UK",
      "allotment tools compared",
      "essential gardening tools",
      "best gardening tools UK",
      "allotment equipment list",
    ],
    heroImage: "/photos/blog/harvest-tools-flatlay.webp",
    heroAlt: "A few well-used allotment tools and the evening's harvest laid out on the decking",
    intro:
      "Over a few seasons you work out which tools genuinely earn their place and which gather dust. Here's the short list of what I actually reach for — compared at a glance, with what each one's for and where to find it.",
    tags: ["allotment diary", "tools"],
    sections: [
      {
        type: "text",
        content:
          "You don't need much, and you certainly don't need it all at once. But a few good tools make the heavy days lighter and the fiddly jobs quicker. These are mine — honestly rated, all of them things I use, not things I was sent.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/wheelbarrow-loaded-tools.webp",
        alt: "A wheelbarrow loaded with well-used hand tools — spade, fork and trowels — on the allotment path",
        caption: "The barrow-load in question, on its way down the path.",
      },
      {
        type: "heading",
        content: "At a glance",
      },
      {
        type: "table",
        content: "",
        rows: [
          { name: "Showa 370 gloves", use: "Everyday — light enough to feel what you're doing", price: "~£5", url: "https://www.amazon.co.uk/dp/B0017HEJC0?tag=whattosow21-21" },
          { name: "Red Gorilla flexible tub", use: "Weeding, woodchip, soil, harvest — endlessly useful", url: "https://www.amazon.co.uk/dp/B011AEXWI6?tag=whattosow21-21" },
          { name: "Draper jute twine (100m)", use: "Tying in, marking rows, a hundred jobs", price: "~£10", url: "https://www.amazon.co.uk/dp/B000PJCDZG?tag=whattosow21-21" },
          { name: "Spear & Jackson dibber", use: "Neat, even holes for seedlings and seeds", url: "https://www.amazon.co.uk/dp/B002W5V62C?tag=whattosow21-21" },
          { name: "Seeding Square", use: "Spacing seeds for square-foot growing", url: "https://www.amazon.co.uk/dp/B00US8ESWK?tag=whattosow21-21" },
          { name: "Thistlewood memory-foam kneeler", use: "Saving your knees through long sessions", price: "~£20", url: "https://www.amazon.co.uk/dp/B099FDNQR3?tag=whattosow21-21" },
          { name: "Gardena watering lance", use: "Reaching the back of the bed, under the leaves", url: "https://www.amazon.co.uk/dp/B01MQDGXMO?tag=whattosow21-21" },
          { name: "Burgon & Ball wooden trug", use: "Gathering the harvest (the nicest job)", url: "https://www.amazon.co.uk/dp/B003UMY4I4?tag=whattosow21-21" },
          { name: "Haemmerlin puncture-free wheelbarrow", use: "Hauling soil, woodchip and the harvest", url: "https://www.amazon.co.uk/dp/B07BPNJ8KH?tag=whattosow21-21" },
          { name: "Terradix 5x300 broadfork", use: "Breaking heavy clay with your weight, not your back", price: "~£129", url: "https://www.amazon.co.uk/dp/B09J4QWJLW?tag=whattosow21-21" },
        ],
      },
      {
        type: "text",
        content:
          "And because a list is easy to write and photographs are not — here are three of them actually working for their place.",
      },
      {
        type: "gallery",
        content: "",
        caption: "The lance at golden hour, the tub doing weeding duty, and the broadfork's party trick — a bindweed root out whole.",
        images: [
          { src: "/photos/blog/watering-lance-golden-hour-spray.webp", alt: "The watering lance arcing a fine spray over a bed at golden hour", caption: "The lance, on the evening round", aspect: "square" },
          { src: "/photos/blog/trug-2026-weeds.webp", alt: "A green flexible tub filled to the brim with pulled weeds, seen from above", caption: "The tub, full of weeds again", aspect: "square" },
          { src: "/photos/blog/broadfork-bindweed-root.webp", alt: "A long pale bindweed root drawn out whole across the broadfork's tines", caption: "The broadfork's party trick", aspect: "square" },
        ],
      },
      {
        type: "text",
        content:
          "If you're just starting, work down the list from the top — the cheap, everyday few first, the wheelbarrow and broadfork only once you know you'll use them. I've written about most of these in full, and the order I'd buy them, in the posts below.",
      },
    ],
    relatedCrops: [],
  },
  {
    slug: "square-foot-growing-allotment",
    title: "Square-foot growing: more crops from every bed",
    description:
      "How I planted my first beds the square-foot way — dividing each bed into a grid and sowing a different crop in every square. The simple tool that made it easy, and why it pairs so well with companion planting.",
    publishDate: new Date("2026-06-03"),
    keywords: [
      "square foot gardening UK",
      "square foot gardening for beginners",
      "seeding square",
      "how to space vegetable seeds",
      "grow multiple crops in one bed",
      "square foot gardening layout",
    ],
    heroImage: "/photos/blog/square-growing-bed.webp",
    heroAlt: "A raised allotment bed divided into a string grid, each square sown with a different crop — square-foot growing",
    intro:
      "When I planted my first beds, I did the whole lot the square-foot way: dividing each bed into a grid and sowing a different crop in every square. It made a brand-new plot feel manageable, it was genuinely fun, and I direct-sowed almost everything straight into the ground.",
    tags: ["allotment diary", "how to"],
    sections: [
      {
        type: "text",
        content:
          "The idea is simple. Instead of long rows with bare earth between them, you divide a bed into a grid of squares — and each square gets its own crop, spaced to suit it. A square of lettuces here, a square of radishes there, carrots, beetroot, spring onions, all cheek by jowl. You fit far more into a small bed, there's almost no wasted ground, and weeds have nowhere to hide.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/square-growing-bed.webp",
        alt: "A raised bed divided into a grid with a different crop growing in each square",
        caption: "One bed, gridded into squares — a different crop in each.",
      },
      {
        type: "text",
        content:
          "For what it's worth, here is the actual plan from my first year. Peas and beans across one end, then golden turnip, chard and pak choi square by square down the bed. Not everything did what the plan said it would — but drawing it out like this turned a bare bed from a blank page into a list of small jobs. Sow a square, cross it off, move on.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/bed-layout-2022-plan.webp",
        alt: "A hand-made square-foot bed plan from 2022: a coloured grid marking squares of peas, beans, golden turnip, swiss chard, pak choi, carrots, coriander and lettuce",
        caption: "The 2022 plan, square by square.",
      },
      {
        type: "text",
        content:
          "What made it easy (and, honestly, a lot of fun) was a little tool I bought: a colour-coded seeding square. It has different hole patterns pressed into it — one big hole for the things that need room, lots of little ones for the close-spaced crops — so you just press it into the soil, sow into the dimples in the right pattern, and move on to the next square. No measuring, no guesswork. I direct-sowed nearly everything that first summer straight through it.",
      },
      {
        type: "product",
        content:
          "The colour-coded square I used — press it into the soil and it gives you the right number of holes, in the right pattern, for whatever you're sowing (1, 4, 9 or 16 to a square). It turns spacing into something quick and oddly satisfying, and it's brilliant for getting children involved too.",
        productName: "Seeding Square — colour-coded seed spacer",
        productUrl: "https://www.amazon.co.uk/dp/B00US8ESWK?tag=whattosow21-21",
        productBadge: "our-pick",
        caption: "Press, sow into the dimples, move on — no measuring.",
      },
      {
        type: "text",
        content:
          "The other lovely thing is how naturally it works with companion planting. Once you're sowing different crops side by side in neighbouring squares, you can put good companions together on purpose — lettuce in the shade of taller things, carrots near alliums, flowers tucked in to pull the pollinators. It's the same idea, just on a tidy little grid.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/guides/companion-bed-overhead.webp",
        alt: "Overhead view of a raised bed with a courgette plant in the centre, a ring of orange marigolds and lettuces filling the remaining squares",
        caption: "The same thinking, four summers on — courgette in the middle, marigolds round the edge, lettuce in the gaps.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/square-growing-salad.webp",
        alt: "A square of mixed red and green salad leaves growing closely together",
        caption: "A square's worth of cut-and-come-again salad.",
      },
      {
        type: "text",
        content:
          "If you're starting a new plot and the bare beds feel daunting, this is the gentlest way in I know. Grid it up, sow a square at a time, and a month later you'll have a patchwork of green that looks like you knew exactly what you were doing all along.",
      },
    ],
    relatedCrops: ["lettuce", "radishes", "carrots", "beetroot", "spring-onions"],
    primaryProduct: { name: "Seeding Square colour-coded seed spacer", url: "https://www.amazon.co.uk/dp/B00US8ESWK?tag=whattosow21-21", ctaLabel: "Compare seed spacers" },
    rating: 5,
  },
  {
    slug: "first-allotment-summer",
    title: "My first allotment summer, in pictures",
    description:
      "A look back at my very first summer on the allotment — what grew, what surprised me, and a few honest things I'd tell anyone taking on a new plot.",
    publishDate: new Date("2026-06-03"),
    keywords: [
      "first year allotment",
      "starting an allotment",
      "first allotment summer",
      "new allotment tips",
      "what to grow first year allotment",
      "allotment for beginners UK",
    ],
    heroImage: "/photos/blog/first-summer-sunflower.webp",
    heroAlt: "A sunflower in full bloom against a dusk sky on a UK allotment, the first summer",
    intro:
      "This was my first proper summer on the allotment, and I took an enormous number of photos — because everything felt like a small miracle. Here's that first season, in pictures: what grew, what surprised me, and a few honest things I'd pass on to anyone taking on a new plot.",
    tags: ["allotment diary", "first year"],
    sections: [
      {
        type: "text",
        content:
          "We took the plot on in March, but it was June before the beds were finally built and filled. I still remember the soil being delivered on one of the hottest days of the year — the two of us barrowing load after load until every bed was full. Starting that late, I half-expected little to come of the first season. And then, all at once, it did. By the end of summer those bare new beds had turned into this:",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/first-summer-plot.webp",
        alt: "The allotment in late summer of the first year — pumpkins sprawling across the front, beds full behind, under a big evening sky",
        caption: "That first summer — the pumpkins taking over the front, everything else racing away behind.",
      },
      {
        type: "text",
        content:
          "The sunflowers were a joy — great cheerful faces standing over the beds, the thing I'd walk down to see first at the end of a long day.",
      },
      {
        type: "gallery",
        content: "",
        caption: "A first summer's growing — courgettes, peas up the canes, and a pumpkin quietly swelling.",
        images: [
          { src: "/photos/blog/first-summer-courgettes.webp", alt: "Courgettes growing on the soil", caption: "Courgettes, doing what courgettes do", aspect: "square" },
          { src: "/photos/blog/first-summer-peas.webp", alt: "Peas climbing the canes against a blue sky", caption: "Up the canes", aspect: "portrait" },
          { src: "/photos/blog/first-summer-pumpkin-green.webp", alt: "A green pumpkin developing among the leaves", caption: "A pumpkin, still green", aspect: "square" },
        ],
      },
      {
        type: "text",
        content:
          "And then the waiting paid off. Watching that first pumpkin turn from green to orange over a few weeks was ridiculously satisfying — proof that the whole thing actually worked.",
      },
      {
        type: "gallery",
        content: "",
        caption: "The same pumpkin, a few weeks apart.",
        images: [
          { src: "/photos/blog/first-summer-pumpkin-green.webp", alt: "The pumpkin still green among the leaves", caption: "Still green", aspect: "square" },
          { src: "/photos/crops/pumpkin-patch-orange.webp", alt: "The pumpkin ripened to bright orange", caption: "…then orange", aspect: "square" },
        ],
      },
      {
        type: "text",
        content:
          "The harvest, when it came, came all at once — the happy glut of a first summer. Tomatoes by the punnet, more courgettes than anyone could reasonably eat, lettuce cut fresh of an evening.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/tomato-punnet-detail.webp",
        alt: "A punnet of ripe tomatoes with a freshly cut lettuce, on the decking",
        caption: "The first proper pickings.",
      },
      {
        type: "quote",
        content:
          "Everything felt like a small miracle that first summer. It still rather does.",
      },
      {
        type: "text",
        content:
          "If you're about to start your own, the honest advice is this: don't try to buy or grow everything at once. Get a few beds in, sow the easy, generous things (courgettes, beans, lettuce, a pumpkin for the fun of it), and let your first summer teach you the rest. A handful of good tools and a bit of patience will get you further than any amount of kit.",
      },
      {
        type: "heading",
        content: "The handful that helped",
      },
      {
        type: "text",
        content:
          "These are the cheap, everyday few I actually used that first summer and still reach for now — nothing fancy, all of it earns its keep.",
      },
      {
        type: "product",
        content:
          "Light, close-fitting and grippy so you can still feel what you're doing. Cheap enough to keep a couple of pairs on the go.",
        productName: "Showa 370 gardening gloves",
        productPrice: "~£5",
        productUrl: "https://www.amazon.co.uk/dp/B0017HEJC0?tag=whattosow21-21",
        productBadge: "essential",
      },
      {
        type: "product",
        content:
          "A thick memory-foam kneeler that saves your knees through a long first-summer of planting and weeding. You'll bless it within a week.",
        productName: "Thistlewood memory-foam kneeler",
        productPrice: "~£20",
        productUrl: "https://www.amazon.co.uk/dp/B099FDNQR3?tag=whattosow21-21",
        productBadge: "our-pick",
      },
      {
        type: "product",
        content:
          "The flexible tub I drag everywhere — weeds beside me as I go, then woodchip, soil, the harvest home. If you buy one thing on this list, make it a couple of these.",
        productName: "Red Gorilla flexible tub (small, 14L)",
        productUrl: "https://www.amazon.co.uk/dp/B011AEXWI6?tag=whattosow21-21",
        productBadge: "our-pick",
        caption: "Keep a couple at the plot — you'll always want one.",
      },
      {
        type: "product",
        content:
          "For the nicest job of all — bringing the harvest in. There's something very Beatrix Potter about a trug full of veg, and that first summer is when you'll fall for it.",
        productName: "Burgon & Ball traditional wooden trug",
        productUrl: "https://www.amazon.co.uk/dp/B003UMY4I4?tag=whattosow21-21",
        productBadge: "our-pick",
      },
      {
        type: "text",
        content:
          "And if you want the fuller list — the things to add as you go, and the one big upgrade worth saving for — it's all in my tools roundup below.",
      },
      {
        type: "gallery",
        content: "",
        caption: "The same ground, four years apart: bare earth in April 2022, the first summer's beds, the 2024 marigold year, and the plot as it stands in 2026.",
        images: [
          { src: "/photos/blog/plot-2022-day-one.webp", alt: "Bare dug earth on day one of the allotment, April 2022", caption: "April 2022", aspect: "square" },
          { src: "/photos/blog/plot-2022-first-summer.webp", alt: "The first summer's young beds in golden evening light, 2022", caption: "First summer", aspect: "square" },
          { src: "/photos/blog/plot-2024-marigold-beds.webp", alt: "Marigold-edged raised beds and a mesh tunnel, summer 2024", caption: "2024", aspect: "square" },
          { src: "/photos/blog/plot-2026-raised-beds.webp", alt: "The full raised-bed grid freshly planted, June 2026", caption: "2026", aspect: "square" },
        ],
      },
      {
        type: "text",
        content:
          "And the sunflowers are the thing that has come back every single year since. A different corner of the plot each summer, the same craning up at them by August. If you plant nothing else frivolous in your first year, plant sunflowers.",
      },
      {
        type: "gallery",
        content: "",
        caption: "One sunflower a year, more or less.",
        images: [
          { src: "/photos/blog/sunflower-2022-dusk.webp", alt: "A sunflower glowing against a pink and blue dusk sky, 2022", caption: "2022 — the first one, at dusk", aspect: "square" },
          { src: "/photos/blog/sunflower-2023-bee.webp", alt: "A sunflower face with a bumblebee on it, the allotment behind, 2023", caption: "2023 — the bees found them", aspect: "square" },
          { src: "/photos/blog/sunflowers-teddy-bear.webp", alt: "A fluffy teddy-bear sunflower among classic sunflowers against a blue sky, 2025", caption: "2025 — a teddy-bear variety joined in", aspect: "square" },
        ],
      },
      {
        type: "video",
        content: "",
        src: "/videos/blog/sunflower-face-2025.mp4",
        poster: "/videos/blog/sunflower-face-2025-poster.webp",
        alt: "A big sunflower face glowing in September light",
        caption: "Last September's finest, five summers in.",
      },
    ],
    relatedCrops: ["courgettes", "peas", "pumpkins", "tomatoes", "runner-beans", "sunflowers"],
  },
  {
    slug: "garden-tubs-trugs-allotment",
    title: "Garden tubs and trugs: the most useful cheap kit on the allotment",
    description:
      "You don't expect to love a plastic tub, but the flexible garden tub might be the most useful thing on my plot. Plus the proper veg trug for gathering the harvest.",
    publishDate: new Date("2026-06-03"),
    keywords: [
      "flexible garden tub",
      "gorilla tub",
      "tubtrug",
      "garden trug",
      "vegetable harvesting trug",
      "best garden tub UK",
    ],
    heroImage: "/photos/blog/plot-summer-growing.webp",
    heroAlt: "The allotment in full summer growth — the kind of plot a tub earns its keep on, day in and day out",
    intro:
      "You don't expect to love a plastic tub. But the flexible garden tub might be the most useful thing I own &mdash; the one bit of kit I reach for almost every time I'm on the plot, for a hundred small jobs I never think to plan for.",
    tags: ["allotment diary", "tools"],
    sections: [
      {
        type: "text",
        content:
          "Mostly, it's my weeding companion. I set a small tub down beside me and drop the weeds straight in as I go &mdash; no little piles left to scatter, no trudging back and forth. I don't put weeds on the compost (I'd rather not invite them back), so when the tub's full I tip it into a bigger one and carry the lot home to the bin. It sounds like nothing, but having somewhere to put the weeds is the difference between a tidy hour and a frustrating one.",
      },
      {
        type: "text",
        content:
          "After that, it's the hundred other jobs. A tub shifts woodchip from the donated pile down to the beds, moves a load of soil, carries seedlings out to plant. You name it, a tub will do it &mdash; and it flexes and folds away against the shed when it's done.",
      },
      {
        type: "tip",
        content:
          "Keep a couple of small tubs at the plot, not at home. There's nothing more annoying than starting to weed and having nowhere to put them. The small ones are perfect for moving along a row beside you; when one's full, tip it into a big one to bring home. A little fleet of them, big and small, is the trick.",
      },
      {
        type: "ownedSince",
        content: "",
        since: "2025",
        images: [
          { src: "/photos/blog/trug-2025-weeding.webp", alt: "The green trug on weeding duty, 2025", caption: "2025" },
          { src: "/photos/blog/trug-2026-weeds.webp", alt: "The same trug, still hauling weeds, 2026", caption: "2026" },
        ],
        note: "Dragged, overfilled, left out all winter — the trug doesn't care. That's the review.",
      },
      {
        type: "product",
        content:
          "The small tub is the weeding companion &mdash; light enough to nudge along the row beside you, easy to tip into a bigger one when it's full. I'd keep two of these at the plot.",
        productName: "Red Gorilla flexible tub — small (14L)",
        productUrl: "https://www.amazon.co.uk/dp/B011AEXWI6?tag=whattosow21-21",
        productBadge: "our-pick",
        caption: "The one I reach for most — keep a couple at the plot.",
      },
      {
        type: "product",
        content:
          "The big tub is the workhorse: woodchip, soil, a full load of weeds for the bin. Flexible, frost-proof, and it lasts for years &mdash; two strong handles make a heavy load far easier than a rigid bucket.",
        productName: "Red Gorilla flexible tub — large (38L)",
        productUrl: "https://www.amazon.co.uk/dp/B011AEZ8BU?tag=whattosow21-21",
        productBadge: "essential",
      },
      {
        type: "heading",
        content: "And then, the trug",
      },
      {
        type: "text",
        content:
          "A trug is a different thing altogether &mdash; not for hauling, but for gathering. The traditional wooden veg trug is the one for the harvest: beans and courgettes and the first tomatoes, carried up the path of an evening. There's something very Beatrix Potter about a trug full of veg, and I won't apologise for it.",
      },
      {
        type: "product",
        content:
          "A proper, lightweight wooden trug for bringing the harvest in. Beautifully made, and it only looks lovelier as it weathers. Not a workhorse like the tubs &mdash; this one's purely for the nicest job on the plot.",
        productName: "Burgon & Ball traditional wooden trug",
        productUrl: "https://www.amazon.co.uk/dp/B003UMY4I4?tag=whattosow21-21",
        productBadge: "our-pick",
        caption: "Purely for gathering — the nicest job there is.",
      },
      {
        type: "text",
        content:
          "Tubs for the graft, a trug for the gathering. Neither is glamorous or dear, and between them they'll see you through almost everything a plot asks of you.",
      },
    ],
    relatedCrops: [],
    primaryProduct: { name: "Red Gorilla flexible tub (small, 14L)", url: "https://www.amazon.co.uk/dp/B011AEXWI6?tag=whattosow21-21", ctaLabel: "Compare flexible tubs" },
    rating: 5,
  },
  {
    slug: "best-first-tools-new-allotment",
    title: "The tools I'd actually buy first for a new allotment",
    description:
      "You don't need much to start an allotment — and most of it is cheap. The handful of tools I'd buy first, the ones to add as you go, and the single upgrade worth saving for.",
    publishDate: new Date("2026-06-03"),
    keywords: [
      "best tools for a new allotment",
      "allotment tools for beginners",
      "what tools do I need for an allotment",
      "essential gardening tools UK",
      "allotment starter kit",
      "best gardening tools UK",
    ],
    heroImage: "/photos/blog/harvest-tools-flatlay.webp",
    heroAlt: "A few well-chosen tools and the evening's pickings laid out on the decking — a watering can, scissors, a punnet of tomatoes and a lettuce",
    intro:
      "When you take on a new plot it's tempting to buy everything at once. Don't. You need surprisingly little to start, and most of it is cheap — these are the tools I actually reach for, in the order I'd buy them.",
    tags: ["allotment diary", "tools"],
    sections: [
      {
        type: "heading",
        content: "Start here — the cheap, everyday few",
      },
      {
        type: "text",
        content:
          "If you bought nothing else this season, these would see you through. None of it is dear, and all of it earns its place from the first morning.",
      },
      {
        type: "product",
        content:
          "My favourites — light, close-fitting and grippy, so you can still feel what you're doing. Cheap enough to own a couple of pairs, which you'll want, because one is always drying.",
        productName: "Showa 370 gardening gloves",
        productPrice: "~£5",
        productUrl: "https://www.amazon.co.uk/dp/B0017HEJC0?tag=whattosow21-21",
        productBadge: "essential",
        caption: "Buy two pairs — one's always drying.",
      },
      {
        type: "product",
        content:
          "A thick memory-foam kneeler that saves your knees through a long planting or weeding session. Unglamorous, and you'll bless it within a week.",
        productName: "Thistlewood memory-foam kneeler",
        productPrice: "~£20",
        productUrl: "https://www.amazon.co.uk/dp/B099FDNQR3?tag=whattosow21-21",
        productBadge: "our-pick",
      },
      {
        type: "product",
        content:
          "A big roll of jute twine is the most-used thing in my bag — tying in, marking out rows, supporting, and the hundred other jobs a length of string is for. Compostable at the end of it all.",
        productName: "Draper 100m jute garden twine",
        productPrice: "~£10",
        productUrl: "https://www.amazon.co.uk/dp/B000PJCDZG?tag=whattosow21-21",
        productBadge: "essential",
      },
      {
        type: "product",
        content:
          "Write the variety on in pencil and you'll actually remember what's what come spring — the difference between a tidy plot and a guessing game. Biodegradable, so no plastic left in the soil.",
        productName: "Wooden plant labels (100)",
        productPrice: "~£5",
        productUrl: "https://www.amazon.co.uk/dp/B0DQ5WVTQJ?tag=whattosow21-21",
        productBadge: "budget",
      },
      {
        type: "product",
        content:
          "A proper carbon-steel dibber for making neat, even holes for seedlings and seeds. Solid in the hand and lovely to use — the small luxury that makes planting feel considered rather than rushed.",
        productName: "Spear & Jackson carbon dibber",
        productUrl: "https://www.amazon.co.uk/dp/B002W5V62C?tag=whattosow21-21",
        productBadge: "our-pick",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/dibber-seed-packets.webp",
        alt: "A wooden-handled dibber lying on freshly dug soil beside a few seed packets, ready for sowing",
        caption: "Sowing morning — dibber, packets, and a bed ready for both.",
      },
      {
        type: "heading",
        content: "Add as you go",
      },
      {
        type: "text",
        content:
          "Once you're settled and you know how you work, these are the next things I'd reach for — each one quietly makes a regular job easier.",
      },
      {
        type: "product",
        content:
          "A little hand puller that grips and lifts weeds — roots and all — without you bending double. Worth its keep on the worst of the bindweed and dandelions.",
        productName: "Hand weed puller",
        productUrl: "https://www.amazon.co.uk/dp/B08CTVKW8K?tag=whattosow21-21",
        productBadge: "budget",
      },
      {
        type: "product",
        content:
          "A long watering lance that reaches the back of the bed and in under the leaves, where the roots actually want it. It's turned the evening water from a chore into the part of the day I look forward to.",
        productName: "Gardena premium watering lance",
        productUrl: "https://www.amazon.co.uk/dp/B01MQDGXMO?tag=whattosow21-21",
        productBadge: "our-pick",
        caption: "The reach is the thing — a good soak without trampling a single plant.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/watering-lance-golden-hour-spray.webp",
        alt: "The watering lance arcing a fine spray over the nasturtiums and marigolds at golden hour",
        caption: "The evening round, summer 2025 — the job it was bought for.",
      },
      {
        type: "text",
        content:
          "I've written more about why I love it in the full watering lance review.",
      },
      {
        type: "product",
        content:
          "A sturdy stainless bulb planter with depth marks down the side — brilliant for popping in potatoes and bulbs at an even depth, even when the soil is firm. Takes the guesswork out of spacing.",
        productName: "Kent & Stowe stainless bulb planter",
        productUrl: "https://www.amazon.co.uk/dp/B09GVYL32D?tag=whattosow21-21",
        productBadge: "our-pick",
      },
      {
        type: "heading",
        content: "The one upgrade worth saving for",
      },
      {
        type: "product",
        content:
          "Not a first purchase — but if your soil is heavy clay, this is the thing to save towards. A wide broadfork breaks up the ground with your weight rather than your back, and it's genuinely a pleasure to use. It changed how I feel about digging.",
        productName: "Terradix 5x300 broadfork",
        productPrice: "~£129",
        productUrl: "https://www.amazon.co.uk/dp/B09J4QWJLW?tag=whattosow21-21",
        productBadge: "upgrade",
        caption: "The width is the joy — you cover far more ground with every lift.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/broadfork-bindweed-root.webp",
        alt: "A long pale bindweed root lifted out whole and unbroken across the broadfork's tines",
        caption: "The proof: a bindweed root out whole, not snapped off to regrow.",
      },
      {
        type: "text",
        content:
          "There's a full account of how it tamed my clay (and a great deal of bindweed) in the broadfork review.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/tomato-punnet-detail.webp",
        alt: "A punnet of ripe tomatoes and a freshly cut lettuce on the decking",
        caption: "The point of all of it — an evening's pickings.",
      },
      {
        type: "text",
        content:
          "And that's it. Start with the cheap few, add as you find the gaps, and save the big buy for when you know you'll use it. A plot is made over years, not in one trip to the shop.",
      },
    ],
    relatedCrops: [],
  },
  {
    slug: "wheelbarrow-allotment-haemmerlin",
    title: "Haemmerlin wheelbarrow review: worth the upgrade after four years",
    description:
      "My first wheelbarrow was free, cement-crusted and faithful. After four years I treated myself to a Haemmerlin puncture-free one — here's the honest story of both.",
    publishDate: new Date("2026-06-03"),
    keywords: [
      "wheelbarrow allotment",
      "puncture free wheelbarrow",
      "Haemmerlin wheelbarrow review",
      "best wheelbarrow allotment UK",
      "garden wheelbarrow",
      "puncture proof wheelbarrow UK",
    ],
    heroImage: "/photos/blog/wheelbarrow-green-wheel.webp",
    heroAlt: "The green Haemmerlin puncture-free wheelbarrow on the allotment, loaded with bags of peat-free compost, its bright green wheel catching the light",
    intro:
      "My first wheelbarrow was donated — free, and faithful, and frankly a bit of a wreck. It had been used for cement, so it came with a crust, a nail through the bottom of it, and a squeak you could set your watch by. After four good years, I finally treated myself to a new one.",
    tags: ["allotment diary", "tools"],
    sections: [
      {
        type: "text",
        content:
          "I was fond of that old barrow, for all its faults. The squeak only stopped if you leaned a little to the right — which of course sent you veering off in a gentle right-hand curve, so you'd be forever correcting your line on the way up the path. The handles had come off long before it reached me, leaving bare metal to grip. But it was free, and it did the one big job that mattered: it moved the whole first delivery of soil, barrow-load by barrow-load, to fill every one of my beds. Four faithful years.",
      },
      {
        type: "text",
        content:
          "When I finally decided to treat myself, I did a proper bit of research — and Reddit, as it often does, pointed the way. The Haemmerlin kept coming up. I went for the green one with the bright wheel, mostly because I liked the look of it, and I've not regretted it for a moment.",
      },
      {
        type: "text",
        content:
          "It doesn't squeak. The handles are proper handles, comfortable to hold. And the puncture-free wheel means no slow flat halfway through a job — which, given my last one had a literal nail through it, feels like a small luxury. I've used it to barrow woodchip up to line the paths and to wheel up bag after bag of soil, and it takes it all in its stride.",
      },
      {
        type: "gallery",
        content: "",
        images: [
          {
            src: "/photos/blog/wheelbarrow-compost-path.webp",
            alt: "The new green wheelbarrow loaded with bags of compost on the grass path under a big blue spring sky",
            caption: "Loaded up the path",
            aspect: "portrait",
          },
          {
            src: "/photos/blog/wheelbarrow-headon-haemmerlin.webp",
            alt: "The empty green Haemmerlin wheelbarrow head-on, its name on the handle grips, on a woodchip path between the beds",
            caption: "Haemmerlin on the grips",
            aspect: "portrait",
          },
          {
            src: "/photos/blog/wheelbarrow-loaded-tools.webp",
            alt: "The green wheelbarrow loaded with a spade, fork and hand cultivator, its bright green puncture-free wheel at the front, on the grass by the beds",
            caption: "The whole kit, one trip",
            aspect: "portrait",
          },
        ],
      },
      {
        type: "quote",
        content:
          "It's propped against the shed as I write this, and I rather like catching sight of that bright wheel from clear across the plot.",
      },
      {
        type: "product",
        content:
          "Mine's the Trade version, which I found at Wickes after all that research. On Amazon the equivalent is the Haemmerlin Original 90L — the same bright green, the same puncture-free wheel that won't ever leave you stranded with a flat halfway up the path. After a squeaky, cement-crusted predecessor, it's an absolute joy.",
        productName: "Haemmerlin Original 90L puncture-free wheelbarrow",
        productUrl: "https://www.amazon.co.uk/dp/B07BPNJ8KH?tag=whattosow21-21",
        productBadge: "our-pick",
        caption: "Puncture-free is the part that matters on an allotment — no flat tyres, no nails through the bottom.",
      },
      {
        type: "text",
        content:
          "A wheelbarrow isn't a glamorous purchase. But it's one of those quiet, everyday tools you reach for constantly, and a good one makes the heavy days lighter. After four years of leaning right, I'm happy to wheel a straight line. And come winter, it'll be tucked away in the shed, out of the weather, to keep it in tip-top condition for what I hope will be many years to come.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/wheelbarrow-resting-plot.webp",
        alt: "The green Haemmerlin wheelbarrow resting in the plot, loaded with a spade and fork, its bright green puncture-free wheel catching the light, cosmos flowering in the foreground",
        caption: "Off-duty in the plot, the green wheel catching the evening light.",
      },
    ],
    relatedCrops: [],
    primaryProduct: { name: "Haemmerlin Original 90L puncture-free wheelbarrow", url: "https://www.amazon.co.uk/dp/B07BPNJ8KH?tag=whattosow21-21", ctaLabel: "Compare wheelbarrows" },
    rating: 5,
  },
  {
    slug: "watering-lance-allotment",
    title: "Why you need to get a watering lance for your allotment",
    description:
      "A watering lance is a long metal wand for the end of your hose that puts water exactly where the plant needs it. Why it's better than a hose attachment, and the one we use.",
    publishDate: new Date("2026-06-03"),
    keywords: [
      "watering lance",
      "garden watering lance",
      "best way to water allotment",
      "watering lance review UK",
      "watering allotment hot summer",
      "Gardena watering lance",
    ],
    heroImage: "/photos/blog/watering-lance-golden-hour-spray.webp",
    heroAlt: "A metal watering lance showering a bed of nasturtiums and marigolds on the allotment, the spray catching the evening sun",
    intro:
      "I really love my watering lance, and I can't believe I didn't know they existed. I only found out when I saw someone using one on Instagram — years of fiddling with a standard hose attachment, and this was here all along. It's a long metal wand that fixes to the end of the hose, with a gentle rose at the tip, and it puts water exactly where the plant needs it.",
    tags: ["allotment diary", "tools"],
    sections: [
      {
        type: "text",
        content:
          "The point of it is reach. You stand comfortably at the edge of the bed and the lance does the bending for you — under the leaves, straight to the roots, right to the back row you'd otherwise have to trample in to reach. Watering a bed properly stops being a stretch and becomes a job you can do standing still.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/watering-lance-potato-row.webp",
        alt: "The watering lance soaking the soil around young potato plants in open ground, water pooling at their bases",
        caption: "Watering-in the first early potatoes — the whole row, from the path.",
      },
      {
        type: "text",
        content:
          "It's much better than the hose attachment we used before. A spray gun soaks the foliage and the path and not much else; the lance's rose is gentler than most watering cans, so you can water seedlings without flattening them, and the water lands where it's actually wanted. Beds get watered at the roots, which is where it counts — especially in a dry spell, when every canful matters.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/watering-lance-tomato-roots.webp",
        alt: "The watering lance pouring water at the base of staked tomato plants inside a ring of marigolds",
        caption: "Under the leaves, straight to the roots — the tomatoes get the water, not the foliage.",
      },
      {
        type: "text",
        content:
          "A small thing I like: the metal stays cool in your hand when you're watering on a really hot day. Unless you've left it lying in the sun before picking it up — you'll only do that once.",
      },
      {
        type: "gallery",
        content: "",
        caption: "One tool, three jobs: watering-in new transplants, soaking the courgette bed, and a rose gentle enough for seed trays.",
        images: [
          {
            src: "/photos/blog/watering-lance-watering-in-transplants.webp",
            alt: "The watering lance soaking freshly planted seedlings in open ground, a hand fork resting beside them",
            caption: "Watering-in new transplants",
            aspect: "square",
          },
          {
            src: "/photos/blog/watering-lance-courgette-bed.webp",
            alt: "The watering lance arcing spray into a courgette bed edged with orange marigolds",
            caption: "A proper soak for the courgette bed",
            aspect: "square",
          },
          {
            src: "/photos/blog/watering-lance-seed-trays.webp",
            alt: "The watering lance head gently sprinkling trays of seedlings on the grass",
            caption: "Gentle enough for seed trays",
            aspect: "square",
          },
        ],
      },
      {
        type: "video",
        content: "",
        src: "/videos/blog/lance-spray-loop.mp4",
        poster: "/videos/blog/lance-spray-loop-poster.webp",
        alt: "The watering lance arcing a fine mist over a freshly planted bed of seedlings",
        caption: "Five seconds of the actual job — the fine rose, the reach, the seedlings untouched.",
      },
      {
        type: "ownedSince",
        content: "",
        since: "summer 2025",
        images: [
          { src: "/photos/blog/watering-lance-golden-hour-spray.webp", alt: "The watering lance in use, June 2025", caption: "June 2025" },
          { src: "/photos/blog/watering-lance-potato-row.webp", alt: "The same lance watering-in potatoes, May 2026", caption: "May 2026" },
        ],
        note: "Two summers of daily use, dropped on the path more times than I can count. Same lance, still watering.",
      },
      {
        type: "product",
        content:
          "If you only upgrade one watering thing, make it this. The reach changes how thoroughly you water, the rose is kind to seedlings, and a metal one is built to last years of being dropped on the path. Ours is the Gardena, and it's been faultless.",
        productName: "Gardena premium watering lance",
        productUrl: "https://www.amazon.co.uk/dp/B01MQDGXMO?tag=whattosow21-21",
        productBadge: "our-pick",
        caption: "The reach is the thing — the back of the bed, under the leaves, without trampling a single plant.",
      },
      {
        type: "text",
        content:
          "As the summers get hotter we're planning ahead: a dip tank, and more water butts, so there's always something of our own to draw from. The tap gets busy in a dry spell — sometimes there's a queue, sometimes nothing free at all. But that's a project for another day. For now: hose on, lance in hand, and the evening water done properly.",
      },
    ],
    relatedCrops: ["courgettes", "tomatoes"],
    primaryProduct: { name: "Gardena premium watering lance", url: "https://www.amazon.co.uk/dp/B01MQDGXMO?tag=whattosow21-21", ctaLabel: "Compare watering lances" },
    rating: 5,
  },
  {
    slug: "broadfork-clay-bindweed",
    title: "Why a broadfork is the best tool for heavy clay soil",
    description:
      "Why a wide broadfork turned heavy clay — and an awful lot of bindweed — into an enjoyable spring morning's work. An honest, first-hand review of the Terradix 5x300.",
    publishDate: new Date("2026-06-02"),
    keywords: [
      "broadfork UK",
      "Terradix broadfork",
      "broadfork clay soil",
      "digging clay soil allotment",
      "bindweed clay soil",
      "broadfork review",
    ],
    heroImage: "/photos/blog/broadfork-standing.webp",
    heroAlt: "The Terradix broadfork standing in freshly worked allotment soil, its five tines driven in and orange handles upright, cosmos flowering behind",
    intro:
      "The broadfork has turned out to be the best thing I've bought for the plot. Mine is the wide one — the Terradix 5x300 — and the width is the joy of it: five long tines that take a great bite of ground at once, so you clear far more with every go.",
    tags: ["allotment diary", "tools"],
    sections: [
      {
        type: "text",
        content:
          "You stand on it to sink the tines in, then lean back, and it slices up and breaks the clay apart as it lifts — a gentle rock rather than a heave, your weight doing the work instead of your back. It's genuinely lovely to use on a still spring morning.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/broadfork-clay-dig.webp",
        alt: "The Terradix broadfork resting on freshly broken clay at the allotment, a green trug alongside and weed-membrane beds behind",
        caption: "Mid-dig — the clay broken into clumps, ready for the bindweed to be picked out. A still from the timelapse.",
      },
      {
        type: "text",
        content:
          "My soil is heavy clay, and I'd rather not run a petrol machine on the plot, so when I kept seeing growers recommend a broadfork I did my homework and took the plunge. It arrived late last summer and waited out the winter; this April I finally dug over the bed for potatoes and sunflowers.",
      },
      {
        type: "text",
        content:
          "The real gift was the bindweed. Its roots run through the clay like pale wires — long, fine threads you have to chase — and because the broadfork opens the soil so well, you can crumble the clumps apart by hand and draw each one out whole. There's real satisfaction in easing out a root that hasn't snapped (the broken bits are what grow back), and I lifted some gloriously long ones, roots and all, unbroken.",
      },
      {
        type: "gallery",
        content: "",
        caption: "Tines under a clod, a pale bindweed root drawn out whole, and the clay left in workable crumbs.",
        images: [
          {
            src: "/photos/blog/broadfork-lifting-clod.webp",
            alt: "The broadfork's tines levering up a clod of heavy clay soil at the allotment",
            caption: "Lifting a clod",
            aspect: "square",
          },
          {
            src: "/photos/blog/broadfork-bindweed-root.webp",
            alt: "A long pale bindweed root drawn out whole and unbroken from the broken clay",
            caption: "A bindweed root, out whole",
            aspect: "square",
          },
          {
            src: "/photos/blog/broadfork-broken-clay.webp",
            alt: "Heavy clay broken into workable crumbs after going over it with the broadfork",
            caption: "Clay broken to crumbs",
            aspect: "square",
          },
        ],
      },
      {
        type: "text",
        content:
          "I'd also kept that bed under weed membrane the season before — months without light — and between the two it's far less vigorous now. A little still pops up, as bindweed always will, but the worst of it is gone.",
      },
      {
        type: "product",
        content:
          "Wide, beautifully made, and a real pleasure to use through heavy clay. Not a cheap tool, but it's changed how I feel about digging — and I'll be using it for years.",
        productName: "Terradix 5x300 broadfork",
        productPrice: "~£129",
        productUrl: "https://www.amazon.co.uk/dp/B09J4QWJLW?tag=whattosow21-21",
        productBadge: "upgrade",
        caption: "The width is what makes it — you cover far more ground with every lift.",
      },
      {
        type: "text",
        content: "Corn goes in the next patch, and I'm rather looking forward to digging it over.",
      },
    ],
    relatedCrops: ["potatoes", "sunflowers"],
    kit: ["gloves", "kneeler", "weed-puller"],
    primaryProduct: { name: "Terradix 5x300 broadfork", url: "https://www.amazon.co.uk/dp/B09J4QWJLW?tag=whattosow21-21", price: "~£129", ctaLabel: "Compare broadforks" },
    rating: 5,
  },
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
        type: "image",
        content: "",
        src: "/photos/blog/potting-on-tomatoes-april.webp",
        alt: "A tray of tomato seedlings freshly potted on into their own pots, out in the April sun",
        caption: "Six weeks on: potted into their own pots and starting to harden off outside on kind days.",
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
        type: "image",
        content: "",
        src: "/photos/blog/tomato-bed-marigold-ring.webp",
        alt: "Staked tomato plants planted out in a bed ringed with orange marigolds, June evening",
        caption: "Planted out into a marigold ring — canes in first, plants tied in as they climb.",
      },
      {
        type: "text",
        content:
          "Watering is the single most important thing once tomatoes are in the ground. Inconsistent watering causes blossom end rot — those annoying black patches on the bottom of the fruit. I watered at the base every morning during dry spells, and mulched around the plants to keep moisture in.",
      },
      {
        type: "gallery",
        content: "",
        caption: "The long middle: trusses set green, and then — weeks later — the gradient begins.",
        images: [
          {
            src: "/photos/blog/tomatoes-green-trusses.webp",
            alt: "Green cherry tomato trusses hanging on the vine in July",
            caption: "July: set, and waiting",
            aspect: "square",
          },
          {
            src: "/photos/guides/tomato-truss-ripening.webp",
            alt: "A cherry tomato truss ripening from green through orange to red",
            caption: "August: the gradient",
            aspect: "square",
          },
        ],
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
        type: "video",
        content: "",
        src: "/videos/blog/tomato-trug-2025.mp4",
        poster: "/videos/blog/tomato-trug-2025-poster.webp",
        alt: "A blue trug filled with cherry and plum tomatoes on the grass, moving close over the harvest",
        caption: "One September evening's picking, by the trugful.",
      },
      {
        type: "gallery",
        content: "",
        caption: "Year one against year four: the first trusses we ever ripened, and what an ordinary picking day looks like now.",
        images: [
          { src: "/photos/blog/tomatoes-2022-first-ripening.webp", alt: "The very first tomatoes ripening on a staked vine, 2022", caption: "2022: the first ones", aspect: "square" },
          { src: "/photos/blog/tomatoes-2025-harvest-box.webp", alt: "A box overflowing with cherry tomatoes on the bench, 2025", caption: "2025: an ordinary Tuesday", aspect: "square" },
        ],
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
        type: "gallery",
        content: "",
        caption: "One bed, one season: plugs in June, bordering up by midsummer, a blaze by July the next year.",
        images: [
          {
            src: "/photos/guides/companion-marigolds-01-plugs.webp",
            alt: "French marigold plugs just planted along the borders of a raised bed in early June",
            caption: "June: plugs in",
            aspect: "square",
          },
          {
            src: "/photos/guides/companion-marigolds-02-bordering.webp",
            alt: "Marigolds bordering the bed by mid-June, tomatoes climbing their canes",
            caption: "Mid-June: bordering up",
            aspect: "square",
          },
          {
            src: "/photos/blog/marigold-lettuce-blaze-2024.webp",
            alt: "Butterhead lettuces behind a full blaze of orange marigolds in high summer",
            caption: "High summer: the blaze",
            aspect: "square",
          },
        ],
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
        type: "image",
        content: "",
        src: "/photos/blog/purple-pea-pod-hand.webp",
        alt: "A purple pea pod split open in the hand to show a row of green peas, allotment beds behind",
        caption: "Split open on the spot. These never made it home.",
      },
      {
        type: "video",
        content: "",
        src: "/videos/blog/mangetout-backlit.mp4",
        poster: "/videos/blog/mangetout-backlit-poster.webp",
        alt: "A mangetout pod glowing with sunlight through it on the vine",
        caption: "Still growing them every year since — one of last summer's, backlit on the vine.",
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
        type: "image",
        content: "",
        src: "/photos/blog/carrots-2022-kitchen.webp",
        alt: "A hand holding a bunch of just-dug carrots with their tops on, indoors by the kitchen clock",
        caption: "The bit that never stops feeling good — dinner, dug an hour earlier.",
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
        src: "/photos/blog/harvest-2022-decking.webp",
        alt: "An evening still life on the decking: a teal watering can, a freshly cut lettuce, a punnet of tomatoes and a pair of red scissors",
        caption: "An August evening's picking, laid out on the decking before going in.",
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
        type: "text",
        content:
          "Ours have earned their keep three summers running now. The bed went in as runners in spring 2023, watered in with the hose while most of the plot around it was still bare soil. The next summer it was throwing out properly big berries, and by last year we were carrying boxes of them home with plenty still ripening on the plants.",
      },
      {
        type: "gallery",
        content: "",
        caption: "The same strawberry bed, three summers running.",
        images: [
          { src: "/photos/guides/watering-strawberry-bed.webp", alt: "Watering in a newly planted strawberry bed with a hose, 2023", caption: "2023 — watered in as new runners", aspect: "square" },
          { src: "/photos/blog/strawberry-2024-marigolds.webp", alt: "A large glossy red strawberry held up over a bed of marigolds, 2024", caption: "2024 — the first properly big ones", aspect: "square" },
          { src: "/photos/blog/strawberries-2025-box.webp", alt: "A cardboard box filled with freshly picked home-grown strawberries, 2025", caption: "2025 — boxes of them", aspect: "square" },
        ],
      },
      {
        type: "video",
        content: "",
        src: "/videos/blog/strawberry-box-2025.mp4",
        poster: "/videos/blog/strawberry-box-2025-poster.webp",
        alt: "A box of just-picked strawberries sitting on the woodchip path",
        caption: "And one of those boxes, still warm from the sun.",
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
        type: "image",
        content: "",
        src: "/photos/blog/windowsill-seedlings-cardboard.webp",
        alt: "Seedlings in mixed pots boxed in cardboard on the windowsill, first year",
        caption: "Year one: the windowsill nursery, cardboard box and all. It works.",
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
        type: "gallery",
        content: "",
        caption: "The no-dig order of work: cardboard down, compost on top, planting stations marked out.",
        images: [
          {
            src: "/photos/blog/cardboard-compost-bed.webp",
            alt: "A raised bed filled with fresh compost over a cardboard sheet-mulch layer",
            caption: "Cardboard, then compost",
            aspect: "square",
          },
          {
            src: "/photos/blog/compost-planting-stations.webp",
            alt: "Compost planting stations marked out in neat rows across a dug strip",
            caption: "Stations marked out",
            aspect: "square",
          },
        ],
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
    kit: ["broadfork", "gloves", "ground-pegs"],
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
        type: "image",
        content: "",
        src: "/photos/blog/cat-in-fresh-bed.webp",
        alt: "The allotment cat lying in the freshly planted bed among the squash seedlings",
        caption: "Quality control inspected the new bed and declared it comfortable.",
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
    slug: "planting-out-heatwave-june",
    title: "Planting out in a heatwave: what I learned the hard way",
    description:
      "I planted marigold plugs in April during a hot spell, didn't visit for two days, and came back to find every single one had fried. Here is what happened, what I did differently the second time, and how to protect newly planted plugs when the weather turns unexpectedly warm.",
    publishDate: new Date("2026-06-01"),
    keywords: [
      "planting out in hot weather UK",
      "marigolds wilting after planting",
      "heatwave allotment UK",
      "planting plugs in heat",
      "marigold plugs dying after planting",
      "how to plant out in summer UK",
      "allotment heatwave tips",
    ],
    heroImage: "/photos/blog/marigold-border-evening-beds.webp",
    heroAlt:
      "Raised allotment beds with orange marigolds along the borders and courgette plants growing, photographed in evening light",
    intro:
      "I have planted marigolds out in April three years running. In 2024, the slugs got them. In 2025, the same timing and they thrived — the best borders the plot has ever had. In 2026, same timing again, and every single one fried in the heat. Every year there is a new enemy.",
    tags: ["allotment diary", "marigolds", "June", "heatwave"],
    sections: [
      {
        type: "heading",
        content: "2024: Slugmageddon",
      },
      {
        type: "text",
        content:
          "The year before last was a bad one for slugs. Really bad. So many newly planted things got wiped out that I started thinking of it as Slugmageddon. Plug plants that had been fine on one visit were gone by the next.\n\nThe solution I landed on was metal rods bent into mini frames over the beds, with netting draped over them. Slug pellets underneath — which the netting kept the birds from getting to — and for the most vulnerable plants, individual plastic cloches to give them a chance to establish before the slugs found them.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/allotment-netting-cloches-2024.webp",
        alt: "A UK allotment at sunset showing multiple beds — one with white plastic cloches protecting young plants, another with green netting draped over it, a metal arch in the background",
        caption:
          "2024. Cloches on one bed, netting on the next, slug pellets underneath both. Not pretty, but it worked.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/marigold-cloche-slug-pellets-2024.webp",
        alt: "A plastic cloche covered in condensation protecting a young plant in allotment soil, blue slug pellets visible around it, netting frame visible in the background at dusk",
        caption:
          "The close-up version. Blue slug pellets inside the netting, cloche over the most vulnerable plants. A lot of effort for something that should just go in the ground.",
      },
      {
        type: "text",
        content:
          "The cloches were imperfect — I could not always get to the allotment as often as I wanted to, and a closed cloche in warm weather will cook a plant just as surely as no water will. So I used them sparingly, for the first week or two after planting, then removed them once things were established enough to hold their own.",
      },
      {
        type: "heading",
        content: "2025: The same timing, a different year",
      },
      {
        type: "text",
        content:
          "Last year I planted marigolds out in April, same as always. The netting frames went up, the slug pellets went down, and the weather that spring was ordinary — mild, some rain, nothing extreme. By summer, every bed had a dense continuous border of orange. The whole plot looked like it was on fire.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/marigold-border-netting-2025.webp",
        alt: "A raised allotment bed with a dense orange marigold border all the way around, a metal netting frame over the bed protecting the plants inside",
        caption:
          "2025, early summer. The marigolds are in, the netting is up. It worked.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/marigold-nasturtium-arch-2025.webp",
        alt: "Nasturtiums in full flower in the foreground of a raised bed, with a dense orange marigold border visible behind, a metal arch frame overhead",
        caption:
          "Midsummer 2025. Nasturtiums in the foreground, marigolds all round the back bed. The nasturtiums draw the blackfly onto themselves and away from everything else.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/marigold-lettuce-midsummer-2025.webp",
        alt: "Butterhead lettuce heads growing inside a raised bed completely surrounded by enormous orange French marigolds in full bloom",
        caption:
          "This is what it looks like by midsummer when the planting works. The marigolds have grown to dwarf the lettuce. Every allotment holder who walked past stopped to comment.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/marigold-borders-full-2025.webp",
        alt: "Multiple raised allotment beds all lined with dense orange marigold borders photographed at golden hour, the whole plot glowing",
        caption:
          "2025 at peak. Every bed, every border, orange all the way round. This is what I was trying to get back to.",
      },
      {
        type: "heading",
        content: "2026: What I found when I got back",
      },
      {
        type: "text",
        content:
          "I planted marigold and yellow calendula plugs out in April, along the edges of the raised beds. Dense borders, the same as last year, when the whole thing looked brilliant by July. Two days after planting, we had a run of hot days — genuinely unusual for April. I could not get to the allotment to water. When I finally went back, every single one had gone.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/marigold-fried-single-plant.webp",
        alt: "A single fried marigold plug with dried red stems and shrivelled foliage in allotment soil, backlit by low evening sun",
        caption:
          "This is what I came back to. The stems had turned red and the leaves had curled in on themselves. There was nothing to save.",
      },
      {
        type: "text",
        content:
          "Up close, the damage was worse. The stems had gone red and brittle, the foliage had crisped up and pulled inward. Some still had a little orange colour left in the flower buds — just enough to make it sadder. I planted at almost exactly the same time last year and they thrived. But last year was a normal April. This year the heat came early and the roots, which had never been outside, simply had nothing left to draw on.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/marigold-fried-close-up.webp",
        alt: "Close-up of fried marigold plugs along a raised bed edge, stems turned red and brittle, a little orange colour remaining in the dried flower buds",
        caption:
          "The detail of it. A little orange left in the buds — not enough.",
      },
      {
        type: "heading",
        content: "Ordering again",
      },
      {
        type: "text",
        content:
          "I pulled them all out, ordered more plugs, and waited. When they arrived, I did things differently. I watered the beds first. I planted in the evening. I watered each one in immediately after going in the ground, properly — not a sprinkle but a real soak at the base. And I checked the forecast before committing to anything.\n\nThe result is a border that is thinner than planned. I could not replace them all like-for-like and the gaps show. But they are alive, which is more than I can say for the first batch.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/marigold-border-allotment-evening.webp",
        alt: "A raised allotment bed from the side showing orange marigolds dotted along the border in evening light, with the allotment in the background",
        caption:
          "The second attempt, in evening light. Sparser than the plan. They are staying in.",
      },
      {
        type: "tip",
        content:
          "Plant plugs out in the evening, not the middle of the day. Water the bed first, plant into moist soil, water in thoroughly straight after. If it is going to be above 20°C for several days and you cannot water, wait.",
      },
      {
        type: "heading",
        content: "Everything else that went out",
      },
      {
        type: "text",
        content:
          "Tomatoes, cucumbers, courgettes, and sunflower seeds all went in around the same time. It is now another heatwave — June this year seems determined — so I am watering everything on every visit and hoping. The courgettes look settled already. Courgettes seem to shrug off almost anything. The tomatoes are upright against their canes. The cucumbers have their climbing frame and are beginning to reach for it.\n\nFrench marigold plugs are usually available from garden centres through June and July. The season is long enough to recover from a setback like this — marigolds flower from whenever they go in right through to the first frost, so a June replanting still gives you four months of border.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/courgette-marigold-bed-june.webp",
        alt: "Young courgette plants in a raised bed with orange marigolds visible along the border at the top of the frame",
        caption:
          "Courgettes and the second-attempt marigolds. By August this will look completely different.",
      },
    ],
    relatedCrops: ["marigolds", "courgettes", "tomatoes"],
  },
  {
    slug: "planting-potatoes-bulb-planter",
    title: "How I planted my new potatoes this year (and why I used a bulb planter)",
    description:
      "This year I used a bulb planter to put in my new potatoes — dug over with a fork, used the tool to make evenly spaced holes, popped them in and covered with compost. They are up and growing now. Here is how it went.",
    publishDate: new Date("2026-06-01"),
    keywords: [
      "planting potatoes UK allotment",
      "how to plant new potatoes",
      "bulb planter for potatoes",
      "earthing up potatoes UK",
      "new potatoes when to harvest UK",
      "planting potatoes raised bed",
      "growing new potatoes allotment",
    ],
    heroImage: "/photos/blog/potatoes-june-allotment.webp",
    heroAlt:
      "Rows of potato plants growing in an allotment bed, lush and green with dark rich soil around them",
    intro:
      "This year I used a bulb planter for the potatoes and it changed everything. Dug over, spaced out, popped in, covered with compost, watered well. They are up and growing now. I cannot wait for potato salad time.",
    tags: ["potatoes", "allotment diary", "June"],
    sections: [
      {
        type: "heading",
        content: "Digging over first",
      },
      {
        type: "text",
        content:
          "I dug the whole bed over with my big fork before anything went in. Potatoes need loose, well-worked soil — they need space to swell underground. I worked from one end, pushing the fork to its full depth, levering it forward, breaking up the clods as I went. This is also when I pulled out the bindweed roots. There were a lot of bindweed roots. There always are.",
      },
      {
        type: "pair",
        content: "",
        src: "/photos/blog/broadfork-clay-dig.webp",
        alt: "The broadfork resting on freshly broken clay at the allotment",
        caption: "Dug right over with the broadfork.",
        src2: "/photos/blog/sowing-drills-allotment-spring.webp",
        alt2: "An allotment bed with potatoes just planted, covered over with a row of dark compost, greenhouse behind",
        caption2: "Potatoes just in — popped into the holes and covered with compost.",
      },
      {
        type: "heading",
        content: "The bulb planter",
      },
      {
        type: "text",
        content:
          "The bulb planter is what made this year different. You push it into the soil and pull it back out and it leaves a neat, consistent hole. I marked out a grid across the whole bed first — all the holes at once, evenly spaced — then went back along each row, popped a potato in each one, and covered over with compost. Much faster than a trowel. Everything ended up properly spaced rather than slightly guessed.",
      },
      {
        type: "tip",
        content:
          "Space new potatoes about 30cm apart in rows 40–50cm apart. Mark your rows with canes first, then work along them with the planter.",
      },
      {
        type: "heading",
        content: "They popped up",
      },
      {
        type: "text",
        content:
          "The first shoots came through a couple of weeks later — tiny little things, easy to miss if you were not looking for them.",
      },
      {
        type: "pair",
        content: "",
        src: "/photos/blog/potato-shoots-emerging.webp",
        alt: "Tiny potato shoots just emerging from allotment soil",
        caption: "The first shoots — easy to walk past.",
        src2: "/photos/blog/potato-rows-growing.webp",
        alt2: "Rows of potato plants growing strongly with leafy green foliage",
        caption2: "A few weeks on — big and leafy.",
      },
      {
        type: "text",
        content:
          "Once they were through, I covered them over with more compost — earthing up. It keeps the developing tubers out of the light (light turns them green and inedible) and gives the plant more stem underground to produce from. I have done this once. The plants have pushed back through and are now big and leafy and taking up proper space.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/potatoes-june-allotment.webp",
        alt: "Rows of potato plants growing strongly in allotment soil, multiple rows visible from above with dark compost around the base of each plant",
        caption:
          "A few weeks on. This is a first early variety — July harvest.",
      },
      {
        type: "heading",
        content: "July",
      },
      {
        type: "text",
        content:
          "First earlies are ready roughly ten weeks after planting. The signal is flowers — once they start flowering, you can test by carefully digging down beside one plant and feeling for tubers. Egg-sized and they are ready.\n\nNew potatoes want to be small and waxy, boiled whole and eaten the same day. Still warm from the earth. I cannot wait for potato salad time.",
      },
      {
        type: "tip",
        content:
          "Do not leave first earlies in the ground too long — they keep growing and lose the waxy texture. Harvest little and often once they reach egg-size.",
      },
    ],
    relatedCrops: ["potatoes"],
    kit: ["bulb-planter", "gloves", "kneeler", "dibber", "labels"],
  },
  {
    slug: "dot-the-allotment-cat",
    title: "Meet Dot, the allotment cat",
    description:
      "There is a cat on my allotment site who turns up whenever I am watering. I call her Dot, or sometimes Baby. The best gardening companion I never asked for.",
    publishDate: new Date("2026-06-01"),
    keywords: [
      "allotment cat",
      "cats on allotments",
      "allotment wildlife",
      "allotment diary UK",
    ],
    heroImage: "/photos/blog/dot-planter-purple-flowers-allotment.webp",
    heroAlt:
      "A white and black cat sitting on a wooden planter covered in cascading purple flowers, the full allotment visible behind",
    intro:
      "There is a cat on my allotment site. She is white with black patches and she turns up every time I start watering. I call her Dot, or sometimes Baby, depending on what mood she is in.",
    tags: ["allotment diary", "wildlife"],
    sections: [
      {
        type: "text",
        content:
          "She is not my cat. I do not know whose cat she is. She lives somewhere on the site, or near it, and she is not looking for food — she is just a fun visitor. Within about five minutes of me arriving, she is there.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/dot-allotment-cat-closeup.webp",
        alt: "A white and black cat looking up at the camera through metal climbing frame bars at an allotment",
        caption:
          "Dot, arriving through the climbing frame as she always does.",
      },
      {
        type: "text",
        content:
          "She is the best gardening companion. Not much practical help, admittedly — she has settled in a freshly sown bed more than once, and she likes to walk across whatever I have just planted and look back as if I should be grateful. But she watches over us while we work, and the plot is better for having her in it.",
      },
      {
        type: "video",
        content: "",
        src: "/videos/blog/cat-squash-bed.mp4",
        poster: "/videos/blog/cat-squash-bed-poster.webp",
        alt: "The white cat sitting on the bed edge among squash seedlings and young sunflowers",
        caption: "Supervising the squash bed, May this year.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/dot-allotment-cat-seedlings.webp",
        alt: "A white cat flopped on her side in a raised allotment bed among small seedlings, completely relaxed",
        caption:
          "In the seedlings. Those are lettuce seedlings she is lying on. She was there for some time.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/dot-deck-allotment.webp",
        alt: "A white and black cat on a wooden decking area at an allotment, white metal garden furniture behind and the allotment stretching out in the distance",
        caption:
          "She treats the whole site as hers. She is not wrong.",
      },
      {
        type: "text",
        content:
          "There is something about an allotment cat. She is part of the plot now, in a way I cannot quite explain. She turns up, settles in the sun nearby, and watches over us while we get on with the watering and the weeding. Every visit is better for it.",
      },
      {
        type: "video",
        content: "",
        src: "/videos/blog/fox-crossing.mp4",
        poster: "/videos/blog/fox-crossing-poster.webp",
        alt: "A fox trotting along the raised beds in broad daylight",
        caption: "She is also not the only one who treats the place as hers. A fox, late one April afternoon, inspecting the beds.",
      },
    ],
    relatedCrops: [],
  },
  {
    slug: "june-allotment-diary-2026",
    title: "June on the allotment: what is in the ground right now",
    description:
      "Everything is out. Tomatoes, cucumbers, courgettes, sunflowers, potatoes. The marigolds are in for the second time. The strawberries are losing the battle with the slugs. A full account of where the plot is at the start of June.",
    publishDate: new Date("2026-06-01"),
    keywords: [
      "allotment diary June UK",
      "what to plant June allotment",
      "June allotment jobs UK",
      "allotment June diary",
      "what is growing on allotment June",
      "UK allotment June",
      "allotment update June 2026",
    ],
    heroImage: "/photos/blog/allotment-plot-overview-june.webp",
    heroAlt:
      "Wide view of a UK allotment plot in early June showing multiple raised beds, a tarpaulin, and lush green growth",
    intro:
      "Everything has gone out. Tomatoes, cucumbers, courgettes, sunflower seeds, potatoes earthed up twice. The marigolds are in for the second time after the first batch fried in April. The strawberries are struggling. Here is where the plot is at the start of June.",
    tags: ["allotment diary", "June", "seasonal"],
    sections: [
      {
        type: "heading",
        content: "What is in the ground",
      },
      {
        type: "text",
        content:
          "Tomatoes went out last week, staked and in with compost worked into the planting hole. Cucumbers are on their climbing frame and starting to reach up. Courgettes are in a bed with good spacing — two plants, which is about the right number before you start drowning in courgettes. Sunflower seeds went in at the base of one of the beds; I am looking forward to those more than almost anything else.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/allotment-plot-overview-june.webp",
        alt: "Wide view of the allotment plot in early June showing raised beds with crops at various stages, a shed visible in the background",
        caption:
          "The plot at the start of June. The potatoes in the foreground are the most dramatic-looking thing right now.",
      },
      {
        type: "heading",
        content: "The potatoes",
      },
      {
        type: "text",
        content:
          "The potatoes are the most satisfying thing on the plot right now. They went in using a bulb planter — which I am a convert to — and they have come up well and been earthed up once. They are a first early variety and should be ready to harvest in July. I am looking forward to that more than I should probably admit.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/potato-rows-june-2026.webp",
        alt: "Three tidy rows of potato plants in full leaf, seen from above, allotment behind",
        caption: "The potato rows in full leaf — earthed up and romping away.",
      },
      {
        type: "heading",
        content: "The marigolds",
      },
      {
        type: "text",
        content:
          "The marigolds are in for the second time this season. The first batch went in during a hot April spell and fried when I could not get to the allotment to water for a couple of days. I ordered replacements, waited for them to arrive, and planted them out more carefully in the evening with a proper watering in. There are gaps in the border where the original planting was denser, but they are alive and that is what matters.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/marigold-border-evening-beds.webp",
        alt: "Raised allotment beds at evening with orange marigolds along the borders and courgette plants growing, golden light across the plot",
        caption:
          "The beds at evening. The marigolds are young but they are there.",
      },
      {
        type: "heading",
        content: "The strawberries",
      },
      {
        type: "text",
        content:
          "Not a great year for strawberries. The plants are there and flowering, but every ripe one I find has already been gotten to — by slugs rather than birds this time. I am finding them half-eaten on the soil rather than missing entirely. I need to get some slug deterrent down around the bed, but so far I have not quite got around to it.\n\nLast year the strawberries were the first real harvest of the season. This year I suspect I will be lucky to eat half of them myself.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/strawberry-ripe-decking.webp",
        alt: "A perfect ripe red strawberry hanging down from a plant growing in a wooden planter on decking, two more ripening behind it",
        caption:
          "Last year's strawberries. This is what I am hoping to get back to.",
      },
      {
        type: "heading",
        content: "The bindweed situation",
      },
      {
        type: "text",
        content:
          "Ongoing. I dug over the potato bed before planting and pulled out what felt like metres of bindweed root. It will be back. Bindweed is always back. The only thing that actually controls it is patience and persistence — pull every shoot the moment it appears, and over time you weaken the roots underground. I am several years into this process and it is very slowly working.",
      },
      {
        type: "heading",
        content: "What is flowering",
      },
      {
        type: "text",
        content:
          "Not much yet on the vegetable side, but there is a verbena on the site that has been flowering for weeks and is one of those plants you keep stopping to look at. Small purple flowers, dozens of them, on tall airy stems. It does not photograph badly either.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/verbena-flowering-allotment.webp",
        alt: "Close-up of small purple verbena flowers in full bloom at an allotment",
        caption:
          "Verbena. One of the best value flowering plants for an allotment — it goes on and on all summer.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/painted-lady-potato-leaf.webp",
        alt: "A painted lady butterfly with wings open, resting on a potato leaf",
        caption: "A painted lady on the potato leaves. It stayed exactly long enough for one photo.",
      },
      {
        type: "heading",
        content: "The month, start to finish",
      },
      {
        type: "text",
        content:
          "And because this is the time of year when everything happens at once, here is June in two photographs — the beds freshly planted at the start of the month, and the same plot filling out by the end of it.",
      },
      {
        type: "pair",
        content: "",
        src: "/photos/blog/beds-planted-early-june.webp",
        alt: "Raised beds freshly planted with young plants and marigold edges in early June, greenhouses beyond",
        caption: "5 June — just planted.",
        src2: "/photos/blog/companion-bed-full-2026.webp",
        alt2: "A raised bed full to the edges with a courgette, lettuces and a marigold border at the end of June",
        caption2: "29 June — full to the edges.",
      },
      {
        type: "tip",
        content:
          "Not sure what else to sow in June? Enter your postcode into the What To Sow tool — there is still time for a lot of things, including quick crops like salad, radishes, and French beans.",
      },
    ],
    relatedCrops: ["tomatoes", "cucumbers", "courgettes", "potatoes", "strawberries"],
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
      {
        type: "video",
        content: "",
        src: "/videos/blog/bee-soapwort.mp4",
        poster: "/videos/blog/bee-soapwort-poster.webp",
        alt: "A bumblebee working the pink Tumbling Ted flowers, moving bloom to bloom",
        caption: "The case for the defence: one of this April's regulars, working the flowers.",
      },
    ],
    relatedCrops: ["borage", "marigolds"],
  },

  // ─── Buying guides — higher-value kit (the commission multiplier) ───────────
  // Honest "what to look for + the options" guides for kit not personally owned;
  // no star ratings (we only rate what we use). Amazon search links by product
  // name so the link always finds the real, current product.
  {
    slug: "best-raised-beds-uk",
    title: "The best raised beds for a UK garden or allotment",
    description:
      "Best raised beds UK: how to choose between wooden, metal and tall raised planters, what depth and width actually matter, and the options worth your money — for vegetables, on any plot.",
    publishDate: new Date("2026-06-04"),
    keywords: [
      "best raised beds UK",
      "raised bed kits UK",
      "wooden raised beds",
      "metal raised beds UK",
      "raised garden beds for vegetables",
      "tall raised planter UK",
    ],
    heroImage: "/photos/blog/raised-bed-membrane-spring.webp",
    heroAlt: "A freshly built raised bed lined with membrane on a UK allotment in spring",
    intro:
      "A raised bed is the kindest way I know to start growing — warmer soil, better drainage, and far less bending. Here's how to choose one that'll still be standing in ten years, whatever your plot.",
    tags: ["buying guide", "raised beds"],
    sections: [
      {
        type: "text",
        content:
          "There's a reason nearly every allotment ends up with raised beds. The soil inside one warms faster in spring — by a few degrees, which is enough to sow two or three weeks earlier — it drains better after our endlessly wet winters, and it gives you a clean edge to work from so you're never standing on (and squashing) the ground your roots want to grow into. It's also simply gentler on your back, which matters more every season.",
      },
      {
        type: "text",
        content:
          "You can build one from scaffold boards for next to nothing, and if you're handy that's a lovely Saturday. But a good kit goes up in an afternoon, squares up properly at the corners, and saves you sourcing timber — so if you'd rather be growing than woodworking, here's what to look for.",
      },
      {
        type: "heading",
        content: "What to look for",
      },
      {
        type: "text",
        content:
          "Depth first. Aim for at least 20cm of soil — 30cm or more if you want to grow carrots, parsnips and other long roots, or if you're putting the bed on a hard surface. Width second: you should be able to reach the middle from either side without treading on the soil, so keep it to about 1.2m across (narrower if it's against a wall). Then material: untreated or naturally durable timber (cedar, larch, oak) for anything you'll eat from; FSC-certified if you can. Powder-coated steel and Corten ('rusted' weathering) beds last decades and look wonderful, but check the steel is food-safe. Tall planters that bring the soil up to waist height are a joy if bending is hard — just remember they need a lot of compost to fill and dry out faster, so they want more watering.",
      },
      {
        type: "heading",
        content: "The options worth considering",
      },
      {
        type: "table",
        content: "",
        rows: [
          { name: "Wooden raised bed kit", use: "The classic — warm, natural, easy to extend. Choose FSC/untreated for edibles", price: "~£40–120", url: "https://www.amazon.co.uk/s?k=wooden+raised+bed+kit+vegetables&tag=whattosow21-21" },
          { name: "Metal / Corten steel bed", use: "Long-lasting and handsome; warms fast. Check food-safe steel", price: "~£60–180", url: "https://www.amazon.co.uk/s?k=metal+raised+garden+bed&tag=whattosow21-21" },
          { name: "Tall raised planter (waist height)", use: "No bending at all — kindest on the back; needs more compost & water", price: "~£70–160", url: "https://www.amazon.co.uk/s?k=tall+raised+planter+vegetables&tag=whattosow21-21" },
          { name: "Modular / extendable bed", use: "Start small, add sections as the plot grows", price: "~£35–90", url: "https://www.amazon.co.uk/s?k=modular+raised+bed&tag=whattosow21-21" },
          { name: "Raised bed liner", use: "Lines timber to make it last and keeps soil off the wood", price: "~£10–20", url: "https://www.amazon.co.uk/s?k=raised+bed+liner&tag=whattosow21-21" },
        ],
      },
      {
        type: "tip",
        content:
          "Whatever you choose, the bed is only as good as what goes in it. Fill with a mix of topsoil and well-rotted compost rather than compost alone (pure compost sinks and dries out), and top up with an inch of fresh compost each spring — the no-dig way. A bed roughly 1.2m × 2.4m is the sweet spot: big enough to be worth it, small enough to reach.",
      },
      {
        type: "text",
        content:
          "Once it's built, the fun begins: gridding it up the square-foot way and tucking in good companions. I've written about both — they turn one tidy bed into a surprising amount of food.",
      },
      {
        type: "ownedSince",
        content: "",
        since: "spring 2022",
        images: [
          { src: "/photos/blog/beds-2022-built.webp", alt: "The first bed frames on the bare plot, 2022", caption: "Built 2022" },
          { src: "/photos/blog/plot-2024-marigold-beds.webp", alt: "The beds in their marigold year, 2024", caption: "2024" },
          { src: "/photos/blog/plot-2026-raised-beds.webp", alt: "The same timber, fully planted, 2026", caption: "Still standing, 2026" },
        ],
        note: "The same timber through five seasons of British weather — this page recommends nothing we haven't stood on, filled, and left out in the rain.",
      },
    ],
    relatedCrops: ["carrots", "beetroot", "lettuce", "radishes"],
  },
  {
    slug: "best-cold-frames-greenhouses-uk",
    title: "Cold frames & small greenhouses: how to extend your UK season",
    description:
      "Best cold frames and small greenhouses UK: how a little glass or polycarbonate buys you weeks at both ends of the season, what to look for, and the options for any size of plot or budget.",
    publishDate: new Date("2026-06-04"),
    keywords: [
      "best cold frame UK",
      "small greenhouse UK",
      "mini greenhouse for seedlings",
      "polycarbonate greenhouse",
      "cold frame for hardening off",
      "extend growing season UK",
    ],
    heroImage: "/photos/blog/allotment-netting-cloches-2024.webp",
    heroAlt: "Cloches and netting protecting young plants on a UK allotment",
    intro:
      "A little glass changes everything. A cold frame or small greenhouse buys you weeks at both ends of the season — earlier sowings, somewhere to harden off, and a snug spot for tender things when the nights turn. Here's how to choose.",
    tags: ["buying guide", "season extension"],
    sections: [
      {
        type: "text",
        content:
          "Our growing season is short and our springs are fickle. A cold frame or small greenhouse is the cheapest way to stretch it: a few degrees of warmth and shelter from wind and battering rain lets you sow earlier, harden seedlings off gently before they go out, and keep picking salad well into the cold. Autumn is the clever time to buy one — you'll want it ready for next spring, and it earns its keep overwintering hardy crops too.",
      },
      {
        type: "text",
        content:
          "Start with the smallest thing that solves your problem. If you just need somewhere to harden off and protect a tray or two, a cold frame or a little walk-in 'grow house' does the job for very little. If you want to grow tomatoes under cover and potter in the dry, that's when a proper greenhouse earns its space.",
      },
      {
        type: "heading",
        content: "What to look for",
      },
      {
        type: "text",
        content:
          "Glazing: toughened glass is clearest and lasts longest but costs more and can break; twin-wall polycarbonate is lighter, safer near children, insulates better and won't shatter — my pick for an allotment, where the wind likes to test things. Frame: aluminium is light and rust-free; treated timber is warmer to look at and easier to fix shelves to. Ventilation matters more than people think — look for an opening roof vent or louvre, because an unventilated greenhouse cooks in June. And whatever you buy, anchor it: an allotment greenhouse that isn't bolted or pegged down will eventually go for a walk in a gale.",
      },
      {
        type: "heading",
        content: "The options worth considering",
      },
      {
        type: "table",
        content: "",
        rows: [
          { name: "Wooden cold frame", use: "Hardening off & early sowings; tidy and long-lived", price: "~£40–110", url: "https://www.amazon.co.uk/s?k=wooden+cold+frame&tag=whattosow21-21" },
          { name: "Walk-in 'grow house' (PE cover)", use: "Cheapest cover for trays & pots; replace the cover every few years", price: "~£25–70", url: "https://www.amazon.co.uk/s?k=walk+in+greenhouse+grow+house&tag=whattosow21-21" },
          { name: "Mini lean-to greenhouse", use: "Tight spaces and balconies; sits against a wall", price: "~£40–100", url: "https://www.amazon.co.uk/s?k=mini+lean+to+greenhouse&tag=whattosow21-21" },
          { name: "Polycarbonate greenhouse (4×6)", use: "Wind-tough, safe, insulating — best all-rounder for a plot", price: "~£200–450", url: "https://www.amazon.co.uk/s?k=polycarbonate+greenhouse+4x6&tag=whattosow21-21" },
          { name: "Aluminium & glass greenhouse", use: "The clearest light and the dream potting shed", price: "~£350–900", url: "https://www.amazon.co.uk/s?k=aluminium+glass+greenhouse&tag=whattosow21-21" },
        ],
      },
      {
        type: "tip",
        content:
          "Add a max-min thermometer and some fleece from day one. The thermometer tells you how warm it really gets (you'll be surprised), and on a frosty night a layer of fleece inside the frame adds a few precious degrees. In high summer, paint on some shade or drape mesh — under glass, scorch happens fast.",
      },
      {
        type: "text",
        content:
          "Pair it with a heated propagator for the earliest sowings and you've got a proper little production line from January onwards — there's a guide to those below.",
      },
      {
        type: "ownedSince",
        content: "",
        since: "2024",
        images: [
          { src: "/photos/blog/cloche-2024-strawberries.webp", alt: "Strawberries ripening under the bell cloche, 2024", caption: "2024" },
          { src: "/photos/guides/cloche-dome-beaded.webp", alt: "The same cloche beaded with water at sunset, 2025", caption: "2025" },
        ],
        note: "The bell cloche has earned its keep two springs running — cheap protection that keeps working.",
      },
    ],
    relatedCrops: ["tomatoes", "peppers", "chillies", "cucumbers"],
  },
  {
    slug: "best-water-butts-uk",
    title: "The best water butts for a UK garden or allotment",
    description:
      "Best water butts UK: what size you really need, how to set one up for good flow, and the options from slimline garden butts to big allotment tanks — so you're never caught out by a dry spell or a hosepipe ban.",
    publishDate: new Date("2026-06-04"),
    keywords: [
      "best water butt UK",
      "water butt with stand",
      "slimline water butt",
      "allotment water storage",
      "rainwater harvesting garden",
      "water butt hosepipe ban",
    ],
    heroImage: "/photos/guides/watering-strawberry-bed.webp",
    heroAlt: "Watering a strawberry bed on a UK allotment",
    intro:
      "Rain is free, and plants prefer it to tap water. A water butt (or three) keeps you growing through the dry weeks and the hosepipe bans — here's how to size and set one up so it actually delivers.",
    tags: ["buying guide", "watering"],
    sections: [
      {
        type: "text",
        content:
          "We get plenty of rain in this country — just rarely when we want it. A water butt banks the winter and spring downpours for the dry fortnight in July when the seedlings are gasping and a hosepipe ban has just been announced. Rainwater is better for plants too: soft, room-temperature and free of the chlorine that tap water carries.",
      },
      {
        type: "text",
        content:
          "The single most common mistake is going too small. A 100-litre slimline butt looks generous until a hot week empties it in days. If you've the room, more storage is always the right answer — link two butts together and you've a proper reserve.",
      },
      {
        type: "heading",
        content: "What to look for",
      },
      {
        type: "text",
        content:
          "Capacity: treat 200 litres as a sensible minimum for a garden; on an allotment, the biggest tank you can fill. A diverter kit that taps into a downpipe (house, shed or greenhouse) fills the butt far faster than rain falling in the top, and sends the overflow back down the drain. Height matters for flow — stand the butt up on blocks or a proper stand so you can get a watering can under the tap and let gravity do the work. A lid is non-negotiable: it keeps out leaves, mosquito larvae and curious wildlife (and small children). On an allotment with no roof to harvest from, a big freestanding tank with a rain-catching lid does the job.",
      },
      {
        type: "heading",
        content: "The options worth considering",
      },
      {
        type: "table",
        content: "",
        rows: [
          { name: "Slimline water butt (100–150L)", use: "Tight spots and side returns; expect to top up in a dry spell", price: "~£30–55", url: "https://www.amazon.co.uk/s?k=slimline+water+butt&tag=whattosow21-21" },
          { name: "Standard butt + stand (200–250L)", use: "The sensible default — get the stand for can-height flow", price: "~£40–80", url: "https://www.amazon.co.uk/s?k=water+butt+200+litre+with+stand&tag=whattosow21-21" },
          { name: "Downpipe diverter kit", use: "Fills the butt far faster from a roof; overflow-safe", price: "~£10–20", url: "https://www.amazon.co.uk/s?k=water+butt+rain+diverter+kit&tag=whattosow21-21" },
          { name: "Large allotment tank (500L+)", use: "Serious storage for a thirsty plot", price: "~£90–200", url: "https://www.amazon.co.uk/s?k=large+water+butt+500+litre&tag=whattosow21-21" },
          { name: "Linking kit (connect two butts)", use: "Double your reserve when one fills", price: "~£8–15", url: "https://www.amazon.co.uk/s?k=water+butt+linking+kit&tag=whattosow21-21" },
        ],
      },
      {
        type: "tip",
        content:
          "Set it up where you'll actually use it — beside the beds you water most, not the far corner. And once it's flowing, water at the roots in the cool of the evening with a long lance rather than sprinkling the leaves; you'll lose far less to evaporation and the plants will thank you for it.",
      },
      {
        type: "text",
        content:
          "For how and when to water once you've banked the rain, there's a full watering guide below — including the watering lance that turned the job from a chore into a pleasure.",
      },
      {
        type: "ownedSince",
        content: "",
        since: "2022",
        images: [
          { src: "/photos/blog/water-butt-2022.webp", alt: "The first blue water butt by the shed, 2022", caption: "2022" },
          { src: "/photos/blog/water-butt-2025.webp", alt: "The greenhouse water butt at dusk, 2025", caption: "2025" },
        ],
        note: "Ours have been out in every frost since 2022. A good butt is a one-time buy.",
      },
    ],
    relatedCrops: ["tomatoes", "courgettes", "runner-beans", "cucumbers"],
  },
  {
    slug: "best-compost-bins-uk",
    title: "The best compost bins for a UK garden or allotment",
    description:
      "Best compost bins UK: dalek bins, hot composters, tumblers and wormeries compared — which suits your space and patience, what to look for, and how to turn kitchen and plot waste into free soil.",
    publishDate: new Date("2026-06-04"),
    keywords: [
      "best compost bin UK",
      "hot composter UK",
      "compost tumbler",
      "wormery UK",
      "dalek compost bin",
      "home composting beginners",
    ],
    heroImage: "/photos/guides/allotment-fresh-beds.webp",
    heroAlt: "Freshly composted and prepared allotment beds",
    intro:
      "Compost is the closest thing to free that growing offers — your peelings and prunings turned into the best soil improver there is. Here's how to choose the bin that suits your space, your patience and your back.",
    tags: ["buying guide", "composting"],
    sections: [
      {
        type: "text",
        content:
          "Every plot makes the raw materials for next year's harvest: grass, weeds, spent plants, cardboard, and a steady stream of kitchen peelings. A compost bin turns that pile of 'waste' into dark, sweet-smelling crumb that feeds your beds for nothing. Once you're making your own, you stop buying bags of it — and your soil gets better every single year.",
      },
      {
        type: "text",
        content:
          "The right bin depends on how quickly you want results and how much you'll turn it. A cheap 'dalek' bin and a bit of patience makes lovely compost in a year. A hot bin or tumbler makes it in weeks, but costs more and likes a bit of attention. A wormery suits a small garden or balcony and gives you a brilliant liquid feed as a bonus.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/guides/compost-bay.webp",
        alt: "A home-made pallet compost bay at the allotment, half full of garden waste",
        caption: "Ours is the \u00a30 option \u2014 a bay knocked together from pallets. Slower than a sealed bin, but it swallows everything the plot produces.",
      },
      {
        type: "heading",
        content: "What to look for",
      },
      {
        type: "text",
        content:
          "Capacity: bigger composts faster (more mass holds more heat), so go as large as your space allows — two bins beat one, so you can fill one while the other finishes. A good lid keeps the rain off and the warmth in. For 'dalek' bins, check there's a hatch at the base to dig out the finished stuff. Hot bins want decent insulation; tumblers want a sturdy frame and an easy turning action (the cheap ones can be a wrestling match when full). For a wormery, look for a tap to draw off the liquid feed. Whatever you choose, the secret is the same: roughly half 'greens' (peelings, grass, soft growth) to half 'browns' (cardboard, dead leaves, woody bits), kept damp, and turned now and then.",
      },
      {
        type: "heading",
        content: "The options worth considering",
      },
      {
        type: "table",
        content: "",
        rows: [
          { name: "'Dalek' cold compost bin", use: "Cheap, simple, reliable — compost in about a year", price: "~£25–50", url: "https://www.amazon.co.uk/s?k=compost+bin+dalek&tag=whattosow21-21" },
          { name: "Hot composter (insulated)", use: "Finished compost in weeks; handles cooked food & weeds", price: "~£120–220", url: "https://www.amazon.co.uk/s?k=hot+composter+insulated&tag=whattosow21-21" },
          { name: "Compost tumbler", use: "Easy turning, faster results, rat-resistant — good for gardens", price: "~£60–140", url: "https://www.amazon.co.uk/s?k=compost+tumbler&tag=whattosow21-21" },
          { name: "Wormery", use: "Small spaces; brilliant liquid feed and worm castings", price: "~£60–120", url: "https://www.amazon.co.uk/s?k=wormery+composting&tag=whattosow21-21" },
          { name: "Bokashi kit (kitchen)", use: "Ferments all food waste indoors to add to a bin later", price: "~£30–60", url: "https://www.amazon.co.uk/s?k=bokashi+composting+kit&tag=whattosow21-21" },
        ],
      },
      {
        type: "tip",
        content:
          "If you only do one thing, get the greens-to-browns balance right: a bin that's all grass clippings goes to slime, and one that's all cardboard just sits there. Keep a stash of torn-up cardboard next to the bin and add a layer every time you tip in the kitchen caddy. Damp as a wrung-out sponge is the texture you're after.",
      },
      {
        type: "text",
        content:
          "There's a fuller composting guide below if you want to go deeper — and a no-dig approach that puts all that lovely compost straight to work.",
      },
    ],
    relatedCrops: [],
  },
  {
    slug: "best-heated-propagators-grow-lights-uk",
    title: "Heated propagators & grow lights: starting seeds early in the UK",
    description:
      "Best heated propagators and grow lights UK: how to germinate chillies, tomatoes and more weeks ahead on a dim windowsill, what wattage and warmth you need, and the options for every budget.",
    publishDate: new Date("2026-06-04"),
    keywords: [
      "best heated propagator UK",
      "grow lights for seedlings UK",
      "seed starting indoors",
      "propagator with thermostat",
      "LED grow light seedlings",
      "start chillies early",
    ],
    heroImage: "/photos/blog/tomato-seedlings-pots.webp",
    heroAlt: "Young tomato seedlings in pots started indoors",
    intro:
      "The crops that need the longest season — chillies, peppers, aubergines, tomatoes — want starting when the windowsill is still dim and cold. A heated propagator and a grow light give them the warmth and bright light they're missing. Here's what to look for.",
    tags: ["buying guide", "seed starting"],
    sections: [
      {
        type: "text",
        content:
          "January and February are when the long-season crops should be going in — and they're exactly the weeks our windowsills can't deliver. Seeds want gentle, steady warmth from below to germinate; seedlings then want bright light from above or they stretch into pale, leggy things reaching for a sun that isn't there. A heated propagator solves the first problem, a grow light the second. Together they're the difference between a sturdy plant by April and a disappointment.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/windowsill-seedlings-cardboard.webp",
        alt: "Seedlings in mixed pots boxed in with cardboard on a windowsill",
        caption: "Our windowsill era, spring 2023 \u2014 cardboard boxing to bounce the light back at the seedlings. It works, just about. This is the era a propagator and a small light bring to an end.",
      },
      {
        type: "text",
        content:
          "You don't need a fancy setup. A simple heated mat or a windowsill propagator gets most things going; add a small LED grow light once they're up and you've fixed the leggy-seedling problem that defeats so many people in spring.",
      },
      {
        type: "heading",
        content: "What to look for",
      },
      {
        type: "text",
        content:
          "Propagators: the cheapest are unheated 'windowsill' trays with a clear lid — fine for spring sowings in a warm room. Heated versions add gentle bottom warmth; the best have a thermostat so you can hold a steady temperature (around 18–21°C suits most seeds) rather than cooking them. Match the size to your windowsill. Grow lights: look for 'full spectrum' LEDs — efficient, cool-running and cheap to leave on. A clip-on or adjustable-height light is ideal, kept just a few inches above the seedlings and run about 12–16 hours a day (a plug timer makes that effortless). Ignore the wild lumen claims and judge by the size of area it's meant to cover.",
      },
      {
        type: "heading",
        content: "The options worth considering",
      },
      {
        type: "table",
        content: "",
        rows: [
          { name: "Windowsill propagator (unheated)", use: "Spring sowings in a warm room — cheapest start", price: "~£8–20", url: "https://www.amazon.co.uk/s?k=windowsill+propagator&tag=whattosow21-21" },
          { name: "Heated propagator (thermostat)", use: "Early chillies, peppers & tomatoes; steady gentle warmth", price: "~£30–80", url: "https://www.amazon.co.uk/s?k=heated+propagator+thermostat&tag=whattosow21-21" },
          { name: "Heat mat", use: "Warm any tray from below; pairs with your own pots", price: "~£15–35", url: "https://www.amazon.co.uk/s?k=seedling+heat+mat&tag=whattosow21-21" },
          { name: "LED grow light (clip / adjustable)", use: "Stops seedlings going leggy on a dim sill", price: "~£20–60", url: "https://www.amazon.co.uk/s?k=full+spectrum+led+grow+light+seedlings&tag=whattosow21-21" },
          { name: "Grow light shelf / tent", use: "Raising lots of seedlings indoors at once", price: "~£60–150", url: "https://www.amazon.co.uk/s?k=grow+light+shelf+seed+starting&tag=whattosow21-21" },
        ],
      },
      {
        type: "tip",
        content:
          "Put the grow light on a cheap plug timer (12–16 hours) so you can't forget it, and keep it close — a couple of inches above the leaves, raised as they grow. Bottom warmth gets seeds up; bright light close overhead keeps them stocky. That's the whole secret.",
      },
      {
        type: "text",
        content:
          "Once they're up and growing, there's a full seed-starting guide and a kit list below — and a cold frame is the natural next step for hardening them off before they go out.",
      },
    ],
    relatedCrops: ["chillies", "peppers", "tomatoes", "aubergine"],
  },
  {
    slug: "best-polytunnels-uk",
    title: "Polytunnels for an allotment: are they worth it, and what to look for",
    description:
      "Best polytunnels UK: how a polytunnel transforms what you can grow, what size and cover to choose, anchoring against the wind, and the options from pop-up tunnels to walk-in frames.",
    publishDate: new Date("2026-06-04"),
    keywords: [
      "best polytunnel UK",
      "polytunnel for allotment",
      "walk in polytunnel",
      "small polytunnel garden",
      "polytunnel vs greenhouse",
      "grow vegetables under cover",
    ],
    heroImage: "/photos/blog/plot-full-summer.webp",
    heroAlt: "A full, productive allotment plot in high summer",
    intro:
      "A polytunnel is the most growing space you can buy per pound — a long, light-filled room that lets you start earlier, crop later, and grow things our summers can't quite manage outdoors. Here's whether it's worth it, and how to choose one.",
    tags: ["buying guide", "season extension"],
    sections: [
      {
        type: "text",
        content:
          "If a greenhouse is a jewel box, a polytunnel is a workhorse: far cheaper for the space, quick to put up, and big enough to walk into and grow proper rows under cover. It buys you weeks at both ends of the season, shrugs off the worst of the weather, and finally makes outdoor tomatoes, aubergines and melons a realistic prospect in a cool British summer. For an allotment, pound for pound, nothing else gives you as much.",
      },
      {
        type: "text",
        content:
          "The trade-offs are honest ones. The cover (the polythene 'skin') needs replacing every five years or so. It needs good ventilation or it bakes. And it absolutely must be anchored properly, because a tunnel that catches the wind wrongly can be destroyed in a single gale. Get those three things right and it'll repay you for years.",
      },
      {
        type: "heading",
        content: "What to look for",
      },
      {
        type: "text",
        content:
          "Frame: thicker steel tubing stands up to wind far better than the flimsy poles on the cheapest pop-ups — worth paying for if it's staying up year-round. Cover: look for UV-stabilised, anti-drip ('anti-fog') polythene, which lasts longer and stops cold drips falling on your plants. Doors at both ends give you the cross-flow ventilation that stops it overheating; roll-up sides are better still. Size: taller and wider than you think — you want headroom to work and a path down the middle. And anchoring: ground anchors or a base rail, plus burying or trenching the cover edge, is what keeps the whole thing earthbound.",
      },
      {
        type: "heading",
        content: "The options worth considering",
      },
      {
        type: "table",
        content: "",
        rows: [
          { name: "Pop-up / small grow tunnel", use: "Beds & low rows; cheapest cover — not for exposed sites", price: "~£20–60", url: "https://www.amazon.co.uk/s?k=garden+polytunnel+grow+tunnel&tag=whattosow21-21" },
          { name: "Walk-in polytunnel (small, ~2×3m)", use: "A proper room to grow in on a modest plot", price: "~£70–160", url: "https://www.amazon.co.uk/s?k=walk+in+polytunnel&tag=whattosow21-21" },
          { name: "Heavy-duty allotment tunnel", use: "Year-round, wind-tough steel frame with proper doors", price: "~£200–600", url: "https://www.amazon.co.uk/s?k=heavy+duty+polytunnel+allotment&tag=whattosow21-21" },
          { name: "Replacement cover (anti-drip)", use: "Renew the skin every ~5 years; UV-stabilised", price: "~£30–90", url: "https://www.amazon.co.uk/s?k=polytunnel+cover+replacement&tag=whattosow21-21" },
          { name: "Ground anchor kit", use: "What keeps it earthbound in a gale — don't skip it", price: "~£15–40", url: "https://www.amazon.co.uk/s?k=polytunnel+ground+anchor+kit&tag=whattosow21-21" },
        ],
      },
      {
        type: "tip",
        content:
          "Site it running roughly north–south for even light, on the least windy spot you have, with the doors facing away from the prevailing wind. Open it up on warm mornings and close it by evening — a tunnel can swing from frosty to tropical in a day, and ventilation is what keeps your plants (and you) happy.",
      },
      {
        type: "text",
        content:
          "Not ready for a tunnel? A cold frame or small greenhouse gives you a gentler, cheaper way into season extension — there's a guide to those below.",
      },
    ],
    relatedCrops: ["tomatoes", "aubergine", "cucumbers", "peppers"],
  },
  {
    slug: "planting-sweetcorn-dry-soil-bulb-planter",
    title: "How I planted out sweetcorn into bone-dry soil",
    description:
      "June baked my soil solid, so the corn went out with a trick borrowed from my potatoes: a bulb planter, a tape measure, and each hole filled with fresh compost. Late, honest, and working better than it has any right to.",
    publishDate: new Date("2026-07-06"),
    keywords: [
      "planting out sweetcorn UK",
      "planting sweetcorn late",
      "planting in dry soil",
      "bulb planter uses",
      "sweetcorn plugs planting out",
      "sweetcorn block planting",
    ],
    heroImage: "/photos/blog/sweetcorn-planting-bed-wide.webp",
    heroAlt: "The allotment on planting day — netted beds, marigolds, and the corn bed waiting under a bright sky",
    intro:
      "June was so hot that most jobs simply didn't happen, and my sweetcorn plugs sat waiting while the ground baked solid. They're in now — late, but in — thanks to a trick I first used on the potatoes: don't fight the dry soil, plant into pockets of fresh compost instead.",
    tags: ["allotment diary", "sweetcorn", "how I do it"],
    sections: [
      {
        type: "text",
        content:
          "By the time the heat broke, my soil had set like a biscuit. You know the kind — a trowel bounces off it, and any hole you do manage crumbles in on itself in dust. Planting tender young plugs into that felt like a good way to lose them, and after the slugs had already had my sunflowers this year, I wasn't in the mood to lose anything else.\n\nSo the corn went in the way my potatoes did back in spring, and it's worked so well I'll be doing it this way from now on.",
      },
      {
        type: "heading",
        content: "The bulb planter trick",
      },
      {
        type: "text",
        content:
          "It's very simple. I run my tape measure along the bed and use the bulb planter to pop out a neat hole at each mark — about 35 to 40 centimetres apart, in a block rather than a row, because sweetcorn is pollinated by the wind and wants neighbours on every side.\n\nThen each hole gets filled with fresh compost, the corn plug goes into that, and everything gets watered in well. That's the whole method.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/sweetcorn-holes-tape-measure.webp",
        alt: "A bed of neat bulb-planter holes with a tape measure laid out and a tray of sweetcorn plugs waiting",
        caption: "The bulb planter pops out a neat hole at every mark — the tape measure keeps the block honest.",
      },
      {
        type: "text",
        content:
          "The reason it works: the roots start life in soft compost that actually holds water, instead of fighting soil that's set hard around them. The watering goes exactly where it's needed too — each compost pocket soaks it up like a sponge while the dry ground around it would just shrug it off. In a dry summer it's the difference between a plug that establishes and a plug that sulks.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/sweetcorn-plugs-planted.webp",
        alt: "Young sweetcorn plugs planted out in a block across the bed",
        caption: "The block, planted. Corn wants neighbours on every side, never a single line.",
      },
      {
        type: "tip",
        content:
          "Sweetcorn always goes in a block, never a single row. The pollen falls from the tassels at the top onto the silks below, carried by the wind — in a block every plant catches its neighbours' pollen, and you get full cobs instead of gappy ones.",
      },
      {
        type: "image",
        content: "",
        src: "/photos/blog/sweetcorn-watering-in.webp",
        alt: "Watering in the newly planted sweetcorn with a long lance, spray falling over the young plants",
        caption: "Watered in well — each compost pocket takes the water straight down to the roots.",
      },
      {
        type: "heading",
        content: "The same trick, underground",
      },
      {
        type: "text",
        content:
          "I planted my potatoes exactly this way earlier in the year — bulb planter, compost in the hole, seed potato into the compost. The difference is that potatoes disappear under the ridge, so you never get to see whether they're pleased about it.\n\nThe corn, you can watch. And just days after going in, it visibly perked up — greener, straighter, clearly happier than it had any right to be after sitting in plugs through a heatwave. There's something quietly wonderful about a plant telling you, in plain sight, that you did the right thing.",
      },
      {
        type: "text",
        content:
          "I won't pretend the timing isn't tight — corn planted this late is asking a lot of the back end of the season, and I'll need September to stay warm to see full cobs. But the plants are in, they're growing, and watching sweetcorn get taller by the week is one of the best shows on the plot. If the autumn is kind, we'll be eating cobs minutes after picking them — and if it isn't, the trick still earned its keep, and next year's corn goes in earlier. Into compost pockets, of course.",
      },
      {
        type: "text",
        content:
          "And in case you are wondering whether sweetcorn is worth all this fuss — here is last summer's answer, in two parts.",
      },
      {
        type: "video",
        content: "",
        src: "/videos/blog/corn-husk-reveal.mp4",
        poster: "/videos/blog/corn-husk-reveal-poster.webp",
        alt: "A hand peeling the husk back from a pale corn cob among the sunflowers",
        caption: "The reveal — husked on the spot, among the sunflowers.",
      },
      {
        type: "video",
        content: "",
        src: "/videos/blog/buttered-corn.mp4",
        poster: "/videos/blog/buttered-corn-poster.webp",
        alt: "A buttered corn on the cob on a plate with char marks and salt",
        caption: "And the next day. Boiled within the hour, buttered without restraint.",
      },
    ],
    relatedCrops: ["sweetcorn", "maincrop-potatoes", "courgettes"],
    kit: ["bulb-planter", "watering-lance"],
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
