import { crops, type Crop } from "@/data/crops";
import { MONTH_NAMES, MONTH_SLUGS } from "@/lib/calendar";
import { type CropEntry, type SowState } from "@/lib/season-core";
import { varietyCounts } from "@/data/variety-counts";
import {
  cropWindows,
  daysBetween,
  hasActiveSowingWindow,
  ukAverageFrost,
  windowsForCropYear,
} from "@/lib/crop-windows";

const CLOSING_DAYS = 12;
const AVOID_PRIORITY = new Map(
  ["tomatoes", "peppers", "chillies", "aubergine", "sweetcorn", "pumpkins", "courgettes", "basil"].map(
    (slug, index) => [slug, index]
  )
);

type MonthSlug = (typeof MONTH_SLUGS)[number];
type MonthName = (typeof MONTH_NAMES)[number];
type AvoidReasonKind = "too-late-from-seed" | "wait-for-window";
type SowingMethod = "direct sow" | "sow indoors";

export interface AvoidSowingEntry {
  crop: Crop;
  reasonKind: AvoidReasonKind;
  reason: string;
  nextMonthSlug: MonthSlug | null;
  nextMonthName: MonthName | null;
}

interface ScoredAvoidSowingEntry extends AvoidSowingEntry {
  score: number;
}

export interface ServerSeasonalAnswer {
  now: Date;
  monthIndex: number;
  monthName: string;
  monthSlug: string;
  frostDate: Date;
  sowNow: CropEntry[];
  startIndoors: CropEntry[];
  sowOutdoors: CropEntry[];
  plantOutNow: CropEntry[];
  avoidSowingNow: AvoidSowingEntry[];
}

function cropEntry(crop: Crop, method: SowingMethod, daysLeft: number, no: number): CropEntry {
  const state: SowState = daysLeft <= CLOSING_DAYS ? "closing" : "now";
  return {
    crop,
    no,
    varietyCount: varietyCounts[crop.slug] ?? 0,
    status: {
      state,
      method,
      daysLeft,
      label:
        state === "closing"
          ? `${method} now · ${daysLeft} day${daysLeft === 1 ? "" : "s"} left`
          : `${method} now`,
    },
  };
}

function activeSowingEntries(method: SowingMethod, frostDate: Date, now: Date): CropEntry[] {
  return crops
    .flatMap((crop, index) =>
      cropWindows(crop, now, frostDate)
        .filter((window) => window.action === method && now >= window.openAt && now <= window.closeAt)
        .map((window) =>
          cropEntry(crop, method, daysBetween(now, window.closeAt), index + 1)
        )
    )
    .sort((a, b) => {
      const stateA = a.status.state === "closing" ? 0 : 1;
      const stateB = b.status.state === "closing" ? 0 : 1;
      if (stateA !== stateB) return stateA - stateB;
      return (a.status.daysLeft ?? 9999) - (b.status.daysLeft ?? 9999);
    });
}

function activePlantOutEntries(frostDate: Date, now: Date): CropEntry[] {
  return crops
    .flatMap((crop, index) => {
      const window = cropWindows(crop, now, frostDate).find(
        (entry) => entry.action === "plant out" && now >= entry.openAt && now <= entry.closeAt
      );
      if (!window) return [];
      const daysLeft = daysBetween(now, window.closeAt);
      const state: SowState = daysLeft <= CLOSING_DAYS ? "closing" : "now";
      const activelySowable = hasActiveSowingWindow(crop, now, frostDate);
      const label = crop.slug === "pumpkins" && window.plantOutPhase === "late"
        ? "a gamble now"
        : window.plantOutPhase === "late" && !activelySowable
          ? "late plant out"
          : activelySowable
            ? "plant out now"
            : "ready to plant out";
      return [
        {
          crop,
          no: index + 1,
          varietyCount: varietyCounts[crop.slug] ?? 0,
          status: {
            state,
            method: "plant out",
            daysLeft,
            label: state === "closing" ? `last chance · ${daysLeft}d` : label,
          },
        },
      ];
    })
    .sort((a, b) => (a.status.daysLeft ?? 9999) - (b.status.daysLeft ?? 9999));
}

