"use client";

import type { GardenPlot } from "@/lib/garden-storage";
import { getVarietyById } from "@/data/varieties";

export interface HarvestLogProps {
  plots: GardenPlot[];
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export default function HarvestLog({ plots }: HarvestLogProps) {
  if (plots.length === 0) return null;

  return (
    <section aria-labelledby="harvest-log-heading" className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <h2
          id="harvest-log-heading"
          className="text-lg font-semibold text-earth tracking-tight"
        >
          Harvested
        </h2>
        <span className="text-[11px] font-bold tracking-wide uppercase bg-earth/10 text-earth-lighter px-2 py-0.5 rounded-full">
          {plots.length} {plots.length === 1 ? "crop" : "crops"}
        </span>
      </div>

      <ul className="space-y-3">
        {plots.map((plot, i) => {
          const variety = getVarietyById(plot.varietyId);
          const displayName = variety?.name ?? plot.varietyId;
          const sowDate = plot.sowDate ?? plot.plantOutDate;
          const supplierUrl = variety?.seedSuppliers?.[0]?.url;

          return (
            <li
              key={`${plot.varietyId}-${i}`}
              className="
                flex items-start justify-between gap-3
                rounded-lg bg-cream border border-earth/10
                px-4 py-3
              "
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-earth truncate">{displayName}</p>
                <p className="text-[11px] text-earth-lighter mt-0.5 leading-snug">
                  {sowDate ? `Planted ${formatDate(sowDate)}` : "Planted —"}
                  {" — "}
                  {plot.harvestedAt ? `Harvested ${formatDate(plot.harvestedAt)}` : "Harvested —"}
                </p>
              </div>
              {supplierUrl && (
                <a
                  href={supplierUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    shrink-0
                    text-[10px] font-bold tracking-[0.07em] uppercase
                    text-allotment border border-allotment/30
                    px-2.5 py-1 rounded
                    hover:bg-leaf-bg transition-colors duration-150
                    whitespace-nowrap
                  "
                >
                  Grow again?
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-4 text-center">
        <a
          href="/lucky-dip"
          className="text-sm text-allotment hover:text-allotment-dark font-medium transition-colors duration-150"
        >
          Discover something new →
        </a>
      </div>
    </section>
  );
}
