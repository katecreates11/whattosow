import { describe, expect, it } from "vitest";
import { getUsZipSowingAnswer, normalizeUsZip } from "@/lib/us-zip";

describe("normalizeUsZip", () => {
  it("accepts plain and extended US ZIP codes without keeping the extension", () => {
    expect(normalizeUsZip("10001")).toBe("10001");
    expect(normalizeUsZip("90210-1234")).toBe("90210");
  });

  it("rejects non-US ZIP-shaped input", () => {
    expect(normalizeUsZip("SW1A 1AA")).toBeNull();
    expect(normalizeUsZip("1234")).toBeNull();
  });
});

describe("getUsZipSowingAnswer", () => {
  it("returns a West Coast answer with broad zone wording and real crop links", () => {
    const answer = getUsZipSowingAnswer("90210");

    expect(answer?.region).toBe("West Coast");
    expect(answer?.regionPhrase).toBe("on the West Coast");
    expect(answer?.zoneBand).toBe("roughly zones 7-11");
    expect(answer?.crops.map((crop) => crop.href)).toContain("/crops/basil");
    expect(answer?.crops.map((crop) => crop.href)).toContain("/crops/french-beans");
  });

  it("returns a Northeast answer without exposing the full ZIP in tracking data", () => {
    const answer = getUsZipSowingAnswer("10001");

    expect(answer?.region).toBe("Northeast");
    expect(answer?.tracking).toEqual({
      region: "northeast",
      zoneBand: "zones-5-7",
    });
    expect(JSON.stringify(answer?.tracking)).not.toContain("10001");
  });
});
