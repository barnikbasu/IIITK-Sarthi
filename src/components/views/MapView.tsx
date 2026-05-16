import { MapPin, Navigation, Search, Layers, Compass, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const campusLocations = [
  { name: "Academic Block - 1", type: "Main", info: "Classrooms, Labs & Faculty Cabin" },
  { name: "Academic Block - 2", type: "Labs", info: "Computer Labs & Server Room" },
  { name: "Boy's Hostel 1", type: "Residential", info: "BH-1, Mess & Common Room" },
  { name: "Boy's Hostel 2", type: "Residential", info: "BH-2, Laundry Area" },
  { name: "Girls Hostel", type: "Residential", info: "Staff Quarters Area" },
  { name: "Library", type: "Facility", info: "Main Reading Room & Digital Library" },
];

export default function MapView() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Interactive Campus Map</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Navigate the IIIT Kalyani campus with ease. Find labs, classrooms, and hostels.</p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all">
                <Layers size={18} /> Satellite
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-brand-primary/20 hover:opacity-90 transition-all">
                <Navigation size={18} /> Directions
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Visual Map Area */}
        <div className="lg:col-span-8">
           <div className="aspect-[16/10] bg-brand-navy rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden relative group shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <Compass size={64} className="text-slate-800 dark:text-slate-300 opacity-20 mx-auto mb-4 animate-slow-spin" />
                        <p className="text-slate-700 dark:text-slate-400 font-black tracking-widest uppercase text-xs">Simulated Spatial Grid</p>
                        <p className="text-brand-primary dark:text-brand-teal text-[10px] mt-2 uppercase font-black tracking-tighter">Live AR Routing Support Enabled</p>
                    </div>
                </div>
                
                {/* Simulated Pins */}
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1/4 left-1/3 p-4 bg-white/90 dark:bg-brand-navy/90 backdrop-blur-xl shadow-2xl rounded-2xl flex items-center gap-4 cursor-pointer z-10 border border-white/20"
                >
                    <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
                        <MapPin size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-brand-primary dark:text-brand-teal leading-none uppercase tracking-widest">Main Block</p>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-100 leading-none mt-1.5 tracking-tight uppercase">Admin Center</p>
                    </div>
                </motion.div>

                <div className="absolute bottom-8 left-8 p-6 bg-brand-navy/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] text-white shadow-2xl">
                    <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mb-1.5">You are here</p>
                    <p className="font-black text-lg tracking-tight uppercase">Academic Block 1</p>
                </div>
           </div>
        </div>

        {/* Locations List */}
        <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight uppercase">Directory</h3>
            <div className="space-y-4">
                {campusLocations.map((loc, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ x: 6 }}
                        className="p-5 bg-white dark:bg-brand-navy rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-primary/20 hover:shadow-xl transition-all cursor-pointer flex items-center gap-5 group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-all flex items-center justify-center shadow-inner">
                            <MapPin size={22} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-black text-slate-900 dark:text-slate-100 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors tracking-tight uppercase leading-none mb-1.5">{loc.name}</h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest leading-none">{loc.info}</p>
                        </div>
                        <ExternalLink size={16} className="text-slate-300 group-hover:text-brand-primary transition-all" />
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}
