"use client";

import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
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
  alerts?: { type: string; priority: string; message: string }[];
  plantMode?: "lucky-dip" | "choose";
  onModeChange?: (mode: "lucky-dip" | "choose") => void;
}

export default function GardenScene({ weather, cropCount, children, infoBoard, alerts, plantMode, onModeChange }: GardenSceneProps) {
  const [time, setTime] = useState<TimeOfDay>("morning");
  const [showBoard, setShowBoard] = useState(false);
  const [calibrate, setCalibrate] = useState(false);
  const [clicks, setClicks] = useState<{x: number, y: number}[]>([]);

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
    <div data-scene className="relative w-full" style={{ aspectRatio: "16/9", minHeight: "500px", maxHeight: "calc(100vh - 70px)" }}>

      {/* ═══ THE SCENE — one complete illustration ═══ */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Sky — painted sky base, weather overlays on top */}
        {isNight ? (
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A2040] via-[#2A3450] to-[#3A4460]" />
        ) : (
          <>
            <img src="/images/game/sky-day.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
            {isRaining && (
              <div className="absolute inset-0 bg-[#6A7A88]/60 transition-opacity duration-[5000ms]" />
            )}
            {isCloudy && !isRaining && (
              <div className="absolute inset-0 bg-[#90A0B0]/30 transition-opacity duration-[5000ms]" />
            )}
          </>
        )}

        {/* Sun / Moon */}
        {isSunny && !isNight && (
          <motion.div
            className="absolute top-[4%] right-[12%] w-[14%] pointer-events-none"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <img src="/images/game/sun.png" alt="" className="w-full h-auto" />
          </motion.div>
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

        {/* Ambient life — bee and robin */}
        {!isNight && !isRaining && (
          <>
            <LiveBee />
            <LiveRobin />
          </>
        )}

        {/* The illustration — full width, anchored to bottom */}
        <img
          src="/images/game/background three beds V2.png"
          alt="Your allotment"
          className="absolute bottom-0 left-0 w-full object-contain object-bottom"
        />

        {/* Time-of-day colour wash */}
        <div className={`absolute inset-0 ${timeOverlay} transition-colors duration-[5000ms] pointer-events-none`} />
      </div>

      {/* ═══ INTERACTIVE LAYER — sits on top of the illustration ═══ */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Weather display — temperature overlaid on illustrated weather icon */}
        {weather && (
          <motion.div
            className="absolute top-4 left-4 z-20 flex items-center gap-3"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Weather illustration with temp inside */}
            <div className="relative">
              <motion.img
                src={
                  isRaining ? "/images/game/cloud-dark.png"
                  : isCloudy ? "/images/game/cloud-white.png"
                  : isNight ? "/images/game/cloud-white.png"
                  : "/images/game/sun.png"
                }
                alt=""
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg"
                animate={isNight ? {} : { rotate: [0, 2, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={isNight ? { filter: "brightness(0.6) saturate(0.3)" } : undefined}
              />
              {/* Temperature — big, bold, centered on the icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl sm:text-3xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] ${
                  isNight ? "text-[#E8E4D8]"
                  : isRaining ? "text-white"
                  : isCloudy ? "text-[#3A2A10]"
                  : "text-white"
                }`}>
                  {Math.round(weather.temperature)}°
                </span>
              </div>
            </div>
            {/* Description text */}
            <div className="flex flex-col">
              <span className={`text-xs sm:text-sm font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] ${
                isNight ? "text-[#C8C4B8]" : "text-white"
              }`}>
                {getTimeGreeting(time)}
              </span>
              <span className={`text-[10px] sm:text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] ${
                isNight ? "text-[#A8A498]" : "text-white/80"
              }`}>
                {weather.description}
              </span>
            </div>
          </motion.div>
        )}

        {/* Top right controls */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 items-end">
          {/* Mode toggle */}
          {onModeChange && (
            <div className="seed-packet paper-grain rounded-xl p-1 flex gap-1" style={{ transform: "rotate(1deg)" }}>
              {(["lucky-dip", "choose"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => onModeChange(mode)}
                  className={`text-[9px] font-bold tracking-[0.06em] uppercase px-2.5 py-1.5 rounded-lg transition-colors ${
                    plantMode === mode ? "bg-[#8A6830]/20 text-[#3A2A10]" : "text-[#6A5A40]/50 hover:text-[#3A2A10]"
                  }`}
                >
                  {mode === "lucky-dip" ? "🎲 Lucky Dip" : "🌱 Choose"}
                </button>
              ))}
            </div>
          )}

          {/* Board button */}
          <button
            onClick={() => setShowBoard(!showBoard)}
            className="seed-packet paper-grain rounded-xl px-3 py-2 text-[10px] font-bold tracking-[0.08em] uppercase text-[#5A4420] shadow-md hover:brightness-95 transition-colors"
            style={{ transform: "rotate(1.5deg)" }}
          >
            📌 Board
          </button>
        </div>

        {/* Top alert — like a pinned postcard */}
        {alerts && alerts.length > 0 && (
          <motion.div
            className="absolute top-3 left-1/2 -translate-x-1/2 z-20 max-w-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="relative seed-packet paper-grain pinned rounded-xl px-4 py-2.5 flex items-center gap-2.5">
              <div className="tape-strip" />
              <span className="text-base">{alerts[0].type === "frost" ? "🥶" : alerts[0].type === "water" ? "💧" : alerts[0].type === "harvest" ? "🌾" : "🌱"}</span>
              <p className="text-[11px] text-[#3A2A10] leading-snug italic">{alerts[0].message}</p>
            </div>
          </motion.div>
        )}

      </div>

      {/* ═══ GARDEN TILES — one group per raised bed ═══ */}
      <BedTiles>{children}</BedTiles>

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
            className="relative max-w-sm w-full max-h-[80vh] overflow-hidden"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Illustrated noticeboard background */}
            <img
              src="/images/game/noticeboard.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
            <div className="relative z-10">
              <div className="px-5 pt-4 pb-2 flex justify-between items-center">
                <span className="text-xs font-bold tracking-[0.12em] uppercase text-[#3A2A10] drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">📌 Allotment Noticeboard</span>
                <button onClick={() => setShowBoard(false)} className="text-[#5A4420]/60 hover:text-[#3A2A10] text-sm font-bold">✕</button>
              </div>
              <div className="p-4 pt-2 max-h-[70vh] overflow-y-auto">
                {infoBoard}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ═══ CALIBRATION MODE — click to get coordinates ═══ */}
      <button
        onClick={() => { setCalibrate(!calibrate); setClicks([]); }}
        className="absolute bottom-1 right-1 z-50 bg-black/70 text-white text-[9px] px-2 py-1 rounded"
      >
        {calibrate ? "EXIT CALIBRATE" : "CAL"}
      </button>
      {calibrate && (
        <div
          className="absolute inset-0 z-40 cursor-crosshair"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            const point = { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
            setClicks(prev => [...prev, point]);
            console.log(`Click ${clicks.length + 1}: left=${point.x}% top=${point.y}%`);
          }}
        >
          {/* Show all clicks as dots with coordinates */}
          {clicks.map((c, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
            >
              <span className="absolute left-4 top-0 text-[10px] font-mono bg-black/80 text-white px-1 rounded whitespace-nowrap">
                {i + 1}: {c.x}%, {c.y}%
              </span>
            </div>
          ))}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg">
            Click the 4 corners of each bed&apos;s soil area (top-left, top-right, bottom-right, bottom-left). {clicks.length} clicks so far.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Bed Group — splits tiles evenly across 3 beds ──────────────────────────

function BedTiles({ children }: { children: React.ReactNode }) {
  const all = React.Children.toArray(children);
  // Left bed: slots 0-1, Center bed: slots 2-5, Right bed: slots 6-7
  const left = all.slice(0, 2);
  const center = all.slice(2, 6);
  const right = all.slice(6, 8);

  return (
    <>
      {/* Debug */}
      {/* Left bed soil */}
      <div
        className="absolute z-10 flex flex-wrap gap-1 content-center justify-center bg-red-500/40"
        style={{ left: "6%", width: "14%", bottom: "30%", height: "15%" }}
      >
        {left}
      </div>
      {/* Center bed soil */}
      <div
        className="absolute z-10 flex flex-wrap gap-1 content-center justify-center bg-blue-500/40"
        style={{ left: "38%", width: "17%", bottom: "30%", height: "15%" }}
      >
        {center}
      </div>
      {/* Right bed soil */}
      <div
        className="absolute z-10 flex flex-wrap gap-1 content-center justify-center bg-green-500/40"
        style={{ left: "73%", width: "11%", bottom: "30%", height: "15%" }}
      >
        {right}
      </div>
    </>
  );
}

// ─── Live Bee — lazy drift, lands on plants, nudges from cursor ─────────────

type BeeState = "drifting" | "landing" | "resting" | "leaving";

// Spots the bee drifts between — sky area + flower landing spots on beds
const BEE_WAYPOINTS = [
  { x: 40, y: 15 }, { x: 60, y: 12 }, { x: 25, y: 18 },
  { x: 70, y: 20 }, { x: 50, y: 10 }, { x: 35, y: 22 },
];
const BEE_FLOWER_SPOTS = [
  { x: 15, y: 65 }, { x: 25, y: 65 }, // left bed
  { x: 42, y: 65 }, { x: 52, y: 65 }, // center bed
  { x: 68, y: 65 }, { x: 76, y: 65 }, // right bed
];

function LiveBee() {
  const [pos, setPos] = useState({ x: 55, y: 15 });
  const [beeState, setBeeState] = useState<BeeState>("drifting");
  const [facingLeft, setFacingLeft] = useState(false);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ref = useRef<HTMLImageElement>(null);

  // Track mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const scene = ref.current?.closest("[data-scene]") as HTMLElement;
      if (!scene) return;
      const r = scene.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Behaviour loop
  useEffect(() => {
    const act = () => {
      const m = mouseRef.current;
      const dx = pos.x - m.x;
      const dy = pos.y - m.y;
      const mouseDist = Math.sqrt(dx * dx + dy * dy);

      // Nudge away from cursor if close
      if (mouseDist < 15 && beeState !== "resting") {
        const angle = Math.atan2(dy, dx);
        const nx = Math.max(5, Math.min(90, pos.x + Math.cos(angle) * 12));
        const ny = Math.max(5, Math.min(40, pos.y + Math.sin(angle) * 12));
        setFacingLeft(nx < pos.x);
        setPos({ x: nx, y: ny });
        return;
      }

      const roll = Math.random();

      if (beeState === "resting") {
        // Been resting, take off again
        setBeeState("drifting");
        const wp = BEE_WAYPOINTS[Math.floor(Math.random() * BEE_WAYPOINTS.length)];
        setFacingLeft(wp.x < pos.x);
        setPos(wp);
      } else if (roll < 0.3) {
        // Land on a flower
        setBeeState("landing");
        const spot = BEE_FLOWER_SPOTS[Math.floor(Math.random() * BEE_FLOWER_SPOTS.length)];
        setFacingLeft(spot.x < pos.x);
        setPos(spot);
        setTimeout(() => setBeeState("resting"), 2000);
      } else {
        // Drift to new sky position
        setBeeState("drifting");
        const wp = BEE_WAYPOINTS[Math.floor(Math.random() * BEE_WAYPOINTS.length)];
        setFacingLeft(wp.x < pos.x);
        setPos(wp);
      }
    };

    const delay = beeState === "resting"
      ? 3000 + Math.random() * 4000  // rest for 3-7 seconds
      : 2000 + Math.random() * 3000; // drift every 2-5 seconds

    const timer = setTimeout(act, delay);
    return () => clearTimeout(timer);
  }, [pos, beeState]);

  return (
    <motion.img
      ref={ref}
      src="/images/game/bee.png"
      alt=""
      className="absolute w-[4%] sm:w-[3%] z-[2] pointer-events-none"
      animate={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        scaleX: facingLeft ? -1 : 1,
        rotate: beeState === "resting" ? 0 : [0, 2, -2, 0],
      }}
      transition={{
        left: { duration: beeState === "landing" ? 3 : 4, ease: "easeInOut" },
        top: { duration: beeState === "landing" ? 3 : 4, ease: "easeInOut" },
        scaleX: { duration: 0.3 },
        rotate: { duration: 2, repeat: beeState === "resting" ? 0 : Infinity, ease: "easeInOut" },
      }}
    />
  );
}

// ─── Live Robin — flies away, comes back, hops, pecks, sits on shed ─────────

type RobinState = "perched" | "pecking" | "looking" | "hopping" | "flyingAway" | "gone" | "returning";

const ROBIN_SPOTS = [
  { x: 78, y: 58, name: "shed-door" },
  { x: 82, y: 48, name: "shed-roof" },
  { x: 45, y: 65, name: "center-bed-edge" },
  { x: 12, y: 65, name: "left-bed-edge" },
  { x: 68, y: 65, name: "right-bed-edge" },
  { x: 30, y: 55, name: "grass-between-beds" },
  { x: 55, y: 55, name: "path" },
  { x: 20, y: 70, name: "left-bed-soil" },
  { x: 50, y: 70, name: "center-bed-soil" },
];

function LiveRobin() {
  const [spot, setSpot] = useState(3);
  const [state, setState] = useState<RobinState>("gone");
  const [facingLeft, setFacingLeft] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const act = () => {
      if (state === "gone") {
        // Come back from offscreen
        setState("returning");
        const newSpot = Math.floor(Math.random() * ROBIN_SPOTS.length);
        setFacingLeft(Math.random() > 0.5);
        setTimeout(() => {
          setSpot(newSpot);
          setState("perched");
          setVisible(true);
        }, 600);
        return;
      }

      const roll = Math.random();

      if (roll < 0.12) {
        // Fly away offscreen — disappear for a while
        setState("flyingAway");
        setTimeout(() => {
          setVisible(false);
          setState("gone");
        }, 800);
      } else if (roll < 0.35) {
        // Hop to a new spot
        setState("hopping");
        const newSpot = (spot + 1 + Math.floor(Math.random() * (ROBIN_SPOTS.length - 1))) % ROBIN_SPOTS.length;
        setFacingLeft(ROBIN_SPOTS[newSpot].x < ROBIN_SPOTS[spot].x);
        setTimeout(() => {
          setSpot(newSpot);
          setState("perched");
        }, 500);
      } else if (roll < 0.55) {
        // Peck at the ground (2-3 pecks)
        setState("pecking");
        setTimeout(() => setState("perched"), 1200);
      } else if (roll < 0.75) {
        // Look around — turn head
        setState("looking");
        setFacingLeft(!facingLeft);
        setTimeout(() => setState("perched"), 1500);
      } else {
        // Just sit still and be cute
        setState("perched");
      }
    };

    const delay = state === "gone"
      ? 5000 + Math.random() * 8000  // gone for 5-13 seconds
      : 1500 + Math.random() * 3000; // act every 1.5-4.5 seconds

    const timer = setTimeout(act, delay);
    return () => clearTimeout(timer);
  }, [spot, state, facingLeft]);

  const p = ROBIN_SPOTS[spot];

  return (
    <motion.img
      src="/images/game/robin.png"
      alt=""
      className="absolute w-[5%] sm:w-[4%] z-[2] cursor-pointer"
      animate={{
        left: state === "flyingAway" ? "105%" : `${p.x}%`,
        top: state === "flyingAway" ? "-10%" : `${p.y}%`,
        scaleX: facingLeft ? -1 : 1,
        rotate: state === "pecking" ? [0, 25, 0, 20, 0, 22, 0]
          : state === "looking" ? [0, -5, 5, -3, 0]
          : state === "hopping" ? [0, -5, 0]
          : 0,
        y: state === "pecking" ? [0, 3, 0, 2, 0, 3, 0]
          : state === "hopping" ? [0, -15, 0]
          : [0, -1, 0],
        opacity: visible ? 1 : 0,
        scale: state === "flyingAway" ? 0.6 : 1,
      }}
      transition={{
        left: { duration: state === "flyingAway" ? 0.8 : state === "hopping" ? 0.5 : 0.3, ease: "easeInOut" },
        top: { duration: state === "flyingAway" ? 0.8 : state === "hopping" ? 0.5 : 0.3, ease: "easeInOut" },
        rotate: { duration: state === "pecking" ? 1.2 : 1.5, ease: "easeInOut" },
        y: { duration: state === "pecking" ? 1.2 : state === "hopping" ? 0.5 : 3, repeat: state === "perched" ? Infinity : 0, ease: "easeInOut" },
        opacity: { duration: 0.3 },
        scaleX: { duration: 0.2 },
      }}
      whileHover={{ scale: 1.2, y: -8 }}
    />
  );
}

// ─── Cloud ───────────────────────────────────────────────────────────────────

function Cloud({ y, size, speed, delay, dark }: { y: number; size: string; speed: number; delay: number; dark: boolean }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${y}%`, width: size }}
      initial={{ left: "-25%" }}
      animate={{ left: "110%" }}
      transition={{ duration: speed, repeat: Infinity, delay, ease: "linear" }}
    >
      <img
        src={dark ? "/images/game/cloud-dark.png" : "/images/game/cloud-white.png"}
        alt=""
        className="w-full h-auto"
        style={{ opacity: dark ? 0.85 : 0.7 }}
      />
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
