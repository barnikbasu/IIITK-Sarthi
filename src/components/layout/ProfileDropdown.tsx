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
import { useStudentProfile } from "../../context/StudentProfileContext";
import DigitalStudentIDModal from "../common/DigitalStudentIDModal";
import { DefaultStudentPhotoPlaceholder } from "../common/StudentIdCardAssets";

interface ProfileDropdownProps {
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function ProfileDropdown({ setActiveTab, isDarkMode, toggleDarkMode }: ProfileDropdownProps) {
  const { profile } = useStudentProfile();

  const [isOpen, setIsOpen] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSignOutToast, setShowSignOutToast] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const studentName = profile.fullName?.trim() || "Barnik Basu";
  const studentId = profile.studentId?.trim() || "CSE/25028/1428";
  const studentDept = profile.department?.trim() || "Computer Science and Engineering";
  const studentEmail = profile.email?.trim() || "barnik.basu@iiitkalyani.ac.in";
  const studentPhoto = profile.profilePhoto;

  const initials = studentName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("") || "BB";

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
    navigator.clipboard?.writeText(studentId);
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
          "flex items-center gap-3 p-1.5 sm:p-2 sm:pr-3.5 rounded-full transition-all duration-200 group relative border cursor-pointer",
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
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-brand-primary via-indigo-600 to-indigo-800 overflow-hidden flex items-center justify-center text-white text-xs sm:text-sm font-black shadow-sm ring-2 ring-white dark:ring-slate-900 group-hover:scale-105 transition-transform">
            {studentPhoto ? (
              <img src={studentPhoto} alt={studentName} className="w-full h-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" title="Active on Campus" />
        </div>

        {/* User Info labels (desktop only) */}
        <div className="hidden sm:block text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors truncate max-w-[130px]">
              {studentName}
            </span>
            <span className="px-1.5 py-0.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal text-[9px] font-black rounded uppercase tracking-tighter shrink-0">
              STUDENT
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5 truncate max-w-[160px]">
            {studentDept.includes("Computer") ? "B.Tech CSE • Sem 4" : `${studentDept.slice(0, 16)} • Sem 4`}
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
            className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-white dark:bg-[#0D0D0D] border border-slate-200/90 dark:border-[#262626] rounded-3xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
            style={{
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.2)"
            }}
          >
            {/* User Profile Header Card */}
            <div className="p-5 bg-gradient-to-b from-slate-50 to-white dark:from-[#141414] dark:to-[#0D0D0D] border-b border-slate-100 dark:border-[#1A1A1A]">
              <div className="flex items-start gap-3.5">
                <div className="relative shrink-0">
                  <div className="w-13 h-13 rounded-2xl bg-neutral-900 dark:bg-[#1A1A1A] border border-neutral-700 dark:border-[#262626] overflow-hidden flex items-center justify-center text-white text-base font-black shadow-md ring-2 ring-white dark:ring-[#262626]">
                    {studentPhoto ? (
                      <img src={studentPhoto} alt={studentName} className="w-full h-full object-cover" />
                    ) : (
                      <DefaultStudentPhotoPlaceholder className="w-full h-full" />
                    )}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-black" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white truncate">
                      {studentName}
                    </h4>
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-[#A3A3A3] text-xs mt-0.5 truncate">
                    <Mail size={12} className="shrink-0 text-slate-400 dark:text-[#737373]" />
                    <span className="truncate text-[11px] font-medium">{studentEmail}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2 py-0.5 bg-brand-primary/10 dark:bg-[#1A1A1A] text-brand-primary dark:text-white border dark:border-[#262626] text-[10px] font-black rounded-md uppercase tracking-wider">
                      {studentDept.includes("Computer") ? "B.Tech CSE" : studentDept}
                    </span>
                    <button 
                      onClick={handleCopyId}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-[#1A1A1A] hover:bg-slate-200 dark:hover:bg-[#262626] text-slate-600 dark:text-[#D4D4D4] text-[10px] font-mono rounded-md transition-colors cursor-pointer border dark:border-[#262626]"
                      title="Click to copy enrollment ID"
                    >
                      {studentId}
                      {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} className="text-slate-400 dark:text-[#737373]" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Academic Mini-Bar */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200/60 dark:border-[#1A1A1A] text-center">
                <div className="p-2 bg-white dark:bg-[#141414] rounded-xl border border-slate-100 dark:border-[#262626]">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#737373]">Attendance</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">82.5%</span>
                </div>
                <div className="p-2 bg-white dark:bg-[#141414] rounded-xl border border-slate-100 dark:border-[#262626]">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#737373]">CGPA</span>
                  <span className="text-xs font-bold text-amber-500 dark:text-amber-400">8.54</span>
                </div>
                <div className="p-2 bg-white dark:bg-[#141414] rounded-xl border border-slate-100 dark:border-[#262626]">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#737373]">Semester</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-[#FFFFFF]">Sem 4</span>
                </div>
              </div>
            </div>

            {/* Navigation & Setting Links */}
            <div className="p-2 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#737373]">
                Account & Preferences
              </div>

              <button
                onClick={() => handleNavigate("settings")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#141414] text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-primary/10 dark:bg-[#1A1A1A] text-brand-primary dark:text-white flex items-center justify-center group-hover:scale-105 transition-transform border dark:border-[#262626]">
                    <Settings size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-[#FFFFFF] group-hover:text-brand-primary dark:group-hover:text-white transition-colors">
                      Personal Profile & Settings
                    </span>
                    <span className="block text-[10px] text-slate-400 dark:text-[#737373]">
                      Personalize name, photo, DOB & preferences
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-400 dark:text-[#737373] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleNavigate("analytics")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#141414] text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#1A1A1A] text-slate-700 dark:text-white flex items-center justify-center group-hover:scale-105 transition-transform border dark:border-[#262626]">
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-[#FFFFFF] group-hover:text-brand-primary dark:group-hover:text-white transition-colors">
                      Academic Profile & GPA
                    </span>
                    <span className="block text-[10px] text-slate-400 dark:text-[#737373]">
                      View transcripts, courses & forecasts
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-400 dark:text-[#737373] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleNavigate("tasks")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#141414] text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#1A1A1A] text-slate-700 dark:text-white flex items-center justify-center group-hover:scale-105 transition-transform border dark:border-[#262626]">
                    <CheckSquare size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-[#FFFFFF] group-hover:text-brand-primary dark:group-hover:text-white transition-colors">
                      My Deadlines & Tasks
                    </span>
                    <span className="block text-[10px] text-slate-400 dark:text-[#737373]">
                      Assignments, lab submissions & tests
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-neutral-100 dark:bg-[#1A1A1A] text-neutral-700 dark:text-[#D4D4D4] border dark:border-[#262626] text-[9px] font-bold rounded-md">
                  Active
                </span>
              </button>

              <button
                ref={triggerButtonRef}
                onClick={() => {
                  setShowIdCard(true);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#141414] text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#1A1A1A] text-slate-700 dark:text-white flex items-center justify-center group-hover:scale-105 transition-transform border dark:border-[#262626]">
                    <QrCode size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-[#FFFFFF] group-hover:text-brand-primary dark:group-hover:text-white transition-colors">
                      Digital Student ID Card
                    </span>
                    <span className="block text-[10px] text-slate-400 dark:text-[#737373]">
                      Gate access pass & library barcode
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-400 dark:text-[#737373] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Appearance & Quick Switch */}
            <div className="p-2 border-t border-slate-100 dark:border-[#1A1A1A] bg-slate-50/50 dark:bg-[#0A0A0A]">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-200/70 dark:bg-[#1A1A1A] flex items-center justify-center text-slate-600 dark:text-white border dark:border-[#262626]">
                    {isDarkMode ? <Moon size={14} className="text-amber-400" /> : <Sun size={14} className="text-amber-500" />}
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-[#D4D4D4]">
                    {isDarkMode ? "Dark Theme" : "Light Theme"}
                  </span>
                </div>
                <button
                  type="button"
                  id="dark-mode-toggle-profile-switch"
                  onClick={toggleDarkMode}
                  className={cn(
                    "w-11 h-6 rounded-full transition-all relative p-1 flex items-center cursor-pointer",
                    isDarkMode ? "bg-white justify-end text-black" : "bg-slate-300 dark:bg-slate-700 justify-start"
                  )}
                  aria-label="Toggle theme mode"
                >
                  <motion.div layout className={cn("w-4 h-4 rounded-full shadow-sm", isDarkMode ? "bg-black" : "bg-white")} />
                </button>
              </div>

              {/* Sign Out / Switch Session */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors mt-1 cursor-pointer"
              >
                <LogOut size={15} />
                <span>Log Out of Campus OS</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Digital Student ID Card Modal (Portal Centered in Viewport) */}
      <DigitalStudentIDModal
        isOpen={showIdCard}
        onClose={() => setShowIdCard(false)}
        triggerRef={triggerButtonRef}
      />

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
            <span>Account session refreshed for {studentName}.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
