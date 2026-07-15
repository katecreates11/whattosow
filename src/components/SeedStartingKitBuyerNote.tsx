import AffiliateLink from "@/components/AffiliateLink";
import Image from "next/image";

const starterPicks = [
  {
    name: "Module trays",
    label: "Essential",
    product: "Nutley's 24-cell module trays",
    href: "https://www.amazon.co.uk/dp/B00844031K",
    position: "seed-starting-kit-module-trays",
    buyIf: "you are sowing tomatoes, brassicas, beans, salads or anything you will plant out as plugs.",
    skipIf: "you already have clean yoghurt pots or old trays with drainage holes.",
    reason: "Reusable modules make seedlings easier to water, label and transplant without root damage. They are the first thing to buy before any heated gadget.",
    cta: "Compare reusable 24-cell module trays",
  },
  {
    name: "Seed compost",
    label: "Essential",
    product: "Levington Seed & Cutting Compost 20L",
    href: "https://www.amazon.co.uk/dp/B0F3W9KC7N",
    position: "seed-starting-kit-seed-compost",
    buyIf: "your seedlings often stall, rot or emerge unevenly in ordinary multipurpose compost.",
    skipIf: "you only sow big seeds like beans and courgettes, which are less fussy.",
    reason: "Fine, low-feed compost gives small seeds close contact with moisture without overwhelming them.",
    cta: "Compare fine seed compost",
  },
  {
    name: "Plant labels",
    label: "Essential",
    product: "White plastic plant labels and pencil",
    href: "https://www.amazon.co.uk/s?k=white+plastic+plant+labels+pencil",
    position: "seed-starting-kit-plant-labels",
    buyIf: "you are sowing more than one variety, or sowing the same crop twice a few weeks apart.",
    skipIf: "you are doing one tray today and can label it with masking tape for now.",
    reason: "A pencil label survives watering and saves you from guessing what the tray was meant to be.",
    cta: "Compare white labels and garden pencils",
  },
  {
    name: "Heated propagator",
    label: "Only for heat-lovers",
    product: "Garland One Top heated propagator",
    href: "https://www.amazon.co.uk/dp/B015WFRWUI",
    position: "seed-starting-kit-heated-propagator",
    buyIf: "you want reliable chillies, peppers or aubergines from seed in a normal UK house.",
    skipIf: "you mainly sow brassicas, lettuce, peas, beans, basil or later-season tomatoes.",
    reason: "Bottom heat is useful for true heat-lovers. It is not a starter tax for every seed packet.",
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
      <p className="mt-3 max-w-[62ch] text-sm text-earth-light">
        For tomatoes, start with modules and labels. For basil, small pots and
        warmth matter more than a full indoor kit.
      </p>

      <figure className="mt-6 max-w-[34rem]">
        <div className="aspect-[4/3] overflow-hidden bg-earth/5">
          <Image
            src="/photos/blog/windowsill-seedlings-cardboard.webp"
            alt="Seedlings growing on a windowsill in simple reused trays"
            width={680}
            height={510}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <figcaption className="mt-2 max-w-[52ch] font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter">
          Useful seed kit starts with ordinary trays, labels and light — the
          expensive bits can wait.
        </figcaption>
      </figure>

      <div className="mt-7 divide-y divide-earth/10 border-t border-earth/10">
        {starterPicks.map((pick) => (
          <div key={pick.product} className="py-5">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-allotment">
              {pick.label}
            </p>
            <h3 className="font-serif text-xl text-earth">{pick.name}</h3>
            <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
                Buy if
              </span>{" "}
              {pick.buyIf}{" "}
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
                Skip if
              </span>{" "}
              {pick.skipIf} {pick.reason}
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
