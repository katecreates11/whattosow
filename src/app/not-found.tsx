import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LeafSprig } from "@/components/SVGIllustrations";

export const metadata: Metadata = {
  title: "Page Not Found — What To Sow",
  description: "Sorry, we couldn't find that page. Head back to What To Sow for personalised UK planting advice.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md py-20">
          <LeafSprig className="w-10 h-14 mx-auto mb-6 text-allotment opacity-60" />
          <h1 className="text-3xl font-bold text-earth mb-3">
            Page not found
          </h1>
          <p className="text-earth-light mb-8">
            Sorry, we couldn&apos;t find that page. It might have been moved or
            doesn&apos;t exist.
          </p>
          <a
            href="/"
            className="inline-block bg-allotment text-white font-medium px-6 py-3 rounded-full hover:bg-allotment-dark transition-colors"
          >
            Back to What To Sow
          </a>

          <div className="mt-10 pt-8 border-t border-earth/6 text-left">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-earth-lighter mb-3">
              Or try one of these
            </p>
            <div className="space-y-2">
              <a href="/calendar" className="block text-sm text-allotment hover:text-allotment-dark">Sowing calendar &rarr;</a>
              <a href="/guides" className="block text-sm text-allotment hover:text-allotment-dark">Growing guides &rarr;</a>
              <a href="/frost-map" className="block text-sm text-allotment hover:text-allotment-dark">UK frost map &rarr;</a>
              <a href="/sow-in" className="block text-sm text-allotment hover:text-allotment-dark">Sow by location &rarr;</a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
