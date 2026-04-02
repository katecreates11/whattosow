import { type Crop } from "@/data/crops";

/**
 * Check if a crop is currently sowable based on UK average last frost date (~April 15).
 */
export function isSowableNow(crop: Crop): boolean {
  const now = new Date();
  const year = now.getFullYear();
  const avgLastFrost = new Date(year, 3, 15);
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksToFrost = (avgLastFrost.getTime() - now.getTime()) / msPerWeek;
  const weeksAfterFrost = -weeksToFrost;
  const window = 3;

  if (crop.sowIndoorsWeeks !== null) {
    const target = -crop.sowIndoorsWeeks;
    const diff = weeksToFrost - target;
    if (diff >= -window && diff <= window) return true;
  }
  if (crop.directSowWeeks !== null) {
    const target = -crop.directSowWeeks;
    const diff = weeksToFrost - target;
    if (diff >= -window && diff <= window) return true;
  }
  if (crop.plantOutWeeks !== null) {
    const diff = weeksAfterFrost - crop.plantOutWeeks;
    if (diff >= -window && diff <= window) return true;
  }
  return false;
}

/**
 * Get the number of days remaining in a crop's sowing window.
 * Returns null if not currently sowable.
 */
export function daysLeftToSow(crop: Crop): number | null {
  const now = new Date();
  const year = now.getFullYear();
  const avgLastFrost = new Date(year, 3, 15);
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const msPerDay = 24 * 60 * 60 * 1000;
  const weeksToFrost = (avgLastFrost.getTime() - now.getTime()) / msPerWeek;
  const weeksAfterFrost = -weeksToFrost;
  const window = 3;

  let minDaysLeft = Infinity;

  if (crop.sowIndoorsWeeks !== null) {
    const target = -crop.sowIndoorsWeeks;
    const diff = weeksToFrost - target;
    if (diff >= -window && diff <= window) {
      const endDate = new Date(avgLastFrost.getTime() - (target - window) * msPerWeek);
      const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / msPerDay);
      if (daysLeft > 0 && daysLeft < minDaysLeft) minDaysLeft = daysLeft;
    }
  }
  if (crop.directSowWeeks !== null) {
    const target = -crop.directSowWeeks;
    const diff = weeksToFrost - target;
    if (diff >= -window && diff <= window) {
      const endDate = new Date(avgLastFrost.getTime() - (target - window) * msPerWeek);
      const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / msPerDay);
      if (daysLeft > 0 && daysLeft < minDaysLeft) minDaysLeft = daysLeft;
    }
  }
  if (crop.plantOutWeeks !== null) {
    const diff = weeksAfterFrost - crop.plantOutWeeks;
    if (diff >= -window && diff <= window) {
      const endDate = new Date(avgLastFrost.getTime() + (crop.plantOutWeeks + window) * msPerWeek);
      const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / msPerDay);
      if (daysLeft > 0 && daysLeft < minDaysLeft) minDaysLeft = daysLeft;
    }
  }

  return minDaysLeft === Infinity ? null : minDaysLeft;
}
