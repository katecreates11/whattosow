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

// Ghibli-warm sky colours matching the illustration's cream/earthy palette
const SKY_GRADIENTS: Record<TimeOfDay, string> = {
  dawn: "from-[#F8D8B0] via-[#FBE8D4] to-[#E8D8C8]",
  morning: "from-[#C8DDE8] via-[#DDE8F0] to-[#F2EDE4]",
  midday: "from-[#B8D4E4] via-[#D0E4F0] to-[#F0EBE0]",
  afternoon: "from-[#BCD8E8] via-[#D4E4F0] to-[#EEEBE4]",
  evening: "from-[#E8A878] via-[#F0C8A0] to-[#D8B8C8]",
  night: "from-[#1A2040] via-[#283060] to-[#384868]",
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
    <div className="relative min-h-[500px] sm:min-h-[600px] overflow-hidden" style={{ background: "#F2EDE4" }}>

      {/* ═══ SKY ═══ */}
      <div className={`absolute inset-0 bg-gradient-to-b ${SKY_GRADIENTS[time]} transition-colors duration-[5000ms]`} />

      {/* Sun */}
      {isSunny && !isNight && (
        <motion.div
          className="absolute top-8 right-[15%] w-16 h-16 rounded-full"
          style={{
            background: "radial-gradient(circle, #FFE484 30%, #FFD040 60%, transparent 70%)",
            boxShadow: "0 0 60px 20px rgba(255,228,132,0.25)",
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Stars */}
      {isNight && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{ left: `${8 + (i * 41) % 84}%`, top: `${3 + (i * 19) % 25}%` }}
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>
      )}

      {/* Clouds */}
      {isCloudy && !isNight && (
        <>
          <Cloud y={6} size={90} speed={50} delay={0} />
          <Cloud y={3} size={65} speed={60} delay={12} />
          <Cloud y={10} size={75} speed={45} delay={6} />
        </>
      )}

      {/* Rain */}
      {isRaining && <RainEffect />}

      {/* ═══ MAIN SCENE — illustration-based layout ═══ */}
      <div className="relative z-[1] pt-20 sm:pt-28">

        {/* Background illustration — the allotment scene */}
        <div className="absolute bottom-0 right-0 w-full sm:w-[60%] pointer-events-none opacity-[0.12] sm:opacity-[0.18]">
          <img
            src="/images/game/allotment-scene.png"
            alt=""
            aria-hidden="true"
            className="w-full object-contain object-bottom"
          />
        </div>

        {/* Scene layout: beds on left, shed/board on right */}
        <div className="relative flex flex-col lg:flex-row gap-4 px-3 sm:px-6 pb-6">

          {/* ═══ LEFT: The raised beds (interactive garden) ═══ */}
          <div className="flex-1 min-w-0">
            {/* Raised bed with 3D perspective */}
            <div className="flex justify-center" style={{ perspective: "800px" }}>
              <div style={{ transformStyle: "preserve-3d", transform: "rotateX(35deg) scale(0.98)" }}>

                {/* Wooden frame */}
                <div className="relative">
                  {/* Shadow */}
                  <div className="absolute -inset-3 sm:-inset-4 rounded-xl bg-black/8 blur-md" style={{ transform: "translateZ(-3px)" }} />

                  {/* Outer frame — heritage green like the illustration */}
                  <div className="absolute -inset-2.5 sm:-inset-3.5 rounded-xl bg-[#2D5F3E]" />

                  {/* Front face */}
                  <div
                    className="absolute -left-2.5 sm:-left-3.5 -right-2.5 sm:-right-3.5 -bottom-2.5 sm:-bottom-3.5 h-5 sm:h-7 bg-[#1E4A2D] rounded-b-lg"
                    style={{ transformOrigin: "top", transform: "rotateX(-90deg)" }}
                  />

                  {/* Inner frame — lighter green */}
                  <div className="absolute -inset-1 sm:-inset-1.5 rounded-lg bg-[#3D7A52]" />

                  {/* Soil */}
                  <div className="relative rounded-md bg-gradient-to-b from-[#5A3A1A] to-[#4A2A10] p-1.5 sm:p-2" style={{ transformStyle: "preserve-3d" }}>
                    {children}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements below the bed */}
            <div className="flex justify-center items-center gap-4 mt-4 opacity-60">
              {/* Marigolds — like Kate's real allotment */}
              {season === "spring" || season === "summer" ? (
                <div className="flex gap-1">
                  {["🌼", "🌻", "🌼", "🌻", "🌼"].map((f, i) => (
                    <motion.span
                      key={i}
                      className="text-sm"
                      animate={{ y: [0, -1.5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                    >
                      {f}
                    </motion.span>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Path */}
            <div className="flex justify-center mt-2">
              <div className="w-20 h-2 rounded-full bg-[#C4B890]/30" />
            </div>

            {/* Creatures */}
            <div className="relative h-6 mt-1">
              {cropCount >= 5 && !isNight && (
                <motion.span
                  className="absolute right-[20%] text-base"
                  animate={{ y: [0, -3, 0], x: [0, 2, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  🐦
                </motion.span>
              )}
              {season === "summer" && !isNight && (
                <motion.span
                  className="absolute text-sm pointer-events-none"
                  animate={{ x: ["-10%", "110%"], y: ["30%", "10%", "40%", "20%"] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  🦋
                </motion.span>
              )}
            </div>
          </div>

          {/* ═══ RIGHT: The shed + noticeboard ═══ */}
          <div className="lg:w-80 shrink-0">
            {/* CSS Shed — matches the illustration style */}
            <div className="relative mx-auto max-w-[300px] lg:max-w-none">
              {/* Shed roof */}
              <div className="relative h-8 overflow-hidden">
                <div
                  className="absolute inset-x-[-8px] bottom-0 h-10 bg-[#2D5F3E] rounded-t-lg"
                  style={{ clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)" }}
                />
                {/* Roof texture lines */}
                <div className="absolute inset-x-0 bottom-0 h-8 overflow-hidden opacity-20">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="absolute w-full h-px bg-black/30" style={{ bottom: `${i * 8 + 4}px`, transform: `rotate(${i % 2 ? 1 : -1}deg)` }} />
                  ))}
                </div>
              </div>

              {/* Shed body */}
              <div className="relative bg-gradient-to-b from-[#C4783A] to-[#A86028] rounded-b-lg overflow-hidden border-2 border-[#8A5020]">
                {/* Wood plank lines */}
                <div className="absolute inset-0 opacity-15">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute w-full h-px bg-black/40" style={{ top: `${12 + i * 11}%` }} />
                  ))}
                </div>

                {/* Door hint */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-12 rounded-t-lg border-2 border-[#8A5020]/40 bg-[#B06830]">
                  <div className="absolute right-1 top-1/2 w-1.5 h-1.5 rounded-full bg-[#D4A43A]" />
                </div>

                {/* Window */}
                <div className="absolute top-3 right-3 w-6 h-5 rounded bg-[#FFE484]/30 border border-[#8A5020]/40" />

                {/* ═══ NOTICEBOARD — integrated into the shed ═══ */}
                <div className="relative p-3 pt-16">
                  {/* Board itself */}
                  <div className="cork-board rounded-lg border-2 border-[#8A6830] shadow-inner paper-grain overflow-hidden">
                    <div className="bg-[#6A4820]/80 px-3 py-1.5">
                      <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/70 embossed">📌 Noticeboard</span>
                    </div>
                    <div className="p-2 max-h-[400px] overflow-y-auto">
                      {infoBoard}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools leaning against the shed */}
              <div className="flex justify-end gap-1 pr-2 -mt-1 opacity-50">
                <span className="text-sm -rotate-12">🪣</span>
                <span className="text-sm rotate-6">🌿</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Cloud ───────────────────────────────────────────────────────────────────

function Cloud({ y, size, speed, delay }: { y: number; size: number; speed: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-[2]"
      style={{ top: `${y}%`, height: `${size * 0.4}px` }}
      initial={{ left: "-15%" }}
      animate={{ left: "110%" }}
      transition={{ duration: speed, repeat: Infinity, delay, ease: "linear" }}
    >
      <div className="relative" style={{ width: `${size}px`, height: `${size * 0.4}px` }}>
        <div className="absolute w-full h-[60%] bg-white/60 rounded-full top-[25%]" />
        <div className="absolute w-[55%] h-[80%] bg-white/70 rounded-full left-[15%] top-0" />
        <div className="absolute w-[45%] h-[65%] bg-white/65 rounded-full right-[18%] top-[8%]" />
      </div>
    </motion.div>
  );
}

// ─── Rain ────────────────────────────────────────────────────────────────────

function RainEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] h-3 bg-[#8BAAC8]/25 rounded-full"
          style={{ left: `${(i * 14.3) % 100}%`, top: "-12px" }}
          animate={{ y: [0, 600], opacity: [0.3, 0] }}
          transition={{ duration: 0.7 + (i % 3) * 0.15, repeat: Infinity, delay: (i * 0.08) % 0.8, ease: "linear" }}
        />
      ))}
    </div>
  );
}
