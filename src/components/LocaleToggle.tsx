import { type Locale, LOCALE_LABELS } from '@/lib/i18n'

export function LocaleToggle({ current }: { current: Locale }) {
  const target: Locale = current === 'ko' ? 'en' : 'ko'
  const targetPath = target === 'ko' ? '/' : '/en'

  return (
    <nav
      aria-label="Language toggle"
      className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-md border border-border bg-bg-elevated/90 px-1 py-1 text-xs font-mono shadow-surface backdrop-blur"
    >
      <span aria-current="true" className="px-2 py-1 rounded-sm text-fg">
        {LOCALE_LABELS[current]}
      </span>
      <a
        href={targetPath}
        hrefLang={target}
        className="px-2 py-1 rounded-sm text-fg-muted hover:text-accent transition-colors duration-fast ease"
      >
        {LOCALE_LABELS[target]}
      </a>
    </nav>
  )
}
