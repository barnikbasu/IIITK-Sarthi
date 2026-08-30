import { Notice, Contact, QuickLink, DashboardMetrics, UserProfile, Resource, MarketItem, ScheduleItem, Opportunity, Task, EmergencyContact, AdminBroadcastNotice, PeerStudyGroup, SubjectAttendance } from "../types";

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
    name: "Dr. Sanjay Chatterji",
    role: "Faculty In-Charge, Web & IT",
    designation: "Assistant Professor",
    department: "CSE",
    email: "sanjayc@iiitkalyani.ac.in",
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
  { id: "e1", title: "Campus Ambulance & Trauma", number: "+91 98765 43210", category: "Medical" },
  { id: "e2", title: "Main Security Gate & Control Room", number: "+91 98765 00001", category: "Security" },
  { id: "e3", title: "Anti-Ragging & Proctorial Cell", number: "1800-180-5522", category: "Admin" },
];

export const adminBroadcasts: AdminBroadcastNotice[] = [
  {
    id: "b1",
    title: "🚨 Emergency Weather Alert: Torrential Rain & Transit Advisory",
    summary: "Due to heavy thunderstorms in Kalyani and Nadia district, all LHC evening laboratory sessions after 4:00 PM are shifted online. Campus emergency shuttle frequency doubled.",
    department: "Office of the Dean (Student Affairs)",
    timestamp: "10 mins ago",
    urgency: "Critical",
    category: "Security",
    actionLabel: "View Emergency Transit",
    actionTab: "emergency",
    read: false
  },
  {
    id: "b2",
    title: "Revised Mid-Semester Examination Schedule & Seating Plan Released",
    summary: "The revised Spring 2026 Mid-Semester examinations schedule (Sem 4 & 6) has been updated. Verify your assigned room number and digital barcode on your student pass.",
    department: "Office of the Controller of Examinations",
    timestamp: "45 mins ago",
    urgency: "Urgent",
    category: "Academic",
    actionLabel: "Download Timetable",
    actionTab: "schedule",
    read: false
  },
  {
    id: "b3",
    title: "Mandatory Elective Course Allocation for Semester 5",
    summary: "Students entering 3rd year must submit their top 3 departmental elective preferences on the ERP portal before Friday 5:00 PM.",
    department: "Academic Section & Registrar",
    timestamp: "2 hours ago",
    urgency: "Urgent",
    category: "Academic",
    actionLabel: "Open Electives",
    actionTab: "resources",
    read: false
  },
  {
    id: "b4",
    title: "Hostel Water Filter & Fiber Maintenance Window",
    summary: "Hostel Blocks A & B will undergo scheduled RO filtration maintenance and optical fiber switch upgrade between 2:00 AM and 4:00 AM on Saturday.",
    department: "Estate & Residential Life",
    timestamp: "5 hours ago",
    urgency: "Standard",
    category: "Hostel",
    actionLabel: "Hostel Helpdesk",
    actionTab: "directory",
    read: true
  },
  {
    id: "b5",
    title: "Placement Cell: Google Summer of Code (GSoC) & SIH Info Session",
    summary: "Join the open mentorship session with previous GSoC scholars and Smart India Hackathon finalists this Thursday at 6:00 PM in LT-1.",
    department: "Training & Placement Cell",
    timestamp: "Yesterday",
    urgency: "Standard",
    category: "Placement",
    actionLabel: "Explore Opportunities",
    actionTab: "opportunities",
    read: true
  }
];

export const subjectAttendanceData: SubjectAttendance[] = [
  { id: "sa1", code: "CS201", name: "Operating Systems Core", subject: "Operating Systems Core", attended: 28, total: 32, faculty: "Dr. SK Hafizul Islam", status: "Safe" },
  { id: "sa2", code: "CS202", name: "Database Management Systems", subject: "Database Management Systems", attended: 24, total: 30, faculty: "Dr. Sanjay Chatterji", status: "Safe" },
  { id: "sa3", code: "CS203", name: "Data Structures & Algorithms", subject: "Data Structures & Algorithms", attended: 22, total: 25, faculty: "Dr. Oishila Bandyopadhyay", status: "Safe" },
  { id: "sa4", code: "EC204", name: "Computer Organization & Architecture", subject: "Computer Organization & Architecture", attended: 18, total: 25, faculty: "Dr. Amit Ranjan Azad", status: "Warning" },
  { id: "sa5", code: "MA205", name: "Discrete & Advanced Mathematics", subject: "Discrete & Advanced Mathematics", attended: 21, total: 26, faculty: "Dr. Anirban Lakshman", status: "Safe" }
];

export const peerStudyGroupsMock: PeerStudyGroup[] = [
  {
    id: "sg1",
    name: "OS Virtual Memory & Deadlocks Sprint",
    subject: "Operating Systems",
    topic: "Page Replacement Algorithms & Semaphore Race Conditions",
    members: ["Barnik Basu", "Rahul Sharma", "Sneha Roy"],
    maxMembers: 5,
    location: "Library 2nd Floor (Quiet Zone)",
    meetingTime: "Tonight • 7:30 PM",
    difficulty: "Exam Sprint",
    creator: "Rahul Sharma",
    joined: false
  },
  {
    id: "sg2",
    name: "DSA LeetCode Hard & DP Masters",
    subject: "Data Structures & Algorithms",
    topic: "Dynamic Programming on Trees & Graph Dijkstra/Floyd",
    members: ["Aniket Sen", "Debanjan Paul", "Barnik Basu", "Priya Ghosh"],
    maxMembers: 6,
    location: "CS Lab 102 & Google Meet",
    meetingTime: "Daily • 9:00 PM",
    difficulty: "Intermediate",
    creator: "Aniket Sen",
    joined: true
  },
  {
    id: "sg3",
    name: "DBMS B+ Trees & Normalization Lab",
    subject: "Database Management Systems",
    topic: "3NF vs BCNF Decomposition & Query Execution Plans",
    members: ["Sneha Roy", "Vikram Jha"],
    maxMembers: 4,
    location: "Hostel BH-1 Common Study Room",
    meetingTime: "Tomorrow • 4:00 PM",
    difficulty: "Exam Sprint",
    creator: "Sneha Roy",
    joined: false
  },
  {
    id: "sg4",
    name: "Computer Organization Pipeline & Cache",
    subject: "Computer Organization",
    topic: "MIPS 5-Stage Pipeline Hazards & Direct-Mapped Cache",
    members: ["Rohan Dey", "Kiran Verma", "Subhashis M"],
    maxMembers: 4,
    location: "LHC Room 204",
    meetingTime: "Friday • 5:00 PM",
    difficulty: "Beginner",
    creator: "Rohan Dey",
    joined: false
  }
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
      { time: "09:00 AM", subject: "Operating Systems", room: "LT-1", type: "Lecture", faculty: "Dr. SK Hafizul Islam" },
      { time: "11:00 AM", subject: "Computer Networks", room: "LT-2", type: "Lecture", faculty: "Dr. Debasish Bera" },
      { time: "02:00 PM", subject: "OS Lab", room: "Lab-1", type: "Lab", faculty: "Dr. SK Hafizul Islam" },
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { time: "10:00 AM", subject: "Microprocessors & IoT", room: "LT-1", type: "Lecture", faculty: "Dr. Dalia Nandi" },
      { time: "12:00 PM", subject: "Natural Language Processing", room: "LT-3", type: "Lecture", faculty: "Dr. Sanjay Chatterji" },
    ]
  }
];
