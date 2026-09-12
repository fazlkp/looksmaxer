// ─── components/Footer.jsx ───────────────────────────────────
import { Link } from "react-router-dom";
import { toast } from "../utils";
const logo = process.env.PUBLIC_URL + "/logo.png";

export default function Footer() {
  const handleFeedback = () => {
    const msg = window.prompt("We'd love your feedback! Share your thoughts:");
    if (msg && msg.trim()) {
      toast.success("Thank you for your feedback! 🙌");
    }
  };

  return (
    <footer className="border-t-[3px] border-[rgba(0,136,169,1)]">
      {/* ── Main Footer ── */}
      <div className="bg-[#1a1b1f] px-[10%] py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <img src={logo} alt="LooksMaxer" className="h-[20px] mb-3" />
          <p className="text-[azure]/70 text-sm font-[Verdana] leading-relaxed">
            Unleash your full potential through science-backed self-improvement, grooming, and lifestyle enhancement.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-montserrat font-bold text-[rgba(0,136,169,1)] mb-3 text-sm uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2 list-none">
            {[
              { label: "Home", to: "/" },
              { label: "Female Section", to: "/female" },
              { label: "Premium Plans", to: "/#premium" },
              { label: "Register", to: "/register" },
              { label: "Login", to: "/login" },
            ].map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-[azure]/60 text-sm hover:text-[rgba(0,136,169,1)] transition-colors no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-montserrat font-bold text-[rgba(0,136,169,1)] mb-3 text-sm uppercase tracking-wider">
            Connect
          </h4>
          <ul className="space-y-2 list-none text-sm text-[azure]/60">
            <li>
              <a href="mailto:contact@looksmaxer.com" className="hover:text-[rgba(0,136,169,1)] transition-colors no-underline">
                contact@looksmaxer.com
              </a>
            </li>
            <li>
              <a href="#community" className="hover:text-[rgba(0,136,169,1)] transition-colors no-underline">
                Join Our Community
              </a>
            </li>
            <li>
              <button
                onClick={handleFeedback}
                className="text-[azure]/60 text-sm hover:text-[rgba(0,136,169,1)] transition-colors bg-transparent border-none cursor-pointer p-0 font-[Verdana]"
              >
                Send Feedback
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="bg-[#24252A] px-[10%] py-3 flex flex-col md:flex-row justify-between items-center gap-2 border-t border-[rgba(0,136,169,0.3)]">
        <img src={logo} alt="logo" className="h-[16px] opacity-60" />
        <p className="text-[azure]/40 text-xs font-[Verdana]">
          © {new Date().getFullYear()} LooksMaxer. Copyrighted by Fazl KP. All rights reserved.
        </p>
        <div className="flex gap-4 text-xs">
          <a href="#" className="text-[azure]/40 hover:text-[rgba(0,136,169,1)] no-underline transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-[azure]/40 hover:text-[rgba(0,136,169,1)] no-underline transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
