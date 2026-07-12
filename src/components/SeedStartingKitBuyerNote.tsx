import AffiliateLink from "@/components/AffiliateLink";

const starterPicks = [
  {
    name: "Module trays",
    label: "Essential",
    product: "Nutley's 24-cell module trays",
    href: "https://www.amazon.co.uk/dp/B00844031K",
    position: "seed-starting-kit-module-trays",
    reason: "Start here if you want seedlings that lift out cleanly and plant on without a wrestling match.",
    cta: "Compare sturdy module trays",
  },
  {
    name: "Seed compost",
    label: "Essential",
    product: "Levington Seed & Cutting Compost 20L",
    href: "https://www.amazon.co.uk/dp/B0F3W9KC7N",
    position: "seed-starting-kit-seed-compost",
    reason: "This is the one bag that changes results. Fine, low-feed compost gives small seeds a much better start.",
    cta: "Compare seed compost",
  },
  {
    name: "Plant labels",
    label: "Essential",
    product: "White plastic plant labels and pencil",
    href: "https://www.amazon.co.uk/s?k=white+plastic+plant+labels+pencil",
    position: "seed-starting-kit-plant-labels",
    reason: "Cheap, dull, necessary. You will not remember which tray is which by the time the second sowing is up.",
    cta: "Get labels before you forget",
  },
  {
    name: "Heated propagator",
    label: "Only for heat-lovers",
    product: "Garland One Top heated propagator",
    href: "https://www.amazon.co.uk/dp/B015WFRWUI",
    position: "seed-starting-kit-heated-propagator",
    reason: "Worth buying for chillies, peppers and aubergines. For lettuce, brassicas and tomatoes, a warm windowsill is usually enough.",
    cta: "Compare heated propagators for chillies",
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
        The seed-starting kit worth buying first
      </h2>
      <p className="mt-3 max-w-[62ch] text-earth-light">
        If you are starting seeds indoors, buy the things that stop seedlings
        failing: trays, compost and labels. Heat is an upgrade for chillies,
        peppers and aubergines, not a toll you pay for every seed.
      </p>

      <div className="mt-7 divide-y divide-earth/10 border-t border-earth/10">
        {starterPicks.map((pick) => (
          <div key={pick.product} className="py-5">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-allotment">
              {pick.label}
            </p>
            <h3 className="font-serif text-xl text-earth">{pick.name}</h3>
            <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
              {pick.reason}
            </p>
            <AffiliateLink
              href={pick.href}
              product={pick.product}
              type="gear"
              position={pick.position}
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
