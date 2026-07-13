import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateLink from "@/components/AffiliateLink";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";
import { awinLink } from "@/lib/awin";

const tm = (q: string) => awinLink(`https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`);

function trackingSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const metadata: Metadata = {
  title: "Growing Onions, Garlic & Leeks — The Allium Family (UK Guide) | What To Sow",
  description:
    "How to grow alliums in the UK: onions and shallots from sets, garlic from cloves, and leeks from seed. When to plant, how to space and feed them, beating allium pests, and harvesting and storing well.",
  keywords: [
    "growing onions UK",
    "how to grow garlic",
    "growing leeks",
    "allium family vegetables",
    "onion sets vs seed",
    "planting garlic cloves UK",
  ],
  openGraph: {
    title: "Growing Onions, Garlic & Leeks — The Allium Family",
    description:
      "How to grow alliums in the UK: onions and shallots from sets, garlic from cloves, leeks from seed — planting, feeding, storing.",
    type: "article",
    url: "https://whattosow.co.uk/guides/growing-onions-garlic-leeks",
  },
  alternates: { canonical: "/guides/growing-onions-garlic-leeks" },
};

interface CropItem {
  name: string;
  slug?: string;
  note: string;
  seeds?: string;
}

const members: CropItem[] = [
  { name: "Onions (from sets)", slug: "onion-sets", note: "The easy way in — little immature bulbs you push into the soil in spring (or autumn for an early crop). Far simpler than seed.", seeds: tm("Onion%20Sets") },
  { name: "Garlic (from cloves)", slug: "garlic", note: "Plant individual cloves in autumn — they need a cold spell to split into a full bulb. The easiest, most rewarding allium of all.", seeds: tm("Garlic") },
  { name: "Leeks (from seed)", slug: "leeks", note: "Sow in spring, transplant the pencil-thin young plants into deep holes, and they'll stand right through winter for digging as you need them.", seeds: tm("Leek") },
  { name: "Spring onions", slug: "spring-onions", note: "Quick and undemanding from seed — sow a short row every few weeks through the season for a constant supply.", seeds: tm("Spring%20Onion") },
];

function CropRow({ item, topic }: { item: CropItem; topic: string }) {
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
            product={`${item.name} stock`}
            type="seed"
            merchant="thompson-morgan"
            position={`allium-family-stock-${trackingSlug(item.slug ?? item.name)}`}
            data-umami-event-topic={topic}
            className="font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors shrink-0"
          >
            Allium stock at T&amp;M &rarr;
          </AffiliateLink>
        )}
      </div>
      <p className="text-sm text-earth-light mt-1.5 leading-relaxed">{item.note}</p>
    </div>
  );
}

