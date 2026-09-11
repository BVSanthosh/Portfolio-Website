/**
 * The signature mark: a stylised supervisor-routed agent graph that draws
 * itself once on load. Decorative only — hidden from assistive tech by the
 * `aria-hidden` on its container in Hero.
 */
export function GraphMark() {
  const edges: { d: string; delay: number }[] = [
    { d: 'M96 160 C 160 160, 168 78, 232 78', delay: 0.35 },
    { d: 'M96 160 C 160 160, 168 160, 232 160', delay: 0.5 },
    { d: 'M96 160 C 160 160, 168 242, 232 242', delay: 0.65 },
    { d: 'M300 78 C 348 78, 356 46, 404 46', delay: 0.95 },
    { d: 'M300 78 C 348 78, 356 110, 404 110', delay: 1.05 },
    { d: 'M300 160 C 348 160, 356 128, 404 128', delay: 1.15 },
    { d: 'M300 160 C 348 160, 356 192, 404 192', delay: 1.25 },
    { d: 'M300 242 C 348 242, 356 210, 404 210', delay: 1.35 },
    { d: 'M300 242 C 348 242, 356 274, 404 274', delay: 1.45 },
    // Silent hand-offs between the specialists.
    { d: 'M266 104 C 240 132, 240 132, 266 134', delay: 1.7 },
    { d: 'M266 186 C 240 214, 240 214, 266 216', delay: 1.8 },
  ]

  const agents = [
    { y: 78, label: 'booking' },
    { y: 160, label: 'modification' },
    { y: 242, label: 'confirmation' },
  ]

  const tools = [46, 110, 128, 192, 210, 274]

  return (
    <svg viewBox="0 0 480 320" fill="none" className="h-auto w-full" role="presentation">
      <g stroke="var(--color-rule-strong)" strokeWidth="1.25" fill="none">
        {edges.map((e, i) => (
          <path
            key={i}
            d={e.d}
            strokeDasharray="200"
            strokeDashoffset="200"
            style={{
              animation: `trace 1.1s var(--ease-out-soft) ${e.delay}s forwards`,
            }}
          />
        ))}
      </g>

      {/* Supervisor */}
      <g style={{ animation: 'rise 0.8s var(--ease-out-soft) 0.15s both' }}>
        <rect
          x="20"
          y="141"
          width="76"
          height="38"
          rx="19"
          fill="var(--color-paper)"
          stroke="var(--color-signal)"
          strokeWidth="1.25"
        />
        <text
          x="58"
          y="164"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill="var(--color-signal)"
        >
          supervisor
        </text>
      </g>

      {/* Specialist agents */}
      {agents.map((a, i) => (
        <g
          key={a.label}
          style={{ animation: `rise 0.8s var(--ease-out-soft) ${0.75 + i * 0.12}s both` }}
        >
          <rect
            x="232"
            y={a.y - 19}
            width="68"
            height="38"
            rx="19"
            fill="var(--color-paper)"
            stroke="var(--color-rule-strong)"
            strokeWidth="1.25"
          />
          <text
            x="266"
            y={a.y + 4}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fill="var(--color-ink-muted)"
          >
            {a.label}
          </text>
        </g>
      ))}

      {/* Tool nodes */}
      {tools.map((y, i) => (
        <g key={y} style={{ animation: `rise 0.7s var(--ease-out-soft) ${1.35 + i * 0.07}s both` }}>
          <circle cx="404" cy={y} r="5" fill="var(--color-paper)" stroke="var(--color-rule-strong)" strokeWidth="1.25" />
          <circle cx="404" cy={y} r="2" fill="var(--color-ink-muted)" />
        </g>
      ))}

      <text
        x="404"
        y="304"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.12em"
        fill="var(--color-ink-muted)"
        style={{ animation: 'rise 0.8s var(--ease-out-soft) 2s both' }}
      >
        TOOLS
      </text>
    </svg>
  )
}
