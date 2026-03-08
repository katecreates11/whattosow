import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TipBox, WarningBox, ProcessDiagram, GuideHero, PullQuote, SectionDivider, RotationIcon } from "@/components/GuideVisuals";

export const metadata: Metadata = {
  title:
    "Crop Rotation Plan UK — 4 Year Vegetable Rotation Guide | What To Sow",
  description:
    "Simple 4-year crop rotation plan for UK allotments and veg patches. Learn which vegetables follow which, why rotation matters, and how to make it work on small plots.",
  keywords: [
    "crop rotation plan",
    "4 year crop rotation",
    "vegetable rotation UK",
    "allotment crop rotation",
    "crop rotation chart",
    "vegetable plot rotation",
    "crop rotation groups",
    "crop rotation for beginners",
  ],
  openGraph: {
    title: "Crop Rotation Plan — 4 Year Vegetable Rotation Guide",
    description:
      "Simple 4-year crop rotation plan for UK allotments. Which vegetables follow which, and why it matters.",
    type: "article",
    url: "https://whattosow.co.uk/guides/crop-rotation",
  },
  alternates: {
    canonical: "/guides/crop-rotation",
  },
};

export default function CropRotationGuide() {
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
        name: "Guides",
        item: "https://whattosow.co.uk/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Crop Rotation",
        item: "https://whattosow.co.uk/guides/crop-rotation",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why is crop rotation important?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Crop rotation prevents soil-borne diseases from building up, balances soil nutrients naturally, and breaks pest life cycles. Growing the same crop family in the same spot year after year depletes specific nutrients and allows diseases like clubroot and white rot to accumulate.",
        },
      },
      {
        "@type": "Question",
        name: "What are the 4 crop rotation groups?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The four groups are: Legumes (peas, beans), Brassicas (cabbage, broccoli, kale, cauliflower), Roots (carrots, parsnips, beetroot), and Alliums & Others (onions, garlic, potatoes, squash). Each group moves to the next bed each year in a four-year cycle.",
        },
      },
      {
        "@type": "Question",
        name: "Do potatoes and tomatoes count as the same family for rotation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Potatoes and tomatoes are both in the Solanaceae (nightshade) family and share diseases like blight. They should not follow each other in your rotation. Peppers and aubergines are also nightshades.",
        },
      },
      {
        "@type": "Question",
        name: "Can I do crop rotation in raised beds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, but if you only have one or two beds, a strict four-year rotation is difficult. Focus on never growing the same family in the same spot two years running, and prioritise rotating brassicas and alliums, which are most vulnerable to soil-borne diseases like clubroot and white rot.",
        },
      },
      {
        "@type": "Question",
        name: "Which crops don't need to be rotated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Permanent crops like asparagus, rhubarb, and perennial herbs (rosemary, thyme, sage) stay in one place for years. These are best given their own dedicated patch outside your rotation beds.",
        },
      },
    ],
  };

  const rotationGroups = [
    {
      name: "Legumes",
      color: "bg-allotment-bg/40",
      crops: [
        { name: "Peas", slug: "peas" },
        { name: "Broad beans", slug: "broad-beans" },
        { name: "Runner beans", slug: "runner-beans" },
        { name: "French beans", slug: "french-beans" },
      ],
      note: "Fix nitrogen in the soil",
    },
    {
      name: "Brassicas",
      color: "bg-sky-50",
      crops: [
        { name: "Cabbage", slug: "cabbage" },
        { name: "Broccoli", slug: "broccoli" },
        { name: "Kale", slug: "kale" },
        { name: "Cauliflower", slug: "cauliflower" },
        { name: "Brussels sprouts", slug: "brussels-sprouts" },
      ],
      note: "Follow legumes for nitrogen",
    },
    {
      name: "Roots",
      color: "bg-amber-50/60",
      crops: [
        { name: "Carrots", slug: "carrots" },
        { name: "Parsnips", slug: "parsnips" },
        { name: "Beetroot", slug: "beetroot" },
        { name: "Turnips", slug: "turnips" },
      ],
      note: "Light feeders, break up soil",
    },
    {
      name: "Alliums & others",
      color: "bg-purple-50/50",
      crops: [
        { name: "Onions", slug: "onions" },
        { name: "Garlic", slug: "garlic" },
        { name: "Leeks", slug: "leeks" },
        { name: "Potatoes", slug: "potatoes" },
        { name: "Squash", slug: "squash" },
      ],
      note: "Heavy feeders, add compost",
    },
  ];

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
      <Header backLink={{ href: "/guides", label: "\u2190 Guides" }} />
      <main id="main-content">
        <GuideHero
          eyebrow="Growing guide"
          title="Crop rotation for allotments"
          subtitle="Move your vegetables around so the same family doesn't grow in the same spot two years running. Here's the simple system."
          icon={<RotationIcon className="w-10 h-10" />}
          color="allotment"
        />

        <div className="space-y-12 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Why rotate */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Why bother rotating?
            </h2>
            <div className="space-y-3">
              <p>
                Every vegetable family takes different nutrients from the soil
                and leaves different problems behind. Growing{" "}
                <a
                  href="/crops/cabbage"
                  className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
                >
                  cabbages
                </a>{" "}
                in the same bed year after year lets clubroot spores build up
                in the soil. Once it&apos;s there, it can persist for 20 years.
                The same goes for white rot with{" "}
                <a
                  href="/crops/onions"
                  className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
                >
                  onions
                </a>{" "}
                and blight with{" "}
                <a
                  href="/crops/potatoes"
                  className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
                >
                  potatoes
                </a>
                .
              </p>
              <p>Rotation solves three problems at once:</p>
              <ul className="list-disc list-inside space-y-2 text-earth-light">
                <li>
                  <strong className="text-earth">Disease prevention</strong>{" "}
                  &mdash; soil-borne pathogens can&apos;t build up when their
                  host crops keep moving
                </li>
                <li>
                  <strong className="text-earth">Balanced nutrients</strong>{" "}
                  &mdash; legumes add nitrogen, brassicas use it, roots are
                  light feeders. Moving them around keeps the soil in balance
                </li>
                <li>
                  <strong className="text-earth">Better yields</strong>{" "}
                  &mdash; crops grown in fresh ground consistently outperform
                  those planted in tired soil
                </li>
              </ul>
            </div>
          </section>

          <PullQuote>
            Once clubroot gets in your soil, it can persist for 20 years. Rotation is your best defence.
          </PullQuote>

          <SectionDivider label="The system" />

          {/* The four groups */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              The four rotation groups
            </h2>
            <p className="mb-6">
              Split your vegetables into four families. Each group follows the
              other around your plot in a four-year cycle. If you have four
              beds, each group gets a bed. If you have one bed, divide it into
              quarters.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rotationGroups.map((group) => (
                <div
                  key={group.name}
                  className={`border border-earth/6 p-4 ${group.color}`}
                >
                  <h3 className="font-semibold text-earth mb-2">
                    {group.name}
                  </h3>
                  <ul className="space-y-1 text-sm mb-3">
                    {group.crops.map((crop) => (
                      <li key={crop.slug}>
                        <a
                          href={`/crops/${crop.slug}`}
                          className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
                        >
                          {crop.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-earth-lighter italic">
                    {group.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How the cycle works */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              How the 4-year cycle works
            </h2>
            <p className="mb-4">
              The order matters. Legumes go first because they fix nitrogen in
              the soil. Brassicas follow because they&apos;re hungry for
              nitrogen. Roots come next as light feeders that benefit from the
              residual fertility. Alliums and potatoes round it off, and
              you&apos;d typically add compost or manure before this group to
              reset the bed.
            </p>

            <ProcessDiagram steps={[
              { label: "Legumes", detail: "Fix nitrogen in soil" },
              { label: "Brassicas", detail: "Use that nitrogen" },
              { label: "Roots", detail: "Light feeders" },
              { label: "Alliums", detail: "Add compost, reset" },
            ]} />

            {/* Rotation chart */}
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-[500px] px-4 sm:px-0">
                <div className="grid grid-cols-5 text-xs text-center">
                  {/* Header */}
                  <div className="p-2 font-semibold text-earth border border-earth/6 bg-earth/3">
                    Bed
                  </div>
                  <div className="p-2 font-semibold text-earth border border-earth/6 bg-earth/3">
                    Year 1
                  </div>
                  <div className="p-2 font-semibold text-earth border border-earth/6 bg-earth/3">
                    Year 2
                  </div>
                  <div className="p-2 font-semibold text-earth border border-earth/6 bg-earth/3">
                    Year 3
                  </div>
                  <div className="p-2 font-semibold text-earth border border-earth/6 bg-earth/3">
                    Year 4
                  </div>

                  {/* Bed A */}
                  <div className="p-2 font-medium text-earth border border-earth/6">A</div>
                  <div className="p-2 border border-earth/6 bg-allotment-bg/40">Legumes</div>
                  <div className="p-2 border border-earth/6 bg-sky-50">Brassicas</div>
                  <div className="p-2 border border-earth/6 bg-amber-50/60">Roots</div>
                  <div className="p-2 border border-earth/6 bg-purple-50/50">Alliums &amp; others</div>

                  {/* Bed B */}
                  <div className="p-2 font-medium text-earth border border-earth/6">B</div>
                  <div className="p-2 border border-earth/6 bg-purple-50/50">Alliums &amp; others</div>
                  <div className="p-2 border border-earth/6 bg-allotment-bg/40">Legumes</div>
                  <div className="p-2 border border-earth/6 bg-sky-50">Brassicas</div>
                  <div className="p-2 border border-earth/6 bg-amber-50/60">Roots</div>

                  {/* Bed C */}
                  <div className="p-2 font-medium text-earth border border-earth/6">C</div>
                  <div className="p-2 border border-earth/6 bg-amber-50/60">Roots</div>
                  <div className="p-2 border border-earth/6 bg-purple-50/50">Alliums &amp; others</div>
                  <div className="p-2 border border-earth/6 bg-allotment-bg/40">Legumes</div>
                  <div className="p-2 border border-earth/6 bg-sky-50">Brassicas</div>

                  {/* Bed D */}
                  <div className="p-2 font-medium text-earth border border-earth/6">D</div>
                  <div className="p-2 border border-earth/6 bg-sky-50">Brassicas</div>
                  <div className="p-2 border border-earth/6 bg-amber-50/60">Roots</div>
                  <div className="p-2 border border-earth/6 bg-purple-50/50">Alliums &amp; others</div>
                  <div className="p-2 border border-earth/6 bg-allotment-bg/40">Legumes</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-earth-lighter mt-3">
              In year 5, you&apos;re back to year 1. The cycle repeats.
            </p>
          </section>

          {/* Permanent crops */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Crops that stay put
            </h2>
            <p className="mb-4">
              Not everything rotates. Perennial crops live in the same spot for
              years and should have their own dedicated patch, outside your
              rotation beds.
            </p>
            <div className="bg-allotment-bg/30 p-4 text-sm text-earth-light">
              <p className="font-semibold text-earth mb-2">
                Permanent crops (no rotation needed):
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Asparagus &mdash; stays productive for 15&ndash;20 years in one spot</li>
                <li>Rhubarb &mdash; give it a corner and leave it alone</li>
                <li>Perennial herbs (rosemary, thyme, sage, mint, chives)</li>
                <li>Strawberries &mdash; replace every 3&ndash;4 years, but not part of the main rotation</li>
              </ul>
            </div>
          </section>

          <SectionDivider label="Common pitfalls" />

          {/* Common mistakes */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Common mistakes
            </h2>
            <div className="space-y-4">
              <div className="border border-earth/6 p-4">
                <h3 className="font-semibold text-earth mb-1">
                  Forgetting that tomatoes are nightshades
                </h3>
                <p className="text-sm">
                  <a
                    href="/crops/tomatoes"
                    className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
                  >
                    Tomatoes
                  </a>
                  ,{" "}
                  <a
                    href="/crops/potatoes"
                    className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
                  >
                    potatoes
                  </a>
                  , peppers, and aubergines are all in the same family
                  (Solanaceae). They share blight and should be treated as one
                  group for rotation purposes. Growing tomatoes where potatoes
                  were last year defeats the point.
                </p>
              </div>
              <div className="border border-earth/6 p-4">
                <h3 className="font-semibold text-earth mb-1">
                  Putting potatoes in the same spot every year
                </h3>
                <p className="text-sm">
                  Potatoes are the crop most people forget to rotate. They&apos;re
                  susceptible to eelworm and blight, both of which build up in
                  the soil. Move them every year without fail.
                </p>
              </div>
              <div className="border border-earth/6 p-4">
                <h3 className="font-semibold text-earth mb-1">
                  Ignoring brassica volunteers
                </h3>
                <p className="text-sm">
                  That self-seeded{" "}
                  <a
                    href="/crops/kale"
                    className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
                  >
                    kale
                  </a>{" "}
                  or sprouting broccoli from last year? It&apos;s still a
                  brassica sitting in the brassica bed, keeping clubroot happy.
                  Pull it out if it&apos;s in the wrong rotation spot.
                </p>
              </div>
              <div className="border border-earth/6 p-4">
                <h3 className="font-semibold text-earth mb-1">
                  Being too rigid
                </h3>
                <p className="text-sm">
                  A perfect four-year rotation is the ideal. Real allotments
                  are messy. If you can&apos;t manage four groups, even
                  alternating between two &mdash; legumes/roots one year,
                  brassicas/alliums the next &mdash; is better than no rotation
                  at all.
                </p>
              </div>
            </div>
          </section>

          {/* Small plots */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Making it work on small plots
            </h2>
            <div className="space-y-3">
              <p>
                If you&apos;ve got a single raised bed or a tiny back garden
                patch, a full four-bed rotation isn&apos;t realistic. Here&apos;s
                how to adapt:
              </p>
              <ul className="list-disc list-inside space-y-2 text-earth-light">
                <li>
                  <strong className="text-earth">Divide mentally, not physically.</strong>{" "}
                  Split one bed into four quarters and rotate within it. It&apos;s
                  not as effective as separate beds, but it still helps
                </li>
                <li>
                  <strong className="text-earth">Prioritise the vulnerable crops.</strong>{" "}
                  Brassicas and alliums suffer most from soil-borne disease.
                  If you can only rotate two groups, make it those
                </li>
                <li>
                  <strong className="text-earth">Use containers for the gaps.</strong>{" "}
                  Grow tomatoes and potatoes in bags or large pots so they&apos;re
                  not using bed space in your rotation
                </li>
                <li>
                  <strong className="text-earth">Don&apos;t stress about lettuce and salads.</strong>{" "}
                  Quick-growing leafy crops like lettuce, spinach, and radishes
                  can slot in wherever there&apos;s space. They&apos;re not
                  building up serious soil problems
                </li>
              </ul>
            </div>
          </section>

          <TipBox title="Keep a simple record">
            The biggest barrier to crop rotation is forgetting what you grew
            where. Take a photo of each bed at the start of the season, or
            sketch a quick plan on paper. It doesn&apos;t need to be
            fancy &mdash; just enough to jog your memory in February when
            you&apos;re planning the next year.
          </TipBox>

          <WarningBox title="The nightshade trap">
            Tomatoes, potatoes, peppers, and aubergines are all in the same family.
            Growing tomatoes where your potatoes were last year defeats the point of rotation.
            Treat them as one group.
          </WarningBox>

          {/* FAQ */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-8 tracking-tight">
              Common questions
            </h2>
            <div className="space-y-6">
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
                  Why is crop rotation important?
                </h3>
                <p className="text-sm">
                  It prevents soil-borne diseases from building up, balances
                  nutrients naturally, and breaks pest life cycles. Growing the
                  same family in the same spot year after year depletes specific
                  nutrients and lets diseases like clubroot and white rot
                  accumulate.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
                  What are the 4 crop rotation groups?
                </h3>
                <p className="text-sm">
                  Legumes (peas, beans), Brassicas (cabbage, broccoli, kale),
                  Roots (carrots, parsnips, beetroot), and Alliums &amp; others
                  (onions, garlic, potatoes, squash). Each group moves to the
                  next bed each year.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
                  Do potatoes and tomatoes count as the same family?
                </h3>
                <p className="text-sm">
                  Yes. Both are nightshades (Solanaceae) and share diseases like
                  blight. They should not follow each other in your rotation.
                  Peppers and aubergines are nightshades too.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
                  Can I do crop rotation in raised beds?
                </h3>
                <p className="text-sm">
                  Yes. If you only have one or two beds, a strict four-year
                  rotation is harder, but you can divide beds into sections.
                  Focus on never growing the same family in the same spot two
                  years running, and prioritise rotating brassicas and alliums.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
                  Which crops don&apos;t need to be rotated?
                </h3>
                <p className="text-sm">
                  Permanent crops like asparagus, rhubarb, and perennial herbs
                  stay in one place for years. Give them their own dedicated
                  patch outside your rotation beds.
                </p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-6 tracking-tight">
              Related guides
            </h2>
            <div>
              <a
                href="/guides/companion-planting"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Companion planting
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    What to grow together and what to keep apart.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
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
              </a>
              <a
                href="/calendar"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Sowing calendar
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    All 40 crops across 12 months at a glance.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/guides/beginners"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Beginner&apos;s guide
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    New to growing? Start here.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
