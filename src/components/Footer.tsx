import { profile } from '../content/profile'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-rule py-10">
      <div className="shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.75rem] text-ink-muted">
          © {year} {profile.name}
        </p>
        <p className="font-mono text-[0.75rem] text-ink-muted">
          Built with React, TypeScript and Tailwind.
        </p>
      </div>
    </footer>
  )
}
