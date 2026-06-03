import { MONTH_SLUGS, MONTH_NAMES } from "@/lib/calendar";
import { inSeasonCrops, ukAverageFrost } from "@/lib/season-core";
import { renderSeasonalPin } from "@/lib/pin-image";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function generateStaticParams() {
  return MONTH_SLUGS.map((month) => ({ month }));
}

/**
 * Crops worth sowing in a given month — via the succession-aware season engine
 * (the same one the Sow page uses), simulating "now" at mid-month so summer
 * months populate correctly. UK-average frost keeps the pin nationally sensible.
 */
function sowableInMonth(monthIndex: number): string[] {
  const now = new Date(new Date().getFullYear(), monthIndex, 15);
  return inSeasonCrops(ukAverageFrost(), now).map((e) => e.crop.name);
}

export async function GET(_req: Request, { params }: { params: Promise<{ month: string }> }) {
  const { month } = await params;
  const idx = (MONTH_SLUGS as readonly string[]).indexOf(month);
  if (idx === -1) return new Response("Not found", { status: 404 });

  return renderSeasonalPin({ month: MONTH_NAMES[idx], items: sowableInMonth(idx) });
}
