import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";
import { awinLink } from "@/lib/awin";

const TAG = "whattosow21-21";
const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=${TAG}`;
const tm = (q: string) => awinLink(`https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`);

export const metadata: Metadata = {
  title: "Growing Winter Salad Leaves in the UK — Sow Now for Winter Picking | What To Sow",
  description:
    "How to grow winter salad leaves in the UK: the hardy cut-and-come-again leaves to sow in late summer and autumn for fresh salad right through the cold — winter lettuce, lamb's lettuce, mizuna, mustard and more.",
  keywords: [
    "winter salad leaves",
    "winter lettuce UK",
    "growing salad in winter",
    "hardy salad leaves",
    "cut and come again winter",
    "winter salad to sow",
  ],
  openGraph: {
    title: "Growing Winter Salad Leaves in the UK",
    description:
      "The hardy cut-and-come-again leaves to sow in late summer and autumn for fresh salad right through the cold.",
    type: "article",
    url: "https://whattosow.co.uk/guides/growing-winter-salad-leaves",
  },
  alternates: { canonical: "/guides/growing-winter-salad-leaves" },
};

interface SowItem {
  name: string;
  slug?: string;
  note: string;
  seeds?: string;
}

const leaves: SowItem[] = [
  { name: "Lamb's lettuce (corn salad)", slug: "lettuce", note: "The toughest winter leaf of all — mild, nutty rosettes that shrug off hard frost. The backbone of any winter salad.", seeds: tm("Lambs%20Lettuce") },
  { name: "Winter lettuce", slug: "lettuce", note: "Hardy varieties like Winter Density and Arctic King stand the cold far better than summer types. Pick leaf by leaf.", seeds: tm("Winter%20Lettuce") },
  { name: "Mizuna & mibuna", slug: "pak-choi", note: "Fast, feathery and mild, with a faint mustard tang. Cut-and-come-again all winter under a cloche.", seeds: tm("Mizuna") },
  { name: "Mustard leaves (Red Frills, Green in the Snow)", slug: "rocket", note: "Peppery and beautiful, and the cold only sharpens the flavour. 'Green in the Snow' is as hardy as its name.", seeds: tm("Mustard%20Leaves") },
  { name: "Winter rocket", slug: "rocket", note: "Slower and milder than summer rocket, and far less likely to bolt. A reliable cold-weather cropper.", seeds: tm("Wild%20Rocket") },
  { name: "Claytonia (winter purslane)", slug: "lettuce", note: "Heart-shaped, succulent leaves that are utterly unbothered by frost — one of the most generous winter croppers there is.", seeds: tm("Claytonia") },
  { name: "Land cress", slug: "rocket", note: "Tastes just like watercress, but hardy and easy in ordinary soil. A peppery lift for winter plates.", seeds: tm("Land%20Cress") },
  { name: "Spinach (hardy types)", slug: "spinach", note: "Sow in early autumn for tender leaves that crop into winter and romp away again in spring.", seeds: tm("Spinach%20Winter") },
];

function SowRow({ item }: { item: SowItem }) {
  return (
    <div className="border-t border-earth/8 py-4">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        {item.slug ? (
          <a href={`/crops/${item.slug}`} className="font-serif text-lg text-earth hover:text-rust transition-colors">
            {item.name}
          </a>
        ) : (
          <span className="font-serif text-lg text-earth">{item.name}</span>
        )}
        {item.seeds && (
          <a
            href={item.seeds}
            target="_blank"
            rel="sponsored noopener noreferrer"
            data-umami-event="companion-seed-click"
            data-umami-event-topic="winter-salad"
            className="font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors shrink-0"
          >
            Find seeds &rarr;
          </a>
        )}
      </div>
      <p className="text-sm text-earth-light mt-1.5 leading-relaxed">{item.note}</p>
    </div>
  );
}

export default function WinterSaladGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Growing Winter Salad Leaves", item: "https://whattosow.co.uk/guides/growing-winter-salad-leaves" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Growing Winter Salad Leaves in the UK",
    description:
      "The hardy cut-and-come-again leaves to sow in late summer and autumn for fresh salad right through the cold.",
    url: "https://whattosow.co.uk/guides/growing-winter-salad-leaves",
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
        name: "What salad leaves can you grow in winter in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The hardy cut-and-come-again leaves: lamb's lettuce (corn salad), winter lettuce, mizuna and mibuna, mustard leaves, winter rocket, claytonia (winter purslane), land cress and hardy spinach. Grown under a cloche, cold frame or in a greenhouse, they'll give fresh salad right through the cold.",
        },
      },
      {
        "@type": "Question",
        name: "When should I sow winter salad leaves?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sow from late summer into early autumn — roughly August to early October. The plants need to do most of their growing while there's still warmth and light, then sit and be picked through winter. Once the days shorten in midwinter, growth all but stops, so what you've grown by then is what you'll harvest from.",
        },
      },
      {
        "@type": "Question",
        name: "Do winter salad leaves need protection?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most are genuinely hardy and survive the cold outdoors, but a cloche, cold frame or unheated greenhouse makes a huge difference — it keeps the leaves clean, dry and pickable, and stops winter rain and slugs from spoiling them. They don't need heat, just shelter from the worst of the wet and wind.",
        },
      },
      {
        "@type": "Question",
        name: "How do you pick winter salad so it keeps growing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pick cut-and-come-again style: take a few outer leaves from each plant rather than cutting the whole thing, leaving the central growing point to push out more. In winter the plants regrow slowly, so harvest lightly and across the whole row, and they'll keep giving for months.",
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
            Growing winter salad leaves
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            There are few quieter pleasures than picking a bowl of your own salad in December &mdash; fresh, peppery
            leaves gathered with cold fingers while the rest of the garden sleeps. And it&apos;s far easier than it
            sounds. The trick is to sow the hardy leaves in late summer, let them bulk up before the light goes, and
            tuck them under a little shelter to pick all winter long.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            Sow timing shifts with where you are, so let your own weather lead &mdash;{" "}
            <a href="/" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">
              enter your postcode
            </a>{" "}
            for dates tuned to your first frost.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* The leaves */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              The leaves that laugh at frost
            </h2>
            <p className="mb-2">
              Summer salad sulks and bolts in the cold; these are the tough ones, bred or born for it. Most are mild,
              some are peppery, and several actually taste better for a touch of frost. Grow a mix and you&apos;ll have a
              proper salad &mdash; soft leaves, sharp leaves, and something with crunch &mdash; all winter.
            </p>
            <div className="mt-4">
              {leaves.map((c) => (
                <SowRow key={c.name} item={c} />
              ))}
            </div>
          </section>

          <TipBox title="Sow a little, sow it now">
            Winter salad is a late-summer job, not a winter one. The plants need warmth and light to bulk up before the
            short days arrive &mdash; sow from August into early autumn and they&apos;ll be big enough to pick from as
            the cold sets in. Sow a short row every couple of weeks while you can, and tuck pinches into any gap a summer
            crop leaves behind. See{" "}
            <a href="/guides/succession-sowing" className="text-rust underline decoration-rust/30 hover:text-earth">succession sowing</a>{" "}
            for the rhythm.
          </TipBox>

          {/* Protection */}
          <SectionDivider label="Keep them pickable" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              A little shelter changes everything
            </h2>
            <p className="mb-3">
              Most of these leaves are hardy enough to survive a hard frost in the open &mdash; but surviving and being
              nice to eat are two different things. Winter rain, wind and slugs tatter unprotected leaves fast. A bit of
              cover keeps them clean, dry and worth picking, and it needn&apos;t be heated &mdash; just sheltered.
            </p>
            <ul className="space-y-3 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">A cloche</span> &mdash; the simplest fix. A little tunnel or row
                cover keeps the rain off and a few degrees of warmth in.{" "}
                <a href={az("garden cloche tunnel plant cover")} target="_blank" rel="sponsored noopener noreferrer" data-umami-event="gear-affiliate-click" data-umami-event-product="cloche" className="text-rust underline decoration-rust/30 hover:text-earth">On Amazon &rarr;</a>
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">A cold frame</span> &mdash; the snug spot for the best winter
                pickings, and brilliant for hardening off in spring too. See our{" "}
                <a href="/blog/best-cold-frames-greenhouses-uk" className="text-rust underline decoration-rust/30 hover:text-earth">cold frames &amp; greenhouses guide</a>.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">An unheated greenhouse or polytunnel</span> &mdash; if you have
                one, winter salad is the perfect thing to fill it with once the tomatoes are done.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">A windowsill</span> &mdash; even a few pots of cut-and-come-again
                leaves indoors keep a salad going when the garden is frozen solid.
              </li>
            </ul>
          </section>

          <WarningBox title="The enemy is wet, not cold">
            These leaves take the cold in their stride &mdash; what spoils them is sitting in cold, wet, airless
            conditions, which brings on rot and mildew. Water sparingly in winter and only in the morning so leaves dry
            before nightfall, give them air on milder days, and keep on top of slugs, which shelter and feed under cover
            through the cold.
          </WarningBox>

          {/* Picking */}
          <SectionDivider label="The harvest" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Picking through the cold
            </h2>
            <p className="mb-3">
              Harvest cut-and-come-again: take a few outer leaves from each plant rather than cutting the whole thing,
              and leave the central growing point to push out more. In the depths of winter the plants barely grow, so
              pick lightly and spread your cutting across the whole row &mdash; treat it as a slow, steady larder rather
              than a single big crop, and it&apos;ll keep you in salad for months. Come the first warmth of spring,
              everything surges back into growth for one last generous flush before it runs to seed.
            </p>
          </section>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What salad leaves can you grow in winter in the UK?</h3>
                <p className="text-[15px]">The hardy cut-and-come-again leaves: lamb&apos;s lettuce, winter lettuce, mizuna and mibuna, mustard leaves, winter rocket, claytonia, land cress and hardy spinach. Under a cloche, cold frame or greenhouse they give fresh salad right through the cold.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">When should I sow winter salad leaves?</h3>
                <p className="text-[15px]">From late summer into early autumn — roughly August to early October. The plants need to do most of their growing while there&apos;s warmth and light, then sit and be picked through winter. Once midwinter&apos;s short days arrive, growth all but stops.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Do winter salad leaves need protection?</h3>
                <p className="text-[15px]">Most are genuinely hardy, but a cloche, cold frame or unheated greenhouse makes a big difference — keeping leaves clean, dry and pickable and stopping rain and slugs spoiling them. They need shelter, not heat.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do you pick winter salad so it keeps growing?</h3>
                <p className="text-[15px]">Take a few outer leaves from each plant rather than cutting the whole thing, leaving the central growing point to push out more. Plants regrow slowly in winter, so harvest lightly and across the whole row and they&apos;ll keep giving for months.</p>
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
              <a href="/guides/protecting-vegetables-from-frost" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Protecting crops from frost</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/succession-sowing" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Succession sowing</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Sowing dates for your postcode</span>
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
