/**
 * Wrap a merchant product URL in an Awin tracked deep-link so the click earns
 * commission. If the destination isn't one of our active Awin advertisers, the
 * plain URL is returned unchanged (so e.g. Sarah Raven links still work, just
 * untracked, until their programme is active again).
 *
 * Publisher (awinaffid): 2919401 — What To Sow.
 */
const AWIN_AFFID = "2919401";

// destination domain (substring) → active Awin advertiser id (awinmid)
const AWIN_MIDS: { match: string; mid: string }[] = [
  { match: "thompson-morgan.com", mid: "2283" },
  { match: "suttons.co.uk", mid: "25121" },
  { match: "crocus.co.uk", mid: "7833" },
  { match: "primrose.co.uk", mid: "36198" },
  { match: "dobies.co.uk", mid: "25131" },
  { match: "mr-fothergills", mid: "102387" },
  { match: "mrfothergills", mid: "102387" },
];

const TM_SEARCH = "https://www.thompson-morgan.com/search-results?q=";

function decodeFully(value: string): string {
  let out = value.replace(/\+/g, " ");
  for (let i = 0; i < 3; i++) {
    try {
      const next = decodeURIComponent(out);
      if (next === out) break;
      out = next;
    } catch {
      break;
    }
  }
  return out.trim();
}

/**
 * Build a Thompson & Morgan search link that actually searches.
 * The ONLY working shape is /search-results?q=<term> (checked by hand,
 * 16 Nov 2026). Prefer a direct /p/ product page wherever one is known.
 */
export function thompsonMorganSearch(term: string): string {
  return `${TM_SEARCH}${encodeURIComponent(decodeFully(term))}`;
}

/**
 * Repair the two Thompson & Morgan link shapes that look right and aren't.
 *
 *  - https://search.thompson-morgan.com/seeds/<term> redirects to
 *    /search-results? with the term thrown away: an empty search page.
 *  - https://www.thompson-morgan.com/search?q=<term> redirects to
 *    /search-results?q=q=<term>: the site searches for the literal "q=<term>"
 *    and returns hundreds of unrelated products.
 *
 * Between them these were every T&M seed link on the site that wasn't a
 * direct product page. Every outbound link passes through awinLink(), so
 * repairing them here fixes all of them, and any written this way in future.
 */
export function repairMerchantUrl(url: string): string {
  const searchHost = /^https?:\/\/search\.thompson-morgan\.com\/[^/?#]+\/([^?#]+)/i.exec(url);
  if (searchHost) return thompsonMorganSearch(searchHost[1]);
  const brokenQuery = /^https?:\/\/(?:www\.)?thompson-morgan\.com\/search\?q=([^&#]*)/i.exec(url);
  if (brokenQuery) return thompsonMorganSearch(brokenQuery[1]);
  return url;
}

export function awinLink(rawUrl: string): string {
  if (!rawUrl) return rawUrl;
  if (rawUrl.includes("awin1.com/cread.php")) return rawUrl;
  const url = repairMerchantUrl(rawUrl);
  const mid = AWIN_MIDS.find((m) => url.includes(m.match))?.mid;
  if (!mid) return url; // not an active Awin merchant — leave as a plain link
  return `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=${AWIN_AFFID}&ued=${encodeURIComponent(url)}`;
}
