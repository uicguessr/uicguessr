// Game Data for UICguessr

// Building/Location Data
const buildings = {
    SCE: {
        name: "Student Center East (SCE)",
        fullName: "Student Center East",
        abbreviation: "SCE",
        address: "750 S Halsted Street, Chicago, IL 60607",
        description: "The Student Center East is a hub of student activity, featuring dining options, study spaces, and various student services. It's a central gathering point for the UIC community.",
        photo: "https://via.placeholder.com/600x400/4CAF50/FFFFFF?text=Student+Center+East+(SCE)",
        resources: [
            { name: "Food Court", description: "Multiple dining options" },
            { name: "Wellness Center", description: "Health & wellness services" },
            { name: "Study Spaces", description: "Individual and group study areas" }
        ],
        landmarks: [
            "Richard J. Daley Library - Main library, 3 min walk (North)",
            "Lecture Center A - Large lecture halls, 2 min walk (West)",
            "ARC - Recreation center, 4 min walk (East)"
        ],
        features: [
            "Large glass entrance with SCE signage",
            "Modern architectural design",
            "Multiple entry doors with accessibility features",
            "Located on Halsted Street"
        ],
        tips: "Look for the 'SCE' abbreviation on building signage and the modern glass entrance."
    },
    ARC: {
        name: "Activities & Recreation Center (ARC)",
        fullName: "Activities & Recreation Center",
        abbreviation: "ARC",
        address: "828 S Wolcott Avenue, Chicago, IL 60612",
        description: "The ARC is UIC's premier fitness and recreation facility, offering a wide range of athletic facilities, fitness equipment, and recreational programs for students.",
        photo: "https://via.placeholder.com/600x400/2196F3/FFFFFF?text=Activities+%26+Recreation+Center+(ARC)",
        resources: [
            { name: "Fitness Center", description: "State-of-the-art gym equipment" },
            { name: "Swimming Pool", description: "Olympic-size pool for recreation" },
            { name: "Basketball Courts", description: "Indoor courts available" },
            { name: "Group Fitness Classes", description: "Yoga, spin, and more" }
        ],
        landmarks: [
            "SCE - Student Center, 4 min walk (West)",
            "UIC Pavilion - Sports arena, 3 min walk (North)",
            "Student Residence Hall - Dorms, 2 min walk (South)"
        ],
        features: [
            "Large modern facility with glass windows",
            "ARC lettering on exterior",
            "Outdoor recreational fields nearby",
            "Multiple entrances with accessibility ramps"
        ],
        tips: "The ARC has a distinctive modern athletic facility appearance with large windows."
    },
    BSB: {
        name: "Behavioral Sciences Building (BSB)",
        fullName: "Behavioral Sciences Building",
        abbreviation: "BSB",
        address: "1007 W Harrison Street, Chicago, IL 60607",
        description: "BSB houses the College of Liberal Arts and Sciences departments focused on psychology, sociology, and other behavioral sciences. Features classrooms, labs, and faculty offices.",
        photo: "https://via.placeholder.com/600x400/9C27B0/FFFFFF?text=Behavioral+Sciences+Building+(BSB)",
        resources: [
            { name: "Psychology Labs", description: "Research facilities" },
            { name: "Computer Labs", description: "Student computing resources" },
            { name: "Study Lounges", description: "Quiet study areas" }
        ],
        landmarks: [
            "Student Center East - 3 min walk (North)",
            "Science & Engineering South - 5 min walk (East)",
            "University Hall - Admin building, 4 min walk (West)"
        ],
        features: [
            "Brick exterior with BSB signage",
            "Traditional academic building design",
            "Multiple floors with regular window pattern",
            "Located on Harrison Street"
        ],
        tips: "BSB has a more traditional academic building appearance with brick construction."
    },
    LIB: {
        name: "Richard J. Daley Library",
        fullName: "Richard J. Daley Library",
        abbreviation: "LIB",
        address: "801 S Morgan Street, Chicago, IL 60607",
        description: "UIC's main library is a massive brutalist structure that serves as the university's primary research library, offering extensive collections, study spaces, and research assistance.",
        photo: "https://via.placeholder.com/600x400/795548/FFFFFF?text=Richard+J.+Daley+Library+(LIB)",
        resources: [
            { name: "Research Collections", description: "Extensive book and journal holdings" },
            { name: "Special Collections", description: "Rare books and archives" },
            { name: "Group Study Rooms", description: "Reservable study spaces" },
            { name: "Research Assistance", description: "Librarian help desk" }
        ],
        landmarks: [
            "Student Center East - 3 min walk (South)",
            "University Hall - 2 min walk (West)",
            "Lecture Center - Adjacent building"
        ],
        features: [
            "Iconic brutalist concrete architecture",
            "Very large, imposing structure",
            "Distinctive angular design",
            "Visible from across campus"
        ],
        tips: "The library's unique brutalist architecture makes it one of the most recognizable buildings on campus."
    },
    SES: {
        name: "Science & Engineering South (SES)",
        fullName: "Science & Engineering South",
        abbreviation: "SES",
        address: "845 W Taylor Street, Chicago, IL 60607",
        description: "SES is a modern facility housing laboratories, classrooms, and collaborative spaces for science and engineering students and faculty.",
        photo: "https://via.placeholder.com/600x400/FF5722/FFFFFF?text=Science+%26+Engineering+South+(SES)",
        resources: [
            { name: "Engineering Labs", description: "Specialized research labs" },
            { name: "Maker Space", description: "3D printing and prototyping" },
            { name: "Computer Labs", description: "High-performance computing" },
            { name: "Study Areas", description: "Collaborative workspaces" }
        ],
        landmarks: [
            "Science & Engineering Labs - Adjacent building",
            "Engineering Research Facility - 2 min walk (East)",
            "BSB - Behavioral Sciences, 5 min walk (West)"
        ],
        features: [
            "Modern glass and steel construction",
            "SES signage visible on building",
            "Contemporary architectural design",
            "Large windows throughout"
        ],
        tips: "SES features modern architecture with lots of glass, typical of newer science buildings."
    },
    UH: {
        name: "University Hall (UH)",
        fullName: "University Hall",
        abbreviation: "UH",
        address: "601 S Morgan Street, Chicago, IL 60607",
        description: "University Hall houses administrative offices including Admissions, Registrar, Financial Aid, and other student services. It's often the first stop for new students.",
        photo: "https://via.placeholder.com/600x400/607D8B/FFFFFF?text=University+Hall+(UH)",
        resources: [
            { name: "Admissions Office", description: "Undergraduate admissions" },
            { name: "Registrar", description: "Course registration and records" },
            { name: "Financial Aid", description: "Student financial services" },
            { name: "Student Services", description: "Various administrative offices" }
        ],
        landmarks: [
            "Daley Library - 2 min walk (East)",
            "Student Center West - 3 min walk (South)",
            "Flames Statue - Iconic campus landmark nearby"
        ],
        features: [
            "Tall tower structure",
            "UH signage visible",
            "Administrative building appearance",
            "Central campus location"
        ],
        tips: "University Hall has a distinctive tall tower and is centrally located on campus."
    },
    TH: {
        name: "Taft Hall (TH)",
        fullName: "Taft Hall",
        abbreviation: "TH",
        address: "929 W Harrison Street, Chicago, IL 60607",
        description: "Taft Hall houses various academic departments and classrooms, serving as a key instructional building on campus.",
        photo: "https://via.placeholder.com/600x400/3F51B5/FFFFFF?text=Taft+Hall+(TH)",
        resources: [
            { name: "Classrooms", description: "General education courses" },
            { name: "Faculty Offices", description: "Office hours and meetings" },
            { name: "Computer Lab", description: "Student computing access" }
        ],
        landmarks: [
            "Grant Hall - Adjacent building (North)",
            "Burnham Hall - 1 min walk (South)",
            "Student Center East - 4 min walk (East)"
        ],
        features: [
            "Traditional academic building",
            "Brick construction",
            "Multiple stories",
            "TH signage on exterior"
        ],
        tips: "Taft Hall has classic university architecture with brick exterior."
    },
    LCA: {
        name: "Lecture Center A (LCA)",
        fullName: "Lecture Center A",
        abbreviation: "LCA",
        address: "1000 S Morgan Street, Chicago, IL 60607",
        description: "Lecture Center A contains large auditorium-style classrooms for introductory and general education courses.",
        photo: "https://via.placeholder.com/600x400/00BCD4/FFFFFF?text=Lecture+Center+A+(LCA)",
        resources: [
            { name: "Large Lecture Halls", description: "100-300 seat auditoriums" },
            { name: "Study Lounges", description: "Between-class study space" }
        ],
        landmarks: [
            "Daley Library - Adjacent (South)",
            "Lecture Center D - Connected building",
            "Student Center East - 2 min walk (East)"
        ],
        features: [
            "Part of lecture center complex",
            "Large building with multiple entrances",
            "LCA signage",
            "Connected to library via skywalk"
        ],
        tips: "Lecture centers are interconnected buildings near the library."
    }
};

