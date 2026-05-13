# My Allotment — V5 Design Spec (reviewed)

## The Shift

This is not a game with gardening flavour. It is a **real-time gardening dashboard** that is so charming and well-designed that using it feels like playing a game.

The value is real: it tells you what to plant, when to water, when to harvest, and warns you about weather. The delight is in the presentation: a visual garden plot, collectible variety cards, satisfying interactions, beautiful illustrations.

**If you stripped away all the gamification, it should still be the best allotment planning tool in the UK.** The gamification makes people love it. The utility makes them need it.

## What It Does

### 1. Knows where you are

**Onboarding shows value BEFORE asking for commitment.** Before the postcode input, show:
- Auto-detected rough location (IP-based): "It looks like you're in the South West"
- Current temperature and conditions
- "23 varieties are ready to sow near you right now"

Then: "Enter your postcode for personalised frost dates and weather alerts."

This proves the tool is useful before asking for anything. The postcode input should feel like the start of an adventure, not a form.

From that postcode, the tool knows:
- Your last frost date (already calculated)
- Your current weather (Open-Meteo API — already integrated)
- Your forecast for the next 7 days
- What's sowable RIGHT NOW in your specific area

After entering postcode: immediately show the empty garden with weather banner. "Your allotment is ready. It's 14°C and sunny in Bristol." Feel like you're already there. THEN prompt to plant the first seed.

### 2. Shows you what to grow right now

Based on your location and the current date:
- "It's April in Bristol. Here's what you can sow this week."
- A curated list of varieties that are perfect for your conditions right now
- Each one has a reason: "Sow indoors now, plant out after your last frost (April 18th)"
- This is the Lucky Dip discovery — but grounded in real, personalised advice

Two ways to add crops:
- **Lucky Dip** — mystery variety, surprise reveal, rarity system. The fun discovery mechanic. **Stays prominent for the first 3-4 crops** — this is how new users discover the tool. After that, Browse becomes the primary method.
- **Browse & Choose** — search or browse all sowable varieties. Pick exactly what you want. Becomes the main method once users have a few crops and know what they're looking for.

### 3. Records what you've planted

When you plant (in real life), you log it in the tool:
- Which variety
- Date sown
- Where (indoors / direct sow)
- Expected plant-out date (calculated from your frost date)
- Expected harvest date (calculated from crop data)

This becomes your garden diary — a real record of your growing season.

### 4. Becomes a live dashboard

Once you have crops planted, the tool transforms into a daily companion:

**Weather bar (always visible):**
- Current temperature, rainfall, conditions at your postcode
- Today's gardening advice: "Dry and warm — good growing weather" or "Rain expected this afternoon — hold off watering"

**Your planted crops, each showing:**
- Variety name and illustration
- Days since sowing → expected harvest (visual progress bar)
- Current status: seedling / growing / nearly ready / harvest time
- Weather happiness: is this crop okay in today's conditions?
  - Sun-lover in sunshine → green happy indicator
  - Frost-sensitive with frost warning → red alert
  - Needs water + no rain for 3 days → amber water warning
- Tap for full details: sowing date, expected dates, growing tips, affiliate links

**Action alerts — capped at 2 visible, "see all" for the rest:**
- Maximum 2 alerts shown at the top. No wall of warnings.
- Prioritised by urgency: frost alerts > water alerts > harvest ready > sowing suggestions > general tips
- **Voice = friendly allotment neighbour**, not notification system:
  - NOT: "Water your tomatoes — no rain for 4 days"
  - YES: "Your tomatoes are thirsty — it's been dry since Monday. A good soak this evening will keep them happy."
  - NOT: "Frost risk tonight"
  - YES: "Chilly tonight — your runner beans and courgettes would appreciate some fleece or a move indoors."
- Tap an alert to see affected crops highlighted in the grid

**Rain auto-updates watering state:**
- If it rains significantly (>2mm) at the user's postcode, all outdoor crops get their `lastWatered` updated automatically
- Cross-reference Open-Meteo precipitation history when calculating watering alerts
- Don't show "water your crops" if it rained yesterday

