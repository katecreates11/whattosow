"use client";
import { useEffect, useState } from "react";

type SlotDef = { id: string; group: string; label: string; purpose: string; shape: string };
type Assignment = { src: string; alt: string; caption?: string };
type Data = { slots: SlotDef[]; manifest: Record<string, Assignment>; library: { raw: string[]; web: string[] } };

export default function PhotoPlacer() {
  const [data, setData] = useState<Data | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [rotateExtra, setRotateExtra] = useState(0);
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => fetch("/api/admin/slots").then((r) => r.json()).then(setData);
  useEffect(() => { load(); }, []);

  if (!data) return <div className="p-8 font-mono text-sm">Loading…</div>;

  const groups = [...new Set(data.slots.map((s) => s.group))];
  const thumb = (file: string) => `/api/admin/thumb?file=${encodeURIComponent(file)}`;
  const activeDef = data.slots.find((s) => s.id === active);

  async function save() {
    if (!active || !source) return;
    setSaving(true);
    await fetch("/api/admin/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotId: active, sourcePath: source, alt, caption, rotateExtra }),
    });
    setSaving(false);
    setSource(null); setRotateExtra(0);
    await load();
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 grid grid-cols-[340px_1fr] gap-6 p-6">
      {/* Slots column */}
      <div className="overflow-y-auto max-h-[calc(100vh-3rem)]">
        <h1 className="font-bold text-lg mb-1">Photo slots</h1>
        <p className="text-xs text-neutral-500 mb-4">Pick a slot, then click a photo to fill it.</p>
        {groups.map((g) => (
          <div key={g} className="mb-5">
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 mb-2">{g}</div>
            {data.slots.filter((s) => s.group === g).map((s) => {
              const a = data.manifest[s.id];
              return (
                <button
                  key={s.id}
                  onClick={() => { setActive(s.id); setSource(null); setRotateExtra(0); setAlt(a?.alt ?? ""); setCaption(a?.caption ?? ""); }}
                  className={`w-full flex items-center gap-3 p-2 mb-1 rounded text-left ${active === s.id ? "bg-emerald-200" : "bg-white hover:bg-neutral-50"}`}
                >
                  <div className="w-12 h-12 bg-neutral-200 overflow-hidden shrink-0 flex items-center justify-center text-[9px] text-neutral-400">
                    {a ? <img src={a.src} alt="" className="w-full h-full object-cover" /> : "empty"}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="text-[11px] text-neutral-500">{s.purpose} · {s.shape}</div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Right: library + assign panel */}
      <div className="overflow-y-auto max-h-[calc(100vh-3rem)]">
        {!active && <p className="text-neutral-500">Pick a slot on the left to fill it.</p>}
        {active && (
          <div>
            <div className="sticky top-0 bg-neutral-100 pb-3 mb-3 border-b z-10">
              <div className="font-semibold mb-2">
                Filling: <span className="font-mono text-sm">{activeDef?.label}</span>{" "}
                <span className="text-xs text-neutral-500">({activeDef?.shape})</span>
              </div>
              {source ? (
                <div className="flex items-start gap-4">
                  <img src={thumb(source)} alt="" style={{ transform: `rotate(${rotateExtra}deg)` }} className="w-40 h-40 object-cover bg-neutral-200 border" />
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button onClick={() => setRotateExtra((r) => r - 90)} className="px-2 py-1 bg-white border rounded text-sm">⟲ rotate</button>
                      <button onClick={() => setRotateExtra((r) => r + 90)} className="px-2 py-1 bg-white border rounded text-sm">rotate ⟳</button>
                      <span className="text-xs text-neutral-400 self-center">preview only — the saved photo is auto-straightened too</span>
                    </div>
                    <input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Alt text (for SEO + accessibility)" className="block w-96 border px-2 py-1 text-sm" />
                    <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption (optional, shows under the photo)" className="block w-96 border px-2 py-1 text-sm" />
                    <div className="flex gap-2">
                      <button onClick={save} disabled={saving} className="px-4 py-1.5 bg-emerald-600 text-white rounded disabled:opacity-50">{saving ? "Saving…" : "Save to slot"}</button>
                      <button onClick={() => setSource(null)} className="px-3 py-1.5 bg-white border rounded text-sm">Cancel</button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-neutral-500">Click a photo below to drop it into this slot.</p>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[...data.library.raw, ...data.library.web].map((f) => (
                <button
                  key={f}
                  onClick={() => setSource(f)}
                  className={`aspect-square overflow-hidden border-2 ${source === f ? "border-emerald-500" : "border-transparent hover:border-neutral-300"}`}
                >
                  <img src={thumb(f)} alt="" loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
