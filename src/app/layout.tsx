import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import Script from "next/script";
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
    title: "What To Sow — UK Planting Calendar by Postcode",
    description:
      "The sooner you know your frost date, the more you can grow. Free personalised sowing dates for every UK postcode.",
  },
  metadataBase: new URL("https://whattosow.co.uk"),
  alternates: {
    canonical: "/",
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
      </head>
      <body className={`${instrumentSans.variable} ${newsreader.variable} font-sans antialiased`}>
        {children}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="586b28c5-fbaf-49af-9b2a-03d8fa56e325"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
