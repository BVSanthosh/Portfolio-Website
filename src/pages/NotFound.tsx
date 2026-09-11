import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../content/profile'

export function NotFound() {
  useEffect(() => {
    document.title = `Not found — ${profile.name}`
  }, [])

  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-24">
      <p className="label mb-6">404</p>
      <h1 className="display max-w-[16ch] text-[clamp(2.5rem,8vw,5rem)] text-balance">
        That page routed to a node that does not exist.
      </h1>
      <Link to="/" className="link-draw mt-8 self-start text-signal">
        ← Back to the start
      </Link>
    </section>
  )
}
