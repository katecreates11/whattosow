/**
 * Data behind the Glut-o-meter (/glut-o-meter). Scoped to the four crops that
 * actually glut at once in a UK August — see docs/ideas-board.md card 5.
 * Weight bands are honest estimates, not lab measurements: enough to make the
 * meter feel true, not a claim of precision.
 */

const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}`;

export type GlutLevel = "none" | "a-few" | "a-basketful" | "drowning-in-it";

export const GLUT_LEVELS: { level: GlutLevel; label: string }[] = [
  { level: "none", label: "None" },
  { level: "a-few", label: "A few" },
  { level: "a-basketful", label: "A basketful" },
  { level: "drowning-in-it", label: "Drowning in it" },
];

export interface GlutCrop {
  slug: string;
  name: string;
  cropHref: string;
  /** roughly how many kg each level represents, for this crop */
  weightKg: Record<Exclude<GlutLevel, "none">, number>;
  eatNow: string;
  freeze: string | null;
  preserve: string;
  kit?: {
    label: string;
    url: string;
    product: string;
  };
}

export const GLUT_CROPS: GlutCrop[] = [
  {
    slug: "courgettes",
    name: "Courgettes",
    cropHref: "/crops/courgettes",
    weightKg: { "a-few": 1, "a-basketful": 3, "drowning-in-it": 6 },
    eatNow:
      "Pick them small and eat them within a day or two — thin batons in a stir-fry, or grated raw into a salad with lemon and mint.",
    freeze:
      "Grate the rest and freeze flat in bags, meal-sized — no blanching needed, straight into winter soups and courgette cake.",
    preserve:
      "The one that hid under a leaf and grew into a marrow doesn't have to be wasted — stuff it, or let it star in a chutney.",
    kit: { label: "Freezer bags for grating into", url: az("reusable freezer bags flat"), product: "freezer bags" },
  },
  {
    slug: "beans",
    name: "Beans — runner & French",
    cropHref: "/crops/runner-beans",
    weightKg: { "a-few": 0.5, "a-basketful": 2, "drowning-in-it": 4 },
    eatNow: "Steamed with butter tonight, while they still snap.",
    freeze:
      "Top, tail and slice, blanch for two minutes, plunge into cold water, then freeze flat on a tray before bagging — they keep their colour and bite for months.",
    preserve:
      "Leave a few French bean pods to fatten and dry on the plant instead of picking them, and you've grown free seed for next spring — the glut paying for itself.",
  },
  {
    slug: "tomatoes",
    name: "Tomatoes",
    cropHref: "/crops/tomatoes",
    weightKg: { "a-few": 1, "a-basketful": 3, "drowning-in-it": 6 },
    eatNow: "Whatever's ripest goes straight into a salad with good oil and salt, today — never the fridge, it flattens the flavour.",
    freeze:
      "Cherry tomatoes freeze whole, raw, straight into a bag — they drop into January sauces like ice cubes.",
    preserve:
      "Bigger ones become roasted passata: halve, roast with garlic and oil, blitz, freeze flat. A maslin pan turns a table of tomatoes into a shelf of chutney in an afternoon.",
    kit: { label: "Maslin pan for jam and chutney days", url: az("maslin pan preserving jam"), product: "maslin pan" },
  },
  {
    slug: "cucumbers",
    name: "Cucumbers",
    cropHref: "/crops/cucumbers",
    weightKg: { "a-few": 1, "a-basketful": 3, "drowning-in-it": 5 },
    eatNow: "Sliced into everything — salads, sandwiches, a jug of water with mint.",
    freeze: null,
    preserve:
      "Cucumbers don't freeze — the texture turns to mush — so a quick pickle is the rescue: vinegar, sugar, salt, a few hours in the fridge, and they'll keep a fortnight.",
    kit: { label: "Kilner jars for a quick pickle", url: az("kilner jar preserving 1 litre"), product: "kilner jar" },
  },
];

export function weightFor(crop: GlutCrop, level: GlutLevel): number {
  if (level === "none") return 0;
  return crop.weightKg[level];
}

export interface GlutReading {
  totalKg: number;
  label: string;
  sentence: string;
}

/** The judgement sentence, written once per band rather than generated. */
export function glutReading(totalKg: number): GlutReading {
  if (totalKg <= 0) {
    return {
      totalKg,
      label: "Nothing much yet",
      sentence: "Tell it what's piling up on the kitchen table, and how much.",
    };
  }
  if (totalKg <= 2.5) {
    return {
      totalKg,
      label: "A gentle glut",
      sentence: "Nothing you can't eat this week — enjoy it while it's easy.",
    };
  }
  if (totalKg <= 7) {
    return {
      totalKg,
      label: "A proper glut",
      sentence: "This is the real thing now — time to start freezing and preserving, not just eating.",
    };
  }
  return {
    totalKg,
    label: "Officially drowning in it",
    sentence: "This is more than one kitchen can eat fresh — freeze what you can tonight, and give the rest away.",
  };
}
