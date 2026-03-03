import PlantingTool from "@/components/PlantingTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CropIndex from "@/components/CropIndex";
import { crops } from "@/data/crops";
import {
  HeroIllustration,
  LeafSprig,
  LeafDivider,
  MapPinPlantIcon,
  CalendarSeedlingIcon,
  SnowflakeShieldIcon,
} from "@/components/SVGIllustrations";

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
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Header />

      {/* Hero */}
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="pt-12 sm:pt-20 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            {/* Text column */}
            <div className="lg:w-[60%] text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-4" aria-hidden="true">
                <LeafSprig className="w-6 h-8 animate-leaf-sway lg:hidden" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-earth tracking-tight leading-tight mb-4">
                Know exactly what to plant,
                <br />
                <span className="text-allotment">right now, where you are</span>
              </h1>
              <p className="text-lg text-earth-light max-w-xl mx-auto lg:mx-0 mb-10">
                Enter your postcode and we&apos;ll calculate your local frost date,
                then tell you exactly what to sow this week. Personalised for your
                location. No signup needed.
              </p>

              <PlantingTool />
            </div>

            {/* Illustration column — hidden on mobile */}
            <div className="hidden lg:flex lg:w-[40%] justify-center items-center">
              <HeroIllustration className="w-full max-w-[280px] opacity-90" />
            </div>
          </div>
        </div>

        {/* Features */}
        <LeafDivider className="my-4" />
        <section className="py-12" aria-label="Features">
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Localised */}
            <div className="bg-allotment-bg rounded-2xl p-6 relative overflow-hidden">
              <MapPinPlantIcon className="w-10 h-10 text-allotment mb-4" />
              <h3 className="font-semibold text-earth mb-2">Localised to you</h3>
              <p className="text-sm text-earth-light">
                Your frost date is calculated from your postcode, not a generic
                national average. Cornwall and Scotland get different advice.
              </p>
            </div>

            {/* Updated weekly */}
            <div className="bg-amber-bg rounded-2xl p-6 border-l-4 border-amber relative overflow-hidden">
              <CalendarSeedlingIcon className="w-10 h-10 text-earth mb-4" />
              <h3 className="font-semibold text-earth mb-2">Updated weekly</h3>
              <p className="text-sm text-earth-light">
                Recommendations change as the season progresses. Check back each
                week to see what&apos;s new.
              </p>
            </div>

            {/* Frost alerts */}
            <div className="bg-frost-bg rounded-2xl p-6 relative overflow-hidden">
              <SnowflakeShieldIcon className="w-10 h-10 text-frost mb-4" />
              <h3 className="font-semibold text-earth mb-2">Live frost alerts</h3>
              <p className="text-sm text-earth-light">
                Real-time frost risk for the next 3 nights, so you know when to
                protect your seedlings.
              </p>
            </div>
          </div>
        </section>

        {/* Crop index — category-grouped with season filter */}
        <LeafDivider className="my-4" />
        <section id="explore-crops" className="py-12 scroll-mt-20">
          <CropIndex crops={crops} />
        </section>

        {/* Calendar link */}
        <div className="text-center py-4">
          <a
            href="/calendar"
            className="inline-block bg-allotment-bg text-allotment font-medium px-5 py-3 rounded-full hover:bg-allotment hover:text-white transition-colors text-sm"
          >
            View full sowing calendar &rarr;
          </a>
        </div>

        {/* FAQ / SEO block */}
        <LeafDivider className="my-4" />
        <section id="common-questions" className="py-12 space-y-8 pb-20 scroll-mt-20" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-earth">
            Common questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-earth mb-1">
                When is the last frost date in the UK?
              </h3>
              <p className="text-earth-light text-sm">
                It varies hugely depending on where you live. In the far
                south-west of England, the last frost is typically in early
                April. In London and the south-east, it&apos;s mid-to-late
                April. The Midlands and north of England see their last frost in
                early May. Scotland ranges from mid-May to early June. Enter
                your postcode above for your specific date.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-earth mb-1">
                What can I plant before the last frost?
              </h3>
              <p className="text-earth-light text-sm">
                Hardy crops like broad beans, peas, onion sets, potatoes,
                lettuce, spinach, radishes, and kale can all go out before your
                last frost date. They can tolerate cold nights and light frosts.
                Tender crops like tomatoes, courgettes, runner beans, and peppers
                must wait until after the last frost.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-earth mb-1">
                How accurate are these frost dates?
              </h3>
              <p className="text-earth-light text-sm">
                Our estimates are calibrated against Met Office climate data and
                are typically accurate to within 5-7 days. However, frost dates
                are long-term averages — in any given year, the actual last frost
                could be earlier or later. Microclimates (sheltered gardens, frost
                pockets, urban heat islands) also affect your specific conditions.
                Always check the forecast before planting tender crops.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-earth mb-1">
                Is this tool free?
              </h3>
              <p className="text-earth-light text-sm">
                Yes, completely free. No signup, no subscription, no paywall. We
                built this because we were frustrated by how hard it is to get
                simple, personalised planting advice in the UK.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
