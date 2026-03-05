import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullWidthSection from "@/components/FullWidthSection";
import { getCropIcon } from "@/components/SVGIllustrations";
import { getCropImagePath } from "@/lib/crop-images";
import {
  MONTH_SLUGS,
  MONTH_NAMES,
  monthSlugToIndex,
  getCropsForMonth,
  getAvgFrostDate,
} from "@/lib/calendar";
import { type Crop } from "@/data/crops";
import MonthDaylight from "@/components/MonthDaylight";
import { getSeasonalAccent } from "@/lib/seasons";

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
    alternates: {
      canonical: `/sow/${month}`,
    },
  };
}

const categoryDot: Record<string, string> = {
  hardy: "bg-leaf",
  "half-hardy": "bg-amber",
  tender: "bg-tomato",
};

function CropCard({ crop }: { crop: Crop }) {
  const imagePath = getCropImagePath(crop.slug);
  const Icon = getCropIcon(crop.slug);

  return (
    <a
      href={`/crops/${crop.slug}`}
      className="group block border border-earth/6 p-5 sm:p-6 hover:border-earth/15 transition-colors duration-300"
    >
      <div className="flex items-start gap-3 mb-2">
        {imagePath ? (
          <Image
            src={imagePath}
            alt=""
            width={48}
            height={48}
            className="shrink-0 object-contain"
          />
        ) : (
          <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryDot[crop.category]}`} />
            {Icon && <Icon className="w-5 h-5 shrink-0 text-earth-lighter group-hover:text-allotment transition-colors duration-300" />}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="font-medium text-earth">{crop.name}</span>
          <p className="text-sm text-earth-lighter leading-relaxed mt-1">{crop.tip}</p>
        </div>
      </div>
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
        className="text-allotment hover:text-allotment-dark font-medium flex items-center gap-2 transition-colors duration-300"
        aria-label={`Previous month: ${MONTH_NAMES[prev]}`}
      >
        <span className="text-xl">&larr;</span> {MONTH_NAMES[prev]}
      </a>
      <a
        href="/calendar"
        className="text-sm text-earth-lighter hover:text-allotment transition-colors duration-300"
      >
        Full calendar
      </a>
      <a
        href={`/sow/${MONTH_SLUGS[next]}`}
        className="text-allotment hover:text-allotment-dark font-medium flex items-center gap-2 transition-colors duration-300"
        aria-label={`Next month: ${MONTH_NAMES[next]}`}
      >
        {MONTH_NAMES[next]} <span className="text-xl">&rarr;</span>
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
  const seasonal = getSeasonalAccent(idx);

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
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header backLink={{ href: "/", label: "\u2190 Home" }} />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <FullWidthSection className="border-b border-earth/6" innerClassName="pt-12 sm:pt-16 pb-14 sm:pb-20">
          <MonthNav idx={idx} />

          <div className="mt-10 sm:mt-14">
            <span className={`text-xs font-semibold tracking-[0.15em] uppercase ${seasonal.text} opacity-70 mb-4 block`}>
              {seasonal.label} sowing guide
            </span>
            <h1 className="tracking-tight">
              <span className="block text-earth-lighter text-lg sm:text-xl font-normal mb-2">What to sow in</span>
              <span className={`block text-7xl sm:text-8xl lg:text-9xl font-serif ${seasonal.text} leading-[0.85] tracking-tighter`}>{name}</span>
            </h1>
            <p className="text-earth-light mt-6 max-w-lg leading-relaxed">
              Based on UK average frost date (mid-April). Enter your postcode on
              the{" "}
              <a href="/" className="text-allotment hover:underline">
                homepage
              </a>{" "}
              for personalised dates.
            </p>
            <MonthDaylight monthIndex={idx} />
          </div>
        </FullWidthSection>

        <div className="py-14 sm:py-20">
          {!hasAnyCrops ? (
            <div className="border border-earth/6 p-10 sm:p-14 text-center">
              <p className="text-earth-light text-lg leading-relaxed">
                Not much to sow outdoors in {name} — but it&apos;s a great time to
                plan and order seeds!
              </p>
            </div>
          ) : (
            <div className="space-y-16 sm:space-y-20">
              {sowIndoors.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2.5 h-2.5 bg-amber rounded-full" aria-hidden="true" />
                    <h2 className="text-xl sm:text-2xl font-serif text-earth tracking-tight">
                      Sow indoors
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {sowIndoors.map((crop) => (
                      <CropCard key={crop.slug} crop={crop} />
                    ))}
                  </div>
                </div>
              )}

              {directSow.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2.5 h-2.5 bg-leaf rounded-full" aria-hidden="true" />
                    <h2 className="text-xl sm:text-2xl font-serif text-earth tracking-tight">
                      Direct sow outdoors
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {directSow.map((crop) => (
                      <CropCard key={crop.slug} crop={crop} />
                    ))}
                  </div>
                </div>
              )}

              {plantOut.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2.5 h-2.5 bg-allotment rounded-full" aria-hidden="true" />
                    <h2 className="text-xl sm:text-2xl font-serif text-earth tracking-tight">
                      Plant out
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {plantOut.map((crop) => (
                      <CropCard key={crop.slug} crop={crop} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-16 sm:mt-20 pt-10 border-t border-earth/6">
            <MonthNav idx={idx} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
