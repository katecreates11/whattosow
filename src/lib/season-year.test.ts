import { describe, expect, it } from "vitest";
import { crops } from "@/data/crops";
import { getCropActionMonths } from "@/lib/calendar";
import {
  addWeeks,
  autumnFrostFor,
  LATE_PLANT_OUT_TAIL_WEEKS,
  MS_DAY,
  MS_WEEK,
  PLANT_OUT_LEAD_WEEKS,
  sowingOpenAt,
  windowsForCropYear,
} from "@/lib/crop-windows";
import { inSeasonCrops, plantOutCrops } from "@/lib/season-core";

/**
 * The year, simulated. Every crop × every week × gardens from the mildest
 * coast to the coldest hill, run through the real engine. These are the
 * promises the sowing lists have to keep whatever date a visitor arrives on
 * and wherever their frost record puts them.
 */

const YEAR = 2026;
function dayOfYear(day: number, year = YEAR): Date {
  const date = new Date(year, 0);
  date.setDate(day);
  return date;
}

/** Last-spring-frost days from a mild coast (late March) to a cold hill (early June). */
const SPRING_FROST_DAYS = [85, 96, 105, 110, 119, 125, 133, 142, 156];
const WEEKS = Array.from({ length: 53 }, (_, week) => new Date(YEAR, 0, 1 + week * 7, 12));

/** The frost date the site hands the engine: next spring's, once autumn has come. */
function frostFor(now: Date, springDay: number): Date {
  return now > autumnFrostFor(dayOfYear(springDay)) ? dayOfYear(springDay, YEAR + 1) : dayOfYear(springDay);
}

describe("every week of the year, in every kind of garden", () => {
  it("builds the sowing and planting lists without contradiction", () => {
    for (const springDay of SPRING_FROST_DAYS) {
      for (const now of WEEKS) {
        const frost = frostFor(now, springDay);
        const where = `spring frost day ${springDay}, ${now.toDateString()}`;
        const sowing = inSeasonCrops(frost, now);
        const planting = plantOutCrops(frost, now);

        expect(new Set(sowing.map((e) => e.crop.slug)).size, where).toBe(sowing.length);
        expect(new Set(planting.map((e) => e.crop.slug)).size, where).toBe(planting.length);

        for (const entry of [...sowing, ...planting]) {
          expect(entry.status.daysLeft, `${entry.crop.slug}: ${where}`).toBeGreaterThanOrEqual(0);
          if (entry.status.state === "closing") {
            expect(entry.status.daysLeft, `${entry.crop.slug}: ${where}`).toBeLessThanOrEqual(12);
          }
        }
      }
    }
  });

  it("never tells anyone to sow a tender crop straight outdoors before their last frost", () => {
    for (const springDay of SPRING_FROST_DAYS) {
      for (const now of WEEKS) {
        const frost = frostFor(now, springDay);
        if (now >= frost) continue;
        const tooEarly = inSeasonCrops(frost, now).filter(
          (entry) => entry.crop.category === "tender" && entry.status.method === "direct sow"
        );
        expect(tooEarly.map((e) => e.crop.slug), `spring frost day ${springDay}, ${now.toDateString()}`).toEqual([]);
      }
    }
  });

  it("always has something to sow somewhere between March and August", () => {
    for (const springDay of SPRING_FROST_DAYS) {
      for (const now of WEEKS) {
        if (now.getMonth() < 3 || now.getMonth() > 6) continue; // April–July, even on the coldest hill
        expect(inSeasonCrops(frostFor(now, springDay), now).length, `spring frost day ${springDay}, ${now.toDateString()}`).toBeGreaterThan(0);
      }
    }
  });
});

/** Named gardens, by the day of the year their last spring frost usually goes. */
const ABERDEEN = 142; // 22 May
const BARNET = 110; // 20 April
const UK_AVERAGE = 105; // 15 April
const PENZANCE = 96; // 6 April

const crop = (slug: string) => crops.find((c) => c.slug === slug)!;
const days = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / MS_DAY);

function window(slug: string, springDay: number, action: string, pick: "first" | "last" = "last", year = YEAR) {
  const all = windowsForCropYear(crop(slug), dayOfYear(springDay, year)).filter((w) => w.action === action);
  return pick === "first" ? all[0] : all[all.length - 1];
}