**Weekly summary:**
- "This week on your allotment: sow lettuce succession, thin carrot seedlings, stake your tomatoes, harvest peas"
- 3-4 actionable tasks + 1 seed suggestion (affiliate link)
- Displayed on the dashboard AND used as weekly email content (for users who signed up)
- This is the email people actually want — real value with a monetisation layer

### 5. The garden visualisation

The visual plot is the INTERFACE to all of this. Not decoration — the actual way you interact with your data.

**Tile visual hierarchy — two levels:**

**At a GLANCE (the grid view):**
- Crop illustration at growth stage
- Health border colour: green (fine) / amber (needs attention) / red (act now)
- That's it. You scan your whole garden in 2 seconds and know what needs doing.

**On TAP (expanded detail panel):**
- Variety name, personality, rarity
- Progress bar: sow date → now → harvest date
- Status message: "Loving the sunshine" / "Could use some water"
- Weather relationship: how this crop feels about today
- Action buttons: "I just watered this", "Harvest", "View growing guide"
- Recipes and affiliate links

**Mobile interactions:**
- **Short tap** → open detail panel
- **Long press** → quick water action (one-gesture watering, most common action)
- **Swipe right on harvest-ready crop** → harvest with celebration

**Empty tiles suggest what to plant:**
- Not just a "+" icon — contextual suggestions based on your weather and what you haven't planted
- "Good day for broad beans" / "Try lettuce — ready in 6 weeks"
- Tap → choice: Lucky Dip or Browse

**Harvest celebrations scale with grow time:**
- A crop you grew for 14 weeks gets a bigger, more dramatic celebration than a quick 4-week radish
- The longer you waited, the more satisfying the payoff
- This rewards patience and makes slow crops feel worth it

**Crops visually respond to care:**
- Watered crops look vibrant and perky (full saturation, slight scale boost)
- Unwatered crops in dry weather look slightly wilted (desaturated, slight droop)
- The visual difference IS the feedback loop — you see the impact of your care

### 6. The gamification layer (wraps around everything above)

**Discovery / Lucky Dip:**
- Mystery variety selection when you tap an empty plot
- Rarity system (common → legendary)
- Weather bonuses (rain day = moisture lovers more likely)
- Seasonal scarcity (last 2 weeks to sow = "Last chance!")
- Prominent for first 3-4 crops, then gives way to Browse as primary

**Rarity is educational, not arbitrary:**
- Legendary varieties are genuinely special heritage varieties
- "Champagne rhubarb — legendary because it's a genuine heritage variety that most gardeners never get to try"
- The rarity teaches you about interesting varieties, not just game mechanics

**Collection:**
- Every variety you plant gets added to your collection
- View all discovered varieties as cards with rarity borders
- Progress tracking: "42 of 182 varieties discovered"
- Personality descriptions and recipes on each card
- Affiliate links to buy seeds

**Harvest tracking:**
- When a crop is ready, harvesting it is satisfying (animation scales with grow time)
- Harvest log shows everything you've grown this season
- "Grow again?" links with affiliate purchase

**The gamification makes the tool DELIGHTFUL. But remove it and the tool still works.**

---

## Page Structure

### Two pages:

**`/lucky-dip`** — SEO landing page (PUBLIC, no postcode needed)
- Introduces the concept: "Not sure what to grow? Discover your next crop."
- Shows what's currently sowable across the UK (generic, not personalised)
- Fun entry point — try one Lucky Dip without signing up
- Funnels to `/my-garden` for the full personalised experience
- Ranks for: "what to plant now UK", "what to grow this month", "random vegetable to grow"

**`/my-garden`** — The main experience (PERSONALISED, needs postcode)
- The unified dashboard: weather, garden grid, alerts, collection, harvest log
- Everything described in this spec lives here
- One page, one home, one experience

---

## Alerts System

Alerts are the killer feature. They turn a passive record into an active companion.

### Water alerts:
- Track `lastWatered` per crop
- Cross-reference Open-Meteo precipitation history — rain counts as watering for outdoor crops
- Calculate `drySpell` from weather data
- Alert when: no rain AND not manually watered for 3+ days AND temperature > 15°C
- Voice: "Your tomatoes are thirsty — it's been dry since Monday. A good soak this evening will keep them happy."
- User action: tap "watered" on crop → satisfying watering animation → record date

