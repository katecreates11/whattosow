import type { LocationData } from "@/lib/frost";
import { ensureFrostRecord } from "@/lib/frost-record";

const STORAGE_KEY = "whattosow_location";

export function isValidLocation(data: unknown): data is LocationData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.postcode === "string" && d.postcode.length > 0 && d.postcode.length < 10 &&
    typeof d.latitude === "number" && isFinite(d.latitude) &&
    typeof d.longitude === "number" && isFinite(d.longitude) &&
    typeof d.region === "string" &&
    typeof d.adminDistrict === "string"
  );
}

/**
 * Whenever a page touches the saved location, make sure we hold that spot's
 * ten-year frost record (frost-record.ts). It costs nothing when the record is
 * already stored; otherwise it is fetched once, in the background, and
 * announced with `whattosow:location-updated` so dates on the page settle onto
 * the gardener's own frosts without anyone having to ask.
 */
function learnFrosts(location: LocationData): void {
  void ensureFrostRecord(location.latitude, location.longitude);
}

export function saveLocation(location: LocationData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
    window.dispatchEvent(new Event("whattosow:location-updated"));
    learnFrosts(location);
  } catch {
    // localStorage unavailable
  }
}

export function loadLocation(): LocationData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isValidLocation(parsed)) return null;
    learnFrosts(parsed);
    return parsed;
  } catch {
    return null;
  }
}
