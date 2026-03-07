export interface WeekWeatherProfile {
  avgHighC: number;
  avgLowC: number;
  avgRainMm: number;
  avgRainDays: number; // days with >1mm rain
  avgSunshineHours: number;
  avgHumidity: number;
  avgSoilMoisture: number; // 0-7cm volumetric
  avgWindGustsKmh: number;
  // Blight: count of years (out of 5) with 2+ consecutive days of 15°C+ and humidity >80%
  blightYears: number;
  yearsAnalysed: number;
}

/**
 * Fetch historical weather for a given week (±3 days around target date)
 * averaged over the last 5 years at the given location.
 *
 * Uses Open-Meteo Historical Weather API (free, no key needed for non-commercial).
 */
export async function fetchWeekWeatherProfile(
  lat: number,
  long: number,
  targetDate: Date
): Promise<WeekWeatherProfile | null> {
  const currentYear = new Date().getFullYear();
  const targetMonth = targetDate.getMonth();
  const targetDay = targetDate.getDate();

  // Build date ranges for the same week across last 5 years
  const years: number[] = [];
  for (let y = currentYear - 5; y < currentYear; y++) {
    years.push(y);
  }

  const dailyVars = [
    "temperature_2m_max",
    "temperature_2m_min",
    "rain_sum",
    "precipitation_hours",
    "sunshine_duration",
    "relative_humidity_2m_mean",
    "soil_moisture_0_to_7cm",
    "wind_gusts_10m_max",
  ].join(",");

  // Fetch all years in parallel
  const fetches = years.map(async (year) => {
    const center = new Date(year, targetMonth, targetDay);
    const start = new Date(center);
    start.setDate(start.getDate() - 3);
    const end = new Date(center);
    end.setDate(end.getDate() + 3);

    const startStr = start.toISOString().split("T")[0];
    const endStr = end.toISOString().split("T")[0];

    try {
      const res = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${long}&start_date=${startStr}&end_date=${endStr}&daily=${dailyVars}&timezone=Europe%2FLondon`
      );
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  });

  const results = await Promise.all(fetches);
  const validResults = results.filter((r) => r !== null && r.daily);

  if (validResults.length === 0) return null;

  // Aggregate all daily data across years
  let totalHighs = 0, totalLows = 0, totalRain = 0, totalSunshine = 0;
  let totalHumidity = 0, totalSoilMoisture = 0, totalWindGusts = 0;
  let totalRainDays = 0, totalDays = 0;
  let blightYears = 0;

  for (const data of validResults) {
    const d = data.daily;
    const days = d.temperature_2m_max?.length ?? 0;

    // Check for blight conditions: 2+ consecutive days of 15°C+ min and humidity >80%
    let consecutiveBlight = 0;
    let hadBlight = false;
    for (let i = 0; i < days; i++) {
      const minTemp = d.temperature_2m_min?.[i] ?? 0;
      const humidity = d.relative_humidity_2m_mean?.[i] ?? 0;
      if (minTemp >= 15 && humidity >= 80) {
        consecutiveBlight++;
        if (consecutiveBlight >= 2) hadBlight = true;
      } else {
        consecutiveBlight = 0;
      }
    }
    if (hadBlight) blightYears++;

    for (let i = 0; i < days; i++) {
      totalHighs += d.temperature_2m_max?.[i] ?? 0;
      totalLows += d.temperature_2m_min?.[i] ?? 0;
      totalRain += d.rain_sum?.[i] ?? 0;
      // sunshine_duration comes in seconds — convert to hours
      totalSunshine += ((d.sunshine_duration?.[i] ?? 0) / 3600);
      totalHumidity += d.relative_humidity_2m_mean?.[i] ?? 0;
      totalSoilMoisture += d.soil_moisture_0_to_7cm?.[i] ?? 0;
      totalWindGusts += d.wind_gusts_10m_max?.[i] ?? 0;
      if ((d.rain_sum?.[i] ?? 0) > 1) totalRainDays++;
      totalDays++;
    }
  }

  if (totalDays === 0) return null;

  const weeksAnalysed = validResults.length;

  return {
    avgHighC: Math.round((totalHighs / totalDays) * 10) / 10,
    avgLowC: Math.round((totalLows / totalDays) * 10) / 10,
    avgRainMm: Math.round((totalRain / weeksAnalysed) * 10) / 10,
    avgRainDays: Math.round((totalRainDays / weeksAnalysed) * 10) / 10,
    avgSunshineHours: Math.round((totalSunshine / totalDays) * 10) / 10,
    avgHumidity: Math.round(totalHumidity / totalDays),
    avgSoilMoisture: Math.round((totalSoilMoisture / totalDays) * 1000) / 1000,
    avgWindGustsKmh: Math.round(totalWindGusts / totalDays),
    blightYears,
    yearsAnalysed: weeksAnalysed,
  };
}
