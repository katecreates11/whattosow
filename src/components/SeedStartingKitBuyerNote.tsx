import AffiliateLink from "@/components/AffiliateLink";

const starterPicks = [
  {
    name: "Module trays",
    product: "Nutley's 24-cell module trays",
    href: "https://www.amazon.co.uk/dp/B00844031K",
    reason: "Start here if you want seedlings that lift out cleanly and plant on without a wrestling match.",
    cta: "Compare sturdy module trays",
  },
  {
    name: "Seed compost",
    product: "Levington Seed & Cutting Compost 20L",
    href: "https://www.amazon.co.uk/dp/B0F3W9KC7N",
    reason: "This is the one bag that changes results. Fine, low-feed compost gives small seeds a much better start.",
    cta: "Check seed compost",
  },
  {
    name: "Plant labels",
    product: "White plastic plant labels and pencil",
    href: "https://www.amazon.co.uk/s?k=white+plastic+plant+labels+pencil",
    reason: "Cheap, dull, necessary. You will not remember which tray is which by the time the second sowing is up.",
    cta: "Get labels before you forget",
  },
  {
    name: "Heated propagator",
    product: "Garland One Top heated propagator",
    href: "https://www.amazon.co.uk/dp/B015WFRWUI",
    reason: "Worth buying for chillies, peppers and aubergines. For lettuce, brassicas and tomatoes, a warm windowsill is usually enough.",
    cta: "Check the Garland propagator",
  },
];

export default function SeedStartingKitBuyerNote() {
  return (
    <aside
      aria-labelledby="seed-kit-buyer-note"
      className="border-y border-earth/10 py-8 sm:py-10"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-rust">
        Starter kit edit
      </p>
      <h2
        id="seed-kit-buyer-note"
        className="mt-2 font-serif text-2xl text-earth sm:text-3xl"
      >
        Buy these first
      </h2>
      <p className="mt-3 max-w-[62ch] text-earth-light">
        If you are starting seeds indoors, these are the useful buys. Everything
        else can wait until you know what your windowsill is missing.
      </p>

      <div className="mt-7 divide-y divide-earth/10 border-t border-earth/10">
        {starterPicks.map((pick) => (
          <div key={pick.product} className="py-5">
            <h3 className="font-serif text-xl text-earth">{pick.name}</h3>
            <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
              {pick.reason}
            </p>
            <AffiliateLink
              href={pick.href}
              product={pick.product}
              type="gear"
              position="seed-starting-kit-top"
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
        grow lights, fancy dibbers, seed tapes and full indoor racks. They have
        their place, but not before trays, compost and labels are sorted.
      </p>
      <p className="mt-4 max-w-[62ch] font-mono text-[10px] leading-relaxed text-earth-lighter">
        These links help the allotment shed fund. The advice is the same whether
        you use them or not.
      </p>
    </aside>
  );
}
