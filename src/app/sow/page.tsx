import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeasonalKitEdit from "@/components/SeasonalKitEdit";
import ServerSeasonalAnswer from "@/components/ServerSeasonalAnswer";
import SowGreeting from "@/components/SowGreeting";
import { sowGreetingMonthPhrase } from "@/data/sow-greetings";
import { getServerSeasonalAnswer } from "@/lib/server-seasonal-answer";

export const metadata: Metadata = {
  title: "What to Sow Now — by your postcode | What To Sow",
  description:
    "Everything worth sowing this week, where you are — the windows that are open and the ones quietly closing, tuned to your local frost date. Plus the kit for the jobs ahead.",
  alternates: { canonical: "/sow" },
};

export default function SowPage() {
  const answer = getServerSeasonalAnswer();
  const weekOf = answer.now.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  const monthPhrase = sowGreetingMonthPhrase(answer.monthIndex);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content">
        <section className="px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20 pb-4">
          <div className="max-w-5xl mx-auto">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment mb-3">
              The sowing list · week of {weekOf}
            </div>
            <SowGreeting
              fallback="This is the list for the middle of the country - add your postcode on the front page and it becomes yours."
              monthPhrase={monthPhrase}
            />
            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-earth leading-[0.95]">
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
            <ServerSeasonalAnswer className="mb-12" />
          </div>
        </section>

        <section id="kit" className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 border-t border-earth/10 bg-sage/25 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <SeasonalKitEdit variant="full" />
          </div>
        </section>

        {/* plot-tracker CTA removed 2026-07-14 — the garden dashboard is not public for now */}
      </main>
      <Footer />
    </div>
  );
}
