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
import GearPick, { GearCategory, AffiliateDisclosure } from "@/components/GearPick";
import AllotmentEssentialsBuyerNote from "@/components/AllotmentEssentialsBuyerNote";

export const metadata: Metadata = {
  title: "What You Need for Your First Allotment UK — Essential Kit | What To Sow",
  description:
    "The essential tools and kit for a new allotment. Honest recommendations on spades, forks, gloves, compost, and everything else — from someone who's been through it.",
  keywords: [
    "allotment essentials UK",
    "what do I need for an allotment",
    "first allotment tools",
    "allotment equipment list",
    "best allotment tools UK",
    "new allotment what to buy",
    "allotment starter kit",
    "best gardening gloves for allotment",
  ],
  openGraph: {
    title: "What You Need for Your First Allotment",
    description:
      "The only tools and kit you actually need. No gadgets, no gimmicks — just the stuff that earns its shed space.",
    type: "article",
    url: "https://whattosow.co.uk/guides/allotment-essentials",
  },
  alternates: {
    canonical: "/guides/allotment-essentials",
  },
};

export default function AllotmentEssentialsGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Allotment Essentials", item: "https://whattosow.co.uk/guides/allotment-essentials" },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best allotment tools UK",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Spear & Jackson Traditional Digging Fork",
          description: "Your most-used traditional tool. Loosening soil, turning compost, lifting root veg, breaking up clods. Stainless steel with a wooden handle.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "28",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B0006UF6DA?tag=whattosow21-21",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "Showa 370 Assembly Grip Gloves",
          description: "The best gardening gloves. Nitrile-coated palm gives incredible grip even when wet. Breathable, machine washable, protects against thorns and nettles.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "5",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B0017HEJC0?tag=whattosow21-21",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "Felco 2 Secateurs",
          description: "Swiss-made bypass secateurs that last decades. Every part is replaceable, from the blade to the spring. They cut cleanly and hold their edge.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "45",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B00023RYS6?tag=whattosow21-21",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Product",
          name: "Terradix Broadfork",
          description: "The no-dig essential. Four 25cm prongs, 31cm working width. Push in, rock back, aerated soil without turning it. Brilliant build quality, lasts forever.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "90",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B0BBRW2M3Y?tag=whattosow21-21",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Product",
          name: "Niwaki Hori Hori Knife",
          description: "Japanese soil knife that digs, cuts, weeds, measures planting depth, and divides plants. Serrated edge on one side, sharp blade on the other.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "33",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B07TJ9V989?tag=whattosow21-21",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Product",
          name: "Burgon & Ball Kneelo Kneeler",
          description: "Memory foam kneeler that makes a real difference. Thicker and more supportive than cheap foam pads. Wipes clean, lasts years.",
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: "17",
            availability: "https://schema.org/InStock",
            url: "https://www.amazon.co.uk/dp/B004CRVDV2?tag=whattosow21-21",
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
        name: "What tools do I need for a new allotment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At minimum: a spade, a fork, a rake, a hand trowel, a watering can, and decent gloves. A hoe saves hours of weeding. Everything else can wait until you know what you actually need for the way you garden.",
        },
      },
      {
        "@type": "Question",
        name: "How much does it cost to set up an allotment UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can get started for around £80-120 for basic tools. Buy second-hand where possible — old Spear & Jackson or Bulldog tools from car boots are often better quality than brand new budget tools. Seeds cost £2-3 per packet and a packet goes a long way.",
        },
      },
      {
        "@type": "Question",
        name: "What are the best gardening gloves for an allotment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Showa 370 gloves are the gold standard for allotment work. They give excellent grip, breathe well, protect your hands from thorns, and are machine washable. At around £5-7 a pair they last a full season of heavy use.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a wheelbarrow for an allotment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, eventually — you will be moving compost, manure, harvested crops, and cleared weeds constantly. A standard builder's wheelbarrow from a DIY store is fine. Don't buy one immediately though — see what your plot actually needs first.",
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
          title="What you need for your first allotment"
          subtitle="The tools that earn their shed space, the ones that don't, and what to buy first."
          image="/images/headers/hero-allotment.webp"
          color="amber"
        />

        <div className="space-y-0 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          <section>
            <div className="space-y-3">
              <p>
                Getting an allotment is exciting. The temptation is to buy everything at once.
                Don&apos;t. Half the gadgets in garden centres solve problems you don&apos;t have yet,
                and the other half solve problems that don&apos;t exist.
              </p>
              <p>
                Here&apos;s what you actually need, in the order you&apos;ll need it. Everything
                else can wait until you know how you garden.
              </p>
            </div>
          </section>

          <AllotmentEssentialsBuyerNote />

          <InThisGuide
            items={[
              { label: "Digging tools", anchor: "digging-tools" },
              { label: "Hand tools", anchor: "hand-tools" },
              { label: "Gloves", anchor: "gloves" },
              { label: "Weeding", anchor: "weeding" },
              { label: "Watering", anchor: "watering" },
              { label: "Support and protection", anchor: "support-and-protection" },
              { label: "Soil and compost", anchor: "soil-and-compost" },
              { label: "Moving stuff", anchor: "moving-stuff" },
              { label: "Clearing and bonfires", anchor: "clearing-and-bonfires" },
              { label: "The full shopping list", anchor: "the-full-shopping-list" },
            ]}
          />

          <AffiliateDisclosure />

          {/* ─── DIGGING TOOLS ─── */}
          <GearCategory title="Digging tools" number={1}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                A spade and a fork. That&apos;s it. If you&apos;re going no-dig
                (and you should consider it), the fork gets more use than the spade.
                Buy the best you can afford &mdash; cheap tools bend and break, and
                a decent tool lasts decades.
              </p>
              <GearPick
                name="Terradix broadfork"
                price="~£90"
                badge="our-pick"
                description="If you're going no-dig (and you should), a broadfork is the tool you'll reach for most. The Terradix has four 25cm prongs and a 31cm working width — push it in, rock back, and you've aerated the soil without turning it. Brilliant build quality, lasts forever."
                amazonUrl="https://www.amazon.co.uk/dp/B0BBRW2M3Y?tag=whattosow21-21"
                position="allotment-kit-detail-broadfork"
                tip="An investment, but the only digging tool many no-dig growers use."
              />
              <GearPick
                name="Digging fork"
                price="£25–35"
                badge="essential"
                description="Your most-used traditional tool. Loosening soil, turning compost, lifting root veg, breaking up clods. A stainless steel fork with a wooden handle is worth the money. Spear &amp; Jackson make the classic one."
                amazonUrl="https://www.amazon.co.uk/dp/B0006UF6DA?tag=whattosow21-21"
                position="allotment-kit-detail-digging-fork"
                tip="Check car boot sales — old Bulldog forks go for a fiver and outlast modern budget ones."
              />
              <GearPick
                name="Spear & Jackson digging spade"
                price="~£30"
                badge="essential"
                description="For edging beds, digging planting holes, moving soil. The Spear &amp; Jackson Traditional is stainless steel with a hardwood handle — the one you see on every allotment because it works and lasts. If you're going no-dig, you'll use it less than you'd think — but you still need one."
                amazonUrl="https://www.amazon.co.uk/dp/B0006UF6D0?tag=whattosow21-21"
                position="allotment-kit-detail-digging-spade"
              />
              <GearPick
                name="Rake"
                price="£12–20"
                badge="essential"
                description="For levelling soil, creating a fine tilth for sowing, and raking out stones. Get a flat-headed soil rake (not a lawn rake — those are the springy fan-shaped ones). You'll use it more than you expect."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=soil+rake+garden"
                position="allotment-kit-detail-rake"
              />
            </section>
          </GearCategory>

          <TipBox title="Buying second-hand">
            Old tools are often better than new ones. Car boot sales, Facebook Marketplace,
            and Freecycle are full of decent spades, forks, and rakes going for a few quid.
            As long as the handle isn&apos;t cracked and the metal isn&apos;t badly rusted, they&apos;ll
            outlast anything from the budget aisle.
          </TipBox>

          {/* ─── HAND TOOLS ─── */}
          <GearCategory title="Hand tools" number={2}>
            <section>
              <GearPick
                name="Niwaki Hori Hori knife"
                price="~£33"
                badge="our-pick"
                description="If you could only have one hand tool, this is it. A Japanese soil knife that digs, cuts, weeds, measures planting depth, divides plants, and opens bags of compost. The serrated edge on one side and the sharp blade on the other mean it replaces your trowel, weeding knife, and dibber in one go. Every allotment holder who buys one says the same thing: 'Why didn't I get this sooner?'"
                amazonUrl="https://www.amazon.co.uk/dp/B07TJ9V989?tag=whattosow21-21"
                position="allotment-kit-detail-hori-hori"
                tip="Comes with a canvas holster — clip it to your belt and you'll reach for it constantly."
              />
              <GearPick
                name="Hand trowel"
                price="£5–15"
                badge="essential"
                description="For planting out, digging small holes, working in tight spaces between plants. A stainless steel one with a comfortable grip is worth the few extra quid. If you get a Hori Hori you'll use this less, but it's still nice to have for delicate work."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=stainless+steel+hand+trowel"
                position="allotment-kit-detail-hand-trowel"
              />
              <GearPick
                name="Felco 2 secateurs"
                price="~£45"
                badge="our-pick"
                description="The gold standard. Swiss-made bypass secateurs that last decades — every part is replaceable, from the blade to the spring. They cut cleanly, the grip is comfortable all day, and they hold their edge. Expensive upfront but you'll never buy another pair."
                amazonUrl="https://www.amazon.co.uk/dp/B00023RYS6?tag=whattosow21-21"
                position="allotment-kit-detail-felco-secateurs"
                tip="Clean and oil the blade after each session and they'll outlast you."
              />
              <GearPick
                name="Okatsune 103 secateurs"
                price="~£50"
                badge="upgrade"
                description="The Japanese alternative to Felco — and some say better. Which? Best Buy. The blade stays sharper longer and cuts with less effort. Lighter in the hand than Felcos. If you're choosing between the two, try both if you can — it's genuinely personal preference at this level."
                amazonUrl="https://www.amazon.co.uk/dp/B001Y54F88?tag=whattosow21-21"
                position="allotment-kit-detail-okatsune-secateurs"
              />
              <GearPick
                name="Budget bypass secateurs"
                price="£8–15"
                badge="budget"
                description="If £45+ feels steep, any decent bypass secateurs will do the job. Darlac make good ones for the price. Lidl&apos;s Parkside range is surprisingly decent too. Just avoid anvil secateurs — they crush stems instead of cutting cleanly. Keep them sharp and clean."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=bypass+secateurs"
                position="allotment-kit-detail-budget-secateurs"
              />
            </section>
          </GearCategory>

          <SectionDivider />

          {/* ─── GLOVES ─── */}
          <GearCategory title="Gloves" number={3}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                Good gloves are genuinely life-changing on the allotment. Bad gloves are
                worse than no gloves &mdash; they slip, they shred, and you end up taking
                them off anyway.
              </p>
              <GearPick
                name="Showa 370 Assembly Grip gloves"
                price="£5–7"
                badge="our-pick"
                description="The best gardening gloves you can buy, and half the price of most 'gardening' branded alternatives. Nitrile-coated palm gives incredible grip even when wet. The back breathes so your hands don't sweat. They protect against thorns, nettles, and rough surfaces without losing dexterity. Machine washable. Once you try these, you won't go back to anything else."
                amazonUrl="https://www.amazon.co.uk/dp/B0017HEJC0?tag=whattosow21-21"
                position="allotment-kit-detail-showa-gloves"
                tip="Buy 2–3 pairs. You'll lose one, leave one in the shed, and want a dry pair when the others are drying."
              />
              <GearPick
                name="Thick thorn-proof gloves"
                price="£8–15"
                description="For bramble clearing, handling prickly prunings, and anything the Showas can't handle. You don't need these often, but when you do, you really do. Any gauntlet-style leather or synthetic pair will do."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=thorn+proof+gardening+gloves"
                position="allotment-kit-detail-thorn-gloves"
              />
            </section>
          </GearCategory>

          <PullQuote>
            Showa 370s. Seriously. Every allotment holder I know who&apos;s tried
            them has switched permanently. They&apos;re that good.
          </PullQuote>

          {/* ─── WEEDING ─── */}
          <GearCategory title="Weeding" number={4}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                If you do one thing to stay on top of an allotment, it&apos;s weed
                regularly. A good hoe makes it almost effortless &mdash; 10 minutes
                of hoeing beats an hour of hand-weeding.
              </p>
              <GearPick
                name="Dutch hoe"
                price="£12–20"
                badge="our-pick"
                description="Push it just below the soil surface on a dry day and it severs weed roots without disturbing your crops. The single most time-saving tool on an allotment. Hoe weekly and you'll never have a weed problem. The blade should be sharp — file it occasionally."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=dutch+hoe+garden"
                position="allotment-kit-detail-dutch-hoe"
                tip="Hoe on a dry morning — cut weeds wilt in the sun. Hoe in the rain and they just re-root."
              />
              <GearPick
                name="Burgon & Ball Kneelo kneeler"
                price="~£17"
                badge="our-pick"
                description="Memory foam kneeler that actually makes a difference. Thicker and more supportive than the cheap foam pads — your knees will thank you after an hour of weeding. Wipes clean, lasts years, comes in nice colours. One of those things you don't think you need until you've used one."
                amazonUrl="https://www.amazon.co.uk/dp/B004CRVDV2?tag=whattosow21-21"
                position="allotment-kit-detail-kneeler"
              />
            </section>
          </GearCategory>

          <SectionDivider />

          {/* ─── WATERING ─── */}
          <GearCategory title="Watering" number={5}>
            <section>
              <GearPick
                name="Watering can (10L)"
                price="£8–15"
                badge="essential"
                description="A standard 10-litre can with a detachable rose. Two of these saves trips to the tap. Plastic is fine — metal looks nicer but costs more and dents. Make sure the rose is removable so you can direct-water established plants."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=10+litre+watering+can"
                position="allotment-kit-detail-watering-can"
                tip="Get two. You'll spend half your life walking back to the tap otherwise."
              />
              <GearPick
                name="Hose and connectors"
                price="£25–40"
                badge="upgrade"
                description="If your site has standpipes and allows hoses, a reinforced hose with quick-connect fittings saves enormous amounts of time in summer. Check your site rules first — some allotment sites don't allow hoses during dry spells."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=garden+hose+50m+reinforced"
                position="allotment-kit-detail-hose"
              />
            </section>
          </GearCategory>

          {/* ─── SUPPORT & PROTECTION ─── */}
          <GearCategory title="Support and protection" number={6}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                Climbing crops need something to climb. Tender crops need protection from
                frost and wind. You&apos;ll accumulate this stuff over time &mdash; buy
                what you need as you plant.
              </p>
              <GearPick
                name="Bamboo canes (6ft / 1.8m)"
                price="~£8 for 20"
                badge="essential"
                description="For runner beans, climbing French beans, tomato supports, and propping up anything that needs it. 6ft is the most versatile length. You'll use them every year."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=bamboo+canes+6ft+garden"
                position="allotment-kit-detail-bamboo-canes"
              />
              <GearPick
                name="Garden twine (jute)"
                price="~£4"
                badge="essential"
                description="For tying plants to canes, stringing up climbing beans, and a hundred other jobs. Jute twine is biodegradable and won't cut into stems. A single ball lasts most of the season."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=jute+garden+twine"
                position="allotment-kit-detail-jute-twine"
              />
              <GearPick
                name="Horticultural fleece"
                price="~£8 for 10m"
                badge="essential"
                description="Protects tender seedlings from late frosts, gives crops a head start in spring, and keeps carrot fly off your carrots. The single most useful protective material on the allotment. Get the lightest weight (17g/m²) for most jobs."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=horticultural+fleece+17g"
                position="allotment-kit-detail-fleece"
                tip="Peg it down properly or the wind takes it. Tent pegs work well."
              />
              <GearPick
                name="Netting (butterfly/bird)"
                price="~£8 for 6m"
                description="Essential for brassicas (cabbage, broccoli, kale) unless you enjoy feeding caterpillars. Fine mesh netting (6mm or smaller) also keeps carrot fly out. Drape over hoops or canes to keep it off the plants."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=butterfly+netting+garden+fine+mesh"
                position="allotment-kit-detail-netting"
              />
            </section>
          </GearCategory>

          <WarningBox title="Fleece and netting aren't optional">
            Without fleece, a late frost in May can wipe out tender seedlings you&apos;ve
            nurtured for weeks. Without netting, cabbage white butterflies will strip your
            brassicas to skeletons in days. These aren&apos;t nice-to-haves.
          </WarningBox>

          <SectionDivider />

          {/* ─── SOIL & COMPOST ─── */}
          <GearCategory title="Soil and compost" number={7}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                Feed your soil and it feeds your plants. If you do nothing else, mulch
                your beds with compost every year.
              </p>
              <GearPick
                name="Well-rotted manure or compost"
                price="£3–5 per bag"
                badge="essential"
                description="Spread 5–10cm on top of your beds in autumn or early spring. It feeds the soil, improves structure, suppresses weeds, and retains moisture. Horse manure from a local stable is often free — just make sure it's well-rotted (dark, crumbly, doesn't smell). Bagged farmyard manure from garden centres works too."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=well+rotted+farmyard+manure+bag"
                position="allotment-kit-detail-manure-compost"
                tip="Ask around your site — there's usually someone with a manure contact."
              />
              <GearPick
                name="Growmore or chicken manure pellets"
                price="~£6"
                description="A general-purpose fertiliser for hungry crops like brassicas and potatoes. Scatter and rake in before planting. Not essential if you're mulching with compost, but useful for a quick nutrient boost."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=chicken+manure+pellets+garden"
                position="allotment-kit-detail-chicken-manure"
              />
            </section>
          </GearCategory>

          {/* ─── MOVING STUFF ─── */}
          <GearCategory title="Moving stuff" number={8}>
            <section>
              <GearPick
                name="Wheelbarrow"
                price="£30–60"
                badge="essential"
                description="You will move an absurd amount of stuff on an allotment — compost, manure, weeds, harvested veg, tools. A standard builder's wheelbarrow from a DIY store is fine. Pneumatic tyre, not solid. Don't buy the cheapest one — the axle bends."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=wheelbarrow+garden+pneumatic+tyre"
                position="allotment-kit-detail-wheelbarrow"
                tip="Don't buy one immediately — see if your site has a communal one first."
              />
              <GearPick
                name="Tubtrugs (26L)"
                price="~£9"
                badge="our-pick"
                description="Flexible plastic trugs that every allotment holder ends up buying several of. Carrying weeds, mixing compost, collecting harvests, soaking bare roots — they do everything. Squeeze the sides to pour, stack them to store. Indestructible and they come in every colour. You'll wonder how you managed without them."
                amazonUrl="https://www.amazon.co.uk/dp/B000UJSQUM?tag=whattosow21-21"
                position="allotment-kit-detail-tubtrugs"
                tip="Get at least 3. You'll always have one full of something."
              />
              <GearPick
                name="Builders' buckets (14L)"
                price="~£8 for 3"
                badge="budget"
                description="The cheap alternative to Tubtrugs. Not flexible, but sturdy and stackable. Good for mixing liquid feeds, soaking modules before planting out, and leaving on the plot permanently."
                amazonUrl="https://www.amazon.co.uk/s?tag=whattosow21-21&k=builders+bucket+14+litre"
                position="allotment-kit-detail-builders-buckets"
              />
              <GearPick
                name="Mepal Take a Break containers"
                price="~£14"
                badge="our-pick"
                description="For taking your harvest home without squashing it. Mepal containers are airtight, leakproof, and stack neatly in a bag. The 900ml midi size is perfect for salad leaves, herbs, and berries. The larger ones fit courgettes and beans. Much better than a carrier bag full of crushed tomatoes."
                amazonUrl="https://www.amazon.co.uk/dp/B0BTT1T9TW?tag=whattosow21-21"
                position="allotment-kit-detail-harvest-containers"
                tip="Get a couple of sizes — the midi for delicate stuff, a bigger one for bulkier crops."
              />
            </section>
          </GearCategory>

          {/* ─── BONFIRES & CLEARING ─── */}
          <GearCategory title="Clearing and bonfires" number={9}>
            <section>
              <p className="text-sm text-earth-light leading-relaxed mb-6 max-w-2xl">
                Most allotment sites allow bonfires for clearing woody waste, old brassica
                stems, and diseased material that shouldn&apos;t go on the compost heap. Check
                your site rules first.
              </p>
              <GearPick
                name="Certainly Wood kindling"
                price="~£7"
                badge="our-pick"
                description="Kiln-dried kindling that actually lights first time. Getting a bonfire going with damp hedge prunings is miserable — proper kindling makes the difference between a productive burn and an hour of swearing at smoke. Certainly Wood is consistently dry and well-cut."
                amazonUrl="https://www.amazon.co.uk/dp/B01LXA92FN?tag=whattosow21-21"
                position="allotment-kit-detail-kindling"
                tip="Keep a bag in the shed. You'll use it every time you need to burn off old brassica stumps or diseased material."
              />
            </section>
          </GearCategory>

          {/* ─── COST CALLOUT ─── */}
          <ColorSection color="allotment">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8">
              <BigNumber number="£110" label="To get started" />
              <p className="text-white/60 text-sm leading-relaxed pb-2 max-w-sm">
                That gets you every essential on this list. Buy second-hand and you could halve it.
                The allotment rent itself is usually £25&ndash;80/year.
              </p>
            </div>
          </ColorSection>

          {/* ─── SHOPPING LIST SUMMARY ─── */}
          <SectionDivider label="Summary" />

          <ColorSection color="sage">
            <section id="the-full-shopping-list">
              <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-6 tracking-tight">
                The full shopping list
              </h2>
              <p className="text-sm text-earth-light mb-6">
                Buy the essentials first. Add the upgrades as you need them.
              </p>

              <div className="space-y-3 mb-8">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-allotment">
                  Essentials (~&pound;130&ndash;170)
                </h3>
                <ul className="text-sm text-earth space-y-1.5">
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Spear &amp; Jackson digging fork</span>
                    <span className="text-rust tabular-nums">~&pound;28</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Spear &amp; Jackson digging spade</span>
                    <span className="text-rust tabular-nums">~&pound;30</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Rake</span>
                    <span className="text-rust tabular-nums">&pound;12&ndash;20</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Hand trowel</span>
                    <span className="text-rust tabular-nums">&pound;5&ndash;15</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Felco 2 secateurs</span>
                    <span className="text-rust tabular-nums">~&pound;45</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Showa 370 gloves (x2)</span>
                    <span className="text-rust tabular-nums">~&pound;10</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Dutch hoe</span>
                    <span className="text-rust tabular-nums">&pound;12&ndash;20</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Watering can 10L (x2)</span>
                    <span className="text-rust tabular-nums">&pound;16&ndash;30</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Bamboo canes, twine, fleece</span>
                    <span className="text-rust tabular-nums">~&pound;20</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-dark">
                  Our top picks (add when you need them)
                </h3>
                <ul className="text-sm text-earth space-y-1.5">
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Terradix broadfork</span>
                    <span className="text-rust tabular-nums">~&pound;90</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Burgon &amp; Ball Kneelo kneeler</span>
                    <span className="text-rust tabular-nums">~&pound;17</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Mepal harvest containers</span>
                    <span className="text-rust tabular-nums">~&pound;14</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Wheelbarrow</span>
                    <span className="text-rust tabular-nums">&pound;30&ndash;60</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Butterfly/bird netting</span>
                    <span className="text-rust tabular-nums">~&pound;8</span>
                  </li>
                  <li className="flex justify-between border-b border-earth/8 pb-1.5">
                    <span>Certainly Wood kindling</span>
                    <span className="text-rust tabular-nums">~&pound;7</span>
                  </li>
                </ul>
              </div>
            </section>
          </ColorSection>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-6 tracking-tight">
              More tools and guides
            </h2>
            <div>
              <a
                href="/guides/seed-starting-kit"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Seed starting kit
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    Everything you need to sow seeds indoors.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/guides/beginners"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Beginner&apos;s guide
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    Just got a plot? Start here.
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
                    What type of soil you have and how to improve it.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/harvest-planner"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Harvest planner
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    Enter what you&apos;ve sown and we&apos;ll tell you when to harvest.
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
