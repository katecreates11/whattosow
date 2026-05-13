import { crops, type Crop } from "@/data/crops";
import { getCropsForMonth, getAvgFrostDate } from "@/lib/calendar";
import { getCropUrgencies } from "@/lib/urgency";
import { getSeasonName } from "@/lib/seasons";
import { getCropKit } from "@/data/crop-kit";
import { calculateLastFrostDate } from "@/lib/frost";

// ─── Regional frost benchmarks ──────────────────────────────────────────────

/** Representative UK locations spanning the full frost range */
const BENCHMARK_LOCATIONS = [
  { name: "Cornwall", lat: 50.27, lng: -5.05, note: "mildest — coastal Gulf Stream" },
  { name: "London", lat: 51.51, lng: -0.13, note: "urban heat island" },
  { name: "Bristol", lat: 51.45, lng: -2.59, note: "south-west, sheltered" },
  { name: "Birmingham", lat: 52.49, lng: -1.89, note: "midlands" },
  { name: "Manchester", lat: 53.48, lng: -2.24, note: "north-west" },
  { name: "Leeds", lat: 53.80, lng: -1.55, note: "Yorkshire" },
  { name: "Edinburgh", lat: 55.95, lng: -3.19, note: "central Scotland" },
  { name: "Inverness", lat: 57.48, lng: -4.22, note: "Highlands — latest frost" },
] as const;

export interface RegionalFrost {
  name: string;
  lastFrostDate: Date;
  lastFrostFormatted: string;
  note: string;
  daysAfterEarliest: number; // days behind Cornwall
}

function getRegionalFrostData(): RegionalFrost[] {
  const results = BENCHMARK_LOCATIONS.map((loc) => {
    const frostDate = calculateLastFrostDate(loc.lat, loc.lng);
    return {
      name: loc.name,
      lastFrostDate: frostDate,
      lastFrostFormatted: frostDate.toLocaleDateString("en-GB", { day: "numeric", month: "long" }),
      note: loc.note,
      daysAfterEarliest: 0,
    };
  });
  const earliest = Math.min(...results.map((r) => r.lastFrostDate.getTime()));
  for (const r of results) {
    r.daysAfterEarliest = Math.round((r.lastFrostDate.getTime() - earliest) / (1000 * 60 * 60 * 24));
  }
  return results;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  month: number; // 0-11
  year: number;
  publishDate: Date;
  description: string;
  intro: string;
  sowIndoors: CropEntry[];
  directSow: CropEntry[];
  plantOut: CropEntry[];
  closingSoon: ClosingCrop[];
  seasonName: string;
  kitHighlights: string[];
  regionalFrost: RegionalFrost[];
}

export interface CropEntry {
  name: string;
  slug: string;
  category: string;
  tip: string;
  needs: string;
  varieties: { name: string; note: string }[];
  companions: string[];
  hasKit: boolean;
}

export interface ClosingCrop {
  name: string;
  slug: string;
  action: string;
  daysLeft: number;
}

// ─── Month names ─────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const MONTH_SLUGS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
] as const;

// ─── Editorial intros (one per month) ────────────────────────────────────────

