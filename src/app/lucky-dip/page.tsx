import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LuckyDipClient from "./LuckyDipClient";

export const metadata: Metadata = {
  title: "Lucky Dip — Not Sure What to Grow? | What To Sow",
  description:
    "Plant a mystery seed and discover what to grow. A fun way to find your next crop — personalised to what's sowable right now in the UK.",
  keywords: [
    "what to grow now UK",
    "what should I plant",
    "random vegetable to grow",
    "seed lucky dip",
    "garden lucky dip",
    "what to grow on an allotment",
  ],
  openGraph: {
    title: "Lucky Dip — Not Sure What to Grow?",
    description:
      "Plant a mystery seed and discover what to grow next. Personalised to what's in season right now.",
    type: "website",
    url: "https://whattosow.co.uk/lucky-dip",
  },
  alternates: { canonical: "/lucky-dip" },
};

export default function LuckyDipPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content">
        <LuckyDipClient />
      </main>
      <Footer />
    </div>
  );
}
