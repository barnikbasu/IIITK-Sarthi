import { Users, Calendar, Trophy, Image, MessageSquare, Info, Plus } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

const clubs = [
  { id: "c1", name: "Apex - Coding Club", category: "Technical", members: 120, logo: "💻" },
  { id: "c2", name: "Rhythms - Music Club", category: "Cultural", members: 85, logo: "🎸" },
  { id: "c3", name: "Shutterbugs - Photography", category: "Art", members: 60, logo: "📸" },
  { id: "c4", name: "Gymkhana", category: "Sports", members: 400, logo: "🏆" },
];

export default function ClubsView() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Campus Community</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Discover your passion and connect with like-minded students.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary dark:text-brand-teal border border-brand-primary/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary/10 transition-all">
          <Info size={18} /> Governance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club, idx) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-brand-navy p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center"
              >
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {club.logo}
                  </div>
                  <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest">{club.category}</span>
                  <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1 tracking-tight">{club.name}</h4>
                  <div className="flex items-center gap-2 text-slate-400 mt-2 text-xs font-bold">
                      <Users size={14} />
                      <span>{club.members} Members</span>
                  </div>
                  
                  <div className="mt-6 w-full flex gap-3">
                       <button className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-primary/10 hover:text-brand-primary transition-all">
                           DOCS
                       </button>
                       <button className="flex-1 py-3 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-primary/20">
                           JOIN
                       </button>
                  </div>
              </motion.div>
          ))}
          
          <motion.button
            whileHover={{ scale: 0.98 }}
            className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-slate-400 hover:border-brand-primary/30 hover:text-brand-primary transition-all gap-3 hover:bg-brand-primary/5"
          >
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                  <Plus size={24} />
              </div>
              <span className="font-black text-xs uppercase tracking-widest">Register Club</span>
          </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
               <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 tracking-tight">
                   <Calendar size={24} className="text-brand-primary dark:text-brand-teal" />
                   Priority Events
               </h3>
               <div className="space-y-4">
                   {[1, 2].map(i => (
                       <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-brand-navy/60 transition-all border border-transparent hover:border-brand-primary/20 dark:hover:border-brand-primary/20 cursor-pointer shadow-sm group">
                            <div className="w-16 h-16 bg-white dark:bg-brand-navy rounded-xl flex flex-col items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800 shadow-inner">
                                <span className="text-brand-primary dark:text-brand-teal font-black text-xl leading-none">22</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase">MAY</span>
                            </div>
                            <div className="flex-1">
                                <h5 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-primary dark:group-hover:text-brand-teal tracking-tight transition-colors">Cybersecurity Workshop</h5>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight">Apex Coding Club • Lab 102</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary dark:text-brand-teal text-[10px] font-black rounded-md uppercase tracking-tighter">85 RSVP</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">FREE ACCESS</span>
                                </div>
                            </div>
                       </div>
                   ))}
               </div>
          </div>

          <div className="bg-brand-navy rounded-[2.5rem] p-8 text-white relative overflow-hidden border border-white/5 shadow-2xll shadow-brand-primary/10">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px]"></div>
               <div className="relative z-10">
                   <h3 className="text-xl font-black mb-2 tracking-tight">Sarthi Intelligence Space</h3>
                   <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium italic">Join discussions moderated by AI. Share experiences and collaborate on campus goals.</p>
                   <div className="flex -space-x-3 mb-6">
                       {[1, 2, 3, 4].map(i => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-navy bg-slate-800 overflow-hidden ring-2 ring-brand-primary/20">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 13}`} alt="avatar" />
                           </div>
                       ))}
                       <div className="w-10 h-10 rounded-full border-2 border-brand-navy bg-brand-primary flex items-center justify-center text-[10px] font-black">+280</div>
                   </div>
                   <button className="px-8 py-4 bg-white text-brand-navy rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl shadow-black/20">
                       ENTER DISCOURSE
                   </button>
               </div>
               <MessageSquare size={140} className="absolute bottom-0 right-0 text-white/5 translate-y-6 translate-x-6 -rotate-12" />
          </div>
      </div>
    </div>
  );
}
