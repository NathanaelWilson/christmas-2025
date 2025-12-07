"use client";

import { useRef, useState, useCallback } from "react";
import { X, Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";

const images = {
  giftInfo: "/Gift.webp",
  dresscodeInfo: "/Dresscode.webp",
  paperTexture: "/Postcard.webp",
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

  // Preload image manual — Safari membutuhkan ini
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
          })
      )
    );
  }, []);

  const handleSave = useCallback(async () => {
    if (!stackRef.current || isGenerating) return;

    try {
      setIsGenerating(true);

      // 1. Preload images
      await preloadImages();

      // 2. Safari: tunggu DOM stabil
      await new Promise((r) => setTimeout(r, 300));

      // 3. Paksa reflow Safari
      stackRef.current.offsetHeight;

      // 4. Convert to PNG
      const dataUrl = await toPng(stackRef.current, {
        cacheBust: true,
        pixelRatio: 3,
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
            title: "Undangan",
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
    date: "Dec 19, 2025",
    time: "6 PM",
    location: "Chapel 1 GMS Alsut",
  };

  return (
    <div className="flex min-h-screen items-start justify-center px-4 py-8 bg-stone-100 overflow-y-auto">
      {/* FIX SAFARI Rendering */}
      <style>{`
        img {
          image-rendering: -webkit-optimize-contrast;
          -webkit-user-drag: none;
        }
      `}</style>

      <div className="w-full max-w-[480px] space-y-4 pb-10">
        <div
          ref={stackRef}
          className="flex flex-col gap-4 bg-stone-100 p-4 rounded-xl shadow-sm border border-stone-200"
        >
          {/* 1. POSTCARD */}
          <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden border bg-white">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${images.paperTexture})`,
              }}
            >
              <div
                className="h-full w-full p-5 flex flex-col justify-between"
                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="font-serif italic border-b border-red-700/40 text-stone-800 pb-1">
                    <span className="text-xs mr-1 text-stone-600">To:</span>
                    <span className="text-red-800 font-bold text-lg">
                      {data?.fullName || "Guest"}
                    </span>
                  </div>

                  <div className="w-12 h-12 border-2 border-red-800/20 rounded-full flex items-center justify-center -rotate-12">
                    <span className="text-[7px] font-bold text-red-800/30 uppercase text-center font-mono">
                      Air Mail
                      <br />
                      2025
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center">
                  <h1 className="font-serif font-bold text-xl text-rose-800">
                    Christmas Celebration
                  </h1>
                  <p className="text-xs italic text-stone-600">
                    "I'll be Home for Christmas"
                  </p>
                  <div className="w-8 h-1 bg-green-700 mx-auto rounded-full mt-2"></div>
                </div>

                {/* Detail */}
                <div className="flex justify-between items-center bg-white/70 border rounded p-2 text-[10px] font-mono">
                  <div className="flex items-center gap-1">
                    <span>📅</span>
                    <span>{eventDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🕖</span>
                    <span>{eventDetails.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📍</span>
                    <span>{eventDetails.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. DRESSCODE */}
          <div className="relative w-full overflow-hidden rounded-lg border bg-white">
            <img
              src={images.dresscodeInfo}
              crossOrigin="anonymous"
              loading="eager"
              decoding="sync"
              alt="Dresscode"
              className="w-full h-auto"
            />
          </div>

          {/* 3. GIFT */}
          <div className="relative w-full overflow-hidden rounded-lg border bg-white">
            <img
              src={images.giftInfo}
              crossOrigin="anonymous"
              loading="eager"
              decoding="sync"
              alt="Gift"
              className="w-full h-auto"
            />
          </div>

          <p className="text-center text-[9px] text-stone-400 font-mono uppercase tracking-widest">
            Christmas Coach Jessie 2025
          </p>
        </div>

        {/* Footer Button */}
        <div className="flex gap-3 p-3 rounded-xl bg-white/90 backdrop-blur-sm border sticky bottom-0">
          <button
            onClick={handleSave}
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-800 text-white rounded-lg font-bold active:scale-95 disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Download size={16} /> Save Image
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 text-stone-800 rounded-lg active:scale-95"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
