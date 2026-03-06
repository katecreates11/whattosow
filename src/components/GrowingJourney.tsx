import type { Crop } from "@/data/crops";

/**
 * Visual timeline showing the growing journey from sowing to harvest.
 * Shows key milestones: sow indoors → plant out → direct sow → harvest
 */
export default function GrowingJourney({ crop }: { crop: Crop }) {
  // Build milestones relative to last frost date (week 0)
  const milestones: { label: string; week: number; color: string }[] = [];

  if (crop.sowIndoorsWeeks != null) {
    milestones.push({
      label: "Sow indoors",
      week: crop.sowIndoorsWeeks,
      color: "bg-amber",
    });
  }

  if (crop.directSowWeeks != null) {
    milestones.push({
      label: "Direct sow",
      week: crop.directSowWeeks,
      color: "bg-leaf",
    });
  }

  if (crop.plantOutWeeks != null) {
    milestones.push({
      label: "Plant out",
      week: crop.plantOutWeeks,
      color: "bg-allotment",
    });
  }

  // Harvest is relative to the latest sowing action
  const sowWeek = crop.plantOutWeeks ?? crop.directSowWeeks ?? crop.sowIndoorsWeeks ?? 0;
  const harvestWeek = sowWeek + crop.harvestWeeks;
  milestones.push({
    label: "Harvest",
    week: harvestWeek,
    color: "bg-tomato",
  });

  // Sort by week
  milestones.sort((a, b) => a.week - b.week);

  // Calculate range for positioning
  const minWeek = Math.min(...milestones.map((m) => m.week));
  const maxWeek = Math.max(...milestones.map((m) => m.week));
  const range = maxWeek - minWeek || 1;

  // Find the frost date position
  const frostPct = ((0 - minWeek) / range) * 100;

  function weekLabel(w: number): string {
    if (w === 0) return "Last frost";
    if (w < 0) return `${Math.abs(w)}w before frost`;
    return `${w}w after frost`;
  }

  return (
    <div className="mb-10">
      <h2 className="font-semibold text-earth mb-4">
        Growing journey
      </h2>
      <div className="border border-earth/6 p-4 sm:p-6">
        {/* Timeline bar */}
        <div className="relative pt-2 pb-8">
          {/* Background track */}
          <div className="h-2 bg-earth/6 rounded-full relative">
            {/* Filled range from first action to harvest */}
            <div
              className="absolute inset-y-0 bg-gradient-to-r from-leaf/30 via-allotment/20 to-amber/30 rounded-full"
              style={{ left: "0%", right: "0%" }}
            />

            {/* Frost date marker */}
            {frostPct >= 0 && frostPct <= 100 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-px h-6 bg-frost border border-frost"
                style={{ left: `${frostPct}%` }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-frost font-medium whitespace-nowrap">
                  Last frost
                </span>
              </div>
            )}
          </div>

          {/* Milestone dots and labels */}
          {milestones.map((m, i) => {
            const pct = ((m.week - minWeek) / range) * 100;
            // Alternate label position to avoid overlap
            const above = i % 2 === 0;
            return (
              <div
                key={m.label}
                className="absolute"
                style={{ left: `${pct}%`, top: "0.25rem" }}
              >
                {/* Dot */}
                <div className={`w-4 h-4 rounded-full ${m.color} border-2 border-white shadow-sm -translate-x-1/2`} />
                {/* Label */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${
                    above ? "-top-10" : "top-6"
                  }`}
                >
                  <span className="text-[10px] font-semibold text-earth block text-center">
                    {m.label}
                  </span>
                  <span className="text-[9px] text-earth-lighter block text-center">
                    {weekLabel(m.week)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary line */}
        <p className="text-xs text-earth-lighter text-center mt-2">
          {crop.harvestWeeks} weeks from{" "}
          {crop.plantOutWeeks != null ? "planting out" : "sowing"} to harvest
          {crop.sowIndoorsWeeks != null && crop.plantOutWeeks != null && (
            <> &middot; Start indoors{" "}
              {Math.abs(crop.sowIndoorsWeeks - (crop.plantOutWeeks ?? 0))} weeks
              before planting out</>
          )}
        </p>
      </div>
    </div>
  );
}
