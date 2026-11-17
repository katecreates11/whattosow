/**
 * The sentences of the postcode Answer — where the weather brain speaks.
 *
 * The brain knows a lot (nights, soil, a decade of frosts). The Answer is
 * allowed to say very little: one greeting, one interpretation, one whispered
 * line of provenance. Everything here is a pure function of plain inputs so
 * the copy can be tested for every week of the year without a browser.
 *
 * Voice rules (docs/COPY_REWRITES.md): verdict first, then the instruction;
 * plain observation; never personify the weather; no exclamation marks.
 */

import type { NightLow } from "@/lib/weather-brain";

export type SeasonPhase = "before-last-frost" | "open" | "closing" | "frost-season";

const DAY_MS = 24 * 60 * 60 * 1000;
/** The season is "closing" in the six weeks before the first autumn frost can come. */
const CLOSING_DAYS = 42;
/** Soil temperature matters most from late winter until the soil has settled warm. */
const SOIL_WATCH_DAYS_AFTER_FROST = 45;
/**
 * Soil-warmth tiers, matching getMinSoilTemp() in data/crops.ts: hardy seed
 * moves from about 5°C, half-hardy from 8°C, tender from 12°C.
 */
export const SOIL_HARDY_MIN_C = 5;
export const SOIL_HALF_HARDY_MIN_C = 8;
export const SOIL_TENDER_MIN_C = 12;

export interface AnswerSeason {
  phase: SeasonPhase;
  /** Whole days until the last spring frost date (negative once it has passed). */
  daysToLastFrost: number;
  /** Whole days until the first autumn frost date (negative once it has passed). */
  daysToAutumnFrost: number;
}

/**
 * Where in the frost year `now` falls. `lastFrost` is this year's last spring
 * frost date, or next year's once this autumn's frost date has passed (which is
 * how calculateFrostData hands it over).
 */
export function answerSeason(now: Date, lastFrost: Date, firstAutumnFrost: Date): AnswerSeason {
  const daysToLastFrost = Math.ceil((lastFrost.getTime() - now.getTime()) / DAY_MS);
  const daysToAutumnFrost = Math.ceil((firstAutumnFrost.getTime() - now.getTime()) / DAY_MS);

  let phase: SeasonPhase;
  if (daysToAutumnFrost < 0) phase = "frost-season";
  else if (daysToLastFrost > 0) phase = "before-last-frost";
  else if (daysToAutumnFrost <= CLOSING_DAYS) phase = "closing";
  else phase = "open";

  return { phase, daysToLastFrost, daysToAutumnFrost };
}

function plainDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

function shortDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

