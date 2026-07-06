"use client";

import { useState, useEffect, useCallback } from "react";
import { calculateLastFrostDate, formatDateShort, type LocationData } from "@/lib/frost";
import type { Crop } from "@/data/crops";
import { loadLocation } from "@/lib/location-storage";

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

const dotColors: Record<string, string> = {
  "Sow indoors": "bg-amber",
  "Direct sow outdoors": "bg-leaf",
  "Plant out": "bg-allotment",
  "Harvest": "bg-earth-lighter",
};

function ukAverageFrostDate(): Date {
  return new Date(new Date().getFullYear(), 3, 15);
}

function DateCard({
  label,
  weeks,
  frostDate,
  location,
  subtitle,
}: {
  label: string;
  weeks: number;
  frostDate: Date | null;
  location: LocationData | null;
  subtitle: string;
}) {
  const hasPersonalised = frostDate && location;
  const targetDate = frostDate ? weeksToDate(frostDate, weeks) : null;

  return (
    <div className="border border-earth/6 p-5 hover:border-earth/15 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[label] || "bg-earth-lighter"}`} />
        <p className="text-xs font-semibold text-earth-lighter uppercase tracking-[0.1em]">
          {label}
        </p>
      </div>
      {targetDate ? (
        <>
          <p className="text-lg font-semibold text-earth mt-2">
            From around {formatDateShort(targetDate)}
          </p>
          <p className="text-xs text-earth-lighter mt-1">
            {hasPersonalised
              ? `${weeksToText(weeks)} (${formatDateShort(frostDate)})`
              : `${weeksToText(weeks)} on the UK average`}
          </p>
        </>
      ) : (
        <p className="text-lg font-semibold text-earth mt-2">
          {weeksToText(weeks)}
        </p>
      )}
      <p className="text-sm text-earth-lighter mt-1 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

export default function PersonalisedCropDates({ crop }: { crop: Crop }) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [frostDate, setFrostDate] = useState<Date>(ukAverageFrostDate);

  const loadFromStorage = useCallback(() => {
    const loc = loadLocation();
    if (loc) {
      setLocation(loc);
      setFrostDate(calculateLastFrostDate(loc.latitude, loc.longitude));
    } else {
      setLocation(null);
      setFrostDate(ukAverageFrostDate());
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(loadFromStorage, 0);

    // Listen for postcode updates from PlantingTool
    function handleLocationUpdate() {
      loadFromStorage();
    }
    window.addEventListener("whattosow:location-updated", handleLocationUpdate);
    return () => {
      window.clearTimeout(initialLoad);
      window.removeEventListener("whattosow:location-updated", handleLocationUpdate);
    };
  }, [loadFromStorage]);

  return (
    <div className="space-y-5" aria-live="polite">
      {/* Personalisation banner */}
      {location ? (
        <div className="flex items-center gap-2 text-xs text-allotment border border-allotment/15 px-4 py-2.5">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>
            Dates personalised for <strong>{location.adminDistrict}</strong> (last frost: {frostDate ? formatDateShort(frostDate) : "..."})
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-earth-lighter border border-earth/6 px-4 py-2.5">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <span>
            Using the UK-average guide. <a href="#get-dates" className="text-allotment hover:underline font-medium focus-visible:outline-2 focus-visible:outline-allotment focus-visible:outline-offset-2">Enter your postcode below</a> to tune these dates to your patch.
          </span>
        </div>
      )}

      {/* Date cards */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        {crop.sowIndoorsWeeks !== null && (
          <DateCard
            label="Sow indoors"
            weeks={crop.sowIndoorsWeeks}
            frostDate={frostDate}
            location={location}
            subtitle="Use a warm windowsill or propagator"
          />
        )}

        {crop.directSowWeeks !== null && (
          <DateCard
            label="Direct sow outdoors"
            weeks={crop.directSowWeeks}
            frostDate={frostDate}
            location={location}
            subtitle="Sow directly into prepared soil"
          />
        )}

        {crop.plantOutWeeks !== null && (
          <DateCard
            label="Plant out"
            weeks={crop.plantOutWeeks}
            frostDate={frostDate}
            location={location}
            subtitle="Transplant seedlings to their final position"
          />
        )}

        <div className="border border-earth/6 p-5 hover:border-earth/15 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-earth-lighter" />
            <p className="text-xs font-semibold text-earth-lighter uppercase tracking-[0.1em]">
              Harvest
            </p>
          </div>
          {frostDate && crop.sowIndoorsWeeks !== null ? (
            <>
              <p className="text-lg font-semibold text-earth mt-2">
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
              <p className="text-lg font-semibold text-earth mt-2">
                From around {formatDateShort(
                  weeksToDate(frostDate, crop.directSowWeeks + crop.harvestWeeks)
                )}
              </p>
              <p className="text-xs text-earth-lighter mt-1">
                ~{crop.harvestWeeks} weeks from sowing
              </p>
            </>
          ) : (
            <p className="text-lg font-semibold text-earth mt-2">
              ~{crop.harvestWeeks} weeks from sowing
            </p>
          )}
          <p className="text-sm text-earth-lighter mt-1 leading-relaxed">
            Space plants {crop.spacingCm}cm apart
          </p>
        </div>
      </div>
    </div>
  );
}
