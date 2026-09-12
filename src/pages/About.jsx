import { usePageTitle } from "../hooks";

const VALUES = [
  { title: "Science-Backed", desc: "Every recommendation is rooted in real research, not fads." },
  { title: "Privacy First", desc: "Your photos and data are yours — we never sell or share them." },
  { title: "Real Results", desc: "Built by people who've lived the transformation themselves." },
];

export default function About() {
  usePageTitle("About — LooksMaxer");
  return (
    <div className="page-hero-bg min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-[1] max-w-3xl mx-auto px-6 py-20 text-center">
        <span className="badge-pulse inline-block text-[11px] tracking-[0.3em] uppercase text-[rgba(0,200,220,0.9)] font-[Verdana] font-bold mb-4 px-3 py-1 rounded-full border border-[rgba(0,136,169,0.5)]">
          Our Story
        </span>
        <h1 className="gradient-title text-4xl md:text-5xl font-montserrat font-black mb-6">
          About LooksMaxer
        </h1>
        <p className="text-[azure]/75 font-[Verdana] text-[15px] leading-relaxed mb-14 max-w-2xl mx-auto">
          LooksMaxer started as a simple idea: everyone deserves a clear, honest path toward looking
          and feeling their best. We combine grooming science, fitness, and AI-powered analysis to
          help you build a personalized self-improvement plan — without the noise of unverified
          "hacks" flooding social media.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {VALUES.map((v) => (
            <div key={v.title} className="glass-panel rounded-2xl p-6">
              <h3 className="text-lg font-montserrat font-black text-[rgba(0,200,220,1)] mb-2">{v.title}</h3>
              <p className="text-[azure]/70 text-sm font-[Verdana] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}