import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateLink from "@/components/AffiliateLink";
import ColdSnapNote from "@/components/ColdSnapNote";
import { SectionDivider, TipBox } from "@/components/GuideVisuals";
import { awinLink } from "@/lib/awin";

const tm = (q: string) => awinLink(`https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`);

export const metadata: Metadata = {
  title: "Sow Now for a Winter Harvest — High-Summer Sowing UK | What To Sow",
  description:
    "Why high summer, not spring, is the best time to sow for winter: the warmest soil of the year means seeds germinate in days. What's worth sowing this week, and when the cold really reaches your own patch.",
  keywords: [
    "sow now for winter harvest",
    "what to sow for winter UK",
    "high summer sowing",
    "hungry gap sowing",
  ],
  openGraph: {
    title: "Sow Now for a Winter Harvest",
    description:
      "The warmest soil of the year is right now — here's what to sow while it lasts, and when the cold actually reaches your patch.",
    type: "article",
    url: "https://whattosow.co.uk/guides/sow-now-eat-all-winter",
  },
  alternates: { canonical: "/guides/sow-now-eat-all-winter" },
};

interface SowItem {
  name: string;
  slug: string;
  href: string;
  note: string;
  seeds?: string;
}

const worthSowing: SowItem[] = [
  {
    name: "Winter salads & oriental leaves",
    slug: "winter-salad-leaves",
    href: "/guides/growing-winter-salad-leaves",
    note: "Mizuna, mustards, land cress — they germinate fast in warm soil now and keep giving right through the cold, long after the summer lettuce has bolted.",
    seeds: tm("Oriental Leaves"),
  },
  {
    name: "Swiss chard",
    slug: "swiss-chard",
    href: "/crops/swiss-chard",
    note: "Sow it now and it barely notices winter — one of the few things you can still be cutting in January.",
    seeds: tm("Swiss Chard"),
  },
  {
    name: "Turnips",
    slug: "turnips",
    href: "/crops/turnips",
    note: "A quick root from a summer sowing, ready in weeks — the young leaves are worth eating too, wilted like spinach.",
    seeds: tm("Turnip"),
  },
  {
    name: "Carrots (a fast variety)",
    slug: "carrots",
    href: "/crops/carrots",
    note: "A late sowing often dodges the worst of carrot fly, which is mostly done flying by the time these roots swell.",
    seeds: tm("Carrot"),
  },
  {
    name: "Kale",
    slug: "kale",
    href: "/crops/kale",
    note: "Sow now for plants big enough to shrug off frost — the most generous leaf in the whole plot come the hungry gap.",
    seeds: tm("Kale"),
  },
  {
    name: "Spring cabbage",
    slug: "cabbage",
    href: "/crops/cabbage",
    note: "A late-summer sowing gives small, sweet heads and loose greens to cut early next spring, when little else is ready.",
    seeds: tm("Spring Cabbage"),
  },
  {
    name: "Dwarf French beans (a last gamble)",
    slug: "french-beans",
    href: "/crops/french-beans",
    note: "Worth trying if your soil's still warm — a fast dwarf variety can just about squeeze in a crop before the first frost cuts it short.",
    seeds: tm("Dwarf French Bean"),
  },
];