// Question Sets with multiple difficulty levels
const questionSets = {
    easy: [
        {
            building: "SCE",
            correctAnswer: "SCE",
            options: ["SCE", "ARC", "BSB", "LIB"],
            difficulty: "easy",
            hint: "Look for the modern glass entrance and 'SCE' abbreviation on the building signage."
        },
        {
            building: "ARC",
            correctAnswer: "ARC",
            options: ["ARC", "SCE", "SES", "UH"],
            difficulty: "easy",
            hint: "This is a large athletic facility with modern architecture and lots of windows."
        },
        {
            building: "LIB",
            correctAnswer: "LIB",
            options: ["LIB", "BSB", "UH", "TH"],
            difficulty: "easy",
            hint: "The iconic brutalist concrete architecture makes this building unmistakable."
        },
        {
            building: "BSB",
            correctAnswer: "BSB",
            options: ["BSB", "SES", "TH", "LCA"],
            difficulty: "easy",
            hint: "Traditional brick academic building with BSB signage."
        },
        {
            building: "SES",
            correctAnswer: "SES",
            options: ["SES", "ARC", "SCE", "LIB"],
            difficulty: "easy",
            hint: "Modern science building with glass and steel construction."
        }
    ],
    medium: [
        {
            building: "UH",
            correctAnswer: "UH",
            options: ["UH", "LIB", "TH", "BSB"],
            difficulty: "medium",
            hint: "Tall administrative building with tower structure."
        },
        {
            building: "TH",
            correctAnswer: "TH",
            options: ["TH", "BSB", "UH", "LCA"],
            difficulty: "medium",
            hint: "Classic brick academic building housing classrooms."
        },
        {
            building: "LCA",
            correctAnswer: "LCA",
            options: ["LCA", "LIB", "UH", "SCE"],
            difficulty: "medium",
            hint: "Large lecture hall building connected to the library."
        },
        {
            building: "SCE",
            correctAnswer: "SCE",
            options: ["SCE", "SES", "ARC", "UH"],
            difficulty: "medium",
            hint: "Central student hub with dining and services."
        },
        {
            building: "ARC",
            correctAnswer: "ARC",
            options: ["ARC", "SES", "SCE", "LCA"],
            difficulty: "medium",
            hint: "Recreation facility with fitness center and pool."
        }
    ],
    hard: [
        {
            building: "BSB",
            correctAnswer: "BSB",
            options: ["BSB", "TH", "UH", "LCA"],
            difficulty: "hard",
            hint: "Behavioral sciences building with psychology labs."
        },
        {
            building: "SES",
            correctAnswer: "SES",
            options: ["SES", "ARC", "BSB", "LIB"],
            difficulty: "hard",
            hint: "Engineering facility with maker spaces and labs."
        },
        {
            building: "LIB",
            correctAnswer: "LIB",
            options: ["LIB", "UH", "LCA", "BSB"],
            difficulty: "hard",
            hint: "Brutalist architecture landmark visible across campus."
        },
        {
            building: "UH",
            correctAnswer: "UH",
            options: ["UH", "TH", "LIB", "SES"],
            difficulty: "hard",
            hint: "Administrative tower with student services."
        },
        {
            building: "TH",
            correctAnswer: "TH",
            options: ["TH", "BSB", "LCA", "UH"],
            difficulty: "hard",
            hint: "Academic building near Grant and Burnham Halls."
        }
    ]
};

