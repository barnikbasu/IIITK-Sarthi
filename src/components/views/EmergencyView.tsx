import { Phone, ShieldAlert, Heart, Siren, MapPin, Share2, X, AlertTriangle, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { emergencyContacts } from "../../data/mockData";
import { cn } from "../../lib/utils";
import { useState, useEffect } from "react";

export default function EmergencyView() {
  // Modal states
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isNodeOpen, setIsNodeOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);

  // Selected help node
  const [selectedNode, setSelectedNode] = useState<{ name: string; loc: string; dist: string; steps: string[] } | null>(null);

  // SOS Countdown state
  const [countdown, setCountdown] = useState(5);
  const [sosSent, setSosSent] = useState(false);

  // Care chat state
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ sender: string; text: string }[]>([
    { sender: "Sarthi Counselor (Anonymous)", text: "Hello. We are here to listen and help without judgment. Everything discussed is 100% confidential. How are you feeling today?" }
  ]);

  // Toast / notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // SOS Countdown logic
  useEffect(() => {
    let timer: any;
    if (isSosOpen && countdown > 0 && !sosSent) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    } else if (isSosOpen && countdown === 0 && !sosSent) {
      setSosSent(true);
    }
    return () => clearTimeout(timer);
  }, [isSosOpen, countdown, sosSent]);

  const handleOpenSos = () => {
    setCountdown(5);
    setSosSent(false);
    setIsSosOpen(true);
  };

  const handleCancelSos = () => {
    setIsSosOpen(false);
    triggerToast("Emergency SOS broadcast canceled successfully.");
  };

  const handleShareLocation = () => {
    setIsShareOpen(true);
    setTimeout(() => {
      setIsShareOpen(false);
      triggerToast("Secure GPS telemetry broadcasted to Campus Warden & Security Dispatch!");
    }, 2000);
  };

  const handleNodeClick = (point: { name: string; loc: string; dist: string }) => {
    setSelectedNode({
      ...point,
      steps: [
        `Exit your current classroom immediately.`,
        `Take the main staircase to the Ground Floor lobby.`,
        `Follow signs toward ${point.loc}. Approximate ETA: 1.5 mins.`
      ]
    });
    setIsNodeOpen(true);
  };

  const handleSendCare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const text = chatMessage.trim();
    setChatMessage("");
    setChatHistory(prev => [...prev, { sender: "Barnik (You)", text }]);

    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        sender: "Sarthi Counselor (Anonymous)", 
        text: "Thank you for sharing that with me. I appreciate your openness. Remember, we have both peer networks and licensed psychologists ready to support you. Would you like to schedule an anonymous call or virtual meeting this evening?" 
      }]);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="bg-rose-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-rose-200 dark:shadow-none overflow-hidden relative border border-rose-500">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-32 -translate-y-32 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
              <h2 className="text-4xl font-black text-white/95 tracking-tighter mb-4 uppercase">Emergency Response Center</h2>
              <p className="text-rose-100 max-w-xl font-semibold mb-8 text-sm">One-tap actions for critical assistance. Available 24/7 for IIIT Kalyani campus residents and staff.</p>
              
              <div className="flex flex-wrap gap-4">
                  <motion.button 
                    onClick={handleOpenSos}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 bg-white text-rose-600 rounded-2xl font-black shadow-xl"
                  >
                      <Siren size={24} className="animate-pulse" /> ACTIVATE SOS
                  </motion.button>
                  
                  <motion.button 
                    onClick={handleShareLocation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 bg-rose-500 text-white border-2 border-rose-400 rounded-2xl font-bold shadow-xl"
                  >
                      <Share2 size={24} /> SHARE LOCATION
                  </motion.button>
              </div>
          </div>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-status-danger/10 border border-status-danger/20 rounded-2xl flex items-center gap-3 text-status-danger font-black text-xs uppercase tracking-widest justify-center z-40"
          >
            <AlertTriangle size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyContacts.map((contact, idx) => {
              const Icon = contact.category === "Medical" ? Heart : contact.category === "Security" ? ShieldAlert : Siren;
              const colorClass = contact.category === "Medical" ? "text-status-success bg-status-success/10" : contact.category === "Security" ? "text-status-danger bg-status-danger/10" : "text-brand-primary bg-brand-primary/10";
              
              return (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 p-6 rounded-[2.5rem] shadow-sm flex items-center justify-between group overflow-hidden relative"
                  >
                       <div className="flex items-center gap-5">
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", colorClass)}>
                                <Icon size={28} />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter opacity-60 text-[10px]">{contact.title}</h4>
                                <p className="text-xl font-black text-slate-800 dark:text-slate-200 mt-0.5 tracking-tighter">{contact.number}</p>
                            </div>
                       </div>
                       <a href={`tel:${contact.number}`} className="w-12 h-12 rounded-full bg-slate-900 dark:bg-brand-primary text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg z-10">
                           <Phone size={20} />
                       </a>
                  </motion.div>
              );
          })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-6 tracking-tight uppercase leading-none">
                    <MapPin size={24} className="text-status-danger" />
                    Rapid Help Nodes
                </h3>
                <div className="space-y-4">
                    {[
                        { name: "First Aid Center", loc: "Academic G-04", dist: "200m away" },
                        { name: "Global Security Room", loc: "Main Entrance", dist: "500m away" },
                        { name: "Crisis Cell", loc: "Hostel A Lobby", dist: "350m away" },
                    ].map((point, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleNodeClick(point)}
                          className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-brand-primary/10 shadow-inner"
                        >
                             <div>
                                 <h5 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter text-sm">{point.name}</h5>
                                 <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">{point.loc}</p>
                             </div>
                             <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal bg-brand-primary/10 dark:bg-brand-primary/20 px-3 py-1 rounded-full uppercase tracking-tighter shrink-0">{point.dist}</span>
                        </div>
                    ))}
                </div>
          </div>
          
          <div className="bg-brand-teal/5 dark:bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-[2.5rem] relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
                <div className="relative z-10">
                    <h3 className="text-xl font-black text-brand-navy dark:text-brand-teal mb-2 tracking-tight uppercase leading-none">Sarthi Care Network</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-semibold italic">Connect anonymously with peer support or professional counselors. You are not alone on this journey.</p>
                </div>
                <div className="relative z-10">
                    <button 
                      onClick={() => setIsCareOpen(true)}
                      className="px-8 py-4 bg-brand-teal text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-teal/20 hover:opacity-90 transition-all"
                    >
                        INITIATE CARE
                    </button>
                </div>
                <Heart size={140} className="absolute bottom-0 right-0 text-brand-teal/10 dark:text-brand-teal/5 translate-y-8 translate-x-8 -rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          </div>
      </div>

      {/* SOS TRIGGER DIALOG COUNTDOWN */}
      <AnimatePresence>
        {isSosOpen && (
          <div className="fixed inset-0 bg-rose-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 45 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-brand-navy border-4 border-rose-600 rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl relative text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2.5 bg-rose-100">
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: sosSent ? "100%" : "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-rose-600"
                />
              </div>

              <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-ping">
                 <Siren size={48} />
              </div>

              {!sosSent ? (
                <>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Emergency SOS Triggered</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-6">Dispatched to IIIT Kalyani Command Center in:</p>
                  <span className="text-7xl font-black text-rose-600 tracking-tighter block mb-8">{countdown}s</span>
                  
                  <button 
                    onClick={handleCancelSos}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-xl shadow-black/20"
                  >
                     Cancel SOS Alert
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-black text-status-danger uppercase tracking-tighter mb-2">SOS Dispatched</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-bold mb-8">
                     Emergency signal sent with current GPS coords. Security Wardens are mobilizing to Academic Block 1. Keep your phone active.
                  </p>
                  <button 
                    onClick={() => setIsSosOpen(false)}
                    className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-xl shadow-rose-600/20"
                  >
                     Dismiss Signal
                  </button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SHARE LOCATION TELEMETRY LOADING STATE */}
      <AnimatePresence>
        {isShareOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-sm p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Accessing Campus GPS</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">Encrypting spatial telemetry...</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RAPID HELP NODE WALK PATH DETAILS */}
      <AnimatePresence>
        {isNodeOpen && selectedNode && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => {
                  setIsNodeOpen(false);
                  setSelectedNode(null);
                }}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-status-danger/10 text-status-danger flex items-center justify-center">
                   <MapPin size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">RAPID ACCESS ROUTE</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">{selectedNode.name}</h3>
                  <p className="text-xs text-brand-primary dark:text-brand-teal font-black uppercase mt-1 tracking-wider">{selectedNode.loc} • {selectedNode.dist}</p>
                </div>
              </div>

              <div className="space-y-4 text-xs font-semibold">
                 <p className="text-slate-500 font-bold dark:text-slate-400">Step-by-step path to reach medical/emergency center:</p>
                 {selectedNode.steps.map((st, idx) => (
                   <div key={idx} className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                      <div className="w-5 h-5 bg-brand-primary/10 text-brand-primary dark:text-brand-teal rounded-full flex items-center justify-center font-black text-[10px] shrink-0">{idx + 1}</div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{st}</p>
                   </div>
                 ))}
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end mt-6">
                <button 
                  onClick={() => setIsNodeOpen(false)}
                  className="px-6 py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:opacity-95 transition-all"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ANONYMOUS COUNSELOR CHAT MODAL */}
      <AnimatePresence>
        {isCareOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsCareOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center">
                   <Heart size={24} className="text-brand-teal animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ANONYMOUS ADVOCACY NET</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Sarthi Care Advocacy Support</h3>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 h-[240px] overflow-y-auto space-y-3 mb-4 flex flex-col scrollbar-hide text-xs">
                 {chatHistory.map((item, idx) => (
                   <div key={idx} className={cn("flex flex-col max-w-[85%] p-3 rounded-2xl shadow-sm", 
                     item.sender.includes("Barnik") 
                       ? "self-end bg-brand-teal text-white rounded-tr-none" 
                       : "self-start bg-white dark:bg-brand-navy text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-850 rounded-tl-none font-semibold"
                   )}>
                      <span className="text-[8px] font-black uppercase opacity-60 block mb-1">{item.sender}</span>
                      <p className="leading-relaxed">{item.text}</p>
                   </div>
                 ))}
              </div>

              <form onSubmit={handleSendCare} className="relative">
                 <input 
                   type="text"
                   required
                   value={chatMessage}
                   onChange={(e) => setChatMessage(e.target.value)}
                   placeholder="Type a completely anonymous message..."
                   className="w-full pl-5 pr-14 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all placeholder:text-slate-400"
                 />
                 <button 
                   type="submit"
                   className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-brand-teal text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
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
