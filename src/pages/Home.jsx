// ─── pages/Home.jsx ──────────────────────────────────────────
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoHero from "../components/VideoHero";
import ProgramCard from "../components/ProgramCard";
import CommunityModal from "../components/CommunityModal";
import { useIntersectionObserver, useCountUp, usePageTitle } from "../hooks";
import { analytics, scroll } from "../utils";
import { BG, mainHeroVideo, mainFooterVideo } from "../assets/index.js";

// Videos — place your mp4s in public/videos/ with these names:
//   public/videos/main-hero.mp4   ← "Untitled design.mp4"
//   public/videos/main-footer.mp4 ← "videoplayback (1).mp4"


// ── Data ─────────────────────────────────────────────────────
const MALE_PLANS = [
  {
    id: "summer-male",
    title: "Summer Program",
    season: "Summer",
    price: 20.0,
    accent: "yellow",
    bgImage: BG.summerMale,
    features: [
      "Workout Plan",
      "LooksMaxing Diet",
      "Tan Removal",
      "Eye Area Mastery",
      "Jaw is Law",
      "Personality Development",
      "Summer Outfits Guide",
    ],
  },
  {
    id: "winter-male",
    title: "Winter Program",
    season: "Winter",
    price: 25.99,
    accent: "cyan",
    bgImage: BG.winterMale,
    features: [
      "Workout Plan",
      "LooksMaxing Diet",
      "Silky Skin Routine",
      "Cheekbone Enhancement",
      "Jaw is Law",
      "Personality Development",
      "Meditation & Mindset",
    ],
  },
    {
    id: "elite-male",
    title: "Elite Program",
    season: "All-Season",
    price: 39.99,
    accent: "cyan",
    bgImage: BG.winterMale,
    features: [
      "Everything in Summer & Winter",
      "1-on-1 Coaching Check-ins",
      "Priority Access to AI Analysis Tools",
      "Custom Meal Planning",
      "Advanced Grooming Routine",
    ],
  },
];

const STATS = [
  { value: 12000, label: "Members",       suffix: "+" },
  { value: 98,    label: "Satisfaction",  suffix: "%" },
  { value: 4,     label: "Programs",      suffix: ""  },
  { value: 30,    label: "Day Guarantee", suffix: "-Day" },
];

const BENEFITS = [
  "Boosts Confidence",
  "Improves First Impressions",
  "Enhances Self-Care",
  "Supports Mental Wellness",
  "Strengthens Social Presence",
  "Fosters Discipline",
  "Improves Posture & Body Language",
  "Encourages Physical Health",
  "Increases Professional Opportunities",
  "Boosts Self-Awareness",
];

// ── Stat Counter ──────────────────────────────────────────────
function StatCounter({ value, label, suffix }) {
  const [ref, isVisible] = useIntersectionObserver();
  const count = useCountUp(value, 2000, isVisible);
  return (
    <div ref={ref} className="reveal text-center">
      <p className="text-4xl md:text-5xl font-montserrat font-black text-[rgba(0,136,169,1)]">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-[azure]/60 text-sm font-[Verdana] mt-1">{label}</p>
    </div>
  );

}

// ── Why Section ───────────────────────────────────────────────
function WhySection() {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <section
      ref={ref}
      className={`why-section reveal ${isVisible ? "visible" : ""} mx-2.5 mt-8 rounded-[12px] overflow-hidden relative`}
      style={{
        background: `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.92)), url(${BG.why}) center/cover no-repeat`,
        minHeight: "680px",
      }}
    >
      <div className="why-border absolute inset-0 rounded-[12px] pointer-events-none z-[2]" />
      <div className="why-wash absolute inset-0 z-[1] pointer-events-none" />

      <div className="relative z-[3] p-8 md:p-12">
        <span className="badge-pulse inline-block text-[11px] tracking-[0.3em] uppercase text-[rgba(0,200,220,0.9)] font-[Verdana] font-bold mb-4 px-3 py-1 rounded-full border border-[rgba(0,136,169,0.5)]">
          The Philosophy
        </span>

        <h2 className="gradient-title text-3xl font-montserrat font-black mb-6">
          Why LooksMaxing?
        </h2>

        <p className="text-[azure]/80 font-[Verdana] text-[15px] leading-relaxed mb-8 max-w-2xl">
          Looksmaxing is the art of enhancing one's natural appearance through self-care, grooming,
          and lifestyle improvements. It's about embracing your best self and feeling confident,
          empowered, and assured in all areas of life.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {BENEFITS.map((b, i) => (
            <div
              key={i}
              className="why-pill flex items-center gap-3 text-[azure]/85 text-[14px] font-[Verdana] rounded-lg px-4 py-3"
            >
              <span className="w-2 h-2 rounded-full bg-[rgba(0,200,220,1)] shrink-0 shadow-[0_0_8px_rgba(0,200,220,0.8)]" />
              {b}
            </div>
          ))}
        </div>

        <p className="text-[azure]/70 font-[Verdana] text-[15px] leading-relaxed max-w-2xl">
          Our appearance plays a significant role in how others perceive us. Looksmaxing helps
          optimize our features, leading to greater self-confidence and a stronger presence in social,
          professional, and personal settings.
        </p>
      </div>
    </section>
  );
}
// ── How It Works ──────────────────────────────────────────────
const STEPS = [
  { num: "01", title: "Sign Up", desc: "Create your free account in under a minute." },
  { num: "02", title: "Choose Your Program", desc: "Pick the plan that matches your goals and season." },
  { num: "03", title: "Follow Your Plan", desc: "Daily routines, diet, and grooming guidance — all in one place." },
  { num: "04", title: "Track Progress", desc: "Watch your transformation with regular check-ins and analysis." },
];

