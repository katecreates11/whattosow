import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TipBox, WarningBox, GuideHero, PullQuote, SectionDivider, SoilIcon, FullBleedSection } from "@/components/GuideVisuals";

export const metadata: Metadata = {
  title:
    "Understanding Your Soil — A Practical UK Guide | What To Sow",
  description:
    "Learn how to identify your soil type, test pH, and improve your ground for growing vegetables. Practical UK guide covering clay, sandy, loam, chalk, and peat soils.",
  keywords: [
    "soil types UK",
    "clay soil gardening",
    "soil pH for vegetables",
    "improving garden soil",
    "allotment soil",
    "how to test soil",
    "soil test kit UK",
    "no dig gardening",
    "raised bed soil",
    "soil temperature sowing",
  ],
  openGraph: {
    title: "Understanding Your Soil — A Practical UK Guide",
    description:
      "Identify your soil type, test pH, and improve your ground for better vegetable growing. Covers all UK soil types with practical advice.",
    type: "article",
    url: "https://whattosow.co.uk/guides/soil",
  },
  alternates: {
    canonical: "/guides/soil",
  },
};

export default function SoilGuide() {
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
        name: "Understanding Your Soil",
        item: "https://whattosow.co.uk/guides/soil",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I find out what soil type I have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The simplest method is the squeeze test. Take a handful of moist soil and squeeze it. Sandy soil feels gritty and falls apart when you open your hand. Clay soil feels smooth and sticky, holding its shape. Loam holds together loosely but crumbles when poked. You can also try rolling it into a ribbon between your fingers — clay rolls into a long, thin ribbon while sandy soil won't form one at all.",
        },
      },
      {
        "@type": "Question",
        name: "What pH should vegetable garden soil be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most vegetables grow best in slightly acidic to neutral soil, between pH 6.0 and 7.0. At this range, nutrients are most available to plant roots. Brassicas (cabbage, broccoli, kale) prefer slightly alkaline conditions around 6.5-7.5, while blueberries and potatoes do better in more acidic soil around 4.5-6.0.",
        },
      },
      {
        "@type": "Question",
        name: "How can I improve clay soil for growing vegetables?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best way to improve clay soil is to add organic matter — compost, well-rotted manure, or leaf mould — to the surface every year. Avoid digging clay when it's wet, as this destroys the structure. A no-dig approach works particularly well on clay: spread 5-10cm of compost on top each autumn and let worms do the mixing. Over two to three years you'll notice a dramatic improvement in drainage and workability.",
        },
      },
      {
        "@type": "Question",
        name: "When is soil warm enough to sow seeds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most vegetable seeds need a soil temperature of at least 7°C to germinate. Hardy crops like broad beans, peas, and onions can manage from around 5°C. Tender crops like courgettes, beans, and sweetcorn need soil at 12°C or warmer. Soil thermometers cost a few pounds and take the guesswork out of spring sowing.",
        },
      },
      {
        "@type": "Question",
        name: "Is no-dig gardening better for soil?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No-dig preserves soil structure, protects the fungal networks that help plants access nutrients, and reduces weed germination by not bringing buried seeds to the surface. You simply add a layer of compost to the surface each year and let soil organisms do the work. It's especially effective on heavy clay or compacted allotment soil, and saves a lot of physical effort.",
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
          title="Understanding your soil"
          subtitle="Get to know what you're working with. Less wasted time, less money, better food."
          icon={<SoilIcon className="w-10 h-10" />}
          color="amber"
        />

        <div className="space-y-12 text-earth-light leading-relaxed">
          {/* Why soil matters */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Why soil matters
            </h2>
            <div className="space-y-3">
              <p>
                Soil does three jobs: it anchors roots, holds water and
                nutrients, and hosts billions of organisms that break down
                organic matter into food your plants can use. Poor soil
                doesn&apos;t mean you can&apos;t grow &mdash; it just means
                you need to understand what you&apos;re dealing with and work
                with it, not against it.
              </p>
              <p>
                The good news is that almost any soil can be improved. And you
                don&apos;t need to spend a fortune doing it. Compost, patience,
                and a bit of knowledge go a long way.
              </p>
            </div>
          </section>

          {/* UK soil types */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              UK soil types
            </h2>
            <p className="mb-6">
              Most UK gardens and allotments sit on one of six soil types. Yours
              might be a blend, but one will dominate. Here&apos;s how to tell
              them apart.
            </p>

            <div className="grid gap-4">
              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">Clay</h3>
                <p className="text-sm mb-2">
                  Heavy, sticky when wet, rock-hard when dry. Slow to warm up in
                  spring but holds nutrients well. Very common across England,
                  especially the Midlands and South East.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Squeeze test:</strong> Feels
                  smooth and sticky. Holds its shape. Rolls into a long thin
                  ribbon between your fingers.
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">Sandy</h3>
                <p className="text-sm mb-2">
                  Light, gritty, drains fast. Warms up quickly in spring, which
                  is a real advantage for early sowings. But nutrients wash
                  through easily, so you&apos;ll need to feed more often. Common
                  in East Anglia, Surrey heaths, and coastal areas.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Squeeze test:</strong> Feels
                  gritty. Falls apart when you open your hand. Won&apos;t form a
                  ribbon at all.
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">Silt</h3>
                <p className="text-sm mb-2">
                  Smooth and silky, fertile, holds moisture well. Easier to work
                  than clay but can compact if you walk on it when wet. Found in
                  river valleys and floodplains &mdash; parts of Lincolnshire
                  and the Fens.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Squeeze test:</strong> Feels
                  silky smooth, like flour. Holds shape loosely but
                  won&apos;t ribbon well.
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">Loam</h3>
                <p className="text-sm mb-2">
                  The one everyone wants. A balanced mix of clay, sand, and silt
                  with good drainage, decent moisture retention, and plenty of
                  nutrients. If you&apos;ve got it, count yourself lucky and
                  just keep adding compost.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Squeeze test:</strong> Holds
                  together in a ball but crumbles easily when poked. Slightly
                  gritty, slightly smooth.
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">Chalky</h3>
                <p className="text-sm mb-2">
                  Shallow, stony, and alkaline. Drains freely and can be low in
                  nutrients. You&apos;ll often find white lumps of chalk or
                  flint in it. Common across the Downs, Chilterns, and
                  Yorkshire Wolds. Acid-loving crops will struggle here.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Squeeze test:</strong> Pale,
                  stony, crumbly. Often fizzes if you pour vinegar on it
                  (the calcium carbonate reacts).
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">Peat</h3>
                <p className="text-sm mb-2">
                  Dark, spongy, high in organic matter. Naturally acidic and
                  moisture-retentive. Rare in gardens but found in parts of East
                  Anglia, the Somerset Levels, and Scottish Highlands. Great for
                  acid-lovers but may need liming for most vegetables.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Squeeze test:</strong> Very
                  dark, spongy, almost like a wrung-out tea bag. Holds a lot
                  of water.
                </p>
              </div>
            </div>
          </section>

          {/* Soil pH */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Soil pH: what it means and why it matters
            </h2>
            <div className="space-y-3">
              <p>
                pH measures how acidic or alkaline your soil is, on a scale from
                1 (very acid) to 14 (very alkaline), with 7 being neutral. Most
                vegetables grow best between <strong className="text-earth">pH
                6.0 and 7.0</strong> &mdash; slightly acidic to neutral. At
                this range, nutrients in the soil are most available to roots.
              </p>
              <p>
                Testing is cheap and easy. Pick up a soil pH test kit from any
                garden centre for a few pounds &mdash; the basic liquid kits
                work fine. Take samples from a few spots around your plot, mix
                them together, and follow the instructions. Test in spring
                before you start adding anything.
              </p>
            </div>

            <div className="bg-allotment-bg/30 p-4 text-sm text-earth-light mt-4">
              <p className="font-semibold text-earth mb-2">What different crops prefer</p>
              <ul className="space-y-1.5">
                <li>
                  <strong className="text-earth">Brassicas</strong> (cabbage,
                  broccoli, kale, cauliflower) &mdash; prefer slightly alkaline
                  soil, pH 6.5&ndash;7.5. Add garden lime in autumn if your soil
                  is acidic.
                </li>
                <li>
                  <strong className="text-earth">Potatoes</strong> &mdash;
                  prefer slightly acidic soil, pH 5.0&ndash;6.0. Liming
                  encourages scab, so avoid it on your potato bed.
                </li>
                <li>
                  <strong className="text-earth">Blueberries</strong> &mdash;
                  need acid soil, pH 4.5&ndash;5.5. Grow in containers of
                  ericaceous compost if your soil is neutral or alkaline.
                </li>
                <li>
                  <strong className="text-earth">Most other veg</strong>{" "}
                  (carrots, beans, courgettes, lettuce, onions, peas) &mdash;
                  happy between pH 6.0&ndash;7.0.
                </li>
              </ul>
            </div>
          </section>

          {/* Improving your soil */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Improving your soil
            </h2>
            <div className="space-y-3">
              <p>
                Whatever soil type you have, the answer to improving it is
                almost always the same: <strong className="text-earth">add
                organic matter</strong>. It opens up clay, helps sandy soil hold
                water, feeds soil life, and builds structure over time.
              </p>
            </div>

            <div className="space-y-4 mt-4">
              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">
                  Garden compost
                </h3>
                <p className="text-sm">
                  The best thing you can make for free. Kitchen scraps, weeds
                  (before they seed), cardboard, and garden waste all break down
                  into rich, dark compost. If you only do one thing for your
                  soil, start a compost bin.
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">
                  Well-rotted manure
                </h3>
                <p className="text-sm">
                  Horse, cow, or chicken &mdash; but it must be well-rotted
                  (aged at least a year). Fresh manure burns roots and can
                  contain weed seeds. Many stables give it away free. Brilliant
                  for hungry crops like courgettes and squash.
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">Leaf mould</h3>
                <p className="text-sm">
                  Collect autumn leaves, bag them up, and leave them for a year
                  or two. The result is a beautiful, crumbly soil conditioner
                  that&apos;s especially good for improving heavy clay. Free,
                  easy, and endlessly useful.
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">Green manures</h3>
                <p className="text-sm">
                  Sow fast-growing crops like phacelia, field beans, or crimson
                  clover on empty beds. They protect the soil from rain, suppress
                  weeds, and add nutrients when chopped and left on the surface.
                  Field beans are especially good over winter on heavy soil.
                </p>
              </div>
            </div>
          </section>

          <FullBleedSection color="earth">
            <h2 className="text-xl font-semibold text-white mb-3">
              The no-dig approach
            </h2>
            <div className="space-y-3 text-white/80">
              <p>
                No-dig is exactly what it sounds like. Instead of turning the
                soil each year, you spread a thick layer of compost on top
                (5&ndash;10cm) and let worms and soil organisms pull it down.
                Popularised in the UK by Charles Dowding, it works brilliantly
                on allotments and raised beds alike.
              </p>
              <p>
                Why does it work? Digging disrupts fungal networks that help
                plants access nutrients, destroys soil structure, and brings
                buried weed seeds to the surface. By leaving the soil alone and
                feeding from the top, you build better structure over time with
                far less effort.
              </p>
            </div>
            <div className="mt-6 bg-white/10 border-l-4 border-leaf-light p-5">
              <span className="text-sm font-bold text-leaf-light block mb-1.5">Starting no-dig on a new plot</span>
              <p className="text-sm text-white/80">
                Lay cardboard over weeds, cover with 10&ndash;15cm of compost,
                and plant straight into it. The cardboard smothers weeds
                underneath while worms break everything down. You can plant
                into it the same day.
              </p>
            </div>
          </FullBleedSection>

          {/* Raised beds */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Raised beds: the shortcut
            </h2>
            <div className="space-y-3">
              <p>
                If your soil is truly terrible &mdash; solid clay, full of
                rubble, contaminated, or just unknown &mdash; raised beds let
                you start from scratch. Fill them with a mix of topsoil and
                compost and you&apos;ve got perfect growing conditions from day
                one.
              </p>
              <p>
                They also drain better, warm up faster in spring, and save your
                back. You don&apos;t need to spend a fortune &mdash; scaffold
                boards, old pallets, or even mounded rows without sides all
                work. The soil underneath will gradually improve too as worms
                move between the layers.
              </p>
            </div>
          </section>

          {/* Soil temperature */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Soil temperature and sowing
            </h2>
            <div className="space-y-3">
              <p>
                Air temperature is one thing. Soil temperature is what actually
                matters for germination. Seeds sit in cold, wet ground and rot
                if the soil isn&apos;t warm enough. A cheap soil thermometer
                (under &pound;5) takes the guesswork out entirely.
              </p>
            </div>

            <div className="border border-earth/6 mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-earth/6">
                    <th className="text-left font-semibold text-earth px-4 py-2.5">
                      Soil temp
                    </th>
                    <th className="text-left font-semibold text-earth px-4 py-2.5">
                      What you can sow
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-earth/6">
                    <td className="px-4 py-2.5 font-medium text-earth whitespace-nowrap">
                      5&ndash;7&deg;C
                    </td>
                    <td className="px-4 py-2.5">
                      Broad beans, peas, onion sets, garlic
                    </td>
                  </tr>
                  <tr className="border-b border-earth/6">
                    <td className="px-4 py-2.5 font-medium text-earth whitespace-nowrap">
                      7&ndash;10&deg;C
                    </td>
                    <td className="px-4 py-2.5">
                      Carrots, beetroot, lettuce, spinach, radish, parsnips
                    </td>
                  </tr>
                  <tr className="border-b border-earth/6">
                    <td className="px-4 py-2.5 font-medium text-earth whitespace-nowrap">
                      12&deg;C+
                    </td>
                    <td className="px-4 py-2.5">
                      French beans, runner beans, courgettes, sweetcorn,
                      squash
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-earth whitespace-nowrap">
                      15&deg;C+
                    </td>
                    <td className="px-4 py-2.5">
                      Tomatoes, peppers, aubergines, cucumbers (outdoor sowing)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm mt-3">
              Check your{" "}
              <a
                href="/frost-map"
                className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
              >
                local frost dates
              </a>{" "}
              to get a sense of when the ground warms up in your area. South-facing
              plots and raised beds warm up fastest.
            </p>
          </section>

          {/* Common mistakes */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Common mistakes
            </h2>
            <ul className="list-disc list-inside space-y-2 text-earth-light">
              <li>
                <strong className="text-earth">Walking on wet clay.</strong>{" "}
                Compacts the structure and makes drainage worse. Lay planks to
                stand on, or stick to paths.
              </li>
              <li>
                <strong className="text-earth">Over-liming.</strong>{" "}
                Adding lime without testing pH first can make soil too alkaline,
                locking out iron and manganese. Test first, then add only what&apos;s
                needed.
              </li>
              <li>
                <strong className="text-earth">Ignoring organic matter.</strong>{" "}
                Fertiliser feeds plants but doesn&apos;t build soil. Without
                regular organic matter, soil structure degrades, drainage
                suffers, and you end up on a treadmill of ever-more inputs.
              </li>
              <li>
                <strong className="text-earth">Digging wet soil.</strong>{" "}
                If it sticks to your boots, it&apos;s too wet to work. Wait for
                it to dry out or you&apos;ll create clods that take months to
                break down.
              </li>
              <li>
                <strong className="text-earth">Sowing too early.</strong>{" "}
                Enthusiasm in March is great, but cold soil kills seeds. Wait
                until the ground is genuinely warm enough &mdash; a fortnight&apos;s
                patience can mean weeks of faster growth.
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-xl font-semibold text-earth mb-6">
              Common questions
            </h2>
            <div className="space-y-6">
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  How do I find out what soil type I have?
                </h3>
                <p className="text-sm">
                  The squeeze test is the simplest method. Take a handful of
                  moist soil and squeeze it. Sandy soil feels gritty and falls
                  apart. Clay feels smooth and sticky, holding its shape. Loam
                  holds together loosely but crumbles when poked. You can also
                  try rolling it into a ribbon between your fingers &mdash; clay
                  rolls into a long, thin ribbon while sandy soil won&apos;t
                  form one at all.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  What pH should vegetable garden soil be?
                </h3>
                <p className="text-sm">
                  Most vegetables grow best between pH 6.0 and 7.0. Brassicas
                  prefer slightly alkaline conditions around 6.5&ndash;7.5,
                  while potatoes and blueberries do better in more acidic soil.
                  A cheap test kit from any garden centre will tell you where
                  you stand.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  How can I improve clay soil for growing vegetables?
                </h3>
                <p className="text-sm">
                  Add organic matter to the surface every year &mdash; compost,
                  well-rotted manure, or leaf mould. Avoid digging when
                  it&apos;s wet. A no-dig approach works especially well on
                  clay: spread 5&ndash;10cm of compost on top each autumn and
                  let worms do the mixing. You&apos;ll see a real difference
                  within two to three years.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  When is soil warm enough to sow seeds?
                </h3>
                <p className="text-sm">
                  Most vegetable seeds need at least 7&deg;C. Hardy crops like
                  broad beans and peas can manage from around 5&deg;C. Tender
                  crops like courgettes and beans need 12&deg;C or warmer. A
                  soil thermometer costs a few pounds and saves a lot of failed
                  sowings.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  Is no-dig gardening better for soil?
                </h3>
                <p className="text-sm">
                  No-dig preserves soil structure, protects fungal networks that
                  help plants access nutrients, and reduces weed germination by
                  not bringing buried seeds to the surface. You add compost on
                  top each year and let soil organisms do the work. It&apos;s
                  especially effective on heavy clay and saves a lot of effort.
                </p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-xl font-semibold text-earth mb-4">
              Keep reading
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
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
              <a
                href="/frost-map"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  UK frost map &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  See frost dates across every region.
                </p>
              </a>
              <a
                href="/guides/companion-planting"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Companion planting &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  What to grow together and what to keep apart.
                </p>
              </a>
              <a
                href="/guides/beginners"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Beginner&apos;s guide &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  New to growing? Start here.
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
