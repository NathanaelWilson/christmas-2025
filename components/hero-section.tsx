"use client";

import { Star, Trees } from "lucide-react";

export default function HeroSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById("registration-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-b from-red-700 to-red-500">
      <style>{`
        /* Gerakan jatuh + goyangan kiri-kanan seperti tertiup angin */
        @keyframes fall-wind {
          0% {
            transform: translateY(0vh) translateX(0);
            opacity: 1;
          }
          25% {
            transform: translateY(25vh) translateX(-15px);
          }
          50% {
            transform: translateY(50vh) translateX(5px);
          }
          75% {
            transform: translateY(75vh) translateX(-10px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(100vh) translateX(-30px);
            opacity: 0.0;
          }
        }

        .snowfall {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 40;
          overflow: hidden;
          pointer-events: none;
        }

        .snowflake {
          position: absolute;
          top: -10vh;
          width: 12px;
          height: 12px;
          background: #ffffff;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);

          animation: fall-wind linear infinite;
          will-change: transform, opacity;
        }

        /* RANDOM EFFECTS: tiap snowflake beda ukuran, speed, delay, dan goyangan */
        .snowflake:nth-child(1)  { left: 10%;  animation-duration: 13s; animation-delay: 0s; }
        .snowflake:nth-child(2)  { left: 20%;  animation-duration: 11s;  animation-delay: 3.5s; width: 8px; height: 8px; }
        .snowflake:nth-child(3)  { left: 35%;  animation-duration: 15s; animation-delay: 2.2s; width: 14px; height: 14px; }
        .snowflake:nth-child(4)  { left: 45%;  animation-duration: 12s; animation-delay: 0.7s; width: 9px; height: 9px; }
        .snowflake:nth-child(5)  { left: 55%;  animation-duration: 14s; animation-delay: 8.4s; width: 13px; height: 13px; }
        .snowflake:nth-child(6)  { left: 65%;  animation-duration: 10s;  animation-delay: 0.4s; width: 7px; height: 7px; }
        .snowflake:nth-child(7)  { left: 75%;  animation-duration: 16s; animation-delay: 3.1s; width: 11px; height: 11px; }
        .snowflake:nth-child(8)  { left: 85%;  animation-duration: 12.5s; animation-delay: 1.1s; width: 9px; height: 9px; }
        .snowflake:nth-child(9)  { left: 93%;  animation-duration: 14.5s; animation-delay: 4.6s; width: 12px; height: 12px; }
        .snowflake:nth-child(10) { left: 5%;   animation-duration: 11.8s;  animation-delay: 6.7s; width: 7px; height: 7px; }
      `}</style>

      {/* Snowfall Container - Fixed Background */}
      <div className="snowfall">
        <div className="snowflake">
          <div className="flake" />
        </div>
        <div className="snowflake">
          <div className="flake" />
        </div>
        <div className="snowflake">
          <div className="flake" />
        </div>
        <div className="snowflake">
          <div className="flake" />
        </div>
        <div className="snowflake">
          <div className="flake" />
        </div>
        <div className="snowflake">
          <div className="flake" />
        </div>
        <div className="snowflake">
          <div className="flake" />
        </div>
        <div className="snowflake">
          <div className="flake" />
        </div>
        <div className="snowflake">
          <div className="flake" />
        </div>
        <div className="snowflake">
          <div className="flake" />
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="absolute top-8 left-6 text-emerald-600 opacity-70">
          <Star size={28} fill="currentColor" />
        </div>
        <div className="absolute top-16 right-10 text-emerald-600 opacity-70">
          <Trees size={32} />
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <h1 className="text-balance text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
            I'll be Home for Christmas
          </h1>

          <div className="space-y-2">
            <p className="text-lg font-semibold text-emerald-700">
              December 25, 2024
            </p>
            <p className="text-base text-slate-600">6:00 PM - 9:00 PM</p>
            <p className="text-base text-slate-600">Community Church Center</p>
          </div>

          <button
            onClick={scrollToForm}
            className="mx-auto mt-8 block rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-700 active:scale-95"
          >
            Register Now
          </button>
        </div>

        {/* Decorative bottom element */}
        <div className="absolute bottom-8 right-8 text-red-500 opacity-60">
          <Star size={20} fill="currentColor" />
        </div>
      </div>
    </section>
  );
}
