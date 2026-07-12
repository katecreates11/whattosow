import { Crop } from "@/data/crops";
import { cropWindows, daysBetween } from "@/lib/crop-windows";

export interface CropUrgency {
  crop: Crop;
  action: "sow indoors" | "direct sow" | "plant out";
  deadline: Date;
  daysLeft: number;
  level: "red" | "amber" | "green";
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * What can still be sown (or planted out) right now, and what just closed.
 *
 * A thin adapter over the site's canonical windows model (crop-windows.ts) —
 * the same engine the homepage and /sow pages use — so this page never
 * disagrees with the rest of the site. The old implementation here modelled a
 * single spring window per crop relative to the last frost, which decayed to
 * zero by mid-July and stayed there until the following spring.
 *
 * "Urgent" = a window open today, most urgent action per crop, soonest first.
 * "Just missed" = a window that closed within the last 7 days.
 */
export function getCropUrgencies(
  crops: Crop[],
  now: Date,
  frostDate: Date
): { urgent: CropUrgency[]; justMissed: CropUrgency[] } {
  const urgent: CropUrgency[] = [];
  const justMissed: CropUrgency[] = [];

  for (const crop of crops) {
    for (const window of cropWindows(crop, now, frostDate)) {
      const daysLeft = daysBetween(now, window.closeAt);
      if (now >= window.openAt && now <= window.closeAt) {
        const level: CropUrgency["level"] =
          daysLeft <= 7 ? "red" : daysLeft <= 14 ? "amber" : "green";
        urgent.push({ crop, action: window.action, deadline: window.closeAt, daysLeft, level });
      } else if (now > window.closeAt && now.getTime() - window.closeAt.getTime() <= 7 * MS_PER_DAY) {
        justMissed.push({ crop, action: window.action, deadline: window.closeAt, daysLeft, level: "red" });
      }
    }
  }

  // Sort urgent by soonest deadline first
  urgent.sort((a, b) => a.daysLeft - b.daysLeft);

  // Deduplicate: keep only the most urgent action per crop
  const seenUrgent = new Set<string>();
  const dedupedUrgent = urgent.filter((item) => {
    if (seenUrgent.has(item.crop.slug)) return false;
    seenUrgent.add(item.crop.slug);
    return true;
  });

  const seenMissed = new Set<string>();
  const dedupedMissed = justMissed.filter((item) => {
    if (seenMissed.has(item.crop.slug)) return false;
    // a crop with a window still open isn't "just missed" — another route in remains
    if (seenUrgent.has(item.crop.slug)) return false;
    seenMissed.add(item.crop.slug);
    return true;
  });

  return { urgent: dedupedUrgent, justMissed: dedupedMissed };
}
