# The ideal crop page — design spec (July 2026)

Read `PROJECT_CONTEXT.md` and `docs/tone-of-voice.md` first. This spec builds on the
live crop template (field-guide frame + playbook layer, shipped 5 Jul 2026) — it is a
completion of that design, not a restart. Much of the structure below already exists;
the sections marked **NEW** are the work.

## The one-line thesis

The page must answer **"Can I sow this now, where I live?"** in under one second,
then earn the bookmark by being the only UK page that walks the whole season with
real photographic proof from a real plot.

---

## 1. Page structure, top to bottom

| # | Block | Status |
|---|-------|--------|
| 1 | **Sowing verdict band** — too early / good time / last chance / too late, localised | **NEW** |
| 2 | Hero photo (own photography, specimen "No. 12" plate) | exists |
| 3 | H1 + standfirst with drop cap | exists |
| 4 | **"Your dates"** — merged personalised dates + adjust-my-sowing toggle | **NEW** (merge of 2 existing widgets) |
| 5 | Specimen data strip (type / weeks to harvest / spacing / min soil temp) | exists |
| 6 | The season, step by step — playbook care steps + stage photos + in-flow buy points | exists |
| 7 | Live blight risk (blight crops only) | exists |
| 8 | When things go wrong — problem clinic with photo | exists |
| 9 | Varieties worth growing (write-ups, recipes, per-variety seed links) | exists |
| 10 | **Worth buying / skip this** — crop-specific kit honesty block | **NEW** (pattern exists in GearPick badges) |
| 11 | What to plant with it (companions) | exists |
| 12 | Go deeper (satellite guides) | exists |
| 13 | Questions (FAQ, mirrors FAQPage JSON-LD) | exists |
| 14 | Month links + contextual email capture + "I'm growing this" (My plot) | exists |
| Rail (desktop ≥lg) | Seeds → kit → postcode tool → My plot | exists; needs internal restyle |

Deletions from current page: none pending beyond the already-removed GrowingJourney.
The inline SeedSupplierLinks duplicate hides on desktop (`lg:hidden`) — rail covers it there.

## 2. Content blocks, exactly

Every block renders from data (crops.ts / varieties.ts / crop-playbooks.ts / crop-kit.ts).
Blocks render **only when the crop has the data** — no empty scaffolding, no filler.

**The verdict band (NEW — the centrepiece):**

- Four states, computed from the existing season engine (`getCropStatus` in
  `src/lib/season-core.ts`, closing-window maths in `src/lib/urgency.ts`):
  - `too-early` — frost-blue accent. "Not yet — and that's fine."
  - `good-time` — leaf-green accent. The confident yes, with method (indoors/direct).
  - `last-chance` — amber accent. Days-left number. Honest urgency, never salesy.
  - `too-late` — rust accent. **Never a dead end**: pivot to (a) what to sow instead
    right now (2–3 crop links from the season engine), (b) "already growing them?
    the season guide below is for you", (c) set a reminder for next year → the one
    natural email-capture moment on the page.
- Localised via saved postcode (`location-storage.ts`); without one, UK-average
  verdict + quiet inline "add your postcode for your exact dates" that expands the
  postcode input in place (listen for `whattosow:location-updated`, re-verdict live).
- One sentence of weather-aware colour, in voice, per state (see example copy).
- Accessibility: state conveyed by label text ("Good time to sow"), never colour alone.

**"Your dates" (NEW as a merge):** one calm block: the three dates (sow / plant out /
harvest) for your location, serif-led; beneath it a single quiet toggle — "Sowed on a
different day, or planted late?" — that reveals the current SowPlanner form. The form
is today permanently open and reads as a spreadsheet; behind a disclosure it becomes
a tool you reach for. Keep "Add to my plot".

All other blocks: as currently shipped (see the tomato page live for reference).

## 3. Above the fold

**Mobile (the primary design target):** header → verdict band → H1. The reader in the
garden gets the answer before a single scroll. Hero photo arrives on first scroll —
the photo is proof, not furniture; the verdict is the utility.
**Desktop:** verdict band overlays/precedes the hero; H1 + standfirst beside it.
Postcode affordance visible in both without typing being required.

## 4. Affiliate without spam

- **In-flow, at the moment of need, only** — supports at the plant-out step, feed at
  the first-truss step, mesh at the carrot-fly moment. One buy link per step, max.
- Rail (desktop) holds seeds + kit; mobile gets the in-flow moments plus the inline
  seeds block. Never a mid-article ad break, never a product wall.
- Every link goes through `AffiliateLink` (tag + rel=sponsored + unified
  `affiliate-click` event with product/merchant/type).
