import { useState } from 'react'
import { profile } from '../content/profile'
import { Reveal } from '../components/Reveal'

/**
 * No contact form. A form on a static site either needs a third-party endpoint
 * or silently goes nowhere, and a hiring manager is going to email you anyway —
 * so the address is the interface, with one click to copy it.
 */
export function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked — the mailto link beside this still works.
    }
  }

  return (
    <section id="contact" className="shell scroll-mt-24 py-24 md:py-40">
      <Reveal>
        <p className="label mb-8">05 / Contact</p>
        <h2 className="display max-w-[16ch] text-[clamp(2.5rem,8vw,5.5rem)] text-balance">
          {profile.availability.open
            ? 'Currently looking for the right team.'
            : "Always happy to talk shop."}
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
          {profile.availability.text}. If you are building agentic systems and care whether they
          behave — or you just want to argue about where policy belongs in an LLM application — I
          would like to hear from you.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-paper transition-opacity hover:opacity-85"
          >
            <span className="font-mono text-sm">{profile.email}</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <button
            type="button"
            onClick={copy}
            className="rounded-full border border-rule-strong px-5 py-4 font-mono text-sm transition-colors hover:border-ink"
          >
            {copied ? 'Copied' : 'Copy address'}
          </button>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <li>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="link-draw text-ink-soft hover:text-ink"
            >
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="link-draw text-ink-soft hover:text-ink"
            >
              GitHub ↗
            </a>
          </li>
        </ul>
      </Reveal>
    </section>
  )
}
