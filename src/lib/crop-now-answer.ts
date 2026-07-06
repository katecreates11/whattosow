import { crops, type Crop } from "@/data/crops";
import { MONTH_NAMES, MONTH_SLUGS } from "@/lib/calendar";

const MS_WEEK = 7 * 24 * 60 * 60 * 1000;
const MS_DAY = 24 * 60 * 60 * 1000;
const LAST_CHANCE_DAYS = 14;
const PLANT_OUT_LEAD_WEEKS = 3;
const PLANT_OUT_TAIL_WEEKS = 6;

export type AnswerState = "too-early" | "good-time" | "last-chance" | "too-late";
type Action = "sow indoors" | "direct sow" | "plant out" | "wait";
export type CropVerdictAction = Action | "buy young plants" | "choose another crop to sow now";

interface ActionWindow {
  action: Action;
  openAt: Date;
  closeAt: Date;
  isSowing: boolean;
}

export interface CropNowAnswer {
  state: AnswerState;
  stateLabel: string;
  action: Action;
  actionLabel: string;
  summary: string;
  windowText: string;
  practicalNote: string;
  monthLink: {
    href: string;
    label: string;
  };
  guideLink: {
    href: string;
    label: string;
  } | null;
}

export interface CropNowAlternative {
  name: string;
  href: string;
}

export interface CropVerdict {
  state: AnswerState;
  stateLabel: "Too early" | "Good time" | "Last chance" | "Too late from seed";
  action: CropVerdictAction;
  actionLabel: string;
  copy: string;
  primaryLink: {
    href: string;
    label: string;
  };
  alternativeCrops: CropNowAlternative[];
}

function addWeeks(date: Date, weeks: number): Date {
  return new Date(date.getTime() + weeks * MS_WEEK);
}

function daysBetween(from: Date, to: Date): number {
  return Math.ceil((to.getTime() - from.getTime()) / MS_DAY);
}

export function frostOffsetText(weeks: number): string {
  const absWeeks = Math.abs(weeks);
  const unit = absWeeks === 1 ? "week" : "weeks";

  if (weeks < 0) return `${absWeeks} ${unit} before your last frost date`;
  if (weeks === 0) return "around your last frost date";
  return `${absWeeks} ${unit} after your last frost date`;
}

function monthName(date: Date): string {
  return MONTH_NAMES[date.getMonth()];
}

function monthHref(date: Date): string {
  return `/sow/${MONTH_SLUGS[date.getMonth()]}`;
}

function monthRange(openAt: Date, closeAt: Date): string {
  const start = monthName(openAt);
  const end = monthName(closeAt);
  return start === end ? start : `${start} to ${end}`;
}

function labelForAction(action: Action): string {
  switch (action) {
    case "sow indoors":
      return "Sow indoors";
    case "direct sow":
      return "Direct sow outdoors";
    case "plant out":
      return "Plant out";
    case "wait":
      return "Wait";
  }
}

function labelForVerdictAction(action: CropVerdictAction): string {
  switch (action) {
    case "buy young plants":
      return "Buy young plants";
    case "choose another crop to sow now":
      return "Choose another crop to sow now";
    default:
      return labelForAction(action);
  }
}

function currentMonthLink(now: Date) {
  return {
    href: monthHref(now),
    label: `what to sow in ${monthName(now)}`,
  };
}

function windowMonthLink(window: ActionWindow) {
  return {
    href: monthHref(window.openAt),
    label: `what to sow in ${monthName(window.openAt)}`,
  };
}

function currentMonthCallToAction(now: Date) {
  return {
    href: monthHref(now),
    label: `See what to sow in ${monthName(now)}`,
  };
}

function sowingCloseAt(crop: Crop, openAt: Date, frostDate: Date): Date {
  const autumnFrost = new Date(frostDate.getFullYear(), 9, 25);
  const latestByHarvest = new Date(autumnFrost.getTime() - crop.harvestWeeks * MS_WEEK);
  const normalClose = crop.successionWeeks == null ? addWeeks(openAt, 4) : latestByHarvest;
  return new Date(Math.min(normalClose.getTime(), latestByHarvest.getTime()));
}

