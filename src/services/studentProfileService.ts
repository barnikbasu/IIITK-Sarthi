import { StudentProfile } from "../types";

const STORAGE_KEY = "iiitk_student_profile";
const PROFILE_CHANGE_EVENT = "iiitk_student_profile_changed";

/**
 * Initial demo student profile for IIIT Kalyani.
 * Initialized with authentic details.
 */
export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  fullName: "BARNIK BASU",
  department: "Computer Science and Engineering",
  studentId: "CSE/25028/1428",
  dateOfBirth: "15 Aug 2006",
  bloodGroup: "O+",
  emergencyContact: "9143305732",
  batch: "2025 - 2029",
  semester: 4,
  email: "barnik.basu@iiitkalyani.ac.in",
  validTill: "31 Jul 2029",
  role: "Student",
  verificationStatus: "local",
  lastSyncedAt: new Date().toISOString(),
};

/**
 * Service Abstraction for Student Profile data.
 * Current implementation: browser localStorage.
 * Future implementation: can seamlessly switch to Firebase / Supabase / Institutional SSO & ERP
 * without altering dependent UI components.
 */
export class StudentProfileService {
  /**
   * Retrieves the current profile from local storage or returns the default profile.
   */
  static getProfile(): StudentProfile {
    if (typeof window === "undefined") {
      return DEFAULT_STUDENT_PROFILE;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Initialize default in storage
        this.saveProfile(DEFAULT_STUDENT_PROFILE, false);
        return DEFAULT_STUDENT_PROFILE;
      }
      const parsed = JSON.parse(stored);
      if (parsed.studentId) {
        parsed.studentId = parsed.studentId.replace(/\s+/g, "").trim();
      }
      return {
        ...DEFAULT_STUDENT_PROFILE,
        ...parsed,
      };
    } catch (err) {
      console.warn("Failed to parse stored student profile, using default:", err);
      return DEFAULT_STUDENT_PROFILE;
    }
  }

  /**
   * Saves the updated student profile to persistence and notifies subscribers.
   */
  static saveProfile(profile: StudentProfile, broadcast = true): StudentProfile {
    const sanitizedStudentId = profile.studentId ? profile.studentId.replace(/\s+/g, "").trim() : "";
    const updated: StudentProfile = {
      ...profile,
      studentId: sanitizedStudentId,
      lastSyncedAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        if (broadcast) {
          window.dispatchEvent(
            new CustomEvent(PROFILE_CHANGE_EVENT, { detail: updated })
          );
        }
      } catch (err) {
        console.error("Failed to save student profile to localStorage:", err);
      }
    }

    return updated;
  }

  /**
   * Resets student profile back to the demo baseline.
   */
  static resetProfile(): StudentProfile {
    return this.saveProfile(DEFAULT_STUDENT_PROFILE);
  }

  /**
   * Calculates profile completion percentage based on provided fields.
   */
  static calculateCompletion(profile: StudentProfile): number {
    const fields = [
      Boolean(profile.fullName?.trim()),
      Boolean(profile.department?.trim()),
      Boolean(profile.studentId?.trim()),
      Boolean(profile.dateOfBirth?.trim()),
      Boolean(profile.bloodGroup?.trim()),
      Boolean(profile.emergencyContact?.trim()),
      Boolean(profile.batch?.trim()),
      Boolean(profile.email?.trim()),
    ];

    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  }

  /**
   * Helper to compress uploaded images for lightweight local persistence (<50KB).
   */
  static async compressImage(
    file: File,
    maxWidth = 360,
    maxHeight = 440,
    quality = 0.82
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Listen to profile updates across components/tabs
   */
  static subscribe(callback: (profile: StudentProfile) => void): () => void {
    if (typeof window === "undefined") return () => {};

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<StudentProfile>;
      if (customEvent.detail) {
        callback(customEvent.detail);
      } else {
        callback(StudentProfileService.getProfile());
      }
    };

    window.addEventListener(PROFILE_CHANGE_EVENT, handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener(PROFILE_CHANGE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }
}
