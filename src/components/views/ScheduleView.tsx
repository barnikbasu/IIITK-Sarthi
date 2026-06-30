import { Clock, MapPin, User, GraduationCap, Calendar, CheckCircle2, Loader2, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { weeklySchedule } from "../../data/mockData";
import { cn } from "../../lib/utils";
import { useState } from "react";

interface ScheduleSlot {
  time: string;
  type: string;
  subject: string;
  room: string;
  faculty: string;
}

export default function ScheduleView() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Reminder settings
  const [reminderMinutes, setReminderMinutes] = useState("10");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      triggerToast("Timetable synchronized perfectly with Google Workspace Calendar! 📅");
    }, 1500);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      triggerToast("ICS academic schedule file generated and downloaded successfully!");
    }, 1200);
  };

  const handleReminderOpen = (slot: ScheduleSlot) => {
    setSelectedSlot(slot);
    setIsReminderOpen(true);
  };

  const handleSetReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setIsReminderOpen(false);
    triggerToast(`Push reminder set for '${selectedSlot.subject}' ${reminderMinutes} minutes before lecture start! 🔔`);
  };

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Academic Timetable</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight font-semibold text-sm">Your personalized weekly lecture and lab schedule.</p>
        </div>
        <div className="flex gap-2 shrink-0">
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="px-5 py-3 bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all flex items-center gap-2"
            >
                {isExporting ? <Loader2 size={12} className="animate-spin text-slate-450" /> : null}
                {isExporting ? "Exporting..." : "Export"}
            </button>
            <button 
              onClick={handleSync}
              disabled={isSyncing}
              className="px-5 py-3 bg-brand-primary rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-brand-primary/25 hover:opacity-90 transition-all flex items-center gap-2"
            >
                {isSyncing ? <Loader2 size={12} className="animate-spin text-white" /> : null}
                {isSyncing ? "Syncing..." : "Sync Calendar"}
            </button>
        </div>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-center gap-3 text-brand-primary dark:text-brand-teal font-black text-xs uppercase tracking-widest justify-center z-40"
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

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
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-800 px-2.5 py-1 rounded-full">{day.slots.length} Sessions</span>
            </div>
            
            <div className="p-4 space-y-3">
              {day.slots.map((slot, sIdx) => (
                <div 
                    key={sIdx}
                    className="group relative flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 transition-all border border-transparent hover:border-brand-primary/20"
                >
                    <div className="w-16 pt-1">
                        <p className="text-xs font-black text-slate-400 dark:text-slate-500 leading-none">{slot.time.split(' ')[0]}</p>
                        <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-tighter mt-1">{slot.time.split(' ')[1]}</p>
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
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors tracking-tight leading-tight uppercase">{slot.subject}</h4>
                        
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
                         <button 
                           onClick={() => handleReminderOpen(slot)}
                           className="p-2 text-brand-primary/60 hover:text-brand-primary hover:bg-white dark:hover:bg-brand-navy rounded-lg border border-transparent hover:border-brand-primary/20 shadow-sm"
                         >
                             <Clock size={16} />
                         </button>
                    </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* LECTURE REMINDER MODAL */}
      <AnimatePresence>
        {isReminderOpen && selectedSlot && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsReminderOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center">
                   <Bell size={24} className="text-brand-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-semibold">LECTURE ALARM SYSTEM</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Set Lecture Reminder</h3>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 mb-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                <p className="uppercase text-[9px] font-black tracking-widest text-slate-400 mb-1 leading-none">Class details</p>
                <div className="flex justify-between items-start mt-2">
                  <div>
                    <span className="text-slate-850 dark:text-white block uppercase font-black text-sm">{selectedSlot.subject}</span>
                    <span className="text-slate-400 block mt-1 uppercase text-[10px] tracking-widest">{selectedSlot.type} • ROOM {selectedSlot.room}</span>
                  </div>
                  <span className="text-brand-primary dark:text-brand-teal font-mono">{selectedSlot.time}</span>
                </div>
              </div>

              <form onSubmit={handleSetReminderSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-semibold">Notification Trigger</label>
                  <select
                    value={reminderMinutes}
                    onChange={(e) => setReminderMinutes(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                  >
                    <option value="5">5 minutes before class</option>
                    <option value="10">10 minutes before class</option>
                    <option value="15">15 minutes before class</option>
                    <option value="30">30 minutes before class</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsReminderOpen(false)}
                    className="px-5 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:opacity-95 transition-all"
                  >
                    Confirm Reminder
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
