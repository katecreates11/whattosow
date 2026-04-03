"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import type { Variety } from "@/data/varieties";
import type { CropHealthResult } from "@/lib/weather-intelligence";

// Crop illustration map
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

// ─── Nintendo-style spring config ───────────────────────────────────────────
const SPRING_BOUNCY = { type: "spring" as const, stiffness: 300, damping: 15 };
const SPRING_GENTLE = { type: "spring" as const, stiffness: 200, damping: 20 };
const SPRING_SOFT = { type: "spring" as const, stiffness: 150, damping: 25 };

// ─── Pastel palette for tile backgrounds ────────────────────────────────────
const SOIL_COLOURS = [
  "from-[#C4A882] to-[#A8896A]",  // warm sand
  "from-[#BDA07A] to-[#A08868]",  // golden earth
  "from-[#C0A480] to-[#A89070]",  // light clay
];

const HEALTH_GLOW: Record<string, string> = {
  green: "shadow-[0_0_12px_rgba(123,179,105,0.3)]",
  amber: "shadow-[0_0_12px_rgba(212,148,58,0.3)]",
  red: "shadow-[0_0_12px_rgba(201,84,62,0.3)]",
};

const HEALTH_BORDER: Record<string, string> = {
  green: "border-[#9DC48B]",
  amber: "border-[#E4B870]",
  red: "border-[#D4756A]",
};

// ─── Empty tile ─────────────────────────────────────────────────────────────

interface EmptyTileProps {
  onTap: () => void;
  suggestion?: string;
  index: number;
}

export function EmptyTile({ onTap, suggestion, index }: EmptyTileProps) {
  const soilGradient = SOIL_COLOURS[index % SOIL_COLOURS.length];

  return (
    <motion.button
      onClick={onTap}
      className={`aspect-square rounded-2xl bg-gradient-to-br ${soilGradient} flex flex-col items-center justify-center gap-1.5 relative overflow-hidden border-2 border-[#D4C4A0]/40`}
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.92 }}
      transition={SPRING_BOUNCY}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      // Stagger entrance
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Soil pattern — soft, pastel */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div className="absolute w-6 h-4 rounded-full bg-white/40 top-[20%] left-[15%] rotate-12" />
        <div className="absolute w-4 h-3 rounded-full bg-white/30 top-[55%] right-[20%] -rotate-6" />
        <div className="absolute w-5 h-3 rounded-full bg-black/10 bottom-[25%] left-[40%] rotate-3" />
      </div>

      {/* Dashed inner border — inviting */}
      <div className="absolute inset-2 rounded-xl border-2 border-dashed border-white/20" />

      {/* Animated plus */}
      <motion.div
        className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-white/50 text-xl font-light">+</span>
      </motion.div>

      {suggestion && (
        <span className="text-[7px] text-white/40 px-3 text-center leading-tight max-w-full truncate">
          {suggestion}
        </span>
      )}
    </motion.button>
  );
}

// ─── Planted tile ───────────────────────────────────────────────────────────

interface PlantedTileProps {
  variety: Variety;
  health: CropHealthResult;
  onTap: () => void;
  onWater?: () => void;
  onHarvest?: () => void;
  isNew?: boolean;
}

