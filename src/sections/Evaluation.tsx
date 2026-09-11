import { Link } from 'react-router-dom'
import { getProject } from '../content/projects'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { EvalTable } from '../components/EvalTable'

/**
 * The argument of the whole site. Anyone can demo an agent; the differentiator
 * is a graded suite and the willingness to publish the number that is not 100%.
 */
export function Evaluation() {
  const project = getProject('dental-receptionist')
  if (!project?.evals) return null
  const { evals } = project

  const totalScenarios = evals.suites.reduce((n, s) => n + s.scenarios, 0)

  return (
    <section
      id="evaluation"
      className="scroll-mt-24 border-y border-rule bg-paper-sunk py-24 md:py-36"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="02 / Evaluation"
          title="A demo proves it can work. An eval proves it does."
          intro={
            <>
              <p>{evals.intro}</p>
              <p className="mt-5 text-base text-ink-muted">
                Results below are from{' '}
                <Link to="/work/dental-receptionist" className="link-draw text-ink">
                  {project.name}
                </Link>
                .
              </p>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="min-w-0 lg:col-span-4">
            <h3 className="label mb-4">The harness</h3>
            <p className="leading-relaxed text-ink-soft text-pretty">{evals.harness}</p>

            <dl className="mt-10 grid grid-cols-2 gap-px bg-rule">
              <div className="bg-paper-sunk pr-4 pt-4">
                <dt className="label">Scenarios</dt>
                <dd className="display mt-1 text-4xl">{totalScenarios}</dd>
              </div>
              <div className="bg-paper-sunk pl-4 pr-4 pt-4">
                <dt className="label">Suites</dt>
                <dd className="display mt-1 text-4xl">{evals.suites.length}</dd>
              </div>
            </dl>

            <p className="mt-10 border-l-2 border-signal pl-5 text-sm leading-relaxed text-ink-soft text-pretty">
              {evals.reflection}
            </p>

            <Link
              to="/work/dental-receptionist"
              className="link-draw mt-8 inline-block text-sm font-medium text-signal"
            >
              Full case study →
            </Link>
          </Reveal>

          <Reveal delay={120} className="min-w-0 lg:col-span-8">
            <EvalTable suites={evals.suites} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
