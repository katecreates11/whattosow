import { createAffiliateClickLedgerEntry, type AffiliateClickPayload } from "@/lib/affiliate-click-ledger";

export const dynamic = "force-dynamic";

function countryFromHeaders(headers: Headers): string | null {
  return (
    headers.get("x-nf-client-connection-ip-country") ??
    headers.get("x-vercel-ip-country") ??
    headers.get("cf-ipcountry")
  );
}

async function readPayload(request: Request): Promise<AffiliateClickPayload | null> {
  try {
    const value = await request.json();
    return value && typeof value === "object" ? (value as AffiliateClickPayload) : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const payload = await readPayload(request);
  if (payload) {
    const entry = createAffiliateClickLedgerEntry(payload, {
      country: countryFromHeaders(request.headers),
      userAgent: request.headers.get("user-agent"),
    });

    if (entry) {
      console.info("affiliate-click-ledger", JSON.stringify(entry));
    }
  }

  return new Response(null, {
    status: 204,
    headers: { "cache-control": "no-store" },
  });
}
