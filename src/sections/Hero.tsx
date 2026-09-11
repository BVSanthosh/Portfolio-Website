import { profile } from '../content/profile'
import { GraphMark } from '../diagrams/GraphMark'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      {/* The graph mark sits behind the type on large screens as a quiet signature. */}
      <div
        aria-hidden
        // Only from xl: below that the mark would run under the subhead.
        className="pointer-events-none absolute -right-16 top-1/2 hidden w-[38rem] -translate-y-1/2 opacity-[0.55] xl:block"
      >
        <GraphMark />
      </div>

      <div className="shell relative py-24 md:py-36">
        <p
          className="label mb-8 flex items-center gap-3"
          style={{ animation: 'rise 0.7s var(--ease-out-soft) both' }}
        >
          <span>{profile.role}</span>
        </p>

        <h1
          className="display max-w-[20ch] text-[clamp(2.75rem,8.5vw,6.5rem)] text-balance"
          style={{ animation: 'rise 0.9s var(--ease-out-soft) 80ms both' }}
        >
          I build agentic AI systems&thinsp;—&thinsp;and{' '}
          <em className="italic text-signal">measure</em> whether they actually work.
        </h1>

        <p
          className="mt-9 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty md:text-xl"
          style={{ animation: 'rise 0.9s var(--ease-out-soft) 200ms both' }}
        >
          {profile.subhead}
        </p>

        <div
          className="mt-11 flex flex-wrap items-center gap-x-3 gap-y-4"
          style={{ animation: 'rise 0.9s var(--ease-out-soft) 300ms both' }}
        >
          <a
            href="#work"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-85"
          >
            Selected work
          </a>
          <a
            href="#evaluation"
            className="rounded-full border border-rule-strong px-6 py-3 text-sm font-medium transition-colors hover:border-ink"
          >
            See the eval results
          </a>
          <span aria-hidden className="mx-2 hidden h-5 w-px bg-rule sm:block" />
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="link-draw py-1 text-sm text-ink-soft hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="link-draw py-1 text-sm text-ink-soft hover:text-ink"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Three claims the rest of the page is obliged to substantiate. */}
      <div className="shell relative">
        <ul className="grid gap-px border-t border-rule bg-rule md:grid-cols-3">
          {profile.pillars.map((p, i) => (
            <li
              key={p.title}
              className="bg-paper px-1 py-9 md:px-7"
              style={{ animation: `rise 0.9s var(--ease-out-soft) ${380 + i * 90}ms both` }}
            >
              <h2 className="mb-2.5 font-mono text-[0.8125rem] font-medium tracking-tight">
                {p.title}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-ink-muted text-pretty">{p.body}</p>
              <a
                href={p.evidence}
                className="link-draw text-sm font-medium text-signal"
              >
                {p.evidenceLabel} →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
