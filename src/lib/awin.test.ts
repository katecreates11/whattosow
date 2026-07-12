import { describe, expect, it } from "vitest";
import { awinLink } from "@/lib/awin";

describe("awinLink", () => {
  it("does not wrap an Awin deep link twice", () => {
    const destination = "https://search.thompson-morgan.com/seeds/Lettuce";
    const wrapped = awinLink(destination);

    expect(awinLink(wrapped)).toBe(wrapped);
  });
});
