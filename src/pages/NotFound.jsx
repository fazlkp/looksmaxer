// ─── pages/NotFound.jsx ──────────────────────────────────────
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks";

export default function NotFound() {
  usePageTitle("404 — Page Not Found");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#24252A] text-center px-6">
      <h1
        className="font-montserrat font-black text-[120px] md:text-[180px] leading-none"
        style={{
          color: "transparent",
          WebkitTextStroke: "2px rgba(0,136,169,1)",
          textShadow: "0 0 40px rgba(0,136,169,0.3)",
        }}
      >
        404
      </h1>
      <p className="font-montserrat font-bold text-2xl text-[azure] mt-4 mb-2">
        Page Not Found
      </p>
      <p className="text-[azure]/60 font-[Verdana] text-sm mb-10 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="h-11 px-10 bg-[rgba(0,136,169,1)] border-none rounded-[50px] font-montserrat font-bold text-white text-sm cursor-pointer hover:bg-[rgba(0,136,169,0.7)] transition-all hover:scale-105">
          ← Back to Home
        </button>
      </Link>
    </div>
  );
}
