/**
 * §10 Tech Stack.
 *
 * Spec §6 invariants:
 *  - exactly 8 rows (tuple type enforces).
 */
import type { ReactNode } from 'react'
import { SectionHeading } from './SectionHeading'
import type { StackRow } from './types'

type TechStackProps = {
  rows: readonly [
    StackRow,
    StackRow,
    StackRow,
    StackRow,
    StackRow,
    StackRow,
    StackRow,
    StackRow,
  ]
  title?: ReactNode
  lede?: ReactNode
}

export function TechStack({ rows, title, lede }: TechStackProps) {
  return (
    <section
      id="tech-stack"
      data-tone-profile="observational-1ps"
      className="border-t border-border px-5 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <SectionHeading eyebrow="§10 Tech Stack" title={title} />
        {lede && <p className="text-sm leading-relaxed text-fg-muted md:text-base">{lede}</p>}

        <div className="overflow-x-auto rounded-md border border-border bg-bg-elevated shadow-surface">
          <table className="w-full border-collapse text-left text-sm">
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-b-0 even:bg-bg-subtle"
                >
                  <th
                    scope="row"
                    className="w-1/3 bg-bg-subtle px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle"
                  >
                    {row.layer}
                  </th>
                  <td className="px-4 py-3 text-[13px] leading-relaxed text-fg-muted">{row.tools}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
