import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";
import AffiliateLink from "@/components/AffiliateLink";
import LoopClip from "@/components/LoopClip";

const tm = (q: string) => `https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`;
const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}`;

export const metadata: Metadata = {
  title: "Growing Vegetables in Pots & Containers (UK Guide) | What To Sow",
  description:
    "How to grow vegetables in containers in the UK: the best crops for pots, choosing compost and the right size, watering and feeding, and getting a real harvest from a patio, balcony or doorstep. No garden needed.",
  keywords: [
    "growing vegetables in containers",
    "growing veg in pots UK",
    "container gardening vegetables",
    "balcony vegetable growing",
    "best vegetables for pots",
    "patio vegetable growing",
  ],
  openGraph: {
    title: "Growing Vegetables in Pots & Containers",
    description:
      "The best crops for pots, choosing compost and size, watering and feeding — a real harvest from a patio or balcony.",
    type: "article",
    url: "https://whattosow.co.uk/guides/growing-veg-in-containers",
  },
  alternates: { canonical: "/guides/growing-veg-in-containers" },
};

interface CropItem {
  name: string;
  slug?: string;
  note: string;
  seeds?: string;
}

const bestForPots: CropItem[] = [
  { name: "Salad leaves & lettuce", slug: "lettuce", note: "The perfect container crop — shallow-rooted, quick, and you pick a few leaves at a time. A trough by the back door earns its keep all season.", seeds: tm("Salad%20Leaves") },
  { name: "Tomatoes (bush & tumbling)", slug: "tomatoes", note: "Bush and tumbling types are made for pots, troughs and hanging baskets. Give a big pot, steady water and a weekly feed.", seeds: tm("Tomato%20Bush") },
  { name: "Chillies & peppers", slug: "chillies", note: "Compact, warmth-loving and happy on a sunny windowsill or doorstep in a pot. One of the most rewarding container crops.", seeds: tm("Chilli") },
  { name: "Herbs", slug: "basil", note: "Basil, parsley, chives, mint (keep mint in its own pot — it bullies). A few herb pots by the kitchen door are pure pleasure.", seeds: tm("Herb") },
  { name: "Potatoes (in bags)", slug: "early-potatoes", note: "Early potatoes in a deep bag or bucket are foolproof and brilliant fun — tip the bag out for a treasure-hunt harvest.", seeds: tm("Seed%20Potatoes") },
  { name: "Radishes & beetroot", slug: "radishes", note: "Quick roots that crop happily in a deepish pot or trough. Radishes in four weeks; beetroot not much longer.", seeds: tm("Radish") },
  { name: "Dwarf French beans", slug: "french-beans", note: "Compact, heavy-cropping and no need for tall supports — a big pot of dwarf beans gives handfuls all summer.", seeds: tm("Dwarf%20French%20Bean") },
];

function CropRow({ item }: { item: CropItem }) {
  return (
    <div className="border-t border-earth/8 py-4">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        {item.slug ? (
          <Link href={`/crops/${item.slug}`} className="font-serif text-lg text-earth hover:text-rust transition-colors">
            {item.name}
          </Link>
        ) : (
          <span className="font-serif text-lg text-earth">{item.name}</span>
        )}
        {item.seeds && (
          <AffiliateLink
            href={item.seeds}
            product={`${item.name} seeds`}
            type="seed"
            merchant="thompson-morgan"
            position="containers-seeds"
            className="font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors shrink-0"
          >
            Seeds at T&amp;M &rarr;
          </AffiliateLink>
        )}
      </div>
      <p className="text-sm text-earth-light mt-1.5 leading-relaxed">{item.note}</p>
    </div>
  );
}

export default function GrowingInContainersGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Growing Vegetables in Containers", item: "https://whattosow.co.uk/guides/growing-veg-in-containers" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Growing Vegetables in Pots & Containers",
    description:
      "How to grow vegetables in containers in the UK: the best crops for pots, compost and size, watering and feeding.",
    url: "https://whattosow.co.uk/guides/growing-veg-in-containers",
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
        name: "What vegetables grow best in pots and containers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Salad leaves, bush and tumbling tomatoes, chillies and peppers, herbs, early potatoes in bags, radishes, beetroot and dwarf French beans are all brilliant in containers. As a rule, anything compact, shallow-rooted or quick does well; very large or deep-rooted crops like maincrop potatoes, parsnips and Brussels sprouts are harder in pots.",
        },
      },
      {
        "@type": "Question",
        name: "What compost should I use for container vegetables?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A good peat-free multipurpose compost suits most container veg. For bigger, hungry, longer-season plants like tomatoes, mix in some soil-based John Innes compost too — it holds water and nutrients better and is steadier through a long season. Don't use garden soil alone in pots; it compacts and drains poorly.",
        },
      },
      {
        "@type": "Question",
        name: "How often should I water vegetables in containers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Far more often than plants in the ground — pots dry out fast. In warm weather most containers need watering every day, sometimes twice; small pots and hanging baskets dry quickest of all. Check daily by pushing a finger into the compost, and water thoroughly until it runs from the bottom rather than giving a little splash.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to feed vegetables grown in pots?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — the nutrients in fresh compost run out after about six weeks, and frequent watering washes them through. After that, feed regularly: a balanced liquid feed for leafy crops, and a high-potash tomato feed once fruiting crops like tomatoes, chillies and beans start to flower.",
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
            Growing guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-4 max-w-2xl">
            Growing vegetables in pots &amp; containers
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            You don&apos;t need an allotment, or even a garden, to grow something good to eat. A sunny doorstep, a
            balcony, a few pots on a patio &mdash; that&apos;s plenty for a summer of salad, a pot of chillies on the
            windowsill, herbs by the kitchen door and tomatoes ripening where you can watch them. Container growing is
            how a great many people start, and it&apos;s a real harvest, not a consolation prize.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            Get a few simple things right &mdash; the right crops, enough room, and steady water &mdash; and a clutch of
            pots will give you more than you&apos;d ever expect.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Best crops */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              The best crops for pots
            </h2>
            <p className="mb-2">
              The rule of thumb is simple: anything compact, shallow-rooted or quick does well in a container. Start with
              these and you can hardly go wrong.
            </p>
            <div className="mt-4">
              {bestForPots.map((c) => (
                <CropRow key={c.name} item={c} />
              ))}
            </div>
            <p className="text-sm text-earth-light mt-4">
              Harder in pots (but not impossible): maincrop potatoes, parsnips and other big roots, Brussels sprouts and
              the larger brassicas &mdash; they want more depth and room than most containers give.
            </p>
          </section>

          {/* Pots & compost */}
          <SectionDivider label="The basics" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Pots, compost and drainage
            </h2>
            <ul className="space-y-3 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Go bigger than you think</span> &mdash; the bigger the pot, the
                more compost it holds, the less often it dries out, and the better the crop. Small pots are hard work in
                summer. A tomato or a courgette wants a good 30&ndash;40cm pot at least.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Drainage holes are non-negotiable</span> &mdash; roots sitting in
                waterlogged compost rot. Make sure every container has holes, and stand it on little feet or stones so
                they don&apos;t block.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Use a good peat-free compost</span> &mdash; multipurpose for most
                crops; for hungry, long-season plants like tomatoes, mix in some soil-based John Innes, which holds water
                and food better. Don&apos;t fill pots with garden soil alone &mdash; it compacts and drains badly.{" "}
                <AffiliateLink href={az("peat free multipurpose compost")} product="peat-free compost" type="gear" merchant="amazon" position="containers-compost" className="text-rust underline decoration-rust/30 hover:text-earth">Compare peat-free compost &rarr;</AffiliateLink>
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Almost anything can be a container</span> &mdash; proper pots,
                troughs, an old bucket with holes drilled, a{" "}
                <AffiliateLink href={az("potato grow bags planter")} product="potato grow bags" type="gear" merchant="amazon" position="containers-grow-bag" className="text-rust underline decoration-rust/30 hover:text-earth">Compare potato grow bags</AffiliateLink>. If it holds compost and drains, it&apos;ll grow something.
              </li>
            </ul>
          </section>

          {/* Watering & feeding */}
          <SectionDivider label="Looking after them" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Water and food &mdash; the make-or-break
            </h2>
            <p className="mb-3">
              This is where container crops are won or lost. Pots dry out far faster than open ground, so in warm weather
              <strong className="text-earth"> most containers need watering every single day</strong>, sometimes twice
              &mdash; small pots and hanging baskets fastest of all. Check daily with a finger in the compost, and water
              thoroughly until it runs from the bottom, rather than a quick splash that never reaches the roots.
            </p>
            <p className="mb-3">
              And they need feeding. The food in fresh compost runs out after about six weeks, and all that watering
              washes it through, so after the first month or so, feed regularly: a balanced{" "}
              <AffiliateLink href={az("liquid plant food vegetables")} product="liquid plant feed" type="gear" merchant="amazon" position="containers-liquid-feed" className="text-rust underline decoration-rust/30 hover:text-earth">Compare liquid feed</AffiliateLink>{" "}
              for leafy crops, and a high-potash tomato feed once tomatoes, chillies and beans begin to flower.
            </p>

            <figure className="mt-6 max-w-[24rem] mx-auto sm:mx-0">
              <LoopClip
                src="/videos/blog/container-watering.mp4"
                poster="/videos/blog/container-watering-poster.webp"
                alt="A watering can sprinkling a trough planter on a patio, pots and seed trays all around"
              />
              <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-earth-lighter">
                The daily round, on our own patio &mdash; thoroughly, until it runs from the bottom.
              </figcaption>
            </figure>
          </section>

          <TipBox title="Group your pots together">
            Stand your containers close together in a sunny, sheltered spot rather than dotted about. Grouped pots shade
            each other&apos;s sides, hold humidity and dry out more slowly &mdash; and it&apos;s far quicker to water a
            cluster than to trail round with the can. A few pollinator flowers tucked among them (a pot of nasturtiums,
            some borage) bring in the bees for your tomatoes and beans.
          </TipBox>

          <WarningBox title="Don't let them dry out and bolt">
            A pot that dries to dust, even once, sets crops back hard &mdash; salad turns bitter and bolts, beans drop
            their flowers, tomatoes split when you finally water. In a heatwave or while you&apos;re away, move pots into
            light shade, mulch the surface, stand them in saucers of water, or rig up a simple drip system. Consistency is
            everything in a container.
          </WarningBox>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What vegetables grow best in pots and containers?</h3>
                <p className="text-[15px]">Salad leaves, bush and tumbling tomatoes, chillies and peppers, herbs, early potatoes in bags, radishes, beetroot and dwarf French beans. As a rule anything compact, shallow-rooted or quick does well; big or deep-rooted crops like maincrop potatoes, parsnips and sprouts are harder.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What compost should I use for container vegetables?</h3>
                <p className="text-[15px]">A good peat-free multipurpose suits most container veg. For big, hungry, long-season plants like tomatoes, mix in some soil-based John Innes — it holds water and food better. Don&apos;t use garden soil alone; it compacts and drains poorly in pots.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How often should I water vegetables in containers?</h3>
                <p className="text-[15px]">Far more than plants in the ground — pots dry fast. In warm weather most need watering daily, sometimes twice; small pots and baskets quickest. Check daily with a finger in the compost and water until it runs from the bottom.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Do I need to feed vegetables grown in pots?</h3>
                <p className="text-[15px]">Yes — compost runs out of food after about six weeks and watering washes it through. Then feed regularly: a balanced liquid feed for leafy crops, and a high-potash tomato feed once fruiting crops start to flower.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/guides/companion-planting/companion-planting-small-gardens" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Companion planting for small gardens &amp; containers</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/growing-winter-salad-leaves" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Growing winter salad leaves</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/succession-sowing" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Succession sowing</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What to sow now for your postcode</span>
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
