# Harvest Planner Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a personalised harvest date calculator at `/harvest-planner` where users enter postcode + crops with sowing method/date and get exact harvest dates, plant-out dates, and succession sowing reminders.

**Architecture:** Single page with server component wrapper (metadata) and a main client component. Calculation logic lives in a new `lib/harvest.ts` module. Reuses existing frost/postcode/localStorage patterns from PlantingTool and StillTimePage.

**Tech Stack:** Next.js 16 + React 19 + Tailwind 4 (existing stack). No new dependencies.

---

### Task 1: Add `successionWeeks` to crop data

**Files:**
- Modify: `src/data/crops.ts:5-35` (Crop interface + crop entries)

**Step 1: Add the field to the Crop interface**

In `src/data/crops.ts`, add after line 16 (`harvestWeeks: number;`):

```typescript
/** Weeks between successional sowings. Omit for one-off crops */
successionWeeks?: number;
```

**Step 2: Add successionWeeks values to the 10 crops**

Add `successionWeeks` to these crop objects (find each by their `slug`):

| slug            | successionWeeks |
|-----------------|-----------------|
| peas            | 3               |
| lettuce         | 2               |
| radishes        | 2               |
| spinach         | 3               |
| coriander       | 3               |
| dill            | 3               |
| beetroot        | 3               |
| spring-onions   | 3               |
| french-beans    | 3               |
| salad-leaves    | 2               |

Add the field after `harvestWeeks` in each crop object.

**Step 3: Verify the build**

Run: `cd /Users/kateallen/whattosow && npx next build 2>&1 | tail -5`
Expected: Build succeeds (optional field, no breaking changes)

**Step 4: Commit**

```bash
git add src/data/crops.ts
git commit -m "feat: add successionWeeks field to crop data for 10 successional crops"
```

---

### Task 2: Create harvest calculation logic

**Files:**
- Create: `src/lib/harvest.ts`

**Step 1: Create the harvest calculation module**

Create `src/lib/harvest.ts` with these exports:

```typescript
import { type Crop } from "@/data/crops";

export type SowingMethod = "indoors" | "outdoors" | "planted-out";

export interface HarvestEntry {
  crop: Crop;
  method: SowingMethod;
  sowDate: Date;
  plantOutDate: Date | null;    // only for indoors
  harvestDate: Date;
  nextSowDate: Date | null;     // only for successional crops
  warnings: HarvestWarning[];
}

export interface HarvestWarning {
  type: "frost-risk" | "wrong-method" | "window-closed";
  message: string;
}

function addWeeks(date: Date, weeks: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

/**
 * Calculate harvest dates for a crop entry.
 *
 * @param crop - The crop from crops.ts
 * @param method - How the user sowed/planted it
 * @param sowDate - The date they sowed or planted out
 * @param lastFrostDate - Their local last frost date
 */
export function calculateHarvest(
  crop: Crop,
  method: SowingMethod,
  sowDate: Date,
  lastFrostDate: Date
): HarvestEntry {
  const warnings: HarvestWarning[] = [];
  let plantOutDate: Date | null = null;
  let harvestDate: Date;

  if (method === "indoors") {
    // Plant out = last frost + plantOutWeeks (which is weeks AFTER frost)
    if (crop.plantOutWeeks !== null) {
      plantOutDate = addWeeks(lastFrostDate, crop.plantOutWeeks);
      // If plant-out date is before sow date (they sowed late), shift it
      if (plantOutDate < sowDate) {
        // They sowed after the ideal plant-out window — estimate plant-out
        // as sow date + typical indoor growing period (~6 weeks)
        plantOutDate = addWeeks(sowDate, 6);
      }
      harvestDate = addWeeks(plantOutDate, crop.harvestWeeks);
    } else {
      // Crop shouldn't be sown indoors — warn and calculate as direct sow
      warnings.push({
        type: "wrong-method",
        message: `${crop.name} is best direct sown outdoors. We've calculated your harvest as if direct sown.`,
      });
      harvestDate = addWeeks(sowDate, crop.harvestWeeks);
    }

    // Frost warning for the sow date being very early
    if (crop.category !== "hardy" && plantOutDate && plantOutDate < lastFrostDate) {
      warnings.push({
        type: "frost-risk",
        message: `Your plant-out date falls before your last frost (${formatDateShort(lastFrostDate)}). Wait until after this date to plant out ${crop.name.toLowerCase()}.`,
      });
    }
  } else if (method === "outdoors") {
    harvestDate = addWeeks(sowDate, crop.harvestWeeks);

    // Frost warning for tender/half-hardy sown outdoors before frost
    if (crop.category !== "hardy" && sowDate < lastFrostDate) {
      warnings.push({
        type: "frost-risk",
        message: `You sowed ${crop.name.toLowerCase()} outdoors before your last frost date (${formatDateShort(lastFrostDate)}). Tender crops risk frost damage — consider covering them.`,
      });
    }
  } else {
    // planted-out
    harvestDate = addWeeks(sowDate, crop.harvestWeeks);

    if (crop.category !== "hardy" && sowDate < lastFrostDate) {
      warnings.push({
        type: "frost-risk",
        message: `You planted out ${crop.name.toLowerCase()} before your last frost date (${formatDateShort(lastFrostDate)}). Protect with fleece if frost is forecast.`,
      });
    }
  }

  // Succession sowing
  const nextSowDate = crop.successionWeeks
    ? addWeeks(sowDate, crop.successionWeeks)
    : null;

  return {
    crop,
    method,
    sowDate,
    plantOutDate,
    harvestDate,
    nextSowDate,
    warnings,
  };
}

