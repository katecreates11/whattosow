import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlantingTool from "@/components/PlantingTool";
import ContextualEmailCapture from "@/components/ContextualEmailCapture";
import { cities, getNearbyCities } from "@/data/cities";
import { crops, type Crop } from "@/data/crops";
import {
  calculateLastFrostDate,
  calculateFirstAutumnFrostDate,
  formatDate,
} from "@/lib/frost";
import {
  getCropActionMonths,
  MONTH_NAMES,
} from "@/lib/calendar";

// --- Static generation ---

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

// --- Metadata ---

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = cities.find((c) => c.slug === slug);
  if (!city) return {};

  const now = new Date();
  const monthName = MONTH_NAMES[now.getMonth()];
  const year = now.getFullYear();
  const frostDate = calculateLastFrostDate(city.latitude, city.longitude);
  const frostStr = formatDate(frostDate);

  return {
    title: `What to Sow in ${city.name} — ${monthName} ${year} Sowing Guide`,
    description: `Find out what to sow in ${city.name} right now. Last frost date around ${frostStr}. Personalised sowing calendar for ${city.county}, with month-by-month planting times.`,
    keywords: [
      `what to sow in ${city.name.toLowerCase()}`,
      `what to plant in ${city.name.toLowerCase()}`,
      `${city.name.toLowerCase()} sowing guide`,
      `${city.name.toLowerCase()} frost date`,
      `${city.name.toLowerCase()} allotment`,
      `${city.name.toLowerCase()} planting calendar`,
    ],
    openGraph: {
      title: `What to Sow in ${city.name} — ${monthName} ${year}`,
      description: `Last frost around ${frostStr}. See what to sow this month in ${city.name}.`,
      type: "article",
      url: `https://whattosow.co.uk/sow-in/${city.slug}`,
      locale: "en_GB",
    },
    alternates: {
      canonical: `/sow-in/${city.slug}`,
    },
  };
}

// --- Helpers ---

function getSowingStatus(
  crop: Crop,
  frostDate: Date,
  currentMonth: number
): { canSowIndoors: boolean; canDirectSow: boolean; canPlantOut: boolean } {
  const actions = getCropActionMonths(crop, frostDate);
  let canSowIndoors = false;
  let canDirectSow = false;
  let canPlantOut = false;

  for (const { action, months } of actions) {
    if (!months.includes(currentMonth)) continue;
    if (action === "sowIndoors") canSowIndoors = true;
    if (action === "directSow") canDirectSow = true;
    if (action === "plantOut") canPlantOut = true;
  }

  return { canSowIndoors, canDirectSow, canPlantOut };
}

function getActiveCrops(
  frostDate: Date,
  currentMonth: number
): { crop: Crop; canSowIndoors: boolean; canDirectSow: boolean; canPlantOut: boolean }[] {
  const results: { crop: Crop; canSowIndoors: boolean; canDirectSow: boolean; canPlantOut: boolean }[] = [];

  for (const crop of crops) {
    const status = getSowingStatus(crop, frostDate, currentMonth);
    if (status.canSowIndoors || status.canDirectSow || status.canPlantOut) {
      results.push({ crop, ...status });
    }
  }

  return results;
}

const categoryDot: Record<string, string> = {
  hardy: "bg-leaf",
  "half-hardy": "bg-amber",
  tender: "bg-tomato",
};

const actionLabels: Record<string, string> = {
  sowIndoors: "Sow indoors",
  directSow: "Direct sow",
  plantOut: "Plant out",
};

const actionColors: Record<string, string> = {
  sowIndoors: "bg-allotment/15 text-allotment-dark",
  directSow: "bg-leaf-bg text-allotment",
  plantOut: "bg-amber-light text-earth",
};

function formatFrostDateShort(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
}