### Frost alerts:
- Check forecast min temp < 2°C in next 24 hours
- Only for tender and half-hardy crops
- Voice: "Chilly tonight — your courgettes and runner beans would appreciate some fleece or a move indoors."
- Priority: HIGH — always shown first

### Harvest alerts:
- When expectedHarvest date has passed
- Voice: "Your peas have been ready for 3 days — pick them while they're sweet!"
- Priority: MEDIUM

### Blight alerts:
- Warm (>20°C) + humid (>80%) + wet conditions persisting 48h+
- Only for crops with `blightRisk: true` (tomatoes, potatoes)
- Voice: "It's been warm and muggy — keep an eye on your tomatoes for any brown spots on the leaves."
- Priority: HIGH

### Sowing suggestions:
- Based on what's newly sowable this week + what the user hasn't planted
- Voice: "Good week to get some lettuce going — they'll be ready by June."
- Priority: LOW — shown when no higher-priority alerts

---

## Data Architecture

### What we already have (reuse everything):
- `src/data/varieties.ts` — 182 varieties with personalities, recipes, affiliate links ✓
- `src/data/crops.ts` — 48 crops with sowing windows, harvest weeks, spacing ✓
- `src/lib/sowable.ts` — isSowableNow, daysLeftToSow ✓
- `src/lib/frost.ts` — calculateLastFrostDate from lat/lng ✓
- `src/lib/weather-bonus.ts` — current weather from Open-Meteo ✓
- `src/lib/garden-storage.ts` — localStorage persistence ✓
- `src/hooks/useGarden.ts` — React state management ✓
- `src/lib/lucky-dip-selection.ts` — rarity-weighted variety selection ✓

### What we need to add:

**Weather intelligence layer** (`src/lib/weather-intelligence.ts`):
```ts
interface WeatherState {
  temperature: number;
  rain: number;           // mm in last 24h
  rainForecast: number;   // mm expected next 24h
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  frostRisk: boolean;     // min temp < 2°C in next 24h
  blightRisk: boolean;    // warm + humid + wet for 48h+
  drySpell: number;       // consecutive days without >2mm rain
  recentRain: boolean;    // >2mm in last 24h (auto-waters outdoor crops)
}

interface GardenAlert {
  type: "water" | "frost" | "harvest" | "blight" | "plant" | "general";
  priority: "high" | "medium" | "low";
  message: string;        // friendly allotment-neighbour voice
  affectedVarietyIds: string[];
}

function getWeatherState(lat: number, lng: number): Promise<WeatherState>
function generateAlerts(weather: WeatherState, plots: GardenPlot[], crops: Crop[]): GardenAlert[]
```

**Crop health assessment** (`src/lib/crop-health.ts`):
```ts
type CropStatus = "thriving" | "happy" | "okay" | "needs-attention" | "alert";

function assessCropHealth(
  variety: Variety,
  crop: Crop,
  plot: GardenPlot,
  weather: WeatherState
): {
  status: CropStatus;
  statusMessage: string;    // "Loving the sunshine" / "Could do with a drink"
  growthPercent: number;     // 0-100 based on sow date + harvest weeks
  daysToHarvest: number;
  actions: string[];         // ["Water today", "Check for pests"]
}
```

**Weather caching:**
- Cache weather state in localStorage with 30-minute TTL
- Forecast cached with 1-hour TTL
- Precipitation history cached with 6-hour TTL
- Alert computation runs client-side from cached weather — no API call per alert

### Enhanced GardenPlot:
```ts
interface GardenPlot {
  slotIndex: number;
  varietyId: string;
  sowDate: string;
  sowLocation: "indoors" | "direct" | null;
  plantOutDate: string | null;
  expectedHarvest: string;
  harvested: boolean;
  harvestedAt: string | null;
  lastTended: string | null;
  lastWatered: string | null;
  notes: string;
}
```

---

## The Phaser Game Canvas

