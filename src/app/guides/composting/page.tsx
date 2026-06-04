import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  GuideHero,
  PullQuote,
  SectionDivider,
  TipBox,
  WarningBox,
  ColorSection,
  BigNumber,
  InThisGuide,
} from "@/components/GuideVisuals";
import GearPick, { GearCategory, AffiliateDisclosure, TopPicksGrid } from "@/components/GearPick";

export const metadata: Metadata = {
  title: "Composting for Allotments UK — What You Need to Get Started | What To Sow",
  description:
    "How to start composting on your allotment or in your garden. Cold bins, hot bins, wormeries, and bokashi — which method suits you, what to buy, and what to put in.",
  keywords: [
    "composting for allotments",
    "best compost bin UK",
    "how to start composting UK",
    "hot compost bin UK",
    "wormery UK",
    "bokashi bin UK",
    "allotment compost",
    "HOTBIN composter",
    "compost bin for beginners",
  ],
  openGraph: {
    title: "Composting for Allotments — What You Actually Need",
    description:
      "The honest guide to composting on your plot. Which method works, which bins are worth it, and how to make compost that your soil will thank you for.",
    type: "article",
    url: "https://whattosow.co.uk/guides/composting",
  },
  alternates: {
    canonical: "/guides/composting",
  },
};

