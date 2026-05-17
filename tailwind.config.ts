import type { Config } from 'tailwindcss'
import { motion, radius, fontStacks } from './src/lib/theme-tokens'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-elevated': 'var(--color-bg-elevated)',
        'bg-subtle': 'var(--color-bg-subtle)',
        fg: 'var(--color-fg)',
        'fg-muted': 'var(--color-fg-muted)',
        'fg-subtle': 'var(--color-fg-subtle)',
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        accent: 'var(--color-accent)',
        'accent-dim': 'var(--color-accent-dim)',
        'accent-bg': 'var(--color-accent-bg)',
      },
      fontFamily: {
        sans: fontStacks.body as unknown as string[],
        ko: fontStacks.ko as unknown as string[],
        en: fontStacks.en as unknown as string[],
        mono: fontStacks.mono as unknown as string[],
      },
      transitionDuration: {
        fast: motion.fast,
        medium: motion.medium,
        slow: motion.slow,
      },
      transitionTimingFunction: {
        ease: motion.ease,
      },
      borderRadius: {
        sm: radius.sm,
        md: radius.md,
        lg: radius.lg,
        xl: radius.xl,
      },
      boxShadow: {
        surface: 'var(--shadow-surface)',
      },
      maxWidth: {
        '5.5xl': '68rem',
      },
    },
  },
  plugins: [],
}

export default config
