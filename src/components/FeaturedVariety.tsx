import Image from "next/image";
import type { VarietyEntry } from "@/lib/variety-status";
import { awinLink } from "@/lib/awin";

const rarityLabel: Record<string, string> = {
  legendary: "legendary",
  rare: "rare",
  uncommon: "uncommon",
  common: "common",
};

/**
 * The "featured this week" variety — Natoora-style long-form: photo + dropcap
 * story (the variety's personality) + an editorial affiliate recommendation.
 */
export default function FeaturedVariety({ entry }: { entry: VarietyEntry }) {
  const { variety, crop, status, no } = entry;
  const dropcap = variety.personality.charAt(0);
  const rest = variety.personality.slice(1);
  const supplier = variety.seedSuppliers?.[0];
  const closing =
    status.state === "closing" && status.daysLeft != null
      ? ` · closing in ${status.daysLeft} day${status.daysLeft === 1 ? "" : "s"}`
      : "";
  // Monday of the current week — an editorial "issue date" that makes the
  // weekly rotation read as intentional. Set at render / the weekly rebuild.
  const monday = new Date();
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  const weekOf = monday.toLocaleDateString("en-GB", { day: "numeric", month: "long" });

  return (
    <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-14 items-center mt-12 sm:mt-16">
      <div className="relative aspect-[4/5] overflow-hidden bg-sage">
        {crop.unsplashId && (
          <Image
            src={`https://images.unsplash.com/photo-${crop.unsplashId}?w=900&h=1125&fit=crop&auto=format&q=75`}
            alt={`${variety.name} ${crop.name.toLowerCase()}`}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover img-grade"
          />
        )}
        <span className="absolute left-3 bottom-3 font-mono text-[10px] text-white bg-allotment-dark/75 px-2 py-1">
          No. {no} &middot; {crop.name}
        </span>
      </div>

      <div>
        <div className="font-mono text-[11px] tracking-[0.04em] uppercase text-tomato">
          Featured this week{closing}
          <span className="text-earth-lighter"> · week of {weekOf}</span>
        </div>
        <h3 className="font-serif text-4xl sm:text-5xl leading-[0.98] tracking-tight text-earth mt-3 mb-1">
          {variety.name}
        </h3>
        <div className="font-mono text-xs text-earth-light mb-6">
          {crop.name}
          {" · "}
          <span className={variety.rarity === "legendary" ? "text-amber" : ""}>
            {rarityLabel[variety.rarity]}
          </span>
        </div>
        <p className="text-[17px] leading-relaxed text-earth">
          <span className="float-left font-serif text-[72px] leading-[0.62] pr-3 pt-2 text-allotment">
            {dropcap}
          </span>
          {rest}
        </p>
        <div className="mt-6 pt-5 border-t border-earth/15">
          {status.method && (
            <span className="block font-mono text-[11px] uppercase text-tomato mb-2">
              {status.method} now{status.daysLeft != null ? ` · ${status.daysLeft} days left` : ""}
            </span>
          )}
          {supplier && (
            <a
              href={awinLink(supplier.url)}
              target="_blank"
              rel="sponsored noopener noreferrer"
              data-umami-event="featured-variety-click"
              data-umami-event-variety={variety.name}
              className="font-serif italic text-lg text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
            >
              Buy the seeds from {supplier.name} &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
