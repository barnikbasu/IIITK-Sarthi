import React, { useState } from "react";
import { 
  Sparkles, 
  Calendar, 
  Search, 
  Code2, 
  Palette, 
  Award, 
  Cpu, 
  ExternalLink, 
  Flame, 
  CheckCircle2, 
  Filter, 
  Layers,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { flagshipFestivals, allCampusEvents, EventDetail } from "../../data/eventsData";
import RenesaShowcase from "../events/RenesaShowcase";
import AnnualCalendarTimeline from "../events/AnnualCalendarTimeline";
import EventDiscoveryGrid from "../events/EventDiscoveryGrid";
import EventDetailModal from "../events/EventDetailModal";
import { IIITKCrest, IIITKBanner } from "../common/IIITKLogo";
import { cn } from "../../lib/utils";

export default function EventsView() {
  const [activeSection, setActiveSection] = useState<"renesa" | "calendar" | "discover" | "statuscode" | "anukriti" | "ekatra" | "enigma">("renesa");
  const [selectedEventModal, setSelectedEventModal] = useState<EventDetail | null>(null);

  const handleOpenEventModal = (event: EventDetail) => {
    setSelectedEventModal(event);
  };

  const handleOpenSpecificEventById = (id: string) => {
    const ev = allCampusEvents.find(e => e.id === id) || flagshipFestivals.find(f => f.id === id);
    if (ev) {
      setSelectedEventModal(ev);
    }
  };

  const getFlagship = (id: string) => {
    return flagshipFestivals.find(f => f.id === id) || flagshipFestivals[0];
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* ------------------------------------------------------------- */}
      {/* TOP NAVIGATION / FESTIVAL SELECTOR BAR                        */}
      {/* ------------------------------------------------------------- */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <IIITKCrest size={34} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                IIIT Kalyani Events & Fests
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-brand-primary/10 text-brand-primary dark:text-brand-teal">
                Campus OS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explore flagship festivals, hackathons, robotics challenges, and the annual calendar.
            </p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveSection("renesa")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-extrabold tracking-wide transition-all shrink-0 flex items-center gap-1.5 cursor-pointer",
              activeSection === "renesa"
                ? "bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <Sparkles size={14} />
            <span>Renesa Fest</span>
          </button>

          <button
            onClick={() => setActiveSection("statuscode")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer",
              activeSection === "statuscode"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <Code2 size={14} />
            <span>StatusCode</span>
          </button>

          <button
            onClick={() => setActiveSection("anukriti")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer",
              activeSection === "anukriti"
                ? "bg-rose-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <Palette size={14} />
            <span>Anukriti</span>
          </button>

          <button
            onClick={() => setActiveSection("ekatra")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer",
              activeSection === "ekatra"
                ? "bg-amber-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <Award size={14} />
            <span>Ekatra</span>
          </button>

          <button
            onClick={() => setActiveSection("enigma")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer",
              activeSection === "enigma"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <Cpu size={14} />
            <span>Enigma</span>
          </button>

          <button
            onClick={() => setActiveSection("calendar")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer",
              activeSection === "calendar"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                : "bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <Calendar size={14} />
            <span>Calendar</span>
          </button>

          <button
            onClick={() => setActiveSection("discover")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer",
              activeSection === "discover"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                : "bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <Search size={14} />
            <span>All Events</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* VIEW SECTION SWITCHER                                         */}
      {/* ------------------------------------------------------------- */}

      {/* RENESA SHOWCASE */}
      {activeSection === "renesa" && (
        <RenesaShowcase 
          onOpenEventDetail={handleOpenEventModal}
          onExploreAllEvents={() => setActiveSection("discover")}
        />
      )}

      {/* STATUSCODE SHOWCASE */}
      {activeSection === "statuscode" && (
        <div className="space-y-8">
          {(() => {
            const ev = getFlagship("statuscode");
            return (
              <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden space-y-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-950 pointer-events-none" />
                
                <div className="relative z-10 space-y-4 max-w-3xl">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                    <Code2 size={16} />
                    <span>36-Hour National Hackathon</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                    StatusCode
                  </h2>
                  <p className="text-sm font-black tracking-widest uppercase text-slate-300">
                    Code. Create. Collaborate. Compete. Conquer.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed pt-2">
                    {ev.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => handleOpenEventModal(ev)}
                      className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-colors cursor-pointer"
                    >
                      View Hackathon Tracks & Rules
                    </button>
                    {ev.officialWebsiteUrl && (
                      <a
                        href={ev.officialWebsiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center gap-2 transition-colors"
                      >
                        <span>Official Website (statuscode.tech)</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Highlights Grid */}
                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                  {ev.stats?.map((st, sIdx) => (
                    <div key={sIdx} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-xs text-slate-400 font-semibold">{st.label}</span>
                      <div className="text-2xl font-black text-white mt-1">{st.value}</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{st.sublabel}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ANUKRITI SHOWCASE */}
      {activeSection === "anukriti" && (
        <div className="space-y-8">
          {(() => {
            const ev = getFlagship("anukriti");
            return (
              <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden space-y-8">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-slate-950 pointer-events-none" />
                
                <div className="relative z-10 space-y-4 max-w-3xl">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-400">
                    <Palette size={16} />
                    <span>Annual Cultural Celebration</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                    Anukriti
                  </h2>
                  <p className="text-sm font-black tracking-widest uppercase text-slate-300">
                    Weaving Culture into Creativity
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed pt-2">
                    {ev.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => handleOpenEventModal(ev)}
                      className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition-colors cursor-pointer"
                    >
                      Explore Cultural Verticals
                    </button>
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                  {ev.pillarsOrTracks?.map((pl, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <h4 className="font-bold text-sm text-white">{pl.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{pl.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* EKATRA SHOWCASE */}
      {activeSection === "ekatra" && (
        <div className="space-y-8">
          {(() => {
            const ev = getFlagship("ekatra");
            return (
              <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden space-y-8">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-950/40 via-orange-950/30 to-slate-950 pointer-events-none" />
                
                <div className="relative z-10 space-y-4 max-w-3xl">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                    <Award size={16} />
                    <span>Annual Day & Farewell</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                    Ekatra
                  </h2>
                  <p className="text-sm font-black tracking-widest uppercase text-slate-300">
                    Celebrate. Remember. Belong.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed pt-2">
                    {ev.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => handleOpenEventModal(ev)}
                      className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition-colors cursor-pointer"
                    >
                      View Event Details & Awards
                    </button>
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  {ev.pillarsOrTracks?.map((pl, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <h4 className="font-bold text-sm text-white">{pl.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{pl.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ENIGMA SHOWCASE */}
      {activeSection === "enigma" && (
        <div className="space-y-8">
          {(() => {
            const ev = getFlagship("enigma");
            return (
              <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden space-y-8">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-950 pointer-events-none" />
                
                <div className="relative z-10 space-y-4 max-w-3xl">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                    <Cpu size={16} />
                    <span>Autonomous Maze Robotics Sprint</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                    Enigma
                  </h2>
                  <p className="text-sm font-black tracking-widest uppercase text-slate-300">
                    Navigate. Engineer. Conquer.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed pt-2">
                    {ev.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => handleOpenEventModal(ev)}
                      className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-colors cursor-pointer"
                    >
                      View Robot Specifications & Arena
                    </button>
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  {ev.pillarsOrTracks?.map((pl, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <h4 className="font-bold text-sm text-white">{pl.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{pl.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ANNUAL CALENDAR */}
      {activeSection === "calendar" && (
        <AnnualCalendarTimeline onSelectEvent={handleOpenEventModal} />
      )}

      {/* ALL CAMPUS EVENTS DISCOVERY */}
      {activeSection === "discover" && (
        <EventDiscoveryGrid onSelectEvent={handleOpenEventModal} />
      )}

      {/* BOTTOM QUICK LINK TO ALL DISCOVER */}
      {activeSection !== "discover" && (
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <EventDiscoveryGrid onSelectEvent={handleOpenEventModal} />
        </div>
      )}

      {/* EVENT DETAIL MODAL */}
      <EventDetailModal
        event={selectedEventModal}
        isOpen={!!selectedEventModal}
        onClose={() => setSelectedEventModal(null)}
      />
    </div>
  );
}
