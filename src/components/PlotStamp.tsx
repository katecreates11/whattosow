"use client";

import { useEffect, useState } from "react";
import { loadLocation } from "@/lib/location-storage";
import { calculateLastFrostDate, formatDateShort } from "@/lib/frost";

/**
 * The location connection for the "what to sow this week" section: shows the
 * grower's place + their own last-frost date (from their saved postcode), or a
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
        setFrost(formatDateShort(calculateLastFrostDate(loc.latitude, loc.longitude)));
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
        today on your veg patch &middot; {place} &middot; your last frost was ~{frost}
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
