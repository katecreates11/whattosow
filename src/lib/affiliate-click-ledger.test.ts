import { describe, expect, it } from "vitest";
import {
  createAffiliateClickLedgerEntry,
  sanitizeAffiliateClickPayload,
} from "@/lib/affiliate-click-ledger";

describe("affiliate click ledger", () => {
  it("keeps only decision-useful, non-PII affiliate click fields", () => {
    expect(
      sanitizeAffiliateClickPayload({
        product: "High-potash tomato feed\n",
        merchant: "amazon-uk",
        type: "gear",
        position: "tomatoes-feed",
        path: "/guides/growing-tomatoes-outdoors-vs-greenhouse?postcode=SW1A1AA",
        zip: "90210",
        email: "nope@example.com",
      }),
    ).toEqual({
      product: "High-potash tomato feed",
      merchant: "amazon-uk",
      type: "gear",
      position: "tomatoes-feed",
      path: "/guides/growing-tomatoes-outdoors-vs-greenhouse",
    });
  });

  it("normalises country and ignores bot traffic before logging", () => {
    expect(
      createAffiliateClickLedgerEntry(
        {
          product: "watering can",
          merchant: "amazon-uk",
          type: "gear",
          position: "watering-buyer-note-cans",
          path: "/guides/watering",
        },
        {
          country: "gb",
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36",
          now: new Date("2026-07-16T12:00:00.000Z"),
        },
      ),
    ).toEqual({
      event: "affiliate-click",
      product: "watering can",
      merchant: "amazon-uk",
      type: "gear",
      position: "watering-buyer-note-cans",
      path: "/guides/watering",
      country: "GB",
      occurredAt: "2026-07-16T12:00:00.000Z",
    });

    expect(
      createAffiliateClickLedgerEntry(
        { product: "watering can", merchant: "amazon-uk", type: "gear", position: "test", path: "/" },
        { country: "US", userAgent: "Googlebot/2.1", now: new Date("2026-07-16T12:00:00.000Z") },
      ),
    ).toBeNull();
  });
});