function windowsForFrostYear(crop: Crop, year: number): ActionWindow[] {
  const frostDate = new Date(year, 3, 15);
  const windows: ActionWindow[] = [];

  if (crop.sowIndoorsWeeks !== null) {
    const openAt = addWeeks(frostDate, crop.sowIndoorsWeeks);
    windows.push({
      action: "sow indoors",
      openAt,
      closeAt: sowingCloseAt(crop, openAt, frostDate),
      isSowing: true,
    });
  }

  if (crop.directSowWeeks !== null) {
    const openAt = addWeeks(frostDate, crop.directSowWeeks);
    windows.push({
      action: "direct sow",
      openAt,
      closeAt: sowingCloseAt(crop, openAt, frostDate),
      isSowing: true,
    });
  }

  if (crop.plantOutWeeks !== null) {
    const idealPlantOut = addWeeks(frostDate, crop.plantOutWeeks);
    windows.push({
      action: "plant out",
      openAt: addWeeks(idealPlantOut, -PLANT_OUT_LEAD_WEEKS),
      closeAt: addWeeks(idealPlantOut, PLANT_OUT_TAIL_WEEKS),
      isSowing: false,
    });
  }

  return windows;
}

function cropWindows(crop: Crop, now: Date): ActionWindow[] {
  const year = now.getFullYear();
  return [year, year + 1]
    .flatMap((windowYear) => windowsForFrostYear(crop, windowYear))
    .sort((a, b) => a.openAt.getTime() - b.openAt.getTime());
}

function chooseActiveSowingWindow(windows: ActionWindow[], now: Date): ActionWindow | null {
  const active = windows.filter(
    (window) => window.isSowing && now >= window.openAt && now <= window.closeAt
  );

  if (active.length === 0) return null;

  return active.sort((a, b) => {
    if (a.action !== b.action) {
      if (a.action === "direct sow") return -1;
      if (b.action === "direct sow") return 1;
    }
    return a.closeAt.getTime() - b.closeAt.getTime();
  })[0];
}

function chooseActivePlantOutWindow(windows: ActionWindow[], now: Date): ActionWindow | null {
  const active = windows.filter(
    (window) => window.action === "plant out" && now >= window.openAt && now <= window.closeAt
  );

  if (active.length === 0) return null;
  return active.sort((a, b) => a.closeAt.getTime() - b.closeAt.getTime())[0];
}

function nextSowingWindow(windows: ActionWindow[], now: Date): ActionWindow | null {
  return windows.find((window) => window.isSowing && window.openAt > now) ?? null;
}

function previousSowingWindow(windows: ActionWindow[], now: Date): ActionWindow | null {
  return (
    windows
      .filter((window) => window.isSowing && window.closeAt < now)
      .sort((a, b) => b.closeAt.getTime() - a.closeAt.getTime())[0] ?? null
  );
}

function guideForCrop(crop: Crop): CropNowAnswer["guideLink"] {
  if (crop.slug === "tomatoes") {
    return { href: "/guides/growing-tomatoes-outdoors-vs-greenhouse", label: "tomato growing guide" };
  }

  if (["courgettes", "squash", "pumpkins", "cucumbers"].includes(crop.slug)) {
    return { href: "/guides/growing-squash-pumpkins-courgettes", label: "squash and courgette guide" };
  }

  if (["onion-sets", "garlic", "leeks", "spring-onions"].includes(crop.slug)) {
    return { href: "/guides/growing-onions-garlic-leeks", label: "onion, garlic and leek guide" };
  }

  if (["broccoli", "cabbage", "cauliflower", "brussels-sprouts", "kale"].includes(crop.slug)) {
    return { href: "/guides/growing-brassicas", label: "brassica growing guide" };
  }

  if (crop.liftFromSoil) {
    return { href: "/guides/growing-root-vegetables", label: "root vegetable guide" };
  }

  if (["strawberries", "raspberries", "blackberries", "gooseberries", "blackcurrants", "redcurrants", "rhubarb"].includes(crop.slug)) {
    return { href: "/guides/growing-fruit", label: "fruit growing guide" };
  }

  if (crop.sowIndoorsWeeks !== null) {
    return { href: "/guides/seed-starting", label: "seed starting guide" };
  }

  return null;
}

