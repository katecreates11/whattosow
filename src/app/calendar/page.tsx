import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LeafDivider } from "@/components/SVGIllustrations";
import SowingTimeline from "@/components/SowingTimeline";
import Link from "next/link";
import type { Crop } from "@/data/crops";
import { MONTH_NAMES, MONTH_SLUGS, getAvgFrostDate, getCropsForMonth } from "@/lib/calendar";

export const metadata: Metadata = {
  title: "Vegetable Planting Calendar UK — What to Sow, Month by Month | What To Sow",
  description:
    "A UK vegetable planting calendar: what to sow indoors, sow outdoors and plant out in every month of the year, crop by crop. Worked from your local frost date.",
  keywords: [
    "vegetable planting calendar UK",
    "UK sowing calendar",
    "when to plant vegetables UK",
    "what to plant now UK",
    "planting calendar",
  ],
  openGraph: {
    title: "Vegetable Planting Calendar UK — What to Sow, Month by Month",
    description:
      "What to sow indoors, sow outdoors and plant out in every month of the year, crop by crop.",
    type: "website",
    locale: "en_GB",
  },
  alternates: {
    canonical: "/calendar",
  },
};

const cropLinkClass =
  "text-earth underline decoration-amber/45 underline-offset-4 hover:text-allotment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-allotment";

function CropList({ label, crops }: { label: string; crops: Crop[] }) {
  if (crops.length === 0) return null;
  return (
    <p className="mt-2 max-w-[68ch] leading-relaxed text-earth-light">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-allotment">{label}</span>{" "}
      {crops.map((crop, index) => (
        <span key={crop.slug}>
          {index > 0 ? ", " : ""}
          <Link href={`/crops/${crop.slug}`} className={cropLinkClass}>
            {crop.name.toLowerCase()}
          </Link>
        </span>
      ))}
      .
    </p>
  );
}

/**
 * The calendar in words. The coloured timeline above is drawn in the browser,
 * so a search engine — and anyone on a slow phone, or using a screen reader —
 * got a page with almost nothing on it. This is the same information, from the
 * same engine, as plain sentences.
 */
function CalendarByMonth() {
  const frostDate = getAvgFrostDate();
  return (
    <section aria-labelledby="month-by-month" className="mt-14">
      <h2 id="month-by-month" className="font-serif text-2xl sm:text-3xl text-earth tracking-tight">
        The year, month by month
      </h2>
      <p className="mt-3 max-w-[62ch] text-earth-light leading-relaxed">
        What goes in when, for a garden with an average UK last frost in mid-April. Gardens further
        north or higher up run a week or three behind; mild coastal ones run ahead.{" "}
        <Link href="/" className="text-allotment underline decoration-amber/60 underline-offset-4 hover:text-allotment-dark">
          Add your postcode
        </Link>{" "}
        and the dates become your own. For the windows about to close this week, see{" "}
        <Link href="/still-time" className="text-allotment underline decoration-amber/60 underline-offset-4 hover:text-allotment-dark">
          still time to sow
        </Link>
        .
      </p>
      <div className="mt-6">
        {MONTH_NAMES.map((name, index) => {
          const { sowIndoors, directSow, plantOut } = getCropsForMonth(index, frostDate);
          const quiet = sowIndoors.length + directSow.length + plantOut.length === 0;
          return (
            <div key={name} className="border-t border-earth/10 py-5">
              <h3 className="font-serif text-xl text-earth">
                <Link href={`/sow/${MONTH_SLUGS[index]}`} className={cropLinkClass}>
                  What to sow in {name}
                </Link>
              </h3>
              {quiet ? (
                <p className="mt-2 max-w-[68ch] leading-relaxed text-earth-light">
                  A quiet month for sowing. Plan the beds, and get the seed order in.
                </p>
              ) : (
                <>
                  <CropList label="Sow indoors" crops={sowIndoors} />
                  <CropList label="Sow outdoors" crops={directSow} />
                  <CropList label="Plant out" crops={plantOut} />
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function CalendarPage() {
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
        name: "Sowing Calendar",
        item: "https://whattosow.co.uk/calendar",
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header backLink={{ href: "/", label: "\u2190 Home" }} />

      <main id="main-content" className="px-6 sm:px-10 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-earth mb-2">UK vegetable planting calendar</h1>
          <p className="text-earth-light mb-1">
            When to sow, plant out, and harvest every crop across the year.
          </p>
          <p className="text-xs text-earth-lighter mb-8">
            Based on UK average frost date (mid-April). Scroll sideways on
            mobile. Tap any crop or month for details.
          </p>

          <SowingTimeline />

          <CalendarByMonth />

          <LeafDivider className="my-8" />

          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <a
              href="/print"
              className="text-allotment hover:text-allotment-dark font-medium"
            >
              Print a sowing chart &rarr;
            </a>
            <a
              href="/"
              className="text-allotment hover:text-allotment-dark font-medium"
            >
              Enter your postcode for personalised dates &rarr;
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
