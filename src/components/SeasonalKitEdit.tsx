/**
 * "Kit for the jobs ahead" — the shoppable seasonal edit. Server component:
 * picks the current month's edit from seasonal-kit.ts, resolves the products
 * from the central kit catalogue, and renders them as editorial GearPicks
 * (Amazon-tracked). Two shapes:
 *   - variant="full"   → the whole edit, for the Sow page.
 *   - variant="teaser" → a compact band (intro + a few names + CTA), for the
 *                        homepage, funnelling traffic to the Sow page.
 */
import Image from "next/image";
import Link from "next/link";
import { kitForMonth, buyingGuideForMonth } from "@/data/seasonal-kit";
import { getKit, amazonLink } from "@/data/kit";
import GearPick from "@/components/GearPick";

function trackingSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function SeasonalKitEdit({
  variant = "full",
  month,
}: {
  variant?: "full" | "teaser";
  month?: number;
}) {
  const m = month ?? new Date().getMonth();
  const edit = kitForMonth(m);
  const guide = buyingGuideForMonth(m);
  const products = getKit(edit.kitIds);
  if (products.length === 0) return null;

  if (variant === "teaser") {
    const img = edit.image ?? "/photos/blog/harvest-tools-flatlay.webp";
    const alt = edit.imageAlt ?? "Allotment kit and the season's harvest";
    return (
      <div className="grid md:grid-cols-[1fr_0.82fr] gap-8 md:gap-12 items-center">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-allotment">
            The {edit.month} edit
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-earth tracking-tight leading-[0.98] mt-3 mb-4 max-w-[20ch]">
            Kit for the jobs ahead
          </h2>
          <p className="font-serif text-lg text-earth-light leading-relaxed max-w-[52ch] mb-6">
            {edit.intro}
          </p>
          <ul className="flex flex-wrap gap-x-2 gap-y-2 mb-7">
            {products.map((p) => (
              <li
                key={p.id}
                className="font-mono text-[11px] uppercase tracking-[0.06em] text-earth-light border border-earth/15 px-3 py-1.5"
              >
                {p.name}
              </li>
            ))}
          </ul>
          <Link
            href="/sow#kit"
            data-umami-event="shop-season-teaser-click"
            className="font-serif italic text-lg text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
          >
            See the {edit.month} edit &amp; what to sow now &rarr;
          </Link>
          <p className="mt-5 pt-5 border-t border-earth/10 text-sm text-earth-light max-w-[52ch]">
            {guide.hook}{" "}
            <Link
              href={guide.href}
              data-umami-event="seasonal-buying-guide-click"
              data-umami-event-product={guide.label}
              className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors whitespace-nowrap"
            >
              {guide.label} &rarr;
            </Link>
          </p>
        </div>
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <Image
            src={img}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover img-grade"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment">
        The {edit.month} edit
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-earth tracking-tight leading-[0.96] mt-3 mb-4 max-w-[16ch]">
        Kit for the jobs ahead
      </h2>
      <p className="font-serif text-lg sm:text-xl text-earth-light leading-relaxed max-w-[56ch] mb-2">
        {edit.intro}
      </p>
      <div className="max-w-2xl">
        {products.map((p) => (
          <GearPick
            key={p.id}
            name={p.name}
            price={p.price ?? ""}
            description={p.description}
            amazonUrl={amazonLink(p.asin)}
            badge={p.badge}
            tip={p.tip}
            image={p.image}
            position={`seasonal-kit-${trackingSlug(edit.month)}-${p.id}`}
          />
        ))}
      </div>
      <p className="text-sm text-earth-light mt-8 max-w-[56ch] leading-relaxed">
        {guide.hook}{" "}
        <Link
          href={guide.href}
          data-umami-event="seasonal-buying-guide-click"
          data-umami-event-product={guide.label}
          className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors whitespace-nowrap"
        >
          {guide.label} &rarr;
        </Link>
      </p>
      <p className="text-xs text-earth-lighter mt-6 max-w-[56ch] leading-relaxed">
        These are things I&apos;ve bought and use myself. The links are Amazon affiliate links — if you
        buy through them we earn a little, at no extra cost to you, towards the allotment shed.
      </p>
    </div>
  );
}
