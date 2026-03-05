import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cities, getCitiesByRegion, regions } from "@/data/cities";

export const metadata: Metadata = {
  title: "What to Sow by Location — UK Sowing Guides by City",
  description:
    "Find out what to sow right now in your city. Local frost dates, personalised sowing calendars, and month-by-month planting guides for 50 UK cities and towns.",
  keywords: [
    "what to sow UK",
    "sowing guide by city",
    "UK planting calendar by location",
    "frost date UK cities",
    "what to plant near me",
  ],
  openGraph: {
    title: "What to Sow by Location — UK Sowing Guides by City",
    description:
      "Local frost dates and personalised sowing calendars for 50 UK cities and towns.",
    type: "website",
    url: "https://whattosow.co.uk/sow-in",
  },
  alternates: {
    canonical: "/sow-in",
  },
};

export default function SowInIndexPage() {
  const grouped = getCitiesByRegion();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://whattosow.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sow by location",
        item: "https://whattosow.co.uk/sow-in",
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header backLink={{ href: "/", label: "\u2190 Home" }} />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-extralight text-earth tracking-tight mb-4">
          What to sow by location
        </h1>
        <p className="text-earth-light leading-relaxed max-w-2xl mb-12">
          The UK stretches from the Scilly Isles to Shetland — your last frost
          date could be weeks earlier or later than someone a few hundred miles
          away. Pick your nearest city for a sowing guide tailored to your local
          frost date, or{" "}
          <a href="/" className="text-allotment hover:text-allotment-dark underline decoration-allotment/30">
            enter your postcode
          </a>{" "}
          for the most accurate results.
        </p>

        <div className="space-y-10">
          {regions.map((region) => {
            const regionCities = grouped[region];
            if (!regionCities || regionCities.length === 0) return null;

            return (
              <section key={region}>
                <h2 className="text-lg font-semibold text-earth mb-4 pb-2 border-b border-earth/10">
                  {region}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {regionCities.map((city) => (
                    <a
                      key={city.slug}
                      href={`/sow-in/${city.slug}`}
                      className="group block border border-earth/6 p-4 hover:border-allotment/30 transition-colors duration-200"
                    >
                      <span className="font-medium text-sm text-earth group-hover:text-allotment transition-colors">
                        {city.name}
                      </span>
                      <span className="block text-xs text-earth-lighter mt-1">
                        {city.county}
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 border border-earth/6 p-6 sm:p-8">
          <h2 className="font-semibold text-earth mb-2">
            Your city not listed?
          </h2>
          <p className="text-sm text-earth-light leading-relaxed mb-4">
            These guides cover the 50 largest UK cities and towns, but your
            frost date depends on your exact location. Enter your postcode on
            the homepage for a personalised sowing calendar.
          </p>
          <a
            href="/"
            className="inline-block text-sm font-medium text-allotment hover:text-allotment-dark transition-colors"
          >
            Go to the postcode tool &rarr;
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
