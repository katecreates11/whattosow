import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";
import BedDiagram from "@/components/BedDiagram";
import { awinLink } from "@/lib/awin";

const TAG = "whattosow21-21";
const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=${TAG}`;
const tm = (q: string) => awinLink(`https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`);

export const metadata: Metadata = {
  title: "What to Sow in Autumn & Winter in the UK — Complete Guide | What To Sow",
  description:
    "What to sow in autumn and winter in the UK: quick crops to harvest before the cold, hardy vegetables to overwinter for an early spring crop, and how to protect it all. The season that most growers waste.",
  keywords: [
    "what to sow in autumn UK",
    "autumn vegetables to plant UK",
    "winter vegetables UK",
    "overwintering vegetables",
    "what to plant in September October",
    "autumn allotment jobs",
  ],
  openGraph: {
    title: "What to Sow in Autumn & Winter in the UK",
    description:
      "Quick crops before the cold, hardy veg to overwinter, and how to protect it all. The season most growers waste.",
    type: "article",
    url: "https://whattosow.co.uk/guides/autumn-winter-vegetables",
  },
  alternates: { canonical: "/guides/autumn-winter-vegetables" },
};

interface SowItem {
  name: string;
  slug?: string;
  note: string;
  seeds?: string; // tracked seed link
}

const quickCrops: SowItem[] = [
  { name: "Radishes", slug: "radishes", note: "The fastest of all — roots in about four weeks. Sneak a sowing into any gap into early autumn.", seeds: tm("Radish") },
  { name: "Oriental leaves (mizuna, mibuna, pak choi, mustard)", slug: "pak-choi", note: "Quick, peppery and happiest in cooler weather — perfect for autumn salad bowls.", seeds: tm("Oriental%20Leaves") },
  { name: "Winter salad & lamb's lettuce", slug: "lettuce", note: "Hardy cut-and-come-again leaves to keep a salad going through the cold under a cloche.", seeds: tm("Winter%20Lettuce") },
  { name: "Spinach (hardy varieties)", slug: "spinach", note: "Sow now for autumn picking, and again for a crop that overwinters into spring.", seeds: tm("Spinach") },
  { name: "Rocket", slug: "rocket", note: "Grows fast and tastes better in cool weather — far less likely to bolt than a summer sowing.", seeds: tm("Rocket") },
  { name: "Turnips", slug: "turnips", note: "A quick autumn root from an early-autumn sowing; the young leaves are good eating too.", seeds: tm("Turnip") },
];

const overwinterCrops: SowItem[] = [
  { name: "Garlic", slug: "garlic", note: "Plant individual cloves in autumn — they need a cold spell to split into bulbs. The easiest win of the whole year.", seeds: tm("Garlic") },
  { name: "Autumn onion sets & shallots", slug: "onion-sets", note: "Go in now and look after themselves over winter for a harvest weeks ahead of spring-planted ones.", seeds: tm("Onion%20Sets") },
  { name: "Broad beans", slug: "broad-beans", note: "Sow a hardy variety like Aquadulce Claudia in autumn for beans a month earlier than spring sowings. Fleece in hard frosts.", seeds: tm("Broad%20Bean%20Aquadulce") },
  { name: "Hardy peas", slug: "peas", note: "Winter-hardy types (Douce Provence, Meteor) sown in autumn give the earliest peas of next year under a cloche.", seeds: tm("Pea%20Meteor") },
  { name: "Spring onions", slug: "spring-onions", note: "Hardy varieties sown in autumn stand through winter for an early pull.", seeds: tm("Spring%20Onion") },
  { name: "Swiss chard", slug: "swiss-chard", note: "Tough, beautiful and forgiving — often stands right through a mild winter for fresh leaves.", seeds: tm("Swiss%20Chard") },
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
            data-umami-event="affiliate-click" data-umami-event-type="seed" data-umami-event-merchant="thompson-morgan"
            data-umami-event-topic="autumn-winter"
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

export default function AutumnWinterGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Autumn & Winter Vegetables", item: "https://whattosow.co.uk/guides/autumn-winter-vegetables" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What to Sow in Autumn & Winter in the UK",
    description:
      "Quick crops to harvest before the cold, hardy vegetables to overwinter for an early spring crop, and how to protect it all.",
    url: "https://whattosow.co.uk/guides/autumn-winter-vegetables",
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
        name: "What vegetables can I sow in autumn in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Two kinds: quick crops to eat before winter — radishes, oriental leaves, winter salad, rocket, spinach and turnips — and hardy crops to overwinter for an early spring harvest, like garlic, autumn onion sets, broad beans, hardy peas and spring onions.",
        },
      },
      {
        "@type": "Question",
        name: "Is it too late to plant vegetables in autumn?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rarely. Early autumn still suits quick salads and leaves under cover, and right through autumn you can plant garlic, autumn onion sets, broad beans and hardy peas to overwinter. Once the soil drops below about 5°C in late autumn, growth more or less stops until spring, so you're then planting for spring rather than for now.",
        },
      },
      {
        "@type": "Question",
        name: "How do I protect winter vegetables from frost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Horticultural fleece, cloches and a cold frame are the workhorses. Fleece draped over hardy crops adds a few degrees on frosty nights; cloches keep salad going; and a cold frame or small greenhouse gives tender and half-hardy things a snug spot. Good drainage matters as much as warmth — most winter losses are from sitting wet, not cold alone.",
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
            What to sow in autumn &amp; winter in the UK
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            Most growers down tools in September, and that&apos;s the mistake. The back half of the year quietly
            sets up the front half of the next &mdash; there are quick crops to eat before the cold, and hardy ones
            to tuck in now for a harvest weeks ahead of everyone else come spring. The cue to begin?{" "}
            <a href="/longest-day" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">
              The longest day
            </a>{" "}
            &mdash; midsummer is when the autumn plot gets sown.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            &ldquo;Autumn&rdquo; arrives at different times across the country, so let your own weather lead &mdash;{" "}
            <a href="/" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">
              enter your postcode
            </a>{" "}
            for dates tuned to your first frost.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Quick crops */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Quick crops &mdash; sow now, eat before winter
            </h2>
            <p className="mb-2">
              From late summer into early autumn there&apos;s still time for fast, cool-loving crops. They actually
              prefer the gentler light and are far less likely to bolt than a summer sowing. A cloche or a sheet of
              fleece keeps them going as the nights draw in.
            </p>
            <div className="mt-4">
              {quickCrops.map((c) => (
                <SowRow key={c.name} item={c} />
              ))}
            </div>
          </section>

          <TipBox title="Sow little and often">
            Through autumn, scatter small pinches of salad and leaves every couple of weeks rather than one big
            sowing. You&apos;ll get a steady supply for the kitchen instead of a glut followed by nothing &mdash; and
            a few pots on the windowsill or in the{" "}
            <a href="/blog/best-cold-frames-greenhouses-uk" className="text-rust underline decoration-rust/30 hover:text-earth">cold frame</a>{" "}
            keep cut-and-come-again leaves on the go almost all winter.
          </TipBox>

          {/* Overwinter */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Hardy crops &mdash; sow now for an early spring harvest
            </h2>
            <p className="mb-2">
              This is the clever bit. A handful of tough crops go in during autumn, sit quietly through the cold, and
              romp away the moment spring arrives &mdash; giving you broad beans, garlic and onions weeks before
              anything you could sow in March. They ask almost nothing of you over winter.
            </p>
            <div className="mt-4">
              {overwinterCrops.map((c) => (
                <SowRow key={c.name} item={c} />
              ))}
            </div>
          </section>

          <WarningBox title="It&apos;s wet, not just cold, that kills">
            Most overwintering losses come from plants sitting in cold, sodden ground, not from frost itself. Make
            sure beds drain freely, don&apos;t overwater, and if your soil is heavy, a{" "}
            <a href="/blog/best-raised-beds-uk" className="text-rust underline decoration-rust/30 hover:text-earth">raised bed</a>{" "}
            that drains well is the single biggest help for winter growing.
          </WarningBox>

          {/* Bed layouts — how to actually arrange an autumn bed */}
          <SectionDivider label="How to lay it out" />
          <section className="!max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              How to arrange an autumn bed
            </h2>
            <p className="mb-3 max-w-2xl">
              The trick with autumn beds is to plant things that suit each other&apos;s timing: crops that go in
              together and come out together, so you can clear a whole bed at once and follow it with something else.
              A few simple principles:
            </p>
            <ul className="space-y-2 mb-7 max-w-2xl">
              <li className="border-l-2 border-leaf/50 pl-4 text-[15px]">
                <strong className="text-earth">Group by harvest time</strong> &mdash; put the overwintering staples
                (garlic, onions, broad beans) in one bed; they all clear by midsummer, freeing the whole bed for a
                summer crop.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4 text-[15px]">
                <strong className="text-earth">Tall things to one side</strong> &mdash; broad beans get tall, so keep
                them to the back or a long edge where they won&apos;t shade the lower rows as the light returns.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4 text-[15px]">
                <strong className="text-earth">Cover the soil</strong> &mdash; bare winter soil is wasted soil. Fill
                gaps with quick salad under a cloche, or sow a{" "}
                <a href="/guides/green-manures" className="text-rust underline decoration-rust/30 hover:text-earth">green manure</a>{" "}
                to protect and feed the ground until spring.
              </li>
            </ul>

            <div className="grid sm:grid-cols-2 gap-5">
              <BedDiagram
                title="The overwintering staples bed"
                note="Garlic, onions and broad beans all go in during autumn and clear by midsummer — plant them together and you free the whole bed at once. Broad beans down one long edge so they don't shade the rest."
                plantings={[
                  { name: "Broad beans (double row)", color: "#2D5F3E", initial: "Bb", rows: [13, 25] },
                  { name: "Garlic (rows)", color: "#9B86C4", initial: "Ga", rows: [45, 59] },
                  { name: "Onion sets (rows)", color: "#C9882F", initial: "On", rows: [78, 92] },
                ]}
              />
              <BedDiagram
                title="Winter salad under a cloche"
                note="Dense rows of hardy cut-and-come-again leaves, kept snug under a cloche or in a cold frame. Pick a little from each row and they'll keep giving through the cold."
                plantings={[
                  { name: "Winter lettuce", color: "#6FA84F", initial: "Le", rows: [13, 29] },
                  { name: "Lamb's lettuce", color: "#8FB76B", initial: "La", rows: [45] },
                  { name: "Rocket", color: "#4F8A3C", initial: "Ro", rows: [61] },
                  { name: "Spinach", color: "#2F6B3A", initial: "Sp", rows: [77, 92] },
                ]}
              />
            </div>
            <p className="text-sm text-earth-light mt-4 max-w-2xl">
              Once the overwintering bed is cleared in summer, it&apos;s the perfect spot for hungry follow-on crops
              like courgettes or squash &mdash; the beans will have left a little nitrogen behind for them.
            </p>
          </section>

          {/* Protection / kit */}
          <SectionDivider label="Protect it" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Giving them a fighting chance
            </h2>
            <p className="mb-4">
              A little protection turns &ldquo;might survive&rdquo; into &ldquo;thrives&rdquo;. None of it is dear,
              and it all comes out again year after year:
            </p>
            <ul className="space-y-3 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Horticultural fleece</span> &mdash; the cheapest few degrees
                of frost protection there is. Drape it over hardy crops on cold nights.{" "}
                <a href={az("horticultural fleece plant frost protection")} target="_blank" rel="sponsored noopener noreferrer" data-umami-event="affiliate-click" data-umami-event-type="gear" data-umami-event-merchant="amazon" data-umami-event-product="fleece" className="text-rust underline decoration-rust/30 hover:text-earth">On Amazon &rarr;</a>
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Cloches</span> &mdash; little tunnels or bell covers that keep
                salad and seedlings snug and the worst of the rain off.{" "}
                <a href={az("garden cloche tunnel plant cover")} target="_blank" rel="sponsored noopener noreferrer" data-umami-event="affiliate-click" data-umami-event-type="gear" data-umami-event-merchant="amazon" data-umami-event-product="cloche" className="text-rust underline decoration-rust/30 hover:text-earth">On Amazon &rarr;</a>
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">A cold frame or small greenhouse</span> &mdash; the proper
                upgrade, for hardening off and overwintering tender things. See our{" "}
                <a href="/blog/best-cold-frames-greenhouses-uk" className="text-rust underline decoration-rust/30 hover:text-earth">cold frames &amp; greenhouses guide</a>.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">A polytunnel</span> &mdash; the biggest leap of all, if you&apos;ve
                the room: a whole growing space that keeps you cropping right through winter. See our{" "}
                <a href="/blog/best-polytunnels-uk" className="text-rust underline decoration-rust/30 hover:text-earth">polytunnels guide</a>.
              </li>
            </ul>
          </section>

          {/* Jobs */}
          <SectionDivider label="While you're there" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Autumn &amp; winter jobs that pay off in spring
            </h2>
            <p className="mb-3">
              The growing slows, but a few hours now save you weeks later. Spread a layer of{" "}
              <a href="/guides/composting" className="text-rust underline decoration-rust/30 hover:text-earth">compost</a>{" "}
              or well-rotted muck over the beds and let the worms work it in &mdash; the no-dig way. Clear away spent
              crops and the slugs&apos; winter hideouts. Sort and store your seeds somewhere cool and dry. And put the
              plot to bed knowing the garlic and broad beans are already away.
            </p>
          </section>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What vegetables can I sow in autumn in the UK?</h3>
                <p className="text-[15px]">Two kinds: quick crops to eat before winter &mdash; radishes, oriental leaves, winter salad, rocket, spinach and turnips &mdash; and hardy crops to overwinter for an early spring harvest, like garlic, autumn onion sets, broad beans, hardy peas and spring onions.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Is it too late to plant vegetables in autumn?</h3>
                <p className="text-[15px]">Rarely. Early autumn still suits quick salads and leaves under cover, and right through autumn you can plant garlic, autumn onion sets, broad beans and hardy peas to overwinter. Once the soil drops below about 5°C in late autumn, growth more or less stops until spring &mdash; so you&apos;re then planting for spring rather than for now.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do I protect winter vegetables from frost?</h3>
                <p className="text-[15px]">Fleece, cloches and a cold frame are the workhorses. Fleece adds a few degrees on frosty nights, cloches keep salad going, and a cold frame gives tender things a snug spot. Good drainage matters as much as warmth &mdash; most winter losses are from sitting wet, not cold alone.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <a href="/guides/growing-winter-salad-leaves" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Growing winter salad leaves</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/overwintering-broad-beans-and-peas" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Overwintering broad beans &amp; peas</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/protecting-vegetables-from-frost" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Protecting crops from frost</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/preparing-your-plot-for-winter" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Preparing your plot for winter</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/spring-vegetables" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Spring vegetables to plant</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/companion-planting" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Companion planting guide</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/still-time" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What can you still sow?</span>
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
