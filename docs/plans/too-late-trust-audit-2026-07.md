# Phase 2 — the too-late trust audit (brief for Codex)

Read `docs/COPY_REWRITES.md` §3–4 and `docs/ANTI_PATTERNS.md` §5/§10 first. This
is a trust fix, not a redesign. Scope: the avoid/too-late data windows and the
copy that renders them. Nothing else.

## 1. The trust problem, in one paragraph

The site currently tells readers a crop is "too late" while simultaneously
showing the same crop on the plant-out list, in the July weekly copy, or in a
blog post where Kate is visibly planting it that week. The engine is collapsing
four different situations — can't sow, can still plant, already growing, wait
for the next window — into one negative verdict, and a reader who catches the
site contradicting its own author once will discount every date it publishes
afterwards. Dates are the product; this bug is aimed at the product.

## 2. The four states, precisely

| State | Meaning | It is a statement about |
|---|---|---|
| **Too late from seed** | Sowing now cannot reach harvest before the season closes (harvest weeks + buffer vs first autumn frost / light decline) | *sowing*, nothing else |
| **Still fine as young plants** | The plant-out window is open even though the sowing window has shut; bought or raised plugs go in now | *planting* |
| **Already growing — keep going** | Nothing about the calendar applies to a plant that's in; the reader needs care, not verdicts | *care* |
| **Worth waiting** | The next sowing window is a *date*, not a failure; name the month and link it | *the future* |

Every "too late" surface must make clear WHICH of these it is talking about,
and must never let state 1 read as states 2–4.

## 3. Crops most likely wrong or confusing (audit these seven first, July render)

- **Basil** — flagged "from seed, needs more weeks" in early July. **Wrong.**
  July-sown basil gives leaves from August; indoor sowings work later still.
  The window is closing weeks too early. This is the proven bug.
- **Courgettes** — appears in worth-waiting while the June weekly copy says
  "still time, direct into warm soil" and it sits on the plant-out list. A
  12-week crop direct-sown in very early July still crops in September in most
  of the country: that's *closing*, not *closed*.
- **Sweetcorn** — correctly too late *from seed* (needed May), but it's on the
  plant-out list AND the site's lead blog post is Kate planting plugs this
  week. The two lists must be glued by copy (see §6).
- **Pumpkins** — too late from seed: true. As plants: late-but-possible, and
  Kate's own post calls the timing tight. Copy may say "a gamble now", never
  "fine".
- **Tomatoes** — verdict correct since April; audit the copy for the
  already-growing carve-out only.
- **Carrots** — engine matches the editorial ("quick sorts by mid-July") —
  verify the closing threshold reflects 12–14-week varieties, not maincrop.
- **French beans** — the current pick of the week. If any surface flags them
  negative in early July, that's a bug of the first order.

Reference windows for the checks (UK average; the postcode engine shifts them):
basil seed → late July (leaf crops); courgette direct → early July; dwarf
French beans direct → mid-July; sweetcorn seed → late May, plugs → early July;
quick carrots → mid/late July; tomato seed → mid-April; pumpkin seed → mid-May,
plants → mid-June (later = gamble).

## 4. Banned phrases (grep for these; zero must remain)

- "too late to start from seed now" as a bare repeated line
- "unfortunately" / "you've missed" / "missed the window"
- "expired", "out of season", "no longer possible", "window closed" (status register)
- "should have been sown by" (blame arithmetic)
- any "too late" without a following *instead* in the same breath

## 5. Replacement phrases (from COPY_REWRITES §3–4; use these shapes)

- "**Worth waiting on:** {crops} *from seed* — they now need more weeks than
  the season has left."
- "As young plants they're still fair game — {crop} is on the plant-out list
  above." (the glue sentence)
- "Already growing them? Keep going — {care link}."
- "Their moment comes round again in {month} →" (always linked)
- "A gamble now, honestly — but here's how ours went in →" (pumpkins/corn,
  linking the sweetcorn post while seasonal)

## 6. How each surface handles "too late"

- **/sow** — ONE worth-waiting paragraph (already the design). New rule: any
  crop present in both the plant-out list and the worth-waiting sentence gets
  the glue clause ("as plants they're on the plant-out list above"). Never two
  "Next windows:" sentences — one sentence, all crops, all linked.
- **/sow/[month]** — static month reference: audit that each month page's crop
  lists agree with the engine (July page must not say "sow sweetcorn"). No
  live verdicts here; just correctness.
- **Homepage Answer** — never shows too-late items at all. It is the edit:
  sowables plus at most one closing warning. Verify nothing negative leaks in.
- **Crop pages (verdict band)** — the three-beat rule every time: verdict →
  reason (concrete, one clause) → pivot. The pivot MUST include the
  already-growing carve-out ("Already growing them? This page is yours…") and
  the next-window month link. Audit all four verdict states' copy on the seven
  crops above.

## 7. Data audit

1. For each crop, print the engine's computed last-sow date (indoor and direct
   separately) for the UK average, alongside the §3 reference windows. Fix the
   thresholds that disagree (likely: per-crop window ends derived from
   `sowIndoorsWeeks`/`directSowWeeks` singletons instead of succession-aware
   ends in `variety-status`/`season-core` — document each constant changed and why).
2. Replace `reason.includes("too late")` string-typing with a structured field
   on `AvoidSowingEntry` (`kind: "too-late-from-seed" | "next-window"`). Copy
   should branch on data, never on its own prose.
3. Detect the overlap set (crops in both `plantOutNow` and `avoidSowingNow`)
   and expose it so the copy can glue them (§6).
4. Confirm `harvestWeeks` sanity for the seven crops (a wrong harvestWeeks
   poisons every window downstream).

## 8. Copy audit

1. Grep the banned phrases (§4) across `src/` — components, month-page
   templates, PlantingTool, verdict band, blog templates, data files.
2. Every "too late" instance: classify against the four states; rewrite to the
   §5 shapes; verify the *instead* is in the same sentence or the next.
3. Verdict-band copy on the seven crops: three beats + carve-out present.
4. The worth-waiting aside on /sow: one paragraph, em dashes not hyphens,
   corn-post link while seasonal.

## 9. Must not touch

- `season-core`'s frost model and postcode maths (thresholds/constants only,
  each documented in the commit body).
- Homepage layout, crop-page structure, playbook content, month-page structure.
- Any affiliate link or tracking attribute.
- `src/data/image-slots.json`, `public/photos/slots/companion-*`.
- Copy Kate has edited in data files (her deletions are vetoes).

## 10. Acceptance criteria

- July render: basil sowable-or-closing (not waiting); French beans positive
  everywhere; courgettes closing-not-closed; sweetcorn/courgette overlap
  carries the glue clause; pumpkins say "gamble", not "fine" or "impossible".
- Banned-phrase grep returns zero across `src/`.
- Every worth-waiting crop links its next month; no bare negatives anywhere.
- `AvoidSowingEntry` has the structured `kind`; no prose-sniffing remains.
- The seven crops' verdict bands pass the three-beat + carve-out check.
- Each threshold change named and justified in the commit body.
- `tsc` + `npm run build` + `npx vitest run` clean; 390px CDP check on /sow.
- **The Kate test:** she reads /sow and the seven crop verdicts against what
  she actually did on the plot this fortnight, and nothing makes her wince.

## 11. Suggested commit message

`Fix too-late windows and copy: four states, from-seed precision, no bare negatives`
