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
  },
  {
    title: "Starting from seed",
    description:
      "Everything you need to know about sowing seeds indoors — compost, temperature, light, watering, and hardening off.",
    href: "/guides/seed-starting",
    tag: "Getting started",
  },
  {
    title: "Understanding your soil",
    description:
      "Clay, sand, or loam? How to identify your soil type, test pH, and improve it for better crops.",
    href: "/guides/soil",
    tag: "Getting started",
  },
  {
    title: "Companion planting guide",
    description:
      "What grows well together and what to keep apart. A crop-by-crop chart for 40 UK vegetables.",
    href: "/guides/companion-planting",
    tag: "Planning",
  },
  {
    title: "Crop rotation",
    description:
      "The 4-year rotation system that prevents disease, builds soil, and improves your harvest year after year.",
    href: "/guides/crop-rotation",
    tag: "Planning",
  },
  {
    title: "Spring vegetables to plant in the UK",
    description:
      "Every crop you can sow this spring — hardy, half-hardy, and tender — with tips on when to start.",
    href: "/guides/spring-vegetables",
    tag: "Seasonal",
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
      <main id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-4">
          Growing guides
        </h1>
        <p className="text-earth-light leading-relaxed mb-10">
          Practical advice for UK growers. No waffle.
        </p>

        <div className="space-y-4">
          {guides.map((guide) => (
            <a
              key={guide.href}
              href={guide.href}
              className="block p-6 border border-earth/6 hover:border-earth/15 transition-colors group"
            >
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-allotment/60 mb-2 block">
                {guide.tag}
              </span>
              <span className="text-xl font-semibold text-earth group-hover:text-allotment transition-colors">
                {guide.title} &rarr;
              </span>
              <p className="text-sm text-earth-light mt-2">
                {guide.description}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-earth/6 text-center">
          <p className="text-earth-light mb-3">
            Need personalised sowing dates? Enter your postcode on the homepage.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-allotment hover:text-allotment-dark transition-colors"
          >
            Find out what to sow this week &rarr;
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
