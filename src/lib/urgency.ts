import { Crop } from "@/data/crops";

export interface CropUrgency {
  crop: Crop;
  action: "sow indoors" | "direct sow" | "plant out";
  deadline: Date;
  daysLeft: number;
  level: "red" | "amber" | "green";
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const WINDOW_BUFFER_DAYS = 21; // 3 weeks after target week

/**
 * For each crop, calculate the latest possible date for each sowing action
 * and return urgency data sorted by deadline (soonest first).
 *
 * A crop is "urgent" if its sowing window is still open but closing soon.
 * A crop is "just missed" if its window closed in the last 7 days.
 */
export function getCropUrgencies(
  crops: Crop[],
  now: Date,
  frostDate: Date
): { urgent: CropUrgency[]; justMissed: CropUrgency[] } {
  const urgent: CropUrgency[] = [];
  const justMissed: CropUrgency[] = [];

  for (const crop of crops) {
    const entries: { action: CropUrgency["action"]; weeksOffset: number }[] = [];

    if (crop.sowIndoorsWeeks !== null) {
      entries.push({ action: "sow indoors", weeksOffset: crop.sowIndoorsWeeks });
    }
    if (crop.directSowWeeks !== null) {
      entries.push({ action: "direct sow", weeksOffset: crop.directSowWeeks });
    }
    if (crop.plantOutWeeks !== null) {
      entries.push({ action: "plant out", weeksOffset: crop.plantOutWeeks });
    }

    for (const { action, weeksOffset } of entries) {
      // Target date = frostDate + weeksOffset * 7 days
      // (negative weeksOffset = before frost, positive = after)
      const targetDate = new Date(frostDate.getTime() + weeksOffset * 7 * MS_PER_DAY);
      // Deadline = target date + buffer (can still sow up to 3 weeks after target)
      const deadline = new Date(targetDate.getTime() + WINDOW_BUFFER_DAYS * MS_PER_DAY);
      const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / MS_PER_DAY);

      // Window start = target date - 3 weeks
      const windowStart = new Date(targetDate.getTime() - WINDOW_BUFFER_DAYS * MS_PER_DAY);
      const hasStarted = now >= windowStart;

      if (daysLeft > 0 && hasStarted) {
        const level: CropUrgency["level"] =
          daysLeft <= 7 ? "red" : daysLeft <= 14 ? "amber" : "green";
        urgent.push({ crop, action, deadline, daysLeft, level });
      } else if (daysLeft >= -7 && daysLeft <= 0 && hasStarted) {
        justMissed.push({ crop, action, deadline, daysLeft, level: "red" });
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
    seenMissed.add(item.crop.slug);
    return true;
  });

  return { urgent: dedupedUrgent, justMissed: dedupedMissed };
}
