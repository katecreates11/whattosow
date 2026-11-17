import Image from "next/image";
import { editorNote } from "@/data/editor-note";

/**
 * The editor's note from the plot: the most human thing on the front page, so it is
 * set like a letter, in her words, signed with her name.
 */
export default function EditorNote() {
  return (
    <aside className="px-6 sm:px-10 lg:px-16 py-20 sm:py-28" aria-labelledby="editor-note-heading">
      <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-16 items-start">
        <div className="relative aspect-[4/5] overflow-hidden md:sticky md:top-24">
          <Image
            src="/photos/blog/plot-early-spring.webp"
            alt="Our allotment beds, dug and planted, early in the year"
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover img-grade"
          />
        </div>
        <div>
          <h2 id="editor-note-heading" className="text-[15px] text-earth-light">
            From the plot &middot; {editorNote.date}
          </h2>
          <p className="mt-5 font-serif text-[1.35rem] sm:text-[1.6rem] leading-[1.45] text-earth max-w-[34ch] sm:max-w-[38ch]">
            {editorNote.text}
          </p>
        </div>
      </div>
    </aside>
  );
}
