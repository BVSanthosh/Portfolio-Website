/**
 * Shared node and text styling so the three architecture diagrams read as one
 * family. Kept out of DiagramFrame.tsx so that file only exports components.
 */
export const nodeStyles = {
  box: {
    fill: 'var(--color-paper-raised)',
    stroke: 'var(--color-rule-strong)',
    strokeWidth: 1.25,
  },
  accentBox: {
    fill: 'var(--color-signal-soft)',
    stroke: 'var(--color-signal)',
    strokeWidth: 1.25,
  },
  edge: {
    stroke: 'var(--color-rule-strong)',
    strokeWidth: 1.25,
    fill: 'none',
  },
} as const

export const TEXT = {
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: 13,
    fontWeight: 500,
    fill: 'var(--color-ink)',
  },
  mono: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fill: 'var(--color-ink-muted)',
  },
  label: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '0.1em',
    fill: 'var(--color-ink-muted)',
  },
} as const
