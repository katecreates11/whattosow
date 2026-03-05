import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  robots: "noindex",
  title: "Printable Planting Resources — What To Sow",
  description:
    "Premium printable growing calendars, allotment planners, and seed labels for UK gardeners. Designed for the shed wall, not the screen.",
  keywords: [
    "printable planting calendar UK",
    "allotment planner printable",
    "UK sowing chart PDF",
    "vegetable growing calendar print",
    "allotment wall chart",
  ],
  openGraph: {
    title: "Printable Planting Resources — What To Sow",
    description:
      "Premium printable growing calendars and planners for UK gardeners.",
    type: "website",
    url: "https://whattosow.co.uk/products",
  },
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
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
        name: "Products",
        item: "https://whattosow.co.uk/products",
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
      <main id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 block">
          For your shed wall
        </span>
        <h1 className="text-3xl sm:text-4xl font-extralight text-earth tracking-tight mb-4">
          Printable planting resources
        </h1>
        <p className="text-earth-light leading-relaxed mb-12">
          The tool on screen is free. Always will be. But some things are
          better on paper &mdash; pinned to the shed wall, tucked into a
          pocket, scribbled on with muddy hands.
        </p>

        {/* Product card */}
        <div className="border border-earth/10 bg-white/40">
          <div className="p-6 sm:p-8">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-amber/80 mb-2 block">
              Most popular
            </span>
            <h2 className="text-2xl font-semibold text-earth mb-3">
              UK Sowing Wall Chart 2026
            </h2>
            <p className="text-earth-light leading-relaxed mb-4">
              40 crops. 12 months. Every sowing, planting, and harvest window
              at a glance. Colour-coded by action, grouped by hardiness, and
              designed to be read from across the shed.
            </p>
            <ul className="text-sm text-earth-light space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-allotment mt-0.5" aria-hidden="true">&#10003;</span>
                A3 landscape &mdash; big enough to read, small enough for a shed wall
              </li>
              <li className="flex items-start gap-2">
                <span className="text-allotment mt-0.5" aria-hidden="true">&#10003;</span>
                Sow indoors, direct sow, plant out, and harvest &mdash; all four actions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-allotment mt-0.5" aria-hidden="true">&#10003;</span>
                Based on UK average frost date with space to write your own
              </li>
              <li className="flex items-start gap-2">
                <span className="text-allotment mt-0.5" aria-hidden="true">&#10003;</span>
                High-res PDF &mdash; print at home or at a print shop
              </li>
              <li className="flex items-start gap-2">
                <span className="text-allotment mt-0.5" aria-hidden="true">&#10003;</span>
                Instant download, no signup required
              </li>
            </ul>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-light text-earth">&pound;3.50</span>
              <span className="text-sm text-earth-lighter">PDF download</span>
            </div>
            {/* Payhip button placeholder — replace with embed when account is set up */}
            <a
              href="#coming-soon"
              className="inline-block bg-allotment text-white font-semibold px-8 py-4 hover:bg-allotment-dark transition-colors text-sm tracking-wide"
              id="coming-soon"
            >
              Coming soon
            </a>
            <p className="text-xs text-earth-lighter mt-3">
              Payments handled by Payhip. Instant PDF download after purchase.
            </p>
          </div>
          <div className="border-t border-earth/6 p-6 sm:p-8 bg-leaf-bg/20">
            <p className="text-sm text-earth-light">
              <strong className="text-earth">Want the free version?</strong>{" "}
              The{" "}
              <a
                href="/print"
                className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
              >
                online sowing chart
              </a>{" "}
              has the same data &mdash; print it straight from your browser.
              The wall chart is for people who want something designed
              specifically for paper.
            </p>
          </div>
        </div>

        {/* Future products teaser */}
        <div className="mt-12 space-y-4">
          <h2 className="text-lg font-semibold text-earth">Coming next</h2>
          <div className="grid gap-4">
            <div className="p-4 border border-earth/6 border-dashed">
              <span className="font-medium text-earth">
                Allotment Planner Bundle
              </span>
              <p className="text-sm text-earth-light mt-1">
                40+ pages: crop rotation planner, seed inventory, harvest log,
                plot layout templates, month-by-month to-do lists. Everything
                in one PDF.
              </p>
            </div>
            <div className="p-4 border border-earth/6 border-dashed">
              <span className="font-medium text-earth">
                Printable Seed Packet Labels
              </span>
              <p className="text-sm text-earth-light mt-1">
                Beautiful labels for saved seeds. Write the variety, date, and
                notes. Print on A4, cut, fold, done.
              </p>
            </div>
          </div>
        </div>

        {/* Email capture */}
        <div className="mt-14 pt-10 border-t border-earth/6">
          <p className="text-sm text-earth-light text-center mb-4">
            Get notified when new resources are available
          </p>
          <div className="max-w-sm mx-auto">
            <EmailCapture variant="compact" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
