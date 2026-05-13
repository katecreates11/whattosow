"use client";

import { useState } from "react";
import Image from "next/image";

export default function UnsplashHero({
  unsplashId,
  cropName,
}: {
  unsplashId: string;
  cropName: string;
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
      <Image
        src={`https://images.unsplash.com/photo-${unsplashId}?w=1600&h=600&fit=crop&auto=format&q=75`}
        alt={`${cropName} growing`}
        fill
        className="object-cover"
        priority
        sizes="100vw"
        onError={() => setHidden(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <p className="absolute bottom-3 right-4 text-[10px] text-white/40">
        Photo: Unsplash
      </p>
    </div>
  );
}
