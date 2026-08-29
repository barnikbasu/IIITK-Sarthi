import React, { useState } from "react";
import { 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Info,
  Lock
} from "lucide-react";

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  onSubmitReport: (data: {
    conversationId: string;
    reason: string;
    explanation: string;
  }) => void;
}

export default function ReportDialog({
  isOpen,
  onClose,
  conversationId,
  onSubmitReport
}: ReportDialogProps) {
  const [reason, setReason] = useState("Unsolicited / Inappropriate Message");
  const [explanation, setExplanation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const reasons = [
    "Unsolicited / Inappropriate Message",
    "Harassment / Abusive Communication",
    "Academic Dishonesty / Impersonation",
    "Violation of Code of Conduct",
    "Spam / Repeated Automated Messages",
    "Other Institutional Policy Breach"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport({
      conversationId,
      reason,
      explanation
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-rose-50 dark:bg-rose-950/40 border-b border-rose-100 dark:border-rose-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">
                Report to Academic Moderation Cell
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Confidential Review • Internal Complaints & Proctorial Committee
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

        {isSubmitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Report Submitted for Confidential Review
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              The incident transcript has been forwarded to the institutional proctorial/moderation office for review.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Reason for Report *
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {reasons.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Explanation & Details *
              </label>
              <textarea
                required
                rows={4}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Describe why this message violates institute policies or academic communication norms..."
                className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 text-xs text-slate-500 flex items-start gap-2">
              <Lock size={14} className="text-slate-400 shrink-0 mt-0.5" />
              <span>
                Your identity is protected under statutory privacy rules when submitting a proctorial concern.
              </span>
            </div>

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
                disabled={!explanation.trim()}
                className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 disabled:opacity-50 transition-all"
              >
                Submit Confidential Report
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
