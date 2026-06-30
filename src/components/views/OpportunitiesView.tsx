import { Briefcase, Zap, Star, Filter, ArrowRight, Compass, X, Check, Upload, HelpCircle, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { opportunities as initialOpps } from "../../data/mockData";
import { cn } from "../../lib/utils";
import { useState } from "react";

interface OppItem {
  id: string;
  title: string;
  company: string;
  type: string;
  deadline: string;
  matchScore: number;
  tags: string[];
  applied?: boolean;
}

export default function OpportunitiesView() {
  const [oppList, setOppList] = useState<OppItem[]>(initialOpps);
  
  // Modal states
  const [selectedOpp, setSelectedOpp] = useState<OppItem | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

  // Apply form state
  const [statement, setStatement] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApplyClick = (opp: OppItem) => {
    if (opp.applied) {
      triggerToast(`You have already applied to ${opp.company} for ${opp.title}!`);
      return;
    }
    setSelectedOpp(opp);
    setStatement(`I am a pre-final year B.Tech student at IIIT Kalyani with a strong foundation in standard algorithms, data structures, and practical development. I would love to join your engineering team.`);
    setUploadedFileName("Barnik_Basu_Resume_IIITK.pdf");
    setIsApplyOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setUploadedFileName(file.name);
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;

    setOppList(prev => prev.map(opp => {
      if (opp.id === selectedOpp.id) {
        return { ...opp, applied: true };
      }
      return opp;
    }));

    setIsApplyOpen(false);
    triggerToast(`Application successfully dispatched to ${selectedOpp.company}! Recruiter notification generated. 🚀`);
  };

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Opportunities Hub</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Your personalized career and growth ecosystem.</p>
        </div>
        <button 
          onClick={() => setIsMatrixOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary dark:text-brand-teal border border-brand-primary/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary/10 transition-all shrink-0"
        >
          <Filter size={18} /> Skill Matrix Analyzer
        </button>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-status-success/10 border border-status-success/20 rounded-2xl flex items-center gap-3 text-status-success font-black text-xs uppercase tracking-widest justify-center z-40"
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main List */}
        <div className="lg:col-span-8 space-y-4">
          {oppList.map((opp, idx) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleApplyClick(opp)}
              className="group bg-white dark:bg-brand-navy p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-primary/20 dark:hover:border-brand-primary/30 transition-all cursor-pointer overflow-hidden relative flex flex-col justify-between"
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
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-850 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-brand-primary/10 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors shrink-0 shadow-inner">
                   <Briefcase size={28} />
                </div>
                <div className="pr-20">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest">{opp.type}</span>
                    {opp.applied && (
                      <span className="bg-status-success/10 text-status-success font-black text-[9px] uppercase px-2 py-0.5 rounded-full">
                        Applied
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 mt-1 tracking-tight group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">{opp.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">{opp.company} • Deadline: {opp.deadline}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {opp.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-tighter rounded-full border border-slate-100 dark:border-slate-800">
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
                <button 
                  onClick={() => setIsRoadmapOpen(true)}
                  className="w-full py-4 bg-white text-brand-navy font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                >
                   Open Career Roadmap <ArrowRight size={16} />
                </button>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-black text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-widest text-xs">Curated for You</h3>
                <div className="space-y-6">
                    {[
                      { name: "ACM ICPC Regional Selection", info: "In 3 Days", desc: "Competitive Coding Selection" },
                      { name: "Google HashCode Warmup", info: "In 1 Week", desc: "Practice Arena Open" }
                    ].map((cur, i) => (
                        <div 
                          key={i} 
                          onClick={() => triggerToast(`Opened details for ${cur.name}`)}
                          className="flex items-center gap-4 group cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors shadow-inner">
                               <Compass size={20} className="text-slate-400 group-hover:text-brand-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight line-clamp-1">{cur.name}</p>
                                <p className="text-[10px] text-brand-primary dark:text-brand-teal font-black uppercase tracking-widest">{cur.info}</p>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* APPLY INTERN MODAL */}
      <AnimatePresence>
        {isApplyOpen && selectedOpp && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsApplyOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest font-semibold">APPLICATION WINDOW</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">Apply to {selectedOpp.company}</h3>
                <p className="text-xs text-slate-400 uppercase font-black tracking-wider mt-1">{selectedOpp.title} • Match Score: {selectedOpp.matchScore}%</p>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">Statement of Interest</label>
                  <textarea 
                    rows={4}
                    required
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">Attached CV / Resume</label>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                     <div className="flex items-center gap-3">
                        <FileText size={24} className="text-brand-primary" />
                        <div>
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[200px] truncate">{uploadedFileName || "No CV attached"}</p>
                          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">{isUploading ? "Uploading file..." : "PDF, max size 5MB"}</p>
                        </div>
                     </div>
                     <label className="px-4 py-2 bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 shadow-sm flex items-center gap-1">
                        <Upload size={12} /> {uploadedFileName ? "Replace" : "Upload"}
                        <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                     </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsApplyOpen(false)}
                    className="px-5 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:opacity-95 transition-all"
                  >
                    Dispatch Application
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SKILL MATRIX MODAL */}
      <AnimatePresence>
        {isMatrixOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-xl p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsMatrixOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center">
                   <Filter size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-semibold">SKILL ALIGNMENT MATRIX</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">AI Skill Matrix Analyzer</h3>
                </div>
              </div>

              <div className="space-y-5 text-xs">
                 <p className="text-slate-500 font-bold dark:text-slate-400">Sarthi parses your current academic semester notes, directory records, and tasks to map your skill alignment across standard job postings.</p>

                 <div className="space-y-4">
                    {[
                      { name: "Algorithms & DSA (C++ / Java)", level: "Advanced", pct: 90, color: "bg-status-success" },
                      { name: "Web Systems & APIs (React / Node)", level: "Intermediate", pct: 75, color: "bg-brand-primary" },
                      { name: "Machine Learning (Python)", level: "Beginner", pct: 40, color: "bg-status-warning" }
                    ].map((skill, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800">
                         <div className="flex justify-between items-center mb-1">
                            <span className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter">{skill.name}</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{skill.level} ({skill.pct}%)</span>
                         </div>
                         <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full", skill.color)} style={{ width: `${skill.pct}%` }}></div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end mt-6">
                <button 
                  onClick={() => setIsMatrixOpen(false)}
                  className="px-6 py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:opacity-95 transition-all"
                >
                  Confirm Matrix Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ROADMAP MODAL */}
      <AnimatePresence>
        {isRoadmapOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-xl p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsRoadmapOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center">
                   <Star size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-semibold">GROWTH TIMELINE</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Sarthi AI Personalized Roadmap</h3>
                </div>
              </div>

              <div className="space-y-4 relative pl-8 border-l border-slate-100 dark:border-slate-800 text-xs">
                 {[
                   { step: "Phase 1: Foundations", desc: "Solidify dynamic programming and graph structures before pre-placement interviews. Recurrence relations must be clear.", done: true },
                   { step: "Phase 2: Project Portfolio", desc: "Deploy a full-stack system using Vite and Express with custom sqlite or cloud persistence schemas. Show real architectural depth.", done: false },
                   { step: "Phase 3: Dispatch & Apply", desc: "Resume review by IIIT Kalyani placement coordinators. Apply to matched Tier-1 internship listings in the Sarthi ecosystem.", done: false }
                 ].map((itm, i) => (
                   <div key={i} className="relative pb-4">
                      <div className={cn("absolute -left-[41px] w-6 h-6 rounded-full border-4 border-white dark:border-brand-navy flex items-center justify-center text-white", 
                        itm.done ? "bg-status-success" : "bg-slate-200 dark:bg-slate-800"
                      )}>
                         {itm.done && <Check size={10} strokeWidth={4} />}
                      </div>
                      <h4 className="font-black text-slate-800 dark:text-slate-100 uppercase tracking-tighter leading-none mb-1.5">{itm.step}</h4>
                      <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{itm.desc}</p>
                   </div>
                 ))}
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end mt-4">
                <button 
                  onClick={() => setIsRoadmapOpen(false)}
                  className="px-6 py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:opacity-95 transition-all"
                >
                  Close Roadmap
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
