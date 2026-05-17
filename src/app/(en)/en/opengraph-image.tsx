/**
 * Stage 10 — EN OpenGraph image (1200×630).
 * Auto-routed by Next.js as /en/opengraph-image at the EN segment level.
 */
import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { renderOgTree, OG_SIZE } from '@/components/visuals/og-render'

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const contentType = 'image/png'
export const size = OG_SIZE
export const alt = 'woonjang.dev — Physical AI & Manufacturing Data Pipeline'

export default async function Image() {
  const fontDir = path.join(process.cwd(), 'assets/fonts')
  const regular = readFileSync(path.join(fontDir, 'Pretendard-Regular.otf'))
  const semibold = readFileSync(path.join(fontDir, 'Pretendard-SemiBold.otf'))

  return new ImageResponse(renderOgTree('en'), {
    ...OG_SIZE,
    fonts: [
      { name: 'Pretendard', data: regular, weight: 400, style: 'normal' },
      { name: 'Pretendard', data: semibold, weight: 600, style: 'normal' },
    ],
  })
}
