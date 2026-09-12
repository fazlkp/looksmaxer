// ─── components/CommunityModal.jsx ───────────────────────────
// Pop-up modal for "Join Community" CTA
import { useEffect, useRef } from "react";
import { useClickOutside } from "../hooks";
import { toast, validators } from "../utils";
import { useState } from "react";

export default function CommunityModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useClickOutside(onClose);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleJoin = () => {
    const { valid, error } = validators.email(email);
    if (!valid) { toast.error(error); return; }
    setSubmitted(true);
    toast.success("You're in! Welcome to the LooksMaxer community 🔥");
    setTimeout(onClose, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center px-4"
         style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div
        ref={ref}
        className="relative w-full max-w-md rounded-2xl overflow-hidden page-enter"
        style={{
          background: "linear-gradient(135deg, #1a1b1f, #24252A)",
          boxShadow: "-2px -1px 30px rgba(0,136,169,0.8)",
          border: "1px solid rgba(0,136,169,0.4)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[azure]/60 hover:text-[azure] hover:bg-white/20 transition-all text-sm font-bold"
        >
          ✕
        </button>

        <div className="p-8">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <span className="text-xs font-montserrat font-bold text-[rgba(0,136,169,1)] uppercase tracking-widest">
                  Free to Join
                </span>
                <h2 className="text-2xl font-montserrat font-black text-white mt-1">
                  Join the Community
                </h2>
                <p className="text-[azure]/60 font-[Verdana] text-sm mt-2 leading-relaxed">
                  Get weekly tips, exclusive content, and connect with thousands of people on the same journey.
                </p>
              </div>

              {/* Perks */}
              <ul className="space-y-2 mb-6 list-none">
                {[
                  "🔥 Weekly looksmaxing tips",
                  "💬 Private community Discord",
                  "📈 Progress tracking tools",
                  "🎯 Exclusive member discounts",
                ].map((perk) => (
                  <li key={perk} className="text-[azure]/75 text-sm font-[Verdana]">{perk}</li>
                ))}
              </ul>

              {/* Email Input */}
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                  placeholder="your@email.com"
                  className="flex-1 h-11 rounded-[8px] px-4 text-white text-sm bg-black/40 border border-[rgba(0,136,169,0.4)] focus:border-[rgba(0,136,169,1)] outline-none transition-all placeholder:text-white/20"
                />
                <button
                  onClick={handleJoin}
                  className="h-11 px-5 bg-[rgba(0,136,169,1)] rounded-[8px] font-montserrat font-bold text-white text-sm hover:bg-[rgba(0,136,169,0.8)] transition-all hover:scale-105 whitespace-nowrap"
                >
                  Join →
                </button>
              </div>
              <p className="text-[azure]/30 text-xs font-[Verdana] mt-2">
                No spam, ever. Unsubscribe anytime.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-montserrat font-black text-white mb-2">
                You're In!
              </h2>
              <p className="text-[azure]/60 font-[Verdana] text-sm">
                Welcome to the LooksMaxer community. Check your email for next steps.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