function uniqueByCrop(entries: CropEntry[]): CropEntry[] {
  const best = new Map<string, CropEntry>();
  for (const entry of entries) {
    const current = best.get(entry.crop.slug);
    if (!current || (entry.status.daysLeft ?? 9999) < (current.status.daysLeft ?? 9999)) {
      best.set(entry.crop.slug, entry);
    }
  }
  return Array.from(best.values());
}

function monthFromTime(value: Date | number) {
  const month = new Date(value).getMonth();
  return { slug: MONTH_SLUGS[month], name: MONTH_NAMES[month] };
}

function nextYearFrostDate(frostDate: Date) {
  return new Date(frostDate.getFullYear() + 1, frostDate.getMonth(), frostDate.getDate());
}

function avoidSowingEntries(frostDate: Date, now: Date, activeSlugs: Set<string>): AvoidSowingEntry[] {
  return crops
    .filter((crop) => !activeSlugs.has(crop.slug))
    .map((crop): ScoredAvoidSowingEntry | null => {
      const currentYearWindows = windowsForCropYear(crop, frostDate).filter((window) => window.isSowing);
      const nextYearWindows = windowsForCropYear(crop, nextYearFrostDate(frostDate)).filter((window) => window.isSowing);
      const windows = [...currentYearWindows, ...nextYearWindows];
      const previous = currentYearWindows
        .filter((window) => window.closeAt < now)
        .sort((a, b) => b.closeAt.getTime() - a.closeAt.getTime())[0];
      const next = windows
        .filter((window) => window.openAt > now)
        .sort((a, b) => a.openAt.getTime() - b.openAt.getTime())[0];

      if (previous && (!next || now.getTime() - previous.closeAt.getTime() < next.openAt.getTime() - now.getTime())) {
        return {
          crop,
          reasonKind: "too-late-from-seed",
          reason: "too late from seed this week",
          nextMonthSlug: next ? monthFromTime(next.openAt).slug : null,
          nextMonthName: next ? monthFromTime(next.openAt).name : null,
          score: (AVOID_PRIORITY.get(crop.slug) ?? 100) * 1000 + daysBetween(previous.closeAt, now),
        };
      }

      if (next) {
        const nextMonth = monthFromTime(next.openAt);
        return {
          crop,
          reasonKind: "wait-for-window",
          reason: `wait until ${nextMonth.name.toLowerCase()}`,
          nextMonthSlug: nextMonth.slug,
          nextMonthName: nextMonth.name,
          score: daysBetween(now, next.openAt),
        };
      }

      return null;
    })
    .filter((entry): entry is ScoredAvoidSowingEntry => Boolean(entry))
    .sort((a, b) => a.score - b.score)
    .slice(0, 6)
    .map((entry) => ({
      crop: entry.crop,
      reasonKind: entry.reasonKind,
      reason: entry.reason,
      nextMonthSlug: entry.nextMonthSlug,
      nextMonthName: entry.nextMonthName,
    }));
}

export function getServerSeasonalAnswer(now: Date = new Date()): ServerSeasonalAnswer {
  const frostDate = ukAverageFrost(now);
  const startIndoors = activeSowingEntries("sow indoors", frostDate, now);
  const sowOutdoors = activeSowingEntries("direct sow", frostDate, now);
  const plantOutNow = activePlantOutEntries(frostDate, now);
  const sowNow = uniqueByCrop([...sowOutdoors, ...startIndoors]).sort(
    (a, b) => (a.status.daysLeft ?? 9999) - (b.status.daysLeft ?? 9999)
  );
  const activeSlugs = new Set(sowNow.map((entry) => entry.crop.slug));

  const monthIndex = now.getMonth();
  return {
    now,
    monthIndex,
    monthName: MONTH_NAMES[monthIndex],
    monthSlug: MONTH_SLUGS[monthIndex],
    frostDate,
    sowNow,
    startIndoors,
    sowOutdoors,
    plantOutNow,
    avoidSowingNow: avoidSowingEntries(frostDate, now, activeSlugs),
  };
}
