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
      return "bg-emerald-100 text-emerald-800";
    case "half-hardy":
      return "bg-amber-100 text-amber-800";
    case "tender":
      return "bg-rose-100 text-rose-800";
  }
}

function CropCard({ crop, action }: { crop: Crop; action?: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left bg-white rounded-xl border border-stone-200 p-4 hover:border-stone-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-stone-900">{crop.name}</h4>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColor(crop.category)}`}
            >
              {categoryLabel(crop.category)}
            </span>
          </div>
          {action && (
            <p className="text-sm text-green-700 font-medium mt-1">
              {action}
            </p>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-stone-400 transition-transform shrink-0 ${expanded ? "rotate-180" : ""}`}
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
        <div className="mt-3 pt-3 border-t border-stone-100 space-y-2">
          <p className="text-sm text-stone-600">{crop.tip}</p>
          <p className="text-sm text-stone-500">
            <span className="font-medium">Needs:</span> {crop.needs}
          </p>
          <p className="text-sm text-stone-500">
            <span className="font-medium">Spacing:</span> {crop.spacingCm}cm
            apart &middot;{" "}
            <span className="font-medium">Harvest:</span> ~{crop.harvestWeeks}{" "}
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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
          <h3 className="font-semibold text-blue-900">Frost risk ahead</h3>
        </div>
        <div className="space-y-1">
          {riskDays.map((d) => (
            <p key={d.date} className="text-sm text-blue-800">
              {new Date(d.date + "T00:00:00").toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "short",
              })}
              : low of{" "}
              <span className="font-semibold">{d.min}&deg;C</span>
            </p>
          ))}
        </div>
        <p className="text-xs text-blue-600 mt-2">
          Cover tender seedlings or bring pots indoors tonight.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-3 h-3 bg-emerald-500 rounded-full" />
        <h3 className="font-semibold text-emerald-900">No frost expected</h3>
      </div>
      <p className="text-sm text-emerald-700">
        Next 3 nights look clear. Lowest forecast:{" "}
        <span className="font-semibold">
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

    // Fetch forecast in parallel (non-blocking)
    getFrostForecast(location.latitude, location.longitude).then((f) => {
      setForecast(f);
    });

    setLoading(false);

    // Scroll to results on mobile
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
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <label
          htmlFor="postcode"
          className="block text-sm font-medium text-stone-600 mb-2"
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
            className="flex-1 px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-base"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-50 transition-colors text-base whitespace-nowrap"
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
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </form>

      {/* Results */}
      {frostData && cropActions && (
        <div ref={resultsRef} className="mt-10 space-y-6">
          {/* Location + Frost Date */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6">
              <p className="text-sm text-stone-500 mb-1">
                {frostData.location.adminDistrict},{" "}
                {frostData.location.region}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
                {frostData.isSafe ? (
                  <>
                    Frost season is over
                  </>
                ) : (
                  <>
                    <span className="text-green-700">
                      {frostData.daysUntilSafe} days
                    </span>{" "}
                    until it&apos;s safe to plant out
                  </>
                )}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">
                    Last frost date
                  </p>
                  <p className="text-lg font-semibold text-stone-900">
                    {formatDate(frostData.lastFrostDate)}
                  </p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">
                    First autumn frost
                  </p>
                  <p className="text-lg font-semibold text-stone-900">
                    {formatDate(frostData.firstAutumnFrostDate)}
                  </p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">
                    Growing season
                  </p>
                  <p className="text-lg font-semibold text-stone-900">
                    {frostData.growingSeasonDays} days
                  </p>
                </div>
              </div>

              {/* Frost countdown bar */}
              {!frostData.isSafe && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-stone-500 mb-1">
                    <span>Today</span>
                    <span>Safe to plant out</span>
                  </div>
                  <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 via-green-400 to-green-600 rounded-full transition-all duration-1000"
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
              <h3 className="text-xl font-bold text-stone-900 mb-4">
                What to sow this week
              </h3>

              {cropActions.sowIndoorsNow.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-stone-600 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full" />
                    Sow indoors on a windowsill
                  </p>
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
                <div className="mb-4">
                  <p className="text-sm font-semibold text-stone-600 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full" />
                    Sow directly outdoors
                  </p>
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
                <div className="mb-4">
                  <p className="text-sm font-semibold text-stone-600 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                    Plant out (transplant outdoors)
                  </p>
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
              <h3 className="text-xl font-bold text-stone-900 mb-4">
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
          <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-500 space-y-2">
            <p>
              <strong>How this works:</strong> We estimate your local frost
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
