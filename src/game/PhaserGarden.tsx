"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useGarden } from "@/hooks/useGarden";
import { selectVariety, type SelectedVariety } from "@/lib/lucky-dip-selection";
import { getWeatherBonus, type WeatherBonus } from "@/lib/weather-bonus";
import { getVarietyById, varieties, type Variety } from "@/data/varieties";
import { crops, type Crop } from "@/data/crops";
import { loadLocation } from "@/lib/location-storage";
import { isSowableNow } from "@/lib/sowable";
import {
  getWeatherState,
  generateAlerts,
  assessCropHealth,
  getDailyAdvice,
  type WeatherState,
  type GardenAlert,
  type CropHealthResult,
} from "@/lib/weather-intelligence";
import RecipeSection from "@/components/RecipeSection";
import AffiliateButtons from "@/components/AffiliateButtons";

// Crop illustration map
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

// Weather icon mapping
function getWeatherEmoji(code: number): string {
  if (code === 0 || code === 1) return "☀️";
  if (code === 2) return "⛅";
  if (code === 3) return "☁️";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 65) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95) return "⛈️";
  return "🌤️";
}

const ALERT_ICON: Record<string, string> = {
  frost: "🥶",
  water: "💧",
  harvest: "🌾",
  blight: "⚠️",
  plant: "🌱",
  general: "📋",
};

const ALERT_BG: Record<string, string> = {
  high: "bg-tomato/10 border-tomato/30",
  medium: "bg-amber/10 border-amber/30",
  low: "bg-sage/40 border-leaf/20",
};

