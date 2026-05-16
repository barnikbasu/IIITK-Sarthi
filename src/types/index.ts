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
  category: "Medical" | "Security" | "Admin";
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

export interface UserProfile {
  name: string;
  role: "Student" | "Faculty" | "Admin";
  enrollmentId?: string;
  department: string;
  semester?: number;
}
