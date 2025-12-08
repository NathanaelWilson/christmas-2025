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
    <div className="flex min-h-screen items-start justify-center px-4 py-8 bg-stone-100 overflow-y-auto font-sans">
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
          <div className="relative w-full aspect-[3/2] overflow-hidden shadow-md text-sepia-900 bg-[#f4f1ea]">
            <div
              className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-90"
              style={{
                backgroundImage: `url(${images.paperTexture})`,
              }}
            />
            <div className="relative h-full w-full p-6 sm:p-8 flex flex-row">
              <div className="w-[60%] flex flex-col justify-center pr-4 space-y-6 ml-2">
                <h1
                  className="text-[18px] sm:text-[2.8rem] leading-[0.9] text-red-900 transform -rotate-2"
                  style={{ fontFamily: "var(--font-handwritten)" }}
                >
                  “I'll be Home <br />{" "}
                  <span className="pl-4">for Christmas”</span>
                </h1>
                <div className="font-mono text-[10px] sm:text-[10px] text-sepia-900 space-y-1 tracking-tight opacity-90">
                  <p className="">{eventDetails.date}</p>
                  <p className="">{eventDetails.time}</p>
                  <p className="">{eventDetails.location}</p>
                </div>
                <p className="font-mono text-[11px] sm:text-[9px] leading-tight text-sepia-800 italic opacity-80 max-w-[90%]">
                  Don’t forget your gift & wear the decided costumes!
                </p>
              </div>
              <div className="w-[45%] relative pl-5 flex flex-col border-l border-sepia-900/20">
                <div className="mt-12 mb-3 pt-10">
                  <p className="font-mono text-[10px] text-sepia-800 mb-1">
                    to:
                  </p>
                  <h2 className="font-mono text-[14px] sm:text-xl font-bold text-red-800 leading-tight break-words border-b border-dashed border-sepia-900/30 pb-1">
                    {(data?.fullName || "Dearest Friend")
                      .split(" ")
                      .slice(0, 2)
                      .join(" ")}
                  </h2>
                </div>
                <div className="pb-2 mt-auto">
                  <p className="font-mono text-[10px] text-sepia-800">from:</p>
                  <p
                    className="text-[15px] sm:text-2xl text-sepia-900 transform -rotate-2"
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
          <div className="relative w-full overflow-hidden rounded-lg border bg-white shadow-sm">
            <img
              src={images.dresscodeInfo}
              crossOrigin="anonymous"
              loading="eager"
              alt="Dresscode"
              className="w-full h-auto block"
            />
          </div>

          {/* GIFT */}
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
            className="px-4 py-3 bg-stone-200 text-stone-800 rounded-lg active:scale-95 hover:bg-stone-300 transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
