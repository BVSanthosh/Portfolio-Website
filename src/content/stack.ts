export type StackGroup = {
  title: string
  /** A short note on how you actually use these — more useful than the list itself. */
  note: string
  items: string[]
}

export const stack: StackGroup[] = [
  {
    title: 'Agentic AI',
    note: 'Where most of my current work sits. Graphs, tools, retrieval, and the eval harnesses that keep them honest.',
    items: [
      'LangGraph',
      'LlamaIndex',
      'LangChain',
      'LangSmith',
      'RAG pipelines',
      'LLM-as-judge evals',
      'Tool calling',
      'OpenAI API',
      'Anthropic API',
      'Gemini API',
    ],
  },
  {
    title: 'Backend',
    note: 'Async Python by preference, Node when the team is already there.',
    items: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'Alembic',
      'Node.js',
      'Express.js',
      'Spring Boot',
      'REST API design',
      'JWT auth',
      'pytest',
    ],
  },
  {
    title: 'Data',
    note: 'Relational first. I reach for pgvector before reaching for a second database.',
    items: ['PostgreSQL', 'pgvector', 'MongoDB', 'MySQL', 'SQLite', 'Prisma', 'Supabase'],
  },
  {
    title: 'Frontend',
    note: 'Enough craft to build the interface my own systems need, and to be useful on a product team.',
    items: [
      'TypeScript',
      'React',
      'Next.js',
      'React Native',
      'Tailwind CSS',
      'Zustand',
      'Redux',
      'TanStack Query',
      'Radix UI',
    ],
  },
  {
    title: 'Cloud & infrastructure',
    note: 'Currently studying for the AWS Solutions Architect – Associate exam.',
    items: [
      'AWS (S3, CloudFront, EC2, IAM)',
      'Docker',
      'GitHub Actions',
      'CI/CD',
      'NGINX',
      'Linux',
      'Git',
    ],
  },
  {
    title: 'Computer science foundations',
    note: 'From the St Andrews degree — the reason the systems above do not feel like magic.',
    items: [
      'Data structures & algorithms',
      'Operating systems',
      'Computer networks',
      'Concurrency',
      'Compilers',
      'Machine learning',
    ],
  },
]
