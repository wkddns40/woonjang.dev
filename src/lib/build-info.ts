import { execSync } from 'node:child_process'

function normalizeDate(value: string | undefined): string | undefined {
  if (!value) return undefined
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value

  const epochSeconds = Number(value)
  if (Number.isFinite(epochSeconds) && epochSeconds >= 0) {
    return new Date(epochSeconds * 1000).toISOString().slice(0, 10)
  }

  return undefined
}

function resolveLastUpdated(): string {
  try {
    return execSync('git log -1 --format=%cs', { encoding: 'utf8' }).trim()
  } catch {
    return (
      normalizeDate(process.env.LAST_UPDATED) ??
      normalizeDate(process.env.SOURCE_DATE_EPOCH) ??
      '1970-01-01'
    )
  }
}

export const LAST_UPDATED = resolveLastUpdated()
