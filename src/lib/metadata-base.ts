import type { Metadata } from 'next'
import { SITE_URL } from './site'

export const SHARED_METADATA = {
  metadataBase: new URL(SITE_URL),
  title: 'Manufacturing AI Data Systems Engineer | Woon',
  applicationName: 'woonjang.dev',
  authors: [{ name: 'Woon', url: SITE_URL }],
  keywords: ['Manufacturing AI', 'Industrial Telemetry', 'LLM Product Operations', 'Data Pipeline'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
} satisfies Partial<Metadata>

export const SHARED_LANGUAGES = {
  ko: '/',
  en: '/en',
  'x-default': '/',
} as const

export const SHARED_ALTERNATE_TYPES = {
  'application/json': '/profile.json',
} as const

export const SHARED_OG = {
  type: 'website',
  siteName: 'woonjang.dev',
} as const

export const SHARED_TWITTER_CARD = 'summary_large_image' as const
