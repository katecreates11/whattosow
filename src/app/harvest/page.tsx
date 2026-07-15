import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlotStamp from "@/components/PlotStamp";
import SeasonalGrid from "@/components/SeasonalGrid";

export const metadata: Metadata = {
  title: "What's Ready to Harvest Now | What To Sow",
  description:
    "The crops likely ready to pick this week, with an estimate tuned to your local season — and the chance to track your own plants for exact dates.",
  alternates: { canonical: "/harvest" },
};

export default function HarvestPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content">
        <section className="px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20 pb-4">
          <div className="max-w-5xl mx-auto">
            <PlotStamp />
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-earth leading-[0.95]">
              Ready to <span className="italic text-allotment">harvest</span>
            </h1>
            <p className="font-serif italic text-xl text-earth-light max-w-[48ch] mt-4 leading-snug">
              The crops likely ready to pick around now where you are. These are gentle estimates — your own plants,
              once you tell us about them, give you the exact day.
            </p>
          </div>
        </section>

        {/* MyPlotSection removed 2026-07-14 — garden dashboard not public for now */}

        <section className="px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto">
            <SeasonalGrid
              lens="harvest"
              heading="Usually ready now"
              emptyNote="The first big harvests are still on their way — soon, though. Soon."
            />
          </div>
        </section>

        {/* plot-tracker CTA removed 2026-07-14 — the garden dashboard is not public for now */}
      </main>
      <Footer />
    </div>
  );
}
