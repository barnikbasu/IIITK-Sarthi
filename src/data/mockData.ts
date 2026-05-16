import { Notice, Contact, QuickLink, DashboardMetrics, UserProfile, Resource, MarketItem, ScheduleItem, Opportunity, Task, EmergencyContact } from "../types";

export const currentUser: UserProfile = {
  name: "Barnik Basu",
  role: "Student",
  enrollmentId: "IIITK/BTech/2022/045",
  department: "Computer Science & Engineering",
  semester: 4,
};

export const dashboardMetrics: DashboardMetrics = {
  attendance: {
    percentage: 82.5,
    prediction: "Attend next 2 classes to reach 85%.",
    status: "Safe",
  },
  nextClass: {
    subject: "Operating Systems",
    room: "Lab 102",
    time: "10:30 AM",
  },
  messMenu: {
    meal: "Lunch",
    special: "Paneer Butter Masala",
  },
};

export const notices: Notice[] = [
  {
    id: "1",
    title: "Mid-Semester Examination Schedule Released",
    date: "2026-05-15",
    category: "Academic",
    priority: "High",
    summary: "Check the departmental portal for the full schedule and room assignments.",
  },
  {
    id: "2",
    title: "Tech Fest 'Kommune' Registrations Open",
    date: "2026-05-14",
    category: "Event",
    priority: "Medium",
    summary: "Participate in coding marathons, robotics, and paper presentations.",
  },
  {
    id: "3",
    title: "Internship Drive: Google Step 2027",
    date: "2026-05-12",
    category: "Placement",
    priority: "High",
    summary: "Applications are open for 2nd year students. Contact the T&P Cell for more details.",
  },
];

export const contacts: Contact[] = [
  {
    id: "c1",
    name: "Dr. Sandeep Kumar",
    role: "HOD CSE",
    designation: "Assistant Professor",
    department: "CSE",
    email: "sandeep.k@iiitkalyani.ac.in",
  },
  {
    id: "c2",
    name: "Academic Section",
    role: "Admin Support",
    designation: "Administration",
    department: "Admin",
    email: "academic@iiitkalyani.ac.in",
  },
  {
    id: "c3",
    name: "Hostel Warden",
    role: "Residential Advisor",
    designation: "Residential Life",
    department: "Support",
    email: "warden.bh1@iiitkalyani.ac.in",
  },
];

export const quickLinks: QuickLink[] = [
  {
    id: "l1",
    title: "Faculty Q&A",
    url: "#",
    iconName: "BookOpen",
    description: "Academic doubt resolution",
  },
  {
    id: "l2",
    title: "Staff Portal",
    url: "#",
    iconName: "Briefcase",
    description: "Maintenance & ops tools",
  },
  {
    id: "l3",
    title: "ERP Portal",
    url: "https://erp.iiitkalyani.ac.in",
    iconName: "Globe",
    description: "Attendance & fees",
  },
  {
    id: "l4",
    title: "Digital Library",
    url: "https://library.iiitkalyani.ac.in",
    iconName: "Search",
    description: "Books & e-journals",
  },
];

export const opportunities: Opportunity[] = [
  { id: "o1", title: "SDE Intern 2026", company: "Google", type: "Internship", deadline: "2026-06-01", matchScore: 95, tags: ["Python", "DSA"] },
  { id: "o2", title: "Smart India Hackathon", company: "GoI", type: "Hackathon", deadline: "2026-06-15", matchScore: 88, tags: ["Problem Solving"] },
  { id: "o3", title: "Reliance Foundation Scholarship", company: "Reliance", type: "Scholarship", deadline: "2026-05-30", matchScore: 75, tags: ["Need Based"] },
];

export const tasks: Task[] = [
  { id: "t1", title: "OS Lab Assignment 4", dueDate: "2026-05-18", priority: "High", status: "Pending", type: "Assignment" },
  { id: "t2", title: "DBMS Quiz", dueDate: "2026-05-20", priority: "Moderate", status: "Pending", type: "Quiz" },
  { id: "t3", title: "Economics Midsem Revision", dueDate: "2026-05-22", priority: "Low", status: "Pending", type: "Exam" },
];

export const emergencyContacts: EmergencyContact[] = [
  { id: "e1", title: "Campus Ambulance", number: "+91 98765 43210", category: "Medical" },
  { id: "e2", title: "Main Security Gate", number: "+91 98765 00001", category: "Security" },
  { id: "e3", title: "Anti-Ragging Helpline", number: "1800-XXX-XXXX", category: "Admin" },
];

export const resources: Resource[] = [
  { id: "r1", title: "Process Management Notes", type: "Notes", subject: "Operating Systems", semester: 4, downloadUrl: "#" },
  { id: "r2", title: "CPU Scheduling PYQ (2024)", type: "PYQ", subject: "Operating Systems", semester: 4, downloadUrl: "#" },
  { id: "r3", title: "Layered Architecture Slides", type: "Slides", subject: "Computer Networks", semester: 4, downloadUrl: "#" },
  { id: "r4", title: "Microprocessors & Interfacing", type: "Book", subject: "Microprocessors", semester: 4, downloadUrl: "#" },
];

export const marketItems: MarketItem[] = [
  { id: "m1", title: "Casio Scientific Calculator", price: 800, category: "Electronics", condition: "Good", seller: "Rahul Sharma" },
  { id: "m2", title: "Operating Systems - Galvin", price: 450, category: "Books", condition: "Good", seller: "Sneha Roy" },
  { id: "m3", title: "Hero Jet Cycle", price: 3500, category: "Cycles", condition: "Used", seller: "Amit Das" },
];

export const weeklySchedule: ScheduleItem[] = [
  {
    day: "Monday",
    slots: [
      { time: "09:00 AM", subject: "Operating Systems", room: "LT-1", type: "Lecture", faculty: "Dr. S. Kumar" },
      { time: "11:00 AM", subject: "Computer Networks", room: "LT-2", type: "Lecture", faculty: "Prof. P. Bagchi" },
      { time: "02:00 PM", subject: "OS Lab", room: "Lab-1", type: "Lab", faculty: "Dr. S. Kumar" },
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { time: "10:00 AM", subject: "Microprocessors", room: "LT-1", type: "Lecture", faculty: "Dr. A. Gupta" },
      { time: "12:00 PM", subject: "Economics", room: "LT-3", type: "Lecture", faculty: "Ms. T. Seal" },
    ]
  }
];
