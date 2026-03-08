import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TipBox, WarningBox, StepList, ProcessDiagram, GuideHero, PullQuote, SectionDivider, SeedIcon, BigNumber, GuideImage, ColorSection } from "@/components/GuideVisuals";

export const metadata: Metadata = {
  title:
    "How to Start Seeds UK — Growing from Seed Guide | What To Sow",
  description:
    "Complete beginner's guide to starting seeds in the UK. Seed compost, sowing depth, windowsill growing, hardening off, and which crops to start indoors vs direct sow.",
  keywords: [
    "how to start seeds UK",
    "growing from seed indoors",
    "seed starting for beginners",
    "when to start seeds UK",
    "seed compost",
    "hardening off",
    "sowing seeds indoors UK",
    "seed starting guide",
  ],
  openGraph: {
    title: "How to Start Seeds — Growing from Seed Guide",
    description:
      "Everything you need to know about starting seeds in the UK. Practical advice from compost to hardening off.",
    type: "article",
    url: "https://whattosow.co.uk/guides/seed-starting",
  },
  alternates: {
    canonical: "/guides/seed-starting",
  },
};

export default function SeedStartingGuide() {
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
        name: "Seed Starting",
        item: "https://whattosow.co.uk/guides/seed-starting",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When should I start seeds indoors in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on the crop. Tomatoes, peppers, and aubergines need starting indoors in February or March. Courgettes and squash can wait until April. Hardy crops like broad beans and peas are usually better direct-sown outdoors. Check your local last frost date and count back from there.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need seed compost or can I use multi-purpose?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Seed compost is finer and lower in nutrients, which suits seedlings better. Multi-purpose compost can work but it's often too chunky and rich for tiny seeds. For anything small-seeded like lettuce or tomatoes, seed compost makes a real difference. For larger seeds like beans or squash, multi-purpose is fine.",
        },
      },
      {
        "@type": "Question",
        name: "How deep should I sow seeds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The general rule is twice the depth of the seed's size. Tiny seeds like lettuce and celery sit on the surface with a light dusting of vermiculite. Medium seeds like tomatoes go about 1cm deep. Large seeds like beans and squash go 2-3cm deep.",
        },
      },
      {
        "@type": "Question",
        name: "What is hardening off and why does it matter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hardening off is gradually acclimatising indoor-grown seedlings to outdoor conditions over 7-10 days. Plants grown indoors have soft growth that can't handle wind, cold, or direct sun. Without hardening off, transplanted seedlings often get scorched, wilted, or stunted. Start by putting them outside for a couple of hours in a sheltered spot, increasing the time each day.",
        },
      },
      {
        "@type": "Question",
        name: "Why are my seedlings tall and spindly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leggy seedlings are almost always caused by insufficient light. On a windowsill, seedlings stretch towards the glass. Rotate your trays daily and choose the brightest south-facing window you have. If they're still leggy, they may need more hours of light than your windowsill provides — consider a cheap grow light or wait until you can sow later in spring when daylight hours are longer.",
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
          title="How to start seeds"
          subtitle="The cheapest, most satisfying way to fill your plot. Here's everything you need to know."
          icon={<SeedIcon className="w-10 h-10" />}
          color="allotment"
        />

        <div className="space-y-12 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Why grow from seed */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Why grow from seed
            </h2>
            <div className="space-y-3">
              <p>
                A packet of seeds costs a couple of quid and contains enough to
                fill a bed. The equivalent as plug plants would cost ten times
                that. But price isn&apos;t the only reason.
              </p>
              <ul className="list-disc list-inside space-y-2 text-earth-light">
                <li>
                  <strong className="text-earth">More variety</strong> &mdash;
                  Garden centres stock maybe a dozen tomato varieties. Seed
                  catalogues have hundreds. That&apos;s where you find the
                  interesting stuff.
                </li>
                <li>
                  <strong className="text-earth">Better timing</strong> &mdash;
                  You control exactly when seedlings are ready, matched to your
                  local conditions and last frost date.
                </li>
                <li>
                  <strong className="text-earth">Stronger plants</strong> &mdash;
                  Seedlings raised in your own conditions don&apos;t need to
                  recover from the stress of transport and shop shelf neglect.
                </li>
                <li>
                  <strong className="text-earth">It&apos;s satisfying</strong> &mdash;
                  There&apos;s no shortcut to the feeling of harvesting something
                  you started from seed on your windowsill in February.
                </li>
              </ul>
            </div>
          </section>

          <div className="grid grid-cols-3 gap-4 my-8 max-w-2xl">
            <BigNumber number="10" suffix="x" label="cheaper than plug plants" />
            <BigNumber number="100" suffix="s" label="more varieties to choose" />
            <BigNumber number="1" label="packet fills a bed" />
          </div>

          <GuideImage
            src="/images/guides/seedlings.webp"
            alt="Young seedlings growing in biodegradable pots and seed trays"
            caption="Start seeds in modules or small pots — they transplant better with an established root system."
          />

          <SectionDivider label="Getting started" />

          {/* What you need */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              What you need
            </h2>
            <div className="space-y-3">
              <p>
                You don&apos;t need much kit. Here&apos;s what actually matters:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-earth text-lg mb-1.5">
                    Seed compost vs multi-purpose
                  </h3>
                  <p>
                    Seed compost is finer and lower in nutrients, which is what
                    tiny seedlings want. Multi-purpose is often too chunky and
                    rich &mdash; seedlings can drown in it or get burned by the
                    fertiliser. For small seeds (lettuce, tomatoes, celery),
                    always use seed compost. For big seeds like beans, squash, or
                    sweetcorn, multi-purpose is fine.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-earth text-lg mb-1.5">
                    Modules, trays, and pots
                  </h3>
                  <p>
                    Module trays are brilliant because each seedling gets its own
                    root space, which means less root disturbance when you plant
                    out. Small modules (cell trays) work for most things. Use
                    larger 9cm pots for bigger seeds like courgettes or squash
                    that need more room early on. Yoghurt pots with drainage
                    holes punched in the bottom work perfectly well too.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-earth text-lg mb-1.5">
                    Labels
                  </h3>
                  <p>
                    Label everything. You will not remember what&apos;s what in
                    three weeks. Use a pencil, not a marker &mdash; markers fade
                    in sunlight.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sowing depth */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              How deep to sow
            </h2>
            <div className="space-y-3">
              <p>
                The rule of thumb: sow at twice the depth of the seed&apos;s
                size. In practice that means:
              </p>
              <ul className="list-disc list-inside space-y-2 text-earth-light">
                <li>
                  <strong className="text-earth">Tiny seeds</strong> (lettuce,
                  celery, celeriac) &mdash; scatter on the surface and cover with
                  a light dusting of vermiculite or sieved compost
                </li>
                <li>
                  <strong className="text-earth">Medium seeds</strong> (tomatoes,
                  peppers, brassicas) &mdash; about 1cm deep
                </li>
                <li>
                  <strong className="text-earth">Large seeds</strong> (beans,
                  peas, squash, sweetcorn) &mdash; 2&ndash;3cm deep
                </li>
              </ul>
              <TipBox title="Lost the packet?">
                The rule &ldquo;twice the seed&apos;s size&rdquo; will get you
                close enough for almost everything. The only exception is seeds
                that need light to germinate (like celery) &mdash; scatter those
                on top and press gently.
              </TipBox>
            </div>
          </section>

          {/* Temperature */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Temperature and where to start them
            </h2>
            <div className="space-y-3">
              <p>
                Most seeds need warmth to germinate &mdash; not light, warmth.
                A warm room (18&ndash;22&deg;C) is enough for the majority of
                crops. Here&apos;s how the main options compare:
              </p>
              <div className="space-y-4">
                <div className="border-t border-earth/10 pt-5 pb-2">
                  <h3 className="font-serif text-earth text-lg mb-1.5">Windowsill</h3>
                  <p className="text-sm">
                    Free and works for most things. South-facing is best. Watch
                    out for cold windowsills at night &mdash; temperatures can
                    drop sharply once the heating&apos;s off. Move trays away from
                    the glass overnight if needed.
                  </p>
                </div>
                <div className="border-t border-earth/10 pt-5 pb-2">
                  <h3 className="font-serif text-earth text-lg mb-1.5">
                    Heated propagator
                  </h3>
                  <p className="text-sm">
                    A small electric propagator gives consistent bottom heat,
                    which speeds up germination significantly. Worth it for
                    peppers, aubergines, and chillies that need 25&deg;C+ to
                    germinate reliably. You can pick one up for under &pound;20.
                  </p>
                </div>
                <div className="border-t border-earth/10 pt-5 pb-2">
                  <h3 className="font-serif text-earth text-lg mb-1.5">
                    Unheated greenhouse or cold frame
                  </h3>
                  <p className="text-sm">
                    Good for hardy crops from March onwards, but no use for
                    tender crops until after frost risk has passed. Great for
                    hardening off (more on that below).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Watering */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Watering seedlings
            </h2>
            <div className="space-y-3">
              <p>
                Overwatering kills more seedlings than underwatering. The
                compost should be moist, not sodden. If you squeeze a handful
                and water drips out, it&apos;s too wet.
              </p>
              <p>
                <strong className="text-earth">Bottom-water wherever possible.</strong>{" "}
                Sit your tray in a shallow dish of water and let the compost
                draw it up from below. This keeps the surface drier and reduces
                the risk of damping off &mdash; the fungal disease that makes
                seedlings keel over at the base overnight.
              </p>
              <div className="bg-allotment-bg/30 p-4 text-sm text-earth-light">
                <strong className="text-earth">Damping off prevention:</strong>{" "}
                Good air circulation, not overwatering, and using clean pots
                and fresh compost. If you&apos;ve had it before, a light
                covering of vermiculite on the surface helps keep things dry
                around the stems.
              </div>
            </div>
          </section>

          {/* Light */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Light and leggy seedlings
            </h2>
            <div className="space-y-3">
              <p>
                Once seeds have germinated, light becomes critical. Seedlings
                that don&apos;t get enough light stretch towards it, producing
                thin, pale, floppy stems. This is called &ldquo;legginess&rdquo;
                and it&apos;s the single most common problem with windowsill
                growing.
              </p>
              <ul className="list-disc list-inside space-y-2 text-earth-light">
                <li>
                  Use your brightest south-facing windowsill
                </li>
                <li>
                  Rotate trays 180&deg; daily so seedlings grow straight
                </li>
                <li>
                  If seedlings are still leggy, sow later in spring when
                  daylight hours are longer &mdash; a March sowing often
                  overtakes a February one
                </li>
                <li>
                  A cheap LED grow light can help if you don&apos;t have a good
                  window, but it&apos;s not essential
                </li>
              </ul>
            </div>
          </section>

          {/* Pricking out */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Pricking out and potting on
            </h2>
            <div className="space-y-3">
              <p>
                If you&apos;ve sown into a seed tray rather than individual
                modules, you&apos;ll need to prick seedlings out once they have
                their first pair of &ldquo;true leaves&rdquo; (the second set,
                after the initial seed leaves).
              </p>
              <p>
                Hold the seedling by a leaf &mdash; never the stem. Use a
                pencil or dibber to lever the roots out gently. Drop it into a
                hole in fresh compost in a module or pot, and firm in lightly.
                Water from below.
              </p>
              <p>
                <strong className="text-earth">Potting on</strong> means moving a
                seedling into a larger pot as it outgrows its current one.
                You&apos;ll know it&apos;s time when roots start poking out
                the bottom or growth stalls despite watering. Move up one pot
                size at a time.
              </p>
            </div>
          </section>

          {/* Hardening off */}
          <ColorSection color="sage">
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Hardening off
            </h2>
            <div className="space-y-3">
              <p>
                This is the step people skip, and it&apos;s the one that
                matters most. Plants grown indoors have soft, sheltered growth.
                Put them straight outside and they&apos;ll get battered by wind,
                scorched by sun, and shocked by cold nights.
              </p>
              <p>
                Hardening off takes 7&ndash;10 days:
              </p>
              <ProcessDiagram steps={[
                { label: "Days 1-2", detail: "2-3 hrs outside, sheltered shade" },
                { label: "Days 3-4", detail: "4-5 hrs, some direct sun" },
                { label: "Days 5-7", detail: "Most of the day outside" },
                { label: "Days 8-10", detail: "Out day and night" },
              ]} />
              <WarningBox title="Don&apos;t skip this">
                Putting indoor seedlings straight outside is the #1 cause of
                transplant failure. Even two days of gradual exposure makes a
                huge difference.
              </WarningBox>
              <p>
                A cold frame makes this much easier &mdash; just prop the lid
                open a bit more each day. If you don&apos;t have one, a
                sheltered spot by a south-facing wall works fine.
              </p>
            </div>
          </section>
          </ColorSection>

          {/* Indoor vs direct sow */}
          <ColorSection color="ochre">
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Start indoors vs direct sow
            </h2>
            <div className="space-y-3">
              <p>
                Not everything needs starting on a windowsill. Some crops
                prefer being sown straight into the ground and actually resent
                transplanting.
              </p>
              <div className="border-t border-earth/10 pt-5 pb-2">
                <h3 className="font-semibold text-earth mb-2">
                  Start indoors
                </h3>
                <p className="text-sm">
                  Tomatoes, peppers, chillies, aubergines, courgettes, squash,
                  pumpkins, cucumbers, sweetcorn, celeriac, celery, leeks.
                  These all benefit from a head start in warmth.
                </p>
              </div>
              <div className="border-t border-earth/10 pt-5 pb-2">
                <h3 className="font-semibold text-earth mb-2">
                  Direct sow outdoors
                </h3>
                <p className="text-sm">
                  Carrots, parsnips, beetroot, radishes, turnips, peas, broad
                  beans, French beans, runner beans, spring onions. Root
                  vegetables especially dislike being transplanted &mdash; their
                  roots fork if disturbed.
                </p>
              </div>
              <div className="border-t border-earth/10 pt-5 pb-2">
                <h3 className="font-semibold text-earth mb-2">
                  Either works
                </h3>
                <p className="text-sm">
                  Lettuce, spinach, kale, chard, brassicas (cabbage, broccoli,
                  cauliflower), onions. These can be started in modules for
                  transplanting or sown directly, depending on the time of year
                  and what suits you.
                </p>
              </div>
              <div className="bg-allotment-bg/30 p-4 text-sm text-earth-light">
                Use our{" "}
                <a
                  href="/"
                  className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
                >
                  planting tool
                </a>{" "}
                to see exactly when to sow each crop based on your postcode and
                local frost date.
              </div>
            </div>
          </section>
          </ColorSection>

          {/* Common mistakes */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Common mistakes
            </h2>
            <div className="space-y-4">
              <div className="border-t border-earth/10 pt-5 pb-2">
                <h3 className="font-serif text-earth text-lg mb-1.5">
                  Sowing too early
                </h3>
                <p className="text-sm">
                  The most common mistake by far. Starting tomatoes in January
                  means weeks of leggy, struggling plants on a dark windowsill.
                  A March sowing, with more light and warmth, often catches up
                  and overtakes. Check your{" "}
                  <a
                    href="/frost-map"
                    className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
                  >
                    local frost date
                  </a>{" "}
                  and work backwards.
                </p>
              </div>
              <div className="border-t border-earth/10 pt-5 pb-2">
                <h3 className="font-serif text-earth text-lg mb-1.5">
                  Sowing too deep
                </h3>
                <p className="text-sm">
                  Burying small seeds too deep means they exhaust their energy
                  reserves before reaching the surface. Remember: twice the
                  seed&apos;s size for depth, and surface-sow anything tiny.
                </p>
              </div>
              <div className="border-t border-earth/10 pt-5 pb-2">
                <h3 className="font-serif text-earth text-lg mb-1.5">
                  Overwatering
                </h3>
                <p className="text-sm">
                  Soggy compost starves roots of oxygen and creates perfect
                  conditions for damping off. Bottom-water, let the surface dry
                  slightly between waterings, and make sure your containers
                  drain freely.
                </p>
              </div>
              <div className="border-t border-earth/10 pt-5 pb-2">
                <h3 className="font-serif text-earth text-lg mb-1.5">
                  Skipping hardening off
                </h3>
                <p className="text-sm">
                  Weeks of careful growing undone in one afternoon. Even a few
                  days of gradual acclimatisation makes a huge difference.
                  Don&apos;t rush this step.
                </p>
              </div>
              <div className="border-t border-earth/10 pt-5 pb-2">
                <h3 className="font-serif text-earth text-lg mb-1.5">
                  Sowing everything at once
                </h3>
                <p className="text-sm">
                  Succession sowing &mdash; sowing a small batch every 2&ndash;3
                  weeks &mdash; gives you a longer harvest and means you&apos;re
                  not drowning in lettuce one week and empty-handed the next.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <ColorSection color="sky">
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-8 tracking-tight">
              Common questions
            </h2>
            <div className="space-y-6">
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
                  When should I start seeds indoors in the UK?
                </h3>
                <p className="text-sm">
                  It depends on the crop. Tomatoes, peppers, and aubergines need
                  starting in February or March. Courgettes and squash can wait
                  until April. Hardy crops like broad beans and peas are usually
                  better direct-sown outdoors.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
                  Do I need seed compost or can I use multi-purpose?
                </h3>
                <p className="text-sm">
                  Seed compost is better for small seeds &mdash; it&apos;s finer
                  and lower in nutrients. Multi-purpose works for larger seeds
                  like beans and squash. When in doubt, seed compost is the
                  safer bet.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
                  How deep should I sow seeds?
                </h3>
                <p className="text-sm">
                  Twice the depth of the seed&apos;s size. Tiny seeds sit on the
                  surface. Medium seeds go about 1cm deep. Large seeds go
                  2&ndash;3cm deep.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
                  What is hardening off?
                </h3>
                <p className="text-sm">
                  Gradually acclimatising indoor-grown seedlings to outdoor
                  conditions over 7&ndash;10 days. Without it, transplanted
                  seedlings get scorched, wilted, or stunted by the sudden
                  change in environment.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
                  Why are my seedlings tall and spindly?
                </h3>
                <p className="text-sm">
                  Almost always insufficient light. Rotate trays daily, use your
                  brightest south-facing window, and consider sowing later in
                  spring when daylight hours are longer. A later sowing often
                  produces sturdier plants.
                </p>
              </div>
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
              <a
                href="/guides/companion-planting"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    Companion planting guide
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    What grows well together and what to keep apart.
                  </p>
                </div>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/frost-map"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <div>
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                    UK frost map
                  </span>
                  <p className="text-sm text-earth-light mt-1">
                    Find your last frost date by region.
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
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
