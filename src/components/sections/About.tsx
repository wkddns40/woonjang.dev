/**
 * §11 About.
 *
 * Spec §6 invariants:
 *  - 1 paragraph + exactly 4 links: GitHub / untamedai.me / Email / Resume PDF
 *    (tuple type enforces 4).
 */
import type { ReactNode } from 'react'
import { TodoWoonInline } from '@/components/content/TodoWoonInline'
import { SectionHeading } from './SectionHeading'
import type { AboutLink } from './types'

type AboutProps = {
  title?: ReactNode
  paragraph?: ReactNode
  links: readonly [AboutLink, AboutLink, AboutLink, AboutLink]
  /** Per-link unresolved tokens. Empty href → render a TodoWoonInline placeholder instead. */
  linkTokens?: readonly [string, string, string, string]
}

export function About({ title, paragraph, links, linkTokens }: AboutProps) {
  return (
    <section
      id="about"
      data-tone-profile="personal-1ps"
      className="border-t border-border px-5 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <SectionHeading eyebrow="§11 About" title={title} />
        {paragraph && (
          <p className="max-w-5.5xl text-base leading-relaxed text-fg-muted">{paragraph}</p>
        )}

        <ul className="flex flex-wrap gap-3 text-xs">
          {links.map((link, i) => {
            const isExternal = /^https?:\/\//.test(link.href)
            return (
              <li key={i}>
                {link.href ? (
                  <a
                    href={link.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="rounded-sm bg-bg-subtle px-3 py-1.5 text-fg-muted transition-colors duration-fast ease hover:bg-accent hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <span className="rounded-sm border border-dashed border-border px-3 py-1.5">
                    <TodoWoonInline token={linkTokens?.[i] ?? `about/link-${i}`} />
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
