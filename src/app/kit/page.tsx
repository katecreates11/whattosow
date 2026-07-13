import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GuideHero, ColorSection } from "@/components/GuideVisuals";
import { AffiliateDisclosure } from "@/components/GearPick";
import AffiliateLink from "@/components/AffiliateLink";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "Recommended Kit — What To Sow",
  description:
    "Honest equipment picks for UK allotment holders. No sponsorships, no freebies — just the tools, trays, and kit we actually use on our own plot.",
  keywords: [
    "best allotment tools UK",
    "recommended gardening equipment",
    "allotment kit list",
    "best garden fork UK",
    "seed starting equipment",
    "composting equipment UK",
    "allotment watering kit",
  ],
  openGraph: {
    title: "Recommended Kit — What To Sow",
    description:
      "Honest equipment picks for UK allotment holders. No sponsorships, no freebies — just the stuff we'd lend you over the fence.",
    type: "website",
    url: "https://whattosow.co.uk/guides",
  },
  alternates: {
    canonical: "/guides",
  },
};

const TAG = "whattosow21-21";

function amazonAsin(asin: string) {
  return `https://www.amazon.co.uk/dp/${asin}?tag=${TAG}`;
}

function amazonSearch(query: string) {
  return `https://www.amazon.co.uk/s?k=${encodeURIComponent(query)}&tag=${TAG}`;
}

interface Product {
  name: string;
  price: string;
  blurb: string;
  url: string;
}

