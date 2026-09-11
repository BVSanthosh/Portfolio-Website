import { useEffect, useRef, useState } from 'react'
import type { EvalSuite } from '../content/projects'

/**
 * Results of the LangSmith LLM-as-judge suites.
 *
 * Rendered as a table on wide screens and as a stack of cards below `md` —
 * the pass rate is the whole point of this component, so it must never end up
 * behind a horizontal scroll on a phone.
 */
export function EvalTable({ suites }: { suites: EvalSuite[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full min-w-0">
      {/* ---------------------------------------------------- Phones and tablets */}
      <ul className="space-y-px bg-rule md:hidden">
        {suites.map((s, i) => (
          <li key={s.suite} className="bg-paper py-6 first:pt-0">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-medium">{s.agent} agent</h3>
              <span
                className={`font-mono text-sm tabular-nums ${
                  s.passRate === 100 ? 'text-ink' : 'text-signal'
                }`}
              >
                {s.passRate}%
              </span>
            </div>

            <Bar passRate={s.passRate} run={run} delay={i * 140} />

            <p className="mt-3 font-mono text-[0.6875rem] text-ink-muted">
              {s.suite} · {s.scenarios} scenarios
            </p>

            <ul className="mt-3 space-y-1">
              {s.boundaries.map((b) => (
                <li key={b} className="flex gap-2 text-[0.8125rem] leading-snug text-ink-muted">
                  <span aria-hidden className="mt-[0.45rem] h-px w-2.5 shrink-0 bg-rule-strong" />
                  {b}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* ------------------------------------------------------------- Wide screens */}
      <table className="hidden w-full border-collapse text-left md:table">
        <caption className="sr-only">
          Evaluation pass rates by agent suite, graded by an LLM judge in LangSmith
        </caption>
        <thead>
          <tr className="border-b border-rule-strong">
            <th scope="col" className="label pb-3 font-medium">
              Suite
            </th>
            <th scope="col" className="label pb-3 font-medium">
              Scenarios
            </th>
            <th scope="col" className="label pb-3 font-medium">
              Pass rate
            </th>
          </tr>
        </thead>
        <tbody>
          {suites.map((s, i) => (
            <tr key={s.suite} className="border-b border-rule align-top">
              <th scope="row" className="py-6 pr-6 font-normal">
                <span className="block font-medium">{s.agent} agent</span>
                <span className="mt-1 block font-mono text-[0.6875rem] text-ink-muted">
                  {s.suite}
                </span>
                <ul className="mt-3 space-y-1">
                  {s.boundaries.map((b) => (
                    <li key={b} className="flex gap-2 text-[0.8125rem] leading-snug text-ink-muted">
                      <span aria-hidden className="mt-[0.45rem] h-px w-2.5 shrink-0 bg-rule-strong" />
                      {b}
                    </li>
                  ))}
                </ul>
              </th>

              <td className="py-6 pr-6 font-mono text-sm tabular-nums text-ink-soft">
                {s.scenarios}
              </td>

              <td className="w-[42%] py-6">
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-sm tabular-nums ${
                      s.passRate === 100 ? 'text-ink' : 'text-signal'
                    }`}
                  >
                    {s.passRate}%
                  </span>
                  <Bar passRate={s.passRate} run={run} delay={i * 140} className="mt-0 flex-1" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Bar({
  passRate,
  run,
  delay,
  className = 'mt-3',
}: {
  passRate: number
  run: boolean
  delay: number
  className?: string
}) {
  return (
    <span className={`block h-1.5 overflow-hidden rounded-full bg-rule ${className}`}>
      <span
        className={`block h-full rounded-full ${passRate === 100 ? 'bg-ink' : 'bg-signal'}`}
        style={{
          width: run ? `${passRate}%` : '0%',
          transition: `width 1.2s var(--ease-out-soft) ${delay}ms`,
        }}
      />
    </span>
  )
}
