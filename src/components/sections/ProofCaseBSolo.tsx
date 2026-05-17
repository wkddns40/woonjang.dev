/**
 * §5 Proof Case B — untamedai.me (SOLO 1인 풀스택).
 *
 * Component name carries the tone label `Solo` (Spec §5 + Y-02).
 *
 * Spec §6 invariants:
 *  - SoloScopeBanner visible at the top (1인칭 단수 OK).
 *  - V-02 5-stage diagram.
 *  - exactly 5 stage cards: 기획 / 설계 / 개발 / 배포 / 운영  (tuple type enforces).
 */
import type { ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'
import { CaseSummaryPanel } from './CaseSummaryPanel'
import { SectionHeading } from './SectionHeading'
import type { Card, CaseSummaryItem } from './types'

type ProofCaseBSoloProps = {
  stages: readonly [Card, Card, Card, Card, Card]
  diagramLocale: Locale
  title?: ReactNode
  summary?: readonly [
    CaseSummaryItem,
    CaseSummaryItem,
    CaseSummaryItem,
    CaseSummaryItem,
    CaseSummaryItem,
  ]
  lede?: ReactNode
}

export function ProofCaseBSolo({
  stages,
  diagramLocale,
  title,
  summary,
  lede,
}: ProofCaseBSoloProps) {
  return (
    <section
      id="proof-case-b"
      data-tone-profile="solo-1ps"
      className="border-t border-border px-5 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <SectionHeading eyebrow="§5 Proof · untamedai" title={title} />

        {summary && <CaseSummaryPanel items={summary} />}

        {lede && <p className="max-w-5.5xl text-sm leading-relaxed text-fg-muted md:text-base">{lede}</p>}

        <div className="rounded-md border border-border bg-bg-elevated p-4 shadow-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/visuals/untamed-five-stage-${diagramLocale}.svg`}
            alt="untamedai five-stage operation pipeline: plan, design, build, deploy, operate."
            width={564}
            height={130}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </div>

        <ol className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {stages.map((card, i) => (
            <li
              key={i}
              className="flex flex-col gap-2 rounded-md border border-border bg-bg-elevated p-3 shadow-surface"
            >
              <span className="self-start rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white">
                0{i + 1}
              </span>
              {card.title && <div className="text-sm font-medium leading-snug text-fg">{card.title}</div>}
              {card.body && <div className="text-[13px] leading-relaxed text-fg-muted">{card.body}</div>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
