export interface AllotmentSite {
  id: number;
  name: string | null;
  lat: number;
  lng: number;
}

const CACHE_KEY = "whattosow_allotments";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface CachedAllotments {
  lat: number;
  lng: number;
  sites: AllotmentSite[];
  timestamp: number;
}

function loadCache(lat: number, lng: number): AllotmentSite[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedAllotments = JSON.parse(raw);
    // Check TTL and proximity (within ~1km of cached location)
    if (
      Date.now() - cached.timestamp > CACHE_TTL ||
      Math.abs(cached.lat - lat) > 0.01 ||
      Math.abs(cached.lng - lng) > 0.01
    ) {
      return null;
    }
    return cached.sites;
  } catch {
    return null;
  }
}

function saveCache(lat: number, lng: number, sites: AllotmentSite[]) {
  try {
    const data: CachedAllotments = { lat, lng, sites, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable
  }
}

export async function fetchNearbyAllotments(
  lat: number,
  lng: number,
  radiusM = 10000
): Promise<AllotmentSite[]> {
  const cached = loadCache(lat, lng);
  if (cached) return cached;

  const query = `[out:json][timeout:10];(way["landuse"="allotments"](around:${radiusM},${lat},${lng});relation["landuse"="allotments"](around:${radiusM},${lat},${lng}););out center;`;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: `data=${encodeURIComponent(query)}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  if (!res.ok) throw new Error("Overpass API request failed");

  const data = await res.json();

  const sites: AllotmentSite[] = (data.elements ?? [])
    .filter((el: { center?: { lat: number; lng: number } }) => el.center)
    .map((el: { id: number; tags?: { name?: string }; center: { lat: number; lng: number } }) => ({
      id: el.id,
      name: el.tags?.name ?? null,
      lat: el.center.lat,
      lng: el.center.lng,
    }));

  saveCache(lat, lng, sites);
  return sites;
}
