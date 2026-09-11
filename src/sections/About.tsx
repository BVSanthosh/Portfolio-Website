import { profile } from '../content/profile'
import { Reveal } from '../components/Reveal'

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-rule bg-paper-sunk py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="flex items-center gap-4">
            <span className="label whitespace-nowrap">About</span>
            <span aria-hidden className="h-px flex-1 bg-rule lg:hidden" />
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          {profile.about.map((para, i) => (
            <Reveal key={i} delay={i * 90}>
              <p
                className={
                  i === 0
                    ? 'display mb-8 text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.15] text-balance'
                    : 'mb-6 text-lg leading-relaxed text-ink-soft text-pretty'
                }
              >
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={300}>
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-rule pt-8">
              <div>
                <dt className="label mb-1.5">Based in</dt>
                <dd className="text-sm">
                  {profile.location} · {profile.timezone}
                </dd>
              </div>
              <div>
                <dt className="label mb-1.5">Relocation</dt>
                <dd className="inline-flex items-center gap-1.5 text-sm">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
                  {profile.relocation}
                </dd>
              </div>
              <div>
                <dt className="label mb-1.5">Languages</dt>
                <dd className="text-sm">{profile.languages.join(' · ')}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
