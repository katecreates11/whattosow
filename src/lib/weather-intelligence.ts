/**
 * Weather intelligence layer — the brain of the garden dashboard.
 * Fetches real weather for the user's postcode and generates
 * personalised alerts and crop health assessments.
 */

import { type Crop } from "@/data/crops";
import { type Variety } from "@/data/varieties";
import { type GardenPlot } from "@/lib/garden-storage";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface WeatherState {
  temperature: number;
  temperatureMin: number;        // forecast min next 24h
  temperatureMax: number;        // forecast max next 24h
  rain: number;                  // mm in last 24h
  rainForecast: number;          // mm expected next 24h
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  frostRisk: boolean;            // min temp < 2°C in next 24h
  blightRisk: boolean;           // warm + humid + wet for extended period
  drySpell: number;              // consecutive days without >2mm rain
  recentRain: boolean;           // >2mm in last 24h
  description: string;           // "Sunny and warm" / "Overcast with showers"
  fetchedAt: number;             // timestamp
}

export type AlertType = "frost" | "water" | "harvest" | "blight" | "plant" | "general";
export type AlertPriority = "high" | "medium" | "low";

export interface GardenAlert {
  type: AlertType;
  priority: AlertPriority;
  message: string;
  affectedVarietyIds: string[];
}

export type CropStatus = "thriving" | "happy" | "okay" | "needs-attention" | "alert";

export interface CropHealthResult {
  status: CropStatus;
  statusMessage: string;
  borderColour: "green" | "amber" | "red";
  growthPercent: number;
  daysToHarvest: number;
  daysSinceSowing: number;
  isHarvestReady: boolean;
  needsWater: boolean;
  actions: string[];
}

// ─── Weather descriptions ───────────────────────────────────────────────────

const WEATHER_DESCRIPTIONS: Record<number, string> = {
  0: "Clear skies",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy with frost",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Heavy showers",
  82: "Violent showers",
  95: "Thunderstorm",
};

// ─── Cache ──────────────────────────────────────────────────────────────────

