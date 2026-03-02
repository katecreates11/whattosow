import { notFound } from "next/navigation";
import { crops, type Crop } from "@/data/crops";
import type { Metadata } from "next";
import PlantingTool from "@/components/PlantingTool";

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
      return "bg-emerald-100 text-emerald-800";
    case "half-hardy":
      return "bg-amber-100 text-amber-800";
    case "tender":
      return "bg-rose-100 text-rose-800";
  }
}

function weeksToText(weeks: number): string {
  const absWeeks = Math.abs(weeks);
  const weekText = absWeeks === 1 ? "week" : "weeks";
  if (weeks < 0) return `${absWeeks} ${weekText} before your last frost date`;
  if (weeks === 0) return "around your last frost date";
  return `${absWeeks} ${weekText} after your last frost date`;
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <svg
              className="w-7 h-7 text-green-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 20h10" />
              <path d="M10 20c5.5-2.5.8-6.4 3-10" />
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
            </svg>
            <span className="font-bold text-lg text-stone-900">
              What To Sow
            </span>
          </a>
          <a href="/" className="text-sm text-green-700 hover:text-green-800">
            &larr; All crops
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Crop Header */}
        <div className="pt-10 sm:pt-16 pb-8">
          <div className="mb-4">
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${categoryColor(crop.category)}`}
            >
              {categoryLabel(crop.category)}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            When to plant {crop.name.toLowerCase()} in the UK
          </h1>
          <p className="text-lg text-stone-600">
            {crop.tip}
          </p>
        </div>

        {/* Key Info Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {crop.sowIndoorsWeeks !== null && (
            <div className="bg-white rounded-xl border border-stone-200 p-5">
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">
                Sow indoors
              </p>
              <p className="text-lg font-semibold text-stone-900">
                {weeksToText(crop.sowIndoorsWeeks)}
              </p>
              <p className="text-sm text-stone-500 mt-1">
                Use a warm windowsill or propagator
              </p>
            </div>
          )}

          {crop.directSowWeeks !== null && (
            <div className="bg-white rounded-xl border border-stone-200 p-5">
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">
                Direct sow outdoors
              </p>
              <p className="text-lg font-semibold text-stone-900">
                {weeksToText(crop.directSowWeeks)}
              </p>
              <p className="text-sm text-stone-500 mt-1">
                Sow directly into prepared soil
              </p>
            </div>
          )}

          {crop.plantOutWeeks !== null && (
            <div className="bg-white rounded-xl border border-stone-200 p-5">
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">
                Plant out
              </p>
              <p className="text-lg font-semibold text-stone-900">
                {weeksToText(crop.plantOutWeeks)}
              </p>
              <p className="text-sm text-stone-500 mt-1">
                Transplant seedlings to their final position
              </p>
            </div>
          )}

          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">
              Harvest
            </p>
            <p className="text-lg font-semibold text-stone-900">
              ~{crop.harvestWeeks} weeks from sowing
            </p>
            <p className="text-sm text-stone-500 mt-1">
              Space plants {crop.spacingCm}cm apart
            </p>
          </div>
        </div>

        {/* Growing needs */}
        <div className="bg-stone-50 rounded-xl p-5 mb-8">
          <h2 className="font-semibold text-stone-900 mb-2">
            What {crop.name.toLowerCase()} need
          </h2>
          <p className="text-stone-700">{crop.needs}</p>
        </div>

        {/* Personalise CTA */}
        <div className="border-t border-stone-200 pt-10 pb-8">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Get your exact dates
          </h2>
          <p className="text-stone-600 mb-6">
            Enter your postcode to see personalised planting dates for{" "}
            {crop.name.toLowerCase()} based on your local frost date.
          </p>
          <PlantingTool />
        </div>

        {/* Other crops */}
        <div className="border-t border-stone-200 py-10 pb-20">
          <h2 className="text-xl font-bold text-stone-900 mb-4">
            Other crops to explore
          </h2>
          <div className="flex flex-wrap gap-2">
            {crops
              .filter((c) => c.slug !== crop.slug)
              .map((c) => (
                <a
                  key={c.slug}
                  href={`/crops/${c.slug}`}
                  className="px-3 py-1.5 bg-white border border-stone-200 rounded-full text-sm text-stone-700 hover:border-green-300 hover:text-green-800 transition-colors"
                >
                  {c.name}
                </a>
              ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-stone-500">
          <p>What To Sow &mdash; free UK planting calendar by postcode.</p>
        </div>
      </footer>
    </div>
  );
}