// All Campus Resources
const allResources = [
    {
        category: "Academic Support",
        name: "Writing Center",
        description: "Get help with papers, essays, and writing assignments from trained peer tutors.",
        location: "University Hall"
    },
    {
        category: "Academic Support",
        name: "Math Tutoring Center",
        description: "Free drop-in tutoring for math courses at all levels.",
        location: "Taft Hall"
    },
    {
        category: "Academic Support",
        name: "Library Research Help",
        description: "Librarians provide research assistance and source guidance.",
        location: "Daley Library"
    },
    {
        category: "Academic Support",
        name: "Academic Success Programs",
        description: "Workshops on study skills, time management, and academic strategies.",
        location: "Student Center East"
    },
    {
        category: "Health & Wellness",
        name: "Campus Recreation",
        description: "Fitness center, pool, courts, and group fitness classes.",
        location: "ARC"
    },
    {
        category: "Health & Wellness",
        name: "Counseling Center",
        description: "Mental health services and counseling for students.",
        location: "Student Center East"
    },
    {
        category: "Health & Wellness",
        name: "Student Health Services",
        description: "Medical care, immunizations, and health consultations.",
        location: "Wellness Center"
    },
    {
        category: "Health & Wellness",
        name: "Disability Resource Center",
        description: "Accommodations and support for students with disabilities.",
        location: "University Hall"
    },
    {
        category: "Student Services",
        name: "Admissions Office",
        description: "Information for prospective and new students.",
        location: "University Hall"
    },
    {
        category: "Student Services",
        name: "Registrar",
        description: "Course registration, transcripts, and academic records.",
        location: "University Hall"
    },
    {
        category: "Student Services",
        name: "Financial Aid Office",
        description: "Scholarships, grants, loans, and financial planning.",
        location: "University Hall"
    },
    {
        category: "Student Services",
        name: "Career Services",
        description: "Resume help, interview prep, internship and job search support.",
        location: "Student Center East"
    },
    {
        category: "Dining & Social",
        name: "SCE Food Court",
        description: "Multiple dining options including chains and local vendors.",
        location: "Student Center East"
    },
    {
        category: "Dining & Social",
        name: "Library Café",
        description: "Coffee shop for studying and quick meals.",
        location: "Daley Library"
    },
    {
        category: "Dining & Social",
        name: "Student Organization Spaces",
        description: "Meeting rooms and offices for registered student organizations.",
        location: "Student Center East"
    },
    {
        category: "Technology",
        name: "Computer Labs",
        description: "Free computer access with software for coursework.",
        location: "Multiple Buildings"
    },
    {
        category: "Technology",
        name: "IT Help Desk",
        description: "Technical support for UIC accounts and systems.",
        location: "Daley Library"
    },
    {
        category: "Technology",
        name: "Maker Space",
        description: "3D printing, laser cutting, and prototyping equipment.",
        location: "Science & Engineering South"
    }
];

// Game Settings
const gameSettings = {
    totalRounds: 5,
    attemptsPerQuestion: 2,
    pointsFirstTry: 100,
    pointsSecondTry: 50,
    pointsMissed: 0,
    soundEnabled: true,
    hintsEnabled: true
};

