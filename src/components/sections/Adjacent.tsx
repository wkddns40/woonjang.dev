/**
 * §7 Adjacent — compressed single card.
 *
 * Voice (§5): compressed 1ps.
 */
import type { ReactNode } from 'react'
import { SectionHeading } from './SectionHeading'

type AdjacentProps = {
  sectionTitle?: ReactNode
  title?: ReactNode
  body?: ReactNode
}

export function Adjacent({ sectionTitle, title, body }: AdjacentProps) {
  return (
    <section
      id="adjacent"
      data-tone-profile="compressed-1ps"
      className="border-t border-border px-5 py-12 md:px-6 md:py-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <SectionHeading eyebrow="§7 Adjacent" title={sectionTitle} />
        <article className="rounded-md border border-border bg-bg-elevated p-5 shadow-surface">
          {title && <h3 className="mb-2 text-base font-medium leading-snug text-fg">{title}</h3>}
          {body && <p className="text-sm leading-relaxed text-fg-muted">{body}</p>}
        </article>
      </div>
    </section>
  )
}
