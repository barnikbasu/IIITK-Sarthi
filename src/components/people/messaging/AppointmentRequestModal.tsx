import React, { useState } from "react";
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Info,
  CalendarCheck,
  UserCheck
} from "lucide-react";
import { FacultyMember } from "../../../data/peopleData";
import { IIITKCrest } from "../../common/IIITKLogo";

interface AppointmentRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  faculty: FacultyMember | null;
  onSubmit: (data: {
    facultyName: string;
    facultyEmail: string;
    preferredDate: string;
    preferredTimeSlot: string;
    purpose: string;
    agendaDetails: string;
  }) => void;
}

export default function AppointmentRequestModal({
  isOpen,
  onClose,
  faculty,
  onSubmit
}: AppointmentRequestModalProps) {
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("14:30 - 15:30 (Afternoon)");
  const [purpose, setPurpose] = useState("Research / BTP Guidance");
  const [agendaDetails, setAgendaDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !faculty) return null;

  const timeSlots = [
    "10:00 - 11:00 (Morning Slot)",
    "11:30 - 12:30 (Pre-Lunch Slot)",
    "14:30 - 15:30 (Afternoon Slot)",
    "16:00 - 17:00 (Post-Class Slot)"
  ];

  const purposes = [
    "Research / BTP Guidance",
    "Coursework & Subject Clarification",
    "Recommendation Letter Discussion",
    "Academic Mentorship & Career Advice",
    "Lab Access & Project Work"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      facultyName: faculty.name,
      facultyEmail: faculty.email,
      preferredDate,
      preferredTimeSlot,
      purpose,
      agendaDetails
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-blue-400 flex items-center justify-center font-bold">
              <CalendarCheck size={18} />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">
                Request Office Consultation
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Academic Appointment Protocol • IIIT Kalyani
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Target Faculty Monogram Strip */}
        <div className="px-6 py-3 bg-blue-50/80 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/40 flex items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Consultation With:</span>
            <h4 className="font-bold text-slate-900 dark:text-slate-100">{faculty.name}</h4>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">{faculty.designation} • {faculty.officeLocation}</p>
          </div>
          <div className="text-right text-[11px] text-slate-500 dark:text-slate-400">
            <span className="block font-medium">Standard Hours:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{faculty.officeHours || "By Appointment"}</span>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Appointment Request Submitted
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              Your consultation request has been forwarded to {faculty.name}. You will receive a confirmation message in your Academic Messaging inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Preferred Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Preferred Slot *
                </label>
                <select
                  value={preferredTimeSlot}
                  onChange={(e) => setPreferredTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Purpose of Meeting *
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                {purposes.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Agenda Details */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Meeting Agenda & Context *
              </label>
              <textarea
                required
                rows={4}
                value={agendaDetails}
                onChange={(e) => setAgendaDetails(e.target.value)}
                placeholder="Briefly outline what you would like to discuss (e.g., questions on lecture 14, draft BTP proposal, or specific research paper)..."
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary leading-relaxed resize-none"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!preferredDate || !agendaDetails.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
              >
                <CalendarCheck size={14} />
                <span>Submit Appointment Request</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
