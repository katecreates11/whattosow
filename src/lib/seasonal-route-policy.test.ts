import { expect, it } from "vitest";
import { SEASONAL_ROUTE_POLICY } from "./seasonal-route-policy";

it("classifies every public server route that reads the current date", () => {
  expect(SEASONAL_ROUTE_POLICY.map((item) => item.route)).toEqual(
    expect.arrayContaining([
      "/",
      "/sow",
      "/sow-in/[city]",
      "/print",
      "/pins",
      "/crops/[slug]",
      "/grow-your-christmas-dinner",
      "/guides",
    ]),
  );
  expect(
    SEASONAL_ROUTE_POLICY.every(
      (item) => item.cadence === "hourly" || item.cadence === "existing-live-policy",
    ),
  ).toBe(true);
});
