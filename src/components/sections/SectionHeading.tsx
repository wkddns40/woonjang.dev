import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow: ReactNode
  title?: ReactNode
}

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <header className="flex max-w-3xl flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
        {eyebrow}
      </span>
      {title && (
        <h2 className="text-xl font-semibold leading-snug text-fg md:text-2xl">
          {title}
        </h2>
      )}
    </header>
  )
}
