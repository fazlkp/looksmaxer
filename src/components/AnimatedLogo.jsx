export default function AnimatedLogo() {
  return (
    <span className="animated-logo font-montserrat font-black text-2xl tracking-tight select-none">
      <style>{`
        .animated-logo {
          background: linear-gradient(90deg, #ffffff, #00d2e6, #0088a9, #7fe8f2, #ffffff);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: logoShine 4s linear infinite, logoGlow 2.5s ease-in-out infinite;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .animated-logo:hover {
          transform: scale(1.05);
        }

        @keyframes logoShine {
          to { background-position: 300% center; }
        }

        @keyframes logoGlow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(0, 210, 230, 0.35)); }
          50%      { filter: drop-shadow(0 0 14px rgba(0, 210, 230, 0.85)); }
        }
      `}</style>
      LooksMaxer
    </span>
  );
}