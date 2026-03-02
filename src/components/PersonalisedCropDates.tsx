"use client";

import { useState, useEffect, useCallback } from "react";
import { calculateLastFrostDate, formatDateShort } from "@/lib/frost";
import type { Crop } from "@/data/crops";

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
    typeof d.latitude === "number" && isFinite(d.latitude) &&
    typeof d.longitude === "number" && isFinite(d.longitude) &&
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

function weeksToDate(frostDate: Date, weeks: number): Date {
  const d = new Date(frostDate);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

function weeksToText(weeks: number): string {
  const absWeeks = Math.abs(weeks);
  const weekText = absWeeks === 1 ? "week" : "weeks";
  if (weeks < 0) return `${absWeeks} ${weekText} before last frost`;
  if (weeks === 0) return "around your last frost date";
  return `${absWeeks} ${weekText} after last frost`;
}

function DateCard({
  label,
  weeks,
  frostDate,
  location,
  subtitle,
  bgClass,
  borderClass,
}: {
  label: string;
  weeks: number;
  frostDate: Date | null;
  location: LocationData | null;
  subtitle: string;
  bgClass: string;
  borderClass: string;
}) {
  const hasPersonalised = frostDate && location;
  const targetDate = frostDate ? weeksToDate(frostDate, weeks) : null;

  return (
    <div className={`${bgClass} rounded-xl p-5 ${borderClass}`}>
      <p className="text-xs font-medium text-earth-lighter uppercase tracking-wide mb-1">
        {label}
      </p>
      {hasPersonalised && targetDate ? (
        <>
          <p className="text-lg font-semibold text-earth">
            From around {formatDateShort(targetDate)}
          </p>
          <p className="text-xs text-earth-lighter mt-1">
            {weeksToText(weeks)} ({formatDateShort(frostDate)})
          </p>
        </>
      ) : (
        <>
          <p className="text-lg font-semibold text-earth">
            {weeksToText(weeks)}
          </p>
        </>
      )}
      <p className="text-sm text-earth-lighter mt-1">
        {subtitle}
      </p>
    </div>
  );
}

export default function PersonalisedCropDates({ crop }: { crop: Crop }) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [frostDate, setFrostDate] = useState<Date | null>(null);
  const [ready, setReady] = useState(false);

  const loadFromStorage = useCallback(() => {
    const loc = loadLocation();
    if (loc) {
      setLocation(loc);
      setFrostDate(calculateLastFrostDate(loc.latitude, loc.longitude));
    }
  }, []);

  useEffect(() => {
    loadFromStorage();
    setReady(true);

    // Listen for postcode updates from PlantingTool
    function handleLocationUpdate() {
      loadFromStorage();
    }
    window.addEventListener("whattosow:location-updated", handleLocationUpdate);
    return () => {
      window.removeEventListener("whattosow:location-updated", handleLocationUpdate);
    };
  }, [loadFromStorage]);

  // Skeleton while loading
  if (!ready) {
    return (
      <div className="grid sm:grid-cols-2 gap-4 my-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-cream/50 rounded-xl p-5 h-28 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="my-8 space-y-4">
      {/* Personalisation banner */}
      {location ? (
        <div className="flex items-center gap-2 text-xs text-allotment bg-allotment-bg rounded-lg px-3 py-2">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>
            Dates personalised for <strong>{location.adminDistrict}</strong> (last frost: {frostDate ? formatDateShort(frostDate) : "..."})
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-earth-lighter bg-cream rounded-lg px-3 py-2">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <span>
            <a href="#get-dates" className="text-allotment hover:underline font-medium">Enter your postcode below</a> to see personalised planting dates
          </span>
        </div>
      )}

      {/* Date cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {crop.sowIndoorsWeeks !== null && (
          <DateCard
            label="Sow indoors"
            weeks={crop.sowIndoorsWeeks}
            frostDate={frostDate}
            location={location}
            subtitle="Use a warm windowsill or propagator"
            bgClass="bg-amber-bg"
            borderClass="border-l-[3px] border-amber"
          />
        )}

        {crop.directSowWeeks !== null && (
          <DateCard
            label="Direct sow outdoors"
            weeks={crop.directSowWeeks}
            frostDate={frostDate}
            location={location}
            subtitle="Sow directly into prepared soil"
            bgClass="bg-allotment-bg"
            borderClass="border-l-[3px] border-leaf"
          />
        )}

        {crop.plantOutWeeks !== null && (
          <DateCard
            label="Plant out"
            weeks={crop.plantOutWeeks}
            frostDate={frostDate}
            location={location}
            subtitle="Transplant seedlings to their final position"
            bgClass="bg-leaf-bg"
            borderClass="border-l-[3px] border-allotment"
          />
        )}

        <div className="bg-cream rounded-xl p-5 border-l-[3px] border-earth-lighter">
          <p className="text-xs font-medium text-earth-lighter uppercase tracking-wide mb-1">
            Harvest
          </p>
          {frostDate && crop.sowIndoorsWeeks !== null ? (
            <>
              <p className="text-lg font-semibold text-earth">
                From around {formatDateShort(
                  weeksToDate(frostDate, crop.sowIndoorsWeeks + crop.harvestWeeks)
                )}
              </p>
              <p className="text-xs text-earth-lighter mt-1">
                ~{crop.harvestWeeks} weeks from sowing
              </p>
            </>
          ) : frostDate && crop.directSowWeeks !== null ? (
            <>
              <p className="text-lg font-semibold text-earth">
                From around {formatDateShort(
                  weeksToDate(frostDate, crop.directSowWeeks + crop.harvestWeeks)
                )}
              </p>
              <p className="text-xs text-earth-lighter mt-1">
                ~{crop.harvestWeeks} weeks from sowing
              </p>
            </>
          ) : (
            <p className="text-lg font-semibold text-earth">
              ~{crop.harvestWeeks} weeks from sowing
            </p>
          )}
          <p className="text-sm text-earth-lighter mt-1">
            Space plants {crop.spacingCm}cm apart
          </p>
        </div>
      </div>
    </div>
  );
}
