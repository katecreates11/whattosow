import type { CropEntry } from "@/lib/variety-status";

/**
 * Renders inside a full-bleed dark <FullWidthSection> (set by the page).
 * Crop-level ("what type of veg to sow now"), grouped by method, but laid out
 * as an editorial, asymmetric wall of taped herbarium specimens — one per veg.
 */

const GROUPS: { method: string; label: string }[] = [
  { method: "direct sow", label: "Direct sow now" },
  { method: "sow indoors", label: "Start indoors now" },
  { method: "plant out", label: "Plant out now" },
];

// asymmetric rhythm: varied column spans, heights, tilt + tape position
const SPAN = ["md:col-span-4", "md:col-span-3", "md:col-span-5", "md:col-span-3", "md:col-span-4", "md:col-span-3", "md:col-span-4", "md:col-span-5"];
const ASPECT = ["aspect-[3/4]", "aspect-[3/4.4]", "aspect-[3/3.7]", "aspect-[3/4.2]"];
const ROT = ["-1.5deg", "1.2deg", "0.8deg", "-1deg", "1.6deg", "-0.7deg", "1.1deg", "-1.3deg"];
const TAPE = ["left-1/2 -translate-x-1/2", "left-5", "right-6", "left-8"];

function Specimen({ entry, i }: { entry: CropEntry; i: number }) {
  const { crop, status, varietyCount, no } = entry;
  const closing = status.state === "closing";
  return (
    <a href={`/crops/${crop.slug}`} className={`group block col-span-1 ${SPAN[i % SPAN.length]}`}>
      <div className={`relative ${ASPECT[i % ASPECT.length]} overflow-hidden`}>
        <div
          className="absolute inset-0 flex flex-col justify-between p-4 text-allotment"
          style={{ background: "#ECE5D4", transform: `rotate(${ROT[i % ROT.length]})` }}
        >
          <span
            className={`absolute h-[18px] w-[54px] -top-2 ${TAPE[i % TAPE.length]}`}
            style={{ background: "rgba(212,148,58,0.42)" }}
            aria-hidden="true"
          />
          <div>
            <span className="font-mono text-[8.5px] tracking-[0.12em] uppercase opacity-50">
              What To Sow &middot; No. {no}
            </span>
            <div className="h-px my-2" style={{ background: "rgba(45,95,62,0.28)" }} />
            <span className="font-serif italic text-[13px] opacity-70">{crop.category}</span>
          </div>
          <div className="font-serif text-[26px] sm:text-[30px] leading-[0.95] mt-auto group-hover:text-allotment-dark transition-colors">
            {crop.name}
          </div>
        </div>
      </div>
      <div className="font-mono text-[10px] mt-3 text-[#eaf2e9]/55">
        {varietyCount > 0 && (
          <span>
            {varietyCount} {varietyCount === 1 ? "variety" : "varieties"}
          </span>
        )}
        {closing && status.daysLeft != null && (
          <span className="text-[#eaa07c]">
            {varietyCount > 0 ? "  ·  " : ""}last chance · {status.daysLeft}d
          </span>
        )}
      </div>
    </a>
  );
}

export default function InSeasonBand({
  entries,
  totalVarieties,
}: {
  entries: CropEntry[];
  totalVarieties: number;
}) {
  const groups = GROUPS.map((g) => ({
    ...g,
    items: entries.filter((e) => e.status.method === g.method),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="text-[#eaf2e9]">
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-10 sm:mb-14">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">In season now</h2>
        <span className="font-mono text-[11px] uppercase text-leaf-light">
          {entries.length} {entries.length === 1 ? "crop" : "crops"} to sow this week
        </span>
      </div>

      <div className="space-y-14">
        {groups.map((group) => (
          <div key={group.method}>
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-leaf-light border-b border-white/15 pb-3 mb-7">
              {group.label} <span className="text-[#eaf2e9]/40">&middot; {group.items.length}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-9 sm:gap-x-7 items-start">
              {group.items.map((e, i) => (
                <Specimen key={e.crop.slug} entry={e} i={i} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14">
        {/* Phase 3: a dedicated /field-guide page listing all varieties */}
        <a href="/calendar" className="font-serif italic text-lg text-white border-b border-amber pb-1">
          See the whole sowing calendar &mdash; {totalVarieties} varieties across the year &rarr;
        </a>
      </div>
    </div>
  );
}
