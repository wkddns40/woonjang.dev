#!/usr/bin/env node
import http from 'node:http'
import https from 'node:https'

// Stage 12 — post-deploy live verification (Spec §14.2).
//
// Runs the §14.2 checks against any base URL: production deploy, preview, or
// local `next start`. Same checks Stage 11 ran against the static-built HTML.
//
// Usage:
//   node scripts/verify-deploy.mjs https://woonjang.dev
//   node scripts/verify-deploy.mjs http://localhost:3001
//   npm run verify:deploy -- https://woonjang.dev
//
// Exit code 0 if every gate passes; 1 otherwise.

const baseRaw = process.argv[2] ?? process.env.BASE_URL
if (!baseRaw) {
  console.error('Usage: verify-deploy.mjs <BASE_URL>')
  process.exit(2)
}
const base = baseRaw.replace(/\/$/, '')

// — Endpoint matrix —
// (route, expectedStatus, contentTypePrefix?, contentMustInclude?)
const endpoints = [
  { route: '/', status: 200, ctype: 'text/html' },
  { route: '/en', status: 200, ctype: 'text/html' },
  { route: '/resume/woon_jang.pdf', status: 200, ctype: 'application/pdf' },
  { route: '/resume/woon_jang_en.pdf', status: 200, ctype: 'application/pdf' },
  { route: '/robots.txt', status: 200, ctype: 'text/plain' },
  { route: '/sitemap.xml', status: 200, ctype: 'application/xml' },
  { route: '/profile.json', status: 200, ctype: 'application/json' },
]

// — Signal-word + restricted EV-metric regex —
// Tight private EV metrics stay blocked, while the public 7k TPS load-test
// disclosure is allowed.
const signalRe = /(physical ai|manufactur|foundation|robot|llm)/gi
const tightLeakRe =
  /\b\d+\s*(vehicles?|cars?|차량|messages?\s*\/\s*sec|건\/초|밀리초|ms\b|p\d{2,3}\s*[<=])/gi

// — Allowed disclosure (Y-04 public proof) — if /, /en omit this we likely
// served a stale cache.
const periodPhrases = [
  /1년 5개월/,           // KO
  /1 year 5 months/,     // EN
]
const ownContribPhrases = [
  /InfluxDB Converter/,   // KO
  /InfluxDB ops/,         // EN
]

let totalFailures = 0

function pad(s, n) {
  s = String(s)
  return s.length >= n ? s : s + ' '.repeat(n - s.length)
}

async function fetchHead(route) {
  const url = base + route
  const res = await requestUrl(url, 'HEAD')
  return { url, status: res.status, ctype: res.headers['content-type'] ?? '', headers: res.headers }
}

async function fetchBody(route) {
  const url = base + route
  const res = await requestUrl(url, 'GET')
  const ctype = res.headers['content-type'] ?? ''
  const isBinary = ctype.startsWith('application/pdf')
  const body = isBinary ? res.body : res.body.toString('utf8')
  return { url, status: res.status, ctype, body, headers: res.headers }
}

function requestUrl(url, method, redirects = 0) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const client = parsed.protocol === 'https:' ? https : http
    const req = client.request(
      parsed,
      { method, headers: { 'user-agent': 'woon-dev-verify/1.0' } },
      (res) => {
        const location = res.headers.location
        if (
          location &&
          [301, 302, 303, 307, 308].includes(res.statusCode ?? 0) &&
          redirects < 5
        ) {
          res.resume()
          const nextUrl = new URL(location, parsed).toString()
          requestUrl(nextUrl, method, redirects + 1).then(resolve, reject)
          return
        }

        const chunks = []
        res.on('data', (chunk) => chunks.push(chunk))
        res.on('end', () => {
          resolve({
            status: res.statusCode ?? 0,
            headers: res.headers,
            body: Buffer.concat(chunks),
          })
        })
      },
    )
    req.on('error', reject)
    req.end()
  })
}

console.log(`\n=== Stage 12 / §14.2 verify — ${base} ===\n`)

