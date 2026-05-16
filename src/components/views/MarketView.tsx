import { ShoppingBag, Search, Tag, Plus, User, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { marketItems } from "../../data/mockData";
import { cn } from "../../lib/utils";

export default function MarketView() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Student Marketplace</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Buy, sell, or trade items with fellow students on campus.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-brand-primary dark:bg-brand-primary rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-brand-primary/20 hover:opacity-90 transition-all active:scale-95 group">
            <Plus size={20} />
            List Asset
        </button>
      </div>

      {/* Featured Banner */}
      <div className="relative overflow-hidden bg-brand-navy rounded-[2.5rem] p-10 text-white border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-lg">
              <span className="inline-block px-4 py-1.5 bg-brand-primary/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">CAMPUS CLEARANCE</span>
              <h3 className="text-4xl font-black tracking-tighter mb-6 leading-tight">Need a Cycle? Check the Summer Sale!</h3>
              <p className="text-slate-400 font-bold mb-8 italic leading-relaxed">Final year students are listing their items at great prices. Secure yours before graduation season concludes.</p>
              <button className="flex items-center gap-3 bg-white text-brand-navy px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl shadow-black/20">
                  Browse Inventory <ArrowRight size={18} />
              </button>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {marketItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-brand-navy rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all group"
          >
            <div className="aspect-video bg-slate-50 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                <ShoppingBag size={48} className="text-slate-200 dark:text-slate-700 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
                <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/90 dark:bg-brand-navy/90 backdrop-blur shadow-sm rounded-full text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest border border-slate-100 dark:border-slate-800">
                        {item.category}
                    </span>
                </div>
                <div className="absolute bottom-6 right-6 bg-brand-primary text-white px-5 py-2.5 rounded-2xl font-black text-xl shadow-xl shadow-brand-primary/20">
                    ₹{item.price}
                </div>
            </div>
            
            <div className="p-8">
                <div className="flex items-center justify-between gap-4 mb-3">
                    <h4 className="font-black text-xl text-slate-800 dark:text-slate-100 tracking-tight truncate uppercase leading-none">{item.title}</h4>
                </div>
                
                <div className="flex items-center gap-2 mb-8">
                   <span className={cn(
                       "text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter",
                       item.condition === "New" ? "bg-status-success/10 text-status-success" : "bg-status-warning/10 text-status-warning"
                   )}>
                       {item.condition} AUTHENTIC
                   </span>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 text-slate-500">
                         <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center ring-2 ring-transparent group-hover:ring-brand-primary/20 transition-all">
                            <User size={14} className="group-hover:text-brand-primary transition-colors" />
                         </div>
                         <span className="text-xs font-bold dark:text-slate-400">{item.seller}</span>
                    </div>
                    <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary dark:text-brand-teal hover:bg-brand-primary hover:text-white transition-all shadow-inner">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
