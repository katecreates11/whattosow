import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";
import AffiliateLink from "@/components/AffiliateLink";

const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}`;

export const metadata: Metadata = {
  title: "Watering the Veg Patch While You're on Holiday (UK Guide) | What To Sow",
  description:
    "How to keep vegetables watered while you're away: tap timers and drip lines, soaker hose, wicking tricks for pots, mulch, shade, and the neighbour deal that beats them all. Come home to a patch that barely noticed.",
  keywords: [
    "watering plants while on holiday",
    "watering vegetables on holiday",
    "holiday watering system",
    "automatic watering vegetable garden",
    "keep allotment watered holiday",
    "self watering pots holiday",
  ],
  openGraph: {
    title: "Watering the Veg Patch While You're on Holiday",
    description:
      "Timers, drip lines, wicking tricks and the neighbour deal — how to go away in high summer and come home to a patch that barely noticed.",
    type: "article",
    url: "https://whattosow.co.uk/guides/watering-while-away",
  },
  alternates: { canonical: "/guides/watering-while-away" },
};

export default function WateringWhileAwayGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Watering While You're Away", item: "https://whattosow.co.uk/guides/watering-while-away" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Watering the Veg Patch While You're on Holiday",
    description:
      "How to keep vegetables watered while you're away: timers and drip lines, soaker hose, wicking tricks for pots, mulch, shade, and the neighbour deal.",
    url: "https://whattosow.co.uk/guides/watering-while-away",
    publisher: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long can vegetables go without watering?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Established plants in open ground, well mulched, will shrug off a week in an ordinary British summer. Pots are the worry — in hot weather a container can dry out in a day. A long weekend needs little more than a good soak before you go; a fortnight in a heatwave needs a plan for the pots and the thirsty crops like tomatoes, courgettes and runner beans.",
        },
      },
      {
        "@type": "Question",
        name: "What is the cheapest way to water plants on holiday?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Move every pot into one shady huddle, stand the thirstiest in saucers or a paddling-pool inch of water, push an upturned bottle with a dripper spike into each big container, and soak and mulch the beds before you leave. All of it costs a few pounds at most — and a kind neighbour with a watering can beats every gadget.",
        },
      },
      {
        "@type": "Question",
        name: "Do tap timers and drip irrigation work for vegetables?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — a simple battery tap timer running a soaker hose or drip line along the beds is the most reliable hands-off option. Set it for early morning, test it for a week before you travel, and it will water more evenly than most of us manage by hand.",
        },
      },
      {
        "@type": "Question",
        name: "Should I harvest everything before going away?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pick everything that's ready or nearly ready, even slightly small — courgettes especially, which turn into marrows in a week. Picking hard before you go also tells beans, peas and courgettes to keep producing, so you come home to fresh pickings rather than tired, seed-set plants.",
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
            Going away? How to keep everything watered while you&apos;re gone
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            It&apos;s the great unfairness of growing your own: the fortnight you&apos;re away is always the fortnight the
            sun finally arrives. The tomatoes are just hitting their stride, the courgettes are doubling by the day, and
            you&apos;re standing at the departure gate wondering if any of it will still be alive when you get back.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            The good news: a veg patch is tougher than it looks, and an hour of setting up before you leave covers almost
            everything. Here&apos;s what actually works, from free tricks to a timer that waters more faithfully than we do.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Triage */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              First, know what actually needs you
            </h2>
            <p className="mb-3">
              Not everything is in danger. Established plants in open ground, with their roots down deep, will shrug off a
              week of an ordinary British summer &mdash; especially after a proper soak and a mulch. What suffers is
              anything in a <strong className="text-earth">pot</strong> (a container can dry out in a single hot day),
              anything <strong className="text-earth">newly planted</strong>, and the thirsty summer crops in full
              production &mdash; <Link href="/crops/tomatoes" className="text-rust underline decoration-rust/30 hover:text-earth">tomatoes</Link>,{" "}
              <Link href="/crops/courgettes" className="text-rust underline decoration-rust/30 hover:text-earth">courgettes</Link>,{" "}
              <Link href="/crops/runner-beans" className="text-rust underline decoration-rust/30 hover:text-earth">runner beans</Link>{" "}
              and anything in a growbag.
            </p>
            <p className="mb-3">
              So the plan is simple: put your effort where the risk is. Beds get a soak and a mulch. Pots get gathered,
              shaded and stood in water. The thirsty crops get whatever automation you can manage &mdash; or a neighbour.
            </p>
          </section>

          <TipBox title="The night before you go">
            Water everything slowly and deeply &mdash; evening is best, so it soaks in rather than steaming off. A long
            drink at the roots the night before you leave is worth three hasty sprinkles, and it buys every plant on the
            patch its first few days without you.
          </TipBox>

          {/* Free tricks */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              The free tricks (a weekend to a week)
            </h2>
            <ul className="space-y-3 mb-3">
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Huddle the pots in the shade.</strong> Move every container off the hot
                patio and into one shady spot, packed close so they shade each other&apos;s sides. Out of the sun, a pot
                loses half the water it would otherwise &mdash; and one huddle is easy for a helper to water in a minute.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Stand the thirstiest in water.</strong> Deep saucers, a washing-up bowl, or
                an inch of water in a paddling pool or gravel tray &mdash; the compost wicks it up from below for days.
                (For a week or less, this alone will hold most pots.)
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Mulch anything bare.</strong> A couple of inches of compost or grass
                clippings over damp soil slows evaporation right down. Our{" "}
                <Link href="/guides/watering" className="text-rust underline decoration-rust/30 hover:text-earth">watering guide</Link>{" "}
                covers why mulch does more than most watering ever will.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Pick everything, even small.</strong> Courgettes become marrows in a week;
                beans that set seed tell the plant to stop. Picking hard before you go means the plants keep producing
                &mdash; and you come home to fresh pickings, not regrets.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">The upturned bottle.</strong> A wine bottle or two-litre bottle filled with
                water and pushed neck-down into the compost drips out slowly as the soil dries. A cheap{" "}
                <AffiliateLink
                  href={az("terracotta watering spikes bottle")}
                  product="watering spikes"
                  position="holiday-watering-spikes"
                  className="font-serif italic text-rust border-b border-rust/30 pb-0.5 hover:text-earth transition-colors"
                >
                  Compare watering spikes
                </AffiliateLink>{" "}
                makes it drip evenly instead of glugging out in an hour.
              </li>
            </ul>
          </section>

          {/* The kit that does it properly */}
          <SectionDivider label="Going hands-off" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              The kit that waters for you (a week or more)
            </h2>
            <p className="mb-3">
              For a proper holiday &mdash; or just a busy August &mdash; a{" "}
              <strong className="text-earth">battery tap timer</strong> feeding a{" "}
              <strong className="text-earth">soaker hose or drip line</strong> is the honest answer. It&apos;s not
              complicated: the timer screws onto the tap, the hose runs along the beds, and every morning at six it
              quietly does the job better than most of us manage with a can.
            </p>
            <ul className="space-y-3 mb-3">
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">A tap timer</strong> &mdash; the brains of it. Set it for early morning so
                the water soaks in before the heat.{" "}
                <AffiliateLink
                  href={az("hozelock water timer tap")}
                  product="tap timer"
                  position="holiday-watering-timer"
                  className="font-serif italic text-rust border-b border-rust/30 pb-0.5 hover:text-earth transition-colors"
                >
                  Compare tap timers &rarr;
                </AffiliateLink>
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Soaker hose along the beds</strong> &mdash; sweats water gently down its
                whole length, straight to the roots, no leaves wetted (the{" "}
                <Link href="/blight-watch" className="text-rust underline decoration-rust/30 hover:text-earth">blight</Link>{" "}
                won&apos;t thank you, and that&apos;s the point).{" "}
                <AffiliateLink
                  href="https://www.amazon.co.uk/dp/B000TAFENY"
                  product="soaker hose"
                  position="holiday-watering-soaker-hose"
                  className="font-serif italic text-rust border-b border-rust/30 pb-0.5 hover:text-earth transition-colors"
                >
                  Compare soaker hoses &rarr;
                </AffiliateLink>
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">A drip kit for pots and growbags</strong> &mdash; thin spaghetti lines with
                a dripper pegged into each container. Fiddlier to set up, unbeatable for a patio of pots.{" "}
                <AffiliateLink
                  href={az("drip irrigation kit pots garden")}
                  product="drip irrigation kit"
                  position="holiday-watering-drip-kit"
                  className="font-serif italic text-rust border-b border-rust/30 pb-0.5 hover:text-earth transition-colors"
                >
                  Compare drip kits &rarr;
                </AffiliateLink>
              </li>
            </ul>
            <p className="mb-3">
              No outside tap? A timer that works from a{" "}
              <strong className="text-earth">water butt</strong> needs a gravity-fed drip kit (look for one made for it,
              as ordinary timers need mains pressure) &mdash; and if you&apos;re thinking about a butt anyway, our{" "}
              <Link href="/blog/best-water-butts-uk" className="text-rust underline decoration-rust/30 hover:text-earth">
                water butts guide
              </Link>{" "}
              is the place to start.
            </p>
          </section>

          <WarningBox title="Test it before you trust it">
            Set the whole system up a week before you travel and let it run while you&apos;re still there to watch it. A
            kinked hose, a popped dripper or an optimistic timer setting is a five-minute fix on Tuesday &mdash; and a
            dead patch if you find out from the departure lounge.
          </WarningBox>

          {/* The neighbour deal */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              The neighbour deal (still the best system ever invented)
            </h2>
            <p className="mb-3">
              Every gadget on this page is second-best to a person with a watering can. The trade is as old as gardening
              itself: <em>water it while we&apos;re away, and everything you pick is yours.</em> In courgette season this
              is barely a favour &mdash; you&apos;re doing them a kindness on both ends of the deal.
            </p>
            <p className="mb-3">
              Make it easy for them: pots in one huddle, the can left by the tap, and a note about the two or three things
              that really matter (the tomatoes, the growbags, anything just planted). Nobody waters a stranger&apos;s
              patch as carefully as their own &mdash; unless you&apos;ve made it a two-minute job with free beans at the
              end of it.
            </p>
          </section>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How long can vegetables go without watering?</h3>
                <p className="text-[15px]">Established plants in open ground, well mulched, will shrug off a week of an ordinary British summer. Pots are the worry &mdash; in hot weather a container can dry out in a day. A long weekend needs little more than a deep soak before you go; a fortnight in a heatwave needs a plan for the pots and the thirsty croppers.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What&apos;s the cheapest way to do it?</h3>
                <p className="text-[15px]">Huddle the pots in shade, stand the thirstiest in saucers of water, push a dripper bottle into each big container, and soak and mulch the beds before you leave. A few pounds, all in &mdash; and a kind neighbour beats every gadget on this page.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Do tap timers really work?</h3>
                <p className="text-[15px]">Yes &mdash; a battery tap timer running a soaker hose or drip line is the most reliable hands-off option, and it waters more evenly than most of us do by hand. The one rule: set it up a week early and watch it run before you trust it with the patch.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Should I harvest everything before going away?</h3>
                <p className="text-[15px]">Pick everything that&apos;s ready or nearly ready, even slightly small. It keeps beans, peas and courgettes producing while you&apos;re gone &mdash; and if the picking is heavy, our <Link href="/guides/dealing-with-the-glut" className="text-rust underline decoration-rust/30 hover:text-earth">glut guide</Link> is next door.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/guides/watering" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">The full watering guide &mdash; when, how much, and why</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/blog/best-water-butts-uk" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">The best water butts for UK gardens</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/dealing-with-the-glut" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Home to a mountain of courgettes? The glut guide</span>
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
