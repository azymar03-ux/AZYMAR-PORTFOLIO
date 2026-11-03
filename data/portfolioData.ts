export type GameFilterCategory = "All" | "RPG" | "FPS" | "Mobile" | "VR";

export interface GameProject {
  id: string;
  title: string;
  subtitle: string;
  status: "Completed" | "Ongoing";
  statusLabel: string;
  categories: Exclude<GameFilterCategory, "All">[];
  tags: string[];
  platforms: string[];
  gradient: string;
  coverImage: string;
  gallery: { src: string; caption: string }[];
  summary: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  techUsed: string[];
  liveUrl?: string;
  has3DDoctorModel?: boolean;
}

export const FEATURED_GAMES: GameProject[] = [
  {
    id: "azymar-playground",
    title: "AZYMAR Playground",
    subtitle: "Instant-Play Multi-Genre Web Gaming Portal",
    status: "Completed",
    statusLabel: "Completed · Live",
    categories: ["Mobile", "FPS"],
    tags: ["Web Arcade", "13+ Original Games", "Instant Play"],
    platforms: ["Web", "Mobile", "PC"],
    gradient: "from-[#4361EE] via-[#3A0CA3] to-[#FF6B6B]",
    coverImage: "/images/projects/playground-hero.jpg",
    gallery: [
      {
        src: "/images/projects/playground-hero.jpg",
        caption: "AZYMAR Playground Landing Hero — 'Play. Enjoy. Repeat.'",
      },
      {
        src: "/images/projects/playground-games-grid.jpg",
        caption: "Live 13-Game Library: Redline Rush, Stride Runner, Neon Gravity, Overdrive & more",
      },
      {
        src: "/images/projects/playground-full.jpg",
        caption: "Full Production Portal Architecture (azymar.me)",
      },
      {
        src: "/images/projects/azymar-studio-code.jpg",
        caption: "AZYMAR Custom Engine & Responsive Frontend Pipeline",
      },
    ],
    summary:
      "AZYMAR Playground (azymar.me) is our flagship completed free-to-play web arcade ecosystem housing 13+ instant-load titles spanning high-speed runners, puzzle logic, tactical snipers, and space shooters — zero installs required.",
    challenge:
      "Delivering console-responsive 60 FPS input feel, unified player telemetry, and sub-2-second cold loads across desktop and mobile browsers.",
    solution:
      "Built a lightweight modular HTML5/WebGL micro-runtime with shared rating/play-count persistence, crisp neo-brutalist arcade UI cards, and touch-adaptive controls.",
    metrics: [
      { label: "Playable Titles", value: "13" },
      { label: "Cold Boot Time", value: "< 1.6s" },
      { label: "Status", value: "Completed" },
    ],
    techUsed: ["HTML5 Canvas", "WebGL", "TypeScript", "Next.js", "Edge CDN"],
    liveUrl: "https://azymar.me",
  },
  {
    id: "murugan-surasamharam",
    title: "Murugan: Surasamharam",
    subtitle: "Mythological Boss-Arena Action RPG",
    status: "Ongoing",
    statusLabel: "Ongoing · In Development",
    categories: ["RPG", "Mobile"],
    tags: ["Action RPG", "Indian Mythology", "Boss Combat"],
    platforms: ["Mobile", "PC", "Console"],
    gradient: "from-[#FF6B6B] via-[#F59E0B] to-[#7B2FF7]",
    coverImage: "/images/projects/murugan-hero.jpg",
    gallery: [
      {
        src: "/images/projects/murugan-hero.jpg",
        caption: "Boss Encounter: Lord Murugan wielding the celestial Vel against Surapadman",
      },
      {
        src: "/images/projects/murugan-arena.jpg",
        caption: "Sacred Chakra Arena with dynamic fire braziers and legion spectators",
      },
      {
        src: "/images/projects/murugan-boss.jpg",
        caption: "Surapadman Phase-II Heavy Mace Telegraph & Stamina/Divine Meter HUD",
      },
    ],
    summary:
      "An epic third-person mythological Action RPG chronicling the legendary Surasamharam. Players channel divine Vel combos, aerial spear dashes, and tactical parries inside towering Dravidian battle colosseums.",
    challenge:
      "Translating complex Souls-inspired boss choreography and cloth/particle VFX onto mobile touchscreens without sacrificing frame pacing or visual grandeur.",
    solution:
      "Custom radial ability cluster (Vel Strike, Divine Dash, Crescent Slash), GPU-instanced crowd legions, and adaptive shader LODs across Unreal & mobile pipelines.",
    metrics: [
      { label: "Target Frame Rate", value: "60 FPS" },
      { label: "Boss Phases", value: "4-Stage" },
      { label: "Status", value: "Ongoing" },
    ],
    techUsed: ["Unreal Engine 5", "C++", "Blender", "Niagara VFX", "FMOD"],
  },
  {
    id: "vr-surgical-sim",
    title: "AZYMAR VR Surgical Sim",
    subtitle: "High-Fidelity Operating Theater & Medical XR Training",
    status: "Ongoing",
    statusLabel: "Ongoing · In Development",
    categories: ["VR"],
    tags: ["VR Simulation", "Medical XR", "6DoF Haptics"],
    platforms: ["Meta Quest", "PCVR", "OpenXR"],
    gradient: "from-[#01ACB2] via-[#4361EE] to-[#7B2FF7]",
    coverImage: "/images/projects/vr-surg-overview.jpg",
    gallery: [
      {
        src: "/images/projects/vr-surg-overview.jpg",
        caption: "Full Sterile Operating Theater with Orthopedic Knee X-Ray & Vitals Suite",
      },
      {
        src: "/images/projects/vr-surg-tray.jpg",
        caption: "PBR Surgical Instrument Tray — Scalpels, Hemostats, Forceps & Sutures",
      },
      {
        src: "/images/projects/vr-surg-anesthesia.jpg",
        caption: "Interactive Anesthesia Workstation, Flowmeters & Live ECG Waveform",
      },
      {
        src: "/images/projects/vr-surg-lights.jpg",
        caption: "Articulated Dual Overhead Surgical Luminaires with Real-Time Specular Lighting",
      },
      {
        src: "/images/projects/vr-surg-patient.jpg",
        caption: "Patient Positioning & Sterile Draping Prep Module",
      },
    ],
    summary:
      "An immersive Virtual Reality clinical & surgical simulation platform engineered by AZYMAR. Trainees practice sterile instrument handling, anesthesia monitoring, and orthopedic procedures alongside interactive 3D medical avatars.",
    challenge:
      "Maintaining rock-solid 90Hz stereoscopic comfort in standalone VR headsets while rendering metallic surgical instruments, real-time vitals displays, and articulated 3D characters.",
    solution:
      " physically-based medical asset pipeline, sub-millimeter 6DoF hand-tracking grab sockets, and optimized glTF/FBX character rigs (explore the live 3D Doctor model right inside this dossier!).",
    metrics: [
      { label: "VR Refresh Rate", value: "90 Hz" },
      { label: "Precision", value: "< 1.5mm" },
      { label: "Status", value: "Ongoing" },
    ],
    techUsed: ["Unity XR / OpenXR", "Blender", "glTF 2.0", "C#", "Meta SDK"],
    has3DDoctorModel: true,
  },
  {
    id: "verity-research",
    title: "Verity Systems",
    subtitle: "Cryptographic Proof & Interactive Research Ecosystem",
    status: "Ongoing",
    statusLabel: "Ongoing · In Development",
    categories: ["RPG", "VR"],
    tags: ["Interactive Ecosystem", "21-Screen Architecture", "Ledger Proof"],
    platforms: ["Web", "Desktop", "Mobile"],
    gradient: "from-[#0F766E] via-[#4361EE] to-[#1D4ED8]",
    coverImage: "/images/projects/verity-cover.jpg",
    gallery: [
      {
        src: "/images/projects/verity-1.jpg",
        caption: "Part 1 — Core Product: Landing, Local Browser File Verifier, Dashboard & Projects",
      },
      {
        src: "/images/projects/verity-2.jpg",
        caption: "Part 2 — The Record Itself: 4-Step Wizard, Dossier Chain, QR Certificate & Feed",
      },
      {
        src: "/images/projects/verity-3.jpg",
        caption: "Part 3 — People & Resources: Collaborator Discovery, Profiles, Network & Chennai Lab Map",
      },
      {
        src: "/images/projects/verity-4.jpg",
        caption: "Part 4 — Account, Settings & Tokenized Light/Dark Design System",
      },
      {
        src: "/images/projects/verity-5.jpg",
        caption: "Part 5 — Plain-Language Legal Terms, Live RPC Status & Error States",
      },
    ],
    summary:
      "Verity is AZYMAR's interactive verification and collaborative network system where teams hash evidence locally in-browser, co-sign contributions, and anchor tamper-proof dossiers to a public ledger.",
    challenge:
      "Designing a zero-trust cryptographic workflow that feels effortless, transparent, and human-centered across 21 interconnected product screens.",
    solution:
      "Client-side WebCrypto SHA-256 hashing with zero raw file uploads, visual chain-verification ladders, print-ready A4 QR certificates, and a complete custom design token system.",
    metrics: [
      { label: "Product Screens", value: "21" },
      { label: "Client Uploads", value: "0 Bytes" },
      { label: "Status", value: "Ongoing" },
    ],
    techUsed: ["React", "Next.js", "WebCrypto API", "TypeScript", "Public Ledger RPC"],
  },
  {
    id: "playground-tactical-shooters",
    title: "Overdrive & Stickman Sniper",
    subtitle: "AZYMAR Playground — Precision Shooter Collection",
    status: "Completed",
    statusLabel: "Completed · Live on Playground",
    categories: ["FPS"],
    tags: ["FPS / Sniper", "Bullet-Heaven", "Arcade Action"],
    platforms: ["PC", "Web", "Mobile"],
    gradient: "from-[#7B2FF7] via-[#4361EE] to-[#FF6B6B]",
    coverImage: "/images/projects/playground-fps-showcase.jpg",
    gallery: [
      {
        src: "/images/projects/playground-fps-showcase.jpg",
        caption: "Completed Shooter Trio: Overdrive Shooter, Stickman Sniper & Crimson Hawk",
      },
      {
        src: "/images/projects/playground-games-grid.jpg",
        caption: "Integrated Play Counts & Community Star Ratings on AZYMAR Playground",
      },
    ],
    summary:
      "Shipped as part of the completed AZYMAR Playground suite, this high-octane shooter pack pairs scope-stabilized tactical sniping in Stickman Sniper with cosmic twin-stick combat in Overdrive Shooter and Crimson Hawk.",
    challenge:
      "Achieving zero-latency reticle tracking, crisp hit-stop feedback, and scalable enemy bullet patterns inside browser sandboxes.",
    solution:
      "Pooled particle emitters, deterministic delta-time ballistics, and dual mouse/touch virtual-scope controls.",
    metrics: [
      { label: "Shooter Modes", value: "3 Titles" },
      { label: "Community Rating", value: "5.0 ★" },
      { label: "Status", value: "Completed" },
    ],
    techUsed: ["WebGL", "Canvas 2D", "Spatial Audio", "Object Pooling"],
    liveUrl: "https://azymar.me",
  },
  {
    id: "playground-velocity-pack",
    title: "Neon Gravity & Redline Rush",
    subtitle: "AZYMAR Playground — Cyber Physics & Velocity Pack",
    status: "Completed",
    statusLabel: "Completed · Live on Playground",
    categories: ["Mobile"],
    tags: ["Physics Runner", "Top-Down Racer", "Synthwave"],
    platforms: ["Mobile", "Tablet", "Web"],
    gradient: "from-[#4361EE] via-[#7B2FF7] to-[#01ACB2]",
    coverImage: "/images/projects/playground-mobile-showcase.jpg",
    gallery: [
      {
        src: "/images/projects/playground-mobile-showcase.jpg",
        caption: "Neon Gravity, Redline Rush & Stride Runner — Live on AZYMAR Playground",
      },
      {
        src: "/images/projects/playground-hero.jpg",
        caption: "Cross-Device Instant Play Experience",
      },
    ],
    summary:
      "A trio of kinetic velocity games live on AZYMAR Playground — flip gravity mid-air on neon stunt tracks in Neon Gravity, drift apexes in Redline Rush, and leap hand-drawn sketchbook obstacles in Stride Runner.",
    challenge:
      "Crafting expressive physics curves that reward split-second timing with one-thumb mobile ergonomics.",
    solution:
      "Custom Verlet stunt suspension, coyote-time jump buffering, and procedural track chunk streaming.",
    metrics: [
      { label: "Avg Rating", value: "4.7 ★" },
      { label: "Touch Latency", value: "< 8ms" },
      { label: "Status", value: "Completed" },
    ],
    techUsed: ["TypeScript", "Custom 2D Physics", "Procedural Tracks", "PWA"],
    liveUrl: "https://azymar.me",
  },
];

