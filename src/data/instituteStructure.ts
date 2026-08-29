export interface ClubInfo {
  id: string;
  name: string;
  shortName: string;
  category: "Technical" | "Cultural" | "Sports" | "Arts & Media" | "Literary & Knowledge";
  parentBody: "Gymkhana" | "Technical Community" | "Creative Media" | "Professional Branch" | "Developer Community";
  isGymkhana: boolean;
  shortDescription: string;
  detailedDescription: string;
  icon: string;
  iconName: string;
  bannerGradient: string;
  leadCoordinator: string;
  facultyAdvisor: string;
  contactEmail: string;
  membersCount: number;
  upcomingEvents: string[];
  pastHighlights: string[];
  tags: string[];
}

export interface InstituteNode {
  id: string;
  name: string;
  category: string;
  icon: string;
  iconName: string;
  description: string;
  headOrLead?: string;
  contact?: string;
  location?: string;
  keyFunctions: string[];
  quickActions?: { label: string; action: string; type?: "link" | "tab" | "download" }[];
  children?: InstituteNode[];
}

export const officialClubsData: ClubInfo[] = [
  {
    id: "spotlight",
    name: "Spotlight",
    shortName: "Spotlight",
    category: "Cultural",
    parentBody: "Gymkhana",
    isGymkhana: true,
    shortDescription: "Drama, theatre and stage performance — a creative space for students who enjoy acting, storytelling and performing arts.",
    detailedDescription: "Spotlight is the vibrant drama, theatre and stage performance society of IIIT Kalyani. It provides a dedicated creative space for students who enjoy acting, storytelling, scriptwriting, street plays (Nukkad Natak), film appreciation, and performing arts across campus celebrations and inter-college festivals.",
    icon: "🎭",
    iconName: "Drama",
    bannerGradient: "from-rose-600 to-amber-700",
    leadCoordinator: "Dramatics Secretary / Spotlight Lead",
    facultyAdvisor: "Dr. Raghunath Dey",
    contactEmail: "spotlight@iiitkalyani.ac.in",
    membersCount: 95,
    upcomingEvents: ["Annual Nukkad Natak Showcase", "Stage Drama & Voice Acting Bootcamp", "48-Hour Scriptwriting Challenge"],
    pastHighlights: ["Inter-College Mono-Act Winners", "Annual Fest Stage Headliner"],
    tags: ["Drama", "Theatre", "Stage Performance", "Acting", "Storytelling", "Nukkad Natak"]
  },
  {
    id: "sports-club",
    name: "Sports Club",
    shortName: "Sports Club",
    category: "Sports",
    parentBody: "Gymkhana",
    isGymkhana: true,
    shortDescription: "Sports, fitness and competitive athletics — bringing students together through games, training and sporting events.",
    detailedDescription: "The Sports Club is the athletic heart of IIIT Kalyani, dedicated to sports, fitness and competitive athletics. It brings students together through daily training regimens, inter-hostel leagues (cricket, football, badminton, table tennis, volleyball, chess), and represents the institute with distinction at Inter-IIIT Sports Meets.",
    icon: "🏆",
    iconName: "Trophy",
    bannerGradient: "from-emerald-600 to-green-700",
    leadCoordinator: "Sports Secretary (Gymkhana)",
    facultyAdvisor: "Dr. Alik Pramanick",
    contactEmail: "sports@iiitkalyani.ac.in",
    membersCount: 320,
    upcomingEvents: ["IIITK Premier League (IPL Cricket)", "Inter-Batch Football Championship", "Night Badminton Open"],
    pastHighlights: ["Inter-IIIT Table Tennis Silver", "Annual Athletics Meet 2025"],
    tags: ["Sports", "Fitness", "Athletics", "Inter-IIIT", "Cricket", "Football", "Badminton"]
  },
  {
    id: "smc",
    name: "SMC",
    shortName: "SMC (Student Media)",
    category: "Arts & Media",
    parentBody: "Creative Media",
    isGymkhana: true,
    shortDescription: "Student Media / creative media community — focused on documenting and communicating campus life through creative content.",
    detailedDescription: "SMC (Student Media Community) is focused on documenting and communicating campus life through creative content. The team covers all academic, cultural, and athletic events through high-resolution photography, cinematography, event after-movies, official podcast episodes, student journalism, and digital media.",
    icon: "📸",
    iconName: "Camera",
    bannerGradient: "from-slate-700 to-indigo-900",
    leadCoordinator: "SMC Lead Producer",
    facultyAdvisor: "Dr. Sanjoy Pratihar",
    contactEmail: "smc@iiitkalyani.ac.in",
    membersCount: 115,
    upcomingEvents: ["Campus Photowalk & Lens Clinic", "Cinematic After-Movie Production", "Student Journalism Workshop"],
    pastHighlights: ["Convocation 2025 Live Production", "Kommune Fest Official Documentary"],
    tags: ["Student Media", "Photography", "Videography", "Creative Content", "Media Coverage", "Documentary"]
  },
  {
    id: "pixel",
    name: "PiXeL",
    shortName: "PiXeL",
    category: "Arts & Media",
    parentBody: "Gymkhana",
    isGymkhana: true,
    shortDescription: "Design and visual creativity — for students interested in graphics, digital art, visual communication and creative design.",
    detailedDescription: "PiXeL is the dedicated design and visual creativity community at IIIT Kalyani. It empowers students interested in graphic design, digital illustration, UI/UX interaction design, 3D modeling (Blender), visual communication, and creative brand design for institute festivals, student startups, and club banners.",
    icon: "🎨",
    iconName: "Palette",
    bannerGradient: "from-pink-600 to-purple-700",
    leadCoordinator: "Creative Design Lead",
    facultyAdvisor: "Dr. Sanjoy Pratihar",
    contactEmail: "pixel@iiitkalyani.ac.in",
    membersCount: 130,
    upcomingEvents: ["Figma UI/UX 48-Hour Design Sprint", "Blender 3D Modeling Workshop", "Visual Branding Exhibition"],
    pastHighlights: ["Institute Fest Visual Identity", "Annual Magazine Art Direction"],
    tags: ["Design", "Visual Creativity", "Graphics", "Digital Art", "UI/UX", "3D Art"]
  },
  {
    id: "freescape",
    name: "FreeScape",
    shortName: "FreeScape",
    category: "Technical",
    parentBody: "Gymkhana",
    isGymkhana: true,
    shortDescription: "Open-source and technology community — encouraging students to build, collaborate, learn and contribute beyond the classroom.",
    detailedDescription: "FreeScape is the open-source and technology community at IIIT Kalyani. It encourages students to build, collaborate, learn and contribute beyond the classroom. FreeScape organizes Git/GitHub sprints, Linux kernel deep dives, prepares students for Google Summer of Code (GSoC) and Hacktoberfest, and creates student-run open-source tools for campus utility.",
    icon: "</>",
    iconName: "GitBranch",
    bannerGradient: "from-cyan-600 to-blue-700",
    leadCoordinator: "Open Source Lead",
    facultyAdvisor: "Dr. Odelu Vanga",
    contactEmail: "freescape@iiitkalyani.ac.in",
    membersCount: 185,
    upcomingEvents: ["GSoC 2027 Mentorship Track", "Open Campus OS HackNight", "Git & FOSS Collaborative Sprint"],
    pastHighlights: ["Hacktoberfest 250+ PRs Merged", "Campus Open-Source Utilities Suite"],
    tags: ["Open Source", "Collaborative Dev", "FOSS", "GSoC", "Linux", "Git"]
  },
  {
    id: "seal-robotics",
    name: "S.E.A.L. Robotics",
    shortName: "S.E.A.L. Robotics",
    category: "Technical",
    parentBody: "Gymkhana",
    isGymkhana: true,
    shortDescription: "Robotics and hardware — hands-on engineering involving robotics, electronics, embedded systems and intelligent machines.",
    detailedDescription: "S.E.A.L. (Students for Engineering, Automation & Learning) Robotics is the hands-on engineering community focused on robotics, electronics, embedded systems, microcontrollers (ESP32/Arduino/STM32), ROS (Robot Operating System), drone dynamics, and intelligent autonomous machines.",
    icon: "🤖",
    iconName: "Bot",
    bannerGradient: "from-emerald-600 to-teal-700",
    leadCoordinator: "Robotics Lead",
    facultyAdvisor: "Dr. Dhrubasish Sarkar",
    contactEmail: "seal@iiitkalyani.ac.in",
    membersCount: 140,
    upcomingEvents: ["Autonomous Maze Rover Sprint", "Drone Dynamics & Flight Controller Lab", "Embedded IoT & Edge AI Hackathon"],
    pastHighlights: ["RoboWars Runner Up", "Line Follower Arena Championship"],
    tags: ["Robotics", "Hardware", "Embedded Systems", "Intelligent Machines", "Electronics", "Drones"]
  },
  {
    id: "udaan",
    name: "Udaan",
    shortName: "Udaan",
    category: "Literary & Knowledge",
    parentBody: "Gymkhana",
    isGymkhana: true,
    shortDescription: "Literary and creative expression — writing, literature, poetry, speaking and other forms of creative communication.",
    detailedDescription: "Udaan is the literary and creative expression society at IIIT Kalyani. It provides an inspiring platform for writing, literature, poetry, public speaking, debating, elocution, book discussions, and creative communication. Udaan fosters critical thinking and eloquence through parliamentary debates, MUN delegations, and open mics.",
    icon: "✒️",
    iconName: "BookOpen",
    bannerGradient: "from-sky-600 to-blue-800",
    leadCoordinator: "Literary Secretary",
    facultyAdvisor: "Dr. Bidyut Patra",
    contactEmail: "udaan@iiitkalyani.ac.in",
    membersCount: 90,
    upcomingEvents: ["Youth Parliamentary Debate 2026", "Chai & Poetry Open Mic", "Creative Writing & Microfiction Contest"],
    pastHighlights: ["National MUN Delegation", "Kalyani Literary Anthology"],
    tags: ["Literary", "Creative Expression", "Poetry", "Debating", "Writing", "Public Speaking"]
  },
  {
    id: "groovz",
    name: "Groovz",
    shortName: "Groovz",
    category: "Cultural",
    parentBody: "Gymkhana",
    isGymkhana: true,
    shortDescription: "Dance and movement — a performance community for students passionate about dance and choreography.",
    detailedDescription: "Groovz is the dance and movement community of IIIT Kalyani, uniting students passionate about dance and choreography. From hip-hop and urban choreography to Indian classical, contemporary, and Bollywood fusion, Groovz lights up campus events, annual fests, and competitive inter-IIIT stages.",
    icon: "💃",
    iconName: "Sparkles",
    bannerGradient: "from-amber-600 to-rose-600",
    leadCoordinator: "Dance Coordinator",
    facultyAdvisor: "Dr. Anirban Roy",
    contactEmail: "groovz@iiitkalyani.ac.in",
    membersCount: 100,
    upcomingEvents: ["Campus Flashmob 2026", "Freestyle Dance Battles Season 4", "Classical & Urban Choreography Workshop"],
    pastHighlights: ["Spring Cultural Gala Winners", "Independence Day Choreography"],
    tags: ["Dance", "Movement", "Choreography", "Performance", "Hip-Hop", "Contemporary"]
  },
  {
    id: "ieee-branch",
    name: "IEEE Student Branch, IIIT Kalyani",
    shortName: "IEEE Student Branch",
    category: "Technical",
    parentBody: "Professional Branch",
    isGymkhana: false,
    shortDescription: "Professional technical community connecting students with IEEE, engineering, technology, workshops, competitions and professional development.",
    detailedDescription: "IEEE Student Branch, IIIT Kalyani is the official professional technical community affiliated with the global Institute of Electrical and Electronics Engineers. It connects students with IEEE standards, cutting-edge engineering research, technology workshops, distinguished lectures, paper presentations, and international student competitions.",
    icon: "⚡",
    iconName: "Zap",
    bannerGradient: "from-blue-700 to-cyan-800",
    leadCoordinator: "IEEE Student Branch Chair",
    facultyAdvisor: "Dr. Imon Mukherjee",
    contactEmail: "ieee@iiitkalyani.ac.in",
    membersCount: 165,
    upcomingEvents: ["IEEE TechSymposium & Paper Presentation", "Signal Processing & AI Colloquium", "IEEE Student Project Grant Expo"],
    pastHighlights: ["IEEE Region 10 Student Participation", "Distinguished Speaker Series"],
    tags: ["IEEE", "Professional Technical", "Engineering", "Research", "Conferences", "Workshops"]
  },
  {
    id: "gdg-campus",
    name: "GDG on Campus, IIIT Kalyani",
    shortName: "GDG on Campus",
    category: "Technical",
    parentBody: "Developer Community",
    isGymkhana: false,
    shortDescription: "Developer community around Google technologies, software development, workshops, projects and collaborative learning.",
    detailedDescription: "Google Developer Groups (GDG) on Campus, IIIT Kalyani is a developer community centered on Google technologies, software development, workshops, open projects and collaborative learning. It hosts hands-on study jams on Google Cloud, Android, Flutter, Web, and Gemini AI, guiding students to participate in the global Google Solution Challenge.",
    icon: "🌐",
    iconName: "Code2",
    bannerGradient: "from-indigo-600 via-sky-600 to-emerald-600",
    leadCoordinator: "GDG Campus Lead",
    facultyAdvisor: "Dr. Sandeep Kumar",
    contactEmail: "gdg@iiitkalyani.ac.in",
    membersCount: 230,
    upcomingEvents: ["Google Solution Challenge Hackathon", "Gemini & Multimodal AI Study Jam", "Android Jetpack & Flutter Bootcamp"],
    pastHighlights: ["Google Cloud Study Jam (100+ Badges)", "DevFest Regional Chapter"],
    tags: ["GDG", "Google Technologies", "Software Dev", "Solution Challenge", "Collaborative Learning"]
  },
  {
    id: "esports",
    name: "E-Sports",
    shortName: "E-Sports",
    category: "Technical",
    parentBody: "Gymkhana",
    isGymkhana: true,
    shortDescription: "Competitive gaming and gaming culture — tournaments, teams and organized competitive play.",
    detailedDescription: "The E-Sports club at IIIT Kalyani fosters competitive gaming and gaming culture. It organizes campus LAN tournaments, online tactical leagues (Valorant, CS2, BGMI, Rocket League, Chess.com), team scouting, and fosters team coordination and tactical communication.",
    icon: "🎮",
    iconName: "Gamepad2",
    bannerGradient: "from-violet-700 to-fuchsia-800",
    leadCoordinator: "E-Sports Coordinator",
    facultyAdvisor: "Dr. Debasish Bera",
    contactEmail: "esports@iiitkalyani.ac.in",
    membersCount: 155,
    upcomingEvents: ["IIITK LAN Esports Championship (Valorant & CS2)", "Inter-College BGMI Battleground", "Chess & Strategy Speedrun"],
    pastHighlights: ["Inter-IIIT Gaming Arena Gold", "Freshers LAN Tournament 2025"],
    tags: ["E-Sports", "Competitive Gaming", "Gaming Culture", "Tournaments", "LAN"]
  }
];

