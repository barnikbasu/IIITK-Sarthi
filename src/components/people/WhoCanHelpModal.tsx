import React, { useState } from "react";
import { 
  X, 
  HelpCircle, 
  Search, 
  ArrowRight, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Building2,
  Phone
} from "lucide-react";
import { 
  helpQueryMappings, 
  HelpQueryMapping,
  officialAdministrationList,
  approvedFaculty,
  officialInstitutionalBodies
} from "../../data/peopleData";
import { IIITKCrest } from "../common/IIITKLogo";

interface WhoCanHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (targetEmail: string, targetName: string) => void;
}

export default function WhoCanHelpModal({
  isOpen,
  onClose,
  onSelectAction
}: WhoCanHelpModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssueId, setSelectedIssueId] = useState<string>(helpQueryMappings[0].id);

  if (!isOpen) return null;

  const filteredMappings = helpQueryMappings.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.directEmail.toLowerCase().includes(q)
    );
  });

  const activeIssue = helpQueryMappings.find(m => m.id === selectedIssueId) || filteredMappings[0] || helpQueryMappings[0];

  const matchedOfficer = activeIssue.recommendedOfficerId 
    ? officialAdministrationList.find(a => a.id === activeIssue.recommendedOfficerId) 
    : undefined;
  
  const matchedFaculty = activeIssue.recommendedFacultyId 
    ? approvedFaculty.find(f => f.id === activeIssue.recommendedFacultyId) 
    : undefined;

  const matchedBody = activeIssue.recommendedBodyId 
    ? officialInstitutionalBodies.find(b => b.id === activeIssue.recommendedBodyId) 
    : undefined;

  const contactName = matchedOfficer?.name || matchedFaculty?.name || matchedBody?.name || "Designated Academic Officer";
  const contactRole = matchedOfficer?.designation || matchedFaculty?.designation || matchedBody?.shortName || activeIssue.category;
  const contactOffice = matchedOfficer?.officeName || (matchedFaculty ? `${matchedFaculty.department} Department` : "IIIT Kalyani Administrative Office");
  const contactLocation = matchedOfficer?.officeLocation || (matchedFaculty ? matchedFaculty.officeLocation : "IIIT Kalyani Campus");
  const contactEmail = activeIssue.directEmail || matchedOfficer?.email || matchedFaculty?.email || "helpdesk@iiitkalyani.ac.in";
  const contactAvatar = matchedOfficer?.avatarUrl || matchedFaculty?.avatarUrl || (contactName.includes("Suman Chakraborty") ? "https://iiitkalyani.ac.in/api/serve/2026/08/11/suman.png" : undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-amber-500/10 dark:bg-amber-400/10 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-900 dark:text-amber-300 flex items-center justify-center font-bold">
              <HelpCircle size={22} />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100">
                "Who Can Help Me?" Decision Navigator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Official institutional responsibility & resolution guide for IIIT Kalyani students
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="What do you need help with? (e.g. transcript, wifi, hostel, grade correction, scholarship, ragging)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>
        </div>

        {/* Modal Main Content: List of Topics + Right Actionable Card */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          
          {/* Left Column: Topics List */}
          <div className="md:col-span-5 p-4 space-y-2 overflow-y-auto max-h-[500px]">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
              Common Student Queries ({filteredMappings.length})
            </span>

            {filteredMappings.map((item) => {
              const isSelected = item.id === activeIssue?.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIssueId(item.id)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-amber-500 text-white shadow-sm font-semibold"
                      : "bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className={`block text-xs truncate ${isSelected ? "text-white" : "font-bold text-slate-900 dark:text-slate-100"}`}>
                      {item.title}
                    </span>
                    <span className={`block text-[11px] truncate ${isSelected ? "text-amber-100" : "text-slate-500 dark:text-slate-400"}`}>
                      {item.category} • {item.urgencyLevel}
                    </span>
                  </div>
                  <ChevronRight size={15} className={`shrink-0 ${isSelected ? "text-white" : "text-slate-400"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Resolution Details & Contact Cards */}
          {activeIssue && (
            <div className="md:col-span-7 p-6 space-y-6 overflow-y-auto max-h-[500px]">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {activeIssue.category}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                    activeIssue.urgencyLevel === "Immediate SOS"
                      ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                      : activeIssue.urgencyLevel === "Urgent"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}>
                    {activeIssue.urgencyLevel}
                  </span>
                </div>
                <h4 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">
                  {activeIssue.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeIssue.description}
                </p>
              </div>

              {/* Primary Designated Officer Card */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  Primary Designated Contact
                </span>

                <div className="flex items-start gap-3">
                  {contactAvatar && (
                    <img
                      src={contactAvatar}
                      alt={contactName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <h5 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {contactName}
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {contactRole} • {contactOffice}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-slate-400" />
                    <span>{contactLocation}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Mail size={13} className="text-slate-400" />
                    <a href={`mailto:${contactEmail}`} className="text-brand-primary hover:underline">
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectAction(contactEmail, contactName);
                      onClose();
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-brand-primary text-white text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm"
                  >
                    <MessageSquare size={13} />
                    <span>Send Authenticated Message</span>
                  </button>

                  <a
                    href={`mailto:${contactEmail}`}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                  >
                    <Mail size={13} />
                  </a>
                </div>
              </div>

              {/* Action Guidance / Process */}
              <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-950 dark:text-blue-200 space-y-1">
                <strong className="block font-semibold">Action & Resolution Guidance:</strong>
                <p>{activeIssue.actionGuidance}</p>
              </div>

              {/* Escalation Route */}
              {activeIssue.escalationPath && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Escalation Hierarchy (if unresolved):
                  </span>
                  <p>{activeIssue.escalationPath}</p>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>IIIT Kalyani Student Support Knowledgebase</span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
}
