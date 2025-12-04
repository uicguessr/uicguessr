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
        photo: "https://pspm.uic.edu/wp-content/uploads/sites/874/2023/05/LCA-01.jpg",
        photoCredit: "UIC",
        photoCreditUrl: "",
        photoLicense: "",
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
        photo: "https://chicagobikeadventures.com/wp-content/uploads/2019/04/IMG_0858-2.jpg",
        photoCredit: "Chicago Bike Adventures",
        photoCreditUrl: "",
        photoLicense: "CC BY-SA 2.0",
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
    CADA: {
        name: "College of Architecture, Design and the Arts (CADA)",
        fullName: "College of Architecture, Design and the Arts",
        abbreviation: "CADA",
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
            "CADA signage"
        ],
        tips: "CADA has a distinctive creative atmosphere with visible studio spaces and artistic elements."
    },
    ARC: {
        name: "Academic & Residential Complex (ARC)",
        fullName: "Academic & Residential Complex",
        abbreviation: "ARC",
        categories: ["academic", "residence"],
        address: "940 W Harrison Street, Chicago, IL 60607",
        coordinates: { lat: 41.8746969, lng: -87.650147 },
        description: "Mixed-use complex combining classrooms with a residence hall; a major east campus landmark.",
        photo: "https://housing.uic.edu/wp-content/uploads/sites/23/2019/08/20190718-ARC-OpenHouse-01-1090x541.jpg",
        photoCredit: "UIC",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Near Harrison/Morgan",
            "Close to Lecture Center complex"
        ],
        features: [
            "Modern glass-and-brick facade",
            "Dual-purpose academic and housing facility"
        ],
        tips: "Look for the tower residence next to classroom floors."
    },
    SSB: {
        name: "Student Services Building (SSB)",
        fullName: "Student Services Building",
        abbreviation: "SSB",
        categories: ["services"],
        address: "1200 W Harrison Street, Chicago, IL 60607",
        coordinates: { lat: 41.874961, lng: -87.658113 },
        description: "Centralized location for admissions, registrar, financial aid, and other student-facing services.",
        photo: "https://studentcenters.uic.edu/wp-content/uploads/sites/159/2020/12/32b_BiWeekly_Vol9_13-1090x613.jpg",
        photoCredit: "UIC",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Near University Hall",
            "Short walk from Daley Library"
        ],
        features: [
            "Administrative offices",
            "Service counters and waiting areas"
        ],
        tips: "Look for signage for Admissions and Financial Aid."
    },
    GH: {
        name: "Grant Hall (GH)",
        fullName: "Grant Hall",
        abbreviation: "GH",
        categories: ["academic"],
        address: "703 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.8728496, lng: -87.6494706 },
        description: "Classic academic building featuring classrooms and faculty offices.",
        photo: "https://lclc.uic.edu/wp-content/uploads/sites/408/2025/02/Grant-Hall-Exterior-1000x464-1.jpg",
        photoCredit: "UIC",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Adjacent to Taft Hall",
            "Near the central quad"
        ],
        features: [
            "Traditional brick exterior",
            "Multiple classroom levels"
        ],
        tips: "Often paired with Burnham and Taft halls in the same cluster."
    },
    BH: {
        name: "Burnham Hall (BH)",
        fullName: "Burnham Hall",
        abbreviation: "BH",
        categories: ["academic"],
        address: "828 S Halsted Street, Chicago, IL 60607",
        coordinates: { lat: 41.8707534, lng: -87.6470896 },
        description: "Academic building with classrooms and study spaces close to the lecture centers.",
        photo: "https://files.blogs.illinois.edu/files/1516/911191049/205495.jpg",
        photoCredit: "UIC",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Near Taft and Grant Halls",
            "Close to Lecture Centers"
        ],
        features: [
            "Brick facade",
            "Prominent entryway signage"
        ],
        tips: "Look for BH lettering near the entrances."
    },
    SEO: {
        name: "Science & Engineering Offices (SEO)",
        fullName: "Science & Engineering Offices",
        abbreviation: "SEO",
        categories: ["academic"],
        address: "851 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.8707566, lng: -87.6510408 },
        description: "Office and classroom building serving multiple science and engineering departments.",
        photo: "https://ece.uic.edu/wp-content/uploads/sites/351/2019/03/UndergraduateAdmissionsThe-College-600x397.jpg",
        photoCredit: "UIC",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Near SES and SEL",
            "Close to Taylor Street"
        ],
        features: [
            "Office-heavy layout",
            "Mid-century concrete design"
        ],
        tips: "Commonly used for upper-level STEM courses and faculty offices."
    },
    EIB: {
        name: "Engineering Innovation Building (EIB)",
        fullName: "Engineering Innovation Building",
        abbreviation: "EIB",
        categories: ["academic"],
        address: "945 W Taylor Street, Chicago, IL 60607",
        coordinates: { lat: 41.8696808, lng: -87.6497674 },
        description: "Modern engineering hub with advanced research and maker spaces.",
        photo: "https://engineering.uic.edu/wp-content/uploads/sites/217/2020/06/EIB-overhead-MISC_JY_8761.jpg",
        photoCredit: "UIC",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Near ERF and SES",
            "Along Taylor corridor"
        ],
        features: [
            "Contemporary glass-and-metal architecture",
            "Innovation labs and collaboration areas"
        ],
        tips: "Look for modern angular design elements."
    },
    LCB: {
        name: "Lecture Center B (LCB)",
        fullName: "Lecture Center B",
        abbreviation: "LCB",
        categories: ["academic"],
        address: "803 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.8720562, lng: -87.6493186 },
        description: "Part of the lecture center complex with large auditorium-style classrooms.",
        photo: "https://pspm.uic.edu/wp-content/uploads/sites/874/2023/05/LCB-1.jpg",
        photoCredit: "UIC",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Adjacent to other Lecture Centers",
            "Near Daley Library"
        ],
        features: [
            "Large lecture halls",
            "Interconnected walkways"
        ],
        tips: "Follow signage for Lecture Centers when near the Library."
    },
    LCC: {
        name: "Lecture Center C (LCC)",
        fullName: "Lecture Center C",
        abbreviation: "LCC",
        categories: ["academic"],
        address: "802 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.8721284, lng: -87.6487003 },
        description: "Lecture hall building with medium to large classrooms.",
        photo: "https://pspm.uic.edu/wp-content/uploads/sites/874/2023/05/LC-C1.jpg",
        photoCredit: "UIC",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Part of the LC complex",
            "Close to SCE and LIB"
        ],
        features: [
            "Concrete exterior",
            "Shared courtyards"
        ],
        tips: "Check room schedules posted near entrances."
    },
    LCD: {
        name: "Lecture Center D (LCD)",
        fullName: "Lecture Center D",
        abbreviation: "LCD",
        categories: ["academic"],
        address: "804 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.8717064, lng: -87.6486249 },
        description: "Lecture center with interconnected hallways and signage leading to auditoriums.",
        photo: "https://pspm.uic.edu/wp-content/uploads/sites/874/2023/05/LCD-1.jpg",
        photoCredit: "UIC",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Adjacent to LCA",
            "Connected to the LC network"
        ],
        features: [
            "Multiple auditoriums",
            "Wayfinding signage"
        ],
        tips: "Auditorium rooms are often labeled with LC prefixes."
    },
    LCE: {
        name: "Lecture Center E (LCE)",
        fullName: "Lecture Center E",
        abbreviation: "LCE",
        categories: ["academic"],
        address: "806 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.8716314, lng: -87.6492017 },
        description: "Lecture center serving a variety of general education courses.",
        photo: "https://pspm.uic.edu/wp-content/uploads/sites/874/2023/05/LCE-1.jpg",
        photoCredit: "UIC",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Near the other Lecture Centers",
            "Close to Quad paths"
        ],
        features: [
            "Auditorium seating",
            "Interior corridors connecting to other LCs"
        ],
        tips: "Arrive early to find the correct auditorium in the LC complex."
    },
    LCF: {
        name: "Lecture Center F (LCF)",
        fullName: "Lecture Center F",
        abbreviation: "LCF",
        categories: ["academic"],
        address: "807 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.8717287, lng: -87.6498168 },
        description: "Lecture center serving a variety of general education courses.",
        photo: "https://pspm.uic.edu/wp-content/uploads/sites/874/2023/05/LCF-1.jpg",
        photoCredit: "UIC",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Near the other Lecture Centers",
            "Close to Quad paths"
        ],
        features: [
            "Auditorium seating",
            "Interior corridors connecting to other LCs"
        ],
        tips: "Arrive early to find the correct auditorium in the LC complex."
    },
    AH: {
        name: "Addams Hall (AH)",
        fullName: "Addams Hall",
        abbreviation: "AH",
        categories: ["academic"],
        address: "830 S Halsted Street, Chicago, IL 60607",
        coordinates: { lat: 41.8709474, lng: -87.649184 },
        description: "Hands-on innovation and maker-oriented facility supporting student projects and studios.",
        photo: "https://scontent-ord5-2.cdninstagram.com/v/t51.29350-15/457733356_8234712796609094_5900289591931886548_n.jpg?se=-1&stp=dst-jpegr_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTgwMC5oZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGSzlrhzYYUGkxgECFmFTlJNWVeHhndWhnD9zNYa7ND1rjFoxe4QhIYJGWVnVPQUh8&_nc_ohc=SBUapwqkSoAQ7kNvwEbJhqL&_nc_gid=iOQ1w6U5m08eVMQ1wLNUyw&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzQ0NTYxMTg1Mjc3MDI5NTQ3Mw%3D%3D.3-ccb7-5&oh=00_AfnL7hBkDRHWZOe4ynHJPJ5b0eMUpBXzEQ5RznudUqY3aA&oe=6937308D&_nc_sid=10d13b",
        photoCredit: "awtpoetrychicago via Instagram",
        photoCreditUrl: "https://www.instagram.com/p/C_RRbtDvGGK/?img_index=1",
        photoLicense: "",
        resources: [],
        landmarks: [
            "West side of campus",
            "Near ERF/EIB corridor"
        ],
        features: [
            "Studios and workshops",
            "Open collaboration areas"
        ],
        tips: "Look for signage for innovation or maker spaces."
    },
    PAV: {
        name: "Credit Union 1 Arena (Pavilion)",
        fullName: "Credit Union 1 Arena",
        abbreviation: "PAV",
        categories: ["recreation", "events"],
        address: "525 S Racine Avenue, Chicago, IL 60607",
        coordinates: { lat: 41.87472, lng: -87.65611 },
        description: "Large multi-purpose arena hosting athletics, concerts, and large events.",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/UIC_pavilion_%28Chicago%2C_USA%29.JPG/1600px-UIC_pavilion_%28Chicago%2C_USA%29.JPG?20220422021012",
        photoCredit: "Hied5 via Wikimedia Commons",
        photoCreditUrl: "https://commons.wikimedia.org/wiki/File:UIC_pavilion_%28Chicago%2C_USA%29.JPG",
        photoLicense: "Wikimedia Commons",
        resources: [],
        landmarks: [
            "Near SRF",
            "Prominent event venue on campus"
        ],
        features: [
            "Arena bowl with exterior signage",
            "Event entrances and ticketing windows"
        ],
        tips: "Often referred to as the Pavilion by students and staff."
    },
    AHSB: {
        name: "Applied Health Sciences Building (AHSB)",
        fullName: "Applied Health Sciences Building",
        abbreviation: "AHSB",
        categories: ["academic"],
        address: "1919 W Taylor Street, Chicago, IL 60612",
        coordinates: { lat: 41.86889, lng: -87.67411 },
        description: "Building serving programs in applied health sciences with classrooms and labs.",
        photo: "https://www.envdesigni.com/wp-content/uploads/2020/12/applied-health-sciences-800x533.jpg",
        photoCredit: "EnvDesign",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Medical District side of campus"
        ],
        features: [
            "Classrooms and program offices",
            "Discipline-specific labs"
        ],
        tips: "Check floor directories for lab wings."
    },
    SPH: {
        name: "School of Public Health (SPH)",
        fullName: "School of Public Health",
        abbreviation: "SPH",
        categories: ["academic"],
        address: "1601 W Taylor Street, Chicago, IL 60612",
        coordinates: { lat: 41.8687186, lng: -87.6678685 },
        description: "Academic facility for public health programs with classrooms, offices, and research spaces.",
        photo: "https://today.uic.edu/wp-content/uploads/2016/11/SPH.jpg",
        photoCredit: "UIC Today",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Medical District area",
            "Near other health sciences buildings"
        ],
        features: [
            "Academic offices and classrooms",
            "Research labs"
        ],
        tips: "Wayfinding signs indicate department suites."
    },
    PHARM: {
        name: "College of Pharmacy (PHARM)",
        fullName: "College of Pharmacy",
        abbreviation: "PHARM",
        categories: ["academic"],
        address: "833 S Wood Street, Chicago, IL 60612",
        coordinates: { lat: 41.870829, lng: -87.671468 },
        description: "Home to pharmacy education and research; includes teaching labs and lecture spaces.",
        photo: "https://uhp.pharmacy.uic.edu/wp-content/uploads/sites/474/2021/04/Untitled-design-1-e1619191634192-600x397.png",
        photoCredit: "UIC Pharmacy",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "West campus (Medical District)"
        ],
        features: [
            "Pharmacy teaching labs",
            "Specialized research spaces"
        ],
        tips: "Some areas may require special access due to lab safety."
    },
    COMRB: {
        name: "College of Medicine Research Building (COMRB)",
        fullName: "College of Medicine Research Building",
        abbreviation: "COMRB",
        categories: ["academic"],
        address: "909 S Wolcott Avenue, Chicago, IL 60612",
        coordinates: { lat: 41.871121, lng: -87.671079 },
        description: "Research building supporting College of Medicine programs and labs.",
        photo: "https://chicago.medicine.uic.edu/wp-content/uploads/2023/05/909-600x397.jpg",
        photoCredit: "UIC Medicine",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Within the Medical District",
            "Near CSB/CSN"
        ],
        features: [
            "Research lab floors",
            "Controlled access areas"
        ],
        tips: "Expect lab safety signage and restricted areas."
    },
    CSB: {
        name: "Clinical Sciences Building (CSB)",
        fullName: "Clinical Sciences Building",
        abbreviation: "CSB",
        categories: ["academic"],
        address: "840 S Wood Street, Chicago, IL 60612",
        coordinates: { lat: 41.870918, lng: -87.671492 },
        description: "Clinical sciences facility with classrooms, labs, and clinical education spaces.",
        photo: "https://chicago.medicine.uic.edu/wp-content/uploads/2023/06/920-600x397.jpg",
        photoCredit: "UIC Medicine",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Medical campus cluster",
            "Near COMRB and CSN"
        ],
        features: [
            "Clinical training spaces",
            "Lecture and seminar rooms"
        ],
        tips: "Follow floor directories to find clinic-oriented rooms."
    },
    CSN: {
        name: "Clinical Sciences North (CSN)",
        fullName: "Clinical Sciences North",
        abbreviation: "CSN",
        categories: ["academic"],
        address: "820 S Wood Street, Chicago, IL 60612",
        coordinates: { lat: 41.870773, lng: -87.672597 },
        description: "Companion building in the clinical sciences area supporting instruction and research.",
        photo: "https://chicago.medicine.uic.edu/wp-content/uploads/2023/06/911-600x397.jpg",
        photoCredit: "UIC Medicine",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: [
            "Medical campus cluster",
            "Adjacent to other CS buildings"
        ],
        features: [
            "Classrooms and labs",
            "Shared clinical resources"
        ],
        tips: "Look for CSN directional signage in the medical campus area."
    },
    // New Buildings Added
    DH: {
        name: "Douglas Hall (DH)",
        fullName: "Douglas Hall",
        abbreviation: "DH",
        categories: ["academic"],
        address: "705 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.873729, lng: -87.650117 },
        description: "Home to the College of Business Administration, featuring modern classrooms and student collaboration spaces.",
        photo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Douglas_Hall_%40_UiC.jpg",
        photoCredit: "Peter Alfred Hess, Wikimedia Commons",
        photoCreditUrl: "",
        photoLicense: "CC BY 2.0",
        resources: [
            { name: "Business Career Center", description: "Career services for business students" },
            { name: "Collaboration Spaces", description: "Group study rooms" }
        ],
        landmarks: ["Lincoln Hall", "University Hall", "Quad"],
        features: ["Modern glass renovation", "LEED Gold certified"],
        tips: "Connected to Lincoln Hall via skybridge."
    },
    LH: {
        name: "Lincoln Hall (LH)",
        fullName: "Lincoln Hall",
        abbreviation: "LH",
        categories: ["academic"],
        address: "707 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.873200, lng: -87.650200 },
        description: "Academic building housing classrooms and College of Liberal Arts and Sciences departments.",
        photo: "https://architizer-prod.imgix.net/mediadata/projects/412010/f3fdbf9a.jpg?w=1680&q=60&auto=format,compress&cs=strip",
        photoCredit: "Architizer",
        photoCreditUrl: "https://architizer.com/projects/lincoln-hall-renovation/",
        photoLicense: "CC BY-ND 4.0",
        resources: [],
        landmarks: ["Douglas Hall", "Quad", "University Hall"],
        features: ["Concrete brutalist style", "Skybridge to Douglas Hall"],
        tips: "Often confused with Douglas Hall; look for the 'LH' signs."
    },
    SH: {
        name: "Stevenson Hall (SH)",
        fullName: "Stevenson Hall",
        abbreviation: "SH",
        categories: ["academic"],
        address: "701 S Morgan Street, Chicago, IL 60607",
        coordinates: { lat: 41.872200, lng: -87.650200 },
        description: "Classroom and office building commonly used for humanities and social sciences.",
        photo: "https://img.p.mapq.st/?url=https://s3-media0.fl.yelpcdn.com/bphoto/Q3YONGwkUz-Vog2xJ-eFLQ/l.jpg?w=3840&q=75",
        photoCredit: "Yelp",
        photoCreditUrl: "",
        photoLicense: "Yelp",
        resources: [],
        landmarks: ["Lecture Centers", "Quad", "Library"],
        features: ["Long rectangular building", "Near the Quad"],
        tips: "Located on the edge of the central Quad."
    },
    JST: {
        name: "James Stukel Towers (JST)",
        fullName: "James Stukel Towers",
        abbreviation: "JST",
        categories: ["residence"],
        address: "718 W Rochford Street, Chicago, IL 60607",
        coordinates: { lat: 41.865200, lng: -87.647500 },
        description: "Modern residence hall complex on South Campus with dining and event spaces.",
        photo: "https://www.powerconstruction.net/sites/default/files/styles/featured_image_2_1/public/images/uic-stukel-towers-exterior-corner-view-multiple-buildings-ppl-no-2007.jpg?h=307f0b4a&itok=VhMRzHs-",
        photoCredit: "Power Construction",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [{ name: "JST Dining Hall", description: "Residential dining" }],
        landmarks: ["UIC Forum", "Halsted Street"],
        features: ["Four distinct towers", "Glass and brick exterior"],
        tips: "Located south of Roosevelt Road."
    },
    TBH: {
        name: "Thomas Beckham Hall (TBH)",
        fullName: "Thomas Beckham Hall",
        abbreviation: "TBH",
        categories: ["residence"],
        address: "1250 S Halsted Street, Chicago, IL 60607",
        coordinates: { lat: 41.865800, lng: -87.647000 },
        description: "Apartment-style residence hall on South Campus.",
        photo: "https://housing.uic.edu/wp-content/uploads/sites/23/2017/07/TBH-600x365.png",
        photoCredit: "UIC Housing",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: ["JST", "Marie Robinson Hall"],
        features: ["Apartment style living", "South Campus location"],
        tips: "Entrance faces Halsted Street."
    },
    MRH: {
        name: "Marie Robinson Hall (MRH)",
        fullName: "Marie Robinson Hall",
        abbreviation: "MRH",
        categories: ["residence"],
        address: "811 W Maxwell Street, Chicago, IL 60607",
        coordinates: { lat: 41.864500, lng: -87.648000 },
        description: "Residence hall offering apartment-style units on South Campus.",
        photo: "https://housing.uic.edu/wp-content/uploads/sites/23/2017/07/MRH-600x365.png",
        photoCredit: "UIC Housing",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: ["TBH", "Maxwell Street"],
        features: ["Modern apartment style", "Near Maxwell St"],
        tips: "Located near the historic Maxwell Street market area."
    },
    FORUM: {
        name: "UIC Forum",
        fullName: "UIC Forum",
        abbreviation: "FORUM",
        categories: ["events"],
        address: "725 W Roosevelt Road, Chicago, IL 60608",
        coordinates: { lat: 41.867500, lng: -87.648000 },
        description: "Large multi-purpose venue for conferences, concerts, and university events.",
        photo: "https://images.squarespace-cdn.com/content/v1/54f5dd47e4b099c7be642294/1549642172996-L0DF6LVQRWGP84UKKJ9E/_MG_0057.jpg?format=1500w",
        photoCredit: "Cardosi Kipen via Squarespace",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [{ name: "Event Spaces", description: "Large halls and meeting rooms" }],
        landmarks: ["JST", "Roosevelt Road"],
        features: ["Large glass facade", "Prominent location on Roosevelt"],
        tips: "Main entrance is on Roosevelt Road."
    },
    PEB: {
        name: "Physical Education Building (PEB)",
        fullName: "Physical Education Building",
        abbreviation: "PEB",
        categories: ["recreation", "academic"],
        address: "901 W Roosevelt Road, Chicago, IL 60608",
        coordinates: { lat: 41.867800, lng: -87.650500 },
        description: "Facility for Kinesiology programs and athletic training, featuring gyms and pools.",
        photo: "https://www.chicagobluedolphins.com/wp-content/uploads/2022/10/UIC-PEB-Front.jpg",
        photoCredit: "Chicago Blue Dolphins",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [{ name: "Gymnasiums", description: "Basketball and volleyball courts" }],
        landmarks: ["Flames Athletic Center", "Roosevelt Road"],
        features: ["Large brick building", "Athletic facilities"],
        tips: "Located west of the Forum."
    },
    FAC: {
        name: "Flames Athletic Center (FAC)",
        fullName: "Flames Athletic Center",
        abbreviation: "FAC",
        categories: ["recreation"],
        address: "839 W Roosevelt Road, Chicago, IL 60608",
        coordinates: { lat: 41.867200, lng: -87.649500 },
        description: "Training facility for UIC student-athletes and athletics administration.",
        photo: "https://media.timeout.com/images/100898939/image.jpg",
        photoCredit: "Timeout",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: ["PEB", "Tennis Courts"],
        features: ["Athletic training equipment", "Offices"],
        tips: "Primary facility for varsity athletes."
    },
    EEI: {
        name: "Illinois Eye and Ear Infirmary (EEI)",
        fullName: "Illinois Eye and Ear Infirmary",
        abbreviation: "EEI",
        categories: ["academic", "medical"],
        address: "1855 W Taylor Street, Chicago, IL 60612",
        coordinates: { lat: 41.869000, lng: -87.673000 },
        description: "Renowned medical center for ophthalmology and otolaryngology research and patient care.",
        photo: "https://s3-media0.fl.yelpcdn.com/bphoto/1VGHTi-i4odKK8aduTLAiQ/348s.jpg",
        photoCredit: "Yelp",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [{ name: "Eye Clinics", description: "Ophthalmology services" }],
        landmarks: ["UI Health", "West Campus"],
        features: ["Medical clinic design", "Busy patient entrance"],
        tips: "Located in the heart of the Illinois Medical District."
    },
    CMW: {
        name: "College of Medicine West (CMW)",
        fullName: "College of Medicine West",
        abbreviation: "CMW",
        categories: ["academic", "medical"],
        address: "1819 W Polk Street, Chicago, IL 60612",
        coordinates: { lat: 41.871500, lng: -87.672500 },
        description: "Historic building housing College of Medicine administrative offices and classrooms.",
        photo: "https://medicine.uic.edu/wp-content/uploads/sites/999/2023/02/chicago-600x397.jpg",
        photoCredit: "UIC Medicine",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [{ name: "Administrative Offices", description: "College of Medicine administration" }],
        landmarks: ["UI Hospital", "Polk Street"],
        features: ["Gothic revival architecture", "Historic landmark"],
        tips: "Look for the classic collegiate gothic style."
    },
    CMET: {
        name: "College of Medicine East Tower (CMET)",
        fullName: "College of Medicine East Tower",
        abbreviation: "CMET",
        categories: ["academic", "medical"],
        address: "808 S Wood Street, Chicago, IL 60612",
        coordinates: { lat: 41.870500, lng: -87.671500 },
        description: "Tower housing medical research labs and departmental offices.",
        photo: "https://today.uic.edu/wp-content/uploads/2021/07/060620_West-Campus_JC0088-590x393.jpg",
        photoCredit: "UIC Medicine",
        photoCreditUrl: "",
        photoLicense: "",
        resources: [],
        landmarks: ["Clinical Sciences North", "Wood Street"],
        features: ["High-rise tower", "Research facilities"],
        tips: "Connected to other medical buildings via tunnels/bridges."
    }
};

