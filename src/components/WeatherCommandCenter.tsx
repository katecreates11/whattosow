"use client";

import { useEffect, useState } from "react";
import { loadLocation } from "@/lib/location-storage";
import { getMoonPhaseData, getSunTimes, formatTime, formatDaylight } from "@/lib/astronomy";

interface WX {
  temp: number;
  code: number;
  wind: number;
  windDir: number;
  soil: number | null;
}

interface Sky {
  sunset: string;
  daylight: string;
}

function windDir(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

function weatherLine(temp: number, code: number, sunset: string): string {
  const raining = code >= 51 && code <= 82;
  const stormy = code >= 95;
  let lead: string;
  if (stormy) lead = "Wind and weather about — stake anything tall before you leave.";
  else if (raining) lead = "Rain about, so the slugs will be out — go early and check everything.";
  else if (temp >= 24) lead = "The soil is baking. Water at the roots, not the leaves.";
  else if (temp >= 18) lead = "The ground is properly warm now — this is what the tender crops have waited for.";
  else if (temp >= 12) lead = "Mild enough that nothing will panic. Good planting weather.";
  else if (temp >= 6) lead = "Still on the cool side; give anything tender another week.";
  else lead = "Too cold for anything tender — keep the seedlings in.";
  return `${lead} You have light until ${sunset}.`;
}

/** A small, phase-accurate moon, drawn (no emoji), in amber. */
function MoonGlyph({ phase }: { phase: number }) {
  const r = 13;
  const cx = 16;
  const cy = 16;
  let d = "";
  if (Math.abs(phase - 0.5) < 0.01) {
    d = `M ${cx},${cy - r} A ${r},${r} 0 1,1 ${cx},${cy + r} A ${r},${r} 0 1,1 ${cx},${cy - r} Z`;
  } else if (phase >= 0.01 && phase <= 0.99) {
    const waxing = phase < 0.5;
    const lit = phase <= 0.5 ? phase * 2 : (1 - phase) * 2;
    const termRx = Math.abs(1 - lit * 2) * r;
    const bulge = lit < 0.5;
    const sweepLimb = waxing ? 1 : 0;
    const sweepTerm = bulge ? (waxing ? 0 : 1) : waxing ? 1 : 0;
    d = [
      `M ${cx},${cy - r}`,
      `A ${r},${r} 0 0,${sweepLimb} ${cx},${cy + r}`,
      `A ${termRx},${r} 0 0,${sweepTerm} ${cx},${cy - r}`,
      "Z",
    ].join(" ");
  }
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth="1" className="text-earth/20" />
      {d && <path d={d} className="text-amber" fill="currentColor" />}
    </svg>
  );
}

export default function WeatherCommandCenter() {
  const [wx, setWx] = useState<WX | null>(null);
  const [sky, setSky] = useState<Sky | null>(null);
  const moon = getMoonPhaseData();

  useEffect(() => {
    const loc = loadLocation();
    const lat = loc?.latitude ?? 52.48;
    const lng = loc?.longitude ?? -1.89;

    const sun = getSunTimes(new Date(), lat, lng);
    setSky({ sunset: formatTime(sun.sunset), daylight: formatDaylight(sun.daylightMinutes) });

    (async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,soil_temperature_0cm&timezone=Europe/London`
        );
        if (!res.ok) return;
        const c = (await res.json()).current;
        setWx({
          temp: c.temperature_2m,
          code: c.weather_code,
          wind: c.wind_speed_10m,
          windDir: c.wind_direction_10m,
          soil: typeof c.soil_temperature_0cm === "number" ? c.soil_temperature_0cm : null,
        });
      } catch {
        /* silent — section degrades to sun/moon only */
      }
    })();
  }, []);

  return (
    <div className="border-y border-earth/15 py-7 sm:py-8" aria-live="polite">
      <p className="font-serif italic text-earth text-xl sm:text-2xl md:text-[28px] leading-snug max-w-[34ch]">
        {wx && sky
          ? weatherLine(wx.temp, wx.code, sky.sunset)
          : "Reading the sky over your patch…"}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-earth-light">
        {wx && (
          <span>
            <b className="font-serif not-italic font-normal text-[28px] align-[-6px] mr-1 text-earth">
              {Math.round(wx.temp)}&deg;
            </b>{" "}
            right now
          </span>
        )}
        {wx?.soil != null && (
          <span>
            <b className="font-serif not-italic font-normal text-[28px] align-[-6px] mr-1 text-allotment">
              {Math.round(wx.soil)}&deg;
            </b>{" "}
            soil
          </span>
        )}
        {wx && <span>{windDir(wx.windDir)} {Math.round(wx.wind)} mph</span>}
        {sky && <span>sunset {sky.sunset}</span>}
        {sky && <span>{sky.daylight} daylight</span>}
        <span className="inline-flex items-center gap-2 text-allotment">
          <MoonGlyph phase={moon.phase} /> {moon.name.toLowerCase()} &middot; {Math.round(moon.illumination * 100)}%
        </span>
      </div>
    </div>
  );
}
