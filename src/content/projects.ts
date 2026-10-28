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
  diagram?: 'dental' | 'eduagent' | 'scanner' | 'climeproof'
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
    name: 'AI Hospital Receptionist',
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
    subtitle: 'Three ways to read a pack, one server-side verdict',
    blurb:
      'A React Native app that checks medicine against a manufacturer register — by barcode, on-device OCR or manual entry — backed by an async FastAPI service that returns the verdict in a single round trip.',
    period: 'Aug 2026 — present',
    context: 'Graviton Systems',
    provenance: { kind: 'Company', org: 'Graviton Systems', roleId: 'graviton-systems' },
    status: 'In development',
    featured: true,
    diagram: 'scanner',
    facts: [
      { value: '3', label: 'Input paths: GS1 barcode, on-device OCR, manual entry' },
      { value: '1', label: 'Round trip per scan — extraction and lookup in one call' },
      { value: '49', label: 'Backend tests, run against in-memory SQLite' },
    ],
    problem:
      'Counterfeit medicine is a genuine safety problem in the markets Graviton serves. Checking a pack means reading what is printed on it and comparing that against what the manufacturer actually produced — on phones with variable connections, in the hands of people who will not retype a batch number twice.',
    sections: [
      {
        heading: 'Three ways in',
        body: [
          'The app tries the most reliable source first. A GS1 barcode — a GS1-128 or DataMatrix on most packs — already carries the GTIN, batch, expiry and serial as structured data. When there is no usable barcode, the camera falls back to Google ML Kit OCR, which runs on the device so the photograph never leaves the handset. Manual entry is the last resort, and arrives pre-filled with whatever the earlier paths did manage to resolve.',
          'Raw OCR output interleaves columns, so a label and its value end up on different lines. Before anything is sent, the client rebuilds the printed rows from the text bounding boxes, putting "B.NO." back next to the number it labels. It also maps the on-screen guide box into the captured photo’s coordinates, so the crop it reads is the region the user actually aimed at.',
        ],
      },
      {
        heading: 'One verdict, decided on the server',
        body: [
          'The client holds no verification logic at all. All three scan endpoints funnel into a single verify function, which is what guarantees a pack scanned by barcode, read by OCR and typed by hand reaches the same answer. The register is treated as authoritative over the pack: OCR misreads a product name far more often than the database is wrong.',
          'The barcode is sent to the server undecoded, on purpose. The client decodes a copy for its live on-screen hint, but if the device supplied the batch number, a modified client could ask about any batch it liked and be told it was safe.',
          'Every response carries the resolved fields and one of three outcomes — safe, unsafe, or unknown. "Not on file" is deliberately not treated as counterfeit; it tells the user to check with a pharmacist. The headline and message text come from the server, so the wording can change without shipping an app release.',
        ],
      },
      {
        heading: 'An LLM only where it earns its place',
        body: [
          'Only the OCR path uses a language model. Gemini extracts the fields against a JSON schema at temperature zero, so the endpoint parses a typed object rather than scraping prose, and the extraction and the register lookup happen in the same request — one round trip from the phone. The barcode path never touches a model: GS1 element strings are decoded deterministically, with check digits and the "day 00 means end of month" expiry rule handled properly.',
          'A missing API key, a timeout or a malformed response falls back to a deterministic regex parser rather than failing. A degraded answer the user can correct is better than an error screen.',
        ],
      },
      {
        heading: 'The unglamorous parts',
        body: [
          'Async FastAPI over SQLAlchemy and asyncpg on PostgreSQL, with Alembic migrations, JWT auth and Argon2id password hashing. Structured logging, with a request ID in every error body. Separate liveness and readiness checks, Docker Compose for local runs, and dependencies pinned so a rebuild months from now ships the code that was tested.',
          'Batch numbers are normalised on the server, so "BATCH NO: 49302" typed by hand resolves to the same register key as "B.NO.49302" read off the box — while still requiring a separator after the label, so a genuine batch called LOT9 is not mangled into 9.',
        ],
      },
    ],
    decisions: [
      {
        title: 'The verdict lives on the server, never the client',
        body: 'A verdict the device computes is a verdict the device can forge. Sending raw input and deriving the batch number server-side means the answer is trustworthy even if the app is not.',
      },
      {
        title: 'No model where a parser will do',
        body: 'A barcode already carries structured data, so decoding it with an LLM would only add cost, latency and a way to be wrong. The model is reserved for OCR text, where packaging layouts vary too much for rules alone.',
      },
      {
        title: 'Degrade, don’t fail',
        body: 'The extraction step sits on the critical path of every OCR scan. Falling back to a deterministic parser when the model is unavailable keeps the endpoint answering, and the user can correct a partial result on the manual entry form.',
      },
      {
        title: 'Rate-limit per user, not per IP',
        body: 'Login is an offline password cracker with a network API in front of it, and every OCR scan costs an LLM call. Both are limited — keyed on the authenticated user where possible, so everyone behind one office or mobile-carrier NAT is not punished for a single noisy client.',
      },
    ],
    outcomes: [
      'Working end to end: barcode, OCR and manual entry all resolve through one verification service.',
      'Each verification is a single client–server round trip, with LLM extraction and the register lookup combined server-side.',
      'OCR extraction degrades to a deterministic parser instead of failing when the model is unavailable.',
      '49 backend tests covering the API and the barcode and batch-number domain logic.',
    ],
    stack: [
      'React Native',
      'Expo',
      'TypeScript',
      'Google ML Kit',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'Alembic',
      'Gemini API',
      'Docker',
      'JWT',
    ],
    links: [
      { label: 'Source', href: 'https://github.com/BVSanthosh/Medicine_Scanner_App', primary: true },
    ],
  },

  {
    slug: 'climeproof-pipeline',
    name: 'ClimeProof Geospatial Pipeline',
    subtitle: 'Climate-hazard profiles for any U.S. address, every value traceable to its source',
    blurb:
      'A Python pipeline that turns an address into a climate-hazard record for a healthcare facility — heat, cold, winter storm, extreme precipitation and wildfire — with the provenance of every number attached.',
    period: 'Sep 2026 — present',
    context: 'ClimeProof',
    provenance: { kind: 'Company', org: 'ClimeProof', roleId: 'climeproof' },
    status: 'In development',
    featured: true,
    diagram: 'climeproof',
    facts: [
      { value: '77', label: 'Metrics in the versioned hazard schema' },
      { value: '20', label: 'Computed in iteration 1, from five public datasets' },
      { value: 'sha256', label: 'Hash of the raw response behind every value' },
    ],
    problem:
      'A climate-vulnerability assessment for a hospital is only as good as the numbers underneath it, and a number nobody can trace is a number nobody should act on. ClimeProof needed hazard exposure for facilities anywhere in the U.S., computed the same way everywhere, with every value able to answer the question “where did this come from?”',
    sections: [
      {
        heading: 'What it produces',
        body: [
          'Given an address, a pair of coordinates, or a CSV of thousands of either, the pipeline returns one record per location. Every record contains every metric in the schema, in the same order, so any two records are directly comparable.',
          'The metrics span five hazards. Heat: days at or above 90, 100 and 105 °F, cooling degree days, heat-wave events, and the trend in 100 °F days. Cold: freeze and hard-freeze days, days at or below 0 °F, heating degree days. Winter storm: annual snowfall and days with snow on the ground. Extreme precipitation: annual totals, days over an inch, and the average wettest day of the year. Wildfire: burn probability around 2011 and projected for around 2047, and the risk to structures. Station record highs and lows sit alongside.',
          'Batch runs write the records as JSONL, plus long and wide CSV views for analysis. Rows that cannot be geocoded go to their own file with the reason, instead of silently disappearing.',
        ],
      },
      {
        heading: 'Five sources, one contract',
        body: [
          'Addresses are geocoded through the U.S. Census Geocoder, singly or in batches of up to ten thousand rows. Climate statistics come from ACIS, which serves both the PRISM climate grid and NOAA GHCN-Daily station records. Wildfire comes from CarbonPlan’s Open Climate Risk dataset — 30 m resolution across the contiguous U.S., read through xarray from a zarr store. NASA Daymet provides an independent 1 km cross-check.',
          'Each source is a provider module behind one contract. Point providers make one query per location; gridded stores are vectorised over the whole batch instead, so a national 30 m raster is read once per run rather than once per facility. Adding a source means a schema entry, a provider module and a registration — the orchestration stays untouched.',
        ],
      },
      {
        heading: 'Recent climate, honestly windowed',
        body: [
          'Climate metrics describe the recent climate: the mean over the most recent fifteen complete calendar years, so 2011–2025 for a run in October 2026. Trends use thirty years, because a trend needs a longer record. Only complete years are averaged, so a partial year never skews an annual count.',
          'Record highs and lows come from the nearest active station with at least thirty years of record, through yesterday. Every value states the exact years it used, and the windows move forward on their own each January.',
        ],
      },
      {
        heading: 'Traceable by construction',
        body: [
          'Every raw response is cached. Each value’s provenance records the source, the dataset version, the retrieval time, the exact request made, and the sha256 of the response it was computed from — so any number in any record can be traced back to the bytes behind it.',
          'The schema version, the config version and a hash of the config are written into every record. A run can be repeated offline from the cache, and an earlier run can be recreated for an audit by pinning the end year.',
        ],
      },
    ],
    decisions: [
      {
        title: 'No LLM, on purpose',
        body: 'This is deterministic data plumbing. A hazard figure that could differ between two identical runs is useless to an assessment, and nothing in the pipeline needs judgement a model would add. Knowing when not to reach for an LLM is part of the job.',
      },
      {
        title: 'Missing data is a value, not a gap',
        body: 'Every metric carries one of five states: OK, N/A, NO_DATA, NOT_IMPLEMENTED or ERROR — and no field is ever omitted. Separating N/A (storm surge does not apply inland) from NO_DATA (it could apply, but no public dataset covers this location) keeps visible exactly the gaps an assessment most needs to see.',
      },
      {
        title: 'The full schema from day one',
        body: 'All 77 metrics are emitted from the first iteration, with the unbuilt ones marked NOT_IMPLEMENTED. Consumers build against the final shape now, and progress is a count that has to reach zero by handoff rather than a claim.',
      },
      {
        title: 'Built only on public inputs',
        body: 'Development and testing use bulk public data — county sets, national facility datasets, civic landmarks. Participating facilities’ details never enter the repository, its tests or its history.',
      },
    ],
    outcomes: [
      'Iteration 1 computes 20 of the 77 schema metrics across five hazards, from five public datasets.',
      'Batch mode geocodes and profiles CSV inputs, routing anything unplaceable to its own report.',
      'A compare command cross-checks extreme-heat counts against NOAA normals and Daymet for quality control.',
      'Offline unit tests against faked HTTP, plus live smoke tests against the real APIs.',
    ],
    stack: [
      'Python',
      'pydantic',
      'xarray',
      'zarr',
      'pytest',
      'uv',
      'ACIS / PRISM',
      'NOAA GHCN-Daily',
      'CarbonPlan Open Climate Risk',
      'NASA Daymet',
      'U.S. Census Geocoder',
    ],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/BVSanthosh/ClimeProof_Geospatial_Pipeline',
        primary: true,
      },
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
    // No roleId: Chingu is no longer on the experience timeline, so the tag
    // names the programme without linking to a role that isn't there.
    provenance: { kind: 'Team', org: 'Chingu' },
    status: 'Deployed',
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
    links: [
      { label: 'Live platform', href: 'https://v56-tier3-team-35.vercel.app/', primary: true },
      { label: 'Source', href: 'https://github.com/chingu-voyages/V56-tier3-team-35' },
    ],
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
    status: 'Deployed',
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
      { label: 'Live platform', href: 'https://chatcast.basinavsanthosh.workers.dev/', primary: true },
      { label: 'Source', href: 'https://github.com/BVSanthosh/Chat-Applicaiton' },
    ],
  },

  {
    slug: 'convonet',
    name: 'Convonet',
    subtitle: 'A social platform with real-time messaging built in',
    blurb:
      'A full social product — posts, follows, likes, comments — with Socket.io direct messaging and presence layered on top of the same data model.',
    period: 'Apr 2025 — May 2025',
    context: 'Consansoft · independent project',
    provenance: { kind: 'Personal', org: 'Consansoft', roleId: 'consansoft' },
    status: 'Deployed',
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
      { label: 'Live platform', href: 'https://convonet.basinavsanthosh.workers.dev/', primary: true },
      { label: 'Source', href: 'https://github.com/BVSanthosh/Threads-Clone' },
    ],
  },

  {
    slug: 'btechlogs',
    name: 'Btechlogs',
    subtitle: 'A blogging platform, deployed on a VPS I configured by hand',
    blurb:
      'A publishing platform with a rich-text editor and optimistic UI — and the project where I stopped letting a platform do my deployment for me.',
    period: 'Dec 2024 — Jan 2025',
    context: 'Consansoft · independent project',
    provenance: { kind: 'Personal', org: 'Consansoft', roleId: 'consansoft' },
    status: 'Deployed',
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
      { label: 'Live platform', href: 'https://btechlogs.basinavsanthosh.workers.dev/', primary: true },
      { label: 'Source', href: 'https://github.com/BVSanthosh/Blog-Application' },
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
