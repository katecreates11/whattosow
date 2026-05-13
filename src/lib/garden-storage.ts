export interface CollectedVariety {
  varietyId: string;
  collectedAt: string;
  source: "lucky-dip" | "manual";
}

export interface GardenPlot {
  slotIndex: number;
  varietyId: string;
  sowDate: string | null;
  plantOutDate: string | null;
  expectedHarvest: string;
  harvested: boolean;
  harvestedAt: string | null;
  lastTended: string | null;
  lastWatered: string | null;
  notes: string;
}

export interface GardenSettings {
  email: string | null;
  gardenName: string;
  totalSlots: number;
}

export interface GardenData {
  version: 1;
  postcode: string | null;
  latitude: number | null;
  longitude: number | null;
  collection: CollectedVariety[];
  plots: GardenPlot[];
  lastVarietyId: string | null;
  settings: GardenSettings;
}

const STORAGE_KEY = "whattosow:garden";

export function createEmptyGarden(): GardenData {
  return {
    version: 1,
    postcode: null,
    latitude: null,
    longitude: null,
    collection: [],
    plots: [],
    lastVarietyId: null,
    settings: {
      email: null,
      gardenName: "My Allotment",
      totalSlots: 8,
    },
  };
}

function isValidGarden(data: unknown): data is GardenData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    d.version === 1 &&
    Array.isArray(d.collection) &&
    Array.isArray(d.plots) &&
    typeof d.settings === "object" &&
    d.settings !== null
  );
}

export function loadGarden(): GardenData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyGarden();
    const parsed = JSON.parse(raw);
    if (!isValidGarden(parsed)) return createEmptyGarden();
    // Migrate: cap slots to 8, remap any plants above that
    if (parsed.settings.totalSlots > 8) {
      parsed.settings.totalSlots = 8;
      // Reassign slot indices so all plants fit in 0-7
      const activePlots = parsed.plots.filter((p: GardenPlot) => !p.harvested);
      activePlots.forEach((p: GardenPlot, i: number) => {
        p.slotIndex = i;
      });
      // Keep only first 8 active
      if (activePlots.length > 8) {
        parsed.plots = [...activePlots.slice(0, 8), ...parsed.plots.filter((p: GardenPlot) => p.harvested)];
      }
    }
    return parsed;
  } catch {
    return createEmptyGarden();
  }
}

export function saveGarden(data: GardenData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable — fail silently
  }
}
