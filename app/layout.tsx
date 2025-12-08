import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import MusicPlayer from "@/components/music-player";
import { Smartphone } from "lucide-react";
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
    icon: "/logo-hfc.png",
    apple: "/logo-hfc.png",
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
        {/* --- TAMPILAN MOBILE (Hanya muncul di layar < 768px) --- */}
        <div className="block md:hidden min-h-screen">
          <MusicPlayer />
          {children}
        </div>

        {/* --- TAMPILAN DESKTOP (Hanya muncul di layar >= 768px) --- */}
        {/* Ini adalah overlay peringatan jika dibuka di Laptop/PC */}
        <div className="hidden md:flex fixed inset-0 z-50 flex-col items-center justify-center bg-[#7E0A06] text-[#F9F7F2] text-center p-10">
          <div className="bg-[#F9F7F2]/10 p-8 rounded-2xl border border-[#F9F7F2]/20 backdrop-blur-sm shadow-2xl max-w-md">
            <div className="flex justify-center mb-6">
              <div className="bg-[#F9F7F2] p-4 rounded-full text-[#7E0A06]">
                <Smartphone size={48} />
              </div>
            </div>

            <h1 className="text-3xl font-sans font-bold mb-4 tracking-wide">
              MOBILE ONLY
            </h1>

            <p className="font-mono text-sm leading-relaxed opacity-90 mb-6">
              This experience is designed exclusively for mobile devices. Please
              open this link on your smartphone to continue.
            </p>

            <div className="text-xs font-mono uppercase tracking-widest opacity-60 border-t border-[#F9F7F2]/30 pt-4">
              Christmas Celebration 2025
            </div>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