export interface SkillNode {
  id: string;
  name: string;
  tier: string;
  description: string;
  icon: "code" | "sparkles" | "network" | "glasses" | "cpu" | "shield";
}

export const SKILL_TREE_SERVICES: SkillNode[] = [
  {
    id: "full-cycle",
    name: "Full-Cycle Dev",
    tier: "Tier I · Core",
    description:
      "End-to-end game production from GDD & vertical slice to global launch across PC, Console & Web.",
    icon: "code",
  },
  {
    id: "art-anim",
    name: "Art & Animation",
    tier: "Tier I · Visuals",
    description:
      "Stylized & photoreal 3D characters, PBR surgical/game props, rigging, and fluid combat animation.",
    icon: "sparkles",
  },
  {
    id: "multiplayer",
    name: "Multiplayer",
    tier: "Tier II · Systems",
    description:
      "Low-latency authoritative netcode, matchmaking, leaderboards, and live-ops backend infrastructure.",
    icon: "network",
  },
  {
    id: "vr-ar",
    name: "VR/AR",
    tier: "Tier II · Spatial",
    description:
      "90Hz medical simulations, 6DoF hand-tracked training theaters, and immersive OpenXR worlds.",
    icon: "glasses",
  },
  {
    id: "porting",
    name: "Porting",
    tier: "Tier III · Scale",
    description:
      " seamless performance optimization, shader translation, and certification for Console, Mobile & WebGL.",
    icon: "cpu",
  },
  {
    id: "qa-testing",
    name: "QA & Testing",
    tier: "Tier III · Mastery",
    description:
      "Automated frame-time profiling, combat balance sweeps, device-matrix compatibility, and bug-zero ship gates.",
    icon: "shield",
  },
];

