import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CropPage from "./page";

describe("CropPage", () => {
  it("tracks playbook buy links and variety seed links with crop-specific positions", async () => {
    const html = renderToStaticMarkup(
      await CropPage({ params: Promise.resolve({ slug: "tomatoes" }) }),
    );

    expect(html).toContain('data-umami-event-position="crop-playbook-tomatoes-spiral-tomato-supports"');
    expect(html).toContain('data-umami-event-position="crop-playbook-tomatoes-tomorite-tomato-feed"');
    expect(html).toContain('data-umami-event-position="crop-page-variety-seeds-tomatoes-sungold-thompson-and-morgan"');
  });
});
