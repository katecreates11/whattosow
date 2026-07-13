import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateLink from "@/components/AffiliateLink";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";
import { awinLink } from "@/lib/awin";

const tm = (q: string) => awinLink(`https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`);
const trackingSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const metadata: Metadata = {
  title: "Succession Sowing — How to Grow a Steady Harvest (UK Guide) | What To Sow",
  description:
    "Succession sowing explained: how to sow little and often so you harvest a steady supply instead of a glut, which crops to stagger, and a simple summer rhythm. The habit that doubles what a small space gives.",
  keywords: [
    "succession sowing",
    "successional sowing",
    "sow little and often",
    "how to avoid a glut",
    "continuous harvest vegetables",
    "successional planting UK",
  ],
  openGraph: {
    title: "Succession Sowing — How to Grow a Steady Harvest",
    description:
      "Sow little and often for a steady supply instead of a glut. The crops to stagger and a simple summer rhythm.",
    type: "article",
    url: "https://whattosow.co.uk/guides/succession-sowing",
  },
  alternates: { canonical: "/guides/succession-sowing" },
};

interface SowItem {
  name: string;
  slug?: string;
  note: string;
  seeds?: string;
}

const stagger: SowItem[] = [
  { name: "Salad leaves & lettuce", slug: "lettuce", note: "The classic — a short row every 2 weeks keeps the bowl full and stops it all bolting at once.", seeds: tm("Lettuce") },
  { name: "Radishes", slug: "radishes", note: "Up in a month, so sow a pinch every couple of weeks. Easy to slot between slower rows.", seeds: tm("Radish") },
  { name: "Rocket & oriental leaves", slug: "rocket", note: "Quick and prone to bolting in heat — little and often is the only way to keep a supply.", seeds: tm("Rocket") },
  { name: "Beetroot", slug: "beetroot", note: "Two or three sowings across the season give tender young roots from summer into autumn.", seeds: tm("Beetroot") },
  { name: "Carrots", slug: "carrots", note: "Stagger a few sowings for a long pull rather than one big lift that has to be stored.", seeds: tm("Carrot") },
  { name: "Spring onions", slug: "spring-onions", note: "Sow a short row monthly through spring and summer for a constant supply.", seeds: tm("Spring%20Onion") },
  { name: "Dwarf French beans", slug: "french-beans", note: "A second sowing a few weeks after the first extends the picking by a month or more.", seeds: tm("French%20Bean") },
  { name: "Peas", slug: "peas", note: "Two or three sowings spread the (always too short) pea season out beautifully.", seeds: tm("Pea") },
];

