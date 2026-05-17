/**
 * §3 Primitives.
 *
 * Spec §6 invariants:
 *  - exactly 3 cards: P1 / P2 / P3   (tuple type enforces)
 *  - verifiedEnv (검증된 환경) always renders (Stage-7 placeholder if missing).
 *    robotics / manufacturing sub-blocks are conditional — when omitted, the
 *    "where it applies" story is delegated to §6 to avoid duplication.
 *  - per-primitive visual: P1 → V-03, P2 → V-04, P3 → V-05
 *
 * Voice (§5): declarative 1ps.
 */
import type { ReactNode } from 'react'
import { SectionHeading } from './SectionHeading'
import type { PrimitiveData } from './types'

type PrimitivesProps = {
  primitives: readonly [PrimitiveData, PrimitiveData, PrimitiveData]
  title?: ReactNode
  lede?: ReactNode
  blockLabels?: { verifiedEnv: string; robotics: string; manufacturing: string }
}

const DEFAULT_LABELS = {
  verifiedEnv: '검증된 환경',
  robotics: '로봇 제조에 적용',
  manufacturing: '기존 제조업에 적용',
}

const VISUALS = {
  P1: {
    src: '/visuals/primitive-reassembly.svg',
    alt: 'Fragment-to-reassembly: sparse arrival fragments, mask bitmap, and reassembled signal.',
    width: 480,
    height: 240,
  },
  P2: {
    src: '/visuals/primitive-alignment.svg',
    alt: 'Four asynchronous channels aligned at a common reference column.',
    width: 480,
    height: 220,
  },
  P3: {
    src: '/visuals/primitive-schema.svg',
    alt: 'Heterogeneous device interfaces adapted into canonical telemetry events using a schema registry contract.',
    width: 560,
    height: 260,
  },
} as const

export function Primitives({
  primitives,
  title,
  lede,
  blockLabels = DEFAULT_LABELS,
}: PrimitivesProps) {
  return (
    <section
      id="primitives"
      data-tone-profile="declarative-1ps"
      className="border-t border-border px-5 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:gap-10">
        <SectionHeading eyebrow="§3 Primitives" title={title} />
        {lede && <p className="text-sm leading-relaxed text-fg-muted md:text-base">{lede}</p>}

        <ul className="flex flex-col gap-6">
          {primitives.map((p) => {
            const visual = VISUALS[p.id]
            return (
              <li
                key={p.id}
                data-primitive={p.id}
                className="flex flex-col gap-4 rounded-md border border-border bg-bg-elevated p-4 shadow-surface md:p-5"
              >
                <header className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-xs text-accent">{p.id}</span>
                  {p.title && <h3 className="flex-1 text-base font-medium leading-snug text-fg">{p.title}</h3>}
                </header>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
                  <div className="rounded-sm border border-border bg-bg-subtle p-3">
                    {p.caption && (
                      <div className="mb-2 text-[11px] leading-relaxed text-fg-subtle">
                        {p.caption}
                      </div>
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={visual.src}
                      alt={visual.alt}
                      width={visual.width}
                      height={visual.height}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <SubBlock label={blockLabels.verifiedEnv}>{p.verifiedEnv}</SubBlock>
                    {p.robotics && <SubBlock label={blockLabels.robotics}>{p.robotics}</SubBlock>}
                    {p.manufacturing && <SubBlock label={blockLabels.manufacturing}>{p.manufacturing}</SubBlock>}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function SubBlock({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <div className="border-t border-border pt-2">
      <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
        {label}
      </div>
      <div className="text-[13px] leading-relaxed text-fg-muted">{children ?? <span className="text-fg-subtle">[Stage 7]</span>}</div>
    </div>
  )
}
