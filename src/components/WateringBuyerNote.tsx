import Link from "next/link";
import AffiliateLink from "@/components/AffiliateLink";

export default function WateringBuyerNote() {
  return (
    <aside
      aria-labelledby="watering-buyer-note"
      className="border-y border-earth/10 py-8 sm:py-10"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-rust">
        Worth buying / check first
      </p>
      <h2
        id="watering-buyer-note"
        className="mt-2 font-serif text-2xl text-earth sm:text-3xl"
      >
        Buy for the water supply you actually have
      </h2>
      <p className="mt-3 max-w-[62ch] text-earth-light">
        Check your allotment rules before buying hose kit. Some sites allow a
        lance while you stand at the tap; others expect you to fill from a
        communal tank and keep the water in your hand throughout.
      </p>

      <div className="mt-7 divide-y divide-earth/10 border-t border-earth/10">
        <div className="py-5">
          <h3 className="font-serif text-xl text-earth">
            Start with two good watering cans
          </h3>
          <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
            For a communal dip tank, two sturdy 10-litre cans balance the walk
            back to the plot. Look for a wide opening, a comfortable handle and
            a detachable rose; an ordinary plastic pair is perfectly useful.
          </p>
          <AffiliateLink
            href="https://www.amazon.co.uk/s?k=10l+plastic+watering+can+detachable+rose"
            product="10L watering can with detachable rose"
            type="gear"
            position="watering-buyer-note"
            className="mt-3 inline-flex min-h-11 items-center font-serif text-rust underline decoration-rust/30 underline-offset-4 transition-colors hover:text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
          >
            Find a simple 10L can with a rose &rarr;
          </AffiliateLink>
        </div>

        <div className="py-5">
          <h3 className="font-serif text-xl text-earth">
            If your site allows hose use
          </h3>
          <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
            A long lance reaches under leaves and across beds without trampling
            the soil. It suits sites where you can use a hose while staying at
            the tap and keeping hold of it.
          </p>
          <AffiliateLink
            href="https://www.amazon.co.uk/dp/B01MQDGXMO"
            product="Gardena watering lance"
            type="gear"
            position="watering-buyer-note"
            className="mt-3 inline-flex min-h-11 items-center font-serif text-rust underline decoration-rust/30 underline-offset-4 transition-colors hover:text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
          >
            See the Gardena lance I use &rarr;
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
            Skip the automatic setup until you have checked
          </h3>
          <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
            Soaker hoses, sprinklers and timers can be useful, but many
            allotments restrict them or forbid unattended watering. Check your
            tenancy or site rules before spending anything.
          </p>
        </div>
      </div>

      <p className="mt-5 max-w-[62ch] font-mono text-[10px] leading-relaxed text-earth-lighter">
        The two buying links above help the allotment shed fund. The advice is
        the same whether you use them or not.
      </p>
    </aside>
  );
}
