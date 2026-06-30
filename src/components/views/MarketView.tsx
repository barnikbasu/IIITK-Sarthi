import { ShoppingBag, Search, Tag, Plus, User, ArrowRight, X, CheckCircle, Package, MessageSquare, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { marketItems as initialItems } from "../../data/mockData";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { MarketItem } from "../../types";

export default function MarketView() {
  const [marketList, setMarketList] = useState<MarketItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);

  // Listing success banner state
  const [showListingSuccess, setShowListingSuccess] = useState(false);
  const [showContactSuccess, setShowContactSuccess] = useState(false);

  // Form states for listing asset
  const [listTitle, setListTitle] = useState("");
  const [listCategory, setListCategory] = useState("Electronics");
  const [listPrice, setListPrice] = useState("");
  const [listCondition, setListCondition] = useState<"New" | "Used">("Used");

  // Form states for contact
  const [contactMessage, setContactMessage] = useState("");

  const filtered = marketList.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listTitle.trim() || !listPrice.trim()) return;

    const newItem: MarketItem = {
      id: `item-${Date.now()}`,
      title: listTitle.trim(),
      category: listCategory,
      price: parseInt(listPrice) || 0,
      condition: listCondition,
      seller: "Barnik Basu (You)",
    };

    setMarketList(prev => [newItem, ...prev]);
    
    // Clear & close
    setListTitle("");
    setListPrice("");
    setListCondition("Used");
    setIsListingModalOpen(false);
    
    setShowListingSuccess(true);
    setTimeout(() => setShowListingSuccess(false), 4000);
  };

  const openContact = (item: MarketItem) => {
    setSelectedItem(item);
    setContactMessage(`Hi ${item.seller.split(' ')[0]}, is the '${item.title}' still available for sale? I am interested in buying it.`);
    setIsContactModalOpen(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactModalOpen(false);
    setShowContactSuccess(true);
    setTimeout(() => setShowContactSuccess(false), 4000);
  };

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Student Marketplace</h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-tight">Buy, sell, or trade items with fellow students on campus.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <div className="relative flex-1 sm:w-64">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-brand-navy border border-slate-200/80 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all dark:text-white font-bold text-xs"
                />
            </div>
            <button 
                onClick={() => setIsListingModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:opacity-90 transition-all active:scale-95 shrink-0"
            >
                <Plus size={20} />
                List Asset
            </button>
        </div>
      </div>

      <AnimatePresence>
        {showListingSuccess && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 bg-status-success/10 border border-status-success/20 rounded-2xl flex items-center gap-3 text-status-success font-black text-xs uppercase tracking-widest justify-center"
            >
                <CheckCircle size={20} />
                Your asset was added to the live campus marketplace!
            </motion.div>
        )}
        {showContactSuccess && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-center gap-3 text-brand-primary dark:text-brand-teal font-black text-xs uppercase tracking-widest justify-center"
            >
                <MessageSquare size={20} className="animate-bounce" />
                Inquiry request delivered to seller's Sarthi OS Inbox!
            </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Banner */}
      <div className="relative overflow-hidden bg-brand-navy rounded-[2.5rem] p-10 text-white border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-lg">
              <span className="inline-block px-4 py-1.5 bg-brand-primary/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">CAMPUS CLEARANCE</span>
              <h3 className="text-4xl font-black tracking-tighter mb-6 leading-tight">Need a Cycle? Check the Summer Sale!</h3>
              <p className="text-slate-400 font-bold mb-8 italic leading-relaxed text-sm">Final year students are listing their items at great prices. Secure yours before graduation season concludes.</p>
              <button 
                onClick={() => setSearchQuery("Cycle")}
                className="flex items-center gap-3 bg-white text-brand-navy px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl shadow-black/20"
              >
                  Browse Cycles <ArrowRight size={18} />
              </button>
          </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] space-y-4">
          <ShoppingBag size={48} className="text-slate-300 dark:text-slate-700 mx-auto" />
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">No items match your active search terms.</p>
          <button 
            onClick={() => setSearchQuery("")}
            className="px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-brand-navy rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between"
            >
              <div className="aspect-video bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center relative overflow-hidden">
                  <ShoppingBag size={48} className="text-slate-200 dark:text-slate-700 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
                  <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/95 dark:bg-brand-navy/95 backdrop-blur shadow-sm rounded-full text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest border border-slate-100 dark:border-slate-800/60">
                          {item.category}
                      </span>
                  </div>
                  <div className="absolute bottom-6 right-6 bg-brand-primary text-white px-5 py-2.5 rounded-2xl font-black text-lg shadow-xl shadow-brand-primary/20">
                      ₹{item.price}
                  </div>
              </div>
              
              <div className="p-8">
                  <div className="flex items-center justify-between gap-4 mb-3">
                      <h4 className="font-black text-xl text-slate-800 dark:text-slate-100 tracking-tight truncate uppercase leading-none">{item.title}</h4>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-8">
                     <span className={cn(
                         "text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter",
                         item.condition === "New" ? "bg-status-success/10 text-status-success" : "bg-status-warning/10 text-status-warning"
                     )}>
                         {item.condition} AUTHENTIC
                     </span>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3 text-slate-500">
                           <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center ring-2 ring-transparent group-hover:ring-brand-primary/20 transition-all">
                              <User size={14} className="group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors" />
                           </div>
                           <span className="text-xs font-bold dark:text-slate-400">{item.seller}</span>
                      </div>
                      <button 
                        onClick={() => openContact(item)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary dark:text-brand-teal hover:bg-brand-primary hover:text-white transition-all shadow-inner"
                      >
                          <ArrowRight size={20} />
                      </button>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* CREATE LISTING MODAL */}
      <AnimatePresence>
        {isListingModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsListingModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-black text-brand-primary dark:text-brand-teal uppercase tracking-widest">CAMPUS MARKETPLACE</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">List Campus Asset</h3>
              </div>

              <form onSubmit={handleCreateListing} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Item Name / Title</label>
                  <input 
                    type="text"
                    required
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                    placeholder="e.g. Hero Cycle, Engineering Drawing Set"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Category</label>
                    <select
                      value={listCategory}
                      onChange={(e) => setListCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Cycles">Cycles</option>
                      <option value="Books">Books</option>
                      <option value="Stationery">Stationery</option>
                      <option value="Mattresses">Mattresses</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Price (INR)</label>
                    <input 
                      type="number"
                      required
                      value={listPrice}
                      onChange={(e) => setListPrice(e.target.value)}
                      placeholder="e.g. 1500"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Condition</label>
                  <div className="flex gap-4">
                    {["New", "Used"].map((cond) => (
                      <button
                        type="button"
                        key={cond}
                        onClick={() => setListCondition(cond as any)}
                        className={cn(
                          "flex-1 py-3 border rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all",
                          listCondition === cond 
                            ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/10" 
                            : "bg-slate-50 dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800"
                        )}
                      >
                        {cond} condition
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsListingModalOpen(false)}
                    className="px-5 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:opacity-95 transition-all"
                  >
                    Publish Listing
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONTACT SELLER MODAL */}
      <AnimatePresence>
        {isContactModalOpen && selectedItem && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-teal flex items-center justify-center">
                   <MessageSquare size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inquiry Message</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Contact {selectedItem.seller}</h3>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 mb-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                <p className="uppercase text-[9px] font-black tracking-widest text-slate-400 mb-1">Item Reference</p>
                <div className="flex justify-between">
                  <span>{selectedItem.title}</span>
                  <span className="text-brand-primary dark:text-brand-teal">₹{selectedItem.price}</span>
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block font-semibold">Your Message</label>
                  <textarea 
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsContactModalOpen(false)}
                    className="px-5 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    Close
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
                  >
                    <Send size={14} /> Send Message
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