describe("the UK-average garden is exactly where it was", () => {
  /** The engine as it stood before gardens got their own autumn, for the average garden. */
  function legacyWindows(c: (typeof crops)[number], frost: Date) {
    const autumn = new Date(frost.getFullYear(), 9, 25);
    const close = (open: Date) => {
      const byHarvest = autumn.getTime() - c.harvestWeeks * MS_WEEK;
      const normal = c.successionWeeks != null ? byHarvest : addWeeks(open, c.sowWindowWeeks ?? 4).getTime();
      return Math.min(normal, byHarvest);
    };
    const out: { action: string; open: number; close: number }[] = [];
    if (c.sowIndoorsWeeks !== null) {
      const open = addWeeks(frost, c.sowIndoorsWeeks);
      out.push({ action: "sow indoors", open: open.getTime(), close: close(open) });
    }
    if (c.directSowWeeks !== null) {
      const open = addWeeks(frost, c.directSowWeeks);
      out.push({ action: "direct sow", open: open.getTime(), close: close(open) });
    }
    if (c.plantOutWeeks !== null) {
      const ideal = addWeeks(frost, c.plantOutWeeks);
      out.push({
        action: "plant out",
        open: addWeeks(ideal, -PLANT_OUT_LEAD_WEEKS).getTime(),
        close: addWeeks(ideal, LATE_PLANT_OUT_TAIL_WEEKS).getTime(),
      });
    }
    return out;
  }

  it("keeps every crop's windows to the day (bar the two deliberate additions)", () => {
    const frost = new Date(YEAR, 3, 15);
    for (const c of crops) {
      const now = windowsForCropYear(c, frost).filter((w) => !(c.autumnSow && w.openAt.getMonth() >= 8));
      const before = legacyWindows(c, frost).sort((a, b) => a.open - b.open);
      expect(now.length, c.slug).toBe(before.length);
      now.forEach((w, i) => {
        // within a day: counting from October rather than April crosses a clock change
        expect(Math.abs(w.openAt.getTime() - before[i].open), `${c.slug} ${w.action} opens`).toBeLessThanOrEqual(MS_DAY);
        expect(Math.abs(w.closeAt.getTime() - before[i].close), `${c.slug} ${w.action} closes`).toBeLessThanOrEqual(MS_DAY);
      });
    }
  });

  it("keeps 25 October as its first autumn frost", () => {
    const autumn = autumnFrostFor(new Date(YEAR, 3, 15));
    expect([autumn.getMonth(), autumn.getDate()]).toEqual([9, 25]);
  });

  it("adds broad beans to the October and November pages, and changes no other month list", () => {
    const frost = new Date(YEAR, 3, 15);
    const direct = getCropActionMonths(crop("broad-beans"), frost).find((r) => r.action === "directSow")!;
    expect([...direct.months].sort((a, b) => a - b)).toEqual([1, 2, 9, 10]);
    const garlic = getCropActionMonths(crop("garlic"), frost).find((r) => r.action === "directSow")!;
    expect([...garlic.months].sort((a, b) => a - b)).toEqual([9, 10]);
  });
});

describe("autumn sowings run the right way up the country", () => {
  it("plants garlic earlier in cold gardens, not later", () => {
    const opens = (springDay: number) => window("garlic", springDay, "direct sow", "first", YEAR + 1).openAt;
    expect(opens(ABERDEEN).getTime()).toBeLessThan(opens(BARNET).getTime());
    expect(opens(BARNET).getTime()).toBeLessThan(opens(PENZANCE).getTime());
    // mid-September in the north-east, mid-October around London, later still in the far south-west
    expect(opens(ABERDEEN).getMonth()).toBe(8);
    expect(opens(BARNET).getMonth()).toBe(9);
    expect(days(opens(ABERDEEN), opens(PENZANCE))).toBeGreaterThan(30);
    expect(opens(ABERDEEN).getFullYear()).toBe(YEAR);
  });

  it("gives garlic the October-to-November run its own tip promises", () => {
    const garlic = window("garlic", UK_AVERAGE, "direct sow", "first", YEAR + 1);
    expect([garlic.openAt.getMonth(), garlic.openAt.getDate()]).toEqual([9, 15]);
    expect(days(garlic.openAt, garlic.closeAt)).toBe(42);
  });

  it("offers overwintering broad beans in autumn as well as the spring sowing", () => {
    const sowings = windowsForCropYear(crop("broad-beans"), dayOfYear(UK_AVERAGE, YEAR + 1)).filter(
      (w) => w.action === "direct sow"
    );
    expect(sowings).toHaveLength(2);
    const [autumn, spring] = sowings;
    expect([autumn.openAt.getFullYear(), autumn.openAt.getMonth()]).toEqual([YEAR, 9]);
    expect(autumn.closeAt.getMonth()).toBe(10);
    expect(spring.openAt.getMonth()).toBe(1);

    const inNovember = inSeasonCrops(dayOfYear(UK_AVERAGE, YEAR + 1), new Date(YEAR, 10, 5, 12)).map((e) => e.crop.slug);
    expect(inNovember).toContain("broad-beans");
    expect(inNovember).toContain("garlic");
  });

  it("counts an autumn sowing from the autumn frost, to the same date as before for the average garden", () => {
    const frost = new Date(YEAR + 1, 3, 15);
    const open = sowingOpenAt(-26, frost);
    expect(Math.abs(days(addWeeks(frost, -26), open))).toBeLessThanOrEqual(1);
    expect(sowingOpenAt(-8, frost).getTime()).toBe(addWeeks(frost, -8).getTime());
  });
});

