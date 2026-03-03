import PlantingTool from "@/components/PlantingTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CropIndex from "@/components/CropIndex";
import ScrollReveal from "@/components/ScrollReveal";
import FullWidthSection from "@/components/FullWidthSection";
import { crops } from "@/data/crops";
import SkyTonight from "@/components/SkyTonight";
import EmailCapture from "@/components/EmailCapture";
import Image from "next/image";
import {
  MapPinPlantIcon,
  CalendarSeedlingIcon,
  SnowflakeShieldIcon,
} from "@/components/SVGIllustrations";
import { getCurrentMicroSeason, getSeasonName } from "@/lib/seasons";
import StickyPostcodeCTA from "@/components/StickyPostcodeCTA";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "What To Sow",
    url: "https://whattosow.co.uk",
    description:
      "Free UK planting calendar. Enter your postcode to find your local frost date and get personalised advice on what to sow this week.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
  };

  // Compute how many crops are sowable right now (server-side, build-time)
  const now = new Date();
  const avgFrost = new Date(now.getFullYear(), 3, 15);
  const weeksToFrost = (avgFrost.getTime() - now.getTime()) / (7 * 24 * 60 * 60 * 1000);
  const weeksAfterFrost = -weeksToFrost;
  const sowableNowCount = crops.filter((crop) => {
    const w = 3;
    if (crop.sowIndoorsWeeks !== null) {
      const diff = weeksToFrost - -crop.sowIndoorsWeeks;
      if (diff >= -w && diff <= w) return true;
    }
    if (crop.directSowWeeks !== null) {
      const diff = weeksToFrost - -crop.directSowWeeks;
      if (diff >= -w && diff <= w) return true;
    }
    if (crop.plantOutWeeks !== null) {
      const diff = weeksAfterFrost - crop.plantOutWeeks;
      if (diff >= -w && diff <= w) return true;
    }
    return false;
  }).length;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When is the last frost date in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It varies hugely depending on where you live. In the far south-west of England, the last frost is typically in early April. In London and the south-east, it's mid-to-late April. The Midlands and north of England see their last frost in early May. Scotland ranges from mid-May to early June.",
        },
      },
      {
        "@type": "Question",
        name: "What can I plant before the last frost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hardy crops like broad beans, peas, onion sets, potatoes, lettuce, spinach, radishes, and kale can all go out before your last frost date. Tender crops like tomatoes, courgettes, runner beans, and peppers must wait until after the last frost.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate are these frost dates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our estimates are calibrated against Met Office climate data and are typically accurate to within 5-7 days. However, frost dates are long-term averages — in any given year, the actual last frost could be earlier or later.",
        },
      },
      {
        "@type": "Question",
        name: "Is this tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, completely free. No signup, no subscription, no paywall.",
        },
      },
      {
        "@type": "Question",
        name: "Who made this?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A UK allotment grower frustrated by generic planting advice. Every site said 'sow tomatoes in March' — but March in Cornwall and March in Edinburgh are completely different. So we built a tool that actually knows where you are.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Header />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Hero — illustration banner with text */}
        <FullWidthSection className="relative overflow-hidden" innerClassName="relative">
          {/* Mobile: stacked text above image */}
          <div className="sm:hidden pt-10 pb-6 px-1">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-allotment animate-pulse" aria-hidden="true" />
              Sowing season is underway
            </span>
            <h1 className="text-4xl font-extralight text-earth tracking-tighter leading-[0.92] mb-3">
              Know exactly
              <br />
              what to plant,
              <br />
              <span className="text-allotment">right now</span>
            </h1>
            <p className="text-sm text-earth-light/70 leading-relaxed">
              Enter your postcode for personalised sowing dates, based on your local frost date.
            </p>
          </div>

          {/* Image — full width on all sizes, with overlaid text on sm+ */}
          <div className="relative">
            <Image
              src="/images/headers/hero-allotment.png"
              alt="Illustrated allotment scene with raised beds, shed and vegetables"
              width={1200}
              height={669}
              className="w-full h-auto"
              priority
            />
            {/* Desktop/tablet: text overlaid on the empty left side */}
            <div className="absolute inset-0 hidden sm:flex items-center">
              <div className="px-10 lg:px-16 max-w-[42%]">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-allotment animate-pulse" aria-hidden="true" />
                  Sowing season is underway
                </span>
                <h1 className="text-5xl lg:text-6xl font-extralight text-earth tracking-tighter leading-[0.92] mb-5">
                  Know exactly
                  <br />
                  what to plant,
                  <br />
                  <span className="text-allotment">right now</span>
                </h1>
                <p className="text-sm text-earth-light/70 max-w-[220px] leading-relaxed">
                  Enter your postcode for personalised sowing dates, based on your local frost date.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-10 sm:pt-14 pb-8 sm:pb-12">
            <PlantingTool />
          </div>
        </FullWidthSection>

        {/* Trust strip */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 py-5 text-xs text-earth-lighter flex-wrap">
          <span className="font-medium text-earth-light">{sowableNowCount} crops to sow right now</span>
          <span className="hidden sm:inline text-earth/20" aria-hidden="true">|</span>
          <span>Met Office data</span>
          <span className="hidden sm:inline text-earth/20" aria-hidden="true">|</span>
          <span>Updated weekly</span>
          <span className="hidden sm:inline text-earth/20" aria-hidden="true">|</span>
          <span>Every UK postcode</span>
        </div>

        {/* Features — consistent ghost cards */}
        <section className="py-14 sm:py-20" aria-label="Features">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment mb-6 block">
            How it works
          </span>

          <div className="grid grid-cols-12 gap-4 sm:gap-5">
            {/* Large card — 8 columns */}
            <ScrollReveal className="col-span-12 lg:col-span-8">
              <div className="border border-earth/6 bg-leaf-bg/30 p-8 sm:p-10 lg:p-12 h-full hover:border-earth/15 transition-colors duration-300">
                <MapPinPlantIcon className="w-10 h-10 text-allotment/60 mb-6" />
                <h2 className="font-semibold text-earth text-xl mb-3">Localised to you</h2>
                <p className="text-earth-light leading-relaxed max-w-lg">
                  Your frost date is calculated from your postcode — not a national
                  average. A grower in Cornwall and a grower in Edinburgh get
                  different advice, because they should.
                </p>
              </div>
            </ScrollReveal>

            {/* Two stacked cards — 4 columns */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 sm:gap-5">
              <ScrollReveal delay={100}>
                <div className="border border-earth/6 p-6 sm:p-8 hover:border-earth/15 transition-colors duration-300">
                  <CalendarSeedlingIcon className="w-8 h-8 text-amber/60 mb-4" />
                  <h2 className="font-semibold text-earth mb-2">Updated weekly</h2>
                  <p className="text-sm text-earth-light leading-relaxed">
                    Sowing windows open and close every week. Miss one and you
                    wait a whole year. Check back each Monday.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="border border-earth/6 p-6 sm:p-8 hover:border-earth/15 transition-colors duration-300">
                  <SnowflakeShieldIcon className="w-8 h-8 text-frost/60 mb-4" />
                  <h2 className="font-semibold text-earth mb-2">Live frost alerts</h2>
                  <p className="text-sm text-earth-light leading-relaxed">
                    Real-time frost risk for the next 3 nights, so you can cover
                    your seedlings before it&apos;s too late.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Sky tonight — moon phase + daylight */}
        <section className="pb-14 sm:pb-20" aria-label="Today at the allotment">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment mb-6 block">
            Today at the allotment
          </span>
          <SkyTonight />
        </section>

        {/* Crop index — subtle band */}
        <FullWidthSection className="border-y border-earth/6" innerClassName="py-14 sm:py-20">
          <ScrollReveal>
            <section id="explore-crops" className="scroll-mt-20">
              <CropIndex crops={crops} initialLimit={4} />
            </section>
          </ScrollReveal>
        </FullWidthSection>

        {/* Calendar CTA — full-width dark */}
        <FullWidthSection className="bg-allotment-dark" innerClassName="py-12 sm:py-16 lg:py-20">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <div>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 mb-4 block">
                  Sowing calendar
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white tracking-tight leading-tight">
                  Plan your whole season
                </h2>
                <p className="text-white/50 mt-3 leading-relaxed">
                  40 crops across 12 months — at a glance. Never miss a sowing window.
                </p>
              </div>
              <a
                href="/calendar"
                className="inline-block bg-white text-allotment-dark font-semibold px-8 py-4 hover:bg-leaf-bg transition-colors duration-300 text-sm whitespace-nowrap tracking-wide"
              >
                Plan your season &rarr;
              </a>
            </div>
          </ScrollReveal>
        </FullWidthSection>

        {/* Email capture — standalone for visitors who don't use the tool */}
        <FullWidthSection className="bg-allotment-bg/40" innerClassName="py-14 sm:py-20">
          <ScrollReveal>
            <section aria-label="Newsletter signup">
              <div className="max-w-lg mx-auto">
                <p className="text-center text-sm text-earth-lighter mb-4">
                  Don&apos;t miss what&apos;s coming up next month
                </p>
                <EmailCapture />
              </div>
            </section>
          </ScrollReveal>
        </FullWidthSection>

        {/* FAQ */}
        <section id="common-questions" className="py-14 sm:py-20 scroll-mt-20" aria-labelledby="faq-heading">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment mb-4 block">
              FAQ
            </span>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-light text-earth tracking-tight mb-10 sm:mb-12">
              Common questions
            </h2>

            <div className="space-y-8 sm:space-y-10">
              <div className="pl-6 sm:pl-8 border-l border-earth/10 py-1">
                <h3 className="text-lg sm:text-xl font-medium text-earth mb-3">
                  When is the last frost date in the UK?
                </h3>
                <p className="text-earth-light leading-relaxed max-w-2xl">
                  It varies hugely depending on where you live. In the far
                  south-west of England, the last frost is typically in early
                  April. In London and the south-east, it&apos;s mid-to-late
                  April. The Midlands and north of England see their last frost in
                  early May. Scotland ranges from mid-May to early June. Enter
                  your postcode above for your specific date.
                </p>
              </div>

              <div className="pl-6 sm:pl-8 border-l border-earth/10 py-1">
                <h3 className="text-lg sm:text-xl font-medium text-earth mb-3">
                  What can I plant before the last frost?
                </h3>
                <p className="text-earth-light leading-relaxed max-w-2xl">
                  Hardy crops like broad beans, peas, onion sets, potatoes,
                  lettuce, spinach, radishes, and kale can all go out before your
                  last frost date. They can tolerate cold nights and light frosts.
                  Tender crops like tomatoes, courgettes, runner beans, and peppers
                  must wait until after the last frost.
                </p>
              </div>

              <div className="pl-6 sm:pl-8 border-l border-earth/10 py-1">
                <h3 className="text-lg sm:text-xl font-medium text-earth mb-3">
                  How accurate are these frost dates?
                </h3>
                <p className="text-earth-light leading-relaxed max-w-2xl">
                  Our estimates are calibrated against Met Office climate data and
                  are typically accurate to within 5-7 days. However, frost dates
                  are long-term averages — in any given year, the actual last frost
                  could be earlier or later. Microclimates (sheltered gardens, frost
                  pockets, urban heat islands) also affect your specific conditions.
                  Always check the forecast before planting tender crops.
                </p>
              </div>

              <div className="pl-6 sm:pl-8 border-l border-earth/10 py-1">
                <h3 className="text-lg sm:text-xl font-medium text-earth mb-3">
                  Is this tool free?
                </h3>
                <p className="text-earth-light leading-relaxed max-w-2xl">
                  Yes, completely free. No signup, no subscription, no paywall.
                  We believe personalised planting advice should be open to every
                  UK grower.
                </p>
              </div>

              <div className="pl-6 sm:pl-8 border-l border-earth/10 py-1">
                <h3 className="text-lg sm:text-xl font-medium text-earth mb-3">
                  Who made this?
                </h3>
                <p className="text-earth-light leading-relaxed max-w-2xl">
                  A UK allotment grower frustrated by generic planting advice.
                  Every site said &ldquo;sow tomatoes in March&rdquo; — but March
                  in Cornwall and March in Edinburgh are completely different. So we
                  built a tool that actually knows where you are.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Repeat CTA */}
        <div className="py-10 sm:py-14 text-center border-t border-earth/6">
          <p className="text-earth-light mb-2">Ready to find out what to sow?</p>
          <p className="text-sm text-earth-lighter mb-4">{sowableNowCount} crops are in season right now.</p>
          <a
            href="#main-content"
            className="inline-flex items-center gap-2 text-sm font-medium text-allotment hover:text-allotment-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Enter your postcode
          </a>
        </div>
      </main>

      <Footer />
      <StickyPostcodeCTA />
    </div>
  );
}
