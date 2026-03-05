"use client";

import { useEffect } from "react";

export default function PrintTracker() {
  useEffect(() => {
    function handleBeforePrint() {
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('print-initiated');
      }
    }

    window.addEventListener('beforeprint', handleBeforePrint);
    return () => window.removeEventListener('beforeprint', handleBeforePrint);
  }, []);

  return null;
}
