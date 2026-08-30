import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { 
  X, 
  Copy, 
  Check, 
  Printer, 
  RotateCw, 
  Layers, 
  Upload, 
  Image as ImageIcon,
  CheckCircle2,
  Phone,
  Droplet,
  Calendar,
  Sparkles,
  Edit3,
  ShieldAlert,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { IIITKCrest } from "./IIITKLogo";
import { 
  IIITK_CYAN, 
  DefaultStudentPhotoPlaceholder, 
  IssuingAuthoritySignature, 
  Barcode1D 
} from "./StudentIdCardAssets";
import { useStudentProfile } from "../../context/StudentProfileContext";
import { StudentProfileService } from "../../services/studentProfileService";
import EditProfileModal from "../profile/EditProfileModal";
import { cn } from "../../lib/utils";

interface DigitalStudentIDModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function DigitalStudentIDModal({
  isOpen,
  onClose,
  triggerRef,
}: DigitalStudentIDModalProps) {
  const { profile, updateProfile } = useStudentProfile();

  const [copied, setCopied] = useState(false);
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");
  const [viewMode, setViewMode] = useState<"flip" | "sideBySide">("flip");
  const [showHolderFrame, setShowHolderFrame] = useState(true);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic Student Data from Single Source of Truth
  const studentName = profile.fullName?.trim() || "BARNIK BASU";
  const studentDept = profile.department?.trim() || "Computer Science and Engineering";
  const studentIdNo = (profile.studentId || "CSE/25028/1428").replace(/\s+/g, "").trim();
  const studentDob = profile.dateOfBirth?.trim() || "Not provided";
  const studentBloodGroup = profile.bloodGroup?.trim() || "Not provided";
  const studentValidTill = profile.validTill?.trim() || "31 Jul 2029";
  const studentEmergency = profile.emergencyContact?.trim() || "Not provided";
  const studentPhoto = profile.profilePhoto;

  const institutionalData = {
    email: profile.email || "office@iiitkalyani.ac.in",
    website: "www.iiitkalyani.ac.in",
    addressLine1: "WEBEL IT Park, P.O.: Kalyani - 741235",
    addressLine2: "West Bengal",
  };

  // Lock background scrolling and manage keyboard accessibility
  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);

      if (triggerRef?.current) {
        triggerRef.current.focus();
      } else if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(studentIdNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await StudentProfileService.compressImage(file, 380, 480, 0.85);
        updateProfile({ profilePhoto: compressed });
      } catch (err) {
        console.error("Failed to compress card photo:", err);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (typeof document === "undefined") return null;

  /* ======================================================================= */
  /* FRONT CARD COMPONENT (FOLLOWING EXACT PHYSICAL LAYOUT)                  */
  /* ======================================================================= */
  const renderFrontCard = () => (
    <div
      id="iiitk-id-card-front"
      className="w-full max-w-[340px] bg-white text-slate-900 rounded-2xl shadow-xl p-5 flex flex-col justify-between select-none relative overflow-hidden border border-slate-200"
      style={{
        aspectRatio: "1 / 1.58",
      }}
    >
      {/* Top Header Section */}
      <div className="flex flex-col items-center text-center">
        {/* Crest + Institute Name Row */}
        <div className="w-full flex items-center justify-center gap-2">
          <div className="shrink-0">
            <IIITKCrest size={44} primaryColor={IIITK_CYAN} />
          </div>
          <div className="text-left">
            <h1
              className="text-[12.5px] font-extrabold uppercase leading-[1.15] tracking-tight font-sans"
              style={{ color: IIITK_CYAN }}
            >
              INDIAN INSTITUTE OF INFORMATION
              <br />
              TECHNOLOGY, KALYANI
            </h1>
          </div>
        </div>

        {/* Subtitle Lines */}
        <div className="mt-1.5 space-y-0.5">
          <p
            className="text-[9px] font-semibold tracking-tight leading-tight"
            style={{ color: IIITK_CYAN }}
          >
            (Autonomous Institution under MoE, Govt. of India)
          </p>
          <p
            className="text-[9px] font-semibold tracking-tight leading-tight"
            style={{ color: IIITK_CYAN }}
          >
            Institute of National Importance
          </p>
        </div>
      </div>

      {/* Student Passport Photo Section */}
      <div className="flex flex-col items-center my-auto py-1">
        <div 
          className="relative group cursor-pointer" 
          onClick={() => fileInputRef.current?.click()} 
          title="Click to upload custom photo"
        >
          <div className="w-[118px] h-[146px] border-[1.5px] border-black bg-slate-200 overflow-hidden shadow-none flex items-center justify-center">
            {studentPhoto ? (
              <img
                src={studentPhoto}
                alt={studentName}
                className="w-full h-full object-cover transition-opacity duration-200"
              />
            ) : (
              <DefaultStudentPhotoPlaceholder className="w-full h-full" theme="light" />
            )}
          </div>
          {/* Hover Overlay for upload */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold gap-1">
            <Upload size={13} />
            <span>{studentPhoto ? "Change Photo" : "Upload Photo"}</span>
          </div>
        </div>

        {/* Student Name */}
        <h2 className="text-[17px] font-bold text-black uppercase tracking-wider font-sans mt-2.5 text-center leading-tight">
          {studentName}
        </h2>
      </div>

      {/* Student Details Key-Value Section (Aligned Colons) */}
      <div className="w-full text-black text-[12px] font-medium leading-tight px-1 space-y-1.5">
        <div className="grid grid-cols-[82px_12px_1fr] items-start">
          <span className="font-semibold text-black">Department</span>
          <span className="font-bold text-black text-center">:</span>
          <span className="font-normal text-black leading-snug">
            {studentDept === "Computer Science and Engineering" ? (
              <>
                Computer Science
                <br />
                and Engineering
              </>
            ) : (
              studentDept
            )}
          </span>
        </div>

        <div className="grid grid-cols-[82px_12px_1fr] items-center">
          <span className="font-semibold text-black">ID No.</span>
          <span className="font-bold text-black text-center">:</span>
          <span className="font-normal text-black tracking-wide font-mono font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {studentIdNo}
          </span>
        </div>
      </div>

      {/* Barcode Section at Bottom */}
      <div className="w-full pt-1.5">
        <Barcode1D value={studentIdNo} />
      </div>
    </div>
  );

  /* ======================================================================= */
  /* BACK CARD COMPONENT (FOLLOWING EXACT PHYSICAL LAYOUT)                   */
  /* ======================================================================= */
  const renderBackCard = () => (
    <div
      id="iiitk-id-card-back"
      className="w-full max-w-[340px] bg-white text-slate-900 rounded-2xl shadow-xl p-5 flex flex-col justify-between select-none relative overflow-hidden border border-slate-200"
      style={{
        aspectRatio: "1 / 1.58",
      }}
    >
      {/* Top Details (Aligned colons) */}
      <div className="w-full text-black text-[12px] leading-relaxed space-y-1 pt-1">
        <div className="grid grid-cols-[130px_12px_1fr] items-center">
          <span className="font-medium text-black">Date of Birth</span>
          <span className="font-bold text-black text-center">:</span>
          <span className="font-medium text-black">{studentDob}</span>
        </div>

        <div className="grid grid-cols-[130px_12px_1fr] items-center">
          <span className="font-medium text-black">Blood Group</span>
          <span className="font-bold text-black text-center">:</span>
          <span className="font-medium text-black">{studentBloodGroup}</span>
        </div>

        <div className="grid grid-cols-[130px_12px_1fr] items-center">
          <span className="font-medium text-black">Valid till</span>
          <span className="font-bold text-black text-center">:</span>
          <span className="font-medium text-black">{studentValidTill}</span>
        </div>

        <div className="grid grid-cols-[130px_12px_1fr] items-center">
          <span className="font-medium text-black">Emergency Contact</span>
          <span className="font-bold text-black text-center">:</span>
          <span className="font-medium text-black">{studentEmergency}</span>
        </div>
      </div>

      {/* Middle Notice Section (Enclosed by top & bottom borders) */}
      <div className="w-full border-t border-b border-black py-2.5 my-1.5 space-y-1.5 text-[10.5px] leading-snug text-black">
        <div className="flex items-start gap-1.5">
          <span className="text-[9px] mt-0.5">●</span>
          <p className="flex-1">
            This Identity card is not transferrable and is used for identification purposes only.
          </p>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="text-[9px] mt-0.5">●</span>
          <p className="flex-1">
            If the card is lost, please intimate the office.
          </p>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="text-[9px] mt-0.5">●</span>
          <p className="flex-1">
            If this card is found by someone, please return it to the below mentioned address.
          </p>
        </div>
      </div>

      {/* Signature Section */}
      <div className="w-full flex flex-col items-center pt-0.5">
        <IssuingAuthoritySignature className="w-40 h-9" />
        <div className="w-44 h-[1px] bg-black mt-0.5" />
        <span className="text-[10px] font-bold text-black text-center mt-0.5 tracking-tight">
          Issuing Authority Signature
        </span>
      </div>

      {/* Institutional Address Section at Bottom */}
      <div className="w-full text-center pt-1.5">
        <h3
          className="text-[11.5px] font-bold uppercase leading-tight font-sans"
          style={{ color: IIITK_CYAN }}
        >
          INDIAN INSTITUTE OF INFORMATION
          <br />
          TECHNOLOGY, KALYANI
        </h3>

        <div className="text-[10.5px] text-black font-medium leading-tight mt-1 space-y-0.5">
          <p>{institutionalData.addressLine1}</p>
          <p>{institutionalData.addressLine2}</p>
          <p>
            <span className="font-semibold">Email :</span> {institutionalData.email},
          </p>
          <p>
            <span className="font-semibold">Website :</span> {institutionalData.website}
          </p>
        </div>
      </div>
    </div>
  );

  /* Card Holder Wrap Helper */
  const wrapWithBadgeHolder = (cardElement: React.ReactNode) => {
    if (!showHolderFrame) {
      return cardElement;
    }

    return (
      <div className="p-2 sm:p-3.5 bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-3xl shadow-2xl border-2 border-slate-700/80 relative flex flex-col items-center">
        {/* Top Key Ring & Clip Slot */}
        <div className="w-full flex flex-col items-center -mt-1 pb-2">
          {/* Metallic Top Ring */}
          <div className="w-8 h-4 rounded-t-full border-2 border-amber-300/80 bg-amber-400/20 -mt-3.5 flex items-center justify-center shadow-sm">
            <div className="w-3 h-2 rounded-full bg-slate-900" />
          </div>
          {/* Central Lanyard Slot */}
          <div className="w-14 h-2.5 rounded-full bg-black/80 border border-slate-600 shadow-inner mt-1" />
        </div>

        {/* Side Tabs / Clips simulation */}
        <div className="relative">
          {/* Left Retainer Clip */}
          <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-2 h-14 bg-[#334155] rounded-r-md border-r border-slate-500/50 z-20 shadow-md" />
          {/* Right Retainer Clip */}
          <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-2 h-14 bg-[#334155] rounded-l-md border-l border-slate-500/50 z-20 shadow-md" />
          
          {cardElement}
        </div>

        {/* Bottom subtle indicator */}
        <div className="mt-2 text-[9px] font-mono font-semibold text-slate-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>IIIT KALYANI STUDENT ID</span>
        </div>
      </div>
    );
  };

  return createPortal(
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            id="digital-student-id-modal-overlay"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-id-modal-heading"
          >
            {/* Viewport-Level Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-[12px] cursor-pointer"
              aria-hidden="true"
            />

            {/* Hidden File Input for Custom Photo Upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            {/* Modal Content Container */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-4xl my-auto flex flex-col items-center"
              style={{
                maxHeight: "calc(100vh - 1.5rem)",
              }}
            >
              {/* Top Toolbar */}
              <div className="w-full max-w-[740px] flex items-center justify-between pb-3 px-1 text-white">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
                  </span>
                  <span id="student-id-modal-heading" className="text-xs sm:text-sm font-bold tracking-wide text-slate-100">
                    IIIT Kalyani Digital Student ID
                  </span>
                </div>

                {/* View & Flip Controls */}
                <div className="flex items-center gap-2">
                  {/* Edit Profile Shortcut Button */}
                  <button
                    type="button"
                    onClick={() => setIsEditProfileOpen(true)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white rounded-lg text-xs font-semibold border border-white/10 transition-all cursor-pointer"
                    title="Edit profile details"
                  >
                    <Edit3 size={13} />
                    <span className="hidden sm:inline">Edit Profile</span>
                  </button>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex items-center bg-slate-800/80 rounded-xl p-0.5 border border-slate-700">
                    <button
                      type="button"
                      onClick={() => setViewMode("flip")}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                        viewMode === "flip" ? "bg-sky-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                      )}
                    >
                      Flip Mode
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("sideBySide")}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                        viewMode === "sideBySide" ? "bg-sky-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                      )}
                    >
                      Side by Side
                    </button>
                  </div>

                  {/* Flip Button in Flip Mode */}
                  {viewMode === "flip" && (
                    <button
                      type="button"
                      onClick={() => setActiveSide((prev) => (prev === "front" ? "back" : "front"))}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600/90 hover:bg-sky-600 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                      title="Flip Card"
                    >
                      <RotateCw size={13} className={cn("transition-transform duration-500", activeSide === "back" && "rotate-180")} />
                      <span>{activeSide === "front" ? "Flip to Back" : "Flip to Front"}</span>
                    </button>
                  )}

                  {/* Close Button */}
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded-xl bg-white/10 hover:bg-rose-600 text-slate-200 hover:text-white border border-white/15 transition-colors cursor-pointer"
                    aria-label="Close modal"
                    title="Close (Esc)"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* CARD PRESENTATION AREA */}
              <div className="w-full flex items-center justify-center p-2">
                {viewMode === "flip" ? (
                  /* 3D Flip Container */
                  <div className="perspective-1000">
                    <motion.div
                      key={activeSide}
                      initial={{ opacity: 0, rotateY: activeSide === "back" ? 80 : -80 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: activeSide === "back" ? -80 : 80 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {wrapWithBadgeHolder(
                        activeSide === "front" ? renderFrontCard() : renderBackCard()
                      )}
                    </motion.div>
                  </div>
                ) : (
                  /* Side-by-Side Dual View */
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-6 overflow-y-auto max-h-[72vh] p-2">
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest mb-2">Front Side</span>
                      {wrapWithBadgeHolder(renderFrontCard())}
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest mb-2">Back Side</span>
                      {wrapWithBadgeHolder(renderBackCard())}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions Bar */}
              <div className="w-full max-w-[740px] mt-3 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-2.5 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copied ? "ID Copied!" : `Copy ID: ${studentIdNo}`}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                    title="Upload student photograph"
                  >
                    <ImageIcon size={14} className="text-sky-400" />
                    <span>{studentPhoto ? "Change Photo" : "Upload Photo"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowHolderFrame((prev) => !prev)}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Layers size={14} className="text-amber-400" />
                    <span>{showHolderFrame ? "Hide Holder" : "Show Holder"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Printer size={14} />
                    <span>Print ID Pass</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold shadow-md transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Embedded Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </>,
    document.body
  );
}
