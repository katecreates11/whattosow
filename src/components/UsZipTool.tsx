"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import UsSeedBuyerNote from "@/components/UsSeedBuyerNote";
import { normaliseUsBetaSource } from "@/lib/us-beta-source";
import { getUsZipSowingAnswer, type UsZipSowingAnswer } from "@/lib/us-zip";

type UmamiWindow = Window & {
  umami?: {
    track: (event: string, data?: Record<string, string>) => void;
  };
};

function readSource() {
  if (typeof window === "undefined") return "direct";
  return normaliseUsBetaSource(new URLSearchParams(window.location.search).get("source"));
}

function trackZipAnswer(answer: UsZipSowingAnswer) {
  if (typeof window === "undefined") return;
  (window as UmamiWindow).umami?.track("us-zip-submitted", {
    ...answer.tracking,
    source: readSource(),
  });
}

export default function UsZipTool() {
  const [zipInput, setZipInput] = useState("");
  const [answer, setAnswer] = useState<UsZipSowingAnswer | null>(null);
  const [error, setError] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (answer) headingRef.current?.focus();
  }, [answer]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextAnswer = getUsZipSowingAnswer(zipInput);

    if (!nextAnswer) {
      setAnswer(null);
      setError("That does not look like a US ZIP code. Try five digits, like 10001.");
      return;
    }

    setError("");
    setAnswer(nextAnswer);
    trackZipAnswer(nextAnswer);
  }

  return (
    <section
      aria-labelledby="us-zip-heading"
      className="border-y border-earth/15 py-8 sm:py-10"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-start">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment mb-3">
            US ZIP beta
          </p>
          <h2
            id="us-zip-heading"
            ref={headingRef}
            tabIndex={-1}
            className="font-serif text-3xl sm:text-4xl text-earth tracking-tight leading-tight focus:outline-none"
          >
            {answer ? `Growing ${answer.regionPhrase}, then.` : "Try your ZIP code."}
          </h2>
          <p className="mt-4 text-earth-light leading-relaxed max-w-[58ch]">
            {answer
              ? `${answer.zoneBand}. ${answer.interpretation}`
              : "This is broad US guidance for now. If enough gardeners use it, we will build the county-level version with USDA zones and local extension links."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label
            htmlFor="us-zip"
            className="block font-mono text-[11px] uppercase tracking-[0.14em] text-earth-light"
          >
            Your ZIP code
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="us-zip"
              name="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="10001"
              value={zipInput}
              onChange={(event) => setZipInput(event.target.value)}
              className="min-h-12 w-full border border-earth/25 bg-cream px-4 font-serif text-lg text-earth outline-none transition-colors focus:border-allotment focus:ring-2 focus:ring-allotment/20"
            />
            <button
              type="submit"
              data-umami-event="us-zip-start"
              className="min-h-12 border border-allotment bg-allotment px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-allotment-dark focus:outline-none focus:ring-2 focus:ring-allotment focus:ring-offset-2 focus:ring-offset-cream"
            >
              Read it
            </button>
          </div>
          {error ? (
            <p className="text-sm text-tomato" role="alert">
              {error}
            </p>
          ) : (
            <p className="text-xs leading-relaxed text-earth-light">
              We track the region, not your full ZIP, so Kate can see whether the US version is worth building properly.
            </p>
          )}
        </form>
      </div>

      <div aria-live="polite" className="mt-8">
        {answer ? (
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-earth-light">
              Worth sowing this week
            </h3>
            <div className="mt-3 border-t border-earth/15">
              {answer.crops.map((crop) => (
                <Link
                  key={crop.href}
                  href={crop.href}
                  className="group grid min-h-16 grid-cols-1 gap-1 border-b border-earth/15 py-3 text-earth transition-colors hover:text-allotment focus:outline-none focus:ring-2 focus:ring-allotment focus:ring-offset-2 focus:ring-offset-cream sm:grid-cols-[minmax(0,1fr)_9rem]"
                >
                  <span>
                    <span className="block font-serif text-2xl leading-tight group-hover:italic">
                      {crop.name}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-earth-light">
                      {crop.note}
                    </span>
                  </span>
                  <span className="self-center font-mono text-[11px] uppercase tracking-[0.14em] text-rust sm:text-right">
                    {crop.method}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/sow"
                className="font-serif text-lg italic text-allotment underline decoration-amber decoration-2 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-allotment focus:ring-offset-2 focus:ring-offset-cream"
              >
                Compare with the UK sowing list &rarr;
              </Link>
              <span className="hidden text-earth/30 sm:inline" aria-hidden="true">
                /
              </span>
              <Link
                href="/guides/what-to-sow-in-summer-uk"
                className="font-serif text-lg italic text-allotment underline decoration-amber decoration-2 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-allotment focus:ring-offset-2 focus:ring-offset-cream"
              >
                Read the summer guide &rarr;
              </Link>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-earth-light">
              {answer.caveat} For exact planting dates, check your local cooperative extension.
            </p>
            <UsSeedBuyerNote />
          </div>
        ) : (
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-earth-light">
              US-average July steer
            </h3>
            <p className="mt-3 max-w-[62ch] font-serif text-xl leading-snug text-earth">
              In much of the US, July rewards quick, heat-aware sowings: basil, French beans, carrots and lettuce,
              with shade and water doing as much work as the calendar.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link href="/crops/basil" className="text-allotment underline decoration-amber underline-offset-4">
                basil
              </Link>
              <Link href="/crops/french-beans" className="text-allotment underline decoration-amber underline-offset-4">
                French beans
              </Link>
              <Link href="/crops/carrots" className="text-allotment underline decoration-amber underline-offset-4">
                carrots
              </Link>
              <Link href="/crops/lettuce" className="text-allotment underline decoration-amber underline-offset-4">
                lettuce
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
