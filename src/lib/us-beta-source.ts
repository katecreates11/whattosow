export type UsBetaSource = "homepage-auto" | "page-nudge" | "footer" | "direct";

const knownSources = new Set<UsBetaSource>(["homepage-auto", "page-nudge", "footer", "direct"]);

export function normaliseUsBetaSource(source: string | null | undefined): UsBetaSource {
  return source && knownSources.has(source as UsBetaSource) ? (source as UsBetaSource) : "direct";
}
