import PlantingTool from "@/components/PlantingTool";
import { crops } from "@/data/crops";

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

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-earth/10 bg-cream/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <svg
              className="w-7 h-7 text-allotment"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 20h10" />
              <path d="M10 20c5.5-2.5.8-6.4 3-10" />
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
            </svg>
            <span className="font-bold text-lg text-earth">
              What To Sow
            </span>
          </a>
          <nav className="text-sm text-earth-lighter">
            <span>Free UK planting tool</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="pt-12 sm:pt-20 pb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-earth tracking-tight leading-tight mb-4">
            Know exactly what to plant,
            <br />
            <span className="text-allotment">right now, where you are</span>
          </h1>
          <p className="text-lg text-earth-light max-w-xl mx-auto mb-10">
            Enter your postcode and we&apos;ll calculate your local frost date,
            then tell you exactly what to sow this week. Personalised for your
            location. No signup needed.
          </p>

          <PlantingTool />
        </div>

        {/* Features */}
        <section className="py-12 border-t border-earth/10">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-leaf-bg rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-allotment"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-earth mb-1">
                Localised to you
              </h3>
              <p className="text-sm text-earth-light">
                Your frost date is calculated from your postcode, not a generic
                national average. Cornwall and Scotland get different advice.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-leaf-bg rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-allotment"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-earth mb-1">
                Updated weekly
              </h3>
              <p className="text-sm text-earth-light">
                Recommendations change as the season progresses. Check back each
                week to see what&apos;s new.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-frost-light rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-frost"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-earth mb-1">
                Live frost alerts
              </h3>
              <p className="text-sm text-earth-light">
                Real-time frost risk for the next 3 nights, so you know when to
                protect your seedlings.
              </p>
            </div>
          </div>
        </section>

        {/* Crop index */}
        <section className="py-12 border-t border-earth/10">
          <h2 className="text-2xl font-bold text-earth mb-4">
            Explore crops
          </h2>
          <p className="text-earth-light text-sm mb-4">
            Tap any crop for detailed UK planting times based on your local
            frost date.
          </p>
          <div className="flex flex-wrap gap-2">
            {crops.map((crop) => (
              <a
                key={crop.slug}
                href={`/crops/${crop.slug}`}
                className="px-3 py-1.5 bg-white border border-earth/10 rounded-full text-sm text-earth-light hover:border-allotment/30 hover:text-allotment transition-colors"
              >
                {crop.name}
              </a>
            ))}
          </div>
        </section>

        {/* FAQ / SEO block */}
        <section className="py-12 border-t border-earth/10 space-y-8 pb-20">
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

      {/* Footer */}
      <footer className="border-t border-earth/10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-earth-lighter">
          <p>
            What To Sow &mdash; free UK planting calendar by postcode.
          </p>
          <p className="mt-1">
            Frost data calibrated against Met Office HadUK-Grid climate
            observations. Forecasts from Open-Meteo.
          </p>
        </div>
      </footer>
    </div>
  );
}