/**
 * Check which sowing methods are valid for a crop.
 */
export function getValidMethods(crop: Crop): { method: SowingMethod; disabled: boolean; reason?: string }[] {
  return [
    {
      method: "indoors",
      disabled: crop.sowIndoorsWeeks === null,
      reason: crop.sowIndoorsWeeks === null ? `${crop.name} is direct sown — it doesn't do well started indoors` : undefined,
    },
    {
      method: "outdoors",
      disabled: crop.directSowWeeks === null,
      reason: crop.directSowWeeks === null ? `${crop.name} should be started indoors first` : undefined,
    },
    {
      method: "planted-out",
      disabled: false, // always valid — they might have bought seedlings
    },
  ];
}

function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}
```

**Step 2: Verify build**

Run: `cd /Users/kateallen/whattosow && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/lib/harvest.ts
git commit -m "feat: add harvest date calculation logic with frost warnings and succession sowing"
```

---

### Task 3: Create the CropCombobox component

**Files:**
- Create: `src/components/CropCombobox.tsx`

**Step 1: Build the searchable crop selector**

Create `src/components/CropCombobox.tsx`:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { type Crop } from "@/data/crops";

interface CropComboboxProps {
  crops: Crop[];
  onSelect: (crop: Crop) => void;
  selectedCrop: Crop | null;
}

export default function CropCombobox({ crops, onSelect, selectedCrop }: CropComboboxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = query.length === 0
    ? crops
    : crops.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(crop: Crop) {
    onSelect(crop);
    setQuery(crop.name);
    setOpen(false);
  }

  return (
    <div className="relative flex-1 min-w-[180px]">
      <label htmlFor="crop-search" className="text-xs font-semibold text-earth-light mb-1.5 block">
        Crop
      </label>
      <input
        ref={inputRef}
        id="crop-search"
        type="text"
        value={selectedCrop && !open ? selectedCrop.name : query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (selectedCrop) onSelect(null as unknown as Crop); // clear selection on type
        }}
        onFocus={() => {
          setOpen(true);
          if (selectedCrop) setQuery(selectedCrop.name);
        }}
        placeholder="Type to search..."
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls="crop-listbox"
        aria-autocomplete="list"
        className="w-full bg-white border border-earth/15 text-earth text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-allotment/20 focus:border-allotment/40 transition-all"
      />
      {open && filtered.length > 0 && (
        <ul
          ref={listRef}
          id="crop-listbox"
          role="listbox"
          className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-earth/15 shadow-lg max-h-60 overflow-y-auto"
        >
          {filtered.map((crop) => (
            <li
              key={crop.slug}
              role="option"
              aria-selected={selectedCrop?.slug === crop.slug}
              onClick={() => handleSelect(crop)}
              className="px-3 py-2 text-sm text-earth hover:bg-sage cursor-pointer transition-colors"
            >
              {crop.name}
              <span className="text-xs text-earth-lighter ml-2 capitalize">
                {crop.category}
              </span>
            </li>
          ))}
        </ul>
      )}
      {open && filtered.length === 0 && query.length > 0 && (
        <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-earth/15 shadow-lg px-3 py-3 text-sm text-earth-lighter">
          No crops found
        </div>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/CropCombobox.tsx
git commit -m "feat: add searchable crop combobox component"
```

