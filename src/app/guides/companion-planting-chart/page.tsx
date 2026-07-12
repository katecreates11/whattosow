import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PinButton from "@/components/PinButton";
import { crops } from "@/data/crops";

export const metadata: Metadata = {
  title: "Printable Companion Planting Chart (UK) | What To Sow",
  description:
    "A printable, at-a-glance companion planting chart for UK vegetables: what to grow together and what to keep apart, crop by crop. Save it, print it or pin it — then dig into the full guide for the why.",
  keywords: [
    "printable companion planting chart",
    "companion planting chart UK",
    "companion planting table",
    "what to grow together chart",
    "vegetable companion chart UK",
  ],
  openGraph: {
    title: "Printable Companion Planting Chart (UK)",
    description:
      "What to grow together and what to keep apart, crop by crop — an at-a-glance UK chart to save, print or pin.",
    type: "article",
    url: "https://whattosow.co.uk/guides/companion-planting-chart",
    images: [{ url: "/photos/guides/companion-planting-full-plot.webp", width: 1200, height: 800 }],
  },
  alternates: { canonical: "/guides/companion-planting-chart" },
};

const printCss = `@media print {
  header, footer, .no-print { display: none !important; }
  main { padding: 0 !important; }
  .chart-row { break-inside: avoid; }
}`;

export default function CompanionPlantingChart() {
  // Same source of truth as the main guide: the crop records.
  const chart = crops
    .filter(
      (c) =>
        (c.companionPlants && c.companionPlants.length > 0) ||
        (c.avoidPlants && c.avoidPlants.length > 0)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Companion Planting Chart", item: "https://whattosow.co.uk/guides/companion-planting-chart" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Printable Companion Planting Chart (UK)",
    description:
      "An at-a-glance UK companion planting chart: what to grow together and what to keep apart, crop by crop.",
    url: "https://whattosow.co.uk/guides/companion-planting-chart",
    publisher: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
    datePublished: "2026-06-08",
    dateModified: "2026-06-08",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do you read a companion planting chart?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Find your crop in the left-hand column, then read across: the 'grow together' column lists good neighbours that help it along, and the 'keep apart' column lists the plants to grow elsewhere. Pairings work both ways, so if carrots like onions, onions like carrots too.",
        },
      },
      {
        "@type": "Question",
        name: "Is companion planting really worth it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The well-founded pairings genuinely help — masking scents from pests, drawing pests onto sacrificial plants, bringing in pollinators and predators, and making good use of space. It works best alongside the basics like crop rotation, healthy soil and netting, not instead of them.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: printCss }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header backLink={{ href: "/guides/companion-planting", label: "← Companion planting guide" }} />
      <main id="main-content">
        <div className="px-6 sm:px-10 lg:px-16">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 block">
            Companion planting · the chart
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-4 max-w-2xl">
            Companion planting chart
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            The whole of companion planting on one page &mdash; what to grow together, and what to keep apart, crop by
            crop. Made to be scanned, saved, printed and pinned up on the shed wall. Find your crop, read across, and
            plan your beds with good company in mind.
          </p>
          <p className="text-earth-light leading-relaxed mb-6 max-w-2xl no-print">
            This is the quick reference. For <em>why</em> each pairing works &mdash; the evidence, the flowers worth
            tucking in, and the deeper dives crop by crop &mdash; see the{" "}
            <a href="/guides/companion-planting" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">
              full companion planting guide
            </a>.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-10 no-print">
            <PinButton
              path="/guides/companion-planting-chart"
              image="/photos/guides/companion-planting-full-plot.webp"
              description="Companion planting chart for UK vegetables — what to grow together and what to keep apart. Save it for the allotment!"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-earth-lighter">
              Print or save as PDF: press Cmd / Ctrl + P
            </span>
          </div>
        </div>

        {/* The chart */}
        <div className="px-6 sm:px-10 lg:px-16 pb-4">
          {/* Column headings (desktop) */}
          <div className="hidden sm:grid sm:grid-cols-[1fr_2fr_1.6fr] gap-x-6 pb-2 border-b-2 border-earth/20">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth-lighter">Crop</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-allotment">Grow together</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-rust">Keep apart</span>
          </div>

          {chart.map((c) => (
            <div
              key={c.slug}
              className="chart-row grid sm:grid-cols-[1fr_2fr_1.6fr] gap-x-6 gap-y-2 py-4 border-t border-earth/10 first:border-t-0 sm:first:border-t"
            >
              <a href={`/crops/${c.slug}`} className="font-serif text-lg text-earth hover:text-rust transition-colors self-start">
                {c.name}
              </a>

              <div>
                <span className="sm:hidden font-mono text-[9px] uppercase tracking-[0.12em] text-allotment block mb-1">Grow together</span>
                <div className="flex flex-wrap gap-1.5">
                  {c.companionPlants && c.companionPlants.length > 0 ? (
                    c.companionPlants.map((p) => (
                      <span key={p} className="inline-block text-[13px] bg-leaf/15 text-allotment-dark px-2 py-0.5">
                        {p}
                      </span>
                    ))
                  ) : (
                    <span className="text-[13px] text-earth-lighter">&mdash; happy with most things</span>
                  )}
                </div>
              </div>

              <div>
                <span className="sm:hidden font-mono text-[9px] uppercase tracking-[0.12em] text-rust block mb-1 mt-2">Keep apart</span>
                <div className="flex flex-wrap gap-1.5">
                  {c.avoidPlants && c.avoidPlants.length > 0 ? (
                    c.avoidPlants.map((p) => (
                      <span key={p} className="inline-block text-[13px] bg-rust/10 text-rust px-2 py-0.5">
                        {p}
                      </span>
                    ))
                  ) : (
                    <span className="text-[13px] text-earth-lighter">&mdash; no real enemies</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 sm:px-10 lg:px-16 pt-6 pb-2 max-w-2xl text-earth-light leading-relaxed no-print">
          <p className="text-sm">
            <strong className="text-earth">Pairings work both ways.</strong> If carrots like onions, onions like carrots
            &mdash; so you only need to find one of a pair to know they belong together. And remember companion planting
            sits alongside the basics, not instead of them: good{" "}
            <a href="/guides/crop-rotation" className="text-rust underline decoration-rust/30 hover:text-earth">crop rotation</a>,
            healthy soil and a bit of netting do the heavy lifting.
          </p>
        </div>

        {/* Funnel back to the hub + satellites */}
        <div className="px-6 sm:px-10 lg:px-16 pb-12 no-print">
          <div className="border-t border-earth/10 pt-8 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter block mb-3">Go deeper</span>
            <div className="flex flex-col">
              <a href="/guides/companion-planting" className="flex items-center justify-between py-4 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">The full companion planting guide</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/companion-planting/flowers-for-the-veg-patch" className="flex items-center justify-between py-4 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Flowers for the veg patch</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/companion-planting/what-not-to-plant-together" className="flex items-center justify-between py-4 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What not to plant together</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/" className="flex items-center justify-between py-4 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What to sow now for your postcode</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
