import type { Metadata } from "next";
import Link from "next/link";
import FrostZoneMapLoader from "@/components/FrostZoneMapLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TimeOfDayBackground from "@/components/TimeOfDayBackground";
import { cities } from "@/data/cities";
import { modelFirstAutumnFrostDay, modelLastFrostDay } from "@/lib/frost";

export const metadata: Metadata = {
  title: "Frost Dates by Postcode (UK) — Last & First Frost Map | What To Sow",
  description:
    "Find your last spring frost and first autumn frost date by UK postcode. A frost map of the whole country, with dates for 50 towns and cities from Penzance to Inverness.",
  keywords: [
    "frost date by postcode UK",
    "first frost date by postcode",
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

function dayToDate(day: number): string {
  const date = new Date(new Date().getFullYear(), 0);
  date.setDate(day);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

/**
 * The map in words: frost dates for fifty places, earliest spring first. The
 * map itself is drawn in the browser, so without this the page had almost no
 * text — it ranked for "frost date by postcode" and gave a search engine
 * nothing to show.
 */
function FrostDatesByPlace() {
  const rows = cities
    .map((city) => ({
      city,
      spring: modelLastFrostDay(city.latitude, city.longitude),
      autumn: modelFirstAutumnFrostDay(city.latitude, city.longitude),
    }))
    .sort((a, b) => a.spring - b.spring || a.city.name.localeCompare(b.city.name));

  return (
    <section aria-labelledby="frost-dates-by-place" className="mt-12">
      <h2 id="frost-dates-by-place" className="font-serif text-2xl sm:text-3xl text-earth tracking-tight">
        Frost dates for {rows.length} UK towns and cities
      </h2>
      <p className="mt-3 max-w-[62ch] text-earth-light leading-relaxed">
        The last spring frost is when tender plants can go outside; the first autumn frost is when
        they are finished. A hill, a valley or a stretch of coast can shift either by a week or
        more, so search your own postcode on the map above &mdash; or{" "}
        <Link href="/" className="text-allotment underline decoration-amber/60 underline-offset-4 hover:text-allotment-dark">
          on the front page
        </Link>
        , where we read ten years of real nights for your exact spot.
      </p>
      <table className="mt-6 w-full border-collapse text-left text-sm sm:text-base">
        <thead>
          <tr className="border-b border-earth/20 font-mono text-[10px] uppercase tracking-[0.12em] text-earth-lighter">
            <th scope="col" className="py-2 pr-3 font-normal">Place</th>
            <th scope="col" className="py-2 pr-3 font-normal">Last spring frost</th>
            <th scope="col" className="py-2 font-normal">Autumn frost from</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ city, spring, autumn }) => (
            <tr key={city.slug} className="border-b border-earth/10">
              <th scope="row" className="py-2.5 pr-3 font-normal">
                <Link
                  href={`/sow-in/${city.slug}`}
                  className="font-serif text-lg text-earth underline decoration-amber/45 underline-offset-4 hover:text-allotment"
                >
                  {city.name}
                </Link>
              </th>
              <td className="py-2.5 pr-3 text-earth-light">{dayToDate(spring)}</td>
              <td className="py-2.5 text-earth-light">{dayToDate(autumn)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

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

            <FrostDatesByPlace />

            <div className="mt-10 bg-sky px-6 py-6">
              <h2 className="font-serif text-lg text-earth mb-2">
                Sowing guides by location
              </h2>
              <p className="text-sm text-earth-light mb-4">
                Get a sowing answer tuned to your postcode and local frost pattern.
              </p>
              <Link
                href="/"
                className="inline-block text-sm font-bold tracking-[0.1em] uppercase text-rust hover:text-earth transition-colors"
              >
                Enter your postcode &rarr;
              </Link>
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
                (OGL v3.0). Map &copy; Mapbox &copy; OpenStreetMap contributors.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
