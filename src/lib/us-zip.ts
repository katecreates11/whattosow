export type UsZipCrop = {
  name: string;
  href: string;
  method: "direct sow" | "start in modules" | "plant out" | "either";
  note: string;
};

export type UsZipSowingAnswer = {
  zip: string;
  region: string;
  regionPhrase: string;
  regionKey: string;
  zoneBand: string;
  zoneKey: string;
  interpretation: string;
  crops: UsZipCrop[];
  caveat: string;
  tracking: {
    region: string;
    zoneBand: string;
  };
};

const sharedSummerCrops: UsZipCrop[] = [
  {
    name: "basil",
    href: "/crops/basil",
    method: "start in modules",
    note: "quick in warmth and useful in pots",
  },
  {
    name: "French beans",
    href: "/crops/french-beans",
    method: "direct sow",
    note: "worth a short late row where the soil is warm",
  },
  {
    name: "carrots",
    href: "/crops/carrots",
    method: "direct sow",
    note: "choose quick varieties and keep the seedbed damp",
  },
  {
    name: "lettuce",
    href: "/crops/lettuce",
    method: "either",
    note: "start in shade if your afternoons are fierce",
  },
];

const coolSummerCrops: UsZipCrop[] = [
  {
    name: "lettuce",
    href: "/crops/lettuce",
    method: "either",
    note: "best started somewhere cool and bright",
  },
  {
    name: "radishes",
    href: "/crops/radishes",
    method: "direct sow",
    note: "fast, but keep them watered",
  },
  {
    name: "carrots",
    href: "/crops/carrots",
    method: "direct sow",
    note: "a useful late row in cooler districts",
  },
  {
    name: "spring onions",
    href: "/crops/spring-onions",
    method: "direct sow",
    note: "steady and forgiving",
  },
];

const hotSummerCrops: UsZipCrop[] = [
  {
    name: "basil",
    href: "/crops/basil",
    method: "start in modules",
    note: "happy in heat if it never dries out",
  },
  {
    name: "French beans",
    href: "/crops/french-beans",
    method: "direct sow",
    note: "sow into warm soil and water the row in well",
  },
  {
    name: "beetroot",
    href: "/crops/beetroot",
    method: "direct sow",
    note: "worth trying for small roots and leaves",
  },
  {
    name: "lettuce",
    href: "/crops/lettuce",
    method: "start in modules",
    note: "use shade; heat can make it bolt",
  },
];

type RegionTemplate = Omit<UsZipSowingAnswer, "zip" | "tracking">;

