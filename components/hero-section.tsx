"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-12-19T19:00:00+07:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById("registration-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // 1. Parent container relative agar child absolute patuh pada area ini
    // h-screen w-full
    <section className="relative h-screen w-full overflow-hidden bg-red-800">
      {/* --- STYLE SALJU (TETAP SAMA) --- */}
      <style>{`
        @keyframes fall-wind {
          0% { transform: translateY(0vh) translateX(0); opacity: 1; }
          25% { transform: translateY(25vh) translateX(-15px); }
          50% { transform: translateY(50vh) translateX(5px); }
          75% { transform: translateY(75vh) translateX(-10px); opacity: 0.5; }
          100% { transform: translateY(100vh) translateX(-30px); opacity: 0.0; }
        }
        .snowfall { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 20; pointer-events: none; }
        .snowflake { position: absolute; top: -10vh; width: 10px; height: 10px; background: white; border-radius: 50%; animation: fall-wind linear infinite; }
        .snowflake:nth-child(1) { left: 10%; animation-duration: 13s; }
        .snowflake:nth-child(2) { left: 20%; animation-duration: 11s; animation-delay: 2s; width: 6px; height: 6px; }
        .snowflake:nth-child(3) { left: 35%; animation-duration: 15s; animation-delay: 4s; }
        .snowflake:nth-child(4) { left: 50%; animation-duration: 10s; animation-delay: 1s; width: 8px; height: 8px; }
        .snowflake:nth-child(5) { left: 70%; animation-duration: 12s; animation-delay: 3s; }
        .snowflake:nth-child(6) { left: 85%; animation-duration: 14s; animation-delay: 5s; width: 7px; height: 7px; }
        .snowflake:nth-child(7) { left: 5%; animation-duration: 16s; animation-delay: 1s; width: 9px; height: 9px; }
        .snowflake:nth-child(8) { left: 45%; animation-duration: 9s; animation-delay: 0.5s; width: 5px; height: 5px; }
        .snowflake:nth-child(9) { left: 60%; animation-duration: 12s; animation-delay: 2.5s; }
        .snowflake:nth-child(10) { left: 95%; animation-duration: 15s; animation-delay: 4s; width: 8px; height: 8px; }
      `}</style>

      {/* --- LAYER 1: BACKGROUND IMAGE UTAMA (LOGO) --- */}
      {/* Absolute inset-0 agar gambar memenuhi layar. Gunakan flex/grid untuk centering. */}
      {/* z-0 agar di lapisan paling bawah */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/Logo.png"
          alt="Christmas Background Logo"
          className="w-full h-full object-contain object-center"
        />
        {/* Opsional: Overlay gelap sedikit agar tulisan/button lebih pop-up */}
        {/* <div className="absolute inset-0 bg-black/10" /> */}
      </div>

      {/* --- LAYER 2: EFEK SALJU --- */}
      <div className="snowfall">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="snowflake" />
        ))}
      </div>

      {/* --- LAYER 3: KONTEN (BUTTON & INFO) --- */}
      {/* z-30 agar di atas background dan salju. Gunakan flex col untuk centering dan pt/mt untuk penyesuaian posisi vertikal */}
      {/* items-center dan w-full untuk centering horizontal */}
      <div className="relative z-30 flex h-full w-full flex-col items-center">
        {/* TRICK: Gunakan padding-top (pt-...) untuk menentukan posisi vertikal tombol. */}
        {/* Sesuaikan nilai 'pt-[75vh]' ini sampai button pas di posisi yang diinginkan (misalnya di bawah logo). */}
        <div className="pt-[80vh] text-center space-y-6">
          {/* Button dibuat menarik dengan shadow agar kontras dengan BG merah */}
          <button
            onClick={scrollToForm}
            className="
                group relative px-8 py-3 rounded-full 
                bg-emerald-600 text-white font-bold text-lg
                shadow-[0_0_20px_rgba(5,150,105,0.5)]
                hover:bg-emerald-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(5,150,105,0.7)]
                transition-all duration-300 ease-out
                border-2 border-emerald-400/30
              "
          >
            Open Invitation
            {/* Efek kilau kecil */}
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <div className="mt-0 text-white/90 font-medium drop-shadow-md space-y-3">
            <p className="text-lg font-semibold tracking-wide">
              December 19, 2025 • 7:00 PM WIB
            </p>

            {/* COUNTDOWN - single clean box */}
            <div className="flex items-center justify-center">
              <div className="flex items-stretch bg-white/6 backdrop-blur-sm border border-white/20 rounded-xl px-2 py-2 shadow-sm">
                <div className="flex items-center divide-x divide-white/10 w-full">
                  <div className="w-16 sm:w-20 px-2 text-center flex-shrink-0">
                    <div className="text-2xl font-semibold text-white font-mono">
                      {String(timeLeft.days).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-white/80 uppercase mt-1">
                      Days
                    </div>
                  </div>

                  <div className="w-16 sm:w-20 px-2 text-center flex-shrink-0">
                    <div className="text-2xl font-semibold text-white font-mono">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-white/80 uppercase mt-1">
                      Hours
                    </div>
                  </div>

                  <div className="w-16 sm:w-20 px-2 text-center flex-shrink-0">
                    <div className="text-2xl font-semibold text-white font-mono">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-white/80 uppercase mt-1">
                      Minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
