import { getLocalWeather, rainLast24h, rainNextHours, ukDay, type LocalWeather } from "@/lib/weather-brain";

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

/** The watering note's view of the shared weather snapshot. */
export function wateringWeatherFrom(w: LocalWeather, now: Date = new Date()): WateringWeather {
  const today = w.daily.time.indexOf(ukDay(now));
  const at = (series: (number | null)[], offset = 0): number | undefined => {
    const v = today >= 0 ? series[today + offset] : null;
    return typeof v === "number" ? v : undefined;
  };
  const maxToday = at(w.daily.tempMax);
  const wind = at(w.daily.windMax);
  const et = at(w.daily.et0);
  const nextMaxes = [at(w.daily.tempMax, 1), at(w.daily.tempMax, 2)].filter(
    (v): v is number => typeof v === "number"
  );
  const rain3 =
    today >= 0
      ? round1(w.daily.precipitation.slice(today, today + 3).reduce((sum: number, v) => sum + (v ?? 0), 0))
      : undefined;

  return {
    weatherCode: w.current.weatherCode ?? undefined,
    tempNow: w.current.temp === null ? undefined : round1(w.current.temp),
    tempMaxToday: maxToday === undefined ? undefined : round1(maxToday),
    tempMaxNextDays: nextMaxes.map(round1),
    windMax: wind === undefined ? undefined : Math.round(wind),
    soilTemp: w.current.soilTemp0cm === null ? undefined : round1(w.current.soilTemp0cm),
    rainLast24h: rainLast24h(w, now) ?? undefined,
    rainNext12h: rainNextHours(w, 12, now) ?? undefined,
    rainfall3Days: rain3,
    evapotranspiration: et === undefined ? undefined : round1(et),
  };
}

export async function fetchWateringWeather(lat: number, lng: number): Promise<WateringWeather | null> {
  const weather = await getLocalWeather(lat, lng);
  return weather ? wateringWeatherFrom(weather) : null;
}