// Question Sets with multiple difficulty levels
const questionSets = {
    easy: [
        { building: "SCE", correctAnswer: "SCE", options: ["SCE", "SRF", "BSB", "LIB"], difficulty: "easy", hint: "Look for the modern glass entrance and 'SCE' abbreviation." },
        { building: "SRF", correctAnswer: "SRF", options: ["SRF", "SCE", "SES", "UH"], difficulty: "easy", hint: "Large athletic facility with modern architecture." },
        { building: "LIB", correctAnswer: "LIB", options: ["LIB", "BSB", "UH", "TH"], difficulty: "easy", hint: "Iconic brutalist concrete architecture." },
        { building: "BSB", correctAnswer: "BSB", options: ["BSB", "SES", "TH", "LCA"], difficulty: "easy", hint: "Traditional brick academic building." },
        { building: "SES", correctAnswer: "SES", options: ["SES", "SRF", "SCE", "LIB"], difficulty: "easy", hint: "Modern science building with glass and steel." },
        { building: "ERF", correctAnswer: "ERF", options: ["ERF", "SES", "SELE", "BSB"], difficulty: "easy", hint: "Modern engineering research facility." },
        { building: "SCW", correctAnswer: "SCW", options: ["SCW", "SCE", "UH", "SRF"], difficulty: "easy", hint: "Student center on West Campus." },
        { building: "JST", correctAnswer: "JST", options: ["JST", "TBH", "MRH", "ARC"], difficulty: "easy", hint: "Large residence tower complex on South Campus." },
        { building: "FORUM", correctAnswer: "FORUM", options: ["FORUM", "PAV", "SCE", "JST"], difficulty: "easy", hint: "Large event venue on Roosevelt Road." }
    ],
    medium: [
        { building: "UH", correctAnswer: "UH", options: ["UH", "LIB", "TH", "BSB"], difficulty: "medium", hint: "Tall administrative building." },
        { building: "TH", correctAnswer: "TH", options: ["TH", "BSB", "UH", "LCA"], difficulty: "medium", hint: "Classic brick academic building." },
        { building: "LCA", correctAnswer: "LCA", options: ["LCA", "LIB", "UH", "SCE"], difficulty: "medium", hint: "Large lecture hall building." },
        { building: "SELE", correctAnswer: "SELE", options: ["SELE", "SES", "ERF", "BSB"], difficulty: "medium", hint: "Laboratory building." },
        { building: "CADA", correctAnswer: "CADA", options: ["CADA", "LCA", "BSB", "TH"], difficulty: "medium", hint: "Creative arts building." },
        { building: "DH", correctAnswer: "DH", options: ["DH", "LH", "UH", "SH"], difficulty: "medium", hint: "Renovated business building with glass facade." },
        { building: "LH", correctAnswer: "LH", options: ["LH", "DH", "GH", "TH"], difficulty: "medium", hint: "Connected to Douglas Hall." },
        { building: "TBH", correctAnswer: "TBH", options: ["TBH", "MRH", "JST", "ARC"], difficulty: "medium", hint: "Apartment style residence on Halsted." },
        { building: "PEB", correctAnswer: "PEB", options: ["PEB", "FAC", "SRF", "PAV"], difficulty: "medium", hint: "Physical Education Building." }
    ],
    hard: [
        { building: "BSB", correctAnswer: "BSB", options: ["BSB", "TH", "UH", "LCA"], difficulty: "hard", hint: "Behavioral sciences building." },
        { building: "SES", correctAnswer: "SES", options: ["SES", "SRF", "BSB", "LIB"], difficulty: "hard", hint: "Engineering facility." },
        { building: "LIB", correctAnswer: "LIB", options: ["LIB", "UH", "LCA", "BSB"], difficulty: "hard", hint: "Brutalist landmark." },
        { building: "UH", correctAnswer: "UH", options: ["UH", "TH", "LIB", "SES"], difficulty: "hard", hint: "Administrative tower." },
        { building: "ERF", correctAnswer: "ERF", options: ["ERF", "SELE", "SES", "LCA"], difficulty: "hard", hint: "Advanced research facility." },
        { building: "SCW", correctAnswer: "SCW", options: ["SCW", "SCE", "SRF", "UH"], difficulty: "hard", hint: "West campus student center." },
        { building: "SH", correctAnswer: "SH", options: ["SH", "LH", "DH", "GH"], difficulty: "hard", hint: "Stevenson Hall." },
        { building: "MRH", correctAnswer: "MRH", options: ["MRH", "TBH", "JST", "ARC"], difficulty: "hard", hint: "Marie Robinson Hall." },
        { building: "FAC", correctAnswer: "FAC", options: ["FAC", "PEB", "SRF", "PAV"], difficulty: "hard", hint: "Flames Athletic Center." },
        { building: "EEI", correctAnswer: "EEI", options: ["EEI", "CMW", "PHARM", "SPH"], difficulty: "hard", hint: "Eye and Ear Infirmary." },
        { building: "CMW", correctAnswer: "CMW", options: ["CMW", "CMET", "COMRB", "CSB"], difficulty: "hard", hint: "College of Medicine West." }
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

// Persona Definitions - Targeted learning paths for different student types
const personaDefinitions = {
    freshman: {
        name: "Freshman",
        icon: "🎓",
        description: "New to UIC? Learn the essential buildings every freshman needs to know.",
        color: "#4CAF50",
        priorityBuildings: ["SCE", "SRF", "LIB", "UH", "LCA", "LCB", "LCC", "LCD", "LCE", "LCF", "SSB", "BSB", "GH", "TH", "SH", "LH"],
        focusAreas: ["Common lecture halls", "Student services", "Study spaces", "Dining"],
        recommendedRounds: 10,
        tips: [
            "Most freshman classes are in the Lecture Centers (LCA-LCF)",
            "Student Center East (SCE) is your go-to for food and study breaks",
            "The Library (LIB) has 24/7 study areas during finals",
            "Student Services Building (SSB) handles registration and financial aid"
        ]
    },
    transfer: {
        name: "Transfer Student",
        icon: "🔄",
        description: "Transferring to UIC? Focus on department buildings and upper-level facilities.",
        color: "#2196F3",
        priorityBuildings: ["SCE", "LIB", "UH", "SSB", "BSB", "SES", "ERF", "SELE", "EIB", "SEO", "GH", "TH", "CADA", "AH", "DH", "LH"],
        focusAreas: ["Department offices", "Research facilities", "Academic advising", "Career services"],
        recommendedRounds: 10,
        tips: [
            "Meet with your department advisor in your major's building",
            "Transfer credit questions go to SSB (Student Services Building)",
            "Join student organizations at SCE to meet people",
            "Career Services in SSB can help with internships"
        ]
    },
    commuter: {
        name: "Commuter Student",
        icon: "🚇",
        description: "Commuting to campus? Learn buildings near CTA stops and parking.",
        color: "#FF9800",
        priorityBuildings: ["SCE", "SRF", "LIB", "UH", "LCA", "SSB", "SCW", "PAV", "ARC", "ERF", "SES", "JST", "TBH", "FORUM", "PEB"],
        focusAreas: ["Near Blue Line (UIC-Halsted)", "Near parking garages", "Between-class spots", "Quick dining"],
        recommendedRounds: 10,
        nearCTA: ["SCE", "SRF", "LIB", "UH", "LCA", "BSB", "ERF", "SES", "SELE"],
        nearParking: ["SCW", "PAV", "AHSB", "SPH", "PHARM", "TBH", "FORUM"],
        tips: [
            "UIC-Halsted Blue Line is closest to East Campus",
            "Halsted Street Parking is near SCE and SRF",
            "SCE food court is quick between classes",
            "Library has lockers for commuter storage"
        ]
    },
    premed: {
        name: "Pre-Med / Health Sciences",
        icon: "🩺",
        description: "Health sciences student? Master the medical campus and science buildings.",
        color: "#E91E63",
        priorityBuildings: ["SES", "SELE", "BSB", "LIB", "SCW", "AHSB", "SPH", "PHARM", "COMRB", "CSB", "CSN", "EEI", "CMW", "CMET"],
        focusAreas: ["Science labs", "Medical campus", "Research facilities", "Study spaces"],
        recommendedRounds: 12,
        tips: [
            "Most pre-med classes are in SES and SELE",
            "Medical campus is west of main campus",
            "Student Health Services is in SSB",
            "MSLC tutoring for sciences is in SES"
        ]
    },
    engineering: {
        name: "Engineering Student",
        icon: "⚙️",
        description: "Engineering major? Learn the engineering quad and maker spaces.",
        color: "#795548",
        priorityBuildings: ["SES", "ERF", "SELE", "EIB", "SEO", "LIB", "SCE", "AH"],
        focusAreas: ["Engineering labs", "Maker spaces", "Computer labs", "Study areas"],
        recommendedRounds: 10,
        tips: [
            "Engineering Innovation Building (EIB) has the best maker space",
            "ERF has advanced research labs",
            "SES has the Math & Science Learning Center",
            "AH (Addams Hall) has 3D printers and prototyping"
        ]
    },
    artsHumanities: {
        name: "Arts & Humanities",
        icon: "🎨",
        description: "Creative major? Explore studios, galleries, and humanities buildings.",
        color: "#9C27B0",
        priorityBuildings: ["CADA", "LIB", "GH", "TH", "BH", "UH", "SCE", "AH", "SH", "LH"],
        focusAreas: ["Art studios", "Galleries", "Humanities classrooms", "Performance spaces"],
        recommendedRounds: 10,
        tips: [
            "CADA has 24/7 studio access",
            "Gallery 400 hosts rotating exhibitions",
            "Grant Hall has the Writing Center",
            "Theater performances are often in the lecture centers"
        ]
    }
};

// Major-based Deck Definitions
const majorDecks = {
    generalEducation: {
        name: "General Education",
        icon: "📚",
        description: "Core buildings for general education requirements",
        buildings: ["LCA", "LCB", "LCC", "LCD", "LCE", "LCF", "LIB", "BSB", "GH", "TH", "BH", "UH", "SH", "LH"],
        color: "#607D8B"
    },
    engineering: {
        name: "Engineering & CS",
        icon: "💻",
        description: "College of Engineering buildings",
        buildings: ["SES", "ERF", "SELE", "EIB", "SEO", "AH"],
        departments: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Bioengineering"],
        color: "#FF5722"
    },
    sciences: {
        name: "Sciences",
        icon: "🔬",
        description: "Natural and physical sciences buildings",
        buildings: ["SES", "SELE", "ERF", "BSB", "LIB", "SH"],
        departments: ["Biology", "Chemistry", "Physics", "Earth Sciences", "Mathematics"],
        color: "#4CAF50"
    },
    liberalArts: {
        name: "Liberal Arts & Social Sciences",
        icon: "📖",
        description: "Humanities and social sciences buildings",
        buildings: ["BSB", "GH", "TH", "BH", "UH", "LIB", "SH", "LH"],
        departments: ["Psychology", "Sociology", "History", "English", "Philosophy", "Political Science"],
        color: "#3F51B5"
    },
    healthSciences: {
        name: "Health Sciences",
        icon: "🏥",
        description: "Medical and health-related buildings",
        buildings: ["AHSB", "SPH", "PHARM", "COMRB", "CSB", "CSN", "SCW", "EEI", "CMW", "CMET"],
        departments: ["Nursing", "Public Health", "Pharmacy", "Medicine", "Kinesiology"],
        color: "#E91E63"
    },
    architecture: {
        name: "Architecture, Design & Arts",
        icon: "🏛️",
        description: "CADA buildings for creative majors",
        buildings: ["CADA", "AH", "GH"],
        departments: ["Architecture", "Graphic Design", "Industrial Design", "Art History", "Studio Arts"],
        color: "#9C27B0"
    },
    business: {
        name: "Business Administration",
        icon: "💼",
        description: "Business and economics buildings",
        buildings: ["UH", "LIB", "BSB", "GH", "TH", "DH"],
        departments: ["Accounting", "Finance", "Marketing", "Management", "Economics"],
        color: "#795548"
    },
    studentLife: {
        name: "Student Life & Services",
        icon: "🎉",
        description: "Essential student services and recreation",
        buildings: ["SCE", "SCW", "SRF", "SSB", "UH", "PAV", "ARC", "JST", "TBH", "MRH", "FORUM", "PEB", "FAC"],
        services: ["Dining", "Recreation", "Student Organizations", "Health Services", "Career Services"],
        color: "#00BCD4"
    }
};

// Enhanced Resource Context - Precise locations within buildings
const resourceLocations = {
    SCE: [
        { name: "Food Court", floor: "Lower Level", section: "Central Atrium", hours: "7am-8pm weekdays" },
        { name: "Wellness Center", floor: "2nd Floor", section: "East Wing", room: "Room 245" },
        { name: "Study Spaces", floor: "2nd & 3rd Floors", section: "Throughout building" },
        { name: "UIC Bookstore", floor: "Lower Level", section: "South Entrance" },
        { name: "Student Organization Offices", floor: "3rd Floor", section: "Suite 3100" },
        { name: "Computer Lab", floor: "2nd Floor", section: "Room 2050" }
    ],
    SRF: [
        { name: "Fitness Center", floor: "1st & 2nd Floors", section: "Main Gym Area" },
        { name: "Swimming Pool", floor: "1st Floor", section: "East Wing" },
        { name: "Basketball Courts", floor: "2nd Floor", section: "Gymnasium" },
        { name: "Climbing Wall", floor: "1st Floor", section: "South End" },
        { name: "Locker Rooms", floor: "1st Floor", section: "Near main entrance" },
        { name: "Group Fitness Studios", floor: "2nd Floor", section: "Studios A-D" }
    ],
    LIB: [
        { name: "IDEA Commons", floor: "1st Floor", section: "Main Entrance Area", hours: "24/7 during finals" },
        { name: "Research Help Desk", floor: "1st Floor", section: "Central Information Desk" },
        { name: "Group Study Rooms", floor: "2nd-5th Floors", section: "Reserve online" },
        { name: "Special Collections", floor: "3rd Floor", section: "East Wing" },
        { name: "Computer Lab", floor: "1st Floor", section: "Room 120" },
        { name: "Quiet Study", floor: "4th & 5th Floors", section: "Designated quiet zones" },
        { name: "Café Belvedere", floor: "Ground Floor", section: "Near south entrance" }
    ],
    SSB: [
        { name: "Registrar", floor: "1st Floor", section: "Room 1200" },
        { name: "Financial Aid", floor: "1st Floor", section: "Room 1700" },
        { name: "Admissions", floor: "1st Floor", section: "Room 1100" },
        { name: "Counseling Center", floor: "2nd Floor", section: "Room 2010" },
        { name: "Career Services", floor: "3rd Floor", section: "Room 3050" },
        { name: "Disability Resource Center", floor: "1st Floor", section: "Room 1190" },
        { name: "Student Health", floor: "Ground Floor", section: "West Wing" }
    ],
    UH: [
        { name: "Admissions Office", floor: "Ground Floor", section: "Main Lobby" },
        { name: "Academic Advising", floor: "Various by college", section: "Check directory" },
        { name: "Dean of Students", floor: "3rd Floor", section: "Suite 3030" },
        { name: "Computer Lab", floor: "Lower Level", section: "Room B01" }
    ],
    SES: [
        { name: "Math & Science Learning Center (MSLC)", floor: "2nd Floor", section: "Room 2100", hours: "Mon-Fri 9am-5pm" },
        { name: "Engineering Computer Labs", floor: "1st Floor", section: "Rooms 100-130" },
        { name: "Chemistry Labs", floor: "3rd Floor", section: "East Wing" },
        { name: "Physics Labs", floor: "2nd Floor", section: "West Wing" },
        { name: "Study Lounge", floor: "Ground Floor", section: "Near vending machines" }
    ],
    GH: [
        { name: "Writing Center", floor: "1st Floor", section: "Room 105", hours: "Mon-Thu 10am-7pm" },
        { name: "Classrooms", floor: "1st-4th Floors", section: "Various" },
        { name: "Faculty Offices", floor: "Upper Floors", section: "By department" }
    ],
    BSB: [
        { name: "Psychology Department", floor: "10th Floor", section: "Suite 1007" },
        { name: "Computer Labs", floor: "3rd Floor", section: "Room 305" },
        { name: "Study Lounges", floor: "Ground Floor", section: "Near east entrance" },
        { name: "Sociology Department", floor: "4th Floor", section: "Suite 4102" }
    ]
};

// Extended Question Pool for longer sessions
const extendedQuestionPool = [
    // Easy - Iconic/Essential Buildings
    { building: "SCE", difficulty: "easy", hint: "The main student center with food court and study spaces." },
    { building: "SRF", difficulty: "easy", hint: "The recreation facility with gym and pool." },
    { building: "LIB", difficulty: "easy", hint: "The iconic brutalist library building." },
    { building: "UH", difficulty: "easy", hint: "The tall administrative tower." },
    { building: "LCA", difficulty: "easy", hint: "One of the main lecture center buildings." },
    { building: "SSB", difficulty: "easy", hint: "Student services like registrar and financial aid." },
    { building: "SCW", difficulty: "easy", hint: "The west campus student center." },
    { building: "PAV", difficulty: "easy", hint: "The large arena for sports and events." },
    { building: "ARC", difficulty: "easy", hint: "Academic and Residential Complex." },
    
    // Medium - Academic Buildings
    { building: "BSB", difficulty: "medium", hint: "Behavioral sciences and psychology." },
    { building: "SES", difficulty: "medium", hint: "Science and engineering classrooms." },
    { building: "ERF", difficulty: "medium", hint: "Engineering research facility." },
    { building: "GH", difficulty: "medium", hint: "Grant Hall - humanities building." },
    { building: "TH", difficulty: "medium", hint: "Taft Hall - academic classrooms." },
    { building: "BH", difficulty: "medium", hint: "Burnham Hall near lecture centers." },
    { building: "LCB", difficulty: "medium", hint: "Part of the lecture center complex." },
    { building: "LCC", difficulty: "medium", hint: "Lecture Center C." },
    { building: "LCD", difficulty: "medium", hint: "Lecture Center D." },
    { building: "LCE", difficulty: "medium", hint: "Lecture Center E." },
    { building: "LCF", difficulty: "medium", hint: "Lecture Center F." },
    { building: "CADA", difficulty: "medium", hint: "College of Architecture and Arts." },
    { building: "SELE", difficulty: "medium", hint: "Science and Engineering Labs." },
    
    // Hard - Specialized/Less Common
    { building: "SEO", difficulty: "hard", hint: "Science and Engineering Offices." },
    { building: "EIB", difficulty: "hard", hint: "Engineering Innovation Building." },
    { building: "AH", difficulty: "hard", hint: "Addams Hall - maker spaces." },
    { building: "AHSB", difficulty: "hard", hint: "Applied Health Sciences Building." },
    { building: "SPH", difficulty: "hard", hint: "School of Public Health." },
    { building: "PHARM", difficulty: "hard", hint: "College of Pharmacy." },
    { building: "COMRB", difficulty: "hard", hint: "College of Medicine Research Building." },
    { building: "CSB", difficulty: "hard", hint: "Clinical Sciences Building." },
    { building: "CSN", difficulty: "hard", hint: "Clinical Sciences North." }
];

// Building tags for filtering
const buildingTags = {
    nearCTA: ["SCE", "SRF", "LIB", "UH", "LCA", "BSB", "ERF", "SES", "SELE", "GH", "TH"],
    nearParking: ["SCW", "PAV", "AHSB", "SPH", "PHARM", "COMRB"],
    lectureHalls: ["LCA", "LCB", "LCC", "LCD", "LCE", "LCF"],
    scienceBuildings: ["SES", "SELE", "ERF", "EIB", "BSB"],
    medicalCampus: ["AHSB", "SPH", "PHARM", "COMRB", "CSB", "CSN", "SCW"],
    studentServices: ["SCE", "SCW", "SSB", "UH", "SRF"],
    studySpaces: ["LIB", "SCE", "SCW", "SES", "BSB", "GH"],
    dining: ["SCE", "SCW", "LIB"],
    recreation: ["SRF", "PAV"],
    arts: ["CADA", "AH", "GH"],
    essential: ["SCE", "LIB", "UH", "SSB", "SRF", "LCA"]
};

// Round count options
const roundOptions = [5, 10, 15];

