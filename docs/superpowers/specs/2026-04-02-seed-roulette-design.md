# The Lucky Dip & My Garden — Design Spec (V4)

## Vision

Two connected features that serve different moods but share one garden:

1. **The Lucky Dip** (`/lucky-dip`) — a gamified discovery tool. Plant a mystery seed, watch it grow, discover a variety you'd never have tried. Collect them all. The fun door.
2. **My Garden** (`/my-garden`) — a living allotment dashboard. Visual plot, real dates, weather intelligence, harvest tracking. The reason people stay.

The Lucky Dip is how people discover crops. The garden is where they plan, track, and manage their real allotment. Both feed into affiliate revenue and email capture.

**The quality bar: people should be utterly charmed.** Every interaction should feel warm, surprising, and worth sharing. Would someone screenshot this and send it to a friend? If not, keep going.

## Phasing

### Phase 1: The Game (this build)
- Lucky Dip with mystery seed reveal
- Variety-level rarity system with weather bonuses
- Card collection with progress tracking
- Basic garden grid — plant collected varieties, track growth stages
- Affiliate links on results and card details
- Email capture via "save your garden"
- Harvest mechanic (tap to pick when ready)

### Phase 2: The Planner (next build)
- Manual crop adding (plan your real allotment, not just Lucky Dip discoveries)
- Custom sow/plant-out dates per crop
- Weather intelligence layer (Open-Meteo integration)
- Watering reminders based on local weather + crop needs
- Frost alerts ("cover your tender crops tonight")
- Extreme weather nudges ("it's been dry for 5 days — your tomatoes need water")
- Dashboard mode — designed to be kept open in a tab, glanceable
- Individual plant detail view with full growing timeline

**The data model is designed for Phase 2 from day one** so nothing needs rebuilding.

---

## Data Model

### Variety Data (`src/data/varieties.ts`)

Every crop in the system is broken down into specific named varieties:

```ts
interface Variety {
  id: string;                    // e.g. "tomatoes-sungold"
  cropSlug: string;              // e.g. "tomatoes" — links to existing crop data
  name: string;                  // e.g. "Sungold"
  rarity: "common" | "uncommon" | "rare" | "legendary";
  personality: string;           // One-liner character description
  recipes: CropRecipe[];         // 1-3 recipes, vary per variety where possible
  seedSuppliers: SeedSupplier[]; // Affiliate links, variety-specific where available
}
```

Rarity distribution across all varieties:
- Common: ~50%
- Uncommon: ~30%
- Rare: ~15%
- Legendary: ~5%

### Garden Data (localStorage, designed for future server sync)

```ts
interface GardenData {
  version: 1;
  postcode: string | null;
  latitude: number | null;
  longitude: number | null;
  collection: CollectedVariety[];
  plots: GardenPlot[];
  lastVarietyId: string | null;  // Prevent repeats
  settings: {
    email: string | null;
    gardenName: string;          // Default: "My Allotment"
    totalSlots: number;          // Starts at 12, unlockable to 24
  };
}

interface CollectedVariety {
  varietyId: string;
  collectedAt: string;           // ISO date
  source: "lucky-dip" | "manual"; // Phase 2 adds "manual"
}

interface GardenPlot {
  slotIndex: number;
  varietyId: string;
  sowDate: string | null;
  plantOutDate: string | null;
  expectedHarvest: string;
  harvested: boolean;
  harvestedAt: string | null;
  notes: string;                 // Phase 2: free text
}
```

---

## Phase 1: The Lucky Dip

### Page: `/lucky-dip`

#### Hero State (before first discovery)

- Headline: "Not sure what to grow?"
- Subtext: "Plant a mystery seed and see what comes up."
- Single prominent button: **"Plant a mystery seed"**
- Below the button: collection progress — "You've discovered 0 of [X] varieties"
- If weather bonus is active, a small badge above the button: "Rain bonus! Moisture-lovers are more likely today" (see Weather Bonuses below)
- No visible crop list. No wheel. No options. Clean, inviting, mysterious.
- Follows existing site design (serif headings, earth tones, Ghibli-warm editorial feel).

#### The Growing Reveal (2-3 seconds)

The animation is the centrepiece. A seed drops into soil, a sprout pushes upward, and it blooms to reveal the variety. No crop names visible during the animation — the reveal IS the moment.

