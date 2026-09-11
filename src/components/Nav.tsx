import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../content/profile'
import { useTheme } from '../lib/useTheme'
import { useScrollSpy } from '../lib/useScrollSpy'

const SECTIONS = [
  { id: 'work', label: 'Projects' },
  { id: 'evaluation', label: 'Evaluation' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'contact', label: 'Contact' },
]
const SECTION_IDS = SECTIONS.map((s) => s.id)

export function Nav() {
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const active = useScrollSpy(SECTION_IDS)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
          scrolled
            ? 'border-rule bg-paper/85 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-6 md:h-20">
          <Link
            to="/"
            className="group flex items-baseline gap-2.5 font-mono text-sm tracking-tight"
            aria-label="Home"
          >
            <span className="font-medium">VSB</span>
            {profile.availability.open ? (
              <span className="hidden items-center gap-1.5 text-ink-muted sm:inline-flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-60 [animation:pulse-node_2.4s_ease-in-out_infinite]" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                </span>
                <span className="text-[0.6875rem] tracking-wide">available</span>
              </span>
            ) : null}
          </Link>

          <div className="flex items-center gap-1">
            {onHome ? (
              <ul className="mr-2 hidden items-center gap-1 md:flex">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={active === s.id ? 'true' : undefined}
                      className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                        active === s.id
                          ? 'text-ink'
                          : 'text-ink-muted hover:text-ink'
                      }`}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <Link
                to="/"
                className="mr-2 hidden rounded-full px-3 py-1.5 text-sm text-ink-muted transition-colors hover:text-ink md:block"
              >
                ← All projects
              </Link>
            )}

            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="grid h-9 w-9 place-items-center rounded-full border border-rule text-ink-soft transition-colors hover:border-rule-strong hover:text-ink"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <a
              href={`mailto:${profile.email}`}
              className="ml-1 hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-85 sm:block"
            >
              Get in touch
            </a>
          </div>
        </nav>
      </header>
    </>
  )
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}