export interface InventoryTech {
  name: string;
  abbr: string;
  badge: string;
  proficiency: number;
  asciiBar: string;
  role: string;
}

export const TECH_INVENTORY: InventoryTech[] = [
  {
    name: "Unreal Engine",
    abbr: "UE5",
    badge: "🎬",
    proficiency: 95,
    asciiBar: "█████████░ 95%",
    role: "AAA Action RPGs & Nanite/Lumen Worlds",
  },
  {
    name: "Unity",
    abbr: "U3D",
    badge: "🧊",
    proficiency: 92,
    asciiBar: "█████████░ 92%",
    role: "Mobile Hits & 90Hz OpenXR Simulations",
  },
  {
    name: "C++",
    abbr: "C++",
    badge: "⚡",
    proficiency: 90,
    asciiBar: "█████████░ 90%",
    role: "Deterministic Gameplay & Memory-Safe Cores",
  },
  {
    name: "Blender",
    abbr: "BLD",
    badge: "🎨",
    proficiency: 88,
    asciiBar: "█████████░ 88%",
    role: "3D Character Sculpting, PBR & glTF Rigs",
  },
  {
    name: "Photon",
    abbr: "PUN",
    badge: "🌐",
    proficiency: 85,
    asciiBar: "████████░░ 85%",
    role: "Real-Time Co-op & Competitive Netcode",
  },
  {
    name: "AWS",
    abbr: "AWS",
    badge: "☁️",
    proficiency: 87,
    asciiBar: "█████████░ 87%",
    role: "Global GameLift Servers & Telemetry",
  },
  {
    name: "FMOD",
    abbr: "SFX",
    badge: "🎵",
    proficiency: 84,
    asciiBar: "████████░░ 84%",
    role: "Adaptive Boss Music & 3D Spatial Audio",
  },
  {
    name: "Godot",
    abbr: "GDT",
    badge: "🤖",
    proficiency: 82,
    asciiBar: "████████░░ 82%",
    role: "Rapid Indie Prototypes & WebGL Exports",
  },
];

