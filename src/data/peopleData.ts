export interface FacultyMember {
  id: string;
  name: string;
  salutation: string;
  designation: "Professor" | "Associate Professor" | "Assistant Professor" | "Visiting Faculty" | "Adjunct Faculty" | "Director";
  department: "Computer Science & Engineering" | "Electronics & Communication Engineering" | "Mathematics & Basic Sciences" | "Physics & Space Sciences" | "Humanities & Interdisciplinary";
  departmentShort: "CSE" | "ECE" | "Mathematics" | "Physics" | "Sciences";
  roleTitle?: string; // e.g. "Director", "Faculty In-Charge Academics", "Faculty In-Charge Ph.D."
  email: string;
  personalWebsite?: string;
  googleScholarUrl?: string;
  orchidId?: string;
  avatarUrl?: string;
  initials: string;
  highestDegree: string;
  almaMater: string;
  joiningYear?: string;
  researchInterests: string[];
  expertiseTags: string[];
  biography: string;
  officeLocation: string;
  officeHours?: string;
  acceptingResearchStudents: boolean;
  acceptsMessages: boolean;
  messagingPolicy?: string;
  verifiedInstitutional: boolean;
  publicationsCount?: number;
  featuredPublications?: {
    title: string;
    venue: string;
    year: number;
    doi?: string;
    citations?: number;
  }[];
  activeProjects?: {
    title: string;
    fundingAgency: string;
    role: string;
    duration: string;
    grantAmount?: string;
  }[];
  administrativeRoles?: string[];
  coursesTaught?: string[];
}

export interface AdministrativeOfficer {
  id: string;
  name: string;
  designation: string;
  officeName: string;
  category: "Directorate" | "Registry" | "Academics & Examination" | "Training & Placement" | "Finance & Accounts" | "Hostels & Student Welfare" | "Estate & IT";
  responsibility: string;
  keyFunctions: string[];
  email: string;
  profileUrl?: string;
  officePhone?: string;
  intercom?: string;
  officeLocation: string;
  availabilityHours: string;
  avatarUrl?: string;
  initials: string;
  reportTo: string;
  acceptsMessages: boolean;
  emergencyContact?: boolean;
}

export interface GovernanceMember {
  id: string;
  name: string;
  roleInBody: string; // e.g., "Chairman", "Member Secretary", "External Academic Expert"
  designation: string;
  affiliation: string; // e.g., "Director, IIIT Kalyani", "Professor, IIT Kharagpur", "Ministry of Education"
  category: "Ex-Officio" | "Government Nominee" | "Industry Nominee" | "Academic Expert" | "Faculty Nominee" | "Student Nominee";
  avatarUrl?: string;
  profileUrl?: string;
}

export interface InstitutionalBody {
  id: string;
  name: string;
  shortName: string;
  category: "Apex Statutory" | "Academic Regulatory" | "Financial Oversight" | "Student Safety & Equity" | "Grievance Redressal";
  mandate: string;
  powersAndDuties: string[];
  headOrChairperson: string;
  convenorOrSecretary: string;
  officialEmail: string;
  meetingFrequency: string;
  members: GovernanceMember[];
}

export interface ResearchAreaDetail {
  id: string;
  title: string;
  domain: "Artificial Intelligence" | "Systems & Security" | "Communications & Hardware" | "Interdisciplinary & Basic Sciences";
  description: string;
  keySubtopics: string[];
  associatedFacultyIds: string[];
  activeLabs: string[];
  openOpportunities: {
    title: string;
    level: "B.Tech Project" | "M.Tech Thesis" | "PhD Fellowship" | "Summer Research";
    mentorId: string;
    description: string;
  }[];
}

export interface HelpQueryMapping {
  id: string;
  category: "Academic Issue" | "Examination & Grades" | "Research Inquiry" | "Internship & Placement" | "Hostel & Mess" | "Scholarship & Fees" | "Anti-Ragging & Disciplinary" | "Internal Complaints (ICC)" | "Grievance Redressal" | "Library & Access" | "IT & Lab Infrastructure" | "Gymkhana & Clubs";
  iconName: string;
  title: string;
  description: string;
  recommendedOfficerId?: string;
  recommendedFacultyId?: string;
  recommendedBodyId?: string;
  actionGuidance: string;
  escalationPath: string;
  directEmail: string;
  urgencyLevel: "Standard" | "Urgent" | "Immediate SOS";
}

export interface AcademicMessageAttachment {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  url?: string;
  name?: string;
  size?: string;
}

export interface AcademicMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "Student" | "Faculty" | "Admin" | "Scholar";
  senderDetails: string;
  senderEmail: string;
  recipientId: string;
  recipientName: string;
  recipientRole: string;
  recipientEmail: string;
  subjectCategory: "Academic Query" | "Research Inquiry" | "Project Discussion" | "Recommendation / Reference" | "Administrative Question" | "Other";
  subject: string;
  body: string;
  timestamp: string;
  status: "Sent" | "Delivered" | "Read";
  attachments?: AcademicMessageAttachment[];
}

export interface AcademicConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantDepartment?: string;
  participantEmail: string;
  participantAvatar?: string;
  subjectCategory: "Academic Query" | "Research Inquiry" | "Project Discussion" | "Recommendation / Reference" | "Administrative Question" | "Other";
  subject: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  isStarred: boolean;
  isArchived: boolean;
  isMuted: boolean;
  isBlocked: boolean;
  isRequest: boolean; // Message request (for non-contacts/first-time student contacts)
  requestStatus?: "pending" | "accepted" | "declined";
  messages: AcademicMessage[];
}

export interface ModerationReport {
  id: string;
  conversationId: string;
  messageId?: string;
  reporterName: string;
  reporterRole: string;
  reportedUserName: string;
  reportedUserRole: string;
  category: "Spam" | "Harassment" | "Abusive Content" | "Impersonation" | "Other";
  reason: string;
  timestamp: string;
  status: "Pending Review" | "Investigating" | "Resolved" | "Dismissed";
  adminNotes?: string;
}

// -------------------------------------------------------------
// OFFICIAL IIIT KALYANI FACULTY DATASET (Verified Institutional Directory)
// -------------------------------------------------------------

