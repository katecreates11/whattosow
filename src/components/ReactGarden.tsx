"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useGarden } from "@/hooks/useGarden";
import { selectVariety, type SelectedVariety } from "@/lib/lucky-dip-selection";
import { getWeatherBonus, type WeatherBonus } from "@/lib/weather-bonus";
import { getVarietyById, varieties, type Variety } from "@/data/varieties";
import { crops } from "@/data/crops";
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
import { EmptyTile, PlantedTile, PlantingAnimation, CROP_ILLUSTRATIONS } from "@/components/GardenTile";
import RecipeSection from "@/components/RecipeSection";
import AffiliateButtons from "@/components/AffiliateButtons";

type PlantMode = "lucky-dip" | "choose";
type InfoPanel = {
  type: "discovery" | "plant-info" | "harvest" | "choose-variety";
  varietyId?: string;
  slotIndex: number;
} | null;

// Weather emoji
function weatherEmoji(code: number): string {
  if (code <= 1) return "☀️";
  if (code === 2) return "⛅";
  if (code === 3) return "☁️";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 65) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95) return "⛈️";
  return "🌤️";
}

const ALERT_ICON: Record<string, string> = { frost: "🥶", water: "💧", harvest: "🌾", blight: "⚠️", plant: "🌱", general: "📋" };
const ALERT_BG: Record<string, string> = { high: "bg-tomato/10 border-tomato/30", medium: "bg-amber/10 border-amber/30", low: "bg-sage/40 border-leaf/20" };

// Sowing context helper
function getSowContext(crop: typeof crops[0]): string {
  const weeks = crop.harvestWeeks;
  const harvestMonth = new Date(Date.now() + weeks * 7 * 24 * 60 * 60 * 1000)
    .toLocaleDateString("en-GB", { month: "long" });
  if (crop.sowIndoorsWeeks !== null && crop.category === "tender") return `Start indoors now, eating by ${harvestMonth}.`;
  if (crop.directSowWeeks !== null && weeks <= 8) return `Quick grower — harvest by ${harvestMonth}.`;
  if (crop.directSowWeeks !== null) return `Sow direct now for ${harvestMonth}.`;
  if (crop.plantOutWeeks !== null) return `Plant out now. Harvest from ${harvestMonth}.`;
  return `${weeks} weeks to harvest.`;
}

