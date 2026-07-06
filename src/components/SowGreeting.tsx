"use client";

import { useEffect, useState } from "react";
import { calculateFrostData } from "@/lib/frost";
import { loadLocation } from "@/lib/location-storage";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
}

function personalGreeting(monthPhrase: string): string | null {
  const location = loadLocation();
  if (!location) return null;
  const frostData = calculateFrostData(location);
  return `Growing in ${location.adminDistrict}, then - your last frost went on ${formatDate(
    frostData.lastFrostDate
  )}, and ${monthPhrase}.`;
}

export default function SowGreeting({
  fallback,
  monthPhrase,
}: {
  fallback: string;
  monthPhrase: string;
}) {
  const [text, setText] = useState(fallback);

  useEffect(() => {
    function refresh() {
      setText(personalGreeting(monthPhrase) ?? fallback);
    }

    refresh();
    window.addEventListener("whattosow:location-updated", refresh);
    return () => window.removeEventListener("whattosow:location-updated", refresh);
  }, [fallback, monthPhrase]);

  return (
    <p className="mt-4 max-w-[42ch] font-serif text-2xl sm:text-3xl leading-tight text-earth" aria-live="polite">
      {text}
    </p>
  );
}
