import type { AffiliateClickPayload } from "@/lib/affiliate-click-ledger";

type AttributeReader = {
  getAttribute: (name: string) => string | null;
};

export function affiliateClickPayloadFromLink(
  link: AttributeReader,
  pathname: string,
): AffiliateClickPayload | null {
  if (link.getAttribute("data-umami-event") !== "affiliate-click") return null;

  return {
    product: link.getAttribute("data-umami-event-product") ?? undefined,
    merchant: link.getAttribute("data-umami-event-merchant") ?? undefined,
    type: link.getAttribute("data-umami-event-type") ?? undefined,
    position: link.getAttribute("data-umami-event-position") ?? undefined,
    path: pathname,
  };
}
