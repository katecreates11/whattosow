import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CropIndex from "@/components/CropIndex";
import { crops } from "@/data/crops";

export const metadata: Metadata = {
  title: "Vegetable & Fruit Growing Guides — Every Crop | What To Sow",
  description:
    "The What To Sow field-guide index: every UK crop guide, numbered and grouped by hardiness, with this week's sowing and planting tags.",
  alternates: { canonical: "/crops" },
};

export default function CropsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content" className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment">
              crop index
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-earth tracking-tight leading-[0.96] mt-4 mb-5">
              The crops
            </h1>
            <p className="max-w-[52ch] text-lg leading-relaxed text-earth-light">
              Everything in the field guide, numbered like the crop pages, with this week&apos;s moment at a glance.
            </p>
          </div>
          <CropIndex crops={crops} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
