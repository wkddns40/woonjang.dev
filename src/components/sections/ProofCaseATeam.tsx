/**
 * §4 Proof Case A — EV fleet telemetry (TEAM work).
 *
 * Component name carries the tone label `Team` so any reader / reviewer / future LLM
 * sees the constraint immediately (Spec §5 + Y-01).
 *
 * Spec §6 invariants:
 *  - TeamScopeBanner visible at the top (1인칭 복수 / 본인 기여 명시).
 *  - V-07 4-tier ingest diagram.
 *  - TODO(woon) tokens hidden when unset (placeholder discipline).
 */
import type { ReactNode } from 'react'
import { TodoWoonInline } from '@/components/content/TodoWoonInline'
import { CaseSummaryPanel } from './CaseSummaryPanel'
import { SectionHeading } from './SectionHeading'
import type { CaseSummaryItem } from './types'

type ProofCaseATeamProps = {
  title?: ReactNode
  lede?: ReactNode
  body?: ReactNode
  summary?: readonly [
    CaseSummaryItem,
    CaseSummaryItem,
    CaseSummaryItem,
    CaseSummaryItem,
    CaseSummaryItem,
  ]
  /** Stage 8 resolved values. When omitted, the cell falls back to a visible TodoWoonInline placeholder. */
  ownContribution?: ReactNode
  operationPeriod?: ReactNode
  ownContributionToken?: string
  operationPeriodToken?: string
}

export function ProofCaseATeam({
  title,
  lede,
  body,
  summary,
  ownContribution,
  operationPeriod,
  ownContributionToken = 'proof-a/own-contribution',
  operationPeriodToken = 'proof-a/operation-period',
}: ProofCaseATeamProps) {
  return (
    <section
      id="proof-case-a"
      data-tone-profile="team-1pp"
      className="border-t border-border px-5 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <SectionHeading eyebrow="§4 Proof · EV fleet" title={title} />

        {summary && <CaseSummaryPanel items={summary} />}

        {lede && <p className="max-w-5.5xl text-sm leading-relaxed text-fg-muted md:text-base">{lede}</p>}

        <div className="rounded-md border border-border bg-bg-elevated p-4 shadow-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/visuals/four-tier-ev.svg"
            alt="Four-tier ingest pipeline: edge to gateway to pipeline to warehouse."
            width={480}
            height={140}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </div>

        {body && <div className="max-w-3xl text-sm leading-relaxed text-fg-muted">{body}</div>}

        <dl className="grid grid-cols-1 gap-3 text-xs md:grid-cols-2">
          <ContribCell label="Contribution" token={ownContributionToken} value={ownContribution} />
          <ContribCell label="Period" token={operationPeriodToken} value={operationPeriod} />
        </dl>
      </div>
    </section>
  )
}

function ContribCell({
  label,
  token,
  value,
}: {
  label: string
  token: string
  value?: ReactNode
}) {
  return (
    <div className="rounded-sm border border-border bg-bg-elevated p-3 shadow-surface">
      <dt className="mb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
        {label}
      </dt>
      <dd className="text-[13px] leading-relaxed text-fg-muted">
        {value ?? <TodoWoonInline token={token} />}
      </dd>
    </div>
  )
}
