/**
 * Editorial product recommendation component for equipment guides.
 * Opinionated, not a generic product card — fits the guide editorial style.
 */

import AffiliateLink from "@/components/AffiliateLink";

interface GearPickProps {
  name: string;
  price: string; // e.g. "£8–12" or "~£15"
  description: string; // honest, opinionated review in brand voice
  amazonUrl: string;
  badge?: "our-pick" | "budget" | "upgrade" | "essential" | "skip-it";
  tip?: string; // short practical tip, e.g. "Get at least 3"
  image?: string; // square product photo, e.g. "/photos/kit/broadfork.webp"
  imageAlt?: string;
}

const badgeStyles: Record<string, { label: string; className: string; icon: string }> = {
  "our-pick": { label: "Our pick", className: "bg-allotment text-white", icon: "★" },
  budget: { label: "Budget option", className: "bg-amber/20 text-amber-dark", icon: "£" },
  upgrade: { label: "Worth the upgrade", className: "bg-frost/20 text-frost-dark", icon: "↑" },
  essential: { label: "Essential", className: "bg-rust/10 text-rust", icon: "●" },
  "skip-it": { label: "You can skip this", className: "bg-earth/5 text-earth-lighter", icon: "–" },
};

export default function GearPick({
  name,
  price,
  description,
  amazonUrl,
  badge,
  tip,
  image,
  imageAlt,
}: GearPickProps) {
  const badgeInfo = badge ? badgeStyles[badge] : null;
  const isHighlight = badge === "our-pick" || badge === "essential";

  return (
    <div className={`pt-6 pb-7 ${isHighlight ? "border-l-2 border-rust pl-5 -ml-5 sm:-ml-6" : "border-t border-earth/10"}`}>
      {badgeInfo && (
        <span
          className={`text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 inline-block mb-3 ${badgeInfo.className}`}
        >
          {badgeInfo.icon}&ensp;{badgeInfo.label}
        </span>
      )}
      <div className={image ? "flex gap-4 sm:gap-5 items-start" : ""}>
        {image && (
          <img
            src={image}
            alt={imageAlt || name}
            width={128}
            height={128}
            loading="lazy"
            decoding="async"
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover shrink-0 img-grade"
          />
        )}
        <div className={image ? "flex-1 min-w-0" : ""}>
      <div className="flex items-baseline justify-between gap-4 mb-2.5">
        <h3 className="text-xl font-serif text-earth tracking-tight">{name}</h3>
        {price && <span className="text-base font-semibold text-rust tabular-nums shrink-0">{price}</span>}
      </div>
      <p className="text-sm text-earth-light leading-relaxed mb-4">{description}</p>
      {tip && (
        <div className="bg-sage/50 px-4 py-3 mb-4">
          <p className="text-xs text-allotment-dark font-medium flex items-start gap-2">
            <span className="text-allotment text-sm leading-none mt-px" aria-hidden="true">&#x2139;</span>
            {tip}
          </p>
        </div>
      )}
      <AffiliateLink
        href={amazonUrl}
        product={name}
        type="gear"
        merchant="amazon"
        className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-earth border border-earth/15 px-4 py-2.5 hover:border-allotment hover:text-allotment hover:bg-allotment/5 transition-all duration-200"
      >
        View on Amazon
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
      </div>
    </div>
  );
}

export function GearCategory({
  title,
  number,
  children,
}: {
  title: string;
  number?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="my-12" id={title.toLowerCase().replace(/\s+/g, "-")}>
      <div className="flex items-baseline gap-4 mb-6">
        {number !== undefined && (
          <span className="text-5xl font-serif text-earth/10 leading-none tabular-nums" aria-hidden="true">
            {String(number).padStart(2, "0")}
          </span>
        )}
        <div>
          <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-rust">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

/** Top picks grid — hero section showing 3-4 must-have items prominently */
export function TopPicksGrid({
  picks,
}: {
  picks: { name: string; why: string; price: string; amazonUrl: string }[];
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 my-10">
      {picks.map((pick, i) => (
        <AffiliateLink
          key={i}
          href={pick.amazonUrl}
          product={pick.name}
          type="gear"
          merchant="amazon"
          className="group border border-earth/10 p-5 sm:p-6 hover:border-allotment/30 transition-colors duration-200"
        >
          <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-rust/50 block mb-2">
            #{i + 1}
          </span>
          <span className="font-serif text-lg text-earth block mb-1.5 group-hover:text-allotment transition-colors">
            {pick.name}
          </span>
          <span className="text-xs text-earth-light leading-relaxed block mb-3">
            {pick.why}
          </span>
          <span className="text-sm font-semibold text-rust tabular-nums">{pick.price}</span>
        </AffiliateLink>
      ))}
    </div>
  );
}

export function AffiliateDisclosure() {
  return (
    <div className="my-8 bg-earth/[0.03] border border-earth/8 px-5 py-4">
      <p className="text-xs text-earth-lighter leading-relaxed">
        <span className="font-semibold text-earth-light">Affiliate links</span> &mdash; Some links
        go to Amazon. If you buy through them, a little goes towards the allotment shed, at no
        extra cost to you. We only recommend things we&apos;d actually use on our own plot.
      </p>
    </div>
  );
}