function productPosition(name: string): string {
  return `kit-pick-${name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="space-y-5 mt-6">
      {products.map((p) => (
        <div key={p.name} className="border-t border-earth/10 pt-5 first:border-t-0 first:pt-0">
          <div className="flex items-baseline justify-between gap-4 mb-1.5">
            <AffiliateLink
              href={p.url}
              product={p.name}
              type="gear"
              position={productPosition(p.name)}
              className="font-serif text-lg text-earth hover:text-allotment transition-colors"
            >
              {p.name}
            </AffiliateLink>
            <span className="text-sm font-semibold text-rust tabular-nums shrink-0">{p.price}</span>
          </div>
          <p className="text-sm text-earth-light leading-relaxed">{p.blurb}</p>
        </div>
      ))}
    </div>
  );
}

function GuideLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-allotment hover:text-allotment-dark transition-colors mt-6 group"
    >
      {label}
      <svg
        className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}

export default function KitPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Recommended Kit", item: "https://whattosow.co.uk/kit" },
    ],
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main id="main-content" className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
        <GuideHero
          image="/images/headers/hero-allotment.webp"
          eyebrow="Recommended kit"
          title="Our picks"
          subtitle="Honest recommendations from an actual allotment. No sponsorships, no freebies — just the stuff we'd lend you over the fence."
        />

        <AffiliateDisclosure />

        {/* ── Getting started ─────────────────────────────────────────── */}
        <ColorSection color="sage">
          <h2 className="text-2xl font-serif text-earth mb-2">Getting started</h2>
          <p className="text-sm text-earth-light mb-1">The kit that earns its shed space from day one.</p>
          <ProductList
            products={[
              {
                name: "Spear & Jackson digging fork",
                price: "~£25",
                blurb: "The one fork everyone ends up with. Solid, affordable, does the job.",
                url: amazonAsin("B0006UF6DA"),
              },
              {
                name: "Showa 370 gloves",
                price: "~£5",
                blurb: "Thin enough to feel what you're doing. Machine-washable.",
                url: amazonAsin("B0017HEJC0"),
              },
              {
                name: "Felco 2 secateurs",
                price: "~£45",
                blurb: "Buy once. Replaceable parts. Your grandchildren will use these.",
                url: amazonAsin("B00023RYS6"),
              },
              {
                name: "Burgon & Ball Kneelo kneeler",
                price: "~£17",
                blurb: "Memory foam, waterproof. Your knees will thank you.",
                url: amazonAsin("B004CRVDV2"),
              },
            ]}
          />
          <GuideLink href="/guides/allotment-essentials" label="Read the full guide" />
        </ColorSection>

        {/* ── Seed starting ───────────────────────────────────────────── */}
        <ColorSection color="ochre">
          <h2 className="text-2xl font-serif text-earth mb-2">Seed starting</h2>
          <p className="text-sm text-earth-light mb-1">Everything you need to get seeds going indoors.</p>
          <ProductList
            products={[
              {
                name: "Nutley's 24-cell seed trays",
                price: "~£6",
                blurb: "Sturdy enough to last years. Better than flimsy supermarket ones.",
                url: amazonAsin("B00844031K"),
              },
              {
                name: "Levington Seed & Cutting Compost",
                price: "~£6",
                blurb: "Fine texture, good drainage. The one that actually works.",
                url: amazonSearch("Levington seed cutting compost"),
              },
              {
                name: "Garland One Top propagator",
                price: "~£25",
                blurb: "Bottom heat makes the difference between success and failure.",
                url: amazonAsin("B015WFRWUI"),
              },
            ]}
          />
          <GuideLink href="/guides/seed-starting-kit" label="Read the full guide" />
        </ColorSection>

        {/* ── Composting ──────────────────────────────────────────────── */}
        <ColorSection color="sky">
          <h2 className="text-2xl font-serif text-earth mb-2">Composting</h2>
          <p className="text-sm text-earth-light mb-1">Turn your waste into the best soil improver money can&apos;t buy.</p>
          <ProductList
            products={[
              {
                name: "Blackwall compost converter",
                price: "~£25",
                blurb: "Cheapest way to start. Council often subsidise these.",
                url: amazonAsin("B0030ZJZMQ"),
              },
              {
                name: "HOTBIN 200L composter",
                price: "~£200",
                blurb: "Compost in 90 days, even in winter. Worth it if you're serious.",
                url: amazonAsin("B008JDTXYY"),
              },
            ]}
          />
          <GuideLink href="/guides/composting" label="Read the full guide" />
        </ColorSection>

        {/* ── Watering ────────────────────────────────────────────────── */}
        <ColorSection color="lavender">
          <h2 className="text-2xl font-serif text-earth mb-2">Watering</h2>
          <p className="text-sm text-earth-light mb-1">The stuff that keeps everything alive through a dry spell.</p>
          <ProductList
            products={[
              {
                name: "Haws 8.8L Long Reach watering can",
                price: "~£40",
                blurb: "The watering can. Gentle flow, perfect balance.",
                url: amazonAsin("B0014E0UWC"),
              },
              {
                name: "Ward 210L slimline water butt",
                price: "~£45",
                blurb: "Slim enough for any shed wall.",
                url: amazonSearch("Ward 210L slimline water butt"),
              },
            ]}
          />
          <GuideLink href="/guides/watering" label="Read the full guide" />
        </ColorSection>

        {/* ── Pest control ────────────────────────────────────────────── */}
        <ColorSection color="sage">
          <h2 className="text-2xl font-serif text-earth mb-2">Pest control</h2>
          <p className="text-sm text-earth-light mb-1">Prevention beats cure. Every single time.</p>
          <ProductList
            products={[
              {
                name: "Enviromesh fine crop cover",
                price: "~£15",
                blurb: "Stops carrot fly, cabbage root fly, flea beetle. One piece lasts years.",
                url: amazonSearch("Enviromesh fine crop cover"),
              },
              {
                name: "Organic slug pellets (ferric phosphate)",
                price: "~£6",
                blurb: "Ferric phosphate. Pet-safe. Non-negotiable for transplants.",
                url: amazonSearch("organic slug pellets ferric phosphate"),
              },
            ]}
          />
          <GuideLink href="/guides/pests" label="Read the full guide" />
        </ColorSection>
      </main>

      <Footer />
    </>
  );
}
