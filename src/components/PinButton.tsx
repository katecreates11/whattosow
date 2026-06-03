/**
 * "Save to Pinterest" — opens Pinterest's pin creator pre-filled with the page
 * URL, image and description, so the grower (and visitors) can pin in one tap.
 * Uses absolute URLs so Pinterest can fetch them.
 */
const SITE = "https://whattosow.co.uk";

export default function PinButton({
  path,
  image,
  description,
}: {
  path: string; // e.g. /blog/broadfork-clay-bindweed
  image: string; // e.g. /photos/blog/...webp
  description: string;
}) {
  const href =
    "https://www.pinterest.com/pin/create/button/?" +
    `url=${encodeURIComponent(SITE + path)}` +
    `&media=${encodeURIComponent(SITE + image)}` +
    `&description=${encodeURIComponent(description)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-umami-event="pinterest-save"
      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.32-.09-.79-.17-2.01.04-2.88.19-.78 1.2-4.99 1.2-4.99s-.31-.61-.31-1.52c0-1.42.83-2.48 1.85-2.48.87 0 1.29.66 1.29 1.44 0 .88-.56 2.19-.85 3.41-.24 1.02.51 1.86 1.52 1.86 1.82 0 3.22-1.92 3.22-4.69 0-2.45-1.76-4.17-4.28-4.17-2.92 0-4.63 2.19-4.63 4.45 0 .88.34 1.83.76 2.34.08.1.09.19.07.29-.08.32-.26 1.02-.29 1.16-.05.19-.15.23-.35.14-1.3-.61-2.11-2.5-2.11-4.03 0-3.28 2.38-6.29 6.87-6.29 3.61 0 6.41 2.57 6.41 6.01 0 3.58-2.26 6.47-5.4 6.47-1.05 0-2.04-.55-2.38-1.2l-.65 2.46c-.23.91-.86 2.04-1.29 2.73.97.3 2 .46 3.07.46 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
      Save to Pinterest
    </a>
  );
}
