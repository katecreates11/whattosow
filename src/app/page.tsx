import PlantingTool from "@/components/PlantingTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { crops } from "@/data/crops";
import {
  HeroIllustration,
  LeafSprig,
  LeafDivider,
  MapPinPlantIcon,
  CalendarSeedlingIcon,
  SnowflakeShieldIcon,
  getCropIcon,
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

  const hardyCrops = crops.filter((c) => c.category === "hardy");
  const halfHardyCrops = crops.filter((c) => c.category === "half-hardy");
  const tenderCrops = crops.filter((c) => c.category === "tender");

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* Hero */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="pt-12 sm:pt-20 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            {/* Text column */}
            <div className="lg:w-[60%] text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-4">
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
        <section className="py-12">
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

        {/* Crop index — category-grouped */}
        <LeafDivider className="my-4" />
        <section className="py-12">
          <h2 className="text-2xl font-bold text-earth mb-2">
            Explore crops
          </h2>
          <p className="text-earth-light text-sm mb-8">
            Tap any crop for detailed UK planting times based on your local frost date.
          </p>

          {/* Hardy */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-allotment uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-leaf rounded-full" />
              Hardy crops
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {hardyCrops.map((crop) => {
                const Icon = getCropIcon(crop.slug);
                return (
                  <a
                    key={crop.slug}
                    href={`/crops/${crop.slug}`}
                    className="bg-leaf-bg/60 border-l-3 border-leaf rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {Icon && <Icon className="w-5 h-5 shrink-0" />}
                      <span className="font-medium text-sm text-earth">{crop.name}</span>
                    </div>
                    <p className="text-xs text-earth-lighter">
                      {crop.directSowWeeks !== null
                        ? `Direct sow ${Math.abs(crop.directSowWeeks)}w ${crop.directSowWeeks <= 0 ? "before" : "after"} frost`
                        : crop.sowIndoorsWeeks !== null
                          ? `Start indoors ${Math.abs(crop.sowIndoorsWeeks)}w before frost`
                          : ""}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Half-hardy */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-amber uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber rounded-full" />
              Half-hardy crops
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {halfHardyCrops.map((crop) => {
                const Icon = getCropIcon(crop.slug);
                return (
                  <a
                    key={crop.slug}
                    href={`/crops/${crop.slug}`}
                    className="bg-amber-bg border-l-3 border-amber rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {Icon && <Icon className="w-5 h-5 shrink-0" />}
                      <span className="font-medium text-sm text-earth">{crop.name}</span>
                    </div>
                    <p className="text-xs text-earth-lighter">
                      {crop.sowIndoorsWeeks !== null
                        ? `Start indoors ${Math.abs(crop.sowIndoorsWeeks)}w before frost`
                        : crop.directSowWeeks !== null
                          ? `Direct sow ${crop.directSowWeeks}w after frost`
                          : ""}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Tender */}
          <div>
            <h3 className="text-sm font-semibold text-tomato uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-tomato rounded-full" />
              Tender crops
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {tenderCrops.map((crop) => {
                const Icon = getCropIcon(crop.slug);
                return (
                  <a
                    key={crop.slug}
                    href={`/crops/${crop.slug}`}
                    className="bg-tomato-bg border-l-3 border-tomato rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {Icon && <Icon className="w-5 h-5 shrink-0" />}
                      <span className="font-medium text-sm text-earth">{crop.name}</span>
                    </div>
                    <p className="text-xs text-earth-lighter">
                      {crop.sowIndoorsWeeks !== null
                        ? `Start indoors ${Math.abs(crop.sowIndoorsWeeks)}w before frost`
                        : ""}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ / SEO block */}
        <LeafDivider className="my-4" />
        <section className="py-12 space-y-8 pb-20">
          <h2 className="text-2xl font-bold text-earth">
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
                Hardy crops like broad beans, peas, garlic, onion sets, potatoes,
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
