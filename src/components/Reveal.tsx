import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Stagger, in milliseconds, applied when the element enters the viewport. */
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}

/**
 * Fades and lifts its children the first time they scroll into view.
 * Respects prefers-reduced-motion through the global CSS override.
 */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver (or an old browser): just show the content.
    if (typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={
        shown
          ? { animation: `rise 0.85s var(--ease-out-soft) ${delay}ms both` }
          : { opacity: 0 }
      }
    >
      {children}
    </Tag>
  )
}
