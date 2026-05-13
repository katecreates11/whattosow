import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  TipBox,
  WarningBox,
  GuideHero,
  PullQuote,
  SectionDivider,
  GuideImage,
  ColorSection,
  InThisGuide,
} from "@/components/GuideVisuals";

export const metadata: Metadata = {
  title:
    "Growing Fruit on a UK Allotment — Best Fruit to Grow | What To Sow",
  description:
    "The best fruit to grow on a UK allotment or garden. Strawberries, raspberries, blackcurrants, gooseberries, rhubarb and more — what to plant, when, and how to get the biggest harvests.",
  keywords: [
    "best fruit to grow UK",
    "growing fruit allotment",
    "easy fruit to grow UK",
    "fruit bushes for allotment",
    "growing strawberries UK",
    "growing raspberries UK",
    "fruit garden for beginners",
    "allotment fruit",
    "soft fruit UK",
    "fruit bushes UK",
  ],
  openGraph: {
    title: "Growing Fruit on a UK Allotment — Best Fruit to Grow",
    description:
      "The best fruit for UK allotments. What to plant, when, and how to get the biggest harvests year after year.",
    type: "article",
    url: "https://whattosow.co.uk/guides/growing-fruit",
  },
  alternates: {
    canonical: "/guides/growing-fruit",
  },
};

