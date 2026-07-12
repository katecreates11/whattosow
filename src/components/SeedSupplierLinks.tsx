import type { Crop } from "@/data/crops";
import AffiliateLink, { merchantSlug } from "@/components/AffiliateLink";

interface SeedSupplierLinksProps {
  crop: Crop;
  variant?: "inline" | "sidebar" | "compact";
}

export default function SeedSupplierLinks({ crop, variant = "inline" }: SeedSupplierLinksProps) {
  if (!crop.seedSuppliers || crop.seedSuppliers.length === 0) return null;

  const seedLabel = (supplierName: string) => `Seeds at ${supplierName}`;

  if (variant === "compact") {
    return (
      <AffiliateLink
        href={crop.seedSuppliers[0].url}
        product={crop.name}
        type="seed"
        merchant={merchantSlug(crop.seedSuppliers[0].name)}
        position="variety-card"
        className="inline-flex items-center gap-1 text-xs text-allotment hover:text-allotment-dark transition-colors"
      >
        {seedLabel(crop.seedSuppliers[0].name)}
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </AffiliateLink>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className="border border-earth/6 p-6 sm:p-8">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-earth-lighter mb-3 block">
          Seeds
        </span>
        <h2 className="font-semibold text-earth mb-4">
          Where to buy {crop.name.toLowerCase()} seeds
        </h2>
        <div className="flex flex-wrap gap-3">
          {crop.seedSuppliers.map((supplier) => (
            <AffiliateLink
              key={supplier.name}
              href={supplier.url}
              product={crop.name}
              type="seed"
              merchant={merchantSlug(supplier.name)}
              position="sidebar"
              className="group inline-flex items-center gap-1.5 px-4 py-2.5 border border-earth/8 text-sm font-medium text-earth hover:border-allotment hover:text-allotment transition-colors duration-300"
            >
              {seedLabel(supplier.name)}
              <svg className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </AffiliateLink>
          ))}
        </div>
        <p className="text-xs text-earth-lighter mt-4">
          Some links are affiliate links — if you buy through them, a little goes towards the allotment shed, at no extra cost to you.
        </p>
      </div>
    );
  }

  // inline variant — after PersonalisedCropDates
  return (
    <div className="lg:hidden border border-leaf/20 bg-leaf-bg/30 p-5 sm:p-6 mb-10">
      <h2 className="font-semibold text-earth mb-3">
        Get {crop.name.toLowerCase()} seeds
      </h2>
      <div className="flex flex-wrap gap-2.5">
        {crop.seedSuppliers.map((supplier) => (
          <AffiliateLink
            key={supplier.name}
            href={supplier.url}
            product={crop.name}
            type="seed"
            merchant={merchantSlug(supplier.name)}
            position="inline"
            className="group inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-earth/8 text-sm font-medium text-earth hover:border-allotment hover:text-allotment transition-colors duration-200"
          >
            {seedLabel(supplier.name)}
            <svg className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </AffiliateLink>
        ))}
      </div>
      <p className="text-xs text-earth-lighter mt-3">
        Some links are affiliate links — if you buy through them, a little goes towards the allotment shed, at no extra cost to you.
      </p>
    </div>
  );
}
