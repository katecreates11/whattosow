"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useGarden } from "@/hooks/useGarden";
import { selectVariety, type SelectedVariety } from "@/lib/lucky-dip-selection";
import { getWeatherBonus, type WeatherBonus } from "@/lib/weather-bonus";
import { getVarietyById, varieties } from "@/data/varieties";
import { crops } from "@/data/crops";
import { loadLocation } from "@/lib/location-storage";
import RecipeSection from "@/components/RecipeSection";
import AffiliateButtons from "@/components/AffiliateButtons";

type InfoPanel = {
  type: "discovery" | "plant-info" | "harvest";
  varietyId: string;
  col: number;
  row: number;
} | null;

export default function PhaserGarden() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const garden = useGarden();
  const [weatherBonus, setWeatherBonus] = useState<WeatherBonus>({
    type: null,
    label: null,
    boostedSlugs: [],
  });
  const [infoPanel, setInfoPanel] = useState<InfoPanel>(null);
  const [lastDiscovery, setLastDiscovery] = useState<SelectedVariety | null>(null);
  const [discoveryPhase, setDiscoveryPhase] = useState<"idle" | "revealing" | "revealed">("idle");

  // Fetch weather on mount
  useEffect(() => {
    const loc = loadLocation();
    getWeatherBonus(loc?.latitude ?? null, loc?.longitude ?? null).then(setWeatherBonus);
  }, []);

  // Initialise Phaser — guard against double-init in strict mode
  const initedRef = useRef(false);
  useEffect(() => {
    if (!gameRef.current || phaserGameRef.current || initedRef.current) return;
    initedRef.current = true;

    // Dynamic import to avoid SSR issues
    import("phaser").then((Phaser) => {
      import("./GardenScene").then(({ default: GardenScene }) => {
        const containerWidth = gameRef.current!.clientWidth;
        const gameWidth = Math.min(containerWidth, 500);
        const gameHeight = Math.min(window.innerHeight * 0.55, 420);

        const game = new Phaser.Game({
          type: Phaser.AUTO,
          parent: gameRef.current!,
          width: gameWidth,
          height: gameHeight,
          backgroundColor: "#F5EFE0",
          scale: {
            mode: Phaser.Scale.NONE,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
          },
          scene: [GardenScene],
          banner: false,
        });

        game.scene.start("GardenScene", {
          callbacks: {
            onEmptyTileTap: (col: number, row: number) => {
              handleEmptyTileTap(col, row);
            },
            onPlantTap: (col: number, row: number, varietyId: string) => {
              setInfoPanel({ type: "plant-info", varietyId, col, row });
            },
            onHarvestTap: (col: number, row: number, varietyId: string) => {
              setInfoPanel({ type: "harvest", varietyId, col, row });
            },
          },
        });

        phaserGameRef.current = game;
      });
    });

    return () => {
      phaserGameRef.current?.destroy(true);
      phaserGameRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getScene = useCallback(() => {
    return phaserGameRef.current?.scene.getScene("GardenScene") as any;
  }, []);

  const handleEmptyTileTap = useCallback(
    (col: number, row: number) => {
      const isFirst = garden.garden.collection.length === 0;
      const result = selectVariety(garden.garden.lastVarietyId, weatherBonus, isFirst);

      if (!result) {
        // Nothing sowable
        return;
      }

      setLastDiscovery(result);
      setDiscoveryPhase("revealing");

      // Plant the seed in the game immediately
      const scene = getScene();
      if (scene) {
        scene.plantSeed(col, row, result.variety.id, result.variety.cropSlug, result.displayRarity, result.variety.name);

        // Show the rarity reveal text in the canvas after the planting animation
        setTimeout(() => {
          scene.showRarityReveal(col, row, result.displayRarity, result.variety.name);
        }, 700);
      }

      // Collect in garden data
      garden.collect(result.variety.id);
      garden.plant(result.variety.id);

      // Track
      if (typeof window !== "undefined" && (window as any).umami) {
        (window as any).umami.track("lucky-dip-discover", {
          variety: result.variety.id,
          rarity: result.displayRarity,
          cropSlug: result.variety.cropSlug,
        });
      }

      // Show the discovery panel after a brief delay (let the animation play)
      setTimeout(() => {
        setDiscoveryPhase("revealed");
        setInfoPanel({ type: "discovery", varietyId: result.variety.id, col, row });
      }, 800);
    },
    [garden, weatherBonus, getScene]
  );

  const handleHarvest = useCallback(
    (col: number, row: number, varietyId: string) => {
      const scene = getScene();
      if (scene) {
        scene.harvestPlant(col, row);
      }
      // Find the plot by slot index and harvest
      const slotIndex = row * 4 + col;
      garden.harvest(slotIndex);
      setInfoPanel(null);

      if (typeof window !== "undefined" && (window as any).umami) {
        (window as any).umami.track("garden-harvest", { variety: varietyId });
      }
    },
    [garden, getScene]
  );

  const closePanel = useCallback(() => {
    setInfoPanel(null);
    setDiscoveryPhase("idle");
  }, []);

  // Get info for the active panel
  const panelVariety = infoPanel ? getVarietyById(infoPanel.varietyId) : null;
  const panelCrop = panelVariety
    ? crops.find((c) => c.slug === panelVariety.cropSlug)
    : null;

  const rarityLabel =
    lastDiscovery?.displayRarity === "legendary"
      ? "Legendary!"
      : lastDiscovery?.displayRarity === "rare"
        ? "Rare find!"
        : lastDiscovery?.displayRarity === "uncommon"
          ? "Nice find!"
          : "A good pick.";

  const rarityColour =
    lastDiscovery?.displayRarity === "legendary" || lastDiscovery?.displayRarity === "rare"
      ? "text-amber"
      : lastDiscovery?.displayRarity === "uncommon"
        ? "text-allotment"
        : "text-earth-lighter";

  return (
    <div className="relative">
      {/* Weather bonus badge */}
      {weatherBonus.label && (
        <div className="text-center py-2 bg-leaf/10">
          <span className="text-xs font-semibold text-allotment flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
            {weatherBonus.label}
          </span>
        </div>
      )}

      {/* Collection counter */}
      <div className="text-center py-3 bg-cream border-b border-earth/8">
        <span className="text-xs text-earth-lighter">
          {garden.garden.collection.length} of {varieties.length} varieties discovered
        </span>
      </div>

      {/* Phaser canvas */}
      <div
        ref={gameRef}
        className="w-full max-w-[500px] mx-auto bg-[#F5EFE0] overflow-hidden"
        style={{ minHeight: "400px" }}
      />

      {/* Info Panel — slides up from bottom */}
      {infoPanel && panelVariety && panelCrop && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={closePanel}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Panel */}
          <div
            className="relative bg-cream w-full max-w-lg max-h-[70vh] overflow-y-auto rounded-t-2xl px-6 py-6 animate-[slideUp_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 bg-earth/20 rounded-full" />
            </div>

            {/* Discovery rarity announcement */}
            {infoPanel.type === "discovery" && lastDiscovery && (
              <div className="text-center mb-4">
                <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${rarityColour}`}>
                  {rarityLabel}
                </span>
              </div>
            )}

            {/* Variety name + personality */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      panelVariety.rarity === "legendary"
                        ? "#ffc800"
                        : panelVariety.rarity === "rare"
                          ? "#D4943A"
                          : panelVariety.rarity === "uncommon"
                            ? "#7BB369"
                            : "#6B5D54",
                  }}
                />
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-earth-lighter">
                  {panelVariety.rarity} &middot; {panelCrop.name}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-earth tracking-tight leading-tight mb-2">
                {panelVariety.name}
              </h2>
              <p className="text-[15px] text-earth-light leading-relaxed font-serif italic">
                {panelVariety.personality}
              </p>
            </div>

            {/* Affiliate links */}
            <AffiliateButtons
              suppliers={panelVariety.seedSuppliers}
              variety={panelVariety.id}
              rarity={panelVariety.rarity}
              eventPrefix={infoPanel.type === "discovery" ? "lucky-dip" : "card-detail"}
            />

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 my-6">
              <div className="bg-sage/30 p-3 text-center rounded">
                <span className="text-lg font-semibold text-earth block">{panelCrop.harvestWeeks}w</span>
                <span className="text-[9px] text-earth-lighter uppercase tracking-wide">Harvest</span>
              </div>
              <div className="bg-sage/30 p-3 text-center rounded">
                <span className="text-lg font-semibold text-earth block">{panelCrop.spacingCm}cm</span>
                <span className="text-[9px] text-earth-lighter uppercase tracking-wide">Spacing</span>
              </div>
              <div className="bg-sage/30 p-3 text-center rounded">
                <span className="text-lg font-semibold text-earth block capitalize">{panelCrop.category}</span>
                <span className="text-[9px] text-earth-lighter uppercase tracking-wide">Type</span>
              </div>
            </div>

            {/* Recipes */}
            <RecipeSection recipes={panelVariety.recipes} />

            {/* Harvest button */}
            {infoPanel.type === "harvest" && (
              <button
                onClick={() => handleHarvest(infoPanel.col, infoPanel.row, infoPanel.varietyId)}
                className="w-full bg-rust text-white font-semibold py-4 rounded hover:bg-rust/90 transition-colors mt-4"
              >
                Harvest {panelVariety.name}
              </button>
            )}

            {/* Growing guide link */}
            <div className="mt-6 text-center">
              <a
                href={`/crops/${panelVariety.cropSlug}`}
                className="text-sm text-allotment font-semibold hover:underline"
              >
                Full growing guide &rarr;
              </a>
            </div>

            {/* Close */}
            <button
              onClick={closePanel}
              className="w-full text-center text-sm text-earth-lighter mt-6 py-2 hover:text-earth-light"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Slide up animation */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
