import type { CaseSummaryItem } from './types'

type CaseSummaryPanelProps = {
  items: readonly [
    CaseSummaryItem,
    CaseSummaryItem,
    CaseSummaryItem,
    CaseSummaryItem,
    CaseSummaryItem,
  ]
}

export function CaseSummaryPanel({ items }: CaseSummaryPanelProps) {
  return (
    <dl className="grid grid-cols-1 overflow-hidden rounded-md border border-border bg-bg-elevated shadow-surface md:grid-cols-5">
      {items.map((item, i) => (
        <div
          key={i}
          className="border-b border-border px-4 py-3 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
        >
          <dt className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
            {item.label}
          </dt>
          <dd className="text-[13px] leading-relaxed text-fg-muted">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
