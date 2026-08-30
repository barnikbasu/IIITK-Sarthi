import React, { useState, useRef } from "react";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Database, 
  CheckCircle2, 
  Smartphone, 
  Moon, 
  Sun, 
  QrCode, 
  CreditCard, 
  ChevronRight,
  Edit3,
  Lock,
  BookOpen,
  Receipt,
  GraduationCap,
  Calendar,
  Phone,
  Droplet,
  Building2,
  Hash,
  Mail,
  RotateCcw,
  Sparkles,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useStudentProfile } from "../../context/StudentProfileContext";
import { DefaultStudentPhotoPlaceholder } from "../common/StudentIdCardAssets";
import DigitalStudentIDModal from "../common/DigitalStudentIDModal";
import EditProfileModal from "../profile/EditProfileModal";
import { cn } from "../../lib/utils";

export default function SettingsView() {
  const { profile, completionPercentage, resetProfile } = useStudentProfile();

  const [showIdCard, setShowIdCard] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSavedToast, setIsSavedToast] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [bluetoothCheckin, setBluetoothCheckin] = useState(true);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  const idButtonRef = useRef<HTMLButtonElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = () => {
    if (typeof (window as any).toggleDarkMode === "function") {
      (window as any).toggleDarkMode();
      setIsDark((prev) => !prev);
    } else {
      const next = !isDark;
      setIsDark(next);
      if (next) {
        document.documentElement.classList.add("dark", "dark-mode");
        document.body && document.body.classList.add("dark", "dark-mode");
        localStorage.setItem("theme", "dark");
        localStorage.setItem("themePreference", "dark");
        localStorage.setItem("darkmode", "true");
      } else {
        document.documentElement.classList.remove("dark", "dark-mode");
        document.body && document.body.classList.remove("dark", "dark-mode");
        localStorage.setItem("theme", "light");
        localStorage.setItem("themePreference", "light");
        localStorage.setItem("darkmode", "false");
      }
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset profile to default demo information (BARNIK BASU)?")) {
      resetProfile();
      setIsSavedToast(true);
      setTimeout(() => setIsSavedToast(false), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Student Profile & Settings
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-tight mt-1">
            Personalize your student identity, view your digital pass, and configure OS preferences.
          </p>
        </div>

        {/* Action Buttons Top Bar */}
        <div className="flex items-center gap-2.5">
          <button
            ref={editButtonRef}
            type="button"
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-2xl text-xs font-bold shadow-md shadow-brand-primary/20 transition-all cursor-pointer"
          >
            <Edit3 size={15} />
            <span>Edit Profile</span>
          </button>

          <button
            ref={idButtonRef}
            type="button"
            onClick={() => setShowIdCard(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-teal-600/20 transition-all cursor-pointer"
          >
            <CreditCard size={15} />
            <span>Digital ID Card</span>
          </button>
        </div>
      </div>

      {/* Toast feedback */}
      <AnimatePresence>
        {isSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest justify-center"
          >
            <CheckCircle2 size={18} />
            <span>Profile defaults restored successfully</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Profile Summary Card */}
      <div className="bg-white dark:bg-brand-navy border border-slate-200/80 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full -translate-y-40 translate-x-40 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          {/* Avatar Container */}
          <div className="relative group cursor-pointer" onClick={() => setShowEditModal(true)}>
            <div className="w-28 h-36 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-md flex items-center justify-center">
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt={profile.fullName}
                  className="w-full h-full object-cover transition-opacity duration-200"
                />
              ) : (
                <DefaultStudentPhotoPlaceholder className="w-full h-full" />
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity flex items-center justify-center text-white text-[11px] font-bold gap-1">
              <Edit3 size={14} />
              <span>{profile.profilePhoto ? "Change" : "Upload Photo"}</span>
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal text-[11px] font-black uppercase tracking-wider rounded-full">
                B.Tech Student
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-bold rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Personalized Pass (Local)</span>
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {profile.fullName || "BARNIK BASU"}
              </h3>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mt-0.5">
                {profile.department || "Computer Science and Engineering"}
              </p>
              <p className="text-xs font-mono font-bold text-slate-400 mt-1">
                ID: {profile.studentId || "CSE/25028/1428"} • Batch: {profile.batch || "2025 - 2029"}
              </p>
            </div>

            {/* Profile Completion Bar */}
            <div className="pt-2 max-w-md">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-600 dark:text-slate-300">Profile Personalization</span>
                <span className="text-brand-primary dark:text-brand-teal">{completionPercentage}% Completed</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-teal rounded-full"
                />
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                {completionPercentage < 100
                  ? "Complete optional fields (DOB, blood group, emergency contact) to enrich your profile."
                  : "All profile and emergency fields are up to date."}
              </p>
            </div>
          </div>

          {/* Quick Card Action */}
          <div className="shrink-0 flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setShowIdCard(true)}
              className="w-full md:w-auto flex items-center justify-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all group cursor-pointer shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
                <QrCode size={20} />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                  Digital Student ID
                </span>
                <span className="block text-[10px] text-slate-400 font-mono">
                  Tap to view 3D card
                </span>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Future Institutional ERP Sync */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Personal Info & Future Institutional Sync */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Personal & Emergency Details Card */}
          <div className="bg-white dark:bg-brand-navy border border-slate-200/80 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <User size={20} className="text-brand-primary dark:text-brand-teal" />
                Personal & Medical Information
              </h3>
              <button
                type="button"
                onClick={() => setShowEditModal(true)}
                className="text-xs font-bold text-brand-primary dark:text-brand-teal hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 size={13} />
                <span>Edit Details</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50/70 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Full Legal Name</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 block">
                  {profile.fullName || "Not provided"}
                </span>
              </div>

              <div className="p-4 bg-slate-50/70 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Department / Branch</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 block">
                  {profile.department || "Not provided"}
                </span>
              </div>

              <div className="p-4 bg-slate-50/70 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Student ID / Enrollment</span>
                <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 block">
                  {profile.studentId || "Not provided"}
                </span>
              </div>

              <div className="p-4 bg-slate-50/70 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Date of Birth</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-400" />
                  <span>{profile.dateOfBirth || "Not provided"}</span>
                </span>
              </div>

              <div className="p-4 bg-slate-50/70 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Blood Group</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Droplet size={14} className="text-rose-500" />
                  <span>{profile.bloodGroup || "Not provided"}</span>
                </span>
              </div>

              <div className="p-4 bg-slate-50/70 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Emergency Contact</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Phone size={14} className="text-emerald-500" />
                  <span>{profile.emergencyContact || "Not provided"}</span>
                </span>
              </div>

              <div className="p-4 bg-slate-50/70 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800 sm:col-span-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Institutional Email</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Mail size={14} className="text-sky-500" />
                  <span>{profile.email || "barnik.basu@iiitkalyani.ac.in"}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Future-Ready Architecture: Institutional ERP & SSO Sync */}
          <div className="bg-white dark:bg-brand-navy border border-slate-200/80 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield size={20} className="text-brand-primary dark:text-brand-teal" />
                  Institutional Records & ERP Sync
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">
                  Future-ready integration layer for verified academic services.
                </p>
              </div>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-mono font-bold rounded-full">
                SSO READY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Library Clearance */}
              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 space-y-2 opacity-90">
                <div className="flex items-center justify-between">
                  <BookOpen size={18} className="text-slate-500" />
                  <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    <Lock size={10} /> Locked
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Central Library</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Borrow limits, fine balance, and RFID card sync.
                </p>
              </div>

              {/* Fee Management */}
              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 space-y-2 opacity-90">
                <div className="flex items-center justify-between">
                  <Receipt size={18} className="text-slate-500" />
                  <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    <Lock size={10} /> Locked
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Fee Status & Dues</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Semester payment receipt synchronization.
                </p>
              </div>

              {/* Academic Grade Card */}
              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 space-y-2 opacity-90">
                <div className="flex items-center justify-between">
                  <GraduationCap size={18} className="text-slate-500" />
                  <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    <Lock size={10} /> Locked
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">ERP Grade Card</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Official SGPA/CGPA transcript verification.
                </p>
              </div>
            </div>

            <div className="p-4 bg-sky-50/60 dark:bg-sky-950/20 rounded-2xl border border-sky-200/60 dark:border-sky-900/40 flex items-start gap-3">
              <Info size={18} className="text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
              <p className="text-xs text-sky-900 dark:text-sky-200 leading-relaxed font-medium">
                The Sarthi frontend architecture is built with an abstracted student service layer. When IIIT Kalyani's authenticated ERP backend endpoints are deployed, this interface will automatically transition to institutional sync mode without UI redesigns.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Device & App Preferences */}
        <div className="lg:col-span-4 space-y-8">
          {/* Appearance Card */}
          <div className="bg-white dark:bg-brand-navy border border-slate-200/80 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Moon size={18} className="text-brand-primary dark:text-brand-teal" />
              Theme & Appearance
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">Dark Mode</h4>
                  <p className="text-[10px] text-slate-400">Eye-safe high contrast theme</p>
                </div>
                <button 
                  type="button"
                  onClick={toggleTheme}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative p-1 flex items-center cursor-pointer",
                    isDark ? "bg-brand-primary justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
                  )}
                  aria-label="Toggle dark mode theme"
                >
                  <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>
            </div>
          </div>

          {/* Bluetooth LHC Check-in Card */}
          <div className="bg-white dark:bg-brand-navy border border-slate-200/80 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Smartphone size={18} className="text-brand-primary dark:text-brand-teal" />
              LHC Bluetooth Presence
            </h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              When within range of Lecture Hall Complex (LHC) beacons, your attendance is verified.
            </p>

            <div className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-900/40 rounded-xl border border-slate-200/50 dark:border-slate-800">
              <div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">Beacon Detection</h4>
                <p className="text-[10px] text-slate-400">Active during lecture slots</p>
              </div>
              <button 
                type="button"
                onClick={() => setBluetoothCheckin(!bluetoothCheckin)}
                className={cn(
                  "w-10 h-5 rounded-full transition-all relative p-0.5 flex items-center cursor-pointer",
                  bluetoothCheckin ? "bg-brand-primary justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
                )}
              >
                <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-md" />
              </button>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="bg-white dark:bg-brand-navy border border-slate-200/80 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Bell size={18} className="text-brand-primary dark:text-brand-teal" />
              Alerts & Notifications
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">Email Alerts</h4>
                  <p className="text-[10px] text-slate-400">Official circulars & notices</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={cn(
                    "w-10 h-5 rounded-full transition-all relative p-0.5 flex items-center cursor-pointer",
                    emailNotifications ? "bg-brand-primary justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
                  )}
                >
                  <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">Push Notifications</h4>
                  <p className="text-[10px] text-slate-400">Class starts & mess menu updates</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={cn(
                    "w-10 h-5 rounded-full transition-all relative p-0.5 flex items-center cursor-pointer",
                    pushNotifications ? "bg-brand-primary justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
                  )}
                >
                  <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>
            </div>
          </div>

          {/* Reset & Storage Info */}
          <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-800 p-6 rounded-[2.5rem] space-y-4">
            <div className="flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-1.5">
                <Database size={15} />
                <span className="text-[10px] font-black uppercase tracking-widest">Local Persistence</span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-[10px] font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset Demo</span>
              </button>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 font-medium">
              <p>Storage Engine: Browser LocalStorage</p>
              <p>Key: <code className="font-mono text-[10px] bg-slate-200/60 dark:bg-slate-800 px-1 py-0.5 rounded">iiitk_student_profile</code></p>
              <p>Sarthi Build: v2.5 Synchronized 🟢</p>
            </div>
          </div>
        </div>

      </div>

      {/* Viewport-Centered Digital Student ID Card Modal */}
      <DigitalStudentIDModal
        isOpen={showIdCard}
        onClose={() => setShowIdCard(false)}
        triggerRef={idButtonRef}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        triggerRef={editButtonRef}
      />
    </div>
  );
}
