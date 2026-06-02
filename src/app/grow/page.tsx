import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlotStamp from "@/components/PlotStamp";
import SeasonalGrid from "@/components/SeasonalGrid";
import MyPlotSection from "@/components/MyPlotSection";

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

        <MyPlotSection lens="grow" />

        <section className="px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto">
            <SeasonalGrid
              lens="grow"
              heading="Ready to plant out"
              emptyNote="Nothing waiting to go out just now — give the young plants another week or two on the windowsill."
            />
          </div>
        </section>

        <section className="px-6 sm:px-10 lg:px-16 py-14 border-t border-earth/10 bg-sage">
          <div className="max-w-5xl mx-auto">
            <p className="font-serif text-2xl sm:text-3xl text-earth tracking-tight max-w-[24ch] mb-3">
              This is your veg patch, growing alongside you.
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