export const officialFacultyList: FacultyMember[] = [
  {
    id: "fac-suman-chakraborty",
    name: "Prof. Suman Chakraborty",
    salutation: "Prof.",
    designation: "Director",
    department: "Computer Science & Engineering",
    departmentShort: "CSE",
    roleTitle: "Director, IIIT Kalyani & Director, IIT Kharagpur • Chairman, Senate",
    email: "director@iiitkalyani.ac.in",
    personalWebsite: "https://iiitkalyani.ac.in/director",
    googleScholarUrl: "https://scholar.google.com/citations?user=suman_chakraborty",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/08/11/suman.png",
    initials: "SC",
    highestDegree: "Ph.D., FNA, FNAE, FNASc, FASc",
    almaMater: "Indian Institute of Science (IISc) / IIT Kharagpur",
    researchInterests: ["Microfluidics", "Computational Fluid Dynamics", "Biomedical Microdevices", "Transport Phenomena", "AI in Physical Systems"],
    expertiseTags: ["Director", "Fluid Mechanics", "Microfluidics", "Bio-MEMS", "Point-of-Care Devices", "AI in Physical Systems"],
    biography: "Prof. Suman Chakraborty is the Director of IIT Kharagpur and has assumed the additional charge of Director, IIIT Kalyani. A distinguished academician and Shanti Swarup Bhatnagar Awardee, he is a Fellow of several prestigious national academies (FNA, FNAE, FNASc, FASc). At IIIT Kalyani, he is leading the institute's pursuit of academic excellence, cutting-edge research, innovation, industry collaboration, and institution building, with a vision focused on strengthening the institute as an Institute of National Importance.",
    officeLocation: "Director's Office, LHC 3rd Floor, IIIT Kalyani Campus",
    officeHours: "By Prior Appointment with Directorate Secretariat",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Official institutional governance and high-level academic inquiries only. Please route routine student requests through respective Deans/HODs/AR.",
    verifiedInstitutional: true,
    publicationsCount: 380,
    featuredPublications: [
      { title: "Microfluidics and Microscale Transport Phenomena", venue: "CRC Press & Annual Reviews", year: 2023, citations: 420 },
      { title: "Point-of-Care Diagnostics: Electrokinetics and Multiphase Flows", venue: "Nature Communications / Lab on a Chip", year: 2024, citations: 210 }
    ],
    administrativeRoles: ["Director, IIIT Kalyani", "Director, IIT Kharagpur", "Chairperson (Ex Officio), Senate", "Member (Ex-Officio), Board of Governors"]
  },
  {
    id: "fac-amit-ranjan-azad",
    name: "Dr. Amit Ranjan Azad",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Electronics & Communication Engineering",
    departmentShort: "ECE",
    roleTitle: "Faculty In-Charge Ph.D. & Senate Member",
    email: "amitranjanazad@iiitkalyani.ac.in",
    personalWebsite: "https://sites.google.com/view/amitranjanazad",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/03/20/Amit_Ranjan_Azad_1773998975_d2c15d97.png",
    initials: "AA",
    highestDegree: "Ph.D. in RF & Microwave Engineering",
    almaMater: "Indian Institute of Technology",
    researchInterests: ["Microwave Circuits", "Microwave Filters", "Antennas", "Antenna Array Synthesis", "RF System Design"],
    expertiseTags: ["Microwave Circuits", "Microwave Filters", "Antennas", "Antenna Array Synthesis", "RF Design"],
    biography: "Dr. Amit Ranjan Azad is an Assistant Professor in the Department of Electronics & Communication Engineering at IIIT Kalyani. His primary research domains include microwave planar circuits, multi-band microwave filters, microstrip antennas, and advanced antenna array synthesis for modern communication systems.",
    officeLocation: "Faculty Block, Room 201, IIIT Kalyani Campus",
    officeHours: "Monday & Wednesday: 3:00 PM – 5:00 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Students interested in RF/Microwave circuits, Antenna design, BTP projects, or Ph.D. research may reach out with their academic profile.",
    verifiedInstitutional: true,
    publicationsCount: 38,
    featuredPublications: [
      { title: "Design of Compact Dual-Band Bandpass Filter with Wide Out-of-Band Rejection", venue: "IEEE Microwave and Wireless Components Letters", year: 2023, citations: 45 },
      { title: "Synthesis of Linear and Planar Antenna Arrays for 5G Millimeter-Wave Applications", venue: "IEEE Transactions on Antennas and Propagation", year: 2024, citations: 32 }
    ],
    administrativeRoles: ["Faculty In-Charge Ph.D.", "Member, The Senate"],
    coursesTaught: ["Electromagnetic Fields and Waves", "Microwave Engineering", "Antenna and Wave Propagation", "RF Circuit Design"]
  },
  {
    id: "fac-anirban-lakshman",
    name: "Dr. Anirban Lakshman",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Mathematics & Basic Sciences",
    departmentShort: "Mathematics",
    roleTitle: "Assistant Professor",
    email: "anirban@iiitkalyani.ac.in",
    personalWebsite: "https://orcid.org/0000-0002-4350-0844",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/03/09/Anirban_Lakshman_1773042470_91b6d1ad.png",
    initials: "AL",
    highestDegree: "Ph.D. in Applied Mathematics",
    almaMater: "Indian Institute of Technology (IIT) (ISM) Dhanbad",
    researchInterests: ["Mathematical Modeling", "Elastodynamics", "Theoretical Seismology", "Solid Mechanics", "Wave Propagation in Anisotropic Media"],
    expertiseTags: ["Mathematical Modeling", "Elastodynamics", "Theoretical Seismology", "Solid Mechanics", "Differential Equations"],
    biography: "Dr. Anirban Lakshman is an Assistant Professor in Mathematics at IIIT Kalyani. His research explores mathematical modeling of seismic wave propagation in layered elastic, viscoelastic, and anisotropic media, elastodynamics, and boundary value problems in solid mechanics.",
    officeLocation: "Faculty Block, Room 212, IIIT Kalyani Campus",
    officeHours: "Tuesday & Thursday: 2:00 PM – 4:00 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Students seeking guidance on Engineering Mathematics, Linear Algebra, or mathematical modeling research may contact during office hours.",
    verifiedInstitutional: true,
    publicationsCount: 32,
    featuredPublications: [
      { title: "Propagation of Surface Waves in Non-Homogeneous Anisotropic Elastic Layered Structures", venue: "Geophysical Journal International (Oxford)", year: 2023, citations: 34 },
      { title: "Elastodynamic Response of Functionally Graded Media under Thermal and Mechanical Stresses", venue: "Applied Mathematical Modelling (Elsevier)", year: 2024, citations: 22 }
    ],
    administrativeRoles: ["Coordinator, Basic Sciences Curriculum", "Member, Academic Disciplinary Committee"],
    coursesTaught: ["Linear Algebra & Calculus", "Differential Equations & Numerical Methods", "Probability & Complex Variables"]
  },
  {
    id: "fac-bhaskar-biswas",
    name: "Dr. Bhaskar Biswas",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    departmentShort: "CSE",
    roleTitle: "Assistant Professor",
    email: "bhaskar@iiitkalyani.ac.in",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2025/08/30/bhas.jpg",
    initials: "BB",
    highestDegree: "Ph.D. in Computer Science & Engineering",
    almaMater: "Indian Statistical Institute / Jadavpur University",
    researchInterests: ["Coding Theory", "Cryptology", "Algebraic Codes", "Quantum Error Correction", "Information Security"],
    expertiseTags: ["Coding Theory", "Cryptology", "Error Correcting Codes", "Information Theory", "Algebraic Cryptography"],
    biography: "Dr. Bhaskar Biswas is an Assistant Professor in the Department of Computer Science & Engineering at IIIT Kalyani. His primary areas of expertise cover coding theory, error-correcting codes, algebraic cryptography, and post-quantum cryptographic primitives.",
    officeLocation: "Faculty Block, Room 203, IIIT Kalyani Campus",
    officeHours: "Monday & Thursday: 11:00 AM – 1:00 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Please mention roll number and course/project subject in your message.",
    verifiedInstitutional: true,
    publicationsCount: 28,
    featuredPublications: [
      { title: "Algebraic Decoding of High-Rate Cyclic Codes over Finite Fields", venue: "IEEE Transactions on Information Theory", year: 2023, citations: 29 },
      { title: "Code-Based Cryptographic Schemes under Chosen Ciphertext Attacks", venue: "Journal of Cryptology", year: 2024, citations: 19 }
    ],
    administrativeRoles: ["Faculty In-Charge, Computational Lab Infrastructure"],
    coursesTaught: ["Coding Theory & Cryptography", "Discrete Structures", "Design & Analysis of Algorithms", "Theory of Computation"]
  },
  {
    id: "fac-dalia-nandi",
    name: "Dr. Dalia Nandi",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Electronics & Communication Engineering",
    departmentShort: "ECE",
    roleTitle: "Assistant Professor (Grade I) & Faculty In-Charge Academics",
    email: "dalia@iiitkalyani.ac.in",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/03/09/Dalia_Nandi_1773042254_f0d97ae1.png",
    initials: "DN",
    highestDegree: "Ph.D. in Electronics & Telecommunication",
    almaMater: "Jadavpur University",
    researchInterests: ["5G and beyond", "IoT based Embedded system", "AI/ML in Wireless Communication", "Quantum Communication", "Signal Processing"],
    expertiseTags: ["5G & Beyond", "IoT Embedded Systems", "AI/ML in Wireless", "Quantum Communication", "Wireless Signal Processing"],
    biography: "Dr. Dalia Nandi is an Assistant Professor (Grade I) in ECE at IIIT Kalyani. She serves on the Board of Governors (BoG) and the Senate, and is Faculty In-Charge (Academics). Her research spans 5G/6G wireless networks, quantum communications, IoT-embedded architectures, and machine learning optimizations in wireless channels.",
    officeLocation: "Faculty Block, Room 208, IIIT Kalyani Campus",
    officeHours: "Tuesday & Thursday: 3:00 PM – 5:00 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Students with queries regarding ECE academics, IoT embedded hardware research, or 5G communications may contact with clear details.",
    verifiedInstitutional: true,
    publicationsCount: 46,
    featuredPublications: [
      { title: "Machine Learning Framework for Resource Optimization in 5G Dense Heterogeneous Networks", venue: "IEEE Internet of Things Journal", year: 2023, citations: 58 },
      { title: "Quantum Key Distribution Protocols for Resource-Constrained IoT Hardware", venue: "IEEE Transactions on Quantum Engineering", year: 2024, citations: 34 }
    ],
    administrativeRoles: ["Member, Board of Governors (BoG)", "Member, The Senate", "Faculty In-Charge Academics (ECE)"],
    coursesTaught: ["Wireless Communications", "IoT & Embedded Systems", "Digital Signal Processing", "Communication Systems"]
  },
  {
    id: "fac-debasish-bera",
    name: "Dr. Debasish Bera",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    departmentShort: "CSE",
    roleTitle: "Assistant Professor",
    email: "debasish@iiitkalyani.ac.in",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/03/09/bebashis_bera_1773041831_1a2969b0.png",
    initials: "DB",
    highestDegree: "Ph.D. in Computer Science & Engineering",
    almaMater: "Indian Institute of Technology (IIT) Kharagpur",
    researchInterests: ["Coding Theory", "Information Theory", "Post-Quantum Cryptography", "Communication Signal Processing", "Blockchain"],
    expertiseTags: ["Coding Theory", "Information Theory", "Post-Quantum Cryptography", "Communication Signal Processing", "Blockchain"],
    biography: "Dr. Debasish Bera is an Assistant Professor in the Department of Computer Science & Engineering at IIIT Kalyani. His research interests focus on coding theory, information-theoretic security, post-quantum cryptographic primitives, signal processing for digital communications, and decentralized blockchain systems.",
    officeLocation: "Faculty Block, Room 202, IIIT Kalyani Campus",
    officeHours: "Tuesday & Friday: 2:30 PM – 4:30 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Students seeking BTP/MTP or Ph.D. supervision in cryptography, blockchain, and coding theory should attach their CV.",
    verifiedInstitutional: true,
    publicationsCount: 50,
    featuredPublications: [
      { title: "Efficient Attribute-Based Searchable Encryption for Encrypted Cloud Repositories", venue: "IEEE Transactions on Cloud Computing", year: 2023, citations: 44 },
      { title: "Lattice-Based Post-Quantum Cryptographic Protocols for Blockchain Gateways", venue: "Computers & Security (Elsevier)", year: 2024, citations: 31 }
    ],
    administrativeRoles: ["Coordinator, Central Computing Facilities", "Member, Anti-Ragging Committee"],
    coursesTaught: ["Cryptography & Information Security", "Information Theory & Coding", "Computer Networks", "Theory of Computation"]
  },
  {
    id: "fac-imon-mukherjee",
    name: "Dr. Imon Mukherjee",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    departmentShort: "CSE",
    roleTitle: "Assistant Professor (Gr.-1)",
    email: "imon@iiitkalyani.ac.in",
    personalWebsite: "https://imonmukherjee.vercel.app/",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2025/08/30/imon.jpg",
    initials: "IM",
    highestDegree: "Ph.D. in Computer Science & Engineering",
    almaMater: "Jadavpur University",
    researchInterests: ["Steganography", "Quantum Cryptography", "Data Analytics", "Information Security", "Digital Forensics"],
    expertiseTags: ["Steganography", "Quantum Cryptography", "Data Analytics", "Digital Watermarking", "Information Security"],
    biography: "Dr. Imon Mukherjee is an Assistant Professor (Gr.-1) in CSE at IIIT Kalyani. His primary research domains span information hiding, image and audio steganography, quantum cryptographic protocols, digital forensics, and big data analytics. He has published widely in IEEE and Springer journals.",
    officeLocation: "Faculty Block, Room 204, IIIT Kalyani Campus",
    officeHours: "Tuesday & Thursday: 3:00 PM – 5:00 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Students interested in research on Steganography, Quantum Security, Data Analytics, or B.Tech Projects may write with their project interest.",
    verifiedInstitutional: true,
    publicationsCount: 65,
    featuredPublications: [
      { title: "Secure Steganography in Transform Domain for High Payload Audio-Visual Media", venue: "IEEE Transactions on Information Forensics and Security", year: 2023, citations: 78 },
      { title: "Quantum Cryptographic Key Distribution Protocols for Multi-Party Secure Communication", venue: "Quantum Information Processing (Springer)", year: 2024, citations: 42 }
    ],
    administrativeRoles: ["Branch Counselor, IEEE Student Branch", "Coordinator, Institute Industry Relations"],
    coursesTaught: ["Information & Network Security", "Digital Forensics", "Data Analytics & Big Data", "Design & Analysis of Algorithms"]
  },
  {
    id: "fac-oishila-bandyopadhyay",
    name: "Dr. Oishila Bandyopadhyay",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    departmentShort: "CSE",
    roleTitle: "Assistant Professor & Faculty In-Charge Academics",
    email: "oishila@iiitkalyani.ac.in",
    personalWebsite: "https://scholar.google.co.in/citations?user=yKaKpWYAAAAJ&hl=en",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/03/09/Oishila_Bandyopadhyay_1773044172_6f75494b.png",
    initials: "OB",
    highestDegree: "Ph.D. in Computer Science & Engineering",
    almaMater: "Indian Institute of Engineering Science and Technology (IIEST), Shibpur",
    researchInterests: ["Medical Image Analysis", "Computer Vision", "Machine Learning", "Pattern Recognition", "Digital Geometry"],
    expertiseTags: ["Medical Image Analysis", "Computer Vision", "Machine Learning", "Deep Learning", "Pattern Recognition"],
    biography: "Dr. Oishila Bandyopadhyay is an Assistant Professor in CSE and Faculty In-Charge Academics at IIIT Kalyani, and an active Senate member. Her research centers on medical image analysis, deep learning for computational pathology and radiology (CT/MRI segmentation), and computer vision algorithms.",
    officeLocation: "Faculty Block, Room 207, IIIT Kalyani Campus",
    officeHours: "Monday & Wednesday: 2:00 PM – 4:00 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Students inquiring about Medical Computer Vision projects, Machine Learning electives, or BTP projects should reach out with project details.",
    verifiedInstitutional: true,
    publicationsCount: 48,
    featuredPublications: [
      { title: "3D Boundary Delineation and Volumetric Assessment in Skeletal CT Datasets", venue: "IEEE Transactions on Medical Imaging", year: 2023, citations: 52 },
      { title: "Attention-Guided Multi-Scale Feature Aggregation for Histopathology Image Classification", venue: "Pattern Recognition (Elsevier)", year: 2024, citations: 34 }
    ],
    administrativeRoles: ["Faculty In-Charge Academics (CSE)", "Member, The Senate", "Member, Internal Complaints Committee (ICC)"],
    coursesTaught: ["Computer Vision", "Machine Learning", "Pattern Recognition", "Data Structures & Algorithms"]
  },
  {
    id: "fac-pratik-chakraborty",
    name: "Dr. Pratik Chakraborty",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Electronics & Communication Engineering",
    departmentShort: "ECE",
    roleTitle: "Assistant Professor",
    email: "pratik@iiitkalyani.ac.in",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/03/09/Pratik_Chakraborty_1773044345_09025007.png",
    initials: "PC",
    highestDegree: "Ph.D. in Electronics & Communication Engineering",
    almaMater: "National Institute of Technology",
    researchInterests: ["Dynamic Spectrum Access in Next-Generation Wireless Networks", "Interference Management Techniques", "Multiple Access Networks", "Cognitive Radio Networks", "Physical Layer Security"],
    expertiseTags: ["Dynamic Spectrum Access", "Interference Management", "Multiple Access Networks", "Cognitive Radio Networks", "Physical Layer Security"],
    biography: "Dr. Pratik Chakraborty is an Assistant Professor in the Department of Electronics & Communication Engineering. His research investigates dynamic spectrum sharing, cognitive radio network protocols, interference cancellation algorithms in dense wireless environments, and physical layer security.",
    officeLocation: "Faculty Block, Room 210, IIIT Kalyani Campus",
    officeHours: "Monday & Friday: 11:00 AM – 1:00 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Welcome inquiries on wireless networks, cognitive radio systems, and communication theory.",
    verifiedInstitutional: true,
    publicationsCount: 34,
    featuredPublications: [
      { title: "Dynamic Spectrum Access and Power Allocation for Cognitive Radio Networks with NOMA", venue: "IEEE Transactions on Wireless Communications", year: 2023, citations: 41 },
      { title: "Physical Layer Security in Full-Duplex Cognitive Multiple Access Networks", venue: "IEEE Transactions on Information Forensics and Security", year: 2024, citations: 27 }
    ],
    administrativeRoles: ["Coordinator, ECE Simulation Laboratory"],
    coursesTaught: ["Analog & Digital Communication", "Wireless Communication Networks", "Information Theory", "Signals & Systems"]
  },
  {
    id: "fac-rabindranath-bera",
    name: "Prof. Dr. Rabindranath Bera",
    salutation: "Prof. Dr.",
    designation: "Visiting Faculty",
    department: "Electronics & Communication Engineering",
    departmentShort: "ECE",
    roleTitle: "Visiting Professor",
    email: "rbera@iiitkalyani.ac.in",
    personalWebsite: "https://scholar.google.com/citations?hl=en&user=j30d4mUAAAAJ&view_op=list_works&sortby=pubdate",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/03/09/Rabindranath_1773044790_e8551023.png",
    initials: "RB",
    highestDegree: "Ph.D. in Microwave & Wireless Engineering",
    almaMater: "Calcutta University / Leading National Institutes",
    researchInterests: ["Wireless Network", "5G Communication", "Radar & Satellite Systems", "Broadband Wireless Transceivers", "Millimeter-Wave Propagation"],
    expertiseTags: ["Wireless Network", "5G Communication", "Radar Systems", "Satellite Communications", "Broadband RF"],
    biography: "Prof. Dr. Rabindranath Bera is a distinguished Visiting Professor in the ECE Department at IIIT Kalyani. With decades of pioneering contributions in radar communication, microwave systems, and 5G cellular architectures, he mentors advanced research initiatives across wireless telecommunications.",
    officeLocation: "Advanced Wireless Research Lab, LHC 2nd Floor, IIIT Kalyani Campus",
    officeHours: "Thursday & Friday: 11:30 AM – 2:30 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "M.Tech and Ph.D. scholars working on 5G/6G physical layer architecture, millimeter-wave communications, and radar systems are welcome to consult.",
    verifiedInstitutional: true,
    publicationsCount: 140,
    featuredPublications: [
      { title: "Millimeter-Wave Wireless Transceiver Architecture for 5G Ultra-Dense Networks", venue: "IEEE Communications Magazine", year: 2023, citations: 112 },
      { title: "Cognitive Radar and Wireless Communication Co-existence in Shared Spectrum", venue: "IEEE Aerospace and Electronic Systems Magazine", year: 2024, citations: 68 }
    ],
    administrativeRoles: ["Senior Research Advisor, Advanced Wireless Center"],
    coursesTaught: ["Advanced Wireless Communications", "Radar & Satellite Engineering", "5G Network Architecture"]
  },
  {
    id: "fac-rinky-sha",
    name: "Dr. Rinky Sha",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Electronics & Communication Engineering",
    departmentShort: "ECE",
    roleTitle: "Assistant Professor",
    email: "rinky@iiitkalyani.ac.in",
    personalWebsite: "https://tutunsha4.wixsite.com/rinkysha",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/08/16/my_proffessnl_look_1786890296_f5124100.png",
    initials: "RS",
    highestDegree: "Ph.D. in Nanotechnology & Semiconductor Devices",
    almaMater: "Indian Institute of Technology",
    researchInterests: ["Semiconductor device physics", "Nano-electronics and Nanotechnology", "Bio and Gas Sensors", "2D Nanomaterials", "Energy storage devices", "Flexible Bio-Electronics", "AI-ML in Sensing"],
    expertiseTags: ["Semiconductor Physics", "Nano-electronics", "Bio & Gas Sensors", "2D Nanomaterials", "Energy Storage", "Flexible Bio-Electronics", "AI-ML in Sensing"],
    biography: "Dr. Rinky Sha is an Assistant Professor in the ECE Department at IIIT Kalyani. Her interdisciplinary research focuses on semiconductor physics, 2D nanomaterial synthesis, wearable and flexible bio-electronics, chemical and gas sensors, supercapacitors, and machine learning models for sensor signal classification.",
    officeLocation: "Faculty Block, Room 209, IIIT Kalyani Campus",
    officeHours: "Wednesday & Friday: 2:00 PM – 4:00 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Students interested in Nano-electronics, Sensor prototyping, Flexible Electronics, or AI in Sensing can reach out.",
    verifiedInstitutional: true,
    publicationsCount: 42,
    featuredPublications: [
      { title: "2D MXene and Graphene Hybrid Nanostructures for Highly Sensitive Electrochemical Biosensors", venue: "Biosensors and Bioelectronics (Elsevier)", year: 2023, citations: 65 },
      { title: "Flexible Wearable Sensor Array for Real-Time Physiological Monitoring with Machine Learning Signal Processing", venue: "ACS Applied Materials & Interfaces", year: 2024, citations: 48 }
    ],
    administrativeRoles: ["Coordinator, Nanodevices & Sensor Prototyping Bay", "Faculty Advisor, Women Engineers Cell"],
    coursesTaught: ["Semiconductor Devices", "Micro- and Nano-electronics", "Sensor Technology & Instrumentation", "VLSI Technology"]
  },
  {
    id: "fac-sanjay-chatterji",
    name: "Dr. Sanjay Chatterji",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    departmentShort: "CSE",
    roleTitle: "Assistant Professor",
    email: "sanjayc@iiitkalyani.ac.in",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2025/08/30/sanjay.jpg",
    initials: "SC",
    highestDegree: "Ph.D. in Computer Science & Engineering",
    almaMater: "Indian Institute of Technology (IIT) Kharagpur",
    researchInterests: ["Machine Learning", "Natural Language Processing", "Information Retrieval", "Data Analytics", "Machine Translation"],
    expertiseTags: ["Machine Learning", "Natural Language Processing", "Information Retrieval", "Data Analytics", "Indic NLP"],
    biography: "Dr. Sanjay Chatterji is an Assistant Professor in the CSE Department at IIIT Kalyani. His research explores Natural Language Processing, neural machine translation across Indic languages, automated information retrieval systems, text summarization, and data analytics pipelines.",
    officeLocation: "Faculty Block, Room 205, IIIT Kalyani Campus",
    officeHours: "Monday & Wednesday: 3:00 PM – 5:00 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "For inquiries regarding NLP datasets, Indic language models, and text mining research projects.",
    verifiedInstitutional: true,
    publicationsCount: 47,
    featuredPublications: [
      { title: "Neural Machine Translation for Low-Resource Indo-Aryan Languages using Cross-Lingual Knowledge Distillation", venue: "Transactions of the Association for Computational Linguistics (TACL)", year: 2023, citations: 41 },
      { title: "Aspect-Based Sentiment Extraction in Multilingual Code-Mixed Social Text", venue: "Information Processing & Management (Elsevier)", year: 2024, citations: 36 }
    ],
    administrativeRoles: ["Faculty In-Charge, Institute Web & IT Portal"],
    coursesTaught: ["Natural Language Processing", "Database Management Systems", "Artificial Intelligence", "Python for Computing"]
  },
  {
    id: "fac-sanjoy-pratihar",
    name: "Dr. Sanjoy Pratihar",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    departmentShort: "CSE",
    roleTitle: "Assistant Professor & Faculty In-Charge Ph.D.",
    email: "sanjoy@iiitkalyani.ac.in",
    personalWebsite: "https://sites.google.com/site/sanjoypratihar",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2025/08/30/sanjprat.jpg",
    initials: "SP",
    highestDegree: "Ph.D. in Computer Science & Engineering",
    almaMater: "Indian Institute of Technology (IIT) Kharagpur",
    researchInterests: ["Computer Vision", "Image Understanding", "Document Image Processing", "Digital Geometry", "Machine Learning"],
    expertiseTags: ["Computer Vision", "Image Understanding", "Document Image Processing", "Digital Geometry", "Pattern Recognition"],
    biography: "Dr. Sanjoy Pratihar is an Assistant Professor in CSE, Faculty In-Charge Ph.D., and an active Senate member at IIIT Kalyani. He earned his doctorate from IIT Kharagpur. His research spans Document Image Processing, historical document restoration, digital geometry, 3D image understanding, and visual recognition.",
    officeLocation: "Faculty Block, Room 206, IIIT Kalyani Campus",
    officeHours: "Wednesday & Friday: 11:00 AM – 1:00 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Always mention your roll number, batch, and purpose in the subject line.",
    verifiedInstitutional: true,
    publicationsCount: 42,
    featuredPublications: [
      { title: "Degraded Historical Document Binarization using Multi-Stage Generative Adversarial Networks", venue: "ACM Transactions on Asian and Low-Resource Language Information Processing", year: 2023, citations: 39 },
      { title: "Visual Landmark Recognition in Low-Resolution Historical Urban Imagery", venue: "Computer Vision and Image Understanding", year: 2024, citations: 22 }
    ],
    administrativeRoles: ["Faculty In-Charge Ph.D.", "Member, The Senate"],
    coursesTaught: ["Pattern Recognition", "Digital Image Processing", "Object Oriented Programming (Java/C++)", "Computer Graphics"]
  },
  {
    id: "fac-sk-hafizul-islam",
    name: "Dr. SK Hafizul Islam",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    departmentShort: "CSE",
    roleTitle: "Assistant Professor & BoG Member",
    email: "hafi786@iiitkalyani.ac.in",
    personalWebsite: "https://sites.google.com/site/hafi786/",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/03/09/Hafizul_Islam_1773044945_11bb8c68.png",
    initials: "HI",
    highestDegree: "Ph.D. in Computer Science & Cryptography",
    almaMater: "Indian Institute of Technology",
    researchInterests: ["Cryptography", "Information and Network Security", "IoT and Blockchain Security", "Authentication", "Provable Security", "Security in VANETs", "Post-Quantum Cryptography"],
    expertiseTags: ["Cryptography", "Network Security", "IoT & Blockchain Security", "Authentication", "Provable Security", "Security in VANETs", "Post-Quantum Cryptography"],
    biography: "Dr. SK Hafizul Islam is an Assistant Professor in the CSE Department at IIIT Kalyani and serves as a Faculty Member on the Board of Governors (BoG). A highly cited researcher, his expertise spans authenticated key agreement protocols, IoT and VANET security, provable cryptographic security, blockchain architectures, and post-quantum cryptographic primitives.",
    officeLocation: "Faculty Block, Room 211, IIIT Kalyani Campus",
    officeHours: "Monday & Thursday: 2:00 PM – 4:00 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Students seeking research collaboration in Cryptography, Network Security, or Blockchain should email with their resume and research background.",
    verifiedInstitutional: true,
    publicationsCount: 95,
    featuredPublications: [
      { title: "Design of Provably Secure Lightweight Authentication Protocol for Internet of Drones", venue: "IEEE Transactions on Vehicular Technology", year: 2023, citations: 89 },
      { title: "Post-Quantum Secure Key Encapsulation Mechanism for Vehicular Ad-hoc Networks", venue: "IEEE Transactions on Intelligent Transportation Systems", year: 2024, citations: 52 }
    ],
    administrativeRoles: ["Member, Board of Governors (BoG)", "Faculty Advisor, Cybersecurity Cell"],
    coursesTaught: ["Cryptography & Network Security", "Computer Networks", "Cybersecurity Protocols", "Operating Systems"]
  },
  {
    id: "fac-soumen-pandit",
    name: "Dr. Soumen Pandit",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Electronics & Communication Engineering",
    departmentShort: "ECE",
    roleTitle: "Assistant Professor",
    email: "soumen@iiitkalyani.ac.in",
    personalWebsite: "https://sites.google.com/view/soumenpandit",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/03/09/Soumen_Pandit_1773045163_16b07c56.png",
    initials: "SP",
    highestDegree: "Ph.D. in RF & Microwave Engineering",
    almaMater: "Indian Institute of Technology",
    researchInterests: ["RF CMOS Circuits", "Semiconductor Devices", "Antennas", "Metamaterial", "Metasurface", "Microwave Absorbers"],
    expertiseTags: ["RF CMOS Circuits", "Semiconductor Devices", "Antennas", "Metamaterials", "Metasurfaces", "Microwave Absorbers"],
    biography: "Dr. Soumen Pandit is an Assistant Professor in the ECE Department at IIIT Kalyani. His research specializes in RF CMOS integrated circuits, semiconductor device modeling, metamaterials, metasurface-based beam manipulation, microstrip antennas, and electromagnetic microwave absorbers.",
    officeLocation: "Faculty Block, Room 213, IIIT Kalyani Campus",
    officeHours: "Tuesday & Thursday: 11:00 AM – 1:00 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Students interested in RF circuits, Metasurfaces, and Antenna design may write with their project ideas.",
    verifiedInstitutional: true,
    publicationsCount: 36,
    featuredPublications: [
      { title: "Ultra-Thin Wideband Polarization-Insensitive Metamaterial Absorber for Microwave Applications", venue: "IEEE Transactions on Antennas and Propagation", year: 2023, citations: 44 },
      { title: "Design of Low-Noise RF CMOS Amplifier for 5G Millimeter-Wave Receivers", venue: "IEEE Transactions on Circuits and Systems I: Regular Papers", year: 2024, citations: 29 }
    ],
    administrativeRoles: ["In-Charge, RF & Metamaterial Engineering Laboratory"],
    coursesTaught: ["RF & Microwave Circuits", "Semiconductor Device Physics", "Analog Integrated Circuits", "Electromagnetics"]
  },
  {
    id: "fac-sudeshna-mondal",
    name: "Dr. Sudeshna Mondal",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Mathematics & Basic Sciences",
    departmentShort: "Mathematics",
    roleTitle: "Assistant Professor",
    email: "sudeshna@iiitkalyani.ac.in",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2025/08/30/sudesna.jpg",
    initials: "SM",
    highestDegree: "Ph.D. in Applied Mathematics & Mathematical Biology",
    almaMater: "Calcutta University / Jadavpur University",
    researchInterests: ["Mathematical Biology", "Ecological Modelling", "Nonlinear Dynamical Systems", "Population Dynamics", "Bifurcation Analysis"],
    expertiseTags: ["Mathematical Biology", "Ecological Modelling", "Nonlinear Dynamical Systems", "Population Dynamics", "Differential Equations"],
    biography: "Dr. Sudeshna Mondal is an Assistant Professor in Mathematics at IIIT Kalyani. Her research focuses on mathematical biology, ecological modeling, nonlinear dynamical systems, bifurcation theory, epidemic spread models, and bio-mathematical stability analysis.",
    officeLocation: "Faculty Block, Room 214, IIIT Kalyani Campus",
    officeHours: "Monday & Wednesday: 1:30 PM – 3:30 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Students seeking assistance in Mathematics or modeling biological systems can contact during consultation hours.",
    verifiedInstitutional: true,
    publicationsCount: 30,
    featuredPublications: [
      { title: "Bifurcation Analysis and Chaos in Prey-Predator Systems with Disease and Delay", venue: "Nonlinear Dynamics (Springer)", year: 2023, citations: 38 },
      { title: "Mathematical Modeling of Epidemic Waves with Behavioral Intervention Strategies", venue: "Applied Mathematical Modelling", year: 2024, citations: 24 }
    ],
    administrativeRoles: ["Coordinator, Student Academic Mentorship Cell"],
    coursesTaught: ["Calculus & Linear Algebra", "Numerical Methods", "Nonlinear Dynamics & Modeling", "Probability & Statistics"]
  },
  {
    id: "fac-uma-das",
    name: "Dr. Uma Das",
    salutation: "Dr.",
    designation: "Assistant Professor",
    department: "Physics & Space Sciences",
    departmentShort: "Physics",
    roleTitle: "Assistant Professor & Presiding Officer ICC",
    email: "uma@iiitkalyani.ac.in",
    personalWebsite: "https://sites.google.com/iiitkalyani.ac.in/uma",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/05/29/UD-May2026_1780037650_479fb338.jpg",
    initials: "UD",
    highestDegree: "Ph.D. in Space & Atmospheric Sciences",
    almaMater: "Physical Research Laboratory (PRL), Ahmedabad",
    researchInterests: ["Space and Atmospheric Sciences", "Satellite Data Mining", "Atmospheric Dynamics", "Ionosphere", "Tides and Planetary Waves", "Artificial Intelligence and Machine Learning in Space and Atmospheric"],
    expertiseTags: ["Space & Atmospheric Sciences", "Satellite Data Mining", "Atmospheric Dynamics", "Ionosphere", "Tides & Planetary Waves", "AI/ML in Space Science"],
    biography: "Dr. Uma Das is an Assistant Professor in Physics/Sciences at IIIT Kalyani. An atmospheric and space physicist, she investigates upper atmospheric dynamics, planetary waves, ionospheric irregularities, satellite lidar remote sensing, and AI/ML applications in space science under various national research grants.",
    officeLocation: "Faculty Block, Room 215, IIIT Kalyani Campus",
    officeHours: "Monday & Friday: 11:30 AM – 1:30 PM",
    acceptingResearchStudents: true,
    acceptsMessages: true,
    messagingPolicy: "Reach out for space data modeling, physics coursework, satellite data research, or ICC confidential inquiries.",
    verifiedInstitutional: true,
    publicationsCount: 44,
    featuredPublications: [
      { title: "Planetary Wave Signatures in Equatorial Mesosphere and Lower Thermosphere over the Indian Sector", venue: "Journal of Geophysical Research: Space Physics (AGU)", year: 2023, citations: 48 },
      { title: "Machine Learning Prediction of Ionospheric Scintillations using Satellite GPS Data", venue: "Advances in Space Research (Elsevier)", year: 2024, citations: 32 }
    ],
    administrativeRoles: ["Presiding Officer, Internal Complaints Committee (ICC)", "Faculty Advisor, Space & Astronomy Society"],
    coursesTaught: ["Engineering Physics", "Electromagnetics & Optics", "Space Weather & Atmospheric Dynamics"]
  }
];

