"use client";

import { useEffect, useRef } from "react";

export default function CropScrollDepth({ slug }: { slug: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    function handleScroll() {
      if (tracked.current) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return;

      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 50) {
        tracked.current = true;
        if (typeof window !== 'undefined' && window.umami) {
          window.umami.track('crop-scroll-depth', { crop: slug, depth: '50' });
        }
        window.removeEventListener('scroll', handleScroll);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  return null;
}
