import React, { useState } from "react";
import { 
  Sparkles, 
  Cpu, 
  Palette, 
  Music, 
  Flame, 
  Trophy, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Users, 
  ChevronRight, 
  Code2, 
  Radio, 
  Zap, 
  Award, 
  HelpCircle,
  Drama,
  Layers,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { flagshipFestivals, EventDetail } from "../../data/eventsData";
import { IIITKCrest, IIITKBanner } from "../common/IIITKLogo";
import { cn } from "../../lib/utils";

interface RenesaShowcaseProps {
  onOpenEventDetail: (event: EventDetail) => void;
  onExploreAllEvents?: () => void;
}

export default function RenesaShowcase({
  onOpenEventDetail,
  onExploreAllEvents
}: RenesaShowcaseProps) {
  const renesaData = flagshipFestivals.find(f => f.id === "renesa") || flagshipFestivals[0];
  const [activePillar, setActivePillar] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [passClaimed, setPassClaimed] = useState(false);

  const pillars = renesaData.pillarsOrTracks || [];
  const scheduleDays = renesaData.schedule || [];

  return (
    <div className="space-y-12">
      {/* ------------------------------------------------------------- */}
      {/* 1. CINEMATIC EDITORIAL HERO BANNER                            */}
      {/* ------------------------------------------------------------- */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl text-white">
        {/* Ambient atmospheric backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/40 via-purple-950/30 to-slate-950" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 lg:py-20 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          {/* Official Presenter Header */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-slate-300 text-xs font-bold tracking-widest uppercase"
          >
            <IIITKCrest size={22} />
            <span>IIIT KALYANI PRESENTS</span>
          </motion.div>

          {/* Large-scale Grand Fest Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-amber-200">
              RENESA
            </h1>
            <p className="text-xs sm:text-sm font-black tracking-[0.3em] uppercase text-amber-400">
              THE ANNUAL TECHNO-CULTURAL FEST
            </p>
          </motion.div>

          {/* Triad Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-extrabold tracking-widest text-slate-300 uppercase py-2 border-y border-white/10"
          >
            <span>TECHNOLOGY</span>
            <span className="text-amber-400 font-bold">×</span>
            <span>CULTURE</span>
            <span className="text-amber-400 font-bold">×</span>
            <span>CREATIVITY</span>
          </motion.div>

          {/* Core Descriptive Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm sm:text-base text-slate-300 max-w-2xl font-medium leading-relaxed"
          >
            Where technology meets culture. The annual three-day techno-cultural extravaganza of IIIT Kalyani — 
            bringing together students to <strong className="text-white">create, compete, perform, collaborate, and celebrate</strong>.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => onOpenEventDetail(renesaData)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-950/50 hover:shadow-rose-900/60 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Renesa</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById("renesa-competitions-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
            >
              View Competitions
            </button>

            {onExploreAllEvents && (
              <button
                onClick={onExploreAllEvents}
                className="px-6 py-3.5 rounded-2xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Campus Calendar →
              </button>
            )}
          </motion.div>

          {/* Motto Badge */}
          <div className="pt-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
            Think. Create. Compete. Celebrate.
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. THE THREE CORE FESTIVAL PILLARS                            */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-teal">
              The Renesa Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Three Distinctive Arenas
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            From high-energy code sprints to soul-stirring musical showcases, Renesa is structured across three core verticals.
          </p>
        </div>

        {/* Pillar Switcher Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {pillars.map((pillar, idx) => {
            const isSelected = activePillar === idx;
            return (
              <button
                key={idx}
                onClick={() => setActivePillar(idx)}
                className={cn(
                  "p-5 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-3 cursor-pointer",
                  isSelected
                    ? "bg-white dark:bg-slate-800 border-brand-primary/40 dark:border-brand-teal/40 shadow-lg ring-2 ring-brand-primary/20 dark:ring-brand-teal/20"
                    : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className={cn(
                    "p-2.5 rounded-xl transition-colors",
                    isSelected
                      ? "bg-brand-primary text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  )}>
                    {pillar.title === "TECH" && <Cpu size={20} />}
                    {pillar.title === "CULTURE" && <Palette size={20} />}
                    {pillar.title === "THE NIGHTS" && <Sparkles size={20} />}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Vertical 0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {pillar.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detail Card */}
        {pillars[activePillar] && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-brand-teal">
                  Focus Area
                </span>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  {pillars[activePillar].title}: Programming & Showcases
                </h4>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {pillars[activePillar].description}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pillars[activePillar].items?.map((item, iIdx) => (
                <div 
                  key={iIdx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3"
                >
                  <div className="p-1.5 rounded-lg bg-brand-primary/10 dark:bg-brand-teal/10 text-brand-primary dark:text-brand-teal mt-0.5 shrink-0">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. A FESTIVAL WITH AMBITION & BENCHMARKS                      */}
      {/* ------------------------------------------------------------- */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white border border-slate-800 shadow-xl space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Award size={16} />
            <span>A Festival With Ambition</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Learning from India's Premier Student Festivals
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Renesa is envisioned not merely as a college fest, but as a platform through which IIIT Kalyani builds a distinctive identity within India's student-festival ecosystem — learning from leading benchmarks without copying their identity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {renesaData.benchmarks?.map((bm, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{bm.name}</span>
                <span className="text-[11px] font-bold text-amber-400">{bm.institute}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {bm.description}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 text-xs font-medium text-slate-400 border-t border-white/10 italic">
          "IIIT Kalyani is not only a place where technology is studied. It is a community where technology, creativity, culture, and ambition come together."
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. THREE-DAY FESTIVAL SCHEDULE & ITINERARY                    */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-teal">
              Festival Itinerary
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              3 Days of Continuous Energy
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Spring Edition
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scheduleDays.map((day, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal font-extrabold text-xs tracking-wider uppercase">
                    {day.timeOrDay}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {day.location.split("&")[0]}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {day.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {day.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  {idx === 0 ? "Kickoff & Acoustic" : idx === 1 ? "Robo & DJ Night" : "Expo & Pro-Night"}
                </span>
                <span className="text-brand-primary dark:text-brand-teal font-bold">
                  All Day Access
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. FEATURED COMPETITIONS & PRIZE TRACKS                       */}
      {/* ------------------------------------------------------------- */}
      <div id="renesa-competitions-section" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-teal">
              Think. Create. Compete.
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Featured Flagship Competitions
            </h2>
          </div>
          <button
            onClick={() => onOpenEventDetail(renesaData)}
            className="text-xs font-bold text-brand-primary dark:text-brand-teal hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View Full Competition Rulebooks</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {renesaData.competitions?.map((comp, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col justify-between space-y-4 hover:border-brand-primary/40 dark:hover:border-brand-teal/40 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {comp.category}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {comp.teamSize}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {comp.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {comp.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {comp.prizePool}
                </span>
                <button
                  onClick={() => onOpenEventDetail(renesaData)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Details & Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
