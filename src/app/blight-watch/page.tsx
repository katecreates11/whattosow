import type { Metadata } from "next";
import BlightMapLoader from "@/components/BlightMapLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TimeOfDayBackground from "@/components/TimeOfDayBackground";

export const metadata: Metadata = {
  title: "UK Blight Watch — Live Tomato & Potato Blight Risk Map | What To Sow",
  description:
    "Live late blight risk across the UK, by region, using the Hutton Criteria. See whether tomato and potato blight conditions are building in your area this week.",
  keywords: [
    "blight risk map UK",
    "tomato blight risk",
    "potato blight risk",
    "Hutton Criteria map",
    "late blight UK",
    "blight forecast UK",
  ],
  openGraph: {
    title: "UK Blight Watch — Live Tomato & Potato Blight Risk",
    description:
      "A live UK map of late blight risk by region, using the Hutton Criteria. Bookmark your area and check in through the season.",
    type: "website",
    url: "https://whattosow.co.uk/blight-watch",
  },
  alternates: {
    canonical: "/blight-watch",
  },
};

export default function BlightWatchPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header backLink={{ href: "/", label: "← Home" }} />

      <main id="main-content">
        <TimeOfDayBackground>
          <div className="max-w-3xl relative">
            <div className="bg-amber w-12 h-1 mb-6" />
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-amber/80 block mb-4">
              Blight watch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[0.95] mb-6">
              UK blight risk map
            </h1>
            <p className="text-white/55 leading-relaxed max-w-xl text-base sm:text-[17px] font-serif italic">
              Where late blight is building right now, region by region. Search
              your postcode or click any area for the week&apos;s reading.
            </p>
          </div>
        </TimeOfDayBackground>

        <div className="px-6 sm:px-10 lg:px-16 py-10 sm:py-14">
          <div className="max-w-4xl">
            <BlightMapLoader />

            {/* What you can do — prevention, not cure */}
            <section className="mt-12">
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-2">
                What you can do about blight
              </h2>
              <p className="text-earth-light leading-relaxed max-w-2xl mb-6">
                Once a plant has late blight there&apos;s no saving it — so it&apos;s
                all about staying a step ahead. The good news: a few simple habits
                tip the odds firmly in your favour.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="border border-earth/10 bg-leaf-bg p-5">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-allotment mb-3">
                    Stay ahead of it
                  </h3>
                  <ul className="space-y-2.5 text-sm text-earth-light leading-relaxed">
                    <li><strong className="text-earth">Grow tomatoes under cover.</strong> A greenhouse or polytunnel keeps the leaves dry — the single biggest protection. Outdoor tomatoes are most at risk.</li>
                    <li><strong className="text-earth">Choose resistant varieties.</strong> Tomatoes like <em>Crimson Crush</em>, <em>Mountain Magic</em> or <em>Cocktail Crush</em>; potatoes in the <em>Sarpo</em> range (Mira, Axona).</li>
                    <li><strong className="text-earth">Give them air.</strong> Space plants well and strip the lower leaves so the breeze moves through.</li>
                    <li><strong className="text-earth">Water the soil, not the leaves</strong> — and in the morning, so any splashes dry fast.</li>
                    <li><strong className="text-earth">Grow earlies and lift early.</strong> First and second early potatoes harvested before the August peak often dodge it altogether.</li>
                  </ul>
                </div>
                <div className="border border-earth/10 bg-tomato-bg p-5">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-tomato mb-3">
                    If it strikes
                  </h3>
                  <ul className="space-y-2.5 text-sm text-earth-light leading-relaxed">
                    <li><strong className="text-earth">Act the same day.</strong> Remove affected leaves the moment you spot the brown, water-soaked patches.</li>
                    <li><strong className="text-earth">Bin them — never compost.</strong> The spores survive a compost heap; bag them or burn them.</li>
                    <li><strong className="text-earth">On potatoes, cut the lot.</strong> The second blight hits the foliage, cut off and clear all the haulm — it stops spores washing down to the tubers.</li>
                    <li><strong className="text-earth">Then wait to lift.</strong> Leave potatoes 2–3 weeks after cutting back so the skins set before you dig.</li>
                    <li><strong className="text-earth">Don&apos;t count on sprays.</strong> The old copper fungicides are largely off the shelves for home growers now — prevention is the real tool.</li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm">
                <a href="/guides/tomato-blight" className="text-rust hover:text-earth transition-colors underline decoration-rust/30">
                  The full blight guide — spotting it, the Hutton Criteria, and resistant varieties &rarr;
                </a>
              </p>
            </section>

            <div className="mt-10 mesh-ochre px-6 py-6 text-sm text-earth-light space-y-3">
              <p>
                <strong className="text-earth">What this shows:</strong> late
                blight (<em>Phytophthora infestans</em>) is the disease that
                turns tomato and potato leaves brown and collapses a crop in
                days. It thrives in warm, humid spells. We use the{" "}
                <a
                  href="/guides/tomato-blight"
                  className="text-rust hover:text-earth transition-colors underline decoration-rust/30"
                >
                  Hutton Criteria
                </a>{" "}
                — the UK standard — which flags a high-risk &ldquo;Hutton
                Period&rdquo; when two days in a row each stay above 10&deg;C
                overnight with six or more hours at 90% humidity.
              </p>
              <p>
                <strong className="text-earth">A summer story:</strong> blight
                risk is mostly a June&ndash;September concern. Outside those
                months the map sits quietly green — we light it up the moment
                conditions turn.
              </p>
              <p className="text-xs text-earth-lighter">
                Risk is sampled at points across the UK and refreshed through the
                day; each region is shaded by its nearest reading. Weather data
                from{" "}
                <a
                  href="https://open-meteo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rust hover:text-earth transition-colors underline decoration-rust/30"
                >
                  Open-Meteo
                </a>
                . Map &copy; Mapbox &copy; OpenStreetMap contributors.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
