import { Fragment } from "react";
import PlantingTool from "@/components/PlantingTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CropIndex from "@/components/CropIndex";
import ScrollReveal from "@/components/ScrollReveal";
import FullWidthSection from "@/components/FullWidthSection";
import { crops } from "@/data/crops";
import SkyTonightLoader from "@/components/SkyTonightLoader";
import EmailCapture from "@/components/EmailCapture";
import Image from "next/image";
import { getCurrentMicroSeason, getSeasonName } from "@/lib/seasons";
import StickyPostcodeCTA from "@/components/StickyPostcodeCTA";
import CountUp from "@/components/CountUp";
import EditorNote from "@/components/EditorNote";
import LatestFromThePlot from "@/components/LatestFromThePlot";
import WeatherCommandCenter from "@/components/WeatherCommandCenter";
import PlotStamp from "@/components/PlotStamp";
import BlightRisk from "@/components/BlightRisk";
import FeaturedVariety from "@/components/FeaturedVariety";
import StageStrip from "@/components/StageStrip";
import LongestDayBand from "@/components/LongestDayBand";
import ShedFund from "@/components/ShedFund";
import SeasonalKitEdit from "@/components/SeasonalKitEdit";
import { featuredEntry, inSeasonCrops, plantOutCrops, harvestCrops, seasonCounts } from "@/lib/variety-status";
import CropCardGrid from "@/components/CropCardGrid";
import AffiliateLink from "@/components/AffiliateLink";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "What To Sow",
    url: "https://whattosow.co.uk",
    description:
      "Free UK planting calendar. Enter your postcode to find your local frost date and get personalised advice on what to sow this week.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
  };

  // Compute how many crops are sowable right now (server-side, build-time)
  const now = new Date();
  const avgFrost = new Date(now.getFullYear(), 3, 15);
  const weeksToFrost = (avgFrost.getTime() - now.getTime()) / (7 * 24 * 60 * 60 * 1000);
  const weeksAfterFrost = -weeksToFrost;
  const sowableNowCount = crops.filter((crop) => {
    const w = 3;
    if (crop.sowIndoorsWeeks !== null) {
      const diff = weeksToFrost - -crop.sowIndoorsWeeks;
      if (diff >= -w && diff <= w) return true;
    }
    if (crop.directSowWeeks !== null) {
      const diff = weeksToFrost - -crop.directSowWeeks;
      if (diff >= -w && diff <= w) return true;
    }
    if (crop.plantOutWeeks !== null) {
      const diff = weeksAfterFrost - crop.plantOutWeeks;
      if (diff >= -w && diff <= w) return true;
    }
    return false;
  }).length;

  // Seasonal field guide (server-side, UK-average frost; client refines by postcode later)
  const featured = featuredEntry();
  // The three jobs of the week. Sow excludes plant-out (it has its own section).
  const sowVeg = inSeasonCrops().filter((e) => e.status.method !== "plant out");
  const plantOutVeg = plantOutCrops();
  const harvestVeg = harvestCrops();
  const varietyCounts = seasonCounts();

  // Data-driven priority: lead with whichever job has the most live, time-
  // sensitive crops (closing/last-chance ones count double). A block only
  // appears when it has crops — so Harvest switches itself on as things ripen
  // and stays hidden the rest of the year.
  const jobScore = (entries: typeof sowVeg) =>
    entries.length + entries.filter((e) => e.status.state === "closing").length;
  // This is "What To Sow" — sowing/planting always leads; harvest is the reward
  // underneath. So sow + plant-out are a top tier (ordered between themselves by
  // priority), and harvest is pinned below them.
  const jobTier = { sow: 0, plantout: 0, harvest: 1 } as const;
  const jobOrder = { sow: 0, plantout: 1, harvest: 2 } as const;
  const jobLabel = { sow: "sowing", plantout: "planting out", harvest: "harvesting" } as const;
  const jobs = (
    [
      { id: "sow" as const, score: jobScore(sowVeg) },
      { id: "plantout" as const, score: jobScore(plantOutVeg) },
      { id: "harvest" as const, score: jobScore(harvestVeg) },
    ]
      .filter((j) => j.score > 0)
      .sort(
        (a, b) =>
          jobTier[a.id] - jobTier[b.id] || b.score - a.score || jobOrder[a.id] - jobOrder[b.id]
      )
  );
  const leadJob = jobs[0]?.id;

  // Season-aware homepage chrome: the hero eyebrow and which interactive map
  // leads both shift with the calendar, so the site reads the season itself.
  const nowMonth = now.getMonth();
  const isSummerSeason = nowMonth >= 5 && nowMonth <= 7; // Jun–Aug
  const heroEyebrow =
    nowMonth >= 2 && nowMonth <= 4
      ? "Sowing season is underway"
      : isSummerSeason
        ? "The growing season's in full swing"
        : nowMonth >= 8 && nowMonth <= 10
          ? "Sow now for autumn & winter"
          : "Planning season — get ahead for spring";

  // Canonical stage labels — the numbers persist even as the sections reorder.
  const stageMeta = {
    sow: { num: "01", label: "Sow" },
    plantout: { num: "02", label: "Plant out" },
    harvest: { num: "03", label: "Harvest" },
  } as const;
  const ilink = "text-rust hover:text-earth transition-colors underline decoration-rust/30";

  // One job block. The lead job gets a hero treatment (big heading, large
  // asymmetric grid); the rest stay compact. All on one light ground, unified by
  // the stage strip above — so the priority order reads as design, not chance.
  const renderJob = (id: "sow" | "plantout" | "harvest", isLead: boolean) => {
    const meta = stageMeta[id];
    const anchor = id === "plantout" ? "plant-out" : id;
    const heading = isLead
      ? "font-serif font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight text-earth leading-[0.96]"
      : "font-serif font-light text-2xl sm:text-3xl md:text-[2.5rem] tracking-tight text-earth leading-none";
    const stand = isLead
      ? "font-serif italic text-lg sm:text-xl text-earth-light max-w-[46ch] mt-3 mb-8 leading-snug"
      : "font-serif italic text-base sm:text-lg text-earth-light max-w-[52ch] mt-2 mb-6 leading-snug";
    const variant = isLead ? "hero" : "compact";

    const eyebrow = (
      <div className="flex items-center gap-3 mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-allotment">
        <span className="text-earth-lighter">{meta.num}</span>
        <span>{meta.label}</span>
        {isLead && <span className="bg-amber text-white px-2 py-0.5 tracking-[0.12em]">this week&apos;s main job</span>}
        {id === "harvest" && <span className="font-serif italic normal-case tracking-normal text-[13px] text-earth-lighter">the reward</span>}
      </div>
    );

    const body =
      id === "sow" ? (
        <>
          <h2 className={heading}>Everything to sow now</h2>
          <p className={stand}>Every variety worth starting this week &mdash; lit the week its window opens, flagged the week it closes.</p>
          <CropCardGrid entries={sowVeg} variant={variant} showSeeds emptyNote="Nothing to sow this week on the UK average — your own postcode may differ." />
        </>
      ) : id === "plantout" ? (
        <>
          <h2 className={heading}>What to plant out this week</h2>
          <p className={stand}>Young plants ready for the ground &mdash; whether you raised them on a windowsill or bought them in.</p>
          <CropCardGrid entries={plantOutVeg} variant={variant} emptyNote="Nothing to plant out on the UK average just now — your own postcode may differ." />
          <p className="mt-6 text-sm text-earth-light leading-relaxed max-w-[64ch]">
            <strong className="text-earth">Before they go in:</strong> harden off over{" "}
            <a href="/guides/seed-starting#hardening-off" className={ilink}>7&ndash;10 days</a>, mind a{" "}
            <a href="/frost-map" className={ilink}>late frost</a>, and water in well &mdash;{" "}
            <AffiliateLink href="https://www.suttons.co.uk/garden-equipment/all/frost-protection-fleece_MH4728" product="frost protection fleece" type="gear" merchant="suttons" className={ilink}>fleece</AffiliateLink>{" "}
            the tender ones on cold nights. No seedlings of your own?{" "}
            <AffiliateLink href="https://www.suttons.co.uk/vegetable-fruit-plants/" product="vegetable plants" type="seed" merchant="suttons" className={ilink}>Buy young veg plants &rarr;</AffiliateLink>
          </p>
        </>
      ) : (
        <>
          <h2 className={heading}>What to harvest this week</h2>
          <p className={stand}>The payoff. Likely ready to pick now &mdash; pick little and often to keep them coming.</p>
          <CropCardGrid entries={harvestVeg} variant={variant} emptyNote="The harvest hasn't started yet — check back as summer comes in." />
          <div className="mt-6 border border-earth/10 bg-amber-bg/50 px-4 py-3 max-w-[64ch] text-sm text-earth-light leading-relaxed">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-rust mb-1.5">Glut coming?</div>
            A wall of courgettes and beans all at once is the summer rite of passage.{" "}
            <a href="/guides/dealing-with-the-glut" className={ilink}>What to do with a glut &rarr;</a>{" · "}
            <a href="/harvest-planner" className={ilink}>Plan your harvests &rarr;</a>
          </div>
        </>
      );

    return (
      <div id={anchor} className={`${isLead ? "" : "border-t border-earth/10 pt-12 mt-12"} scroll-mt-24`}>
        {eyebrow}
        {body}
      </div>
    );
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When is the last frost date in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It varies hugely depending on where you live. In the far south-west of England, the last frost is typically in early April. In London and the south-east, it's mid-to-late April. The Midlands and north of England see their last frost in early May. Scotland ranges from mid-May to early June.",
        },
      },
      {
        "@type": "Question",
        name: "What can I plant before the last frost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hardy crops like broad beans, peas, onion sets, potatoes, lettuce, spinach, radishes, and kale can all go out before your last frost date. Tender crops like tomatoes, courgettes, runner beans, and peppers must wait until after the last frost.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate are these frost dates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our estimates are calibrated against Met Office climate data and are typically accurate to within 5-7 days. However, frost dates are long-term averages — in any given year, the actual last frost could be earlier or later.",
        },
      },
      {
        "@type": "Question",
        name: "Is this tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, completely free. No signup, no subscription, no paywall.",
        },
      },
      {
        "@type": "Question",
        name: "Who made this?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A UK allotment grower frustrated by generic planting advice. Every site said 'sow tomatoes in March' — but March in Cornwall and March in Edinburgh are completely different. So we built a tool that actually knows where you are.",
        },
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "What To Sow",
    url: "https://whattosow.co.uk",
    description: "Free personalised sowing dates for every UK postcode. Know exactly what to plant, right now, where you are.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://whattosow.co.uk/crops/{search_term_string}",
      "query-input": "required name=search_term_string",
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <Header />

      <main id="main-content">
        {/* Hero — illustration banner with text */}
        <FullWidthSection className="relative overflow-hidden" innerClassName="relative">
          {/* Mobile: stacked text above image */}
          <div className="sm:hidden pt-10 pb-6 px-1">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-allotment animate-pulse" aria-hidden="true" />
              {heroEyebrow}
            </span>
            <h1 className="text-4xl font-serif text-earth tracking-tight leading-[0.95] mb-3">
              Know exactly
              <br />
              what to plant,
              <br />
              <span className="text-allotment">right now</span>
            </h1>
            <p className="text-sm text-earth-light/70 leading-relaxed">
              Enter your postcode for personalised sowing dates, based on your local frost date.
            </p>
          </div>

          {/* Image — full width on all sizes, with overlaid text on sm+ */}
          <div className="relative">
            <Image
              src="/images/headers/hero-allotment.webp"
              alt="Illustrated allotment scene with raised beds, shed and vegetables"
              width={1200}
              height={669}
              sizes="100vw"
              className="w-full h-auto"
              priority
            />
            {/* Desktop/tablet: text overlaid on the empty left side */}
            <div className="absolute inset-0 hidden sm:flex items-center">
              <div className="px-10 lg:px-16 max-w-[42%]">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-allotment animate-pulse" aria-hidden="true" />
                  {heroEyebrow}
                </span>
                <h1 className="text-5xl lg:text-6xl font-serif text-earth tracking-tight leading-[0.95] mb-5">
                  Know exactly
                  <br />
                  what to plant,
                  <br />
                  <span className="text-allotment">right now</span>
                </h1>
                <p className="text-sm text-earth-light/70 max-w-[220px] leading-relaxed">
                  Enter your postcode for personalised sowing dates, based on your local frost date.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-10 sm:pt-14 pb-8 sm:pb-12">
            <PlantingTool />
          </div>
        </FullWidthSection>

        {/* Trust strip */}
        <div className="px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 sm:gap-5 py-5 text-xs text-earth-lighter flex-wrap">
            <span className="font-medium text-earth-light"><CountUp target={sowableNowCount} /> crops to sow right now</span>
            <span className="hidden sm:inline text-earth/20" aria-hidden="true">|</span>
            <span>Met Office data</span>
            <span className="hidden sm:inline text-earth/20" aria-hidden="true">|</span>
            <span>Updated weekly</span>
            <span className="hidden sm:inline text-earth/20" aria-hidden="true">|</span>
            <span>Every UK postcode</span>
          </div>
        </div>

        {/* Midsummer moment — self-gates to the week around the solstice */}
        <LongestDayBand />

        {/* This week on your plot — location/weather context + the week's hero */}
        <section id="this-week" className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <PlotStamp />
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-earth leading-[0.94]">
              This week on <span className="italic text-allotment">your plot</span>
            </h2>
            <p className="font-serif italic text-xl text-earth-light max-w-[44ch] mt-4 leading-snug">
              The week across the whole patch &mdash; what to sow, what to plant out, and what&apos;s ready to pick. For dates tuned to your exact postcode, use the planner up top.
            </p>

            {leadJob && (
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-allotment">
                Right now &middot; the main job is {jobLabel[leadJob]}
              </p>
            )}

            <div className="mt-8">
              <WeatherCommandCenter />
            </div>

            {/* Blight warning — only renders when the Hutton risk is high */}
            <div className="mt-5 empty:hidden">
              <BlightRisk variant="banner" />
            </div>

            <div className="mt-7 font-serif text-[17px] text-earth-light">
              <a href="/calendar" className="text-earth border-b-2 border-amber pb-px">
                The full sowing calendar &mdash; {varietyCounts.total} varieties across the year &rarr;
              </a>
            </div>

            {featured && <FeaturedVariety entry={featured} />}
          </div>
        </section>

        {/* The week's jobs — a stage strip in fixed calendar order over the job
            sections, which reorder by what matters most. Each appears only when
            it has crops, so harvest switches itself on as things ripen. */}
        {jobs.length > 0 && (
          <section className="px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
            <div className="max-w-6xl mx-auto">
              <StageStrip
                counts={{ sow: sowVeg.length, plantout: plantOutVeg.length, harvest: harvestVeg.length }}
                leadJob={leadJob}
              />
              {jobs.map((j) => (
                <Fragment key={j.id}>{renderJob(j.id, j.id === leadJob)}</Fragment>
              ))}
            </div>
          </section>
        )}

        {/* Shop the season — the month's kit edit, funnels to the Sow page */}
        <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-20 bg-sage/25" aria-label="Shop the season">
          <div className="max-w-4xl mx-auto">
            <SeasonalKitEdit variant="teaser" />
          </div>
        </section>

        {/* The shed fund — affiliate as editorial recommendation */}
        <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-y border-earth/10" aria-label="The shed fund">
          <div className="max-w-4xl mx-auto">
            <ShedFund />
          </div>
        </section>

        {/* Explore — season-aware map + the calendar, one tidy row */}
        <div className="px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto pt-14 sm:pt-20 grid sm:grid-cols-2 gap-4">
            {isSummerSeason ? (
              <a
                href="/longest-day"
                className="group border border-earth/6 border-l-4 border-l-amber bg-ochre p-6 hover:border-earth/15 transition-colors duration-300 block"
              >
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-dark mb-2 block">
                  Interactive map
                </span>
                <span className="text-lg font-semibold text-earth group-hover:text-allotment transition-colors">
                  UK daylight map &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  How much daylight you get on the longest day, anywhere in the UK.
                </p>
              </a>
            ) : (
              <a
                href="/frost-map"
                className="group border border-earth/6 border-l-4 border-l-frost bg-sky p-6 hover:border-earth/15 transition-colors duration-300 block"
              >
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-frost mb-2 block">
                  Interactive map
                </span>
                <span className="text-lg font-semibold text-earth group-hover:text-allotment transition-colors">
                  UK frost date map &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  See frost dates across every region of the UK.
                </p>
              </a>
            )}
            <a
              href="/calendar"
              className="group border border-earth/6 border-l-4 border-l-leaf bg-sage/40 p-6 hover:border-earth/15 transition-colors duration-300 block"
            >
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment mb-2 block">
                Sowing calendar
              </span>
              <span className="text-lg font-semibold text-earth group-hover:text-allotment transition-colors">
                Plan your whole season &rarr;
              </span>
              <p className="text-sm text-earth-light mt-1">
                40 crops across 12 months, at a glance.
              </p>
            </a>
          </div>
        </div>

        {/* Guides — editorial links */}
        <section className="py-14 sm:py-20 px-6 sm:px-10 lg:px-16" aria-label="Growing guides">
          <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment">
                Growing guides
              </h2>
              <a href="/guides" className="text-xs font-medium text-allotment hover:text-allotment-dark transition-colors">
                View all &rarr;
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a href="/guides/beginners" className="group bg-sage p-5 transition-colors">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-allotment/60 mb-1 block">Getting started</span>
                <span className="font-semibold text-earth group-hover:text-allotment transition-colors">Allotment for beginners &rarr;</span>
              </a>
              <a href="/guides/seed-starting" className="group bg-sage p-5 transition-colors">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-allotment/60 mb-1 block">Getting started</span>
                <span className="font-semibold text-earth group-hover:text-allotment transition-colors">Starting from seed &rarr;</span>
              </a>
              <a href="/guides/companion-planting" className="group bg-sage p-5 transition-colors">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-allotment/60 mb-1 block">Planning</span>
                <span className="font-semibold text-earth group-hover:text-allotment transition-colors">Companion planting &rarr;</span>
              </a>
              <a href="/guides/growing-fruit" className="group bg-sage p-5 transition-colors">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-allotment/60 mb-1 block">Fruit</span>
                <span className="font-semibold text-earth group-hover:text-allotment transition-colors">Growing fruit &rarr;</span>
              </a>
              <a href="/lucky-dip" className="group bg-sage p-5 transition-colors">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-allotment/60 mb-1 block">Discover</span>
                <span className="font-semibold text-earth group-hover:text-allotment transition-colors">Lucky Dip &rarr;</span>
              </a>
            </div>
          </ScrollReveal>
          </div>
        </section>

        {/* Editor's Note — a note from the plot, leading into the blog */}
        <EditorNote />

        {/* Latest from the plot */}
        <LatestFromThePlot />

        {/* FAQ */}
        <section id="common-questions" className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 scroll-mt-20 bg-ochre" aria-labelledby="faq-heading">
          <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment mb-4 block">
              FAQ
            </span>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-10 sm:mb-12">
              Common questions
            </h2>

            <div className="space-y-8 sm:space-y-10">
              <div className="pl-6 sm:pl-8 border-l-2 border-l-rust py-1">
                <h3 className="text-lg sm:text-xl font-serif text-earth mb-3">
                  When is the last frost date in the UK?
                </h3>
                <p className="text-earth-light leading-relaxed max-w-2xl">
                  It varies hugely depending on where you live. In the far
                  south-west of England, the last frost is typically in early
                  April. In London and the south-east, it&apos;s mid-to-late
                  April. The Midlands and north of England see their last frost in
                  early May. Scotland ranges from mid-May to early June. Enter
                  your postcode above for your specific date.
                </p>
              </div>

              <div className="pl-6 sm:pl-8 border-l-2 border-l-rust py-1">
                <h3 className="text-lg sm:text-xl font-serif text-earth mb-3">
                  What can I plant before the last frost?
                </h3>
                <p className="text-earth-light leading-relaxed max-w-2xl">
                  Hardy crops like broad beans, peas, onion sets, potatoes,
                  lettuce, spinach, radishes, and kale can all go out before your
                  last frost date. They can tolerate cold nights and light frosts.
                  Tender crops like tomatoes, courgettes, runner beans, and peppers
                  must wait until after the last frost.
                </p>
              </div>

              <div className="pl-6 sm:pl-8 border-l-2 border-l-rust py-1">
                <h3 className="text-lg sm:text-xl font-serif text-earth mb-3">
                  How accurate are these frost dates?
                </h3>
                <p className="text-earth-light leading-relaxed max-w-2xl">
                  Our estimates are calibrated against Met Office climate data and
                  are typically accurate to within 5-7 days. However, frost dates
                  are long-term averages — in any given year, the actual last frost
                  could be earlier or later. Microclimates (sheltered gardens, frost
                  pockets, urban heat islands) also affect your specific conditions.
                  Always check the forecast before planting tender crops.
                </p>
              </div>

              <div className="pl-6 sm:pl-8 border-l-2 border-l-rust py-1">
                <h3 className="text-lg sm:text-xl font-serif text-earth mb-3">
                  Is this tool free?
                </h3>
                <p className="text-earth-light leading-relaxed max-w-2xl">
                  Yes, completely free. No signup, no subscription, no paywall.
                  We believe personalised planting advice should be open to every
                  UK grower.
                </p>
              </div>

              <div className="pl-6 sm:pl-8 border-l-2 border-l-rust py-1">
                <h3 className="text-lg sm:text-xl font-serif text-earth mb-3">
                  Who made this?
                </h3>
                <p className="text-earth-light leading-relaxed max-w-2xl">
                  A UK allotment grower frustrated by generic planting advice.
                  Every site said &ldquo;sow tomatoes in March&rdquo; — but March
                  in Cornwall and March in Edinburgh are completely different. So we
                  built a tool that actually knows where you are.
                </p>
              </div>
            </div>
          </ScrollReveal>
          </div>
        </section>

        {/* Repeat CTA */}
        <div className="py-10 sm:py-14 text-center border-t border-earth/6 px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-earth-light mb-2">Ready to find out what to sow?</p>
            <p className="text-sm text-earth-lighter mb-4">{sowableNowCount} crops are in season right now.</p>
            <a
              href="#main-content"
              className="inline-flex items-center gap-2 text-sm font-medium text-allotment hover:text-allotment-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              Enter your postcode
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <StickyPostcodeCTA />
    </div>
  );
}
