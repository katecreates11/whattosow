"use client";

import { useEffect, useState } from "react";
import { plotStatuses, removePlanting, PLOT_EVENT, type PlantingStatus } from "@/lib/my-plot";
import { RakedBedIllustration, SunIcon } from "@/components/SVGIllustrations";

function Card({ s }: { s: PlantingStatus }) {
  const sown = new Date(s.planting.sownOn + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
  return (
    <div className="border-t border-earth/10 pt-5 flex items-start justify-between gap-4">
      <div>
        <a href={`/crops/${s.crop.slug}`} className="font-serif text-2xl text-earth hover:text-allotment transition-colors">
          {s.crop.name}
        </a>
        <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter mt-1.5">
          {s.planting.method} &middot; {sown}
        </div>
        <p className={`text-sm mt-1.5 ${s.stage === "ready" ? "text-tomato font-medium" : "text-earth-light"}`}>
          {s.label}
        </p>
      </div>
      <button
        onClick={() => removePlanting(s.planting.id)}
        className="font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter hover:text-tomato transition-colors shrink-0"
      >
        remove
      </button>
    </div>
  );
}

export default function MyPlotClient() {
  const [items, setItems] = useState<PlantingStatus[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const refresh = () => setItems(plotStatuses());
    refresh();
    setMounted(true);
    window.addEventListener(PLOT_EVENT, refresh);
    return () => window.removeEventListener(PLOT_EVENT, refresh);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl">
        <RakedBedIllustration className="w-40 h-auto text-allotment mb-6" />
        <p className="font-serif text-3xl text-earth mb-3 leading-tight">
          Bare beds, raked and waiting.
        </p>
        <p className="text-earth-light mb-5 leading-relaxed max-w-[46ch]">
          Nothing growing here yet &mdash; but that&apos;s the best kind of beginning. Tell us what you&apos;ve sown
          from any crop page, or start with what&apos;s in season this week, and we&apos;ll keep an eye on it for
          you and let you know the day it&apos;s ready.
        </p>
        <a href="/sow" className="font-serif italic text-lg text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">
          See what to sow now &rarr;
        </a>
      </div>
    );
  }

  const ready = items.filter((i) => i.stage === "ready");
  const coming = items.filter((i) => i.stage !== "ready");

  return (
    <div className="space-y-12">
      {ready.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-tomato mb-1">
            <SunIcon className="w-5 h-5" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Ready to harvest &middot; {ready.length}</span>
          </div>
          <p className="font-serif italic text-earth-light mb-5">
            The best day in the calendar &mdash; grab a trug and go and pick something.
          </p>
          <div className="space-y-5">
            {ready.map((s) => (
              <Card key={s.planting.id} s={s} />
            ))}
          </div>
        </div>
      )}
      {coming.length > 0 && (
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment mb-5">
            Coming along &middot; {coming.length}
          </div>
          <div className="space-y-5">
            {coming.map((s) => (
              <Card key={s.planting.id} s={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
