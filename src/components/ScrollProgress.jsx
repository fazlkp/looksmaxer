// ─── components/ScrollProgress.jsx ──────────────────────────
import { useScrollProgress, useScrollY } from "../hooks";

export function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[9999] transition-all duration-100"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(to right, rgba(0,136,169,1), rgba(0,200,255,1))",
      }}
    />
  );
}

export function ScrollToTopButton() {
  const scrollY = useScrollY();
  const visible = scrollY > 400;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[rgba(0,136,169,1)] flex items-center justify-center text-white text-lg shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all duration-300 hover:bg-[rgba(0,136,169,0.8)] hover:scale-110 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      ↑
    </button>
  );
}
