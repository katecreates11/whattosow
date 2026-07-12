import type { Metadata } from "next";
import { getWeatherState } from "@/lib/weather-intelligence";
import { conditionsFrom, guideScore, whyNow } from "@/lib/guide-relevance";

export const revalidate = 3600; // the page re-tunes itself to the weather every hour
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GearPick, { AffiliateDisclosure } from "@/components/GearPick";

const TAG = "whattosow21-21";
const az = (asin: string) => `https://www.amazon.co.uk/dp/${asin}?tag=${TAG}`;

// editorial photo per guide (topic-matched), with a gentle fallback
const GUIDE_IMG: Record<string, string> = {
  "/guides/beginners": "/photos/guides/allotment-overview-june.webp",
  "/guides/seed-starting": "/photos/guides/seed-starting-windowsill.webp",
  "/guides/soil": "/photos/guides/freshly-prepared-allotment-bed.webp",
  "/guides/seed-starting-kit": "/photos/guides/seed-starting-courgette-seedling.webp",
  "/guides/allotment-essentials": "/photos/guides/wheelbarrow-tools.webp",
  "/guides/composting": "/photos/guides/compost-bay.webp",
  "/guides/growing-fruit": "/photos/crops/strawberry-harvest-punnet.webp",
  "/guides/companion-planting": "/photos/guides/companion-planting-marigold-lettuce.webp",
  "/guides/crop-rotation": "/photos/guides/allotment-fresh-beds.webp",
  "/guides/green-manures": "/photos/guides/bed-compost-mulch.webp",
  "/guides/sun-mapping": "/photos/guides/allotment-sunset-rays.webp",
  "/guides/watering": "/photos/blog/watering-lance-golden-hour-spray.webp",
  "/guides/pests": "/photos/blog/allotment-netting-cloches-2024.webp",
  "/guides/tomato-blight": "/photos/crops/tomatoes-cherry-on-vine.webp",
  "/guides/spring-vegetables": "/photos/guides/spring-flowers-planter-allotment.webp",
  "/guides/autumn-winter-vegetables": "/photos/blog/plot-late-summer.webp",
  "/guides/what-to-sow-in-summer-uk": "/photos/guides/summer-golden-path.webp",
  "/guides/succession-sowing": "/photos/guides/salad-leaves-hand.webp",
  "/guides/growing-brassicas": "/photos/guides/brassicas-netted.webp",
  "/guides/growing-tomatoes-outdoors-vs-greenhouse": "/photos/guides/tomato-truss-ripening.webp",
  "/guides/growing-onions-garlic-leeks": "/photos/guides/garlic-scapes-hand.webp",
  "/guides/growing-winter-salad-leaves": "/photos/guides/lettuce-marigold-ring.webp",
  "/guides/preparing-your-plot-for-winter": "/photos/guides/plot-autumn-marigolds.webp",
  "/guides/protecting-vegetables-from-frost": "/photos/guides/cloche-dome-beaded.webp",
  "/guides/overwintering-broad-beans-and-peas": "/photos/guides/peas-pods-heavy.webp",
  "/guides/growing-root-vegetables": "/photos/guides/carrot-crate.webp",
  "/guides/growing-squash-pumpkins-courgettes": "/photos/guides/pumpkin-backlit.webp",
  "/guides/growing-veg-in-containers": "/photos/guides/strawberry-pots.webp",
  "/guides/companion-planting-chart": "/photos/guides/companion-bed-overhead.webp",
  "/guides/watering-while-away": "/photos/guides/sprinkler-watering.webp",
  "/guides/dealing-with-the-glut": "/photos/guides/harvest-glut-boxes.webp",
};
const FALLBACK_IMG = "/photos/guides/allotment-wide-summer.webp";

// pastel ground per tag — warmth from the Ghibli tints, editorial from the layout
const SECTIONS: { label: string; tag: string; bg: string }[] = [
  { label: "Getting started", tag: "Getting started", bg: "bg-sage" },
  { label: "Planning", tag: "Planning", bg: "bg-ochre" },
  { label: "Growing well", tag: "Growing", bg: "bg-sky" },
  { label: "Problem solving", tag: "Problem solving", bg: "bg-blush" },
  { label: "Equipment", tag: "Equipment", bg: "bg-lavender" },
  { label: "Seasonal", tag: "Seasonal", bg: "bg-ochre" },
];

