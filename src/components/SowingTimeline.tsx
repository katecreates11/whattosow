"use client";

import { useMemo, Fragment } from "react";
import { crops } from "@/data/crops";
import { getCropActionMonths, MONTH_NAMES, MONTH_SLUGS, getAvgFrostDate, type SowingAction } from "@/lib/calendar";
import { getCropIcon } from "@/components/SVGIllustrations";

const actionColor: Record<SowingAction, string> = {
  sowIndoors: "bg-amber",
  directSow: "bg-leaf",
  plantOut: "bg-allotment",
  harvest: "bg-amber-light",
};

export default function SowingTimeline() {
  const frostDate = useMemo(() => getAvgFrostDate(), []);

  const sortedCrops = useMemo(() => {
    const order = { hardy: 0, "half-hardy": 1, tender: 2 };
    return [...crops].sort(
      (a, b) => order[a.category] - order[b.category] || a.name.localeCompare(b.name)
    );
  }, []);

  const cropData = useMemo(() => {
    return sortedCrops.map((crop) => {
      const actions = getCropActionMonths(crop, frostDate);
      const monthActions: SowingAction[][] = Array.from({ length: 12 }, () => []);
      for (const { action, months } of actions) {
        for (const m of months) {
          monthActions[m].push(action);
        }
      }
      return { crop, monthActions };
    });
  }, [sortedCrops, frostDate]);

  return (
    <div>
      <div className="overflow-x-auto -mx-4 sm:mx-0" role="region" aria-label="Sowing timeline — scroll horizontally to view all months" tabIndex={0}>
        <div className="min-w-[800px] px-4 sm:px-0">
          <div
            className="grid"
            style={{ gridTemplateColumns: "150px repeat(12, 1fr)" }}
          >
            {/* Header row */}
            <div className="py-2 border-b border-earth/10" />
            {MONTH_NAMES.map((m, i) => (
              <a
                key={i}
                href={`/sow/${MONTH_SLUGS[i]}`}
                className="text-xs font-medium text-earth-lighter text-center py-2 border-b border-earth/10 hover:text-allotment"
              >
                {m.slice(0, 3)}
              </a>
            ))}

            {/* Crop rows */}
            {cropData.map(({ crop, monthActions }) => {
              const Icon = getCropIcon(crop.slug);
              return (
                <Fragment key={crop.slug}>
                  <a
                    href={`/crops/${crop.slug}`}
                    className="text-xs text-earth font-medium py-2 pr-2 truncate flex items-center gap-1.5 border-b border-earth/5 hover:text-allotment"
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                    <span className="truncate">{crop.name}</span>
                  </a>
                  {monthActions.map((actions, m) => (
                    <div
                      key={m}
                      className="py-2 px-0.5 border-b border-earth/5 flex flex-col justify-center gap-0.5"
                    >
                      {actions.map((action) => (
                        <div
                          key={action}
                          className={`h-2 rounded-full ${actionColor[action]}`}
                        />
                      ))}
                    </div>
                  ))}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 text-xs text-earth-light">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-2 rounded-full bg-amber" aria-hidden="true" />
          Sow indoors
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-2 rounded-full bg-leaf" aria-hidden="true" />
          Direct sow
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-2 rounded-full bg-allotment" aria-hidden="true" />
          Plant out
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-2 rounded-full bg-amber-light" aria-hidden="true" />
          Harvest
        </span>
      </div>
    </div>
  );
}
