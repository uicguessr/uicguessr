// Game Data for UICguessr

// Building/Location Data
const buildings = {
    SCE: {
        name: "Student Center East (SCE)",
        fullName: "Student Center East",
        abbreviation: "SCE",
        categories: ["services", "dining"],
        address: "750 S Halsted Street, Chicago, IL 60607",
        coordinates: { lat: 41.871969, lng: -87.647939 },
        officialUrl: "https://studentcenters.uic.edu/student-center-east/",
        description: "The Student Center East is a hub of student activity, featuring dining options, study spaces, and various student services. It's a central gathering point for the UIC community.",
        photo: "https://upload.wikimedia.org/wikipedia/commons/5/58/UIC_Student_Center_East.JPG",
        photoCredit: "Hied5 via Wikimedia Commons",
        photoCreditUrl: "https://commons.wikimedia.org/wiki/File:UIC_Student_Center_East.JPG",
        photoLicense: "Public Domain",
        resources: [
            { name: "Food Court", description: "Multiple dining options", url: "https://dining.uic.edu/" },
            { name: "Wellness Center", description: "Health & wellness services", url: "https://wellnesscenter.uic.edu/" },
            { name: "Study Spaces", description: "Individual and group study areas" }
        ],
        landmarks: [
            "Richard J. Daley Library - Main library, 3 min walk (North)",
            "Lecture Center A - Large lecture halls, 2 min walk (West)",
            "UIC Student Recreation Facility (SRF) - Recreation center, 4 min walk (East)"
        ],
        features: [
            "Large glass entrance with SCE signage",
            "Modern architectural design",
            "Multiple entry doors with accessibility features",
            "Located on Halsted Street"
        ],
        tips: "Look for the 'SCE' abbreviation on building signage and the modern glass entrance."
    },
    SRF: {
        name: "UIC Student Recreation Facility (SRF)",
        fullName: "UIC Student Recreation Facility",
        abbreviation: "SRF",
        categories: ["recreation"],
        address: "737 S Halsted Street, Chicago, IL 60607",
        coordinates: { lat: 41.872627, lng: -87.646351 },
        officialUrl: "https://recreation.uic.edu/",
        description: "The SRF is UIC's premier fitness and recreation facility, offering a wide range of athletic facilities, fitness equipment, and recreational programs for students.",
        photo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/UIC_SRF.JPG",
        photoCredit: "Hied5 via Wikimedia Commons",
        photoCreditUrl: "https://commons.wikimedia.org/wiki/File:UIC_SRF.JPG",
        photoLicense: "Public Domain",
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
            "SRF lettering on exterior",
            "Outdoor recreational fields nearby",
            "Multiple entrances with accessibility ramps"
        ],
        tips: "The SRF has a distinctive modern athletic facility appearance with large windows."
    },
    BSB: {
        name: "Behavioral Sciences Building (BSB)",
        fullName: "Behavioral Sciences Building",
        abbreviation: "BSB",
        categories: ["academic"],
        address: "1007 W Harrison Street, Chicago, IL 60607",
        coordinates: { lat: 41.873718, lng: -87.65261 },
        description: "BSB houses the College of Liberal Arts and Sciences departments focused on psychology, sociology, and other behavioral sciences. Features classrooms, labs, and faculty offices.",
        photo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/UIC_East_Campus_in_the_fall.JPG",
        photoCredit: "Hied5 via Wikimedia Commons",
        photoCreditUrl: "https://commons.wikimedia.org/wiki/File:UIC_East_Campus_in_the_fall.JPG",
        photoLicense: "CC BY-SA 3.0",
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
        categories: ["academic", "dining"],
        address: "801 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.871881, lng: -87.650494 },
        officialUrl: "https://library.uic.edu/libraries/daley-library/",
        description: "UIC's main library is a massive brutalist structure that serves as the university's primary research library, offering extensive collections, study spaces, and research assistance.",
        photo: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzEe_V5ceHxVmZ4o_7AR4i7yUQh_IXZK9DlwVxBPGWzwqinMWKAVbAuq3Cc9oG9qCc3kttbnixrc79uVgrZiwyrQepmZcxb0rCuf0C3YCEzxm6ABciwwGnP3v0H1HQKiyL9Fdw=s1360-w1360-h1020-rw",
        photoCredit: "steven B",
        photoCreditUrl: "https://maps.google.com",
        photoLicense: "Google Maps",
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
        categories: ["academic"],
        address: "845 W Taylor Street, Chicago, IL 60607",
        coordinates: { lat: 41.869726, lng: -87.648086 },
        description: "SES is a modern facility housing laboratories, classrooms, and collaborative spaces for science and engineering students and faculty.",
        photo: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyZeH1TT1e8U9L-9zguyXRzOQUeeyXc5j4CGaiKxOTajOrJ0Hb-eiYMtFCRW_dnAdaVxZ1lg6mDzfwQBdawiUM_nV0VfFPAduZI1XAj8IW13ioMBasQyoD0oeagxrDreetptNA=s1360-w1360-h1020-rw",
        photoCredit: "Tmatthes via Wikimedia Commons",
        photoCreditUrl: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyZeH1TT1e8U9L-9zguyXRzOQUeeyXc5j4CGaiKxOTajOrJ0Hb-eiYMtFCRW_dnAdaVxZ1lg6mDzfwQBdawiUM_nV0VfFPAduZI1XAj8IW13ioMBasQyoD0oeagxrDreetptNA=s1360-w1360-h1020-rw",
        photoLicense: "Public Domain",
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
        categories: ["services"],
        address: "601 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.873779, lng: -87.651001 },
        description: "University Hall houses administrative offices including Admissions, Registrar, Financial Aid, and other student services. It's often the first stop for new students.",
        photo: "https://upload.wikimedia.org/wikipedia/commons/e/eb/University_of_Illinois_at_Chicago_-1.jpg",
        photoCredit: "artistmac via Wikimedia Commons",
        photoCreditUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/University_of_Illinois_at_Chicago_-1.jpg",
        photoLicense: "Wikimedia Commons",
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
        categories: ["academic"],
        address: "929 W Harrison Street, Chicago, IL 60607",
        coordinates: { lat: 41.873981, lng: -87.650234 },
        description: "Taft Hall houses various academic departments and classrooms, serving as a key instructional building on campus.",
        photo: "https://www.preservationchicago.org/wp-content/uploads/2023/03/Untitled-128.png",
        photoCredit: "Preservation Chicago",
        photoCreditUrl: "https://www.preservationchicago.org/wp-content/uploads/2023/03/Untitled-128.png",
        photoLicense: "Preservation Chicago",
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
        categories: ["academic"],
        address: "1000 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.869384, lng: -87.651232 },
        description: "Lecture Center A contains large auditorium-style classrooms for introductory and general education courses.",
        photo: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxv026zxhDnyMHvJb2xs95DhP68kA8tfEvGQ7kjX8HE4bvRjXUvZrXggkHyi7JQbs9wFQzPU5GJvLS3JFD6txr4mkBeOnXg10nZcDkKpu7HXVQqwnGagfv95AeypUh-avWYQ9OTfg=s1360-w1360-h1020-rw",
        photoCredit: "Vanessa Van via Google Maps",
        photoCreditUrl: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxv026zxhDnyMHvJb2xs95DhP68kA8tfEvGQ7kjX8HE4bvRjXUvZrXggkHyi7JQbs9wFQzPU5GJvLS3JFD6txr4mkBeOnXg10nZcDkKpu7HXVQqwnGagfv95AeypUh-avWYQ9OTfg=s1360-w1360-h1020-rw",
        photoLicense: "Google Maps",
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
    },
    ERF: {
        name: "Engineering Research Facility (ERF)",
        fullName: "Engineering Research Facility",
        abbreviation: "ERF",
        categories: ["academic"],
        address: "842 W Taylor Street, Chicago, IL 60607",
        coordinates: { lat: 41.869941, lng: -87.647958 },
        description: "ERF is dedicated to cutting-edge engineering research, featuring state-of-the-art laboratories and collaborative research spaces.",
        photo: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyH3tnWPxpUEKIGkXsjO3_RejpQmvlakTwlO95shmYw1hUCHMbrgC_pGwO3Tf0FrgCupSBeiwUTyx066kYnUUAQb0tYZQgo92iiPnhkteQyoJB6mRypUt3WQ3HKjup87qXXHViG=s1360-w1360-h1020-rw",
        photoCredit: "Pierre Jezraoui",
        photoCreditUrl: "https://maps.google.com",
        photoLicense: "Google Maps",
        resources: [
            { name: "Research Labs", description: "Advanced engineering research facilities" },
            { name: "Clean Rooms", description: "Specialized fabrication spaces" },
            { name: "Collaboration Spaces", description: "Team project areas" }
        ],
        landmarks: [
            "SES - Science & Engineering South, 1 min walk (West)",
            "Engineering Innovation Building - 2 min walk (South)",
            "Halsted Street Blue Line - 5 min walk (North)"
        ],
        features: [
            "Modern research facility design",
            "Glass and concrete construction",
            "ERF signage visible",
            "Advanced equipment visible through windows"
        ],
        tips: "ERF is a modern research building near SES with distinctive laboratory features."
    },
    SCW: {
        name: "Student Center West (SCW)",
        fullName: "Student Center West",
        abbreviation: "SCW",
        categories: ["dining", "services"],
        address: "828 S Wolcott Avenue, Chicago, IL 60612",
        coordinates: { lat: 41.870775, lng: -87.67454 },
        officialUrl: "https://studentcenters.uic.edu/student-center-west/",
        description: "Student Center West offers additional dining, meeting spaces, and student organization offices, complementing the facilities at SCE.",
        photo: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyD4Q64VZem_2-UlHwBrRK8EW65K5CrM6Y5Rb1yo6JyIMB57DlgPC_XbGd7prCoqepEv2qEIVuAMUtyPtqP1DL7reCjq2-eDgeNzfd0kqEZO-F0_ujYPUWdqxfmCsHyFWWB2Lk0hA=s1360-w1360-h1020-rw",
        photoCredit: "ch via Google Maps",
        photoCreditUrl: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyD4Q64VZem_2-UlHwBrRK8EW65K5CrM6Y5Rb1yo6JyIMB57DlgPC_XbGd7prCoqepEv2qEIVuAMUtyPtqP1DL7reCjq2-eDgeNzfd0kqEZO-F0_ujYPUWdqxfmCsHyFWWB2Lk0hA=s1360-w1360-h1020-rw",
        photoLicense: "Google Maps",
        resources: [
            { name: "Dining Options", description: "Additional food vendors" },
            { name: "Meeting Rooms", description: "Student organization spaces" },
            { name: "Lounge Areas", description: "Social gathering spaces" }
        ],
        landmarks: [
            "UIC Student Recreation Facility (SRF) - Recreation center, 3 min walk (East)",
            "UIC Pavilion - Sports arena, 2 min walk (North)",
            "Medical District Blue Line - 7 min walk (West)"
        ],
        features: [
            "Similar architecture to SCE",
            "SCW signage on building",
            "Multiple entrances",
            "Connected to campus via skybridge"
        ],
        tips: "SCW complements SCE and has similar modern architecture with clear signage."
    },
    SELE: {
        name: "Science & Engineering Laboratories (SEL)",
        fullName: "Science & Engineering Laboratories",
        abbreviation: "SELE",
        categories: ["academic"],
        address: "845 W Taylor Street, Chicago, IL 60607",
        coordinates: { lat: 41.869685, lng: -87.650075 },
        description: "SEL provides specialized laboratory spaces for undergraduate and graduate students in science and engineering programs.",
        photo: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzD3eht-wpqpKadWvFnB_hR3yh8g2L3IqSCVHOvXm24kK9kLPxppuRH7u315Btw1KTbhh8mMsirAJc0dA1AtZ0i_IdVMMzXayszLP_CoBoDKLIJKl0FICuEQPPD3-vSL3AJ-t37=s1360-w1360-h1020-rw",
        photoCredit: "Abdul Rahman via Google Maps",
        photoCreditUrl: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzD3eht-wpqpKadWvFnB_hR3yh8g2L3IqSCVHOvXm24kK9kLPxppuRH7u315Btw1KTbhh8mMsirAJc0dA1AtZ0i_IdVMMzXayszLP_CoBoDKLIJKl0FICuEQPPD3-vSL3AJ-t37=s1360-w1360-h1020-rw",
        photoLicense: "Google Maps",
        resources: [
            { name: "Teaching Labs", description: "Undergraduate lab courses" },
            { name: "Equipment Checkout", description: "Lab equipment and supplies" },
            { name: "Safety Training", description: "Lab safety certifications" }
        ],
        landmarks: [
            "SES - Adjacent building (East)",
            "ERF - Engineering Research, 2 min walk (South)",
            "Taylor Street - Main thoroughfare"
        ],
        features: [
            "Laboratory building design",
            "SELE or SEL signage",
            "Safety equipment visible",
            "Multiple ventilation systems"
        ],
        tips: "SEL is recognizable by its laboratory-specific architecture and safety features."
    },
    CASA: {
        name: "College of Architecture, Design and the Arts (CADA)",
        fullName: "College of Architecture, Design and the Arts",
        abbreviation: "CASA",
        categories: ["academic"],
        address: "845 W Harrison Street, Chicago, IL 60607",
        coordinates: { lat: 41.873585, lng: -87.648805 },
        description: "CADA houses studios, workshops, and galleries for architecture, graphic design, industrial design, and art students.",
        photo: "https://cada.uic.edu/wp-content/uploads/2019/10/UIC-Year-End-Show_Events.jpg",
        photoCredit: "artistmac via Wikimedia Commons",
        photoCreditUrl: "https://cada.uic.edu/wp-content/uploads/2019/10/UIC-Year-End-Show_Events.jpg",
        photoLicense: "CC BY-SA 2.0",
        resources: [
            { name: "Design Studios", description: "24/7 studio access for students" },
            { name: "Fabrication Lab", description: "Wood shop, metal shop, 3D printing" },
            { name: "Gallery 400", description: "Contemporary art exhibitions" },
            { name: "Print Shop", description: "Large format printing services" }
        ],
        landmarks: [
            "BSB - Behavioral Sciences, 3 min walk (South)",
            "Roosevelt Road - Major street (North)",
            "Halsted Street - 2 min walk (East)"
        ],
        features: [
            "Creative, artistic building design",
            "Large windows for natural light",
            "Student artwork often displayed outside",
            "CADA or CASA signage"
        ],
        tips: "CADA has a distinctive creative atmosphere with visible studio spaces and artistic elements."
    }
};

