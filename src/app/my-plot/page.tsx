import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MyPlotClient from "@/components/MyPlotClient";

export const metadata: Metadata = {
  title: "My Plot | What To Sow",
  description: "What you're growing, and when each thing will be ready — your own allotment, kept track of.",
  alternates: { canonical: "/my-plot" },
  robots: { index: false },
};

export default function MyPlotPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content">
        <section className="px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="font-serif italic text-lg text-allotment mb-2">your plot</div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-earth leading-[0.95] mb-8">
              What you&apos;re growing
            </h1>
            <MyPlotClient />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
