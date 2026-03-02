import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
