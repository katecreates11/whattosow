import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BedPlannerApp from "@/components/BedPlannerApp";

export const metadata: Metadata = {
  title: "Vegetable Bed Planner — Plan Your Plot (UK) | What To Sow",
  description:
    "A free vegetable bed planner for UK growers. Tell us your beds and what you want to grow, and we'll lay out a companion- and rotation-aware planting plan — with real spacing, sun direction, and a plan you can print.",
  keywords: [
    "vegetable bed planner",
    "garden planner UK",
    "raised bed layout planner",
    "vegetable garden layout tool",
    "companion planting planner",
    "allotment bed planner",
  ],
  // Work in progress — keep out of the index until it's reviewed & deployed.
  robots: { index: false, follow: false },
  alternates: { canonical: "/bed-planner" },
};

export default function BedPlannerPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header backLink={{ href: "/guides", label: "← Guides" }} />
      <main id="main-content" className="bg-cream">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment">The bed planner</span>
          <h1 className="font-serif text-4xl sm:text-5xl text-earth tracking-tight leading-[1.0] mt-3 mb-4 max-w-[18ch]">
            Plan your beds for the year
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-earth-light max-w-[56ch] mb-3 leading-[1.4]">
            Tell us how many beds you have and what you&apos;d like to grow. We&apos;ll lay it all out for you &mdash;
            good companions together, plant families grouped so you can rotate them next year, tall crops on the north
            side, and the right spacing for every row.
          </p>
          <p className="text-sm text-earth-lighter max-w-[56ch] mb-10">
            New to which beds get the most light? Start with{" "}
            <a href="/guides/sun-mapping" className="text-rust underline decoration-rust/30 hover:text-earth">sun mapping your plot</a>.
          </p>

          <BedPlannerApp />
        </div>
      </main>
      <Footer />
    </div>
  );
}
