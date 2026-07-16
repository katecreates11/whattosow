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
 * so this keeps one immediate buy-point and points variety choice to the table
 * below. We read the visitor's live risk
 * (same Hutton assessment as the banner) and:
 *   - when blight is in season AND building/high → lead with KEEPING LEAVES DRY
 *     (cover + soil-level watering, where site rules allow it),
 *   - otherwise → lead with RESISTANT VARIETIES (a plan-for-next-year buy).
 *
 * If we have no location or the weather API is down, we fall back to the calm
 * "plan ahead" framing — we never claim risk we haven't measured.
 */

const linkCls =
  "italic text-rust hover:text-earth transition-colors underline decoration-rust/30";

const SOAKER_HOSE_URL = "https://www.amazon.co.uk/dp/B000TAFENY";

function CoverCard() {
  return (
    <div className="border border-earth/10 bg-leaf-bg p-5">
      <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-allotment mb-3">
        Worth buying now
      </h3>
      <p className="text-sm text-earth-light leading-relaxed mb-3">
        Blight needs wet leaves to take hold. Growing under cover is the single
        biggest protection; outdoors, water low at the soil and keep the leaves
        dry. A soaker hose helps where your site rules allow it. This is
        prevention, not a cure.
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
            href={SOAKER_HOSE_URL}
            product="soaker hose"
            type="gear"
            merchant="amazon-uk"
            position="blight-defence-soaker-hose"
            className={linkCls}
          >
            Soaker hose for soil-level watering &rarr;
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
        cropping in a bad year while everything around them struggles. The
        variety table below is the place to choose; this note is just the nudge
        to plan before the next humid spell.
      </p>
      <ul className="space-y-1.5 text-sm">
        <li>
          <a href="#resistant-varieties" className={linkCls}>
            Jump to the resistant varieties &rarr;
          </a>
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
