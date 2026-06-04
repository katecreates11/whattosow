import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionDivider, TipBox } from "@/components/GuideVisuals";
import SunPathDemo from "@/components/SunPathDemo";

export const metadata: Metadata = {
  title: "Sun Mapping: How Much Sun Does Your Garden Get? (UK Guide) | What To Sow",
  description:
    "How to sun-map your garden or allotment in the UK: work out which beds get full sun, part shade or shade, what 'south-facing' really means, and which vegetables to grow where.",
  keywords: [
    "how much sun does my garden get",
    "sun mapping garden",
    "garden aspect UK",
    "south facing garden vegetables",
    "full sun part shade vegetables",
    "which way does my garden face",
  ],
  openGraph: {
    title: "Sun Mapping: How Much Sun Does Your Garden Get?",
    description:
      "Work out which beds get full sun, part shade or shade — and what to grow where.",
    type: "article",
    url: "https://whattosow.co.uk/guides/sun-mapping",
  },
  alternates: { canonical: "/guides/sun-mapping" },
};

interface SunCat {
  label: string;
  hours: string;
  blurb: string;
  crops: string;
  color: string;
}

const cats: SunCat[] = [
  {
    label: "Full sun",
    hours: "6+ hours direct sun",
    blurb: "The hot, bright spots. Anything that fruits or ripens wants to be here.",
    crops: "Tomatoes, peppers, chillies, aubergines, courgettes, squash, sweetcorn, beans, most fruit",
    color: "text-amber",
  },
  {
    label: "Partial shade",
    hours: "3–6 hours sun",
    blurb: "Sun for part of the day, or dappled light. More forgiving than people think — many crops are happy here, and leaves actually prefer it in high summer.",
    crops: "Lettuce & salad leaves, chard, kale & brassicas, peas, beetroot, spinach, most herbs",
    color: "text-leaf",
  },
  {
    label: "Shade",
    hours: "Under 3 hours sun",
    blurb: "The shady corners. Not much fruits here, but leafy crops will give you something, and it's the place for a water butt, compost or seating rather than a hungry crop.",
    crops: "Hardy salad leaves, mint (in a pot), some chard — and not much else",
    color: "text-allotment",
  },
];

