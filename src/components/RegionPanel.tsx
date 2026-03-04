"use client";

import { useState, useEffect } from "react";
import { getFrostForecast, calculateLastFrostDate, calculateFirstAutumnFrostDate } from "@/lib/frost";
import { crops, getCropsByAction } from "@/data/crops";
import type { FrostForecast } from "@/lib/frost";

interface FrostProperties {
  LAD24NM?: string;
  LAD23NM?: string;
  frostDayOfYear: number;
  frostDate: string;
  autumnFrostDayOfYear?: number;
  autumnFrostDate?: string;
  growingSeasonDays?: number;
  centroidLat?: number;
  centroidLng?: number;
  [key: string]: unknown;
}

interface RegionPanelProps {
  region: FrostProperties;
  onClose: () => void;
}

// UK growing season range for the bar visualisation
const UK_SEASON_MIN = 86;
const UK_SEASON_MAX = 207;
const UK_SEASON_AVG = 155;

function categoryColor(cat: string): string {
  switch (cat) {
    case "hardy": return "bg-allotment/15 text-allotment";
    case "half-hardy": return "bg-amber/15 text-amber";
    case "tender": return "bg-tomato/15 text-tomato";
    default: return "bg-earth/10 text-earth";
  }
}

export default function RegionPanel({ region, onClose }: RegionPanelProps) {
  const [forecast, setForecast] = useState<FrostForecast | null>(null);
  const [loadingForecast, setLoadingForecast] = useState(false);

  const name = region.LAD24NM || region.LAD23NM || "Unknown area";
  const springFrost = region.frostDate;
  const autumnFrost = region.autumnFrostDate || "—";
  const seasonDays = region.growingSeasonDays ?? null;

  // Compute frost date as Date object for crop lookup
  const year = new Date().getFullYear();
  const frostDate = new Date(year, 0);
  frostDate.setDate(region.frostDayOfYear);

  const today = new Date();
  const cropActions = getCropsByAction(crops, today, frostDate);

  // Fetch live conditions
  useEffect(() => {
    const lat = region.centroidLat;
    const lng = region.centroidLng;
    if (lat == null || lng == null) return;

    setLoadingForecast(true);
    getFrostForecast(lat, lng).then((data) => {
      setForecast(data);
      setLoadingForecast(false);
    });
  }, [region.centroidLat, region.centroidLng]);

  // Growing season bar position
  const seasonPercent = seasonDays != null
    ? Math.max(0, Math.min(100, ((seasonDays - UK_SEASON_MIN) / (UK_SEASON_MAX - UK_SEASON_MIN)) * 100))
    : null;
  const avgPercent = ((UK_SEASON_AVG - UK_SEASON_MIN) / (UK_SEASON_MAX - UK_SEASON_MIN)) * 100;

  const sowNow = [...cropActions.sowIndoorsNow, ...cropActions.directSowNow, ...cropActions.plantOutNow];
  const comingSoon = cropActions.comingSoon.slice(0, 6);

  return (
    <div className="bg-white rounded-2xl border border-earth/10 shadow-lg overflow-hidden animate-slide-in-bottom sm:animate-slide-in-right">
      {/* Header */}
      <div className="bg-allotment px-5 py-4 flex items-center justify-between">
        <h3 className="text-white font-semibold text-lg">{name}</h3>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Close panel"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Three stat cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-leaf-bg rounded-xl p-3">
            <p className="text-[10px] font-medium text-earth-lighter uppercase tracking-wide mb-1">Last spring frost</p>
            <p className="text-sm font-semibold text-earth">{springFrost}</p>
          </div>
          <div className="bg-amber-bg rounded-xl p-3">
            <p className="text-[10px] font-medium text-earth-lighter uppercase tracking-wide mb-1">First autumn frost</p>
            <p className="text-sm font-semibold text-earth">{autumnFrost}</p>
          </div>
          <div className="bg-frost-bg rounded-xl p-3">
            <p className="text-[10px] font-medium text-earth-lighter uppercase tracking-wide mb-1">Growing season</p>
            <p className="text-sm font-semibold text-earth">{seasonDays ?? "—"} days</p>
          </div>
        </div>

        {/* Growing season bar */}
        {seasonPercent != null && (
          <div>
            <p className="text-xs font-medium text-earth mb-2">Growing season vs UK range</p>
            <div className="relative">
              <div className="h-3 bg-earth/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-frost via-leaf-light to-leaf rounded-full transition-all duration-700"
                  style={{ width: `${seasonPercent}%` }}
                />
              </div>
              {/* UK average marker */}
              <div
                className="absolute top-0 h-3 w-0.5 bg-earth/40"
                style={{ left: `${avgPercent}%` }}
                title="UK average"
              />
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-earth-lighter">
              <span>{UK_SEASON_MIN} days</span>
              <span className="text-earth/50">UK avg ~{UK_SEASON_AVG}</span>
              <span>{UK_SEASON_MAX} days</span>
            </div>
          </div>
        )}

        {/* Crop recommendations */}
        <div>
          <p className="text-xs font-medium text-earth mb-2">
            {sowNow.length > 0 ? "Sow now in this region" : "Nothing to sow right now"}
          </p>
          {sowNow.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {sowNow.slice(0, 12).map((crop) => (
                <span
                  key={crop.slug}
                  className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${categoryColor(crop.category)}`}
                >
                  {crop.name}
                </span>
              ))}
              {sowNow.length > 12 && (
                <span className="text-xs text-earth-lighter px-2 py-1">+{sowNow.length - 12} more</span>
              )}
            </div>
          )}
          {comingSoon.length > 0 && (
            <div className="mt-3">
              <p className="text-[11px] text-earth-lighter mb-1">Coming soon</p>
              <div className="text-xs text-earth-light space-y-0.5">
                {comingSoon.map((item, i) => (
                  <p key={i}>
                    {item.action} <span className="font-medium">{item.crop.name}</span>{" "}
                    <span className="text-earth-lighter">in ~{item.inWeeks}w</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live conditions */}
        <div>
          <p className="text-xs font-medium text-earth mb-2">Live conditions</p>
          {loadingForecast ? (
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-earth/5 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : forecast ? (
            <div className="grid grid-cols-2 gap-2">
              {/* Soil temp */}
              {(forecast.soilTemp6cm !== undefined || forecast.soilTemp !== undefined) && (
                <div className="bg-amber-bg rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 4v10.54a4 4 0 11-4 0V4a2 2 0 014 0z" />
                    </svg>
                    <p className="text-[10px] font-medium text-earth-lighter uppercase tracking-wide">Soil temp</p>
                  </div>
                  <p className="text-lg font-bold text-earth">
                    {forecast.soilTemp6cm ?? forecast.soilTemp}&deg;C
                  </p>
                </div>
              )}

              {/* Wind */}
              {forecast.windMax !== undefined && (
                <div className="bg-allotment-bg rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5 text-allotment" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
                    </svg>
                    <p className="text-[10px] font-medium text-earth-lighter uppercase tracking-wide">Wind</p>
                  </div>
                  <p className="text-lg font-bold text-earth">{forecast.windMax} km/h</p>
                </div>
              )}

              {/* Sunshine */}
              {forecast.sunshineDuration !== undefined && (
                <div className="bg-amber-bg rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                    <p className="text-[10px] font-medium text-earth-lighter uppercase tracking-wide">Sunshine</p>
                  </div>
                  <p className="text-lg font-bold text-earth">{forecast.sunshineDuration} hrs</p>
                </div>
              )}

              {/* Rainfall */}
              {forecast.rainfall3Days !== undefined && (
                <div className="bg-frost-bg rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5 text-frost" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                    </svg>
                    <p className="text-[10px] font-medium text-earth-lighter uppercase tracking-wide">Rain (3d)</p>
                  </div>
                  <p className="text-lg font-bold text-earth">{forecast.rainfall3Days}mm</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-earth-lighter italic">Live conditions unavailable for this region.</p>
          )}
        </div>
      </div>
    </div>
  );
}
