import React, { useState } from "react";
import { 
  User, 
  Sparkles, 
  Settings, 
  Bell, 
  Shield, 
  Database, 
  CheckCircle,
  HelpCircle,
  Smartphone,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { currentUser } from "../../data/mockData";

export default function SettingsView() {
  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role);
  const [department, setDepartment] = useState(currentUser.department);
  const [isSaved, setIsSaved] = useState(false);
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [bluetoothCheckin, setBluetoothCheckin] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    currentUser.name = name;
    currentUser.role = role as any;
    currentUser.department = department;
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-tight mt-1">
          Customize your Sarthi OS environment and preferences.
        </p>
      </div>

      <AnimatePresence>
        {isSaved && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-status-success/10 border border-status-success/20 rounded-2xl flex items-center gap-3 text-status-success font-black text-xs uppercase tracking-widest justify-center"
          >
            <CheckCircle size={20} />
            Settings saved and synchronized with Sarthi Cloud
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Profile info form */}
        <div className="lg:col-span-8 space-y-8">
          <form onSubmit={handleSave} className="bg-white dark:bg-brand-navy border border-slate-200/80 dark:border-slate-800 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <User size={20} className="text-brand-primary dark:text-brand-teal" />
              Academic Profile Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Enrollment Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Admin">Administrator</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Department / Branch</label>
                <input 
                  type="text" 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button 
                type="submit"
                className="px-6 py-4 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-lg shadow-brand-primary/10 hover:opacity-90 active:scale-95 transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* Connected Device & Bluetooth Check-in Card */}
          <div className="bg-white dark:bg-brand-navy border border-slate-200/80 dark:border-slate-800 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
             <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
               <Smartphone size={20} className="text-brand-primary dark:text-brand-teal" />
               Automated Bluetooth Presence
             </h3>
             <p className="text-xs text-slate-400 dark:text-slate-400 font-semibold leading-relaxed">
               IIITK Sarthi supports location-aware lecture check-ins. When within range of a Lecture Hall (LHC) bluetooth beacon, your attendance will be logged automatically.
             </p>

             <div className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <div>
                   <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Bluetooth Beacon Check-in</h4>
                   <p className="text-xs text-slate-400 mt-0.5">Enable background presence scan during schedule hours</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setBluetoothCheckin(!bluetoothCheckin)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative p-1 flex items-center",
                    bluetoothCheckin ? "bg-brand-primary justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
                  )}
                >
                   <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
             </div>
          </div>
        </div>

        {/* Right column: Notification settings */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-brand-navy border border-slate-200/80 dark:border-slate-800 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Bell size={18} className="text-brand-primary dark:text-brand-teal" />
              Notifications
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <div>
                    <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">Email Alerts</h4>
                    <p className="text-[10px] text-slate-400">Notices and midsems</p>
                 </div>
                 <button 
                   type="button"
                   onClick={() => setEmailNotifications(!emailNotifications)}
                   className={cn(
                     "w-10 h-5 rounded-full transition-all relative p-0.5 flex items-center",
                     emailNotifications ? "bg-brand-primary justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
                   )}
                 >
                    <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-md" />
                 </button>
              </div>

              <div className="flex items-center justify-between">
                 <div>
                    <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">Push Notifications</h4>
                    <p className="text-[10px] text-slate-400">Class starts and alerts</p>
                 </div>
                 <button 
                   type="button"
                   onClick={() => setPushNotifications(!pushNotifications)}
                   className={cn(
                     "w-10 h-5 rounded-full transition-all relative p-0.5 flex items-center",
                     pushNotifications ? "bg-brand-primary justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
                   )}
                 >
                    <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-md" />
                 </button>
              </div>
            </div>
          </div>

          {/* System info */}
          <div className="bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-800 p-8 rounded-[2.5rem] space-y-4">
             <div className="flex items-center gap-2 text-slate-400">
                <Database size={16} />
                <span className="text-xs font-black uppercase tracking-widest">Sarthi OS Metadata</span>
             </div>
             <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <p>Client: v2.4 Premium Build</p>
                <p>Protocol: Bluetooth v5.2 LE Mesh</p>
                <p>Status: Synchronized 🟢</p>
                <p>Environment: Google Stitch Architecture</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
