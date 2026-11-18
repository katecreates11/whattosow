"use client";

/**
 * The Glut-o-meter — pick what's piling up on the kitchen table and how much,
 * and it weighs the haul (a hand-drawn dial + trug, not a metric tile) and
 * triages it: eat this week, freeze it, or rescue it into something that keeps.
 * docs/ideas-board.md card 5. Kate's note: "it should have a visual like it's
 * weighing your harvest up".
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import AffiliateLink from "@/components/AffiliateLink";
import {
  GLUT_CROPS,
  GLUT_LEVELS,
  glutReading,
  weightFor,
  type GlutCrop,
  type GlutLevel,
} from "@/data/glut-crops";

const CROP_COLOR: Record<string, string> = {
  courgettes: "#7BB369",
  beans: "#2D5F3E",
  tomatoes: "#C9543E",
  cucumbers: "#4A6B52",
};

const GAUGE_MAX_KG = 12;
const START_DEG = -110;
const SWEEP_DEG = 220;

function needleAngle(totalKg: number): number {
  const ratio = Math.min(1, totalKg / GAUGE_MAX_KG);
  return START_DEG + SWEEP_DEG * ratio;
}

// Rounded to 2dp: Math.sin/cos can differ in the last ULPs between server
// (Node) and client (browser) engines, which React flags as a hydration
// mismatch even though the drawing is visually identical either way.
const r2 = (v: number) => Math.round(v * 100) / 100;

function needleTip(angleDeg: number, cx: number, cy: number, length: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: r2(cx + length * Math.sin(rad)), y: r2(cy - length * Math.cos(rad)) };
}

// Basket interior narrows toward the base — a real trug, not a bucket.
const RIM_Y = 138;
const BASE_Y = 196;
const RIM_HALF_W = 86;
const BASE_HALF_W = 56;
function widthAt(y: number): number {
  const t = (y - RIM_Y) / (BASE_Y - RIM_Y);
  return RIM_HALF_W - (RIM_HALF_W - BASE_HALF_W) * t;
}

interface Piece {
  x: number;
  y: number;
  color: string;
  r: number;
}

// Deterministic "scatter" — pure function of the index, so server and client
// render identically (no Math.random / Date.now in a client-rendered SVG).
function jitter(i: number, salt: number): number {
  const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return v - Math.floor(v) - 0.5; // -0.5..0.5
}

function buildPile(counts: { color: string; count: number }[]): Piece[] {
  const total = counts.reduce((sum, c) => sum + c.count, 0);
  if (total === 0) return [];
  const cap = 18;
  const scale = total > cap ? cap / total : 1;
  const queue: string[] = [];
  const perCrop = counts.map((c) => Math.max(c.count > 0 ? 1 : 0, Math.round(c.count * scale)));
  const maxLen = Math.max(...perCrop, 0);
  for (let i = 0; i < maxLen; i++) {
    counts.forEach((c, ci) => {
      if (i < perCrop[ci]) queue.push(c.color);
    });
  }

  const pieces: Piece[] = [];
  let y = BASE_Y - 9;
  let idx = 0;
  let row = 0;
  while (idx < queue.length && y > RIM_Y + 6) {
    const w = widthAt(y) * 2;
    const perRow = Math.max(2, Math.min(queue.length - idx, Math.floor(w / 17)));
    for (let c = 0; c < perRow && idx < queue.length; c++, idx++) {
      const spread = w - 14;
      const x = 120 - spread / 2 + (spread * (c + 0.5)) / perRow + jitter(idx, 3) * 5;
      pieces.push({
        x: r2(x),
        y: r2(y + jitter(idx, 7) * 3),
        color: queue[idx],
        r: r2(5.5 + jitter(idx, 11) * 1.2),
      });
    }
    y -= 12.5;
    row++;
    if (row > 10) break;
  }
  return pieces;
}

function QuantityPicker({
  crop,
  value,
  onChange,
}: {
  crop: GlutCrop;
  value: GlutLevel;
  onChange: (level: GlutLevel) => void;
}) {
  return (
    <div className="flex flex-wrap justify-end gap-1.5" role="group" aria-label={`${crop.name} — how much?`}>
      {GLUT_LEVELS.map((opt) => (
        <button
          key={opt.level}
          type="button"
          onClick={() => onChange(opt.level)}
          aria-pressed={value === opt.level}
          className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
            value === opt.level
              ? "bg-earth text-cream"
              : "border border-earth/15 text-earth-light hover:border-earth/30 hover:text-earth"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function GlutOMeter() {
  const [levels, setLevels] = useState<Record<string, GlutLevel>>(
    () => Object.fromEntries(GLUT_CROPS.map((c) => [c.slug, "none" as GlutLevel]))
  );

  const active = useMemo(
    () => GLUT_CROPS.filter((c) => levels[c.slug] !== "none"),
    [levels]
  );

  const totalKg = useMemo(
    () => GLUT_CROPS.reduce((sum, c) => sum + weightFor(c, levels[c.slug]), 0),
    [levels]
  );

  const reading = glutReading(totalKg);
  const angle = needleAngle(totalKg);
  const tip = needleTip(angle, 120, 78, 42);
  const offScale = totalKg > GAUGE_MAX_KG;

  const pile = useMemo(
    () =>
      buildPile(
        GLUT_CROPS.map((c) => ({
          color: CROP_COLOR[c.slug],
          count: weightFor(c, levels[c.slug]) * 2.2,
        }))
      ),
    [levels]
  );

  return (
    <div className="mx-auto max-w-2xl">
      {/* The picker — a ruled list, not a chip cloud */}
      <div className="divide-y divide-earth/8 border-t border-earth/8">
        {GLUT_CROPS.map((crop) => (
          <div key={crop.slug} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <span className="font-serif text-lg text-earth">{crop.name}</span>
            <QuantityPicker
              crop={crop}
              value={levels[crop.slug]}
              onChange={(level) => setLevels((prev) => ({ ...prev, [crop.slug]: level }))}
            />
          </div>
        ))}
      </div>

      {/* The scale — a dial that sweeps, and a trug that fills */}
      <div className="mt-10 flex flex-col items-center">
        <svg viewBox="0 0 240 210" className="w-full max-w-[280px]" role="img" aria-hidden="true">
          {/* dial */}
          <circle cx={120} cy={78} r={52} fill="var(--color-cream)" stroke="rgba(59,47,40,0.18)" strokeWidth={1.5} />
          {Array.from({ length: 9 }).map((_, i) => {
            const a = START_DEG + (SWEEP_DEG * i) / 8;
            const outer = needleTip(a, 120, 78, 50);
            const inner = needleTip(a, 120, 78, 43);
            return (
              <line
                key={i}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="rgba(59,47,40,0.35)"
                strokeWidth={i === 0 || i === 8 ? 1.6 : 1}
              />
            );
          })}
          <line
            x1={120}
            y1={78}
            x2={tip.x}
            y2={tip.y}
            stroke="var(--color-rust)"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={120} cy={78} r={4.5} fill="var(--color-earth)" />
          <text x={120} y={40} textAnchor="middle" fontSize={7} fontFamily="monospace" fontWeight={700} letterSpacing={1} fill="rgba(59,47,40,0.55)">
            EMPTY
          </text>
          <text x={196} y={112} textAnchor="middle" fontSize={7} fontFamily="monospace" fontWeight={700} letterSpacing={0.5} fill="rgba(59,47,40,0.55)">
            DROWNING
          </text>

          {/* stem */}
          <rect x={116} y={126} width={8} height={12} fill="rgba(59,47,40,0.25)" />

          {/* trug */}
          <defs>
            <clipPath id="glutBasket">
              <path
                d={`M ${120 - RIM_HALF_W} ${RIM_Y} L ${120 + RIM_HALF_W} ${RIM_Y} L ${120 + BASE_HALF_W} ${BASE_Y} L ${120 - BASE_HALF_W} ${BASE_Y} Z`}
              />
            </clipPath>
          </defs>
          <path
            d={`M ${120 - RIM_HALF_W} ${RIM_Y} L ${120 + RIM_HALF_W} ${RIM_Y} L ${120 + BASE_HALF_W} ${BASE_Y} L ${120 - BASE_HALF_W} ${BASE_Y} Z`}
            fill="var(--color-cream)"
            stroke="rgba(59,47,40,0.3)"
            strokeWidth={1.5}
          />
          {/* woven-trug hatch */}
          <g clipPath="url(#glutBasket)" opacity={0.35} stroke="rgba(59,47,40,0.4)" strokeWidth={0.7}>
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={i} x1={64 + i * 18.5} y1={RIM_Y} x2={64 + i * 18.5 - 12} y2={BASE_Y} />
            ))}
          </g>
          <ellipse cx={120} cy={RIM_Y} rx={RIM_HALF_W} ry={6} fill="none" stroke="rgba(59,47,40,0.3)" strokeWidth={1.5} />

          {/* the pile itself */}
          <g clipPath="url(#glutBasket)">
            {pile.map((p, i) => (
              <ellipse key={i} cx={p.x} cy={p.y} rx={p.r} ry={p.r * 0.82} fill={p.color} opacity={0.92} />
            ))}
          </g>
        </svg>

        {/* the sentence, then the number — never the other way round */}
        <div className="mt-2 max-w-sm text-center" aria-live="polite">
          <p className="font-serif text-lg text-earth leading-snug">{reading.sentence}</p>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-earth-lighter">
            ~{totalKg.toFixed(1)}kg · {reading.label}
            {offScale ? " · off the scale" : ""}
          </p>
        </div>
      </div>

      {/* the triage */}
      {active.length > 0 && (
        <div className="mt-12 divide-y divide-earth/8 border-t border-earth/8">
          {active.map((crop) => (
            <div key={crop.slug} className="py-6">
              <Link href={crop.cropHref} className="font-serif text-xl text-earth hover:text-rust transition-colors">
                {crop.name}
              </Link>
              <p className="mt-2 max-w-[58ch] text-earth-light leading-relaxed">
                {crop.eatNow} {crop.freeze ?? crop.preserve}
                {crop.freeze ? ` ${crop.preserve}` : ""}
              </p>
              {crop.kit && (
                <AffiliateLink
                  href={crop.kit.url}
                  product={crop.kit.product}
                  type="gear"
                  merchant="amazon-uk"
                  position={`glut-o-meter-${crop.slug}`}
                  className="mt-3 inline-block font-serif italic text-rust border-b border-rust/30 pb-0.5 hover:text-earth transition-colors"
                >
                  {crop.kit.label} →
                </AffiliateLink>
              )}
            </div>
          ))}
          <div className="py-6">
            <p className="max-w-[58ch] text-earth-light leading-relaxed">
              Whatever's left over the freezer and the store cupboard, a basket of just-picked veg by the back
              gate is the best gift most neighbours get all year — gluts are how growers make friends.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