// --- Page ---

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = cities.find((c) => c.slug === slug);
  if (!city) notFound();

  const now = new Date();
  const currentMonth = now.getMonth();
  const monthName = MONTH_NAMES[currentMonth];
  const year = now.getFullYear();

  const frostDate = calculateLastFrostDate(city.latitude, city.longitude);
  const autumnFrostDate = calculateFirstAutumnFrostDate(city.latitude, city.longitude);
  const growingSeasonDays = Math.round(
    (autumnFrostDate.getTime() - frostDate.getTime()) / (24 * 60 * 60 * 1000)
  );

  const activeCrops = getActiveCrops(frostDate, currentMonth);
  const nearbyCities = getNearbyCities(city);

  // Build the 12-month calendar
  const monthlyCalendar = MONTH_NAMES.map((name, monthIdx) => {
    const monthCrops: { crop: Crop; actions: string[] }[] = [];
    for (const crop of crops) {
      const allActions = getCropActionMonths(crop, frostDate);
      const activeActions: string[] = [];
      for (const { action, months } of allActions) {
        if (months.includes(monthIdx) && action !== "harvest") {
          activeActions.push(action);
        }
      }
      if (activeActions.length > 0) {
        monthCrops.push({ crop, actions: activeActions });
      }
    }
    return { name, monthIdx, crops: monthCrops };
  });

  // JSON-LD
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
        name: "Sow by location",
        item: "https://whattosow.co.uk/sow-in",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city.name,
        item: `https://whattosow.co.uk/sow-in/${city.slug}`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `What to Sow in ${city.name} — ${monthName} ${year} Sowing Guide`,
    description: `Sowing guide for ${city.name}, ${city.county}. Last frost date around ${formatFrostDateShort(frostDate)}, with a ${growingSeasonDays}-day growing season.`,
    url: `https://whattosow.co.uk/sow-in/${city.slug}`,
    publisher: {
      "@type": "Organization",
      name: "What To Sow",
      url: "https://whattosow.co.uk",
    },
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header backLink={{ href: "/sow-in", label: "\u2190 All locations" }} />

      <article id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="py-12 sm:py-20 pb-10 sm:pb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-earth-lighter">
              {city.region}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-earth tracking-tight leading-[1.1] mb-6">
            What to sow in{" "}
            <span className="font-normal">{city.name}</span>
          </h1>
          <p className="text-lg text-earth-light leading-relaxed max-w-2xl">
            {city.growingNotes}
          </p>
        </div>

        {/* Frost stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="border border-earth/6 p-5">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-earth-lighter block mb-1">
              Last frost date
            </span>
            <span className="text-lg font-semibold text-earth">
              {formatFrostDateShort(frostDate)}
            </span>
            <span className="block text-xs text-earth-lighter mt-1">Estimated average</span>
          </div>
          <div className="border border-earth/6 p-5">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-earth-lighter block mb-1">
              First autumn frost
            </span>
            <span className="text-lg font-semibold text-earth">
              {formatFrostDateShort(autumnFrostDate)}
            </span>
            <span className="block text-xs text-earth-lighter mt-1">Estimated average</span>
          </div>
          <div className="border border-earth/6 p-5">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-earth-lighter block mb-1">
              Growing season
            </span>
            <span className="text-lg font-semibold text-earth">
              {growingSeasonDays} days
            </span>
            <span className="block text-xs text-earth-lighter mt-1">Frost-free period</span>
          </div>
        </div>

        {/* What to sow NOW */}
        <section className="mb-16">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-earth-lighter mb-3 block">
            {monthName} {year}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-earth tracking-tight mb-2">
            What to sow in {city.name} right now
          </h2>
          <p className="text-earth-light mb-8">
            Based on a last frost date of {formatFrostDateShort(frostDate)}, these are the crops
            you can get going in {city.name} this month.
          </p>

          {activeCrops.length === 0 ? (
            <div className="border border-earth/6 p-6">
              <p className="text-earth-light">
                No crops to sow this month in {city.name}. Check back soon, or browse the{" "}
                <a href="/calendar" className="text-allotment hover:text-allotment-dark underline decoration-allotment/30">
                  full calendar
                </a>.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeCrops.map(({ crop, canSowIndoors, canDirectSow, canPlantOut }) => (
                <a
                  key={crop.slug}
                  href={`/crops/${crop.slug}`}
                  className="flex items-center justify-between gap-4 border border-earth/6 p-4 hover:border-allotment/30 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${categoryDot[crop.category]}`} />
                    <div className="min-w-0">
                      <span className="font-medium text-earth group-hover:text-allotment transition-colors block">
                        {crop.name}
                      </span>
                      <span className="text-xs text-earth-lighter line-clamp-1">{crop.tip}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {canSowIndoors && (
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${actionColors.sowIndoors}`}>
                        {actionLabels.sowIndoors}
                      </span>
                    )}
                    {canDirectSow && (
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${actionColors.directSow}`}>
                        {actionLabels.directSow}
                      </span>
                    )}
                    {canPlantOut && (
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${actionColors.plantOut}`}>
                        {actionLabels.plantOut}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Monthly sowing timeline */}
        <section className="mb-16">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-earth-lighter mb-3 block">
            Full year
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-earth tracking-tight mb-2">
            {city.name} sowing calendar
          </h2>
          <p className="text-earth-light mb-8">
            Month-by-month sowing times for {city.name}, based on a last frost
            date of {formatFrostDateShort(frostDate)}.
          </p>

          <div className="space-y-6">
            {monthlyCalendar.map(({ name, monthIdx, crops: monthCrops }) => (
              <div
                key={name}
                className={`border p-5 ${
                  monthIdx === currentMonth
                    ? "border-allotment/30 bg-allotment/[0.03]"
                    : "border-earth/6"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-semibold text-earth">{name}</h3>
                  {monthIdx === currentMonth && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-allotment/15 text-allotment-dark">
                      Now
                    </span>
                  )}
                </div>
                {monthCrops.length === 0 ? (
                  <p className="text-xs text-earth-lighter">
                    No sowing activity this month.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {monthCrops.map(({ crop, actions }) => (
                      <a
                        key={crop.slug}
                        href={`/crops/${crop.slug}`}
                        className="group inline-flex items-center gap-1.5 text-xs border border-earth/8 px-2.5 py-1.5 hover:border-allotment/30 transition-colors"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryDot[crop.category]}`} />
                        <span className="text-earth group-hover:text-allotment transition-colors">
                          {crop.name}
                        </span>
                        <span className="text-earth-lighter">
                          {actions.map((a) => {
                            if (a === "sowIndoors") return "I";
                            if (a === "directSow") return "D";
                            if (a === "plantOut") return "P";
                            return "";
                          }).join("/")}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-earth-lighter">
            <span className="flex items-center gap-1"><span className="font-medium">I</span> = Sow indoors</span>
            <span className="flex items-center gap-1"><span className="font-medium">D</span> = Direct sow</span>
            <span className="flex items-center gap-1"><span className="font-medium">P</span> = Plant out</span>
          </div>
        </section>

        {/* Personalise with postcode */}
        <section className="mb-16">
          <div className="bg-allotment-dark p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-2">
              Get more precise dates for {city.name}
            </h2>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              This guide uses the frost date for {city.name} city centre. Your
              exact frost date depends on your postcode — enter it below for
              personalised sowing dates, soil temperature, and frost forecasts.
            </p>
            <PlantingTool hideCropList />
          </div>
        </section>

        {/* Email capture */}
        <div className="mb-16">
          <ContextualEmailCapture />
        </div>

        {/* Near this city */}
        {nearbyCities.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-semibold text-earth mb-4">
              Near {city.name}
            </h2>
            <p className="text-sm text-earth-light mb-6">
              Other sowing guides in {city.region}.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {nearbyCities.map((nearby) => (
                <a
                  key={nearby.slug}
                  href={`/sow-in/${nearby.slug}`}
                  className="group block border border-earth/6 p-4 hover:border-allotment/30 transition-colors duration-200"
                >
                  <span className="font-medium text-sm text-earth group-hover:text-allotment transition-colors">
                    {nearby.name}
                  </span>
                  <span className="block text-xs text-earth-lighter mt-1">
                    {nearby.county}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Browse all locations */}
        <section className="border-t border-earth/6 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-semibold text-earth mb-1">
                All UK sowing guides
              </h2>
              <p className="text-sm text-earth-light">
                Browse all {cities.length} city guides or use the postcode tool.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/sow-in"
                className="text-sm font-medium text-allotment hover:text-allotment-dark transition-colors"
              >
                All locations &rarr;
              </a>
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
}