const regionsByZipPrefix: Record<string, RegionTemplate> = {
  "0": {
    region: "Northeast",
    regionPhrase: "in the Northeast",
    regionKey: "northeast",
    zoneBand: "roughly zones 5-7",
    zoneKey: "zones-5-7",
    interpretation:
      "Your summer is useful but not endless, so lean into quick rows and crops that do not mind cooler nights.",
    crops: coolSummerCrops,
    caveat: "This is a US beta using broad ZIP regions, not county-level extension advice yet.",
  },
  "1": {
    region: "Northeast",
    regionPhrase: "in the Northeast",
    regionKey: "northeast",
    zoneBand: "roughly zones 5-7",
    zoneKey: "zones-5-7",
    interpretation:
      "Your summer is useful but not endless, so lean into quick rows and crops that do not mind cooler nights.",
    crops: coolSummerCrops,
    caveat: "This is a US beta using broad ZIP regions, not county-level extension advice yet.",
  },
  "2": {
    region: "Mid-Atlantic",
    regionPhrase: "in the Mid-Atlantic",
    regionKey: "mid-atlantic",
    zoneBand: "roughly zones 6-8",
    zoneKey: "zones-6-8",
    interpretation:
      "You have warmth to work with now, but midsummer sowing still favours quick crops and steady watering.",
    crops: sharedSummerCrops,
    caveat: "This is a US beta using broad ZIP regions, not county-level extension advice yet.",
  },
  "3": {
    region: "Southeast",
    regionPhrase: "in the Southeast",
    regionKey: "southeast",
    zoneBand: "roughly zones 7-10",
    zoneKey: "zones-7-10",
    interpretation:
      "Heat matters more than frost this week, so sow small, water deeply, and give tender leaves a little shade.",
    crops: hotSummerCrops,
    caveat: "This is a US beta using broad ZIP regions, not county-level extension advice yet.",
  },
  "4": {
    region: "Great Lakes and Ohio Valley",
    regionPhrase: "around the Great Lakes and Ohio Valley",
    regionKey: "great-lakes-ohio-valley",
    zoneBand: "roughly zones 5-7",
    zoneKey: "zones-5-7",
    interpretation:
      "There is still enough season for fast crops, especially if you keep sowings small and regular.",
    crops: coolSummerCrops,
    caveat: "This is a US beta using broad ZIP regions, not county-level extension advice yet.",
  },
  "5": {
    region: "Upper Midwest",
    regionPhrase: "in the Upper Midwest",
    regionKey: "upper-midwest",
    zoneBand: "roughly zones 3-6",
    zoneKey: "zones-3-6",
    interpretation:
      "Your window is shorter, so choose quick, cool-season rows and skip anything that needs a long run from seed.",
    crops: coolSummerCrops,
    caveat: "This is a US beta using broad ZIP regions, not county-level extension advice yet.",
  },
  "6": {
    region: "Midwest and Plains",
    regionPhrase: "in the Midwest and Plains",
    regionKey: "midwest-plains",
    zoneBand: "roughly zones 4-7",
    zoneKey: "zones-4-7",
    interpretation:
      "Midsummer still gives you room for quick rows, especially roots and leaves that can finish before autumn cools down.",
    crops: coolSummerCrops,
    caveat: "This is a US beta using broad ZIP regions, not county-level extension advice yet.",
  },
  "7": {
    region: "South Central",
    regionPhrase: "in the South Central states",
    regionKey: "south-central",
    zoneBand: "roughly zones 7-9",
    zoneKey: "zones-7-9",
    interpretation:
      "The season is long, but the heat is real; sow into damp soil and protect tender leaves from the hardest sun.",
    crops: hotSummerCrops,
    caveat: "This is a US beta using broad ZIP regions, not county-level extension advice yet.",
  },
  "8": {
    region: "Mountain West and Southwest",
    regionPhrase: "in the Mountain West or Southwest",
    regionKey: "mountain-west-southwest",
    zoneBand: "roughly zones 3-9",
    zoneKey: "zones-3-9",
    interpretation:
      "Elevation changes everything here, so treat this as a broad steer and favour small sowings you can water well.",
    crops: sharedSummerCrops,
    caveat: "This is a US beta using broad ZIP regions, not county-level extension advice yet.",
  },
  "9": {
    region: "West Coast",
    regionPhrase: "on the West Coast",
    regionKey: "west-coast",
    zoneBand: "roughly zones 7-11",
    zoneKey: "zones-7-11",
    interpretation:
      "You likely have a generous season, but July still rewards quick sowings and crops that can handle warm soil.",
    crops: sharedSummerCrops,
    caveat: "This is a US beta using broad ZIP regions, not county-level extension advice yet.",
  },
};

export function normalizeUsZip(input: string): string | null {
  const trimmed = input.trim();
  const match = trimmed.match(/^(\d{5})(?:-\d{4})?$/);
  return match?.[1] ?? null;
}

export function getUsZipSowingAnswer(input: string): UsZipSowingAnswer | null {
  const zip = normalizeUsZip(input);
  if (!zip) return null;

  const template = regionsByZipPrefix[zip[0]];
  if (!template) return null;

  return {
    ...template,
    zip,
    tracking: {
      region: template.regionKey,
      zoneBand: template.zoneKey,
    },
  };
}
