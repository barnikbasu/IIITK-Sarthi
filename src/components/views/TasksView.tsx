import { CheckCircle2, Circle, Clock, AlertTriangle, Plus, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { tasks } from "../../data/mockData";
import { cn } from "../../lib/utils";

import { Task } from "../../types";

export default function TasksView() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Academic Productivity</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Keep track of your assignments, exams, and deadlines.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-brand-primary dark:bg-brand-primary rounded-2xl text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-brand-primary/20 hover:opacity-90 transition-all active:scale-95 group">
            <Plus size={20} />
            New Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Urgent Column */}
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <AlertTriangle size={18} className="text-rose-500" />
                    Urgent Actions
                </h3>
                <span className="text-xs font-bold text-slate-400">1 TASK</span>
            </div>
            
            <div className="space-y-4">
                {tasks.filter(t => t.priority === "High").map(task => (
                    <div key={task.id}>
                        <TaskCard task={task} />
                    </div>
                ))}
            </div>
        </div>

        {/* Moderate Column */}
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Clock size={18} className="text-amber-500" />
                    Upcoming
                </h3>
                <span className="text-xs font-bold text-slate-400">1 TASK</span>
            </div>
            <div className="space-y-4">
                {tasks.filter(t => t.priority === "Moderate").map(task => (
                    <div key={task.id}>
                        <TaskCard task={task} />
                    </div>
                ))}
            </div>
        </div>

        {/* All/Backlog Column */}
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Calendar size={18} className="text-emerald-500" />
                    Backlog
                </h3>
                <span className="text-xs font-bold text-slate-400">1 TASK</span>
            </div>
            <div className="space-y-4">
                {tasks.filter(t => t.priority === "Low").map(task => (
                    <div key={task.id}>
                        <TaskCard task={task} />
                    </div>
                ))}
            </div>
        </div>
      </div>
      
      {/* Productivity Stats (Conceptual) */}
      <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-8 border-brand-primary border-t-slate-100 dark:border-t-slate-800 flex items-center justify-center relative">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">75%</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest leading-none">Focus Rate</p>
          </div>
          <div className="flex-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Burnout Shield 🛡️</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                  You have 3 deadlines between May 18-22. I recommend starting the <span className="text-brand-primary dark:text-brand-teal font-bold underline underline-offset-4 cursor-pointer">OS Lab Assignment</span> tonight to reduce weekend pressure.
              </p>
          </div>
          <button className="px-6 py-4 bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary dark:text-brand-teal rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-primary/10 transition-all border border-brand-primary/10">
              AI Optimizer
          </button>
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
    return (
        <motion.div 
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-brand-navy p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
            <div className="flex items-start gap-4">
                <button className="mt-1 text-slate-300 hover:text-brand-primary transition-colors">
                    <Circle size={22} strokeWidth={3} />
                </button>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                            "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter",
                            task.type === "Assignment" ? "bg-brand-primary/10 text-brand-primary dark:text-brand-teal" :
                            task.type === "Exam" ? "bg-status-danger/10 text-status-danger" : "bg-status-success/10 text-status-success"
                        )}>
                            {task.type}
                        </span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors tracking-tight">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase">
                        <Clock size={12} />
                        <span>DUE {task.dueDate}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
