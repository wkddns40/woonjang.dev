import type { Metadata } from 'next'
import { pretendard } from '@/lib/fonts'
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
    '산업 차량 Fleet 텔레메트리 파이프라인과 LLM 제품을 운영한 엔지니어. CAN ISO-TP 재조립, 비동기 신호 정렬, InfluxDB 기반 landing/replay 구조, schema-driven decoder 경험을 제조 AI 데이터 시스템으로 확장합니다.',
  alternates: {
    canonical: '/',
    languages: SHARED_LANGUAGES,
    types: SHARED_ALTERNATE_TYPES,
  },
  openGraph: {
    ...SHARED_OG,
    url: '/',
    locale: 'ko_KR',
    alternateLocale: ['en_US'],
    title: '산업 데이터 파이프라인 & LLM 엔지니어 · Physical AI | Woon',
    description:
      '산업 데이터 depth × LLM 제품 end-to-end ownership — 산업 차량 Fleet 텔레메트리 파이프라인 (팀) + LLM 제품 운영 (1인 풀스택).',
  },
  twitter: {
    card: SHARED_TWITTER_CARD,
    title: '산업 데이터 파이프라인 & LLM 엔지니어 · Physical AI | Woon',
    description: '산업 데이터 depth × LLM 제품 end-to-end ownership.',
  },
}

export default function KoRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <a href="#hero" className="skip-link">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD) }}
        />
        <LocaleToggle current="ko" />
        {children}
      </body>
    </html>
  )
}
