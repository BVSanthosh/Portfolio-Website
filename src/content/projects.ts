export type EvalSuite = {
  suite: string
  agent: string
  scenarios: number
  passRate: number
  boundaries: string[]
}

/**
 * Where a project came from, so a reader can trace it back to a role on the
 * experience timeline rather than guessing whether it was paid work.
 */
export type Provenance = {
  kind: 'Personal' | 'Company' | 'Team'
  /** Organisation it was built at or under, if any. */
  org?: string
  /** id of the matching entry in experience.ts. Renders the tag as a link. */
  roleId?: string
}

export type Project = {
  slug: string
  name: string
  subtitle: string
  /** One sentence for the index card. */
  blurb: string
  period: string
  context: string
  provenance: Provenance
  status: 'Deployed' | 'In development' | 'Prototype' | 'Archived'
  featured: boolean
  /** Which inline SVG to render on the case study page, if any. */
  diagram?: 'dental' | 'eduagent' | 'scanner'
  /** The headline numbers on the case study page. Only verifiable things here. */
  facts: { value: string; label: string }[]
  problem: string
  /** The body of the case study. Each block is a heading plus prose. */
  sections: { heading: string; body: string[] }[]
  /** Engineering decisions worth defending in an interview. */
  decisions: { title: string; body: string }[]
  outcomes: string[]
  stack: string[]
  links: { label: string; href: string; primary?: boolean }[]
  evals?: {
    intro: string
    harness: string
    suites: EvalSuite[]
    reflection: string
  }
}

