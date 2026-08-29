import React from "react";
import { 
  Mail, 
  Globe, 
  MessageSquare, 
  MapPin, 
  ShieldCheck, 
  ExternalLink, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { FacultyMember } from "../../data/peopleData";
import { IIITKCrest } from "../common/IIITKLogo";

interface FacultyCardProps {
  key?: React.Key;
  faculty: FacultyMember;
  onViewProfile: (faculty: FacultyMember) => void;
  onSendMessage: (faculty: FacultyMember) => void;
}

export default function FacultyCard({
  faculty,
  onViewProfile,
  onSendMessage
}: FacultyCardProps) {
  // Generate distinct academic color based on department short
  const getDeptBadgeStyle = (dept: string) => {
    switch (dept) {
      case "CSE":
        return "bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/60";
      case "ECE":
        return "bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/60";
      case "Mathematics":
        return "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60";
      case "Physics":
        return "bg-violet-50 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300 border-violet-200/80 dark:border-violet-800/60";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700";
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-lg hover:border-brand-primary/40 dark:hover:border-brand-primary/40 transition-all duration-200 overflow-hidden">
      {/* Top Editorial Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-primary via-indigo-600 to-amber-500 opacity-80" />

      <div className="p-6 space-y-5">
        {/* Header Block: Portrait Monogram + Name + Verified Badge */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-serif text-xl font-bold text-slate-800 dark:text-slate-100 overflow-hidden shadow-inner">
              {faculty.avatarUrl ? (
                <img
                  src={faculty.avatarUrl}
                  alt={faculty.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="tracking-tighter text-brand-primary dark:text-blue-400">
                  {faculty.initials}
                </span>
              )}
            </div>
            {faculty.verifiedInstitutional && (
              <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow" title="Verified Institutional Faculty">
                <ShieldCheck size={14} />
              </div>
            )}
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider border ${getDeptBadgeStyle(faculty.departmentShort)}`}>
                {faculty.departmentShort}
              </span>
              {faculty.roleTitle && (
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 truncate max-w-[170px]">
                  {faculty.roleTitle}
                </span>
              )}
            </div>

            <h3 
              onClick={() => onViewProfile(faculty)}
              className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 hover:text-brand-primary dark:hover:text-blue-400 transition-colors cursor-pointer leading-tight truncate"
            >
              {faculty.name}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {faculty.designation}
            </p>
          </div>
        </div>

        {/* Academic Degrees & Alma Mater */}
        <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
            <span className="font-semibold text-slate-900 dark:text-slate-100">{faculty.highestDegree}</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            Alma Mater: {faculty.almaMater}
          </p>
        </div>

        {/* Research Interests Tags */}
        <div className="space-y-1.5">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
            Research Areas & Expertise
          </p>
          <div className="flex flex-wrap gap-1.5">
            {faculty.researchInterests.slice(0, 3).map((interest, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200/80 dark:border-slate-700/60 leading-snug"
              >
                {interest}
              </span>
            ))}
            {faculty.researchInterests.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                +{faculty.researchInterests.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Office & Contact Metadata */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-slate-400 shrink-0" />
            <span className="truncate">{faculty.officeLocation}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={14} className="text-slate-400 shrink-0" />
            <a 
              href={`mailto:${faculty.email}`} 
              className="text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-blue-400 truncate font-mono text-[11px]"
            >
              {faculty.email}
            </a>
          </div>
        </div>
      </div>

      {/* Card Footer Actions: View Profile & Message */}
      <div className="p-4 bg-slate-50/80 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <button
          onClick={() => onViewProfile(faculty)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
        >
          <span>View Profile</span>
          <ArrowRight size={13} className="text-slate-400" />
        </button>

        {faculty.acceptsMessages ? (
          <button
            onClick={() => onSendMessage(faculty)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-primary text-white hover:bg-blue-700 shadow-sm transition-all"
            title={`Send authenticated message to ${faculty.name}`}
          >
            <MessageSquare size={13} />
            <span>Message</span>
          </button>
        ) : (
          <a
            href={`mailto:${faculty.email}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-all"
          >
            <Mail size={13} />
            <span>Email</span>
          </a>
        )}
      </div>
    </div>
  );
}