export default function GrowingFruitGuide() {
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
        name: "Growing Fruit",
        item: "https://whattosow.co.uk/guides/growing-fruit",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the easiest fruit to grow in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Strawberries and rhubarb are the easiest fruit to grow in the UK. Strawberries produce fruit within months of planting, and rhubarb is virtually indestructible once established. Autumn-fruiting raspberries are also very easy — just cut everything down in February and they grow back and fruit the same year.",
        },
      },
      {
        "@type": "Question",
        name: "When should I plant fruit bushes in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most fruit bushes and canes are best planted between November and March while dormant. Bare-root plants are cheapest and establish best when planted in winter. Container-grown plants can be planted year-round but winter is still ideal. Strawberry runners are best planted in spring or late summer.",
        },
      },
      {
        "@type": "Question",
        name: "What fruit can I grow on an allotment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Strawberries, raspberries, blackcurrants, redcurrants, gooseberries, blackberries, and rhubarb all thrive on UK allotments. Most are hardy, low-maintenance perennials that produce fruit for 10-20 years once established. Blueberries are also possible in pots of ericaceous compost.",
        },
      },
      {
        "@type": "Question",
        name: "How long before fruit bushes produce fruit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Strawberries can fruit within 3-4 months of planting. Autumn raspberries fruit in their first year. Summer raspberries, blackcurrants, gooseberries, and redcurrants typically produce a small crop in year two and a full crop from year three onwards. Rhubarb should not be harvested in its first year.",
        },
      },
    ],
  };

  return (
    <>
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
          title="Growing fruit on your allotment"
          subtitle="Plant once, harvest for years. Fruit bushes and canes are the best long-term investment on any allotment — and most of them practically look after themselves."
          image="/photos/crops/strawberry-ripe-close-up.webp"
          color="tomato"
        />

        <InThisGuide
          items={[
            { label: "Why grow fruit?", anchor: "why" },
            { label: "Strawberries", anchor: "strawberries" },
            { label: "Raspberries", anchor: "raspberries" },
            { label: "Blackcurrants", anchor: "blackcurrants" },
            { label: "Gooseberries", anchor: "gooseberries" },
            { label: "Redcurrants", anchor: "redcurrants" },
            { label: "Blackberries", anchor: "blackberries" },
            { label: "Rhubarb", anchor: "rhubarb" },
            { label: "When to plant", anchor: "when" },
            { label: "FAQ", anchor: "faq" },
          ]}
        />

        <div className="text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Why grow fruit */}
          <section id="why">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Why every allotment should have fruit
            </h2>
            <div className="space-y-4 text-[15px]">
              <p>
                Vegetables are rewarding, but fruit is where the real return on
                effort comes. A raspberry cane you plant this winter will still
                be producing fruit in 2040. A blackcurrant bush will outlast your
                tenancy. And the taste of fruit picked ripe and eaten within
                minutes is in a completely different league to anything from a
                supermarket.
              </p>
              <p>
                Most allotment fruit is &ldquo;soft fruit&rdquo; &mdash;
                strawberries, raspberries, currants, gooseberries. These are all
                hardy, all suited to UK conditions, and most will produce a
                useful crop within a year or two of planting.
              </p>
            </div>
          </section>

          <PullQuote>
            A raspberry cane you plant this winter will still be producing fruit
            in 2040.
          </PullQuote>

          <GuideImage
            src="/photos/blog/strawberry-colander-harvest.webp"
            alt="A colander full of fresh strawberries on woodchip mulch at a UK allotment"
            caption="A mid-season strawberry harvest — enough for pudding, picked in ten minutes."
            aspect="landscape"
          />

          <SectionDivider label="The fruit" />

          {/* Strawberries */}
          <section id="strawberries">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Strawberries
            </h2>
            <div className="space-y-4 text-[15px]">
              <p>
                The quickest fruit to get started with. Plant runners in spring
                and you will be picking strawberries by June. They work in raised
                beds, pots, hanging baskets, or straight in the ground. A bed of
                20 plants will keep you in strawberries all summer.
              </p>
              <p>
                <strong className="text-earth">When to plant:</strong> Spring
                (March&ndash;April) or late summer (August&ndash;September).
                Spring-planted runners fruit the same year. Late-summer planting
                gives a bigger crop the following year.
              </p>
              <p>
                <strong className="text-earth">What to expect:</strong> Fruit
                from June to September depending on variety. Each plant produces
                around 200&ndash;400g of fruit. Replace plants every 3 years as
                yields decline.
              </p>
              <p>
                <strong className="text-earth">Key tip:</strong> Net them. Birds
                will eat every ripe strawberry before you get to it. Straw mulch
                underneath keeps fruit clean and stops grey mould.
              </p>
            </div>
            <TipBox title="Everbearing varieties">
              <p>
                If you want strawberries from June right through to October, grow
                an everbearing variety like Flamenco or Malling Allure alongside
                your standard June bearers. You get a longer season from the
                same space.
              </p>
            </TipBox>
            <p className="mt-4 text-[15px]">
              <a
                href="/crops/strawberries"
                className="text-rust font-medium hover:underline"
              >
                Full strawberry growing guide &rarr;
              </a>
            </p>
          </section>

          <GuideImage
            src="/photos/blog/strawberry-plants-flowering.webp"
            alt="Strawberry plants flowering in a raised bed on a UK allotment"
            caption="Strawberry plants in flower — each of these blooms becomes a berry."
            aspect="landscape"
          />

          {/* Raspberries */}
          <ColorSection color="sage">
            <section id="raspberries">
              <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
                Raspberries
              </h2>
              <div className="space-y-4 text-[15px]">
                <p>
                  The best value fruit you can grow. A row of ten canes costs
                  under &pound;20 bare-root and will produce 10&ndash;15kg of
                  raspberries every year for a decade. Fresh raspberries from the
                  garden are absurdly good &mdash; soft, fragrant, and nothing
                  like the crunchy, flavourless things in supermarket punnets.
                </p>
                <p>
                  There are two types and understanding the difference is
                  crucial:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong className="text-earth">Summer-fruiting</strong>{" "}
                    (Glen Ample, Tulameen) &mdash; fruit on last year&apos;s
                    canes in June&ndash;July. Prune out fruited canes after
                    harvest, tie in new ones.
                  </li>
                  <li>
                    <strong className="text-earth">Autumn-fruiting</strong>{" "}
                    (Autumn Bliss, Polka) &mdash; fruit on this year&apos;s
                    canes in August&ndash;October. Cut everything to the ground
                    in February. Dead simple.
                  </li>
                </ul>
                <p>
                  <strong className="text-earth">When to plant:</strong>{" "}
                  November to March (bare root) or any time (container grown).
                  Space 40cm apart in rows with posts and wires for support.
                </p>
              </div>
              <p className="mt-4 text-[15px]">
                <a
                  href="/crops/raspberries"
                  className="text-rust font-medium hover:underline"
                >
                  Full raspberry growing guide &rarr;
                </a>
              </p>
            </section>
          </ColorSection>

          {/* Blackcurrants */}
          <section id="blackcurrants">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Blackcurrants
            </h2>
            <div className="space-y-4 text-[15px]">
              <p>
                Packed with vitamin C &mdash; more than any other commonly grown
                fruit. One bush produces 4&ndash;5kg of berries, enough for
                cordial, jam, crumbles, and freezing. They are tough, long-lived
                (20+ years), and uniquely suited to the UK climate.
              </p>
              <p>
                <strong className="text-earth">When to plant:</strong> November
                to March. Plant 5cm deeper than the nursery soil line to
                encourage strong basal shoots.
              </p>
              <p>
                <strong className="text-earth">Pruning:</strong> Remove a third
                of the oldest branches each winter, cutting right to the base.
                This keeps the bush productive with a constant supply of young,
                fruiting wood.
              </p>
              <p>
                <strong className="text-earth">Best for small spaces:</strong>{" "}
                Ben Sarek is compact and heavy-cropping &mdash; ideal for
                allotments where space is tight.
              </p>
            </div>
            <p className="mt-4 text-[15px]">
              <a
                href="/crops/blackcurrants"
                className="text-rust font-medium hover:underline"
              >
                Full blackcurrant growing guide &rarr;
              </a>
            </p>
          </section>

          <SectionDivider />

          {/* Gooseberries */}
          <section id="gooseberries">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Gooseberries
            </h2>
            <div className="space-y-4 text-[15px]">
              <p>
                Criminally underrated. A gooseberry bush takes up about a square
                metre, produces 3&ndash;5kg of fruit every year, and needs
                barely any attention. Pick them green and tart in June for
                crumbles and fools, or leave them to ripen to sweet, golden
                dessert berries by July.
              </p>
              <p>
                <strong className="text-earth">When to plant:</strong> November
                to March (bare root). Prune to an open goblet shape to let air
                circulate and reduce mildew.
              </p>
              <p>
                Gooseberries tolerate partial shade better than most fruit, so
                they are useful for those awkward spots on the allotment that
                don&apos;t get full sun.
              </p>
            </div>
            <p className="mt-4 text-[15px]">
              <a
                href="/crops/gooseberries"
                className="text-rust font-medium hover:underline"
              >
                Full gooseberry growing guide &rarr;
              </a>
            </p>
          </section>

          {/* Redcurrants */}
          <ColorSection color="ochre">
            <section id="redcurrants">
              <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
                Redcurrants
              </h2>
              <div className="space-y-4 text-[15px]">
                <p>
                  Beautiful jewel-like berries that hang in long trusses.
                  Redcurrants are the most shade-tolerant of all the fruit
                  bushes &mdash; they will happily grow against a north-facing
                  wall or fence. Train them as cordons to save space.
                </p>
                <p>
                  Mainly used for jelly, sauces, and decoration. A single bush
                  produces more redcurrants than most families can use, so plan
                  to freeze or process them.
                </p>
              </div>
              <p className="mt-4 text-[15px]">
                <a
                  href="/crops/redcurrants"
                  className="text-rust font-medium hover:underline"
                >
                  Full redcurrant growing guide &rarr;
                </a>
              </p>
            </section>
          </ColorSection>

          {/* Blackberries */}
          <section id="blackberries">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Blackberries
            </h2>
            <div className="space-y-4 text-[15px]">
              <p>
                Why grow what you can forage? Because cultivated blackberries are
                bigger, sweeter, and thornless. A single plant trained along a
                fence produces kilos of fruit in late summer. They are virtually
                indestructible and will grow almost anywhere.
              </p>
              <p>
                <strong className="text-earth">When to plant:</strong> November
                to March. Give them a fence or wires to train along &mdash; they
                need 3&ndash;4 metres of horizontal space.
              </p>
              <WarningBox title="Contain them">
                Blackberries can take over if not managed. Train canes along
                wires and cut out all fruited canes after harvest. Do not let
                tip-rooting canes touch the ground or you will have blackberries
                everywhere.
              </WarningBox>
            </div>
            <p className="mt-4 text-[15px]">
              <a
                href="/crops/blackberries"
                className="text-rust font-medium hover:underline"
              >
                Full blackberry growing guide &rarr;
              </a>
            </p>
          </section>

          <SectionDivider />

          {/* Rhubarb */}
          <section id="rhubarb">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Rhubarb
            </h2>
            <div className="space-y-4 text-[15px]">
              <p>
                Technically a vegetable, but everyone treats it as fruit. Plant
                a crown, do not harvest the first year, and it will reward you
                with decades of pink stalks every spring. Rhubarb is almost
                impossible to kill and needs virtually no attention.
              </p>
              <p>
                <strong className="text-earth">When to plant:</strong> November
                to March. Plant crowns with the bud just at soil level.
              </p>
              <p>
                <strong className="text-earth">Forcing:</strong> Cover a crown
                with an upturned bin or forcing pot in January. The stalks grow
                towards the light, producing tender, pale pink stems that are
                the sweetest of the year. Only force the same crown every other
                year.
              </p>
            </div>
            <TipBox title="The rhubarb rule">
              <p>
                Pull, do not cut. Grip the stalk at the base and twist gently
                while pulling. Cutting leaves a stump that can rot. And always
                stop harvesting by the end of June &mdash; the plant needs the
                rest of summer to build energy for next year.
              </p>
            </TipBox>
            <p className="mt-4 text-[15px]">
              <a
                href="/crops/rhubarb"
                className="text-rust font-medium hover:underline"
              >
                Full rhubarb growing guide &rarr;
              </a>
            </p>
          </section>

          <SectionDivider label="Planting calendar" />

          {/* When to plant */}
          <section id="when">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              When to plant fruit in the UK
            </h2>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-earth/15">
                    <th className="text-left py-2 px-2 text-[10px] font-bold tracking-[0.1em] uppercase text-earth-light">
                      Fruit
                    </th>
                    <th className="text-left py-2 px-2 text-[10px] font-bold tracking-[0.1em] uppercase text-earth-light">
                      Best planting time
                    </th>
                    <th className="text-left py-2 px-2 text-[10px] font-bold tracking-[0.1em] uppercase text-earth-light">
                      First harvest
                    </th>
                  </tr>
                </thead>
                <tbody className="text-earth-light">
                  <tr className="border-b border-earth/5">
                    <td className="py-2 px-2 font-medium text-earth">
                      <a href="/crops/strawberries" className="text-rust hover:underline">Strawberries</a>
                    </td>
                    <td className="py-2 px-2">Mar&ndash;Apr or Aug&ndash;Sep</td>
                    <td className="py-2 px-2">Same year (spring planting)</td>
                  </tr>
                  <tr className="border-b border-earth/5">
                    <td className="py-2 px-2 font-medium text-earth">
                      <a href="/crops/raspberries" className="text-rust hover:underline">Raspberries</a>
                    </td>
                    <td className="py-2 px-2">Nov&ndash;Mar (bare root)</td>
                    <td className="py-2 px-2">Year 1 (autumn) / Year 2 (summer)</td>
                  </tr>
                  <tr className="border-b border-earth/5">
                    <td className="py-2 px-2 font-medium text-earth">
                      <a href="/crops/blackcurrants" className="text-rust hover:underline">Blackcurrants</a>
                    </td>
                    <td className="py-2 px-2">Nov&ndash;Mar (bare root)</td>
                    <td className="py-2 px-2">Year 2 (small), Year 3 (full)</td>
                  </tr>
                  <tr className="border-b border-earth/5">
                    <td className="py-2 px-2 font-medium text-earth">
                      <a href="/crops/gooseberries" className="text-rust hover:underline">Gooseberries</a>
                    </td>
                    <td className="py-2 px-2">Nov&ndash;Mar (bare root)</td>
                    <td className="py-2 px-2">Year 2 (small), Year 3 (full)</td>
                  </tr>
                  <tr className="border-b border-earth/5">
                    <td className="py-2 px-2 font-medium text-earth">
                      <a href="/crops/redcurrants" className="text-rust hover:underline">Redcurrants</a>
                    </td>
                    <td className="py-2 px-2">Nov&ndash;Mar (bare root)</td>
                    <td className="py-2 px-2">Year 2 (small), Year 3 (full)</td>
                  </tr>
                  <tr className="border-b border-earth/5">
                    <td className="py-2 px-2 font-medium text-earth">
                      <a href="/crops/blackberries" className="text-rust hover:underline">Blackberries</a>
                    </td>
                    <td className="py-2 px-2">Nov&ndash;Mar (bare root)</td>
                    <td className="py-2 px-2">Year 2</td>
                  </tr>
                  <tr className="border-b border-earth/5">
                    <td className="py-2 px-2 font-medium text-earth">
                      <a href="/crops/rhubarb" className="text-rust hover:underline">Rhubarb</a>
                    </td>
                    <td className="py-2 px-2">Nov&ndash;Mar (crowns)</td>
                    <td className="py-2 px-2">Year 2 (don&apos;t harvest year 1)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <SectionDivider label="Common questions" />

          {/* FAQ */}
          <section id="faq" className="space-y-8 pb-8">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Frequently asked questions
            </h2>

            <div className="space-y-6">
              <div className="border-t border-earth/8 pt-4">
                <h3 className="font-semibold text-earth text-[15px] mb-2">
                  What is the easiest fruit to grow in the UK?
                </h3>
                <p className="text-[15px]">
                  Strawberries and rhubarb. Strawberries produce fruit within
                  months of planting. Rhubarb is virtually indestructible once
                  established. Autumn-fruiting raspberries are also very easy
                  &mdash; just cut everything down in February and they grow back
                  and fruit the same year.
                </p>
              </div>

              <div className="border-t border-earth/8 pt-4">
                <h3 className="font-semibold text-earth text-[15px] mb-2">
                  When should I plant fruit bushes in the UK?
                </h3>
                <p className="text-[15px]">
                  Most fruit bushes and canes are best planted between November
                  and March while dormant. Bare-root plants are cheapest and
                  establish best when planted in winter. Strawberry runners are
                  best planted in spring or late summer.
                </p>
              </div>

              <div className="border-t border-earth/8 pt-4">
                <h3 className="font-semibold text-earth text-[15px] mb-2">
                  Can I grow fruit in pots?
                </h3>
                <p className="text-[15px]">
                  Strawberries are excellent in pots and hanging baskets.
                  Blueberries must be grown in pots of ericaceous compost unless
                  your soil is acidic. Compact gooseberry and redcurrant
                  varieties work in large containers (40cm+). Raspberries and
                  blackcurrants need ground planting for best results.
                </p>
              </div>

              <div className="border-t border-earth/8 pt-4">
                <h3 className="font-semibold text-earth text-[15px] mb-2">
                  How do I protect fruit from birds?
                </h3>
                <p className="text-[15px]">
                  Netting is the only reliable method. Drape bird netting over a
                  frame (not directly on the plants) from when fruit starts to
                  colour. A permanent fruit cage is the best long-term solution
                  if you have the space and budget.
                </p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <div className="border-t border-earth/10 pt-8 pb-12 max-w-2xl">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-earth-lighter block mb-3">
              Related guides
            </span>
            <div className="flex flex-wrap gap-3">
              <a
                href="/guides/beginners"
                className="text-sm text-rust hover:text-earth font-medium underline decoration-rust/30 transition-colors"
              >
                Allotment for beginners
              </a>
              <a
                href="/guides/companion-planting"
                className="text-sm text-rust hover:text-earth font-medium underline decoration-rust/30 transition-colors"
              >
                Companion planting
              </a>
              <a
                href="/guides/soil"
                className="text-sm text-rust hover:text-earth font-medium underline decoration-rust/30 transition-colors"
              >
                Understanding your soil
              </a>
              <a
                href="/guides/watering"
                className="text-sm text-rust hover:text-earth font-medium underline decoration-rust/30 transition-colors"
              >
                Watering vegetables
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
