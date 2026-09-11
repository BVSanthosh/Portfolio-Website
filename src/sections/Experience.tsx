import { Link } from 'react-router-dom'
import { experience } from '../content/experience'
import { profile } from '../content/profile'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'

export function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-24 py-24 md:py-36">
      <SectionHeading eyebrow="03 / Experience" title="Where I've worked." />

      <ol className="space-y-px bg-rule">
        {experience.map((role, i) => (
          <Reveal as="li" key={`${role.company}-${role.period}`} delay={i * 70} className="bg-paper">
            <article id={role.id} className="grid scroll-mt-24 gap-5 py-10 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <p className="label">{role.period}</p>
                {role.current ? (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-[0.6875rem] font-medium tracking-wide text-signal">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
                    Current
                  </p>
                ) : null}
              </div>

              <div className="md:col-span-9">
                <h3 className="text-xl font-medium">
                  {role.title}
                  <span className="text-ink-muted"> · {role.company}</span>
                </h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  <span className="rounded-full border border-rule px-2.5 py-1 font-mono text-[0.6875rem] text-ink-soft">
                    {role.employment}
                  </span>
                  <span className="font-mono text-[0.75rem] text-ink-muted">{role.location}</span>
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted text-pretty">
                  {role.context}
                </p>

                {role.highlights.length > 0 ? (
                  <ul className="mt-5 max-w-2xl space-y-2.5">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-3 leading-relaxed text-ink-soft text-pretty">
                        <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-rule-strong" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {role.caseStudy ? (
                  <Link
                    to={`/work/${role.caseStudy.slug}`}
                    className="link-draw mt-5 inline-block text-sm font-medium text-signal"
                  >
                    {role.caseStudy.label} →
                  </Link>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </ol>

      {/* Education and certification */}
      <Reveal className="mt-16 grid gap-px bg-rule border-t border-rule md:grid-cols-2">
        <div className="bg-paper py-9 md:pr-8">
          <p className="label mb-3">Education</p>
          <h3 className="text-lg font-medium">{profile.education.degree}</h3>
          <p className="mt-1 text-ink-soft">
            {profile.education.institution} · {profile.education.period}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted text-pretty">
            {profile.education.detail}
          </p>
        </div>
        <div className="bg-paper py-9 md:pl-8">
          <p className="label mb-3">Certification</p>
          <h3 className="text-lg font-medium">{profile.certification.name}</h3>
          <p className="mt-1 inline-flex items-center gap-1.5 text-signal">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
            {profile.certification.status}
          </p>
        </div>
      </Reveal>
    </section>
  )
}
