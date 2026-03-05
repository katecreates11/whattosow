/**
 * Storage module — chrome.storage.sync with localStorage fallback.
 * Postcode data syncs across Chrome devices when using the extension.
 */

const STORAGE_KEY = "whattosow_location";

/**
 * Check whether a value looks like valid LocationData.
 */
export function isValidLocation(data) {
  if (!data || typeof data !== "object") return false;
  return (
    typeof data.postcode === "string" && data.postcode.length > 0 && data.postcode.length < 10 &&
    typeof data.latitude === "number" && isFinite(data.latitude) &&
    typeof data.longitude === "number" && isFinite(data.longitude) &&
    typeof data.region === "string" &&
    typeof data.adminDistrict === "string"
  );
}

/**
 * True if chrome.storage.sync is available (running as extension).
 */
function hasChromeStorage() {
  return typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync;
}

/**
 * Load saved location data.
 */
export async function loadLocation() {
  // Try chrome.storage.sync first
  if (hasChromeStorage()) {
    try {
      const result = await chrome.storage.sync.get(STORAGE_KEY);
      const data = result[STORAGE_KEY];
      if (data && isValidLocation(data)) return data;
    } catch {
      // Fall through to localStorage
    }
  }

  // localStorage fallback (for local development / non-extension context)
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isValidLocation(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Save location data.
 */
export async function saveLocation(data) {
  if (hasChromeStorage()) {
    try {
      await chrome.storage.sync.set({ [STORAGE_KEY]: data });
    } catch {
      // Fall through to localStorage
    }
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage unavailable
  }
}

/**
 * Clear saved location data.
 */
export async function clearLocation() {
  if (hasChromeStorage()) {
    try {
      await chrome.storage.sync.remove(STORAGE_KEY);
    } catch {
      // Fall through
    }
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable
  }
}
