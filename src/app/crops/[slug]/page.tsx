import { notFound } from "next/navigation";
import Image from "next/image";
import { crops, type Crop } from "@/data/crops";
import type { Metadata } from "next";
import PlantingTool from "@/components/PlantingTool";
import PersonalisedCropDates from "@/components/PersonalisedCropDates";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullWidthSection from "@/components/FullWidthSection";
import {
  HardyIllustration,
  HalfHardyIllustration,
  TenderIllustration,
  getCropIcon,
} from "@/components/SVGIllustrations";
import { getCropImagePath } from "@/lib/crop-images";

function CompanionSection({ crop }: { crop: Crop }) {
  if (!crop.companionPlants?.length && !crop.avoidPlants?.length) return null;

  return (
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-10">
      {crop.companionPlants && crop.companionPlants.length > 0 && (
        <div className="border border-earth/6 p-6 hover:border-earth/15 transition-colors duration-300">
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
        <div className="border border-earth/6 p-6 hover:border-earth/15 transition-colors duration-300">
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
      return "bg-allotment-bg";
    case "half-hardy":
      return "bg-amber-bg";
    case "tender":
      return "bg-tomato-bg";
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Header backLink={{ href: "/#explore-crops", label: "\u2190 All crops" }} />

      <article id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Hero photo — full bleed */}
        {crop.unsplashId && (
          <FullWidthSection className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
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
          </FullWidthSection>
        )}

        {/* Crop Header — overlaps photo */}
        <FullWidthSection
          className={`${categoryHeaderBg(crop.category)} ${crop.unsplashId ? "-mt-16 relative z-10" : ""}`}
          innerClassName={`${crop.unsplashId ? "pt-10 sm:pt-12" : "pt-12 sm:pt-20"} pb-12`}
        >
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2.5 mb-6">
                <span className={`w-2 h-2 rounded-full ${categoryDot[crop.category]}`} />
                <span className="text-xs font-semibold tracking-[0.1em] uppercase text-earth-lighter">
                  {categoryLabel(crop.category)}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-earth tracking-tight leading-[0.95] mb-6">
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
        </FullWidthSection>

        {/* Two-column layout */}
        <div className="py-12 sm:py-16 lg:flex lg:gap-12">
          {/* Main content */}
          <div className="lg:w-[58%]">
            <PersonalisedCropDates crop={crop} />

            {/* Growing needs */}
            <div className="border border-earth/6 p-6 sm:p-8 mb-10">
              <h2 className="font-semibold text-earth mb-3">
                What {crop.name.toLowerCase()} need
              </h2>
              <p className="text-earth-light leading-relaxed">{crop.needs}</p>
            </div>

            {/* Varieties */}
            {crop.varieties && crop.varieties.length > 0 && (
              <div className="mb-10">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-earth-lighter mb-3 block">
                  Varieties
                </span>
                <h2 className="text-2xl font-light text-earth tracking-tight mb-6">
                  Varieties to try
                </h2>
                <div className="space-y-3">
                  {crop.varieties.map((v) => (
                    <div key={v.name} className="border border-earth/6 p-5 hover:border-earth/15 transition-colors duration-300">
                      <span className="font-medium text-earth">{v.name}</span>
                      <p className="text-sm text-earth-lighter mt-1 leading-relaxed">{v.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <CompanionSection crop={crop} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-[42%]">
            <div className="lg:sticky lg:top-8 space-y-8">
              {/* Seeds */}
              {crop.seedSuppliers && crop.seedSuppliers.length > 0 && (
                <div className="border border-earth/6 p-6 sm:p-8">
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-earth-lighter mb-3 block">
                    Seeds
                  </span>
                  <h2 className="font-semibold text-earth mb-4">
                    Where to buy {crop.name.toLowerCase()} seeds
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {crop.seedSuppliers.map((supplier) => (
                      <a
                        key={supplier.name}
                        href={supplier.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-umami-event="affiliate-click"
                        data-umami-event-supplier={supplier.name}
                        className="group inline-flex items-center gap-1.5 px-4 py-2.5 border border-earth/8 text-sm font-medium text-earth hover:border-allotment hover:text-allotment transition-colors duration-300"
                      >
                        {supplier.name}
                        <svg className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15,3 21,3 21,9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    ))}
                  </div>
                  <p className="text-xs text-earth-lighter mt-4">
                    Links may be affiliate links. We may earn a small commission at no extra cost to you.
                  </p>
                </div>
              )}

              {/* Personalise CTA */}
              <div id="get-dates" className="bg-allotment-dark p-6 sm:p-8 scroll-mt-20">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Get your exact dates
                </h2>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">
                  Enter your postcode for personalised planting dates for{" "}
                  {crop.name.toLowerCase()}.
                </p>
                <PlantingTool />
              </div>
            </div>
          </div>
        </div>

        {/* Other crops — horizontal scroll */}
        <FullWidthSection className="border-t border-earth/6" innerClassName="py-16 sm:py-20 pb-20">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-earth-lighter mb-3 block">
            Keep exploring
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-earth tracking-tight mb-8">
            Other crops to grow
          </h2>

          {sameCategoryCrops.length > 0 && (
            <div className="mb-6">
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6" role="region" aria-label="Similar crops" tabIndex={0}>
                {sameCategoryCrops.map((c) => {
                  const cImage = getCropImagePath(c.slug);
                  const Icon = getCropIcon(c.slug);
                  return (
                    <a
                      key={c.slug}
                      href={`/crops/${c.slug}`}
                      className="group block border border-earth/6 p-5 hover:border-earth/15 transition-colors duration-300 shrink-0 w-48"
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
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6" role="region" aria-label="Other crops to grow" tabIndex={0}>
              {otherCategoryCrops.map((c) => {
                const cImage = getCropImagePath(c.slug);
                const Icon = getCropIcon(c.slug);
                return (
                  <a
                    key={c.slug}
                    href={`/crops/${c.slug}`}
                    className="group block border border-earth/6 p-5 hover:border-earth/15 transition-colors duration-300 shrink-0 w-48"
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
        </FullWidthSection>
      </article>

      <Footer />
    </div>
  );
}
