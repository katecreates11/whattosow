import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/affiliate-click/route";

const browserUa =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36";

describe("POST /api/affiliate-click", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs a sanitized affiliate click ledger entry and returns no content", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});

    const response = await POST(
      new Request("https://whattosow.co.uk/api/affiliate-click", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "user-agent": browserUa,
          "x-nf-client-connection-ip-country": "us",
        },
        body: JSON.stringify({
          product: "soft plant ties for tomatoes",
          merchant: "amazon-uk",
          type: "gear",
          position: "tomatoes-soft-ties",
          path: "/guides/growing-tomatoes-outdoors-vs-greenhouse?postcode=NOPE",
          email: "ignore@example.com",
        }),
      }),
    );

    expect(response.status).toBe(204);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(info).toHaveBeenCalledTimes(1);
    expect(info.mock.calls[0][0]).toBe("affiliate-click-ledger");
    expect(JSON.parse(String(info.mock.calls[0][1]))).toMatchObject({
      event: "affiliate-click",
      product: "soft plant ties for tomatoes",
      merchant: "amazon-uk",
      type: "gear",
      position: "tomatoes-soft-ties",
      path: "/guides/growing-tomatoes-outdoors-vs-greenhouse",
      country: "US",
    });
  });

  it("does not log bots or invalid JSON", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});

    const botResponse = await POST(
      new Request("https://whattosow.co.uk/api/affiliate-click", {
        method: "POST",
        headers: { "user-agent": "Googlebot/2.1", "content-type": "application/json" },
        body: JSON.stringify({ product: "watering can", merchant: "amazon-uk", type: "gear" }),
      }),
    );
    const invalidResponse = await POST(
      new Request("https://whattosow.co.uk/api/affiliate-click", {
        method: "POST",
        headers: { "user-agent": browserUa, "content-type": "application/json" },
        body: "not-json",
      }),
    );

    expect(botResponse.status).toBe(204);
    expect(invalidResponse.status).toBe(204);
    expect(info).not.toHaveBeenCalled();
  });
});