export default function SunMappingGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Sun Mapping", item: "https://whattosow.co.uk/guides/sun-mapping" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Sun Mapping: How Much Sun Does Your Garden Get?",
    description:
      "How to sun-map your garden or allotment in the UK, what your garden's aspect means, and which vegetables to grow in full sun, part shade or shade.",
    url: "https://whattosow.co.uk/guides/sun-mapping",
    publisher: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
    datePublished: "2026-06-04",
    dateModified: "2026-06-04",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I know how much sun my garden gets?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Watch it across a sunny day. Check each bed in the morning, at midday and in late afternoon, and note whether it's in sun or shadow each time. Add up the sunny hours: 6 or more is full sun, 3–6 is partial shade, under 3 is shade. Do it again later in the year, because the sun sits much lower in spring and autumn and shadows from walls, sheds and trees stretch further.",
        },
      },
      {
        "@type": "Question",
        name: "Which way should a vegetable garden face in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In the UK the sun is always in the southern half of the sky, so a south-facing plot gets the most sun and is ideal for vegetables. East-facing gets morning sun, west-facing gets afternoon sun, and north-facing gets the least — fine for leafy crops but not for ripening tomatoes.",
        },
      },
      {
        "@type": "Question",
        name: "Can you grow vegetables in shade?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some, yes. Leafy crops — lettuce and salad leaves, chard, kale, spinach — and peas and many herbs will crop in partial shade, and actually bolt less there in high summer. What you can't do in shade is ripen fruiting crops like tomatoes, peppers and squash; those need full sun.",
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
            Planning guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-4 max-w-2xl">
            Sun mapping: how much sun does your garden get?
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            The single biggest thing that decides what will grow well isn&apos;t your soil or your skill &mdash;
            it&apos;s light. &ldquo;Sun mapping&rdquo; just means working out which parts of your plot are sunny and
            which are shady, so you can put the right crop in the right place. It takes a day to do and saves you a
            season of wondering why the tomatoes sulked.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            Here&apos;s how to read your own plot &mdash; and how we use it in the{" "}
            <a href="/bed-planner" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">bed planner</a>{" "}
            to place tall crops where they won&apos;t shade the rest.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* How to map */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">How to sun-map your plot</h2>
            <p className="mb-4">
              You don&apos;t need an app or a gadget &mdash; just a sunny day and three glances out of the window.
            </p>
            <ol className="space-y-2.5 list-none">
              <li className="text-[15px]"><strong className="text-earth">Morning (around 9am).</strong> Walk the plot and note which beds are in sun and which are still in shadow.</li>
              <li className="text-[15px]"><strong className="text-earth">Midday (around 1pm).</strong> Do it again. This is the strongest sun of the day.</li>
              <li className="text-[15px]"><strong className="text-earth">Late afternoon (around 5pm).</strong> Once more. The west side catches this golden, useful light.</li>
              <li className="text-[15px]"><strong className="text-earth">Add up the sunny hours</strong> for each bed and label it full sun, partial shade or shade (below).</li>
            </ol>
          </section>

          <TipBox title="Do it more than once a year">
            The sun is much higher in June than in March, so a bed that&apos;s bright in midsummer can sit in the long
            shadow of a fence or shed in spring and autumn. If you can, sun-map once in spring and once in summer.
            Take a quick photo each time &mdash; the shadows tell the whole story.
          </TipBox>

          {/* Aspect */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">Which way does your garden face?</h2>
            <p className="mb-4">
              In the UK the sun is <em>always</em> somewhere in the southern half of the sky &mdash; rising in the
              east, arcing across the south, setting in the west. It never shines from the north. That one fact tells
              you everything about your plot&apos;s &ldquo;aspect&rdquo;:
            </p>
            <ul className="space-y-2 mb-2">
              <li className="border-l-2 border-amber/60 pl-4 text-[15px]"><strong className="text-earth">South-facing</strong> &mdash; the jackpot. Sun all day; the warmest, brightest spot. Save it for tomatoes, peppers and anything that needs to ripen.</li>
              <li className="border-l-2 border-leaf/60 pl-4 text-[15px]"><strong className="text-earth">East-facing</strong> &mdash; morning sun, afternoon shade. Gentle and good for leafy crops; cold on frosty mornings, so go steady with tender plants.</li>
              <li className="border-l-2 border-leaf/60 pl-4 text-[15px]"><strong className="text-earth">West-facing</strong> &mdash; afternoon and evening sun. Warm and productive; suits most crops.</li>
              <li className="border-l-2 border-allotment/60 pl-4 text-[15px]"><strong className="text-earth">North-facing</strong> &mdash; the least sun. Fine for leafy salads and shade-tolerant crops, and the right home for a water butt, compost or a seat &mdash; but not for ripening fruit.</li>
            </ul>
          </section>

          {/* Animated demo — why tall shades short */}
          <section className="!max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">See how the shadows move</h2>
            <p className="mb-1 max-w-2xl">
              This is the whole reason layout matters. Watch the sun cross from east to west, and see how the tall
              plant&apos;s shadow lengthens and sweeps across the shorter plants beside it &mdash; longest in the
              morning and evening, when the sun sits low.
            </p>
            <SunPathDemo />
          </section>

          {/* Categories + crops */}
          <section className="!max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">Full sun, partial shade or shade?</h2>
            <p className="mb-6 max-w-2xl">
              Once you know how many hours each bed gets, match the crop to the light. As a rule: if you eat the{" "}
              <em>fruit</em>, it wants full sun; if you eat the <em>leaves or roots</em>, it&apos;ll cope with less.
            </p>
            <div className="space-y-4">
              {cats.map((c) => (
                <div key={c.label} className="border border-earth/10 p-4 sm:p-5">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className={`font-serif text-lg text-earth`}>{c.label}</h3>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.1em] ${c.color}`}>{c.hours}</span>
                  </div>
                  <p className="text-sm text-earth-light leading-relaxed mt-1.5">{c.blurb}</p>
                  <p className="text-sm text-earth mt-2"><span className="font-semibold">Grow here:</span> {c.crops}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Using it in beds */}
          <SectionDivider label="Putting it to work" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">Using it when you plant</h2>
            <ul className="space-y-2.5">
              <li className="border-l-2 border-leaf/50 pl-4 text-[15px]"><strong className="text-earth">Tall crops to the north.</strong> Put sweetcorn, climbing beans and cordon tomatoes on the north side of a bed so their shadows fall off the bed, not across your shorter crops.</li>
              <li className="border-l-2 border-leaf/50 pl-4 text-[15px]"><strong className="text-earth">Sun-lovers on the sunniest beds.</strong> Give your full-sun beds to the crops that need to ripen, and don&apos;t waste them on lettuce.</li>
              <li className="border-l-2 border-leaf/50 pl-4 text-[15px]"><strong className="text-earth">Use the shade on purpose.</strong> Slip salad and leafy crops into the partly-shaded spots &mdash; they bolt less there in a hot summer.</li>
              <li className="border-l-2 border-leaf/50 pl-4 text-[15px]"><strong className="text-earth">Let low crops use the south edge.</strong> Keep the sunny front of a bed for the short stuff that would otherwise be overshadowed.</li>
            </ul>
          </section>

          <TipBox title="The planner does this for you">
            In the{" "}
            <a href="/bed-planner" className="text-rust underline decoration-rust/30 hover:text-earth">bed planner</a>{" "}
            you can tell it which way each bed faces, and it draws a compass, a sun marker and a light-to-shade
            gradient onto your plan &mdash; then places the tall crops on the north side automatically, so nothing
            shades anything it shouldn&apos;t.
          </TipBox>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do I know how much sun my garden gets?</h3>
                <p className="text-[15px]">Watch it across a sunny day &mdash; morning, midday and late afternoon &mdash; and note whether each bed is in sun or shadow each time. Six or more sunny hours is full sun, 3–6 is partial shade, under 3 is shade. Check again later in the year, when the lower sun throws longer shadows.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Which way should a vegetable garden face?</h3>
                <p className="text-[15px]">In the UK the sun is always in the southern sky, so a south-facing plot gets the most sun and is ideal. East gives morning sun, west gives afternoon sun, and north-facing gets the least &mdash; fine for leaves, not for ripening fruit.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Can you grow vegetables in shade?</h3>
                <p className="text-[15px]">Leafy crops (lettuce, chard, kale, spinach), peas and many herbs will crop in partial shade &mdash; and bolt less there in high summer. You just can&apos;t ripen fruiting crops like tomatoes and squash without full sun.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <a href="/bed-planner" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Plan your beds</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/companion-planting" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Companion planting guide</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/crop-rotation" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Crop rotation</span>
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
