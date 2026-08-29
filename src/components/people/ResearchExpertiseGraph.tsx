import React, { useState } from "react";
import { 
  Microscope, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Users, 
  BookOpen, 
  Layers, 
  GraduationCap, 
  CheckCircle2, 
  Building2, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { 
  officialResearchAreas, 
  officialFacultyList, 
  ResearchAreaDetail, 
  FacultyMember 
} from "../../data/peopleData";
import { IIITKCrest } from "../common/IIITKLogo";

interface ResearchExpertiseGraphProps {
  onSelectFaculty: (faculty: FacultyMember) => void;
  onSendMessage: (faculty: FacultyMember) => void;
}

export default function ResearchExpertiseGraph({
  onSelectFaculty,
  onSendMessage
}: ResearchExpertiseGraphProps) {
  const [selectedAreaId, setSelectedAreaId] = useState<string>(officialResearchAreas[0].id);

  const activeArea = officialResearchAreas.find(a => a.id === selectedAreaId) || officialResearchAreas[0];
  const mentorFaculty = officialFacultyList.filter(f => activeArea.associatedFacultyIds?.includes(f.id));

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-100/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary dark:text-blue-400 uppercase tracking-wider">
          <Microscope size={16} />
          <span>Research Discovery & Cross-Disciplinary Labs</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          Explore Research Verticals at IIIT Kalyani
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans max-w-3xl">
          Discover active research groups, laboratory facilities, faculty investigators, and open student research projects in computer science, electronics, and applied sciences.
        </p>
      </div>

      {/* Main Grid: Left Domain Selectors + Right Interactive Detail Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Verticals List */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
            Research Domains ({officialResearchAreas.length})
          </span>

          <div className="space-y-2">
            {officialResearchAreas.map((area) => {
              const isSelected = area.id === selectedAreaId;
              return (
                <button
                  key={area.id}
                  onClick={() => setSelectedAreaId(area.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-brand-primary text-white border-brand-primary shadow-md"
                      : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"
                  }`}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold uppercase ${isSelected ? "text-blue-100" : "text-brand-primary dark:text-blue-400"}`}>
                        {area.domain}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold truncate leading-tight">
                      {area.title}
                    </h4>
                  </div>
                  <ChevronRight size={16} className={`shrink-0 ${isSelected ? "text-white" : "text-slate-400"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Research Lab & Opportunity Stage */}
        <div className="lg:col-span-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-sm">
          
          {/* Domain Header */}
          <div className="space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-primary/10 text-brand-primary dark:text-blue-400 uppercase tracking-wider">
                {activeArea.domain}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {mentorFaculty.length} Principal Investigators
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100">
              {activeArea.title}
            </h3>

            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {activeArea.description}
            </p>
          </div>

          {/* Subtopics & Methods */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Subtopics, Algorithms & Core Focus
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeArea.keySubtopics?.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Associated Labs & Facilities */}
          {activeArea.activeLabs && activeArea.activeLabs.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Associated Research Facilities & Computing Labs
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeArea.activeLabs.map((lab, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/50 flex items-center gap-3"
                  >
                    <Building2 size={18} className="text-brand-primary shrink-0" />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{lab}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Student Opportunities Callout */}
          {activeArea.openOpportunities && activeArea.openOpportunities.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                <Sparkles size={16} className="text-amber-600 dark:text-amber-400" />
                <span>Student Research Opportunities & Open Projects ({activeArea.openOpportunities.length})</span>
              </div>
              <div className="space-y-2">
                {activeArea.openOpportunities.map((opp, idx) => (
                  <div key={idx} className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-amber-200/50 dark:border-amber-800/40 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{opp.title}</span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">{opp.level}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{opp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mentor Faculty Cards */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Mentor Faculty & Lead Investigators
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mentorFaculty.map((faculty) => (
                <div
                  key={faculty.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-serif font-bold text-sm text-brand-primary dark:text-blue-400 shrink-0 shadow-xs">
                      {faculty.initials}
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                        {faculty.name}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {faculty.designation}
                      </p>
                      <p className="text-[11px] text-brand-primary dark:text-blue-400 truncate">
                        {faculty.highestDegree}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectFaculty(faculty)}
                      className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 transition-colors"
                    >
                      View Profile
                    </button>

                    {faculty.acceptsMessages && (
                      <button
                        onClick={() => onSendMessage(faculty)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-brand-primary hover:bg-blue-700 text-white transition-colors"
                        title="Send research query"
                      >
                        <MessageSquare size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
