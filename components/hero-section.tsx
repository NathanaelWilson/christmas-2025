"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  // const isMobile = typeof window !== "undefined" && window.innerWidth <= 480;

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
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#7E0A06" }}
    >
      {/* 🔥 Overlay WARNING untuk non-HP */}
      {/* {!isMobile && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-red-900 text-white text-center p-6">
          <p className="text-2xl font-bold mb-3">⚠️ Warning</p>
          <p className="text-lg font-medium">
            This invitation is optimized for mobile view.
            <br />
            Please open this link on your phone.
          </p>
        </div>
      )} */}

      {/* --- SALJU --- */}
      <style>{`
        @keyframes fall-wind {
          0% { transform: translateY(0vh) translateX(0); opacity: 1; }
          25% { transform: translateY(25vh) translateX(-10px); }
          50% { transform: translateY(50vh) translateX(8px); }
          75% { transform: translateY(75vh) translateX(-5px); opacity: 0.5; }
          100% { transform: translateY(100vh) translateX(-20px); opacity: 0.0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
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
        .logo-floating {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* SALJU */}
      <div className="snowfall">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="snowflake" />
        ))}
      </div>

      {/* --- KONTEN UTAMA --- */}
      {/* Content container - logo is part of normal flow */}
      <div className="relative z-30 flex h-full w-full flex-col items-center justify-center gap-0 px-4">
        {/* Logo with floating animation */}
        <img
          src="/LOGO-Christmas.webp"
          alt="Logo"
          className="logo-floating h-200 w-200 object-contain"
        />

        {/* TOMBOL */}
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
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* INFO WAKTU */}
        <div className="mt-6 text-white/90 font-medium text-center drop-shadow-md">
          <p className="text-lg font-semibold tracking-wide">
            December 19, 2025 • 7:00 PM WIB
          </p>

          {/* COUNTDOWN */}
          <div className="flex items-center justify-center mt-2">
            <div className="flex items-stretch bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-2 py-3 shadow-sm gap-0">
              <div className="flex items-center divide-x divide-white/10">
                <div className="w-20 px-3 text-center flex-shrink-0">
                  <div className="text-2xl font-semibold text-white font-mono">
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-white/80 uppercase mt-1">
                    Days
                  </div>
                </div>

                <div className="w-20 px-3 text-center flex-shrink-0">
                  <div className="text-2xl font-semibold text-white font-mono">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-white/80 uppercase mt-1">
                    Hours
                  </div>
                </div>

                <div className="w-20 px-3 text-center flex-shrink-0">
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
    </section>
  );
}
