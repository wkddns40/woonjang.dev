type FooterProps = {
  lastUpdatedLabel: string
  lastUpdated: string
}

export function Footer({ lastUpdatedLabel, lastUpdated }: FooterProps) {
  return (
    <footer className="border-t border-border px-5 py-6 md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
        <span>woonjang.dev</span>
        <span>
          {lastUpdatedLabel}{' '}
          <time dateTime={lastUpdated}>{lastUpdated}</time>
        </span>
      </div>
    </footer>
  )
}
