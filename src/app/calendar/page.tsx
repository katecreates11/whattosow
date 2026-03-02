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
};

export default function CalendarPage() {
  return (
    <div className="min-h-screen">
      <Header backLink={{ href: "/", label: "\u2190 Home" }} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
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
