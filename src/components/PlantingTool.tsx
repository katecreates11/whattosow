"use client";

import { useState, useRef, useEffect, useCallback, type RefObject } from "react";
import Link from "next/link";
import {
  lookupPostcode,
  calculateFrostData,
  getFrostForecast,
  formatDate,
  type LocationData,
  type FrostData,
  type FrostForecast,
} from "@/lib/frost";
import { crops, getCropsByAction, getMinSoilTemp, type Crop } from "@/data/crops";
import { SnowflakeIcon, SunIcon } from "@/components/SVGIllustrations";
import { getSoilType, type SoilData } from "@/lib/soil";
import EmailCapture from "@/components/EmailCapture";
import { saveLocation, loadLocation } from "@/lib/location-storage";
import { getWateringBalance, getWateringNoteState } from "@/lib/watering";
import { getWateringNoteCopy } from "@/data/watering-notes";
import { inSeasonCrops, plantOutCrops, type CropEntry } from "@/lib/season-core";

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
      return "border-l-[3px] border-l-leaf";
    case "half-hardy":
      return "border-l-[3px] border-l-amber";
    case "tender":
      return "border-l-[3px] border-l-tomato";
  }
}

function CropCard({ crop, action }: { crop: Crop; action?: string }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = `crop-details-${crop.slug}`;

  return (
    <div
      className={`w-full text-left p-4 border border-earth/6 hover:border-earth/15 transition-colors duration-200 ${categoryBorder(crop.category)}`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
        aria-expanded={expanded}
        aria-controls={detailsId}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-earth">{crop.name}</h4>
              <span
                className={`text-xs font-medium px-1.5 py-0.5 ${categoryColor(crop.category)}`}
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
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      {expanded && (
        <div id={detailsId} className="mt-3 pt-3 border-t border-earth/10 space-y-2">
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
          <a
            href={`/crops/${crop.slug}`}
            className="inline-block text-sm font-medium text-allotment hover:text-allotment-dark mt-1"
          >
            Full growing guide &rarr;
          </a>
        </div>
      )}
    </div>
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

function ShareButton({ frostData }: { frostData: FrostData }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const text = `My last frost date is ${formatDate(frostData.lastFrostDate)} (${frostData.location.adminDistrict}). ${frostData.growingSeasonDays}-day growing season. Find yours at whattosow.co.uk`;

    if (navigator.share) {
      try {
        await navigator.share({ text, url: "https://whattosow.co.uk" });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors min-w-[44px] min-h-[44px] justify-center"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      {copied ? "Copied!" : "Share"}
    </button>
  );
}

function postcodePrefix(postcode: string): string {
  return postcode.trim().split(/\s+/)[0] || postcode;
}

function formatPlainDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
}

function getGardenInterpretation(frostData: FrostData): string {
  const place = frostData.location.adminDistrict;
  const lastFrost = formatPlainDate(frostData.lastFrostDate);

  if (frostData.growingSeasonDays >= 190) {
    return `${place} gives you a generous season — last frost usually gone by ${lastFrost}. Tender crops get a kinder runway here than in much of the country.`;
  }

  if (frostData.growingSeasonDays <= 160) {
    return `${place} asks for a little patience — last frost usually clears around ${lastFrost}. We keep the tender things tucked up until the weather has properly settled.`;
  }

  return `${place} sits in a steady UK growing season — last frost usually gone by ${lastFrost}. Hardy things can get on with it, and tender crops are happiest once the soil has warmed.`;
}

function methodForAnswer(entry: CropEntry): string {
  if (entry.status.method === "direct sow") return "direct";
  if (entry.status.method === "sow indoors") return "modules";
  if (entry.status.method === "plant out") return "plant out";
  return "soon";
}

function answerEntries(frostData: FrostData, today: Date): CropEntry[] {
  const sowEntries = inSeasonCrops(frostData.lastFrostDate, today)
    .filter((entry) => entry.status.method !== "plant out");
  const outEntries = plantOutCrops(frostData.lastFrostDate, today);
  const seen = new Set<string>();
  const picked: CropEntry[] = [];

  const add = (entry: CropEntry) => {
    if (seen.has(entry.crop.slug) || picked.length >= 4) return;
    seen.add(entry.crop.slug);
    picked.push(entry);
  };

  sowEntries.forEach(add);
  outEntries.forEach(add);

  return picked;
}

function getSowingSentence(entries: CropEntry[]): string {
  if (entries.length === 0) {
    return "The beds can pause for a breath this week; use the moment to water, clear space, and plan the next sowing.";
  }

  const directCount = entries.filter((entry) => methodForAnswer(entry) === "direct").length;
  const moduleCount = entries.filter((entry) => methodForAnswer(entry) === "modules").length;

  if (directCount >= moduleCount) {
    return "Sow this week:";
  }

  return "Start this week:";
}

function getTonightSentence(forecast: FrostForecast | null): string {
  if (!forecast) {
    return "Tonight, check pots and new sowings by touch; if the top inch is dry, water slowly at the roots.";
  }

  const state = getWateringNoteState({
    tempMaxToday: forecast.tempMax,
    windMax: forecast.windMax,
    rainfall3Days: forecast.rainfall3Days,
    evapotranspiration: forecast.evapotranspiration,
  });

  return getWateringNoteCopy(state).sentence;
}

function HomepageAnswerReveal({
  frostData,
  forecast,
  today,
  onChangeLocation,
  sectionRef,
  headingRef,
}: {
  frostData: FrostData;
  forecast: FrostForecast | null;
  today: Date;
  onChangeLocation: () => void;
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
}) {
  const entries = answerEntries(frostData, today);
  const sowingLead = getSowingSentence(entries);

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-8 max-w-xl mx-auto lg:mx-0 border-y border-earth/12 py-5 sm:py-6"
      aria-labelledby="postcode-answer-heading"
      aria-live="polite"
    >
      <div className="mb-4">
        <button
          type="button"
          onClick={onChangeLocation}
          className="inline-flex min-h-[40px] items-center gap-2 border border-earth/15 bg-cream px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-earth hover:border-allotment hover:text-allotment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-allotment"
        >
          {postcodePrefix(frostData.location.postcode)} <span aria-hidden="true">&middot;</span> change
        </button>
      </div>

      <h2
        id="postcode-answer-heading"
        ref={headingRef}
        tabIndex={-1}
        className="scroll-mt-24 font-serif text-2xl sm:text-3xl leading-tight text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-allotment"
      >
        Growing in {frostData.location.adminDistrict}, then.
      </h2>

      <p className="mt-3 font-serif text-lg leading-snug text-earth-light">
        {getGardenInterpretation(frostData)}
      </p>

      <div className="mt-4 border-t border-earth/10 pt-4">
        <p className="text-sm leading-relaxed text-earth">
          <span className="font-semibold">{sowingLead}</span>{" "}
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <span key={entry.crop.slug}>
                <Link
                  href={`/crops/${entry.crop.slug}`}
                  className="font-serif text-lg text-allotment underline decoration-amber/50 underline-offset-4 hover:text-earth focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-allotment"
                >
                  {entry.crop.name.toLowerCase()}
                </Link>
                <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.12em] text-earth-lighter">
                  {methodForAnswer(entry)}
                  {entry.status.state === "closing" ? " · closing" : ""}
                </span>
                {index < entries.length - 2 ? ", " : index === entries.length - 2 ? " — and " : "."}
              </span>
            ))
          ) : null}
        </p>
      </div>

      <p className="mt-4 font-serif text-base leading-snug text-earth-light">
        Tonight: {getTonightSentence(forecast)}
      </p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <Link
          href="/sow"
          className="font-serif italic text-lg text-earth border-b-2 border-amber pb-px hover:text-allotment focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-allotment"
        >
          Everything for your postcode &rarr;
        </Link>
        <Link
          href="/my-garden"
          className="font-serif italic text-lg text-earth-light border-b border-earth/20 pb-px hover:text-allotment hover:border-amber focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-allotment"
        >
          Set up your garden &rarr;
        </Link>
      </div>
    </section>
  );
}

