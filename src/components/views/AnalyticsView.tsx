import { TrendingUp, Target, BarChart3, PieChart, Info, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import { cn } from "../../lib/utils";

const performanceData = [
  { sem: "Sem 1", gpa: 8.2 },
  { sem: "Sem 2", gpa: 8.5 },
  { sem: "Sem 3", gpa: 8.1 },
  { sem: "Sem 4", gpa: 8.8 },
];

export default function AnalyticsView() {
  return (
    <div className="space-y-8 pb-20">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Academic Analytics</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Track your performance and set future targets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-brand-navy p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                          <TrendingUp size={80} className="text-brand-primary" />
                      </div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Overall CGPA</p>
                      <h3 className="text-5xl font-black text-slate-900 dark:text-white">8.42</h3>
                      <div className="mt-4 flex items-center gap-2 text-status-success font-bold text-sm">
                          <div className="w-2 h-2 rounded-full bg-status-success animate-pulse"></div>
                          <span>Top 15% of Batch</span>
                      </div>
                  </div>

                  <div className="bg-white dark:bg-brand-navy p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Target size={80} className="text-status-danger" />
                      </div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Target CGPA</p>
                      <h3 className="text-5xl font-black text-slate-900 dark:text-white">8.50</h3>
                      <button className="mt-4 text-status-danger dark:text-rose-400 font-bold text-sm flex items-center gap-1 hover:underline">
                          Recalculate Path <RefreshCw size={14} />
                      </button>
                  </div>
              </div>

              {/* Chart */}
              <div className="bg-white dark:bg-brand-navy p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
                        <BarChart3 size={24} className="text-brand-primary dark:text-brand-teal" />
                        Performance Trends
                      </h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">LAST 4 SEMESTERS</span>
                  </div>
                  <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={performanceData}>
                            <defs>
                                <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1A4FD8" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#1A4FD8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="sem" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                            <YAxis domain={[0, 10]} hide />
                            <Tooltip 
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area type="monotone" dataKey="gpa" stroke="#1A4FD8" strokeWidth={4} fillOpacity={1} fill="url(#colorGpa)" />
                         </AreaChart>
                      </ResponsiveContainer>
                  </div>
              </div>
          </div>

          {/* Calculator Sidebar */}
          <div className="space-y-6">
               <div className="bg-brand-navy rounded-[2.5rem] p-8 text-white relative overflow-hidden border border-white/5 shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl"></div>
                    <h3 className="text-xl font-black mb-6 tracking-tight">Eligibility Check</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Google SDE Intern", min: 8.0, status: "Eligible" },
                            { name: "Microsoft SWE", min: 8.5, status: "Risk" },
                            { name: "Amazon SDE-1", min: 7.5, status: "Eligible" },
                        ].map((comp, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div>
                                    <p className="font-bold text-sm">{comp.name}</p>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">MIN: {comp.min}</p>
                                </div>
                                <span className={cn(
                                    "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter",
                                    comp.status === "Eligible" ? "bg-status-success/20 text-status-success" : "bg-status-danger/20 text-status-danger"
                                )}>{comp.status}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-4 bg-white text-brand-navy rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors">View All Companies</button>
               </div>

               <div className="bg-brand-teal/5 dark:bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-[2.5rem] group cursor-pointer hover:bg-brand-teal/10 transition-all">
                    <h3 className="text-xl font-black text-brand-teal mb-2 tracking-tight">Grade Predictor</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 font-medium italic">Simulate your internal marks to see predicted SGPA.</p>
                    <div className="flex items-center gap-2 text-brand-teal font-black text-xs uppercase tracking-widest">
                        <span>Launch Tool</span>
                        <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
                    </div>
               </div>
          </div>
      </div>
    </div>
  );
}
