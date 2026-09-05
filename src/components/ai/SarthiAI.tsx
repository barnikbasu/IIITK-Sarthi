import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { currentUser } from "../../data/mockData";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function SarthiAI() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: `Hello ${currentUser.name}! I'm Sarthi, your IIIT Kalyani campus assistant. How can I help you today?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          context: {
            user: currentUser,
            time: new Date().toISOString()
          }
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: "ai", content: data.reply }]);
      } else {
        throw new Error("No reply from AI");
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#000000] rounded-[2.5rem] border border-slate-200 dark:border-[#262626] shadow-2xl overflow-hidden relative">
      {/* Header */}
      <div className="p-6 sm:p-8 bg-neutral-900 dark:bg-[#0D0D0D] text-white flex items-center justify-between border-b border-neutral-800 dark:border-[#1A1A1A]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl leading-tight tracking-tight">Sarthi AI</h3>
            <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              Neural Network Active
            </p>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 scroll-smooth bg-slate-50/30 dark:bg-[#000000]"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "flex gap-3 sm:gap-4 max-w-[85%]",
              msg.role === "user" ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-9 h-9 rounded-xl shrink-0 flex items-center justify-center shadow-sm",
              msg.role === "user" ? "bg-brand-primary text-white" : "bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-[#262626] text-slate-700 dark:text-white"
            )}>
              {msg.role === "user" ? <User size={18} /> : <Bot size={18} />}
            </div>
            <div className={cn(
              "px-5 sm:px-6 py-3.5 sm:py-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm font-medium",
              msg.role === "user" 
                ? "bg-brand-primary text-white rounded-tr-none" 
                : "bg-white dark:bg-[#0D0D0D] dark:text-[#FFFFFF] text-slate-800 border border-slate-100 dark:border-[#262626] rounded-tl-none"
            )}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-3 sm:gap-4 max-w-[85%]">
            <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-[#262626] text-slate-700 dark:text-white shadow-sm flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div className="bg-white dark:bg-[#0D0D0D] border border-slate-100 dark:border-[#262626] rounded-[1.5rem] rounded-tl-none px-6 py-4 shadow-sm">
                <Loader2 size={24} className="animate-spin text-neutral-400" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 sm:p-8 bg-white dark:bg-[#0D0D0D] border-t border-slate-100 dark:border-[#1A1A1A] relative">
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-[#000000] border border-slate-200 dark:border-[#262626] rounded-[2rem] p-3 pl-6 focus-within:ring-2 focus-within:ring-white/20 transition-all shadow-inner">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your campus query here..."
            className="flex-1 bg-transparent border-none focus:outline-none text-slate-800 dark:text-[#FFFFFF] py-2 font-medium text-sm"
          />
          <button 
            disabled={!input.trim() || isLoading}
            onClick={handleSend}
            className="w-12 h-12 bg-neutral-900 dark:bg-[#1A1A1A] text-white border border-neutral-700 dark:border-[#262626] rounded-2xl flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 dark:text-[#737373] mt-3 font-bold uppercase tracking-widest">
           Universal Brain • IIIT Kalyani Sarthi Core
        </p>
      </div>
    </div>
  );
}