const MONTHLY_INTROS: Record<number, string> = {
  0: "January is for planning, not panicking. The soil is cold, the days are short, and the best thing you can do is resist the urge to sow everything. But there are a few crops that actually want to go in now — and getting them started gives you a head start on spring.",

  1: "February is the tease. You get a couple of warm days, the snowdrops are out, and you start thinking about tomatoes. Don't. Stick to the hardy stuff for now — there's plenty to be getting on with, and the soil is finally starting to come alive again.",

  2: "March is when it all kicks off. The soil is warming, the days are stretching, and there's a genuine buzz at the allotment. This is the busiest sowing month of the year — here's exactly what to get in the ground.",

  3: "April is the month that separates the organised from the optimistic. If you started seeds in March, you're potting on and hardening off. If you didn't, don't panic — there's still time for most things. The last frost is close, but it's not gone yet. Keep the fleece handy.",

  4: "The clocks have changed and every evening you get an extra hour at the plot. Use it. May is when the tender stuff finally goes outside, the direct sowing picks up pace, and the allotment starts looking like an actual growing space instead of a mud field.",

  5: "June is the month where the work shifts from sowing to maintenance. Water, weed, feed — and start enjoying the first harvests. There's still plenty to sow for autumn, but honestly, the best thing you can do this month is keep on top of what's already growing.",

  6: "By July you should be harvesting more than you're sowing. But there's still plenty to get in — especially if you want autumn crops. Succession sowing is your friend this month. And if you haven't started your winter brassicas yet, this is your last decent window.",

  7: "August is peak harvest and the start of the big wind-down. The plot is groaning with courgettes, the tomatoes are finally ripening, and there are runner beans coming out of your ears. But don't just harvest — there's a surprisingly good list of things to sow now for autumn and winter eating.",

  8: "September has a lovely, unhurried feel. The frantic sowing season is over, the light is golden, and you're picking more than planting. But there are still a few quick crops worth getting in — and this is the month to start thinking about next year's garlic and broad beans.",

  9: "October is about tidying, clearing, and getting the last bits in before the cold sets in properly. The growing season is winding down but there's a quiet satisfaction in putting the plot to bed well. Plant your garlic now and you'll thank yourself in June.",

  10: "November is honest. The plot looks bare, the days are short, and the glamour is gone. But the people who grow the best food next year are the ones who spend November mulching, composting, and planning. There's still garlic to plant if you haven't already.",

  11: "December is the month where you earn your rest. The plot is dormant, the shed is cold, and the most productive thing you can do is sit by the fire with a seed catalogue and a cup of tea. Order early — the good varieties sell out by January.",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function cropToEntry(crop: Crop): CropEntry {
  return {
    name: crop.name,
    slug: crop.slug,
    category: crop.category,
    tip: crop.tip,
    needs: crop.needs,
    varieties: crop.varieties ?? [],
    companions: crop.companionPlants ?? [],
    hasKit: getCropKit(crop.slug).length > 0,
  };
}

function generateDescription(monthName: string, sowIndoors: CropEntry[], directSow: CropEntry[], plantOut: CropEntry[]): string {
  const total = new Set([
    ...sowIndoors.map((c) => c.name),
    ...directSow.map((c) => c.name),
    ...plantOut.map((c) => c.name),
  ]).size;
  return `What to sow in ${monthName} in the UK — ${total} crops to start this month, with varieties, timing, and honest growing tips.`;
}

// ─── Blog post generation ────────────────────────────────────────────────────

function generatePostForMonth(month: number, year: number): BlogPost {
  const frostDate = getAvgFrostDate(year);
  const { sowIndoors, directSow, plantOut } = getCropsForMonth(month, frostDate);

  const sowIndoorsEntries = sowIndoors.map(cropToEntry);
  const directSowEntries = directSow.map(cropToEntry);
  const plantOutEntries = plantOut.map(cropToEntry);

  // Calculate closing sowing windows at end of month
  const endOfMonth = new Date(year, month + 1, 0); // last day of month
  const { urgent } = getCropUrgencies(crops, endOfMonth, frostDate);
  const closingSoon: ClosingCrop[] = urgent
    .filter((u) => u.daysLeft <= 14)
    .map((u) => ({
      name: u.crop.name,
      slug: u.crop.slug,
      action: u.action,
      daysLeft: u.daysLeft,
    }));

  // Season name from mid-month date
  const midMonth = new Date(year, month, 15);
  const seasonName = getSeasonName(midMonth);

  // Kit highlights — crop slugs that have kit recommendations
  const allCropSlugs = new Set([
    ...sowIndoors.map((c) => c.slug),
    ...directSow.map((c) => c.slug),
    ...plantOut.map((c) => c.slug),
  ]);
  const kitHighlights = Array.from(allCropSlugs).filter(
    (slug) => getCropKit(slug).length > 0
  );

  const monthName = MONTH_NAMES[month];
  const monthSlug = MONTH_SLUGS[month];

  return {
    slug: `what-to-sow-in-${monthSlug}-${year}`,
    title: `What to sow in ${monthName}`,
    month,
    year,
    publishDate: new Date(year, month, 1),
    description: generateDescription(monthName, sowIndoorsEntries, directSowEntries, plantOutEntries),
    intro: MONTHLY_INTROS[month],
    sowIndoors: sowIndoorsEntries,
    directSow: directSowEntries,
    plantOut: plantOutEntries,
    closingSoon,
    seasonName,
    kitHighlights,
    regionalFrost: getRegionalFrostData(),
  };
}

// ─── Generate all posts (Jan 2026 – Dec 2027) ───────────────────────────────

let _allPosts: BlogPost[] | null = null;

export function generateBlogPosts(): BlogPost[] {
  if (_allPosts) return _allPosts;

  const posts: BlogPost[] = [];
  for (let year = 2026; year <= 2027; year++) {
    for (let month = 0; month < 12; month++) {
      posts.push(generatePostForMonth(month, year));
    }
  }

  _allPosts = posts;
  return posts;
}

// ─── Public helpers ──────────────────────────────────────────────────────────

export function getPublishedPosts(): BlogPost[] {
  const now = new Date();
  return generateBlogPosts()
    .filter((post) => post.publishDate <= now)
    .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return generateBlogPosts().find((post) => post.slug === slug);
}

export function getNextPost(slug: string): BlogPost | undefined {
  const posts = generateBlogPosts();
  const now = new Date();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1 || idx >= posts.length - 1) return undefined;
  const next = posts[idx + 1];
  return next.publishDate <= now ? next : undefined;
}

export function getPrevPost(slug: string): BlogPost | undefined {
  const posts = generateBlogPosts();
  const now = new Date();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx <= 0) return undefined;
  const prev = posts[idx - 1];
  return prev.publishDate <= now ? prev : undefined;
}
