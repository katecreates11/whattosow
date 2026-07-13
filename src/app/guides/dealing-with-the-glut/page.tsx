import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionDivider, TipBox } from "@/components/GuideVisuals";
import AffiliateLink from "@/components/AffiliateLink";

const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}`;

export const metadata: Metadata = {
  title: "Dealing With the Glut — What to Do With Too Many Courgettes, Beans & Tomatoes | What To Sow",
  description:
    "Too many courgettes? A wall of runner beans? How to keep, freeze, preserve and share the summer glut — what stores well, what doesn't, and how to enjoy the most abundant weeks of the growing year.",
  keywords: [
    "what to do with a glut of courgettes",
    "too many courgettes",
    "glut of runner beans",
    "what to do with too many tomatoes",
    "freezing vegetables from the garden",
    "preserving vegetable glut",
  ],
  openGraph: {
    title: "Dealing With the Glut",
    description:
      "Too many courgettes? A wall of beans? How to keep, freeze, preserve and share the summer glut — and enjoy the most abundant weeks of the year.",
    type: "article",
    url: "https://whattosow.co.uk/guides/dealing-with-the-glut",
  },
  alternates: { canonical: "/guides/dealing-with-the-glut" },
};

export default function GlutGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Dealing With the Glut", item: "https://whattosow.co.uk/guides/dealing-with-the-glut" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Dealing With the Glut",
    description:
      "What to do with too many courgettes, beans and tomatoes: what stores, what freezes, what to preserve and what to give away.",
    url: "https://whattosow.co.uk/guides/dealing-with-the-glut",
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
        name: "What can I do with a glut of courgettes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pick them small and often — they're better at 15cm than 40cm and picking keeps the plant producing. Grate and freeze them in bags for winter soups and fritters, roast them into pasta sauces, make chutney with the ones that got away, and give the rest to neighbours. One healthy plant feeds a family; nobody needs six.",
        },
      },
      {
        "@type": "Question",
        name: "Can I freeze runner beans and French beans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — top, tail and slice them, blanch for two minutes in boiling water, plunge into cold water, drain well and freeze flat on a tray before bagging. They keep their colour and bite for the best part of a year, and a bag of your own beans in January is a small act of time travel.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do with too many tomatoes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Whole cherry tomatoes freeze perfectly with no preparation at all — straight into a bag, and they drop into winter sauces like ice cubes. Bigger ones become roasted passata: halve, roast with garlic and olive oil, blitz, freeze. Green ones at the season's end make the classic chutney.",
        },
      },
      {
        "@type": "Question",
        name: "How do I stop getting a glut next year?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Succession sowing — sowing small batches every few weeks instead of everything at once — turns a glut-and-famine year into a steady supply. For the crops that glut from a single plant, like courgettes, the answer is simpler: grow fewer plants than you think you need.",
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
            Dealing with the glut: too much of a good thing
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            Somewhere in late July it happens. The courgette plant you were worried about in May becomes a factory. The
            runner beans go from &ldquo;nearly ready&rdquo; to a wall of green overnight, and the kitchen table
            disappears under tomatoes. This is the glut &mdash; the most abundant fortnight of the growing year, and the
            happiest problem you&apos;ll ever have.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            The trick is to stop treating it as a race to eat everything, and start treating it as the year&apos;s one
            chance to fill the freezer, the shelf and your neighbours&apos; arms. Here&apos;s what keeps, what
            doesn&apos;t, and what to do with all of it.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* First rule */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              First rule: keep picking anyway
            </h2>
            <p className="mb-3">
              It feels wrong to pick beans you can&apos;t eat, but the moment a plant ripens seed it starts winding down.
              Pick everything as it comes ready &mdash; small and often &mdash; and{" "}
              <Link href="/crops/courgettes" className="text-rust underline decoration-rust/30 hover:text-earth">courgettes</Link>,{" "}
              <Link href="/crops/runner-beans" className="text-rust underline decoration-rust/30 hover:text-earth">runner beans</Link> and{" "}
              <Link href="/crops/french-beans" className="text-rust underline decoration-rust/30 hover:text-earth">French beans</Link>{" "}
              will keep producing for weeks longer. Stop picking, and they stop too. A good{" "}
              <AffiliateLink
                href={az("garden trug wooden harvest basket")}
                product="harvest trug"
                merchant="amazon-uk"
                position="glut-harvest-trug"
                className="font-serif italic text-rust border-b border-rust/30 pb-0.5 hover:text-earth transition-colors"
              >
                Compare harvest trugs
              </AffiliateLink>{" "}
              by the back door makes the little-and-often habit a pleasure rather than a chore.
            </p>
            <figure className="mt-6 max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/photos/blog/courgettes-first-pick-hand.webp"
                  alt="Two courgettes picked small, flowers still attached, held up over the allotment"
                  fill
                  sizes="(max-width: 640px) 100vw, 384px"
                  className="object-cover img-grade"
                />
              </div>
              <figcaption className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth-lighter mt-2">
                july · picked small, flowers still on — how to keep them coming
              </figcaption>
            </figure>
          </section>

          {/* What keeps */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              What keeps, and for how long
            </h2>
            <ul className="space-y-3 mb-3">
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Days on the side:</strong> tomatoes (never the fridge &mdash; it flattens
                the flavour), courgettes, cucumbers, beans. Eat-first pile.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Weeks in a cool spot:</strong> onions and garlic once the tops die down,
                beetroot, carrots in damp sand, the first winter squash as summer turns.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <strong className="text-earth">Months in the freezer:</strong> beans (blanched), grated courgette, whole
                cherry tomatoes, roasted passata, podded peas and broad beans, soft fruit on trays.
              </li>
            </ul>
          </section>

          <TipBox title="The two-minute freezer rule">
            Blanch beans and greens &mdash; two minutes in boiling water, straight into cold &mdash; before freezing, and
            they keep their colour and bite for the best part of a year. Cherry tomatoes are even easier: whole, raw,
            straight into a bag. They drop into January sauces like ice cubes, and taste of July.
          </TipBox>

          {/* Crop by crop */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              The big three, crop by crop
            </h2>
            <p className="mb-3">
              <strong className="text-earth">Courgettes.</strong> Better at 15cm than 40cm &mdash; catch them small.
              Grate and freeze in meal-sized bags (soups, fritters, cakes); roast the bigger ones into pasta sauce. The
              one that hid under a leaf and became a marrow? Stuff it, or let it star in chutney. And next year: two
              plants. Honestly.
            </p>
            <p className="mb-3">
              <strong className="text-earth">Beans.</strong> Runner and French beans freeze beautifully (blanch first) and
              pickle surprisingly well. Leave a few pods of French beans to fatten at the season&apos;s end and you get
              free <Link href="/guides/seed-starting" className="text-rust underline decoration-rust/30 hover:text-earth">seed for next spring</Link>{" "}
              &mdash; the glut paying for next year.
            </p>
            <p className="mb-3">
              <strong className="text-earth">Tomatoes.</strong> Cherry ones freeze whole; big ones become roasted passata
              &mdash; halve, roast with garlic and oil, blitz, freeze flat in bags. If you&apos;re into preserving proper,
              a{" "}
              <AffiliateLink
                href={az("maslin pan preserving jam")}
                product="maslin pan"
                merchant="amazon-uk"
                position="glut-maslin-pan"
                className="font-serif italic text-rust border-b border-rust/30 pb-0.5 hover:text-earth transition-colors"
              >
                Compare maslin pans
              </AffiliateLink>{" "}
              turns a table of tomatoes into a shelf of chutney in an afternoon &mdash; and the green ones at
              season&apos;s end make the best chutney of all.
            </p>
          </section>

          {/* Give it away */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Give it away (this is the good bit)
            </h2>
            <p className="mb-3">
              A basket of just-picked veg is the best gift most people get all year. Neighbours, the school gate, the
              office kitchen, the food bank &mdash; gluts are how veg growers make friends. If you&apos;re ever away when
              the wave breaks, the{" "}
              <Link href="/guides/watering-while-away" className="text-rust underline decoration-rust/30 hover:text-earth">
                neighbour-waters-and-keeps-the-pickings deal
              </Link>{" "}
              solves two problems at once.
            </p>
          </section>

          {/* Next year */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              And for next year: a gentler wave
            </h2>
            <p className="mb-3">
              A glut is really a scheduling problem, planned in April and discovered in July.{" "}
              <Link href="/guides/succession-sowing" className="text-rust underline decoration-rust/30 hover:text-earth">
                Succession sowing
              </Link>{" "}
              &mdash; little and often &mdash; spreads the quick crops into a steady trickle, and the{" "}
              <Link href="/harvest-planner" className="text-rust underline decoration-rust/30 hover:text-earth">
                harvest planner
              </Link>{" "}
              shows you when everything you&apos;ve sown will land, so you can see the wave coming while there&apos;s
              still time to stagger it.
            </p>
          </section>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What can I do with a glut of courgettes?</h3>
                <p className="text-[15px]">Pick them small and keep picking &mdash; it keeps the plant going. Grate and freeze for winter soups and fritters, roast into sauces, chutney the escapees, and give the rest away. One healthy plant feeds a family.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Can I freeze runner beans?</h3>
                <p className="text-[15px]">Yes. Top, tail and slice, blanch for two minutes, cool quickly, and freeze flat on a tray before bagging. They keep their colour and bite for months &mdash; your own beans in January.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What should I do with too many tomatoes?</h3>
                <p className="text-[15px]">Cherry tomatoes freeze whole with no prep at all. Bigger ones become roasted passata for the freezer, and the green stragglers at season&apos;s end make the classic chutney.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do I avoid a glut next year?</h3>
                <p className="text-[15px]">Sow little and often instead of all at once &mdash; our <Link href="/guides/succession-sowing" className="text-rust underline decoration-rust/30 hover:text-earth">succession sowing guide</Link> is the cure. For one-plant gluts like courgettes, simply grow fewer plants than you think you need.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/guides/succession-sowing" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Succession sowing &mdash; the glut cure</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/harvest-planner" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">See when your harvests will land</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/watering-while-away" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Going away? Keep it all watered</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/harvest" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What&apos;s ready to harvest now</span>
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
