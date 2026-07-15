import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlotStamp from "@/components/PlotStamp";
import SeasonalGrid from "@/components/SeasonalGrid";

export const metadata: Metadata = {
  title: "What to Grow Now — plant out & tend | What To Sow",
  description:
    "What's ready to plant out this week and what to be getting on with in the beds, tuned to your local frost date.",
  alternates: { canonical: "/grow" },
};

export default function GrowPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content">
        <section className="px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20 pb-4">
          <div className="max-w-5xl mx-auto">
            <PlotStamp />
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-earth leading-[0.95]">
              What to <span className="italic text-allotment">grow</span> now
            </h1>
            <p className="font-serif italic text-xl text-earth-light max-w-[46ch] mt-4 leading-snug">
              The plants ready to move outdoors this week, and a quiet word on what the beds will want from you.
            </p>
          </div>
        </section>

        {/* MyPlotSection removed 2026-07-14 — garden dashboard not public for now */}

        <section className="px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto">
            <SeasonalGrid
              lens="grow"
              heading="Ready to plant out"
              emptyNote="Nothing waiting to go out just now — give the young plants another week or two on the windowsill."
            />
          </div>
        </section>

        {/* plot-tracker CTA removed 2026-07-14 — the garden dashboard is not public for now */}
      </main>
      <Footer />
    </div>
  );
}
