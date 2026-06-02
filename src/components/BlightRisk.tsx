"use client";

import { useEffect, useState } from "react";
import { loadLocation } from "@/lib/location-storage";
import { assessHutton, type BlightAssessment, type BlightLevel } from "@/lib/blight";

type Variant = "full" | "compact" | "banner";

const ACCENT: Record<BlightLevel, { dot: string; text: string; border: string; bg: string; label: string }> = {
  high: { dot: "bg-tomato", text: "text-tomato", border: "border-tomato/40", bg: "bg-tomato-bg", label: "High risk" },
  building: { dot: "bg-amber", text: "text-amber", border: "border-amber/40", bg: "bg-amber-bg", label: "Risk building" },
  low: { dot: "bg-allotment", text: "text-allotment", border: "border-allotment/25", bg: "bg-allotment-bg", label: "Low risk" },
};

function message(a: BlightAssessment, place: string): { head: string; body: string } {
  const where = place ? ` in ${place}` : "";
  if (a.level === "high" && a.forecast)
    return {
      head: `Blight risk high${where} — forecast`,
      body: "A Hutton Period (two days warm and humid enough for blight) is forecast in the next few days. Get ahead of it: improve airflow, and have your plan ready.",
    };
  if (a.level === "high")
    return {
      head: `Blight risk high${where}`,
      body: "A Hutton Period has been recorded — conditions have been ripe for late blight. Check plants now, remove and bin any affected leaves (never compost them), and keep water off the foliage.",
    };
  if (a.level === "building")
    return {
      head: `Blight risk building${where}`,
      body: "It has been warm and humid enough to watch — not a full Hutton Period yet, but the conditions are heading that way. Keep an eye on your tomatoes and potatoes.",
    };
  return {
    head: `Blight risk low${where}`,
    body: "Conditions aren't currently favourable for late blight. We'll flag it here the moment that changes.",
  };
}

function fmt(date: string): string {
  return new Date(date + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

export default function BlightRisk({ variant = "full" }: { variant?: Variant }) {
  const [assessment, setAssessment] = useState<BlightAssessment | null>(null);
  const [place, setPlace] = useState<string>("");
  const [located, setLocated] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loc = loadLocation();
    setLocated(!!loc);
    setPlace(loc?.adminDistrict ?? "");
    const lat = loc?.latitude ?? 52.48;
    const lng = loc?.longitude ?? -1.89;
    (async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relative_humidity_2m&past_days=2&forecast_days=5&timezone=Europe/London`
        );
        if (!res.ok) return;
        const h = (await res.json()).hourly;
        setAssessment(assessHutton(h.time, h.temperature_2m, h.relative_humidity_2m));
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Banner: nothing unless we have a high-risk reading
  if (variant === "banner") {
    if (!assessment || assessment.level !== "high") return null;
    const m = message(assessment, place);
    return (
      <a
        href="/guides/tomato-blight"
        className="flex items-center gap-3 bg-tomato-bg border-l-4 border-tomato px-5 py-3 hover:bg-tomato/10 transition-colors"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-tomato animate-pulse shrink-0" aria-hidden="true" />
        <span className="text-sm text-earth">
          <b className="font-semibold">{m.head}.</b> {assessment.forecast ? "Get ahead of it" : "What to do now"}{" "}
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-tomato border-b border-tomato">read &rarr;</span>
        </span>
      </a>
    );
  }

  if (loading || !assessment) {
    return (
      <div className={`border ${variant === "compact" ? "p-4" : "p-6"} border-earth/10 ${variant === "compact" ? "" : "min-h-[120px]"} animate-pulse`}>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-earth-lighter">Reading blight conditions…</span>
      </div>
    );
  }

  const a = assessment;
  const acc = ACCENT[a.level];
  const m = message(a, place);

  if (variant === "compact") {
    return (
      <div className={`border ${acc.border} ${acc.bg} p-4`}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${acc.dot} ${a.level === "high" ? "animate-pulse" : ""}`} aria-hidden="true" />
          <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${acc.text}`}>{acc.label}</span>
        </div>
        <p className="font-serif text-base text-earth leading-snug mb-1">{m.head}</p>
        <p className="text-[13px] text-earth-light leading-relaxed">{m.body}</p>
        <a href="/guides/tomato-blight" className="inline-block mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-allotment border-b border-amber">
          Blight &amp; the Hutton Criteria &rarr;
        </a>
      </div>
    );
  }

  // full
  return (
    <div className={`border ${acc.border} ${acc.bg} p-6 sm:p-8`}>
      <div className="flex items-center gap-2.5 mb-3">
        <span className={`w-3 h-3 rounded-full ${acc.dot} ${a.level === "high" ? "animate-pulse" : ""}`} aria-hidden="true" />
        <span className={`font-mono text-[11px] uppercase tracking-[0.16em] ${acc.text}`}>
          {acc.label}
          {!located && " · UK average"}
        </span>
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-2">{m.head}</h3>
      <p className="text-earth-light leading-relaxed max-w-[52ch]">{m.body}</p>

      {!located && (
        <a href="/#main-content" className="inline-block mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-allotment border-b border-amber">
          Enter your postcode for your plot &rarr;
        </a>
      )}

      {a.days.length > 0 && (
        <div className="mt-6 pt-5 border-t border-earth/10">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth-lighter mb-3">
            The last few days &middot; a day counts when it&apos;s 10&deg;C+ overnight with 6+ hours at 90% humidity
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {a.days.map((d) => (
              <div
                key={d.date}
                className={`p-2.5 border ${d.qualifies ? "border-tomato/40 bg-tomato-bg" : "border-earth/10"} ${d.isToday ? "ring-1 ring-allotment" : ""}`}
              >
                <div className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-earth-lighter">{fmt(d.date)}</div>
                <div className="font-serif text-lg text-earth mt-0.5">{d.minTemp}&deg;</div>
                <div className="font-mono text-[10px] text-earth-light">{d.humidHours}h @90%</div>
                {d.qualifies && <div className="font-mono text-[9px] uppercase text-tomato mt-1">blight day</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