export default function PhaserGarden() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const initedRef = useRef(false);
  const garden = useGarden();

  const [weatherBonus, setWeatherBonus] = useState<WeatherBonus>({ type: null, label: null, boostedSlugs: [] });
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const [alerts, setAlerts] = useState<GardenAlert[]>([]);
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const [infoPanel, setInfoPanel] = useState<InfoPanel>(null);
  const [lastDiscovery, setLastDiscovery] = useState<SelectedVariety | null>(null);
  const [plantMode, setPlantMode] = useState<PlantMode>("lucky-dip");
  const [pendingSlot, setPendingSlot] = useState<{ col: number; row: number } | null>(null);

  // Ref-based callbacks for Phaser bridge
  const callbacksRef = useRef({
    onEmptyTileTap: (_col: number, _row: number) => {},
    onPlantTap: (_col: number, _row: number, _varietyId: string) => {},
    onHarvestTap: (_col: number, _row: number, _varietyId: string) => {},
  });

  // Fetch weather on mount
  useEffect(() => {
    const loc = loadLocation();
    if (loc) {
      getWeatherBonus(loc.latitude, loc.longitude).then(setWeatherBonus);
      getWeatherState(loc.latitude, loc.longitude).then((w) => {
        if (w) setWeather(w);
      });
    }
  }, []);

  // Generate alerts when weather or garden changes
  useEffect(() => {
    if (!weather || !garden.loaded) return;
    const newAlerts = generateAlerts(weather, garden.garden.plots, crops, varieties);
    setAlerts(newAlerts);
  }, [weather, garden.garden.plots, garden.loaded]);

  // Compute crop health for all active plots
  const cropHealthMap = useMemo(() => {
    if (!weather) return new Map<string, CropHealthResult>();
    const map = new Map<string, CropHealthResult>();
    garden.activePlots.forEach((plot) => {
      const variety = getVarietyById(plot.varietyId);
      const crop = variety ? crops.find((c) => c.slug === variety.cropSlug) : null;
      if (variety && crop) {
        map.set(plot.varietyId, assessCropHealth(variety, crop, plot, weather));
      }
    });
    return map;
  }, [weather, garden.activePlots]);

  const getScene = useCallback(() => {
    return phaserGameRef.current?.scene.getScene("GardenScene") as any;
  }, []);

  // Sowable varieties for browse
  const sowableVarieties = varieties.filter((v) => {
    const crop = crops.find((c) => c.slug === v.cropSlug);
    return crop && isSowableNow(crop);
  });

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

      const isFirst = garden.garden.collection.length === 0;
      const result = selectVariety(garden.garden.lastVarietyId, weatherBonus, isFirst);
      if (!result) return;

      setLastDiscovery(result);
      const scene = getScene();
      if (scene) {
        scene.plantSeed(col, row, result.variety.id, result.variety.cropSlug, result.displayRarity, result.variety.name);
        setTimeout(() => scene.showRarityReveal(col, row, result.displayRarity, result.variety.name), 700);
      }

      garden.collect(result.variety.id);
      garden.plant(result.variety.id);

      if (typeof window !== "undefined" && (window as any).umami) {
        (window as any).umami.track("lucky-dip-discover", { variety: result.variety.id, rarity: result.displayRarity });
      }

      setTimeout(() => setInfoPanel({ type: "discovery", varietyId: result.variety.id, col, row }), 800);
    },
    [garden, weatherBonus, plantMode, getScene]
  );

  const handleChooseVariety = useCallback(
    (variety: Variety) => {
      if (!pendingSlot) return;
      const { col, row } = pendingSlot;
      const scene = getScene();
      if (scene) {
        scene.plantSeed(col, row, variety.id, variety.cropSlug, variety.rarity, variety.name);
        setTimeout(() => scene.showRarityReveal(col, row, variety.rarity, variety.name), 700);
      }
      garden.collect(variety.id);
      garden.plant(variety.id);
      setPendingSlot(null);
      setInfoPanel({ type: "plant-info", varietyId: variety.id, col, row });
    },
    [pendingSlot, garden, getScene]
  );

  const handlePlantTap = useCallback(
    (col: number, row: number, varietyId: string) => {
      const slotIndex = row * 6 + col;
      if (garden.canTend(slotIndex)) {
        garden.tend(slotIndex);
        const scene = getScene();
        if (scene) scene.tendPlant(col, row);
      } else {
        setInfoPanel({ type: "plant-info", varietyId, col, row });
      }
    },
    [garden, getScene]
  );

  const handleHarvest = useCallback(
    (col: number, row: number, varietyId: string) => {
      const scene = getScene();
      if (scene) scene.harvestPlant(col, row);
      garden.harvest(row * 6 + col);
      setInfoPanel(null);
    },
    [garden, getScene]
  );

  const closePanel = useCallback(() => {
    setInfoPanel(null);
    setPendingSlot(null);
  }, []);

  // Keep callbacks ref in sync
  useEffect(() => {
    callbacksRef.current = {
      onEmptyTileTap: handleEmptyTileTap,
      onPlantTap: handlePlantTap,
      onHarvestTap: (col, row, varietyId) => setInfoPanel({ type: "harvest", varietyId, col, row }),
    };
  }, [handleEmptyTileTap, handlePlantTap]);

  // Init Phaser
  useEffect(() => {
    if (!gameRef.current || phaserGameRef.current || initedRef.current) return;
    initedRef.current = true;

    import("phaser").then((Phaser) => {
      import("./GardenScene").then(({ default: GardenScene }) => {
        const containerWidth = gameRef.current!.clientWidth;
        const gameWidth = Math.min(containerWidth, 700);
        const gameHeight = Math.min(window.innerHeight - 120, 600);

        const game = new Phaser.Game({
          type: Phaser.AUTO,
          parent: gameRef.current!,
          width: gameWidth,
          height: gameHeight,
          backgroundColor: "#F5EFE0",
          scale: { mode: Phaser.Scale.NONE, autoCenter: Phaser.Scale.CENTER_HORIZONTALLY },
          scene: [GardenScene],
          banner: false,
        });

        game.scene.start("GardenScene", {
          callbacks: {
            onEmptyTileTap: (col: number, row: number) => callbacksRef.current.onEmptyTileTap(col, row),
            onPlantTap: (col: number, row: number, vid: string) => callbacksRef.current.onPlantTap(col, row, vid),
            onHarvestTap: (col: number, row: number, vid: string) => callbacksRef.current.onHarvestTap(col, row, vid),
          },
        });

        phaserGameRef.current = game;
      });
    });

    return () => { phaserGameRef.current?.destroy(true); phaserGameRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Panel data
  const panelVariety = infoPanel?.varietyId ? getVarietyById(infoPanel.varietyId) : null;
  const panelCrop = panelVariety ? crops.find((c) => c.slug === panelVariety.cropSlug) : null;
  const panelHealth = panelVariety ? cropHealthMap.get(panelVariety.id) : null;

  const visibleAlerts = showAllAlerts ? alerts : alerts.slice(0, 2);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-[#F5EFE0]">

      {/* ═══ LEFT: Garden ═══ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Weather bar */}
        {weather && (
          <div className="bg-[#2D5F3E] text-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getWeatherEmoji(weather.weatherCode)}</span>
                <div>
                  <span className="font-semibold text-sm">{Math.round(weather.temperature)}°C</span>
                  <span className="text-white/60 text-xs ml-2">{weather.description}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setPlantMode("lucky-dip")}
                  className={`text-[9px] font-bold tracking-[0.06em] uppercase px-2.5 py-1.5 rounded transition-colors ${
                    plantMode === "lucky-dip" ? "bg-white/20 text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  Lucky Dip
                </button>
                <button
                  onClick={() => setPlantMode("choose")}
                  className={`text-[9px] font-bold tracking-[0.06em] uppercase px-2.5 py-1.5 rounded transition-colors ${
                    plantMode === "choose" ? "bg-white/20 text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  Choose
                </button>
              </div>
            </div>
            {/* Daily advice */}
            <p className="text-[11px] text-white/60 mt-1">{getDailyAdvice(weather)}</p>
          </div>
        )}

        {/* Alerts strip — max 2 visible */}
        {alerts.length > 0 && (
          <div className="px-3 py-2 space-y-1.5 bg-cream border-b border-earth/10">
            {visibleAlerts.map((alert, i) => (
              <div key={i} className={`flex items-start gap-2 px-3 py-2 rounded border text-xs ${ALERT_BG[alert.priority]}`}>
                <span className="shrink-0 mt-0.5">{ALERT_ICON[alert.type]}</span>
                <p className="text-earth leading-relaxed">{alert.message}</p>
              </div>
            ))}
            {alerts.length > 2 && !showAllAlerts && (
              <button
                onClick={() => setShowAllAlerts(true)}
                className="text-[10px] text-allotment font-semibold hover:underline px-3"
              >
                +{alerts.length - 2} more alerts
              </button>
            )}
          </div>
        )}

        {/* Mode indicator */}
        <div className="text-center py-1.5 px-4 bg-[#F5EFE0] border-b border-earth/6">
          <p className="text-[11px] text-earth-lighter">
            {plantMode === "lucky-dip"
              ? "Tap an empty plot for a mystery seed"
              : "Tap an empty plot to choose what to plant"}
          </p>
        </div>

        {/* Phaser canvas */}
        <div ref={gameRef} className="flex-1 flex justify-center bg-[#F5EFE0] overflow-hidden" style={{ minHeight: "350px", maxHeight: "600px" }} />

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 px-4 py-2.5 bg-cream border-t border-earth/8 text-[11px] text-earth-lighter">
          <span><strong className="text-earth">{garden.garden.collection.length}</strong> / {varieties.length} found</span>
          <span><strong className="text-earth">{garden.activePlots.length}</strong> growing</span>
          <span><strong className="text-earth">{garden.harvestedPlots.length}</strong> harvested</span>
        </div>
      </div>

      {/* ═══ RIGHT: Info Board (desktop sidebar) ═══ */}
      <div className="hidden lg:flex lg:flex-col w-80 bg-[#e8dcc8] border-l border-earth/15 overflow-y-auto">

        {/* Board header — looks like a wooden noticeboard */}
        <div className="bg-[#7a5020] px-4 py-3">
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-white/80">
            Allotment Noticeboard
          </h2>
        </div>

        {/* Today's tasks */}
        <div className="px-4 py-4 border-b border-earth/10">
          <h3 className="text-[10px] font-bold tracking-[0.12em] uppercase text-earth-lighter mb-3">
            Today
          </h3>
          {garden.activePlots.length === 0 ? (
            <p className="text-xs text-earth-lighter italic">Plant your first seed to get started</p>
          ) : (
            <div className="space-y-2">
              {garden.activePlots.map((plot) => {
                const variety = getVarietyById(plot.varietyId);
                const health = cropHealthMap.get(plot.varietyId);
                if (!variety || !health) return null;

                const borderCol = health.borderColour === "red" ? "border-l-tomato" : health.borderColour === "amber" ? "border-l-amber" : "border-l-leaf";
                const illustration = CROP_ILLUSTRATIONS[variety.cropSlug];

                return (
                  <button
                    key={plot.slotIndex}
                    onClick={() => setInfoPanel({ type: health.isHarvestReady ? "harvest" : "plant-info", varietyId: variety.id, col: plot.slotIndex % 6, row: Math.floor(plot.slotIndex / 6) })}
                    className={`w-full flex items-center gap-2.5 p-2 bg-cream rounded border-l-[3px] ${borderCol} text-left hover:bg-sage/20 transition-colors`}
                  >
                    {illustration && <img src={illustration} alt="" className="w-8 h-8 object-contain shrink-0" />}
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-earth truncate">{variety.name}</p>
                      <p className="text-[9px] text-earth-lighter">{health.statusMessage}</p>
                    </div>
                    {health.isHarvestReady ? (
                      <span className="text-[8px] font-bold uppercase text-leaf bg-leaf/15 px-1.5 py-0.5 rounded shrink-0">Ready</span>
                    ) : (
                      <span className="text-[9px] text-earth-lighter shrink-0">{health.daysToHarvest}d</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* This week */}
        {weather && (
          <div className="px-4 py-4 border-b border-earth/10">
            <h3 className="text-[10px] font-bold tracking-[0.12em] uppercase text-earth-lighter mb-3">
              This week
            </h3>
            <div className="space-y-2 text-xs text-earth-light">
              {weather.frostRisk && <p>• Watch for frost — protect tender crops</p>}
              {weather.drySpell >= 3 && <p>• Dry spell — keep on top of watering</p>}
              {weather.blightRisk && <p>• Blight risk — inspect tomatoes and potatoes</p>}
              {sowableVarieties.length > 0 && (
                <p>• {sowableVarieties.length} varieties ready to sow this week</p>
              )}
              {garden.activePlots.some((p) => {
                const h = cropHealthMap.get(p.varietyId);
                return h && h.isHarvestReady;
              }) && <p>• Crops ready to harvest — don&apos;t leave them too long</p>}
            </div>
          </div>
        )}

        {/* Weather forecast snippet */}
        {weather && (
          <div className="px-4 py-4 border-b border-earth/10">
            <h3 className="text-[10px] font-bold tracking-[0.12em] uppercase text-earth-lighter mb-3">
              Conditions
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-cream rounded p-2 text-center">
                <span className="text-lg block">{getWeatherEmoji(weather.weatherCode)}</span>
                <span className="text-earth font-semibold">{Math.round(weather.temperature)}°C</span>
              </div>
              <div className="bg-cream rounded p-2 text-center">
                <span className="text-lg block">💧</span>
                <span className="text-earth font-semibold">{weather.humidity}%</span>
                <span className="text-[9px] text-earth-lighter block">humidity</span>
              </div>
              <div className="bg-cream rounded p-2 text-center">
                <span className="text-lg block">🌧️</span>
                <span className="text-earth font-semibold">{weather.rainForecast.toFixed(1)}mm</span>
                <span className="text-[9px] text-earth-lighter block">forecast</span>
              </div>
              <div className="bg-cream rounded p-2 text-center">
                <span className="text-lg block">🌡️</span>
                <span className="text-earth font-semibold">{Math.round(weather.temperatureMin)}–{Math.round(weather.temperatureMax)}°</span>
                <span className="text-[9px] text-earth-lighter block">range</span>
              </div>
            </div>
          </div>
        )}

        {/* Seed suggestions */}
        <div className="px-4 py-4">
          <h3 className="text-[10px] font-bold tracking-[0.12em] uppercase text-earth-lighter mb-3">
            Sow this week
          </h3>
          <div className="space-y-1.5">
            {Object.entries(sowableByCrop).slice(0, 5).map(([cropName, cropVars]) => (
              <div key={cropName} className="flex items-center justify-between py-1">
                <span className="text-[11px] text-earth">{cropName}</span>
                <span className="text-[9px] text-earth-lighter">{cropVars.length} varieties</span>
              </div>
            ))}
            {Object.keys(sowableByCrop).length > 5 && (
              <p className="text-[10px] text-allotment font-semibold">+{Object.keys(sowableByCrop).length - 5} more crops in season</p>
            )}
          </div>
        </div>
      </div>

      {/* ═══ INFO PANEL — bottom sheet ═══ */}
      {infoPanel && infoPanel.type !== "choose-variety" && panelVariety && panelCrop && (
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

            {/* Rarity label for discoveries */}
            {infoPanel.type === "discovery" && lastDiscovery && (
              <div className="text-center mb-3">
                <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${
                  lastDiscovery.displayRarity === "legendary" || lastDiscovery.displayRarity === "rare" ? "text-amber" : lastDiscovery.displayRarity === "uncommon" ? "text-allotment" : "text-earth-lighter"
                }`}>
                  {lastDiscovery.displayRarity === "legendary" ? "LEGENDARY!" : lastDiscovery.displayRarity === "rare" ? "Rare find!" : lastDiscovery.displayRarity === "uncommon" ? "Nice find!" : "A good pick"}
                </span>
              </div>
            )}

            {/* Variety header */}
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{
                backgroundColor: panelVariety.rarity === "legendary" ? "#ffc800" : panelVariety.rarity === "rare" ? "#D4943A" : panelVariety.rarity === "uncommon" ? "#7BB369" : "#6B5D54"
              }} />
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-earth-lighter">
                {panelVariety.rarity} · {panelCrop.name}
              </span>
            </div>
            <h2 className="text-2xl font-serif text-earth tracking-tight leading-tight mb-2">{panelVariety.name}</h2>
            <p className="text-[14px] text-earth-light leading-relaxed font-serif italic mb-4">{panelVariety.personality}</p>

            {/* Health status if planted */}
            {panelHealth && (
              <div className={`rounded p-3 mb-4 ${panelHealth.borderColour === "red" ? "bg-tomato/10" : panelHealth.borderColour === "amber" ? "bg-amber/10" : "bg-leaf/10"}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-earth">{panelHealth.statusMessage}</span>
                  <span className="text-[10px] text-earth-lighter">
                    {panelHealth.isHarvestReady ? "Ready to harvest!" : `${panelHealth.daysToHarvest} days to harvest`}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-2 bg-earth/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${panelHealth.borderColour === "red" ? "bg-tomato" : panelHealth.borderColour === "amber" ? "bg-amber" : "bg-leaf"}`}
                    style={{ width: `${Math.min(100, panelHealth.growthPercent)}%` }}
                  />
                </div>
                <p className="text-[10px] text-earth-lighter mt-1">
                  Day {panelHealth.daysSinceSowing} of ~{panelHealth.daysSinceSowing + panelHealth.daysToHarvest}
                </p>
                {panelHealth.actions.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {panelHealth.actions.map((action) => (
                      <span key={action} className="text-[9px] font-semibold uppercase tracking-wide text-earth bg-earth/10 px-2 py-1 rounded">
                        {action}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Affiliate links */}
            <AffiliateButtons suppliers={panelVariety.seedSuppliers} variety={panelVariety.id} rarity={panelVariety.rarity} eventPrefix={infoPanel.type === "discovery" ? "lucky-dip" : "card-detail"} />

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 my-4">
              <div className="bg-sage/30 p-2.5 text-center rounded">
                <span className="text-base font-semibold text-earth block">{panelCrop.harvestWeeks}w</span>
                <span className="text-[9px] text-earth-lighter uppercase">Harvest</span>
              </div>
              <div className="bg-sage/30 p-2.5 text-center rounded">
                <span className="text-base font-semibold text-earth block">{panelCrop.spacingCm}cm</span>
                <span className="text-[9px] text-earth-lighter uppercase">Spacing</span>
              </div>
              <div className="bg-sage/30 p-2.5 text-center rounded">
                <span className="text-base font-semibold text-earth block capitalize">{panelCrop.category}</span>
                <span className="text-[9px] text-earth-lighter uppercase">Type</span>
              </div>
            </div>

            <RecipeSection recipes={panelVariety.recipes} />

            {/* Harvest button */}
            {infoPanel.type === "harvest" && (
              <button
                onClick={() => handleHarvest(infoPanel.col, infoPanel.row, infoPanel.varietyId!)}
                className="w-full bg-leaf text-white font-semibold py-4 rounded hover:bg-allotment transition-colors mt-4"
              >
                Harvest {panelVariety.name}
              </button>
            )}

            <div className="mt-4 text-center">
              <a href={`/crops/${panelVariety.cropSlug}`} className="text-sm text-allotment font-semibold hover:underline">
                Full growing guide →
              </a>
            </div>

            <button onClick={closePanel} className="w-full text-center text-sm text-earth-lighter mt-4 py-2 hover:text-earth-light">Close</button>
          </div>
        </div>
      )}

      {/* ═══ CHOOSE VARIETY PANEL ═══ */}
      {infoPanel && infoPanel.type === "choose-variety" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={closePanel}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative bg-cream w-full max-w-lg max-h-[75vh] overflow-y-auto rounded-t-2xl px-6 py-6" style={{ animation: "slideUp 0.3s ease-out" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center mb-4"><div className="w-10 h-1 bg-earth/20 rounded-full" /></div>
            <h2 className="text-xl font-serif text-earth mb-1">Choose a seed</h2>
            <p className="text-sm text-earth-lighter mb-5">In season right now for your location.</p>

            {Object.entries(sowableByCrop).map(([cropName, cropVarieties]) => (
              <div key={cropName} className="mb-4">
                <h3 className="text-[10px] font-bold tracking-[0.12em] uppercase text-earth-lighter mb-2">{cropName}</h3>
                <div className="space-y-1">
                  {cropVarieties.map((v) => {
                    const illustration = CROP_ILLUSTRATIONS[v.cropSlug];
                    return (
                      <button key={v.id} onClick={() => handleChooseVariety(v)} className="w-full flex items-center gap-3 p-2.5 bg-sage/20 hover:bg-sage/40 rounded transition-colors text-left">
                        {illustration && <img src={illustration} alt="" className="w-9 h-9 object-contain shrink-0" />}
                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-semibold text-earth">{v.name}</span>
                          <p className="text-[10px] text-earth-lighter line-clamp-1">{v.personality}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <button onClick={closePanel} className="w-full text-center text-sm text-earth-lighter mt-4 py-2">Cancel</button>
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
