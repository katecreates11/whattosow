"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { WeatherState } from "@/lib/weather-intelligence";

// ─── Time of day ────────────────────────────────────────────────────────────

type TimeOfDay = "dawn" | "morning" | "midday" | "afternoon" | "evening" | "night";

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours();
  if (h >= 5 && h < 7) return "dawn";
  if (h >= 7 && h < 12) return "morning";
  if (h >= 12 && h < 14) return "midday";
  if (h >= 14 && h < 18) return "afternoon";
  if (h >= 18 && h < 21) return "evening";
  return "night";
}

const SKY_GRADIENTS: Record<TimeOfDay, string> = {
  dawn: "from-[#FFD4A8] via-[#FFE8CC] to-[#B8D8F0]",
  morning: "from-[#87CEEB] via-[#B0DEF5] to-[#D4EFFF]",
  midday: "from-[#7EC8E3] via-[#A8DDF0] to-[#C8EAFF]",
  afternoon: "from-[#90C8E8] via-[#B8D8F0] to-[#D0E8F8]",
  evening: "from-[#FF9E6C] via-[#FFB88C] to-[#C4A0D4]",
  night: "from-[#1a1a3e] via-[#2a2a5e] to-[#3a3a6e]",
};

const GRASS_COLOURS: Record<TimeOfDay, string> = {
  dawn: "from-[#8CB870] to-[#7AA860]",
  morning: "from-[#7BB86A] to-[#6AA858]",
  midday: "from-[#85C470] to-[#70B05A]",
  afternoon: "from-[#80B868] to-[#6CA854]",
  evening: "from-[#6A9850] to-[#5A8840]",
  night: "from-[#3A5830] to-[#2A4820]",
};

// ─── Season ─────────────────────────────────────────────────────────────────

type Season = "spring" | "summer" | "autumn" | "winter";

function getSeason(): Season {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "autumn";
  return "winter";
}

// ─── Main scene wrapper ─────────────────────────────────────────────────────

interface GardenSceneProps {
  weather: WeatherState | null;
  cropCount: number;
  children: React.ReactNode;
}

