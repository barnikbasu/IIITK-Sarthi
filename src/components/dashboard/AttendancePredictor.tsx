import React, { useState } from "react";
import { 
  Calculator, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Check, 
  X, 
  Plus, 
  Minus, 
  Sparkles, 
  HelpCircle,
  Clock,
  BookOpen,
  ChevronRight,
  RefreshCw,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { SubjectAttendance } from "../../types";
import { subjectAttendanceData as initialAttendance } from "../../data/mockData";

interface AttendancePredictorProps {
  setActiveTab?: (tab: string) => void;
}

export default function AttendancePredictor({ setActiveTab }: AttendancePredictorProps) {
  const [attendanceList, setAttendanceList] = useState<SubjectAttendance[]>(initialAttendance);
  const [targetThreshold, setTargetThreshold] = useState<number>(75); // 75%, 80%, 85%
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialAttendance[0]?.id || "sa1");
  const [simulatedUpcomingAttended, setSimulatedUpcomingAttended] = useState<number>(5);
  const [simulatedUpcomingTotal, setSimulatedUpcomingTotal] = useState<number>(5);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const selectedSubject = attendanceList.find(s => s.id === selectedSubjectId) || attendanceList[0];

  // Global calculations across all subjects
  const overallAttended = attendanceList.reduce((acc, curr) => acc + curr.attended, 0);
  const overallTotal = attendanceList.reduce((acc, curr) => acc + curr.total, 0);
  const overallPercentage = overallTotal > 0 ? (overallAttended / overallTotal) * 100 : 0;

  // Calculate required classes or safe bunks for a specific subject
  const calculateMargin = (attended: number, total: number, thresholdPercent: number) => {
    const p = (attended / total) * 100;
    const threshold = thresholdPercent / 100;
    
    if (p >= thresholdPercent) {
      // Safe to bunk: (attended - threshold * total) / threshold
      const bunks = Math.floor((attended - threshold * total) / threshold);
      return {
        status: "SAFE",
        count: Math.max(0, bunks),
        label: `${Math.max(0, bunks)} classes safe to miss`
      };
    } else {
      // Need to attend consecutively: (threshold * total - attended) / (1 - threshold)
      const needed = Math.ceil((threshold * total - attended) / (1 - threshold));
      return {
        status: "DEFICIT",
        count: needed,
        label: `Must attend next ${needed} consecutive classes`
      };
    }
  };

  // Simulated predicted attendance percentage
  const projectedAttended = selectedSubject.attended + simulatedUpcomingAttended;
  const projectedTotal = selectedSubject.total + simulatedUpcomingTotal;
  const projectedPercentage = (projectedAttended / projectedTotal) * 100;

  const handleQuickAdd = (subjectId: string, isAttended: boolean) => {
    setAttendanceList(prev => prev.map(sub => {
      if (sub.id === subjectId) {
        const newAttended = isAttended ? sub.attended + 1 : sub.attended;
        const newTotal = sub.total + 1;
        const newPercent = (newAttended / newTotal) * 100;
        
        let newStatus: "Safe" | "Warning" | "Critical" = "Safe";
        if (newPercent < 75) newStatus = "Critical";
        else if (newPercent < 80) newStatus = "Warning";

        notify(
          isAttended 
            ? `Logged Present for ${sub.subject} (${newPercent.toFixed(1)}%)` 
            : `Logged Absent for ${sub.subject} (${newPercent.toFixed(1)}%)`
        );

        return {
          ...sub,
          attended: newAttended,
          total: newTotal,
          status: newStatus
        };
      }
      return sub;
    }));
  };

  return (
    <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-7 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
              <Calculator size={12} className="text-emerald-500" />
              <span>Smart 75% Attendance Predictor & Deficit Engine</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              • Academic Regulation 4.2
            </span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Attendance Predictor & Safe Bunk Planner
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
            Simulate future class attendance, compute exact consecutive lectures required to hit the mandatory 75% threshold, or plan safe bunk buffers.
          </p>
        </div>

        {/* Target Threshold Selector (75% / 80% / 85%) */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 self-start lg:self-auto shrink-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Goal:</span>
          {[75, 80, 85].map((t) => (
            <button
              key={t}
              onClick={() => setTargetThreshold(t)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                targetThreshold === t
                  ? "bg-brand-primary text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {t}% {t === 75 ? "(Min)" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl text-xs font-bold text-brand-primary dark:text-brand-teal flex items-center gap-2"
          >
            <Check size={16} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Overall Percentage */}
        <div className="p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Overall Aggregate</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={cn(
                "text-3xl font-black font-heading tracking-tight",
                overallPercentage >= 75 ? "text-emerald-500" : "text-rose-500"
              )}>
                {overallPercentage.toFixed(1)}%
              </span>
              <span className="text-xs font-bold text-slate-400">
                ({overallAttended}/{overallTotal} total)
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-1">
              {overallPercentage >= targetThreshold 
                ? `+${(overallPercentage - targetThreshold).toFixed(1)}% above your ${targetThreshold}% goal`
                : `${(targetThreshold - overallPercentage).toFixed(1)}% deficit from ${targetThreshold}% goal`}
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <ShieldCheck size={24} />
          </div>
        </div>

        {/* Safe Bunks Buffer */}
        <div className="p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Overall Safe Buffer</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black font-heading text-brand-primary dark:text-brand-teal tracking-tight">
                {calculateMargin(overallAttended, overallTotal, targetThreshold).count}
              </span>
              <span className="text-xs font-bold text-slate-400">Classes Margin</span>
            </div>
            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              No examination debarment risk
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center shrink-0">
            <Zap size={24} />
          </div>
        </div>

        {/* Subjects at Risk */}
        <div className="p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Subjects Under Threshold</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black font-heading text-amber-500 tracking-tight">
                {attendanceList.filter(s => (s.attended / s.total) * 100 < targetThreshold).length}
              </span>
              <span className="text-xs font-bold text-slate-400">of {attendanceList.length} Courses</span>
            </div>
            <p className="text-[10px] font-bold text-amber-500 mt-1">
              Computer Org at 73.1% (Needs 2 classes)
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <AlertTriangle size={24} />
          </div>
        </div>

      </div>

      {/* Main Grid: Subject Breakdown & Interactive Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: All Subjects List with Predictor Calculation (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              Subject-Wise Breakdown & Deficit Formula
            </h4>
            <span className="text-[11px] text-slate-400 font-medium">Click a subject to simulate</span>
          </div>

          <div className="space-y-3">
            {attendanceList.map((sub) => {
              const currentPercent = (sub.attended / sub.total) * 100;
              const margin = calculateMargin(sub.attended, sub.total, targetThreshold);
              const isSelected = selectedSubjectId === sub.id;

              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubjectId(sub.id)}
                  className={cn(
                    "p-4 rounded-3xl border transition-all cursor-pointer space-y-3 group",
                    isSelected
                      ? "bg-brand-primary/5 dark:bg-brand-teal/5 border-brand-primary dark:border-brand-teal shadow-md"
                      : "bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800 hover:border-brand-primary/40"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                          {sub.code}
                        </span>
                        <h5 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                          {sub.subject}
                        </h5>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                        Faculty: {sub.faculty}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={cn(
                        "text-lg font-black font-heading",
                        currentPercent >= targetThreshold ? "text-emerald-500" : "text-rose-500"
                      )}>
                        {currentPercent.toFixed(1)}%
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold block">
                        {sub.attended}/{sub.total} Classes
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
                      {/* Target threshold marker line */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white z-10 opacity-60" 
                        style={{ left: `${targetThreshold}%` }}
                        title={`${targetThreshold}% Mandatory Line`}
                      />
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          currentPercent >= targetThreshold ? "bg-emerald-500" : "bg-rose-500"
                        )}
                        style={{ width: `${Math.min(100, currentPercent)}%` }}
                      />
                    </div>
                  </div>

                  {/* Margin status and quick log buttons */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className={cn(
                      "text-[11px] font-bold flex items-center gap-1",
                      margin.status === "SAFE" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                    )}>
                      {margin.status === "SAFE" ? <Check size={13} strokeWidth={3} /> : <AlertTriangle size={13} />}
                      <span>{margin.label}</span>
                    </span>

                    {/* Quick +1 / -1 Buttons */}
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleQuickAdd(sub.id, true)}
                        className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-black transition-all"
                        title="Quick Log: Attended (+1)"
                      >
                        + Present
                      </button>
                      <button
                        onClick={() => handleQuickAdd(sub.id, false)}
                        className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-600 dark:text-rose-400 rounded-lg text-[10px] font-black transition-all"
                        title="Quick Log: Missed (+1 Total)"
                      >
                        + Absent
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Prediction Sandbox (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-50/90 dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest block">
                  Interactive Sandbox
                </span>
                <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                  {selectedSubject.subject}
                </h4>
              </div>
              <span className="text-xs font-bold text-slate-400 font-mono">
                {selectedSubject.code}
              </span>
            </div>

            {/* Current State vs Predicted State */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Current</span>
                <span className="text-xl font-black text-slate-800 dark:text-slate-200 font-heading">
                  {((selectedSubject.attended / selectedSubject.total) * 100).toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {selectedSubject.attended}/{selectedSubject.total} classes
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-brand-primary/10 dark:bg-brand-teal/10 border border-brand-primary/20 dark:border-brand-teal/20">
                <span className="text-[9px] font-black uppercase text-brand-primary dark:text-brand-teal tracking-wider block">Projected</span>
                <span className="text-xl font-black text-brand-primary dark:text-brand-teal font-heading">
                  {projectedPercentage.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {projectedAttended}/{projectedTotal} classes
                </span>
              </div>
            </div>

            {/* Simulation Controls */}
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Upcoming Lectures to Attend:</span>
                  <span className="font-mono text-brand-primary dark:text-brand-teal text-sm font-black">{simulatedUpcomingAttended} Classes</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max={simulatedUpcomingTotal}
                  value={simulatedUpcomingAttended}
                  onChange={(e) => setSimulatedUpcomingAttended(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Total Upcoming Lectures Scheduled:</span>
                  <span className="font-mono text-slate-900 dark:text-white text-sm font-black">{simulatedUpcomingTotal} Classes</span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="15"
                  value={simulatedUpcomingTotal}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setSimulatedUpcomingTotal(val);
                    if (simulatedUpcomingAttended > val) {
                      setSimulatedUpcomingAttended(val);
                    }
                  }}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-teal"
                />
              </div>
            </div>

            {/* Dynamic Sarthi Prediction Recommendation */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-brand-primary dark:text-brand-teal" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  AI Recommendation
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {projectedPercentage >= targetThreshold ? (
                  <>
                    Attending <strong>{simulatedUpcomingAttended}</strong> out of next <strong>{simulatedUpcomingTotal}</strong> lectures will yield a safe <strong>{projectedPercentage.toFixed(1)}%</strong> standing. You can safely afford to miss {simulatedUpcomingTotal - simulatedUpcomingAttended} class(es).
                  </>
                ) : (
                  <>
                    Warning: Attending only <strong>{simulatedUpcomingAttended}</strong> classes will drop your attendance to <strong>{projectedPercentage.toFixed(1)}%</strong>. You need to attend at least <strong>{Math.ceil((targetThreshold / 100 * projectedTotal - selectedSubject.attended))}</strong> of the upcoming lectures to stay above {targetThreshold}%.
                  </>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (setActiveTab) setActiveTab("analytics");
            }}
            className="w-full py-3 bg-brand-primary hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <span>Open Comprehensive Attendance Analytics</span>
            <ChevronRight size={14} />
          </button>
        </div>

      </div>

    </div>
  );
}
