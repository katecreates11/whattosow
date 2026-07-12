import { describe, expect, it } from "vitest";
import { getUsBetaOffer } from "@/lib/us-visitor";

describe("getUsBetaOffer", () => {
  it("auto-redirects likely US visitors on the homepage", () => {
    expect(
      getUsBetaOffer({
        pathname: "/",
        timeZone: "America/New_York",
        languages: ["en-US"],
        choice: null,
      }),
    ).toBe("redirect");
  });

  it("shows a nudge on content pages instead of redirecting", () => {
    expect(
      getUsBetaOffer({
        pathname: "/guides/watering",
        timeZone: "America/Chicago",
        languages: ["en-US"],
        choice: null,
      }),
    ).toBe("nudge");
  });

  it("does not offer the beta on the beta route or after a choice", () => {
    expect(
      getUsBetaOffer({
        pathname: "/us",
        timeZone: "America/Los_Angeles",
        languages: ["en-US"],
        choice: null,
      }),
    ).toBe("none");
    expect(
      getUsBetaOffer({
        pathname: "/",
        timeZone: "America/Los_Angeles",
        languages: ["en-US"],
        choice: "stay-uk",
      }),
    ).toBe("none");
  });

  it("treats en-US as a weak US signal when timezone is unavailable", () => {
    expect(
      getUsBetaOffer({
        pathname: "/crops/tomatoes",
        timeZone: "",
        languages: ["en-US"],
        choice: null,
      }),
    ).toBe("nudge");
  });
});
