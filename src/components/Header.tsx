"use client";

import { useState } from "react";

const NAV_LINKS = [
  { href: "/#explore-crops", label: "Crops" },
  { href: "/calendar", label: "Calendar" },
  { href: "/harvest-planner", label: "Harvest planner" },
  { href: "/frost-map", label: "Frost map" },
  { href: "/guides", label: "Guides" },
  { href: "/sow-in", label: "By location" },
  { href: "/allotments", label: "Allotments" },
];

export default function Header({ backLink }: { backLink?: { href: string; label: string } }) {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <a href="/" className="flex items-center gap-2.5 group">
            <svg
              className="w-7 h-7 text-leaf-light group-hover:text-leaf transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 20h10" />
              <path d="M10 20c5.5-2.5.8-6.4 3-10" />
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
            </svg>
            <span className="font-serif text-lg text-white tracking-tight">What To Sow</span>
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
          </nav>
          <a href="/still-time" className="text-[11px] sm:text-xs font-bold tracking-[0.08em] uppercase text-allotment-dark bg-leaf-light hover:bg-leaf transition-colors px-3 py-1.5 rounded-sm ml-1 sm:ml-2">Still time to sow</a>
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
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/60 hover:text-white transition-colors py-2">
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
