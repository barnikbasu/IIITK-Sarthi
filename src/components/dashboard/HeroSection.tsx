import { clsx } from "clsx";
import { 
  TrendingUp, 
  MapPin, 
  Clock, 
  Utensils, 
  CalendarCheck,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Zap
} from "lucide-react";
import { motion } from "motion/react";
import { dashboardMetrics, currentUser } from "../../data/mockData";
import { cn } from "../../lib/utils";

export default function HeroSection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { attendance, nextClass, messMenu } = dashboardMetrics;

  const attendanceColors = {
    Safe: "text-emerald-600 bg-emerald-50 border-emerald-100",
    Warning: "text-amber-600 bg-amber-50 border-amber-100",
    Critical: "text-rose-600 bg-rose-50 border-rose-100",
  };

  const attendanceIcons = {
    Safe: ShieldCheck,
    Warning: AlertCircle,
    Critical: Zap,
  };

  const AttendanceIcon = attendanceIcons[attendance.status];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
             Everything You Need Today
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            Hi {currentUser.name.split(' ')[0]}, here's what's happening on campus right now.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/10 dark:border-brand-primary/20 rounded-full text-brand-primary dark:text-brand-teal text-sm font-bold shadow-sm">
          <CalendarCheck size={16} />
          <span>May 16, 2026 • Semester 4</span>
        </div>
      </div>

      {/* Main Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Attendance Insight - Big Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="md:col-span-8 bg-white dark:bg-brand-navy rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full -translate-y-32 translate-x-32 -z-0 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">Academic Wellness</p>
                <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-xl border transition-colors", attendanceColors[attendance.status])}>
                       <AttendanceIcon size={24} />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black flex items-center gap-2 dark:text-white tracking-tight">
                           {attendance.percentage}% <span className="text-slate-400 dark:text-slate-500 font-bold tracking-normal text-lg">Overall Attendance</span>
                        </h3>
                    </div>
                </div>
              </div>
              <div className="hidden sm:block">
                {/* Progress Circle with Brand Teal */}
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-slate-100 dark:text-slate-800"
                      strokeWidth="6"
                      stroke="currentColor"
                      fill="transparent"
                      r="28"
                      cx="32"
                      cy="32"
                    />
                    <circle
                      className="text-brand-primary dark:text-brand-teal"
                      strokeWidth="6"
                      strokeDasharray={175.9}
                      strokeDashoffset={175.9 - (175.9 * attendance.percentage) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="28"
                      cx="32"
                      cy="32"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-brand-primary dark:text-brand-teal">
                    {attendance.percentage}%
                  </div>
                </div>
              </div>
            </div>

            <div 
                className="mt-8 bg-brand-navy p-6 rounded-[1.5rem] border border-white/10 text-white flex items-center justify-between group cursor-pointer hover:bg-slate-800 dark:hover:bg-brand-primary/20 transition-all card-hover"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-teal/20 flex items-center justify-center border border-brand-teal/30">
                  <Zap size={20} className="text-brand-teal" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-teal font-black uppercase tracking-widest">Sarthi AI Insight</p>
                  <p className="font-bold text-lg">{attendance.prediction}</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-slate-500 group-hover:text-white transition-all transform group-hover:translate-x-1" />
            </div>
          </div>
        </motion.div>

        {/* Next Class & Mess - Combo Stack */}
        <div className="md:col-span-4 flex flex-col gap-6">
          
          {/* Next Class Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="flex-1 bg-white dark:bg-brand-navy rounded-[2.5rem] p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
          >
             <div>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4">Coming Up Next</p>
                <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{nextClass.subject}</h4>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-2 text-sm font-bold">
                  <MapPin size={14} className="text-brand-primary" />
                  <span>{nextClass.room}</span>
                  <span className="mx-1">•</span>
                  <Clock size={14} className="text-brand-primary" />
                  <span>{nextClass.time}</span>
                </div>
             </div>
             <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                    onClick={() => setActiveTab("schedule")}
                    className="w-full py-4 bg-slate-50 dark:bg-slate-900 hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 text-slate-900 dark:text-slate-200 hover:text-brand-primary rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-transparent hover:border-brand-primary/20"
                >
                   View Full Schedule
                </button>
             </div>
          </motion.div>

          {/* Mess Today Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="flex-1 bg-gradient-to-br from-brand-primary to-brand-navy rounded-[2.5rem] p-6 text-white shadow-xl shadow-indigo-100 dark:shadow-none relative overflow-hidden"
          >
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 translate-x-8 -z-0 blur-2xl"></div>
             
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-white/60 font-bold uppercase tracking-widest text-[10px]">{messMenu.meal} Menu</p>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Utensils size={16} />
                    </div>
                </div>
                <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mb-1">Specials</p>
                <h4 className="text-lg font-bold leading-tight mb-4">{messMenu.special}</h4>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white group bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all w-fit">
                    Full Weekly Menu
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
