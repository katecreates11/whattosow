import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlotStamp from "@/components/PlotStamp";
import CropCardGrid from "@/components/CropCardGrid";
import MyPlotSection from "@/components/MyPlotSection";
import { plantOutCrops } from "@/lib/variety-status";

export const metadata: Metadata = {
  title: "What to Grow Now — plant out & tend | What To Sow",
  description:
    "What's ready to plant out this week and what to be getting on with in the beds, tuned to your local frost date.",
  alternates: { canonical: "/grow" },
};

export default function GrowPage() {
  const planting = plantOutCrops();

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

        <MyPlotSection lens="grow" />

        <section className="px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-allotment border-b border-earth/15 pb-3 mb-7">
              Ready to plant out <span className="text-earth-lighter">&middot; {planting.length}</span>
            </div>
            <CropCardGrid
              entries={planting}
              emptyNote="Nothing waiting to go out just now — give the young plants another week or two on the windowsill."
            />
          </div>
        </section>

        <section className="px-6 sm:px-10 lg:px-16 py-14 border-t border-earth/10 bg-sage">
          <div className="max-w-5xl mx-auto">
            <p className="font-serif text-2xl sm:text-3xl text-earth tracking-tight max-w-[24ch] mb-3">
              This is your patch, growing alongside you.
            </p>
            <p className="text-earth-light max-w-[50ch] mb-5 leading-relaxed">
              Tell us what you&apos;re growing and when you sowed it, and this becomes your own plot — what&apos;s coming
              along, what needs doing, and when each thing will be ready.
            </p>
            <a href="/my-plot" className="font-serif italic text-lg text-allotment border-b border-amber pb-0.5">
              Start tracking your plot &rarr;
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
