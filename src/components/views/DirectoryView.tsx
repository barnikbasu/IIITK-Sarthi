import { User, Search, Building, GraduationCap, Phone, Mail } from "lucide-react";
import { motion } from "motion/react";
import { contacts } from "../../data/mockData";

export default function DirectoryView() {
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
                className="pl-12 pr-6 py-4 bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-2xl w-full md:w-80 focus:ring-2 focus:ring-brand-primary outline-none transition-all dark:text-white font-bold text-sm"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact, idx) => (
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
                  <h4 className="font-black text-slate-900 dark:text-slate-100 tracking-tight">{contact.name}</h4>
                  <p className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest leading-none mt-1">{contact.role}</p>
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
                <button className="flex-1 py-3 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-primary/20">
                    Connect
                </button>
                <button className="px-4 py-3 bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary dark:text-brand-teal rounded-xl hover:bg-brand-primary/10 transition-all border border-brand-primary/10">
                    <Phone size={16} />
                </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
