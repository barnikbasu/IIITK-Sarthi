import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { 
  X, 
  Upload, 
  Trash2, 
  Check, 
  AlertCircle, 
  User, 
  Calendar, 
  Phone, 
  Droplet, 
  Building2, 
  Hash, 
  Sparkles,
  Info,
  RotateCcw,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useStudentProfile } from "../../context/StudentProfileContext";
import { DefaultStudentPhotoPlaceholder } from "../common/StudentIdCardAssets";
import { StudentProfileService } from "../../services/studentProfileService";
import { cn } from "../../lib/utils";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

const BLOOD_GROUPS = [
  "O+",
  "O-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "Not specified",
];

const DEPARTMENTS = [
  "Computer Science and Engineering",
  "Electronics and Communication Engineering",
  "Data Science and Artificial Intelligence",
  "Information Technology",
];

export default function EditProfileModal({
  isOpen,
  onClose,
  triggerRef,
}: EditProfileModalProps) {
  const { profile, updateProfile, resetProfile } = useStudentProfile();

  // Form local state
  const [formData, setFormData] = useState({
    fullName: "",
    department: "",
    studentId: "",
    dateOfBirth: "",
    bloodGroup: "",
    emergencyContact: "",
    batch: "",
  });

  const [photoPreview, setPhotoPreview] = useState<string | undefined>(undefined);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Sync form state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: profile.fullName || "",
        department: profile.department || "Computer Science and Engineering",
        studentId: profile.studentId || "",
        dateOfBirth: profile.dateOfBirth || "",
        bloodGroup: profile.bloodGroup || "",
        emergencyContact: profile.emergencyContact || "",
        batch: profile.batch || "2025 - 2029",
      });
      setPhotoPreview(profile.profilePhoto);
      setErrors({});
      setSavedSuccess(false);

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, profile]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, photo: "Please select a valid image file (PNG or JPEG)." }));
      return;
    }

    try {
      setIsCompressing(true);
      const compressedDataUrl = await StudentProfileService.compressImage(file, 380, 480, 0.85);
      setPhotoPreview(compressedDataUrl);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.photo;
        return next;
      });
    } catch (err) {
      console.error("Error compressing photo:", err);
      setErrors((prev) => ({ ...prev, photo: "Could not process image. Please try another file." }));
    } finally {
      setIsCompressing(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required.";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required.";
    }

    // Optional format validations
    if (formData.emergencyContact.trim()) {
      const cleanPhone = formData.emergencyContact.replace(/[\s\-\+]/g, "");
      if (cleanPhone.length < 8 || !/^\d+$/.test(cleanPhone)) {
        newErrors.emergencyContact = "Please enter a valid phone number (e.g. 9143305732 or +91 XXXXX XXXXX).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    updateProfile({
      fullName: formData.fullName.trim().toUpperCase(),
      department: formData.department.trim(),
      studentId: formData.studentId.replace(/\s+/g, "").trim(),
      dateOfBirth: formData.dateOfBirth.trim(),
      bloodGroup: formData.bloodGroup.trim(),
      emergencyContact: formData.emergencyContact.trim(),
      batch: formData.batch.trim(),
      profilePhoto: photoPreview,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset profile to default demo information (BARNIK BASU, CSE/25028/1428)?")) {
      resetProfile();
      onClose();
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          id="edit-profile-modal-overlay"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-modal-heading"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl bg-white dark:bg-brand-navy rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 sm:px-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/40">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary dark:text-brand-teal">
                  Personalization Center
                </span>
                <h2 id="edit-profile-modal-heading" className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Edit Student Profile
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Scroll Area */}
            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
              {/* Profile Photo Section */}
              <div className="p-4 sm:p-5 bg-slate-50/80 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-5">
                {/* Photo Preview Box */}
                <div className="relative shrink-0">
                  <div className="w-24 h-30 sm:w-28 sm:h-34 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-sm flex items-center justify-center">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover transition-opacity duration-200"
                      />
                    ) : (
                      <DefaultStudentPhotoPlaceholder className="w-full h-full" />
                    )}
                  </div>
                  {isCompressing && (
                    <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center text-white text-[10px] font-bold">
                      Processing...
                    </div>
                  )}
                </div>

                {/* Photo Controls */}
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Profile Photograph
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      This photo is displayed on your Digital ID Card, Navbar avatar, and Dashboard.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <Upload size={14} />
                      <span>{photoPreview ? "Change Photo" : "Upload Custom Photo"}</span>
                    </button>

                    {photoPreview && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                        <span>Revert to Default</span>
                      </button>
                    )}
                  </div>

                  {errors.photo && (
                    <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1 mt-1">
                      <AlertCircle size={13} />
                      {errors.photo}
                    </p>
                  )}
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Full Name *</span>
                    <span className="text-[10px] font-normal text-slate-400">Uppercase on ID card</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. BARNIK BASU"
                      className={cn(
                        "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-xl font-bold text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary",
                        errors.fullName ? "border-rose-400 focus:ring-rose-400" : "border-slate-200 dark:border-slate-800"
                      )}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-rose-500 font-semibold mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Department */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Department / Academic Branch *
                  </label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Student ID */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Student ID / ID No. *
                  </label>
                  <div className="relative">
                    <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      placeholder="e.g. CSE/25028/1428"
                      className={cn(
                        "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono font-bold text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary",
                        errors.studentId ? "border-rose-400 focus:ring-rose-400" : "border-slate-200 dark:border-slate-800"
                      )}
                    />
                  </div>
                  {errors.studentId && (
                    <p className="text-xs text-rose-500 font-semibold mt-1">{errors.studentId}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      placeholder="e.g. 15 Aug 2006 or DD/MM/YYYY"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>
                </div>

                {/* Blood Group */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Blood Group (Optional)
                  </label>
                  <div className="relative">
                    <Droplet size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    >
                      <option value="">Select blood group (or leave empty)</option>
                      {BLOOD_GROUPS.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Emergency Contact (Optional)
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      placeholder="e.g. 9143305732 or +91 XXXXX XXXXX"
                      className={cn(
                        "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-xl font-medium text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary",
                        errors.emergencyContact ? "border-rose-400 focus:ring-rose-400" : "border-slate-200 dark:border-slate-800"
                      )}
                    />
                  </div>
                  {errors.emergencyContact && (
                    <p className="text-xs text-rose-500 font-semibold mt-1">{errors.emergencyContact}</p>
                  )}
                </div>

                {/* Batch / Academic Session */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Batch / Graduation Cycle
                  </label>
                  <input
                    type="text"
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    placeholder="e.g. 2025 - 2029"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>

              {/* Privacy Notice Banner */}
              <div className="p-3.5 bg-sky-50/70 dark:bg-sky-950/30 rounded-xl border border-sky-200/80 dark:border-sky-800/50 flex items-start gap-2.5 text-xs text-sky-900 dark:text-sky-200">
                <Info size={16} className="shrink-0 text-sky-600 dark:text-sky-400 mt-0.5" />
                <div>
                  <span className="font-bold">Local Persistence:</span> Profile changes are stored privately in your browser and instantly update your Digital ID, Dashboard, and Sarthi Assistant.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Reset Demo</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-primary/20 hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                  >
                    {savedSuccess ? (
                      <>
                        <CheckCircle2 size={16} className="text-emerald-300" />
                        <span>Saved!</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
