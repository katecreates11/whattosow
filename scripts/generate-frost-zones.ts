/**
 * Generate frost zone data from LAD boundaries GeoJSON.
 *
 * Usage:
 *   1. Download generalised LAD boundaries (BGC) from ONS Open Geography Portal:
 *      https://geoportal.statistics.gov.uk/ → search "LAD boundaries"
 *      Save as public/data/lad-boundaries.geojson
 *
 *   2. Run: npx tsx scripts/generate-frost-zones.ts
 *
 * Output: public/data/frost-zones.geojson
 *   Each feature gets frost properties:
 *   - frostDayOfYear / frostDate — last spring frost
 *   - autumnFrostDayOfYear / autumnFrostDate — first autumn frost
 *   - growingSeasonDays — days between last spring and first autumn frost
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// Replicate the frost calculation from src/lib/frost.ts
function calculateFrostDayOfYear(lat: number, long: number): number {
  let dayOfYear = 100 + (lat - 50) * 6;

  if (long < -4.5) {
    dayOfYear -= 5;
  } else if (long < -3) {
    dayOfYear -= 3;
  } else if (long < -1) {
    dayOfYear -= 1;
  } else if (long > 0.5) {
    dayOfYear += 2;
  }

  return Math.max(85, Math.min(168, Math.round(dayOfYear)));
}

// Replicate autumn frost calculation from src/lib/frost.ts
function calculateAutumnFrostDayOfYear(lat: number, long: number): number {
  let dayOfYear = 298 - (lat - 50) * 5;

  if (long < -4.5) {
    dayOfYear += 4;
  } else if (long < -3) {
    dayOfYear += 2;
  } else if (long > 0.5) {
    dayOfYear -= 2;
  }

  return Math.max(245, Math.min(310, Math.round(dayOfYear)));
}

// Compute centroid of a polygon (simple average of coordinates)
function centroid(coords: number[][][]): [number, number] {
  let totalLat = 0;
  let totalLng = 0;
  let count = 0;

  for (const ring of coords) {
    for (const [lng, lat] of ring) {
      totalLng += lng;
      totalLat += lat;
      count++;
    }
  }

  return [totalLat / count, totalLng / count];
}

function featureCentroid(geometry: {
  type: string;
  coordinates: number[][][] | number[][][][];
}): [number, number] {
  if (geometry.type === "Polygon") {
    return centroid(geometry.coordinates as number[][][]);
  }
  if (geometry.type === "MultiPolygon") {
    // Use the largest polygon
    const polys = geometry.coordinates as number[][][][];
    let best: number[][][] = polys[0];
    let bestLen = 0;
    for (const poly of polys) {
      const len = poly[0]?.length ?? 0;
      if (len > bestLen) {
        bestLen = len;
        best = poly;
      }
    }
    return centroid(best);
  }
  return [54, -2]; // UK centre fallback
}

function dayOfYearToDateStr(day: number): string {
  const date = new Date(2026, 0);
  date.setDate(day);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

import { existsSync } from "fs";

const ladPath = join(process.cwd(), "public/data/lad-boundaries.geojson");
const outputPath = join(process.cwd(), "public/data/frost-zones.geojson");
// Use LAD boundaries if available, otherwise re-enrich existing frost-zones
const inputPath = existsSync(ladPath) ? ladPath : outputPath;

console.log("Reading LAD boundaries...");
const raw = readFileSync(inputPath, "utf-8");
const geojson = JSON.parse(raw);

console.log(`Processing ${geojson.features.length} features...`);

for (const feature of geojson.features) {
  const [lat, lng] = featureCentroid(feature.geometry);

  // Spring frost
  const frostDay = calculateFrostDayOfYear(lat, lng);
  feature.properties.frostDayOfYear = frostDay;
  feature.properties.frostDate = dayOfYearToDateStr(frostDay);

  // Autumn frost
  const autumnDay = calculateAutumnFrostDayOfYear(lat, lng);
  feature.properties.autumnFrostDayOfYear = autumnDay;
  feature.properties.autumnFrostDate = dayOfYearToDateStr(autumnDay);

  // Growing season
  feature.properties.growingSeasonDays = autumnDay - frostDay;

  // Centroid for live conditions lookup
  feature.properties.centroidLat = Math.round(lat * 100) / 100;
  feature.properties.centroidLng = Math.round(lng * 100) / 100;
}

console.log("Writing frost zones...");
writeFileSync(outputPath, JSON.stringify(geojson));
console.log(`Done! Output: ${outputPath}`);

// Stats
const springDays = geojson.features.map(
  (f: { properties: { frostDayOfYear: number } }) => f.properties.frostDayOfYear
);
const autumnDays = geojson.features.map(
  (f: { properties: { autumnFrostDayOfYear: number } }) => f.properties.autumnFrostDayOfYear
);
const seasonDays = geojson.features.map(
  (f: { properties: { growingSeasonDays: number } }) => f.properties.growingSeasonDays
);
console.log(
  `Spring frost range: ${Math.min(...springDays)} (${dayOfYearToDateStr(Math.min(...springDays))}) — ${Math.max(...springDays)} (${dayOfYearToDateStr(Math.max(...springDays))})`
);
console.log(
  `Autumn frost range: ${Math.min(...autumnDays)} (${dayOfYearToDateStr(Math.min(...autumnDays))}) — ${Math.max(...autumnDays)} (${dayOfYearToDateStr(Math.max(...autumnDays))})`
);
console.log(
  `Growing season range: ${Math.min(...seasonDays)} — ${Math.max(...seasonDays)} days`
);
