import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";
import AffiliateLink from "@/components/AffiliateLink";

const tm = (q: string) => `https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`;
const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}`;

function trackingSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const metadata: Metadata = {
  title: "Growing Squash, Pumpkins & Courgettes — The Cucurbit Family (UK) | What To Sow",
  description:
    "How to grow squash, pumpkins and courgettes in the UK: sowing, feeding these hungry sprawlers, hand-pollinating for more fruit, beating powdery mildew, and curing winter squash so it stores for months.",
  keywords: [
    "growing squash pumpkins courgettes",
    "how to grow courgettes",
    "growing pumpkins UK",
    "winter squash storage",
    "courgette pollination",
    "powdery mildew courgettes",
  ],
  openGraph: {
    title: "Growing Squash, Pumpkins & Courgettes — The Cucurbit Family",
    description:
      "Sowing, feeding the hungry sprawlers, hand-pollinating for more fruit, beating mildew, and curing squash to store.",
    type: "article",
    url: "https://whattosow.co.uk/guides/growing-squash-pumpkins-courgettes",
  },
  alternates: { canonical: "/guides/growing-squash-pumpkins-courgettes" },
};

interface CropItem {
  name: string;
  slug?: string;
  note: string;
  seeds?: string;
}

const members: CropItem[] = [
  { name: "Courgettes", slug: "courgettes", note: "The generous one — two or three plants will feed a street. Pick small and often through summer; the more you cut, the more they crop.", seeds: tm("Courgette") },
  { name: "Summer squash", slug: "squash", note: "Patty pans, crooknecks and the like — grown and eaten young like courgettes, but in lovely shapes and colours.", seeds: tm("Squash") },
  { name: "Winter squash", slug: "squash", note: "Butternut, crown prince, kabocha — left to ripen fully, then cured to store for months of soups and roasts.", seeds: tm("Winter%20Squash") },
  { name: "Pumpkins", slug: "pumpkins", note: "From little eating types to the great orange show-offs. Hungry, thirsty and need a long, warm season to swell.", seeds: tm("Pumpkin") },
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
            position={`squash-family-seeds-${trackingSlug(item.name)}`}
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

function SquashBuyerNote() {
  return (
    <aside className="my-8 border-y border-earth/10 py-5" aria-labelledby="squash-buyer-note">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-rust mb-2">
        Buyer note
      </p>
      <h3 id="squash-buyer-note" className="font-serif text-xl text-earth mb-3">
        Worth buying for squash and courgettes
      </h3>
      <div className="space-y-4 text-[15px] leading-relaxed">
        <p className="text-earth">
          <span className="font-serif">Worth buying:</span> a high-potash feed once flowering starts, and ground-cover
          membrane or a thick mulch if your fruit will sit on bare soil. Feed keeps the plants cropping; a dry, clean
          surface keeps pumpkins and winter squash from sulking in damp.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <AffiliateLink href={az("high potash tomato feed vegetables")} product="high-potash feed" type="gear" merchant="amazon-uk" position="squash-family-feed" className="font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">
            Compare high-potash feed &rarr;
          </AffiliateLink>
          <AffiliateLink href={az("ground cover membrane weed fabric")} product="ground cover membrane" type="gear" merchant="amazon-uk" position="squash-family-membrane" className="font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">
            Compare ground cover membrane
          </AffiliateLink>
        </div>
        <p className="text-earth-light">
          <span className="font-serif text-earth">Skip decorative supports.</span> Courgettes and squash want space,
          water and food far more than fancy frames.
        </p>
      </div>
    </aside>
  );
}

export default function GrowingSquashGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Growing Squash, Pumpkins & Courgettes", item: "https://whattosow.co.uk/guides/growing-squash-pumpkins-courgettes" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Growing Squash, Pumpkins & Courgettes — The Cucurbit Family",
    description:
      "How to grow the squash family in the UK: sowing, feeding, hand-pollinating, beating mildew, and curing to store.",
    url: "https://whattosow.co.uk/guides/growing-squash-pumpkins-courgettes",
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
        name: "Why are my courgettes rotting when small?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Usually poor pollination. A female flower that isn't properly pollinated sets a tiny fruit that yellows and rots at the tip rather than swelling. Bring in more pollinators with flowers like borage and nasturtiums nearby, and in cool or quiet weather hand-pollinate: dab pollen from a male flower into the female flowers (the ones with a tiny fruit behind them).",
        },
      },
      {
        "@type": "Question",
        name: "How do I get more pumpkins and squash to set?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Feed the bees and, if needed, do their job for them. Plant pollinator flowers nearby, and hand-pollinate in the cool of the morning when the flowers are open: pick a male flower (on a thin stalk), strip its petals, and brush its pollen onto the centre of each female flower (the one with a baby fruit behind it). For big pumpkins, limit each plant to one or two fruits so all its energy goes into them.",
        },
      },
      {
        "@type": "Question",
        name: "What is the white powder on my courgette leaves?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Powdery mildew — a near-inevitable late-summer fungus that coats the leaves white. It rarely kills an established plant. Slow it by watering the soil (not the leaves), giving plants space for air to move, and removing the worst leaves. A fresh plant sown in early summer often crops cleanly after the spring ones succumb.",
        },
      },
      {
        "@type": "Question",
        name: "How do you store winter squash and pumpkins?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leave them on the plant until fully coloured and the stem starts to cork, ideally before the first frost. Then cure them: a couple of weeks somewhere warm and dry (a sunny windowsill or greenhouse bench) to harden the skins. Cured and kept somewhere cool, dry and airy, good winter squash will keep for many months.",
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
            Growing squash, pumpkins &amp; courgettes
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            The squash family are the great sprawlers of summer &mdash; big-leaved, bold and astonishingly generous once
            they get going. A single courgette plant can feed you for weeks; a winter squash vine can fill a corner and
            hand you a larder of soups for the cold months. They ask for just three things in return: warmth, room, and
            more food and water than you&apos;d think.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            This is the family overview &mdash; for sowing dates and varieties of each, follow the links through to its
            own page.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* The family */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              One family, summer to winter
            </h2>
            <p className="mb-2">
              From courgettes you pick small and often to pumpkins you leave to swell all season, the cucurbits give you
              something from midsummer right through to the depths of winter from the store.
            </p>
            <div className="mt-4">
              {members.map((c) => (
                <CropRow key={c.name} item={c} />
              ))}
            </div>
          </section>

          {/* Sowing & growing */}
          <SectionDivider label="The method" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Warmth, room and plenty of muck
            </h2>
            <p className="mb-3">
              Squash are tender, so there&apos;s no rushing them: sow indoors in mid- to late spring, two seeds on their
              edge in a pot, and don&apos;t plant out until all danger of frost has passed and the soil is warm. They
              grow fast once they&apos;re away, so a fresh start in early summer still has time to crop.
            </p>
            <p className="mb-3">
              These are <strong className="text-earth">hungry, thirsty plants</strong>. Plant them on a barrowload of
              well-rotted manure or compost &mdash; many growers plant straight onto the compost heap &mdash; and water
              generously and deeply, at the roots, all summer. Give them room, too: a courgette wants a square metre to
              itself, a pumpkin far more. Crowd them and you get mildew and sulks.
            </p>
            <SquashBuyerNote />
          </section>

          <TipBox title="Water at the roots, not the leaves">
            Sink a plant pot or a cut-off bottle into the soil beside each plant when you plant it, and water into that
            &mdash; it sends the water straight down to the roots where it&apos;s wanted, and keeps the leaves dry, which
            holds off the powdery mildew that loves damp foliage. A thick mulch around the plant locks the moisture in
            between waterings.
          </TipBox>

          {/* Pollination */}
          <SectionDivider label="The secret to a heavy crop" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Pollination &mdash; where most crops are won or lost
            </h2>
            <p className="mb-3">
              Here&apos;s the thing that catches everyone out: squash carry separate male and female flowers, and a bee
              has to carry pollen from one to the other before a fruit will swell. The female flowers are the ones with a
              tiny fruit already formed behind them; the males sit on plain thin stalks. A poorly pollinated female sets a
              little fruit that yellows and rots at the tip instead of growing &mdash; the classic &ldquo;why are my
              courgettes rotting?&rdquo; problem.
            </p>
            <p className="mb-3">
              So the single most valuable thing you can do is bring in the bees: plant borage, nasturtiums and calendula
              nearby (see{" "}
              <Link href="/guides/companion-planting/companion-plants-for-courgettes" className="text-rust underline decoration-rust/30 hover:text-earth">companion plants for courgettes &amp; squash</Link>). In cool, dull or early-season weather when bees are scarce, do their job
              yourself: pick a male flower, strip the petals, and dab its pollen into the centre of the female flowers in
              the cool of the morning. It takes seconds and makes all the difference.
            </p>
          </section>

          <WarningBox title="Powdery mildew is coming — and that's fine">
            By late summer the leaves will very likely turn powdery white. It looks alarming but rarely kills an
            established plant, and there&apos;s no need to despair. Water the soil not the leaves, space plants for
            airflow, snip off the worst-affected leaves, and keep picking. A plant sown fresh in early summer often
            carries on cropping cleanly long after the spring-sown ones have given up.
          </WarningBox>

          {/* Storing */}
          <SectionDivider label="Harvest & store" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Picking, and curing for the winter store
            </h2>
            <p className="mb-3">
              Pick courgettes and summer squash <strong className="text-earth">small and often</strong> &mdash; the
              moment you let one swell into a marrow, the plant eases off cropping. A glut is the courgette grower&apos;s
              rite of passage; pick every few days and share the surplus.
            </p>
            <p className="mb-3">
              Winter squash and pumpkins are the opposite: leave them on the vine to colour up fully and let the stem
              begin to cork, ideally before the first frost. Then <strong className="text-earth">cure</strong> them &mdash;
              a fortnight somewhere warm and dry to harden the skins. Cured and stored somewhere cool, dry and airy, a
              good winter squash keeps for months, the slow reward of the whole sprawling summer. Keep swelling fruits
              clean and off damp soil as they ripen.
            </p>
          </section>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Why are my courgettes rotting when small?</h3>
                <p className="text-[15px]">Usually poor pollination — an unpollinated female flower sets a tiny fruit that yellows and rots at the tip instead of swelling. Bring in pollinators with borage and nasturtiums nearby, and in cool weather hand-pollinate by dabbing pollen from a male flower into the females (the ones with a tiny fruit behind them).</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do I get more pumpkins and squash to set?</h3>
                <p className="text-[15px]">Feed the bees and, if needed, do their job. Plant pollinator flowers nearby and hand-pollinate in the morning: brush pollen from a male flower onto each female. For big pumpkins, limit each plant to one or two fruits so all its energy goes into them.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What is the white powder on my courgette leaves?</h3>
                <p className="text-[15px]">Powdery mildew — a near-inevitable late-summer fungus. It rarely kills an established plant. Slow it by watering the soil not the leaves, spacing plants for airflow, and removing the worst leaves. A fresh plant sown in early summer often crops on cleanly.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do you store winter squash and pumpkins?</h3>
                <p className="text-[15px]">Leave them to colour fully and the stem to cork, ideally before frost. Then cure them a couple of weeks somewhere warm and dry to harden the skins. Kept cool, dry and airy, good winter squash stores for months.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/guides/companion-planting/companion-plants-for-courgettes" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Companion plants for courgettes &amp; squash</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/companion-planting/companion-plants-for-sweetcorn" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">The Three Sisters: companion plants for sweetcorn</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/crops/courgettes" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to grow courgettes</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/crops/pumpkins" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to grow pumpkins</span>
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
