import type { ReactNode } from 'react'

/**
 * Wraps a diagram so wide content scrolls inside its own box rather than
 * making the page scroll sideways, and carries the caption/legend.
 */
export function DiagramFrame({
  children,
  caption,
  legend,
}: {
  children: ReactNode
  caption: string
  legend?: { colour: string; label: string }[]
}) {
  return (
    <figure className="w-full min-w-0">
      <div className="w-full min-w-0 overflow-x-auto rounded-lg border border-rule bg-paper p-4 md:p-8">
        <div className="min-w-[46rem]">{children}</div>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-muted text-pretty">{caption}</p>
        {legend ? (
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legend.map((l) => (
              <li key={l.label} className="flex items-center gap-2 font-mono text-[0.6875rem] text-ink-muted">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ background: l.colour }}
                />
                {l.label}
              </li>
            ))}
          </ul>
        ) : null}
      </figcaption>
    </figure>
  )
}
