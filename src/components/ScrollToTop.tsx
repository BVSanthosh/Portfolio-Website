import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Route changes land at the top. A route carrying a hash — a provenance tag
 * pointing at an experience entry, say — scrolls to that element instead,
 * which React Router does not do on its own.
 *
 * The retries matter: arriving from another route, the target sits thousands of
 * pixels down a page that is still settling as fonts land, so a single attempt
 * on the first frame either misses the element or scrolls to a stale offset.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    const timers: number[] = []
    let settled = false

    const attempt = (smooth: boolean) => {
      const el = document.getElementById(id)
      if (!el) return
      el.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'start' })
      settled = true
    }

    // First pass as soon as the route has painted, then correct for late layout
    // shifts. Once we have landed, later passes only nudge without re-animating.
    timers.push(window.setTimeout(() => attempt(false), 0))
    timers.push(window.setTimeout(() => attempt(!settled), 120))
    timers.push(window.setTimeout(() => attempt(false), 450))

    return () => timers.forEach(clearTimeout)
  }, [pathname, hash])

  return null
}
