import { FileText, Download, Filter, Search, BookOpen, Presentation, FileCode, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { resources } from "../../data/mockData";
import { cn } from "../../lib/utils";
import { useState } from "react";

export default function ResourcesView() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const filtered = resources.filter(r => {
    const matchesFilter = filter === "All" || r.type === filter;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownload = (id: string) => {
    setIsDownloading(id);
    setTimeout(() => setIsDownloading(null), 2000);
  };

  const typeIcons = {
    Notes: FileText,
    PYQ: FileCode,
    Slides: Presentation,
    Book: BookOpen,
  };

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Resource Hub</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Instantly access lecture notes, question papers, and study materials.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
                type="text" 
                placeholder="Search subject or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[1.5rem] focus:ring-2 focus:ring-brand-primary outline-none transition-all font-black text-xs uppercase tracking-widest text-slate-700 dark:text-slate-100"
            />
        </div>
        <div className="flex gap-2 p-2 bg-slate-100 dark:bg-brand-navy rounded-[1.5rem] overflow-x-auto scrollbar-hide border border-transparent dark:border-slate-800">
            {["All", "Notes", "PYQ", "Slides", "Book"].map((type) => (
                <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={cn(
                        "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0",
                        filter === type ? "bg-white dark:bg-brand-primary text-brand-primary dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    )}
                >
                    {type}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => {
            const Icon = typeIcons[item.type];
            return (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white dark:bg-brand-navy p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all flex flex-col justify-between"
                >
                    <div>
                        <div className="flex items-start justify-between mb-6">
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-inner",
                                item.type === "Notes" ? "bg-brand-primary/10 text-brand-primary dark:text-brand-teal" :
                                item.type === "PYQ" ? "bg-status-danger/10 text-status-danger" :
                                item.type === "Slides" ? "bg-status-warning/10 text-status-warning" : "bg-status-success/10 text-status-success"
                            )}>
                                <Icon size={28} />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full">SEM {item.semester}</span>
                        </div>
                        <h4 className="font-black text-lg text-slate-900 dark:text-slate-100 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors leading-tight mb-2 tracking-tight uppercase">{item.title}</h4>
                        <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">{item.subject}</p>
                    </div>
                    
                    <button 
                        onClick={() => handleDownload(item.id)}
                        disabled={isDownloading === item.id}
                        className={cn(
                            "w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all group/btn shadow-inner",
                            isDownloading === item.id 
                                ? "bg-status-success text-white" 
                                : "bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-primary dark:hover:bg-brand-primary text-brand-primary dark:text-brand-teal hover:text-white"
                        )}
                    >
                        {isDownloading === item.id ? (
                            <>
                                <CheckCircle size={18} className="animate-in zoom-in" />
                                Ready
                            </>
                        ) : (
                            <>
                                <Download size={18} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-y-0 transition-transform" />
                                Download
                            </>
                        )}
                    </button>
                </motion.div>
            );
        })}
      </div>
    </div>
  );
}
