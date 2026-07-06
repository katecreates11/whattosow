/**
 * Crop playbooks — the depth layer that turns a crop page from a data sheet
 * into the definitive guide: the season step by step, what goes wrong and how
 * to fix it, the questions people actually ask, and where to read deeper.
 *
 * Additive by design: pages render each section only when the crop has one,
 * so we can roll this out crop by crop (tomatoes first) without touching
 * crops.ts or breaking the other 47 pages. Write everything in the What To
 * Sow voice — gentle, beside the reader, weather-first. `buy` links render
 * through AffiliateLink (tracked, rel=sponsored); keep them to moments where
 * the thing genuinely solves the step's problem.
 */

export interface PlaybookImage {
  src: string;
  alt: string;
  /** Diary-style mono caption — "early June · staked, marigolds on the edge". */
  caption?: string;
}

export interface CareStep {
  /** When, in plain months — "May", "June to September". Rendered as the mono label. */
  period: string;
  title: string;
  text: string;
  /** Our own photo of this stage — the thing no competitor has. */
  image?: PlaybookImage;
  /** Optional internal link, rendered after the text. */
  link?: { href: string; label: string };
  /** Optional affiliate buy-point for this step (via AffiliateLink). */
  buy?: { href: string; product: string; label: string };
}

export interface CropProblem {
  name: string;
  /** How you spot it. */
  spot: string;
  /** What to do about it — always end facing forward. */
  fix: string;
  link?: { href: string; label: string };
}

export interface CropFaq {
  q: string;
  a: string;
}

export interface CropPlaybook {
  /**
   * Natural name for titles/H1 when crops.ts's name reads oddly there
   * (e.g. "Potatoes (maincrop)" → "Maincrop Potatoes"). Title case;
   * the H1 lowercases it.
   */
  titleName?: string;
  care: CareStep[];
  problems: CropProblem[];
  /** One photo to open the problems section — honesty looks better with evidence. */
  problemsImage?: PlaybookImage;
  faq: CropFaq[];
  /** Deeper reading — the crop's satellite guides. */
  guides?: { href: string; title: string; blurb: string }[];
}

