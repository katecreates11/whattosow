import type { LocationData } from "@/lib/frost";

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

export function saveLocation(location: LocationData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
    window.dispatchEvent(new Event("whattosow:location-updated"));
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
    return parsed;
  } catch {
    return null;
  }
}
