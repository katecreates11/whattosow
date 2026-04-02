"use client";

import type { GardenPlot } from "@/lib/garden-storage";
import { getVarietyById } from "@/data/varieties";
import { crops } from "@/data/crops";
import GardenSlot from "@/components/GardenSlot";

export interface GardenGridProps {
  plots: GardenPlot[];
  totalSlots: number;
  gardenFull: boolean;
  onSlotTap: (slotIndex: number, varietyId?: string) => void;
  onHarvest: (slotIndex: number) => void;
}

function getCropNameForVariety(cropSlug: string): string {
  return crops.find((c) => c.slug === cropSlug)?.name ?? cropSlug;
}

export default function GardenGrid({
  plots,
  totalSlots,
  gardenFull,
  onSlotTap,
  onHarvest,
}: GardenGridProps) {
  // Build a map from slotIndex → plot for quick lookup
  const plotBySlot = new Map<number, GardenPlot>();
  for (const plot of plots) {
    plotBySlot.set(plot.slotIndex, plot);
  }

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {Array.from({ length: totalSlots }, (_, i) => {
          const plot = plotBySlot.get(i);
          const variety = plot ? getVarietyById(plot.varietyId) : undefined;
          const cropName = variety ? getCropNameForVariety(variety.cropSlug) : undefined;

          return (
            <GardenSlot
              key={i}
              plot={plot}
              variety={variety}
              cropName={cropName}
              onTap={() => onSlotTap(i, plot?.varietyId)}
              onHarvest={plot ? () => onHarvest(i) : undefined}
            />
          );
        })}
      </div>

      {gardenFull && (
        <div className="mt-6 rounded-lg bg-leaf-bg border border-leaf/20 px-5 py-4 text-center">
          <p className="text-sm text-allotment font-medium leading-snug">
            Your allotment is thriving!
          </p>
          <p className="text-sm text-earth-lighter mt-1">
            Save your garden to unlock a new raised bed.
          </p>
          <a
            href="/my-garden"
            className="
              inline-block mt-3
              text-[11px] font-bold tracking-[0.08em] uppercase
              bg-allotment text-cream
              px-4 py-2 rounded
              hover:bg-allotment-dark transition-colors duration-150
            "
          >
            Save garden
          </a>
        </div>
      )}
    </div>
  );
}
