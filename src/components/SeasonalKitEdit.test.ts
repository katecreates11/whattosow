import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SeasonalKitEdit from "@/components/SeasonalKitEdit";

describe("SeasonalKitEdit", () => {
  it("tracks full seasonal kit links by month and kit id", () => {
    const html = renderToStaticMarkup(
      createElement(SeasonalKitEdit, { variant: "full", month: 6 }),
    );

    expect(html).toContain('data-umami-event-position="seasonal-kit-july-watering-lance"');
    expect(html).toContain('data-umami-event-position="seasonal-kit-july-twine"');
    expect(html).not.toContain('data-umami-event-position="gear-pick"');
  });
});
