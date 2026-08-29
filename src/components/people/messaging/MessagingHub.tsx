import React, { useState } from "react";
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Star, 
  Archive, 
  Mail, 
  ShieldCheck, 
  Inbox, 
  SlidersHorizontal,
  Lock,
  UserCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldAlert,
  Settings,
  X
} from "lucide-react";
import { 
  AcademicConversation, 
  sampleAcademicConversations, 
  AcademicMessage, 
  AcademicAttachment,
  MessageCategory 
} from "../../../data/peopleData";
import ConversationThread from "./ConversationThread";
import MessageComposerModal from "./MessageComposerModal";
import PrivacySettingsModal from "./PrivacySettingsModal";
import AdminModerationModal from "./AdminModerationModal";
import ReportDialog from "./ReportDialog";
import { IIITKCrest } from "../../common/IIITKLogo";

interface MessagingHubProps {
  onOpenWhoCanHelp?: () => void;
  directComposeTarget?: {
    name: string;
    email: string;
    role: string;
  } | null;
  onClearDirectCompose?: () => void;
}

export default function MessagingHub({
  onOpenWhoCanHelp,
  directComposeTarget,
  onClearDirectCompose
}: MessagingHubProps) {
  const [conversations, setConversations] = useState<AcademicConversation[]>(sampleAcademicConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(sampleAcademicConversations[0]?.id || null);
  const [filterTab, setFilterTab] = useState<"all" | "unread" | "starred" | "archived">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposerOpen, setIsComposerOpen] = useState(Boolean(directComposeTarget));
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isModerationOpen, setIsModerationOpen] = useState(false);
  const [reportingConversationId, setReportingConversationId] = useState<string | null>(null);

  // React to incoming directComposeTarget
  React.useEffect(() => {
    if (directComposeTarget) {
      setIsComposerOpen(true);
    }
  }, [directComposeTarget]);

  // Unread count
  const unreadCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  // Filtered Conversations
  const filteredConversations = conversations.filter((conv) => {
    // Tab filter
    if (filterTab === "unread" && (!conv.unreadCount || conv.unreadCount === 0)) return false;
    if (filterTab === "starred" && !conv.isStarred) return false;
    if (filterTab === "archived" && !conv.isArchived) return false;
    if (filterTab !== "archived" && conv.isArchived) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const cat = (conv.category || conv.subjectCategory || "").toLowerCase();
      const matchesSubject = conv.subject.toLowerCase().includes(q);
      const matchesCategory = cat.includes(q);
      const participantName = conv.participantName || "";
      const participantDept = conv.participantDepartment || "";
      const matchesParticipant = (conv.participants && conv.participants.some(p => p.name.toLowerCase().includes(q) || (p.departmentOrOffice && p.departmentOrOffice.toLowerCase().includes(q)))) ||
        participantName.toLowerCase().includes(q) ||
        participantDept.toLowerCase().includes(q);
      const matchesMessages = conv.messages.some(m => (m.content || m.body || "").toLowerCase().includes(q));

      if (!(matchesSubject || matchesCategory || matchesParticipant || matchesMessages)) {
        return false;
      }
    }

    return true;
  });

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  // Handle New Message Sent from Composer
  const handleSendMessage = (data: {
    recipientName: string;
    recipientEmail: string;
    recipientRole: string;
    category: MessageCategory;
    subject: string;
    content: string;
    attachments: AcademicAttachment[];
  }) => {
    const newConvId = `conv-${Date.now()}`;
    const newMsg: AcademicMessage = {
      id: `msg-${Date.now()}`,
      senderId: "student-basu",
      senderName: "Barnik Basu",
      senderRole: "Student",
      senderDetails: "B.Tech CSE • IIIT Kalyani",
      senderEmail: "barnik23012@iiitkalyani.ac.in",
      recipientId: `recip-${Date.now()}`,
      recipientName: data.recipientName,
      recipientRole: data.recipientRole,
      recipientEmail: data.recipientEmail,
      subject: data.subject,
      subjectCategory: (data.category as any) || "Academic Query",
      body: data.content,
      timestamp: new Date().toISOString(),
      status: "Delivered",
      attachments: data.attachments
    };

    const newConv: AcademicConversation = {
      id: newConvId,
      subject: data.subject,
      subjectCategory: (data.category as any) || "Academic Query",
      participantId: `recip-${Date.now()}`,
      participantName: data.recipientName,
      participantRole: data.recipientRole,
      participantDepartment: "IIIT Kalyani",
      participantEmail: data.recipientEmail,
      messages: [newMsg],
      lastMessage: data.content,
      lastMessageTimestamp: "Just now",
      unreadCount: 0,
      isStarred: false,
      isArchived: false,
      isMuted: false,
      isBlocked: false,
      isRequest: false,
      requestStatus: "accepted"
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConvId);
  };

  // Handle Reply in Thread
  const handleSendReply = (conversationId: string, replyContent: string, attachments?: AcademicAttachment[]) => {
    const targetConv = conversations.find(c => c.id === conversationId);
    if (!targetConv) return;

    const other = {
      id: targetConv.participantId || "target-recip",
      name: targetConv.participantName || "Academic Officer",
      role: targetConv.participantRole || "Faculty",
      email: targetConv.participantEmail || "contact@iiitkalyani.ac.in"
    };

    const replyMsg: AcademicMessage = {
      id: `msg-reply-${Date.now()}`,
      senderId: "student-basu",
      senderName: "Barnik Basu",
      senderRole: "Student",
      senderDetails: "B.Tech CSE • IIIT Kalyani",
      senderEmail: "barnik23012@iiitkalyani.ac.in",
      recipientId: other.id,
      recipientName: other.name,
      recipientRole: other.role,
      recipientEmail: other.email,
      subject: `Re: ${targetConv.subject}`,
      subjectCategory: targetConv.subjectCategory || "Academic Query",
      body: replyContent,
      timestamp: new Date().toISOString(),
      status: "Delivered",
      attachments: attachments || []
    };

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          messages: [...c.messages, replyMsg],
          lastMessage: replyContent,
          lastMessageTimestamp: "Just now"
        };
      }
      return c;
    }));
  };

  // Toggle Star
  const handleToggleStar = (conversationId: string) => {
    setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, isStarred: !c.isStarred } : c));
  };

  // Toggle Archive
  const handleToggleArchive = (conversationId: string) => {
    setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, isArchived: !c.isArchived } : c));
  };

  return (
    <div className="space-y-6">
      {/* Messaging Header & Student Identity Ribbon */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-100/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary dark:text-blue-400 uppercase tracking-wider">
            <MessageSquare size={15} />
            <span>Authenticated Academic Messaging</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            Academic Inbox & Consultations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            Direct, official communications with course instructors, research mentors, and administrative officers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsComposerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-primary text-white text-xs sm:text-sm font-semibold hover:bg-blue-700 shadow-md transition-all shrink-0"
          >
            <Plus size={18} />
            <span>Compose Message</span>
          </button>

          <button
            onClick={() => setIsPrivacyOpen(true)}
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
            title="Privacy & Communication Controls"
          >
            <Settings size={18} />
          </button>

          <button
            onClick={() => setIsModerationOpen(true)}
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500 transition-colors"
            title="Proctorial Moderation Audit"
          >
            <ShieldAlert size={18} />
          </button>
        </div>
      </div>

      {/* Main Inbox Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Conversations List & Filters */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search conversations by faculty or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          {/* Sub-Tabs: All, Unread, Starred, Archived */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setFilterTab("all")}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterTab === "all"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterTab("unread")}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all relative ${
                filterTab === "unread"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </button>
            <button
              onClick={() => setFilterTab("starred")}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterTab === "starred"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Starred
            </button>
            <button
              onClick={() => setFilterTab("archived")}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterTab === "archived"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Archived
            </button>
          </div>

          {/* Conversations Scroll List */}
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === activeConversationId;
                const other = conv.participants?.find(p => p.role !== "Student") || 
                  conv.participants?.[1] || 
                  conv.participants?.[0] || {
                    name: conv.participantName || "Academic Officer",
                    role: conv.participantRole || "Office"
                  };
                const catLabel = conv.category || conv.subjectCategory || "General Academic";
                const lastSnippet = conv.lastMessageSnippet || conv.lastMessage || "";

                return (
                  <div
                    key={conv.id}
                    onClick={() => {
                      setActiveConversationId(conv.id);
                      // Mark as read
                      setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      isSelected
                        ? "bg-white dark:bg-slate-800 border-brand-primary shadow-sm ring-1 ring-brand-primary"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                            {catLabel}
                          </span>
                          {conv.unreadCount && conv.unreadCount > 0 ? (
                            <span className="w-2 h-2 rounded-full bg-brand-primary" />
                          ) : null}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                          {other.name}
                        </h4>
                      </div>

                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {new Date(conv.lastMessageTimestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {conv.subject}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {lastSnippet}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <Inbox size={28} className="mx-auto text-slate-400" />
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  No conversations found
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Active Conversation Thread */}
        <div className="lg:col-span-7">
          {activeConversation ? (
            <ConversationThread
              conversation={activeConversation}
              onBack={() => setActiveConversationId(null)}
              onSendReply={handleSendReply}
              onToggleStar={handleToggleStar}
              onToggleArchive={handleToggleArchive}
              onReportMessage={(id) => setReportingConversationId(id)}
            />
          ) : (
            <div className="h-[500px] flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary dark:text-blue-400 flex items-center justify-center">
                <MessageSquare size={32} />
              </div>
              <div className="space-y-1 max-w-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Select a Conversation or Start New
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select an academic exchange from the list or compose a new official inquiry to any faculty member or administrative office.
                </p>
              </div>
              <button
                onClick={() => setIsComposerOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Compose Message
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Composer Modal */}
      <MessageComposerModal
        isOpen={isComposerOpen}
        onClose={() => {
          setIsComposerOpen(false);
          if (onClearDirectCompose) onClearDirectCompose();
        }}
        recipientName={directComposeTarget?.name}
        recipientEmail={directComposeTarget?.email}
        recipientRole={directComposeTarget?.role}
        onSend={handleSendMessage}
      />

      {/* Privacy Settings Modal */}
      <PrivacySettingsModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Admin Moderation Modal */}
      <AdminModerationModal
        isOpen={isModerationOpen}
        onClose={() => setIsModerationOpen(false)}
      />

      {/* Report Dialog */}
      <ReportDialog
        isOpen={Boolean(reportingConversationId)}
        onClose={() => setReportingConversationId(null)}
        conversationId={reportingConversationId || ""}
        onSubmitReport={(reportData) => {
          console.log("Report submitted:", reportData);
        }}
      />
    </div>
  );
}
