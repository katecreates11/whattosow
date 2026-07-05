import { notFound } from "next/navigation";
import Image from "next/image";
import { crops, type Crop } from "@/data/crops";
import { varieties } from "@/data/varieties";
import { awinLink } from "@/lib/awin";
import { merchantSlug } from "@/components/AffiliateLink";
import { varietySlug } from "@/lib/variety-routes";
import type { Metadata } from "next";

import PlantingTool from "@/components/PlantingTool";
import PersonalisedCropDates from "@/components/PersonalisedCropDates";
import SowPlanner from "@/components/SowPlanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlightRisk from "@/components/BlightRisk";
import LogPlanting from "@/components/LogPlanting";
import PinButton from "@/components/PinButton";
import UnsplashHero from "@/components/UnsplashHero";

import {
  HardyIllustration,
  HalfHardyIllustration,
  TenderIllustration,
  getCropIcon,
} from "@/components/SVGIllustrations";
import { getCropImagePath } from "@/lib/crop-images";
import { getCropPhoto } from "@/lib/crop-photos";
import { getMinSoilTemp } from "@/data/crops";
import SeedSupplierLinks from "@/components/SeedSupplierLinks";
import CropKit from "@/components/CropKit";
import ContextualEmailCapture from "@/components/ContextualEmailCapture";
import CropScrollDepth from "@/components/CropScrollDepth";
import SpacingDiagram from "@/components/SpacingDiagram";
import GrowingJourney from "@/components/GrowingJourney";
import { getCropActionMonths, getAvgFrostDate, MONTH_NAMES, MONTH_SLUGS } from "@/lib/calendar";

