"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A short, silent allotment clip that behaves like a living photograph.
 *
 * - plays only while on screen (IntersectionObserver), pauses off screen
 * - preloads nothing until it's near the viewport — the poster carries the page
 * - honours prefers-reduced-motion: shows the poster with a tap-to-play control
 * - always muted, loops, never fullscreens on iOS (playsinline)
 */
export default function LoopClip({
  src,
  poster,
  alt,
  className = "",
  wide = false,
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  /** Landscape clips can fill the column; portrait (the default) sits at a modest centred width. */
  wide?: boolean;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [userPlayed, setUserPlayed] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || (reducedMotion && !userPlayed)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "100px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reducedMotion, userPlayed]);

  const autoPlays = !reducedMotion || userPlayed;

  return (
    <div className={`relative ${wide ? "" : "max-w-[24rem] mx-auto"} ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={alt}
        className="w-full h-auto block"
      />
      {!autoPlays && (
        <button
          onClick={() => {
            setUserPlayed(true);
            ref.current?.play().catch(() => {});
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/20 focus-visible:outline-2 focus-visible:outline-allotment"
          aria-label={`Play video: ${alt}`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/90 font-mono text-xl text-earth" aria-hidden="true">
            &#9654;
          </span>
        </button>
      )}
    </div>
  );
}
