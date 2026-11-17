import Image from "next/image";
import type { VarietyEntry } from "@/lib/variety-status";
import AffiliateLink, { merchantSlug } from "@/components/AffiliateLink";

const rarityLabel: Record<string, string> = {
  legendary: "legendary",
  rare: "rare",
  uncommon: "uncommon",
  common: "common",
};

function trackingSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * The "featured this week" variety — Natoora-style long-form: photo + dropcap
 * story (the variety's personality) + an editorial affiliate recommendation.
 */
export default function FeaturedVariety({ entry, now = new Date() }: { entry: VarietyEntry; now?: Date }) {
  const { variety, crop, status, supplier, photo } = entry;
  const dropcap = variety.personality.charAt(0);
  const rest = variety.personality.slice(1);
  const closing =
    status.state === "closing" && status.daysLeft != null
      ? ` · closing in ${status.daysLeft} day${status.daysLeft === 1 ? "" : "s"}`
      : "";
  // Monday of the current week — an editorial "issue date" that makes the
  // weekly rotation read as intentional. Set at render / the weekly rebuild.
  const monday = new Date(now);
  monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
  const weekOf = monday.toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "UTC" });

  return (
    <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-14 items-center mt-20 sm:mt-24 pt-14 sm:pt-16 border-t border-earth/12">
      <div className="relative aspect-[4/5] overflow-hidden bg-sage">
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover img-grade"
          />
        )}
      </div>

      <div>
        <p className="text-[15px] text-earth-light">
          This week&apos;s pick &middot; week of {weekOf}
          {closing && <span className="text-rust">{closing}</span>}
        </p>
        <h3 className="font-serif text-[2.6rem] sm:text-5xl leading-[0.98] tracking-[-0.02em] text-earth mt-3">
          {variety.name}
        </h3>
        <p className="mt-2 text-[15px] text-earth-light">
          {crop.name}
          {variety.rarity === "legendary" ? `, ${rarityLabel[variety.rarity].toLowerCase()}` : ""}
        </p>
        <p className="mt-6 font-serif text-[1.3rem] leading-[1.5] text-earth max-w-[38ch]">
          {dropcap}
          {rest}
        </p>
        {supplier && (
          <div className="mt-7">
            <AffiliateLink
              href={supplier.url}
              product={`${variety.name} seed`}
              type="seed"
              merchant={merchantSlug(supplier.name)}
              position={`featured-variety-seeds-${crop.slug}-${trackingSlug(variety.name)}-${trackingSlug(supplier.name)}`}
              className="text-[17px] text-allotment underline decoration-allotment/30 underline-offset-4 hover:decoration-allotment"
            >
              {`${variety.name} seed at ${supplier.name}`}
            </AffiliateLink>
          </div>
        )}
      </div>
    </div>
  );
}
