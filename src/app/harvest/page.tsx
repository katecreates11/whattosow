import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlotStamp from "@/components/PlotStamp";
import SeasonalGrid from "@/components/SeasonalGrid";
import MyPlotSection from "@/components/MyPlotSection";

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

        <MyPlotSection lens="harvest" />

        <section className="px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto">
            <SeasonalGrid
              lens="harvest"
              heading="Usually ready now"
              emptyNote="The first big harvests are still on their way — soon, though. Soon."
            />
          </div>
        </section>

        <section className="px-6 sm:px-10 lg:px-16 py-14 border-t border-earth/10 bg-ochre">
          <div className="max-w-5xl mx-auto">
            <p className="font-serif text-2xl sm:text-3xl text-earth tracking-tight max-w-[24ch] mb-3">
              Tell us your carrots went in, and we&apos;ll tell you when to pull them.
            </p>
            <p className="text-earth-light max-w-[50ch] mb-5 leading-relaxed">
              Log what you&apos;ve sown and when, and your own harvest dates appear here — no guessing, just your plot,
              counting down.
            </p>
            <a href="/my-plot" className="font-serif italic text-lg text-allotment border-b border-amber pb-0.5">
              Track your harvests &rarr;
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
