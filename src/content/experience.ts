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
    id: 'climeproof',
    company: 'ClimeProof',
    title: 'Software Engineer',
    employment: 'Part-time',
    period: 'Sep 2026 — Present',
    location: 'California · Remote',
    context: 'Climate-vulnerability risk assessment for healthcare facilities.',
    current: true,
    highlights: [
      'Developed a Python geospatial data pipeline that generates climate-hazard profiles — heat, cold, winter storm, extreme precipitation and wildfire — for any U.S. address, using pydantic and xarray.',
      'Integrated five public climate and geospatial datasets (PRISM/ACIS, NOAA GHCN-Daily, CarbonPlan Open Climate Risk, U.S. Census Geocoder, NASA Daymet) into 20 standardised risk metrics.',
      'Designed a 77-metric hazard data schema with versioning, validation and explicit missing-data states, so outputs are consistent and comparable across locations.',
    ],
    caseStudy: { slug: 'climeproof-pipeline', label: 'Read the case study' },
  },
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
      'Developed a React Native and TypeScript mobile app with a three-tier scanning pipeline: GS1 barcode decoding, on-device ML Kit OCR, and manual entry.',
      'Engineered an async FastAPI and PostgreSQL REST API with JWT and Argon2id auth, rate limiting, structured logging and Dockerised deployment.',
      'Consolidated LLM extraction and the database lookup into one server-side call, cutting each verification to a single round trip with graceful degradation.',
    ],
    caseStudy: { slug: 'medicine-scanner', label: 'Read the case study' },
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
