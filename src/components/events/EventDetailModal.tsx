import React, { useState } from "react";
import { 
  X, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Users, 
  Trophy, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  Mail, 
  ChevronRight, 
  HelpCircle,
  Cpu,
  Palette,
  Bot,
  Activity,
  Drama,
  Music,
  Award,
  Zap,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EventDetail } from "../../data/eventsData";
import { cn } from "../../lib/utils";
import { IIITKCrest } from "../common/IIITKLogo";

interface EventDetailModalProps {
  event: EventDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAnotherEvent?: (eventId: string) => void;
}

export default function EventDetailModal({
  event,
  isOpen,
  onClose,
  onSelectAnotherEvent
}: EventDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "schedule" | "competitions" | "faqs">("overview");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !event) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegister = () => {
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setIsRegistered(true);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900 shrink-0">
            <img 
              src={event.bannerImage} 
              alt={event.name}
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105 transition-transform duration-700"
            />
            <div className={cn("absolute inset-0 bg-gradient-to-t via-slate-950/70 to-slate-950/30", event.themeColor ? `bg-gradient-to-r ${event.themeColor}/40` : "")} />
            
            {/* Top Bar Actions */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {event.category}
                </span>
                <span className={cn(
                  "px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full backdrop-blur-md border",
                  event.registrationStatus === "Open" 
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : event.registrationStatus === "Upcoming"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                )}>
                  {event.registrationStatus === "Open" ? "Registration Open" : event.registrationStatus}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
                  title="Share event"
                >
                  {copied ? <Check size={18} className="text-emerald-400" /> : <Share2 size={18} />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
                  title="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Banner Content */}
            <div className="absolute bottom-6 inset-x-4 sm:inset-x-8 z-10">
              <div className="flex items-center gap-3 mb-2">
                <IIITKCrest size={28} />
                <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
                  IIIT Kalyani Event Ecosystem
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
                {event.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-medium mt-1 max-w-2xl drop-shadow">
                {event.tagline}
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 px-6 flex items-center justify-between gap-4 overflow-x-auto shrink-0">
            <div className="flex items-center gap-2 py-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={cn(
                  "px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all",
                  activeTab === "overview"
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                Overview & Story
              </button>
              {event.schedule && event.schedule.length > 0 && (
                <button
                  onClick={() => setActiveTab("schedule")}
                  className={cn(
                    "px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all",
                    activeTab === "schedule"
                      ? "bg-brand-primary text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  )}
                >
                  Schedule & Tracks
                </button>
              )}
              {event.competitions && event.competitions.length > 0 && (
                <button
                  onClick={() => setActiveTab("competitions")}
                  className={cn(
                    "px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all",
                    activeTab === "competitions"
                      ? "bg-brand-primary text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  )}
                >
                  Competitions & Challenges
                </button>
              )}
              {event.faqs && event.faqs.length > 0 && (
                <button
                  onClick={() => setActiveTab("faqs")}
                  className={cn(
                    "px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all",
                    activeTab === "faqs"
                      ? "bg-brand-primary text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  )}
                >
                  FAQs
                </button>
              )}
            </div>

            {/* Quick Metadata Pill */}
            <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-primary dark:text-brand-teal" />
                <span>{event.fullDateString || `${event.month} Edition`}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-brand-primary dark:text-brand-teal" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats / Metrics */}
                {event.stats && event.stats.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {event.stats.map((st, idx) => (
                      <div 
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between"
                      >
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {st.label}
                        </span>
                        <div className="mt-2">
                          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                            {st.value}
                          </span>
                          {st.sublabel && (
                            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                              {st.sublabel}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* About & Narrative */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <Sparkles size={20} className="text-brand-primary dark:text-brand-teal" />
                    About {event.name}
                  </h3>
                  <div className="space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    {event.aboutStory.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Pillars / Tracks */}
                {event.pillarsOrTracks && event.pillarsOrTracks.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      Festival Verticals & Event Pillars
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {event.pillarsOrTracks.map((pillar, idx) => (
                        <div 
                          key={idx}
                          className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between space-y-3"
                        >
                          <div>
                            <div className="flex items-center gap-2.5 mb-2">
                              <div className="p-2 rounded-xl bg-brand-primary/10 dark:bg-brand-teal/10 text-brand-primary dark:text-brand-teal">
                                {pillar.iconName === "Cpu" && <Cpu size={18} />}
                                {pillar.iconName === "Palette" && <Palette size={18} />}
                                {pillar.iconName === "Sparkles" && <Sparkles size={18} />}
                                {pillar.iconName === "Bot" && <Bot size={18} />}
                                {pillar.iconName === "Music" && <Music size={18} />}
                                {pillar.iconName === "Drama" && <Drama size={18} />}
                                {pillar.iconName === "Award" && <Award size={18} />}
                                {!["Cpu", "Palette", "Sparkles", "Bot", "Music", "Drama", "Award"].includes(pillar.iconName) && (
                                  <Zap size={18} />
                                )}
                              </div>
                              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                                {pillar.title}
                              </h4>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              {pillar.description}
                            </p>
                          </div>

                          {pillar.items && (
                            <ul className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
                              {pillar.items.map((it, iIdx) => (
                                <li key={iIdx} className="text-[11px] font-medium text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                                  <ChevronRight size={12} className="text-brand-primary dark:text-brand-teal mt-0.5 shrink-0" />
                                  <span>{it}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benchmark Inspirations if applicable */}
                {event.benchmarks && event.benchmarks.length > 0 && (
                  <div className="space-y-4 p-6 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                        Inspiration & Benchmarks
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        Renesa aspires to learn from India's leading student festivals while cultivating its own distinctive identity for IIIT Kalyani:
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                      {event.benchmarks.map((bm, bIdx) => (
                        <div key={bIdx} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-500/20">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-slate-900 dark:text-white">{bm.name}</span>
                            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">{bm.institute}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                            {bm.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Organizing Body & Contact Desk */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-brand-primary/10 dark:bg-brand-teal/10 text-brand-primary dark:text-brand-teal">
                      <Building2 size={22} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                        Organizing Body
                      </span>
                      <strong className="text-sm text-slate-900 dark:text-white font-bold">
                        {event.organizingBody}
                      </strong>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                        Mode: {event.mode} • {event.venue}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-brand-primary/10 dark:bg-brand-teal/10 text-brand-primary dark:text-brand-teal">
                      <Mail size={22} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                        Event Secretariat & Contact
                      </span>
                      <strong className="text-sm text-slate-900 dark:text-white font-bold">
                        {event.contact.leadName} ({event.contact.role})
                      </strong>
                      <a 
                        href={`mailto:${event.contact.email}`}
                        className="text-xs text-brand-primary dark:text-brand-teal hover:underline block mt-0.5 font-medium"
                      >
                        {event.contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "schedule" && event.schedule && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Festival Flow & Event Itinerary
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Curated three-day schedule across main stage, auditoriums, and computing bays.
                  </p>
                </div>

                <div className="space-y-4">
                  {event.schedule.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row gap-4 items-start"
                    >
                      <div className="px-4 py-2 rounded-xl bg-brand-primary text-white font-black text-sm uppercase tracking-wider shrink-0">
                        {item.timeOrDay}
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                            {item.location}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "competitions" && event.competitions && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Featured Competitions & Prize Tracks
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Register individually or as teams for technical and cultural showdowns.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.competitions.map((comp, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary dark:text-brand-teal">
                            {comp.category}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {comp.teamSize}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {comp.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {comp.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700/60">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {comp.prizePool}
                        </span>
                        <button
                          onClick={handleRegister}
                          className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
                        >
                          Register for Track
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "faqs" && event.faqs && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <HelpCircle size={20} className="text-brand-primary dark:text-brand-teal" />
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Official guidance for participants, teams, and attendees.
                  </p>
                </div>

                <div className="space-y-3">
                  {event.faqs.map((faq, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1.5"
                    >
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {faq.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Strip */}
          <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
              {event.registrationDeadline && (
                <span>
                  Registration closes: <strong className="text-slate-900 dark:text-slate-200">{event.registrationDeadline}</strong>
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {event.officialWebsiteUrl && (
                <a
                  href={event.officialWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <span>Official Website</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {event.registrationStatus === "Open" ? (
                <button
                  onClick={handleRegister}
                  disabled={isRegistered || isRegistering}
                  className={cn(
                    "flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold rounded-2xl shadow-md transition-all",
                    isRegistered
                      ? "bg-emerald-600 text-white cursor-default"
                      : "bg-brand-primary hover:bg-brand-primary/90 text-white"
                  )}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Registered Successfully</span>
                    </>
                  ) : isRegistering ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <span>Register Now</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              ) : event.registrationStatus === "Upcoming" ? (
                <button
                  onClick={handleRegister}
                  disabled={isRegistered}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold rounded-2xl bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-colors"
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Notified on Launch</span>
                    </>
                  ) : (
                    <>
                      <span>Notify Me on Launch</span>
                      <Sparkles size={14} />
                    </>
                  )}
                </button>
              ) : (
                <span className="text-xs font-bold text-slate-400 py-2.5 px-4">
                  Registrations Closed
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
