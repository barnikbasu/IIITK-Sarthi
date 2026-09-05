import React, { useState, useEffect, useRef } from "react";
import { 
  Phone, 
  ShieldAlert, 
  Heart, 
  Siren, 
  MapPin, 
  X, 
  Volume2, 
  VolumeX, 
  Radio, 
  AlertTriangle, 
  Check, 
  Flashlight,
  ExternalLink,
  Lock,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

interface SOSOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SOSOverlay({ isOpen, onClose }: SOSOverlayProps) {
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [dialedContact, setDialedContact] = useState<string | null>(null);
  const [strobeActive, setStrobeActive] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<any>(null);

  // Audio Siren Synthesis using Web Audio API
  const startSirenAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;

      let high = false;
      intervalRef.current = setInterval(() => {
        if (oscillatorRef.current && ctx.state === "running") {
          const targetFreq = high ? 700 : 1100;
          oscillatorRef.current.frequency.exponentialRampToValueAtTime(targetFreq, ctx.currentTime + 0.3);
          high = !high;
        }
      }, 400);

      setSirenPlaying(true);
    } catch (e) {
      console.warn("Web Audio API not allowed without user interaction yet", e);
    }
  };

  const stopSirenAudio = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
    setSirenPlaying(false);
  };

  const toggleSiren = () => {
    if (sirenPlaying) {
      stopSirenAudio();
    } else {
      startSirenAudio();
    }
  };

  useEffect(() => {
    return () => {
      stopSirenAudio();
    };
  }, []);

  const emergencyActions = [
    {
      id: "medical",
      title: "Medical Emergency",
      sub: "24/7 Campus Health Emergency & Medical Assistance",
      number: "033-2582-8562",
      tel: "033-2582-8562",
      icon: Heart,
      bg: "from-rose-600 to-red-800",
      border: "border-rose-400",
      delay: 0.1
    },
    {
      id: "office",
      title: "General Office & Contact Support",
      sub: "Administrative Office & Student Assistance Desk",
      number: "033-2582-5003",
      tel: "033-2582-5003",
      icon: Building2,
      bg: "from-sky-600 to-blue-800",
      border: "border-sky-400",
      delay: 0.2
    },
    {
      id: "antiragging",
      title: "National Anti-Ragging Helpline (24x7 Toll-Free)",
      sub: "National Anti-Ragging Cell & Disciplinary Directorate",
      number: "1800-180-5522",
      tel: "1800-180-5522",
      icon: Siren,
      bg: "from-amber-600 to-red-700",
      border: "border-amber-400",
      delay: 0.3
    }
  ];

  const handleDial = (tel: string, title: string) => {
    setDialedContact(title);
    window.open(`tel:${tel}`, "_self");
    setTimeout(() => setDialedContact(null), 3000);
  };

  const handleCopy = (num: string) => {
    navigator.clipboard?.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-red-950 via-rose-950 to-black text-white p-4 sm:p-8 flex flex-col justify-between backdrop-blur-2xl"
      >
        {/* Animated Emergency Strobe Aura */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 via-rose-900 to-black animate-pulse" />
        </div>

        {/* Top Header Controls */}
        <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-red-800/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-500 animate-bounce">
              <Siren size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
                <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  SOS Emergency Mode Active
                </h1>
              </div>
              <p className="text-xs text-red-200 font-bold uppercase tracking-widest mt-0.5">
                IIIT Kalyani Rapid Action Dispatch Protocol
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Siren Toggle */}
            <button
              onClick={toggleSiren}
              className={cn(
                "px-3.5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg",
                sirenPlaying 
                  ? "bg-amber-400 text-slate-950 animate-pulse font-black" 
                  : "bg-red-900/80 hover:bg-red-800 text-white border border-red-700"
              )}
              title="Toggle Audio Siren"
            >
              {sirenPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
              <span className="hidden sm:inline">{sirenPlaying ? "Siren ON" : "Sound Siren"}</span>
            </button>

            {/* Exit SOS Mode Button */}
            <button
              onClick={() => {
                stopSirenAudio();
                onClose();
              }}
              className="px-4 py-2.5 bg-white text-red-950 hover:bg-red-100 font-black text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center gap-2 shadow-2xl shadow-white/20 active:scale-95"
            >
              <X size={18} />
              <span>Deactivate SOS</span>
            </button>
          </div>
        </div>

        {/* Live GPS Telemetry Broadcast Banner */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-6">
          <div className="p-4 sm:p-5 rounded-3xl bg-red-900/40 border-2 border-red-500/50 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/60 flex items-center justify-center shrink-0">
                <Radio size={20} className="text-white animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-red-300">
                  Live Spatial Telemetry Encrypted
                </span>
                <p className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <MapPin size={16} className="text-red-400 shrink-0" />
                  <span>Academic Block 1 • CS Lab 102 (22.9868° N, 88.5444° E)</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-500/30 text-red-200 border border-red-400/40 rounded-xl text-xs font-bold font-mono">
                BROADCASTING TO 6 WARDENS
              </span>
            </div>
          </div>
        </div>

        {/* 3 Large Quick Dial Action Cards */}
        <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-4">
          {emergencyActions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: action.delay }}
                className={cn(
                  "p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-b border-2 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform",
                  action.bg,
                  action.border
                )}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                      <Icon size={36} />
                    </div>
                    <span className="px-3 py-1 bg-black/40 text-red-200 text-[10px] font-black rounded-full uppercase tracking-wider border border-white/10">
                      QUICK DIAL
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                      {action.title}
                    </h3>
                    <p className="text-xs text-red-100 font-medium mt-1">
                      {action.sub}
                    </p>
                  </div>

                  <div className="pt-2">
                    <p className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-wider">
                      {action.number}
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-2">
                  <a
                    href={`tel:${action.tel}`}
                    onClick={() => handleDial(action.tel, action.title)}
                    className="w-full py-4 bg-white text-red-950 hover:bg-red-50 font-black text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-black/30 active:scale-95 transition-all text-center"
                  >
                    <Phone size={20} className="animate-pulse text-red-600" />
                    <span>Call Immediately</span>
                  </a>

                  <button
                    onClick={() => handleCopy(action.number)}
                    className="w-full py-2 bg-black/30 hover:bg-black/50 text-red-200 text-xs font-bold rounded-xl transition-colors text-center"
                  >
                    {copiedNumber === action.number ? "Copied to Clipboard ✓" : "Copy Phone Number"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Emergency Guidelines */}
        <div className="relative z-10 max-w-5xl mx-auto w-full pt-6 border-t border-red-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-red-300 font-semibold">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-red-400" />
            <span>Campus emergency calls are routed directly through IIIT Kalyani Command Center.</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                stopSirenAudio();
                onClose();
              }}
              className="text-white font-bold hover:underline"
            >
              Exit to Standard Portal
            </button>
          </div>
        </div>

        {/* Dialed notification toast */}
        <AnimatePresence>
          {dialedContact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2 z-50 text-xs"
            >
              <Phone size={16} className="text-red-600 animate-spin" />
              <span>Connecting emergency line to {dialedContact}...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
