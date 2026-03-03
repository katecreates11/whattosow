export interface SoilData {
  description: string;
  friendlyName: string;
  gardeningAdvice: string;
}

const CACHE_KEY = "whattosow_soil";

// Soilscapes classification → gardener-friendly translation
// Based on Cranfield's 27 Soilscapes types for England & Wales
const SOIL_TRANSLATIONS: Record<string, { friendlyName: string; gardeningAdvice: string }> = {
  "Freely draining lime-rich loamy soils": {
    friendlyName: "Chalky, well-drained loam",
    gardeningAdvice: "Naturally alkaline — great for brassicas and lavender. Add organic matter to improve moisture retention.",
  },
  "Shallow lime-rich soils over chalk or limestone": {
    friendlyName: "Thin chalky soil",
    gardeningAdvice: "Very alkaline and fast-draining. Raised beds help. Avoid acid-lovers like blueberries.",
  },
  "Freely draining slightly acid loamy soils": {
    friendlyName: "Light, slightly acid loam",
    gardeningAdvice: "Good all-rounder. Warms up quickly in spring. Add compost annually to maintain fertility.",
  },
  "Freely draining slightly acid but base-rich soils": {
    friendlyName: "Well-drained fertile loam",
    gardeningAdvice: "Excellent growing soil. Warms up fast and suits most crops. Mulch to retain moisture in summer.",
  },
  "Freely draining slightly acid sandy soils": {
    friendlyName: "Light sandy soil",
    gardeningAdvice: "Warms quickly — great for early sowings. Water and feed regularly as nutrients wash through. Add lots of compost.",
  },
  "Freely draining acid loamy soils over rock": {
    friendlyName: "Thin acid soil over rock",
    gardeningAdvice: "Suits acid-lovers like blueberries and potatoes. May need lime for brassicas. Shallow — consider raised beds.",
  },
  "Slowly permeable seasonally wet slightly acid but base-rich loamy and clayey soils": {
    friendlyName: "Heavy clay-loam",
    gardeningAdvice: "Rich but slow to warm. Don't work when wet. Add grit and compost to improve drainage. Excellent for brassicas and beans.",
  },
  "Slightly acid loamy and clayey soils with impeded drainage": {
    friendlyName: "Damp clay-loam",
    gardeningAdvice: "Can be waterlogged in winter. Raise beds to improve drainage. Very fertile once workable.",
  },
  "Lime-rich loamy and clayey soils with impeded drainage": {
    friendlyName: "Alkaline clay",
    gardeningAdvice: "Heavy and slow to drain. Improve structure with organic matter over years. Good for brassicas once broken up.",
  },
  "Slowly permeable seasonally wet acid loamy and clayey soils": {
    friendlyName: "Acid clay",
    gardeningAdvice: "Wet and heavy in winter. Needs drainage improvement and organic matter. Good for potatoes and soft fruit.",
  },
  "Naturally wet very acid sandy and loamy soils": {
    friendlyName: "Wet, acid sandy soil",
    gardeningAdvice: "Challenging — raise beds and add lime for most veg. Suits blueberries and cranberries naturally.",
  },
  "Loamy and clayey floodplain soils with naturally high groundwater": {
    friendlyName: "River floodplain soil",
    gardeningAdvice: "Fertile but flood-prone. Great for summer crops. Raise beds and don't plant permanent crops in flood zones.",
  },
  "Loamy and clayey soils of coastal flats with naturally high groundwater": {
    friendlyName: "Coastal marsh soil",
    gardeningAdvice: "May be saline. Test salt levels. Some crops (asparagus, sea kale) thrive. Raise beds for standard veg.",
  },
  "Loamy soils with naturally high groundwater": {
    friendlyName: "Damp fertile loam",
    gardeningAdvice: "Naturally moist — less watering needed. Raise beds if waterlogged. Good for leafy greens and celery.",
  },
  "Freely draining very acid sandy and loamy soils": {
    friendlyName: "Acid sandy soil",
    gardeningAdvice: "Very free-draining. Great for carrots and potatoes. Needs regular watering and feeding. Ideal for blueberries.",
  },
  "Restored soils mostly from quarry and opencast spoil": {
    friendlyName: "Restored / made ground",
    gardeningAdvice: "Variable quality. Test for contaminants before growing food. Raised beds with imported topsoil are safest.",
  },
  "Sand dune soils": {
    friendlyName: "Sandy coastal soil",
    gardeningAdvice: "Very fast-draining with low nutrients. Needs heavy composting. Great for asparagus and root veg with improvement.",
  },
  "Blanket bog peat soils": {
    friendlyName: "Deep peat bog",
    gardeningAdvice: "Very acid and wet. Rare in allotment settings. If growing: raise beds, add lime and grit.",
  },
  "Raised bog peat soils": {
    friendlyName: "Raised peat",
    gardeningAdvice: "Acid and moisture-retentive. Can grow well with lime and drainage. Excellent for soft fruit with pH correction.",
  },
  "Fen peat soils": {
    friendlyName: "Fen peat",
    gardeningAdvice: "Rich, dark soil — some of the most productive farmland in England. Excellent for all veg. Mind wind exposure.",
  },
  "Slowly permeable wet very acid upland soils with a peaty surface": {
    friendlyName: "Upland peaty clay",
    gardeningAdvice: "Cold, wet and acid. Short growing season. Focus on hardy crops. Improve drainage and add lime.",
  },
  "Slowly permeable seasonally wet slightly acid but base-rich loamy and clayey soils with impeded drainage": {
    friendlyName: "Wet heavy clay-loam",
    gardeningAdvice: "Rich but waterlogged in winter. Needs raised beds or drainage. Excellent for brassicas and beans once improved.",
  },
};

