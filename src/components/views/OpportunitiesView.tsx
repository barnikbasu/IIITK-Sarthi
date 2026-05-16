import { Briefcase, Zap, Star, Filter, ArrowRight, Compass } from "lucide-react";
import { motion } from "motion/react";
import { opportunities } from "../../data/mockData";
import { cn } from "../../lib/utils";

export default function OpportunitiesView() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Opportunities Hub</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Your personalized career and growth ecosystem.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary dark:text-brand-teal border border-brand-primary/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary/10 transition-all">
          <Filter size={18} /> Skill Matrix
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main List */}
        <div className="lg:col-span-8 space-y-4">
          {opportunities.map((opp, idx) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white dark:bg-brand-navy p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-primary/20 dark:hover:border-brand-primary/30 transition-all cursor-pointer overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-6">
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-1 text-brand-primary dark:text-brand-teal font-black">
                      <Zap size={16} />
                      <span className="text-[10px] uppercase tracking-widest">{opp.matchScore}% Match</span>
                   </div>
                   <div className="w-16 h-1 mt-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${opp.matchScore}%` }}
                        className="h-full bg-brand-primary"
                      />
                   </div>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-brand-primary/10 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                   <Briefcase size={28} />
                </div>
                <div className="pr-20">
                  <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest">{opp.type}</span>
                  <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 mt-1 tracking-tight">{opp.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">{opp.company} • Deadline: {opp.deadline}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {opp.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-tighter rounded-full border border-slate-100 dark:border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Insights */}
        <div className="lg:col-span-4 space-y-6">
            <div className="bg-brand-navy rounded-[2.5rem] p-8 text-white shadow-2xl shadow-brand-primary/10 overflow-hidden relative border border-white/5">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/20 rounded-full -translate-y-12 translate-x-12 blur-[80px]"></div>
                <Star size={32} className="text-brand-teal mb-4 drop-shadow-glow" />
                <h3 className="text-xl font-black mb-2 tracking-tight">Sarthi AI Coach</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-bold italic opacity-80">Based on your Interest in Python and recent DSA notes, I recommend applying for the Google Internship first.</p>
                <button className="w-full py-4 bg-white text-brand-navy font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                   Open Career Roadmap <ArrowRight size={16} />
                </button>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm group">
                <h3 className="font-black text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-widest text-xs">Curated for You</h3>
                <div className="space-y-6">
                    {[1, 2].map(i => (
                        <div key={i} className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                               <Compass size={20} className="text-slate-400 group-hover:text-brand-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">ACM ICPC Regional</p>
                                <p className="text-[10px] text-brand-primary dark:text-brand-teal font-black uppercase tracking-widest">In 3 Days</p>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