function HowItWorks() {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <section ref={ref} className={`reveal ${isVisible ? "visible" : ""} px-8 py-16`}>
      <h2 className="text-center text-2xl font-montserrat font-black text-white mb-2">
        How It <span className="text-[rgba(0,136,169,1)]">Works</span>
      </h2>
      <p className="text-center text-[azure]/50 font-[Verdana] text-sm mb-10">
        Four simple steps to your best self.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {STEPS.map((s) => (
          <div key={s.num} className="glass-panel rounded-2xl p-6 text-left">
            <span className="text-3xl font-montserrat font-black text-[rgba(0,136,169,0.4)]">{s.num}</span>
            <h3 className="text-lg font-montserrat font-black text-white mt-2 mb-2">{s.title}</h3>
            <p className="text-[azure]/60 text-sm font-[Verdana] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Arjun R.", role: "Member since 2024", quote: "The structured plan finally gave me consistency. Down 8kg and way more confident.", stars: 5 },
  { name: "Kabir S.", role: "Winter Program", quote: "Simple, no-nonsense guidance. No gimmicks, just real habits that stuck.", stars: 5 },
  { name: "Dev P.", role: "Summer Program", quote: "The skin and jaw routines alone were worth it. Excited for the AI analysis tools too.", stars: 4 },
];

function Testimonials() {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <section ref={ref} className={`reveal ${isVisible ? "visible" : ""} px-8 py-16`}>
      <h2 className="text-center text-2xl font-montserrat font-black text-white mb-2">
        What Our <span className="text-[rgba(0,136,169,1)]">Members Say</span>
      </h2>
      <p className="text-center text-[azure]/50 font-[Verdana] text-sm mb-10">
        Real people, real progress.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="glass-panel rounded-2xl p-6">
            <div className="text-[rgba(0,200,220,1)] mb-3">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
            <p className="text-[azure]/80 text-sm font-[Verdana] leading-relaxed mb-4">"{t.quote}"</p>
            <p className="text-white font-montserrat font-bold text-sm">{t.name}</p>
            <p className="text-[azure]/40 text-xs font-[Verdana]">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────
const FAQS = [
  { q: "Is my data private?", a: "Yes. Your photos and personal information are never sold or shared with third parties." },
  { q: "Do I need special equipment?", a: "No — just your phone camera for photos, and a quiet room for voice analysis." },
  { q: "Can I cancel anytime?", a: "Yes, all programs are billed monthly with no long-term lock-in." },
  { q: "When will AI analysis be available?", a: "Face, voice, and body analysis pages are live now in preview — full AI results are coming soon as our models finish training." },
];

function FAQ() {
  const [ref, isVisible] = useIntersectionObserver();
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section ref={ref} className={`reveal ${isVisible ? "visible" : ""} px-8 py-16 max-w-3xl mx-auto`}>
      <h2 className="text-center text-2xl font-montserrat font-black text-white mb-10">
        Frequently Asked <span className="text-[rgba(0,136,169,1)]">Questions</span>
      </h2>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className="glass-panel rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-white font-montserrat font-bold text-sm">{f.q}</span>
              <span className="text-[rgba(0,200,220,1)] text-lg">{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <p className="px-5 pb-4 text-[azure]/70 text-sm font-[Verdana] leading-relaxed">{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── AI Analysis Teaser ───────────────────────────────────────
const ANALYSIS_TOOLS = [
  { title: "Face Analysis", desc: "Symmetry, skin, and jawline insights.", icon: "🧑", path: "/face-analysis" },
  { title: "Voice Analysis", desc: "Tone, clarity, and vocal presence.", icon: "🎙️", path: "/voice-analysis" },
  { title: "Body Analysis", desc: "Posture, physique, and proportions.", icon: "🏋️", path: "/body-analysis" },
];

function AnalysisTeaser() {
  const [ref, isVisible] = useIntersectionObserver();
  const navigate = useNavigate();
  return (
    <section ref={ref} className={`reveal ${isVisible ? "visible" : ""} px-8 py-16`}>
      <span className="badge-pulse block text-center text-[11px] tracking-[0.3em] uppercase text-[rgba(0,200,220,0.9)] font-[Verdana] font-bold mb-3">
        New · AI-Powered
      </span>
      <h2 className="text-center text-2xl font-montserrat font-black text-white mb-10">
        Try Our <span className="text-[rgba(0,136,169,1)]">Analysis Tools</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {ANALYSIS_TOOLS.map((tool) => (
          <button
            key={tool.path}
            onClick={() => navigate(tool.path)}
            className="glass-panel rounded-2xl p-6 text-left hover:scale-[1.02] transition-transform"
          >
            <div className="text-4xl mb-3">{tool.icon}</div>
            <h3 className="text-lg font-montserrat font-black text-white mb-2">{tool.title}</h3>
            <p className="text-[azure]/60 text-sm font-[Verdana]">{tool.desc}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

// ── Main Export ───────────────────────────────────────────────
export default function Home() {
  usePageTitle("Home — Unleash Your Potential");
  const [communityOpen, setCommunityOpen] = useState(false);

  useEffect(() => { analytics.pageView("home"); }, []);

  return (
    <div className="animated-bg min-h-screen relative">

      {/* ── Hero Video ── */}
      <VideoHero
        videoSrc={mainHeroVideo}
        title="Unleash your Full Potential!"
        ctaLabel="Start Now"
        onCta={() => scroll.toSection("premium")}
        borderBottom
      />

      {/* ── What is LooksMaxing ── */}
      <section
        id="about"
        className="flex flex-col items-center text-center px-8 py-16 mx-7 mt-8 rounded-[10px] reveal"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,.3)), url(${BG.about}) center/cover`,
          boxShadow: "-2px -1px 10px rgba(0,136,169,1)",
        }}
      >
        <h2 className="text-2xl md:text-3xl font-montserrat font-black text-white mb-4">
          What is <span className="text-[rgba(0,136,169,1)]">LooksMaxing</span>?
        </h2>
        <p className="max-w-2xl text-[azure]/85 font-[Verdana] text-[14px] leading-relaxed">
          "Looksmaxing" refers to a self-improvement concept where people work to enhance their
          physical appearance through various methods — lifestyle changes, skincare routines, fitness
          goals, grooming, styling, and sometimes cosmetic treatments. The underlying goal is always
          boosting confidence and self-esteem.
        </p>
      </section>

      {/* ── Stats ── */}
      <section className="py-14 px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => <StatCounter key={s.label} {...s} />)}
      </section>

      {/* ── Premium Programs ── */}
      <section id="premium" className="px-5 py-5">
        <h2 className="text-center text-2xl font-montserrat font-black text-[rgba(0,136,169,1)] mb-2 reveal">
          Choose Your Program
        </h2>
        <p className="text-center text-[azure]/50 font-[Verdana] text-sm mb-6 reveal">
          Science-backed. Results-driven. Cancel anytime.
        </p>
        <div className="flex flex-col md:flex-row gap-5 justify-center flex-wrap">
          {MALE_PLANS.map((plan) => <ProgramCard key={plan.id} plan={plan} />)}
        </div>
      </section>

           {/* ── Why Section ── */}
      <WhySection />

      {/* ── How It Works ── */}
      <HowItWorks />

      {/* ── AI Analysis Tools ── */}
      <AnalysisTeaser />

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── FAQ ── */}
      <FAQ />

      {/* ── Footer Video ── */}

      {/* ── Footer Video ── */}
      <VideoHero
        videoSrc={mainFooterVideo}
        title="Enjoy your Life Buddy!"
        ctaLabel="Join Community"
        onCta={() => setCommunityOpen(true)}
        borderTop
      />

      {/* ── Community Modal ── */}
      <CommunityModal isOpen={communityOpen} onClose={() => setCommunityOpen(false)} />
    </div>
  );
}
