import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullWidthSection from "@/components/FullWidthSection";
import ScrollReveal from "@/components/ScrollReveal";
import EmailCapture from "@/components/EmailCapture";
import HarvestPlanner from "@/components/HarvestPlanner";

export const metadata: Metadata = {
  title: "Harvest Planner — When Will I Harvest? | What To Sow",
  description:
    "Enter what you've sown and when, and we'll tell you exactly when to harvest. Personalised to your UK postcode and local frost date.",
  openGraph: {
    title: "Harvest Planner — When Will I Harvest?",
    description:
      "Enter what you've sown and when, and we'll tell you exactly when to harvest. Personalised to your UK postcode.",
    url: "https://whattosow.co.uk/harvest-planner",
  },
};

export default function HarvestPlannerPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="print:hidden">
        <Header />
      </div>

      <main id="main-content">
        {/* Hero */}
        <FullWidthSection className="bg-sage print:hidden" innerClassName="pt-10 sm:pt-14 pb-8 sm:pb-10">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment mb-3 block">
            Harvest planner
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-earth tracking-tight leading-tight mb-3">
            When will I harvest?
          </h1>
          <p className="text-earth-light leading-relaxed max-w-lg">
            Enter what you&apos;ve sown and when, and we&apos;ll tell you exactly when to pick it &mdash; personalised to your local frost date.
          </p>
        </FullWidthSection>

        {/* Print header */}
        <div className="hidden print:block px-6 pt-6 pb-4">
          <h1 className="text-lg font-bold text-earth">My Harvest Dates &mdash; whattosow.co.uk</h1>
        </div>

        {/* Main tool */}
        <FullWidthSection innerClassName="py-8 sm:py-12">
          <HarvestPlanner />
        </FullWidthSection>

        {/* Email capture */}
        <FullWidthSection className="bg-allotment-dark print:hidden" innerClassName="py-14 sm:py-20">
          <ScrollReveal>
            <div className="max-w-lg mx-auto text-center">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/50 mb-3 block">
                Monthly sowing reminders
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-tight mb-3">
                Never miss a sowing window
              </h2>
              <p className="text-sm text-white/60 mb-6 leading-relaxed">
                A short email each month with what to sow, when to sow it, and the odd practical tip. No spam.
              </p>
              <EmailCapture variant="dark" />
            </div>
          </ScrollReveal>
        </FullWidthSection>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
