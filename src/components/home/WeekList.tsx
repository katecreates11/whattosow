import Image from "next/image";
import Link from "next/link";
import AffiliateLink, { merchantSlug } from "@/components/AffiliateLink";
import { cropImage } from "@/lib/crop-image";
import { seedLinkLabel } from "@/lib/seed-link-label";
import type { CropEntry } from "@/lib/season-core";

function trackingSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function statusLine(entry: CropEntry): string {
  const { status } = entry;
  const line =
    status.state === "closing" && status.daysLeft != null
      ? `${status.method ?? "sow"} now, ${status.daysLeft} day${status.daysLeft === 1 ? "" : "s"} left`
      : status.label.replace(" · ", ", ");
  return line.charAt(0).toUpperCase() + line.slice(1);
}

/**
 * One line of the week: Kate's photo where she has one (never stock), the
 * crop, what to do, and the seed link. Seed tracking positions are the same
 * as the old card grid's (`sow-card-seeds-…`), so the click history carries on.
 */
function Row({ entry, showSeeds, noPhoto }: { entry: CropEntry; showSeeds: boolean; noPhoto: boolean }) {
  const img = noPhoto ? null : cropImage(entry.crop);
  const ours = img?.ours ? img : null;
  const seed = showSeeds ? entry.crop.seedSuppliers?.[0] : undefined;
  const closing = entry.status.state === "closing";

  return (
    <li className="py-5 sm:py-6 border-t border-earth/12 first:border-t-0">
      <div className={`grid gap-x-5 items-center ${ours ? "grid-cols-[76px_minmax(0,1fr)] sm:grid-cols-[104px_minmax(0,1fr)]" : "grid-cols-1"}`}>
        {ours && (
          <Link href={`/crops/${entry.crop.slug}`} tabIndex={-1} aria-hidden="true" className="block">
            <div className="relative aspect-square overflow-hidden">
              <Image src={ours.src} alt="" fill sizes="104px" className="object-cover img-grade" />
            </div>
          </Link>
        )}
        <div className="min-w-0">
          <Link
            href={`/crops/${entry.crop.slug}`}
            className="font-serif text-[26px] sm:text-[32px] leading-[1.05] tracking-[-0.01em] text-earth hover:text-allotment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-allotment"
          >
            {entry.crop.name}
          </Link>
          <p className={`mt-1.5 text-[15px] ${closing ? "text-rust" : "text-earth-light"}`}>
            {statusLine(entry)}
          </p>
          {seed && (
            <AffiliateLink
              href={seed.url}
              product={seedLinkLabel(entry.crop)}
              type="seed"
              merchant={merchantSlug(seed.name)}
              position={`sow-card-seeds-${entry.crop.slug}-${trackingSlug(seed.name)}`}
              className="mt-1 inline-block text-[15px] text-allotment underline decoration-allotment/30 underline-offset-4 hover:decoration-allotment"
            >
              {`${seedLinkLabel(entry.crop)} at ${seed.name}`}
            </AffiliateLink>
          )}
        </div>
      </div>
    </li>
  );
}

export default function WeekList({
  title,
  entries,
  showSeeds = false,
  emptyNote,
  limit = 6,
  photoShownBelow,
  children,
}: {
  title: string;
  entries: CropEntry[];
  showSeeds?: boolean;
  emptyNote: string;
  limit?: number;
  /** The crop whose photo leads "this week's pick" below: not shown twice. */
  photoShownBelow?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-serif text-[1.65rem] sm:text-[2rem] text-earth tracking-[-0.01em] leading-none">{title}</h3>
      {entries.length === 0 ? (
        <p className="mt-4 font-serif text-xl text-earth-light leading-snug max-w-[40ch]">{emptyNote}</p>
      ) : (
        <ul className="mt-3">
          {entries.slice(0, limit).map((entry) => (
            <Row key={`${entry.crop.slug}-${entry.no}`} entry={entry} showSeeds={showSeeds} noPhoto={entry.crop.slug === photoShownBelow} />
          ))}
        </ul>
      )}
      {entries.length > limit && (
        <p className="mt-2 text-[15px] text-earth-light">And {entries.length - limit} more on the full list.</p>
      )}
      {children}
    </div>
  );
}
