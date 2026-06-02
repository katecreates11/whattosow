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

export function awinLink(url: string): string {
  if (!url) return url;
  const mid = AWIN_MIDS.find((m) => url.includes(m.match))?.mid;
  if (!mid) return url; // not an active Awin merchant — leave as a plain link
  return `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=${AWIN_AFFID}&ued=${encodeURIComponent(url)}`;
}
