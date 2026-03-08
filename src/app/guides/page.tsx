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
        {/* Hero — mesh gradient, full-width, editorial */}
        <div className="mesh-garden px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
          <div className="absolute -right-4 sm:right-10 lg:right-20 -top-6 text-[10rem] sm:text-[14rem] font-serif leading-none text-white/[0.04] select-none pointer-events-none" aria-hidden="true">
            &lowast;
          </div>
          <div className="relative max-w-3xl">
            <div className="bg-leaf w-12 h-1 mb-6" />
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-leaf-light/70 block mb-4">
              Guides
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[0.95] mb-6">
              Growing guides
            </h1>
            <p className="text-white/55 leading-relaxed max-w-sm text-base sm:text-lg font-serif italic">
              Practical advice for UK growers. No waffle.
            </p>
          </div>
        </div>

        {/* Guide list — editorial, numbered, grouped by tag with color sections */}
        {[
          { label: "Getting started", color: "mesh-sage", guides: guides.filter(g => g.tag === "Getting started") },
          { label: "Planning", color: "mesh-ochre", guides: guides.filter(g => g.tag === "Planning") },
          { label: "Growing", color: "bg-sky", guides: guides.filter(g => g.tag === "Growing") },
          { label: "Problem solving", color: "bg-blush", guides: guides.filter(g => g.tag === "Problem solving") },
          { label: "Seasonal", color: "bg-lavender", guides: guides.filter(g => g.tag === "Seasonal") },
        ].map((group) => (
          <div key={group.label} className={`${group.color} px-6 sm:px-10 lg:px-16 py-8 sm:py-10`}>
            <div className="max-w-3xl">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-earth/40 block mb-4">
                {group.label}
              </span>
              {group.guides.map((guide, i) => (
                <a
                  key={guide.href}
                  href={guide.href}
                  className={`flex gap-5 sm:gap-6 py-5 sm:py-6 group ${i < group.guides.length - 1 ? "border-b border-earth/8" : ""}`}
                >
                  <span className="text-2xl sm:text-3xl font-serif text-earth/15 leading-none shrink-0 w-8 sm:w-10 pt-1 tabular-nums group-hover:text-rust/40 transition-colors">
                    {guide.number}
                  </span>
                  <div className="min-w-0">
                    <span className="text-lg sm:text-xl font-serif text-earth group-hover:text-rust transition-colors block leading-snug">
                      {guide.title}
                    </span>
                    <p className="text-sm text-earth-light mt-2 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div className="px-6 sm:px-10 lg:px-16 mt-16 sm:mt-20 mb-16 sm:mb-20">
          <div className="max-w-3xl">
            <div className="h-px bg-earth/10 w-12 mb-6" />
            <p className="text-earth-light mb-3 font-serif italic">
              Need personalised sowing dates?
            </p>
            <a
              href="/"
              className="text-sm font-bold tracking-[0.1em] uppercase text-rust hover:text-earth transition-colors"
            >
              Enter your postcode &rarr;
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
