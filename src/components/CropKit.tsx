import { getCropKit, type KitItem } from "@/data/crop-kit";

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
          <KitItemCard key={item.name} item={item} />
        ))}
      </div>
      <p className="text-[10px] text-earth-lighter mt-5 leading-relaxed">
        Links go to Amazon. We earn a small commission at no extra cost to you.
      </p>
    </div>
  );
}

function KitItemCard({ item }: { item: KitItem }) {
  return (
    <div className="border-t border-earth/6 pt-3">
      <div className="flex items-start justify-between gap-3 mb-1">
        <span className="text-sm font-semibold text-earth">{item.name}</span>
        <a
          href={item.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="crop-kit-click"
          data-umami-event-product={item.name}
          className="group shrink-0 inline-flex items-center gap-1 text-[11px] font-medium text-earth border border-earth/10 px-2.5 py-1.5 hover:border-allotment hover:text-allotment transition-colors duration-200"
        >
          Amazon
          <svg
            className="w-2.5 h-2.5 opacity-30 group-hover:opacity-70 transition-opacity duration-200"
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
        </a>
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
