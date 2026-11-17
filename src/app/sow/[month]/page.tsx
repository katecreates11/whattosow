import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateLink, { merchantSlug } from "@/components/AffiliateLink";
import { seedLinkLabel } from "@/lib/seed-link-label";
import {
  MONTH_SLUGS,
  MONTH_NAMES,
  monthSlugToIndex,
  getCropsForMonth,
  getAvgFrostDate,
} from "@/lib/calendar";
import { type Crop } from "@/data/crops";
import MonthDaylight from "@/components/MonthDaylight";
import Image from "next/image";
import { getMonthPhoto } from "@/data/month-photos";
import { getSeasonalAccent } from "@/lib/seasons";

export async function generateStaticParams() {
  return MONTH_SLUGS.map((month) => ({ month }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ month: string }>;
}): Promise<Metadata> {
  const { month } = await params;
  const idx = monthSlugToIndex(month);
  if (idx === null) return {};
  const name = MONTH_NAMES[idx];

  return {
    title: `What to Sow in ${name} — UK Planting Guide | What To Sow`,
    description: `Find out which vegetables, fruit, herbs and salads to sow and plant in ${name} in the UK. Personalised to your postcode and local frost date.`,
    keywords: [
      `what to sow in ${name.toLowerCase()}`,
      `what to plant ${name.toLowerCase()} UK`,
      `${name.toLowerCase()} sowing guide UK`,
      `vegetable planting ${name.toLowerCase()}`,
      `fruit to plant ${name.toLowerCase()} UK`,
    ],
    openGraph: {
      title: `What to Sow in ${name} — UK Planting Guide`,
      description: `UK sowing guide for ${name}. See what to sow indoors, direct sow outdoors, and plant out this month.`,
      type: "article",
      locale: "en_GB",
    },
    alternates: {
      canonical: `/sow/${month}`,
    },
  };
}

const cropLinkClass =
  "font-serif text-xl sm:text-2xl leading-tight text-earth underline decoration-amber/45 underline-offset-4 hover:text-allotment focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-allotment";

function trackingSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * The same quiet seed link the weekly /sow list carries. The month pages get
 * as many readers as /sow and, until now, offered no way to act on what they
 * read: /sow readers followed a seed link on about one visit in fifteen, month
 * page readers on none (Umami, July–November 2026).
 */
function SeedLink({ crop, month, list }: { crop: Crop; month: string; list: string }) {
  const seed = crop.seedSuppliers?.[0];
  if (!seed) return null;
  const label = seedLinkLabel(crop);

  return (
    <AffiliateLink
      href={seed.url}
      product={label}
      type="seed"
      merchant={merchantSlug(seed.name)}
      position={`month-list-seeds-${month}-${list}-${crop.slug}-${trackingSlug(seed.name)}`}
      data-umami-event-crop={crop.slug}
      aria-label={`${label} at ${seed.name}`}
      className="inline-flex min-h-[44px] items-center font-mono text-[10px] uppercase tracking-[0.12em] text-allotment underline decoration-amber/60 underline-offset-4 hover:text-allotment-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-allotment sm:justify-end sm:text-right"
    >
      {label} at {seed.name} &rarr;
    </AffiliateLink>
  );
}

/** One crop as a line of the listing: name, the tip, and where to get the seed. */
function CropRow({ crop, month, list }: { crop: Crop; month: string; list?: string }) {
  return (
    <li className="border-t border-earth/10 py-4 sm:py-5">
      <div className="grid gap-x-6 gap-y-1 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <Link href={`/crops/${crop.slug}`} className={cropLinkClass}>
            {crop.name}
          </Link>
          <p className="mt-1.5 max-w-[58ch] text-sm leading-relaxed text-earth-light">{crop.tip}</p>
        </div>
        {list && <SeedLink crop={crop} month={month} list={list} />}
      </div>
    </li>
  );
}

function MonthNav({ idx }: { idx: number }) {
  const prev = (idx + 11) % 12;
  const next = (idx + 1) % 12;

  return (
    <nav className="flex justify-between items-center" aria-label="Month navigation">
      <Link
        href={`/sow/${MONTH_SLUGS[prev]}`}
        className="text-allotment hover:text-allotment-dark font-medium flex items-center gap-2 transition-colors duration-300"
        aria-label={`Previous month: ${MONTH_NAMES[prev]}`}
      >
        <span className="text-xl">&larr;</span> {MONTH_NAMES[prev]}
      </Link>
      <Link
        href="/calendar"
        className="text-sm text-earth-lighter hover:text-allotment transition-colors duration-300"
      >
        Full calendar
      </Link>
      <Link
        href={`/sow/${MONTH_SLUGS[next]}`}
        className="text-allotment hover:text-allotment-dark font-medium flex items-center gap-2 transition-colors duration-300"
        aria-label={`Next month: ${MONTH_NAMES[next]}`}
      >
        {MONTH_NAMES[next]} <span className="text-xl">&rarr;</span>
      </Link>
    </nav>
  );
}

