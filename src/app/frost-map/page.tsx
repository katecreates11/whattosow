import type { Metadata } from "next";
import FrostZoneMapLoader from "@/components/FrostZoneMapLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TimeOfDayBackground from "@/components/TimeOfDayBackground";

export const metadata: Metadata = {
  title: "UK Frost Date Map — Last Frost by Region | What To Sow",
  description:
    "Interactive map showing estimated last spring frost dates across the UK. See when it's safe to plant out in your area, from mild Cornwall to the Scottish Highlands.",
  keywords: [
    "UK frost date map",
    "last frost date by region",
    "frost map UK",
    "when is the last frost UK",
    "frost zones UK",
    "safe planting date UK",
  ],
  openGraph: {
    title: "UK Frost Date Map — See When Spring Arrives Where You Are",
    description:
      "Interactive choropleth map of estimated last frost dates across the UK. From late March in Cornwall to mid-June in the Highlands.",
    type: "website",
    url: "https://whattosow.co.uk/frost-map",
  },
  alternates: {
    canonical: "/frost-map",
  },
};

export default function FrostMapPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header backLink={{ href: "/", label: "\u2190 Home" }} />

      <main id="main-content">
        <TimeOfDayBackground>
          <div className="max-w-3xl relative">
            <div className="bg-frost w-12 h-1 mb-6" />
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-frost-light/70 block mb-4">
              Frost map
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[0.95] mb-6">
              UK frost date map
            </h1>
            <p className="text-white/55 leading-relaxed max-w-xl text-base sm:text-[17px] font-serif italic">
              Search your postcode to see your local frost dates, or click any
              region for a detailed breakdown.
            </p>
          </div>
        </TimeOfDayBackground>

        <div className="px-6 sm:px-10 lg:px-16 py-10 sm:py-14">
          <div className="max-w-4xl">
            <FrostZoneMapLoader />

            <div className="mt-10 bg-sky px-6 py-6">
              <h2 className="font-serif text-lg text-earth mb-2">
                Sowing guides by location
              </h2>
              <p className="text-sm text-earth-light mb-4">
                Get personalised sowing calendars for 50 UK cities, tailored to local frost dates.
              </p>
              <a
                href="/sow-in"
                className="inline-block text-sm font-bold tracking-[0.1em] uppercase text-rust hover:text-earth transition-colors"
              >
                Browse all city guides &rarr;
              </a>
            </div>

            <div className="mt-10 mesh-sage px-6 py-6 text-sm text-earth-light space-y-2">
              <p>
                <strong className="text-earth">About this map:</strong> Frost dates
                are estimated using our latitude-based model calibrated against Met
                Office HadUK-Grid data, with coastal adjustments for the Gulf Stream
                effect. Actual frost dates in any given year may be 1&ndash;2 weeks
                earlier or later.
              </p>
              <p className="text-xs text-earth-lighter">
                Boundaries from{" "}
                <a
                  href="https://geoportal.statistics.gov.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rust hover:text-earth transition-colors underline decoration-rust/30"
                >
                  ONS Open Geography Portal
                </a>{" "}
                (OGL v3.0). Map tiles &copy; CARTO / OpenStreetMap contributors.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
