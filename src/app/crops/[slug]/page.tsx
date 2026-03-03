import { notFound } from "next/navigation";
import Image from "next/image";
import { crops, type Crop } from "@/data/crops";
import type { Metadata } from "next";
import PlantingTool from "@/components/PlantingTool";
import PersonalisedCropDates from "@/components/PersonalisedCropDates";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  LeafDivider,
  HardyIllustration,
  HalfHardyIllustration,
  TenderIllustration,
  getCropIcon,
} from "@/components/SVGIllustrations";

function CompanionSection({ crop }: { crop: Crop }) {
  if (!crop.companionPlants?.length && !crop.avoidPlants?.length) return null;

  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-8">
      {crop.companionPlants && crop.companionPlants.length > 0 && (
        <div className="bg-leaf-bg rounded-xl p-5">
          <h2 className="font-semibold text-allotment mb-2">Good companions</h2>
          <ul className="space-y-1">
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
        <div className="bg-tomato-bg rounded-xl p-5">
          <h2 className="font-semibold text-tomato mb-2">Keep apart from</h2>
          <ul className="space-y-1">
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
      return "Half-hardy — needs some protection from frost";
    case "tender":
      return "Tender — no frost tolerance, needs warmth";
  }
}

function categoryColor(cat: Crop["category"]): string {
  switch (cat) {
    case "hardy":
      return "bg-leaf-bg text-allotment";
    case "half-hardy":
      return "bg-amber-light text-earth";
    case "tender":
      return "bg-tomato-light text-tomato";
  }
}

function categoryBg(cat: Crop["category"]): string {
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

function cropCategoryBorder(cat: Crop["category"]): string {
  switch (cat) {
    case "hardy":
      return "border-l-[3px] border-leaf bg-leaf-bg/60";
    case "half-hardy":
      return "border-l-[3px] border-amber bg-amber-bg";
    case "tender":
      return "border-l-[3px] border-tomato bg-tomato-bg";
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
    <div className="min-h-screen">
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
        {/* Hero photo */}
        {crop.unsplashId && (
          <div className="-mx-4 sm:-mx-6 relative h-48 sm:h-64 overflow-hidden">
            <Image
              src={`https://images.unsplash.com/photo-${crop.unsplashId}?w=1200&h=400&fit=crop&auto=format&q=75`}
              alt={`${crop.name} growing`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <p className="absolute bottom-2 right-3 text-[10px] text-white/50">
              Photo: Unsplash
            </p>
          </div>
        )}

        {/* Crop Header */}
        <div className={`-mx-4 sm:-mx-6 px-4 sm:px-6 ${crop.unsplashId ? "pt-6" : "pt-10 sm:pt-16"} pb-8 ${categoryBg(crop.category)}`}>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="mb-4">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${categoryColor(crop.category)}`}
                >
                  {categoryLabel(crop.category)}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-earth tracking-tight mb-4">
                When to plant {crop.name.toLowerCase()} in the UK
              </h1>
              <p className="text-lg text-earth-light">
                {crop.tip}
              </p>
            </div>
            <div className="hidden sm:block shrink-0 opacity-70">
              <CategoryIllustration category={crop.category} className="w-28 h-20" />
            </div>
          </div>
        </div>

        {/* Key Info Cards — personalised when postcode is saved */}
        <PersonalisedCropDates crop={crop} />

        {/* Growing needs */}
        <div className="bg-allotment-bg rounded-xl p-5 mb-8">
          <h2 className="font-semibold text-earth mb-2">
            What {crop.name.toLowerCase()} need
          </h2>
          <p className="text-earth-light">{crop.needs}</p>
        </div>

        {/* Companion planting */}
        <CompanionSection crop={crop} />

        {/* Where to buy seeds */}
        {crop.seedSuppliers && crop.seedSuppliers.length > 0 && (
          <div className="bg-cream rounded-xl border border-earth/10 p-5 mb-8">
            <h2 className="font-semibold text-earth mb-3">
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
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-lg border border-earth/10 text-sm font-medium text-earth hover:border-allotment hover:text-allotment transition-colors"
                >
                  {supplier.name}
                  <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ))}
            </div>
            <p className="text-xs text-earth-lighter mt-3">
              Links may be affiliate links. We may earn a small commission at no extra cost to you.
            </p>
          </div>
        )}

        {/* Personalise CTA */}
        <LeafDivider className="my-4" />
        <div id="get-dates" className="pt-6 pb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-earth mb-2">
            Get your exact dates
          </h2>
          <p className="text-earth-light mb-6">
            Enter your postcode to see personalised planting dates for{" "}
            {crop.name.toLowerCase()} based on your local frost date.
          </p>
          <PlantingTool />
        </div>

        {/* Other crops — grouped by category with color-coded cards */}
        <LeafDivider className="my-4" />
        <div className="py-10 pb-20">
          <h2 className="text-xl font-bold text-earth mb-6">
            Other crops to explore
          </h2>

          {/* Same category first */}
          {sameCategoryCrops.length > 0 && (
            <div className="mb-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {sameCategoryCrops.map((c) => {
                  const Icon = getCropIcon(c.slug);
                  return (
                    <a
                      key={c.slug}
                      href={`/crops/${c.slug}`}
                      className={`${cropCategoryBorder(c.category)} rounded-xl p-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
                    >
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="w-4 h-4 shrink-0" />}
                        <span className="font-medium text-sm text-earth">{c.name}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other categories */}
          {otherCategoryCrops.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {otherCategoryCrops.map((c) => {
                const Icon = getCropIcon(c.slug);
                return (
                  <a
                    key={c.slug}
                    href={`/crops/${c.slug}`}
                    className={`${cropCategoryBorder(c.category)} rounded-xl p-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
                  >
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="w-4 h-4 shrink-0" />}
                      <span className="font-medium text-sm text-earth">{c.name}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
