// ─── pages/Female.jsx ────────────────────────────────────────
import { useEffect, useState } from "react";
import VideoHero from "../components/VideoHero";
import ProgramCard from "../components/ProgramCard";
import CommunityModal from "../components/CommunityModal";
import { useIntersectionObserver, usePageTitle } from "../hooks";
import { analytics, scroll } from "../utils";
import { BG } from "../assets/index.js";

// Videos — place in public/videos/:
//   public/videos/female-hero.mp4   ← "Untitled design (3).mp4"
//   public/videos/female-footer.mp4 ← "Untitled design (4).mp4"
const femaleHeroVideo   = process.env.PUBLIC_URL + "/videos/female-hero.mp4";
const femaleFooterVideo = process.env.PUBLIC_URL + "/videos/female-footer.mp4";

const FEMALE_PLANS = [
  {
    id: "summer-female",
    title: "Summer Program",
    season: "Summer",
    price: 40.0,
    accent: "yellow",
    bgImage: BG.summerFemale,
    features: [
      "Personalized Workout Plan",
      "Personalised Diet",
      "Make Up Mastery",
      "Eye Area Enhancement",
      "Grooming Techniques",
      "Personality Development",
      "Dressing & Style Guide",
    ],
  },
  {
    id: "winter-female",
    title: "Winter Program",
    season: "Winter",
    price: 35.99,
    accent: "cyan",
    bgImage: BG.winterFemale,
    features: [
      "Body Shaping Plan",
      "Healthy Diet Guide",
      "Silky Skin Routine",
      "No Chubby Face Tips",
      "Jaw is Law",
      "Personality Development",
      "Meditation & Mindset",
    ],
  },
];

const BENEFITS = [
  "Radiant Skin & Glow",
  "Elevated Confidence",
  "Polished First Impressions",
  "Healthier Lifestyle Habits",
  "Better Mental Wellness",
  "Stronger Social Presence",
  "Discipline & Consistency",
  "Improved Posture & Grace",
  "Professional Edge",
  "Deeper Self-Awareness",
];

export default function Female() {
  usePageTitle("Female — Unleash Your Potential");
  const [communityOpen, setCommunityOpen] = useState(false);
  const [whyRef, whyVisible] = useIntersectionObserver();

  useEffect(() => { analytics.pageView("female"); }, []);

  return (
    <div className="animated-bg min-h-screen relative">

      {/* ── Hero Video ── */}
      <VideoHero
        videoSrc={femaleHeroVideo}
        title="Unleash your Full Potential!"
        ctaLabel="Start Now"
        onCta={() => scroll.toSection("premium-female")}
        borderBottom
      />

      {/* ── What is LooksMaxing ── */}
      <section
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
          Looksmaxing is a self-improvement concept for enhancing physical appearance through lifestyle
          changes, skincare routines, fitness goals, grooming, and styling. The underlying goal is
          boosting confidence and self-esteem — feeling and looking your absolute best every single day.
        </p>
      </section>

      {/* ── Premium Programs ── */}
      <section id="premium-female" className="px-5 py-5 mt-4">
        <h2 className="text-center text-2xl font-montserrat font-black text-[rgba(0,136,169,1)] mb-2 reveal">
          Female Programs
        </h2>
        <p className="text-center text-[azure]/50 font-[Verdana] text-sm mb-6 reveal">
          Tailored for her. Designed to elevate every aspect of your appearance and confidence.
        </p>
        <div className="flex flex-col md:flex-row gap-5 justify-center flex-wrap">
          {FEMALE_PLANS.map((plan) => <ProgramCard key={plan.id} plan={plan} />)}
        </div>
      </section>

      {/* ── Why Section ── */}
      <section
        ref={whyRef}
        className={`reveal ${whyVisible ? "visible" : ""} mx-2.5 mt-8 rounded-[12px] overflow-hidden`}
        style={{
          background: `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.92)), url(${BG.why}) center/cover no-repeat`,
          boxShadow: "-2px -1px 10px rgba(0,136,169,1)",
          minHeight: "640px",
        }}
      >
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-montserrat font-black text-white mb-6">
            Why <span className="text-[rgba(0,136,169,1)]">LooksMaxing</span>?
          </h2>
          <p className="text-[azure]/80 font-[Verdana] text-[15px] leading-relaxed mb-8 max-w-2xl">
            Looksmaxing is the art of enhancing one's natural appearance through self-care, grooming,
            and lifestyle improvements. It's about embracing your best self and feeling confident,
            empowered, and assured in all areas of life.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {BENEFITS.map((b, i) => (
              <div key={i} className="flex items-center gap-3 text-[azure]/80 text-[14px] font-[Verdana]">
                <span className="w-2 h-2 rounded-full bg-[rgba(0,136,169,1)] shrink-0" />
                {b}
              </div>
            ))}
          </div>
          <p className="text-[azure]/70 font-[Verdana] text-[15px] leading-relaxed max-w-2xl">
            Our appearance plays a significant role in how others perceive us. Looksmaxing helps
            optimize our features, leading to greater self-confidence and a stronger presence in every setting.
          </p>
        </div>
      </section>

      {/* ── Footer Video ── */}
      <VideoHero
        videoSrc={femaleFooterVideo}
        title="Enjoy your Life Girl!"
        ctaLabel="Join Community"
        onCta={() => setCommunityOpen(true)}
        borderTop
      />

      {/* ── Community Modal ── */}
      <CommunityModal isOpen={communityOpen} onClose={() => setCommunityOpen(false)} />
    </div>
  );
}