export default function GrowingAlliumsGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Growing Onions, Garlic & Leeks", item: "https://whattosow.co.uk/guides/growing-onions-garlic-leeks" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Growing Onions, Garlic & Leeks — The Allium Family",
    description:
      "How to grow alliums in the UK: onions and shallots from sets, garlic from cloves, leeks from seed — planting, feeding and storing.",
    url: "https://whattosow.co.uk/guides/growing-onions-garlic-leeks",
    publisher: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
    datePublished: "2026-06-07",
    dateModified: "2026-06-07",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Should I grow onions from sets or seed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For most growers, sets — small immature bulbs — are the easy choice. They're quicker, more forgiving and less prone to pests than seed-raised onions, and you simply push them into the soil in spring or autumn. Seed is cheaper, offers more variety and can give bigger bulbs, but needs an early indoor start and more attention. Start with sets.",
        },
      },
      {
        "@type": "Question",
        name: "When do you plant garlic in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Autumn is the main planting time, from October to November. Garlic needs a spell of cold (a process called vernalisation) to trigger the single clove to split into a full bulb, so an autumn planting gives the best results. You can plant in late winter or early spring too, but bulbs are usually smaller.",
        },
      },
      {
        "@type": "Question",
        name: "How do you grow leeks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sow leeks thinly in spring, grow the seedlings on until they're pencil-thick, then transplant them into deep dibber holes about 15cm deep and just water them in — don't backfill. The deep hole blanches the stem white. They're hardy and stand right through winter, so you dig them as you need them.",
        },
      },
      {
        "@type": "Question",
        name: "How do I store onions and garlic?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lift them when the foliage flops and yellows, then dry (cure) them somewhere warm and airy for a couple of weeks until the skins are papery and the necks dry. Once cured, store onions and garlic in a cool, dry, airy place — nets, trays or plaited ropes — and well-grown, well-cured bulbs will keep for many months.",
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
            Growing onions, garlic &amp; leeks
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            The allium family &mdash; onions, garlic, shallots, leeks and spring onions &mdash; are the quiet backbone of
            the veg patch. They take up little room, ask for little fuss, store for months, and flavour almost everything you
            cook. Better still, their pungent scent is a gift to their neighbours, muddling the pests that hunt by smell.
            A bed of alliums is about the most useful ground you can give over to anything.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            This is the family overview &mdash; for full sowing dates and varieties of each, follow the links through to
            its own page.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* The family */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              One family, four easy crops
            </h2>
            <p className="mb-2">
              What unites the alliums is how little they need: an open, sunny spot, soil that isn&apos;t freshly manured
              (rich ground gives soft growth and storage problems), and not much competition from weeds. Each is started a
              slightly different way, which is the main thing to get right:
            </p>
            <div className="mt-4">
              {members.map((c) => (
                <CropRow key={c.name} item={c} topic="growing-alliums" />
              ))}
            </div>
          </section>

          {/* Planting */}
          <SectionDivider label="Getting them in" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Planting &amp; spacing
            </h2>
            <p className="mb-3">
              <strong className="text-earth">Onions &amp; shallots from sets:</strong> push each set into soft soil so just
              the tip shows, about 10cm apart in rows 25&ndash;30cm apart. Firm them gently &mdash; birds love to tweak
              loose sets out, so check the row for a few days and re-firm any that pop up. Shallots are the same, but each
              one multiplies into a clump.
            </p>
            <p className="mb-3">
              <strong className="text-earth">Garlic from cloves:</strong> split a bulb into individual cloves and plant
              them pointy-end up, 2&ndash;3cm deep and 15cm apart, in autumn. Use proper seed garlic rather than a
              supermarket bulb &mdash; it&apos;s certified disease-free and suited to our climate.
            </p>
            <p className="mb-3">
              <strong className="text-earth">Leeks from seed:</strong> the clever trick is the deep hole. Once the
              seedlings are pencil-thick, make a 15cm dibber hole, drop a leek in, and simply fill it with water rather
              than soil. The hole blanches a long white stem as the leek swells.
            </p>
          </section>

          <TipBox title="Don't grow them on fresh muck">
            Alliums prefer ground that was manured for a previous crop, not freshly fed. Too much nitrogen gives lush
            leaves, soft bulbs and poor keeping. They&apos;re the ideal crop to follow a hungry feeder like brassicas in
            the <Link href="/guides/crop-rotation" className="text-rust underline decoration-rust/30 hover:text-earth">rotation</Link>,
            taking what&apos;s left rather than wanting a fresh helping.
          </TipBox>

          {/* Pests & care */}
          <SectionDivider label="Looking after them" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Keeping them growing cleanly
            </h2>
            <ul className="space-y-3 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Keep them weed-free</span> &mdash; alliums have wispy roots and
                hate competition. Hand-weed carefully so you don&apos;t nick the bulbs.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Watch for allium leaf miner &amp; onion fly</span> &mdash; the
                modern scourge. Fine insect mesh over the bed at the key egg-laying times (spring and autumn) is the
                surest defence; companion-grown carrots help confuse onion fly too.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Don&apos;t over-water</span> &mdash; a steady supply while they
                bulk up, then ease off as they near harvest so they ripen and store well.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Rotate them</span> &mdash; alliums build up soil pests and white
                rot over time, so move them around your beds and never grow them in the same spot two years running.
              </li>
            </ul>
            <p className="mt-3">
              They&apos;re wonderful companions, too &mdash; see{" "}
              <Link href="/guides/companion-planting/companion-plants-for-onions-garlic" className="text-rust underline decoration-rust/30 hover:text-earth">companion plants for onions &amp; garlic</Link>{" "}
              for what to grow alongside (and the one crop to keep them away from).
            </p>
          </section>

          {/* Harvest & store */}
          <SectionDivider label="Harvest & store" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Lifting, curing &amp; keeping
            </h2>
            <p className="mb-3">
              Onions and garlic tell you they&apos;re ready when the foliage flops over and yellows &mdash; resist the
              urge to bend the tops down yourself; let them do it. Ease the bulbs up with a fork and lay them out to
              <strong className="text-earth"> cure</strong>: a fortnight somewhere warm, dry and airy (a greenhouse bench
              or a rack in the shed) until the skins are papery and the necks fully dry.
            </p>
            <p className="mb-3">
              Cured properly, they keep for months in nets, trays or plaited ropes somewhere cool and dry &mdash; the real
              reward of the allium bed, a homegrown store that sees you through the winter. Leeks need no storing at all:
              hardy as they are, leave them in the ground and dig them fresh whenever you want one.
            </p>
          </section>

          <WarningBox title="The one disease to know: white rot">
            White rot is a fungus that rots allium roots and bases, leaving a fluffy white mould, and it survives in the
            soil for many years. There&apos;s no cure, so it&apos;s all about prevention: rotate strictly, never move soil
            or tools from an infected bed, and be wary of bringing it in on cheap sets or supermarket garlic. Clean seed
            stock and good rotation keep it at bay.
          </WarningBox>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Should I grow onions from sets or seed?</h3>
                <p className="text-[15px]">For most growers, sets are the easy choice — quicker, more forgiving and less pest-prone, and you just push them into the soil. Seed is cheaper with more variety and can give bigger bulbs, but needs an early indoor start and more care. Start with sets.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">When do you plant garlic in the UK?</h3>
                <p className="text-[15px]">Mainly autumn, October to November. Garlic needs a cold spell to split a clove into a full bulb, so an autumn planting works best. You can plant in late winter or early spring too, but the bulbs are usually smaller.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do you grow leeks?</h3>
                <p className="text-[15px]">Sow thinly in spring, grow on until pencil-thick, then transplant into deep 15cm dibber holes and water in (don&apos;t backfill) — the hole blanches a long white stem. They&apos;re hardy and stand all winter, so dig them as you need them.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do I store onions and garlic?</h3>
                <p className="text-[15px]">Lift when the foliage flops and yellows, then cure them somewhere warm and airy for a couple of weeks until the skins are papery. Store cured bulbs cool, dry and airy in nets or ropes, and they&apos;ll keep for months.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/guides/companion-planting/companion-plants-for-onions-garlic" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Companion plants for onions &amp; garlic</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/crops/garlic" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to grow garlic</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/crops/leeks" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to grow leeks</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/crop-rotation" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Crop rotation</span>
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
