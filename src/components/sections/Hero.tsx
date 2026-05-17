/**
 * Hero section.
 *
 * Stage 7 invariants:
 *  - direct role positioning above the fold
 *  - exactly 4 proof chips
 *  - exactly 3 primary CTAs
 *  - exactly 3 proof snapshot rows
 */
import type { ReactNode } from 'react'
import type { Cta } from './types'

type ProofSnapshot = {
  title: ReactNode
  body: ReactNode
}

type HeroProps = {
  chips: readonly [string, string, string, string]
  ctas: readonly [Cta, Cta, Cta]
  proofSnapshot: readonly [ProofSnapshot, ProofSnapshot, ProofSnapshot]
  headline?: ReactNode
  subhead?: ReactNode
}

export function Hero({ chips, ctas, proofSnapshot, headline, subhead }: HeroProps) {
  return (
    <section
      id="hero"
      data-tone-profile="visionary-1ps"
      className="border-t border-border px-5 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.04fr_0.96fr]">
          <div className="flex flex-col gap-6">
            {headline && (
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                {headline}
              </h1>
            )}
            {subhead && (
              <p className="max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
                {subhead}
              </p>
            )}

            <nav className="flex flex-wrap gap-3" aria-label="hero ctas">
              {ctas.map((cta, i) => (
                <a
                  key={i}
                  href={cta.href}
                  className={
                    i === 0
                      ? 'rounded-sm border border-accent bg-accent px-4 py-2 text-sm font-medium text-white transition-colors duration-fast ease hover:bg-accent-dim'
                      : 'rounded-sm bg-bg-subtle px-4 py-2 text-sm font-medium text-fg-muted transition-colors duration-fast ease hover:bg-accent hover:text-white'
                  }
                >
                  {cta.label}
                </a>
              ))}
            </nav>
          </div>

          <aside
            className="rounded-md border border-border bg-bg-elevated p-4 shadow-surface md:p-5"
            aria-label="proof snapshot"
          >
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                Proof Snapshot
              </span>
              <span className="rounded-sm bg-accent-bg px-2 py-1 text-xs font-medium text-accent">
                Systems proof
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {proofSnapshot.map((item, i) => (
                <div key={i} className="rounded-sm border border-border bg-bg-subtle px-3 py-3">
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {item.title}
                  </div>
                  <div className="text-sm leading-relaxed text-fg-muted">{item.body}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="rounded-md border border-border bg-bg-elevated px-4 py-3 shadow-surface">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
              Proof
            </span>
            <ul className="flex flex-wrap gap-2" aria-label="proof chips">
              {chips.map((chip, i) => (
                <li
                  key={i}
                  className="rounded-sm border border-border bg-bg-subtle px-2.5 py-1 text-xs font-medium text-fg-muted"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
