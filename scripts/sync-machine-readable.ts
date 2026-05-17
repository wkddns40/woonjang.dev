#!/usr/bin/env tsx
import { readFileSync, writeFileSync } from 'node:fs'
import { PROFILE_JSON } from '../src/lib/machine-readable'

const checkOnly = process.argv.includes('--check')

const targets = [
  ['public/profile.json', `${JSON.stringify(PROFILE_JSON, null, 2)}\n`],
] as const

const changed: string[] = []

for (const [file, next] of targets) {
  const current = readFileSync(file, 'utf8')
  if (current === next) continue

  changed.push(file)
  if (!checkOnly) writeFileSync(file, next, 'utf8')
}

if (changed.length === 0) {
  console.log(`machine-readable: up to date (${targets.length} files).`)
} else if (checkOnly) {
  console.error(`machine-readable: ${changed.length} file(s) out of sync:`)
  for (const file of changed) console.error(`  - ${file}`)
  console.error('Run `npm run sync:machine-readable` to regenerate.')
  process.exit(1)
} else {
  console.log(`machine-readable: wrote ${changed.length} file(s).`)
}
