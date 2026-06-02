import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GearPick, { AffiliateDisclosure } from "@/components/GearPick";

const TAG = "whattosow21-21";
const az = (asin: string) => `https://www.amazon.co.uk/dp/${asin}?tag=${TAG}`;

// editorial photo per guide (topic-matched), with a gentle fallback
const guideImages: Record<string, string> = {
  "/guides/beginners": "/photos/guides/allotment-wide-summer.webp",
  "/guides/seed-starting": "/photos/guides/seed-starting-windowsill.webp",
  "/guides/soil": "/photos/guides/freshly-prepared-allotment-bed.webp",
  "/guides/companion-planting": "/photos/guides/companion-planting-marigold-lettuce.webp",
  "/guides/crop-rotation": "/photos/guides/allotment-fresh-beds.webp",
  "/guides/watering": "/photos/guides/watering-strawberry-bed.webp",
  "/guides/pests": "/photos/blog/allotment-netting-cloches-2024.webp",
  "/guides/tomato-blight": "/photos/crops/tomatoes-cherry-on-vine.webp",
  "/guides/spring-vegetables": "/photos/guides/spring-flowers-planter-allotment.webp",
  "/guides/seed-starting-kit": "/photos/guides/seed-starting-courgette-seedling.webp",
  "/guides/allotment-essentials": "/photos/guides/allotment-wide-summer.webp",
  "/guides/composting": "/photos/guides/allotment-fresh-beds.webp",
  "/guides/growing-fruit": "/photos/crops/strawberry-harvest-punnet.webp",
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
    number: "08",
  },
];

export default function GuidesIndex() {
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

        {/* Guide sections — pastel grounds, magazine layout with photos */}
        {SECTIONS.map((section) => {
          const items = guides.filter((g) => g.tag === section.tag);
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
                            src={guideImages[guide.href] ?? FALLBACK_IMG}
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
