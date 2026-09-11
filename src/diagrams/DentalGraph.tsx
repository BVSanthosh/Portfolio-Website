import { DiagramFrame } from './DiagramFrame'
import { TEXT, nodeStyles } from './tokens'

const AGENTS = [
  {
    y: 92,
    name: 'booking_agent',
    tools: ['save_contact_details', 'save_booking_details', 'check_availability', 'book_appointment'],
  },
  {
    y: 232,
    name: 'modification_agent',
    tools: ['authenticate_user', 'process_reschedule', 'process_cancellation', 'process_update'],
  },
  {
    y: 372,
    name: 'confirmation_agent',
    tools: ['authenticate_user', 'set_attendance_status', 'confirm_attendance'],
  },
]

/**
 * The supervisor-routed LangGraph topology. Policy-bearing tools are drawn in
 * the signal colour because they are where the clinic's rules actually live.
 */
export function DentalGraph() {
  const POLICY_TOOLS = new Set([
    'authenticate_user',
    'process_cancellation',
    'process_reschedule',
    'check_availability',
  ])

  return (
    <DiagramFrame
      caption="A supervisor classifies intent once, then routes to a specialist that owns that part of the conversation. Each specialist can only call its own tools plus its permitted transfer targets — so the graph, not the prompt, constrains what an agent is able to do."
      legend={[
        { colour: 'var(--color-signal)', label: 'policy-enforcing tool' },
        { colour: 'var(--color-rule-strong)', label: 'state / data tool' },
      ]}
    >
      <svg viewBox="0 0 900 470" className="h-auto w-full" role="img" aria-labelledby="dental-title">
        <title id="dental-title">
          LangGraph topology: a supervisor agent routes to booking, modification and confirmation
          agents, each holding its own set of tools, with silent transfers between specialists.
        </title>

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--color-rule-strong)" />
          </marker>
        </defs>

        {/* Column headings */}
        <text x="24" y="20" {...TEXT.label}>ENTRY</text>
        <text x="150" y="20" {...TEXT.label}>ROUTER</text>
        <text x="330" y="20" {...TEXT.label}>SPECIALISTS</text>
        <text x="590" y="20" {...TEXT.label}>TOOLS</text>

        {/* START */}
        <circle cx="46" cy="232" r="17" {...nodeStyles.box} />
        <text x="46" y="236" textAnchor="middle" {...TEXT.mono} fontSize="8">
          START
        </text>

        <path d="M63 232 H126" {...nodeStyles.edge} markerEnd="url(#arrow)" />

        {/* Supervisor */}
        <rect x="130" y="206" width="140" height="52" rx="10" {...nodeStyles.accentBox} />
        <text x="200" y="228" textAnchor="middle" {...TEXT.title} fill="var(--color-signal)">
          supervisor
        </text>
        <text x="200" y="244" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          set_intent
        </text>

        {/* Supervisor → agents */}
        {AGENTS.map((a) => (
          <path
            key={`edge-${a.name}`}
            d={`M270 232 C 310 232, 310 ${a.y}, 346 ${a.y}`}
            {...nodeStyles.edge}
            markerEnd="url(#arrow)"
          />
        ))}

        {AGENTS.map((a) => (
          <g key={a.name}>
            {/* Agent node */}
            <rect x="350" y={a.y - 26} width="164" height="52" rx="10" {...nodeStyles.box} />
            <text x="432" y={a.y + 4} textAnchor="middle" {...TEXT.mono} fontSize="11" fill="var(--color-ink)">
              {a.name}
            </text>

            {/* Agent → its ToolNode */}
            <path d={`M514 ${a.y} H 586`} {...nodeStyles.edge} markerEnd="url(#arrow)" />
            {/* Tool results flow back */}
            <path
              d={`M586 ${a.y + 12} H 514`}
              {...nodeStyles.edge}
              strokeDasharray="3 3"
              markerEnd="url(#arrow)"
            />

            {/* Tool cluster */}
            <rect
              x="590"
              y={a.y - 26 - (a.tools.length > 3 ? 18 : 8)}
              width="286"
              height={a.tools.length * 22 + 22}
              rx="10"
              fill="none"
              stroke="var(--color-rule)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {a.tools.map((t, i) => {
              const ty = a.y - 26 - (a.tools.length > 3 ? 18 : 8) + 24 + i * 22
              const policy = POLICY_TOOLS.has(t)
              return (
                <g key={t}>
                  <circle
                    cx="606"
                    cy={ty - 4}
                    r="3.5"
                    fill={policy ? 'var(--color-signal)' : 'var(--color-rule-strong)'}
                  />
                  <text
                    x="618"
                    y={ty}
                    {...TEXT.mono}
                    fill={policy ? 'var(--color-signal)' : 'var(--color-ink-muted)'}
                  >
                    {t}
                  </text>
                </g>
              )
            })}
          </g>
        ))}

        {/* Silent transfers between specialists */}
        <path
          d="M360 118 C 320 150, 320 174, 360 206"
          {...nodeStyles.edge}
          stroke="var(--color-signal)"
          strokeDasharray="4 4"
          markerEnd="url(#arrow)"
        />
        <path
          d="M360 258 C 320 290, 320 314, 360 346"
          {...nodeStyles.edge}
          stroke="var(--color-signal)"
          strokeDasharray="4 4"
          markerEnd="url(#arrow)"
        />
        <text x="246" y="300" {...TEXT.mono} fill="var(--color-signal)" fontSize="9">
          silent transfer
        </text>

        {/* Escalation */}
        <path d="M432 398 V 438" {...nodeStyles.edge} markerEnd="url(#arrow)" />
        <rect x="350" y="438" width="164" height="26" rx="13" {...nodeStyles.box} />
        <text x="432" y="455" textAnchor="middle" {...TEXT.mono} fontSize="9">
          human escalation
        </text>
      </svg>
    </DiagramFrame>
  )
}