// — Round 1: endpoint reachability + content type —
console.log('[A] Endpoint matrix')
const bodies = {}
for (const ep of endpoints) {
  const r = await fetchBody(ep.route)
  bodies[ep.route] = r
  const okStatus = r.status === ep.status
  const okType = ep.ctype ? r.ctype.startsWith(ep.ctype) : true
  const ok = okStatus && okType
  if (!ok) totalFailures++
  const size = r.body.length
  console.log(
    `  ${ok ? 'OK ' : 'XX '} ${pad(r.status, 4)} ${pad(r.ctype.split(';')[0], 22)} ${pad(size + 'b', 10)} ${ep.route}`,
  )
}

// — PDF magic bytes —
console.log('\n[B] PDF magic bytes %PDF-')
for (const route of ['/resume/woon_jang.pdf', '/resume/woon_jang_en.pdf']) {
  const buf = bodies[route]?.body
  const magic =
    Buffer.isBuffer(buf) && buf.length >= 5 ? buf.subarray(0, 5).toString('latin1') : '<empty>'
  const ok = magic === '%PDF-'
  if (!ok) totalFailures++
  console.log(`  ${ok ? 'OK ' : 'XX '} ${route} starts with "${magic}"`)
}

// — OG images: discover hashed routes from page <meta property="og:image"> —
console.log('\n[C] OG images discovered from page meta')
const ogTargets = []
for (const koEnRoute of ['/', '/en']) {
  const html = bodies[koEnRoute]?.body ?? ''
  const m = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)
  if (m) {
    let ogUrl = m[1]
    if (ogUrl.startsWith(base)) ogUrl = ogUrl.slice(base.length)
    if (ogUrl.startsWith('http')) {
      // Resolved against deployed origin — strip just for label
      const u = new URL(ogUrl)
      ogTargets.push({ src: koEnRoute, url: u.pathname + u.search })
    } else {
      ogTargets.push({ src: koEnRoute, url: ogUrl })
    }
  } else {
    console.log(`  ?? ${koEnRoute} — no og:image meta`)
  }
}
for (const t of ogTargets) {
  // Strip any cache-buster query for the HEAD probe path
  const probe = t.url
  const r = await fetchHead(probe)
  const ok = r.status === 200 && r.ctype.startsWith('image/png')
  if (!ok) totalFailures++
  console.log(`  ${ok ? 'OK ' : 'XX '} ${pad(r.status, 4)} ${pad(r.ctype, 18)} ${probe}`)
}

// — §14.2 signal words + tight metric leak —
console.log('\n[D] Signal-word + private EV-metric leak')
for (const route of ['/', '/en']) {
  const html = bodies[route]?.body ?? ''
  const sig = (html.match(signalRe) ?? []).length
  const leak = (html.match(tightLeakRe) ?? []).length
  const okSig = sig >= 8
  const okLeak = leak === 0
  if (!okSig) totalFailures++
  if (!okLeak) totalFailures++
  console.log(
    `  ${route}  signals=${pad(sig, 4)} (≥8 ${okSig ? 'PASS' : 'FAIL'})    tight-leak=${pad(leak, 3)} (=0 ${okLeak ? 'PASS' : 'FAIL'})`,
  )
}

// — Y-04 disclosed metric + own-contribution presence —
console.log('\n[E] Y-04 public proof + own-contribution presence')
for (const [route, periodRe, ownRe, label] of [
  ['/', periodPhrases[0], ownContribPhrases[0], 'KO'],
  ['/en', periodPhrases[1], ownContribPhrases[1], 'EN'],
]) {
  const html = bodies[route]?.body ?? ''
  const okP = periodRe.test(html)
  const okO = ownRe.test(html)
  if (!okP) totalFailures++
  if (!okO) totalFailures++
  console.log(
    `  ${label}  operation-period="${periodRe.source}"  ${okP ? 'PASS' : 'FAIL'}    own-contribution="${ownRe.source}" ${okO ? 'PASS' : 'FAIL'}`,
  )
}

for (const [route, metricRe, label] of [
  ['/', /7,000건|7k events\/sec|7k TPS/, 'KO'],
  ['/en', /7,000 events\/sec|7k TPS/, 'EN'],
]) {
  const html = bodies[route]?.body ?? ''
  const ok = metricRe.test(html)
  if (!ok) totalFailures++
  console.log(`  ${label}  public-load-test="${metricRe.source}"  ${ok ? 'PASS' : 'FAIL'}`)
}