export const metadata: Metadata = {
  title: "Growing Guides — What To Sow",
  description:
    "Practical UK growing guides for allotment holders and vegetable gardeners. From beginner basics to seasonal planting, everything you need to know.",
  keywords: [
    "growing guides UK",
    "allotment guides",
    "vegetable growing tips UK",
    "planting guides",
  ],
  openGraph: {
    title: "Growing Guides — What To Sow",
    description:
      "Practical UK growing guides. No waffle, just what you need to know.",
    type: "website",
    url: "https://whattosow.co.uk/guides",
  },
  alternates: {
    canonical: "/guides",
  },
};

const guides = [
  {
    title: "Allotment for beginners",
    description:
      "Just got a plot? The easiest crops to start with, what to do first, and how to plan your first year.",
    href: "/guides/beginners",
    tag: "Getting started",
    number: "01",
  },
  {
    title: "Starting from seed",
    description:
      "Everything you need to know about sowing seeds indoors — compost, temperature, light, watering, and hardening off.",
    href: "/guides/seed-starting",
    tag: "Getting started",
    number: "02",
  },
  {
    title: "Understanding your soil",
    description:
      "Clay, sand, or loam? How to identify your soil type, test pH, and improve it for better crops.",
    href: "/guides/soil",
    tag: "Getting started",
    number: "03",
  },
  {
    title: "Seed starting kit",
    description:
      "The kit you actually need to start seeds at home. Trays, compost, propagators — honest picks, no fluff.",
    href: "/guides/seed-starting-kit",
    tag: "Equipment",
    number: "09",
  },
  {
    title: "What you need for your first allotment",
    description:
      "The tools that earn their shed space. Spades, forks, gloves, hoes — and what to skip.",
    href: "/guides/allotment-essentials",
    tag: "Equipment",
    number: "10",
  },
  {
    title: "Composting for allotments",
    description:
      "Cold bins, hot bins, wormeries, and bokashi — which method suits you, what to buy, and how to make compost your soil will thank you for.",
    href: "/guides/composting",
    tag: "Equipment",
    number: "11",
  },
  {
    title: "Growing fruit on your allotment",
    description:
      "Strawberries, raspberries, blackcurrants, gooseberries, rhubarb — plant once, harvest for years. The best fruit for UK allotments.",
    href: "/guides/growing-fruit",
    tag: "Growing",
    number: "12",
  },
  {
    title: "Companion planting guide",
    description:
      "What grows well together and what to keep apart. A crop-by-crop chart for 40 UK vegetables.",
    href: "/guides/companion-planting",
    tag: "Planning",
    number: "04",
  },
  {
    title: "Crop rotation",
    description:
      "The 4-year rotation system that prevents disease, builds soil, and improves your harvest year after year.",
    href: "/guides/crop-rotation",
    tag: "Planning",
    number: "05",
  },
  {
    title: "Green manures & cover crops",
    description:
      "What to sow over winter to protect bare soil, smother weeds and feed the ground for free — the gardener's secret to richer beds next year.",
    href: "/guides/green-manures",
    tag: "Planning",
    number: "15",
  },
  {
    title: "Sun mapping your garden",
    description:
      "How to work out which beds get full sun, part shade or shade — what your garden's aspect means, and which crops to grow where.",
    href: "/guides/sun-mapping",
    tag: "Planning",
    number: "16",
  },
  {
    title: "Watering your crops",
    description:
      "How much, how often, and when. The practical guide to watering vegetables without wasting water or drowning roots.",
    href: "/guides/watering",
    tag: "Growing",
    number: "06",
  },
  {
    title: "Pests & diseases",
    description:
      "Slugs, aphids, blight, and the rest. How to deal with common UK garden pests without reaching for chemicals.",
    href: "/guides/pests",
    tag: "Problem solving",
    number: "07",
  },
  {
    title: "Tomato & potato blight",
    description:
      "The weather pattern that wipes out a tomato crop — with a live Hutton Criteria risk reading for your postcode, and how to beat it.",
    href: "/guides/tomato-blight",
    tag: "Problem solving",
    number: "08",
  },
  {
    title: "Spring vegetables to plant in the UK",
    description:
      "Every crop you can sow this spring — hardy, half-hardy, and tender — with tips on when to start.",
    href: "/guides/spring-vegetables",
    tag: "Seasonal",
    number: "13",
  },
  {
    title: "What to sow in autumn & winter",
    description:
      "The season most growers waste. Quick crops to eat before the cold, hardy veg to overwinter for an early spring harvest, and how to protect it all.",
    href: "/guides/autumn-winter-vegetables",
    tag: "Seasonal",
    number: "14",
  },
  {
    title: "What to sow in summer",
    description:
      "June, July and August aren't the end of sowing — they're the start of the autumn and winter plot. Quick crops, last-chance beans, and the winter veg to start now.",
    href: "/guides/what-to-sow-in-summer-uk",
    tag: "Seasonal",
    number: "17",
  },
  {
    title: "Succession sowing",
    description:
      "Sow little and often for a steady harvest instead of a glut. The crops worth staggering and a simple rhythm that keeps the kitchen in greens all season.",
    href: "/guides/succession-sowing",
    tag: "Growing",
    number: "18",
  },
  {
    title: "Growing brassicas",
    description:
      "Cabbage, kale, broccoli, cauliflower and sprouts — one family for a year-round harvest. Firm planting, beating the cabbage white, and keeping clubroot at bay.",
    href: "/guides/growing-brassicas",
    tag: "Growing",
    number: "19",
  },
  {
    title: "Growing tomatoes: outdoors vs greenhouse",
    description:
      "Which to choose and how to grow each well — cordon vs bush, feeding and watering, and how to dodge blight for a heavy, ripe crop.",
    href: "/guides/growing-tomatoes-outdoors-vs-greenhouse",
    tag: "Growing",
    number: "20",
  },
  {
    title: "Growing onions, garlic & leeks",
    description:
      "The allium family — sets, cloves and seed. When and how to plant, feeding and pests, and curing a homegrown store that lasts through winter.",
    href: "/guides/growing-onions-garlic-leeks",
    tag: "Growing",
    number: "21",
  },
  {
    title: "Growing winter salad leaves",
    description:
      "Cut your own salad in December. The hardy cut-and-come-again leaves to sow in late summer for fresh picking right through the cold — winter lettuce, lamb's lettuce, mizuna and more.",
    href: "/guides/growing-winter-salad-leaves",
    tag: "Growing",
    number: "22",
  },
  {
    title: "Preparing your plot for winter",
    description:
      "Putting the allotment to bed: clearing spent crops, mulching beds the no-dig way, protecting bare soil and storing the harvest. The autumn jobs that pay off all next year.",
    href: "/guides/preparing-your-plot-for-winter",
    tag: "Seasonal",
    number: "23",
  },
  {
    title: "Protecting crops from frost",
    description:
      "Which crops are hardy, which need cover, and how to choose between fleece, cloches, cold frames and polytunnels. Beat both the winter cold and the late frosts of spring.",
    href: "/guides/protecting-vegetables-from-frost",
    tag: "Seasonal",
    number: "24",
  },
  {
    title: "Overwintering broad beans & peas",
    description:
      "Sow hardy broad beans and peas in autumn for a crop weeks ahead of spring sowings. The best varieties, how to protect them, and the pitfalls to avoid.",
    href: "/guides/overwintering-broad-beans-and-peas",
    tag: "Seasonal",
    number: "25",
  },
  {
    title: "Growing root vegetables",
    description:
      "Carrots, beetroot, parsnips, radishes and turnips — get the soil right (stone-free, no fresh muck), sow direct, beat carrot fly, and store roots that keep for months.",
    href: "/guides/growing-root-vegetables",
    tag: "Growing",
    number: "26",
  },
  {
    title: "Growing squash, pumpkins & courgettes",
    description:
      "The hungry, sprawling cucurbit family — feeding and watering, the pollination trick that makes or breaks the crop, beating mildew, and curing winter squash to store.",
    href: "/guides/growing-squash-pumpkins-courgettes",
    tag: "Growing",
    number: "27",
  },
  {
    title: "Growing vegetables in pots & containers",
    description:
      "No garden needed. The best crops for pots, choosing compost and size, and the watering and feeding that turn a patio or balcony into a real harvest.",
    href: "/guides/growing-veg-in-containers",
    tag: "Getting started",
    number: "28",
  },
  {
    title: "Companion planting chart (printable)",
    description:
      "The whole of companion planting on one page — what to grow together and what to keep apart, crop by crop. Made to be scanned, printed and pinned up on the shed wall.",
    href: "/guides/companion-planting-chart",
    tag: "Planning",
    number: "29",
  },
  {
    title: "Watering while you're away",
    description:
      "Going on holiday in high summer? Timers and drip lines, wicking tricks for pots, and the neighbour deal that beats every gadget — come home to a patch that barely noticed.",
    href: "/guides/watering-while-away",
    tag: "Seasonal",
    number: "30",
  },
  {
    title: "Dealing with the glut",
    description:
      "Too many courgettes, a wall of beans, a table of tomatoes. What keeps, what freezes, what to preserve and what to give away — the happiest problem of the growing year, handled.",
    href: "/guides/dealing-with-the-glut",
    tag: "Seasonal",
    number: "31",
  },
];

