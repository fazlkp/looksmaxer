// ─── components/Navbar.jsx ───────────────────────────────────
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrollY } from "../hooks";
import AnimatedLogo from "./AnimatedLogo";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Male", to: "/" },
  { label: "Female", to: "/female" },
  { label: "Premium", to: "/#premium" },
  { label: "About", to: "/about" },
];

const AI_TOOLS = [
  { label: "Face Analysis", to: "/face-analysis", icon: "🧑" },
  { label: "Voice Analysis", to: "/voice-analysis", icon: "🎙️" },
  { label: "Body Analysis", to: "/body-analysis", icon: "🏋️" },
];

export default function Navbar() {
  const scrollY = useScrollY();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const closeTimer = useRef(null);
  const isScrolled = scrollY > 60;

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileToolsOpen(false);
  }, [location]);

  const scrollToPremium = (e) => {
    e.preventDefault();
    const el = document.getElementById("premium");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openTools = () => {
    clearTimeout(closeTimer.current);
    setToolsOpen(true);
  };
  const closeToolsDelayed = () => {
    closeTimer.current = setTimeout(() => setToolsOpen(false), 150);
  };

  const isAiToolActive = AI_TOOLS.some((t) => t.to === location.pathname);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? "bg-[#24252A]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      } border-b-[3px] border-[rgba(0,136,169,1)]`}
    >
      <style>{`
        .navdrop {
          animation: navdropIn 0.18s ease forwards;
          background: rgba(20, 21, 25, 0.97);
          border: 1px solid rgba(0,136,169,0.35);
          backdrop-filter: blur(10px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.5), 0 0 20px rgba(0,136,169,0.15);
        }
        @keyframes navdropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .navdrop-item:hover {
          background: rgba(0,136,169,0.12);
        }
      `}</style>

      <div className="flex justify-between items-center px-[10%] py-2">
        {/* Logo */}
        <Link to="/" aria-label="LooksMaxer Home">
          <AnimatedLogo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 list-none">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={label}>
                {to === "/#premium" ? (
                  <button
                    onClick={scrollToPremium}
                    className="nav-link font-montserrat font-bold text-azure text-[13.5px] text-[azure] hover:text-[rgba(0,136,169,1)] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    to={to}
                    className={`nav-link font-montserrat font-bold text-[13.5px] transition-colors duration-300 no-underline ${
                      location.pathname === to
                        ? "text-[rgba(0,136,169,1)] active"
                        : "text-[azure] hover:text-[rgba(0,136,169,1)]"
                    }`}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}

            {/* AI Tools dropdown */}
            <li
              className="relative"
              onMouseEnter={openTools}
              onMouseLeave={closeToolsDelayed}
            >
              <button
                className={`nav-link flex items-center gap-1 font-montserrat font-bold text-[13.5px] transition-colors duration-300 bg-transparent border-none cursor-pointer ${
                  isAiToolActive ? "text-[rgba(0,136,169,1)]" : "text-[azure] hover:text-[rgba(0,136,169,1)]"
                }`}
              >
                AI Tools
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className={`transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {toolsOpen && (
                <div className="navdrop absolute top-full right-0 mt-3 w-56 rounded-xl overflow-hidden py-2">
                  {AI_TOOLS.map((tool) => (
                    <Link
                      key={tool.to}
                      to={tool.to}
                      className="navdrop-item flex items-center gap-3 px-4 py-2.5 text-[13px] font-[Verdana] text-[azure]/85 no-underline transition-colors"
                    >
                      <span className="text-base">{tool.icon}</span>
                      {tool.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* CTA Button */}
        <Link to="/register" className="hidden md:block">
          <button className="h-[32px] px-5 bg-[rgba(0,136,169,1)] border-none rounded-[50px] cursor-pointer font-montserrat font-bold text-[azure] text-[13px] hover:bg-[rgba(0,136,169,0.15)] hover:shadow-[0_0_15px_rgba(0,136,169,0.6)] transition-all duration-300">
            Join Now
          </button>
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[azure] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[azure] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[azure] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu md:hidden ${menuOpen ? "open" : ""}`}>
        <nav className="px-[10%] pb-4 bg-[#24252A]/95 backdrop-blur-md">
          <ul className="flex flex-col gap-3 list-none">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to === "/#premium" ? "/" : to}
                  onClick={to === "/#premium" ? scrollToPremium : undefined}
                  className="font-montserrat font-bold text-[13.5px] text-[azure] hover:text-[rgba(0,136,169,1)] transition-colors no-underline block py-1"
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* AI Tools (mobile collapsible) */}
            <li>
              <button
                onClick={() => setMobileToolsOpen((o) => !o)}
                className="w-full flex items-center justify-between font-montserrat font-bold text-[13.5px] text-[azure] hover:text-[rgba(0,136,169,1)] transition-colors bg-transparent border-none cursor-pointer py-1"
              >
                AI Tools
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className={`transition-transform duration-200 ${mobileToolsOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileToolsOpen && (
                <ul className="flex flex-col gap-2 mt-2 pl-4 list-none">
                  {AI_TOOLS.map((tool) => (
                    <li key={tool.to}>
                      <Link
                        to={tool.to}
                        className="flex items-center gap-2 text-[13px] font-[Verdana] text-[azure]/75 hover:text-[rgba(0,136,169,1)] no-underline py-1"
                      >
                        <span>{tool.icon}</span>
                        {tool.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link to="/register">
                <button className="w-full h-[32px] bg-[rgba(0,136,169,1)] border-none rounded-[50px] cursor-pointer font-montserrat font-bold text-[azure] text-[13px]">
                  Join Now
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}