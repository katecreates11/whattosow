import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("tracks homepage plant-out affiliate links with specific positions", () => {
    const html = renderToStaticMarkup(Home());

    expect(html).toContain('data-umami-event-position="homepage-plant-out-fleece"');
    expect(html).toContain('data-umami-event-position="homepage-plant-out-young-plants"');
  });
});