export const projects: Project[] = [
  {
    slug: 'eduagent',
    name: 'EduAgent',
    subtitle: 'An agentic research platform, deployed on AWS',
    blurb:
      'A multi-agent platform that ingests your documents, answers questions against them, generates real references, and writes long-form research reports.',
    period: 'May 2026 — Aug 2026',
    context: 'Independent project',
    provenance: { kind: 'Personal' },
    status: 'Deployed',
    featured: true,
    diagram: 'eduagent',
    facts: [
      { value: '3', label: 'Agent workflows over one shared state' },
      { value: 'pgvector', label: 'Retrieval in Postgres, not a separate vector DB' },
      { value: 'S3 + CloudFront', label: 'Deployed from GitHub Actions on every push' },
    ],
    problem:
      'Research is three separate chores wearing a trench coat: finding credible sources, reading far more than you can hold in your head, and assembling the result into something citable. Each one has a tool. None of them share state, so you end up being the integration layer.',
    sections: [
      {
        heading: 'What it does',
        body: [
          'EduAgent organises work into spaces. A space holds your uploaded documents, the conversation you have had about them, and whatever the agents have produced. Three workflows run on top of that shared state.',
          'Summarisation ingests an uploaded file and returns a structured condensation of it. Reference generation takes a topic and returns real, retrievable sources rather than the plausible-looking fabrications an unaugmented model will hand you. Deep research runs a longer multi-step loop that plans, searches, reads, and drafts a full report.',
        ],
      },
      {
        heading: 'How it is built',
        body: [
          'The backend is FastAPI, fully async, with SQLAlchemy over asyncpg and Alembic managing migrations. Documents land in S3 through aioboto3; their embeddings live in the same Postgres instance as everything else via pgvector.',
          'The agent layer splits by responsibility. LlamaIndex owns ingestion and retrieval — the file readers, the chunking, the embedding pipeline. LangGraph owns orchestration: the conversational graph, plus a dedicated research subgraph with its own state, nodes and prompts that the parent graph delegates to. Tavily provides web search when a task needs sources from outside the uploaded corpus.',
          'The frontend is React and TypeScript on Vite, with Zustand for global state and a protected-route wrapper around anything that needs a session. Auth is JWT with Argon2 password hashing.',
        ],
      },
      {
        heading: 'Getting it onto the internet',
        body: [
          'The backend is containerised — a slim Python image, unbuffered output, uvicorn bound to all interfaces — with docker-compose standing up Postgres alongside it for local work.',
          'The frontend ships through a GitHub Actions workflow that only fires on changes under frontend/. It builds the static bundle, syncs it to S3 with --delete so removed files actually disappear, then issues a CloudFront invalidation. Pushing to main is the entire deploy process.',
        ],
      },
    ],
    decisions: [
      {
        title: 'pgvector instead of a dedicated vector database',
        body: 'One database to run, one backup story, one connection pool — and retrieval results can be joined against application data in a single query. A separate vector store would have bought scale I do not yet need, at the cost of operational surface I would have to maintain.',
      },
      {
        title: 'A research subgraph rather than one flat graph',
        body: 'Deep research has its own state shape and its own failure modes. Isolating it as a subgraph keeps that complexity from leaking into the conversational path, and lets the research loop be reasoned about — and changed — on its own.',
      },
      {
        title: 'Postgres-backed checkpointing',
        body: 'langgraph-checkpoint-postgres means agent state survives a process restart. Long research runs are exactly the workload where an in-memory checkpointer costs you the whole job.',
      },
      {
        title: 'LlamaIndex for retrieval, LangGraph for control flow',
        body: 'Both libraries will happily do the other one’s job, and using them that way produces a codebase where nobody can tell which layer owns a bug. Drawing the line at ingestion-versus-orchestration kept the boundary legible.',
      },
    ],
    outcomes: [
      'Live and publicly reachable through CloudFront.',
      'Push-to-deploy frontend pipeline with cache invalidation, no manual steps.',
      'Schema evolved across eleven Alembic migrations without dropping the database.',
      'API tests under pytest with dedicated fixtures.',
    ],
    stack: [
      'Python',
      'FastAPI',
      'LangGraph',
      'LlamaIndex',
      'PostgreSQL',
      'pgvector',
      'SQLAlchemy',
      'Alembic',
      'React',
      'TypeScript',
      'Zustand',
      'Docker',
      'AWS S3',
      'AWS CloudFront',
      'GitHub Actions',
    ],
    links: [
      { label: 'Live platform', href: 'https://d37uqdfgqpjb08.cloudfront.net/', primary: true },
      { label: 'Source', href: 'https://github.com/BVSanthosh/Educational-Agentic-AI-Platform' },
    ],
  },

  {
    slug: 'dental-receptionist',
    name: 'Smiles Dental AI Receptionist',
    subtitle: 'A multi-agent booking system with a real evaluation suite',
    blurb:
      'Four specialised agents behind a supervisor, handling bookings, reschedules and attendance confirmation — with an LLM-as-judge eval suite proving they respect clinic policy.',
    period: 'Jul 2026',
    context: 'Independent project',
    provenance: { kind: 'Personal' },
    status: 'Prototype',
    featured: true,
    diagram: 'dental',
    facts: [
      { value: '34', label: 'Eval scenarios across three suites' },
      { value: '4', label: 'Specialised agents behind one supervisor' },
      { value: '~300ms', label: 'Typical agent response time' },
    ],
    problem:
      'A clinic reception desk is a state machine that happens to be staffed by a human. Book, reschedule, cancel, confirm — each one has policy attached. No cancellations inside 24 hours. No more than two reschedules per appointment. No bookings on weekends, outside 9-to-6, or more than six months out. Verify who you are talking to before you touch their record. A chatbot that handles all this conversationally but quietly violates the rules is worse than no chatbot at all.',
    sections: [
      {
        heading: 'The architecture',
        body: [
          'A supervisor agent opens the conversation and does one job: work out intent. It then routes to one of three specialists and gets out of the way.',
          'The booking agent captures patient details, checks business hours and availability, and writes the appointment. The modification agent authenticates the caller first, then validates the change against the cancellation window and the reschedule cap before touching anything. The confirmation agent handles reminder responses, logs attendance, and escalates to a human the moment a response is a no-show — or is merely ambiguous.',
          'Agents hand off to each other silently. A patient who calls to confirm and then decides to reschedule is moved between specialists mid-conversation without ever seeing the orchestration underneath.',
        ],
      },
      {
        heading: 'State and tools',
        body: [
          'The graph is a LangGraph StateGraph with a shared AgentState, a checkpointer, and a ToolNode per agent holding only that agent’s tools plus its permitted transfer targets. Routing is explicit: check for pending tool calls first, then for an active agent, then stop.',
          'Every database operation is a tool. The model never writes SQL — it calls check_availability, process_reschedule, authenticate_user, and the tool enforces the invariant. Policy lives in Python where it can be tested, not in a prompt where it can be argued with.',
        ],
      },
    ],
    decisions: [
      {
        title: 'Policy in tools, not in prompts',
        body: 'A prompt saying "never cancel within 24 hours" is a suggestion. A tool that refuses and returns a reason is a constraint. Putting the boundary in code is what makes the eval suite meaningful — it tests that the agent reaches for the right tool, not that it remembered a rule.',
      },
      {
        title: 'Auth-first enforcement on the modification path',
        body: 'The modification agent cannot act on a record before authenticate_user has succeeded. This is the single scenario class most worth testing, because a plausible-sounding conversation is exactly how a model talks itself past a check.',
      },
      {
        title: 'Escalate on uncertainty rather than guess',
        body: 'The confirmation agent treats an ambiguous reply as an escalation trigger. For appointment attendance, a confidently wrong answer costs more than a handover.',
      },
      {
        title: 'Separate eval datasets per agent',
        body: 'One blended suite would hide which specialist regressed. Three JSONL datasets, graded independently, means a failure points at a component.',
      },
    ],
    outcomes: [
      'Booking and modification agents pass every behavioural scenario in their suites.',
      'Confirmation agent sits at 70% — the honest number, and the one I am working on.',
      'Silent hand-offs verified across all three specialists.',
    ],
    evals: {
      intro:
        'Most agent projects stop at “it worked when I tried it”. This one has a graded suite, because the interesting question is not whether the happy path works — it is whether the agent holds the line when a patient pushes.',
      harness:
        'Scenarios live as JSONL datasets in LangSmith. Each is run against the live graph, and a separate Gemini 2.5 Pro evaluator grades the transcript against an explicit behavioural reference: did it authenticate before acting, did it refuse the out-of-policy request, did it escalate rather than guess. LLM-as-judge, with the judge held to a rubric rather than a general impression.',
      suites: [
        {
          suite: 'booking_agent.jsonl',
          agent: 'Booking',
          scenarios: 12,
          passRate: 100,
          boundaries: [
            'Rejects bookings more than 6 months out',
            'Enforces 9AM–6PM business hours',
            'Refuses weekend bookings',
            'Validates email and phone format',
          ],
        },
        {
          suite: 'modification_agent.jsonl',
          agent: 'Modification',
          scenarios: 11,
          passRate: 100,
          boundaries: [
            'Auth-first enforcement before any record change',
            'Caps reschedules at 2 per appointment',
            'Blocks cancellations inside 24 hours',
          ],
        },
        {
          suite: 'confirmation_agent.jsonl',
          agent: 'Confirmation',
          scenarios: 11,
          passRate: 70,
          boundaries: [
            'Auth-first enforcement',
            'Escalates on uncertain responses',
            'Respects reschedule cap and cancellation window',
          ],
        },
      ],
      reflection:
        'The 70% is on this page deliberately. The confirmation agent is the hardest of the three because its inputs are the least structured — a reminder reply can be “yes”, “cant make it sorry”, or a question — and the correct behaviour for the ambiguous middle is to escalate rather than commit. Knowing precisely which scenarios it fails is the difference between a bug I can fix and a system I merely hope about.',
    },
    stack: [
      'Python',
      'LangGraph',
      'LangSmith',
      'Gemini 2.5 Pro',
      'FastAPI',
      'SQLite',
      'React',
      'TypeScript',
    ],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/BVSanthosh/Hospital-Appointment-Booking-Agent',
        primary: true,
      },
    ],
  },

  {
    slug: 'medicine-scanner',
    name: 'Medicine Scanner',
    subtitle: 'On-device OCR for counterfeit medicine detection',
    blurb:
      'A React Native app that reads medicine packaging on-device, built at Graviton Systems — the client and its OCR pipeline are working; the verification backend is next.',
    period: 'Aug 2026 — present',
    context: 'Graviton Systems',
    provenance: { kind: 'Company', org: 'Graviton Systems', roleId: 'graviton-systems' },
    status: 'In development',
    featured: true,
    diagram: 'scanner',
    facts: [
      { value: 'On-device', label: 'OCR runs locally, no image upload' },
      { value: 'ML Kit', label: 'Google on-device text recognition' },
      { value: 'Expo', label: 'React Native, TypeScript' },
    ],
    problem:
      'Counterfeit medicine is a genuine safety problem in the markets Graviton serves. Verifying a box means reading what is printed on it — but users are on variable connections, and shipping every photograph to a server to be read is slow, expensive, and a privacy liability.',
    sections: [
      {
        heading: 'Where it currently stands',
        body: [
          'The client is built and the capture-to-text path works end to end on the device. Optical character recognition happens on the phone through Google’s ML Kit, so the image never leaves the handset and there is no upload to wait on.',
          'The verification backend is designed but not yet implemented. The diagram below shows the full intended shape, with the server half marked as planned — I would rather show the architecture I am building towards and say plainly which half exists.',
        ],
      },
      {
        heading: 'The split, and why',
        body: [
          'What crosses the network is extracted text, not a photograph: orders of magnitude smaller, and carrying none of the ambient information an image does.',
          'The server half will run a lightweight language model over that raw text to parse it into structured fields — product name, manufacturer, batch, expiry. That is a job LLMs are good at and regular expressions are miserable at, because packaging layout varies enormously between manufacturers.',
          'Putting the expensive-but-dumb step on the device and the cheap-but-smart step on the server inverts the usual assumption. It removes network latency from the part of the interaction the user is actually waiting on, and keeps the part that will change often — the parsing logic — somewhere it can be updated without shipping an app release.',
        ],
      },
    ],
    decisions: [
      {
        title: 'On-device OCR over server-side vision',
        body: 'Eliminates upload latency on a variable connection, cuts inference cost to zero for the recognition step, and means camera images never leave the handset.',
      },
      {
        title: 'A small model for field extraction, not a large one',
        body: 'Parsing known-shape text into four fields does not need frontier capability. A lightweight model keeps per-scan cost and latency low enough to be used casually.',
      },
      {
        title: 'Build the client against the contract first',
        body: 'Settling the shape of the extracted-text payload before writing the server means the app is not blocked on the backend, and the backend has a real consumer to satisfy rather than a guess.',
      },
    ],
    outcomes: [
      'Built: the capture-to-text path, producing scanned text on-device in milliseconds with no network round trip.',
      'Built: the scanning interface in React Native and Expo.',
      'Next: the verification backend — LLM field extraction and the lookup it feeds.',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Google ML Kit'],
    links: [
      { label: 'Source', href: 'https://github.com/BVSanthosh/Medicine_Scanner_App', primary: true },
    ],
  },

  {
    slug: 'surgery-status-board',
    name: 'Surgery Center Status Board',
    subtitle: 'Real-time theatre status for hospital waiting rooms',
    blurb:
      'Led five developers building a live surgical status dashboard, with role-separated access over sensitive patient records.',
    period: 'Jul 2025 — Aug 2025',
    context: 'Chingu · team of 5',
    provenance: { kind: 'Team', org: 'Chingu', roleId: 'chingu' },
    status: 'Prototype',
    featured: false,
    facts: [
      { value: '5', label: 'Developers coordinated' },
      { value: 'RBAC', label: 'Role-separated access to patient records' },
    ],
    problem:
      'Families waiting through a long operation have no visibility into what stage it has reached. Staff have the information; there is no shared surface that safely shows it.',
    sections: [
      {
        heading: 'The work',
        body: [
          'I led a cross-functional team of five, ran sprint planning and code review, and wrote the User Requirements Specification that turned an ambiguous brief into buildable features.',
          'On the engineering side I built the Express backend in TypeScript — REST APIs for reading and updating patient and surgery records — and integrated Supabase for persistence and Supabase Auth for role-based access, so administrators and surgical staff see appropriately different things.',
        ],
      },
    ],
    decisions: [
      {
        title: 'Specification before implementation',
        body: 'With five developers and a two-month window, the expensive failure mode is building the wrong thing in parallel. The URS cost a few days and removed most of the ambiguity.',
      },
    ],
    outcomes: [
      'Delivered a production-simulated dashboard giving staff a centralised real-time view.',
      'GDPR-conscious handling of patient data throughout.',
    ],
    stack: ['TypeScript', 'Express.js', 'Node.js', 'Supabase', 'React'],
    links: [],
  },

  {
    slug: 'chatcast',
    name: 'Chatcast',
    subtitle: 'Real-time messaging at 100+ concurrent sessions',
    blurb:
      'A Socket.io messaging application with live presence, notifications, and MongoDB schemas shaped for read-heavy chat history.',
    period: 'Feb 2025 — Mar 2025',
    context: 'Independent project',
    provenance: { kind: 'Personal', org: 'Consansoft', roleId: 'consansoft' },
    status: 'Archived',
    featured: false,
    facts: [
      { value: '100+', label: 'Concurrent sessions supported' },
      { value: 'Socket.io', label: 'Live messaging, presence and notifications' },
    ],
    problem:
      'Real-time is where a naive CRUD mental model breaks. I wanted to build the whole loop — transport, presence, persistence — rather than reach for a hosted chat SDK.',
    sections: [
      {
        heading: 'The work',
        body: [
          'A Node.js and Socket.io backend handling chat, notifications and status updates across concurrent sessions. MongoDB schemas were designed separately for the write-heavy message stream and the read-heavy profile data.',
          'The frontend is React and Tailwind with reusable auth middleware for protected routes, and contact lists resolved through mutual friend-request logic.',
        ],
      },
    ],
    decisions: [
      {
        title: 'Separate schemas for messages and profiles',
        body: 'Messages are append-only and queried by conversation; profiles are small, read constantly, and updated rarely. Modelling them identically makes both slower.',
      },
    ],
    outcomes: ['Low-latency delivery across 100+ concurrent sessions.'],
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Socket.io', 'MongoDB'],
    links: [
      { label: 'Source', href: 'https://github.com/BVSanthosh/Chat-Applicaiton', primary: true },
    ],
  },

  {
    slug: 'convonet',
    name: 'Convonet',
    subtitle: 'A social platform with real-time messaging built in',
    blurb:
      'A full social product — posts, follows, likes, comments — with Socket.io direct messaging and presence layered on top of the same data model.',
    period: 'Mar 2025 — Jun 2025',
    context: 'Consansoft · independent project',
    provenance: { kind: 'Personal', org: 'Consansoft', roleId: 'consansoft' },
    status: 'Archived',
    featured: false,
    facts: [
      { value: '4', label: 'Mongoose models: user, post, message, conversation' },
      { value: 'Socket.io', label: 'Direct messaging and presence' },
    ],
    problem:
      'A social feed and a chat system are usually built as two products. I wanted to know what it costs to put them on one data model and one auth layer, because that is the version a real product actually ships.',
    sections: [
      {
        heading: 'The work',
        body: [
          'The backend is Express with Mongoose over MongoDB, split into controllers for users, posts and messages. Authentication is JWT issued into an HTTP-only cookie, with bcrypt password hashing and a middleware that guards protected routes rather than each handler re-checking.',
          'Messaging runs over Socket.io alongside the REST API, with conversations and messages as separate collections so a conversation list can be read without dragging every message with it. Image uploads go to Cloudinary rather than into the database.',
          'The frontend is React with Chakra UI and Recoil for global state, with the session, posts and message threads each held in their own atom so a chat update does not re-render the feed.',
        ],
      },
    ],
    decisions: [
      {
        title: 'Conversations separate from messages',
        body: 'The inbox is read constantly and needs only the last message; a thread is read occasionally and needs all of them. One collection would have made the common case pay for the rare one.',
      },
      {
        title: 'Auth in middleware, not in handlers',
        body: 'A route that forgets its own check is a security hole that looks like working code. Making the router enforce it means new endpoints are protected by default.',
      },
    ],
    outcomes: [
      'Feed, profiles, follows, likes and comments working over one shared data model.',
      'Real-time direct messaging with presence, on the same auth layer as the REST API.',
    ],
    stack: ['React', 'Chakra UI', 'Recoil', 'Node.js', 'Express.js', 'Socket.io', 'MongoDB', 'Mongoose', 'Cloudinary', 'JWT'],
    links: [
      { label: 'Source', href: 'https://github.com/BVSanthosh/Threads-Clone', primary: true },
    ],
  },

  {
    slug: 'btechlogs',
    name: 'Btechlogs',
    subtitle: 'A blogging platform, deployed on a VPS I configured by hand',
    blurb:
      'A publishing platform with a rich-text editor and optimistic UI — and the project where I stopped letting a platform do my deployment for me.',
    period: 'Jan 2025 — May 2025',
    context: 'Consansoft · independent project',
    provenance: { kind: 'Personal', org: 'Consansoft', roleId: 'consansoft' },
    status: 'Archived',
    featured: false,
    facts: [
      { value: 'Self-hosted', label: 'Hand-configured Linux VPS behind NGINX' },
      { value: 'TanStack Query', label: 'Optimistic updates on every interaction' },
    ],
    problem:
      'Every previous project of mine had been deployed by pushing to something that handled the server for me. That is a useful abstraction right up until it hides the thing you need to understand, so I built this one to run on a machine I had to configure myself.',
    sections: [
      {
        heading: 'The application',
        body: [
          'React and Vite on the front, Express and Mongoose on the back. Posts are written in a rich-text editor, images are served through ImageKit rather than the application server, and the post list pages in with infinite scroll instead of loading everything at once.',
          'TanStack Query owns the boundary between frontend state and the API. Interactions — saving a post, filtering a list — update optimistically and roll back if the request fails, so the interface never feels like it is waiting on a round trip.',
          'Authentication is handled by Clerk, with a Svix-verified webhook that syncs user records into the application database when they change upstream.',
        ],
      },
      {
        heading: 'The deployment',
        body: [
          'The application runs on a VPS with a Linux environment I configured from a bare image: runtime dependencies installed by hand, a production Node process, and NGINX in front as a reverse proxy.',
          'It is less convenient than a managed platform and that was the point. Reverse proxies, process management and TLS stop being vocabulary once you have had to get them working.',
        ],
      },
    ],
    decisions: [
      {
        title: 'A hand-configured VPS over a managed platform',
        body: 'Deliberately the harder path. Everything a platform does for you is a thing you cannot debug when it breaks, and I wanted the layer underneath to be familiar rather than magic.',
      },
      {
        title: 'Images through a dedicated service',
        body: 'Serving media off the application server means one slow upload can occupy a worker that should be answering API requests. ImageKit keeps that traffic off the box entirely.',
      },
      {
        title: 'Managed auth, verified webhooks',
        body: 'Auth is the part of a side project most likely to be quietly wrong. Delegating it to Clerk and verifying the sync webhook signature was a better use of the time than hand-rolling sessions again.',
      },
    ],
    outcomes: [
      'Running on self-managed infrastructure: Linux, production Node process, NGINX reverse proxy.',
      'Optimistic UI across post interactions and filtering, with rollback on failure.',
    ],
    stack: ['React', 'Vite', 'TanStack Query', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Clerk', 'ImageKit', 'NGINX', 'Linux'],
    links: [
      { label: 'Source', href: 'https://github.com/BVSanthosh/Blog-Application', primary: true },
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
