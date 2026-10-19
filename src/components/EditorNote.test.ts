import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import EditorNote from "@/components/EditorNote";

describe("EditorNote", () => {
  it("carries a current October note from the plot", () => {
    const html = renderToStaticMarkup(createElement(EditorNote));

    expect(html).toContain("October 2026");
    expect(html).toContain("October is when the fleece comes out");
  });
});
