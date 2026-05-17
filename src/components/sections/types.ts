/**
 * Stage 5 section invariant types.
 *
 * Tuple types (`readonly [T, T, T, T]`) enforce fixed counts at compile time —
 * a wrong-length array fails TypeScript strict mode, satisfying Stage 5 Exit:
 * "필수 invariant 누락 시 빌드 에러".
 */
import type { ReactNode } from 'react'

export type Cta = { label: string; href: string }

export type Card = { title?: ReactNode; body?: ReactNode }

export type CaseSummaryItem = {
  label: ReactNode
  value: ReactNode
}

export type PrimitiveData = {
  id: 'P1' | 'P2' | 'P3'
  title?: ReactNode
  /**
   * One-line caption rendered above the diagram. Acts as a mobile-friendly
   * summary so the card's gist is readable even when SVG labels are too small.
   */
  caption?: ReactNode
  verifiedEnv?: ReactNode
  robotics?: ReactNode
  manufacturing?: ReactNode
}

export type ManufacturingCard = {
  title?: ReactNode
  body?: ReactNode
  /** Required: each manufacturing card must declare every primitive dependency. */
  primitiveTags: readonly ('P1' | 'P2' | 'P3')[]
}

export type MatrixRow = readonly [ReactNode, ReactNode, ReactNode]

export type PracticeCol = { title: ReactNode; body?: ReactNode }

export type StackRow = { layer: ReactNode; tools?: ReactNode }

export type AboutLink = {
  label: string
  href: string
}

export type Locale = 'ko' | 'en'
