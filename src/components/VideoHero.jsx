import { useRef, useEffect, useState } from "react";

export default function VideoHero({ title, ctaLabel, onCta, borderBottom = true, borderTop = false }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [typedTitle, setTypedTitle] = useState("");

  // ── Typewriter reveal for the title ──
  useEffect(() => {
    setTypedTitle("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedTitle(title.slice(0, i));
      if (i >= title.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [title]);

  // ── Canvas particle network ──
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    let width, height;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      const count = Math.min(70, Math.floor((width * height) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // gentle pull toward cursor
        if (mouseRef.current.x !== null) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            p.x += dx * 0.0025;
            p.y += dy * 0.0025;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 210, 230, 0.65)";
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 136, 169, ${0.25 * (1 - dist / 110)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };
    setMouse({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null };
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`hero-glow flex flex-col items-center justify-center text-center relative min-h-[600px] overflow-hidden ${
        borderBottom ? "border-b-[3px] border-[rgba(0,136,169,1)]" : ""
      } ${borderTop ? "border-t-[3px] border-[rgba(0,136,169,1)]" : ""}`}
    >
      <style>{`
        .hero-glow { background: #050506; }

        .hero-gradient {
          background: linear-gradient(-45deg, #050506, #0a2530, #00889a2e, #0a0a0a, #063d47, #05161a);
          background-size: 400% 400%;
          animation: gradientShift 18s ease infinite;
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hero-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }

        .hero-spotlight {
          background: radial-gradient(circle 380px at var(--mx) var(--my), rgba(0,200,220,0.15), transparent 70%);
          transition: background-position 0.05s linear;
        }

        .hero-orb {
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.35;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
        .hero-orb-1 { width: 460px; height: 460px; background: rgba(0,136,169,1); top: -14%; left: -8%; }
        .hero-orb-2 { width: 400px; height: 400px; background: rgba(0,210,230,0.85); bottom: -18%; right: -8%; }

        .hero-badge {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(0,200,220,0.4);
          backdrop-filter: blur(6px);
          animation: badgeFloat 4s ease-in-out infinite;
        }
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }

        .hero-title-wrap { min-height: 1.2em; }
        .hero-title {
          background: linear-gradient(90deg, #ffffff, #7fe8f2, #ffffff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shineText 5s linear infinite;
        }
        @keyframes shineText { to { background-position: 200% center; } }

        .hero-cursor {
          display: inline-block;
          width: 3px;
          height: 0.85em;
          background: rgba(0, 210, 230, 0.9);
          margin-left: 3px;
          vertical-align: middle;
          animation: blink 0.9s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .hero-cta {
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(6px);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(0,136,169,0.5);
        }
        .hero-cta::before {
          content: "";
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          transition: left 0.7s ease;
        }
        .hero-cta:hover::before { left: 130%; }

        .hero-scroll-cue { animation: bounceCue 2.2s ease-in-out infinite; }
        @keyframes bounceCue {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%      { transform: translateY(8px); opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Stat cards ── */
        .stat-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
          border: 1px solid rgba(0,136,169,0.25);
          backdrop-filter: blur(8px);
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .stat-card:hover { transform: translateY(-4px); border-color: rgba(0,200,220,0.6); box-shadow: 0 8px 28px rgba(0,136,169,0.25); }
        .stat-glow { background: radial-gradient(circle at 50% 0%, rgba(0,136,169,0.25), transparent 70%); opacity: 0; transition: opacity 0.35s ease; }
        .stat-card:hover .stat-glow { opacity: 1; }

        /* ── Program cards ── */
        .program-card { box-shadow: 0 8px 30px rgba(0,0,0,0.5); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease; }
        .program-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.6), 0 0 30px rgba(var(--accent-rgb), 0.25); }
        .program-border { border: 1px solid rgba(var(--accent-rgb), 0.35); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03); transition: border-color 0.4s ease; animation: borderPulse 4s ease-in-out infinite; }
        .program-card:hover .program-border { border-color: rgba(var(--accent-rgb), 0.8); }
        @keyframes borderPulse {
          0%, 100% { box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03), 0 0 0px rgba(var(--accent-rgb), 0); }
          50%      { box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03), 0 0 22px rgba(var(--accent-rgb), 0.18); }
        }
        .program-wash { background: radial-gradient(ellipse 80% 40% at 50% 0%, rgba(var(--accent-rgb), 0.16), transparent 70%); }
        .program-badge { animation: badgeGlow 3s ease-in-out infinite; }
        @keyframes badgeGlow { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.25); } }
        .program-features { background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(4px); }
        .program-price { text-shadow: 0 0 16px rgba(34,197,94,0.5); }
        .program-cta::before {
          content: "";
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
        }
        .program-cta:hover::before { left: 130%; }
      `}</style>

      {/* Layered background */}
      <div className="hero-gradient absolute inset-0 z-0" />
      <canvas ref={canvasRef} className="hero-canvas z-[1]" />
      <div
        className="hero-spotlight absolute inset-0 z-[1] pointer-events-none"
        style={{ "--mx": `${mouse.x}%`, "--my": `${mouse.y}%` }}
      />

      <div
        className="hero-orb hero-orb-1 absolute z-0"
        style={{ transform: `translate(${(mouse.x - 50) * 0.2}px, ${(mouse.y - 50) * 0.2}px)` }}
      />
      <div
        className="hero-orb hero-orb-2 absolute z-0"
        style={{ transform: `translate(${(mouse.x - 50) * -0.15}px, ${(mouse.y - 50) * -0.15}px)` }}
      />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/50 z-[2]" />

      {/* Content */}
      <div
        className="relative z-[3] flex flex-col items-center gap-7 px-6"
        style={{ animation: "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards" }}
      >
        <span className="hero-badge inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[rgba(0,200,220,0.9)] font-[Verdana] font-bold px-4 py-2 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgba(0,220,120,1)] animate-pulse" />
          12,000+ Members Transformed
        </span>

        <h2 className="hero-title-wrap text-4xl md:text-6xl font-montserrat font-black tracking-tight drop-shadow-lg leading-tight">
          <span className="hero-title">{typedTitle}</span>
          <span className="hero-cursor" />
        </h2>

        {onCta && (
          <button
            onClick={onCta}
            className="hero-cta h-12 px-9 rounded-[40px] cursor-pointer font-montserrat font-bold text-[azure] text-sm transition-transform duration-300 hover:scale-105"
            style={{ boxShadow: "0 0 24px rgba(0,136,169,0.55)" }}
          >
            {ctaLabel}
          </button>
        )}
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue absolute bottom-6 z-[3] flex flex-col items-center gap-1 text-[azure]/50">
        <span className="text-[10px] tracking-widest uppercase font-[Verdana]">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}