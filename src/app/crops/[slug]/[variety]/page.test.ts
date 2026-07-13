import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import VarietyPage from "./page";

describe("VarietyPage", () => {
  it("tracks variety seed supplier links with variety-specific positions", async () => {
    const html = renderToStaticMarkup(
      await VarietyPage({
        params: Promise.resolve({ slug: "tomatoes", variety: "sungold" }),
      }),
    );

    expect(html).toContain('data-umami-event-position="variety-page-seeds-tomatoes-sungold-thompson-and-morgan"');
    expect(html).toContain('data-umami-event-position="variety-page-seeds-tomatoes-sungold-suttons"');
  });
});
