import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";
import { awinLink } from "@/lib/awin";
import AffiliateLink from "@/components/AffiliateLink";

const TAG = "whattosow21-21";
const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=${TAG}`;
const tm = (q: string) => awinLink(`https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`);

function trackingSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const metadata: Metadata = {
  title: "Growing Brassicas — Cabbage, Kale, Broccoli & Sprouts (UK Guide) | What To Sow",
  description:
    "How to grow brassicas in the UK: cabbage, kale, broccoli, cauliflower and Brussels sprouts. Sowing, planting firmly, protecting from cabbage white and clubroot, and a year-round harvest from one family.",
  keywords: [
    "growing brassicas UK",
    "how to grow cabbage kale broccoli",
    "brassica family vegetables",
    "cabbage white butterfly protection",
    "clubroot prevention",
    "growing brassicas allotment",
  ],
  openGraph: {
    title: "Growing Brassicas — Cabbage, Kale, Broccoli & Sprouts",
    description:
      "How to grow the cabbage family in the UK: sowing, firm planting, beating the pests, and a year-round harvest.",
    type: "article",
    url: "https://whattosow.co.uk/guides/growing-brassicas",
  },
  alternates: { canonical: "/guides/growing-brassicas" },
};

interface CropItem {
  name: string;
  slug?: string;
  note: string;
  seeds?: string;
}

const members: CropItem[] = [
  { name: "Kale", slug: "kale", note: "The easiest and hardiest of the lot — sow in late spring/summer for leaves that stand right through winter. Forgiving of poor soil and cold.", seeds: tm("Kale") },
  { name: "Cabbage", slug: "cabbage", note: "Summer, autumn, winter and spring types between them give cabbages almost year-round. Sow spring cabbage in late summer for early next year.", seeds: tm("Cabbage") },
  { name: "Purple sprouting broccoli", slug: "broccoli", note: "Sow in early summer for spears next spring, in the hungry gap. A long wait, but the most welcome harvest of the year.", seeds: tm("Sprouting%20Broccoli") },
  { name: "Cauliflower", slug: "cauliflower", note: "The fussiest brassica — needs rich, firm soil and steady moisture or the curds 'button' small. Worth it when it works.", seeds: tm("Cauliflower") },
  { name: "Brussels sprouts", slug: "brussels-sprouts", note: "Sow in spring for Christmas sprouts. Plant deep and firm — loose soil gives 'blown', open sprouts.", seeds: tm("Brussels%20Sprout") },
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
            product={`${item.name} seeds`}
            type="seed"
            merchant="thompson-morgan"
            position={`${topic}-seeds-${trackingSlug(item.slug ?? item.name)}`}
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

function BrassicaBuyerNote() {
  return (
    <aside className="my-8 border-y border-earth/10 py-5" aria-labelledby="brassica-buyer-note">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-rust mb-2">
        Buyer note
      </p>
      <h3 id="brassica-buyer-note" className="font-serif text-xl text-earth mb-3">
        Worth buying for brassicas
      </h3>
      <div className="space-y-4 text-[15px] leading-relaxed">
        <p className="text-earth">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">Buy if</span>{" "}
          cabbage whites or pigeons have ruined a crop before, or you are setting out a proper bed of kale, cabbage or
          sprouts. Fine mesh solves the real problem before it starts: cabbage whites cannot lay eggs on plants they
          cannot reach.{" "}
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">Skip if</span>{" "}
          you are only growing a few sacrificial leaves and you will check them often by hand.
        </p>
        <AffiliateLink href={az("brassica butterfly netting fine mesh")} product="brassica butterfly netting" type="gear" merchant="amazon-uk" position="brassica-protection-inline" className="font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">
          Compare brassica netting &rarr;
        </AffiliateLink>
        <p className="text-earth-light">
          <span className="font-serif text-earth">Skip butterfly decoys.</span> They are charming, but checking leaves
          and covering the bed does far more work.
        </p>
      </div>
    </aside>
  );
}

export default function GrowingBrassicasGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Growing Brassicas", item: "https://whattosow.co.uk/guides/growing-brassicas" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Growing Brassicas — Cabbage, Kale, Broccoli & Sprouts",
    description:
      "How to grow the cabbage family in the UK: sowing, firm planting, protecting from pests, and a year-round harvest.",
    url: "https://whattosow.co.uk/guides/growing-brassicas",
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
        name: "What vegetables are brassicas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Brassicas are the cabbage family: cabbage, kale, broccoli and calabrese, cauliflower, Brussels sprouts, kohlrabi, swede, turnips and the oriental leaves like pak choi and mustard. They share the same pests and diseases, so grow and rotate them as a group.",
        },
      },
      {
        "@type": "Question",
        name: "How do I protect brassicas from cabbage white butterflies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fine butterfly netting held off the leaves is by far the most reliable defence — it stops the butterflies laying their eggs in the first place. Back it up by checking the undersides of leaves for clusters of yellow eggs and rubbing them off, and by growing aromatic companions like onions and herbs to confuse the pests.",
        },
      },
      {
        "@type": "Question",
        name: "Why do my brassicas fall over or grow loosely?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Brassicas need firm soil and deep, firm planting. Plant them up to the first leaves, heel them in hard with your knuckles or boot, and stake tall ones like sprouts and sprouting broccoli. Loose roots give wind-rock, blown sprouts and small curds.",
        },
      },
      {
        "@type": "Question",
        name: "What is clubroot and how do I prevent it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Clubroot is a soil disease that swells and distorts brassica roots, stunting the plants. It thrives in acidic, wet soil and lingers for years, so prevent it by liming to raise the pH, improving drainage, rotating brassicas around your beds, and never bringing in infected plants. Raising your own from seed in clean compost helps avoid importing it.",
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
            Growing brassicas: cabbage, kale, broccoli &amp; sprouts
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            The cabbage family is the workhorse of the winter garden &mdash; the crops that keep the kitchen going when
            everything else has packed up. Get a few right and you&apos;ll be picking kale in the snow, cutting sprouting
            broccoli in the hungry gap, and pulling sprouts for Christmas dinner you grew yourself. They ask for two
            things in return: firm ground, and protection from everything that wants to eat them first.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            This is the family overview &mdash; for the full sowing dates and varieties of each crop, follow the links
            through to its own page.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* The family */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              One family, a year-round harvest
            </h2>
            <p className="mb-2">
              Brassicas are one big, generous family. The most familiar of them &mdash; cabbage, kale, broccoli,
              cauliflower, sprouts and kohlrabi &mdash; are, astonishingly, all the same plant bred into different
              shapes, with swede, turnip and the oriental leaves as close cousins. Because they share the same pests and
              diseases, we grow them together and rotate them around the beds as a group. Between them they crop in every
              season, so a few well-chosen types keep you in greens all year.
            </p>
            <div className="mt-4">
              {members.map((c) => (
                <CropRow key={c.name} item={c} topic="growing-brassicas" />
              ))}
            </div>
          </section>

          {/* Sowing & planting */}
          <SectionDivider label="The method" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Sow in a seedbed, plant firm
            </h2>
            <p className="mb-3">
              Most brassicas are best raised in a seedbed or in modules and transplanted, rather than sown where they&apos;re
              to grow &mdash; it saves space while the slower spring and summer crops finish, and gives you sturdy young
              plants to set out. Sow thinly, grow them on until they&apos;re a few inches tall with a good root, then move
              them to their final spacing.
            </p>
            <p className="mb-3">
              The golden rule is firmness. Brassicas hate loose ground: plant them deep, right up to the lowest leaves,
              and firm the soil hard around the stem &mdash; with your knuckles, or even your heel for the big ones. Loose
              roots are behind most brassica disappointments: wind-rocked cauliflowers, blown sprouts that won&apos;t
              tighten, plants that simply sulk. Water them in well, and keep them watered as they establish.
            </p>
          </section>

          <TipBox title="Feed them well">
            Brassicas are hungry, and the leafy ones especially love nitrogen. Grow them on ground that was well manured
            for a previous crop, or work in plenty of{" "}
            <Link href="/guides/composting" className="text-rust underline decoration-rust/30 hover:text-earth">compost</Link>.
            They&apos;re the classic crop to follow{" "}
            <Link href="/crops/peas" className="text-rust underline decoration-rust/30 hover:text-earth">peas</Link> and{" "}
            <Link href="/crops/runner-beans" className="text-rust underline decoration-rust/30 hover:text-earth">beans</Link> in
            the rotation, lapping up the nitrogen the legumes leave behind.
          </TipBox>

          {/* Pests */}
          <SectionDivider label="The pests" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Everything wants to eat them &mdash; here&apos;s the defence
            </h2>
            <p className="mb-3">
              It&apos;s worth knowing from the start: a brassica bed needs protecting, or the cabbage whites and pigeons
              will have it before you do &mdash; we&apos;ve learned that one the hard way. The good news is that the
              defences are simple and last for years.
            </p>
            <ul className="space-y-3 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Butterfly netting</span> &mdash; the headline act. Fine mesh held
                off the leaves stops cabbage whites laying their eggs at all. The single most effective thing you can do.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Check for eggs &amp; caterpillars</span> &mdash; if anything gets
                under the net, turn the leaves and rub off the clusters of yellow eggs before they hatch.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Brassica collars</span> &mdash; little discs around the stem base
                stop cabbage root fly laying at the roots. Easy to make from cardboard or carpet underlay.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Pigeon protection</span> &mdash; pigeons strip winter brassicas to
                the stalks. The same netting, kept taut, keeps them off too.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Companion planting</span> &mdash; aromatic herbs and onions help
                confuse the pests. See{" "}
                <Link href="/guides/companion-planting/companion-plants-for-brassicas" className="text-rust underline decoration-rust/30 hover:text-earth">companion plants for brassicas</Link>{" "}
                for the supporting cast &mdash; though netting is still the headliner.
              </li>
            </ul>
            <BrassicaBuyerNote />
          </section>

          <WarningBox title="Mind the clubroot">
            Clubroot is the brassica grower&apos;s real bogeyman &mdash; a soil disease that swells the roots, stunts the
            plants, and lingers in the ground for years. It loves acidic, wet soil, so lime your brassica bed to raise the
            pH, improve the drainage, rotate brassicas around your beds, and raise your own plants from seed in clean
            compost rather than importing the problem on bought-in seedlings.
          </WarningBox>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What vegetables are brassicas?</h3>
                <p className="text-[15px]">The cabbage family: cabbage, kale, broccoli and calabrese, cauliflower, Brussels sprouts, kohlrabi, swede, turnips and oriental leaves like pak choi and mustard. They share pests and diseases, so grow and rotate them as a group.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do I protect brassicas from cabbage white butterflies?</h3>
                <p className="text-[15px]">Fine butterfly netting held off the leaves is by far the most reliable defence — it stops the butterflies laying at all. Back it up by checking leaf undersides for yellow eggs and rubbing them off, and by growing aromatic companions to confuse the pests.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Why do my brassicas fall over or grow loosely?</h3>
                <p className="text-[15px]">They need firm soil and deep, firm planting. Plant up to the first leaves, heel them in hard, and stake tall ones like sprouts and sprouting broccoli. Loose roots give wind-rock, blown sprouts and small curds.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What is clubroot and how do I prevent it?</h3>
                <p className="text-[15px]">A soil disease that swells and distorts brassica roots and lingers for years. It thrives in acidic, wet soil, so lime to raise the pH, improve drainage, rotate brassicas, and raise your own plants in clean compost to avoid importing it.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/guides/companion-planting/companion-plants-for-brassicas" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Companion plants for brassicas</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/crop-rotation" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Crop rotation</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/pests" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Pests &amp; diseases</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/crops/kale" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to grow kale</span>
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
