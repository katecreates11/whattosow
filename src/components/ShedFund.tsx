import Image from "next/image";

/**
 * The shed-fund moment — affiliate framed as honest editorial recommendation.
 * No live counter: we simply say that anything earned through the links goes
 * towards a proper shed for the allotment.
 */
export default function ShedFund() {
  return (
    <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-center">
      <div>
        <p className="font-serif text-2xl sm:text-3xl md:text-[38px] leading-[1.18] tracking-tight text-earth max-w-[18ch] mb-5">
          Somewhere to keep the tools dry, and make tea in the rain.
        </p>
        <p className="text-earth-light max-w-[48ch] mb-4 leading-relaxed">
          Everything here is free. If you buy seeds or kit through our links, a little goes towards a
          proper shed for the allotment &mdash; no ads, just the things we actually use, honestly told.
        </p>
        <p className="font-serif italic text-earth-light max-w-[48ch] leading-relaxed">
          That&apos;s the whole plan: every link is a small step towards a dry place to sit out the rain.
        </p>

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