// -------------------------------------------------------------
// OFFICIAL ADMINISTRATIVE OFFICERS (Verified Institutional Administration)
// -------------------------------------------------------------

export const officialAdministrationList: AdministrativeOfficer[] = [
  {
    id: "adm-director",
    name: "Prof. Suman Chakraborty",
    designation: "Director, IIIT Kalyani & Director, IIT Kharagpur",
    officeName: "Office of the Director",
    category: "Directorate",
    responsibility: "Apex executive administration, strategic institutional development, BoG and Senate leadership, high-level MoE liaisons, and overall academic vision.",
    keyFunctions: [
      "Institutional leadership, academic ordinances, and strategic expansion",
      "Chairperson of Senate and Executive Member of Board of Governors",
      "Executive approvals for academic ordinances and faculty appointments",
      "Grievance escalation and statutory reviews"
    ],
    email: "director@iiitkalyani.ac.in",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/08/11/suman.png",
    officePhone: "+91 33 2582 2240",
    intercom: "101",
    officeLocation: "Director's Office, LHC 3rd Floor, IIIT Kalyani Campus",
    availabilityHours: "Mon – Fri: 10:00 AM – 5:30 PM (By Prior Appointment)",
    initials: "SC",
    reportTo: "Board of Governors, IIIT Kalyani",
    acceptsMessages: true,
    emergencyContact: false
  },
  {
    id: "adm-registrar",
    name: "Dr. Kaoushik K Mukherjee",
    designation: "Registrar",
    officeName: "Central Registry & Administration",
    category: "Registry",
    responsibility: "Custodian of institute records, statutory compliance, human resources, estate management, admissions, legal matters, and ex officio non-member Secretary to BoG & Senate.",
    keyFunctions: [
      "Official administrative circulars, gazette compliance, and staff governance",
      "Legal, statutory, and Right to Information (RTI) management",
      "B.Tech/Ph.D. admissions (CSAB/JoSAA) compliance",
      "Institute infrastructure development tenders and MoUs"
    ],
    email: "registrar@iiitkalyani.ac.in",
    profileUrl: "https://iiitkalyani.ac.in/api/serve/2026/06/02/Curriculum_Vitae_Kaoushikk_09.18.2022_1.pdf",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2025/08/26/kaus.png",
    officePhone: "+91 33 2582 2242",
    intercom: "102",
    officeLocation: "Ground Floor, Administrative Wing, IIIT Kalyani Campus",
    availabilityHours: "Mon – Fri: 9:30 AM – 5:00 PM",
    initials: "KM",
    reportTo: "Director, IIIT Kalyani",
    acceptsMessages: true,
    emergencyContact: false
  },
  {
    id: "adm-deputy-registrar",
    name: "Dr. Muruganantham Ponnusamy",
    designation: "Deputy Registrar",
    officeName: "Office of the Deputy Registrar",
    category: "Registry",
    responsibility: "Assisting the Registrar in general administration, establishment, stores and purchase, student welfare coordination, and statutory filings.",
    keyFunctions: [
      "General establishment, staff administration, and service records",
      "Procurement, tendering, stores, and inventory verification",
      "Student welfare logistics, hostel coordination, and estate supervision",
      "Inter-departmental administrative operations"
    ],
    email: "mp@iiitkalyani.ac.in",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2025/08/26/mur.png",
    officePhone: "+91 33 2582 2243",
    intercom: "103",
    officeLocation: "Room 102, Administrative Wing, IIIT Kalyani Campus",
    availabilityHours: "Mon – Fri: 9:30 AM – 5:30 PM",
    initials: "MP",
    reportTo: "Registrar, IIIT Kalyani",
    acceptsMessages: true,
    emergencyContact: false
  },
  {
    id: "adm-ar-admin",
    name: "Dr. Madhumita Sengupta",
    designation: "Assistant Registrar (Administration in-charge)",
    officeName: "General Administration & Establishment Section",
    category: "Registry",
    responsibility: "Operational administrative management, human resources, office communications, campus logistical coordination, and dispatch.",
    keyFunctions: [
      "Administration in-charge of day-to-day campus operations",
      "Faculty and non-teaching staff service files and leave approvals",
      "Official notices, circulars, and institutional correspondence",
      "Campus transport and hospitality logistics"
    ],
    email: "madhumita@iiitkalyani.ac.in",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2025/08/26/madhu.png",
    officePhone: "+91 33 2582 2244",
    intercom: "104",
    officeLocation: "Room 103, Administrative Wing, IIIT Kalyani Campus",
    availabilityHours: "Mon – Fri: 10:00 AM – 5:00 PM",
    initials: "MS",
    reportTo: "Registrar & Deputy Registrar",
    acceptsMessages: true,
    emergencyContact: false
  },
  {
    id: "adm-ar-finance",
    name: "Mr. Dhiraj Jhawar",
    designation: "Assistant Registrar, Finance & Accounts",
    officeName: "Finance & Accounts Department",
    category: "Finance & Accounts",
    responsibility: "End-to-end management of institute finances, semester tuition fees, budget estimates, National Scholarship Portal (NSP) verification, audits, and payroll.",
    keyFunctions: [
      "Semester tuition fee receipts, online payment reconciliation, and no-dues clearance",
      "NSP (National Scholarship Portal) and state scholarship verifications",
      "Education loan demand letters and fee structure estimation certificates",
      "Research grant financial accounting and institute fellowship disbursements"
    ],
    email: "arf@iiitkalyani.ac.in",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2025/08/26/dhir.png",
    officePhone: "+91 33 2582 2245",
    intercom: "105",
    officeLocation: "Room 108, Administrative Block, IIIT Kalyani Campus",
    availabilityHours: "Mon – Fri: 10:30 AM – 1:30 PM & 3:00 PM – 4:30 PM",
    initials: "DJ",
    reportTo: "Finance Committee & Registrar",
    acceptsMessages: true,
    emergencyContact: false
  },
  {
    id: "adm-ar-exam-tnp",
    name: "Mr. Chinmoy Ghosh",
    designation: "Assistant Registrar (Examination and Training & Placement)",
    officeName: "Examination Cell & Training and Placement Section",
    category: "Academics & Examination",
    responsibility: "Conduct of mid-semester & end-semester examinations, grade card generation, transcripts, degree certificates, campus placement drives, and internship NOCs.",
    keyFunctions: [
      "Issuing official Transcripts, Bonafide Certificates, and Grade Sheets",
      "Examination scheduling, seating charts, and semester results publication",
      "Campus recruitment drives (T&P) and placement logistics coordination",
      "Processing No Objection Certificates (NOC) for summer internships"
    ],
    email: "chinmoy@iiitkalyani.ac.in",
    avatarUrl: "https://iiitkalyani.ac.in/api/serve/2025/08/26/chin.png",
    officePhone: "+91 33 2582 2246",
    intercom: "106",
    officeLocation: "Room 101, Academic Wing, IIIT Kalyani Campus",
    availabilityHours: "Mon – Fri: 10:00 AM – 1:00 PM & 2:30 PM – 4:30 PM",
    initials: "CG",
    reportTo: "Faculty In-Charge Academics & Registrar",
    acceptsMessages: true,
    emergencyContact: false
  }
];

