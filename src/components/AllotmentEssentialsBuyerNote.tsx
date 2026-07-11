import AffiliateLink from "@/components/AffiliateLink";

const firstBuys = [
  {
    name: "A decent digging fork",
    product: "Spear & Jackson digging fork",
    href: "https://www.amazon.co.uk/dp/B0006UF6DA?tag=whattosow21-21",
    reason:
      "Buy if your plot needs loosening, compost turning or root veg lifting. A fork earns its keep before most shiny tools do.",
    cta: "Check the classic Spear & Jackson fork",
  },
  {
    name: "Showa 370 gloves",
    product: "Showa 370 Assembly Grip gloves",
    href: "https://www.amazon.co.uk/dp/B0017HEJC0?tag=whattosow21-21",
    reason:
      "Buy if you are clearing nettles, tying tomatoes, weeding or handling wet canes. They grip properly and still let you feel what you are doing.",
    cta: "Get the gloves allotment people keep buying",
  },
  {
    name: "Two 10-litre watering cans",
    product: "10L watering can with detachable rose",
    href: "https://www.amazon.co.uk/s?tag=whattosow21-21&k=10+litre+watering+can+detachable+rose",
    reason:
      "Buy if hoses are banned, busy or awkward on your site. Two cans balance the walk, and a removable rose lets seedlings have a gentle drink.",
    cta: "Compare simple 10L cans with roses",
  },
  {
    name: "Horticultural fleece",
    product: "horticultural fleece 17g",
    href: "https://www.amazon.co.uk/s?tag=whattosow21-21&k=horticultural+fleece+17g",
    reason:
      "Buy if you are planting tender crops, brassicas or carrots. It buys time against frost, wind and pests without needing a gadget.",
    cta: "Check lightweight horticultural fleece",
  },
];

export default function AllotmentEssentialsBuyerNote() {
  return (
    <aside
      aria-labelledby="allotment-essentials-buyer-note"
      className="border-y border-earth/10 py-8 sm:py-10"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-rust">
        First allotment kit
      </p>
      <h2
        id="allotment-essentials-buyer-note"
        className="mt-2 font-serif text-2xl text-earth sm:text-3xl"
      >
        Buy these first
      </h2>
      <p className="mt-3 max-w-[62ch] text-earth-light">
        Start with the tools that solve the first week on a plot: loosen soil,
        protect your hands, carry water, and cover seedlings. Everything else
        can wait until the plot tells you what it needs.
      </p>

      <div className="mt-7 divide-y divide-earth/10 border-t border-earth/10">
        {firstBuys.map((pick) => (
          <div key={pick.product} className="py-5">
            <h3 className="font-serif text-xl text-earth">{pick.name}</h3>
            <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
              {pick.reason}
            </p>
            <AffiliateLink
              href={pick.href}
              product={pick.product}
              type="gear"
              position="allotment-essentials-top"
              className="mt-3 inline-flex min-h-11 items-center font-serif text-rust underline decoration-rust/30 underline-offset-4 transition-colors hover:text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
            >
              {pick.cta} &rarr;
            </AffiliateLink>
          </div>
        ))}
      </div>

      <p className="mt-5 max-w-[62ch] text-sm text-earth-light">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
          Skip for now
        </span>{" "}
        grow lights, seed tapes, fancy hand tools, premium wheelbarrows and
        anything sold as a full allotment starter bundle. Buy the boring useful
        things first, then fill the gaps from experience.
      </p>
      <p className="mt-4 max-w-[62ch] font-mono text-[10px] leading-relaxed text-earth-lighter">
        These links help the allotment shed fund. The advice is the same whether
        you use them or not.
      </p>
    </aside>
  );
}
