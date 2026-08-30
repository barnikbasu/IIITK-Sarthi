import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { StudentProfile } from "../types";
import { StudentProfileService, DEFAULT_STUDENT_PROFILE } from "../services/studentProfileService";

interface StudentProfileContextType {
  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  resetProfile: () => void;
  completionPercentage: number;
  firstName: string;
  hasCustomPhoto: boolean;
  isLocalPrototype: boolean;
}

const StudentProfileContext = createContext<StudentProfileContextType | undefined>(undefined);

export const StudentProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(() => StudentProfileService.getProfile());

  // Listen to external or cross-tab updates
  useEffect(() => {
    const unsubscribe = StudentProfileService.subscribe((newProfile) => {
      setProfile(newProfile);
    });
    return unsubscribe;
  }, []);

  const updateProfile = useCallback((updated: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const merged = { ...prev, ...updated };
      return StudentProfileService.saveProfile(merged);
    });
  }, []);

  const resetProfile = useCallback(() => {
    const reset = StudentProfileService.resetProfile();
    setProfile(reset);
  }, []);

  const completionPercentage = useMemo(() => {
    return StudentProfileService.calculateCompletion(profile);
  }, [profile]);

  const firstName = useMemo(() => {
    if (!profile.fullName) return "Student";
    const parts = profile.fullName.trim().split(" ");
    return parts[0] || "Student";
  }, [profile.fullName]);

  const hasCustomPhoto = Boolean(profile.profilePhoto);
  const isLocalPrototype = profile.verificationStatus !== "verified";

  const value = useMemo(
    () => ({
      profile,
      updateProfile,
      resetProfile,
      completionPercentage,
      firstName,
      hasCustomPhoto,
      isLocalPrototype,
    }),
    [profile, updateProfile, resetProfile, completionPercentage, firstName, hasCustomPhoto, isLocalPrototype]
  );

  return (
    <StudentProfileContext.Provider value={value}>
      {children}
    </StudentProfileContext.Provider>
  );
};

export function useStudentProfile(): StudentProfileContextType {
  const context = useContext(StudentProfileContext);
  if (!context) {
    throw new Error("useStudentProfile must be used within a StudentProfileProvider");
  }
  return context;
}
