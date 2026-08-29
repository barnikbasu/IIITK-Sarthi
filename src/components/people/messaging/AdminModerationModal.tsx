import React, { useState } from "react";
import { 
  X, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Clock, 
  FileText, 
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { sampleModerationQueue } from "../../../data/peopleData";
import { IIITKCrest } from "../../common/IIITKLogo";

interface AdminModerationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminModerationModal({
  isOpen,
  onClose
}: AdminModerationModalProps) {
  const [reports, setReports] = useState(sampleModerationQueue);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleResolve = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: "resolved" as const } : r));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                Proctorial & Moderation Cell Audit Dashboard
              </h3>
              <p className="text-[11px] text-slate-400">
                Institutional Safety & Ethics Oversight • Restricted Access
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Proctorial Review Protocol:</strong>
              Reports filed under statutory grievance categories are monitored under the supervision of the Proctorial Board and Internal Complaints Committee (ICC).
            </div>
          </div>

          {/* Incident Queue */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Active Moderation Queue ({reports.length} Incidents)
            </span>

            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                          {report.reason}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{report.id}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {report.conversationSubject}
                      </h4>
                    </div>

                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full capitalize ${
                      report.status === "resolved"
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                        : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                    }`}>
                      {report.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="text-slate-400">Reporter:</span> <strong>{report.reportedBy}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Reported User:</span> <strong>{report.reportedTarget}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Time:</span> <span className="font-mono">{new Date(report.timestamp).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">Details:</span>
                    {report.explanation}
                  </div>

                  {report.status !== "resolved" && (
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => handleResolve(report.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                      >
                        <CheckCircle2 size={14} />
                        <span>Mark Resolved / Audited</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