export default function CompostingGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Composting", item: "https://whattosow.co.uk/guides/composting" },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best compost bins UK",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Blackwall Compost Converter 330L",
          description: "BBC Gardeners' World Best Budget Buy. Tidy black cone, removable lid, made from recycled UK plastic with a 5-year guarantee. Check if your council offers subsidised bins.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "70",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B0030ZJZMQ?tag=whattosow21-21",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "HOTBIN 200L",
          description: "Insulated hot composting bin that maintains 40-60°C internally. Finished compost in 30-90 days, even in winter. Can handle cooked food and small bones.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "255",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B008JDTXYY?tag=whattosow21-21",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "Wiggly Wigglers Urbalive Wormery",
          description: "Worm-powered composting from the UK's specialist wormery company. Stackable tray system, produces liquid feed and rich vermicompost. Comes with worm voucher.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "175",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B0DLB9TW96?tag=whattosow21-21",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Product",
          name: "Compost Thermometer Long Probe",
          description: "50cm probe thermometer for monitoring internal heap temperature. Essential for hot composting (aiming for 40-60°C), useful for cold composting too.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "10",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/s?tag=whattosow21-21&k=compost+thermometer+long+probe",
          },
        },
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best compost bin for an allotment UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For most allotment holders, a simple open bay made from pallets is the best option — it's free, big enough, and easy to turn. If you want a ready-made bin, the Blackwall Compost Converter (330L) is the BBC Gardeners' World Best Budget Buy. For faster results, a HOTBIN produces compost in 30-90 days but costs around £255.",
        },
      },
      {
        "@type": "Question",
        name: "How long does compost take to make?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In a cold compost bin: 6-12 months. In a hot compost system (HOTBIN or well-managed heap): 30-90 days. In a wormery: 3-6 months for the first harvest. The key factors are the balance of green to brown materials, moisture, and aeration.",
        },
      },
      {
        "@type": "Question",
        name: "Can I compost on an allotment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — most allotment sites actively encourage it. Some provide free bins through council schemes. Check your site rules about compost bin placement and whether you're allowed open heaps. Having compost on-site saves money on bought compost and means you're not carting bags back and forth.",
        },
      },
      {
        "@type": "Question",
        name: "What can I put in a compost bin?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Greens (nitrogen-rich): vegetable peelings, grass clippings, annual weeds, coffee grounds, crop waste. Browns (carbon-rich): cardboard, straw, dry leaves, shredded paper, woody prunings. Aim for roughly 2 parts brown to 1 part green. Never add: cooked food, meat, dairy, perennial weed roots, diseased plants, or pet waste.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Header backLink={{ href: "/guides", label: "\u2190 Guides" }} />
      <main id="main-content">
        <GuideHero
          eyebrow="Equipment guide"
          title="Composting for allotments"
          subtitle="Free soil food, less waste, better crops. Here's how to start and what you actually need."
          image="/images/guides/mulch.webp"
          color="amber"
        />

        <div className="space-y-0 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          <section>
            <div className="space-y-3">
              <p>
                Composting is the single best thing you can do for your allotment.
                It turns kitchen scraps and garden waste into dark, crumbly soil food
                that your plants will love. It saves you money on bought compost,
                reduces what goes to landfill, and improves your soil year after year.
              </p>
              <p>
                The question isn&apos;t whether to compost &mdash; it&apos;s which
                method suits the way you garden. Here&apos;s the honest breakdown.
              </p>
            </div>
          </section>

          {/* ─── TOP PICKS HERO ─── */}
          <ColorSection color="sage">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-allotment block mb-3">
              Quick picks by budget
            </span>
            <TopPicksGrid
              picks={[
                { name: "Pallet bay (free)", why: "The allotment classic. 3 pallets, some screws, done. Biggest capacity, easiest to turn.", price: "Free", amazonUrl: "https://www.amazon.co.uk/s?tag=whattosow21-21&k=compost+bin+screws+galvanised" },
                { name: "Blackwall Converter", why: "BBC Best Budget Buy. Tidy, rodent-resistant, 330L. The easy option.", price: "~£70", amazonUrl: "https://www.amazon.co.uk/dp/B0030ZJZMQ?tag=whattosow21-21" },
                { name: "HOTBIN 200L", why: "Hot composting — finished compost in 30-90 days, even in winter.", price: "~£255", amazonUrl: "https://www.amazon.co.uk/dp/B008JDTXYY?tag=whattosow21-21" },
                { name: "Wiggly Wigglers Wormery", why: "Worm-powered composting. Produces liquid feed AND compost. Great for small spaces.", price: "~£175", amazonUrl: "https://www.amazon.co.uk/dp/B0DLB9TW96?tag=whattosow21-21" },
              ]}
            />
          </ColorSection>

          <InThisGuide
            items={[
              { label: "Which method?", anchor: "which-method" },
              { label: "Cold composting", anchor: "cold-composting" },
              { label: "Hot composting", anchor: "hot-composting" },
              { label: "Wormeries", anchor: "wormeries" },
              { label: "Bokashi", anchor: "bokashi" },
              { label: "Accessories", anchor: "accessories" },
              { label: "What to compost", anchor: "what-to-compost" },
            ]}
          />

          <AffiliateDisclosure />

          {/* ─── WHICH METHOD ─── */}
          <GearCategory title="Which method?" number={1}>
            <section id="which-method">
              <div className="space-y-3 text-sm text-earth-light leading-relaxed max-w-2xl mb-6">
                <p>
                  There are four main ways to compost. Most allotment holders end up with
                  a{" "}
                  <a href="/blog/best-compost-bins-uk" className="text-rust underline decoration-rust/30 hover:text-earth">cold bin</a>{" "}
                  or pallet bay &mdash; it&apos;s simple, cheap, and works.
                  But if you want compost faster, or you&apos;re short on space, the
                  other methods are worth knowing about.
                </p>
              </div>
              <div className="border border-earth/10 overflow-hidden mb-6">
                <table className="w-full text-xs text-earth">
                  <thead>
                    <tr className="bg-earth/5">
                      <th className="text-left px-3 py-2.5 font-bold tracking-wide uppercase text-[9px]">Method</th>
                      <th className="text-left px-3 py-2.5 font-bold tracking-wide uppercase text-[9px]">Time</th>
                      <th className="text-left px-3 py-2.5 font-bold tracking-wide uppercase text-[9px]">Cost</th>
                      <th className="text-left px-3 py-2.5 font-bold tracking-wide uppercase text-[9px]">Effort</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-earth/8">
                      <td className="px-3 py-2.5 font-semibold">Cold bin / bay</td>
                      <td className="px-3 py-2.5">6&ndash;12 months</td>
                      <td className="px-3 py-2.5">Free&ndash;&pound;70</td>
                      <td className="px-3 py-2.5">Low</td>
                    </tr>
                    <tr className="border-t border-earth/8">
                      <td className="px-3 py-2.5 font-semibold">Hot bin</td>
                      <td className="px-3 py-2.5">30&ndash;90 days</td>
                      <td className="px-3 py-2.5">~&pound;255</td>
                      <td className="px-3 py-2.5">Medium</td>
                    </tr>
                    <tr className="border-t border-earth/8">
                      <td className="px-3 py-2.5 font-semibold">Wormery</td>
                      <td className="px-3 py-2.5">3&ndash;6 months</td>
                      <td className="px-3 py-2.5">~&pound;175</td>
                      <td className="px-3 py-2.5">Low</td>
                    </tr>
                    <tr className="border-t border-earth/8">
                      <td className="px-3 py-2.5 font-semibold">Bokashi</td>
                      <td className="px-3 py-2.5">2&ndash;4 weeks*</td>
                      <td className="px-3 py-2.5">~&pound;40</td>
                      <td className="px-3 py-2.5">Low</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-earth-lighter">
                * Bokashi ferments waste in 2&ndash;4 weeks but you still need to bury it or add it to a compost bin to finish.
              </p>
            </section>
          </GearCategory>

          <PullQuote>
            The best compost system is the one you&apos;ll actually use.
            A pallet bay you fill every week beats a fancy bin that sits empty.
          </PullQuote>

          {/* ─── COLD COMPOSTING ─── */}
          <GearCategory title="Cold composting" number={2}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                The simplest method. Pile stuff up, wait, and eventually it rots down
                into compost. &ldquo;Cold&rdquo; doesn&apos;t mean the bin is cold &mdash;
                it means you&apos;re not actively managing the temperature. Most allotment
                holders use this method because it works and requires almost no effort.
              </p>
              <GearPick
                name="Pallet compost bay"
                price="Free"
                badge="our-pick"
                description="Three pallets stood on end, screwed together in a U-shape. That's it. The biggest capacity, the easiest to turn with a fork, and completely free if you can find pallets (ask local businesses or check Facebook Marketplace). Ideally build two bays side by side — fill one while the other finishes."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=galvanised+screws+75mm+wood"
                tip="Line the inside with cardboard to stop compost falling through the gaps."
              />
              <GearPick
                name="Blackwall Compost Converter (330L)"
                price="~£70"
                badge="essential"
                description="The BBC Gardeners' World Best Budget Buy. A tidy black cone that looks neater than a pallet bay if your site has rules about appearance. Removable lid keeps rain out, and the dark colour absorbs heat to speed things up. Made from recycled UK plastic with a 5-year guarantee. Check if your council offers these subsidised — many do for £20-30."
                amazonUrl="https://www.amazon.co.uk/dp/B0030ZJZMQ?tag=whattosow21-21"
                tip="Check your council website first — subsidised bins can be half the price."
              />
              <GearPick
                name="Tumbler composter"
                price="£60–120"
                description="A drum on a frame that you spin to aerate the compost. Faster than a static bin because turning is effortless — just crank the handle. Vermin-proof, which matters if rats are a problem on your site. Downside: limited capacity, and you can't add material continuously like a bay."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=compost+tumbler+bin+garden"
              />
            </section>
          </GearCategory>

          <TipBox title="The golden ratio">
            Roughly 2 parts brown (cardboard, straw, dry leaves) to 1 part green
            (vegetable scraps, grass clippings, fresh weeds). Too much green and it
            goes slimy and smelly. Too much brown and nothing happens. When in doubt,
            add more brown.
          </TipBox>

          <SectionDivider />

          {/* ─── HOT COMPOSTING ─── */}
          <GearCategory title="Hot composting" number={3}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                Hot composting means actively managing the heap to reach 40&ndash;60&deg;C
                internally. At these temperatures, weed seeds and pathogens are killed
                and the material breaks down much faster. The HOTBIN is the easiest
                way to do this without building and managing a traditional hot heap.
              </p>
              <GearPick
                name="HOTBIN 200L"
                price="~£255"
                badge="our-pick"
                description="An insulated bin that maintains 40-60°C internally, producing finished compost in 30-90 days — even in winter. You can add cooked food and small bones (unlike cold bins), and it kills weed seeds. The initial cost is steep but you'll produce more compost, faster, in less space than a cold system. The compost quality is noticeably better too."
                amazonUrl="https://www.amazon.co.uk/dp/B008JDTXYY?tag=whattosow21-21"
                tip="Add a handful of shredded paper or cardboard with every food waste addition to maintain the carbon balance."
              />
            </section>
          </GearCategory>

          <ColorSection color="ochre">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8">
              <BigNumber number="90" suffix="days" label="HOTBIN to finished compost" />
              <p className="text-earth/70 text-sm leading-relaxed pb-2 max-w-sm">
                Compared to 6&ndash;12 months in a cold bin. Hot composting also kills
                weed seeds and pathogens, so the finished product is cleaner.
              </p>
            </div>
          </ColorSection>

          {/* ─── WORMERIES ─── */}
          <GearCategory title="Wormeries" number={4}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                Worms eat your kitchen waste and produce two things: worm compost
                (vermicompost) and liquid feed. The compost is incredibly rich &mdash;
                a little goes a long way as a soil improver or potting mix additive.
                The liquid, diluted 10:1, is one of the best free plant feeds you can make.
              </p>
              <GearPick
                name="Wiggly Wigglers Wormery"
                price="~£175"
                badge="our-pick"
                description="The UK's specialist wormery company, run from a Herefordshire family farm. Their Urbalive wormery is well-designed, compact, and comes with everything you need including a worm voucher. The stackable tray system means the worms migrate upward as they finish each layer — you harvest from the bottom. Works indoors, in a shed, or outside in a sheltered spot."
                amazonUrl="https://www.amazon.co.uk/dp/B0DLB9TW96?tag=whattosow21-21"
                tip="Start slowly — add small amounts and let the worms establish before increasing. They eat half their body weight per day."
              />
            </section>
          </GearCategory>

          <WarningBox title="Worms and temperature">
            Composting worms (tiger worms, not earthworms) need 15&ndash;25&deg;C to thrive.
            Below 5&deg;C they go dormant, above 30&deg;C they die. In a UK winter, move
            the wormery into a shed or insulate it with bubble wrap. In summer, keep it
            in shade.
          </WarningBox>

          <SectionDivider />

          {/* ─── BOKASHI ─── */}
          <GearCategory title="Bokashi" number={5}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                Bokashi isn&apos;t composting exactly &mdash; it&apos;s fermentation.
                You add kitchen waste to an airtight bin with special bran that contains
                microorganisms. After 2&ndash;4 weeks, the fermented waste gets buried
                in soil or added to a compost bin where it breaks down rapidly.
                The big advantage: it handles cooked food, meat, and dairy.
              </p>
              <GearPick
                name="Bokashi bin starter kit"
                price="~£40"
                description="A bucket with an airtight lid and a tap for draining liquid. You'll need two bins to keep a continuous cycle going — fill one while the other ferments. The liquid is a concentrated feed (dilute 100:1). The fermented waste needs burying in soil to finish composting, so it works best alongside a garden or allotment."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=bokashi+bin+starter+kit"
                tip="Perfect for flats with no garden — ferment indoors, then bury at the allotment."
              />
              <GearPick
                name="Bokashi bran refill"
                price="~£8 for 1kg"
                description="The bran is the ongoing cost. A 1kg bag lasts about 2 months of regular use. You can make your own with wheat bran, molasses, and EM-1 solution, but the bought stuff is consistent and not expensive."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=bokashi+bran+1kg"
              />
            </section>
          </GearCategory>

          <SectionDivider />

          {/* ─── ACCESSORIES ─── */}
          <GearCategory title="Accessories" number={6}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                You don&apos;t need much beyond the bin itself. But a couple of things
                make the process easier.
              </p>
              <GearPick
                name="Compost thermometer"
                price="~£10"
                description="A long-probe thermometer that tells you what's happening inside your heap. Essential for hot composting (you're aiming for 40-60°C), useful for cold composting to know if anything is actually going on in there. A 50cm probe reaches the centre of most bins."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=compost+thermometer+long+probe"
              />
              <GearPick
                name="Garden sieve / riddle"
                price="£15–25"
                badge="essential"
                description="For sifting finished compost before use. Removes twigs, stones, and anything that hasn't broken down yet (chuck it back in the bin). A 37cm sieve with 9-12mm mesh sits nicely over a wheelbarrow. Bulldog make a good one."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=garden+sieve+compost+riddle"
                tip="Rest it on a wheelbarrow and shovel compost through — the finished stuff drops in, the rough stuff stays on top."
              />
              <GearPick
                name="Compost caddy (kitchen)"
                price="~£15"
                description="A small countertop bin for collecting food scraps before taking them to the allotment. Get one with a charcoal filter lid if you're worried about smell — it makes a real difference. Empty it every few days."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=kitchen+compost+caddy+charcoal+filter"
              />
            </section>
          </GearCategory>

          {/* ─── WHAT TO COMPOST ─── */}
          <ColorSection color="allotment">
            <section id="what-to-compost">
              <h2 className="text-2xl sm:text-3xl font-serif text-white mb-6 tracking-tight">
                What goes in &mdash; and what doesn&apos;t
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-leaf-light mb-3">
                    Greens (nitrogen)
                  </h3>
                  <ul className="text-sm text-white/70 space-y-1.5">
                    <li>Vegetable and fruit peelings</li>
                    <li>Grass clippings (thin layers)</li>
                    <li>Annual weeds (before they seed)</li>
                    <li>Coffee grounds and tea bags</li>
                    <li>Crop waste and plant trimmings</li>
                    <li>Comfrey and nettle leaves</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-leaf-light mb-3">
                    Browns (carbon)
                  </h3>
                  <ul className="text-sm text-white/70 space-y-1.5">
                    <li>Cardboard (torn up, uncoated)</li>
                    <li>Straw and hay</li>
                    <li>Dry autumn leaves</li>
                    <li>Shredded paper</li>
                    <li>Woody prunings (chopped small)</li>
                    <li>Egg boxes and toilet roll tubes</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 border-t border-white/15 pt-4">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-rust-light mb-3">
                  Never add
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Cooked food, meat, dairy, or fish (cold bins only &mdash; HOTBIN and bokashi can handle these).
                  Perennial weed roots (bindweed, couch grass, ground elder).
                  Diseased plants (burn them instead).
                  Cat or dog waste. Glossy or coated card.
                </p>
              </div>
            </section>
          </ColorSection>

          <PullQuote>
            Compost isn&apos;t something you buy in bags &mdash; it&apos;s something
            your allotment makes for you. The best soil food is the stuff you grew yourself.
          </PullQuote>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-6 tracking-tight">
              More guides
            </h2>
            <div>
              <a
                href="/guides/soil"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Understanding your soil
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    What type of soil you have and how to improve it.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/guides/allotment-essentials"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Allotment essentials
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    The tools that earn their shed space.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/guides/pests"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Common pests &amp; diseases
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    Slugs, aphids, blight &mdash; and how to deal with them.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/blog/best-compost-bins-uk"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    The best compost bins UK
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    Cold bins, hot bins and wormeries &mdash; which to buy.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    What to sow this week
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    Personalised sowing dates for your postcode.
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