// Question Sets with multiple difficulty levels
const questionSets = {
    easy: [
        {
            building: "SCE",
            correctAnswer: "SCE",
            options: ["SCE", "SRF", "BSB", "LIB"],
            difficulty: "easy",
            hint: "Look for the modern glass entrance and 'SCE' abbreviation on the building signage."
        },
        {
            building: "SRF",
            correctAnswer: "SRF",
            options: ["SRF", "SCE", "SES", "UH"],
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
            options: ["SES", "SRF", "SCE", "LIB"],
            difficulty: "easy",
            hint: "Modern science building with glass and steel construction."
        },
        {
            building: "ERF",
            correctAnswer: "ERF",
            options: ["ERF", "SES", "SELE", "BSB"],
            difficulty: "easy",
            hint: "Modern engineering research facility with visible lab equipment."
        },
        {
            building: "SCW",
            correctAnswer: "SCW",
            options: ["SCW", "SCE", "UH", "SRF"],
            difficulty: "easy",
            hint: "Student center with dining and meeting spaces, similar to SCE."
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
            options: ["SCE", "SES", "SRF", "UH"],
            difficulty: "medium",
            hint: "Central student hub with dining and services."
        },
        {
            building: "SRF",
            correctAnswer: "SRF",
            options: ["SRF", "SES", "SCE", "LCA"],
            difficulty: "medium",
            hint: "Recreation facility with fitness center and pool."
        },
        {
            building: "SELE",
            correctAnswer: "SELE",
            options: ["SELE", "SES", "ERF", "BSB"],
            difficulty: "medium",
            hint: "Laboratory building with specialized teaching spaces."
        },
        {
            building: "CASA",
            correctAnswer: "CASA",
            options: ["CASA", "LCA", "BSB", "TH"],
            difficulty: "medium",
            hint: "Creative arts building with studios and workshops."
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
            options: ["SES", "SRF", "BSB", "LIB"],
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
        },
        {
            building: "ERF",
            correctAnswer: "ERF",
            options: ["ERF", "SELE", "SES", "LCA"],
            difficulty: "hard",
            hint: "Advanced research facility with clean rooms."
        },
        {
            building: "SCW",
            correctAnswer: "SCW",
            options: ["SCW", "SCE", "SRF", "UH"],
            difficulty: "hard",
            hint: "West campus student center connected by skybridge."
        }
    ]
};

