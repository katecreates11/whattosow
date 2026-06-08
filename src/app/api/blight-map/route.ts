import { NextResponse } from "next/server";
import { cities } from "@/data/cities";
import { assessHutton, type BlightLevel } from "@/lib/blight";

/**
 * National blight-risk sample grid.
 *
 * Samples the Hutton Criteria at every city in our list (well spread across the
 * UK) in a couple of batched Open-Meteo calls, then caches the result for 6h so
 * every visitor is served from cache rather than hammering the weather API.
 * The map colours each district by its nearest sample point.
 */

export const revalidate = 21600; // 6 hours

interface BlightPoint {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  level: BlightLevel;
  period: { start: string; end: string } | null;
  forecast: boolean;
  days: { date: string; minTemp: number; humidHours: number; qualifies: boolean; isToday: boolean }[];
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

interface MeteoResult {
  hourly?: { time: string[]; temperature_2m: (number | null)[]; relative_humidity_2m: (number | null)[] };
}

async function fetchBatch(batch: typeof cities): Promise<MeteoResult[]> {
  const lats = batch.map((c) => c.latitude).join(",");
  const lngs = batch.map((c) => c.longitude).join(",");
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}` +
    `&hourly=temperature_2m,relative_humidity_2m&past_days=2&forecast_days=5&timezone=Europe/London`;
  const res = await fetch(url, { next: { revalidate: 21600 } });
  if (!res.ok) throw new Error(`Open-Meteo ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

export async function GET() {
  try {
    const batches = chunk(cities, 25);
    const results = await Promise.all(batches.map(fetchBatch));
    const flat = results.flat();

    const points: BlightPoint[] = cities.map((city, i) => {
      const h = flat[i]?.hourly;
      if (!h) {
        return { slug: city.slug, name: city.name, lat: city.latitude, lng: city.longitude, level: "low", period: null, forecast: false, days: [] };
      }
      const a = assessHutton(h.time, h.temperature_2m, h.relative_humidity_2m);
      return {
        slug: city.slug,
        name: city.name,
        lat: city.latitude,
        lng: city.longitude,
        level: a.level,
        period: a.period,
        forecast: a.forecast,
        days: a.days.map((d) => ({
          date: d.date,
          minTemp: d.minTemp,
          humidHours: d.humidHours,
          qualifies: d.qualifies,
          isToday: d.isToday,
        })),
      };
    });

    return NextResponse.json(
      { generatedAt: new Date().toISOString(), points },
      {
        headers: {
          "Cache-Control": "public, max-age=0, s-maxage=21600, stale-while-revalidate=86400",
          "Netlify-CDN-Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return NextResponse.json({ error: "Could not read blight conditions right now." }, { status: 503 });
  }
}
