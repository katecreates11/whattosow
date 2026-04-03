"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import type { Variety } from "@/data/varieties";
import type { CropHealthResult } from "@/lib/weather-intelligence";

// Crop illustration map — will be replaced with custom art
export const CROP_ILLUSTRATIONS: Record<string, string> = {
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

// Rarity border colours
const RARITY_RING: Record<string, string> = {
  common: "ring-earth/30",
  uncommon: "ring-leaf/50",
  rare: "ring-amber/60",
  legendary: "ring-amber",
};

interface EmptyTileProps {
  onTap: () => void;
  suggestion?: string;
}

export function EmptyTile({ onTap, suggestion }: EmptyTileProps) {
  return (
    <motion.button
      onClick={onTap}
      className="aspect-square rounded-xl bg-gradient-to-b from-[#6b4a2a] to-[#4a2a10] border-2 border-dashed border-[#8a6a4a]/40 flex flex-col items-center justify-center gap-1 relative overflow-hidden"
      whileHover={{ scale: 1.03, borderColor: "rgba(123,179,105,0.6)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Soil texture dots */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#8a6a4a]"
            style={{
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
              left: `${15 + (i * 37) % 70}%`,
              top: `${20 + (i * 29) % 60}%`,
            }}
          />
        ))}
      </div>

      <motion.span
        className="text-white/25 text-3xl font-light"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        +
      </motion.span>

      {suggestion && (
        <span className="text-[8px] text-white/30 px-2 text-center leading-tight">
          {suggestion}
        </span>
      )}
    </motion.button>
  );
}

interface PlantedTileProps {
  variety: Variety;
  health: CropHealthResult;
  onTap: () => void;
  onWater?: () => void;
  onHarvest?: () => void;
  isNew?: boolean;
}

export function PlantedTile({ variety, health, onTap, onWater, onHarvest, isNew }: PlantedTileProps) {
  const [justWatered, setJustWatered] = useState(false);
  const illustration = CROP_ILLUSTRATIONS[variety.cropSlug];

  const borderClass =
    health.borderColour === "red" ? "border-tomato shadow-tomato/20" :
    health.borderColour === "amber" ? "border-amber shadow-amber/20" :
    "border-leaf/60 shadow-leaf/10";

  const growScale = 0.4 + (health.growthPercent / 100) * 0.6;
  const growOpacity = 0.4 + (health.growthPercent / 100) * 0.6;
  const isWilted = health.needsWater && health.growthPercent > 20;

  const handleWater = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (onWater) {
      onWater();
      setJustWatered(true);
      setTimeout(() => setJustWatered(false), 2000);
    }
  };

  return (
    <motion.div
      className={`aspect-square rounded-xl bg-gradient-to-b from-[#6b4a2a] to-[#4a2a10] border-2 ${borderClass} shadow-lg relative overflow-hidden cursor-pointer`}
      onClick={onTap}
      initial={isNew ? { scale: 0, rotate: -10 } : false}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      layout
    >
      {/* Crop illustration */}
      <div className="absolute inset-0 flex items-center justify-center">
        {illustration ? (
          <motion.img
            src={illustration}
            alt={variety.name}
            className="object-contain"
            style={{
              width: `${Math.round(growScale * 70)}%`,
              height: `${Math.round(growScale * 70)}%`,
              opacity: growOpacity,
              filter: isWilted ? "saturate(0.4) brightness(0.8)" : health.growthPercent < 33 ? "sepia(0.3) saturate(0.6)" : "none",
            }}
            animate={isWilted ? { rotate: [0, -3, 0, 3, 0] } : health.isHarvestReady ? { y: [0, -3, 0] } : {}}
            transition={isWilted ? { duration: 4, repeat: Infinity } : { duration: 2, repeat: Infinity }}
          />
        ) : (
          <motion.div
            className={`rounded-full ${health.isHarvestReady ? "bg-leaf" : "bg-leaf/50"}`}
            style={{
              width: `${Math.round(growScale * 50)}%`,
              height: `${Math.round(growScale * 50)}%`,
              opacity: growOpacity,
            }}
            animate={health.isHarvestReady ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Variety name */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-1.5 pb-1 pt-3">
        <p className="text-[8px] text-white/80 truncate text-center font-medium">{variety.name}</p>
      </div>

      {/* Rarity ring indicator */}
      <div className={`absolute inset-0 rounded-xl ring-2 ${RARITY_RING[variety.rarity]} ring-inset pointer-events-none`} />

      {/* Progress bar */}
      {!health.isHarvestReady && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px]">
          <motion.div
            className={`h-full ${health.borderColour === "red" ? "bg-tomato" : health.borderColour === "amber" ? "bg-amber" : "bg-leaf"}`}
            initial={{ width: 0 }}
            animate={{ width: `${health.growthPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      {/* Harvest ready pulse */}
      {health.isHarvestReady && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-leaf"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Water indicator */}
      {health.needsWater && !justWatered && (
        <motion.button
          className="absolute top-1 right-1 text-sm z-10"
          onClick={handleWater}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.8 }}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          💧
        </motion.button>
      )}

      {/* Just watered effect */}
      <AnimatePresence>
        {justWatered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-sm"
                initial={{ y: -10, opacity: 1, x: (i - 2) * 12 }}
                animate={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                💧
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Days to harvest badge */}
      {!health.isHarvestReady && health.growthPercent > 10 && (
        <div className="absolute top-1 left-1">
          <span className="text-[7px] font-bold text-white/60 bg-black/30 px-1 py-0.5 rounded">
            {health.daysToHarvest}d
          </span>
        </div>
      )}
    </motion.div>
  );
}

// Planting animation — plays when a new seed is planted
export function PlantingAnimation({ onComplete, rarity }: { onComplete: () => void; rarity: string }) {
  const isRare = rarity === "rare" || rarity === "legendary";
  const isLegendary = rarity === "legendary";

  return (
    <motion.div
      className="aspect-square rounded-xl bg-gradient-to-b from-[#6b4a2a] to-[#4a2a10] border-2 border-leaf/50 flex items-center justify-center relative overflow-hidden"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Seed drops in */}
      <motion.div
        className={`w-4 h-5 rounded-full ${isLegendary ? "bg-amber" : isRare ? "bg-amber/70" : "bg-[#8b6914]"}`}
        initial={{ y: -60, scale: 0.5 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
        onAnimationComplete={onComplete}
      />

      {/* Sparkles for rare+ */}
      {isRare && (
        <>
          {[...Array(isLegendary ? 8 : 4)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full ${isLegendary ? "bg-amber" : "bg-amber/60"}`}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i / (isLegendary ? 8 : 4)) * Math.PI * 2) * 30,
                y: Math.sin((i / (isLegendary ? 8 : 4)) * Math.PI * 2) * 30 - 10,
              }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.05 }}
            />
          ))}
        </>
      )}

      {/* Legendary glow */}
      {isLegendary && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ boxShadow: "0 0 0 0 rgba(255,200,0,0)" }}
          animate={{ boxShadow: ["0 0 0 0 rgba(255,200,0,0)", "0 0 30px 10px rgba(255,200,0,0.3)", "0 0 0 0 rgba(255,200,0,0)"] }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
      )}
    </motion.div>
  );
}
