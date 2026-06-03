"use client";

import { useState } from "react";
import { addPlanting } from "@/lib/my-plot";

/**
 * Interactive date planner for a crop. Set your own sow date and it predicts
 * plant-out and harvest; nudge the plant-out date and the harvest shifts with
 * it. Saves to My plot (with the plant-out date) so the estimate carries over.
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
  name,
  sowIndoorsWeeks,
  plantOutWeeks,
  harvestWeeks,
}: {
  slug: string;
  name: string;
  sowIndoorsWeeks: number | null;
  plantOutWeeks: number | null;
  harvestWeeks: number;
}) {
  const hasPlantOut = plantOutWeeks != null && sowIndoorsWeeks != null;
  const gapDays = hasPlantOut ? (plantOutWeeks! - sowIndoorsWeeks!) * 7 : 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [sow, setSow] = useState(iso(today));
  const [plantOutValue, setPlantOutValue] = useState<string | null>(null); // null = follow prediction
  const [saved, setSaved] = useState(false);

  const sowD = parse(sow);
  const predictedPlantOut = addDays(sowD, gapDays);
  const plantOutD = plantOutValue ? parse(plantOutValue) : predictedPlantOut;
  const deltaDays = hasPlantOut ? Math.round((plantOutD.getTime() - predictedPlantOut.getTime()) / MS_DAY) : 0;
  const harvestD = addDays(sowD, harvestWeeks * 7 + deltaDays);

  function save() {
    addPlanting({
      cropSlug: slug,
      sownOn: sow,
      method: hasPlantOut ? "sow indoors" : "direct sow",
      ...(hasPlantOut ? { plantedOutOn: iso(plantOutD) } : {}),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  }

  return (
    <div className="bg-sage/25 border border-earth/10 p-6 sm:p-7">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-allotment block mb-1">
        Plan it for your plot
      </span>
      <h3 className="font-serif text-xl sm:text-2xl text-earth tracking-tight mb-1">Work out your own dates</h3>
      <p className="text-sm text-earth-light leading-relaxed mb-5 max-w-[52ch]">
        Set the day you sowed (or plan to) and we&apos;ll work out the rest. Sowed late? Planted out on a
        different day? Adjust below and the harvest moves with it.
      </p>

      <div className="flex flex-wrap gap-5">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-earth-light block mb-1.5">
            {hasPlantOut ? "Sowed (indoors)" : "Sowed"}
          </span>
          <input
            type="date"
            value={sow}
            onChange={(e) => setSow(e.target.value)}
            className="border border-earth/20 bg-white px-3 py-2 text-earth text-sm focus:outline-none focus:ring-2 focus:ring-allotment"
          />
        </label>

        {hasPlantOut && (
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
      <div className="mt-6 flex items-stretch gap-2 sm:gap-3">
        <Step label="Sow" date={fmt(sowD)} tone="amber" />
        {hasPlantOut && <Step label="Plant out" date={fmt(plantOutD)} tone="leaf" note={plantOutValue ? "your date" : "predicted"} />}
        <Step label="Harvest from" date={fmt(harvestD)} tone="allotment" big />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={save}
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-cream bg-allotment px-5 py-2.5 hover:bg-allotment-dark transition-colors"
        >
          Add to my plot &rarr;
        </button>
        {saved && (
          <span className="font-serif italic text-allotment">
            Saved — <a href="/my-plot" className="border-b border-amber">see it in My plot</a>
          </span>
        )}
      </div>
    </div>
  );
}

function Step({ label, date, tone, note, big }: { label: string; date: string; tone: string; note?: string; big?: boolean }) {
  const dot: Record<string, string> = { amber: "bg-amber", leaf: "bg-leaf", allotment: "bg-allotment" };
  return (
    <div className={`flex-1 bg-cream border border-earth/10 px-3 py-3 ${big ? "ring-1 ring-allotment/20" : ""}`}>
      <span className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-earth-light mb-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dot[tone]}`} />
        {label}
      </span>
      <span className="font-serif text-earth text-base sm:text-lg leading-tight block">{date}</span>
      {note && <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-earth-lighter">{note}</span>}
    </div>
  );
}
