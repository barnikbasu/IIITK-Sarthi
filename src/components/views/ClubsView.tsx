import { 
  Users, 
  Calendar, 
  Trophy, 
  Image, 
  MessageSquare, 
  Info, 
  Plus, 
  X, 
  Check, 
  CheckCircle2, 
  ChevronRight, 
  Send, 
  HelpCircle, 
  BookOpen,
  Sparkles,
  ExternalLink,
  Code2,
  Bot,
  GitBranch,
  Palette,
  Music,
  Drama,
  Archive,
  Terminal,
  Camera,
  Layers,
  Network
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import React, { useState } from "react";
import PeerStudyMatch from "../clubs/PeerStudyMatch";
import { officialClubsData, ClubInfo } from "../../data/instituteStructure";

interface EventItem {
  id: string;
  title: string;
  clubName: string;
  date: string;
  month: string;
  location: string;
  rsvps: number;
  isFree: boolean;
  rsvped?: boolean;
  category: string;
}

const initialEvents: EventItem[] = [
  { 
    id: "e1", 
    title: "FreeScape Open Campus OS HackNight", 
    clubName: "FreeScape", 
    date: "14", 
    month: "NOV", 
    location: "Main Computing Block & GitHub", 
    rsvps: 240, 
    isFree: true,
    category: "Technical"
  },
  { 
    id: "e2", 
    title: "GDG Gemini & Multimodal AI Study Jam", 
    clubName: "GDG on Campus, IIIT Kalyani", 
    date: "20", 
    month: "NOV", 
    location: "Auditorium Hall 1 & Online", 
    rsvps: 215, 
    isFree: true,
    category: "Technical"
  },
  { 
    id: "e3", 
    title: "Spotlight Annual Nukkad Natak Showcase", 
    clubName: "Spotlight Drama & Theatre", 
    date: "28", 
    month: "NOV", 
    location: "Central Amphitheatre", 
    rsvps: 310, 
    isFree: true,
    category: "Cultural"
  },
  { 
    id: "e4", 
    title: "Autonomous Maze Rover Sprint", 
    clubName: "S.E.A.L. Robotics", 
    date: "12", 
    month: "DEC", 
    location: "Robotics Hardware Bay", 
    rsvps: 140, 
    isFree: true,
    category: "Technical"
  },
  { 
    id: "e5", 
    title: "IIITK Premier League (IPL Cricket)", 
    clubName: "Sports Club", 
    date: "18", 
    month: "DEC", 
    location: "Institute Sports Ground", 
    rsvps: 350, 
    isFree: true,
    category: "Sports"
  }
];

export default function ClubsView() {
  const [clubs, setClubs] = useState<ClubInfo[]>(officialClubsData);
  const [eventList, setEventList] = useState<EventItem[]>(initialEvents);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeFilterBody, setActiveFilterBody] = useState<"All" | "Gymkhana" | "Community">("All");
  const [selectedClubModal, setSelectedClubModal] = useState<ClubInfo | null>(null);
  
  // Membership tracking state
  const [joinedClubs, setJoinedClubs] = useState<Record<string, "joined" | "pending">>({
    "freescape": "joined",
    "pixel": "joined"
  });

  // Modal toggles
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isGovernanceOpen, setIsGovernanceOpen] = useState(false);
  const [isDiscourseOpen, setIsDiscourseOpen] = useState(false);

  // Form states for register club
  const [regName, setRegName] = useState("");
  const [regCategory, setRegCategory] = useState<any>("Technical");
  const [regLogo, setRegLogo] = useState("🚀");
  const [regDesc, setRegDesc] = useState("");

  // Live discourse chat state
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ sender: string, text: string }[]>([
    { sender: "Sarthi AI moderator", text: "Welcome to the IIIT Kalyani Student Life space! Explore our 11 official Gymkhana, IEEE, and GDG communities." },
    { sender: "Barnik (You)", text: "Are registrations open for the FreeScape HackNight and GDG Solution Challenge?" },
    { sender: "FreeScape Lead", text: "Yes Barnik! FreeScape HackNight registrations are live. Check the events schedule!" }
  ]);

  // Toast / notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleJoinClub = (clubId: string, clubName: string) => {
    const currentState = joinedClubs[clubId];
    if (currentState === "joined") {
      triggerToast(`You are an active verified member of ${clubName}`);
      return;
    }
    if (currentState === "pending") {
      triggerToast(`Your membership application for ${clubName} is under Gymkhana review`);
      return;
    }

    setJoinedClubs(prev => ({ ...prev, [clubId]: "pending" }));
    setClubs(prev => prev.map(c => c.id === clubId ? { ...c, membersCount: c.membersCount + 1 } : c));
    triggerToast(`Application submitted to ${clubName}! The club secretary has been notified.`);
  };

  const handleRSVP = (id: string) => {
    setEventList(prev => prev.map(ev => {
      if (ev.id === id) {
        if (ev.rsvped) {
          triggerToast(`Cancelled RSVP for ${ev.title}`);
          return { ...ev, rsvped: false, rsvps: ev.rsvps - 1 };
        } else {
          triggerToast(`RSVP Confirmed for ${ev.title}! Added to your personal calendar.`);
          return { ...ev, rsvped: true, rsvps: ev.rsvps + 1 };
        }
      }
      return ev;
    }));
  };

  const handleRegisterClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) return;

    const newClub: ClubInfo = {
      id: `club-${Date.now()}`,
      name: regName.trim(),
      shortName: regName.trim(),
      category: regCategory,
      parentBody: "Gymkhana",
      isGymkhana: true,
      shortDescription: regDesc || "Student initiative proposing new campus activities and projects.",
      detailedDescription: regDesc || "New proposed club pending Gymkhana Senate sanction.",
      icon: regLogo,
      iconName: "Sparkles",
      bannerGradient: "from-indigo-600 to-purple-800",
      leadCoordinator: "Barnik Basu (Proposer)",
      facultyAdvisor: "To be nominated",
      contactEmail: "gymkhana@iiitkalyani.ac.in",
      membersCount: 1,
      upcomingEvents: ["Inaugural General Body Meeting"],
      pastHighlights: ["Proposal submitted"],
      tags: ["Proposed", regCategory]
    };

    setClubs(prev => [...prev, newClub]);
    setJoinedClubs(prev => ({ ...prev, [newClub.id]: "joined" }));
    setRegName("");
    setRegDesc("");
    setIsRegisterOpen(false);
    triggerToast(`Proposal for '${newClub.name}' logged! Gymkhana Senate notified.`);
  };

  const handleSendDiscourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage.trim();
    setChatMessage("");
    setChatHistory(prev => [...prev, { sender: "Barnik (You)", text: userText }]);

    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        sender: "Gymkhana Council AI", 
        text: `Thanks for the input Barnik! Your note regarding "${userText}" has been routed to the respective Club Leads.` 
      }]);
    }, 1000);
  };

  // Filtered clubs
  const filteredClubs = clubs.filter(c => {
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchesBody = activeFilterBody === "All" || 
      (activeFilterBody === "Gymkhana" && c.isGymkhana) ||
      (activeFilterBody === "Community" && !c.isGymkhana);
    return matchesCategory && matchesBody;
  });

  return (
    <div className="space-y-8 pb-20 relative">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal text-[10px] font-black uppercase tracking-widest rounded-lg">
              Official Student Life & Gymkhana
            </span>
            <span className="text-xs font-bold text-slate-400">• 11 Active Clubs & Communities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading mt-1">
            Student Life & Club Directory
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-0.5">
            Join official Gymkhana societies, open-source collectives, robotics bays, creative media, IEEE branch, and GDG community.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setIsGovernanceOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl font-bold text-xs hover:border-brand-primary/40 transition-all shadow-sm"
          >
            <Info size={16} className="text-brand-primary dark:text-brand-teal" />
            <span>Governance Policy</span>
          </button>
          
          <button 
            onClick={() => setIsRegisterOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md shadow-brand-primary/20 transition-all active:scale-95"
          >
            <Plus size={16} />
            <span>Propose Club</span>
          </button>
        </div>
      </div>

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/25 rounded-2xl flex items-center gap-3 text-brand-primary dark:text-brand-teal font-black text-xs uppercase tracking-widest justify-center z-40"
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-brand-navy p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          {["All", "Technical", "Cultural", "Sports", "Arts & Media", "Literary & Knowledge"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all",
                selectedCategory === cat
                  ? "bg-brand-primary text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Parent Body Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl shrink-0 self-start sm:self-auto">
          {(["All", "Gymkhana", "Community"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setActiveFilterBody(b)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                activeFilterBody === b
                  ? "bg-white dark:bg-brand-navy text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
              )}
            >
              {b === "All" ? "All Bodies" : b === "Gymkhana" ? "Gymkhana (9)" : "Independent / Chapters (2)"}
            </button>
          ))}
        </div>

      </div>

      {/* 11 Official Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club, idx) => {
          const joinStatus = joinedClubs[club.id];

          return (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="bg-white dark:bg-brand-navy p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between space-y-5 hover:border-brand-primary/30"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl font-mono text-white shadow-md group-hover:scale-105 transition-transform",
                    club.bannerGradient
                  )}>
                    {club.icon}
                  </div>

                  <div className="flex flex-col items-end">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider",
                      club.isGymkhana
                        ? "bg-brand-primary/10 text-brand-primary dark:text-brand-teal"
                        : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                    )}>
                      {club.parentBody}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 mt-1">
                      {club.category}
                    </span>
                  </div>
                </div>

                {/* Club Name & Official Description */}
                <div>
                  <h4 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                    {club.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed mt-1.5 line-clamp-3">
                    {club.shortDescription}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {club.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Members & Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Users size={14} className="text-slate-400" />
                    <span>{club.membersCount}+ Members</span>
                  </span>
                  <span className="text-[10px] text-slate-400 truncate max-w-[130px]">
                    {club.contactEmail}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedClubModal(club)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all text-center"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleJoinClub(club.id, club.name)}
                    className={cn(
                      "flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm text-center",
                      joinStatus === "joined"
                        ? "bg-emerald-600 text-white"
                        : joinStatus === "pending"
                        ? "bg-amber-500 text-white"
                        : "bg-brand-primary hover:bg-indigo-700 text-white"
                    )}
                  >
                    {joinStatus === "joined" ? "✓ Joined" : joinStatus === "pending" ? "Pending" : "Join Club"}
                  </button>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* 🤝 Peer Study Partner & Subject Matchmaker Card */}
      <PeerStudyMatch onTriggerToast={triggerToast} />

      {/* Priority Events & Sarthi Discourse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Priority Events RSVP Tracker */}
        <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
                <Calendar size={22} className="text-brand-primary dark:text-brand-teal" />
                <span>Flagship Events & Hackathons</span>
              </h3>
              <span className="text-[10px] font-black px-2.5 py-1 bg-brand-primary/10 text-brand-primary dark:text-brand-teal rounded-lg uppercase tracking-wider">
                RSVP Enabled
              </span>
            </div>

            <div className="space-y-4">
              {eventList.map(ev => (
                <div 
                  key={ev.id} 
                  onClick={() => handleRSVP(ev.id)}
                  className={cn(
                    "flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-brand-navy/60 transition-all border cursor-pointer shadow-xs group",
                    ev.rsvped ? "border-brand-primary/40 bg-brand-primary/5 dark:bg-brand-primary/10" : "border-slate-200/50 dark:border-slate-800/80 hover:border-brand-primary/20"
                  )}
                >
                  <div className="w-14 h-14 bg-white dark:bg-brand-navy rounded-xl flex flex-col items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <span className="text-brand-primary dark:text-brand-teal font-black text-lg leading-none">{ev.date}</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase mt-0.5">{ev.month}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-primary dark:group-hover:text-brand-teal tracking-tight transition-colors text-sm truncate">
                      {ev.title}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                      {ev.clubName} • {ev.location}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary dark:text-brand-teal text-[10px] font-black rounded-md uppercase tracking-tighter">
                        {ev.rsvps} RSVPs
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {ev.isFree ? "FREE ACCESS" : "STUDENT PASS"}
                      </span>
                      {ev.rsvped && (
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                          <Check size={12} strokeWidth={3} /> Confirmed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400 dark:text-slate-500 font-medium">
            <span>Click any event card to toggle your student RSVP.</span>
          </div>
        </div>

        {/* Sarthi Discourse Space Card */}
        <div className="bg-brand-navy rounded-[2.5rem] p-8 text-white relative overflow-hidden border border-white/5 shadow-2xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-white/10 text-brand-teal text-[10px] font-black uppercase tracking-widest border border-white/10">
                Gymkhana Collaboration
              </span>
            </div>

            <h3 className="text-2xl font-bold font-heading tracking-tight">
              IIITK Student Discourse Room
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed font-medium">
              Propose inter-club events, submit hackathon track ideas, and collaborate directly with club secretaries and student representatives.
            </p>

            <div className="flex -space-x-2 pt-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-brand-navy bg-slate-800 overflow-hidden ring-2 ring-brand-primary/20">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=iiitk-${i}`} alt="avatar" />
                </div>
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-brand-navy bg-brand-primary flex items-center justify-center text-[10px] font-black">
                +310
              </div>
            </div>
          </div>
          
          <div className="relative z-10 pt-6">
            <button 
              onClick={() => setIsDiscourseOpen(true)}
              className="px-6 py-3.5 bg-white text-brand-navy rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl shadow-black/20"
            >
              Enter Discourse Room
            </button>
          </div>

          <MessageSquare size={140} className="absolute bottom-0 right-0 text-white/5 translate-y-6 translate-x-6 -rotate-12 pointer-events-none" />
        </div>

      </div>

      {/* CLUB MODAL DETAIL */}
      <AnimatePresence>
        {selectedClubModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy rounded-[2.5rem] max-w-xl w-full p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl font-mono text-white shadow-lg",
                    selectedClubModal.bannerGradient
                  )}>
                    {selectedClubModal.icon}
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-brand-primary/10 text-brand-primary dark:text-brand-teal">
                      {selectedClubModal.parentBody} • {selectedClubModal.category}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {selectedClubModal.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedClubModal(null)}
                  className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Official Charter</span>
                  <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {selectedClubModal.detailedDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Faculty Advisor</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedClubModal.facultyAdvisor}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Lead Coordinator</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedClubModal.leadCoordinator}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Upcoming Flagship Events</span>
                  <div className="space-y-1.5">
                    {selectedClubModal.upcomingEvents.map((ev, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                        <Calendar size={14} className="text-brand-primary dark:text-brand-teal shrink-0" />
                        <span>{ev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                <button
                  onClick={() => {
                    handleJoinClub(selectedClubModal.id, selectedClubModal.name);
                    setSelectedClubModal(null);
                  }}
                  className="flex-1 py-3 bg-brand-primary hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md transition-all text-center"
                >
                  Join {selectedClubModal.name}
                </button>
                <button
                  onClick={() => setSelectedClubModal(null)}
                  className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REGISTER NEW CLUB MODAL */}
      <AnimatePresence>
        {isRegisterOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsRegisterOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest">
                  GYMKHANA SENATE APPLICATION
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
                  Propose New Campus Club
                </h3>
              </div>

              <form onSubmit={handleRegisterClubSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Club Name</label>
                  <input 
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. IIITK Quantum Computing Group"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Domain</label>
                    <select
                      value={regCategory}
                      onChange={(e) => setRegCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                    >
                      <option value="Technical">Technical</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Sports">Sports</option>
                      <option value="Arts & Media">Arts & Media</option>
                      <option value="Literary & Knowledge">Literary & Knowledge</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Emoji / Icon</label>
                    <input 
                      type="text"
                      required
                      value={regLogo}
                      onChange={(e) => setRegLogo(e.target.value)}
                      placeholder="e.g. ⚛️, 🎮, 🎙️"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Purpose & Vision</label>
                  <textarea 
                    rows={3}
                    value={regDesc}
                    onChange={(e) => setRegDesc(e.target.value)}
                    placeholder="Briefly describe planned workshops, target student members, and faculty advisor..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsRegisterOpen(false)}
                    className="px-5 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-500 font-bold text-xs uppercase rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-brand-primary text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-95 transition-all"
                  >
                    Submit Proposal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GOVERNANCE MODAL */}
      <AnimatePresence>
        {isGovernanceOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-xl p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsGovernanceOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center">
                  <Info size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">OFFICIAL STATUTE</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">IIIT Kalyani Club Governance</h3>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed overflow-y-auto max-h-[320px] pr-2 scrollbar-hide">
                <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">1. Apex Gymkhana Framework</p>
                <p>All student clubs function under the supervision of the Student Gymkhana, guided by Faculty In-Charges and the Dean (Student Affairs).</p>

                <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">2. Technical & Coding Wing</p>
                <p>Tech Club coordinates CodeCubes (CP/Algorithms), S.E.A.L. (Robotics), and FreeScape (Open Source/FOSS), while Algoholic conducts flagship events including Status Code 1 and CodeCombat.</p>

                <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">3. Budgetary Disbursements & Venue Allocation</p>
                <p>Annual budget allocations are sanctioned per semester based on event milestones, participation metrics, and inter-IIIT representation.</p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button 
                  onClick={() => setIsGovernanceOpen(false)}
                  className="px-6 py-3 bg-brand-primary text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-95 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DISCOURSE SPACE MODAL */}
      <AnimatePresence>
        {isDiscourseOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsDiscourseOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">REAL-TIME COMMONS</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Student Life Discourse Space</h3>
                </div>
              </div>

              {/* Chat screen */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 h-[240px] overflow-y-auto space-y-3 mb-4 flex flex-col scrollbar-hide text-xs">
                {chatHistory.map((item, idx) => (
                  <div key={idx} className={cn("flex flex-col max-w-[85%] p-3 rounded-2xl shadow-xs", 
                    item.sender.includes("Barnik") 
                      ? "self-end bg-brand-primary text-white rounded-tr-none" 
                      : "self-start bg-white dark:bg-brand-navy text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800 rounded-tl-none font-medium"
                  )}>
                    <span className="text-[8px] font-black uppercase opacity-70 block mb-1">{item.sender}</span>
                    <p className="leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendDiscourse} className="relative">
                <input 
                  type="text"
                  required
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Share a thought with Gymkhana secretaries..."
                  className="w-full pl-5 pr-14 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-medium text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all placeholder:text-slate-400"
                />
                <button 
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-brand-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <Send size={14} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
