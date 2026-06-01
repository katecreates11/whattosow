import { editorNote } from "@/data/editor-note";

export default function EditorNote() {
  return (
    <aside className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="border-l-2 border-[#003b44] pl-6 sm:pl-8 max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#003b44]/40 mb-4">
            Editor&apos;s Note — {editorNote.date}
          </p>
          <p className="text-[#003b44]/80 text-base sm:text-lg leading-relaxed">
            {editorNote.text}
          </p>
          <p className="mt-4 font-serif italic text-[#003b44]/50 text-sm">— K</p>
        </div>
      </div>
    </aside>
  );
}
