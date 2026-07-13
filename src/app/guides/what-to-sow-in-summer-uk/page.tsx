import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateLink from "@/components/AffiliateLink";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";
import { awinLink } from "@/lib/awin";

const TAG = "whattosow21-21";
const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=${TAG}`;
const tm = (q: string) => awinLink(`https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`);
const trackingSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const metadata: Metadata = {
  title: "What to Sow in Summer in the UK — June, July & August | What To Sow",
  description:
    "What to sow in summer in the UK: the quick crops, successional salads and winter veg to start in June, July and August so your beds never sit empty. There's far more to sow now than you might think.",
  keywords: [
    "what to sow in summer UK",
    "what to plant in June July August",
    "summer vegetables to sow UK",
    "successional sowing summer",
    "what to grow for autumn and winter",
    "midsummer sowing allotment",
  ],
  openGraph: {
    title: "What to Sow in Summer in the UK — June, July & August",
    description:
      "Quick crops, successional salads and winter veg to sow through summer so your beds never sit empty.",
    type: "article",
    url: "https://whattosow.co.uk/guides/what-to-sow-in-summer-uk",
  },
  alternates: { canonical: "/guides/what-to-sow-in-summer-uk" },
};

interface SowItem {
  name: string;
  slug?: string;
  note: string;
  seeds?: string;
}

const quickCrops: SowItem[] = [
  { name: "Salad leaves & lettuce", slug: "lettuce", note: "Sow a short row every couple of weeks for a steady supply. In high summer, sow in the cool of evening and give a little shade — they sulk in fierce heat.", seeds: tm("Lettuce") },
  { name: "Rocket & oriental leaves", slug: "rocket", note: "Fast, peppery and best from a summer sowing for autumn picking. Watch for flea beetle in the heat — fleece keeps them off.", seeds: tm("Rocket") },
  { name: "Radishes", slug: "radishes", note: "Roots in about four weeks, perfect for filling any gap. Keep them watered or they turn woody and hot.", seeds: tm("Radish") },
  { name: "Beetroot", slug: "beetroot", note: "Still time for a sowing that crops in autumn — sow now and you'll be pulling tender roots well into the cold.", seeds: tm("Beetroot") },
  { name: "Spring onions", slug: "spring-onions", note: "Quick, undemanding and happy to be tucked into any spare corner through summer.", seeds: tm("Spring%20Onion") },
  { name: "Carrots (early types)", slug: "carrots", note: "A June or early-July sowing of a fast variety gives sweet autumn carrots — and often dodges the worst of carrot fly.", seeds: tm("Carrot") },
];

const lastChanceCrops: SowItem[] = [
  { name: "French beans", slug: "french-beans", note: "There's still time in early summer for a quick crop before the first frosts — dwarf types are fastest. Direct sow into warm soil.", seeds: tm("French%20Bean") },
  { name: "Dwarf runner beans", slug: "runner-beans", note: "An early-summer sowing catches up fast in the warmth and crops into autumn. Keep them well watered to set pods.", seeds: tm("Runner%20Bean") },
  { name: "Courgettes", slug: "courgettes", note: "A surprising one — a fresh plant sown in early summer crops cleanly into autumn, often with less mildew than the spring plants.", seeds: tm("Courgette") },
  { name: "Peas (for autumn)", slug: "peas", note: "Sow a quick variety in early summer for a tender autumn picking, when the spring peas are long finished.", seeds: tm("Pea") },
];

const winterCrops: SowItem[] = [
  { name: "Kale", slug: "kale", note: "Sow now for plants that stand right through winter — the hardiest, most generous leaf on the whole veg patch.", seeds: tm("Kale") },
  { name: "Purple sprouting broccoli", slug: "broccoli", note: "Sow in early summer for spears next spring, in the hungry gap when there's little else to pick. Worth the long wait.", seeds: tm("Sprouting%20Broccoli") },
  { name: "Spring cabbage", slug: "cabbage", note: "A mid- to late-summer sowing gives small, sweet cabbages and spring greens to cut early next year.", seeds: tm("Spring%20Cabbage") },
  { name: "Swiss chard", slug: "swiss-chard", note: "Tough, beautiful and forgiving — sow now for autumn leaves that often stand right through a mild winter.", seeds: tm("Swiss%20Chard") },
  { name: "Turnips", slug: "turnips", note: "A quick autumn root from a summer sowing; the young leaves are good eating too.", seeds: tm("Turnip") },
  { name: "Spinach (autumn types)", slug: "spinach", note: "Sow from late summer for autumn picking and a crop that overwinters into spring.", seeds: tm("Spinach") },
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
            position={`summer-sowing-seeds-${trackingSlug(item.slug ?? item.name)}`}
            data-umami-event="affiliate-click" data-umami-event-type="seed" data-umami-event-merchant="thompson-morgan"
            data-umami-event-topic="summer-sowing"
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

export default function SummerSowingGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "What to Sow in Summer", item: "https://whattosow.co.uk/guides/what-to-sow-in-summer-uk" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What to Sow in Summer in the UK — June, July & August",
    description:
      "The quick crops, successional salads and winter veg to sow in June, July and August so your beds never sit empty.",
    url: "https://whattosow.co.uk/guides/what-to-sow-in-summer-uk",
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
        name: "What can I sow in summer in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Plenty. Quick crops like salad leaves, rocket, radishes, beetroot and spring onions for late-summer and autumn eating; last-chance warm-season crops like French beans and courgettes in early summer; and the winter staples — kale, purple sprouting broccoli, spring cabbage and chard — that need sowing now to crop through the colder months.",
        },
      },
      {
        "@type": "Question",
        name: "What can I still sow in July?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Far from it. July is prime time for successional salads and quick roots, and the ideal month to sow kale, purple sprouting broccoli and spring cabbage for winter and spring. The main thing to watch is water — summer-sown seeds dry out fast, so sow into moist soil and keep it damp until they're up.",
        },
      },
      {
        "@type": "Question",
        name: "How do I stop summer-sown seeds drying out?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Water the bottom of the drill before you sow, sow into the moisture, then cover and water gently again. Sow in the cool of the evening, shade tender seedlings from fierce midday sun, and mulch around them once they're established. A length of fleece laid over the row also keeps moisture in until germination.",
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
            What to sow in summer in the UK
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            There&apos;s a quiet myth that summer is for sitting back &mdash; that the sowing&apos;s all done by June and
            now you just water and wait. It isn&apos;t. The garden that keeps giving into autumn and right through winter is
            the one that&apos;s still being sown all through July and August, a short row at a time, into every gap as it
            opens up.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            Summer arrives at different times across the country, so let your own weather lead &mdash;{" "}
            <Link href="/" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">
              enter your postcode
            </Link>{" "}
            for sowing dates tuned to where you are.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Quick crops */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Quick crops &mdash; sow now, eat in weeks
            </h2>
            <p className="mb-2">
              The fast, generous crops that fill any gap and keep the kitchen going. Sow little and often through the
              summer and you&apos;ll never have a bare bed or an empty salad bowl.
            </p>
            <div className="mt-4">
              {quickCrops.map((c) => (
                <SowRow key={c.name} item={c} />
              ))}
            </div>
          </section>

          <TipBox title="Sow little and often">
            The secret to summer is the short row. A pinch of salad and a few feet of radish every fortnight beats one
            big sowing that all comes at once and bolts before you can eat it. Keep a corner of the seed box for these
            quick croppers and sow a little whenever you&apos;re out among your beds &mdash; it&apos;s the difference
            between a glut-and-famine patch and one that gives steadily all season.
          </TipBox>

          {/* Last chance warm crops */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Last chance &mdash; warm-season crops for early summer
            </h2>
            <p className="mb-2">
              If it&apos;s still early summer, there&apos;s time for one more sowing of the tender, sun-loving crops &mdash;
              and a fresh plant started now often crops more cleanly into autumn than the tired spring ones. Get these in
              while the soil is warm.
            </p>
            <div className="mt-4">
              {lastChanceCrops.map((c) => (
                <SowRow key={c.name} item={c} />
              ))}
            </div>
          </section>

          {/* Winter crops */}
          <SectionDivider label="Think ahead" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Sow now for autumn &amp; winter
            </h2>
            <p className="mb-2">
              This is the clever bit, and the easiest one to let slip by. The veg that carries us through the cold &mdash;
              kale, sprouting broccoli, spring cabbage, chard &mdash; all needs sowing in summer to be big enough to stand
              the winter. Sow it now and you&apos;ll be picking fresh greens long after the summer crops are a memory.
            </p>
            <div className="mt-4">
              {winterCrops.map((c) => (
                <SowRow key={c.name} item={c} />
              ))}
            </div>
          </section>

          <WarningBox title="Water is everything now">
            Summer&apos;s one real enemy for the seed-sower is dry soil. Seeds need constant moisture to germinate, and a
            warm bed dries out in hours. Water the bottom of the drill before you sow, sow into the damp, and keep the
            surface moist until the seedlings are through &mdash; a sheet of{" "}
            <AffiliateLink
              href={az("horticultural fleece plant protection")}
              product="horticultural fleece"
              type="gear"
              merchant="amazon"
              position="summer-sowing-fleece"
              className="text-rust underline decoration-rust/30 hover:text-earth"
            >
              fleece
            </AffiliateLink>{" "}
            laid over the row holds the moisture in beautifully. See our{" "}
            <Link href="/guides/watering" className="text-rust underline decoration-rust/30 hover:text-earth">watering guide</Link>{" "}
            for getting it right in the heat.
          </WarningBox>

          {/* Method */}
          <SectionDivider label="The knack" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Sowing well in the heat
            </h2>
            <ul className="space-y-2 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Sow in the cool</strong> &mdash; early morning or evening, not the baking
                middle of the day, so seeds and seedlings aren&apos;t shocked by the heat.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Give a little shade</strong> &mdash; tender lettuce and leaves germinate
                poorly in fierce heat. Start them in modules in a cooler spot, or shade the row with mesh.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Fill every gap</strong> &mdash; the moment a crop comes out, something
                quick should go straight back in. Bare summer soil is a wasted month.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Keep records</strong> &mdash; jot down what you sowed and when. It&apos;s
                the only way to learn your garden&apos;s real timings, and{" "}
                <Link href="/my-plot" className="text-rust underline decoration-rust/30 hover:text-earth">my plot</Link> makes it easy.
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What can I sow in summer in the UK?</h3>
                <p className="text-[15px]">Plenty &mdash; quick crops like salad leaves, rocket, radishes, beetroot and spring onions for late-summer and autumn eating; last-chance warm crops like French beans and courgettes in early summer; and the winter staples (kale, purple sprouting broccoli, spring cabbage, chard) that must be sown now to crop through the cold.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What can I still sow in July?</h3>
                <p className="text-[15px]">Far from it. July is prime time for successional salads and quick roots, and the ideal month to sow kale, sprouting broccoli and spring cabbage for winter and spring. Just watch the water &mdash; summer-sown seeds dry out fast, so sow into moist soil and keep it damp until they&apos;re up.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do I stop summer-sown seeds drying out?</h3>
                <p className="text-[15px]">Water the bottom of the drill before you sow, sow into the moisture, cover and water gently again. Sow in the cool of evening, shade tender seedlings from midday sun, and lay a sheet of fleece over the row to hold moisture in until germination.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/guides/succession-sowing" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to sow in succession</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/autumn-winter-vegetables" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What to sow in autumn &amp; winter</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/still-time" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What can you still sow?</span>
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
