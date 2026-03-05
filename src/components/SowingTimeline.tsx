"use client";

import { useMemo, useEffect, useRef, useState, Fragment } from "react";
import { crops } from "@/data/crops";
import { getCropActionMonths, MONTH_NAMES, MONTH_SLUGS, getAvgFrostDate, type SowingAction } from "@/lib/calendar";
import { getCropIcon } from "@/components/SVGIllustrations";

const actionColor: Record<SowingAction, string> = {
  sowIndoors: "bg-amber",
  directSow: "bg-leaf",
  plantOut: "bg-allotment",
  harvest: "bg-amber-light",
};

export default function SowingTimeline() {
  const frostDate = useMemo(() => getAvgFrostDate(), []);
  const currentMonth = new Date().getMonth();
  const gridRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  const sortedCrops = useMemo(() => {
    const order = { hardy: 0, "half-hardy": 1, tender: 2 };
    return [...crops].sort(
      (a, b) => order[a.category] - order[b.category] || a.name.localeCompare(b.name)
    );
  }, []);

  const cropData = useMemo(() => {
    return sortedCrops.map((crop) => {
      const actions = getCropActionMonths(crop, frostDate);
      const monthActions: SowingAction[][] = Array.from({ length: 12 }, () => []);
      for (const { action, months } of actions) {
        for (const m of months) {
          monthActions[m].push(action);
        }
      }
      return { crop, monthActions };
    });
  }, [sortedCrops, frostDate]);

  // IntersectionObserver to trigger reveal animation
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto -mx-4 sm:mx-0" role="region" aria-label="Sowing timeline — scroll horizontally to view all months" tabIndex={0}>
        <div className="min-w-[800px] px-4 sm:px-0">
          <div
            ref={gridRef}
            className="grid"
            style={{ gridTemplateColumns: "150px repeat(12, 1fr)" }}
          >
            {/* Header row */}
            <div className="py-2 border-b border-earth/10" />
            {MONTH_NAMES.map((m, i) => (
              <a
                key={i}
                href={`/sow/${MONTH_SLUGS[i]}`}
                className={`text-xs font-medium text-center py-2 border-b border-earth/10 transition-all duration-500 ${
                  i === currentMonth
                    ? "text-allotment font-semibold bg-leaf-bg/50"
                    : "text-earth-lighter hover:text-allotment"
                } ${
                  revealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{
                  transitionDelay: revealed ? `${i * 60}ms` : "0ms",
                }}
              >
                {m.slice(0, 3)}
                {i === currentMonth && (
                  <span className="block w-1 h-1 rounded-full bg-allotment mx-auto mt-0.5" aria-label="Current month" />
                )}
              </a>
            ))}

            {/* Crop rows */}
            {cropData.map(({ crop, monthActions }, rowIdx) => {
              const Icon = getCropIcon(crop.slug);
              return (
                <Fragment key={crop.slug}>
                  <a
                    href={`/crops/${crop.slug}`}
                    className={`text-xs text-earth font-medium py-2 pr-2 truncate flex items-center gap-1.5 border-b border-earth/5 hover:text-allotment transition-all duration-500 ${
                      revealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                    }`}
                    style={{
                      transitionDelay: revealed ? `${200 + rowIdx * 30}ms` : "0ms",
                    }}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                    <span className="truncate">{crop.name}</span>
                  </a>
                  {monthActions.map((actions, m) => (
                    <div
                      key={m}
                      className={`py-2 px-0.5 border-b border-earth/5 flex flex-col justify-center gap-0.5 transition-all duration-500 ${
                        m === currentMonth ? "bg-leaf-bg/30" : ""
                      } ${
                        revealed ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      style={{
                        transitionDelay: revealed ? `${200 + rowIdx * 30 + m * 40}ms` : "0ms",
                      }}
                    >
                      {actions.map((action) => (
                        <div
                          key={action}
                          className={`h-2 rounded-full ${actionColor[action]}`}
                        />
                      ))}
                    </div>
                  ))}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 text-xs text-earth-light">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-2 rounded-full bg-amber" aria-hidden="true" />
          Sow indoors
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-2 rounded-full bg-leaf" aria-hidden="true" />
          Direct sow
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-2 rounded-full bg-allotment" aria-hidden="true" />
          Plant out
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-2 rounded-full bg-amber-light" aria-hidden="true" />
          Harvest
        </span>
      </div>
    </div>
  );
}
