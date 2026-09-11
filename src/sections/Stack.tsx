import { stack } from '../content/stack'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'

export function Stack() {
  return (
    <section
      id="stack"
      className="scroll-mt-24 border-y border-rule bg-paper-sunk py-24 md:py-36"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="04 / Tech stack"
          title="What I reach for, and why."
          intro={
            <p>
              A list of technologies says very little on its own. The note under each group is the
              part worth reading.
            </p>
          }
        />

        <ul className="grid gap-px bg-rule md:grid-cols-2 lg:grid-cols-3">
          {stack.map((group, i) => (
            <Reveal as="li" key={group.title} delay={i * 60} className="bg-paper-sunk p-7">
              <h3 className="mb-2 font-mono text-[0.8125rem] font-medium">{group.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-ink-muted text-pretty">
                {group.note}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-rule bg-paper px-2.5 py-1 font-mono text-[0.6875rem] text-ink-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
