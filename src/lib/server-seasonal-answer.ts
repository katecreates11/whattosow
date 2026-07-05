import { crops, type Crop } from "@/data/crops";
import { MONTH_NAMES, MONTH_SLUGS } from "@/lib/calendar";
import { ukAverageFrost, type CropEntry, type SowState } from "@/lib/season-core";
import { varietyCounts } from "@/data/variety-counts";

const MS_WEEK = 7 * 24 * 60 * 60 * 1000;
const MS_DAY = 24 * 60 * 60 * 1000;
const CLOSING_DAYS = 12;
const PLANT_OUT_LEAD = 3 * MS_WEEK;
const PLANT_OUT_TAIL = 12 * MS_WEEK;
const AVOID_PRIORITY = new Map(
  ["tomatoes", "peppers", "chillies", "aubergine", "sweetcorn", "pumpkins", "courgettes", "basil"].map(
    (slug, index) => [slug, index]
  )
);

type MonthSlug = (typeof MONTH_SLUGS)[number];
type MonthName = (typeof MONTH_NAMES)[number];

export interface AvoidSowingEntry {
  crop: Crop;
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

type SowingMethod = "direct sow" | "sow indoors";

interface SowingWindow {
  crop: Crop;
  method: SowingMethod;
  openAt: number;
  closeAt: number;
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

function windowsForCrop(crop: Crop, frostDate: Date): SowingWindow[] {
  const autumnFrost = new Date(frostDate.getFullYear(), 9, 25);
  const latestByHarvest = autumnFrost.getTime() - crop.harvestWeeks * MS_WEEK;
  const closeFor = (openAt: number) =>
    crop.successionWeeks != null ? latestByHarvest : Math.min(openAt + 4 * MS_WEEK, latestByHarvest);

  const windows: SowingWindow[] = [];
  if (crop.directSowWeeks !== null) {
    const openAt = frostDate.getTime() + crop.directSowWeeks * MS_WEEK;
    windows.push({ crop, method: "direct sow", openAt, closeAt: closeFor(openAt) });
  }
  if (crop.sowIndoorsWeeks !== null) {
    const openAt = frostDate.getTime() + crop.sowIndoorsWeeks * MS_WEEK;
    windows.push({ crop, method: "sow indoors", openAt, closeAt: closeFor(openAt) });
  }
  return windows;
}

function activeSowingEntries(method: SowingMethod, frostDate: Date, now: Date): CropEntry[] {
  const nowMs = now.getTime();
  return crops
    .flatMap((crop, index) =>
      windowsForCrop(crop, frostDate)
        .filter((window) => window.method === method && nowMs >= window.openAt && nowMs <= window.closeAt)
        .map((window) =>
          cropEntry(crop, method, Math.ceil((window.closeAt - nowMs) / MS_DAY), index + 1)
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
  const nowMs = now.getTime();
  return crops
    .flatMap((crop, index) => {
      if (crop.plantOutWeeks === null) return [];
      const center = frostDate.getTime() + crop.plantOutWeeks * MS_WEEK;
      if (nowMs < center - PLANT_OUT_LEAD || nowMs > center + PLANT_OUT_TAIL) return [];
      const daysLeft = Math.ceil((center + PLANT_OUT_TAIL - nowMs) / MS_DAY);
      const state: SowState = daysLeft <= CLOSING_DAYS ? "closing" : "now";
      return [
        {
          crop,
          no: index + 1,
          varietyCount: varietyCounts[crop.slug] ?? 0,
          status: {
            state,
            method: "plant out",
            daysLeft,
            label: state === "closing" ? `last chance · ${daysLeft}d` : "ready to plant out",
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

function monthFromTime(ms: number) {
  const month = new Date(ms).getMonth();
  return { slug: MONTH_SLUGS[month], name: MONTH_NAMES[month] };
}

function avoidSowingEntries(frostDate: Date, now: Date, activeSlugs: Set<string>): AvoidSowingEntry[] {
  const nowMs = now.getTime();

  return crops
    .filter((crop) => !activeSlugs.has(crop.slug))
    .map((crop): ScoredAvoidSowingEntry | null => {
      const windows = windowsForCrop(crop, frostDate);
      const previous = windows.filter((window) => window.closeAt < nowMs).sort((a, b) => b.closeAt - a.closeAt)[0];
      const next = windows.filter((window) => window.openAt > nowMs).sort((a, b) => a.openAt - b.openAt)[0];

      if (previous && (!next || nowMs - previous.closeAt < next.openAt - nowMs)) {
        return {
          crop,
          reason: "too late to start from seed now",
          nextMonthSlug: next ? monthFromTime(next.openAt).slug : null,
          nextMonthName: next ? monthFromTime(next.openAt).name : null,
          score: (AVOID_PRIORITY.get(crop.slug) ?? 100) * MS_WEEK + (nowMs - previous.closeAt),
        };
      }

      if (next) {
        const nextMonth = monthFromTime(next.openAt);
        return {
          crop,
          reason: `wait until ${nextMonth.name.toLowerCase()}`,
          nextMonthSlug: nextMonth.slug,
          nextMonthName: nextMonth.name,
          score: next.openAt - nowMs,
        };
      }

      return null;
    })
    .filter((entry): entry is ScoredAvoidSowingEntry => Boolean(entry))
    .sort((a, b) => a.score - b.score)
    .slice(0, 6)
    .map((entry) => ({
      crop: entry.crop,
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
