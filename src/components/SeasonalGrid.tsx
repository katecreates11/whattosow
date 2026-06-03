"use client";

import { useEffect, useState, useCallback } from "react";
import { inSeasonCrops, plantOutCrops, harvestCrops, ukAverageFrost, type CropEntry } from "@/lib/season-core";
import { calculateLastFrostDate } from "@/lib/frost";
import { loadLocation } from "@/lib/location-storage";
import CropCardGrid from "@/components/CropCardGrid";

type Lens = "sow" | "grow" | "harvest";

function compute(lens: Lens, frost: Date): CropEntry[] {
  if (lens === "sow") return inSeasonCrops(frost);
  if (lens === "grow") return plantOutCrops(frost);
  return harvestCrops(frost);
}

const SOW_GROUPS = [
  { method: "direct sow", label: "Direct sow now" },
  { method: "sow indoors", label: "Start indoors now" },
];

/**
 * Renders the Sow / Grow / Harvest crop lists, recomputed for the visitor's own
 * last-frost date when their postcode is known (falls back to the UK average for
 * server render / no-JS). This is the weather-personalised heart of the site.
 */
export default function SeasonalGrid({
  lens,
  heading,
  emptyNote,
}: {
  lens: Lens;
  heading?: string;
  emptyNote?: string;
}) {
  // initial state = UK average (deterministic, matches the server render)
  const [entries, setEntries] = useState<CropEntry[]>(() => compute(lens, ukAverageFrost()));
  const [place, setPlace] = useState<string | null>(null);

  const refresh = useCallback(() => {
    const loc = loadLocation();
    if (loc) {
      setEntries(compute(lens, calculateLastFrostDate(loc.latitude, loc.longitude)));
      setPlace(loc.adminDistrict);
    } else {
      setEntries(compute(lens, ukAverageFrost()));
      setPlace(null);
    }
  }, [lens]);

  useEffect(() => {
    refresh();
    window.addEventListener("whattosow:location-updated", refresh);
    return () => window.removeEventListener("whattosow:location-updated", refresh);
  }, [refresh]);

  const note = place
    ? `Tuned to your veg patch in ${place}`
    : "Showing the UK average — add your postcode to tune it to your veg beds";

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth-lighter mb-7">{note}</p>

      {lens === "sow" ? (
        (() => {
          const groups = SOW_GROUPS.map((g) => ({
            ...g,
            items: entries.filter((e) => e.status.method === g.method),
          })).filter((g) => g.items.length > 0);
          if (groups.length === 0) return <CropCardGrid entries={[]} emptyNote={emptyNote} />;
          return (
            <div className="space-y-12">
              {groups.map((g) => (
                <div key={g.method}>
                  <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-allotment border-b border-earth/15 pb-3 mb-7">
                    {g.label} <span className="text-earth-lighter">&middot; {g.items.length}</span>
                  </div>
                  <CropCardGrid entries={g.items} showSeeds />
                </div>
              ))}
            </div>
          );
        })()
      ) : (
        <div>
          {heading && (
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-allotment border-b border-earth/15 pb-3 mb-7">
              {heading} <span className="text-earth-lighter">&middot; {entries.length}</span>
            </div>
          )}
          <CropCardGrid entries={entries} emptyNote={emptyNote} />
        </div>
      )}
    </div>
  );
}
