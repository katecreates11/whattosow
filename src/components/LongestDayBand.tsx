"use client";

import { useEffect, useState } from "react";
import { loadLocation } from "@/lib/location-storage";
import { getSunTimes, formatDaylight, UK_DEFAULT_LAT, UK_DEFAULT_LNG } from "@/lib/astronomy";
import { summerSolstice, isMidsummerWindow } from "@/lib/solstice";
import { SunIcon } from "@/components/SVGIllustrations";

/**
 * The midsummer moment — appears on the homepage only in the week around the
 * solstice (self-gated by date, so no rebuild needed to switch it on/off).
 * Personalises the longest-day length to the visitor's postcode, then turns it
 * into the gardening pivot: from here, start sowing for the cold months.
 */
export default function LongestDayBand() {
  const [view, setView] = useState<{ place: string | null; daylight: string } | null>(null);

  useEffect(() => {
    const update = () => {
      if (!isMidsummerWindow(new Date())) {
        setView(null);
        return;
      }
      const loc = loadLocation();
      const lat = loc?.latitude ?? UK_DEFAULT_LAT;
      const lng = loc?.longitude ?? UK_DEFAULT_LNG;
      const mins = getSunTimes(summerSolstice(), lat, lng).daylightMinutes;
      setView({ place: loc?.adminDistrict ?? null, daylight: formatDaylight(mins) });
    };
    update();
    window.addEventListener("whattosow:location-updated", update);
    return () => window.removeEventListener("whattosow:location-updated", update);
  }, []);

  if (!view) return null;

  return (
    <section aria-label="The longest day" className="mesh-ochre">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="flex items-start gap-5">
          <SunIcon className="w-10 h-10 text-amber shrink-0 mt-1" />
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-allotment block mb-3">
              Midsummer &middot; the longest day
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-earth leading-[0.98] mb-4">
              The longest day
            </h2>
            <p className="font-serif text-lg sm:text-xl text-earth-light leading-snug max-w-[52ch]">
              {view.place ? (
                <>
                  <span className="text-earth">{view.place}</span> gets{" "}
                </>
              ) : (
                "The middle of the country gets "
              )}
              <span className="text-earth font-medium">{view.daylight}</span> of daylight around now
              &mdash; the most of the whole year.
              {!view.place && (
                <>
                  {" "}
                  <a href="#main-content" className="text-rust underline decoration-rust/30 hover:text-earth transition-colors">
                    Add your postcode
                  </a>{" "}
                  for your own.
                </>
              )}
            </p>
            <p className="text-earth-light leading-relaxed max-w-[56ch] mt-4">
              From here the year quietly tips over. The change is gentle at first &mdash; barely a
              minute a day for a while yet &mdash; but midsummer is the grower&apos;s signal to start
              thinking about the far end of the season.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-serif italic text-allotment">
              <a href="/longest-day" className="border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">
                More on the longest day &rarr;
              </a>
              <a href="/guides/succession-sowing" className="border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">
                Keep sowing &rarr;
              </a>
              <a href="/guides/autumn-winter-vegetables" className="border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">
                Sow for autumn &amp; winter &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
