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

const dotColor: Record<string, string> = {
  hardy: "bg-leaf",
  "half-hardy": "bg-amber",
  tender: "bg-tomato",
};

function CropCard({ crop, dimmed }: { crop: Crop; dimmed: boolean }) {
  const Icon = getCropIcon(crop.slug);

  return (
    <a
      href={`/crops/${crop.slug}`}
      className={`group block border border-earth/6 p-5 hover:border-earth/15 transition-colors duration-300 ${dimmed ? "opacity-40" : ""}`}
    >
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor[crop.category]}`} />
        {Icon && <Icon className="w-4 h-4 shrink-0 text-earth-lighter group-hover:text-allotment transition-colors duration-300" />}
        <span className="font-medium text-earth">{crop.name}</span>
      </div>
      <p className="text-sm text-earth-lighter leading-relaxed ml-4">
        {crop.directSowWeeks !== null
          ? `Direct sow ${Math.abs(crop.directSowWeeks)}w ${crop.directSowWeeks <= 0 ? "before" : "after"} frost`
          : crop.sowIndoorsWeeks !== null
            ? `Start indoors ${Math.abs(crop.sowIndoorsWeeks)}w before frost`
            : ""}
      </p>
    </a>
  );
}

export default function CropIndex({ crops, initialLimit }: { crops: Crop[]; initialLimit?: number }) {
  const [showInSeason, setShowInSeason] = useState(false);
  const [expanded, setExpanded] = useState(!initialLimit);

  const hardyCrops = crops.filter((c) => c.category === "hardy");
  const halfHardyCrops = crops.filter((c) => c.category === "half-hardy");
  const tenderCrops = crops.filter((c) => c.category === "tender");

  const limit = expanded ? undefined : initialLimit;

  const sowableNow = showInSeason ? new Set(crops.filter(isSowableNow).map(c => c.slug)) : null;

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment mb-2 block">
            Crop index
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-earth tracking-tight">Explore crops</h2>
          <p className="text-earth-lighter text-sm mt-2 leading-relaxed">
            Select any crop for a personalised growing guide.
          </p>
        </div>
        <button
          onClick={() => setShowInSeason(!showInSeason)}
          aria-pressed={showInSeason}
          className={`shrink-0 ml-4 text-xs font-medium px-4 py-2 border transition-colors duration-300 ${
            showInSeason
              ? "bg-allotment text-white border-allotment"
              : "bg-transparent text-earth-light border-earth/15 hover:border-earth/30"
          }`}
        >
          {showInSeason ? "Showing in season" : "In season now"}
        </button>
      </div>

      {showInSeason && (
        <p className="text-xs text-earth-lighter mb-6 -mt-4">
          Based on UK average frost date (mid-April). Enter your postcode above for personalised results.
        </p>
      )}

      {/* Hardy */}
      <div className="mb-10">
        <h3 className="text-xs font-semibold text-earth-lighter uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-leaf rounded-full" />
          Hardy crops
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          {(limit ? hardyCrops.slice(0, limit) : hardyCrops).map((crop) => (
            <CropCard
              key={crop.slug}
              crop={crop}
              dimmed={sowableNow !== null && !sowableNow.has(crop.slug)}
            />
          ))}
        </div>
      </div>

      {/* Half-hardy */}
      <div className="mb-10">
        <h3 className="text-xs font-semibold text-earth-lighter uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-amber rounded-full" />
          Half-hardy crops
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          {(limit ? halfHardyCrops.slice(0, limit) : halfHardyCrops).map((crop) => (
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
        <h3 className="text-xs font-semibold text-earth-lighter uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-tomato rounded-full" />
          Tender crops
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          {(limit ? tenderCrops.slice(0, limit) : tenderCrops).map((crop) => (
            <CropCard
              key={crop.slug}
              crop={crop}
              dimmed={sowableNow !== null && !sowableNow.has(crop.slug)}
            />
          ))}
        </div>
      </div>

      {/* Show all toggle */}
      {!expanded && initialLimit && (
        <div className="text-center mt-8">
          <button
            onClick={() => setExpanded(true)}
            className="text-sm font-medium text-allotment hover:text-allotment-dark transition-colors"
          >
            Browse all {crops.length} growing guides &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