function practicalNote(crop: Crop, action: Action, state: AnswerState, window: ActionWindow | null): string {
  if (action === "direct sow") {
    return state === "last-chance"
      ? `Sow a small row now, water the drill first if the soil is dry, and choose the quickest ${crop.name.toLowerCase()} variety you have.`
      : `Sow direct into prepared soil now, then keep the row evenly damp while seedlings get going.`;
  }

  if (action === "sow indoors") {
    return state === "last-chance"
      ? `Start a small batch now and keep it bright; this is not the moment for a slow, oversized sowing.`
      : `Start seeds indoors somewhere bright, then harden plants off before they move outside.`;
  }

  if (action === "plant out") {
    return `Skip seed-starting now; plant out sturdy young plants on a damp evening and water them in well.`;
  }

  if (state === "too-early" && window) {
    return `Hold off until ${monthName(window.openAt).toLowerCase()}; sowing earlier is more likely to make weak plants than earlier harvests.`;
  }

  if (window) {
    return `Leave seed sowing for the next window in ${monthName(window.openAt).toLowerCase()}; for now, use the space for crops that are still in season.`;
  }

  return `This is not a good sowing moment on the UK average; use the calendar to choose a crop with an open window.`;
}

export function getCropNowAnswer(crop: Crop, now: Date = new Date()): CropNowAnswer {
  const windows = cropWindows(crop, now);
  const activeSowing = chooseActiveSowingWindow(windows, now);
  const activePlantOut = chooseActivePlantOutWindow(windows, now);

  if (activeSowing) {
    const daysLeft = daysBetween(now, activeSowing.closeAt);
    const state: AnswerState = daysLeft <= LAST_CHANCE_DAYS ? "last-chance" : "good-time";
    const actionLabel = labelForAction(activeSowing.action);

    return {
      state,
      stateLabel: state === "last-chance" ? "Last chance" : "Good time",
      action: activeSowing.action,
      actionLabel,
      summary:
        state === "last-chance"
          ? `Yes, but do it soon. On the UK average, ${crop.name.toLowerCase()} are near the end of their ${activeSowing.action} window.`
          : `Yes. On the UK average, this is a good time to ${activeSowing.action === "direct sow" ? "direct sow outdoors" : "sow indoors"}.`,
      windowText: `${actionLabel}: ${monthRange(activeSowing.openAt, activeSowing.closeAt)}`,
      practicalNote: practicalNote(crop, activeSowing.action, state, activeSowing),
      monthLink: currentMonthLink(now),
      guideLink: guideForCrop(crop),
    };
  }

  if (activePlantOut) {
    const daysLeft = daysBetween(now, activePlantOut.closeAt);
    const stateLabel =
      daysLeft <= LAST_CHANCE_DAYS ? "Past seed window; last chance to plant out" : "Past seed window; plant out";

    return {
      state: "too-late",
      stateLabel,
      action: "plant out",
      actionLabel: "Plant out",
      summary: `The seed-starting window for ${crop.name.toLowerCase()} has passed on the UK average, but you can still plant out sturdy young plants.`,
      windowText: `Plant out: ${monthRange(activePlantOut.openAt, activePlantOut.closeAt)}`,
      practicalNote: practicalNote(crop, "plant out", "too-late", activePlantOut),
      monthLink: currentMonthLink(now),
      guideLink: guideForCrop(crop),
    };
  }

  const next = nextSowingWindow(windows, now);
  const previous = previousSowingWindow(windows, now);
  const isTooEarly = Boolean(next && (!previous || next.openAt.getTime() - now.getTime() < now.getTime() - previous.closeAt.getTime()));

  if (next && isTooEarly) {
    return {
      state: "too-early",
      stateLabel: "Too early",
      action: "wait",
      actionLabel: "Wait",
      summary: `Not yet. On the UK average, ${crop.name.toLowerCase()} are usually started in ${monthName(next.openAt).toLowerCase()}.`,
      windowText: `${labelForAction(next.action)}: ${monthRange(next.openAt, next.closeAt)}`,
      practicalNote: practicalNote(crop, "wait", "too-early", next),
      monthLink: windowMonthLink(next),
      guideLink: guideForCrop(crop),
    };
  }

  const nextForLate = next ?? null;

  return {
    state: "too-late",
    stateLabel: "Too late from seed",
    action: "wait",
    actionLabel: "Wait",
    summary: nextForLate
      ? `Not from seed now. On the UK average, the usual ${crop.name.toLowerCase()} sowing window has passed.`
      : `Not from seed now. This is outside the usual UK sowing window for ${crop.name.toLowerCase()}.`,
    windowText: previous
      ? `${labelForAction(previous.action)}: ${monthRange(previous.openAt, previous.closeAt)}`
      : "Outside the usual UK sowing window",
    practicalNote: practicalNote(crop, "wait", "too-late", nextForLate),
    monthLink: nextForLate ? windowMonthLink(nextForLate) : currentMonthLink(now),
    guideLink: guideForCrop(crop),
  };
}

