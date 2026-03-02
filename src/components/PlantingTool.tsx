"use client";

import { useState, useRef } from "react";
import {
  lookupPostcode,
  calculateFrostData,
  getFrostForecast,
  formatDate,
  type FrostData,
  type FrostForecast,
} from "@/lib/frost";
import { crops, getCropsByAction, type Crop } from "@/data/crops";
import { SnowflakeIcon, SunIcon, getCropIcon } from "@/components/SVGIllustrations";

function categoryLabel(cat: Crop["category"]): string {
  switch (cat) {
    case "hardy":
      return "Hardy";
    case "half-hardy":
      return "Half-hardy";
    case "tender":
      return "Tender";
  }
}

function categoryColor(cat: Crop["category"]): string {
  switch (cat) {
    case "hardy":
      return "bg-leaf-bg text-allotment";
    case "half-hardy":
      return "bg-amber-light text-earth";
    case "tender":
      return "bg-tomato-light text-tomato";
  }
}

function categoryBorder(cat: Crop["category"]): string {
  switch (cat) {
    case "hardy":
      return "border-l-3 border-leaf bg-leaf-bg/40";
    case "half-hardy":
      return "border-l-3 border-amber bg-amber-bg";
    case "tender":
      return "border-l-3 border-tomato bg-tomato-bg";
  }
}

function CropCard({ crop, action }: { crop: Crop; action?: string }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = getCropIcon(crop.slug);

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={`w-full text-left rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${categoryBorder(crop.category)}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {Icon && <Icon className="w-5 h-5 shrink-0" />}
            <h4 className="font-semibold text-earth">{crop.name}</h4>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColor(crop.category)}`}
            >
              {categoryLabel(crop.category)}
            </span>
          </div>
          {action && (
            <p className="text-sm text-allotment font-medium mt-1">
              {action}
            </p>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-earth-lighter transition-transform shrink-0 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-earth/10 space-y-2">
          <p className="text-sm text-earth-light">{crop.tip}</p>
          <p className="text-sm text-earth-lighter">
            <span className="font-medium text-earth-light">Needs:</span> {crop.needs}
          </p>
          <p className="text-sm text-earth-lighter">
            <span className="font-medium text-earth-light">Spacing:</span> {crop.spacingCm}cm
            apart &middot;{" "}
            <span className="font-medium text-earth-light">Harvest:</span> ~{crop.harvestWeeks}{" "}
            weeks
          </p>
        </div>
      )}
    </button>
  );
}

function FrostRiskBadge({ forecast }: { forecast: FrostForecast }) {
  const hasRisk = forecast.nextThreeDays.some((d) => d.frostRisk);

  if (hasRisk) {
    const riskDays = forecast.nextThreeDays.filter((d) => d.frostRisk);
    return (
      <div className="bg-frost-bg border border-frost/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <SnowflakeIcon className="w-5 h-5 animate-pulse" />
          <h3 className="font-semibold text-earth">Frost risk ahead</h3>
        </div>
        <div className="space-y-1">
          {riskDays.map((d) => (
            <p key={d.date} className="text-sm text-earth-light">
              {new Date(d.date + "T00:00:00").toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "short",
              })}
              : low of{" "}
              <span className="font-semibold text-earth">{d.min}&deg;C</span>
            </p>
          ))}
        </div>
        <p className="text-xs text-earth-lighter mt-2">
          Cover tender seedlings or bring pots indoors tonight.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-allotment-bg border border-leaf/30 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <SunIcon className="w-5 h-5" />
        <h3 className="font-semibold text-allotment">No frost expected</h3>
      </div>
      <p className="text-sm text-earth-light">
        Next 3 nights look clear. Lowest forecast:{" "}
        <span className="font-semibold text-earth">
          {Math.min(...forecast.nextThreeDays.map((d) => d.min))}&deg;C
        </span>
      </p>
    </div>
  );
}

