# What To Sow — Visual Anti-Pattern Library

**Never do this / do this instead.** Companion to `docs/DIRECTION.md` §7 (the taste
checklist). That file says the principles; this one shows the failures we actually
keep shipping, with real examples from this codebase. Check every new or changed
block against it BEFORE opening a PR. Two matches against the "never" column =
redesign it, don't defend it.

The root disease is always the same: **a box where an editor should be.** When you
don't know what matters most, you make everything equal — equal cards, equal chips,
equal buttons. An editor decides. These ten patterns are the ten ways the site
stops being a periodical and becomes a dashboard.

---

## 1. Equal card grids

**Why it fails:** six identical beige boxes means six equal claims on attention,
which means no hierarchy, which means no editor. Grids of sameness read as
generated content — because they are. (This shipped twice: the six-box seasonal
answer, and the 40-box "Browse the crops" page.)

**Instead:** one lead + quieter followers. Ruled lists (`border-t border-earth/8`)
on open ground. If everything in a set really is equal, it's a *list*, not a grid
of cards.

**Bad (shipped, since fixed):**
```
[ What to sow now    ] [ What to start indoors ]
[ What to sow outdoors] [ What to plant out    ]
[ What to avoid      ] [ What to read next     ]   ← six boxes, one beige
```
**Good:**
```
THE WEEK'S LIST · WEEK OF 6 JULY
If you sow one thing this week: dwarf French beans — …
──────────────────────────────────────────────
Carrots            DIRECT      ~ closing · mid-july
French beans       EITHER
──────────────────────────────────────────────
Worth waiting on: parsnips and broad beans — their moment comes round again.
```

**Codex notes:** no `grid-cols-N` of identical children with borders. If a section
needs a grid, it needs a lead item styled differently from the rest, or it needs to
become rows. Delete the wrapper boxes; keep the semantic headings (style them small).

## 2. Crop chips

**Why it fails:** a bordered rectangle saying "Dill" is a filter button from a SaaS
app. Nothing about it says *dill*. Chips also wrap into clouds, and clouds have no
reading order.

**Instead:** crop names are **names**: Newsreader serif, linked, rust on hover,
amber underline, in ruled rows with a mono method/status tag. One name per line
beats twelve chips per cloud.

**Bad:** `[Carrots] [Peas] [Spring onions] [Beetroot] [French beans] [Lettuce]`
**Good:**
```
Carrots        DIRECT     ~ closing · sow by mid-july
Dill           DIRECT     sow where it'll stay — it hates moving
```

**Codex notes:** `font-serif text-lg` for the name, `font-mono text-[10px]
uppercase tracking` for the tag, `border-t` between rows. Never `border px-3 py-1`
around a crop name. Preserve every `href` and tracking attribute when de-chipping.

## 3. Metric strips

**Why it fails:** "23° · soil 25° · W 16mph · waning gibbous" is data without
judgement. Data is a dashboard; judgement is a neighbour. Readers came to be told
what to *do*, not to read instruments.

**Instead:** one sentence of judgement first, then at most one line of mono
footnote. **One number per moment** — days left, degrees, or millimetres, whichever
matters tonight.

**Bad:** four tiles: `23° right now | 25° soil | W 16 mph | sunset 21:33`
**Good:**
> The beds have been giving water to the sky all day. A slow, deep soak at the
> roots this evening — pots first, they're always thirstiest.
> `rain 0mm · soil 25° · nothing due till friday`

**Codex notes:** metrics render as ONE `font-mono text-[10px]` line *below* the
serif sentence, never as sibling tiles. If a design has a row of stat cells, it
belongs on /my-garden, and even there it leads with the sentence.

## 4. Dashboard panels

**Why it fails:** a bordered module with a bold panel-title ("YOUR GROWING SEASON")
and content inside is admin-UI grammar. Stack three of them and any page becomes a
control panel, whatever the font.

**Instead:** open sections. Serif-italic eyebrow ("the season"), serif heading,
content on the page ground, hairline rules for structure. The page is an article
with tools inside it, not a shell with widgets inside it.

**Bad:** `┌─ YOUR GROWING SEASON ─────┐ │ [content] │ └───────────┘`
**Good:**
```
the season
Growing tomatoes, step by step
────────────────────────────────
01  LATE FEBRUARY TO EARLY APRIL
    Sow indoors, somewhere warm
```

**Codex notes:** a box needs written justification (DIRECTION §7). Backgrounds are
section *washes* (sage/ochre at low opacity, full-bleed) — not per-module fills.
No `rounded`, no `shadow`, ever.

## 5. Repeated CTAs

**Why it fails:** "GET THE SEEDS →" eleven times down a wall, or "too late to
start from seed now" five times in a list, is wallpaper. The reader's eye learns to
skip the repeated thing — you've spent eleven CTAs buying one blindness.

