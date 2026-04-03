"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { WeatherState } from "@/lib/weather-intelligence";

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

interface GardenSceneProps {
  weather: WeatherState | null;
  cropCount: number;
  children: React.ReactNode;
  infoBoard: React.ReactNode;
}

export default function GardenScene({ weather, cropCount, children, infoBoard }: GardenSceneProps) {
  const [time, setTime] = useState<TimeOfDay>("morning");
  const [showBoard, setShowBoard] = useState(false);

  useEffect(() => {
    setTime(getTimeOfDay());
    const interval = setInterval(() => setTime(getTimeOfDay()), 60000);
    return () => clearInterval(interval);
  }, []);

  const isRaining = weather && (weather.rain > 0.5 || (weather.weatherCode >= 51 && weather.weatherCode <= 82));
  const isSunny = weather && weather.weatherCode <= 2;
  const isNight = time === "night";
  const isCloudy = weather && weather.weatherCode >= 2 && weather.weatherCode <= 48;

  // Time-of-day colour overlay
  const timeOverlay = isNight
    ? "bg-[#0A1020]/50"
    : time === "evening"
      ? "bg-[#D08040]/10"
      : time === "dawn"
        ? "bg-[#F8C888]/10"
        : "bg-transparent";

  return (
    <div className="relative w-full" style={{ aspectRatio: "16/9", minHeight: "500px", maxHeight: "calc(100vh - 70px)" }}>

      {/* ═══ THE SCENE — one complete illustration ═══ */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Sky */}
        <div className={`absolute inset-0 transition-colors duration-[5000ms] ${
          isRaining ? "bg-gradient-to-b from-[#6A7A88] via-[#8A98A4] to-[#C8C4B8]"
          : isCloudy ? "bg-gradient-to-b from-[#90A0B0] via-[#B8C4CC] to-[#E4DED4]"
          : isNight ? "bg-gradient-to-b from-[#1A2040] via-[#2A3450] to-[#3A4460]"
          : "bg-gradient-to-b from-[#B8D4E4] via-[#D0E4F0] to-[#F2EDE4]"
        }`} />

        {/* Sun / Moon */}
        {isSunny && !isNight && (
          <motion.div
            className="absolute top-[8%] right-[15%] w-[8%] aspect-square rounded-full"
            style={{
              background: "radial-gradient(circle, #FFF8E0 20%, #FFE484 40%, rgba(255,208,64,0) 65%)",
              boxShadow: "0 0 50px 25px rgba(255,228,132,0.2)",
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        )}
        {isNight && (
          <motion.div
            className="absolute top-[10%] right-[20%] w-[6%] aspect-square rounded-full bg-[#F0ECE0] shadow-[0_0_25px_8px_rgba(240,236,224,0.15)]"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        )}

        {/* Clouds */}
        {!isNight && (isCloudy || isRaining) && (
          <>
            <Cloud y={3} size="25%" speed={isRaining ? 30 : 50} delay={0} dark={!!isRaining} />
            <Cloud y={8} size="20%" speed={isRaining ? 35 : 55} delay={10} dark={!!isRaining} />
            {isRaining && <Cloud y={0} size="30%" speed={28} delay={5} dark={true} />}
          </>
        )}

        {/* Rain */}
        {isRaining && <RainEffect />}

        {/* Stars */}
        {isNight && [...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{ left: `${8 + (i * 29) % 84}%`, top: `${5 + (i * 13) % 25}%` }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}

        {/* The illustration — no sky, fills the bottom portion edge to edge */}
        <img
          src="/images/game/allotment-nosky.png"
          alt="Your allotment"
          className="absolute bottom-0 left-0 w-full object-cover object-top"
          style={{ height: "60%" }}
        />

        {/* Time-of-day colour wash */}
        <div className={`absolute inset-0 ${timeOverlay} transition-colors duration-[5000ms] pointer-events-none`} />
      </div>

      {/* ═══ INTERACTIVE LAYER — sits on top of the illustration ═══ */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Weather badge — top left, floating over the sky */}
        {weather && (
          <div className="absolute top-3 left-3 z-20">
            <motion.div
              className="bg-white/25 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{isRaining ? "🌧️" : isCloudy ? "☁️" : isSunny ? "☀️" : isNight ? "🌙" : "⛅"}</span>
                <div>
                  <span className="text-sm font-bold text-white drop-shadow">{Math.round(weather.temperature)}°C</span>
                  <p className="text-[8px] text-white/70">{getTimeGreeting(time)} · {weather.description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Noticeboard button — top right, tap to expand */}
        <button
          onClick={() => setShowBoard(!showBoard)}
          className="absolute top-3 right-3 z-20 bg-[#8A6830]/80 backdrop-blur-sm text-white/80 rounded-xl px-3 py-2 text-[10px] font-bold tracking-[0.08em] uppercase border border-[#A08040]/40 shadow-lg hover:bg-[#9A7840]/80 transition-colors"
        >
          📌 {showBoard ? "Close" : "Board"}
        </button>

        {/* The garden tiles — positioned over the raised beds in the illustration */}
        <div className="absolute bottom-[8%] left-[2%] right-[30%] sm:bottom-[10%] sm:left-[3%] sm:right-[32%] z-10">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-[3%] sm:gap-[2.5%]">
            {children}
          </div>
        </div>
      </div>

      {/* ═══ NOTICEBOARD OVERLAY — expands when tapped ═══ */}
      {showBoard && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowBoard(false)}
        >
          <div className="absolute inset-0 bg-black/30" />
          <motion.div
            className="relative cork-board paper-grain rounded-2xl border-4 border-[#8A6830] shadow-2xl max-w-sm w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#6A4820]/80 px-4 py-2.5 rounded-t-xl flex justify-between items-center">
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-white/80">📌 Allotment Noticeboard</span>
              <button onClick={() => setShowBoard(false)} className="text-white/50 hover:text-white/80 text-sm">✕</button>
            </div>
            <div className="p-3">
              {infoBoard}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Cloud ───────────────────────────────────────────────────────────────────

function Cloud({ y, size, speed, delay, dark }: { y: number; size: string; speed: number; delay: number; dark: boolean }) {
  const c = dark ? "rgba(100,110,120," : "rgba(255,255,255,";
  const o = dark ? 0.6 : 0.45;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${y}%`, width: size, aspectRatio: "2.5/1" }}
      initial={{ left: "-25%" }}
      animate={{ left: "110%" }}
      transition={{ duration: speed, repeat: Infinity, delay, ease: "linear" }}
    >
      <div className="relative w-full h-full">
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
    <div className="absolute inset-0 pointer-events-none z-[5]">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1.5px] h-4 bg-[#8AA8C8]/25 rounded-full"
          style={{ left: `${(i * 3.3) % 100}%`, top: "-16px" }}
          animate={{ y: [0, 500], opacity: [0.3, 0] }}
          transition={{ duration: 0.6 + (i % 3) * 0.1, repeat: Infinity, delay: (i * 0.05) % 0.8, ease: "linear" }}
        />
      ))}
    </div>
  );
}
