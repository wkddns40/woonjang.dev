#!/usr/bin/env tsx
/**
 * Stage 3 i18n mirror check (Anti-Pattern I prevention).
 * Verifies non-authoritative MDX scaffolds coexist for every section key.
 * Runtime public copy lives in src/app/(ko)/page.tsx and src/app/(en)/en/page.tsx,
 * with data constants in src/content/{ko,en}.tsx.
 * Runs as `prebuild` so missing files surface before `next build`.
 *
 * During Stages 0-3 (no content/ yet) this is a no-op.
 *
 * SECTION_KEYS is the single source of truth in src/lib/section-keys.ts.
 */
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { SECTION_KEYS } from '../src/lib/section-keys'

const LOCALES = ['ko', 'en'] as const
const CONTENT_DIR = 'content'

if (!existsSync(CONTENT_DIR)) {
  console.log(`i18n: ${CONTENT_DIR}/ not present yet (Stage 4 not started). Skip.`)
  process.exit(0)
}

const missing: string[] = []
for (const key of SECTION_KEYS) {
  for (const locale of LOCALES) {
    const path = join(CONTENT_DIR, locale, `${key}.mdx`)
    if (!existsSync(path)) missing.push(path)
  }
}

if (missing.length > 0) {
  console.warn(`i18n: missing ${missing.length} MDX scaffold file(s) for KO/EN mirror:`)
  for (const p of missing) console.warn(`  - ${p}`)
  console.warn('  (Anti-Pattern I — KO and EN must be created together)')
  process.exit(0)
}

const total = SECTION_KEYS.length * LOCALES.length
console.log(`i18n: MDX scaffold mirror OK (${total} files present).`)
