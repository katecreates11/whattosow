import Link from "next/link";
import AffiliateLink from "@/components/AffiliateLink";

export default function WateringBuyerNote() {
  return (
    <aside
      aria-labelledby="watering-buyer-note"
      className="border-y border-earth/10 py-8 sm:py-10"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-rust">
        Watering kit shortlist
      </p>
      <h2
        id="watering-buyer-note"
        className="mt-2 font-serif text-2xl text-earth sm:text-3xl"
      >
        The watering kit worth buying first
      </h2>
      <p className="mt-3 max-w-[62ch] text-earth-light">
        If you are buying one watering setup, buy for the water supply you
        actually have. On some allotments you can use a hose while you stand
        there holding it; on others you fill cans from a communal tank, dip
        tank or trough and keep the water in your hand throughout.
      </p>

      <div className="mt-7 divide-y divide-earth/10 border-t border-earth/10">
        <div className="py-5">
          <h3 className="font-serif text-xl text-earth">
            Two 10-litre watering cans
          </h3>
          <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
              Buy if
            </span>{" "}
            hoses are banned, busy or awkward. If your allotment tanks run dry
            or the hoses are always in use, two cans are the difference between
            watering properly and going home annoyed. A detachable rose gives
            seedlings a softer drink, and ordinary plastic is fine.{" "}
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
              Skip if
            </span>{" "}
            you only grow in a small courtyard and can reach everything from
            the kitchen tap.
          </p>
          <AffiliateLink
            href="https://www.amazon.co.uk/s?k=10l+plastic+watering+can+detachable+rose"
            product="10L watering can with detachable rose"
            type="gear"
            position="watering-buyer-note-cans"
            className="mt-3 inline-flex min-h-11 items-center font-serif text-rust underline decoration-rust/30 underline-offset-4 transition-colors hover:text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
          >
            Compare sturdy 10L cans with removable roses &rarr;
          </AffiliateLink>
        </div>

        <div className="py-5">
          <h3 className="font-serif text-xl text-earth">
            A long watering lance
          </h3>
          <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
              Buy if
            </span>{" "}
            your site allows hose use while you hold it and you are watering
            deep beds, beans or tomatoes. A lance reaches under leaves and
            across beds without trampling the soil, while you stay in control
            of the water.{" "}
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
              Skip if
            </span>{" "}
            your rules say cans only.
          </p>
          <AffiliateLink
            href="https://www.amazon.co.uk/dp/B01MQDGXMO"
            product="Gardena watering lance"
            type="gear"
            position="watering-buyer-note-lance"
            className="mt-3 inline-flex min-h-11 items-center font-serif text-rust underline decoration-rust/30 underline-offset-4 transition-colors hover:text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
          >
            Compare the Gardena lance I use &rarr;
          </AffiliateLink>
          <Link
            href="/blog/watering-lance-allotment"
            className="mt-1 flex min-h-11 w-fit items-center text-sm text-earth-light underline decoration-earth/20 underline-offset-4 transition-colors hover:text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
          >
            Read my allotment review first &rarr;
          </Link>
        </div>

        <div className="py-5">
          <h3 className="font-serif text-xl text-earth">
            A water butt with a stand
          </h3>
          <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
              Buy if
            </span>{" "}
            you have a shed, greenhouse or polytunnel roof and permission to
            store water. Saved rainwater is the quiet winner, and a stand
            matters: without the height, getting a watering can under the tap
            becomes a daily nuisance.{" "}
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
              Skip if
            </span>{" "}
            you have nowhere solid and level to put it yet.
          </p>
          <AffiliateLink
            href="https://www.amazon.co.uk/s?k=water+butt+with+stand+and+tap+200l"
            product="200L water butt with stand and tap"
            type="gear"
            position="watering-buyer-note-butt"
            className="mt-3 inline-flex min-h-11 items-center font-serif text-rust underline decoration-rust/30 underline-offset-4 transition-colors hover:text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
          >
            Compare 200L water butts with stands &rarr;
          </AffiliateLink>
        </div>

        <div className="py-5">
          <h3 className="font-serif text-xl text-earth">
            Skip timers and sprinklers until you have checked
          </h3>
          <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
            Soaker hoses, sprinklers and timers can be useful in the right
            garden, but many allotments restrict them or forbid unattended
            watering. Read the site rules before spending anything.
          </p>
        </div>
      </div>

      <p className="mt-5 max-w-[62ch] font-mono text-[10px] leading-relaxed text-earth-lighter">
        The buying links above help the allotment shed fund. The advice is
        the same whether you use them or not.
      </p>
    </aside>
  );
}