function SowRow({ item }: { item: SowItem }) {
  return (
    <div className="border-t border-earth/8 py-4">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <Link href={item.href} className="font-serif text-lg text-earth hover:text-rust transition-colors">
          {item.name}
        </Link>
        {item.seeds && (
          <AffiliateLink
            href={item.seeds}
            product={`${item.name} seeds`}
            type="seed"
            merchant="thompson-morgan"
            position="winter-sowing-seeds"
            data-umami-event="affiliate-click" data-umami-event-type="seed" data-umami-event-merchant="thompson-morgan"
            data-umami-event-topic="winter-sowing"
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

export default function SowNowEatAllWinterGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Sow Now for a Winter Harvest", item: "https://whattosow.co.uk/guides/sow-now-eat-all-winter" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Sow Now for a Winter Harvest",
    description:
      "Why high summer is the best time to sow for winter, what's worth sowing this week, and when the cold actually reaches your own patch.",
    url: "https://whattosow.co.uk/guides/sow-now-eat-all-winter",
    publisher: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
    datePublished: "2026-07-15",
    dateModified: "2026-07-15",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is it too late to sow anything in high summer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not remotely. July and August soil is the warmest it will be all year, so seed sown now germinates in days rather than weeks. Winter salads, chard, turnips, a fast carrot, kale and spring cabbage all go in now for a harvest that carries you through the cold and into the hungry gap.",
        },
      },
      {
        "@type": "Question",
        name: "When does the first frost usually arrive?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most of the UK doesn't see a proper frost until around 25 October, though it varies a good few weeks either way depending on where you are — inland and northern gardens tend to see it earlier, coastal and southern ones later. Enter your postcode above and we'll work out roughly when it reaches your own patch.",
        },
      },
      {
        "@type": "Question",
        name: "What is the hungry gap and does sowing now help?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The hungry gap is the lean stretch in early spring after winter crops are finished and before new-season veg is ready. Kale, spring cabbage and chard sown now are exactly what closes that gap — they stand through winter and are ready to pick just when the plot has least else to offer.",
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
            Seasonal guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-4 max-w-2xl">
            Sow now, eat all winter
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            The soil is warmer today than it will be at any other point this year &mdash; warmer than April, warmer
            than May, warmer than the whole of spring put together. A seed dropped into it now is up in days, not
            weeks. It doesn&apos;t feel like the moment to be sowing anything &mdash; the beds are full, the tomatoes
            are coming thick and fast, and summer has the look of a season that&apos;s already peaked. But this is
            exactly when the winter plot gets started.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            What goes in over the next few weeks is what stands between an empty plot in February and something
            worth picking &mdash; through the cold, and into the hungry gap beyond it, when this year&apos;s crops
            are long finished and next spring&apos;s aren&apos;t ready yet.
          </p>
        </div>

        <div className="px-6 sm:px-10 lg:px-16 max-w-2xl mb-10">
          <ColdSnapNote />
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Worth sowing this week
            </h2>
            <p className="mb-2">
              A short list, not a long one &mdash; these are the crops that genuinely earn a high-summer sowing,
              rather than everything you could theoretically fit in.
            </p>
            <div className="mt-4">
              {worthSowing.map((item) => (
                <SowRow key={item.slug} item={item} />
              ))}
            </div>
          </section>

          <TipBox title="If it doesn't come up">
            Don&apos;t take it to heart. A patch of high-summer soil can dry out fast, and a sowing that fails now
            usually just means the drill went in dry rather than anything gone wrong. There&apos;s nearly always
            time for a second sowing &mdash; water the bottom of the drill before you sow, sow into the moisture,
            and keep it damp until the seedlings are through.
          </TipBox>

          <SectionDivider label="Extending it" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Buying the cold a little more time
            </h2>
            <p className="mb-2">
              Most of what&apos;s sown now needs nothing more than a decent start and a bit of patience. But if
              your patch runs on the cold side, a length of fleece thrown over the row on the first frosty nights,
              or a cloche kept ready by the shed door, genuinely stretches the season &mdash; often by several
              weeks either end. Our{" "}
              <Link href="/guides/protecting-vegetables-from-frost" className="text-rust underline decoration-rust/30 hover:text-earth transition-colors">
                guide to fleece, cloches and cold frames
              </Link>{" "}
              goes through what to reach for and when.
            </p>
          </section>

          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Is it too late to sow anything in high summer?</h3>
                <p className="text-[15px]">Not remotely. July and August soil is the warmest it will be all year, so seed sown now germinates in days rather than weeks. Winter salads, chard, turnips, a fast carrot, kale and spring cabbage all go in now for a harvest that carries you through the cold and into the hungry gap.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">When does the first frost usually arrive?</h3>
                <p className="text-[15px]">Most of the UK doesn&apos;t see a proper frost until around 25 October, though it varies a good few weeks either way depending on where you are &mdash; inland and northern gardens tend to see it earlier, coastal and southern ones later. Add your postcode above and we&apos;ll work out roughly when it reaches your own patch.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What is the hungry gap and does sowing now help?</h3>
                <p className="text-[15px]">The hungry gap is the lean stretch in early spring after winter crops are finished and before new-season veg is ready. Kale, spring cabbage and chard sown now are exactly what closes that gap &mdash; they stand through winter and are ready to pick just when the plot has least else to offer.</p>
              </div>
            </div>
          </section>

          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/sow" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Your full list, for your postcode</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/what-to-sow-in-summer-uk" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What to sow in summer</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/succession-sowing" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to sow in succession</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/protecting-vegetables-from-frost" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Protecting vegetables from frost</span>
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
