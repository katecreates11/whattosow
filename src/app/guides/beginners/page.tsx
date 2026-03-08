import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TipBox, WarningBox, StepList, GuideHero, PullQuote, SectionDivider, FullBleedSection, GuideImage, ColorSection } from "@/components/GuideVisuals";

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
      <main id="main-content">
        <GuideHero
          eyebrow="Growing guide"
          title="Allotment for beginners"
          subtitle="You've got the keys. The plot is a mess. Everyone on the site seems to know what they're doing. Deep breath. Here's how to start."
          color="allotment"
        />

        <div className="text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Don&apos;t try to do everything at once
            </h2>
            <p className="text-[15px]">
              The single biggest mistake new allotment holders make is clearing
              the whole plot in the first month, planting everything they can
              think of, and burning out by July. Don&apos;t do this.
            </p>
            <p className="mt-4 text-[15px]">
              Start small. Clear one bed &mdash; maybe two. Grow a handful of
              things well. Get some food on the table. Expand next year when
              you know the soil, the sun, and the slugs.
            </p>
            <WarningBox title="The #1 mistake">
              Clearing the whole plot, planting 20 different crops, and burning out by July.
              Start with one bed and five crops. You can always expand next year.
            </WarningBox>
          </section>

          <SectionDivider label="The crops" />

          <ColorSection color="ochre">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-2 tracking-tight">
              The 5 easiest crops to start with
            </h2>
            <p className="mb-8 text-[15px]">
              These are forgiving, fast, and satisfying. They&apos;ll give you
              results even if you get things slightly wrong.
            </p>
            <ol className="space-y-8 list-none">
              <li className="flex gap-5">
                <span className="text-3xl font-serif text-rust/30 leading-none shrink-0 w-8 pt-1">1</span>
                <div>
                  <a href="/crops/radishes" className="text-lg font-serif text-earth hover:text-rust transition-colors">
                    Radishes
                  </a>
                  <p className="text-sm mt-1.5">
                    Ready in 4 weeks. Sow directly, thin to 3cm apart, harvest.
                    The instant gratification crop. Sow a short row every
                    fortnight and you&apos;ll never run out.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="text-3xl font-serif text-rust/30 leading-none shrink-0 w-8 pt-1">2</span>
                <div>
                  <a href="/crops/lettuce" className="text-lg font-serif text-earth hover:text-rust transition-colors">
                    Lettuce
                  </a>
                  <p className="text-sm mt-1.5">
                    Pick outer leaves and it keeps growing. Sow from March to
                    August for months of salad. Partial shade is fine &mdash; it
                    actually prefers it in summer.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="text-3xl font-serif text-rust/30 leading-none shrink-0 w-8 pt-1">3</span>
                <div>
                  <a href="/crops/courgette" className="text-lg font-serif text-earth hover:text-rust transition-colors">
                    Courgettes
                  </a>
                  <p className="text-sm mt-1.5">
                    One plant produces more courgettes than you can eat. Sow
                    indoors in April, plant out after frost. The problem
                    isn&apos;t growing them &mdash; it&apos;s keeping up with
                    them.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="text-3xl font-serif text-rust/30 leading-none shrink-0 w-8 pt-1">4</span>
                <div>
                  <a href="/crops/runner-beans" className="text-lg font-serif text-earth hover:text-rust transition-colors">
                    Runner beans
                  </a>
                  <p className="text-sm mt-1.5">
                    Spectacular plants &mdash; tall, lush, covered in flowers.
                    Sow after frost, give them a wigwam of canes, and pick every
                    few days. They stop producing if you let the pods get big.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="text-3xl font-serif text-rust/30 leading-none shrink-0 w-8 pt-1">5</span>
                <div>
                  <a href="/crops/potato" className="text-lg font-serif text-earth hover:text-rust transition-colors">
                    Potatoes
                  </a>
                  <p className="text-sm mt-1.5">
                    Nothing beats digging up your own potatoes. Plant in March or
                    April, earth them up as they grow, harvest from June. First
                    earlies are the quickest &mdash; 10&ndash;12 weeks from
                    planting.
                  </p>
                </div>
              </li>
            </ol>
          </ColorSection>

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
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Know your frost date
            </h2>
            <p className="text-[15px]">
              Half of knowing when to plant is knowing when frost stops. Every
              seed packet says &ldquo;sow after last frost&rdquo; &mdash; but
              when is that, exactly, for where you are?
            </p>
            <p className="mt-4 text-[15px]">
              <a
                href="/"
                className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
              >
                Enter your postcode
              </a>{" "}
              and we&apos;ll tell you. A grower in Bristol might be frost-free
              by mid-April. In Sheffield, it could be early May. In the
              Scottish Highlands, late May or even June.
            </p>
          </section>

          <ColorSection color="sage" className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
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
          </ColorSection>

          <FullBleedSection color="allotment">
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4 tracking-tight">
              Don&apos;t spend a fortune
            </h2>
            <p className="text-white/70 text-[15px]">
              You don&apos;t need a greenhouse, a raised bed system, or an
              irrigation setup. You need a fork, a trowel, some seeds, and
              water. Everything else is nice to have, not need to have.
            </p>
            <p className="mt-4 text-white/70 text-[15px]">
              Seeds are cheap. A packet of lettuce seeds costs about &pound;2
              and contains enough for an entire season. A bag of seed potatoes
              is under &pound;4.
            </p>
            <div className="mt-6 pl-5 sm:pl-6 border-l-2 border-leaf-light">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-leaf-light block mb-2">Starter kit — under £20</span>
              <div className="text-[15px] text-white/80 leading-relaxed">
                Fork, trowel, watering can, 5 packets of seeds, labels, string.
                That&apos;s genuinely all you need for your first season. Everything
                else can wait.
              </div>
            </div>
          </FullBleedSection>

          {/* FAQ */}
          <ColorSection color="sky" className="mt-14">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-8 tracking-tight">
              Common questions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-lg text-earth mb-2">
                  What should I grow first on a new allotment?
                </h3>
                <p className="text-sm">
                  Start with easy, fast-growing crops: radishes (ready in 4
                  weeks), lettuce, courgettes, runner beans, and potatoes. These
                  are forgiving, grow quickly, and give you visible results to
                  keep you motivated.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-2">
                  When should I start planting on my allotment?
                </h3>
                <p className="text-sm">
                  It depends on where you are in the UK. Hardy crops like broad
                  beans, peas, and onion sets can go out from February/March.
                  Tender crops like tomatoes and courgettes must wait until
                  after your last frost date, typically late April to early June
                  depending on your location.{" "}
                  <a href="/" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">
                    Check your frost date.
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-2">
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
          </ColorSection>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div className="space-y-0">
              <a
                href="/"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    What to sow this week
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    Personalised to your postcode.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/guides/seed-starting"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Starting from seed
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    Compost, temperature, light &mdash; the full guide.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/guides/soil"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Understanding your soil
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    Clay, sand, or loam &mdash; and how to improve it.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/guides/companion-planting"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Companion planting
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    What to plant together and what to keep apart.
                  </p>
                </div>
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
