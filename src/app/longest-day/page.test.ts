import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import LongestDayPage from "@/app/longest-day/page";

describe("LongestDayPage", () => {
  it("uses specific, measurable winter seed affiliate copy", () => {
    const html = renderToStaticMarkup(createElement(LongestDayPage));

    expect(html).toContain("Winter veg seeds for midsummer sowing");
    expect(html).toContain('data-umami-event-position="longest-day-winter-seeds"');
    expect(html).toContain('data-umami-event-merchant="amazon-uk"');
    expect(html).not.toContain("Compare winter veg seeds");
    expect(html).not.toContain("Get the seeds");
  });
});
