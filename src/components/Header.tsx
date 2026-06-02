"use client";

import { useState } from "react";
import Marquee from "@/components/Marquee";
import WeatherVane from "@/components/WeatherVane";

const NAV_LINKS = [
  { href: "/sow", label: "Sow" },
  { href: "/grow", label: "Grow" },
  { href: "/harvest", label: "Harvest" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
];

const MORE_LINKS = [
  { href: "/#explore-crops", label: "Crops" },
  { href: "/frost-map", label: "Frost map" },
];

export default function Header({ backLink }: { backLink?: { href: string; label: string } }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="bg-allotment-dark sticky top-0 z-10">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-leaf focus:text-earth focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="font-serif text-lg text-white tracking-tight hover:text-leaf-light transition-colors">
            What To Sow
          </a>
          {backLink && (
            <a href={backLink.href} className="hidden sm:block text-xs text-leaf-light/60 hover:text-leaf-light transition-colors">
              {backLink.label}
            </a>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-5">
          <nav aria-label="Main" className="hidden sm:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-[13px] text-white/60 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                aria-expanded={moreOpen}
                className="text-[13px] text-white/60 hover:text-white transition-colors flex items-center gap-1"
              >
                More
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 bg-allotment-dark border border-white/10 py-2 min-w-[160px] z-20">
                  {MORE_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-[13px] text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <WeatherVane />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden p-2 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav aria-label="Mobile navigation" className="sm:hidden border-t border-white/10 bg-allotment-dark">
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col gap-1">
            {[...NAV_LINKS, ...MORE_LINKS].map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/60 hover:text-white transition-colors py-2">
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
      <Marquee />
    </header>
  );
}
