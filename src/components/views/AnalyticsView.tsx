import { TrendingUp, Target, BarChart3, PieChart, Info, RefreshCw, X, Check, Calculator, Sparkles, Building, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { cn } from "../../lib/utils";
import { useState } from "react";

const performanceData = [
  { sem: "Sem 1", gpa: 8.2 },
  { sem: "Sem 2", gpa: 8.5 },
  { sem: "Sem 3", gpa: 8.1 },
  { sem: "Sem 4", gpa: 8.8 },
];

const companiesRequirement = [
  { name: "Google India", role: "SDE Intern", min: 8.0, status: "Eligible" },
  { name: "Microsoft", role: "SWE Apprentice", min: 8.5, status: "Risk" },
  { name: "Amazon", role: "SDE-1", min: 7.5, status: "Eligible" },
  { name: "Atlassian", role: "Graduate Engineer", min: 8.2, status: "Eligible" },
  { name: "Uber", role: "Core Infra Associate", min: 8.8, status: "Risk" },
  { name: "Salesforce", role: "MTS Intern", min: 8.0, status: "Eligible" }
];

export default function AnalyticsView() {
  // Modal states
  const [isPathOpen, setIsPathOpen] = useState(false);
  const [isCompaniesOpen, setIsCompaniesOpen] = useState(false);
  const [isPredictorOpen, setIsPredictorOpen] = useState(false);

  // Target GPA recalculator state
  const [targetCgpa, setTargetCgpa] = useState("8.50");
  const [pathResult, setPathResult] = useState<string | null>(null);

  // Predictor state - Semester 4 subjects and credits
  const [grades, setGrades] = useState<{ [key: string]: number }>({
    dsa: 10,
    os: 9,
    dbms: 9,
    co: 8,
    maths: 9
  });

  const calculateTargetPathway = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(targetCgpa) || 8.5;
    const currentSemCount = 4;
    const currentAvg = 8.42;
    const totalSems = 8;
    
    // Remaining Sems: 4
    // (target * 8 - currentAvg * 4) / 4
    const neededGpa = ((target * totalSems) - (currentAvg * currentSemCount)) / (totalSems - currentSemCount);
    
    if (neededGpa > 10.0) {
      setPathResult("Math limit exceeded: A CGPA of 10.0+ is required in the next 4 semesters. Sarthi recommends adjusting your target to a slightly lower range.");
    } else if (neededGpa < 5.0) {
      setPathResult(`Pathway identified: You need an average SGPA of ${neededGpa.toFixed(2)} across the next 4 semesters to hit your ${target} CGPA goal. Extremely safe!`);
    } else {
      setPathResult(`Pathway identified: You need an average SGPA of ${neededGpa.toFixed(2)} across Semester 5, 6, 7, and 8 to hit your ${target} CGPA goal. You got this!`);
    }
  };

  const calculatePredictedSGPA = () => {
    // Credits: DSA (4), OS (4), DBMS (4), CO (3), Maths (4) -> Total credits = 19
    const totalCredits = 19;
    const weightedSum = (grades.dsa * 4) + (grades.os * 4) + (grades.dbms * 4) + (grades.co * 3) + (grades.maths * 4);
    return (weightedSum / totalCredits).toFixed(2);
  };

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Academic Analytics</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Track your performance, simulate target SGPAs, and set career goals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-brand-navy p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                          <TrendingUp size={80} className="text-brand-primary" />
                      </div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 font-semibold">Overall CGPA</p>
                      <h3 className="text-5xl font-black text-slate-900 dark:text-white">8.42</h3>
                      <div className="mt-4 flex items-center gap-2 text-status-success font-bold text-sm">
                          <div className="w-2 h-2 rounded-full bg-status-success animate-pulse"></div>
                          <span>Top 15% of Batch</span>
                      </div>
                  </div>

                  <div className="bg-white dark:bg-brand-navy p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                          <Target size={80} className="text-status-danger" />
                      </div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 font-semibold">Target CGPA</p>
                      <h3 className="text-5xl font-black text-slate-900 dark:text-white">{targetCgpa}</h3>
                      <button 
                        onClick={() => setIsPathOpen(true)}
                        className="mt-4 text-status-danger dark:text-rose-400 font-bold text-sm flex items-center gap-1 hover:underline"
                      >
                          Recalculate Path <RefreshCw size={14} />
                      </button>
                  </div>
              </div>

              {/* Chart */}
              <div className="bg-white dark:bg-brand-navy p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight uppercase leading-none">
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
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-xl font-black mb-6 tracking-tight uppercase leading-none">Eligibility Check</h3>
                    <div className="space-y-4">
                        {companiesRequirement.slice(0, 3).map((comp, i) => (
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
                    <button 
                      onClick={() => setIsCompaniesOpen(true)}
                      className="w-full mt-6 py-4 bg-white text-brand-navy rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors shadow-xl"
                    >
                      View All Recruiters
                    </button>
               </div>

               <div 
                 onClick={() => setIsPredictorOpen(true)}
                 className="bg-brand-teal/5 dark:bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-[2.5rem] group cursor-pointer hover:bg-brand-teal/10 transition-all flex flex-col justify-between min-h-[180px]"
               >
                    <div>
                      <h3 className="text-xl font-black text-brand-teal mb-2 tracking-tight uppercase leading-none flex items-center gap-2">
                        <Calculator size={20} /> Grade Predictor
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 font-semibold italic">Simulate subject grades to preview Semester 4 SGPA immediately.</p>
                    </div>
                    <div className="flex items-center gap-2 text-brand-teal font-black text-xs uppercase tracking-widest">
                        <span>Launch Tool</span>
                        <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
                    </div>
               </div>
          </div>
      </div>

      {/* TARGET RECALCULATE MODAL */}
      <AnimatePresence>
        {isPathOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => {
                  setIsPathOpen(false);
                  setPathResult(null);
                }}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest">PERFORMANCE TARGETS</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">Recalculate CGPA Path</h3>
              </div>

              <form onSubmit={calculateTargetPathway} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">Desired Graduation CGPA Goal</label>
                  <input 
                    type="number"
                    step="0.01"
                    min="5"
                    max="10"
                    required
                    value={targetCgpa}
                    onChange={(e) => setTargetCgpa(e.target.value)}
                    placeholder="e.g. 8.50"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-brand-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-lg"
                >
                  Analyze Semester Milestone
                </button>
              </form>

              {/* Pathway Results */}
              <AnimatePresence>
                {pathResult && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold"
                  >
                     <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-start gap-2.5">
                        <Sparkles size={16} className="text-brand-primary shrink-0 mt-0.5" />
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{pathResult}</p>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ALL COMPANIES RECRUITERS TABLE MODAL */}
      <AnimatePresence>
        {isCompaniesOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsCompaniesOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center">
                   <Building size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-semibold">PLACEMENT TRACKER</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Recruiter Eligibility Audit</h3>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800 max-h-[300px] scrollbar-hide text-xs">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 font-black uppercase text-[10px] text-slate-400 tracking-wider">
                       <th className="p-4">Recruiter</th>
                       <th className="p-4">Active Profile</th>
                       <th className="p-4">Min CGPA</th>
                       <th className="p-4">Status</th>
                     </tr>
                   </thead>
                   <tbody className="font-semibold text-slate-700 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                     {companiesRequirement.map((comp, idx) => (
                       <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
                         <td className="p-4 font-black uppercase text-slate-900 dark:text-slate-150 flex items-center gap-2">
                           <Briefcase size={14} className="text-slate-400" />
                           {comp.name}
                         </td>
                         <td className="p-4 text-slate-500 dark:text-slate-400">{comp.role}</td>
                         <td className="p-4 font-mono">{comp.min}</td>
                         <td className="p-4">
                           <span className={cn(
                             "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter",
                             comp.status === "Eligible" ? "bg-status-success/20 text-status-success" : "bg-status-danger/20 text-status-danger"
                           )}>{comp.status}</span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GRADE PREDICTOR MODAL */}
      <AnimatePresence>
        {isPredictorOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsPredictorOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center">
                   <Calculator size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-semibold">PREDICTIVE SIMULATION</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Grade Predictor (Sem 4)</h3>
                </div>
              </div>

              <div className="space-y-4">
                 <p className="text-xs text-slate-500 font-bold dark:text-slate-400 leading-relaxed">Adjust your expected letter-grades below to predict your upcoming SGPA. Credit weightage follows the official IIIT Kalyani course register.</p>

                 <div className="space-y-3">
                    {[
                      { key: "dsa", label: "Data Structures & Algorithms", credit: 4 },
                      { key: "os", label: "Operating Systems Core", credit: 4 },
                      { key: "dbms", label: "Database Management Systems", credit: 4 },
                      { key: "co", label: "Computer Organization", credit: 3 },
                      { key: "maths", label: "Advanced Mathematics", credit: 4 }
                    ].map((subj) => (
                      <div key={subj.key} className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-semibold">
                         <div>
                            <span className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter block">{subj.label}</span>
                            <span className="text-[9px] font-black uppercase text-slate-400">CREDITS: {subj.credit}</span>
                         </div>
                         <select
                           value={grades[subj.key]}
                           onChange={(e) => setGrades({ ...grades, [subj.key]: parseInt(e.target.value) })}
                           className="px-3 py-1.5 bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-xl font-bold font-mono outline-none text-slate-700 dark:text-slate-200"
                         >
                           <option value="10">O (10)</option>
                           <option value="9">E (9)</option>
                           <option value="8">A (8)</option>
                           <option value="7">B (7)</option>
                           <option value="6">C (6)</option>
                         </select>
                      </div>
                    ))}
                 </div>

                 {/* Simulated SGPA display */}
                 <div className="p-5 bg-brand-navy text-white rounded-3xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-brand-teal uppercase tracking-widest leading-none">Predicted Semester SGPA</p>
                      <p className="text-xs text-slate-400 font-medium mt-1 leading-none">Based on 19 credit hours total</p>
                    </div>
                    <span className="text-4xl font-black text-brand-teal tracking-tighter">{calculatePredictedSGPA()}</span>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
