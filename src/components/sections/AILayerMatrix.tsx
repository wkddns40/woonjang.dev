/**
 * §8 AI Layer Matrix.
 *
 * Spec §6 invariants:
 *  - 3 columns are fixed; row count is caller-defined for localized grouping.
 *  - Anti-Pattern F: do not append models beyond what brief §8 names.
 */
import type { ReactNode } from 'react'
import { SectionHeading } from './SectionHeading'
import type { MatrixRow } from './types'

type AILayerMatrixProps = {
  columnHeaders: readonly [ReactNode, ReactNode, ReactNode]
  rows: readonly MatrixRow[]
  title?: ReactNode
  lede?: ReactNode
}

export function AILayerMatrix({
  columnHeaders,
  rows,
  title,
  lede,
}: AILayerMatrixProps) {
  return (
    <section
      id="ai-layer-matrix"
      data-tone-profile="observational-1ps"
      className="border-t border-border px-5 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <SectionHeading eyebrow="§8 AI Layer Matrix" title={title} />
        {lede && <p className="max-w-5.5xl text-sm leading-relaxed text-fg-muted md:text-base">{lede}</p>}

        <div className="overflow-x-auto rounded-md border border-border bg-bg-elevated shadow-surface">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-bg-subtle">
              <tr className="border-b border-border">
                {columnHeaders.map((h, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-b-0 even:bg-bg-subtle"
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={
                        j === 0
                          ? 'px-4 py-3 text-[13px] font-medium leading-relaxed text-fg'
                          : 'px-4 py-3 text-[13px] leading-relaxed text-fg-muted'
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
