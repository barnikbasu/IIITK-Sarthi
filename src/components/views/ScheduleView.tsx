import { Clock, MapPin, User, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { weeklySchedule } from "../../data/mockData";
import { cn } from "../../lib/utils";

export default function ScheduleView() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Academic Timetable</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Your personalized weekly lecture and lab schedule.</p>
        </div>
        <div className="flex gap-2">
            <button className="px-5 py-3 bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all">Export</button>
            <button className="px-5 py-3 bg-brand-primary rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-brand-primary/20 hover:opacity-90 transition-all">Sync</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {weeklySchedule.map((day, idx) => (
          <motion.div 
            key={day.day}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-brand-navy rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
          >
            <div className="px-8 py-5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-black text-lg text-slate-800 dark:text-slate-100 uppercase tracking-tighter">{day.day}</h3>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day.slots.length} Sessions</span>
            </div>
            
            <div className="p-4 space-y-3">
              {day.slots.map((slot, sIdx) => (
                <div 
                    key={sIdx}
                    className="group relative flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 transition-all border border-transparent hover:border-brand-primary/20"
                >
                    <div className="w-16 pt-1">
                        <p className="text-xs font-black text-slate-400 dark:text-slate-500">{slot.time.split(' ')[0]}</p>
                        <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-tighter">{slot.time.split(' ')[1]}</p>
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className={cn(
                                "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter",
                                slot.type === "Lecture" ? "bg-brand-primary/10 text-brand-primary dark:text-brand-teal" : 
                                slot.type === "Lab" ? "bg-brand-teal/10 text-brand-teal" : "bg-status-warning/10 text-status-warning"
                            )}>
                                {slot.type}
                            </span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors tracking-tight">{slot.subject}</h4>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight">
                                <MapPin size={12} className="text-brand-primary dark:text-brand-teal" />
                                <span>{slot.room}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight">
                                <User size={12} className="text-brand-primary dark:text-brand-teal" />
                                <span>{slot.faculty}</span>
                            </div>
                        </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 text-brand-primary/40 hover:text-brand-primary hover:bg-white dark:hover:bg-brand-navy rounded-lg border border-transparent hover:border-brand-primary/20">
                             <Clock size={16} />
                         </button>
                    </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
