export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: "Internship" | "Hackathon" | "Scholarship" | "Workshop";
  deadline: string;
  matchScore: number;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "High" | "Moderate" | "Low";
  status: "Pending" | "Completed";
  type: "Assignment" | "Exam" | "Quiz";
}

export interface EmergencyContact {
  id: string;
  title: string;
  number: string;
  category: "Medical" | "Security" | "Admin" | "Office" | "General";
}

export interface Resource {
  id: string;
  title: string;
  type: "Notes" | "PYQ" | "Slides" | "Book";
  subject: string;
  semester: number;
  downloadUrl: string;
}

export interface MarketItem {
  id: string;
  title: string;
  price: number;
  category: "Books" | "Electronics" | "Cycles" | "Other";
  condition: "New" | "Good" | "Used";
  seller: string;
  image?: string;
}

export interface ScheduleItem {
  day: string;
  slots: {
    time: string;
    subject: string;
    room: string;
    type: "Lecture" | "Lab" | "Tutorial";
    faculty: string;
  }[];
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: "Academic" | "Placement" | "Event" | "General";
  priority: "High" | "Medium" | "Low";
  link?: string;
  summary: string;
}

export interface Contact {
  id: string;
  name: string;
  role?: string;
  designation: string;
  department: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface QuickLink {
  id: string;
  title: string;
  url: string;
  iconName: string;
  description: string;
}

export interface DashboardMetrics {
  attendance: {
    percentage: number;
    prediction: string;
    status: "Safe" | "Warning" | "Critical";
  };
  nextClass: {
    subject: string;
    room: string;
    time: string;
  };
  messMenu: {
    meal: string;
    special: string;
  };
}

export interface StudentProfile {
  // Core Information
  fullName: string;
  department: string;
  studentId: string;
  
  // Personal / Medical / Emergency Details
  dateOfBirth?: string;
  bloodGroup?: string;
  emergencyContact?: string;
  profilePhoto?: string; // base64 / data URL or custom URL
  
  // Academic & Institutional details
  batch?: string;
  semester?: number;
  email?: string;
  validTill?: string;
  role?: "Student" | "Faculty" | "Admin";
  
  // Future Authentication & Verification Metadata
  verificationStatus?: "local" | "verified";
  lastSyncedAt?: string;
}

export interface UserProfile {
  name: string;
  role: "Student" | "Faculty" | "Admin";
  enrollmentId?: string;
  department: string;
  semester?: number;
  dob?: string;
  bloodGroup?: string;
  validTill?: string;
  emergencyContact?: string;
  avatarUrl?: string;
}

export interface AdminBroadcastNotice {
  id: string;
  title: string;
  summary: string;
  department: string;
  timestamp: string;
  urgency: "Critical" | "Urgent" | "Standard";
  category: "Academic" | "Security" | "Hostel" | "Placement" | "General";
  actionLabel?: string;
  actionTab?: string;
  read?: boolean;
}

export interface PeerStudyGroup {
  id: string;
  name: string;
  subject: string;
  topic: string;
  members: string[];
  maxMembers: number;
  location: string;
  meetingTime: string;
  difficulty: "Beginner" | "Intermediate" | "Exam Sprint";
  creator: string;
  joined?: boolean;
}

export interface SubjectAttendance {
  id?: string;
  code: string;
  name: string;
  subject?: string;
  attended: number;
  total: number;
  faculty: string;
  status?: "Safe" | "Warning" | "Critical";
}
