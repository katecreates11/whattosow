# Commercial surface inventory - 15 July 2026

Purpose: keep the shed-fund work honest. This is a working map of where commercial
links currently earn their place, where they should be watched, and what to prune
before adding anything new.

Rules:

- Trust anchors stay commercial-free: homepage Answer, Watering Note, crop verdicts,
  crop now answers, FAQs and charm/editorial notes.
- One commercial moment per screenful.
- Skip-this advice stays unlinked.
- New affiliate surfaces should replace, test against, or remove an existing one.

## Keep

| Surface | Current job | Tracking pattern | Decision |
|---|---|---|---|
| `/sow` SEEDS column | Buy seeds at the point of choosing what to sow. | `sow-list-seeds-*`, with lead rows split as `sow-list-seeds-lead-*`. | Keep. Measure lead vs ordinary rows for 30 days. |
| Crop buying advice | Crop-specific worth-buying / skip-this notes. | `crop-buying-advice-{crop}-{product}`. | Keep for current measured rollout only. Do not expand sitewide yet. |
| Variety page supplier links | Exact variety intent. | `variety-page-seeds-*`. | Keep; not a duplicate of generic crop seed links. |
| Companion planting buyer note | One flower-seed moment after useful companion advice. | `companion-buyer-note-flower-seeds`. | Keep and measure; no extra companion pair monetisation. |
| Watering buyer note | Job-led watering kit, with watering cans included for allotment realities. | `watering-buyer-note-*`. | Keep; this is the current model. |
| Seed-starting kit guide | Explicit buying-guide intent. | `seed-kit-detail-*`. | Keep after pruning; now one strong pick per job. |
| Blight Watch resistant varieties table | High-intent variety choice after free prevention advice. | `blight-resistant-varieties`. | Keep. BlightKit now supports prevention rather than duplicating variety links. |

## Watch

| Surface | Why watch | Next report question |
|---|---|---|
| Crop page sidebar seed links | Useful on desktop, but could compete with crop buying advice lower down. Hidden on mobile to avoid duplicate generic seed CTAs. | Do desktop sidebar seed clicks convert, or do crop buying blocks perform better? |
| Mobile inline crop seed links | Useful because the sidebar disappears on mobile. | Are mobile inline links earning clicks without hurting the crop answer flow? |
| Seasonal kit edit | Editorial, but it can appear on multiple surfaces. | Which surface earns clicks: homepage, `/sow`, or crop rail? Keep at most two. |
| BlightKit soil-level watering link | The only immediate gear link on Blight Watch. | Does `blight-defence-soaker-hose` earn, or should Blight Watch become resistant-varieties only? |
| Guide family buyer notes | Squash, containers, winter salad, brassicas and older guide notes use the same useful pattern but vary in density. | Which notes get clicks per 1,000 sessions? Prune zero-click notes after a fair read. |

## Prune Candidates

| Surface | Why it may be clutter | Trigger |
|---|---|---|
| Older guide pages with many GearPicks | Can read as a catalogue rather than advice. | Meaningful sessions plus zero clicks over 30 days. |
| Duplicate crop seed surfaces on desktop | Crop page can contain sidebar seeds, varieties, buying advice and playbook links. | If multiple surfaces appear in one screenful, keep the most intent-specific one. |
| Generic search-result Amazon links | Often weaker than direct product or supplier links. | Replace with better direct links when a product has earned clicks. |
| Seasonal kit appearing in too many places | Same products repeated can feel like a shop. | Keep only the two placements with measurable clicks. |

## Current crop-page rule

- Mobile: generic crop seed links appear inline only; sidebar seed block is hidden.
- Desktop: sidebar seed block appears; mobile inline block is hidden.
- Variety-card links stay because they are variety-specific.
- Crop buying advice stays below growing guidance, not near the verdict or now-answer.

## Next 30-day questions

1. Which surface gets the best affiliate clicks per 1,000 sessions?
2. Does `sow-list-seeds-lead-*` outperform ordinary `/sow` rows?
3. Do crop buying blocks outperform generic seed sidebars?
4. Does Amazon US get clicks from the ZIP test?
5. Does Blight Watch earn from resistant varieties, soil-level watering, or neither?
6. Which GearPicks have traffic and zero clicks?

No new affiliate block should be added until this inventory has been compared
against the next Umami and merchant reports.