export function getSowNowAlternatives(
  currentCropSlug: string,
  now: Date = new Date(),
  limit = 3
): CropNowAlternative[] {
  return crops
    .filter((crop) => crop.slug !== currentCropSlug)
    .map((crop) => {
      const activeSowing = chooseActiveSowingWindow(cropWindows(crop, now), now);
      return activeSowing
        ? {
            crop,
            closeAt: activeSowing.closeAt,
          }
        : null;
    })
    .filter((entry): entry is { crop: Crop; closeAt: Date } => entry !== null)
    .sort((a, b) => a.closeAt.getTime() - b.closeAt.getTime() || a.crop.name.localeCompare(b.crop.name))
    .slice(0, limit)
    .map(({ crop }) => ({
      name: crop.name,
      href: `/crops/${crop.slug}`,
    }));
}

export function getCropVerdict(crop: Crop, now: Date = new Date()): CropVerdict {
  const answer = getCropNowAnswer(crop, now);
  const currentMonthLink = currentMonthCallToAction(now);
  const alternatives = answer.state === "too-late" ? getSowNowAlternatives(crop.slug, now) : [];
  const cropName = crop.name.toLowerCase();
  const stateLabel: CropVerdict["stateLabel"] =
    answer.state === "too-early"
      ? "Too early"
      : answer.state === "good-time"
        ? "Good time"
        : answer.state === "last-chance"
          ? "Last chance"
          : "Too late from seed";

  if (answer.state === "too-early") {
    return {
      state: answer.state,
      stateLabel,
      action: "wait",
      actionLabel: labelForVerdictAction("wait"),
      copy: `Not yet, and that is fine. On the UK average, ${cropName} usually start in ${answer.monthLink.label.replace("what to sow in ", "")}; waiting gives stronger plants.`,
      primaryLink: {
        href: answer.monthLink.href,
        label: `Plan for ${answer.monthLink.label.replace("what to sow in ", "")}`,
      },
      alternativeCrops: [],
    };
  }

  if (answer.state === "good-time" || answer.state === "last-chance") {
    return {
      state: answer.state,
      stateLabel,
      action: answer.action,
      actionLabel: labelForVerdictAction(answer.action),
      copy:
        answer.state === "last-chance"
          ? `Yes, but do it soon. The UK average window for ${cropName} is closing, so keep the sowing small and choose a quick variety if you have one.`
          : `Yes. The UK average window is open now, so ${answer.action === "direct sow" ? "direct sow outdoors" : "sow indoors"} while the soil and season are on your side.`,
      primaryLink: currentMonthLink,
      alternativeCrops: [],
    };
  }

  if (answer.action === "plant out") {
    return {
      state: answer.state,
      stateLabel,
      action: "buy young plants",
      actionLabel: labelForVerdictAction("buy young plants"),
      copy: `The UK-average seed-starting window for ${cropName} has passed. Buy sturdy young plants, or plant out your own if they are ready.`,
      primaryLink: currentMonthLink,
      alternativeCrops: alternatives,
    };
  }

  return {
    state: answer.state,
    stateLabel,
    action: "choose another crop to sow now",
    actionLabel: labelForVerdictAction("choose another crop to sow now"),
    copy: `Not from seed now. A sowing started today is unlikely to beat the autumn cold; use this page if you are already growing ${cropName}, or choose something still in season.`,
    primaryLink: currentMonthLink,
    alternativeCrops: alternatives,
  };
}
