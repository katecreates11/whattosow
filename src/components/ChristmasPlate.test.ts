import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ChristmasPlate, { christmasSeedCtaLabel } from "@/components/ChristmasPlate";

describe("ChristmasPlate", () => {
  it("uses specific, measurable Christmas seed affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(ChristmasPlate, { nowISO: "2026-07-12T09:00:00.000Z" }));

    expect(christmasSeedCtaLabel("https://www.suttons.co.uk/search?q=rocket")).toBe("Seeds at Suttons");
    expect(christmasSeedCtaLabel("https://www.amazon.co.uk/s?k=potato+grow+bags")).toBe("Compare seeds");
    expect(html).not.toContain("Buy the seeds");
  });
});
