#!/usr/bin/env node
/**
 * Subset PretendardVariable.woff2 to glyphs actually used on KO + EN pages.
 *
 * Inputs (from a running production server):
 *   - http://localhost:3100/   (Korean root)
 *   - http://localhost:3100/en (English root)
 *
 * Source font (gitignored — fetch once into vendor/fonts/):
 *   https://github.com/orioncactus/pretendard/releases (PretendardVariable.woff2)
 *
 * Output:
 *   - assets/fonts/PretendardVariable.woff2 (rewritten, ≤ ~400 KB)
 *
 * Strategy:
 *   1. Fetch both HTML payloads, strip tags + script + style.
 *   2. Add a fixed safety set: ASCII printable, common Korean punctuation,
 *      Hangul Jamo / fullwidth punctuation that appear via dynamic JSON-LD,
 *      structural symbols already in the brief (§, →, ·, ✦, ⭐, t₀, t₁ etc.).
 *   3. Write the union to a temp .txt and call `pyftsubset` with woff2 output.
 */
import { existsSync, writeFileSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const PORT = process.env.PORT ?? '3100'
const URLS = [`http://localhost:${PORT}/`, `http://localhost:${PORT}/en`]
const SRC = 'vendor/fonts/PretendardVariable.woff2'
const OUT = 'assets/fonts/PretendardVariable.woff2'

const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;|&#x[0-9a-f]+;/gi, ' ')

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} → ${res.status}`)
  return res.text()
}

const SAFETY = [
  // ASCII printable
  ...Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) => String.fromCharCode(0x20 + i)),
  // common typographic
  '·•—–…«»“”‘’„‚‹›§¶©®™°±×÷≈≠≤≥√∞∑∏∫∂∆',
  // arrows + math
  '→←↑↓↔⇒⇐⇔↦≡',
  // brand chips
  '⭐✦★☆◇◆◯●▲▼■□▪▫',
  // latin extended (CJK pages mix)
  'áéíóúàèìòùâêîôûäëïöüãñçÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÃÑÇ',
  // subscripts/superscripts used in V-01 (t₀, t₁, etc.)
  '₀₁₂₃₄₅₆₇₈₉ⁿ⁰¹²³⁴⁵⁶⁷⁸⁹',
  // fullwidth common
  '　・「」『』【】〈〉《》',
].join('')

const main = async () => {
  if (!existsSync(SRC)) {
    console.error(
      `missing source font: ${SRC}\n` +
        `download PretendardVariable.woff2 from https://github.com/orioncactus/pretendard/releases ` +
        `and place it at ${SRC}.`,
    )
    process.exit(1)
  }
  const htmls = await Promise.all(URLS.map(fetchText))
  const text = htmls.map(stripTags).join('\n') + SAFETY
  const chars = new Set(Array.from(text))
  const charsStr = Array.from(chars).join('')
  console.log(`unique chars: ${chars.size}`)

  const tmp = join(tmpdir(), 'pretendard-subset-chars.txt')
  writeFileSync(tmp, charsStr, 'utf8')

  const args = [
    '-m',
    'fontTools.subset',
    SRC,
    `--text-file=${tmp}`,
    `--output-file=${OUT}`,
    '--flavor=woff2',
    '--layout-features=*',
    '--no-hinting',
    '--desubroutinize',
    '--name-IDs=*',
    '--name-legacy',
    '--glyph-names',
  ]
  console.log('python', args.join(' '))
  const before = statSync(SRC).size
  const result = spawnSync('python', args, { stdio: 'inherit' })
  if (result.status !== 0) {
    console.error('pyftsubset failed')
    process.exit(result.status ?? 1)
  }
  const after = statSync(OUT).size
  console.log(`size: ${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
