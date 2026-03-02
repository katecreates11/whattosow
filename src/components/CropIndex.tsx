"use client";

import { useState } from "react";
import { type Crop } from "@/data/crops";
import { getCropIcon } from "@/components/SVGIllustrations";

// Use UK average last frost of ~April 15 for the "in season" filter
function isSowableNow(crop: Crop): boolean {
  const now = new Date();
  const year = now.getFullYear();
  const avgLastFrost = new Date(year, 3, 15); // April 15
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksToFrost = (avgLastFrost.getTime() - now.getTime()) / msPerWeek;
  const weeksAfterFrost = -weeksToFrost;
  const window = 3;

  if (crop.sowIndoorsWeeks !== null) {
    const target = -crop.sowIndoorsWeeks;
    const diff = weeksToFrost - target;
    if (diff >= -window && diff <= window) return true;
  }
  if (crop.directSowWeeks !== null) {
    const target = -crop.directSowWeeks;
    const diff = weeksToFrost - target;
    if (diff >= -window && diff <= window) return true;
  }
  if (crop.plantOutWeeks !== null) {
    const diff = weeksAfterFrost - crop.plantOutWeeks;
    if (diff >= -window && diff <= window) return true;
  }
  return false;
}

function CropCard({ crop, dimmed }: { crop: Crop; dimmed: boolean }) {
  const Icon = getCropIcon(crop.slug);
  const categoryStyles: Record<string, string> = {
    hardy: "bg-leaf-bg/60 border-l-3 border-leaf",
    "half-hardy": "bg-amber-bg border-l-3 border-amber",
    tender: "bg-tomato-bg border-l-3 border-tomato",
  };

  return (
    <a
      href={`/crops/${crop.slug}`}
      className={`${categoryStyles[crop.category]} rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${dimmed ? "opacity-40" : ""}`}
    >
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon className="w-5 h-5 shrink-0" />}
        <span className="font-medium text-sm text-earth">{crop.name}</span>
      </div>
      <p className="text-xs text-earth-lighter">
        {crop.directSowWeeks !== null
          ? `Direct sow ${Math.abs(crop.directSowWeeks)}w ${crop.directSowWeeks <= 0 ? "before" : "after"} frost`
          : crop.sowIndoorsWeeks !== null
            ? `Start indoors ${Math.abs(crop.sowIndoorsWeeks)}w before frost`
            : ""}
      </p>
    </a>
  );
}

export default function CropIndex({ crops }: { crops: Crop[] }) {
  const [showInSeason, setShowInSeason] = useState(false);

  const hardyCrops = crops.filter((c) => c.category === "hardy");
  const halfHardyCrops = crops.filter((c) => c.category === "half-hardy");
  const tenderCrops = crops.filter((c) => c.category === "tender");

  const sowableNow = showInSeason ? new Set(crops.filter(isSowableNow).map(c => c.slug)) : null;

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-earth">Explore crops</h2>
          <p className="text-earth-light text-sm mt-1">
            Tap any crop for detailed UK planting times based on your local frost date.
          </p>
        </div>
        <button
          onClick={() => setShowInSeason(!showInSeason)}
          className={`shrink-0 ml-4 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
            showInSeason
              ? "bg-allotment text-white border-allotment"
              : "bg-white text-earth-light border-earth/15 hover:border-allotment/30"
          }`}
        >
          {showInSeason ? "Showing in season" : "In season now"}
        </button>
      </div>

      {/* Hardy */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-allotment uppercase tracking-wide mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-leaf rounded-full" />
          Hardy crops
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {hardyCrops.map((crop) => (
            <CropCard
              key={crop.slug}
              crop={crop}
              dimmed={sowableNow !== null && !sowableNow.has(crop.slug)}
            />
          ))}
        </div>
      </div>

      {/* Half-hardy */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-amber uppercase tracking-wide mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-amber rounded-full" />
          Half-hardy crops
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {halfHardyCrops.map((crop) => (
            <CropCard
              key={crop.slug}
              crop={crop}
              dimmed={sowableNow !== null && !sowableNow.has(crop.slug)}
            />
          ))}
        </div>
      </div>

      {/* Tender */}
      <div>
        <h3 className="text-sm font-semibold text-tomato uppercase tracking-wide mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-tomato rounded-full" />
          Tender crops
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {tenderCrops.map((crop) => (
            <CropCard
              key={crop.slug}
              crop={crop}
              dimmed={sowableNow !== null && !sowableNow.has(crop.slug)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