- Disclosure stays in-voice and transparent: the shed line ("if you buy through these
  links, a little goes towards a proper shed for the allotment").
- The "skip this" entries (below) are the anti-spam signal: a page that tells you what
  NOT to buy is a page whose "worth buying" means something.

## 5. Trust signals, placed

1. **Verdict honesty** — "too late" said plainly, with a kind pivot (top of page).
2. **Dated, own-plot photos** with diary captions ("mid june · staked on planting
   day") — proof of real growing, threaded through the season steps.
3. **Honest caveats in the clinic** — "nine times out of ten it's nothing" (problems).
4. **Skip-this entries** in the kit block (mid/lower page).
5. **Provenance line** near Your dates: "Dates worked out from your local frost
   pattern (Met Office data), not a national average."
6. **The shed** — the disclosure that explains *why* the links exist (kit block + rail).
7. FAQPage/HowTo/Breadcrumb schema present and truthful; no review stars we haven't earned.

## 6. Photos and allotment proof

- One photo per season step where we have it, diary mono caption, `img-grade`, real
  dates. The same bed across a season beats ten perfect stock shots.
- **Show the failures**: the still-green truss opens the problems section. Proof we
  actually grow is proof we can be trusted about what to buy.
- Never stock, never AI. If we lack a stage photo, run without — the slot fills the
  season Kate photographs it. Unmined June batch: potatoes #055–059, beans #078–080.
- Pipeline reminder: HEIC → `sharp().rotate()` (EXIF!) → resize → webp q82.

## 7. Example copy — tomatoes (state on 5 July: too late to sow)

> **● TOO LATE TO SOW — for this year**
> The tomato sowing window in your part of the UK closed back in April — a plant
> started now would meet the autumn frosts still flowering. If you're already growing
> them, this is your page: July is side-shoots, steady water and the first weekly
> feed, all below. Still itching to sow something tonight? **French beans, kohl rabi
> and autumn salads are all go →** Or we can nudge you next February when the
> tomato year begins again: **remind me →**

Standfirst (exists, keep): "Pinch out side shoots on cordon types. Feed weekly with
tomato feed once the first truss sets. Don't overwater — flavour comes from a bit of
stress."

Your dates block: "Sow indoors **17 February** · plant out **29 April** · first pick
around **24 June** — worked out for GL7 from your local frost pattern, not a national
average. *Sowed on a different day, or planted late?*"

## 8. Example copy — carrots (state on 5 July: last chance for a summer sowing)

> **● LAST CHANCE — about 10 days left**
> A quick early sort like Nantes sown this week still gives you sweet finger carrots
> before the cold shuts things down — after mid-July the maths stops working in most
> of the UK. Direct sow, thinly, into fine soil; they won't forgive a transplant.

Step copy (voice reference): "Carrots want the poorest bed you've got. Rich soil and
fresh compost make them fork and fang — save the good stuff for the courgettes, and
give the carrots the tired corner. Sow direct and thin ruthlessly: the smell of
thinning is what brings carrot fly, so do it on a still evening and firm back after."

Problem entry: "**Forked, twisted roots.** They hit something — a stone, a clod,
last month's manure. Nothing's wrong with the eating, only the beauty contest.
Next sowing: finer soil, no fresh compost, and a deep container is the cheat's
answer on stony ground."

## 9. The "worth buying / skip this" pattern

Per crop, in the kit block and rail — 2–3 *worth it* + up to 1 *skip*:

- **Worth it** = name · one-line why *tied to this crop's real failure mode* · price
  band · AffiliateLink. ("Enviromesh — the only carrot-fly answer that actually
  works; nets pay for themselves the first year you don't lose a row.")
- **Skip this** = the thing beginners waste money on, and the free alternative.
  Tomatoes: "Skip tomato-specific growbag frames and gadget feeds — a 30cm pot,
  peat-free compost and ordinary Tomorite do the whole job." Carrots: "Skip seed
  tapes — four times the price, and thinning is part of how carrots work."
- `GearPick` already has the badge set (our-pick / budget / essential / **skip-it**);
  skip entries carry **no link at all** — that's the point.
- Only claim ownership ("the one we use") for kit Kate actually owns; otherwise
  "what to look for" framing. Never invent ASINs; Amazon search links are fine.

## 10. Implementation notes (for Codex or any agent)

1. **Read `PROJECT_CONTEXT.md` and `docs/tone-of-voice.md` before writing anything.**
2. Stack rules: Next.js App Router, server components by default, Tailwind, **no new
   dependencies**. The verdict must be server-rendered with the UK-average state and
   hydrate to the localised state client-side (one small client component; postcode
   from `src/lib/location-storage.ts`, listen for `whattosow:location-updated`).
3. Reuse, don't rebuild: `getCropStatus`/season maths (`src/lib/season-core.ts`,
   `src/lib/urgency.ts`, `src/lib/variety-status.ts`), `AffiliateLink` (+`merchantSlug`),
   `GearPick` badges, `crop-playbooks.ts` for all deep content, `crop-kit.ts` for kit.
4. "Your dates" merge: fold `SowPlanner` behind a disclosure inside
   `PersonalisedCropDates`' presentation; keep both components' logic, change the frame.
   Do not delete SowPlanner functionality (PROJECT_CONTEXT: no functionality removed
   without approval).
5. Design language: Newsreader serif + IBM Plex Mono registers, cream/amber/leaf/rust
   palette, no rounded corners, no shadows, no emoji, `img-grade` on photos. The
   verdict band uses the existing frost/leaf/amber/rust tokens.
6. Verdict states must degrade: no postcode → UK-average copy; JS off → server
   verdict stands (page stays fully readable, tool sections hidden as today).
7. A11y: verdict state in text, focus-visible on the postcode input and disclosure
   toggle, `aria-expanded` on the toggle, keep heading order h1→h2→h3.
8. SEO: keep Breadcrumb + HowTo + FAQPage JSON-LD exactly as shipped; playbook crops
   keep the "How to Grow" title pattern; do not add a "can I sow X now" doorway —
   the verdict IS on-page content and the month pages (`/sow/[month]`) own that query
   family via internal links from the verdict band.
9. Mobile first: verdict above the fold at 390px; verify with CDP device emulation
   (`Emulation.setDeviceMetricsOverride`), NOT `--headless --screenshot --window-size`
   (known to lie — see memory note 5 Jul 2026).
10. Rollout: build against tomatoes + carrots first (opposite verdict states in July —
    good test pair), Kate reviews in browser at :3000, then roll to all crops. tsc +
    `npm run build` clean before any push; ONE deploy, Kate approves.
11. Do not touch `src/data/image-slots.json` or `public/photos/slots/companion-*`
    (in-progress work from another session).
