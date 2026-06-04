import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionDivider, TipBox } from "@/components/GuideVisuals";
import BedDiagram from "@/components/BedDiagram";
import { awinLink } from "@/lib/awin";

const tm = (q: string) => awinLink(`https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`);

export const metadata: Metadata = {
  title: "Green Manures & Winter Cover Crops (UK Guide) | What To Sow",
  description:
    "Green manures and cover crops for UK gardens: what to sow over winter to protect bare soil, suppress weeds and feed the ground for free. The best green manures, when to sow them, and how to dig them in.",
  keywords: [
    "green manure UK",
    "cover crops over winter",
    "what to plant to improve soil over winter",
    "green manure for vegetable garden",
    "winter cover crop allotment",
    "field beans grazing rye green manure",
  ],
  openGraph: {
    title: "Green Manures & Winter Cover Crops (UK Guide)",
    description:
      "What to sow over winter to protect bare soil, suppress weeds and feed the ground for free.",
    type: "article",
    url: "https://whattosow.co.uk/guides/green-manures",
  },
  alternates: { canonical: "/guides/green-manures" },
};

interface ManureItem {
  name: string;
  does: string;
  sowBy: string;
  clear: string;
  hardy: "Very hardy" | "Hardy" | "Half-hardy";
  seeds: string;
}

const manures: ManureItem[] = [
  {
    name: "Grazing rye",
    does: "The hardiest of all. Masses of organic matter, superb weed suppression, and roots that hold the soil and its nutrients through winter rain.",
    sowBy: "Aug–Nov",
    clear: "Cut & dig in early spring",
    hardy: "Very hardy",
    seeds: tm("Grazing%20Rye%20Green%20Manure"),
  },
  {
    name: "Field beans (winter)",
    does: "A hardy bean that fixes nitrogen from the air into the soil — leaving the ground richer for next year's hungry, leafy crops.",
    sowBy: "Sep–Nov",
    clear: "Cut before flowering, spring",
    hardy: "Very hardy",
    seeds: tm("Field%20Beans%20Green%20Manure"),
  },
  {
    name: "Winter tares (vetch)",
    does: "Another nitrogen-fixer with plenty of leafy bulk. Loves heavier soils and smothers weeds well.",
    sowBy: "Aug–Sep",
    clear: "Dig in spring",
    hardy: "Hardy",
    seeds: tm("Winter%20Tares%20Green%20Manure"),
  },
  {
    name: "Phacelia",
    does: "Fast, pretty and brilliant for bees if you let some flower. Half-hardy, so it may not survive a hard winter — best for milder spots or early sowing.",
    sowBy: "By early Sep",
    clear: "Dig in autumn or spring",
    hardy: "Half-hardy",
    seeds: tm("Phacelia%20Green%20Manure"),
  },
  {
    name: "Crimson clover",
    does: "A nitrogen-fixing clover with gorgeous red flowers for the pollinators. Half-hardy — sow early enough to establish before the cold.",
    sowBy: "By early Sep",
    clear: "Dig in spring",
    hardy: "Half-hardy",
    seeds: tm("Clover%20Green%20Manure"),
  },
  {
    name: "Mustard",
    does: "The fastest of all and a natural soil cleanser (a 'biofumigant'). Frost-tender, so it dies back in winter — but it's a brassica, so don't use it where brassicas will follow.",
    sowBy: "Aug–Sep",
    clear: "Dies back in frost / dig in",
    hardy: "Half-hardy",
    seeds: tm("Mustard%20Green%20Manure"),
  },
];

const hardyColor: Record<ManureItem["hardy"], string> = {
  "Very hardy": "text-allotment",
  Hardy: "text-leaf",
  "Half-hardy": "text-amber",
};

