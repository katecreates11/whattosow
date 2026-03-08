"use client";

import { useState, useEffect, useCallback } from "react";
import { crops } from "@/data/crops";
import { type Crop } from "@/data/crops";
import {
  lookupPostcode,
  calculateLastFrostDate,
  calculateFirstAutumnFrostDate,
  formatDate,
  type LocationData,
} from "@/lib/frost";
import { getAvgFrostDate } from "@/lib/calendar";
import {
  calculateHarvest,
  getValidMethods,
  type HarvestEntry,
  type SowingMethod,
} from "@/lib/harvest";
import { fetchWeekWeatherProfile, type WeekWeatherProfile } from "@/lib/weather-history";
import { generateHarvestAdvice, type HarvestWeatherAdvice } from "@/lib/harvest-weather";
import { generateICS, downloadICS } from "@/lib/calendar-export";
import CropCombobox from "@/components/CropCombobox";
import HarvestCard from "@/components/HarvestCard";

const STORAGE_KEY = "whattosow_location";

function loadLocation(): LocationData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveLocation(location: LocationData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
    window.dispatchEvent(new Event("whattosow:location-updated"));
  } catch {
    // localStorage unavailable
  }
}

function todayString(): string {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function nearestWeekend(date: Date): { saturday: Date; sunday: Date } {
  const day = date.getDay();
  const satOffset = (6 - day + 7) % 7 || 7; // days until next Saturday
  const satBefore = satOffset - 7; // days since last Saturday
  // Pick whichever Saturday is closer
  const closerOffset = Math.abs(satBefore) <= satOffset ? satBefore : satOffset;
  const saturday = new Date(date.getTime() + closerOffset * 24 * 60 * 60 * 1000);
  const sunday = new Date(saturday.getTime() + 24 * 60 * 60 * 1000);
  return { saturday, sunday };
}

function fmtDay(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function fmtDayShort(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function HarvestPlanner() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [postcodeInput, setPostcodeInput] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [postcodeLoading, setPostcodeLoading] = useState(false);
  const [editingPostcode, setEditingPostcode] = useState(false);
  const [ready, setReady] = useState(false);

  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [method, setMethod] = useState<SowingMethod>("outdoors");
  const [dateStr, setDateStr] = useState(todayString());

  const [entries, setEntries] = useState<HarvestEntry[]>([]);

  // Weather state
  const [weatherProfile, setWeatherProfile] = useState<WeekWeatherProfile | null>(null);
  const [weatherAdvice, setWeatherAdvice] = useState<HarvestWeatherAdvice | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const loadLoc = useCallback(() => {
    const loc = loadLocation();
    if (loc) setLocation(loc);
    setReady(true);
  }, []);

  useEffect(() => {
    loadLoc();
    window.addEventListener("whattosow:location-updated", loadLoc);
    return () => window.removeEventListener("whattosow:location-updated", loadLoc);
  }, [loadLoc]);

  const lastFrostDate = location
    ? calculateLastFrostDate(location.latitude, location.longitude)
    : getAvgFrostDate();

  const firstAutumnFrostDate = location
    ? calculateFirstAutumnFrostDate(location.latitude, location.longitude)
    : new Date(new Date().getFullYear(), 9, 20); // Oct 20 default

  async function handlePostcodeLookup() {
    if (!postcodeInput.trim()) return;
    setPostcodeLoading(true);
    setPostcodeError("");
    const result = await lookupPostcode(postcodeInput);
    setPostcodeLoading(false);
    if (typeof result === "string") {
      setPostcodeError(result === "invalid" ? "That doesn't look like a valid UK postcode." : "Network error — try again.");
    } else {
      setLocation(result);
      saveLocation(result);
      setEditingPostcode(false);
    }
  }

  const validMethods = selectedCrop ? getValidMethods(selectedCrop) : [];

  useEffect(() => {
    if (!selectedCrop) return;
    const methods = getValidMethods(selectedCrop);
    const current = methods.find((m) => m.method === method);
    if (current?.disabled) {
      const first = methods.find((m) => !m.disabled);
      if (first) setMethod(first.method);
    }
  }, [selectedCrop, method]);

  function handleAdd() {
    if (!selectedCrop || !dateStr) return;
    const sowDate = new Date(dateStr + "T12:00:00");
    const entry = calculateHarvest(selectedCrop, method, sowDate, lastFrostDate);
    setEntries((prev) => [...prev, entry]);
    setSelectedCrop(null);
    setDateStr(todayString());
  }

  function handleRemove(index: number) {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }

  // Find the best harvest day
  function getHarvestDayRecommendation() {
    if (entries.length < 2) return null;

    const harvestDates = entries.map((e) => ({
      name: e.crop.name,
      date: e.harvestDate,
      time: e.harvestDate.getTime(),
    }));

    const sorted = [...harvestDates].sort((a, b) => a.time - b.time);

    const WINDOW = 21 * 24 * 60 * 60 * 1000;
    let bestDate = sorted[0];
    let bestCount = 0;
    let bestCrops: string[] = [];
    let bestEntries: HarvestEntry[] = [];

    for (const target of sorted) {
      const nearby = sorted.filter(
        (d) => Math.abs(d.time - target.time) <= WINDOW
      );
      if (nearby.length > bestCount) {
        bestCount = nearby.length;
        bestCrops = nearby.map((d) => d.name);
        const midTime =
          nearby.reduce((sum, d) => sum + d.time, 0) / nearby.length;
        bestDate = { ...target, date: new Date(midTime), time: midTime };
        bestEntries = entries.filter((e) =>
          nearby.some((n) => n.name === e.crop.name)
        );
      }
    }

    if (bestCount < 2) return null;

    const weekend = nearestWeekend(bestDate.date);

    return {
      date: bestDate.date,
      weekend,
      crops: bestCrops,
      entries: bestEntries,
      count: bestCount,
      total: entries.length,
    };
  }

  const harvestDay = getHarvestDayRecommendation();

  // Fetch weather when we have a harvest day and location
  useEffect(() => {
    if (!harvestDay || !location) {
      setWeatherProfile(null);
      setWeatherAdvice(null);
      return;
    }

    let cancelled = false;
    setWeatherLoading(true);

    fetchWeekWeatherProfile(
      location.latitude,
      location.longitude,
      harvestDay.date
    ).then((profile) => {
      if (cancelled) return;
      setWeatherProfile(profile);
      setWeatherLoading(false);

      if (profile) {
        const advice = generateHarvestAdvice(
          harvestDay.entries,
          profile,
          location.latitude,
          harvestDay.date,
          firstAutumnFrostDate
        );
        setWeatherAdvice(advice);
      }
    }).catch(() => {
      if (!cancelled) setWeatherLoading(false);
    });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // Re-fetch when entries change or location changes
    entries.length,
    location?.postcode,
    harvestDay?.date.getTime(),
  ]);

  // Calendar download handler
  function handleCalendarDownload() {
    if (!harvestDay) return;
    const weatherNote = weatherAdvice
      ? `${weatherAdvice.summary}\n\nHistorical weather for this week: ${weatherAdvice.tempHigh}°C high, ${weatherAdvice.rainMm}mm rain, ${weatherAdvice.sunshineHours}hrs sunshine.${weatherAdvice.details.length > 0 ? "\n\n" + weatherAdvice.details.join("\n") : ""}`
      : undefined;

    const ics = generateICS({
      date: harvestDay.date,
      cropNames: harvestDay.crops,
      locationName: location?.adminDistrict,
      weatherNote,
    });
    downloadICS(ics);
  }

  if (!ready) {
    return <div className="py-20 text-center text-earth-lighter text-sm">Loading...</div>;
  }

  return (
    <div>
      {/* Postcode bar */}
      <div className="mb-8">
        {location && !editingPostcode ? (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-earth">
              <strong>{location.adminDistrict}</strong> ({location.postcode})
              &middot; Last frost: <strong>{formatDate(lastFrostDate)}</strong>
            </span>
            <button
              onClick={() => setEditingPostcode(true)}
              className="text-xs text-allotment hover:text-allotment-dark underline decoration-allotment/30 transition-colors"
            >
              Change
            </button>
          </div>
        ) : (
          <div>
            <label htmlFor="postcode" className="text-xs font-semibold text-earth-light mb-1.5 block">
              Your postcode
            </label>
            <div className="flex gap-2 max-w-xs">
              <input
                id="postcode"
                type="text"
                value={postcodeInput}
                onChange={(e) => setPostcodeInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePostcodeLookup()}
                placeholder="e.g. SE15 3AB"
                className="flex-1 bg-white border border-earth/15 text-earth text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-allotment/20 focus:border-allotment/40 transition-all"
              />
              <button
                onClick={handlePostcodeLookup}
                disabled={postcodeLoading}
                className="bg-allotment text-white text-sm font-medium px-4 py-2.5 hover:bg-allotment-dark transition-colors disabled:opacity-50"
              >
                {postcodeLoading ? "..." : "Set"}
              </button>
            </div>
            {postcodeError && (
              <p className="text-xs text-tomato mt-1.5">{postcodeError}</p>
            )}
            {!location && (
              <p className="text-xs text-earth-lighter mt-2">
                Using UK average frost date until you enter your postcode.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Add crop form */}
      <div className="bg-white border border-earth/10 p-4 sm:p-6 mb-8">
        <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment mb-4">
          Add a crop
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <CropCombobox
            crops={crops}
            onSelect={setSelectedCrop}
            selectedCrop={selectedCrop}
          />

          <div className="min-w-[240px]">
            <span className="text-xs font-semibold text-earth-light mb-1.5 block">
              Method
            </span>
            <div className="flex gap-1">
              {(["indoors", "outdoors", "planted-out"] as SowingMethod[]).map((m) => {
                const v = validMethods.find((vm) => vm.method === m);
                const disabled = v?.disabled ?? false;
                const active = method === m && !disabled;
                const labels: Record<SowingMethod, string> = {
                  indoors: "Indoors",
                  outdoors: "Outdoors",
                  "planted-out": "Planted out",
                };
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => !disabled && setMethod(m)}
                    disabled={disabled}
                    title={v?.reason}
                    className={`text-xs px-3 py-2 font-medium transition-colors ${
                      active
                        ? "bg-allotment text-white"
                        : disabled
                          ? "bg-earth/5 text-earth/30 cursor-not-allowed"
                          : "bg-earth/5 text-earth-light hover:bg-earth/10"
                    }`}
                  >
                    {labels[m]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-w-[150px]">
            <label htmlFor="sow-date" className="text-xs font-semibold text-earth-light mb-1.5 block">
              Date
            </label>
            <input
              id="sow-date"
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full bg-white border border-earth/15 text-earth text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-allotment/20 focus:border-allotment/40 transition-all"
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={!selectedCrop || !dateStr}
            className="bg-allotment text-white text-sm font-medium px-6 py-2.5 hover:bg-allotment-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Add crop
          </button>
        </div>
      </div>

      {/* Results */}
      {entries.length > 0 && (
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment">
              Your harvest dates
            </h2>
            <span className="text-xs text-earth-lighter">
              {entries.length} crop{entries.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-3">
            {entries.map((entry, i) => (
              <HarvestCard
                key={`${entry.crop.slug}-${i}`}
                entry={entry}
                onRemove={() => handleRemove(i)}
              />
            ))}
          </div>

          {/* Harvest day recommendation + weather */}
          {harvestDay && (
            <div className="mt-6 bg-sage border-l-[3px] border-l-allotment p-5 sm:p-6">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-2 block">
                Mark your calendar
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-earth tracking-tight mb-1">
                {fmtDay(harvestDay.date)}
              </h3>
              {/* Weekend suggestion */}
              {harvestDay.date.getDay() !== 0 && harvestDay.date.getDay() !== 6 && (
                <p className="text-xs text-earth-lighter mb-2">
                  Nearest weekend: {fmtDayShort(harvestDay.weekend.saturday)} &ndash; {fmtDayShort(harvestDay.weekend.sunday)}
                </p>
              )}
              <p className="text-sm text-earth-light leading-relaxed">
                {harvestDay.count === harvestDay.total ? (
                  <>Everything you&apos;ve planted comes into harvest around the same window. Head to the plot and pick the lot.</>
                ) : (
                  <>{harvestDay.count} of your {harvestDay.total} crops come into harvest within the same week or so. A good day to clear the plot and fill the kitchen.</>
                )}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {harvestDay.crops.map((name) => (
                  <span
                    key={name}
                    className="text-xs bg-allotment/10 text-allotment px-2 py-0.5 font-medium"
                  >
                    {name}
                  </span>
                ))}
              </div>

              {/* Weather intelligence */}
              {weatherLoading && (
                <div className="mt-5 pt-5 border-t border-allotment/10">
                  <p className="text-xs text-earth-lighter animate-pulse">Loading historical weather data...</p>
                </div>
              )}

              {weatherAdvice && !weatherLoading && (
                <div className="mt-5 pt-5 border-t border-allotment/10">
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 block">
                    What to expect in {location?.adminDistrict}
                  </span>
                  <p className="text-sm font-medium text-earth mb-3">
                    {weatherAdvice.summary}
                  </p>

                  {/* Weather stats grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="bg-white/60 px-3 py-2">
                      <span className="text-[10px] text-earth-lighter block">Avg high</span>
                      <span className="text-sm font-semibold text-earth">{weatherAdvice.tempHigh}°C</span>
                    </div>
                    <div className="bg-white/60 px-3 py-2">
                      <span className="text-[10px] text-earth-lighter block">Rainfall</span>
                      <span className="text-sm font-semibold text-earth">{weatherAdvice.rainMm}mm</span>
                    </div>
                    <div className="bg-white/60 px-3 py-2">
                      <span className="text-[10px] text-earth-lighter block">Sunshine</span>
                      <span className="text-sm font-semibold text-earth">{weatherAdvice.sunshineHours}hrs/day</span>
                    </div>
                    <div className="bg-white/60 px-3 py-2">
                      <span className="text-[10px] text-earth-lighter block">Daylight</span>
                      <span className="text-sm font-semibold text-earth">{weatherAdvice.daylightHours}hrs</span>
                    </div>
                  </div>

                  <p className="text-xs text-earth-lighter mb-3 italic">
                    Based on 5 years of weather data for this week in your area. {weatherAdvice.daylightNote}.
                  </p>

                  {/* Crop-specific advice */}
                  {weatherAdvice.details.length > 0 && (
                    <div className="space-y-2">
                      {weatherAdvice.details.map((detail, i) => (
                        <div
                          key={i}
                          className="text-xs text-earth-light bg-white/50 border-l-2 border-l-allotment/30 px-3 py-2 leading-relaxed"
                        >
                          {detail}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="mt-5 pt-4 border-t border-allotment/10 flex flex-wrap gap-3 print:hidden">
                <button
                  onClick={handleCalendarDownload}
                  className="inline-flex items-center gap-2 bg-allotment text-white text-xs font-medium px-4 py-2.5 hover:bg-allotment-dark transition-colors"
                  data-umami-event="harvest-planner-calendar"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Add to calendar
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-white text-earth text-xs font-medium px-4 py-2.5 border border-earth/15 hover:bg-earth/5 transition-colors"
                  data-umami-event="harvest-planner-print"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print harvest dates
                </button>
              </div>
            </div>
          )}

          {/* Print button fallback when no harvest day recommendation */}
          {!harvestDay && (
            <div className="mt-8 flex justify-center print:hidden">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-allotment-dark text-white text-sm font-medium px-6 py-3 hover:bg-allotment transition-colors"
                data-umami-event="harvest-planner-print"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print my harvest dates
              </button>
            </div>
          )}
        </div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-12 text-earth-lighter">
          <p className="text-sm">Add your first crop above to see your personalised harvest dates.</p>
        </div>
      )}
    </div>
  );
}
