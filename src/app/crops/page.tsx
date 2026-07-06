import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CropIndex from "@/components/CropIndex";
import { crops } from "@/data/crops";

export const metadata: Metadata = {
  title: "Browse Crops | What To Sow",
  description:
    "Browse every What To Sow crop guide, from tomatoes and carrots to beans, salads, fruit and herbs.",
  alternates: { canonical: "/crops" },
};

export default function CropsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content" className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment">
              crop guides
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-earth tracking-tight leading-[0.96] mt-4 mb-5">
              Browse the crops
            </h1>
            <p className="text-lg text-earth-light leading-relaxed max-w-[48ch]">
              Find the crop you are growing, then open its UK sowing, planting and harvest guide.
            </p>
          </div>
          <CropIndex crops={crops} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
