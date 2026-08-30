export interface EventDetail {
  id: string;
  name: string;
  shortName?: string;
  category: "Technology" | "Culture" | "Sports" | "Academic" | "Innovation" | "Institutional" | "Community";
  eventType: "Flagship Fest" | "Hackathon" | "Competition" | "Cultural Celebration" | "Workshop" | "Tournament" | "Ceremony" | "Meetup";
  tagline: string;
  description: string;
  shortDescription: string;
  month: string;
  fullDateString?: string;
  venue: string;
  mode: "Offline" | "Online" | "Hybrid";
  organizingBody: string;
  registrationStatus: "Open" | "Closed" | "Upcoming" | "Invitation Only";
  registrationDeadline?: string;
  officialWebsiteUrl?: string;
  bannerImage: string;
  themeColor: string; // Tailwind color or hex gradient styling
  featured: boolean;
  isAnnualFlagship?: boolean;
  
  // Specific sections for detailed immersive view
  aboutStory: string[];
  pillarsOrTracks?: {
    title: string;
    description: string;
    iconName: string;
    items?: string[];
  }[];
  benchmarks?: {
    name: string;
    institute: string;
    description: string;
  }[];
  schedule?: {
    timeOrDay: string;
    title: string;
    location: string;
    description: string;
  }[];
  competitions?: {
    title: string;
    category: string;
    prizePool?: string;
    teamSize?: string;
    description: string;
    rulesSnippet?: string;
  }[];
  stats?: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  contact: {
    leadName: string;
    role: string;
    email: string;
  };
}

export interface AnnualCalendarMonth {
  month: string;
  monthNumber: number;
  seasonTheme: string;
  highlightCategory: string;
  events: {
    id: string;
    title: string;
    category: string;
    type: string;
    dateDescription: string;
    venue: string;
    organizer: string;
  }[];
}

// -------------------------------------------------------------
// FLAGSHIP EVENTS DATASET
// -------------------------------------------------------------