// All Campus Resources - Comprehensive UIC Guide
const allResources = [
    // Academic Support & Success
    {
        category: "Academic Support",
        name: "UIC Writing Center",
        description: "Free one-on-one consultations for writing at any stage. Trained peer tutors help with brainstorming, drafting, revising, and editing.",
        location: "Grant Hall 105",
        hours: "Mon-Thu: 10am-7pm, Fri: 10am-4pm",
        contact: "(312) 413-2206",
        website: "writingcenter.uic.edu",
        icon: "✍️",
        services: ["Essay help", "Research papers", "Graduate writing", "ESL support"]
    },
    {
        category: "Academic Support",
        name: "Learning Sciences Research Institute (LSRI)",
        description: "Free tutoring for STEM courses including math, chemistry, physics, and biology. Drop-in and by appointment.",
        location: "Grant Hall 1600",
        hours: "Mon-Thu: 9am-5pm, Fri: 9am-4pm",
        contact: "(312) 355-0068",
        icon: "🧮",
        services: ["Math tutoring", "Science help", "Study groups", "SI sessions"]
    },
    {
        category: "Academic Support",
        name: "Richard J. Daley Library",
        description: "Main research library with over 3 million volumes. Librarians offer research consultations, citation help, and database training.",
        location: "801 S Morgan St",
        hours: "Mon-Thu: 7:30am-11pm, Fri: 7:30am-6pm, Sat-Sun: 10am-6pm",
        contact: "(312) 996-2716",
        website: "https://library.uic.edu/libraries/daley-library/",
        icon: "📚",
        services: ["Research help", "Study rooms", "Computer labs", "Special collections", "24/7 online chat"]
    },
    {
        category: "Academic Support",
        name: "UIC Academic Center for Excellence (ACE)",
        description: "Academic coaching, workshops on study skills, time management, test anxiety, and learning strategies. Peer mentoring available.",
        location: "Student Center East 2095",
        hours: "Mon-Fri: 9am-5pm",
        contact: "(312) 413-0031",
        website: "https://ace.uic.edu/",
        icon: "🎯",
        services: ["Academic coaching", "Workshops", "Peer mentoring", "Learning strategies"]
    },
    // Health & Wellness
    {
        category: "Health & Wellness",
        name: "UIC Counseling Center",
        description: "Confidential mental health services including individual counseling, group therapy, crisis intervention, and psychiatric services. All services are free for UIC students.",
        location: "Student Services Building 2010",
        hours: "Mon-Fri: 8:30am-5pm, Crisis services 24/7",
        contact: "(312) 996-3490",
        website: "https://counseling.uic.edu/",
        icon: "🧠",
        services: ["Individual therapy", "Group counseling", "Crisis support", "Psychiatric care", "Workshops"]
    },
    {
        category: "Health & Wellness",
        name: "UIC Student Recreation Facility (SRF)",
        description: "85,000 sq ft fitness facility with cardio equipment, free weights, basketball courts, indoor track, climbing wall, and Olympic-size pool. Group fitness classes included with membership.",
        location: "UIC Student Recreation Facility",
        hours: "Mon-Thu: 6am-midnight, Fri: 6am-10pm, Sat-Sun: 10am-10pm",
        contact: "(312) 413-5150",
        website: "https://recreation.uic.edu/",
        icon: "💪",
        services: ["Gym access", "Pool", "Group fitness", "Intramural sports", "Personal training", "Climbing wall"]
    },
    {
        category: "Health & Wellness",
        name: "Student Health Service (Wellness Center)",
        description: "Primary medical care, immunizations, women's health, travel clinic, lab services, and pharmacy. Most services covered by student health fee.",
        location: "Student Services Building",
        hours: "Mon-Fri: 8am-5pm",
        contact: "(312) 996-3420",
        icon: "🏥",
        services: ["Primary care", "Immunizations", "Lab work", "Pharmacy", "Women's health", "Travel clinic"]
    },
    {
        category: "Health & Wellness",
        name: "Disability Resource Center (DRC)",
        description: "Academic accommodations, assistive technology, sign language interpreters, note-taking services, and accessibility support for students with disabilities.",
        location: "Student Services Building 1190",
        hours: "Mon-Fri: 8:30am-5pm",
        contact: "(312) 413-2183",
        website: "https://drc.uic.edu/",
        icon: "♿",
        services: ["Accommodations", "Assistive tech", "Testing support", "Note-taking", "Sign language"]
    },
    {
        category: "Health & Wellness",
        name: "Campus Advocacy Network",
        description: "Free, confidential support for students affected by sexual misconduct, relationship violence, and stalking. Advocacy, resources, and safety planning.",
        location: "Student Services Building 3030",
        hours: "Mon-Fri: 8:30am-5pm",
        contact: "(312) 413-1025",
        website: "https://wlrc.uic.edu/programs/campus-advocacy-network/",
        icon: "🛡️",
        services: ["Advocacy", "Safety planning", "Resource connection", "Support groups"]
    },
    // Student Services & Administration
    {
        category: "Student Services",
        name: "Office of the Registrar",
        description: "Course registration, enrollment verification, transcripts, degree audits, and academic records. Online services available through my.UIC.edu portal.",
        location: "Student Services Building 1200",
        hours: "Mon-Fri: 8:30am-5pm",
        contact: "(312) 996-4350",
        website: "https://registrar.uic.edu/",
        icon: "📋",
        services: ["Registration", "Transcripts", "Degree audits", "Enrollment verification", "Grade changes"]
    },
    {
        category: "Student Services",
        name: "Office of Student Financial Aid",
        description: "FAFSA assistance, scholarships, grants, loans, work-study programs, and financial literacy. Free financial counseling available.",
        location: "Student Services Building 1700",
        hours: "Mon-Fri: 8:30am-5pm",
        contact: "(312) 996-3126",
        website: "https://financialaid.uic.edu/",
        icon: "💰",
        services: ["FAFSA help", "Scholarships", "Loans", "Work-study", "Financial counseling"]
    },
    {
        category: "Student Services",
        name: "Career Services",
        description: "Career counseling, resume/cover letter review, mock interviews, job/internship search, employer connections, and career fairs. Handshake platform access.",
        location: "Student Services Building 3050",
        hours: "Mon-Fri: 8:30am-5pm",
        contact: "(312) 996-2300",
        website: "https://careerservices.uic.edu/",
        icon: "💼",
        services: ["Career counseling", "Resume help", "Mock interviews", "Job search", "Internships", "Career fairs"]
    },
    {
        category: "Student Services",
        name: "Office of Admissions",
        description: "Information for prospective undergraduate students, campus tours, application support, and new student orientation programs.",
        location: "Student Services Building 1100",
        hours: "Mon-Fri: 8:30am-5pm",
        contact: "(312) 996-4350",
        icon: "🎓",
        services: ["Campus tours", "Application help", "Transfer credit", "Orientation"]
    },
    {
        category: "Student Services",
        name: "Office of International Services",
        description: "Immigration advising for F-1 and J-1 students/scholars, visa support, cultural adjustment programs, and international student orientation.",
        location: "Student Services Building 3020",
        hours: "Mon-Fri: 8:30am-5pm",
        contact: "(312) 996-3121",
        website: "https://ois.uic.edu/",
        icon: "🌍",
        services: ["Visa support", "Immigration advising", "Cultural programs", "Orientation", "Work authorization"]
    },
    // Dining & Social Spaces
    {
        category: "Dining & Social",
        name: "Student Center East Food Court",
        description: "Multiple dining options including Chick-fil-A, Panda Express, Starbucks, Subway, and more. Meal plans and Flame Dollars accepted.",
        location: "Student Center East, Lower Level",
        hours: "Mon-Fri: 7am-8pm, Sat-Sun: 10am-6pm (varies by vendor)",
        website: "https://dining.uic.edu/",
        icon: "🍔",
        services: ["Fast food", "Coffee", "Meal plans", "Grab & go", "Halal options"]
    },
    {
        category: "Dining & Social",
        name: "Cafe Belevedere (Library)",
        description: "Coffee, sandwiches, snacks, and study-friendly atmosphere inside the library. Great for study breaks.",
        location: "Richard J. Daley Library, Ground Floor",
        hours: "Mon-Thu: 8am-8pm, Fri: 8am-6pm, Sat-Sun: 12pm-5pm",
        icon: "☕",
        services: ["Coffee", "Sandwiches", "Snacks", "Study space"]
    },
    {
        category: "Dining & Social",
        name: "Student Center West Food Options",
        description: "Additional dining with Einstein Bros Bagels, salad bar, and various meal options. Quieter alternative to SCE.",
        location: "Student Center West",
        hours: "Mon-Fri: 7:30am-7pm",
        website: "https://dining.uic.edu/",
        icon: "🥗",
        services: ["Bagels", "Salads", "Hot meals", "Vegetarian options"]
    },
    {
        category: "Dining & Social",
        name: "Center for Student Involvement",
        description: "350+ student organizations, event planning support, leadership programs, and student government. Get involved in campus life!",
        location: "Student Center East 3144",
        hours: "Mon-Fri: 8:30am-5pm",
        contact: "(312) 996-2585",
        website: "https://involvement.uic.edu/",
        icon: "🎉",
        services: ["Student orgs", "Event planning", "Leadership programs", "Meeting rooms"]
    },
    // Technology & Innovation
    {
        category: "Technology",
        name: "Technology Solutions Computer Labs",
        description: "Free computer access with Microsoft Office, Adobe Creative Suite, statistical software, and specialized programs. Printing available.",
        location: "Multiple locations (LIB, SCE, UH, BSB)",
        hours: "Varies by location, some 24/7 in Library",
        contact: "(312) 413-0003",
        website: "https://it.uic.edu/",
        icon: "💻",
        services: ["Free computing", "Software", "Printing", "Scanning", "24/7 access"]
    },
    {
        category: "Technology",
        name: "ACCC Help Desk",
        description: "Technical support for UIC accounts, wifi, email, software, and IT issues. Walk-in and remote support available.",
        location: "Library 120",
        hours: "Mon-Fri: 8am-5pm, 24/7 phone support",
        contact: "(312) 413-0003",
        website: "https://it.uic.edu/support/",
        icon: "🖥️",
        services: ["Account help", "Password resets", "Software support", "Wifi troubleshooting"]
    },
    {
        category: "Technology",
        name: "Innovation Center & Maker Space",
        description: "3D printing, laser cutting, electronics prototyping, sewing machines, and design software. Training workshops offered regularly.",
        location: "Addams Hall (west campus)",
        hours: "Mon-Fri: 10am-6pm",
        icon: "🔧",
        services: ["3D printing", "Laser cutting", "Prototyping", "Workshops", "Design software"]
    },
    // Safety & Transportation
    {
        category: "Safety & Transportation",
        name: "UIC Police Department",
        description: "24/7 campus police, emergency response, safety escorts, crime prevention programs, and emergency blue light phones across campus.",
        location: "1140 S Paulina St",
        hours: "24/7",
        contact: "Emergency: (312) 355-5555, Non-emergency: (312) 996-2830",
        website: "https://police.uic.edu/",
        icon: "👮",
        services: ["24/7 patrol", "Safety escorts", "Emergency response", "Crime prevention", "Blue lights"]
    },
    {
        category: "Safety & Transportation",
        name: "UIC Night Ride",
        description: "Free evening shuttle service within campus boundaries for student safety. Track shuttles in real-time via app.",
        location: "Campus-wide service",
        hours: "Mon-Thu: 6pm-2am, Fri: 6pm-4am, Sat-Sun: 6pm-2am",
        contact: "(312) 355-7433",
        website: "https://transportation.uic.edu/",
        icon: "🚐",
        services: ["Free shuttles", "Real-time tracking", "Safe transport", "Campus routes"]
    },
    {
        category: "Safety & Transportation",
        name: "Parking & Transportation",
        description: "Parking permits, garages, CTA U-Pass program (free unlimited CTA rides), bike racks, and Divvy bike share.",
        location: "Parking Office: 1200 W Harrison St",
        hours: "Mon-Fri: 8am-5pm",
        contact: "(312) 996-7275",
        website: "https://parking.uic.edu/",
        icon: "🅿️",
        services: ["Parking permits", "U-Pass", "CTA access", "Bike parking", "Divvy stations"]
    },
    // Cultural Centers
    {
        category: "Cultural & Community",
        name: "Centers for Cultural Understanding & Social Change",
        description: "Seven identity-based centers providing community, cultural programs, mentorship, and safe spaces. Includes African American, Asian American, Latino, LGBTQ+, and more.",
        location: "Various locations (SCE, UH)",
        hours: "Mon-Fri: 9am-5pm (varies by center)",
        contact: "(312) 355-2727",
        website: "https://diversity.uic.edu/centers/",
        icon: "🌈",
        services: ["Cultural programs", "Mentorship", "Safe spaces", "Community events", "Identity support"]
    },
    {
        category: "Cultural & Community",
        name: "Jane Addams Hull-House Museum",
        description: "National Historic Landmark and museum on UIC campus. Free admission. Exhibitions on social justice, immigration, and Chicago history.",
        location: "800 S Halsted St",
        hours: "Tue-Fri: 10am-4pm, Sun: 12pm-4pm",
        contact: "(312) 413-5353",
        icon: "🏛️",
        services: ["Free museum", "Exhibitions", "Tours", "Events", "Historical site"]
    },
    {
        category: "Cultural & Community",
        name: "Gallery 400",
        description: "Contemporary art exhibitions and programs. Free and open to the public. Features emerging and established artists.",
        location: "400 S Peoria St",
        hours: "Tue-Fri: 10am-6pm, Sat: 12pm-6pm",
        contact: "(312) 996-6114",
        website: "https://gallery400.uic.edu/",
        icon: "🎨",
        services: ["Art exhibitions", "Artist talks", "Free admission", "Contemporary art"]
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

