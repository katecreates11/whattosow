"use client";

import { varieties, getCropSlugsWithVarieties, getVarietiesForCrop, type Rarity } from "@/data/varieties";
import { crops } from "@/data/crops";

interface CollectionGridProps {
  collectedIds: Set<string>;
  onCardClick: (varietyId: string) => void;
}

const RARITY_BORDER: Record<Rarity, string> = {
  common: "border-l-earth/30",
  uncommon: "border-l-leaf",
  rare: "border-l-amber",
  legendary: "border-l-amber",
};

const RARITY_DOT: Record<Rarity, string> = {
  common: "bg-earth/30",
  uncommon: "bg-leaf",
  rare: "bg-amber",
  legendary: "bg-amber",
};

const RARITY_LABEL: Record<Rarity, string> = {
  common: "text-earth/40",
  uncommon: "text-leaf",
  rare: "text-amber",
  legendary: "text-amber",
};

export default function CollectionGrid({ collectedIds, onCardClick }: CollectionGridProps) {
  const cropSlugs = getCropSlugsWithVarieties();
  const totalVarieties = varieties.length;
  const totalCollected = collectedIds.size;
  const progressPct = totalVarieties > 0 ? (totalCollected / totalVarieties) * 100 : 0;

  return (
    <div className="space-y-10">
      {/* Overall progress */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-sm font-medium text-earth">
            {totalCollected} of {totalVarieties} varieties discovered
          </span>
          <span className="text-xs text-earth-lighter">{Math.round(progressPct)}%</span>
        </div>
        <div className="h-2 bg-earth/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-sage rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Grouped sections */}
      {cropSlugs.map((cropSlug) => {
        const cropVarieties = getVarietiesForCrop(cropSlug);
        const crop = crops.find((c) => c.slug === cropSlug);
        const cropName = crop?.name ?? cropSlug;
        const collectedCount = cropVarieties.filter((v) => collectedIds.has(v.id)).length;

        return (
          <section key={cropSlug}>
            <div className="flex items-baseline gap-2 mb-3">
              <h2 className="text-base font-semibold text-earth">{cropName}</h2>
              <span className="text-xs text-earth-lighter">
                {collectedCount} of {cropVarieties.length}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {cropVarieties.map((variety) => {
                const isCollected = collectedIds.has(variety.id);

                if (isCollected) {
                  const isLegendary = variety.rarity === "legendary";
                  return (
                    <button
                      key={variety.id}
                      onClick={() => onCardClick(variety.id)}
                      className={`
                        text-left border-l-[3px] ${RARITY_BORDER[variety.rarity]}
                        bg-cream border border-earth/8 p-3
                        hover:border-earth/20 hover:shadow-sm hover:-translate-y-0.5
                        transition-all duration-200 cursor-pointer
                        ${isLegendary ? "bg-gradient-to-br from-amber/5 to-cream" : ""}
                      `}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${RARITY_DOT[variety.rarity]}`} />
                        <span className={`text-[10px] font-medium uppercase tracking-wide ${RARITY_LABEL[variety.rarity]}`}>
                          {variety.rarity}
                        </span>
                      </div>
                      <p className="font-medium text-sm text-earth leading-snug">{variety.name}</p>
                      <p className="text-xs text-earth-lighter mt-0.5">{cropName}</p>
                    </button>
                  );
                }

                return (
                  <div
                    key={variety.id}
                    className="bg-earth/5 border border-earth/6 border-l-[3px] border-l-earth/10 p-3 flex items-center justify-center min-h-[80px]"
                    aria-label="Undiscovered variety"
                  >
                    <span className="text-2xl text-earth/20 select-none">?</span>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
