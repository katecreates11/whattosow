import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { crops } from "@/data/crops";
import CropCardGrid from "@/components/CropCardGrid";
import type { CropEntry } from "@/lib/season-core";

const tomatoes = crops.find((crop) => crop.slug === "tomatoes");

describe("CropCardGrid", () => {
  it("makes sow-card seed links supplier-specific and measurable", () => {
    if (!tomatoes) throw new Error("Tomatoes crop fixture missing");

    const entry: CropEntry = {
      crop: tomatoes,
      no: 1,
      varietyCount: 3,
      status: {
        state: "now",
        method: "sow indoors",
        daysLeft: 21,
        label: "sow indoors now",
      },
    };

    const html = renderToStaticMarkup(
      createElement(CropCardGrid, { entries: [entry], showSeeds: true }),
    );

    expect(html).toContain("Seeds at ");
    expect(html).toContain('data-umami-event-position="sow-card-seeds-tomatoes-thompson-and-morgan"');
    expect(html).toContain('data-umami-event-type="seed"');
    expect(html).toContain('rel="sponsored noopener noreferrer"');
    expect(html).not.toContain("Get the seeds");
  });
});
