import React, { useState, useEffect } from "react";
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
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import SarthiAI from "../ai/SarthiAI";

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { label: "Schedule", icon: Calendar, id: "schedule" },
  { label: "Attendance", icon: LineChart, id: "analytics" },
  { label: "Resources", icon: BookMarked, id: "resources" },
  { label: "Marketplace", icon: ShoppingBag, id: "market" },
  { label: "Clubs", icon: Users, id: "clubs" },
  { label: "Tasks", icon: CheckSquare, id: "tasks" },
  { label: "Opportunities", icon: Briefcase, id: "opportunities" },
  { label: "Directory", icon: Search, id: "directory" },
  { label: "Map", icon: MapPin, id: "map" },
  { label: "Emergency", icon: PhoneCall, id: "emergency" },
];

export default function MainLayout({ children, activeTab, setActiveTab }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [showSessionMenu, setShowSessionMenu] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-bg-dark overflow-hidden font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden xl:flex flex-col w-72 bg-white dark:bg-brand-navy border-r border-slate-200 dark:border-slate-800/80">
        <div className="p-8 flex items-center gap-3">
          <div className="w-11 h-11 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/10 dark:shadow-none">
            <Sparkles size={24} className="animate-pulse" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white leading-tight block">IIITK Sarthi</span>
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-wider uppercase leading-none mt-1 block">Campus OS</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group text-sm font-bold",
                activeTab === item.id 
                  ? "bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal shadow-sm" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
              )}
            >
              <item.icon size={20} className={cn(
                "transition-colors",
                activeTab === item.id ? "text-brand-primary dark:text-brand-teal" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
              )} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
          {/* Settings Tab Option */}
          <button
            onClick={() => setActiveTab("settings")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group text-sm font-bold",
              activeTab === "settings" 
                ? "bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal shadow-sm" 
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
            )}
          >
            <Settings size={20} className={cn(
              "transition-colors",
              activeTab === "settings" ? "text-brand-primary dark:text-brand-teal" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
            )} />
            <span>Settings</span>
          </button>

          {/* Premium Barnik Basu Profile Box card */}
          <div className="flex items-center gap-3 p-4 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-slate-100 dark:ring-slate-800 shrink-0">
               <img 
                 src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" 
                 alt="Barnik Basu" 
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="overflow-hidden">
               <p className="font-bold text-sm text-slate-800 dark:text-slate-200 leading-tight truncate">Barnik S.</p>
               <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">B.Tech CSE '25</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 lg:h-24 bg-white/70 dark:bg-brand-navy/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50 flex items-center justify-between px-6 lg:px-10 z-20">
          <div className="flex items-center gap-4 xl:hidden">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white">
                    <Sparkles size={18} />
                </div>
                <span className="font-bold text-lg text-slate-900 dark:text-brand-teal tracking-tight">Sarthi</span>
            </div>
          </div>

          {/* Desktop-Only Search Box */}
          <div className="hidden xl:flex items-center gap-4 w-full max-w-md">
             <div className="relative w-full">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input 
                   type="text"
                   placeholder="Search grades, courses, or students..."
                   className="w-full pl-11 pr-16 py-3 bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-teal transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-[9px] text-slate-400 dark:text-slate-500 font-mono font-black shadow-sm pointer-events-none">
                   ⌘K
                </kbd>
             </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 text-slate-600 dark:text-slate-400">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all active:scale-90 relative group"
              aria-label="Toggle Dark Mode"
            >
               {isDarkMode ? <Sun size={20} className="text-brand-gold animate-in spin-in-90 duration-500" /> : <Moon size={20} className="text-brand-primary animate-in spin-in-[-90] duration-500" />}
            </button>

            {/* Notification Bell */}
            <button className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all relative group">
               <Bell size={20} className="group-hover:rotate-12 transition-transform" />
               <span className="absolute top-3 right-3 w-2 h-2 bg-status-danger rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            {/* Help / Question Icon */}
            <button className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all relative group">
               <HelpCircle size={20} />
            </button>

            {/* Session Spring '24 Dropdown Indicator */}
            <div className="relative">
              <button 
                onClick={() => setShowSessionMenu(!showSessionMenu)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 transition-all active:scale-95 shadow-sm"
              >
                <span>Session: Spring '24</span>
                <ChevronDown size={14} className={cn("transition-transform", showSessionMenu ? "rotate-180" : "")} />
              </button>

              <AnimatePresence>
                {showSessionMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 text-xs font-bold text-slate-600 dark:text-slate-300"
                  >
                    <button className="w-full text-left px-3 py-2 bg-slate-50 dark:bg-slate-800 text-brand-primary dark:text-brand-teal rounded-xl">Spring '24 (Active)</button>
                    <button className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl mt-1">Autumn '23</button>
                    <button className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl mt-1">Spring '23</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>
            
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 p-2 pr-4 rounded-full transition-all group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-primary to-indigo-800 flex items-center justify-center text-white text-sm font-black ring-2 ring-offset-2 ring-slate-100 dark:ring-indigo-950/50 group-hover:scale-105 transition-transform">
                BB
              </div>
              <div className="hidden sm:block">
                 <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Barnik Basu</span>
                    <span className="px-2 py-0.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal text-[10px] font-black rounded-md uppercase tracking-tighter shadow-sm">STUDENT</span>
                 </div>
                 <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">CSE • Year 2</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Scrollable */}
        <div className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-10 pb-32 lg:pb-12 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
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
          className="fixed bottom-24 lg:bottom-10 right-6 lg:right-10 w-16 h-16 bg-brand-primary text-white rounded-full shadow-2xl shadow-indigo-300 dark:shadow-none flex items-center justify-center z-40 group overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Sparkles size={32} />
        </motion.button>

        {/* AI Chat Overlay */}
        <AnimatePresence>
            {isAIChatOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-2xl max-h-[85vh] bg-white dark:bg-brand-navy rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-white/20 dark:border-slate-800"
                    >
                        <div className="p-6 bg-brand-navy dark:bg-brand-primary text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl">
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">Sarthi AI</h3>
                                    <p className="text-xs text-indigo-100">Your Intelligent Campus Companion</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsAIChatOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <SarthiAI />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* Mobile Navigation Bar */}
        <nav className="xl:hidden fixed bottom-6 left-6 right-6 h-20 bg-white/90 dark:bg-brand-navy/95 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800 flex items-center justify-between px-6 z-30 rounded-[2.2rem] shadow-2xl shadow-brand-navy/35 select-none overflow-hidden">
          {[
            { label: "Home", icon: LayoutDashboard, id: "dashboard" },
            { label: "Schedule", icon: Calendar, id: "schedule" },
            { label: "Tasks", icon: CheckSquare, id: "tasks" },
            { label: "Map", icon: MapPin, id: "map" },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative flex flex-col items-center justify-center flex-1 h-full py-2 group transition-all"
                aria-label={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTabIndicator"
                    className="absolute inset-x-2 inset-y-1.5 bg-brand-primary/10 dark:bg-brand-teal/10 rounded-2xl border-b-2 border-brand-primary dark:border-brand-teal"
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
                    isActive ? "text-brand-primary dark:text-brand-teal" : "text-slate-400 dark:text-slate-500 hover:text-slate-600"
                  )}
                >
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-widest mt-1.5 relative z-10 transition-all duration-300",
                  isActive ? "text-brand-primary dark:text-brand-teal opacity-100 scale-100" : "text-slate-400 opacity-0 scale-95 h-0 overflow-hidden"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
          
          <button 
            className="flex flex-col items-center justify-center w-14 h-full text-slate-400 dark:text-slate-500 hover:text-slate-600 active:scale-95 transition-all relative z-10 border-l border-slate-100 dark:border-slate-800/80 pl-2" 
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
              className="fixed inset-0 bg-brand-navy/40 backdrop-blur-sm z-40 xl:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-brand-navy z-50 xl:hidden p-8 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white block leading-none">IIITK</span>
                    <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal tracking-widest uppercase">SARTHI OS</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="space-y-1 flex-1 overflow-y-auto scrollbar-hide pr-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                        setActiveTab(item.id);
                        setIsSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-lg",
                      activeTab === item.id 
                        ? "bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal" 
                        : "text-slate-600 dark:text-slate-400 active:bg-slate-50 dark:active:bg-slate-800"
                    )}
                  >
                    <item.icon size={22} className={activeTab === item.id ? "text-brand-primary dark:text-brand-teal" : "text-slate-400"} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex items-center justify-between border border-slate-100 dark:border-slate-700/50">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-brand-navy flex items-center justify-center shadow-sm">
                       {isDarkMode ? <Moon size={20} className="text-brand-primary" /> : <Sun size={20} className="text-brand-gold" />}
                    </div>
                    <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Dark Appearance</span>
                 </div>
                 <button 
                    onClick={toggleDarkMode}
                    className={cn(
                        "w-12 h-6 rounded-full transition-all relative p-1",
                        isDarkMode ? "bg-brand-primary" : "bg-slate-300"
                    )}
                 >
                    <motion.div 
                        animate={{ x: isDarkMode ? 24 : 0 }}
                        className="w-4 h-4 bg-white rounded-full shadow-md"
                    />
                 </button>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-indigo-800 flex items-center justify-center text-white font-black text-lg">
                    BB
                 </div>
                 <div>
                    <p className="font-black text-slate-900 dark:text-slate-200">Barnik Basu</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal text-[10px] font-black rounded-md uppercase tracking-tighter">STUDENT</span>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">CSE • Year 2</p>
                    </div>
                 </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

