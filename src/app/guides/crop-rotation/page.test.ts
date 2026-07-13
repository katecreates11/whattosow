import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CropRotationGuide from "./page";

describe("CropRotationGuide", () => {
  it("tracks crop rotation kit picks with product-specific positions", () => {
    const html = renderToStaticMarkup(CropRotationGuide());

    expect(html).toContain('data-umami-event-position="crop-rotation-kit-ph-test"');
    expect(html).toContain('data-umami-event-position="crop-rotation-kit-planner"');
    expect(html).toContain('data-umami-event-position="crop-rotation-kit-bed-labels"');
    expect(html).not.toContain('data-umami-event-position="gear-pick"');
  });
});
