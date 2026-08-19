import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "@/app/_styles/globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const description =
  "Small batches, named farms, and a bar where someone still pulls every shot by hand.";

// metadataBase is what turns the relative icon/OG paths into the absolute URLs
// crawlers and chat clients require.
//
// Order matters. VERCEL_URL is the *per-deployment* host, which changes on
// every push -- using it made the canonical point at an ephemeral URL that no
// longer matches the site a week later. VERCEL_PROJECT_PRODUCTION_URL is the
// project's stable production domain and is set even in preview builds, so
// previews canonicalise to production, which is what you want.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Roaster — Coffee Worth Slowing Down For",
    template: "%s — Roaster",
  },
  description,
  applicationName: "Roaster",
  keywords: [
    "coffee roastery",
    "specialty coffee",
    "single origin",
    "espresso bar",
    "filter coffee",
    "coffee beans",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Roaster",
    title: "Roaster — Coffee Worth Slowing Down For",
    description,
    url: "/",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roaster — Coffee Worth Slowing Down For",
    description,
  },
  robots: { index: true, follow: true },
};

// Rendered by the browser chrome around the page (address bar, tab strip).
export const viewport: Viewport = {
  themeColor: "#1b1107",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
