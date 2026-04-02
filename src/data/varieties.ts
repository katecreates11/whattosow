// src/data/varieties.ts — Full variety data for Lucky Dip feature

export interface CropRecipe {
  name: string;
  description: string;
}

export interface SeedSupplier {
  name: string;
  url: string;
}

export type Rarity = "common" | "uncommon" | "rare" | "legendary";

export interface Variety {
  id: string;
  cropSlug: string;
  name: string;
  rarity: Rarity;
  personality: string;
  recipes: CropRecipe[];
  seedSuppliers: SeedSupplier[];
}

export const varieties: Variety[] = [
  // ============================================================
  // BROAD BEANS
  // ============================================================
  {
    id: "broad-beans-aquadulce-claudia",
    cropSlug: "broad-beans",
    name: "Aquadulce Claudia",
    rarity: "common",
    personality:
      "The broad bean your grandparents grew, and their grandparents before them. Sow in autumn, forget about it, and come spring it'll be the smuggest thing in the garden.",
    recipes: [
      {
        name: "Broad bean bruschetta",
        description:
          "Double-pod them, blanch for two minutes, then crush roughly with olive oil, lemon zest, pecorino, and a crack of black pepper. Pile onto grilled sourdough.",
      },
      {
        name: "Broad bean and mint soup",
        description:
          "Simmer podded beans with a potato and good stock until tender. Blitz with a handful of fresh mint and a swirl of cream. Spring in a bowl.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=aquadulce+claudia+broad+beans" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=aquadulce+claudia+broad+beans" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=aquadulce+claudia+broad+beans" },
    ],
  },
  {
    id: "broad-beans-the-sutton",
    cropSlug: "broad-beans",
    name: "The Sutton",
    rarity: "common",
    personality:
      "A dwarf broad bean that tops out at about a foot tall. Perfect for pots, window boxes, and anyone who doesn't want to build scaffolding for their legumes.",
    recipes: [
      {
        name: "Broad bean and bacon salad",
        description:
          "Fry lardons until crisp. Toss with double-podded beans, a handful of pea shoots, a squeeze of lemon, and the warm bacon fat as dressing. Simple and devastating.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=the+sutton+broad+beans" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=the+sutton+broad+beans" },
    ],
  },
  {
    id: "broad-beans-crimson-flowered",
    cropSlug: "broad-beans",
    name: "Crimson Flowered",
    rarity: "legendary",
    personality:
      "Nearly went extinct in the 1970s until a single packet was found in a Kent seed bank. Deep crimson flowers that stop people mid-path on the allotment. The beans are excellent too, but honestly, you're growing this for the drama.",
    recipes: [
      {
        name: "Broad bean and feta salad",
        description:
          "Double-pod the beans, toss warm with crumbled feta, fresh dill, a glug of good olive oil, and a scatter of the crimson flowers on top. Almost too pretty to eat.",
      },
      {
        name: "Simple buttered broad beans",
        description:
          "Double-pod, blanch briefly, then toss in a hot pan with butter, a pinch of flaky salt, and a squeeze of lemon. Let the beans speak for themselves.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=crimson+flowered+broad+beans" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=crimson+flowered+broad+beans" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=crimson+flowered+broad+beans" },
    ],
  },

  // ============================================================
  // PEAS
  // ============================================================
  {
    id: "peas-kelvedon-wonder",
    cropSlug: "peas",
    name: "Kelvedon Wonder",
    rarity: "common",
    personality:
      "The pea that every allotment in Britain grows, and for good reason. Reliable, sweet, and ready in 12 weeks. Compact enough to grow without a ladder.",
    recipes: [
      {
        name: "Peas on toast",
        description:
          "Crush freshly podded peas with a fork, mix with ricotta, mint, lemon zest, and flaky salt. Spread thick on hot toast. Better than it has any right to be.",
      },
      {
        name: "Garden pea risotto",
        description:
          "Stir podded peas into a classic risotto in the last three minutes. Finish with parmesan, butter, and a handful of pea shoots. The colour alone is worth it.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=kelvedon+wonder+peas" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=kelvedon+wonder+peas" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=kelvedon+wonder+peas" },
    ],
  },
  {
    id: "peas-hurst-greenshaft",
    cropSlug: "peas",
    name: "Hurst Greenshaft",
    rarity: "uncommon",
    personality:
      "Produces pods in pairs and sometimes threes, which feels like winning the lottery every time you pick. Tall enough to need support but repays the effort with absurd quantities.",
    recipes: [
      {
        name: "Pea and ham soup",
        description:
          "Simmer a ham hock with a bay leaf until falling apart. Strip the meat, add peas, cook five more minutes. Thick, smoky, and the reason this soup has been made for centuries.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=hurst+greenshaft+peas" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=hurst+greenshaft+peas" },
    ],
  },
  {
    id: "peas-oregon-sugar-pod",
    cropSlug: "peas",
    name: "Oregon Sugar Pod",
    rarity: "uncommon",
    personality:
      "A mangetout that you eat whole, pod and all, ideally straight off the plant while pretending to do other gardening. Flat, sweet, and barely any make it to the kitchen.",
    recipes: [
      {
        name: "Stir-fried mangetout with sesame",
        description:
          "Searing hot wok, a splash of sesame oil, the pods for sixty seconds, a hit of soy sauce and a scatter of toasted sesame seeds. Done before the rice is ready.",
      },
      {
        name: "Raw mangetout and radish salad",
        description:
          "Slice pods on the diagonal, toss with thinly sliced radishes, rice vinegar, a pinch of sugar, and fresh coriander. Crunchy, bright, and absurdly fresh.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=oregon+sugar+pod+peas" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=oregon+sugar+pod+peas" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=oregon+sugar+pod+peas" },
    ],
  },

  // ============================================================
  // LETTUCE
  // ============================================================
  {
    id: "lettuce-little-gem",
    cropSlug: "lettuce",
    name: "Little Gem",
    rarity: "common",
    personality:
      "The compact, crunchy, does-everything lettuce. Tight little heads with a sweetness that makes you wonder why you ever bought iceberg. Ready in about 8 weeks and takes up almost no space.",
    recipes: [
      {
        name: "Charred Little Gem with Caesar dressing",
        description:
          "Halve the heads, brush with olive oil, char cut-side down on a screaming hot griddle. Drizzle with anchovy dressing, parmesan shavings, and croutons. A revelation.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=little+gem+lettuce" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=little+gem+lettuce" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=little+gem+lettuce" },
    ],
  },
  {
    id: "lettuce-lollo-rosso",
    cropSlug: "lettuce",
    name: "Lollo Rosso",
    rarity: "common",
    personality:
      "Frilly, burgundy-tipped leaves that make your salad bowl look like a Renaissance painting. Pick-and-come-again, so one plant gives you weeks of drama.",
    recipes: [
      {
        name: "Mixed leaf salad with shallot vinaigrette",
        description:
          "Tear the frilly leaves, toss with a dressing of finely diced shallot, red wine vinegar, Dijon, and olive oil. The ruffled edges catch every drop.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=lollo+rosso+lettuce" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=lollo+rosso+lettuce" },
    ],
  },
  {
    id: "lettuce-all-year-round",
    cropSlug: "lettuce",
    name: "All Year Round",
    rarity: "common",
    personality:
      "Does what it says on the packet. A butterhead that shrugs off cold, heat, and your general neglect. The dependable friend of the lettuce world.",
    recipes: [
      {
        name: "Butter lettuce wraps",
        description:
          "Use whole leaves as wraps for spiced chicken, pickled carrot, fresh herbs, and a drizzle of sriracha mayo. The soft leaves cup everything perfectly.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=all+year+round+lettuce" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=all+year+round+lettuce" },
    ],
  },

  // ============================================================
  // SPINACH
  // ============================================================
  {
    id: "spinach-giant-winter",
    cropSlug: "spinach",
    name: "Giant Winter",
    rarity: "common",
    personality:
      "Hardy enough to stand through winter and still produce tender leaves when everything else in the garden has given up. The one that keeps going when nothing else will.",
    recipes: [
      {
        name: "Saag paneer",
        description:
          "Wilt a mountain of spinach, blitz roughly, fry with cumin, garlic, ginger, and a hit of garam masala. Fold in cubes of golden-fried paneer. The mountain cooks down to about two portions. Worth it.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=giant+winter+spinach" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=giant+winter+spinach" },
    ],
  },
  {
    id: "spinach-perpetual",
    cropSlug: "spinach",
    name: "Perpetual Spinach",
    rarity: "common",
    personality:
      "Technically a chard, but nobody cares because it tastes like spinach and produces for months on end. The plant that keeps on giving, long after true spinach has bolted in a huff.",
    recipes: [
      {
        name: "Wilted greens with garlic and chilli",
        description:
          "Hot pan, slick of olive oil, sliced garlic until golden, a pinch of chilli flakes, then the leaves for thirty seconds. A squeeze of lemon and it's done. The simplest good thing.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=perpetual+spinach" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=perpetual+spinach" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=perpetual+spinach" },
    ],
  },
  {
    id: "spinach-bloomsdale",
    cropSlug: "spinach",
    name: "Bloomsdale",
    rarity: "uncommon",
    personality:
      "Thick, crinkly, savoy-like leaves that hold dressing beautifully and are slower to bolt than most. An American heirloom from the 1920s that earns its keep in the UK just fine.",
    recipes: [
      {
        name: "Spinach and ricotta stuffed shells",
        description:
          "Wilt the crinkly leaves, squeeze dry, mix with ricotta, nutmeg, and parmesan. Stuff into giant pasta shells, cover with tomato sauce, bake until bubbling.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=bloomsdale+spinach" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=bloomsdale+spinach" },
    ],
  },

  // ============================================================
  // RADISHES
  // ============================================================
  {
    id: "radishes-french-breakfast",
    cropSlug: "radishes",
    name: "French Breakfast",
    rarity: "common",
    personality:
      "Elongated, red-topped with a white tip, and mild enough to eat like sweets. The radish that looks like it was designed by someone who actually cares about aesthetics.",
    recipes: [
      {
        name: "Radishes with butter and salt",
        description:
          "Good butter, flaky sea salt, the freshest radishes you can pull. Dip and eat. The French have been doing this forever because it's perfect.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=french+breakfast+radishes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=french+breakfast+radishes" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=french+breakfast+radishes" },
    ],
  },
  {
    id: "radishes-cherry-belle",
    cropSlug: "radishes",
    name: "Cherry Belle",
    rarity: "common",
    personality:
      "Round, red, and ready in four weeks flat. The radish equivalent of instant gratification. Perfect for impatient gardeners and small children who need to see results now.",
    recipes: [
      {
        name: "Quick pickled radishes",
        description:
          "Slice paper-thin, toss into a jar with rice vinegar, a pinch of sugar, and a star anise. Ready in an hour. Incredible on tacos, noodles, or anything that needs a pink crunch.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=cherry+belle+radishes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=cherry+belle+radishes" },
    ],
  },
  {
    id: "radishes-watermelon",
    cropSlug: "radishes",
    name: "Watermelon",
    rarity: "rare",
    personality:
      "Green-skinned, unassuming, and then you slice it open and there's a vivid magenta starburst inside. Mild, slightly peppery, and the kind of vegetable that makes people put their fork down and say 'what IS that?'",
    recipes: [
      {
        name: "Watermelon radish carpaccio",
        description:
          "Slice razor-thin on a mandoline, fan out on a white plate, drizzle with yuzu or lemon juice, good olive oil, and a scatter of black sesame seeds. Looks like stained glass.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=watermelon+radish+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=watermelon+radish+seeds" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=watermelon+radish+seeds" },
    ],
  },

  // ============================================================
  // CARROTS
  // ============================================================
  {
    id: "carrots-nantes",
    cropSlug: "carrots",
    name: "Nantes",
    rarity: "common",
    personality:
      "Sweet, blunt-tipped, and obligingly straightforward. The carrot that reminds you why home-grown tastes nothing like the supermarket. Pull one, wipe it on your jeans, and eat it right there.",
    recipes: [
      {
        name: "Honey-roasted carrots",
        description:
          "Halve lengthways, toss with olive oil, honey, and thyme sprigs. Roast until the edges caramelise and the kitchen smells like autumn. Finish with a crumble of feta.",
      },
      {
        name: "Carrot and coriander soup",
        description:
          "Sweat onion, add chunked carrots, ground coriander, stock. Simmer until soft, blitz smooth, swirl in yoghurt. The soup that everybody makes because it always works.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=nantes+carrots" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=nantes+carrots" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=nantes+carrots" },
    ],
  },
  {
    id: "carrots-purple-haze",
    cropSlug: "carrots",
    name: "Purple Haze",
    rarity: "rare",
    personality:
      "Deep purple skin with an orange core, like a carrot designed by a sunset. Sweeter than you'd expect, and roasting it turns the colour even more intense. Carrots looked like this for centuries before the Dutch bred them orange.",
    recipes: [
      {
        name: "Roasted purple carrots with tahini",
        description:
          "Roast whole until tender and slightly charred. Drizzle with tahini thinned with lemon juice, scatter with pomegranate seeds and toasted pine nuts. The purple deepens in the oven.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=purple+haze+carrots" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=purple+haze+carrots" },
    ],
  },
  {
    id: "carrots-autumn-king",
    cropSlug: "carrots",
    name: "Autumn King",
    rarity: "common",
    personality:
      "Big, chunky maincrops built for storing. Pull them in autumn, pack them in sand, and you'll be eating your own carrots well into winter. The grown-up carrot.",
    recipes: [
      {
        name: "Carrot cake",
        description:
          "Grate the big roots into a spiced batter with walnuts and sultanas. Bake until a skewer comes out clean. Top with cream cheese icing. The cake that justifies the vegetable patch.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=autumn+king+carrots" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=autumn+king+carrots" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=autumn+king+carrots" },
    ],
  },

  // ============================================================
  // BEETROOT
  // ============================================================
  {
    id: "beetroot-boltardy",
    cropSlug: "beetroot",
    name: "Boltardy",
    rarity: "common",
    personality:
      "The one that won't bolt on you when spring throws a tantrum. Reliable, sweet, and the reason more people grow beetroot than you'd think. Does exactly what you need, every time.",
    recipes: [
      {
        name: "Beetroot, goat's cheese, and walnut salad",
        description:
          "Roast whole until tender, peel and quarter. Tumble onto a plate with crumbled goat's cheese, toasted walnuts, and a dressing of balsamic and olive oil. A classic for good reason.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=boltardy+beetroot" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=boltardy+beetroot" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=boltardy+beetroot" },
    ],
  },
  {
    id: "beetroot-chioggia",
    cropSlug: "beetroot",
    name: "Chioggia",
    rarity: "rare",
    personality:
      "Slice it open and you get candy-stripe concentric rings of pink and white. An Italian heirloom from the Veneto that makes every salad plate an event. Slightly milder than red varieties, and the rings fade when cooked, so eat it raw to get the full theatre.",
    recipes: [
      {
        name: "Chioggia carpaccio",
        description:
          "Slice paper-thin on a mandoline (raw, always raw). Arrange on a plate, drizzle with good olive oil, flaky salt, and a few drops of aged balsamic. The rings do the rest.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=chioggia+beetroot" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=chioggia+beetroot" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=chioggia+beetroot" },
    ],
  },
  {
    id: "beetroot-detroit-dark-red",
    cropSlug: "beetroot",
    name: "Detroit Dark Red",
    rarity: "common",
    personality:
      "Deep, inky crimson all the way through. The one that will stain your chopping board, your hands, and your tea towel, and you won't care because the flavour is that good.",
    recipes: [
      {
        name: "Borscht",
        description:
          "Grate beetroot, simmer with onion, carrot, stock, and a splash of red wine vinegar until everything is magenta. Serve with a generous blob of sour cream and fresh dill. Warmth in a bowl.",
      },
      {
        name: "Beetroot hummus",
        description:
          "Blitz roasted beetroot with chickpeas, tahini, garlic, and lemon. Impossibly pink, earthy, and it makes the crudite plate look like a magazine.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=detroit+dark+red+beetroot" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=detroit+dark+red+beetroot" },
    ],
  },

  // ============================================================
  // ONION SETS
  // ============================================================
  {
    id: "onion-sets-sturon",
    cropSlug: "onion-sets",
    name: "Sturon",
    rarity: "common",
    personality:
      "The all-rounder that stores beautifully into winter. Push the sets in, leave them alone, and by summer you'll have golden globes ready for everything from a Sunday roast to a Tuesday stir-fry.",
    recipes: [
      {
        name: "French onion soup",
        description:
          "Slice a mountain of onions, caramelise slowly in butter for forty minutes until deep golden. Deglaze with white wine, add beef stock, ladle into bowls, top with gruyere-laden toast, and grill until bubbling. Worth every minute of stirring.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=sturon+onion+sets" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=sturon+onion+sets" },
    ],
  },
  {
    id: "onion-sets-red-baron",
    cropSlug: "onion-sets",
    name: "Red Baron",
    rarity: "uncommon",
    personality:
      "Deep red skin and pink-flushed flesh that makes everything look more interesting. Milder and sweeter raw than yellow onions, so it earns its place in every salad and sandwich.",
    recipes: [
      {
        name: "Red onion tarte tatin",
        description:
          "Halve the onions, caramelise cut-side down in balsamic and butter, lay puff pastry over the top, bake until puffed and golden. Invert onto a plate. Dinner party sorted.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=red+baron+onion+sets" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=red+baron+onion+sets" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=red+baron+onion+sets" },
    ],
  },
  {
    id: "onion-sets-centurion",
    cropSlug: "onion-sets",
    name: "Centurion",
    rarity: "uncommon",
    personality:
      "Early maturing and a heavy cropper. The onion for people who want results sooner and more of them. Golden-skinned, firm, and stores well enough to see you into the new year.",
    recipes: [
      {
        name: "Onion bhajis",
        description:
          "Slice thin, toss with gram flour, cumin, turmeric, chilli, and a splash of water. Drop spoonfuls into hot oil and fry until crispy and golden. Better than any takeaway.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=centurion+onion+sets" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=centurion+onion+sets" },
    ],
  },

  // ============================================================
  // MAINCROP POTATOES
  // ============================================================
  {
    id: "maincrop-potatoes-desiree",
    cropSlug: "maincrop-potatoes",
    name: "Desiree",
    rarity: "common",
    personality:
      "Red-skinned, creamy-fleshed, and good at absolutely everything. Roast it, mash it, chip it, bake it. The potato that never lets you down and never asks for much in return.",
    recipes: [
      {
        name: "Perfect mash",
        description:
          "Boil until they fall off a knife, drain thoroughly, then rice or mash with obscene amounts of butter and a splash of warm milk. Season. That's it. Perfection doesn't need complication.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=desiree+seed+potatoes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=desiree+seed+potatoes" },
    ],
  },
  {
    id: "maincrop-potatoes-king-edward",
    cropSlug: "maincrop-potatoes",
    name: "King Edward",
    rarity: "common",
    personality:
      "Named after the king, grown since 1902, and still the one that makes the best roast potatoes in the country. Fluffy inside, crispy outside, and absolutely nothing fancy about it. Sometimes classics are classics for a reason.",
    recipes: [
      {
        name: "Roast potatoes",
        description:
          "Parboil, shake in the colander until the edges rough up, then into screaming hot goose fat. Roast at 200C until deep golden and shatteringly crisp. The Sunday lunch centrepiece.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=king+edward+seed+potatoes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=king+edward+seed+potatoes" },
    ],
  },
  {
    id: "maincrop-potatoes-sarpo-mira",
    cropSlug: "maincrop-potatoes",
    name: "Sarpo Mira",
    rarity: "uncommon",
    personality:
      "The blight-proof potato. While everyone else is nervously checking their leaves in August, you'll be sitting back with a cup of tea. Hungarian-bred, practically indestructible, and the flavour is genuinely good too.",
    recipes: [
      {
        name: "Chunky chips",
        description:
          "Cut into thick batons, blanch, dry thoroughly, then double-fry in oil — once at 130C to cook through, then at 190C until golden and crisp. Salt generously. The chip shop in your garden.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=sarpo+mira+seed+potatoes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=sarpo+mira+seed+potatoes" },
    ],
  },

  // ============================================================
  // EARLY POTATOES
  // ============================================================
  {
    id: "early-potatoes-charlotte",
    cropSlug: "early-potatoes",
    name: "Charlotte",
    rarity: "common",
    personality:
      "Waxy, buttery, and the finest potato salad potato money can't buy — because you grew it. Boil until just tender, dress while warm, and try not to eat the entire bowl standing at the kitchen counter.",
    recipes: [
      {
        name: "Warm new potato salad",
        description:
          "Boil until just tender, halve while warm, dress with grainy mustard, cider vinegar, a good glug of olive oil, and a scatter of chives. Better warm. Better still the next day.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=charlotte+seed+potatoes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=charlotte+seed+potatoes" },
    ],
  },
  {
    id: "early-potatoes-swift",
    cropSlug: "early-potatoes",
    name: "Swift",
    rarity: "common",
    personality:
      "First early, ready in June, and there is absolutely nothing like digging your first potatoes of the year. Small, thin-skinned, and they taste like actual potatoes in a way that supermarket ones simply don't.",
    recipes: [
      {
        name: "Crushed new potatoes with mint butter",
        description:
          "Boil until tender, crush lightly with a fork, then toss with mint-flecked butter and flaky salt. The skins are so thin they almost dissolve. June on a plate.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=swift+seed+potatoes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=swift+seed+potatoes" },
    ],
  },
  {
    id: "early-potatoes-maris-piper",
    cropSlug: "early-potatoes",
    name: "Maris Piper",
    rarity: "common",
    personality:
      "The UK's most-grown potato variety, and there's a reason every chip shop in the country uses it. Good at everything: chips, mash, roasting, baking. Not exciting, just excellent.",
    recipes: [
      {
        name: "Baked potato",
        description:
          "Rub with oil and salt, bake at 200C for an hour and a half until the skin is crisp and the inside is fluffy cloud. Load with butter, cheese, beans, whatever you want. The most honest meal there is.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=maris+piper+seed+potatoes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=maris+piper+seed+potatoes" },
    ],
  },

  // ============================================================
  // KALE
  // ============================================================
  {
    id: "kale-cavolo-nero",
    cropSlug: "kale",
    name: "Cavolo Nero",
    rarity: "common",
    personality:
      "Dark, crinkled, impossibly elegant Tuscan kale that makes your allotment look like a Tuscan hillside (if you squint). Sweetens after frost and works in everything from soups to crisps.",
    recipes: [
      {
        name: "Ribollita",
        description:
          "Tear the dark leaves, simmer with cannellini beans, tomatoes, stale bread, and parmesan rind until thick and comforting. Drizzle with your best olive oil. Florentine peasant cooking at its finest.",
      },
      {
        name: "Kale crisps",
        description:
          "Strip from the stems, toss with olive oil and a pinch of salt, bake at 150C until crisp and just starting to brown at the edges. Addictive. Gone in minutes.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=cavolo+nero+kale" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=cavolo+nero+kale" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=cavolo+nero+kale" },
    ],
  },
  {
    id: "kale-dwarf-green-curled",
    cropSlug: "kale",
    name: "Dwarf Green Curled",
    rarity: "common",
    personality:
      "Compact, curly, and practically indestructible. Grows happily in containers, shrugs off frost, and keeps producing side shoots all winter. The kale for people who want kale without the fuss.",
    recipes: [
      {
        name: "Colcannon",
        description:
          "Shred the curly leaves, cook in a little salted water, drain well, and fold into buttery mashed potato with spring onions. The Irish winter warmer that makes kale disappear deliciously.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=dwarf+green+curled+kale" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=dwarf+green+curled+kale" },
    ],
  },
  {
    id: "kale-red-russian",
    cropSlug: "kale",
    name: "Red Russian",
    rarity: "uncommon",
    personality:
      "Flat, frilly, grey-green leaves with purple veins and stems that look like something from a botanical illustration. More tender than curly kale, brilliant raw in salads, and gets sweeter with each frost.",
    recipes: [
      {
        name: "Kale and apple slaw",
        description:
          "Shred the tender leaves finely, toss with grated apple, toasted hazelnuts, and a dressing of cider vinegar, honey, and olive oil. Massage the kale for a minute — it sounds silly but it works.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=red+russian+kale" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=red+russian+kale" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=red+russian+kale" },
    ],
  },

  // ============================================================
  // PARSNIPS
  // ============================================================
  {
    id: "parsnips-tender-and-true",
    cropSlug: "parsnips",
    name: "Tender and True",
    rarity: "common",
    personality:
      "Long, tapering, and with a sweetness that intensifies after frost. The name says it all — this one won't let you down, provided you give it deep, stone-free soil and a healthy dose of patience.",
    recipes: [
      {
        name: "Honey-roasted parsnips",
        description:
          "Quarter lengthways, toss with honey, olive oil, and a grating of nutmeg. Roast until the edges are dark and caramelised. The Christmas dinner MVP.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=tender+and+true+parsnips" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=tender+and+true+parsnips" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=tender+and+true+parsnips" },
    ],
  },
  {
    id: "parsnips-gladiator",
    cropSlug: "parsnips",
    name: "Gladiator",
    rarity: "common",
    personality:
      "Vigorous, canker-resistant, and germinates faster than most parsnips — which is to say it only takes two weeks instead of four. Smooth-skinned and reliable, like a parsnip should be.",
    recipes: [
      {
        name: "Parsnip soup with crispy sage",
        description:
          "Sweat onion, add chunked parsnips, a splash of white wine, stock. Simmer, blitz until velvety. Fry sage leaves in butter until crisp, scatter on top. Winter comfort perfected.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=gladiator+parsnips" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=gladiator+parsnips" },
    ],
  },
  {
    id: "parsnips-guernsey",
    cropSlug: "parsnips",
    name: "Guernsey",
    rarity: "uncommon",
    personality:
      "A heritage variety that's been around since the 1800s. Half-long roots that are easier to dig up than the full-length types, and wonderfully sweet after a good frost. Old-fashioned in the best possible way.",
    recipes: [
      {
        name: "Parsnip crisps",
        description:
          "Peel into long ribbons with a vegetable peeler, toss in a little oil, and bake at 180C until golden and curling. Salt them hot. Impossible to stop eating.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=guernsey+parsnips" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=guernsey+parsnips" },
    ],
  },

  // ============================================================
  // SPRING ONIONS
  // ============================================================
  {
    id: "spring-onions-white-lisbon",
    cropSlug: "spring-onions",
    name: "White Lisbon",
    rarity: "common",
    personality:
      "The one in every seed catalogue since forever. Quick, reliable, and unfussy. Sow a pinch every few weeks and you'll never be without spring onions for the rest of the season.",
    recipes: [
      {
        name: "Spring onion pancakes",
        description:
          "Chop finely, fold into a simple dough of flour, boiling water, and sesame oil. Roll flat, dry-fry in a hot pan until golden and crispy. The Chinese breakfast that should be everyone's breakfast.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=white+lisbon+spring+onions" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=white+lisbon+spring+onions" },
    ],
  },
  {
    id: "spring-onions-ishikura",
    cropSlug: "spring-onions",
    name: "Ishikura",
    rarity: "uncommon",
    personality:
      "A Japanese variety that grows long, straight, white stems without forming a bulb. Looks elegant, tastes clean and mild, and is the one chefs reach for when they want perfect, even slices.",
    recipes: [
      {
        name: "Charred spring onions with romesco",
        description:
          "Grill whole until charred and soft, serve with a smoky romesco sauce for dipping. The charring brings out sweetness you didn't know spring onions had.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=ishikura+spring+onions" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=ishikura+spring+onions" },
    ],
  },
  {
    id: "spring-onions-apache",
    cropSlug: "spring-onions",
    name: "Apache",
    rarity: "uncommon",
    personality:
      "Red-skinned and mild with a blush that runs from the bulb into the stem. Pretty enough to make a garnish, flavourful enough to be the main event. Adds colour to everything it touches.",
    recipes: [
      {
        name: "Quick pickle spring onions",
        description:
          "Slice on the diagonal, pour over warm rice vinegar with a pinch of sugar and salt. Ready in twenty minutes and brilliant on noodles, rice bowls, or grilled fish.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=apache+spring+onions" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=apache+spring+onions" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=apache+spring+onions" },
    ],
  },

  // ============================================================
  // SWISS CHARD
  // ============================================================
  {
    id: "swiss-chard-bright-lights",
    cropSlug: "swiss-chard",
    name: "Bright Lights",
    rarity: "uncommon",
    personality:
      "Rainbow stems in red, orange, yellow, pink, and white — every single plant is different. Half ornamental, fully edible, and the kind of thing that makes non-gardeners say 'you grew THAT?'",
    recipes: [
      {
        name: "Chard with garlic and pine nuts",
        description:
          "Separate stems from leaves. Chop stems, fry first with garlic and a splash of olive oil. Add torn leaves for the last minute. Scatter with toasted pine nuts and a squeeze of lemon.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=bright+lights+swiss+chard" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=bright+lights+swiss+chard" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=bright+lights+swiss+chard" },
    ],
  },
  {
    id: "swiss-chard-fordhook-giant",
    cropSlug: "swiss-chard",
    name: "Fordhook Giant",
    rarity: "common",
    personality:
      "Massive, glossy leaves with thick white stems that you can cook like two different vegetables — because that's essentially what they are. Heavy-yielding and unfazed by most things life throws at it.",
    recipes: [
      {
        name: "Chard gratin",
        description:
          "Blanch the stems, lay in a dish, cover with bechamel sauce and a thick layer of gruyere. Bake until golden and bubbling. The stems go silky-soft under that blanket of cheese.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=fordhook+giant+swiss+chard" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=fordhook+giant+swiss+chard" },
    ],
  },
  {
    id: "swiss-chard-rhubarb-chard",
    cropSlug: "swiss-chard",
    name: "Rhubarb Chard",
    rarity: "common",
    personality:
      "Deep crimson stems and dark green leaves with red veins running through them like rivers on a map. Dramatic in the garden, versatile in the kitchen, and the name confuses people in the most satisfying way.",
    recipes: [
      {
        name: "Chard and chickpea stew",
        description:
          "Fry onion and garlic, add smoked paprika, tinned tomatoes, and drained chickpeas. Wilt torn chard leaves into the stew for the last few minutes. Serve with crusty bread. Red stems and all.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=rhubarb+chard" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=rhubarb+chard" },
    ],
  },

  // ============================================================
  // TURNIPS
  // ============================================================
  {
    id: "turnips-purple-top-milan",
    cropSlug: "turnips",
    name: "Purple Top Milan",
    rarity: "common",
    personality:
      "Flat-topped, purple-shouldered, and sweet as anything when pulled at golf-ball size. One of the fastest root vegetables — sow it in a gap and it fills it before you notice.",
    recipes: [
      {
        name: "Glazed baby turnips",
        description:
          "Halve the small ones, cook cut-side down in butter with a pinch of sugar until golden and tender. Finish with a splash of stock and a scatter of parsley. Elegant enough for a dinner plate.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=purple+top+milan+turnips" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=purple+top+milan+turnips" },
    ],
  },
  {
    id: "turnips-snowball",
    cropSlug: "turnips",
    name: "Snowball",
    rarity: "common",
    personality:
      "White, round, and mild enough that even turnip sceptics come around. Pull them young and they're almost fruity. Leave them too long and they'll remind you why people think they don't like turnips.",
    recipes: [
      {
        name: "Turnip mash",
        description:
          "Peel, cube, and boil until soft. Mash with a generous knob of butter, a crack of white pepper, and a pinch of nutmeg. Lighter and sweeter than potato mash. A quiet revelation.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=snowball+turnips" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=snowball+turnips" },
    ],
  },
  {
    id: "turnips-golden-ball",
    cropSlug: "turnips",
    name: "Golden Ball",
    rarity: "uncommon",
    personality:
      "A heritage Victorian variety with golden-yellow flesh and a sweetness that survives storage. Keeps well into winter and tastes better after a frost, which is about as Scottish as a turnip can get.",
    recipes: [
      {
        name: "Neeps and tatties",
        description:
          "Boil until tender, mash with a ridiculous amount of butter and white pepper. Serve alongside haggis on Burns Night, or honestly, just alongside anything on a cold evening.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=golden+ball+turnips" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=golden+ball+turnips" },
    ],
  },

  // ============================================================
  // LEEKS
  // ============================================================
  {
    id: "leeks-musselburgh",
    cropSlug: "leeks",
    name: "Musselburgh",
    rarity: "common",
    personality:
      "Named after the Scottish town, grown since the 1830s, and hard as nails. Stands through the worst winter can throw at it and still delivers thick, sweet stems. The leek that history trusts.",
    recipes: [
      {
        name: "Leek and potato soup",
        description:
          "Slice the leeks, soften in butter, add cubed potato and stock. Simmer until tender, blitz or leave chunky. A bowl of this on a cold day is as good as a hug. Vichyssoise if you serve it cold and want to sound fancy.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=musselburgh+leeks" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=musselburgh+leeks" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=musselburgh+leeks" },
    ],
  },
  {
    id: "leeks-king-richard",
    cropSlug: "leeks",
    name: "King Richard",
    rarity: "uncommon",
    personality:
      "An early variety with exceptionally long, slender white stems. Matures faster than most leeks and is mild enough to use raw in salads if you're feeling continental. Not as winter-hardy as Musselburgh, but makes up for it in speed.",
    recipes: [
      {
        name: "Leeks vinaigrette",
        description:
          "Simmer whole leeks until just tender, drain, and dress warm with a mustardy vinaigrette. A French bistro classic that elevates the humble leek to starring role.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=king+richard+leeks" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=king+richard+leeks" },
    ],
  },
  {
    id: "leeks-bandit",
    cropSlug: "leeks",
    name: "Bandit",
    rarity: "uncommon",
    personality:
      "The late-season leek that just won't quit. Hardy through the harshest winter, ready from December right through to April. When everything else in the garden has gone to sleep, Bandit is still standing.",
    recipes: [
      {
        name: "Leek and cheese tart",
        description:
          "Slice leeks, soften in butter, spread in a blind-baked pastry case, pour over a custard of eggs, cream, and mature cheddar. Bake until just set and golden. Sunday lunch with less effort.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=bandit+leeks" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=bandit+leeks" },
    ],
  },

  // ============================================================
  // BROCCOLI
  // ============================================================
  {
    id: "broccoli-purple-sprouting-early",
    cropSlug: "broccoli",
    name: "Purple Sprouting Early",
    rarity: "common",
    personality:
      "The star of late winter when there's almost nothing else to pick. Purple spears that snap off satisfyingly and taste sweet enough to eat raw in the garden. Worth the long wait from summer sowing.",
    recipes: [
      {
        name: "Purple sprouting with chilli and garlic",
        description:
          "Steam the spears for three minutes, then toss in a hot pan with olive oil, sliced garlic, and dried chilli flakes. A squeeze of lemon and it's done. March has never tasted so good.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=purple+sprouting+early+broccoli" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=purple+sprouting+early+broccoli" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=purple+sprouting+early+broccoli" },
    ],
  },
  {
    id: "broccoli-green-magic",
    cropSlug: "broccoli",
    name: "Green Magic",
    rarity: "common",
    personality:
      "Quick-maturing calabrese that gives you a big central head followed by weeks of side shoots. The broccoli for impatient people who still want proper flavour. Sow in spring, eat by summer.",
    recipes: [
      {
        name: "Tenderstem with sesame dressing",
        description:
          "Blanch or steam until bright green and just tender. Dress with soy sauce, sesame oil, a squeeze of lime, and a scatter of toasted sesame seeds. Five minutes, and it's the best side dish on the table.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=green+magic+broccoli" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=green+magic+broccoli" },
    ],
  },
  {
    id: "broccoli-ironman",
    cropSlug: "broccoli",
    name: "Ironman",
    rarity: "uncommon",
    personality:
      "Heavy-cropping calabrese with dense, blue-green heads that hold well on the plant instead of bolting the moment you turn your back. Reliable, productive, and named after exactly what it is.",
    recipes: [
      {
        name: "Charred broccoli with anchovy butter",
        description:
          "Halve the heads, char in a screaming hot pan until deeply browned on the cut side. Top with butter melted with a mashed anchovy, lemon zest, and chilli. The char is the point — don't be timid.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=ironman+broccoli" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=ironman+broccoli" },
    ],
  },

  // ============================================================
  // CABBAGE
  // ============================================================
  {
    id: "cabbage-hispi",
    cropSlug: "cabbage",
    name: "Hispi",
    rarity: "common",
    personality:
      "Pointed, fast-growing, and the sweetest spring cabbage you'll find. Chefs love it because it chars beautifully and has a tenderness that round cabbages can't match. The cool one.",
    recipes: [
      {
        name: "Charred hispi cabbage with miso butter",
        description:
          "Quarter lengthways, brush with miso mixed into melted butter, char on a griddle or under the grill until the edges blacken and the inside goes silky. Restaurant trick, garden vegetable.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=hispi+cabbage" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=hispi+cabbage" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=hispi+cabbage" },
    ],
  },
  {
    id: "cabbage-january-king",
    cropSlug: "cabbage",
    name: "January King",
    rarity: "uncommon",
    personality:
      "Purple-flushed, frost-hardy, and absolutely stunning in the winter garden. The outer leaves go deep violet in cold weather while the heart stays pale green. Tastes as good as it looks.",
    recipes: [
      {
        name: "Slow-braised cabbage",
        description:
          "Quarter the head, place in a pot with butter, stock, a splash of cider vinegar, and a bay leaf. Cover and braise in a low oven for an hour until meltingly tender. Winter eating at its finest.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=january+king+cabbage" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=january+king+cabbage" },
    ],
  },
  {
    id: "cabbage-red-drumhead",
    cropSlug: "cabbage",
    name: "Red Drumhead",
    rarity: "uncommon",
    personality:
      "Dense, deep purple, and far less bothered by caterpillars than green varieties — something about the colour puts them off. Stores well, pickles brilliantly, and adds drama to every plate it touches.",
    recipes: [
      {
        name: "Braised red cabbage with apple",
        description:
          "Shred finely, slow-cook with sliced apple, red wine vinegar, brown sugar, and a star anise until soft and jammy. The Christmas dinner side that steals the show from the turkey.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=red+drumhead+cabbage" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=red+drumhead+cabbage" },
    ],
  },

  // ============================================================
  // CAULIFLOWER
  // ============================================================
  {
    id: "cauliflower-all-the-year-round",
    cropSlug: "cauliflower",
    name: "All the Year Round",
    rarity: "common",
    personality:
      "Cauliflower is famously difficult, and this one makes it as easy as it gets. Reliable, adaptable, and produces good white curds without demanding a PhD in horticulture.",
    recipes: [
      {
        name: "Whole roasted cauliflower",
        description:
          "Boil whole for five minutes, drain, then roast at 200C with olive oil, cumin, and turmeric until deeply golden. Serve with tahini drizzled over the top. The centrepiece that happens to be a vegetable.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=all+the+year+round+cauliflower" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=all+the+year+round+cauliflower" },
    ],
  },
  {
    id: "cauliflower-graffiti",
    cropSlug: "cauliflower",
    name: "Graffiti",
    rarity: "rare",
    personality:
      "Vivid purple curds that keep their colour when cooked (unlike most purple vegetables, which betray you by turning grey). Tastes like cauliflower, looks like it fell out of a Willy Wonka film.",
    recipes: [
      {
        name: "Purple cauliflower steaks",
        description:
          "Slice thick steaks through the centre, brush with olive oil and za'atar, roast until charred at the edges. The purple deepens in the oven. Serve with a bright green herb sauce for maximum contrast.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=graffiti+cauliflower" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=graffiti+cauliflower" },
    ],
  },
  {
    id: "cauliflower-snowball",
    cropSlug: "cauliflower",
    name: "Snowball",
    rarity: "common",
    personality:
      "Compact, white, and well-protected by its wrapper leaves. A reliable variety for beginners that doesn't need constant attention — just consistent watering and a bit of faith.",
    recipes: [
      {
        name: "Cauliflower cheese",
        description:
          "Steam florets until just tender, lay in a dish, cover with a thick, mustardy cheese sauce, and grill until golden and bubbling. The side dish that's really the main event. Nobody is here for the meat.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=snowball+cauliflower" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=snowball+cauliflower" },
    ],
  },

  // ============================================================
  // BRUSSELS SPROUTS
  // ============================================================
  {
    id: "brussels-sprouts-groninger",
    cropSlug: "brussels-sprouts",
    name: "Groninger",
    rarity: "uncommon",
    personality:
      "A Dutch heritage variety that produces small, tight buttons with intense, nutty flavour. The kind of sprout that converts people who think they don't like sprouts — which is to say, the best kind.",
    recipes: [
      {
        name: "Shredded sprouts with bacon and chestnuts",
        description:
          "Slice them thin, fry fast in a hot pan with lardons until the edges crisp. Toss in roughly chopped roasted chestnuts and a grind of black pepper. The dish that converts sprout haters.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=groninger+brussels+sprouts" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=groninger+brussels+sprouts" },
    ],
  },
  {
    id: "brussels-sprouts-bosworth",
    cropSlug: "brussels-sprouts",
    name: "Bosworth",
    rarity: "common",
    personality:
      "Modern F1 that produces uniform, tight buttons from October right through Christmas and beyond. The reliable choice when you need sprouts for twenty on the 25th and can't afford a failure.",
    recipes: [
      {
        name: "Roasted sprouts with honey and sriracha",
        description:
          "Halve, toss with olive oil, roast at 220C until deeply caramelised. Drizzle with honey mixed with sriracha. The char is essential — soft sprouts are sad sprouts.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=bosworth+brussels+sprouts" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=bosworth+brussels+sprouts" },
    ],
  },
  {
    id: "brussels-sprouts-red-bull",
    cropSlug: "brussels-sprouts",
    name: "Red Bull",
    rarity: "rare",
    personality:
      "Purple-red sprouts that look extraordinary on the stalk and on the plate. Slightly nuttier than green varieties and they keep their colour when roasted. The Christmas table show-stopper.",
    recipes: [
      {
        name: "Roasted red sprouts with pomegranate",
        description:
          "Halve, roast until crispy-edged, then scatter with pomegranate seeds, crumbled feta, and a drizzle of balsamic glaze. Red and green and festive without trying.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=red+bull+brussels+sprouts" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=red+bull+brussels+sprouts" },
    ],
  },

  // ============================================================
  // GARLIC
  // ============================================================
  {
    id: "garlic-solent-wight",
    cropSlug: "garlic",
    name: "Solent Wight",
    rarity: "common",
    personality:
      "A softneck bred for British conditions on the Isle of Wight. Plant in autumn, ignore it all winter, and by July you'll have fat bulbs with a mellow warmth that makes shop garlic taste like cardboard.",
    recipes: [
      {
        name: "Roasted garlic",
        description:
          "Slice the top off a whole bulb, drizzle with olive oil, wrap in foil, roast at 180C for forty minutes until the cloves are soft as butter. Squeeze onto toast. The simplest luxury.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=solent+wight+garlic+bulbs" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=solent+wight+garlic+bulbs" },
    ],
  },
  {
    id: "garlic-elephant",
    cropSlug: "garlic",
    name: "Elephant Garlic",
    rarity: "rare",
    personality:
      "Not technically garlic (it's a leek), but nobody cares because the cloves are the size of a child's fist and the flavour is gentle enough to roast whole and spread on bread. A conversation piece that happens to be delicious.",
    recipes: [
      {
        name: "Roasted elephant garlic with bread",
        description:
          "Roast whole bulbs in foil until soft and sweet. Squeeze the enormous cloves onto warm, crusty bread. The mildness means you can eat whole cloves without regretting it later.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=elephant+garlic+bulbs" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=elephant+garlic+bulbs" },
    ],
  },
  {
    id: "garlic-lautrec-wight",
    cropSlug: "garlic",
    name: "Lautrec Wight",
    rarity: "uncommon",
    personality:
      "A hardneck with beautiful pink-streaked skin and a punchy, complex flavour. Originally from the French town of Lautrec, adapted for UK growing. The garlic you choose when you want something with more personality.",
    recipes: [
      {
        name: "Aioli",
        description:
          "Crush cloves to a paste with salt, whisk in egg yolk, then slowly drizzle in olive oil until thick and glossy. The kind of garlic mayo that makes you wonder why the jarred stuff exists.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=lautrec+wight+garlic+bulbs" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=lautrec+wight+garlic+bulbs" },
    ],
  },

  // ============================================================
  // PARSLEY
  // ============================================================
  {
    id: "parsley-moss-curled",
    cropSlug: "parsley",
    name: "Moss Curled",
    rarity: "common",
    personality:
      "The curly parsley that's been sitting on the side of plates since your grandparents went to restaurants. Underrated. Fantastic chopped into everything from tabbouleh to a buttery sauce. Give it the respect it deserves.",
    recipes: [
      {
        name: "Tabbouleh",
        description:
          "A mountain of finely chopped parsley, a modest amount of bulgur wheat, diced tomato, spring onion, lemon juice, and olive oil. It's a parsley salad, not a grain salad. Most people get the ratio wrong.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=moss+curled+parsley" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=moss+curled+parsley" },
    ],
  },
  {
    id: "parsley-italian-giant",
    cropSlug: "parsley",
    name: "Italian Giant",
    rarity: "common",
    personality:
      "Flat-leaf, big-flavoured, and the one professional kitchens always choose. Grows to a generous size and handles repeated cutting without sulking. The parsley that earns its keep.",
    recipes: [
      {
        name: "Salsa verde",
        description:
          "Blitz flat-leaf parsley with capers, anchovy, garlic, red wine vinegar, and a generous pour of olive oil. Spoon over grilled meat, fish, or roasted vegetables. The green sauce that improves everything.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=italian+giant+parsley" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=italian+giant+parsley" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=italian+giant+parsley" },
    ],
  },

  // ============================================================
  // SWEETCORN
  // ============================================================
  {
    id: "sweetcorn-swift",
    cropSlug: "sweetcorn",
    name: "Swift",
    rarity: "common",
    personality:
      "An early variety that actually ripens in British summers — which is more than you can say for most sweetcorn. Grow in a block (not a row) for pollination, and the moment the silks go brown, get the water boiling.",
    recipes: [
      {
        name: "Corn on the cob with chilli butter",
        description:
          "Boil for three minutes (fresh sweetcorn needs barely any cooking). Roll in butter mixed with smoked chilli flakes, a squeeze of lime, and a crumble of salty cheese. Summer at its peak.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=swift+sweetcorn" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=swift+sweetcorn" },
    ],
  },
  {
    id: "sweetcorn-lark",
    cropSlug: "sweetcorn",
    name: "Lark",
    rarity: "uncommon",
    personality:
      "Supersweet type that holds its sugars longer after picking — handy if you can't get the water boiling the second you pick it. Good-sized cobs with tender kernels, and reliable enough for UK conditions.",
    recipes: [
      {
        name: "Sweetcorn fritters",
        description:
          "Strip the kernels, mix with a batter of flour, egg, spring onion, and a pinch of chilli. Fry spoonfuls in a pan until golden and crispy. Serve with sweet chilli sauce and a squeeze of lime.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=lark+sweetcorn" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=lark+sweetcorn" },
    ],
  },
  {
    id: "sweetcorn-glass-gem",
    cropSlug: "sweetcorn",
    name: "Glass Gem",
    rarity: "legendary",
    personality:
      "You're not growing this for eating. You're growing it for the moment you peel back the husk and see those translucent, jewel-coloured kernels for the first time. Every cob is different — ruby, sapphire, amber, opal. A Cherokee heritage variety rescued by a seed saver in Oklahoma. Dry it and keep it on the shelf. It's art.",
    recipes: [
      {
        name: "Decorative corn wreath",
        description:
          "Dry the cobs fully, then wire them into a harvest wreath with dried flowers and seed heads. Not a recipe — a reason to grow something purely for its beauty. Though if you must eat it, the dried kernels make decent popcorn.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=glass+gem+sweetcorn+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=glass+gem+sweetcorn+seeds" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=glass+gem+sweetcorn+seeds" },
    ],
  },

  // ============================================================
  // COURGETTES
  // ============================================================
  {
    id: "courgettes-black-beauty",
    cropSlug: "courgettes",
    name: "Black Beauty",
    rarity: "common",
    personality:
      "Dark green, glossy, and so productive you'll be leaving them on your neighbours' doorsteps by August. The one that turns every first-time grower into someone who says 'does anyone want some courgettes?' with increasing desperation.",
    recipes: [
      {
        name: "Courgette fritters",
        description:
          "Grate, squeeze out the water (this bit matters), mix with feta, mint, and a beaten egg. Fry spoonfuls until golden. Crunchy outside, melting inside.",
      },
      {
        name: "Courgette ribbons with lemon and parmesan",
        description:
          "Peel into long ribbons, toss in a hot pan with olive oil, lemon zest, chilli flakes, and shaved parmesan. Two minutes. Feels like a restaurant dish, tastes like summer.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=black+beauty+courgettes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=black+beauty+courgettes" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=black+beauty+courgettes" },
    ],
  },
  {
    id: "courgettes-tromboncino",
    cropSlug: "courgettes",
    name: "Tromboncino",
    rarity: "rare",
    personality:
      "An Italian climbing courgette that grows long, curved, pale-green fruits shaped like a trombone. Grows up instead of out, so it's perfect for small spaces. The flesh is denser and nuttier than regular courgettes, and it keeps producing until the first frost.",
    recipes: [
      {
        name: "Tromboncino pasta",
        description:
          "Dice into cubes, fry with garlic and chilli until golden at the edges, toss with spaghetti, toasted breadcrumbs, and a shower of pecorino. The nuttier flesh holds its shape better than watery courgettes.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=tromboncino+courgette+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=tromboncino+courgette+seeds" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=tromboncino+courgette+seeds" },
    ],
  },
  {
    id: "courgettes-costata-romanesco",
    cropSlug: "courgettes",
    name: "Costata Romanesco",
    rarity: "uncommon",
    personality:
      "Ribbed, grey-green, and with a firmer texture than smooth courgettes. An Italian heirloom that chefs seek out because it fries beautifully — the ridges catch oil and crisp up. The blossoms are huge and perfect for stuffing.",
    recipes: [
      {
        name: "Stuffed courgette flowers",
        description:
          "Fill the enormous golden blossoms with ricotta, lemon zest, and mint. Dip in a light batter and fry until crisp. Eat immediately. This is the reason people grow courgettes.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=costata+romanesco+courgette+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=costata+romanesco+courgette+seeds" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=costata+romanesco+courgette+seeds" },
    ],
  },

  // ============================================================
  // FRENCH BEANS
  // ============================================================
  {
    id: "french-beans-the-prince",
    cropSlug: "french-beans",
    name: "The Prince",
    rarity: "common",
    personality:
      "Flat-podded, stringless, and ready fast. A dwarf bush bean that doesn't need staking and produces handfuls of tender green pods. The beginner's best friend in the bean world.",
    recipes: [
      {
        name: "French bean salad nicoise",
        description:
          "Blanch until bright green and still snappy, toss with good tinned tuna, halved cherry tomatoes, soft-boiled eggs, olives, and a mustardy vinaigrette. Summer lunch, sorted.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=the+prince+french+beans" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=the+prince+french+beans" },
    ],
  },
  {
    id: "french-beans-cobra",
    cropSlug: "french-beans",
    name: "Cobra",
    rarity: "uncommon",
    personality:
      "A climbing French bean that goes up instead of out, saving space and producing long, round, stringless pods for months. Keep picking and it keeps producing. The bean that rewards attention.",
    recipes: [
      {
        name: "French beans with shallots and almonds",
        description:
          "Blanch the beans, toss in a pan with butter, sliced shallots, and flaked almonds until the almonds are golden. A simple side that elevates everything next to it.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=cobra+french+beans" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=cobra+french+beans" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=cobra+french+beans" },
    ],
  },
  {
    id: "french-beans-purple-teepee",
    cropSlug: "french-beans",
    name: "Purple Teepee",
    rarity: "uncommon",
    personality:
      "Deep purple pods held above the foliage so you can actually see them — no more accidentally leaving giant woody beans hidden under leaves. They turn green when cooked (which feels like a betrayal), but the flavour is excellent.",
    recipes: [
      {
        name: "Tempura purple beans",
        description:
          "Leave whole, dip into ice-cold tempura batter, fry until light and crispy. Serve with soy sauce and pickled ginger. The purple stays if you're quick enough with the oil.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=purple+teepee+french+beans" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=purple+teepee+french+beans" },
    ],
  },

  // ============================================================
  // SQUASH
  // ============================================================
  {
    id: "squash-butternut",
    cropSlug: "squash",
    name: "Butternut",
    rarity: "common",
    personality:
      "The one everyone knows and the one that reliably ripens in UK summers. Tan skin, orange flesh, and a sweetness that deepens in storage. Harvest in September, eat through Christmas. The kitchen workhorse of the squash world.",
    recipes: [
      {
        name: "Roasted butternut squash soup",
        description:
          "Halve, roast until deeply caramelised, scoop out the flesh, and blitz with stock, a touch of cream, and a grating of nutmeg. The roasting is what makes this better than every other squash soup.",
      },
      {
        name: "Squash risotto",
        description:
          "Roast cubed squash until golden, stir into a classic risotto with sage, butter, and parmesan. The cubes break down slightly, turning the rice a sunset orange.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=butternut+squash" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=butternut+squash" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=butternut+squash" },
    ],
  },
  {
    id: "squash-crown-prince",
    cropSlug: "squash",
    name: "Crown Prince",
    rarity: "uncommon",
    personality:
      "Blue-grey skin, deep orange flesh, and a flavour so rich it barely needs seasoning. Stores for months and actually improves with age. The squash that serious growers get excited about.",
    recipes: [
      {
        name: "Crown prince wedges with sage butter",
        description:
          "Cut into thick wedges, roast with olive oil until caramelised at the edges, then drizzle with brown butter infused with crispy sage leaves. The flesh goes almost custard-like.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=crown+prince+squash" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=crown+prince+squash" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=crown+prince+squash" },
    ],
  },
  {
    id: "squash-uchiki-kuri",
    cropSlug: "squash",
    name: "Uchiki Kuri",
    rarity: "uncommon",
    personality:
      "A Japanese onion squash with vivid orange skin and a chestnut-like flavour that's richer and nuttier than butternut. Small enough to use in one go, productive enough to give you a dozen per plant. The skin is thin enough to eat, which saves peeling a squash — always a win.",
    recipes: [
      {
        name: "Japanese pumpkin curry",
        description:
          "Cube (skin on), simmer in coconut milk with Thai curry paste, kaffir lime leaves, and a splash of fish sauce. The chestnutty flesh absorbs the spices beautifully. Serve over jasmine rice.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=uchiki+kuri+squash" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=uchiki+kuri+squash" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=uchiki+kuri+squash" },
    ],
  },

  // ============================================================
  // PUMPKINS
  // ============================================================
  {
    id: "pumpkins-jack-o-lantern",
    cropSlug: "pumpkins",
    name: "Jack O'Lantern",
    rarity: "common",
    personality:
      "The classic carving pumpkin that looks exactly like the emoji. Grows to a satisfying size, carves easily, and — let's be honest — the kids are going to demand one. The flesh isn't the best for eating, but the seeds roast brilliantly.",
    recipes: [
      {
        name: "Roasted pumpkin seeds",
        description:
          "Rinse the seeds, toss with olive oil, smoked paprika, and flaky salt. Roast at 180C until golden and crunchy. The best bit of the carving pumpkin, and the only bit most people eat.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=jack+o+lantern+pumpkins" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=jack+o+lantern+pumpkins" },
    ],
  },
  {
    id: "pumpkins-muscade-de-provence",
    cropSlug: "pumpkins",
    name: "Muscade de Provence",
    rarity: "rare",
    personality:
      "A deeply ribbed, flat, burnt-orange French heirloom that looks like it belongs in a still life painting. The flesh is intensely sweet and musky — 'muscade' — and the flavour is in a different league from carving pumpkins. The one you grow for eating, not decorating.",
    recipes: [
      {
        name: "Pumpkin ravioli with brown butter and sage",
        description:
          "Roast the flesh until sweet and concentrated, blitz with ricotta and nutmeg, fill fresh pasta. Serve with brown butter, crispy sage, and a grating of parmesan. The kind of dish that makes people go very quiet.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=muscade+de+provence+pumpkins" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=muscade+de+provence+pumpkins" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=muscade+de+provence+pumpkins" },
    ],
  },
  {
    id: "pumpkins-atlantic-giant",
    cropSlug: "pumpkins",
    name: "Atlantic Giant",
    rarity: "rare",
    personality:
      "The competition pumpkin. Feed it, water it, talk to it, and it can grow to over 100kg. Not great for eating, but absolutely thrilling to grow if you want to win a village fete or just see the look on your neighbours' faces.",
    recipes: [
      {
        name: "Pumpkin pie (if you insist)",
        description:
          "Roast the flesh, puree, mix with eggs, cream, cinnamon, ginger, and nutmeg, pour into a pastry case and bake until just set. The flavour won't match a Muscade, but the bragging rights are unmatched.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=atlantic+giant+pumpkins" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=atlantic+giant+pumpkins" },
    ],
  },

  // ============================================================
  // CORIANDER
  // ============================================================
  {
    id: "coriander-leisure",
    cropSlug: "coriander",
    name: "Leisure",
    rarity: "common",
    personality:
      "Bred to be slow to bolt, which is the single most important thing in a coriander variety. Most coriander sees a warm day and immediately shoots to seed. Leisure actually gives you weeks of usable leaf. Revolutionary.",
    recipes: [
      {
        name: "Coriander chutney",
        description:
          "Blitz a big bunch with green chilli, garlic, ginger, lime juice, a pinch of sugar, and a splash of water. Serve with anything — samosas, grilled chicken, rice. The green sauce that Indian restaurants never give you enough of.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=leisure+coriander" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=leisure+coriander" },
    ],
  },
  {
    id: "coriander-calypso",
    cropSlug: "coriander",
    name: "Calypso",
    rarity: "uncommon",
    personality:
      "Even slower to bolt than Leisure, with larger leaves and a milder flavour. If you've given up on growing coriander because it always runs to seed the moment your back is turned, this is the one that might change your mind.",
    recipes: [
      {
        name: "Guacamole",
        description:
          "Mash ripe avocado with a fork (not a blender — keep it chunky), fold in finely chopped coriander, diced red onion, lime juice, and a pinch of salt. The fresh coriander makes all the difference between good and great.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=calypso+coriander" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=calypso+coriander" },
    ],
  },

  // ============================================================
  // ROCKET
  // ============================================================
  {
    id: "rocket-wild-rocket",
    cropSlug: "rocket",
    name: "Wild Rocket",
    rarity: "common",
    personality:
      "Narrow, serrated leaves with a peppery kick that makes salad rocket taste bland. Perennial in mild areas, so one sowing can keep giving for years. Slow-growing but worth the wait — the flavour is concentrated and properly fiery.",
    recipes: [
      {
        name: "Rocket and parmesan salad",
        description:
          "A pile of peppery leaves, shavings of parmesan, a squeeze of lemon, and your best olive oil. Nothing else. When the rocket is this good, simplicity is the point.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=wild+rocket" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=wild+rocket" },
    ],
  },
  {
    id: "rocket-apollo",
    cropSlug: "rocket",
    name: "Apollo",
    rarity: "common",
    personality:
      "Fast-growing salad rocket that's ready in about four weeks. Milder and broader-leaved than wild rocket, but still with that mustard warmth. The one you sow every couple of weeks for a constant supply of sandwich-ready leaves.",
    recipes: [
      {
        name: "Rocket pesto",
        description:
          "Blitz rocket with garlic, pine nuts, parmesan, and olive oil. Peppery, punchy, and a brilliant alternative to basil pesto. Toss through hot pasta or spread on toast with goat's cheese.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=apollo+rocket" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=apollo+rocket" },
    ],
  },
  {
    id: "rocket-wasabi",
    cropSlug: "rocket",
    name: "Wasabi",
    rarity: "uncommon",
    personality:
      "Not actual wasabi, but rocket with a similar sharp, sinus-clearing heat that fades quickly to peppery warmth. The leaves are darker and the flavour is more intense than standard rocket. Perfect for people who find normal rocket too polite.",
    recipes: [
      {
        name: "Steak sandwich with wasabi rocket",
        description:
          "Seared steak on crusty bread, a smear of horseradish mayo, and a generous handful of wasabi rocket. The heat of the leaves cuts through the richness of the meat. No other salad leaf would work here.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=wasabi+rocket" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=wasabi+rocket" },
    ],
  },

  // ============================================================
  // PAK CHOI
  // ============================================================
  {
    id: "pak-choi-joi-choi",
    cropSlug: "pak-choi",
    name: "Joi Choi",
    rarity: "common",
    personality:
      "Big, white-stemmed, and one of the most reliable pak choi for UK conditions. Slower to bolt than most, which in pak choi terms is the difference between a crop and a disappointment.",
    recipes: [
      {
        name: "Stir-fried pak choi with oyster sauce",
        description:
          "Halve the heads, sear cut-side down in a wok until charred, flip, add a splash of oyster sauce and a drizzle of sesame oil. Thirty seconds. The stems stay crisp while the leaves wilt.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=joi+choi+pak+choi" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=joi+choi+pak+choi" },
    ],
  },
  {
    id: "pak-choi-red-choi",
    cropSlug: "pak-choi",
    name: "Red Choi",
    rarity: "uncommon",
    personality:
      "Purple-red leaves with green undersides that look dramatic in the garden and on the plate. Same crisp, mild flavour as green pak choi but with anthocyanin-rich colour that makes everything it's added to look more interesting.",
    recipes: [
      {
        name: "Red choi in miso broth",
        description:
          "Dissolve white miso paste in hot dashi, slide in halved red choi, add silken tofu cubes and a few slices of spring onion. The purple leaves soften into the golden broth. Beautiful and nourishing.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=red+choi+pak+choi" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=red+choi+pak+choi" },
    ],
  },

  // ============================================================
  // FENNEL
  // ============================================================
  {
    id: "fennel-romanesco",
    cropSlug: "fennel",
    name: "Romanesco",
    rarity: "common",
    personality:
      "The variety most likely to form those fat, white, anise-scented bulbs. Slower to bolt than others, which matters enormously because fennel loves to bolt. Plant it out after the longest day for the best results.",
    recipes: [
      {
        name: "Shaved fennel salad with orange",
        description:
          "Mandoline the bulb paper-thin, toss with orange segments, black olives, a splash of olive oil, and a scatter of fronds. Sicilian sunshine in a bowl. The anise softens against the citrus.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=romanesco+fennel" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=romanesco+fennel" },
    ],
  },
  {
    id: "fennel-finale",
    cropSlug: "fennel",
    name: "Finale",
    rarity: "uncommon",
    personality:
      "Bolt-resistant and quick to bulb, which is exactly what you want from fennel. The bulbs are round, white, and have that clean aniseed flavour that works raw or cooked. A modern variety that solves fennel's biggest problem.",
    recipes: [
      {
        name: "Braised fennel with parmesan",
        description:
          "Quarter the bulbs, braise in white wine and stock until meltingly tender, scatter with parmesan and breadcrumbs, and grill until golden. The anise mellows into something sweet and gentle.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=finale+fennel" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=finale+fennel" },
    ],
  },
  {
    id: "fennel-bronze-fennel",
    cropSlug: "fennel",
    name: "Bronze Fennel",
    rarity: "rare",
    personality:
      "Grown for its feathery, bronze-purple foliage rather than a bulb — because it doesn't form one. Tall, architectural, and the fronds taste wonderfully of aniseed. A herb disguised as a garden ornamental. Bees and hoverflies go mad for the flowers.",
    recipes: [
      {
        name: "Fennel-frond fish",
        description:
          "Stuff a whole sea bass with bronze fennel fronds, lemon slices, and garlic. Grill or bake until the skin crisps. The anise-scented steam perfumes the fish from the inside out.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=bronze+fennel+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=bronze+fennel+seeds" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=bronze+fennel+seeds" },
    ],
  },

  // ============================================================
  // CELERY
  // ============================================================
  {
    id: "celery-victoria",
    cropSlug: "celery",
    name: "Victoria",
    rarity: "common",
    personality:
      "Self-blanching, which means you don't need to earth it up in trenches like Victorian gardeners. Plant in a block, the outer plants shade the inner ones, and you get pale, tender stems with much less faff.",
    recipes: [
      {
        name: "Waldorf salad",
        description:
          "Slice crisp celery, toss with apple, walnuts, and a dressing of mayonnaise lightened with lemon juice and a touch of cream. The crunch of good celery makes this dish — without it, it's just a bowl of mayo.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=victoria+celery" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=victoria+celery" },
    ],
  },
  {
    id: "celery-giant-red",
    cropSlug: "celery",
    name: "Giant Red",
    rarity: "uncommon",
    personality:
      "Red-blushed stems with a more intense flavour than green celery. A heritage trench variety that rewards proper blanching with beautiful, rosy sticks. More work, but the flavour and colour are something else entirely.",
    recipes: [
      {
        name: "Braised red celery",
        description:
          "Halve the sticks, braise slowly in stock with butter and thyme until silky-soft and the pink deepens. Serve as a side to roast chicken. The transformation from raw crunch to braised silk is remarkable.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=giant+red+celery" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=giant+red+celery" },
    ],
  },

  // ============================================================
  // DILL
  // ============================================================
  {
    id: "dill-mammoth",
    cropSlug: "dill",
    name: "Mammoth",
    rarity: "common",
    personality:
      "Tall, feathery, and produces masses of leaf before flowering. The name oversells the drama — it's not actually mammoth-sized — but it's the most reliable dill for UK conditions and gives you plenty to work with.",
    recipes: [
      {
        name: "Gravadlax",
        description:
          "Pack a salmon fillet with a crust of salt, sugar, and masses of fresh dill. Wrap tightly, weight down, refrigerate for 48 hours. Slice thin. The dill flavour permeates every layer. Scandi magic.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=mammoth+dill" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=mammoth+dill" },
    ],
  },
  {
    id: "dill-dukat",
    cropSlug: "dill",
    name: "Dukat",
    rarity: "uncommon",
    personality:
      "A Danish variety selected specifically for leaf production rather than seed. Slower to flower, which means more weeks of usable fronds. The dill for people who want dill for cooking rather than pickling.",
    recipes: [
      {
        name: "Dill and cucumber salad",
        description:
          "Slice cucumber thinly, toss with sour cream, a generous handful of chopped dill, white wine vinegar, and a pinch of sugar. The Scandinavian side dish that appears at every summer table for a reason.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=dukat+dill" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=dukat+dill" },
    ],
  },

  // ============================================================
  // TOMATOES
  // ============================================================
  {
    id: "tomatoes-sungold",
    cropSlug: "tomatoes",
    name: "Sungold",
    rarity: "legendary",
    personality:
      "The cherry tomato that ruined supermarket tomatoes for everyone. Absurdly sweet, thin-skinned, and you'll eat half of them before they make it indoors. Trusses of golden-orange fruits that split if you look at them wrong, but you won't care because the flavour is extraordinary.",
    recipes: [
      {
        name: "Sungold pasta",
        description:
          "Halve a handful, toss with olive oil, torn basil, a pinch of flaky salt. Pile onto hot spaghetti with a splash of pasta water and a grating of parmesan. The tomatoes barely need cooking — just warming through.",
      },
      {
        name: "Sungold gazpacho",
        description:
          "Blitz with a slice of stale bread, cucumber, a clove of garlic, sherry vinegar, and olive oil. Strain if you want it smooth. Serve ice-cold. Like bottled sunshine.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=sungold+tomato+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=sungold+tomato+seeds" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=sungold+tomato+seeds" },
    ],
  },
  {
    id: "tomatoes-gardeners-delight",
    cropSlug: "tomatoes",
    name: "Gardener's Delight",
    rarity: "common",
    personality:
      "The most popular cherry tomato in Britain and the gateway drug for every new grower. Sweet, reliable, prolific, and forgiving of the kind of neglect that happens in August when you go on holiday.",
    recipes: [
      {
        name: "Slow-roasted cherry tomatoes",
        description:
          "Halve, place cut-side up on a tray, drizzle with olive oil, scatter with thyme and garlic. Roast at 140C for an hour until concentrated and jammy. Store in oil. Summer preserved.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=gardeners+delight+tomato+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=gardeners+delight+tomato+seeds" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=gardeners+delight+tomato+seeds" },
    ],
  },
  {
    id: "tomatoes-moneymaker",
    cropSlug: "tomatoes",
    name: "Moneymaker",
    rarity: "common",
    personality:
      "The classic medium-sized red tomato that's been grown in British greenhouses since the 1930s. Not the most exciting flavour, but utterly reliable and productive. The one your dad grew.",
    recipes: [
      {
        name: "Tomato sauce",
        description:
          "Score, blanch, peel, and simmer with garlic, olive oil, a pinch of sugar, and basil until thick and jammy. The foundation of a hundred meals. Freeze in batches and feel smug all winter.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=moneymaker+tomato+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=moneymaker+tomato+seeds" },
    ],
  },
  {
    id: "tomatoes-black-krim",
    cropSlug: "tomatoes",
    name: "Black Krim",
    rarity: "rare",
    personality:
      "A Russian heritage beefsteak from the Crimean peninsula. Dark, dusky, purple-brown skin with a complex, smoky sweetness that's nothing like a regular tomato. Slice thick, salt, and eat on its own. This is the one that makes people realise tomatoes can taste like this.",
    recipes: [
      {
        name: "Tomato on toast",
        description:
          "Slice thick, lay on buttered sourdough toast, add flaky salt and a crack of pepper. That's it. A Black Krim doesn't need anything else. The smokiness and sweetness together are extraordinary.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=black+krim+tomato+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=black+krim+tomato+seeds" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=black+krim+tomato+seeds" },
    ],
  },

  // ============================================================
  // PEPPERS
  // ============================================================
  {
    id: "peppers-bell-boy",
    cropSlug: "peppers",
    name: "Bell Boy",
    rarity: "common",
    personality:
      "Thick-walled, glossy, and reliable even in UK conditions. Starts green, ripens to red if you're patient (and your summer is warm enough). The sweet pepper that just works.",
    recipes: [
      {
        name: "Stuffed peppers",
        description:
          "Halve, fill with a mixture of rice, herbs, feta, and pine nuts. Bake until the pepper is soft and the filling is golden. The thick walls hold everything together perfectly.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=bell+boy+peppers" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=bell+boy+peppers" },
    ],
  },
  {
    id: "peppers-sweet-banana",
    cropSlug: "peppers",
    name: "Sweet Banana",
    rarity: "uncommon",
    personality:
      "Long, pale yellow peppers that are milder and sweeter than bell types. Brilliant for frying, stuffing, or eating raw. The Italian nonnas grow these and char them on the barbecue. Follow their lead.",
    recipes: [
      {
        name: "Charred banana peppers with burrata",
        description:
          "Grill whole until the skin blisters and chars. Pile onto a plate, tear open a burrata, drizzle with olive oil and a scatter of basil. The sweet, smoky peppers against the creamy cheese is a summer essential.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=sweet+banana+peppers" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=sweet+banana+peppers" },
    ],
  },
  {
    id: "peppers-lipstick",
    cropSlug: "peppers",
    name: "Lipstick",
    rarity: "uncommon",
    personality:
      "A tapered, thick-walled pepper that ripens early to a vivid, glossy red. Named for the colour, and the colour delivers. Sweeter than most, with thin skin that chars rather than going leathery. Excellent raw, even better roasted.",
    recipes: [
      {
        name: "Romesco sauce",
        description:
          "Roast the peppers until blistered, blitz with toasted almonds, garlic, smoked paprika, sherry vinegar, and olive oil. Smoky, nutty, and goes with everything from grilled spring onions to fish.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=lipstick+pepper+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=lipstick+pepper+seeds" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=lipstick+pepper+seeds" },
    ],
  },

  // ============================================================
  // CHILLIES
  // ============================================================
  {
    id: "chillies-jalapeno",
    cropSlug: "chillies",
    name: "Jalapeno",
    rarity: "common",
    personality:
      "The world's most useful chilli. Warm enough to add bite, mild enough not to hospitalise anyone. Thick-walled and perfect for stuffing, slicing, and pickling. Grows well on a sunny UK windowsill and makes you feel like you're getting away with something.",
    recipes: [
      {
        name: "Pickled jalapenos",
        description:
          "Slice into rings, pack into jars with garlic and peppercorns, cover with hot vinegar brine. Ready in a day, perfect in a week. You'll put them on everything.",
      },
      {
        name: "Jalapeno poppers",
        description:
          "Halve, stuff with cream cheese, wrap in bacon, bake until crispy. The heat, the cream, the salt, the crunch. Dangerously good.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=jalapeno+chillies" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=jalapeno+chillies" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=jalapeno+chillies" },
    ],
  },
  {
    id: "chillies-ring-of-fire",
    cropSlug: "chillies",
    name: "Ring of Fire",
    rarity: "uncommon",
    personality:
      "A cayenne type that dries brilliantly — string them up in the kitchen and you've got a year's worth of chilli flakes and an instant rustic aesthetic. Productive, hot without being hostile, and genuinely easy to grow.",
    recipes: [
      {
        name: "Homemade chilli flakes",
        description:
          "String the ripe red chillies on thread, hang in a warm, dry place until completely dried. Crush in a mortar. Your own chilli flakes, infinitely better than the jar, and they'll last all year.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=ring+of+fire+chillies" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=ring+of+fire+chillies" },
    ],
  },
  {
    id: "chillies-scotch-bonnet",
    cropSlug: "chillies",
    name: "Scotch Bonnet",
    rarity: "rare",
    personality:
      "Fiercely hot and distinctly fruity — the chilli behind jerk chicken and Caribbean pepper sauce. Needs warmth to ripen in the UK (a greenhouse or sunny windowsill), but if you get it right, a single plant produces enough to heat-proof your cooking for months.",
    recipes: [
      {
        name: "Caribbean pepper sauce",
        description:
          "Blitz ripe scotch bonnets with mango, garlic, mustard, vinegar, and a pinch of allspice. Fruity, fiery, and a few drops transform rice and peas, grilled chicken, or a morning egg. Wear gloves.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=scotch+bonnet+chillies" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=scotch+bonnet+chillies" },
    ],
  },

  // ============================================================
  // CUCUMBERS
  // ============================================================
  {
    id: "cucumbers-marketmore",
    cropSlug: "cucumbers",
    name: "Marketmore",
    rarity: "common",
    personality:
      "Dark green, uniform, and reliably productive outdoors — which is the key bit, since most cucumbers want a greenhouse. Slightly thicker skin than indoor types, but the flavour is crisp and fresh. The outdoor cucumber that actually delivers.",
    recipes: [
      {
        name: "Tzatziki",
        description:
          "Grate the cucumber, squeeze out every last drop of water (seriously, squeeze harder), fold into thick Greek yoghurt with garlic, mint, a drizzle of olive oil, and a squeeze of lemon. The dip that makes everything better.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=marketmore+cucumbers" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=marketmore+cucumbers" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=marketmore+cucumbers" },
    ],
  },
  {
    id: "cucumbers-crystal-lemon",
    cropSlug: "cucumbers",
    name: "Crystal Lemon",
    rarity: "rare",
    personality:
      "Round, yellow, and about the size of a tennis ball. Looks like a lemon, tastes like the freshest cucumber you've ever eaten. A heritage variety that confuses visitors and delights everyone who tries it. Prolific and easy outdoors.",
    recipes: [
      {
        name: "Crystal Lemon in gin and tonic",
        description:
          "Slice thinly and float in a G&T instead of regular cucumber. The round yellow slices look extraordinary against the glass, and the flavour is cleaner and more delicate. A talking point that also tastes better.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=crystal+lemon+cucumbers" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=crystal+lemon+cucumbers" },
    ],
  },
  {
    id: "cucumbers-telegraph-improved",
    cropSlug: "cucumbers",
    name: "Telegraph Improved",
    rarity: "common",
    personality:
      "The classic long, smooth greenhouse cucumber that's been in catalogues forever. Thin-skinned, seedless-when-young, and the one that makes sandwiches taste like summer. Needs indoor warmth but repays it with beautiful, straight fruits.",
    recipes: [
      {
        name: "Cucumber sandwiches",
        description:
          "White bread, crusts off, a thin layer of softened butter, paper-thin cucumber slices, a crack of white pepper. Cut into fingers. The most British thing you can do with a vegetable.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=telegraph+improved+cucumbers" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=telegraph+improved+cucumbers" },
    ],
  },

  // ============================================================
  // RUNNER BEANS
  // ============================================================
  {
    id: "runner-beans-scarlet-emperor",
    cropSlug: "runner-beans",
    name: "Scarlet Emperor",
    rarity: "common",
    personality:
      "Vivid scarlet flowers, heavy crops, and the most classic runner bean in the catalogue. Has been the backbone of British allotments since 1906. The flowers alone earn it a place in the garden — the beans are a bonus.",
    recipes: [
      {
        name: "Runner beans with garlic butter",
        description:
          "Slice on the diagonal, boil for three minutes until tender but still bright green. Drain, toss with garlic butter and a squeeze of lemon. The simple side that makes a roast dinner feel complete.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=scarlet+emperor+runner+beans" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=scarlet+emperor+runner+beans" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=scarlet+emperor+runner+beans" },
    ],
  },
  {
    id: "runner-beans-painted-lady",
    cropSlug: "runner-beans",
    name: "Painted Lady",
    rarity: "rare",
    personality:
      "A heritage variety from the 1830s with striking bi-coloured flowers — red and white on the same plant. Shorter than modern varieties and more decorative, it was originally grown as an ornamental before anyone thought to eat the beans. History on a wigwam.",
    recipes: [
      {
        name: "Runner bean chutney",
        description:
          "Slice the beans, cook with onions, vinegar, sugar, mustard, turmeric, and cornflour until thick and golden. Jar it up. An old-fashioned way to use a glut, and brilliant with cheese and cold meats.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=painted+lady+runner+beans" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=painted+lady+runner+beans" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=painted+lady+runner+beans" },
    ],
  },
  {
    id: "runner-beans-white-lady",
    cropSlug: "runner-beans",
    name: "White Lady",
    rarity: "uncommon",
    personality:
      "Pure white flowers and stringless pods. Sets fruit in hot weather better than red-flowered varieties (bees can see white flowers more easily in bright sun), so it's the one to grow if your runner beans have ever refused to set pods.",
    recipes: [
      {
        name: "Runner bean and tomato gratin",
        description:
          "Slice the beans, layer with tomatoes and garlic in a dish, cover with breadcrumbs and parmesan, bake until golden and bubbling. A dish that uses the glut and feels like proper cooking.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=white+lady+runner+beans" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=white+lady+runner+beans" },
    ],
  },

  // ============================================================
  // AUBERGINE
  // ============================================================
  {
    id: "aubergine-black-beauty",
    cropSlug: "aubergine",
    name: "Black Beauty",
    rarity: "common",
    personality:
      "The classic glossy, dark-purple aubergine. Needs warmth and patience in the UK — a greenhouse or very sheltered spot — but when it works, you get that satisfying moment of picking something that looks like it belongs in a Mediterranean market.",
    recipes: [
      {
        name: "Baba ganoush",
        description:
          "Char the whole aubergine over a flame or under the grill until the skin blackens and the inside collapses. Scoop out the smoky flesh, mix with tahini, lemon juice, garlic, and olive oil. The char is everything.",
      },
      {
        name: "Aubergine parmigiana",
        description:
          "Slice, salt, fry until golden, layer with tomato sauce and mozzarella, bake until bubbling. The dish that proves aubergine was always meant to be cooked with serious heat and serious cheese.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=black+beauty+aubergine" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=black+beauty+aubergine" },
    ],
  },
  {
    id: "aubergine-pinstripe",
    cropSlug: "aubergine",
    name: "Pinstripe",
    rarity: "uncommon",
    personality:
      "Small, purple-and-white striped fruits that look like they were hand-painted. Compact plants that do well in pots, and the smaller size means they actually ripen in UK conditions. Form and function, beautifully balanced.",
    recipes: [
      {
        name: "Grilled aubergine with pomegranate",
        description:
          "Slice thickly, grill until charred and soft, drizzle with pomegranate molasses, scatter with pomegranate seeds and fresh mint. The stripes still show through the char. Almost too pretty.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=pinstripe+aubergine" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=pinstripe+aubergine" },
    ],
  },
  {
    id: "aubergine-slim-jim",
    cropSlug: "aubergine",
    name: "Slim Jim",
    rarity: "uncommon",
    personality:
      "Long, slender, and quick to mature — all the things you want from an aubergine in the UK. The thin fruits don't need salting and cook fast in a hot pan. Less fuss, more aubergine.",
    recipes: [
      {
        name: "Miso-glazed aubergine",
        description:
          "Halve lengthways, score the flesh, brush with a paste of white miso, mirin, and sugar. Grill until caramelised and collapsing. The slim shape means more glaze-to-flesh ratio, which is exactly what you want.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=slim+jim+aubergine" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=slim+jim+aubergine" },
    ],
  },

  // ============================================================
  // BASIL
  // ============================================================
  {
    id: "basil-genovese",
    cropSlug: "basil",
    name: "Genovese",
    rarity: "common",
    personality:
      "The basil. Big, fragrant leaves with that unmistakable sweet, peppery aroma that transports you to Italy the moment you brush past the plant. The one for pesto, for Caprese, for tearing over everything in August.",
    recipes: [
      {
        name: "Classic pesto",
        description:
          "Blitz basil leaves with garlic, pine nuts, parmesan, and olive oil. Don't over-process — a bit of texture is good. The only rule is to use it generously.",
      },
      {
        name: "Caprese salad",
        description:
          "Thick slices of tomato, torn mozzarella, whole basil leaves, olive oil, and nothing else. When the basil is this fresh and the tomatoes are this good, restraint is the whole point.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=genovese+basil" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=genovese+basil" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=genovese+basil" },
    ],
  },
  {
    id: "basil-thai",
    cropSlug: "basil",
    name: "Thai Basil",
    rarity: "uncommon",
    personality:
      "Anise-scented with purple stems and a flavour nothing like Italian basil. The one that makes curries, stir-fries, and pho taste authentic. Sturdier than Genovese — holds its flavour when cooked instead of wilting into nothing.",
    recipes: [
      {
        name: "Thai basil chicken (pad kra pao)",
        description:
          "Stir-fry minced chicken with garlic, chilli, and a sauce of soy, fish sauce, and oyster sauce. Toss in handfuls of Thai basil at the last second. Serve over rice with a fried egg. The basil wilts into the sauce and perfumes everything.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=thai+basil" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=thai+basil" },
    ],
  },
  {
    id: "basil-purple-ruffles",
    cropSlug: "basil",
    name: "Purple Ruffles",
    rarity: "rare",
    personality:
      "Deep purple, ruffled leaves that look dramatic in the pot and on the plate. Slightly more clove-like than green basil, with a flavour that works in both Italian and Thai directions. Makes the most beautiful pink basil vinegar you've ever seen.",
    recipes: [
      {
        name: "Purple basil vinegar",
        description:
          "Pack a jar with purple basil leaves, cover with white wine vinegar, seal, and leave for two weeks. The vinegar turns a stunning deep pink. Strain and use in dressings. Edible alchemy.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=purple+ruffles+basil" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=purple+ruffles+basil" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=purple+ruffles+basil" },
    ],
  },

  // ============================================================
  // STRAWBERRIES
  // ============================================================
  {
    id: "strawberries-cambridge-favourite",
    cropSlug: "strawberries",
    name: "Cambridge Favourite",
    rarity: "common",
    personality:
      "The mid-season workhorse that's been in British gardens since the 1940s. Not the biggest berries, not the sweetest, but reliably productive and the one that actually tastes like strawberries — unlike supermarket giants bred for shelf life and nothing else.",
    recipes: [
      {
        name: "Strawberries and cream",
        description:
          "Hull, halve the bigger ones, put in a bowl, pour over cold double cream. Don't whip it. The cream should pool around the berries. A sugar sprinkle if you must, but good strawberries don't need it.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=cambridge+favourite+strawberry+plants" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=cambridge+favourite+strawberry+plants" },
    ],
  },
  {
    id: "strawberries-mara-des-bois",
    cropSlug: "strawberries",
    name: "Mara des Bois",
    rarity: "rare",
    personality:
      "A French perpetual variety that tastes like wild strawberries but is the size of a cultivated one. Produces from June until the first frost, which means months of berries with that intense, musky, woodland flavour. The one that strawberry snobs grow.",
    recipes: [
      {
        name: "Strawberry tart",
        description:
          "Blind-bake a sweet pastry case, fill with creme patissiere, arrange whole berries on top. Glaze with warmed apricot jam. The intense flavour of Mara des Bois means each bite is concentrated strawberry. No need for anything else.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=mara+des+bois+strawberry+plants" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=mara+des+bois+strawberry+plants" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=mara+des+bois+strawberry+plants" },
    ],
  },
  {
    id: "strawberries-royal-sovereign",
    cropSlug: "strawberries",
    name: "Royal Sovereign",
    rarity: "uncommon",
    personality:
      "A heritage variety from 1892 with the most extraordinary flavour of any strawberry you'll ever taste — and the most modest yields. This is the strawberry that modern varieties were bred away from in pursuit of bigger, firmer, blander. If you want flavour over quantity, this is the one.",
    recipes: [
      {
        name: "Eton mess",
        description:
          "Crush some berries, leave others whole. Fold into softly whipped cream with broken meringue pieces. The juices streak through the cream like pink marble. A dessert that celebrates imperfection.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=royal+sovereign+strawberry+plants" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=royal+sovereign+strawberry+plants" },
    ],
  },

  // ============================================================
  // RASPBERRIES
  // ============================================================
  {
    id: "raspberries-autumn-bliss",
    cropSlug: "raspberries",
    name: "Autumn Bliss",
    rarity: "common",
    personality:
      "Produces so many raspberries you'll run out of bowls by August. An autumn-fruiting variety you cut to the ground in February and it comes back every year. The lowest-maintenance fruit you can grow.",
    recipes: [
      {
        name: "Raspberry fool",
        description:
          "Crush half the berries with a fork, fold into softly whipped cream, then ripple through the rest whole. Serve in glasses. The most elegant thing you can do with five minutes and a punnet of raspberries.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=autumn+bliss+raspberry+canes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=autumn+bliss+raspberry+canes" },
    ],
  },
  {
    id: "raspberries-glen-ample",
    cropSlug: "raspberries",
    name: "Glen Ample",
    rarity: "common",
    personality:
      "Big, firm, summer-fruiting berries on spine-free canes — which means picking doesn't require protective clothing. One of the best commercial varieties, grown because the berries are large, the yields are heavy, and nobody gets hurt harvesting them.",
    recipes: [
      {
        name: "Raspberry jam",
        description:
          "Equal weight fruit and sugar, juice of a lemon, boil to setting point. That's it. The jam that fills the kitchen with the smell of summer and makes toast worth getting up for in January.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=glen+ample+raspberry+canes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=glen+ample+raspberry+canes" },
    ],
  },
  {
    id: "raspberries-all-gold",
    cropSlug: "raspberries",
    name: "All Gold",
    rarity: "uncommon",
    personality:
      "Golden-yellow raspberries that taste like apricot-flavoured sunshine. Sweeter and less acidic than red varieties, and the golden colour means birds are less interested (they're looking for red). An autumn-fruiter that's as beautiful as it is productive.",
    recipes: [
      {
        name: "Golden raspberry and white chocolate trifle",
        description:
          "Layer golden raspberries with sponge, custard, and folded white chocolate cream. The golden berries against the cream is gorgeous, and the sweeter flavour works perfectly with white chocolate where red raspberries would fight it.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=all+gold+raspberry+canes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=all+gold+raspberry+canes" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=all+gold+raspberry+canes" },
    ],
  },

  // ============================================================
  // BLACKBERRIES
  // ============================================================
  {
    id: "blackberries-loch-ness",
    cropSlug: "blackberries",
    name: "Loch Ness",
    rarity: "common",
    personality:
      "Thornless, upright, and well-behaved — the blackberry that doesn't try to take over your garden. Big, glossy berries from August into October, and you can pick them without looking like you've lost a fight with a cat.",
    recipes: [
      {
        name: "Blackberry and apple crumble",
        description:
          "Tumble blackberries and sliced apple into a dish, top with a rubble of butter, flour, sugar, and oats. Bake until the fruit bubbles through the golden crust. Serve with custard. The autumn pudding against which all others are measured.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=loch+ness+blackberry+plants" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=loch+ness+blackberry+plants" },
    ],
  },
  {
    id: "blackberries-chester",
    cropSlug: "blackberries",
    name: "Chester",
    rarity: "uncommon",
    personality:
      "Thornless, late-fruiting, and extremely hardy. The berries are sweet with a slight tartness that makes them better for cooking than some of the super-sweet modern varieties. When everyone else's blackberries are finished, Chester is still going strong.",
    recipes: [
      {
        name: "Blackberry gin",
        description:
          "Fill a jar with berries, add sugar, top with gin. Shake every day for a month, strain, and wait another month. Deep purple, warmly sweet, and the best possible use of an autumn glut.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=chester+blackberry+plants" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=chester+blackberry+plants" },
    ],
  },
  {
    id: "blackberries-karaka-black",
    cropSlug: "blackberries",
    name: "Karaka Black",
    rarity: "uncommon",
    personality:
      "Enormous, elongated, jet-black berries from New Zealand that ripen earlier than most — July onwards. The flavour is rich and sweet, and the size of the individual berries is genuinely startling. Does have thorns, but the fruit is worth the scratches.",
    recipes: [
      {
        name: "Blackberry compote",
        description:
          "Simmer the big berries briefly with a little sugar and a squeeze of lemon until they just start to burst. Spoon warm over vanilla ice cream or Greek yoghurt. Keep it simple when the berries are this good.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=karaka+black+blackberry+plants" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=karaka+black+blackberry+plants" },
    ],
  },

  // ============================================================
  // GOOSEBERRIES
  // ============================================================
  {
    id: "gooseberries-invicta",
    cropSlug: "gooseberries",
    name: "Invicta",
    rarity: "common",
    personality:
      "The heavy-cropping green gooseberry that shrugs off mildew. Tart when young (perfect for cooking), sweet enough to eat raw when fully ripe. The reliable one that fills your freezer and your crumble dishes.",
    recipes: [
      {
        name: "Gooseberry fool",
        description:
          "Stew the berries with sugar until they burst and go golden-green. Cool, then fold into softly whipped cream. Serve in glasses. Sharp, sweet, creamy — the most English pudding there is.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=invicta+gooseberry+bush" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=invicta+gooseberry+bush" },
    ],
  },
  {
    id: "gooseberries-hinnonmaki-red",
    cropSlug: "gooseberries",
    name: "Hinnonmaki Red",
    rarity: "uncommon",
    personality:
      "A Finnish variety with dark red berries that are sweet enough to eat straight off the bush. More disease-resistant than most, and the red colour means you know exactly when they're ripe. A dessert gooseberry in a world of cooking gooseberries.",
    recipes: [
      {
        name: "Gooseberry and elderflower jam",
        description:
          "Simmer red gooseberries with sugar and a generous splash of elderflower cordial to setting point. The floral sweetness of the elderflower meets the tartness of the fruit. Summer in a jar.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=hinnonmaki+red+gooseberry+bush" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=hinnonmaki+red+gooseberry+bush" },
    ],
  },
  {
    id: "gooseberries-leveller",
    cropSlug: "gooseberries",
    name: "Leveller",
    rarity: "rare",
    personality:
      "The show-bench gooseberry. Large, golden-yellow berries with a sweetness and flavour that wins competitions. More demanding to grow well — it wants rich soil and careful pruning — but the berries are in a different class. The gooseberry growers' gooseberry.",
    recipes: [
      {
        name: "Fresh gooseberries with sugar",
        description:
          "Top, tail, and eat the golden berries raw, dipped in caster sugar. When a gooseberry is this sweet and this flavourful, cooking it would be a crime. A bowl of these and a sunny afternoon is all you need.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=leveller+gooseberry+bush" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=leveller+gooseberry+bush" },
    ],
  },

  // ============================================================
  // BLACKCURRANTS
  // ============================================================
  {
    id: "blackcurrants-ben-sarek",
    cropSlug: "blackcurrants",
    name: "Ben Sarek",
    rarity: "common",
    personality:
      "Compact enough for a small garden, productive enough to keep you in jam and cassis all year. A Scottish-bred variety that handles frost, wind, and neglect. The blackcurrant for people who don't want to manage a hedge.",
    recipes: [
      {
        name: "Blackcurrant jam",
        description:
          "Simmer the berries until they burst, add sugar (equal weight), boil to setting point. The deep purple colour and intense flavour make this the jam that ruins all other jams. Toast will never be the same.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=ben+sarek+blackcurrant+bush" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=ben+sarek+blackcurrant+bush" },
    ],
  },
  {
    id: "blackcurrants-ben-connan",
    cropSlug: "blackcurrants",
    name: "Ben Connan",
    rarity: "uncommon",
    personality:
      "The biggest berries in the Ben series — easier to pick and sweeter to eat. Another Scottish warrior that shrugs off late frosts and keeps cropping reliably. If you only have room for one blackcurrant bush, this one makes a strong case.",
    recipes: [
      {
        name: "Cassis",
        description:
          "Crush the berries, macerate with sugar, add vodka, seal, and wait two months. Strain into bottles. Use a splash in champagne for Kir Royale, or sip neat. Deep, purple, and worth the patience.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=ben+connan+blackcurrant+bush" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=ben+connan+blackcurrant+bush" },
    ],
  },

  // ============================================================
  // REDCURRANTS
  // ============================================================
  {
    id: "redcurrants-jonkheer-van-tets",
    cropSlug: "redcurrants",
    name: "Jonkheer van Tets",
    rarity: "common",
    personality:
      "An early Dutch variety with long trusses of jewel-like red berries. The name is hard to pronounce but the currants are easy to grow. Heavy-cropping, reliable, and the translucent berries catch the light like stained glass.",
    recipes: [
      {
        name: "Redcurrant jelly",
        description:
          "Simmer the currants (no need to strip them from the stalks), strain through muslin, add sugar, boil to setting point. Crystal-clear, ruby-red, and the classic accompaniment to lamb. A jar of this is a gift.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=jonkheer+van+tets+redcurrant+bush" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=jonkheer+van+tets+redcurrant+bush" },
    ],
  },
  {
    id: "redcurrants-rovada",
    cropSlug: "redcurrants",
    name: "Rovada",
    rarity: "uncommon",
    personality:
      "Late-season with exceptionally long trusses that make picking easy and look spectacular hanging from the bush. The berries are firm and store well, giving you a longer window to deal with the harvest. The organised gardener's redcurrant.",
    recipes: [
      {
        name: "Summer pudding",
        description:
          "Layer redcurrants with other summer berries in a bread-lined pudding basin, weight down overnight. Turn out. The juices soak through the bread and dye it deep purple-red. The most dramatic pudding in the British repertoire.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=rovada+redcurrant+bush" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=rovada+redcurrant+bush" },
    ],
  },

  // ============================================================
  // RHUBARB
  // ============================================================
  {
    id: "rhubarb-timperley-early",
    cropSlug: "rhubarb",
    name: "Timperley Early",
    rarity: "common",
    personality:
      "The first rhubarb of the year, ready from February when the garden is still asleep. Thin, pink stems that pull easily and cook down into a sharp, bright compote. Named after a village in Cheshire, and it's been a reliable early starter for decades.",
    recipes: [
      {
        name: "Rhubarb compote",
        description:
          "Chop into chunks, bake with sugar and a splash of orange juice at 180C until just tender but still holding its shape. Spoon over porridge, yoghurt, or vanilla ice cream. The first taste of the growing year.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=timperley+early+rhubarb+crowns" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=timperley+early+rhubarb+crowns" },
    ],
  },
  {
    id: "rhubarb-victoria",
    cropSlug: "rhubarb",
    name: "Victoria",
    rarity: "common",
    personality:
      "The classic allotment rhubarb that produces thick, green-and-red stems all season long. Vigorous, reliable, and the one that fills pie dishes from April to July. Not the prettiest, but the most productive. Every allotment should have one.",
    recipes: [
      {
        name: "Rhubarb crumble",
        description:
          "Chop the stems, toss with sugar and a squeeze of orange, pile into a dish, top with a rubble of butter, flour, and demerara sugar. Bake until the fruit bubbles and the top is golden. Custard is not optional.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=victoria+rhubarb+crowns" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=victoria+rhubarb+crowns" },
    ],
  },
  {
    id: "rhubarb-champagne",
    cropSlug: "rhubarb",
    name: "Champagne",
    rarity: "legendary",
    personality:
      "The one the Yorkshire forcing sheds keep behind locked doors. Pale pink stems, barely any tartness, and it forces beautifully in the dark to produce the most tender, delicate rhubarb you'll ever taste. If you get this one, you've won.",
    recipes: [
      {
        name: "Poached champagne rhubarb",
        description:
          "Cut into elegant lengths, poach very gently in a light syrup of sugar, vanilla, and a strip of lemon peel until just tender. Serve with creme fraiche. The pale pink colour deepens to rose. Handle it like the precious thing it is.",
      },
      {
        name: "Rhubarb and custard tart",
        description:
          "Lay poached pink stems in a blind-baked pastry case, pour over a vanilla custard, bake until just set with a trembling centre. The pink rhubarb glows through the golden custard. Dessert of the year, every year.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=champagne+rhubarb+crowns" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=champagne+rhubarb+crowns" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=champagne+rhubarb+crowns" },
    ],
  },

  // ============================================================
  // ADDITIONAL VARIETIES FOR TARGET COUNTS
  // ============================================================

  // --- Extra broad beans ---
  {
    id: "broad-beans-super-aguadulce",
    cropSlug: "broad-beans",
    name: "Super Aguadulce",
    rarity: "uncommon",
    personality:
      "A bigger, more vigorous sibling of Aquadulce Claudia. Longer pods with more beans per pod, and the same excellent autumn-sowing hardiness. For when the classic just isn't enough.",
    recipes: [
      {
        name: "Broad bean and pecorino crostini",
        description:
          "Double-pod, blanch, crush half with olive oil and lemon. Spread on crostini, top with whole beans and shaved pecorino. An Italian aperitivo that tastes like spring.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=super+aguadulce+broad+beans" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=super+aguadulce+broad+beans" },
    ],
  },

  // --- Extra peas ---
  {
    id: "peas-alderman",
    cropSlug: "peas",
    name: "Alderman",
    rarity: "rare",
    personality:
      "A tall, heritage climbing pea from the 1890s that can reach 1.5 metres. The pods are long, the flavour is superb, and there's something deeply satisfying about growing a variety that Victorian gardeners prized. Needs serious support, but rewards the effort handsomely.",
    recipes: [
      {
        name: "Pea and lettuce braise",
        description:
          "Pod the peas, shred a Little Gem, soften spring onions in butter, add the peas and lettuce, a splash of stock, and braise gently for five minutes. A very English, very old-fashioned, very delicious way to eat peas.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=alderman+peas" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=alderman+peas" },
    ],
  },

  // --- Extra radishes ---
  {
    id: "radishes-sparkler",
    cropSlug: "radishes",
    name: "Sparkler",
    rarity: "common",
    personality:
      "Red on top, white on the bottom, and the kind of radish that makes children actually want to eat vegetables. Quick-growing and mild — perfect for the front of a border or a windowbox. The radish that sparks interest.",
    recipes: [
      {
        name: "Radish top pesto",
        description:
          "Don't throw away the leaves. Blitz radish tops with garlic, parmesan, pine nuts, and olive oil. Peppery, fresh, and proof that the best bit of the radish might be the bit everyone discards.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=sparkler+radishes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=sparkler+radishes" },
    ],
  },

  // --- Extra carrots ---
  {
    id: "carrots-resistafly",
    cropSlug: "carrots",
    name: "Resistafly",
    rarity: "uncommon",
    personality:
      "Bred to resist carrot fly, which is the single biggest headache in carrot growing. The clue is in the name, and it delivers. Good-flavoured Nantes-type roots that you can grow without fleece, without barriers, without paranoia.",
    recipes: [
      {
        name: "Carrot and ginger stir-fry",
        description:
          "Julienne the carrots, stir-fry in sesame oil with grated ginger, a splash of soy sauce, and a sprinkle of sesame seeds. Done in three minutes. Crunchy, bright, and the carrots taste like carrots.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=resistafly+carrots" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=resistafly+carrots" },
    ],
  },

  // --- Extra beetroot ---
  {
    id: "beetroot-golden",
    cropSlug: "beetroot",
    name: "Golden",
    rarity: "uncommon",
    personality:
      "All the sweetness of beetroot, none of the staining. Golden-yellow flesh that won't turn your chopping board, your hands, or your entire kitchen pink. A revelation for people who love beetroot flavour but hate the aftermath.",
    recipes: [
      {
        name: "Golden beetroot and orange salad",
        description:
          "Roast until tender, slice into rounds, arrange with orange segments and a scattering of toasted hazelnuts. Dress with a honey and sherry vinegar vinaigrette. Sunshine-coloured and unstaining.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=golden+beetroot" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=golden+beetroot" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=golden+beetroot" },
    ],
  },

  // --- Extra early potatoes ---
  {
    id: "early-potatoes-jazzy",
    cropSlug: "early-potatoes",
    name: "Jazzy",
    rarity: "uncommon",
    personality:
      "A waxy salad potato that chefs grow tiny for maximum flavour intensity. L'Enclume in Cartmel serve these as the most perfect little potatoes you've ever eaten. Grow them close together, harvest small, and prepare to be astonished by how much flavour fits in something so little.",
    recipes: [
      {
        name: "Tiny roasted potatoes",
        description:
          "Harvest small, toss whole with olive oil, crushed garlic, and rosemary. Roast until the skins are crisp and the insides are creamy. Eat hot with flaky salt. Looks like a restaurant plate, tastes like a garden.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=jazzy+seed+potatoes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=jazzy+seed+potatoes" },
    ],
  },

  // --- Extra kale ---
  {
    id: "kale-nero-di-toscana",
    cropSlug: "kale",
    name: "Nero di Toscana",
    rarity: "uncommon",
    personality:
      "The same as Cavolo Nero's close cousin — tall, dark, and handsome with strap-like leaves that look architectural in the winter garden. Slightly different seed stock to standard Cavolo Nero, often with a more pronounced savoy texture.",
    recipes: [
      {
        name: "Kale and sausage pasta",
        description:
          "Strip the dark leaves, fry with broken-up Italian sausage, garlic, and chilli. Toss with orecchiette and a splash of pasta water. Hearty, quick, and the dark leaves look beautiful against the golden sausage.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=nero+di+toscana+kale" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=nero+di+toscana+kale" },
    ],
  },

  // --- Extra leeks ---
  {
    id: "leeks-blue-solaise",
    cropSlug: "leeks",
    name: "Blue Solaise",
    rarity: "rare",
    personality:
      "A French heritage variety that turns blue-purple in cold weather. Extremely winter-hardy with a sweet, delicate flavour that's more refined than most leeks. Originally from the Solaise region near Lyon, and it looks as though it belongs in a French kitchen garden.",
    recipes: [
      {
        name: "Leek flamiche",
        description:
          "Soften sliced blue leeks in butter, spread in a pastry-lined tin, pour over a rich custard of eggs and cream, and bake until golden and just set. The classic Flemish leek tart, elevated by the sweetness of this heritage variety.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=blue+solaise+leeks" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=blue+solaise+leeks" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=blue+solaise+leeks" },
    ],
  },

  // --- Extra cabbage ---
  {
    id: "cabbage-savoy-vertus",
    cropSlug: "cabbage",
    name: "Savoy Vertus",
    rarity: "common",
    personality:
      "Crinkled, dark green, and extremely frost-hardy. The savoy texture means the leaves hold sauces and dressings in their wrinkles. A winter staple that improves after frost and looks magnificent in a cold-weather garden.",
    recipes: [
      {
        name: "Savoy cabbage parcels",
        description:
          "Blanch whole leaves, wrap around a filling of rice, minced pork, herbs, and tomato. Nestle in a roasting tin, pour over stock, and braise slowly until the parcels are tender and the sauce has thickened. Eastern European comfort food.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=savoy+vertus+cabbage" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=savoy+vertus+cabbage" },
    ],
  },

  // --- Extra cauliflower ---
  {
    id: "cauliflower-romanesco",
    cropSlug: "cauliflower",
    name: "Romanesco",
    rarity: "rare",
    personality:
      "Lime-green fractal spirals that look like they were designed by a mathematician. Technically a cauliflower, aesthetically a work of art, and the flavour is nuttier and sweeter than white cauliflower. The vegetable that makes non-gardeners do a double take.",
    recipes: [
      {
        name: "Roasted romanesco with brown butter and capers",
        description:
          "Break into florets, roast until the tips are golden and crispy. Make brown butter in a pan, add capers and a squeeze of lemon. Drizzle over. The fractal tips catch the butter perfectly.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=romanesco+cauliflower" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=romanesco+cauliflower" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=romanesco+cauliflower" },
    ],
  },

  // --- Extra brussels sprouts ---
  {
    id: "brussels-sprouts-flower-sprouts",
    cropSlug: "brussels-sprouts",
    name: "Flower Sprouts",
    rarity: "rare",
    personality:
      "A cross between brussels sprouts and kale that produces open, frilly, purple-green rosettes instead of tight buttons. Milder flavour than sprouts, prettier than kale, and genuinely converts sprout-haters. A modern innovation that actually works.",
    recipes: [
      {
        name: "Stir-fried flower sprouts",
        description:
          "Halve if large, toss into a hot wok with sesame oil, soy sauce, and a pinch of chilli flakes. The frilly edges crisp up while the centres stay tender. A side dish that looks like it belongs on a fancy tasting menu.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=flower+sprouts" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=flower+sprouts" },
    ],
  },

  // --- Extra garlic ---
  {
    id: "garlic-sprint",
    cropSlug: "garlic",
    name: "Sprint",
    rarity: "common",
    personality:
      "A spring-planting softneck for anyone who forgot to plant garlic in autumn. Not as big as autumn-planted types, but it solves the problem of 'I meant to plant garlic last October and completely forgot.' We've all been there.",
    recipes: [
      {
        name: "Garlic bread",
        description:
          "Crush the cloves into softened butter with parsley and a pinch of salt. Slash a baguette, stuff with the butter, wrap in foil, bake until the butter melts into every crevice. The side dish that's really the main event.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=sprint+garlic+bulbs" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=sprint+garlic+bulbs" },
    ],
  },

  // --- Extra squash ---
  {
    id: "squash-spaghetti",
    cropSlug: "squash",
    name: "Spaghetti Squash",
    rarity: "uncommon",
    personality:
      "Cut it open after roasting and the flesh falls apart into spaghetti-like strands that blow children's minds every single time. Not the most flavourful squash on its own, but as a vehicle for sauce, pesto, or butter, it's endlessly entertaining.",
    recipes: [
      {
        name: "Spaghetti squash with pesto",
        description:
          "Halve, scoop out seeds, roast cut-side down until tender. Fork out the strands, toss with pesto, parmesan, and pine nuts. Kids think it's magic. Adults agree.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=spaghetti+squash" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=spaghetti+squash" },
    ],
  },

  // --- Extra pumpkins ---
  {
    id: "pumpkins-small-sugar",
    cropSlug: "pumpkins",
    name: "Small Sugar",
    rarity: "common",
    personality:
      "The proper pie pumpkin. Small, sweet, dense-fleshed, and bred for eating rather than carving. A single pumpkin is enough for a pie, and the compact plant size means you can actually grow it in a normal garden.",
    recipes: [
      {
        name: "Pumpkin pie",
        description:
          "Roast the flesh, puree, mix with eggs, cream, cinnamon, ginger, and nutmeg, pour into a pastry case and bake until just set. The dense, sweet flesh of Small Sugar makes this a proper pie rather than a watery disappointment.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=small+sugar+pumpkins" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=small+sugar+pumpkins" },
    ],
  },

  // --- Extra courgettes ---
  {
    id: "courgettes-golden-zucchini",
    cropSlug: "courgettes",
    name: "Golden Zucchini",
    rarity: "uncommon",
    personality:
      "Bright yellow courgettes that are easier to spot among the foliage — which means fewer marrows hiding under leaves and frightening you in August. Slightly nuttier flavour than green varieties, and they look stunning sliced into rounds.",
    recipes: [
      {
        name: "Golden courgette and goat's cheese tart",
        description:
          "Slice into rounds, arrange overlapping on puff pastry with goat's cheese and thyme. Bake until the pastry is golden and the courgettes have caramelised at the edges. The yellow rounds look like gold coins.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=golden+zucchini+courgettes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=golden+zucchini+courgettes" },
    ],
  },

  // --- Extra french beans ---
  {
    id: "french-beans-beurre-de-rocquencourt",
    cropSlug: "french-beans",
    name: "Beurre de Rocquencourt",
    rarity: "rare",
    personality:
      "A golden-yellow French wax bean with a buttery texture and a name that's more fun to say than any other vegetable variety. The yellow pods are easier to spot for picking, and the waxy texture is completely different from green beans — silky, rich, and very French.",
    recipes: [
      {
        name: "Yellow beans with tarragon",
        description:
          "Boil the golden pods until just tender, drain, and dress warm with butter, fresh tarragon, and a squeeze of lemon. The yellow beans and pale green tarragon look beautiful together. Très elegant.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=beurre+de+rocquencourt+french+beans" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=beurre+de+rocquencourt+french+beans" },
    ],
  },

  // --- Extra fennel ---
  {
    id: "fennel-zefa-fino",
    cropSlug: "fennel",
    name: "Zefa Fino",
    rarity: "common",
    personality:
      "Swiss-bred for bolt resistance and reliable bulb formation. Round, white bulbs with a clean anise flavour. If you've tried growing fennel before and it bolted before bulbing, this is the one to try next. It actually wants to form a bulb.",
    recipes: [
      {
        name: "Fennel, blood orange, and olive salad",
        description:
          "Shave the bulb paper-thin, arrange with blood orange segments and black olives. Dress with olive oil and a pinch of salt. A Sicilian winter salad that brightens everything around it.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=zefa+fino+fennel" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=zefa+fino+fennel" },
    ],
  },

  // --- Extra celery ---
  {
    id: "celery-golden-self-blanching",
    cropSlug: "celery",
    name: "Golden Self-Blanching",
    rarity: "uncommon",
    personality:
      "Pale golden stems that blanch themselves without earthing up. Milder and sweeter than green celery, with a delicate flavour that works beautifully raw. The elegant celery — less crunch, more finesse.",
    recipes: [
      {
        name: "Celery, apple, and stilton salad",
        description:
          "Slice the golden sticks thinly, toss with crisp apple, crumbled stilton, walnuts, and a light lemon dressing. The mild celery lets the cheese and apple shine. A Boxing Day lunch essential.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=golden+self+blanching+celery" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=golden+self+blanching+celery" },
    ],
  },

  // --- Extra pak choi ---
  {
    id: "pak-choi-canton-dwarf",
    cropSlug: "pak-choi",
    name: "Canton Dwarf",
    rarity: "common",
    personality:
      "Tiny, compact pak choi that's ready in about a month. Perfect for windowsills, containers, and impatient cooks. The whole plant fits in the palm of your hand and cooks in about thirty seconds.",
    recipes: [
      {
        name: "Baby pak choi in garlic and ginger",
        description:
          "Leave whole, sear in a hot wok, add sliced garlic and grated ginger, a splash of soy sauce. The baby heads cook in under a minute. Quick, fragrant, and the whole thing looks like a miniature garden on your plate.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=canton+dwarf+pak+choi" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=canton+dwarf+pak+choi" },
    ],
  },

  // --- Extra peppers ---
  {
    id: "peppers-marconi-rosso",
    cropSlug: "peppers",
    name: "Marconi Rosso",
    rarity: "rare",
    personality:
      "A long, tapered Italian pepper that ripens to brilliant red and has a sweetness that you only get from properly vine-ripened peppers. The walls are thin enough to char on a griddle and the flavour is concentrated rather than watery. The one Italian gardeners grow.",
    recipes: [
      {
        name: "Peperonata",
        description:
          "Slice the long peppers, slow-cook with onions, garlic, and tomatoes in olive oil until everything collapses into a sweet, jammy stew. Serve warm on bread, cold as a side, or stirred through pasta. Gets better the day after.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=marconi+rosso+pepper+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=marconi+rosso+pepper+seeds" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=marconi+rosso+pepper+seeds" },
    ],
  },

  // --- Extra chillies ---
  {
    id: "chillies-hungarian-hot-wax",
    cropSlug: "chillies",
    name: "Hungarian Hot Wax",
    rarity: "common",
    personality:
      "Starts yellow, ripens through orange to red, and the heat is moderate — enough to warm but not to punish. The waxy flesh is thick and perfect for stuffing. An excellent first chilli for cautious growers who don't want to play roulette with their dinner.",
    recipes: [
      {
        name: "Stuffed hot wax peppers",
        description:
          "Halve lengthways, stuff with a mixture of cream cheese, herbs, and a little garlic. Grill until the cheese melts and the pepper softens. Mild enough to eat like a snack, warm enough to know it's a chilli.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=hungarian+hot+wax+chillies" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=hungarian+hot+wax+chillies" },
    ],
  },

  // --- Extra cucumbers ---
  {
    id: "cucumbers-beth-alpha",
    cropSlug: "cucumbers",
    name: "Beth Alpha",
    rarity: "uncommon",
    personality:
      "A Middle Eastern variety with small, smooth, thin-skinned cucumbers that are perfect for eating whole. Grows well in cooler conditions than most, and the thin skin means no peeling. The cucumber for people who actually want to eat the skin.",
    recipes: [
      {
        name: "Fattoush",
        description:
          "Chunk the small cucumbers, toss with tomatoes, radish, mint, parsley, fried pitta shards, sumac, and a lemony dressing. The thin-skinned cucumbers absorb the dressing beautifully. A Middle Eastern salad that puts all other salads to shame.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=beth+alpha+cucumbers" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=beth+alpha+cucumbers" },
    ],
  },

  // --- Extra tomatoes ---
  {
    id: "tomatoes-san-marzano",
    cropSlug: "tomatoes",
    name: "San Marzano",
    rarity: "uncommon",
    personality:
      "The plum tomato that Neapolitans use for pizza sauce and nothing else will do. Meaty, low in seeds, and with a balanced sweetness that concentrates when cooked. Needs a warm spot in the UK, but if you grow it, you'll never buy tinned tomatoes the same way again.",
    recipes: [
      {
        name: "Pizza sauce",
        description:
          "Crush the tomatoes by hand (a blender makes it too smooth), add a drizzle of olive oil, a pinch of salt, and a torn basil leaf. That's it. Uncooked. The San Marzano does the work. This is how Naples does it.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=san+marzano+tomato+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=san+marzano+tomato+seeds" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=san+marzano+tomato+seeds" },
    ],
  },

  // --- Extra runner beans ---
  {
    id: "runner-beans-achievement",
    cropSlug: "runner-beans",
    name: "Achievement",
    rarity: "common",
    personality:
      "A heritage variety from 1906 that produces long, straight, stringless pods. The name is apt — growing a row of these feels like an achievement, and the flavour is sweeter and more tender than modern varieties. Sometimes old is gold.",
    recipes: [
      {
        name: "Runner beans on toast",
        description:
          "Slice finely, blanch until just tender, toss in butter with a crack of pepper and a squeeze of lemon. Pile onto hot buttered toast. The most underrated lunch in Britain.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=achievement+runner+beans" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=achievement+runner+beans" },
    ],
  },

  // --- Extra strawberries ---
  {
    id: "strawberries-elsanta",
    cropSlug: "strawberries",
    name: "Elsanta",
    rarity: "common",
    personality:
      "The most widely grown commercial strawberry in the UK, and there's a reason for that — it's productive, disease-resistant, and the berries are firm and glossy. Not the most complex flavour, but it delivers quantity and reliability. The safe pair of hands.",
    recipes: [
      {
        name: "Strawberry smoothie",
        description:
          "Blitz fresh berries with yoghurt, a drizzle of honey, and a splash of milk. Pour into a glass. The firmness of Elsanta berries means a thick, satisfying smoothie rather than a watery one.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=elsanta+strawberry+plants" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=elsanta+strawberry+plants" },
    ],
  },

  // --- Extra raspberries ---
  {
    id: "raspberries-tulameen",
    cropSlug: "raspberries",
    name: "Tulameen",
    rarity: "uncommon",
    personality:
      "Large, conical berries with an intense raspberry flavour that's often described as the best-tasting raspberry available. A summer-fruiter from Canada that does well in UK conditions and produces berries so flavourful they make you question every raspberry you've eaten before.",
    recipes: [
      {
        name: "Raspberry sorbet",
        description:
          "Blitz berries with sugar syrup and a squeeze of lemon, churn in an ice cream maker or still-freeze, breaking up the crystals every hour. The intensity of Tulameen means the flavour survives freezing. Purple-red and pure.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=tulameen+raspberry+canes" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=tulameen+raspberry+canes" },
    ],
  },

  // --- Extra blackcurrants ---
  {
    id: "blackcurrants-big-ben",
    cropSlug: "blackcurrants",
    name: "Big Ben",
    rarity: "uncommon",
    personality:
      "Berries twice the size of most blackcurrants, sweet enough to eat raw off the bush, which is something you can't say about many blackcurrants. A modern Scottish variety that makes picking less tedious and eating more enjoyable.",
    recipes: [
      {
        name: "Blackcurrant crumble",
        description:
          "Tumble the big berries into a dish with a sprinkling of sugar, top with a buttery oat crumble, bake until bubbling and golden. The tartness cuts through the sweet topping. Serve with vanilla custard.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=big+ben+blackcurrant+bush" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=big+ben+blackcurrant+bush" },
    ],
  },

  // --- Extra gooseberries ---
  {
    id: "gooseberries-pax",
    cropSlug: "gooseberries",
    name: "Pax",
    rarity: "common",
    personality:
      "Thornless red gooseberry that finally makes picking a pleasure instead of a blood sport. The berries are sweet enough for dessert and the bush doesn't fight back when you reach in. Modern breeding solving a problem that's annoyed gardeners for centuries.",
    recipes: [
      {
        name: "Gooseberry crumble",
        description:
          "Top, tail, and toss the red berries with sugar and a splash of elderflower cordial. Top with a crumble of flour, butter, oats, and demerara sugar. Bake until golden and bubbling. The classic treatment for a classic berry.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=pax+gooseberry+bush" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=pax+gooseberry+bush" },
    ],
  },

  // --- Extra rhubarb ---
  {
    id: "rhubarb-glaskins-perpetual",
    cropSlug: "rhubarb",
    name: "Glaskin's Perpetual",
    rarity: "uncommon",
    personality:
      "The only rhubarb you can grow from seed and pull in the first year. Less intensely flavoured than crown-grown varieties, but the speed is the point — sow in spring, eat by autumn. For impatient rhubarb lovers (which is all rhubarb lovers, really).",
    recipes: [
      {
        name: "Rhubarb gin",
        description:
          "Chop the stems, pack into a jar with sugar, top with gin, seal, and shake every day for a month. Strain. The gin turns a gorgeous deep pink and tastes of sharp, sweet, British summer. Better than sloe gin. There, I said it.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=glaskins+perpetual+rhubarb+crowns" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=glaskins+perpetual+rhubarb+crowns" },
    ],
  },

  // --- Extra parsnips ---
  {
    id: "parsnips-hollow-crown",
    cropSlug: "parsnips",
    name: "Hollow Crown",
    rarity: "rare",
    personality:
      "A heritage variety dating back centuries, named for the depression around the crown of each root. Long, tapering, with a complex, sweet flavour that modern varieties have smoothed away. The parsnip your great-great-grandparents would recognise. Wants deep soil and patience, but repays both generously.",
    recipes: [
      {
        name: "Parsnip and apple soup",
        description:
          "Sweat onion, add chunked parsnips and a cooking apple, stock, and a splash of cream. Simmer until soft, blitz smooth. The apple lightens the sweetness of the heritage parsnip. Finish with a drizzle of truffle oil if you're feeling flash.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=hollow+crown+parsnips" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=hollow+crown+parsnips" },
    ],
  },

  // --- Extra turnips ---
  {
    id: "turnips-oasis",
    cropSlug: "turnips",
    name: "Oasis",
    rarity: "uncommon",
    personality:
      "A Japanese salad turnip that's mild, sweet, and best eaten raw like a crunchy apple. White, smooth-skinned, and nothing like the woody turnips that put you off as a child. This is the turnip that changes minds.",
    recipes: [
      {
        name: "Japanese-style turnip salad",
        description:
          "Slice paper-thin, toss with rice vinegar, a pinch of salt, a scatter of nori flakes, and a drizzle of sesame oil. The crunch and sweetness is remarkable. Turnip as salad hero, not boiled afterthought.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=oasis+turnips" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=oasis+turnips" },
    ],
  },

  // --- Extra onion sets ---
  {
    id: "onion-sets-setton",
    cropSlug: "onion-sets",
    name: "Setton",
    rarity: "common",
    personality:
      "A golden onion that stores longer than almost any other variety — well into spring of the following year. Round, firm, and with a strong flavour that mellows beautifully when cooked. The choice for anyone who wants to be self-sufficient in onions.",
    recipes: [
      {
        name: "Caramelised onion chutney",
        description:
          "Slice thin, cook very slowly in butter and a splash of vinegar with sugar, thyme, and bay. Stir occasionally for an hour until dark, sticky, and sweet. Pot it up. Goes with everything from cheese to cold cuts.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=setton+onion+sets" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=setton+onion+sets" },
    ],
  },

  // --- Extra spring onions ---
  {
    id: "spring-onions-north-holland-blood-red",
    cropSlug: "spring-onions",
    name: "North Holland Blood Red",
    rarity: "rare",
    personality:
      "Deep crimson skin that runs almost the full length of the stem. A heritage Dutch variety that's as much about colour as flavour — though the flavour is sweet and mild too. Makes every salad, every stir-fry, and every garnish more interesting.",
    recipes: [
      {
        name: "Blood red spring onion kimchi",
        description:
          "Slice into lengths, toss with gochugaru, fish sauce, garlic, ginger, and a pinch of sugar. Pack into a jar and ferment for a few days. The crimson deepens, the flavour intensifies. Quick kimchi with maximum visual impact.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=north+holland+blood+red+spring+onions" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=north+holland+blood+red+spring+onions" },
    ],
  },

  // --- Extra swiss chard ---
  {
    id: "swiss-chard-white-silver",
    cropSlug: "swiss-chard",
    name: "White Silver",
    rarity: "uncommon",
    personality:
      "The classic green-and-white chard with the broadest, thickest white stems. Less flashy than Bright Lights, but the stems are meatier and cook like a separate vegetable entirely. The workhorse chard for serious cooks.",
    recipes: [
      {
        name: "Chard stem gratin",
        description:
          "Cut the thick white stems into batons, blanch until just tender, lay in a dish with bechamel and gruyere. Bake until golden and bubbling. Use the green leaves in something else. Two vegetables from one plant.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=white+silver+swiss+chard" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=white+silver+swiss+chard" },
    ],
  },

  // --- Extra broccoli ---
  {
    id: "broccoli-burgundy",
    cropSlug: "broccoli",
    name: "Burgundy",
    rarity: "rare",
    personality:
      "Deep purple sprouting broccoli that's even more beautiful than the standard purple. Later-maturing, so it fills the gap in March and April when the garden is waking up but not yet productive. The colour holds through cooking better than you'd expect.",
    recipes: [
      {
        name: "Purple broccoli with hollandaise",
        description:
          "Steam the purple spears until just tender, serve with a classic hollandaise — butter, egg yolks, lemon juice, whisked over heat until thick and glossy. The purple against the golden sauce is stunning. Spring luxury.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=burgundy+broccoli" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=burgundy+broccoli" },
    ],
  },

  // --- Extra spinach ---
  {
    id: "spinach-medania",
    cropSlug: "spinach",
    name: "Medania",
    rarity: "uncommon",
    personality:
      "Round, dark green leaves and genuinely good bolt resistance for a true spinach. One of the best for summer growing, when most spinach varieties are already sulking in the heat and making a run for it.",
    recipes: [
      {
        name: "Creamed spinach",
        description:
          "Wilt a mountain of leaves, squeeze dry, chop roughly. Stir into a sauce of butter, garlic, cream, and a grating of nutmeg. Rich, silky, and the side dish that steakhouses get right. Make it at home and make it better.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=medania+spinach" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=medania+spinach" },
    ],
  },

  // --- Extra lettuce ---
  {
    id: "lettuce-red-oakleaf",
    cropSlug: "lettuce",
    name: "Red Oakleaf",
    rarity: "uncommon",
    personality:
      "Oak-shaped leaves in deep burgundy that look like they belong in a painting. Pick-and-come-again for months, and the colour deepens as the season goes on. Makes any salad look like a restaurant plate.",
    recipes: [
      {
        name: "Red oakleaf with warm goat's cheese",
        description:
          "Arrange the burgundy leaves on a plate, top with rounds of goat's cheese grilled until golden. Drizzle with honey and scatter with toasted walnuts. The bitterness of the red leaves balances the sweet cheese perfectly.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=red+oakleaf+lettuce" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=red+oakleaf+lettuce" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=red+oakleaf+lettuce" },
    ],
  },

  // --- Extra redcurrants ---
  {
    id: "redcurrants-stanza",
    cropSlug: "redcurrants",
    name: "Stanza",
    rarity: "uncommon",
    personality:
      "A late-season variety that fruits well into August when other redcurrants are finished. Heavy-cropping with good-sized berries, and the late timing means you can extend the soft fruit season by several weeks. The patient one.",
    recipes: [
      {
        name: "Redcurrant sauce for lamb",
        description:
          "Simmer redcurrants with a little sugar and a splash of port until the berries burst and the sauce thickens. Strain or leave whole. The classic British accompaniment to roast lamb — sharp, sweet, and a stunning deep red.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=stanza+redcurrant+bush" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=stanza+redcurrant+bush" },
    ],
  },

  // --- Extra dill ---
  {
    id: "dill-bouquet",
    cropSlug: "dill",
    name: "Bouquet",
    rarity: "common",
    personality:
      "Compact and bushy with dense feathery foliage — more leaf per plant than taller varieties. Good for containers and windowsills. The dill for people who want fresh dill close at hand without giving over an entire bed to it.",
    recipes: [
      {
        name: "Dill sauce for salmon",
        description:
          "Mix finely chopped dill with sour cream, a squeeze of lemon, a grating of horseradish, and a pinch of salt. Serve alongside poached or grilled salmon. The sauce that makes fish feel Scandinavian.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=bouquet+dill" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=bouquet+dill" },
    ],
  },

  // --- Extra coriander ---
  {
    id: "coriander-confetti",
    cropSlug: "coriander",
    name: "Confetti",
    rarity: "rare",
    personality:
      "Finely cut, feathery leaves that look like a cross between coriander and dill. The flavour is milder and less polarising than standard coriander — even people who usually find it soapy often enjoy Confetti. A diplomatic herb.",
    recipes: [
      {
        name: "Thai-style coriander salad",
        description:
          "Toss the feathery leaves with shredded green papaya, peanuts, dried shrimp, lime juice, fish sauce, and sugar. The delicate leaves wilt less than broad-leaf varieties and look beautiful scattered over the top.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=confetti+coriander" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=confetti+coriander" },
    ],
  },

  // --- Extra parsley ---
  {
    id: "parsley-envy",
    cropSlug: "parsley",
    name: "Envy",
    rarity: "uncommon",
    personality:
      "A curly parsley with unusually dark green, tightly curled leaves that hold up well in cooking and on the plate. More vigorous than Moss Curled and with better colour retention. The parsley for people who take their garnishing seriously.",
    recipes: [
      {
        name: "Chimichurri",
        description:
          "Finely chop the curly parsley with garlic, oregano, red wine vinegar, chilli flakes, and olive oil. Let it sit for an hour. Spoon over grilled steak, lamb, or roasted vegetables. The Argentinian sauce that makes everything better.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=envy+parsley" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=envy+parsley" },
    ],
  },

  // --- Extra basil ---
  {
    id: "basil-greek",
    cropSlug: "basil",
    name: "Greek Basil",
    rarity: "common",
    personality:
      "Tiny leaves on a compact, mound-shaped plant that looks like a tidy green dome. Intense flavour packed into small leaves, and the bushy shape means it doesn't go leggy and sad like Genovese often does. The basil for windowsills and pots.",
    recipes: [
      {
        name: "Greek salad with basil",
        description:
          "Chunk tomatoes, cucumber, and pepper. Add olives, feta, red onion. Dress with olive oil, lemon juice, and torn Greek basil leaves. The small leaves scatter beautifully over the top and the compact flavour is intense.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=greek+basil" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=greek+basil" },
    ],
  },

  // --- Extra aubergine ---
  {
    id: "aubergine-moneymaker",
    cropSlug: "aubergine",
    name: "Moneymaker",
    rarity: "common",
    personality:
      "An early-maturing variety bred for cooler climates — which is code for 'actually ripens in Britain.' Smaller fruits than Black Beauty, but you'll get more of them. The aubergine that doesn't make you beg for a heatwave.",
    recipes: [
      {
        name: "Aubergine curry",
        description:
          "Cube, fry until golden, then simmer in a sauce of tomatoes, onion, ginger, garlic, cumin, coriander, and turmeric. The aubergine absorbs the spices like a sponge. Serve with rice and naan. Comfort food with depth.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=moneymaker+aubergine" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=moneymaker+aubergine" },
    ],
  },

  // --- Legendary: Heritage carrot ---
  {
    id: "carrots-jaune-du-doubs",
    cropSlug: "carrots",
    name: "Jaune du Doubs",
    rarity: "legendary",
    personality:
      "A golden-yellow French heritage carrot from the Doubs region near the Swiss border. Before the Dutch bred carrots orange in the 17th century, this is what carrots looked like. The flavour is sweeter and more complex than orange varieties — almost honey-like. Growing this is growing a piece of food history.",
    recipes: [
      {
        name: "Heritage carrot salad",
        description:
          "Grate the golden carrots, dress with orange blossom water, a squeeze of lemon, a drizzle of honey, and a scatter of toasted pistachios. The golden colour against the green pistachios is stunning. A Moroccan-inspired celebration of an ancient vegetable.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=jaune+du+doubs+carrot+seeds" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=jaune+du+doubs+carrot+seeds" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=jaune+du+doubs+carrot+seeds" },
    ],
  },

  // --- Legendary: Purple sprouting broccoli heritage ---
  {
    id: "broccoli-nine-star-perennial",
    cropSlug: "broccoli",
    name: "Nine Star Perennial",
    rarity: "legendary",
    personality:
      "A perennial broccoli that comes back year after year, producing clusters of creamy-white cauliflower-like heads each spring. Plant it once, harvest for up to five years. The holy grail of low-effort brassica growing. Nearly disappeared from seed catalogues before heritage seed savers rescued it.",
    recipes: [
      {
        name: "Nine star heads with brown butter",
        description:
          "Steam the cream-coloured heads until just tender, serve with brown butter, toasted almonds, and a squeeze of lemon. The flavour is somewhere between broccoli and cauliflower — delicate, nutty, and unique. A taste you can't buy anywhere.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=nine+star+perennial+broccoli" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=nine+star+perennial+broccoli" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=nine+star+perennial+broccoli" },
    ],
  },

  // --- Legendary: Heritage strawberry ---
  {
    id: "strawberries-white-alpine",
    cropSlug: "strawberries",
    name: "White Alpine",
    rarity: "legendary",
    personality:
      "Tiny, white, woodland strawberries with a flavour so intensely perfumed it's almost tropical — pineapple and vanilla and something you can't quite place. The berries are the size of your little fingertip, and you'll eat them one at a time, slowly, in disbelief. Birds ignore them because they never turn red. The secret strawberry.",
    recipes: [
      {
        name: "White alpine strawberries with cream",
        description:
          "Place a small handful in a bowl. Pour over a little cold cream. Eat very slowly. That's it. When something is this extraordinary, the recipe is restraint.",
      },
    ],
    seedSuppliers: [
      { name: "Thompson & Morgan", url: "https://www.thompson-morgan.com/search?q=white+alpine+strawberry+plants" },
      { name: "Suttons", url: "https://www.suttons.co.uk/search?q=white+alpine+strawberry+plants" },
      { name: "Sarah Raven", url: "https://www.sarahraven.com/search?q=white+alpine+strawberry+plants" },
    ],
  },
];

export function getVarietiesForCrop(cropSlug: string): Variety[] {
  return varieties.filter((v) => v.cropSlug === cropSlug);
}

export function getVarietyById(id: string): Variety | undefined {
  return varieties.find((v) => v.id === id);
}

export function getCropSlugsWithVarieties(): string[] {
  return [...new Set(varieties.map((v) => v.cropSlug))];
}
