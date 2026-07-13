import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CompanionTopicPage from "@/app/guides/companion-planting/[topic]/page";

describe("CompanionTopicPage", () => {
  it("routes topic seed links through the central affiliate tracking pattern", async () => {
    const element = await CompanionTopicPage({
      params: Promise.resolve({ topic: "companion-plants-for-tomatoes" }),
    });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Seeds that fit this plan");
    expect(html).toContain('data-umami-event-position="companion-topic-seeds-companion-plants-for-tomatoes-');
    expect(html).not.toContain('data-umami-event-position="companion-topic-seeds"');
    expect(html).toContain('data-umami-event-merchant="thompson-morgan"');
    expect(html).toContain('rel="sponsored noopener noreferrer"');
    expect(html).not.toContain("Find the seeds");
  });
});