// -------------------------------------------------------------
// OFFICIAL INSTITUTIONAL STATUTORY BODIES (BoG & Senate)
// -------------------------------------------------------------

export const officialInstitutionalBodies: InstitutionalBody[] = [
  {
    id: "bog",
    name: "The Second Board of Governors",
    shortName: "Board of Governors (BoG)",
    category: "Apex Statutory",
    mandate: "The supreme governing authority of the Indian Institute of Information Technology, Kalyani under the IIIT (PPP) Act, 2017. The Board is responsible for general superintendence, policy formulation, capital budgets, and strategic direction.",
    powersAndDuties: [
      "Formulate fundamental institutional policies and approve master development plans",
      "Sanction annual budgets, capital funding allocations, and audited financial statements",
      "Create faculty and administrative positions and approve senior appointments",
      "Confer degrees and approve institute statutes and academic ordinances"
    ],
    headOrChairperson: "Prof. Prem Vrat (Chairman, BoG)",
    convenorOrSecretary: "Dr. Kaoushik K Mukherjee (Registrar, ex officio non-member Secretary)",
    officialEmail: "director@iiitkalyani.ac.in",
    meetingFrequency: "Quarterly (At least 4 meetings annually)",
    members: [
      {
        id: "bog-prem-vrat",
        name: "Prof. Prem Vrat",
        roleInBody: "Chairman, BoG (ex-officio)",
        designation: "Chairman, Board of Governors",
        affiliation: "IIT (ISM) Dhanbad & IIIT Kalyani",
        category: "Ex-Officio",
        profileUrl: "https://iiitkalyani.ac.in/api/serve/2026/04/22/Brief_Profile_of_Prof._Prem_Vrat_060226.pdf"
      },
      {
        id: "bog-suman-chakraborty",
        name: "Prof. (Dr.) Suman Chakraborty",
        roleInBody: "Director of the Institute (Ex-Officio)",
        designation: "Director",
        affiliation: "IIIT Kalyani & IIT Kharagpur",
        category: "Ex-Officio",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/08/11/suman.png"
      },
      {
        id: "bog-saumya-gupta",
        name: "Ms. Saumya Gupta",
        roleInBody: "Central Govt. Nominee",
        designation: "Joint Secretary (TE)",
        affiliation: "Department of Higher Education, Ministry of Education, Govt. of India",
        category: "Government Nominee"
      },
      {
        id: "bog-sumant-sahay",
        name: "Sri Sumant Sahay",
        roleInBody: "State Govt. Nominee",
        designation: "IAS, Special Secretary",
        affiliation: "Department of IT&E, Govt. of West Bengal",
        category: "Government Nominee"
      },
      {
        id: "bog-kk-singh",
        name: "Sri K. K. Singh",
        roleInBody: "Nominee from Private Partners",
        designation: "Founder and Executive Chairman",
        affiliation: "ROLTA Foundation",
        category: "Industry Nominee"
      },
      {
        id: "bog-kausik-halder",
        name: "Sri Kausik Halder",
        roleInBody: "Nominee from Private Partners",
        designation: "HOD - Education, Skill and Emerging",
        affiliation: "WEBEL",
        category: "Industry Nominee"
      },
      {
        id: "bog-op-mishra",
        name: "Sri O. P. Mishra",
        roleInBody: "Nominee from Private Partners",
        designation: "Executive Director (Community Development)",
        affiliation: "Coal India Ltd",
        category: "Industry Nominee"
      },
      {
        id: "bog-dir-iitkgp",
        name: "Director, IIT Kharagpur",
        roleInBody: "Director of IIT/NIT in the Region",
        designation: "Director",
        affiliation: "Indian Institute of Technology Kharagpur",
        category: "Academic Expert"
      },
      {
        id: "bog-chittaranjan-mandal",
        name: "Prof. Chittaranjan Mandal",
        roleInBody: "Distinguished Educator (SC/ST Representative)",
        designation: "Professor",
        affiliation: "IIT Kharagpur",
        category: "Academic Expert"
      },
      {
        id: "bog-meenakshi-balakrishnan",
        name: "Prof. Meenakshi Balakrishnan",
        roleInBody: "Eminent Academician",
        designation: "Retd. Professor and Ex Deputy Director",
        affiliation: "IIT Delhi",
        category: "Academic Expert"
      },
      {
        id: "bog-sunil-khare",
        name: "Prof. Sunil Kumar Khare",
        roleInBody: "Eminent Academician",
        designation: "Director",
        affiliation: "IISER Kolkata",
        category: "Academic Expert"
      },
      {
        id: "bog-arpan-pal",
        name: "Dr. Arpan Pal",
        roleInBody: "Eminent Person",
        designation: "Distinguished Chief Scientist and Research Head, Embedded Devices and Intelligent Systems",
        affiliation: "TCS Research",
        category: "Industry Nominee"
      },
      {
        id: "bog-kaushik-dey",
        name: "Dr. Kaushik Dey",
        roleInBody: "Eminent Person",
        designation: "Head, Data Science & Quantum AI",
        affiliation: "Ericsson Research",
        category: "Industry Nominee"
      },
      {
        id: "bog-rashmi-sharma",
        name: "Dr. Rashmi Sharma",
        roleInBody: "Eminent Woman Scientist",
        designation: "Deputy Director",
        affiliation: "Space Application Centre (SAC), ISRO, Ahmedabad",
        category: "Academic Expert"
      },
      {
        id: "bog-hafizul-islam",
        name: "Dr. SK Hafizul Islam",
        roleInBody: "Faculty Member of the Institute",
        designation: "Assistant Professor",
        affiliation: "IIIT Kalyani",
        category: "Faculty Nominee"
      },
      {
        id: "bog-dalia-nandi",
        name: "Dr. Dalia Nandi",
        roleInBody: "Faculty Member of the Institute",
        designation: "Assistant Professor",
        affiliation: "IIIT Kalyani",
        category: "Faculty Nominee"
      },
      {
        id: "bog-kaoushik-mukherjee",
        name: "Dr. Kaoushik K Mukherjee",
        roleInBody: "Registrar (ex officio non-member Secretary)",
        designation: "Registrar",
        affiliation: "IIIT Kalyani",
        category: "Ex-Officio"
      }
    ]
  },
  {
    id: "senate",
    name: "The Senate",
    shortName: "Senate",
    category: "Academic Regulatory",
    mandate: "The supreme academic body of IIIT Kalyani, responsible for curriculum design, academic ordinances, admission criteria, examination guidelines, and the award of degrees.",
    powersAndDuties: [
      "Approve undergraduate, postgraduate, and Ph.D. curricula and course structure",
      "Formulate grading schemes (SGPA/CGPA), evaluation rules, and examination regulations",
      "Authorize new academic degree programs, departments, and interdisciplinary specializations",
      "Award Institute Medals and recommend Convocation degree lists to the BoG"
    ],
    headOrChairperson: "Prof. Suman Chakraborty (Chairperson, Ex Officio)",
    convenorOrSecretary: "Dr. Kaoushik K Mukherjee (Registrar, Member)",
    officialEmail: "academic@iiitkalyani.ac.in",
    meetingFrequency: "Periodic academic sessions as convened by Chairperson",
    members: [
      {
        id: "sen-suman",
        name: "Prof. Suman Chakraborty",
        roleInBody: "Chairperson (Ex Officio)",
        designation: "Director",
        affiliation: "IIIT Kalyani",
        category: "Ex-Officio",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/08/11/suman.png"
      },
      {
        id: "sen-shamik",
        name: "Prof. Shamik Sural",
        roleInBody: "Member",
        designation: "Professor, Dept. of Computer Science and Engineering",
        affiliation: "IIT Kharagpur",
        category: "Academic Expert",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/02/16/default-pic.jpg"
      },
      {
        id: "sen-mrinal",
        name: "Prof. Mrinal Kanti Mandal",
        roleInBody: "Member",
        designation: "Professor, Dept. of Electronics and Electrical Communication Engineering",
        affiliation: "IIT Kharagpur",
        category: "Academic Expert",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/02/16/default-pic.jpg"
      },
      {
        id: "sen-sarbani",
        name: "Prof. Sarbani Roy",
        roleInBody: "Member",
        designation: "Professor, Dept. of Computer Science and Engineering",
        affiliation: "Jadavpur University",
        category: "Academic Expert",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/02/16/default-pic.jpg"
      },
      {
        id: "sen-sandipan",
        name: "Dr. Sandipan Sarkar",
        roleInBody: "Member",
        designation: "Global Technology Executive – Data & AI",
        affiliation: "IBM",
        category: "Industry Nominee",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/02/16/default-pic.jpg"
      },
      {
        id: "sen-sanjay-churiwala",
        name: "Shri Sanjay Churiwala",
        roleInBody: "Member",
        designation: "Corporate Vice President",
        affiliation: "AMD",
        category: "Industry Nominee",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/02/16/default-pic.jpg"
      },
      {
        id: "sen-pinaki",
        name: "Dr. Pinaki Ghosh",
        roleInBody: "Member",
        designation: "Senior Advisor, KPMG India | IPR Chair Professor, NUJS Kolkata | Head IP, GE Healthcare | Founder, NASCAP",
        affiliation: "KPMG India / NUJS Kolkata",
        category: "Industry Nominee",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/02/16/default-pic.jpg"
      },
      {
        id: "sen-oishila",
        name: "Dr. Oishila Bandyopadhyay",
        roleInBody: "Member",
        designation: "Assistant Professor & Faculty In-Charge Academics",
        affiliation: "IIIT Kalyani",
        category: "Faculty Nominee",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/02/16/oishila.jpg"
      },
      {
        id: "sen-sanjoy",
        name: "Dr. Sanjoy Pratihar",
        roleInBody: "Member",
        designation: "Assistant Professor & Faculty In-Charge Ph.D.",
        affiliation: "IIIT Kalyani",
        category: "Faculty Nominee",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/02/16/Sanjoy-Pratihar.jpg"
      },
      {
        id: "sen-dalia",
        name: "Dr. Dalia Nandi",
        roleInBody: "Member",
        designation: "Assistant Professor & Faculty In-Charge Academics",
        affiliation: "IIIT Kalyani",
        category: "Faculty Nominee",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/02/16/Dalia-Nandi.jpg"
      },
      {
        id: "sen-amit",
        name: "Dr. Amit Ranjan Azad",
        roleInBody: "Member",
        designation: "Assistant Professor & Faculty In-Charge Ph.D.",
        affiliation: "IIIT Kalyani",
        category: "Faculty Nominee",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/02/16/amit-ranjan-azad.png"
      },
      {
        id: "sen-kaoushik",
        name: "Dr. Kaoushik K Mukherjee",
        roleInBody: "Member",
        designation: "Registrar",
        affiliation: "IIIT Kalyani",
        category: "Ex-Officio",
        avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/02/16/kaoushik.jpg"
      }
    ]
  },
  {
    id: "icc",
    name: "Internal Complaints Committee (ICC)",
    shortName: "ICC",
    category: "Student Safety & Equity",
    mandate: "Statutory committee constituted in strict accordance with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. ICC provides a completely confidential, impartial, and supportive grievance redressal forum for women students, faculty, and staff.",
    powersAndDuties: [
      "Investigate and adjudicate formal complaints of gender discrimination and sexual harassment",
      "Ensure complete confidentiality, safety, and psychological counseling for aggrieved individuals",
      "Recommend immediate protective interim measures and disciplinary actions to the Director",
      "Organize annual gender sensitization and POSH legal awareness workshops across campus"
    ],
    headOrChairperson: "Dr. Uma Das (Presiding Officer, ICC)",
    convenorOrSecretary: "ICC Member Secretary",
    officialEmail: "icc@iiitkalyani.ac.in",
    meetingFrequency: "Quarterly and within 24 hours of any formal incident reporting",
    members: [
      { id: "icc-1", name: "Dr. Uma Das", roleInBody: "Presiding Officer", designation: "Assistant Professor, Physics & Space Sciences", affiliation: "IIIT Kalyani", category: "Faculty Nominee" },
      { id: "icc-2", name: "Dr. Oishila Bandyopadhyay", roleInBody: "Member", designation: "Assistant Professor, CSE", affiliation: "IIIT Kalyani", category: "Faculty Nominee" },
      { id: "icc-3", name: "Dr. Madhumita Sengupta", roleInBody: "Member", designation: "Assistant Registrar (Administration in-charge)", affiliation: "IIIT Kalyani", category: "Ex-Officio" },
      { id: "icc-4", name: "External Legal Counselor", roleInBody: "External Member", designation: "Advocate & POSH Specialist", affiliation: "Calcutta High Court / Legal Cell", category: "Academic Expert" },
      { id: "icc-5", name: "Women Student Representative", roleInBody: "Student Member", designation: "Research Scholar", affiliation: "IIIT Kalyani", category: "Student Nominee" }
    ]
  },
  {
    id: "antiragging",
    name: "Anti-Ragging Committee & Squad",
    shortName: "Anti-Ragging Cell",
    category: "Student Safety & Equity",
    mandate: "High-powered statutory body enforcing Supreme Court of India directives and UGC regulations to ensure a 100% ragging-free, secure, and inclusive campus environment. Operates with active 24/7 vigil squads.",
    powersAndDuties: [
      "Maintain zero-tolerance anti-ragging compliance across all academic blocks, hostels, and transit",
      "Conduct unannounced day and midnight spot checks in student hostels and mess areas",
      "Collect and verify mandatory anti-ragging undertakings signed by students and parents",
      "Instant suspension, rustication, or legal referral for any proven act of intimidation"
    ],
    headOrChairperson: "Prof. Suman Chakraborty (Director)",
    convenorOrSecretary: "Dr. Kaoushik K Mukherjee (Registrar)",
    officialEmail: "antiragging@iiitkalyani.ac.in",
    meetingFrequency: "Monthly during academic semesters and weekly during Freshers onboarding",
    members: [
      { id: "ar-1", name: "Prof. Suman Chakraborty", roleInBody: "Chairman", designation: "Director", affiliation: "IIIT Kalyani", category: "Ex-Officio", avatarUrl: "https://iiitkalyani.ac.in/api/serve/2026/08/11/suman.png" },
      { id: "ar-2", name: "Dr. Kaoushik K Mukherjee", roleInBody: "Secretary", designation: "Registrar", affiliation: "IIIT Kalyani", category: "Ex-Officio" },
      { id: "ar-3", name: "Dr. SK Hafizul Islam", roleInBody: "Squad Member", designation: "Assistant Professor, CSE", affiliation: "IIIT Kalyani", category: "Faculty Nominee" },
      { id: "ar-4", name: "Dr. Amit Ranjan Azad", roleInBody: "Squad Member", designation: "Assistant Professor, ECE", affiliation: "IIIT Kalyani", category: "Faculty Nominee" },
      { id: "ar-5", name: "Sub-Divisional Police Officer (SDPO)", roleInBody: "Civil Administration Member", designation: "SDPO / Inspector In-Charge", affiliation: "Kalyani Police Station", category: "Government Nominee" }
    ]
  }
];

