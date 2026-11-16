import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateLink from "@/components/AffiliateLink";
import { SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";

const tm = (q: string) => `https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`;

function trackingSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const URL = "https://whattosow.co.uk/guides/microgreens-and-windowsill-herbs";

export const metadata: Metadata = {
  title: "Growing Microgreens & Windowsill Herbs in the UK | What To Sow",
  description:
    "How to grow micro salads and herbs indoors, all year: what to sow, how many days each takes, a step-by-step method for a windowsill tray, and what to do when it goes leggy or mouldy.",
  keywords: [
    "growing microgreens UK",
    "micro salad",
    "windowsill herbs",
    "how to grow pea shoots",
    "growing herbs indoors UK",
    "microgreens in winter",
  ],
  openGraph: {
    title: "Growing Microgreens & Windowsill Herbs in the UK",
    description:
      "Fresh leaves in a week or two, from a tray on the windowsill, in any month of the year.",
    type: "article",
    url: URL,
  },
  alternates: { canonical: "/guides/microgreens-and-windowsill-herbs" },
};

interface TrayCrop {
  name: string;
  /** Days from sowing to cutting at ordinary room temperature. */
  days: string;
  note: string;
  seeds: string;
  seedLabel: string;
}

const trayCrops: TrayCrop[] = [
  { name: "Cress", days: "5–7 days", note: "The quickest of all, and peppery. Grows on damp kitchen paper as happily as on compost.", seeds: tm("Cress"), seedLabel: "Cress seed" },
  { name: "Radish", days: "6–10 days", note: "Hot, crisp and nearly impossible to get wrong. The one to start with.", seeds: tm("Radish"), seedLabel: "Radish seed" },
  { name: "Mustard", days: "7–10 days", note: "A heat that builds. Red-leaved kinds look as good as they taste.", seeds: tm("Mustard"), seedLabel: "Mustard seed" },
  { name: "Rocket", days: "8–12 days", note: "The pepper of grown rocket in a softer leaf.", seeds: tm("Rocket"), seedLabel: "Rocket seed" },
  { name: "Broccoli and kale", days: "8–12 days", note: "Mild and cabbagey, and very even to grow. A good base for a mixed tray.", seeds: tm("Kale"), seedLabel: "Kale seed" },
  { name: "Sunflower shoots", days: "8–12 days", note: "Nutty and crunchy. Soak the seed overnight, and pick the husks off as they open.", seeds: tm("Sunflower"), seedLabel: "Sunflower seed" },
  { name: "Pea shoots", days: "10–14 days", note: "Taste of fresh peas. Soak overnight before sowing; cut above the lowest leaf and they will often grow back once.", seeds: tm("Pea%20Shoots"), seedLabel: "Pea seed" },
  { name: "Beetroot and chard", days: "12–18 days", note: "Earthy, with magenta stems. Slower and a little patchier than the brassicas.", seeds: tm("Beetroot"), seedLabel: "Beetroot seed" },
  { name: "Coriander", days: "14–21 days", note: "Slow to come up and worth the wait. Crush the round seed gently in two before sowing, or buy it ready split.", seeds: tm("Coriander"), seedLabel: "Coriander seed" },
  { name: "Basil", days: "14–21 days", note: "Needs real warmth, so it is a spring and summer tray. Sulks on a cold winter sill.", seeds: tm("Basil"), seedLabel: "Basil seed" },
];

/** Slower or fussier than the ten above — and all of them in our own seed box. */
const seedBoxCrops: TrayCrop[] = [
  { name: "Red amaranth", days: "8–12 days", note: "Tiny seed, vivid magenta stems, a mild earthy taste. Likes warmth, and colours a mixed tray like nothing else.", seeds: tm("Amaranth"), seedLabel: "Amaranth seed" },
  { name: "Nasturtium", days: "10–14 days", note: "Round, peppery leaves that taste of watercress. The seed is as big as a pea: soak it overnight and cover it.", seeds: tm("Nasturtium"), seedLabel: "Nasturtium seed" },
  { name: "Red-veined sorrel", days: "14–21 days", note: "Sharp and lemony, with a red vein down each small leaf. Slow, so give it a tray of its own.", seeds: tm("Sorrel"), seedLabel: "Sorrel seed" },
  { name: "Garlic chives", days: "14–21 days", note: "Fine green threads with a gentle garlic taste. Slow to start, and often still wearing its black seed coat.", seeds: tm("Garlic%20Chives"), seedLabel: "Garlic chive seed" },
  { name: "Lemon balm", days: "14–21 days", note: "A soft lemon scent in a small crinkled leaf. One of the slowest, and good on fruit as well as salad.", seeds: tm("Lemon%20Balm"), seedLabel: "Lemon balm seed" },
];

function TrayRow({ crop }: { crop: TrayCrop }) {
  return (
    <li className="border-t border-earth/10 py-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-serif text-xl text-earth">{crop.name}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth-light">{crop.days}</span>
      </div>
      <p className="mt-1 text-[15px] leading-relaxed text-earth-light">{crop.note}</p>
      <AffiliateLink
        href={crop.seeds}
        product={crop.seedLabel}
        type="seed"
        merchant="thompson-morgan"
        position={`microgreens-seeds-${trackingSlug(crop.name)}`}
        aria-label={`${crop.seedLabel} at Thompson & Morgan`}
        className="mt-1 inline-flex min-h-[44px] items-center font-mono text-[10px] uppercase tracking-[0.12em] text-allotment underline decoration-amber/60 underline-offset-4 hover:text-allotment-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-allotment"
      >
        {/* one string: separate text nodes lose their spaces inside inline-flex */}
        {`${crop.seedLabel} at Thompson & Morgan \u2192`}
      </AffiliateLink>
    </li>
  );
}

const trayPhotos = [
  {
    src: "/photos/guides/microgreens-tray-first-leaves.webp",
    alt: "A green tray with rows of seed sprouting on a brown fibre mat, the seed leaves pale yellow and just opening",
    caption: "25 June. One of our trays: seed sown in rows on a fibre mat, no compost. The first leaves come up pale yellow.",
    width: 1000,
    height: 1200,
  },
  {
    src: "/photos/guides/microgreens-tray-next-day.webp",
    alt: "The same tray from above a day later, the seedlings taller and still yellow, one row showing pink stems",
    caption: "26 June. A day on, and taller. Still yellow.",
    width: 1000,
    height: 1333,
  },
  {
    src: "/photos/guides/microgreens-tray-greened-up.webp",
    alt: "The same tray three days later, now thick with green seedlings and a band of deep pink red amaranth",
    caption: "29 June. Green, upright and close to cutting; the deep pink band is red amaranth. Four days separate the first photo from this one.",
    width: 1000,
    height: 1333,
  },
];

const faqs = [
  {
    q: "How long do microgreens take to grow?",
    a: "Between one and three weeks from sowing. Cress and radish are ready in about a week, mustard, rocket and kale in eight to twelve days, pea shoots in about a fortnight, and coriander and basil in two to three weeks. A cold windowsill adds a few days to all of them.",
  },
  {
    q: "Can you grow microgreens in winter in the UK?",
    a: "Yes. They are the one crop that suits a UK winter windowsill, because they are cut before the low light has time to matter. Use the brightest sill you have, keep the tray off a cold pane at night, and expect each crop to take a few days longer than in summer.",
  },
  {
    q: "Do I need a grow light?",
    a: "Not to start. A bright windowsill is enough for cress, radish, mustard, kale and pea shoots in every month. A light helps in December and January if seedlings are stretching and falling over, and it helps basil a good deal, but it is worth growing a few trays without one first.",
  },
  {
    q: "Do microgreens grow back after cutting?",
    a: "Mostly not. A microgreen is cut below its only leaves, so the tray is finished after one harvest and the roots go on the compost heap. Pea shoots are the exception: cut above the lowest leaf and they will usually give a second, smaller cut.",
  },
  {
    q: "Are microgreens the same as sprouts?",
    a: "No. Sprouts are germinated in a jar of rinsed water, in the dark, and eaten whole, root and all. Microgreens are sown on compost or a mat, grown in the light until they have leaves, and cut above the roots.",
  },
];

export default function MicrogreensGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Microgreens & Windowsill Herbs", item: URL },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Growing Microgreens & Windowsill Herbs in the UK",
    description:
      "What to sow on a windowsill in any month, how many days each takes, and a step-by-step method for a tray of micro salad.",
    url: URL,
    image: "https://whattosow.co.uk/photos/guides/microgreens-tray-greened-up.webp",
    publisher: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header backLink={{ href: "/guides", label: "← Guides" }} />
      <main id="main-content" className="pt-12 sm:pt-16 pb-16">
        <div className="px-6 sm:px-10 lg:px-16">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 block">
            Growing guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-4 max-w-2xl">
            Micro salads and herbs on the windowsill
          </h1>
          <p className="text-earth-light leading-relaxed mb-4 max-w-2xl">
            A tray of seed on a windowsill is the quickest thing a gardener can grow. Cress is ready in a week and pea
            shoots in a fortnight, and none of it needs a garden, a greenhouse or good weather. It is also the one
            sowing job that works in every month of the year.
          </p>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            If you like the idea of always having something fresh within reach, whatever the weather or the shops are
            doing, this is the easiest place to start.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">What a micro salad is</h2>
            <p className="mb-3">
              Ordinary vegetable and herb seed, sown thickly and cut young, when the first pair or two of leaves has
              opened. The flavour is the grown plant&apos;s, only stronger: radish shoots are hot, pea shoots taste of
              peas, coriander tastes of coriander.
            </p>
            <p>
              A tray gives a few good handfuls. That is enough to lift a sandwich, a bowl of soup or a plate of eggs
              several times over. It won&apos;t replace the veg drawer, and it doesn&apos;t need to.
            </p>
          </section>

          <figure className="!max-w-4xl py-4">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {trayPhotos.map((photo) => (
                <div key={photo.src}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 640px) 30vw, 90vw"
                    className="h-auto w-full img-grade"
                  />
                  <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-earth-lighter">
                    {photo.caption}
                  </p>
                </div>
              ))}
            </div>
          </figure>

          <SectionDivider label="What to sow" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Ten that work, quickest first
            </h2>
            <p className="mb-2">
              The days are from sowing to cutting in an ordinary warm room. A cold sill in midwinter adds a few. Start
              with radish or cress, which forgive most things, and add the slower ones once the routine is easy.
            </p>
            <ul className="mt-4 border-b border-earth/10">
              {trayCrops.map((crop) => (
                <TrayRow key={crop.name} crop={crop} />
              ))}
            </ul>
            <h3 className="mt-10 font-serif text-xl text-earth">Five more from our own seed box</h3>
            <p className="mt-2 mb-2">
              Once the quick ones are easy, these are the ones that make a tray interesting. Most are slower, so sow
              them apart from the radish and rocket, which would be over before these have started.
            </p>
            <ul className="mt-4 border-b border-earth/10">
              {seedBoxCrops.map((crop) => (
                <TrayRow key={crop.name} crop={crop} />
              ))}
            </ul>
            <p className="mt-4 mb-2">
              A ready-made spicy mix is worth a look as well: mustards, rocket and radish blended to come up together,
              which saves working out the timings yourself.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-earth-lighter">
              The seed links are affiliate links. If you buy through them, a little goes towards a proper shed for the
              allotment, at no extra cost to you.
            </p>
          </section>

          <WarningBox title="What not to sow">
            Only grow shoots from plants whose leaves are eaten anyway. Never tomatoes, peppers, aubergines or potatoes:
            the leaves and shoots of that family are poisonous. Leave rhubarb out too. And use seed sold for sprouting
            or microgreens, or plain untreated seed. Seed with a coloured chemical coating is for the ground, not the
            plate.
          </WarningBox>

          <SectionDivider label="The method" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">A tray, start to finish</h2>
            <ol className="space-y-3">
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Find a shallow tray.</span> Anything three to five centimetres
                deep will do: a seed tray, a washed mushroom punnet, a takeaway tub.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Give the roots something to hold.</span> A centimetre or two of
                peat-free seed compost, or a growing mat of coir or hemp. Cress will manage on a few layers of damp
                kitchen paper.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Water first, then sow thickly.</span> Seeds close together but
                not heaped, far thicker than you would ever sow outdoors. Press them down. Small seed needs no covering;
                peas and sunflowers, soaked overnight, want a thin layer of compost on top.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Cover for two or three days.</span> An upturned tray or a plate
                keeps the damp in while the seed wakes. Lift it once the shoots are pushing up.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Move it to your brightest windowsill.</span> Turn the tray each
                day so the seedlings don&apos;t lean.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Keep it damp, never wet.</span> Water from underneath, or mist.
                A tray that dries out for a day is usually lost; a tray sitting in water goes sour.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Cut with scissors, just above the surface.</span> Once the seed
                leaves are fully open, or the first true leaves show. Eat them the same day if you can; they keep a few
                days in the fridge.
              </li>
            </ol>
          </section>

          <TipBox title="Pale yellow is normal">
            Seedlings come up yellow, as ours did in the first two photos above, and turn green within a day or two of
            reaching the light. If a tray stays yellow and stretched after that, it wants a brighter spot.
          </TipBox>

          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">Keeping a supply going</h2>
            <p className="mb-3">
              Sow the next tray when the last one turns green. Two trays in rotation give a cut most weeks; three give
              one every few days.
            </p>
            <p>
              This is also where the reassurance comes from. Seed is cheap and light, and stored cool and dry most of it
              stays good for a few years. A drawer with a handful of packets and two trays is never more than a
              fortnight from fresh leaves, in any month.
            </p>
            <aside className="my-8 border-y border-earth/10 py-5" aria-labelledby="microgreens-buyer-note">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-rust mb-2">Buyer note</p>
              <h3 id="microgreens-buyer-note" className="font-serif text-xl text-earth mb-3">
                Worth buying, and worth skipping
              </h3>
              <div className="space-y-4 text-[15px] leading-relaxed">
                <p className="text-earth">
                  <span className="font-serif">Worth buying:</span> seed by weight, in the larger packets sold for
                  sprouting and microgreens. Sown this thickly, an ordinary packet of radish or rocket fills one tray
                  and is gone. We buy ours by the 50 or 100 grams, and a bag lasts for months of trays.
                </p>
                <AffiliateLink
                  href={tm("Sprouting%20Seeds")}
                  product="Sprouting and microgreen seed"
                  type="seed"
                  merchant="thompson-morgan"
                  position="microgreens-buyer-note-sprouting-seed"
                  className="inline-flex min-h-[44px] items-center font-mono text-[10px] uppercase tracking-[0.12em] text-allotment underline decoration-amber/60 underline-offset-4 hover:text-allotment-dark"
                >
                  Sprouting and microgreen seed at Thompson &amp; Morgan &rarr;
                </AffiliateLink>
                <p className="text-earth-light">
                  <span className="font-serif text-earth">Skip the kits and the lights, to begin with.</span> A tray and
                  a windowsill grow everything on this page.
                </p>
                <p className="text-earth-light">
                  <span className="font-serif text-earth">The free version:</span> a washed punnet, kitchen paper, and a
                  box of dried marrowfat peas from the supermarket shelf. Soaked overnight, they make pea shoots for
                  pennies.
                </p>
              </div>
            </aside>
          </section>

          <SectionDivider label="When it goes wrong" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">Four common troubles</h2>
            <ul className="space-y-3">
              <li className="border-l-2 border-amber/60 pl-4">
                <span className="font-serif text-earth">Tall, thin and falling over.</span> Not enough light. Move the
                tray to a brighter sill and cut a little earlier. In December and January, expect shorter shoots and
                call it a win.
              </li>
              <li className="border-l-2 border-amber/60 pl-4">
                <span className="font-serif text-earth">White fuzz at the base.</span> Usually root hairs, which are fine
                and fresh: they sit close around each root and vanish when misted. Mould is a grey web that spreads
                across the surface and smells musty. For mould, water less, give the tray more air, and sow a little
                thinner next time.
              </li>
              <li className="border-l-2 border-amber/60 pl-4">
                <span className="font-serif text-earth">Patchy, with bare gaps.</span> The tray dried out while the seed
                was waking, or the seed is old. Keep the cover on for those first days.
              </li>
              <li className="border-l-2 border-amber/60 pl-4">
                <span className="font-serif text-earth">Slimy, or a sour smell.</span> Too wet. Compost the lot, wash
                the tray in hot soapy water, and start again with less.
              </li>
            </ul>
          </section>

          <SectionDivider label="Herbs" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">Herbs in pots on the sill</h2>
            <p className="mb-3">
              Herbs are the longer game: a pot that is cut from for months, not a tray that is cleared in a fortnight.
              Five earn a windowsill.
            </p>
            <ul className="space-y-3 mb-3">
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Chives</span> &mdash; the easiest. Cut a handful down to a couple
                of centimetres and they grow back.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <Link href="/crops/parsley" className="font-serif text-earth underline decoration-amber/45 underline-offset-4 hover:text-allotment">Parsley</Link>{" "}
                &mdash; slow to appear, often three or four weeks, then steady for months. Pick the outer stems.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <Link href="/crops/coriander" className="font-serif text-earth underline decoration-amber/45 underline-offset-4 hover:text-allotment">Coriander</Link>{" "}
                &mdash; runs to seed quickly, so treat it as a short crop and sow a fresh pinch every three or four
                weeks.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <Link href="/crops/basil" className="font-serif text-earth underline decoration-amber/45 underline-offset-4 hover:text-allotment">Basil</Link>{" "}
                &mdash; wants warmth and strong light. Easy from April to September, hard work in winter.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Mint</span> &mdash; in a pot of its own, always. It crowds out
                anything it shares with.
              </li>
            </ul>
            <p className="mb-3">
              A supermarket pot of basil or parsley is dozens of seedlings crammed into one pot, which is why it
              collapses within a week. Tip it out, pull it gently into three or four clumps, and give each its own pot
              of fresh compost. They last far longer.
            </p>
            <p>
              Be honest with yourself about winter. From November to January a British windowsill has very little light,
              and potted herbs only tick over. That is the season for trays: micro salads are cut before the low light
              has time to matter.
            </p>
          </section>

          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-serif text-lg text-earth mb-1.5">{faq.q}</h3>
                  <p className="text-[15px]">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/guides/growing-winter-salad-leaves" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Growing winter salad leaves</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/seed-starting" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to start seeds</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/growing-veg-in-containers" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Growing veg in containers</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/sow" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What to sow outdoors this week</span>
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
