import React, { useState } from "react";
import { 
  X, 
  Send, 
  Paperclip, 
  ShieldCheck, 
  AlertCircle, 
  Info, 
  UserCheck, 
  FileText, 
  Check, 
  HelpCircle,
  Clock
} from "lucide-react";
import { MessageCategory, AcademicAttachment } from "../../../data/peopleData";
import { IIITKCrest } from "../../common/IIITKLogo";

interface MessageComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName?: string;
  recipientEmail?: string;
  recipientRole?: string;
  onSend: (messageData: {
    recipientName: string;
    recipientEmail: string;
    recipientRole: string;
    category: MessageCategory;
    subject: string;
    content: string;
    attachments: AcademicAttachment[];
  }) => void;
}

export default function MessageComposerModal({
  isOpen,
  onClose,
  recipientName = "Faculty / Administrative Office",
  recipientEmail = "",
  recipientRole = "Faculty Member",
  onSend
}: MessageComposerModalProps) {
  const [targetName, setTargetName] = useState(recipientName);
  const [targetEmail, setTargetEmail] = useState(recipientEmail);
  const [targetRole, setTargetRole] = useState(recipientRole);
  const [category, setCategory] = useState<MessageCategory>("Academic Query");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<AcademicAttachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Sync state if props change when opening
  React.useEffect(() => {
    if (recipientName) setTargetName(recipientName);
    if (recipientEmail) setTargetEmail(recipientEmail);
    if (recipientRole) setTargetRole(recipientRole);
  }, [recipientName, recipientEmail, recipientRole]);

  if (!isOpen) return null;

  const categories: { label: string; value: MessageCategory; desc: string }[] = [
    { label: "Academic Query", value: "Academic Query", desc: "Coursework, syllabus clarification, assignment questions" },
    { label: "Research Inquiry", value: "Research Inquiry", desc: "Paper discussion, lab guidance, research interests" },
    { label: "Project Discussion", value: "Project Discussion", desc: "BTP, minor project, open-source development" },
    { label: "Recommendation / Reference", value: "Recommendation / Reference", desc: "LOR for higher studies or scholarship" },
    { label: "Administrative Question", value: "Administrative Question", desc: "Fee, registration, certificates, hostel matters" },
    { label: "Other Official Inquiries", value: "Other", desc: "General institutional correspondence" }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setTimeout(() => {
      const newAttachments: AcademicAttachment[] = Array.from(files).map((fileItem) => {
        const f = fileItem as File;
        return {
          id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: f.name,
          fileName: f.name,
          size: `${(f.size / 1024).toFixed(1)} KB`,
          fileSize: `${(f.size / 1024).toFixed(1)} KB`,
          fileType: f.name.split(".").pop()?.toUpperCase() || "FILE",
          url: "#"
        };
      });

      setAttachments((prev) => [...prev, ...newAttachments]);
      setIsUploading(false);
    }, 400);
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter(a => a.id !== id));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !content.trim()) return;

    onSend({
      recipientName: targetName,
      recipientEmail: targetEmail || "recipient@iiitkalyani.ac.in",
      recipientRole: targetRole,
      category,
      subject,
      content,
      attachments
    });

    // Reset
    setSubject("");
    setContent("");
    setAttachments([]);
    onClose();
  };

  const charCount = content.length;
  const maxChars = 2500;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-blue-400 flex items-center justify-center font-bold">
              <IIITKCrest size={18} />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">
                Compose Authenticated Academic Message
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Official institutional communication protocol • Sarthi OS
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

        {/* Verified Student Sender Identity Banner */}
        <div className="px-6 py-3 bg-blue-50/80 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/40 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-blue-950 dark:text-blue-200 font-medium">
            <UserCheck size={16} className="text-brand-primary dark:text-blue-400 shrink-0" />
            <span>
              Sender: <strong className="font-semibold text-slate-900 dark:text-slate-100">Barnik Basu</strong> (B.Tech CSE • Roll: CSE/23012)
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
            <ShieldCheck size={11} />
            Verified Student
          </span>
        </div>

        {/* Message Form */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
          
          {/* Recipient Metadata Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
            <div className="space-y-0.5 min-w-0">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
                Recipient:
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                {targetName}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {targetRole} {targetEmail && `• ${targetEmail}`}
              </p>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Institutional Inbox
            </span>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Message Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MessageCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label} — {cat.desc}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Subject Line *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Query regarding CS301 Assignment 2 or BTP Project Guidance"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          {/* Content Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Official Message Body *
              </label>
              <span className={`text-[11px] font-mono ${charCount > maxChars ? "text-rose-500 font-bold" : "text-slate-400"}`}>
                {charCount} / {maxChars} chars
              </span>
            </div>
            <textarea
              required
              rows={6}
              maxLength={maxChars}
              placeholder="State your query clearly and respectfully with specific context, course code, or project details..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary leading-relaxed resize-none"
            />
          </div>

          {/* Attachments Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Attachments (PDF, Doc, Image)
              </label>
              <label className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-brand-primary dark:text-blue-400 hover:underline">
                <Paperclip size={13} />
                <span>Add File</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                />
              </label>
            </div>

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  >
                    <FileText size={14} className="text-brand-primary" />
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[150px]">{att.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({att.size})</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(att.id)}
                      className="text-slate-400 hover:text-rose-500 ml-1"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Academic Etiquette Note */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <Info size={16} className="text-brand-primary shrink-0 mt-0.5" />
            <span>
              Messages sent through Sarthi are logged in official institute records. Please maintain respectful academic language and observe standard faculty response windows.
            </span>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!subject.trim() || !content.trim() || charCount > maxChars}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
            >
              <Send size={14} />
              <span>Send Message</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
