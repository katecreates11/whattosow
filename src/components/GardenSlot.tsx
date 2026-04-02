"use client";

import type { GardenPlot } from "@/lib/garden-storage";
import type { Variety } from "@/data/varieties";

export interface GardenSlotProps {
  plot?: GardenPlot;
  variety?: Variety;
  cropName?: string;
  onTap: () => void;
  onHarvest?: () => void;
}

type GrowthStage = "empty" | "seed" | "growing" | "ready";

function getGrowthStage(plot: GardenPlot): { stage: GrowthStage; pct: number } {
  const sowDate = plot.sowDate ?? plot.plantOutDate;
  if (!sowDate) return { stage: "seed", pct: 0 };

  const now = Date.now();
  const sow = new Date(sowDate).getTime();
  const harvest = new Date(plot.expectedHarvest).getTime();
  const total = harvest - sow;

  if (total <= 0) return { stage: "ready", pct: 100 };

  const elapsed = now - sow;
  const pct = Math.max(0, Math.min(120, (elapsed / total) * 100));

  let stage: GrowthStage;
  if (pct >= 100) stage = "ready";
  else if (pct >= 33) stage = "growing";
  else stage = "seed";

  return { stage, pct };
}

export default function GardenSlot({ plot, variety, cropName, onTap, onHarvest }: GardenSlotProps) {
  if (!plot) {
    // Empty slot
    return (
      <button
        onClick={onTap}
        aria-label="Empty plot — tap to discover a new variety"
        className="
          aspect-square rounded-lg
          bg-earth/8 border-2 border-dashed border-earth/15
          flex items-center justify-center
          hover:-translate-y-0.5 hover:border-earth/25
          transition-all duration-200
          cursor-pointer
          focus-visible:outline-2 focus-visible:outline-allotment focus-visible:outline-offset-2
        "
      >
        <span className="text-earth/20 text-2xl leading-none select-none" aria-hidden="true">+</span>
      </button>
    );
  }

  const { stage, pct } = getGrowthStage(plot);
  const displayName = variety?.name ?? plot.varietyId;

  if (stage === "ready") {
    return (
      <button
        onClick={onHarvest ?? onTap}
        aria-label={`${displayName} is ready to harvest — tap to harvest`}
        className="
          aspect-square rounded-lg
          bg-leaf-bg border-2 border-leaf
          flex flex-col items-center justify-center gap-1.5
          hover:-translate-y-1 hover:shadow-md hover:shadow-leaf/20
          transition-all duration-200
          cursor-pointer
          focus-visible:outline-2 focus-visible:outline-allotment focus-visible:outline-offset-2
        "
      >
        <div
          className="w-16 h-16 rounded-full bg-leaf flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]"
          aria-hidden="true"
        >
          <span className="text-2xl" role="img" aria-label="vegetable">🌿</span>
        </div>
        <span className="text-[10px] font-semibold text-allotment text-center leading-tight px-1 max-w-full truncate">
          {displayName}
        </span>
        <span className="text-[9px] font-bold tracking-wide uppercase bg-leaf text-cream px-1.5 py-0.5 rounded-full">
          Ready!
        </span>
      </button>
    );
  }

  if (stage === "growing") {
    return (
      <button
        onClick={onTap}
        aria-label={`${displayName} — growing, ${Math.round(pct)}% of the way to harvest`}
        className="
          aspect-square rounded-lg
          bg-leaf-bg/60 border-2 border-leaf/30
          flex flex-col items-center justify-center gap-1.5
          opacity-75
          hover:opacity-90 hover:-translate-y-0.5
          transition-all duration-200
          cursor-pointer
          focus-visible:outline-2 focus-visible:outline-allotment focus-visible:outline-offset-2
        "
      >
        <div
          className="w-12 h-12 rounded-full bg-leaf/30 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-lg" role="img" aria-label="seedling">🌱</span>
        </div>
        <span className="text-[10px] text-earth-lighter text-center leading-tight px-1 max-w-full truncate">
          {displayName}
        </span>
        {/* Progress bar */}
        <div className="w-10 h-1 rounded-full bg-earth/10 overflow-hidden" aria-hidden="true">
          <div
            className="h-full bg-leaf/60 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, pct)}%` }}
          />
        </div>
      </button>
    );
  }

  // Seed stage (0–33%)
  return (
    <button
      onClick={onTap}
      aria-label={`${displayName} — just planted`}
      className="
        aspect-square rounded-lg
        bg-earth/5 border-2 border-earth/10
        flex flex-col items-center justify-center gap-1.5
        opacity-50
        hover:opacity-65 hover:-translate-y-0.5
        transition-all duration-200
        cursor-pointer
        focus-visible:outline-2 focus-visible:outline-allotment focus-visible:outline-offset-2
      "
    >
      <div
        className="w-8 h-8 rounded-full bg-earth/20 flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="text-sm" role="img" aria-label="seed">🌰</span>
      </div>
      <span className="text-[10px] text-earth-lighter text-center leading-tight px-1 max-w-full truncate">
        {displayName}
      </span>
    </button>
  );
}
