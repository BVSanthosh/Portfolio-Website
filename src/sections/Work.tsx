import { Link } from 'react-router-dom'
import { featuredProjects, otherProjects } from '../content/projects'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { ProvenanceTag } from '../components/ProvenanceTag'
import { ProjectCarousel } from '../components/ProjectCarousel'

export function Work() {
  return (
    <section id="work" className="shell scroll-mt-24 py-24 md:py-36">
      <SectionHeading
        eyebrow="01 / Selected projects"
        title="Four systems, built end to end."
        intro={
          <p>
            Each of these has a full write-up: the problem, the architecture, the decisions I would
            defend in an interview, and what it actually achieved. Including the numbers that are
            not flattering.
          </p>
        }
      />

      <ul className="space-y-px bg-rule">
        {featuredProjects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 80} className="bg-paper">
            <Link
              to={`/work/${p.slug}`}
              className="group grid gap-6 py-10 transition-colors md:grid-cols-12 md:gap-8 md:py-12"
            >
              <div className="md:col-span-3">
                <span className="label block">{p.period}</span>
                <span className="mt-2 inline-flex items-center gap-2 text-[0.6875rem] font-medium tracking-wide text-ink-muted">
                  <StatusDot status={p.status} />
                  {p.status}
                </span>
              </div>

              <div className="md:col-span-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="display text-3xl transition-colors group-hover:text-signal md:text-4xl">
                    {p.name}
                  </h3>
                  <ProvenanceTag provenance={p.provenance} interactive={false} />
                </div>
                <p className="mt-1.5 font-mono text-[0.8125rem] text-ink-muted">{p.subtitle}</p>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-soft text-pretty">{p.blurb}</p>
              </div>

              <div className="flex flex-col justify-between gap-6 md:col-span-3 md:items-end">
                <ul className="flex flex-wrap gap-1.5 md:justify-end">
                  {p.stack.slice(0, 5).map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-rule px-2.5 py-1 font-mono text-[0.6875rem] text-ink-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-signal">
                  Read the case study
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      {/* Secondary work, as a horizontal track. */}
      <Reveal className="mt-20">
        <ProjectCarousel projects={otherProjects} />
      </Reveal>
    </section>
  )
}

function StatusDot({ status }: { status: string }) {
  const live = status === 'Deployed' || status === 'Shipped to production'
  return (
    <span
      aria-hidden
      className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-signal' : 'bg-rule-strong'}`}
    />
  )
}
