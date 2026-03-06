"use client";

import { useState } from "react";
import { lookupPostcode } from "@/lib/frost";
import { cities } from "@/data/cities";

function findNearestCity(lat: number, lng: number) {
  let nearest = cities[0];
  let minDist = Infinity;
  for (const city of cities) {
    const dlat = city.latitude - lat;
    const dlng = city.longitude - lng;
    const dist = dlat * dlat + dlng * dlng;
    if (dist < minDist) {
      minDist = dist;
      nearest = city;
    }
  }
  return nearest;
}

export default function LocationSearch() {
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!postcode.trim()) return;

    setError("");
    setLoading(true);

    const result = await lookupPostcode(postcode);

    if (typeof result === "string") {
      setError(result === "invalid" ? "Postcode not found" : "Network error — try again");
      setLoading(false);
      return;
    }

    const nearest = findNearestCity(result.latitude, result.longitude);
    window.location.href = `/sow-in/${nearest.slug}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        placeholder="Enter postcode"
        className="flex-1 max-w-[180px] px-3 py-2 text-sm bg-cream border border-earth/15 text-earth placeholder:text-earth-lighter/60 focus:outline-none focus:border-allotment/40"
        aria-label="UK postcode"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 text-sm font-medium bg-allotment text-white hover:bg-allotment-dark transition-colors disabled:opacity-50"
      >
        {loading ? "..." : "Find my area"}
      </button>
      {error && (
        <span className="self-center text-xs text-tomato" role="alert">{error}</span>
      )}
    </form>
  );
}
