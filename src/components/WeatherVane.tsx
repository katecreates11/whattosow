"use client";

import { useEffect, useState } from "react";
import { loadLocation } from "@/lib/location-storage";

interface WeatherData {
  temp: number;
  code: number;
  wind: number;
  windDir: number;
  soilTemp?: number;
}

function getSymbol(code: number): string {
  if (code === 0) return "☀";
  if (code <= 2) return "⛅";
  if (code === 3) return "☁";
  if (code <= 48) return "🌫";
  if (code <= 57) return "🌦";
  if (code <= 67) return "🌧";
  if (code <= 77) return "❄";
  if (code <= 82) return "🌦";
  if (code >= 95) return "⛈";
  return "🌤";
}

function getAnimation(code: number): string {
  if (code === 0) return "animate-spin-slow";
  if (code <= 3) return "animate-drift";
  if (code <= 67) return "animate-drip";
  if (code <= 77) return "animate-flutter";
  if (code >= 95) return "animate-flash";
  return "animate-drift";
}

function windDirLabel(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

export default function WeatherVane() {
  const [w, setW] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const saved = loadLocation();
        const lat = saved?.latitude ?? 52.48;
        const lng = saved?.longitude ?? -1.89;
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,soil_temperature_0cm&timezone=Europe/London`
        );
        if (!res.ok) return;
        const data = await res.json();
        const c = data.current;
        setW({
          temp: c.temperature_2m,
          code: c.weather_code,
          wind: c.wind_speed_10m,
          windDir: c.wind_direction_10m,
          soilTemp: c.soil_temperature_0cm,
        });
      } catch {
        // silent
      }
    }
    load();
  }, []);

  if (!w) return null;

  const symbol = getSymbol(w.code);
  const anim = getAnimation(w.code);
  const isSun = w.code === 0;

  return (
    <div
      className="hidden sm:flex items-center gap-3 text-white/40 select-none"
      title={`${Math.round(w.temp)}° · ${Math.round(w.wind)}km/h ${windDirLabel(w.windDir)}${w.soilTemp !== undefined ? ` · soil ${Math.round(w.soilTemp)}°` : ""}`}
    >
      {/* Weather symbol with animation */}
      <span
        className={`text-[15px] leading-none ${anim} inline-block`}
        aria-hidden="true"
      >
        {symbol}
      </span>

      {/* Temperature */}
      <span className="font-mono text-[11px] tracking-wide">
        {Math.round(w.temp)}°
      </span>

      {/* Wind — icon + direction arrow + speed */}
      <span className="hidden lg:flex items-center gap-1" aria-label={`Wind ${Math.round(w.wind)}km/h ${windDirLabel(w.windDir)}`}>
        {/* Wind icon: three wavy lines */}
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className="text-white/30 flex-shrink-0" aria-hidden="true">
          <path d="M1 2.5 Q3 1 5 2.5 Q7 4 9 2.5 Q10.5 1.5 11 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <path d="M1 5.5 Q3 4 5 5.5 Q7 7 9 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
          <path d="M1 8.5 Q2.5 7.5 4 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3"/>
        </svg>
        <span
          className="font-mono text-[10px] text-white/30 inline-block"
          style={{ transform: `rotate(${w.windDir}deg)` }}
          aria-hidden="true"
        >↑</span>
        <span className="font-mono text-[10px] text-white/30">
          {Math.round(w.wind)}<span className="text-[8px]">km</span>
        </span>
      </span>

      {/* Soil temp — thermometer icon */}
      {w.soilTemp !== undefined && (
        <span className="hidden xl:flex items-center gap-1" aria-label={`Soil temperature ${Math.round(w.soilTemp)}°C`}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="text-white/30 flex-shrink-0" aria-hidden="true">
            <rect x="2.5" y="0.5" width="3" height="8" rx="1.5" stroke="currentColor" strokeWidth="1"/>
            <circle cx="4" cy="11" r="2.5" stroke="currentColor" strokeWidth="1"/>
            <line x1="4" y1="8.5" x2="4" y2="10" stroke="currentColor" strokeWidth="1"/>
          </svg>
          <span className="font-mono text-[10px] text-white/30">
            {Math.round(w.soilTemp)}°
          </span>
        </span>
      )}
    </div>
  );
}
