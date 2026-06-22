"use client";

import { useState, useEffect } from "react";
import { lookupPostcode } from "@/lib/frost";
import { saveLocation, loadLocation } from "@/lib/location-storage";

/**
 * Inline postcode setter for the longest-day page. Saving fires the global
 * location-updated event, so every daylight visual (arc, swing, latitude)
 * re-tunes live without leaving the page. Shows a quiet "tuned to X" once set.
 */
export default function LocalisePostcode() {
  const [ready, setReady] = useState(false);
  const [located, setLocated] = useState(false);
  const [place, setPlace] = useState<string | null>(null);
  const [pc, setPc] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const sync = () => {
      const loc = loadLocation();
      setLocated(!!loc);
      setPlace(loc?.adminDistrict ?? null);
      setReady(true);
    };
    sync();
    window.addEventListener("whattosow:location-updated", sync);
    return () => window.removeEventListener("whattosow:location-updated", sync);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!pc.trim()) return;
    setBusy(true);
    setErr("");
    const res = await lookupPostcode(pc);
    if (typeof res === "string") {
      setErr("Hmm — couldn't find that postcode. Try again?");
      setBusy(false);
      return;
    }
    saveLocation(res); // fires whattosow:location-updated → the page re-tunes
    setPc("");
    setEditing(false);
    setBusy(false);
  }

  if (!ready) return null;

  if (located && !editing) {
    return (
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-earth-lighter">
        Tuned to <span className="text-allotment">{place}</span>
        {" · "}
        <button onClick={() => setEditing(true)} className="border-b border-amber text-allotment hover:text-allotment-dark transition-colors">
          change
        </button>
      </p>
    );
  }

  return (
    <div className="mt-5 border border-earth/12 bg-amber-bg/40 p-5">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment block mb-2">
        Make it yours
      </span>
      <p className="text-sm text-earth-light leading-relaxed mb-3 max-w-[56ch]">
        These readings are for the middle of the UK. Add your postcode and the whole page &mdash; the arc,
        the swing, the comparison &mdash; tunes to your own patch.
      </p>
      <form onSubmit={submit} className="flex gap-2 max-w-sm">
        <input
          value={pc}
          onChange={(e) => setPc(e.target.value)}
          placeholder="Your postcode"
          aria-label="Your UK postcode"
          className="flex-1 px-3 py-2 border border-earth/15 bg-white text-earth placeholder:text-earth-lighter text-sm focus:outline-none focus:ring-2 focus:ring-allotment/30 focus:border-allotment"
        />
        <button
          type="submit"
          disabled={busy || !pc.trim()}
          className="px-4 py-2 bg-allotment text-white text-sm font-medium hover:bg-allotment-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {busy ? "…" : "Tune to me"}
        </button>
      </form>
      {err && (
        <p className="text-sm text-tomato mt-2" role="alert">
          {err}
        </p>
      )}
    </div>
  );
}
