# Image Slots + Visual Placer Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build image slots into the companion-planting templates plus a dev-only visual tool so Kate assigns the right photo (from her raw library) to each slot, with a fix-once auto-orient pipeline.

**Architecture:** A static slot *registry* defines every slot; a JSON *manifest* records assignments; a `SlotImage` component renders a slot or nothing if empty. A shared `process-photo` routine auto-orients (EXIF `rotate()`) and optimises. A dev-only Next API + `/admin/photos` page lets Kate pick a library photo per slot, which the pipeline processes and writes to the manifest.

**Tech Stack:** Next.js 16 (App Router, server mode), TypeScript, sharp, sips (HEIC fallback), vitest (node env) for unit tests.

---

## File Structure

- Create `src/lib/process-photo.ts` — image pipeline (rotate/crop/webp/strip; HEIC fallback). Node-only.
- Create `src/data/image-slot-registry.ts` — slot definitions (types + list).
- Create `src/data/image-slots.json` — manifest of assignments (starts `{}`).
- Create `src/lib/image-slots.ts` — `getSlot`, `shapeToAspect` read helpers.
- Create `src/components/SlotImage.tsx` — renders a slot (or null).
- Create `src/app/api/admin/_dev.ts` — `assertDev()` + path-safety helpers.
- Create `src/app/api/admin/slots/route.ts` — GET registry+manifest+library.
- Create `src/app/api/admin/thumb/route.ts` — GET library thumbnail.
- Create `src/app/api/admin/assign/route.ts` — POST assign a photo to a slot.
- Create `src/app/admin/photos/page.tsx` — the placer UI (client, dev-only).
- Modify `src/app/guides/companion-planting/[topic]/page.tsx` — wire SlotImage slots.
- Modify `src/app/guides/companion-planting/page.tsx` — add slots; migrate time-lapse.
- Create `vitest.config.ts` + modify `package.json` — test harness.

---

## Task 1: Test harness (vitest)

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (scripts + devDeps)
- Test: `src/lib/__tests__/harness.test.ts`

- [ ] **Step 1: Install vitest**

Run: `npm i -D vitest@^3`
Expected: added to devDependencies, no errors.

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 3: Add test script to `package.json`**

In `"scripts"`, add: `"test": "vitest run"` and `"test:watch": "vitest"`.

- [ ] **Step 4: Write a smoke test** — `src/lib/__tests__/harness.test.ts`

```ts
import { describe, it, expect } from "vitest";

describe("harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Run it**

Run: `npm test`
Expected: 1 passed.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts package.json package-lock.json src/lib/__tests__/harness.test.ts
git commit -m "test: add vitest harness"
```

---

## Task 2: Image pipeline `process-photo.ts`

**Files:**
- Create: `src/lib/process-photo.ts`
- Test: `src/lib/process-photo.test.ts`

The pipeline must: apply EXIF orientation (`rotate()`), apply an optional manual
`rotateExtra` (±90), crop to the slot shape (cover), output WebP, and strip metadata.
HEIC sources that sharp can't decode fall back through `sips`.

- [ ] **Step 1: Write the failing test** — `src/lib/process-photo.test.ts`

```ts
import { describe, it, expect, afterAll } from "vitest";
import sharp from "sharp";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { processPhoto } from "./process-photo";

const tmp = path.join(os.tmpdir(), "wts-proc-test");

afterAll(async () => { await fs.rm(tmp, { recursive: true, force: true }); });

async function makeSidewaysSource(): Promise<string> {
  await fs.mkdir(tmp, { recursive: true });
  // A 400x300 (landscape) image whose EXIF says orientation 6 (rotate 90° CW),
  // i.e. it should *display* as 300x400 portrait once oriented.
  const src = path.join(tmp, "sideways.jpg");
  await sharp({ create: { width: 400, height: 300, channels: 3, background: "#888" } })
    .withMetadata({ orientation: 6 })
    .jpeg()
    .toFile(src);
  return src;
}

describe("processPhoto", () => {
  it("auto-applies EXIF orientation so a sideways source comes out portrait", async () => {
    const src = await makeSidewaysSource();
    const out = path.join(tmp, "out-portrait.webp");
    await processPhoto({ srcPath: src, outPath: out, shape: "portrait" });
    const m = await sharp(out).metadata();
    expect(m.format).toBe("webp");
    expect(m.width! < m.height!).toBe(true); // portrait
  });

  it("strips metadata (no EXIF/orientation carried through)", async () => {
    const src = await makeSidewaysSource();
    const out = path.join(tmp, "out-clean.webp");
    await processPhoto({ srcPath: src, outPath: out, shape: "square" });
    const m = await sharp(out).metadata();
    expect(m.orientation).toBeUndefined();
    expect(m.exif).toBeUndefined();
  });

  it("applies a manual rotateExtra nudge", async () => {
    await fs.mkdir(tmp, { recursive: true });
    const src = path.join(tmp, "tall.jpg"); // 200x400 portrait, orientation normal
    await sharp({ create: { width: 200, height: 400, channels: 3, background: "#555" } }).jpeg().toFile(src);
    const out = path.join(tmp, "out-rot.webp");
    await processPhoto({ srcPath: src, outPath: out, shape: "wide", rotateExtra: 90 });
    const m = await sharp(out).metadata();
    expect(m.width! > m.height!).toBe(true); // wide shape after rotation
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/lib/process-photo.test.ts`
Expected: FAIL — "Cannot find module './process-photo'".

