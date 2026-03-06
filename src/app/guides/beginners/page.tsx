import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TipBox, WarningBox, StepList, GuideHero, PullQuote, SectionDivider, FullBleedSection, GuideImage } from "@/components/GuideVisuals";

export const metadata: Metadata = {
  title:
    "Allotment for Beginners — What to Grow First | What To Sow",
  description:
    "Just got an allotment? Here are the easiest vegetables to grow, what to do first, and how to plan your first year. A no-nonsense UK guide.",
  keywords: [
    "allotment for beginners",
    "what to grow on an allotment",
    "easiest vegetables to grow UK",
    "first year allotment",
    "new allotment what to do first",
    "beginner vegetable garden UK",
    "allotment tips for beginners",
  ],
  openGraph: {
    title: "Allotment for Beginners — What to Grow First",
    description:
      "Just got an allotment? The easiest crops to start with and a plan for your first year.",
    type: "article",
    url: "https://whattosow.co.uk/guides/beginners",
  },
  alternates: {
    canonical: "/guides/beginners",
  },
};

export default function BeginnersGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://whattosow.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: "https://whattosow.co.uk/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Beginners",
        item: "https://whattosow.co.uk/guides/beginners",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What should I grow first on a new allotment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with easy, fast-growing crops: radishes (ready in 4 weeks), lettuce, courgettes, runner beans, and potatoes. These are forgiving, grow quickly, and give you visible results to keep you motivated.",
        },
      },
      {
        "@type": "Question",
        name: "When should I start planting on my allotment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on where you are in the UK. Hardy crops like broad beans, peas, and onion sets can go out from February/March. Tender crops like tomatoes and courgettes must wait until after your last frost date, typically late April to early June depending on your location.",
        },
      },
      {
        "@type": "Question",
        name: "How big should my first allotment bed be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with a small area you can manage — even a quarter plot (about 62 square metres). It's better to have a small, well-tended space than a large one full of weeds. You can always expand in your second year.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header backLink={{ href: "/guides", label: "\u2190 Guides" }} />
      <main id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <GuideHero
          eyebrow="Growing guide"
          title="Allotment for beginners"
          subtitle="You've got the keys. The plot is a mess. Everyone on the site seems to know what they're doing. Deep breath. Here's how to start."
          color="allotment"
        />

        <div className="space-y-10 text-earth-light leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Don&apos;t try to do everything at once
            </h2>
            <p>
              The single biggest mistake new allotment holders make is clearing
              the whole plot in the first month, planting everything they can
              think of, and burning out by July. Don&apos;t do this.
            </p>
            <p className="mt-3">
              Start small. Clear one bed &mdash; maybe two. Grow a handful of
              things well. Get some food on the table. Expand next year when
              you know the soil, the sun, and the slugs.
            </p>
            <WarningBox title="The #1 mistake">
              Clearing the whole plot, planting 20 different crops, and burning out by July.
              Start with one bed and five crops. You can always expand next year.
            </WarningBox>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              The 5 easiest crops to start with
            </h2>
            <p className="mb-4">
              These are forgiving, fast, and satisfying. They&apos;ll give you
              results even if you get things slightly wrong.
            </p>
            <ol className="space-y-4 list-none">
              <li className="pl-6 border-l-2 border-allotment/20">
                <a href="/crops/radishes" className="font-semibold text-earth hover:text-allotment">
                  1. Radishes
                </a>
                <p className="text-sm mt-1">
                  Ready in 4 weeks. Sow directly, thin to 3cm apart, harvest.
                  The instant gratification crop. Sow a short row every
                  fortnight and you&apos;ll never run out.
                </p>
              </li>
              <li className="pl-6 border-l-2 border-allotment/20">
                <a href="/crops/lettuce" className="font-semibold text-earth hover:text-allotment">
                  2. Lettuce
                </a>
                <p className="text-sm mt-1">
                  Pick outer leaves and it keeps growing. Sow from March to
                  August for months of salad. Partial shade is fine &mdash; it
                  actually prefers it in summer.
                </p>
              </li>
              <li className="pl-6 border-l-2 border-allotment/20">
                <a href="/crops/courgette" className="font-semibold text-earth hover:text-allotment">
                  3. Courgettes
                </a>
                <p className="text-sm mt-1">
                  One plant produces more courgettes than you can eat. Sow
                  indoors in April, plant out after frost. The problem
                  isn&apos;t growing them &mdash; it&apos;s keeping up with
                  them.
                </p>
              </li>
              <li className="pl-6 border-l-2 border-allotment/20">
                <a href="/crops/runner-beans" className="font-semibold text-earth hover:text-allotment">
                  4. Runner beans
                </a>
                <p className="text-sm mt-1">
                  Spectacular plants &mdash; tall, lush, covered in flowers.
                  Sow after frost, give them a wigwam of canes, and pick every
                  few days. They stop producing if you let the pods get big.
                </p>
              </li>
              <li className="pl-6 border-l-2 border-allotment/20">
                <a href="/crops/potato" className="font-semibold text-earth hover:text-allotment">
                  5. Potatoes
                </a>
                <p className="text-sm mt-1">
                  Nothing beats digging up your own potatoes. Plant in March or
                  April, earth them up as they grow, harvest from June. First
                  earlies are the quickest &mdash; 10&ndash;12 weeks from
                  planting.
                </p>
              </li>
            </ol>
          </section>

          <PullQuote>
            Start small. Get some food on the table. Expand next year when you know the soil, the sun, and the slugs.
          </PullQuote>

          <GuideImage
            src="/images/guides/mulch.webp"
            alt="Inside a polytunnel with tomatoes and leafy vegetables growing"
            caption="You don't need a polytunnel to start — but it helps extend the season."
          />

          <SectionDivider label="Planning" />

          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Know your frost date
            </h2>
            <p>
              Half of knowing when to plant is knowing when frost stops. Every
              seed packet says &ldquo;sow after last frost&rdquo; &mdash; but
              when is that, exactly, for where you are?
            </p>
            <p className="mt-3">
              <a
                href="/"
                className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
              >
                Enter your postcode
              </a>{" "}
              and we&apos;ll tell you. A grower in Bristol might be frost-free
              by mid-April. In Sheffield, it could be early May. In the
              Scottish Highlands, late May or even June.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              What to do in your first month
            </h2>
            <StepList steps={[
              {
                title: "Walk the plot",
                description: "Notice where the sun falls, where water pools, which areas have the best soil. Talk to your neighbours \u2014 they know the site."
              },
              {
                title: "Clear one bed",
                description: "Remove weeds, fork the soil, add compost if you have it. One well-prepared bed is all you need to start."
              },
              {
                title: "Sow something today",
                description: "Even if it\u2019s just radishes in a pot. The sooner you start, the sooner you learn."
              },
              {
                title: "Check what to sow this week",
                description: "Enter your postcode at whattosow.co.uk for a personalised list based on your location and the time of year."
              },
            ]} />
          </section>

          <FullBleedSection color="allotment">
            <h2 className="text-xl font-semibold text-white mb-3">
              Don&apos;t spend a fortune
            </h2>
            <p className="text-white/80">
              You don&apos;t need a greenhouse, a raised bed system, or an
              irrigation setup. You need a fork, a trowel, some seeds, and
              water. Everything else is nice to have, not need to have.
            </p>
            <p className="mt-3 text-white/80">
              Seeds are cheap. A packet of lettuce seeds costs about &pound;2
              and contains enough for an entire season. A bag of seed potatoes
              is under &pound;4.
            </p>
            <div className="mt-6 bg-white/10 border-l-4 border-leaf-light p-5">
              <span className="text-sm font-bold text-leaf-light block mb-1.5">Starter kit (under &pound;20)</span>
              <p className="text-sm text-white/80">
                Fork, trowel, watering can, 5 packets of seeds, labels, string.
                That&apos;s genuinely all you need for your first season. Everything
                else can wait.
              </p>
            </div>
          </FullBleedSection>

          {/* FAQ — visible version */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-xl font-semibold text-earth mb-6">
              Common questions
            </h2>
            <div className="space-y-6">
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  What should I grow first on a new allotment?
                </h3>
                <p className="text-sm">
                  Start with easy, fast-growing crops: radishes (ready in 4
                  weeks), lettuce, courgettes, runner beans, and potatoes. These
                  are forgiving, grow quickly, and give you visible results to
                  keep you motivated.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  When should I start planting on my allotment?
                </h3>
                <p className="text-sm">
                  It depends on where you are in the UK. Hardy crops like broad
                  beans, peas, and onion sets can go out from February/March.
                  Tender crops like tomatoes and courgettes must wait until
                  after your last frost date, typically late April to early June
                  depending on your location.{" "}
                  <a href="/" className="text-allotment hover:text-allotment-dark underline decoration-allotment/30">
                    Check your frost date.
                  </a>
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  How big should my first allotment bed be?
                </h3>
                <p className="text-sm">
                  Start with a small area you can manage &mdash; even a quarter
                  plot (about 62 square metres). It&apos;s better to have a
                  small, well-tended space than a large one full of weeds. You
                  can always expand in your second year.
                </p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-xl font-semibold text-earth mb-4">
              Next steps
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="/"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  What to sow this week &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Personalised to your postcode.
                </p>
              </a>
              <a
                href="/guides/seed-starting"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Starting from seed &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Compost, temperature, light &mdash; the full guide.
                </p>
              </a>
              <a
                href="/guides/soil"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Understanding your soil &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Clay, sand, or loam &mdash; and how to improve it.
                </p>
              </a>
              <a
                href="/guides/companion-planting"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Companion planting &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  What to plant together and what to keep apart.
                </p>
              </a>
              <a
                href="/guides/crop-rotation"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Crop rotation &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  The 4-year system that prevents disease and builds soil.
                </p>
              </a>
              <a
                href="/calendar"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Full sowing calendar &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  40 crops across 12 months.
                </p>
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
