export interface LocationData {
  postcode: string;
  latitude: number;
  longitude: number;
  region: string;
  adminDistrict: string;
}

export interface FrostData {
  location: LocationData;
  lastFrostDate: Date;
  firstAutumnFrostDate: Date;
  growingSeasonDays: number;
  daysUntilSafe: number;
  isSafe: boolean;
}

export interface FrostForecast {
  tonight: { min: number; frostRisk: boolean };
  tomorrow: { min: number; frostRisk: boolean };
  nextThreeDays: { date: string; min: number; frostRisk: boolean }[];
  soilTemp?: number; // current soil temperature at surface (°C)
  soilTemp6cm?: number; // seed-depth soil temp (°C)
  soilMoisture?: number; // volumetric moisture 0-7cm (m³/m³)
  evapotranspiration?: number; // daily ET₀ in mm
  windMax?: number; // max wind km/h
  windGustsMax?: number; // max gusts km/h
  precipProbability?: number; // max precip probability %
  sunshineDuration?: number; // sunshine hours today
  tempMax?: number; // today's high °C
  rainfall3Days?: number; // total precipitation over next 3 days (mm)
}

export type LookupError = "invalid" | "network";

/**
 * Look up a UK postcode using the free postcodes.io API.
 * Returns LocationData on success, or a LookupError string on failure.
 */
