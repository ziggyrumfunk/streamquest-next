import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Header from "./components/Header";
import LoadingSplash from "./components/LoadingSplash";
import Footer from "./components/Footer";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-jost",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://streamquest.io";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "StreamQuest",
  url: SITE_URL,
  logo: `${SITE_URL}/firebase-public/Logos%20Partner/streamquest%20logo.png`,
  description:
    "Paid, quest-based Twitch streamer campaigns for indie and AA games.",
  sameAs: [
    "https://twitter.com/StreamQuest_io",
    "https://app.streamquest.io",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "contact@streamquest.io",
      availableLanguage: ["English"],
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "StreamQuest",
  url: SITE_URL,
  publisher: { "@type": "Organization", name: "StreamQuest" },
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://streamquest.io"
  ),
  title: {
    default:
      "StreamQuest | Paid Twitch Streamer Campaigns for Indie & AA Games",
    template: "%s | StreamQuest",
  },
  description:
    "StreamQuest runs paid, quest-based Twitch streamer campaigns for indie and AA games. Manual verification, transparent payouts, and measurable KPI reporting for studios and micro-creators.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "StreamQuest",
    locale: "en_US",
    title:
      "StreamQuest | Paid Twitch Streamer Campaigns for Indie & AA Games",
    description:
      "A Twitch creator platform where streamers discover indie games, join paid quests, and help studios launch authentic creator campaigns.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@StreamQuest_io",
    title:
      "StreamQuest | Paid Twitch Streamer Campaigns for Indie & AA Games",
    description:
      "Paid Twitch streamer campaigns for indie and AA games. Streamers get rewarded. Studios get authentic reach.",
  },
};

export const viewport = {
  themeColor: "#0B1723",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jost.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LoadingSplash />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
