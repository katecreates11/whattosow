import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PinThumb from "@/components/PinThumb";
import { crops } from "@/data/crops";
import { varietiesForCrop, varietySlug } from "@/lib/variety-routes";

export const metadata: Metadata = {
  title: "Variety pin board (internal)",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return crops.filter((c) => varietiesForCrop(c.slug).length > 0).map((c) => ({ slug: c.slug }));
}

const TAGS = "#gardening #ukgardening #growyourown #allotment #vegetablegarden";

export default async function CropPinBoard({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const crop = crops.find((c) => c.slug === slug);
  if (!crop) notFound();
  const vs = varietiesForCrop(slug);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header backLink={{ href: "/pins", label: "← Pin board" }} />
      <main id="main-content" className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-allotment">Internal · {crop.name} varieties</span>
          <h1 className="font-serif text-4xl sm:text-5xl text-earth tracking-tight leading-[0.95] mt-3 mb-10">
            {crop.name} variety pins
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {vs.map((v) => {
              const vSlug = varietySlug(v);
              const desc = `${v.name} ${crop.name.toLowerCase()} — how to grow it in the UK, and where to find the seeds. ${TAGS}`;
              return (
                <div key={v.id}>
                  <h3 className="font-serif text-xl text-earth mb-3">{v.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <PinThumb
                      pinPath={`/pins/varieties/${slug}/${vSlug}`}
                      contentPath={`/crops/${slug}/${vSlug}`}
                      label="Editorial"
                      description={desc}
                    />
                    <PinThumb
                      pinPath={`/pins/varieties/${slug}/${vSlug}/full`}
                      contentPath={`/crops/${slug}/${vSlug}`}
                      label="Full bleed"
                      description={desc}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
