import React, { useState, useRef, useEffect } from "react";
import { 
  User, 
  Settings, 
  LogOut, 
  GraduationCap, 
  CheckSquare, 
  Shield, 
  QrCode, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Moon, 
  Sun, 
  CreditCard, 
  CheckCircle2, 
  Mail, 
  BookOpen, 
  MapPin, 
  PhoneCall, 
  X,
  Copy,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { currentUser, dashboardMetrics } from "../../data/mockData";
import { IIITKCrest } from "../common/IIITKLogo";

interface ProfileDropdownProps {
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function ProfileDropdown({ setActiveTab, isDarkMode, toggleDarkMode }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSignOutToast, setShowSignOutToast] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setShowIdCard(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(currentUser.enrollmentId || "IIITK/BTech/2022/045");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  const handleSignOut = () => {
    setShowSignOutToast(true);
    setIsOpen(false);
    setTimeout(() => setShowSignOutToast(false), 3500);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button in Header */}
      <button
        id="dark-mode-toggle-profile"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 p-1.5 sm:p-2 sm:pr-3.5 rounded-full transition-all duration-200 group relative border",
          isOpen 
            ? "bg-slate-100 dark:bg-slate-800/90 border-slate-300 dark:border-slate-700 ring-2 ring-brand-primary/20 dark:ring-brand-teal/20" 
            : "hover:bg-slate-50 dark:hover:bg-slate-800/80 border-transparent hover:border-slate-200 dark:hover:border-slate-800"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User profile and account settings menu"
      >
        {/* Avatar with Status Dot */}
        <div className="relative shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-brand-primary via-indigo-600 to-indigo-800 flex items-center justify-center text-white text-xs sm:text-sm font-black shadow-sm ring-2 ring-white dark:ring-slate-900 group-hover:scale-105 transition-transform">
            BB
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" title="Active on Campus" />
        </div>

        {/* User Info labels (desktop only) */}
        <div className="hidden sm:block text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
              Barnik Basu
            </span>
            <span className="px-1.5 py-0.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal text-[9px] font-black rounded uppercase tracking-tighter">
              STUDENT
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
            CSE • Year 2
          </p>
        </div>

        <ChevronDown 
          size={16} 
          className={cn(
            "text-slate-400 dark:text-slate-500 transition-transform duration-200 hidden sm:block",
            isOpen ? "rotate-180 text-brand-primary dark:text-brand-teal" : "group-hover:text-slate-600"
          )} 
        />
      </button>

      {/* Dropdown Menu Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-white dark:bg-brand-navy border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
            style={{
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)"
            }}
          >
            {/* User Profile Header Card */}
            <div className="p-5 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/60 dark:to-brand-navy border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-3.5">
                <div className="relative shrink-0">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-brand-primary via-indigo-600 to-indigo-900 flex items-center justify-center text-white text-base font-black shadow-md ring-2 ring-white dark:ring-slate-800">
                    BB
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white truncate">
                      Barnik Basu
                    </h4>
                    <CheckCircle2 size={15} className="text-brand-primary dark:text-brand-teal shrink-0" />
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-0.5 truncate">
                    <Mail size={12} className="shrink-0 text-slate-400" />
                    <span className="truncate text-[11px] font-medium">barnik.basu@iiitkalyani.ac.in</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2 py-0.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal text-[10px] font-black rounded-md uppercase tracking-wider">
                      B.Tech CSE
                    </span>
                    <button 
                      onClick={handleCopyId}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-mono rounded-md transition-colors"
                      title="Click to copy enrollment ID"
                    >
                      {currentUser.enrollmentId}
                      {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} className="text-slate-400" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Academic Mini-Bar */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-center">
                <div className="p-2 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Attendance</span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">82.5%</span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">CGPA</span>
                  <span className="text-xs font-black text-amber-500 dark:text-amber-400">8.54</span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Semester</span>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200">Sem 4</span>
                </div>
              </div>
            </div>

            {/* Navigation & Setting Links */}
            <div className="p-2 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Account & Preferences
              </div>

              <button
                onClick={() => handleNavigate("settings")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/80 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Settings size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                      Personal Account Settings
                    </span>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500">
                      Profile details, passwords & preferences
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleNavigate("analytics")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/80 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Academic Profile & GPA
                    </span>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500">
                      View transcripts, courses & forecasts
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleNavigate("tasks")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/80 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <CheckSquare size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      My Deadlines & Tasks
                    </span>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500">
                      Assignments, lab submissions & tests
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[9px] font-black rounded-md">
                  Active
                </span>
              </button>

              <button
                onClick={() => {
                  setShowIdCard(true);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/80 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <QrCode size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      Digital Student ID Card
                    </span>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500">
                      Gate access pass & library barcode
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Appearance & Quick Switch */}
            <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    {isDarkMode ? <Moon size={14} className="text-brand-teal" /> : <Sun size={14} className="text-amber-500" />}
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isDarkMode ? "Dark Theme" : "Light Theme"}
                  </span>
                </div>
                <button
                  type="button"
                  id="dark-mode-toggle-profile-switch"
                  onClick={toggleDarkMode}
                  className={cn(
                    "w-11 h-6 rounded-full transition-all relative p-1 flex items-center",
                    isDarkMode ? "bg-brand-primary justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                  )}
                  aria-label="Toggle theme mode"
                >
                  <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" />
                </button>
              </div>

              {/* Sign Out / Switch Session */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors mt-1"
              >
                <LogOut size={15} />
                <span>Log Out of Campus OS</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Digital Student ID Card Modal */}
      <AnimatePresence>
        {showIdCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-sm bg-gradient-to-b from-slate-900 via-brand-navy to-indigo-950 text-white rounded-3xl p-6 shadow-2xl border border-indigo-500/30 relative overflow-hidden"
            >
              {/* Background Crest watermark */}
              <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
                <IIITKCrest size={220} monochrome={true} />
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <IIITKCrest size={36} />
                  <div>
                    <h3 className="font-heading font-bold text-sm tracking-tight leading-none">IIIT KALYANI</h3>
                    <p className="text-[9px] text-indigo-300 font-bold uppercase tracking-widest mt-0.5">Digital Student Pass</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIdCard(false)}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-6 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-teal via-brand-primary to-indigo-600 p-1 shadow-lg ring-4 ring-white/10">
                  <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center font-black text-2xl text-white">
                    BB
                  </div>
                </div>

                <h2 className="font-heading text-xl font-bold mt-3">Barnik Basu</h2>
                <p className="text-xs font-bold text-brand-teal uppercase tracking-wider">{currentUser.department}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">ID: {currentUser.enrollmentId}</p>

                {/* Simulated Barcode / QR Section */}
                <div className="w-full bg-white text-slate-900 rounded-2xl p-4 mt-5 flex flex-col items-center shadow-inner">
                  <div className="flex gap-1 h-12 w-full justify-center items-end py-1">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 2, 3, 1, 3, 2, 4, 1, 2, 3, 1].map((w, i) => (
                      <div 
                        key={i} 
                        className="bg-black" 
                        style={{ width: `${w * 2.5}px`, height: `${30 + (i % 5) * 4}px` }} 
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] font-bold tracking-widest text-slate-500 mt-1">
                    {currentUser.enrollmentId.replace(/\//g, "-")}
                  </span>
                </div>

                <div className="flex items-center justify-between w-full mt-4 text-[10px] text-slate-400">
                  <span>Valid Thru: June 2026</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified Active
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sign Out Toast Notification */}
      <AnimatePresence>
        {showSignOutToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 sm:bottom-10 sm:right-10 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50 text-xs font-bold border border-slate-700 dark:border-slate-200"
          >
            <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center">
              <Check size={12} />
            </div>
            <span>Account session refreshed for Barnik Basu.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