export const instituteStructureData: InstituteNode[] = [
  {
    id: "student-life",
    name: "STUDENT LIFE",
    category: "Student Affairs",
    icon: "🎓",
    iconName: "GraduationCap",
    description: "Vibrant student gymkhana governance, clubs & communities, professional branches, and developer collectives driving campus culture at IIIT Kalyani.",
    keyFunctions: [
      "Clubs & Communities coordination across technical, cultural, sports, professional chapters, and creative media",
      "Gymkhana student governance, council elections, and student body representation",
      "Hackathons, tournaments, workshops, and inter-IIIT competitive leagues",
      "Peer mentorship, technical chapter certifications, and campus life enrichment"
    ],
    children: [
      {
        id: "clubs-and-communities",
        name: "CLUBS & COMMUNITIES",
        category: "Student Organizations",
        icon: "🌟",
        iconName: "Users",
        description: "Official student clubs, professional student branches, creative media bodies, and developer collectives at IIIT Kalyani.",
        keyFunctions: [
          "Fostering hands-on technical, artistic, athletic, and literary talents",
          "Organizing institute-wide workshops, hackathons, sports leagues, and theatrical productions",
          "Connecting students to global ecosystems like IEEE and Google Developer Groups"
        ],
        children: [
          {
            id: "spotlight",
            name: "Spotlight",
            category: "Drama & Theatre",
            icon: "🎭",
            iconName: "Drama",
            description: "Drama, theatre and stage performance — a creative space for students who enjoy acting, storytelling and performing arts.",
            headOrLead: "Spotlight Coordinator",
            contact: "spotlight@iiitkalyani.ac.in",
            keyFunctions: ["Stage drama & theatre plays", "Street plays (Nukkad Natak)", "Film appreciation and screenwriting workshops"]
          },
          {
            id: "sports-club",
            name: "Sports Club",
            category: "Sports & Athletics",
            icon: "🏆",
            iconName: "Trophy",
            description: "Sports, fitness and competitive athletics — bringing students together through games, training and sporting events.",
            headOrLead: "Sports Secretary",
            contact: "sports@iiitkalyani.ac.in",
            keyFunctions: ["Inter-hostel sports tournaments", "Cricket, football, badminton, and athletics training", "Inter-IIIT Sports Meet preparation"]
          },
          {
            id: "smc",
            name: "SMC",
            category: "Student Media",
            icon: "📸",
            iconName: "Camera",
            description: "Student Media / creative media community — focused on documenting and communicating campus life through creative content.",
            headOrLead: "SMC Lead Producer",
            contact: "smc@iiitkalyani.ac.in",
            keyFunctions: ["Official campus photography & videography", "Event after-movies and video documentation", "Social media storytelling & journalism"]
          },
          {
            id: "pixel",
            name: "PiXeL",
            category: "Design & Visual Arts",
            icon: "🎨",
            iconName: "Palette",
            description: "Design and visual creativity — for students interested in graphics, digital art, visual communication and creative design.",
            headOrLead: "Design Lead",
            contact: "pixel@iiitkalyani.ac.in",
            keyFunctions: ["Graphic design & poster branding", "UI/UX workshops and designathons", "Digital art, 3D modeling, and motion graphics"]
          },
          {
            id: "freescape",
            name: "FreeScape",
            category: "Open Source & Tech",
            icon: "</>",
            iconName: "GitBranch",
            description: "Open-source and technology community — encouraging students to build, collaborate, learn and contribute beyond the classroom.",
            headOrLead: "FreeScape Lead",
            contact: "freescape@iiitkalyani.ac.in",
            keyFunctions: ["Open source development & Git sprints", "Google Summer of Code (GSoC) mentorship", "FOSS tools and campus utility software"]
          },
          {
            id: "seal-robotics",
            name: "S.E.A.L. Robotics",
            category: "Robotics & Hardware",
            icon: "🤖",
            iconName: "Bot",
            description: "Robotics and hardware — hands-on engineering involving robotics, electronics, embedded systems and intelligent machines.",
            headOrLead: "Robotics Lead",
            contact: "seal@iiitkalyani.ac.in",
            keyFunctions: ["Autonomous rovers and robotic arm design", "Microcontroller & IoT hardware prototyping", "Robotics competitions and drone systems"]
          },
          {
            id: "udaan",
            name: "Udaan",
            category: "Literary & Expression",
            icon: "✒️",
            iconName: "BookOpen",
            description: "Literary and creative expression — writing, literature, poetry, speaking and other forms of creative communication.",
            headOrLead: "Literary Lead",
            contact: "udaan@iiitkalyani.ac.in",
            keyFunctions: ["Debating, Model United Nations (MUN), and elocution", "Poetry slams and open mic sessions", "Literary publications and creative writing"]
          },
          {
            id: "groovz",
            name: "Groovz",
            category: "Dance & Movement",
            icon: "💃",
            iconName: "Sparkles",
            description: "Dance and movement — a performance community for students passionate about dance and choreography.",
            headOrLead: "Groovz Coordinator",
            contact: "groovz@iiitkalyani.ac.in",
            keyFunctions: ["Choreography in classical, hip-hop, contemporary styles", "Campus flashmobs and fest dance performances", "Dance battles and creative workshops"]
          },
          {
            id: "esports",
            name: "E-Sports",
            category: "Competitive Gaming",
            icon: "🎮",
            iconName: "Gamepad2",
            description: "Competitive gaming and gaming culture — tournaments, teams and organized competitive play.",
            headOrLead: "E-Sports Coordinator",
            contact: "esports@iiitkalyani.ac.in",
            keyFunctions: ["LAN tournaments and inter-college gaming leagues", "Strategy & tactical esports team training", "Community gaming nights and streaming"]
          },
          {
            id: "ieee-branch",
            name: "IEEE Student Branch",
            category: "Professional Body",
            icon: "⚡",
            iconName: "Zap",
            description: "Professional technical community connecting students with IEEE, engineering, technology, workshops, competitions and professional development.",
            headOrLead: "Branch Counselor / Chair",
            contact: "ieee@iiitkalyani.ac.in",
            keyFunctions: ["IEEE technical conferences & paper presentations", "Distinguished lecturer workshops", "Professional skill development & global networking"],
            children: [
              {
                id: "ieee-iiitk",
                name: "IIIT Kalyani Student Branch Chapter",
                category: "IEEE Chapter",
                icon: "📡",
                iconName: "Radio",
                description: "Official student branch of the Institute of Electrical and Electronics Engineers (IEEE) at IIIT Kalyani.",
                headOrLead: "Student Branch Chair",
                contact: "ieee.branch@iiitkalyani.ac.in",
                keyFunctions: ["Student membership management", "Signal processing, computing and communications tracks", "Hackathons and student paper contests"]
              }
            ]
          },
          {
            id: "gdg-campus",
            name: "GDG on Campus",
            category: "Developer Community",
            icon: "🌐",
            iconName: "Code2",
            description: "Developer community around Google technologies, software development, workshops, projects and collaborative learning.",
            headOrLead: "GDG Campus Lead",
            contact: "gdg@iiitkalyani.ac.in",
            keyFunctions: ["Google Developer technologies hands-on bootcamps", "Google Cloud, Android, Web, and Gemini AI workshops", "Solution Challenge project mentorship and hackathons"],
            children: [
              {
                id: "gdg-iiitk",
                name: "IIIT Kalyani Chapter",
                category: "GDG Chapter",
                icon: "💻",
                iconName: "Terminal",
                description: "Official Google Developer Groups on Campus chapter at IIIT Kalyani.",
                headOrLead: "GDG Lead & Core Team",
                contact: "gdg.campus@iiitkalyani.ac.in",
                keyFunctions: ["Google Solution Challenge hackathons", "DevFest collaborations", "Study jams on Cloud, Flutter, and AI"]
              }
            ]
          }
        ]
      },
      {
        id: "gymkhana",
        name: "GYMKHANA",
        category: "Student Governance",
        icon: "🏛️",
        iconName: "Shield",
        description: "Apex student governance body and student council guiding student life, representation, welfare, elections, and club activities.",
        headOrLead: "President & General Secretary (Student Gymkhana)",
        contact: "gymkhana@iiitkalyani.ac.in",
        keyFunctions: [
          "Student representation in Institute Senate and Administrative committees",
          "Annual budget sanctions, event scheduling, and club governance",
          "Welfare, mess & hostel representation, and student elections",
          "Coordination of annual cultural & technical fests and sports meets"
        ],
        children: [
          {
            id: "gym-senate",
            name: "Student Senate & Executive Council",
            category: "Elected Governance",
            icon: "📜",
            iconName: "FileText",
            description: "Elected batch representatives, department conveners, and executive secretaries forming the student legislature.",
            headOrLead: "General Secretary",
            contact: "senate.gymkhana@iiitkalyani.ac.in",
            keyFunctions: ["Formulating student policy", "Deliberating student grievances", "Sanctioning club charters"]
          },
          {
            id: "gym-welfare",
            name: "Student Welfare & Grievance Wing",
            category: "Welfare & Support",
            icon: "🤝",
            iconName: "HeartHandshake",
            description: "Student-led peer support, hostel liaisons, and wellness initiatives operating under the Dean of Student Affairs.",
            headOrLead: "Welfare Secretary",
            contact: "welfare.gymkhana@iiitkalyani.ac.in",
            keyFunctions: ["Student peer mentorship", "Hostel & dining quality audits", "Emergency student support"]
          },
          {
            id: "gym-events-finance",
            name: "Finance & Festival Secretariat",
            category: "Finance & Operations",
            icon: "💳",
            iconName: "Coins",
            description: "Coordinates annual budget allocations, sponsorship outreach, and logistics for institute-wide festivals.",
            headOrLead: "Finance Convener",
            contact: "finance.gymkhana@iiitkalyani.ac.in",
            keyFunctions: ["Audit of club expenditures", "Sponsorship management", "Fest logistics and venue booking"]
          }
        ]
      }
    ]
  },
  {
    id: "events",
    name: "EVENTS",
    category: "Campus Events & Festivals",
    icon: "📅",
    iconName: "Calendar",
    description: "Centralized calendar of annual fests, hackathons, technical competitions, cultural galas, workshops, and sports tournaments.",
    keyFunctions: [
      "Annual Tech Fest 'Kommune' and Cultural Festival",
      "Status Code 1, ByteRace, CodeCombat, and National Hackathons",
      "Faculty guest lectures, AI/ML workshops, and research symposiums",
      "Inter-Hostel Sports Tournaments and Annual Athletics Meet"
    ],
    children: [
      { id: "ev-fests", name: "Fests", category: "Annual Celebrations", icon: "🎪", iconName: "Sparkles", description: "Flagship annual technical and cultural fests including Kommune.", keyFunctions: ["Annual Tech Fest Kommune", "Cultural Night", "Freshers & Farewell Celebrations"] },
      { id: "ev-hackathons", name: "Hackathons", category: "Technical", icon: "⚡", iconName: "Zap", description: "24-48 hour coding sprints, hardware hackathons, and open innovation challenges.", keyFunctions: ["Status Code 1", "Smart India Hackathon Internals", "FOSS Sprint"] },
      { id: "ev-competitions", name: "Competitions", category: "Contests", icon: "🏆", iconName: "Trophy", description: "Algorithmic contests, debate championships, robo-wars, and UI/UX designathons.", keyFunctions: ["CodeCombat", "ByteRace", "Designathon", "Debate League"] },
      { id: "ev-workshops", name: "Workshops", category: "Hands-on Learning", icon: "🛠️", iconName: "Wrench", description: "Specialized skill bootcamps covering AI/ML, Cloud, Web3, ROS Robotics, and IoT.", keyFunctions: ["Industry Expert Seminars", "Hands-on Lab Bootcamps", "Certification Tracks"] },
      { id: "ev-cultural", name: "Cultural", category: "Performances", icon: "🎭", iconName: "Drama", description: "Dance competitions, acoustic music nights, dramatics, and festival celebrations.", keyFunctions: ["Symphony Acoustic Nights", "Groovz Dance Battles", "Spotlight Nukkad"] },
      { id: "ev-sports", name: "Sports", category: "Athletics", icon: "⚽", iconName: "Activity", description: "IIITK Premier League (IPL), football leagues, badminton, chess, and table tennis cups.", keyFunctions: ["Inter-Batch Cricket League", "Hostel Football Championship", "Athletics Meet"] },
      { id: "ev-academic", name: "Academic", category: "Scholastic", icon: "📖", iconName: "BookOpen", description: "Research symposiums, PhD thesis colloquiums, and department orientation programs.", keyFunctions: ["National Science Day Seminar", "Research Colloquium", "Curriculum Orientation"] },
      { id: "ev-institutional", name: "Institutional", category: "Official Ceremonies", icon: "🏛️", iconName: "Building2", description: "Convocation, Foundation Day, Independence Day, Republic Day, and Senate open houses.", keyFunctions: ["Annual Convocation", "Institute Foundation Day", "National Observances"] }
    ]
  },
  {
    id: "institutional-bodies",
    name: "INSTITUTIONAL BODIES",
    category: "Institute Governance",
    icon: "🏛️",
    iconName: "Landmark",
    description: "Statutory, administrative, and regulatory councils governing policy, academic curriculum, student welfare, and equity at IIIT Kalyani.",
    keyFunctions: [
      "Strategic policy determination by the Board of Governors (BoG)",
      "Curriculum formulation and academic standards by the Senate",
      "Zero tolerance Anti-Ragging and Internal Complaints Committee (ICC)",
      "Grievance redressal and financial resource planning"
    ],
    children: [
      { id: "ib-bog", name: "Board of Governors (BoG)", category: "Apex Statutory Council", icon: "⚖️", iconName: "Scale", description: "The apex governing body responsible for overall administration, vision, and governance of the Institute.", headOrLead: "Chairman, BoG", contact: "director@iiitkalyani.ac.in", keyFunctions: ["Strategic policies", "Statutory approvals", "Institutional development"] },
      { id: "ib-senate", name: "Senate", category: "Academic Apex Body", icon: "📜", iconName: "Award", description: "The supreme academic body governing curriculum, degree awards, course regulations, and academic standards.", headOrLead: "Chairman, Senate (Director)", contact: "academic@iiitkalyani.ac.in", keyFunctions: ["Curriculum approval", "Grading standards", "Degree awards & medals"] },
      { id: "ib-fc", name: "Finance Committee", category: "Statutory Council", icon: "💳", iconName: "CreditCard", description: "Oversees fiscal management, budgetary allocations, auditing, and financial grants of the Institute.", headOrLead: "Finance Officer", contact: "finance@iiitkalyani.ac.in", keyFunctions: ["Budget allocation", "Audit verification", "Grant distributions"] },
      { id: "ib-admin", name: "Administrative Body", category: "Executive Administration", icon: "🏢", iconName: "Building", description: "Executive administration handling day-to-day operations, registry, human resources, and campus logistics.", headOrLead: "Registrar (Offg.)", contact: "registrar@iiitkalyani.ac.in", keyFunctions: ["Institute registry", "Staff administration", "Logistics & estate management"] },
      { id: "ib-icc", name: "Internal Complaints Committee (ICC)", category: "Equity & Safety", icon: "🛡️", iconName: "ShieldAlert", description: "Statutory committee ensuring a safe, respectful, and harassment-free environment under the POSH Act.", headOrLead: "Presiding Officer, ICC", contact: "icc@iiitkalyani.ac.in", keyFunctions: ["Gender equity enforcement", "Confidential complaint redressal", "Sensitization programs"] },
      { id: "ib-antiragging-comm", name: "Anti-Ragging Committee", category: "Student Safety", icon: "🚫", iconName: "AlertOctagon", description: "High-level disciplinary and supervisory council enforcing the Supreme Court & UGC zero-tolerance anti-ragging mandates.", headOrLead: "Director / Nodal Officer", contact: "antiragging@iiitkalyani.ac.in", keyFunctions: ["Zero-tolerance policy enforcement", "Surprise inspections", "Affidavit verifications"] },
      { id: "ib-antiragging-squad", name: "Anti-Ragging Squad", category: "Active Vigilance", icon: "👁️", iconName: "Eye", description: "Vigilance squad conducting continuous night and daytime patrols across hostels, mess halls, and campus premises.", headOrLead: "Chief Warden & Squad Members", contact: "emergency@iiitkalyani.ac.in", keyFunctions: ["Hostel spot checks", "24/7 patrol shifts", "Immediate student intervention"] },
      { id: "ib-grievance", name: "Grievance Redressal Cell", category: "Student Welfare", icon: "📬", iconName: "Inbox", description: "Transparent mechanism for students, faculty, and staff to register academic, administrative, or infrastructural grievances.", headOrLead: "Grievance Officer", contact: "grievance@iiitkalyani.ac.in", keyFunctions: ["Online grievance logging", "Fair review hearings", "Resolution tracking"] }
    ]
  },
  {
    id: "research-innovation",
    name: "RESEARCH & INNOVATION",
    category: "R&D and Entrepreneurship",
    icon: "🔬",
    iconName: "Atom",
    description: "Hub for sponsored research, intellectual property (IPR), startup incubation, national innovation policy, and high-impact publications.",
    keyFunctions: [
      "Institution's Innovation Council (IIC) driven hackathons and startup pre-incubation",
      "Sponsored Research & Industrial Consultancy (SRIC) funding management",
      "Patent filings, IPR disclosures, and Continuing Education Programs (CEP)",
      "High-impact journal papers in IEEE, ACM, Springer, and Elsevier"
    ],
    children: [
      { id: "ri-iic", name: "IIC (Institution's Innovation Council)", category: "Innovation & Startups", icon: "💡", iconName: "Lightbulb", description: "MoE initiative promoting student entrepreneurship, ideathons, venture incubation, and patent awareness.", headOrLead: "President, IIC", contact: "iic@iiitkalyani.ac.in", keyFunctions: ["Startup incubation", "Ideation contests", "MoE innovation ratings"] },
      { id: "ri-sric", name: "SRIC (Sponsored Research & Industrial Consultancy)", category: "Sponsored Projects", icon: "📊", iconName: "BarChart3", description: "Manages government-funded (DST, SERB, MeitY) and industrial research grants and consultancy contracts.", headOrLead: "Dean (R&D)", contact: "sric@iiitkalyani.ac.in", keyFunctions: ["Grant administration", "Industry consultancy", "Research fellows management"] },
      { id: "ri-ipr", name: "IPR (Intellectual Property Rights Cell)", category: "Patents & Copyrights", icon: "📑", iconName: "FileCheck", description: "Guides faculty and students in patent drafting, copyright filing, technology transfer, and commercialization.", headOrLead: "IPR Coordinator", contact: "ipr@iiitkalyani.ac.in", keyFunctions: ["Patent filing assistance", "Prior-art search", "Technology licensing"] },
      { id: "ri-nisp", name: "NISP (National Innovation and Startup Policy)", category: "National Policy", icon: "🚀", iconName: "Rocket", description: "Framework enabling students and faculty to establish deep-tech startups with institute credit incentives.", headOrLead: "NISP Coordinator", contact: "nisp@iiitkalyani.ac.in", keyFunctions: ["Startup equity framework", "Semester break for founders", "Lab access policies"] },
      { id: "ri-cep", name: "CEP (Continuing Education Programme)", category: "Executive Education", icon: "🎓", iconName: "BookOpenCheck", description: "Offers executive training, faculty development programmes (FDP), and short certificate courses for industry professionals.", headOrLead: "CEP In-Charge", contact: "cep@iiitkalyani.ac.in", keyFunctions: ["Industry upskilling", "FDP workshops", "Summer/Winter schools"] },
      { id: "ri-sponsored", name: "Sponsored Projects", category: "Funded Research", icon: "💰", iconName: "Coins", description: "Active projects funded by MeitY, DST-SERB, ISRO, and DRDO focusing on AI, IoT, Cryptography, and 5G.", headOrLead: "Principal Investigators (PIs)", contact: "rnd@iiitkalyani.ac.in", keyFunctions: ["Funded research deliverables", "JRF/SRF fellowships", "Lab equipment grants"] },
      { id: "ri-pubs", name: "Publications", category: "Scholarly Output", icon: "📚", iconName: "Library", description: "Repository of peer-reviewed journal papers, conference proceedings, book chapters, and doctoral dissertations.", headOrLead: "Library & Publications Committee", contact: "publications@iiitkalyani.ac.in", keyFunctions: ["IEEE/ACM digital access", "Annual research compendium", "Citation indexing"] }
    ]
  },
  {
    id: "career",
    name: "CAREER",
    category: "Placements & Internships",
    icon: "💼",
    iconName: "Briefcase",
    description: "Training & Placement Cell (T&P), summer internships, alumni mentorship networks, top tech recruiters, and career guidance.",
    keyFunctions: [
      "Campus placement drives with premier tech giants and high-growth startups",
      "Summer internship programs (On-campus and Off-campus assistance)",
      "Global alumni mentorship network and resume reviewing",
      "Mock technical interviews, coding assessments, and soft skills training"
    ],
    children: [
      { id: "car-tp", name: "Training & Placement (T&P Cell)", category: "Placement Cell", icon: "🎯", iconName: "Target", description: "Apex cell managing on-campus placement drives, pre-placement talks, and corporate relations.", headOrLead: "Faculty In-Charge, T&P", contact: "tnp@iiitkalyani.ac.in", keyFunctions: ["Corporate outreach", "Drive scheduling", "Offer letter dispatch"] },
      { id: "car-intern", name: "Internships", category: "Pre-Final Placements", icon: "⏱️", iconName: "Clock", description: "Assisting 2nd, 3rd, and 4th-year students with research and industry internships (Google STEP, Amazon Wow, etc.).", headOrLead: "Student Internship Coordinators", contact: "internships@iiitkalyani.ac.in", keyFunctions: ["6-month internship approvals", "Summer research fellowships", "NOC processing"] },
      { id: "car-recruiters", name: "Recruiters", category: "Industry Partners", icon: "🏢", iconName: "Building2", description: "Leading employers recruiting IIIT Kalyani graduates across SWE, Data Science, Cyber Security, and Core domains.", headOrLead: "Corporate Relations", contact: "partners@iiitkalyani.ac.in", keyFunctions: ["Tier-1 tech recruiting", "Product companies", "FinTech and R&D labs"] },
      { id: "car-alumni", name: "Alumni Network", category: "Global Graduates", icon: "🌍", iconName: "Globe", description: "Alumni network spanning FAANG/MAMAA, top universities (MIT, CMU, IITs), and venture founders.", headOrLead: "Alumni Affairs Secretary", contact: "alumni@iiitkalyani.ac.in", keyFunctions: ["1-on-1 mentorship", "Alumni talks & AMAs", "Referral programs"] },
      { id: "car-opps", name: "Career Opportunities", category: "Open Listings", icon: "🌟", iconName: "Sparkles", description: "Real-time portal with verified tech job postings, fellowship calls, and hackathon bounties.", headOrLead: "Placement Portal Desk", contact: "careers@iiitkalyani.ac.in", keyFunctions: ["Curated job board", "Off-campus alerts", "Fellowship announcements"] }
    ]
  },
  {
    id: "campus",
    name: "CAMPUS",
    category: "Infrastructure & Living",
    icon: "🏫",
    iconName: "MapPin",
    description: "Physical facilities, hostels, dining mess halls, central library, high-performance computing labs, sports grounds, and transport.",
    keyFunctions: [
      "Student residential hostels with high-speed Wi-Fi and 24/7 security",
      "Student-run mess committees serving multi-cuisine hygienic meals",
      "Central Library with digital IEEE/ACM access and physical book archives",
      "Interactive 3D campus map and transport connectivity schedules"
    ],
    children: [
      { id: "cam-hostels", name: "Hostels", category: "Residential", icon: "🛏️", iconName: "Home", description: "Separate well-equipped hostels for boys and girls with study rooms, high-speed LAN, and power backup.", headOrLead: "Chief Warden", contact: "warden@iiitkalyani.ac.in", keyFunctions: ["Room allotments", "Hostel maintenance", "Night curfew management"] },
      { id: "cam-mess", name: "Mess", category: "Dining", icon: "🍽️", iconName: "Utensils", description: "Student-monitored dining halls providing balanced breakfast, lunch, snacks, and dinner with weekly menu updates.", headOrLead: "Mess Committee Convener", contact: "mess@iiitkalyani.ac.in", keyFunctions: ["Dietary quality checks", "Weekly menu planning", "Special festival meals"] },
      { id: "cam-library", name: "Library", category: "Knowledge Center", icon: "📖", iconName: "BookOpen", description: "Central repository housing thousands of reference books, journals, research thesis, and quiet study spaces.", headOrLead: "Librarian", contact: "library@iiitkalyani.ac.in", keyFunctions: ["Book issue/return", "Digital database access", "Plagiarism check portal"] },
      { id: "cam-sports", name: "Sports Grounds", category: "Recreation", icon: "🏸", iconName: "Trophy", description: "Courts and grounds for cricket, football, volleyball, badminton, table tennis, and indoor games.", headOrLead: "Sports In-Charge", contact: "sports@iiitkalyani.ac.in", keyFunctions: ["Equipment borrowing", "Ground maintenance", "Tournament hosting"] },
      { id: "cam-labs", name: "Labs", category: "Academic Infrastructure", icon: "💻", iconName: "Monitor", description: "Advanced computing labs with GPU servers, embedded hardware workstations, and networking testbeds.", headOrLead: "Lab Superintendent", contact: "labs@iiitkalyani.ac.in", keyFunctions: ["Lab slot reservations", "GPU server clusters", "Hardware equipment logs"] },
      { id: "cam-facilities", name: "Facilities", category: "Amenities", icon: "🏥", iconName: "HeartPulse", description: "Health center, bank ATM, guest house, cafeteria, printing kiosks, and solar power infrastructure.", headOrLead: "Estate Officer", contact: "estate@iiitkalyani.ac.in", keyFunctions: ["Medical first-aid", "Campus Wi-Fi & IT", "Cafeteria supervision"] },
      { id: "cam-map", name: "Map", category: "Navigation", icon: "🗺️", iconName: "Map", description: "Interactive 2D/3D map with building wayfinding, classroom locations, lab coordinates, and points of interest.", headOrLead: "Campus GIS Desk", contact: "map@iiitkalyani.ac.in", keyFunctions: ["Interactive wayfinding", "Room search", "Emergency landmark pins"] },
      { id: "cam-transport", name: "Transport / Connectivity", category: "Transit", icon: "🚌", iconName: "Bus", description: "Institute shuttle services, Kalyani Railway Station connectivity, and local cab coordination.", headOrLead: "Transport Officer", contact: "transport@iiitkalyani.ac.in", keyFunctions: ["Shuttle bus schedules", "Train connection guides", "Airport transit info"] }
    ]
  },
  {
    id: "student-services",
    name: "STUDENT SERVICES",
    category: "Administration & Support",
    icon: "📑",
    iconName: "HelpCircle",
    description: "Comprehensive student support covering official circulars, digital forms, academic rules, ERP portals, and emergency dispatch.",
    keyFunctions: [
      "Real-time administrative notices and examination circulars",
      "Downloadable digital forms (leave, bonafide, fee receipt, hostel NOC)",
      "Official academic calendar, grading ordinances, and 75% attendance regulations",
      "24/7 SOS emergency hotline, medical dispensary, and campus directory"
    ],
    children: [
      { id: "ss-notices", name: "Notices", category: "Circulars", icon: "📢", iconName: "Bell", description: "Official announcements from Academic Section, Registrar, Exam Cell, and T&P.", headOrLead: "Academic Office", contact: "notices@iiitkalyani.ac.in", keyFunctions: ["Exam timetables", "Fee payment alerts", "Holiday notices"] },
      { id: "ss-forms", name: "Forms", category: "Applications", icon: "📝", iconName: "FileText", description: "Online and printable application forms for bonafide certificates, leave requests, transcripts, and hostel gate passes.", headOrLead: "Student Affairs Section", contact: "forms@iiitkalyani.ac.in", keyFunctions: ["Bonafide requests", "Leave applications", "Transcript applications"] },
      { id: "ss-calendar", name: "Academic Calendar", category: "Schedule", icon: "🗓️", iconName: "CalendarDays", description: "Full semester schedule detailing registration dates, mid-sem/end-sem exams, vacations, and grades declaration.", headOrLead: "Dean (Academics)", contact: "academic@iiitkalyani.ac.in", keyFunctions: ["Semester timeline", "Exam windows", "Gazetted holiday list"] },
      { id: "ss-regulations", name: "Regulations & Ordinances", category: "Rules", icon: "⚖️", iconName: "Scale", description: "B.Tech/M.Tech/Ph.D. academic ordinances, grading system, SGPA/CGPA formulas, and attendance policies.", headOrLead: "Senate Secretariat", contact: "senate@iiitkalyani.ac.in", keyFunctions: ["75% attendance rulebook", "Backlog & makeup exams", "Disciplinary code"] },
      { id: "ss-portals", name: "Portals", category: "Digital Services", icon: "🌐", iconName: "Globe", description: "Single-sign-on links to ERP, Moodle LMS, Email, Fee Payment Gateway, and National Scholarship Portal.", headOrLead: "IT Services Helpdesk", contact: "ithelpdesk@iiitkalyani.ac.in", keyFunctions: ["ERP access", "LMS coursework", "Webmail login"] },
      { id: "ss-emergency", name: "Emergency Services", category: "Crisis & First Aid", icon: "🚨", iconName: "AlertTriangle", description: "24/7 rapid response SOS dispatch, campus ambulance, security guard desk, and women helpline.", headOrLead: "Chief Security Officer", contact: "emergency@iiitkalyani.ac.in", keyFunctions: ["One-tap SOS siren", "Ambulance dispatch", "Campus security hotline"] },
      { id: "ss-directory", name: "Directory", category: "Contact List", icon: "📞", iconName: "Phone", description: "Searchable directory of all faculty members, lab instructors, administrative officers, wardens, and student leads.", headOrLead: "Public Relations Officer", contact: "contact@iiitkalyani.ac.in", keyFunctions: ["Faculty office hours", "Direct email & intercom", "Department search"] }
    ]
  },
  {
    id: "achievements",
    name: "ACHIEVEMENTS",
    category: "Accolades & Milestones",
    icon: "🏆",
    iconName: "Award",
    description: "Hall of fame celebrating student honors, faculty research citations, prestigious patents, hackathon triumphs, and sports medals.",
    keyFunctions: [
      "Top student ranks in ICPC Regionals, GSoC selections, and national hackathons",
      "Faculty awards, top 2% global scientist recognitions, and high-impact publications",
      "Funded patents granted and sponsored research milestones",
      "Inter-IIIT sports medals, trophies, and tournament victories"
    ],
    children: [
      { id: "ach-students", name: "Students", category: "Student Accolades", icon: "🌟", iconName: "Star", description: "ICPC Regional Finalists, GSoC contributors, SIH Winners, and Dean's List honor roll students.", keyFunctions: ["ICPC Regional rankers", "GSoC 2025/2026 selects", "SIH 1st Prize Winners"] },
      { id: "ach-faculty", name: "Faculty", category: "Academic Honors", icon: "🎖️", iconName: "Medal", description: "National awards, IEEE Senior Memberships, top 2% global scientist citations, and international keynotes.", keyFunctions: ["IEEE Outstanding Chapter Award", "DST Young Scientist Fellowships", "Global citations"] },
      { id: "ach-research", name: "Research", category: "Patents & Grants", icon: "🔬", iconName: "Atom", description: "Granted patents in AI healthcare, high-impact IEEE journal papers, and multimillion rupee research grants.", keyFunctions: ["3 Granted Patents", "50+ IEEE/ACM Transactions", "MeitY Flagship Grant"] },
      { id: "ach-sports", name: "Sports", category: "Athletic Medals", icon: "🥇", iconName: "Trophy", description: "Inter-IIIT sports meet medals in Table Tennis, Badminton, Cricket trophies, and Chess championships.", keyFunctions: ["Inter-IIIT TT Silver Medalists", "Bengal Inter-College Cricket Champions"] },
      { id: "ach-competitions", name: "Competitions", category: "Hackathons & Contests", icon: "⚡", iconName: "Zap", description: "Top rankings in national coding leagues, robotics robo-races, debate opens, and design showdowns.", keyFunctions: ["Status Code 1 National Laureates", "ByteRace Champions", "National MUN Best Delegation"] }
    ]
  }
];
