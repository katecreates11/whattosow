/**
 * Frost date calculations — ported from src/lib/frost.ts
 * Works entirely offline (pure math) except lookupPostcode and getFrostForecast.
 */

/**
 * Look up a UK postcode using the free postcodes.io API.
 * Returns LocationData on success, or an error string ("invalid"|"network") on failure.
 */
export async function lookupPostcode(postcode) {
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
 * Calibrated against Met Office HadUK-Grid frost date data.
 */
export function calculateLastFrostDate(lat, lng) {
  const year = new Date().getFullYear();

  let dayOfYear = 100 + (lat - 50) * 6;

  if (lng < -4.5) {
    dayOfYear -= 5;
  } else if (lng < -3) {
    dayOfYear -= 3;
  } else if (lng < -1) {
    dayOfYear -= 1;
  } else if (lng > 0.5) {
    dayOfYear += 2;
  }

  dayOfYear = Math.max(85, Math.min(168, Math.round(dayOfYear)));

  const date = new Date(year, 0);
  date.setDate(dayOfYear);
  return date;
}

/**
 * Estimate the first autumn frost date.
 */
export function calculateFirstAutumnFrostDate(lat, lng) {
  const year = new Date().getFullYear();

  let dayOfYear = 298 - (lat - 50) * 5;

  if (lng < -4.5) {
    dayOfYear += 4;
  } else if (lng < -3) {
    dayOfYear += 2;
  } else if (lng > 0.5) {
    dayOfYear -= 2;
  }

  dayOfYear = Math.max(245, Math.min(310, Math.round(dayOfYear)));

  const date = new Date(year, 0);
  date.setDate(dayOfYear);
  return date;
}

/**
 * Get frost forecast using Open-Meteo (free, no API key needed).
 * Returns null if the API is unreachable.
 */
export async function getFrostForecast(lat, lng) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_min,precipitation_sum&hourly=soil_temperature_0cm&timezone=Europe%2FLondon&forecast_days=3`
    );
    if (!res.ok) return null;

    const data = await res.json();
    const dates = data.daily.time;
    const mins = data.daily.temperature_2m_min;
    const precip = data.daily.precipitation_sum ?? [];

    const days = dates.map((date, i) => ({
      date,
      min: Math.round(mins[i] * 10) / 10,
      frostRisk: mins[i] <= 2,
    }));

    // Current soil temp: use the most recent hourly reading
    let soilTemp = undefined;
    const soilTemps = data.hourly?.soil_temperature_0cm ?? [];
    const hourTimes = data.hourly?.time ?? [];
    const nowIso = new Date().toISOString().slice(0, 13);
    for (let i = hourTimes.length - 1; i >= 0; i--) {
      if (hourTimes[i] <= nowIso && soilTemps[i] !== null) {
        soilTemp = Math.round(soilTemps[i] * 10) / 10;
        break;
      }
    }

    // Total rainfall over next 3 days
    const rainfall3Days = precip.length > 0
      ? Math.round(precip.reduce((a, b) => a + (b ?? 0), 0) * 10) / 10
      : undefined;

    return {
      tonight: days[0],
      tomorrow: days[1],
      nextThreeDays: days,
      soilTemp,
      rainfall3Days,
    };
  } catch {
    return null;
  }
}

/**
 * Calculate full frost data for a location.
 * If we're past this year's autumn frost date, show next spring's frost date.
 */
export function calculateFrostData(location) {
  const now = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;

  let lastFrost = calculateLastFrostDate(location.latitude, location.longitude);
  const firstAutumn = calculateFirstAutumnFrostDate(location.latitude, location.longitude);

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
 * Format a date for UK display.
 */
export function formatDate(date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/**
 * Format a short date.
 */
export function formatDateShort(date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
