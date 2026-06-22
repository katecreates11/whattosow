"use client";

import { useEffect, useState } from "react";
import { loadLocation } from "@/lib/location-storage";
import { getSunTimes, formatDaylight, UK_DEFAULT_LAT, UK_DEFAULT_LNG } from "@/lib/astronomy";
import { summerSolstice, winterSolstice } from "@/lib/solstice";

/**
 * The swing of the year — today's longest day against December's shortest, at
 * the visitor's postcode. The emotional payoff of the calculation: this is the
 * very top of the light. The gap is dramatic and deeply local (≈8h in Cornwall,
 * ≈12h in Shetland). Bars grow on mount; frozen full for reduced motion.
 */
export default function DaylightSwing() {
  const [v, setV] = useState<{ place: string | null; longest: number; shortest: number } | null>(null);
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    const update = () => {
      const loc = loadLocation();
      const lat = loc?.latitude ?? UK_DEFAULT_LAT;
      const lng = loc?.longitude ?? UK_DEFAULT_LNG;
      setV({
        place: loc?.adminDistrict ?? null,
        longest: getSunTimes(summerSolstice(), lat, lng).daylightMinutes,
        shortest: getSunTimes(winterSolstice(), lat, lng).daylightMinutes,
      });
    };
    update();
    const id = requestAnimationFrame(() => setGrown(true));
    window.addEventListener("whattosow:location-updated", update);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("whattosow:location-updated", update);
    };
  }, []);

  if (!v) return null;
  const shortPct = Math.max(8, Math.round((v.shortest / v.longest) * 100));
  const swing = formatDaylight(v.longest - v.shortest);

  return (
    <div className="border border-earth/12 bg-cream p-6 sm:p-8">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment block mb-3">
        The swing of the year
      </span>
      <p className="text-earth-light leading-relaxed mb-6 max-w-[58ch]">
        Today {v.place ? <span className="text-earth font-medium">{v.place}</span> : "the middle of the country"} gets{" "}
        <span className="text-earth font-medium">{formatDaylight(v.longest)}</span>. On the shortest day in
        December, the same spot gets just <span className="text-earth font-medium">{formatDaylight(v.shortest)}</span>{" "}
        &mdash; a difference of <span className="text-earth font-medium">{swing}</span>. This is the very top
        of the light.
      </p>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-sm text-earth font-medium">Longest day</span>
          <div className="flex-1 h-7 bg-earth/5 relative overflow-hidden">
            <div
              className="h-full bg-amber transition-all duration-[1200ms] ease-out motion-reduce:transition-none"
              style={{ width: grown ? "100%" : "0%" }}
            />
          </div>
          <span className="w-16 shrink-0 text-right font-mono text-[12px] text-earth">{formatDaylight(v.longest)}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-sm text-earth-light">Shortest day</span>
          <div className="flex-1 h-7 bg-earth/5 relative overflow-hidden">
            <div
              className="h-full bg-amber/45 transition-all duration-[1200ms] ease-out motion-reduce:transition-none"
              style={{ width: grown ? `${shortPct}%` : "0%" }}
            />
          </div>
          <span className="w-16 shrink-0 text-right font-mono text-[12px] text-earth-light">{formatDaylight(v.shortest)}</span>
        </div>
      </div>
    </div>
  );
}
