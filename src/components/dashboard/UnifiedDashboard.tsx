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
  HelpCircle as QuestionIcon,
  Search,
  User,
  Bot
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

interface UnifiedDashboardProps {
  setActiveTab: (tab: string) => void;
}

export default function UnifiedDashboard({ setActiveTab }: UnifiedDashboardProps) {
  // Local states for interactive elements
  const [aiInput, setAiInput] = useState("");
  const [aiChatMode, setAiChatMode] = useState(false);
  const [aiMessages, setAiMessages] = useState<{role: "user" | "ai", content: string}[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  // Suggested actions handler
  const handleAiAction = (query: string) => {
    setAiChatMode(true);
    setAiLoading(true);
    const newMessages = [{ role: "user" as const, content: query }];
    setAiMessages(newMessages);

    // Simulated premium answers matching Barnik's IIITK life
    setTimeout(() => {
      let reply = "";
      if (query.includes("Mess")) {
        reply = "The BH-1 Mess is located on the Ground Floor of the Boys Hostel. Today's special is Paneer Butter Masala for Lunch! 🥘";
      } else if (query.includes("CGPA")) {
        reply = "Your current CGPA is 8.42 (Computer Science, Semester 4). You are ranked 8th in your branch! Keep it up! 📈";
      } else if (query.includes("empty Lab")) {
        reply = "LHC-201 and CS Lab 3 are currently unoccupied and open for self-study. Next scheduled lab starts at 2:00 PM. 🏫";
      } else {
        reply = `I have analyzed your query: "${query}". I'm on it! For full continuous voice and chat assistance, please toggle the floating Sarthi AI agent on your screen. ✨`;
      }
      setAiMessages(prev => [...prev, { role: "ai", content: reply }]);
      setAiLoading(false);
    }, 1000);
  };

  const handleCustomAiSend = () => {
    if (!aiInput.trim()) return;
    const userQuery = aiInput.trim();
    setAiInput("");
    handleAiAction(userQuery);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Good Morning, Barnik <span className="animate-bounce">👋</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold tracking-tight text-sm mt-1">
            Everything You Need Today at a Glance.
          </p>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/15 dark:border-brand-primary/20 rounded-2xl text-brand-primary dark:text-brand-teal text-xs font-black uppercase tracking-widest shadow-sm">
          <Calendar size={14} />
          <span>Tuesday, Feb 24 • Semester 4</span>
        </div>
      </div>

      {/* Row 1: UP NEXT & ATTENDANCE HEALTH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* UP NEXT Class - Left Card (takes 8 cols) */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-8 bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/5 dark:bg-brand-teal/5 rounded-full -translate-y-40 translate-x-40 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-primary dark:text-brand-teal">
                <span className="w-2 h-2 bg-brand-primary dark:text-brand-teal rounded-full animate-ping"></span>
                <span className="text-[10px] font-black uppercase tracking-widest">Up Next</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Database Management Systems
              </h3>
              <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 font-bold text-sm">
                <MapPin size={16} className="text-slate-400" />
                <span>LHC-102 • Prof. Mukherjee</span>
              </div>
            </div>
            
            {/* Database Stack Icon Mockup */}
            <div className="relative shrink-0 flex items-center justify-center w-24 h-24 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80">
               <svg className="w-12 h-12 text-slate-300 dark:text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
               </svg>
            </div>
          </div>

          <div className="relative z-10 mt-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-1.5 text-slate-900 dark:text-white">
                 <span className="text-6xl font-black tracking-tighter text-brand-primary dark:text-brand-teal">15</span>
                 <span className="text-lg font-bold text-slate-500 dark:text-slate-400">mins</span>
              </div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-2">
                Class starts at 10:00 AM. Attendance recorded via Bluetooth.
              </p>
            </div>
            
            <button 
              onClick={() => setActiveTab("schedule")}
              className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900 hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 text-brand-primary dark:text-brand-teal rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800/60 transition-all active:scale-95"
            >
               View Schedule
            </button>
          </div>
        </motion.div>

        {/* ATTENDANCE HEALTH - Right Card (takes 4 cols) */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-4 bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">Attendance Health</h4>
              <span className="px-3 py-1 bg-status-success/10 text-status-success rounded-full text-[10px] font-black uppercase tracking-wider">
                Safe
              </span>
            </div>

            <div className="flex items-center gap-6">
              {/* Clean Donut SVG progress */}
              <div className="relative w-24 h-24 shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    className="text-slate-100 dark:text-slate-800"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="38"
                    cx="48"
                    cy="48"
                  />
                  <circle
                    className="text-brand-primary dark:text-brand-teal"
                    strokeWidth="8"
                    strokeDasharray={238.76}
                    strokeDashoffset={238.76 - (238.76 * 82) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="38"
                    cx="48"
                    cy="48"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">82%</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Avg. across 6 courses</p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Min Required: 75%
                </p>
              </div>
            </div>
          </div>

          {/* AI Insight sub-card */}
          <div className="mt-6 p-4 bg-brand-primary/5 dark:bg-indigo-950/20 rounded-2xl border border-brand-primary/10 dark:border-slate-800/80 space-y-2">
             <div className="flex items-center gap-1.5 text-brand-primary dark:text-brand-teal font-black uppercase tracking-widest text-[9px]">
                <Zap size={12} fill="currentColor" />
                <span>AI Insight</span>
             </div>
             <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
               "You can safely skip 2 more Computer Networks classes without dropping below 75%."
             </p>
          </div>
        </motion.div>

      </div>

      {/* Row 2: SCHEDULE, DEADLINES & SARTHI AI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Column 1: Today's Schedule Timeline */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">Today's Schedule</h4>
              <Calendar size={18} className="text-slate-400" />
            </div>

            {/* Timeline slots */}
            <div className="relative pl-6 space-y-6 border-l border-slate-100 dark:border-slate-800/80">
              
              {/* Slot 1 (Active) */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-[11px] h-[11px] rounded-full bg-brand-primary dark:bg-brand-teal ring-4 ring-brand-primary/15 dark:ring-brand-teal/20"></div>
                <div>
                  <p className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-wider">10:00 - 10:55 AM</p>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Database Management</h5>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">LHC-102</p>
                </div>
              </div>

              {/* Slot 2 */}
              <div className="relative opacity-85">
                <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">11:00 - 11:55 AM</p>
                  <h5 className="font-bold text-sm text-slate-800 dark:text-slate-300 mt-1">Computer Networks</h5>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">LHC-201</p>
                </div>
              </div>

              {/* Slot 3 */}
              <div className="relative opacity-60">
                <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">02:00 - 04:55 PM</p>
                  <h5 className="font-bold text-sm text-slate-700 dark:text-slate-400 mt-1">Operating Systems Lab</h5>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">CS Lab 3</p>
                </div>
              </div>

            </div>
          </div>

          <button 
            onClick={() => setActiveTab("schedule")}
            className="w-full mt-6 py-3.5 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200/50 dark:border-slate-800/50 transition-all text-center"
          >
             Open Full Timeline
          </button>
        </motion.div>

        {/* Column 2: Deadlines list */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">Deadlines</h4>
              <span className="px-2.5 py-1 bg-status-danger/10 text-status-danger rounded-full text-[9px] font-black uppercase tracking-wider">
                2 Critical
              </span>
            </div>

            <div className="space-y-4">
              
              {/* Deadline 1: VLSI Lab Report (Critical) */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/20 dark:bg-slate-900/10 flex items-center justify-between gap-4 transition-all group cursor-pointer">
                <div className="space-y-1.5 flex-1">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white leading-none">VLSI Lab Report</h5>
                  <p className="text-[10px] font-black text-status-danger uppercase tracking-wider">Due in 4 hours</p>
                  
                  {/* Urgency Progress bar */}
                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "90%" }}
                      className="h-full bg-status-danger"
                    />
                  </div>
                </div>
                <AlertCircle size={18} className="text-status-danger shrink-0 animate-pulse" />
              </div>

              {/* Deadline 2: OS Assignment */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/20 dark:bg-slate-900/10 flex items-center justify-between gap-4 transition-all group cursor-pointer">
                <div className="space-y-1.5 flex-1">
                  <h5 className="font-bold text-sm text-slate-800 dark:text-slate-300 leading-none">OS Assignment</h5>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Due Tomorrow, 11:59 PM</p>
                  
                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "40%" }}
                      className="h-full bg-slate-400"
                    />
                  </div>
                </div>
                <FileText size={18} className="text-slate-400 shrink-0" />
              </div>

              {/* Deadline 3: Minor Project Docs */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/20 dark:bg-slate-900/10 flex items-center justify-between gap-4 transition-all group cursor-pointer">
                <div className="space-y-1.5 flex-1">
                  <h5 className="font-bold text-sm text-slate-800 dark:text-slate-300 leading-none">Minor Project Docs</h5>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Due in 3 days</p>
                </div>
                <Folder size={18} className="text-slate-400 shrink-0" />
              </div>

            </div>
          </div>

          <button 
            onClick={() => setActiveTab("tasks")}
            className="w-full mt-6 py-3.5 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200/50 dark:border-slate-800/50 transition-all text-center"
          >
             View All Tasks ({3})
          </button>
        </motion.div>

        {/* Column 3: Sarthi AI Campus Co-pilot */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-brand-primary text-white rounded-[2.5rem] p-8 border border-white/10 shadow-lg flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Subtle sparkle backgrounds */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24 blur-2xl pointer-events-none group-hover:bg-white/10 transition-all"></div>
          
          <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-inner">
                   <Sparkles size={20} className="text-brand-teal" />
                </div>
                <div>
                  <h4 className="font-bold text-base tracking-tight leading-tight">Sarthi AI</h4>
                  <p className="text-[10px] text-indigo-100 uppercase tracking-widest font-black">Your Campus Co-pilot</p>
                </div>
              </div>

              {/* Suggested actions or Local message response */}
              <div className="mt-6 space-y-3 min-h-[140px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!aiChatMode ? (
                    <motion.div 
                      key="actions"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-2.5"
                    >
                      <p className="text-[10px] text-white/60 font-black uppercase tracking-wider mb-2">Suggested actions:</p>
                      <button 
                        onClick={() => handleAiAction("Where is the Mess?")}
                        className="w-full text-left px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl text-xs font-semibold hover:translate-x-1 transition-all"
                      >
                        Where is the Mess?
                      </button>
                      <button 
                        onClick={() => handleAiAction("Show my CGPA")}
                        className="w-full text-left px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl text-xs font-semibold hover:translate-x-1 transition-all"
                      >
                        Show my CGPA
                      </button>
                      <button 
                        onClick={() => handleAiAction("Find empty Lab")}
                        className="w-full text-left px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl text-xs font-semibold hover:translate-x-1 transition-all"
                      >
                        Find empty Lab
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="chat"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 max-h-[140px] overflow-y-auto pr-1 scrollbar-hide text-xs"
                    >
                      {aiMessages.map((msg, idx) => (
                        <div key={idx} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
                          <div className={cn("p-3 rounded-2xl max-w-[85%] font-medium leading-relaxed shadow-sm", 
                            msg.role === "user" ? "bg-white/20 text-white rounded-tr-none" : "bg-white text-slate-800 rounded-tl-none font-semibold")}>
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {aiLoading && (
                        <div className="flex gap-2 justify-start">
                          <div className="px-4 py-2.5 bg-white/15 rounded-2xl rounded-tl-none text-white font-semibold flex items-center gap-1.5">
                             <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                             <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                             <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom mini-search */}
            <div className="relative mt-4">
              <input 
                type="text"
                placeholder="Ask Sarthi..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCustomAiSend()}
                className="w-full pl-4 pr-12 py-3.5 bg-white/10 focus:bg-white/15 border border-white/15 focus:border-white/30 rounded-2xl placeholder-indigo-100 text-xs text-white focus:outline-none focus:ring-0 transition-all font-semibold"
              />
              <button 
                onClick={handleCustomAiSend}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-white text-brand-primary rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
              >
                <Send size={14} className="text-brand-primary" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Row 3: MESS MENU & COLLEGE NOTICES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Mess Menu - Left Part (7 columns) */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-7 bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">Mess Menu</h4>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Today, Feb 24</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LUNCH Sub-card */}
              <div className="p-5 rounded-3xl bg-amber-50/30 dark:bg-amber-950/5 border border-amber-200/20 dark:border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500 font-black text-[10px] uppercase tracking-widest">
                    <Sun size={14} />
                    <span>Lunch</span>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-200">Paneer Butter Masala</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Jeera Rice</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Dal Tadka</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Salad & Raita</p>
                </div>
              </div>

              {/* DINNER Sub-card */}
              <div className="p-5 rounded-3xl bg-indigo-50/30 dark:bg-indigo-950/10 border border-indigo-200/20 dark:border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-brand-primary dark:text-brand-teal font-black text-[10px] uppercase tracking-widest">
                    <Moon size={14} />
                    <span>Dinner</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-200">Chicken Kadhai / Mix Veg</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Tandoori Roti</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Gulab Jamun</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Ice Cream</p>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
               IIITK BH-1 Dining Hall
            </span>
          </div>
        </motion.div>

        {/* College Notices - Right Part (5 columns) */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-5 bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">College Notices</h4>
              <button 
                onClick={() => setActiveTab("resources")} 
                className="text-xs font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest hover:opacity-80 transition-all"
              >
                 View All
              </button>
            </div>

            <div className="space-y-4">
              
              {/* Notice 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-slate-200/30 dark:border-slate-700/50">
                  <span className="text-[8px] font-black uppercase text-slate-400 leading-none">Feb</span>
                  <span className="text-base font-black text-slate-700 dark:text-slate-200 mt-0.5 leading-none">24</span>
                </div>
                <div className="space-y-0.5">
                   <h5 className="font-bold text-sm text-slate-900 dark:text-slate-200 hover:text-brand-primary dark:hover:text-brand-teal transition-colors cursor-pointer leading-tight">
                     Convocation 2024 Registration Open
                   </h5>
                   <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1">
                     All graduating students are requested to fill the form b...
                   </p>
                </div>
              </div>

              {/* Notice 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-slate-200/30 dark:border-slate-700/50">
                  <span className="text-[8px] font-black uppercase text-slate-400 leading-none">Feb</span>
                  <span className="text-base font-black text-slate-700 dark:text-slate-200 mt-0.5 leading-none">22</span>
                </div>
                <div className="space-y-0.5">
                   <h5 className="font-bold text-sm text-slate-900 dark:text-slate-200 hover:text-brand-primary dark:hover:text-brand-teal transition-colors cursor-pointer leading-tight">
                     Revised Academic Calendar (Spring)
                   </h5>
                   <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1">
                     Major exams rescheduled to starting week of May due...
                   </p>
                </div>
              </div>

              {/* Notice 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-slate-200/30 dark:border-slate-700/50">
                  <span className="text-[8px] font-black uppercase text-slate-400 leading-none">Feb</span>
                  <span className="text-base font-black text-slate-700 dark:text-slate-200 mt-0.5 leading-none">20</span>
                </div>
                <div className="space-y-0.5">
                   <h5 className="font-bold text-sm text-slate-900 dark:text-slate-200 hover:text-brand-primary dark:hover:text-brand-teal transition-colors cursor-pointer leading-tight">
                     Hostel Wi-Fi Maintenance Notice
                   </h5>
                   <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1">
                     Intermittent connectivity expected in Block A and B...
                   </p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>

    </div>
  );
}
