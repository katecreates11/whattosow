export default function Header({ backLink }: { backLink?: { href: string; label: string } }) {
  return (
    <header className="border-b border-allotment-bg bg-cream/80 backdrop-blur-sm sticky top-0 z-10">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-allotment focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <svg
            className="w-8 h-8 text-allotment"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 20h10" />
            <path d="M10 20c5.5-2.5.8-6.4 3-10" />
            <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
            <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
          </svg>
          <span className="font-bold text-lg text-earth">What To Sow</span>
        </a>
        {backLink ? (
          <a href={backLink.href} className="text-sm text-allotment hover:text-allotment-dark">
            {backLink.label}
          </a>
        ) : (
          <nav className="text-sm text-earth-lighter">
            <span>Free UK planting tool</span>
          </nav>
        )}
      </div>
    </header>
  );
}
