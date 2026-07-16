import { describe, expect, it } from "vitest";
import { tierFor } from "@/components/ColdSnapNote";

describe("tierFor", () => {
  it("classes an early first frost (northern/inland) as cold", () => {
    // 10 October — a fortnight ahead of the ~25 October UK average.
    expect(tierFor(new Date(2026, 9, 10))).toBe("cold");
  });

  it("classes a first frost near the UK average as typical", () => {
    expect(tierFor(new Date(2026, 9, 25))).toBe("typical");
  });

  it("classes a late first frost (mild/coastal) as mild", () => {
    // 6 November — well behind the UK average.
    expect(tierFor(new Date(2026, 10, 6))).toBe("mild");
  });
});