### Empty tile:
- Textured soil with contextual suggestion text
- "Sow broad beans" / "Try lettuce" — based on what's ideal today for this postcode
- Gentle pulse to invite interaction
- Tap → choice: Lucky Dip or Browse

### Planted tile — at a glance:
- Crop illustration at growth stage (CSS scale + filter, or sprite when art ready)
- Border colour = health status (green / amber / red)
- Nothing else visible — the tile is a traffic light

### Planted tile — on tap:
- Detail panel slides up with full info
- Progress bar, status message, weather relationship
- Action buttons: water, harvest, view guide
- Recipes, affiliate links

### Planted tile — watered vs not:
- Watered: vibrant, full saturation, slight scale boost
- Dry spell + not watered: slightly desaturated, subtle droop
- Visual feedback makes you want to care for your plants

### Planted tile — ready to harvest:
- Full-size illustration, vibrant
- Pulsing glow (intensity scales with grow time: 14 weeks = big glow, 4 weeks = gentle)
- "Ready!" indicator
- Tap → harvest celebration (also scales with grow time)

### Weather overlay (in the canvas):
- Top strip: temperature + weather icon + location name
- If high-priority alert: coloured strip (amber/red) with message (max 2)
- Part of the game world, not a separate React element

---

## Mobile Experience

This must work brilliantly on a phone at the allotment:

- Weather + alerts compact at top (glanceable)
- Garden grid fills screen (3-4 columns)
- Short tap → detail panel (bottom sheet)
- Long press → quick water (most common action, one gesture)
- Swipe right on harvest-ready → harvest
- "I just watered" button prominent on every crop detail panel
- Works offline with cached data (weather updates when online)

---

## Revenue

| Touchpoint | Mechanic |
|-----------|---------|
| Seed suggestions on empty tiles | "Sow broad beans this week" → affiliate link |
| Lucky Dip discovery | Every result → affiliate link |
| Card collection detail view | Second-chance affiliate link |
| Harvest celebration | "Grow this again next year?" → affiliate link |
| Weekly summary email | "Seeds to order this week" → affiliate links |
| Browse varieties | Every variety card → affiliate link |
| Kit recommendations | "You'll need a propagator for these" → affiliate link |
| Sowing suggestion alerts | "Good week for lettuce" → affiliate link to buy seeds |

---

## What Stays From Previous Builds

Everything in the data layer:
- 182 varieties with personalities, recipes, rarity, affiliate links ✓
- Selection logic with weather bonuses and rarity ✓
- Garden storage with localStorage persistence ✓
- Crop data with sowing windows and harvest weeks ✓
- Frost calculations and weather API integration ✓
- Phaser.js canvas (restructured, not rebuilt) ✓
- Collection grid and card detail components ✓

## What Changes

- `/lucky-dip` becomes a lightweight SEO landing page
- `/my-garden` becomes the unified experience
- Weather intelligence layer built and integrated (not Phase 2)
- Alerts system built and visible from day one
- Every tile shows real data with health status
- Empty tiles show personalised suggestions
- Rain auto-updates watering state
- Alerts capped at 2 with friendly voice
- Mobile gestures: long-press to water, swipe to harvest
- Harvest celebrations scale with grow time
- Crops visually respond to care (watered = vibrant, neglected = wilted)

## What's Needed Before Building

1. Kate's Nano Banana illustrations (crop sprites, soil tiles, UI elements)
2. Updated implementation plan from this spec
3. Weather intelligence module built first (it's the core)

---

## Success Metrics

| Metric | What it tells us |
|--------|-----------------|
| Return visits per week | Is the dashboard compelling enough to check daily? |
| Crops logged per user | Are people using it as a real planting tool? |
| "Watered" actions per week | Are the reminders driving real action? |
| Affiliate click-through rate | Is the seed pipeline working? |
| Email signups ("save garden") | Is the tool valuable enough to save? |
| Harvest completion rate | Are people following through to harvest? |
| Time on page | Is the experience engaging? |
| Alert interaction rate | Are people tapping and acting on alerts? |
| Weekly email open rate | Is the summary valuable? |