**Rarity integrated into the animation:**
- **Common** — simple green sprout, clean bloom. Label after reveal: *"A good pick."*
- **Uncommon** — slightly more vibrant growth, a subtle sparkle at the bloom. Label: *"Nice find!"*
- **Rare** — golden tinge as it grows, the bloom has a warm glow. Label: *"Rare find!"*
- **Legendary** — the sprout grows slower (builds tension), golden light radiates outward from the soil, the bloom has a pulsing gold burst. **Hold the reveal for an extra beat** — let the moment breathe before the card appears. Label: *"Legendary!"*

**Common varieties are never a consolation prize.** The label "A good pick" is warm, not dismissive. The classics are classics for a reason — the writing on the result card should make every variety feel worth discovering.

**Technical:**
- CSS keyframes only. Gold effects via `radial-gradient` and `box-shadow`. No canvas, no WebGL, no Framer Motion.
- **Tap to skip:** tapping/clicking anywhere during animation jumps to the result. Essential for repeat visits. Tracks `lucky-dip-animation-skip` event.
- **`prefers-reduced-motion`:** skips animation entirely, shows result immediately with a gentle fade-in.

#### First-Time Experience

The first discovery MUST be magical. Research shows users are 3x more likely to return if the first interaction delivers a dopamine hit.

