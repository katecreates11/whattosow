import type { VarietyEntry } from "@/lib/variety-status";

/**
 * Renders inside a full-bleed dark <FullWidthSection> (set by the page).
 * A wall of herbarium-style specimen labels (variety-specific, charming, and
 * — unlike a generic crop photo — distinct per variety) plus a Natoora-style
 * text index of everything else in season.
 */

const rotations = ["-1.5deg", "1.2deg", "0.8deg", "-1deg", "1.6deg", "-0.7deg", "1.1deg", "-1.3deg"];

function HerbariumLabel({ entry, rotation }: { entry: VarietyEntry; rotation: string }) {
  const { variety, crop, no } = entry;
  return (
    <div className="relative aspect-[3/4] overflow-hidden">
      <div
        className="absolute inset-0 flex flex-col justify-between p-3.5 text-allotment"
        style={{ background: "#ECE5D4", transform: `rotate(${rotation})` }}
      >
        <span
          className="absolute h-[18px] w-[54px] left-1/2 -translate-x-1/2 -top-2"
          style={{ background: "rgba(212,148,58,0.42)" }}
          aria-hidden="true"
        />
        <div>
          <span className="font-mono text-[8.5px] tracking-[0.12em] uppercase opacity-50">
            What To Sow &middot; No. {no}
          </span>
          <div className="h-px my-2" style={{ background: "rgba(45,95,62,0.28)" }} />
          <span className="font-serif italic text-[13px] opacity-70">{crop.name}</span>
        </div>
        <div className="font-serif text-[26px] leading-[0.98] mt-auto">{variety.name}</div>
      </div>
    </div>
  );
}

export default function InSeasonBand({
  entries,
  total,
}: {
  entries: VarietyEntry[];
  total: number;
}) {
  const wall = entries.slice(0, 8);
  const rest = entries.slice(8, 24);

  return (
    <div className="text-[#eaf2e9]">
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-8 sm:mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">In season now</h2>
        <span className="font-mono text-[11px] uppercase text-leaf-light">
          {entries.length} varieties &middot; sow before their windows close
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-7">
        {wall.map((e, i) => (
          <a key={e.variety.id} href={`/crops/${e.crop.slug}`} className="group block">
            <HerbariumLabel entry={e} rotation={rotations[i % rotations.length]} />
            <div className="pt-3">
              <div className="font-serif text-xl text-white leading-tight group-hover:text-leaf-light transition-colors">
                {e.variety.name}
              </div>
              <div className="font-mono text-[10px] lowercase text-[#eaf2e9]/55 mt-1.5">
                {e.crop.name}
                {" · "}
                {e.variety.rarity === "legendary" && <span className="text-amber">★ </span>}
                {e.variety.rarity}
              </div>
              <div
                className={`font-mono text-[10px] mt-1 ${
                  e.status.state === "closing" ? "text-[#eaa07c]" : "text-leaf-light"
                }`}
              >
                {e.status.label}
              </div>
            </div>
          </a>
        ))}
      </div>

      {rest.length > 0 && (
        <div className="mt-12 pt-6 border-t border-white/15">
          <div className="font-mono text-[11px] uppercase text-leaf-light mb-4">
            Also ready to sow this week
          </div>
          <div className="columns-2 md:columns-4 gap-7 font-serif text-[15px] leading-[1.9] text-[#eaf2e9]/80">
            {rest.map((e) => (
              <a key={e.variety.id} href={`/crops/${e.crop.slug}`} className="block hover:text-white transition-colors">
                {e.variety.name} <span className="italic text-[#eaf2e9]/45">{e.crop.name.toLowerCase()}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-11">
        {/* Phase 3: dedicated /field-guide page listing all 182 varieties */}
        <a href="/calendar" className="font-serif italic text-lg text-white border-b border-amber pb-1">
          See the whole sowing season &mdash; all {total} varieties &rarr;
        </a>
      </div>
    </div>
  );
}
