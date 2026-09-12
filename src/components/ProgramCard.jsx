// ─── components/ProgramCard.jsx ──────────────────────────────
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "../hooks";
import { cart, toast, formatPrice } from "../utils";

export default function ProgramCard({ plan }) {
  const { title, price, features, accent, bgImage, season } = plan;
  const navigate = useNavigate();
  const [ref, isVisible] = useIntersectionObserver();

  const handlePurchase = () => {
    cart.savePlan(plan);
    toast.info(`${title} selected! Redirecting to payment...`);
    setTimeout(() => navigate("/payment"), 1000);
  };

  const accentStyle =
    accent === "yellow"
      ? { color: "#e8d900", rgb: "232,217,0", glowBox: "-2px -1px 10px rgb(194,223,6)" }
      : { color: "rgba(0,136,169,1)", rgb: "0,136,169", glowBox: "-2px -1px 10px rgba(0,136,169,1)" };

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""} program-card flex-1 min-w-[280px] max-w-[47%] rounded-[20px] overflow-hidden relative`}
      style={{
        "--accent": accentStyle.color,
        "--accent-rgb": accentStyle.rgb,
      }}
    >
      {/* Animated glow border ring */}
      <div className="program-border absolute inset-0 rounded-[20px] pointer-events-none z-[3]" />

      {/* Background image + scrim */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(rgba(0,0,0,.82),rgba(0,0,0,.9)), url(${bgImage}) center/cover no-repeat`,
        }}
      />

      {/* Subtle top glow wash */}
      <div className="program-wash absolute inset-0 z-[1] pointer-events-none" />

      <div className="relative z-[2] p-8 flex flex-col h-full">
        {/* Season Badge */}
        <span
          className="program-badge self-start text-xs font-montserrat font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest"
          style={{
            background: `rgba(${accentStyle.rgb},0.14)`,
            color: accentStyle.color,
            border: `1px solid ${accentStyle.color}`,
          }}
        >
          {season}
        </span>

        {/* Title */}
        <h2
          className="text-2xl font-montserrat font-black mb-5 drop-shadow-[0_0_14px_rgba(var(--accent-rgb),0.35)]"
          style={{ color: accentStyle.color }}
        >
          {title}
        </h2>

        {/* Features — glass panel */}
        <ul className="program-features flex-1 space-y-3 list-none mb-6 rounded-xl p-4">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center gap-3 text-[azure]/85 text-[14px] font-[Verdana]">
              <span style={{ color: accentStyle.color }} className="text-lg leading-none">◆</span>
              {feat}
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="mb-5">
          <span className="program-price text-green-400 font-montserrat font-black text-2xl">
            {formatPrice(price)}
          </span>
          <span className="text-[azure]/50 text-sm font-[Verdana] ml-1">/month</span>
        </div>

        {/* CTA */}
        <button
          onClick={handlePurchase}
          className="program-cta w-full h-11 rounded-[20px] font-montserrat font-bold text-sm cursor-pointer transition-transform duration-300 hover:scale-[1.03] relative overflow-hidden"
          style={{
            background: accentStyle.color,
            color: accent === "yellow" ? "black" : "white",
          }}
        >
          <span className="relative z-[1]">Purchase Now →</span>
        </button>
      </div>
    </div>
  );
}