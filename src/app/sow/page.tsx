import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlotStamp from "@/components/PlotStamp";
import SeasonalGrid from "@/components/SeasonalGrid";

export const metadata: Metadata = {
  title: "What to Sow Now — by your postcode | What To Sow",
  description:
    "Everything worth sowing this week, where you are — the windows that are open and the ones quietly closing, tuned to your local frost date.",
  alternates: { canonical: "/sow" },
};

export default function SowPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content">
        <section className="px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20 pb-4">
          <div className="max-w-5xl mx-auto">
            <PlotStamp />
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-earth leading-[0.95]">
              What to <span className="italic text-allotment">sow</span> now
            </h1>
            <p className="font-serif italic text-xl text-earth-light max-w-[46ch] mt-4 leading-snug">
              Everything worth sowing this week where you are — the windows that are open, and the ones quietly
              beginning to close.
            </p>
          </div>
        </section>

        <section className="px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto">
            <SeasonalGrid lens="sow" emptyNote="A quiet week for sowing where you are — worth resting the beds, and checking back soon." />
          </div>
        </section>

        <section className="px-6 sm:px-10 lg:px-16 py-14 border-t border-earth/10">
          <div className="max-w-5xl mx-auto">
            <p className="font-serif text-2xl sm:text-3xl text-earth tracking-tight max-w-[22ch] mb-3">
              Sown something? Let us keep an eye on it for you.
            </p>
            <p className="text-earth-light max-w-[48ch] mb-5 leading-relaxed">
              Tell us what you&apos;ve sown and when, and we&apos;ll work out when it&apos;ll be ready — and remind you
              along the way.
            </p>
            <a href="/my-plot" className="font-serif italic text-lg text-allotment border-b border-amber pb-0.5">
              Keep track of what you&apos;re growing &rarr;
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
