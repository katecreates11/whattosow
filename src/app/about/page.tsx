import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — What To Sow",
  description:
    "What To Sow is a free UK planting calendar that uses your postcode to calculate your local frost date and tell you exactly what to sow this week. Built by a UK allotment grower.",
  keywords: [
    "about what to sow",
    "UK planting tool",
    "frost date calculator UK",
    "allotment planting calendar",
  ],
  openGraph: {
    title: "About What To Sow",
    description:
      "A free UK planting calendar built by an allotment grower. Enter your postcode, get your frost date, know what to sow.",
    type: "website",
    url: "https://whattosow.co.uk/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
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
        name: "About",
        item: "https://whattosow.co.uk/about",
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
      <main id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-10">
          About What To Sow
        </h1>

        <div className="space-y-8 text-earth-light leading-relaxed">
          <p>
            Every gardening site says the same thing: &ldquo;sow tomatoes in
            March.&rdquo; But March in Cornwall and March in Edinburgh are
            completely different. One has mild frosts behind it. The other has
            snow on the ground.
          </p>

          <p>
            What To Sow fixes that. Enter your UK postcode and the tool
            calculates your local last frost date &mdash; then tells you exactly
            which crops to sow this week, based on where you actually are.
          </p>

          <h2 className="text-xl font-semibold text-earth pt-4">
            How it works
          </h2>

          <p>
            Your postcode is converted to a latitude, longitude, and elevation
            using{" "}
            <a
              href="https://postcodes.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
            >
              Postcodes.io
            </a>
            . From there, we estimate your last frost date using a model
            calibrated against{" "}
            <a
              href="https://www.metoffice.gov.uk/research/climate/maps-and-data/uk-climate-averages"
              target="_blank"
              rel="noopener noreferrer"
              className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
            >
              Met Office
            </a>{" "}
            climate averages. Altitude, latitude, and coastal proximity all
            factor in &mdash; a sheltered coastal garden in Devon gets a very
            different date from an exposed hilltop in the Pennines.
          </p>

          <p>
            Real-time soil temperatures and frost forecasts come from{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
            >
              Open-Meteo
            </a>
            , which incorporates UK Met Office data. When we say there&apos;s a
            frost risk tonight, it&apos;s based on your actual forecast &mdash;
            not a rule of thumb.
          </p>

          <h2 className="text-xl font-semibold text-earth pt-4">
            How accurate is it?
          </h2>

          <p>
            Our frost date estimates are typically accurate to within 5&ndash;7
            days. But frost dates are long-term averages &mdash; in any given
            year the actual last frost could be earlier or later.
            Microclimates matter too: a south-facing wall, a frost pocket, or
            an urban heat island can shift your conditions by a week or more.
            The tool gets you close. Your own observations get you the rest of
            the way.
          </p>

          <h2 className="text-xl font-semibold text-earth pt-4">
            Why it&apos;s free
          </h2>

          <p>
            Personalised planting advice shouldn&apos;t sit behind a
            subscription. The data is open, the tool is free, and it always
            will be. Some links on the site are affiliate links to seed
            suppliers &mdash; if you buy through them, we earn a small
            commission at no extra cost to you.
          </p>

          <p>
            If the tool&apos;s been useful and you&apos;d like to help keep it
            running, you can{" "}
            <a
              href="https://ko-fi.com/whattosow"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="ko-fi-click"
              data-umami-event-location="about-page"
              className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
            >
              buy us a coffee
            </a>
            . Completely optional &mdash; the site stays free either way.
          </p>

          <h2 className="text-xl font-semibold text-earth pt-4">
            Get in touch
          </h2>

          <p>
            Questions, feedback, or just want to say hello:{" "}
            <a
              href="mailto:hello@whattosow.co.uk"
              className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
            >
              hello@whattosow.co.uk
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
