"use client";

import { type HarvestEntry, type SowingMethod } from "@/lib/harvest";

const METHOD_LABELS: Record<SowingMethod, string> = {
  indoors: "Sowed indoors",
  outdoors: "Sowed outdoors",
  "planted-out": "Planted out",
};

function categoryBorder(cat: string): string {
  switch (cat) {
    case "hardy": return "border-l-leaf";
    case "half-hardy": return "border-l-amber";
    case "tender": return "border-l-tomato";
    default: return "border-l-earth/20";
  }
}

function fmt(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

function fmtShort(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function pct(date: Date, start: Date, end: Date): number {
  const total = end.getTime() - start.getTime();
  if (total <= 0) return 0;
  const pos = date.getTime() - start.getTime();
  return Math.max(0, Math.min(100, (pos / total) * 100));
}

export default function HarvestCard({
  entry,
  onRemove,
}: {
  entry: HarvestEntry;
  onRemove: () => void;
}) {
  const { crop, method, sowDate, plantOutDate, harvestDate, nextSowDate, warnings } = entry;

  const timelineStart = sowDate;
  const timelineEnd = harvestDate;

  return (
    <div className={`harvest-card bg-white border-l-[3px] ${categoryBorder(crop.category)} p-5 sm:p-6 relative`}>
      <button
        onClick={onRemove}
        aria-label={`Remove ${crop.name}`}
        className="absolute top-3 right-3 text-earth-lighter hover:text-tomato transition-colors p-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h3 className="font-serif text-lg text-earth pr-8">{crop.name}</h3>
      <p className="text-xs text-earth-lighter mt-0.5">{METHOD_LABELS[method]} on {fmt(sowDate)}</p>

      <div className="mt-5 mb-4">
        <div className="relative h-2 bg-earth/5 rounded-full overflow-hidden">
          {method === "indoors" && plantOutDate && (
            <div
              className="absolute inset-y-0 bg-amber/60 rounded-l-full"
              style={{
                left: "0%",
                width: `${pct(plantOutDate, timelineStart, timelineEnd)}%`,
              }}
            />
          )}
          <div
            className="absolute inset-y-0 bg-allotment/50"
            style={{
              left: method === "indoors" && plantOutDate
                ? `${pct(plantOutDate, timelineStart, timelineEnd)}%`
                : "0%",
              right: "0%",
            }}
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-leaf-light rounded-full border-2 border-white shadow-sm" />
        </div>

        <div className="relative mt-2 text-[10px] text-earth-lighter h-4">
          <span className="absolute left-0">{fmtShort(sowDate)}</span>
          {method === "indoors" && plantOutDate && (
            <span
              className="absolute -translate-x-1/2"
              style={{ left: `${pct(plantOutDate, timelineStart, timelineEnd)}%` }}
            >
              {fmtShort(plantOutDate)}
            </span>
          )}
          <span className="absolute right-0">{fmtShort(harvestDate)}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        {method === "indoors" && plantOutDate && (
          <div className="flex items-start gap-2">
            <span className="text-allotment shrink-0" aria-hidden="true">&#x1F33F;</span>
            <span className="text-earth">
              <strong>Plant out by:</strong> {fmt(plantOutDate)}
            </span>
          </div>
        )}
        <div className="flex items-start gap-2">
          <span className="text-leaf shrink-0" aria-hidden="true">&#x1F955;</span>
          <span className="text-earth">
            <strong>Harvest from:</strong> {fmt(harvestDate)}
          </span>
        </div>
        {nextSowDate && (
          <div className="flex items-start gap-2">
            <span className="text-amber shrink-0" aria-hidden="true">&#x1F504;</span>
            <span className="text-earth">
              <strong>Sow again by:</strong> {fmt(nextSowDate)}
            </span>
          </div>
        )}
      </div>

      {warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          {warnings.map((w, i) => (
            <div
              key={i}
              className={`text-xs px-3 py-2 border-l-2 ${
                w.type === "frost-risk"
                  ? "bg-tomato-bg border-l-tomato text-tomato"
                  : w.type === "wrong-method"
                    ? "bg-amber-bg border-l-amber text-earth-light"
                    : "bg-frost-bg border-l-frost text-earth-light"
              }`}
            >
              {w.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
