import React, { useState } from "react";
import { 
  Flame, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  Layers, 
  BarChart2, 
  ChevronRight,
  Info,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ComposedChart 
} from "recharts";
import { cn } from "../../lib/utils";

// Weekly study hour distribution data by day and time block
interface HeatmapCell {
  day: string;
  timeSlot: string;
  hours: number;
  intensity: number; // 0 to 4
  subject: string;
  focusScore: number;
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = [
  { id: "morning", label: "Morning (08:00 - 12:00)" },
  { id: "afternoon", label: "Afternoon (12:00 - 16:00)" },
  { id: "evening", label: "Evening (16:00 - 20:00)" },
  { id: "night", label: "Night (20:00 - 00:00)" },
];

const weeklyHeatmapData: HeatmapCell[] = [
  // Monday
  { day: "Mon", timeSlot: "morning", hours: 2.5, intensity: 3, subject: "Operating Systems", focusScore: 92 },
  { day: "Mon", timeSlot: "afternoon", hours: 1.0, intensity: 1, subject: "DSA Problem Solving", focusScore: 80 },
  { day: "Mon", timeSlot: "evening", hours: 3.0, intensity: 4, subject: "DBMS Queries & Labs", focusScore: 95 },
  { day: "Mon", timeSlot: "night", hours: 2.0, intensity: 2, subject: "Mathematics", focusScore: 88 },

  // Tuesday
  { day: "Tue", timeSlot: "morning", hours: 1.5, intensity: 2, subject: "Computer Org", focusScore: 85 },
  { day: "Tue", timeSlot: "afternoon", hours: 3.5, intensity: 4, subject: "DSA LeetCode Trees", focusScore: 96 },
  { day: "Tue", timeSlot: "evening", hours: 1.5, intensity: 2, subject: "OS Kernel Threads", focusScore: 84 },
  { day: "Tue", timeSlot: "night", hours: 2.5, intensity: 3, subject: "DBMS Normalization", focusScore: 90 },

  // Wednesday
  { day: "Wed", timeSlot: "morning", hours: 3.0, intensity: 4, subject: "Advanced Mathematics", focusScore: 94 },
  { day: "Wed", timeSlot: "afternoon", hours: 0.5, intensity: 1, subject: "Review Lecture Notes", focusScore: 75 },
  { day: "Wed", timeSlot: "evening", hours: 2.0, intensity: 2, subject: "Apex Coding Practice", focusScore: 89 },
  { day: "Wed", timeSlot: "night", hours: 3.5, intensity: 4, subject: "OS Deadlock Project", focusScore: 98 },

  // Thursday
  { day: "Thu", timeSlot: "morning", hours: 2.0, intensity: 2, subject: "DBMS Indexing", focusScore: 86 },
  { day: "Thu", timeSlot: "afternoon", hours: 2.0, intensity: 2, subject: "Computer Org MIPS", focusScore: 82 },
  { day: "Thu", timeSlot: "evening", hours: 3.5, intensity: 4, subject: "DSA Dynamic Prog", focusScore: 96 },
  { day: "Thu", timeSlot: "night", hours: 1.0, intensity: 1, subject: "Research Paper Review", focusScore: 78 },

  // Friday
  { day: "Fri", timeSlot: "morning", hours: 1.5, intensity: 2, subject: "OS Virtual Memory", focusScore: 88 },
  { day: "Fri", timeSlot: "afternoon", hours: 1.0, intensity: 1, subject: "Math Tutorial Prob", focusScore: 80 },
  { day: "Fri", timeSlot: "evening", hours: 2.5, intensity: 3, subject: "Hackathon Prep / Sarthi", focusScore: 91 },
  { day: "Fri", timeSlot: "night", hours: 4.0, intensity: 4, subject: "Apex Hackathon Sprint", focusScore: 99 },

  // Saturday
  { day: "Sat", timeSlot: "morning", hours: 3.5, intensity: 4, subject: "DSA Graph Algorithms", focusScore: 95 },
  { day: "Sat", timeSlot: "afternoon", hours: 2.0, intensity: 2, subject: "DBMS Transaction Logs", focusScore: 87 },
  { day: "Sat", timeSlot: "evening", hours: 1.0, intensity: 1, subject: "Review Quizzes", focusScore: 80 },
  { day: "Sat", timeSlot: "night", hours: 3.0, intensity: 3, subject: "Computer Architecture", focusScore: 90 },

  // Sunday
  { day: "Sun", timeSlot: "morning", hours: 1.0, intensity: 1, subject: "Weekly Revision", focusScore: 78 },
  { day: "Sun", timeSlot: "afternoon", hours: 2.5, intensity: 3, subject: "Math Linear Algebra", focusScore: 89 },
  { day: "Sun", timeSlot: "evening", hours: 3.0, intensity: 4, subject: "Assignment Polish & Lab", focusScore: 97 },
  { day: "Sun", timeSlot: "night", hours: 2.0, intensity: 2, subject: "Next Week Prep", focusScore: 85 },
];

// Assignment completion trends across academic weeks (recharts data)
const assignmentTrendData = [
  { week: "W1 (Jan)", completed: 6, onTime: 6, studyHours: 28, scoreAvg: 88 },
  { week: "W2 (Jan)", completed: 8, onTime: 7, studyHours: 32, scoreAvg: 90 },
  { week: "W3 (Feb)", completed: 7, onTime: 7, studyHours: 34, scoreAvg: 87 },
  { week: "W4 (Feb)", completed: 10, onTime: 9, studyHours: 39, scoreAvg: 92 },
  { week: "W5 (Mar)", completed: 9, onTime: 9, studyHours: 36, scoreAvg: 94 },
  { week: "W6 (Mar)", completed: 11, onTime: 11, studyHours: 42, scoreAvg: 96 },
];

// Subject breakdown hours
const subjectHoursBreakdown = [
  { subject: "Data Structures & Algo", hours: 12.5, fill: "#1A4FD8", percentage: 31 },
  { subject: "Operating Systems", hours: 10.5, fill: "#0D9488", percentage: 26 },
  { subject: "Database Management", hours: 8.5, fill: "#6366F1", percentage: 21 },
  { subject: "Advanced Mathematics", hours: 5.5, fill: "#F59E0B", percentage: 14 },
  { subject: "Computer Organization", hours: 3.0, fill: "#EC4899", percentage: 8 },
];

export default function AcademicHeatmap() {
  const [selectedCell, setSelectedCell] = useState<HeatmapCell | null>(weeklyHeatmapData[2]); // Default Wed Evening
  const [activeTab, setActiveTab] = useState<"distribution" | "velocity">("distribution");

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 4:
        return "bg-brand-primary text-white border-brand-primary/80 shadow-md shadow-brand-primary/20";
      case 3:
        return "bg-indigo-500/80 text-white border-indigo-400/60";
      case 2:
        return "bg-brand-teal/40 dark:bg-brand-teal/50 text-slate-900 dark:text-white border-brand-teal/60";
      case 1:
        return "bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700";
      default:
        return "bg-slate-100 dark:bg-slate-900/50 text-slate-400 border-slate-200 dark:border-slate-800";
    }
  };

  const totalWeeklyHours = weeklyHeatmapData.reduce((sum, c) => sum + c.hours, 0);
  const avgFocusScore = Math.round(weeklyHeatmapData.reduce((sum, c) => sum + c.focusScore, 0) / weeklyHeatmapData.length);

  return (
    <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-7 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-brand-primary/10 dark:bg-brand-teal/10 text-brand-primary dark:text-brand-teal rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
              <Flame size={12} className="text-amber-500" />
              <span>Academic Performance Heatmap & Trends</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              • Real-time Biometric & IDE Analytics
            </span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Weekly Study Distribution & Velocity
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
            Detailed temporal distribution of deep-work blocks, subject time allocation, and weekly assignment completion trajectory.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab("distribution")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all",
              activeTab === "distribution"
                ? "bg-white dark:bg-brand-navy text-brand-primary dark:text-brand-teal shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            Study Heatmap
          </button>
          <button
            onClick={() => setActiveTab("velocity")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all",
              activeTab === "velocity"
                ? "bg-white dark:bg-brand-navy text-brand-primary dark:text-brand-teal shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            Assignment Velocity
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Weekly Deep Work</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-heading">{totalWeeklyHours.toFixed(1)}</span>
            <span className="text-xs font-bold text-slate-400">Hours</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">↑ 14% vs last week</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Avg Focus Rating</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-heading">{avgFocusScore}%</span>
            <span className="text-xs font-bold text-slate-400">Index</span>
          </div>
          <span className="text-[10px] font-bold text-brand-primary dark:text-brand-teal mt-1 block">Optimal Focus Zone</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">On-Time Submissions</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-heading">100%</span>
            <span className="text-xs font-bold text-slate-400">(11/11)</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">Zero Late Penalties</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Peak Productivity Slot</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-base font-black text-slate-900 dark:text-white font-heading">Night (20-24)</span>
          </div>
          <span className="text-[10px] font-bold text-brand-teal mt-1 block">17.5 hrs recorded</span>
        </div>
      </div>

      {activeTab === "distribution" ? (
        <div className="space-y-6">
          {/* Heatmap Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar size={18} className="text-brand-primary dark:text-brand-teal" />
                <span>Weekly Time Block Intensity Matrix</span>
              </h4>

              {/* Intensity Legend */}
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                <span>Less</span>
                <span className="w-3 h-3 rounded-md bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700" />
                <span className="w-3 h-3 rounded-md bg-brand-teal/40 border border-brand-teal/60" />
                <span className="w-3 h-3 rounded-md bg-indigo-500/80" />
                <span className="w-3 h-3 rounded-md bg-brand-primary" />
                <span>More</span>
              </div>
            </div>

            <div className="overflow-x-auto pb-2 scrollbar-hide">
              <div className="min-w-[640px] space-y-2">
                {/* Days Header */}
                <div className="grid grid-cols-8 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <div className="text-left font-black">Slot</div>
                  {daysOfWeek.map(d => (
                    <div key={d} className="py-1">{d}</div>
                  ))}
                </div>

                {/* Heatmap Rows */}
                {timeSlots.map(slot => (
                  <div key={slot.id} className="grid grid-cols-8 gap-2 items-center">
                    <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 leading-tight pr-2">
                      {slot.label.split(" (")[0]}
                      <span className="block text-[9px] text-slate-400 font-mono">
                        ({slot.label.split(" (")[1]}
                      </span>
                    </div>

                    {daysOfWeek.map(day => {
                      const cell = weeklyHeatmapData.find(c => c.day === day && c.timeSlot === slot.id);
                      if (!cell) return <div key={day} className="h-14 rounded-2xl bg-slate-100 dark:bg-slate-900/30" />;

                      const isSelected = selectedCell?.day === day && selectedCell?.timeSlot === slot.id;

                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedCell(cell)}
                          className={cn(
                            "h-14 rounded-2xl border transition-all flex flex-col items-center justify-center p-1 relative group",
                            getIntensityColor(cell.intensity),
                            isSelected ? "ring-4 ring-brand-teal ring-offset-2 dark:ring-offset-brand-navy scale-105 z-10" : "hover:scale-[1.03]"
                          )}
                          title={`${cell.day} ${slot.label}: ${cell.hours} hrs on ${cell.subject}`}
                        >
                          <span className="font-black text-xs font-mono">{cell.hours}h</span>
                          <span className="text-[9px] opacity-80 font-bold truncate max-w-full px-1">
                            {cell.focusScore}%
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Cell Detailed Inspector Card */}
          {selectedCell && (
            <div className="p-5 rounded-3xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex flex-col items-center justify-center font-mono shrink-0 shadow-md">
                  <span className="text-sm font-black leading-none">{selectedCell.hours}h</span>
                  <span className="text-[8px] font-bold uppercase tracking-wider">{selectedCell.day}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {selectedCell.day} • {timeSlots.find(s => s.id === selectedCell.timeSlot)?.label}
                    </span>
                    <span className="px-2 py-0.5 bg-brand-teal/20 text-brand-teal text-[10px] font-black rounded-md">
                      Focus Score {selectedCell.focusScore}%
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    Primary Topic: <strong className="text-slate-800 dark:text-slate-200">{selectedCell.subject}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Intensity Rating</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Tier {selectedCell.intensity}/4 Deep Work</span>
                </div>
              </div>
            </div>
          )}

          {/* Subject Allocation Breakdown */}
          <div className="space-y-3 pt-2">
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              Subject Deep-Work Breakdown (Total {totalWeeklyHours} Hours)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {subjectHoursBreakdown.map(item => (
                <div key={item.subject} className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate max-w-[170px]">
                      {item.subject}
                    </span>
                    <div className="w-28 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: `${item.percentage * 2.5}%`, backgroundColor: item.fill }} 
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900 dark:text-white font-mono">{item.hours}h</span>
                    <span className="text-[10px] font-bold text-slate-400 block">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Assignment Velocity Trends via Recharts */
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 size={18} className="text-brand-primary dark:text-brand-teal" />
                <span>6-Week Assignment Completion Velocity & Score Correlation</span>
              </h4>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                SEMESTER 4 RUN-RATE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Tracks completed lab assignments, on-time submissions, and correlated average academic performance.
            </p>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={assignmentTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                />
                <YAxis 
                  yAxisId="left" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  domain={[0, 15]}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#0D9488', fontSize: 12 }} 
                  domain={[60, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: '1px solid #334155', 
                    backgroundColor: '#0F172A', 
                    color: '#fff',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)' 
                  }} 
                />
                <Legend verticalAlign="top" height={36} />
                <Bar 
                  yAxisId="left" 
                  dataKey="completed" 
                  name="Assignments Completed" 
                  fill="#1A4FD8" 
                  radius={[8, 8, 0, 0]} 
                  barSize={28} 
                />
                <Bar 
                  yAxisId="left" 
                  dataKey="onTime" 
                  name="Submitted On-Time" 
                  fill="#6366F1" 
                  radius={[8, 8, 0, 0]} 
                  barSize={28} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="scoreAvg" 
                  name="Average Grade %" 
                  stroke="#0D9488" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: "#0D9488" }} 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Velocity Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
              <Award className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h5 className="font-bold text-xs text-emerald-800 dark:text-emerald-300">Continuous Submission Streak</h5>
                <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">
                  You have submitted 51 out of 51 total assignments on time across all 4 semesters. Eligible for Academic Dean's Commendation.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-start gap-3">
              <Sparkles className="text-brand-primary dark:text-brand-teal shrink-0 mt-0.5" size={20} />
              <div>
                <h5 className="font-bold text-xs text-brand-primary dark:text-brand-teal">Positive Grade Correlation</h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Each additional 4 hours of focused study per week correlates with a +0.3 SGPA boost in lab evaluations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
