"use client";

import { useEffect, useState } from "react";
import { loadLocation } from "@/lib/location-storage";
import { calculateLastFrostDate } from "@/lib/frost";
import { ukAverageFrost } from "@/lib/season-core";
import { addPlanting } from "@/lib/my-plot";

/**
 * Interactive, frost-aware date planner for a crop. Defaults to the recommended
 * sow date for the visitor's own last-frost date; predicts plant-out (gated so a
 * tender crop never goes out before the frost) and harvest. Adjust your sow or
 * plant-out date and everything moves with it. Saves to My plot.
 *
 * All crop week-fields are relative to last frost, except harvestWeeks (from sowing).
 */
const MS_DAY = 86400000;
const iso = (d: Date) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};
const parse = (s: string) => new Date(s + "T00:00:00");
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * MS_DAY);
const fmt = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });

export default function SowPlanner({
  slug,
  sowIndoorsWeeks,
  directSowWeeks,
  plantOutWeeks,
  harvestWeeks,
  focus = "sowing",
}: {
  slug: string;
  sowIndoorsWeeks: number | null;
  directSowWeeks: number | null;
  plantOutWeeks: number | null;
  harvestWeeks: number;
  /** "harvest" leads with when-do-I-eat-it; "sowing" leads with when-to-sow. */
  focus?: "harvest" | "sowing";
}) {
  const hasPlantOut = plantOutWeeks != null && sowIndoorsWeeks != null;
  // weeks (relative to frost) of the sowing this plan follows
  const sowWeeks = (hasPlantOut ? sowIndoorsWeeks : directSowWeeks ?? sowIndoorsWeeks) ?? 0;

  const [frost, setFrost] = useState<Date>(() => ukAverageFrost());
  const [place, setPlace] = useState<string | null>(null);
  const [sowValue, setSowValue] = useState<string | null>(null); // null = follow recommendation
  const [plantOutValue, setPlantOutValue] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const refresh = () => {
      const loc = loadLocation();
      setFrost(loc ? calculateLastFrostDate(loc.latitude, loc.longitude) : ukAverageFrost());
      setPlace(loc?.adminDistrict ?? null);
    };
    refresh();
    window.addEventListener("whattosow:location-updated", refresh);
    return () => window.removeEventListener("whattosow:location-updated", refresh);
  }, []);

  const recommendedSow = addDays(frost, sowWeeks * 7);
  const sowD = sowValue ? parse(sowValue) : recommendedSow;

  // Predicted plant-out: the later of "frost + plantOutWeeks" (never before the
  // frost) and "this sow date + the indoor-sow→plant-out gap" (plants must be ready).
  const predictedPlantOut = hasPlantOut
    ? new Date(
        Math.max(
          addDays(frost, plantOutWeeks! * 7).getTime(),
          addDays(sowD, (plantOutWeeks! - sowWeeks) * 7).getTime()
        )
      )
    : null;
  const plantOutD = plantOutValue ? parse(plantOutValue) : predictedPlantOut;
  const deltaDays =
    hasPlantOut && plantOutD && predictedPlantOut
      ? Math.round((plantOutD.getTime() - predictedPlantOut.getTime()) / MS_DAY)
      : 0;
  const harvestD = addDays(sowD, harvestWeeks * 7 + deltaDays);

  function save() {
    addPlanting({
      cropSlug: slug,
      sownOn: iso(sowD),
      method: hasPlantOut ? "sow indoors" : "direct sow",
      ...(hasPlantOut && plantOutD ? { plantedOutOn: iso(plantOutD) } : {}),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  }

  return (
    <div className="bg-sage/20 border border-earth/10 p-5 sm:p-6">
      <h3 className="font-serif text-xl sm:text-2xl text-earth tracking-tight mb-1">Work out your own dates</h3>
      <p className="text-sm text-earth-light leading-relaxed mb-1 max-w-[54ch]">
        {focus === "harvest"
          ? "Set the day you sowed (and planted out, if you did) — your harvest date is below."
          : "Starts from the recommended sow date for your area. Sowed on a different day, or planted out late? Adjust below and the harvest moves with it."}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter mb-5">
        {place ? `Tuned to your last frost · ${place} · ${fmt(frost)}` : `Using the UK-average last frost · ${fmt(frost)} · add your postcode to tune it`}
      </p>

      <div className="flex flex-wrap gap-5">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-earth-light block mb-1.5">
            {hasPlantOut ? "Sowed (indoors)" : "Sowed"}
          </span>
          <input
            type="date"
            value={sowValue ?? iso(recommendedSow)}
            onChange={(e) => setSowValue(e.target.value)}
            className="border border-earth/20 bg-white px-3 py-2 text-earth text-sm focus:outline-none focus:ring-2 focus:ring-allotment"
          />
        </label>

        {hasPlantOut && predictedPlantOut && (
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-earth-light block mb-1.5">
              Planted out
            </span>
            <input
              type="date"
              value={plantOutValue ?? iso(predictedPlantOut)}
              onChange={(e) => setPlantOutValue(e.target.value)}
              className="border border-earth/20 bg-white px-3 py-2 text-earth text-sm focus:outline-none focus:ring-2 focus:ring-allotment"
            />
          </label>
        )}
      </div>

      {/* Timeline */}
      <div className="mt-6 grid gap-2 sm:grid-cols-3 sm:gap-3">
        <Step label="Sow" date={fmt(sowD)} tone="amber" />
        {hasPlantOut && plantOutD && (
          <Step label="Plant out" date={fmt(plantOutD)} tone="leaf" note={plantOutValue ? "your date" : "predicted"} />
        )}
        <Step label={focus === "harvest" ? "Ready to eat from" : "Harvest from"} date={fmt(harvestD)} tone="allotment" big hero={focus === "harvest"} />
      </div>

      <div className="mt-6 flex items-center gap-4 flex-wrap">
        <button
          onClick={save}
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-cream bg-allotment px-5 py-2.5 hover:bg-allotment-dark focus-visible:outline-2 focus-visible:outline-allotment focus-visible:outline-offset-2 transition-colors"
        >
          Add to my plot &rarr;
        </button>
        {saved && (
          <span className="font-serif italic text-allotment">
            Saved &check;
          </span>
        )}
      </div>
    </div>
  );
}

function Step({ label, date, tone, note, big, hero }: { label: string; date: string; tone: string; note?: string; big?: boolean; hero?: boolean }) {
  const dot: Record<string, string> = { amber: "bg-amber", leaf: "bg-leaf", allotment: "bg-allotment" };
  return (
    <div className={`min-w-0 border px-3 py-3 ${hero ? "bg-allotment/8 border-allotment/30 ring-1 ring-allotment/20" : big ? "bg-cream border-earth/10 ring-1 ring-allotment/20" : "bg-cream border-earth/10"}`}>
      <span className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-earth-light mb-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dot[tone]}`} />
        {label}
      </span>
      <span className={`font-serif text-earth leading-tight block ${hero ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}>{date}</span>
      {note && <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-earth-lighter">{note}</span>}
    </div>
  );
}
