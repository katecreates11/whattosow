import { crops } from "@/data/crops";
import { cropImage } from "@/lib/crop-image";
import { pinPhoto, renderPin } from "@/lib/pin-image";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function generateStaticParams() {
  return crops.map((crop) => ({ slug: crop.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const crop = crops.find((c) => c.slug === slug);
  if (!crop) return new Response("Not found", { status: 404 });

  const img = cropImage(crop);
  const photo = await pinPhoto(img ? img.src : null);
  const i = crops.findIndex((c) => c.slug === slug);

  return renderPin({
    eyebrow: "When to sow in the UK",
    title: crop.name,
    hook: "The dates, the varieties, and where to find the seeds.",
    photo,
    no: i + 1,
    category: crop.category,
  });
}
