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
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Product",
          name: "Charles Dowding CD60 Module Trays",
          description: "The trays Charles Dowding uses daily. 60 tapered cells with wide drainage holes. Rootballs slide out without sticking. Thick recycled polypropylene that lasts years.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "10",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B0CB661NZP?tag=whattosow21-21",
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
                tip="3 trays gives you 72 cells — enough for most beginners. Buy 2 packs for a serious season."
              />
              <GearPick
                name="Charles Dowding CD60 module trays"
                price="~£10"
                badge="upgrade"
                description="The trays Charles Dowding uses every day. 60 tapered cells with wide drainage holes — the rootballs slide out without sticking or tearing. Made from thick recycled polypropylene that lasts years. More expensive than standard trays but if you're sowing seriously, the difference in ease of use is worth it."
                amazonUrl="https://www.amazon.co.uk/dp/B0CB661NZP?tag=whattosow21-21"
                position="seed-kit-detail-cd60-trays"
                tip="Also available in CD30 (bigger cells) and CD15 (big seeds like beans and squash)."
              />
              <GearPick
                name="Full-size seed trays with drainage"
                price="~£8 for 5"
                badge="budget"
                description="If you're sowing a lot of one thing (like lettuce or spring onions), open trays are cheaper. Scatter sow, then prick out into modules once they're big enough. More faff, but you get more plants per tray."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=standard+seed+trays+with+drainage"
                position="seed-kit-detail-open-seed-trays"
              />
              <GearPick
                name="9cm square pots"
                price="~£6 for 20"
                badge="essential"
                description="For bigger seeds — courgettes, squash, sweetcorn, beans. These need more root room from the start. 9cm pots are the perfect size: big enough for the seedling to develop a proper root system before planting out."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=9cm+square+plant+pots"
                position="seed-kit-detail-9cm-pots"
                tip="Also useful for potting on seedlings from modules."
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
                tip="One 20L bag does about 10 full trays — it goes further than you'd think."
              />
              <GearPick
                name="Multi-purpose compost"
                price="~£6 for 40L"
                description="Fine for large seeds (beans, squash, sweetcorn) and for potting on. Not ideal for small seeds. When potting on, mix in some perlite for drainage if it feels heavy and wet."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=peat+free+multi+purpose+compost"
                position="seed-kit-detail-multipurpose-compost"
              />
              <GearPick
                name="Vermiculite"
                price="~£5 for 10L"
                description="A light covering over surface-sown seeds keeps them moist without burying them. Also brilliant for mixing into compost to improve drainage. Not essential, but useful to have around."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=vermiculite+for+seed+sowing"
                position="seed-kit-detail-vermiculite"
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
                name="Clear propagator lids"
                price="~£6 for 5"
                badge="essential"
                description="Plastic lids that sit on standard seed trays. Trap moisture and warmth, creating a mini greenhouse effect. Remove as soon as seeds germinate — seedlings need air circulation or they'll dampen off."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=propagator+lids+for+seed+trays"
                position="seed-kit-detail-propagator-lids"
                tip="Cling film over a tray does the same job in a pinch."
              />
              <GearPick
                name="Garland One Top heated propagator"
                price="~£25"
                badge="upgrade"
                description="A small electric mat in the base that provides consistent bottom heat (around 22–25°C). The Garland One Top is the one everyone recommends — simple, reliable, fits a standard tray. Worth it for peppers, chillies, and aubergines — they need warmth to germinate and a cold windowsill at night can stall them for weeks."
                amazonUrl="https://www.amazon.co.uk/dp/B015WFRWUI?tag=whattosow21-21"
                position="seed-kit-detail-heated-propagator"
                tip="Not necessary for tomatoes, lettuce, or anything hardy — just the heat-lovers."
              />
              <GearPick
                name="Heat mat"
                price="£12–20"
                badge="budget"
                description="A flexible heating pad you put under your trays. Does the same job as a heated propagator but cheaper, and you can use your own trays and lids. Look for ones with a thermostat — without one they can run too hot."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=seedling+heat+mat+thermostat+UK"
                position="seed-kit-detail-heat-mat"
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
              <GearPick
                name="Small watering can with fine rose"
                price="~£8"
                badge="our-pick"
                description="A 1–2 litre can with a fine brass rose gives a gentle shower that won't flatten seedlings. Much better than using a jug or mug. The Haws Indoor can is beautiful if you want to treat yourself, but any small can with a rose works."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=small+watering+can+fine+rose+indoor"
                position="seed-kit-detail-watering-can"
              />
              <GearPick
                name="Spray bottle"
                price="~£3"
                badge="budget"
                description="A fine mist spray bottle is handy for misting the surface of seed trays and freshly pricked-out seedlings. Gentler than any watering can. Get one from the pound shop."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=fine+mist+spray+bottle+plants"
                position="seed-kit-detail-spray-bottle"
              />
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
              <GearPick
                name="White plastic plant labels"
                price="~£3 for 50"
                badge="essential"
                description="Cheap, simple, effective. Write the variety and date sown on each one. Buy more than you think you need."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=white+plastic+plant+labels"
                position="seed-kit-detail-plant-labels"
                tip="Always use a pencil, not a marker — markers fade in sunlight within weeks."
              />
              <GearPick
                name="Wooden lolly stick labels"
                price="~£3 for 100"
                badge="budget"
                description="Biodegradable alternative. Work fine for indoor seedlings. They can go a bit mouldy in damp conditions outdoors, but for the windowsill they're great."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=wooden+plant+labels"
                position="seed-kit-detail-wooden-labels"
              />
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
              <GearPick
                name="LED grow light strip"
                price="£15–25"
                badge="upgrade"
                description="A simple LED strip on a timer gives seedlings consistent light without the leggy stretch you get on a windowsill. Not essential if you have a good south-facing window, but a game-changer if you don't. Set it 5–10cm above the seedlings and run it for 14–16 hours a day."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=LED+grow+light+strip+seedlings"
                position="seed-kit-detail-grow-light"
                tip="Look for full-spectrum or 6500K — avoid the purple/pink ones, they're designed for flowering plants."
              />
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
              <GearPick
                name="1-litre pots"
                price="~£6 for 20"
                description="The next step up from modules for most seedlings. Tomatoes, peppers, and courgettes will spend a few weeks in these before planting out or moving up again."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=1+litre+plant+pots+plastic"
                position="seed-kit-detail-one-litre-pots"
              />
              <GearPick
                name="Perlite"
                price="~£6 for 10L"
                description="Mix a handful into your potting compost to improve drainage and aeration. Particularly useful if your multi-purpose compost feels heavy and waterlogged. Not essential, but cheap and makes a noticeable difference."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=perlite+for+plants"
                position="seed-kit-detail-perlite"
              />
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
