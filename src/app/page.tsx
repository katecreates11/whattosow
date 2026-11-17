import { Fragment } from "react";
import Link from "next/link";
import PlantingTool from "@/components/PlantingTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyPostcodeCTA from "@/components/StickyPostcodeCTA";
import EditorNote from "@/components/EditorNote";
import BlightRisk from "@/components/BlightRisk";
import FeaturedVariety from "@/components/FeaturedVariety";
import LongestDayBand from "@/components/LongestDayBand";
import ShedFund from "@/components/ShedFund";
import SeasonalKitEdit from "@/components/SeasonalKitEdit";
import { featuredEntry, inSeasonCrops, plantOutCrops, harvestCrops } from "@/lib/variety-status";
import AffiliateLink from "@/components/AffiliateLink";
import WateringNote from "@/components/WateringNote";
import WeatherCommandCenter from "@/components/WeatherCommandCenter";
import PlotStamp from "@/components/PlotStamp";
import HomeHero from "@/components/home/HomeHero";
import WeekList from "@/components/home/WeekList";
import { formatDaylight, getSunTimes } from "@/lib/astronomy";
import { MONTH_NAMES, MONTH_SLUGS } from "@/lib/calendar";
import { getSeasonalTime } from "@/lib/seasonal-time";

export const revalidate = 3600;

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

  const seasonal = getSeasonalTime();
  const now = seasonal.now;
  const daylight = formatDaylight(getSunTimes(now).daylightMinutes);
  const dateline = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Seasonal field guide (server-side, UK-average frost; client refines by postcode later)
  const featured = featuredEntry(undefined, now);
  // The three jobs of the week. Sow excludes plant-out (it has its own section).
  const sowVeg = inSeasonCrops(undefined, now).filter((e) => e.status.method !== "plant out");
  const plantOutVeg = plantOutCrops(undefined, now);
  const harvestVeg = harvestCrops(undefined, now);

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

  // The season drives the hero photo and the month links.
  const nowMonth = seasonal.monthIndex;
  const currentMonthName = MONTH_NAMES[nowMonth];
  const currentMonthSlug = MONTH_SLUGS[nowMonth];
  // Seasonal link to the Christmas dinner planner, 1 November to 25 December.
  const christmasWindow = nowMonth === 10 || (nowMonth === 11 && now.getDate() <= 25);
  const ilink = "text-allotment underline decoration-allotment/30 underline-offset-4 hover:decoration-allotment";

  // One job of the week, as a photo-led list (WeekList). The lead job comes
  // first; harvest switches itself on as things ripen and hides otherwise.
  const renderJob = (id: "sow" | "plantout" | "harvest") => {
    if (id === "sow") {
      return (
        <WeekList
          key="sow"
          title="Sow"
          entries={sowVeg}
          showSeeds
          photoShownBelow={featured?.crop.slug}
          emptyNote="Nothing to sow outdoors this week on the UK average. Your own postcode may differ."
        />
      );
    }
    if (id === "plantout") {
      return (
        <WeekList
          key="plantout"
          title="Plant out"
          entries={plantOutVeg}
          emptyNote="Nothing to plant out on the UK average just now."
        >
          <p className="mt-5 text-[15px] text-earth-light leading-relaxed max-w-[60ch]">
            Before they go in, harden them off over{" "}
            <a href="/guides/seed-starting#hardening-off" className={ilink}>7 to 10 days</a>, mind a{" "}
            <a href="/frost-map" className={ilink}>late frost</a>, and water them in well. Cover the tender ones with{" "}
            <AffiliateLink href="https://www.suttons.co.uk/garden-equipment/all/frost-protection-fleece_MH4728" product="frost protection fleece" type="gear" merchant="suttons" position="homepage-plant-out-fleece" className={ilink}>fleece</AffiliateLink>{" "}
            on cold nights. No seedlings of your own?{" "}
            <AffiliateLink href="https://www.suttons.co.uk/vegetable-fruit-plants/" product="vegetable plants" type="seed" merchant="suttons" position="homepage-plant-out-young-plants" className={ilink}>Young veg plants</AffiliateLink>{" "}
            will catch you up.
          </p>
        </WeekList>
      );
    }
    return (
      <WeekList
        key="harvest"
        title="Pick"
        entries={harvestVeg}
        emptyNote="The harvest hasn't started yet."
      >
        <p className="mt-5 text-[15px] text-earth-light leading-relaxed max-w-[60ch]">
          A glut on the way?{" "}
          <a href="/guides/dealing-with-the-glut" className={ilink}>What to do with too many courgettes</a>, and{" "}
          <a href="/harvest-planner" className={ilink}>when yours will be ready</a>.
        </p>
      </WeekList>
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
        <HomeHero monthIndex={nowMonth} dateline={dateline} daylight={daylight} />

        {/* This week: the jobs, photo-led, lead job first */}
        <section id="this-week" className="px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20 pb-14 sm:pb-16 scroll-mt-20" aria-labelledby="this-week-heading">
          <div className="max-w-5xl mx-auto">
            {/* The hero already says "What to sow this week" with the date: the
                heading stays for screen readers, not repeated on screen. */}
            <h2 id="this-week-heading" className="sr-only">
              This week
            </h2>
            <p className="text-[17px] text-earth-light leading-relaxed max-w-[52ch]">
              Dates here are for the UK as a whole. Your postcode, just below, makes them yours.
            </p>

            {/* Blight warning — only renders when the Hutton risk is high */}
            <div className="mt-6 empty:hidden">
              <BlightRisk variant="banner" />
            </div>

            {jobs.length > 0 && (
              <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-x-16">
                {jobs.map((j) => (
                  <Fragment key={j.id}>{renderJob(j.id)}</Fragment>
                ))}
              </div>
            )}

            <p className="mt-10 text-[17px] text-earth-light leading-relaxed max-w-[60ch]">
              <Link href={`/sow/${currentMonthSlug}`} className={ilink}>
                Everything for {currentMonthName}
              </Link>
              , the{" "}
              <Link href="/calendar" className={ilink}>
                whole year at a glance
              </Link>
              , or{" "}
              <Link href="/guides/microgreens-and-windowsill-herbs" className={ilink}>
                something for the windowsill
              </Link>
              .
              {christmasWindow && (
                <>
                  {" "}Hoping for something home-grown on the 25th? Here&apos;s{" "}
                  <Link href="/grow-your-christmas-dinner" className={ilink}>
                    what there is still time to grow
                  </Link>
                  .
                </>
              )}
            </p>

            {featured && <FeaturedVariety entry={featured} now={now} />}
          </div>
        </section>

        {/* Your garden: the postcode, and the Answer it becomes */}
        <section className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16 border-t border-earth/10" aria-labelledby="your-garden">
          <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14 items-start">
            <div>
              <h2 id="your-garden" className="font-serif text-[2rem] sm:text-[2.6rem] text-earth leading-[1.05] tracking-[-0.015em] max-w-[16ch]">
                Make it your garden
              </h2>
              <p className="mt-4 text-[17px] text-earth-light leading-relaxed max-w-[40ch]">
                Put in your postcode and this page works from your own frosts, your own ten years of
                weather, and tonight&apos;s sky where you are.
              </p>
            </div>
            <div>
              <PlantingTool answerOnly />
            </div>
          </div>
        </section>

        <WateringNote initialDateIso={now.toISOString()}>
          <PlotStamp quiet />
          <WeatherCommandCenter embedded />
        </WateringNote>

        {/* Midsummer moment — self-gates to the week around the solstice */}
        <LongestDayBand />

        {/* Shop the season — the month's kit edit, funnels to the Sow page */}
        <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 bg-sage/30" aria-label="Kit for the month">
          <div className="max-w-5xl mx-auto">
            <SeasonalKitEdit variant="teaser" month={seasonal.monthIndex} />
          </div>
        </section>

        {/* The note from the plot */}
        <EditorNote />

        {/* The shed fund — affiliate as editorial recommendation */}
        <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 border-t border-earth/10" aria-label="The shed fund">
          <div className="max-w-5xl mx-auto">
            <ShedFund />
          </div>
        </section>

        {/* Common questions — the FAQ, quiet and open on tap */}
        <section id="common-questions" className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 scroll-mt-20 border-t border-earth/10" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto">
            <h2 id="faq-heading" className="font-serif text-[2rem] sm:text-[2.6rem] text-earth tracking-[-0.015em] mb-8">
              Common questions
            </h2>
            <div className="border-b border-earth/12">
              <details className="group border-t border-earth/12 py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-[1.3rem] sm:text-[1.5rem] leading-snug text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-allotment">
                  {"When is the last frost date in the UK?"}
                  <span aria-hidden="true" className="mt-1 shrink-0 text-earth-lighter transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[17px] text-earth-light leading-relaxed max-w-[62ch]">
                  It varies hugely depending on where you live. In the far
                  south-west of England, the last frost is typically in early
                  April. In London and the south-east, it&apos;s mid-to-late
                  April. The Midlands and north of England see their last frost in
                  early May. Scotland ranges from mid-May to early June. Enter
                  your postcode above for your specific date.
                </p>
              </details>
              <details className="group border-t border-earth/12 py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-[1.3rem] sm:text-[1.5rem] leading-snug text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-allotment">
                  {"What can I plant before the last frost?"}
                  <span aria-hidden="true" className="mt-1 shrink-0 text-earth-lighter transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[17px] text-earth-light leading-relaxed max-w-[62ch]">
                  Hardy crops like broad beans, peas, onion sets, potatoes,
                  lettuce, spinach, radishes, and kale can all go out before your
                  last frost date. They can tolerate cold nights and light frosts.
                  Tender crops like tomatoes, courgettes, runner beans, and peppers
                  must wait until after the last frost.
                </p>
              </details>
              <details className="group border-t border-earth/12 py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-[1.3rem] sm:text-[1.5rem] leading-snug text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-allotment">
                  {"How accurate are these frost dates?"}
                  <span aria-hidden="true" className="mt-1 shrink-0 text-earth-lighter transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[17px] text-earth-light leading-relaxed max-w-[62ch]">
                  Our estimates are calibrated against Met Office climate data and
                  are typically accurate to within 5-7 days. However, frost dates
                  are long-term averages — in any given year, the actual last frost
                  could be earlier or later. Microclimates (sheltered gardens, frost
                  pockets, urban heat islands) also affect your specific conditions.
                  Always check the forecast before planting tender crops.
                </p>
              </details>
              <details className="group border-t border-earth/12 py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-[1.3rem] sm:text-[1.5rem] leading-snug text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-allotment">
                  {"Is this tool free?"}
                  <span aria-hidden="true" className="mt-1 shrink-0 text-earth-lighter transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[17px] text-earth-light leading-relaxed max-w-[62ch]">
                  Yes, completely free. No signup, no subscription, no paywall.
                  We believe personalised planting advice should be open to every
                  UK grower.
                </p>
              </details>
              <details className="group border-t border-earth/12 py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-[1.3rem] sm:text-[1.5rem] leading-snug text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-allotment">
                  {"Who made this?"}
                  <span aria-hidden="true" className="mt-1 shrink-0 text-earth-lighter transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[17px] text-earth-light leading-relaxed max-w-[62ch]">
                  A UK allotment grower frustrated by generic planting advice.
                  Every site said &ldquo;sow tomatoes in March&rdquo; — but March
                  in Cornwall and March in Edinburgh are completely different. So we
                  built a tool that actually knows where you are.
                </p>
              </details>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <StickyPostcodeCTA />
    </div>
  );
}
