import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/**
 * Root layout for the entire application.
 * Sets up fonts, metadata, and the body wrapper.
 */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SubVerse AI — Turn Any Video Into Content For Every Platform",
  description:
    "AI-powered video transcription, subtitle generation, translation in 100+ languages, and content repurposing. Upload once, create everywhere.",
  keywords: [
    "AI subtitles",
    "video transcription",
    "AI translation",
    "content repurposing",
    "subtitle generator",
    "Hinglish captions",
    "video to blog",
    "SRT export",
  ],
  authors: [{ name: "SubVerse AI" }],
  openGraph: {
    title: "SubVerse AI — Turn Any Video Into Content For Every Platform",
    description:
      "AI-powered video transcription, subtitle generation, translation in 100+ languages, and content repurposing.",
    url: "https://subverse.ai",
    siteName: "SubVerse AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SubVerse AI",
    description: "Turn Any Video Into Content For Every Platform.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
