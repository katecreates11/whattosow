import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TipBox, WarningBox, GuideHero, BugIcon, PullQuote, SectionDivider, FullBleedSection, InThisGuide, TopicCard, GuideImage } from "@/components/GuideVisuals";

export const metadata: Metadata = {
  title:
    "Common Garden Pests & Diseases UK — Organic Control Guide | What To Sow",
  description:
    "Practical guide to the most common UK allotment pests and diseases. Slugs, aphids, carrot fly, blight, and more — with organic control methods that actually work.",
  keywords: [
    "garden pests UK",
    "allotment pests",
    "slugs allotment",
    "blight tomatoes UK",
    "organic pest control",
    "companion planting pests",
    "carrot fly barrier",
    "cabbage white butterfly netting",
    "powdery mildew courgettes",
    "clubroot brassicas",
    "aphids broad beans",
  ],
  openGraph: {
    title: "Common Garden Pests & Diseases — Organic Control Guide",
    description:
      "The most common UK allotment pests and diseases, and the organic methods that actually work against them.",
    type: "article",
    url: "https://whattosow.co.uk/guides/pests",
  },
  alternates: {
    canonical: "/guides/pests",
  },
};

export default function PestsGuide() {
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
        name: "Pests & Diseases",
        item: "https://whattosow.co.uk/guides/pests",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best way to get rid of slugs on an allotment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A combination of methods works best. Go out after dark with a torch and pick them off by hand. Set beer traps (sunk into the soil so the rim is at ground level). Apply wool pellets or copper tape around vulnerable plants. For heavy infestations, biological control with nematodes (Nemaslug) is very effective — water them onto warm, moist soil in spring and autumn.",
        },
      },
      {
        "@type": "Question",
        name: "How do I stop carrot fly without chemicals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Carrot fly is a low flyer — it stays below about 60cm. A barrier of fine mesh or fleece at least 60cm tall around your carrot bed blocks them completely. You can also companion plant with spring onions or chives, whose scent masks the carrot smell. Resistant varieties like Flyaway and Resistafly also help, and sowing thinly means less thinning, which reduces the scent that attracts them.",
        },
      },
      {
        "@type": "Question",
        name: "What does blight look like on tomatoes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Blight starts as brown patches on the leaves, often at the tips and edges, sometimes with a white fuzzy growth underneath in humid conditions. It spreads fast — leaves go brown and crispy, stems develop dark lesions, and fruits get brown, firm patches that quickly rot. It's worse in warm, humid weather (the classic 'Smith Period' conditions). If you catch it early, remove affected leaves immediately. In severe cases, harvest whatever you can and remove the plants entirely.",
        },
      },
      {
        "@type": "Question",
        name: "Is organic pest control effective?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, but it requires a different mindset. Organic pest control focuses on prevention — healthy soil, crop rotation, companion planting, physical barriers, and encouraging natural predators like ladybirds, hoverflies, and ground beetles. It won't give you supermarket-perfect produce, but it builds a healthier growing environment over time. Most experienced allotment growers find they lose far less to pests after a few years of organic management, once the natural balance establishes itself.",
        },
      },
      {
        "@type": "Question",
        name: "How do I stop cabbage white butterflies eating my brassicas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cover your brassicas with fine mesh netting (such as Enviromesh) from the moment you plant them out. Make sure there are no gaps — butterflies will find them. If you spot eggs (small yellow clusters on the underside of leaves), squash them before they hatch. Nasturtiums planted nearby can act as a trap crop, luring butterflies away from your actual brassicas.",
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
      <Header backLink={{ href: "/guides", label: "\u2190 Guides" }} />
      <main id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <GuideHero
          eyebrow="Growing guide"
          title="Common pests & diseases"
          subtitle="Every allotment has them. Slugs, aphids, blight — they come with the territory. The good news is that most problems are manageable without reaching for chemicals."
          icon={<BugIcon className="w-10 h-10" />}
          color="tomato"
        />

        <InThisGuide items={[
          { label: "Prevention first", anchor: "prevention" },
          { label: "Slugs & snails", anchor: "slugs" },
          { label: "Aphids", anchor: "aphids" },
          { label: "Carrot fly", anchor: "carrot-fly" },
          { label: "Cabbage white", anchor: "cabbage-white" },
          { label: "Blight", anchor: "blight" },
          { label: "Powdery mildew", anchor: "mildew" },
          { label: "Clubroot", anchor: "clubroot" },
          { label: "Organic vs chemical", anchor: "organic" },
        ]} />

        <div className="space-y-12 text-earth-light leading-relaxed">
          {/* Prevention first */}
          <section id="prevention">
            <h2 className="text-xl font-semibold text-earth mb-3">
              Prevention beats cure
            </h2>
            <div className="space-y-3">
              <p>
                Before we get into specific pests, the single most useful thing
                you can do is build an environment that&apos;s naturally
                resistant. Healthy plants on healthy soil shrug off problems that
                would flatten a stressed crop.
              </p>
              <ul className="list-disc list-inside space-y-2 text-earth-light">
                <li>
                  <strong className="text-earth">Feed the soil.</strong> Compost,
                  manure, leaf mould &mdash; strong soil grows strong plants.
                </li>
                <li>
                  <strong className="text-earth">Rotate your crops.</strong>{" "}
                  Don&apos;t grow the same family in the same spot year after
                  year. Pests and diseases build up in the soil when you do.
                </li>
                <li>
                  <strong className="text-earth">Encourage predators.</strong>{" "}
                  Ladybirds, hoverflies, ground beetles, frogs, hedgehogs
                  &mdash; they all eat pests. Give them habitat: log piles, long
                  grass margins, a small pond.
                </li>
                <li>
                  <strong className="text-earth">Companion plant.</strong>{" "}
                  Marigolds, nasturtiums, and herbs can confuse or repel pests.
                  See our{" "}
                  <a
                    href="/guides/companion-planting"
                    className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
                  >
                    companion planting guide
                  </a>{" "}
                  for the full list.
                </li>
              </ul>
            </div>
          </section>

          <PullQuote>
            Healthy plants on healthy soil shrug off problems that would flatten a stressed crop.
          </PullQuote>

          <SectionDivider label="The big hitters" />

          {/* The big hitters */}
          <section id="slugs">
            <h2 className="text-xl font-semibold text-earth mb-6">
              The big hitters
            </h2>
            <div className="space-y-6">
              {/* Slugs & snails */}
              <TopicCard
                title="Slugs & snails"
                image="/images/guides/slug.webp"
                imageAlt="Close-up of a garden slug on soil"
                level="high"
              >
                <p className="text-sm mb-3">
                  The number one pest on UK allotments, bar none. They work at
                  night, love wet weather, and can demolish a row of lettuce
                  seedlings in a single evening. Brassica seedlings, lettuce,
                  beans, and hostas are their favourites &mdash; anything young
                  and tender.
                </p>
                <p className="text-sm font-semibold text-earth mb-1">
                  What works
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    <strong className="text-earth">Evening patrols.</strong> Go
                    out after dark with a torch. Pick them off and relocate them
                    (or don&apos;t &mdash; your call). Easily the most effective
                    method.
                  </li>
                  <li>
                    <strong className="text-earth">Beer traps.</strong> Sink a
                    container into the soil so the rim is at ground level. Fill
                    with cheap beer. They&apos;re attracted to the yeast and
                    drown. Empty and refill every few days.
                  </li>
                  <li>
                    <strong className="text-earth">Nematodes.</strong> Biological
                    control (Nemaslug). Water onto warm, moist soil in spring and
                    autumn. Very effective for underground slugs that you never
                    see.
                  </li>
                  <li>
                    <strong className="text-earth">Wool pellets.</strong> Create
                    a scratchy barrier around plants. They also add nutrients as
                    they break down.
                  </li>
                  <li>
                    <strong className="text-earth">Copper tape.</strong> Around
                    raised beds and pots. Gives slugs a mild electric shock on
                    contact.
                  </li>
                </ul>
                <TipBox title="The slug strategy">
                  No single method will solve slugs. Use several at once &mdash;
                  barriers plus patrols plus nematodes is a strong combination.
                  And accept that you&apos;ll still lose a few seedlings. Sow
                  extras.
                </TipBox>
              </TopicCard>

              {/* Aphids */}
              <TopicCard
                title="Aphids (greenfly & blackfly)"
                image="/images/guides/aphids.webp"
                imageAlt="Macro photograph of a green aphid on a leaf"
                level="medium"
              >
                <p className="text-sm mb-3">
                  Tiny sap-sucking insects that cluster on soft new growth. Greenfly
                  go for almost anything. Blackfly are notorious on broad beans
                  &mdash; they mass on the growing tips from late spring onward.
                  Heavy infestations weaken plants and can spread viruses.
                </p>
                <p className="text-sm font-semibold text-earth mb-1">
                  What works
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    <strong className="text-earth">Pinch out broad bean tips.</strong>{" "}
                    Once the lowest pods are setting, nip out the top 5cm of each
                    plant. That&apos;s where blackfly congregate. Bonus: it
                    redirects energy to the pods.
                  </li>
                  <li>
                    <strong className="text-earth">Encourage ladybirds.</strong>{" "}
                    A single ladybird can eat 50 aphids a day. Leave some rough
                    areas, dead stems, and log piles for overwintering habitat.
                  </li>
                  <li>
                    <strong className="text-earth">Companion plant.</strong>{" "}
                    Nasturtiums attract aphids away from your crops (a trap
                    crop). Marigolds repel them. Both are worth growing nearby.
                  </li>
                  <li>
                    <strong className="text-earth">Blast with water.</strong> A
                    strong jet from a hose knocks aphids off and most
                    don&apos;t climb back.
                  </li>
                </ul>
              </TopicCard>

              {/* Carrot fly */}
              <TopicCard title="Carrot fly" level="medium">
                <p className="text-sm mb-3">
                  A low-flying pest that&apos;s attracted to the scent of carrot
                  foliage &mdash; especially when you thin seedlings. The larvae
                  tunnel into roots, leaving rusty brown channels. Parsnips and
                  celery are also targets.
                </p>
                <p className="text-sm font-semibold text-earth mb-1">
                  What works
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    <strong className="text-earth">60cm barrier.</strong> Carrot
                    fly stays below 60cm. A barrier of fine mesh or fleece around
                    your carrot bed blocks them completely. This is the most
                    reliable method.
                  </li>
                  <li>
                    <strong className="text-earth">Companion plant.</strong> Grow
                    spring onions or chives alongside carrots. The onion scent
                    masks the carrot smell.
                  </li>
                  <li>
                    <strong className="text-earth">Resistant varieties.</strong>{" "}
                    Flyaway and Resistafly were bred specifically for carrot fly
                    resistance. Not immune, but a real improvement.
                  </li>
                  <li>
                    <strong className="text-earth">Sow thinly.</strong> Less
                    thinning means less scent released. If you do thin, do it on
                    a still evening and water afterward to settle the smell.
                  </li>
                </ul>
              </TopicCard>

              {/* Cabbage white butterfly */}
              <TopicCard
                title="Cabbage white butterfly"
                image="/images/guides/caterpillar.webp"
                imageAlt="Green caterpillar on a leaf"
                level="medium"
              >
                <p className="text-sm mb-3">
                  The green caterpillars of the large and small cabbage white
                  butterfly can strip brassica plants to skeletons. They lay
                  clusters of yellow eggs on the underside of leaves from late
                  spring through summer.
                </p>
                <p className="text-sm font-semibold text-earth mb-1">
                  What works
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    <strong className="text-earth">Fine mesh netting.</strong>{" "}
                    Cover brassicas from the day you plant them out. Enviromesh
                    or similar &mdash; keep it sealed at the edges, no gaps. This
                    is the only truly reliable method.
                  </li>
                  <li>
                    <strong className="text-earth">Check for eggs.</strong>{" "}
                    Inspect the underside of leaves weekly. Squash any yellow egg
                    clusters before they hatch.
                  </li>
                  <li>
                    <strong className="text-earth">Nasturtiums as trap crop.</strong>{" "}
                    Plant them nearby to lure butterflies away from your brassicas.
                  </li>
                </ul>
              </TopicCard>

              {/* Blight */}
              <TopicCard title="Blight" level="high">
                <p className="text-sm mb-3">
                  The big one for tomato and potato growers. Caused by a
                  water-mould (Phytophthora infestans) that thrives in warm,
                  humid weather &mdash; a stretch of muggy days in July or August
                  is classic blight weather. Brown patches appear on leaves,
                  spreading fast. Stems develop dark lesions and fruits rot.
                </p>
                <p className="text-sm font-semibold text-earth mb-1">
                  What works
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    <strong className="text-earth">Resistant varieties.</strong>{" "}
                    For tomatoes: Crimson Crush, Mountain Magic, Losetto. For
                    potatoes: Sarpo Mira, Sarpo Axona, Carolus. Resistance is the
                    best defence.
                  </li>
                  <li>
                    <strong className="text-earth">Remove affected foliage fast.</strong>{" "}
                    At the first sign, strip off and bin (not compost) any
                    affected leaves. With potatoes, cut all the foliage to the
                    ground and leave tubers in the soil for two weeks before
                    harvesting.
                  </li>
                  <li>
                    <strong className="text-earth">Improve airflow.</strong>{" "}
                    Space plants generously. Remove lower leaves on tomatoes.
                    Grow outdoor tomatoes against a south-facing wall where air
                    circulates freely.
                  </li>
                  <li>
                    <strong className="text-earth">Copper-based sprays.</strong>{" "}
                    Bordeaux mixture is the traditional organic option, applied
                    preventatively before blight arrives. A last resort &mdash;
                    resistant varieties and good practice are better.
                  </li>
                </ul>
                <WarningBox title="Blight watch">
                  Check the Blightwatch forecast at the start of each summer.
                  It tracks weather conditions that favour blight so you can
                  act before it hits. Once you see brown patches on leaves,
                  remove affected foliage immediately.
                </WarningBox>
              </TopicCard>

              {/* Powdery mildew */}
              <TopicCard title="Powdery mildew" level="low">
                <p className="text-sm mb-3">
                  A white, powdery coating on leaves &mdash; particularly common
                  on courgettes, squash, and cucumbers from midsummer onward. It
                  looks alarming but plants usually keep producing. Stress,
                  overcrowding, and dry roots with damp foliage make it worse.
                </p>
                <p className="text-sm font-semibold text-earth mb-1">
                  What works
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    <strong className="text-earth">Water at the roots.</strong>{" "}
                    Keep foliage as dry as possible. Water in the morning so
                    plants dry out during the day.
                  </li>
                  <li>
                    <strong className="text-earth">Space plants out.</strong>{" "}
                    Good air circulation is the best prevention. Don&apos;t crowd
                    courgettes &mdash; they need more room than you&apos;d think.
                  </li>
                  <li>
                    <strong className="text-earth">Remove affected leaves.</strong>{" "}
                    Pick off the worst leaves to slow the spread. The plant will
                    often keep cropping regardless.
                  </li>
                </ul>
              </TopicCard>

              {/* Clubroot */}
              <TopicCard title="Clubroot" level="high">
                <p className="text-sm mb-3">
                  A soil-borne disease that causes swollen, distorted roots in
                  brassicas &mdash; cabbages, broccoli, cauliflower, kale.
                  Affected plants wilt on hot days even when the soil is moist.
                  Once clubroot is in the soil, it can persist for 20 years.
                  Prevention is everything.
                </p>
                <p className="text-sm font-semibold text-earth mb-1">
                  What works
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    <strong className="text-earth">Raise soil pH.</strong>{" "}
                    Clubroot thrives in acidic soil. Lime your brassica bed in
                    autumn to bring the pH up to 7.0&ndash;7.5.
                  </li>
                  <li>
                    <strong className="text-earth">Start in pots.</strong> Grow
                    brassica seedlings in modules with fresh compost, and plant
                    out when they have a strong root system. This gives them a
                    head start.
                  </li>
                  <li>
                    <strong className="text-earth">Crop rotation.</strong> Don&apos;t
                    grow brassicas in the same bed more than once every four
                    years. See our{" "}
                    <a
                      href="/guides/crop-rotation"
                      className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
                    >
                      crop rotation guide
                    </a>
                    .
                  </li>
                  <li>
                    <strong className="text-earth">Improve drainage.</strong>{" "}
                    Waterlogged soil makes clubroot worse. Raised beds help on
                    heavy clay sites.
                  </li>
                </ul>
              </TopicCard>
            </div>
          </section>

          <FullBleedSection color="earth">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                Organic vs chemical
              </h2>
              <div className="space-y-3 text-white/80">
                <p>
                  This guide is deliberately biased toward organic methods. Not
                  because chemicals never work &mdash; they often do, in the short
                  term &mdash; but because on an allotment, you&apos;re building a
                  long-term ecosystem. Chemicals that kill aphids also kill
                  ladybirds. Slug pellets with metaldehyde poison hedgehogs and
                  birds. You solve one problem and create three more.
                </p>
                <p>
                  Organic pest control is slower. It requires patience. But after
                  two or three years of encouraging natural predators, improving
                  your soil, and rotating crops, you&apos;ll find the balance tips
                  in your favour. The plot does more of the work for you.
                </p>
              </div>
            </section>

            <section className="mt-10 pt-8 border-t border-white/10">
              <h2 className="text-xl font-semibold text-white mb-3">
                When to accept the losses
              </h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Some damage is normal. A few holes in your cabbage leaves, the
                  odd slug-nibbled lettuce, a courgette with mildew spots &mdash;
                  this is not failure. This is what real food looks like.
                  Supermarkets reject anything less than cosmetically perfect, but
                  you don&apos;t have to.
                </p>
                <p>
                  The goal is a healthy, productive plot &mdash; not a sterile
                  one. If you&apos;re harvesting armfuls of food and only losing a
                  small percentage, you&apos;re winning. Sow a bit extra, share
                  the surplus with the wildlife, and save yourself the stress of
                  trying to control every last creature on your patch.
                </p>
              </div>
            </section>
          </FullBleedSection>

          {/* FAQ */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-xl font-semibold text-earth mb-6">
              Common questions
            </h2>
            <div className="space-y-6">
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  What is the best way to get rid of slugs on an allotment?
                </h3>
                <p className="text-sm">
                  Use multiple methods together: evening patrols with a torch,
                  beer traps sunk into the soil, wool pellets or copper tape
                  around vulnerable plants, and nematodes (Nemaslug) watered
                  onto warm, moist soil in spring and autumn. No single method
                  solves slugs &mdash; a combination is key.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  How do I stop carrot fly without chemicals?
                </h3>
                <p className="text-sm">
                  A 60cm-tall barrier of fine mesh around your carrot bed is the
                  most reliable method &mdash; carrot fly stays low to the
                  ground. Companion planting with spring onions helps mask the
                  scent. Resistant varieties like Flyaway and Resistafly offer
                  extra protection.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  What does blight look like on tomatoes?
                </h3>
                <p className="text-sm">
                  Brown patches on leaves, often at the tips and edges, sometimes
                  with white fuzzy growth underneath in humid conditions. It
                  spreads fast &mdash; leaves go brown and crispy, stems develop
                  dark lesions, and fruits get firm brown patches that rot.
                  Remove affected growth immediately and consider blight-resistant
                  varieties for next year.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  Is organic pest control effective?
                </h3>
                <p className="text-sm">
                  Yes, but it takes a different approach. Focus on prevention
                  &mdash; healthy soil, crop rotation, physical barriers, and
                  encouraging natural predators. You won&apos;t get
                  supermarket-perfect produce, but after a few years of organic
                  management, pest damage drops significantly as the natural
                  balance establishes itself.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  How do I stop cabbage white butterflies eating my brassicas?
                </h3>
                <p className="text-sm">
                  Fine mesh netting (Enviromesh or similar) from the day you
                  plant out is the only truly reliable method. Seal it at the
                  edges &mdash; butterflies will find any gaps. Check leaf
                  undersides weekly for yellow egg clusters and squash them
                  before they hatch.
                </p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-xl font-semibold text-earth mb-4">
              Next steps
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="/guides/companion-planting"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Companion planting &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Flowers that deter pests.
                </p>
              </a>
              <a
                href="/guides/crop-rotation"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Crop rotation &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Break pest cycles.
                </p>
              </a>
              <a
                href="/guides/soil"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Healthy soil &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Healthy soil = healthy plants.
                </p>
              </a>
              <a
                href="/"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  What to sow this week &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Personalised to your postcode.
                </p>
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
