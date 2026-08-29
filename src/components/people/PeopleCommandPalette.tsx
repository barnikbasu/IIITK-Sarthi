import React, { useState, useEffect } from "react";
import { 
  Search, 
  X, 
  GraduationCap, 
  Building2, 
  Landmark, 
  Microscope, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { 
  officialFacultyList, 
  officialAdministrationList, 
  officialInstitutionalBodies, 
  officialResearchAreas,
  helpQueryMappings,
  FacultyMember,
  AdministrativeOfficer
} from "../../data/peopleData";
import { IIITKCrest } from "../common/IIITKLogo";

interface PeopleCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFaculty: (faculty: FacultyMember) => void;
  onSelectAdministration: (officer: AdministrativeOfficer) => void;
  onSelectTab: (tab: "faculty" | "administration" | "governance" | "research" | "messages") => void;
  onOpenWhoCanHelp: () => void;
}

export default function PeopleCommandPalette({
  isOpen,
  onClose,
  onSelectFaculty,
  onSelectAdministration,
  onSelectTab,
  onOpenWhoCanHelp
}: PeopleCommandPaletteProps) {
  const [query, setQuery] = useState("");

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Results
  const matchedFaculty = officialFacultyList.filter(f => 
    !q || f.name.toLowerCase().includes(q) || f.department.toLowerCase().includes(q) || f.researchInterests.some(r => r.toLowerCase().includes(q))
  ).slice(0, 4);

  const matchedAdmin = officialAdministrationList.filter(a => 
    !q || a.name.toLowerCase().includes(q) || a.officeName.toLowerCase().includes(q) || a.responsibility.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchedGovernance = officialInstitutionalBodies.filter(g => 
    !q || g.name.toLowerCase().includes(q) || g.shortName.toLowerCase().includes(q)
  ).slice(0, 2);

  const matchedResearch = officialResearchAreas.filter(r => 
    !q || r.title.toLowerCase().includes(q) || r.domain.toLowerCase().includes(q) || r.keySubtopics.some(s => s.toLowerCase().includes(q))
  ).slice(0, 2);

  const matchedHelp = helpQueryMappings.filter(h => 
    !q || h.title.toLowerCase().includes(q) || h.category.toLowerCase().includes(q) || h.description.toLowerCase().includes(q)
  ).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <Search size={20} className="text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search across all faculty, administration, research labs, or student queries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-400">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Quick Actions / Help Navigator */}
          {matchedHelp.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5 px-2">
                <HelpCircle size={13} />
                <span>Student Support & Resolution</span>
              </span>
              <div className="space-y-1.5">
                {matchedHelp.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onOpenWhoCanHelp();
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-100/60 dark:hover:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{item.title}</span>
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Direct Contact: {item.directEmail}</span>
                    </div>
                    <ArrowRight size={14} className="text-amber-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Faculty Results */}
          {matchedFaculty.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 px-2">
                <GraduationCap size={13} />
                <span>Faculty Members ({matchedFaculty.length})</span>
              </span>
              <div className="space-y-1.5">
                {matchedFaculty.map((faculty) => (
                  <button
                    key={faculty.id}
                    onClick={() => {
                      onSelectFaculty(faculty);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-primary/10 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold text-xs text-brand-primary">
                        {faculty.initials}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-primary">
                          {faculty.name}
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {faculty.designation} • {faculty.departmentShort}
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-brand-primary" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Administration Results */}
          {matchedAdmin.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 px-2">
                <Building2 size={13} />
                <span>Administrative Offices</span>
              </span>
              <div className="space-y-1.5">
                {matchedAdmin.map((office) => (
                  <button
                    key={office.id}
                    onClick={() => {
                      onSelectAdministration(office);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-primary/10 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-primary">
                        {office.name}
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {office.designation} • {office.officeLocation}
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-brand-primary" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Research Results */}
          {matchedResearch.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 px-2">
                <Microscope size={13} />
                <span>Research Groups & Verticals</span>
              </span>
              <div className="space-y-1.5">
                {matchedResearch.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => {
                      onSelectTab("research");
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-primary/10 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-primary">
                        {area.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {area.domain} • {area.activeLabs?.join(", ")}
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-brand-primary" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>IIIT Kalyani Global Institutional Registry</span>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border text-[10px] font-mono">ESC</kbd>
            <span>to close</span>
          </div>
        </div>

      </div>
    </div>
  );
}