export function PlantedTile({ variety, health, onTap, onWater, isNew }: PlantedTileProps) {
  const [justWatered, setJustWatered] = useState(false);
  const illustration = CROP_ILLUSTRATIONS[variety.cropSlug];

  const borderClass = HEALTH_BORDER[health.borderColour] || HEALTH_BORDER.green;
  const glowClass = HEALTH_GLOW[health.borderColour] || "";
  const growScale = 0.3 + (health.growthPercent / 100) * 0.7;
  const isWilted = health.needsWater && health.growthPercent > 20;

  // Softer pastel background based on crop category
  const tileBg = health.isHarvestReady
    ? "from-[#D4E8C4] to-[#B8D4A0]"  // fresh green for harvest
    : isWilted
      ? "from-[#D8CDB8] to-[#C4B8A0]"  // dusty for wilted
      : "from-[#C4D8B8] to-[#A8C4A0]";  // gentle green for growing

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
      className={`aspect-square rounded-2xl bg-gradient-to-br ${tileBg} border-[2.5px] ${borderClass} ${glowClass} relative overflow-hidden cursor-pointer`}
      onClick={onTap}
      initial={isNew ? { scale: 0, rotate: -8 } : { opacity: 0, y: 8 }}
      animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.92 }}
      transition={SPRING_BOUNCY}
      layout
    >
      {/* Soft highlight on top-left — gives depth like a physical tile */}
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/15 to-transparent rounded-t-2xl pointer-events-none" />

      {/* Crop illustration */}
      <div className="absolute inset-0 flex items-center justify-center pb-3">
        {illustration ? (
          <motion.img
            src={illustration}
            alt={variety.name}
            className="object-contain drop-shadow-md"
            style={{
              width: `${Math.round(growScale * 75)}%`,
              height: `${Math.round(growScale * 75)}%`,
              filter: isWilted ? "saturate(0.35) brightness(0.85)" : health.growthPercent < 33 ? "saturate(0.5) brightness(0.9)" : "none",
            }}
            animate={
              health.isHarvestReady ? { y: [0, -4, 0], rotate: [0, 2, 0, -2, 0] }
              : isWilted ? { rotate: [0, -2, 0, 2, 0] }
              : {}
            }
            transition={{ duration: health.isHarvestReady ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <motion.div
            className="rounded-full bg-gradient-to-br from-[#8BC47A] to-[#5A9A4A] shadow-md"
            style={{
              width: `${Math.round(growScale * 50)}%`,
              height: `${Math.round(growScale * 50)}%`,
            }}
            animate={health.isHarvestReady ? { scale: [1, 1.12, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Name bar at bottom — frosted glass effect */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/30 backdrop-blur-sm px-2 py-1.5 rounded-b-[13px]">
        <p className="text-[8px] text-[#3B2F28] font-semibold truncate text-center">{variety.name}</p>
      </div>

      {/* Progress arc — subtle ring around the tile */}
      {!health.isHarvestReady && health.growthPercent > 5 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="46"
            fill="none"
            stroke={health.borderColour === "red" ? "#D4756A" : health.borderColour === "amber" ? "#E4B870" : "#9DC48B"}
            strokeWidth="2"
            strokeDasharray={`${health.growthPercent * 2.89} 289`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            opacity="0.4"
          />
        </svg>
      )}

      {/* Harvest ready — bouncing badge */}
      {health.isHarvestReady && (
        <motion.div
          className="absolute top-1.5 right-1.5 bg-[#5A9A4A] text-white text-[7px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          Ready!
        </motion.div>
      )}

      {/* Water indicator — bouncing droplet */}
      {health.needsWater && !justWatered && (
        <motion.button
          className="absolute top-1.5 left-1.5 w-7 h-7 rounded-full bg-[#7BA7C2]/80 flex items-center justify-center shadow-md z-10"
          onClick={handleWater}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.8 }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs">💧</span>
        </motion.button>
      )}

      {/* Watering animation */}
      <AnimatePresence>
        {justWatered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-2 rounded-full bg-[#7BA7C2]/70"
                initial={{ y: "20%", x: `${20 + i * 12}%`, opacity: 0.8, scale: 1 }}
                animate={{ y: "80%", opacity: 0, scale: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeIn" }}
              />
            ))}
            {/* Green shimmer after watering */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-[#7BB369]/15"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Days remaining — small pill */}
      {!health.isHarvestReady && health.growthPercent > 10 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <span className="text-[7px] font-bold text-white/70 bg-black/15 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
            {health.daysToHarvest}d
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Planting animation ─────────────────────────────────────────────────────

export function PlantingAnimation({ onComplete, rarity }: { onComplete: () => void; rarity: string }) {
  const isRare = rarity === "rare" || rarity === "legendary";
  const isLegendary = rarity === "legendary";

  const bgGradient = isLegendary
    ? "from-[#F5E6B8] to-[#E8D090]"
    : isRare
      ? "from-[#E8DCC0] to-[#D4C8A8]"
      : "from-[#C4D8B8] to-[#A8C4A0]";

  return (
    <motion.div
      className={`aspect-square rounded-2xl bg-gradient-to-br ${bgGradient} border-2 ${isLegendary ? "border-[#D4A43A]" : isRare ? "border-[#C4A870]" : "border-[#A8C490]"} flex items-center justify-center relative overflow-hidden`}
      initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={SPRING_BOUNCY}
    >
      {/* Seed drops in */}
      <motion.div
        className={`w-5 h-6 rounded-[40%] ${isLegendary ? "bg-gradient-to-br from-[#D4A43A] to-[#B88A20]" : "bg-gradient-to-br from-[#A08050] to-[#806030]"} shadow-lg`}
        initial={{ y: -50, scale: 0.3, rotate: -20 }}
        animate={{ y: 0, scale: 1, rotate: 0 }}
        transition={{ ...SPRING_GENTLE, delay: 0.15 }}
        onAnimationComplete={onComplete}
      />

      {/* Sparkles for rare+ */}
      {isRare && (
        <>
          {[...Array(isLegendary ? 10 : 5)].map((_, i) => {
            const angle = (i / (isLegendary ? 10 : 5)) * Math.PI * 2;
            return (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${isLegendary ? "bg-[#FFD700]" : "bg-[#D4A43A]/60"}`}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1.2, 0],
                  x: Math.cos(angle) * 35,
                  y: Math.sin(angle) * 35 - 5,
                }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.04 }}
              />
            );
          })}
        </>
      )}

      {/* Legendary golden glow */}
      {isLegendary && (
        <motion.div
          className="absolute inset-[-4px] rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            boxShadow: ["0 0 0 0 rgba(255,215,0,0)", "0 0 40px 15px rgba(255,215,0,0.3)", "0 0 0 0 rgba(255,215,0,0)"],
          }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
      )}

      {/* Soil splash particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`soil-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#A08050]/50"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: (i - 3) * 12 + Math.random() * 8,
            y: 15 + Math.random() * 10,
          }}
          transition={{ duration: 0.5, delay: 0.25 + i * 0.03 }}
        />
      ))}
    </motion.div>
  );
}
