import type { Metadata } from "next";
import Header from "@/components/Header";
import ReactGarden from "@/components/ReactGarden";

export const metadata: Metadata = {
  title: "My Allotment — Your Garden Dashboard | What To Sow",
  description:
    "Your personalised allotment dashboard. Plant seeds, track growth, get weather-based advice, and discover new varieties. Free for every UK postcode.",
  keywords: [
    "allotment planner",
    "garden planner UK",
    "what to grow now UK",
    "what should I plant",
    "allotment dashboard",
    "seed lucky dip",
  ],
  openGraph: {
    title: "My Allotment — Your Garden Dashboard",
    description: "Plant seeds, track growth, get personalised weather advice. Free for every UK postcode.",
    type: "website",
    url: "https://whattosow.co.uk/my-garden",
  },
  alternates: { canonical: "/my-garden" },
};

export default function LuckyDipPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F5EFE0]">
      <Header />
      <main id="main-content">
        <ReactGarden />
      </main>
    </div>
  );
}
