import type { Metadata } from 'next'
import { PERSON_JSONLD } from '@/lib/jsonld'
import {
  SHARED_ALTERNATE_TYPES,
  SHARED_LANGUAGES,
  SHARED_METADATA,
  SHARED_OG,
  SHARED_TWITTER_CARD,
} from '@/lib/metadata-base'
import { LocaleToggle } from '@/components/LocaleToggle'
import '../globals.css'

export const metadata: Metadata = {
  ...SHARED_METADATA,
  description:
    'Industrial telemetry and LLM product engineer. Built and operated fleet telemetry pipelines with InfluxDB, CAN ISO-TP reassembly, async signal alignment, and schema-driven decoding; also built and operated an LLM product end-to-end.',
  alternates: {
    canonical: '/en',
    languages: SHARED_LANGUAGES,
    types: SHARED_ALTERNATE_TYPES,
  },
  openGraph: {
    ...SHARED_OG,
    url: '/en',
    locale: 'en_US',
    alternateLocale: ['ko_KR'],
    title: 'Physical AI & Manufacturing Data Pipeline | Woon',
    description:
      'Industrial data depth × LLM product ownership — industrial vehicle fleet telemetry pipeline (team) + LLM product operations (solo full-stack).',
  },
  twitter: {
    card: SHARED_TWITTER_CARD,
    title: 'Physical AI & Manufacturing Data Pipeline | Woon',
    description: 'Industrial data depth × LLM product ownership.',
  },
}

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#hero" className="skip-link">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD) }}
        />
        <LocaleToggle current="en" />
        {children}
      </body>
    </html>
  )
}
