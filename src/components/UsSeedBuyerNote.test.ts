import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import UsSeedBuyerNote from "@/components/UsSeedBuyerNote";

describe("UsSeedBuyerNote", () => {
  it("uses Amazon US affiliate attribution and includes an unlinked skip item", () => {
    const html = renderToStaticMarkup(createElement(UsSeedBuyerNote));

    expect(html).toContain("Seeds for this list");
    expect(html).toContain("data-umami-event=\"affiliate-click\"");
    expect(html).toContain("data-umami-event-merchant=\"amazon-us\"");
    expect(html).toContain("data-umami-event-type=\"seed\"");
    expect(html).toContain("data-umami-event-position=\"us-zip-seeds\"");
    expect(html).toContain("tag=whattosowus-20");
    expect(html).toContain("Skip for now");
    expect(html).not.toContain("data-umami-event-position=\"us-zip-skip\"");
  });

  it("can separate US seed clicks by beta source and broad region", () => {
    const html = renderToStaticMarkup(
      createElement(UsSeedBuyerNote, {
        source: "homepage-auto",
        regionKey: "west-coast",
      }),
    );

    expect(html).toContain("data-umami-event-position=\"us-zip-seeds-homepage-auto-west-coast\"");
    expect(html).not.toContain("90210");
  });
});
