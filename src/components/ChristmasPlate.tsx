"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import AffiliateLink from "@/components/AffiliateLink";
import {
  CHRISTMAS_PLATE,
  daysToStart,
  plateStatus,
  type ChristmasCrop,
  type PlateStatus,
} from "@/data/christmas-plate";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Dark labels + a colour-coded dot keeps every pill above WCAG AA on the tint.
const STATUS: Record<PlateStatus, { label: string; dot: string; bg: string; border: string }> = {
  "start-now": { label: "Still time", dot: "bg-allotment", bg: "bg-allotment-bg", border: "border-allotment/25" },
  closing: { label: "Window closing", dot: "bg-amber", bg: "bg-amber-bg", border: "border-amber/40" },
  "too-late": { label: "Just missed", dot: "bg-rust", bg: "bg-tomato-bg", border: "border-rust/30" },
  always: { label: "Any time, indoors", dot: "bg-frost", bg: "bg-frost-bg", border: "border-frost/30" },
  "next-year": { label: "One for spring", dot: "bg-earth-light", bg: "bg-cream", border: "border-earth/10" },
};

function startByLabel(crop: ChristmasCrop): string | null {
  if (!crop.startBy) return null;
  return `${crop.startVerb} by ${crop.startBy.day} ${MONTHS[crop.startBy.month - 1]}`;
}

export function christmasAffiliateMerchant(url: string): string {
  if (url.includes("amazon.com/")) return "amazon-us";
  if (url.includes("amazon.")) return "amazon-uk";
  if (url.includes("suttons")) return "suttons";
  try {
    return new URL(url).hostname.replace(/^www\./, "").split(".")[0];
  } catch {
    return "other";
  }
}
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function christmasAffiliatePosition(cropName: string, kind: "seeds" | "kit"): string {
  return `christmas-plate-${kind}-${slugify(cropName)}`;
}

export function christmasSeedCtaLabel(url: string): string {
  const merchant = christmasAffiliateMerchant(url);
  if (merchant === "suttons") return "Seeds at Suttons";
  if (merchant === "thompson-morgan") return "Seeds at T&M";
  return "Seeds for this crop";
}

type Row = { crop: ChristmasCrop; status: PlateStatus; left: number | null };

