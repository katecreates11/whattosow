"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useGarden } from "@/hooks/useGarden";
import { selectVariety, type SelectedVariety } from "@/lib/lucky-dip-selection";
import { getWeatherBonus, type WeatherBonus } from "@/lib/weather-bonus";
import { getVarietyById, getVarietiesForCrop, varieties, type Variety } from "@/data/varieties";
import { crops } from "@/data/crops";
import { loadLocation } from "@/lib/location-storage";
import { isSowableNow } from "@/lib/sowable";
import RecipeSection from "@/components/RecipeSection";
import AffiliateButtons from "@/components/AffiliateButtons";

// Which crops have illustration PNGs
const CROP_ILLUSTRATIONS: Record<string, string> = {
  tomatoes: "/images/crops/tomatoes.png",
  carrots: "/images/crops/carrots.png",
  peas: "/images/crops/peas.png",
  beetroot: "/images/crops/beetroot.png",
  "broad-beans": "/images/crops/broad-beans.png",
  courgettes: "/images/crops/courgette.png",
  kale: "/images/crops/kale.png",
  lettuce: "/images/crops/lettuce.png",
  "onion-sets": "/images/crops/onions.png",
  "early-potatoes": "/images/crops/potato.png",
  "maincrop-potatoes": "/images/crops/potato.png",
  radishes: "/images/crops/radishes.png",
  spinach: "/images/crops/spinach.png",
};

type PlantMode = "lucky-dip" | "choose";
type InfoPanel = {
  type: "discovery" | "plant-info" | "harvest" | "choose-variety";
  varietyId?: string;
  col: number;
  row: number;
} | null;

