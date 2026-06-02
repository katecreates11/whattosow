/**
 * Tomato/potato late blight risk via the Hutton Criteria (James Hutton Institute
 * / AHDB, the UK standard since 2017, replacing Smith Periods).
 *
 * A high-risk "Hutton Period" = TWO consecutive days, each with:
 *   - minimum temperature >= 10°C, AND
 *   - at least 6 hours of relative humidity >= 90%.
 *
 * Computed from hourly temperature + relative humidity (Open-Meteo), across a
 * window of recent past days through the forecast.
 */

export interface BlightDay {
  date: string; // YYYY-MM-DD
  minTemp: number;
  humidHours: number; // hours with RH >= 90%
  qualifies: boolean;
  isPast: boolean;
  isToday: boolean;
}

export type BlightLevel = "high" | "building" | "low";

export interface BlightAssessment {
  level: BlightLevel;
  days: BlightDay[];
  /** the most recent/relevant Hutton Period found, if any */
  period: { start: string; end: string } | null;
  /** true when that period is in the forecast rather than already recorded */
  forecast: boolean;
}

function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function consecutive(a: string, b: string): boolean {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86400000) === 1;
}

export function assessHutton(
  times: string[],
  temps: (number | null)[],
  humidity: (number | null)[],
  now: Date = new Date()
): BlightAssessment {
  const byDay = new Map<string, { temps: number[]; humid: number[] }>();
  for (let i = 0; i < times.length; i++) {
    const date = times[i].slice(0, 10);
    if (!byDay.has(date)) byDay.set(date, { temps: [], humid: [] });
    const e = byDay.get(date)!;
    if (typeof temps[i] === "number") e.temps.push(temps[i] as number);
    if (typeof humidity[i] === "number") e.humid.push(humidity[i] as number);
  }

  const todayStr = ymd(now);
  const days: BlightDay[] = [...byDay.entries()]
    .filter(([, v]) => v.temps.length >= 20) // reasonably complete days only
    .map(([date, v]) => {
      const minTemp = Math.round(Math.min(...v.temps) * 10) / 10;
      const humidHours = v.humid.filter((h) => h >= 90).length;
      return {
        date,
        minTemp,
        humidHours,
        qualifies: minTemp >= 10 && humidHours >= 6,
        isPast: date < todayStr,
        isToday: date === todayStr,
      };
    })
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  let period: { start: string; end: string } | null = null;
  let forecast = false;
  for (let i = 1; i < days.length; i++) {
    if (days[i].qualifies && days[i - 1].qualifies && consecutive(days[i - 1].date, days[i].date)) {
      period = { start: days[i - 1].date, end: days[i].date };
      forecast = days[i].date > todayStr;
    }
  }

  let level: BlightLevel = "low";
  if (period) level = "high";
  else if (days.some((d) => d.qualifies)) level = "building";

  return { level, days, period, forecast };
}