export interface QuestStep {
  id: string;
  number: string;
  title: string;
  status: "completed" | "in-progress" | "locked";
  summary: string;
  details: string;
  deliverables: string[];
  xp: string;
}

export const QUEST_LOG_STEPS: QuestStep[] = [
  {
    id: "q1",
    number: "Quest 01",
    title: "Concept, Lore & Game Design Pillar",
    status: "completed",
    summary: "Defining core loops, player fantasy, target platforms, and technical feasibility.",
    details:
      "Every AZYMAR world begins with a playable paper-and-greybox thesis. We align combat feel, retention hooks, art bible moodboards, and platform budgets before a single production shader is written.",
    deliverables: ["Game Design Document (GDD)", "Art & Audio Direction Bible", "Technical Risk Matrix"],
    xp: "+1,200 XP",
  },
  {
    id: "q2",
    number: "Quest 02",
    title: "Greybox Prototype & Toy-First Mechanics",
    status: "completed",
    summary: "Proving the 30-second gameplay loop is magnetic using pure geometry and responsive controls.",
    details:
      "Just like AZYMAR Playground's instant-fun philosophy, we tune jump curves, hit-stop frames, VR grab ergonomics, and camera rigs in clean greybox arenas until playtesters refuse to put the controller down.",
    deliverables: ["Playable Greybox Build", "Input Latency Benchmark", "Core Combat / Interaction Loop"],
    xp: "+2,400 XP",
  },
  {
    id: "q3",
    number: "Quest 03",
    title: "Vertical Slice & Hero Asset Production",
    status: "completed",
    summary: "Shipping a shippable-quality slice with final lighting, custom 3D rigs, and UI polish.",
    details:
      "Our artists, technical animators, and engineers converge to craft signature boss encounters, sterile VR operating rooms, and tokenized UI systems that validate the full production pipeline.",
    deliverables: ["Gold-Standard Vertical Slice", "PBR Character & Prop Pipeline", "Custom HUD & UX Architecture"],
    xp: "+4,000 XP",
  },
  {
    id: "q4",
    number: "Quest 04",
    title: "Full World Scale, Netcode & Device Optimization",
    status: "in-progress",
    summary: "Scaling content across chapters while locking 60–90 FPS across Mobile, PC, Console & VR.",
    details:
      "Currently active across our ongoing slate (Murugan: Surasamharam, VR Surgical Sim, and Verity): expanding boss rosters, clinical scenarios, draw-call batching, and closed-beta telemetry.",
    deliverables: ["Content Complete Beta", "Draw-Call & Memory Profiling", "Closed Beta Telemetry Loop"],
    xp: "+6,500 XP · Active",
  },
  {
    id: "q5",
    number: "Quest 05",
    title: "Gold Master, Global Launch & Live-Ops Seasons",
    status: "locked",
    summary: "Platform certification, launch trailers, community events, and post-launch expansions.",
    details:
      "Unlocks upon Beta sign-off: store-page conversion optimization, platform TRC/VRC certification passes, zero-downtime launch war-room, and seasonal content drops.",
    deliverables: ["Console / Store Certification", "Global Launch Build", "Seasonal Live-Ops Roadmap"],
    xp: "+10,000 XP · Final Boss",
  },
];