const asin = (id: string) => `https://www.amazon.co.uk/dp/${id}`;
const az = (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}`;

export const cropPlaybooks: Record<string, CropPlaybook> = {
  tomatoes: {
    care: [
      {
        period: "Late February to early April",
        title: "Sow indoors, somewhere warm",
        text: "Tomatoes start on a windowsill, not in the ground — they need warmth (18–21°C) to germinate and a long run-up to fruit in a British summer. Sow two seeds to a module, thin to the strongest, and resist the itch to start too early: a March sowing nearly always overtakes a January one, because light, not time, is what seedlings are short of. Your exact dates are worked out above from your postcode.",
        image: {
          src: "/photos/crops/tomato-seedlings-tray.webp",
          alt: "Tomato seedlings coming up in a module tray on the windowsill",
          caption: "march · the whole summer, one seed tray",
        },
      },
      {
        period: "April",
        title: "Pot on, and plant them deep",
        text: "When the first true leaves appear (the serrated ones, after the seed leaves), move each seedling to its own pot — and here's the tomato's party trick: bury the stem right up to those first leaves. The buried stem grows roots along its whole length, and you get a sturdier, thirst-proof plant for free. Keep them somewhere bright and turn them every day or two so they grow straight.",
        image: {
          src: "/photos/blog/tomato-seedlings-pots.webp",
          alt: "Tomato seedlings potted on into individual pots, buried deep to the first leaves",
          caption: "april · potted on, buried up to the first leaves",
        },
      },
      {
        period: "May",
        title: "Harden off, then plant out after the last frost",
        text: "One cold night undoes eight weeks of care, so wait for your frost date (above) and spend the week before it hardening them off — days outside, nights back in. Then plant into your sunniest, most sheltered spot, again burying deep, and get the support in on planting day; driving a cane in later tears the roots you just grew.",
        image: {
          src: "/photos/guides/companion-marigolds-02-bordering.webp",
          alt: "Young tomato plants staked in a raised bed, edged with French marigolds",
          caption: "mid june · staked on planting day, marigolds on the edge",
        },
        buy: {
          href: az("tomato spiral support"),
          product: "spiral tomato supports",
          label: "The spiral supports that make tying-in optional",
        },
      },
      {
        period: "June and July",
        title: "Pinch out the side shoots",
        text: "The famous weekly job, and it only applies to cordon (vine) types — bush varieties like Tumbler you leave entirely alone. Look in the joint between a leaf and the main stem: the little shoot growing at 45° is the one to pinch out with finger and thumb while it's small. Left to grow, every side shoot becomes a whole extra plant's worth of leaves at the expense of fruit. Once a cordon has set four or five trusses, pinch out the growing tip too — what's left will ripen better for it.",
      },
      {
        period: "June to September",
        title: "Water steadily, feed weekly from the first truss",
        text: "Tomatoes want boring watering: the same deep drink at the roots on a steady rhythm, not a flood after a drought (that's where split fruit and blossom end rot both start). Keep water off the leaves — blight loves a wet leaf — and once the first truss of fruit has set, start a weekly high-potash feed. It's the single biggest difference you can make to yield.",
        image: {
          src: "/photos/blog/watering-marigolds-nasturtiums.webp",
          alt: "Watering at the roots with a long lance in golden evening light",
          caption: "july, evening · at the roots, never the leaves",
        },
        link: { href: "/guides/watering", label: "How we water, and why less-but-deeper wins" },
        buy: {
          href: asin("B09RK3HPH5"),
          product: "Tomorite tomato feed",
          label: "Tomorite — the weekly feed",
        },
      },
      {
        period: "August to October",
        title: "Pick as they colour, and ripen the stragglers",
        text: "Pick little and often, the moment each fruit colours — it tells the plant to keep going, and a tomato ripened on the plant in the sun is the whole reason we do this. When the nights turn cool and the last fruits stall stubbornly green, bring them indoors to a bowl with a banana (the ethylene ripens them), and turn whatever refuses into green tomato chutney — the traditional end of the tomato year.",
        image: {
          src: "/photos/blog/tomatoes-cherry-truss-box.webp",
          alt: "A box of just-picked cherry tomatoes, whole trusses still attached",
          caption: "august · picked as they colour, little and often",
        },
        link: { href: "/guides/dealing-with-the-glut", label: "A table full at once? The glut guide" },
      },
    ],
    problemsImage: {
      src: "/photos/blog/tomatoes-green-beefsteak.webp",
      alt: "A heavy truss of beefsteak tomatoes, still green, waiting for the sun",
      caption: "august · still green is not a problem, it's a queue",
    },
    problems: [
      {
        name: "Blight",
        spot: "Dark, spreading blotches on leaves and stems in warm, damp spells — usually from July on. It can take a plant down in days.",
        fix: "Water at the base, keep airflow through the plants, and check the live risk map when the weather turns warm and wet. Next year, resistant varieties like Crimson Crush shrug it off almost entirely.",
        link: { href: "/blight-watch", label: "Check today's blight risk where you are" },
      },
      {
        name: "Blossom end rot",
        spot: "A sunken, leathery black patch on the bottom of the fruit — pots and growbags get it worst.",
        fix: "It looks like disease but it's a watering problem: calcium only reaches the fruit when water is steady, so erratic watering starves the fruit tip of it. Even out the watering, mulch pots to slow the drying, and the next trusses will come good.",
      },
      {
        name: "Split fruit",
        spot: "Ripe or nearly-ripe fruit with a burst skin, usually the morning after heavy rain.",
        fix: "A sudden gulp of water after a dry spell swells the fruit faster than the skin can stretch. Steady watering prevents most of it — and after a downpour, pick anything nearly ripe before it splits rather than after.",
      },
      {
        name: "Curled leaves",
        spot: "Leaves rolling inwards along their length, usually low on the plant, usually midsummer.",
        fix: "Nine times out of ten it's nothing — a normal response to hot days and cool nights, and the plant crops on regardless. Only look closer if leaves are also mottled, sticky or stunted, which points to aphids instead.",
      },
      {
        name: "Flowers but no fruit",
        spot: "Trusses of yellow flowers that dry up and drop instead of setting.",
        fix: "The flowers aren't getting pollinated or it's simply too cold at night — common in a chilly June. Tap the supports around midday to shake pollen loose, keep greenhouse vents open for the bees, and warmer nights will fix the rest by themselves.",
      },
    ],
    faq: [
      {
        q: "When should I sow tomatoes in the UK?",
        a: "Indoors from late February to early April — about eight weeks before your last frost, which is the number that matters. Enter your postcode above and the dates are worked out for exactly where you grow.",
      },
      {
        q: "Can I grow tomatoes outdoors in the UK?",
        a: "Yes — a sheltered, sunny spot and an early or cherry variety (Gardener's Delight, Sungold) crop reliably outdoors across most of the UK. A greenhouse buys you earlier fruit, later fruit and the big beefsteaks, but it's a luxury, not a requirement.",
      },
      {
        q: "What's the difference between cordon and bush tomatoes?",
        a: "Cordon (vine) types grow one tall main stem, need a support, and want their side shoots pinched out weekly. Bush types just bush — no pinching, no fuss — which makes them the easier start, especially in pots and hanging baskets.",
      },
      {
        q: "Can I grow tomatoes in pots?",
        a: "Very happily — one plant to a 30cm-plus pot or a growbag, somewhere sunny. Pots dry out fast, so steady watering matters even more; a bush or cherry variety forgives the most.",
      },
      {
        q: "How often should I water and feed tomatoes?",
        a: "A deep, steady drink at the roots — daily in hot spells for pots, every few days in the ground — and a weekly high-potash tomato feed once the first truss of fruit has set. Steadiness beats quantity: most tomato problems trace back to feast-and-famine watering.",
      },
      {
        q: "Why won't my tomatoes ripen?",
        a: "A British September, usually — ripening slows as light and warmth fade. Pinch out the growing tip so the plant puts everything into the fruit it has, pick anything showing colour to finish indoors, and ripen the last green stragglers in a bowl with a banana.",
      },
    ],
    guides: [
      {
        href: "/guides/growing-tomatoes-outdoors-vs-greenhouse",
        title: "Outdoors or greenhouse?",
        blurb: "What each one buys you, and the varieties that suit each side of the glass.",
      },
      {
        href: "/guides/tomato-blight",
        title: "Tomato blight, in full",
        blurb: "How to spot it, slow it, and choose varieties that shrug it off.",
      },
      {
        href: "/guides/growing-veg-in-containers",
        title: "Growing in pots & containers",
        blurb: "No garden needed — compost, pot sizes and the watering that makes it work.",
      },
      {
        href: "/guides/companion-planting/companion-plants-for-tomatoes",
        title: "What to plant with tomatoes",
        blurb: "Basil, marigolds and the pairings we've watched earn their keep on our own beds.",
      },
    ],
  },
  carrots: {
    care: [
      {
        period: "March to July",
        title: "Sow direct, little and often",
        text: "Carrots go straight into the ground — they sulk if transplanted, so there's no windowsill stage to worry about. Rake the bed to a fine, stone-free tilth (no fresh manure — that's where forked carrots come from), draw a shallow row, and sow as thinly as you have patience for. A short row every three weeks from March to July beats one long row in April: you get tender young carrots all season instead of a glut of woody ones.",
      },
      {
        period: "From sowing day",
        title: "Cover against carrot fly before you see one",
        text: "Carrot fly finds your row by scent and flies low, and by the time you see damage it's done. The calm answer is a fine mesh over the row from the day you sow — hoops or just laid loose with the edges pinned. It's the one piece of kit that genuinely decides whether you get clean carrots or tunnelled ones.",
        buy: {
          href: az("enviromesh fine insect mesh netting"),
          product: "fine insect mesh",
          label: "The fine mesh that keeps carrot fly out",
        },
      },
      {
        period: "Three to four weeks in",
        title: "Thin on a still evening",
        text: "However thinly you sowed, some seedlings will come up shoulder to shoulder. Thin them to a finger-width apart — and do it on a still evening, because the smell of crushed carrot leaves is a dinner bell for the fly. Firm the soil back afterwards and water gently. The thinnings from later rounds are your first taste of the year.",
        image: {
          src: "/photos/crops/carrot-seedlings-young.webp",
          alt: "Young carrot seedlings with their first ferny true leaves, coming up along a row",
          caption: "a few weeks in · the ferny true leaves arrive, and thinning time with them",
        },
      },
      {
        period: "Through summer",
        title: "Weed, water lightly, then leave them be",
        text: "Carrots are one of the few crops that like being slightly ignored. Steady, light watering is all they want — a drought followed by a soak is what splits them. Rich feeding just grows you lovely ferny tops and thin roots, so save the feed for the hungry crops and let the carrots get on with it.",
      },
      {
        period: "From about fourteen weeks",
        title: "Pull as you need them, leave the rest in the ground",
        text: "Start pulling when the shoulders look finger-thick — ease them up with a fork alongside the row if the soil is firm. There's no rush for the rest: the ground stores carrots better than any cupboard, and they sweeten as the nights cool. On heavy or slug-prone soil, lift what's left by late autumn; on light soil they'll sit happily into winter under a little earth or mulch.",
        image: {
          src: "/photos/crops/carrots-muddy-harvest.webp",
          alt: "A bunch of just-pulled carrots, soil still on the roots",
          caption: "straight from the ground · mud is the freshness stamp",
        },
        link: { href: "/guides/growing-root-vegetables", label: "The full root vegetables guide" },
      },
    ],
    problems: [
      {
        name: "Forked, twisted roots",
        spot: "Carrots that split into legs or corkscrew round themselves — comedy shapes at lifting time.",
        fix: "The root hit something on the way down: a stone, a clod, or a pocket of fresh manure. Nothing wrong with the eating, only the beauty contest. Next row: finer soil, no fresh compost — and on stony ground, a deep container of sieved soil is the cheat's answer.",
      },
      {
        name: "Carrot fly",
        spot: "Rusty-brown tunnels through the roots, foliage that reddens and wilts. The grubs do the damage below ground.",
        fix: "Mesh from sowing day is the real fix — the fly is low-flying and scent-led, so covered rows simply don't get found. Thin at dusk, firm back after, and if the fly owns your plot, resistant sorts like Flyaway and Resistafly take most of the worry away.",
      },
      {
        name: "All leaf, no carrot",
        spot: "Magnificent ferny tops, disappointing pencil roots underneath.",
        fix: "Too much nitrogen or too much shade. Carrots root best in soil that was fed for last year's crop, not this year's — give them your sunniest, leanest bed and the balance swings back underground.",
      },
      {
        name: "Green shoulders",
        spot: "The top of the root pokes above the soil and turns green where the light gets at it.",
        fix: "Harmless — just light on the crown. Draw a little soil or mulch over the shoulders as they swell, and cut the green top off at the table. The rest of the carrot is exactly as it should be.",
      },
      {
        name: "Split roots",
        spot: "A clean lengthwise crack, usually found after heavy rain follows a dry spell.",
        fix: "The root swelled faster than its skin. Steady watering through dry weeks prevents most of it — and split carrots still cook perfectly well, they just won't store. Eat those first.",
      },
    ],
    faq: [
      {
        q: "When should I sow carrots in the UK?",
        a: "Direct into the ground from March (under fleece for the earliest rows) through to July — a short row every three weeks gives you a steady supply instead of a glut. The dates above are worked out for your postcode.",
      },
      {
        q: "Why did my carrots fork?",
        a: "They hit something on the way down — stones, heavy clods, or fresh manure, which carrots read as an obstacle. Sow into fine, stone-free soil that wasn't manured this year, and they'll grow straight.",
      },
      {
        q: "How do I stop carrot fly?",
        a: "Fine insect mesh over the row from sowing day, before you ever see a fly. Thin seedlings on a still evening (the scent attracts them) and consider resistant varieties like Flyaway if your plot has history.",
      },
      {
        q: "Can I grow carrots in containers?",
        a: "Very well — a deep pot of sieved, stone-free compost is actually the easiest way to grow straight carrots on stony ground. Choose a stump-rooted or shorter sort and keep the watering steady.",
      },
      {
        q: "When are carrots ready to harvest?",
        a: "From about fourteen weeks after sowing, when the shoulders look finger-thick — but there's no deadline. Carrots keep beautifully in the ground and sweeten as autumn cools, so pull them as the kitchen needs them.",
      },
    ],
    guides: [
      {
        href: "/guides/growing-root-vegetables",
        title: "Growing root vegetables",
        blurb: "Carrots, beetroot, parsnips and friends — the whole underground crowd in one guide.",
      },
      {
        href: "/guides/companion-planting/companion-plants-for-carrots",
        title: "What to plant with carrots",
        blurb: "Onions and carrots in alternating rows — the classic scent-masking partnership, explained.",
      },
      {
        href: "/guides/succession-sowing",
        title: "Succession sowing",
        blurb: "The little-and-often habit that turns one packet of carrot seed into six months of pulling.",
      },
      {
        href: "/guides/growing-veg-in-containers",
        title: "Growing in pots & containers",
        blurb: "Deep pots beat stony ground — how to do the whole thing in containers.",
      },
    ],
  },

  courgettes: {
    care: [
      {
        period: "April to early June",
        title: "Sow indoors, one seed to a pot",
        text: "One seed, one small pot, somewhere warm — a courgette seed at 20°C is up in under a week and frankly hard to stop. Sow about four weeks before your last frost (dates above), and resist sowing many: two or three plants feed a family, and every courgette grower learns this the hard way, once.",
        image: {
          src: "/photos/guides/seed-starting-courgette-seedling.webp",
          alt: "A courgette seedling in a small pot, seed leaves spread wide",
          caption: "may · one seed, one pot — it won't stay small for long",
        },
      },
      {
        period: "Late May, after the last frost",
        title: "Plant out into your richest spot",
        text: "Harden them off for a week, then plant a full 90cm apart — a courgette in July occupies the space of a small armchair. Dig a bucket of compost into each planting hole, water in well, and guard the first fortnight fiercely: a slug can end a courgette plant in one damp night, and a sturdy plant set out is far harder to kill than a small one.",
        buy: {
          href: az("organic slug pellets ferric phosphate"),
          product: "organic slug pellets",
          label: "Organic slug pellets for the dangerous first nights",
        },
        image: {
          src: "/photos/blog/courgette-young-plant.webp",
          alt: "A young courgette plant newly planted out in a bed",
          caption: "late may · planted out sturdy, not small",
        },
      },
      {
        period: "June",
        title: "Let them settle, keep the water coming",
        text: "Courgettes are mostly water with ambitions, and June is when they drink to grow. Water generously at the base — wetting the leaves just invites mildew later — and mulch around each plant to hold the moisture in. Then stand back; the growth from here on is genuinely entertaining.",
        image: {
          src: "/photos/blog/courgette-marigold-bed-june.webp",
          alt: "Courgette plants filling a bed edged with French marigolds",
          caption: "june · settling in, marigolds on the edge",
        },
      },
      {
        period: "From the first flowers",
        title: "Don't panic about flowers without fruit",
        text: "The first flush of big yellow trumpets is often all male — flowers on thin stalks, no baby courgette behind them. That's the plant clearing its throat, not failing. Female flowers (a tiny courgette already sitting behind the bloom) follow within a week or two, the bees handle the introductions, and the surplus male flowers are wonderful stuffed and fried, if you're feeling cheffy.",
        image: {
          src: "/photos/crops/courgette-with-flowers.webp",
          alt: "A courgette plant in full production, fruit and yellow flowers together",
          caption: "july · flowers and fruit at once — full production",
        },
      },
      {
        period: "July to October",
        title: "Pick small, pick often",
        text: "Fifteen centimetres is the size to take them — tender, glossy, and the plant answers every picking with more. Check every other day in high summer, because a courgette can double while your back is turned, and once one becomes a marrow the plant starts winding down. In pots, a fortnightly high-potash feed (the same one the tomatoes get) keeps the engine running.",
        buy: {
          href: asin("B09RK3HPH5"),
          product: "Tomorite tomato feed",
          label: "The high-potash feed — tomatoes and courgettes share it",
        },
        link: { href: "/guides/dealing-with-the-glut", label: "Buried in courgettes? The glut guide" },
        image: {
          src: "/photos/blog/first-summer-courgettes.webp",
          alt: "The first courgettes of summer, picked small",
          caption: "july · picked at fifteen centimetres, the size they're best",
        },
      },
    ],
    problems: [
      {
        name: "Small fruits rotting from the tip",
        spot: "Baby courgettes that yellow, stall and rot from the flower end before they ever size up.",
        fix: "Failed pollination, not disease — common in cool, wet spells when the bees stay home. Pick the failures off so the plant doesn't waste effort, and it rights itself the moment the sun and the bees come back.",
      },
      {
        name: "Powdery mildew",
        spot: "White dust across the leaves, usually from late August, as if someone flour-bombed the bed.",
        fix: "Almost traditional by September, and rarely fatal — courgettes usually outrun it. Water the soil rather than the leaves, cut off the worst-affected ones for airflow, and let the plant finish its season; it nearly always can.",
      },
      {
        name: "The seedling vanished overnight",
        spot: "A healthy young plant reduced to a stump, with the tell-tale silver trails nearby.",
        fix: "Slugs adore young courgettes above almost everything. Plant out sturdy rather than small, protect the first two weeks, and keep a spare seedling on the windowsill as insurance — the replacement usually catches up within a month.",
      },
      {
        name: "It became a marrow",
        spot: "You looked away for three days. It's now the size of a draught excluder.",
        fix: "A rite of passage, not a problem. Stuff it, chutney it, or gift it with ceremony — then go back to picking at fifteen centimetres, which quietly tells the plant to keep making more.",
      },
      {
        name: "Wilting in the afternoon heat",
        spot: "The whole plant flat and dramatic at 3pm on a hot day, leaves like dropped umbrellas.",
        fix: "Big leaves simply can't drink as fast as the sun takes it, and by evening they're usually standing again. Only worry if it's still wilted at dawn — that's real thirst, and a deep soak sorts it.",
      },
    ],
    faq: [
      {
        q: "How many courgette plants do I need?",
        a: "Two or three for a family, honestly. One healthy plant produces a courgette every day or two in high summer — plant six and you'll be leaving them on neighbours' doorsteps by August.",
      },
      {
        q: "Why does my courgette have flowers but no fruit?",
        a: "The first flush of flowers is usually all male — that's normal throat-clearing. Female flowers, with a tiny courgette behind the bloom, follow within a week or two, and the bees do the rest. In cool wet spells pollination can stall; it recovers with the sunshine.",
      },
      {
        q: "Why are the baby courgettes rotting?",
        a: "Failed pollination in cool or wet weather — not disease. Pick off the stalled fruits and the plant comes right when the bees are flying again.",
      },
      {
        q: "Can I grow courgettes in a pot?",
        a: "Yes — one plant in a 40cm-plus pot of rich compost, in full sun, with generous watering and a fortnightly high-potash feed once fruiting. Bush varieties suit pots best.",
      },
      {
        q: "How do I keep a courgette plant producing?",
        a: "Pick small and pick often — every fruit taken at 15cm tells the plant to make another, and every one that becomes a marrow tells it the job's done. Water steadily and it'll crop into October.",
      },
      {
        q: "Can I sow courgettes straight into the ground?",
        a: "From about a week after your last frost, yes — the soil is warm enough by then and direct-sown plants romp away. Indoors in April just buys you an earlier first picking.",
      },
    ],
    guides: [
      {
        href: "/guides/growing-squash-pumpkins-courgettes",
        title: "Squash, pumpkins & courgettes",
        blurb: "The whole sprawling family — courgettes are the gateway; here's the rest.",
      },
      {
        href: "/guides/dealing-with-the-glut",
        title: "Dealing with the glut",
        blurb: "You will need this by August. What keeps, what freezes, and who to gift the rest to.",
      },
      {
        href: "/guides/companion-planting/companion-plants-for-courgettes",
        title: "What to plant with courgettes",
        blurb: "Nasturtiums, borage and the pollinator crowd that keep the fruit coming.",
      },
      {
        href: "/guides/growing-veg-in-containers",
        title: "Growing in pots & containers",
        blurb: "One plant, one big pot, one sunny corner — the patio courgette, done properly.",
      },
    ],
  },

  "maincrop-potatoes": {
    titleName: "Maincrop Potatoes",
    care: [
      {
        period: "Late February to March",
        title: "Chit the seed potatoes (free head start, no kit)",
        text: "Stand the seed potatoes in egg boxes, blunt end (the one with the most eyes) upwards, somewhere cool and bright — a spare-room windowsill is perfect. In a few weeks each grows short, stubby green shoots, and those chitted tubers get away noticeably faster once planted. It costs nothing and it's the gentlest start to the growing year there is.",
      },
      {
        period: "April",
        title: "Plant when the soil wakes up",
        text: "When the soil is workable and the worst of the frosts are behind you (your dates are above), plant 10–12cm deep, about 38cm apart, in rows a good stride apart. Potatoes are one of the few crops that genuinely enjoy a rich, freshly-fed bed, so this is where the compost goes. Shoots up, firm the soil back, and the waiting begins.",
      },
      {
        period: "As the shoots emerge",
        title: "Earth up — and watch the forecast",
        text: "When the shoots stand a hand high, draw soil up over them into a ridge, leaving just the tips showing — and do it again a few weeks later. Earthing up protects young shoots from a late frost, buries the stems that make extra tubers, and keeps light off the crop (light is what turns potatoes green). If a hard frost threatens after the shoots are up, a night under fleece saves the early growth.",
        buy: {
          href: az("horticultural fleece plant frost protection"),
          product: "horticultural fleece",
          label: "Fleece for the frosty nights after the shoots are up",
        },
        image: {
          src: "/photos/blog/potato-shoots-emerging.webp",
          alt: "Young potato shoots emerging through ridged soil",
          caption: "april · shoots up, time to earth them in",
        },
      },
      {
        period: "June and July",
        title: "Water steadily while the tubers form",
        text: "Flowering is the signal that tubers are swelling underground, and this is the thirsty stretch — steady water now is the difference between a heavy, clean crop and a scabby, hollow one. A proper soak in dry weeks beats a daily sprinkle, and a mulch along the rows holds it all in.",
        image: {
          src: "/photos/blog/potato-rows-growing.webp",
          alt: "Rows of maincrop potatoes in full leaf",
          caption: "june · full rows, tubers swelling out of sight",
        },
      },
      {
        period: "July onward",
        title: "Watch for blight in warm, wet spells",
        text: "Blight weather is warm and humid, and maincrops are in the ground through the riskiest months. Check the live map when the air turns muggy, and if blight does arrive, cut the haulms (the tops) off at the soil and take them away — it sacrifices the foliage but saves the crop underneath, as the spores can't wash down to the tubers once the tops are gone.",
        link: { href: "/blight-watch", label: "Check today's blight risk where you are" },
      },
      {
        period: "September to October",
        title: "Let the skins set, then lift on a dry day",
        text: "When the foliage yellows and dies back, resist lifting for another week or two — that pause is what sets the skins so they'll store. Then choose a dry day, lift with a fork from well outside the row, let them dry on the soil for a few hours, and store them somewhere dark, cool and frost-free in paper or hessian sacks. Done right, you're eating your own potatoes at Christmas.",
      },
    ],
    problems: [
      {
        name: "Blight",
        spot: "Dark brown patches on leaves with pale edges, spreading fast in warm wet weather; a foul smell means it's reached the tubers.",
        fix: "Cut the tops off at soil level the day you're sure, and get them off the plot — the crop below is usually still sound if you act quickly. Leave the tubers two weeks before lifting so surface spores die off. Next year: earth up well and keep an eye on the live map from July.",
        link: { href: "/blight-watch", label: "The live blight map" },
      },
      {
        name: "Scab",
        spot: "Rough, corky patches on the skin — ugly, but the potato underneath is fine.",
        fix: "Common in dry summers and limey soil, and it's cosmetic: peel and eat as normal. Steady watering while tubers form prevents most of it, and don't lime the potato bed.",
      },
      {
        name: "Green patches",
        spot: "Tubers with green shoulders, usually ones that grew close to the surface.",
        fix: "Light got at them — and green potatoes shouldn't be eaten, so cut the green away generously or compost the worst. The fix is prevention: earth up properly, and store the lifted crop in the dark.",
      },
      {
        name: "Slug holes",
        spot: "Neat round tunnels through otherwise good tubers, worst on heavy, wet ground.",
        fix: "Keel slugs live in the soil and love a wet autumn. Lift maincrops promptly once the skins are set rather than leaving them in the ground into November, and the damage drops right off. Holed ones still cook — cut around the tunnels and eat those first.",
      },
      {
        name: "A disappointing harvest",
        spot: "Healthy-looking plants, but a fork-up of marbles.",
        fix: "Usually a dry June and July — the tubers simply never got the water to swell. Water generously through flowering next year, give each plant its full spacing, and the fork comes up heavy again.",
      },
    ],
    faq: [
      {
        q: "Do I need to chit maincrop potatoes?",
        a: "It's not essential for maincrops — they have a long season anyway — but it costs nothing and gets them away faster. For earlies it makes a real difference; for maincrops it's a nice head start.",
      },
      {
        q: "When do I harvest maincrop potatoes?",
        a: "September into October: wait for the foliage to die back, then leave them another week or two in the ground so the skins set for storage, and lift on a dry day.",
      },
      {
        q: "How often should I water potatoes?",
        a: "Steadily and deeply while they're flowering — that's when tubers are swelling and thirst peaks. A good soak in dry weeks beats daily sprinkles, and steady moisture also prevents scab.",
      },
      {
        q: "Why are my potatoes green, and can I eat them?",
        a: "Light reached them, either in the ground or in storage — and no, cut green parts away generously (they contain solanine, which tastes bitter and isn't good for you). Earth up well and store in the dark.",
      },
      {
        q: "How do I store potatoes?",
        a: "Unwashed, in paper or hessian sacks, somewhere dark, cool and frost-free. Check the sacks monthly and take out any soft ones — one bad potato really does spoil the bag.",
      },
      {
        q: "Can I grow potatoes in bags or containers?",
        a: "Yes — though earlies suit bags better than maincrops, which want more root run. A 40-litre bag, a third filled, topped up as the shoots grow, gives a satisfying harvest on any patio.",
      },
    ],
    guides: [
      {
        href: "/blight-watch",
        title: "Blight Watch",
        blurb: "The live UK blight-risk map — worth a look whenever July turns warm and damp.",
      },
      {
        href: "/guides/companion-planting/companion-plants-for-potatoes",
        title: "What to plant with potatoes",
        blurb: "The neighbours that earn their place beside the potato rows, and the ones that don't.",
      },
      {
        href: "/guides/growing-veg-in-containers",
        title: "Growing in pots & containers",
        blurb: "Potato bags on a patio — the no-plot way to a proper harvest.",
      },
    ],
  },

  "runner-beans": {
    care: [
      {
        period: "Late April to May",
        title: "Sow indoors for a head start — or direct in late May",
        text: "Runner beans are frost-tender, so the season starts inside: one bean per deep pot (they make long roots fast), about four weeks before your last frost. Or skip the windowsill entirely and push beans two inches into warm soil in late May — direct-sown plants are only ever a fortnight behind and never know the shock of moving. Your dates, either way, are above.",
      },
      {
        period: "Before planting",
        title: "Build the frame first, and build it strong",
        text: "A row of runner beans in full leaf is a sail, and an August wind means it. Eight-foot canes, crossed and lashed into a ridge or a wigwam, pushed a proper foot into the ground and braced along the top — build it before the beans need it, because repairs mid-season are done through a jungle. This is the crop's one piece of engineering; do it once, properly.",
        buy: {
          href: az("bamboo canes 8ft garden"),
          product: "8ft bamboo canes",
          label: "The 8ft canes the frame wants",
        },
      },
      {
        period: "Late May to June",
        title: "Plant out after the frost, one plant per cane",
        text: "When the frosts are done, plant one bean at the foot of each cane into rich, deep soil — the old-timers dig a compost-filled trench here for good reason, because runners are thirsty and the buried richness holds water all summer. Give each young plant a gentle starting twist around its cane and it takes it from there, at a pace that's honestly a little alarming.",
        image: {
          src: "/photos/crops/runner-beans-climbing.webp",
          alt: "Runner beans twining up a frame of tall canes",
          caption: "june · one gentle twist, then they take the stairs themselves",
        },
      },
      {
        period: "July",
        title: "Water at the roots the moment flowers show",
        text: "Here is the whole secret of runner beans: the scarlet flowers only set pods if the roots are moist. Dry roots mean dropped flowers and a bare frame, and no amount of feeding fixes what watering solves. From first flower, a deep soak at the base every few dry days, and a thick mulch to keep it there — the bees, who adore the red, do the rest.",
        link: { href: "/guides/watering", label: "How we water — less often, much deeper" },
      },
      {
        period: "July to October",
        title: "Pick every two or three days, without fail",
        text: "Once the pods come they come in waves, and picking is what keeps the waves coming — any pod left to fatten its beans tells the plant the season's done. Take them at 15–20cm, smooth and snappy, before the strings develop. Miss a weekend and you'll find the stringy evidence; pick relentlessly and one wigwam crops for three months.",
        link: { href: "/guides/dealing-with-the-glut", label: "A wall of beans at once? The glut guide" },
      },
      {
        period: "October",
        title: "Cut down, but leave the roots in the ground",
        text: "When the frosts finish the party, cut the plants off at soil level and compost the tops — but leave the roots where they are. Bean roots carry little nodules of fixed nitrogen, and left in the soil they hand that feed straight to whatever grows there next spring. The bean bed pays its own rent.",
      },
    ],
    problems: [
      {
        name: "Flowers but no beans",
        spot: "A frame covered in scarlet flowers that drop without ever making a pod.",
        fix: "Dry roots, almost every time — flower set depends on soil moisture. A deep soak at the base every few days and a thick mulch usually restarts the pods within a fortnight. Cool nights early in the season cause the same thing and fix themselves as summer settles in.",
      },
      {
        name: "Stringy, tough pods",
        spot: "Pods that looked fine but chew like garden twine.",
        fix: "They were picked too old — runners go from perfect to stringy in a few days. Pick younger and much more often, and if a batch got away from you, the beans inside still cook well podded like flageolets.",
      },
      {
        name: "Blackfly on the growing tips",
        spot: "Dense black colonies clustered on the soft tips and youngest leaves, often farmed by ants.",
        fix: "Pinch out the infested tips and bin them — once the plants reach the top of the canes you were going to pinch them anyway, and the ladybirds handle the stragglers. A strong jet of water knocks back small colonies before they settle.",
      },
      {
        name: "The frame is leaning",
        spot: "The whole row developing a quiet list after a windy night in August.",
        fix: "Brace it now, not after the gale finishes the job — a diagonal cane strut at each end, pushed deep, straightens most leans. It's a ten-minute job while it's leaning and a lost crop when it's down.",
      },
      {
        name: "Seedlings shredded at ground level",
        spot: "Young plants with leaves skeletonised or stems felled overnight.",
        fix: "Slugs when it's damp, and sometimes pigeons when it's not. Plant out sturdy rather than small, protect the first fortnight, and keep two spare plants in pots — a runner bean replacement catches up remarkably fast.",
      },
    ],
    faq: [
      {
        q: "When should I sow runner beans in the UK?",
        a: "Indoors in late April or May (about four weeks before your last frost), or straight into warm soil in late May and early June. The dates above are set to your postcode.",
      },
      {
        q: "Why do my runner beans flower but not set pods?",
        a: "Dry roots are the usual culprit — flower set depends on steady soil moisture. Water deeply at the base from first flower and mulch well. Early-season cool nights cause it too, and that fixes itself.",
      },
      {
        q: "Should I pinch out the tops of runner beans?",
        a: "Yes — when they reach the top of the canes, pinch out the growing tip. It stops the wigwam turning into a wrestling match up there and sends the plant's effort into pods instead.",
      },
      {
        q: "How tall do runner bean supports need to be?",
        a: "Eight-foot canes, pushed a good foot into the ground, so the plants get about seven feet of climb. Build strong and brace the ends — a full row in an August wind is heavier than it looks.",
      },
      {
        q: "Can I freeze runner beans?",
        a: "Beautifully. Top, tail and slice, blanch for two minutes, cool fast, and freeze flat before bagging — your own beans in January. The glut guide has the whole routine.",
      },
      {
        q: "Can I grow runner beans in the same place every year?",
        a: "Runners are forgiving, and the traditional bean trench refills the spot with goodness each spring — but rotating every couple of years keeps soil pests from settling in. Wherever they grow, leave the roots in: they feed the soil for whatever follows.",
      },
    ],
    guides: [
      {
        href: "/guides/companion-planting/companion-plants-for-beans",
        title: "What to plant with beans",
        blurb: "Sweetcorn, squash and the scent-maskers — the partnerships that suit a bean row.",
      },
      {
        href: "/guides/dealing-with-the-glut",
        title: "Dealing with the glut",
        blurb: "August will bring the wall of beans. Freeze them, share them, enjoy the abundance.",
      },
      {
        href: "/guides/watering",
        title: "The watering guide",
        blurb: "Runners live and die by moisture at the roots — here's the rhythm that keeps pods coming.",
      },
    ],
  },
};

export function getPlaybook(slug: string): CropPlaybook | undefined {
  return cropPlaybooks[slug];
}
