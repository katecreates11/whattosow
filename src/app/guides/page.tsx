import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

        {/* Guide list — Kinfolk numbered editorial list, grouped by tag, on cream */}
        <div className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto space-y-14">
            {[
              { label: "Getting started", guides: guides.filter((g) => g.tag === "Getting started") },
              { label: "Planning", guides: guides.filter((g) => g.tag === "Planning") },
              { label: "Growing", guides: guides.filter((g) => g.tag === "Growing") },
              { label: "Problem solving", guides: guides.filter((g) => g.tag === "Problem solving") },
              { label: "Equipment", guides: guides.filter((g) => g.tag === "Equipment") },
              { label: "Seasonal", guides: guides.filter((g) => g.tag === "Seasonal") },
            ]
              .filter((group) => group.guides.length > 0)
              .map((group) => (
                <div key={group.label}>
                  <div className="font-serif italic text-lg text-allotment border-b border-earth/15 pb-3 mb-1">
                    {group.label}
                  </div>
                  {group.guides.map((guide) => (
                    <a
                      key={guide.href}
                      href={guide.href}
                      className="grid grid-cols-[44px_1fr] gap-5 py-5 border-b border-earth/10 group items-baseline"
                    >
                      <span className="font-serif text-3xl text-amber leading-none tabular-nums">{guide.number}</span>
                      <div className="min-w-0">
                        <span className="block font-serif text-xl sm:text-2xl text-earth group-hover:text-allotment transition-colors leading-snug">
                          {guide.title}
                        </span>
                        <p className="text-sm text-earth-light mt-1.5 leading-relaxed">{guide.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              ))}
          </div>
        </div>

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