describe("the end of the season is each garden's own", () => {
  it("brings autumn forward for a late spring and pushes it back for an early one", () => {
    const aberdeen = autumnFrostFor(dayOfYear(ABERDEEN));
    const penzance = autumnFrostFor(dayOfYear(PENZANCE));
    expect(aberdeen.getMonth()).toBe(8);
    expect(penzance.getMonth()).toBe(10);
    expect(days(aberdeen, penzance)).toBeGreaterThan(30);
  });

  it("closes the last succession sowings of tender and half-hardy crops sooner in a cold garden", () => {
    for (const slug of ["french-beans", "rocket", "coriander"]) {
      const cold = window(slug, ABERDEEN, "direct sow").closeAt;
      const mild = window(slug, PENZANCE, "direct sow").closeAt;
      expect(days(cold, mild), slug).toBeGreaterThan(14);
    }
  });

  it("leaves hardy crops their long run — Aberdeen still sows peas and beetroot in June", () => {
    const june = new Date(YEAR, 5, 15, 12);
    const sowing = inSeasonCrops(dayOfYear(ABERDEEN), june).map((e) => e.crop.slug);
    for (const slug of ["peas", "beetroot", "carrots", "lettuce"]) expect(sowing, slug).toContain(slug);
  });

  it("never squeezes a crop out altogether: every sowing keeps at least a fortnight, everywhere", () => {
    for (const springDay of SPRING_FROST_DAYS) {
      for (const c of crops) {
        if (c.category === "hardy") continue;
        for (const w of windowsForCropYear(c, dayOfYear(springDay))) {
          if (!w.isSowing) continue;
          expect(days(w.openAt, w.closeAt), `${c.slug}, spring frost day ${springDay}`).toBeGreaterThanOrEqual(14);
        }
      }
    }
  });
});

describe("tender plants are not offered for planting out into the back end of the year", () => {
  it("has stopped offering peppers in Aberdeen long before its first frost", () => {
    const frost = dayOfYear(ABERDEEN);
    const lateAugust = new Date(YEAR, 7, 31, 12);
    const offered = plantOutCrops(frost, lateAugust).map((e) => e.crop.slug);
    for (const slug of ["peppers", "chillies", "aubergine", "cucumbers", "tomatoes"]) expect(offered).not.toContain(slug);
  });

  it("gives every garden at least the run-up to frost the average garden gets", () => {
    const averageRunUp = (slug: string) =>
      days(window(slug, UK_AVERAGE, "plant out").closeAt, autumnFrostFor(dayOfYear(UK_AVERAGE)));
    for (const springDay of SPRING_FROST_DAYS) {
      for (const c of crops) {
        if (c.category === "hardy" || c.plantOutWeeks === null) continue;
        const w = window(c.slug, springDay, "plant out");
        const ideal = addWeeks(dayOfYear(springDay), c.plantOutWeeks);
        const runUp = days(w.closeAt, autumnFrostFor(dayOfYear(springDay)));
        const atFloor = days(ideal, w.closeAt) <= 21;
        // either the full average run-up, or the three-week minimum past the ideal date
        expect(atFloor || runUp >= averageRunUp(c.slug) - 1, `${c.slug}, spring frost day ${springDay}`).toBe(true);
        expect(days(ideal, w.closeAt), `${c.slug}, spring frost day ${springDay}`).toBeGreaterThanOrEqual(21);
        expect(days(ideal, w.closeAt)).toBeLessThanOrEqual(LATE_PLANT_OUT_TAIL_WEEKS * 7);
      }
    }
  });

  it("leaves hardy plant-outs alone", () => {
    for (const springDay of SPRING_FROST_DAYS) {
      const w = window("cabbage", springDay, "plant out");
      const ideal = addWeeks(dayOfYear(springDay), crop("cabbage").plantOutWeeks!);
      expect(days(ideal, w.closeAt)).toBe(LATE_PLANT_OUT_TAIL_WEEKS * 7);
    }
  });
});
