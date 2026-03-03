"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getSunTimes,
  formatTime,
  formatDaylight,
  UK_DEFAULT_LAT,
  UK_DEFAULT_LNG,
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

export default function MonthDaylight({
  monthIndex,
}: {
  monthIndex: number;
}) {
  const [sunset, setSunset] = useState<string | null>(null);
  const [daylight, setDaylight] = useState<string | null>(null);
  const [locationLabel, setLocationLabel] = useState<string>("UK average (52\u00B0N)");
  const [ready, setReady] = useState(false);

  const calculate = useCallback(() => {
    // Use the 15th of the month for a representative date
    const year = new Date().getFullYear();
    const midMonth = new Date(year, monthIndex, 15);

    const loc = loadLocation();
    const lat = loc ? loc.latitude : UK_DEFAULT_LAT;
    const lng = loc ? loc.longitude : UK_DEFAULT_LNG;

    const times = getSunTimes(midMonth, lat, lng);
    setSunset(formatTime(times.sunset));
    setDaylight(formatDaylight(times.daylightMinutes));
    setLocationLabel(loc ? `for ${loc.adminDistrict}` : "UK average (52\u00B0N)");
  }, [monthIndex]);

  useEffect(() => {
    calculate();
    setReady(true);

    function handleLocationUpdate() {
      calculate();
    }
    window.addEventListener("whattosow:location-updated", handleLocationUpdate);
    return () => {
      window.removeEventListener(
        "whattosow:location-updated",
        handleLocationUpdate
      );
    };
  }, [calculate]);

  if (!ready || !sunset) return null;

  return (
    <p className="text-sm text-earth-lighter mt-4" aria-live="polite">
      Sunset ~{sunset} | Daylight ~{daylight}{" "}
      <span className="text-earth-lighter/60">— {locationLabel}</span>
    </p>
  );
}
