import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import MusicPlayer from "@/components/music-player";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono", // Variable CSS
});

const handwritten = localFont({
  src: "../public/fonts/FeelingPassionate.ttf",
  variable: "--font-handwritten",
  display: "swap",
});

export const metadata: Metadata = {
  title: "I'll be Home for Christmas",
  description: "Register for our Christmas celebration!",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/LOGO HFC.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${handwritten.variable}`}>
      <body className="font-sans antialiased">
        <MusicPlayer />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