export default function ReactGarden() {
  const garden = useGarden();
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const [weatherBonus, setWeatherBonus] = useState<WeatherBonus>({ type: null, label: null, boostedSlugs: [] });
  const [alerts, setAlerts] = useState<GardenAlert[]>([]);
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const [plantMode, setPlantMode] = useState<PlantMode>("lucky-dip");
  const [infoPanel, setInfoPanel] = useState<InfoPanel>(null);
  const [lastDiscovery, setLastDiscovery] = useState<SelectedVariety | null>(null);
  const [plantingSlot, setPlantingSlot] = useState<number | null>(null);
  const [plantingRarity, setPlantingRarity] = useState<string>("common");
  const [customSowDate, setCustomSowDate] = useState("");

  // Fetch weather
  useEffect(() => {
    const loc = loadLocation();
    if (loc) {
      getWeatherBonus(loc.latitude, loc.longitude).then(setWeatherBonus);
      getWeatherState(loc.latitude, loc.longitude).then((w) => { if (w) setWeather(w); });
    }
  }, []);

  // Generate alerts
  useEffect(() => {
    if (!weather || !garden.loaded) return;
    setAlerts(generateAlerts(weather, garden.garden.plots, crops, varieties));
  }, [weather, garden.garden.plots, garden.loaded]);

  // Crop health for all active plots
  const healthMap = useMemo(() => {
    if (!weather) return new Map<string, CropHealthResult>();
    const map = new Map<string, CropHealthResult>();
    garden.activePlots.forEach((plot) => {
      const v = getVarietyById(plot.varietyId);
      const c = v ? crops.find((cr) => cr.slug === v.cropSlug) : null;
      if (v && c) map.set(plot.varietyId, assessCropHealth(v, c, plot, weather));
    });
    return map;
  }, [weather, garden.activePlots]);

  // Sowable varieties grouped by crop
  const sowableByCrop = useMemo(() => {
    const sv = varieties.filter((v) => { const c = crops.find((cr) => cr.slug === v.cropSlug); return c && isSowableNow(c); });
    return sv.reduce<Record<string, Variety[]>>((acc, v) => {
      const c = crops.find((cr) => cr.slug === v.cropSlug);
      const name = c?.name || v.cropSlug;
      if (!acc[name]) acc[name] = [];
      acc[name].push(v);
      return acc;
    }, {});
  }, []);

  // Suggestions for empty tiles
  const suggestions = useMemo(() => {
    const cropNames = Object.keys(sowableByCrop);
    return Array.from({ length: garden.garden.settings.totalSlots }, (_, i) => {
      const crop = crops.find((c) => c.name === cropNames[i % cropNames.length]);
      if (!crop) return undefined;
      return `${crop.name} — ${getSowContext(crop).split(".")[0]}`;
    });
  }, [sowableByCrop, garden.garden.settings.totalSlots]);

  const handleEmptyTap = useCallback((slotIndex: number) => {
    if (plantMode === "choose") {
      setInfoPanel({ type: "choose-variety", slotIndex });
      return;
    }

    const isFirst = garden.garden.collection.length === 0;
    const result = selectVariety(garden.garden.lastVarietyId, weatherBonus, isFirst);
    if (!result) return;

    setLastDiscovery(result);
    setPlantingSlot(slotIndex);
    setPlantingRarity(result.displayRarity);

    garden.collect(result.variety.id);
    const sowDate = customSowDate ? new Date(customSowDate) : undefined;
    garden.plant(result.variety.id, sowDate);

    if (typeof window !== "undefined" && (window as any).umami) {
      (window as any).umami.track("lucky-dip-discover", { variety: result.variety.id, rarity: result.displayRarity });
    }

    // Show planting animation, then reveal
    setTimeout(() => {
      setPlantingSlot(null);
      setInfoPanel({ type: "discovery", varietyId: result.variety.id, slotIndex });
    }, 1200);
  }, [garden, weatherBonus, plantMode, customSowDate]);

  const handleChooseVariety = useCallback((variety: Variety) => {
    if (infoPanel?.type !== "choose-variety") return;
    const slotIndex = infoPanel.slotIndex;

    garden.collect(variety.id);
    const sowDate = customSowDate ? new Date(customSowDate) : undefined;
    garden.plant(variety.id, sowDate);

    setPlantingSlot(slotIndex);
    setPlantingRarity(variety.rarity);
    setCustomSowDate("");

    setTimeout(() => {
      setPlantingSlot(null);
      setInfoPanel({ type: "plant-info", varietyId: variety.id, slotIndex });
    }, 1200);
  }, [infoPanel, garden, customSowDate]);

  const handleWater = useCallback((slotIndex: number) => {
    if (garden.canTend(slotIndex)) garden.tend(slotIndex);
  }, [garden]);

  const handleHarvest = useCallback((slotIndex: number) => {
    garden.harvest(slotIndex);
    setInfoPanel(null);
  }, [garden]);

  const closePanel = useCallback(() => { setInfoPanel(null); setCustomSowDate(""); }, []);

  const panelVariety = infoPanel?.varietyId ? getVarietyById(infoPanel.varietyId) : null;
  const panelCrop = panelVariety ? crops.find((c) => c.slug === panelVariety.cropSlug) : null;
  const panelHealth = panelVariety ? healthMap.get(panelVariety.id) : null;

  const visibleAlerts = showAllAlerts ? alerts : alerts.slice(0, 2);

  if (!garden.loaded) {
    return <div className="min-h-screen bg-[#F5EFE0] flex items-center justify-center"><p className="text-earth-lighter font-serif italic animate-pulse">Loading your garden...</p></div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-[#F5EFE0]">

      {/* ═══ LEFT: Garden ═══ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Weather bar */}
        {weather && (
          <div className="bg-[#2D5F3E] text-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{weatherEmoji(weather.weatherCode)}</span>
                <div>
                  <span className="font-semibold text-sm">{Math.round(weather.temperature)}°C</span>
                  <span className="text-white/60 text-xs ml-2">{weather.description}</span>
                </div>
              </div>
              <div className="flex gap-1">
                {(["lucky-dip", "choose"] as PlantMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPlantMode(mode)}
                    className={`text-[9px] font-bold tracking-[0.06em] uppercase px-2.5 py-1.5 rounded transition-colors ${
                      plantMode === mode ? "bg-white/20 text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {mode === "lucky-dip" ? "Lucky Dip" : "Choose"}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-white/50 mt-1">{getDailyAdvice(weather)}</p>
          </div>
        )}

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="px-3 py-2 space-y-1.5 bg-cream border-b border-earth/10">
            {visibleAlerts.map((a, i) => (
              <div key={i} className={`flex items-start gap-2 px-3 py-2 rounded border text-xs ${ALERT_BG[a.priority]}`}>
                <span className="shrink-0 mt-0.5">{ALERT_ICON[a.type]}</span>
                <p className="text-earth leading-relaxed">{a.message}</p>
              </div>
            ))}
            {alerts.length > 2 && !showAllAlerts && (
              <button onClick={() => setShowAllAlerts(true)} className="text-[10px] text-allotment font-semibold hover:underline px-3">
                +{alerts.length - 2} more
              </button>
            )}
          </div>
        )}

        {/* Garden grid */}
        <div className="flex-1 px-3 py-4 sm:px-6 sm:py-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 max-w-lg mx-auto">
            {Array.from({ length: garden.garden.settings.totalSlots }).map((_, i) => {
              const plot = garden.activePlots.find((p) => p.slotIndex === i);
              const variety = plot ? getVarietyById(plot.varietyId) : null;
              const health = variety ? healthMap.get(variety.id) : null;

              // Planting animation
              if (plantingSlot === i) {
                return (
                  <PlantingAnimation
                    key={`planting-${i}`}
                    rarity={plantingRarity}
                    onComplete={() => {}}
                  />
                );
              }

              // Empty tile
              if (!plot || !variety) {
                return (
                  <EmptyTile
                    key={`empty-${i}`}
                    onTap={() => handleEmptyTap(i)}
                    suggestion={suggestions[i]}
                  />
                );
              }

              // Planted tile
              return (
                <PlantedTile
                  key={`planted-${variety.id}-${i}`}
                  variety={variety}
                  health={health || { status: "okay", statusMessage: "Growing", borderColour: "green", growthPercent: 50, daysToHarvest: 0, daysSinceSowing: 0, isHarvestReady: false, needsWater: false, actions: [] }}
                  onTap={() => setInfoPanel({ type: health?.isHarvestReady ? "harvest" : "plant-info", varietyId: variety.id, slotIndex: i })}
                  onWater={() => handleWater(i)}
                  onHarvest={() => handleHarvest(i)}
                  isNew={false}
                />
              );
            })}
          </div>

          {/* Mode hint */}
          <p className="text-center text-[11px] text-earth-lighter mt-4">
            {plantMode === "lucky-dip" ? "Tap an empty plot for a mystery seed" : "Tap an empty plot to choose what to plant"}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 px-4 py-2.5 bg-cream border-t border-earth/8 text-[11px] text-earth-lighter">
          <span><strong className="text-earth">{garden.garden.collection.length}</strong> / {varieties.length} found</span>
          <span><strong className="text-earth">{garden.activePlots.length}</strong> growing</span>
          <span><strong className="text-earth">{garden.harvestedPlots.length}</strong> harvested</span>
        </div>
      </div>

      {/* ═══ RIGHT: Info Board (desktop) ═══ */}
      <div className="lg:w-80 bg-[#e8dcc8] border-t lg:border-t-0 lg:border-l border-earth/15 overflow-y-auto">
        <div className="bg-[#7a5020] px-4 py-3">
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-white/80">Allotment Noticeboard</h2>
        </div>

        {/* Your crops */}
        <div className="px-4 py-4 border-b border-earth/10">
          <h3 className="text-[10px] font-bold tracking-[0.12em] uppercase text-earth-lighter mb-3">Your crops</h3>
          {garden.activePlots.length === 0 ? (
            <p className="text-xs text-earth-lighter italic">Plant your first seed to get started</p>
          ) : (
            <div className="space-y-2">
              {garden.activePlots.map((plot) => {
                const v = getVarietyById(plot.varietyId);
                const h = healthMap.get(plot.varietyId);
                if (!v || !h) return null;
                const bc = h.borderColour === "red" ? "border-l-tomato" : h.borderColour === "amber" ? "border-l-amber" : "border-l-leaf";
                return (
                  <div key={plot.slotIndex} className={`flex items-center gap-2 p-2 bg-cream rounded border-l-[3px] ${bc}`}>
                    <div className="min-w-0 flex-1 cursor-pointer" onClick={() => setInfoPanel({ type: h.isHarvestReady ? "harvest" : "plant-info", varietyId: v.id, slotIndex: plot.slotIndex })}>
                      <p className="text-[11px] font-semibold text-earth truncate">{v.name}</p>
                      <p className="text-[9px] text-earth-lighter">{h.statusMessage}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {h.needsWater && garden.canTend(plot.slotIndex) && (
                        <button onClick={() => handleWater(plot.slotIndex)} className="text-base hover:scale-125 transition-transform">💧</button>
                      )}
                      {h.isHarvestReady ? (
                        <span className="text-[8px] font-bold uppercase text-leaf bg-leaf/15 px-1.5 py-0.5 rounded">Ready</span>
                      ) : (
                        <span className="text-[9px] text-earth-lighter">{h.daysToHarvest}d</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sow this week */}
        <div className="px-4 py-4 border-b border-earth/10">
          <h3 className="text-[10px] font-bold tracking-[0.12em] uppercase text-earth-lighter mb-3">Sow this week</h3>
          <div className="space-y-2">
            {Object.entries(sowableByCrop).slice(0, 5).map(([name, vars]) => {
              const crop = crops.find((c) => c.name === name);
              return (
                <div key={name} className="border-b border-earth/5 pb-1.5">
                  <div className="flex justify-between">
                    <span className="text-[11px] font-semibold text-earth">{name}</span>
                    <span className="text-[9px] text-earth-lighter">{vars.length} var</span>
                  </div>
                  {crop && <p className="text-[10px] text-earth-lighter">{getSowContext(crop)}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Weather */}
        {weather && (
          <div className="px-4 py-4">
            <h3 className="text-[10px] font-bold tracking-[0.12em] uppercase text-earth-lighter mb-3">Conditions</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-cream rounded p-2 text-center">
                <span className="text-lg block">{weatherEmoji(weather.weatherCode)}</span>
                <span className="text-earth font-semibold">{Math.round(weather.temperature)}°C</span>
              </div>
              <div className="bg-cream rounded p-2 text-center">
                <span className="text-lg block">🌧️</span>
                <span className="text-earth font-semibold">{weather.rainForecast.toFixed(1)}mm</span>
                <span className="text-[9px] text-earth-lighter block">forecast</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══ INFO CARD — Pokémon-inspired ═══ */}
      <AnimatePresence>
        {infoPanel && infoPanel.type !== "choose-variety" && panelVariety && panelCrop && (() => {
          const rarityBorder = panelVariety.rarity === "legendary" ? "from-amber via-amber/80 to-amber" : panelVariety.rarity === "rare" ? "from-amber/70 via-amber/50 to-amber/70" : panelVariety.rarity === "uncommon" ? "from-leaf via-leaf/60 to-leaf" : "from-earth/30 via-earth/20 to-earth/30";
          const rarityBg = panelVariety.rarity === "legendary" ? "bg-amber/5" : panelVariety.rarity === "rare" ? "bg-amber/5" : panelVariety.rarity === "uncommon" ? "bg-leaf/5" : "bg-cream";
          const categoryColour = panelCrop.category === "hardy" ? "bg-leaf/20 text-allotment" : panelCrop.category === "half-hardy" ? "bg-amber/20 text-amber" : "bg-tomato/15 text-tomato";
          const illustration = CROP_ILLUSTRATIONS[panelVariety.cropSlug];

          return (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
            >
              <div className="absolute inset-0 bg-black/50" />

              {/* The card */}
              <motion.div
                className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, rotateY: -15, opacity: 0 }}
                animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                exit={{ scale: 0.8, rotateY: 15, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Rarity gradient border */}
                <div className={`rounded-2xl p-[3px] bg-gradient-to-br ${rarityBorder}`}>
                  <div className={`rounded-[13px] ${rarityBg} overflow-hidden`}>

                    {/* Card header — illustration area */}
                    <div className="relative bg-gradient-to-b from-[#2D5F3E]/10 to-transparent px-5 pt-5 pb-3">
                      {/* Close button */}
                      <button onClick={closePanel} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/10 flex items-center justify-center text-earth/40 hover:text-earth/70 text-sm">×</button>

                      {/* Rarity label for discoveries */}
                      {infoPanel.type === "discovery" && lastDiscovery && (
                        <motion.div className="text-center mb-2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3 }}>
                          <span className={`text-[11px] font-bold tracking-[0.25em] uppercase ${
                            lastDiscovery.displayRarity === "legendary" ? "text-amber" : lastDiscovery.displayRarity === "rare" ? "text-amber" : lastDiscovery.displayRarity === "uncommon" ? "text-allotment" : "text-earth-lighter"
                          }`}>
                            {lastDiscovery.displayRarity === "legendary" ? "★ LEGENDARY ★" : lastDiscovery.displayRarity === "rare" ? "★ RARE FIND ★" : lastDiscovery.displayRarity === "uncommon" ? "NICE FIND" : ""}
                          </span>
                        </motion.div>
                      )}

                      {/* Illustration */}
                      <div className="flex justify-center py-4">
                        {illustration ? (
                          <motion.img
                            src={illustration}
                            alt={panelVariety.name}
                            className="w-28 h-28 object-contain drop-shadow-lg"
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                          />
                        ) : (
                          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-leaf/30 to-allotment/20 flex items-center justify-center">
                            <span className="text-4xl">🌱</span>
                          </div>
                        )}
                      </div>

                      {/* Name + type badges */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h2 className="text-xl font-serif text-earth tracking-tight leading-tight">{panelVariety.name}</h2>
                          <p className="text-[11px] text-earth-lighter">{panelCrop.name}</p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <span className={`text-[8px] font-bold tracking-[0.08em] uppercase px-2 py-1 rounded-full ${categoryColour}`}>
                            {panelCrop.category}
                          </span>
                          <span className={`text-[8px] font-bold tracking-[0.08em] uppercase px-2 py-1 rounded-full ${
                            panelVariety.rarity === "legendary" ? "bg-amber/20 text-amber" : panelVariety.rarity === "rare" ? "bg-amber/15 text-amber" : panelVariety.rarity === "uncommon" ? "bg-leaf/15 text-allotment" : "bg-earth/10 text-earth-lighter"
                          }`}>
                            {panelVariety.rarity}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Divider line */}
                    <div className="h-px bg-gradient-to-r from-transparent via-earth/15 to-transparent mx-5" />

                    {/* Stats row — Pokémon style */}
                    <div className="flex justify-between px-5 py-3 text-center">
                      <div>
                        <span className="text-lg font-bold text-earth block leading-none">{panelCrop.harvestWeeks}</span>
                        <span className="text-[8px] text-earth-lighter uppercase tracking-wider">weeks</span>
                      </div>
                      <div className="w-px bg-earth/10" />
                      <div>
                        <span className="text-lg font-bold text-earth block leading-none">{panelCrop.spacingCm}</span>
                        <span className="text-[8px] text-earth-lighter uppercase tracking-wider">cm apart</span>
                      </div>
                      <div className="w-px bg-earth/10" />
                      <div>
                        <span className="text-lg font-bold text-earth block leading-none">{panelHealth ? panelHealth.growthPercent : 0}%</span>
                        <span className="text-[8px] text-earth-lighter uppercase tracking-wider">grown</span>
                      </div>
                    </div>

                    {/* Growth bar (if planted) */}
                    {panelHealth && (
                      <div className="px-5 pb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-semibold text-earth">{panelHealth.statusMessage}</span>
                          <span className="text-[10px] text-earth-lighter">{panelHealth.isHarvestReady ? "Ready to harvest!" : `${panelHealth.daysToHarvest} days left`}</span>
                        </div>
                        <div className="h-2.5 bg-earth/8 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${panelHealth.borderColour === "red" ? "bg-gradient-to-r from-tomato to-tomato/70" : panelHealth.borderColour === "amber" ? "bg-gradient-to-r from-amber to-amber/70" : "bg-gradient-to-r from-leaf to-allotment"}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, panelHealth.growthPercent)}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-earth/15 to-transparent mx-5" />

                    {/* Personality — like Pokédex flavour text */}
                    <div className="px-5 py-3">
                      <p className="text-[13px] text-earth-light leading-relaxed font-serif italic">
                        &ldquo;{panelVariety.personality}&rdquo;
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-earth/15 to-transparent mx-5" />

                    {/* Recipes — like "moves" */}
                    {panelVariety.recipes.length > 0 && (
                      <div className="px-5 py-3">
                        <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-earth-lighter block mb-2">What you&apos;ll cook</span>
                        {panelVariety.recipes.map((recipe) => (
                          <div key={recipe.name} className="mb-2.5 last:mb-0">
                            <span className="text-[12px] font-semibold text-earth">{recipe.name}</span>
                            <p className="text-[11px] text-earth-lighter leading-relaxed mt-0.5">{recipe.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-earth/15 to-transparent mx-5" />

                    {/* Actions */}
                    <div className="px-5 py-4 space-y-2">
                      {/* Buy seeds */}
                      <AffiliateButtons suppliers={panelVariety.seedSuppliers} variety={panelVariety.id} rarity={panelVariety.rarity} />

                      {/* Harvest */}
                      {infoPanel.type === "harvest" && (
                        <motion.button
                          onClick={() => handleHarvest(infoPanel.slotIndex)}
                          className="w-full bg-gradient-to-r from-leaf to-allotment text-white font-semibold py-3.5 rounded-xl"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Harvest {panelVariety.name} 🌾
                        </motion.button>
                      )}

                      {/* Growing guide link */}
                      <a
                        href={`/crops/${panelVariety.cropSlug}`}
                        className="block text-center text-[11px] text-allotment font-semibold hover:underline py-2"
                      >
                        Full growing guide →
                      </a>
                    </div>

                  </div>
                </div>

                {/* Legendary shimmer overlay */}
                {panelVariety.rarity === "legendary" && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, transparent 30%, rgba(255,200,0,0.1) 50%, transparent 70%)",
                      backgroundSize: "200% 200%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* ═══ CHOOSE PANEL ═══ */}
      <AnimatePresence>
        {infoPanel?.type === "choose-variety" && (
          <motion.div className="fixed inset-0 z-50 flex items-end justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePanel}>
            <div className="absolute inset-0 bg-black/30" />
            <motion.div
              className="relative bg-cream w-full max-w-lg max-h-[75vh] overflow-y-auto rounded-t-2xl px-6 py-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4"><div className="w-10 h-1 bg-earth/20 rounded-full" /></div>
              <h2 className="text-xl font-serif text-earth mb-1">Choose a seed</h2>
              <p className="text-sm text-earth-lighter mb-3">In season now for your location.</p>

              <div className="bg-sage/30 rounded p-3 mb-5">
                <label className="flex items-center gap-3">
                  <span className="text-xs text-earth">When sown?</span>
                  <input type="date" value={customSowDate} onChange={(e) => setCustomSowDate(e.target.value)} max={new Date().toISOString().split("T")[0]} className="text-xs text-earth bg-cream border border-earth/15 rounded px-2 py-1.5 flex-1" />
                </label>
                <p className="text-[10px] text-earth-lighter mt-1">{customSowDate ? `Sown on ${new Date(customSowDate).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}` : "Leave blank for today"}</p>
              </div>

              {Object.entries(sowableByCrop).map(([cropName, cropVars]) => (
                <div key={cropName} className="mb-4">
                  <h3 className="text-[10px] font-bold tracking-[0.12em] uppercase text-earth-lighter mb-2">{cropName}</h3>
                  {cropVars.map((v) => (
                    <motion.button
                      key={v.id}
                      onClick={() => handleChooseVariety(v)}
                      className="w-full flex items-center gap-3 p-2.5 bg-sage/20 hover:bg-sage/40 rounded transition-colors text-left mb-1"
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-semibold text-earth">{v.name}</span>
                        <p className="text-[10px] text-earth-lighter line-clamp-1">{v.personality}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ))}
              <button onClick={closePanel} className="w-full text-sm text-earth-lighter mt-2 py-2">Cancel</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
