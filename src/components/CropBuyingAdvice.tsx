import { getCropBuyingAdvice, type CropBuyingAdviceItem } from "@/data/crop-kit";
import AffiliateLink from "@/components/AffiliateLink";
import Image from "next/image";

interface CropBuyingAdviceProps {
  slug: string;
}

export default function CropBuyingAdvice({ slug }: CropBuyingAdviceProps) {
  const advice = getCropBuyingAdvice(slug);
  if (!advice) return null;

  return (
    <section
      className="mb-12 border-y border-earth/10 py-8 sm:py-10"
      data-crop-buying-advice={slug}
      aria-labelledby="crop-buying-advice-heading"
    >
      <span className="font-serif italic text-lg text-allotment block mb-1">
        honest kit notes
      </span>
      <h2 id="crop-buying-advice-heading" className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-3">
        Worth buying, and what to skip
      </h2>
      <p className="text-earth-light leading-relaxed max-w-[62ch] mb-6">
        {advice.intro}
      </p>

      {advice.photo && (
        <figure className="mb-7 max-w-[34rem]">
          <div className="aspect-[4/3] overflow-hidden bg-earth/5">
            <Image
              src={advice.photo.src}
              alt={advice.photo.alt}
              width={680}
              height={510}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-2 max-w-[52ch] font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter">
            {advice.photo.caption}
          </figcaption>
        </figure>
      )}

      <div className="space-y-5">
        {advice.items.map((item) => (
          <AdviceItem key={`${item.kind}-${item.name}`} item={item} slug={slug} />
        ))}
      </div>

      <p className="text-xs text-earth-lighter mt-6 leading-relaxed max-w-[60ch]">
        Some links are affiliate links — if you buy through them, a little goes towards
        the allotment shed, at no extra cost to you. The skip notes are just as important:
        if this crop does not need something, we will say so.
      </p>
    </section>
  );
}

function trackingSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function AdviceItem({ item, slug }: { item: CropBuyingAdviceItem; slug: string }) {
  if (item.kind === "skip-this") {
    return (
      <article className="border-t border-earth/10 pt-5" data-crop-buying-skip>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth-lighter block mb-2">
          Skip this
        </span>
        <h3 className="font-serif text-xl text-earth mb-2">{item.name}</h3>
        <p className="text-sm text-earth-light leading-relaxed">{item.why}</p>
        <p className="text-sm text-earth-light leading-relaxed mt-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-allotment mr-2">
            Instead
          </span>
          {item.instead}
        </p>
      </article>
    );
  }

  return (
    <article className="border-t border-earth/10 pt-5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-rust block mb-2">
        Worth buying
      </span>
      <div className="sm:flex sm:items-start sm:justify-between sm:gap-5">
        <div>
          <h3 className="font-serif text-xl text-earth mb-2">{item.name}</h3>
          <p className="text-sm text-earth-light leading-relaxed max-w-[58ch]">{item.why}</p>
        </div>
        <AffiliateLink
          href={item.href}
          product={item.product}
          type={item.type ?? "gear"}
          position={`crop-buying-advice-${slug}-${trackingSlug(item.product)}`}
          className="mt-3 sm:mt-1 inline-flex min-h-11 shrink-0 items-center gap-1.5 font-serif text-rust underline decoration-rust/30 underline-offset-4 transition-colors hover:text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
        >
          {item.cta}
          <span aria-hidden="true">&rarr;</span>
        </AffiliateLink>
      </div>
    </article>
  );
}
