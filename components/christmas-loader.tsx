import { Gift, Snowflake } from "lucide-react";

export default function ChristmasLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#7E0A06] text-white transition-opacity duration-500">
      {/* Background Pattern (Optional - sangat ringan) */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="relative flex flex-col items-center gap-6 p-4">
        {/* Ikon Animasi */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse" />
          <Gift
            size={64}
            className="relative z-10 animate-bounce text-amber-100"
          />
          <Snowflake
            size={24}
            className="absolute -top-2 -right-4 animate-spin-slow text-white/80"
          />
          <Snowflake
            size={20}
            className="absolute -bottom-1 -left-4 animate-spin-slow text-white/60"
            style={{ animationDuration: "3s" }}
          />
        </div>

        {/* Teks Loading */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-serif font-bold tracking-wider text-amber-50">
            Wrapping your Invitation...
          </h3>
          <p className="text-sm font-mono text-white/70 animate-pulse">
            Please wait a moment
          </p>
        </div>
      </div>

      {/* CSS untuk animasi putar lambat */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
