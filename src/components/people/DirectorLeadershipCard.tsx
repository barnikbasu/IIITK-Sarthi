import React, { useState } from "react";
import { 
  ShieldCheck, 
  Award, 
  Building2, 
  Landmark, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  ExternalLink, 
  BookOpen, 
  Layers, 
  CheckCircle2,
  Calendar,
  ChevronRight
} from "lucide-react";
import { officialDirectorProfile, DirectorProfile } from "../../data/peopleData";
import { IIITKCrest } from "../common/IIITKLogo";

interface DirectorLeadershipCardProps {
  onOpenDirectorProfile?: () => void;
  onSendMessageToDirectorate?: () => void;
}

export default function DirectorLeadershipCard({
  onOpenDirectorProfile,
  onSendMessageToDirectorate
}: DirectorLeadershipCardProps) {
  const [isVisionExpanded, setIsVisionExpanded] = useState(false);
  const director = officialDirectorProfile;

  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-amber-400/40 dark:border-amber-500/30 bg-gradient-to-br from-slate-900 via-brand-navy to-slate-950 text-white p-6 sm:p-8 md:p-10 shadow-xl mb-10">
      {/* Background Ambience & Institutional Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Leadership Category Banner */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
          <Landmark size={14} className="text-amber-400" />
          <span>LEADERSHIP</span>
          <span className="text-amber-400/60">•</span>
          <span>Institute of National Importance</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-amber-200/80">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>Office of the Director • IIIT Kalyani</span>
        </div>
      </div>

      {/* Main Director Profile Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
        {/* Left Column: Portrait & Formal Title */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-6">
          <div className="relative group shrink-0">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-2xl overflow-hidden">
              <img
                src={director.avatarUrl}
                alt={director.name}
                className="w-full h-full object-cover rounded-[22px] bg-slate-800"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1.5 rounded-xl shadow-lg border-2 border-slate-900" title="Shanti Swarup Bhatnagar Awardee & Fellow (FNA, FNAE, FNASc, FASc)">
              <Award size={18} />
            </div>
          </div>

          <div className="space-y-2 max-w-sm">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {director.name}
            </h2>
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-semibold text-amber-300">
                {director.role}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {director.institute}
              </p>
            </div>

            <p className="text-xs font-mono text-amber-200/90 pt-1">
              {director.highestDegree}
            </p>

            <div className="pt-2 flex flex-wrap justify-center sm:justify-start lg:justify-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-[11px] font-medium text-slate-200 border border-white/10">
                Director, IIT Kharagpur
              </span>
              <span className="px-2.5 py-1 rounded-md bg-amber-400/15 text-[11px] font-semibold text-amber-300 border border-amber-400/30">
                Director (Addl. Charge), IIIT Kalyani
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Strategic Pillars, Vision, and Institutional Interaction */}
        <div className="lg:col-span-7 space-y-6">
          {/* 4 Strategic Pillars Mandated in Policy */}
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-widest text-amber-400/90 mb-3">
              Strategic Institutional Pillars
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {director.strategicPillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all space-y-1"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Director's Vision Statement */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2.5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Sparkles size={15} className="text-amber-400" />
                <span>Director's Vision & Institutional Mandate</span>
              </div>
              <button
                onClick={() => setIsVisionExpanded(!isVisionExpanded)}
                className="text-xs font-semibold text-amber-300 hover:text-amber-100 transition-colors"
              >
                {isVisionExpanded ? "Show Less" : "Read Full Vision"}
              </button>
            </div>

            <p className={`text-xs sm:text-sm text-slate-200 leading-relaxed font-sans ${isVisionExpanded ? "" : "line-clamp-3"}`}>
              {director.biography}
            </p>

            {isVisionExpanded && (
              <div className="pt-2 border-t border-amber-500/20 text-xs text-slate-300 space-y-2">
                <p>
                  <strong>National Honours:</strong> {director.awards.join(" • ")}
                </p>
                <p>
                  <strong>Academy Fellowships:</strong> {director.fellowships.join(", ")}
                </p>
                <p>
                  <strong>Key Secretariat Office:</strong> {director.officeLocation} • Intercom: 1001
                </p>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onSendMessageToDirectorate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 group"
            >
              <Mail size={16} className="group-hover:scale-110 transition-transform" />
              <span>Official Inquiries (Directorate Secretariat)</span>
            </button>

            <a
              href={director.personalWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-xs sm:text-sm hover:bg-white/20 border border-white/15 transition-all"
            >
              <span>Director's Portal</span>
              <ExternalLink size={14} className="text-slate-400" />
            </a>

            <div className="text-[11px] text-slate-400 italic sm:ml-auto">
              Routine student queries must route through respective HODs & Academic Section.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
