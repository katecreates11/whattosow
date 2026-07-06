import { describe, expect, it } from "vitest";
import { getWateringBalance, getWateringNoteState } from "@/lib/watering";

describe("watering helper", () => {
  it("keeps the PlantingTool rain-vs-loss maths unchanged", () => {
    expect(getWateringBalance({ rainfall3Days: 3, evapotranspiration: 1.6 })).toEqual({
      rain: 3,
      lost: 4.8,
      netBalance: -1.8,
      gaining: false,
      scale: 4.8,
    });

    expect(getWateringBalance({ rainfall3Days: 8, evapotranspiration: 1 })).toMatchObject({
      rain: 8,
      lost: 3,
      netBalance: 5,
      gaining: true,
    });
  });

  it("falls back to a useful national note without weather, and a winter note out of season", () => {
    expect(getWateringNoteState(null, new Date("2026-07-06"))).toBe("no-postcode");
    expect(getWateringNoteState(null, new Date("2026-01-06"))).toBe("winter-observation");
  });

  it("classifies summer watering states from shared weather inputs", () => {
    const date = new Date("2026-07-06");

    expect(getWateringNoteState({ weatherCode: 61 }, date)).toBe("raining-now");
    expect(getWateringNoteState({ rainLast24h: 7, rainfall3Days: 8, evapotranspiration: 1.2 }, date)).toBe("rained-properly");
    expect(getWateringNoteState({ rainNext12h: 4, rainfall3Days: 5, evapotranspiration: 2 }, date)).toBe("rain-due");
    expect(getWateringNoteState({ tempMaxToday: 29, tempMaxNextDays: [29, 30, 28], rainfall3Days: 0, evapotranspiration: 2 }, date)).toBe("heatwave");
    expect(getWateringNoteState({ tempMaxToday: 25, rainfall3Days: 0, evapotranspiration: 2 }, date)).toBe("hot-dry-spell");
    expect(getWateringNoteState({ windMax: 34, rainfall3Days: 0, evapotranspiration: 1.4 }, date)).toBe("windy-and-dry");
    expect(getWateringNoteState({ tempMaxToday: 16, weatherCode: 3, rainfall3Days: 1, evapotranspiration: 0.4 }, date)).toBe("cool-and-cloudy");
  });
});
