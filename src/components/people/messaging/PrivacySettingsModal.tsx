import React, { useState } from "react";
import { 
  X, 
  Shield, 
  Eye, 
  EyeOff, 
  Bell, 
  Mail, 
  Check, 
  Lock,
  UserCheck
} from "lucide-react";

interface PrivacySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacySettingsModal({
  isOpen,
  onClose
}: PrivacySettingsModalProps) {
  const [profileVisibility, setProfileVisibility] = useState<"institute" | "faculty_only">("institute");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(false);
  const [acceptAppointmentInvites, setAcceptAppointmentInvites] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-blue-400 flex items-center justify-center font-bold">
              <Shield size={18} />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">
                Academic Privacy & Messaging Controls
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Identity & Communication Settings • Sarthi OS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Identity & Profile Visibility */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Student Directory Visibility
            </h4>
            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  checked={profileVisibility === "institute"}
                  onChange={() => setProfileVisibility("institute")}
                  className="mt-0.5 text-brand-primary focus:ring-brand-primary"
                />
                <div className="space-y-0.5 text-xs">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    Institute-Wide (Authenticated Members)
                  </span>
                  <p className="text-slate-500 dark:text-slate-400">
                    Faculty, staff, and enrolled students can view your verified academic profile.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  checked={profileVisibility === "faculty_only"}
                  onChange={() => setProfileVisibility("faculty_only")}
                  className="mt-0.5 text-brand-primary focus:ring-brand-primary"
                />
                <div className="space-y-0.5 text-xs">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    Faculty & Administration Only
                  </span>
                  <p className="text-slate-500 dark:text-slate-400">
                    Only course instructors and administration officers can access your contact cards.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Messaging & Notification Controls */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Notification & Delivery Channels
            </h4>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer">
                <div className="space-y-0.5 text-xs">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    Email Digest for New Faculty Replies
                  </span>
                  <span className="text-[11px] text-slate-500">Send copy to student email (barnik23012@iiitkalyani.ac.in)</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer">
                <div className="space-y-0.5 text-xs">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    Accept Consultation Invites
                  </span>
                  <span className="text-[11px] text-slate-500">Allow faculty to reschedule or confirm office hours via calendar</span>
                </div>
                <input
                  type="checkbox"
                  checked={acceptAppointmentInvites}
                  onChange={(e) => setAcceptAppointmentInvites(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">Roll: CSE/23012</span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-semibold hover:bg-blue-700 shadow-sm transition-all"
            >
              {isSaved ? (
                <>
                  <Check size={14} />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Preferences</span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
