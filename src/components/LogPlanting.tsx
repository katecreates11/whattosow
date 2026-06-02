"use client";

import { useEffect, useState, useCallback } from "react";
import {
  addPlanting,
  removePlanting,
  trackedCrop,
  plantingStatus,
  PLOT_EVENT,
  type PlantMethod,
  type Planting,
} from "@/lib/my-plot";

const METHODS: { value: PlantMethod; label: string }[] = [
  { value: "direct sow", label: "Direct sown" },
  { value: "sow indoors", label: "Started indoors" },
  { value: "plant out", label: "Planted out" },
];

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function LogPlanting({ cropSlug, cropName }: { cropSlug: string; cropName: string }) {
  const [tracked, setTracked] = useState<Planting | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<PlantMethod>("direct sow");
  const [date, setDate] = useState(today());
  const [mounted, setMounted] = useState(false);

  const refresh = useCallback(() => setTracked(trackedCrop(cropSlug)), [cropSlug]);
  useEffect(() => {
    setMounted(true);
    refresh();
    window.addEventListener(PLOT_EVENT, refresh);
    return () => window.removeEventListener(PLOT_EVENT, refresh);
  }, [refresh]);

  if (!mounted) return null; // avoid hydration mismatch (localStorage)

  if (tracked) {
    const st = plantingStatus(tracked);
    return (
      <div className="border border-allotment/25 bg-allotment-bg p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-allotment mb-1.5">In your plot</div>
        <p className="font-serif text-lg text-earth leading-snug">{st ? st.label : `Sown ${tracked.sownOn}`}</p>
        <div className="mt-3 flex gap-4 items-center">
          <a href="/my-plot" className="font-serif italic text-allotment border-b border-amber pb-0.5">
            See my plot &rarr;
          </a>
          <button
            onClick={() => removePlanting(tracked.id)}
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter hover:text-tomato transition-colors"
          >
            remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-earth/15 p-5">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="font-serif italic text-lg text-allotment border-b border-amber pb-0.5"
        >
          {`I'm growing ${cropName.toLowerCase()} →`}
        </button>
      ) : (
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-allotment mb-3">
            {`Add ${cropName.toLowerCase()} to your plot`}
          </div>
          <div className="flex flex-wrap gap-3 items-end">
            <label className="block">
              <span className="block font-mono text-[10px] uppercase text-earth-lighter mb-1">How</span>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as PlantMethod)}
                className="border border-earth/20 bg-cream px-3 py-2 text-sm font-sans"
              >
                {METHODS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block font-mono text-[10px] uppercase text-earth-lighter mb-1">When</span>
              <input
                type="date"
                value={date}
                max={today()}
                onChange={(e) => setDate(e.target.value)}
                className="border border-earth/20 bg-cream px-3 py-2 text-sm font-sans"
              />
            </label>
            <button
              onClick={() => {
                addPlanting({ cropSlug, sownOn: date, method });
                setOpen(false);
              }}
              className="bg-allotment text-white font-mono text-[11px] uppercase tracking-[0.08em] px-4 py-2.5"
            >
              Add to my plot
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
