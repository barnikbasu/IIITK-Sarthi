import { Phone, ShieldAlert, Heart, Siren, MapPin, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { emergencyContacts } from "../../data/mockData";
import { cn } from "../../lib/utils";

export default function EmergencyView() {
  return (
    <div className="space-y-8 pb-20">
      <div className="bg-rose-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-rose-200 dark:shadow-none overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-32 -translate-y-32 blur-3xl"></div>
          
          <div className="relative z-10">
              <h2 className="text-4xl font-black text-white/95 tracking-tighter mb-4">Emergency Response Center</h2>
              <p className="text-rose-100 max-w-xl font-medium mb-8">One-tap actions for critical assistance. Available 24/7 for IIIT Kalyani campus residents and staff.</p>
              
              <div className="flex flex-wrap gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 bg-white text-rose-600 rounded-2xl font-black shadow-xl"
                  >
                      <Siren size={24} /> ACTIVATE SOS
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 bg-rose-500 text-white border-2 border-rose-400 rounded-2xl font-bold shadow-xl"
                  >
                      <Share2 size={24} /> SHARE LOCATION
                  </motion.button>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyContacts.map((contact, idx) => {
              const Icon = contact.category === "Medical" ? Heart : contact.category === "Security" ? ShieldAlert : Siren;
              const colorClass = contact.category === "Medical" ? "text-status-success bg-status-success/10" : contact.category === "Security" ? "text-status-danger bg-status-danger/10" : "text-brand-primary bg-brand-primary/10";
              
              return (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 p-6 rounded-[2.5rem] shadow-sm flex items-center justify-between group overflow-hidden relative"
                  >
                       <div className="flex items-center gap-5">
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", colorClass)}>
                                <Icon size={28} />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter opacity-60 text-[10px]">{contact.title}</h4>
                                <p className="text-xl font-black text-slate-800 dark:text-slate-200 mt-0.5 tracking-tighter">{contact.number}</p>
                            </div>
                       </div>
                       <a href={`tel:${contact.number}`} className="w-12 h-12 rounded-full bg-slate-900 dark:bg-brand-primary text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg z-10">
                           <Phone size={20} />
                       </a>
                  </motion.div>
              );
          })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
               <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-6 tracking-tight">
                   <MapPin size={24} className="text-status-danger" />
                   Rapid Help Nodes
               </h3>
               <div className="space-y-4">
                   {[
                       { name: "First Aid Center", loc: "Academic G-04", dist: "200m away" },
                       { name: "Global Security Room", loc: "Main Entrance", dist: "500m away" },
                       { name: "Crisis Cell", loc: "Hostel A Lobby", dist: "350m away" },
                   ].map((point, i) => (
                       <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <div>
                                <h5 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter text-sm">{point.name}</h5>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">{point.loc}</p>
                            </div>
                            <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal bg-brand-primary/10 dark:bg-brand-primary/20 px-3 py-1 rounded-full uppercase tracking-tighter">{point.dist}</span>
                       </div>
                   ))}
               </div>
          </div>
          
          <div className="bg-brand-teal/5 dark:bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-[2.5rem] relative overflow-hidden group">
               <div className="relative z-10">
                   <h3 className="text-xl font-black text-brand-navy dark:text-brand-teal mb-2 tracking-tight">Sarthi Care Network</h3>
                   <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-bold italic">Connect anonymously with peer support or counselors. You are not alone on this journey.</p>
                   <button className="px-8 py-4 bg-brand-teal text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-teal/20 hover:opacity-90 transition-all">
                       INITIATE CARE
                   </button>
               </div>
               <Heart size={140} className="absolute bottom-0 right-0 text-brand-teal/10 dark:text-brand-teal/5 translate-y-8 translate-x-8 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
          </div>
      </div>
    </div>
  );
}
