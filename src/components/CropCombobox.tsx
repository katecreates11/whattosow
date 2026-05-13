"use client";

import { useState, useRef, useEffect } from "react";
import { type Crop } from "@/data/crops";

interface CropComboboxProps {
  crops: Crop[];
  onSelect: (crop: Crop | null) => void;
  selectedCrop: Crop | null;
}

export default function CropCombobox({ crops, onSelect, selectedCrop }: CropComboboxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Clear query when parent resets selectedCrop (e.g. after adding)
  useEffect(() => {
    if (!selectedCrop) setQuery("");
  }, [selectedCrop]);

  const filtered = query.length === 0
    ? crops
    : crops.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  // Reset active index when filtered list changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [filtered.length, query]);

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

  // Scroll active option into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.children[activeIndex] as HTMLElement;
      activeEl?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  function handleSelect(crop: Crop) {
    onSelect(crop);
    setQuery(crop.name);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filtered.length) {
          handleSelect(filtered[activeIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setActiveIndex(-1);
        break;
    }
  }

  const activeDescendant = activeIndex >= 0 && filtered[activeIndex]
    ? `crop-option-${filtered[activeIndex].slug}`
    : undefined;

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
          if (selectedCrop) onSelect(null);
        }}
        onFocus={() => {
          setOpen(true);
          if (selectedCrop) setQuery(selectedCrop.name);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls="crop-listbox"
        aria-autocomplete="list"
        aria-activedescendant={activeDescendant}
        className="w-full bg-white border border-earth/15 text-earth text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-allotment/20 focus:border-allotment/40 transition-all"
      />
      {open && filtered.length > 0 && (
        <ul
          ref={listRef}
          id="crop-listbox"
          role="listbox"
          className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-earth/15 shadow-lg max-h-60 overflow-y-auto"
        >
          {filtered.map((crop, i) => (
            <li
              key={crop.slug}
              id={`crop-option-${crop.slug}`}
              role="option"
              aria-selected={selectedCrop?.slug === crop.slug}
              onClick={() => handleSelect(crop)}
              className={`px-3 py-2 text-sm text-earth cursor-pointer transition-colors ${
                i === activeIndex ? "bg-sage" : "hover:bg-sage"
              }`}
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
