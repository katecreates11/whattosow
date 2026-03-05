import { LeafSprig } from "./SVGIllustrations";

export default function Footer() {
  return (
    <footer className="bg-allotment-dark text-white/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <svg
                className="w-7 h-7 text-leaf-light"
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
              <span className="font-bold text-lg text-white">What To Sow</span>
            </div>
            <p className="text-sm text-white/70 max-w-xs">
              Free UK planting calendar by postcode. Know exactly what to sow, right now, where you are.
            </p>
            <div className="text-xs text-white/70 space-y-1">
              <p>Data sources:</p>
              <ul className="space-y-0.5 ml-2">
                <li><a href="https://www.metoffice.gov.uk/research/climate/maps-and-data/uk-climate-averages" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors underline decoration-white/20">Met Office</a> — frost date calibration</li>
                <li><a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors underline decoration-white/20">Open-Meteo</a> — forecasts &amp; soil temperature</li>
                <li><a href="https://postcodes.io/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors underline decoration-white/20">Postcodes.io</a> — postcode geolocation</li>
                <li><a href="https://environment.data.gov.uk/flood-monitoring/doc/rainfall" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors underline decoration-white/20">Environment Agency</a> — rainfall data</li>
              </ul>
              <p>Photos from <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors underline decoration-white/20">Unsplash</a>.</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <nav aria-label="Footer" className="flex flex-col gap-1">
              <a href="/" className="text-white/80 hover:text-white transition-colors py-1.5">Home</a>
              <a href="/#explore-crops" className="text-white/80 hover:text-white transition-colors py-1.5">Explore crops</a>
              <a href="/calendar" className="text-white/80 hover:text-white transition-colors py-1.5">Sowing calendar</a>
              <a href="/allotments" className="text-white/80 hover:text-white transition-colors py-1.5">Find allotments</a>
              <a href="/frost-map" className="text-white/80 hover:text-white transition-colors py-1.5">Frost map</a>
              <a href="/print" className="text-white/80 hover:text-white transition-colors py-1.5">Print chart</a>
              <a href="/products" className="text-white/80 hover:text-white transition-colors py-1.5">Printable resources</a>
              <a href="/guides" className="text-white/80 hover:text-white transition-colors py-1.5">Guides</a>
              <a href="/#common-questions" className="text-white/80 hover:text-white transition-colors py-1.5">FAQ</a>
              <a href="/about" className="text-white/80 hover:text-white transition-colors py-1.5">About</a>
              <a href="/privacy" className="text-white/80 hover:text-white transition-colors py-1.5">Privacy</a>
            </nav>
            <div className="hidden sm:block opacity-30 mt-4" aria-hidden="true">
              <LeafSprig className="w-16 h-20" />
            </div>
          </div>
        </div>
        <p className="text-xs text-white/70 mt-6 pt-4 border-t border-white/10">
          Some links on this site are affiliate links. We may earn a small commission at no extra cost to you.
        </p>
      </div>
    </footer>
  );
}