type PlantingToolProps = {
  hideCropList?: boolean;
  answerOnly?: boolean;
};

export default function PlantingTool({ hideCropList, answerOnly = false }: PlantingToolProps = {}) {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [frostData, setFrostData] = useState<FrostData | null>(null);
  const [forecast, setForecast] = useState<FrostForecast | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [ready, setReady] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [focusAnswerOnReveal, setFocusAnswerOnReveal] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const answerSectionRef = useRef<HTMLElement>(null);
  const answerHeadingRef = useRef<HTMLHeadingElement>(null);
  const showAnswerReveal = !hideCropList;

  const submitWithLocation = useCallback(async (location: LocationData, shouldReveal: boolean) => {
    const data = calculateFrostData(location);
    setFrostData(data);
    setPostcode(location.postcode);
    setShowForm(false);

    getFrostForecast(location.latitude, location.longitude).then((f) => {
      setForecast(f);
    });

    if (!answerOnly) {
      getSoilType(location.latitude, location.longitude).then((s) => {
        setSoilData(s);
      });
    }

    if (shouldReveal && showAnswerReveal) {
      setFocusAnswerOnReveal(true);
    } else if (shouldReveal) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [answerOnly, showAnswerReveal]);

  // Check localStorage on mount — prevents form flash (H2)
  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      const saved = loadLocation();
      if (saved) {
        submitWithLocation(saved, false);
      }
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [submitWithLocation]);

  useEffect(() => {
    if (!focusAnswerOnReveal || !frostData || showForm) return;
    window.requestAnimationFrame(() => {
      answerSectionRef.current?.scrollIntoView({ block: "start" });
      answerHeadingRef.current?.focus({ preventScroll: true });
      setFocusAnswerOnReveal(false);
    });
  }, [focusAnswerOnReveal, frostData, showForm]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Basic rate limiting (M3) — 2s cooldown
    const now = Date.now();
    if (now - lastSubmitTime < 2000) return;
    setLastSubmitTime(now);

    setLoading(true);
    setError("");
    setFrostData(null);
    setForecast(null);
    setSoilData(null);

    const result = await lookupPostcode(postcode);

    if (typeof result === "string") {
      setError(
        result === "network"
          ? "Could not reach the postcode service. Please check your connection and try again."
          : "Couldn't find that postcode. Please check and try again."
      );
      setLoading(false);
      return;
    }

    saveLocation(result);
    setLoading(false);

    // Track postcode search with prefix only (GDPR compliant)
    if (typeof window !== 'undefined' && window.umami) {
      const prefix = result.postcode.trim().split(/\s+/)[0] || '';
      window.umami.track('postcode-search', { prefix });
    }

    submitWithLocation(result, true);
  }

  function handleChangeLocation() {
    setShowForm(true);
    setFrostData(null);
    setForecast(null);
    setSoilData(null);
  }

  const today = new Date();
  const cropActions = frostData
    ? getCropsByAction(crops, today, frostData.lastFrostDate)
    : null;

  // Season-aware: in high summer (frost long gone, autumn frost still weeks off)
  // the tool leads with watering and drops the frost noise; spring/autumn keep
  // frost front-and-centre. Self-adjusts every year — no hardcoded dates.
  const daysToAutumnFrost = frostData
    ? Math.round((frostData.firstAutumnFrostDate.getTime() - today.getTime()) / 86400000)
    : Infinity;
  const summerMode = !!frostData?.isSafe && daysToAutumnFrost > 42;

  // Don't render until localStorage check is done — prevents form flash (H2)
  if (!ready) {
    return (
      <div className="w-full max-w-md mx-auto lg:mx-0">
        <div className="h-[72px]" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Search form or location bar */}
      {showForm && !frostData ? (
        <div>
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
                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                placeholder="e.g. SW1A 1AA"
                className="flex-1 px-4 py-3 rounded-xl border border-earth/15 bg-white text-earth placeholder:text-earth-lighter focus:outline-none focus:ring-2 focus:ring-allotment focus:border-transparent text-base uppercase"
                autoComplete="postal-code"
                required
              />
              <button
                type="submit"
                disabled={loading}
                data-umami-event="postcode-search"
                className="px-6 py-3 bg-allotment text-white font-semibold rounded-xl hover:bg-allotment-dark focus:outline-none focus:ring-2 focus:ring-allotment focus:ring-offset-2 focus:ring-offset-cream disabled:opacity-50 transition-colors text-base whitespace-nowrap"
              >
                {loading ? "Checking…" : "Go"}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-tomato" role="alert">{error}</p>
            )}
            <p className="mt-3 font-mono text-[10px] tracking-[0.08em] text-earth-lighter">
              we&apos;ll work out your frosts, your season, and what makes sense tonight
            </p>
            {loading && (
              <p className="mt-2 text-sm font-serif italic text-earth-light" aria-live="polite">
                reading your sky… checking your frosts…
              </p>
            )}
          </form>

          {/* Sample result preview for first-time visitors */}
          {!frostData && (
            <div className="max-w-md mx-auto lg:mx-0 mt-4">
              <div className="flex items-center gap-3 px-4 py-3 border border-white/10">
                <svg className="w-4 h-4 shrink-0 text-leaf-light/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm text-white/50">
                  e.g. <span className="text-white/70 font-medium">Bristol</span> — last frost 18 Apr &middot; 179-day growing season
                </span>
              </div>
            </div>
          )}
        </div>
      ) : frostData ? (
        showAnswerReveal && cropActions ? (
          <HomepageAnswerReveal
            frostData={frostData}
            forecast={forecast}
            today={today}
            onChangeLocation={handleChangeLocation}
            sectionRef={answerSectionRef}
            headingRef={answerHeadingRef}
          />
        ) : (
        /* Compact location bar when results are showing */
        <div className="max-w-md mx-auto lg:mx-0 mb-2">
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-allotment-bg rounded-xl">
            <div className="flex items-center gap-2 min-w-0">
              <svg className="w-4 h-4 text-allotment shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className="text-sm text-earth font-medium truncate">
                {frostData.location.adminDistrict}, {frostData.location.region}
              </p>
              <span className="text-xs text-earth-lighter shrink-0">
                ({frostData.location.postcode})
              </span>
            </div>
            <button
              onClick={handleChangeLocation}
              className="text-xs font-medium text-allotment hover:text-allotment-dark whitespace-nowrap"
            >
              Change
            </button>
          </div>
        </div>
        )
      ) : null}

      {/* Results */}
      {!answerOnly && frostData && cropActions && (
        <div ref={resultsRef} className="mt-6 space-y-6 scroll-mt-20" aria-live="polite">
          {/* Location + Frost Date — dark allotment card */}
          <div className="bg-allotment-dark rounded-2xl shadow-sm overflow-hidden text-white">
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-0.5">
                    {frostData.location.adminDistrict},{" "}
                    {frostData.location.region}
                  </p>
                  <p className="text-xs text-white/60 font-mono">
                    {Math.abs(frostData.location.latitude).toFixed(2)}&deg;{" "}
                    {frostData.location.latitude >= 0 ? "N" : "S"},{" "}
                    {Math.abs(frostData.location.longitude).toFixed(2)}&deg;{" "}
                    {frostData.location.longitude >= 0 ? "E" : "W"}
                  </p>
                </div>
                <ShareButton frostData={frostData} />
              </div>
              <h2 className={summerMode ? "text-lg sm:text-xl font-semibold text-white/90 mb-4" : "text-2xl sm:text-3xl font-bold text-white mb-4"}>
                {!frostData.isSafe ? (
                  <>
                    <span className="text-leaf-light">{frostData.daysUntilSafe} days</span>{" "}
                    until it&apos;s safe to plant out
                  </>
                ) : summerMode ? (
                  <>Your growing season</>
                ) : (
                  <>
                    First autumn frost in{" "}
                    <span className="text-frost-light">~{daysToAutumnFrost} days</span>
                  </>
                )}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs font-medium text-white/70 uppercase tracking-wide mb-1">
                    Last frost date
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {formatDate(frostData.lastFrostDate)}
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs font-medium text-white/70 uppercase tracking-wide mb-1">
                    First autumn frost
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {formatDate(frostData.firstAutumnFrostDate)}
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs font-medium text-white/70 uppercase tracking-wide mb-1">
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
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>Today</span>
                    <span>Safe to plant out</span>
                  </div>
                  <div
                    className="h-3 bg-white/10 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-label="Days until safe to plant out"
                    aria-valuenow={Math.max(0, 90 - frostData.daysUntilSafe)}
                    aria-valuemin={0}
                    aria-valuemax={90}
                  >
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

          {/* Frost Risk — hidden in high summer (frost's long gone) */}
          {!summerMode &&
            (forecast ? (
              <FrostRiskBadge forecast={forecast} />
            ) : frostData ? (
              <p className="text-xs text-earth-lighter italic">
                Live frost forecast unavailable — check your local weather for tonight&apos;s temperatures.
              </p>
            ) : null)}

          {/* Allotment conditions dashboard */}
          {forecast && (
            <div className="space-y-3">
              {/* Hero: watering calculator */}
              {forecast.rainfall3Days !== undefined && forecast.evapotranspiration !== undefined && (
                <div className="bg-frost-bg rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-frost" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                    </svg>
                    <h3 className="font-semibold text-earth">Do I need to water?</h3>
                  </div>
                  {(() => {
                    const balance = getWateringBalance({
                      rainfall3Days: forecast.rainfall3Days,
                      evapotranspiration: forecast.evapotranspiration,
                    });
                    if (!balance) return null;
                    const { rain, lost, netBalance, gaining, scale } = balance;
                    return (
                      <div>
                        <p className={`text-lg sm:text-xl font-semibold leading-tight ${gaining ? "text-allotment" : "text-amber-dark"}`}>
                          {gaining ? "Hold off — the rain's doing the work" : "Time to water"}
                        </p>
                        <p className="text-sm text-earth-light mt-1.5 leading-relaxed">
                          {gaining
                            ? "The next few days bring more rain than your soil will lose. Leave the watering can in the shed."
                            : "Your soil is losing more than it's getting. Give a good soak to anything recently sown, your containers, and the thirsty ones — tomatoes, courgettes and beans drink heavily in this heat."}
                        </p>
                        <div className="mt-3.5 space-y-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-wide text-earth-lighter">Rain in</span>
                            <div className="flex-1 h-2.5 bg-earth/10 rounded-full overflow-hidden">
                              <div className="h-full bg-frost rounded-full" style={{ width: `${Math.min(100, (rain / scale) * 100)}%` }} />
                            </div>
                            <span className="w-12 shrink-0 text-right font-mono text-[11px] text-earth">{rain}mm</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-wide text-earth-lighter">Lost</span>
                            <div className="flex-1 h-2.5 bg-earth/10 rounded-full overflow-hidden">
                              <div className="h-full bg-amber rounded-full" style={{ width: `${Math.min(100, (lost / scale) * 100)}%` }} />
                            </div>
                            <span className="w-12 shrink-0 text-right font-mono text-[11px] text-earth">{lost}mm</span>
                          </div>
                        </div>
                        <p className="text-xs text-earth-lighter mt-2.5">
                          {netBalance > 0 ? "+" : ""}{netBalance}mm net over 3 days{" "}&middot;{" "}
                          <a href="/guides/watering" className="text-rust hover:text-earth underline decoration-rust/30">how to water well &rarr;</a>
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 4-card conditions grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Soil temp at seed depth */}
                {(forecast.soilTemp6cm !== undefined || forecast.soilTemp !== undefined) && (
                  <div className="bg-amber-bg rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 4v10.54a4 4 0 11-4 0V4a2 2 0 014 0z" />
                      </svg>
                      <p className="text-xs font-medium text-earth-lighter uppercase tracking-wide">
                        Soil temp (seed depth)
                      </p>
                    </div>
                    <p className="text-xl font-bold text-earth">
                      {forecast.soilTemp6cm ?? forecast.soilTemp}&deg;C
                    </p>
                    <p className="text-xs text-earth-lighter mt-1">
                      {(() => {
                        const temp = forecast.soilTemp6cm ?? forecast.soilTemp!;
                        const sowNow = cropActions ? [
                          ...cropActions.sowIndoorsNow,
                          ...cropActions.directSowNow,
                        ] : [];
                        const warmEnough = sowNow.filter(c => temp >= getMinSoilTemp(c));
                        const tooCold = sowNow.filter(c => temp < getMinSoilTemp(c));
                        if (warmEnough.length > 0 && tooCold.length > 0) {
                          return `Warm enough for ${warmEnough.slice(0, 2).map(c => c.name.toLowerCase()).join(", ")} but not ${tooCold.slice(0, 2).map(c => c.name.toLowerCase()).join(", ")}`;
                        }
                        if (temp >= 12) return "Warm enough for most seeds";
                        if (temp >= 8) return "OK for hardy and half-hardy crops";
                        if (temp >= 5) return "Hardy crops only — too cold for most seeds";
                        return "Soil is very cold — wait to sow";
                      })()}
                    </p>
                  </div>
                )}

                {/* Wind */}
                {forecast.windMax !== undefined && (
                  <div className="bg-allotment-bg rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-allotment" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
                      </svg>
                      <p className="text-xs font-medium text-earth-lighter uppercase tracking-wide">
                        Wind
                      </p>
                    </div>
                    <p className="text-xl font-bold text-earth">
                      {forecast.windMax} km/h
                    </p>
                    <p className="text-xs text-earth-lighter mt-1">
                      {forecast.windMax < 20
                        ? "Calm enough to direct sow"
                        : forecast.windMax < 40
                          ? "Breezy — stake tall plants"
                          : "Strong wind — hold off outdoors"}
                      {forecast.windGustsMax !== undefined && forecast.windGustsMax > forecast.windMax + 10
                        ? ` (gusts ${forecast.windGustsMax} km/h)`
                        : ""}
                    </p>
                  </div>
                )}

                {/* Sunshine */}
                {forecast.sunshineDuration !== undefined && (
                  <div className="bg-amber-bg rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <SunIcon className="w-4 h-4" />
                      <p className="text-xs font-medium text-earth-lighter uppercase tracking-wide">
                        Sunshine
                      </p>
                    </div>
                    <p className="text-xl font-bold text-earth">
                      {forecast.sunshineDuration} hrs
                    </p>
                    <p className="text-xs text-earth-lighter mt-1">
                      {forecast.sunshineDuration >= 8
                        ? "Great growing day"
                        : forecast.sunshineDuration >= 4
                          ? "Decent light for the plot"
                          : "Overcast — focus on indoor tasks"}
                      {forecast.tempMax !== undefined ? ` · High of ${forecast.tempMax}°C` : ""}
                    </p>
                  </div>
                )}

                {/* Rainfall + probability */}
                {forecast.rainfall3Days !== undefined && (
                  <div className="bg-frost-bg rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-frost" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                      </svg>
                      <p className="text-xs font-medium text-earth-lighter uppercase tracking-wide">
                        Rain (3 days)
                      </p>
                    </div>
                    <p className="text-xl font-bold text-earth">
                      {forecast.rainfall3Days}mm
                    </p>
                    <p className="text-xs text-earth-lighter mt-1">
                      {forecast.rainfall3Days === 0
                        ? "No rain forecast — water if dry"
                        : forecast.rainfall3Days < 5
                          ? "Light rain — may still need watering"
                          : forecast.rainfall3Days < 15
                            ? "Good rainfall expected"
                            : "Heavy rain — avoid sowing outdoors"}
                      {forecast.precipProbability !== undefined
                        ? ` (${forecast.precipProbability}% chance)`
                        : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Soil type info bar */}
          {soilData && (
            <div className="flex items-start gap-3 bg-amber-bg rounded-xl px-4 py-3">
              <svg className="w-5 h-5 text-amber mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 22h20" />
                <path d="M12 2v6" />
                <path d="M12 12a4 4 0 0 0-4 4c0 2 4 6 4 6s4-4 4-6a4 4 0 0 0-4-4z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-earth">
                  {soilData.friendlyName}
                </p>
                <p className="text-xs text-earth-lighter mt-0.5">
                  {soilData.gardeningAdvice}
                </p>
                <p className="text-[10px] text-earth-lighter/70 mt-1">
                  Source: Cranfield Soilscapes — England &amp; Wales only
                </p>
              </div>
            </div>
          )}

          {/* What to sow NOW */}
          {!hideCropList && (cropActions.sowIndoorsNow.length > 0 ||
            cropActions.directSowNow.length > 0 ||
            cropActions.plantOutNow.length > 0) && (
            <div>
              <h3 className="text-xl font-bold text-earth mb-4">
                What to sow now
              </h3>

              {cropActions.sowIndoorsNow.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-6 bg-amber rounded-full" />
                    <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                    <svg className="w-5 h-5 text-leaf" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                    <svg className="w-5 h-5 text-allotment" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

          {/* Email signup — positioned at peak motivation, right after sowing recommendations */}
          {!hideCropList && (
            <EmailCapture
              context={frostData ? {
                district: frostData.location.adminDistrict,
                frostDate: formatDate(frostData.lastFrostDate),
              } : undefined}
            />
          )}

          {/* On the horizon — windows opening soon (the forward look) */}
          {!hideCropList && cropActions.comingSoon.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-frost rounded-full" />
                <svg className="w-5 h-5 text-frost" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                <p className="text-sm font-semibold text-earth">On the horizon</p>
              </div>
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

          {/* Info + Sources */}
          <div className="bg-allotment-bg rounded-xl p-4 text-sm text-earth-light space-y-3">
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
            <div className="pt-2 border-t border-allotment/10">
              <p className="text-xs text-earth-lighter mb-1.5 font-medium">Data sources — verify for yourself:</p>
              <ul className="text-xs text-earth-lighter space-y-1">
                <li>
                  <a href="https://www.metoffice.gov.uk/research/climate/maps-and-data/uk-climate-averages" target="_blank" rel="noopener noreferrer" className="text-allotment hover:underline">Met Office UK climate averages</a> — frost date calibration
                </li>
                <li>
                  <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-allotment hover:underline">Open-Meteo</a> — live frost forecast &amp; soil temperature
                </li>
                <li>
                  <a href="https://postcodes.io/" target="_blank" rel="noopener noreferrer" className="text-allotment hover:underline">Postcodes.io</a> — postcode geolocation (open data)
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
