"use client";

import { useEffect, useState } from "react";
import { loadLocation } from "@/lib/location-storage";
import { getSunTimes, formatDaylight, formatTime, UK_DEFAULT_LAT, UK_DEFAULT_LNG } from "@/lib/astronomy";
import { summerSolstice } from "@/lib/solstice";

/**
 * The personalised sun arc for the longest day. The sun rises at the visitor's
 * actual sunrise, climbs over, and sets at their actual sunset — so the lit
 * span literally widens the further north you are. The exact daylight figure is
 * the centrepiece: the site's "where you are changes everything" DNA, animated.
 *
 * SMIL motion, gated off when the visitor prefers reduced motion (sun parks at
 * solar noon instead).
 */

const W = 800;
const HORIZON = 196;
const APEX = 54;
const PAD = 48;

/** map an hour-of-day (0–24) to an x coordinate */
function hourX(h: number): number {
  return PAD + (h / 24) * (W - PAD * 2);
}

export default function DaylightArc() {
  const [data, setData] = useState<{
    place: string | null;
    daylight: string;
    sunriseT: string;
    sunsetT: string;
    x1: number;
    x2: number;
    mid: number;
  } | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const update = () => {
      const loc = loadLocation();
      const lat = loc?.latitude ?? UK_DEFAULT_LAT;
      const lng = loc?.longitude ?? UK_DEFAULT_LNG;
      const t = getSunTimes(summerSolstice(), lat, lng);
      const srH = t.sunrise.getHours() + t.sunrise.getMinutes() / 60;
      const ssH = t.sunset.getHours() + t.sunset.getMinutes() / 60;
      const x1 = hourX(srH);
      const x2 = hourX(ssH);
      setData({
        place: loc?.adminDistrict ?? null,
        daylight: formatDaylight(t.daylightMinutes),
        sunriseT: formatTime(t.sunrise),
        sunsetT: formatTime(t.sunset),
        x1,
        x2,
        mid: (x1 + x2) / 2,
      });
    };
    update();
    window.addEventListener("whattosow:location-updated", update);
    return () => window.removeEventListener("whattosow:location-updated", update);
  }, []);

  if (!data) {
    return <div className="border border-earth/12 bg-cream" style={{ minHeight: 270 }} aria-hidden="true" />;
  }

  const { x1, x2, mid } = data;
  // control point gives an apex at y≈APEX for a quadratic curve
  const ctrlY = 2 * APEX - HORIZON;
  const arc = `M ${x1} ${HORIZON} Q ${mid} ${ctrlY} ${x2} ${HORIZON}`;

  return (
    <figure className="my-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment block mb-3">
        {data.place ? `Your longest day · ${data.place}` : "Your longest day · the UK average"}
      </span>
      <div className="border border-earth/12 overflow-hidden">
        <svg viewBox="0 0 800 208" className="w-full h-auto block" role="img"
          aria-label={`On the longest day, ${data.place ?? "the middle of the UK"} gets ${data.daylight} of daylight, from sunrise at ${data.sunriseT} to sunset at ${data.sunsetT}.`}>
          <defs>
            {/* The sky shifts through the day as the sun crosses: pre-dawn →
                dawn → bright midday → sunset → dusk, animated in sync with the
                sun's 9s arc. Static bright day under prefers-reduced-motion. */}
            <linearGradient id="livesky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8fb3c4">
                {!reduced && (
                  <animate
                    attributeName="stop-color"
                    dur="9s"
                    repeatCount="indefinite"
                    keyTimes="0;0.08;0.28;0.55;0.78;0.92;1"
                    values="#283a40;#6e5663;#8fb3c4;#8fb3c4;#c98e5a;#9c4438;#283a40"
                  />
                )}
              </stop>
              <stop offset="100%" stopColor="#eae6d2">
                {!reduced && (
                  <animate
                    attributeName="stop-color"
                    dur="9s"
                    repeatCount="indefinite"
                    keyTimes="0;0.08;0.28;0.55;0.78;0.92;1"
                    values="#36474a;#c98a6e;#dccfb4;#eae6d2;#e8b878;#c75a3a;#36474a"
                  />
                )}
              </stop>
            </linearGradient>
          </defs>

          {/* sky + a thin grounding band at the horizon */}
          <rect x="0" y="0" width={W} height={HORIZON} fill="url(#livesky)" />
          <rect x="0" y={HORIZON} width={W} height={208 - HORIZON} fill="#3B2F28" />
          <path d={`${arc} Z`} fill="#ffffff" opacity="0.08" />
          <line x1="0" y1={HORIZON} x2={W} y2={HORIZON} stroke="#000000" strokeOpacity="0.25" strokeWidth="1.5" />

          {/* the sun's path */}
          <path d={arc} fill="none" stroke="#F4C878" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.45" />

          {/* sunrise / sunset tick marks (times are in the readout band below) */}
          <line x1={x1} y1={HORIZON - 8} x2={x1} y2={HORIZON + 4} stroke="#F5EFE0" strokeOpacity="0.6" strokeWidth="1.5" />
          <line x1={x2} y1={HORIZON - 8} x2={x2} y2={HORIZON + 4} stroke="#F5EFE0" strokeOpacity="0.6" strokeWidth="1.5" />

          {/* the sun — flat amber disc with gently rotating rays (matches SunPathDemo) */}
          {reduced ? (
            <g transform={`translate(${mid} ${APEX})`}>
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1="0" y1="-15" x2="0" y2="-21" stroke="#D4943A" strokeWidth="2" strokeLinecap="round" transform={`rotate(${i * 45})`} />
              ))}
              <circle r="13" fill="#D4943A" stroke="#B87A22" strokeWidth="1" />
            </g>
          ) : (
            <g>
              <g>
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={i} x1="0" y1="-15" x2="0" y2="-21" stroke="#D4943A" strokeWidth="2" strokeLinecap="round" transform={`rotate(${i * 45})`} />
                ))}
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="24s" repeatCount="indefinite" />
              </g>
              <circle r="13" fill="#D4943A" stroke="#B87A22" strokeWidth="1" />
              <animateMotion dur="9s" repeatCount="indefinite" path={arc} />
              <animate attributeName="opacity" dur="9s" repeatCount="indefinite" values="0;1;1;1;0" keyTimes="0;0.06;0.5;0.94;1" />
            </g>
          )}
        </svg>

        {/* Readout — HTML, so the figures stay legible at any width (incl. mobile) */}
        <div className="flex items-stretch bg-earth text-[#F5EFE0] divide-x divide-white/10">
          <div className="flex-1 px-2 sm:px-4 py-3 text-center">
            <div className="font-mono text-sm sm:text-base">{data.sunriseT}</div>
            <div className="font-mono text-[9px] tracking-[0.14em] text-[#F5EFE0]/55 mt-1">SUNRISE</div>
          </div>
          <div className="flex-[1.5] px-2 sm:px-4 py-3 text-center">
            <div className="font-serif text-[26px] sm:text-4xl leading-none">{data.daylight}</div>
            <div className="font-mono text-[9px] tracking-[0.18em] text-[#F5EFE0]/55 mt-1.5">OF DAYLIGHT</div>
          </div>
          <div className="flex-1 px-2 sm:px-4 py-3 text-center">
            <div className="font-mono text-sm sm:text-base">{data.sunsetT}</div>
            <div className="font-mono text-[9px] tracking-[0.14em] text-[#F5EFE0]/55 mt-1">SUNSET</div>
          </div>
        </div>
      </div>
      {!data.place && (
        <figcaption className="mt-3 text-sm text-earth-light">
          That&apos;s the middle of the country.{" "}
          <a href="/#main-content" className="text-rust underline decoration-rust/30 hover:text-earth transition-colors">Add your postcode</a>{" "}
          — watch the arc stretch as you go north.
        </figcaption>
      )}
    </figure>
  );
}