export default function PlantingTool() {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [frostData, setFrostData] = useState<FrostData | null>(null);
  const [forecast, setForecast] = useState<FrostForecast | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFrostData(null);
    setForecast(null);

    const location = await lookupPostcode(postcode);
    if (!location) {
      setError(
        "Couldn't find that postcode. Please check and try again."
      );
      setLoading(false);
      return;
    }

    const data = calculateFrostData(location);
    setFrostData(data);

    getFrostForecast(location.latitude, location.longitude).then((f) => {
      setForecast(f);
    });

    setLoading(false);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  const today = new Date();
  const cropActions = frostData
    ? getCropsByAction(crops, today, frostData.lastFrostDate)
    : null;

  return (
    <div className="w-full">
      {/* Search */}
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto lg:mx-0">
        <label
          htmlFor="postcode"
          className="block text-sm font-medium text-earth-light mb-2"
        >
          Enter your UK postcode
        </label>
        <div className="flex gap-2">
          <input
            id="postcode"
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="e.g. SW1A 1AA"
            className="flex-1 px-4 py-3 rounded-xl border border-earth/15 bg-white text-earth placeholder:text-earth-lighter focus:outline-none focus:ring-2 focus:ring-allotment focus:border-transparent text-base"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-allotment text-white font-semibold rounded-xl hover:bg-allotment-dark focus:outline-none focus:ring-2 focus:ring-allotment focus:ring-offset-2 focus:ring-offset-cream disabled:opacity-50 transition-colors text-base whitespace-nowrap"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Looking up...
              </span>
            ) : (
              "Go"
            )}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-tomato">{error}</p>
        )}
      </form>

      {/* Results */}
      {frostData && cropActions && (
        <div ref={resultsRef} className="mt-10 space-y-6">
          {/* Location + Frost Date — dark allotment card */}
          <div className="bg-allotment-dark rounded-2xl shadow-sm overflow-hidden text-white">
            <div className="p-5 sm:p-6">
              <p className="text-sm text-white/60 mb-1">
                {frostData.location.adminDistrict},{" "}
                {frostData.location.region}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {frostData.isSafe ? (
                  <>
                    Frost season is over
                  </>
                ) : (
                  <>
                    <span className="text-leaf-light">
                      {frostData.daysUntilSafe} days
                    </span>{" "}
                    until it&apos;s safe to plant out
                  </>
                )}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-1">
                    Last frost date
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {formatDate(frostData.lastFrostDate)}
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-1">
                    First autumn frost
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {formatDate(frostData.firstAutumnFrostDate)}
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-1">
                    Growing season
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {frostData.growingSeasonDays} days
                  </p>
                </div>
              </div>

              {/* Frost countdown bar */}
              {!frostData.isSafe && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-white/50 mb-1">
                    <span>Today</span>
                    <span>Safe to plant out</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-frost via-leaf-light to-leaf rounded-full transition-all duration-1000"
                      style={{
                        width: `${Math.max(5, Math.min(95, 100 - (frostData.daysUntilSafe / 90) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Frost Risk */}
          {forecast && <FrostRiskBadge forecast={forecast} />}

          {/* What to sow NOW */}
          {(cropActions.sowIndoorsNow.length > 0 ||
            cropActions.directSowNow.length > 0 ||
            cropActions.plantOutNow.length > 0) && (
            <div>
              <h3 className="text-xl font-bold text-earth mb-4">
                What to sow this week
              </h3>

              {cropActions.sowIndoorsNow.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-6 bg-amber rounded-full" />
                    <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9,22 9,12 15,12 15,22" />
                    </svg>
                    <p className="text-sm font-semibold text-earth">
                      Sow indoors on a windowsill
                    </p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {cropActions.sowIndoorsNow.map((crop) => (
                      <CropCard
                        key={crop.slug + "-indoor"}
                        crop={crop}
                        action="Sow indoors now"
                      />
                    ))}
                  </div>
                </div>
              )}

              {cropActions.directSowNow.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-6 bg-leaf rounded-full" />
                    <svg className="w-5 h-5 text-leaf" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22V8" />
                      <path d="M5 12H2a10 10 0 0020 0h-3" />
                      <path d="M12 8a4 4 0 00-4-4c-1.5 0-2.5 1-3 2" />
                      <path d="M12 8a4 4 0 014-4c1.5 0 2.5 1 3 2" />
                    </svg>
                    <p className="text-sm font-semibold text-earth">
                      Sow directly outdoors
                    </p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {cropActions.directSowNow.map((crop) => (
                      <CropCard
                        key={crop.slug + "-direct"}
                        crop={crop}
                        action="Direct sow outside now"
                      />
                    ))}
                  </div>
                </div>
              )}

              {cropActions.plantOutNow.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-6 bg-allotment rounded-full" />
                    <svg className="w-5 h-5 text-allotment" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22V12" />
                      <path d="M12 12c-3-4-6-5-9-3 3-4 6-4 9-1" />
                      <path d="M12 12c3-4 6-5 9-3-3-4-6-4-9-1" />
                      <path d="M7 22h10" />
                    </svg>
                    <p className="text-sm font-semibold text-earth">
                      Plant out (transplant outdoors)
                    </p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {cropActions.plantOutNow.map((crop) => (
                      <CropCard
                        key={crop.slug + "-plantout"}
                        crop={crop}
                        action="Safe to plant outside now"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Coming Soon */}
          {cropActions.comingSoon.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-earth mb-4">
                Coming up next
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {cropActions.comingSoon.map(({ crop, action, inWeeks }) => (
                  <CropCard
                    key={crop.slug + "-soon"}
                    crop={crop}
                    action={`${action} in ~${inWeeks} week${inWeeks === 1 ? "" : "s"}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-allotment-bg rounded-xl p-4 text-sm text-earth-light space-y-2">
            <p>
              <strong className="text-earth">How this works:</strong> We estimate your local frost
              dates based on your location&apos;s latitude and proximity to the
              coast, calibrated against Met Office climate data. Planting
              recommendations are personalised to your frost date.
            </p>
            <p>
              Frost dates are averages — in any given year, the actual last
              frost could be 1-2 weeks earlier or later. When in doubt, check
              your local forecast and wait for settled weather before planting
              tender crops outside.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
