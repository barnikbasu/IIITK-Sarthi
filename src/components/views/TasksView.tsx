import { CheckCircle2, Circle, Clock, AlertTriangle, Plus, Calendar, X, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { tasks as initialTasks } from "../../data/mockData";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { Task } from "../../types";

export default function TasksView() {
  const [taskList, setTaskList] = useState<Task[]>(initialTasks);
  const [completedList, setCompletedList] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationTip, setOptimizationTip] = useState<string | null>(null);

  // Form states for new task
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<"Assignment" | "Exam" | "Project">("Assignment");
  const [newPriority, setNewPriority] = useState<"High" | "Moderate" | "Low">("Moderate");
  const [newDueDate, setNewDueDate] = useState("May 20, 2026");

  const handleToggleComplete = (id: string) => {
    if (completedList.includes(id)) {
      setCompletedList(prev => prev.filter(item => item !== id));
    } else {
      setCompletedList(prev => [...prev, id]);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      priority: newPriority,
      dueDate: newDueDate,
    };

    setTaskList(prev => [newTask, ...prev]);
    setNewTitle("");
    setIsModalOpen(false);
  };

  const triggerOptimizer = () => {
    setIsOptimizing(true);
    setOptimizationTip(null);
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizationTip(
        "Sarthi AI has re-scheduled your weekly goals: Completing 'VLSI Lab Report' first frees up 4 hours. We recommend postponing secondary readings to Friday. Streak maintained! 🔥"
      );
    }, 1800);
  };

  // Filters for lists
  const urgentTasks = taskList.filter(t => t.priority === "High" && !completedList.includes(t.id));
  const upcomingTasks = taskList.filter(t => t.priority === "Moderate" && !completedList.includes(t.id));
  const backlogTasks = taskList.filter(t => t.priority === "Low" && !completedList.includes(t.id));
  const doneTasks = taskList.filter(t => completedList.includes(t.id));

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Academic Productivity</h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-tight">Keep track of your assignments, exams, and deadlines.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-4 bg-brand-primary dark:bg-brand-primary rounded-2xl text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-brand-primary/20 hover:opacity-90 transition-all active:scale-95 group shrink-0"
        >
            <Plus size={20} />
            New Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Urgent Column */}
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <AlertTriangle size={18} className="text-rose-500 animate-pulse" />
                    Urgent Actions
                </h3>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">{urgentTasks.length} {urgentTasks.length === 1 ? "Task" : "Tasks"}</span>
            </div>
            
            <div className="space-y-4">
                {urgentTasks.length === 0 ? (
                  <div className="p-8 border-2 border-dashed border-slate-100 dark:border-slate-800/80 rounded-3xl text-center text-xs font-bold text-slate-400 dark:text-slate-500">
                    No urgent actions!
                  </div>
                ) : (
                  urgentTasks.map(task => (
                    <TaskCard key={task.id} task={task} isCompleted={false} onToggle={() => handleToggleComplete(task.id)} />
                  ))
                )}
            </div>
        </div>

        {/* Moderate Column */}
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Clock size={18} className="text-amber-500" />
                    Upcoming
                </h3>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">{upcomingTasks.length} {upcomingTasks.length === 1 ? "Task" : "Tasks"}</span>
            </div>
            <div className="space-y-4">
                {upcomingTasks.length === 0 ? (
                  <div className="p-8 border-2 border-dashed border-slate-100 dark:border-slate-800/80 rounded-3xl text-center text-xs font-bold text-slate-400 dark:text-slate-500">
                    All upcoming items clear!
                  </div>
                ) : (
                  upcomingTasks.map(task => (
                    <TaskCard key={task.id} task={task} isCompleted={false} onToggle={() => handleToggleComplete(task.id)} />
                  ))
                )}
            </div>
        </div>

        {/* All/Backlog Column */}
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Calendar size={18} className="text-emerald-500" />
                    Backlog
                </h3>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">{backlogTasks.length} {backlogTasks.length === 1 ? "Task" : "Tasks"}</span>
            </div>
            <div className="space-y-4">
                {backlogTasks.length === 0 ? (
                  <div className="p-8 border-2 border-dashed border-slate-100 dark:border-slate-800/80 rounded-3xl text-center text-xs font-bold text-slate-400 dark:text-slate-500">
                    No items in backlog.
                  </div>
                ) : (
                  backlogTasks.map(task => (
                    <TaskCard key={task.id} task={task} isCompleted={false} onToggle={() => handleToggleComplete(task.id)} />
                  ))
                )}
            </div>
        </div>
      </div>

      {/* Completed Tasks Accordion / Drawer */}
      {doneTasks.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="font-black text-slate-400 uppercase tracking-widest text-xs">Completed ({doneTasks.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doneTasks.map(task => (
              <TaskCard key={task.id} task={task} isCompleted={true} onToggle={() => handleToggleComplete(task.id)} />
            ))}
          </div>
        </div>
      )}
      
      {/* Productivity Stats (Dynamic AI Optimizer) */}
      <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 flex flex-col lg:flex-row items-center gap-8 shadow-sm">
          <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-8 border-brand-primary border-t-slate-100 dark:border-t-slate-800 flex items-center justify-center relative">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">75%</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest leading-none">Focus Rate</p>
          </div>
          <div className="flex-1 space-y-3">
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Burnout Shield 🛡️</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm">
                  You have several deadlines. Let our AI optimizer arrange your study priority, matching classes and tasks for maximum recovery times.
              </p>
              <AnimatePresence>
                {optimizationTip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/15 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <Sparkles size={16} className="text-brand-primary shrink-0 mt-0.5" />
                    <span>{optimizationTip}</span>
                  </motion.div>
                )}
              </AnimatePresence>
          </div>
          <button 
            onClick={triggerOptimizer}
            disabled={isOptimizing}
            className="px-6 py-4 bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary dark:text-brand-teal rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-primary/10 transition-all border border-brand-primary/10 shrink-0 flex items-center gap-2"
          >
              {isOptimizing ? "Optimizing..." : "AI Optimizer"}
          </button>
      </div>

      {/* CREATE NEW TASK MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest">PRODUCTIVITY SUITE</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">Create Academic Task</h3>
              </div>

              <form onSubmit={handleAddTask} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Task Description / Title</label>
                  <input 
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. VLSI Lab Report, OS Assignment"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Task Category</label>
                    <select
                      value={newType}
                      onChange={(e: any) => setNewType(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                    >
                      <option value="Assignment">Assignment</option>
                      <option value="Exam">Exam</option>
                      <option value="Project">Project</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Study Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e: any) => setNewPriority(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                    >
                      <option value="High">Urgent (High)</option>
                      <option value="Moderate">Moderate (Medium)</option>
                      <option value="Low">Backlog (Low)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Due Date</label>
                  <input 
                    type="text"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    placeholder="e.g. May 20, 2026"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:opacity-95 transition-all"
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface TaskCardProps {
  task: Task;
  isCompleted: boolean;
  onToggle: () => void;
}

function TaskCard({ task, isCompleted, onToggle }: TaskCardProps) {
  return (
      <motion.div 
          whileHover={{ y: -2 }}
          layout
          className={cn(
            "bg-white dark:bg-brand-navy p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group cursor-pointer",
            isCompleted && "opacity-60 bg-slate-50/50 dark:bg-slate-900/40"
          )}
      >
          <div className="flex items-start gap-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className={cn(
                  "mt-1 text-slate-300 hover:text-brand-primary transition-colors",
                  isCompleted ? "text-status-success" : ""
                )}
              >
                  {isCompleted ? <CheckCircle2 size={22} className="text-status-success animate-in zoom-in" strokeWidth={3} /> : <Circle size={22} strokeWidth={3} />}
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
                  <h4 className={cn(
                    "font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors tracking-tight",
                    isCompleted && "line-through text-slate-400 dark:text-slate-500"
                  )}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase">
                      <Clock size={12} />
                      <span>{isCompleted ? "COMPLETED" : `DUE ${task.dueDate}`}</span>
                  </div>
              </div>
          </div>
      </motion.div>
  );
}
