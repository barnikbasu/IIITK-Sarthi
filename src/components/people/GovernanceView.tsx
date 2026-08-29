import React, { useState } from "react";
import { 
  Landmark, 
  Award, 
  Scale, 
  ShieldAlert, 
  AlertTriangle, 
  Inbox, 
  Users, 
  ChevronRight, 
  CheckCircle2, 
  Mail,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Calendar
} from "lucide-react";
import { officialInstitutionalBodies, officialFacultyList, InstitutionalBody } from "../../data/peopleData";
import { IIITKCrest } from "../common/IIITKLogo";

export default function GovernanceView() {
  const [selectedBodyId, setSelectedBodyId] = useState<string>("bog");

  const director = officialFacultyList.find(f => f.designation === "Director");
  const activeBody = officialInstitutionalBodies.find(b => b.id === selectedBodyId) || officialInstitutionalBodies[0];

  return (
    <div className="space-y-12">
      {/* ------------------------------------------------------------- */}
      {/* 01: DIRECTOR & EXECUTIVE LEADERSHIP SECTION */}
      {/* ------------------------------------------------------------- */}
      {director && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-8 md:p-12 border border-slate-800 shadow-xl">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Monogram / Portrait */}
            <div className="lg:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center font-serif text-4xl font-bold text-blue-400 shadow-2xl overflow-hidden">
                {director.avatarUrl ? (
                  <img src={director.avatarUrl} alt={director.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{director.initials}</span>
                )}
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                <ShieldCheck size={14} />
                <span>Executive Leadership</span>
              </div>
            </div>

            {/* Middle Editorial Content */}
            <div className="lg:col-span-9 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                  DIRECTOR & CHIEF EXECUTIVE
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                  {director.name}
                </h2>
                <p className="text-sm font-medium text-slate-300 font-sans">
                  Director, IIIT Kalyani & Chairman, Senate • {director.highestDegree}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                {director.biography}
              </p>

              {/* Leadership Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Governance</span>
                  <span className="text-sm font-semibold text-white">Senate & BoG</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Research</span>
                  <span className="text-sm font-semibold text-white">Deep-Tech & AI</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Campus</span>
                  <span className="text-sm font-semibold text-white">Permanent LHC</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">National</span>
                  <span className="text-sm font-semibold text-white">INI Standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 02: STATUTORY BODIES TABS & ROSTER */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
              Statutory Councils & Institutional Bodies
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Regulatory governance, academic ordinances, equity committees, and grievance bodies.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <IIITKCrest size={16} />
            <span>IIIT PPP Act, 2017</span>
          </div>
        </div>

        {/* Body Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {officialInstitutionalBodies.map((body) => (
            <button
              key={body.id}
              onClick={() => setSelectedBodyId(body.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedBodyId === body.id
                  ? "bg-brand-primary text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <span>{body.shortName}</span>
            </button>
          ))}
        </div>

        {/* Active Body Detailed Institutional Layout */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-sm">
          {/* Header & Mandate */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-primary/10 text-brand-primary dark:text-blue-400 uppercase tracking-wider">
                  {activeBody.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {activeBody.name}
                </h3>
              </div>

              <div className="text-right text-xs text-slate-500 dark:text-slate-400 font-medium">
                <div>Chair: <strong className="text-slate-800 dark:text-slate-200">{activeBody.headOrChairperson}</strong></div>
                <div>Official Contact: <a href={`mailto:${activeBody.officialEmail}`} className="font-mono text-brand-primary hover:underline">{activeBody.officialEmail}</a></div>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {activeBody.mandate}
            </p>
          </div>

          {/* Statutory Powers & Duties */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Statutory Powers & Mandated Responsibilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeBody.powersAndDuties.map((duty, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={15} className="text-brand-primary mt-0.5 shrink-0" />
                  <span>{duty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Member Roster (Hierarchy-First Table) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Committee & Council Members ({activeBody.members.length} Members)
              </h4>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                Statutory Gazette Composition
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-bold uppercase text-[11px] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3 sm:p-4">Member Name</th>
                    <th className="p-3 sm:p-4">Role in Body</th>
                    <th className="p-3 sm:p-4">Designation & Institution</th>
                    <th className="p-3 sm:p-4">Nomination Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {activeBody.members.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 sm:p-4 font-bold text-slate-900 dark:text-slate-100">
                        <div className="flex items-center gap-2.5">
                          {member.avatarUrl ? (
                            <img
                              src={member.avatarUrl}
                              alt={member.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-700 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                              {member.name.replace(/^(Prof\.|Dr\.|Sri|Ms\.|Mr\.)\s*/, '').slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <span>{member.name}</span>
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 font-semibold text-brand-primary dark:text-blue-400">
                        {member.roleInBody}
                      </td>
                      <td className="p-3 sm:p-4 text-slate-600 dark:text-slate-300">
                        <div>{member.designation}</div>
                        <div className="text-xs text-slate-400">{member.affiliation}</div>
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {member.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