function SowRow({ item }: { item: SowItem }) {
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
            position={`succession-sowing-seeds-${trackingSlug(item.slug ?? item.name)}`}
            data-umami-event-topic="succession-sowing"
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

export default function SuccessionSowingGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Succession Sowing", item: "https://whattosow.co.uk/guides/succession-sowing" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Succession Sowing — How to Grow a Steady Harvest",
    description:
      "How to sow little and often for a steady supply instead of a glut, which crops to stagger, and a simple seasonal rhythm.",
    url: "https://whattosow.co.uk/guides/succession-sowing",
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
        name: "What is succession sowing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Succession sowing means sowing the same crop in small batches at intervals — say a short row of lettuce every two weeks — instead of all at once. The result is a steady, manageable supply over many weeks rather than a glut that all comes ready together and then runs out.",
        },
      },
      {
        "@type": "Question",
        name: "How often should I sow for succession?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For fast crops like salad and radish, every two weeks works well. For slightly slower ones like beetroot, carrots and beans, every three to four weeks is plenty. A good rule of thumb is to sow the next batch when the last one has germinated and is up.",
        },
      },
      {
        "@type": "Question",
        name: "Which vegetables are best for succession sowing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quick crops with a short picking window benefit most: lettuce and salad leaves, radishes, rocket, beetroot, carrots, spring onions, dwarf French beans and peas. Crops that crop over a long season anyway — like courgettes, kale and tomatoes — don't usually need staggering.",
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
            Succession sowing: a steady harvest, not a glut
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            Everyone who&apos;s grown their own knows the heartbreak of a glut: forty lettuces hearting up in the same
            week, a wall of radishes turning woody, a mountain of beans you can&apos;t give away fast enough. The cure is
            the gentlest habit in gardening &mdash; sow a little, sow it often, and let the harvest arrive in a steady
            trickle instead of one overwhelming flood.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            It&apos;s the single thing that turns a small patch into a kitchen that&apos;s never short of something to pick &mdash; right through{" "}
            <Link href="/longest-day" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">
              the longest day
            </Link>{" "}
            and beyond.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* What it is */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              What succession sowing actually means
            </h2>
            <p className="mb-3">
              Instead of sowing a whole packet of lettuce in one go, you sow a short row &mdash; a dozen seeds, say &mdash;
              and then sow another short row a fortnight later, and another a fortnight after that. Each little batch comes
              ready in turn, so you&apos;re picking tender, just-right leaves for months instead of facing a glut followed
              by a famine.
            </p>
            <p className="mb-3">
              There&apos;s a second kind of succession, too: the moment one crop finishes and clears a bed, something new
              goes straight in behind it. Pull the early peas, sow autumn salad. Lift the garlic, follow with French
              beans. Bare soil in the growing season is a wasted opportunity &mdash; succession is how you keep every inch
              working.
            </p>
          </section>

          {/* The rhythm */}
          <TipBox title="The simple rule">
            Sow your next batch when the last one has come up. That one habit keeps the gaps even without any calendar or
            fuss &mdash; by the time a row is germinated and growing away, it&apos;s time for the next. Roughly: every 2
            weeks for fast crops (salad, radish), every 3&ndash;4 weeks for slower ones (beetroot, carrots, beans).
          </TipBox>

          {/* Crops to stagger */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              The crops worth staggering
            </h2>
            <p className="mb-2">
              Not everything needs it. Courgettes, kale and tomatoes crop over a long season from a single sowing, so
              leave those be. Succession is for the quick crops with a short picking window &mdash; the ones that go from
              perfect to past-it in a week:
            </p>
            <div className="mt-4">
              {stagger.map((c) => (
                <SowRow key={c.name} item={c} />
              ))}
            </div>
          </section>

          <WarningBox title="Adjust for the seasons">
            Crops grow faster as the days lengthen and warm, then slow again towards autumn. So early and late in the
            season, leave a little longer between sowings; in high summer, tighten the gaps. And in the hottest weeks many
            salads sulk and bolt &mdash; sow those in a cooler, shadier spot, or start them in modules to plant out once
            the heat eases.
          </WarningBox>

          {/* Practical */}
          <SectionDivider label="Making it a habit" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              How to keep it going
            </h2>
            <ul className="space-y-2 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Sow something every visit</strong> &mdash; make it a ritual. A pinch of
                salad and a few radish seeds every time you&apos;re out among your beds, and succession looks after itself.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Use modules for the trickier crops</strong> &mdash; starting batches in
                trays means a plant-out-ready set is always waiting to fill the next gap, heat or pests notwithstanding.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Keep a note of what you sowed and when</strong> &mdash; it&apos;s the only
                way to spot the gaps before they happen.{" "}
                <Link href="/my-plot" className="text-rust underline decoration-rust/30 hover:text-earth">My plot</Link> tracks
                it for you and works out the harvest dates.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Follow one crop with another</strong> &mdash; plan what goes into each bed
                next, so nothing sits empty.{" "}
                <a href="/guides/crop-rotation" className="text-rust underline decoration-rust/30 hover:text-earth">Crop rotation</a>{" "}
                helps you choose well.
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What is succession sowing?</h3>
                <p className="text-[15px]">Sowing the same crop in small batches at intervals &mdash; a short row of lettuce every two weeks, say &mdash; instead of all at once. The result is a steady, manageable supply over many weeks rather than a glut that comes ready together and then runs out.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How often should I sow for succession?</h3>
                <p className="text-[15px]">Every two weeks for fast crops like salad and radish; every three to four weeks for slower ones like beetroot, carrots and beans. A reliable rule: sow the next batch when the last one is up and growing.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Which vegetables are best for succession sowing?</h3>
                <p className="text-[15px]">Quick crops with a short picking window benefit most: lettuce and salad leaves, radishes, rocket, beetroot, carrots, spring onions, dwarf French beans and peas. Long-cropping plants like courgettes, kale and tomatoes don&apos;t usually need it.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/guides/what-to-sow-in-summer-uk" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What to sow in summer</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/dealing-with-the-glut" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Already got the glut? Here&apos;s what to do with it</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/seed-starting" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Starting from seed</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/my-plot" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Track your sowings on my plot</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Sowing dates for your postcode</span>
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
