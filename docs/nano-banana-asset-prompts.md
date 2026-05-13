# Lucky Dip Game — Nano Banana Asset Generation Guide

## How To Use This Guide

1. Open Gemini with your Nano Banana credits
2. **Start with the Style Anchor (Prompt 1)** — this establishes the look
3. If you're happy with the style, **stay in the same session** — Nano Banana has session memory
4. Work through the prompts in **session order** (see Session Plan below)
5. Save each image as a PNG with the filename specified
6. Drop them into `public/game/` in the project

## Important Nano Banana Tips (from research)

- **Stay in one session** per batch — session memory maintains style consistency
- **Be specific, not repetitive** — no "4k, masterpiece, trending" spam. Natural language works.
- **Use the same trait words verbatim** across all prompts — don't switch between "warm" and "cosy"
- **Re-anchor the style** at the start of each new session: upload the tomato image and say "I want all new images in exactly this style"
- **No text** — always specify "no text" to prevent AI adding words
- **Don't do all 39 in one session** — style drifts over long sessions. 8-12 per session is ideal.

---

## Session Plan

### Session 1: Foundation (8 images) — DO THIS FIRST
Gets the game visually functional.
1. Style anchor tomato (card version)
2. Style anchor tomato (game sprite version)
3. Soil tile
4. Soil tile with seed hole
5. Wooden raised bed border
6. Mystery seed
7. Sprout (growth stage 1)
8. Young plant (growth stage 2)

### Session 2: In-Season Crops (10-12 images)
The crops people will actually discover right now. Pick whichever are currently sowable. Top priorities:
- Strawberry, Pea, Broad bean, Lettuce, Carrot, Beetroot, Radish, Onion, Spinach, Potato

### Session 3: Remaining Crops + Effects (10-12 images)
- Courgette, Sweetcorn, Pumpkin, Raspberry, Blackcurrant, Gooseberry, Rhubarb, Pepper, Broccoli, Cucumber
- Harvest sparkle effect
- Welcome state illustration

### Session 4: Borders + Extras
- 4 rarity card borders (common, uncommon, rare, legendary)
- Herb bundle, Sunflower, Runner bean, Chilli
- Garden background
- Harvest basket, Watering can

---

## Two Types of Asset

Every crop needs TWO versions:

