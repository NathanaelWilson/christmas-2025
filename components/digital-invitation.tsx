"use client";

import { useRef, useState, useCallback } from "react";
import { X, Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";

// Pastikan image stamp ditambahkan jika ada, kalau tidak saya pakai placeholder CSS
const images = {
  giftInfo: "/Gift.webp",
  dresscodeInfo: "/Dresscode.webp",
  paperTexture: "/Postcard-bg.webp",
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

  // Preload image manual
  const preloadImages = useCallback(async () => {
    const urls = Object.values(images);
    await Promise.all(
      urls.map(
        (url) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = url;
            img.crossOrigin = "anonymous";
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Resolve even on error to prevent hanging
          })
      )
    );
  }, []);

  const handleSave = useCallback(async () => {
    if (!stackRef.current || isGenerating) return;

    try {
      setIsGenerating(true);
      await preloadImages();

      // Tunggu font siap (penting untuk font custom di canvas)
      await document.fonts.ready;

      await new Promise((r) => setTimeout(r, 500)); // Tambah delay sedikit

      // Paksa reflow
      const height = stackRef.current.offsetHeight;
      console.log("Capturing height:", height);

      const dataUrl = await toPng(stackRef.current, {
        cacheBust: true,
        pixelRatio: 3, // Kualitas tinggi
        backgroundColor: "#F5F5F4",
      });

      const filename = `Invitation-${data?.fullName || "Guest"}.png`;

      // Mobile share API
      if (navigator.canShare) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], filename, { type: "image/png" });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Christmas Invitation",
            text: `Undangan untuk ${data?.fullName}`,
          });
          setIsGenerating(false);
          return;
        }
      }

      // Fallback download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = filename;
      link.click();
    } catch (err) {
      console.error("Error saving:", err);
      alert("Gagal menyimpan gambar.");
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating, preloadImages, data?.fullName]);

  const eventDetails = {
    date: "Friday, Dec 19 2025",
    time: "18.30 - 21.00 WIB",
    location: "Chapel 3 GMS Alam Sutera",
  };

  return (
    <div className="flex min-h-screen items-start justify-center px-4 py-8 bg-stone-100 overflow-y-auto font-sans">
      {/* CSS untuk fix rendering di Safari & Chrome saat html-to-image */}
      <style>{`
        img {
          image-rendering: -webkit-optimize-contrast;
          -webkit-user-drag: none;
        }
      `}</style>

      <div className="w-full max-w-[600px] space-y-4 pb-10">
        <div
          ref={stackRef}
          className="flex flex-col gap-4 bg-stone-100 p-4 rounded-xl shadow-sm border border-stone-200"
        >
          {/* --- 1. POSTCARD DESIGN --- */}
          {/* Aspect Ratio 3:2 standard postcard */}
          <div className="relative w-full aspect-[3/2] overflow-hidden shadow-md text-sepia-900 bg-[#f4f1ea]">
            {/* Background Texture */}
            <div
              className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-90"
              style={{
                backgroundImage: `url(${images.paperTexture})`,
              }}
            />

            {/* Content Container */}
            <div className="relative h-full w-full p-6 sm:p-8 flex flex-row">
              {/* --- LEFT COLUMN (55%) : Event Info --- */}
              <div className="w-[60%] flex flex-col justify-center pr-4 space-y-6 ml-4">
                {/* Main Title (Handwritten) */}
                <h1
                  className="text-2xl sm:text-[2.8rem] leading-[0.9] text-red-900 transform -rotate-2"
                  style={{ fontFamily: "var(--font-handwritten)" }}
                >
                  “I'll be Home <br />{" "}
                  <span className="pl-4">for Christmas”</span>
                </h1>

                {/* Details (Monospace) */}
                <div className="font-mono text-[12px] sm:text-[10px] text-sepia-900 space-y-1 tracking-tight opacity-90">
                  <p className="">{eventDetails.date}</p>
                  <p className="">{eventDetails.time}</p>
                  <p className="">{eventDetails.location}</p>
                </div>

                {/* Note */}
                <p className="font-mono text-[11px] sm:text-[9px] leading-tight text-sepia-800 italic opacity-80 max-w-[90%]">
                  Don’t forget your gift & wear the decided costumes!
                </p>
              </div>

              {/* --- RIGHT COLUMN (45%) : Address & Stamp --- */}
              {/* Border Left sebagai pemisah */}
              <div className="w-[45%] relative pl-5 flex flex-col border-l border-sepia-900/20">
                {/* "To" Section (Middle) */}
                <div className="mt-15 mb-3 pt-10">
                  <p className="font-mono text-[10px] text-sepia-800 mb-1">
                    to:
                  </p>
                  <h2 className="font-mono text-[14px] sm:text-xl font-bold text-red-800 leading-tight break-words border-b border-dashed border-sepia-900/30 pb-1">
                    {data?.fullName || "Dearest Friend"}
                  </h2>
                </div>

                {/* "From" Section (Bottom) */}
                <div className="pb-2 mt-auto">
                  <p className="font-mono text-[10px] text-sepia-800">from:</p>
                  <p
                    className="text-xl sm:text-2xl text-sepia-900 transform -rotate-2"
                    style={{ fontFamily: "var(--font-handwritten)" }}
                  >
                    Coach Jessie
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* --- END POSTCARD --- */}

          {/* 2. DRESSCODE */}
          <div className="relative w-full overflow-hidden rounded-lg border bg-white shadow-sm">
            <img
              src={images.dresscodeInfo}
              crossOrigin="anonymous"
              loading="eager"
              alt="Dresscode"
              className="w-full h-auto block"
            />
          </div>

          {/* 3. GIFT */}
          <div className="relative w-full overflow-hidden rounded-lg border bg-white shadow-sm">
            <img
              src={images.giftInfo}
              crossOrigin="anonymous"
              loading="eager"
              alt="Gift"
              className="w-full h-auto block"
            />
          </div>

          <p className="text-center text-[9px] text-stone-400 font-mono uppercase tracking-widest mt-2">
            Christmas Coach Jessie 2025
          </p>
        </div>

        {/* Footer Button Actions */}
        <div className="flex gap-3 p-3 rounded-xl bg-white/90 backdrop-blur-sm border shadow-lg sticky bottom-4 z-40">
          <button
            onClick={handleSave}
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-800 text-white rounded-lg font-bold active:scale-95 disabled:opacity-60 transition-all hover:bg-red-900"
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Download size={18} /> Save Invitation
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-3 bg-stone-200 text-stone-800 rounded-lg active:scale-95 hover:bg-stone-300 transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
