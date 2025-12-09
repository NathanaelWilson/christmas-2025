"use client";

import { useRef, useState, useCallback } from "react";
import { X, Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";

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

// Helper: Tunggu DOM stabil
async function waitForDomFullyStable(element: HTMLElement, frames = 10) {
  return new Promise<void>((resolve) => {
    let lastRect = element.getBoundingClientRect();
    let stableCount = 0;

    function check() {
      const newRect = element.getBoundingClientRect();
      const stable =
        newRect.width === lastRect.width && newRect.height === lastRect.height;

      if (stable) {
        stableCount++;
        if (stableCount >= frames) return resolve();
      } else {
        stableCount = 0;
        lastRect = newRect;
      }
      requestAnimationFrame(check);
    }
    requestAnimationFrame(check);
  });
}

export default function DigitalInvitation({
  data,
  onClose,
}: DigitalInvitationProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState("Saving...");

  // Force decode image agar masuk GPU
  const preloadImages = useCallback(async () => {
    const urls = Object.values(images);
    await Promise.all(
      urls.map(async (url) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = "anonymous";
        try {
          await img.decode();
        } catch {
          await new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        }
      })
    );
  }, []);

  const handleSave = useCallback(async () => {
    if (!stackRef.current || isGenerating) return;

    try {
      setIsGenerating(true);
      setLoadingText("Preparing..."); // 1. Aset Loading

      await preloadImages();
      await document.fonts.ready;
      await waitForDomFullyStable(stackRef.current, 15); // 2. Loop Retry Mechanism

      let validDataUrl = "";
      let attempts = 0;
      const maxAttempts = 3;
      const minSizeByte = 300 * 1024; // 300KB

      while (attempts < maxAttempts) {
        attempts++;
        setLoadingText(
          attempts > 1 ? `Retrying (${attempts})...` : "Rendering..."
        );

        const dataUrl = await toPng(stackRef.current, {
          cacheBust: true,
          pixelRatio: 3,
          quality: 1.0,
          skipAutoScale: true,
          backgroundColor: "#F5F5F4",
        });

        const res = await fetch(dataUrl);
        const blob = await res.blob();

        console.log(`Attempt ${attempts} size:`, blob.size);

        if (blob.size > minSizeByte) {
          validDataUrl = dataUrl;
          break;
        }
        await new Promise((r) => setTimeout(r, 500));
      }

      if (!validDataUrl) {
        throw new Error("Gagal merender gambar utuh setelah 3x percobaan.");
      }

      const filename = `Invitation-${data?.fullName || "Guest"}.png`; // --- PERUBAHAN DI SINI (DIRECT DOWNLOAD ONLY) ---

      // 1. Convert DataURL ke Blob agar lebih stabil saat didownload
      const blob = await (await fetch(validDataUrl)).blob();
      const url = URL.createObjectURL(blob);

      // 2. Buat elemen anchor invisible
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.style.display = "none";

      // 3. Masukkan ke body (PENTING untuk Android/Firefox)
      document.body.appendChild(link);

      // 4. Klik otomatis
      link.click();

      // 5. Bersihkan memori
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // --- SELESAI PERUBAHAN ---
    } catch (err) {
      console.error("Error saving:", err);
      alert("Gagal menyimpan gambar. Silakan coba lagi.");
    } finally {
      setIsGenerating(false);
      setLoadingText("Saving...");
    }
  }, [isGenerating, preloadImages, data?.fullName]);

  const eventDetails = {
    date: "Friday, Dec 19 2025",
    time: "18.30 - 21.00 WIB",
    location: "Chapel 3 GMS Alam Sutera",
  };

  return (
    <div
      className="flex min-h-screen items-start justify-center px-4 py-8 overflow-y-auto font-sans"
      style={{ backgroundColor: "#7E0A06" }}
    >
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
          {/* --- POSTCARD DESIGN --- */}
          {/* Container utama tanpa height fix, tinggi mengikuti gambar */}
          <div className="relative w-full shadow-none rounded-none overflow-hidden bg-[#f4f1ea]">
            {/* LAYER 1: GAMBAR BASE (Menentukan ukuran container) */}
            <img
              src={images.paperTexture}
              alt="Postcard Background"
              className="w-full h-auto block object-contain pointer-events-none"
              crossOrigin="anonymous" // Penting untuk html-to-image
            />

            {/* LAYER 2: KONTEN (Overlay Absolute) */}
            {/* inset-0 membuat div ini menutupi persis area gambar */}
            <div className="absolute inset-0 flex flex-row">
              {/* --- KOLOM KIRI (58% Lebar) --- */}
              {/* pl-[6%] pr-[2%] untuk menjaga jarak dari border kiri dan garis tengah */}
              <div className="w-[60%] h-full flex flex-col justify-center pl-[8%] pr-[2%] space-y-[13%]">
                {/* Judul */}
                <h1
                  className="text-[5vw] sm:text-[2.5rem] leading-[0.9] text-red-900 transform -rotate-2 ml-1"
                  style={{ fontFamily: "var(--font-handwritten)" }}
                >
                  “I'll be Home <br />{" "}
                  <span className="pl-[10%]">for Christmas”</span>
                </h1>

                {/* Detail Event */}
                <div className="font-mono text-[2.2vw] sm:text-[11px] text-sepia-900 space-y-[1%] tracking-tight opacity-90 mt-[2%]">
                  <p>{eventDetails.date}</p>
                  <p>{eventDetails.time}</p>
                  <p>{eventDetails.location}</p>
                </div>

                {/* Note Kecil */}
                <p className="font-mono text-[2.2vw] sm:text-[9px] leading-tight text-sepia-800 italic opacity-80 max-w-[95%]">
                  Don’t forget your gift & wear the decided costumes!
                </p>
              </div>

              {/* --- KOLOM KANAN (42% Lebar) --- */}
              {/* pl-[4%] agar teks tidak menabrak garis pemisah tengah */}
              <div className="w-[40%] h-full relative pl-[4%] pr-[4%] flex flex-col">
                {/* Bagian "To" (Nama Tamu) */}
                {/* top-[38%] menempatkan teks di bawah area perangko */}
                <div className="absolute top-[45%] left-[4%] right-[8%]">
                  <p className="font-mono text-[2vw] sm:text-[10px] text-sepia-800 mb-[1%]">
                    to:
                  </p>
                  <h2 className="font-mono text-[2.8vw] sm:text-[14px] font-bold text-red-800 leading-tight break-words border-b border-dashed border-sepia-900/30 pb-[1%]">
                    {(data?.fullName || "Dearest Friend")
                      .split(" ")
                      .slice(0, 2)
                      .join(" ")}
                  </h2>
                </div>

                {/* Bagian "From" (Coach Jessie) */}
                {/* bottom-[8%] menempatkan teks di area bawah */}
                <div className="absolute bottom-[18%] left-[4%]">
                  <p className="font-mono text-[2vw] sm:text-[10px] text-sepia-800">
                    from:
                  </p>
                  <p
                    className="text-[3.8vw] sm:text-[1.8rem] text-sepia-900 transform -rotate-2 mt-[1%]"
                    style={{ fontFamily: "var(--font-handwritten)" }}
                  >
                    Coach Jessie
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* --- END POSTCARD --- */}

          {/* DRESSCODE */}
          <div className="relative w-full overflow-hidden border bg-white shadow-none">
            <img
              src={images.dresscodeInfo}
              crossOrigin="anonymous"
              loading="eager"
              alt="Dresscode"
              className="w-full h-auto block"
            />
          </div>

          {/* GIFT */}
          <div className="relative w-full overflow-hidden border bg-white shadow-none">
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
        <div className="flex gap-3 p-3 rounded-xl bg-stone-100 backdrop-blur-sm border shadow-lg sticky bottom-4 z-40">
          <button
            onClick={handleSave}
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg font-bold active:scale-95 disabled:opacity-60 transition-all hover:bg-red-900"
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" /> {loadingText}
              </>
            ) : (
              <>
                <Download size={18} /> Save Invitation
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-3 bg-stone-300 text-stone-800 rounded-lg active:scale-95 hover:bg-stone-300 transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
