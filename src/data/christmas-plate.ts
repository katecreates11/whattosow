// The Christmas plate — a hand-curated, honest guide to what you can still grow
// for Christmas dinner from a mid-to-late-summer start in the UK.
//
// Timing here is deliberately NOT auto-derived from crops.ts: winter growth
// slows to a crawl and frost changes everything, so the harvestWeeks maths that
// works in spring would tell cheerful lies about December. Each window below is
// hand-checked. If in doubt, we say so — a shop-bought forgiveness beats a
// confident wrong answer.
//
// Images: our own allotment photos where we have them, otherwise a placeholder
// Unsplash shot (same ids the crop pages use) until Kate shoots her own.
// Seed links go to Suttons (an active Awin merchant, so they earn); kit links
// go to Amazon. Both are wrapped for tracking at render time.

export type PlateCategory = "achievable" | "indoor" | "next-year";

export type PlateStatus =
  | "start-now"
  | "closing"
  | "too-late"
  | "always"
  | "next-year";

const uns = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=680&h=520&fit=crop&auto=format&q=75`;
const suttons = (q: string) => `https://www.suttons.co.uk/search?q=${q}`;
const amazon = (q: string) => `https://www.amazon.co.uk/s?k=${q}`;

export interface ChristmasCrop {
  name: string;
  role: string;
  category: PlateCategory;
  startVerb: "Sow" | "Plant";
  startBy?: { month: number; day: number }; // month is 1-indexed
  note: string;
  href?: string;
  showstopper?: boolean;
  /** resolved image src (our photo or an Unsplash placeholder); null = no photo yet */
  img?: string;
  imgAlt?: string;
  /** raw merchant URL for the seeds — wrapped for tracking at render */
  seedUrl?: string;
  /** optional growing kit — raw Amazon URL, wrapped at render */
  kit?: { label: string; url: string };
}

