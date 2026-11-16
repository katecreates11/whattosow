export type UsBetaChoice = "dismissed" | "stay-uk" | "redirected";
export type UsBetaOffer = "redirect" | "nudge" | "none";

type UsBetaOfferInput = {
  pathname: string;
  timeZone?: string;
  languages?: readonly string[];
  choice?: UsBetaChoice | null;
};

export const US_BETA_CHOICE_KEY = "whattosow:us-beta-choice";

export function isLikelyUsVisitor({
  timeZone = "",
  languages = [],
}: Pick<UsBetaOfferInput, "timeZone" | "languages">): boolean {
  // The clock is the evidence. A browser's language list is not: Chrome in
  // Britain routinely carries "en-US" as a second language, and many UK
  // machines are simply left on US English. Treating any "en-US" as American
  // sent roughly three in ten UK homepage visitors to the US page (Umami,
  // July–November 2026). So when the timezone is known it alone decides, and
  // language is only a fallback — first choice only — when there is no clock.
  if (timeZone) {
    return timeZone.startsWith("America/") || timeZone.startsWith("US/") || timeZone === "Pacific/Honolulu";
  }
  return languages[0]?.toLowerCase() === "en-us";
}

export function getUsBetaOffer({
  pathname,
  timeZone,
  languages,
  choice,
}: UsBetaOfferInput): UsBetaOffer {
  if (choice || pathname === "/us" || pathname.startsWith("/us/")) return "none";
  if (!isLikelyUsVisitor({ timeZone, languages })) return "none";
  return pathname === "/" ? "redirect" : "nudge";
}
