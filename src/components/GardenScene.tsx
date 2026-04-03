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

function getTimeGreeting(time: TimeOfDay): string {
  switch (time) {
    case "dawn": return "Early morning";
    case "morning": return "Good morning";
    case "midday": return "Midday";
    case "afternoon": return "Afternoon";
    case "evening": return "Good evening";
    case "night": return "Night time";
  }
}

// Warm Ghibli sky — subtle, not dominating
const SKY_COLOURS: Record<TimeOfDay, string> = {
  dawn: "from-[#F8D8B0] to-[#F2EDE4]",
  morning: "from-[#C8DDE8] to-[#F2EDE4]",
  midday: "from-[#B8D4E4] to-[#F0EBE0]",
  afternoon: "from-[#BCD8E8] to-[#EEEBE4]",
  evening: "from-[#E8A878] to-[#F0E4D8]",
  night: "from-[#1A2040] to-[#2A3450]",
};

type Season = "spring" | "summer" | "autumn" | "winter";
function getSeason(): Season {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "autumn";
  return "winter";
}

// ─── Scene ──────────────────────────────────────────────────────────────────

interface GardenSceneProps {
  weather: WeatherState | null;
  cropCount: number;
  children: React.ReactNode;
  infoBoard: React.ReactNode;
}

export default function GardenScene({ weather, cropCount, children, infoBoard }: GardenSceneProps) {
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
    <div className="relative overflow-hidden" style={{ background: "#F2EDE4" }}>

      {/* ═══ SKY — compact, just enough to set the mood ═══ */}
      <div className={`h-24 sm:h-28 relative transition-colors duration-[5000ms] bg-gradient-to-b ${
        isRaining ? "from-[#6A7A88] to-[#A8B4BC]"
        : isCloudy ? "from-[#90A0B0] to-[#C8D0D8]"
        : SKY_COLOURS[time]
      }`}>

        {/* Sun */}
        {isSunny && !isNight && (
          <motion.div
            className="absolute top-3 right-[15%] w-14 h-14 rounded-full"
            style={{
              background: "radial-gradient(circle, #FFF8E0 20%, #FFE484 40%, rgba(255,208,64,0) 65%)",
              boxShadow: "0 0 50px 25px rgba(255,228,132,0.2)",
            }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        )}

        {/* Moon */}
        {isNight && (
          <motion.div
            className="absolute top-4 right-[20%] w-10 h-10 rounded-full bg-[#F0ECE0] shadow-[0_0_25px_8px_rgba(240,236,224,0.15)]"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        )}

        {/* Stars */}
        {isNight && [...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{ left: `${5 + (i * 31) % 90}%`, top: `${8 + (i * 17) % 60}%` }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Clouds */}
        {!isNight && (isCloudy || isRaining) && (
          <>
            <Cloud y={5} size={isRaining ? 160 : 110} speed={isRaining ? 35 : 50} delay={0} dark={!!isRaining} />
            <Cloud y={15} size={isRaining ? 140 : 80} speed={isRaining ? 40 : 60} delay={8} dark={!!isRaining} />
            {isRaining && <Cloud y={0} size={180} speed={32} delay={4} dark={true} />}
          </>
        )}
        {isSunny && !isNight && (
          <Cloud y={20} size={70} speed={80} delay={0} dark={false} />
        )}

        {/* Rain */}
        {isRaining && <RainEffect />}

        {/* Weather badge — sits in the sky */}
        {weather && (
          <div className="absolute bottom-2 left-3 z-20">
            <div className="bg-white/25 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-white/20">
              <div className="flex items-center gap-2">
                <span className="text-lg">{isRaining ? "🌧️" : isCloudy ? "☁️" : isSunny ? "☀️" : isNight ? "🌙" : "⛅"}</span>
                <div>
                  <span className="text-sm font-bold text-white drop-shadow">{Math.round(weather.temperature)}°C</span>
                  <span className="text-[9px] text-white/70 ml-1.5">{getTimeGreeting(time)}</span>
                </div>
              </div>
              <p className="text-[8px] text-white/60 mt-0.5">
                {weather.drySpell >= 3 ? `Dry ${weather.drySpell} days` : weather.frostRisk ? "Frost risk" : weather.recentRain ? "Rain watered your crops" : weather.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ═══ MAIN SCENE — beds + shed side by side, matching illustration layout ═══ */}
      <div className="relative bg-gradient-to-b from-[#F2EDE4] to-[#E8E0D0]">

        {/* Grass strip */}
        <div className={`h-3 ${isNight ? "bg-[#2A4020]" : "bg-[#7AAA58]"} transition-colors duration-[5000ms]`} />

        {/* Scene content: beds left, shed right */}
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 px-3 sm:px-6 py-4 sm:py-6 max-w-4xl mx-auto">

          {/* ═══ RAISED BEDS — flat view with visible front face (like the illustration) ═══ */}
          <div className="flex-1 min-w-0">
            {/* The bed frame — heritage green like the illustration */}
            <div className="relative">
              {/* Front face of the bed */}
              <div className={`h-4 sm:h-5 ${isNight ? "bg-[#1A3A20]" : "bg-[#1E4A2D]"} rounded-b-lg mx-0.5 transition-colors duration-[5000ms]`} />
              {/* Top edge */}
              <div className={`${isNight ? "bg-[#1E4A2D]" : "bg-[#2D5F3E]"} rounded-t-lg p-[3px] -mt-4 sm:-mt-5 relative transition-colors duration-[5000ms]`}>
                {/* Inner lighter edge */}
                <div className={`${isNight ? "bg-[#2A5A38]" : "bg-[#3D7A52]"} rounded-[5px] p-[2px] transition-colors duration-[5000ms]`}>
                  {/* Soil */}
                  <div className={`${isNight ? "bg-[#3A2810]" : "bg-[#5A3A1A]"} rounded p-1.5 sm:p-2 transition-colors duration-[5000ms]`}>
                    {children}
                  </div>
                </div>
              </div>
            </div>

            {/* Marigolds under the bed */}
            {(season === "spring" || season === "summer") && !isNight && (
              <div className="flex justify-center gap-0.5 mt-1 opacity-70">
                {["🌼", "🌻", "🌼", "🌻", "🌼", "🌻", "🌼"].map((f, i) => (
                  <motion.span
                    key={i}
                    className="text-[10px]"
                    animate={{ y: [0, -1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {f}
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          {/* ═══ SHED — prominent, beside the beds ═══ */}
          <div className="w-full sm:w-52 shrink-0">
            <div className="relative max-w-[200px] sm:max-w-none mx-auto">

              {/* Roof */}
              <div className="relative h-7 sm:h-9 overflow-hidden">
                <div
                  className={`absolute inset-x-[-6px] bottom-0 h-9 sm:h-11 ${isNight ? "bg-[#1A3A20]" : "bg-[#2D5F3E]"} transition-colors duration-[5000ms]`}
                  style={{ clipPath: "polygon(0% 100%, 50% 10%, 100% 100%)" }}
                />
              </div>

              {/* Shed body */}
              <div className={`relative ${isNight ? "bg-[#7A4820]" : "bg-[#C4783A]"} rounded-b-lg border-2 ${isNight ? "border-[#5A3818]" : "border-[#8A5020]"} overflow-hidden transition-colors duration-[5000ms]`}>
                {/* Wood grain */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="absolute w-full h-px bg-black/40" style={{ top: `${10 + i * 15}%` }} />
                  ))}
                </div>

                {/* Door */}
                <div className={`absolute top-2 left-1/2 -translate-x-1/2 w-7 h-10 rounded-t-md border-2 ${isNight ? "border-[#5A3818] bg-[#8A5828]" : "border-[#8A5020]/40 bg-[#B06830]"}`}>
                  <div className="absolute right-1 top-1/2 w-1 h-1 rounded-full bg-[#D4A43A]" />
                </div>

                {/* Window — glows at night */}
                <div className={`absolute top-2 right-2 w-5 h-4 rounded-sm border ${isNight ? "border-[#5A3818] bg-[#FFE484]/40" : "border-[#8A5020]/40 bg-[#FFE484]/20"}`} />

                {/* Tools beside the door */}
                <div className="absolute bottom-1 right-1 flex gap-0.5 opacity-60">
                  <span className="text-[10px]">🪴</span>
                  <span className="text-[10px]">🥕</span>
                </div>

                {/* ═══ NOTICEBOARD — small, pinned to shed wall ═══ */}
                <div className="p-2 pt-14 sm:pt-16">
                  <div className="cork-board rounded border border-[#8A6830] shadow-inner paper-grain">
                    <div className="bg-[#6A4820]/70 px-2 py-1 rounded-t">
                      <span className="text-[7px] font-bold tracking-[0.1em] uppercase text-white/70">📌 Board</span>
                    </div>
                    <div className="p-1.5 max-h-[280px] overflow-y-auto text-[9px]">
                      {infoBoard}
                    </div>
                  </div>
                </div>
              </div>

              {/* Watering can + tools leaning against shed */}
              <div className="flex gap-1 mt-0.5 ml-1 opacity-40">
                <span className="text-xs">🪣</span>
                <span className="text-xs -rotate-12">🌿</span>
              </div>
            </div>

            {/* Creatures near the shed */}
            {cropCount >= 5 && !isNight && (
              <motion.div
                className="text-center mt-1"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm opacity-60">🐦</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Path below */}
        <div className="flex justify-center pb-2">
          <div className={`w-24 h-2 rounded-full ${isNight ? "bg-[#5A5040]/30" : "bg-[#C4B890]/25"}`} />
        </div>
      </div>
    </div>
  );
}

// ─── Cloud ───────────────────────────────────────────────────────────────────

function Cloud({ y, size, speed, delay, dark = false }: { y: number; size: number; speed: number; delay: number; dark?: boolean }) {
  const c = dark ? "rgba(100,110,120," : "rgba(255,255,255,";
  const o = dark ? 0.7 : 0.5;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${y}%`, height: `${size * 0.4}px` }}
      initial={{ left: "-20%" }}
      animate={{ left: "115%" }}
      transition={{ duration: speed, repeat: Infinity, delay, ease: "linear" }}
    >
      <div className="relative" style={{ width: `${size}px`, height: `${size * 0.4}px` }}>
        <div className="absolute w-full h-[55%] rounded-full top-[30%]" style={{ background: `${c}${o})` }} />
        <div className="absolute w-[55%] h-[80%] rounded-full left-[12%] top-0" style={{ background: `${c}${o * 1.1})` }} />
        <div className="absolute w-[45%] h-[65%] rounded-full right-[15%] top-[5%]" style={{ background: `${c}${o * 0.9})` }} />
      </div>
    </motion.div>
  );
}

// ─── Rain ────────────────────────────────────────────────────────────────────

function RainEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1.5px] h-4 bg-[#8AA8C8]/30 rounded-full"
          style={{ left: `${(i * 2.9) % 100}%`, top: "-16px" }}
          animate={{ y: [0, 200], opacity: [0.35, 0] }}
          transition={{ duration: 0.5 + (i % 3) * 0.1, repeat: Infinity, delay: (i * 0.05) % 0.8, ease: "linear" }}
        />
      ))}
    </div>
  );
}
