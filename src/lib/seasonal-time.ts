import { MONTH_NAMES, MONTH_SLUGS } from "@/lib/calendar";

const LONDON_TIME_ZONE = "Europe/London";

type LondonParts = {
  day: number;
  hour: number;
  minute: number;
  month: number;
  second: number;
  year: number;
};

function londonParts(value: Date): LondonParts {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: LONDON_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(value);

  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value);

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
  };
}

/**
 * A timezone-independent Date whose UTC fields represent the current UK wall
 * clock. Existing seasonal helpers can safely use Date getters against it.
 */
export function ukNow(value: Date = new Date()): Date {
  const parts = londonParts(value);
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second));
}

export function getSeasonalTime(value: Date = new Date()) {
  const now = ukNow(value);
  const monthIndex = now.getUTCMonth();
  const mondayOffset = (now.getUTCDay() + 6) % 7;
  const weekOf = new Date(Date.UTC(now.getUTCFullYear(), monthIndex, now.getUTCDate() - mondayOffset));

  return {
    now,
    monthIndex,
    monthName: MONTH_NAMES[monthIndex],
    monthSlug: MONTH_SLUGS[monthIndex],
    weekOf,
  };
}
