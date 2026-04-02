export type WeatherBonus = {
  type: "rain" | "sun" | "frost" | "monthly" | null;
  label: string | null;
  boostedSlugs: string[];
};

const CACHE_KEY = "whattosow:weather-bonus";
const CACHE_TTL = 3 * 60 * 60 * 1000; // 3 hours

const RAIN_CROPS = ["peas", "broad-beans", "lettuce", "spinach", "kale", "cabbage", "broccoli", "cauliflower", "brussels-sprouts"];
const SUN_CROPS = ["tomatoes", "peppers", "chillies", "sweetcorn", "courgettes", "aubergine", "cucumbers", "basil"];
const FROST_CROPS = ["broad-beans", "peas", "garlic", "rhubarb", "gooseberries", "blackcurrants", "redcurrants"];

interface CachedWeather {
  bonus: WeatherBonus;
  fetchedAt: number;
}

export async function getWeatherBonus(lat: number | null, lng: number | null): Promise<WeatherBonus> {
  const noBonus: WeatherBonus = { type: null, label: null, boostedSlugs: [] };

  // Monthly special on the 1st
  const now = new Date();
  if (now.getDate() === 1) {
    return { type: "monthly", label: "Monthly special — today only!", boostedSlugs: [] };
  }

  if (!lat || !lng) return noBonus;

  // Check cache
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CachedWeather = JSON.parse(cached);
      if (Date.now() - parsed.fetchedAt < CACHE_TTL) return parsed.bonus;
    }
  } catch { /* ignore */ }

  // Fetch current weather from Open-Meteo
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,rain,weathercode`
    );
    if (!res.ok) return noBonus;
    const data = await res.json();
    const temp = data.current?.temperature_2m ?? 10;
    const rain = data.current?.rain ?? 0;

    let bonus: WeatherBonus;
    if (temp < 5) {
      bonus = { type: "frost", label: "Frost special! Hardy legends unlocked", boostedSlugs: FROST_CROPS };
    } else if (rain > 0.5) {
      bonus = { type: "rain", label: "Rain bonus! Moisture-lovers are more likely", boostedSlugs: RAIN_CROPS };
    } else if (temp > 18) {
      bonus = { type: "sun", label: "Sun bonus! Tender crops are feeling lucky", boostedSlugs: SUN_CROPS };
    } else {
      bonus = noBonus;
    }

    // Cache the result
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ bonus, fetchedAt: Date.now() }));
    } catch { /* ignore */ }

    return bonus;
  } catch {
    return noBonus;
  }
}
