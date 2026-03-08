import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — What To Sow",
  description:
    "How What To Sow handles your data. No cookies, no tracking pixels, no data sold.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header backLink={{ href: "/", label: "\u2190 Home" }} />

      <main id="main-content" className="px-6 sm:px-10 lg:px-16 py-12">
        <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-earth mb-8">
          Privacy policy
        </h1>

        <div className="prose prose-earth space-y-6 text-earth-light text-sm leading-relaxed">
          <p>
            <strong className="text-earth">Last updated:</strong> March 2026
          </p>

          <p>
            What To Sow is a free UK planting tool. We believe in keeping things
            simple — including how we handle your data.
          </p>

          <h2 className="text-lg font-semibold text-earth mt-8 mb-2">
            What data we collect
          </h2>

          <h3 className="text-base font-semibold text-earth mt-4 mb-1">
            Your postcode
          </h3>
          <p>
            When you enter your postcode, we send it to{" "}
            <a
              href="https://postcodes.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-allotment hover:underline"
            >
              Postcodes.io
            </a>{" "}
            (an open-source UK postcode API) to look up your approximate
            location (latitude, longitude, region). Your postcode and location
            data are stored locally in your browser&apos;s localStorage so you
            don&apos;t have to re-enter it each visit. This data never leaves
            your device — we don&apos;t store it on any server.
          </p>

          <h3 className="text-base font-semibold text-earth mt-4 mb-1">
            Weather and frost data
          </h3>
          <p>
            We fetch weather forecasts from{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-allotment hover:underline"
            >
              Open-Meteo
            </a>{" "}
            using your approximate coordinates. This happens in your browser — we
            don&apos;t proxy or log these requests.
          </p>

          <h3 className="text-base font-semibold text-earth mt-4 mb-1">
            Email address (if you subscribe)
          </h3>
          <p>
            If you sign up for our monthly sowing reminders, we collect your
            email address. This is stored by our email provider (MailerLite) and
            used solely to send you gardening emails. You can unsubscribe at any
            time using the link in every email. We will never sell, share, or
            rent your email address.
          </p>

          <h2 className="text-lg font-semibold text-earth mt-8 mb-2">
            Analytics
          </h2>
          <p>
            We use{" "}
            <a
              href="https://umami.is/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-allotment hover:underline"
            >
              Umami
            </a>
            , a privacy-focused, cookieless analytics tool. Umami does not use
            cookies, does not collect personal data, and does not track you
            across websites. It tells us things like how many people visited the
            site and which pages are popular — nothing more.
          </p>

          <h2 className="text-lg font-semibold text-earth mt-8 mb-2">
            Cookies
          </h2>
          <p>
            We don&apos;t use cookies. No cookie banner needed.
          </p>

          <h2 className="text-lg font-semibold text-earth mt-8 mb-2">
            Third-party services
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-earth">Postcodes.io</strong> — postcode
              lookup (open data, no tracking)
            </li>
            <li>
              <strong className="text-earth">Open-Meteo</strong> — weather
              forecasts (free API, no tracking)
            </li>
            <li>
              <strong className="text-earth">Unsplash</strong> — crop photos
            </li>
            <li>
              <strong className="text-earth">Umami</strong> — cookieless
              analytics
            </li>
            <li>
              <strong className="text-earth">MailerLite</strong> — email
              subscriptions (only if you sign up)
            </li>
            <li>
              <strong className="text-earth">Netlify</strong> — hosting
            </li>
          </ul>

          <h2 className="text-lg font-semibold text-earth mt-8 mb-2">
            Affiliate links
          </h2>
          <p>
            Some links on this site are affiliate links to seed suppliers. If
            you click through and make a purchase, we may earn a small
            commission at no extra cost to you. This helps keep the site free.
          </p>

          <h2 className="text-lg font-semibold text-earth mt-8 mb-2">
            Your rights
          </h2>
          <p>
            Under UK GDPR, you have the right to access, correct, or delete any
            personal data we hold. Since we only store your postcode locally in
            your browser (you can clear it yourself) and your email with
            MailerLite (you can unsubscribe anytime), exercising these rights is
            straightforward.
          </p>

          <h2 className="text-lg font-semibold text-earth mt-8 mb-2">
            Contact
          </h2>
          <p>
            If you have any questions about this privacy policy, email us at{" "}
            <a
              href="mailto:hello@whattosow.co.uk"
              className="text-allotment hover:underline"
            >
              hello@whattosow.co.uk
            </a>
            .
          </p>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