export default async function GuidesIndex() {
  // one UK-representative reading (the site's postcode-level tuning comes later)
  const weather = await getWeatherState(52.42, -1.9).catch(() => null);
  const now = conditionsFrom(weather);
  const scored = [...guides].sort((a, b) => guideScore(b.href, now) - guideScore(a.href, now));
  const thisWeek = scored.slice(0, 4);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://whattosow.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: "https://whattosow.co.uk/guides",
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header backLink={{ href: "/", label: "\u2190 Home" }} />
      <main id="main-content">
        {/* Hero — photo background with gradient overlay */}
        <div className="bg-earth relative overflow-hidden">
          <img
            src="/images/headers/hero-allotment.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-black/30"
            aria-hidden="true"
          />
          <div className="relative px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-14 sm:pb-18">
            <div className="max-w-3xl">
              <div className="font-serif italic text-lg text-leaf-light mb-3">guides</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[0.95] mb-5">
                How to grow it well
              </h1>
              <p className="text-white/80 leading-relaxed max-w-sm text-base sm:text-lg font-serif italic">
                Practical advice for UK growers. No waffle.
              </p>
            </div>
          </div>
        </div>

        {/* What the plot needs this week — tuned to the month and the sky */}
        <section className="bg-cream px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-earth-light">
              {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", timeZone: "Europe/London" }).format(new Date())}
              {" · "}
              {now.desc}
            </p>
            <h2 className="mt-2 font-serif text-2xl text-earth sm:text-3xl">What the plot needs this week</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {thisWeek.map((g) => (
                <a key={g.href} href={g.href} className="group block">
                  <div className="overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={GUIDE_IMG[g.href] ?? FALLBACK_IMG}
                      alt=""
                      className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-rust">{whyNow(g.href, now)}</p>
                  <h3 className="mt-1 font-serif text-lg leading-snug text-earth group-hover:text-allotment">{g.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Guide sections — pastel grounds, magazine layout with photos */}
        {SECTIONS.map((section) => {
          const items = scored.filter((g) => g.tag === section.tag);
          if (items.length === 0) return null;
          const featureFirst = items.length >= 3;
          return (
            <section key={section.tag} className={`${section.bg} px-6 sm:px-10 lg:px-16 py-14 sm:py-20`}>
              <div className="max-w-5xl mx-auto">
                <div className="font-serif italic text-lg text-allotment mb-8">{section.label}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
                  {items.map((guide, i) => {
                    const feature = featureFirst && i === 0;
                    return (
                      <a
                        key={guide.href}
                        href={guide.href}
                        className={`group block ${feature ? "sm:col-span-2" : ""}`}
                      >
                        <div className={`relative overflow-hidden ${feature ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                          <Image
                            src={GUIDE_IMG[guide.href] ?? FALLBACK_IMG}
                            alt={guide.title}
                            fill
                            sizes={feature ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                            className="object-cover img-grade transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <span className="absolute top-3 left-3 font-mono text-[10px] text-white bg-allotment-dark/70 px-2 py-0.5">
                            {guide.number}
                          </span>
                        </div>
                        <h3 className={`font-serif text-earth mt-4 leading-snug group-hover:text-allotment transition-colors ${feature ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
                          {guide.title}
                        </h3>
                        <p className="text-sm text-earth-light mt-1.5 leading-relaxed max-w-prose">{guide.description}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        {/* Shoppable — the kit we swear by (editorial affiliate) */}
        <section className="bg-cream px-6 sm:px-10 lg:px-16 py-16 sm:py-20 border-t border-earth/10">
          <div className="max-w-5xl mx-auto">
            <div className="font-serif italic text-lg text-allotment mb-2">from the plot</div>
            <h2 className="font-serif text-3xl sm:text-4xl text-earth tracking-tight mb-3">The kit we swear by</h2>
            <p className="text-earth-light max-w-[52ch] mb-8 leading-relaxed">
              A handful of tools that earn their place in the shed. Buy through these and a little goes towards ours.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <GearPick
                name="Felco No. 2 secateurs"
                price="~£45"
                badge="essential"
                amazonUrl={az("B00023RYS6")}
                description="The last secateurs you will buy. Sharp, repairable, and they make clean cuts that heal fast — worth every penny over a lifetime of pruning."
                tip="Buy once, sharpen often."
              />
              <GearPick
                name="Niwaki Hori Hori"
                price="~£33"
                badge="our-pick"
                amazonUrl={az("B07TJ9V989")}
                description="Half trowel, half knife, all useful. It plants out, weeds, cuts twine and divides clumps — it lives in the back pocket and barely sees the shed."
                tip="Get the holster too."
              />
              <GearPick
                name="Spear & Jackson border fork"
                price="~£25"
                badge="budget"
                amazonUrl={az("B0006UF6DA")}
                description="A proper stainless fork at an honest price. Lighter than a full digging fork and ideal for raised beds and lifting roots without slicing them."
                tip="Border size suits most plots."
              />
            </div>
            <div className="mt-8">
              <AffiliateDisclosure />
            </div>

            <div className="mt-10 border-t border-earth/10 pt-8">
              <div className="font-serif italic text-lg text-allotment mb-4">honest reviews from the shed</div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <a href="/blog/best-first-tools-new-allotment" className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">The tools I&apos;d buy first &rarr;</a>
                <a href="/blog/watering-lance-allotment" className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">The watering lance &rarr;</a>
                <a href="/blog/broadfork-clay-bindweed" className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">The broadfork &rarr;</a>
                <a href="/blog/wheelbarrow-allotment-haemmerlin" className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">The wheelbarrow &rarr;</a>
              </div>
            </div>

            <div className="mt-10 border-t border-earth/10 pt-8">
              <div className="font-serif italic text-lg text-allotment mb-4">buying guides — kit worth getting right</div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <a href="/blog/best-raised-beds-uk" className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">Best raised beds &rarr;</a>
                <a href="/blog/best-cold-frames-greenhouses-uk" className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">Cold frames &amp; greenhouses &rarr;</a>
                <a href="/blog/best-water-butts-uk" className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">Best water butts &rarr;</a>
                <a href="/blog/best-compost-bins-uk" className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">Best compost bins &rarr;</a>
                <a href="/blog/best-heated-propagators-grow-lights-uk" className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">Propagators &amp; grow lights &rarr;</a>
                <a href="/blog/best-polytunnels-uk" className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">Polytunnels &rarr;</a>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTAs */}
        <div className="px-6 sm:px-10 lg:px-16 mt-16 sm:mt-20 mb-16 sm:mb-20">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-10 sm:gap-16">
            <div>
              <div className="h-px bg-amber w-12 mb-6" />
              <p className="text-earth-light mb-3 font-serif italic">
                Need personalised sowing dates?
              </p>
              <a
                href="/"
                className="font-serif italic text-lg text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
              >
                Enter your postcode &rarr;
              </a>
            </div>
            <div>
              <div className="h-px bg-amber w-12 mb-6" />
              <p className="text-earth-light mb-3 font-serif italic">
                Looking for kit recommendations?
              </p>
              <a
                href="/guides/seed-starting-kit"
                className="font-serif italic text-lg text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
              >
                See our picks &rarr;
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