**Instead:** repetition is for structure (rules, tags), never for sentences or
CTAs. Vary the buy-line by moment ("The spiral supports that make tying-in
optional →" / "Tomorite — the weekly feed →"), and collapse repeated statements
into one sentence naming all cases ("Worth waiting on: sweetcorn, courgettes and
pumpkins from seed — buy plants now or plan them for spring").

**Bad:** `Sweetcorn: too late to start from seed now.` ×5, one per line.
**Good:** one warm sentence naming all five, links kept, ending forward.

**Codex notes:** if a `.map()` renders the same sentence with a different noun,
move the nouns into one sentence. Identical CTA labels are allowed only inside a
uniform commerce structure (the buying-guide table rows) — never in editorial flow.

## 6. Over-explaining "how this works"

**Why it fails:** "Enter your postcode below to see personalised planting dates
based on your local frost date" is the tool explaining itself before doing
anything. Confidence is quiet. Neighbours don't preface advice with methodology.

**Instead:** do the thing, then one quiet provenance line after the result:
"Worked out for GL7 from your local frost pattern (Met Office data), not a
national average." Instructions live in placeholders and labels, not paragraphs.

**Bad:** an info-bar: "ⓘ Enter your postcode below to see personalised planting dates"
**Good:** the input, placeholder `E.G. SW1A 1AA`, and after results one mono line:
`worked out for your frost pattern · met office data`

**Codex notes:** delete preamble paragraphs above tools. Any "how this works" text
longer than one line moves to the FAQ. Never explain what a button will do in a
sentence next to the button.

## 7. Generic guide grids

**Why it fails:** four equal sage tiles titled "Allotment for beginners", "Starting
from seed"… is a category page pretending to be a recommendation. It says "we have
content", never "read this one next, because".

**Instead:** editorial doors — the go-deeper register: serif title, one-line hook
that *sells the specific piece*, arrow, ruled rows. Three doors chosen beats eight
tiles listed.

**Bad:** `[ Allotment for beginners ] [ Starting from seed ] [ Composting ] [ Watering ]`
**Good:**
```
Outdoors or greenhouse?      What each buys you, and the varieties for each side of the glass.  →
Dealing with the glut        You will need this by August.                                      →
```

**Codex notes:** guide links render as the cross-link row pattern (see any guide's
"Next" section), with a hook line under the title. Curate per context (3–4 max) —
never dump a tag's whole contents.

## 8. Product buttons

**Why it fails:** a grey pill saying "VIEW ON AMAZON" next to Newsreader serif is
SaaS furniture in a periodical — and a page of identical grey pills reads as an
affiliate site, which spends trust we can't afford.

**Instead:** buy-points are sentences with a tracked link in the site's link
language — serif italic, rust/amber underline: "The soaker hose we use →". Solid
mono-caps buttons are reserved for uniform commerce structures (buying-guide table
rows), one style, used nowhere else.

**Bad:** `[ VIEW ON AMAZON ↗ ]` (grey, bordered, ×5 down a rail)
**Good:** `Tomorite — the weekly feed →` (serif italic, rust, border-b, AffiliateLink)

**Codex notes:** every outbound product link goes through `AffiliateLink`
(tag + rel=sponsored + the unified `affiliate-click` event). Styling changes must
keep tracking attributes byte-identical. Never invent ASINs; search links are fine.

## 9. Footer / link-farm patterns

**Why it fails:** three columns of every route on the site is a sitemap wearing a
footer costume — and it whispers "SEO plumbing" on every page. Also: "Support this
tool" is tool-speak; the site is a periodical.

**Instead:** a curated footer: wordmark + one warm line + the seasonal whisper,
one SHORT column of real doors, provenance (data sources) and the honest affiliate
line. Rule of thumb: no footer link that couldn't earn one sentence of "why you'd
click this".

**Bad:** GROW (7 links) + EXPLORE (6 links) + every page ever shipped.
**Good:** five doors max per column, "Support this tool →" becomes "**Towards the
shed →**" (the shed fund IS the support story, and it's ours).

**Codex notes:** footer changes are page-count-adjacent — don't add links to the
footer to "surface" pages; surfacing happens editorially in the body. Keep the
seasonal italic line; it's the footer's one moment of life.

## 10. AI-sounding copy

**Why it fails:** the reader can smell it, and this brand's entire value is that a
person grows these things. Generic transitions, symmetric triads, hedge-phrases and
brochure adjectives all say "no one lived this sentence."

**Never write:** "Whether you're a seasoned gardener or just starting out…" ·
"It's worth noting that…" · "Look no further" · "Unlock / elevate / delve" ·
"hassle-free / fuss-free solution" · perfectly parallel triads ("Simple. Fast.
Reliable.") · starting three sentences running with the same word · praising the
site's own feature ("our powerful personalised engine").

**Instead (the voice test):** weather first, "we" honestly, one concrete detail a
real grower would know, end facing forward. If a sentence could appear on any
gardening site, it isn't finished.

**Bad:** "Growing carrots is easy and rewarding! With our handy guide, you'll
enjoy a bumper harvest in no time."
**Good:** "Carrots want the poorest bed you've got — rich soil just makes them
fork. Give them the tired corner and they'll quietly get on with it."

**Codex notes:** read `docs/tone-of-voice.md` before writing ANY user-facing
string, including microcopy, alt text and commit-adjacent UI. Copy belongs in data
files where Kate can edit it. When in doubt, write shorter and more specific — and
if a line is doing personality without information, cut the line.

---

## The two tests (from DIRECTION §7, they govern here too)

1. Would a weekly gardening paper print this on its front page?
2. Would someone screenshot it and send it to a friend?

Boxes, chips, metric tiles, grey pills and "it's worth noting" have never once
passed either.
