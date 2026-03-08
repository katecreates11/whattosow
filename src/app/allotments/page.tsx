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
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://whattosow.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Find Allotments",
        item: "https://whattosow.co.uk/allotments",
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header backLink={{ href: "/", label: "\u2190 Home" }} />
      <main id="main-content" className="px-6 sm:px-10 lg:px-16 py-10 sm:py-14">
        <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-earth mb-3">
            Find allotments near you
          </h1>
          <p className="text-earth-light max-w-xl">
            Enter your postcode to find allotment sites within 10km. Click any
            marker for the name and directions. Data from OpenStreetMap — if your
            local site is missing, you can{" "}
            <a
              href="https://www.openstreetmap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-allotment underline"
            >
              add it to OSM
            </a>
            .
          </p>
        </div>

        <AllotmentMapLoader />

        <div className="mt-10 border border-earth/6 p-6">
          <h2 className="font-semibold text-earth mb-2">
            New to growing?
          </h2>
          <p className="text-sm text-earth-light mb-3">
            Got your plot and not sure where to start? Our beginner&apos;s guide covers
            what to grow, when to sow, and how to make the most of your first season.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="/guides/beginners" className="text-sm font-medium text-allotment hover:text-allotment-dark transition-colors">
              Beginner&apos;s guide &rarr;
            </a>
            <a href="/sow-in" className="text-sm font-medium text-allotment hover:text-allotment-dark transition-colors">
              Find your local sowing guide &rarr;
            </a>
          </div>
        </div>

        <div className="mt-10 bg-allotment-bg rounded-xl p-4 text-sm text-earth-light space-y-2">
          <p>
            <strong className="text-earth">How to get an allotment:</strong>{" "}
            Contact your local council to join the waiting list. Wait times vary
            from a few months to several years depending on demand. Many councils
            have online forms — search &ldquo;[your council name] allotment
            waiting list&rdquo;.
          </p>
          <p className="text-xs text-earth-lighter">
            Allotment locations from{" "}
            <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer" className="text-allotment hover:underline">
              OpenStreetMap
            </a>{" "}
            via the Overpass API. Map tiles &copy; OpenStreetMap contributors.
          </p>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
