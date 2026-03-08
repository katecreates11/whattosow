import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { crops } from "@/data/crops";
import Image from "next/image";
import { getCropImagePath } from "@/lib/crop-images";
import { SectionDivider } from "@/components/GuideVisuals";

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
      <main id="main-content">
        <div className="px-6 sm:px-10 lg:px-16">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 block">
            Growing guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-4 max-w-2xl">
            Spring vegetables to plant in the UK
          </h1>
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            Spring is the busiest sowing season. But &ldquo;spring&rdquo; means
            something different in Devon and something different in Dundee. The
            key is your local last frost date &mdash;{" "}
            <a href="/" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">
              enter your postcode
            </a>{" "}
            to find yours.
          </p>
        </div>

        <div className="space-y-12 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Hardy */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
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
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
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
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
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
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              When exactly should I start?
            </h2>
            <p>
              It depends entirely on where you are. A grower in Penzance can
              sow outdoors weeks before someone in Inverness. That&apos;s why
              we built this tool &mdash;{" "}
              <a
                href="/"
                className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
              >
                enter your postcode
              </a>{" "}
              and we&apos;ll calculate your frost date and tell you exactly
              what to sow this week.
            </p>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <a
                href="/calendar"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                  Sowing calendar
                </span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/still-time"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                  What can you still sow?
                </span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/frost-map"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                  UK frost map
                </span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/print"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                  Print chart
                </span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/guides/seed-starting"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                  Starting from seed
                </span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
              <a
                href="/guides/companion-planting"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                  Companion planting
                </span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
