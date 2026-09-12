import { useState } from "react";
import { usePageTitle } from "../hooks";
import { toast } from "../utils";

export default function AnalysisPage({ pageTitle, eyebrow, description, tips, uploadHint, icon }) {
  usePageTitle(pageTitle);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleAnalyze = () => {
    toast.info("Our AI model is still in training — check back soon!");
  };

  return (
    <div className="page-hero-bg min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-[1] max-w-3xl mx-auto px-6 py-20">
        <span className="badge-pulse inline-block text-[11px] tracking-[0.3em] uppercase text-[rgba(0,200,220,0.9)] font-[Verdana] font-bold mb-4 px-3 py-1 rounded-full border border-[rgba(0,136,169,0.5)]">
          {eyebrow}
        </span>
        <h1 className="gradient-title text-4xl md:text-5xl font-montserrat font-black mb-4">
          {pageTitle}
        </h1>
        <p className="text-[azure]/75 font-[Verdana] text-[15px] leading-relaxed mb-10 max-w-xl">
          {description}
        </p>

        <div className="glass-panel rounded-2xl p-8 mb-10 text-center">
          <div className="text-5xl mb-4">{icon}</div>
          <label className="btn-shine inline-block cursor-pointer h-11 px-8 leading-[44px] bg-[rgba(0,136,169,1)] rounded-[40px] font-montserrat font-bold text-white text-sm hover:scale-105 transition-transform">
            {fileName ? `Selected: ${fileName}` : uploadHint}
            <input type="file" accept="image/*,video/*,audio/*" className="hidden" onChange={handleFileChange} />
          </label>
          <p className="text-[azure]/40 text-xs font-[Verdana] mt-4">
            Your file stays on your device — nothing is uploaded yet while the model is in training.
          </p>
          <button
            onClick={handleAnalyze}
            className="btn-shine mt-6 h-11 px-9 rounded-[40px] font-montserrat font-bold text-sm text-[azure] border border-[rgba(0,136,169,0.6)] bg-white/5 hover:scale-105 transition-transform"
          >
            Run Analysis
          </button>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-montserrat font-black text-white mb-4">Tips for best results</h3>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-[azure]/75 text-sm font-[Verdana]">
                <span className="text-[rgba(0,200,220,1)] leading-none mt-0.5">◆</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center">
          <span className="text-[azure]/40 text-xs font-[Verdana]">
            🚧 This feature is in active development — full AI analysis is coming soon.
          </span>
        </div>
      </div>
    </div>
  );
}