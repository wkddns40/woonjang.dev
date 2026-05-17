import type { ComponentProps } from 'react'
import type { Locale } from '@/lib/i18n'
import { LAST_UPDATED } from '@/lib/build-info'
import {
  About,
  Adjacent,
  AILayerMatrix,
  Bottleneck,
  EngineeringPractice,
  Footer,
  Hero,
  Manufacturing,
  Primitives,
  ProofCaseATeam,
  ProofCaseBSolo,
  TechStack,
} from '@/components/sections'

export type PortfolioPageContent = {
  hero: ComponentProps<typeof Hero>
  bottleneck: ComponentProps<typeof Bottleneck>
  primitives: ComponentProps<typeof Primitives>
  proofCaseA: ComponentProps<typeof ProofCaseATeam>
  proofCaseB: Omit<ComponentProps<typeof ProofCaseBSolo>, 'diagramLocale'>
  manufacturing: ComponentProps<typeof Manufacturing>
  adjacent: ComponentProps<typeof Adjacent>
  aiLayerMatrix: ComponentProps<typeof AILayerMatrix>
  engineeringPractice: ComponentProps<typeof EngineeringPractice>
  techStack: ComponentProps<typeof TechStack>
  about: ComponentProps<typeof About>
}

type PortfolioPageProps = {
  locale: Locale
  content: PortfolioPageContent
}

export function PortfolioPage({ content, locale }: PortfolioPageProps) {
  return (
    <main className="min-h-screen bg-bg text-fg">
      <Hero {...content.hero} />
      <Bottleneck {...content.bottleneck} />
      <Primitives {...content.primitives} />
      <ProofCaseATeam {...content.proofCaseA} />
      <ProofCaseBSolo {...content.proofCaseB} diagramLocale={locale} />
      <Manufacturing {...content.manufacturing} />
      <Adjacent {...content.adjacent} />
      <AILayerMatrix {...content.aiLayerMatrix} />
      <EngineeringPractice {...content.engineeringPractice} />
      <TechStack {...content.techStack} />
      <About {...content.about} />
      <Footer lastUpdatedLabel="Last updated" lastUpdated={LAST_UPDATED} />
    </main>
  )
}
