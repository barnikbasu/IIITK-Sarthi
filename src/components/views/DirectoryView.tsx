import { User, Search, Building, GraduationCap, Phone, Mail, CheckCircle, Loader2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { contacts } from "../../data/mockData";
import { useState } from "react";
import { cn } from "../../lib/utils";

export default function DirectoryView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionState, setActionState] = useState<{ id: string, type: 'connect' | 'call' } | null>(null);

  const filtered = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (id: string, type: 'connect' | 'call') => {
    setActionState({ id, type });
    setTimeout(() => setActionState(null), 2000);
  };
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Campus Directory</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Find and connect with faculty, staff, and departments.</p>
        </div>
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Search community..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-2xl w-full md:w-80 focus:ring-2 focus:ring-brand-primary outline-none transition-all dark:text-white font-bold text-sm"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((contact, idx) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group hover:border-brand-primary/20"
          >
            <div className="flex items-center gap-4 mb-6">
               <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center overflow-hidden border border-brand-primary/10 shadow-inner">
                  {contact.avatar ? <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" /> : <User size={32} />}
               </div>
               <div>
                  <h4 className="font-black text-slate-900 dark:text-slate-100 tracking-tight text-lg leading-tight uppercase">{contact.name}</h4>
                  <p className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest mt-1 leading-tight">{contact.role}</p>
               </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-tight">
                    <Building size={16} className="text-brand-primary dark:text-brand-teal opacity-60" />
                    <span>{contact.department}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-bold tracking-tight">
                    <Mail size={16} className="text-brand-primary dark:text-brand-teal opacity-60" />
                    <span className="truncate">{contact.email}</span>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                <button 
                    onClick={() => handleAction(contact.id, 'connect')}
                    className={cn(
                        "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg",
                        actionState?.id === contact.id && actionState.type === 'connect'
                            ? "bg-status-success text-white" 
                            : "bg-brand-primary text-white hover:opacity-90 shadow-brand-primary/20"
                    )}
                >
                    {actionState?.id === contact.id && actionState.type === 'connect' ? "Requested" : "Connect"}
                </button>
                <button 
                    onClick={() => handleAction(contact.id, 'call')}
                    className={cn(
                        "px-4 py-3 rounded-xl transition-all border",
                        actionState?.id === contact.id && actionState.type === 'call'
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary dark:text-brand-teal border-brand-primary/10 hover:bg-brand-primary/10"
                    )}
                >
                    {actionState?.id === contact.id && actionState.type === 'call' ? <CheckCircle size={18} /> : <Phone size={16} />}
                </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
