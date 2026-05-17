#!/usr/bin/env tsx
/**
 * Regenerate the :root token block in src/app/globals.css from
 * src/lib/theme-tokens.ts. Runs as `prebuild` and as `npm run sync:css-tokens`.
 *
 * The TS file is the canonical source. CSS variables consumed at runtime
 * (Tailwind via tailwind.config.ts → var(--color-*), inline styles in SVG
 * visuals, etc.) are derived from it via the marker block below.
 *
 * Markers (must exist in globals.css):
 *   /* GENERATED:THEME-TOKENS:START * /  ... /* GENERATED:THEME-TOKENS:END * /
 *
 * Exits non-zero if markers are missing so a hand-edit can't silently desync.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { colors, motion, shadow } from '../src/lib/theme-tokens'

const INDENT = '    '
const FILE = 'src/app/globals.css'

const header = `${INDENT}/* GENERATED:THEME-TOKENS:START — DO NOT EDIT. Run \`npm run sync:css-tokens\` to regenerate from src/lib/theme-tokens.ts */`
const footer = `${INDENT}/* GENERATED:THEME-TOKENS:END */`

const colorLines = [
  `--color-bg: ${colors.bg};`,
  `--color-bg-elevated: ${colors.bgElevated};`,
  `--color-bg-subtle: ${colors.bgSubtle};`,
  `--color-fg: ${colors.fg};`,
  `--color-fg-muted: ${colors.fgMuted};`,
  `--color-fg-subtle: ${colors.fgSubtle};`,
  `--color-border: ${colors.border};`,
  `--color-border-strong: ${colors.borderStrong};`,
  `--color-accent: ${colors.accent};`,
  `--color-accent-dim: ${colors.accentDim};`,
  `--color-accent-bg: ${colors.accentBg};`,
  `--shadow-surface: ${shadow.surface};`,
]

const motionLines = [
  `--motion-fast: ${motion.fast};`,
  `--motion-medium: ${motion.medium};`,
  `--motion-slow: ${motion.slow};`,
  `--motion-ease: ${motion.ease};`,
]

const body = [
  ...colorLines.map((l) => `${INDENT}${l}`),
  '',
  ...motionLines.map((l) => `${INDENT}${l}`),
].join('\n')

const block = `${header}\n${body}\n${footer}`

const current = readFileSync(FILE, 'utf8')

const markerRe =
  /[ \t]*\/\* GENERATED:THEME-TOKENS:START[\s\S]*?\/\* GENERATED:THEME-TOKENS:END \*\//

if (!markerRe.test(current)) {
  console.error(
    `sync-css-tokens: GENERATED:THEME-TOKENS markers not found in ${FILE}. ` +
      'Add them around the :root variable block before re-running.',
  )
  process.exit(1)
}

const updated = current.replace(markerRe, block)

const isCheck = process.argv.includes('--check')
const normalize = (s: string) => s.replace(/\r\n/g, '\n')
const inSync = normalize(updated) === normalize(current)

if (inSync) {
  console.log('sync-css-tokens: up to date.')
} else if (isCheck) {
  console.error(
    `sync-css-tokens: ${FILE} is out of date. Run \`npm run sync:css-tokens\` to regenerate.`,
  )
  process.exit(1)
} else {
  writeFileSync(FILE, updated)
  console.log(`sync-css-tokens: regenerated ${FILE}.`)
}