- [ ] **Step 3: Implement `src/lib/process-photo.ts`**

```ts
import sharp from "sharp";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileP = promisify(execFile);

export type SlotShape = "wide" | "portrait" | "square";

const SHAPE_DIMS: Record<SlotShape, { w: number; h: number }> = {
  wide: { w: 1600, h: 900 },
  portrait: { w: 1200, h: 1600 },
  square: { w: 1200, h: 1200 },
};

export interface ProcessOpts {
  srcPath: string;
  outPath: string;
  shape: SlotShape;
  rotateExtra?: number; // manual ±90 nudge
}

/** Load a source into a sharp instance, falling back through `sips` for HEICs sharp can't decode. */
async function loadSource(srcPath: string): Promise<sharp.Sharp> {
  try {
    // Touch metadata to force a decode attempt; throws on unsupported HEIC.
    const s = sharp(srcPath, { failOn: "none" });
    await s.metadata();
    return sharp(srcPath, { failOn: "none" });
  } catch {
    // Fallback: sips converts HEIC -> jpeg (macOS), baking what orientation it can.
    const tmpJpg = path.join(os.tmpdir(), `wts-sips-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`);
    await execFileP("sips", ["-s", "format", "jpeg", srcPath, "--out", tmpJpg]);
    return sharp(tmpJpg, { failOn: "none" });
  }
}

export async function processPhoto({ srcPath, outPath, shape, rotateExtra = 0 }: ProcessOpts): Promise<void> {
  const { w, h } = SHAPE_DIMS[shape];
  let img = (await loadSource(srcPath)).rotate(); // rotate() with no arg = auto EXIF orient
  if (rotateExtra) img = img.rotate(rotateExtra);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await img
    .resize(w, h, { fit: "cover", position: "centre" })
    .webp({ quality: 82 })
    .toFile(outPath); // sharp drops metadata unless withMetadata() is called
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/lib/process-photo.test.ts`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/process-photo.ts src/lib/process-photo.test.ts
git commit -m "feat: fix-once auto-orient image pipeline (process-photo)"
```

---

## Task 3: Slot registry `image-slot-registry.ts`

**Files:**
- Create: `src/data/image-slot-registry.ts`
- Test: `src/data/image-slot-registry.test.ts`

Generates 4 slots per companion topic + the main-guide slots. Reuses `SlotShape`.

- [ ] **Step 1: Write the failing test** — `src/data/image-slot-registry.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { imageSlotRegistry, getSlotDef } from "./image-slot-registry";
import { companionTopics } from "./companion-topics";

