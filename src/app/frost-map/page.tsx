import type { Metadata } from "next";
import FrostZoneMapLoader from "@/components/FrostZoneMapLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

      <main id="frost-map" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-earth mb-3">
            UK frost date map
          </h1>
          <p className="text-earth-light max-w-xl">
            Search your postcode to see your local frost dates, or click any
            region for a detailed breakdown. Toggle between spring frost, autumn
            frost, and growing season views.
          </p>
        </div>

        <FrostZoneMapLoader />

        <div className="mt-10 bg-allotment-bg rounded-xl p-4 text-sm text-earth-light space-y-2">
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
              className="text-allotment hover:underline"
            >
              ONS Open Geography Portal
            </a>{" "}
            (OGL v3.0). Map tiles &copy; CARTO / OpenStreetMap contributors.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