---

### Task 4: Create the HarvestCard component

**Files:**
- Create: `src/components/HarvestCard.tsx`

**Step 1: Build the result card with timeline**

Create `src/components/HarvestCard.tsx`:

```tsx
"use client";

import { type HarvestEntry, type SowingMethod } from "@/lib/harvest";

const METHOD_LABELS: Record<SowingMethod, string> = {
  indoors: "Sowed indoors",
  outdoors: "Sowed outdoors",
  "planted-out": "Planted out",
};

function categoryBorder(cat: string): string {
  switch (cat) {
    case "hardy": return "border-l-leaf";
    case "half-hardy": return "border-l-amber";
    case "tender": return "border-l-tomato";
    default: return "border-l-earth/20";
  }
}

function fmt(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

function fmtShort(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

/** Calculate percentage position of a date between start and end */
function pct(date: Date, start: Date, end: Date): number {
  const total = end.getTime() - start.getTime();
  if (total <= 0) return 0;
  const pos = date.getTime() - start.getTime();
  return Math.max(0, Math.min(100, (pos / total) * 100));
}

export default function HarvestCard({
  entry,
  onRemove,
}: {
  entry: HarvestEntry;
  onRemove: () => void;
}) {
  const { crop, method, sowDate, plantOutDate, harvestDate, nextSowDate, warnings } = entry;

  // Timeline bounds
  const timelineStart = sowDate;
  const timelineEnd = harvestDate;

  return (
    <div className={`bg-white border-l-[3px] ${categoryBorder(crop.category)} p-5 sm:p-6 relative`}>
      {/* Remove button */}
      <button
        onClick={onRemove}
        aria-label={`Remove ${crop.name}`}
        className="absolute top-3 right-3 text-earth-lighter hover:text-tomato transition-colors p-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <h3 className="font-serif text-lg text-earth pr-8">{crop.name}</h3>
      <p className="text-xs text-earth-lighter mt-0.5">{METHOD_LABELS[method]} on {fmt(sowDate)}</p>

      {/* Timeline strip */}
      <div className="mt-5 mb-4">
        <div className="relative h-2 bg-earth/5 rounded-full overflow-hidden">
          {/* Indoor phase */}
          {method === "indoors" && plantOutDate && (
            <div
              className="absolute inset-y-0 bg-amber/60 rounded-l-full"
              style={{
                left: "0%",
                width: `${pct(plantOutDate, timelineStart, timelineEnd)}%`,
              }}
            />
          )}
          {/* Outdoor/growing phase */}
          <div
            className="absolute inset-y-0 bg-allotment/50"
            style={{
              left: method === "indoors" && plantOutDate
                ? `${pct(plantOutDate, timelineStart, timelineEnd)}%`
                : "0%",
              right: "0%",
            }}
          />
          {/* Harvest dot */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-leaf-light rounded-full border-2 border-white shadow-sm" />
        </div>

        {/* Date labels under timeline */}
        <div className="relative mt-2 text-[10px] text-earth-lighter h-4">
          <span className="absolute left-0">{fmtShort(sowDate)}</span>
          {method === "indoors" && plantOutDate && (
            <span
              className="absolute -translate-x-1/2"
              style={{ left: `${pct(plantOutDate, timelineStart, timelineEnd)}%` }}
            >
              {fmtShort(plantOutDate)}
            </span>
          )}
          <span className="absolute right-0">{fmtShort(harvestDate)}</span>
        </div>
      </div>

      {/* Key dates */}
      <div className="space-y-2 text-sm">
        {method === "indoors" && plantOutDate && (
          <div className="flex items-start gap-2">
            <span className="text-allotment shrink-0" aria-hidden="true">&#x1F33F;</span>
            <span className="text-earth">
              <strong>Plant out by:</strong> {fmt(plantOutDate)}
            </span>
          </div>
        )}
        <div className="flex items-start gap-2">
          <span className="text-leaf shrink-0" aria-hidden="true">&#x1F955;</span>
          <span className="text-earth">
            <strong>Harvest from:</strong> {fmt(harvestDate)}
          </span>
        </div>
        {nextSowDate && (
          <div className="flex items-start gap-2">
            <span className="text-amber shrink-0" aria-hidden="true">&#x1F504;</span>
            <span className="text-earth">
              <strong>Sow again by:</strong> {fmt(nextSowDate)}
            </span>
          </div>
        )}
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          {warnings.map((w, i) => (
            <div
              key={i}
              className={`text-xs px-3 py-2 border-l-2 ${
                w.type === "frost-risk"
                  ? "bg-tomato-bg border-l-tomato text-tomato"
                  : w.type === "wrong-method"
                    ? "bg-amber-bg border-l-amber text-earth-light"
                    : "bg-frost-bg border-l-frost text-earth-light"
              }`}
            >
              {w.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/HarvestCard.tsx
git commit -m "feat: add HarvestCard component with timeline strip and frost warnings"
```

