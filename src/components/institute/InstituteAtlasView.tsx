import React, { useState, useMemo } from "react";
import { 
  Network, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  GraduationCap, 
  Calendar, 
  Landmark, 
  Atom, 
  Briefcase, 
  MapPin, 
  HelpCircle, 
  Award, 
  Building2, 
  Mail, 
  Phone, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Users, 
  Code2, 
  Bot, 
  GitBranch, 
  Palette, 
  Music, 
  Trophy, 
  Archive, 
  Terminal, 
  Camera, 
  BookOpen, 
  CheckCircle2, 
  Compass, 
  Info,
  ArrowRight,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { instituteStructureData, officialClubsData, InstituteNode, ClubInfo } from "../../data/instituteStructure";
import { IIITKCrest } from "../common/IIITKLogo";

interface InstituteAtlasViewProps {
  onNavigateTab?: (tab: string) => void;
}

export default function InstituteAtlasView({ onNavigateTab }: InstituteAtlasViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomainId, setSelectedDomainId] = useState<string>("student-life");
  const [selectedNode, setSelectedNode] = useState<InstituteNode | null>(instituteStructureData[0]);
  const [selectedClub, setSelectedClub] = useState<ClubInfo | null>(null);
  const [viewMode, setViewMode] = useState<"tree" | "grid" | "clubs">("tree");
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "student-life": true,
    "gymkhana": true,
    "events": true,
    "institutional-bodies": true,
    "research-innovation": true,
    "career": true,
    "campus": true,
    "student-services": true,
    "achievements": true
  });

  const toggleNodeExpand = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const getDomainIcon = (id: string, size = 18) => {
    switch (id) {
      case "student-life": return <GraduationCap size={size} />;
      case "events": return <Calendar size={size} />;
      case "institutional-bodies": return <Landmark size={size} />;
      case "research-innovation": return <Atom size={size} />;
      case "career": return <Briefcase size={size} />;
      case "campus": return <MapPin size={size} />;
      case "student-services": return <HelpCircle size={size} />;
      case "achievements": return <Award size={size} />;
      default: return <Building2 size={size} />;
    }
  };

  // Filtered nodes based on search
  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return instituteStructureData;
    const q = searchQuery.toLowerCase();

    return instituteStructureData.filter(domain => {
      const matchDomain = domain.name.toLowerCase().includes(q) || domain.description.toLowerCase().includes(q);
      const matchChildren = domain.children?.some(child => 
        child.name.toLowerCase().includes(q) || 
        child.description.toLowerCase().includes(q) ||
        child.children?.some(sub => sub.name.toLowerCase().includes(q) || sub.description.toLowerCase().includes(q))
      );
      return matchDomain || matchChildren;
    });
  }, [searchQuery]);

  const activeDomain = useMemo(() => {
    return instituteStructureData.find(d => d.id === selectedDomainId) || instituteStructureData[0];
  }, [selectedDomainId]);

  return (
    <div className="space-y-8 pb-24">
      
      {/* Hero Header */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-brand-primary via-indigo-800 to-slate-900 text-white p-8 sm:p-10 shadow-xl overflow-hidden">
        {/* Subtle background graphics */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-brand-teal flex items-center gap-1.5 border border-white/10">
                <Compass size={12} />
                <span>Institutional Ecosystem & Governance Tree</span>
              </span>
              <span className="text-[10px] font-bold text-white/60">
                • Indian Institute of Information Technology Kalyani
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
              IIIT Kalyani Institutional Atlas
            </h1>
            <p className="text-sm text-slate-200/90 font-medium leading-relaxed">
              Explore the complete 8-pillar organizational tree of IIIT Kalyani: Student Life & Gymkhana clubs, Statutory Governance, Research (IIC/SRIC), Career Cells, Campus Facilities, and Student Services.
            </p>
          </div>

          {/* View Switcher */}
          <div className="flex items-center gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md shrink-0 self-start lg:self-auto">
            <button
              onClick={() => setViewMode("tree")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                viewMode === "tree" ? "bg-white text-slate-900 shadow-md" : "text-white/80 hover:text-white"
              )}
            >
              <Network size={14} />
              <span>Tree Hierarchy</span>
            </button>
            <button
              onClick={() => setViewMode("clubs")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                viewMode === "clubs" ? "bg-white text-slate-900 shadow-md" : "text-white/80 hover:text-white"
              )}
            >
              <Users size={14} />
              <span>13 Official Clubs</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                viewMode === "grid" ? "bg-white text-slate-900 shadow-md" : "text-white/80 hover:text-white"
              )}
            >
              <Layers size={14} />
              <span>8 Domains Grid</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Quick Stats */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clubs, councils, research wings (IIC, SRIC)..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all backdrop-blur-md"
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-white/80 self-start sm:self-auto">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>8 Apex Pillars</span>
            </span>
            <span>•</span>
            <span>13 Official Clubs</span>
            <span>•</span>
            <span>68+ Functional Bodies</span>
          </div>
        </div>
      </div>

      {/* Domain Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {instituteStructureData.map((domain) => {
          const isSelected = selectedDomainId === domain.id;
          return (
            <button
              key={domain.id}
              onClick={() => {
                setSelectedDomainId(domain.id);
                setSelectedNode(domain);
              }}
              className={cn(
                "px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border shrink-0",
                isSelected
                  ? "bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20 scale-105"
                  : "bg-white dark:bg-brand-navy text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-brand-primary/40"
              )}
            >
              <span className="text-base">{domain.icon}</span>
              <span>{domain.name}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-black/10 dark:bg-white/10">
                {domain.children?.length || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main View Modes */}
      {viewMode === "tree" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Interactive Tree Visualizer (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-brand-navy rounded-[2.5rem] p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <IIITKCrest size={32} />
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                    IIIT KALYANI Hierarchy Tree
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Click any node to inspect detailed charter, leadership & functions
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg">
                Interactive Map
              </span>
            </div>

            {/* Tree Branch Visualizer */}
            <div className="space-y-3 font-sans text-xs">
              {filteredTree.map((domain) => {
                const isDomainExpanded = expandedNodes[domain.id];
                const isDomainSelected = selectedNode?.id === domain.id;

                return (
                  <div key={domain.id} className="space-y-2">
                    {/* Domain Root Node */}
                    <div
                      onClick={() => {
                        setSelectedNode(domain);
                        setSelectedDomainId(domain.id);
                      }}
                      className={cn(
                        "p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group",
                        isDomainSelected
                          ? "bg-brand-primary/10 border-brand-primary text-brand-primary dark:text-brand-teal shadow-sm"
                          : "bg-slate-50 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-brand-primary/40 text-slate-900 dark:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{domain.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-black text-sm">{domain.name}</span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {domain.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                            {domain.description}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => toggleNodeExpand(domain.id, e)}
                        className="p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-400"
                      >
                        {isDomainExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                    </div>

                    {/* Level 1 Children (Sub-wings / Committees) */}
                    <AnimatePresence>
                      {isDomainExpanded && domain.children && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-2"
                        >
                          {domain.children.map((child) => {
                            const isChildExpanded = expandedNodes[child.id];
                            const isChildSelected = selectedNode?.id === child.id;

                            return (
                              <div key={child.id} className="space-y-1.5">
                                <div
                                  onClick={() => setSelectedNode(child)}
                                  className={cn(
                                    "p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group",
                                    isChildSelected
                                      ? "bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-brand-teal shadow-xs font-bold"
                                      : "bg-white dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/80 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                                  )}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-base">{child.icon}</span>
                                    <span className="font-bold text-xs">{child.name}</span>
                                    <span className="text-[9px] text-slate-400">({child.category})</span>
                                  </div>

                                  {child.children ? (
                                    <button
                                      onClick={(e) => toggleNodeExpand(child.id, e)}
                                      className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 text-slate-400"
                                    >
                                      {isChildExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                    </button>
                                  ) : (
                                    <ChevronRight size={12} className="text-slate-300 dark:text-slate-600 group-hover:text-brand-primary transition-colors" />
                                  )}
                                </div>

                                {/* Level 2 Children (e.g. Gymkhana Clubs) */}
                                {child.children && isChildExpanded && (
                                  <div className="pl-6 border-l-2 border-dashed border-slate-200 dark:border-slate-800 ml-4 space-y-1.5 py-1">
                                    {child.children.map((subChild) => {
                                      const isSubSelected = selectedNode?.id === subChild.id;
                                      return (
                                        <div
                                          key={subChild.id}
                                          onClick={() => setSelectedNode(subChild)}
                                          className={cn(
                                            "p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between text-xs",
                                            isSubSelected
                                              ? "bg-brand-primary text-white border-brand-primary font-bold shadow-xs"
                                              : "bg-slate-50/80 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                          )}
                                        >
                                          <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs">{subChild.icon}</span>
                                            <span>{subChild.name}</span>
                                          </div>
                                          <ChevronRight size={12} className="opacity-50" />
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Node Detail Inspector (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {selectedNode ? (
              <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 sticky top-6">
                
                {/* Node Banner */}
                <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary dark:text-brand-teal rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      <span className="text-sm">{selectedNode.icon}</span>
                      <span>{selectedNode.category}</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      ID: {selectedNode.id}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {selectedNode.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Leadership / Contact Info */}
                {(selectedNode.headOrLead || selectedNode.contact) && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Leadership & Contact Coordinates
                    </span>
                    {selectedNode.headOrLead && (
                      <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                        <ShieldCheck size={16} className="text-brand-primary dark:text-brand-teal shrink-0" />
                        <span>Lead: {selectedNode.headOrLead}</span>
                      </div>
                    )}
                    {selectedNode.contact && (
                      <div className="flex items-center gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <Mail size={15} className="text-slate-400 shrink-0" />
                        <a href={`mailto:${selectedNode.contact}`} className="hover:text-brand-primary hover:underline font-mono">
                          {selectedNode.contact}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Functions & Mandates */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Core Mandates & Functions
                  </span>
                  <div className="space-y-2">
                    {selectedNode.keyFunctions.map((fn, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{fn}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 flex flex-col gap-2.5">
                  {selectedNode.id.includes("club") || selectedNode.id.includes("gym") || selectedNode.id === "student-life" ? (
                    <button
                      onClick={() => setViewMode("clubs")}
                      className="w-full py-3 bg-brand-primary hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <Users size={15} />
                      <span>Browse Official Club Directory</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : selectedNode.id.includes("ri-") || selectedNode.id === "research-innovation" ? (
                    <a
                      href="mailto:rnd@iiitkalyani.ac.in"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-center"
                    >
                      <Atom size={15} />
                      <span>Connect with SRIC / IIC Cell</span>
                      <ArrowRight size={14} />
                    </a>
                  ) : selectedNode.id.includes("car-") || selectedNode.id === "career" ? (
                    <button
                      onClick={() => onNavigateTab && onNavigateTab("opportunities")}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <Briefcase size={15} />
                      <span>Open Opportunities Portal</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <a
                      href={`mailto:${selectedNode.contact || "academic@iiitkalyani.ac.in"}`}
                      className="w-full py-3 bg-slate-900 dark:bg-slate-800 hover:bg-brand-primary text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-center"
                    >
                      <Mail size={15} />
                      <span>Inquire with Secretariat</span>
                      <ArrowRight size={14} />
                    </a>
                  )}
                </div>

              </div>
            ) : (
              <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-10 border border-slate-200/80 dark:border-slate-800 text-center space-y-3">
                <Network size={36} className="mx-auto text-slate-300 dark:text-slate-700" />
                <h4 className="font-heading font-bold text-slate-700 dark:text-slate-300">Select any entity</h4>
                <p className="text-xs text-slate-400">Click any domain or branch from the tree on the left to inspect its complete official details.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* View Mode: 13 Official Clubs Directory */}
      {viewMode === "clubs" && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
                Official Student Life & Gymkhana Clubs (13 Wings)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                From competitive coding and robotics to dramatics, dance, open-source, and media production.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                11 Gymkhana Clubs
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                2 Communities (Algoholic & FMC)
              </span>
            </div>
          </div>

          {/* Clubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officialClubsData.map((club) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-brand-navy rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group hover:border-brand-primary/40"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl font-mono text-white shadow-md group-hover:scale-105 transition-transform",
                      club.bannerGradient
                    )}>
                      {club.icon}
                    </div>

                    <div className="flex flex-col items-end">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider",
                        club.isGymkhana
                          ? "bg-brand-primary/10 text-brand-primary dark:text-brand-teal"
                          : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                      )}>
                        {club.parentBody}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 mt-1">
                        {club.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                      {club.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed mt-1">
                      {club.shortDescription}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {club.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-[10px] font-bold"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Info & Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Users size={13} className="text-slate-400" />
                      <span>{club.membersCount}+ Members</span>
                    </span>
                    <span className="truncate max-w-[150px] font-mono text-[10px] text-slate-400">
                      {club.contactEmail}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedClub(club)}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-all text-center"
                    >
                      View Details
                    </button>
                    <a
                      href={`mailto:${club.contactEmail}`}
                      className="px-3 py-2.5 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white dark:text-brand-teal rounded-xl text-xs font-bold transition-all"
                      title={`Email ${club.name}`}
                    >
                      <Mail size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* View Mode: 8 Domains Grid */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instituteStructureData.map((domain) => (
            <div
              key={domain.id}
              onClick={() => {
                setSelectedDomainId(domain.id);
                setSelectedNode(domain);
                setViewMode("tree");
              }}
              className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer group hover:border-brand-primary/40"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center text-2xl">
                  {domain.icon}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors">
                    {domain.name}
                  </h4>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mt-0.5">
                    {domain.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {domain.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-brand-primary dark:text-brand-teal">
                <span>{domain.children?.length || 0} Sub-Entities</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Club Modal Detailed Drawer */}
      <AnimatePresence>
        {selectedClub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy rounded-[2.5rem] max-w-2xl w-full p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl font-mono text-white shadow-lg",
                    selectedClub.bannerGradient
                  )}>
                    {selectedClub.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-brand-primary/10 text-brand-primary dark:text-brand-teal">
                        {selectedClub.parentBody}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{selectedClub.category}</span>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {selectedClub.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedClub(null)}
                  className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Official Charter</span>
                  <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {selectedClub.detailedDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Faculty Advisor</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedClub.facultyAdvisor}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Lead Coordinator</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedClub.leadCoordinator}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Upcoming Flagship Events</span>
                  <div className="space-y-1.5">
                    {selectedClub.upcomingEvents.map((ev, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                        <Calendar size={14} className="text-brand-primary dark:text-brand-teal shrink-0" />
                        <span>{ev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                <a
                  href={`mailto:${selectedClub.contactEmail}`}
                  className="flex-1 py-3 bg-brand-primary hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all text-center"
                >
                  <Mail size={15} />
                  <span>Send Inquiry to {selectedClub.name}</span>
                </a>
                <button
                  onClick={() => setSelectedClub(null)}
                  className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
