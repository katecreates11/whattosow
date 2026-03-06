"use client";

import { useState, useRef, useEffect } from "react";
import { type Crop } from "@/data/crops";

interface CropComboboxProps {
  crops: Crop[];
  onSelect: (crop: Crop) => void;
  selectedCrop: Crop | null;
}

export default function CropCombobox({ crops, onSelect, selectedCrop }: CropComboboxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = query.length === 0
    ? crops
    : crops.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(crop: Crop) {
    onSelect(crop);
    setQuery(crop.name);
    setOpen(false);
  }

  return (
    <div className="relative flex-1 min-w-[180px]">
      <label htmlFor="crop-search" className="text-xs font-semibold text-earth-light mb-1.5 block">
        Crop
      </label>
      <input
        ref={inputRef}
        id="crop-search"
        type="text"
        value={selectedCrop && !open ? selectedCrop.name : query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (selectedCrop) onSelect(null as unknown as Crop);
        }}
        onFocus={() => {
          setOpen(true);
          if (selectedCrop) setQuery(selectedCrop.name);
        }}
        placeholder="Type to search..."
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls="crop-listbox"
        aria-autocomplete="list"
        className="w-full bg-white border border-earth/15 text-earth text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-allotment/20 focus:border-allotment/40 transition-all"
      />
      {open && filtered.length > 0 && (
        <ul
          ref={listRef}
          id="crop-listbox"
          role="listbox"
          className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-earth/15 shadow-lg max-h-60 overflow-y-auto"
        >
          {filtered.map((crop) => (
            <li
              key={crop.slug}
              role="option"
              aria-selected={selectedCrop?.slug === crop.slug}
              onClick={() => handleSelect(crop)}
              className="px-3 py-2 text-sm text-earth hover:bg-sage cursor-pointer transition-colors"
            >
              {crop.name}
              <span className="text-xs text-earth-lighter ml-2 capitalize">
                {crop.category}
              </span>
            </li>
          ))}
        </ul>
      )}
      {open && filtered.length === 0 && query.length > 0 && (
        <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-earth/15 shadow-lg px-3 py-3 text-sm text-earth-lighter">
          No crops found
        </div>
      )}
    </div>
  );
}
