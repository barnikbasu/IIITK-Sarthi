import React, { useState, useEffect, useRef } from "react";
import { 
  LayoutDashboard, 
  Calendar, 
  MapPin, 
  BookMarked, 
  ShoppingBag, 
  MessageSquare, 
  Bell, 
  User,
  Menu,
  X,
  Sparkles,
  Moon,
  Sun,
  Briefcase,
  CheckSquare,
  PhoneCall,
  Search,
  MessageCircle,
  MoreVertical,
  Users,
  LineChart,
  HelpCircle,
  ChevronDown,
  Settings,
  Network
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import SarthiAI from "../ai/SarthiAI";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "../notifications/NotificationDropdown";
import { IIITKCrest, IIITKBanner } from "../common/IIITKLogo";
import { DefaultStudentPhotoPlaceholder } from "../common/StudentIdCardAssets";
import { useStudentProfile } from "../../context/StudentProfileContext";

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { label: "Institute Atlas", icon: Network, id: "institute" },
  { label: "Events & Fests", icon: Sparkles, id: "events" },
  { label: "Clubs", icon: Users, id: "clubs" },
  { label: "Schedule", icon: Calendar, id: "schedule" },
  { label: "Attendance", icon: LineChart, id: "analytics" },
  { label: "Resources", icon: BookMarked, id: "resources" },
  { label: "Marketplace", icon: ShoppingBag, id: "market" },
  { label: "Tasks", icon: CheckSquare, id: "tasks" },
  { label: "Opportunities", icon: Briefcase, id: "opportunities" },
  { label: "Directory", icon: Search, id: "directory" },
  { label: "Map", icon: MapPin, id: "map" },
  { label: "Emergency", icon: PhoneCall, id: "emergency" },
];