- **First discovery = guaranteed uncommon or better.** Never a common on your first go. (Beginner's luck.)
- After the reveal: a warm welcome — *"Welcome to your garden. You've planted your first seed."*
- The garden auto-opens with this one variety already planted in the first slot. The garden starts with ONE plant, not empty. Empty feels cold. One plant feels like the beginning of something.
- Collection counter appears: "1 of [X] varieties discovered"

#### Result Card (replaces hero)

Section order designed for conversion — urgency → purchase → aspiration → engagement.

**a. Variety card**
- Variety name (large, serif heading) + crop name (smaller, below)
- Crop illustration (generated by Kate) with rarity border:
  - Common: earth-toned border
  - Uncommon: green border, subtle CSS sheen
  - Rare: gold border
  - Legendary: animated shimmer border (`background: linear-gradient` animation on `background-position`)
- Variety personality one-liner in italic
- Category badge (hardy / half-hardy / tender / fruit)
- If seasonal: **"Last chance — 5 days left to sow"** countdown badge, or **"Just arrived!"** for newly available varieties

**b. "Why now"**
- 1-2 sentences on why this is the right time to sow this variety
- Generated from crop data: sowing window relative to current month and frost dates
- Creates urgency: "you should do this now"

**c. Buy seeds — THE MONEY SECTION**
- Immediately after urgency — tightest point in the funnel
- **"Get the seeds"** — prominent, tactile buttons for each supplier
- Variety-specific affiliate links where available, crop-level fallback
- Umami event: `lucky-dip-affiliate-click` with `{ variety, rarity, supplier }`

**d. Quick stats**
- Time to harvest (weeks), spacing (cm), difficulty (easy / moderate / tricky)
- Compact 2x2 grid on mobile, inline on desktop

**e. "What you'll be eating" (recipes as aspiration)**
- 1-3 recipes per variety (not a fixed number — quality over quantity)
- Recipes vary by variety where genuinely different (Sungold pasta ≠ beefsteak bruschetta). Where varieties don't differ culinarily, share the crop-level recipes. Authenticity beats completeness.
- Tone: warm, simple, grounded. Makes you want to cook it. Not a Nigel Slater impression — our own voice. Simple food described with enough feeling that you can taste it.
- Positioned AFTER the affiliate CTA — these reinforce the purchase, not delay it

**Tone examples:**

*Fruit (strawberries — Elsanta):*
"Strawberries and cream — the real kind. A bowl of berries still warm from the afternoon sun, a spoonful of cold double cream, and nothing else. This is what June should taste like."

*Root veg (carrots — Autumn King):*
"Roasted carrots with honey and thyme — scrub them, halve lengthways, toss in oil with a drizzle of honey and a few thyme sprigs. Roast until the edges go sticky and dark. Better than any side dish has a right to be."

*Unglamorous veg (Brussels sprouts — Brodie):*
"Shredded sprouts with bacon and chestnuts — slice them thin, fry fast in a hot pan with chopped bacon until the edges crisp, then toss through some broken chestnuts. The dish that converts sprout haters."

**f. Add to your garden**
- "Plant this in your garden" button
- Micro-interaction: the card visually shrinks and "drops" into a soil slot with a satisfying settle animation
- If garden is full: "Your allotment is growing! Harvest something or expand your plot to make room." (Framed as progress, not restriction)
- If already planted: "Already growing in your garden — check on it?"

**g. Full growing guide link**
- "Read the full growing guide →" linking to `/crops/[slug]`

**h. Email capture**
- "Get a mystery seed every week" inline signup
- OR "Save your garden" if they have unsaved garden data (more compelling — it's a feature, not marketing)
- Uses existing EmailCapture component + `/api/subscribe` endpoint

**i. Discover another seed**
- Below the fold, after all content. People must engage with the result first.
- Button text: **"Plant another mystery seed"**
- Sticky header also shows a subtle **"Another seed"** link after first result — always reachable without scrolling

### Selection Logic

- Only picks varieties whose parent crop is currently sowable (extracted to `src/lib/sowable.ts` from existing `isSowableNow` logic)
- **Base rarity weight:** common 50%, uncommon 30%, rare 15%, legendary 5%
- **First discovery:** guaranteed uncommon or better (beginner's luck)
- **Weather bonuses:** see Weather Bonuses section below
- **Seasonal scarcity:** varieties in their last 2 weeks of sowing window get bumped up one rarity tier visually + countdown badge: "5 days left to sow." Varieties in their first 2 weeks get "Just arrived!" label (no tier change).
- **Monthly special:** on the 1st of each month, one specific variety is available for that day only. Labelled "Monthly special — today only!" Rotates each month. Always uncommon or better.
- **Photo weight:** varieties whose parent crop has a hero photo get 2x selection weight
- Won't repeat the same variety twice in a row (stored in `lastVarietyId`)
- If nothing is sowable (deep winter): friendly message + email signup + calendar link + "The garden rests in winter — check back in [next month when something becomes sowable]"

### Weather Bonuses

Real-time weather at the user's postcode affects which varieties are more likely to appear. This ties the game to reality and creates a daily check-in habit — "the drops are different today."

| Weather Condition | Bonus | Badge on Hero | Affected Varieties |
|-------------------|-------|--------------|-------------------|
| Raining | 2x weight for moisture-lovers | "Rain bonus!" | Peas, broad beans, lettuce, spinach, brassicas |
| Sunny & warm (>18°C) | 2x weight for sun-lovers | "Sun bonus!" | Tomatoes, peppers, sweetcorn, courgettes, aubergine |
| Cold snap (<5°C) | Unlocks hardy legendaries not normally available | "Frost special!" | Heritage hardy varieties only |
| First of the month | Monthly special variety (one day only) | "Monthly special!" | One specific variety, rotates monthly |

- Weather data fetched from Open-Meteo API using stored postcode (or IP-based rough location if no postcode)
- Cached in localStorage with 3-hour TTL
- If weather API is unavailable, no bonus shown — base selection logic applies silently

---

## Phase 1: Card Collection

### Page: `/my-garden` (collection tab)

All varieties the user has discovered, presented as collectible cards grouped by crop type.

#### Layout
- Crop type headers: "Tomatoes (3 of 6)", "Strawberries (1 of 4)", etc.
- Collected varieties: mini cards with illustration + rarity border
- Undiscovered varieties: **dark silhouettes with "?"** — the silhouette uses the same crop illustration but heavily darkened and desaturated. Shapes should be distinct enough to tease what's inside (a tomato silhouette looks different from a carrot silhouette).
- Overall progress bar at top: "27 of 142 varieties discovered"
- **Trending indicator** on 1-2 undiscovered cards: "Most collected this week" (hardcoded initially, derived from Umami data later)
- 2 columns on mobile, 3 on tablet, 4 on desktop

#### Card Detail (tap a collected card)
- Full variety card: illustration, name, personality one-liner, rarity border
- Recipes for this variety
- **Affiliate links** — second-chance conversion point. Same "Get the seeds" buttons.
- Growing guide link → `/crops/[slug]`
- "Plant in garden" button
- Date collected
- Umami events: `card-detail-view`, `card-detail-affiliate-click`

---

## Phase 1: Garden Grid

### Page: `/my-garden` (garden tab)

A top-down visual allotment plot where collected varieties are planted and grow in real time.

#### Visual Design
- **Illustrated allotment border** — a warm wooden raised-bed frame with hints of path edges and woodchip. Kate generates this as a single background illustration. The grid lives INSIDE this frame. It should feel like looking down at a real allotment, not a spreadsheet.
- **Empty slots:** bare soil texture (also illustrated)
- **Planted slots:** crop illustration in a growth stage with CSS transitions between stages

#### Growth Stages (CSS, no extra assets)
- **Seed** (just planted): 30% scale, sepia filter, low opacity. Feels small and buried.
- **Growing** (mid-way to harvest): 70% scale, slightly desaturated. Feels alive and pushing upward.
- **Ready to harvest**: 100% scale, full colour, subtle pulse/bounce animation. Feels like it's saying "pick me!"
- Stage calculated from: `sowDate + (harvestWeeks × 7 days)`. Seed → Growing at 33% through. Growing → Ready at 100%.

#### Micro-Interactions
- **Planting:** card shrinks and drops into the soil slot with a settle animation
- **Growth stage change:** when you visit and a crop has progressed, subtle sparkle/shimmer on the updated plant
- **Harvest ready:** gentle pulse on the crop icon
- **Harvesting:** crop lifts out of the soil with a small pop, counter ticks up: "9 crops harvested this season"
- All CSS transitions/keyframes. Small, warm, not overwrought.

#### Slot System
- **Start with 12 slots** — the grid only shows earned slots, not locked empty ones
- Unlock 4 more by saving garden (email capture): *"Your allotment is thriving! Save your garden and unlock a new raised bed."*
- Unlock 4 more by sharing: *"Share with a fellow grower and expand your plot"*
- Maximum 24 slots in v1
- Grid adapts: 3 columns on mobile, 4 on tablet/desktop. Rows grow as slots are unlocked.

#### Tap a Planted Crop
Opens an overlay/panel showing:
- Variety name, illustration, rarity
- Sow date, expected harvest date
- Quick stats
- Affiliate link ("Need more seeds?")
- Link to full growing guide

#### Harvest Mechanic
When a crop reaches its harvest date:
- Pulse animation on the garden grid
- Tap → harvest animation (pop out of soil)
- Result screen: recipes for this variety + **"Grow it again next year — get the seeds"** affiliate link + **"Discover something new"** link back to Lucky Dip
- Moves to the Harvested Log

#### Harvested Log
- Simple list: variety name, date planted, date harvested, days grown
- "Grow again?" button with affiliate link per variety
- Running total: "You've harvested 12 crops this season"
- Satisfying and motivating — visible proof of what you've grown

---

## Phase 2: Garden Planner (future build, data model ready now)

### Manual Crop Adding
- "Add a crop" button on the garden grid
- Browse/search all varieties (not just collected ones)
- Set custom dates: date sown, date planted out
- Expected harvest auto-calculated

### Weather Intelligence
- Open-Meteo API using stored postcode/lat/lng
- **Dashboard banner** at top of garden page:
  - Current conditions: temp, rain forecast, wind
  - Contextual nudges specific to planted crops:
    - "No rain forecast for 4 days — your courgettes and tomatoes will need watering"
    - "Frost warning tonight (2°C) — cover your tender crops or bring pots inside"
    - "Heavy rain expected tomorrow — hold off watering today"
    - "Perfect planting weather this weekend — mild, damp, overcast"
  - Calm and glanceable — think weather app, not notification centre. One banner, soft colours.

### Individual Plant View
- Full timeline: date sown → planted out → growing → expected harvest
- Weather history since planting
- Crop-specific advice based on current conditions
- Notes field (free text)
- Affiliate link to buy more / related products

### Dashboard Mode
- "Keep open in a tab at work and check at lunch"
- Glanceable: what needs watering, what's ready to harvest, any weather alerts
- Auto-refreshes weather every few hours
- Light, fast, minimal

---

## Rarity System

### Base Tiers

| Tier | Base Weight | Visual Treatment | Card Label | Example Varieties |
|------|-----------|-----------------|-----------|-------------------|
| Common | 50% | Earth-toned border | "A good pick." | Victoria rhubarb, Kelvedon Wonder peas, Feltham First peas |
| Uncommon | 30% | Green border + subtle CSS sheen | "Nice find!" | Gardener's Delight tomato, Elsanta strawberry, Glen Ample raspberry |
| Rare | 15% | Gold border | "Rare find!" | Sungold tomato, Tulameen raspberry, Big Ben blackcurrant |
| Legendary | 5% | Animated shimmer border | "Legendary!" | Champagne rhubarb, Glass Gem sweetcorn, Crimson Flowered broad beans |

### Modifiers

- **First discovery:** guaranteed uncommon or better (beginner's luck)
- **Weather bonus:** 2x weight for weather-appropriate varieties (see Weather Bonuses)
- **Seasonal scarcity:** last 2 weeks of sowing window → visual tier bump + countdown ("5 days left")
- **Monthly special:** 1st of each month, one variety available that day only
- **Frost special:** cold snaps unlock hardy legendaries not normally in rotation

### Rarity Assignment Principles
- Heritage/unusual varieties → rare or legendary
- Workhorse reliable varieties → common or uncommon
- Varieties with great stories or names → bump up
- At least one legendary per crop type
- Every variety should feel worth discovering — commons need the best writing to compensate

### Variety Personality Guidelines

Every variety gets a one-liner personality. These are character descriptions, not growing tips.

- **Make you want to grow it**, not just describe it
- "Heavy cropper, good disease resistance" = data sheet (NO)
- "Produces so many raspberries you'll run out of bowls by August" = personality (YES)
- **Legendaries get the best writing.** These are the ones people screenshot: *"Champagne rhubarb — the one the Yorkshire forcing sheds keep behind locked doors. Pale pink stems, barely any tartness, forces beautifully. If you get this one, you've won."*
- **Commons need positive framing.** Never a consolation prize: *"Kelvedon Wonder — the pea that every allotment in Britain grows, and for good reason. Reliable, sweet, and ready in 12 weeks. Sometimes the classics are all you need."*
- Allow 1-3 recipes per variety. A single great description beats three thin ones. Don't force three for fennel.

---

## Illustrations (Kate generates with Nano Banana)

### What's needed
- **~20 base crop illustrations** in a consistent warm, flat, slightly whimsical style
- Palette: cream background (#F5EFE0), earthy greens, warm amber/rust tones. Ghibli-inspired warmth.
- One illustration per crop type — varieties share the illustration
- Must work at card size (120px) and garden size (80px)
- Growth stages handled by CSS (scale + filter), not separate illustrations

### Crop illustration list
1. Tomato
2. Strawberry
3. Pea (in pod)
4. Carrot
5. Courgette
6. Lettuce
7. Sweetcorn
8. Pumpkin/squash
9. Raspberry
10. Blackcurrant
11. Gooseberry
12. Rhubarb
13. Broad bean
14. Onion
15. Beetroot
16. Pepper/chilli
17. Cucumber
18. Broccoli/brassica
19. Herb bundle (basil/parsley/coriander)
20. Sunflower

### Special assets
- **Mystery seed** — for the Lucky Dip button and the animation start
- **Soil/plot texture** — for empty garden slots
- **Allotment border** — wooden raised-bed frame for the garden grid background
- **Card back** — face-down state (future use)

---

## Technical Architecture

### State Management
- All state in localStorage via `useGarden()` custom hook
- React state for UI, debounced sync to localStorage every 2 seconds or on blur
- Version field enables future migration without data loss
- Handle edge cases: localStorage full, private browsing (localStorage may be disabled), corrupted data (validate on read, reset gracefully)

### Bundle Strategy
- Lucky Dip page: hero + button = tiny initial load
- Variety data + recipe data: loaded via dynamic import after first button tap
- Garden page: grid renders from localStorage immediately, variety metadata loaded for display
- Recipe data: lazy loaded per variety on card detail view

### Animation
- CSS keyframes only. No Framer Motion, no external libraries.
- Legendary shimmer: `@keyframes shimmer` with animated `background-position` on `linear-gradient`
- Growth transitions: `transition` on `transform`, `filter`, `opacity`
- Micro-interactions (plant, harvest): CSS `@keyframes` with `animation-fill-mode: forwards`
- Test on real iPhone (Safari handles CSS filters differently — sepia + opacity can flicker on older iOS)

### Weather Integration
- Open-Meteo API (already in the project for frost calculations)
- Fetch current conditions on Lucky Dip page load if postcode is stored
- Cache in localStorage with 3-hour TTL
- Fallback: if API unavailable, no weather bonus shown, base selection applies silently

### Shared Utility
- Extract `isSowableNow` from `CropIndex.tsx` into `src/lib/sowable.ts` — used by both Lucky Dip selection and still-time page

---

## Analytics Events

### Phase 1

| Event | Properties | Purpose |
|-------|-----------|---------|
| `lucky-dip-discover` | `{ variety, rarity, cropSlug, weatherBonus }` | Discovery rate and distribution |
| `lucky-dip-affiliate-click` | `{ variety, rarity, supplier }` | Revenue per variety |
| `lucky-dip-animation-skip` | `{}` | Is animation too long? (>40% skip = shorten it) |
| `lucky-dip-another` | `{ previousVariety }` | Loop engagement |
| `lucky-dip-email-signup` | `{ variety }` | Email capture from Lucky Dip |
| `lucky-dip-result-scroll-depth` | `{ depth }` | Are people reaching the recipes? The affiliate links? |
| `collection-view` | `{ totalCollected, percentComplete }` | Collection depth |
| `card-detail-view` | `{ variety, rarity }` | Which cards interest people |
| `card-detail-affiliate-click` | `{ variety, supplier }` | Second-chance conversions |
| `garden-plant` | `{ variety, rarity, slotIndex }` | What gets planted |
| `garden-harvest` | `{ variety, daysGrown }` | Harvest engagement |
| `garden-harvest-affiliate-click` | `{ variety, supplier }` | "Grow again" conversions |
| `garden-save-email` | `{}` | Email from save mechanic |
| `garden-slot-full` | `{ totalSlots }` | When to prompt expansion |
| `garden-slot-unlock` | `{ method }` | Which unlock method works |

### Phase 2 (planned)

| Event | Properties | Purpose |
|-------|-----------|---------|
| `garden-manual-add` | `{ variety }` | Planner usage |
| `garden-weather-view` | `{ nudgeType }` | Dashboard engagement |
| `garden-weather-action` | `{ nudgeType, variety }` | Do nudges drive action? |

---

## SEO

- `/lucky-dip` targets: "what to grow now UK", "what should I plant", "random vegetable to grow", "seed lucky dip", "garden lucky dip"
- `/my-garden` targets: "allotment planner", "garden planner UK", "what to plant in my garden"
- Static hero content on Lucky Dip is indexable by Google
- Result states are client-rendered (hero provides the SEO value)
- Sitemap entries for both pages
- OG images for social sharing (Lucky Dip: the mystery seed illustration. Garden: the allotment border illustration)

## Revenue Summary

| Touchpoint | Mechanic |
|-----------|---------|
| Lucky Dip result | Affiliate links immediately after urgency ("Why now" → "Get the seeds") |
| Card detail view | Second-chance affiliate links from collection |
| Garden harvest | "Grow it again" affiliate link at the emotional peak |
| Rarity chase | More discoveries = more affiliate exposure |
| Seasonal scarcity | "5 days left" countdown drives urgency to buy now |
| Weather bonuses | Daily check-in habit = daily affiliate exposure |
| Email capture (save garden) | Weekly mystery seed email with affiliate links (sends are Phase 2) |
| Email capture (unlock slots) | Same list, different trigger |
| Monthly specials | FOMO on one-day-only varieties drives same-day visits |

## Navigation

- Add "Lucky Dip" and "My Garden" to site header navigation
- Cross-link from homepage, guides, blog posts, and crop pages
- Lucky Dip → garden: "Plant this in your garden"
- Garden → Lucky Dip: "Discover new varieties"
- Crop pages → Lucky Dip: "Feeling lucky? Try the Lucky Dip"
- After harvest → Lucky Dip: "Discover something new"

## Mobile

- Lucky Dip animation: vertically oriented, full-width
- Result card: all affiliate buttons full-width stacked
- Garden grid: 3 columns on mobile, 4 on tablet/desktop. Rows grow as slots unlock.
- Collection: 2 columns mobile, 3 tablet, 4 desktop
- Sticky "Another seed" link in header on Lucky Dip (saves scrolling back up)
- Dashboard nudges (Phase 2): compact banner, swipeable if multiple

## Out of Scope (v1)

- Social features (sharing collections, visiting friend's gardens)
- Leaderboards
- Sound effects
- Paid features / premium tiers
- Native app
- Automated mystery seed email sends (signup form is in scope, automated sends are not)
