import { renderPin, pinPhoto } from "@/lib/pin-image";

export const runtime = "nodejs";
export const dynamic = "force-static";

/** Seasonal Pinterest pin for the longest-day feature — the sunset photo over
 *  a daylight + autumn-sowing hook, funnelling back to /longest-day. */
export async function GET() {
  const photo = await pinPhoto("/photos/longest-day/sunset-allotment-beds.webp", 1100);
  return renderPin({
    eyebrow: "Midsummer · the longest day",
    title: "The longest day",
    hook: "See exactly how much daylight you get where you are — and what to sow as the year turns.",
    photo,
    variant: "editorial",
  });
}
