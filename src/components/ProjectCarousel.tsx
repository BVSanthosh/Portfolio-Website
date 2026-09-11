import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../content/projects'
import { ProvenanceTag } from './ProvenanceTag'

/**
 * Horizontal, snapping carousel for the secondary projects.
 *
 * Scrolls natively (trackpad, touch, shift-wheel) with arrow buttons for mouse
 * users. Tabbing through the cards scrolls them into view on its own, so the
 * buttons are a convenience rather than the only way through.
 */
export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft >= max - 2)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  const step = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('li')
    // Fall back to most of a viewport if the card cannot be measured.
    const distance = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: distance * direction, behavior: 'smooth' })
  }

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-6">
        <h3 className="label">Also built</h3>

        <div className="flex gap-2">
          <ArrowButton direction="left" onClick={() => step(-1)} disabled={atStart} />
          <ArrowButton direction="right" onClick={() => step(1)} disabled={atEnd} />
        </div>
      </div>

      {/*
        The negative margin lets cards run to the screen edge while the matching
        padding keeps the first one aligned to the page gutter; scroll-padding
        makes snapped cards land on that same line.
      */}
      <ul
        ref={trackRef}
        className="-mx-6 flex snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 pb-5 md:-mx-12 md:scroll-pl-12 md:px-12"
        style={{ scrollbarWidth: 'thin' }}
      >
        {projects.map((p) => (
          <li key={p.slug} className="w-[19rem] shrink-0 snap-start sm:w-[21rem]">
            <Link
              to={`/work/${p.slug}`}
              className="group flex h-full flex-col rounded-lg border border-rule bg-paper p-6 transition-colors hover:border-rule-strong"
            >
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <span className="label">{p.period}</span>
                <span className="label whitespace-nowrap">{p.status}</span>
              </div>

              <h4 className="display text-2xl transition-colors group-hover:text-signal">
                {p.name}
              </h4>
              <p className="mt-1 font-mono text-[0.6875rem] leading-relaxed text-ink-muted">
                {p.subtitle}
              </p>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft text-pretty">
                {p.blurb}
              </p>

              <div className="mt-5">
                <ProvenanceTag provenance={p.provenance} interactive={false} />
              </div>

              <ul className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-rule px-2.5 py-1 font-mono text-[0.6875rem] text-ink-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-signal">
                Read the case study
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'left' | 'right'
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Previous projects' : 'Next projects'}
      className="grid h-9 w-9 place-items-center rounded-full border border-rule text-ink-soft transition-colors hover:border-ink hover:text-ink disabled:cursor-default disabled:border-rule disabled:text-rule-strong disabled:hover:border-rule"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        style={direction === 'left' ? { transform: 'scaleX(-1)' } : undefined}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  )
}
