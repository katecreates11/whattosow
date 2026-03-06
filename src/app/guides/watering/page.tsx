import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TipBox, WarningBox } from "@/components/GuideVisuals";

export const metadata: Metadata = {
  title:
    "Watering Vegetables — A Practical UK Guide | What To Sow",
  description:
    "Learn how to water your vegetable garden properly. Covers when to water, how much, crop-by-crop needs, mulching, water butts, and signs of overwatering. Practical UK allotment advice.",
  keywords: [
    "watering vegetables UK",
    "how often to water allotment",
    "watering tomatoes",
    "overwatering plants",
    "water butt allotment",
    "watering courgettes",
    "mulching vegetables",
    "watering seedlings",
    "hosepipe ban garden",
    "container watering",
  ],
  openGraph: {
    title: "Watering Vegetables — A Practical UK Guide",
    description:
      "How to water your veg properly: when, how much, and which crops need what. Plus mulching, water butts, and dealing with hosepipe bans.",
    type: "article",
    url: "https://whattosow.co.uk/guides/watering",
  },
  alternates: {
    canonical: "/guides/watering",
  },
};

export default function WateringGuide() {
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
        name: "Watering Vegetables",
        item: "https://whattosow.co.uk/guides/watering",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How often should I water my vegetable garden?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most established vegetables do best with a thorough soak two to three times a week rather than a light sprinkle every day. Deep watering encourages roots to grow downwards, making plants more drought-resistant. Seedlings and containers need watering more often — sometimes daily in hot weather.",
        },
      },
      {
        "@type": "Question",
        name: "Is it better to water in the morning or evening?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evening watering loses less to evaporation because the sun is low and temperatures are cooler. Morning watering is also fine and has the advantage of letting foliage dry during the day, which can reduce fungal diseases. The honest answer is that the best time to water is whenever you can — consistency matters more than timing.",
        },
      },
      {
        "@type": "Question",
        name: "How do I tell if I'm overwatering my vegetables?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Overwatered plants often have yellowing lower leaves, mushy stems near the soil line, and soil that stays constantly soggy. You might also see fungal growth on the surface or notice a sour smell from the compost. The soil should feel moist a few centimetres down, not waterlogged.",
        },
      },
      {
        "@type": "Question",
        name: "Do tomatoes need a lot of water?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tomatoes are thirsty crops, especially once they start setting fruit. They need consistent, deep watering — irregular watering is the main cause of blossom end rot and fruit splitting. Water at the base of the plant, not the leaves, and try to keep the amount steady rather than alternating between drought and flood.",
        },
      },
      {
        "@type": "Question",
        name: "Should I use a water butt on my allotment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. A water butt collects rainwater from shed or greenhouse roofs and gives you a free, reliable supply that's actually better for plants than tap water — it's at ambient temperature and free of chlorine. A 200-litre butt costs around £25-40 and pays for itself quickly, especially during hosepipe bans.",
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
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 block">
          Growing guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-4">
          Watering vegetables
        </h1>
        <p className="text-earth-light leading-relaxed mb-10">
          Watering sounds simple enough, but getting it wrong causes more
          problems than most people realise. Blossom end rot on{" "}
          <a href="/crops/tomatoes" className="text-allotment hover:text-allotment-dark underline decoration-allotment/30">tomatoes</a>,
          bolting lettuce, split carrots &mdash; half the time the culprit
          is inconsistent watering. Here&apos;s how to do it properly.
        </p>

        <div className="space-y-12 text-earth-light leading-relaxed">
          {/* Why it matters */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Why watering matters more than you think
            </h2>
            <div className="space-y-3">
              <p>
                Plants can cope with a lot &mdash; poor soil, a bit of shade,
                even the odd pest. But erratic watering throws everything off.
                When the soil swings between bone dry and soaking wet, roots
                can&apos;t take up calcium properly (hello, blossom end rot),
                skins harden then crack when water finally arrives, and leafy
                crops panic and bolt to seed before you&apos;ve had a single
                harvest.
              </p>
              <p>
                The goal isn&apos;t to water constantly. It&apos;s to water
                consistently. Get that right and you&apos;ll solve half the
                problems on your plot without even trying.
              </p>
            </div>
          </section>

          {/* When to water */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              When to water: morning vs evening
            </h2>
            <div className="space-y-3">
              <p>
                There&apos;s a long-running debate about this. Evening watering
                loses less to evaporation because the sun is low and the air is
                cooler &mdash; more of the water reaches the roots. Morning
                watering has the advantage of letting foliage dry during the day,
                which can reduce fungal problems like blight and mildew.
              </p>
              <p>
                The honest answer? The best time to water is whenever you
                actually can. If you only get to the allotment after work, water
                in the evening. If you&apos;re an early riser, water in the
                morning. Consistency beats timing every time.
              </p>
            </div>
            <TipBox title="Avoid midday watering">
              Not because it &quot;burns leaves&quot; (that&apos;s largely a myth)
              but because so much evaporates before it reaches the roots that
              you&apos;re wasting water and effort.
            </TipBox>
          </section>

          {/* How much */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              How much water: the &quot;good soak, less often&quot; principle
            </h2>
            <div className="space-y-3">
              <p>
                A light sprinkle every day is worse than a thorough soak two or
                three times a week. Why? Shallow watering keeps roots near the
                surface where they dry out fastest. Deep watering encourages
                roots to grow downwards, where the soil stays moist for longer.
                The plant becomes more resilient and you water less overall.
              </p>
              <p>
                As a rough guide, aim for enough water to soak the top 15&ndash;20cm
                of soil. That&apos;s about a full watering can (10 litres) per
                square metre. Push your finger into the soil a few hours after
                watering &mdash; if it&apos;s moist a knuckle deep, you&apos;re
                doing fine.
              </p>
            </div>
          </section>

          {/* Crop needs */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              What different crops need
            </h2>
            <p className="mb-6">
              Not all vegetables are equally thirsty. Knowing which crops need
              the most attention saves time and water.
            </p>

            <div className="grid gap-4">
              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">Thirsty crops</h3>
                <p className="text-sm">
                  <a href="/crops/tomatoes" className="text-allotment hover:text-allotment-dark underline decoration-allotment/30">Tomatoes</a>,{" "}
                  <a href="/crops/courgette" className="text-allotment hover:text-allotment-dark underline decoration-allotment/30">courgettes</a>,{" "}
                  <a href="/crops/runner-beans" className="text-allotment hover:text-allotment-dark underline decoration-allotment/30">runner beans</a>,{" "}
                  <a href="/crops/cucumber" className="text-allotment hover:text-allotment-dark underline decoration-allotment/30">cucumbers</a>,
                  and celery. These need consistent, deep watering throughout
                  the growing season, especially once they start flowering and
                  fruiting. Tomatoes in particular &mdash; irregular watering
                  is the number one cause of blossom end rot and split fruit.
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">Moderate needs</h3>
                <p className="text-sm">
                  Peas, broad beans, lettuce, and spinach. These need regular
                  watering but can tolerate a slightly less rigid schedule than
                  the thirsty group. Lettuce and spinach will bolt in hot, dry
                  spells though, so keep an eye on them in summer.
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">
                  Drought-tolerant once established
                </h3>
                <p className="text-sm">
                  Carrots, parsnips, onions, and garlic. Once these are up and
                  growing, their roots go deep and they cope well with drier
                  conditions. In fact, overwatering onions and garlic can cause
                  rot. Water them in well when you plant, then ease off unless
                  it&apos;s genuinely bone dry.
                </p>
              </div>
            </div>
          </section>

          {/* Seedlings vs established */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Seedlings vs established plants
            </h2>
            <div className="space-y-3">
              <p>
                Seedlings are the exception to the &quot;deep soak, less
                often&quot; rule. Their roots are tiny and shallow, so they
                dry out fast. Water seedlings little and often &mdash;
                sometimes twice a day in hot weather &mdash; using a fine
                rose on your watering can so you don&apos;t flatten them.
              </p>
              <p>
                Once plants are established and growing strongly, switch to
                deeper, less frequent watering to encourage those roots
                downwards. The transition usually happens a few weeks after
                transplanting, once you can see new growth coming through.
              </p>
            </div>
            <WarningBox title="Newly transplanted seedlings">
              Water them in thoroughly when you plant them out, then keep the
              soil moist for the first week or two while roots establish. After
              that, gradually reduce frequency. See our{" "}
              <a href="/guides/seed-starting" className="text-allotment hover:text-allotment-dark underline decoration-allotment/30">seed starting guide</a>{" "}
              for more on raising strong seedlings.
            </WarningBox>
          </section>

          {/* Mulching */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Mulching: the single best thing you can do
            </h2>
            <div className="space-y-3">
              <p>
                If you take one thing from this guide, make it this: mulch
                your beds. A 5cm layer of compost, straw, or grass clippings
                on the soil surface massively reduces evaporation, keeps roots
                cool in summer, and suppresses weeds into the bargain.
              </p>
              <p>
                On a hot day, unmulched soil can lose litres of water to
                evaporation. Mulched soil stays moist for days longer. It&apos;s
                free if you use your own compost or grass clippings, and it
                improves the{" "}
                <a href="/guides/soil" className="text-allotment hover:text-allotment-dark underline decoration-allotment/30">soil</a>{" "}
                as it breaks down. Apply it after watering, once the soil is
                already moist.
              </p>
            </div>
          </section>

          {/* Water butts */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Water butts: every allotment should have one
            </h2>
            <div className="space-y-3">
              <p>
                A basic 200-litre water butt costs &pound;25&ndash;40 and
                connects to the downpipe of any shed, greenhouse, or polytunnel
                roof. Rainwater is actually better for plants than tap water
                &mdash; it&apos;s at ambient temperature (no cold shock) and
                free of chlorine.
              </p>
              <p>
                Position it on a few stacked bricks or a stand so you can fit
                a watering can underneath the tap. If you have the space, chain
                two butts together with an overflow connector &mdash; you&apos;ll
                be amazed how quickly they fill during a proper British
                downpour.
              </p>
            </div>
          </section>

          {/* Over vs underwatering */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Overwatering vs underwatering: how to tell
            </h2>

            <div className="grid gap-4">
              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">Signs of underwatering</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Wilting in the afternoon (recovers overnight in mild cases)</li>
                  <li>Dry, crispy leaf edges</li>
                  <li>Slow growth and small fruit</li>
                  <li>Soil pulls away from the edges of pots</li>
                  <li>Flowers dropping without setting fruit</li>
                </ul>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">Signs of overwatering</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Yellowing lower leaves</li>
                  <li>Mushy stems near the soil line</li>
                  <li>Soil stays constantly soggy or smells sour</li>
                  <li>Fungal growth or green algae on the compost surface</li>
                  <li>Roots that are brown and soft rather than white and firm</li>
                </ul>
              </div>
            </div>

            <p className="text-sm mt-4">
              When in doubt, stick your finger into the soil. If it&apos;s moist
              a few centimetres down, hold off. If it&apos;s dry, water. Simple
              as that.
            </p>
          </section>

          {/* Containers */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Container growing needs more water
            </h2>
            <div className="space-y-3">
              <p>
                Pots and grow bags dry out far faster than open ground. The
                roots have nowhere to go and the container itself heats up
                in the sun. In midsummer, containers may need watering
                twice a day &mdash; once in the morning, once in the evening.
              </p>
              <p>
                Bigger pots dry out more slowly, so go as large as you can.
                Self-watering pots with a reservoir at the bottom are
                genuinely useful if you can&apos;t water daily. And yes,
                mulch the surface of your pots too &mdash; it makes a real
                difference.
              </p>
            </div>
          </section>

          {/* Hosepipe bans */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Hosepipe bans and saving water
            </h2>
            <div className="space-y-3">
              <p>
                Hosepipe bans are a regular feature of UK summers,
                particularly in the South East. Even when there isn&apos;t a
                ban, being water-wise is just good practice.
              </p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-earth-light mt-3">
              <li>
                <strong className="text-earth">Water butts</strong> &mdash;
                your first line of defence. Rainwater isn&apos;t affected by
                hosepipe bans.
              </li>
              <li>
                <strong className="text-earth">Grey water</strong> &mdash;
                washing-up water (without bleach or strong detergent) is fine
                for most crops. Let it cool first and don&apos;t use it on
                seedlings.
              </li>
              <li>
                <strong className="text-earth">Mulch everything</strong> &mdash;
                reduces evaporation by up to 70%.
              </li>
              <li>
                <strong className="text-earth">Water at the base</strong> &mdash;
                direct water to roots, not leaves. A watering can is more
                efficient than a sprinkler.
              </li>
              <li>
                <strong className="text-earth">Prioritise</strong> &mdash;
                in a drought, focus water on fruiting crops and seedlings.
                Established root veg and alliums can tough it out.
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-xl font-semibold text-earth mb-6">
              Common questions
            </h2>
            <div className="space-y-6">
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  How often should I water my vegetable garden?
                </h3>
                <p className="text-sm">
                  Most established vegetables do best with a thorough soak two
                  to three times a week rather than a light sprinkle every day.
                  Seedlings and containers need more frequent attention &mdash;
                  sometimes daily in hot weather. Push your finger into the soil:
                  if it&apos;s dry a few centimetres down, water.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  Is it better to water in the morning or evening?
                </h3>
                <p className="text-sm">
                  Evening watering loses less to evaporation. Morning watering
                  lets foliage dry during the day, reducing fungal risk. Both
                  are fine &mdash; the best time is whenever you can do it
                  consistently.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  How do I tell if I&apos;m overwatering?
                </h3>
                <p className="text-sm">
                  Yellowing lower leaves, mushy stems near the soil, constantly
                  soggy compost, and a sour smell are all signs of overwatering.
                  The soil should feel moist a few centimetres down, not
                  waterlogged. If in doubt, wait a day before watering again.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  Do tomatoes need a lot of water?
                </h3>
                <p className="text-sm">
                  Yes &mdash; tomatoes are one of the thirstiest crops,
                  especially once they start setting fruit. The key is
                  consistency: irregular watering causes blossom end rot and
                  split fruit. Water at the base, keep the amount steady, and
                  mulch around the stems.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  Should I use a water butt on my allotment?
                </h3>
                <p className="text-sm">
                  Without question. A 200-litre butt costs &pound;25&ndash;40,
                  gives you free rainwater that&apos;s actually better for plants
                  than tap water, and isn&apos;t affected by hosepipe bans.
                  It&apos;s one of the best investments you can make on a plot.
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
                href="/guides/soil"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Understanding your soil &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Good soil holds water better. Start here.
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
                  What to grow together and what to keep apart.
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
                  Get seedlings off to a strong start.
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