function translateSoil(description: string): { friendlyName: string; gardeningAdvice: string } {
  // Exact match first
  if (SOIL_TRANSLATIONS[description]) {
    return SOIL_TRANSLATIONS[description];
  }

  // Fuzzy match on key terms
  const lower = description.toLowerCase();
  if (lower.includes("peat")) {
    return { friendlyName: "Peaty soil", gardeningAdvice: "Moisture-retentive and often acid. Good with lime and drainage improvements." };
  }
  if (lower.includes("chalk") || lower.includes("lime-rich")) {
    return { friendlyName: "Chalky / alkaline soil", gardeningAdvice: "Alkaline and often thin. Add organic matter. Avoid acid-loving plants." };
  }
  if (lower.includes("sandy")) {
    return { friendlyName: "Sandy soil", gardeningAdvice: "Fast-draining and quick to warm. Water and feed regularly. Add compost." };
  }
  if (lower.includes("clay")) {
    return { friendlyName: "Clay soil", gardeningAdvice: "Fertile but heavy. Add grit and compost to improve structure. Don't dig when wet." };
  }
  if (lower.includes("loamy") || lower.includes("loam")) {
    return { friendlyName: "Loamy soil", gardeningAdvice: "A good balance of drainage and moisture retention. Most crops will do well." };
  }

  return {
    friendlyName: "Mixed soil",
    gardeningAdvice: "Check your soil with a simple pH test kit from any garden centre for specific growing advice.",
  };
}

function loadCachedSoil(): SoilData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function cacheSoil(data: SoilData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export async function getSoilType(lat: number, lng: number): Promise<SoilData | null> {
  const cached = loadCachedSoil();
  if (cached) return cached;

  try {
    // Proxy through Netlify function to avoid CORS
    const res = await fetch(
      `/.netlify/functions/soil-lookup?lat=${lat}&lng=${lng}`
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.description) return null;

    const translation = translateSoil(data.description);
    const soilData: SoilData = {
      description: data.description,
      ...translation,
    };

    cacheSoil(soilData);
    return soilData;
  } catch {
    return null;
  }
}
