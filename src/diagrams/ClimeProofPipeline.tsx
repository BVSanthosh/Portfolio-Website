import { DiagramFrame } from './DiagramFrame'
import { TEXT, nodeStyles } from './tokens'

const PROVIDERS = [
  { y: 82, title: 'ACIS · PRISM grid', sub: 'heat · cold · precipitation' },
  { y: 150, title: 'ACIS · GHCN-Daily', sub: 'station records · snow' },
  { y: 218, title: 'CarbonPlan wildfire', sub: '30 m zarr · vectorised' },
]

const OUTPUTS = [
  { y: 173, label: 'records.jsonl' },
  { y: 211, label: 'metrics_long.csv' },
  { y: 249, label: 'metrics_wide.csv' },
]

/**
 * Address in, auditable record out. The signal colour marks the traceability
 * path — the response cache and the record that carries its hashes — because
 * that, not the arithmetic, is what makes the output usable in an assessment.
 */
export function ClimeProofPipeline() {
  return (
    <DiagramFrame
      caption="Addresses are geocoded, then each provider fills the metrics it owns — point sources once per location, gridded stores once per batch. Every raw response is cached and hashed, and the hash travels into the record, so any value can be traced back to the bytes it was computed from. No model anywhere: identical inputs always produce identical records."
      legend={[
        { colour: 'var(--color-signal)', label: 'traceability' },
        { colour: 'var(--color-rule-strong)', label: 'data flow' },
      ]}
    >
      <svg viewBox="0 0 900 430" className="h-auto w-full" role="img" aria-labelledby="climeproof-title">
        <title id="climeproof-title">
          ClimeProof pipeline: an address, coordinates or CSV batch is geocoded by the U.S. Census
          Geocoder, with unplaceable rows written to their own file. Providers for the ACIS PRISM
          grid, ACIS GHCN-Daily stations and CarbonPlan wildfire data fill a versioned 77-metric
          pydantic record, through a raw-response cache whose sha256 hashes become each value’s
          provenance. Records are written as JSONL and long and wide CSVs; a separate compare step
          cross-checks against NOAA normals and Daymet.
        </title>

        <defs>
          <marker id="arrow4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--color-rule-strong)" />
          </marker>
          <marker id="arrow4s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--color-signal)" />
          </marker>
        </defs>

        {/* Column headings */}
        <text x="24" y="28" {...TEXT.label}>INPUT</text>
        <text x="200" y="28" {...TEXT.label}>GEOCODE</text>
        <text x="390" y="28" {...TEXT.label}>PROVIDERS</text>
        <text x="630" y="28" {...TEXT.label}>RECORD</text>
        <text x="790" y="28" {...TEXT.label}>OUTPUT</text>

        {/* ---- Input ---- */}
        <rect x="24" y="182" width="150" height="48" rx="10" {...nodeStyles.box} />
        <text x="99" y="203" textAnchor="middle" {...TEXT.title}>Address / coords</text>
        <text x="99" y="219" textAnchor="middle" {...TEXT.mono}>or a CSV batch</text>

        <path d="M174 206 H 196" {...nodeStyles.edge} markerEnd="url(#arrow4)" />

        {/* ---- Geocode ---- */}
        <rect x="200" y="182" width="150" height="48" rx="10" {...nodeStyles.box} />
        <text x="275" y="203" textAnchor="middle" {...TEXT.title}>Census Geocoder</text>
        <text x="275" y="219" textAnchor="middle" {...TEXT.mono}>single · batch ≤ 10k</text>

        {/* Unplaceable rows are reported, never dropped */}
        <path d="M275 230 V 296" {...nodeStyles.edge} strokeDasharray="4 4" markerEnd="url(#arrow4)" />
        <rect
          x="205"
          y="300"
          width="140"
          height="34"
          rx="8"
          fill="none"
          stroke="var(--color-rule-strong)"
          strokeWidth="1.25"
          strokeDasharray="4 4"
        />
        <text x="275" y="321" textAnchor="middle" {...TEXT.mono} fontSize="9">
          unplaced.csv + reason
        </text>

        {/* ---- Providers ---- */}
        {PROVIDERS.map((p) => (
          <g key={p.title}>
            <path
              d={`M350 206 C 368 206, 368 ${p.y}, 386 ${p.y}`}
              {...nodeStyles.edge}
              markerEnd="url(#arrow4)"
            />
            <rect x="390" y={p.y - 26} width="200" height="52" rx="10" {...nodeStyles.box} />
            <text x="490" y={p.y - 4} textAnchor="middle" {...TEXT.title}>
              {p.title}
            </text>
            <text x="490" y={p.y + 13} textAnchor="middle" {...TEXT.mono}>
              {p.sub}
            </text>

            {/* Into the record */}
            <path
              d={`M590 ${p.y} C 608 ${p.y}, 608 206, 626 206`}
              {...nodeStyles.edge}
              markerEnd="url(#arrow4)"
            />
          </g>
        ))}

        {/* The providers as a group: the cache sits under all of them, not one */}
        <rect
          x="382"
          y="46"
          width="216"
          height="208"
          rx="12"
          fill="none"
          stroke="var(--color-rule)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M490 254 V 296"
          {...nodeStyles.edge}
          stroke="var(--color-signal)"
          strokeDasharray="4 4"
          markerEnd="url(#arrow4s)"
        />
        <text x="500" y="279" {...TEXT.mono} fontSize="9" fill="var(--color-signal)">
          every raw response
        </text>

        <rect x="390" y="300" width="200" height="52" rx="10" {...nodeStyles.accentBox} />
        <text x="490" y="322" textAnchor="middle" {...TEXT.title} fill="var(--color-signal)">
          Raw-response cache
        </text>
        <text x="490" y="339" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          request + sha256
        </text>

        {/* The hash becomes provenance */}
        <path
          d="M590 326 C 612 326, 610 252, 626 252"
          {...nodeStyles.edge}
          stroke="var(--color-signal)"
          strokeDasharray="4 4"
          markerEnd="url(#arrow4s)"
        />

        {/* ---- Record ---- */}
        <rect x="630" y="150" width="130" height="112" rx="10" {...nodeStyles.accentBox} />
        <text x="695" y="176" textAnchor="middle" {...TEXT.title} fill="var(--color-signal)">
          pydantic record
        </text>
        <text x="695" y="198" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          77 metrics
        </text>
        <text x="695" y="214" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          value · status
        </text>
        <text x="695" y="230" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          provenance
        </text>
        <text x="695" y="246" textAnchor="middle" {...TEXT.mono} fill="var(--color-signal)">
          versioned schema
        </text>

        {/* Quality control runs alongside, not in the record path */}
        <path d="M695 262 V 296" {...nodeStyles.edge} strokeDasharray="4 4" markerEnd="url(#arrow4)" />
        <rect
          x="630"
          y="300"
          width="130"
          height="52"
          rx="10"
          fill="none"
          stroke="var(--color-rule-strong)"
          strokeWidth="1.25"
          strokeDasharray="4 4"
        />
        <text x="695" y="322" textAnchor="middle" {...TEXT.mono} fill="var(--color-ink)">
          compare · QC
        </text>
        <text x="695" y="339" textAnchor="middle" {...TEXT.mono} fontSize="9">
          NOAA normals · Daymet
        </text>

        {/* ---- Outputs ---- */}
        {OUTPUTS.map((o) => (
          <g key={o.label}>
            <path
              d={`M760 206 C 772 206, 772 ${o.y}, 786 ${o.y}`}
              {...nodeStyles.edge}
              markerEnd="url(#arrow4)"
            />
            <rect x="790" y={o.y - 15} width="96" height="30" rx="8" {...nodeStyles.box} />
            <text x="838" y={o.y + 4} textAnchor="middle" {...TEXT.mono} fontSize="9" fill="var(--color-ink)">
              {o.label}
            </text>
          </g>
        ))}

        {/* The five states every metric can be in */}
        <text x="24" y="404" {...TEXT.mono} fontSize="9">
          every metric, in every record, is exactly one of:
        </text>
        <text x="300" y="404" {...TEXT.mono} fontSize="9" fill="var(--color-signal)">
          OK · N/A · NO_DATA · NOT_IMPLEMENTED · ERROR
        </text>
      </svg>
    </DiagramFrame>
  )
}
