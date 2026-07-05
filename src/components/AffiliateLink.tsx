/**
 * One place for every outbound affiliate link.
 *
 * Why this exists: the Amazon tag was hand-written across ~15 files and the
 * click-tracking events were fragmented (companion-seed-click, gear-affiliate-
 * click, variety-seed-click…), so we were blind on which pages actually earn.
 * AffiliateLink centralises three things:
 *   1. the tag / tracking wrap (Amazon tag + Awin deep-link),
 *   2. rel="sponsored" + safe target,
 *   3. a single umami event ("affiliate-click") with product / merchant / type
 *      attributes, so every click rolls up into one report you can slice.
 *
 * It renders a plain <a> with umami data-attributes (umami auto-tracks those),
 * so it stays a server component — no client JS needed.
 */
import { awinLink } from "@/lib/awin";

const AMAZON_TAG = "whattosow21-21";

/** Ensure an Amazon URL carries our associates tag (don't double-tag). */
function withAmazonTag(url: string): string {
  if (url.includes("tag=")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}tag=${AMAZON_TAG}`;
}

/**
 * Turn a raw merchant URL into a tracked one:
 * Amazon → ensure our tag; everything else → Awin deep-link (returns the plain
 * URL unchanged if it isn't one of our active Awin advertisers).
 */
export function affiliateUrl(url: string): string {
  if (!url) return url;
  if (url.includes("amazon.")) return withAmazonTag(url);
  return awinLink(url);
}

/**
 * Normalise a supplier display name ("Thompson & Morgan", "Mr Fothergill's")
 * to the merchant slug used in tracking, so hand-placed links and
 * AffiliateLink report under the same merchant values.
 */
export function merchantSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Best-effort merchant label from a URL, for the tracking attribute. */
function merchantFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("amazon")) return "amazon";
    if (host.includes("thompson-morgan")) return "thompson-morgan";
    if (host.includes("suttons")) return "suttons";
    if (host.includes("crocus")) return "crocus";
    if (host.includes("primrose")) return "primrose";
    if (host.includes("dobies")) return "dobies";
    if (host.includes("fothergill")) return "mr-fothergills";
    if (host.includes("awin1")) return "awin";
    return host;
  } catch {
    return "unknown";
  }
}

export interface AffiliateLinkProps {
  /** Raw destination URL (un-tagged is fine — we wrap it). */
  href: string;
  /** What's being linked, e.g. "horticultural fleece" or "Aquadulce broad bean". */
  product: string;
  /** "seed" | "gear" — the kind of buy-point, for slicing the report. */
  type?: "seed" | "gear";
  /** Override the auto-detected merchant if you need to. */
  merchant?: string;
  className?: string;
  children: React.ReactNode;
}

export default function AffiliateLink({
  href,
  product,
  type = "gear",
  merchant,
  className,
  children,
}: AffiliateLinkProps) {
  const url = affiliateUrl(href);
  return (
    <a
      href={url}
      target="_blank"
      rel="sponsored noopener noreferrer"
      data-umami-event="affiliate-click"
      data-umami-event-product={product}
      data-umami-event-merchant={merchant ?? merchantFromUrl(url)}
      data-umami-event-type={type}
      className={className}
    >
      {children}
    </a>
  );
}
