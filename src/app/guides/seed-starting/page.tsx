import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <main id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 block">
          Growing guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-4">
          How to start seeds
        </h1>
        <p className="text-earth-light leading-relaxed mb-10">
          Growing from seed is the cheapest, most satisfying way to fill your
          plot. You get access to hundreds of varieties you&apos;ll never find
          as plug plants, and there&apos;s something genuinely brilliant about
          eating food you grew from a tiny speck. Here&apos;s everything you
          need to know to get it right.
        </p>

        <div className="space-y-12 text-earth-light leading-relaxed">
          {/* Why grow from seed */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
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

          {/* What you need */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              What you need
            </h2>
            <div className="space-y-3">
              <p>
                You don&apos;t need much kit. Here&apos;s what actually matters:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-earth mb-1">
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
                  <h3 className="font-semibold text-earth mb-1">
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
                  <h3 className="font-semibold text-earth mb-1">
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
            <h2 className="text-xl font-semibold text-earth mb-3">
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
              <div className="bg-allotment-bg/30 p-4 text-sm text-earth-light">
                If in doubt, check the seed packet. But if you&apos;ve lost
                the packet, &ldquo;twice the seed&apos;s size&rdquo; will get
                you close enough.
              </div>
            </div>
          </section>

          {/* Temperature */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Temperature and where to start them
            </h2>
            <div className="space-y-3">
              <p>
                Most seeds need warmth to germinate &mdash; not light, warmth.
                A warm room (18&ndash;22&deg;C) is enough for the majority of
                crops. Here&apos;s how the main options compare:
              </p>
              <div className="space-y-4">
                <div className="border border-earth/6 p-4">
                  <h3 className="font-semibold text-earth mb-1">Windowsill</h3>
                  <p className="text-sm">
                    Free and works for most things. South-facing is best. Watch
                    out for cold windowsills at night &mdash; temperatures can
                    drop sharply once the heating&apos;s off. Move trays away from
                    the glass overnight if needed.
                  </p>
                </div>
                <div className="border border-earth/6 p-4">
                  <h3 className="font-semibold text-earth mb-1">
                    Heated propagator
                  </h3>
                  <p className="text-sm">
                    A small electric propagator gives consistent bottom heat,
                    which speeds up germination significantly. Worth it for
                    peppers, aubergines, and chillies that need 25&deg;C+ to
                    germinate reliably. You can pick one up for under &pound;20.
                  </p>
                </div>
                <div className="border border-earth/6 p-4">
                  <h3 className="font-semibold text-earth mb-1">
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
            <h2 className="text-xl font-semibold text-earth mb-3">
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
            <h2 className="text-xl font-semibold text-earth mb-3">
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
            <h2 className="text-xl font-semibold text-earth mb-3">
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
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
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
                Hardening off takes 7&ndash;10 days. Here&apos;s the process:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-earth-light">
                <li>
                  <strong className="text-earth">Days 1&ndash;2:</strong> Place
                  plants outside in a sheltered, shaded spot for 2&ndash;3 hours.
                  Bring them back inside.
                </li>
                <li>
                  <strong className="text-earth">Days 3&ndash;4:</strong> Increase
                  to 4&ndash;5 hours with some direct sunlight.
                </li>
                <li>
                  <strong className="text-earth">Days 5&ndash;7:</strong> Leave
                  them out most of the day. Bring in at night if frost is
                  forecast.
                </li>
                <li>
                  <strong className="text-earth">Days 8&ndash;10:</strong> Leave
                  out day and night, as long as overnight temperatures are safe
                  for the crop.
                </li>
              </ol>
              <p>
                A cold frame makes this much easier &mdash; just prop the lid
                open a bit more each day. If you don&apos;t have one, a
                sheltered spot by a south-facing wall works fine.
              </p>
            </div>
          </section>

          {/* Indoor vs direct sow */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Start indoors vs direct sow
            </h2>
            <div className="space-y-3">
              <p>
                Not everything needs starting on a windowsill. Some crops
                prefer being sown straight into the ground and actually resent
                transplanting.
              </p>
              <div className="border border-earth/6 p-4">
                <h3 className="font-semibold text-earth mb-2">
                  Start indoors
                </h3>
                <p className="text-sm">
                  Tomatoes, peppers, chillies, aubergines, courgettes, squash,
                  pumpkins, cucumbers, sweetcorn, celeriac, celery, leeks.
                  These all benefit from a head start in warmth.
                </p>
              </div>
              <div className="border border-earth/6 p-4">
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
              <div className="border border-earth/6 p-4">
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
                  className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
                >
                  planting tool
                </a>{" "}
                to see exactly when to sow each crop based on your postcode and
                local frost date.
              </div>
            </div>
          </section>

          {/* Common mistakes */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Common mistakes
            </h2>
            <div className="space-y-4">
              <div className="border border-earth/6 p-4">
                <h3 className="font-semibold text-earth mb-1">
                  Sowing too early
                </h3>
                <p className="text-sm">
                  The most common mistake by far. Starting tomatoes in January
                  means weeks of leggy, struggling plants on a dark windowsill.
                  A March sowing, with more light and warmth, often catches up
                  and overtakes. Check your{" "}
                  <a
                    href="/frost-map"
                    className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
                  >
                    local frost date
                  </a>{" "}
                  and work backwards.
                </p>
              </div>
              <div className="border border-earth/6 p-4">
                <h3 className="font-semibold text-earth mb-1">
                  Sowing too deep
                </h3>
                <p className="text-sm">
                  Burying small seeds too deep means they exhaust their energy
                  reserves before reaching the surface. Remember: twice the
                  seed&apos;s size for depth, and surface-sow anything tiny.
                </p>
              </div>
              <div className="border border-earth/6 p-4">
                <h3 className="font-semibold text-earth mb-1">
                  Overwatering
                </h3>
                <p className="text-sm">
                  Soggy compost starves roots of oxygen and creates perfect
                  conditions for damping off. Bottom-water, let the surface dry
                  slightly between waterings, and make sure your containers
                  drain freely.
                </p>
              </div>
              <div className="border border-earth/6 p-4">
                <h3 className="font-semibold text-earth mb-1">
                  Skipping hardening off
                </h3>
                <p className="text-sm">
                  Weeks of careful growing undone in one afternoon. Even a few
                  days of gradual acclimatisation makes a huge difference.
                  Don&apos;t rush this step.
                </p>
              </div>
              <div className="border border-earth/6 p-4">
                <h3 className="font-semibold text-earth mb-1">
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
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-xl font-semibold text-earth mb-6">
              Common questions
            </h2>
            <div className="space-y-6">
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  When should I start seeds indoors in the UK?
                </h3>
                <p className="text-sm">
                  It depends on the crop. Tomatoes, peppers, and aubergines need
                  starting in February or March. Courgettes and squash can wait
                  until April. Hardy crops like broad beans and peas are usually
                  better direct-sown outdoors.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  Do I need seed compost or can I use multi-purpose?
                </h3>
                <p className="text-sm">
                  Seed compost is better for small seeds &mdash; it&apos;s finer
                  and lower in nutrients. Multi-purpose works for larger seeds
                  like beans and squash. When in doubt, seed compost is the
                  safer bet.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  How deep should I sow seeds?
                </h3>
                <p className="text-sm">
                  Twice the depth of the seed&apos;s size. Tiny seeds sit on the
                  surface. Medium seeds go about 1cm deep. Large seeds go
                  2&ndash;3cm deep.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  What is hardening off?
                </h3>
                <p className="text-sm">
                  Gradually acclimatising indoor-grown seedlings to outdoor
                  conditions over 7&ndash;10 days. Without it, transplanted
                  seedlings get scorched, wilted, or stunted by the sudden
                  change in environment.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
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

          {/* Cross-links */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-xl font-semibold text-earth mb-4">
              More tools and guides
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
                  Personalised sowing dates for your postcode.
                </p>
              </a>
              <a
                href="/guides/companion-planting"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Companion planting guide &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  What grows well together and what to keep apart.
                </p>
              </a>
              <a
                href="/frost-map"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  UK frost map &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Find your last frost date by region.
                </p>
              </a>
              <a
                href="/guides/beginners"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Beginner&apos;s guide &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Just got a plot? Start here.
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
