import type { Variety, Rarity } from "@/data/varieties";

const CROPS_WITH_PHOTOS = new Set([
  "tomatoes", "strawberries", "peas", "courgettes", "carrots",
  "sweetcorn", "pumpkins", "lettuce", "runner-beans", "squash",
]);

const PHOTO_PATHS: Record<string, { hero: string; alt: string }> = {
  tomatoes: { hero: "/photos/crops/tomatoes-cherry-on-vine.webp", alt: "Cherry tomatoes on the vine" },
  strawberries: { hero: "/photos/crops/strawberry-ripe-close-up.webp", alt: "A ripe strawberry" },
  peas: { hero: "/photos/crops/peas-in-pods-flat-lay.webp", alt: "Fresh peas in pods" },
  courgettes: { hero: "/photos/crops/courgette-with-flowers.webp", alt: "Courgette with flowers" },
  carrots: { hero: "/photos/crops/carrots-fresh-harvest.webp", alt: "Fresh harvested carrots" },
  sweetcorn: { hero: "/photos/crops/sweetcorn-harvest.webp", alt: "Sweetcorn harvest" },
  pumpkins: { hero: "/photos/crops/pumpkin-growing.webp", alt: "Pumpkin growing" },
  lettuce: { hero: "/photos/crops/lettuce-with-marigolds.webp", alt: "Lettuce with marigolds" },
  "runner-beans": { hero: "/photos/crops/peas-purple-pod-opened.webp", alt: "Purple bean pod" },
  squash: { hero: "/photos/crops/courgette-with-flowers.webp", alt: "Squash with flowers" },
};

const RARITY_BORDER: Record<Rarity, string> = {
  common: "border-earth/20",
  uncommon: "border-leaf ring-1 ring-leaf/20",
  rare: "border-amber ring-1 ring-amber/30",
  legendary: "border-amber ring-2 ring-amber/40",
};

const RARITY_BADGE: Record<Rarity, string> = {
  common: "bg-earth/10 text-earth-lighter",
  uncommon: "bg-leaf/15 text-allotment",
  rare: "bg-amber/15 text-amber",
  legendary: "bg-amber/20 text-amber",
};

interface VarietyCardProps {
  variety: Variety;
  displayRarity: Rarity;
  seasonalBadge: string | null;
  cropName: string;
  categoryLabel: string;
}

export default function VarietyCard({ variety, displayRarity, seasonalBadge, cropName, categoryLabel }: VarietyCardProps) {
  const photo = PHOTO_PATHS[variety.cropSlug];

  return (
    <div className={`border-2 ${RARITY_BORDER[displayRarity]} bg-cream p-6 sm:p-8`}>
      {photo && (
        <div className="aspect-[3/2] overflow-hidden bg-earth/5 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6">
          <img src={photo.hero} alt={photo.alt} className="w-full h-full object-cover" loading="eager" />
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 ${RARITY_BADGE[displayRarity]}`}>
          {displayRarity}
        </span>
        <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 bg-sage/40 text-allotment">
          {categoryLabel}
        </span>
        {seasonalBadge && (
          <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 bg-tomato/15 text-tomato">
            {seasonalBadge}
          </span>
        )}
      </div>
      <h2 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight leading-tight mb-1">
        {variety.name}
      </h2>
      <p className="text-sm text-earth-lighter mb-4">{cropName}</p>
      <p className="text-[15px] text-earth-light leading-relaxed font-serif italic">
        {variety.personality}
      </p>
    </div>
  );
}
