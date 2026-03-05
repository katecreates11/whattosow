import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LeafDivider } from "@/components/SVGIllustrations";
import SowingTimeline from "@/components/SowingTimeline";

export const metadata: Metadata = {
  title: "UK Sowing Calendar — Visual Planting Timeline | What To Sow",
  description:
    "See at a glance when to sow, plant, and harvest every crop across all 12 months. Visual UK planting calendar based on your local frost date.",
  keywords: [
    "UK sowing calendar",
    "vegetable planting calendar UK",
    "when to sow vegetables UK",
    "planting timeline UK",
  ],
  openGraph: {
    title: "UK Sowing Calendar — Visual Planting Timeline",
    description:
      "Visual planting calendar showing when to sow, plant, and harvest every UK crop across all 12 months.",
    type: "website",
    locale: "en_GB",
  },
  alternates: {
    canonical: "/calendar",
  },
};

export default function CalendarPage() {
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
        name: "Sowing Calendar",
        item: "https://whattosow.co.uk/calendar",
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header backLink={{ href: "/", label: "\u2190 Home" }} />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-bold text-earth mb-2">Sowing calendar</h1>
        <p className="text-earth-light mb-1">
          When to sow, plant out, and harvest across the year.
        </p>
        <p className="text-xs text-earth-lighter mb-8">
          Based on UK average frost date (mid-April). Scroll sideways on
          mobile. Tap any crop or month for details.
        </p>

        <SowingTimeline />

        <LeafDivider className="my-8" />

        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          <a
            href="/print"
            className="text-allotment hover:text-allotment-dark font-medium"
          >
            Print a sowing chart &rarr;
          </a>
          <a
            href="/"
            className="text-allotment hover:text-allotment-dark font-medium"
          >
            Enter your postcode for personalised dates &rarr;
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