export default function GardenScene({ weather, cropCount, children }: GardenSceneProps) {
  const [time, setTime] = useState<TimeOfDay>("morning");
  const season = getSeason();

  useEffect(() => {
    setTime(getTimeOfDay());
    const interval = setInterval(() => setTime(getTimeOfDay()), 60000);
    return () => clearInterval(interval);
  }, []);

  const isRaining = weather && (weather.rain > 0.5 || (weather.weatherCode >= 51 && weather.weatherCode <= 82));
  const isSunny = weather && weather.weatherCode <= 2;
  const isNight = time === "night";
  const isCloudy = weather && weather.weatherCode >= 2 && weather.weatherCode <= 48;

  return (
    <div className="relative overflow-hidden rounded-b-3xl sm:rounded-b-none">
      {/* ═══ SKY ═══ */}
      <div className={`absolute inset-0 bg-gradient-to-b ${SKY_GRADIENTS[time]} transition-colors duration-[3000ms]`} />

      {/* Sun */}
      {isSunny && !isNight && (
        <motion.div
          className="absolute top-6 right-8 w-14 h-14 rounded-full bg-[#FFE484] shadow-[0_0_40px_20px_rgba(255,228,132,0.3)]"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Stars at night */}
      {isNight && (
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                left: `${10 + (i * 37) % 80}%`,
                top: `${5 + (i * 23) % 30}%`,
              }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      )}

      {/* Clouds */}
      {isCloudy && !isNight && (
        <>
          <Cloud x={-5} y={8} size={80} speed={45} delay={0} />
          <Cloud x={30} y={4} size={60} speed={55} delay={10} />
          <Cloud x={60} y={12} size={70} speed={40} delay={5} />
        </>
      )}

      {/* Rain */}
      {isRaining && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1.5px] h-4 bg-[#7BA7C2]/30 rounded-full"
              style={{
                left: `${(i * 13.7) % 100}%`,
                top: "-10px",
              }}
              animate={{
                y: [0, typeof window !== "undefined" ? window.innerHeight : 600],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 0.8 + (i % 4) * 0.2,
                repeat: Infinity,
                delay: (i * 0.1) % 1,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* ═══ BACKGROUND SCENERY ═══ */}
      <div className="relative z-[1]">
        {/* Distant hills/trees — silhouette */}
        <div className="h-8 sm:h-12 relative overflow-hidden">
          <svg viewBox="0 0 400 40" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path
              d={`M0,40 Q50,${time === "night" ? 15 : 20} 100,25 Q150,${time === "night" ? 10 : 15} 200,22 Q250,${time === "night" ? 18 : 25} 300,20 Q350,${time === "night" ? 12 : 18} 400,25 L400,40 Z`}
              fill={isNight ? "#1a3020" : season === "autumn" ? "#6A8A4A" : "#5A9A48"}
              opacity="0.6"
            />
            <path
              d="M0,40 Q80,28 160,32 Q240,22 320,30 Q360,25 400,35 L400,40 Z"
              fill={isNight ? "#2a4030" : season === "autumn" ? "#7AA858" : "#68A850"}
              opacity="0.5"
            />
          </svg>

          {/* Little trees */}
          <div className="absolute bottom-0 left-[10%]">
            <div className={`w-3 h-6 sm:w-4 sm:h-8 rounded-full ${isNight ? "bg-[#1a3020]" : "bg-[#4A8838]"} opacity-70`} />
          </div>
          <div className="absolute bottom-0 left-[25%]">
            <div className={`w-4 h-8 sm:w-5 sm:h-10 rounded-full ${isNight ? "bg-[#1a3020]" : "bg-[#3A7828]"} opacity-60`} />
          </div>
          <div className="absolute bottom-0 right-[15%]">
            <div className={`w-3 h-7 sm:w-4 sm:h-9 rounded-full ${isNight ? "bg-[#1a3020]" : "bg-[#4A8838]"} opacity-65`} />
          </div>
        </div>

        {/* ═══ GRASS AREA ═══ */}
        <div className={`bg-gradient-to-b ${GRASS_COLOURS[time]} relative transition-colors duration-[3000ms]`}>
          {/* Fence at the top */}
          <div className="flex justify-around px-4 -mt-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-1 h-3 ${isNight ? "bg-[#4A3A20]" : "bg-[#8A6A40]"} rounded-t`} />
                <div className={`w-3 h-0.5 ${isNight ? "bg-[#4A3A20]" : "bg-[#8A6A40]"}`} />
              </div>
            ))}
          </div>

          {/* Decorative elements based on season + progress */}
          <div className="relative px-2 sm:px-4 py-2">
            {/* Spring flowers on borders */}
            {season === "spring" && cropCount >= 3 && (
              <div className="absolute left-2 top-4 flex gap-1">
                {["🌼", "🌸", "🌼"].map((f, i) => (
                  <motion.span
                    key={i}
                    className="text-xs"
                    animate={{ y: [0, -2, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {f}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Autumn leaves falling */}
            {season === "autumn" && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-xs pointer-events-none"
                    style={{ left: `${15 + i * 17}%`, top: "-5px" }}
                    animate={{
                      y: [0, 200],
                      x: [0, (i % 2 === 0 ? 1 : -1) * 30],
                      rotate: [0, 360],
                      opacity: [0.7, 0],
                    }}
                    transition={{ duration: 4 + i, repeat: Infinity, delay: i * 2 }}
                  >
                    🍂
                  </motion.span>
                ))}
              </>
            )}

            {/* Bird that visits after 5+ crops */}
            {cropCount >= 5 && !isNight && (
              <motion.div
                className="absolute right-3 top-2 z-20"
                animate={{ y: [0, -2, 0], x: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm">🐦</span>
              </motion.div>
            )}

            {/* Butterfly in summer */}
            {season === "summer" && !isNight && (
              <motion.span
                className="absolute text-xs pointer-events-none z-20"
                animate={{
                  x: ["-10%", "110%"],
                  y: ["20%", "10%", "30%", "15%", "25%"],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                🦋
              </motion.span>
            )}

            {/* Cat sleeping by the side — unlocked at 10 crops */}
            {cropCount >= 10 && (
              <motion.div
                className="absolute bottom-1 left-1 z-20"
                animate={{ y: [0, -1, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-sm opacity-70">😺</span>
              </motion.div>
            )}

            {/* ═══ THE GARDEN BEDS — children rendered here ═══ */}
            <div className="relative z-10 py-2">
              {/* Wooden raised bed frame */}
              <div className="relative mx-auto max-w-md">
                {/* Outer wood shadow */}
                <div className="absolute -inset-[10px] sm:-inset-[14px] rounded-3xl bg-[#5A3A18]/20 blur-sm" />

                {/* Outer wood */}
                <div className={`absolute -inset-[8px] sm:-inset-[12px] rounded-3xl ${isNight ? "bg-[#4A3020]" : "bg-[#8A6830]"} transition-colors duration-[3000ms]`} />

                {/* Inner wood grain */}
                <div className={`absolute -inset-[5px] sm:-inset-[8px] rounded-2xl ${isNight ? "bg-[#5A3A28]" : "bg-[#9A7840]"} transition-colors duration-[3000ms]`}>
                  {/* Horizontal grain lines */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-20">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full h-px bg-black/20"
                        style={{ top: `${15 + i * 14}%` }}
                      />
                    ))}
                  </div>
                  {/* Corner pegs */}
                  <div className="absolute w-2 h-2 rounded-full bg-[#6A4820] top-1.5 left-1.5 shadow-inner" />
                  <div className="absolute w-2 h-2 rounded-full bg-[#6A4820] top-1.5 right-1.5 shadow-inner" />
                  <div className="absolute w-2 h-2 rounded-full bg-[#6A4820] bottom-1.5 left-1.5 shadow-inner" />
                  <div className="absolute w-2 h-2 rounded-full bg-[#6A4820] bottom-1.5 right-1.5 shadow-inner" />
                </div>

                {/* Soil base inside the frame */}
                <div className={`relative rounded-xl ${isNight ? "bg-[#3A2810]" : "bg-[#5A3A1A]"} p-2 sm:p-3 transition-colors duration-[3000ms]`}>
                  {children}
                </div>
              </div>
            </div>

            {/* Garden path at the bottom */}
            <div className="flex justify-center mt-2">
              <div className={`w-16 h-2 rounded-full ${isNight ? "bg-[#5A5040]" : "bg-[#C4B890]"} opacity-40`} />
            </div>

            {/* Watering can by the bed — decorative */}
            <div className="absolute bottom-0 right-2">
              <span className="text-base opacity-50">🪣</span>
            </div>

            {/* Garden tools */}
            {cropCount > 0 && (
              <div className="absolute bottom-0 left-2 flex gap-0.5">
                <span className="text-xs opacity-40">🏷️</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Cloud component ────────────────────────────────────────────────────────

function Cloud({ x, y, size, speed, delay }: { x: number; y: number; size: number; speed: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-[2]"
      style={{ top: `${y}%`, width: `${size}px` }}
      initial={{ x: `${x}%` }}
      animate={{ x: ["110%", "-30%"] }}
      transition={{
        duration: speed,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    >
      <div className="relative">
        <div className="absolute w-full h-[60%] bg-white/70 rounded-full top-[20%]" />
        <div className="absolute w-[60%] h-[80%] bg-white/80 rounded-full left-[10%] top-0" />
        <div className="absolute w-[50%] h-[70%] bg-white/75 rounded-full right-[15%] top-[5%]" />
      </div>
    </motion.div>
  );
}