const WEATHER_CACHE_KEY = "whattosow:weather-state";
const WEATHER_CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getCachedWeather(): WeatherState | null {
  try {
    const raw = localStorage.getItem(WEATHER_CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as WeatherState;
    if (Date.now() - cached.fetchedAt > WEATHER_CACHE_TTL) return null;
    return cached;
  } catch {
    return null;
  }
}

function cacheWeather(state: WeatherState): void {
  try {
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

// ─── Fetch weather ──────────────────────────────────────────────────────────

export async function getWeatherState(lat: number, lng: number): Promise<WeatherState | null> {
  const cached = getCachedWeather();
  if (cached) return cached;

  try {
    // Fetch current conditions + daily forecast + recent precipitation
    const [currentRes, dailyRes] = await Promise.all([
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
        `&current=temperature_2m,relative_humidity_2m,rain,weather_code,wind_speed_10m` +
        `&hourly=precipitation&forecast_hours=24`
      ),
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
        `&daily=temperature_2m_min,temperature_2m_max,precipitation_sum` +
        `&past_days=7&forecast_days=2`
      ),
    ]);

    if (!currentRes.ok || !dailyRes.ok) return null;

    const current = await currentRes.json();
    const daily = await dailyRes.json();

    const temperature = current.current?.temperature_2m ?? 10;
    const humidity = current.current?.relative_humidity_2m ?? 50;
    const rain = current.current?.rain ?? 0;
    const windSpeed = current.current?.wind_speed_10m ?? 0;
    const weatherCode = current.current?.weather_code ?? 0;

    // Forecast min/max for tomorrow
    const forecastDays = daily.daily;
    const tomorrowIdx = forecastDays?.temperature_2m_min?.length > 1 ? forecastDays.temperature_2m_min.length - 1 : 0;
    const temperatureMin = forecastDays?.temperature_2m_min?.[tomorrowIdx] ?? temperature;
    const temperatureMax = forecastDays?.temperature_2m_max?.[tomorrowIdx] ?? temperature;

    // Rain forecast (next 24h from hourly)
    const hourlyPrecip: number[] = current.hourly?.precipitation ?? [];
    const rainForecast = hourlyPrecip.reduce((sum: number, v: number) => sum + (v || 0), 0);

    // Dry spell — count consecutive days from today backwards with <2mm rain
    const dailyPrecip: number[] = forecastDays?.precipitation_sum ?? [];
    let drySpell = 0;
    // Work backwards through the past days (skip the last entry which is the forecast)
    for (let i = dailyPrecip.length - 3; i >= 0; i--) {
      if ((dailyPrecip[i] ?? 0) < 2) {
        drySpell++;
      } else {
        break;
      }
    }

    // Recent rain — more than 2mm in the last 24 hours
    const recentRain = (dailyPrecip[dailyPrecip.length - 2] ?? 0) >= 2;

    // Frost risk — forecast min below 2°C
    const frostRisk = temperatureMin < 2;

    // Blight risk — warm + humid + wet for extended period
    const blightRisk = temperature > 20 && humidity > 75 && drySpell < 2;

    const description = WEATHER_DESCRIPTIONS[weatherCode] || "Variable conditions";

    const state: WeatherState = {
      temperature,
      temperatureMin,
      temperatureMax,
      rain,
      rainForecast,
      humidity,
      windSpeed,
      weatherCode,
      frostRisk,
      blightRisk,
      drySpell,
      recentRain,
      description,
      fetchedAt: Date.now(),
    };

    cacheWeather(state);
    return state;
  } catch {
    return null;
  }
}

// ─── Generate alerts ────────────────────────────────────────────────────────

export function generateAlerts(
  weather: WeatherState,
  plots: GardenPlot[],
  crops: Crop[],
  varieties: Variety[]
): GardenAlert[] {
  const alerts: GardenAlert[] = [];
  const activePlots = plots.filter((p) => !p.harvested);

  // Helper to get crop and variety for a plot
  const getPlotInfo = (plot: GardenPlot) => {
    const variety = varieties.find((v) => v.id === plot.varietyId);
    const crop = variety ? crops.find((c) => c.slug === variety.cropSlug) : null;
    return { variety, crop };
  };

  // === FROST ALERT (HIGH) ===
  if (weather.frostRisk) {
    const tenderCrops = activePlots.filter((p) => {
      const { crop } = getPlotInfo(p);
      return crop && (crop.category === "tender" || crop.category === "half-hardy");
    });

    if (tenderCrops.length > 0) {
      const names = tenderCrops
        .map((p) => {
          const { variety } = getPlotInfo(p);
          return variety?.name;
        })
        .filter(Boolean)
        .slice(0, 3);

      const nameStr = names.length > 2
        ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
        : names.join(" and ");

      alerts.push({
        type: "frost",
        priority: "high",
        message: `Chilly tonight — your ${nameStr} would appreciate some fleece or a move indoors.`,
        affectedVarietyIds: tenderCrops.map((p) => p.varietyId),
      });
    }
  }

  // === BLIGHT ALERT (HIGH) ===
  if (weather.blightRisk) {
    const blightCrops = activePlots.filter((p) => {
      const { crop } = getPlotInfo(p);
      return crop && crop.blightRisk;
    });

    if (blightCrops.length > 0) {
      const names = blightCrops
        .map((p) => {
          const { variety } = getPlotInfo(p);
          return variety?.name;
        })
        .filter(Boolean);

      alerts.push({
        type: "blight",
        priority: "high",
        message: `It's been warm and muggy — keep an eye on your ${names.slice(0, 2).join(" and ")} for any brown spots on the leaves.`,
        affectedVarietyIds: blightCrops.map((p) => p.varietyId),
      });
    }
  }

  // === WATER ALERT (MEDIUM) ===
  if (weather.drySpell >= 3 && weather.temperature > 15 && !weather.recentRain) {
    const thirstyCrops = activePlots.filter((p) => {
      // Skip if watered today or yesterday
      if (p.lastWatered) {
        const wateredDate = new Date(p.lastWatered);
        const daysSinceWatered = (Date.now() - wateredDate.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceWatered < 2) return false;
      }
      // Skip if rain handled it
      if (weather.recentRain) return false;
      return true;
    });

    if (thirstyCrops.length > 0) {
      const names = thirstyCrops
        .map((p) => {
          const { variety } = getPlotInfo(p);
          return variety?.name;
        })
        .filter(Boolean)
        .slice(0, 3);

      const nameStr = names.length > 2
        ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
        : names.join(" and ");

      const dayWord = weather.drySpell === 3 ? "three" : weather.drySpell === 4 ? "four" : `${weather.drySpell}`;

      alerts.push({
        type: "water",
        priority: "medium",
        message: `Your ${nameStr} ${thirstyCrops.length === 1 ? "is" : "are"} thirsty — it's been dry for ${dayWord} days. A good soak this evening will keep ${thirstyCrops.length === 1 ? "it" : "them"} happy.`,
        affectedVarietyIds: thirstyCrops.map((p) => p.varietyId),
      });
    }
  }

  // === HARVEST ALERT (MEDIUM) ===
  const harvestReady = activePlots.filter((p) => {
    return new Date(p.expectedHarvest).getTime() <= Date.now();
  });

  if (harvestReady.length > 0) {
    const names = harvestReady
      .map((p) => {
        const { variety } = getPlotInfo(p);
        return variety?.name;
      })
      .filter(Boolean)
      .slice(0, 3);

    const nameStr = names.length > 2
      ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
      : names.join(" and ");

    alerts.push({
      type: "harvest",
      priority: "medium",
      message: `Your ${nameStr} ${harvestReady.length === 1 ? "is" : "are"} ready to pick! Don't leave ${harvestReady.length === 1 ? "it" : "them"} too long.`,
      affectedVarietyIds: harvestReady.map((p) => p.varietyId),
    });
  }

  // === GOOD WEATHER FOR PLANTING (LOW) ===
  if (
    weather.temperature > 10 &&
    weather.temperature < 25 &&
    weather.rainForecast < 5 &&
    !weather.frostRisk &&
    activePlots.length < 12 // don't suggest if garden is full
  ) {
    alerts.push({
      type: "plant",
      priority: "low",
      message: weather.rainForecast > 1
        ? "Mild and damp this week — perfect conditions for planting out."
        : "Lovely growing weather today. Good time to get something in the ground.",
      affectedVarietyIds: [],
    });
  }

  // Sort by priority
  const priorityOrder: Record<AlertPriority, number> = { high: 0, medium: 1, low: 2 };
  alerts.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return alerts;
}

// ─── Crop health assessment ─────────────────────────────────────────────────

export function assessCropHealth(
  variety: Variety,
  crop: Crop,
  plot: GardenPlot,
  weather: WeatherState
): CropHealthResult {
  const now = Date.now();
  const sowDate = new Date(plot.sowDate || now).getTime();
  const harvestDate = new Date(plot.expectedHarvest).getTime();
  const totalGrowTime = harvestDate - sowDate;
  const elapsed = now - sowDate;
  const growthPercent = Math.min(100, Math.max(0, (elapsed / totalGrowTime) * 100));
  const daysToHarvest = Math.max(0, Math.ceil((harvestDate - now) / (1000 * 60 * 60 * 24)));
  const daysSinceSowing = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const isHarvestReady = now >= harvestDate;

  // Determine water need
  let needsWater = false;
  if (weather.drySpell >= 3 && weather.temperature > 15 && !weather.recentRain) {
    if (!plot.lastWatered) {
      needsWater = true;
    } else {
      const daysSinceWatered = (now - new Date(plot.lastWatered).getTime()) / (1000 * 60 * 60 * 24);
      needsWater = daysSinceWatered > 2;
    }
  }

  // Determine overall status
  let status: CropStatus;
  let statusMessage: string;
  let borderColour: "green" | "amber" | "red";
  const actions: string[] = [];

  if (isHarvestReady) {
    status = "thriving";
    statusMessage = "Ready to harvest!";
    borderColour = "green";
    actions.push("Harvest now");
  } else if (weather.frostRisk && (crop.category === "tender" || crop.category === "half-hardy")) {
    status = "alert";
    statusMessage = "Frost risk tonight — protect this crop";
    borderColour = "red";
    actions.push("Cover with fleece or bring indoors");
  } else if (weather.blightRisk && crop.blightRisk) {
    status = "alert";
    statusMessage = "Blight conditions — check leaves";
    borderColour = "red";
    actions.push("Inspect for brown spots");
  } else if (needsWater) {
    status = "needs-attention";
    statusMessage = "Could do with a drink";
    borderColour = "amber";
    actions.push("Water today");
  } else if (weather.temperature > 20 && crop.category !== "tender") {
    status = "thriving";
    statusMessage = "Loving the warm weather";
    borderColour = "green";
  } else if (weather.temperature > 12) {
    status = "happy";
    statusMessage = "Growing nicely";
    borderColour = "green";
  } else if (weather.temperature > 5) {
    status = "okay";
    statusMessage = "Ticking along — a bit cool";
    borderColour = "green";
  } else {
    status = "needs-attention";
    statusMessage = "It's cold — growth will be slow";
    borderColour = "amber";
  }

  return {
    status,
    statusMessage,
    borderColour,
    growthPercent,
    daysToHarvest,
    daysSinceSowing,
    isHarvestReady,
    needsWater,
    actions,
  };
}

// ─── Gardening advice based on weather ──────────────────────────────────────

export function getDailyAdvice(weather: WeatherState): string {
  if (weather.frostRisk) {
    return "Frost expected tonight. Protect tender crops and hold off planting anything out.";
  }
  if (weather.blightRisk) {
    return "Warm and humid — blight weather. Check tomatoes and potatoes for signs.";
  }
  if (weather.recentRain && weather.rainForecast > 2) {
    return "Plenty of rain about — no need to water. Good day for indoor sowing.";
  }
  if (weather.recentRain) {
    return "Rain yesterday has done the watering for you. The soil will be easy to work today.";
  }
  if (weather.drySpell >= 5) {
    return `It's been dry for ${weather.drySpell} days. Everything in the ground needs a good soak.`;
  }
  if (weather.temperature > 20 && weather.rainForecast < 1) {
    return "Warm and dry — great growing weather. Water in the evening when it's cooler.";
  }
  if (weather.temperature > 15 && weather.rainForecast > 1) {
    return "Mild with rain on the way — perfect conditions. Let nature do the watering.";
  }
  if (weather.temperature > 10) {
    return "Decent growing weather. A good day to get jobs done on the allotment.";
  }
  if (weather.temperature > 5) {
    return "Cool but manageable. Hardy crops are fine — keep tender stuff protected.";
  }
  return "Cold out there. Focus on planning and indoor sowing for now.";
}
