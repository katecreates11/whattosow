import Link from "next/link";
import Image from "next/image";
import AffiliateLink from "@/components/AffiliateLink";

export default function WateringBuyerNote() {
  return (
    <aside
      id="watering-kit"
      aria-labelledby="watering-buyer-note"
      className="scroll-mt-24 border-y border-earth/10 py-8 sm:py-10"
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
        actually have. Some plots are hose-friendly; others are easier with
        cans from a tap, tank or trough. Check your own site rules before you
        spend money on clever watering kit.
      </p>
      <p className="mt-4 max-w-[58ch] border-l-2 border-rust/40 pl-4 font-serif text-lg leading-relaxed text-earth">
        If you only buy one watering thing, buy the thing that fixes your water source:
        carrying, reaching or storing water beats clever gadgets.
      </p>

      <figure className="mt-6 max-w-[34rem]">
        <div className="aspect-[4/3] overflow-hidden bg-earth/5">
          <Image
            src="/photos/blog/watering-lance-tomato-roots.webp"
            alt="Watering lance aimed at the base of tomato plants on the allotment"
            width={680}
            height={510}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <figcaption className="mt-2 max-w-[52ch] font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter">
          Water at the roots first — the useful kit is whatever helps you do
          that calmly.
        </figcaption>
      </figure>

      <div className="mt-6 border-y border-earth/10 py-4">
        <p className="font-serif text-lg text-earth">
          Start with the job, not the gadget.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-earth-light">
          <li>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
              Shared tap
            </span>{" "}
            If the problem is getting water from a shared tap to the bed,
            sturdy cans or a lance earn their keep first.
          </li>
          <li>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
              Rainwater
            </span>{" "}
            If the problem is keeping rainwater close by, buy storage before
            you buy anything clever.
          </li>
          <li>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
              Away
            </span>{" "}
            If the problem is holiday watering, sort the rules and the water
            source before you buy a timer.
          </li>
        </ul>
      </div>

      <div className="mt-7 divide-y divide-earth/10 border-t border-earth/10">
        <div className="py-5">
          <h3 className="font-serif text-xl text-earth">
            Two 10-litre watering cans
          </h3>
          <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
              Buy if
            </span>{" "}
            hoses are banned, busy or awkward on your site. If the tap queue is
            long or the hoses are always in use, two cans are the difference between
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
            Two sturdy cans for tap-queue days &rarr;
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
            The lance for reaching tomato roots &rarr;
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
            A 200L butt with the stand included &rarr;
          </AffiliateLink>
        </div>

        <div className="py-5">
          <h3 className="font-serif text-xl text-earth">
            A lidded dip tank or water storage tub
          </h3>
          <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
              Buy if
            </span>{" "}
            your plot has communal taps but the hoses are often in use, or
            you want a small reserve you can dip cans from. A dark, lidded tub
            keeps leaves, wildlife and mosquitoes out better than an open
            trough.{" "}
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth">
              Skip if
            </span>{" "}
            your site rules do not allow stored water, or you cannot put it on
            firm, level ground.
          </p>
          <AffiliateLink
            href="https://www.amazon.co.uk/s?k=lidded+garden+water+storage+tank"
            product="lidded garden water storage tank"
            type="gear"
            position="watering-buyer-note-dip-tank"
            className="mt-3 inline-flex min-h-11 items-center font-serif text-rust underline decoration-rust/30 underline-offset-4 transition-colors hover:text-earth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
          >
            A lidded dip tank for can-filling &rarr;
          </AffiliateLink>
        </div>

        <div className="py-5">
          <h3 className="font-serif text-xl text-earth">
            Skip timers and sprinklers until you have checked
          </h3>
          <p className="mt-2 max-w-[62ch] text-sm text-earth-light">
            Do not buy a timer first. Soaker hoses, sprinklers and timers can
            be useful in the right garden, but some allotments restrict hose
            use or unattended watering. Read your own site rules before
            spending anything.
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
