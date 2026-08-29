import React, { useState, useMemo } from "react";
import { 
  Building2, 
  Search, 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  PhoneCall,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";
import { AdministrativeOfficer, officialAdministrationList } from "../../data/peopleData";
import { IIITKCrest } from "../common/IIITKLogo";

interface AdministrationDirectoryProps {
  onSendMessage: (officer: AdministrativeOfficer) => void;
  onOpenWhoCanHelp?: () => void;
}

export default function AdministrationDirectory({
  onSendMessage,
  onOpenWhoCanHelp
}: AdministrationDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { label: "All Administrative Offices", value: "All" },
    { label: "Directorate Secretariat", value: "Directorate" },
    { label: "Central Registry", value: "Registry" },
    { label: "Academics & Examination", value: "Academics & Examination" },
    { label: "Finance & Accounts", value: "Finance & Accounts" }
  ];

  const filteredOffices = useMemo(() => {
    return officialAdministrationList.filter((office) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = office.name.toLowerCase().includes(q);
        const matchesOffice = office.officeName.toLowerCase().includes(q);
        const matchesDesignation = office.designation.toLowerCase().includes(q);
        const matchesResponsibility = office.responsibility.toLowerCase().includes(q);
        const matchesFunctions = office.keyFunctions.some(f => f.toLowerCase().includes(q));
        const matchesLocation = office.officeLocation.toLowerCase().includes(q);

        if (!(matchesName || matchesOffice || matchesDesignation || matchesResponsibility || matchesFunctions || matchesLocation)) {
          return false;
        }
      }

      if (selectedCategory !== "All" && office.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-100/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
        <div className="space-y-1 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary dark:text-blue-400 uppercase tracking-wider">
            <Building2 size={15} />
            <span>Institute Executive Administration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            Offices & Administrative Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            Find the people, cells, and offices responsible for keeping the academic and operational infrastructure of IIIT Kalyani running smoothly.
          </p>
        </div>

        {onOpenWhoCanHelp && (
          <button
            onClick={onOpenWhoCanHelp}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs sm:text-sm font-semibold hover:bg-amber-500/25 transition-all shrink-0"
          >
            <HelpCircle size={16} className="text-amber-600 dark:text-amber-400" />
            <span>Not sure who to contact?</span>
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by office responsibility (e.g. transcript, exam, fees, hostel, placement, wifi)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>

        <div className="relative shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-3.5 text-xs font-semibold rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 cursor-pointer w-full sm:w-auto"
          >
            {categories.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Administration Offices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOffices.map((office) => (
          <div
            key={office.id}
            className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all p-6 space-y-6"
          >
            {/* Office Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                    {office.category}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 leading-tight">
                    {office.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-primary dark:text-blue-400">
                    {office.designation}
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary dark:text-blue-400 flex items-center justify-center font-serif font-bold text-lg shrink-0 border border-brand-primary/20 overflow-hidden shadow-inner">
                  {office.avatarUrl ? (
                    <img 
                      src={office.avatarUrl} 
                      alt={office.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                    />
                  ) : (
                    <span>{office.initials}</span>
                  )}
                </div>
              </div>

              {/* Core Responsibility Paragraph */}
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                {office.responsibility}
              </div>

              {/* Key Operations List */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Key Functions & Services:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {office.keyFunctions.map((fn, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <span>{fn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Office Metadata & Actions */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-slate-400 shrink-0" />
                  <span className="truncate">{office.officeLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-slate-400 shrink-0" />
                  <span className="truncate">{office.availabilityHours}</span>
                </div>
                {office.officePhone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-slate-400 shrink-0" />
                    <span className="font-mono text-[11px]">{office.officePhone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-slate-400 shrink-0" />
                  <a href={`mailto:${office.email}`} className="font-mono text-[11px] hover:text-brand-primary truncate">
                    {office.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href={`mailto:${office.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all"
                >
                  <Mail size={14} />
                  <span>Send Email</span>
                </a>

                {office.acceptsMessages && (
                  <button
                    onClick={() => onSendMessage(office)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-primary text-white hover:bg-blue-700 text-xs font-semibold shadow-sm transition-all"
                  >
                    <MessageSquare size={14} />
                    <span>Message Office</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
