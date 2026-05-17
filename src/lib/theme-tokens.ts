/**
 * Design tokens — single source of truth for woonjang.dev visuals.
 *
 * Per AOR-2 (Canonical Vocabulary) the only accent family is cyan.
 * Adding any new color requires registering it here first; otherwise builds drift.
 *
 * Mirrored to CSS custom properties in `src/app/globals.css :root`.
 */

export const colors = {
  bg: '#F6F8FB',
  bgElevated: '#FFFFFF',
  bgSubtle: '#EEF3F7',
  fg: '#0B1220',
  fgMuted: '#243244',
  fgSubtle: '#526173',
  border: '#D8E1EA',
  borderStrong: '#AEBBCC',
  accent: '#007C9E',
  accentDim: '#005F78',
  accentBg: 'rgba(0, 124, 158, 0.1)',
} as const

export const motion = {
  fast: '120ms',
  medium: '240ms',
  slow: '480ms',
  ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
} as const

export const shadow = {
  surface: '0 1px 2px rgba(15, 23, 42, 0.05), 0 4px 14px rgba(15, 23, 42, 0.04)',
} as const

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '20px',
} as const

export const fontStacks = {
  ko: ['var(--font-pretendard, system-ui)', 'system-ui', 'sans-serif'] as string[],
  en: ['system-ui', 'sans-serif'] as string[],
  body: ['var(--font-pretendard, system-ui)', 'system-ui', 'sans-serif'] as string[],
  mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'] as string[],
} as const

