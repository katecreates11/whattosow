# Phase 2 REPAIR brief — finish the too-late fix (for Codex)

The first attempt is uncommitted in the working tree. Keep its good parts
(`reasonKind`, label changes, guide-copy cleanup, new tests). This brief closes
the gaps found in review. Read `docs/plans/too-late-trust-audit-2026-07.md`
first — it is still the governing spec. Do not expand the phase.

## 1. What failed

The copy layer improved; the **window audit did not happen**. Basil is still
told to wait until March (the brief's named, proven bug). Sweetcorn's crop-page
verdict says "choose something still in season" while /sow lists sweetcorn
under plant-out and the lead blog post shows Kate planting it — two surfaces
computing plant-out differently. Pumpkins get a generic template instead of the
required "gamble" honesty. The worth-waiting aside still has two dangling
"Next…" sentences, the hedge phrase, no glue clause and no corn-post link.
"Out of season" still renders on public surfaces.

## 2. Files to inspect

- **Window data / derivation:** `src/data/crops.ts` (per-crop
  `sowIndoorsWeeks` / `directSowWeeks` / `harvestWeeks`), the succession-crop
  handling in `src/lib/season-core.ts` and `src/lib/variety-status.ts`, and the
  new `windowsForCrop` inside `src/lib/server-seasonal-answer.ts`.
- **Avoid/listing logic:** `src/lib/server-seasonal-answer.ts` (+ its test).
- **Crop verdicts:** `src/lib/crop-now-answer.ts` (+ its test) and the verdict
  component on `src/app/crops/[slug]/page.tsx`.
- **Public "out of season" labels:** `src/lib/variety-status.ts`,
  `src/lib/season-core.ts` (the `label: "out of season"` returns),
  `src/app/crops/[slug]/[variety]/page.tsx` ("Out of season just now"),
  `src/components/StillTimePage.tsx` if it renders the label.
- **/sow copy:** `src/components/ServerSeasonalAnswer.tsx` (`WorthWaitingOn`).
- **Guide FAQ copy:** only if the banned-phrase grep still hits the three
  guides already touched — otherwise leave them.

## 3. Required data fixes (each threshold change documented in the commit body)

1. **Basil** — treat as a succession/leaf crop: sowable through **late July**
   on the UK average (indoors or direct into warm soil; a July sowing crops
   leaves from August). The mechanism already exists — season-core keeps
   succession crops open while harvest fits before autumn; put basil on that
   path (or extend its window end equivalently). July must render basil
   **sowable or closing, never waiting**.
2. **Courgettes** — *closing*, not closed, while a direct sowing still fits
   `harvestWeeks` (12) before the average first autumn frost — i.e. sowable
   into early July, amber-tagged. After that, plant-out only.
3. **Sweetcorn** — from seed: closed since ~late May (correct today). Plant-out
   window open into **early July**. The crop-page verdict MUST take the
   "past seed window; plant out" branch whenever /sow's `plantOutNow` includes
   it — see §5.
4. **Pumpkins** — from seed closed (~mid-May); as plants: possible-but-late
   after mid-June. Introduce no new state — use the existing past-seed/plant-out
   branch with the gamble copy (§4).
5. **French beans** — regression guard: currently the pick of the week; must
   never appear in `avoidSowingNow` in early July.
6. **Carrots** — regression guard: sowable/closing through mid-July (quick
   sorts); must not move.

## 4. Required copy fixes (final wording)

**/sow worth-waiting — ONE paragraph, this shape, data-filled:**
> **Worth waiting on:** {sweetcorn}, {courgettes}, {tomatoes} and {pumpkins}
> *from seed* — they now need more weeks than the season has left. As young
> plants, {sweetcorn} and {courgettes} are still fair game — they're on the
> plant-out list above, and here's how our corn went in →. From seed, their
> moment comes round again: {tomatoes} in {February}, the rest from {March}.

(The corn-post link is `/blog/planting-sweetcorn-dry-soil-bulb-planter`;
include it while sweetcorn is in the overlap set, drop it automatically when
the season moves on. One paragraph. No second "Next windows:" sentence. Kill
"can still make sense". Em dashes throughout.)

**Glue clause (whenever a crop is in both plant-out and worth-waiting):**
> "…are still fair game as young plants — they're on the plant-out list above."

**Basil verdict (after the window fix; July = good time / closing):**
> "Good time — basil is quick. Sown this week somewhere warm, it's giving
> leaves from August; late sowings stay smaller but just as sweet. Pot one up
> for the kitchen windowsill when the nights turn."

**Sweetcorn verdict (past seed window, plant-out open):**
> "Past the seed window — but not the planting one. From seed, sweetcorn
> needed May; sturdy young plants can still go in this week (here's how ours
> went in →). Already growing it? Keep the block watered and watch for the
> tassels."

**Pumpkin verdict (past seed window, plant-out marginal):**
> "Too late from seed, and honestly a gamble as plants — one that needs a kind
> autumn to pay off. Ours went in late this year too, so we're gambling
> together. Otherwise their moment comes round again in April."

(The "ours went in late too" clause is TRUE as of July 2026 — Kate's editor
note. It is seasonal copy: flag it for removal at season end, and Kate approves
the sentence before ship since it speaks as her.)

**"Out of season" replacement (all label sites):**
- Where the next window month is known: `waiting for {month}` (lowercase mono
  label) / variety page: "Waiting for {month}."
- Where unknown: `between sowing windows`.

## 5. The one-source-of-truth rule

Extract the window derivation into one shared module —
`src/lib/sowing-windows.ts` — exporting `windowsForCrop(crop, frostDate)`
(sow-indoors, direct, plant-out, with open/close dates). **Both**
`server-seasonal-answer.ts` and `crop-now-answer.ts` import it; their own
window code is deleted, not paralleled. StillTimePage reads the same module if
it computes windows. After this, /sow and a crop page *cannot* disagree,
because neither owns a calendar — and a consistency test (§8) locks the door.

## 6. Acceptance criteria

- **/sow (July render):** basil in the sowing list (tag DIRECT or EITHER, or
  amber closing); French beans positive; courgettes closing or plant-out, never
  bare-negative; worth-waiting is ONE paragraph with the glue clause and corn
  link; no "Next windows:" second sentence; em dashes only.
- **/sow/july:** no contradiction introduced; sweetcorn still absent from
  sow-now lists.
- **/crops/basil:** verdict positive for July, no "unlikely to beat the autumn
  cold".
- **/crops/sweetcorn:** "past the seed window — but not the planting one",
  corn-post link present, already-growing carve-out present.
- **/crops/courgettes:** verdict agrees with /sow (closing or plant-out — the
  same answer).
- **/crops/pumpkins:** the gamble sentence, no "choose something still in
  season" template.
- **Regressions:** tomatoes still too-late-from-seed with carve-out; carrots
  still sowable/closing; French beans still the positive pick.
- Banned-phrase grep (audit brief §4 + "out of season") returns zero on public
  surfaces. `tsc` + `npm run build` + `npx vitest run` clean; 390px CDP on /sow.
- **The Kate test:** /sow and the seven verdicts read against her actual
  fortnight — no winces.

## 7. Banned fixes

- Hiding a crop from a list to dodge a contradiction (deleting data instead of
  fixing it).
- Changing copy while leaving the wrong window (the first attempt's mistake).
- New states, new components, new abstractions beyond `sowing-windows.ts`.
- Touching homepage layout, the /crops redesign, month-page structure.
- Touching any affiliate URL or `data-umami-*` attribute.
- Touching `src/data/image-slots.json` / `public/photos/slots/companion-*`
  (note: the working tree's image-slots.json diff is NOT yours — leave it out
  of your commit).
- Blanket-widening every crop's windows to make the problem disappear —
  only the crops in §3, each documented.

## 8. Tests to add or update

In `src/lib/server-seasonal-answer.test.ts` (fixed July date fixture):
- `basil appears in sowing entries, not in avoidSowingNow`
- `french beans never in avoidSowingNow in early July`
- `every avoidSowingNow entry has reasonKind and a next-window month`
- `overlap set (plantOutNow ∩ avoidSowingNow) is exposed for the glue copy`

In `src/lib/crop-now-answer.test.ts`:
- `sweetcorn in July → past-seed-window + plant-out action`
- `pumpkins in July → past-seed-window + gamble copy flag`
- `basil in July → sowable state`
- `carrots mid-July → closing, not closed`
- `tomatoes in July → too-late-from-seed with carve-out copy`

New consistency test (the §5 lock):
- `for every crop: crop-now-answer's plant-out verdict ⇔ membership of
  server-seasonal-answer's plantOutNow, same date, same frost input`

## 9. Commit message

`Fix too-late windows for real: shared sowing-windows source, basil/courgette/sweetcorn/pumpkin corrected, one worth-waiting paragraph`