// -------------------------------------------------------------
// RESEARCH DOMAINS & EXPERTISE GRAPH DATA
// -------------------------------------------------------------

export const officialResearchAreas: ResearchAreaDetail[] = [
  {
    id: "res-cv-image-processing",
    title: "Computer Vision, Medical Imaging & Document Understanding",
    domain: "Artificial Intelligence",
    description: "Algorithmic computer vision, medical image analysis (CT/MRI volumetric segmentation), histopathology classification, historical document image processing, digital geometry, and pattern recognition.",
    keySubtopics: ["Medical Image Analysis (CT/MRI)", "Computer Vision & Deep Learning", "Document Image Processing", "Digital Geometry", "Pattern Recognition & OCR"],
    associatedFacultyIds: ["fac-oishila-bandyopadhyay", "fac-sanjoy-pratihar", "fac-imon-mukherjee"],
    activeLabs: ["Computer Vision & Document Intelligence Lab", "Medical Image Processing Facility"],
    openOpportunities: [
      {
        title: "Deep Volumetric Segmentation for Lung CT Scans",
        level: "B.Tech Project",
        mentorId: "fac-oishila-bandyopadhyay",
        description: "Develop 3D attention UNet architectures for automated multi-nodule segmentation on low-dose chest CT datasets."
      },
      {
        title: "Historical Indic Manuscript Restoration using GANs",
        level: "M.Tech Thesis",
        mentorId: "fac-sanjoy-pratihar",
        description: "Investigate diffusion and adversarial models to reconstruct faded scripts and multi-lingual Indian manuscripts."
      }
    ]
  },
  {
    id: "res-crypto-security",
    title: "Cryptography, Coding Theory & Information Security",
    domain: "Systems & Security",
    description: "Foundational and applied cryptography, coding theory, error-correcting codes, post-quantum cryptography, IoT & blockchain security, authentication protocols, provable security, steganography, and digital forensics.",
    keySubtopics: ["Cryptography & Network Security", "Coding Theory & Error Correction", "Post-Quantum Cryptography", "IoT & Blockchain Security", "Steganography & Digital Forensics", "Authentication & Provable Security"],
    associatedFacultyIds: ["fac-sk-hafizul-islam", "fac-debasish-bera", "fac-bhaskar-biswas", "fac-imon-mukherjee"],
    activeLabs: ["Cryptography & Network Security Center", "Cyber Forensics & Information Hiding Bay"],
    openOpportunities: [
      {
        title: "Post-Quantum Secure Key Exchange for IoT Gateways",
        level: "PhD Fellowship",
        mentorId: "fac-sk-hafizul-islam",
        description: "Design lattice-based authenticated key exchange protocols resilient against quantum side-channel attacks."
      },
      {
        title: "Privacy-Preserving Searchable Encryption for Cloud Repositories",
        level: "B.Tech Project",
        mentorId: "fac-debasish-bera",
        description: "Implement multi-party homomorphic encryption primitives for distributed medical model training."
      }
    ]
  },
  {
    id: "res-ai-nlp-analytics",
    title: "Artificial Intelligence, NLP & Machine Learning",
    domain: "Artificial Intelligence",
    description: "Foundational machine learning, Natural Language Processing (NLP), neural machine translation for low-resource Indic languages, information retrieval, sentiment analysis, and large-scale data analytics.",
    keySubtopics: ["Natural Language Processing (NLP)", "Machine Learning & Deep Learning", "Machine Translation (Indic Languages)", "Information Retrieval", "Data Analytics"],
    associatedFacultyIds: ["fac-sanjay-chatterji", "fac-oishila-bandyopadhyay", "fac-imon-mukherjee"],
    activeLabs: ["AI & Data Science Computing Cluster", "Natural Language Technologies Lab"],
    openOpportunities: [
      {
        title: "Indic Multilingual Code-Mixed Summarizer using LLMs",
        level: "B.Tech Project",
        mentorId: "fac-sanjay-chatterji",
        description: "Fine-tune lightweight multilingual foundation models on Bengali-Hindi-English mixed conversations."
      },
      {
        title: "Quantum-Enhanced Data Analytics for Complex Media",
        level: "Summer Research",
        mentorId: "fac-imon-mukherjee",
        description: "Explore quantum algorithmic feature extraction for big data analytics."
      }
    ]
  },
  {
    id: "res-rf-microwave-circuits",
    title: "Microwave Circuits, RF CMOS, Antennas & Metamaterials",
    domain: "Communications & Hardware",
    description: "Microwave planar circuits, microwave filters, antenna array synthesis, RF CMOS circuits, metamaterials, metasurfaces, electromagnetic microwave absorbers, and semiconductor device physics.",
    keySubtopics: ["Microwave Circuits & Filters", "Antennas & Antenna Array Synthesis", "RF CMOS Circuits", "Metamaterials & Metasurfaces", "Microwave Absorbers"],
    associatedFacultyIds: ["fac-amit-ranjan-azad", "fac-soumen-pandit"],
    activeLabs: ["RF & Microwave Engineering Lab", "Antenna Design & Metamaterials Bay"],
    openOpportunities: [
      {
        title: "Multi-Band Metamaterial Microwave Absorbers for Stealth Applications",
        level: "B.Tech Project",
        mentorId: "fac-soumen-pandit",
        description: "Design and simulate ultra-thin metasurface absorbers for X-band and Ku-band electromagnetic shielding."
      },
      {
        title: "Planar Antenna Array Synthesis for 5G Millimeter-Wave Links",
        level: "M.Tech Thesis",
        mentorId: "fac-amit-ranjan-azad",
        description: "Synthesize high-gain beamforming microstrip antenna arrays using genetic and evolutionary algorithms."
      }
    ]
  },
  {
    id: "res-wireless-5g-quantum",
    title: "5G & Beyond, Wireless Networks & Quantum Communications",
    domain: "Communications & Hardware",
    description: "Next-generation 5G/6G wireless networks, dynamic spectrum access, cognitive radio networks, multiple access techniques, physical layer security, AI/ML in wireless communication, quantum communication, and IoT embedded systems.",
    keySubtopics: ["5G & Beyond Wireless Networks", "Dynamic Spectrum Access & Cognitive Radio", "Quantum Communication", "AI/ML in Wireless Communications", "IoT Based Embedded Systems"],
    associatedFacultyIds: ["fac-dalia-nandi", "fac-pratik-chakraborty", "fac-rabindranath-bera"],
    activeLabs: ["5G & Advanced Wireless Communications Lab", "Embedded IoT Systems Bay"],
    openOpportunities: [
      {
        title: "Dynamic Spectrum Access with NOMA in 5G Cognitive Networks",
        level: "B.Tech Project",
        mentorId: "fac-pratik-chakraborty",
        description: "Investigate non-orthogonal multiple access protocols with dynamic spectrum sharing under dense interference."
      },
      {
        title: "Quantum Key Distribution Protocol for Embedded IoT Nodes",
        level: "PhD Fellowship",
        mentorId: "fac-dalia-nandi",
        description: "Develop lightweight simulation testbeds for quantum key exchange in wireless edge devices."
      }
    ]
  },
  {
    id: "res-nanodevices-sensors",
    title: "Nano-electronics, Bio & Gas Sensors & Flexible Bio-Electronics",
    domain: "Communications & Hardware",
    description: "Semiconductor device physics, nano-electronics and nanotechnology, 2D nanomaterials, bio and gas sensors, energy storage devices, flexible bio-electronics, and AI-ML in sensing.",
    keySubtopics: ["Semiconductor Device Physics", "Nano-electronics & 2D Materials", "Bio and Gas Sensors", "Flexible Bio-Electronics", "Energy Storage Devices", "AI-ML in Sensing"],
    associatedFacultyIds: ["fac-rinky-sha", "fac-soumen-pandit"],
    activeLabs: ["Nano-electronics & Bio-Sensors Bay", "Semiconductor Device Characterization Lab"],
    openOpportunities: [
      {
        title: "Wearable Flexible Sensor Array for Bio-Signal Monitoring",
        level: "B.Tech Project",
        mentorId: "fac-rinky-sha",
        description: "Fabricate 2D nanomaterial-based flexible patches and interface with ML signal classification models."
      }
    ]
  },
  {
    id: "res-space-math-biology",
    title: "Space Physics, Atmospheric Science, Mathematical Modeling & Biology",
    domain: "Interdisciplinary & Basic Sciences",
    description: "Space and atmospheric sciences, satellite data mining, atmospheric dynamics, ionospheric waves, AI/ML in space physics, mathematical modeling, elastodynamics, theoretical seismology, mathematical biology, and ecological systems.",
    keySubtopics: ["Space & Atmospheric Sciences", "Satellite Data Mining", "AI/ML in Space Physics", "Mathematical Modeling & Elastodynamics", "Mathematical Biology & Nonlinear Dynamics"],
    associatedFacultyIds: ["fac-uma-das", "fac-anirban-lakshman", "fac-sudeshna-mondal"],
    activeLabs: ["Atmospheric & Space Data Research Bay", "Mathematical Modeling & Computation Lab"],
    openOpportunities: [
      {
        title: "Satellite Data Mining for Atmospheric Waves & Ionosphere",
        level: "Summer Research",
        mentorId: "fac-uma-das",
        description: "Apply machine learning to satellite remote sensing datasets to study ionospheric irregularities and atmospheric tides."
      },
      {
        title: "Nonlinear Dynamics and Bifurcation in Eco-Epidemic Models",
        level: "B.Tech Project",
        mentorId: "fac-sudeshna-mondal",
        description: "Model delay differential equations for interacting populations under disease pressures."
      }
    ]
  }
];

