import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MyGardenClient from "./MyGardenClient";

export const metadata: Metadata = {
  title: "My Garden — Your Virtual Allotment | What To Sow",
  description:
    "Your personal allotment planner. Collect varieties, plant your garden, and track your harvest. A virtual plot that grows with you.",
  keywords: [
    "allotment planner",
    "garden planner UK",
    "virtual allotment",
    "what to plant in my garden",
    "allotment tracker",
  ],
  openGraph: {
    title: "My Garden — Your Virtual Allotment",
    description: "Collect varieties, plant your garden, and track your harvest.",
    type: "website",
    url: "https://whattosow.co.uk/my-garden",
  },
  alternates: { canonical: "/my-garden" },
};

export default function MyGardenPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content">
        <MyGardenClient />
      </main>
      <Footer />
    </div>
  );
}
