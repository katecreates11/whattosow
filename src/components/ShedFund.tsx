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
        <p className="text-[17px] text-earth-light max-w-[46ch] leading-relaxed">
          Everything here is free. If you buy seeds or kit through our links, a little goes towards a
          proper shed for the allotment. No ads, just the things we actually use, honestly told.
        </p>

        <p className="mt-6 text-[17px]">
          <a
            href="/guides"
            data-umami-event="shed-kit-click"
            className="text-allotment underline decoration-allotment/30 underline-offset-4 hover:decoration-allotment"
          >
            The kit we actually use
          </a>
        </p>
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
          the shed we&apos;re saving for
        </span>
      </div>
    </div>
  );
}
