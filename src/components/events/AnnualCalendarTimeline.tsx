import React, { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  ChevronRight, 
  Sparkles, 
  Cpu, 
  Palette, 
  Trophy, 
  BookOpen, 
  Building2, 
  Users, 
  Clock, 
  ArrowRight,
  Filter
} from "lucide-react";
import { annualEventCalendar, AnnualCalendarMonth, EventDetail, allCampusEvents } from "../../data/eventsData";
import { cn } from "../../lib/utils";

interface AnnualCalendarTimelineProps {
  onSelectEvent: (event: EventDetail) => void;
}

export default function AnnualCalendarTimeline({ onSelectEvent }: AnnualCalendarTimelineProps) {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(0);
  const activeMonthData = annualEventCalendar[selectedMonthIndex];

  const handleEventClick = (eventId: string, title: string) => {
    // Find matching event from allCampusEvents or generate a detail view
    const found = allCampusEvents.find(e => 
      e.id === eventId || 
      e.name.toLowerCase().includes(title.toLowerCase().split(" ")[0]) ||
      title.toLowerCase().includes(e.name.toLowerCase())
    );

    if (found) {
      onSelectEvent(found);
    } else {
      // Fallback
      onSelectEvent(allCampusEvents[0]);
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Technology":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "Culture":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "Sports":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "Academic":
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
      case "Innovation":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "Institutional":
        return "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20";
      default:
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-teal flex items-center gap-1.5">
            <CalendarIcon size={14} />
            <span>Academic Cycle</span>
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Annual Event Calendar
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
          Continuous rhythm of fests, hackathons, sports championships, and institutional celebrations throughout the year.
        </p>
      </div>

      {/* Month Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {annualEventCalendar.map((item, idx) => {
          const isSelected = selectedMonthIndex === idx;
          const isHighlight = item.month === "FEB" || item.month === "OCT" || item.month === "NOV";
          return (
            <button
              key={idx}
              onClick={() => setSelectedMonthIndex(idx)}
              className={cn(
                "px-4 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[76px] transition-all border cursor-pointer shrink-0",
                isSelected
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md font-bold"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              )}
            >
              <span className="text-sm font-black tracking-wider">{item.month}</span>
              <span className={cn(
                "text-[10px] mt-0.5 font-medium",
                isSelected 
                  ? "text-slate-300 dark:text-slate-600"
                  : isHighlight
                  ? "text-amber-500 font-bold"
                  : "text-slate-400"
              )}>
                {item.events.length} Event{item.events.length > 1 ? "s" : ""}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Month Content */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-brand-teal">
              Month of {activeMonthData.month}
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {activeMonthData.seasonTheme}
            </h3>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
            Focus: {activeMonthData.highlightCategory}
          </span>
        </div>

        {/* Month Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeMonthData.events.map((ev, idx) => (
            <div
              key={idx}
              onClick={() => handleEventClick(ev.id, ev.title)}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between space-y-4 hover:border-brand-primary/40 dark:hover:border-brand-teal/40 transition-all cursor-pointer group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border",
                    getCategoryBadgeColor(ev.category)
                  )}>
                    {ev.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock size={12} />
                    <span>{ev.dateDescription}</span>
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                  {ev.title}
                </h4>

                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-brand-primary dark:text-brand-teal" />
                    <span>{ev.venue}</span>
                  </span>
                  <span>•</span>
                  <span>{ev.organizer}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 dark:text-slate-400">
                  {ev.type}
                </span>
                <span className="font-bold text-brand-primary dark:text-brand-teal flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Event</span>
                  <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
