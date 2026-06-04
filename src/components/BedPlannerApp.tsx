"use client";

import { useEffect, useState } from "react";
import BedPlate from "@/components/BedPlate";
import GearPick, { AffiliateDisclosure } from "@/components/GearPick";
import { plannerCrops, FAMILY_LABEL, type Family } from "@/data/planner-crops";
import { generatePlan, BED_SIZES, type SizeKey, type Plan } from "@/lib/bed-planner";
import type { Dir } from "@/components/BedPlate";

const TAG = "whattosow21-21";
const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=${TAG}`;
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const FAMILY_ORDER: Family[] = ["legume", "brassica", "allium", "solanaceae", "root", "chenopod", "cucurbit", "salad", "flower"];
const NORTHS: { dir: Dir; label: string }[] = [
  { dir: "top", label: "↑ Top" },
  { dir: "right", label: "→ Right" },
  { dir: "bottom", label: "↓ Bottom" },
  { dir: "left", label: "← Left" },
];

function SeasonBar({ sow, harvest }: { sow: number[]; harvest: number[] }) {
  return (
    <div className="flex gap-[2px]">
      {MONTHS.map((m, i) => {
        const isH = harvest.includes(i);
        const isS = sow.includes(i);
        const bg = isH ? "bg-amber" : isS ? "bg-leaf" : "bg-earth/8";
        const fg = isH || isS ? "text-white" : "text-earth-lighter";
        return <span key={i} className={`${bg} ${fg} text-[9px] font-mono w-4 h-4 flex items-center justify-center rounded-[2px]`}>{m}</span>;
      })}
    </div>
  );
}

const STORE = "wts-bed-plan-v1";

export default function BedPlannerApp() {
  const [numBeds, setNumBeds] = useState(4);
  const [sizeKey, setSizeKey] = useState<SizeKey>("standard");
  const [north, setNorth] = useState<Dir>("top");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [plan, setPlan] = useState<Plan | null>(null);
  const [seed, setSeed] = useState(1);

  // restore the last plan + inputs
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.numBeds) setNumBeds(s.numBeds);
        if (s.sizeKey) setSizeKey(s.sizeKey);
        if (s.north) setNorth(s.north);
        if (Array.isArray(s.selected)) setSelected(new Set(s.selected));
        if (s.plan) setPlan(s.plan);
        if (s.seed) setSeed(s.seed);
      }
    } catch {}
  }, []);

  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const make = (newSeed: number) => {
    const p = generatePlan({ numBeds, sizeKey, north, cropSlugs: [...selected], seed: newSeed });
    setPlan(p);
    setSeed(newSeed);
    try {
      localStorage.setItem(STORE, JSON.stringify({ numBeds, sizeKey, north, selected: [...selected], plan: p, seed: newSeed }));
    } catch {}
  };

  const grouped = FAMILY_ORDER.map((fam) => ({ fam, crops: plannerCrops.filter((c) => c.family === fam) })).filter((g) => g.crops.length);
  const vegCount = [...selected].filter((s) => !plannerCrops.find((c) => c.slug === s)?.flower).length;

  return (
    <div>
      {/* ── Controls ───────────────────────────────────────────── */}
      <div className="print:hidden">
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {/* beds */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-allotment block mb-2">How many beds?</span>
            <div className="inline-flex items-center border border-earth/15">
              <button onClick={() => setNumBeds((n) => Math.max(1, n - 1))} className="w-10 h-10 text-xl text-earth hover:bg-sage/40" aria-label="Fewer beds">−</button>
              <span className="w-12 text-center font-serif text-xl text-earth tabular-nums">{numBeds}</span>
              <button onClick={() => setNumBeds((n) => Math.min(8, n + 1))} className="w-10 h-10 text-xl text-earth hover:bg-sage/40" aria-label="More beds">+</button>
            </div>
          </div>
          {/* size */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-allotment block mb-2">Bed size</span>
            <div className="flex flex-col gap-1.5">
              {(Object.keys(BED_SIZES) as SizeKey[]).map((k) => (
                <button key={k} onClick={() => setSizeKey(k)} className={`text-left text-sm px-3 py-1.5 border transition-colors ${sizeKey === k ? "border-allotment bg-sage/40 text-earth" : "border-earth/15 text-earth-light hover:border-earth/30"}`}>
                  {BED_SIZES[k].label}
                </button>
              ))}
            </div>
          </div>
          {/* north */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-allotment block mb-2">Which way is north?</span>
            <div className="grid grid-cols-2 gap-1.5">
              {NORTHS.map((n) => (
                <button key={n.dir} onClick={() => setNorth(n.dir)} className={`text-sm px-3 py-1.5 border transition-colors ${north === n.dir ? "border-allotment bg-sage/40 text-earth" : "border-earth/15 text-earth-light hover:border-earth/30"}`}>
                  {n.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-earth-lighter mt-1.5 leading-snug">We&apos;ll put tall crops on the north side so they don&apos;t shade the rest.</p>
          </div>
        </div>

        {/* crops */}
        <div className="mb-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-allotment block mb-3">What do you want to grow? <span className="text-earth-lighter">· {selected.size} chosen</span></span>
          <div className="space-y-4">
            {grouped.map((g) => (
              <div key={g.fam}>
                <span className="text-xs text-earth-lighter block mb-1.5">{FAMILY_LABEL[g.fam]}</span>
                <div className="flex flex-wrap gap-1.5">
                  {g.crops.map((c) => {
                    const on = selected.has(c.slug);
                    return (
                      <button key={c.slug} onClick={() => toggle(c.slug)} className={`inline-flex items-center gap-1.5 text-sm px-2.5 py-1 border transition-colors ${on ? "border-allotment bg-allotment text-cream" : "border-earth/15 text-earth hover:border-earth/40"}`}>
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: on ? "rgba(255,255,255,0.7)" : c.color }} />
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-12">
          <button onClick={() => make(Math.floor(Math.random() * 1e9))} disabled={vegCount === 0} className="font-mono text-[12px] uppercase tracking-[0.08em] text-cream bg-allotment px-6 py-3 hover:bg-allotment-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            {plan ? "Re-plan" : "Generate my plan"}
          </button>
          {plan && (
            <button onClick={() => make(Math.floor(Math.random() * 1e9))} className="font-mono text-[12px] uppercase tracking-[0.08em] text-allotment border border-allotment px-5 py-3 hover:bg-sage/40 transition-colors">
              Shuffle ↻
            </button>
          )}
          {vegCount === 0 && <span className="text-sm text-earth-lighter">Pick a few crops to begin.</span>}
        </div>
      </div>

      {/* ── Plan ───────────────────────────────────────────────── */}
      {plan && (
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-6 print:hidden">
            <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight">Your planting plan</h2>
            <button onClick={() => window.print()} className="font-mono text-[11px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">Print this plan ⎙</button>
          </div>

          {plan.warnings.map((w, i) => (
            <p key={i} className="text-sm text-earth bg-amber/15 border border-amber/30 px-4 py-2.5 mb-4">{w}</p>
          ))}

          <div className="space-y-14">
            {plan.beds.map((bed, bi) => (
              <section key={bi} className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                <div className="pt-2">
                  <BedPlate label={`${bed.label} · ${bed.rows.length} crops`} drifts={bed.drifts} north={bed.north} widthLabel={bed.widthLabel} lengthLabel={bed.lengthLabel} />
                </div>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-allotment mb-3">What&apos;s in {bed.label.toLowerCase()}</h3>
                  <div className="space-y-3 mb-5">
                    {bed.rows.map((r) => (
                      <div key={r.name} className="grid sm:grid-cols-[1fr_auto] gap-1.5 sm:gap-5 items-start border-b border-earth/8 pb-3">
                        <div>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} /><span className="font-serif text-[17px] text-earth">{r.name}</span></span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-earth-lighter">{r.spacingCm}cm · ≈{r.realCount} plants · {r.sun === "full" ? "full sun" : "part shade"}</span>
                          </div>
                        </div>
                        <div className="sm:justify-self-end"><SeasonBar sow={r.sow} harvest={r.harvest} /></div>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-1.5">
                    {bed.notes.map((n, i) => (
                      <li key={i} className="text-[13px] text-earth-light leading-snug border-l-2 border-leaf/40 pl-3">{n}</li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-8 text-[11px] text-earth-lighter">
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-[2px] bg-leaf" /> Sow</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-[2px] bg-amber" /> Harvest</span>
            <span>· counts &amp; spacing are for the bed size you chose</span>
          </div>

          {/* kit */}
          <section className="border-t border-earth/12 mt-12 pt-8">
            <div className="font-serif italic text-lg text-allotment mb-2">kit for this plan</div>
            <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-3">What you&apos;ll need to plant it</h2>
            <p className="text-earth-light max-w-[52ch] mb-6 leading-relaxed text-sm">Picked from what you&apos;re growing. Buy through these and a little goes towards the allotment shed.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {plan.kit.map((k) => (
                <GearPick key={k.name} name={k.name} price="" badge="our-pick" amazonUrl={az(k.query)} description={k.why} />
              ))}
            </div>
            <div className="mt-8"><AffiliateDisclosure /></div>
          </section>
        </div>
      )}
    </div>
  );
}
