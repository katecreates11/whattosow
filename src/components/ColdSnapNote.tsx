"use client";

import { useEffect, useState } from "react";
import { calculateFrostData, formatDate } from "@/lib/frost";
import { loadLocation } from "@/lib/location-storage";
import AffiliateLink from "@/components/AffiliateLink";

const TAG = "whattosow21-21";
const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=${TAG}`;

// UK-average first autumn frost sits around 25 October (day 298) — the same
// baseline the crop-window engine uses. A patch running more than ten days
// either side of it is meaningfully earlier or later than most of the country.
const UK_AVERAGE_AUTUMN_FROST_DAY = 298;
const EARLY_THRESHOLD_DAYS = 10;

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.round((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export type Tier = "cold" | "typical" | "mild";

export function tierFor(firstAutumnFrost: Date): Tier {
  const diff = dayOfYear(firstAutumnFrost) - UK_AVERAGE_AUTUMN_FROST_DAY;
  if (diff <= -EARLY_THRESHOLD_DAYS) return "cold";
  if (diff >= EARLY_THRESHOLD_DAYS) return "mild";
  return "typical";
}

interface Reading {
  place: string;
  frostDate: string;
  weeksLeft: number;
  tier: Tier;
}

function readLocation(): Reading | null {
  const location = loadLocation();
  if (!location) return null;
  const frostData = calculateFrostData(location);
  const weeksLeft = Math.max(
    0,
    Math.round((frostData.firstAutumnFrostDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 7))
  );
  return {
    place: location.adminDistrict,
    frostDate: formatDate(frostData.firstAutumnFrostDate),
    weeksLeft,
    tier: tierFor(frostData.firstAutumnFrostDate),
  };
}

export default function ColdSnapNote() {
  const [reading, setReading] = useState<Reading | null>(null);

  useEffect(() => {
    function refresh() {
      setReading(readLocation());
    }
    refresh();
    window.addEventListener("whattosow:location-updated", refresh);
    return () => window.removeEventListener("whattosow:location-updated", refresh);
  }, []);

  if (!reading) {
    return (
      <p className="text-earth-light leading-relaxed" aria-live="polite">
        Most of the UK doesn&apos;t see a proper frost until around 25 October, so a
        seed going in this week still has ten or eleven clear weeks of growing
        before the cold shows up.{" "}
        <a
          href="/"
          className="text-rust underline decoration-rust/30 hover:text-earth transition-colors"
        >
          Add your postcode
        </a>{" "}
        and we&apos;ll work out roughly when it reaches your own patch.
      </p>
    );
  }

  return (
    <div aria-live="polite">
      {reading.tier === "cold" && (
        <p className="text-earth-light leading-relaxed">
          Growing in {reading.place}, the cold tends to arrive early &mdash; the
          first frost is usually around {reading.frostDate}, sooner than most of
          the country gets it. That&apos;s still roughly {reading.weeksLeft} weeks
          of growing from today, and a length of{" "}
          <AffiliateLink
            href={az("horticultural fleece plant protection")}
            product="horticultural fleece"
            type="gear"
            merchant="amazon"
            position="cold-snap-fleece"
            className="text-rust underline decoration-rust/30 hover:text-earth transition-colors"
          >
            fleece
          </AffiliateLink>{" "}
          or a{" "}
          <AffiliateLink
            href={az("garden cloche tunnel plant cover")}
            product="cloche tunnel"
            type="gear"
            merchant="amazon"
            position="cold-snap-cloche"
            className="text-rust underline decoration-rust/30 hover:text-earth transition-colors"
          >
            cloche
          </AffiliateLink>{" "}
          over the row when the nights turn buys real extra weeks on whatever
          you sow this week.
        </p>
      )}
      {reading.tier === "typical" && (
        <p className="text-earth-light leading-relaxed">
          Growing in {reading.place}, the first frost tends to arrive around{" "}
          {reading.frostDate} &mdash; a fairly average finish to the season, so
          this week&apos;s sowing gets the usual run at it: about{" "}
          {reading.weeksLeft} weeks of growing before the cold has its say.
        </p>
      )}
      {reading.tier === "mild" && (
        <p className="text-earth-light leading-relaxed">
          Growing in {reading.place}, you&apos;re on the mild side &mdash; the
          first frost doesn&apos;t usually show up until around{" "}
          {reading.frostDate}, later than most of the UK gets it. That&apos;s
          close to {reading.weeksLeft} weeks of growing from today, more slack
          than most gardens have for this week&apos;s sowing.
        </p>
      )}
      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-earth-lighter mt-2">
        worked out for {reading.place} from your local frost pattern
      </p>
    </div>
  );
}
