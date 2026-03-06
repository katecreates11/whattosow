# Harvest Planner — Design Document

**Date:** 2026-03-06
**Page:** `/harvest-planner`

## Purpose

A personalised harvest date calculator. Users enter their postcode, then add crops with sowing method and date. The tool calculates exact harvest dates, plant-out dates, and next sow dates — all adjusted to their local frost date. Results are printable as a clean summary to pin in the shed.

## User flow

1. Land on page, postcode auto-loads from localStorage (or enter it)
2. See location confirmed with last frost date
3. Add crops one at a time: pick crop, pick method, enter date
4. Each crop appears as a result card with all calculated dates
5. Keep adding crops to build up a full planner
6. Print or screenshot the results

## Page structure

### Hero — `bg-sage` full-width band
- Newsreader serif heading: "When will I harvest?"
- Subtitle: "Enter what you've sown and we'll tell you exactly when to pick it."
- `text-xs uppercase tracking-[0.15em] text-allotment` label: "Harvest planner"

### Postcode bar
- Reads from localStorage (`whattosow_location` key, same as PlantingTool)
- If saved: shows "Your location: [postcode] - Last frost: [date]" with "Change" link
- If not saved: compact postcode input using existing `lookupPostcode` + `calculateLastFrostDate`
- Listens for `whattosow:location-updated` event

### Add crop form — inline row
1. **Crop** — searchable combobox, filters 39 crops as user types
2. **Method** — three pill-toggle buttons: "Sowed indoors" / "Sowed outdoors" / "Planted out"
   - Grey out invalid methods per crop (e.g. "Sowed indoors" when `sowIndoorsWeeks: null`)
   - Tooltip on disabled pills explaining why
3. **Date** — native date picker, defaults to today
4. **Add button** — `bg-allotment text-white`

### Result cards — on `bg-ochre` full-width band
Each crop renders as a card, stagger-animated on entry:

**Visual treatment:**
- Left border colour by category: leaf (hardy), amber (half-hardy), tomato (tender)
- Crop name in Newsreader serif, method as small label beneath
- Remove button (x) top right

**Timeline strip:**
- Horizontal bar showing sow > plant out > harvest journey
- `bg-amber` segment = indoor growing phase
- `bg-allotment` segment = outdoor growing phase
- `bg-leaf-light` dot at harvest point
- Date labels below each transition

**Key dates (exact dates, not weeks):**
- Sowed indoors/outdoors: [date they entered]
- Plant out by: [calculated] — only if indoor sown
- Harvest from: [calculated]
- Sow again by: [calculated] — only for successional crops

**Frost warnings:**
- `bg-tomato-bg border-l-tomato` alert if sow/plant-out date is before last frost and crop isn't hardy
- Closed sowing window warning if it's too late for their location

**Intelligence:**
- If they pick "sowed indoors" but crop has `sowIndoorsWeeks: null`, advise direct sowing instead
- Plant-out date = their last frost date + `plantOutWeeks` weeks
- Harvest date for indoor sown = plant-out date + `harvestWeeks` weeks
- Harvest date for direct sown / planted out = sow date + `harvestWeeks` weeks
- Sowing window check: if their date falls outside the crop's viable window, flag it

### Print view
- "Print my harvest dates" button triggers `window.print()`
- Clean white background, no nav/footer (same pattern as `/print` page)
- Cards simplified to compact layout
- Header: "My Harvest Dates — [postcode] — whattosow.co.uk"
- Graceful page breaks for 8+ crops

### Email capture — `bg-allotment-dark` band at bottom
- Same pattern as homepage dark email section
- Copy: contextualised to harvest planner usage

## Data changes

### New field: `successionWeeks`

Add optional `successionWeeks?: number` to the `Crop` interface. Values:

| Crop           | successionWeeks |
|----------------|-----------------|
| Peas           | 3               |
| Lettuce        | 2               |
| Radishes       | 2               |
| Spinach        | 3               |
| Coriander      | 3               |
| Dill           | 3               |
| Beetroot       | 3               |
| Spring onions  | 3               |
| French beans   | 3               |
| Salad leaves   | 2               |

All other crops: field omitted (no successional sowing).

## Harvest date calculation logic

```
if method === "sowed indoors":
  plantOutDate = lastFrostDate + (plantOutWeeks * 7 days)
  harvestDate = plantOutDate + (harvestWeeks * 7 days)

if method === "sowed outdoors":
  harvestDate = sowDate + (harvestWeeks * 7 days)

if method === "planted out":
  harvestDate = plantedOutDate + (harvestWeeks * 7 days)

if successionWeeks exists:
  nextSowDate = sowDate + (successionWeeks * 7 days)
```

### Frost risk logic
- If crop category is "tender" or "half-hardy" AND (sowDate or plantOutDate) < lastFrostDate: show frost warning
- If crop category is "hardy": no frost warning needed (they tolerate frost)

## Components to create

- `src/app/harvest-planner/page.tsx` — server component (metadata, layout, Header/Footer)
- `src/components/HarvestPlanner.tsx` — main client component ("use client")
- `src/components/HarvestCard.tsx` — individual crop result card with timeline
- `src/components/CropCombobox.tsx` — searchable crop selector

## Existing code to reuse

- `lib/frost.ts`: `lookupPostcode`, `calculateLastFrostDate`, `LocationData`
- `lib/calendar.ts`: `getAvgFrostDate`
- `data/crops.ts`: `Crop` interface, `crops` array
- `components/Header.tsx`, `components/Footer.tsx`
- `components/FullWidthSection.tsx`
- `components/ScrollReveal.tsx`
- `components/EmailCapture.tsx`
- localStorage pattern from `PlantingTool.tsx` and `StillTimePage.tsx`

## Design tokens used

- Backgrounds: `bg-sage` (hero), `bg-ochre` (results), `bg-allotment-dark` (email)
- Category borders: `border-l-leaf` (hardy), `border-l-amber` (half-hardy), `border-l-tomato` (tender)
- Warning: `bg-tomato-bg border-l-tomato`
- Typography: Newsreader (headings), Instrument Sans (body)
- Animations: stagger-grid pattern for card entry, scroll-reveal