export const CHRISTMAS_PLATE: ChristmasCrop[] = [
  {
    name: "Christmas new potatoes",
    role: "The showstopper",
    category: "achievable",
    startVerb: "Plant",
    startBy: { month: 8, day: 31 },
    note: "Cold-stored seed potatoes are sold for exactly this. Plant them in a deep bag by the end of August, keep them fed and watered, and move the bag somewhere frost-free before the first cold snap. Tip them out on Christmas Eve for new potatoes in midwinter — the trick that always gets a reaction round the table.",
    href: "/crops/early-potatoes",
    showstopper: true,
    img: uns("1756361947495-7f56ed41ac38"),
    imgAlt: "Freshly dug new potatoes",
    seedUrl: suttons("christmas+seed+potatoes"),
    kit: { label: "Potato grow bags", url: amazon("potato+grow+bags") },
  },
  {
    name: "Winter salad leaves",
    role: "The fresh green",
    category: "achievable",
    startVerb: "Sow",
    startBy: { month: 9, day: 30 },
    note: "Winter lettuce, lamb's lettuce and land cress are bred to sit quietly through the cold. Sow into a pot or the greenhouse border by the end of September and you'll be picking soft leaves for the table when nothing else is green.",
    href: "/guides/growing-winter-salad-leaves",
    img: "/photos/crops/lettuce-with-marigolds.webp",
    imgAlt: "Soft lettuce leaves growing with marigolds",
    seedUrl: suttons("winter+salad+leaves+seeds"),
    kit: { label: "Garden cloche", url: amazon("garden+cloche+cover") },
  },
  {
    name: "Oriental leaves",
    role: "A little heat",
    category: "achievable",
    startVerb: "Sow",
    startBy: { month: 9, day: 15 },
    note: "Mizuna, mustard and pak choi come fast and take the cold well under a bit of cover. Sow by mid-September for a peppery handful to lift a plate of cold turkey on Boxing Day.",
    href: "/crops/pak-choi",
    img: uns("1770977612447-2e5a525a7e82"),
    imgAlt: "Oriental salad leaves",
    seedUrl: suttons("oriental+leaves+seeds"),
  },
  {
    name: "Radishes",
    role: "The quick garnish",
    category: "achievable",
    startVerb: "Sow",
    startBy: { month: 10, day: 5 },
    note: "The fastest thing here. A winter variety sown under cover into early October gives you crisp, peppery roots — a bright bite next to all that rich food.",
    href: "/crops/radishes",
    img: uns("1755780991082-5e73a0b63ec5"),
    imgAlt: "Bunch of red radishes",
    seedUrl: suttons("winter+radish+seeds"),
  },
  {
    name: "Rocket",
    role: "The pepper",
    category: "achievable",
    startVerb: "Sow",
    startBy: { month: 9, day: 20 },
    note: "Slower and milder in the cold than its summer self, but a September sowing under cover keeps a few sharp leaves coming right through the season.",
    href: "/crops/rocket",
    img: uns("1692606280456-b138e165b11a"),
    imgAlt: "Rocket leaves",
    seedUrl: suttons("rocket+seeds"),
  },
  {
    name: "Spring onions",
    role: "The sharp note",
    category: "achievable",
    startVerb: "Sow",
    startBy: { month: 9, day: 1 },
    note: "Sow a hardy variety by early September and they'll overwinter as slim, mild onions — lovely raw through a winter salad or scattered over mash.",
    href: "/crops/spring-onions",
    img: uns("1602769515559-e15133a7e992"),
    imgAlt: "Slim spring onions",
    seedUrl: suttons("spring+onion+seeds"),
  },
  {
    name: "Baby carrots",
    role: "A sweet gamble",
    category: "achievable",
    startVerb: "Sow",
    startBy: { month: 8, day: 10 },
    note: "Honestly, a bit of a gamble — but a late sowing under cover by mid-August can give you sweet, finger-sized carrots, and the carrot fly has usually lost interest by now. Worth a punt for the pleasure of pulling your own on the day.",
    href: "/crops/carrots",
    img: "/photos/crops/carrots-fresh-harvest.webp",
    imgAlt: "A fresh harvest of carrots",
    seedUrl: suttons("early+carrot+seeds"),
  },
  {
    name: "Pea shoots",
    role: "The tender green",
    category: "indoor",
    startVerb: "Sow",
    note: "A tray of dried peas on a bright windowsill gives you sweet, curling shoots in a fortnight, any time you like. Snip them over the starter and feel unreasonably pleased with yourself.",
    href: "/crops/peas",
    img: "/photos/crops/peas-on-vine.webp",
    imgAlt: "Peas growing on the vine",
    seedUrl: suttons("pea+seeds"),
    kit: { label: "Windowsill seed trays", url: amazon("windowsill+seed+tray") },
  },
  {
    name: "Parsley & soft herbs",
    role: "The finishing touch",
    category: "indoor",
    startVerb: "Sow",
    note: "Pot up parsley, chervil or coriander now and keep them on a cool, bright sill. There's something quietly satisfying about cutting your own herbs for the bread sauce while it sleets outside.",
    href: "/crops/parsley",
    img: uns("1758055660473-a61e426ade6e"),
    imgAlt: "Fresh parsley",
    seedUrl: suttons("parsley+seeds"),
  },
  {
    name: "Mustard & cress",
    role: "The five-minute win",
    category: "indoor",
    startVerb: "Sow",
    note: "The one a child can grow on a saucer. Sow a week before you want it for a fresh green garnish — proof that even in the dark of December, something is growing.",
    href: "/guides/seed-starting",
    seedUrl: suttons("mustard+and+cress+seeds"),
  },
  {
    name: "Brussels sprouts",
    role: "The one everyone pictures",
    category: "next-year",
    startVerb: "Sow",
    note: "The classic — and the one you can't hurry. Sprouts need sowing back in early spring to stand tall by midwinter, so this year they're a shop-bought forgiveness. Make a note for March and next Christmas they're yours.",
    href: "/crops/brussels-sprouts",
    img: uns("1769516909776-cc4179b2826e"),
    imgAlt: "Brussels sprouts on the stalk",
    seedUrl: suttons("brussels+sprout+seeds"),
  },
  {
    name: "Parsnips",
    role: "Sweetened by frost",
    category: "next-year",
    startVerb: "Sow",
    note: "Roast parsnips are all about that frost-sweetened flavour, but they're a slow crop sown in early spring. Nothing to be done for this year — but pencil them in, because a home-grown parsnip is worth the wait.",
    href: "/crops/parsnips",
    img: uns("1741518009653-8c17d00345b8"),
    imgAlt: "Freshly pulled parsnips",
    seedUrl: suttons("parsnip+seeds"),
  },
  {
    name: "Red cabbage",
    role: "The braise",
    category: "next-year",
    startVerb: "Sow",
    note: "That jewel-dark braised cabbage starts life in a spring seed tray. Too late to begin now, so buy a firm one this year and put a reminder in for April.",
    href: "/crops/cabbage",
    img: uns("1772102501296-f50ad1be8d30"),
    imgAlt: "A red cabbage",
    seedUrl: suttons("red+cabbage+seeds"),
  },
];

/** Whole days from `now` to Christmas Day of the current year (min 0). */
export function daysToChristmas(now: Date): number {
  const christmas = new Date(now.getFullYear(), 11, 25);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const ms = christmas.getTime() - startOfToday.getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

/** The honest status of a crop, given today's date. */
export function plateStatus(crop: ChristmasCrop, now: Date): PlateStatus {
  if (crop.category === "indoor") return "always";
  if (crop.category === "next-year") return "next-year";
  if (!crop.startBy) return "start-now";
  const deadline = new Date(now.getFullYear(), crop.startBy.month - 1, crop.startBy.day);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const daysLeft = Math.round((deadline.getTime() - startOfToday.getTime()) / 86_400_000);
  if (daysLeft < 0) return "too-late";
  if (daysLeft <= 14) return "closing";
  return "start-now";
}

/** Days left to begin an achievable crop (null if not applicable). */
export function daysToStart(crop: ChristmasCrop, now: Date): number | null {
  if (crop.category !== "achievable" || !crop.startBy) return null;
  const deadline = new Date(now.getFullYear(), crop.startBy.month - 1, crop.startBy.day);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((deadline.getTime() - startOfToday.getTime()) / 86_400_000);
}
