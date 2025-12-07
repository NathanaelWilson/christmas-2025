"use client";

import { useRef, useCallback, useState } from "react";
import { X, Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";

const images = {
  giftInfo: "/Gift.webp",
  paperTexture: "/Postcard.webp",
  dresscodeInfo: "/Dresscode.webp",
};

interface DigitalInvitationProps {
  data: {
    fullName: string;
    whatsappNumber: string;
    inConnectGroup: string;
    connectGroup: string;
  } | null;
  onClose: () => void;
}

export default function DigitalInvitation({
  data,
  onClose,
}: DigitalInvitationProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // --- LOGIKA PENYIMPANAN GAMBAR ---
  const handleSave = useCallback(async () => {
    if (!stackRef.current || isGenerating) return;

    try {
      setIsGenerating(true);

      const dataUrl = await toPng(stackRef.current, {
        cacheBust: true,
        pixelRatio: 2, // Kualitas ditingkatkan sedikit agar teks tajam
        backgroundColor: "#F5F5F4",
        skipAutoScale: true,
      });

      const filename = `Invitation-${
        data?.fullName?.replace(/\s+/g, "-") || "Guest"
      }.png`;

      if (navigator.canShare && navigator.share) {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], filename, { type: "image/png" });

        if (navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: "Undangan Natal",
              text: `Undangan Spesial untuk ${data?.fullName || "Anda"}!`,
            });
            setIsGenerating(false);
            return;
          } catch (shareError: any) {
            if (shareError.name !== "AbortError") {
              console.warn(
                "Share API gagal, fallback ke download.",
                shareError
              );
            } else {
              setIsGenerating(false);
              return;
            }
          }
        }
      }

      // Fallback Download
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Gagal save:", error);
      alert("Gagal menyimpan gambar.");
    } finally {
      setIsGenerating(false);
    }
  }, [data?.fullName, isGenerating]);
  // ---------------------------------

  const eventDetails = {
    date: "Dec 19, 2025",
    time: "6 PM",
    location: "Chapel 1 GMS Alsut",
  };

  return (
    <div
      className="flex min-h-screen items-start justify-center px-4 py-8 overflow-y-auto"
      style={{
        backgroundColor: "rgb(245,245,244)",
        animation: "fadein 0.5s ease",
      }}
    >
      <style>{`
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Container utama dibatasi lebarnya agar pas di HP, tapi cukup lebar untuk Landscape */}
      <div className="w-full max-w-[480px] pb-10 space-y-4">
        {/* === AREA FORMAT VERTIKAL - LANDSCAPE IMAGES === */}
        <div
          ref={stackRef}
          className="flex flex-col gap-4 bg-stone-100 p-4 rounded-xl shadow-sm border border-stone-200"
        >
          {/* 1. KARTU UNDANGAN (Landscape 3:2) */}
          <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-sm border border-stone-200 bg-white">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${images.paperTexture})` }}
            >
              {/* Layout Text Landscape */}
              <div
                className="h-full w-full p-5 flex flex-col justify-between relative"
                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
              >
                {/* Header: To & Date */}
                <div className="flex justify-between items-start">
                  <div className="font-serif italic border-b border-rose-900/30 text-stone-800 pb-1">
                    <span className="text-xs not-italic mr-1 font-sans text-stone-500">
                      To:
                    </span>
                    <span className="text-red-800 font-bold text-lg">
                      {data?.fullName || "Guest"}
                    </span>
                  </div>

                  {/* Stamp dipindah ke pojok kanan atas */}
                  <div className="w-12 h-12 border-2 border-red-800/20 rounded-full flex items-center justify-center -rotate-12 transform translate-x-1 -translate-y-1">
                    <span className="font-bold text-[7px] text-center uppercase font-mono text-red-800/30">
                      Air Mail
                      <br />
                      2025
                    </span>
                  </div>
                </div>

                {/* Main Title */}
                <div className="text-center space-y-1 my-1">
                  <h1 className="font-serif font-bold leading-tight text-xl sm:text-2xl text-rose-800">
                    Christmas Celebration
                  </h1>
                  <p className="text-stone-600 italic text-xs">
                    "I'll be Home for Christmas"
                  </p>
                  <div className="w-8 h-1 bg-green-700 rounded-full mx-auto mt-2" />
                </div>

                {/* Details Row (Horizontal) */}
                <div className="flex justify-between items-center bg-stone-100/60 border border-stone-200/50 rounded-lg p-2 text-[10px] sm:text-xs font-mono text-stone-700">
                  <div className="flex items-center gap-1">
                    <span>📅</span>
                    <span className="font-semibold">{eventDetails.date}</span>
                  </div>
                  <div className="w-px h-3 bg-stone-300 mx-1"></div>
                  <div className="flex items-center gap-1">
                    <span>🕖</span>
                    <span>{eventDetails.time}</span>
                  </div>
                  <div className="w-px h-3 bg-stone-300 mx-1"></div>
                  <div className="flex items-center gap-1">
                    <span>📍</span>
                    <span>{eventDetails.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. DRESSCODE (Asli - Tidak dicrop) */}
          {/* Menggunakan tag IMG agar rasio asli terjaga */}
          <div className="relative w-full rounded-lg overflow-hidden shadow-sm border border-stone-200 bg-white">
            <img
              src={images.dresscodeInfo}
              alt="Dresscode Info"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* 3. GIFT (Asli - Tidak dicrop) */}
          <div className="relative w-full rounded-lg overflow-hidden shadow-sm border border-stone-200 bg-white">
            <img
              src={images.giftInfo}
              alt="Gift Info"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="text-center">
            <p className="font-mono text-[9px] text-stone-400 tracking-widest uppercase">
              GMS Christmas 2025
            </p>
          </div>
        </div>
        {/* === FOOTER TOMBOL === */}
        <div className="sticky top-0 z-40 flex gap-3 p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-stone-200 shadow-sm">
          <button
            onClick={handleSave}
            disabled={isGenerating}
            style={{ touchAction: "manipulation" }}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-bold text-sm transition-all bg-red-800 text-white hover:bg-red-900 active:scale-95 disabled:opacity-70"
          >
            {isGenerating ? (
              <>
                <Loader2 size={16} className="animate-spin" /> SAVING...
              </>
            ) : (
              <>
                <Download size={16} /> SAVE IMAGE
              </>
            )}
          </button>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="flex items-center justify-center rounded-lg px-4 py-2 font-bold transition-all bg-stone-200 text-stone-800 hover:bg-stone-300 active:scale-95 disabled:opacity-70"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
