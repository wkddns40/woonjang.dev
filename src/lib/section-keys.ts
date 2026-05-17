/**
 * Canonical list of section keys for the 11 IA sections (Spec §6 / brief §2).
 *
 * Single source of truth — imported by the prebuild gate
 * (`scripts/check-i18n-mirror.ts`). Keep this file dependency-free so
 * Node-side scripts can pull it via tsx without dragging Next/React
 * imports along.
 */
export const SECTION_KEYS = [
  'hero',
  'bottleneck',
  'primitives',
  'proof-case-a',
  'proof-case-b',
  'manufacturing',
  'adjacent',
  'ai-layer-matrix',
  'engineering-practice',
  'tech-stack',
  'about',
] as const

export type SectionKey = (typeof SECTION_KEYS)[number]
