"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getSunTimes,
  formatTime,
  formatDaylight,
  UK_DEFAULT_LAT,
  UK_DEFAULT_LNG,
} from "@/lib/astronomy";
import { loadLocation } from "@/lib/location-storage";

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
