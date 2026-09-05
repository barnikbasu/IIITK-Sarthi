import React, { useState } from "react";
import { 
  Bell, 
  AlertTriangle, 
  Check, 
  CheckCheck, 
  Clock, 
  ChevronRight, 
  ExternalLink, 
  ShieldAlert, 
  BookOpen, 
  Building2, 
  Briefcase, 
  Sparkles, 
  X,
  Radio,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { AdminBroadcastNotice } from "../../types";
import { adminBroadcasts as initialBroadcasts } from "../../data/mockData";

interface NotificationDropdownProps {
  setActiveTab: (tab: string) => void;
}

export default function NotificationDropdown({ setActiveTab }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [broadcasts, setBroadcasts] = useState<AdminBroadcastNotice[]>(initialBroadcasts);
  const [filter, setFilter] = useState<"All" | "Urgent" | "Academic" | "Hostel">("All");
  const [selectedNotice, setSelectedNotice] = useState<AdminBroadcastNotice | null>(null);

  // Unread count
  const unreadCount = broadcasts.filter(b => !b.read).length;

  const handleMarkAsRead = (id: string) => {
    setBroadcasts(prev => prev.map(b => b.id === id ? { ...b, read: true } : b));
  };

  const handleMarkAllAsRead = () => {
    setBroadcasts(prev => prev.map(b => ({ ...b, read: true })));
  };

  const handleNoticeClick = (notice: AdminBroadcastNotice) => {
    handleMarkAsRead(notice.id);
    setSelectedNotice(notice);
  };

  const handleActionClick = (notice: AdminBroadcastNotice) => {
    handleMarkAsRead(notice.id);
    if (notice.actionTab) {
      setActiveTab(notice.actionTab);
      setIsOpen(false);
      setSelectedNotice(null);
    }
  };

  const filteredBroadcasts = broadcasts.filter(b => {
    if (filter === "Urgent") return b.urgency === "Critical" || b.urgency === "Urgent";
    if (filter === "Academic") return b.category === "Academic";
    if (filter === "Hostel") return b.category === "Hostel" || b.category === "Security";
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Security":
        return <ShieldAlert size={16} className="text-rose-500" />;
      case "Academic":
        return <BookOpen size={16} className="text-brand-primary dark:text-brand-teal" />;
      case "Hostel":
        return <Building2 size={16} className="text-amber-500" />;
      case "Placement":
        return <Briefcase size={16} className="text-indigo-500" />;
      default:
        return <Radio size={16} className="text-brand-primary" />;
    }
  };

  return (
    <div className="relative">
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-3 rounded-full transition-all relative group active:scale-95",
          isOpen ? "bg-slate-100 dark:bg-slate-800 text-brand-primary dark:text-brand-teal" : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
        )}
        title="Admin Broadcast Notifications"
        aria-label="Open Notifications"
      >
        <Bell size={20} className={cn("transition-transform", unreadCount > 0 ? "group-hover:rotate-12" : "")} />
        
        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-2 right-1.5 min-w-[18px] h-[18px] bg-rose-600 text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 border-2 border-white dark:border-slate-900 shadow-md animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing */}
            <div 
              className="fixed inset-0 z-40 bg-transparent" 
              onClick={() => setIsOpen(false)} 
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-[360px] sm:w-[420px] bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-[#262626] rounded-[2rem] shadow-2xl z-50 overflow-hidden text-left"
            >
              {/* Header */}
              <div className="p-5 pb-3 border-b border-slate-100 dark:border-[#1A1A1A] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                      Admin Broadcasts
                    </h4>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-[10px] rounded-full uppercase tracking-wider">
                        {unreadCount} New
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    Official Institutional Dispatch
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs font-bold text-brand-primary dark:text-brand-teal hover:underline flex items-center gap-1"
                  >
                    <CheckCheck size={14} />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 px-5 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800/60 overflow-x-auto scrollbar-hide">
                {(["All", "Urgent", "Academic", "Hostel"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={cn(
                      "px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0",
                      filter === tab
                        ? "bg-brand-primary text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Broadcast List */}
              <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 scrollbar-hide">
                {filteredBroadcasts.length === 0 ? (
                  <div className="p-8 text-center space-y-2">
                    <Check className="mx-auto text-emerald-500" size={24} />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">All caught up!</p>
                    <p className="text-[10px] text-slate-400">No unread notices in this category.</p>
                  </div>
                ) : (
                  filteredBroadcasts.map((notice) => (
                    <div
                      key={notice.id}
                      onClick={() => handleNoticeClick(notice)}
                      className={cn(
                        "p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all flex items-start gap-3.5 relative",
                        !notice.read ? "bg-brand-primary/5 dark:bg-brand-teal/5" : ""
                      )}
                    >
                      {/* Unread indicator dot */}
                      {!notice.read && (
                        <span className="absolute left-2 top-5 w-2 h-2 rounded-full bg-brand-primary dark:bg-brand-teal ring-2 ring-white dark:ring-slate-900" />
                      )}

                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                        {getCategoryIcon(notice.category)}
                      </div>

                      <div className="space-y-1 flex-1 overflow-hidden">
                        <div className="flex items-center justify-between gap-2">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider shrink-0",
                            notice.urgency === "Critical" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black" :
                            notice.urgency === "Urgent" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                            "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                          )}>
                            {notice.urgency}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium shrink-0">
                            {notice.timestamp}
                          </span>
                        </div>

                        <h5 className={cn(
                          "text-xs leading-snug line-clamp-2",
                          !notice.read ? "font-bold text-slate-900 dark:text-white" : "font-semibold text-slate-700 dark:text-slate-300"
                        )}>
                          {notice.title}
                        </h5>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {notice.summary}
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[9px] font-bold text-slate-400 truncate max-w-[180px]">
                            {notice.department}
                          </span>

                          {notice.actionLabel && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActionClick(notice);
                              }}
                              className="text-[10px] font-black text-brand-primary dark:text-brand-teal hover:underline flex items-center gap-1"
                            >
                              <span>{notice.actionLabel}</span>
                              <ChevronRight size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Official IIITK ERP Channel
                </span>
                <button
                  onClick={() => {
                    setActiveTab("resources");
                    setIsOpen(false);
                  }}
                  className="text-xs font-bold text-brand-primary dark:text-brand-teal hover:underline"
                >
                  View All Circulars →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full Notice Reading Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-[#262626] rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedNotice(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-50 dark:hover:bg-[#1A1A1A] transition-all"
              >
                <X size={18} />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider",
                    selectedNotice.urgency === "Critical" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" :
                    selectedNotice.urgency === "Urgent" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                    "bg-brand-primary/10 text-brand-primary dark:text-brand-teal"
                  )}>
                    {selectedNotice.urgency} Broadcast
                  </span>
                  <span className="text-xs text-slate-400 font-bold">• {selectedNotice.timestamp}</span>
                </div>

                <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {selectedNotice.title}
                </h3>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                  <p className="font-bold text-slate-700 dark:text-slate-300">
                    Issued By: <span className="text-brand-primary dark:text-brand-teal">{selectedNotice.department}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">Circular Ref: IIITK/ADMIN/2026/SEC-09</p>
                </div>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  <p>{selectedNotice.summary}</p>
                  <p>All students and campus faculty members are requested to take necessary note and adhere to the scheduled timelines.</p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedNotice(null)}
                    className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs hover:bg-slate-200"
                  >
                    Dismiss
                  </button>

                  {selectedNotice.actionLabel && (
                    <button
                      onClick={() => handleActionClick(selectedNotice)}
                      className="px-6 py-2.5 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md"
                    >
                      {selectedNotice.actionLabel}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
