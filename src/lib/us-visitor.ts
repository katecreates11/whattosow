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
  return timeZone.startsWith("America/") || languages.some((language) => language.toLowerCase() === "en-us");
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
