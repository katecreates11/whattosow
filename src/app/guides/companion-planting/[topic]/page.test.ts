import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CompanionTopicPage from "@/app/guides/companion-planting/[topic]/page";

describe("CompanionTopicPage", () => {
  it("routes topic seed links through the central affiliate tracking pattern", async () => {
    const element = await CompanionTopicPage({
      params: Promise.resolve({ topic: "companion-plants-for-courgettes" }),
    });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Seeds that fit this plan");
    expect(html).toContain('data-umami-event-position="companion-topic-seeds-companion-plants-for-courgettes-');
    expect(html).not.toContain('data-umami-event-position="companion-topic-seeds"');
    expect(html).toContain('data-umami-event-merchant="thompson-morgan"');
    expect(html).toContain('rel="sponsored noopener noreferrer"');
    expect(html).not.toContain("Find the seeds");
  });

  it("renders a single trust-led buyer note for tomatoes and basil", async () => {
    const element = await CompanionTopicPage({
      params: Promise.resolve({ topic: "companion-plants-for-tomatoes" }),
    });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Worth buying / skip this");
    expect(html).toContain("Worth buying for tomatoes and basil");
    expect(html).toContain("Basil seeds");
    expect(html).toContain("French marigold seeds");
    expect(html).toContain("Skip vague companion mixes");
    expect(html).toContain('data-umami-event-position="companion-topic-buyer-companion-plants-for-tomatoes-basil-seeds"');
    expect(html).toContain('data-umami-event-position="companion-topic-buyer-companion-plants-for-tomatoes-french-marigold-seeds"');
    expect(html).toContain('data-umami-event="affiliate-click"');
    expect(html).toContain('rel="sponsored noopener noreferrer"');
    expect(html).not.toContain("Seeds that fit this plan");
    expect(html).not.toContain("companion-topic-seeds-companion-plants-for-tomatoes");
  });

  it("keeps skip items as advice rather than affiliate links", async () => {
    const element = await CompanionTopicPage({
      params: Promise.resolve({ topic: "companion-plants-for-carrots" }),
    });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Skip carrot seed tapes");
    expect(html).toContain("Fine mesh for carrot fly");
    expect(html).toContain('data-umami-event-type="gear"');
    expect(html).toContain('data-umami-event-merchant="amazon-uk"');
    expect(html).not.toContain("carrot-seed-tapes");
  });
});
