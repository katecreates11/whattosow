import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionDivider, TipBox } from "@/components/GuideVisuals";
import AffiliateLink from "@/components/AffiliateLink";

const tm = (q: string) => `https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`;
const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}`;

export const metadata: Metadata = {
  title: "Growing Root Vegetables — Carrots, Beetroot, Parsnips & More (UK) | What To Sow",
  description:
    "How to grow root vegetables in the UK: carrots, beetroot, parsnips, radishes and turnips. Getting the soil right, sowing direct, thinning, beating carrot fly, and harvesting and storing roots that keep for months.",
  keywords: [
    "growing root vegetables UK",
    "how to grow carrots beetroot parsnips",
    "root vegetables to grow",
    "carrot fly prevention",
    "sowing root crops",
    "storing root vegetables",
  ],
  openGraph: {
    title: "Growing Root Vegetables — Carrots, Beetroot, Parsnips & More",
    description:
      "Getting the soil right, sowing direct, thinning, beating carrot fly, and storing roots that keep for months.",
    type: "article",
    url: "https://whattosow.co.uk/guides/growing-root-vegetables",
  },
  alternates: { canonical: "/guides/growing-root-vegetables" },
};

interface CropItem {
  name: string;
  slug?: string;
  note: string;
  seeds?: string;
}

const roots: CropItem[] = [
  { name: "Carrots", slug: "carrots", note: "The one everyone wants to crack. Stone-free, un-manured soil and a defence against carrot fly are the whole secret. Sow direct, thin in the evening.", seeds: tm("Carrot") },
  { name: "Beetroot", slug: "beetroot", note: "The forgiving root — quick, colourful and happy in most soils. Each 'seed' is a cluster, so thin to one seedling for good globes.", seeds: tm("Beetroot") },
  { name: "Parsnips", slug: "parsnips", note: "Slow to germinate and worth the wait — use fresh seed, sow in spring, and leave them in the ground until after a frost, which turns them sweet.", seeds: tm("Parsnip") },
  { name: "Radishes", slug: "radishes", note: "The fastest crop there is — roots in about four weeks. Perfect for filling gaps and for marking slow rows like parsnips.", seeds: tm("Radish") },
  { name: "Turnips", slug: "turnips", note: "Quick and easy from spring to late summer; the young leaves are good eating too. Best grown fast in cool, moist soil.", seeds: tm("Turnip") },
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
            position="root-vegetables-seeds"
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

export default function GrowingRootsGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Growing Root Vegetables", item: "https://whattosow.co.uk/guides/growing-root-vegetables" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Growing Root Vegetables — Carrots, Beetroot, Parsnips & More",
    description:
      "How to grow root vegetables in the UK: soil, sowing direct, thinning, beating carrot fly, and storing roots that keep.",
    url: "https://whattosow.co.uk/guides/growing-root-vegetables",
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
        name: "Why are my carrots and parsnips forked and stunted?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Almost always one of two things: stones in the soil (the root forks around them) or freshly manured ground (rich soil makes roots fork and 'fang'). Grow root crops in stone-free soil that was manured for a previous crop, not this one, and fork in nothing fresh. On stony or heavy ground, a deep raised bed of sieved soil gives long, straight roots.",
      },
      },
      {
        "@type": "Question",
        name: "How do I stop carrot fly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Carrot fly hunts by smell and flies low, so the best defence is a 60cm barrier of fine insect mesh or fleece around the bed. Help it along by sowing thinly to avoid thinning (the bruised foliage is what attracts the fly), thinning in the evening if you must, and growing onions nearby to mask the scent.",
        },
      },
      {
        "@type": "Question",
        name: "Should I sow root vegetables direct or in modules?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Direct, as a rule. Root crops resent having their roots disturbed, so they're best sown where they are to grow rather than transplanted. Beetroot is the exception — it transplants happily from modules sown a few to a cell. Carrots and parsnips should always go straight into the ground.",
        },
      },
      {
        "@type": "Question",
        name: "How do you store root vegetables over winter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many hardy roots are best left in the ground and dug as needed — parsnips and some carrots actually sweeten after frost. Where the ground freezes hard or floods, lift them and store in boxes of damp sand somewhere cool and frost-free. Beetroot stores this way well; twist off (don't cut) the tops first.",
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
            Growing root vegetables
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            There&apos;s a particular magic to lifting a root &mdash; the moment a carrot or a beetroot comes clear of
            the soil is one of the quiet joys of growing your own. And roots are wonderfully low-fuss: most are sown
            straight into the ground, left to get on with it, and pulled fresh or stored to see you through winter. Get
            the soil right and the rest very nearly looks after itself.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            This is the family overview &mdash; for sowing dates and varieties of each, follow the links through to its
            own page, or check{" "}
            <Link href="/" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">
              dates tuned to your postcode
            </Link>.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* The roots */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              The roots worth growing
            </h2>
            <p className="mb-2">
              From the fastest crop on the plot to the slow, sweet rewards of autumn, the roots between them keep you
              digging something fresh for most of the year.
            </p>
            <div className="mt-4">
              {roots.map((c) => (
                <CropRow key={c.name} item={c} />
              ))}
            </div>
          </section>

          {/* Soil */}
          <SectionDivider label="The one thing that matters" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Get the soil right and you&apos;re most of the way there
            </h2>
            <p className="mb-3">
              Nearly every root-vegetable disappointment &mdash; the forked carrot, the parsnip with three legs, the
              stumpy beet &mdash; comes back to the soil. Roots want it <strong className="text-earth">light,
              stone-free and not freshly manured</strong>. A stone in the path of a growing root makes it fork around it;
              fresh muck makes it split and &ldquo;fang&rdquo; into a tangle of side roots. So grow your roots on ground
              that was manured for a previous crop, and rake out the stones from the top few inches before you sow.
            </p>
            <p className="mb-3">
              If your ground is heavy clay or full of stones, don&apos;t fight it &mdash; a deep{" "}
              <Link href="/blog/best-raised-beds-uk" className="text-rust underline decoration-rust/30 hover:text-earth">raised bed</Link>{" "}
              filled with sieved soil or compost gives long, straight roots where the open ground never would. Short,
              stump-rooted carrot varieties are the other good answer for difficult soil.
            </p>
          </section>

          {/* Sowing */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Sow direct, sow thinly
            </h2>
            <p className="mb-3">
              Roots hate having their roots disturbed, so most are sown straight where they&apos;re to grow rather than
              raised in modules and moved (beetroot is the easy-going exception). The real knack is sowing
              <strong className="text-earth"> thinly</strong> &mdash; a few seeds per inch, no more. Sow too thickly and
              you&apos;re forced to thin out the crowd later, and with carrots that thinning is exactly what calls in the
              carrot fly.
            </p>
            <p className="mb-3">
              Water the bottom of the drill before you sow in dry weather, sow into the damp, and be patient with the
              slow ones &mdash; parsnips can take three weeks to show, so sow a few quick radishes along the same row to
              mark it while you wait. Sow little and often for a steady supply; see{" "}
              <Link href="/guides/succession-sowing" className="text-rust underline decoration-rust/30 hover:text-earth">succession sowing</Link>.
            </p>
          </section>

          <TipBox title="Thin in the cool of the evening">
            If you do need to thin carrots, do it at dusk, nip the seedlings out cleanly rather than tugging, firm the
            soil back, and water. It&apos;s the scent of bruised carrot foliage on a warm afternoon that draws carrot fly
            from far and wide &mdash; thinning quietly in the cool evening, and clearing the thinnings away, keeps your
            row off their radar.
          </TipBox>

          {/* Pests */}
          <SectionDivider label="The pests" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Carrot fly &mdash; the one to plan for
            </h2>
            <p className="mb-3">
              Carrot fly is the root grower&apos;s main adversary: the larvae tunnel through carrots, parsnips and
              celery, leaving rusty trails. The fly flies low and finds its target by scent, which gives us the two best
              defences:
            </p>
            <ul className="space-y-3 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">A mesh barrier</span> &mdash; because the fly flies low, a 60cm
                wall of fine insect mesh or fleece around the bed keeps the great majority out. The single most reliable
                method.{" "}
                <AffiliateLink href={az("fine insect mesh netting carrot fly")} product="fine insect mesh" type="gear" merchant="amazon" position="root-vegetables-carrot-fly-mesh" className="text-rust underline decoration-rust/30 hover:text-earth">Compare fine insect mesh &rarr;</AffiliateLink>
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Mask the scent</span> &mdash; grow onions or other alliums
                alongside (see{" "}
                <Link href="/guides/companion-planting/companion-plants-for-carrots" className="text-rust underline decoration-rust/30 hover:text-earth">companion plants for carrots</Link>), and avoid bruising the foliage by sowing thinly.
              </li>
            </ul>
          </section>

          {/* Harvest */}
          <SectionDivider label="Harvest & store" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Lifting and keeping
            </h2>
            <p className="mb-3">
              Half the joy of roots is that the ground stores them for you. Most hardy roots are happiest left where they
              grow and dug as you need them &mdash; parsnips and many carrots are actually sweeter after a frost, which
              turns their starch to sugar. Only where the ground freezes solid or floods do you need to lift and store:
              pack the roots in boxes of damp sand somewhere cool and frost-free, and they&apos;ll keep for months.
            </p>
            <p className="mb-3">
              With beetroot, twist off the leaves rather than cutting them, to stop the roots &ldquo;bleeding&rdquo; their
              colour, and store the same way. A few minutes now and you&apos;ve a larder of your own roots right through
              the cold.
            </p>
          </section>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Why are my carrots and parsnips forked and stunted?</h3>
                <p className="text-[15px]">Almost always stones in the soil (the root forks around them) or freshly manured ground (which makes roots split and fang). Grow roots in stone-free soil that was manured for a previous crop, not this one. On stony or heavy ground, a deep raised bed of sieved soil gives long, straight roots.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do I stop carrot fly?</h3>
                <p className="text-[15px]">It flies low and hunts by smell, so a 60cm barrier of fine insect mesh or fleece around the bed is the best defence. Help it by sowing thinly to avoid thinning, thinning in the evening if you must, and growing onions nearby to mask the scent.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Should I sow root vegetables direct or in modules?</h3>
                <p className="text-[15px]">Direct, as a rule — roots resent disturbance, so sow them where they&apos;re to grow. Beetroot is the exception and transplants happily from modules; carrots and parsnips should always go straight into the ground.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do you store root vegetables over winter?</h3>
                <p className="text-[15px]">Many hardy roots are best left in the ground and dug as needed — parsnips and some carrots sweeten after frost. Where the ground freezes hard or floods, lift them and store in boxes of damp sand somewhere cool and frost-free. Twist (don&apos;t cut) the tops off beetroot first.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/guides/companion-planting/companion-plants-for-carrots" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Companion plants for carrots</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/succession-sowing" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Succession sowing</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/crops/carrots" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to grow carrots</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/crops/beetroot" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to grow beetroot</span>
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
