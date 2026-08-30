import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  X, 
  GraduationCap, 
  Grid, 
  List, 
  Sparkles, 
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  BookOpen,
  Building2,
  HelpCircle
} from "lucide-react";
import { FacultyMember, approvedFaculty } from "../../data/peopleData";
import FacultyCard from "./FacultyCard";
import FacultyProfileModal from "./FacultyProfileModal";

interface FacultyDirectoryProps {
  onSendMessage: (faculty: FacultyMember) => void;
  onRequestAppointment?: (faculty: FacultyMember) => void;
  onOpenWhoCanHelp?: () => void;
  initialSearchQuery?: string;
  initialDepartment?: string;
  initialResearchArea?: string;
}

export default function FacultyDirectory({
  onSendMessage,
  onRequestAppointment,
  onOpenWhoCanHelp,
  initialSearchQuery = "",
  initialDepartment = "All",
  initialResearchArea = "All"
}: FacultyDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedDept, setSelectedDept] = useState(initialDepartment);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedResearchArea, setSelectedResearchArea] = useState(initialResearchArea);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [activeProfileFaculty, setActiveProfileFaculty] = useState<FacultyMember | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Departments List
  const departments = [
    { label: "All Departments", value: "All" },
    { label: "Computer Science & Eng. (CSE)", value: "CSE" },
    { label: "Electronics & Comm. (ECE)", value: "ECE" },
    { label: "Mathematics & Basic Sciences", value: "Mathematics" },
    { label: "Physics & Space Sciences", value: "Physics" },
  ];

  // Designations List
  const designations = [
    { label: "All Designations", value: "All" },
    { label: "Assistant Professor", value: "Assistant Professor" },
  ];

  // Research Domains Quick Tags
  const researchDomains = [
    { label: "All Research Domains", value: "All" },
    { label: "Medical Image Analysis & Vision", value: "Medical" },
    { label: "Computer Vision", value: "Vision" },
    { label: "Cybersecurity & Cryptography", value: "Security" },
    { label: "AI & Deep Learning", value: "Deep Learning" },
    { label: "Natural Language Processing (NLP)", value: "NLP" },
    { label: "Wireless & 5G Communications", value: "Wireless" },
    { label: "VLSI & Hardware Security", value: "VLSI" },
    { label: "Atmospheric & Space Science", value: "Atmospheric" },
    { label: "Control Theory & Dynamical Systems", value: "Control" },
    { label: "Recommender Systems & Data Science", value: "Recommender" },
  ];

  // Filter Logic
  const filteredFaculty = useMemo(() => {
    return approvedFaculty.filter((faculty) => {
      // 1. Search Query Match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = faculty.name.toLowerCase().includes(q);
        const matchesSalutation = faculty.salutation.toLowerCase().includes(q);
        const matchesDept = faculty.department.toLowerCase().includes(q) || faculty.departmentShort.toLowerCase().includes(q);
        const matchesDesignation = faculty.designation.toLowerCase().includes(q);
        const matchesBio = faculty.biography.toLowerCase().includes(q);
        const matchesInterests = faculty.researchInterests.some(r => r.toLowerCase().includes(q));
        const matchesTags = faculty.expertiseTags.some(t => t.toLowerCase().includes(q));
        const matchesDegree = faculty.highestDegree.toLowerCase().includes(q) || faculty.almaMater.toLowerCase().includes(q);

        if (!(matchesName || matchesSalutation || matchesDept || matchesDesignation || matchesBio || matchesInterests || matchesTags || matchesDegree)) {
          return false;
        }
      }

      // 2. Department Filter
      if (selectedDept !== "All") {
        if (faculty.departmentShort !== selectedDept) {
          return false;
        }
      }

      // 3. Role / Designation Filter
      if (selectedRole !== "All") {
        if (faculty.designation !== selectedRole) {
          return false;
        }
      }

      // 4. Research Area Filter
      if (selectedResearchArea !== "All") {
        const areaLower = selectedResearchArea.toLowerCase();
        const hasInterest = faculty.researchInterests.some(r => r.toLowerCase().includes(areaLower));
        const hasTag = faculty.expertiseTags.some(t => t.toLowerCase().includes(areaLower));
        if (!hasInterest && !hasTag) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDept, selectedRole, selectedResearchArea]);

  const handleOpenProfile = (faculty: FacultyMember) => {
    setActiveProfileFaculty(faculty);
    setIsProfileModalOpen(true);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDept("All");
    setSelectedRole("All");
    setSelectedResearchArea("All");
  };

  const hasActiveFilters = searchQuery !== "" || selectedDept !== "All" || selectedRole !== "All" || selectedResearchArea !== "All";

  return (
    <div className="space-y-6">
      {/* Search Bar & Quick Category Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
            <input
              type="text"
              placeholder="Search by faculty name, research area (e.g. computer vision, cryptography, 5G, NLP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold"
          >
            <SlidersHorizontal size={16} />
            <span>Filters {hasActiveFilters && "• Active"}</span>
          </button>
        </div>

        {/* Desktop Filter Pills Row */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {/* Department Select */}
          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 cursor-pointer shadow-2xs"
            >
              {departments.map(d => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Designation Select */}
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 cursor-pointer shadow-2xs"
            >
              {designations.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Research Domain Select */}
          <div className="relative">
            <select
              value={selectedResearchArea}
              onChange={(e) => setSelectedResearchArea(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 cursor-pointer shadow-2xs"
            >
              {researchDomains.map(rd => (
                <option key={rd.value} value={rd.value}>{rd.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <RotateCcw size={12} />
              <span>Reset Filters</span>
            </button>
          )}

          <div className="ml-auto text-xs font-medium text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-900 dark:text-slate-100">{filteredFaculty.length}</strong> of {approvedFaculty.length} verified faculty
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Quick Topics:
          </span>
          {[
            "Computer Vision",
            "Medical Image Analysis",
            "Cryptography",
            "5G / Wireless",
            "NLP",
            "Deep Learning",
            "VLSI",
            "Atmospheric Science",
            "Control Theory"
          ].map((topic) => (
            <button
              key={topic}
              onClick={() => {
                setSearchQuery(topic);
                setSelectedResearchArea("All");
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-brand-primary/10 hover:text-brand-primary dark:hover:text-blue-400 text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap transition-colors border border-slate-200/60 dark:border-slate-700/60"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Faculty Cards Grid */}
      {filteredFaculty.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((faculty) => (
            <FacultyCard
              key={faculty.id}
              faculty={faculty}
              onViewProfile={handleOpenProfile}
              onSendMessage={onSendMessage}
            />
          ))}
        </div>
      ) : (
        /* Empty State with Academic Context */
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 max-w-xl mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <GraduationCap size={28} />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100">
              No faculty member matched your criteria
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Try searching by generic research terms like <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">computer vision</code>, <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">security</code>, or check your department filters.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Reset All Filters
            </button>

            {onOpenWhoCanHelp && (
              <button
                onClick={onOpenWhoCanHelp}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Use "Who Can Help?" Navigator
              </button>
            )}
          </div>
        </div>
      )}

      {/* Faculty Profile Modal */}
      <FacultyProfileModal
        faculty={activeProfileFaculty}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSendMessage={(faculty) => {
          setIsProfileModalOpen(false);
          onSendMessage(faculty);
        }}
        onRequestAppointment={onRequestAppointment ? (faculty) => {
          setIsProfileModalOpen(false);
          onRequestAppointment(faculty);
        } : undefined}
      />
    </div>
  );
}
