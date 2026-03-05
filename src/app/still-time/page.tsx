import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StillTimePage from "@/components/StillTimePage";

export const metadata: Metadata = {
  title: "What Can You Still Sow? — Closing Sowing Windows | What To Sow",
  description:
    "See which crops you can still sow this week before their window closes. Personalised to your UK postcode and local frost date. Updated daily.",
  keywords: [
    "what to sow now",
    "still time to sow",
    "sowing deadlines UK",
    "last chance to sow",
    "closing sowing windows",
    "what can I still plant",
  ],
  openGraph: {
    title: "What Can You Still Sow This Week?",
    description:
      "Crops with closing sowing windows — personalised to your area. Don't miss these.",
    type: "website",
    url: "https://whattosow.co.uk/still-time",
  },
  alternates: {
    canonical: "/still-time",
  },
};

export default function StillTimePg() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://whattosow.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Still Time to Sow",
        item: "https://whattosow.co.uk/still-time",
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header backLink={{ href: "/", label: "← Home" }} />
      <main id="main-content">
        <StillTimePage />
      </main>
      <Footer />
    </div>
  );
}
