export type Role = {
  /** Anchor id. Projects link here so a reader can trace work back to a role. */
  id: string
  company: string
  title: string
  /** Employment type, the way LinkedIn labels it. */
  employment: 'Full-time' | 'Part-time' | 'Volunteer' | 'Fellowship' | 'Self-employed' | 'Internship'
  period: string
  location: string
  /** One line on what the company actually does — reviewers rarely know. */
  context: string
  highlights: string[]
  /** Optional link to a case study on this site. */
  caseStudy?: { slug: string; label: string }
  current?: boolean
}

export const experience: Role[] = [
  {
    id: 'graviton-systems',
    company: 'Graviton Systems',
    title: 'AI Developer',
    employment: 'Part-time',
    period: 'Jun 2026 — Present',
    location: 'Bengaluru · Remote',
    context:
      'Health-tech startup building an AI-native orchestration layer for patient conversations.',
    current: true,
    highlights: [
      'Built the medicine scanner mobile app in React Native and Expo, letting users verify shop-bought medicine against a trusted source.',
      'Implemented on-device OCR with Google ML Kit so images are processed locally in milliseconds — no upload, no network latency, no photographs leaving the handset.',
    ],
    caseStudy: { slug: 'medicine-scanner', label: 'Read the case study' },
  },
  {
    id: 'climatebase',
    company: 'Climatebase',
    title: 'Climatebase Fellow',
    employment: 'Fellowship',
    period: 'Sep 2026',
    location: 'Remote',
    context:
      'A fellowship for people who care about the climate. I joined to look seriously at where AI is genuinely useful in the sector.',
    current: true,
    highlights: [],
  },
  {
    id: 'pixelize-labs',
    company: 'Pixelize Labs',
    title: 'Full-Stack Software Engineer',
    employment: 'Part-time',
    period: 'Aug 2025 — Oct 2025',
    location: 'United Kingdom · Remote',
    context: 'Generates AI product visuals for fashion brands, replacing traditional photoshoots.',
    highlights: [
      'Refactored the React frontend into a modular, reusable component structure — the change that cut onboarding time for new developers most.',
      'Built the authentication flows end to end: Zustand for predictable global state, Radix UI for accessible primitives, JWT access and refresh tokens, Argon2 password hashing.',
      'Designed the Express.js backend in TypeScript with a clean directory structure and integrated Prisma ORM for type-safe database access.',
      'Dockerised Postgres for local development, removing the setup friction every new contributor had been hitting.',
    ],
  },
  {
    id: 'chingu',
    company: 'Chingu',
    title: 'Backend Engineer',
    employment: 'Volunteer',
    period: 'Jul 2025 — Aug 2025',
    location: 'Remote',
    context:
      'A global programme where developers collaborate on production-grade projects. I led a team of five building a Surgery Center Status Board.',
    highlights: [
      'Led five developers through sprint planning, code review and version control workflow.',
      'Authored the User Requirements Specification, turning an ambiguous brief into features the team could actually build against.',
      'Engineered the Express.js backend in TypeScript with REST APIs for patient and surgery records.',
      'Integrated Supabase for persistence and Supabase Auth for role-based access to sensitive records.',
    ],
    caseStudy: { slug: 'surgery-status-board', label: 'Read the case study' },
  },
  {
    id: 'consansoft',
    company: 'Consansoft',
    title: 'Software Engineer — Founder',
    employment: 'Self-employed',
    period: 'May 2024 — May 2025',
    location: 'Remote',
    context:
      'An independent developer collective I started to build a network of early-career engineers, and to ship full-stack applications with genuine end-to-end ownership.',
    highlights: [
      'Built and deployed full-stack applications simulating real SaaS, B2C and messaging products — architecture through to deployment, alone.',
      'Ran a blogging platform on a self-managed VPS: manual Linux configuration, production Node.js runtime, NGINX reverse proxy.',
      'Used TanStack Query to synchronise frontend state with backend APIs, giving optimistic updates on post interactions and filtering.',
    ],
  },
]

export const getRole = (id: string) => experience.find((r) => r.id === id)
