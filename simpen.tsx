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
      `}</style>;
