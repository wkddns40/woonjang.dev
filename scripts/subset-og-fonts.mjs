#!/usr/bin/env node
/**
 * Subset Pretendard OTFs to OG-only glyphs.
 *
 * `next/og` (satori) requires TTF/OTF — woff2 not supported. We keep OTF
 * format but shrink each face to the static char set rendered by
 * `src/components/visuals/og-render.tsx`, dropping unused glyphs.
 *
 * Inputs (gitignored — fetch once into vendor/fonts/):
 *   https://github.com/orioncactus/pretendard/releases
 *   - Pretendard-Regular.otf
 *   - Pretendard-SemiBold.otf
 * Outputs: assets/fonts/Pretendard-{Regular,SemiBold}.otf
 *
 * TEXTS below mirror the static strings in og-render.tsx. Update both files
 * together when changing OG copy, then re-run `npm run build:og-fonts`.
 */
import { existsSync, writeFileSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const SRC_DIR = 'vendor/fonts'
const OUT_DIR = 'assets/fonts'
const FACES = ['Pretendard-Regular.otf', 'Pretendard-SemiBold.otf']

const TEXTS = [
  'WOONJANG.DEV',
  'Physical AI & Manufacturing',
  'Data Pipeline',
  '데이터 파이프라인',
  'Industrial data depth × LLM product ownership',
  '산업 데이터 depth × LLM 제품 end-to-end ownership',
  'fleet',
  'untamedai',
  'substrate',
  'data pipeline',
  'production',
  '생산',
  'training data',
  '학습 데이터',
  '→',
]

const ASCII = Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) =>
  String.fromCharCode(0x20 + i),
).join('')
const chars = new Set([...ASCII, ...TEXTS.join('')])
const charsStr = Array.from(chars).join('')
console.log(`OG subset unique chars: ${chars.size}`)

const tmp = join(tmpdir(), 'pretendard-og-subset-chars.txt')
writeFileSync(tmp, charsStr, 'utf8')

for (const face of FACES) {
  const srcPath = join(SRC_DIR, face)
  const outPath = join(OUT_DIR, face)
  if (!existsSync(srcPath)) {
    console.error(
      `missing source font: ${srcPath}\n` +
        `download ${face} from https://github.com/orioncactus/pretendard/releases ` +
        `and place it at ${srcPath}.`,
    )
    process.exit(1)
  }
  const args = [
    '-m',
    'fontTools.subset',
    srcPath,
    `--text-file=${tmp}`,
    `--output-file=${outPath}`,
    '--layout-features=*',
    '--no-hinting',
    '--desubroutinize',
    '--name-IDs=*',
    '--name-legacy',
    '--glyph-names',
  ]
  console.log('python', args.join(' '))
  const before = statSync(srcPath).size
  const result = spawnSync('python', args, { stdio: 'inherit' })
  if (result.status !== 0) {
    console.error(`pyftsubset failed for ${face}`)
    process.exit(result.status ?? 1)
  }
  const after = statSync(outPath).size
  console.log(
    `${face}: ${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB`,
  )
}
