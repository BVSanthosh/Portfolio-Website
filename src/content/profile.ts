/**
 * Everything about you that appears in more than one place on the site.
 * Edit here, not in the components.
 */

export const profile = {
  name: 'Venkata Santhosh Basina',
  shortName: 'Santhosh',
  role: 'Applied AI Engineer',

  /** The one line at the top of the page. Keep it to a single breath. */
  headline: 'I build agentic AI systems — and measure whether they actually work.',

  /** Follows the headline. Two sentences, maximum. */
  subhead:
    'LangGraph and LlamaIndex for the agents, FastAPI and Postgres underneath, AWS around it. A full-stack foundation means I own the thing end to end, from the retrieval pipeline to the CloudFront distribution it ships on.',

  location: 'Yangon, Myanmar',
  timezone: 'UTC+6:30',

  /** Shown in the About section. Recruiters look for this early. */
  relocation: 'Willing to relocate · open to remote',

  /** Shown as a status pill in the nav. Set `open` to false when you stop looking. */
  availability: {
    open: true,
    text: 'Open to Applied AI Engineer, Full-Stack Engineer and Cloud Engineer roles',
  },

  email: 'basinavsanthosh@gmail.com',
  links: {
    github: 'https://github.com/BVSanthosh',
    linkedin: 'https://www.linkedin.com/in/venkata-santhosh-basina/',
  },

  /** The About section. Written as prose, not bullet points. */
  about: [
    'I am an Applied AI Engineer working on agentic systems: RAG pipelines, multi-agent graphs, and the LLM-orchestrated workflows that sit between a user and a database. I read Computer Science at the University of St Andrews and finished in 2024.',
    'What I care about most is the unglamorous half of applied AI. A demo that works once is easy. A system that refuses to cancel an appointment inside the 24-hour window, escalates to a human when it is not confident, and can prove both of those things in a repeatable eval suite is the actual job. That is the kind of work I want to be hired for.',
    'Right now I am working on a part-time basis at Graviton Systems, a health-tech startup, and studying for the AWS Solutions Architect – Associate certification so the infrastructure side is as deliberate as the modelling side. I am based in Yangon and willing to relocate for the right role.',
  ],

  /** Three claims the site has to back up. Each one links to its evidence. */
  pillars: [
    {
      title: 'Agentic systems',
      body: 'Supervisor-routed multi-agent graphs in LangGraph, with tool-calling, checkpointed state, and silent hand-offs between specialists.',
      evidence: '/work/dental-receptionist',
      evidenceLabel: 'See the graph',
    },
    {
      title: 'Evaluated, not vibe-checked',
      body: 'LLM-as-judge suites in LangSmith across 34 scenarios, graded against explicit behavioural boundaries rather than a human eyeballing the output.',
      evidence: '#evaluation',
      evidenceLabel: 'See the results',
    },
    {
      title: 'Shipped on real infrastructure',
      body: 'Dockerised FastAPI services, Postgres with pgvector, S3 document storage, and a GitHub Actions pipeline that builds to S3 and invalidates CloudFront.',
      evidence: '/work/eduagent',
      evidenceLabel: 'See the architecture',
    },
  ],

  education: {
    degree: 'BSc (Hons) Computer Science',
    institution: 'University of St Andrews',
    location: 'St Andrews, UK',
    period: 'Sep 2020 — Jun 2024',
    detail:
      'Machine Learning, Artificial Intelligence, Advanced Communication Networks and Systems, Operating Systems, Databases, Data Structures & Algorithms, Software Engineering.',
  },

  certification: {
    name: 'AWS Certified Solutions Architect – Associate',
    status: 'In progress',
    note: 'Exam scheduled — update this line once it is passed.',
  },

  languages: ['English (native)', 'Telugu (native)', 'Hindi (working)', 'Burmese (elementary)'],
} as const
