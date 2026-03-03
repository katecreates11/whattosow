import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LeafDivider, getCropIcon } from "@/components/SVGIllustrations";
import {
  MONTH_SLUGS,
  MONTH_NAMES,
  monthSlugToIndex,
  getCropsForMonth,
  getAvgFrostDate,
} from "@/lib/calendar";
import { type Crop } from "@/data/crops";

export async function generateStaticParams() {
  return MONTH_SLUGS.map((month) => ({ month }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ month: string }>;
}): Promise<Metadata> {
  const { month } = await params;
  const idx = monthSlugToIndex(month);
  if (idx === null) return {};
  const name = MONTH_NAMES[idx];

  return {
    title: `What to Sow in ${name} — UK Planting Guide | What To Sow`,
    description: `Find out which vegetables, herbs and salads to sow and plant in ${name} in the UK. Personalised to your postcode and local frost date.`,
    keywords: [
      `what to sow in ${name.toLowerCase()}`,
      `what to plant ${name.toLowerCase()} UK`,
      `${name.toLowerCase()} sowing guide UK`,
      `vegetable planting ${name.toLowerCase()}`,
    ],
    openGraph: {
      title: `What to Sow in ${name} — UK Planting Guide`,
      description: `UK sowing guide for ${name}. See what to sow indoors, direct sow outdoors, and plant out this month.`,
      type: "article",
      locale: "en_GB",
    },
  };
}

function CropCard({ crop }: { crop: Crop }) {
  const Icon = getCropIcon(crop.slug);
  const categoryStyles: Record<string, string> = {
    hardy: "bg-leaf-bg/60 border-l-[3px] border-leaf",
    "half-hardy": "bg-amber-bg border-l-[3px] border-amber",
    tender: "bg-tomato-bg border-l-[3px] border-tomato",
  };

  return (
    <a
      href={`/crops/${crop.slug}`}
      className={`${categoryStyles[crop.category]} rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
    >
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon className="w-5 h-5 shrink-0" />}
        <span className="font-medium text-sm text-earth">{crop.name}</span>
      </div>
      <p className="text-xs text-earth-lighter">{crop.tip.slice(0, 80)}...</p>
    </a>
  );
}

function MonthNav({ idx }: { idx: number }) {
  const prev = (idx + 11) % 12;
  const next = (idx + 1) % 12;

  return (
    <nav className="flex justify-between items-center" aria-label="Month navigation">
      <a
        href={`/sow/${MONTH_SLUGS[prev]}`}
        className="text-allotment hover:text-allotment-dark text-sm"
        aria-label={`Previous month: ${MONTH_NAMES[prev]}`}
      >
        &larr; {MONTH_NAMES[prev]}
      </a>
      <a
        href="/calendar"
        className="text-xs text-earth-lighter hover:text-allotment"
      >
        Full calendar
      </a>
      <a
        href={`/sow/${MONTH_SLUGS[next]}`}
        className="text-allotment hover:text-allotment-dark text-sm"
        aria-label={`Next month: ${MONTH_NAMES[next]}`}
      >
        {MONTH_NAMES[next]} &rarr;
      </a>
    </nav>
  );
}

export default async function MonthPage({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const { month } = await params;
  const idx = monthSlugToIndex(month);
  if (idx === null) notFound();

  const name = MONTH_NAMES[idx];
  const frostDate = getAvgFrostDate();
  const { sowIndoors, directSow, plantOut } = getCropsForMonth(idx, frostDate);
  const hasAnyCrops = sowIndoors.length > 0 || directSow.length > 0 || plantOut.length > 0;

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
        name: "Sowing Calendar",
        item: "https://whattosow.co.uk/calendar",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: name,
        item: `https://whattosow.co.uk/sow/${month}`,
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header backLink={{ href: "/", label: "\u2190 Home" }} />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="pt-10 sm:pt-16 pb-8">
          <MonthNav idx={idx} />

          <h1 className="text-4xl sm:text-5xl font-bold text-earth tracking-tight mt-8 mb-2">
            What to sow in {name}
          </h1>
          <p className="text-earth-light mb-8">
            Based on UK average frost date (mid-April). Enter your postcode on
            the{" "}
            <a href="/" className="text-allotment hover:underline">
              homepage
            </a>{" "}
            for personalised dates.
          </p>

          {!hasAnyCrops ? (
            <div className="bg-frost-bg rounded-xl p-6 text-center">
              <p className="text-earth-light">
                Not much to sow outdoors in {name} — but it&apos;s a great time to
                plan and order seeds!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {sowIndoors.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-earth mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-amber rounded-full" aria-hidden="true" />
                    Sow indoors
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {sowIndoors.map((crop) => (
                      <CropCard key={crop.slug} crop={crop} />
                    ))}
                  </div>
                </div>
              )}

              {directSow.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-earth mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-leaf rounded-full" aria-hidden="true" />
                    Direct sow outdoors
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {directSow.map((crop) => (
                      <CropCard key={crop.slug} crop={crop} />
                    ))}
                  </div>
                </div>
              )}

              {plantOut.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-earth mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-allotment rounded-full" aria-hidden="true" />
                    Plant out
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {plantOut.map((crop) => (
                      <CropCard key={crop.slug} crop={crop} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <LeafDivider className="my-8" />
          <MonthNav idx={idx} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
