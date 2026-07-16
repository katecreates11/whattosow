import { shouldSkipAnalyticsForUserAgent } from "@/lib/analytics-bot-filter";

export type AffiliateClickPayload = Record<string, unknown> & {
  product?: unknown;
  merchant?: unknown;
  type?: unknown;
  position?: unknown;
  path?: unknown;
};

export type SanitizedAffiliateClickPayload = {
  product: string;
  merchant: string;
  type: "seed" | "gear" | "unknown";
  position: string;
  path: string;
};

export type AffiliateClickLedgerEntry = SanitizedAffiliateClickPayload & {
  event: "affiliate-click";
  country?: string;
  occurredAt: string;
};

function cleanText(value: unknown, fallback: string, maxLength = 120): string {
  if (typeof value !== "string") return fallback;
  const cleaned = value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
  return cleaned ? cleaned.slice(0, maxLength) : fallback;
}

function cleanPath(value: unknown): string {
  const raw = cleanText(value, "/", 220);
  try {
    const url = new URL(raw, "https://whattosow.co.uk");
    return url.pathname.startsWith("/") ? url.pathname : "/";
  } catch {
    return raw.startsWith("/") ? raw.split("?")[0].split("#")[0] || "/" : "/";
  }
}

function cleanType(value: unknown): SanitizedAffiliateClickPayload["type"] {
  return value === "seed" || value === "gear" ? value : "unknown";
}

function cleanCountry(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const country = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(country) ? country : undefined;
}

export function sanitizeAffiliateClickPayload(payload: AffiliateClickPayload): SanitizedAffiliateClickPayload {
  return {
    product: cleanText(payload.product, "unknown-product"),
    merchant: cleanText(payload.merchant, "unknown-merchant", 80),
    type: cleanType(payload.type),
    position: cleanText(payload.position, "unknown-position", 120),
    path: cleanPath(payload.path),
  };
}

export function createAffiliateClickLedgerEntry(
  payload: AffiliateClickPayload,
  context: {
    country?: string | null;
    userAgent?: string | null;
    now?: Date;
  },
): AffiliateClickLedgerEntry | null {
  if (shouldSkipAnalyticsForUserAgent(context.userAgent ?? "")) return null;

  const country = cleanCountry(context.country);
  return {
    event: "affiliate-click",
    ...sanitizeAffiliateClickPayload(payload),
    ...(country ? { country } : {}),
    occurredAt: (context.now ?? new Date()).toISOString(),
  };
}
