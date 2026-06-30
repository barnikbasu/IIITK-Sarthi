import { Users, Calendar, Trophy, Image, MessageSquare, Info, Plus, X, Check, CheckCircle2, ChevronRight, Send, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { useState } from "react";

interface Club {
  id: string;
  name: string;
  category: string;
  members: number;
  logo: string;
  joined?: boolean;
  requested?: boolean;
}

const initialClubs: Club[] = [
  { id: "c1", name: "Apex - Coding Club", category: "Technical", members: 120, logo: "💻" },
  { id: "c2", name: "Rhythms - Music Club", category: "Cultural", members: 85, logo: "🎸" },
  { id: "c3", name: "Shutterbugs - Photography", category: "Art", members: 60, logo: "📸" },
  { id: "c4", name: "Gymkhana", category: "Sports", members: 400, logo: "🏆" },
];

interface EventItem {
  id: string;
  title: string;
  clubName: string;
  date: string;
  month: string;
  location: string;
  rsvps: number;
  isFree: boolean;
  rsvped?: boolean;
}

const initialEvents: EventItem[] = [
  { id: "e1", title: "Cybersecurity Workshop", clubName: "Apex Coding Club", date: "22", month: "MAY", location: "Lab 102", rsvps: 85, isFree: true },
  { id: "e2", title: "Summer Beats Jam Session", clubName: "Rhythms Music Club", date: "28", month: "MAY", location: "Hostel Lawn", rsvps: 150, isFree: true },
];

export default function ClubsView() {
  const [clubList, setClubList] = useState<Club[]>(initialClubs);
  const [eventList, setEventList] = useState<EventItem[]>(initialEvents);
  
  // Modal toggles
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isGovernanceOpen, setIsGovernanceOpen] = useState(false);
  const [isDiscourseOpen, setIsDiscourseOpen] = useState(false);

  // Form states for register club
  const [regName, setRegName] = useState("");
  const [regCategory, setRegCategory] = useState("Technical");
  const [regLogo, setRegLogo] = useState("🚀");

  // Live discourse chat state
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ sender: string, text: string }[]>([
    { sender: "Sarthi AI moderator", text: "Welcome to the IIIT Kalyani Discourse space. How can we elevate our student life this semester?" },
    { sender: "Barnik (You)", text: "We need more technical sessions on cloud architectures and local databases." },
    { sender: "Apex Moderator", text: "Agreed! We are scheduling an AWS/GCP cloud boot camp for early June. Stay tuned!" }
  ]);

  // Toast / notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleJoinClub = (id: string) => {
    setClubList(prev => prev.map(club => {
      if (club.id === id) {
        const alreadyRequested = club.requested || club.joined;
        if (alreadyRequested) {
          triggerToast(`Already connected with ${club.name}`);
          return club;
        } else {
          triggerToast(`Join request successfully submitted to ${club.name}!`);
          return { ...club, requested: true, members: club.members + 1 };
        }
      }
      return club;
    }));
  };

  const handleRSVP = (id: string) => {
    setEventList(prev => prev.map(ev => {
      if (ev.id === id) {
        if (ev.rsvped) {
          triggerToast(`Cancelled RSVP for ${ev.title}`);
          return { ...ev, rsvped: false, rsvps: ev.rsvps - 1 };
        } else {
          triggerToast(`RSVP Confirmed for ${ev.title}! Check-in via Bluetooth enabled.`);
          return { ...ev, rsvped: true, rsvps: ev.rsvps + 1 };
        }
      }
      return ev;
    }));
  };

  const handleRegisterClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) return;

    const newClub: Club = {
      id: `club-${Date.now()}`,
      name: regName.trim(),
      category: regCategory,
      members: 1,
      logo: regLogo,
      joined: true,
    };

    setClubList(prev => [...prev, newClub]);
    setRegName("");
    setIsRegisterOpen(false);
    triggerToast(`Congratulations! '${newClub.name}' is registered and undergoing approval.`);
  };

  const handleSendDiscourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage.trim();
    setChatMessage("");
    setChatHistory(prev => [...prev, { sender: "Barnik (You)", text: userText }]);

    // Simulated quick reply from Sarthi Co-pilot / Club moderators
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        sender: "Sarthi AI Coach", 
        text: `Your comment about "${userText}" has been logged in the student committee dashboard. Let's make it happen!` 
      }]);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Campus Community</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Discover your passion and connect with like-minded students.</p>
        </div>
        <button 
          onClick={() => setIsGovernanceOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary dark:text-brand-teal border border-brand-primary/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary/10 transition-all shrink-0"
        >
          <Info size={18} /> Governance Policy
        </button>
      </div>

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/25 rounded-2xl flex items-center gap-3 text-brand-primary dark:text-brand-teal font-black text-xs uppercase tracking-widest justify-center z-40"
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubList.map((club, idx) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-brand-navy p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center justify-between"
              >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-inner">
                        {club.logo}
                    </div>
                    <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest">{club.category}</span>
                    <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1 tracking-tight">{club.name}</h4>
                    <div className="flex items-center gap-2 text-slate-400 mt-2 text-xs font-bold justify-center">
                        <Users size={14} className="text-slate-400" />
                        <span>{club.members} Members</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 w-full flex gap-3">
                       <button 
                         onClick={() => triggerToast(`Academic guide document opened for ${club.name}`)}
                         className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-primary/10 hover:text-brand-primary transition-all border border-slate-200/50 dark:border-slate-800"
                       >
                           DOCS
                       </button>
                       <button 
                         onClick={() => handleJoinClub(club.id)}
                         className={cn(
                           "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg",
                           club.requested ? "bg-amber-500 text-white shadow-amber-500/10" :
                           club.joined ? "bg-status-success text-white shadow-status-success/10" :
                           "bg-brand-primary text-white hover:opacity-90 shadow-brand-primary/10"
                         )}
                       >
                           {club.requested ? "PENDING" : club.joined ? "JOINED" : "JOIN"}
                       </button>
                  </div>
              </motion.div>
          ))}
          
          <motion.button
            onClick={() => setIsRegisterOpen(true)}
            whileHover={{ scale: 0.98 }}
            className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-slate-400 hover:border-brand-primary/30 hover:text-brand-primary transition-all gap-3 hover:bg-brand-primary/5 min-h-[260px]"
          >
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-inner">
                  <Plus size={24} />
              </div>
              <span className="font-black text-xs uppercase tracking-widest">Register Club</span>
          </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Priority Events RSVP Tracker */}
          <div className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
               <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 tracking-tight">
                      <Calendar size={24} className="text-brand-primary dark:text-brand-teal" />
                      Priority Events
                  </h3>
                  <div className="space-y-4">
                      {eventList.map(ev => (
                          <div 
                            key={ev.id} 
                            onClick={() => handleRSVP(ev.id)}
                            className={cn(
                              "flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-brand-navy/60 transition-all border cursor-pointer shadow-sm group",
                              ev.rsvped ? "border-brand-primary/30 bg-brand-primary/5 dark:bg-brand-primary/10" : "border-transparent hover:border-brand-primary/20"
                            )}
                          >
                               <div className="w-16 h-16 bg-white dark:bg-brand-navy rounded-xl flex flex-col items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800 shadow-inner">
                                   <span className="text-brand-primary dark:text-brand-teal font-black text-xl leading-none">{ev.date}</span>
                                   <span className="text-[10px] font-black text-slate-400 uppercase">{ev.month}</span>
                               </div>
                               <div className="flex-1">
                                   <h5 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-primary dark:group-hover:text-brand-teal tracking-tight transition-colors">{ev.title}</h5>
                                   <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight">{ev.clubName} • {ev.location}</p>
                                   <div className="flex items-center gap-3 mt-2">
                                       <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary dark:text-brand-teal text-[10px] font-black rounded-md uppercase tracking-tighter">{ev.rsvps} RSVP</span>
                                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">{ev.isFree ? "FREE ACCESS" : "STUDENT ID REQ"}</span>
                                       {ev.rsvped && (
                                         <span className="text-[10px] font-black text-status-success uppercase tracking-widest flex items-center gap-1">
                                            <Check size={12} strokeWidth={3} /> Registered
                                         </span>
                                       )}
                                   </div>
                               </div>
                          </div>
                      ))}
                  </div>
               </div>
               <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400 dark:text-slate-500 font-semibold">
                  <span>Double-tap or click any card to register your RSVP presence.</span>
               </div>
          </div>

          {/* Sarthi Discourse Community Card */}
          <div className="bg-brand-navy rounded-[2.5rem] p-8 text-white relative overflow-hidden border border-white/5 shadow-2xl shadow-brand-primary/10 flex flex-col justify-between">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
               <div className="relative z-10">
                   <h3 className="text-xl font-black mb-2 tracking-tight">Sarthi Intelligence Space</h3>
                   <p className="text-slate-400 text-sm leading-relaxed mb-6 font-semibold italic">Join active discussions moderated by AI. Share suggestions, resources, or collaborate on campus projects.</p>
                   <div className="flex -space-x-3 mb-6">
                       {[1, 2, 3, 4].map(i => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-navy bg-slate-800 overflow-hidden ring-2 ring-brand-primary/20">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 13}`} alt="avatar" />
                           </div>
                       ))}
                       <div className="w-10 h-10 rounded-full border-2 border-brand-navy bg-brand-primary flex items-center justify-center text-[10px] font-black">+280</div>
                   </div>
               </div>
               
               <div className="relative z-10">
                 <button 
                   onClick={() => setIsDiscourseOpen(true)}
                   className="px-8 py-4 bg-white text-brand-navy rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl shadow-black/20"
                 >
                     ENTER DISCOURSE
                 </button>
               </div>
               <MessageSquare size={140} className="absolute bottom-0 right-0 text-white/5 translate-y-6 translate-x-6 -rotate-12 pointer-events-none" />
          </div>
      </div>

      {/* REGISTER NEW CLUB MODAL */}
      <AnimatePresence>
        {isRegisterOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsRegisterOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest font-semibold">CLUB REGISTRATION</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">Propose New Campus Club</h3>
              </div>

              <form onSubmit={handleRegisterClubSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">Proposed Club Name</label>
                  <input 
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Sarthi Devs, IIITK Chess Club"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">Category</label>
                    <select
                      value={regCategory}
                      onChange={(e) => setRegCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                    >
                      <option value="Technical">Technical</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Art & Design">Art & Design</option>
                      <option value="Sports">Sports</option>
                      <option value="Social Services">Social Services</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">Avatar / Emoji</label>
                    <input 
                      type="text"
                      required
                      value={regLogo}
                      onChange={(e) => setRegLogo(e.target.value)}
                      placeholder="e.g. ♟️, 🚀, 🎭"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsRegisterOpen(false)}
                    className="px-5 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:opacity-95 transition-all"
                  >
                    Register
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GOVERNANCE MODAL */}
      <AnimatePresence>
        {isGovernanceOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-xl p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsGovernanceOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center">
                   <Info size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">OFFICIAL STATUTE</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">IIIT Kalyani Club Governance</h3>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed overflow-y-auto max-h-[300px] pr-2 scrollbar-hide">
                 <p className="font-black text-slate-800 dark:text-white uppercase tracking-wider">1. Registration Criteria</p>
                 <p>Every proposed club must secure at least 15 student co-signatories and have 1 faculty mentor appointed from the corresponding engineering departments.</p>

                 <p className="font-black text-slate-800 dark:text-white uppercase tracking-wider">2. Budgetary Disbursements</p>
                 <p>Funds are distributed quarterly based on active workshop count, RSVP conversion metrics collected via Bluetooth, and community impact reviews. Apex and Gymkhana currently receive Tier-A funding profiles.</p>

                 <p className="font-black text-slate-800 dark:text-white uppercase tracking-wider">3. Attendance Mandate</p>
                 <p>Club activities must not overlap with primary scheduling hours (9:00 AM - 5:00 PM). Active participants maintain up to 5% safe buffer on official class attendance ratings.</p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button 
                  onClick={() => setIsGovernanceOpen(false)}
                  className="px-6 py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:opacity-95 transition-all"
                >
                  Understand and Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DISCOURSE SPACE MODAL */}
      <AnimatePresence>
        {isDiscourseOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsDiscourseOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center animate-pulse">
                   <MessageSquare size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ACTIVE BLUEPRINT SYNC</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Sarthi Intelligence Discourse</h3>
                </div>
              </div>

              {/* Chat screen */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 h-[240px] overflow-y-auto space-y-3 mb-4 flex flex-col scrollbar-hide text-xs">
                 {chatHistory.map((item, idx) => (
                   <div key={idx} className={cn("flex flex-col max-w-[85%] p-3 rounded-2xl shadow-sm", 
                     item.sender.includes("Barnik") 
                       ? "self-end bg-brand-primary text-white rounded-tr-none" 
                       : "self-start bg-white dark:bg-brand-navy text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-850 rounded-tl-none font-semibold"
                   )}>
                      <span className="text-[8px] font-black uppercase opacity-60 block mb-1">{item.sender}</span>
                      <p className="leading-relaxed">{item.text}</p>
                   </div>
                 ))}
              </div>

              <form onSubmit={handleSendDiscourse} className="relative">
                 <input 
                   type="text"
                   required
                   value={chatMessage}
                   onChange={(e) => setChatMessage(e.target.value)}
                   placeholder="Post anonymous suggestion or contribute to active roadmap..."
                   className="w-full pl-5 pr-14 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all placeholder:text-slate-400"
                 />
                 <button 
                   type="submit"
                   className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-brand-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
                 >
                    <Send size={14} />
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
