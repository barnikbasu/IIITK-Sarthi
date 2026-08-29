import React, { useState } from "react";
import { 
  X, 
  Mail, 
  Globe, 
  MessageSquare, 
  MapPin, 
  Calendar, 
  Clock, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  GraduationCap, 
  Briefcase, 
  Sparkles,
  Layers,
  FileText,
  CheckCircle2,
  CalendarCheck
} from "lucide-react";
import { FacultyMember } from "../../data/peopleData";
import { IIITKCrest } from "../common/IIITKLogo";

interface FacultyProfileModalProps {
  faculty: FacultyMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (faculty: FacultyMember) => void;
  onRequestAppointment?: (faculty: FacultyMember) => void;
}

export default function FacultyProfileModal({
  faculty,
  isOpen,
  onClose,
  onSendMessage,
  onRequestAppointment
}: FacultyProfileModalProps) {
  if (!isOpen || !faculty) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col my-8">
        
        {/* Modal Header Bar with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <IIITKCrest size={18} />
            <span>IIIT Kalyani • Faculty Profile</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
          
          {/* Top Hero Section: Portrait, Designation, Bio & Quick Actions */}
          <div className="flex flex-col md:flex-row items-start gap-6 pb-2">
            {/* Portrait Monogram / Photo */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-serif text-3xl font-bold text-slate-800 dark:text-slate-100 overflow-hidden shadow-md">
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
                <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-1 shadow-md" title="Verified Institutional Faculty">
                  <ShieldCheck size={20} />
                </div>
              )}
            </div>

            {/* Profile Overview */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-primary/10 text-brand-primary dark:text-blue-400 border border-brand-primary/20 uppercase tracking-wider">
                  {faculty.department}
                </span>
                {faculty.roleTitle && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                    {faculty.roleTitle}
                  </span>
                )}
                {faculty.verifiedInstitutional && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 size={12} />
                    Verified Official Profile
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                  {faculty.name}
                </h2>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  {faculty.designation} • IIIT Kalyani (An Institute of National Importance)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 dark:text-slate-300 pt-1">
                <div className="flex items-center gap-1.5 font-medium">
                  <GraduationCap size={15} className="text-brand-primary" />
                  <span>{faculty.highestDegree}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span>Alma Mater:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{faculty.almaMater}</span>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap items-center gap-2.5 pt-3">
                {faculty.acceptsMessages && (
                  <button
                    onClick={() => onSendMessage(faculty)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-xs sm:text-sm hover:bg-blue-700 shadow-sm transition-all"
                  >
                    <MessageSquare size={16} />
                    <span>Send Message</span>
                  </button>
                )}

                {onRequestAppointment && (
                  <button
                    onClick={() => onRequestAppointment(faculty)}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
                  >
                    <CalendarCheck size={16} className="text-brand-primary" />
                    <span>Request Appointment</span>
                  </button>
                )}

                <a
                  href={`mailto:${faculty.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-all"
                >
                  <Mail size={14} />
                  <span>Email</span>
                </a>

                {faculty.personalWebsite && (
                  <a
                    href={faculty.personalWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-all"
                  >
                    <Globe size={14} />
                    <span>Website</span>
                    <ExternalLink size={12} className="text-slate-400" />
                  </a>
                )}

                {faculty.googleScholarUrl && (
                  <a
                    href={faculty.googleScholarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-all"
                  >
                    <BookOpen size={14} />
                    <span>Google Scholar</span>
                    <ExternalLink size={12} className="text-slate-400" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Biography Section */}
          <div className="pt-6 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Academic Biography
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              {faculty.biography}
            </p>
          </div>

          {/* Research Interests & Expertise Tags */}
          <div className="pt-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Research Interests & Technical Expertise
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Primary Research Domains
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {faculty.researchInterests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-lg bg-white dark:bg-slate-800 text-brand-primary dark:text-blue-300 font-semibold border border-brand-primary/20 shadow-2xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Technical Keywords & Methods
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {faculty.expertiseTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Verified Featured Publications */}
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Verified Publications ({faculty.publicationsCount || faculty.featuredPublications?.length || "Verified"} Records)
              </h3>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                Only verified institutional records displayed
              </span>
            </div>

            {faculty.featuredPublications && faculty.featuredPublications.length > 0 ? (
              <div className="space-y-3">
                {faculty.featuredPublications.map((pub, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 hover:border-brand-primary/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-serif leading-snug">
                        {pub.title}
                      </h4>
                      <span className="px-2 py-0.5 text-[10px] font-bold font-mono rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                        {pub.year}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      Venue: <span className="italic text-slate-800 dark:text-slate-200">{pub.venue}</span>
                    </p>
                    {pub.citations && (
                      <p className="text-[11px] text-brand-primary dark:text-blue-400 font-medium">
                        ✦ {pub.citations} Citations Indexed
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                Detailed verified publication list available on personal academic page or Google Scholar profile.
              </div>
            )}
          </div>

          {/* Active Research Projects & Grants */}
          {faculty.activeProjects && faculty.activeProjects.length > 0 && (
            <div className="pt-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Sponsored Research & Grants
              </h3>

              <div className="space-y-3">
                {faculty.activeProjects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {proj.title}
                      </h4>
                      {proj.grantAmount && (
                        <span className="px-2.5 py-0.5 text-xs font-bold font-mono rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                          {proj.grantAmount}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
                      <span>Funding Agency: <strong className="text-slate-800 dark:text-slate-200">{proj.fundingAgency}</strong></span>
                      <span>Role: <strong className="text-slate-800 dark:text-slate-200">{proj.role}</strong></span>
                      <span>Duration: <strong>{proj.duration}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Institutional Administrative Roles & Courses */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {faculty.administrativeRoles && faculty.administrativeRoles.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Institutional Roles & Committees
                </h3>
                <ul className="space-y-2">
                  {faculty.administrativeRoles.map((role, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <Award size={16} className="text-brand-primary shrink-0 mt-0.5" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {faculty.coursesTaught && faculty.coursesTaught.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Courses Taught (B.Tech / Ph.D.)
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {faculty.coursesTaught.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Office Location, Hours & Official Policy */}
          <div className="pt-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Office Information & Student Consultations
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-xs">
                  <MapPin size={15} className="text-brand-primary" />
                  <span>Office Location</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {faculty.officeLocation}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-xs">
                  <Clock size={15} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Student Office Hours</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {faculty.officeHours || "Contact faculty member for availability."}
                </p>
              </div>
            </div>

            {faculty.messagingPolicy && (
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-300 space-y-1">
                <strong className="block font-semibold">Academic Consultation & Messaging Policy:</strong>
                <p>{faculty.messagingPolicy}</p>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Official IIIT Kalyani Academic Profile
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Close
            </button>
            {faculty.acceptsMessages && (
              <button
                onClick={() => onSendMessage(faculty)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-brand-primary text-white hover:bg-blue-700 rounded-xl shadow-sm transition-all"
              >
                <MessageSquare size={14} />
                <span>Message Faculty</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