**Card version** (for info panels, collection view):
- Cream background (#F5EFE0) — shows in the UI panels
- Three-quarter angle, 512x512px

**Game sprite** (for the Phaser garden grid):
- Transparent background — composites over soil tiles
- Three-quarter angle, 256x256px
- If Nano Banana can't do transparent, use **solid magenta (#FF00FF)** background — I'll key it out in code

For Session 1, generate BOTH versions of the tomato to test which backgrounds Nano Banana handles better. Then use whichever works for all subsequent crops.

---

## PHASE 1: Style Anchor

### Prompt 1a: Tomato — Card Version

Save as: `tomato-card.png` (512x512)

> A single ripe red tomato on a short vine with two small green leaves. Warm, richly detailed digital illustration in the style of a premium cosy farming video game — think the item art from Animal Crossing or Pokémon inventory screens. NOT pixel art. Painterly but clean, with soft shading, rich saturated colours, and a gentle warmth. Slightly stylised (not photorealistic) but detailed enough to feel like a real object you could pick up. Soft natural lighting from the upper left. Viewed from a slight three-quarter angle (not flat front-on). Isolated on a solid cream background (#F5EFE0) with no shadows cast on the background. No other objects. No text. No border. Square 512x512 pixels.

### Prompt 1b: Tomato — Game Sprite Version

Save as: `tomato-sprite.png` (256x256)

> A single ripe red tomato on a short vine with two small green leaves. Warm, richly detailed digital illustration in the style of a premium cosy farming video game — think the item art from Animal Crossing or Pokémon inventory screens. NOT pixel art. Painterly but clean, with soft shading, rich saturated colours, and a gentle warmth. Slightly stylised (not photorealistic) but detailed enough to feel like a real object you could pick up. Soft natural lighting from the upper left. Viewed from a slight three-quarter angle. Isolated on a completely transparent background. No shadows, no ground, no other objects. No text. No border. Square 256x256 pixels.

**If transparent doesn't work, try:** "...Isolated on a solid magenta background (#FF00FF). No shadows, no ground, no other objects. No text. No border."

**Style correction prompts (if needed):**

- **Too realistic:** "Make it slightly more stylised — I want it to feel like a video game collectible item, not a photograph. Bolder colours, slightly simpler details, but keep the warmth and the three-quarter angle."
- **Too cartoonish:** "Make it more detailed and naturalistic — closer to a premium botanical illustration, but keep the game-item feel and the three-quarter angle. I want people to want to collect these."
- **Too flat:** "Add more depth with softer shading. I want it to feel like a 3D object, with gentle light hitting it from the upper left."
- **Style is right, lock it in:** "This style is perfect. I'm going to ask you for more vegetables and fruit. Please maintain the same level of detail, same lighting direction from upper left, same colour warmth, and same slight three-quarter viewing angle for every image."

---

## PHASE 2: Game Tiles (top-down orthographic — NOT three-quarter)

These are viewed from DIRECTLY ABOVE. Different angle from the crops.

### Prompt 2: Soil Tile

Save as: `soil-tile.png` (256x256)

> A square patch of rich dark brown garden soil viewed from directly above, top-down orthographic perspective. Slight texture variation — a few tiny pebbles, subtle cracks and furrows in the earth. Same warm painterly game-item style as the tomato — rich colours, soft shading. Looks like a freshly dug allotment plot. Square format, 256x256 pixels. Thin cream margin (#F5EFE0) at the very edges so it's easy to crop. No text. No other objects.

### Prompt 3: Soil Tile with Seed Hole

Save as: `soil-seed.png` (256x256)

> Same rich dark brown garden soil viewed from directly above, top-down orthographic. A small round hole in the centre where a seed has been planted, with a tiny brown teardrop-shaped seed visible in the hole. Same warm painterly game-item style. Square 256x256 pixels. Thin cream margin at edges. No text. No other objects.

### Prompt 4: Wooden Raised Bed Border

Save as: `wood-border.png` (512x512)

> A wooden raised bed frame viewed from directly above, top-down orthographic perspective. Made of warm honey-coloured timber planks with visible wood grain, small knots, and slightly weathered edges. Just the rectangular frame — the inside is completely empty, showing a solid cream colour (#F5EFE0). The empty interior area should be exactly square. Same warm painterly style. 512x512 pixels. No text. No other objects.

---

## PHASE 3: Special Game Assets

### Prompt 5: Mystery Seed

Save as: `mystery-seed.png` (256x256)

> A single mysterious seed, teardrop-shaped, with a warm golden-brown colour and a subtle magical shimmer — tiny gold sparkle dots floating around it, suggesting something special is inside. It looks like it could grow into anything. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Isolated on transparent background (or solid magenta #FF00FF if transparent isn't possible). No shadows on background. No other objects. No text. No border. 256x256 pixels.

### Prompt 6: Sprout — Growth Stage 1

Save as: `sprout.png` (256x256)

> A tiny green seedling sprout pushing up through a small mound of brown soil — just two small round cotyledon leaves on a thin pale green stem, about 3cm tall. Delicate, hopeful, the very beginning of life. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Isolated on transparent background (or magenta #FF00FF). No other objects. No text. No border. 256x256 pixels.

### Prompt 7: Young Plant — Growth Stage 2

Save as: `young-plant.png` (256x256)

> A small young vegetable plant with 4-5 true leaves growing from a short green stem, in a small mound of brown soil. About 10cm tall. More established than a seedling but not yet mature — it's growing well. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Isolated on transparent background (or magenta #FF00FF). No other objects. No text. No border. 256x256 pixels.

### Prompt 8: Harvest Sparkle Effect

Save as: `harvest-sparkle.png` (256x256)

> A burst of golden sparkles and tiny star shapes radiating outward from a centre point — a celebratory magical effect, like something wonderful just happened. Warm gold and soft green particles. Same warm painterly style. Isolated on transparent background (or magenta #FF00FF). No other objects. No text. 256x256 pixels.

### Prompt 9: Welcome State — Seed Packet

Save as: `welcome-seed-packet.png` (512x512)

> A charming brown paper seed packet sitting upright on a patch of soil, with a large golden "?" printed on the front. The packet is slightly open at the top with a couple of small seeds peeking out. A few blades of grass around the base. Inviting, warm, mysterious — it says "open me." Same warm painterly game-item style as the tomato. Isolated on transparent background (or magenta #FF00FF). No other objects. No text except the "?" on the packet. 512x512 pixels.

---

## PHASE 4: Crop Illustrations

Generate BOTH card and sprite versions of each crop. In the same session, you can batch them:
- Ask for the card version first (cream background, 512x512)
- Then say "Now the same [crop] but on a transparent background at 256x256 for use as a game sprite"

**Consistent trait lock for all crops:** "Same warm painterly game-item style as the tomato — rich saturated colours, soft shading from upper left, slight three-quarter angle, NOT pixel art, NOT photorealistic."

### Strawberry
Card: `strawberry-card.png` (512x512) | Sprite: `strawberry-sprite.png` (256x256)
> A single ripe strawberry with a green leaf cap and a tiny white flower beside it. Rich red with visible seeds. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0), no shadows on background. No other objects. No text. No border. 512x512.

### Pea Pod
Card: `pea-card.png` | Sprite: `pea-sprite.png`
> A plump green pea pod, slightly open at one end to reveal three round peas inside. Fresh bright green. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Carrot
Card: `carrot-card.png` | Sprite: `carrot-sprite.png`
> A single bright orange carrot with feathery green tops and slight soil at the base. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Broad Bean
Card: `broad-bean-card.png` | Sprite: `broad-bean-sprite.png`
> A broad bean pod, slightly open to show large pale green beans inside, with fuzzy grey-green pod texture. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Lettuce
Card: `lettuce-card.png` | Sprite: `lettuce-sprite.png`
> A round butterhead lettuce with layered soft green leaves, slightly dewy. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Beetroot
Card: `beetroot-card.png` | Sprite: `beetroot-sprite.png`
> A deep red-purple beetroot with soil clinging to it and vibrant red-green leaf tops. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Radish
Card: `radish-card.png` | Sprite: `radish-sprite.png`
> A bright red-pink radish with a white tip and small green leaves sprouting from the top. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Onion
Card: `onion-card.png` | Sprite: `onion-sprite.png`
> A golden brown onion with papery skin and a small green shoot from the top. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Spinach
Card: `spinach-card.png` | Sprite: `spinach-sprite.png`
> A cluster of dark green spinach leaves, slightly crinkled and glossy. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Potato
Card: `potato-card.png` | Sprite: `potato-sprite.png`
> A golden-brown potato with characteristic eyes and slight soil texture. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Courgette
Card: `courgette-card.png` | Sprite: `courgette-sprite.png`
> A dark green courgette with a bright yellow flower still attached at one end. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Sweetcorn
Card: `sweetcorn-card.png` | Sprite: `sweetcorn-sprite.png`
> A sweetcorn cob with husks partially peeled back revealing golden yellow kernels and silky tassels. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Pumpkin
Card: `pumpkin-card.png` | Sprite: `pumpkin-sprite.png`
> A round orange pumpkin with a curled green stem and one small leaf. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Raspberry
Card: `raspberry-card.png` | Sprite: `raspberry-sprite.png`
> A cluster of three ripe red raspberries on a small stem with a green leaf. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Blackcurrant
Card: `blackcurrant-card.png` | Sprite: `blackcurrant-sprite.png`
> A small bunch of deep purple-black blackcurrants on a stem with one green leaf. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Gooseberry
Card: `gooseberry-card.png` | Sprite: `gooseberry-sprite.png`
> Two pale green gooseberries with visible veins on their skin, on a short stem with a tiny leaf. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Rhubarb
Card: `rhubarb-card.png` | Sprite: `rhubarb-sprite.png`
> Two stalks of rhubarb, one pink-red and one deeper crimson, with a large curving green leaf. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Pepper
Card: `pepper-card.png` | Sprite: `pepper-sprite.png`
> A glossy red bell pepper with a green stem. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Cucumber
Card: `cucumber-card.png` | Sprite: `cucumber-sprite.png`
> A dark green cucumber with small bumps on the skin and a tiny yellow flower at one end. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Broccoli
Card: `broccoli-card.png` | Sprite: `broccoli-sprite.png`
> A head of broccoli with deep green florets and a thick pale stem. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Herb Bundle
Card: `herbs-card.png` | Sprite: `herbs-sprite.png`
> A small bundle of three herbs loosely together — basil (large rounded green leaves), parsley (curly), and a sprig of dill (feathery). Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Sunflower
Card: `sunflower-card.png` | Sprite: `sunflower-sprite.png`
> A single bright sunflower with golden yellow petals and a dark brown seed centre, on a thick green stem. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Runner Bean
Card: `runner-bean-card.png` | Sprite: `runner-bean-sprite.png`
> A long green runner bean pod with a couple of scarlet red flowers on a twisting vine tendril. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

### Chilli
Card: `chilli-card.png` | Sprite: `chilli-sprite.png`
> A bright red chilli pepper with a green stem, slightly curved. Same warm painterly game-item style as the tomato — rich colours, soft shading, three-quarter angle, upper-left lighting. Cream background (#F5EFE0). No other objects. No text. No border. 512x512.

---

## PHASE 5: Rarity Card Borders

These frame the crop illustrations in the collection view and info panels.

### Common Border
Save as: `border-common.png` (512x640)

> A simple card border frame with a warm earthy brown wooden texture and slightly rounded corners. Portrait orientation. The interior is completely empty, showing solid cream (#F5EFE0). The empty interior area is exactly square. Rustic but neat — like a simple wooden picture frame. Same warm painterly style. No text. No other decorations. 512x640 pixels.

### Uncommon Border
Save as: `border-uncommon.png` (512x640)

> A card border frame with green leaf vine decoration winding around a wooden frame. Small leaves and tiny buds along the edges. Portrait orientation. The interior is completely empty, showing solid cream (#F5EFE0). The empty interior area is exactly square. Slightly more ornate than a plain wooden frame. Same warm painterly style. No text. 512x640 pixels.

### Rare Border
Save as: `border-rare.png` (512x640)

> A card border frame with a golden metallic finish, with small botanical engravings of leaves and seeds etched into the gold surface. Warm, rich, prestigious. Portrait orientation. The interior is completely empty, showing solid cream (#F5EFE0). The empty interior area is exactly square. Same warm painterly style. No text. 512x640 pixels.

### Legendary Border
Save as: `border-legendary.png` (512x640)

> An ornate card border frame combining burnished gold and deep forest green, with intricate botanical engravings — tiny flowers, leaves, and vines wrapping around the frame. Small dewdrop shapes at the corners that catch the light like tiny gems. The most beautiful and prestigious frame in a set of four. Portrait orientation. The interior is completely empty, showing solid cream (#F5EFE0). The empty interior area is exactly square. Same warm painterly style. No text. 512x640 pixels.

---

## PHASE 6: Environment & UI

### Garden Background
Save as: `garden-bg.png` (1920x1080)

> A top-down view of an allotment garden background — green grass with patches of clover, a gravel path along one edge, a few daisies. Viewed from directly above, orthographic perspective. Soft, slightly blurred, designed to sit behind game elements. Same warm painterly style. Wide landscape format 1920x1080. No text. No buildings or structures.

### Harvest Basket
Save as: `harvest-basket.png` (256x256)

> A woven wicker harvest basket (trug), empty, viewed from a slight three-quarter angle. Warm honey-brown wicker with a wooden handle. Same warm painterly game-item style as the tomato. Isolated on transparent background (or magenta #FF00FF). No other objects. No text. 256x256 pixels.

### Watering Can
Save as: `watering-can.png` (256x256)

> A classic green metal watering can with a brass rose (sprinkler head). Same warm painterly game-item style as the tomato. Three-quarter angle, upper-left lighting. Isolated on transparent background (or magenta #FF00FF). No other objects. No text. 256x256 pixels.

---

## Quality Checklist — Run For Every Image

1. **Style match** — does it look like it belongs with the tomato?
2. **Angle** — three-quarter for crops/items, top-down for tiles?
3. **Background** — cream for cards, transparent/magenta for sprites?
4. **Isolation** — cleanly isolated? No extra shadows, objects, or ground?
5. **Scale** — would it look good at 80px in a game tile AND 200px on a card?
6. **Character** — does it have warmth? Would you want to collect it?
7. **No text** — did the AI accidentally add any text or watermarks?
8. **Dimensions** — correct size? (512x512 cards, 256x256 sprites, 512x640 borders)

If any fail, regenerate with: "Please regenerate this in the exact same style as the tomato. [repeat specific prompt]"

---

## Asset Summary

### Session 1 — Foundation (8 images, MUST HAVE)
| Asset | Filename | Size | Background |
|-------|----------|------|-----------|
| Tomato card | tomato-card.png | 512x512 | Cream |
| Tomato sprite | tomato-sprite.png | 256x256 | Transparent |
| Soil tile | soil-tile.png | 256x256 | Cream margin |
| Soil with seed | soil-seed.png | 256x256 | Cream margin |
| Wood border | wood-border.png | 512x512 | Cream |
| Mystery seed | mystery-seed.png | 256x256 | Transparent |
| Sprout | sprout.png | 256x256 | Transparent |
| Young plant | young-plant.png | 256x256 | Transparent |

### Session 2 — In-Season Crops (20 images: 10 cards + 10 sprites, MUST HAVE)
Strawberry, Pea, Broad bean, Lettuce, Carrot, Beetroot, Radish, Onion, Spinach, Potato

### Session 3 — More Crops + Effects (22 images: 10 cards + 10 sprites + 2 effects, MUST HAVE)
Courgette, Sweetcorn, Pumpkin, Raspberry, Blackcurrant, Gooseberry, Rhubarb, Pepper, Broccoli, Cucumber + Harvest sparkle + Welcome seed packet

### Session 4 — Borders + Extras (11 images, NICE TO HAVE)
4 rarity borders + Herb bundle, Sunflower, Runner bean, Chilli + Garden background + Harvest basket + Watering can

**Total: 61 images across 4 sessions. 50 must-haves, 11 nice-to-haves.**

---

## File Destination

All files go in: `/Users/kateallen/whattosow/public/game/`

The folder already exists. Once you drop images in, let me know and I'll wire them into the Phaser game immediately.