export const flagshipFestivals: EventDetail[] = [
  {
    id: "renesa",
    name: "RENESA",
    shortName: "Renesa",
    category: "Technology",
    eventType: "Flagship Fest",
    tagline: "Where Technology Meets Culture",
    shortDescription: "The annual three-day techno-cultural extravaganza of IIIT Kalyani — a convergence of technology, creativity, competition, music, art, and student culture.",
    description: "Renesa is envisioned not merely as a college fest, but as a platform through which IIIT Kalyani builds a distinctive identity within India's student-festival ecosystem. Built around the energy of a young and ambitious institute, Renesa brings together students to think, create, compete, perform, collaborate, and celebrate.",
    month: "FEB",
    fullDateString: "Annual Spring Edition (February)",
    venue: "IIIT Kalyani Campus, Kalyani, West Bengal",
    mode: "Offline",
    organizingBody: "Student Gymkhana & Technical-Cultural Council",
    registrationStatus: "Upcoming",
    registrationDeadline: "Announced prior to spring semester fest cycle",
    officialWebsiteUrl: "https://iiitkalyani.ac.in",
    bannerImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200",
    themeColor: "from-amber-500 via-rose-600 to-violet-700",
    featured: true,
    isAnnualFlagship: true,
    aboutStory: [
      "Renesa is the annual three-day techno-cultural extravaganza of IIIT Kalyani — a celebration where technology, creativity, competition, music, art, and student culture converge.",
      "Built around the energy of a young and ambitious institute, Renesa brings together students to create, compete, perform, collaborate, and celebrate.",
      "From high-energy technical challenges and competitive events to music, dance, creative showcases, and cultural nights, Renesa represents the diverse spirit of the IIIT Kalyani community.",
      "Renesa exists at the intersection of: Technology × Culture × Competition × Creativity × Community. It gives students an opportunity to step outside the classroom and become Builders, Performers, Organisers, Leaders, Competitors, and Creators."
    ],
    benchmarks: [
      {
        name: "Mood Indigo",
        institute: "IIT Bombay",
        description: "A benchmark for large-scale cultural programming, professional performances, and student participation."
      },
      {
        name: "Techfest",
        institute: "IIT Bombay",
        description: "A benchmark for technology, innovation, competitions, exhibitions, and international participation."
      },
      {
        name: "Saarang",
        institute: "IIT Madras",
        description: "A benchmark for cultural programming, performing arts, music, literature, and large-scale student engagement."
      },
      {
        name: "Oasis & Apogee",
        institute: "BITS Pilani",
        description: "A benchmark for combining strong cultural and technical identities."
      },
      {
        name: "Spring Fest",
        institute: "IIT Kharagpur",
        description: "A particularly relevant West Bengal benchmark for large-scale cultural programming and student participation."
      },
      {
        name: "Pragyan & Festember",
        institute: "NIT Trichy",
        description: "Benchmarks for technical excellence and large-scale cultural programming."
      }
    ],
    pillarsOrTracks: [
      {
        title: "TECH",
        description: "A competitive playground for builders, programmers, designers, engineers, and problem-solvers.",
        iconName: "Cpu",
        items: [
          "Hackathons & 24hr Sprints",
          "Algorithmic Coding Competitions",
          "Robotics & Autonomous Challenges",
          "Competitive Programming League",
          "Technical & Science Quizzes",
          "Hardware Innovation Challenges",
          "Project Showcases & Demos",
          "Hands-on Deep-Tech Workshops",
          "Emerging Tech & AI Exhibitions"
        ]
      },
      {
        title: "CULTURE",
        description: "A celebration of expression, performance, creativity, and campus identity.",
        iconName: "Palette",
        items: [
          "Eastern & Western Music Showcases",
          "Solo & Crew Street Dance Battles",
          "Nukkad Natak & Stage Dramatics",
          "Literary Debates & Creative Writing",
          "Fine Arts & Live Canvas Painting",
          "Photography & Film Screening",
          "Thematic Fashion Runway",
          "Open Mic & Stand-up Comedy",
          "Inter-College Talent Competitions"
        ]
      },
      {
        title: "THE NIGHTS",
        description: "The festival culminates in high-energy cultural and entertainment experiences.",
        iconName: "Sparkles",
        items: [
          "Music Nights: Live student bands, acoustic sets, indie artists & DJs",
          "Cultural Nights: Large-scale performances representing artistic talent",
          "Featured Performances: Platform for renowned guest performers & headliners"
        ]
      }
    ],
    schedule: [
      {
        timeOrDay: "Day 1",
        title: "Inauguration & Genesis",
        location: "Central Amphitheatre & Computing Bay",
        description: "Grand opening ceremony, keynotes, 24-hour Hackathon kickoff, Literary & Quiz preliminary rounds, and opening Acoustic Music Night."
      },
      {
        timeOrDay: "Day 2",
        title: "The Velocity & Rhythm",
        location: "Robotics Arena & Main Stage",
        description: "Competitive Programming finals, RoboClash & Maze Navigation, Street Dance Crew Battles, Fine Arts Exhibitions, and EDM/DJ Night."
      },
      {
        timeOrDay: "Day 3",
        title: "Grand Finale & Star Night",
        location: "Main Festival Grounds",
        description: "Innovation project expo, Nukkad Natak & Stage Play finals, Prize distribution ceremony, and the Grand Cultural Pro-Night."
      }
    ],
    competitions: [
      {
        title: "Algorush CP Challenge",
        category: "Technology",
        prizePool: "Merit Certs & Awards",
        teamSize: "Individual / Duos",
        description: "Fast-paced algorithmic contest testing data structures, dynamic programming, graph theory, and mathematical problem-solving."
      },
      {
        title: "HackKalyani Sprint",
        category: "Technology",
        prizePool: "Awards & Project Support",
        teamSize: "2 - 4 Members",
        description: "24-hour product sprint to build deployable solutions across AI/ML, Decentralized Systems, Healthcare, and Sustainable Campus Tech."
      },
      {
        title: "RoboMaze & Obstacle Sprint",
        category: "Robotics",
        prizePool: "Trophies & Hardware Kits",
        teamSize: "2 - 4 Members",
        description: "Autonomous and manual micro-rover challenges traversing obstacle mazes, line tracking, and sensor-based telemetry."
      },
      {
        title: "Battle of the Bands",
        category: "Culture",
        prizePool: "Recording Time & Awards",
        teamSize: "3 - 8 Members",
        description: "Rock, fusion, indie, and classical musical bands battling across multiple performance rounds on the main festival stage."
      },
      {
        title: "StepUp Street Dance Showcase",
        category: "Culture",
        prizePool: "Trophies & Medals",
        teamSize: "Solo / Crews",
        description: "High-octane choreography showdown covering Hip-hop, Popping, Contemporary, and Fusion styles."
      },
      {
        title: "Nukkad Natak (Street Theatre)",
        category: "Dramatics",
        prizePool: "Best Production & Acting",
        teamSize: "8 - 20 Members",
        description: "Thought-provoking social street plays evaluating voice modulation, script impact, synchronization, and public engagement."
      }
    ],
    stats: [
      { label: "Festival Days", value: "3 Days", sublabel: "Non-stop events" },
      { label: "Event Verticals", value: "30+ Events", sublabel: "Tech & Culture" },
      { label: "Community", value: "All Batches", sublabel: "Inter-college participation" },
      { label: "Core Spirit", value: "1 Identity", sublabel: "Think. Create. Compete. Celebrate." }
    ],
    faqs: [
      {
        question: "What is Renesa?",
        answer: "Renesa is the annual three-day techno-cultural festival of IIIT Kalyani, bringing together technical competitions, creative arts, dance, music, robotics, and marquee festival nights."
      },
      {
        question: "Who can participate in Renesa events?",
        answer: "Students from IIIT Kalyani and invited engineering and university institutions across West Bengal and India can register for competitions, hackathons, and showcases."
      },
      {
        question: "How are the festival events organized?",
        answer: "Events are curated across three main pillars: TECH (coding, hackathons, robotics, quizzes), CULTURE (music, dance, drama, fine arts, literature), and THE NIGHTS (live music, cultural showcases, and featured performances)."
      },
      {
        question: "Where does Renesa take place?",
        answer: "All offline events and festival nights are hosted across the academic blocks, computing labs, auditoriums, and open grounds of the IIIT Kalyani campus."
      }
    ],
    contact: {
      leadName: "Renesa Core Organizing Committee",
      role: "Student Gymkhana & Council",
      email: "gymkhana@iiitkalyani.ac.in"
    }
  },
  {
    id: "statuscode",
    name: "StatusCode",
    shortName: "StatusCode",
    category: "Technology",
    eventType: "Hackathon",
    tagline: "Code. Create. Collaborate. Compete. Conquer.",
    shortDescription: "A major 36-hour student-run hackathon associated with the IIIT Kalyani community, bringing together 500+ developers to build impactful software solutions.",
    description: "StatusCode is a 36-hour hackathon associated with the IIIT Kalyani community. The event brings together developers and student builders to create innovative software solutions, collaborate with peers, explore ideas, and compete across specialized technical tracks.",
    month: "OCT",
    fullDateString: "Annual Hackathon Cycle (October)",
    venue: "IIIT Kalyani Main Campus & Online Tracks",
    mode: "Hybrid",
    organizingBody: "StatusCode Student Technical Community",
    registrationStatus: "Open",
    registrationDeadline: "Verified on official portal",
    officialWebsiteUrl: "https://statuscode.tech",
    bannerImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    themeColor: "from-blue-600 via-indigo-700 to-cyan-500",
    featured: true,
    aboutStory: [
      "StatusCode is a 36-hour hackathon associated with the IIIT Kalyani community.",
      "The event brings together developers and student builders to create innovative software solutions, collaborate with peers, explore ideas, and compete across different tracks.",
      "36 HOURS: Continuous building, debugging, collaboration, experimentation, and problem-solving.",
      "500+ MINDS: Engaging a vibrant community of student builders and engineers.",
      "BUILD SOMETHING THAT MATTERS: Participants transform ideas into working projects while developing practical engineering and teamwork skills."
    ],
    pillarsOrTracks: [
      {
        title: "Artificial Intelligence & Multimodal Systems",
        description: "Generative AI, agentic workflows, autonomous reasoning, computer vision, and applied ML models.",
        iconName: "Bot"
      },
      {
        title: "Web3, Decentralization & FinTech",
        description: "Smart contracts, decentralized storage, cryptographic security, and financial infrastructure.",
        iconName: "Layers"
      },
      {
        title: "Healthcare & Social Innovation",
        description: "Assistive technologies, diagnostics tools, public health informatics, and community resilience platforms.",
        iconName: "HeartPulse"
      },
      {
        title: "Open Innovation & Developer Tooling",
        description: "Open source developer tools, systems software, campus operating systems, and productivity infrastructure.",
        iconName: "Terminal"
      }
    ],
    stats: [
      { label: "Duration", value: "36 Hours", sublabel: "Non-stop building" },
      { label: "Community", value: "500+ Minds", sublabel: "Builders & developers" },
      { label: "Tracks", value: "4 Tracks", sublabel: "Specialized domains" },
      { label: "Focus", value: "Real Products", sublabel: "Working code & demos" }
    ],
    faqs: [
      {
        question: "What is StatusCode?",
        answer: "StatusCode is a premier 36-hour student-run hackathon where developers collaborate to build software solutions across AI, Web3, Healthcare, and Developer Tooling."
      },
      {
        question: "How do I register for StatusCode?",
        answer: "Registrations are hosted via the official StatusCode website. Sarthi links directly to the verified external registration portal."
      }
    ],
    contact: {
      leadName: "StatusCode Organizing Team",
      role: "Lead Coordinators",
      email: "statuscode@iiitkalyani.ac.in"
    }
  },
  {
    id: "anukriti",
    name: "Anukriti",
    shortName: "Anukriti",
    category: "Culture",
    eventType: "Cultural Celebration",
    tagline: "Weaving Culture into Creativity",
    shortDescription: "Annual cultural celebration of IIIT Kalyani featuring music, dance, drama, creative performances, and talent showcases.",
    description: "Anukriti is presented as an annual cultural celebration of IIIT Kalyani, bringing together artistic expression, freshers' orientation performances, dramatics, classical and modern music, and cultural competitions.",
    month: "NOV",
    fullDateString: "Annual Autumn Cultural Gala (November)",
    venue: "Institute Auditorium & Central Lawns",
    mode: "Offline",
    organizingBody: "Gymkhana Cultural & Arts Societies",
    registrationStatus: "Open",
    officialWebsiteUrl: "https://iiitkalyani.ac.in",
    bannerImage: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&q=80&w=1200",
    themeColor: "from-rose-500 via-purple-600 to-pink-600",
    featured: true,
    aboutStory: [
      "Anukriti is presented as an annual cultural celebration of IIIT Kalyani.",
      "The experience brings together music, dance, drama, creative performances, talent showcases, freshers' celebrations, and cultural competitions.",
      "The celebration emphasizes student participation and the diversity of artistic expression across the campus community."
    ],
    pillarsOrTracks: [
      {
        title: "Musical Harmony",
        description: "Classical vocals, acoustic jams, beatboxing, and instrumental orchestra performances.",
        iconName: "Music"
      },
      {
        title: "Dance & Choreography",
        description: "Classical Indian dance forms, folk traditions, street hip-hop, and fusion showcases.",
        iconName: "Activity"
      },
      {
        title: "Theatre & Dramatics",
        description: "Stage plays, mono-acts, mime performances, and socially impactful skits.",
        iconName: "Drama"
      },
      {
        title: "Creative Arts & Literary",
        description: "Live painting, digital illustration galleries, poetry slams, and creative writing.",
        iconName: "Palette"
      }
    ],
    stats: [
      { label: "Celebration", value: "Campus-Wide", sublabel: "All student batches" },
      { label: "Performances", value: "25+ Acts", sublabel: "Music, Dance & Drama" },
      { label: "Community", value: "Inclusive", sublabel: "Student-driven artistry" }
    ],
    faqs: [
      {
        question: "What is Anukriti?",
        answer: "Anukriti is IIIT Kalyani's annual cultural festival highlighting performing arts, music, dance, theatre, and creative expression."
      }
    ],
    contact: {
      leadName: "Cultural Affairs Secretary",
      role: "Gymkhana Cultural Council",
      email: "cultural@iiitkalyani.ac.in"
    }
  },
  {
    id: "ekatra",
    name: "Ekatra",
    shortName: "Ekatra",
    category: "Institutional",
    eventType: "Ceremony",
    tagline: "Celebrate. Remember. Belong.",
    shortDescription: "The annual day and farewell experience of IIIT Kalyani, bringing together students and faculty to celebrate campus memories and graduating batches.",
    description: "Ekatra represents the institute's annual day and farewell experience — bringing students together to celebrate the academic year, campus memories, achievements, awards, and graduating batches in an elegant, ceremonial atmosphere.",
    month: "APR",
    fullDateString: "Annual Academic Day & Farewell (April)",
    venue: "Main Campus Auditorium & Lawns",
    mode: "Offline",
    organizingBody: "Institute Administration & Student Executive Council",
    registrationStatus: "Upcoming",
    officialWebsiteUrl: "https://iiitkalyani.ac.in",
    bannerImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200",
    themeColor: "from-amber-600 via-orange-600 to-slate-800",
    featured: true,
    aboutStory: [
      "Ekatra represents the institute's annual day and farewell experience.",
      "It brings students, faculty, and administration together to celebrate the academic year, campus achievements, student leadership, and graduating batches.",
      "The visual and emotional identity of Ekatra is ceremonial, reflective, and proud — honoring every milestone achieved by the IIIT Kalyani family."
    ],
    pillarsOrTracks: [
      {
        title: "Academic & Excellence Awards",
        description: "Honoring academic merit, research contributions, sports champions, and community leaders.",
        iconName: "Award"
      },
      {
        title: "Graduating Batch Farewell",
        description: "Valedictory reflections, video yearbooks, nostalgic memory reels, and senior felicitations.",
        iconName: "GraduationCap"
      },
      {
        title: "Annual Cultural Showcase",
        description: "Curated gala musical and dramatic performances celebrating the year's artistic journey.",
        iconName: "Sparkles"
      }
    ],
    stats: [
      { label: "Occasion", value: "Annual Day", sublabel: "Institute celebration" },
      { label: "Graduates", value: "Final Year", sublabel: "Farewell & memories" },
      { label: "Honors", value: "Merit Awards", sublabel: "Academic & Gymkhana" }
    ],
    faqs: [
      {
        question: "What is Ekatra?",
        answer: "Ekatra is the annual institutional day and farewell gathering celebrating achievements, student leadership, and graduating students."
      }
    ],
    contact: {
      leadName: "Student Council Secretariat",
      role: "Annual Day Coordinators",
      email: "studentcouncil@iiitkalyani.ac.in"
    }
  },
  {
    id: "enigma",
    name: "Enigma",
    shortName: "Enigma",
    category: "Technology",
    eventType: "Competition",
    tagline: "Navigate. Engineer. Conquer.",
    shortDescription: "A premier maze path-following robot challenge testing autonomous navigation, sensor calibration, embedded hardware, and algorithmic speed.",
    description: "Enigma is a specialized robotics competition focused on autonomous micro-rovers navigating complex line mazes, dead ends, and dynamic path optimizations using embedded sensors and real-time algorithmic decision-making.",
    month: "JAN",
    fullDateString: "Winter Robotics Sprint (January)",
    venue: "Hardware & Robotics Bay, IIIT Kalyani",
    mode: "Offline",
    organizingBody: "S.E.A.L. Robotics Society",
    registrationStatus: "Upcoming",
    officialWebsiteUrl: "https://iiitkalyani.ac.in",
    bannerImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
    themeColor: "from-emerald-600 via-teal-700 to-slate-900",
    featured: true,
    aboutStory: [
      "Enigma is a maze path-following robot competition focused on robotics and engineering problem-solving.",
      "Participants design, build, and program autonomous micro-controllers (Arduino/ESP32/STM32) to map, navigate, and solve intricate mazes in minimal time.",
      "The competition highlights hardware mastery, PID control tuning, IR/optical sensor arrays, and graph-solving algorithms."
    ],
    pillarsOrTracks: [
      {
        title: "Autonomous Line Mazes",
        description: "Solving grid-based black/white line mazes with loop detection and shortest path back-tracking.",
        iconName: "Cpu"
      },
      {
        title: "Sensor Telemetry & PID",
        description: "Precision calibration of analog sensor readings and continuous motor speed modulation.",
        iconName: "Wrench"
      },
      {
        title: "Hardware Engineering",
        description: "Custom chassis design, weight distribution, battery management, and custom PCB routing.",
        iconName: "Zap"
      }
    ],
    stats: [
      { label: "Focus", value: "Autonomous", sublabel: "Line-following robots" },
      { label: "Metric", value: "Time & Path", sublabel: "Optimal maze mapping" },
      { label: "Hardware", value: "Micro-controllers", sublabel: "Custom circuit design" }
    ],
    faqs: [
      {
        question: "What is Enigma?",
        answer: "Enigma is IIIT Kalyani's annual maze-solving autonomous robotics challenge organized by S.E.A.L. Robotics Club."
      }
    ],
    contact: {
      leadName: "S.E.A.L. Robotics Lead",
      role: "Hardware Society",
      email: "seal@iiitkalyani.ac.in"
    }
  }
];

