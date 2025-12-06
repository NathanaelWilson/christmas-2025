"use client";

import { Star } from "lucide-react";

export default function HeroSection() {
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

            {/* Info tambahan kecil di bawah button (opsional) */}
            <div className="mt-0 text-white/90 font-medium drop-shadow-md">
              <p>December 19, 2025 • 6:00 PM</p>
            </div>
        </div>

      </div>

    </section>
  );
}