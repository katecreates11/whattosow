/**
 * A synthetic Open-Meteo forecast response, in the exact shape the weather
 * brain requests (see buildForecastUrl). Tests describe the weather they want
 * hour by hour; nothing here touches the network.
 */

export interface FixtureOptions {
  /** UK calendar day that counts as "today", e.g. "2026-11-16". */
  today: string;
  pastDays?: number;
  forecastDays?: number;
  /** Air temperature for a given day offset (0 = today) and hour. */
  temp?: (dayOffset: number, hour: number) => number;
  humidity?: (dayOffset: number, hour: number) => number;
  /** Rain in mm for a given day offset and hour. */
  rain?: (dayOffset: number, hour: number) => number;
  soil6cm?: (dayOffset: number, hour: number) => number;
  current?: Partial<Record<string, number | string>>;
  elevation?: number;
}

function iso(day: string, offset: number): string {
  const [y, m, d] = day.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + offset));
  return date.toISOString().slice(0, 10);
}

export function forecastFixture(options: FixtureOptions) {
  const past = options.pastDays ?? 7;
  const ahead = options.forecastDays ?? 7;
  const temp = options.temp ?? (() => 10);
  const humidity = options.humidity ?? (() => 70);
  const rain = options.rain ?? (() => 0);
  const soil = options.soil6cm ?? (() => 9);

  const hourly = {
    time: [] as string[],
    temperature_2m: [] as number[],
    relative_humidity_2m: [] as number[],
    precipitation: [] as number[],
    soil_temperature_6cm: [] as number[],
    soil_moisture_0_to_7cm: [] as number[],
  };
  const daily = {
    time: [] as string[],
    temperature_2m_min: [] as number[],
    temperature_2m_max: [] as number[],
    precipitation_sum: [] as number[],
    precipitation_probability_max: [] as number[],
    et0_fao_evapotranspiration: [] as number[],
    wind_speed_10m_max: [] as number[],
    wind_gusts_10m_max: [] as number[],
    sunshine_duration: [] as number[],
    weather_code: [] as number[],
  };

  for (let offset = -past; offset < ahead; offset++) {
    const day = iso(options.today, offset);
    const temps: number[] = [];
    let wet = 0;
    for (let hour = 0; hour < 24; hour++) {
      const t = temp(offset, hour);
      const r = rain(offset, hour);
      temps.push(t);
      wet += r;
      hourly.time.push(`${day}T${String(hour).padStart(2, "0")}:00`);
      hourly.temperature_2m.push(t);
      hourly.relative_humidity_2m.push(humidity(offset, hour));
      hourly.precipitation.push(r);
      hourly.soil_temperature_6cm.push(soil(offset, hour));
      hourly.soil_moisture_0_to_7cm.push(0.3);
    }
    daily.time.push(day);
    daily.temperature_2m_min.push(Math.min(...temps));
    daily.temperature_2m_max.push(Math.max(...temps));
    daily.precipitation_sum.push(Math.round(wet * 10) / 10);
    daily.precipitation_probability_max.push(wet > 0 ? 80 : 5);
    daily.et0_fao_evapotranspiration.push(1.5);
    daily.wind_speed_10m_max.push(18);
    daily.wind_gusts_10m_max.push(34);
    daily.sunshine_duration.push(4 * 3600);
    daily.weather_code.push(wet > 0 ? 61 : 2);
  }

  return {
    latitude: 51.64,
    longitude: -0.17,
    elevation: options.elevation ?? 123,
    timezone: "Europe/London",
    current: {
      time: `${options.today}T12:00`,
      temperature_2m: temp(0, 12),
      relative_humidity_2m: humidity(0, 12),
      precipitation: rain(0, 12),
      rain: rain(0, 12),
      weather_code: 2,
      cloud_cover: 40,
      wind_speed_10m: 12,
      wind_direction_10m: 225,
      soil_temperature_0cm: 8,
      ...options.current,
    },
    hourly,
    daily,
  };
}

/** A real instant for a UK wall-clock time in winter (GMT) or summer (BST). */
export function ukTime(day: string, hour: number, summer = false): Date {
  return new Date(`${day}T${String(hour).padStart(2, "0")}:00:00${summer ? "+01:00" : "Z"}`);
}