// -------------------------------------------------------------
// COMPREHENSIVE EVENT DISCOVERY DATASET
// -------------------------------------------------------------

export const allCampusEvents: EventDetail[] = [
  ...flagshipFestivals,
  {
    id: "spring-serenade",
    name: "Spring Serenade & Talent Hunt",
    shortName: "Talent Hunt",
    category: "Culture",
    eventType: "Cultural Celebration",
    tagline: "Unleashing Fresh Talent",
    shortDescription: "A platform for freshers and student artists to showcase their musical, theatrical, and creative talents before the campus community.",
    description: "Spring Serenade & Talent Hunt provides students, particularly first-year freshers, with an encouraging platform to perform, discover stage confidence, and join institute cultural societies.",
    month: "AUG",
    fullDateString: "Freshers Orientation Month (August)",
    venue: "Central Amphitheatre",
    mode: "Offline",
    organizingBody: "Gymkhana Cultural Committee",
    registrationStatus: "Closed",
    bannerImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    themeColor: "from-violet-600 to-indigo-800",
    featured: false,
    aboutStory: [
      "Spring Serenade & Talent Hunt provides students, particularly freshers, a platform to perform and participate in music, dance, and creative showcases.",
      "It serves as the gateway to joining the active student societies at IIIT Kalyani."
    ],
    contact: {
      leadName: "Student Affairs Coordinator",
      role: "Freshers Mentorship",
      email: "freshers@iiitkalyani.ac.in"
    }
  },
  {
    id: "alumni-meet",
    name: "Annual Alumni Meet & Industry Bridge",
    shortName: "Alumni Meet",
    category: "Community",
    eventType: "Meetup",
    tagline: "Connecting Generations of Engineers",
    shortDescription: "A platform connecting alumni across global tech companies and research labs with current students for mentorship and networking.",
    description: "The Annual Alumni Meet brings together alumni from past graduating batches to share industry insights, mentor students, conduct mock technical interviews, and discuss startup collaborations.",
    month: "DEC",
    fullDateString: "Annual Alumni Reunion (December)",
    venue: "Main Auditorium & Hybrid Video Streams",
    mode: "Hybrid",
    organizingBody: "Alumni Affairs Cell",
    registrationStatus: "Upcoming",
    bannerImage: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800",
    themeColor: "from-blue-700 to-slate-800",
    featured: false,
    aboutStory: [
      "A platform connecting alumni with current students for interaction, networking, experience sharing, and community building.",
      "Alumni share practical career roadmaps, higher education journeys (MS/PhD), and software engineering leadership insights."
    ],
    contact: {
      leadName: "Alumni Secretary",
      role: "Alumni Affairs",
      email: "alumni@iiitkalyani.ac.in"
    }
  },
  {
    id: "gdg-solution-challenge",
    name: "Google Solution Challenge Bootcamp",
    shortName: "Solution Challenge",
    category: "Technology",
    eventType: "Workshop",
    tagline: "Building for UN Sustainable Development Goals",
    shortDescription: "Hands-on mentorship and project prototyping bootcamp hosted by GDG on Campus IIIT Kalyani for the global Solution Challenge.",
    description: "Intensive developer workshops focused on leveraging Google Cloud, Flutter, Android Jetpack, and Gemini APIs to create solutions for the 17 UN Sustainable Development Goals.",
    month: "OCT",
    fullDateString: "Developer Series (October)",
    venue: "CS Lab 2 & Online",
    mode: "Hybrid",
    organizingBody: "GDG on Campus IIIT Kalyani",
    registrationStatus: "Open",
    bannerImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    themeColor: "from-sky-600 to-indigo-600",
    featured: false,
    aboutStory: [
      "Organized by GDG on Campus IIIT Kalyani to prepare student engineering teams for national and global technology competitions.",
      "Features architecture reviews, code labs on Google Cloud, and AI system design."
    ],
    contact: {
      leadName: "GDG Campus Lead",
      role: "Lead Organizer",
      email: "gdg@iiitkalyani.ac.in"
    }
  },
  {
    id: "ipl-cricket-championship",
    name: "IIITK Premier League (IPL) Cricket Cup",
    shortName: "IPL Cricket",
    category: "Sports",
    eventType: "Tournament",
    tagline: "Passion. Precision. Victory.",
    shortDescription: "Inter-batch cricket championship bringing together 1st, 2nd, 3rd, 4th year and PG/Research teams.",
    description: "Annual cricket league featuring player auctions, round-robin league matches, super-overs, and a festive weekend final on the institute sports grounds.",
    month: "MAR",
    fullDateString: "Spring Sports Season (March)",
    venue: "Institute Sports Ground",
    mode: "Offline",
    organizingBody: "Sports Club, Student Gymkhana",
    registrationStatus: "Upcoming",
    bannerImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    themeColor: "from-emerald-600 to-teal-800",
    featured: false,
    aboutStory: [
      "The flagship sporting tournament of IIIT Kalyani bringing athletic energy and sportsmanship across batches."
    ],
    contact: {
      leadName: "Sports Secretary",
      role: "Gymkhana Sports Council",
      email: "sports@iiitkalyani.ac.in"
    }
  },
  {
    id: "national-science-day-symposium",
    name: "National Science & Research Colloquium",
    shortName: "Science Colloquium",
    category: "Academic",
    eventType: "Workshop",
    tagline: "Frontiers in Applied Mathematics & Physics",
    shortDescription: "Scholarly presentations, doctoral research colloquiums, and invited expert keynotes commemorating National Science Day.",
    description: "Featuring poster sessions by Ph.D. scholars, undergraduate research showcases in Space Weather, Cryptography, and 5G Communications, and invited faculty lectures.",
    month: "FEB",
    fullDateString: "National Science Day (February 28)",
    venue: "Auditorium Hall 1",
    mode: "Hybrid",
    organizingBody: "Academic & Research Committee",
    registrationStatus: "Upcoming",
    bannerImage: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800",
    themeColor: "from-indigo-600 to-slate-800",
    featured: false,
    aboutStory: [
      "Fostering an active scientific atmosphere, academic rigor, and undergraduate research engagement."
    ],
    contact: {
      leadName: "FIC Academics & Research",
      role: "Faculty Coordinator",
      email: "academic@iiitkalyani.ac.in"
    }
  },
  {
    id: "iic-startup-ideathon",
    name: "IIC Deep-Tech Startup Ideathon",
    shortName: "IIC Ideathon",
    category: "Innovation",
    eventType: "Competition",
    tagline: "From Prototype to Venture",
    shortDescription: "MoE Institution's Innovation Council ideation challenge offering pre-incubation grants and patent guidance.",
    description: "Students pitch deep-tech, IoT, and software startup concepts to an expert jury comprising faculty, venture mentors, and industry practitioners.",
    month: "APR",
    fullDateString: "Innovation Month (April)",
    venue: "IIC Innovation Hub, Room 108",
    mode: "Hybrid",
    organizingBody: "Institution's Innovation Council (IIC)",
    registrationStatus: "Open",
    bannerImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
    themeColor: "from-amber-500 to-rose-700",
    featured: false,
    aboutStory: [
      "Supported by the National Innovation and Startup Policy (NISP) framework to cultivate student-led venture creation."
    ],
    contact: {
      leadName: "President, IIC",
      role: "Innovation Council",
      email: "iic@iiitkalyani.ac.in"
    }
  }
];

