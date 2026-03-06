import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { crops } from "@/data/crops";
import Image from "next/image";
import { getCropImagePath } from "@/lib/crop-images";

export const metadata: Metadata = {
  title:
    "Spring Vegetables to Plant in the UK — Complete Guide | What To Sow",
  description:
    "The best vegetables to plant in spring in the UK, with exact sowing times based on your frost date. Hardy crops to start now and tender crops to plan for.",
  keywords: [
    "spring vegetables UK",
    "what to plant in spring UK",
    "spring planting guide",
    "vegetables to sow in March",
    "vegetables to sow in April",
    "spring allotment planting",
    "when to start planting UK",
  ],
  openGraph: {
    title: "Spring Vegetables to Plant in the UK",
    description:
      "Hardy crops to start now and tender crops to plan for. Personalise with your postcode.",
    type: "article",
    url: "https://whattosow.co.uk/guides/spring-vegetables",
  },
  alternates: {
    canonical: "/guides/spring-vegetables",
  },
};

export default function SpringVegetablesGuide() {
  const hardyCrops = crops.filter((c) => c.category === "hardy");
  const halfHardyCrops = crops.filter((c) => c.category === "half-hardy");
  const tenderCrops = crops.filter((c) => c.category === "tender");

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
        name: "Guides",
        item: "https://whattosow.co.uk/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Spring Vegetables",
        item: "https://whattosow.co.uk/guides/spring-vegetables",
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Spring Vegetables to Plant in the UK",
    description:
      "The best vegetables to plant in spring in the UK, with exact sowing times based on your frost date.",
    url: "https://whattosow.co.uk/guides/spring-vegetables",
    publisher: {
      "@type": "Organization",
      name: "What To Sow",
      url: "https://whattosow.co.uk",
    },
    datePublished: "2026-03-05",
    dateModified: "2026-03-05",
  };

  function CropRow({ crop }: { crop: (typeof crops)[number] }) {
    const imgPath = getCropImagePath(crop.slug);
    return (
      <a
        href={`/crops/${crop.slug}`}
        className="flex items-center gap-4 p-4 border border-earth/6 hover:border-earth/15 transition-colors group"
      >
        {imgPath ? (
          <Image
            src={imgPath}
            alt=""
            width={48}
            height={48}
            className="rounded-full flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-leaf-bg flex-shrink-0" />
        )}
        <div className="min-w-0">
          <span className="font-semibold text-earth group-hover:text-allotment transition-colors">
            {crop.name}
          </span>
          <p className="text-sm text-earth-light truncate">{crop.tip}</p>
        </div>
      </a>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header backLink={{ href: "/guides", label: "\u2190 Guides" }} />
      <main id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 block">
          Growing guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-4">
          Spring vegetables to plant in the UK
        </h1>
        <p className="text-earth-light leading-relaxed mb-10">
          Spring is the busiest sowing season. But &ldquo;spring&rdquo; means
          something different in Devon and something different in Dundee. The
          key is your local last frost date &mdash;{" "}
          <a href="/" className="text-allotment hover:text-allotment-dark underline decoration-allotment/30">
            enter your postcode
          </a>{" "}
          to find yours.
        </p>

        <div className="space-y-12 text-earth-light leading-relaxed">
          {/* Hardy */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-2">
              Hardy crops &mdash; start now
            </h2>
            <p className="mb-6">
              These can go outdoors before your last frost. They tolerate cold
              nights and light frosts. In most of the UK, you can start sowing
              these from late February through March.
            </p>
            <div className="grid gap-3">
              {hardyCrops.map((crop) => (
                <CropRow key={crop.slug} crop={crop} />
              ))}
            </div>
          </section>

          {/* Half-hardy */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-2">
              Half-hardy crops &mdash; sow indoors now, plant out after frost
            </h2>
            <p className="mb-6">
              These need warmth to germinate but can handle cool (not freezing)
              conditions once established. Start them on a windowsill or in a
              heated propagator in March or April, then plant out a couple of
              weeks after your last frost.
            </p>
            <div className="grid gap-3">
              {halfHardyCrops.map((crop) => (
                <CropRow key={crop.slug} crop={crop} />
              ))}
            </div>
          </section>

          {/* Tender */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-2">
              Tender crops &mdash; patience pays off
            </h2>
            <p className="mb-6">
              Don&apos;t be tempted to sow these too early. They need warm soil
              and no risk of frost. Sow indoors from late March to April, but
              don&apos;t plant out until well after your last frost date &mdash;
              typically late May in the south, early June in the north.
            </p>
            <div className="grid gap-3">
              {tenderCrops.map((crop) => (
                <CropRow key={crop.slug} crop={crop} />
              ))}
            </div>
          </section>

          {/* Timing section */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-2">
              When exactly should I start?
            </h2>
            <p>
              It depends entirely on where you are. A grower in Penzance can
              sow outdoors weeks before someone in Inverness. That&apos;s why
              we built this tool &mdash;{" "}
              <a
                href="/"
                className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
              >
                enter your postcode
              </a>{" "}
              and we&apos;ll calculate your frost date and tell you exactly
              what to sow this week.
            </p>
          </section>

          {/* Cross-links */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-xl font-semibold text-earth mb-4">
              More tools
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="/calendar"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Sowing calendar &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  All 40 crops across 12 months at a glance.
                </p>
              </a>
              <a
                href="/still-time"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  What can you still sow? &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Crops with closing sowing windows this week.
                </p>
              </a>
              <a
                href="/frost-map"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  UK frost map &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  See frost dates across every region.
                </p>
              </a>
              <a
                href="/print"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Print chart &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Pin it to the shed wall.
                </p>
              </a>
              <a
                href="/guides/seed-starting"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Starting from seed &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Compost, temperature, light &mdash; the full guide.
                </p>
              </a>
              <a
                href="/guides/companion-planting"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Companion planting &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  What to plant together and what to keep apart.
                </p>
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
