"use client";

import { useMemo, useState } from "react";
import {
  CHRISTMAS_PLATE,
  daysToChristmas,
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
  "too-late": { label: "Missed for this year", dot: "bg-rust", bg: "bg-tomato-bg", border: "border-rust/30" },
  always: { label: "Any time, indoors", dot: "bg-frost", bg: "bg-frost-bg", border: "border-frost/30" },
  "next-year": { label: "One for spring", dot: "bg-earth-light", bg: "bg-cream", border: "border-earth/10" },
};

function startByLabel(crop: ChristmasCrop): string | null {
  if (!crop.startBy) return null;
  return `${crop.startVerb} by ${crop.startBy.day} ${MONTHS[crop.startBy.month - 1]}`;
}

export default function ChristmasPlate({ nowISO }: { nowISO: string }) {
  const now = useMemo(() => new Date(nowISO), [nowISO]);
  const [onlyDoable, setOnlyDoable] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const days = daysToChristmas(now);
  const rows = useMemo(
    () =>
      CHRISTMAS_PLATE.map((crop) => ({ crop, status: plateStatus(crop, now) })).filter(
        (r) => !onlyDoable || r.status !== "next-year",
      ),
    [now, onlyDoable],
  );

  const showstopper = rows.find((r) => r.crop.showstopper);
  const rest = rows.filter((r) => !r.crop.showstopper);
  const thisYear = rest.filter((r) => r.status !== "next-year");
  const spring = rest.filter((r) => r.status === "next-year");

  return (
    <section className="mx-auto max-w-3xl px-5">
      <style>{`
        @keyframes plate-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .plate-rise { animation: plate-rise 0.6s cubic-bezier(0.2,0.7,0.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .plate-rise { animation: none; } }
      `}</style>

      {/* Countdown */}
      <div className="plate-rise text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-earth-light">
          A What To Sow countdown
        </p>
        <p className="mt-4 font-serif text-earth">
          <span className="block text-lg text-earth-light">Christmas dinner is</span>
          <span
            className="my-1 block text-6xl leading-none text-rust sm:text-7xl"
            style={{ textShadow: "0 1px 0 rgba(212,148,58,0.35)" }}
          >
            {days}
          </span>
          <span className="block text-lg text-earth-light">
            {days === 1 ? "day" : "days"}&nbsp;away — here&rsquo;s what you can still grow for the table
          </span>
        </p>
      </div>

      {/* Filter toggle — a quiet text switch, not a control styled as a control */}
      <div className="mt-8 flex items-center justify-center gap-1 font-mono text-[0.72rem] uppercase tracking-wider">
        {[
          { key: false, label: "The whole plate" },
          { key: true, label: "What I can still grow" },
        ].map((opt) => (
          <button
            key={String(opt.key)}
            onClick={() => setOnlyDoable(opt.key)}
            aria-pressed={onlyDoable === opt.key}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              onlyDoable === opt.key
                ? "bg-earth text-cream"
                : "text-earth-light hover:text-earth"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* The showstopper, featured larger */}
      {showstopper && (
        <PlateCard
          className="mt-8"
          featured
          row={showstopper}
          isOpen={open === showstopper.crop.name}
          onToggle={() => setOpen(open === showstopper.crop.name ? null : showstopper.crop.name)}
          delay={0}
        />
      )}

      {/* This year's plate */}
      {thisYear.length > 0 && (
        <ol className="mt-4 space-y-3">
          {thisYear.map((row, i) => (
            <li key={row.crop.name}>
              <PlateCard
                row={row}
                isOpen={open === row.crop.name}
                onToggle={() => setOpen(open === row.crop.name ? null : row.crop.name)}
                delay={0.05 * (i + 1)}
              />
            </li>
          ))}
        </ol>
      )}

      {/* Honest footnote: the ones you can't rush */}
      {spring.length > 0 && (
        <div className="mt-10 plate-rise">
          <h2 className="font-serif text-xl text-earth">Not this year — but worth the wait</h2>
          <p className="mt-1 text-sm text-earth-light">
            The classics of the Christmas plate are slow growers, sown back in spring. Buy these
            in this year, and pencil them into the seed box for next.
          </p>
          <ol className="mt-4 space-y-3">
            {spring.map((row, i) => (
              <li key={row.crop.name}>
                <PlateCard
                  row={row}
                  isOpen={open === row.crop.name}
                  onToggle={() => setOpen(open === row.crop.name ? null : row.crop.name)}
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

function PlateCard({
  row,
  isOpen,
  onToggle,
  delay,
  featured = false,
  className = "",
}: {
  row: { crop: ChristmasCrop; status: PlateStatus };
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
  featured?: boolean;
  className?: string;
}) {
  const { crop, status } = row;
  const s = STATUS[status];
  const startBy = startByLabel(crop);
  const now = new Date();
  const left = daysToStart(crop, now);

  return (
    <div
      className={`plate-rise rounded-2xl border bg-cream/60 backdrop-blur-[1px] ${s.border} ${
        featured ? "shadow-[0_2px_20px_-8px_rgba(59,47,40,0.35)]" : ""
      } ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start gap-4 p-4 text-left sm:p-5"
      >
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-earth-light">
            {crop.role}
          </p>
          <h3
            className={`mt-1 font-serif text-earth ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}
          >
            {crop.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-medium text-earth ${s.bg} ${s.border}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
              {s.label}
            </span>
            {startBy && status !== "too-late" && (
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-earth-light">
                {startBy}
                {status === "closing" && left !== null && left >= 0 ? ` · ${left}d left` : ""}
              </span>
            )}
          </div>
        </div>
        <span
          className={`mt-1 shrink-0 text-earth-light transition-transform ${isOpen ? "rotate-45" : ""}`}
          aria-hidden
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-5 sm:px-5">
          <p className="max-w-prose text-[0.95rem] leading-relaxed text-earth">{crop.note}</p>
          {crop.href && (
            <a
              href={crop.href}
              className="mt-3 inline-block font-mono text-[0.72rem] uppercase tracking-wider text-rust underline decoration-rust/30 transition-colors hover:text-earth"
            >
              How to grow it →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