// -------------------------------------------------------------
// "WHO CAN HELP?" INTELLIGENT MATCHING ENGINE (Responsibility-First)
// -------------------------------------------------------------

export const officialHelpQueries: HelpQueryMapping[] = [
  {
    id: "help-exam-grades",
    category: "Examination & Grades",
    iconName: "FileCheck",
    title: "Grade card issue, backlog exam, transcript or marksheet dispute",
    description: "Inquiries regarding semester marksheets, grade corrections, backlog exam registration, duplicate grade cards, and official sealed transcripts.",
    recommendedOfficerId: "adm-ar-exam-tnp",
    actionGuidance: "Contact Mr. Chinmoy Ghosh, Assistant Registrar (Examination) in Room 101 during window hours (10:00 AM – 1:00 PM).",
    escalationPath: "Assistant Registrar (Examination) → Faculty In-Charge Academics (Dr. Oishila Bandyopadhyay / Dr. Dalia Nandi) → Registrar",
    directEmail: "chinmoy@iiitkalyani.ac.in",
    urgencyLevel: "Standard"
  },
  {
    id: "help-research-phd-btp",
    category: "Research Inquiry",
    iconName: "Atom",
    title: "B.Tech project (BTP), Ph.D. fellowship, or funded research inquiry",
    description: "Connecting with professors for research mentorship, lab access, writing papers, and participating in funded research grants.",
    recommendedFacultyId: "fac-sanjoy-pratihar",
    actionGuidance: "Search the Faculty Directory by your target research domain (e.g. Computer Vision, Cryptography, 5G, RF/Microwave) and send an academic message with your CV.",
    escalationPath: "Faculty Mentor → Faculty In-Charge Ph.D. (Dr. Sanjoy Pratihar / Dr. Amit Ranjan Azad) → Director",
    directEmail: "sanjoy@iiitkalyani.ac.in",
    urgencyLevel: "Standard"
  },
  {
    id: "help-placements-intern",
    category: "Internship & Placement",
    iconName: "Briefcase",
    title: "Summer internship NOC, campus placement drives, or recruiter relations",
    description: "No Objection Certificates (NOC) for 6-month or summer internships, placement drive eligibility, resume verification, and corporate relations.",
    recommendedOfficerId: "adm-ar-exam-tnp",
    actionGuidance: "Submit your internship offer letter and company details to Mr. Chinmoy Ghosh, Assistant Registrar (Training & Placement).",
    escalationPath: "Assistant Registrar (T&P) → Placement Committee → Registrar",
    directEmail: "chinmoy@iiitkalyani.ac.in",
    urgencyLevel: "Urgent"
  },
  {
    id: "help-fees-scholarships",
    category: "Scholarship & Fees",
    iconName: "CreditCard",
    title: "Tuition fee payment confirmation, NSP verification, or bank loan estimation",
    description: "Semester fee receipt generation, duplicate payment reconciliation, National Scholarship Portal (NSP) biometric verification, and fee structure certificates.",
    recommendedOfficerId: "adm-ar-finance",
    actionGuidance: "Visit Mr. Dhiraj Jhawar, Assistant Registrar (Finance & Accounts) in Room 108 with your payment transaction ID or scholarship printout.",
    escalationPath: "Assistant Registrar (Finance) → Registrar → Director",
    directEmail: "arf@iiitkalyani.ac.in",
    urgencyLevel: "Standard"
  },
  {
    id: "help-general-admin-registry",
    category: "Academic Issue",
    iconName: "Building2",
    title: "Institute circulars, bonafide certificates, admissions, or official verification",
    description: "Official administrative communications, admission records, identity cards, institutional certificates, and official approvals.",
    recommendedOfficerId: "adm-ar-admin",
    actionGuidance: "Contact Dr. Madhumita Sengupta, Assistant Registrar (Administration in-charge) in Room 103.",
    escalationPath: "Assistant Registrar (Admin) → Deputy Registrar (Dr. Muruganantham Ponnusamy) → Registrar (Dr. Kaoushik K Mukherjee)",
    directEmail: "madhumita@iiitkalyani.ac.in",
    urgencyLevel: "Standard"
  },
  {
    id: "help-antiragging",
    category: "Anti-Ragging & Disciplinary",
    iconName: "AlertTriangle",
    title: "Ragging incident, intimidation, hostel harassment, or urgent safety threat",
    description: "Zero-tolerance immediate response to any act of physical, mental, or verbal intimidation, ragging, or hostel coercion.",
    recommendedBodyId: "antiragging",
    actionGuidance: "Immediate confidential reporting. Contact the Anti-Ragging Cell or Registrar Dr. Kaoushik K Mukherjee directly.",
    escalationPath: "Anti-Ragging Squad → Registrar → Director & Police Liaison",
    directEmail: "antiragging@iiitkalyani.ac.in",
    urgencyLevel: "Immediate SOS"
  },
  {
    id: "help-icc-posh",
    category: "Internal Complaints (ICC)",
    iconName: "ShieldAlert",
    title: "Gender-based discrimination, harassment, or POSH grievance",
    description: "Confidential, protected, and legally binding forum for redressal of sexual harassment or gender discrimination under POSH Act 2013.",
    recommendedBodyId: "icc",
    actionGuidance: "Write directly to Dr. Uma Das (Presiding Officer, ICC) at uma@iiitkalyani.ac.in or icc@iiitkalyani.ac.in. All proceedings are strictly confidential.",
    escalationPath: "Presiding Officer (Dr. Uma Das) → Internal Complaints Committee → Director",
    directEmail: "uma@iiitkalyani.ac.in",
    urgencyLevel: "Immediate SOS"
  }
];

