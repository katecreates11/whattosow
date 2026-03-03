import type { Metadata } from "next";
import AllotmentMapLoader from "@/components/AllotmentMapLoader";
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
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-1 text-sm text-allotment hover:text-allotment-dark mb-4"
          >
            &larr; Back to What To Sow
          </a>
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
      </main>
      <Footer />
    </>
  );
}
