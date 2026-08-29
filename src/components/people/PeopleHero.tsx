import React from "react";
import { 
  Users, 
  Search, 
  Sparkles, 
  MessageSquare, 
  HelpCircle, 
  Landmark, 
  GraduationCap, 
  Microscope, 
  Building2,
  ShieldCheck,
  Award
} from "lucide-react";
import { IIITKCrest } from "../common/IIITKLogo";

interface PeopleHeroProps {
  activeTab: "faculty" | "administration" | "governance" | "research" | "messages";
  setActiveTab: (tab: "faculty" | "administration" | "governance" | "research" | "messages") => void;
  onOpenWhoCanHelp: () => void;
  onOpenCommandPalette: () => void;
  unreadCount?: number;
}

export default function PeopleHero({
  activeTab,
  setActiveTab,
  onOpenWhoCanHelp,
  onOpenCommandPalette,
  unreadCount = 0
}: PeopleHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 p-6 md:p-10 shadow-sm">
      {/* Editorial Decorative Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A4FD8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.07] pointer-events-none" />
      <div className="absolute -right-16 -top-16 w-80 h-80 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left Editorial Header Block */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 text-brand-primary dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <IIITKCrest size={18} monochrome={false} />
            <span>IIIT Kalyani Institutional Directory & Messaging</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.15]">
            The People of <span className="text-brand-primary dark:text-blue-400">IIIT Kalyani</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
            Faculty, researchers, administrators, and institutional leaders shaping national education, research, and governance. Find verified contacts, explore research expertise, and communicate securely.
          </p>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenWhoCanHelp}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 font-semibold text-xs sm:text-sm hover:bg-amber-500/20 transition-all shadow-sm group"
            >
              <HelpCircle size={17} className="text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Who can help me? (Help Navigator)</span>
            </button>

            <button
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-all"
            >
              <Search size={15} className="text-slate-400" />
              <span>Global Quick Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-slate-500">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {/* Right Institutional Verification Card */}
        <div className="lg:w-80 p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-md backdrop-blur-sm space-y-3.5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Verified Institutional Data</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Canonical source: iiitkalyani.ac.in</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center pt-1 border-t border-slate-100 dark:border-slate-700/60">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60">
              <span className="block text-xl font-serif font-bold text-brand-primary dark:text-blue-400">17</span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Verified Faculty</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60">
              <span className="block text-xl font-serif font-bold text-emerald-600 dark:text-emerald-400">6</span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Official Officers</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Authenticated Academic Messaging
            </span>
            <span className="font-mono text-[10px]">Sarthi OS</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("faculty")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            activeTab === "faculty"
              ? "bg-brand-primary text-white shadow-sm"
              : "bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <GraduationCap size={16} />
          <span>Faculty & Researchers</span>
        </button>

        <button
          onClick={() => setActiveTab("administration")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            activeTab === "administration"
              ? "bg-brand-primary text-white shadow-sm"
              : "bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <Building2 size={16} />
          <span>Administration & Offices</span>
        </button>

        <button
          onClick={() => setActiveTab("governance")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            activeTab === "governance"
              ? "bg-brand-primary text-white shadow-sm"
              : "bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <Landmark size={16} />
          <span>Statutory Governance</span>
        </button>

        <button
          onClick={() => setActiveTab("research")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            activeTab === "research"
              ? "bg-brand-primary text-white shadow-sm"
              : "bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <Microscope size={16} />
          <span>Research Discovery Graph</span>
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            activeTab === "messages"
              ? "bg-brand-primary text-white shadow-sm"
              : "bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <MessageSquare size={16} />
          <span>Academic Messages</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-black rounded-full bg-amber-500 text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </section>
  );
}
