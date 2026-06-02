import Image from "next/image";

/**
 * The shed-fund moment — affiliate framed as honest editorial recommendation.
 * GOAL is the Den Sheds Hipex (~£800). RAISED is deliberately conservative and
 * EDITABLE — set it to the real figure once affiliate income is confirmed; do
 * not invent a total. When RAISED is 0 we show an invitation, not a fake bar.
 */
const GOAL = 800;
const RAISED = 0; // ← update with the real running total

export default function ShedFund() {
  const pct = Math.max(0, Math.min(100, Math.round((RAISED / GOAL) * 100)));

  return (
    <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-center">
      <div>
        <p className="font-serif text-2xl sm:text-3xl md:text-[38px] leading-[1.18] tracking-tight text-earth max-w-[18ch] mb-5">
          Somewhere to keep the tools dry, and make tea in the rain.
        </p>
        <p className="text-earth-light max-w-[48ch] mb-6 leading-relaxed">
          Everything here is free. If you buy seeds or kit through our links, a little goes towards a
          proper shed for the allotment. No ads &mdash; just the things we actually use, honestly told.
        </p>

        {RAISED > 0 ? (
          <>
            <div className="h-[5px] max-w-[340px] bg-allotment/15 relative mb-2.5">
              <span className="absolute inset-y-0 left-0 bg-amber" style={{ width: `${pct}%` }} />
            </div>
            <div className="font-mono text-[11px] text-earth-light">
              <b className="text-earth">&pound;{RAISED}</b> of &pound;{GOAL} &middot; the Den Sheds Hipex
            </div>
          </>
        ) : (
          <div className="font-mono text-[11px] text-earth-light">
            Saving towards the &pound;{GOAL} Den Sheds Hipex &middot; just getting started
          </div>
        )}

        <a
          href="/guides"
          data-umami-event="shed-kit-click"
          className="inline-block mt-6 font-serif italic text-lg text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
        >
          Browse the kit we actually use &rarr;
        </a>
      </div>

      <div className="relative">
        <Image
          src="/images/headers/hero-allotment.webp"
          alt="Illustration of the allotment with its dream shed"
          width={1200}
          height={669}
          sizes="(max-width: 768px) 100vw, 45vw"
          className="w-full h-auto img-grade"
        />
        <span className="absolute -bottom-3 right-1.5 font-serif italic text-[15px] text-allotment bg-cream px-3 py-1">
          our dream shed
        </span>
      </div>
    </div>
  );
}
