# Bed Planner — design direction

**Written:** 4 June 2026 (design research, pre-build)
**For:** Kate to approve the *look* before I build the generator.

---

## The gap (why this can be a top-tier asset)

I looked at the field and at what people actually save:

- **Every existing planner is a utilitarian, paid SaaS grid.** GrowVeg (~$35/yr), VegPlotter (~$22/yr), SeedTime ($7/mo) are all drag-and-drop grids with clip-art plant icons. Functional, generic, behind a paywall, and *nobody screenshots them.*
- **What people pin and print are editorial infographics** — the Almanac's layouts, Roots Nursery's companion-planting infographic — and, at the high end, **planting plans drawn as artworks.** Piet Oudolf's plans (layered symbols, hand annotation, blocks of colour) are exhibited in galleries in their own right.

**Our opening:** a *free* planner whose output is a genuinely beautiful, botanical, screenshot-worthy plan, in the herbarium/Ghibli identity we already own. Nobody else has "beautiful + free + UK companion-aware." That's a defensible, pinnable, link-worthy asset.

## Guiding principle: a plan as artwork, not a form

Two references, married to our existing look:

1. **Oudolf's planting plans** — top-down, organic *drifts* of plants with a rich annotation language (dots, ticks, hand-set labels). Not a rigid grid of identical boxes. The plan itself is the beautiful object.
2. **Botanical seed-packet craft** (Botanical Interests et al.) — accuracy, warmth, the dignity of a drawn plant.

…rendered in the **What To Sow herbarium identity** we already have: aged-paper warmth, taped specimen labels, Newsreader serif, IBM Plex Mono caps, the Ghibli palette.

The test for every pixel: *would someone print this and pin it to the shed door?*

## Visual language

- **Palette** — Ghibli set; crops coloured by family/type so a whole plan reads at a glance (alliums purple, legumes green, roots amber, brassicas blue-green, fruiting red, flowers gold).
- **Type** — Newsreader serif for plant names & headings; IBM Plex Mono (caps) for measurements, counts and eyebrows.
- **Texture** — warm paper ground, subtle soil stipple, a **timber frame** around each bed (already prototyped in the rebuilt `BedDiagram`), soft shadows. No flat boxes anywhere.
- **Hand-made details** — slightly irregular drifts, drawn leaf glyphs, a taped serif label on each bed plate.

## The plant-symbol system — the heart of "not just boxes"

Instead of identical dots, a small set of **drawn top-down glyphs by growth habit**, each drawn once in SVG and re-tinted per crop:

| Habit | Glyph | Crops |
|---|---|---|
| Leafy rosette | concentric leaves | lettuce, chard, brassicas |
| Climber on supports | cane/wigwam + tendril | beans, peas, cordon tomatoes |
| Root + feathery top | tuft | carrots, parsnips, beetroot |
| Fruiting bush | broad clump + fruit dots | courgette, squash, peppers |
| Allium spear | upright strap leaves | onion, garlic, leek |
| Bloom | simple flower | marigold, nasturtium, borage |
| Ground cover | soft hatched drift | salad carpet, green manure |

Spaced to realistic square-foot counts and **clustered into organic drifts**, not grid dots. This drawn style is *more* cohesive and on-brand than licensed photo cutouts — and it's the thing that makes us look designed, not generated.

## The bed "plate" (per bed)

- A framed top-down plan (timber frame, soil, drifts of glyphs) with a **taped serif label** — "Bed 1 · The salad & roots bed".
- **Margin annotations**, Oudolf-style — little hand-set notes pointing into the plan: "tall beans to the north", "marigolds to pull whitefly", "quick radishes here while the parsnips wake up".
- A **data strip** beneath: each crop with spacing + count, a tiny **sow→harvest season bar**, its rotation family, companion notes, and any **warnings**.

## Page & flow

- **Editorial hero**, not a SaaS dashboard — "Plan your beds for the year" with a botanical illustration.
- **Quiet, well-set input** — choose beds (presets) and tick crops; it should feel like leafing through a seed catalogue, not filling a settings panel.
- **The generated plan** — a vertical sequence of bed plates + an overall **key** + a **season-at-a-glance** strip across the year.
- **"Kit for this plan"** — styled as seed-packet-ish cards that belong to the design, not a bolted-on ad. (The affiliate click-throughs.)

## Printable / shareable = the actual asset

- A **print stylesheet** that turns the plan into a beautiful one- or two-page sheet — the thing people print and stick on the shed door (and the reason they come back and share it).
- A vertical **"my plan" pin** via the existing pin engine for Pinterest distribution.

## Honest constraints / what I'll build

- **Drawn SVG symbols, not photoreal cutouts** — licensing + a per-crop asset library would be huge, and the drawn style is more cohesive anyway.
- **Server-rendered SVG + light client state** — no heavy canvas/drag libraries. Keeps it fast, accessible, and properly printable.

## Proposed next step

Before building the generator, I'll make **one static sample bed plate** in this exact style so you can *see* the look and approve it (or steer it). Then I build the engine behind it.

## Sources
- [GrowVeg planner](https://www.growveg.com/) · [VegPlotter](https://vegplotter.com/) · [SeedTime](https://apps.apple.com/us/app/vegetable-garden-farm-planner/id6695760911) (the utilitarian SaaS field)
- [Old Farmer's Almanac free garden layouts](https://www.almanac.com/free-garden-layouts-plans-library) · [Roots Nursery companion infographic](https://rootsnursery.com/vegetable-garden-layout/) (the screenshottable editorial reference)
- [Piet Oudolf's plans as artworks — Gardens Illustrated](https://www.gardensillustrated.com/features/piet-oudolf-at-work) (the plan-as-artwork principle)
- [Botanical illustration & seed-packet craft — Horticulture](https://www.hortmag.com/gardening-blog/the-art-of-botanical-illustrations)
