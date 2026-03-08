import { notFound } from "next/navigation";
import Image from "next/image";
import { crops, type Crop } from "@/data/crops";
import type { Metadata } from "next";

import PlantingTool from "@/components/PlantingTool";
import PersonalisedCropDates from "@/components/PersonalisedCropDates";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {
  HardyIllustration,
  HalfHardyIllustration,
  TenderIllustration,
  getCropIcon,
} from "@/components/SVGIllustrations";
import { getCropImagePath } from "@/lib/crop-images";
import { getMinSoilTemp } from "@/data/crops";
import SeedSupplierLinks from "@/components/SeedSupplierLinks";
import ContextualEmailCapture from "@/components/ContextualEmailCapture";
import CropScrollDepth from "@/components/CropScrollDepth";
import SpacingDiagram from "@/components/SpacingDiagram";
import GrowingJourney from "@/components/GrowingJourney";
import { getCropActionMonths, getAvgFrostDate, MONTH_NAMES, MONTH_SLUGS } from "@/lib/calendar";

function CompanionSection({ crop }: { crop: Crop }) {
  if (!crop.companionPlants?.length && !crop.avoidPlants?.length) return null;

  return (
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-10">
      {crop.companionPlants && crop.companionPlants.length > 0 && (
        <div className="bg-sage p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-leaf" />
            <h2 className="font-semibold text-earth">Good companions</h2>
          </div>
          <ul className="space-y-1.5">
            {crop.companionPlants.map((name) => {
              const companion = crops.find((c) => c.name === name);
              return (
                <li key={name} className="text-sm text-earth-light">
                  {companion ? (
                    <a href={`/crops/${companion.slug}`} className="text-allotment hover:underline">
                      {name}
                    </a>
                  ) : (
                    name
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {crop.avoidPlants && crop.avoidPlants.length > 0 && (
        <div className="bg-blush p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-tomato" />
            <h2 className="font-semibold text-earth">Keep apart from</h2>
          </div>
          <ul className="space-y-1.5">
            {crop.avoidPlants.map((name) => (
              <li key={name} className="text-sm text-earth-light">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function categoryLabel(cat: Crop["category"]): string {
  switch (cat) {
    case "hardy":
      return "Hardy — can tolerate frost";
    case "half-hardy":
      return "Half-hardy — needs some protection";
    case "tender":
      return "Tender — no frost tolerance";
  }
}

const categoryDot: Record<string, string> = {
  hardy: "bg-leaf",
  "half-hardy": "bg-amber",
  tender: "bg-tomato",
};

function categoryHeaderBg(cat: Crop["category"]): string {
  switch (cat) {
    case "hardy":
      return "bg-sage";
    case "half-hardy":
      return "bg-ochre";
    case "tender":
      return "bg-blush";
  }
}

function CategoryIllustration({ category, className }: { category: Crop["category"]; className?: string }) {
  switch (category) {
    case "hardy":
      return <HardyIllustration className={className} />;
    case "half-hardy":
      return <HalfHardyIllustration className={className} />;
    case "tender":
      return <TenderIllustration className={className} />;
  }
}

const actionLabels: Record<string, string> = {
  sowIndoors: "Sow indoors",
  directSow: "Direct sow",
  plantOut: "Plant out",
};

function SowingMonths({ crop }: { crop: Crop }) {
  const frostDate = getAvgFrostDate();
  const actions = getCropActionMonths(crop, frostDate).filter(a => a.action !== "harvest");
  if (actions.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="font-semibold text-earth mb-4">
        When to sow {crop.name.toLowerCase()}
      </h2>
      <div className="space-y-3">
        {actions.map(({ action, months }) => (
          <div key={action} className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-earth-lighter w-24 shrink-0">
              {actionLabels[action]}
            </span>
            {months.map(m => (
              <a
                key={m}
                href={`/sow/${MONTH_SLUGS[m]}`}
                className="text-sm text-rust hover:text-earth underline decoration-rust/30 transition-colors"
              >
                {MONTH_NAMES[m]}
              </a>
            ))}
          </div>
        ))}
      </div>
      <p className="text-xs text-earth-lighter mt-3">
        Based on UK average frost date. <a href="/" className="text-rust hover:underline">Enter your postcode</a> for exact dates, or <a href="/sow-in" className="text-rust hover:underline">find your city</a>.
      </p>
    </div>
  );
}

export async function generateStaticParams() {
  return crops.map((crop) => ({ slug: crop.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const crop = crops.find((c) => c.slug === slug);
  if (!crop) return {};

  return {
    title: `When to Plant ${crop.name} in the UK — What To Sow`,
    description: `Find out exactly when to sow and plant ${crop.name.toLowerCase()} based on your UK postcode. Get your local frost date and personalised planting times for ${crop.name.toLowerCase()}.`,
    keywords: [
      `when to plant ${crop.name.toLowerCase()} UK`,
      `when to sow ${crop.name.toLowerCase()}`,
      `${crop.name.toLowerCase()} planting time UK`,
      `grow ${crop.name.toLowerCase()} UK`,
    ],
    openGraph: {
      title: `When to Plant ${crop.name} in the UK`,
      description: `Personalised planting times for ${crop.name.toLowerCase()} based on your UK postcode and local frost date.`,
      type: "article",
      locale: "en_GB",
    },
    alternates: {
      canonical: `/crops/${slug}`,
    },
  };
}

export default async function CropPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const crop = crops.find((c) => c.slug === slug);
  if (!crop) notFound();

  const otherCrops = crops.filter((c) => c.slug !== crop.slug);
  const sameCategoryCrops = otherCrops.filter((c) => c.category === crop.category);
  const otherCategoryCrops = otherCrops.filter((c) => c.category !== crop.category);

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
        name: "Crops",
        item: "https://whattosow.co.uk/#explore-crops",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: crop.name,
        item: `https://whattosow.co.uk/crops/${crop.slug}`,
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Grow ${crop.name} in the UK`,
    description: crop.tip,
    step: [
      ...(crop.sowIndoorsWeeks
        ? [
            {
              "@type": "HowToStep",
              name: "Start seeds indoors",
              text: `Sow ${crop.name.toLowerCase()} seeds indoors ${crop.sowIndoorsWeeks} weeks before your last frost date.`,
            },
          ]
        : []),
      ...(crop.directSowWeeks != null
        ? [
            {
              "@type": "HowToStep",
              name: "Direct sow outdoors",
              text: `Direct sow ${crop.name.toLowerCase()} seeds outdoors ${crop.directSowWeeks >= 0 ? `${crop.directSowWeeks} weeks after` : `${Math.abs(crop.directSowWeeks)} weeks before`} your last frost date.`,
            },
          ]
        : []),
      ...(crop.plantOutWeeks != null
        ? [
            {
              "@type": "HowToStep",
              name: "Plant out",
              text: `Plant out ${crop.name.toLowerCase()} ${crop.plantOutWeeks >= 0 ? `${crop.plantOutWeeks} weeks after` : `${Math.abs(crop.plantOutWeeks)} weeks before`} your last frost date.`,
            },
          ]
        : []),
      ...(crop.harvestWeeks
        ? [
            {
              "@type": "HowToStep",
              name: "Harvest",
              text: `Harvest ${crop.name.toLowerCase()} approximately ${crop.harvestWeeks} weeks after planting.`,
            },
          ]
        : []),
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <CropScrollDepth slug={crop.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Header backLink={{ href: "/#explore-crops", label: "\u2190 All crops" }} />

      <article id="main-content">
        {/* Hero photo — full bleed */}
        {crop.unsplashId && (
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
            <Image
              src={`https://images.unsplash.com/photo-${crop.unsplashId}?w=1600&h=600&fit=crop&auto=format&q=75`}
              alt={`${crop.name} growing`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <p className="absolute bottom-3 right-4 text-[10px] text-white/40">
              Photo: Unsplash
            </p>
          </div>
        )}

        {/* Crop Header — overlaps photo */}
        <div
          className={`${categoryHeaderBg(crop.category)} ${crop.unsplashId ? "-mt-16 relative z-10" : ""} px-6 sm:px-10 lg:px-16`}
        >
          <div className={`max-w-4xl mx-auto ${crop.unsplashId ? "pt-10 sm:pt-12" : "pt-12 sm:pt-20"} pb-12`}>
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-6">
                  <span className={`w-2 h-2 rounded-full ${categoryDot[crop.category]}`} />
                  <span className="text-xs font-semibold tracking-[0.1em] uppercase text-earth-lighter">
                    {categoryLabel(crop.category)}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-earth tracking-tight leading-[0.95] mb-6">
                  When to plant<br />
                  <span className="font-normal">{crop.name.toLowerCase()}</span> in the UK
                </h1>
                <p className="text-lg text-earth-light leading-relaxed max-w-2xl">
                  {crop.tip}
                </p>
              </div>
              {getCropImagePath(crop.slug) ? (
                <div className="hidden md:block shrink-0">
                  <Image
                    src={getCropImagePath(crop.slug)!}
                    alt={crop.name}
                    width={120}
                    height={120}
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="hidden md:block shrink-0 opacity-[0.15]">
                  <CategoryIllustration category={crop.category} className="w-36 h-28" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16"><div className="max-w-4xl mx-auto lg:flex lg:gap-12">
          {/* Main content */}
          <div className="lg:w-[58%]">
            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              <div className="bg-sage p-3 text-center">
                <svg className="w-5 h-5 mx-auto mb-1.5 text-earth-lighter" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg font-semibold text-earth block">{crop.harvestWeeks}w</span>
                <span className="text-[10px] text-earth-lighter">to harvest</span>
              </div>
              <div className="bg-sage p-3 text-center">
                <svg className="w-5 h-5 mx-auto mb-1.5 text-earth-lighter" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                <span className="text-lg font-semibold text-earth block">{crop.spacingCm}cm</span>
                <span className="text-[10px] text-earth-lighter">spacing</span>
              </div>
              <div className="bg-sage p-3 text-center">
                <svg className="w-5 h-5 mx-auto mb-1.5 text-earth-lighter" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                </svg>
                <span className="text-lg font-semibold text-earth block">{getMinSoilTemp(crop)}&deg;C</span>
                <span className="text-[10px] text-earth-lighter">min soil temp</span>
              </div>
              <div className="bg-sage p-3 text-center">
                <svg className="w-5 h-5 mx-auto mb-1.5 text-earth-lighter" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                <span className="text-lg font-semibold text-earth block capitalize">{crop.category}</span>
                <span className="text-[10px] text-earth-lighter">hardiness</span>
              </div>
            </div>

            <PersonalisedCropDates crop={crop} />

            {/* Growing journey timeline */}
            <GrowingJourney crop={crop} />

            {/* Inline seed CTA — mobile-visible, high engagement position */}
            <SeedSupplierLinks crop={crop} variant="inline" />

            {/* Growing needs */}
            <div className="bg-sage p-6 sm:p-8 mb-10">
              <h2 className="font-semibold text-earth mb-3">
                What {crop.name.toLowerCase()} need
              </h2>
              <p className="text-earth-light leading-relaxed">{crop.needs}</p>
            </div>

            {/* Spacing diagram */}
            <SpacingDiagram crop={crop} />

            {/* Varieties */}
            {crop.varieties && crop.varieties.length > 0 && (
              <div className="mb-10">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-earth-lighter mb-3 block">
                  Varieties
                </span>
                <h2 className="text-2xl font-serif text-earth tracking-tight mb-6">
                  Varieties to try
                </h2>
                <div className="space-y-3">
                  {crop.varieties.map((v) => (
                    <div key={v.name} className="bg-ochre/60 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="font-medium text-earth">{v.name}</span>
                          <p className="text-sm text-earth-lighter mt-1 leading-relaxed">{v.note}</p>
                        </div>
                        <div className="shrink-0 mt-0.5">
                          <SeedSupplierLinks crop={crop} variant="compact" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <CompanionSection crop={crop} />

            {/* When to sow — month links */}
            <SowingMonths crop={crop} />

            {/* Contextual email capture */}
            <div className="mb-10">
              <ContextualEmailCapture cropName={crop.name} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[42%]">
            <div className="lg:sticky lg:top-20 space-y-8">
              {/* Seeds — sidebar variant (desktop) */}
              <SeedSupplierLinks crop={crop} variant="sidebar" />

              {/* Personalise CTA */}
              <div id="get-dates" className="bg-allotment-dark p-6 sm:p-8 scroll-mt-20">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Get your exact dates
                </h2>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">
                  Enter your postcode for personalised planting dates for{" "}
                  {crop.name.toLowerCase()}.
                </p>
                <PlantingTool hideCropList />
              </div>
            </div>
          </div>
        </div></div>

        {/* Other crops — horizontal scroll */}
        <div className="border-t border-earth/6 px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto py-16 sm:py-20 pb-20">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-earth-lighter mb-3 block">
              Keep exploring
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth tracking-tight mb-8">
              Other crops to grow
            </h2>

            {sameCategoryCrops.length > 0 && (
              <div className="mb-6">
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2" role="region" aria-label="Similar crops" tabIndex={0}>
                  {sameCategoryCrops.map((c) => {
                    const cImage = getCropImagePath(c.slug);
                    const Icon = getCropIcon(c.slug);
                    return (
                      <a
                        key={c.slug}
                        href={`/crops/${c.slug}`}
                        className="group block bg-sage/60 p-5 hover:bg-sage transition-colors duration-300 shrink-0 w-48"
                      >
                        {cImage ? (
                          <div className="flex justify-center mb-3">
                            <Image src={cImage} alt="" width={48} height={48} className="object-contain" />
                          </div>
                        ) : null}
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryDot[c.category]}`} />
                          {!cImage && Icon && <Icon className="w-4 h-4 shrink-0 text-earth-lighter" />}
                          <span className="font-medium text-sm text-earth">{c.name}</span>
                        </div>
                        <p className="text-xs text-earth-lighter leading-relaxed line-clamp-2">{c.tip.slice(0, 80)}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {otherCategoryCrops.length > 0 && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2" role="region" aria-label="Other crops to grow" tabIndex={0}>
                {otherCategoryCrops.map((c) => {
                  const cImage = getCropImagePath(c.slug);
                  const Icon = getCropIcon(c.slug);
                  return (
                    <a
                      key={c.slug}
                      href={`/crops/${c.slug}`}
                      className="group block bg-sage/60 p-5 hover:bg-sage transition-colors duration-300 shrink-0 w-48"
                    >
                      {cImage ? (
                        <div className="flex justify-center mb-3">
                          <Image src={cImage} alt="" width={48} height={48} className="object-contain" />
                        </div>
                      ) : null}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryDot[c.category]}`} />
                        {!cImage && Icon && <Icon className="w-4 h-4 shrink-0 text-earth-lighter" />}
                        <span className="font-medium text-sm text-earth">{c.name}</span>
                      </div>
                      <p className="text-xs text-earth-lighter leading-relaxed line-clamp-2">{c.tip.slice(0, 80)}</p>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
