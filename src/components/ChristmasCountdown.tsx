"use client";

import { useMemo } from "react";
import { daysToChristmas } from "@/data/christmas-plate";

// A botanical wreath drawn in SVG — leaves swept around a ring, a few red
// berries, the day-count at its heart. Festive, but in the plot's own language.
const CENTER = 150;
const LEAF_COUNT = 30;
const GREENS = ["#2D5F3E", "#3D7A52", "#7BB369"];

type Leaf = { x: number; y: number; deg: number; fill: string; rx: number; ry: number };

function buildLeaves(): Leaf[] {
  const leaves: Leaf[] = [];
  for (let i = 0; i < LEAF_COUNT; i++) {
    const a = (i / LEAF_COUNT) * Math.PI * 2 - Math.PI / 2;
    const r = 118 + (i % 2 ? -5 : 4);
    leaves.push({
      x: CENTER + r * Math.cos(a),
      y: CENTER + r * Math.sin(a),
      deg: (a * 180) / Math.PI + 104,
      fill: GREENS[i % GREENS.length],
      rx: i % 3 === 0 ? 6.5 : 8,
      ry: i % 2 ? 19 : 15,
    });
  }
  return leaves;
}

function buildBerries(): { x: number; y: number }[] {
  const spots: { x: number; y: number }[] = [];
  [0.08, 0.34, 0.58, 0.83].forEach((t) => {
    const a = t * Math.PI * 2 - Math.PI / 2;
    const bx = CENTER + 118 * Math.cos(a);
    const by = CENTER + 118 * Math.sin(a);
    [
      [0, 0],
      [7, 4],
      [-4, 7],
    ].forEach(([dx, dy]) => spots.push({ x: bx + dx, y: by + dy }));
  });
  return spots;
}

export default function ChristmasCountdown({ nowISO }: { nowISO: string }) {
  const days = useMemo(() => daysToChristmas(new Date(nowISO)), [nowISO]);
  const leaves = useMemo(buildLeaves, []);
  const berries = useMemo(buildBerries, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px]">
      <style>{`
        @keyframes wreath-in { from { opacity: 0; transform: scale(0.9) rotate(-6deg); } to { opacity: 1; transform: none; } }
        .wreath { animation: wreath-in 0.9s cubic-bezier(0.2,0.7,0.2,1) both; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .wreath { animation: none; } }
      `}</style>

      <svg viewBox="0 0 300 300" className="wreath h-full w-full" role="img"
           aria-label={`${days} days until Christmas dinner`}>
        <defs>
          <radialGradient id="candle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F0DFC4" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FDF6EC" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F5EFE0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* warm centre glow */}
        <circle cx={CENTER} cy={CENTER} r="96" fill="url(#candle)" />
        {/* faint guide ring */}
        <circle cx={CENTER} cy={CENTER} r="118" fill="none" stroke="#3B2F28" strokeOpacity="0.06" strokeWidth="1" />

        {leaves.map((l, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="0"
            rx={l.rx}
            ry={l.ry}
            fill={l.fill}
            transform={`translate(${l.x} ${l.y}) rotate(${l.deg})`}
          />
        ))}
        {berries.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r="3.6" fill="#C9543E" />
        ))}
      </svg>

      {/* the count, crisp HTML over the SVG */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-earth-light">
          Days until
        </span>
        <span
          className="font-serif text-[4.5rem] leading-none text-rust sm:text-[5rem]"
          style={{ textShadow: "0 1px 0 rgba(212,148,58,0.4)" }}
        >
          {days}
        </span>
        <span className="mt-1 max-w-[9rem] font-serif text-base leading-tight text-earth-light">
          Christmas dinner
        </span>
      </div>
    </div>
  );
}
