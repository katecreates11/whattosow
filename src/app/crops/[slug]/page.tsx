import { notFound } from "next/navigation";
import { crops, type Crop } from "@/data/crops";
import type { Metadata } from "next";
import PlantingTool from "@/components/PlantingTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  LeafDivider,
  HardyIllustration,
  HalfHardyIllustration,
  TenderIllustration,
  getCropIcon,
} from "@/components/SVGIllustrations";

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

function weeksToText(weeks: number): string {
  const absWeeks = Math.abs(weeks);
  const weekText = absWeeks === 1 ? "week" : "weeks";
  if (weeks < 0) return `${absWeeks} ${weekText} before your last frost date`;
  if (weeks === 0) return "around your last frost date";
  return `${absWeeks} ${weekText} after your last frost date`;
}

function cropCategoryBorder(cat: Crop["category"]): string {
  switch (cat) {
    case "hardy":
      return "border-l-3 border-leaf bg-leaf-bg/60";
    case "half-hardy":
      return "border-l-3 border-amber bg-amber-bg";
    case "tender":
      return "border-l-3 border-tomato bg-tomato-bg";
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

  return (
    <div className="min-h-screen">
      <Header backLink={{ href: "/", label: "\u2190 All crops" }} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Crop Header */}
        <div className={`-mx-4 sm:-mx-6 px-4 sm:px-6 pt-10 sm:pt-16 pb-8 ${categoryBg(crop.category)}`}>
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

        {/* Key Info Cards — color-block style */}
        <div className="grid sm:grid-cols-2 gap-4 my-8">
          {crop.sowIndoorsWeeks !== null && (
            <div className="bg-amber-bg rounded-xl p-5 border-l-3 border-amber">
              <p className="text-xs font-medium text-earth-lighter uppercase tracking-wide mb-1">
                Sow indoors
              </p>
              <p className="text-lg font-semibold text-earth">
                {weeksToText(crop.sowIndoorsWeeks)}
              </p>
              <p className="text-sm text-earth-lighter mt-1">
                Use a warm windowsill or propagator
              </p>
            </div>
          )}

          {crop.directSowWeeks !== null && (
            <div className="bg-allotment-bg rounded-xl p-5 border-l-3 border-leaf">
              <p className="text-xs font-medium text-earth-lighter uppercase tracking-wide mb-1">
                Direct sow outdoors
              </p>
              <p className="text-lg font-semibold text-earth">
                {weeksToText(crop.directSowWeeks)}
              </p>
              <p className="text-sm text-earth-lighter mt-1">
                Sow directly into prepared soil
              </p>
            </div>
          )}

          {crop.plantOutWeeks !== null && (
            <div className="bg-leaf-bg rounded-xl p-5 border-l-3 border-allotment">
              <p className="text-xs font-medium text-earth-lighter uppercase tracking-wide mb-1">
                Plant out
              </p>
              <p className="text-lg font-semibold text-earth">
                {weeksToText(crop.plantOutWeeks)}
              </p>
              <p className="text-sm text-earth-lighter mt-1">
                Transplant seedlings to their final position
              </p>
            </div>
          )}

          <div className="bg-cream rounded-xl p-5 border-l-3 border-earth-lighter">
            <p className="text-xs font-medium text-earth-lighter uppercase tracking-wide mb-1">
              Harvest
            </p>
            <p className="text-lg font-semibold text-earth">
              ~{crop.harvestWeeks} weeks from sowing
            </p>
            <p className="text-sm text-earth-lighter mt-1">
              Space plants {crop.spacingCm}cm apart
            </p>
          </div>
        </div>

        {/* Growing needs */}
        <div className="bg-allotment-bg rounded-xl p-5 mb-8">
          <h2 className="font-semibold text-earth mb-2">
            What {crop.name.toLowerCase()} need
          </h2>
          <p className="text-earth-light">{crop.needs}</p>
        </div>

        {/* Personalise CTA */}
        <LeafDivider className="my-4" />
        <div className="pt-6 pb-8">
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
      </main>

      <Footer />
    </div>
  );
}
