import AffiliateLink from "@/components/AffiliateLink";

export default function UsSeedBuyerNote() {
  return (
    <aside aria-labelledby="us-seeds-heading" className="mt-8 border-t border-earth/15 pt-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-earth-light">
        Shed-fund note
      </p>
      <h3 id="us-seeds-heading" className="mt-2 font-serif text-2xl text-earth tracking-tight">
        Seeds for this list
      </h3>
      <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-earth-light">
        Worth buying: simple seed packets for the quick crops above. Skip for now: big starter kits, indoor grow
        systems, or anything that assumes we have built the full US version already.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <AffiliateLink
          href="https://www.amazon.com/s?k=vegetable+seeds+basil+beans+carrots+lettuce"
          product="US quick crop seeds"
          merchant="amazon-us"
          type="seed"
          position="us-zip-seeds"
          className="font-serif text-lg italic text-allotment underline decoration-amber decoration-2 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-allotment focus:ring-offset-2 focus:ring-offset-cream"
        >
          Compare quick-crop seeds on Amazon &rarr;
        </AffiliateLink>
        <span className="text-xs leading-relaxed text-earth-light">
          Affiliate link; no extra cost to you.
        </span>
      </div>
    </aside>
  );
}
