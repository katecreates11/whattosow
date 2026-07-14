import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlightMapLoader from "@/components/BlightMapLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlightKit from "@/components/BlightKit";
import AffiliateLink from "@/components/AffiliateLink";

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

/**
 * Blight-resistant picks for the comparison table. `url` points at the real
 * Suttons product page — AffiliateLink wraps it in our Awin tracking (Suttons
 * is an active advertiser). Varieties chosen because Suttons actually stocks
 * them, so every link lands on a genuine product, not a search.
 */
const resistantVarieties: { name: string; crop: "Tomato" | "Potato"; note: string; url: string }[] = [
  { name: "Crimson Crush", crop: "Tomato", note: "The benchmark — a full-size, well-flavoured outdoor tomato with two blight-resistance genes; it grows away from an attack while others collapse.", url: "https://www.suttons.co.uk/vegetable-seeds/popular-seeds/tomato-seeds-f1-crimson-crush_MH-32561" },
  { name: "Crimson Cocktail", crop: "Tomato", note: "Cocktail-sized and just as resistant — sweet, heavy trusses for outdoors, a tunnel or the greenhouse.", url: "https://www.suttons.co.uk/vegetable-seeds/popular-seeds/tomato-seeds-crimson-cocktail-f1_MH-63935" },
  { name: "Crimson Cherry", crop: "Tomato", note: "Bite-sized, prolific and blight-resistant — the one you pick straight off the vine.", url: "https://www.suttons.co.uk/vegetable-seeds/tomato-seeds/tomato-seeds-crimson-cherry-f1_MH-73968" },
  { name: "Fantasio", crop: "Tomato", note: "A reliable, smooth round tomato with strong blight tolerance — a non-Crimson alternative if you want a change.", url: "https://www.suttons.co.uk/vegetable-seeds/popular-seeds/tomato-seeds-f1-fantasio_MH-1401" },
  { name: "Sarpo Mira", crop: "Potato", note: "The famously tough maincrop — outstanding blight (and slug) resistance, and it stores for months.", url: "https://www.suttons.co.uk/potatoes-onions-garlic/potatoes/all/potato-sarpo-mira_mh-83821" },
  { name: "Cara", crop: "Potato", note: "A popular maincrop with good blight resistance and real drought tolerance; big, baking-friendly tubers.", url: "https://www.suttons.co.uk/potatoes-onions-garlic/potatoes/all/potato-cara_MH-20080" },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
    { "@type": "ListItem", position: 2, name: "Blight Watch", item: "https://whattosow.co.uk/blight-watch" },
  ],
};

export default function BlightWatchPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header backLink={{ href: "/", label: "← Home" }} />

      <main id="main-content">
        <div className="relative overflow-hidden px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-12 sm:pb-16">
          <Image
            src="/photos/guides/allotment-wide-summer.webp"
            alt="A summer allotment in full leaf — the warm, humid conditions late blight thrives in"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-allotment-dark/95 via-allotment-dark/75 to-allotment-dark/45"
            aria-hidden="true"
          />
          <div className="max-w-3xl relative">
            <div className="bg-amber w-12 h-1 mb-6" />
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-amber/90 block mb-4">
              Blight watch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[0.95] mb-6">
              UK blight risk map
            </h1>
            <p className="text-white/75 leading-relaxed max-w-xl text-base sm:text-[17px] font-serif italic">
              Where late blight is building right now, region by region. Search
              your postcode or click any area for the week&apos;s reading.
            </p>
          </div>
        </div>

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
                    <li><strong className="text-earth">Grow tomatoes under cover.</strong> A{" "}
                      <Link href="/blog/best-cold-frames-greenhouses-uk" className="text-rust hover:text-earth transition-colors underline decoration-rust/30">greenhouse</Link>{" "}or{" "}
                      <Link href="/blog/best-polytunnels-uk" className="text-rust hover:text-earth transition-colors underline decoration-rust/30">polytunnel</Link>{" "}keeps the leaves dry — the single biggest protection. Outdoor tomatoes are most at risk.</li>
                    <li><strong className="text-earth">Choose resistant varieties.</strong> Some tomatoes and potatoes are bred to shrug blight off —{" "}
                      <a href="#resistant-varieties" className="text-rust hover:text-earth transition-colors underline decoration-rust/30">see the ones worth growing &darr;</a></li>
                    <li><strong className="text-earth">Give them air.</strong> Space plants well, strip the lower leaves, and tie tomatoes up off the ground so the breeze moves through.</li>
                    <li><strong className="text-earth">Water the soil, not the leaves</strong> — and in the morning, so any splashes dry fast. If your site allows hose use while you hold it, water low at the base; otherwise use a can rose close to the soil.</li>
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

            <BlightKit />

            {/* The resistant-variety table — the surest long-term defence */}
            <section id="resistant-varieties" className="mt-12 scroll-mt-24">
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-2">
                Blight-resistant varieties worth growing
              </h2>
              <p className="text-earth-light leading-relaxed max-w-2xl mb-6">
                You can&apos;t spray blight away any more — but you can out-grow it.
                These tomatoes and potatoes are bred to keep cropping through a bad
                year, and they&apos;re the single best thing to line up for next season.
              </p>
              <div className="overflow-x-auto border border-earth/10">
                <table className="w-full text-sm border-collapse min-w-[480px]">
                  <thead>
                    <tr className="bg-leaf-bg text-left">
                      <th className="font-mono text-[10px] uppercase tracking-[0.12em] text-allotment px-4 py-3">Variety</th>
                      <th className="font-mono text-[10px] uppercase tracking-[0.12em] text-allotment px-4 py-3">Why it shrugs blight off</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {resistantVarieties.map((v) => (
                      <tr key={v.name} className="border-t border-earth/10 align-top">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-semibold text-earth">{v.name}</span>
                          <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-earth-lighter mt-0.5">{v.crop}</span>
                        </td>
                        <td className="px-4 py-3 text-earth-light leading-relaxed">{v.note}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <AffiliateLink
                            href={v.url}
                            product={`${v.name} ${v.crop === "Tomato" ? "tomato seeds" : "seed potatoes"}`}
                            type="seed"
                            merchant="suttons"
                            position="blight-resistant-varieties"
                            className="font-mono text-[11px] uppercase tracking-[0.06em] text-rust hover:text-earth transition-colors border-b border-rust/40"
                          >
                            {v.name} {v.crop === "Tomato" ? "tomato seeds" : "seed potatoes"} &rarr;
                          </AffiliateLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-earth-lighter">
                Links go to the variety at Suttons. Resistant doesn&apos;t mean
                immune — keep up the airflow and dry-leaf habits above and they&apos;ll
                carry you through most summers.
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
