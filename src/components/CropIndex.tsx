import { crops as allCrops, type Crop } from "@/data/crops";
import { MONTH_NAMES } from "@/lib/calendar";
import { cropWindows, ukAverageFrost } from "@/lib/crop-windows";
import { getCropStatus } from "@/lib/season-core";

const FRUIT_SLUGS = new Set([
  "strawberries",
  "raspberries",
  "blackberries",
  "gooseberries",
  "blackcurrants",
  "redcurrants",
  "rhubarb",
]);

const GROUPS = [
  {
    key: "hardy",
    label: "Hardy",
    note: "sow from late winter",
    dotClass: "text-leaf",
    match: (crop: Crop) => crop.category === "hardy" && !FRUIT_SLUGS.has(crop.slug),
  },
  {
    key: "half-hardy",
    label: "Half-hardy",
    note: "sow as the soil warms",
    dotClass: "text-amber-dark",
    match: (crop: Crop) => crop.category === "half-hardy" && !FRUIT_SLUGS.has(crop.slug),
  },
  {
    key: "tender",
    label: "Tender",
    note: "sow indoors, out after the frosts",
    dotClass: "text-rust",
    match: (crop: Crop) => crop.category === "tender" && !FRUIT_SLUGS.has(crop.slug),
  },
  {
    key: "fruit",
    label: "Fruit",
    note: "plant once, pick for years",
    dotClass: "text-allotment",
    match: (crop: Crop) => FRUIT_SLUGS.has(crop.slug),
  },
];

type TagTone = "closing" | "sow" | "plant" | "wait";

interface CropRow {
  crop: Crop;
  no: number;
  tag: string;
  tone: TagTone;
  isLive: boolean;
}

function specimenNumber(crop: Crop): number {
  return allCrops.findIndex((entry) => entry.slug === crop.slug) + 1;
}

function shortMonth(month: number): string {
  return MONTH_NAMES[month].slice(0, 3).toLowerCase();
}

function monthRange(openAt: Date, closeAt: Date): string {
  const open = shortMonth(openAt.getMonth());
  const close = shortMonth(closeAt.getMonth());
  return open === close ? open : `${open}–${close}`;
}

function fallbackWindow(crop: Crop, frostDate: Date): string {
  const windows = cropWindows(crop, new Date(frostDate.getFullYear(), 6, 1), frostDate);
  const sowing = windows.find((window) => window.isSowing);
  if (sowing) return `sow ${monthRange(sowing.openAt, sowing.closeAt)}`;

  const planting = windows.find((window) => window.action === "plant out");
  if (planting) return `plant ${monthRange(planting.openAt, planting.closeAt)}`;

  return "wait";
}

function cropTag(crop: Crop, now: Date, frostDate: Date): Pick<CropRow, "tag" | "tone" | "isLive"> {
  const status = getCropStatus(crop, frostDate, now);

  if (status.state === "closing") {
    return { tag: "last chance", tone: "closing", isLive: true };
  }

  if (status.state === "now") {
    if (status.method === "plant out") {
      return { tag: "plant out now", tone: "plant", isLive: true };
    }
    return { tag: "sow now", tone: "sow", isLive: true };
  }

  return { tag: fallbackWindow(crop, frostDate), tone: "wait", isLive: false };
}

function tagClass(tone: TagTone): string {
  if (tone === "closing") return "text-rust";
  if (tone === "sow") return "text-allotment";
  if (tone === "plant") return "text-amber-dark";
  return "text-earth-lighter";
}

function CropIndexRow({ row }: { row: CropRow }) {
  return (
    <li className={`crop-index-row break-inside-avoid border-t border-earth/10 ${row.isLive ? "is-live" : ""}`}>
      <a
        href={`/crops/${row.crop.slug}`}
        className="grid min-h-[48px] grid-cols-[3.35rem_minmax(0,1fr)_auto] items-center gap-3 py-3 text-earth transition-colors hover:text-allotment focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-allotment"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber-dark">
          № {String(row.no).padStart(2, "0")}
        </span>
        <span className="min-w-0 font-serif text-xl leading-tight sm:text-2xl">
          {row.crop.name}
        </span>
        <span className={`shrink-0 whitespace-nowrap text-right font-mono text-[10px] uppercase tracking-[0.14em] ${tagClass(row.tone)}`}>
          {row.tag}
        </span>
      </a>
    </li>
  );
}

function CropGroup({ label, note, dotClass, rows }: { label: string; note: string; dotClass: string; rows: CropRow[] }) {
  return (
    <section className="crop-index-group mt-12 first:mt-0" aria-labelledby={`crop-group-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <h2
        id={`crop-group-${label.toLowerCase().replace(/\s+/g, "-")}`}
        className="font-mono text-[11px] uppercase tracking-[0.16em] text-earth-light"
      >
        <span className={dotClass} aria-hidden="true">●</span>{" "}
        {label} <span className="text-earth-lighter">· {note}</span>
      </h2>
      <ul className="mt-4 md:columns-2 md:gap-x-12">
        {rows.map((row) => (
          <CropIndexRow key={row.crop.slug} row={row} />
        ))}
      </ul>
    </section>
  );
}

export default function CropIndex({ crops }: { crops: Crop[]; initialLimit?: number }) {
  const now = new Date();
  const frostDate = ukAverageFrost(now);
  const rowsBySlug = new Map(
    crops.map((crop) => {
      const tag = cropTag(crop, now, frostDate);
      return [
        crop.slug,
        {
          crop,
          no: specimenNumber(crop),
          ...tag,
        },
      ];
    })
  );
  const liveCount = Array.from(rowsBySlug.values()).filter((row) => row.isLive).length;

  return (
    <div className="crop-index">
      <style>{`
        #crop-index-live-toggle:checked ~ .crop-index-groups .crop-index-row:not(.is-live) {
          display: none;
        }
        #crop-index-live-toggle:checked ~ .crop-index-empty {
          display: block;
        }
      `}</style>
      <input
        id="crop-index-live-toggle"
        type="checkbox"
        className="peer sr-only"
        aria-describedby="crop-index-toggle-note"
      />
      <div className="mb-8 flex items-end justify-between gap-6 border-t border-earth/10 pt-4">
        <p id="crop-index-toggle-note" className="max-w-[42ch] text-sm leading-relaxed text-earth-light">
          Full list by default. The seasonal tags use the UK-average guide for this week.
        </p>
        <label
          htmlFor="crop-index-live-toggle"
          className="shrink-0 cursor-pointer border-b border-amber pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-allotment hover:text-allotment-dark peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-allotment"
        >
          in season now →
        </label>
      </div>
      {liveCount === 0 && (
        <p className="crop-index-empty hidden border-t border-earth/10 pt-4 font-serif text-xl leading-snug text-earth-light">
          Nothing much is shouting this week. The full field guide is still here, waiting with us.
        </p>
      )}
      <div className="crop-index-groups">
        {GROUPS.map((group) => {
          const rows = crops
            .filter(group.match)
            .map((crop) => rowsBySlug.get(crop.slug))
            .filter((row): row is CropRow => Boolean(row));
          return (
            <CropGroup
              key={group.key}
              label={group.label}
              note={group.note}
              dotClass={group.dotClass}
              rows={rows}
            />
          );
        })}
      </div>
    </div>
  );
}