function CompanionSection({ crop }: { crop: Crop }) {
  if (!crop.companionPlants?.length && !crop.avoidPlants?.length) return null;

  return (
    <div className="mb-10">
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
      {crop.companionPlants && crop.companionPlants.length > 0 && (
        <div className="bg-sage p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-leaf" />
            <h2 className="font-semibold text-earth">Good companions</h2>
          </div>
          <ul className="space-y-1.5">
            {crop.companionPlants.map((name) => {
              const companion = crops.find((c) => c.name === name);
              return (
                <li key={name} className="text-sm text-earth-light">
                  {companion ? (
                    <a href={`/crops/${companion.slug}`} className="text-allotment hover:underline">
                      {name}
                    </a>
                  ) : (
                    name
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {crop.avoidPlants && crop.avoidPlants.length > 0 && (
        <div className="bg-blush p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-tomato" />
            <h2 className="font-semibold text-earth">Keep apart from</h2>
          </div>
          <ul className="space-y-1.5">
            {crop.avoidPlants.map((name) => (
              <li key={name} className="text-sm text-earth-light">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
      <a
        href="/guides/companion-planting"
        className="inline-block mt-4 font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
      >
        Full companion planting guide &amp; chart &rarr;
      </a>
    </div>
  );
}

function categoryLabel(cat: Crop["category"]): string {
  switch (cat) {
    case "hardy":
      return "Hardy — can tolerate frost";
    case "half-hardy":
      return "Half-hardy — needs some protection";
    case "tender":
      return "Tender — no frost tolerance";
  }
}

const categoryDot: Record<string, string> = {
  hardy: "bg-leaf",
  "half-hardy": "bg-amber",
  tender: "bg-tomato",
};

function categoryHeaderBg(cat: Crop["category"]): string {
  switch (cat) {
    case "hardy":
      return "bg-sage";
    case "half-hardy":
      return "bg-ochre";
    case "tender":
      return "bg-blush";
  }
}

function CategoryIllustration({ category, className }: { category: Crop["category"]; className?: string }) {
  switch (category) {
    case "hardy":
      return <HardyIllustration className={className} />;
    case "half-hardy":
      return <HalfHardyIllustration className={className} />;
    case "tender":
      return <TenderIllustration className={className} />;
  }
}

const actionLabels: Record<string, string> = {
  sowIndoors: "Sow indoors",
  directSow: "Direct sow",
  plantOut: "Plant out",
};

function SowingMonths({ crop }: { crop: Crop }) {
  const frostDate = getAvgFrostDate();
  const actions = getCropActionMonths(crop, frostDate).filter(a => a.action !== "harvest");
  if (actions.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="font-semibold text-earth mb-4">
        When to sow {crop.name.toLowerCase()}
      </h2>
      <div className="space-y-3">
        {actions.map(({ action, months }) => (
          <div key={action} className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-earth-lighter w-24 shrink-0">
              {actionLabels[action]}
            </span>
            {months.map(m => (
              <a
                key={m}
                href={`/sow/${MONTH_SLUGS[m]}`}
                className="text-sm text-rust hover:text-earth underline decoration-rust/30 transition-colors"
              >
                {MONTH_NAMES[m]}
              </a>
            ))}
          </div>
        ))}
      </div>
      <p className="text-xs text-earth-lighter mt-3">
        Based on UK average frost date. <a href="/" className="text-rust hover:underline">Enter your postcode</a> for exact dates, or <a href="/sow-in" className="text-rust hover:underline">find your city</a>.
      </p>
    </div>
  );
}

// Thirsty summer crops — these get a contextual link to the watering review.
const THIRSTY = new Set([
  "tomatoes", "courgettes", "cucumbers", "runner-beans", "peppers",
  "chillies", "aubergine", "pumpkins", "sweetcorn", "celery",
]);

export async function generateStaticParams() {
  return crops.map((crop) => ({ slug: crop.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const crop = crops.find((c) => c.slug === slug);
  if (!crop) return {};

  const photo = getCropPhoto(slug);

  return {
    title: `When to Plant ${crop.name} in the UK — What To Sow`,
    description: `Find out exactly when to sow and plant ${crop.name.toLowerCase()} based on your UK postcode. Get your local frost date and personalised planting times for ${crop.name.toLowerCase()}.`,
    keywords: [
      `when to plant ${crop.name.toLowerCase()} UK`,
      `when to sow ${crop.name.toLowerCase()}`,
      `${crop.name.toLowerCase()} planting time UK`,
      `grow ${crop.name.toLowerCase()} UK`,
    ],
    openGraph: {
      title: `When to Plant ${crop.name} in the UK`,
      description: `Personalised planting times for ${crop.name.toLowerCase()} based on your UK postcode and local frost date.`,
      type: "article",
      locale: "en_GB",
      images: [
        ...(photo ? [{ url: photo.hero, alt: photo.alt, width: 1200, height: 800 }] : []),
        // Vertical pin for Pinterest Rich Pins (2:3 is what Pinterest wants)
        { url: `/pins/crops/${slug}/full`, alt: `When to sow ${crop.name.toLowerCase()} in the UK`, width: 1000, height: 1500 },
      ],
    },
    alternates: {
      canonical: `/crops/${slug}`,
    },
  };
}

export default async function CropPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const crop = crops.find((c) => c.slug === slug);
  if (!crop) notFound();

  const otherCrops = crops.filter((c) => c.slug !== crop.slug);
  const sameCategoryCrops = otherCrops.filter((c) => c.category === crop.category);
  const otherCategoryCrops = otherCrops.filter((c) => c.category !== crop.category);

  // Field-guide framing: specimen number, our-photo flag, and the standout
  // variety (for the editorial pull-quote, if this crop has a legendary pick).
  const cropNo = crops.findIndex((c) => c.slug === crop.slug) + 1;
  const cropPhoto = getCropPhoto(crop.slug);
  const legendaryVariety = varieties.find((v) => v.cropSlug === crop.slug && v.rarity === "legendary");

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
        name: "Crops",
        item: "https://whattosow.co.uk/#explore-crops",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: crop.name,
        item: `https://whattosow.co.uk/crops/${crop.slug}`,
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Grow ${crop.name} in the UK`,
    description: crop.tip,
    step: [
      ...(crop.sowIndoorsWeeks
        ? [
            {
              "@type": "HowToStep",
              name: "Start seeds indoors",
              text: `Sow ${crop.name.toLowerCase()} seeds indoors ${crop.sowIndoorsWeeks} weeks before your last frost date.`,
            },
          ]
        : []),
      ...(crop.directSowWeeks != null
        ? [
            {
              "@type": "HowToStep",
              name: "Direct sow outdoors",
              text: `Direct sow ${crop.name.toLowerCase()} seeds outdoors ${crop.directSowWeeks >= 0 ? `${crop.directSowWeeks} weeks after` : `${Math.abs(crop.directSowWeeks)} weeks before`} your last frost date.`,
            },
          ]
        : []),
      ...(crop.plantOutWeeks != null
        ? [
            {
              "@type": "HowToStep",
              name: "Plant out",
              text: `Plant out ${crop.name.toLowerCase()} ${crop.plantOutWeeks >= 0 ? `${crop.plantOutWeeks} weeks after` : `${Math.abs(crop.plantOutWeeks)} weeks before`} your last frost date.`,
            },
          ]
        : []),
      ...(crop.harvestWeeks
        ? [
            {
              "@type": "HowToStep",
              name: "Harvest",
              text: `Harvest ${crop.name.toLowerCase()} approximately ${crop.harvestWeeks} weeks after planting.`,
            },
          ]
        : []),
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <CropScrollDepth slug={crop.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Header backLink={{ href: "/#explore-crops", label: "\u2190 All crops" }} />

      <article id="main-content">
        {/* Hero photo — local allotment photography preferred, Unsplash fallback */}
        {cropPhoto ? (
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
            <Image
              src={cropPhoto.hero}
              alt={cropPhoto.alt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <span className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-white/90 border border-white/40 px-3 py-1.5">
              No. {cropNo} &middot; {categoryLabel(crop.category)}
            </span>
            <span className="absolute left-4 bottom-4 font-mono text-[9px] uppercase tracking-[0.1em] text-white/90 bg-allotment-dark/70 px-2 py-1">
              from our plot
            </span>
          </div>
        ) : crop.unsplashId ? (
          <UnsplashHero unsplashId={crop.unsplashId} cropName={crop.name} />
        ) : null}

        {/* Crop Header — overlaps photo */}
        <div
          className={`${categoryHeaderBg(crop.category)} ${getCropPhoto(crop.slug) || crop.unsplashId ? "-mt-16 relative z-10" : ""} px-6 sm:px-10 lg:px-16`}
        >
          <div className={`max-w-4xl mx-auto ${getCropPhoto(crop.slug) || crop.unsplashId ? "pt-10 sm:pt-12" : "pt-12 sm:pt-20"} pb-12`}>
            <div>
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-6">
                  <span className={`w-2 h-2 rounded-full ${categoryDot[crop.category]}`} />
                  <span className="text-xs font-semibold tracking-[0.1em] uppercase text-earth-lighter">
                    {categoryLabel(crop.category)}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-earth tracking-tight leading-[0.95] mb-6">
                  When to plant<br />
                  <span className="font-normal">{crop.name.toLowerCase()}</span> in the UK
                </h1>
                <p className="font-serif text-xl text-earth-light leading-relaxed max-w-2xl">
                  <span className="float-left font-serif text-[58px] leading-[0.6] pr-3 pt-2 text-allotment">
                    {crop.tip.charAt(0)}
                  </span>
                  {crop.tip.slice(1)}
                </p>
                {(getCropPhoto(crop.slug) || crop.unsplashId) && (
                  <div className="mt-5">
                    <PinButton
                      path={`/crops/${crop.slug}`}
                      image={`/pins/crops/${crop.slug}/full`}
                      description={`When to sow ${crop.name.toLowerCase()} in the UK — sowing dates for your postcode, the best varieties, and where to buy seeds. #${crop.name.toLowerCase().replace(/\s+/g, "")} #vegetablegarden #allotment #ukgardening #growyourown`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16"><div className="max-w-4xl mx-auto lg:flex lg:gap-12">
          {/* Main content */}
          <div className="lg:w-[58%]">
            {/* Specimen data strip — herbarium tag, real fields only */}
            <div className="flex flex-wrap border border-earth/15 mb-10">
              <div className="flex-1 min-w-[110px] px-4 py-3 border-r border-earth/10">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-earth-lighter">Type</div>
                <div className="font-serif text-xl text-earth capitalize mt-1 leading-none">{categoryLabel(crop.category)}</div>
              </div>
              <div className="flex-1 min-w-[110px] px-4 py-3 border-r border-earth/10">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-earth-lighter">To harvest</div>
                <div className="font-serif text-xl text-earth mt-1 leading-none">{crop.harvestWeeks} <span className="text-[13px] text-earth-light">wks</span></div>
              </div>
              <div className="flex-1 min-w-[110px] px-4 py-3 border-r border-earth/10">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-earth-lighter">Spacing</div>
                <div className="font-serif text-xl text-earth mt-1 leading-none">{crop.spacingCm} <span className="text-[13px] text-earth-light">cm</span></div>
              </div>
              <div className="flex-1 min-w-[110px] px-4 py-3">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-earth-lighter">Min soil</div>
                <div className="font-serif text-xl text-earth mt-1 leading-none">{getMinSoilTemp(crop)}<span className="text-[13px] text-earth-light">&deg;C</span></div>
              </div>
            </div>

            <PersonalisedCropDates crop={crop} />

            {/* Interactive: plan your own dates from when you actually sowed */}
            <div className="mt-8">
              <SowPlanner
                slug={crop.slug}
                sowIndoorsWeeks={crop.sowIndoorsWeeks}
                directSowWeeks={crop.directSowWeeks}
                plantOutWeeks={crop.plantOutWeeks}
                harvestWeeks={crop.harvestWeeks}
              />
            </div>

            {/* Growing journey timeline */}
            <GrowingJourney crop={crop} />

            {/* Inline seed CTA — mobile-visible, high engagement position */}
            <SeedSupplierLinks crop={crop} variant="inline" />

            {/* Growing needs */}
            <div className="bg-sage p-6 sm:p-8 mb-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-allotment block mb-2">How to grow</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-3">
                What {crop.name.toLowerCase()} need
              </h2>
              <p className="text-earth-light leading-relaxed">{crop.needs}</p>
            </div>

            {/* Live blight risk — for blight-prone crops (tomatoes, potatoes) */}
            {crop.blightRisk && (
              <div className="mb-10">
                <BlightRisk variant="compact" />
              </div>
            )}

            {/* The opinionated pick — drawn from this crop's standout variety */}
            {legendaryVariety && (
              <blockquote className="border-l-4 border-rust pl-6 my-12 max-w-[36ch]">
                <p className="font-serif italic text-2xl sm:text-3xl text-earth leading-snug">
                  {legendaryVariety.personality.split(/(?<=[.!])\s/)[0]}
                </p>
                <cite className="not-italic font-mono text-[11px] uppercase tracking-[0.14em] text-earth-lighter mt-3 block">
                  {legendaryVariety.name} &middot; our pick
                </cite>
              </blockquote>
            )}

            {/* Spacing diagram */}
            <SpacingDiagram crop={crop} />

            {/* Varieties — the field guide: write-ups, recipes, per-variety seeds */}
            {(() => {
              const vs = varieties.filter((v) => v.cropSlug === crop.slug);
              if (vs.length === 0) return null;
              return (
                <div className="mb-12">
                  <span className="font-serif italic text-lg text-allotment block mb-1">the varieties</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-2">
                    Varieties worth growing
                  </h2>
                  <div className="space-y-10">
                    {vs.map((v) => (
                      <div key={v.id} className="border-t border-earth/10 pt-7">
                        <div className="flex items-baseline gap-3 flex-wrap mb-2">
                          <h3 className="font-serif text-2xl text-earth">
                            <a
                              href={`/crops/${crop.slug}/${varietySlug(v)}`}
                              className="hover:text-allotment transition-colors"
                            >
                              {v.name}
                            </a>
                          </h3>
                          <span
                            className={`font-mono text-[10px] uppercase tracking-[0.12em] ${v.rarity === "legendary" ? "text-amber" : "text-earth-lighter"}`}
                          >
                            {v.rarity === "legendary" && "★ "}
                            {v.rarity}
                          </span>
                        </div>
                        <p className="text-earth-light leading-relaxed max-w-[60ch]">{v.personality}</p>

                        {v.recipes.length > 0 && (
                          <div className="mt-5 bg-ochre/50 p-5">
                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-allotment block mb-3">
                              in the kitchen
                            </span>
                            <div className="space-y-4">
                              {v.recipes.map((r) => (
                                <div key={r.name}>
                                  <h4 className="font-serif text-lg text-earth">{r.name}</h4>
                                  <p className="text-sm text-earth-light leading-relaxed mt-0.5">{r.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {v.seedSuppliers.length > 0 && (
                          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter">
                              find the seeds
                            </span>
                            {v.seedSuppliers.map((s) => (
                              <a
                                key={s.name}
                                href={awinLink(s.url)}
                                target="_blank"
                                rel="sponsored noopener noreferrer"
                                data-umami-event="affiliate-click"
                                data-umami-event-product={v.name} data-umami-event-type="seed" data-umami-event-merchant={merchantSlug(s.name)}
                                className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
                              >
                                {s.name} &rarr;
                              </a>
                            ))}
                          </div>
                        )}

                        <div className="mt-4">
                          <a
                            href={`/crops/${crop.slug}/${varietySlug(v)}`}
                            className="font-mono text-[10px] uppercase tracking-[0.1em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
                          >
                            {v.name} &mdash; full guide &rarr;
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {THIRSTY.has(crop.slug) && (
              <div className="mb-10 border-l-2 border-amber pl-5">
                <p className="text-earth-light leading-relaxed max-w-[60ch]">
                  {crop.name} drink heavily through summer &mdash; a good soak at the roots beats a daily
                  sprinkle.{" "}
                  <a
                    href="/blog/watering-lance-allotment"
                    className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
                  >
                    How I water, and the lance I use &rarr;
                  </a>
                </p>
              </div>
            )}

            <CompanionSection crop={crop} />

            {/* When to sow — month links */}
            <SowingMonths crop={crop} />

            {/* Contextual email capture */}
            <div className="mb-10">
              <ContextualEmailCapture cropName={crop.name} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[42%]">
            <div className="lg:sticky lg:top-20 space-y-8">
              {/* Seeds — the buy-point leads the sticky rail (click priority) */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-allotment block mb-3">Start this crop</span>
                <SeedSupplierLinks crop={crop} variant="sidebar" />
              </div>

              {/* Kit recommendations */}
              <CropKit slug={crop.slug} cropName={crop.name} />

              {/* Personalise CTA */}
              <div id="get-dates" className="bg-allotment-dark p-6 sm:p-8 scroll-mt-20">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Get your exact dates
                </h2>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">
                  Enter your postcode for personalised planting dates for{" "}
                  {crop.name.toLowerCase()}.
                </p>
                <PlantingTool hideCropList />
              </div>

              {/* Track this crop in my plot */}
              <LogPlanting cropSlug={crop.slug} cropName={crop.name} />
            </div>
          </div>
        </div></div>

        {/* Other crops — horizontal scroll */}
        <div className="border-t border-earth/6 px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto py-16 sm:py-20 pb-20">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-earth-lighter mb-3 block">
              Keep exploring
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth tracking-tight mb-8">
              Other crops to grow
            </h2>

            {sameCategoryCrops.length > 0 && (
              <div className="mb-6">
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2" role="region" aria-label="Similar crops" tabIndex={0}>
                  {sameCategoryCrops.map((c) => {
                    return (
                      <a
                        key={c.slug}
                        href={`/crops/${c.slug}`}
                        className="group block bg-sage/60 p-5 hover:bg-sage transition-colors duration-300 shrink-0 w-48"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryDot[c.category]}`} />
                          <span className="font-medium text-sm text-earth">{c.name}</span>
                        </div>
                        <p className="text-xs text-earth-lighter leading-relaxed line-clamp-2">{c.tip.slice(0, 80)}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {otherCategoryCrops.length > 0 && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2" role="region" aria-label="Other crops to grow" tabIndex={0}>
                {otherCategoryCrops.map((c) => {
                  return (
                    <a
                      key={c.slug}
                      href={`/crops/${c.slug}`}
                      className="group block bg-sage/60 p-5 hover:bg-sage transition-colors duration-300 shrink-0 w-48"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryDot[c.category]}`} />
                        <span className="font-medium text-sm text-earth">{c.name}</span>
                      </div>
                      <p className="text-xs text-earth-lighter leading-relaxed line-clamp-2">{c.tip.slice(0, 80)}</p>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
