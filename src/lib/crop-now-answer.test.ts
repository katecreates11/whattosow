import { describe, expect, it } from "vitest";
import { crops } from "@/data/crops";
import { frostOffsetText, getCropNowAnswer, getCropVerdict, getSowNowAlternatives } from "./crop-now-answer";

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

  it("keeps tomatoes precise about seed-starting while young plants remain possible", () => {
    const answer = getCropNowAnswer(crop("tomatoes"), new Date(2026, 6, 5));

    expect(answer.state).toBe("too-late");
    expect(answer.action).toBe("plant out");
    expect(answer.stateLabel).toBe("Past seed window; plant out");
    expect(answer.summary).toContain("seed-starting window");
    expect(answer.guideLink?.href).toBe("/guides/growing-tomatoes-outdoors-vs-greenhouse");
  });

  it("keeps basil sowable in July instead of sending it to next March", () => {
    const answer = getCropNowAnswer(crop("basil"), new Date(2026, 6, 5));

    expect(answer.state).toBe("good-time");
    expect(answer.action).toBe("direct sow");
    expect(answer.monthLink.href).toBe("/sow/july");
  });

  it("treats early-July courgettes as a closing seed window", () => {
    const answer = getCropNowAnswer(crop("courgettes"), new Date(2026, 6, 5));

    expect(answer.state).toBe("last-chance");
    expect(answer.action).toBe("direct sow");
    expect(answer.practicalNote).toContain("Sow a small row now");
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

describe("getCropVerdict", () => {
  it("gives lettuce a good-time direct sow verdict in July", () => {
    const verdict = getCropVerdict(crop("lettuce"), new Date(2026, 6, 5));

    expect(verdict.stateLabel).toBe("Good time");
    expect(verdict.actionLabel).toBe("Direct sow outdoors");
    expect(verdict.copy).toContain("UK average window is open");
    expect(verdict.primaryLink.href).toBe("/sow/july");
  });

  it("gives carrots a last-chance direct sow verdict in July", () => {
    const verdict = getCropVerdict(crop("carrots"), new Date(2026, 6, 5));

    expect(verdict.stateLabel).toBe("Last chance");
    expect(verdict.actionLabel).toBe("Direct sow outdoors");
    expect(verdict.copy).toContain("UK average window for carrots is closing");
  });

  it("gives tomatoes a too-late verdict with alternatives instead of a dead end", () => {
    const verdict = getCropVerdict(crop("tomatoes"), new Date(2026, 6, 5));

    expect(verdict.stateLabel).toBe("Too late from seed");
    expect(verdict.actionLabel).toBe("Buy young plants");
    expect(verdict.primaryLink.href).toBe("/sow/july");
    expect(verdict.copy).toContain("seed-starting window");
    expect(verdict.copy).toContain("plant out your own");
  });

  it("gives sweetcorn young-plant glue instead of contradicting the plant-out list", () => {
    const answer = getCropNowAnswer(crop("sweetcorn"), new Date(2026, 6, 5));
    const verdict = getCropVerdict(crop("sweetcorn"), new Date(2026, 6, 5));

    expect(answer.action).toBe("plant out");
    expect(answer.summary).toContain("sturdy young plants can still go out");
    expect(verdict.actionLabel).toBe("Buy young plants");
  });

  it("frames July pumpkins as a young-plant gamble", () => {
    const answer = getCropNowAnswer(crop("pumpkins"), new Date(2026, 6, 5));
    const verdict = getCropVerdict(crop("pumpkins"), new Date(2026, 6, 5));

    expect(answer.action).toBe("plant out");
    expect(answer.stateLabel).toContain("young plants are a gamble");
    expect(verdict.copy).toContain("A sturdy young plant is a gamble now");
  });
});

describe("getSowNowAlternatives", () => {
  it("returns crawlable crop links for other crops with open sowing windows", () => {
    const alternatives = getSowNowAlternatives("tomatoes", new Date(2026, 6, 5));

    expect(alternatives.length).toBeGreaterThan(0);
    expect(alternatives[0].href).toMatch(/^\/crops\//);
  });
});

describe("frostOffsetText", () => {
  it("formats frost offsets without leaking negative week wording", () => {
    expect(frostOffsetText(-10)).toBe("10 weeks before your last frost date");
    expect(frostOffsetText(0)).toBe("around your last frost date");
    expect(frostOffsetText(2)).toBe("2 weeks after your last frost date");
  });
});
