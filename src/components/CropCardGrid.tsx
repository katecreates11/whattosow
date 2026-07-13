import Image from "next/image";
import type { CropEntry } from "@/lib/season-core";
import AffiliateLink, { merchantSlug } from "@/components/AffiliateLink";
import { cropImage } from "@/lib/crop-image";
import { RakedBedIllustration } from "@/components/SVGIllustrations";

/**
 * The editorial crop wall (photo where we have one, taped herbarium label
 * otherwise) on a light ground — used by the Sow / Grow / Harvest pages.
 * When `showSeeds` is set (the Sow lens), each card carries a tracked
 * "get the seeds" link — the shoppable, weather-personal buying moment.
 */

const SPAN = ["md:col-span-4", "md:col-span-3", "md:col-span-5", "md:col-span-3", "md:col-span-4", "md:col-span-3", "md:col-span-4", "md:col-span-5"];
const ASPECT = ["aspect-[3/4]", "aspect-[3/4.4]", "aspect-[3/3.7]", "aspect-[3/4.2]"];
const ROT = ["-1.5deg", "1.2deg", "0.8deg", "-1deg", "1.6deg", "-0.7deg", "1.1deg", "-1.3deg"];
const TAPE = ["left-1/2 -translate-x-1/2", "left-5", "right-6", "left-8"];

function trackingSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CropCardGrid({
  entries,
  emptyNote,
  showSeeds = false,
  variant = "hero",
}: {
  entries: CropEntry[];
  emptyNote?: string;
  showSeeds?: boolean;
  /** hero = large asymmetric wall (the lead job); compact = denser small grid. */
  variant?: "hero" | "compact";
}) {
  const compact = variant === "compact";
  const gridCls = compact
    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-5 gap-y-7 items-start"
    : "grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-9 sm:gap-x-7 items-start";
  if (entries.length === 0) {
    return (
      <div className="max-w-[42ch]">
        <RakedBedIllustration className="w-36 h-auto text-allotment mb-5" />
        <p className="font-serif italic text-xl text-earth-light leading-snug">
          {emptyNote ?? "Nothing just now — but the garden turns quickly. Do check back."}
        </p>
      </div>
    );
  }

  return (
    <div className={gridCls}>
      {entries.map((e, i) => {
        const img = cropImage(e.crop);
        const closing = e.status.state === "closing";
        const seed = showSeeds ? e.crop.seedSuppliers?.[0] : undefined;
        return (
          <div key={`${e.crop.slug}-${e.no}`} className={compact ? "col-span-1" : `col-span-1 ${SPAN[i % SPAN.length]}`}>
            <a href={`/crops/${e.crop.slug}`} className="group block">
            <div className={`relative ${ASPECT[i % ASPECT.length]} overflow-hidden`}>
              {img ? (
                <>
                  <Image
                    src={img.src}
                    alt={e.crop.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover img-grade"
                  />
                  {img.ours && (
                    <span className="absolute left-2 bottom-2 font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/90 bg-allotment-dark/70 px-1.5 py-0.5">
                      from our plot
                    </span>
                  )}
                </>
              ) : (
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
                      What To Sow &middot; No. {e.no}
                    </span>
                    <div className="h-px my-2" style={{ background: "rgba(45,95,62,0.28)" }} />
                    <span className="font-serif italic text-[13px] opacity-70">{e.crop.category}</span>
                  </div>
                  <div className={`font-serif leading-[0.95] mt-auto ${compact ? "text-[20px] sm:text-[22px]" : "text-[26px] sm:text-[30px]"}`}>{e.crop.name}</div>
                </div>
              )}
            </div>
            <div className="pt-3">
              {img && (
                <div className={`font-serif text-earth leading-tight group-hover:text-allotment transition-colors ${compact ? "text-base sm:text-lg" : "text-xl sm:text-[22px]"}`}>
                  {e.crop.name}
                </div>
              )}
              <div className={`font-mono text-[10px] mt-1.5 ${closing ? "text-tomato" : "text-earth-light"}`}>
                {e.status.label}
                {e.varietyCount > 0 && (
                  <span className="text-earth-lighter">
                    {"  ·  "}
                    {e.varietyCount} {e.varietyCount === 1 ? "variety" : "varieties"}
                  </span>
                )}
              </div>
            </div>
            </a>
            {seed && (
              <AffiliateLink
                href={seed.url}
                product={e.crop.name}
                type="seed"
                merchant={merchantSlug(seed.name)}
                position={`sow-card-seeds-${e.crop.slug}-${trackingSlug(seed.name)}`}
                className="inline-block mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
              >
                Seeds at {seed.name} &rarr;
              </AffiliateLink>
            )}
          </div>
        );
      })}
    </div>
  );
}