// — sitemap & robots sanity —
// Production checks are canonical-domain aware: sitemap and robots must point
// to woonjang.dev even if a legacy deployment env var is still present.
console.log('\n[F] sitemap.xml + robots.txt content sanity')
{
  const expectedHost = 'woonjang.dev'
  const sm = bodies['/sitemap.xml']?.body ?? ''
  const okHost = sm.includes(`https://${expectedHost}/`)
  const okEn = sm.includes(`https://${expectedHost}/en`)
  if (!okHost) totalFailures++
  if (!okEn) totalFailures++
  console.log(
    `  sitemap host (${expectedHost}) present: ${okHost ? 'PASS' : 'FAIL'}    EN entry present: ${okEn ? 'PASS' : 'FAIL'}`,
  )

  const rt = bodies['/robots.txt']?.body ?? ''
  const okAllow = /Allow:\s*\//i.test(rt)
  const okSitemap = /Sitemap:.*sitemap\.xml/i.test(rt)
  const okSitemapHost = rt.includes(`https://${expectedHost}/sitemap.xml`)
  if (!okAllow) totalFailures++
  if (!okSitemap) totalFailures++
  if (!okSitemapHost) totalFailures++
  console.log(
    `  robots Allow: present: ${okAllow ? 'PASS' : 'FAIL'}    Sitemap: pointer: ${okSitemap ? 'PASS' : 'FAIL'}    Sitemap host matches: ${okSitemapHost ? 'PASS' : 'FAIL'}`,
  )
}

// — hreflang alternates in <head> —
console.log('\n[G] hreflang alternates in <head>')
for (const route of ['/', '/en']) {
  const html = bodies[route]?.body ?? ''
  const hreflangs = [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/gi)]
  const codes = new Set(hreflangs.map((m) => m[1].toLowerCase()))
  const okKo = codes.has('ko')
  const okEn = codes.has('en')
  const okJsonLink = /<link\s+rel="alternate"\s+type="application\/json"\s+href="[^"]*\/profile\.json"/i.test(html)
  if (!okKo) totalFailures++
  if (!okEn) totalFailures++
  if (!okJsonLink) totalFailures++
  console.log(
    `  ${route}  ko=${okKo ? 'PASS' : 'FAIL'}  en=${okEn ? 'PASS' : 'FAIL'}  json=${okJsonLink ? 'PASS' : 'FAIL'}  x-default=${codes.has('x-default') ? 'PASS' : 'fail (optional)'}`,
  )
}

// — External parser endpoints + CORS reachability —
console.log('\n[H] external parser endpoints + CORS')
{
  const externalRoutes = ['/', '/en', '/robots.txt', '/sitemap.xml', '/profile.json']
  for (const route of externalRoutes) {
    const headers = bodies[route]?.headers ?? {}
    const cors = headers['access-control-allow-origin'] ?? ''
    const robots = headers['x-robots-tag'] ?? ''
    const okCors = cors === '*'
    const okRobots =
      route === '/robots.txt' || (/index/i.test(robots) && /follow/i.test(robots))
    if (!okCors) totalFailures++
    if (!okRobots) totalFailures++
    console.log(
      `  ${route}  cors=${okCors ? 'PASS' : 'FAIL'}  x-robots=${okRobots ? 'PASS' : 'FAIL'}`,
    )
  }

  const profile = bodies['/profile.json']?.body ?? ''
  let okProfile = false
  try {
    const parsed = JSON.parse(profile)
    okProfile =
    parsed?.url === 'https://woonjang.dev/' &&
    Array.isArray(parsed?.proofCases) &&
    parsed.proofCases.length >= 2 &&
    /7,000 events\/sec/.test(parsed.proofCases[0]?.performanceEvidence ?? '')
  } catch {
    okProfile = false
  }
  if (!okProfile) totalFailures++
  console.log(`  profile.json parse: ${okProfile ? 'PASS' : 'FAIL'}`)
}

// — Final —
console.log('\n=== summary ===')
const exitCode = totalFailures === 0 ? 0 : 1
console.log(
  totalFailures === 0
    ? `  ALL GATES PASS for ${base}`
    : `  ${totalFailures} FAILURE(S) at ${base}`,
)
process.exitCode = exitCode
