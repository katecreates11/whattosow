import { describe, expect, it } from "vitest";
import { shouldSkipAnalyticsForUserAgent } from "@/lib/analytics-bot-filter";

describe("shouldSkipAnalyticsForUserAgent", () => {
  it("keeps analytics for ordinary browsers", () => {
    expect(
      shouldSkipAnalyticsForUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      ),
    ).toBe(false);
  });

  it("skips obvious crawlers and automated browsers", () => {
    expect(shouldSkipAnalyticsForUserAgent("Mozilla/5.0 AppleWebKit HeadlessChrome/126.0.0.0")).toBe(true);
    expect(shouldSkipAnalyticsForUserAgent("Googlebot/2.1 (+http://www.google.com/bot.html)")).toBe(true);
    expect(shouldSkipAnalyticsForUserAgent("AhrefsBot/7.0")).toBe(true);
    expect(shouldSkipAnalyticsForUserAgent("GPTBot/1.2")).toBe(true);
  });

  it("skips webdriver sessions and empty user agents", () => {
    expect(shouldSkipAnalyticsForUserAgent("", false)).toBe(true);
    expect(shouldSkipAnalyticsForUserAgent("Mozilla/5.0 Chrome/126.0.0.0 Safari/537.36", true)).toBe(true);
  });
});
