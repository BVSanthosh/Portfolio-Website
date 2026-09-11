import { Link } from 'react-router-dom'
import type { Provenance } from '../content/projects'

const KIND_LABEL: Record<Provenance['kind'], string> = {
  Personal: 'Personal project',
  Company: 'Company project',
  Team: 'Team project',
}

/**
 * Says whether a project was paid work, team work, or built on his own time —
 * and, where there is a matching role, links straight to it on the experience
 * timeline so a recruiter can trace the two together without guessing.
 */
export function ProvenanceTag({
  provenance,
  className = '',
  interactive = true,
}: {
  provenance: Provenance
  className?: string
  /**
   * Set false where the tag sits inside another link — a project card, say.
   * Anchors cannot nest, so there it renders as plain text.
   */
  interactive?: boolean
}) {
  const { kind, org, roleId } = provenance
  const linked = interactive && Boolean(roleId)
  const label = KIND_LABEL[kind]

  const body = (
    <>
      <Dot kind={kind} />
      <span>{label}</span>
      {org ? (
        <>
          <span aria-hidden className="text-rule-strong">
            ·
          </span>
          <span className={linked ? 'underline decoration-rule-strong underline-offset-2' : ''}>
            {org}
          </span>
        </>
      ) : null}
    </>
  )

  // Wraps rather than escaping a narrow grid column; the dot stays on line one.
  const shell = `inline-flex max-w-full flex-wrap items-center gap-x-1.5 gap-y-0.5 rounded-2xl border border-rule px-2.5 py-1 font-mono text-[0.6875rem] leading-relaxed ${className}`

  if (!linked) {
    return <span className={`${shell} text-ink-muted`}>{body}</span>
  }

  return (
    <Link
      to={`/#${roleId}`}
      title={`See the ${org} role in the experience section`}
      className={`${shell} text-ink-soft transition-colors hover:border-rule-strong hover:text-ink`}
    >
      {body}
    </Link>
  )
}

/** Filled for paid work, hollow for team work, faint for personal. */
function Dot({ kind }: { kind: Provenance['kind'] }) {
  if (kind === 'Company') {
    return <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
  }
  if (kind === 'Team') {
    return (
      <span
        aria-hidden
        className="h-1.5 w-1.5 shrink-0 rounded-full border border-signal bg-transparent"
      />
    )
  }
  return <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-rule-strong" />
}
