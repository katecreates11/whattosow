"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { plotStatuses, PLOT_EVENT, type PlantingStatus } from "@/lib/my-plot";

/**
 * Weaves the grower's own plants into the public Harvest / Grow pages.
 * Returns nothing until they've logged something — so the page stays clean for
 * first-time visitors and becomes personal the moment they add a planting.
 */
export default function MyPlotSection({ lens }: { lens: "harvest" | "grow" }) {
  const [items, setItems] = useState<PlantingStatus[] | undefined>(undefined);

  useEffect(() => {
    const refresh = () => setItems(plotStatuses());
    const initialRefresh = window.setTimeout(refresh, 0);
    window.addEventListener(PLOT_EVENT, refresh);
    return () => {
      window.clearTimeout(initialRefresh);
      window.removeEventListener(PLOT_EVENT, refresh);
    };
  }, []);

  if (items === undefined) return null;

  const relevant =
    lens === "harvest"
      ? items.filter((i) => i.stage === "ready" || i.daysToHarvest <= 30)
      : items.filter((i) => i.stage !== "ready");

  if (relevant.length === 0) return null;

  const title = lens === "harvest" ? "Your harvest" : "Your plot, coming along";

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-12 bg-allotment-bg border-y border-allotment/15">
      <div className="max-w-5xl mx-auto">
        <div className="font-serif italic text-lg text-allotment mb-5">{title}</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relevant.map((s) => (
            <a
              key={s.planting.id}
              href={`/crops/${s.crop.slug}`}
              className="block border border-allotment/15 bg-cream p-4 hover:border-allotment/30 transition-colors"
            >
              <div className="font-serif text-xl text-earth">{s.crop.name}</div>
              <p className={`text-sm mt-1 ${s.stage === "ready" ? "text-tomato font-medium" : "text-earth-light"}`}>
                {s.label}
              </p>
            </a>
          ))}
        </div>
        <Link href="/sow" className="inline-block mt-5 font-serif italic text-allotment border-b border-amber pb-0.5">
          See what else to sow &rarr;
        </Link>
      </div>
    </section>
  );
}
