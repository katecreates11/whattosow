import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";

export const metadata: Metadata = {
  title: "Preparing Your Allotment for Winter — Putting the Plot to Bed (UK) | What To Sow",
  description:
    "How to put your allotment to bed for winter in the UK: clearing spent crops, mulching beds the no-dig way, protecting bare soil, lifting and storing, and the autumn jobs that pay off all next year.",
  keywords: [
    "preparing allotment for winter",
    "putting the plot to bed",
    "winter allotment jobs",
    "mulching beds for winter",
    "no dig winter",
    "autumn allotment jobs UK",
  ],
  openGraph: {
    title: "Preparing Your Allotment for Winter — Putting the Plot to Bed",
    description:
      "Clearing, mulching, protecting bare soil and storing — the autumn jobs that pay off all next year.",
    type: "article",
    url: "https://whattosow.co.uk/guides/preparing-your-plot-for-winter",
  },
  alternates: { canonical: "/guides/preparing-your-plot-for-winter" },
};

export default function WinterPrepGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Preparing Your Plot for Winter", item: "https://whattosow.co.uk/guides/preparing-your-plot-for-winter" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Preparing Your Allotment for Winter — Putting the Plot to Bed",
    description:
      "Clearing spent crops, mulching beds, protecting bare soil and storing — the autumn jobs that pay off all next year.",
    url: "https://whattosow.co.uk/guides/preparing-your-plot-for-winter",
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
        name: "How do I prepare my allotment for winter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Clear away spent crops and the debris that shelters slugs and disease, then protect the bare soil — the most important job. Spread a thick mulch of compost or well-rotted manure over the beds the no-dig way, or sow a green manure to cover the ground. Lift and store what needs storing, tidy and clean your tools, and leave a few wild corners for wildlife. Done by late autumn, it sets the whole plot up for an easy spring.",
        },
      },
      {
        "@type": "Question",
        name: "Should I dig my allotment over for winter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most growers now don't. The old advice was to dig over and leave the soil rough for frost to break down, but digging damages soil structure and the life within it. The no-dig approach is easier and better: spread a layer of compost on top and let the worms work it in over winter. You get weed-free, crumbly soil by spring with far less effort.",
        },
      },
      {
        "@type": "Question",
        name: "Why shouldn't I leave soil bare over winter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bare winter soil is washed and battered by the rain, which leaches out nutrients, damages the structure and lets weeds colonise. Covering it — with a mulch of compost, a green manure crop, or even cardboard — protects the soil, feeds the life in it, and means you start spring with clean, ready ground.",
        },
      },
      {
        "@type": "Question",
        name: "When should I put my allotment to bed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Through autumn, as each bed is cleared — there's no single date. Tackle it bed by bed from September to November as summer crops finish, aiming to have the plot mulched and protected before the worst of the winter wet arrives. Leave overwintering crops in place and work around them.",
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
            Preparing your plot for winter
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            There&apos;s a lovely, settled feeling to a plot that&apos;s been put to bed properly &mdash; the beds tucked
            under a dark blanket of compost, the tools cleaned and hung up, the last of the harvest in store. And it
            isn&apos;t just tidiness for its own sake: a few hours of work through autumn is the single biggest favour you
            can do your spring self. Look after the soil now, and it looks after you next year.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            There&apos;s no rush and no single deadline &mdash; just work through it bed by bed as the summer crops
            finish, aiming to have it done before the deep winter wet sets in.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Clear */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              1. Clear the spent crops
            </h2>
            <p className="mb-3">
              As each summer crop finishes, pull it and clear the bed. Spent plants, fallen fruit and tangles of weed are
              exactly where slugs, snails and disease spores spend the winter, so getting them off the plot now saves you
              trouble later. Compost everything healthy; bin or burn anything blighted or diseased rather than composting
              it.
            </p>
            <p className="mb-3">
              One exception worth making: when you clear peas and beans, cut the plants off at ground level and{" "}
              <strong className="text-earth">leave the roots in the soil</strong>. The little nodules on them hold
              nitrogen the legumes pulled from the air all summer &mdash; leave it to feed next year&apos;s leafy crops.
            </p>
          </section>

          {/* Feed the soil */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              2. Feed and cover the soil &mdash; the no-dig way
            </h2>
            <p className="mb-3">
              This is the heart of it. Rather than digging the beds over, spread a generous layer &mdash; an inch or two
              &mdash; of{" "}
              <a href="/guides/composting" className="text-rust underline decoration-rust/30 hover:text-earth">garden compost</a>{" "}
              or well-rotted manure straight over the surface, and let the worms do the digging. Over winter they&apos;ll
              pull it down and work it in, leaving you with crumbly, weed-free, ready-to-sow soil by spring &mdash; and
              none of the back-breaking effort of turning it over.
            </p>
            <p className="mb-3">
              Where you haven&apos;t the compost to cover a whole bed, a sheet of cardboard, or a{" "}
              <a href="/guides/green-manures" className="text-rust underline decoration-rust/30 hover:text-earth">green manure</a>{" "}
              sown earlier in autumn, does the same protective job &mdash; anything is better than bare earth.
            </p>
          </section>

          <WarningBox title="Never leave soil bare">
            Bare winter soil is the one real mistake. Months of rain wash the goodness out of it, batter its structure
            into a crust, and hand it straight to the weeds. Whether it&apos;s compost, a green manure or a sheet of
            cardboard, get something over every empty bed before winter sets in. Covered soil is living soil.
          </WarningBox>

          {/* Lift and store */}
          <SectionDivider label="The harvest in" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              3. Lift, cure and store
            </h2>
            <p className="mb-3">
              Get the keepers in before the hard frosts. Maincrop potatoes, squash and pumpkins, and any onions and
              garlic still out want lifting and curing somewhere dry. Squash and pumpkins keep best after a couple of
              weeks hardening their skins in the warmth; onions and garlic want airy, dry storage in nets or ropes.
            </p>
            <p className="mb-3">
              Hardy roots like{" "}
              <a href="/crops/parsnips" className="text-rust underline decoration-rust/30 hover:text-earth">parsnips</a>,
              leeks and winter brassicas are the exception &mdash; leave them right where they are. They&apos;re happiest
              standing in the cold ground, and parsnips are actually sweeter after a frost. Dig them as you need them.
            </p>
          </section>

          {/* Protect what's growing */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              4. Protect what&apos;s still growing
            </h2>
            <p className="mb-3">
              If you&apos;ve sown for winter &mdash; salad, garlic, broad beans, overwintering onions &mdash; give it a
              fighting chance with a little cover as the cold deepens. A length of fleece, a cloche over the salad, a
              cold frame for the tenderest things. Our{" "}
              <a href="/guides/protecting-vegetables-from-frost" className="text-rust underline decoration-rust/30 hover:text-earth">guide to protecting crops from frost</a>{" "}
              walks through what needs what.
            </p>
          </section>

          {/* Tidy up */}
          <SectionDivider label="The finishing touches" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              5. Tidy, mend and put away
            </h2>
            <ul className="space-y-3 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Clean your tools</span> &mdash; scrape off the soil, sharpen
                blades, and wipe metal with an oily rag before they go away. They&apos;ll be ready and rust-free in
                spring. (Worth doing well &mdash; see the tools we&apos;d actually buy in our{" "}
                <a href="/guides/allotment-essentials" className="text-rust underline decoration-rust/30 hover:text-earth">allotment essentials guide</a>.)
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Wash pots and seed trays</span> &mdash; a quiet winter job that
                clears off the pests and diseases lurking on them, ready for sowing season.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Sort your seeds</span> &mdash; check what&apos;s in the tin,
                bin anything years out of date, and make your list for next year. Store them cool and dry.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Empty and clean the{" "}
                <a href="/blog/best-water-butts-uk" className="text-rust underline decoration-rust/30 hover:text-earth">water butt</a></span>, mend the netting, oil the
                shed hinge &mdash; all the little fixes that are so much nicer to do now than in the cold rush of spring.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Leave a wild corner</span> &mdash; a log pile, a patch of seed
                heads, a heap of leaves. Winter shelter for the ladybirds, frogs and hedgehogs that earn their keep all
                summer.
              </li>
            </ul>
          </section>

          <TipBox title="Make a quick plan while it's fresh">
            Before the year blurs, jot down what did well, what didn&apos;t, and what you&apos;d move &mdash; while you
            can still picture the beds. It&apos;s the perfect moment to sketch next year&apos;s{" "}
            <a href="/guides/crop-rotation" className="text-rust underline decoration-rust/30 hover:text-earth">crop rotation</a>{" "}
            and order seeds before the popular varieties sell out in the new-year rush.
          </TipBox>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">How do I prepare my allotment for winter?</h3>
                <p className="text-[15px]">Clear spent crops and debris, then protect the bare soil — the key job. Spread a thick mulch of compost or manure the no-dig way, or sow a green manure. Lift and store the keepers, clean your tools and trays, sort your seeds, and leave a wild corner for wildlife.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Should I dig my allotment over for winter?</h3>
                <p className="text-[15px]">Most growers no longer do. Digging damages soil structure and the life in it. The no-dig way is easier and better — spread compost on top and let the worms work it in, and you get crumbly, weed-free soil by spring with far less effort.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Why shouldn&apos;t I leave soil bare over winter?</h3>
                <p className="text-[15px]">Bare soil is washed and battered by winter rain, which leaches nutrients, wrecks the structure and lets weeds in. Covering it with compost, a green manure or cardboard protects the soil, feeds its life, and gives you clean, ready ground in spring.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">When should I put my allotment to bed?</h3>
                <p className="text-[15px]">Through autumn, bed by bed as crops finish — there&apos;s no single date. Work from September to November as summer crops clear, aiming to have everything mulched and covered before the worst of the winter wet. Leave overwintering crops in place.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <a href="/guides/green-manures" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Green manures &amp; cover crops</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/composting" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Composting for allotments</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/protecting-vegetables-from-frost" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Protecting crops from frost</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a href="/guides/autumn-winter-vegetables" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What to sow in autumn &amp; winter</span>
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
