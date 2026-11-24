// All home-page copy lives here. Facts come from the old portfolio
// (MY PORTFOLIO/src/data/content.ts) and hardik-world/src/content/profile.ts.

export const site = {
  name: 'Hardik Bhatia',
  role: 'Full-Stack & AI Developer',
  city: 'Mumbai, India',
  email: 'hardik.bhatia@somaiya.edu',
  github: 'https://github.com/HNTRHACK',
  githubHandle: 'HNTRHACK',
  linkedin: 'https://linkedin.com/in/hardik-bhatia',
  lane: 'https://hardik-world.vercel.app',
  school: 'K.J. Somaiya School of Engineering',
  university: 'Somaiya Vidyavihar University',
  description:
    'Hardik Bhatia is a full-stack and AI developer and Computer Engineering student in Mumbai. Gasless stablecoin checkouts, federated learning with differential privacy, and multilingual products.',
};

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'wins', label: 'Wins & projects' },
  { id: 'fun', label: 'Built for fun' },
  { id: 'stats', label: 'Stats' },
  { id: 'hi', label: 'Say hi' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

export const hero = {
  intro: 'Hardik Bhatia builds AI systems and full-stack products in Mumbai.',
};

export const whatIDo = [
  {
    title: 'AI systems',
    line: 'Federated learning with differential privacy in PyTorch and Opacus, plus LLM features inside products.',
  },
  {
    title: 'Full-stack products',
    line: 'Next.js, Node and NestJS on Postgres. OMEN shipped with 86 tests across Node and Solidity.',
  },
  {
    title: 'Hackathon builds',
    line: 'Four hackathons since 2024, and three projects at ETHGlobal Mumbai alone.',
  },
];

export const summaries: Record<SectionId, string> = {
  about: 'Third-year Computer Engineering student in Mumbai.',
  experience: 'A student tech society, a university lab and a 24-hour hackathon.',
  work: 'Six projects from 2026. Four solo, two with a team, and the team pages say which part was mine.',
  wins: 'Four hackathons since 2024, and the smaller things I built along the way.',
  fun: 'Things I made because I wanted to see if they would work.',
  stats: 'Pulled from GitHub when this site was built.',
  hi: 'Looking for a Summer 2027 internship. Mumbai or remote.',
};

export const about = {
  bio: [
    'I’m a third-year Computer Engineering student at K.J. Somaiya School of Engineering, Mumbai. At ETHGlobal Mumbai 2026 I built three projects: OMEN, ChaiPay and CareSeal. Before that came Mind Mates at Mumbai Hacks and a team entry at Smart India Hackathon.',
    'I like work where honesty is part of the spec: a dashboard where every metric traces back to data, a payment flow that says out loud which parts are a demo. Away from the editor I’m Joint Operations & PR Head at CSI KJSSE, running events for 400+ people at a time.',
  ],
  now: [
    'In my third year of B.E. Computer Engineering.',
    'Running operations and PR for CSI KJSSE.',
    'Looking for a Summer 2027 internship.',
  ],
  education: [
    { period: '2024 – 2028', title: 'B.E. Computer Engineering', org: 'K.J. Somaiya School of Engineering, Somaiya Vidyavihar University' },
    { period: '2026', title: 'Financial Markets', org: 'Yale University (Coursera)' },
  ],
  skills: [
    { group: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C', 'SQL', 'Solidity'] },
    { group: 'AI / ML', items: ['PyTorch', 'Opacus', 'Federated learning', 'LLMs', 'RAG', 'NLP', 'OpenAI API', 'Gemini API'] },
    { group: 'Web3', items: ['EVM', 'EIP-712', 'EIP-3009', 'Foundry', 'Hardhat', 'ethers.js', 'Chainlink CRE'] },
    { group: 'Full-stack', items: ['React', 'Next.js', 'Node.js', 'Express', 'NestJS', 'FastAPI', 'Socket.IO', 'three.js'] },
    { group: 'Data & tools', items: ['PostgreSQL', 'Prisma', 'Supabase', 'MongoDB', 'Pandas', 'Git', 'Docker', 'Figma'] },
  ],
};

export const experience = [
  {
    period: '2026 – Now',
    org: 'CSI KJSSE',
    initial: 'CSI',
    role: 'Joint Operations & PR Head',
    impact: 'Lead operations across 5 functions with a team of 43+. Plan and run technical events for 400+ attendees each.',
    tags: ['Operations', 'PR', 'Events'],
  },
  {
    period: 'Nov 2025',
    org: 'Mumbai Hacks',
    initial: 'MH',
    role: 'AI Developer: Mind Mates',
    impact: 'Built and deployed a full-stack AI platform in 24 hours. Backend services and REST APIs with JWT auth, plus sentiment analysis for recommendations.',
    tags: ['FastAPI', 'Node.js', 'MongoDB', 'NLP'],
  },
  {
    period: 'May – Jul 2025',
    org: 'SWDC, KJSSE',
    initial: 'SW',
    role: 'Frontend Developer: Virtual Lab',
    impact: 'Responsive React interfaces for a platform where students run engineering experiments online, wired to the backend REST APIs.',
    tags: ['React', 'REST APIs'],
  },
  {
    period: 'Oct 2024 – Apr 2025',
    org: 'CSI KJSSE',
    initial: 'CSI',
    role: 'First-Year Representative',
    impact: 'Helped deliver IDEA Hackathon, Bid by Bit 3.0 and an Algo Trading Workshop: logistics and communication.',
    tags: ['Events', 'Logistics'],
  },
];

export const wins = [
  { year: '2026', event: 'ETHGlobal Mumbai', fact: 'Selected for the 36-hour Ethereum hackathon (500+ builders). Built OMEN, ChaiPay and CareSeal.' },
  { year: '2026', event: 'BigD Datathon', fact: 'Frontend lead on ORION, AI traffic forecasting for Mumbai.' },
  { year: '2025', event: 'Mumbai Hacks', fact: 'Shipped Mind Mates, a full-stack AI platform, in 24 hours.' },
  { year: '2024', event: 'Smart India Hackathon', fact: 'Built and pitched a solution to a real-world problem statement at India’s national hackathon.' },
];

export const alsoBuilt = [
  { title: 'CareSeal', line: 'Medical-aid claim verification with signed attestations and an anomaly screen. 22 tests.', stack: 'FastAPI, Supabase RLS, EIP-191, IsolationForest', context: 'ETHGlobal Mumbai 2026', href: 'https://github.com/HNTRHACK/careseal' },
  { title: 'DUMPWISE', line: 'SAP billing import and reconciliation API on synthetic data, with 44 unit and end-to-end tests.', stack: 'NestJS, PostgreSQL, Prisma', context: '2026', href: 'https://github.com/HNTRHACK/DUMPWISE' },
  { title: 'MindMate', line: 'Mental-wellness platform: PHQ-9 and GAD-7 assessments, community chat, an AI assistant and counselling booking.', stack: 'React, Node.js, MongoDB, JWT', context: 'Mumbai Hacks 2025', href: 'https://github.com/HNTRHACK/MINDMATE-MUMBAIHACKS' },
  { title: 'HydroTrack', line: 'A full-stack dashboard that tracks water consumption and surfaces usage insights.', stack: 'Full-stack, data visualisation', context: '2026' },
  { title: 'Void Active', line: 'A Gemini API-powered interactive web platform for an activewear brand.', stack: 'React, Tailwind CSS, Framer Motion, Gemini API', context: '2025' },
  { title: 'SWDC Virtual Lab', line: 'Responsive React interfaces for a platform where students run engineering experiments online.', stack: 'React, REST APIs', context: 'K.J. Somaiya, 2025' },
];

// "Off the clock" cards. Hidden on the live page until `show` is true.
// Fill in `body` for each card (one or two short lines), then set show: true.
// Cards with an empty body are never rendered.
export const offTheClock = {
  show: false,
  cards: [
    { label: 'Reading', body: '' },
    { label: 'Listening', body: '' },
    { label: 'Playing', body: '' },
    { label: 'Watching', body: '' },
    { label: 'Making', body: '' },
  ],
};

export const lane = {
  title: 'Hardik’s Lane',
  line: 'My portfolio as a game: drive an auto-rickshaw down a Mumbai street and stop at stalls for each project.',
  stack: ['three.js', 'Rapier physics', 'TypeScript', 'Vite'],
};

export const sayHi = {
  topics: ['an internship', 'a project', 'a hackathon team', 'just saying hi'],
};
