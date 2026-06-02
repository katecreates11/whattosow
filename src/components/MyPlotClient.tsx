"use client";

import { useEffect, useState } from "react";
import { plotStatuses, removePlanting, PLOT_EVENT, type PlantingStatus } from "@/lib/my-plot";

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
        <p className="font-serif text-2xl text-earth mb-3">Your plot is empty &mdash; for now.</p>
        <p className="text-earth-light mb-5 leading-relaxed">
          Tell us what you&apos;re growing from any crop page, or start with what&apos;s in season this week. We&apos;ll
          keep track of when each thing is ready.
        </p>
        <a href="/sow" className="font-serif italic text-lg text-allotment border-b border-amber pb-0.5">
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
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-tomato mb-5">
            Ready to harvest &middot; {ready.length}
          </div>
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
