/**
 * Stage 10 — Shared OpenGraph image renderer.
 *
 * Returns the JSX tree consumed by next/og's `ImageResponse`. Cannot reuse
 * `OgImage.tsx` directly because `ImageResponse` runs Yoga layout (flexbox)
 * over inline-styled elements, not real SVG. We rebuild the V-08 layout using
 * div + flex while keeping the same structure (substrate flow, dual inputs,
 * dual outputs) and theme tokens.
 *
 * Guards: H-08 (no logos / vehicle photos), H-05 (abstract geometry).
 */
import type { ReactElement } from 'react'
import { colors } from '@/lib/theme-tokens'

const T = {
  bg: colors.bg,
  bgElevated: colors.bgElevated,
  fg: colors.fg,
  fgMuted: colors.fgMuted,
  fgSubtle: colors.fgSubtle,
  accent: colors.accent,
  border: colors.border,
  borderStrong: colors.borderStrong,
  accentBg: colors.accentBg,
}

export type OgVariant = 'ko' | 'en'

export const OG_SIZE = { width: 1200, height: 630 } as const

export function renderOgTree(variant: OgVariant): ReactElement {
  const tagline =
    variant === 'ko'
      ? '산업 데이터 depth × LLM 제품 end-to-end ownership'
      : 'Industrial data depth × LLM product ownership'

  const subLine = 'Physical AI & Manufacturing'

  const headline = variant === 'ko' ? '데이터 파이프라인' : 'Data Pipeline'
  const productionLabel = variant === 'ko' ? '생산' : 'production'
  const trainingLabel = variant === 'ko' ? '학습 데이터' : 'training data'
  const substrateLabel = variant === 'ko' ? '데이터 파이프라인' : 'data pipeline'

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: T.bg,
        color: T.fg,
        padding: '56px 72px',
        fontFamily: 'Pretendard',
      }}
    >
      {/* Title block */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            color: T.fgSubtle,
            fontSize: 22,
            letterSpacing: '0.3em',
            fontWeight: 400,
          }}
        >
          WOONJANG.DEV
        </span>
        <span
          style={{
            color: T.fg,
            fontSize: 60,
            fontWeight: 600,
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          {subLine}
        </span>
        <span
          style={{
            color: T.accent,
            fontSize: 60,
            fontWeight: 600,
            lineHeight: 1.05,
          }}
        >
          {headline}
        </span>
        <span
          style={{
            color: T.fgMuted,
            fontSize: 26,
            marginTop: 20,
          }}
        >
          {tagline}
        </span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Substrate flow row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 28,
        }}
      >
        {/* left inputs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: 220,
          }}
        >
          <Tile label="fleet" />
          <Tile label="untamedai" />
        </div>

        <Arrow />

        {/* substrate */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: T.accentBg,
            border: `2px solid ${T.accent}`,
            borderRadius: 8,
            padding: '24px 28px',
            width: 240,
            color: T.accent,
          }}
        >
          <span style={{ fontSize: 26, fontWeight: 600 }}>substrate</span>
          <span style={{ fontSize: 16, color: T.fgMuted, marginTop: 4 }}>
            {substrateLabel}
          </span>
        </div>

        <Arrow />

        {/* right outputs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: 220,
          }}
        >
          <Tile label={productionLabel} />
          <Tile label={trainingLabel} />
        </div>
      </div>
    </div>
  )
}

function Tile({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: T.bgElevated,
        border: `1px solid ${T.borderStrong}`,
        borderRadius: 6,
        padding: '14px 20px',
        color: T.fgMuted,
        fontSize: 20,
      }}
    >
      {label}
    </div>
  )
}

function Arrow() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        color: T.accent,
        fontSize: 36,
      }}
    >
      →
    </div>
  )
}
