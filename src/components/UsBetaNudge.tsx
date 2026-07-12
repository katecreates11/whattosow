"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { getUsBetaOffer, US_BETA_CHOICE_KEY, type UsBetaChoice } from "@/lib/us-visitor";

type UmamiWindow = Window & {
  umami?: {
    track: (event: string, data?: Record<string, string>) => void;
  };
};

function track(event: string, data?: Record<string, string>) {
  if (typeof window === "undefined") return;
  (window as UmamiWindow).umami?.track(event, data);
}

function readChoice(): UsBetaChoice | null {
  try {
    const value = window.localStorage.getItem(US_BETA_CHOICE_KEY);
    return value === "dismissed" || value === "stay-uk" || value === "redirected" ? value : null;
  } catch {
    return null;
  }
}

function writeChoice(choice: UsBetaChoice) {
  try {
    window.localStorage.setItem(US_BETA_CHOICE_KEY, choice);
  } catch {
    // If storage is blocked, the nudge still works for this page view.
  }
  window.dispatchEvent(new Event("whattosow:us-beta-choice-updated"));
}

function visitorSignals() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language].filter(Boolean);
  return { timeZone, languages };
}

function subscribeChoice(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("whattosow:us-beta-choice-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("whattosow:us-beta-choice-updated", callback);
  };
}

function browserSnapshot() {
  const { timeZone, languages } = visitorSignals();
  return JSON.stringify({ timeZone, languages, choice: readChoice() });
}

const serverSnapshot = () => JSON.stringify({ timeZone: "", languages: [] as string[], choice: null });

function parseSnapshot(snapshot: string) {
  try {
    return JSON.parse(snapshot) as {
      timeZone: string;
      languages: string[];
      choice: UsBetaChoice | null;
    };
  } catch {
    return { timeZone: "", languages: [], choice: null };
  }
}

export default function UsBetaNudge() {
  const pathname = usePathname();
  const router = useRouter();
  const snapshot = useSyncExternalStore(subscribeChoice, browserSnapshot, serverSnapshot);
  const offer = getUsBetaOffer({ pathname, ...parseSnapshot(snapshot) });
  const trackedOffer = useRef("");

  useEffect(() => {
    const trackingKey = `${offer}:${pathname}`;
    if (offer === "none" || trackedOffer.current === trackingKey) return;
    trackedOffer.current = trackingKey;
    track(offer === "redirect" ? "us-beta-auto-offered" : "us-beta-nudge-shown", { path: pathname });
  }, [offer, pathname]);

  useEffect(() => {
    if (offer !== "redirect") return;

    const timer = window.setTimeout(() => {
      writeChoice("redirected");
      track("us-beta-auto-redirect", { path: pathname });
      router.push("/us?source=homepage-auto");
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [offer, pathname, router]);

  if (offer === "none") return null;

  if (offer === "redirect") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md border border-allotment/25 bg-cream px-4 py-3 text-earth shadow-[0_10px_30px_rgba(59,47,40,0.12)]"
      >
        <p className="font-serif text-lg leading-snug">Looks like you&apos;re growing in the US.</p>
        <p className="mt-1 text-sm leading-relaxed text-earth-light">
          Taking you to the ZIP-code beta — it is a better first doorway than the UK postcode tool.
        </p>
        <button
          type="button"
          onClick={() => {
            writeChoice("stay-uk");
            track("us-beta-dismissed", { path: pathname, action: "stay-uk" });
          }}
          className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-allotment underline decoration-amber underline-offset-4 focus:outline-none focus:ring-2 focus:ring-allotment focus:ring-offset-2 focus:ring-offset-cream"
        >
          Stay on the UK site
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-allotment/20 bg-allotment-dark px-4 py-2 text-white shadow-[0_6px_20px_rgba(0,0,0,0.16)]">
      <div className="mx-auto flex max-w-5xl items-center gap-3 text-sm">
        <Link
          href="/us?source=page-nudge"
          onClick={() => {
            writeChoice("redirected");
            track("us-beta-nudge-click", { path: pathname });
          }}
          className="min-h-8 flex-1 py-1 font-serif text-base leading-snug text-white underline decoration-amber decoration-2 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 focus:ring-offset-allotment-dark"
        >
          Growing in the US? Try the ZIP-code beta &rarr;
        </Link>
        <button
          type="button"
          aria-label="Dismiss US ZIP beta nudge"
          onClick={() => {
            writeChoice("dismissed");
            track("us-beta-dismissed", { path: pathname, action: "dismiss" });
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/25 font-mono text-sm text-white/80 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 focus:ring-offset-allotment-dark"
        >
          ×
        </button>
      </div>
    </div>
  );
}
