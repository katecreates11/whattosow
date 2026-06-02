import type { Metadata } from "next";
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

export default function TomatoBlightGuide() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Header />

      <main id="main-content">
        {/* Title */}
        <section className="px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20 pb-8">
          <div className="max-w-3xl mx-auto">
            <div className="font-serif italic text-lg text-allotment mb-2">guide</div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-earth leading-[0.95]">
              Tomato &amp; potato blight
            </h1>
            <p className="font-serif italic text-xl text-earth-light max-w-[44ch] mt-4 leading-snug">
              The fastest way to lose a tomato crop &mdash; and the one weather pattern that gives it away. We watch the
              conditions for your plot, so you don&apos;t have to.
            </p>
          </div>
        </section>

        {/* Live risk */}
        <section className="px-6 sm:px-10 lg:px-16 pb-14">
          <div className="max-w-3xl mx-auto">
            <BlightRisk variant="full" />
          </div>
        </section>

        {/* What it is */}
        <section className="px-6 sm:px-10 lg:px-16 py-12 border-t border-earth/10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-4">What blight actually is</h2>
            <p className="text-earth-light leading-relaxed mb-4">
              Late blight is a water mould, <em>Phytophthora infestans</em> &mdash; the same disease behind the Irish
              potato famine. It spreads on warm, wet, humid air. Spores land on a leaf, and if it stays damp long
              enough they germinate and push into the plant. Within days you see brown, water-soaked patches on leaves
              and stems, often with a faint white fuzz underneath, and then the fruit goes too.
            </p>
            <p className="text-earth-light leading-relaxed">
              Outdoor tomatoes and maincrop potatoes are most at risk. Once it takes hold there is no cure &mdash; the
              whole game is spotting the conditions early and slowing it down.
            </p>
          </div>
        </section>

        {/* Hutton Criteria */}
        <section className="px-6 sm:px-10 lg:px-16 py-12 bg-ochre">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-4">The Hutton Criteria</h2>
            <p className="text-earth-light leading-relaxed mb-5">
              Since 2017, the UK has used the <strong>Hutton Criteria</strong> &mdash; developed by the James Hutton
              Institute and AHDB &mdash; to predict blight pressure. It&apos;s pleasingly simple. A high-risk{" "}
              <em>Hutton Period</em> is flagged when you get:
            </p>
            <div className="border-l-4 border-tomato bg-cream/60 p-5 sm:p-6 mb-5">
              <p className="font-serif text-xl text-earth leading-snug">
                Two consecutive days, each with a minimum temperature of <strong>10&deg;C</strong> and at least{" "}
                <strong>six hours</strong> of relative humidity at or above <strong>90%</strong>.
              </p>
            </div>
            <p className="text-earth-light leading-relaxed">
              That&apos;s warm, muggy, won&apos;t-quite-dry-out weather, two days running. When that happens near you,
              the indicator above turns red. It&apos;s the same model the commercial growers watch &mdash; we just point
              it at your postcode.
            </p>
          </div>
        </section>

        {/* What to do */}
        <section className="px-6 sm:px-10 lg:px-16 py-12 border-t border-earth/10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-6">When risk is high</h2>
            <ol className="space-y-5">
              {[
                ["Improve airflow", "Take off the lowest leaves, space plants out, and open up the greenhouse or cloche on warm days. Moving air dries leaves and starves the spores."],
                ["Keep water off the foliage", "Water at the base, in the morning, never over the leaves. Wet leaves overnight are exactly what blight wants."],
                ["Check, then remove and bin", "Look over plants every day. Cut off any leaf or stem with brown blotches and bin it — household waste, not the compost heap, which would just spread it."],
                ["Harvest ahead of it", "If blight is taking hold, pick every usable green tomato and ripen them indoors. For potatoes, cut off the foliage (haulms) to stop spores reaching the tubers, and lift after a couple of weeks."],
              ].map(([h, b], i) => (
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
        </section>

        {/* Resistant varieties */}
        <section className="px-6 sm:px-10 lg:px-16 py-12 bg-sage">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-4">Grow resistant varieties</h2>
            <p className="text-earth-light leading-relaxed mb-4">
              The surest defence is to grow varieties bred to shrug blight off. They&apos;re not immortal, but in a bad
              year they keep cropping while everything around them collapses.
            </p>
            <ul className="space-y-3 text-earth-light leading-relaxed">
              <li>
                <strong className="text-earth">Tomatoes:</strong> Crimson Crush, Mountain Magic and Ferline are the
                go-to blight-resistant outdoor varieties.
              </li>
              <li>
                <strong className="text-earth">Potatoes:</strong> the Sarpo family (Sarpo Mira, Sarpo Axona) is famously
                tough.
              </li>
            </ul>
            <div className="mt-5 flex gap-5 flex-wrap font-serif italic text-allotment">
              <a href="/crops/tomatoes" className="border-b border-amber pb-0.5">Tomato varieties &rarr;</a>
              <a href="/crops/potatoes" className="border-b border-amber pb-0.5">Potato varieties &rarr;</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
