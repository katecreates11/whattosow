import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  GuideHero,
  PullQuote,
  SectionDivider,
  TipBox,
  WarningBox,
  ColorSection,
  BigNumber,
  InThisGuide,
} from "@/components/GuideVisuals";
import GearPick, { GearCategory, AffiliateDisclosure } from "@/components/GearPick";
import SeedStartingKitBuyerNote from "@/components/SeedStartingKitBuyerNote";

export const metadata: Metadata = {
  title: "What You Need to Sow Seeds Indoors UK — Seed Starting Kit | What To Sow",
  description:
    "The only kit you actually need to start seeds at home. Seed trays, compost, propagators, labels, grow lights — honest recommendations from an allotment holder, not a shopping list.",
  keywords: [
    "seed starting kit UK",
    "what do I need to sow seeds",
    "seed trays UK",
    "seed compost UK",
    "propagator for seeds",
    "sowing seeds indoors equipment",
    "seed starting supplies UK",
    "grow light for seedlings UK",
  ],
  openGraph: {
    title: "What You Need to Sow Seeds Indoors",
    description:
      "Honest gear recommendations for starting seeds at home. No fluff, no sponsored picks — just what actually works.",
    type: "article",
    url: "https://whattosow.co.uk/guides/seed-starting-kit",
  },
  alternates: {
    canonical: "/guides/seed-starting-kit",
  },
};

