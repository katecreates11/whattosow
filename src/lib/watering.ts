export type WateringNoteState =
  | "rained-properly"
  | "raining-now"
  | "hot-dry-spell"
  | "heatwave"
  | "cool-and-cloudy"
  | "windy-and-dry"
  | "rain-due"
  | "no-postcode"
  | "winter-observation";

export interface WateringBalanceInput {
  rainfall3Days?: number;
  evapotranspiration?: number;
}

export interface WateringBalance {
  rain: number;
  lost: number;
  netBalance: number;
  gaining: boolean;
  scale: number;
}

export interface WateringWeather {
  weatherCode?: number;
  tempNow?: number;
  tempMaxToday?: number;
  tempMaxNextDays?: number[];
  windMax?: number;
  soilTemp?: number;
  rainLast24h?: number;
  rainNext12h?: number;
  rainfall3Days?: number;
  evapotranspiration?: number;
}

export function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export function isRainingWeatherCode(code: number | undefined): boolean {
  return code != null && code >= 51 && code <= 82;
}

export function isWateringSeason(date: Date = new Date()): boolean {
  const month = date.getMonth();
  return month >= 3 && month <= 8; // Apr-Sep
}

export function getWateringBalance(input: WateringBalanceInput): WateringBalance | null {
  if (input.rainfall3Days == null || input.evapotranspiration == null) return null;

  const rain = input.rainfall3Days;
  const lost = round1(input.evapotranspiration * 3);
  const netBalance = round1(rain - lost);
  const gaining = netBalance > 0;
  const scale = Math.max(rain, lost, 1);

  return { rain, lost, netBalance, gaining, scale };
}

export function getWateringNoteState(
  weather: WateringWeather | null,
  date: Date = new Date()
): WateringNoteState {
  if (!isWateringSeason(date)) return "winter-observation";
  if (!weather) return "no-postcode";

  if (isRainingWeatherCode(weather.weatherCode)) return "raining-now";
  if ((weather.rainLast24h ?? 0) >= 5) return "rained-properly";
  if ((weather.rainNext12h ?? 0) >= 3) return "rain-due";

  const balance = getWateringBalance(weather);
  const losingWater = balance ? !balance.gaining : (weather.rainfall3Days ?? 0) < 2;
  const maxes = weather.tempMaxNextDays ?? [];
  const hotDays = [weather.tempMaxToday, ...maxes].filter((temp) => (temp ?? 0) >= 28).length;

  if (hotDays >= 3 && losingWater) return "heatwave";
  if ((weather.tempMaxToday ?? weather.tempNow ?? 0) >= 24 && losingWater) return "hot-dry-spell";
  if ((weather.windMax ?? 0) >= 30 && (weather.rainLast24h ?? 0) < 2 && (weather.rainNext12h ?? 0) < 1) {
    return "windy-and-dry";
  }
  if ((weather.tempMaxToday ?? weather.tempNow ?? 99) <= 18) return "cool-and-cloudy";

  return balance?.gaining ? "rained-properly" : "hot-dry-spell";
}

export async function fetchWateringWeather(lat: number, lng: number): Promise<WateringWeather | null> {
  try {
    const params = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lng),
      current: "temperature_2m,weather_code,wind_speed_10m,soil_temperature_0cm",
      hourly: "precipitation",
      daily: "precipitation_sum,et0_fao_evapotranspiration,temperature_2m_max,wind_speed_10m_max",
      past_days: "1",
      forecast_days: "3",
      timezone: "Europe/London",
    });

    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!res.ok) return null;

    const data = await res.json();
    const now = new Date();
    const hourTimes: string[] = data.hourly?.time ?? [];
    const precip: number[] = data.hourly?.precipitation ?? [];

    const sumBetween = (from: Date, to: Date) =>
      round1(
        hourTimes.reduce((sum, time, index) => {
          const t = new Date(time);
          if (t > from && t <= to) return sum + (precip[index] ?? 0);
          return sum;
        }, 0)
      );

    const dailyPrecip: number[] = data.daily?.precipitation_sum ?? [];
    const dailyEt: number[] = data.daily?.et0_fao_evapotranspiration ?? [];
    const tempMax: number[] = data.daily?.temperature_2m_max ?? [];
    const windMax: number[] = data.daily?.wind_speed_10m_max ?? [];

    return {
      weatherCode: data.current?.weather_code,
      tempNow: typeof data.current?.temperature_2m === "number" ? round1(data.current.temperature_2m) : undefined,
      tempMaxToday: typeof tempMax[0] === "number" ? round1(tempMax[0]) : undefined,
      tempMaxNextDays: tempMax.slice(1).filter((value) => typeof value === "number").map(round1),
      windMax: typeof windMax[0] === "number" ? Math.round(windMax[0]) : undefined,
      soilTemp: typeof data.current?.soil_temperature_0cm === "number" ? round1(data.current.soil_temperature_0cm) : undefined,
      rainLast24h: sumBetween(new Date(now.getTime() - 24 * 60 * 60 * 1000), now),
      rainNext12h: sumBetween(now, new Date(now.getTime() + 12 * 60 * 60 * 1000)),
      rainfall3Days: dailyPrecip.length > 0 ? round1(dailyPrecip.reduce((sum, value) => sum + (value ?? 0), 0)) : undefined,
      evapotranspiration: typeof dailyEt[0] === "number" ? round1(dailyEt[0]) : undefined,
    };
  } catch {
    return null;
  }
}
