import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "What To Sow — UK Planting Calendar by Postcode",
  description:
    "Enter your UK postcode to find your local frost date and get personalised planting advice. Know exactly what to sow this week based on where you live.",
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
      "Enter your UK postcode. Get your local frost date. See what to sow this week. Free, personalised, and simple.",
    type: "website",
    locale: "en_GB",
    url: "https://whattosow.co.uk",
    siteName: "What To Sow",
  },
  twitter: {
    card: "summary_large_image",
    title: "What To Sow — UK Planting Calendar by Postcode",
    description:
      "Enter your UK postcode. Get your local frost date. See what to sow this week.",
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
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="54a74708-a2ec-421a-8943-b1967227f48e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
