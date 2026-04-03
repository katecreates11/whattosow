import type { Metadata } from "next";
import Header from "@/components/Header";
import ReactGarden from "@/components/ReactGarden";

export const metadata: Metadata = {
  title: "My Garden — Your Allotment Dashboard | What To Sow",
  description:
    "Your personalised allotment dashboard. Track your crops, get weather-based watering and harvest reminders, and discover new varieties to grow.",
  keywords: [
    "allotment planner",
    "garden planner UK",
    "virtual allotment",
    "what to plant in my garden",
    "allotment tracker",
  ],
  openGraph: {
    title: "My Garden — Your Allotment Dashboard",
    description: "Track your crops, get weather-based reminders, and discover new varieties.",
    type: "website",
    url: "https://whattosow.co.uk/my-garden",
  },
  alternates: { canonical: "/my-garden" },
};

export default function MyGardenPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F5EFE0]">
      <Header />
      <main id="main-content">
        <ReactGarden />
      </main>
    </div>
  );
}
