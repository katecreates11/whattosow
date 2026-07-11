"use client";

import { useEffect, useState } from "react";
import type { BenchIdea, Verdict } from "@/lib/bench";

// The Potting Bench — Kate's thumb-friendly verdict page. Each proposed idea is a
// card with Approve / Park / Bin. A tap commits the verdict to the board on main;
// the crew (Night Gardener, Dreamer) reacts from there.

const TYPE_STYLE: Record<string, string> = {
  content: "bg-leaf-bg text-allotment-dark",
  feature: "bg-frost-bg text-earth",
  monetisation: "bg-amber-bg text-earth",
};

const VERDICT_LABEL: Record<Verdict, string> = {
  approved: "On the board — the Night Gardener will pick it up",
  parked: "Parked — kept for another season",
  binned: "Binned — the crew won't pitch it again",
};

type Phase = "loading" | "nokey" | "error" | "ready";

export default function BenchClient() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [key, setKey] = useState("");
  const [ideas, setIdeas] = useState<BenchIdea[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("k");
    if (fromUrl) localStorage.setItem("bench-key", fromUrl);
    const k = fromUrl ?? localStorage.getItem("bench-key");
    if (!k) {
      setPhase("nokey");
      return;
    }
    setKey(k);
    fetch(`/api/bench?k=${encodeURIComponent(k)}`)
      .then(async (res) => {
        if (res.status === 401) return setPhase("nokey");
        if (!res.ok) return setPhase("error");
        const json = (await res.json()) as { ideas: BenchIdea[] };
        setIdeas(json.ideas);
        setPhase("ready");
      })
      .catch(() => setPhase("error"));
  }, []);

  async function decide(idea: BenchIdea, verdict: Verdict) {
    setBusy(idea.heading);
    try {
      const res = await fetch("/api/bench", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ k: key, heading: idea.heading, verdict, note: notes[idea.heading] ?? "" }),
      });
      if (res.ok || res.status === 409) {
        // 409 = someone (or a past tap) already decided it — either way it leaves the bench
        setIdeas((prev) => prev.filter((i) => i.heading !== idea.heading));
        setToast(res.ok ? VERDICT_LABEL[verdict] : "That one was already decided");
        setTimeout(() => setToast(null), 3500);
      } else {
        setToast("Couldn't reach the board — try again in a moment");
        setTimeout(() => setToast(null), 3500);
      }
    } catch {
      setToast("Couldn't reach the board — try again in a moment");
      setTimeout(() => setToast(null), 3500);
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="min-h-screen bg-cream px-4 pb-24 pt-10 sm:pt-14">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-earth-light">The potting bench</p>
        <h1 className="mt-2 font-serif text-3xl text-earth sm:text-4xl">Ideas, waiting for your word.</h1>
        <p className="mt-3 text-sm leading-relaxed text-earth-light">
          Approve and the Night Gardener builds it to a preview. Park keeps it for later. Bin and it&apos;s never
          pitched again. A word on why helps the crew learn your taste.
        </p>

        {phase === "loading" && <p className="mt-12 text-center font-serif italic text-earth-light">Fetching the seed tray…</p>}

        {phase === "nokey" && (
          <div className="mt-12 rounded-2xl border border-earth/10 bg-white/60 p-6 text-center">
            <p className="font-serif text-lg text-earth">This bench needs its key.</p>
            <p className="mt-2 text-sm text-earth-light">Open the bench from your bookmarked link (the one with the key in it) and it&apos;ll remember you.</p>
          </div>
        )}

        {phase === "error" && (
          <div className="mt-12 rounded-2xl border border-earth/10 bg-white/60 p-6 text-center">
            <p className="font-serif text-lg text-earth">The board&apos;s out of reach just now.</p>
            <p className="mt-2 text-sm text-earth-light">Give it a minute and pull this page down to refresh.</p>
          </div>
        )}

        {phase === "ready" && ideas.length === 0 && (
          <div className="mt-12 rounded-2xl border border-earth/10 bg-white/60 p-8 text-center">
            <p className="font-serif text-xl text-earth">The bench is clear. 🌱</p>
            <p className="mt-2 text-sm text-earth-light">Nothing waiting on your word — the Forager pitches on Sunday morning.</p>
          </div>
        )}

        {phase === "ready" && (
          <ul className="mt-8 space-y-6">
            {ideas.map((idea) => {
              const typeKey = idea.type.split(/[\s|]/)[0].toLowerCase();
              const isBusy = busy === idea.heading;
              return (
                <li key={idea.heading} className="rounded-2xl border border-earth/10 bg-white/70 p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] ${TYPE_STYLE[typeKey] ?? "bg-sage/30 text-earth"}`}>
                      {typeKey || "idea"}
                    </span>
                    {idea.score && <span className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-earth-lighter">{idea.score}</span>}
                  </div>

                  <h2 className="mt-3 font-serif text-xl leading-snug text-earth">{idea.heading.replace(/^\d+\.\s*/, "")}</h2>

                  {idea.evidence && (
                    <p className="mt-3 text-[0.8rem] leading-relaxed text-earth-light">
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-earth-lighter">Why now · </span>
                      {idea.evidence}
                    </p>
                  )}
                  {idea.pitch && <p className="mt-2.5 text-sm leading-relaxed text-earth">{idea.pitch}</p>}

                  <textarea
                    value={notes[idea.heading] ?? ""}
                    onChange={(e) => setNotes((n) => ({ ...n, [idea.heading]: e.target.value }))}
                    placeholder="A word on why — the crew learns from this (optional)"
                    rows={2}
                    className="mt-4 w-full resize-none rounded-xl border border-earth/15 bg-cream/60 px-3.5 py-2.5 text-sm text-earth placeholder:text-earth-lighter focus:border-allotment focus:outline-none"
                  />

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => decide(idea, "approved")}
                      disabled={isBusy}
                      className="flex-1 rounded-full bg-allotment py-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-cream transition-opacity active:opacity-80 disabled:opacity-40"
                    >
                      {isBusy ? "…" : "Approve"}
                    </button>
                    <button
                      onClick={() => decide(idea, "parked")}
                      disabled={isBusy}
                      className="flex-1 rounded-full bg-amber py-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-earth transition-opacity active:opacity-80 disabled:opacity-40"
                    >
                      {isBusy ? "…" : "Park"}
                    </button>
                    <button
                      onClick={() => decide(idea, "binned")}
                      disabled={isBusy}
                      className="flex-1 rounded-full bg-tomato py-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-cream transition-opacity active:opacity-80 disabled:opacity-40"
                    >
                      {isBusy ? "…" : "Bin"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {toast && (
          <div className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-xl rounded-full border border-allotment/20 bg-earth px-5 py-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.12em] text-cream shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </main>
  );
}