const NUMBER_WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
function inWords(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

function weeksPhrase(days: number): string {
  const weeks = Math.max(1, Math.round(days / 7));
  return weeks === 1 ? "about a week" : `about ${inWords(weeks)} weeks`;
}

/** "−1°", "0°", "6°" — a true minus sign, and never "-0". */
export function degrees(value: number): string {
  const rounded = Math.round(value);
  return rounded < 0 ? `−${Math.abs(rounded)}°` : `${Math.abs(rounded)}°`;
}

export interface GreetingInput {
  place: string;
  now: Date;
  lastFrost: Date;
  firstAutumnFrost: Date;
  growingSeasonDays: number;
}

/** The Answer's headline: recognition, then one interpreted fact about this place's frost year. */
export function answerGreeting(input: GreetingInput): string {
  const { place, now, lastFrost, firstAutumnFrost, growingSeasonDays } = input;
  const season = answerSeason(now, lastFrost, firstAutumnFrost);
  const lead = `Growing in ${place}, then — `;
  const gone = `your last frost is usually gone by ${plainDate(lastFrost)}`;

  switch (season.phase) {
    case "before-last-frost":
      return season.daysToLastFrost <= 10
        ? `${lead}${gone}, only days off now.`
        : `${lead}${gone}, ${weeksPhrase(season.daysToLastFrost)} off.`;
    case "closing":
      return `${lead}your first frost can come from ${plainDate(firstAutumnFrost)}, so the season has ${weeksPhrase(season.daysToAutumnFrost)} left.`;
    case "frost-season":
      return `${lead}frost can come any night from now until around ${plainDate(lastFrost)}.`;
    case "open":
    default:
      if (growingSeasonDays >= 190) return `${lead}${gone}, so tender crops get a fair run.`;
      if (growingSeasonDays <= 160) return `${lead}${gone}, so the season asks for a little patience.`;
      return `${lead}${gone}, so the season's properly open.`;
  }
}

export interface InterpretationInput {
  now: Date;
  lastFrost: Date;
  firstAutumnFrost: Date;
  growingSeasonDays: number;
  /** The coming nights from the weather brain; omit or empty when the weather isn't answering. */
  nights?: NightLow[];
  /** Soil temperature at seed depth (°C), when known. */
  soilTemp?: number | null;
  /**
   * The crops this Answer is telling the gardener to sow straight outdoors,
   * with the soil temperature each needs (getMinSoilTemp). Lets the soil
   * sentence talk about the list on the page, not seed in general.
   */
  directSow?: { name: string; minSoilTemp: number }[];
}

function nameList(names: string[]): string {
  const shown = names.slice(0, 2);
  return shown.join(" and ");
}

function weekday(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("en-GB", { weekday: "long" });
}

function seasonFallback(season: AnswerSeason, growingSeasonDays: number): string {
  switch (season.phase) {
    case "before-last-frost":
      return "Hardy sowings can start under cover now; tender ones wait until the frost has passed.";
    case "closing":
      return "Quick crops and overwintering sowings are the ones worth starting now.";
    case "frost-season":
      return "The sowing list is short in the cold months, and that's as it should be.";
    case "open":
    default:
      if (growingSeasonDays >= 190) {
        return "Keep tender crops moving while the soil is warm; this is the kind stretch they like.";
      }
      if (growingSeasonDays <= 160) {
        return "Hardy sowings can get on with it now; tender things still appreciate a little shelter while they settle.";
      }
      return "Hardy things can get on with it, and tender crops are happiest now the soil has warmed.";
  }
}

/**
 * The Answer's second sentence: what tonight and this week mean for this
 * garden. Frost always speaks first; then, in spring, the soil; otherwise the
 * season. Falls back to a season-only line when there is no weather.
 */
export function answerInterpretation(input: InterpretationInput): string {
  const { now, lastFrost, firstAutumnFrost, growingSeasonDays } = input;
  const season = answerSeason(now, lastFrost, firstAutumnFrost);
  const nights = input.nights ?? [];

  if (nights.length === 0) return seasonFallback(season, growingSeasonDays);

  const tonight = nights[0];
  if (tonight.frostRisk) {
    const verdict =
      tonight.min <= 0
        ? `A frost tonight, down to ${degrees(tonight.min)}.`
        : `Down to ${degrees(tonight.min)} tonight, cold enough for frost on the ground.`;
    return `${verdict} Fleece anything tender, or bring the pots in.`;
  }

  const later = nights.slice(1).find((night) => night.frostRisk);
  if (later) {
    return `No frost tonight, but ${weekday(later.date)} night drops to ${degrees(later.min)}. Keep the fleece handy.`;
  }

  const soil = input.soilTemp;
  if (typeof soil === "number") {
    const reading = `The soil is ${degrees(soil)} at seed depth`;
    const direct = input.directSow ?? [];
    const ready = direct.filter((crop) => soil >= crop.minSoilTemp).map((crop) => crop.name);
    const cold = direct.filter((crop) => soil < crop.minSoilTemp).map((crop) => crop.name);

    // The calendar says sow and the soil says wait: always worth saying, any month.
    if (cold.length > 0) {
      return ready.length > 0
        ? `${reading} — warm enough for ${nameList(ready)}, not yet for ${nameList(cold)}.`
        : `${reading}, still too cold for ${nameList(cold)} — a few days' wait costs nothing.`;
    }

    const soilMatters =
      season.phase === "before-last-frost" ||
      (season.phase === "open" && -season.daysToLastFrost <= SOIL_WATCH_DAYS_AFTER_FROST);
    if (soilMatters) {
      if (ready.length > 0) return `${reading} — warm enough to sow ${nameList(ready)} straight out.`;
      if (soil < SOIL_HARDY_MIN_C) {
        return `${reading}. Even hardy seed wants ${SOIL_HARDY_MIN_C}° before it moves, so anything sown outdoors this week will be slow — a few days' wait costs nothing.`;
      }
      if (soil < SOIL_HALF_HARDY_MIN_C) {
        return `${reading} — warm enough for hardy sowings. Beans and squash want it warmer.`;
      }
      if (soil < SOIL_TENDER_MIN_C) {
        return `${reading} — warm enough for most sowings. The tender crops want ${SOIL_TENDER_MIN_C}°.`;
      }
      return `${reading} — warm enough for everything, tender crops included.`;
    }
  }

  if (season.phase === "open") return seasonFallback(season, growingSeasonDays);

  const lowest = Math.min(...nights.map((night) => night.min));
  const clear = `No frost in the next ${inWords(nights.length)} night${nights.length === 1 ? "" : "s"} — the lowest is ${degrees(lowest)}.`;
  if (season.phase === "before-last-frost") {
    return `${clear} Seedlings hardening off can stay out.`;
  }
  return `${clear} Anything tender still outside is safe for now.`;
}

export interface ProvenanceInput {
  place: string;
  now: Date;
  lastFrost: Date;
  firstAutumnFrost: Date;
  /** From describeLocalFrost(). */
  source: "record" | "model";
  years: number;
  elevation: number | null;
  latestLastFrost: Date | null;
  earliestFirstFrost: Date | null;
}

/**
 * The whispered line under the Answer: where these dates came from. Only shown
 * once the place's own frost record is in hand — the model doesn't get a
 * credit it hasn't earned. Returns null when there is nothing true to say.
 */
export function answerProvenance(input: ProvenanceInput): string | null {
  if (input.source !== "record" || input.years < 5) return null;
  const season = answerSeason(input.now, input.lastFrost, input.firstAutumnFrost);

  const parts = [`worked from ${inWords(input.years)} years of frosts around ${input.place}`];
  if (input.elevation !== null) parts.push(`${input.elevation} m up`);

  const autumnSide = season.phase === "closing" || (season.phase === "open" && season.daysToAutumnFrost <= 90);
  if (autumnSide && input.earliestFirstFrost) {
    parts.push(`earliest autumn frost ${shortDate(input.earliestFirstFrost)}`);
  } else if (input.latestLastFrost) {
    parts.push(`latest spring frost ${shortDate(input.latestLastFrost)}`);
  }
  return parts.join(" · ");
}

/** The outdoor year is "quiet" this far, or further, ahead of the last frost. */
const INDOOR_LINE_DAYS_BEFORE_FROST = 56;

/**
 * Indoors is always in season. The Answer says so when the outdoor list is at
 * its shortest — through the frost season, in the weeks before spring gets
 * going, and whenever there is nothing at all to sow outside — so that "what
 * can I sow now?" has a true answer in every week of the year.
 */
export function showIndoorSowing(now: Date, lastFrost: Date, firstAutumnFrost: Date, outdoorListLength: number): boolean {
  if (outdoorListLength === 0) return true;
  const season = answerSeason(now, lastFrost, firstAutumnFrost);
  if (season.phase === "frost-season") return true;
  return season.phase === "before-last-frost" && season.daysToLastFrost > INDOOR_LINE_DAYS_BEFORE_FROST;
}

export interface ListWeather {
  /** Soil temperature at seed depth (°C). */
  soilTemp?: number | null;
  /** The coming nights, tonight first (from the weather brain). */
  nights?: NightLow[];
}

export interface ListItem {
  /** How the Answer list is sowing it. */
  method: "direct sow" | "start in modules" | "plant out" | string;
  /** getMinSoilTemp(crop). */
  minSoilTemp: number;
  category: "hardy" | "half-hardy" | "tender";
}

/**
 * The weather's word on one line of the Answer list: null when the calendar
 * and the sky agree, or a short instruction when they don't.
 *
 *  - Sowing outdoors into soil below what the seed needs: wait for the soil.
 *  - Planting out anything frost-tender with a frost due this week: wait
 *    until the night after the last frost in the forecast.
 *
 * Hardy plant-outs and indoor sowings never wait on the weather here.
 */
export function weatherHold(item: ListItem, weather: ListWeather): string | null {
  const soil = weather.soilTemp;
  if (item.method === "direct sow" && typeof soil === "number" && soil < item.minSoilTemp) {
    return `when soil reaches ${item.minSoilTemp}°`;
  }
  if (item.method === "plant out" && item.category !== "hardy") {
    const frosts = (weather.nights ?? []).filter((night) => night.frostRisk);
    if (frosts.length > 0) {
      const last = frosts[frosts.length - 1];
      return `after ${weekday(last.date)}\u2019s frost`;
    }
  }
  return null;
}
