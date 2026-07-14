import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PinButton from "@/components/PinButton";
import { allVarietyParams, getVarietyByRoute, varietiesForCrop, varietySlug } from "@/lib/variety-routes";
import { cropImage } from "@/lib/crop-image";
import { getCropStatus, ukAverageFrost } from "@/lib/season-core";
import AffiliateLink, { merchantSlug } from "@/components/AffiliateLink";

const rarityLabel: Record<string, string> = {
  legendary: "legendary",
  rare: "rare",
  uncommon: "uncommon",
  common: "common",
};

export function generateStaticParams() {
  return allVarietyParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; variety: string }>;
}): Promise<Metadata> {
  const { slug, variety } = await params;
  const entry = getVarietyByRoute(slug, variety);
  if (!entry) return {};
  const { variety: v, crop } = entry;
  const desc = v.personality.length > 155 ? v.personality.slice(0, 152).trimEnd() + "…" : v.personality;
  return {
    title: `${v.name} ${crop.name.toLowerCase()} — how to grow it | What To Sow`,
    description: desc,
    alternates: { canonical: `/crops/${slug}/${variety}` },
    openGraph: {
      title: `${v.name} — a ${crop.name.toLowerCase()} worth growing`,
      description: desc,
      type: "article",
      url: `https://whattosow.co.uk/crops/${slug}/${variety}`,
      // Vertical pin for Pinterest Rich Pins (2:3)
      images: [{ url: `/pins/varieties/${slug}/${variety}/full`, alt: `${v.name} ${crop.name.toLowerCase()}`, width: 1000, height: 1500 }],
    },
  };
}

export default async function VarietyPage({
  params,
}: {
  params: Promise<{ slug: string; variety: string }>;
}) {
  const { slug, variety } = await params;
  const entry = getVarietyByRoute(slug, variety);
  if (!entry) notFound();
  const { variety: v, crop } = entry;

  const img = cropImage(crop);
  const status = getCropStatus(crop, ukAverageFrost());
  const related = varietiesForCrop(slug).filter((o) => o.id !== v.id);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Crops", item: "https://whattosow.co.uk/crops" },
      { "@type": "ListItem", position: 2, name: crop.name, item: `https://whattosow.co.uk/crops/${slug}` },
      { "@type": "ListItem", position: 3, name: v.name, item: `https://whattosow.co.uk/crops/${slug}/${variety}` },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header backLink={{ href: `/crops/${slug}`, label: `← ${crop.name}` }} />

      <main id="main-content">
        <article className="px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-earth-lighter mb-3">
              <a href={`/crops/${slug}`} className="hover:text-allotment">{crop.name}</a>
              {" · "}
              <span className={v.rarity === "legendary" ? "text-amber" : ""}>
                {v.rarity === "legendary" && "★ "}
                {rarityLabel[v.rarity]}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-earth leading-[0.95] mb-6">
              {v.name}
            </h1>

            {img && (
              <div className="relative aspect-[16/10] overflow-hidden mb-8">
                <Image
                  src={img.src}
                  alt={`${v.name} ${crop.name.toLowerCase()}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover img-grade"
                />
                {img.ours && (
                  <span className="absolute left-2 bottom-2 font-mono text-[9px] uppercase tracking-[0.1em] text-white/90 bg-allotment-dark/70 px-1.5 py-0.5">
                    from our plot
                  </span>
                )}
              </div>
            )}

            <p className="text-[18px] text-earth leading-[1.75] first-letter:float-left first-letter:font-serif first-letter:text-[64px] first-letter:leading-[0.66] first-letter:pr-3 first-letter:pt-1 first-letter:text-allotment">
              {v.personality}
            </p>

            {/* When to sow — links to the crop page for full personalised dates */}
            <div className="mt-8 border-y border-earth/10 py-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-allotment">When to sow</span>
              <span className="font-serif text-lg text-earth">
                {status.state === "off" ? "Waiting for its next sowing window" : status.label}
              </span>
              <a href={`/crops/${slug}`} className="font-serif italic text-allotment border-b border-amber pb-0.5 ml-auto">
                Dates for your postcode →
              </a>
            </div>

            {/* In the kitchen */}
            {v.recipes.length > 0 && (
              <div className="mt-10">
                <div className="font-serif italic text-lg text-allotment mb-4">in the kitchen</div>
                <div className="space-y-5">
                  {v.recipes.map((r) => (
                    <div key={r.name}>
                      <h2 className="font-serif text-xl text-earth">{r.name}</h2>
                      <p className="text-[15px] text-earth-light leading-relaxed mt-1">{r.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Find the seeds — tracked affiliate links */}
            {v.seedSuppliers.length > 0 && (
              <div className="mt-10 border-t border-earth/10 pt-6">
                <div className="font-serif italic text-lg text-allotment mb-3">where to find the seeds</div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {v.seedSuppliers.map((s) => (
                    <AffiliateLink
                      key={s.name}
                      href={s.url}
                      product={v.name}
                      type="seed"
                      merchant={merchantSlug(s.name)}
                      className="font-serif italic text-lg text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
                    >
                      {s.name} →
                    </AffiliateLink>
                  ))}
                </div>
                <p className="text-xs text-earth-lighter mt-3">
                  Some links are affiliate links — we may earn a little, at no extra cost to you, towards the allotment shed.
                </p>
              </div>
            )}

            <div className="mt-8">
              <PinButton
                path={`/crops/${slug}/${variety}`}
                image={`/pins/varieties/${slug}/${variety}/full`}
                description={`How to grow ${v.name} ${crop.name.toLowerCase()} in the UK — when to sow, what it's like, and where to buy the seeds. #${crop.name.toLowerCase().replace(/\s+/g, "")} #growyourown #vegetablegarden #allotment`}
              />
            </div>

            {/* Related varieties */}
            {related.length > 0 && (
              <div className="mt-14 border-t border-earth/10 pt-8">
                <div className="font-serif italic text-lg text-allotment mb-4">more {crop.name.toLowerCase()} to grow</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                  {related.map((o) => (
                    <a
                      key={o.id}
                      href={`/crops/${slug}/${varietySlug(o)}`}
                      className="font-serif text-lg text-earth hover:text-allotment transition-colors leading-tight"
                    >
                      {o.name}
                      {o.rarity === "legendary" && <span className="text-amber"> ★</span>}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