export default function MainLayout({ children, activeTab, setActiveTab }: MainLayoutProps) {
  const { profile } = useStudentProfile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const darkmode = localStorage.getItem("darkmode");
    if (darkmode === "true") return true;
    if (darkmode === "false") return false;
    const themePref = localStorage.getItem("themePreference");
    if (themePref === "dark") return true;
    if (themePref === "light") return false;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [showSessionMenu, setShowSessionMenu] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    const handleThemeChange = (e: any) => {
      if (typeof e.detail?.isDark === "boolean") {
        setIsDarkMode(e.detail.isDark);
      }
    };
    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;

    if (isDarkMode) {
      root.classList.add("dark", "dark-mode");
      if (body) body.classList.add("dark", "dark-mode");
      root.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
      localStorage.setItem("themePreference", "dark");
      localStorage.setItem("darkmode", "true");
    } else {
      root.classList.remove("dark", "dark-mode");
      if (body) body.classList.remove("dark", "dark-mode");
      root.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
      localStorage.setItem("themePreference", "light");
      localStorage.setItem("darkmode", "false");
    }

    // Expose toggle function globally for HTML inline handlers or external triggers
    (window as any).toggleDarkMode = toggleDarkMode;
  }, [isDarkMode]);

  // Actual DOM scroll container reference for the main content region
  const mainContentScrollRef = useRef<HTMLDivElement>(null);

  // Global Route / Tab Change Scroll Restoration Handler:
  // Guarantees every newly opened page/tab starts fresh at the top (scrollTop: 0)
  useEffect(() => {
    const container = mainContentScrollRef.current;
    const resetScrollToTop = () => {
      if (container) {
        container.scrollTop = 0;
        if (typeof container.scrollTo === "function") {
          container.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        }
      }
      window.scrollTo({ top: 0, left: 0 });
    };

    // 1. Reset scroll position immediately upon route/tab switch
    resetScrollToTop();

    // 2. Secondary reset on next animation frame after new route DOM mounts
    const rAf = requestAnimationFrame(resetScrollToTop);

    // 3. Final reset after AnimatePresence mode="wait" transition completes (250ms duration)
    const timer = setTimeout(resetScrollToTop, 270);

    return () => {
      cancelAnimationFrame(rAf);
      clearTimeout(timer);
    };
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#000000] overflow-hidden font-sans text-slate-900 dark:text-[#FFFFFF] transition-colors duration-200">
      {/* Desktop Sidebar with Official Crest */}
      <aside className="hidden xl:flex flex-col w-72 bg-white dark:bg-[#000000] border-r border-slate-200 dark:border-[#1A1A1A]">
        <div className="p-6 pb-5 flex items-center gap-3.5 border-b border-slate-100 dark:border-[#1A1A1A]">
          <div className="relative group">
            <IIITKCrest size={44} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                IIITK Sarthi
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-[#A3A3A3] tracking-wider uppercase leading-none mt-0.5 block">
              IIIT Kalyani Campus OS
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (activeTab === item.id) {
                  if (mainContentScrollRef.current) {
                    mainContentScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
                  }
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group text-sm font-bold",
                activeTab === item.id 
                  ? "bg-brand-primary/10 dark:bg-[#1A1A1A] text-brand-primary dark:text-[#FFFFFF] shadow-sm dark:border dark:border-[#262626]" 
                  : "text-slate-500 dark:text-[#A3A3A3] hover:bg-slate-50 dark:hover:bg-[#141414] hover:text-slate-900 dark:hover:text-[#FFFFFF]"
              )}
            >
              <item.icon size={20} className={cn(
                "transition-colors",
                activeTab === item.id ? "text-brand-primary dark:text-[#FFFFFF]" : "text-slate-400 dark:text-[#737373] group-hover:text-slate-600 dark:group-hover:text-[#FFFFFF]"
              )} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-[#1A1A1A] space-y-4">
          {/* Settings Tab Option */}
          <button
            onClick={() => {
              if (activeTab === "settings") {
                if (mainContentScrollRef.current) {
                  mainContentScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
                }
              } else {
                setActiveTab("settings");
              }
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group text-sm font-bold",
              activeTab === "settings" 
                ? "bg-brand-primary/10 dark:bg-[#1A1A1A] text-brand-primary dark:text-[#FFFFFF] shadow-sm dark:border dark:border-[#262626]" 
                : "text-slate-500 dark:text-[#A3A3A3] hover:bg-slate-50 dark:hover:bg-[#141414] hover:text-slate-900 dark:hover:text-[#FFFFFF]"
            )}
          >
            <Settings size={20} className={cn(
              "transition-colors",
              activeTab === "settings" ? "text-brand-primary dark:text-[#FFFFFF]" : "text-slate-400 dark:text-[#737373] group-hover:text-slate-600 dark:group-hover:text-[#FFFFFF]"
            )} />
            <span>Settings</span>
          </button>

          {/* Student Profile Box Card */}
          <button 
            onClick={() => setActiveTab("settings")}
            className="w-full flex items-center gap-3 p-3.5 rounded-3xl border border-slate-200/60 dark:border-[#262626] bg-slate-50/50 dark:bg-[#0A0A0A] hover:bg-slate-100/80 dark:hover:bg-[#141414] text-left transition-all group cursor-pointer"
            title="Open Account Settings"
          >
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 dark:bg-[#141414] border border-neutral-700 dark:border-[#262626] overflow-hidden flex items-center justify-center text-white text-xs font-black shrink-0 group-hover:scale-105 transition-transform">
               {profile.profilePhoto ? (
                 <img src={profile.profilePhoto} alt={profile.fullName} className="w-full h-full object-cover" />
               ) : (
                 <DefaultStudentPhotoPlaceholder className="w-full h-full" />
               )}
            </div>
            <div className="overflow-hidden flex-1">
               <p className="font-bold text-sm text-slate-800 dark:text-[#FFFFFF] leading-tight truncate group-hover:text-brand-primary dark:group-hover:text-white transition-colors">
                 {profile.fullName || "Barnik Basu"}
               </p>
               <p className="text-[10px] font-bold text-slate-400 dark:text-[#A3A3A3] uppercase tracking-wider mt-0.5 truncate">
                 {profile.department?.includes("Computer") ? "B.Tech CSE • Sem 4" : `${profile.department?.slice(0, 14)} • Sem 4`}
               </p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 lg:h-24 bg-white/70 dark:bg-[#000000]/90 backdrop-blur-xl border-b border-slate-200 dark:border-[#1A1A1A] flex items-center justify-between px-6 lg:px-10 z-20">
          <div className="flex items-center gap-4 xl:hidden">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-600 dark:text-[#A3A3A3] hover:bg-slate-100 dark:hover:bg-[#141414] rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2.5">
                <IIITKCrest size={32} />
                <div>
                  <span className="font-heading font-bold text-base text-slate-900 dark:text-[#FFFFFF] tracking-tight block leading-tight">IIITK Sarthi</span>
                  <span className="text-[9px] text-slate-500 dark:text-[#A3A3A3] font-bold uppercase tracking-wider block">IIIT Kalyani</span>
                </div>
            </div>
          </div>

          {/* Desktop-Only Search Box */}
          <div className="hidden xl:flex items-center gap-4 w-full max-w-md">
             <div className="relative w-full">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#737373]" />
                <input 
                   type="text"
                   placeholder="Search courses, library books, mess menu, or notices..."
                   className="w-full pl-11 pr-16 py-3 bg-slate-50/80 dark:bg-[#0A0A0A] border border-slate-200/80 dark:border-[#262626] rounded-2xl text-xs font-semibold text-slate-700 dark:text-[#FFFFFF] placeholder-slate-400 dark:placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-white/20 transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] rounded-md text-[9px] text-slate-400 dark:text-[#A3A3A3] font-mono font-black shadow-sm pointer-events-none">
                   ⌘K
                </kbd>
             </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 text-slate-600 dark:text-[#A3A3A3]">
            {/* Dark Mode Toggle */}
            <button 
              id="dark-mode-toggle"
              onClick={toggleDarkMode}
              className="p-3 hover:bg-slate-50 dark:hover:bg-[#141414] rounded-full transition-all active:scale-90 relative group"
              aria-label="Toggle Dark Mode"
              title="Toggle Dark Mode"
            >
               {isDarkMode ? <Sun size={20} className="text-amber-400 animate-in spin-in-90 duration-500" /> : <Moon size={20} className="text-brand-primary animate-in spin-in-[-90] duration-500" />}
            </button>

            {/* Global AdminBroadcast Notification Bell with unread badge & quick actions */}
            <NotificationDropdown setActiveTab={setActiveTab} />

            {/* Help / Question Icon */}
            <button 
              onClick={() => setIsAIChatOpen(true)}
              className="p-3 hover:bg-slate-50 dark:hover:bg-[#141414] rounded-full transition-all relative group"
              title="Sarthi AI Campus Assistant"
            >
               <HelpCircle size={20} />
            </button>

            {/* Session Spring '26 Dropdown Indicator */}
            <div className="relative">
              <button 
                onClick={() => setShowSessionMenu(!showSessionMenu)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-[#0D0D0D] hover:bg-slate-100 dark:hover:bg-[#141414] border border-slate-200 dark:border-[#262626] rounded-2xl text-xs font-black uppercase tracking-widest text-slate-700 dark:text-[#D4D4D4] transition-all active:scale-95 shadow-sm"
              >
                <span>Spring '26</span>
                <ChevronDown size={14} className={cn("transition-transform", showSessionMenu ? "rotate-180" : "")} />
              </button>

              <AnimatePresence>
                {showSessionMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-[#262626] rounded-2xl shadow-xl p-2 z-50 text-xs font-bold text-slate-600 dark:text-[#D4D4D4]"
                  >
                    <button className="w-full text-left px-3 py-2 bg-slate-50 dark:bg-[#1A1A1A] text-brand-primary dark:text-[#FFFFFF] rounded-xl">Spring '26 (Active)</button>
                    <button className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-[#141414] rounded-xl mt-1">Autumn '25</button>
                    <button className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-[#141414] rounded-xl mt-1">Spring '25</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-[#1A1A1A] mx-1 hidden sm:block"></div>
            
            {/* User Profile Dropdown Menu */}
            <ProfileDropdown 
              setActiveTab={setActiveTab} 
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode} 
            />
          </div>
        </header>

        {/* Dynamic Content Scrollable (Primary Content Scroll Container) */}
        <div 
          ref={mainContentScrollRef}
          id="main-content-scroll-container"
          className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-10 pb-32 lg:pb-12 scrollbar-hide"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onAnimationStart={() => {
                if (mainContentScrollRef.current) {
                  mainContentScrollRef.current.scrollTop = 0;
                }
              }}
              onAnimationComplete={() => {
                if (mainContentScrollRef.current) {
                  mainContentScrollRef.current.scrollTop = 0;
                }
              }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Action Button (FAB) for AI */}
        <motion.button 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAIChatOpen(true)}
          className="fixed bottom-24 lg:bottom-10 right-6 lg:right-10 w-16 h-16 bg-neutral-900 dark:bg-[#1A1A1A] border border-neutral-700 dark:border-[#262626] text-white rounded-full shadow-2xl flex items-center justify-center z-40 group overflow-hidden"
          title="Open Sarthi AI"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Sparkles size={28} className="text-white" />
        </motion.button>

        {/* AI Chat Overlay */}
        <AnimatePresence>
          {isAIChatOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-2xl bg-white dark:bg-[#0D0D0D] rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-[#262626] flex flex-col h-[650px] max-h-[85vh] overflow-hidden"
              >
                {/* Close Button Header */}
                <div className="p-5 border-b border-slate-100 dark:border-[#262626] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IIITKCrest size={32} />
                    <div>
                      <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                        Sarthi AI Campus Assistant
                      </h3>
                      <p className="text-[10px] text-slate-400 dark:text-[#A3A3A3] font-bold uppercase tracking-wider">
                        Indian Institute of Information Technology Kalyani
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAIChatOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A1A1A] rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-hidden">
                  <SarthiAI />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="xl:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/90 dark:bg-[#000000]/95 backdrop-blur-xl border-t border-slate-200 dark:border-[#1A1A1A] flex items-center justify-around px-2 z-30 shadow-2xl">
          {navItems.slice(0, 5).map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isActive) {
                    if (mainContentScrollRef.current) {
                      mainContentScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full py-1 transition-all relative",
                  isActive ? "text-brand-primary dark:text-white" : "text-slate-400 dark:text-[#737373]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTabIndicator"
                    className="absolute inset-x-2 inset-y-1.5 bg-brand-primary/10 dark:bg-[#1A1A1A] rounded-2xl border-b-2 border-brand-primary dark:border-white/50"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.15 : 1,
                    y: isActive ? -1 : 0
                  }}
                  className={cn(
                    "relative z-10 transition-colors duration-200",
                    isActive ? "text-brand-primary dark:text-white" : "text-slate-400 dark:text-[#737373] hover:text-slate-600 dark:hover:text-white"
                  )}
                >
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-widest mt-1.5 relative z-10 transition-all duration-300",
                  isActive ? "text-brand-primary dark:text-white opacity-100 scale-100" : "text-slate-400 opacity-0 scale-95 h-0 overflow-hidden"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
          
          <button 
            className="flex flex-col items-center justify-center w-14 h-full text-slate-400 dark:text-[#737373] hover:text-slate-600 dark:hover:text-white active:scale-95 transition-all relative z-10 border-l border-slate-100 dark:border-[#1A1A1A] pl-2" 
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar menu"
          >
             <MoreVertical size={22} className="hover:rotate-12 transition-transform duration-200" />
          </button>
        </nav>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 xl:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-[#000000] border-r dark:border-[#1A1A1A] z-50 xl:hidden p-7 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-[#1A1A1A]">
                <div className="flex items-center gap-3">
                  <IIITKCrest size={40} />
                  <div>
                    <span className="font-heading font-bold text-xl tracking-tight text-slate-900 dark:text-white block leading-none">
                      IIITK Sarthi
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-[#A3A3A3] tracking-wider uppercase mt-0.5 block">
                      Campus OS
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#141414] rounded-xl transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-1 flex-1 overflow-y-auto scrollbar-hide pr-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                        if (activeTab === item.id) {
                          if (mainContentScrollRef.current) {
                            mainContentScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        } else {
                          setActiveTab(item.id);
                        }
                        setIsSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all font-bold text-base",
                      activeTab === item.id 
                        ? "bg-brand-primary/10 dark:bg-[#1A1A1A] text-brand-primary dark:text-white border dark:border-[#262626]" 
                        : "text-slate-600 dark:text-[#A3A3A3] active:bg-slate-50 dark:active:bg-[#141414]"
                    )}
                  >
                    <item.icon size={20} className={activeTab === item.id ? "text-brand-primary dark:text-white" : "text-slate-400 dark:text-[#737373]"} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 p-4 bg-slate-50 dark:bg-[#0A0A0A] rounded-3xl flex items-center justify-between border border-slate-100 dark:border-[#262626]">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#141414] flex items-center justify-center shadow-sm">
                       {isDarkMode ? <Moon size={20} className="text-amber-400" /> : <Sun size={20} className="text-amber-500" />}
                    </div>
                    <span className="font-bold text-sm text-slate-700 dark:text-[#D4D4D4]">Dark Appearance</span>
                 </div>
                 <button 
                    onClick={toggleDarkMode}
                    className={cn(
                        "w-12 h-6 rounded-full transition-all relative p-1",
                        isDarkMode ? "bg-white text-black" : "bg-slate-300"
                    )}
                 >
                    <motion.div 
                        animate={{ x: isDarkMode ? 24 : 0 }}
                        className={cn("w-4 h-4 rounded-full shadow-md", isDarkMode ? "bg-black" : "bg-white")}
                    />
                 </button>
              </div>

              <button 
                onClick={() => {
                  setActiveTab("settings");
                  setIsSidebarOpen(false);
                }}
                className="mt-4 pt-4 border-t border-slate-100 dark:border-[#1A1A1A] flex items-center gap-4 text-left w-full hover:opacity-85 transition-opacity"
                title="Open Account Settings"
              >
                 <div className="w-12 h-12 rounded-2xl bg-neutral-900 dark:bg-[#141414] border border-neutral-700 dark:border-[#262626] overflow-hidden flex items-center justify-center text-white font-black text-base shadow-md">
                    {profile.profilePhoto ? (
                      <img src={profile.profilePhoto} alt={profile.fullName} className="w-full h-full object-cover" />
                    ) : (
                      <DefaultStudentPhotoPlaceholder className="w-full h-full" />
                    )}
                 </div>
                 <div>
                    <p className="font-heading font-bold text-slate-900 dark:text-[#FFFFFF]">{profile.fullName || "Barnik Basu"}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="px-2 py-0.5 bg-brand-primary/10 dark:bg-[#1A1A1A] text-brand-primary dark:text-white border dark:border-[#262626] text-[9px] font-black rounded-md uppercase tracking-wider">STUDENT</span>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-[#A3A3A3] uppercase tracking-wider leading-none">{profile.department || "B.Tech CSE"} • Sem 4</p>
                    </div>
                 </div>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
