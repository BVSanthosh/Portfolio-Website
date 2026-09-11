import type { ReactNode } from 'react'

type Props = {
  /** The small monospace eyebrow, e.g. "02 / Selected work". */
  eyebrow: string
  title: string
  intro?: ReactNode
}

export function SectionHeading({ eyebrow, title, intro }: Props) {
  return (
    <header className="mb-14 md:mb-20">
      <div className="mb-6 flex items-center gap-4">
        <span className="label whitespace-nowrap">{eyebrow}</span>
        <span aria-hidden className="h-px flex-1 bg-rule" />
      </div>
      <h2 className="display text-[clamp(2.25rem,6vw,4rem)] max-w-3xl text-balance">{title}</h2>
      {intro ? (
        <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
          {intro}
        </div>
      ) : null}
    </header>
  )
}
