import { describe, it, expect } from "vitest";
import {
  CHRISTMAS_PLATE,
  daysToChristmas,
  daysToStart,
  plateStatus,
} from "./christmas-plate";

const crop = (name: string) => CHRISTMAS_PLATE.find((c) => c.name === name)!;

describe("daysToChristmas", () => {
  it("counts whole days to 25 Dec", () => {
    expect(daysToChristmas(new Date(2026, 11, 20))).toBe(5); // 20 Dec → 25 Dec
  });
  it("is 0 on and after Christmas Day", () => {
    expect(daysToChristmas(new Date(2026, 11, 25))).toBe(0);
    expect(daysToChristmas(new Date(2026, 11, 31))).toBe(0);
  });
});

describe("plateStatus honesty", () => {
  it("sprouts are always a spring job, never rushable", () => {
    expect(plateStatus(crop("Brussels sprouts"), new Date(2026, 6, 7))).toBe("next-year");
  });
  it("windowsill crops can be started any time", () => {
    expect(plateStatus(crop("Mustard & cress"), new Date(2026, 11, 1))).toBe("always");
  });
  it("an achievable crop reads start-now well before its window", () => {
    // New potatoes: plant by 31 Aug. On 7 Jul there is plenty of time.
    expect(plateStatus(crop("Christmas new potatoes"), new Date(2026, 6, 7))).toBe("start-now");
  });
  it("reads closing within two weeks of the deadline", () => {
    // New potatoes deadline 31 Aug → 20 Aug is 11 days out.
    expect(plateStatus(crop("Christmas new potatoes"), new Date(2026, 7, 20))).toBe("closing");
  });
  it("reads too-late once the window has passed", () => {
    expect(plateStatus(crop("Christmas new potatoes"), new Date(2026, 8, 15))).toBe("too-late");
  });
});

describe("daysToStart", () => {
  it("returns days remaining for achievable crops", () => {
    expect(daysToStart(crop("Christmas new potatoes"), new Date(2026, 7, 24))).toBe(7); // 24→31 Aug
  });
  it("returns null for windowsill and spring crops", () => {
    expect(daysToStart(crop("Parsley & soft herbs"), new Date(2026, 6, 7))).toBeNull();
    expect(daysToStart(crop("Parsnips"), new Date(2026, 6, 7))).toBeNull();
  });
});
