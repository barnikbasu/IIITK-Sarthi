import React, { useState } from "react";
import { 
  ArrowLeft, 
  Star, 
  Archive, 
  MoreVertical, 
  Send, 
  Paperclip, 
  ShieldCheck, 
  CheckCheck, 
  Check, 
  Clock, 
  FileText, 
  Download, 
  AlertTriangle, 
  EyeOff, 
  CornerUpLeft,
  Calendar,
  Lock,
  UserCheck
} from "lucide-react";
import { AcademicConversation, AcademicMessage, AcademicAttachment } from "../../../data/peopleData";
import { IIITKCrest } from "../../common/IIITKLogo";

interface ConversationThreadProps {
  conversation: AcademicConversation;
  onBack: () => void;
  onSendReply: (conversationId: string, replyContent: string, attachments?: AcademicAttachment[]) => void;
  onToggleStar: (conversationId: string) => void;
  onToggleArchive: (conversationId: string) => void;
  onReportMessage?: (conversationId: string) => void;
}

export default function ConversationThread({
  conversation,
  onBack,
  onSendReply,
  onToggleStar,
  onToggleArchive,
  onReportMessage
}: ConversationThreadProps) {
  const [replyText, setReplyText] = useState("");
  const [attachments, setAttachments] = useState<AcademicAttachment[]>([]);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    onSendReply(conversation.id, replyText, attachments);
    setReplyText("");
    setAttachments([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAtts: AcademicAttachment[] = Array.from(files).map((fileItem) => {
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
    setAttachments(prev => [...prev, ...newAtts]);
  };

  const otherParticipant = {
    name: conversation.participantName || "Academic Official",
    designation: conversation.participantRole || "Department / Office",
    departmentOrOffice: conversation.participantDepartment || "IIIT Kalyani",
    email: conversation.participantEmail || "",
    role: conversation.participantRole || "Faculty"
  };

  const categoryLabel = conversation.subjectCategory || "General Academic";

  return (
    <div className="flex flex-col h-[750px] max-h-[85vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      
      {/* Thread Top Bar */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Back to conversations list"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-brand-primary/10 text-brand-primary dark:text-blue-400 uppercase tracking-wider">
                {categoryLabel}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">
                {conversation.subject}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              With: <strong className="font-semibold text-slate-800 dark:text-slate-200">{otherParticipant.name}</strong> ({otherParticipant.designation} • {otherParticipant.departmentOrOffice})
            </p>
          </div>
        </div>

        {/* Thread Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onToggleStar(conversation.id)}
            className={`p-2 rounded-xl border transition-colors ${
              conversation.isStarred
                ? "bg-amber-50 dark:bg-amber-950 text-amber-500 border-amber-300 dark:border-amber-700"
                : "bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-600 border-slate-200 dark:border-slate-700"
            }`}
            title="Star thread"
          >
            <Star size={16} className={conversation.isStarred ? "fill-amber-400" : ""} />
          </button>

          <button
            onClick={() => onToggleArchive(conversation.id)}
            className={`p-2 rounded-xl border transition-colors ${
              conversation.isArchived
                ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                : "bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-600 border-slate-200 dark:border-slate-700"
            }`}
            title="Archive conversation"
          >
            <Archive size={16} />
          </button>

          {onReportMessage && (
            <button
              onClick={() => onReportMessage(conversation.id)}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-400 hover:text-rose-500 border border-slate-200 dark:border-slate-700 transition-colors"
              title="Report incident to Academic Moderation Cell"
            >
              <AlertTriangle size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Security & Confidentiality Notice */}
      <div className="px-6 py-2 bg-slate-100/70 dark:bg-slate-850/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <Lock size={12} className="text-brand-primary" />
          <span>IIIT Kalyani Authenticated Exchange • Retention Policy: Official Academic Records</span>
        </span>
        <span className="font-mono text-[10px]">ID: {conversation.id}</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-900/50">
        {conversation.messages.map((msg) => {
          const isStudent = msg.senderRole === "Student";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isStudent ? "items-end" : "items-start"} space-y-1.5`}
            >
              {/* Sender Subheader */}
              <div className="flex items-center gap-2 px-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {msg.senderName}
                </span>
                <span>•</span>
                <span className="font-medium text-[11px]">
                  {msg.senderRole}
                </span>
                <span>•</span>
                <span className="font-mono text-[11px]">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-5 shadow-xs space-y-3 ${
                  isStudent
                    ? "bg-brand-primary text-white rounded-tr-xs"
                    : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-xs"
                }`}
              >
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {msg.body}
                </div>

                {/* Attachments within message */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-white/20 dark:border-slate-700">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isStudent ? "text-blue-100" : "text-slate-400"}`}>
                      Attachments ({msg.attachments.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {msg.attachments.map((att) => (
                        <div
                          key={att.id}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                            isStudent
                              ? "bg-white/15 text-white border border-white/20"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                          }`}
                        >
                          <FileText size={14} />
                          <span className="truncate max-w-[140px]">{att.name || att.fileName}</span>
                          <span className="text-[10px] opacity-75 font-mono">({att.size || att.fileSize})</span>
                          <Download size={13} className="ml-1 cursor-pointer opacity-75 hover:opacity-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message Delivery Status Indicator */}
                <div className={`flex items-center justify-end gap-1 text-[10px] ${isStudent ? "text-blue-200" : "text-slate-400"}`}>
                  <span>{new Date(msg.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                  {isStudent && (
                    <span className="flex items-center ml-1">
                      {msg.status === "Read" ? (
                        <CheckCheck size={14} className="text-blue-200" title="Read by faculty" />
                      ) : (
                        <Check size={14} className="text-blue-300" title="Delivered" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reply Composer Bar */}
      <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-3">
        {/* Temporary Attachments Preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 px-2">
            {attachments.map((att) => (
              <span
                key={att.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300"
              >
                <FileText size={12} className="text-brand-primary" />
                <span className="truncate max-w-[130px]">{att.name}</span>
                <button
                  type="button"
                  onClick={() => setAttachments(prev => prev.filter(a => a.id !== att.id))}
                  className="text-slate-400 hover:text-rose-500 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex items-end gap-3">
          {/* File Attachment Trigger */}
          <label className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors shrink-0">
            <Paperclip size={18} />
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Reply Textarea */}
          <textarea
            rows={2}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Reply officially to ${otherParticipant.name}...`}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
          />

          {/* Send Reply Button */}
          <button
            type="submit"
            disabled={!replyText.trim()}
            className="p-3.5 rounded-2xl bg-brand-primary text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shrink-0"
            title="Send reply"
          >
            <Send size={18} />
          </button>
        </div>
      </form>

    </div>
  );
}
