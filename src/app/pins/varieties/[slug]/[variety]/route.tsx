import { cropImage } from "@/lib/crop-image";
import { pinPhoto, renderPin } from "@/lib/pin-image";
import { allVarietyParams, getVarietyByRoute } from "@/lib/variety-routes";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function generateStaticParams() {
  return allVarietyParams();
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string; variety: string }> }) {
  const { slug, variety } = await params;
  const entry = getVarietyByRoute(slug, variety);
  if (!entry) return new Response("Not found", { status: 404 });
  const { variety: v, crop } = entry;

  const img = cropImage(crop);
  const photo = await pinPhoto(img ? img.src : null);

  return renderPin({
    eyebrow: `${crop.name} · when to sow`,
    title: v.name,
    hook: "How to grow it, and where to find the seeds.",
    photo,
    category: crop.category,
  });
}
