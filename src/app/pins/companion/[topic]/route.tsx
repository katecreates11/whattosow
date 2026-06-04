import { companionTopics, getCompanionTopic } from "@/data/companion-topics";
import { renderListPin } from "@/lib/pin-image";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function generateStaticParams() {
  return companionTopics.map((t) => ({ topic: t.slug }));
}

/** A concise pin title + a numbered list, derived from the topic's data. */
function pinContent(slug: string) {
  const t = getCompanionTopic(slug)!;
  // crop topics → "Grow with carrots"; others get a hand-tuned short title
  const titleMap: Record<string, string> = {
    "companion-plants-for-tomatoes": "Grow with tomatoes",
    "companion-plants-for-carrots": "Grow with carrots",
    "companion-plants-for-beans": "Grow with beans",
    "companion-plants-for-brassicas": "Grow with brassicas",
    "companion-plants-for-courgettes": "Grow with courgettes",
    "what-not-to-plant-together": "What not to plant together",
    "companion-planting-small-gardens": "Small-space companions",
    "flowers-for-the-veg-patch": "Flowers for the veg patch",
  };
  const isAvoid = slug === "what-not-to-plant-together";
  const isFlowers = slug === "flowers-for-the-veg-patch";
  const eyebrow = isFlowers ? "Companion flowers · UK" : isAvoid ? "Keep apart · UK" : "Grows well with · UK";
  const source = isFlowers ? t.flowers : isAvoid ? t.avoid : (t.goodCompanions ?? t.flowers ?? t.avoid);
  const items = (source ?? []).map((i) => i.name.replace(/\s*\(.*?\)\s*/g, "").trim());
  return { eyebrow, title: titleMap[slug] ?? t.title, items };
}

export async function GET(_req: Request, { params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  if (!getCompanionTopic(topic)) return new Response("Not found", { status: 404 });
  const { eyebrow, title, items } = pinContent(topic);
  return renderListPin({ eyebrow, title, items });
}
