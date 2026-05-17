/**
 * §9 Engineering Practice.
 *
 * Spec §6 invariants:
 *  - exactly 3 columns: AI Review Loop / Operator / Transferable Systems (tuple enforces).
 *
 * H-10 — POSTMORTEM SECTION RESURRECTION FORBIDDEN.
 *   Do NOT add a "what broke and how I fixed it" / debugging-war-story column or block.
 *   This component intentionally rejects any 4th column or postmortem-style narrative.
 *   If you find yourself drafting one, stop and re-read Spec §3 H-10 + §13 Anti-Pattern D.
 */
import type { ReactNode } from 'react'
import { SectionHeading } from './SectionHeading'
import type { PracticeCol } from './types'

type EngineeringPracticeProps = {
  columns: readonly [PracticeCol, PracticeCol, PracticeCol]
  title?: ReactNode
  lede?: ReactNode
}

export function EngineeringPractice({
  columns,
  title,
  lede,
}: EngineeringPracticeProps) {
  return (
    <section
      id="engineering-practice"
      data-tone-profile="declarative-1ps"
      className="border-t border-border px-5 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <SectionHeading eyebrow="§9 Engineering Practice" title={title} />
        {lede && <p className="max-w-5.5xl text-sm leading-relaxed text-fg-muted md:text-base">{lede}</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {columns.map((col, i) => (
            <article
              key={i}
              className="flex flex-col gap-2 rounded-md border border-border bg-bg-elevated p-4 shadow-surface"
            >
              <h3 className="text-sm font-medium leading-snug text-fg">{col.title}</h3>
              <div className="text-[13px] leading-relaxed text-fg-muted">
                {col.body ?? <span className="text-fg-subtle">[Stage 7]</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
