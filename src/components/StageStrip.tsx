import { Fragment } from "react";

/**
 * The season's arc, shown in fixed order (01 Sow · 02 Plant out · 03 Harvest)
 * with the current lead job highlighted and per-stage crop counts. The job
 * SECTIONS below reorder by priority; this strip stays in calendar order so it
 * also teaches the sequence and doubles as in-page nav. Stages with no crops sit
 * muted.
 */

type JobId = "sow" | "plantout" | "harvest";

const STAGES: { id: JobId; num: string; label: string; href: string }[] = [
  { id: "sow", num: "01", label: "Sow", href: "#sow" },
  { id: "plantout", num: "02", label: "Plant out", href: "#plant-out" },
  { id: "harvest", num: "03", label: "Harvest", href: "#harvest" },
];

export default function StageStrip({
  counts,
  leadJob,
}: {
  counts: Record<JobId, number>;
  leadJob?: JobId;
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 flex-wrap pb-3 mb-10 border-b border-earth/10">
      {STAGES.map((s, i) => {
        const count = counts[s.id];
        const lead = leadJob === s.id;
        const muted = count === 0;
        return (
          <Fragment key={s.id}>
            {i > 0 && (
              <span
                aria-hidden="true"
                className="hidden sm:block flex-1 h-px min-w-[24px]"
                style={{ background: "repeating-linear-gradient(90deg,rgba(59,47,40,.22) 0 6px,transparent 6px 12px)" }}
              />
            )}
            <a
              href={count > 0 ? s.href : undefined}
              className={`flex items-center gap-2 ${muted ? "opacity-40 pointer-events-none" : ""}`}
            >
              <span
                className={`font-mono text-[11px] tracking-[0.1em] ${lead ? "bg-amber text-white px-1.5 py-0.5" : "text-earth-lighter"}`}
              >
                {s.num}
              </span>
              <span
                className={`font-mono text-[11px] tracking-[0.16em] uppercase ${lead ? "text-earth border-b-2 border-amber pb-0.5 font-medium" : "text-earth-light"}`}
              >
                {s.label}
              </span>
              {count > 0 && <span className="font-mono text-[10px] text-earth-lighter">&middot; {count}</span>}
            </a>
          </Fragment>
        );
      })}
    </div>
  );
}
