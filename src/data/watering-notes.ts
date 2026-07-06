import type { WateringNoteState } from "@/lib/watering";

export interface WateringNoteCopy {
  sentence: string;
  fallbackFootnote: string;
}

export const WATERING_NOTE_COPY: Record<WateringNoteState, WateringNoteCopy> = {
  "rained-properly": {
    sentence: "The rain has done tonight's job for you — the soil is holding it nicely. Put the can down and go and see what's grown instead.",
    fallbackFootnote: "rain has topped up the beds · check pots only",
  },
  "raining-now": {
    sentence: "It's doing it for you right now. The only job tonight is admiring it from the shed with a cuppa.",
    fallbackFootnote: "rain falling now · watering can off duty",
  },
  "hot-dry-spell": {
    sentence: "Hot, dry day. Give pots and anything newly planted a proper drink tonight — the rest can wait if the soil still feels cool below the surface.",
    fallbackFootnote: "warm dry spell · pots and new plantings first",
  },
  heatwave: {
    sentence: "The pots are running on fumes. Water deep tonight and again at dawn if you can — the roots will make better use of it then.",
    fallbackFootnote: "several hot days · deep watering earns its keep",
  },
  "cool-and-cloudy": {
    sentence: "No need tonight — cool and grey means the soil keeps what it has. Have the evening off. The garden won't tell anyone.",
    fallbackFootnote: "cool cloud · soil holding steady",
  },
  "windy-and-dry": {
    sentence: "That wind dries beds faster than sunshine does. Check the pots and anything newly planted — the rest will ride it out.",
    fallbackFootnote: "dry wind · pots and new plants need a look",
  },
  "rain-due": {
    sentence: "Rain is on the way before morning — let the sky take this one. If a pot looks desperate, that one can jump the queue.",
    fallbackFootnote: "rain due overnight · pots only if desperate",
  },
  "no-postcode": {
    sentence: "In the middle of the country it's a watering evening. Add your postcode and we'll tell you about your sky.",
    fallbackFootnote: "UK-average note · add your postcode for your own sky",
  },
  "winter-observation": {
    sentence: "The watering can can rest. At this end of the year, the useful job is watching for cold clear nights and tucking tender things in.",
    fallbackFootnote: "winter watch · fleece matters more than watering",
  },
};

export function getWateringNoteCopy(state: WateringNoteState): WateringNoteCopy {
  return WATERING_NOTE_COPY[state];
}
