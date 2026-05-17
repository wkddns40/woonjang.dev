/**
 * Stage 5 section containers (Spec §6 invariants).
 *
 * Each component:
 *  - renders the canonical <section> element with id + data-tone-profile.
 *  - takes typed invariant props (tuple types enforce fixed counts at build time).
 *  - accepts optional children for body copy (Stage 7 fills via MDX or page-level data).
 *  - embeds the section's V-* visual where applicable (Stage 6).
 */
export { Hero } from './Hero'
export { Bottleneck } from './Bottleneck'
export { Primitives } from './Primitives'
export { ProofCaseATeam } from './ProofCaseATeam'
export { ProofCaseBSolo } from './ProofCaseBSolo'
export { Manufacturing } from './Manufacturing'
export { Adjacent } from './Adjacent'
export { AILayerMatrix } from './AILayerMatrix'
export { EngineeringPractice } from './EngineeringPractice'
export { TechStack } from './TechStack'
export { About } from './About'
export { Footer } from './Footer'
export type {
  Cta,
  Card,
  CaseSummaryItem,
  PrimitiveData,
  ManufacturingCard,
  MatrixRow,
  PracticeCol,
  StackRow,
  AboutLink,
  Locale,
} from './types'
