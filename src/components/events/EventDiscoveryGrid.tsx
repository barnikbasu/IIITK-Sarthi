import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  SlidersHorizontal,
  X
} from "lucide-react";
import { allCampusEvents, EventDetail, eventCategoryFilters } from "../../data/eventsData";
import { cn } from "../../lib/utils";

interface EventDiscoveryGridProps {
  onSelectEvent: (event: EventDetail) => void;
}

export default function EventDiscoveryGrid({ onSelectEvent }: EventDiscoveryGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedMode, setSelectedMode] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "name" | "month">("featured");

  const filteredEvents = useMemo(() => {
    return allCampusEvents.filter(ev => {
      // Search
      const matchesSearch = 
        ev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.organizingBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.venue.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === "All" || ev.category === selectedCategory;

      // Status filter
      const matchesStatus = selectedStatus === "All" || ev.registrationStatus === selectedStatus;

      // Mode filter
      const matchesMode = selectedMode === "All" || ev.mode === selectedMode;

      return matchesSearch && matchesCategory && matchesStatus && matchesMode;
    }).sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedStatus, selectedMode, sortBy]);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-teal">
            Browse & Discover
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Institute Event Ecosystem
          </h2>
        </div>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Showing {filteredEvents.length} Verified Events
        </span>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
        {/* Search input and sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search events, competitions, workshops, fests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-teal transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-700 dark:text-slate-300 w-full sm:w-auto justify-between">
              <span className="text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-white dark:bg-slate-900">Featured & Flagship</option>
                <option value="name" className="bg-white dark:bg-slate-900">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Primary Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {eventCategoryFilters.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer",
                  isSelected
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                    : "bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Secondary filters row (Status & Mode) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1 mr-1">
            <SlidersHorizontal size={12} />
            <span>Filters:</span>
          </span>

          {/* Status buttons */}
          <div className="flex items-center gap-1">
            {["All", "Open", "Upcoming", "Closed"].map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer",
                  selectedStatus === status
                    ? "bg-brand-primary/10 text-brand-primary dark:text-brand-teal font-bold"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                )}
              >
                {status === "All" ? "All Status" : status}
              </button>
            ))}
          </div>

          <span className="text-slate-300 dark:text-slate-700">|</span>

          {/* Mode buttons */}
          <div className="flex items-center gap-1">
            {["All", "Offline", "Hybrid", "Online"].map(mode => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer",
                  selectedMode === mode
                    ? "bg-brand-primary/10 text-brand-primary dark:text-brand-teal font-bold"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                )}
              >
                {mode === "All" ? "All Modes" : mode}
              </button>
            ))}
          </div>

          {(selectedCategory !== "All" || selectedStatus !== "All" || selectedMode !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedStatus("All");
                setSelectedMode("All");
                setSearchQuery("");
              }}
              className="ml-auto text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Events Card Grid */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            No campus events match your active filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedStatus("All");
              setSelectedMode("All");
              setSearchQuery("");
            }}
            className="text-xs font-bold text-brand-primary dark:text-brand-teal underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((ev) => {
            const isStatusCode = ev.id === "statuscode";
            const isRenesa = ev.id === "renesa";

            return (
              <div
                key={ev.id}
                onClick={() => onSelectEvent(ev)}
                className={cn(
                  "rounded-3xl bg-white dark:bg-slate-800 border overflow-hidden shadow-sm flex flex-col justify-between transition-all cursor-pointer group hover:shadow-lg",
                  ev.featured 
                    ? "border-slate-300 dark:border-slate-700 hover:border-brand-primary/50 dark:hover:border-brand-teal/50" 
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                )}
              >
                {/* Card Top Banner / Media */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={ev.bannerImage}
                    alt={ev.name}
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                  {/* Overline Badge */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/10">
                      {ev.category}
                    </span>
                    <span className={cn(
                      "px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full backdrop-blur-md border",
                      ev.registrationStatus === "Open" 
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : ev.registrationStatus === "Upcoming"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                    )}>
                      {ev.registrationStatus === "Open" ? "REGISTRATION OPEN" : ev.registrationStatus}
                    </span>
                  </div>

                  {/* Bottom Image Details */}
                  <div className="absolute bottom-3 inset-x-3">
                    <span className="text-[10px] font-extrabold tracking-widest text-amber-300 uppercase block">
                      {ev.eventType}
                    </span>
                    <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight mt-0.5">
                      {ev.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-brand-primary dark:text-brand-teal line-clamp-1">
                      {ev.tagline}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {ev.shortDescription}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
                        <Calendar size={13} className="text-brand-primary dark:text-brand-teal" />
                        <span>{ev.fullDateString || `${ev.month} Edition`}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px]">
                        <MapPin size={12} />
                        <span>{ev.mode}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="text-[11px] truncate max-w-[170px]">
                        {ev.organizingBody}
                      </span>
                      {ev.registrationDeadline && (
                        <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                          {ev.registrationDeadline.includes("closes") ? ev.registrationDeadline : `Closes: ${ev.registrationDeadline}`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  {ev.officialWebsiteUrl ? (
                    <a
                      href={ev.officialWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold flex items-center gap-1"
                    >
                      <span>Website</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-slate-400 font-medium">IIIT Kalyani</span>
                  )}

                  <button
                    onClick={() => onSelectEvent(ev)}
                    className="font-bold text-brand-primary dark:text-brand-teal group-hover:translate-x-1 transition-transform flex items-center gap-1 cursor-pointer"
                  >
                    <span>{ev.registrationStatus === "Open" ? "Register / Details" : "Explore Event"}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
