import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateLink from "@/components/AffiliateLink";
import DaylightArc from "@/components/DaylightArc";
import DaylightSwing from "@/components/DaylightSwing";
import DaylightMap from "@/components/DaylightMap";
import LocalisePostcode from "@/components/LocalisePostcode";
import SunPathDemo from "@/components/SunPathDemo";

export const metadata: Metadata = {
  title: "The Longest Day — Midsummer in the UK Garden | What To Sow",
  description:
    "The summer solstice is the longest day of the year. See how much daylight you get where you are — and why midsummer is the moment to start sowing for autumn and winter.",
  keywords: [
    "longest day UK",
    "summer solstice garden",
    "midsummer gardening UK",
    "what to sow in June",
    "sowing for autumn and winter",
    "daylight hours solstice UK",
  ],
  openGraph: {
    title: "The Longest Day — Midsummer in the UK Garden",
    description:
      "How much daylight you get on the solstice, and what to sow as the year quietly turns.",
    type: "article",
    locale: "en_GB",
    url: "https://whattosow.co.uk/longest-day",
    images: [
      {
        url: "/photos/longest-day/sunset-allotment-beds.webp",
        width: 2200,
        height: 2933,
        alt: "A blazing sunset over the allotment's raised beds on the longest day",
      },
    ],
  },
  alternates: { canonical: "/longest-day" },
};

