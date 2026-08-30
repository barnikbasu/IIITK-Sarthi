import React, { useState } from "react";
import { 
  ShieldCheck, 
  AlertCircle, 
  Zap, 
  MapPin, 
  Clock, 
  Calendar,
  Sparkles,
  ChevronRight,
  Utensils,
  Moon,
  Sun,
  FileText,
  Folder,
  Send,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Flame,
  CheckCircle,
  Search,
  User,
  Bot,
  Download,
  Share2,
  ExternalLink,
  MessageSquare,
  Building2,
  Bus,
  CreditCard,
  BookOpen,
  Wifi,
  LifeBuoy,
  Radio,
  Volume2,
  QrCode
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { IIITKCrest, IIITKBanner } from "../common/IIITKLogo";
import AttendancePredictor from "./AttendancePredictor";
import DigitalStudentIDModal from "../common/DigitalStudentIDModal";
import { useStudentProfile } from "../../context/StudentProfileContext";

interface UnifiedDashboardProps {
  setActiveTab: (tab: string) => void;
}

export default function UnifiedDashboard({ setActiveTab }: UnifiedDashboardProps) {
  const { profile, firstName } = useStudentProfile();
  const [showIdCard, setShowIdCard] = useState(false);
  
  // Attendance & Check-in simulation states
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [skipDinner, setSkipDinner] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [messRating, setMessRating] = useState(4);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Active Story Highlight Modal
  const [selectedStory, setSelectedStory] = useState<{
    id: string;
    title: string;
    club: string;
    image: string;
    time: string;
    description: string;
  } | null>(null);

  // Notice preview modal
  const [selectedNotice, setSelectedNotice] = useState<{
    title: string;
    dept: string;
    time: string;
    file: string;
    size: string;
    content: string;
  } | null>(null);

  // Sarthi AI inline query states
  const [aiInput, setAiInput] = useState("");
  const [aiChatMode, setAiChatMode] = useState(false);
  const [aiMessages, setAiMessages] = useState<{role: "user" | "ai", content: string}[]>([
    {
      role: "ai",
      content: `Namaste ${firstName}! I'm Sarthi, your IIIT Kalyani AI co-pilot. Need help finding a classroom, checking your attendance margin, or looking up the mess menu?`
    }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // Handle Mark Attendance Action
  const handleMarkAttendance = () => {
    setCheckInLoading(true);
    setTimeout(() => {
      setCheckInLoading(false);
      setHasCheckedIn(true);
    }, 1200);
  };

  // Campus highlights data (inspired by image.png 3 & 4)
  const campusStories = [
    {
      id: "admin",
      title: "Mid-Sem Schedule",
      club: "IIITK Admin",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400",
      time: "2h ago",
      description: "Official Spring 2026 Mid-Semester examinations schedule released. Download seating plan from ERP."
    },
    {
      id: "gdg",
      title: "Web3 Bootcamp",
      club: "GDG on Campus IIIT Kalyani",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400",
      time: "4h ago",
      description: "Hands-on Solidity & Smart Contract workshop this Saturday at CS Lab 2. Limited to 60 seats."
    },
    {
      id: "sc2",
      title: "SC2 Hackathon '26",
      club: "Syntax Error",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400",
      time: "5h ago",
      description: "Syntax Clash 2.0 (SC2) Flagship National Hackathon registrations open! INR 1,50,000+ Prize pool."
    },
    {
      id: "ieee",
      title: "Paper Published",
      club: "IEEE SB IIITK",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400",
      time: "1d ago",
      description: "Congratulations to the AI Research group for publishing at IEEE ICASSP 2026."
    },
    {
      id: "renesas",
      title: "MCU Dev Challenge",
      club: "Renesas Lab",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
      time: "2d ago",
      description: "Edge-AI firmware prototyping track with Renesas RL78 boards."
    }
  ];

  // AI Prompt handler
  const handleAiAction = (query: string) => {
    setAiChatMode(true);
    setAiLoading(true);
    const updated = [...aiMessages, { role: "user" as const, content: query }];
    setAiMessages(updated);

    setTimeout(() => {
      let reply = "";
      if (query.includes("Mess") || query.includes("lunch") || query.includes("food")) {
        reply = "Today's Lunch at BH-1 Dining Hall: Paneer Butter Masala, Dal Tadka, Jeera Rice, Hot Chapatis, and Salad. Dinner includes Chicken Kadhai / Shahi Paneer & Gulab Jamun!";
      } else if (query.includes("CGPA") || query.includes("grade") || query.includes("85%")) {
        reply = "Your current CGPA is 8.54 (Top 5% in CSE). You have 82.5% overall attendance. Attending the next 2 classes will raise your margin to 85.1%!";
      } else if (query.includes("empty Lab") || query.includes("study") || query.includes("room")) {
        reply = "Computer Lab 3 and LHC-204 are completely unoccupied until 2:00 PM. High-speed LAN and Wi-Fi are fully operational.";
      } else if (query.includes("SC2") || query.includes("Hackathon")) {
        reply = "SC2 (Syntax Clash 2.0) is the flagship national hackathon of IIIT Kalyani with a ₹1,50,000+ prize pool! Registrations are open on Devfolio.";
      } else {
        reply = `I have cross-checked the IIIT Kalyani Academic ERP for "${query}". Your course materials, timetable, and campus links are synced.`;
      }
      setAiMessages(prev => [...prev, { role: "ai", content: reply }]);
      setAiLoading(false);
    }, 800);
  };

  const handleCustomAiSend = () => {
    if (!aiInput.trim()) return;
    const userQuery = aiInput.trim();
    setAiInput("");
    handleAiAction(userQuery);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500 font-sans">
      
      {/* 🏛️ Official Institutional Header Bar (National Importance Prestige) */}
      <div className="bg-white dark:bg-brand-navy rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 dark:bg-brand-teal/5 rounded-full -translate-y-48 translate-x-48 blur-3xl pointer-events-none" />
        
        {/* Crest + University Bilingual Name */}
        <IIITKBanner crestSize={64} orientation="horizontal" showTagline={true} />

        {/* Quick Institutional Action Badges */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 z-10">
          <button 
            type="button"
            onClick={() => setShowIdCard(true)}
            className="px-3.5 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60 text-xs font-bold flex items-center gap-1.5 hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors shadow-sm cursor-pointer"
          >
            <QrCode size={14} />
            <span>Digital ID Pass</span>
          </button>

          <button 
            onClick={() => setActiveTab("emergency")}
            className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors shadow-sm"
          >
            <Radio size={14} className="animate-pulse text-rose-500" />
            <span>Emergency Red Line</span>
          </button>
          
          <button 
            onClick={() => handleMarkAttendance()}
            disabled={hasCheckedIn}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm",
              hasCheckedIn 
                ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                : "bg-brand-primary hover:bg-indigo-700 text-white active:scale-95"
            )}
          >
            {hasCheckedIn ? (
              <>
                <CheckCircle size={14} />
                <span>Checked In (Lab 102)</span>
              </>
            ) : (
              <>
                <Wifi size={14} />
                <span>{checkInLoading ? "Connecting..." : "Bluetooth Check In"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 👑 Prestigious Hero Greeting & KPI Command Banner (Image 1, 5, 6 Style) */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white rounded-[2.5rem] p-7 sm:p-10 shadow-2xl relative overflow-hidden border border-white/10">
        {/* Subtle Crest Watermark inside Hero */}
        <div className="absolute right-6 -bottom-10 opacity-10 pointer-events-none">
          <IIITKCrest size={280} monochrome={true} />
        </div>
        
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-primary/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/3 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left Greeting & Session */}
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
                <IIITKCrest size={32} />
              </div>
              <div>
                <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest block">
                  IIIT Kalyani Campus OS
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Academic Year 2025–2026 • Spring Semester
                </span>
              </div>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Good Morning, {firstName}.
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-slate-300 text-xs sm:text-sm font-medium pt-1">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg font-bold border border-white/10">
                {profile.department?.includes("Computer") ? "B.Tech CSE • Semester IV" : `${profile.department} • Semester IV`}
              </span>
              <span className="text-slate-400">•</span>
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Clock size={14} />
                <span>Next: Database Management Systems in <strong className="text-white">15 mins</strong></span>
              </div>
            </div>
          </div>

          {/* Right Live KPI Cards Bar (Attendance %, CGPA, Up Next) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:w-auto">
            
            {/* KPI 1: Overall Attendance */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-5 flex flex-col justify-between min-w-[150px] hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  Attendance
                </span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-black rounded-md uppercase tracking-wider border border-emerald-500/30">
                  Safe
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black font-heading text-emerald-400 tracking-tight">82.5%</span>
                <TrendingUp size={16} className="text-emerald-400" />
              </div>
              <p className="text-[10px] text-slate-300 font-medium mt-1">
                +1.2% this week (Min: 75%)
              </p>
            </div>

            {/* KPI 2: Current CGPA */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-5 flex flex-col justify-between min-w-[150px] hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  CGPA
                </span>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-black rounded-md uppercase tracking-wider border border-amber-500/30">
                  Dean's List
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black font-heading text-amber-400 tracking-tight">8.54</span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium mt-1">
                Rank #6 in Branch (CSE)
              </p>
            </div>

            {/* KPI 3: Up Next Class (15 mins) */}
            <div className="bg-brand-primary/40 backdrop-blur-xl border border-brand-teal/40 rounded-3xl p-5 flex flex-col justify-between min-w-[170px] hover:bg-brand-primary/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-ping" />
                  Up Next (15m)
                </span>
              </div>
              <div className="mt-2">
                <h4 className="font-bold text-sm text-white line-clamp-1">Operating Systems</h4>
                <p className="text-[11px] text-slate-300 font-medium flex items-center gap-1 mt-0.5">
                  <MapPin size={12} className="text-brand-teal" />
                  <span>Lab 102 • 10:30 AM</span>
                </p>
              </div>
              <button 
                onClick={handleMarkAttendance}
                className="mt-3 w-full py-1.5 bg-white text-brand-navy rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-slate-100 active:scale-95 transition-all text-center shadow"
              >
                {hasCheckedIn ? "Present ✓" : "Mark Present"}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 🌟 Campus Story Highlights Bar (Image 3 & 4) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Campus Highlights & Live Stories
          </span>
          <span className="text-[11px] font-bold text-brand-primary dark:text-brand-teal cursor-pointer hover:underline">
            5 Active Updates
          </span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {campusStories.map((story) => (
            <button
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none"
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2.5px] bg-gradient-to-tr from-brand-primary via-brand-teal to-amber-400 group-hover:scale-105 transition-transform shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={story.image} 
                    alt={story.club}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors truncate max-w-[76px] text-center">
                {story.club}
              </span>
            </button>
          ))}

          {/* Plus Add Community Highlight */}
          <button 
            onClick={() => setActiveTab("clubs")}
            className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none"
          >
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:border-brand-primary dark:group-hover:border-brand-teal group-hover:text-brand-primary transition-all">
              <span className="text-2xl font-light">+</span>
            </div>
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
              Submit
            </span>
          </button>
        </div>
      </div>

      {/* 📐 Primary 3-Column Command Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 🗓️ Column 1: Today's Timeline Schedule (4 Cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-brand-navy rounded-[2.5rem] p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                  Today's Timeline
                </h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  Thursday, Oct 26 • Week 8
                </p>
              </div>
              <button 
                onClick={() => setActiveTab("schedule")}
                className="text-xs font-bold text-brand-primary dark:text-brand-teal hover:underline"
              >
                View Full
              </button>
            </div>

            {/* Timeline Vertical Slots */}
            <div className="relative pl-6 space-y-6 border-l-2 border-slate-100 dark:border-slate-800">
              
              {/* Slot 1: Past */}
              <div className="relative opacity-60">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-900" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    08:30 AM - 10:00 AM • Completed
                  </span>
                  <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mt-0.5">
                    Data Structures & Algorithms
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Room 204 • Prof. S. Sen</p>
                </div>
              </div>

              {/* Slot 2: Active / Ongoing */}
              <div className="relative p-4 rounded-2xl bg-brand-primary/5 dark:bg-brand-teal/10 border border-brand-primary/20 dark:border-brand-teal/30">
                <div className="absolute -left-[33px] top-4 w-3.5 h-3.5 rounded-full bg-brand-primary dark:bg-brand-teal ring-4 ring-brand-primary/20 dark:ring-brand-teal/30" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest">
                      10:30 AM - 12:30 PM • Active
                    </span>
                    <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary dark:text-brand-teal rounded text-[9px] font-black uppercase">
                      Lab Session
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    Operating Systems Lab
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                    <MapPin size={12} className="text-brand-primary" />
                    <span>Computer Lab 102 • Dr. S. K. Mandal</span>
                  </p>

                  <button
                    onClick={handleMarkAttendance}
                    disabled={hasCheckedIn}
                    className={cn(
                      "mt-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5",
                      hasCheckedIn
                        ? "bg-emerald-500 text-white"
                        : "bg-brand-primary text-white hover:bg-indigo-700 active:scale-95"
                    )}
                  >
                    {hasCheckedIn ? (
                      <>
                        <CheckCircle size={14} />
                        <span>Attendance Marked (Present)</span>
                      </>
                    ) : (
                      <>
                        <Wifi size={14} />
                        <span>Mark Attendance Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Slot 3: Lunch Break */}
              <div className="relative opacity-75">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-white dark:border-slate-900" />
                <div>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    01:00 PM - 02:00 PM
                  </span>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-300 mt-0.5 italic">
                    Lunch Break & Dining Hall
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500">BH-1 Mess (Ground Floor)</p>
                </div>
              </div>

              {/* Slot 4: Afternoon */}
              <div className="relative opacity-90">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-900" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    02:00 PM - 05:00 PM
                  </span>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-0.5">
                    Algorithms Lab & Open Problem Set
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500">CS Lab 3 • Prof. S. Sen</p>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Academic Wellness Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-primary dark:text-brand-teal">
                Attendance Margin
              </span>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Safe to skip 2 OS lectures
              </p>
            </div>
            <button 
              onClick={() => setActiveTab("analytics")}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-brand-primary"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 📢 Column 2: Official Institute Notices (4 Cols - Image 1, 3, 5 Style) */}
        <div className="lg:col-span-4 bg-white dark:bg-brand-navy rounded-[2.5rem] p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                  Official Notices
                </h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  Academic & Administrative Board
                </p>
              </div>
              <button 
                onClick={() => setActiveTab("resources")}
                className="text-xs font-bold text-brand-primary dark:text-brand-teal hover:underline"
              >
                View All
              </button>
            </div>

            {/* Featured Notice Card with Photo (MidSem_Rev1_S4.pdf) */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-900/40 group hover:shadow-md transition-all">
              <div className="h-32 w-full relative overflow-hidden bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600" 
                  alt="Convocation & Examination Board"
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-rose-600 text-white rounded-lg text-[9px] font-black uppercase tracking-wider shadow">
                  Urgent Notice
                </span>
                <span className="absolute bottom-2 right-3 text-[10px] text-slate-300 font-bold">
                  Posted 2 hrs ago
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-wider">
                    Academic Section
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5 leading-snug">
                    Revised Mid-Semester Examination Schedule Released (Spring '26)
                  </h4>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  Please be informed that the Mid-Semester timetable for B.Tech Semester IV has been updated due to overlapping practical sessions. Download the official seating & slot allocation chart.
                </p>

                {/* PDF Download Pill */}
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                      <FileText size={16} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        MidSem_Rev1_S4.pdf
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">1.2 MB • Digitally Verified</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedNotice({
                        title: "Revised Mid-Semester Examination Schedule (Spring 2026)",
                        dept: "Office of the Dean (Academic Affairs)",
                        time: "Feb 24, 2026 • Circular No: IIITK/ACAD/2026/042",
                        file: "MidSem_Rev1_S4.pdf",
                        size: "1.2 MB",
                        content: "The Mid-Semester examinations for B.Tech 2nd Year (Semester IV) will commence from March 16, 2026. All students must carry their digital student ID cards with verified barcode. Reporting time: 15 minutes before scheduled slot."
                      });
                    }}
                    className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-teal rounded-xl text-slate-700 dark:text-slate-200 transition-colors shrink-0"
                    title="Download Official Notice"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Notices List */}
            <div className="space-y-3">
              
              {/* Notice 2: StatusCode & Renesa Flagship Fest */}
              <div 
                onClick={() => {
                  setActiveTab("events");
                }}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-800/80 hover:border-brand-primary/40 cursor-pointer transition-all flex items-start gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Sparkles size={18} />
                </div>
                <div className="space-y-0.5 flex-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-brand-primary dark:text-brand-teal">
                    Flagship Event
                  </span>
                  <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                    StatusCode 36-Hour Hackathon & Renesa Fest
                  </h5>
                  <p className="text-[10px] text-slate-400 line-clamp-1">Explore Renesa Fest, StatusCode Tracks & Annual Calendar</p>
                </div>
              </div>

              {/* Notice 3: Wi-Fi Maintenance */}
              <div 
                onClick={() => {
                  setSelectedNotice({
                    title: "Scheduled IT Network Maintenance (Hostel Block A & B)",
                    dept: "Computer Center & IT Services",
                    time: "Feb 22, 2026",
                    file: "IT_Notice_Network.pdf",
                    size: "500 KB",
                    content: "The campus optical fiber uplink will undergo maintenance this Saturday between 02:00 AM and 04:00 AM. Academic LHC servers will remain on secondary backup."
                  });
                }}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-800/80 hover:border-brand-primary/40 cursor-pointer transition-all flex items-start gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Wifi size={18} />
                </div>
                <div className="space-y-0.5 flex-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Hostel IT Notice
                  </span>
                  <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-amber-600 transition-colors">
                    Hostel Wi-Fi Maintenance Schedule
                  </h5>
                  <p className="text-[10px] text-slate-400 line-clamp-1">Intermittent connectivity expected Sat 2-4 AM</p>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>IIITK Notice Board</span>
            <span>Ref: IIITK/DIR/2026</span>
          </div>
        </div>

        {/* 🥘 Column 3: Daily Mess Menu & Sarthi AI Co-Pilot (4 Cols) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          
          {/* Mess Menu Card (Image 1, 2, 4 Style) */}
          <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Utensils size={18} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    Mess Portal
                  </h3>
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    Serving Lunch Now
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-[10px] font-black uppercase">
                BH-1 Hall
              </span>
            </div>

            {/* Meal Items Grid */}
            <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/30 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                <span>Lunch Special (Today)</span>
                <span>12:30 PM - 02:30 PM</span>
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                Paneer Butter Masala & Dal Tadka
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Jeera Rice, Fresh Butter Chapatis, Boondi Raita & Salad
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 space-y-1 opacity-85">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>Dinner (Up Next)</span>
                <span>08:00 PM - 10:00 PM</span>
              </div>
              <p className="font-bold text-xs text-slate-800 dark:text-slate-300">
                Chicken Kadhai / Shahi Mix Veg, Tandoori Roti, Gulab Jamun & Ice Cream
              </p>
            </div>

            {/* Mess Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setSkipDinner(!skipDinner)}
                className={cn(
                  "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border text-center",
                  skipDinner
                    ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 border-rose-200 dark:border-rose-800"
                    : "bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                )}
              >
                {skipDinner ? "Dinner Skipped (₹75 Rebate)" : "Skip Dinner"}
              </button>

              <button
                onClick={() => setShowFeedbackModal(true)}
                className="px-4 py-2.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal hover:bg-brand-primary/20 rounded-xl text-xs font-bold transition-all border border-brand-primary/20"
              >
                Feedback
              </button>
            </div>
          </div>

          {/* Sarthi AI Mini Co-Pilot Card */}
          <div className="bg-gradient-to-br from-brand-primary to-indigo-900 text-white rounded-[2.5rem] p-7 shadow-xl border border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
                  <Sparkles size={20} className="text-brand-teal" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold tracking-tight">Sarthi AI Co-Pilot</h4>
                  <p className="text-[10px] text-indigo-200 uppercase tracking-widest font-black">
                    Your IIITK Smart Companion
                  </p>
                </div>
              </div>

              {/* Quick AI Prompts */}
              <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-hide text-xs">
                {aiMessages.map((msg, idx) => (
                  <div key={idx} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "p-3 rounded-2xl max-w-[90%] font-medium leading-relaxed shadow-sm text-xs",
                      msg.role === "user" ? "bg-white/25 text-white rounded-tr-none" : "bg-white text-slate-900 rounded-tl-none font-semibold"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {aiLoading && (
                  <div className="flex gap-2 justify-start">
                    <div className="px-3 py-2 bg-white/20 rounded-2xl rounded-tl-none text-white font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {!aiChatMode && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button 
                    onClick={() => handleAiAction("Where is the Mess?")}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-[10px] font-semibold text-white transition-all"
                  >
                    Where is the Mess?
                  </button>
                  <button 
                    onClick={() => handleAiAction("Find empty Lab right now")}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-[10px] font-semibold text-white transition-all"
                  >
                    Find empty Lab
                  </button>
                  <button 
                    onClick={() => handleAiAction("Tell me about SC2 Hackathon")}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-[10px] font-semibold text-white transition-all"
                  >
                    SC2 Hackathon Info
                  </button>
                </div>
              )}

              {/* Chat Input */}
              <div className="relative pt-1">
                <input 
                  type="text"
                  placeholder="Ask Sarthi anything about campus..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCustomAiSend()}
                  className="w-full pl-4 pr-11 py-2.5 bg-white/15 focus:bg-white/25 border border-white/20 focus:border-white/40 rounded-xl placeholder-indigo-200 text-xs text-white focus:outline-none transition-all font-semibold"
                />
                <button 
                  onClick={handleCustomAiSend}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white text-brand-primary rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all mt-0.5"
                >
                  <Send size={12} className="text-brand-primary" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 🎯 Attendance 75% Predictor & Safe Bunk Sandbox */}
      <AttendancePredictor setActiveTab={setActiveTab} />

      {/* 🧰 Campus Services & Utility Toolbox (Inspired by SETU IIT KGP, Gymkhana IIT Bombay & Everything App) */}
      <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-7 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
              Campus Toolbox & Portals
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Direct access to essential student utilities, bus tracking, fees, and academic repositories.
            </p>
          </div>
          <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest bg-brand-primary/10 dark:bg-brand-primary/20 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            Official IIITK Integrations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Tool 1: Weekly Mess Menu */}
          <div 
            onClick={() => setActiveTab("resources")}
            className="p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 hover:border-brand-primary/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Utensils size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                  Weekly Mess Menu
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  Full 7-day breakfast, lunch, snacks, and dinner schedule with diet tags.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-brand-primary dark:group-hover:text-brand-teal">
              <span>View Weekly Menu</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tool 2: Fee Payment Portal */}
          <div 
            onClick={() => setActiveTab("resources")}
            className="p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 hover:border-brand-primary/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <CreditCard size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                  Fee Payment (SBI Collect)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  Semester tuition dues, hostel fees, challan receipts, and scholarship status.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-brand-primary dark:group-hover:text-brand-teal">
              <span>Pay & Download Receipts</span>
              <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tool 3: Digital Library OPAC */}
          <div 
            onClick={() => setActiveTab("resources")}
            className="p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 hover:border-brand-primary/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                  Library OPAC & E-Books
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  Search catalog, renew borrowed books, IEEE Xplore, and ACM digital library access.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-brand-primary dark:group-hover:text-brand-teal">
              <span>Search 12,000+ Titles</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tool 4: City Shuttle & Bus Tracking */}
          <div 
            onClick={() => setActiveTab("map")}
            className="p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 hover:border-brand-primary/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Bus size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                  City Shuttle & Transit
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  Live tracking for Kalyani Railway Station ⇄ IIITK Permanent Campus bus routes.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-brand-primary dark:group-hover:text-brand-teal">
              <span>Next Shuttle in 18m</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* 📖 Story Highlight Modal */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-brand-navy rounded-3xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 p-6 relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border">
                    <img src={selectedStory.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{selectedStory.club}</h4>
                    <span className="text-[10px] text-slate-400 font-medium">{selectedStory.time}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center hover:bg-slate-200"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-video bg-slate-900">
                <img src={selectedStory.image} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  {selectedStory.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedStory.description}
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  onClick={() => {
                    setSelectedStory(null);
                    setActiveTab("clubs");
                  }}
                  className="flex-1 py-3 bg-brand-primary text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all text-center"
                >
                  Open Club Portal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 📄 Notice Preview Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-brand-navy rounded-3xl max-w-lg w-full p-7 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest">
                    {selectedNotice.dept}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white leading-tight">
                    {selectedNotice.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">{selectedNotice.time}</p>
                </div>
                <button 
                  onClick={() => setSelectedNotice(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center hover:bg-slate-200 shrink-0"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {selectedNotice.content}
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText size={18} className="text-brand-primary" />
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{selectedNotice.file}</p>
                    <p className="text-[10px] text-slate-400">{selectedNotice.size} • Official Seal Attached</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Downloaded ${selectedNotice.file} successfully to your device.`)}
                  className="px-3.5 py-1.5 bg-brand-primary text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Download</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🍲 Mess Feedback Modal */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-brand-navy rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  Mess Dining Feedback (BH-1)
                </h3>
                <button 
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setFeedbackSuccess(false);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {feedbackSuccess ? (
                <div className="p-6 text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={24} />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Feedback Submitted!</h4>
                  <p className="text-xs text-slate-500">Thank you. The Mess Committee and Student Representative review all daily scores.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Rate today's lunch quality (Paneer Butter Masala & Dal Tadka):
                  </p>

                  <div className="flex justify-center gap-3 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setMessRating(star)}
                        className={cn(
                          "text-2xl transition-transform hover:scale-125",
                          star <= messRating ? "text-amber-400" : "text-slate-300 dark:text-slate-700"
                        )}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Optional remarks on taste, hygiene, or refill speed..."
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  />

                  <button
                    onClick={() => setFeedbackSuccess(true)}
                    className="w-full py-3 bg-brand-primary text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all"
                  >
                    Submit Feedback
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Viewport-Centered Digital Student ID Card Modal */}
      <DigitalStudentIDModal
        isOpen={showIdCard}
        onClose={() => setShowIdCard(false)}
      />

    </div>
  );
}
