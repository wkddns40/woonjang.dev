/**
 * §6 Manufacturing.
 *
 * Spec §6 invariants:
 *  - Stage 8 target memo appears before V-06 so this reads as future target, not past proof.
 *  - V-06 bidirectional substrate supports the target tracks.
 *  - 6a (4 cards) — 로봇 제조 Foundation 데이터.
 *  - 6b (4 cards) — 기존 제조업 AI 워크플로우.
 *  - each card requires primitiveTags ('P1' | 'P2' | 'P3') — dependencies visible.
 *
 * Voice (§5): proposal 1ps. Y-03 — never past-tense ("we built / shipped"); §6 is
 * forward-looking interest, not lived experience.
 */
import type { ReactNode } from 'react'
import { SectionHeading } from './SectionHeading'
import type { CaseSummaryItem, ManufacturingCard } from './types'

type ManufacturingProps = {
  cards6a: readonly [ManufacturingCard, ManufacturingCard, ManufacturingCard, ManufacturingCard]
  cards6b: readonly [ManufacturingCard, ManufacturingCard, ManufacturingCard, ManufacturingCard]
  title?: ReactNode
  lede?: ReactNode
  futureSummary?: readonly [CaseSummaryItem, CaseSummaryItem, CaseSummaryItem]
  header6a?: ReactNode
  header6b?: ReactNode
}

export function Manufacturing({
  cards6a,
  cards6b,
  title,
  lede,
  futureSummary,
  header6a,
  header6b,
}: ManufacturingProps) {
  return (
    <section
      id="manufacturing"
      data-tone-profile="proposal-1ps"
      className="border-t border-border px-5 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <SectionHeading eyebrow="§6 Manufacturing" title={title} />
        {lede && <p className="max-w-5.5xl text-sm leading-relaxed text-fg-muted md:text-base">{lede}</p>}

        {futureSummary && (
          <dl className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {futureSummary.map((item, i) => (
              <div
                key={i}
                className="rounded-md border border-border bg-bg-elevated p-4 shadow-surface"
              >
                <dt className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                  {item.label}
                </dt>
                <dd className="text-[13px] leading-relaxed text-fg-muted md:text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="rounded-md border border-border bg-bg-elevated p-4 shadow-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/visuals/bidir-substrate.svg"
            alt="Dual-purpose data substrate — the same store serves production reads (inference, dashboards, alerts) and batch exports for training (RLDS, Parquet, MCAP)."
            width={600}
            height={320}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </div>

        <Track id="6a" header={header6a} cards={cards6a} />
        <Track id="6b" header={header6b} cards={cards6b} />
      </div>
    </section>
  )
}

function Track({
  id,
  header,
  cards,
}: {
  id: '6a' | '6b'
  header?: ReactNode
  cards: readonly ManufacturingCard[]
}) {
  return (
    <div data-track={id} className="flex flex-col gap-4">
      <header className="flex items-baseline gap-3">
        <span className="rounded-sm bg-accent px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white">{id}</span>
        {header && <h3 className="text-base font-medium leading-snug text-fg">{header}</h3>}
      </header>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <li
            key={i}
            data-primitive-tags={card.primitiveTags.join(' ')}
            className="flex flex-col gap-3 rounded-md border border-border bg-bg-elevated p-4 shadow-surface"
          >
            <div className="flex flex-wrap gap-1.5">
              {card.primitiveTags.map((tag, tagIndex) => (
                <span
                  key={tag}
                  className={
                    tagIndex === 0
                      ? 'rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[10px] text-white'
                      : 'rounded-sm bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle'
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
            {card.title && <h4 className="text-sm font-medium leading-snug text-fg">{card.title}</h4>}
            {card.body && <p className="text-[13px] leading-relaxed text-fg-muted">{card.body}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