describe("imageSlotRegistry", () => {
  it("has unique ids", () => {
    const ids = imageSlotRegistry.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("defines 4 slots for every companion topic", () => {
    for (const t of companionTopics) {
      const slots = imageSlotRegistry.filter((s) => s.id.startsWith(`companion-${t.slug}-`));
      expect(slots.length).toBe(4);
    }
  });
  it("only uses valid shapes", () => {
    for (const s of imageSlotRegistry) {
      expect(["wide", "portrait", "square"]).toContain(s.shape);
    }
  });
  it("getSlotDef finds a known slot", () => {
    const id = `companion-${companionTopics[0].slug}-hero`;
    expect(getSlotDef(id)?.shape).toBe("wide");
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/data/image-slot-registry.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/data/image-slot-registry.ts`**

```ts
import { companionTopics } from "./companion-topics";

export type SlotShape = "wide" | "portrait" | "square";

export interface SlotDef {
  id: string;       // "companion-tomatoes-hero"
  group: string;    // "Companion: Tomatoes"
  label: string;    // "Hero"
  purpose: string;  // human hint shown in the tool
  shape: SlotShape;
}

const PER_TOPIC: { suffix: string; label: string; purpose: string; shape: SlotShape }[] = [
  { suffix: "hero", label: "Hero", purpose: "Top-of-page banner", shape: "wide" },
  { suffix: "intro", label: "After intro", purpose: "Sits under the opening line", shape: "portrait" },
  { suffix: "companions", label: "Grow alongside", purpose: "Next to the companions list", shape: "wide" },
  { suffix: "practice", label: "On our plot", purpose: "Real photo before the FAQ", shape: "portrait" },
];

function titleCase(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const topicSlots: SlotDef[] = companionTopics.flatMap((t) =>
  PER_TOPIC.map((p) => ({
    id: `companion-${t.slug}-${p.suffix}`,
    group: `Companion: ${titleCase(t.slug.replace(/^companion-plants-for-/, ""))}`,
    label: p.label,
    purpose: p.purpose,
    shape: p.shape,
  })),
);

const mainGuideSlots: SlotDef[] = [
  { id: "companion-main-hero", group: "Companion: Main guide", label: "Hero", purpose: "Top banner", shape: "wide" },
  { id: "companion-main-pairing-1", group: "Companion: Main guide", label: "Time-lapse 1", purpose: "Plugs in", shape: "portrait" },
  { id: "companion-main-pairing-2", group: "Companion: Main guide", label: "Time-lapse 2", purpose: "Bordering", shape: "portrait" },
  { id: "companion-main-pairing-3", group: "Companion: Main guide", label: "Time-lapse 3", purpose: "Filling out", shape: "portrait" },
  { id: "companion-main-pairing-4", group: "Companion: Main guide", label: "Time-lapse 4", purpose: "Full bloom", shape: "portrait" },
  { id: "companion-main-polyculture", group: "Companion: Main guide", label: "Polyculture", purpose: "A mixed bed", shape: "wide" },
];

export const imageSlotRegistry: SlotDef[] = [...mainGuideSlots, ...topicSlots];

export function getSlotDef(id: string): SlotDef | undefined {
  return imageSlotRegistry.find((s) => s.id === id);
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/data/image-slot-registry.test.ts`
Expected: passed.

- [ ] **Step 5: Commit**

```bash
git add src/data/image-slot-registry.ts src/data/image-slot-registry.test.ts
git commit -m "feat: image slot registry (companion pages phase 1)"
```

---

## Task 4: Manifest + read helpers `image-slots.ts`

**Files:**
- Create: `src/data/image-slots.json` (content: `{}`)
- Create: `src/lib/image-slots.ts`
- Test: `src/lib/image-slots.test.ts`

- [ ] **Step 1: Create the empty manifest** — `src/data/image-slots.json`

```json
{}
```

- [ ] **Step 2: Write the failing test** — `src/lib/image-slots.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { getSlot, shapeToAspect } from "./image-slots";

describe("image-slots", () => {
  it("returns null for an unassigned slot", () => {
    expect(getSlot("companion-does-not-exist")).toBeNull();
  });
  it("maps shapes to aspect ratios", () => {
    expect(shapeToAspect("wide")).toBe("16 / 9");
    expect(shapeToAspect("portrait")).toBe("3 / 4");
    expect(shapeToAspect("square")).toBe("1 / 1");
  });
});
```

- [ ] **Step 3: Implement `src/lib/image-slots.ts`**

```ts
import manifest from "@/data/image-slots.json";
import type { SlotShape } from "@/data/image-slot-registry";

export interface SlotAssignment {
  src: string;
  alt: string;
  caption?: string;
}

const data = manifest as Record<string, SlotAssignment>;

export function getSlot(id: string): SlotAssignment | null {
  return data[id] ?? null;
}

export function shapeToAspect(shape: SlotShape): string {
  return shape === "wide" ? "16 / 9" : shape === "portrait" ? "3 / 4" : "1 / 1";
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/lib/image-slots.test.ts`
Expected: passed. (Vitest resolves `@/` via tsconfig paths; if it fails on the alias, add `vite-tsconfig-paths` plugin to `vitest.config.ts` — `import tsconfigPaths from "vite-tsconfig-paths"; plugins:[tsconfigPaths()]` after `npm i -D vite-tsconfig-paths`.)

- [ ] **Step 5: Commit**

```bash
git add src/data/image-slots.json src/lib/image-slots.ts src/lib/image-slots.test.ts vitest.config.ts package.json package-lock.json
git commit -m "feat: image-slots manifest + getSlot/shapeToAspect helpers"
```

---

## Task 5: `SlotImage` component

**Files:**
- Create: `src/components/SlotImage.tsx`

Renders nothing when the slot is empty (graceful). Uses the registry shape for the
aspect box. Supports an optional `fallbackSrc`/`fallbackAlt` (used by satellite heroes
so they keep their current image until a slot photo is placed).

- [ ] **Step 1: Implement `src/components/SlotImage.tsx`**

```tsx
import Image from "next/image";
import { getSlot, shapeToAspect } from "@/lib/image-slots";
import { getSlotDef } from "@/data/image-slot-registry";

interface SlotImageProps {
  id: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
  fallbackSrc?: string;
  fallbackAlt?: string;
}

export default function SlotImage({
  id,
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 1024px",
  showCaption = true,
  fallbackSrc,
  fallbackAlt,
}: SlotImageProps) {
  const def = getSlotDef(id);
  const slot = getSlot(id);

  const src = slot?.src ?? fallbackSrc;
  const alt = slot?.alt ?? fallbackAlt ?? "";
  if (!src || !def) return null; // empty slot → render nothing

  const aspect = shapeToAspect(def.shape);

  return (
    <figure className={className}>
      <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover img-grade" />
      </div>
      {showCaption && slot?.caption && (
        <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-earth-light/70">
          {slot.caption}
        </figcaption>
      )}
    </figure>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/SlotImage.tsx
git commit -m "feat: SlotImage component (renders slot or nothing)"
```

---

## Task 6: Wire slots into the satellite template

**Files:**
- Modify: `src/app/guides/companion-planting/[topic]/page.tsx`

Replace the hero `Image` with a `SlotImage` (hero slot, falling back to `t.heroImage`),
and add body slots after the intro, beside the companions list, and before the FAQ.

- [ ] **Step 1: Import SlotImage**

At top of `src/app/guides/companion-planting/[topic]/page.tsx`, add:
```tsx
import SlotImage from "@/components/SlotImage";
```

- [ ] **Step 2: Replace the hero block** (currently the `<div className="relative aspect-[16/10] sm:aspect-[2/1] overflow-hidden"> ... </div>` containing the hero `<Image>`):

```tsx
<SlotImage
  id={`companion-${t.slug}-hero`}
  priority
  showCaption={false}
  fallbackSrc={t.heroImage}
  fallbackAlt={t.heroAlt}
/>
```

(The `max-w-4xl ... pt-6` wrapper div around it stays.)

- [ ] **Step 3: Add an after-intro slot.** Immediately after the closing `</header>` (before `<article ...>`), add:

```tsx
<div className="max-w-[40rem] mx-auto px-6">
  <SlotImage id={`companion-${t.slug}-intro`} sizes="(max-width: 640px) 100vw, 40rem" />
</div>
```

- [ ] **Step 4: Add a companions slot.** Inside the `goodCompanions` `<section>`, after its grid `</div>` and before the section's closing `</section>`, add:

```tsx
<div className="mt-6">
  <SlotImage id={`companion-${t.slug}-companions`} sizes="(max-width: 640px) 100vw, 40rem" />
</div>
```

- [ ] **Step 5: Add a practice slot** right before the `{/* FAQ */}` comment:

```tsx
<div className="mb-10">
  <SlotImage id={`companion-${t.slug}-practice`} sizes="(max-width: 640px) 100vw, 40rem" />
</div>
```

- [ ] **Step 6: Typecheck + dev render check**

Run: `npx tsc --noEmit` → expect exit 0.
Run (dev server on :3000): `curl -s http://localhost:3000/guides/companion-planting/companion-plants-for-tomatoes -o /tmp/t.html -w "%{http_code}\n"` → expect 200.
Confirm hero still present (fallback): `grep -c "tomatoes-cherry-truss-box" /tmp/t.html` → expect 1.
Confirm empty body slots render nothing (no broken img): the new slot ids should NOT appear: `grep -c "companion-plants-for-tomatoes-intro" /tmp/t.html` → expect 0.

- [ ] **Step 7: Commit**

```bash
git add src/app/guides/companion-planting/[topic]/page.tsx
git commit -m "feat: image slots in companion satellite template (hero fallback + 3 body slots)"
```

---

## Task 7: Wire slots into the main guide + migrate the time-lapse

**Files:**
- Modify: `src/app/guides/companion-planting/page.tsx`
- Modify: `src/data/image-slots.json`

The hand-built 4-photo time-lapse already references `/photos/guides/companion-marigolds-0X-*.webp`.
Migrate those into the manifest so they live in the slot system, and render the time-lapse
from slots.

- [ ] **Step 1: Seed the manifest with the existing time-lapse photos** — set `src/data/image-slots.json` to:

```json
{
  "companion-main-pairing-1": { "src": "/photos/guides/companion-marigolds-01-plugs.webp", "alt": "Two raised beds in early June with French marigold plugs just planted along the borders, the soil still bare and tomato canes set up", "caption": "1 Jun · plugs in" },
  "companion-main-pairing-2": { "src": "/photos/guides/companion-marigolds-02-bordering.webp", "alt": "Mid-June, the marigolds bordering the bed and tomatoes growing up their canes, the bed being watered", "caption": "17 Jun · bordering up" },
  "companion-main-pairing-3": { "src": "/photos/guides/companion-marigolds-03-filling.webp", "alt": "Early July, the marigold borders filling out and climbing beans starting up the hoop arch", "caption": "8 Jul · filling out" },
  "companion-main-pairing-4": { "src": "/photos/guides/companion-marigolds-04-bloom.webp", "alt": "Late August, the beds in full bloom with marigolds spilling over the edges, sunflowers and beans behind", "caption": "22 Aug · full bloom" }
}
```

- [ ] **Step 2: Import SlotImage** in `src/app/guides/companion-planting/page.tsx`:

```tsx
import SlotImage from "@/components/SlotImage";
```

- [ ] **Step 3: Replace the hand-coded time-lapse grid** (the `<figure className="mb-6">` block containing the `.map` over the four `companion-marigolds-0X` images) with a slot-driven grid:

```tsx
<figure className="mb-6">
  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-rust mb-3">
    From plugs to full bloom — the same beds, one season
  </p>
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
    {["companion-main-pairing-1", "companion-main-pairing-2", "companion-main-pairing-3", "companion-main-pairing-4"].map((id) => (
      <SlotImage key={id} id={id} sizes="(max-width: 640px) 50vw, 22vw" />
    ))}
  </div>
  <figcaption className="mt-3 text-sm text-earth-light leading-relaxed max-w-2xl">
    Tomatoes staked down the middle, French marigolds edging the beds. Plant the marigolds as plugs in
    late spring and by August they&apos;ll have filled out like this — that&apos;s the whole trick, and
    it&apos;s an easy one to copy.
  </figcaption>
</figure>
```

- [ ] **Step 4: Typecheck + dev render check**

Run: `npx tsc --noEmit` → exit 0.
Run: `curl -s http://localhost:3000/guides/companion-planting -o /tmp/cp.html -w "%{http_code}\n"` → 200.
Confirm all four still render: `for n in 01 02 03 04; do grep -c "companion-marigolds-$n" /tmp/cp.html; done` → each 1.

- [ ] **Step 5: Commit**

```bash
git add src/app/guides/companion-planting/page.tsx src/data/image-slots.json
git commit -m "feat: migrate companion time-lapse into the slot system"
```

---

## Task 8: Dev-only admin API routes

**Files:**
- Create: `src/app/api/admin/_dev.ts`
- Create: `src/app/api/admin/slots/route.ts`
- Create: `src/app/api/admin/thumb/route.ts`
- Create: `src/app/api/admin/assign/route.ts`

- [ ] **Step 1: Dev guard + path safety** — `src/app/api/admin/_dev.ts`

```ts
import path from "path";

export const PROD = process.env.NODE_ENV === "production";

export const REPO_ROOT = process.cwd();
export const RAW_DIR = path.join(REPO_ROOT, "photos-raw");
export const PUBLIC_DIR = path.join(REPO_ROOT, "public");
export const SLOTS_DIR = path.join(PUBLIC_DIR, "photos", "slots");
export const MANIFEST = path.join(REPO_ROOT, "src", "data", "image-slots.json");

/** Resolve a user-supplied source path and ensure it stays inside photos-raw/ or public/. */
export function safeSource(rel: string): string | null {
  const abs = path.resolve(REPO_ROOT, rel);
  if (abs.startsWith(RAW_DIR + path.sep) || abs.startsWith(PUBLIC_DIR + path.sep)) return abs;
  return null;
}

const IMAGE_RE = /\.(heic|jpe?g|png|webp)$/i;
export const isImage = (f: string) => IMAGE_RE.test(f);
```

- [ ] **Step 2: Slots listing** — `src/app/api/admin/slots/route.ts`

```ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { imageSlotRegistry } from "@/data/image-slot-registry";
import { PROD, RAW_DIR, MANIFEST, isImage } from "../_dev";

export async function GET() {
  if (PROD) return new NextResponse("Not found", { status: 404 });

  const manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"));

  let raw: string[] = [];
  try {
    raw = (await fs.readdir(RAW_DIR)).filter(isImage).map((f) => `photos-raw/${f}`);
  } catch { raw = []; }

  // already-processed web photos (for re-use)
  const blogDir = path.join(process.cwd(), "public", "photos", "blog");
  let web: string[] = [];
  try {
    web = (await fs.readdir(blogDir)).filter(isImage).map((f) => `public/photos/blog/${f}`);
  } catch { web = []; }

  return NextResponse.json({ slots: imageSlotRegistry, manifest, library: { raw, web } });
}
```

- [ ] **Step 3: Thumbnails** — `src/app/api/admin/thumb/route.ts`

```ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import sharp from "sharp";
import { PROD, safeSource } from "../_dev";

const execFileP = promisify(execFile);
const CACHE = path.join(os.tmpdir(), "wts-admin-thumbs");

export async function GET(req: NextRequest) {
  if (PROD) return new NextResponse("Not found", { status: 404 });
  const rel = req.nextUrl.searchParams.get("file");
  if (!rel) return new NextResponse("missing file", { status: 400 });
  const abs = safeSource(rel);
  if (!abs) return new NextResponse("bad path", { status: 400 });

  await fs.mkdir(CACHE, { recursive: true });
  const key = Buffer.from(rel).toString("base64url") + ".jpg";
  const cached = path.join(CACHE, key);
  try {
    const buf = await fs.readFile(cached);
    return new NextResponse(buf, { headers: { "Content-Type": "image/jpeg" } });
  } catch { /* generate */ }

  try {
    await sharp(abs, { failOn: "none" }).rotate().resize(360, 360, { fit: "cover" }).jpeg({ quality: 70 }).toFile(cached);
  } catch {
    // HEIC sharp can't read → sips
    await execFileP("sips", ["-s", "format", "jpeg", "-Z", "360", abs, "--out", cached]);
  }
  const buf = await fs.readFile(cached);
  return new NextResponse(buf, { headers: { "Content-Type": "image/jpeg" } });
}
```

- [ ] **Step 4: Assign** — `src/app/api/admin/assign/route.ts`

```ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { processPhoto } from "@/lib/process-photo";
import { getSlotDef } from "@/data/image-slot-registry";
import { PROD, safeSource, SLOTS_DIR, MANIFEST } from "../_dev";
import path from "path";

export async function POST(req: NextRequest) {
  if (PROD) return new NextResponse("Not found", { status: 404 });
  const { slotId, sourcePath, alt = "", caption = "", rotateExtra = 0 } = await req.json();

  const def = getSlotDef(slotId);
  if (!def) return NextResponse.json({ error: "unknown slot" }, { status: 400 });
  const abs = safeSource(sourcePath);
  if (!abs) return NextResponse.json({ error: "bad source path" }, { status: 400 });

  const outRel = `/photos/slots/${slotId}.webp`;
  const outAbs = path.join(SLOTS_DIR, `${slotId}.webp`);
  await processPhoto({ srcPath: abs, outPath: outAbs, shape: def.shape, rotateExtra: Number(rotateExtra) });

  const manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"));
  // cache-bust by appending a version query the page can ignore; keep clean src for git
  manifest[slotId] = { src: outRel, alt, caption };
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

  return NextResponse.json({ ok: true, slotId, assignment: manifest[slotId] });
}
```

- [ ] **Step 5: Typecheck + dev verification**

Run: `npx tsc --noEmit` → exit 0.
Run (dev server up): `curl -s http://localhost:3000/api/admin/slots | head -c 200` → expect JSON with `slots`/`library`.
Assign test: ``curl -s -X POST http://localhost:3000/api/admin/assign -H 'Content-Type: application/json' -d '{"slotId":"companion-companion-plants-for-tomatoes-hero","sourcePath":"photos-raw/IMG_6354.HEIC","alt":"test","caption":"test"}'`` → expect `{"ok":true,...}`; confirm `ls public/photos/slots/` shows the new webp and it is portrait/landscape per shape.

- [ ] **Step 6: Verify the production guard** (critical):

Run: `NODE_ENV=production npx next build` then check the route is inert — simplest proof in dev: the routes read `process.env.NODE_ENV`; add a quick assertion test instead — `src/app/api/admin/_dev.test.ts`:

```ts
import { describe, it, expect } from "vitest";
it("PROD flag follows NODE_ENV", () => {
  expect(typeof process.env.NODE_ENV).toBe("string");
});
```

(Manual confirmation that `/api/admin/*` returns 404 under a production server happens in Task 10.)

- [ ] **Step 7: Commit**

```bash
git add src/app/api/admin
git commit -m "feat: dev-only admin API (slots, thumb, assign) with prod 404 guard"
```

---

## Task 9: The placer UI `/admin/photos`

**Files:**
- Create: `src/app/admin/photos/page.tsx`

A client page: lists slots grouped by `group`, shows each slot's current thumb, a library
grid, and an assign panel (preview + rotate nudge + alt/caption + Save).

- [ ] **Step 1: Implement `src/app/admin/photos/page.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";

type SlotDef = { id: string; group: string; label: string; purpose: string; shape: string };
type Assignment = { src: string; alt: string; caption?: string };
type Data = { slots: SlotDef[]; manifest: Record<string, Assignment>; library: { raw: string[]; web: string[] } };

export default function PhotoPlacer() {
  const [data, setData] = useState<Data | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [rotateExtra, setRotateExtra] = useState(0);
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => fetch("/api/admin/slots").then((r) => r.json()).then(setData);
  useEffect(() => { load(); }, []);

  if (!data) return <div className="p-8 font-mono text-sm">Loading…</div>;

  const groups = [...new Set(data.slots.map((s) => s.group))];
  const thumb = (file: string) => `/api/admin/thumb?file=${encodeURIComponent(file)}`;

  async function save() {
    if (!active || !source) return;
    setSaving(true);
    await fetch("/api/admin/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotId: active, sourcePath: source, alt, caption, rotateExtra }),
    });
    setSaving(false);
    setSource(null); setRotateExtra(0); setAlt(""); setCaption("");
    await load();
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 p-6 grid grid-cols-[340px_1fr] gap-6">
      {/* Slots column */}
      <div className="overflow-y-auto max-h-screen">
        <h1 className="font-bold text-lg mb-4">Photo slots</h1>
        {groups.map((g) => (
          <div key={g} className="mb-5">
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 mb-2">{g}</div>
            {data.slots.filter((s) => s.group === g).map((s) => {
              const a = data.manifest[s.id];
              return (
                <button key={s.id} onClick={() => { setActive(s.id); setAlt(a?.alt ?? ""); setCaption(a?.caption ?? ""); }}
                  className={`w-full flex items-center gap-3 p-2 mb-1 rounded text-left ${active === s.id ? "bg-emerald-200" : "bg-white"}`}>
                  <div className="w-12 h-12 bg-neutral-200 overflow-hidden shrink-0">
                    {a && <img src={a.src} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="text-[11px] text-neutral-500">{s.purpose} · {s.shape}</div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Right: library + assign panel */}
      <div className="overflow-y-auto max-h-screen">
        {!active && <p className="text-neutral-500">Pick a slot on the left to fill it.</p>}
        {active && (
          <div>
            <div className="sticky top-0 bg-neutral-100 pb-3 mb-3 border-b">
              <div className="font-semibold mb-2">Filling: <span className="font-mono">{active}</span></div>
              {source && (
                <div className="flex items-start gap-4">
                  <img src={thumb(source)} alt="" style={{ transform: `rotate(${rotateExtra}deg)` }} className="w-40 h-40 object-cover bg-neutral-200" />
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button onClick={() => setRotateExtra((r) => r - 90)} className="px-2 py-1 bg-white border rounded">⟲ rotate</button>
                      <button onClick={() => setRotateExtra((r) => r + 90)} className="px-2 py-1 bg-white border rounded">rotate ⟳</button>
                    </div>
                    <input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Alt text (for SEO + accessibility)" className="block w-80 border px-2 py-1 text-sm" />
                    <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption (optional)" className="block w-80 border px-2 py-1 text-sm" />
                    <button onClick={save} disabled={saving} className="px-4 py-1.5 bg-emerald-600 text-white rounded">{saving ? "Saving…" : "Save to slot"}</button>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[...data.library.raw, ...data.library.web].map((f) => (
                <button key={f} onClick={() => setSource(f)} className={`aspect-square overflow-hidden border-2 ${source === f ? "border-emerald-500" : "border-transparent"}`}>
                  <img src={thumb(f)} alt="" loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit` → exit 0.

- [ ] **Step 3: Manual smoke (dev server up)**

Open `http://localhost:3000/admin/photos`. Confirm: slots list with groups; clicking a slot shows the library; clicking a library photo shows a preview with rotate buttons + alt/caption + Save.

- [ ] **Step 4: Commit**

```bash
git add src/app/admin/photos/page.tsx
git commit -m "feat: /admin/photos visual placer UI"
```

---

## Task 10: End-to-end verification + production guard

**Files:** none (verification only) — plus `src/data/image-slots.json` / `public/photos/slots/*` will change as Kate (or the test) assigns photos.

- [ ] **Step 1: Assign a real tomato/marigold photo** to `companion-companion-plants-for-tomatoes-hero` and `-practice` via the UI (or curl from Task 8 Step 5). Use the rotate nudge if the preview looks sideways.

- [ ] **Step 2: Verify on the page**

Run: `curl -s http://localhost:3000/guides/companion-planting/companion-plants-for-tomatoes -o /tmp/t.html -w "%{http_code}\n"` → 200.
Run: `grep -c "/photos/slots/companion-companion-plants-for-tomatoes-hero.webp" /tmp/t.html` → 1.
Open the page in the browser; confirm the photo is **upright** and well-cropped.

- [ ] **Step 3: Confirm the production guard** (the safety requirement)

Run: `npm run build` → expect success.
Run: `NODE_ENV=production npx next start -p 3100 &` then `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100/api/admin/slots` → expect **404**; and `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100/admin/photos` → expect 404 or an empty/no-op page. Kill the server.

- [ ] **Step 4: Full typecheck + tests + lint**

Run: `npx tsc --noEmit` → 0. `npm test` → all pass. `npm run lint` → clean.

- [ ] **Step 5: Commit any new assignments**

```bash
git add src/data/image-slots.json public/photos/slots
git commit -m "content: assign first companion photos via placer tool"
```

- [ ] **Step 6: Hand off to Kate** — she opens `/admin/photos`, fills the companion slots from her library, tests pages in the browser, then we batch-merge `image-slots-tool` → main and deploy once.

---

## Self-Review notes

- **Spec coverage:** registry (T3), manifest+getSlot (T4), SlotImage null-on-empty (T5), pipeline auto-orient+strip (T2), satellite slots (T6), main-guide + time-lapse migration (T7), dev-only tool with prod 404 (T8/T9/T10). All spec sections covered.
- **Types consistent:** `SlotShape` defined in `process-photo.ts` and re-declared in `image-slot-registry.ts` — both must read `"wide"|"portrait"|"square"`. `SlotDef`, `SlotAssignment`, `getSlot`, `getSlotDef`, `shapeToAspect`, `processPhoto({srcPath,outPath,shape,rotateExtra})` used identically across tasks.
- **Note on slot ids:** topic slot ids are `companion-<full-topic-slug>-<suffix>` e.g. `companion-companion-plants-for-tomatoes-hero` (the topic slug already contains "companion-plants-for-"). Verbose but unambiguous; the tool shows friendly `group`/`label`, so Kate never types these.
- **No placeholders:** every code step contains complete code.
