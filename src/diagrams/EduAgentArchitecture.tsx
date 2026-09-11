import { DiagramFrame } from './DiagramFrame'
import { TEXT, nodeStyles } from './tokens'

/**
 * The deployed shape of EduAgent: a static frontend on S3/CloudFront, a
 * containerised FastAPI service, and the split between LlamaIndex (ingestion
 * and retrieval) and LangGraph (orchestration).
 */
export function EduAgentArchitecture() {
  return (
    <DiagramFrame
      caption="The frontend is static and edge-cached; the API is a single containerised FastAPI service. LlamaIndex owns everything from file to embedding, LangGraph owns everything from intent to answer, and both read and write the same Postgres — application rows and vectors in one database."
      legend={[
        { colour: 'var(--color-signal)', label: 'agent layer' },
        { colour: 'var(--color-rule-strong)', label: 'infrastructure' },
      ]}
    >
      <svg viewBox="0 0 900 460" className="h-auto w-full" role="img" aria-labelledby="edu-title">
        <title id="edu-title">
          EduAgent architecture: GitHub Actions deploys a React bundle to S3 behind CloudFront; a
          FastAPI container runs LlamaIndex ingestion and LangGraph orchestration over Postgres with
          pgvector, with documents in S3.
        </title>

        <defs>
          <marker id="arrow2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--color-rule-strong)" />
          </marker>
        </defs>

        {/* ---- Delivery lane ---- */}
        <text x="24" y="22" {...TEXT.label}>DELIVERY</text>

        <rect x="24" y="40" width="150" height="48" rx="10" {...nodeStyles.box} />
        <text x="99" y="60" textAnchor="middle" {...TEXT.title}>GitHub Actions</text>
        <text x="99" y="76" textAnchor="middle" {...TEXT.mono}>on push → frontend/</text>

        <path d="M174 64 H 226" {...nodeStyles.edge} markerEnd="url(#arrow2)" />

        <rect x="230" y="40" width="130" height="48" rx="10" {...nodeStyles.box} />
        <text x="295" y="60" textAnchor="middle" {...TEXT.title}>S3 bucket</text>
        <text x="295" y="76" textAnchor="middle" {...TEXT.mono}>sync --delete</text>

        <path d="M360 64 H 412" {...nodeStyles.edge} markerEnd="url(#arrow2)" />

        <rect x="416" y="40" width="140" height="48" rx="10" {...nodeStyles.box} />
        <text x="486" y="60" textAnchor="middle" {...TEXT.title}>CloudFront</text>
        <text x="486" y="76" textAnchor="middle" {...TEXT.mono}>invalidate /*</text>

        <path d="M556 64 H 608" {...nodeStyles.edge} markerEnd="url(#arrow2)" />

        <rect x="612" y="40" width="140" height="48" rx="10" {...nodeStyles.box} />
        <text x="682" y="60" textAnchor="middle" {...TEXT.title}>React SPA</text>
        <text x="682" y="76" textAnchor="middle" {...TEXT.mono}>Vite · TS · Zustand</text>

        {/* Browser → API */}
        <path d="M682 88 V 128" {...nodeStyles.edge} markerEnd="url(#arrow2)" />
        <text x="692" y="112" {...TEXT.mono}>JWT</text>

        {/* ---- API container ---- */}
        <text x="24" y="152" {...TEXT.label}>APPLICATION</text>

        <rect
          x="24"
          y="168"
          width="728"
          height="164"
          rx="12"
          fill="none"
          stroke="var(--color-rule-strong)"
          strokeWidth="1.25"
          strokeDasharray="5 4"
        />
        <text x="40" y="190" {...TEXT.mono} fontSize="10">
          Docker · python:slim · uvicorn
        </text>

        <rect x="600" y="128" width="152" height="40" rx="10" {...nodeStyles.box} />
        <text x="676" y="153" textAnchor="middle" {...TEXT.title}>FastAPI</text>

        {/* LlamaIndex */}
        <rect x="48" y="212" width="200" height="96" rx="10" {...nodeStyles.accentBox} />
        <text x="148" y="238" textAnchor="middle" {...TEXT.title} fill="var(--color-signal)">
          LlamaIndex
        </text>
        <text x="148" y="258" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          readers → chunking
        </text>
        <text x="148" y="274" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          → embeddings
        </text>
        <text x="148" y="294" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          ingestion &amp; retrieval
        </text>

        {/* LangGraph */}
        <rect x="290" y="212" width="230" height="96" rx="10" {...nodeStyles.accentBox} />
        <text x="405" y="238" textAnchor="middle" {...TEXT.title} fill="var(--color-signal)">
          LangGraph
        </text>
        <text x="405" y="258" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          conversational graph
        </text>
        <text x="405" y="276" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          └─ research subgraph
        </text>
        <text x="405" y="294" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          postgres checkpointer
        </text>

        <path d="M248 260 H 286" {...nodeStyles.edge} markerEnd="url(#arrow2)" />

        {/* Tavily */}
        <rect x="560" y="212" width="168" height="44" rx="10" {...nodeStyles.box} />
        <text x="644" y="232" textAnchor="middle" {...TEXT.title}>Tavily</text>
        <text x="644" y="247" textAnchor="middle" {...TEXT.mono}>web search tool</text>
        <path d="M520 248 H 556" {...nodeStyles.edge} markerEnd="url(#arrow2)" />

        {/* Gemini */}
        <rect x="560" y="266" width="168" height="44" rx="10" {...nodeStyles.box} />
        <text x="644" y="286" textAnchor="middle" {...TEXT.title}>Google GenAI</text>
        <text x="644" y="301" textAnchor="middle" {...TEXT.mono}>LLM + embeddings</text>
        <path d="M520 282 H 556" {...nodeStyles.edge} markerEnd="url(#arrow2)" />

        {/* ---- Storage ---- */}
        <text x="24" y="368" {...TEXT.label}>STORAGE</text>

        <rect x="48" y="384" width="240" height="56" rx="10" {...nodeStyles.box} />
        <text x="168" y="406" textAnchor="middle" {...TEXT.title}>PostgreSQL + pgvector</text>
        <text x="168" y="424" textAnchor="middle" {...TEXT.mono}>rows, embeddings, checkpoints</text>

        <rect x="320" y="384" width="200" height="56" rx="10" {...nodeStyles.box} />
        <text x="420" y="406" textAnchor="middle" {...TEXT.title}>S3</text>
        <text x="420" y="424" textAnchor="middle" {...TEXT.mono}>uploaded documents</text>

        <rect x="552" y="384" width="200" height="56" rx="10" {...nodeStyles.box} />
        <text x="652" y="406" textAnchor="middle" {...TEXT.title}>Alembic</text>
        <text x="652" y="424" textAnchor="middle" {...TEXT.mono}>versioned migrations</text>

        <path d="M148 308 V 380" {...nodeStyles.edge} markerEnd="url(#arrow2)" />
        <path d="M405 308 V 380" {...nodeStyles.edge} markerEnd="url(#arrow2)" />
        <path d="M652 332 V 380" {...nodeStyles.edge} strokeDasharray="4 4" markerEnd="url(#arrow2)" />
      </svg>
    </DiagramFrame>
  )
}