// -------------------------------------------------------------
// INTERACTIVE ANNUAL EVENT CALENDAR (Month-by-Month)
// -------------------------------------------------------------

export const annualEventCalendar: AnnualCalendarMonth[] = [
  {
    month: "AUG",
    monthNumber: 8,
    seasonTheme: "Induction & Freshers Welcome",
    highlightCategory: "Culture & Community",
    events: [
      {
        id: "ev-freshers",
        title: "Freshers Orientation & Induction Week",
        category: "Institutional",
        type: "Orientation",
        dateDescription: "First & Second Week of August",
        venue: "Main Campus & Auditorium",
        organizer: "Institute Administration & Mentors"
      },
      {
        id: "ev-talenthunt",
        title: "Spring Serenade & Freshers Talent Hunt",
        category: "Culture",
        type: "Cultural Showcase",
        dateDescription: "Late August",
        venue: "Amphitheatre",
        organizer: "Gymkhana Cultural Society"
      }
    ]
  },
  {
    month: "SEP",
    monthNumber: 9,
    seasonTheme: "Technical Workshops & Competitions",
    highlightCategory: "Technology",
    events: [
      {
        id: "ev-foss-bootcamp",
        title: "FOSS & Git Open Source Sprint",
        category: "Technology",
        type: "Hands-on Bootcamp",
        dateDescription: "Mid September",
        venue: "CS Lab 1 & GitHub",
        organizer: "FreeScape Open Source Club"
      },
      {
        id: "ev-engineers-day",
        title: "Engineers' Day Technical Exhibition",
        category: "Academic",
        type: "Project Expo",
        dateDescription: "September 15",
        venue: "Hardware & Robotics Bay",
        organizer: "IEEE Student Branch & S.E.A.L."
      }
    ]
  },
  {
    month: "OCT",
    monthNumber: 10,
    seasonTheme: "Hackathons & Developer Sprints",
    highlightCategory: "Technology",
    events: [
      {
        id: "ev-statuscode-main",
        title: "StatusCode: 36-Hour National Hackathon",
        category: "Technology",
        type: "Flagship Hackathon",
        dateDescription: "Annual Hackathon Cycle (October)",
        venue: "Main Computing Bay & Hybrid Tracks",
        organizer: "StatusCode Technical Team"
      },
      {
        id: "ev-gdg-jam",
        title: "GDG Cloud & Multimodal AI Study Jam",
        category: "Technology",
        type: "Developer Bootcamp",
        dateDescription: "Late October",
        venue: "Auditorium Hall 1",
        organizer: "GDG on Campus IIIT Kalyani"
      }
    ]
  },
  {
    month: "NOV",
    monthNumber: 11,
    seasonTheme: "Cultural Celebrations & Arts",
    highlightCategory: "Culture",
    events: [
      {
        id: "ev-anukriti-main",
        title: "Anukriti: Annual Cultural Celebration",
        category: "Culture",
        type: "Cultural Festival",
        dateDescription: "Mid-to-Late November",
        venue: "Main Stage & Lawns",
        organizer: "Student Gymkhana Cultural Societies"
      },
      {
        id: "ev-theatre-fest",
        title: "Spotlight Annual Nukkad Natak Street Theatre",
        category: "Culture",
        type: "Dramatics",
        dateDescription: "Late November",
        venue: "Central Amphitheatre",
        organizer: "Spotlight Theatre Club"
      }
    ]
  },
  {
    month: "DEC",
    monthNumber: 12,
    seasonTheme: "Academic Colloquium & Alumni Gathering",
    highlightCategory: "Academic & Community",
    events: [
      {
        id: "ev-alumni-day",
        title: "Annual Alumni Meet & Career Bridge",
        category: "Community",
        type: "Reunion & Mentorship",
        dateDescription: "December Winter Recess",
        venue: "Auditorium & Virtual Bridge",
        organizer: "Alumni Affairs Cell"
      },
      {
        id: "ev-winter-coding",
        title: "Winter Algorithmic Sprint & CP League",
        category: "Technology",
        type: "Contest",
        dateDescription: "Mid December",
        venue: "Online Contest Platforms",
        organizer: "Coding Society"
      }
    ]
  },
  {
    month: "JAN",
    monthNumber: 1,
    seasonTheme: "Republic Day & Robotics Challenges",
    highlightCategory: "Technology & Institutional",
    events: [
      {
        id: "ev-republic-day",
        title: "Republic Day Observance & Flag Hoisting",
        category: "Institutional",
        type: "National Ceremony",
        dateDescription: "January 26",
        venue: "Institute Ceremonial Grounds",
        organizer: "Institute Administration"
      },
      {
        id: "ev-enigma-main",
        title: "Enigma: Maze Path-Following Robotics Challenge",
        category: "Technology",
        type: "Robotics Competition",
        dateDescription: "Late January",
        venue: "Hardware & Robotics Bay",
        organizer: "S.E.A.L. Robotics Club"
      }
    ]
  },
  {
    month: "FEB",
    monthNumber: 2,
    seasonTheme: "RENESA: Annual Techno-Cultural Fest",
    highlightCategory: "Flagship Fest",
    events: [
      {
        id: "ev-renesa-main",
        title: "RENESA: The Annual Techno-Cultural Fest",
        category: "Technology",
        type: "Flagship 3-Day Fest",
        dateDescription: "Annual Spring Edition (February)",
        venue: "Campus-Wide",
        organizer: "Student Gymkhana & Council"
      },
      {
        id: "ev-science-day",
        title: "National Science Day Symposium & Poster Expo",
        category: "Academic",
        type: "Scholastic Seminar",
        dateDescription: "February 28",
        venue: "Auditorium 1",
        organizer: "Science & Research Committee"
      }
    ]
  },
  {
    month: "MAR",
    monthNumber: 3,
    seasonTheme: "Sports Leagues & Athletics",
    highlightCategory: "Sports",
    events: [
      {
        id: "ev-sports-ipl",
        title: "IIITK Premier League (IPL) Cricket Cup",
        category: "Sports",
        type: "Tournament",
        dateDescription: "Early to Mid March",
        venue: "Institute Sports Ground",
        organizer: "Sports Club"
      },
      {
        id: "ev-football-championship",
        title: "Inter-Hostel Football League",
        category: "Sports",
        type: "League",
        dateDescription: "Late March",
        venue: "Main Ground",
        organizer: "Sports Club"
      }
    ]
  },
  {
    month: "APR",
    monthNumber: 4,
    seasonTheme: "Innovation, Research Expo & Farewell",
    highlightCategory: "Innovation & Institutional",
    events: [
      {
        id: "ev-ekatra-main",
        title: "Ekatra: Annual Day & Farewell Celebration",
        category: "Institutional",
        type: "Ceremony & Awards",
        dateDescription: "Mid April",
        venue: "Auditorium & Lawns",
        organizer: "Institute Administration & Council"
      },
      {
        id: "ev-iic-expo",
        title: "IIC Deep-Tech Startup Demo Day",
        category: "Innovation",
        type: "Pitch & Exhibition",
        dateDescription: "Late April",
        venue: "IIC Innovation Hub",
        organizer: "Institution's Innovation Council"
      }
    ]
  }
];

export const eventCategoryFilters = [
  "All",
  "Technology",
  "Culture",
  "Sports",
  "Academic",
  "Innovation",
  "Institutional",
  "Community"
] as const;
