"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getMoonPhaseData,
  getSunTimes,
  formatTime,
  formatDaylight,
  type MoonPhaseData,
  type SunTimesData,
} from "@/lib/astronomy";

const STORAGE_KEY = "whattosow_location";

interface LocationData {
  postcode: string;
  latitude: number;
  longitude: number;
  region: string;
  adminDistrict: string;
}

function isValidLocation(data: unknown): data is LocationData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.postcode === "string" &&
    typeof d.latitude === "number" &&
    isFinite(d.latitude) &&
    typeof d.longitude === "number" &&
    isFinite(d.longitude) &&
    typeof d.region === "string" &&
    typeof d.adminDistrict === "string"
  );
}

function loadLocation(): LocationData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isValidLocation(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function MoonSVG({ phase }: { phase: number }) {
  const r = 20;
  const cx = 24;
  const cy = 24;

  let d: string;

  if (phase < 0.01 || phase > 0.99) {
    d = "";
  } else if (Math.abs(phase - 0.5) < 0.01) {
    d = `M ${cx},${cy - r} A ${r},${r} 0 1,1 ${cx},${cy + r} A ${r},${r} 0 1,1 ${cx},${cy - r} Z`;
  } else {
    const waxing = phase < 0.5;
    const lit = phase <= 0.5 ? phase * 2 : (1 - phase) * 2;
    const terminatorRx = Math.abs(1 - lit * 2) * r;
    const terminatorBulge = lit < 0.5;

    const sweepLimb = waxing ? 1 : 0;
    const sweepTerminator = terminatorBulge
      ? (waxing ? 0 : 1)
      : (waxing ? 1 : 0);

    d = [
      `M ${cx},${cy - r}`,
      `A ${r},${r} 0 0,${sweepLimb} ${cx},${cy + r}`,
      `A ${terminatorRx},${r} 0 0,${sweepTerminator} ${cx},${cy - r}`,
      "Z",
    ].join(" ");
  }

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-earth/15"
      />
      {d && (
        <path d={d} fill="currentColor" className="text-amber/40" />
      )}
    </svg>
  );
}

export default function SkyTonight() {
  const [moon, setMoon] = useState<MoonPhaseData | null>(null);
  const [sunTimes, setSunTimes] = useState<SunTimesData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [ready, setReady] = useState(false);

  const load = useCallback(() => {
    const now = new Date();
    setMoon(getMoonPhaseData(now));

    const loc = loadLocation();
    setLocation(loc);

    if (loc) {
      setSunTimes(getSunTimes(now, loc.latitude, loc.longitude));
    } else {
      setSunTimes(null);
    }
  }, []);

  useEffect(() => {
    load();
    setReady(true);

    function handleLocationUpdate() {
      load();
    }
    window.addEventListener("whattosow:location-updated", handleLocationUpdate);
    return () => {
      window.removeEventListener(
        "whattosow:location-updated",
        handleLocationUpdate
      );
    };
  }, [load]);

  if (!ready || !moon) {
    return (
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="border border-earth/6 p-6 sm:p-8 h-32 animate-pulse" />
        <div className="border border-earth/6 p-6 sm:p-8 h-32 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5" aria-live="polite">
      {/* Moon phase card */}
      <div className="border border-earth/6 p-6 sm:p-8 hover:border-earth/15 transition-colors duration-300">
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-earth-lighter block mb-4">
          Moon phase
        </span>
        <div className="flex items-center gap-5">
          <MoonSVG phase={moon.phase} />
          <div>
            <p className="text-lg font-light text-earth tracking-tight">
              {moon.name}
            </p>
            <p className="text-sm text-earth-lighter mt-0.5">
              {Math.round(moon.illumination * 100)}% illuminated
            </p>
          </div>
        </div>
      </div>

      {/* Daylight card */}
      <div className="border border-earth/6 p-6 sm:p-8 hover:border-earth/15 transition-colors duration-300">
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-earth-lighter block mb-4">
          Daylight
        </span>
        {sunTimes && location ? (
          <div>
            <p className="text-lg font-light text-earth tracking-tight">
              Sunset at {formatTime(sunTimes.sunset)}
            </p>
            <p className="text-sm text-earth-lighter mt-0.5">
              {formatDaylight(sunTimes.daylightMinutes)} of daylight today
            </p>
            <p className="text-xs text-earth-lighter/60 mt-2">
              Sunrise {formatTime(sunTimes.sunrise)} / Golden hour{" "}
              {formatTime(sunTimes.goldenHour)} — for {location.adminDistrict}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-earth-lighter leading-relaxed">
              <a
                href="#get-dates"
                className="text-allotment hover:underline font-medium"
              >
                Enter your postcode
              </a>{" "}
              to see today&apos;s sunset and daylight hours for your location.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
