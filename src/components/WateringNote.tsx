"use client";

import { useEffect, useMemo, useState } from "react";
import { getWateringNoteCopy } from "@/data/watering-notes";
import { loadLocation } from "@/lib/location-storage";
import {
  fetchWateringWeather,
  getWateringNoteState,
  isWateringSeason,
  type WateringNoteState,
  type WateringWeather,
} from "@/lib/watering";

interface WateringNoteProps {
  initialDateIso: string;
}

interface NoteState {
  state: WateringNoteState;
  weather: WateringWeather | null;
  place: string;
}

const DEFAULT_PLACE = "THE MIDDLE OF THE COUNTRY";

function placeLabel(place: string | null | undefined): string {
  const cleaned = place?.trim();
  return cleaned ? cleaned.toUpperCase() : DEFAULT_PLACE;
}

/** "BARNET" → "Barnet"; "HIGH PEAK" → "High Peak". */
function titleCase(place: string): string {
  return place.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatAmount(value: number | undefined, suffix: string): string | null {
  if (value == null) return null;
  return `${value}${suffix}`;
}

function footnoteFor(state: WateringNoteState, weather: WateringWeather | null): string {
  const fallback = getWateringNoteCopy(state).fallbackFootnote;
  if (!weather) return fallback;

  const parts = [
    formatAmount(weather.rainLast24h, "mm rain last 24h"),
    formatAmount(weather.soilTemp, "° soil"),
    (weather.rainNext12h ?? 0) >= 0.5
      ? formatAmount(weather.rainNext12h, "mm due by morning")
      : "little rain due tonight",
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" · ") : fallback;
}

export default function WateringNote({ initialDateIso }: WateringNoteProps) {
  const initialDate = useMemo(() => new Date(initialDateIso), [initialDateIso]);
  const initialState = getWateringNoteState(null, initialDate);
  const [note, setNote] = useState<NoteState>({
    state: initialState,
    weather: null,
    place: DEFAULT_PLACE,
  });

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      const loc = loadLocation();
      if (!loc) {
        setNote({
          state: getWateringNoteState(null, new Date()),
          weather: null,
          place: DEFAULT_PLACE,
        });
        return;
      }

      const weather = await fetchWateringWeather(loc.latitude, loc.longitude);
      if (cancelled) return;

      if (!weather && isWateringSeason(new Date())) {
        setNote({
          state: "no-postcode",
          weather: null,
          place: DEFAULT_PLACE,
        });
        return;
      }

      setNote({
        state: getWateringNoteState(weather, new Date()),
        weather,
        place: placeLabel(loc.adminDistrict || loc.region || loc.postcode),
      });
    };

    refresh();
    window.addEventListener("whattosow:location-updated", refresh);
    return () => {
      cancelled = true;
      window.removeEventListener("whattosow:location-updated", refresh);
    };
  }, []);

  const copy = getWateringNoteCopy(note.state);

  return (
    <section
      className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 bg-ochre/45"
      aria-labelledby="watering-note-heading"
      data-watering-note={note.state}
    >
      <div className="max-w-5xl mx-auto">
        <h2 id="watering-note-heading" className="text-[15px] text-earth-light">
          Tonight{note.place === DEFAULT_PLACE ? ", in the middle of the country" : ` in ${titleCase(note.place)}`}
        </h2>
        <p className="mt-3 font-serif text-[1.75rem] sm:text-[2.35rem] text-earth leading-[1.2] tracking-[-0.01em] max-w-[30ch]">
          {copy.sentence}
        </p>
        <p className="mt-5 font-mono text-[12px] text-earth-lighter">
          {footnoteFor(note.state, note.weather)}
        </p>
      </div>
    </section>
  );
}
