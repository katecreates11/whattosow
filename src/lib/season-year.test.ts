import { describe, expect, it } from "vitest";
import { crops } from "@/data/crops";
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
  const autumn = new Date(YEAR, 9, 25);
  return now > autumn ? dayOfYear(springDay, YEAR + 1) : dayOfYear(springDay);
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

  // Known, and waiting on Kate's yes — see docs/plans/weather-brain-2026-11.md.
  it.todo("plants garlic EARLIER in cold gardens, not later (autumn sowings are keyed to the spring frost, which inverts the geography)");
  it.todo("stops offering tender plant-outs once the first frost is under six weeks away (peppers 'plant out' on 31 August in Aberdeen)");
  it.todo("offers autumn-sown broad beans in October–November");
  it.todo("closes late-summer sowing of TENDER crops by each garden's own first frost, not 25 October everywhere (hardy crops must keep their longer run — a blanket change wrongly emptied Aberdeen's June list)");
});
