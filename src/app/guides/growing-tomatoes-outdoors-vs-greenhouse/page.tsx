import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";
import { awinLink } from "@/lib/awin";

const TAG = "whattosow21-21";
const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=${TAG}`;
const tm = (q: string) => awinLink(`https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`);

export const metadata: Metadata = {
  title: "Growing Tomatoes Outdoors vs in a Greenhouse (UK Guide) | What To Sow",
  description:
    "Growing tomatoes in the UK: the real differences between outdoor and greenhouse tomatoes, cordon vs bush, feeding and watering, and how to dodge blight. Which to choose and how to get a heavy, ripe crop.",
  keywords: [
    "growing tomatoes UK",
    "outdoor vs greenhouse tomatoes",
    "cordon vs bush tomatoes",
    "how to grow tomatoes",
    "tomato blight prevention",
    "feeding tomatoes",
  ],
  openGraph: {
    title: "Growing Tomatoes Outdoors vs in a Greenhouse",
    description:
      "The real differences between outdoor and greenhouse tomatoes, cordon vs bush, feeding, and dodging blight.",
    type: "article",
    url: "https://whattosow.co.uk/guides/growing-tomatoes-outdoors-vs-greenhouse",
  },
  alternates: { canonical: "/guides/growing-tomatoes-outdoors-vs-greenhouse" },
};

export default function GrowingTomatoesGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Growing Tomatoes Outdoors vs Greenhouse", item: "https://whattosow.co.uk/guides/growing-tomatoes-outdoors-vs-greenhouse" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Growing Tomatoes Outdoors vs in a Greenhouse",
    description:
      "The differences between outdoor and greenhouse tomatoes, cordon vs bush, feeding and watering, and dodging blight.",
    url: "https://whattosow.co.uk/guides/growing-tomatoes-outdoors-vs-greenhouse",
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
        name: "Are greenhouse tomatoes better than outdoor ones?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A greenhouse gives a longer, more reliable season, earlier and later fruit, more warmth-loving varieties, and crucially much better protection from blight. But outdoor tomatoes are perfectly possible in the UK with the right varieties and a sunny, sheltered spot — and many growers think they taste even better for the open air. If you have a greenhouse, use it for tomatoes; if you don't, grow them outside with confidence.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between cordon and bush tomatoes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cordon (indeterminate) tomatoes grow as a single tall stem that you tie up, remove side shoots from, and stop at the top — ideal for greenhouses and supported outdoor rows. Bush (determinate) tomatoes branch low and sprawl, need no pinching out, and crop all at once — perfect for pots, hanging baskets and low-fuss outdoor growing.",
        },
      },
      {
        "@type": "Question",
        name: "How often should I feed and water tomatoes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Water consistently — little and often is better than a drought followed by a flood, which splits fruit and causes blossom end rot. Once the first truss of flowers has set, feed weekly with a high-potash tomato feed to fuel fruiting. Greenhouse plants in pots or growbags need watering daily in hot weather.",
        },
      },
      {
        "@type": "Question",
        name: "How do I stop tomato blight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Blight is a fungal disease that strikes in warm, humid weather and spreads fast. Greenhouse tomatoes are far less affected because the leaves stay dry. Outdoors, choose blight-resistant varieties, give plants plenty of air space, water the soil not the leaves, keep them away from potatoes, and watch our live blight risk so you can act early.",
        },
      },
    ],
  };

  const Cell = ({ children }: { children: React.ReactNode }) => (
    <td className="border-t border-earth/10 py-3 pr-4 align-top text-[15px] text-earth-light">{children}</td>
  );

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
            Growing tomatoes: outdoors vs in a greenhouse
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            Tomatoes are the crop everyone wants to get right, and the first big question is where to grow them. A
            greenhouse gives you a longer, surer season and a real edge against blight; outdoors, in a warm and sheltered
            spot, you get tomatoes that many swear taste even sweeter for the open air. The truth is you can grow a
            cracking crop either way &mdash; you just grow them a little differently.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            Here&apos;s how the two compare, and how to get the best from whichever you choose. For sowing dates and our
            opinionated variety picks, see the{" "}
            <a href="/crops/tomatoes" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">tomato crop page</a>;
            and if you&apos;re raising your own from seed, our{" "}
            <a href="/guides/seed-starting-kit" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">seed-starting kit guide</a>{" "}
            covers the trays, compost and warmth that get them off to a flying start.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Comparison */}
          <section className="!max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Outdoor vs greenhouse at a glance
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter"></th>
                    <th className="py-2 pr-4 font-serif text-lg text-earth">Greenhouse</th>
                    <th className="py-2 pr-4 font-serif text-lg text-earth">Outdoors</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><Cell><strong className="text-earth">Season</strong></Cell><Cell>Longer — earlier to plant out, ripens later into autumn</Cell><Cell>Shorter — wait until after the last frost, finishes earlier</Cell></tr>
                  <tr><Cell><strong className="text-earth">Blight risk</strong></Cell><Cell>Low — dry leaves rarely catch it</Cell><Cell>Higher — wet summers bring it on; choose resistant varieties</Cell></tr>
                  <tr><Cell><strong className="text-earth">Varieties</strong></Cell><Cell>Anything, including the tender, fancy and beefsteak types</Cell><Cell>Best with quicker, hardier and blight-resistant kinds</Cell></tr>
                  <tr><Cell><strong className="text-earth">Watering</strong></Cell><Cell>Daily in heat — pots and growbags dry fast</Cell><Cell>Rain helps, but still water steadily in dry spells</Cell></tr>
                  <tr><Cell><strong className="text-earth">Pollination</strong></Cell><Cell>Give plants a tap or open the door for airflow and insects</Cell><Cell>Wind and insects do it for free</Cell></tr>
                  <tr><Cell><strong className="text-earth">Flavour</strong></Cell><Cell>Excellent — and the most reliable ripening</Cell><Cell>Often superb — many say the sweetest tomatoes of all</Cell></tr>
                </tbody>
              </table>
            </div>
          </section>

          <TipBox title="No greenhouse? Try the in-between">
            You don&apos;t need glass to gain its advantages. A sunny wall throws back heat all evening; a grow-house or
            even a cold frame gives a head start; and a few plants in pots can be wheeled into shelter if the weather
            turns. Against a south-facing fence, outdoor tomatoes often do as well as anyone&apos;s.
          </TipBox>

          {/* Cordon vs bush */}
          <SectionDivider label="Two shapes" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Cordon or bush? Know which you&apos;ve got
            </h2>
            <p className="mb-3">
              The other thing that changes how you grow a tomato is its habit, and it&apos;s worth checking the packet
              before you sow &mdash; the two are managed completely differently.
            </p>
            <ul className="space-y-3 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Cordon (indeterminate)</span> &mdash; grows as one tall stem.
                Tie it to a cane or string, pinch out the side shoots that appear where each leaf meets the stem, and
                &ldquo;stop&rdquo; it (nip the growing tip) once it has set four or five trusses outdoors, more under
                glass. The classic greenhouse and supported-row tomato.{" "}
                <a href={tm("Tomato%20Cordon")} target="_blank" rel="sponsored noopener noreferrer" data-umami-event="companion-seed-click" data-umami-event-topic="growing-tomatoes" className="text-rust underline decoration-rust/30 hover:text-earth">Cordon tomato seeds &rarr;</a>
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Bush (determinate)</span> &mdash; branches low and sprawls to a
                set size, then crops more or less all at once. No side-shooting, no stopping &mdash; just let it go.
                Perfect for pots, hanging baskets and easy outdoor growing.{" "}
                <a href={tm("Tomato%20Bush")} target="_blank" rel="sponsored noopener noreferrer" data-umami-event="companion-seed-click" data-umami-event-topic="growing-tomatoes" className="text-rust underline decoration-rust/30 hover:text-earth">Bush tomato seeds &rarr;</a>
              </li>
            </ul>
          </section>

          {/* Feeding & watering */}
          <SectionDivider label="The care" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Feeding, watering &amp; the steady hand
            </h2>
            <p className="mb-3">
              Whichever way you grow them, two things make or break the crop: even watering and the right feed. Tomatoes
              loathe a drought-then-deluge rhythm &mdash; it splits the fruit and brings on blossom end rot (that sunken
              black patch on the base). Water consistently, aiming at the soil rather than the leaves, daily for pots in
              hot weather.
            </p>
            <p className="mb-3">
              Once the first truss of flowers has set, switch to a high-potash{" "}
              <a href={az("tomato feed high potash")} target="_blank" rel="sponsored noopener noreferrer" data-umami-event="gear-affiliate-click" data-umami-event-product="tomato-feed" className="text-rust underline decoration-rust/30 hover:text-earth">tomato feed</a>{" "}
              once a week &mdash; it steers the plant&apos;s energy into fruit rather than leaf. Keep removing the lower
              leaves as the trusses ripen, for airflow and to put the sun on the fruit, and pop a few pollinator flowers
              nearby &mdash; see{" "}
              <a href="/guides/companion-planting/companion-plants-for-tomatoes" className="text-rust underline decoration-rust/30 hover:text-earth">companion plants for tomatoes</a>.
            </p>
          </section>

          <WarningBox title="Blight is the outdoor grower's watch-word">
            Blight is a fungal disease that races through tomatoes (and potatoes) in warm, humid weather, turning leaves
            and fruit to brown mush in days. Greenhouse plants mostly escape it because their leaves stay dry. Outdoors,
            stack the odds: grow blight-resistant varieties, space plants for airflow, water the soil not the foliage,
            keep them well away from potatoes, and watch our live{" "}
            <a href="/guides/tomato-blight" className="text-rust underline decoration-rust/30 hover:text-earth">tomato &amp; potato blight risk</a>{" "}
            so you can pick early or spray before it takes hold.
          </WarningBox>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Are greenhouse tomatoes better than outdoor ones?</h3>
                <p className="text-[15px]">A greenhouse gives a longer, more reliable season, more variety choice and far better blight protection. But outdoor tomatoes grow well in the UK with the right varieties and a sunny, sheltered spot &mdash; and many think they taste even better. Use a greenhouse if you have one; grow outside with confidence if you don&apos;t.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What is the difference between cordon and bush tomatoes?</h3>
                <p className="text-[15px]">Cordon (indeterminate) types grow as one tall stem you tie up, side-shoot and stop &mdash; ideal for greenhouses and supported rows. Bush (determinate) types branch low, sprawl, need no pinching out and crop all at once &mdash; perfect for pots and low-fuss growing.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How often should I feed and water tomatoes?</h3>
                <p className="text-[15px]">Water consistently &mdash; little and often beats drought-then-flood, which splits fruit and causes blossom end rot. Once the first truss sets, feed weekly with a high-potash tomato feed. Pots and growbags need daily watering in hot weather.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do I stop tomato blight?</h3>
                <p className="text-[15px]">Greenhouse plants mostly escape it (dry leaves). Outdoors, grow blight-resistant varieties, give plenty of airflow, water the soil not the leaves, keep tomatoes away from potatoes, and watch our live blight risk so you can act early.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <a href="/crops/tomatoes" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to grow tomatoes — dates &amp; varieties</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/tomato-blight" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Tomato &amp; potato blight — live risk</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/companion-planting/companion-plants-for-tomatoes" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Companion plants for tomatoes</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/blog/best-cold-frames-greenhouses-uk" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Best cold frames &amp; greenhouses</span>
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
