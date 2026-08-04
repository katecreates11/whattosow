import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateLink from "@/components/AffiliateLink";
import { SectionDivider, TipBox, GuideHero } from "@/components/GuideVisuals";
import { awinLink } from "@/lib/awin";

export const metadata: Metadata = {
  title: "Order Garlic & Onion Sets Now — Autumn Planting UK | What To Sow",
  description:
    "UK suppliers open their autumn garlic and onion set catalogues in late July and August, dispatching from September for October planting. Why autumn-planted alliums beat spring ones, hardneck vs softneck garlic, and what to order now.",
  keywords: [
    "autumn planting garlic uk",
    "when to order onion sets uk",
    "garlic sets uk",
    "autumn onion sets",
    "hardneck vs softneck garlic",
  ],
  openGraph: {
    title: "Order Garlic & Onion Sets Now — Autumn Planting UK",
    description:
      "The autumn catalogues are open. Why autumn-planted garlic and onions beat spring ones, and what to order while the good varieties are still in stock.",
    type: "article",
    url: "https://whattosow.co.uk/guides/autumn-planting-garlic-onions",
  },
  alternates: { canonical: "/guides/autumn-planting-garlic-onions" },
};

interface OrderItem {
  name: string;
  href: string;
  note: string;
  buyHref: string;
  buyLabel: string;
  merchant: string;
  position: string;
}

const orderNow: OrderItem[] = [
  {
    name: "Garlic (hardneck & softneck)",
    href: "/crops/garlic",
    note: "Cloves planted this autumn get the cold spell that splits them into a full bulb, and lift a good few weeks ahead of anything planted in spring.",
    buyHref: awinLink("https://www.suttons.co.uk/potatoes-onions-garlic/garlic-bulbs/autumn-planting-garlic"),
    buyLabel: "Autumn garlic at Suttons →",
    merchant: "suttons",
    position: "autumn-alliums-garlic",
  },
  {
    name: "Onion & shallot sets",
    href: "/crops/onion-sets",
    note: "Overwintering sets stand through the cold as a small green shoot, then race away as soon as the days lengthen — ready weeks before a spring-planted set catches up.",
    buyHref: awinLink("https://www.dobies.co.uk/potatoes-garlic-onions/onions-shallots/autumn-planting"),
    buyLabel: "Autumn sets at Dobies →",
    merchant: "dobies",
    position: "autumn-alliums-onions",
  },
];

function OrderRow({ item }: { item: OrderItem }) {
  return (
    <div className="border-t border-earth/8 py-4">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <Link href={item.href} className="font-serif text-lg text-earth hover:text-rust transition-colors">
          {item.name}
        </Link>
        <AffiliateLink
          href={item.buyHref}
          product={item.name}
          type="seed"
          merchant={item.merchant}
          position={item.position}
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors shrink-0"
        >
          {item.buyLabel}
        </AffiliateLink>
      </div>
      <p className="text-sm text-earth-light mt-1.5 leading-relaxed">{item.note}</p>
    </div>
  );
}

export default function AutumnGarlicOnionsGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Order Garlic & Onion Sets Now", item: "https://whattosow.co.uk/guides/autumn-planting-garlic-onions" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Order Garlic & Onion Sets Now — Autumn Planting UK",
    description:
      "Why autumn-planted garlic and onions beat spring ones, when the ordering window is, and what's worth getting on the list now.",
    url: "https://whattosow.co.uk/guides/autumn-planting-garlic-onions",
    publisher: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
    datePublished: "2026-07-17",
    dateModified: "2026-07-17",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When should I order garlic and onion sets for autumn planting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UK suppliers open their autumn catalogues in late July and August, dispatching cloves and sets from September so they land in time for October planting. Order in the next few weeks for the best choice — named hardneck garlic and the popular overwintering onion varieties are usually the first to sell through.",
        },
      },
      {
        "@type": "Question",
        name: "What's the difference between hardneck and softneck garlic?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hardneck garlic makes fewer, larger cloves with a stronger flavour, sends up a curly scape you can eat in early summer, and doesn't store as long. Softneck garlic makes more, smaller cloves, is milder, has no scape, and keeps for months — it's the type you see plaited into ropes. Most UK gardens can grow either; if storage matters most, plant softneck.",
        },
      },
      {
        "@type": "Question",
        name: "When do autumn garlic and onion sets arrive, and when do I plant them?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Expect delivery from September. Keep cloves and sets somewhere cool, dry and airy until the bed's ready, then plant garlic cloves and firm in onion or shallot sets from October through November.",
        },
      },
      {
        "@type": "Question",
        name: "Is it too late to order if I've missed late July?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not at all — the window runs right through August and into September for most varieties. The only real risk of waiting is a favourite variety selling out before you get to it, not missing autumn planting altogether.",
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
        <GuideHero
          eyebrow="Plan &amp; order"
          title="Order your garlic and onions now"
          subtitle="The best hardneck and softneck garlic, and the overwintering onion and shallot sets, sell through their early stock first — order this month for cloves and sets landing from September, ready to go into the ground in October."
          image="/photos/guides/alliums-pair-rows.webp"
          color="allotment"
        />

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Why autumn, not spring
            </h2>
            <p className="mb-2">
              Garlic planted now gets a proper spell of cold before it starts growing &mdash; the cold snap that
              splits a single clove into a full bulb of them. By next July it&apos;s ready to lift a good three or
              four weeks ahead of anything planted in spring, and usually bigger with it. Onion and shallot sets
              tell the same story: planted in autumn, they stand through the winter as a small green shoot and
              are away and growing the moment the days lengthen, well ahead of a set that only goes in come
              February or March.
            </p>
            <p>
              None of this needs much from you. Cloves and sets do almost all the work themselves &mdash; the one
              thing that actually matters is getting them into the ground while the ordering window is open.
            </p>
          </section>

          <SectionDivider label="The window" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Worth ordering this month
            </h2>
            <p className="mb-2">
              UK suppliers open their autumn-planting catalogues in late July and August, and dispatch from
              September &mdash; timed to land on the doorstep just as October, the best planting month, begins.
              Order early and you get first pick of variety; leave it much past August and the named hardneck
              garlic and the popular overwintering onions are usually the first to sell through.
            </p>
            <div className="mt-4">
              {orderNow.map((item) => (
                <OrderRow key={item.name} item={item} />
              ))}
            </div>
          </section>

          <TipBox title="Hardneck or softneck?">
            Hardneck garlic makes fewer, larger cloves with a proper punch of flavour, and sends up a curly scape
            in early summer that&apos;s worth cooking with in its own right &mdash; but it doesn&apos;t keep as
            long. Softneck makes more, smaller cloves, milder and no scape, and is the type that plaits into a
            rope and keeps right through winter. Grow both if there&apos;s room: hardneck for eating fresh,
            softneck for the store.
          </TipBox>

          <SectionDivider label="When they arrive" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Landing in September, going in in October
            </h2>
            <p className="mb-2">
              Cloves and sets usually arrive from September &mdash; keep them somewhere cool, dry and airy until
              the bed&apos;s ready rather than leaving the bag sealed in a warm shed. Plant garlic cloves pointy
              end up, about 2&ndash;3cm deep, from October into November; firm onion and shallot sets in the same
              window, tip just showing above the soil. Both want a sunny, well-drained spot that wasn&apos;t
              freshly manured this year &mdash; rich ground gives soft growth and bulbs that don&apos;t store
              well.
            </p>
            <p>
              For the full planting, feeding and storing detail once they&apos;re in the ground, the{" "}
              <Link href="/guides/growing-onions-garlic-leeks" className="text-rust underline decoration-rust/30 hover:text-earth transition-colors">
                growing onions, garlic &amp; leeks guide
              </Link>{" "}
              covers the rest of the season.
            </p>
          </section>

          <SectionDivider label="Good neighbours" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              What to plant alongside them
            </h2>
            <p className="mb-2">
              Alliums are generous companions &mdash; their scent confuses the pests that hunt onions and carrots
              by smell, which is why the two are so often grown in alternating rows. Beetroot, chard and lettuce
              make easy, low-competition neighbours too. The one pairing to avoid: beans and peas, whose growth
              allium roots can genuinely check, so keep this autumn&apos;s alliums in a different bed to any
              legumes.
            </p>
            <p>
              <Link href="/guides/companion-planting/companion-plants-for-onions-garlic" className="text-rust underline decoration-rust/30 hover:text-earth transition-colors">
                The full companion-planting notes for onions &amp; garlic
              </Link>{" "}
              go through the rest &mdash; what to plant close, what to keep well away, and the flowers worth
              tucking in at the edge of the bed.
            </p>
          </section>

          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">When should I order garlic and onion sets for autumn planting?</h3>
                <p className="text-[15px]">UK suppliers open their autumn catalogues in late July and August, dispatching from September so they land in time for October planting. Order in the next few weeks for the best choice &mdash; named hardneck garlic and the popular overwintering onions are usually the first to sell through.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What&apos;s the difference between hardneck and softneck garlic?</h3>
                <p className="text-[15px]">Hardneck makes fewer, larger cloves with a stronger flavour, sends up an edible scape in early summer, and doesn&apos;t store as long. Softneck makes more, smaller cloves, is milder, has no scape, and keeps for months &mdash; it&apos;s the type plaited into ropes. Either grows well in most UK gardens; plant softneck if storage matters most.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">When do autumn garlic and onion sets arrive, and when do I plant them?</h3>
                <p className="text-[15px]">Expect delivery from September. Keep cloves and sets somewhere cool, dry and airy until the bed&apos;s ready, then plant garlic cloves and firm in onion or shallot sets from October through November.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Is it too late to order if I&apos;ve missed late July?</h3>
                <p className="text-[15px]">Not at all &mdash; the window runs right through August and into September for most varieties. The only real risk of waiting is a favourite variety selling out before you get to it, not missing autumn planting altogether.</p>
              </div>
            </div>
          </section>

          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/guides/growing-onions-garlic-leeks" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Growing onions, garlic &amp; leeks</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/companion-planting/companion-plants-for-onions-garlic" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Companion plants for onions &amp; garlic</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/preparing-your-plot-for-winter" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Preparing your plot for winter</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/sow" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Your full list, for your postcode</span>
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