export interface TestimonialNPC {
  id: string;
  npcName: string;
  npcRole: string;
  guild: string;
  level: string;
  quote: string;
}

export const TESTIMONIALS: TestimonialNPC[] = [
  {
    id: "npc-1",
    npcName: "Dr. Aravind Krishnan",
    npcRole: "Director of Surgical Simulation",
    guild: "MedTech XR Consortium",
    level: "LVL 99 · Guild Master",
    quote:
      "AZYMAR turned complex orthopedic operating-room protocols into a 90Hz VR simulation our residents actually love practicing in. Their attention to instrument physics and lighting is unmatched.",
  },
  {
    id: "npc-2",
    npcName: "Elena Vance",
    npcRole: "Head of Publishing",
    guild: "Arcadia Interactive",
    level: "LVL 84 · Strategist",
    quote:
      "From the first playable build of AZYMAR Playground to their mythological RPG prototypes, this team ships with the rare combination of Apple-level UI clarity and frame-perfect game feel.",
  },
  {
    id: "npc-3",
    npcName: "Karthik Subramanian",
    npcRole: "Principal Systems Architect",
    guild: "Verity Research Partner",
    level: "LVL 91 · Sage",
    quote:
      "Working with AZYMAR felt like unlocking a cheat code. They architected 21 cohesive screens and local cryptographic verification without ever compromising speed or simplicity.",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  rpgClass: string;
  initials: string;
  image?: string;
  twitter?: string;
  linkedin: string;
}

export const TEAM_PARTY: TeamMember[] = [
  {
    name: "Sanjay K",
    role: "Business Founder",
    rpgClass: "Commander · Founder",
    initials: "SK",
    image: "/images/team/sanjay.jpg",
    linkedin: "https://www.linkedin.com/in/sanjay-kumar-3561b537a/",
  },
  {
    name: "Adhil M",
    role: "Serial Founder",
    rpgClass: "Strategist · Founder",
    initials: "AM",
    image: "/images/team/adhil.jpg",
    linkedin: "https://www.linkedin.com/in/adhil-m-60761b37b/",
  },
  {
    name: "Aboorehaan A",
    role: "Principal Founder",
    rpgClass: "Architect · Founder",
    initials: "AA",
    image: "/images/team/aboorehaan.jpg",
    linkedin: "https://www.linkedin.com/in/aboorehaan-a-8a5367397/",
  },
  {
    name: "Anantharajagopalan M",
    role: "Technical Lead & Staff Engineer",
    rpgClass: "Staff Engineer · Tech Lead",
    initials: "AM",
    image: "/images/team/ananthrajagopalan.jpg",
    linkedin: "https://www.linkedin.com/in/anantharajagopalan-m-889b52380/",
  },
  {
    name: "Ashwath Vetri",
    role: "Senior Game Developer & BOD",
    rpgClass: "Lead Dev · BOD",
    initials: "AV",
    image: "/images/team/ashwath.jpg",
    linkedin: "https://www.linkedin.com/in/ashwathvetri/",
  },
  {
    name: "Nivash Krishnan",
    role: "Junior Game Developer & BOD",
    rpgClass: "Game Dev · BOD",
    initials: "NK",
    linkedin: "https://www.linkedin.com/in/nivash-krishnan-a02ba537b/",
  },
  {
    name: "Prithish V S",
    role: "Junior Game Developer & BOD",
    rpgClass: "Game Dev · BOD",
    initials: "PV",
    image: "/images/team/prithish.jpg",
    linkedin: "https://www.linkedin.com/in/prithish-v-s-4935843a9/",
  },
];

export interface CareerClass {
  id: string;
  title: string;
  classTag: string;
  icon: string;
  location: string;
  type: string;
  accent: string;
  hoverRotate: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  stats: { label: string; value: number }[];
}

export const CAREER_CLASSES: CareerClass[] = [
  {
    id: "game-programmer",
    title: "Game Programmer",
    classTag: "Core Engine / Gameplay",
    icon: "⚔️",
    location: "Chennai / Hybrid",
    type: "Full-Time",
    accent: "#4361EE",
    hoverRotate: "hover:rotate-1",
    summary:
      "Unity / Unreal · Gameplay Systems · C++. Build responsive mechanics, weapon feel, character controllers, and high-performance cross-platform loops.",
    responsibilities: [
      "Develop and optimize core gameplay systems in Unreal Engine (C++) and Unity.",
      "Implement real-time player physics, camera controllers, and AI state trees.",
      "Profile CPU/GPU performance across PC, mobile, and WebGL builds.",
    ],
    requirements: [
      "Hands-on experience in C++, C#, Unity or Unreal Engine.",
      "Good foundation in 3D vector math, physics, and gameplay architecture.",
      "Portfolio or GitHub showcasing playable prototypes or shipped titles.",
    ],
    stats: [
      { label: "C++ / Engine", value: 95 },
      { label: "Gameplay Architecture", value: 92 },
      { label: "Performance Tuning", value: 89 },
    ],
  },
  {
    id: "3d-animator",
    title: "3D Animator",
    classTag: "Character & Rigging",
    icon: "🪄",
    location: "Chennai / Hybrid",
    type: "Full-Time",
    accent: "#7B2FF7",
    hoverRotate: "hover:-rotate-1",
    summary:
      "Blender · Character Animation · Rigging. Bring stylised heroes, mythical titans, and intricate mechanical models to life with kinetic impact.",
    responsibilities: [
      "Rig and animate bipedal/creature characters, weapons, and props in Blender.",
      "Create fluid attack combos, parries, hit reactions, and locomotion blend trees.",
      "Collaborate with developers to import, tune, and blend animation states in-engine.",
    ],
    requirements: [
      "Solid portfolio/demo reel showcasing keyframe animation, weight, and timing.",
      "Proficiency in Blender rigging, skinning, and weight painting.",
      "Understanding of game engine animation pipelines (Unreal / Unity / glTF).",
    ],
    stats: [
      { label: "Rigging & Weighting", value: 94 },
      { label: "Kinetic Animation", value: 96 },
      { label: "Engine Integration", value: 90 },
    ],
  },
  {
    id: "game-designer",
    title: "Game Designer",
    classTag: "Systems & Mechanics",
    icon: "🛡️",
    location: "Chennai / Remote",
    type: "Full-Time",
    accent: "#01ACB2",
    hoverRotate: "hover:rotate-2",
    summary:
      "Unity / Unreal · Gameplay Mechanics. Formulate magnetic core loops, difficulty balancing, ability trees, and combat choreography.",
    responsibilities: [
      "Draft comprehensive GDDs, level progression curves, and weapon balance sheets.",
      "Greybox prototype new combat mechanics and test playfeel directly in-engine.",
      "Conduct playtests and iterate based on community telemetry and player feedback.",
    ],
    requirements: [
      "Passion for action RPGs, arcade racers, and high-feel indie titles.",
      "Experience prototyping mechanics in Unreal Engine, Unity, or Godot.",
      "Strong analytical and design documentation skills.",
    ],
    stats: [
      { label: "Combat & Mechanics", value: 93 },
      { label: "Loop Design", value: 95 },
      { label: "Level Balance", value: 91 },
    ],
  },
  {
    id: "level-designer",
    title: "Level Designer",
    classTag: "World & Layout",
    icon: "🗺️",
    location: "Chennai / Hybrid",
    type: "Full-Time",
    accent: "#FF6B6B",
    hoverRotate: "hover:-rotate-2",
    summary:
      "Environment Flow & Spatial Pacing. Construct memorable boss arenas, obstacle layouts, visual guides, and atmospheric encounter spaces.",
    responsibilities: [
      "Design and block out whitebox/greybox level layouts focusing on pacing and line-of-sight.",
      "Implement lighting triggers, dynamic hazards, spawn zones, and camera cues.",
      "Work closely with 3D environment artists to dress levels while preserving gameplay readability.",
    ],
    requirements: [
      "Demonstrated ability to craft readable, fun, and cohesive 3D game spaces.",
      "Hands-on proficiency in Unreal Engine / Unity level creation tools.",
      "Solid grasp of spatial composition, player psychology, and navigation.",
    ],
    stats: [
      { label: "Spatial Pacing", value: 94 },
      { label: "Arena Architecture", value: 92 },
      { label: "Encounter Design", value: 90 },
    ],
  },
];
