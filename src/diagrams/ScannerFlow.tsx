import { DiagramFrame } from './DiagramFrame'
import { TEXT, nodeStyles } from './tokens'

/**
 * The device/server split. Two things the diagram has to carry: the photograph
 * never crosses the boundary, and the server half is designed but not yet built.
 */
export function ScannerFlow() {
  return (
    <DiagramFrame
      caption="The expensive-but-dumb step runs on the handset and the cheap-but-smart step runs on the server. Only extracted text crosses the network, so the user never waits on an image upload and camera images never leave the device. The device half is built; the server half is the architecture it is being built against."
      legend={[
        { colour: 'var(--color-signal)', label: 'built — on device' },
        { colour: 'var(--color-rule)', label: 'planned — backend' },
      ]}
    >
      <svg viewBox="0 0 900 300" className="h-auto w-full" role="img" aria-labelledby="scanner-title">
        <title id="scanner-title">
          Medicine scanner flow: camera capture and ML Kit OCR run on device and are implemented;
          only the extracted text is sent to a planned backend, where an LLM will parse it into
          structured fields for verification.
        </title>

        <defs>
          <marker id="arrow3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--color-rule-strong)" />
          </marker>
        </defs>

        {/* Device boundary */}
        <rect
          x="24"
          y="52"
          width="396"
          height="180"
          rx="12"
          fill="none"
          stroke="var(--color-signal)"
          strokeWidth="1.25"
          strokeDasharray="5 4"
        />
        <text x="40" y="42" {...TEXT.label} fill="var(--color-signal)">
          ON DEVICE · BUILT
        </text>

        <rect x="48" y="112" width="150" height="60" rx="10" {...nodeStyles.accentBox} />
        <text x="123" y="138" textAnchor="middle" {...TEXT.title} fill="var(--color-signal)">
          Camera capture
        </text>
        <text x="123" y="156" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          expo-camera
        </text>

        <path d="M198 142 H 246" {...nodeStyles.edge} stroke="var(--color-signal)" markerEnd="url(#arrow3)" />

        <rect x="250" y="112" width="150" height="60" rx="10" {...nodeStyles.accentBox} />
        <text x="325" y="138" textAnchor="middle" {...TEXT.title} fill="var(--color-signal)">
          ML Kit OCR
        </text>
        <text x="325" y="156" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          on-device, ~ms
        </text>

        {/* The boundary crossing */}
        <path d="M420 142 H 520" {...nodeStyles.edge} strokeDasharray="4 4" markerEnd="url(#arrow3)" />
        <text x="470" y="132" textAnchor="middle" {...TEXT.mono} fill="var(--color-ink)">
          text only
        </text>
        <text x="470" y="162" textAnchor="middle" {...TEXT.mono} fontSize="9">
          no image upload
        </text>

        {/* Backend boundary */}
        <rect
          x="524"
          y="52"
          width="352"
          height="180"
          rx="12"
          fill="none"
          stroke="var(--color-rule)"
          strokeWidth="1.25"
          strokeDasharray="5 4"
        />
        <text x="540" y="42" {...TEXT.label}>
          BACKEND · PLANNED
        </text>

        <rect x="548" y="112" width="150" height="60" rx="10" fill="none" stroke="var(--color-rule)" strokeWidth="1.25" strokeDasharray="4 4" />
        <text x="623" y="138" textAnchor="middle" {...TEXT.title} fill="var(--color-ink-muted)">LLM parser</text>
        <text x="623" y="156" textAnchor="middle" {...TEXT.mono}>lightweight model</text>

        <path d="M698 142 H 746" {...nodeStyles.edge} strokeDasharray="4 4" markerEnd="url(#arrow3)" />

        <rect x="750" y="104" width="108" height="76" rx="10" fill="none" stroke="var(--color-rule)" strokeWidth="1.25" strokeDasharray="4 4" />
        <text x="804" y="126" textAnchor="middle" {...TEXT.mono} fontSize="9">name</text>
        <text x="804" y="142" textAnchor="middle" {...TEXT.mono} fontSize="9">manufacturer</text>
        <text x="804" y="158" textAnchor="middle" {...TEXT.mono} fontSize="9">batch</text>
        <text x="804" y="174" textAnchor="middle" {...TEXT.mono} fontSize="9">expiry</text>

        <text x="804" y="200" textAnchor="middle" {...TEXT.mono} fontSize="9" fill="var(--color-ink-muted)">
          structured fields
        </text>

        {/* Return path */}
        <path
          d="M804 232 C 804 268, 123 268, 123 180"
          {...nodeStyles.edge}
          strokeDasharray="4 4"
          markerEnd="url(#arrow3)"
        />
        <text x="460" y="284" textAnchor="middle" {...TEXT.mono} fontSize="9">
          verification result returned to the user
        </text>
      </svg>
    </DiagramFrame>
  )
}
