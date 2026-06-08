import Image from "next/image";
import { getSlot, shapeToAspect } from "@/lib/image-slots";
import { getSlotDef } from "@/data/image-slot-registry";

interface SlotImageProps {
  id: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
  fallbackSrc?: string;
  fallbackAlt?: string;
}

export default function SlotImage({
  id,
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 1024px",
  showCaption = true,
  fallbackSrc,
  fallbackAlt,
}: SlotImageProps) {
  const def = getSlotDef(id);
  const slot = getSlot(id);

  const src = slot?.src ?? fallbackSrc;
  const alt = slot?.alt ?? fallbackAlt ?? "";
  if (!src || !def) return null; // empty slot → render nothing

  const aspect = shapeToAspect(def.shape);

  return (
    <figure className={className}>
      <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover img-grade" />
      </div>
      {showCaption && slot?.caption && (
        <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-earth-light/70">
          {slot.caption}
        </figcaption>
      )}
    </figure>
  );
}
