import React, { useState } from "react";
import { 
  BookOpen, 
  Users, 
  Sparkles, 
  MapPin, 
  Clock, 
  Plus, 
  Check, 
  Search, 
  Filter, 
  Send, 
  ChevronRight, 
  X, 
  Zap,
  Target,
  GraduationCap,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { PeerStudyGroup } from "../../types";
import { peerStudyGroupsMock } from "../../data/mockData";

const availableCurriculumSubjects = [
  "Operating Systems",
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Computer Organization",
  "Discrete & Advanced Mathematics",
  "Computer Networks",
  "Theory of Computation",
  "Machine Learning & AI"
];

interface PeerStudyMatchProps {
  onTriggerToast?: (msg: string) => void;
}

export default function PeerStudyMatch({ onTriggerToast }: PeerStudyMatchProps) {
  // Student's listed subjects
  const [mySubjects, setMySubjects] = useState<string[]>([
    "Operating Systems",
    "Data Structures & Algorithms",
    "Database Management Systems"
  ]);

  const [newSubjectInput, setNewSubjectInput] = useState("");
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilterSubject, setSelectedFilterSubject] = useState<string>("All");
  const [studyGroups, setStudyGroups] = useState<PeerStudyGroup[]>(peerStudyGroupsMock);
  
  // Create Study Group Modal
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupSubject, setGroupSubject] = useState("Operating Systems");
  const [groupTopic, setGroupTopic] = useState("");
  const [groupLocation, setGroupLocation] = useState("Library 2nd Floor (Quiet Zone)");
  const [groupTime, setGroupTime] = useState("Tonight • 8:00 PM");
  const [groupCapacity, setGroupCapacity] = useState(4);
  const [groupDifficulty, setGroupDifficulty] = useState<"Beginner" | "Intermediate" | "Exam Sprint">("Exam Sprint");

  // Invite Peer Modal
  const [invitedStudent, setInvitedStudent] = useState<string | null>(null);

  const notify = (msg: string) => {
    if (onTriggerToast) onTriggerToast(msg);
  };

  const handleToggleSubject = (sub: string) => {
    if (mySubjects.includes(sub)) {
      if (mySubjects.length === 1) {
        notify("Keep at least one subject listed for active peer matching.");
        return;
      }
      setMySubjects(prev => prev.filter(s => s !== sub));
      notify(`Removed "${sub}" from your active study subjects.`);
    } else {
      setMySubjects(prev => [...prev, sub]);
      notify(`Added "${sub}"! Finding study partners.`);
    }
  };

  const handleAddCustomSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newSubjectInput.trim();
    if (!clean) return;
    if (mySubjects.includes(clean)) {
      notify(`"${clean}" is already in your study list.`);
      return;
    }
    setMySubjects(prev => [...prev, clean]);
    setNewSubjectInput("");
    setShowAddSubject(false);
    notify(`Custom subject "${clean}" added to your match profile!`);
  };

  const handleToggleJoinGroup = (groupId: string) => {
    setStudyGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        if (g.joined) {
          notify(`Left study group: ${g.name}`);
          return {
            ...g,
            joined: false,
            members: g.members.filter(m => m !== "Barnik Basu (You)")
          };
        } else {
          if (g.members.length >= g.maxMembers) {
            notify(`Study group ${g.name} is currently full (${g.maxMembers}/${g.maxMembers}).`);
            return g;
          }
          notify(`Joined ${g.name}! Meeting details synced to your schedule.`);
          return {
            ...g,
            joined: true,
            members: [...g.members, "Barnik Basu (You)"]
          };
        }
      }
      return g;
    }));
  };

  const handleCreateGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim() || !groupTopic.trim()) return;

    const newGroup: PeerStudyGroup = {
      id: `sg-${Date.now()}`,
      name: groupName.trim(),
      subject: groupSubject,
      topic: groupTopic.trim(),
      members: ["Barnik Basu (Creator)"],
      maxMembers: groupCapacity,
      location: groupLocation,
      meetingTime: groupTime,
      difficulty: groupDifficulty,
      creator: "Barnik Basu",
      joined: true
    };

    setStudyGroups(prev => [newGroup, ...prev]);
    setIsCreateGroupOpen(false);
    setGroupName("");
    setGroupTopic("");
    notify(`Study group "${newGroup.name}" created! Broadcasted to classmates studying ${newGroup.subject}.`);
  };

  // Matched peers data based on student's current subjects
  const peerListings = [
    {
      id: "p1",
      name: "Sneha Roy",
      role: "B.Tech CSE Sem 4",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
      subjects: ["Operating Systems", "Database Management Systems", "Machine Learning & AI"],
      currentFocus: "Virtual Memory & SQL Transactions",
      status: "Studying in Library 2nd Floor",
      online: true,
      cgpa: "8.9"
    },
    {
      id: "p2",
      name: "Rahul Sharma",
      role: "B.Tech CSE Sem 4",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      subjects: ["Operating Systems", "Data Structures & Algorithms"],
      currentFocus: "Page Replacement & LeetCode DP",
      status: "Hostel BH-1 Study Room",
      online: true,
      cgpa: "8.6"
    },
    {
      id: "p3",
      name: "Aniket Sen",
      role: "B.Tech ECE Sem 4",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aniket",
      subjects: ["Computer Organization", "Data Structures & Algorithms"],
      currentFocus: "Cache Architecture & MIPS Pipelines",
      status: "CS Lab 102 (Active)",
      online: true,
      cgpa: "8.4"
    },
    {
      id: "p4",
      name: "Priya Ghosh",
      role: "B.Tech CSE Sem 4",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      subjects: ["Database Management Systems", "Discrete & Advanced Mathematics"],
      currentFocus: "BCNF Decomposition & Graph Proofs",
      status: "Virtual Google Meet",
      online: false,
      cgpa: "9.1"
    }
  ];

  // Calculate matched count for each peer with mySubjects
  const matchedPeers = peerListings.map(peer => {
    const common = peer.subjects.filter(s => mySubjects.includes(s));
    return {
      ...peer,
      commonSubjects: common,
      matchScore: common.length
    };
  }).filter(peer => peer.matchScore > 0).sort((a, b) => b.matchScore - a.matchScore);

  // Filter study groups
  const filteredGroups = studyGroups.filter(g => {
    const matchesSubject = selectedFilterSubject === "All" || g.subject === selectedFilterSubject;
    const matchesSearch = searchQuery === "" || 
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      g.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-7 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-brand-primary/10 dark:bg-brand-teal/10 text-brand-primary dark:text-brand-teal rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
              <Zap size={12} className="text-brand-primary dark:text-brand-teal" />
              <span>Smart Peer Study Matchmaker</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              • {matchedPeers.length} Active Peers Available
            </span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Peer Study Circles & Partner Match
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            List the subjects you are studying right now to discover fellow classmates, form exam sprint groups, and collaborate in real-time.
          </p>
        </div>

        {/* Action Button: Create Study Circle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsCreateGroupOpen(true)}
            className="px-5 py-3.5 bg-brand-primary hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center gap-2 shadow-lg shadow-brand-primary/20 active:scale-95 transition-all"
          >
            <Plus size={16} />
            <span>Form Study Circle</span>
          </button>
        </div>
      </div>

      {/* 📚 Section 1: "My Current Subjects" Interactive Selector */}
      <div className="space-y-4 p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-brand-primary dark:text-brand-teal" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              My Active Study Subjects ({mySubjects.length} selected)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Click to toggle subjects on/off to update match algorithm
          </span>
        </div>

        {/* Subject Pills Selection */}
        <div className="flex flex-wrap gap-2.5 pt-1">
          {availableCurriculumSubjects.map((sub) => {
            const isSelected = mySubjects.includes(sub);
            return (
              <button
                key={sub}
                onClick={() => handleToggleSubject(sub)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm border",
                  isSelected
                    ? "bg-brand-primary text-white border-brand-primary shadow-brand-primary/20 scale-[1.02]"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-primary/40"
                )}
              >
                {isSelected ? <Check size={14} strokeWidth={3} /> : <Plus size={14} className="text-slate-400" />}
                <span>{sub}</span>
              </button>
            );
          })}

          {/* Plus Add Custom Subject */}
          {!showAddSubject ? (
            <button
              onClick={() => setShowAddSubject(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-all flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>Add Custom Topic</span>
            </button>
          ) : (
            <form onSubmit={handleAddCustomSubject} className="flex items-center gap-2">
              <input
                type="text"
                value={newSubjectInput}
                onChange={(e) => setNewSubjectInput(e.target.value)}
                placeholder="e.g. Distributed Systems..."
                autoFocus
                className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-brand-primary rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-brand-primary text-white text-xs font-bold rounded-xl"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddSubject(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 👥 Section 2: Matched Peers Carousel/Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-brand-primary dark:text-brand-teal" />
            <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
              Matched Study Partners ({matchedPeers.length} Found)
            </h4>
          </div>
          <span className="text-xs font-bold text-brand-primary dark:text-brand-teal">
            Matching based on your listed subjects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {matchedPeers.map((peer) => (
            <div
              key={peer.id}
              className="p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 hover:border-brand-primary/40 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0 shadow-sm relative">
                      <img src={peer.avatar} alt={peer.name} className="w-full h-full object-cover" />
                      {peer.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                      )}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                        {peer.name}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-semibold">{peer.role}</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md text-[10px] font-black">
                    CGPA {peer.cgpa}
                  </span>
                </div>

                {/* Common Subjects Match Badge */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-primary dark:text-brand-teal block">
                    {peer.commonSubjects.length} Shared Subject{peer.commonSubjects.length > 1 ? "s" : ""}:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {peer.commonSubjects.map((cs) => (
                      <span key={cs} className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-[10px] font-medium truncate max-w-[150px]">
                        {cs}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    <MapPin size={11} className="text-brand-teal shrink-0" />
                    <span className="truncate">{peer.status}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">
                    Focus: {peer.currentFocus}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex gap-2">
                <button
                  onClick={() => {
                    setInvitedStudent(peer.name);
                    notify(`Study invitation sent to ${peer.name}!`);
                    setTimeout(() => setInvitedStudent(null), 2500);
                  }}
                  className="w-full py-2.5 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white rounded-xl text-xs font-bold transition-all text-center"
                >
                  {invitedStudent === peer.name ? "Invite Sent ✓" : "Invite to Study"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 Section 3: Active Study Groups & Sprints */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
              Active Peer Study Groups ({filteredGroups.length})
            </h4>
            <p className="text-xs text-slate-400 font-medium">
              Join an ongoing circle or coordinate exam problem-solving rooms
            </p>
          </div>

          {/* Search and Subject Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics or groups..."
                className="pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary w-48"
              />
            </div>

            <select
              value={selectedFilterSubject}
              onChange={(e) => setSelectedFilterSubject(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">All Subjects</option>
              {availableCurriculumSubjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Study Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGroups.map((group) => {
            const isFull = group.members.length >= group.maxMembers && !group.joined;
            return (
              <div
                key={group.id}
                className={cn(
                  "p-6 rounded-3xl border transition-all flex flex-col justify-between group shadow-sm",
                  group.joined
                    ? "bg-brand-primary/5 dark:bg-brand-teal/5 border-brand-primary/30 dark:border-brand-teal/30"
                    : "bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 hover:border-brand-primary/40"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="px-2.5 py-0.5 bg-brand-primary/10 dark:bg-brand-teal/10 text-brand-primary dark:text-brand-teal text-[10px] font-black rounded-md uppercase tracking-wider">
                        {group.subject}
                      </span>
                      <h5 className="font-bold text-base text-slate-900 dark:text-white mt-1.5 leading-snug">
                        {group.name}
                      </h5>
                    </div>

                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0",
                      group.difficulty === "Exam Sprint" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20" :
                      group.difficulty === "Intermediate" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" :
                      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    )}>
                      {group.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    <strong>Topic:</strong> {group.topic}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-brand-primary dark:text-brand-teal shrink-0" />
                      <span className="truncate">{group.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-brand-primary dark:text-brand-teal shrink-0" />
                      <span>{group.meetingTime}</span>
                    </div>
                  </div>

                  {/* Members Avatars & Counter */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {group.members.slice(0, 3).map((m, i) => (
                          <div key={i} className="w-7 h-7 rounded-full bg-brand-primary/20 border-2 border-white dark:border-slate-800 text-[10px] font-bold flex items-center justify-center text-brand-primary dark:text-brand-teal">
                            {m.charAt(0)}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 font-semibold">
                        {group.members.length}/{group.maxMembers} Students
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-400 font-medium">
                      Host: {group.creator}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex gap-2">
                  <button
                    onClick={() => handleToggleJoinGroup(group.id)}
                    disabled={isFull}
                    className={cn(
                      "w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm",
                      group.joined
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : isFull
                        ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                        : "bg-brand-primary hover:bg-indigo-700 text-white active:scale-95"
                    )}
                  >
                    {group.joined ? (
                      <>
                        <Check size={14} strokeWidth={3} />
                        <span>Joined Circle (Leave)</span>
                      </>
                    ) : isFull ? (
                      <span>Circle Full ({group.maxMembers}/{group.maxMembers})</span>
                    ) : (
                      <span>Join Study Circle</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CREATE STUDY GROUP MODAL */}
      <AnimatePresence>
        {isCreateGroupOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setIsCreateGroupOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest font-semibold">
                  STUDY GROUP BROADCAST
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight font-heading">
                  Create Peer Study Circle
                </h3>
              </div>

              <form onSubmit={handleCreateGroupSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">
                    Group Name
                  </label>
                  <input
                    type="text"
                    required
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="e.g. OS Mid-Sem Deadlocks Sprint"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">
                      Subject
                    </label>
                    <select
                      value={groupSubject}
                      onChange={(e) => setGroupSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    >
                      {availableCurriculumSubjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">
                      Difficulty / Focus
                    </label>
                    <select
                      value={groupDifficulty}
                      onChange={(e) => setGroupDifficulty(e.target.value as any)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    >
                      <option value="Exam Sprint">Exam Sprint</option>
                      <option value="Intermediate">Intermediate Problem Solving</option>
                      <option value="Beginner">Foundations & Concept Doubt Clearing</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">
                    Specific Topic / Goal
                  </label>
                  <input
                    type="text"
                    required
                    value={groupTopic}
                    onChange={(e) => setGroupTopic(e.target.value)}
                    placeholder="e.g. Bankers Algorithm, Semaphore race condition solving"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">
                      Meeting Venue / Link
                    </label>
                    <input
                      type="text"
                      required
                      value={groupLocation}
                      onChange={(e) => setGroupLocation(e.target.value)}
                      placeholder="e.g. Library 2nd Floor or GMeet"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">
                      Time Slot
                    </label>
                    <input
                      type="text"
                      required
                      value={groupTime}
                      onChange={(e) => setGroupTime(e.target.value)}
                      placeholder="e.g. Tonight • 8:00 PM"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateGroupOpen(false)}
                    className="px-5 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:opacity-95 transition-all"
                  >
                    Broadcast Circle
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
