import type { Metadata } from "next";
import AllotmentMapLoader from "@/components/AllotmentMapLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Find Allotments Near You — UK Allotment Finder | What To Sow",
  description:
    "Find allotments near you on an interactive map. Enter your UK postcode to discover allotment sites within 10km, with directions to each one.",
  keywords: [
    "allotments near me",
    "find allotments UK",
    "allotment sites near me",
    "allotment waiting list",
    "allotment finder",
    "UK allotments map",
  ],
  openGraph: {
    title: "Find Allotments Near You — UK Allotment Finder",
    description:
      "Discover allotment sites within 10km of your postcode. Free interactive map with directions.",
    type: "website",
    url: "https://whattosow.co.uk/allotments",
  },
  alternates: {
    canonical: "/allotments",
  },
};

export default function AllotmentsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Find Allotments", item: "https://whattosow.co.uk/allotments" },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f2f2eb]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      {/* Hero */}
      <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <img
          src="/photos/blog/marigold-borders-full-2025.webp"
          alt="Allotment beds with orange marigold borders in summer"
          className="w-full h-full object-cover"
          style={{ filter: "contrast(1.06) saturate(0.82) sepia(0.06) brightness(1.01)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003b44]/80 via-[#003b44]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-10 sm:pb-14">
          <p className="text-[11px] tracking-[0.15em] uppercase font-mono text-white/50 mb-3">What To Sow</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.05]">
            Find allotments<br />near you
          </h1>
        </div>
      </div>

      {/* Intro + Map */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="max-w-2xl mb-10">
          <p className="text-lg text-[#003b44]/70 leading-relaxed">
            Enter your postcode to find allotment sites within 10km — with directions to each one.
            Data from OpenStreetMap. If your local site is missing, you can{" "}
            <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer" className="text-[#003b44] underline underline-offset-2">
              add it
            </a>.
          </p>
        </div>

        <AllotmentMapLoader />
      </div>

      {/* Editorial sections */}
      <div className="border-t border-[#003b44]/10">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-16 grid sm:grid-cols-2 gap-12 sm:gap-16">

          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase font-mono text-[#003b44]/40 mb-4">Getting a plot</p>
            <p className="text-[#003b44]/80 leading-relaxed">
              Contact your local council to join the waiting list. Wait times range from a few months to several years depending on demand — London typically runs longer than rural areas. Most councils have online forms. Search for your council name and &ldquo;allotment waiting list&rdquo;.
            </p>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase font-mono text-[#003b44]/40 mb-4">New to growing</p>
            <p className="text-[#003b44]/80 leading-relaxed mb-5">
              Got your plot? The first season is overwhelming and wonderful in equal measure. Start small — a few things you actually want to eat. Tomatoes, courgettes, and peas are forgiving and rewarding.
            </p>
            <div className="flex flex-col gap-2">
              <a href="/guides/beginners" className="text-sm text-[#003b44] underline underline-offset-2 hover:opacity-70 transition-opacity">
                Beginner&apos;s guide &rarr;
              </a>
              <a href="/guides/companion-planting" className="text-sm text-[#003b44] underline underline-offset-2 hover:opacity-70 transition-opacity">
                Companion planting guide &rarr;
              </a>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
