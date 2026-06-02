import type { CropEntry } from "@/lib/variety-status";

/**
 * Renders inside a full-bleed dark <FullWidthSection> (set by the page).
 * Crop-level — "what type of veg to sow now" — grouped by method (direct sow /
 * start indoors / plant out), Natoora-style. One entry per veg; varieties live
 * on the crop pages.
 */

const GROUPS: { method: string; label: string }[] = [
  { method: "direct sow", label: "Direct sow now" },
  { method: "sow indoors", label: "Start indoors now" },
  { method: "plant out", label: "Plant out now" },
];

function CropItem({ entry }: { entry: CropEntry }) {
  const { crop, status, varietyCount } = entry;
  const closing = status.state === "closing";
  return (
    <a href={`/crops/${crop.slug}`} className="group block py-1">
      <div className="font-serif text-[22px] sm:text-2xl text-white leading-tight group-hover:text-leaf-light transition-colors">
        {crop.name}
      </div>
      <div className="font-mono text-[10px] mt-1.5 text-[#eaf2e9]/55">
        {varietyCount > 0 && <span>{varietyCount} {varietyCount === 1 ? "variety" : "varieties"}</span>}
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
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-10 sm:mb-12">
        <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">In season now</h2>
        <span className="font-mono text-[11px] uppercase text-leaf-light">
          {entries.length} {entries.length === 1 ? "crop" : "crops"} to sow this week
        </span>
      </div>

      <div className="space-y-12">
        {groups.map((g) => (
          <div key={g.method}>
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-leaf-light border-b border-white/15 pb-3 mb-5">
              {g.label} <span className="text-[#eaf2e9]/40">&middot; {g.items.length}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5">
              {g.items.map((e) => (
                <CropItem key={e.crop.slug} entry={e} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-2">
        {/* Phase 3: a dedicated /field-guide page listing all varieties */}
        <a href="/calendar" className="font-serif italic text-lg text-white border-b border-amber pb-1">
          See the whole sowing calendar &mdash; {totalVarieties} varieties across the year &rarr;
        </a>
      </div>
    </div>
  );
}
