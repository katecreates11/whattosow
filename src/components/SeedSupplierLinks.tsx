import type { Crop } from "@/data/crops";

interface SeedSupplierLinksProps {
  crop: Crop;
  variant?: "inline" | "sidebar" | "compact";
}

export default function SeedSupplierLinks({ crop, variant = "inline" }: SeedSupplierLinksProps) {
  if (!crop.seedSuppliers || crop.seedSuppliers.length === 0) return null;

  if (variant === "compact") {
    return (
      <a
        href={crop.seedSuppliers[0].url}
        target="_blank"
        rel="noopener noreferrer"
        data-umami-event="affiliate-click"
        data-umami-event-supplier={crop.seedSuppliers[0].name}
        data-umami-event-crop={crop.name}
        data-umami-event-position="variety-card"
        className="inline-flex items-center gap-1 text-xs text-allotment hover:text-allotment-dark transition-colors"
      >
        Buy seeds
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
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
            <a
              key={supplier.name}
              href={supplier.url}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="affiliate-click"
              data-umami-event-supplier={supplier.name}
              data-umami-event-crop={crop.name}
              data-umami-event-position="sidebar"
              className="group inline-flex items-center gap-1.5 px-4 py-2.5 border border-earth/8 text-sm font-medium text-earth hover:border-allotment hover:text-allotment transition-colors duration-300"
            >
              {supplier.name}
              <svg className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ))}
        </div>
        <p className="text-xs text-earth-lighter mt-4">
          Links may be affiliate links. We may earn a small commission at no extra cost to you.
        </p>
      </div>
    );
  }

  // inline variant — after PersonalisedCropDates
  return (
    <div className="border border-leaf/20 bg-leaf-bg/30 p-5 sm:p-6 mb-10">
      <h2 className="font-semibold text-earth mb-3">
        Get {crop.name.toLowerCase()} seeds
      </h2>
      <div className="flex flex-wrap gap-2.5">
        {crop.seedSuppliers.map((supplier) => (
          <a
            key={supplier.name}
            href={supplier.url}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="affiliate-click"
            data-umami-event-supplier={supplier.name}
            data-umami-event-crop={crop.name}
            data-umami-event-position="inline"
            className="group inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-earth/8 text-sm font-medium text-earth hover:border-allotment hover:text-allotment transition-colors duration-200"
          >
            {supplier.name}
            <svg className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ))}
      </div>
      <p className="text-xs text-earth-lighter mt-3">
        Links may be affiliate links. We may earn a small commission at no extra cost to you.
      </p>
    </div>
  );
}
