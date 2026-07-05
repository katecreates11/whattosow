import { describe, expect, it } from "vitest";
import { crops } from "@/data/crops";
import { frostOffsetText, getCropNowAnswer } from "./crop-now-answer";

function crop(slug: string) {
  const found = crops.find((entry) => entry.slug === slug);
  if (!found) throw new Error(`Missing crop fixture: ${slug}`);
  return found;
}

describe("getCropNowAnswer", () => {
  it("answers a good direct-sowing window with a crawlable month link", () => {
    const answer = getCropNowAnswer(crop("lettuce"), new Date(2026, 6, 5));

    expect(answer.state).toBe("good-time");
    expect(answer.action).toBe("direct sow");
    expect(answer.actionLabel).toBe("Direct sow outdoors");
    expect(answer.monthLink.href).toBe("/sow/july");
    expect(answer.summary).toContain("Yes");
  });

  it("tells users not to start tender crops from seed after their seed and plant-out windows have passed", () => {
    const answer = getCropNowAnswer(crop("tomatoes"), new Date(2026, 6, 5));

    expect(answer.state).toBe("too-late");
    expect(answer.action).toBe("wait");
    expect(answer.stateLabel).toBe("Too late");
    expect(answer.summary).toContain("Not from seed now");
    expect(answer.guideLink?.href).toBe("/guides/growing-tomatoes-outdoors-vs-greenhouse");
  });

  it("returns a too-early wait answer before the first sowing window opens", () => {
    const answer = getCropNowAnswer(crop("tomatoes"), new Date(2026, 0, 5));

    expect(answer.state).toBe("too-early");
    expect(answer.action).toBe("wait");
    expect(answer.monthLink.href).toBe("/sow/february");
    expect(answer.windowText).toContain("Sow indoors");
  });

  it("marks closing sowing windows as last chance", () => {
    const answer = getCropNowAnswer(crop("lettuce"), new Date(2026, 7, 25));

    expect(answer.state).toBe("last-chance");
    expect(answer.stateLabel).toBe("Last chance");
    expect(answer.practicalNote).toContain("Sow a small row now");
  });
});

describe("frostOffsetText", () => {
  it("formats frost offsets without leaking negative week wording", () => {
    expect(frostOffsetText(-10)).toBe("10 weeks before your last frost date");
    expect(frostOffsetText(0)).toBe("around your last frost date");
    expect(frostOffsetText(2)).toBe("2 weeks after your last frost date");
  });
});
