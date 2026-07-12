import type { Metadata } from "next";
import { Instrument_Sans, Newsreader, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import UsBetaNudge from "@/components/UsBetaNudge";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "What To Sow — UK Planting Calendar by Postcode",
  description:
    "The sooner you know your frost date, the more you can grow. Enter your UK postcode for personalised sowing dates — free, instant, no signup.",
  keywords: [
    "what to sow",
    "UK planting calendar",
    "last frost date UK",
    "when to plant vegetables UK",
    "allotment planting guide",
    "frost date by postcode",
    "what to plant this month UK",
    "vegetable growing calendar UK",
  ],
  openGraph: {
    title: "What To Sow — Know exactly what to plant, right now, where you are",
    description:
      "The sooner you know your frost date, the more you can grow. Free personalised sowing dates for every UK postcode.",
    type: "website",
    locale: "en_GB",
    url: "https://whattosow.co.uk",
    siteName: "What To Sow",
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://whattosow.co.uk"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "YmEsVevMZiavrCR9wh4Sv4D7xs6eiemR4goKk8oaoco",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://api.postcodes.io" />
        <link rel="preconnect" href="https://api.open-meteo.com" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2D5F3E" />
        <meta name="pinterest-rich-pin" content="true" />
        <meta name="p:domain_verify" content="a0bbf0ace1ffe1f177e7a9ef497c3e2c" />
        <link rel="alternate" type="application/rss+xml" title="What To Sow Blog" href="/feed.xml" />
      </head>
      <body className={`${instrumentSans.variable} ${newsreader.variable} ${plexMono.variable} font-sans antialiased`}>
        <noscript>
          <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
            <h1>What To Sow</h1>
            <p>The UK sowing advice below works without JavaScript. Enable JavaScript if you want postcode-personalised dates for your own patch.</p>
          </div>
        </noscript>
        {children}
        <UsBetaNudge />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="586b28c5-fbaf-49af-9b2a-03d8fa56e325"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