// -------------------------------------------------------------
// INITIAL AUTHENTICATED CONVERSATION REPOSITORY
// -------------------------------------------------------------

export const initialAcademicConversations: AcademicConversation[] = [
  {
    id: "conv-1",
    participantId: "fac-oishila-bandyopadhyay",
    participantName: "Dr. Oishila Bandyopadhyay",
    participantRole: "Assistant Professor & FIC Academics",
    participantDepartment: "Computer Science & Engineering",
    participantEmail: "oishila@iiitkalyani.ac.in",
    participantAvatar: "https://iiitkalyani.ac.in/api/serve/2026/03/09/Oishila_Bandyopadhyay_1773044172_6f75494b.png",
    subjectCategory: "Research Inquiry",
    subject: "Inquiry regarding Medical Image Segmentation BTP (Spring 2026)",
    lastMessage: "Hello Barnik, your proposal on 3D CT nodule segmentation looks promising. Please bring your preliminary code to my office on Monday at 3 PM.",
    lastMessageTimestamp: "Today, 2:18 PM",
    unreadCount: 1,
    isStarred: true,
    isArchived: false,
    isMuted: false,
    isBlocked: false,
    isRequest: false,
    requestStatus: "accepted",
    messages: [
      {
        id: "m-1",
        senderId: "student-barnik",
        senderName: "Barnik Basu",
        senderRole: "Student",
        senderDetails: "B.Tech CSE • IIIT Kalyani",
        senderEmail: "barnik@iiitkalyani.ac.in",
        recipientId: "fac-oishila-bandyopadhyay",
        recipientName: "Dr. Oishila Bandyopadhyay",
        recipientRole: "Assistant Professor, CSE",
        recipientEmail: "oishila@iiitkalyani.ac.in",
        subjectCategory: "Research Inquiry",
        subject: "Inquiry regarding Medical Image Segmentation BTP (Spring 2026)",
        body: "Respected Ma'am,\n\nI hope you are doing well. I am Barnik Basu, a B.Tech CSE student at IIIT Kalyani. I have been following your published research on 3D boundary delineation in medical imaging and have completed coursework in Computer Vision and Deep Learning.\n\nI would like to explore working on automated pulmonary nodule segmentation on low-dose CT datasets under your guidance for our upcoming project semester. I have attached my resume and a 1-page proposal outlining the attention UNet methodology.\n\nThank you for your valuable time.\n\nSincerely,\nBarnik Basu",
        timestamp: "29 Aug, 10:42 AM",
        status: "Read",
        attachments: [
          { id: "att-1", fileName: "Barnik_Basu_Resume_2026.pdf", fileSize: "184 KB", fileType: "pdf" },
          { id: "att-2", fileName: "3D_CT_Segmentation_Proposal.pdf", fileSize: "420 KB", fileType: "pdf" }
        ]
      },
      {
        id: "m-2",
        senderId: "fac-oishila-bandyopadhyay",
        senderName: "Dr. Oishila Bandyopadhyay",
        senderRole: "Faculty",
        senderDetails: "Assistant Professor & FIC Academics • CSE",
        senderEmail: "oishila@iiitkalyani.ac.in",
        recipientId: "student-barnik",
        recipientName: "Barnik Basu",
        recipientRole: "Student",
        recipientEmail: "barnik@iiitkalyani.ac.in",
        subjectCategory: "Research Inquiry",
        subject: "Re: Inquiry regarding Medical Image Segmentation BTP (Spring 2026)",
        body: "Hello Barnik,\n\nThank you for reaching out. I reviewed your proposal; the attention mechanism formulation over volumetric feature maps is mathematically sound.\n\nPlease drop by my office (Room 207, Faculty Block) this Monday between 3:00 PM and 4:30 PM so we can discuss the benchmark datasets (LIDC-IDRI) and compute requirements.\n\nBest regards,\nDr. Oishila Bandyopadhyay",
        timestamp: "Today, 2:18 PM",
        status: "Delivered"
      }
    ]
  },
  {
    id: "conv-2",
    participantId: "adm-ar-exam-tnp",
    participantName: "Mr. Chinmoy Ghosh",
    participantRole: "Assistant Registrar (Examination and T&P)",
    participantDepartment: "Examination Cell",
    participantEmail: "chinmoy@iiitkalyani.ac.in",
    participantAvatar: "https://iiitkalyani.ac.in/api/serve/2025/08/26/chin.png",
    subjectCategory: "Administrative Question",
    subject: "Re: Request for Official Transcript for Summer Fellowship Application",
    lastMessage: "Your digital transcript (Ref: IIITK/ACAD/TR/2026/089) has been verified. You may collect the physical stamped copy from Room 101.",
    lastMessageTimestamp: "Yesterday, 4:45 PM",
    unreadCount: 0,
    isStarred: false,
    isArchived: false,
    isMuted: false,
    isBlocked: false,
    isRequest: false,
    requestStatus: "accepted",
    messages: [
      {
        id: "m-3",
        senderId: "student-barnik",
        senderName: "Barnik Basu",
        senderRole: "Student",
        senderDetails: "B.Tech CSE • IIIT Kalyani",
        senderEmail: "barnik@iiitkalyani.ac.in",
        recipientId: "adm-ar-exam-tnp",
        recipientName: "Mr. Chinmoy Ghosh",
        recipientRole: "Assistant Registrar (Exam & T&P)",
        recipientEmail: "chinmoy@iiitkalyani.ac.in",
        subjectCategory: "Administrative Question",
        subject: "Request for Official Transcript for Summer Fellowship Application",
        body: "Dear Sir,\n\nI have submitted my application for a summer research fellowship. The portal requires an official sealed institutional transcript covering completed semesters.\n\nI have completed the fee payment and attached the receipt below.\n\nKindly issue the transcript at your earliest convenience.\n\nRegards,\nBarnik Basu",
        timestamp: "28 Aug, 11:30 AM",
        status: "Read",
        attachments: [
          { id: "att-3", fileName: "Fee_Receipt_Transcript_8812.pdf", fileSize: "92 KB", fileType: "pdf" }
        ]
      },
      {
        id: "m-4",
        senderId: "adm-ar-exam-tnp",
        senderName: "Mr. Chinmoy Ghosh",
        senderRole: "Admin",
        senderDetails: "Assistant Registrar (Examination and T&P)",
        senderEmail: "chinmoy@iiitkalyani.ac.in",
        recipientId: "student-barnik",
        recipientName: "Barnik Basu",
        recipientRole: "Student",
        recipientEmail: "barnik@iiitkalyani.ac.in",
        subjectCategory: "Administrative Question",
        subject: "Re: Request for Official Transcript for Summer Fellowship Application",
        body: "Dear Barnik,\n\nYour digital transcript (Ref: IIITK/ACAD/TR/2026/089) has been verified and processed.\n\nYou may collect the physical stamped copy with institutional watermarked seal from Room 101 during window hours (10:00 AM - 1:00 PM).\n\nOffice of the Assistant Registrar (Examination)",
        timestamp: "Yesterday, 4:45 PM",
        status: "Read"
      }
    ]
  },
  {
    id: "conv-3",
    participantId: "fac-sanjay-chatterji",
    participantName: "Dr. Sanjay Chatterji",
    participantRole: "Assistant Professor, CSE",
    participantDepartment: "Computer Science & Engineering",
    participantEmail: "sanjayc@iiitkalyani.ac.in",
    participantAvatar: "https://iiitkalyani.ac.in/api/serve/2025/08/30/sanjay.jpg",
    subjectCategory: "Research Inquiry",
    subject: "Indic Language NLP & Tokenizer Optimization Project",
    lastMessage: "Dear Barnik, your background in PyTorch and tokenization is suitable. Let's discuss Indic NLP models this Friday at 4 PM.",
    lastMessageTimestamp: "26 Aug, 11:15 AM",
    unreadCount: 0,
    isStarred: false,
    isArchived: false,
    isMuted: false,
    isBlocked: false,
    isRequest: false,
    requestStatus: "accepted",
    messages: [
      {
        id: "m-5",
        senderId: "student-barnik",
        senderName: "Barnik Basu",
        senderRole: "Student",
        senderDetails: "B.Tech CSE • IIIT Kalyani",
        senderEmail: "barnik@iiitkalyani.ac.in",
        recipientId: "fac-sanjay-chatterji",
        recipientName: "Dr. Sanjay Chatterji",
        recipientRole: "Assistant Professor, CSE",
        recipientEmail: "sanjayc@iiitkalyani.ac.in",
        subjectCategory: "Research Inquiry",
        subject: "Indic Language NLP & Tokenizer Optimization Project",
        body: "Respected Sir,\n\nI am writing to express my strong interest in joining your research group on low-resource Indic language models and tokenizer optimization. I have implemented byte-pair encoding from scratch and have experience with PyTorch and HuggingFace transformers.\n\nWould it be possible to discuss a potential semester research project?\n\nSincerely,\nBarnik Basu",
        timestamp: "26 Aug, 10:00 AM",
        status: "Read"
      },
      {
        id: "m-6",
        senderId: "fac-sanjay-chatterji",
        senderName: "Dr. Sanjay Chatterji",
        senderRole: "Faculty",
        senderDetails: "Assistant Professor • Dept. of CSE",
        senderEmail: "sanjayc@iiitkalyani.ac.in",
        recipientId: "student-barnik",
        recipientName: "Barnik Basu",
        recipientRole: "Student",
        recipientEmail: "barnik@iiitkalyani.ac.in",
        subjectCategory: "Research Inquiry",
        subject: "Re: Indic Language NLP & Tokenizer Optimization Project",
        body: "Dear Barnik,\n\nYour background in PyTorch and tokenization is suitable. Let's discuss Indic NLP models this Friday at 4:00 PM in Room 205.\n\nDr. Sanjay Chatterji",
        timestamp: "26 Aug, 11:15 AM",
        status: "Read"
      }
    ]
  }
];

// Moderation sample reports for admin review
export const initialModerationReports: ModerationReport[] = [
  {
    id: "rep-1",
    conversationId: "conv-rep-sample",
    reporterName: "Dr. Debasish Bera",
    reporterRole: "Assistant Professor, CSE",
    reportedUserName: "External Visitor (Flagged Account)",
    reportedUserRole: "External",
    category: "Spam",
    reason: "Unsolicited commercial crypto marketing email sent to institutional address.",
    timestamp: "27 Aug, 3:15 PM",
    status: "Resolved",
    adminNotes: "External sender domain blocked in email gateway firewall."
  }
];

export const sampleAcademicConversations = initialAcademicConversations;
export const sampleModerationQueue = initialModerationReports;
export const helpQueryMappings = officialHelpQueries;
export type AcademicAttachment = AcademicMessageAttachment;
export type MessageCategory = "Academic Query" | "Research Inquiry" | "Project Discussion" | "Recommendation / Reference" | "Administrative Question" | "Other";