export default function ChristmasPlate({ nowISO }: { nowISO: string }) {
  const now = useMemo(() => new Date(nowISO), [nowISO]);
  const [onlyDoable, setOnlyDoable] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  // "Plant now" is sorted by urgency — tightest window first — so the job to do
  // today sits at the very top.
  const { plantNow, anytime, notThisYear } = useMemo(() => {
    const rows: Row[] = CHRISTMAS_PLATE.map((crop) => ({
      crop,
      status: plateStatus(crop, now),
      left: daysToStart(crop, now),
    }));
    const plantNow = rows
      .filter((r) => r.status === "start-now" || r.status === "closing")
      .sort((a, b) => (a.left ?? 9999) - (b.left ?? 9999));
    const anytime = rows.filter((r) => r.status === "always");
    const notThisYear = rows.filter((r) => r.status === "next-year" || r.status === "too-late");
    return { plantNow, anytime, notThisYear };
  }, [now]);

  const lead = plantNow[0];
  const restNow = plantNow.slice(1);
  const toggle = (name: string) => setOpen(open === name ? null : name);

  return (
    <section className="mx-auto max-w-3xl px-5">
      <style>{`
        @keyframes plate-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .plate-rise { animation: plate-rise 0.6s cubic-bezier(0.2,0.7,0.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .plate-rise { animation: none; } }
      `}</style>

      {/* The single most pressing job — a mono ticker, Graza-style */}
      {lead && (
        <div className="plate-rise mx-auto flex max-w-xl items-center justify-center gap-3 rounded-full border border-allotment/25 bg-allotment-bg px-5 py-2.5 text-center">
          <span className="h-2 w-2 shrink-0 rounded-full bg-allotment" aria-hidden />
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.15em] text-earth">
            Do this now · {lead.crop.startVerb} {lead.crop.name} by{" "}
            {lead.crop.startBy!.day} {MONTHS[lead.crop.startBy!.month - 1]}
            {lead.left !== null ? ` · ${lead.left} days left` : ""}
          </span>
        </div>
      )}

      {/* Filter toggle — a quiet text switch, not a control styled as a control */}
      <div className="mt-7 flex items-center justify-center gap-1 font-mono text-[0.72rem] uppercase tracking-wider">
        {[
          { key: false, label: "The whole plate" },
          { key: true, label: "Only what I can still grow" },
        ].map((opt) => (
          <button
            key={String(opt.key)}
            onClick={() => setOnlyDoable(opt.key)}
            aria-pressed={onlyDoable === opt.key}
            className={`rounded-full px-3.5 py-1.5 transition-colors ${
              onlyDoable === opt.key ? "bg-earth text-cream" : "text-earth-light hover:text-earth"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* PLANT NOW — the actionable stuff, most urgent first */}
      {plantNow.length > 0 && (
        <div className="mt-12">
          <SectionHead
            eyebrow="Start these first"
            title="Plant now"
            note="Ordered by how soon the window shuts — the top one is the most pressing."
          />
          {lead && (
            <PlateCard
              className="mt-6"
              featured
              row={lead}
              isOpen={open === lead.crop.name}
              onToggle={() => toggle(lead.crop.name)}
              delay={0}
            />
          )}
          {restNow.length > 0 && (
            <ol className="mt-3 space-y-3">
              {restNow.map((row, i) => (
                <li key={row.crop.name}>
                  <PlateCard
                    row={row}
                    isOpen={open === row.crop.name}
                    onToggle={() => toggle(row.crop.name)}
                    delay={0.05 * (i + 1)}
                  />
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {/* ANY TIME — the windowsill jobs */}
      {anytime.length > 0 && (
        <div className="mt-14">
          <SectionHead
            eyebrow="No rush"
            title="Any time, on the windowsill"
            note="A bright sill and a fortnight is all these need — do them whenever."
          />
          <ol className="mt-6 space-y-3">
            {anytime.map((row, i) => (
              <li key={row.crop.name}>
                <PlateCard
                  row={row}
                  isOpen={open === row.crop.name}
                  onToggle={() => toggle(row.crop.name)}
                  delay={0.05 * (i + 1)}
                />
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* NOT THIS YEAR — the honest bit */}
      {!onlyDoable && notThisYear.length > 0 && (
        <div className="mt-14">
          <SectionHead
            eyebrow="Worth the wait"
            title="Not this year"
            note="The classics of the plate are slow, spring-sown crops. Buy these in this year, and pencil them into the seed box for next."
          />
          <ol className="mt-6 space-y-3">
            {notThisYear.map((row, i) => (
              <li key={row.crop.name}>
                <PlateCard
                  row={row}
                  isOpen={open === row.crop.name}
                  onToggle={() => toggle(row.crop.name)}
                  delay={0.05 * (i + 1)}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}

function SectionHead({ eyebrow, title, note }: { eyebrow: string; title: string; note: string }) {
  return (
    <div className="plate-rise">
      <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-allotment">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-3xl tracking-tight text-earth sm:text-4xl">{title}</h2>
      <p className="mt-2 max-w-[54ch] text-earth-light leading-relaxed">{note}</p>
    </div>
  );
}

function AffiliateRow({ crop }: { crop: ChristmasCrop }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
      {crop.seedUrl && (
        <AffiliateLink
          href={crop.seedUrl}
          product={crop.name}
          type="seed"
          merchant={christmasAffiliateMerchant(crop.seedUrl)}
          position={christmasAffiliatePosition(crop.name, "seeds")}
          className="inline-flex items-center gap-1.5 rounded-full bg-allotment px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-cream transition-colors hover:bg-allotment-dark"
        >
          {christmasSeedCtaLabel(crop.seedUrl)} →
        </AffiliateLink>
      )}
      {crop.kit && (
        <AffiliateLink
          href={crop.kit.url}
          product={`${crop.name} ${crop.kit.label}`}
          type="gear"
          merchant={christmasAffiliateMerchant(crop.kit.url)}
          position={christmasAffiliatePosition(crop.name, "kit")}
          className="font-mono text-[0.7rem] uppercase tracking-wider text-earth-light underline decoration-earth/20 transition-colors hover:text-earth"
        >
          {crop.kit.label} →
        </AffiliateLink>
      )}
      {crop.href && (
        <a
          href={crop.href}
          className="font-mono text-[0.7rem] uppercase tracking-wider text-rust underline decoration-rust/30 transition-colors hover:text-earth"
        >
          How to grow it →
        </a>
      )}
    </div>
  );
}

function PlateCard({
  row,
  isOpen,
  onToggle,
  delay,
  featured = false,
  className = "",
}: {
  row: Row;
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
  featured?: boolean;
  className?: string;
}) {
  const { crop, status, left } = row;
  const s = STATUS[status];
  const startBy = startByLabel(crop);

  return (
    <div
      className={`plate-rise overflow-hidden rounded-2xl border bg-cream/60 ${s.border} ${
        featured ? "shadow-[0_3px_28px_-10px_rgba(59,47,40,0.4)]" : ""
      } ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {featured && crop.img && (
        <div className="relative h-48 w-full sm:h-60">
          <Image
            src={crop.img}
            alt={crop.imgAlt ?? crop.name}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-earth/20 to-transparent" aria-hidden />
        </div>
      )}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start gap-4 p-4 text-left sm:p-5"
      >
        {!featured &&
          (crop.img ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
              <Image src={crop.img} alt={crop.imgAlt ?? crop.name} fill sizes="96px" className="object-cover" />
            </div>
          ) : (
            <div className="h-20 w-20 shrink-0 rounded-xl bg-sage/50 sm:h-24 sm:w-24" aria-hidden />
          ))}
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-earth-light">
            {crop.role}
          </p>
          <h3 className={`mt-1 font-serif text-earth ${featured ? "text-3xl sm:text-4xl" : "text-xl"}`}>
            {crop.name}
          </h3>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-medium text-earth ${s.bg} ${s.border}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
              {s.label}
            </span>
            {startBy && status !== "too-late" && (
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-earth-light">
                {startBy}
                {left !== null && left >= 0 ? ` · ${left}d left` : ""}
              </span>
            )}
          </div>
        </div>
        <span
          className={`mt-1 shrink-0 text-xl text-earth-light transition-transform ${isOpen ? "rotate-45" : ""}`}
          aria-hidden
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-5 sm:px-5">
          <p className={`max-w-prose leading-relaxed text-earth ${featured ? "text-base" : "text-[0.95rem]"}`}>
            {crop.note}
          </p>
          <AffiliateRow crop={crop} />
        </div>
      )}
    </div>
  );
}
