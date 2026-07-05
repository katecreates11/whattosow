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
};

export function getPlaybook(slug: string): CropPlaybook | undefined {
  return cropPlaybooks[slug];
}
