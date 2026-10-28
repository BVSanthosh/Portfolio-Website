import { DiagramFrame } from './DiagramFrame'
import { TEXT, nodeStyles } from './tokens'

const PATHS = [
  {
    y: 110,
    device: ['GS1 barcode', 'raw payload, undecoded'],
    endpoint: '/scans/barcode',
    server: ['GS1 decode', 'deterministic · no LLM'],
    llm: false,
  },
  {
    y: 200,
    device: ['ML Kit OCR', 'on-device · rows rebuilt'],
    endpoint: '/scans/text',
    server: ['Gemini extraction', 'JSON schema · temp 0'],
    llm: true,
  },
  {
    y: 290,
    device: ['Manual entry', 'typed or corrected fields'],
    endpoint: '/scans/manual',
    server: ['No extraction', 'fields used as given'],
    llm: false,
  },
]

/**
 * Three ways into one verdict. The diagram has to carry two things: every path
 * converges on a single server-side verify step, and the language model sits on
 * exactly one of the three paths.
 */
export function ScannerFlow() {
  return (
    <DiagramFrame
      caption="Three ways to read a pack, one place to judge it. The client captures and sends; the server extracts, normalises and decides — the device never computes a verdict, because a verdict the device computes is one it can forge. Only the OCR path touches a language model, and if the model is unavailable it falls back to a regex parser rather than failing."
      legend={[
        { colour: 'var(--color-signal)', label: 'LLM step' },
        { colour: 'var(--color-rule-strong)', label: 'deterministic' },
      ]}
    >
      <svg viewBox="0 0 900 420" className="h-auto w-full" role="img" aria-labelledby="scanner-title">
        <title id="scanner-title">
          Medicine scanner flow: on the device, a GS1 barcode, ML Kit OCR text or manually entered
          fields are sent to three FastAPI endpoints. The barcode is decoded deterministically, OCR
          text is extracted by Gemini with a regex fallback, and manual fields pass straight
          through. All three converge on one verify step that checks a PostgreSQL register and
          returns the fields and a verdict in a single round trip.
        </title>

        <defs>
          <marker id="arrow3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--color-rule-strong)" />
          </marker>
        </defs>

        {/* ---- Lanes ---- */}
        <text x="24" y="40" {...TEXT.label}>ON DEVICE · REACT NATIVE</text>
        <rect
          x="24"
          y="56"
          width="252"
          height="290"
          rx="12"
          fill="none"
          stroke="var(--color-rule-strong)"
          strokeWidth="1.25"
          strokeDasharray="5 4"
        />

        <text x="376" y="40" {...TEXT.label}>SERVER · FASTAPI</text>
        <rect
          x="376"
          y="56"
          width="500"
          height="290"
          rx="12"
          fill="none"
          stroke="var(--color-rule-strong)"
          strokeWidth="1.25"
          strokeDasharray="5 4"
        />

        {PATHS.map((p) => {
          const serverBox = p.llm ? nodeStyles.accentBox : nodeStyles.box
          const serverInk = p.llm ? 'var(--color-signal)' : undefined
          const boxH = p.llm ? 64 : 52
          return (
            <g key={p.endpoint}>
              {/* Device input */}
              <rect x="40" y={p.y - 26} width="220" height="52" rx="10" {...nodeStyles.box} />
              <text x="150" y={p.y - 4} textAnchor="middle" {...TEXT.title}>
                {p.device[0]}
              </text>
              <text x="150" y={p.y + 13} textAnchor="middle" {...TEXT.mono}>
                {p.device[1]}
              </text>

              {/* Across the network */}
              <path d={`M260 ${p.y} H 392`} {...nodeStyles.edge} markerEnd="url(#arrow3)" />
              <text x="326" y={p.y - 8} textAnchor="middle" {...TEXT.mono} fontSize="9" fill="var(--color-ink)">
                {p.endpoint}
              </text>

              {/* Per-path server step */}
              <rect
                x="396"
                y={p.y - boxH / 2}
                width="170"
                height={boxH}
                rx="10"
                {...serverBox}
                {...(p.server[0] === 'No extraction'
                  ? { fill: 'none', strokeDasharray: '4 4' }
                  : {})}
              />
              <text
                x="481"
                y={p.y - (p.llm ? 10 : 4)}
                textAnchor="middle"
                {...TEXT.title}
                {...(serverInk ? { fill: serverInk } : {})}
              >
                {p.server[0]}
              </text>
              <text
                x="481"
                y={p.y + (p.llm ? 7 : 13)}
                textAnchor="middle"
                {...TEXT.mono}
                {...(serverInk ? { fill: serverInk } : {})}
              >
                {p.server[1]}
              </text>
              {p.llm ? (
                <text x="481" y={p.y + 23} textAnchor="middle" {...TEXT.mono} fontSize="9" fill="var(--color-signal)">
                  ↳ regex fallback
                </text>
              ) : null}

              {/* Converge on verify() */}
              <path
                d={`M566 ${p.y} C 588 ${p.y}, 584 200, 602 200`}
                {...nodeStyles.edge}
                markerEnd="url(#arrow3)"
              />
            </g>
          )
        })}

        {/* ---- The single verdict ---- */}
        <rect x="606" y="158" width="120" height="84" rx="10" {...nodeStyles.box} />
        <text x="666" y="186" textAnchor="middle" {...TEXT.title}>verify()</text>
        <text x="666" y="205" textAnchor="middle" {...TEXT.mono}>batch normalised</text>
        <text x="666" y="221" textAnchor="middle" {...TEXT.mono}>one verdict path</text>

        {/* Register lookup, there and back */}
        <path d="M726 192 H 752" {...nodeStyles.edge} markerEnd="url(#arrow3)" />
        <path d="M756 208 H 730" {...nodeStyles.edge} strokeDasharray="3 3" markerEnd="url(#arrow3)" />

        <rect x="756" y="170" width="106" height="60" rx="10" {...nodeStyles.box} />
        <text x="809" y="196" textAnchor="middle" {...TEXT.title}>PostgreSQL</text>
        <text x="809" y="213" textAnchor="middle" {...TEXT.mono} fontSize="9">
          batch register
        </text>

        {/* ---- Back to the phone ---- */}
        <path
          d="M666 242 V 378 H 150 V 350"
          {...nodeStyles.edge}
          strokeDasharray="4 4"
          markerEnd="url(#arrow3)"
        />
        <text x="408" y="400" textAnchor="middle" {...TEXT.mono}>
          fields + verdict (safe · unsafe · unknown) — one round trip
        </text>
      </svg>
    </DiagramFrame>
  )
}
