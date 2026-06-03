import PinButton from "@/components/PinButton";

/**
 * One pin in the /pins board: a thumbnail of the generated pin image plus a
 * "Save to Pinterest" button that pins it against the real content page.
 * Uses a plain <img> (the pin routes return PNG directly) with lazy loading,
 * since a board can hold a lot of pins.
 */
export default function PinThumb({
  pinPath, // e.g. /pins/crops/tomatoes  (the generated image)
  contentPath, // e.g. /crops/tomatoes   (where the pin should link)
  label, // small caption, e.g. "Editorial"
  description, // Pinterest description (keyworded)
}: {
  pinPath: string;
  contentPath: string;
  label: string;
  description: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden border border-earth/10 bg-cream-dark/30" style={{ aspectRatio: "2 / 3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pinPath} alt={`${label} pin`} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center justify-between gap-2 mt-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-earth-lighter">{label}</span>
        <PinButton path={contentPath} image={pinPath} description={description} />
      </div>
    </div>
  );
}
