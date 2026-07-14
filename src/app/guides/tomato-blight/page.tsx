import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlightRisk from "@/components/BlightRisk";

export const metadata: Metadata = {
  title: "Tomato & Potato Blight — Live Hutton Criteria Risk by Postcode | What To Sow",
  description:
    "When is blight likely? We compute the Hutton Criteria live for your location — plus how to spot late blight, what to do when risk is high, and the resistant varieties worth growing.",
  keywords: [
    "tomato blight",
    "potato blight",
    "late blight",
    "Hutton Criteria",
    "blight warning UK",
    "Phytophthora infestans",
    "blight resistant tomatoes",
  ],
  alternates: { canonical: "/guides/tomato-blight" },
  openGraph: {
    title: "Tomato & Potato Blight — live risk for your postcode",
    description:
      "Live Hutton Criteria blight risk for your location, plus how to prevent and manage late blight.",
    type: "article",
    url: "https://whattosow.co.uk/guides/tomato-blight",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tomato & potato blight: live risk and how to beat it",
  description:
    "How late blight works, the Hutton Criteria for predicting it, and what to do when conditions turn ripe.",
  about: "Late blight (Phytophthora infestans) of tomatoes and potatoes",
  publisher: { "@type": "Organization", name: "What To Sow" },
};

const STEPS: [string, string][] = [
  ["Improve airflow", "Take off the lowest leaves, space plants out, and open up the greenhouse or cloche on warm days. Moving air dries leaves and starves the spores."],
  ["Keep water off the foliage", "Water at the base, in the morning, never over the leaves. Wet leaves overnight are exactly what blight wants."],
  ["Check, then remove and bin", "Look over plants every day. Cut off any leaf or stem with brown blotches and bin it — household waste, not the compost heap, which would just spread it."],
  ["Harvest ahead of it", "If blight takes hold, pick every usable green tomato and ripen them indoors. For potatoes, cut off the foliage (haulms) to stop spores reaching the tubers, then lift after a couple of weeks."],
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
    { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
    { "@type": "ListItem", position: 3, name: "Tomato & Potato Blight", item: "https://whattosow.co.uk/guides/tomato-blight" },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to prevent and beat tomato & potato blight",
  description: "Practical steps to stop late blight taking hold outdoors, and what to do if it strikes.",
  step: STEPS.map(([name, text], i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name,
    text,
  })),
};

export default function TomatoBlightGuide() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <Header />

      <main id="main-content">
        {/* Full-bleed hero */}
        <div className="relative h-[62vh] min-h-[420px] overflow-hidden">
          <Image
            src="/photos/crops/tomatoes-cherry-on-vine.webp"
            alt="Ripening tomatoes on the vine"
            fill
            priority
            sizes="100vw"
            className="object-cover img-grade"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(20,40,30,0.1)] via-transparent to-[rgba(20,40,30,0.7)]" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto w-full px-6 sm:px-10 lg:px-16 pb-12">
              <div className="font-serif italic text-lg text-leaf-light mb-2">guide · problem solving</div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[0.95] max-w-[16ch]">
                Tomato &amp; potato blight
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-white/85 max-w-[44ch] mt-4 leading-snug">
                The fastest way to lose a tomato crop &mdash; and the one weather pattern that gives it away.
              </p>
            </div>
          </div>
        </div>

        {/* Live risk */}
        <section className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto">
            <div className="font-serif italic text-lg text-allotment mb-4">right now, for your plot</div>
            <BlightRisk variant="full" />
          </div>
        </section>

        {/* What it is — text + image */}
        <section className="px-6 sm:px-10 lg:px-16 py-12 border-t border-earth/10">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-4">What blight actually is</h2>
              <p className="text-earth-light leading-relaxed mb-4">
                Late blight is a water mould, <em>Phytophthora infestans</em> &mdash; the same disease behind the Irish
                potato famine. It spreads on warm, wet, humid air. Spores land on a leaf, and if it stays damp long
                enough they germinate and push into the plant. Within days you see brown, water-soaked patches, often
                with a faint white fuzz beneath, and then the fruit goes too.
              </p>
              <p className="text-earth-light leading-relaxed">
                Outdoor tomatoes and maincrop potatoes are most at risk. Once it takes hold there is no cure &mdash; the
                whole game is spotting the conditions early and slowing it down.
              </p>
            </div>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/photos/crops/tomatoes-ripening-close-up.webp"
                  alt="Tomatoes ripening on a healthy plant"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover img-grade"
                />
              </div>
              <figcaption className="font-mono text-[10px] uppercase tracking-[0.08em] text-earth-light/70 mt-2">
                Outdoor tomatoes are the classic casualty.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Hutton Criteria — pull quote */}
        <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 bg-ochre">
          <div className="max-w-3xl mx-auto">
            <div className="font-serif italic text-lg text-allotment mb-3">the science</div>
            <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-5">The Hutton Criteria</h2>
            <p className="text-earth-light leading-relaxed mb-7">
              Since 2017 the UK has used the <strong>Hutton Criteria</strong> &mdash; developed by the James Hutton
              Institute and AHDB &mdash; to predict blight pressure. It is pleasingly simple. A high-risk{" "}
              <em>Hutton Period</em> is flagged when you get:
            </p>
            <blockquote className="border-l-4 border-tomato pl-6 sm:pl-8">
              <p className="font-serif text-2xl sm:text-3xl text-earth leading-[1.25]">
                Two consecutive days, each with a minimum temperature of 10&deg;C and at least six hours of relative
                humidity at or above 90%.
              </p>
            </blockquote>
            <p className="text-earth-light leading-relaxed mt-7">
              That is warm, muggy, won&apos;t-quite-dry-out weather, two days running. When it happens near you, the
              indicator above turns red &mdash; the same model the commercial growers watch, pointed at your postcode.
            </p>
          </div>
        </section>

        {/* When risk is high — steps + image */}
        <section className="px-6 sm:px-10 lg:px-16 py-14 border-t border-earth/10">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-6">When risk is high</h2>
              <ol className="space-y-5">
                {STEPS.map(([h, b], i) => (
                  <li key={i} className="grid grid-cols-[44px_1fr] gap-4 items-baseline">
                    <span className="font-serif text-3xl text-amber leading-none">{i + 1}</span>
                    <div>
                      <h3 className="font-serif text-xl text-earth mb-1">{h}</h3>
                      <p className="text-earth-light leading-relaxed">{b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="md:pt-12">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/photos/blog/potatoes-june-allotment.webp"
                  alt="Potato foliage growing in an allotment bed"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover img-grade"
                />
              </div>
              <figcaption className="font-mono text-[10px] uppercase tracking-[0.08em] text-earth-light/70 mt-2">
                Cut potato haulms early and the tubers keep clean below.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Resistant varieties — image + text */}
        <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 bg-sage">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <figure className="md:order-2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/photos/crops/tomato-seedlings-tray.webp"
                  alt="Young tomato seedlings ready to grow on"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover img-grade"
                />
              </div>
              <figcaption className="font-mono text-[10px] uppercase tracking-[0.08em] text-earth-light/70 mt-2">
                Start a resistant variety and you have already won half the battle.
              </figcaption>
            </figure>
            <div className="md:order-1">
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-4">Grow resistant varieties</h2>
              <p className="text-earth-light leading-relaxed mb-4">
                The surest defence is to grow varieties bred to shrug blight off. They are not immortal, but in a bad
                year they keep cropping while everything around them collapses.
              </p>
              <ul className="space-y-3 text-earth-light leading-relaxed">
                <li>
                  <strong className="text-earth">Tomatoes:</strong> Crimson Crush, Mountain Magic and Ferline are the
                  go-to blight-resistant outdoor varieties.
                </li>
                <li>
                  <strong className="text-earth">Potatoes:</strong> the Sarpo family (Sarpo Mira, Sarpo Axona) is
                  famously tough.
                </li>
              </ul>
              <div className="mt-6 flex gap-5 flex-wrap font-serif italic text-allotment">
                <a href="/crops/tomatoes" className="border-b border-amber pb-0.5">Tomato varieties &rarr;</a>
                <a href="/crops/potatoes" className="border-b border-amber pb-0.5">Potato varieties &rarr;</a>
                <a href="/blight-watch" className="border-b border-amber pb-0.5">Live blight risk map &rarr;</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
