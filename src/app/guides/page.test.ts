import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GuidesIndex from "./page";

describe("GuidesIndex", () => {
  it("tracks the guide index kit picks with product-specific positions", async () => {
    const html = renderToStaticMarkup(await GuidesIndex());

    expect(html).toContain('data-umami-event-position="guides-kit-secateurs"');
    expect(html).toContain('data-umami-event-position="guides-kit-hori-hori"');
    expect(html).toContain('data-umami-event-position="guides-kit-border-fork"');
    expect(html).not.toContain('data-umami-event-position="gear-pick"');
  });
});
