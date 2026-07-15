"use client";

import type { SeedSupplier } from "@/data/varieties";
import { affiliateUrl, merchantSlug } from "@/components/AffiliateLink";

interface AffiliateButtonsProps {
  suppliers: SeedSupplier[];
  variety: string;
  rarity: string;
  eventPrefix?: string;
}

export default function AffiliateButtons({ suppliers, variety, eventPrefix = "lucky-dip" }: AffiliateButtonsProps) {
  const varietySlug = merchantSlug(variety);

  if (suppliers.length === 0) return null;

  return (
    <div className="my-8">
      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-rust block mb-3">
        Seed suppliers
      </span>
      <div className="flex flex-col sm:flex-row gap-3">
        {suppliers.map((s) => (
          <a
            key={s.name}
            href={affiliateUrl(s.url)}
            target="_blank"
            rel="sponsored noopener noreferrer"
            data-umami-event="affiliate-click"
            data-umami-event-product={variety}
            data-umami-event-type="seed"
            data-umami-event-merchant={merchantSlug(s.name)}
            data-umami-event-position={`${eventPrefix}-seeds-${varietySlug}-${merchantSlug(s.name)}`}
            className="flex-1 text-center text-sm font-semibold text-white bg-allotment hover:bg-allotment-dark transition-colors px-5 py-3"
          >
            {s.name} &rarr;
          </a>
        ))}
      </div>
    </div>
  );
}
