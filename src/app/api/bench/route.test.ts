import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

function githubJson(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function shipRequest(number: number): NextRequest {
  return new NextRequest("http://localhost/api/bench", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ k: "test-key", ship: number }),
  });
}

describe("Potting Bench ship API", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    process.env.BENCH_KEY = "test-key";
    process.env.GITHUB_TOKEN = "test-token";
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    delete process.env.BENCH_KEY;
    delete process.env.GITHUB_TOKEN;
    vi.unstubAllGlobals();
  });

  it("rejects a PR whose branch is not night/", async () => {
    fetchMock.mockResolvedValueOnce(
      githubJson({
        state: "open",
        body: "## Preview",
        head: { ref: "feature/nope", sha: "head-sha" },
      }),
    );

    const response = await POST(shipRequest(7));

    expect(response.status).toBe(400);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("records approval before merging a clean Night Gardener PR", async () => {
    fetchMock
      .mockResolvedValueOnce(
        githubJson({
          state: "open",
          body: "## Preview",
          head: { ref: "night/guide", sha: "head-sha" },
        }),
      )
      .mockResolvedValueOnce(githubJson({}))
      .mockResolvedValueOnce(githubJson({ merged: true }));

    const response = await POST(shipRequest(2));
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toMatchObject({ ok: true, status: "shipped", number: 2 });
    expect(fetchMock).toHaveBeenCalledTimes(3);
    const approval = fetchMock.mock.calls[1];
    expect(approval[0]).toContain("/pulls/2");
    expect(approval[1]?.method).toBe("PATCH");
    expect(JSON.parse(String(approval[1]?.body)).body).toContain(
      "<!-- potting-bench:approved-to-ship -->",
    );
    expect(fetchMock.mock.calls[2][0]).toContain("/pulls/2/merge");
  });

  it("returns queued after approval when GitHub cannot merge yet", async () => {
    fetchMock
      .mockResolvedValueOnce(
        githubJson({
          state: "open",
          body: "## Preview",
          head: { ref: "night/guide", sha: "head-sha" },
        }),
      )
      .mockResolvedValueOnce(githubJson({}))
      .mockResolvedValueOnce(githubJson({ merged: false }, 405));

    const response = await POST(shipRequest(2));

    expect(response.status).toBe(202);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      status: "queued",
      number: 2,
    });
  });

  it("keeps repeated approval idempotent", async () => {
    fetchMock
      .mockResolvedValueOnce(
        githubJson({
          state: "open",
          body: "## Preview\n\n<!-- potting-bench:approved-to-ship -->",
          head: { ref: "night/guide", sha: "head-sha" },
        }),
      )
      .mockResolvedValueOnce(githubJson({ merged: false }, 405));

    const response = await POST(shipRequest(2));

    expect(response.status).toBe(202);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][0]).toContain("/pulls/2/merge");
  });
});