export async function lookupPostcode(
  postcode: string
): Promise<LocationData | LookupError> {
  const cleaned = postcode.replace(/\s/g, "").toUpperCase();

  try {
    const res = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(cleaned)}`
    );
    if (!res.ok) return "invalid";

    const data = await res.json();
    if (data.status !== 200 || !data.result) return "invalid";

    const r = data.result;
    if (typeof r.latitude !== "number" || typeof r.longitude !== "number") {
      return "invalid";
    }
    return {
      postcode: r.postcode,
      latitude: r.latitude,
      longitude: r.longitude,
      region: r.region || r.country || "Unknown",
      adminDistrict: r.admin_district || "Unknown",
    };
  } catch {
    return "network";
  }
}

/**
 * Calculate the estimated last spring frost date for a UK location.
 *
 * Model calibrated against Met Office HadUK-Grid frost date data:
 * - Base: ~April 10 (day 100) at latitude 50°N
 * - Rate: +6 days per degree north
 * - Gulf Stream adjustment: western locations are milder
 *
 * Accuracy: within ~5-7 days for most UK locations.
 */
export function calculateLastFrostDate(lat: number, long: number): Date {
  const year = new Date().getFullYear();

  // Base model
  let dayOfYear = 100 + (lat - 50) * 6;

  // Longitude/coastal adjustment (Gulf Stream effect)
  if (long < -4.5) {
    dayOfYear -= 5; // Far west (Cornwall tip, W Wales coast, W Highlands)
  } else if (long < -3) {
    dayOfYear -= 3; // West
  } else if (long < -1) {
    dayOfYear -= 1; // West-central
  } else if (long > 0.5) {
    dayOfYear += 2; // East coast (continental influence)
  }

  // Clamp to reasonable UK range (late March to mid June)
  dayOfYear = Math.max(85, Math.min(168, Math.round(dayOfYear)));

  const date = new Date(year, 0); // Jan 1
  date.setDate(dayOfYear);
  return date;
}

/**
 * Estimate the first autumn frost date
 */
export function calculateFirstAutumnFrostDate(
  lat: number,
  long: number
): Date {
  const year = new Date().getFullYear();

  // Base: ~October 25 (day 298) at latitude 50°N
  // Earlier by ~5 days per degree north
  let dayOfYear = 298 - (lat - 50) * 5;

  // Coastal adjustment (inverse of spring)
  if (long < -4.5) {
    dayOfYear += 4;
  } else if (long < -3) {
    dayOfYear += 2;
  } else if (long > 0.5) {
    dayOfYear -= 2;
  }

  dayOfYear = Math.max(245, Math.min(310, Math.round(dayOfYear)));

  const date = new Date(year, 0);
  date.setDate(dayOfYear);
  return date;
}

/**
 * Get frost forecast using Open-Meteo (free, no API key needed)
 */
export async function getFrostForecast(
  lat: number,
  long: number
): Promise<FrostForecast | null> {
  try {
    const dailyParams = [
      "temperature_2m_min", "temperature_2m_max", "precipitation_sum",
      "et0_fao_evapotranspiration", "wind_speed_10m_max", "wind_gusts_10m_max",
      "precipitation_probability_max", "sunshine_duration",
    ].join(",");
    const hourlyParams = [
      "soil_temperature_0cm", "soil_temperature_6cm", "soil_moisture_0_to_7cm",
    ].join(",");

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=${dailyParams}&hourly=${hourlyParams}&timezone=Europe%2FLondon&forecast_days=3`
    );
    if (!res.ok) return null;

    const data = await res.json();
    const dates: string[] = data.daily.time;
    const mins: number[] = data.daily.temperature_2m_min;
    const precip: number[] = data.daily.precipitation_sum ?? [];

    const days = dates.map((date: string, i: number) => ({
      date,
      min: Math.round(mins[i] * 10) / 10,
      frostRisk: mins[i] <= 2,
    }));

    // Helper: get most recent hourly value up to now
    const hourTimes: string[] = data.hourly?.time ?? [];
    const nowIso = new Date().toISOString().slice(0, 13);
    function latestHourly(arr: (number | null)[] | undefined): number | undefined {
      if (!arr) return undefined;
      for (let i = hourTimes.length - 1; i >= 0; i--) {
        if (hourTimes[i] <= nowIso && arr[i] !== null) {
          return Math.round(arr[i]! * 10) / 10;
        }
      }
      return undefined;
    }

    const soilTemp = latestHourly(data.hourly?.soil_temperature_0cm);
    const soilTemp6cm = latestHourly(data.hourly?.soil_temperature_6cm);
    const soilMoisture = latestHourly(data.hourly?.soil_moisture_0_to_7cm);

    // Daily values — today is index 0
    const daily = data.daily;
    const evapotranspiration = daily.et0_fao_evapotranspiration?.[0] != null
      ? Math.round(daily.et0_fao_evapotranspiration[0] * 10) / 10
      : undefined;
    const windMax = daily.wind_speed_10m_max?.[0] != null
      ? Math.round(daily.wind_speed_10m_max[0])
      : undefined;
    const windGustsMax = daily.wind_gusts_10m_max?.[0] != null
      ? Math.round(daily.wind_gusts_10m_max[0])
      : undefined;
    const precipProbability = daily.precipitation_probability_max?.[0] ?? undefined;
    const tempMax = daily.temperature_2m_max?.[0] != null
      ? Math.round(daily.temperature_2m_max[0] * 10) / 10
      : undefined;
    // sunshine_duration comes in seconds — convert to hours
    const sunshineDuration = daily.sunshine_duration?.[0] != null
      ? Math.round((daily.sunshine_duration[0] / 3600) * 10) / 10
      : undefined;

    // Total rainfall over next 3 days
    const rainfall3Days = precip.length > 0
      ? Math.round(precip.reduce((a, b) => a + (b ?? 0), 0) * 10) / 10
      : undefined;

    return {
      tonight: days[0],
      tomorrow: days[1],
      nextThreeDays: days,
      soilTemp,
      soilTemp6cm,
      soilMoisture,
      evapotranspiration,
      windMax,
      windGustsMax,
      precipProbability,
      sunshineDuration,
      tempMax,
      rainfall3Days,
    };
  } catch {
    return null;
  }
}

/**
 * Calculate full frost data for a location.
 * If we're past this year's autumn frost date, show next spring's frost date
 * so the countdown is always forward-looking.
 */
export function calculateFrostData(location: LocationData): FrostData {
  const now = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;

  let lastFrost = calculateLastFrostDate(
    location.latitude,
    location.longitude
  );
  const firstAutumn = calculateFirstAutumnFrostDate(
    location.latitude,
    location.longitude
  );

  // If we're past the autumn frost date, show next year's spring frost
  if (now > firstAutumn) {
    const nextYear = new Date(lastFrost);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    lastFrost = nextYear;
  }

  const daysUntilSafe = Math.ceil(
    (lastFrost.getTime() - now.getTime()) / msPerDay
  );

  const growingSeasonDays = Math.round(
    (firstAutumn.getTime() -
      (now > firstAutumn
        ? calculateLastFrostDate(location.latitude, location.longitude)
        : lastFrost
      ).getTime()) / msPerDay
  );

  return {
    location,
    lastFrostDate: lastFrost,
    firstAutumnFrostDate: firstAutumn,
    growingSeasonDays,
    daysUntilSafe,
    isSafe: daysUntilSafe <= 0,
  };
}

/**
 * Format a date nicely for UK display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/**
 * Format a short date
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