export default async function MonthPage({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const { month } = await params;
  const idx = monthSlugToIndex(month);
  if (idx === null) notFound();

  const name = MONTH_NAMES[idx];
  const frostDate = getAvgFrostDate();
  const { sowIndoors, directSow, plantOut } = getCropsForMonth(idx, frostDate);
  const hasAnyCrops = sowIndoors.length > 0 || directSow.length > 0 || plantOut.length > 0;
  const seasonal = getSeasonalAccent(idx);
  const monthPhoto = getMonthPhoto(idx);

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
      {
        "@type": "ListItem",
        position: 3,
        name: name,
        item: `https://whattosow.co.uk/sow/${month}`,
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

      <main id="main-content">
        {/* Header */}
        <div className="border-b border-earth/6 px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto pt-12 sm:pt-16 pb-14 sm:pb-20">
            <MonthNav idx={idx} />

            <div className="mt-10 sm:mt-14">
              <span className={`text-xs font-semibold tracking-[0.15em] uppercase ${seasonal.text} opacity-70 mb-4 block`}>
                {seasonal.label} sowing guide
              </span>
              <h1 className="tracking-tight">
                <span className="block text-earth-lighter text-lg sm:text-xl font-normal mb-2">What to sow in</span>
                <span className={`block text-7xl sm:text-8xl lg:text-9xl font-serif ${seasonal.text} leading-[0.85] tracking-tighter`}>{name}</span>
              </h1>
              <p className="text-earth-light mt-6 max-w-lg leading-relaxed">
                Based on UK average frost date (mid-April). Enter your postcode on
                the{" "}
                <Link href="/" className="text-allotment hover:underline">
                  homepage
                </Link>{" "}
                for personalised dates.
              </p>
              <MonthDaylight monthIndex={idx} />
            </div>

            {monthPhoto && (
              <figure className="mt-10 sm:mt-12 max-w-2xl">
                <Image
                  src={monthPhoto.src}
                  alt={monthPhoto.alt}
                  width={monthPhoto.width}
                  height={monthPhoto.height}
                  sizes="(max-width: 768px) 100vw, 672px"
                  className={`w-full h-auto img-grade ${monthPhoto.height > monthPhoto.width ? "max-h-[70vh] object-cover" : ""}`}
                />
                <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter">
                  {monthPhoto.caption} &middot; {name}, from our plot
                </figcaption>
              </figure>
            )}
          </div>
        </div>

        <div className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20"><div className="max-w-4xl mx-auto">
          {!hasAnyCrops ? (
            <p className="max-w-[48ch] font-serif text-xl leading-snug text-earth-light">
              Not much wants sowing in {name}. It&apos;s a good month to plan the
              beds and get the seed order in.
            </p>
          ) : (
            <div className="space-y-16 sm:space-y-20">
              {sowIndoors.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2.5 h-2.5 bg-amber rounded-full" aria-hidden="true" />
                    <h2 className="text-xl sm:text-2xl font-serif text-earth tracking-tight">
                      Sow indoors
                    </h2>
                  </div>
                  <ul className="border-b border-earth/10">
                    {sowIndoors.map((crop) => (
                      <CropRow key={crop.slug} crop={crop} month={month} list="indoors" />
                    ))}
                  </ul>
                </div>
              )}

              {directSow.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2.5 h-2.5 bg-leaf rounded-full" aria-hidden="true" />
                    <h2 className="text-xl sm:text-2xl font-serif text-earth tracking-tight">
                      Direct sow outdoors
                    </h2>
                  </div>
                  <ul className="border-b border-earth/10">
                    {directSow.map((crop) => (
                      <CropRow key={crop.slug} crop={crop} month={month} list="direct" />
                    ))}
                  </ul>
                </div>
              )}

              {plantOut.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2.5 h-2.5 bg-allotment rounded-full" aria-hidden="true" />
                    <h2 className="text-xl sm:text-2xl font-serif text-earth tracking-tight">
                      Plant out
                    </h2>
                  </div>
                  <ul className="border-b border-earth/10">
                    {plantOut.map((crop) => (
                      <CropRow key={crop.slug} crop={crop} month={month} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {hasAnyCrops && (
            <p className="mt-8 max-w-[62ch] text-xs leading-relaxed text-earth-lighter">
              The seed links are affiliate links. If you buy through them, a little
              goes towards a proper shed for the allotment, at no extra cost to you.
            </p>
          )}

          {(idx >= 9 || idx <= 1) && (
            <p className="mt-10 max-w-[58ch] font-serif text-lg leading-snug text-earth-light">
              Indoors, {name} is as good as any month. A tray of cress or pea shoots on the windowsill is ready in a
              week or two:{" "}
              <Link href="/guides/microgreens-and-windowsill-herbs" className="text-allotment underline decoration-amber/60 underline-offset-4 hover:text-allotment-dark">
                micro salads and herbs on the windowsill
              </Link>
              .
            </p>
          )}

          {/* Cross-links */}
          <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 gap-4">
            <Link href="/sow" className="block border border-earth/6 p-5 hover:border-allotment/30 transition-colors">
              <span className="font-medium text-sm text-earth">This week&apos;s full sowing list</span>
              <span className="block text-xs text-earth-lighter mt-1">See what is worth sowing now, including closing windows.</span>
            </Link>
            <Link href="/" className="block border border-earth/6 p-5 hover:border-allotment/30 transition-colors">
              <span className="font-medium text-sm text-earth">Use your postcode</span>
              <span className="block text-xs text-earth-lighter mt-1">Dates vary across the UK. Let the homepage tune this to your garden.</span>
            </Link>
          </div>

          <div className="mt-10 pt-10 border-t border-earth/6">
            <MonthNav idx={idx} />
          </div>
        </div></div>
      </main>

      <Footer />
    </div>
  );
}
