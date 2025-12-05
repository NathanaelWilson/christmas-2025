export default function TestSnow() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-white to-emerald-50 overflow-hidden">
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-100vh) translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(100px);
          }
          100% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
        }

        .test-snowfall {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          overflow: hidden;
          pointer-events: none;
        }

        .test-snowflake {
          position: absolute;
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(255, 255, 255, 1);
          animation: snowfall 10s linear infinite;
        }

        .test-snowflake:nth-child(1) { left: 10%; animation-delay: 0s; }
        .test-snowflake:nth-child(2) { left: 20%; animation-delay: 1s; }
        .test-snowflake:nth-child(3) { left: 30%; animation-delay: 2s; }
        .test-snowflake:nth-child(4) { left: 40%; animation-delay: 0.5s; }
        .test-snowflake:nth-child(5) { left: 50%; animation-delay: 1.5s; }
        .test-snowflake:nth-child(6) { left: 60%; animation-delay: 0.2s; }
        .test-snowflake:nth-child(7) { left: 70%; animation-delay: 2.5s; }
        .test-snowflake:nth-child(8) { left: 80%; animation-delay: 1.2s; }
        .test-snowflake:nth-child(9) { left: 90%; animation-delay: 0.8s; }
        .test-snowflake:nth-child(10) { left: 5%; animation-delay: 2s; }
      `}</style>

      <div className="test-snowfall">
        <div className="test-snowflake"></div>
        <div className="test-snowflake"></div>
        <div className="test-snowflake"></div>
        <div className="test-snowflake"></div>
        <div className="test-snowflake"></div>
        <div className="test-snowflake"></div>
        <div className="test-snowflake"></div>
        <div className="test-snowflake"></div>
        <div className="test-snowflake"></div>
        <div className="test-snowflake"></div>
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-bold text-slate-900">
          TEST: Snowflake Animation
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Kamu harus lihat salju putih jatuh dari atas ke bawah
        </p>
      </div>
    </div>
  );
}
