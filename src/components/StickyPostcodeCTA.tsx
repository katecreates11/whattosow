"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "whattosow_location";
const DISMISS_KEY = "whattosow_sticky_dismissed";

export default function StickyPostcodeCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  const checkLocation = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setHasLocation(raw !== null);
    } catch {
      setHasLocation(false);
    }
  }, []);

  useEffect(() => {
    // Check if dismissed this session
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) {
        setDismissed(true);
        return;
      }
    } catch {
      // ignore
    }

    checkLocation();

    // Observe when hero scrolls out of view
    // The hero is the first child of #main-content (a FullWidthSection with bg-allotment-dark)
    const main = document.getElementById("main-content");
    if (!main) return;

    const heroSection = main.firstElementChild ?? main;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(heroSection);

    // Listen for postcode entry
    function handleLocationUpdate() {
      setHasLocation(true);
    }
    window.addEventListener("whattosow:location-updated", handleLocationUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("whattosow:location-updated", handleLocationUpdate);
    };
  }, [checkLocation]);

  // Show when past hero, no location, not dismissed
  useEffect(() => {
    setVisible(pastHero && !hasLocation && !dismissed);
  }, [pastHero, hasLocation, dismissed]);

  function handleDismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 bg-allotment-dark/95 backdrop-blur-sm border-t border-white/10 animate-slide-up"
      role="complementary"
      aria-label="Enter your postcode"
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-sm text-white/70">
          What&apos;s ready to sow near you?
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#main-content"
            className="text-xs font-semibold tracking-wide uppercase bg-white text-allotment-dark px-4 py-2 hover:bg-leaf-bg transition-colors duration-300"
          >
            Enter postcode
          </a>
          <button
            onClick={handleDismiss}
            className="text-white/40 hover:text-white/70 transition-colors p-3 -mr-2"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
