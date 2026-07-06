import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Lost in the beds — What To Sow",
  description: "We couldn't find that page. Dot will see you back to where things are growing.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1 px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Dot */}
          <figure className="order-1 lg:order-none">
            <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
              <Image
                src="/photos/blog/dot-allotment-cat-closeup.webp"
                alt="Dot the cat walking through the allotment beds at dusk"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover img-grade"
              />
              <figcaption className="absolute left-3 bottom-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/90 bg-allotment-dark/70 px-2 py-1">
                Dot, chief inspector of the beds
              </figcaption>
            </div>
          </figure>

          {/* Words */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment">
              404 &middot; lost in the beds
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-earth tracking-tight leading-[0.96] mt-4 mb-5">
              This row leads
              <span className="italic text-allotment"> nowhere.</span>
            </h1>
            <p className="text-lg text-earth-light leading-relaxed max-w-[44ch] mb-4">
              Dot can&apos;t find this page either &mdash; and she knows every corner of the plot. It may have
              been moved, or perhaps it was never sown.
            </p>
            <p className="font-serif italic text-lg text-earth-light max-w-[44ch] mb-8">
              No matter. It&apos;s a fine day to be somewhere else on the site &mdash; let&apos;s get you back to
              where things are growing.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-cream bg-allotment hover:bg-allotment-dark transition-colors px-5 py-3"
            >
              Back to What To Sow &rarr;
            </Link>

            <div className="mt-9 pt-7 border-t border-earth/10">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth-lighter mb-3">
                Or wander somewhere useful
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-w-sm">
                <Link href="/sow" className="font-serif text-lg text-earth hover:text-allotment transition-colors">What to sow now</Link>
                <Link href="/crops" className="font-serif text-lg text-earth hover:text-allotment transition-colors">Browse the crops</Link>
                <Link href="/guides" className="font-serif text-lg text-earth hover:text-allotment transition-colors">Growing guides</Link>
                <Link href="/frost-map" className="font-serif text-lg text-earth hover:text-allotment transition-colors">UK frost map</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
