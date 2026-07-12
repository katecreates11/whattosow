import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UsZipTool from "@/components/UsZipTool";

export const metadata: Metadata = {
  title: "What to Sow Now by ZIP Code — US beta | What To Sow",
  description:
    "A small US beta from What To Sow: enter a ZIP code for a broad regional sowing steer, with crop links and clear caveats.",
  alternates: { canonical: "/us" },
};

export default function UsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content" className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <section className="pb-8 sm:pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment mb-4">
              what to sow · United States test
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-earth tracking-tight leading-[0.96] max-w-[12ch]">
              What can I sow now in my ZIP code?
            </h1>
            <p className="mt-5 max-w-[58ch] font-serif text-xl sm:text-2xl italic leading-snug text-earth-light">
              A first American doorway into the allotment brain: broad, honest, and useful enough to tell us whether
              we should build the proper ZIP-code version.
            </p>
          </section>

          <UsZipTool />

          <section className="py-10 sm:py-12">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
              <div>
                <h2 className="font-serif text-3xl text-earth tracking-tight">
                  What this is, and what it is not.
                </h2>
                <p className="mt-4 leading-relaxed text-earth-light">
                  What To Sow is written from a UK allotment, so this page does not pretend to know every American
                  county yet. It uses your ZIP prefix to give a broad regional steer, then sends you into the same crop
                  field guide while we learn whether US gardeners want the full version.
                </p>
              </div>
              <div className="border-t border-earth/15 pt-5 md:pt-0">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-earth-light">
                  The next proper build
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-earth-light">
                  If ZIP searches show up in the data, the next pass should add county-level climate normals, USDA
                  zones, extension links and US seed suppliers. No pretending before the data earns it.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
