import { getCropKit, type KitItem } from "@/data/crop-kit";
import AffiliateLink from "@/components/AffiliateLink";

interface CropKitProps {
  slug: string;
  cropName: string;
}

export default function CropKit({ slug, cropName }: CropKitProps) {
  const items = getCropKit(slug);
  if (items.length === 0) return null;

  return (
    <div className="border border-earth/6 p-6 sm:p-8">
      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-earth-lighter mb-3 block">
        Kit
      </span>
      <h2 className="font-semibold text-earth mb-1">
        What you&apos;ll need for {cropName.toLowerCase()}
      </h2>
      <p className="text-xs text-earth-lighter mb-4">
        The stuff beginners wish they&apos;d bought sooner.
      </p>
      <div className="space-y-4">
        {items.map((item) => (
          <KitItemCard key={item.name} cropSlug={slug} item={item} />
        ))}
      </div>
      <p className="text-[10px] text-earth-lighter mt-5 leading-relaxed">
        Some links are affiliate links — if you buy through them, a little goes towards the allotment shed. We only include kit that solves a real growing problem.
      </p>
    </div>
  );
}

function trackingSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function KitItemCard({ cropSlug, item }: { cropSlug: string; item: KitItem }) {
  const linkLabel = item.name
    .replace(/\s*\([^)]*\)/g, "")
    .trim();

  return (
    <div className="border-t border-earth/6 pt-3">
      <div className="flex items-start justify-between gap-3 mb-1">
        <span className="text-sm font-semibold text-earth">{item.name}</span>
        <AffiliateLink
          href={item.amazonUrl}
          product={item.name}
          type="gear"
          position={`crop-kit-${cropSlug}-${trackingSlug(item.name)}`}
          className="group shrink-0 inline-flex min-h-11 items-center gap-1.5 font-serif text-rust underline decoration-rust/30 underline-offset-4 transition-colors hover:text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
        >
          {linkLabel}
          <svg
            className="w-3 h-3 opacity-40 group-hover:opacity-80 transition-opacity duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </AffiliateLink>
      </div>
      <p className="text-xs text-earth-light leading-relaxed">{item.why}</p>
      {item.guideLink && (
        <a
          href={item.guideLink}
          className="text-[10px] text-allotment hover:text-allotment-dark transition-colors mt-1 inline-block"
        >
          More in our equipment guide &rarr;
        </a>
      )}
    </div>
  );
}
