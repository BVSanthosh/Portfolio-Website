import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function current(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/**
 * Reads the theme that the inline script in index.html already applied, and
 * lets the toggle flip it. Persisted so the choice survives a reload.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(current)

  useEffect(() => {
    if (theme === 'dark') document.documentElement.dataset.theme = 'dark'
    else delete document.documentElement.dataset.theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Private browsing, or site data blocked. The page still renders correctly.
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  return { theme, toggle }
}
