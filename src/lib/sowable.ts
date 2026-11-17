import { type Crop } from "@/data/crops";
import { cropWindows, daysBetween, ukAverageFrost } from "@/lib/crop-windows";

/**
 * "Can this crop be sown or planted out right now?" on the UK average.
 *
 * A thin adapter over the site's one window engine (crop-windows.ts), so the
 * garden game and Lucky Dip can never disagree with the sowing lists. This
 * file used to carry its own copy of the maths: a single spring window per
 * crop, which never knew about autumn sowings like garlic and broad beans.
 *
 * Deliberately one argument: these are passed straight to Array.filter, which
 * would otherwise hand the array index in as a date.
 */
function openWindows(crop: Crop) {
  const now = new Date();
  return cropWindows(crop, now, ukAverageFrost(now)).filter(
    (window) => now >= window.openAt && now <= window.closeAt
  );
}

export function isSowableNow(crop: Crop): boolean {
  return openWindows(crop).length > 0;
}

/** Days left in the crop's soonest-closing open window, or null if none is open. */
export function daysLeftToSow(crop: Crop): number | null {
  const now = new Date();
  const days = openWindows(crop).map((window) => daysBetween(now, window.closeAt));
  return days.length > 0 ? Math.min(...days) : null;
}
