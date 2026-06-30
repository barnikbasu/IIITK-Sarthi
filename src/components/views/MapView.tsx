import { MapPin, Navigation, Search, Layers, Compass, ExternalLink, X, HelpCircle, Check, ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { cn } from "../../lib/utils";

interface CampusLocation {
  name: string;
  type: string;
  info: string;
  id: string;
  coords: { x: number; y: number }; // Percentage coords on our SVG map
  details: string;
}

const campusLocations: CampusLocation[] = [
  { id: "ab1", name: "Academic Block - 1", type: "Main", info: "Classrooms, Labs & Faculty Cabin", coords: { x: 30, y: 35 }, details: "Main block holding lecture rooms, chemistry & physics laboratories, plus principal offices." },
  { id: "ab2", name: "Academic Block - 2", type: "Labs", info: "Computer Labs & Server Room", coords: { x: 65, y: 30 }, details: "CSE research hub with state-of-the-art server setups, embedded systems, and deep-learning server stacks." },
  { id: "bh1", name: "Boy's Hostel 1", type: "Residential", info: "BH-1, Mess & Common Room", coords: { x: 25, y: 75 }, details: "Main boys dorms hosting dining halls, indoor table tennis, and safe student recreation sections." },
  { id: "bh2", name: "Boy's Hostel 2", type: "Residential", info: "BH-2, Laundry Area", coords: { x: 45, y: 80 }, details: "Newly constructed accommodation block with single/double shared beds and advanced laundry facilities." },
  { id: "gh", name: "Girls Hostel", type: "Residential", info: "Staff Quarters Area", coords: { x: 75, y: 75 }, details: "High-security residential building housing female research scholars and university staff families." },
  { id: "lib", name: "Library", type: "Facility", info: "Main Reading Room & Digital Library", coords: { x: 50, y: 48 }, details: "Enormous reading room and access portal to IEEE, ACM, and international engineering research databases." },
];

export default function MapView() {
  const [selectedLoc, setSelectedLoc] = useState<CampusLocation>(campusLocations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSatellite, setIsSatellite] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);

  // Directions state
  const [dirFrom, setDirFrom] = useState("bh1");
  const [dirTo, setDirTo] = useState("ab2");
  const [steps, setSteps] = useState<string[]>([]);

  const handleSelectLocation = (loc: CampusLocation) => {
    setSelectedLoc(loc);
  };

  const handleGenerateDirections = (e: React.FormEvent) => {
    e.preventDefault();
    const fromName = campusLocations.find(l => l.id === dirFrom)?.name || "Start";
    const toName = campusLocations.find(l => l.id === dirTo)?.name || "Destination";
    
    setSteps([
      `Exit ${fromName} and head towards the central plaza.`,
      `Pass beside the Main Reading Library and turn left.`,
      `Follow the paved pathway. ${toName} is straight ahead on your right (approx 2 mins walk).`
    ]);
  };

  const filteredLocations = campusLocations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    loc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Interactive Campus Map</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Navigate the IIIT Kalyani campus with ease. Find labs, classrooms, and hostels.</p>
        </div>
        <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => setIsSatellite(!isSatellite)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                isSatellite 
                  ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/15"
                  : "bg-white dark:bg-brand-navy border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
              )}
            >
                <Layers size={18} /> {isSatellite ? "Vector Mode" : "Blueprint Satellite"}
            </button>
            <button 
              onClick={() => setIsDirectionsOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-brand-primary rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-brand-primary/20 hover:opacity-90 transition-all"
            >
                <Navigation size={18} /> Get Directions
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Visual Map Area */}
        <div className="lg:col-span-8 space-y-6">
           <div className={cn(
             "aspect-[16/10] rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden relative group shadow-2xl transition-all",
             isSatellite 
               ? "bg-gradient-to-br from-slate-950 to-brand-navy text-white" 
               : "bg-slate-50 dark:bg-brand-navy text-slate-850"
           )}>
                {/* GRID LINES representing the blueprint */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Simulated Campus Layout via beautiful styled elements */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                   {/* Campus Road Network */}
                   <path d="M 30,35 L 50,48 L 65,30 M 25,75 L 45,80 L 75,75 M 50,48 L 45,80" fill="none" stroke={isSatellite ? "#1A4FD8" : "#cbd5e1"} strokeWidth="1.5" strokeDasharray="3,3" />
                   
                   {/* Visual Block Markers */}
                   {campusLocations.map((loc) => {
                     const isSelected = selectedLoc.id === loc.id;
                     return (
                       <g key={loc.id}>
                         <rect 
                           x={loc.coords.x - 4} 
                           y={loc.coords.y - 4} 
                           width="8" 
                           height="8" 
                           rx="2" 
                           className={cn(
                             "transition-all cursor-pointer", 
                             isSelected 
                               ? "fill-brand-primary stroke-white stroke-2" 
                               : isSatellite ? "fill-slate-800 stroke-slate-700 hover:fill-slate-700" : "fill-white stroke-slate-350 hover:fill-slate-100"
                           )}
                           onClick={() => handleSelectLocation(loc)}
                         />
                         <text 
                           x={loc.coords.x} 
                           y={loc.coords.y - 6} 
                           textAnchor="middle" 
                           className={cn(
                             "text-[3px] font-black uppercase tracking-wider select-none cursor-pointer",
                             isSelected ? "fill-brand-primary" : isSatellite ? "fill-slate-400" : "fill-slate-500"
                           )}
                           onClick={() => handleSelectLocation(loc)}
                         >
                           {loc.type}
                         </text>
                       </g>
                     );
                   })}
                </svg>

                {/* Floating GPS Target Marker */}
                <AnimatePresence>
                  {selectedLoc && (
                    <motion.div 
                        initial={{ scale: 0, x: "-50%", y: "-50%" }}
                        animate={{ scale: 1, x: "-50%", y: "-50%" }}
                        style={{ left: `${selectedLoc.coords.x}%`, top: `${selectedLoc.coords.y}%` }}
                        className="absolute p-3 bg-white dark:bg-brand-navy shadow-2xl rounded-2xl flex items-center gap-3 z-20 border border-slate-200 dark:border-slate-800 pointer-events-none"
                    >
                        <div className="w-8 h-8 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/25">
                            <MapPin size={18} className="animate-bounce" />
                        </div>
                        <div className="pr-2">
                            <p className="text-[8px] font-black text-brand-primary dark:text-brand-teal leading-none uppercase tracking-widest">{selectedLoc.type} Block</p>
                            <p className="text-xs font-black text-slate-800 dark:text-slate-100 leading-none mt-1 tracking-tight uppercase">{selectedLoc.name}</p>
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* You are Here tag */}
                <div className="absolute bottom-6 left-6 p-5 bg-white/95 dark:bg-brand-navy/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl text-slate-800 dark:text-white shadow-xl z-10">
                    <p className="text-[9px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest mb-1 leading-none">Your Location (Simulated)</p>
                    <p className="font-black text-sm tracking-tight uppercase leading-none">Academic Block 1</p>
                </div>
           </div>

           {/* Location Detailed Panel */}
           <div className="p-6 bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-2">
              <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest bg-brand-primary/10 px-2.5 py-1 rounded-md">{selectedLoc.type} BLOCK DETAILS</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">{selectedLoc.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">{selectedLoc.info}</p>
              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">{selectedLoc.details}</p>
           </div>
        </div>

        {/* Locations List */}
        <div className="lg:col-span-4 space-y-6">
            <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search campus directory..."
                  className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary font-bold text-xs"
                />
            </div>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 scrollbar-hide">
                {filteredLocations.map((loc) => {
                  const isSelected = selectedLoc.id === loc.id;
                  return (
                    <motion.div
                        key={loc.id}
                        onClick={() => handleSelectLocation(loc)}
                        whileHover={{ x: 4 }}
                        className={cn(
                          "p-4 bg-white dark:bg-brand-navy rounded-2xl border transition-all cursor-pointer flex items-center gap-4 group shadow-sm",
                          isSelected 
                            ? "border-brand-primary/40 bg-brand-primary/5 dark:bg-brand-primary/10 shadow-md" 
                            : "border-slate-200 dark:border-slate-800 hover:border-brand-primary/20 hover:shadow-md"
                        )}
                    >
                        <div className={cn(
                          "w-10 h-10 rounded-xl transition-all flex items-center justify-center shadow-inner",
                          isSelected 
                            ? "bg-brand-primary text-white" 
                            : "bg-slate-50 dark:bg-slate-800 text-slate-400"
                        )}>
                            <MapPin size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-black text-sm text-slate-900 dark:text-slate-100 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors tracking-tight uppercase leading-none mb-1 truncate">{loc.name}</h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest leading-none truncate">{loc.info}</p>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-primary transition-all shrink-0" />
                    </motion.div>
                  );
                })}
            </div>
        </div>

      </div>

      {/* DIRECTIONS SETUP MODAL */}
      <AnimatePresence>
        {isDirectionsOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => {
                  setIsDirectionsOpen(false);
                  setSteps([]);
                }}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center">
                   <Navigation size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-semibold">AR ROUTING CORE</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Campus Spatial Routing</h3>
                </div>
              </div>

              <form onSubmit={handleGenerateDirections} className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">Starting Point</label>
                       <select
                         value={dirFrom}
                         onChange={(e) => setDirFrom(e.target.value)}
                         className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                       >
                         {campusLocations.map(loc => (
                           <option key={loc.id} value={loc.id}>{loc.name}</option>
                         ))}
                       </select>
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-bold">Destination</label>
                       <select
                         value={dirTo}
                         onChange={(e) => setDirTo(e.target.value)}
                         className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                       >
                         {campusLocations.map(loc => (
                           <option key={loc.id} value={loc.id}>{loc.name}</option>
                         ))}
                       </select>
                    </div>
                 </div>

                 <button 
                   type="submit"
                   className="w-full py-4 bg-brand-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-lg shadow-brand-primary/20"
                 >
                    Calculate Walking Path
                 </button>
              </form>

              {/* Steps display */}
              <AnimatePresence>
                {steps.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3.5 text-xs font-semibold"
                  >
                     <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary dark:text-brand-teal">DIRECTIONS LIST</p>
                     {steps.map((st, sIdx) => (
                       <div key={sIdx} className="flex gap-3 items-start">
                          <div className="w-5 h-5 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">{sIdx + 1}</div>
                          <p className="text-slate-700 dark:text-slate-350 leading-relaxed">{st}</p>
                       </div>
                     ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