export default function SeedStartingKitGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Seed Starting Kit", item: "https://whattosow.co.uk/guides/seed-starting-kit" },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best seed starting kit UK",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Nutley's 24-Cell Module Trays",
          description: "Thicker plastic than cheap alternatives — they last years with proper drainage holes. Each seedling gets its own root space for easier planting out.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "6",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B00844031K?tag=whattosow21-21",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "Levington Seed & Cutting Compost 20L",
          description: "Fine, low-nutrient, free-draining seed compost. Peat-free and widely available. The number one thing to get right for seed starting.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "6",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B0F3W9KC7N?tag=whattosow21-21",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "Garland One Top Heated Propagator",
          description: "Electric mat in the base provides consistent bottom heat around 22-25°C. Simple, reliable, fits a standard tray. Worth it for peppers, chillies, and aubergines.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "25",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B015WFRWUI?tag=whattosow21-21",
          },
        },
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What do I need to start seeds indoors UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At minimum: seed trays or modules, seed compost, labels, a pencil, and a warm windowsill. A propagator lid or cling film helps retain moisture. Everything else is optional — you can start seeds for under £15.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a propagator to start seeds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. A plastic bag or cling film over a seed tray does the same job — it traps moisture and warmth. A heated propagator is worth it for peppers, chillies, and aubergines that need higher temperatures (25°C+) to germinate reliably, but for most crops a warm windowsill is fine.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a grow light for seedlings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not if you have a bright south-facing windowsill. If your seedlings are consistently leggy and pale, a grow light helps, but try sowing later in spring first — more natural daylight often solves the problem for free.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best seed compost UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Any fine-textured, low-nutrient seed compost works. Westland Seed & Cutting and Levington Seed & Cutting are both good and widely available. Avoid multi-purpose compost for small seeds — it is too chunky and rich.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Header backLink={{ href: "/guides", label: "\u2190 Guides" }} />
      <main id="main-content">
        <GuideHero
          eyebrow="Equipment guide"
          title="What you need to sow seeds indoors"
          subtitle="The kit that actually matters, the stuff you can skip, and what we'd spend our own money on."
          image="/images/guides/seedlings.webp"
          color="allotment"
        />

        <div className="space-y-0 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          <section>
            <div className="space-y-3">
              <p>
                You don&apos;t need much to start seeds. A warm windowsill, a bag of compost, and
                something to put it in. That&apos;s genuinely it for most crops.
              </p>
              <p>
                But there are a few things that make the difference between seedlings
                that thrive and seedlings that keel over after a fortnight. This is
                what we&apos;d actually spend money on &mdash; and what we wouldn&apos;t.
              </p>
              <p>
                If you are here for{" "}
                <Link href="/crops/tomatoes" className="text-rust underline decoration-rust/30 hover:text-earth">
                  tomatoes
                </Link>{" "}
                or{" "}
                <Link href="/crops/basil" className="text-rust underline decoration-rust/30 hover:text-earth">
                  basil
                </Link>
                , start with the crop page too &mdash; the kit only makes sense once
                the timing is right.
              </p>
            </div>
          </section>

          <SeedStartingKitBuyerNote />

          <InThisGuide
            items={[
              { label: "Trays and modules", anchor: "trays-and-modules" },
              { label: "Compost", anchor: "compost" },
              { label: "Propagation", anchor: "propagation" },
              { label: "Watering", anchor: "watering" },
              { label: "Labels", anchor: "labels" },
              { label: "Light", anchor: "light" },
              { label: "Potting on", anchor: "potting-on" },
              { label: "The full shopping list", anchor: "the-full-shopping-list" },
            ]}
          />

          <AffiliateDisclosure />

          {/* ─── TRAYS & MODULES ─── */}
          <GearCategory title="Trays and modules" number={1}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                Module trays beat open seed trays for almost everything. Each seedling
                gets its own root space, so you can plant them out without disturbing
                the roots. The 24-cell or 40-cell trays are the most versatile size.
              </p>
              <GearPick
                name="Nutley's 24-cell module trays"
                price="~£6 for 3"
                badge="essential"
                description="The workhorse. Big enough for most seeds, small enough to fit on a windowsill. Nutley's are thicker plastic than the cheap ones — they last years and have proper drainage holes. Get a solid base tray underneath to catch water."
                amazonUrl="https://www.amazon.co.uk/dp/B00844031K?tag=whattosow21-21"
                position="seed-kit-detail-module-trays"
                ctaLabel="The module trays to start with"
                tip="3 trays gives you 72 cells — enough for most beginners. Buy 2 packs for a serious season."
              />
            </section>
          </GearCategory>

          <PullQuote>
            You can spend a fortune on kit or you can spend &pound;15 and grow exactly
            the same plants. The seeds don&apos;t know the difference.
          </PullQuote>

          {/* ─── COMPOST ─── */}
          <GearCategory title="Compost" number={2}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                This is the one thing worth getting right. The wrong compost is the
                most common reason seeds fail to germinate or seedlings dampen off.
              </p>
              <GearPick
                name="Levington Seed &amp; Cutting Compost (20L)"
                price="~£6"
                badge="essential"
                description="Fine, low-nutrient, free-draining. Exactly what tiny seedlings need. Levington is peat-free and widely available. Don't use multi-purpose for small seeds — it's too chunky and too rich. The seedlings drown or get burned."
                amazonUrl="https://www.amazon.co.uk/dp/B0F3W9KC7N?tag=whattosow21-21"
                position="seed-kit-detail-seed-compost"
                ctaLabel="Fine compost for safer germination"
                tip="One 20L bag does about 10 full trays — it goes further than you'd think."
              />
            </section>
          </GearCategory>

          <TipBox title="Peat-free?">
            Go peat-free if you can. The quality has improved massively in the last few
            years. If you find a peat-free mix too dry and hydrophobic, soak it in warm water
            before filling your trays &mdash; it absorbs much better.
          </TipBox>

          <SectionDivider />

          {/* ─── PROPAGATION ─── */}
          <GearCategory title="Propagation" number={3}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                Seeds need moisture and warmth to germinate. A lid or cover traps both.
                You don&apos;t need anything fancy &mdash; but for heat-loving crops
                like peppers and chillies, a heated propagator genuinely makes a difference.
              </p>
              <GearPick
                name="Garland One Top heated propagator"
                price="~£25"
                badge="upgrade"
                description="A small electric mat in the base that provides consistent bottom heat (around 22–25°C). The Garland One Top is the one everyone recommends — simple, reliable, fits a standard tray. Worth it for peppers, chillies, and aubergines — they need warmth to germinate and a cold windowsill at night can stall them for weeks."
                amazonUrl="https://www.amazon.co.uk/dp/B015WFRWUI?tag=whattosow21-21"
                position="seed-kit-detail-heated-propagator"
                ctaLabel="Bottom heat for true heat-lovers"
                tip="Not necessary for tomatoes, lettuce, or anything hardy — just the heat-lovers."
              />
            </section>
          </GearCategory>

          {/* ─── WATERING ─── */}
          <GearCategory title="Watering" number={4}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                Overwatering kills more seedlings than underwatering. Bottom-watering
                is the safest approach &mdash; let the compost draw water up rather
                than pouring it on top.
              </p>
              <div className="border-t border-earth/10 pt-5">
                <h3 className="font-serif text-xl text-earth">
                  Water with what you already have first
                </h3>
                <p className="mt-2 text-sm text-earth-light leading-relaxed max-w-2xl">
                  A small can with a fine rose is nice, but it is not the first
                  thing to buy. Stand trays in water for a few minutes, let the
                  compost drink from below, then lift them out before they sit
                  soggy.
                </p>
              </div>
            </section>
          </GearCategory>

          <WarningBox title="The #1 seedling killer">
            Damping off &mdash; a fungal disease that makes seedlings collapse at the
            base overnight. Caused by: too wet, too cold, poor air circulation. Prevention:
            bottom-water, remove propagator lids once seeds germinate, use clean pots
            and fresh compost every year.
          </WarningBox>

          <SectionDivider />

          {/* ─── LABELS ─── */}
          <GearCategory title="Labels" number={5}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                You will not remember what you sowed where. You think you will. You won&apos;t.
              </p>
              <div className="border-t border-earth/10 pt-5">
                <h3 className="font-serif text-xl text-earth">
                  Label every tray, but do not buy a system
                </h3>
                <p className="mt-2 text-sm text-earth-light leading-relaxed max-w-2xl">
                  A pencil and plain white labels are enough. Write the variety
                  and sowing date before the tray leaves your hand; marker pen
                  fades, and memory is not a labelling system.
                </p>
              </div>
            </section>
          </GearCategory>

          {/* ─── LIGHT ─── */}
          <GearCategory title="Light" number={6}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                Seeds don&apos;t need light to germinate &mdash; they need warmth. But
                once they&apos;re up, light is everything. Leggy, pale seedlings are
                always a light problem. A bright south-facing windowsill is usually
                enough. If yours isn&apos;t, or if you&apos;re starting early in the year
                when daylight hours are short, a grow light helps.
              </p>
              <div className="border-t border-earth/10 pt-5">
                <h3 className="font-serif text-xl text-earth">
                  Try the brightest windowsill before buying a light
                </h3>
                <p className="mt-2 text-sm text-earth-light leading-relaxed max-w-2xl">
                  Grow lights can rescue a dark sill, but they are not a
                  beginner tax. Sow a little later, turn trays daily and keep
                  seedlings close to the glass before you buy more kit.
                </p>
              </div>
            </section>
          </GearCategory>

          <SectionDivider />

          {/* ─── POTTING ON ─── */}
          <GearCategory title="Potting on" number={7}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                Once seedlings outgrow their modules, they need potting on into bigger
                pots. You&apos;ll know it&apos;s time when roots poke out the bottom
                or growth stalls.
              </p>
              <div className="border-t border-earth/10 pt-5">
                <h3 className="font-serif text-xl text-earth">
                  Reuse clean pots before buying another stack
                </h3>
                <p className="mt-2 text-sm text-earth-light leading-relaxed max-w-2xl">
                  Tomatoes, peppers and courgettes often need a bigger pot
                  before planting out. Old nursery pots, yoghurt pots with holes
                  and clean saved containers all do the job.
                </p>
              </div>
            </section>
          </GearCategory>

          {/* ─── COST CALLOUT ─── */}
          <ColorSection color="allotment">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8">
              <BigNumber number="£30" label="Total for essentials" />
              <p className="text-white/60 text-sm leading-relaxed pb-2 max-w-sm">
                That&apos;s everything you need to fill a windowsill with seedlings.
                The seeds themselves cost £2&ndash;3 a packet and each packet
                grows dozens of plants.
              </p>
            </div>
          </ColorSection>

          {/* ─── SHOPPING LIST SUMMARY ─── */}
          <SectionDivider label="Summary" />

          <ColorSection color="ochre">
            <section id="the-full-shopping-list">
              <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-6 tracking-tight">
                The full shopping list
              </h2>
              <p className="text-sm text-earth-light mb-6">
                Everything you need to start seeds indoors, from the essentials to the nice-to-haves.
              </p>

              <div className="space-y-3 mb-8">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-allotment">
                  Essentials (~&pound;30)
                </h3>
                <ul className="text-sm text-earth space-y-1.5">
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>24-cell module trays (x5)</span>
                    <span className="text-rust tabular-nums">~&pound;8</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>9cm square pots (x20)</span>
                    <span className="text-rust tabular-nums">~&pound;6</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Seed compost (20L)</span>
                    <span className="text-rust tabular-nums">~&pound;5</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Propagator lids (x5)</span>
                    <span className="text-rust tabular-nums">~&pound;6</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Plant labels (x50)</span>
                    <span className="text-rust tabular-nums">~&pound;3</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Spray bottle</span>
                    <span className="text-rust tabular-nums">~&pound;3</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-dark">
                  Worth the upgrade (~&pound;45 extra)
                </h3>
                <ul className="text-sm text-earth space-y-1.5">
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Heated propagator or heat mat</span>
                    <span className="text-rust tabular-nums">&pound;15&ndash;30</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>LED grow light strip</span>
                    <span className="text-rust tabular-nums">&pound;15&ndash;25</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Small watering can with rose</span>
                    <span className="text-rust tabular-nums">~&pound;8</span>
                  </li>
                </ul>
              </div>
            </section>
          </ColorSection>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-6 tracking-tight">
              More tools and guides
            </h2>
            <div>
              <Link
                href="/guides/seed-starting"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    How to start seeds
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    The full guide to sowing, germination, and hardening off.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link
                href="/guides/allotment-essentials"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    What you need for your first allotment
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    The tools, materials, and kit that actually matter.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link
                href="/harvest-planner"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Harvest planner
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    Enter what you&apos;ve sown and we&apos;ll tell you when to harvest.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link
                href="/"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    What to sow this week
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    Personalised sowing dates for your postcode.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
