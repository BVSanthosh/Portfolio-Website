import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject, projects } from '../content/projects'
import { profile } from '../content/profile'
import { Reveal } from '../components/Reveal'
import { ProvenanceTag } from '../components/ProvenanceTag'
import { EvalTable } from '../components/EvalTable'
import { NotFound } from './NotFound'
import { DentalGraph } from '../diagrams/DentalGraph'
import { EduAgentArchitecture } from '../diagrams/EduAgentArchitecture'
import { ScannerFlow } from '../diagrams/ScannerFlow'
import { ClimeProofPipeline } from '../diagrams/ClimeProofPipeline'

const DIAGRAMS = {
  dental: DentalGraph,
  eduagent: EduAgentArchitecture,
  scanner: ScannerFlow,
  climeproof: ClimeProofPipeline,
}

export function CaseStudy() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined

  useEffect(() => {
    if (project) document.title = `${project.name} — ${profile.name}`
  }, [project])

  if (!project) return <NotFound />

  const Diagram = project.diagram ? DIAGRAMS[project.diagram] : null
  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <article>
      {/* ---------------------------------------------------------------- Header */}
      <header className="border-b border-rule">
        <div className="shell py-16 md:py-24">
          <Link to="/#work" className="link-draw label mb-10 inline-block hover:text-ink">
            ← Selected projects
          </Link>

          <p className="label mb-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{project.period}</span>
            <span aria-hidden className="h-px w-6 bg-rule-strong" />
            <span className="text-signal">{project.status}</span>
          </p>

          <div className="mb-6">
            <ProvenanceTag provenance={project.provenance} />
          </div>

          <h1 className="display max-w-[18ch] text-[clamp(2.5rem,7.5vw,5rem)] text-balance">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-ink-soft text-pretty">{project.subtitle}</p>

          {project.links.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={
                    l.primary
                      ? 'rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-85'
                      : 'rounded-full border border-rule-strong px-6 py-3 text-sm font-medium transition-colors hover:border-ink'
                  }
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {/* Headline facts */}
        <div className="shell">
          <dl className="grid gap-px border-t border-rule bg-rule sm:grid-cols-3">
            {project.facts.map((f) => (
              <div key={f.label} className="bg-paper py-8 sm:px-6 sm:first:pl-0">
                <dt className="label mb-2">{f.label}</dt>
                <dd className="display text-3xl md:text-4xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ---------------------------------------------------------------- Problem */}
      <section className="shell py-20 md:py-28">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <h2 className="label lg:col-span-3">The problem</h2>
          <p className="display text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.25] text-balance lg:col-span-9">
            {project.problem}
          </p>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- Diagram */}
      {Diagram ? (
        <section className="border-y border-rule bg-paper-sunk py-16 md:py-24">
          <div className="shell">
            <Reveal>
              <h2 className="label mb-10">Architecture</h2>
              <Diagram />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ---------------------------------------------------------------- Body */}
      <section className="shell py-20 md:py-28">
        {project.sections.map((s, i) => (
          <Reveal
            key={s.heading}
            delay={i * 60}
            className="grid min-w-0 gap-6 border-t border-rule py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-16"
          >
            <h2 className="text-xl font-medium lg:col-span-3">{s.heading}</h2>
            <div className="lg:col-span-9">
              {s.body.map((p, j) => (
                <p key={j} className="mb-5 text-lg leading-relaxed text-ink-soft text-pretty last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </section>

      {/* ---------------------------------------------------------------- Decisions */}
      <section className="border-y border-rule bg-paper-sunk py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <h2 className="label mb-3">Engineering decisions</h2>
            <p className="display mb-14 max-w-2xl text-[clamp(1.75rem,4vw,2.75rem)] text-balance">
              The trade-offs, and what I would say if you asked me to defend them.
            </p>
          </Reveal>

          <ol className="grid gap-px bg-rule md:grid-cols-2">
            {project.decisions.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 70} className="bg-paper-sunk p-7 md:p-9">
                <span className="label mb-4 block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-3 text-lg font-medium text-balance">{d.title}</h3>
                <p className="leading-relaxed text-ink-soft text-pretty">{d.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Evals */}
      {project.evals ? (
        <section className="shell py-20 md:py-28">
          <Reveal>
            <h2 className="label mb-3">Evaluation</h2>
            <p className="display mb-6 max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] text-balance">
              {project.evals.intro}
            </p>
            <p className="mb-14 max-w-2xl leading-relaxed text-ink-soft text-pretty">
              {project.evals.harness}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <EvalTable suites={project.evals.suites} />
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-12 max-w-2xl border-l-2 border-signal pl-6 leading-relaxed text-ink-soft text-pretty">
              {project.evals.reflection}
            </p>
          </Reveal>
        </section>
      ) : null}

      {/* ---------------------------------------------------------------- Outcome */}
      <section className="shell border-t border-rule py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <h2 className="label mb-6">Outcome</h2>
            <ul className="space-y-4">
              {project.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-lg leading-relaxed text-pretty">
                  <span aria-hidden className="mt-3.5 h-px w-4 shrink-0 bg-signal" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-6">
            <h2 className="label mb-6">Built with</h2>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-rule px-3 py-1.5 font-mono text-[0.75rem] text-ink-soft"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Next */}
      <nav className="border-t border-rule">
        <Link to={`/work/${next.slug}`} className="group block py-14 hover:bg-paper-sunk">
          <div className="shell">
            <p className="label mb-3">Next project</p>
            <p className="display text-[clamp(2rem,5vw,3.5rem)] transition-colors group-hover:text-signal">
              {next.name}
              <span className="ml-4 inline-block transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </p>
          </div>
        </Link>
      </nav>
    </article>
  )
}
