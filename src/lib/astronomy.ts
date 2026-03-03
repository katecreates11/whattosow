import SunCalc from "suncalc";

// UK average coordinates (roughly Westminster / central England)
const UK_DEFAULT_LAT = 52;
const UK_DEFAULT_LNG = -1.5;

export interface MoonPhaseData {
  /** 0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter */
  phase: number;
  /** 0–1 fraction of disk illuminated */
  illumination: number;
  /** Human-readable phase name */
  name: string;
}

export interface SunTimesData {
  sunrise: Date;
  sunset: Date;
  goldenHour: Date;
  /** Total daylight in minutes */
  daylightMinutes: number;
}

const PHASE_NAMES: [number, string][] = [
  [0.0, "New Moon"],
  [0.125, "Waxing Crescent"],
  [0.25, "First Quarter"],
  [0.375, "Waxing Gibbous"],
  [0.5, "Full Moon"],
  [0.625, "Waning Gibbous"],
  [0.75, "Last Quarter"],
  [0.875, "Waning Crescent"],
  [1.0, "New Moon"],
];

function getPhaseName(phase: number): string {
  for (let i = 0; i < PHASE_NAMES.length - 1; i++) {
    const mid = (PHASE_NAMES[i][0] + PHASE_NAMES[i + 1][0]) / 2;
    if (phase < mid) return PHASE_NAMES[i][1];
  }
  return "New Moon";
}

export function getMoonPhaseData(date: Date = new Date()): MoonPhaseData {
  const illum = SunCalc.getMoonIllumination(date);
  return {
    phase: illum.phase,
    illumination: illum.fraction,
    name: getPhaseName(illum.phase),
  };
}

export function getSunTimes(
  date: Date = new Date(),
  lat: number = UK_DEFAULT_LAT,
  lng: number = UK_DEFAULT_LNG
): SunTimesData {
  const times = SunCalc.getTimes(date, lat, lng);
  const daylightMs = times.sunset.getTime() - times.sunrise.getTime();

  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    goldenHour: times.goldenHour,
    daylightMinutes: Math.round(daylightMs / 60000),
  };
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatDaylight(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

export { UK_DEFAULT_LAT, UK_DEFAULT_LNG };
