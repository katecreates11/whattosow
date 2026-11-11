import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import EditorNote from "@/components/EditorNote";

describe("EditorNote", () => {
  it("carries a current November note from the plot", () => {
    const html = renderToStaticMarkup(createElement(EditorNote));

    expect(html).toContain("November 2026");
    expect(html).toContain("carrots still in the ground for Christmas");
  });
});
