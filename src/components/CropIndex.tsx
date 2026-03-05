"use client";

import { useState, useEffect, useRef } from "react";
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

const borderColor: Record<string, string> = {
  hardy: "border-l-[3px] border-l-leaf",
  "half-hardy": "border-l-[3px] border-l-amber",
  tender: "border-l-[3px] border-l-tomato",
};

const hoverBg: Record<string, string> = {
  hardy: "group-hover:bg-leaf-bg/40",
  "half-hardy": "group-hover:bg-amber-bg/40",
  tender: "group-hover:bg-tomato-bg/40",
};

// Known crop PNGs — checked at build time on server, but CropIndex is client-side
// so we hardcode the slugs that have images
const CROP_IMAGES = new Set([
  "beetroot", "broad-beans", "carrots", "courgette", "kale",
  "lettuce", "onions", "peas", "potato", "radishes", "spinach", "tomatoes",
]);

function CropCard({ crop, dimmed, isSowable, index }: { crop: Crop; dimmed: boolean; isSowable: boolean; index: number }) {
  const Icon = getCropIcon(crop.slug);
  const hasImage = CROP_IMAGES.has(crop.slug);

  return (
    <a
      href={`/crops/${crop.slug}`}
      className={`group block border border-earth/6 ${borderColor[crop.category]} ${hoverBg[crop.category]} p-4 sm:p-5 hover:border-earth/15 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${dimmed ? "opacity-40" : ""}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-3">
        {/* Crop image or icon */}
        {hasImage ? (
          <img
            src={`/images/crops/${crop.slug}.png`}
            alt=""
            width={40}
            height={40}
            className="shrink-0 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        ) : Icon ? (
          <div className="w-10 h-10 shrink-0 flex items-center justify-center">
            <Icon className="w-6 h-6 text-earth-lighter group-hover:text-allotment transition-colors duration-300" />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-medium text-earth group-hover:text-allotment transition-colors duration-300">{crop.name}</span>
            {isSowable && (
              <span className="inline-block bg-allotment text-white text-[10px] font-semibold px-1.5 py-0.5 leading-none tracking-wide uppercase shrink-0">
                Sow now
              </span>
            )}
          </div>
          <p className="text-sm text-earth-lighter leading-relaxed">
            {crop.directSowWeeks !== null
              ? `Direct sow ${Math.abs(crop.directSowWeeks)}w ${crop.directSowWeeks <= 0 ? "before" : "after"} frost`
              : crop.sowIndoorsWeeks !== null
                ? `Start indoors ${Math.abs(crop.sowIndoorsWeeks)}w before frost`
                : ""}
          </p>
        </div>
      </div>
    </a>
  );
}

function StaggerGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // Children animate in via CSS when visible class is added
      }}
      data-visible={visible ? "true" : "false"}
    >
      {children}
    </div>
  );
}

export default function CropIndex({ crops, initialLimit }: { crops: Crop[]; initialLimit?: number }) {
  const [showInSeason, setShowInSeason] = useState(false);
  const [expanded, setExpanded] = useState(!initialLimit);

  const hardyCrops = crops.filter((c) => c.category === "hardy");
  const halfHardyCrops = crops.filter((c) => c.category === "half-hardy");
  const tenderCrops = crops.filter((c) => c.category === "tender");

  const limit = expanded ? undefined : initialLimit;

  const sowableSet = new Set(crops.filter(isSowableNow).map(c => c.slug));
  const sowableNow = showInSeason ? sowableSet : null;

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment mb-2 block">
            Crop index
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-earth tracking-tight">Explore crops</h2>
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
        <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 stagger-grid">
          {(limit ? hardyCrops.slice(0, limit) : hardyCrops).map((crop, i) => (
            <CropCard
              key={crop.slug}
              crop={crop}
              dimmed={sowableNow !== null && !sowableNow.has(crop.slug)}
              isSowable={sowableSet.has(crop.slug)}
              index={i}
            />
          ))}
        </StaggerGrid>
      </div>

      {/* Half-hardy */}
      <div className="mb-10">
        <h3 className="text-xs font-semibold text-earth-lighter uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-amber rounded-full" />
          Half-hardy crops
        </h3>
        <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 stagger-grid">
          {(limit ? halfHardyCrops.slice(0, limit) : halfHardyCrops).map((crop, i) => (
            <CropCard
              key={crop.slug}
              crop={crop}
              dimmed={sowableNow !== null && !sowableNow.has(crop.slug)}
              isSowable={sowableSet.has(crop.slug)}
              index={i}
            />
          ))}
        </StaggerGrid>
      </div>

      {/* Tender */}
      <div>
        <h3 className="text-xs font-semibold text-earth-lighter uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-tomato rounded-full" />
          Tender crops
        </h3>
        <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 stagger-grid">
          {(limit ? tenderCrops.slice(0, limit) : tenderCrops).map((crop, i) => (
            <CropCard
              key={crop.slug}
              crop={crop}
              dimmed={sowableNow !== null && !sowableNow.has(crop.slug)}
              isSowable={sowableSet.has(crop.slug)}
              index={i}
            />
          ))}
        </StaggerGrid>
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