---

### Task 5: Create the main HarvestPlanner client component

**Files:**
- Create: `src/components/HarvestPlanner.tsx`

**Step 1: Build the main planner component**

Create `src/components/HarvestPlanner.tsx`. This is the largest component — it manages:
- Postcode/location state (reusing localStorage pattern from StillTimePage)
- The add-crop form with method pills
- The list of harvest entries
- Print button

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { crops } from "@/data/crops";
import { type Crop } from "@/data/crops";
import {
  lookupPostcode,
  calculateLastFrostDate,
  formatDate,
  type LocationData,
} from "@/lib/frost";
import { getAvgFrostDate } from "@/lib/calendar";
import {
  calculateHarvest,
  getValidMethods,
  type HarvestEntry,
  type SowingMethod,
} from "@/lib/harvest";
import CropCombobox from "@/components/CropCombobox";
import HarvestCard from "@/components/HarvestCard";

const STORAGE_KEY = "whattosow_location";

function loadLocation(): LocationData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveLocation(location: LocationData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
    window.dispatchEvent(new Event("whattosow:location-updated"));
  } catch {
    // localStorage unavailable
  }
}

function todayString(): string {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

export default function HarvestPlanner() {
  // Location state
  const [location, setLocation] = useState<LocationData | null>(null);
  const [postcodeInput, setPostcodeInput] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [postcodeLoading, setPostcodeLoading] = useState(false);
  const [editingPostcode, setEditingPostcode] = useState(false);
  const [ready, setReady] = useState(false);

  // Form state
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [method, setMethod] = useState<SowingMethod>("outdoors");
  const [dateStr, setDateStr] = useState(todayString());

  // Entries
  const [entries, setEntries] = useState<HarvestEntry[]>([]);

  // Load location from localStorage
  const loadLoc = useCallback(() => {
    const loc = loadLocation();
    if (loc) setLocation(loc);
    setReady(true);
  }, []);

  useEffect(() => {
    loadLoc();
    window.addEventListener("whattosow:location-updated", loadLoc);
    return () => window.removeEventListener("whattosow:location-updated", loadLoc);
  }, [loadLoc]);

  // Frost date
  const lastFrostDate = location
    ? calculateLastFrostDate(location.latitude, location.longitude)
    : getAvgFrostDate();

  // Postcode lookup
  async function handlePostcodeLookup() {
    if (!postcodeInput.trim()) return;
    setPostcodeLoading(true);
    setPostcodeError("");
    const result = await lookupPostcode(postcodeInput);
    setPostcodeLoading(false);
    if (typeof result === "string") {
      setPostcodeError(result === "invalid" ? "That doesn't look like a valid UK postcode." : "Network error — try again.");
    } else {
      setLocation(result);
      saveLocation(result);
      setEditingPostcode(false);
    }
  }

  // Method pills — which are valid for the selected crop
  const validMethods = selectedCrop ? getValidMethods(selectedCrop) : [];

  // Auto-select first valid method when crop changes
  useEffect(() => {
    if (!selectedCrop) return;
    const methods = getValidMethods(selectedCrop);
    const current = methods.find((m) => m.method === method);
    if (current?.disabled) {
      const first = methods.find((m) => !m.disabled);
      if (first) setMethod(first.method);
    }
  }, [selectedCrop, method]);

  // Add crop
  function handleAdd() {
    if (!selectedCrop || !dateStr) return;
    const sowDate = new Date(dateStr + "T12:00:00"); // noon to avoid timezone issues
    const entry = calculateHarvest(selectedCrop, method, sowDate, lastFrostDate);
    setEntries((prev) => [...prev, entry]);
    setSelectedCrop(null);
    setDateStr(todayString());
  }

  // Remove crop
  function handleRemove(index: number) {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }

  if (!ready) {
    return <div className="py-20 text-center text-earth-lighter text-sm">Loading...</div>;
  }

  return (
    <div>
      {/* Postcode bar */}
      <div className="mb-8">
        {location && !editingPostcode ? (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-earth">
              <strong>{location.adminDistrict}</strong> ({location.postcode})
              &middot; Last frost: <strong>{formatDate(lastFrostDate)}</strong>
            </span>
            <button
              onClick={() => setEditingPostcode(true)}
              className="text-xs text-allotment hover:text-allotment-dark underline decoration-allotment/30 transition-colors"
            >
              Change
            </button>
          </div>
        ) : (
          <div>
            <label htmlFor="postcode" className="text-xs font-semibold text-earth-light mb-1.5 block">
              Your postcode
            </label>
            <div className="flex gap-2 max-w-xs">
              <input
                id="postcode"
                type="text"
                value={postcodeInput}
                onChange={(e) => setPostcodeInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePostcodeLookup()}
                placeholder="e.g. SE15 3AB"
                className="flex-1 bg-white border border-earth/15 text-earth text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-allotment/20 focus:border-allotment/40 transition-all"
              />
              <button
                onClick={handlePostcodeLookup}
                disabled={postcodeLoading}
                className="bg-allotment text-white text-sm font-medium px-4 py-2.5 hover:bg-allotment-dark transition-colors disabled:opacity-50"
              >
                {postcodeLoading ? "..." : "Set"}
              </button>
            </div>
            {postcodeError && (
              <p className="text-xs text-tomato mt-1.5">{postcodeError}</p>
            )}
            {!location && (
              <p className="text-xs text-earth-lighter mt-2">
                Using UK average frost date until you enter your postcode.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Add crop form */}
      <div className="bg-white border border-earth/10 p-4 sm:p-6 mb-8">
        <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment mb-4">
          Add a crop
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <CropCombobox
            crops={crops}
            onSelect={setSelectedCrop}
            selectedCrop={selectedCrop}
          />

          {/* Method pills */}
          <div className="min-w-[240px]">
            <span className="text-xs font-semibold text-earth-light mb-1.5 block">
              Method
            </span>
            <div className="flex gap-1">
              {(["indoors", "outdoors", "planted-out"] as SowingMethod[]).map((m) => {
                const v = validMethods.find((vm) => vm.method === m);
                const disabled = v?.disabled ?? false;
                const active = method === m && !disabled;
                const labels: Record<SowingMethod, string> = {
                  indoors: "Indoors",
                  outdoors: "Outdoors",
                  "planted-out": "Planted out",
                };
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => !disabled && setMethod(m)}
                    disabled={disabled}
                    title={v?.reason}
                    className={`text-xs px-3 py-2 font-medium transition-colors ${
                      active
                        ? "bg-allotment text-white"
                        : disabled
                          ? "bg-earth/5 text-earth/30 cursor-not-allowed"
                          : "bg-earth/5 text-earth-light hover:bg-earth/10"
                    }`}
                  >
                    {labels[m]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date picker */}
          <div className="min-w-[150px]">
            <label htmlFor="sow-date" className="text-xs font-semibold text-earth-light mb-1.5 block">
              Date
            </label>
            <input
              id="sow-date"
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full bg-white border border-earth/15 text-earth text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-allotment/20 focus:border-allotment/40 transition-all"
            />
          </div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            disabled={!selectedCrop || !dateStr}
            className="bg-allotment text-white text-sm font-medium px-6 py-2.5 hover:bg-allotment-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Add crop
          </button>
        </div>
      </div>

      {/* Results */}
      {entries.length > 0 && (
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment">
              Your harvest dates
            </h2>
            <span className="text-xs text-earth-lighter">
              {entries.length} crop{entries.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-3">
            {entries.map((entry, i) => (
              <HarvestCard
                key={`${entry.crop.slug}-${i}`}
                entry={entry}
                onRemove={() => handleRemove(i)}
              />
            ))}
          </div>

          {/* Print button */}
          <div className="mt-8 flex justify-center print:hidden">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-allotment-dark text-white text-sm font-medium px-6 py-3 hover:bg-allotment transition-colors"
              data-umami-event="harvest-planner-print"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print my harvest dates
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {entries.length === 0 && (
        <div className="text-center py-12 text-earth-lighter">
          <p className="text-sm">Add your first crop above to see your personalised harvest dates.</p>
        </div>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/HarvestPlanner.tsx
git commit -m "feat: add main HarvestPlanner component with postcode, form, and entries list"
```

---

### Task 6: Create the page route and wire everything together

**Files:**
- Create: `src/app/harvest-planner/page.tsx`

**Step 1: Create the page**

Create `src/app/harvest-planner/page.tsx`:

```tsx
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullWidthSection from "@/components/FullWidthSection";
import ScrollReveal from "@/components/ScrollReveal";
import EmailCapture from "@/components/EmailCapture";
import HarvestPlanner from "@/components/HarvestPlanner";

export const metadata: Metadata = {
  title: "Harvest Planner — When Will I Harvest? | What To Sow",
  description:
    "Enter what you've sown and when, and we'll tell you exactly when to harvest. Personalised to your UK postcode and local frost date.",
  openGraph: {
    title: "Harvest Planner — When Will I Harvest?",
    description:
      "Enter what you've sown and when, and we'll tell you exactly when to harvest. Personalised to your UK postcode.",
    url: "https://whattosow.co.uk/harvest-planner",
  },
};

export default function HarvestPlannerPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="print:hidden">
        <Header />
      </div>

      <main id="main-content">
        {/* Hero */}
        <FullWidthSection className="bg-sage print:hidden" innerClassName="pt-10 sm:pt-14 pb-8 sm:pb-10">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment mb-3 block">
            Harvest planner
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-earth tracking-tight leading-tight mb-3">
            When will I harvest?
          </h1>
          <p className="text-earth-light leading-relaxed max-w-lg">
            Enter what you&apos;ve sown and when, and we&apos;ll tell you exactly when to pick it &mdash; personalised to your local frost date.
          </p>
        </FullWidthSection>

        {/* Print header */}
        <div className="hidden print:block px-6 pt-6 pb-4">
          <h1 className="text-lg font-bold text-earth">My Harvest Dates &mdash; whattosow.co.uk</h1>
        </div>

        {/* Main tool */}
        <FullWidthSection innerClassName="py-8 sm:py-12">
          <HarvestPlanner />
        </FullWidthSection>

        {/* Email capture */}
        <FullWidthSection className="bg-allotment-dark print:hidden" innerClassName="py-14 sm:py-20">
          <ScrollReveal>
            <div className="max-w-lg mx-auto text-center">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/50 mb-3 block">
                Monthly sowing reminders
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-tight mb-3">
                Never miss a sowing window
              </h2>
              <p className="text-sm text-white/60 mb-6 leading-relaxed">
                A short email each month with what to sow, when to sow it, and the odd practical tip. No spam.
              </p>
              <EmailCapture variant="dark" />
            </div>
          </ScrollReveal>
        </FullWidthSection>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
```

**Step 2: Verify with dev server**

Run: `cd /Users/kateallen/whattosow && npx next dev`
Visit: `http://localhost:3000/harvest-planner`

Check:
- [ ] Page loads with sage hero
- [ ] Postcode loads from localStorage (or shows input)
- [ ] Can search and select a crop
- [ ] Method pills grey out when invalid for selected crop
- [ ] Adding a crop shows a HarvestCard with dates
- [ ] Can add multiple crops
- [ ] Remove button works
- [ ] Print button triggers print dialog
- [ ] Print view shows clean output without nav/footer

**Step 3: Commit**

```bash
git add src/app/harvest-planner/page.tsx
git commit -m "feat: add /harvest-planner page route with hero, email capture, and print support"
```

---

### Task 7: Add navigation link

**Files:**
- Modify: `src/components/Header.tsx:6-12` (NAV_LINKS array)

**Step 1: Add the harvest planner to the nav**

In `src/components/Header.tsx`, add to the `NAV_LINKS` array after the Calendar entry:

```typescript
{ href: "/harvest-planner", label: "Harvest planner" },
```

**Step 2: Verify in dev server**

Check the nav bar shows the new link and it navigates correctly.

**Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: add harvest planner link to site navigation"
```

---

### Task 8: Add print styles

**Files:**
- Modify: `src/app/globals.css:347-361` (existing @media print block)

**Step 1: Add harvest planner print styles**

Add these rules inside the existing `@media print` block in `globals.css`:

```css
  /* Harvest planner print styles */
  .harvest-card {
    break-inside: avoid;
    border: 1px solid #ddd !important;
    margin-bottom: 8pt;
    padding: 8pt !important;
  }

  .harvest-card h3 {
    font-size: 11pt;
  }

  .harvest-card .text-xs,
  .harvest-card .text-sm {
    font-size: 9pt;
  }
```

Note: Also add `className="harvest-card"` to the outer div in `HarvestCard.tsx` so these styles apply.

**Step 2: Add the class to HarvestCard**

In `src/components/HarvestCard.tsx`, change the outer div to include `harvest-card`:

```tsx
<div className={`harvest-card bg-white border-l-[3px] ${categoryBorder(crop.category)} p-5 sm:p-6 relative`}>
```

**Step 3: Verify print view**

Press Ctrl+P / Cmd+P on the harvest planner page with a few crops added. Check cards don't break across pages and look clean.

**Step 4: Commit**

```bash
git add src/app/globals.css src/components/HarvestCard.tsx
git commit -m "feat: add print styles for harvest planner cards"
```

---

### Task 9: Final verification and build check

**Step 1: Run production build**

Run: `cd /Users/kateallen/whattosow && npx next build 2>&1 | tail -10`
Expected: Build succeeds with no errors

**Step 2: Manual smoke test checklist**

Run `npx next dev` and verify:

- [ ] `/harvest-planner` loads
- [ ] Postcode auto-populates from localStorage
- [ ] Can change postcode
- [ ] Crop search filters correctly
- [ ] Invalid methods are greyed out (e.g. "Indoors" for crops with `sowIndoorsWeeks: null`)
- [ ] Adding "Lettuce / Sowed indoors / 1 March" shows plant-out date + harvest date + "sow again" date
- [ ] Adding "Tomatoes / Sowed outdoors / 1 March" shows frost warning for most UK postcodes
- [ ] Adding "Radishes / Sowed outdoors / today" shows harvest date + sow again date
- [ ] Timeline strips render proportionally
- [ ] Remove button removes the correct card
- [ ] Print button works, output is clean
- [ ] Nav link works
- [ ] Mobile layout stacks correctly

**Step 3: Final commit if any tweaks needed**

```bash
git add -A
git commit -m "fix: harvest planner polish from smoke testing"
```
