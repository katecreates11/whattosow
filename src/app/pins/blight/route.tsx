import { renderListPin } from "@/lib/pin-image";

export const runtime = "nodejs";
export const dynamic = "force-static";

/** A saveable "blight-resistant varieties" pin that funnels back to Blight Watch. */
const items = [
  "Crimson Crush (tomato)",
  "Mountain Magic (tomato)",
  "Cocktail Crush (tomato)",
  "Ferline (tomato)",
  "Sarpo Mira (potato)",
  "Sarpo Axona (potato)",
  "Cara (potato)",
];

export function GET() {
  return renderListPin({
    eyebrow: "Blight-resistant · UK",
    title: "Beat tomato & potato blight",
    items,
  });
}
