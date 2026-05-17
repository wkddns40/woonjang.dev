/**
 * §2 Bottleneck.
 *
 * Spec §6 invariants:
 *  - exactly 4 cards (tuple type enforces).
 *
 * Voice (§5): observational 1ps.
 */
import type { ReactNode } from 'react'
import { SectionHeading } from './SectionHeading'
import type { Card } from './types'

type BottleneckProps = {
  cards: readonly [Card, Card, Card, Card]
  title?: ReactNode
  lede?: ReactNode
}

export function Bottleneck({ cards, title, lede }: BottleneckProps) {
  return (
    <section
      id="bottleneck"
      data-tone-profile="observational-1ps"
      className="border-t border-border px-5 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <SectionHeading eyebrow="§2 Bottleneck" title={title} />
        {lede && <p className="max-w-5.5xl text-sm leading-relaxed text-fg-muted md:text-base">{lede}</p>}

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <li
              key={i}
              className="flex flex-col gap-2 rounded-md border border-border bg-bg-elevated p-4 shadow-surface"
            >
              {card.title && <h3 className="text-sm font-medium leading-snug text-fg">{card.title}</h3>}
              {card.body && <div className="text-[13px] leading-relaxed text-fg-muted">{card.body}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
