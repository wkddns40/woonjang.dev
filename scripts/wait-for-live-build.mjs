#!/usr/bin/env node
const baseRaw = process.argv[2] ?? process.env.BASE_URL ?? 'https://woonjang.dev'
const expectedRaw =
  process.argv[3] ?? process.env.EXPECTED_BUILD_ID ?? process.env.GITHUB_SHA

if (!expectedRaw) {
  console.error(
    'wait-for-live-build: missing expected build id. Set EXPECTED_BUILD_ID or GITHUB_SHA.',
  )
  process.exit(2)
}

const expected = String(expectedRaw).slice(0, 12)
const timeoutMs = Number(process.env.WAIT_TIMEOUT_SECONDS ?? 900) * 1000
const intervalMs = Number(process.env.WAIT_INTERVAL_SECONDS ?? 15) * 1000
const deadline = Date.now() + timeoutMs

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildProbeUrl() {
  const url = new URL('/', baseRaw)
  url.searchParams.set('__build_check', String(Date.now()))
  return url
}

function extractBuildId(html) {
  return html.match(/<!DOCTYPE html><!--([^>]+)-->/i)?.[1] ?? null
}

let attempts = 0
let lastSeen = '<none>'
let matched = false

while (Date.now() < deadline) {
  attempts += 1

  try {
    const res = await fetch(buildProbeUrl(), {
      headers: {
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'user-agent': 'woon-dev-build-wait/1.0',
      },
    })
    const html = await res.text()
    const live = extractBuildId(html)
    lastSeen = live ?? `<missing:${res.status}>`

    if (live === expected) {
      console.log(
        `wait-for-live-build: live build ${live} matched expected ${expected} after ${attempts} attempt(s).`,
      )
      matched = true
      break
    }

    console.log(
      `wait-for-live-build: live=${lastSeen}, expected=${expected}. Waiting ${intervalMs / 1000}s...`,
    )
  } catch (err) {
    lastSeen = `<fetch-error:${err.message}>`
    console.log(
      `wait-for-live-build: ${lastSeen}. Waiting ${intervalMs / 1000}s...`,
    )
  }

  await sleep(intervalMs)
}

if (!matched) {
  console.error(
    `wait-for-live-build: timed out after ${timeoutMs / 1000}s. Last seen ${lastSeen}, expected ${expected}.`,
  )
  process.exitCode = 1
}
