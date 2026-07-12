import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateLink from "@/components/AffiliateLink";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";

const TAG = "whattosow21-21";
const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=${TAG}`;

function FrostBuyerNote() {
  return (
    <aside className="my-8 border-y border-earth/10 py-5" aria-labelledby="frost-buyer-note">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-rust mb-2">
        Buyer note
      </p>
      <h3 id="frost-buyer-note" className="font-serif text-xl text-earth mb-3">
        Worth buying for frost protection
      </h3>
      <div className="space-y-4 text-[15px] leading-relaxed">
        <p className="text-earth">
          <span className="font-serif">Worth buying:</span> a roll of horticultural fleece first. Add a cloche tunnel if
          you want to keep a row of salad or seedlings moving through a cold spell.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <AffiliateLink href={az("horticultural fleece plant frost protection")} product="horticultural fleece" type="gear" merchant="amazon" position="frost-protection-fleece" className="font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">
            Compare horticultural fleece &rarr;
          </AffiliateLink>
          <AffiliateLink href={az("garden cloche tunnel plant cover")} product="cloche tunnel" type="gear" merchant="amazon" position="frost-protection-cloche" className="font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">
            Compare cloche tunnels &rarr;
          </AffiliateLink>
        </div>
        <p className="text-earth-light">
          <span className="font-serif text-earth">Skip emergency gadgets.</span> Most frost saves come from timing,
          tucking the edges down, and simple cover close to the crop.
        </p>
      </div>
    </aside>
  );
}

export const metadata: Metadata = {
  title: "Protecting Vegetables from Frost (UK) — Fleece & Cloches | What To Sow",
  description:
    "How to protect vegetables from frost in the UK: which crops are hardy and which need cover, and how to choose between fleece, cloches, cold frames and polytunnels. Beat both winter cold and late spring frosts.",
  keywords: [
    "protecting vegetables from frost",
    "frost protection for plants UK",
    "horticultural fleece vs cloche",
    "cold frame for winter veg",
    "protecting crops from cold",
    "how to protect plants from frost",
  ],
  openGraph: {
    title: "Protecting Vegetables from Frost — Fleece, Cloches & Cold Frames",
    description:
      "Which crops are hardy, which need cover, and how to choose between fleece, cloches, cold frames and polytunnels.",
    type: "article",
    url: "https://whattosow.co.uk/guides/protecting-vegetables-from-frost",
  },
  alternates: { canonical: "/guides/protecting-vegetables-from-frost" },
};

export default function FrostProtectionGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Protecting Vegetables from Frost", item: "https://whattosow.co.uk/guides/protecting-vegetables-from-frost" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Protecting Vegetables from Frost — Fleece, Cloches & Cold Frames",
    description:
      "Which crops are hardy, which need cover, and how to choose between fleece, cloches, cold frames and polytunnels.",
    url: "https://whattosow.co.uk/guides/protecting-vegetables-from-frost",
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
        name: "How do I protect my vegetables from frost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Match the cover to the crop. A layer of horticultural fleece draped over hardy plants adds a few crucial degrees on frosty nights; a cloche keeps salad and seedlings snug; a cold frame shelters the tenderest things; and a polytunnel or greenhouse extends the whole season. Know your average frost dates, watch the forecast, and have the fleece ready to throw over at short notice.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between fleece and a cloche?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Horticultural fleece is a light fabric you drape directly over plants or hoops — cheap, flexible and quick to throw over a whole bed before a frost. A cloche is a rigid or semi-rigid cover (a mini-tunnel or bell) that sits over a row, giving more warmth and rain protection and lasting longer. Fleece is best for occasional frost cover; a cloche for keeping crops going through a cold spell.",
        },
      },
      {
        "@type": "Question",
        name: "Which vegetables survive frost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many are genuinely hardy: kale, leeks, parsnips, Brussels sprouts, winter cabbage, swede, garlic, broad beans and hardy salad like lamb's lettuce all take frost in their stride — some, like parsnips and kale, taste better for it. Tender crops such as tomatoes, courgettes, beans, squash and potatoes are killed by the first frost and must be harvested or protected before it arrives.",
        },
      },
      {
        "@type": "Question",
        name: "Does fleece really protect plants from frost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — a single layer of horticultural fleece typically lifts the temperature beneath it by a couple of degrees, and a double layer more, which is often enough to carry a hardy crop through a frosty night unharmed. It works by trapping warmth radiating from the soil. Make sure it's held off the foliage where you can and tucked down at the edges so the warm air can't escape.",
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
            Protecting vegetables from frost
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            Frost is the gardener&apos;s clock &mdash; it ends the summer crops and shapes the winter ones &mdash; but
            it needn&apos;t be the enemy. A surprising amount comes down to two things: knowing which crops actually need
            protecting (many don&apos;t), and having the right bit of cover to hand for the ones that do. Get those right
            and a frosty forecast stops being a worry.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            The first thing to know is when frost is likely where you are &mdash;{" "}
            <a href="/frost-map" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">
              check your local frost dates
            </a>{" "}
            so nothing catches you out, in autumn or in spring.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Hardy vs tender */}
          <section className="!max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              First, know what actually needs covering
            </h2>
            <p className="mb-4 max-w-2xl">
              Half the battle is realising how much takes frost in its stride. Don&apos;t waste fleece on crops that
              don&apos;t want it &mdash; save it for the ones that do.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-sage/30 border border-earth/10 px-5 py-5">
                <h3 className="font-serif text-lg text-earth mb-2">Hardy &mdash; leave them be</h3>
                <p className="text-[15px] text-earth-light mb-2">
                  Take frost happily, some even sweeter for it:
                </p>
                <p className="text-[15px] text-earth-light leading-relaxed">
                  Kale, leeks, parsnips, Brussels sprouts, winter cabbage, swede, garlic, autumn-sown broad beans, and
                  hardy salad like lamb&apos;s lettuce and claytonia.
                </p>
              </div>
              <div className="bg-blush/40 border border-earth/10 px-5 py-5">
                <h3 className="font-serif text-lg text-earth mb-2">Tender &mdash; frost kills them</h3>
                <p className="text-[15px] text-earth-light mb-2">
                  Harvest or protect before the first frost:
                </p>
                <p className="text-[15px] text-earth-light leading-relaxed">
                  Tomatoes, courgettes, squash, pumpkins, French &amp; runner beans, sweetcorn, potatoes (the foliage),
                  cucumbers and all the tender herbs like basil.
                </p>
              </div>
            </div>
            <p className="text-sm text-earth-light mt-4 max-w-2xl">
              In between sit the half-hardy crops &mdash; the ones a sharp frost will damage but a little cover carries
              through. Those are what the fleece and cloches are really for.
            </p>
          </section>

          {/* The kit */}
          <SectionDivider label="The cover" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Choosing your protection
            </h2>
            <p className="mb-4">
              There&apos;s a ladder of protection, from a sheet you throw over at dusk to a whole growing space. Most
              plots end up with a couple of these:
            </p>
            <ul className="space-y-4 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-lg text-earth block">Horticultural fleece</span>
                <p className="text-[15px] mt-1">
                  The cheapest, most flexible frost insurance there is. Drape it over a bed or over hoops before a frosty
                  night and it traps a couple of degrees of the soil&apos;s warmth &mdash; often all a hardy crop needs.
                  Double it up for harder frosts. Keep a roll in the shed to throw over at short notice.
                </p>
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-lg text-earth block">Cloches &amp; mini-tunnels</span>
                <p className="text-[15px] mt-1">
                  Rigid or hooped covers that sit over a row, keeping warmth in and rain off. Better than fleece for
                  carrying salad and seedlings through a sustained cold spell, and they double up to warm the soil for
                  early spring sowings.
                </p>
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-lg text-earth block">A cold frame</span>
                <p className="text-[15px] mt-1">
                  The snug box for the tenderest winter pickings and the best tool for hardening off in spring. A proper
                  upgrade that earns its keep all year. See our{" "}
                  <Link href="/blog/best-cold-frames-greenhouses-uk" className="text-rust underline decoration-rust/30 hover:text-earth">cold frames &amp; greenhouses guide</Link>.
                </p>
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-lg text-earth block">A polytunnel or greenhouse</span>
                <p className="text-[15px] mt-1">
                  The biggest leap &mdash; a whole sheltered space that keeps you cropping right through winter and gets
                  you sowing weeks earlier in spring. See our{" "}
                  <Link href="/blog/best-polytunnels-uk" className="text-rust underline decoration-rust/30 hover:text-earth">polytunnels guide</Link>.
                </p>
              </li>
            </ul>
            <FrostBuyerNote />
          </section>

          <TipBox title="The free protection you already have">
            Before you buy anything: bare soil radiates warmth, so a well-mulched, sheltered bed is warmer than an
            exposed one. A sunny wall or fence throws back heat into the evening. Cardboard or even a layer of straw
            tucked over hardy roots keeps the worst of the frost off them. And simply moving pots against the house wall
            or into the shed for a frosty night costs nothing at all.
          </TipBox>

          {/* How to do it well */}
          <SectionDivider label="The knack" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Using cover well
            </h2>
            <ul className="space-y-2 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Cover before the cold, not during it</strong> &mdash; the point is to trap
                the day&apos;s warmth, so get the fleece on in the late afternoon, not once the frost has already settled.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Tuck the edges down</strong> &mdash; warm air escapes from open sides. Weigh
                or peg fleece and cloches down all round so they actually hold the heat.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Give air on mild days</strong> &mdash; covered crops can cook and grow damp
                and mouldy in warm or still spells. Vent cloches and frames, and don&apos;t leave fleece on through a mild
                week.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Don&apos;t forget spring</strong> &mdash; the late frosts of April and May
                catch out tender plants put out too early. The same fleece protects newly planted-out crops then. Watch
                your <Link href="/" className="text-rust underline decoration-rust/30 hover:text-earth">local last-frost date</Link> before planting tender things out.
              </li>
            </ul>
          </section>

          <WarningBox title="Watch the forecast, not the calendar">
            Frost doesn&apos;t read the calendar &mdash; a clear, still night in early autumn or late spring can bring one
            weeks outside the &ldquo;average&rdquo; dates. Clear skies and no wind are the warning signs. Keep half an eye
            on the forecast at either end of the season and have the fleece within reach, and you&apos;ll never be caught
            out.
          </WarningBox>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do I protect my vegetables from frost?</h3>
                <p className="text-[15px]">Match the cover to the crop: fleece over hardy plants for a few extra degrees on frosty nights, a cloche for salad and seedlings, a cold frame for tender things, a polytunnel to extend the whole season. Know your frost dates, watch the forecast, and keep fleece ready to throw over.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What is the difference between fleece and a cloche?</h3>
                <p className="text-[15px]">Fleece is a light fabric you drape straight over plants — cheap, flexible, quick to throw over a whole bed before a frost. A cloche is a rigid cover over a row, giving more warmth and rain protection and lasting longer. Fleece for occasional frosts, a cloche for a sustained cold spell.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Which vegetables survive frost?</h3>
                <p className="text-[15px]">Plenty: kale, leeks, parsnips, Brussels sprouts, winter cabbage, swede, garlic, autumn-sown broad beans and hardy salad all take frost in their stride — some taste better for it. Tender crops like tomatoes, courgettes, beans, squash and potatoes are killed by the first frost.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Does fleece really protect plants from frost?</h3>
                <p className="text-[15px]">Yes — a single layer typically lifts the temperature beneath by a couple of degrees (more if doubled), often enough to carry a hardy crop through a frosty night. It traps warmth rising from the soil, so hold it off the foliage and tuck the edges down.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <a href="/frost-map" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Your local frost dates &mdash; the frost map</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/growing-winter-salad-leaves" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Growing winter salad leaves</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/autumn-winter-vegetables" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What to sow in autumn &amp; winter</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <Link href="/blog/best-cold-frames-greenhouses-uk" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Best cold frames &amp; greenhouses</span>
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
