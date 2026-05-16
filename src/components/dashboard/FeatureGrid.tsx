import { 
  Bell, 
  ExternalLink, 
  Globe, 
  BookOpen, 
  Search, 
  Briefcase,
  ChevronRight,
  Plus
} from "lucide-react";
import { motion } from "motion/react";
import { notices, quickLinks } from "../../data/mockData";
import { cn } from "../../lib/utils";

const iconMap: Record<string, any> = {
  Globe,
  BookOpen,
  Search,
  Briefcase,
};

export default function FeatureGrid({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-12 pb-20">
      
      {/* Notices Section */}
      <div className="xl:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Bell size={20} className="text-brand-primary dark:text-brand-teal" />
            Recent Notices
          </h3>
          <button 
            onClick={() => setActiveTab("analytics")}
            className="text-sm font-bold text-brand-primary dark:text-brand-teal hover:opacity-80 flex items-center gap-1 transition-all"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>

        <div className="space-y-4">
          {notices.map((notice) => {
            const NoticeIcon = notice.category === "Academic" ? BookOpen : notice.category === "Event" ? Globe : Bell;
            return (
              <motion.div
                key={notice.id}
                whileHover={{ x: 4 }}
                className="bg-white dark:bg-brand-navy p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-5 group cursor-pointer hover:border-brand-primary/30 dark:hover:border-brand-primary/40 hover:shadow-md transition-all duration-300"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                  notice.priority === "High" ? "bg-status-danger/10 text-status-danger" : "bg-brand-primary/10 text-brand-primary dark:text-brand-teal"
                )}>
                  <NoticeIcon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className={cn(
                      "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter",
                      notice.priority === "High" ? "bg-status-danger/10 text-status-danger" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    )}>
                      {notice.category}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">{notice.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors tracking-tight">{notice.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{notice.summary}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Links & Toolbox */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Campus Toolbox</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {quickLinks.map((link) => {
            const Icon = iconMap[link.iconName] || Globe;
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-brand-navy p-4 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md hover:border-brand-primary/30 dark:hover:border-brand-primary/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center group-hover:bg-brand-primary/10 dark:group-hover:bg-brand-primary/20 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                   <h5 className="font-bold text-slate-900 dark:text-slate-100 leading-tight tracking-tight">{link.title}</h5>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{link.description}</p>
                </div>
                <ExternalLink size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors" />
              </motion.a>
            );
          })}
          
          <button className="w-full mt-4 p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] text-slate-400 dark:text-slate-500 flex flex-col items-center justify-center gap-2 hover:border-brand-primary/30 dark:hover:border-brand-primary/40 hover:text-brand-primary dark:hover:text-brand-teal transition-all hover:bg-brand-primary/5 group">
             <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-brand-primary/10 dark:group-hover:bg-brand-primary/20 transition-colors">
                <Plus size={20} />
             </div>
             <span className="text-sm font-black uppercase tracking-widest">Request Inclusion</span>
          </button>
        </div>
      </div>

    </div>
  );
}
