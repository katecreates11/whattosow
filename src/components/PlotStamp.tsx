"use client";

import { useEffect, useState } from "react";
import { loadLocation } from "@/lib/location-storage";
import { calculateFirstAutumnFrostDate, calculateLastFrostDate, formatDateShort } from "@/lib/frost";
import { frostPhase } from "@/lib/frost-phase";

/**
 * The location connection for the "what to sow this week" section: shows the
 * grower's place + whichever of their frost dates is in play this season (from their saved postcode), or a
 * gentle prompt to enter one. Client-side so it reflects the visitor's plot.
 */
export default function PlotStamp() {
  const [place, setPlace] = useState<string | null>(null);
  const [frost, setFrost] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => {
      const loc = loadLocation();
      if (loc) {
        setPlace(loc.adminDistrict);
        const last = calculateLastFrostDate(loc.latitude, loc.longitude);
        const autumn = calculateFirstAutumnFrostDate(loc.latitude, loc.longitude);
        const phase = frostPhase(last, autumn);
        setFrost(
          phase === "autumn"
            ? `your first frost is due ~${formatDateShort(autumn)}`
            : phase === "winter"
              ? `frost season, usually from ~${formatDateShort(autumn)}`
              : phase === "spring"
                ? `your last frost is due ~${formatDateShort(last)}`
                : `your last frost was ~${formatDateShort(last)}`
        );
      } else {
        setPlace(null);
        setFrost(null);
      }
      setReady(true);
    };
    update();
    window.addEventListener("whattosow:location-updated", update);
    return () => window.removeEventListener("whattosow:location-updated", update);
  }, []);

  if (ready && place) {
    return (
      <div className="font-serif italic text-lg text-allotment mb-2">
        today on your veg patch &middot; {place} &middot; {frost}
      </div>
    );
  }

  if (ready) {
    return (
      <div className="font-serif italic text-lg text-allotment mb-2">
        today on your veg patch &mdash;{" "}
        <a
          href="#main-content"
          className="not-italic font-mono text-[12px] uppercase tracking-[0.08em] border-b border-amber pb-0.5"
        >
          enter your postcode to tune it to your veg beds
        </a>
      </div>
    );
  }

  return <div className="font-serif italic text-lg text-allotment mb-2">today on your veg patch</div>;
}