export default function LongestDayPage() {
  const cropLink = "text-rust hover:text-earth transition-colors underline decoration-rust/30";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Longest Day — Midsummer in the UK Garden",
    description:
      "The summer solstice is the longest day of the year. See how much daylight you get where you are, and what to sow for autumn and winter as the year turns.",
    about: "Summer solstice and midsummer vegetable gardening in the UK",
    url: "https://whattosow.co.uk/longest-day",
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: "What To Sow",
      url: "https://whattosow.co.uk",
    },
  };
  const faqs = [
    {
      q: "When is the longest day in the UK?",
      a: "The summer solstice, around 21 June each year — the day with the most daylight and the shortest night. After it, the days slowly begin to draw in again.",
    },
    {
      q: "How much daylight is there on the longest day?",
      a: "It depends where you are: roughly 16 hours 15 minutes in the far south-west of England, and over 18 hours 30 minutes up in Shetland. Add your postcode for your own exact figure.",
    },
    {
      q: "What should you sow at midsummer?",
      a: "Keep quick crops coming with successions of salad, beetroot and beans, and start the hardy crops for autumn and winter — kale, leeks, chard and spring cabbage all want sowing now.",
    },
  ];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header backLink={{ href: "/", label: "← Home" }} />

      <main id="main-content">
        {/* A real midsummer sunset over the plot */}
        <section className="relative h-[64vh] min-h-[500px] overflow-hidden">
          <Image
            src="/photos/longest-day/sunset-allotment-beds.webp"
            alt="A blazing orange and pink sunset over the allotment's raised beds on the longest evening of the year"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_42%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-allotment-dark/88 via-allotment-dark/20 to-allotment-dark/15"
            aria-hidden="true"
          />
          <div className="relative h-full max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-end pb-12 sm:pb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-light block mb-4">
              Midsummer &middot; around 21 June
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.9] mb-5">
              The longest day
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-white/85 leading-snug max-w-[46ch]">
              The sun climbs to its highest, the light stretches as far as it will go all year &mdash; and
              then, so quietly you&apos;d never notice, the year begins to lean back towards winter.
            </p>
          </div>
        </section>

        <div className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto">
            <DaylightArc />

            <LocalisePostcode />

            <p className="mt-12 font-serif text-2xl sm:text-3xl text-earth leading-snug tracking-tight max-w-[32ch]">
              That&apos;s the most light you&apos;ll get all year &mdash; and far further from the dark months than you might think.
            </p>

            <div className="mt-8">
              <DaylightSwing />
            </div>

            <p className="mt-12 text-earth-light leading-relaxed max-w-[60ch]">
              How long that longest day runs comes down entirely to how far north you stand &mdash; pale gold
              in the south, deep gold up north. Click anywhere on the map for that spot&apos;s sunrise, sunset
              and daylight.
            </p>

            <div className="mt-8">
              <DaylightMap />
            </div>

            <section className="mt-14 grid sm:grid-cols-[1fr_0.72fr] gap-8 sm:gap-12 items-center">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-3">
                  The year turns here
                </h2>
                <p className="text-earth-light leading-relaxed mb-4 max-w-[58ch]">
                  On the solstice the sun reaches its highest arc across the sky and hangs there, near
                  enough still, for a few days &mdash; the word itself means &ldquo;sun stands still.&rdquo; It&apos;s the
                  peak of the light, the shortest night, the very top of the growing year.
                </p>
                <p className="text-earth-light leading-relaxed max-w-[58ch]">
                  Don&apos;t expect to feel the turn straight away. For a few weeks the days barely shorten
                  &mdash; a minute or two a week, no more. It&apos;s not until August that the evenings visibly
                  draw in and you find yourself reaching for the shed light a little earlier. But the
                  turn has begun, and a good grower plants for it.
                </p>
              </div>
              <figure className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/photos/longest-day/sunset-golden-plot.webp"
                  alt="Golden light flooding the allotment as the midsummer sun sinks"
                  fill
                  sizes="(max-width: 640px) 100vw, 38vw"
                  className="object-cover img-grade"
                />
                <figcaption className="absolute left-2 bottom-2 font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/90 bg-allotment-dark/70 px-2 py-1">
                  the longest evening &middot; our plot
                </figcaption>
              </figure>
            </section>

            <section className="mt-12">
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-3">
                Midsummer in the veg patch
              </h2>
              <p className="text-earth-light leading-relaxed mb-6 max-w-[62ch]">
                The plot is at its fullest now &mdash; but the longest day is also a quiet nudge to think
                ahead. With months of warmth still in the soil, this is the moment to keep the harvests
                rolling and to start sowing the crops that&apos;ll feed you when the light has gone.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="border border-earth/10 bg-leaf-bg p-5">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-allotment mb-3">
                    Keep it coming
                  </h3>
                  <p className="text-sm text-earth-light leading-relaxed mb-3">
                    Sow a short row of something quick every couple of weeks and you&apos;ll never have a
                    gap:{" "}
                    <Link href="/crops/lettuce" className={cropLink}>salad leaves</Link>,{" "}
                    <Link href="/crops/beetroot" className={cropLink}>beetroot</Link>,{" "}
                    <Link href="/crops/french-beans" className={cropLink}>dwarf beans</Link>,{" "}
                    <Link href="/crops/carrots" className={cropLink}>carrots</Link>,{" "}
                    <Link href="/crops/spring-onions" className={cropLink}>spring onions</Link>.
                  </p>
                  <Link href="/guides/succession-sowing" className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">
                    The succession-sowing guide &rarr;
                  </Link>
                </div>
                <div className="border border-earth/10 bg-amber-bg p-5">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber-dark mb-3">
                    Sow for the cold months
                  </h3>
                  <p className="text-sm text-earth-light leading-relaxed mb-3">
                    Now&apos;s the window for the crops that overwinter or crop late:{" "}
                    <Link href="/crops/kale" className={cropLink}>kale</Link>,{" "}
                    <Link href="/crops/leeks" className={cropLink}>leeks</Link>,{" "}
                    <Link href="/crops/swiss-chard" className={cropLink}>chard</Link>,{" "}
                    <Link href="/crops/cabbage" className={cropLink}>cabbage</Link>, and winter salads.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <Link href="/guides/autumn-winter-vegetables" className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">
                      The full guide &rarr;
                    </Link>
                    <AffiliateLink
                      href="https://www.amazon.co.uk/s?k=winter+vegetable+seeds"
                      product="winter vegetable seeds"
                      type="seed"
                      merchant="amazon-uk"
                      position="longest-day-winter-seeds"
                      className="font-mono text-[11px] uppercase tracking-[0.06em] text-rust border-b border-rust/40 hover:text-earth transition-colors"
                    >
                      Winter veg seeds for midsummer sowing &rarr;
                    </AffiliateLink>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-earth-light leading-relaxed max-w-[62ch]">
                And from here the balance tips from sowing towards gathering. As your crops come in, the{" "}
                <Link href="/harvest-planner" className="text-rust hover:text-earth transition-colors underline decoration-rust/30">harvest planner</Link>{" "}
                works out when each is ready for your postcode &mdash; and come autumn, the{" "}
                <Link href="/frost-map" className="text-rust hover:text-earth transition-colors underline decoration-rust/30">frost map</Link>{" "}
                shows how long you&apos;ve got before the cold closes in.
              </p>
              <p className="mt-5 text-sm">
                <Link href="/sow" className="text-rust hover:text-earth transition-colors underline decoration-rust/30">
                  See everything worth sowing this week, tuned to your postcode &rarr;
                </Link>
              </p>
              <div className="mt-10">
                <p className="text-earth-light leading-relaxed max-w-[62ch] mb-1">
                  One quirk of all this high midsummer sun: low at dawn and dusk, it throws long shadows.
                  Keep your tallest crops to the north of the bed so they don&apos;t shade out the rest
                  &mdash; watch how it works.
                </p>
                <SunPathDemo />
              </div>
            </section>

            {/* Common questions — visible content backing the FAQ schema */}
            <section className="mt-14 border-t border-earth/10 pt-10">
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-6">
                Common questions
              </h2>
              <div className="space-y-6 max-w-[64ch]">
                {faqs.map((f) => (
                  <div key={f.q}>
                    <h3 className="font-serif text-lg text-earth mb-1">{f.q}</h3>
                    <p className="text-earth-light leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Full-width sunflower bookend */}
            <section className="mt-16 relative overflow-hidden">
              <div className="relative aspect-[16/10] sm:aspect-[2/1]">
                <Image
                  src="/photos/longest-day/sunset-sunflower.webp"
                  alt="A sunflower standing against a vivid coral midsummer sunset on the allotment"
                  fill
                  sizes="100vw"
                  className="object-cover img-grade"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-allotment-dark/88 via-allotment-dark/30 to-transparent" aria-hidden="true" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber-light block mb-2">
                    A midsummer note
                  </span>
                  <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-white leading-relaxed max-w-[48ch]">
                    Growers have marked this day for as long as there have been growers &mdash; bonfires on
                    the shortest night, the year balanced on its turning point. Stand on the plot on a
                    midsummer evening, with the light going on and on, and you&apos;ll understand exactly
                    why it was worth celebrating.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