export default function GreenManuresGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Green Manures & Cover Crops", item: "https://whattosow.co.uk/guides/green-manures" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Green Manures & Winter Cover Crops (UK Guide)",
    description:
      "What to sow over winter to protect bare soil, suppress weeds and feed the ground for free — the best green manures, when to sow them, and how to dig them in.",
    url: "https://whattosow.co.uk/guides/green-manures",
    publisher: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
    datePublished: "2026-06-04",
    dateModified: "2026-06-04",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a green manure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A green manure (or cover crop) is a fast-growing plant you sow to cover bare soil rather than to eat. It protects the ground from winter rain, suppresses weeds, and is dug in or cut down later to add organic matter and, in the case of beans and clovers, nitrogen — feeding the soil for free.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best green manure to sow in autumn in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For overwintering, grazing rye is the toughest and best for bulk and weed suppression, while field beans and winter tares add nitrogen. Sow these from late summer into autumn. Phacelia, clover and mustard are better sown earlier as they're less hardy.",
        },
      },
      {
        "@type": "Question",
        name: "Do you have to dig green manure in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not necessarily. The traditional method is to dig the green manure into the top few inches of soil a few weeks before sowing. But if you grow no-dig, you can instead cut it down at the surface and leave it as a mulch (or compost it), letting the worms take the goodness down for you.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header backLink={{ href: "/guides", label: "← Guides" }} />
      <main id="main-content">
        <div className="px-6 sm:px-10 lg:px-16">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 block">
            Soil &amp; planning
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-4 max-w-2xl">
            Green manures &amp; winter cover crops
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            Bare soil over winter is a wasted opportunity &mdash; and worse, our endless winter rain washes the
            goodness straight out of it. A green manure is the gardener&apos;s answer: a fast crop you grow not to
            eat, but to protect and feed the soil for free.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            Sow it over an empty bed in late summer or autumn, let it blanket the ground through the cold, then dig it
            in &mdash; or simply cut it down &mdash; come spring. It&apos;s one of the kindest, cheapest things you
            can do for next year&apos;s harvest.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Why */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">What a green manure does</h2>
            <ul className="space-y-2.5">
              <li className="border-l-2 border-leaf/50 pl-4 text-[15px]"><strong className="text-earth">Protects the soil</strong> &mdash; a living cover stops winter rain compacting bare earth and washing nutrients away.</li>
              <li className="border-l-2 border-leaf/50 pl-4 text-[15px]"><strong className="text-earth">Smothers weeds</strong> &mdash; a thick blanket of green leaves nowhere for weeds to get a foothold.</li>
              <li className="border-l-2 border-leaf/50 pl-4 text-[15px]"><strong className="text-earth">Feeds the ground</strong> &mdash; dug in or left to rot, it adds organic matter; beans and clovers also fix nitrogen from the air.</li>
              <li className="border-l-2 border-leaf/50 pl-4 text-[15px]"><strong className="text-earth">Holds the structure</strong> &mdash; roots keep the soil open and alive, and feed the worms and microbes that do the real work.</li>
            </ul>
          </section>

          {/* The options — table-style cards */}
          <section className="!max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">The best green manures for winter</h2>
            <p className="mb-6 max-w-2xl">
              For overwintering, the hardy ones are what you want &mdash; rye, field beans and tares stand up to the
              cold. The half-hardy ones (phacelia, clover, mustard) are best sown earlier, while there&apos;s still
              warmth to get them going.
            </p>
            <div className="space-y-3">
              {manures.map((m) => (
                <div key={m.name} className="border border-earth/10 p-4 sm:p-5">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="font-serif text-lg text-earth">{m.name}</h3>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.1em] ${hardyColor[m.hardy]}`}>{m.hardy}</span>
                  </div>
                  <p className="text-sm text-earth-light leading-relaxed mt-1.5">{m.does}</p>
                  <div className="flex items-center gap-x-5 gap-y-1 flex-wrap mt-3">
                    <span className="text-xs text-earth-lighter"><span className="font-semibold text-earth-light">Sow by:</span> {m.sowBy}</span>
                    <span className="text-xs text-earth-lighter"><span className="font-semibold text-earth-light">Clear:</span> {m.clear}</span>
                    <a
                      href={m.seeds}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      data-umami-event="companion-seed-click"
                      data-umami-event-topic="green-manure"
                      className="font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
                    >
                      Find seeds &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-earth-lighter mt-3">
              Seed links are affiliate links &mdash; we may earn a little, at no extra cost to you, towards the
              allotment shed.
            </p>
          </section>

          {/* Bed diagram */}
          <section className="!max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">Putting a bed to bed</h2>
            <p className="mb-5 max-w-2xl">
              You don&apos;t sow green manure in neat rows &mdash; you broadcast it to cover the whole bed. Scatter the
              seed evenly, rake it in lightly, and water if it&apos;s dry. A classic, robust winter mix is grazing rye
              for bulk and weed-suppression with field beans for nitrogen, so the bed wakes up in spring richer than
              you left it.
            </p>
            <BedDiagram
              title="A winter green-manure mix"
              note="Broadcast across the whole bed for full ground cover — here a hardy mix of grazing rye (bulk & weed suppression) and field beans (nitrogen). Rake in, and let it blanket the soil till spring."
              plantings={[
                { name: "Field beans", color: "#2D5F3E", initial: "Fb", rows: [14, 40, 66, 92] },
                { name: "Grazing rye", color: "#88B05E", initial: "Ry", rows: [27, 53, 79] },
              ]}
            />
          </section>

          <TipBox title="The no-dig way">
            You don&apos;t have to dig it in. If you grow no-dig, cut the green manure down at the surface in spring,
            leave the tops as a mulch (or add them to the{" "}
            <a href="/guides/composting" className="text-rust underline decoration-rust/30 hover:text-earth">compost</a>), and let the worms
            pull the goodness down. Either way, leave two or three weeks between clearing it and sowing your next
            crop, so the rotting roots don&apos;t check your seedlings.
          </TipBox>

          {/* How to sow */}
          <SectionDivider label="In practice" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">How to sow it</h2>
            <ol className="space-y-2.5 list-none">
              <li className="text-[15px]"><strong className="text-earth">1.</strong> Clear the bed of the spent crop and any big weeds, and rake the surface roughly level.</li>
              <li className="text-[15px]"><strong className="text-earth">2.</strong> Scatter the seed evenly by hand across the whole bed &mdash; aim for a generous, even sprinkle rather than bare patches.</li>
              <li className="text-[15px]"><strong className="text-earth">3.</strong> Rake it in lightly so most seed is just covered, and water if the soil is dry. Birds love the bigger seeds, so net field beans if they go missing.</li>
              <li className="text-[15px]"><strong className="text-earth">4.</strong> Leave it to grow and do its quiet work all winter. In spring, dig it in or cut it down a few weeks before you want to plant.</li>
            </ol>
            <p className="mt-4 text-[15px]">
              One thing to watch: mustard is a brassica, so don&apos;t sow it where cabbages, kale or other brassicas
              will follow &mdash; keep it out of that part of your{" "}
              <a href="/guides/crop-rotation" className="text-rust underline decoration-rust/30 hover:text-earth">crop rotation</a>.
            </p>
          </section>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What is a green manure?</h3>
                <p className="text-[15px]">A green manure (or cover crop) is a fast-growing plant you sow to cover bare soil rather than to eat. It protects the ground from winter rain, suppresses weeds, and is dug in or cut down later to add organic matter and &mdash; with beans and clovers &mdash; nitrogen, feeding the soil for free.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What&apos;s the best green manure to sow in autumn?</h3>
                <p className="text-[15px]">Grazing rye is the toughest and best for bulk and weed suppression, while field beans and winter tares add nitrogen &mdash; sow these from late summer into autumn. Phacelia, clover and mustard are less hardy, so sow them earlier.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Do you have to dig green manure in?</h3>
                <p className="text-[15px]">No. The traditional way is to dig it into the top few inches a few weeks before sowing. But for no-dig, cut it down at the surface and leave it as a mulch (or compost it), and let the worms take the goodness down for you.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <a href="/guides/autumn-winter-vegetables" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What to sow in autumn &amp; winter</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/composting" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Composting for allotments</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/crop-rotation" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Crop rotation</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/soil" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Understanding your soil</span>
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
