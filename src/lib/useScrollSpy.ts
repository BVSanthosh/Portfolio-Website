import { useEffect, useState } from 'react'

/**
 * Returns the id of whichever section is currently nearest the top of the
 * viewport, so the nav can mark it active.
 */
export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => {
      let found: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - offset <= 0) found = id
      }
      setActive(found)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return active
}
