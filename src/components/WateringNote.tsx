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
      className="px-6 sm:px-10 lg:px-16 py-8 sm:py-10 border-y border-earth/10 bg-ochre/40"
      aria-labelledby="watering-note-heading"
      data-watering-note={note.state}
    >
      <div className="max-w-4xl mx-auto relative pl-5 sm:pl-7">
        <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-amber" aria-hidden="true" />
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-allotment mb-3">
          TONIGHT&apos;S WATERING · {note.place}
        </p>
        <h2 id="watering-note-heading" className="sr-only">
          Tonight&apos;s watering note
        </h2>
        <p className="font-serif text-xl sm:text-2xl text-earth leading-snug max-w-[38ch]">
          {copy.sentence}
        </p>
        <p className="mt-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-earth-lighter">
          {footnoteFor(note.state, note.weather)}
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-earth-lighter">
          &mdash; pinned to the shed door
        </p>
      </div>
    </section>
  );
}
