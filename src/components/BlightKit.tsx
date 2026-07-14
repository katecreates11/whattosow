"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadLocation } from "@/lib/location-storage";
import { assessHutton, type BlightLevel } from "@/lib/blight";
import AffiliateLink from "@/components/AffiliateLink";

/**
 * "Blight defence kit" — the shoppable strip at the foot of Blight Watch.
 *
 * Honesty drives the design: you can't buy your way out of blight mid-season,
 * so the two buy-points have different timing. We read the visitor's live risk
 * (same Hutton assessment as the banner) and:
 *   - when blight is in season AND building/high → lead with KEEPING LEAVES DRY
 *     (cover + fleece — the only thing that helps right now),
 *   - otherwise → lead with RESISTANT VARIETIES (a plan-for-next-year buy).
 *
 * If we have no location or the weather API is down, we fall back to the calm
 * "plan ahead" framing — we never claim risk we haven't measured.
 */

const linkCls =
  "italic text-rust hover:text-earth transition-colors underline decoration-rust/30";

// Real Suttons product pages (an active Awin advertiser — AffiliateLink wraps
// the tracking automatically). Direct links, not searches.
const SUTTONS = {
  fleece: "https://www.suttons.co.uk/garden-equipment/all/frost-protection-fleece_MH4728",
  graftedCrimsonCrush: "https://www.suttons.co.uk/vegetable-fruit-plants/tomato-plants/grafted-tomato-plant---f1-crimson-crush_mh5817",
  crimsonCrushSeeds: "https://www.suttons.co.uk/vegetable-seeds/popular-seeds/tomato-seeds-f1-crimson-crush_MH-32561",
  sarpoMira: "https://www.suttons.co.uk/potatoes-onions-garlic/potatoes/all/potato-sarpo-mira_mh-83821",
};

function CoverCard() {
  return (
    <div className="border border-earth/10 bg-leaf-bg p-5">
      <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-allotment mb-3">
        Worth buying now
      </h3>
      <p className="text-sm text-earth-light leading-relaxed mb-3">
        Blight needs wet leaves to take hold. Growing under cover is the single
        biggest protection; outdoors, a fleece over the plants through a warm,
        humid spell buys you time. This is protection, not a cure.
      </p>
      <ul className="space-y-1.5 text-sm">
        <li>
          <Link href="/blog/best-polytunnels-uk" className={linkCls}>
            Polytunnels — the options &rarr;
          </Link>
        </li>
        <li>
          <Link href="/blog/best-cold-frames-greenhouses-uk" className={linkCls}>
            Greenhouses &amp; cold frames &rarr;
          </Link>
        </li>
        <li>
          <AffiliateLink
            href={SUTTONS.fleece}
            product="frost protection fleece"
            type="gear"
            merchant="suttons"
            position="blight-defence-fleece"
            className={linkCls}
          >
            Check fleece for a humid week &rarr;
          </AffiliateLink>
        </li>
      </ul>
    </div>
  );
}

function SeedsCard() {
  return (
    <div className="border border-earth/10 bg-amber-bg p-5">
      <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber-dark mb-3">
        Plan for next season
      </h3>
      <p className="text-sm text-earth-light leading-relaxed mb-3">
        The surest long game is a variety bred to shrug blight off — they keep
        cropping in a bad year while everything around them collapses. Still
        mid-season? You can plant ready-grown grafted ones now; otherwise line
        up the seeds for next spring.
      </p>
      <ul className="space-y-1.5 text-sm">
        <li>
          <AffiliateLink
            href={SUTTONS.graftedCrimsonCrush}
            product="grafted Crimson Crush tomato plant"
            type="seed"
            merchant="suttons"
            position="blight-defence-grafted-crimson-crush"
            className={linkCls}
          >
            Grafted Crimson Crush plants (this year) &rarr;
          </AffiliateLink>
        </li>
        <li>
          <AffiliateLink
            href={SUTTONS.crimsonCrushSeeds}
            product="Crimson Crush tomato seeds"
            type="seed"
            merchant="suttons"
            position="blight-defence-crimson-crush-seeds"
            className={linkCls}
          >
            Crimson Crush tomato seeds (next year) &rarr;
          </AffiliateLink>
        </li>
        <li>
          <AffiliateLink
            href={SUTTONS.sarpoMira}
            product="Sarpo Mira seed potatoes"
            type="seed"
            merchant="suttons"
            position="blight-defence-sarpo-mira"
            className={linkCls}
          >
            Sarpo Mira seed potatoes &rarr;
          </AffiliateLink>
        </li>
      </ul>
    </div>
  );
}

export default function BlightKit() {
  const [level, setLevel] = useState<BlightLevel | null>(null);

  useEffect(() => {
    const loc = loadLocation();
    const lat = loc?.latitude ?? 52.48;
    const lng = loc?.longitude ?? -1.89;
    (async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relative_humidity_2m&past_days=2&forecast_days=5&timezone=Europe/London`
        );
        if (!res.ok) return;
        const h = (await res.json()).hourly;
        setLevel(assessHutton(h.time, h.temperature_2m, h.relative_humidity_2m).level);
      } catch {
        /* silent — fall back to the calm framing */
      }
    })();
  }, []);

  const month = new Date().getMonth(); // 0–11
  const inSeason = month >= 5 && month <= 8; // Jun–Sep
  const protectNow = inSeason && (level === "high" || level === "building");

  const intro = protectNow
    ? "Conditions are turning. You can't cure blight once it strikes — so right now it's all about keeping the leaves dry and being ready to act."
    : inSeason
      ? "Quiet for the moment. The best defence is in place before the warm, humid spells — keep the leaves dry, and line up resistant varieties for next year."
      : "Blight is a June–September problem. Get ahead of next summer with the cover to keep leaves dry and varieties bred to shrug it off.";

  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-2">
        Blight defence kit
      </h2>
      <p className="text-earth-light leading-relaxed max-w-2xl mb-6">{intro}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {protectNow ? (
          <>
            <CoverCard />
            <SeedsCard />
          </>
        ) : (
          <>
            <SeedsCard />
            <CoverCard />
          </>
        )}
      </div>
      <p className="mt-4 text-xs text-earth-lighter">
        Some links are affiliate links — if you buy through them we may earn a
        small commission, at no cost to you. We only point you at kit we&apos;d
        use ourselves.
      </p>
    </section>
  );
}
