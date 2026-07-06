import type { WateringNoteState } from "@/lib/watering";

/**
 * Copy for Tonight's Watering Note. Each state carries several variants so
 * regulars don't see wallpaper — the day of year picks one deterministically
 * (same sentence all day; a fresh one tomorrow). All copy in the voice:
 * gentle, weather-first, judgement before data, always facing forward.
 */

export interface WateringNoteCopy {
  sentence: string;
  fallbackFootnote: string;
}

const VARIANTS: Record<WateringNoteState, WateringNoteCopy[]> = {
  "rained-properly": [
    {
      sentence: "The rain has done tonight's job for you — the soil is holding it nicely. Put the can down and go and see what's grown instead.",
      fallbackFootnote: "rain has topped up the beds · check pots only",
    },
    {
      sentence: "Last night's rain is still down there where the roots want it. Tonight is for picking and pottering, not watering.",
      fallbackFootnote: "soil well charged · watering can stood down",
    },
    {
      sentence: "The beds have had a proper drink from the sky, which does it better than we do. Anything under cover or in a pot might still be thirsty — everything else is sorted.",
      fallbackFootnote: "rain-fed and holding · covered pots are the exception",
    },
  ],
  "raining-now": [
    {
      sentence: "It's doing it for you right now. The only job tonight is admiring it from the shed with a cuppa.",
      fallbackFootnote: "rain falling now · watering can off duty",
    },
    {
      sentence: "Rain on the beds as we speak — the best watering there is, and it's free. Listen to it on the shed roof and call it a job done.",
      fallbackFootnote: "raining now · the sky has this one",
    },
    {
      sentence: "The sky's taken over the watering rota tonight. If anything, check the pots tucked under the eaves — rain has a way of missing exactly those.",
      fallbackFootnote: "raining · only sheltered pots miss out",
    },
  ],
  "hot-dry-spell": [
    {
      sentence: "Hot, dry day. Give pots and anything newly planted a proper drink tonight — the rest can wait if the soil still feels cool below the surface.",
      fallbackFootnote: "warm dry spell · pots and new plantings first",
    },
    {
      sentence: "The beds have been giving water to the sky all day. A slow, deep soak at the roots this evening — pots first, they're always thirstiest.",
      fallbackFootnote: "dry heat · deep and slow beats little and often",
    },
    {
      sentence: "A drying sort of day. Water this evening while the soil's still warm — it soaks in instead of steaming off, and the plants drink all night.",
      fallbackFootnote: "dry spell · evening watering goes furthest",
    },
  ],
  heatwave: [
    {
      sentence: "The pots are running on fumes. Water deep tonight and again at dawn if you can — the roots will make better use of it then.",
      fallbackFootnote: "several hot days · deep watering earns its keep",
    },
    {
      sentence: "Another scorcher on top of the last — this is the week that decides the tomatoes. Deep drinks at the roots, morning and evening for the pots, and leave a saucer out for the birds.",
      fallbackFootnote: "heatwave · pots twice daily, birds appreciated",
    },
    {
      sentence: "Heatwave rules tonight: water the roots, not the leaves, go deep rather than often, and do the pots before you do anything else. The beds with mulch on will be quietly fine.",
      fallbackFootnote: "heatwave · roots not leaves, mulch is winning",
    },
  ],
  "cool-and-cloudy": [
    {
      sentence: "No need tonight — cool and grey means the soil keeps what it has. Have the evening off. The garden won't tell anyone.",
      fallbackFootnote: "cool cloud · soil holding steady",
    },
    {
      sentence: "Grey lid on the sky and no real heat — the beds are losing next to nothing. Tonight can be a walk round with a mug rather than a can.",
      fallbackFootnote: "cool and cloudy · nothing needed",
    },
    {
      sentence: "The kind of soft grey day the garden quietly loves. The soil's keeping its moisture to itself, so you can keep your evening to yourself too.",
      fallbackFootnote: "overcast · the soil is doing the saving",
    },
  ],
  "windy-and-dry": [
    {
      sentence: "That wind dries beds faster than sunshine does. Check the pots and anything newly planted — the rest will ride it out.",
      fallbackFootnote: "dry wind · pots and new plants need a look",
    },
    {
      sentence: "A drying wind all day — it takes water off the leaves quicker than any sun. Pots, seedlings and anything tall and staked get first look tonight.",
      fallbackFootnote: "windy · check pots, seedlings, and the staking",
    },
    {
      sentence: "The wind's been at the beds all day like a hand-dryer. A drink for the pots and the new plantings tonight, and a glance at the bean frame while you're out.",
      fallbackFootnote: "dry wind · water the small, check the tall",
    },
  ],
  "rain-due": [
    {
      sentence: "Rain is on the way before morning — let the sky take this one. If a pot looks desperate, that one can jump the queue.",
      fallbackFootnote: "rain due overnight · pots only if desperate",
    },
    {
      sentence: "The forecast says the sky will do tonight's watering for you. Hold off, save the water butt, and check it kept its promise in the morning.",
      fallbackFootnote: "rain expected · hold off and verify at breakfast",
    },
    {
      sentence: "Rain's queued up for tonight — no sense watering an hour before the sky does. The desperate pot rule applies; everything else waits.",
      fallbackFootnote: "rain incoming · the butt stays full",
    },
  ],
  "no-postcode": [
    {
      sentence: "In the middle of the country it's a watering evening. Add your postcode and we'll tell you about your sky.",
      fallbackFootnote: "UK-average note · add your postcode for your own sky",
    },
    {
      sentence: "This note is written for the middle of the country — your sky may be telling a different story. Add your postcode and we'll read yours instead.",
      fallbackFootnote: "UK average · your postcode makes it yours",
    },
  ],
  "winter-observation": [
    {
      sentence: "The watering can can rest. At this end of the year, the useful job is watching for cold clear nights and tucking tender things in.",
      fallbackFootnote: "winter watch · fleece matters more than watering",
    },
    {
      sentence: "No watering worth doing at this time of year — the job now is drainage, not drinks. If anything, tip the saucers so the pots aren't standing in it.",
      fallbackFootnote: "winter · wet feet are the enemy now",
    },
    {
      sentence: "The garden drinks almost nothing in the cold months. Keep an eye on anything under cover — the greenhouse pots are the only thirsty things left.",
      fallbackFootnote: "winter · only covered pots need you",
    },
  ],
};

/** Day-of-year, UTC, so server and client agree across a render. */
function dayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  return Math.floor((date.getTime() - start) / 86400000);
}

export function getWateringNoteCopy(state: WateringNoteState, date: Date = new Date()): WateringNoteCopy {
  const variants = VARIANTS[state];
  return variants[dayOfYear(date) % variants.length];
}