export default function PhaserGarden() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const initedRef = useRef(false);
  const garden = useGarden();
  const [weatherBonus, setWeatherBonus] = useState<WeatherBonus>({
    type: null,
    label: null,
    boostedSlugs: [],
  });
  const [infoPanel, setInfoPanel] = useState<InfoPanel>(null);
  const [lastDiscovery, setLastDiscovery] = useState<SelectedVariety | null>(null);
  const [plantMode, setPlantMode] = useState<PlantMode>("lucky-dip");
  const [pendingSlot, setPendingSlot] = useState<{ col: number; row: number } | null>(null);

  useEffect(() => {
    const loc = loadLocation();
    getWeatherBonus(loc?.latitude ?? null, loc?.longitude ?? null).then(setWeatherBonus);
  }, []);

  const getScene = useCallback(() => {
    return phaserGameRef.current?.scene.getScene("GardenScene") as any;
  }, []);

  // Get sowable varieties for the "choose" panel
  const sowableVarieties = varieties.filter((v) => {
    const crop = crops.find((c) => c.slug === v.cropSlug);
    return crop && isSowableNow(crop);
  });

  // Group by crop for the chooser
  const sowableByCrop = sowableVarieties.reduce<Record<string, Variety[]>>((acc, v) => {
    const crop = crops.find((c) => c.slug === v.cropSlug);
    const name = crop?.name || v.cropSlug;
    if (!acc[name]) acc[name] = [];
    acc[name].push(v);
    return acc;
  }, {});

  // Handle empty tile tap
  const handleEmptyTileTap = useCallback(
    (col: number, row: number) => {
      if (plantMode === "choose") {
        setPendingSlot({ col, row });
        setInfoPanel({ type: "choose-variety", col, row });
        return;
      }

      // Lucky dip mode
      const isFirst = garden.garden.collection.length === 0;
      const result = selectVariety(garden.garden.lastVarietyId, weatherBonus, isFirst);
      if (!result) return;

      setLastDiscovery(result);

      const scene = getScene();
      if (scene) {
        scene.plantSeed(col, row, result.variety.id, result.variety.cropSlug, result.displayRarity, result.variety.name);
        setTimeout(() => {
          scene.showRarityReveal(col, row, result.displayRarity, result.variety.name);
        }, 700);
      }

      garden.collect(result.variety.id);
      garden.plant(result.variety.id);

      if (typeof window !== "undefined" && (window as any).umami) {
        (window as any).umami.track("lucky-dip-discover", {
          variety: result.variety.id,
          rarity: result.displayRarity,
          cropSlug: result.variety.cropSlug,
        });
      }

      setTimeout(() => {
        setInfoPanel({ type: "discovery", varietyId: result.variety.id, col, row });
      }, 800);
    },
    [garden, weatherBonus, plantMode, getScene]
  );

  // Plant a chosen variety
  const handleChooseVariety = useCallback(
    (variety: Variety) => {
      if (!pendingSlot) return;
      const { col, row } = pendingSlot;
      const crop = crops.find((c) => c.slug === variety.cropSlug);
      if (!crop) return;

      const scene = getScene();
      if (scene) {
        scene.plantSeed(col, row, variety.id, variety.cropSlug, variety.rarity, variety.name);
        setTimeout(() => {
          scene.showRarityReveal(col, row, variety.rarity, variety.name);
        }, 700);
      }

      garden.collect(variety.id);
      garden.plant(variety.id);
      setPendingSlot(null);
      setInfoPanel({ type: "plant-info", varietyId: variety.id, col, row });
    },
    [pendingSlot, garden, getScene]
  );

  const handleHarvest = useCallback(
    (col: number, row: number, varietyId: string) => {
      const scene = getScene();
      if (scene) scene.harvestPlant(col, row);
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
    setPendingSlot(null);
  }, []);

  // Initialise Phaser
  useEffect(() => {
    if (!gameRef.current || phaserGameRef.current || initedRef.current) return;
    initedRef.current = true;

    import("phaser").then((Phaser) => {
      import("./GardenScene").then(({ default: GardenScene }) => {
        const containerWidth = gameRef.current!.clientWidth;
        const gameWidth = Math.min(containerWidth, 500);
        const gameHeight = Math.min(window.innerHeight * 0.65, 480);

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
            onEmptyTileTap: (col: number, row: number) => handleEmptyTileTap(col, row),
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

  const panelVariety = infoPanel?.varietyId ? getVarietyById(infoPanel.varietyId) : null;
  const panelCrop = panelVariety ? crops.find((c) => c.slug === panelVariety.cropSlug) : null;

  const rarityLabels: Record<string, string> = {
    common: "A good pick",
    uncommon: "Nice find!",
    rare: "Rare find!",
    legendary: "LEGENDARY!",
  };

  const rarityColourClass: Record<string, string> = {
    common: "text-earth-lighter",
    uncommon: "text-allotment",
    rare: "text-amber",
    legendary: "text-amber",
  };

  // Collected varieties for the notice board
  const collectedVarieties = garden.garden.collection
    .map((c) => getVarietyById(c.varietyId))
    .filter(Boolean) as Variety[];

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-[#F5EFE0]">
      {/* === LEFT: Garden canvas === */}
      <div className="flex-1 flex flex-col">
        {/* Mode toggle + weather */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#2D5F3E]">
          <div className="flex gap-1">
            <button
              onClick={() => setPlantMode("lucky-dip")}
              className={`text-[10px] font-bold tracking-[0.08em] uppercase px-3 py-1.5 transition-colors ${
                plantMode === "lucky-dip"
                  ? "bg-white/20 text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Lucky Dip
            </button>
            <button
              onClick={() => setPlantMode("choose")}
              className={`text-[10px] font-bold tracking-[0.08em] uppercase px-3 py-1.5 transition-colors ${
                plantMode === "choose"
                  ? "bg-white/20 text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Choose Seed
            </button>
          </div>
          {weatherBonus.label && (
            <span className="text-[10px] text-white/70 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-leaf animate-pulse" />
              {weatherBonus.label}
            </span>
          )}
        </div>

        {/* Mode indicator */}
        <div className="text-center py-2 px-4 bg-[#F5EFE0] border-b border-earth/8">
          <p className="text-xs text-earth-lighter">
            {plantMode === "lucky-dip"
              ? "Tap an empty plot for a mystery seed"
              : "Tap an empty plot to choose what to plant"}
          </p>
        </div>

        {/* Phaser canvas */}
        <div
          ref={gameRef}
          className="flex-1 flex justify-center bg-[#F5EFE0] overflow-hidden"
          style={{ minHeight: "380px" }}
        />

        {/* Stats bar */}
        <div className="flex items-center justify-center gap-6 px-4 py-3 bg-cream border-t border-earth/8 text-xs text-earth-lighter">
          <span><strong className="text-earth">{garden.garden.collection.length}</strong> / {varieties.length} found</span>
          <span><strong className="text-earth">{garden.activePlots.length}</strong> growing</span>
          <span><strong className="text-earth">{garden.harvestedPlots.length}</strong> harvested</span>
        </div>
      </div>

      {/* === RIGHT: Notice board (desktop sidebar / mobile hidden until needed) === */}
      <div className="hidden lg:block w-80 bg-[#e8dcc8] border-l border-earth/15 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-earth-lighter mb-4">
            Seed Collection
          </h2>

          {collectedVarieties.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto rounded-full bg-earth/10 flex items-center justify-center mb-3">
                <span className="text-earth/30 text-lg">?</span>
              </div>
              <p className="text-sm text-earth-lighter">
                Plant seeds to start collecting
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {collectedVarieties.map((v) => {
                const crop = crops.find((c) => c.slug === v.cropSlug);
                const illustration = CROP_ILLUSTRATIONS[v.cropSlug];

                const rarityBorder: Record<string, string> = {
                  common: "border-earth/20",
                  uncommon: "border-leaf/50",
                  rare: "border-amber/50",
                  legendary: "border-amber ring-1 ring-amber/30",
                };

                return (
                  <button
                    key={v.id}
                    onClick={() => setInfoPanel({ type: "plant-info", varietyId: v.id, col: 0, row: 0 })}
                    className={`group relative bg-cream border-2 ${rarityBorder[v.rarity]} rounded-lg p-2 text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
                  >
                    {/* Seed packet style */}
                    <div className="flex items-center gap-2 mb-1">
                      {illustration && (
                        <img src={illustration} alt="" className="w-8 h-8 object-contain" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold text-earth truncate">{v.name}</p>
                        <p className="text-[8px] text-earth-lighter">{crop?.name}</p>
                      </div>
                    </div>
                    {/* Rarity dot */}
                    <span
                      className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          v.rarity === "legendary" ? "#ffc800"
                          : v.rarity === "rare" ? "#D4943A"
                          : v.rarity === "uncommon" ? "#7BB369"
                          : "#8b7d74",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* === INFO PANEL — slides up from bottom === */}
      {infoPanel && infoPanel.type !== "choose-variety" && panelVariety && panelCrop && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={closePanel}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative bg-cream w-full max-w-lg max-h-[70vh] overflow-y-auto rounded-t-2xl px-6 py-6"
            style={{ animation: "slideUp 0.3s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 bg-earth/20 rounded-full" />
            </div>

            {infoPanel.type === "discovery" && lastDiscovery && (
              <div className="text-center mb-4">
                <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${rarityColourClass[lastDiscovery.displayRarity]}`}>
                  {rarityLabels[lastDiscovery.displayRarity]}
                </span>
              </div>
            )}

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      panelVariety.rarity === "legendary" ? "#ffc800"
                      : panelVariety.rarity === "rare" ? "#D4943A"
                      : panelVariety.rarity === "uncommon" ? "#7BB369"
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

            <AffiliateButtons
              suppliers={panelVariety.seedSuppliers}
              variety={panelVariety.id}
              rarity={panelVariety.rarity}
              eventPrefix={infoPanel.type === "discovery" ? "lucky-dip" : "card-detail"}
            />

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

            <RecipeSection recipes={panelVariety.recipes} />

            {infoPanel.type === "harvest" && (
              <button
                onClick={() => handleHarvest(infoPanel.col, infoPanel.row, infoPanel.varietyId!)}
                className="w-full bg-rust text-white font-semibold py-4 rounded hover:bg-rust/90 transition-colors mt-4"
              >
                Harvest {panelVariety.name}
              </button>
            )}

            <div className="mt-6 text-center">
              <a href={`/crops/${panelVariety.cropSlug}`} className="text-sm text-allotment font-semibold hover:underline">
                Full growing guide &rarr;
              </a>
            </div>

            <button onClick={closePanel} className="w-full text-center text-sm text-earth-lighter mt-6 py-2 hover:text-earth-light">
              Close
            </button>
          </div>
        </div>
      )}

      {/* === CHOOSE VARIETY PANEL === */}
      {infoPanel && infoPanel.type === "choose-variety" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={closePanel}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative bg-cream w-full max-w-lg max-h-[75vh] overflow-y-auto rounded-t-2xl px-6 py-6"
            style={{ animation: "slideUp 0.3s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 bg-earth/20 rounded-full" />
            </div>

            <h2 className="text-xl font-serif text-earth mb-1">Choose a seed</h2>
            <p className="text-sm text-earth-lighter mb-6">
              These varieties are in season right now. Tap to plant.
            </p>

            {Object.entries(sowableByCrop).map(([cropName, cropVarieties]) => (
              <div key={cropName} className="mb-5">
                <h3 className="text-[10px] font-bold tracking-[0.12em] uppercase text-earth-lighter mb-2">
                  {cropName}
                </h3>
                <div className="space-y-1.5">
                  {cropVarieties.map((v) => {
                    const illustration = CROP_ILLUSTRATIONS[v.cropSlug];
                    const rarityDot: Record<string, string> = {
                      common: "bg-earth/40",
                      uncommon: "bg-leaf",
                      rare: "bg-amber",
                      legendary: "bg-amber",
                    };
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleChooseVariety(v)}
                        className="w-full flex items-center gap-3 p-3 bg-sage/20 hover:bg-sage/40 rounded transition-colors text-left"
                      >
                        {illustration && (
                          <img src={illustration} alt="" className="w-10 h-10 object-contain shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${rarityDot[v.rarity]}`} />
                            <span className="text-sm font-semibold text-earth">{v.name}</span>
                            <span className="text-[9px] uppercase tracking-wide text-earth-lighter">{v.rarity}</span>
                          </div>
                          <p className="text-xs text-earth-lighter mt-0.5 line-clamp-1">{v.personality}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button onClick={closePanel} className="w-full text-center text-sm text-earth-lighter mt-4 py-2 hover:text-earth-light">
              Cancel
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
